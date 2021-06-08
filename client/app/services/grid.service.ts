import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { SkillService } from './skill.service';
import { NameService } from './name.service';

@Injectable()
export class GridService {


  private gridNodes = [
    100, 81, 59, 60 , 37, 38, 39, 64, 102,
    80, 58, 35, 36, 19, 20, 40, 65, 103,
    79, 57, 34, 18, 7, 8, 21, 41, 66,
    56, 33, 17, 6, 1, 9, 22, 42, 67,
    55, 32, 16, 5, 0, 2, 10, 23, 43,
    54, 31, 15, 4, 3, 11, 24, 44, 69,
    75, 53, 30, 14, 13, 12, 25, 45, 70,
    74, 52, 29, 28, 27, 26, 46, 71, 104,
    105, 73, 51, 50, 49, 48, 47, 72, 106
  ];

  private lines = [
    {top: 370, left: 430, transform: -55},
    {top: 410, left: 457},
    {top: 460, left: 430, transform: 55},
    {top: 460, left: 380, transform: -55},
    {top: 410, left: 354},
    {top: 370, left: 380, transform: 55},
    {top: 320, left: 400},
    {top: 370, left: 490, transform: 55},
    {top: 460, left: 480, transform: -55},
    {top: 500, left: 400},
    {top: 460, left: 340, transform: 55},
    {top: 370, left: 330, transform: -55},
    {top: 280, left: 430, transform: 55},
    {top: 280, left: 480, transform: -55},
    {top: 320, left: 500},
    {top: 370, left: 530, transform: -55},
    {top: 410, left: 560},
    {top: 460, left: 530, transform: 55},
    {top: 500, left: 500},
    {top: 550, left: 480, transform: 55},
    {top: 550, left: 430, transform: -55},
    {top: 550, left: 380, transform: 55},
    {top: 550, left: 330, transform: -55},
    {top: 500, left: 300},
    {top: 460, left: 280, transform: -55},
    {top: 410, left: 252},
    {top: 370, left: 280, transform: 55},
    {top: 320, left: 300},
    {top: 280, left: 330, transform: 55},
    {top: 280, left: 380, transform: -55},
    {top: 230, left: 457},
    {top: 280, left: 530, transform: 55},
    {top: 370, left: 580, transform: 55},
    {top: 460, left: 580, transform: -55},
    {top: 550, left: 530, transform: -55},
    {top: 590, left: 457},
    {top: 590, left: 354},
    {top: 550, left: 280, transform: 55},
    {top: 460, left: 230, transform: 55},
    {top: 370, left: 230, transform: -55},
    {top: 280, left: 280, transform: -55},
    {top: 230, left: 354},
    {top: 190, left: 430, transform: -55},
    {top: 190, left: 480, transform: 55},
    {top: 190, left: 530, transform: -55},
    {top: 230, left: 560},
    {top: 280, left: 580, transform: -55},
    {top: 320, left: 600},
    {top: 370, left: 630, transform: -55},
    {top: 410, left: 663},
    {top: 460, left: 630, transform: 55},
    {top: 500, left: 600},
    {top: 550, left: 580, transform: 55},
    {top: 590, left: 560},
    {top: 640, left: 530, transform: 55},
    {top: 640, left: 480, transform: -55},
    {top: 640, left: 430, transform: 55},
    {top: 640, left: 380, transform: -55},
    {top: 640, left: 330, transform: 55},
    {top: 640, left: 280, transform: -55},
    {top: 590, left: 252},
    {top: 550, left: 230, transform: -55},
    {top: 500, left: 200},
    {top: 460, left: 180, transform: -55},
    {top: 410, left: 149},
    {top: 370, left: 180, transform: 55},
    {top: 320, left: 200},
    {top: 280, left: 230, transform: 55},
    {top: 230, left: 252},
    {top: 190, left: 280, transform: 55},
    {top: 190, left: 330, transform: -55},
    {top: 190, left: 380, transform: 55},
    {top: 140, left: 400},
    {top: 140, left: 500},
    {top: 190, left: 580, transform: 55},
    {top: 280, left: 630, transform: 55},
    {top: 370, left: 680, transform: 55},
    {top: 460, left: 680, transform: -55},
    {top: 550, left: 630, transform: -55},
    {top: 640, left: 580, transform: -55},
    {top: 680, left: 500},
    {top: 680, left: 400},
    {top: 680, left: 300},
    {top: 640, left: 230, transform: 55},
    {top: 550, left: 180, transform: 55},
    {top: 460, left: 130, transform: 55},
    {top: 370, left: 130, transform: -55},
    {top: 280, left: 180, transform: -55},
    {top: 190, left: 230, transform: -55},
    {top: 140, left: 300},
    {top: 100, left: 430, transform: 55},
    {top: 100, left: 480, transform: -55},
    {top: 100, left: 530, transform: 55},
    {top: 100, left: 580, transform: -55},
    {top: 140, left: 600},
    {top: 190, left: 630, transform: -55},
    {top: 230, left: 663},
    {top: 280, left: 680, transform: -55},
    {top: 320, left: 700},
    {top: 370, left: 730, transform: -55},
    {top: 410, left: 766},
    {top: 460, left: 730, transform: 55},
    {top: 500, left: 700},
    {top: 550, left: 680, transform: 55},
    {top: 590, left: 663},
    {top: 640, left: 630, transform: 55},
    {top: 680, left: 600},
    {top: 730, left: 580, transform: 55},
    {top: 730, left: 530, transform: -55},
    {top: 730, left: 480, transform: 55},
    {top: 730, left: 430, transform: -55},
    {top: 730, left: 380, transform: 55},
    {top: 730, left: 330, transform: -55},
    {top: 730, left: 280, transform: 55},
    {top: 730, left: 230, transform: -55},
    {top: 680, left: 200},
    {top: 640, left: 180, transform: -55},
    {top: 590, left: 149},
    {top: 550, left: 130, transform: -55},
    {top: 500, left: 100},
    {top: 460, left: 80, transform: -55},
    {top: 410, left: 46},
    {top: 370, left: 80, transform: 55},
    {top: 320, left: 100},
    {top: 280, left: 130, transform: 55},
    {top: 230, left: 149},
    {top: 190, left: 180, transform: 55},
    {top: 140, left: 200},
    {top: 100, left: 230, transform: 55},
    {top: 100, left: 280, transform: -55},
    {top: 100, left: 330, transform: 55},
    {top: 100, left: 380, transform: -55},
    {top: 50, left: 457},
    {top: 50, left: 560},
    {top: 100, left: 630, transform: 55},
    {top: 190, left: 680, transform: 55},
    {top: 280, left: 730, transform: 55},
    {top: 370, left: 780, transform: 55},
    {top: 460, left: 780, transform: -55},
    {top: 550, left: 730, transform: -55},
    {top: 640, left: 680, transform: -55},
    {top: 730, left: 630, transform: -55},
    {top: 750, left: 560},
    {top: 750, left: 457},
    {top: 750, left: 354},
    {top: 750, left: 252},
    {top: 730, left: 180, transform: 55},
    {top: 640, left: 130, transform: 55},
    {top: 550, left: 80, transform: 55},
    {top: 460, left: 30, transform: 55},
    {top: 370, left: 30, transform: -55},
    {top: 280, left: 80, transform: -55},
    {top: 190, left: 130, transform: -55},
    {top: 100, left: 180, transform: -55},
    {top: 50, left: 252},
    {top: 50, left: 354},
    {top: 50, left: 46},
    {top: 50, left: 149},
    {top: 50, left: 663},
    {top: 50, left: 766},
    {top: 100, left: 30, transform: 55},
    {top: 100, left: 130, transform: 55},
    {top: 100, left: 730, transform: 55},
    {top: 100, left: 780, transform: -55},
    {top: 100, left: 680, transform: -55},
    {top: 100, left: 80, transform: -55},
    {top: 140, left: 100},
    {top: 140, left: 700},
    {top: 140, left: 800},
    {top: 190, left: 80, transform: 55},
    {top: 190, left: 780, transform: 55},
    {top: 190, left: 730, transform: -55},
    {top: 190, left: 30, transform: -55},
    {top: 230, left: 46},
    {top: 230, left: 766},
    {top: 280, left: 30, transform: 55},
    {top: 280, left: 780, transform: -55},
    {top: 320, left: 800},
    {top: 500, left: 800},
    {top: 550, left: 780, transform: 55},
    {top: 550, left: 30, transform: -55},
    {top: 590, left: 46},
    {top: 590, left: 766},
    {top: 640, left: 30, transform: 55},
    {top: 640, left: 730, transform: 55},
    {top: 640, left: 780, transform: -55},
    {top: 640, left: 80, transform: -55},
    {top: 680, left: 100},
    {top: 680, left: 700},
    {top: 680, left: 800},
    {top: 730, left: 80, transform: 55},
    {top: 730, left: 680, transform: 55},
    {top: 730, left: 780, transform: 55},
    {top: 730, left: 730, transform: -55},
    {top: 730, left: 130, transform: -55},
    {top: 730, left: 30, transform: -55},
  ];

