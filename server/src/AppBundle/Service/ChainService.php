<?php

namespace AppBundle\Service;

class ChainService
{
    private $total;
    private $multi;
    private $nbHits;
    private $best;
    private $hits = [];
    private $lastHitter;
    private $nextHitter;
    private $lastElements;
    private $combo = [];
    private $nbCombo = [];
    private $spark = true;
    private $result = array(
        'modifier' => 0,
        'combo' => '0'
    );
    private $test = 0;

    public function findBestFrames($units) {
        ini_set('max_execution_time', 600);

        $this->units = $units;
        $this->best = array(
            'modifier' => array(
                'frames' => [],
                'max' => 0
            ),
            'combo' => array(
                'frames' => [],
                'max' => 0
            )
        );

        $this->calculateAllPossibleFrames(0);

        return $this->best;
    }

    private function calculateAllPossibleFrames($unitPosition) {
        if ($unitPosition < count($this->units)) {
            for ($i = -10; $i <= 10; $i++) {
                $this->units[$unitPosition]['framesGap'] = $i;
                $this->calculateAllPossibleFrames($unitPosition + 1);
            }
        } else {
            $modifier = $this->calculateChain();
            $this->test++;
            error_log($this->test);
            if ($modifier > $this->best['modifier']['max']) {
                $this->best['modifier']['max'] = $modifier;
                foreach ($this->units as $index => $unit) {
                    $this->best['modifier']['frames'][$index] = $unit['framesGap'];
                };
            }

            if (max($this->combo) > $this->best['combo']['max']) {
                $this->best['combo']['max'] = max($this->combo);
                foreach ($this->units as $index => $unit) {
                    $this->best['combo']['frames'][$index] = $unit['framesGap'];
                }
            }
        }
    }

    private function calculateChain() {
        $this->initializeChain();

        while ($this->getNextHitter() !== -1) {
            if ($this->lastHitter === $this->nextHitter) {
                $this->addHit($this->nextHitter, false);
            } else {
                $previousFrame = $this->units[$this->lastHitter]['frames'][$this->nbCombo[$this->lastHitter] - 1]['frame'];
                $actualFrame = $this->units[$this->nextHitter]['frames'][$this->nbCombo[$this->nextHitter]]['frame'];
                $this->addHit($this->nextHitter, ($actualFrame - $previousFrame <= 21));
            }
        }

        return round($this->total);
    }

    private function initializeChain() {
        $this->total = 0;
        $this->nbHits = 0;
        $this->multi = 1;
        $this->hits = [];
        $this->lastElements = [];
        $this->combo = [];
        $this->nbCombo = [];

        $this->getElements();
        $this->calculateHitsAndFrames();
        $this->calculateHitDamage();
        $this->insertFirstHit();
    }

    private function getElements() {
        foreach ($this->units as $index => $unit) {
            $elements = [];

            if ($unit['ability']['type'] === 'physic') {
                foreach ($unit['weapons'] as $weapon) {
                    if ($weapon !== '' && array_search($weapon, $elements) === false) {
                        array_push($elements, $weapon);
                    }
                }
            }

            foreach ($unit['ability']['elements'] as $element) {
                if ($element !== '' && array_search($element, $elements) === false) {
                    array_push($elements, $element);
                }
            }

            $this->units[$index]['elements'] = $elements;
        }
    }

    private function calculateHitsAndFrames() {
        foreach ($this->units as $index => $unit) {
            $unit['frames'] = [];
            $countFrames = 0 + $unit['framesGap'];
            $dualCountFrames = $unit['ability']['offset'] + $unit['ability']['castTime'] + $unit['framesGap'];

            if (!$unit['ability']['linearFrames']) {
                foreach (explode('-', $unit['ability']['framesList']) as $hit) {
                    $countFrames += (int) $hit;
                    array_push($unit['frames'], array('frame' => $countFrames, 'type' => 'classic'));
                }

                if ($unit['dual'] && $unit['ability']['type'] !== 'LB' && $unit['ability']['dualable']) {
                    foreach (explode('-', $unit['ability']['framesList']) as $hit) {
                        $dualCountFrames += (int) $hit;
                        array_push($unit['frames'], array('frame' => $dualCountFrames, 'type' => 'dual'));
                    }
                }
            } else {
                array_push($unit['frames'], array('frame' => $countFrames, 'type' => 'classic'));
                for ($i = 1; $i < $unit['ability']['hits']; $i++) {
                    $countFrames += $unit['ability']['frames'];
                    array_push($unit['frames'], array('frame' => $countFrames, 'type' => 'classic'));
                }

                if ($unit['dual'] && $unit['ability']['type'] !== 'LB' && $unit['ability']['dualable']) {
                    array_push($unit['frames'], array('frame' => $dualCountFrames, 'type' => 'dual'));
                    for ($i = 1; $i < $unit['ability']['hits']; $i++) {
                        $dualCountFrames += $unit['ability']['frames'];
                        array_push($unit['frames'], array('frame' => $dualCountFrames, 'type' => 'dual'));
                    }
                }
            }

            $this->units[$index]['frames'] = $unit['frames'];
        }

        $this->sortFramesArray();
    }

