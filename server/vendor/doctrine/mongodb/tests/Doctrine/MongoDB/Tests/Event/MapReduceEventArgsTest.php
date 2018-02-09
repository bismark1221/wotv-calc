<?php

namespace Doctrine\MongoDB\Tests\Event;

use Doctrine\MongoDB\Event\MapReduceEventArgs;

class MapReduceEventArgsTest extends \PHPUnit_Framework_TestCase
{
    public function testMapReduceEventArgs()
    {
        $invoker = new \stdClass();
        $map = new \MongoCode('');
        $reduce = new \MongoCode('');
        $out = array('inline' => true);
        $query = array('x' => 1);
        $options = array('finalize' => new \MongoCode(''));

        $mapReduceEventArgs = new MapReduceEventArgs($invoker, $map, $reduce, $out, $query, $options);

        $this->assertSame($invoker, $mapReduceEventArgs->getInvoker());
        $this->assertSame($map, $mapReduceEventArgs->getMap());
        $this->assertSame($reduce, $mapReduceEventArgs->getReduce());
        $this->assertSame($out, $mapReduceEventArgs->getOut());
        $this->assertSame($query, $mapReduceEventArgs->getQuery());
        $this->assertSame($options, $mapReduceEventArgs->getOptions());

        $map2 = new \MongoCode('a');
        $reduce2 = new \MongoCode('b');
        $out2 = array('inline' => false);
        $query2 = array('x' => 2);
        $options2 = array('finalize' => new \MongoCode('c'));

        $mapReduceEventArgs->setMap($map2);
        $mapReduceEventArgs->setReduce($reduce2);
        $mapReduceEventArgs->setOut($out2);
        $mapReduceEventArgs->setQuery($query2);
        $mapReduceEventArgs->setOptions($options2);

        $this->assertSame($map2, $mapReduceEventArgs->getMap());
        $this->assertSame($reduce2, $mapReduceEventArgs->getReduce());
        $this->assertSame($out2, $mapReduceEventArgs->getOut());
        $this->assertSame($query2, $mapReduceEventArgs->getQuery());
        $this->assertSame($options2, $mapReduceEventArgs->getOptions());
    }
}