  private nodeLine = [
    { 'node1': 0, 'node2': 1 },
    { 'node1': 0, 'node2': 2 },
    { 'node1': 0, 'node2': 3 },
    { 'node1': 0, 'node2': 4 },
    { 'node1': 0, 'node2': 5 },
    { 'node1': 0, 'node2': 6 },
    { 'node1': 6, 'node2': 1 },
    { 'node1': 1, 'node2': 2 },
    { 'node1': 2, 'node2': 3 },
    { 'node1': 3, 'node2': 4 },

    { 'node1': 4, 'node2': 5 }, // 10
    { 'node1': 5, 'node2': 6 },
    { 'node1': 1, 'node2': 7 },
    { 'node1': 1, 'node2': 8 },
    { 'node1': 1, 'node2': 9 },
    { 'node1': 2, 'node2': 9 },
    { 'node1': 2, 'node2': 10 },
    { 'node1': 2, 'node2': 11 },
    { 'node1': 3, 'node2': 11 },
    { 'node1': 3, 'node2': 12 },

    { 'node1': 3, 'node2': 13 }, // 20
    { 'node1': 4, 'node2': 13 },
    { 'node1': 4, 'node2': 14 },
    { 'node1': 4, 'node2': 15 },
    { 'node1': 5, 'node2': 15 },
    { 'node1': 5, 'node2': 16 },
    { 'node1': 5, 'node2': 17 },
    { 'node1': 6, 'node2': 17 },
    { 'node1': 6, 'node2': 18 },
    { 'node1': 6, 'node2': 7 },

    { 'node1': 7, 'node2': 8 }, // 30
    { 'node1': 8, 'node2': 9 },
    { 'node1': 9, 'node2': 10 },
    { 'node1': 10, 'node2': 11 },
    { 'node1': 11, 'node2': 12 },
    { 'node1': 12, 'node2': 13 },
    { 'node1': 13, 'node2': 14 },
    { 'node1': 14, 'node2': 15 },
    { 'node1': 15, 'node2': 16 },
    { 'node1': 16, 'node2': 17 },

    { 'node1': 17, 'node2': 18 }, // 40
    { 'node1': 18, 'node2': 7 },
    { 'node1': 7, 'node2': 19 }, // 42
    { 'node1': 8, 'node2': 19 },
    { 'node1': 8, 'node2': 20 },
    { 'node1': 8, 'node2': 21 },
    { 'node1': 9, 'node2': 21 },
    { 'node1': 9, 'node2': 22 },
    { 'node1': 10, 'node2': 22 },
    { 'node1': 10, 'node2': 23 },

    { 'node1': 10, 'node2': 24 }, // 50
    { 'node1': 11, 'node2': 24 },
    { 'node1': 11, 'node2': 25 },
    { 'node1': 12, 'node2': 25 },
    { 'node1': 12, 'node2': 26 },
    { 'node1': 12, 'node2': 27 },
    { 'node1': 13, 'node2': 27 },
    { 'node1': 13, 'node2': 28 },
    { 'node1': 14, 'node2': 28 },
    { 'node1': 14, 'node2': 29 },

    { 'node1': 14, 'node2': 30 }, // 60
    { 'node1': 15, 'node2': 30 },
    { 'node1': 15, 'node2': 31 },
    { 'node1': 16, 'node2': 31 },
    { 'node1': 16, 'node2': 32 },
    { 'node1': 16, 'node2': 33 },
    { 'node1': 17, 'node2': 33 },
    { 'node1': 17, 'node2': 34 },
    { 'node1': 18, 'node2': 34 },
    { 'node1': 18, 'node2': 35 },

    { 'node1': 18, 'node2': 36 }, // 70
    { 'node1': 7, 'node2': 36 }, // 71
    { 'node1': 36, 'node2': 19 },
    { 'node1': 19, 'node2': 20 },
    { 'node1': 20, 'node2': 21 },
    { 'node1': 21, 'node2': 22 },
    { 'node1': 22, 'node2': 23 },
    { 'node1': 23, 'node2': 24 },
    { 'node1': 24, 'node2': 25 },
    { 'node1': 25, 'node2': 26 },

    { 'node1': 26, 'node2': 27 }, // 80
    { 'node1': 27, 'node2': 28 },
    { 'node1': 28, 'node2': 29 },
    { 'node1': 29, 'node2': 30 },
    { 'node1': 30, 'node2': 31 },
    { 'node1': 31, 'node2': 32 },
    { 'node1': 32, 'node2': 33 },
    { 'node1': 33, 'node2': 34 },
    { 'node1': 34, 'node2': 35 },
    { 'node1': 35, 'node2': 36 },

    { 'node1': 19, 'node2': 37 }, // 90
    { 'node1': 19, 'node2': 38 },
    { 'node1': 20, 'node2': 38 },
    { 'node1': 20, 'node2': 39 },
    { 'node1': 20, 'node2': 40 },
    { 'node1': 21, 'node2': 40 },
    { 'node1': 21, 'node2': 41 },
    { 'node1': 22, 'node2': 41 },
    { 'node1': 22, 'node2': 42 },
    { 'node1': 23, 'node2': 42 },

    { 'node1': 23, 'node2': 43 }, // 100
    { 'node1': 23, 'node2': 44 },
    { 'node1': 24, 'node2': 44 },
    { 'node1': 24, 'node2': 45 },
    { 'node1': 25, 'node2': 45 },
    { 'node1': 25, 'node2': 46 },
    { 'node1': 26, 'node2': 46 },
    { 'node1': 26, 'node2': 47 },
    { 'node1': 26, 'node2': 48 },
    { 'node1': 27, 'node2': 48 },

    { 'node1': 27, 'node2': 49 }, // 110
    { 'node1': 28, 'node2': 49 },
    { 'node1': 28, 'node2': 50 },
    { 'node1': 29, 'node2': 50 },
    { 'node1': 29, 'node2': 51 },
    { 'node1': 29, 'node2': 52 },
    { 'node1': 30, 'node2': 52 },
    { 'node1': 30, 'node2': 53 },
    { 'node1': 31, 'node2': 53 },
    { 'node1': 31, 'node2': 54 },

    { 'node1': 32, 'node2': 54 }, // 120
    { 'node1': 32, 'node2': 55 },
    { 'node1': 32, 'node2': 56 },
    { 'node1': 33, 'node2': 56 },
    { 'node1': 33, 'node2': 57 },
    { 'node1': 34, 'node2': 57 },
    { 'node1': 34, 'node2': 58 },
    { 'node1': 35, 'node2': 58 },
    { 'node1': 35, 'node2': 59 },
    { 'node1': 35, 'node2': 60 },

    { 'node1': 36, 'node2': 60 }, // 130
    { 'node1': 36, 'node2': 37 },
    { 'node1': 37, 'node2': 38 }, // 132
    { 'node1': 38, 'node2': 39 },
    { 'node1': 39, 'node2': 40 },
    { 'node1': 40, 'node2': 41 },
    { 'node1': 41, 'node2': 42 },
    { 'node1': 42, 'node2': 43 },
    { 'node1': 43, 'node2': 44 },
    { 'node1': 44, 'node2': 45 },

    { 'node1': 45, 'node2': 46 }, // 140
    { 'node1': 46, 'node2': 47 },
    { 'node1': 47, 'node2': 48 },
    { 'node1': 48, 'node2': 49 },
    { 'node1': 49, 'node2': 50 },
    { 'node1': 50, 'node2': 51 },
    { 'node1': 51, 'node2': 52 },
    { 'node1': 52, 'node2': 53 },
    { 'node1': 53, 'node2': 54 },
    { 'node1': 54, 'node2': 55 },

    { 'node1': 55, 'node2': 56 }, // 150
    { 'node1': 56, 'node2': 57 },
    { 'node1': 57, 'node2': 58 },
    { 'node1': 58, 'node2': 59 },
    { 'node1': 59, 'node2': 60 },
    { 'node1': 60, 'node2': 37 }, // 155
  ];


