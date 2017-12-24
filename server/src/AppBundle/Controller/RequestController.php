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
        $request = new RequestDocument();
        $request->setModified($data->get('modified'));
        $request->setUnits($data->get('units'));

        $link = "";
        forEach($data->get('units') as $unit) {
            $link .= $unit['id'] . $unit['ability']['id'];
        }

        $request->setLink($link);

        $dm = $this->get('doctrine_mongodb')->getManager();
        $dm->persist($request);
        $dm->flush();

        $result = array();
        $result['id'] = $request->getId();
        $result['createdAt'] = $request->getCreatedAt();
        $result['number'] = 42;

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




        $chainService = new ChainService;
        $result = $chainService->findBestFrames($request->getUnits());




        return $result;
    }
}
