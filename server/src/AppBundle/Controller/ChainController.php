<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\View\View;

class ChainController extends FOSRestController
{
    /**
     * @Rest\Get("/api/hello")
     */
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
     * @Rest\Post("/api/find-best-chains")
     */
    public function postAction(Request $request)
    {
        $data = new \StdClass();
        error_log(var_export($request->request, true));
        $foo = json_decode($request->getContent(), true);
        if(empty($foo))
        {
          return new View("NULL VALUES ARE NOT ALLOWED", Response::HTTP_NOT_ACCEPTABLE);
        }

        $data->bar = $foo;
        return $foo;
    }
}