  /****** GRID FOR EX ********/
  private EXgridNodes = [
    397, 398, 399, 400, 271, 272, 273, 274, 275,
    267, 268, 269, 270, 217, 218, 219, 220, 276,
    213, 214, 215, 216, 169, 170, 171, 172, 173,
    165, 166, 167, 168, 127, 128, 129, 130, 174,
    123, 124, 125, 126,  91,  92,  93,  94, 131,
     87,  88,  89,  90,  61,  62,  63,  95, 132,
    100,  81,  59,  60,  37,  38,  39,  64, 102,
     80,  58,  35,  36,  19,  20,  40,  65, 103,
     79,  57,  34,  18,   7,   8,  21,  41,  66,
     56,  33,  17,   6,   1,   9,  22,  42,  67,
     55,  32,  16,   5,   0,   2,  10,  23,  43,
     54,  31,  15,   4,   3,  11,  24,  44,  69,
     75,  53,  30,  14,  13,  12,  25,  45,  70,
     74,  52,  29,  28,  27,  26,  46,  71, 104,
    105,  73,  51,  50,  49,  48,  47,  72, 106
  ];

  private EXlines = {
      0: {top: 895, left: 430, transform: -55},
      5: {top: 895, left: 380, transform: 55},
      7: {top: 895, left: 490, transform: 55},
     11: {top: 895, left: 330, transform: -55},
     15: {top: 895, left: 530, transform: -55},
     26: {top: 895, left: 280, transform: 55},
     32: {top: 895, left: 580, transform: 55},
     39: {top: 895, left: 230, transform: -55},
     48: {top: 895, left: 630, transform: -55},
     65: {top: 895, left: 180, transform: 55},
     76: {top: 895, left: 680, transform: 55},
     86: {top: 895, left: 130, transform: -55},
     99: {top: 895, left: 730, transform: -55},
    122: {top: 895, left: 80, transform: 55},
    137: {top: 895, left: 780, transform: 55},
    150: {top: 895, left: 30, transform: -55},

      1: {top: 935, left: 457},
      4: {top: 935, left: 354},
     16: {top: 935, left: 560},
     25: {top: 935, left: 252},
     49: {top: 935, left: 663},
     64: {top: 935, left: 149},
    100: {top: 935, left: 766},
    121: {top: 935, left: 46},

      6: {top: 845, left: 400},
     14: {top: 845, left: 500},
     27: {top: 845, left: 300},
     47: {top: 845, left: 600},
     66: {top: 845, left: 200},
     98: {top: 845, left: 700},
    123: {top: 845, left: 100},

      9: {top: 1025, left: 400},
     18: {top: 1025, left: 500},
     23: {top: 1025, left: 300},
     51: {top: 1025, left: 600},
     62: {top: 1025, left: 200},
    102: {top: 1025, left: 700},
    119: {top: 1025, left: 100},

     12: {top: 805, left: 430, transform: 55},
     13: {top: 805, left: 480, transform: -55},
     28: {top: 805, left: 330, transform: 55},
     29: {top: 805, left: 380, transform: -55},
     31: {top: 805, left: 530, transform: 55},
     40: {top: 805, left: 280, transform: -55},
     46: {top: 805, left: 580, transform: -55},
     67: {top: 805, left: 230, transform: 55},
     75: {top: 805, left: 630, transform: 55},
     87: {top: 805, left: 180, transform: -55},
     97: {top: 805, left: 680, transform: -55},
    124: {top: 805, left: 130, transform: 55},
    136: {top: 805, left: 730, transform: 55},
    151: {top: 805, left: 80, transform: -55},

     19: {top: 1075, left: 480, transform: 55},
     20: {top: 1075, left: 430, transform: -55},
     21: {top: 1075, left: 380, transform: 55},
     22: {top: 1075, left: 330, transform: -55},
     34: {top: 1075, left: 530, transform: -55},
     37: {top: 1075, left: 280, transform: 55},
     52: {top: 1075, left: 580, transform: 55},
     61: {top: 1075, left: 230, transform: -55},
     78: {top: 1075, left: 630, transform: -55},
     84: {top: 1075, left: 180, transform: 55},
    103: {top: 1075, left: 680, transform: 55},
    118: {top: 1075, left: 130, transform: -55},
    139: {top: 1075, left: 730, transform: -55},
    148: {top: 1075, left: 80, transform: 55},


     30: {top: 755, left: 457},
     41: {top: 755, left: 354},
     45: {top: 755, left: 560},
     68: {top: 755, left: 252},
     96: {top: 755, left: 663},
    125: {top: 755, left: 149},

     35: {top: 1115, left: 457},
     36: {top: 1115, left: 354},
     53: {top: 1115, left: 560},
     60: {top: 1115, left: 252},
    104: {top: 1115, left: 663},
    117: {top: 1115, left: 149},

     42: {top: 715, left: 430, transform: -55},
     43: {top: 715, left: 480, transform: 55},
     44: {top: 715, left: 530, transform: -55},
     69: {top: 715, left: 280, transform: 55},
     70: {top: 715, left: 330, transform: -55},
     71: {top: 715, left: 380, transform: 55},
     74: {top: 715, left: 580, transform: 55},
     88: {top: 715, left: 230, transform: -55},
     95: {top: 715, left: 630, transform: -55},
    126: {top: 715, left: 180, transform: 55},
    135: {top: 715, left: 680, transform: 55},
    152: {top: 715, left: 130, transform: -55},
    201: {top: 715, left: 80, transform: 55},
    235: {top: 715, left: 30, transform: -55},
    164: {top: 715, left: 730, transform: -55},
    215: {top: 715, left: 780, transform: 55},

     54: {top: 1165, left: 530, transform: 55},
     55: {top: 1165, left: 480, transform: -55},
     56: {top: 1165, left: 430, transform: 55},
     57: {top: 1165, left: 380, transform: -55},
     58: {top: 1165, left: 330, transform: 55},
     59: {top: 1165, left: 280, transform: -55},
     79: {top: 1165, left: 580, transform: -55},
     83: {top: 1165, left: 230, transform: 55},
    105: {top: 1165, left: 630, transform: 55},
    116: {top: 1165, left: 180, transform: -55},
    140: {top: 1165, left: 680, transform: -55},
    147: {top: 1165, left: 130, transform: 55},

     72: {top: 665, left: 400},
     73: {top: 665, left: 500},
     89: {top: 665, left: 300},
     94: {top: 665, left: 600},
    127: {top: 665, left: 200},
    202: {top: 665, left: 100},
    163: {top: 665, left: 700},
    250: {top: 665, left: 800},

     80: {top: 1205, left: 500},
     81: {top: 1205, left: 400},
     82: {top: 1205, left: 300},
    106: {top: 1205, left: 600},
    115: {top: 1205, left: 200},

      2: {top: 985, left: 430, transform: 55},
      3: {top: 985, left: 380, transform: -55},
      8: {top: 985, left: 480, transform: -55},
     10: {top: 985, left: 340, transform: 55},
     17: {top: 985, left: 530, transform: 55},
     24: {top: 985, left: 280, transform: -55},
     33: {top: 985, left: 580, transform: -55},
     38: {top: 985, left: 230, transform: 55},
     50: {top: 985, left: 630, transform: 55},
     63: {top: 985, left: 180, transform: -55},
     77: {top: 985, left: 680, transform: -55},
     85: {top: 985, left: 130, transform: 55},
    101: {top: 985, left: 730, transform: 55},
    120: {top: 985, left: 80, transform: -55},
    138: {top: 985, left: 780, transform: -55},
    149: {top: 985, left: 30, transform: 55},

     90: {top: 625, left: 430, transform: 55},
     91: {top: 625, left: 480, transform: -55},
     92: {top: 625, left: 530, transform: 55},
     93: {top: 625, left: 580, transform: -55},
    128: {top: 625, left: 230, transform: 55},
    129: {top: 625, left: 280, transform: -55},
    130: {top: 625, left: 330, transform: 55},
    131: {top: 625, left: 380, transform: -55},
    134: {top: 625, left: 630, transform: 55},
    153: {top: 625, left: 180, transform: -55},
    203: {top: 625, left: 130, transform: 55},
    236: {top: 625, left: 80, transform: -55},
    296: {top: 625, left: 30, transform: 55},
    162: {top: 625, left: 680, transform: -55},
    214: {top: 625, left: 730, transform: 55},
    249: {top: 625, left: 780, transform: -55},

    107: {top: 1255, left: 580, transform: 55},
    108: {top: 1255, left: 530, transform: -55},
    109: {top: 1255, left: 480, transform: 55},
    110: {top: 1255, left: 430, transform: -55},
    111: {top: 1255, left: 380, transform: 55},
    112: {top: 1255, left: 330, transform: -55},
    113: {top: 1255, left: 280, transform: 55},
    114: {top: 1255, left: 230, transform: -55},
    141: {top: 1255, left: 630, transform: -55},
    146: {top: 1255, left: 180, transform: 55},

    142: {top: 1275, left: 560},
    143: {top: 1275, left: 457},
    144: {top: 1275, left: 354},
    145: {top: 1275, left: 252},

    132: {top: 575, left: 457},
    133: {top: 575, left: 560},
    154: {top: 575, left: 252},
    155: {top: 575, left: 354},






    /*---------*/

    204: {top: 575, left: 149},
    297: {top: 575, left: 46},
    248: {top: 575, left: 766},
    161: {top: 575, left: 663},
    200: {top: 755, left: 46},
    199: {top: 805, left: 30, transform: 55},
    165: {top: 755, left: 766},
    166: {top: 805, left: 780, transform: -55},
    167: {top: 845, left: 800},

    /*---------*/




    337: {top: 535, left: 30, transform: -55},
    298: {top: 535, left: 80, transform: 55},
    237: {top: 535, left: 130, transform: -55},
    205: {top: 535, left: 180, transform: 55},
    206: {top: 535, left: 230, transform: -55},
    207: {top: 535, left: 280, transform: 55},
    208: {top: 535, left: 330, transform: -55},
    209: {top: 535, left: 380, transform: 55},
    156: {top: 535, left: 430, transform: -55},
    157: {top: 535, left: 480, transform: 55},
    158: {top: 535, left: 530, transform: -55},
    159: {top: 535, left: 580, transform: 55},
    160: {top: 535, left: 630, transform: -55},
    213: {top: 535, left: 680, transform: 55},
    247: {top: 535, left: 730, transform: -55},
    310: {top: 535, left: 780, transform: 55},

    299: {top: 485, left: 100},
    238: {top: 485, left: 200},
    239: {top: 485, left: 300},
    210: {top: 485, left: 400},
    211: {top: 485, left: 500},
    212: {top: 485, left: 600},
    246: {top: 485, left: 700},
    351: {top: 485, left: 800},

    411: {top: 445, left: 30, transform: 55},
    338: {top: 445, left: 80, transform: -55},
    300: {top: 445, left: 130, transform: 55},
    301: {top: 445, left: 180, transform: -55},
    302: {top: 445, left: 230, transform: 55},
    303: {top: 445, left: 280, transform: -55},
    304: {top: 445, left: 330, transform: 55},
    305: {top: 445, left: 380, transform: -55},
    240: {top: 445, left: 430, transform: 55},
    241: {top: 445, left: 480, transform: -55},
    242: {top: 445, left: 530, transform: 55},
    243: {top: 445, left: 580, transform: -55},
    244: {top: 445, left: 630, transform: 55},
    245: {top: 445, left: 680, transform: -55},
    309: {top: 445, left: 730, transform: 55},
    350: {top: 445, left: 780, transform: -55},

    412: {top: 395, left: 46},
    339: {top: 395, left: 149},
    340: {top: 395, left: 252},
    341: {top: 395, left: 354},
    306: {top: 395, left: 457},
    307: {top: 395, left: 560},
    308: {top: 395, left: 663},
    349: {top: 395, left: 766},

    458: {top: 355, left: 30, transform: -55},
    413: {top: 355, left: 80, transform: 55},
    414: {top: 355, left: 130, transform: -55},
    415: {top: 355, left: 180, transform: 55},
    416: {top: 355, left: 230, transform: -55},
    417: {top: 355, left: 280, transform: 55},
    418: {top: 355, left: 330, transform: -55},
    419: {top: 355, left: 380, transform: 55},
    342: {top: 355, left: 430, transform: -55},
    343: {top: 355, left: 480, transform: 55},
    344: {top: 355, left: 530, transform: -55},
    345: {top: 355, left: 580, transform: 55},
    346: {top: 355, left: 630, transform: -55},
    347: {top: 355, left: 680, transform: 55},
    348: {top: 355, left: 730, transform: -55},
    424: {top: 355, left: 780, transform: 55},

    459: {top: 305, left: 100},
    460: {top: 305, left: 200},
    461: {top: 305, left: 300},
    420: {top: 305, left: 400},
    421: {top: 305, left: 500},
    422: {top: 305, left: 600},
    423: {top: 305, left: 700},
    470: {top: 305, left: 800},

    544: {top: 265, left: 30, transform: 55},
    545: {top: 265, left: 80, transform: -55},
    546: {top: 265, left: 130, transform: 55},
    547: {top: 265, left: 180, transform: -55},
    548: {top: 265, left: 230, transform: 55},
    549: {top: 265, left: 280, transform: -55},
    550: {top: 265, left: 330, transform: 55},
    551: {top: 265, left: 380, transform: -55},
    462: {top: 265, left: 430, transform: 55},
    463: {top: 265, left: 480, transform: -55},
    464: {top: 265, left: 530, transform: 55},
    465: {top: 265, left: 580, transform: -55},
    466: {top: 265, left: 630, transform: 55},
    467: {top: 265, left: 680, transform: -55},
    468: {top: 265, left: 730, transform: 55},
    469: {top: 265, left: 780, transform: -55},

    596: {top: 215, left: 46},
    597: {top: 215, left: 149},
    598: {top: 215, left: 252},
    599: {top: 215, left: 354},
    552: {top: 215, left: 457},
    553: {top: 215, left: 560},
    554: {top: 215, left: 663},
    555: {top: 215, left: 766},

    694: {top: 175, left: 30, transform: -55},
    695: {top: 175, left: 80, transform: 55},
    696: {top: 175, left: 130, transform: -55},
    697: {top: 175, left: 180, transform: 55},
    698: {top: 175, left: 230, transform: -55},
    699: {top: 175, left: 280, transform: 55},
    700: {top: 175, left: 330, transform: -55},
    701: {top: 175, left: 380, transform: 55},
    600: {top: 175, left: 430, transform: -55},
    601: {top: 175, left: 480, transform: 55},
    602: {top: 175, left: 530, transform: -55},
    603: {top: 175, left: 580, transform: 55},
    604: {top: 175, left: 630, transform: -55},
    605: {top: 175, left: 680, transform: 55},
    606: {top: 175, left: 730, transform: -55},
    607: {top: 175, left: 780, transform: 55},

    // 459: {top: 125, left: 100},
    // 460: {top: 125, left: 200},
    // 461: {top: 125, left: 300},
    702: {top: 125, left: 400},
    703: {top: 125, left: 500},
    704: {top: 125, left: 600},
    705: {top: 125, left: 700},
    706: {top: 125, left: 800},

    // 544: {top: 85, left: 30, transform: 55},
    // 545: {top: 85, left: 80, transform: -55},
    // 546: {top: 85, left: 130, transform: 55},
    // 547: {top: 85, left: 180, transform: -55},
    // 548: {top: 85, left: 230, transform: 55},
    // 549: {top: 85, left: 280, transform: -55},
    // 550: {top: 85, left: 330, transform: 55},
    869: {top: 85, left: 380, transform: -55},
    // 462: {top: 85, left: 430, transform: 55},
    // 463: {top: 85, left: 480, transform: -55},
    // 464: {top: 85, left: 530, transform: 55},
    // 465: {top: 85, left: 580, transform: -55},
    // 466: {top: 85, left: 630, transform: 55},
    // 467: {top: 85, left: 680, transform: -55},
    // 468: {top: 85, left: 730, transform: 55},
    // 469: {top: 85, left: 780, transform: -55},

    // 596: {top: 35, left: 46},
    // 597: {top: 35, left: 149},
    // 598: {top: 35, left: 252},
    // 599: {top: 35, left: 354},
    // 552: {top: 35, left: 457},
    // 553: {top: 35, left: 560},
    // 554: {top: 35, left: 663},
    // 555: {top: 35, left: 766},




    // 178: {top: 1040, left: 800},

    // 179: {top: 1090, left: 780, transform: 55},
    // 180: {top: 1090, left: 30, transform: -55},

    // 181: {top: 1130, left: 46},
    // 182: {top: 1130, left: 766},

    // 183: {top: 1180, left: 30, transform: 55},
    // 184: {top: 1180, left: 730, transform: 55},
    // 185: {top: 1180, left: 780, transform: -55},
    // 186: {top: 1180, left: 80, transform: -55},

    // 187: {top: 1220, left: 100},
    // 188: {top: 1220, left: 700},
    // 189: {top: 1220, left: 800},

    // 190: {top: 1270, left: 80, transform: 55},
    // 191: {top: 1270, left: 680, transform: 55},
    // 192: {top: 1270, left: 780, transform: 55},
    // 193: {top: 1270, left: 730, transform: -55},
    // 194: {top: 1270, left: 130, transform: -55},
    // 195: {top: 1270, left: 30, transform: -55},
  };

