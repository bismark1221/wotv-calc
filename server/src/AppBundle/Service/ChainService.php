<?php

namespace AppBundle\Service;

class ChainService
{
  private $elements = [
    'dark',
    'earth',
    'fire',
    'ice',
    'light',
    'lightning',
    'water',
    'wind'
  ];

  private $total;
  private $multi;
  private $nbHits;
  private $best;
  private $hits = [];
  private $hitsDamage = [];
  private $lastHitter;
  private $nextHitter;
  private $lastElements;
  private $combo = [];
  private $nbCombo = [];
  private $frames = [];
  private $modifierElements = [];
  private $chainUnitsHits = [];
  private $chainersHits = [];
  private $chainers = [];
  private $finishers = [];
  private $chainUnits = [];
  private $hitters = [];
  private $minFrames = 0;

  public $units = [];

  public function findBestFrames($units) {
    ini_set('max_execution_time', 6000000);

    $this->units = $units;
    $this->best = array(
      'modifier' => array(
        'frames' => [],
        'max' => 0,
        'hits' => []
      ),
      'combo' => array(
        'frames' => [],
        'max' => 0,
        'hits' => []
      )
    );

    if (count($this->units) > 0) {
      $this->chainUnits = [];
      $this->chainers = [];
      $this->finishers = [];
      $this->frames = [];
      $this->chainUnitsHits = [];
      $this->chainersHits = [];
      $this->minFrames = 0;
      $chainerIndex = 0;
      $unitIndex = 0;

      $this->getElements();
      $this->calculateDebuffModifier();
      $this->calculateTotalDamage();

      foreach ($this->units as $index => $unit) {
        if ($unit) {
          $this->chainUnitsHits[$unitIndex] = [];
          $this->units[$index]['index'] = $index;
          $this->units[$index]['unitIndex'] = $unitIndex;
          $this->units[$index]['minFrame'] = $unit['ability']['range']['min'];

          if ($unit['ability']['type'] === 'chain') {
            array_push($this->chainersHits, []);
            $this->units[$index]['maxFrame'] = $unit['ability']['range']['max'];
            $this->units[$index]['chainerIndex'] = $chainerIndex;
            array_push($this->chainers, $this->units[$index]);
            $chainerIndex++;

            for ($i = $this->units[$index]['minFrame']; $i <= $this->units[$index]['maxFrame']; $i++) {
              $this->calculateUnitHits($this->units[$index], $unitIndex, $i, 'chainer');
            }
          } else {
            $this->calculateUnitHits($this->units[$index], $unitIndex, $this->units[$index]['minFrame']);
            array_push($this->finishers, $this->units[$index]);
          }

          array_push($this->chainUnits, $this->units[$index]);
          $this->units[$index]['frames'] = $this->chainUnitsHits[$unitIndex][$this->units[$index]['minFrame']];
          $unitIndex++;
        }
      }

      $this->findMinFrames();
      $this->calculateAllPossibleFrames('chainers', 0);

      if (count($this->finishers) > 0) {
        $maxFrames = max(
          $this->best['modifier']['hits'][count($this->best['modifier']['hits']) - 1],
          $this->best['combo']['hits'][count($this->best['combo']['hits']) - 1]
        ) + 1;

      if (!$maxFrames) {
        $maxFrames = 20;
      }

      foreach (['modifier', 'combo'] as $type) {
        foreach ($this->chainUnits as $index => $unit) {
          if ($unit && $unit['ability']['type'] === 'finish' && $type === 'modifier') {
            $this->units[$index]['maxFrame'] = $unit['ability']['range']['max'] > $maxFrames ? $unit['ability']['range']['max'] : $maxFrames;

            for ($i = $unit['minFrame']; $i <= $unit['maxFrame']; $i++) {
              $this->calculateUnitHits($unit, $index, $i);
            }
          } else if ($unit && $unit['ability']['type'] === 'chain') {
            $chainerFrame = $this->best[$type]['frames'][$unit['index']];
            $this->frames[$index] = $chainerFrame;
            $this->units[$index]['frames'] = $this->chainUnitsHits[$index][$chainerFrame];
            $this->units[$index]['minFrame'] = $chainerFrame;
            $this->units[$index]['maxFrame'] = $chainerFrame;
          }
        }
        $this->calculateAllPossibleFrames('chainUnits', 0);
      }
      }
    }

    return $this->best;
  }

