export const UNITS: any[] = [
  {
    id: 1,
    names: {
      en: 'Tidus',
      fr: 'Tidus',
      tw: '提達',
      es: 'Tidus',
      de: 'Tidus',
      kr: '프리오닐'
    },
    abilities: [
      {
        names: {
          en: 'Quick Hit',
          fr: 'Attaque éclair',
          tw: '快捷進擊',
          kr: '퀵 트릭',
          de: 'Schneller Treffer',
          es: 'Golpe rápido'
        },
        framesList: '0-5-5-5-5-5-5-5-5-5-5-20',
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 22,
        castTime: 20,
        offset: 16,
        base: 400
      },
      {
        names: {
          en: 'Quick Hit +2 (JP Only)',
          fr: 'Attaque éclair +2 (JP Seulement)',
          tw: '快捷進擊 +2 (JP Only)',
          kr: '퀵 트릭 +2 (JP Only)',
          de: 'Schneller Treffer +2 (JP Only)',
          es: 'Golpe rápido +2 (JP Only)'
        },
        framesList: '0-5-5-5-5-5-5-5-5-5-5-20',
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 22,
        castTime: 20,
        offset: 16,
        base: 720
      },
      {
        names: {
          en: 'Energy Rain',
          fr: 'Déluge d\'énergie',
          tw: '能量雨',
          kr: '에너지 레인',
          de: 'Energieregen',
          es: 'Lluvia de energía'
        },
        framesList: '0-10-10-10',
        firstHit: 67,
        castTime: 40,
        offset: 16,
        base: 180
      },
      {
        names: {
          en: 'Jecht Shot',
          fr: 'Jecht Shoot',
          tw: '傑克特射門',
          kr: '젝트 슛',
          de: 'Jechtschuss',
          es: 'Chut de Jecht'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 100,
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50,
        elements: [
          'water'
        ]
      },
      {
        names: {
          en: "Blitz Ace",
          tw: "水鬥球王牌",
          kr: "블리츠의 에이스",
          fr: "Champion de blitz",
          de: "Blitzass",
          es: "As del blitzbol"
        },
        framesList: '0-4-10-4-10-4-4-4-12-4-20-4-14-4-36-150',
        hitDamage: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 20],
        firstHit: 106,
        castTime: 0,
        offset: 0,
        base: 410,
        debuff: {
          water: 100
        },
        dualable: false
      },
    ],
    weapons : [
      'water'
    ]
  },
  {
    id: 2,
    names: {
      en: 'Firion',
      fr: 'Firion',
      tw: '弗利奧尼爾',
      kr: '프리오닐',
      de: 'Firion',
      es: 'Firion'
    },
    abilities: [
      {
        names: {
          en: 'Fin Briar',
          fr: 'Fin Briar',
          tw: '野薔薇之翼',
          kr: '핀의 들장미',
          de: 'Fingestrüpp',
          es: 'Fin Briar'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 30,
        castTime: 0, //"effect_frames": [[0, 0, 27]],
        offset: 36,
        base: 180,
        ignore: 25
      },
      {
        names: {
          en: 'Fin Briar +2',
          fr: 'Fin Briar +2',
          tw: '野薔薇之翼 +2',
          kr: '핀의 들장미 +2',
          de: 'Fingestrüpp +2',
          es: 'Fin Briar +2'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 30,
        castTime: 0, //"effect_frames": [[0, 0, 27]],
        offset: 36,
        base: 230,
        ignore: 50
      }
    ]
  },
  {
    id: 3,
    names: {
      en: 'Orlandeau',
      fr: 'Orlandeau',
      tw: '奧爾蘭多',
      kr: '올란두',
      de: 'Orlandeau',
      es: 'Orlandeau'
    },
    abilities: [
      {
        names: {
          en: 'Divine Ruination',
          fr: 'Ruine divine',
          tw: '聖光爆裂破',
          kr: '성광폭렬파',
          de: 'Göttliche Zerstörung',
          es: 'Ruina divina'
        },
        framesList: '0-7-5-7-7-7-7',
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        firstHit: 70,
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50,
        debuff: {
          light: 50
        }
      },
      {
        names: {
          en: 'Divine Ruination +2',
          fr: 'Ruine divine +2',
          tw: '聖光爆裂破 +2',
          kr: '성광폭렬파 +2',
          de: 'Göttliche Zerstörung +2',
          es: 'Ruina divina +2'
        },
        framesList: '0-7-5-7-7-7-7',
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        firstHit: 70,
        castTime: 40,
        offset: 16,
        base: 260,
        ignore: 50,
        debuff: {
          light: 50
        }
      }
    ],
    weapons : [
      'light'
    ]
  },
  {
    id: 4,
    names: {
      en: 'Lunera',
      fr: 'Lunera',
      tw: '盧內拉',
      kr: '루네라',
      de: 'Lunera',
      es: 'Lunera'
    },
    abilities: [
      {
        names: {
          en: 'Aureole Ray',
          fr: 'Rayon auréole',
          tw: '日輪射線',
          kr: '광환의 광선',
          de: 'Koronastrahl',
          es: 'Rayo áureo'
        },
        framesList: '0-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 400,
        elements: [
          'wind',
          'light'
        ],
        damage: 'magic',
        dualable: false
      },
      {
        names: {
          en: 'Aureole Ray +2 (JP Only)',
          fr: 'Rayon auréole +2 (JP Seulement)',
          tw: '日輪射線 +2 (JP Only)',
          kr: '광환의 광선 +2 (JP Only)',
          de: 'Koronastrahl +2 (JP Only)',
          es: 'Rayo áureo +2 (JP Only)'
        },
        framesList: '0-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4',
        hitDamage: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 400,
        elements: [
          'wind',
          'light'
        ],
        damage: 'magic',
        dualable: false
      },
      {
        names: {
          en: 'Gleaming Arrow',
          fr: 'Flèche étincelante',
          tw: '閃光箭',
          kr: '빛나는 화살',
          de: 'Leuchtender Pfeil',
          es: 'Saeta centella'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 410,
        castTime: 0,
        offset: 0,
        base: 1500,
        elements : [
          'light'
        ],
        damage: 'magic',
        dualable: false
      },
      {
        names: {
          en: 'Gail Arrow',
          fr: 'Flèche tornade',
          tw: '烈風箭',
          kr: '돌풍의 화살',
          de: 'Gailpfeil',
          es: 'Saeta tornado'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 70,
        castTime: 0,
        offset: 0,
        base: 1500,
        elements : [
          'wind'
        ],
        damage: 'magic',
        dualable: false
      }
    ],
    dual: false
  },
  {
    id: 5,
    names: {
      en: 'Aileen',
      fr: 'Aileen',
      tw: '艾琳',
      kr: '아이린',
      de: 'Aileen',
      es: 'Aileen'
    },
    abilities: [
      {
        names: {
          en: 'Piledriver',
          fr: 'Sonnette',
          tw: '打樁機',
          kr: '항타기',
          de: 'Ramme',
          es: 'Martinete'
        },
        framesList: '0-15-15-15-15',
        firstHit: 2,
        castTime: 0,
        offset: 36,
        base: 200,
        ignore: 50,
        debuff: {
          earth: 50
        }
      },
      {
        names: {
          en: 'Piledriver +2 (JP Only)',
          fr: 'Sonnette +2 (JP Seulement)',
          tw: '打樁機 +2 (JP Only)',
          kr: '항타기 +2 (JP Only)',
          de: 'Ramme +2 (JP Only)',
          es: 'Martinete +2 (JP Only)'
        },
        framesList: '0-8-8-8-8-8-8',
        hitDamage: [14, 14, 14, 14, 14, 15, 15],
        firstHit: 2,
        castTime: 0,
        offset: 36,
        base: 250,
        ignore: 50,
        debuff: {
          earth: 75
        }
      }
    ],
    weapons : [
      'earth'
    ]
  },
  {
    id: 6,
    names: {
      en: 'Dark Veritas',
      fr: 'Veritas des Ténèbres',
      tw: '常暗之維利亞斯',
      kr: '영원한 어둠의 베리어스',
      de: 'Veritas der Finstere',
      es: 'Veritas el tenebroso'
    },
    abilities: [
      {
        names: {
          en: 'Dark Punishment',
          fr: 'Punition obscure',
          tw: '暗黑之罪',
          kr: '암흑의 죄업',
          de: 'Dunkelstrafe',
          es: 'Castigo tenebroso'
        },
        framesList: '0-7-5-7-7-7-7',
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        firstHit: 70,
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50,
        debuff: {
          dark: 50
        }
      },
      {
        names: {
          en: 'Dark Edge',
          fr: 'Entaille obscure',
          tw: '暗黑之刃',
          kr: '암흑의 칼',
          de: 'Dunkelschneide',
          es: 'Filo tenebroso'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 110,
        castTime: 40, //"effect_frames": [[0, 0, 40]],
        offset: 16,
        base: 200,
        ignore: 50,
        elements: [
          'dark'
        ]
      }
    ],
    weapons : [
      'dark'
    ]
  },
  {
    id: 7,
    names: {
      en: '2B',
      fr: '2B',
      tw: '2B',
      kr: '2B',
      de: '2B',
      es: '2B'
    },
    'abilities': [
      {
        names: {
          en: 'Avoid Attack',
          fr: 'Esquiver Attaque',
          tw: '閃避攻擊',
          kr: '어보이드 어택',
          de: 'Angriff ausweichen',
          es: 'Esquivar'
        },
        framesList: '0-9-9-9-9-9-9-9',
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 900,
      },
      {
        names: {
          en: 'Extract Speed',
          fr: 'Attaque Sonique',
          tw: '迅速攻擊',
          kr: '스피드 어택',
          de: 'Extrakt-Tempo',
          es: 'Lentificar'
        },
        framesList: '0-7-7-7-8-8-8-8-8-8',
        firstHit: 2,
        castTime: 0,
        offset: 40,
        base: 600,
      },
      {
        names: {
          en: 'R050: Spear',
          fr: 'R050: Lance',
          tw: 'R050：矛',
          kr: 'R050: 스피어',
          de: 'R050: Speer',
          es: 'R050: Lanza'
        },
        framesList: '0-5-5-5-5-5',
        hitDamage: [16, 16, 17, 17, 17, 17],
        firstHit: 22,
        castTime: 0, //"effect_frames": [[0, 0, 20, 25, 30, 35, 40, 45]],
        offset: 40,
        base: 550,
      },
      {
        names: {
          en: 'Steel Pipe',
          fr: 'Barre de fer',
          tw: '鐵管',
          kr: '쇠 파이프',
          de: 'Stahlröhre',
          es: 'Tubo de hierro'
        },
        framesList: '0-8-8-8-8-8-8-9',
        hitDamage : [12, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 200,
      },
      {
        names: {
          en: 'A150: Vault',
          fr: 'A150: Décharge',
          tw: 'A150：伏特',
          kr: 'A150: 볼트',
          de: 'A150: Volt',
          es: 'A150: Voltio'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 400,
        debuff: {
          lightning: 65
        }
      },
      {
        names: {
          en: 'Self Destruct: 2B',
          fr: 'Autodestruction : 2B',
          tw: '自爆：2B',
          kr: '자폭: 2B',
          de: 'Selbstzerstörung: 2B',
          es: 'Autodestrucción: 2B'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 80,
        castTime: 40,
        offset: 0,
        base: 999,
        dualable: false
      },
      {
        names: {
          en: 'Ho229 Type-B',
          fr: 'Ho229 Type-B',
          tw: 'Ho229 Type-B',
          kr: 'Ho229 Type-B',
          de: 'Ho229 Type-B',
          es: 'Ho229 Tipo-B'
        },
        framesList: '0-10-10-10-11-12-12-12-12-12',
        firstHit: 125,
        castTime: 0,
        offset: 0,
        base: 545,
        ignore: 50,
        dualable: false
      },
    ]
  },
  {
    id: 8,
    names: {
      en: '9S',
      fr: '9S',
      tw: '9S',
      kr: '9S',
      de: '9S',
      es: '9S'
    },
    'abilities': [
      {
        names: {
          en: 'Counter Attack',
          fr: 'Contre-attaquer',
          tw: '反制攻擊',
          kr: '카운터 어택',
          de: 'Konterangriff',
          es: 'Contragolpe'
        },
        framesList: '0-10-10-10-10',
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 180,
        ignore: 50
      },
      {
        names: {
          en: 'Self Destruct: 9S',
          fr: 'Autodestruction : 9S',
          tw: '自爆：9S',
          kr: '자폭: 9S',
          de: 'Selbstzerstörung: 9S',
          es: 'Autodestrucción: 9S'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 80,
        castTime: 40,
        offset: 0,
        base: 999,
        dualable: false
      },
    ]
  },
  {
    id: 9,
    names: {
      en: 'A2',
      fr: 'A2',
      tw: 'A2',
      kr: 'A2',
      de: 'A2',
      es: 'A2'
    },
    'abilities': [
      {
        names: {
          en: 'Dash Attack',
          fr: 'Attaque rapide',
          tw: '突進攻擊',
          kr: '대시',
          de: 'Sprintangriff',
          es: 'Ataque en carrera'
        },
        framesList: '0-7-7-8-8-16-8',
        hitDamage: [10, 15, 15, 15, 15, 15, 15],
        firstHit: 9,
        castTime: 9,
        offset: 30,
        base: 400,
      },
      {
        names: {
          en: 'Offensive Heal Combo',
          fr: 'Combo offensivo-curatif',
          tw: '攻擊時回復HP連擊',
          kr: '공격 HP 회복 콤보',
          de: 'Offensive Heilkombo',
          es: 'Combo curativo-ofensivo'
        },
        framesList: '0-5-5-5-5-5-5-5-5-5-5-5-5-5',
        hitDamage: [6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 9, 10, 10, 10],
        firstHit: 35,
        castTime: 35,
        offset: 31,
        base: 510,
      },
      {
        names: {
          en: 'Heavy Attack',
          fr: 'Attaque lourde',
          tw: '強攻擊',
          kr: '강공격',
          de: 'Schwerer Angriff',
          es: 'Ataque pesado'
        },
        framesList: '0-9-9-9-9-9-5-4-9-5',
        hitDamage: [12, 12, 8, 10, 10, 10, 10, 10, 9, 9],
        firstHit: 42,
        castTime: 42,
        offset: 14,
        base: 330,
      },
      {
        names: {
          en: 'Finisher',
          fr: 'Coup fatal',
          tw: '必殺',
          kr: '필살',
          de: 'Todesstoß',
          es: 'Golpe de gracia'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 600
      }
    ]
  },
  {
    id: 10,
    names: {
      en: 'Ace',
      fr: 'Ace',
      tw: '艾斯',
      kr: '에이스',
      de: 'Ace',
      es: 'Ace'
    },
    'abilities': [
      {
        names: {
          en: 'Tri-Beam Laser +2 (orange)',
          fr: 'Laser triple +2 (orange)',
          tw: '三重雷射 +2 (橙子)',
          kr: '트라이 레이저 +2 (주황색)',
          de: 'Triple-Jackpot +2 (oranje)',
          es: 'Láser triple +2 (naranja)'
        },
        framesList: '0-7-7-7-7-7-7',
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        firstHit: 64,
        castTime: 0, //"effect_frames": [[0, 20, 0]],
        offset: 46,
        base: 560,
        ignore: 25,
        debuff: {
          fire: 75,
          light: 75,
          lightning: 75
        },
        damage: 'magic'
      },
      {
        names: {
          en: 'Attack Hand',
          fr: 'Tirage explosif',
          tw: '攻擊牌組',
          kr: '공격 편성',
          de: 'Angriffsdeck',
          es: 'Mano ofensiva'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 150,
        castTime: 75, //"effect_frames": [[75, 40]],
        offset: 0,
        base: 320,
        ignore: 25,
        damage: 'magic'
      },
    ],
    dual: false
  },
  {
    id: 11,
    names: {
      en: 'Agrias',
      fr: 'Agrias',
      tw: '阿格莉亞絲',
      kr: '아그리아스',
      de: 'Agrias',
      es: 'Agrias'
    },
    'abilities': [
      {
        names: {
          en: 'Divine Ruination',
          fr: 'Ruine divine',
          tw: '聖光爆裂破',
          kr: '성광폭렬파',
          de: 'Göttliche Zerstörung',
          es: 'Ruina divina'
        },
        framesList: '0-10-10-10-10',
        firstHit: 70,
        castTime: 40,
        offset: 16,
        base: 160,
        ignore: 50,
        debuff: {
          light: 50
        }
      },
      {
        names: {
          en: 'Divine Ruination +2',
          fr: 'Ruine divine +2',
          tw: '聖光爆裂破 +2',
          kr: '성광폭렬파 +2',
          de: 'Göttliche Zerstörung +2',
          es: 'Ruina divina +2'
        },
        framesList: '0-7-5-7-7-7-7',
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        firstHit: 70,
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50,
        debuff: {
          light: 50
        }
      }
    ],
    weapons : [
      'light'
    ]
  },
  {
    id: 12,
    names: {
      en: 'Amelia',
      fr: 'Amélia',
      tw: '艾美利亞',
      kr: '아멜리아',
      de: 'Amelia',
      es: 'Amelia'
    },
    abilities: [
      {
        names: {
          en: 'Disorder',
          fr: 'Désordre',
          tw: '無序亂射',
          kr: '난동',
          de: 'Störung',
          es: 'Desorden'
        },
        framesList: '0-5-5-5-5-5-5-5-5-5',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 200,
      },
    ]
  },
  {
    id: 13,
    names: {
      en: 'Ashe',
      fr: 'Ashe',
      tw: '雅雪',
      kr: '아셰',
      de: 'Ashe',
      es: 'Ashe'
    },
    abilities: [
      {
        names: {
          en: 'Heaven\'s Fury',
          fr: 'Ire céleste',
          tw: '聖光爆裂斬',
          kr: '성광폭렬참',
          de: 'Himmelszorn',
          es: 'Aura celestial'
        },
        framesList: '0-10-10-10-10-10-10-10-10-10',
        firstHit: 72,
        castTime: 40,
        offset: 16,
        base: 230,
        ignore: 25,
        damage: 'magic',
        dualable: false
      },
      {
        names: {
          en: 'Sword of Kings',
          fr: 'Épée des Rois',
          tw: '霸王之劍',
          kr: '패왕의 검',
          de: 'Schwert der Könige',
          es: 'Espada de reyes'
        },
        framesList: '0-10-10-10-10-10-10',
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 270,
      },
    ]
  },
  {
    id: 14,
    names: {
      en: 'Bran',
      fr: 'Bran',
      tw: '布蘭',
      kr: '브란',
      de: 'Bran',
      es: 'Bran'
    },
    abilities: [
      {
        names: {
          en: 'Thunder Clap',
          fr: 'Coup de tonnerre',
          tw: '雷霆一擊',
          kr: '내리치는 천둥번개',
          de: 'Donnerkrachen',
          es: 'Trueno atronador'
        },
        framesList: '0-5-5-5-5-5-5',
        hitDamage: [14, 14, 14, 14, 14, 15, 15],
        firstHit: 47,
        castTime: 40,
        offset: 16,
        base: 270,
        elements: [
          'light',
          'lightning'
        ],
        debuff: {
          light: 50,
          lightning: 50
        }
      },
    ]
  },
  {
    id: 15,
    names: {
      en: 'Chizuru',
      fr: 'Chizuru',
      tw: '千鶴',
      kr: '치즈루',
      de: 'Chizuru',
      es: 'Chizuru'
    },
    abilities: [
      {
        names: {
          en: 'Phantom Shadow',
          fr: 'Ombre fantasmatique',
          tw: '夢幻泡影',
          kr: '몽환포영',
          de: 'Schall und Rauch',
          es: 'Sombra fantasma'
        },
        framesList: '0-5-5-5-5',
        firstHit: 22,
        castTime: 0,
        offset: 44,
        base: 140,
        ignore: 50
      },
    ]
  },
  {
    id: 16,
    names: {
      en: 'Dark Fina',
      fr: 'Fina Obscure',
      tw: '魔人菲娜',
      kr: '마인 피나',
      de: 'Dunkel-Fina',
      es: 'Fina oscura'
    },
    abilities: [
      {
        names: {
          en: 'Ultima +2',
          fr: 'Ultima +2',
          tw: '究極 +2',
          kr: '알테마 +2',
          de: 'Ultima +2',
          es: 'Artema +2'
        },
        framesList: '0-37-38-37-38-38-37',
        hitDamage: [10, 10, 10, 10, 10, 10, 40],
        firstHit: 140,
        castTime: 40,
        offset: 16,
        base: 280,
        ignore: 50,
        damage: 'magic'
      },
      {
        names: {
          en: 'Dystopia',
          fr: 'Dystopie',
          tw: '敵托邦',
          kr: '디스토피아',
          de: 'Dystopia',
          es: 'Distopía'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 120,
        castTime: 40,
        offset: 16,
        base: 600,
        elements: [
          'dark'
        ],
        dualable: false,
        damage: 'magic'
      }
    ]
  },
  {
    id: 17,
    names: {
      en: 'Fohlen',
      fr: 'Fohlen',
      tw: '福倫',
      kr: '포렌',
      de: 'Fohlen',
      es: 'Fohlen'
    },
    abilities: [
      {
        names: {
          en: 'Sonic Blast',
          fr: 'Rafale sonique',
          tw: '音速突擊',
          kr: '소닉 블래스트',
          de: 'Schallwelle',
          es: 'Estallido sónico'
        },
        framesList: '0-10-10-10-10-10-10',
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        firstHit: 10,
        castTime: 0,
        offset: 66,
        base: 200,
        ignore: 50,
        debuff: {
          wind: 50
        },
        elements: [
          'wind'
        ]
      },
    ]
  },
  {
    id: 18,
    names: {
      en: 'Fryevia',
      fr: 'Fryevia',
      tw: '弗雷比亞',
      kr: '프레이비아',
      de: 'Fryevia',
      es: 'Fryevia'
    },
    abilities: [
      {
        names: {
          en: 'Frost Flower Blitz',
          fr: 'Pétales gelés',
          tw: '冰花迅雷',
          kr: '서리꽃 폭풍',
          de: 'Eisblumenblitz',
          es: 'Pétalos helados'
        },
        framesList: '0-7-5-7-7-7-7',
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        firstHit: 40,
        castTime: 0,
        offset: 22,
        base: 800,
        damage: 'hybrid',
        debuff: {
          ice: 50
        },
        elements: [
          'ice'
        ]
      },
      {
        names: {
          en: 'Second Intention',
          fr: 'Seconde intention',
          tw: '第二意願',
          kr: '숨겨진 의도',
          de: 'Plan B',
          es: 'Segundas intenciones'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 100,
        castTime: 0, //"effect_frames": [[0, 0, 27]],
        offset: 66,
        base: 600,
        damage: 'hybrid',
      }
    ]
  },
  {
    id: 19,
    names: {
      en: 'Gilgamesh',
      fr: 'Gilgamesh',
      tw: '吉爾伽美什',
      kr: '길가메시',
      de: 'Gilgamesch',
      es: 'Gilgamesh'
    },
    abilities: [
      {
        names: {
          en: 'Tri-Attack',
          fr: 'Triple-attaque',
          tw: '三劍舞',
          kr: '세 자루의 검',
          de: 'Dreifachschlag',
          es: 'Triataque'
        },
        framesList: '0-4-16-4-16-4',
        hitDamage: [16, 16, 17, 17, 17, 17],
        firstHit: 40,
        castTime: 40,
        offset: 26,
        base: 300,
      },
      {
        names: {
          en: 'Tri-Attack +2',
          fr: 'Triple-attaque +2',
          tw: '三劍舞 +2',
          kr: '세 자루의 검 +2',
          de: 'Dreifachschlag +2',
          es: 'Triataque +2'
        },
        framesList: '0-4-6-4-6-4-6-4-6-4-6-4',
        hitDamage: [8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9],
        firstHit: 40,
        castTime: 40,
        offset: 26,
        base: 300,
      },
      {
        names: {
          en: 'Snowpetal +2',
          fr: 'Flocon de neige +2',
          tw: '雪月花 +2',
          kr: '설월화 +2',
          de: 'Wintermondblüten +2',
          es: 'Pétalo de nieve +2'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 60,
        castTime: 0, //"effect_frames": [[0, 0, 30]],
        offset: 40,
        base: 200,
        ignore: 65
      }
    ]
  },
  {
    id: 20,
    names: {
      en: 'Knight Delita',
      fr: 'Delita Chevalier',
      tw: '騎士迪利塔',
      kr: '기사 디리타',
      de: 'Ritter Delita',
      es: 'Delita caballero'
    },
    abilities: [
      {
        names: {
          en: 'Commanding Blade',
          fr: 'Lame du commandant',
          tw: '霸道之劍',
          kr: '패도의 검',
          de: 'Eindrucksvolle Klinge',
          es: 'Hoja del comandante'
        },
        framesList: '0-9-9-9-9-9-9-9',
        hitDamage: [12, 13, 12, 13, 12, 13, 12, 13],
        firstHit: 51,
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50
      },
      {
        names: {
          en: 'Lightning Stab',
          fr: 'Décharge sacrée',
          tw: '無雙閃電刺',
          kr: '무쌍번개 찌르기',
          de: 'Heiliger Blitz',
          es: 'Descarga sagrada'
        },
        framesList: '0-5-5-5-5-5',
        hitDamage: [15, 15, 15, 15, 20, 20],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 230,
        elements: [
          'lightning'
        ],
      },
      {
        names: {
          en: 'Strategic blade',
          fr: 'Lame du stratège',
          tw: '謀略之劍',
          kr: '함정의 검',
          de: 'Taktikklinge',
          es: 'Hoja del estratega'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 20,
        castTime: 0,
        offset: 40,
        base: 250,
        ignore: 50,
        debuff: {
          lightning: 50
        }
      }
    ]
  },
  {
    id: 21,
    names: {
      en: 'Light Veritas',
      fr: 'Veritas de la Lumière',
      tw: '光輝之維利亞斯',
      kr: '찬란한 빛의 베리어스',
      de: 'Veritas des Lichts',
      es: 'Veritas el luminoso'
    },
    abilities: [
      {
        names: {
          en: 'Divine Shot',
          fr: 'Tir divin',
          tw: '聖徒射擊',
          kr: '성스러운 사격',
          de: 'Göttlicher Schuss',
          es: 'Disparo divino'
        },
        framesList: '0-9-9-9-9-9-9',
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 700,
        damage: 'hybrid',
        elements: [
          'light'
        ],
        debuff: {
          light: 50
        }
      },
      {
        names: {
          en: 'Saint Buster',
          fr: 'Casseur céleste',
          tw: '神聖破壞',
          kr: '세인트 버스터',
          de: 'Heiligenjäger',
          es: 'Destructor santo'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 150,
        castTime: 40, //"effect_frames": [[40, 100, 120]],
        offset: 0,
        base: 1600,
        damage: 'hybrid'
      }
    ]
  },
  {
    id: 22,
    names: {
      en: 'Mercenary Ramza',
      fr: 'Ramza Mercenaire',
      tw: '傭兵拉姆薩',
      kr: '용병 람자',
      de: 'Söldner Ramza',
      es: 'Ramza mercenario'
    },
    abilities: [
      {
        names: {
          en: 'Blade of Justice',
          fr: 'Lame de la justice',
          tw: '正義之劍',
          kr: '영웅의 검',
          de: 'Klinge der Gerechtigkeit',
          es: 'Hoja justiciera'
        },
        framesList: '0-8-8-8-8-8-6-8',
        hitDamage: [12, 13, 12, 13, 12, 13, 12, 13],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 250,
        ignore: 25,
      }
    ]
  },
  {
    id: 23,
    names: {
      en: 'Randi',
      fr: 'Randy',
      tw: '蘭迪',
      kr: '랜디',
      de: 'Randi',
      es: 'Randy'
    },
    abilities: [
      {
        names: {
          en: 'Torrential Slash',
          fr: 'Entaille torrentielle',
          tw: '前後逆波斬',
          kr: '전후격파 베기',
          de: 'Reißender Schnitt',
          es: 'Tajo torrencial'
        },
        framesList: '0-10-10-10-10-10-10-10-10-10',
        firstHit: 42,
        castTime: 40,
        offset: 26,
        base: 700,
      }
    ]
  },
  {
    id: 24,
    names: {
      en: 'Rasler',
      fr: 'Rasler',
      tw: '拉斯勒',
      kr: '라슬러',
      de: 'Rasler',
      es: 'Rasler'
    },
    abilities: [
      {
        names: {
          en: 'Patriotic Slash',
          fr: 'Coup patriotique',
          tw: '救國斬閃',
          kr: '구국의 검광',
          de: 'Patriotischer Hieb',
          es: 'Corte patriótico'
        },
        framesList: '0-10-10-10-10-10-10',
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        firstHit: 42,
        castTime: 40,
        offset: 26,
        base: 300,
      }
    ]
  },
  {
    id: 25,
    names: {
      en: 'Reberta',
      fr: 'Réberta',
      tw: '蕾貝爾塔',
      kr: '리베르타',
      de: 'Reberta',
      es: 'Reberta'
    },
    abilities: [
      {
        names: {
          en: 'Mystic Thrust',
          fr: 'Coup mystique',
          tw: '神秘衝擊',
          kr: '마법 찌르기',
          de: 'Mystischer Stoß',
          es: 'Estoque místico'
        },
        framesList: '0-10-10-10-10-10-10',
        hitDamage: [14, 14, 15, 14, 14, 15, 14],
        firstHit: 42,
        castTime: 42,
        offset: 24,
        base: 400,
      }
    ]
  },
  {
    id: 26,
    names: {
      en: 'Rikku',
      fr: 'Rikku',
      tw: '琉克',
      kr: '류크',
      de: 'Rikku',
      es: 'Rikku'
    },
    abilities: [
      {
        names: {
          en: 'Burning Soul',
          fr: 'Âme ardente',
          tw: '燃燒之心',
          kr: '타오르는 마음',
          de: 'Flammenseele',
          es: 'Alma candente'
        },
        framesList: '0-25-25-25-25-25-25-25-25',
        hitDamage: [10, 10, 10, 10, 10, 10, 10, 10, 20],
        firstHit: 40,
        castTime: 40,
        offset: 16,
        base: 230,
        elements: [
          'fire'
        ]
      },
      {
        names: {
          en: 'Winter Storm',
          fr: 'Avalanche',
          tw: '寒冬風暴',
          kr: '겨울 폭풍',
          de: 'Wintersturm',
          es: 'Tormenta invernal'
        },
        framesList: '0-13-13-13-13-13-13-13-13',
        hitDamage: [10, 10, 10, 10, 10, 10, 10, 10, 20],
        firstHit: 40,
        castTime: 40,
        offset: 16,
        base: 230,
        elements: [
          'ice'
        ]
      },
      {
        names: {
          en: 'Lightning Rod',
          fr: 'Flash',
          tw: '閃電箭',
          kr: '라이트닝 볼트',
          de: 'Blitzableiter',
          es: 'Rayos fulminantes'
        },
        framesList: '0-5-5-5-5-5-5-5-5',
        hitDamage: [10, 10, 10, 10, 10, 10, 10, 10, 20],
        firstHit: 45,
        castTime: 40,
        offset: 16,
        base: 230,
        elements: [
          'lightning'
        ]
      },
      {
        names: {
          en: 'Tidal Wave',
          fr: 'Tsunami',
          tw: '大海嘯',
          kr: '해일',
          de: 'Flutwelle',
          es: 'Ola sísmica'
        },
        framesList: '0-9-9-9-9-9-9-9-9',
        hitDamage: [10, 10, 10, 10, 10, 10, 10, 10, 20],
        firstHit: 40,
        castTime: 40,
        offset: 16,
        base: 230,
        elements: [
          'water'
        ]
      },
      {
        names: {
          en: 'Tidal Wave +2 (JP Only)',
          fr: 'Tsunami +2 (JP Seulement)',
          tw: '大海嘯 +2 (JP Only)',
          kr: '해일 +2 (JP Only)',
          de: 'Flutwelle +2 (JP Only)',
          es: 'Ola sísmica +2 (JP Only)'
        },
        framesList: '0-12-12-12-12-12-12-12-12-12-12-12',
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 132,
        castTime: 40,
        offset: 16,
        base: 280,
        elements: [
          'water'
        ]
      }
    ]
  },
  {
    id: 27,
    names: {
      en: 'Seabreeze Dark Fina',
      fr: 'Fina Obscure en Maillot',
      tw: '涼爽魔人菲娜',
      kr: '바닷바람의 마인 피나',
      de: 'Dunkel-Seewind-Fina',
      es: 'Fina oscura de la marea'
    },
    abilities: [
      {
        names: {
          en: 'Ultima +2 (JP Only)',
          fr: 'Ultima +2 (JP Seulement)',
          tw: '究極 +2 (JP Only)',
          kr: '알테마 +2 (JP Only)',
          de: 'Ultima +2 (JP Only)',
          es: 'Artema +2 (JP Only)'
        },
        framesList: '0-37-38-37-38-38-37',
        hitDamage: [10, 10, 10, 10, 10, 10, 40],
        firstHit: 140,
        castTime: 40,
        offset: 16,
        base: 280,
        ignore: 50,
        damage: 'magic'
      },
      {
        names: {
          en: 'Utopia',
          fr: 'Utopie',
          tw: '烏托邦',
          kr: '유토피아',
          de: 'Utopia',
          es: 'Utopía'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 120,
        castTime: 40,
        offset: 16,
        base: 600,
        elements: [
          'water'
        ],
        dualable: false,
        damage: 'magic'
      }
    ]
  },
  {
    id: 28,
    names: {
      en: 'Setzer',
      fr: 'Setzer',
      tw: '塞策',
      kr: '셋쳐',
      de: 'Setzer',
      es: 'Setzer'
    },
    abilities: [
      {
        names: {
          en: 'Prismatic Flash',
          fr: 'Prisme arc-en-ciel',
          tw: '七色閃光',
          kr: '세븐플래시',
          de: 'Prismatischer Blitz',
          es: 'Multiflash'
        },
        base: 180,
        framesList: '0-5-5-5-5-5-5',
        hitDamage: [14, 14, 14, 14, 14, 15, 15],
        firstHit: 42,
        castTime: 0,
        offset: 56
      },
      {
        names: {
          en: 'Red Card',
          fr: 'Carte sanglante',
          tw: '血色飛牌',
          kr: '레드 카드',
          de: 'Rote Karte',
          es: 'Carta roja'
        },
        framesList: '0-3-3-3-3-3-3-3-3-3',
        firstHit: 40,
        castTime: 40,
        offset: 16,
        base: 320,
      },
      {
        names: {
          en: 'Double Dice',
          fr: 'Double dés',
          tw: '雙重骰子',
          kr: '더블 주사위',
          de: 'Doppelwürfel',
          es: 'Dado doble'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 16,
        castTime: 0,
        offset: 56,
        base: 100
      }
    ]
  },
  {
    id: 29,
    names: {
      en: 'Shantotto',
      fr: 'Shantotto',
      tw: '香托托',
      kr: '샨토토',
      de: 'Shantotto',
      es: 'Shantotto'
    },
    abilities: [
      {
        names: {
          en: 'Tornado',
          fr: 'Tornade',
          tw: '龍捲風',
          kr: '토네이도',
          de: 'Tornado',
          es: 'Tornado'
        },
        framesList: '0-12-12-12-12-12-12-12-12-12-12-12',
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 80,
        castTime: 40,
        offset: 16,
        base: 250,
        elements: [
          'wind'
        ],
        debuff: {
          wind: 50
        },
        damage: 'magic'
      }
    ]
  },
  {
    id: 30,
    names: {
      en: 'Trance Terra',
      fr: 'Terra en transe',
      tw: '入神蒂娜',
      kr: '트랜스 티나',
      de: 'Trance-Terra',
      es: 'Terra en trance'
    },
    abilities: [
      {
        names: {
          en: 'Chaos Wave',
          fr: 'Onde chaotique',
          tw: '混沌波動',
          kr: '혼돈의 파동',
          de: 'Chaoswelle',
          es: 'Ola caótica'
        },
        framesList: '0-20-20-20-20',
        firstHit: 52,
        castTime: 40,
        offset: 16,
        base: 360,
        ignore: 50,
        damage: 'magic',
        dualable: false
      },
      {
        names: {
          en: 'Chaos Wave Awakened +2',
          fr: 'Onde chaotique - Év. +2',
          tw: '覺醒混沌波動 +2',
          kr: '각성·혼돈의 파동 +2',
          de: 'Chaoswelle erwacht +2',
          es: 'Ola caótica - Haz +2'
        },
        framesList: '0-8-8-8-8-8-8-8-8-8',
        firstHit: 60,
        castTime: 40,
        offset: 12,
        base: 420,
        ignore: 50,
        damage: 'magic'
      },
      {
        names: {
          en: 'Ultima +2',
          fr: 'Ultima +2',
          tw: '究極 +2',
          kr: '알테마 +2',
          de: 'Ultima +2',
          es: 'Artema +2'
        },
        framesList: '0-37-38-37-38-38-37',
        hitDamage: [10, 10, 10, 10, 10, 10, 40],
        firstHit: 140,
        castTime: 40,
        offset: 16,
        base: 280,
        ignore: 50,
        damage: 'magic'
      }
    ]
  },
  {
    id: 31,
    names: {
      en: 'Vaan',
      fr: 'Vaan',
      tw: '梵恩',
      kr: '반',
      de: 'Vaan',
      es: 'Vaan'
    },
    abilities: [
      {
        names: {
          en: 'Assault Strike',
          fr: 'Violent assaut',
          tw: '突擊強襲',
          kr: '강습 타격',
          de: 'Angriffsschlag',
          es: 'Golpe asaltador'
        },
        framesList: '0-8-8-8-8-8-8-8',
        hitDamage: [2, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 22,
        castTime: 20,
        offset: 16,
        base: 270
      },
      {
        names: {
          en: 'Assault Strike +2 (JP Only)',
          fr: 'Violent assaut +2 (JP Seulement)',
          tw: '突擊強襲 +2 (JP Only)',
          kr: '강습 타격 +2 (JP Only)',
          de: 'Angriffsschlag +2 (JP Only)',
          es: 'Golpe asaltador +2 (JP Only)'
        },
        framesList: '0-8-8-8-8-8-8-8',
        hitDamage: [2, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 22,
        castTime: 20,
        offset: 16,
        base: 400
      }
    ]
  },
  {
    id: 32,
    names: {
      en: 'Vargas',
      fr: 'Vargas',
      tw: '瓦爾加斯',
      kr: '발가스',
      de: 'Vargas',
      es: 'Vargas'
    },
    abilities: [
      {
        names: {
          en: 'Flare Ride+',
          fr: 'Galop enflammé +',
          tw: '焰光斬·改',
          kr: '강화 플레어 라이드',
          de: 'Flammenritt Plus',
          es: 'Galope flamígero +'
        },
        framesList: '0-10-10-10-78',
        firstHit: 2,
        castTime: 0,
        offset: 66,
        base: 200
      },
      {
        names: {
          en: 'Supreme Blaze',
          fr: 'Explosion suprême',
          tw: '霸神之爆炎',
          kr: '패신의 폭염',
          de: 'Meisterlohe',
          es: 'Ardor supremo'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 240,
        castTime: 40,
        offset: 16,
        base: 250,
        ignore: 50,
        elements : [
          'fire'
        ]
      }
    ]
  },
  {
    id: 33,
    names: {
      en: 'Victoria',
      fr: 'Victoria',
      tw: '維多利亞',
      kr: '빅토리아',
      de: 'Victoria',
      es: 'Victoria'
    },
    abilities: [
      {
        names: {
          en: 'Overflow',
          fr: 'Dépassement',
          tw: '溢出',
          kr: '범람',
          de: 'Überfluss',
          es: 'Derrame'
        },
        framesList: '0-24-24-24-24-24-24-24-24-24',
        firstHit: 57,
        castTime: 40,
        offset: 16,
        base: 940,
        elements: [
          'dark'
        ],
        damage: 'magic',
        dualable: false
      }
    ]
  },
  {
    id: 34,
    names: {
      en: 'Zidane (JP Only - 6 stars)',
      fr: 'Djidane (JP Seulement - 6 étoiles)',
      tw: '吉坦 (JP Only - 6 stars)',
      kr: '지탄 (JP Only - 6 stars)',
      de: 'Zidane (JP Only - 6 stars)',
      es: 'Yitán (JP Only - 6 stars)'
    },
    abilities: [
      {
        names: {
          en: 'Free Energy',
          fr: 'Energétik',
          tw: '能量解放',
          kr: '자유로운 힘',
          de: 'Kostenlose Energie',
          es: 'Energía libre'
        },
        framesList: '0-8-8-8-8-8-8-8',
        hitDamage: [12, 13, 12, 13, 12, 13, 12, 13],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 360
      },
      {
        names: {
          en: 'Free Energy +2',
          fr: 'Energétik +2',
          tw: '能量解放 +2',
          kr: '자유로운 힘 +2',
          de: 'Kostenlose Energie +2',
          es: 'Energía libre +2'
        },
        framesList: '0-8-8-8-8-8-8-8',
        hitDamage: [12, 13, 12, 13, 12, 13, 12, 13],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 450
      },
      {
        names: {
          en: 'Lucky Seven',
          fr: 'Coudepot',
          tw: '幸運7',
          kr: '럭키 세븐',
          de: 'Glückssieben',
          es: 'Súper 7'
        },
        framesList: '0-8-8-8-8-8-8',
        hitDamage: [14, 14, 14, 14, 14, 15, 15],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 777
      }
    ]
  },
  {
    id: 35,
    names: {
      en: 'Onion Knight',
      fr: 'Chevalier Oignon',
      tw: '洋蔥劍士',
      kr: '양파 검사',
      de: 'Zwiebelritter',
      es: 'Caballero Cebolla'
    },
    abilities: [
      {
        names: {
          en: 'Splendor of the Wind',
          fr: 'Splendeur du vent',
          tw: '風之光輝',
          kr: '바람의 인도',
          de: 'Windpracht',
          es: 'Esplendor de viento'
        },
        framesList: '0-7-7-7-7-7-7-7-7-7-7-7',
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 380,
        elements: [
          'wind'
        ]
      },
      {
        names: {
          en: 'Splendor of the Fire',
          fr: 'Splendeur du feu',
          tw: '火之光輝',
          kr: '불꽃의 인도',
          de: 'Feuerpracht',
          es: 'Esplendor de fuego'
        },
        framesList: '0-7-7-7-7-7-7-7-7-7-7-7',
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 380,
        elements: [
          'fire'
        ]
      },
      {
        names: {
          en: 'Splendor of the Earth',
          fr: 'Splendeur de la terre',
          tw: '土之光輝',
          kr: '땅의 인도',
          de: 'Erdpracht',
          es: 'Esplendor de tierra'
        },
        framesList: '0-7-7-7-7-7-7-7-7-7-7-7',
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 380,
        elements: [
          'earth'
        ]
      },
      {
        names: {
          en: 'Splendor of the Water',
          fr: 'Splendeur de l\'eau',
          tw: '水之光輝',
          kr: '물의 인도',
          de: 'Wasserpracht',
          es: 'Esplendor de agua'
        },
        framesList: '0-7-7-7-7-7-7-7-7-7-7-7',
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 380,
        elements: [
          'water'
        ]
      },
      {
        names: {
          en: 'Onion Slice',
          fr: 'Tranche-oignon',
          tw: '洋蔥刺',
          kr: '양파 슬라이스',
          de: 'Zwiebelschnitt',
          es: 'Corte cebolla'
        },
        framesList: '0-7-7-7-7-7-7-7-7-7-7-7',
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 400
      },
      {
        names: {
          en: 'Full Speed Bladeblitz',
          fr: 'Lame éclair rapide',
          tw: '全速全斬',
          kr: '전속 전방위 베기',
          de: 'Voller Klingenblitz',
          es: 'Tormenta de acero'
        },
        framesList: '0-7-7-7-7-7-7-7-7-7-7-7',
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 220
      },
      {
        names: {
          en: 'Twin Swords',
          fr: 'Double épées',
          tw: '雙劍',
          kr: '트윈 소드',
          de: 'Zwillingsschwerter',
          es: 'Espadas gemelas'
        },
        framesList: '0-4-47-4-35-5-5-5-5-5-5-5-5-5-20-4',
        hitDamage: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10],
        firstHit: 68,
        castTime: 40,
        offset: 0,
        base: 800,
        dualable: false
      },
      {
        names: {
          en: 'Onion Cutter',
          fr: 'Coupe-oignon',
          tw: '洋蔥斬',
          kr: '양파 칼날',
          de: 'Zwiebelschneider',
          es: 'Cortador cebolla'
        },
        framesList: '0-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7',
        hitDamage: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7],
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 520
      },
    ]
  },
  {
    id: 36,
    names: {
      en: 'Fire Veritas',
      fr: 'Veritas des Flammes',
      tw: '劫火之維利亞斯',
      kr: '지옥불의 베리어스',
      de: 'Veritas der Flammende',
      es: 'Veritas el llameante'
    },
    abilities: [
      {
        names: {
          en: 'Heavy Stomp',
          fr: 'Piétinement',
          tw: '沉重印章',
          kr: '무거운 발구르기',
          de: 'Schwerer Stampfer',
          es: 'Pisotón fuerte'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 90,
        castTime: 40,
        offset: 0,
        base: 250,
        ignore: 50
      },
      {
        names: {
          en: 'Full Charge Stomp',
          fr: 'Piétinement maximum',
          tw: '超蓄力印章',
          kr: '전력 발구르기',
          de: 'Voller Stampfer',
          es: 'Pisotón total'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 90,
        castTime: 40,
        offset: 0,
        base: 500,
        ignore: 50
      }
    ]
  },
  {
    id: 37,
    names: {
      en: 'Queen',
      fr: 'Queen',
      tw: '葵因',
      kr: '퀸',
      de: 'Queen',
      es: 'Queen'
    },
    abilities: [
      {
        names: {
          en: 'Devastate +2',
          fr: 'Dévastation +2',
          tw: '毀滅之劍',
          kr: '데바스테이트',
          de: 'Verwüstung',
          es: 'Devastador'
        },
        framesList: '0-26-10-10-30',
        firstHit: 20,
        castTime: 40,
        offset: 80,
        base: 800
      }
    ]
  },
  {
    id: 38,
    names: {
      en: 'Prishe',
      fr: 'Prishe',
      tw: '普利修',
      kr: '프리쉬',
      de: 'Prishe',
      es: 'Prishe'
    },
    abilities: [
      {
        names: {
          en: 'Raging Fists',
          fr: 'Poings de colère',
          tw: '乱擊',
          kr: '난격',
          de: 'Fäuste des Zorns',
          es: 'Puños de la ira'
        },
        framesList: '0-5-5-5-5-5-5-5',
        hitDamage: [12, 12, 12, 12, 12, 12, 12, 16],
        firstHit: 2,
        castTime: 0,
        offset: 66,
        base: 350
      },
      {
        names: {
          en: 'Prishe Special',
          fr: 'Spécialité de Prishe',
          tw: '普利修特技',
          kr: '프리쉬 스페셜',
          de: 'Prishe-Spezial',
          es: 'Especial de Prishe'
        },
        framesList: '0-4-4-4-4-4-4-4-4-4-4-4-4-4-4',
        hitDamage: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 16],
        firstHit: 4,
        castTime: 0,
        offset: 66,
        base: 500,
        ignore: 50
      }
    ]
  },
  {
    id: 39,
    names: {
      en: 'Nyx',
      fr: 'Nyx',
      tw: '尼克斯',
      kr: '닉스',
      de: 'Nyx',
      es: 'Nyx'
    },
    abilities: [
      {
        names: {
          en: 'Kingsglaive',
          fr: 'Glaive du roi',
          tw: '王之劍',
          kr: '왕의 검',
          de: 'Königsgleve',
          es: 'Glaive real'
        },
        framesList: '0-8-8-8-8-8-8-8',
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 82,
        castTime: 40,
        offset: 26,
        base: 200,
        ignore: 50,
        debuff: {
          fire: 50
        }
      },
      {
        names: {
          en: 'Desperate Blow',
          fr: 'Attaque désespérée',
          tw: '拼死一擊',
          kr: '필사의 일격',
          de: 'Verzweiflungsschlag',
          es: 'Golpe finiquitador'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 180,
        castTime: 40,
        offset: 86,
        base: 750,
      },
    ]
  },
  {
    id: 40,
    names: {
      en: 'Glauca',
      fr: 'Glauca',
      tw: '格拉烏卡',
      kr: '글라우카',
      de: 'Glauca',
      es: 'Glauca'
    },
    abilities: [
      {
        names: {
          en: 'Daybreak Darkness',
          fr: 'Ténèbres de l\'aube',
          tw: '拂曉之暗',
          kr: '새벽의 어둠',
          de: 'Dunkler Sonnenaufgang',
          es: 'Oscuridad del ocaso'
        },
        framesList: '0-9-9-9-9-9-9-9',
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 102,
        castTime: 40,
        offset: 26,
        base: 200,
        ignore: 25,
        debuff: {
          light: 50,
          dark: 50
        }
      }
    ]
  },
  {
    id: 41,
    names: {
      en: 'Pod 153',
      fr: 'Pod 153',
      tw: '輔助機１５３',
      kr: '포드 153',
      de: 'Pod 153',
      es: 'Pod 153'
    },
    abilities: [
      {
        names: {
          en: 'R020: Mirage',
          fr: 'R020: Mirage',
          tw: 'R020：幻象',
          kr: 'R020: 미라쥬',
          de: 'R020: Illusion',
          es: 'R020: Espejismo'
        },
        framesList: '0-10-10-10-10-10-10-10',
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 300,
      },
    ]
  },
  {
    id: 42,
    names: {
      en: 'Generic Spells',
      fr: 'Sorts génériques',
      tw: '通用法術',
      kr: '일반 주문',
      de: 'Generieke spreuken',
      es: 'Hechizos genéricos'
    },
    abilities: [
      {
        names: {
          en: 'Meteor',
          fr: 'Météore',
          tw: '隕石',
          kr: '메테오',
          de: 'Meteo',
          es: 'Meteo'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 350,
        castTime: 40,
        offset: 0,
        base: 250,
        ignore: 25,
        damage: 'magic'
      },
      {
        names: {
          en: 'Comet',
          fr: 'Comète',
          tw: '彗星',
          kr: '코멧',
          de: 'Komet',
          es: 'Cometa'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 120,
        castTime: 40,
        offset: 0,
        base: 190,
        damage: 'magic'
      },
      {
        names: {
          en: 'Ultima',
          fr: 'Ultima',
          tw: '究極',
          kr: '알테마',
          de: 'Ultima',
          es: 'Artema'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 350,
        castTime: 40,
        offset: 0,
        base: 280,
        ignore: 50,
        damage: 'magic'
      },
      {
        names: {
          en: 'Stonja',
          fr: 'Terre max',
          tw: '強落石',
          kr: '스톤쟈',
          de: 'Terraka',
          es: 'Piedra+++'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: 'magic',
        elements: [
          'earth'
        ]
      },
      {
        names: {
          en: 'Aeroja',
          fr: 'Vent max',
          tw: '強勁風',
          kr: '에어로쟈',
          de: 'Aeroka',
          es: 'Aero+++'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: 'magic',
        elements: [
          'wind'
        ]
      },
      {
        names: {
          en: 'Waterja',
          fr: 'Eau max',
          tw: '強流水',
          kr: '워터쟈',
          de: 'Aquaka',
          es: 'Aqua+++'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 190,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: 'magic',
        elements: [
          'water'
        ]
      },
      {
        names: {
          en: 'Thundaja',
          fr: 'Foudre max',
          tw: '強雷電',
          kr: '선더쟈',
          de: 'Blitzka',
          es: 'Electro+++'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 150,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: 'magic',
        elements: [
          'lightning'
        ]
      },
      {
        names: {
          en: 'Blizzaja',
          fr: 'Glace max',
          tw: '強暴雪',
          kr: '블리자쟈',
          de: 'Eiska',
          es: 'Hielo+++'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 240,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: 'magic',
        elements: [
          'ice'
        ]
      },
      {
        names: {
          en: 'firaja',
          fr: 'Feu max',
          tw: '強火焰',
          kr: '파이자',
          de: 'Feuka',
          es: 'Piro+++'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 210,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: 'magic',
        elements: [
          'fire'
        ]
      },
      {
        names: {
          en: 'Chainsaw',
          fr: '回轉電鋸',
          tw: '회전톱',
          kr: 'Tronçonneuse',
          de: 'Kettensäge',
          es: 'Motosierra'
        },
        framesList: '0-8-8-8-8-8-16',
        hitDamage: [14, 14, 15, 14, 14, 15, 14],
        firstHit: 42,
        castTime: 40,
        offset: 17,
        base: 140,
        ignore: 25
      }
    ]
  },
  {
    id: 43,
    names: {
      en: 'Chic Ariana',
      fr: 'Ariana chic',
      tw: '時尚亞莉安娜',
      kr: '시크 아리아나',
      de: 'Schicke Ariana',
      es: 'Ariana chic'
    },
    abilities: [
      {
        names: {
          en: 'Alluring Chorus',
          fr: 'Chœur envoûtant',
          tw: '魅惑合唱',
          kr: '매혹적인 코러스',
          de: 'Verführerischer Refrain',
          es: 'Coro seductor'
        },
        framesList: '0-7-7-8-8-16-8',
        hitDamage: [10, 15, 15, 15, 15, 15, 15],
        firstHit: 139,
        castTime: 0, //"effect_frames": [[0, 0, 140]],
        offset: 56,
        base: 280,
        ignore: 25,
        damage: 'magic',
        dualable: false
      }
    ]
  },
  {
    id: 44,
    names: {
      en: 'Eve',
      fr: 'Ève',
      tw: '夏娃',
      kr: '이브',
      de: 'Eva',
      es: 'Eva'
    },
    abilities: [
      {
        names: {
          en: 'Roundhouse Kick',
          fr: 'Coup de pied retourné',
          tw: '迴旋踢',
          kr: '돌려차기',
          de: 'Roundhouse-Kick',
          es: 'Patada giratoria'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 10,
        castTime: 0,
        offset: 40,
        base: 350,
      }
    ]
  },
  {
    id: 45,
    names: {
      en: 'Adam',
      fr: 'Adam',
      tw: '亞當',
      kr: '아담',
      de: 'Adam',
      es: 'Adán'
    },
    abilities: [
      {
        names: {
          en: 'Cube Explosion - Large',
          fr: 'Explosion cubique - Grande',
          tw: '立方爆破・大',
          kr: '큐브 파괴·대',
          de: 'Würfelexplosion - Groß',
          es: 'Explosión cúbica - Grande'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 60,
        castTime: 0,
        offset: 40,
        base: 500,
      }
    ]
  },
  {
    id: 47,
    names: {
      en: 'Kelsus',
      fr: 'Kelsus',
      tw: '凱爾蘇斯',
      kr: '켈서스',
      de: 'Kelsus',
      es: 'Kelsus'
    },
    abilities: [
      {
        names: {
          en: 'Crushing Vice',
          fr: 'Vice écrasant',
          tw: '雙臂重擊',
          kr: '바이스 크러쉬',
          de: 'Schraubstock',
          es: 'Aplastador vicioso'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 60,
        castTime: 0,
        offset: 40,
        base: 500,
      }
    ]
  },
  {
    id: 48,
    names: {
      en: 'Maxwell',
      fr: 'Maxwell',
      tw: '麥斯威爾',
      kr: '막스웰',
      de: 'Maxwell',
      es: 'Maxwell'
    },
    abilities: [
      {
        names: {
          en: 'Destiny',
          fr: 'Destinée',
          tw: '命運',
          kr: '데스티니',
          de: 'Schicksal',
          es: 'Destino'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 102,
        castTime: 40,
        offset: 0,
        base: 200,
        ignore: 50,
        elements : [
          'light'
        ]
      }
    ]
  },
  {
    id: 49,
    names: {
      en: 'Black Cat Lid',
      fr: 'Chatte noire Lid',
      tw: '黑貓里德',
      kr: '검은 고양이 리드',
      de: 'Schwarze Katze Lid',
      es: 'Lid minina negra'
    },
    abilities: [
      {
        names: {
          en: 'Ultimate Blow',
          fr: 'Souffle ultime',
          tw: '究極一擊',
          kr: '궁극의  강타',
          de: 'Ultimativer Schlag',
          es: 'Golpe supremo'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 70,
        castTime: 40,
        offset: 0,
        base: 250,
        ignore: 35
      }
    ]
  },
  {
    id: 50,
    names: {
      en: 'Helena',
      fr: 'Helena',
      tw: '海倫娜',
      kr: '헬레나',
      de: 'Helena',
      es: 'Helena'
    },
    abilities: [
      {
        names: {
          en: 'Best Shot',
          fr: 'Superbe tir',
          tw: '準確射擊',
          kr: '최고의 사격',
          de: 'Bester Schuss',
          es: 'Tiro superbio'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 100,
        castTime: 40,
        offset: 0,
        base: 450
      }
    ]
  },
  {
    id: 51,
    names: {
      en: 'Zargabaath',
      fr: 'Zargabaath',
      tw: '查格博斯',
      kr: '자르가바스',
      de: 'Zargabaath',
      es: 'Zargabaath'
    },
    abilities: [
      {
        names: {
          en: 'Word of Law',
          fr: 'Mot de la loi',
          tw: '法令',
          kr: '법전의 말씀',
          de: 'Wort des Gesetzes',
          es: 'Palabra de ley'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 270,
        castTime: 40,
        offset: 0,
        base: 300,
        ignore: 50,
        elements: [
          'light'
        ],
        dualable: false,
        damage: 'magic'
      }
    ]
  },
  {
    id: 52,
    names: {
      en: 'Luneth',
      fr: 'Luneth',
      tw: '路涅斯',
      kr: '루네스',
      de: 'Luneth',
      es: 'Luneth'
    },
    abilities: [
      {
        names: {
          en: 'Cut Through +2',
          fr: 'Trancher +2',
          tw: '斬殺 +2',
          kr: '깊이 베기 +2',
          de: 'Dreindreschen +2',
          es: 'Descuartizar +2'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 60,
        castTime: 0,
        offset: 40,
        base: 525,
        ignore: 50
      }
    ]
  },
  {
    id: 53,
    names: {
      en: 'Grace',
      fr: 'Grace',
      tw: '格蕾斯',
      kr: '그레이스',
      de: 'Grace',
      es: 'Grace'
    },
    abilities: [
      {
        names: {
          en: 'Destroy Arm +2',
          fr: 'Détruire arme +2',
          tw: '毀滅臂鎧',
          kr: '파괴의 무기',
          de: 'Armzerstörer',
          es: 'Destruir arma'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 80,
        castTime: 0,
        offset: 40,
        base: 250,
        ignore: 50
      }
    ]
  },
  {
    id: 54,
    names: {
      en: 'Rem',
      fr: 'Rem',
      tw: '蕾姆',
      kr: '렘',
      de: 'Rem',
      es: 'Rem'
    },
    abilities: [
      {
        names: {
          en: 'Dagger Boomerang (Max)',
          fr: 'Dague boomerang (Max)',
          tw: '迴旋匕首 (Max)',
          kr: '부메랑 대거 (Max)',
          de: 'Dolchbumerang (Max)',
          es: 'Dagas bumerán (Max)'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 120,
        castTime: 40,
        offset: 0,
        base: 620
      },
      {
        names: {
          en: 'Dagger Boomerang +2 (Max)',
          fr: 'Dague boomerang +2 (Max)',
          tw: '迴旋匕首 +2 (Max)',
          kr: '부메랑 대거 +2 (Max)',
          de: 'Dolchbumerang +2 (Max)',
          es: 'Dagas bumerán +2 (Max)'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 120,
        castTime: 40,
        offset: 0,
        base: 860
      }
    ]
  },
  {
    id: 55,
    names: {
      en: 'Zyrus',
      fr: 'Zyrus',
      tw: '扎拉斯',
      kr: '자이러스',
      de: 'Zyrus',
      es: 'Zyrus'
    },
    abilities: [
      {
        names: {
          en: 'Blood Pulsar',
          fr: 'Pulsar de sang',
          tw: '血色脈衝',
          kr: '피의 펄서',
          de: 'Blutpulsar',
          es: 'Pulso sangriento'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 130,
        castTime: 30,
        offset: 16,
        base: 650,
        damage: 'magic'
      },
      {
        names: {
          en: 'Blood Rend',
          fr: 'Déchirure sanglante',
          tw: '血色撕裂',
          kr: '피의 열파',
          de: 'Blutriss',
          es: 'Hemorragia sangrienta'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 90,
        castTime: 30,
        offset: 16,
        base: 500,
        elements: [
          'water'
        ],
        damage: 'magic'
      },
      {
        names: {
          en: 'Blood Hydra',
          fr: '赤血九頭龍',
          tw: '피의 히드라',
          kr: 'Hydre sanglante',
          de: 'Bluthydra',
          es: 'Hidra sangrienta'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 215,
        castTime: 45,
        offset: 0,
        base: 740,
        elements: [
          'water'
        ],
        damage: 'magic',
        dualable: false
      }
    ]
  },
  {
    id: 56,
    names: {
      en: 'Shine',
      fr: 'Shine',
      tw: '夏因',
      kr: '샤인',
      de: 'Shine',
      es: 'Shine'
    },
    abilities: [
      {
        names: {
          en: 'Into Darkness',
          fr: 'Obscurité sans fin',
          tw: '黑暗降臨',
          kr: '어둠 속으로',
          de: 'Ins Dunkel',
          es: 'Oscuridad profunda'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 23,
        castTime: 0, //"effect_frames": [[0, 20, 20]],
        offset: 40,
        base: 420,
        elements: [
          'dark'
        ]
      }
    ]
  },
  {
    id: 57,
    names: {
      en: 'Olive',
      fr: 'Olive',
      tw: '奧利芙',
      kr: '올리브',
      de: 'Olive',
      es: 'Olivia'
    },
    abilities: [
      {
        names: {
          en: 'True Shot',
          fr: 'Tir sérieux',
          tw: '精準射擊',
          kr: '진실의 포탄',
          de: 'Wahrer Schuss',
          es: 'Disparo verdadero'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 100,
        castTime: 20,
        offset: 26,
        base: 240,
        ignore: 50
      }
    ],
    dual: false
  },
  {
    id: 58,
    names: {
      en: 'Emperor',
      fr: 'Empereur',
      tw: '皇帝',
      kr: '황제',
      de: 'Imperator',
      es: 'Emperador'
    },
    abilities: [
      {
        names: {
          en: 'Starfall',
          fr: 'Météorite',
          tw: '隕星',
          kr: '운석',
          de: 'Sternenbruch',
          es: 'Meteorito'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 350,
        castTime: 40,
        offset: 0,
        base: 230,
        ignore: 50,
        damage: 'magic',
        dualable: false,
      },
      {
        names: {
          en: 'Fire From Below',
          fr: 'Feu de l\'Enfer',
          tw: '地獄業火',
          kr: '지옥의 업화',
          de: 'Feuer von unten',
          es: 'Fuego del averno'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 80,
        castTime: 40,
        offset: 0,
        base: 2000,
        damage: 'magic',
        elements : [
          'fire'
        ],
        dualable: false,
      },
      {
        names: {
          en: 'Fire From Below +2',
          fr: 'Feu de l\'Enfer +2',
          tw: '地獄業火 +2',
          kr: '지옥의 업화 +2',
          de: 'Feuer von unten +2',
          es: 'Fuego del averno +2'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 80,
        castTime: 40,
        offset: 0,
        base: 2500,
        damage: 'magic',
        elements : [
          'fire'
        ],
        debuff: {
          fire: 50
        },
        dualable: false,
      }
    ]
  },
  {
    id: 59,
    names: {
      en: 'Dark Knight Cecil',
      fr: 'Cécil chevevalier noir',
      tw: '暗黑騎士塞西爾',
      kr: '암흑기사 세실',
      de: 'Dunkelritter Cecil',
      es: 'Cecil oscuro'
    },
    abilities: [
      {
        names: {
          en: 'Soul Eater +2',
          fr: 'Mangeur d\'âme +2',
          tw: '噬魂 +2',
          kr: '영혼 포식자 +2',
          de: 'Seelenfresser +2',
          es: 'Devora almas +2'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 20,
        castTime: 0,
        offset: 40,
        base: 750,
        elements: [
          'dark'
        ],
        debuff: {
          dark: 100
        }
      }
    ]
  },
  {
    id: 60,
    names: {
      en: 'Gaffgarion',
      fr: 'Gaffgarion',
      tw: '加夫加利安',
      kr: '가프가리온',
      de: 'Gaffgarion',
      es: 'Gaffgarion'
    },
    abilities: [
      {
        names: {
          en: 'Abyssal Blade +2',
          fr: 'Lame abyssale +2',
          tw: '罪惡斬',
          kr: '악마의 검',
          de: 'Abyssklinge',
          es: 'Hoja abisal'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 120,
        castTime: 40,
        offset: 0,
        base: 750,
        elements: [
          'dark'
        ]
      }
    ]
  },
  {
    id: 61,
    names: {
      en: 'Kefka',
      fr: 'Kefka',
      tw: '凱夫卡',
      kr: '케프카',
      de: 'Kefka',
      es: 'Kefka'
    },
    abilities: [
      {
        names: {
          en: 'Light of Judgment +2',
          fr: 'Lumière du jugement +2',
          tw: '制裁之光',
          kr: '심판의 빛',
          de: 'Licht des Urteils',
          es: 'Luz de juicio'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 110,
        castTime: 40,
        offset: 0,
        base: 280,
        ignore: 50,
        dualable: false,
        damage: 'magic'
      }
    ]
  },
  {
    id: 62,
    names: {
      en: 'Bartz',
      fr: 'Bartz',
      tw: '巴茲',
      kr: '버츠',
      de: 'Bartz',
      es: 'Bartz'
    },
    abilities: [
      {
        names: {
          en: 'Wind Shear +2',
          fr: 'Tranche-vent +2',
          tw: '旋風斬',
          kr: '선풍참',
          de: 'Windschneide',
          es: 'Tajo de viento'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 70,
        castTime: 40, //"effect_frames": [[0]], "effects_raw": [[1, 1, 40, [0, 0, 0, 0, 0, 0, 0, 0, 540, 540]]],
        offset: 0,
        base: 700,
        damage: 'hybrid'
      }
    ]
  },
  {
    id: 63,
    names: {
      en: 'Goken',
      fr: 'Goken',
      tw: '剛健',
      kr: '고우켄',
      de: 'Goken',
      es: 'Goken'
    },
    abilities: [
      {
        names: {
          en: 'Firm Punch',
          fr: 'Poing ferme',
          tw: '剛拳',
          kr: '강권',
          de: 'Solider Schlag',
          es: 'Puñetazo firme'
        },
        framesList: '0-10-10-10-10-10',
        hitDamage: [16, 16, 17, 17, 17, 17],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 300
      },
      {
        names: {
          en: 'Light Kick',
          fr: 'Coup de pied léger',
          tw: '柔腳',
          kr: '유격',
          de: 'Weicher Tritt',
          es: 'Patada suave'
        },
        framesList: '0-10-10-10-10-10',
        hitDamage: [16, 16, 17, 17, 17, 17],
        firstHit: 50,
        castTime: 40,
        offset: 16,
        base: 200
      },
      {
        names: {
          en: 'Wolfclaw Fist',
          fr: 'Poings croc-de-loup',
          tw: '狼剛拳',
          kr: '늑대의 강권',
          de: 'Wolfsklauenfaust',
          es: 'Puño garra de lobo'
        },
        framesList: '0-10-10-10-10-10-10-10',
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 500
      },
      {
        names: {
          en: 'Falcon Kick',
          fr: 'Coup de pied du Faucon',
          tw: '鷹柔腳',
          kr: '매의 유격',
          de: 'Falkentritt',
          es: 'Patada halcón'
        },
        framesList: '0-10-10-10-10-10-10-10',
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 300
      },
      {
        names: {
          en: 'Tigerclaw Fist',
          fr: 'Poings croc-de-tigre',
          tw: '虎剛拳',
          kr: '호랑이의 강권',
          de: 'Tigerklauenfaust',
          es: 'Puño garra de tigre'
        },
        framesList: '0-8-8-8-8-8-8-8-8-8',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 600
      },
      {
        names: {
          en: 'Dragon Kick',
          fr: 'Coup de pied du Dragon',
          tw: '龍柔腳',
          kr: '용의 유격',
          de: 'Drachentritt',
          es: 'Patada dragón'
        },
        framesList: '0-8-8-8-8-8-8-8-8-8',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 400
      },
      {
        names: {
          en: 'Fist Supreme',
          fr: 'Coup de poings ultime',
          tw: '豪覇瞬烈拳',
          kr: '호패순열권',
          de: 'Stärkste Faust',
          es: 'Puño supremo'
        },
        framesList: '0-7-9-7-9-7-9-9-5-5',
        hitDamage: [5, 5, 5, 5, 5, 5, 5, 65],
        firstHit: 47,
        castTime: 0,
        offset: 0,
        base: 840,
        dualable: false
      }
    ]
  },
  {
    id: 64,
    names: {
      en: 'Toxic Rain',
      fr: 'Pluie toxique',
      tw: '暴風酸性雨',
      kr: '산성 폭풍우',
      de: 'Giftregen',
      es: 'Lluvia tóxica'
    },
    abilities: [
      {
        names: {
          en: 'Toxic Rain',
          fr: 'Pluie toxique',
          tw: '暴風酸性雨',
          kr: '산성 폭풍우',
          de: 'Giftregen',
          es: 'Lluvia tóxica'
        },
        framesList: '0-10-10-10-10-10-10',
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        firstHit: 50,
        castTime: 40,
        offset: 16,
        base: 180,
        ignore: 25,
        damage: 'magic',
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 65,
    names: {
      en: 'Alterna',
      fr: 'Alternance',
      tw: '吸收',
      kr: '얼터너',
      de: 'Alterna',
      es: 'Versus'
    },
    abilities: [
      {
        names: {
          en: 'Alterna',
          fr: 'Alternance',
          tw: '吸收',
          kr: '얼터너',
          de: 'Alterna',
          es: 'Versus'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 365,
        castTime: 40,
        offset: 16,
        base: 510,
        ignore: 25,
        damage: 'magic',
      },
    ],
  },
  {
    id: 66,
    names: {
      en: 'Grim Lord Sakura',
      fr: 'Sakura, Seigneur Sombre',
      tw: '冷血貴族櫻',
      kr: '사신 사쿠라',
      de: 'Grimmige Herrin Sakura',
      es: 'Sakura la parca'
    },
    abilities: [
      {
        names: {
          en: 'Grim - Soul Barrage',
          fr: 'Obscurité - Barrage spectral',
          tw: '冷血 - 靈魂彈幕',
          kr: '사신·영혼 난사',
          de: 'Grimm - Seelensperre',
          es: 'Parca - Ráfaga de alma'
        },
        framesList: '0-10-10-10-10-10-10-10-10-10',
        hitDamage: [5, 5, 5, 7, 7, 8, 9, 9, 10, 35],
        firstHit: 62,
        castTime: 30,
        offset: 26,
        base: 200,
        ignore: 50,
        damage: 'magic'
      },
      {
        names: {
          en: 'Grim - Eldritch Flames',
          fr: 'Obscurité - Flammes surnaturelles',
          tw: '冷血 - 鬼火',
          kr: '사신·오싹한 불꽃',
          de: 'Grimm - Unirdische Flammen',
          es: 'Parca - Llama de Eldritch'
        },
        framesList: '0-10-10-10-10',
        hitDamage: [10, 10, 15, 15, 50],
        firstHit: 110,
        castTime: 0,
        offset: 56,
        base: 300,
        damage: 'magic',
        elements : [
          'dark',
          'fire'
        ],
        debuff : {
          dark: 50,
          fire: 50
        }
      },
      {
        names: {
          en: 'Phantom Fury',
          fr: 'Furie fantomatique',
          tw: '狂怒幻影',
          kr: '유령의 진노',
          de: 'Phantomwut',
          es: 'Furia fantasma'
        },
        framesList: '0-4-4-4-4-4-4-4-30',
        hitDamage: [5, 7, 8, 9, 10, 11, 12, 13, 25],
        firstHit: 62,
        castTime: 60,
        offset: 0,
        base: 660,
        damage: 'magic',
        dualable: false
      },
    ],
  },
  {
    id: 67,
    names: {
      en: 'Pirate Jake',
      fr: 'Jake, Pirate',
      tw: '海盜傑科',
      kr: '해적 제이크',
      de: 'Piraten-Jake',
      es: 'Jake pirata'
    },
    abilities: [
      {
        names: {
          en: 'Feed the Fishes',
          fr: 'Nourrissez les poissons',
          tw: '餵魚',
          kr: '물고기 밥',
          de: 'Macht sie zu Fischfutter!',
          es: 'Echadlo a los peces'
        },
        framesList: '0-5-5-5-5-5',
        hitDamage: [16, 16, 16, 17, 17, 18],
        firstHit: 22,
        castTime: 20,
        offset: 14,
        base: 350,
        debuff: {
          water: 50
        }
      },
      {
        names: {
          en: 'Unleash the Kraken',
          fr: 'Relâchez le Kraken',
          tw: '釋放克拉肯!',
          kr: '크라켄을 풀어라!',
          de: 'Befreit den Kraken',
          es: 'Soltad al Kraken'
        },
        framesList: '0-10-10-10-35-10-10-10',
        hitDamage: [10, 10, 12, 12, 13, 13, 15, 15],
        firstHit: 62,
        castTime: 0,
        offset: 0,
        base: 570,
        dualable: false,
        elements: [
          'water'
        ],
        debuff: {
          water: 74
        }
      },
    ],
  },
  {
    id: 68,
    names: {
      en: 'Illusionist Nichol',
      fr: 'Nichol, Illusionniste',
      tw: '幻術師尼科爾',
      kr: '마술사 니콜',
      de: 'Illusionist Nichol',
      es: 'Nichol ilusionista'
    },
    abilities: [
      {
        names: {
          en: 'Illusion - Phantasmal Forces',
          fr: 'Illusion - Forces fantasmagorique',
          tw: '幻術 - 幻影力量',
          kr: '마술·환영의 위력',
          de: 'Illusion - Phantasmagorische Kräfte',
          es: 'Ilusión - Fuerzas fantasmales'
        },
        framesList: '0-8-8-8-8-8-8',
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        firstHit: 50,
        castTime: 20,
        offset: 16,
        base: 600,
        damage: 'magic',
      },
    ],
  },
  {
    id: 69,
    names: {
      en: 'Siren',
      fr: 'Sirène',
      tw: '塞壬',
      kr: '세이렌',
      de: 'Sirene',
      es: 'Sirena'
    },
    abilities: [
      {
        names: {
          en: 'Lunatic Voice (2)',
          fr: 'Voix ensorcelante (2)',
          tw: '狂迷之聲 (2)',
          kr: '광기의 노래 (2)',
          de: 'Wahnstimme (2)',
          es: 'Voz lunática (2)'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 120,
        damage: 'magic',
        elements: [
          'water'
        ],
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 70,
    names: {
      en: 'Ifrit',
      fr: 'Ifrit',
      tw: '伊弗利特',
      kr: '이프리트',
      de: 'Ifrit',
      es: 'Ifrit'
    },
    abilities: [
      {
        names: {
          en: 'Hellfire (2)',
          fr: 'Flammes de l\'enfer (2)',
          tw: '地獄火焰 (2)',
          kr: '지옥의 화염 (2)',
          de: 'Inferno (2)',
          es: 'Fuego infernal (2)'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 110,
        castTime: 40,
        offset: 0,
        base: 140,
        damage: 'physic',
        elements: [
          'fire'
        ],
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 71,
    names: {
      en: 'Shiva',
      fr: 'Shiva',
      tw: '濕婆',
      kr: '시바',
      de: 'Shiva',
      es: 'Shiva'
    },
    abilities: [
      {
        names: {
          en: 'Diamond Dust (2)',
          fr: 'Poussière de diamant (2)',
          tw: '鑽石星塵 (2)',
          kr: '다이아몬드 더스트 (2)',
          de: 'Diamantstaub (2)',
          es: 'Polvo de diamantes (2)'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 110,
        castTime: 40,
        offset: 0,
        base: 140,
        damage: 'magic',
        elements: [
          'ice'
        ],
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 72,
    names: {
      en: 'Diabolos',
      fr: 'Diabolos',
      tw: '迪亞波羅斯',
      kr: '디아볼로스',
      de: 'Diabolos',
      es: 'Diablo'
    },
    abilities: [
      {
        names: {
          en: 'Dark Messenger (2)',
          fr: 'Héraut ténébreux (2)',
          tw: '黑暗使者 (2)',
          kr: '어둠에서 온 사자 (2)',
          de: 'Dunkler Bote (2)',
          es: 'Emisario de la noche (2)'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 190,
        castTime: 40,
        offset: 0,
        base: 170,
        damage: 'magic',
        elements: [
          'dark'
        ],
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 73,
    names: {
      en: 'Ramuh',
      fr: 'Ramuh',
      tw: '拉姆',
      kr: '라무',
      de: 'Ramuh',
      es: 'Lamú'
    },
    abilities: [
      {
        names: {
          en: 'Judgment Bolt (2)',
          fr: 'Foudre du jugement (2)',
          tw: '制裁之雷 (2)',
          kr: '심판의 벼락 (2)',
          de: 'Ionenschlag (2)',
          es: 'Rayos de justicia (2)'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 110,
        castTime: 40,
        offset: 0,
        base: 140,
        damage: 'magic',
        elements: [
          'lightning'
        ],
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 74,
    names: {
      en: 'Titan',
      fr: 'Titan',
      tw: '泰坦',
      kr: '타이탄',
      de: 'Titan',
      es: 'Titán'
    },
    abilities: [
      {
        names: {
          en: 'Gaia\'s Wrath (2)',
          fr: 'Colère de Gaïa (2)',
          tw: '大地之怒 (2)',
          kr: '대지의 분노 (2)',
          de: 'Gaias Wut (2)',
          es: 'Ira de la tierra (2)'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 170,
        damage: 'physic',
        elements: [
          'earth'
        ],
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 75,
    names: {
      en: 'Tetra Sylphid',
      fr: 'Tétra-Sylphides',
      tw: '四方風精靈',
      kr: '테트라 실피드',
      de: 'Tetra Sylphid',
      es: 'Tetra Sílfide'
    },
    abilities: [
      {
        names: {
          en: 'Heavenswind (2)',
          fr: 'Vent céleste (2)',
          tw: '四天之風 (2)',
          kr: '사천의 바람 (2)',
          de: 'Himmelswind (2)',
          es: 'Viento celestial (2)'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 190,
        castTime: 40,
        offset: 0,
        base: 180,
        damage: 'magic',
        elements: [
          'wind'
        ],
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 76,
    names: {
      en: 'Odin',
      fr: 'Odin',
      tw: '奧汀',
      kr: '오딘',
      de: 'Odin',
      es: 'Odín'
    },
    abilities: [
      {
        names: {
          en: 'Gungnir (2)',
          fr: 'Gungnir (2)',
          tw: '奧汀神槍 (2)',
          kr: '궁니르 (2)',
          de: 'Gungnir (2)',
          es: 'Gungnir (2)'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 70,
        castTime: 40,
        offset: 0,
        base: 200,
        damage: 'physic',
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 77,
    names: {
      en: 'Bahamut',
      fr: 'Bahamut',
      tw: '巴哈姆特',
      kr: '바하무트',
      de: 'Bahamut',
      es: 'Bahamut'
    },
    abilities: [
      {
        names: {
          en: 'Megaflare (1)',
          fr: 'MégaBrasier (1)',
          tw: '百萬核爆 (1)',
          kr: '메가플레어 (1)',
          de: 'Megaflamme (1)',
          es: 'Megafulgor (1)'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 300,
        damage: 'magic',
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 78,
    names: {
      en: 'Loren',
      fr: 'Loren',
      tw: '洛倫',
      kr: '로렌',
      de: 'Loren',
      es: 'Loren'
    },
    abilities: [
      {
        names: {
          en: 'Swiftwind Blade',
          fr: 'Lame oscillante',
          tw: '疾風之劍',
          kr: '질풍의 검',
          de: 'Sturmwindklinge',
          es: 'Cuchilla veloz'
        },
        framesList: '0-7-7-7-7-7-7-7-7-7',
        firstHit: 2,
        castTime: 0,
        offset: 66,
        base: 450,
        elements: [
          'wind'
        ],
      },
      {
        names: {
          en: 'Greased Lightning',
          fr: 'Éclair supersonique',
          tw: '疾風迅雷',
          kr: '질풍신뢰',
          de: 'Geölter Blitz',
          es: 'Tormenta huracanada'
        },
        framesList: '0-7-7-7-7-7-7-7',
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 2,
        castTime: 0,
        offset: 26,
        base: 250,
        ignore: 50,
      },
      {
        names: {
          en: 'Blade Prison',
          fr: 'Prison de lames',
          tw: '劍獄',
          kr: '검의 감옥',
          de: 'Klingengefängnis',
          es: 'Prisión de cuchillas'
        },
        framesList: '0-8-8-8-8-8-8-8-8-8',
        firstHit: 42,
        castTime: 40,
        offset: 17,
        base: 400
      },
      {
        names: {
          en: 'Quickbolt Blade',
          fr: 'Lame flashfoudre',
          tw: '迅雷之劍',
          kr: '신뢰의 검',
          de: 'Donnerschlagklinge',
          es: 'Cuchilla centella'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 50,
        castTime: 0,
        offset: 40,
        base: 225,
        ignore: 50,
        elements: [
          'lightning'
        ],
      },
      {
        names: {
          en: 'Kingdom\'s Order',
          fr: 'Ordre royal',
          tw: '王國秩序',
          kr: '왕국의 질서',
          de: 'Königlicher Befehl',
          es: 'Orden del reino'
        },
        framesList: '0-10-13-14-14-10-13-14-24-12-34-18-18-18-16',
        hitDamage: [3, 3, 3, 3, 3, 3, 3, 3, 3, 12, 12, 12, 12, 12, 13],
        firstHit: 34,
        castTime: 0,
        offset: 0,
        base: 420,
        ignore: 50,
        debuff: {
          wind: 74
        },
        dualable: false
      },
    ],
  },
  {
    id: 79,
    names: {
      en: 'Barbariccia',
      tw: '巴爾巴莉希亞',
      kr: '발바리시아',
      fr: 'Barbariccia',
      de: 'Barbarizia',
      es: 'Barbariccia'
    },
    abilities: [
      {
        names: {
          en: 'Tornado',
          fr: 'Tornade',
          tw: '龍捲風',
          kr: '토네이도',
          de: 'Tornado',
          es: 'Tornado'
        },
        framesList: '0-12-12-12-12-12-12-12-12-12-12-12',
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 80,
        castTime: 40,
        offset: 16,
        base: 250,
        elements: [
          'wind'
        ],
        debuff: {
          wind: 50
        },
        damage: 'magic'
      },
      {
        names: {
          en: 'Sunder',
          fr: 'Bourrasque électrique',
          tw: '斬斷',
          kr: '천둥',
          de: 'Blitzwind',
          es: 'Arrasar'
        },
        type: 'finish',
        framesList: '0',
        firstHit: 100,
        castTime: 20,
        offset: 0,
        base: 1000,
        elements: [
          'wind',
          'lightning'
        ],
        damage: 'magic',
        dualable: false
      },
      {
        names: {
          en: 'Maelstrom',
          fr: 'Maelström',
          tw: '大漩渦',
          kr: '마엘스트롬',
          de: 'Mahlstrom',
          es: 'Vórtice'
        },
        framesList: '0-5-5-10-10-20-20',
        hitDamage: [10, 10, 20, 15, 15, 15, 15],
        firstHit: 100,
        castTime: 90,
        offset: 0,
        base: 840,
        elements: [
          'wind',
          'lightning'
        ],
        debuff: {
          wind: 74,
          lightning: 74
        },
        damage: 'magic',
        dualable: false
      }
    ]
  },
  {
    id: 80,
    names: {
      en: 'Cor',
      tw: '柯爾',
      kr: '코르',
      fr: 'Cor',
      de: 'Cor',
      es: 'Cor'
    },
    abilities: [
      {
        names: {
          en: 'Slaughtering Blade',
          tw: '斬瞬刀',
          kr: '참순도',
          fr: 'Lame sanguinaire',
          de: 'Schlachtklinge',
          es: 'Hoja sanguinaria'
        },
        framesList: '0-8-8-8-8-8-8-8',
        hitDamage: [12, 12, 12, 12, 12, 12, 12, 16],
        firstHit: 0,
        castTime: 0,
        offset: 60,
        base: 280
      },
    ]
  },
  {
    id: 81,
    names: {
      en: 'Noctis',
      tw: '諾克提斯',
      kr: '녹티스',
      fr: 'Noctis',
      de: 'Noctis',
      es: 'Noctis'
    },
    abilities: [
      {
        names: {
          en: 'Warp Strike',
          tw: '變移破解',
          kr: '시프트 브레이크',
          fr: 'Assaut éclipse',
          de: 'Warp-Angriff',
          es: 'Lux Impetus'
        },
        framesList: '0-22-13',
        hitDamage: [60, 20, 20],
        firstHit: 52,
        castTime: 50,
        offset: 120,
        base: 250,
        ignore: 50,
        type: 'finish'
      },
      {
        names: {
          en: 'Point-Blank Warp-Strike',
          tw: '零距離變移破解',
          kr: '영거리 시프트 브레이크',
          fr: 'Assauts éclipse critiques',
          de: 'Direkt-Warp',
          es: 'Quemarropa'
        },
        framesList: '0-22-13',
        hitDamage: [60, 20, 20],
        firstHit: 52,
        castTime: 50,
        offset: 120,
        base: 525,
        ignore: 50,
        type: 'finish'
      },
      {
        names: {
          en: 'Thunder Flask',
          tw: '雷電瓶',
          kr: '선더 보틀',
          fr: 'Sphère de foudre',
          de: 'Donnerflasche',
          es: 'Vial Electro'
        },
        framesList: '0',
        firstHit: 80,
        castTime: 40,
        offset: 60,
        base: 400,
        damage: 'hybrid',
        type: 'finish',
        elements: [
          'lightning'
        ]
      },
      {
        names: {
          en: 'Blizzard Flask',
          tw: '暴雪瓶',
          kr: '블리자드 보틀',
          fr: 'Sphère de glace',
          de: 'Schneesturmflasche',
          es: 'Vial Hielo'
        },
        framesList: '0',
        firstHit: 145,
        castTime: 40,
        offset: 60,
        base: 400,
        damage: 'hybrid',
        type: 'finish',
        elements: [
          'ice'
        ]
      },
      {
        names: {
          en: 'Fire Flask',
          tw: '火焰瓶',
          kr: '파이어 보틀',
          fr: 'Sphère de feu',
          de: 'Molotowcocktail',
          es: 'Vial Piro'
        },
        framesList: '0',
        firstHit: 95,
        castTime: 40,
        offset: 60,
        base: 400,
        damage: 'hybrid',
        type: 'finish',
        elements: [
          'fire'
        ]
      },
      {
        names: {
          en: 'Armiger',
          tw: '幻影劍',
          kr: '팬텀 소드',
          fr: 'Arsenal fantôme',
          de: 'Armiger',
          es: 'Coro espectral'
        },
        framesList: '0-5-11-42-50',
        firstHit: 121,
        castTime: 0,
        offset: 0,
        base: 1480,
        dualable: false
      },
    ]
  },
  {
    id: 82,
    names: {
      en: 'Duke',
      tw: '杜克',
      kr: '듀크',
      fr: 'Duke',
      de: 'Duke',
      es: 'Duke'
    },
    abilities: [
      {
        names: {
          en: 'Hexa Thrust',
          tw: '六角突擊',
          kr: '헥사 드러스트',
          fr: 'Hexaestoque',
          de: 'Sechserstoß',
          es: 'Hexaestoque'
        },
        framesList: '0-6-6-6-6-29',
        hitDamage: [10, 10, 10, 10, 10, 50],
        firstHit: 28,
        castTime: 0,
        offset: 66,
        base: 200,
        ignore: 50,
        debuff: {
          ice: 50
        }
      },
      {
        names: {
          en: 'Vaskylade',
          tw: '龍騎槍蛇神突擊',
          kr: '용의 창 바스킬레이드',
          fr: 'Vaskylade',
          de: 'Vaskylade',
          es: 'Vaskylade'
        },
        framesList: '0-61-49-10-10',
        firstHit: 74,
        castTime: 0,
        offset: 0,
        base: 520,
        ignore: 50,
        elements: [
          'ice'
        ],
        dualable: false
      },
    ]
  },
  {
    id: 83,
    names: {
      en: 'Aura',
      tw: '阿烏拉',
      kr: '아우라',
      fr: 'Aura',
      de: 'Aura',
      es: 'Aura'
    },
    abilities: [
      {
        names: {
          en: 'Hundred Thrusts',
          tw: '百烈槍',
          kr: '백열의 창',
          fr: 'Cent coups',
          de: 'Hundert Stöße',
          es: 'Cien estoques'
        },
        framesList: '0-10-10-10-10-10-10-10',
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 47,
        castTime: 40,
        offset: 0,
        base: 120,
        ignore: 50,
      },
      {
        names: {
          en: 'Thousand Thrusts',
          tw: '千烈槍',
          kr: '천열의 창',
          fr: 'Mille coups',
          de: 'Tausend Stöße',
          es: 'Mil estoques'
        },
        framesList: '0-10-10-10-10-10-10-10-5-10-10-10',
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9],
        firstHit: 47,
        castTime: 40,
        offset: 0,
        base: 180,
        ignore: 50,
      },
      {
        names: {
          en: 'Tornado Spear',
          tw: '颶風矛',
          kr: '돌풍의 창',
          fr: 'Lance tornade',
          de: 'Tornadospeer',
          es: 'Lanza tornado'
        },
        framesList: '0-5-7-7-7-7-7-7-7-8',
        firstHit: 116,
        castTime: 0,
        offset: 0,
        base: 390,
        ignore: 50,
        elements: [
          'wind'
        ],
        debuff: {
          wind: 72
        },
        dualable: false
      },
    ]
  },
  {
    id: 84,
    names: {
      en: 'William',
      tw: '威廉',
      kr: '윌리엄',
      fr: 'William',
      de: 'William',
      es: 'William'
    },
    abilities: [
      {
        names: {
          en: 'Innocent Magika',
          tw: '聖潔魔法',
          kr: '이노센트 마기카',
          fr: 'Magika innocente',
          de: 'Unschuldige Magika',
          es: 'Magika inocente'
        },
        framesList: '0-40-20-30-30',
        firstHit: 70,
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 25,
        damage: 'magic',
        dualable: false
      },
      {
        names: {
          en: 'Quake',
          tw: '地槌',
          kr: '퀘이크',
          fr: 'Séisme',
          de: 'Beben',
          es: 'Seísmo'
        },
        framesList: '0-22-21-22-23-23-22-23',
        hitDamage: [12, 13, 12, 13, 12, 13, 12, 13],
        firstHit: 160,
        castTime: 40,
        offset: 16,
        base: 275,
        elements: [
          'earth'
        ],
        damage: 'magic'
      },
      {
        names: {
          en: 'Grand Wave',
          tw: '大波動',
          kr: '거대한 파동',
          fr: 'Grande vague',
          de: 'Große Welle',
          es: 'Gran oleaje'
        },
        framesList: '0',
        firstHit: 140,
        castTime: 0,
        offset: 0,
        base: 940,
        elements: [
          'earth'
        ],
        damage: 'magic',
        type: 'finish',
        dualable: false
      },
    ]
  },
  {
    id: 85,
    names: {
      en: 'Cloud',
      tw: '克勞德',
      kr: '클라우드',
      fr: 'Cloud',
      de: 'Cloud',
      es: 'Cloud'
    },
    dual: false,
    abilities: [
      {
        names: {
          en: 'Climhazzard',
          tw: '罪惡烈斬',
          kr: '클라임 해저드',
          fr: 'Péril ascendant',
          de: 'Climgefahr',
          es: 'Riesgo climático'
        },
        framesList: '0',
        firstHit: 4,
        castTime: 0,
        offset: 66,
        base: 275,
        ignore: 50,
        type: 'finish'
      },
      {
        names: {
          en: 'Meteor Rain',
          tw: '流星雨',
          kr: '메테오 레인',
          fr: 'Pluie de météorites',
          de: 'Meteorregen',
          es: 'Lluvia meteorito'
        },
        framesList: '0-8-8-8-8-8-8-8',
        hitDamage: [12, 12, 12, 12, 12, 12, 12, 16],
        firstHit: 84,
        castTime: 4,
        offset: 66,
        base: 180,
        ignore: 50
      },
      {
        names: {
          en: 'Finishing Touch',
          tw: '畫龍點睛',
          kr: '화룡점정',
          fr: 'Finition',
          de: 'Letzter Schliff',
          es: 'Toque final'
        },
        framesList: '0',
        firstHit: 75,
        castTime: 0,
        offset: 66,
        base: 400,
        type: 'finish'
      },
      {
        names: {
          en: 'Omnislash',
          tw: '超究武神霸斬',
          kr: '초구무신패참',
          fr: 'Omnifrappe',
          de: 'Omnischlag',
          es: 'Omnilátigo'
        },
        framesList: '0-18-16-32-16-12-22-22-16-14-32-18-12-30-102',
        hitDamage: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 30],
        firstHit: 188,
        castTime: 1,
        offset: 0,
        base: 1050,
        ignore: 50,
        dualable: false,
        range: {
          min: -360
        }
      },
    ]
  },
  {
    id: 86,
    names: {
      en: 'Tinkerer Carrie',
      tw: '機械工匠凱莉',
      kr: '세공사 캐리',
      fr: 'Carrie bricoleuse',
      de: 'Tüftler Carrie',
      es: 'Carrie la juguetera'
    },
    abilities: [
      {
        names: {
          en: 'Mechanical Trinket',
          tw: '機械玩具箱',
          kr: '장난감 기계 상자',
          fr: 'Babiole mécanique',
          de: 'Aufziehkästchen',
          es: 'Cacharro mecánico'
        },
        framesList: '0-8-8-9',
        hitDamage: [20, 25, 25, 30],
        firstHit: 60,
        castTime: 40,
        offset: 16,
        base: 160,
        ignore: 50,
        debuff: {
          ice: 50
        }
      },
      {
        names: {
          en: 'Robot Soldiers',
          tw: '機關士兵',
          kr: '로보트 병사',
          fr: 'Soldat robot',
          de: 'Aufziehsoldaten',
          es: 'Robosoldados'
        },
        framesList: '0-5-5-5-5-5-5-5-5-5',
        firstHit: 60,
        castTime: 40,
        offset: 16,
        base: 300
      },
      {
        names: {
          en: 'Hope of Light',
          tw: '希望之光',
          kr: '빛에 대한 희망',
          fr: 'Lumière de l\'espoir',
          de: 'Hoffnungsschimmer',
          es: 'Estrella fugaz'
        },
        framesList: '0-7-7-7-7-7',
        hitDamage: [12, 12, 12, 12, 12, 40],
        firstHit: 80,
        castTime: 70,
        offset: 16,
        base: 570,
        dualable: false
      }
    ]
  },
  {
    id: 87,
    names: {
      en: 'Kryla',
      tw: '克里菈',
      kr: '크라일라',
      fr: 'Kryla',
      de: 'Kryla',
      es: 'Kryla'
    },
    abilities: [
      {
        names: {
          en: 'Jinx - Emberfrost Brew',
          tw: '惡兆 - 烈火將至',
          kr: '징크스 - 불의 양조',
          fr: 'Maléfice - Braise gelée',
          de: 'Verhexen - Eisbrand-Gebräu',
          es: 'Gafe - Mezcolanza feroz'
        },
        framesList: '0',
        firstHit: 150,
        castTime: 40,
        offset: 16,
        base: 300,
        damage: 'magic',
        type: 'finish',
        elements: [
          'fire',
          'ice'
        ],
        debuff: {
          fire: 50,
          ice: 50
        }
      },
      {
        names: {
          en: 'Jinx - Geysershock Brew',
          tw: '惡兆 - 暴雪將至',
          kr: '징크스 - 눈보라의 양조',
          fr: 'Maléfice - Geyser électrique',
          de: 'Verhexen - Sprudelschock-Gebräu',
          es: 'Gafe - Mezcolanza tormentosa'
        },
        framesList: '0',
        firstHit: 70,
        castTime: 40,
        offset: 16,
        base: 300,
        damage: 'magic',
        type: 'finish',
        elements: [
          'lightning',
          'water'
        ],
        debuff: {
          lightning: 50,
          water: 50
        }
      },
      {
        names: {
          en: 'Jinx - Cycloseismic Brew',
          tw: '惡兆 - 泥流將至',
          kr: '징크스 - 진흙의 양조',
          fr: 'Maléfice - Cycloséisme',
          de: 'Verhexen - Schlammböel-Gebräu',
          es: 'Gafe - Mezcolanza turbia'
        },
        framesList: '0',
        firstHit: 180,
        castTime: 40,
        offset: 16,
        base: 300,
        damage: 'magic',
        type: 'finish',
        elements: [
          'wind',
          'earth'
        ],
        debuff: {
          wind: 50,
          earth: 50
        }
      }
    ]
  },
  {
    id: 88,
    names: {
      en: 'Christine',
      tw: '克莉絲汀',
      kr: '크리스틴',
      fr: 'Christine',
      de: 'Christine',
      es: 'Christine'
    },
    abilities: [
      {
        names: {
          en: 'Ice Shards',
          tw: '寒冰碎片',
          kr: '얼음 조각',
          fr: 'Fragment de glace',
          de: 'Eissplitter',
          es: 'Fragmentos de hielo'
        },
        framesList: '0-7-7-7-7-5-7-7-7-7',
        firstHit: 49,
        castTime: 20,
        offset: 0,
        base: 330,
        ignore: 25,
        damage: 'magic',
        elements: [
          'ice'
        ],
        dualable: false,
        range: {
          min: -10
        }
      },
      {
        names: {
          en: 'Absolute Zero',
          tw: '極限零凍',
          kr: '절대영도',
          fr: 'Zéro absolu',
          de: 'Absoluter Nullpunkt',
          es: 'Cero absoluto'
        },
        framesList: '0-5-5-5-5-5-5-5-5-5-5',
        hitDamage: [8, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11],
        firstHit: 40,
        castTime: 20,
        offset: 16,
        base: 300,
        damage: 'magic',
        elements: [
          'ice'
        ],
      },
      {
        names: {
          en: 'Absolute Zero (Max)',
          tw: '極限零凍 (Max)',
          kr: '절대영도 (Max)',
          fr: 'Zéro absolu (Max)',
          de: 'Absoluter Nullpunkt (Max)',
          es: 'Cero absoluto (Max)'
        },
        framesList: '0-5-5-5-5-5-5-5-5-5-5',
        hitDamage: [8, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11],
        firstHit: 40,
        castTime: 20,
        offset: 16,
        base: 900,
        damage: 'magic',
        elements: [
          'ice'
        ],
      },
      {
        names: {
          en: 'Snow Burial',
          tw: '冰雪葬',
          kr: '설장',
          fr: 'Cercueil de neige',
          de: 'Schneebegräbnis',
          es: 'Entierro de nieve'
        },
        framesList: '0-8-8-8-8-8-8-8-8-8',
        firstHit: 60,
        castTime: 36,
        offset: 16,
        base: 350,
        ignore: 50,
        damage: 'magic',
        elements: [
          'ice'
        ],
      },
      {
        names: {
          en: 'Snowbear Rampage',
          tw: '失控雪熊',
          kr: '광란의 눈곰',
          fr: 'Fureur de l\'ours blanc',
          de: 'Schneebär-Raserei',
          es: 'Furia polar'
        },
        framesList: '0-3-3-3-3-3-3-3-3-3-3',
        hitDamage: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
        firstHit: 80,
        castTime: 1,
        offset: 0,
        base: 710,
        damage: 'magic',
        elements: [
          'ice'
        ],
        dualable: false
      }
    ]
  },
  {
    id: 89,
    names: {
      en: 'White Knight Noel',
      tw: '白騎士諾埃爾',
      kr: '백기사 노엘',
      fr: 'Chevalier blanc Noël',
      de: 'Weißer Ritter Noel',
      es: 'Caballero blanco Noel'
    },
    abilities: [
      {
        names: {
          en: 'Glacial Wave +2',
          tw: '冰凍波 +2',
          kr: '빙하의 파도 +2',
          fr: 'Onde glaciale +2',
          de: 'Gletscherwelle +2',
          es: 'Ola glacial +2'
        },
        framesList: '0-6-4-3-3',
        firstHit: 178,
        castTime: 40,
        offset: 16,
        base: 400,
        ignore: 25,
        damage: 'magic',
        elements: [
          'ice'
        ],
        debuff: {
          ice: 50
        },
        dualable: false
      }
    ]
  }
];
