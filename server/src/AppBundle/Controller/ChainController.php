<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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

    /**
     * @Rest\Post("/api/find-best")
     */
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