  // Once Upon A Time
  private function calculateUnitHits($unit, $unitPosition, $framesGap, $type = 'unit') {
    $this->chainUnitsHits[$unitPosition][$framesGap] = [];
    $countFrames = 0 + $framesGap;
    $dualCountFrames = $unit['ability']['offset'] + $unit['ability']['castTime'] + $framesGap;

    forEach(explode('-', $unit['ability']['framesList']) as $index => $hit) {
      $countFrames += intval($hit);
      array_push(
        $this->chainUnitsHits[$unitPosition][$framesGap],
        array(
          'frame' => $countFrames,
          'type' => 'classic',
          'damage' => $unit['ability']['hitDamage'][$index]
        )
      );
    }

    if ($unit['dual'] && $unit['ability']['dualable']) {
      forEach(explode('-', $unit['ability']['framesList']) as $index => $hit) {
        $dualCountFrames += intval($hit);
        array_push(
          $this->chainUnitsHits[$unitPosition][$framesGap],
          array(
            'frame' => $dualCountFrames,
            'type' => 'dual',
            'damage' => $unit['ability']['hitDamage'][$index]
          )
        );
      }
    }

    if ($type === 'chainer') {
      $this->chainersHits[$unit['chainerIndex']][$framesGap] = $this->chainUnitsHits[$unitPosition][$framesGap];
    }
  }

  private function findMinFrames() {
    forEach($this->units as $unit) {
      $this->minFrames = $unit && $unit['minFrame'] < $this->minFrames ? $unit['minFrame'] : $this->minFrames;
    }
  }