  private EXnodeLine = {
      0: { 'node1': 0, 'node2': 1 },
      1: { 'node1': 0, 'node2': 2 },
      2: { 'node1': 0, 'node2': 3 },
      3: { 'node1': 0, 'node2': 4 },
      4: { 'node1': 0, 'node2': 5 },
      5: { 'node1': 0, 'node2': 6 },
      6: { 'node1': 6, 'node2': 1 },
      7: { 'node1': 1, 'node2': 2 },
      8: { 'node1': 2, 'node2': 3 },
      9: { 'node1': 3, 'node2': 4 },
     10: { 'node1': 4, 'node2': 5 }, // 10
     11: { 'node1': 5, 'node2': 6 },
     12: { 'node1': 1, 'node2': 7 },
     13: { 'node1': 1, 'node2': 8 },
     14: { 'node1': 1, 'node2': 9 },
     15: { 'node1': 2, 'node2': 9 },
     16: { 'node1': 2, 'node2': 10 },
     17: { 'node1': 2, 'node2': 11 },
     18: { 'node1': 3, 'node2': 11 },
     19: { 'node1': 3, 'node2': 12 },
     20: { 'node1': 3, 'node2': 13 }, // 20
     21: { 'node1': 4, 'node2': 13 },
     22: { 'node1': 4, 'node2': 14 },
     23: { 'node1': 4, 'node2': 15 },
     24: { 'node1': 5, 'node2': 15 },
     25: { 'node1': 5, 'node2': 16 },
     26: { 'node1': 5, 'node2': 17 },
     27: { 'node1': 6, 'node2': 17 },
     28: { 'node1': 6, 'node2': 18 },
     29: { 'node1': 6, 'node2': 7 },
     30: { 'node1': 7, 'node2': 8 }, // 30
     31: { 'node1': 8, 'node2': 9 },
     32: { 'node1': 9, 'node2': 10 },
     33: { 'node1': 10, 'node2': 11 },
     34: { 'node1': 11, 'node2': 12 },
     35: { 'node1': 12, 'node2': 13 },
     36: { 'node1': 13, 'node2': 14 },
     37: { 'node1': 14, 'node2': 15 },
     38: { 'node1': 15, 'node2': 16 },
     39: { 'node1': 16, 'node2': 17 },
     40: { 'node1': 17, 'node2': 18 }, // 40
     41: { 'node1': 18, 'node2': 7 },
     42: { 'node1': 7, 'node2': 19 }, // 42
     43: { 'node1': 8, 'node2': 19 },
     44: { 'node1': 8, 'node2': 20 },
     45: { 'node1': 8, 'node2': 21 },
     46: { 'node1': 9, 'node2': 21 },
     47: { 'node1': 9, 'node2': 22 },
     48: { 'node1': 10, 'node2': 22 },
     49: { 'node1': 10, 'node2': 23 },
     50: { 'node1': 10, 'node2': 24 }, // 50
     51: { 'node1': 11, 'node2': 24 },
     52: { 'node1': 11, 'node2': 25 },
     53: { 'node1': 12, 'node2': 25 },
     54: { 'node1': 12, 'node2': 26 },
     55: { 'node1': 12, 'node2': 27 },
     56: { 'node1': 13, 'node2': 27 },
     57: { 'node1': 13, 'node2': 28 },
     58: { 'node1': 14, 'node2': 28 },
     59: { 'node1': 14, 'node2': 29 },
     60: { 'node1': 14, 'node2': 30 }, // 60
     61: { 'node1': 15, 'node2': 30 },
     62: { 'node1': 15, 'node2': 31 },
     63: { 'node1': 16, 'node2': 31 },
     64: { 'node1': 16, 'node2': 32 },
     65: { 'node1': 16, 'node2': 33 },
     66: { 'node1': 17, 'node2': 33 },
     67: { 'node1': 17, 'node2': 34 },
     68: { 'node1': 18, 'node2': 34 },
     69: { 'node1': 18, 'node2': 35 },
     70: { 'node1': 18, 'node2': 36 }, // 70
     71: { 'node1': 7, 'node2': 36 }, // 71
     72: { 'node1': 36, 'node2': 19 },
     73: { 'node1': 19, 'node2': 20 },
     74: { 'node1': 20, 'node2': 21 },
     75: { 'node1': 21, 'node2': 22 },
     76: { 'node1': 22, 'node2': 23 },
     77: { 'node1': 23, 'node2': 24 },
     78: { 'node1': 24, 'node2': 25 },
     79: { 'node1': 25, 'node2': 26 },
     80: { 'node1': 26, 'node2': 27 }, // 80
     81: { 'node1': 27, 'node2': 28 },
     82: { 'node1': 28, 'node2': 29 },
     83: { 'node1': 29, 'node2': 30 },
     84: { 'node1': 30, 'node2': 31 },
     85: { 'node1': 31, 'node2': 32 },
     86: { 'node1': 32, 'node2': 33 },
     87: { 'node1': 33, 'node2': 34 },
     88: { 'node1': 34, 'node2': 35 },
     89: { 'node1': 35, 'node2': 36 },
     90: { 'node1': 19, 'node2': 37 }, // 90
     91: { 'node1': 19, 'node2': 38 },
     92: { 'node1': 20, 'node2': 38 },
     93: { 'node1': 20, 'node2': 39 },
     94: { 'node1': 20, 'node2': 40 },
     95: { 'node1': 21, 'node2': 40 },
     96: { 'node1': 21, 'node2': 41 },
     97: { 'node1': 22, 'node2': 41 },
     98: { 'node1': 22, 'node2': 42 },
     99: { 'node1': 23, 'node2': 42 },
    100: { 'node1': 23, 'node2': 43 }, // 100
    101: { 'node1': 23, 'node2': 44 },
    102: { 'node1': 24, 'node2': 44 },
    103: { 'node1': 24, 'node2': 45 },
    104: { 'node1': 25, 'node2': 45 },
    105: { 'node1': 25, 'node2': 46 },
    106: { 'node1': 26, 'node2': 46 },
    107: { 'node1': 26, 'node2': 47 },
    108: { 'node1': 26, 'node2': 48 },
    109: { 'node1': 27, 'node2': 48 },
    110: { 'node1': 27, 'node2': 49 }, // 110
    111: { 'node1': 28, 'node2': 49 },
    112: { 'node1': 28, 'node2': 50 },
    113: { 'node1': 29, 'node2': 50 },
    114: { 'node1': 29, 'node2': 51 },
    115: { 'node1': 29, 'node2': 52 },
    116: { 'node1': 30, 'node2': 52 },
    117: { 'node1': 30, 'node2': 53 },
    118: { 'node1': 31, 'node2': 53 },
    119: { 'node1': 31, 'node2': 54 },
    120: { 'node1': 32, 'node2': 54 }, // 120
    121: { 'node1': 32, 'node2': 55 },
    122: { 'node1': 32, 'node2': 56 },
    123: { 'node1': 33, 'node2': 56 },
    124: { 'node1': 33, 'node2': 57 },
    125: { 'node1': 34, 'node2': 57 },
    126: { 'node1': 34, 'node2': 58 },
    127: { 'node1': 35, 'node2': 58 },
    128: { 'node1': 35, 'node2': 59 },
    129: { 'node1': 35, 'node2': 60 },
    130: { 'node1': 36, 'node2': 60 }, // 130
    131: { 'node1': 36, 'node2': 37 },
    132: { 'node1': 37, 'node2': 38 }, // 132
    133: { 'node1': 38, 'node2': 39 },
    134: { 'node1': 39, 'node2': 40 },
    135: { 'node1': 40, 'node2': 41 },
    136: { 'node1': 41, 'node2': 42 },
    137: { 'node1': 42, 'node2': 43 },
    138: { 'node1': 43, 'node2': 44 },
    139: { 'node1': 44, 'node2': 45 },
    140: { 'node1': 45, 'node2': 46 }, // 140
    141: { 'node1': 46, 'node2': 47 },
    142: { 'node1': 47, 'node2': 48 },
    143: { 'node1': 48, 'node2': 49 },
    144: { 'node1': 49, 'node2': 50 },
    145: { 'node1': 50, 'node2': 51 },
    146: { 'node1': 51, 'node2': 52 },
    147: { 'node1': 52, 'node2': 53 },
    148: { 'node1': 53, 'node2': 54 },
    149: { 'node1': 54, 'node2': 55 },
    150: { 'node1': 55, 'node2': 56 }, // 150
    151: { 'node1': 56, 'node2': 57 },
    152: { 'node1': 57, 'node2': 58 },
    153: { 'node1': 58, 'node2': 59 },
    154: { 'node1': 59, 'node2': 60 },
    155: { 'node1': 60, 'node2': 37 }, // 155




    204: { 'node1': 81, 'node2': 59 },
    297: { 'node1': 100, 'node2': 81 },
    248: { 'node1': 64, 'node2': 102 },
    161: { 'node1': 39, 'node2': 64 },
    // 200: { "node1": 60, "node2": 37 },
    // 199: { "node1": 60, "node2": 37 },
    // 165: { "node1": 60, "node2": 37 },
    // 166: { "node1": 60, "node2": 37 },
    // 167: { "node1": 60, "node2": 37 },



    337: { 'node1': 100, 'node2': 87 },
    298: { 'node1': 87, 'node2': 81 },
    237: { 'node1': 81, 'node2': 88 },
    205: { 'node1': 88, 'node2': 59 },
    206: { 'node1': 59, 'node2': 89 },
    207: { 'node1': 89, 'node2': 60 },
    208: { 'node1': 60, 'node2': 90 },
    209: { 'node1': 90, 'node2': 37 }, //////////
    156: { 'node1': 37, 'node2': 61 }, //////////
    157: { 'node1': 61, 'node2': 38 },
    158: { 'node1': 38, 'node2': 62 },
    159: { 'node1': 62, 'node2': 39 },
    160: { 'node1': 39, 'node2': 63 },
    213: { 'node1': 63, 'node2': 64 },
    247: { 'node1': 64, 'node2': 95 },
    310: { 'node1': 95, 'node2': 102 },

    299: { 'node1': 87, 'node2': 88 },
    238: { 'node1': 88, 'node2': 89 },
    239: { 'node1': 89, 'node2': 90 },
    210: { 'node1': 90, 'node2': 61 },
    211: { 'node1': 61, 'node2': 62 },
    212: { 'node1': 62, 'node2': 63 },
    246: { 'node1': 63, 'node2': 95 },
    351: { 'node1': 95, 'node2': 102 },

    411: { 'node1': 123, 'node2': 87 },
    338: { 'node1':  87, 'node2': 124 },
    300: { 'node1': 124, 'node2': 88 },
    301: { 'node1':  88, 'node2': 125 },
    302: { 'node1': 125, 'node2': 89 },
    303: { 'node1':  89, 'node2': 126 },
    304: { 'node1': 126, 'node2': 90 },
    305: { 'node1':  90, 'node2': 91 },
    240: { 'node1':  91, 'node2': 61 },
    241: { 'node1':  61, 'node2': 92 },
    242: { 'node1':  92, 'node2': 62 },
    243: { 'node1':  62, 'node2': 93 },
    244: { 'node1':  93, 'node2': 63 },
    245: { 'node1':  63, 'node2': 94 },
    309: { 'node1':  94, 'node2': 95 },
    350: { 'node1':  95, 'node2': 131 },

    412: { 'node1': 123, 'node2': 124 },
    339: { 'node1': 124, 'node2': 125 },
    340: { 'node1': 125, 'node2': 126 },
    341: { 'node1': 126, 'node2': 91 },
    306: { 'node1': 91, 'node2': 92 },
    307: { 'node1': 92, 'node2': 93 },
    308: { 'node1': 93, 'node2': 94 },
    349: { 'node1': 94, 'node2': 131 },

    458: { 'node1': 123, 'node2': 165 },
    413: { 'node1': 165, 'node2': 124 },
    414: { 'node1': 124, 'node2': 166 },
    415: { 'node1': 166, 'node2': 125 },
    416: { 'node1': 125, 'node2': 167 },
    417: { 'node1': 167, 'node2': 126 },
    418: { 'node1': 126, 'node2': 168 },
    419: { 'node1': 168, 'node2': 91 },
    342: { 'node1':  91, 'node2': 127 },
    343: { 'node1': 127, 'node2': 92 },
    344: { 'node1':  92, 'node2': 128 },
    345: { 'node1': 128, 'node2': 93 },
    346: { 'node1':  93, 'node2': 129 },
    347: { 'node1': 129, 'node2': 94 },
    348: { 'node1':  94, 'node2': 130 },
    424: { 'node1': 130, 'node2': 131 },

    459: { 'node1': 165, 'node2': 166 },
    460: { 'node1': 166, 'node2': 167 },
    461: { 'node1': 167, 'node2': 168 },
    420: { 'node1': 168, 'node2': 127 },
    421: { 'node1': 127, 'node2': 128 },
    422: { 'node1': 128, 'node2': 129 },
    423: { 'node1': 129, 'node2': 130 },
    470: { 'node1': 130, 'node2': 174 },

    544: { 'node1': 213, 'node2': 165 },
    545: { 'node1': 165, 'node2': 214 },
    546: { 'node1': 214, 'node2': 166 },
    547: { 'node1': 166, 'node2': 215 },
    548: { 'node1': 215, 'node2': 167 },
    549: { 'node1': 167, 'node2': 216 },
    550: { 'node1': 216, 'node2': 168 },
    551: { 'node1': 168, 'node2': 169 },
    462: { 'node1': 169, 'node2': 127 },
    463: { 'node1': 127, 'node2': 170 },
    464: { 'node1': 170, 'node2': 128 },
    465: { 'node1': 128, 'node2': 171 },
    466: { 'node1': 171, 'node2': 129 },
    467: { 'node1': 129, 'node2': 172 },
    468: { 'node1': 172, 'node2': 130 },
    469: { 'node1': 130, 'node2': 173 },

    596: { 'node1': 213, 'node2': 214 },
    597: { 'node1': 214, 'node2': 215 },
    598: { 'node1': 215, 'node2': 216 },
    599: { 'node1': 216, 'node2': 169 },
    552: { 'node1': 169, 'node2': 170 },
    553: { 'node1': 170, 'node2': 171 },
    554: { 'node1': 171, 'node2': 172 },
    555: { 'node1': 172, 'node2': 173 },

    694: { 'node1': 213, 'node2': 267 },
    695: { 'node1': 267, 'node2': 214 },
    696: { 'node1': 214, 'node2': 268 },
    697: { 'node1': 268, 'node2': 215 },
    698: { 'node1': 215, 'node2': 269 },
    699: { 'node1': 269, 'node2': 216 },
    700: { 'node1': 216, 'node2': 270 },
    701: { 'node1': 270, 'node2': 169 },
    600: { 'node1': 169, 'node2': 217 },
    601: { 'node1': 217, 'node2': 170 },
    602: { 'node1': 170, 'node2': 218 },
    603: { 'node1': 218, 'node2': 171 },
    604: { 'node1': 171, 'node2': 219 },
    605: { 'node1': 219, 'node2': 172 },
    606: { 'node1': 172, 'node2': 220 },
    607: { 'node1': 220, 'node2': 173 },

    // 459: {top: 125, left: 100},
    // 460: {top: 125, left: 200},
    // 461: {top: 125, left: 300},
    702: { 'node1': 270, 'node2': 217 },
    703: { 'node1': 217, 'node2': 218 },
    704: { 'node1': 218, 'node2': 219 },
    705: { 'node1': 219, 'node2': 220 },
    706: { 'node1': 220, 'node2': 276 },

    // 544: {top: 85, left: 30, transform: 55},
    // 545: {top: 85, left: 80, transform: -55},
    // 546: {top: 85, left: 130, transform: 55},
    // 547: {top: 85, left: 180, transform: -55},
    // 548: {top: 85, left: 230, transform: 55},
    // 549: {top: 85, left: 280, transform: -55},
    // 550: {top: 85, left: 330, transform: 55},
    869: { 'node1': 270, 'node2': 271 },
    // 462: {top: 85, left: 430, transform: 55},
    // 463: {top: 85, left: 480, transform: -55},
    // 464: {top: 85, left: 530, transform: 55},
    // 465: {top: 85, left: 580, transform: -55},
    // 466: {top: 85, left: 630, transform: 55},
    // 467: {top: 85, left: 680, transform: -55},
    // 468: {top: 85, left: 730, transform: 55},
    // 469: {top: 85, left: 780, transform: -55},

    // 596: {top: 35, left: 46},
    // 597: {top: 35, left: 149},
    // 598: {top: 35, left: 252},
    // 599: {top: 35, left: 354},
    // 552: {top: 35, left: 457},
    // 553: {top: 35, left: 560},
    // 554: {top: 35, left: 663},
    // 555: {top: 35, left: 766},
  };





