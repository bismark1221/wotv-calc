<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;

use AppBundle\Document\RequestDocument;
use AppBundle\Service\ChainService;

class RequestController extends FOSRestController
{

    public function saveAction(Request $data)
    {
        $link = "";
        forEach($data->get('units') as $unit) {
            if (!$unit && $data->get('moving')) {
                $link .= '00';
            } else {
                $link .= $unit['id'] . $unit['ability']['id'];
            }
        }

        $chain = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:ChainDocument')
            ->findOneBy(array('link' => $link));

        $result = array();

        $request = new RequestDocument();
        $request->setModified($data->get('modified'));
        $request->setMoving($data->get('moving'));
        $request->setUnits($data->get('units'));
        $request->setLink($link);

        if ($chain && !$data->get('modified')) {
            $request->setStatus('done');
            $request->setChain($chain->getId());
        } else {
            $chain = null;
        }

        $dm = $this->get('doctrine_mongodb')->getManager();
        $dm->persist($request);
        $dm->flush();

        $result['id'] = $request->getId();
        $result['createdAt'] = $request->getCreatedAt();
        $result['units'] = $request->getUnits();
        $result['status'] = $request->getStatus();
        $result['chain'] = $chain;

        $allInWaiting = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:RequestDocument')
            ->createQueryBuilder('n')
            ->field('status')
            ->in(array('created', 'running'))
            ->getQuery()
            ->execute();

        $result['number'] = count($allInWaiting);

        return $result;
    }

    public function getAction($id)
    {
        $request = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:RequestDocument')
            ->find($id);

        if (!$request) {
            throw $this->createNotFoundException('Request not found for id ' . $id);
        }

        if ($request->getStatus() === 'done') {
            $chain = $this->get('doctrine_mongodb')
                ->getRepository('AppBundle:ChainDocument')
                ->find($request->getChain());

            $request->setChain($chain->getResult());
        }

        return $request;
    }
}