  private function getElements() {
    foreach ($this->units as $index => $unit) {
      if ($unit) {
        $elements = [];

        if ($unit['ability']['damage'] === 'physic') {
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
  }

  private function calculateDebuffModifier() {
    $this->modifierElements = [];
    forEach($this->elements as $element) {
      $modifier = 1;

      forEach($this->units as $unit) {
        if ($unit && isset($unit['ability']['debuff'][$element]) && $unit['ability']['debuff'][$element] / 100 + 1 > $modifier) {
          $modifier = $unit['ability']['debuff'][$element] / 100 + 1;
        }
      }

      $this->modifierElements[$element] = $modifier;
    }
  }

  private function calculateTotalDamage() {
    forEach($this->units as $index => $unit) {
      if ($unit) {
        $this->units[$index]['totalDamage'] = 0;
        $realIgnore = $unit['ability']['ignore'] * 2 / 100 + 1;
        $base = $unit['ability']['base'];

        if ($unit['ability']['damage'] === 'hybrid') {
          $base /= 2;
        }

        if (count($unit['elements']) > 0) {
          forEach($unit['elements'] as $element) {
            $this->units[$index]['totalDamage'] += (1 / count($unit['elements'])) * $base * $realIgnore * $this->modifierElements[$element];
          }
        } else {
          $this->units[$index]['totalDamage'] = $base * $realIgnore;
        }
      }
    }
  }

  private function calculateAllPossibleFrames($type, $unitPosition) {
    if ($unitPosition < count($this->{$type})) {
      for ($i = $this->{$type}[$unitPosition]['minFrame']; $i <= $this->{$type}[$unitPosition]['maxFrame']; $i++) {
        $this->frames[$unitPosition] = $i;
        $this->{$type}[$unitPosition]['frames'] = $this->{$type . 'Hits'}[$unitPosition][$i];
        $this->calculateAllPossibleFrames($type, $unitPosition + 1);
      }
    } else if (array_search(0, $this->frames) !== false || array_search($this->minFrames, $this->frames) !== false) {
      $modifier = $this->calculateChain($type);
      if ($modifier > $this->best['modifier']['max']) {
        $this->best['modifier']['max'] = $modifier;
        forEach($this->{$type} as $index => $unit) {
          $this->best['modifier']['frames'][$unit['index']] = $this->frames[$index];
        }
        $this->best['modifier']['hits'] = $this->hits;
      }

      $combo = max($this->combo);
      if ($combo > $this->best['combo']['max']) {
        $this->best['combo']['max'] = $combo;
        forEach($this->{$type} as $index => $unit) {
          $this->best['combo']['frames'][$unit['index']] = $this->frames[$index];
        }
        $this->best['combo']['hits'] = $this->hits;
      }
    }
  }

  private function calculateChain($type) {
    $this->initializeChain($type);

    while ($this->getNextHitter() !== -1) {
      if ($this->lastHitter === $this->nextHitter) {
        $this->addHit($type, $this->nextHitter, false);
      } else {
        $previousFrame = $this->{$type}[$this->lastHitter]['frames'][$this->nbCombo[$this->lastHitter] - 1]['frame'];
        $actualFrame = $this->{$type}[$this->nextHitter]['frames'][$this->nbCombo[$this->nextHitter]]['frame'];
        $this->addHit($type, $this->nextHitter, ($actualFrame - $previousFrame <= 21));
      }
    }

    return round($this->total);
  }

  private function initializeChain($type) {
    $this->total = 0;
    $this->nbHits = 0;
    $this->multi = 1;
    $this->hits = [];
    $this->hitsDamage = [];
    $this->lastElements = [];
    $this->combo = [];
    $this->nbCombo = [];

    $this->sortFramesArray($type);
    $this->calculateHitterOrder($type);
    $this->addHit($type, $this->getNextHitter(), false);
  }

  private function sortFramesArray($type) {
    foreach ($this->{$type} as $index => $unit) {
      array_push($this->nbCombo, 0);
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

      $this->{$type}[$index]['frames'] = $unit['frames'];

    }
  }

  private function calculateHitterOrder($type) {
    $minIndex = 0;
    $nbCombo = $this->nbCombo;
    $nbCombo[-1] = 0;
    $this->hitters = [];

    while ($minIndex !== -1) {
      $minFrame = 10000;
      $minIndex = -1;
      forEach($this->{$type} as $index => $unit) {
        if (count($unit['frames']) > $nbCombo[$index] &&
          ($index === 0
          || $unit['frames'][$nbCombo[$index]]['frame'] < $minFrame
          || ($unit['frames'][$nbCombo[$index]]['frame'] === $minFrame && $minIndex > $index))
        ) {
          $minFrame = $unit['frames'][$nbCombo[$index]]['frame'];
          $minIndex = $index;
        }
      }

      $nbCombo[$minIndex]++;
      array_push($this->hitters, $minIndex);
    }
  }

  private function getNextHitter() {
    $this->nextHitter = $this->hitters[$this->nbHits];

    return $this->nextHitter;
  }

  private function addHit($type, $unitPosition, $combo) {
    $unit = $this->{$type}[$unitPosition];
    $hit = $unit['frames'][$this->nbCombo[$unitPosition]];

    $this->hits[$this->nbHits] = $hit['frame'];
    $this->hitsDamage[$this->nbHits] = $hit['damage'];

    $this->calculateTotal($unit, $combo);
    $this->nbCombo[$unitPosition]++;
    $this->nbHits++;
    $this->lastHitter = $unitPosition;
  }

  private function calculateTotal($unit, $combo) {
    if ($combo) {
      $elementsModifier = $this->calculateModifierByElements($unit);
      $this->multi += 0.1 + $elementsModifier;
      if ($this->multi < 4 && $this->hits[$this->nbHits] === $this->hits[$this->nbHits - 1]) {
        $this->multi += 0.3;
      }

      if ($this->multi > 4) {
        $this->multi = 4;
      }

      $this->combo[count($this->combo) - 1]++;
    } else {
      $this->multi = 1;
      array_push($this->combo, 0);
    }

    $this->lastElements = $unit['elements'];
    $this->total = $this->total + (($unit['totalDamage'] * $this->hitsDamage[$this->nbHits] / 100) * $this->multi);
  }

  private function calculateModifierByElements($unit) {
    $matchingElements = 0;

    forEach($unit['elements']as $element) {
      if (array_search($element, $this->lastElements) !== false) {
        $matchingElements++;
      }
    }

    return $matchingElements * 0.2;
  }
}