  constructor(
    private skillService: SkillService,
    private translateService: TranslateService,
    private nameService: NameService
  ) {}

  async generateEsperGrid(esper, size) {
    const nodesForGrid = [];

    for (const node of this.gridNodes) {
      if (esper.board.nodes[node.toString()]) {
        const buff = await this.skillService.getSkill(esper.board.nodes[node.toString()].dataId);

        nodesForGrid[node] = {
          type: 'text',
          value: this.skillService.formatEffect(esper, buff, buff.effects[0], false)
        };
      } else if (node === 0) {
        nodesForGrid[node] = {
          type: 'center'
        };
      } else {
        nodesForGrid[node] = {
          type: 'hidden'
        };
      }
    }

    let linesHtml = '';
    esper.board.lines.forEach(line => {
      let html = '<div class="line" style="top: ' + (this.lines[line].top * size / 1000) + 'px; left: ' + (this.lines[line].left * size / 1000) + 'px;';
      if (this.lines[line].transform) {
        html = html + 'transform: rotate(' + this.lines[line].transform + 'deg);';
      }
      html = html + '"></div>';
      linesHtml += html;
    });

    this.generateNodesHierachy(esper);

    return {
      lines: linesHtml,
      nodesForGrid: nodesForGrid,
      gridNodes: this.gridNodes
    };
  }

