<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;

use AppBundle\Document\ChainDocument;
use AppBundle\Service\ChainService;

class ChainController extends FOSRestController
{
    public function findBestAction()
    {
        $requestRepository = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:RequestDocument');
        $request = $requestRepository->findOneBy(array('status' => 'created'));

        if (!$request) {
            throw $this->createNotFoundException('No more request to run');
        } else {
            $request->setStatus('running');

            $dm = $this->get('doctrine_mongodb')->getManager();
            $dm->persist($request);
            $dm->flush();

            $chain = $this->get('doctrine_mongodb')
                ->getRepository('AppBundle:ChainDocument')
                ->findOneBy(array('link' => $request->getLink()));

            if ($chain) {
                $result = $chain->getResult();
            } else {
                if ($request->getMoving()) {
                    $units = $request->getUnits();
                } else {
                    $units = array();
                    forEach($request->getUnits() as $unit) {
                        if ($unit) {
                            array_push($units, $unit);
                        }
                    }
                }

                $chainService = new ChainService;
                $result = $chainService->findBestFrames($units);

                $chain = new ChainDocument();
                $chain->setUnits($units);
                $chain->setLink($request->getLink());
                $chain->setModified($request->getModified());
                unset($result['modifier']['hits']);
                unset($result['combo']['hits']);
                $chain->setResult($result);

                $dm->persist($chain);
                $dm->flush();
            }

            $allRequestsForLink = $requestRepository->findBy(array('link' => $chain->getLink()));

            forEach($allRequestsForLink as $request) {
                $request->setChain($chain->getId());
                $request->setStatus('done');

                $dm->persist($request);
                $dm->flush();
            }

            return $result;
        }
    }
}