    private function sortFramesArray() {
      foreach ($this->units as $index => $unit) {
        usort($unit['frames'], function($a, $b) {
            if ($a['frame'] < $b['frame']) {
                return -1;
            } else if ($a['frame'] > $b['frame']) {
                return 1;
            } else {
                if ($a['type'] === 'classic') {
                    return -1;
                } else {
                    return 1;
                }
            }
        });

        $this->units[$index]['frames'] = $unit['frames'];
      }
    }

    private function calculateHitDamage() {
      foreach ($this->units as $index => $unit) {
        $unit['totalDamage'] = 0;
        $elements = $unit['elements'];
        $realIgnore = $unit['ability']['ignore'] * 2 / 100 + 1;
        $base = $unit['ability']['base'];

        if ($unit['ability']['type'] === 'hybrid') {
          $base /= 2;
        }

        if (count($elements) > 0) {
          foreach ($elements as $element) {
            $unit['totalDamage'] = $unit['totalDamage'] + (1 / count($elements)) * $base * $realIgnore * $this->getDebuffModifier($element);
          }
        } else {
          $unit['totalDamage'] = $base * $realIgnore;
        }

        $unit['hitDamage'] = $unit['totalDamage'] / (count($unit['frames']) / ($unit['dual'] && $unit['ability']['type'] !== 'LB' && $unit['ability']['dualable'] ? 2 : 1));

        $this->units[$index]['totalDamage'] = $unit['totalDamage'];
        $this->units[$index]['hitDamage'] = $unit['hitDamage'];
      }
    }

    private function getDebuffModifier($element) {
        $modifier = 1;

        foreach ($this->units as $unit) {
            if (isset($unit['ability']['debuff'][$element]) && $unit['ability']['debuff'][$element] / 100 + 1 > $modifier) {
                $modifier = $unit['ability']['debuff'][$element] / 100 + 1;
            }
        }

        return $modifier;
    }

    private function insertFirstHit() {
        $minFramesGap = 0;
        $unitPosition = 0;
        foreach ($this->units as $index => $unit) {
            if ($unit['framesGap'] < $minFramesGap) {
                $minFramesGap = $unit['framesGap'];
                $unitPosition = $index;
            }
            array_push($this->nbCombo, 0);
        }

        $this->addHit($unitPosition, false);
    }

    private function calculateModifierByElements($unit) {
      $matchingElements = 0;

      foreach ($unit['elements'] as $element) {
        if(array_search($element, $this->lastElements) !== false) {
          $matchingElements++;
        }
      }

      $this->lastElements = $unit['elements'];

      return $matchingElements * 0.2;
    }

    private function calculateTotal($unit, $combo) {
      $elementsModifier = $this->calculateModifierByElements($unit); // Need to be always here

      if ($combo) {
        $this->multi += 0.1 + $elementsModifier;
        if ($this->multi < 4) {
          if ($this->spark && $this->hits[$this->nbHits]['hit'] === $this->hits[$this->nbHits - 1]['hit']) {
            $this->spark = false;
            $this->multi += 0.3;
          } else {
            $this->spark = true;
          }
        }

        if ($this->multi > 4) {
          $this->multi = 4;
        }

        $this->combo[count($this->combo) - 1]++;
      } else {
        $this->multi = 1;
        array_push($this->combo, 0);
      }

      if (count($this->units) > 1) {
        $this->hits[$this->nbHits]['combo'] = $this->combo[count($this->combo) - 1];
      }

      $this->total = $this->total + ($unit['hitDamage'] * $this->multi);
    }

    private function addHit($unitPosition, $combo) {
      $unit = $this->units[$unitPosition];
      $unitName = ($unitPosition + 1) + '.' + $unit['name'];
      $hit = $unit['frames'][$this->nbCombo[$unitPosition]];
      $divided = false;

      $type = $combo || $this->nbHits === 0 || count($this->units) === 1 ? 'chain' : 'break';
      $type = 'unit1-' + $type + ($hit['type'] === 'classic' ? '1' : '2');

      for ($i = 1; $i <= count($this->units); $i++) {
        if ($this->nbHits > ($i - 1) && $this->hits[$this->nbHits - $i]['unitName'] === $unitName && $this->hits[$this->nbHits - $i]['hit'] === $hit['frame']) {
          $this->hits[$this->nbHits - $i]['divided'] = true;
          $hit['frame'] += 0.5;
          $divided = true;
        }
      }

      $this->hits[$this->nbHits] = array(
        'unitName' => $unitName,
        'hit' => $hit['frame'],
        'type' => $type,
        'divided' => $divided
      );

      $this->calculateTotal($unit, $combo);
      $this->nbCombo[$unitPosition]++;
      $this->nbHits++;
      $this->lastHitter = $unitPosition;
    }

    private function getNextHitter() {
      $minFrame = 10000;
      $minPosition = -1;
      foreach ($this->units as $index => $unit) {
        $nbCombo = $this->nbCombo[$index];
        if (count($this->units[$index]['frames']) > $nbCombo && $unit['frames'][$nbCombo]['frame'] < $minFrame) {
          $minFrame = $unit['frames'][$nbCombo]['frame'];
          $minPosition = $index;
        }
      }

      $this->nextHitter = $minPosition;

      return $minPosition;
    }
}