  generateUnitGrid(unit, size, exJob = false) {
    const nodesForGrid = [];

    if (exJob) {
      this.EXgridNodes.forEach(node => {
        if (unit.board.nodes[node.toString()]) {
          const skill = unit.board.nodes[node.toString()].skill;
          let text = '';

          if (unit.board.nodes[node.toString()].type === 'buff') {
            text = this.skillService.formatEffect(unit, skill, skill.effects[0], false);
          } else {
            text = this.nameService.getName(skill);
          }

          nodesForGrid[node] = {
            type: 'text',
            subType: unit.board.nodes[node.toString()].type,
            value: text
          };
        } else if (node === 0) {
          nodesForGrid[node] = {
            type: 'center'
          };
        } else {
          nodesForGrid[node] = {
            type: 'hidden'
          };
        }
      });
    } else {
      this.gridNodes.forEach(node => {
        if (unit.board.nodes[node.toString()]) {
          const skill = unit.board.nodes[node.toString()].skill;
          let text = '';

          if (unit.board.nodes[node.toString()].type === 'buff') {
            text = this.skillService.formatEffect(unit, skill, skill.effects[0], false);
          } else {
            text = this.nameService.getName(skill);
          }

          nodesForGrid[node] = {
            type: 'text',
            subType: unit.board.nodes[node.toString()].type,
            value: text
          };
        } else if (node === 0) {
          nodesForGrid[node] = {
            type: 'center'
          };
        } else {
          nodesForGrid[node] = {
            type: 'hidden'
          };
        }
      });
    }

    let linesHtml = '';
    const lines = exJob ? this.EXlines : this.lines;

    unit.board.lines.forEach(line => {
      if (lines[line]) {
        let html = '<div class="line" style="top: ' + (lines[line].top * size / 1000) + 'px; left: ' + (lines[line].left * size / 1000) + 'px;';
        if (lines[line].transform) {
          html = html + 'transform: rotate(' + lines[line].transform + 'deg);';
        }
        html = html + '"></div>';
        linesHtml += html;
      }
    });

    if (exJob) {
      this.generateNodesHierachyEX(unit);
    } else {
      this.generateNodesHierachy(unit);
    }

    return {
      lines: linesHtml,
      nodesForGrid: nodesForGrid,
      gridNodes: exJob ? this.EXgridNodes : this.gridNodes
    };
  }

