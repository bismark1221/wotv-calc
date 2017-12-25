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

        if ($chain && !$data->get('modified')) {
            $result = $chain;
        } else {
            $request = new RequestDocument();
            $request->setModified($data->get('modified'));
            $request->setMoving($data->get('moving'));
            $request->setUnits($data->get('units'));

            $request->setLink($link);

            $dm = $this->get('doctrine_mongodb')->getManager();
            $dm->persist($request);
            $dm->flush();

            $result = array();
            $result['id'] = $request->getId();
            $result['createdAt'] = $request->getCreatedAt();
            $result['link'] = $request->getLink();
            $result['number'] = 42;
        }

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
