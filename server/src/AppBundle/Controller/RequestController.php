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

        $dm = $this->get('doctrine_mongodb');

        $chain = $dm->getRepository('AppBundle:ChainDocument')
            ->findOneBy(array('link' => $link));

        $request = new RequestDocument();
        $request->setModified($data->get('modified'));
        $request->setMoving($data->get('moving'));
        $request->setUnits($data->get('units'));
        $request->setLink($link);

        if ($chain && !$data->get('modified')) {
            $request->setStatus('done');
            $request->setChain($chain->getId());
            $chain = $chain->getResult();
        } else {
            $chain = null;
        }

        $dm = $dm->getManager();
        $dm->persist($request);
        $dm->flush();

        $result = array();
        $result['id'] = $request->getId();
        $result['createdAt'] = $request->getCreatedAt();
        $result['units'] = $request->getUnits();
        $result['status'] = $request->getStatus();
        $result['chain'] = $chain;
        $result['number'] = $this->getRequestQueuePosition($request->getId(), $link);

        return $result;
    }

    public function getAction($id)
    {
        $dm = $this->get('doctrine_mongodb');
        $request = $dm->getRepository('AppBundle:RequestDocument')
            ->find($id);

        if (!$request) {
            throw $this->createNotFoundException('Request not found for id ' . $id);
        }

        if ($request->getStatus() === 'done') {
            $chain = $dm->getRepository('AppBundle:ChainDocument')
                ->find($request->getChain());

            $request->setChain($chain->getResult());
        }

        $result = array();
        $result['id'] = $request->getId();
        $result['createdAt'] = $request->getCreatedAt();
        $result['units'] = $request->getUnits();
        $result['status'] = $request->getStatus();
        $result['chain'] = $request->getChain();
        $result['number'] = $this->getRequestQueuePosition($id, $request->getLink());

        return $result;
    }

    private function getRequestQueuePosition($id, $link) {
        $allInWaiting = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:RequestDocument')
            ->createQueryBuilder('n')
            ->field('status')
            ->in(array('created', 'running'))
            ->group(array('link' => 1 ), array ('total' => 0))
            ->reduce('function(curr, result) {result.total += 1;}')
            ->sort('createdAt', 'asc')
            ->getQuery()
            ->execute();

        $i = 0;
        foreach ($allInWaiting as $index => $request) {
            $i++;
            if ($request['link'] === $link) {
                break;
            }
        }

        return $i;
    }
}