  generateNodesHierachyEX(item, lines = null, node = 0) {
    if (!lines) {
      lines = JSON.parse(JSON.stringify(item.board.lines));
    }

    const childNodes = this.searchChildNodesEX(lines, node);
    if (node !== 0) {
      item.board.nodes[node].children = childNodes;
    }

    childNodes.forEach(childNode => {
      item.board.nodes[childNode].parent = node;
      this.generateNodesHierachyEX(item, lines, childNode);
    });
  }

  private searchChildNodesEX(lines, node) {
    const childNodes = [];
    const linesToRemove = [];

    lines.forEach((line, lineIndex) => {
      if (this.EXnodeLine[line].node1 === node) {
        childNodes.push(this.EXnodeLine[line].node2);
        linesToRemove.push(lineIndex);

      } else if (this.EXnodeLine[line].node2 === node) {
        childNodes.push(this.EXnodeLine[line].node1);
        linesToRemove.push(lineIndex);
      }
    });

    linesToRemove.sort(function(a, b) {return b - a; });
    linesToRemove.forEach(line => {
      lines.splice(line, 1);
    });

    return childNodes;
  }

  generateNodesHierachy(item, lines = null, node = 0) {
    if (!lines) {
      lines = JSON.parse(JSON.stringify(item.board.lines));
    }

    const childNodes = this.searchChildNodes(lines, node);
    if (node !== 0) {
      item.board.nodes[node].children = childNodes;
    }

    childNodes.forEach(childNode => {
      item.board.nodes[childNode].parent = node;
      this.generateNodesHierachy(item, lines, childNode);
    });
  }

  private searchChildNodes(lines, node) {
    const childNodes = [];
    const linesToRemove = [];

    lines.forEach((line, lineIndex) => {
      if (this.nodeLine[line].node1 === node) {
        childNodes.push(this.nodeLine[line].node2);
        linesToRemove.push(lineIndex);

      } else if (this.nodeLine[line].node2 === node) {
        childNodes.push(this.nodeLine[line].node1);
        linesToRemove.push(lineIndex);
      }
    });

    linesToRemove.sort(function(a, b) {return b - a; });
    linesToRemove.forEach(line => {
      lines.splice(line, 1);
    });

    return childNodes;
  }
}
