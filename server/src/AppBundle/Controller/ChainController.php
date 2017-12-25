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
        $request = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:RequestDocument')
            ->findOneBy(array('status' => 'created'));

        if (!$request) {
            throw $this->createNotFoundException('No more request to run');
        } else {
            $request->setStatus('running');

            $dm = $this->get('doctrine_mongodb')->getManager();
            $dm->persist($request);
            $dm->flush();
        }

        $chain = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:ChainDocument')
            ->findOneBy(array('link' => $request->getLink()));

        if ($chain) {
            $result = $chain->getResult();
        } else {
            $chainService = new ChainService;
            $result = $chainService->findBestFrames($request->getUnits());

            $chain = new ChainDocument();
            $chain->setUnits($request->getUnits());
            $chain->setLink($request->getLink());
            $chain->setModified($request->getModified());
            unset($result['modifier']['hits']);
            unset($result['combo']['hits']);
            $chain->setResult($result);

            $dm->persist($chain);
            $dm->flush();
        }

        $request->setChain($chain->getId());
        $request->setStatus('done');

        $dm->persist($request);
        $dm->flush();

        return $result;
    }
}
