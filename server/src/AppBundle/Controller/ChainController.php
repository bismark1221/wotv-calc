<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;

use AppBundle\Service\ChainService;

class ChainController extends FOSRestController
{

    public function getAction()
    {
        // $restresult = $this->getDoctrine()->getRepository('AppBundle:User')->findAll();
        //   if ($restresult === null) {
        //     return new View("there are no users exist", Response::HTTP_NOT_FOUND);
        // }
        $foo = new \StdClass();
        $foo->bar = "baz";
        return $foo;
    }

    public function findBestAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        if(empty($data) || !is_array($data))
        {
          return new View("NULL VALUES ARE NOT ALLOWED", Response::HTTP_NOT_ACCEPTABLE);
        }

        $chainService = new ChainService;
        $test = $chainService->findBestFrames($data);

        return $test;
    }
}
