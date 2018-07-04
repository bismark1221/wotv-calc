export const UNITS: any[] = [
  {
    id: 1,
    names: {
      en: "Tidus",
      fr: "Tidus",
      tw: "提達",
      es: "Tidus",
      de: "Tidus",
      kr: "프리오닐"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Quick Hit",
          fr: "Attaque éclair",
          tw: "快捷進擊",
          kr: "퀵 트릭",
          de: "Schneller Treffer",
          es: "Golpe rápido"
        },
        framesList: [22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        castTime: 20,
        offset: 16,
        base: 400
      },
      {
        id: 2,
        names: {
          en: "Quick Hit +2",
          fr: "Attaque éclair +2",
          tw: "快捷進擊 +2",
          kr: "퀵 트릭 +2",
          de: "Schneller Treffer +2",
          es: "Golpe rápido +2"
        },
        framesList: [22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        castTime: 20,
        offset: 16,
        base: 720
      },
      {
        id: 3,
        names: {
          en: "Energy Rain",
          fr: "Déluge d'énergie",
          tw: "能量雨",
          kr: "에너지 레인",
          de: "Energieregen",
          es: "Lluvia de energía"
        },
        framesList: [67, 10, 10, 10],
        castTime: 40,
        offset: 16,
        base: 180
      },
      {
        id: 4,
        names: {
          en: "Jecht Shot",
          fr: "Jecht Shoot",
          tw: "傑克特射門",
          kr: "젝트 슛",
          de: "Jechtschuss",
          es: "Chut de Jecht"
        },
        type: "finish",
        framesList: [100],
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50,
        elements: [
          "water"
        ]
      },
      {
        id: 5,
        names: {
          en: "Blitz Ace",
          tw: "水鬥球王牌",
          kr: "블리츠의 에이스",
          fr: "Champion de blitz",
          de: "Blitzass",
          es: "As del blitzbol"
        },
        framesList: [106, 4, 10, 4, 10, 4, 4, 4, 12, 4, 20, 4, 14, 4, 36, 150],
        hitDamage: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 20],
        castTime: 0,
        offset: 0,
        base: 410,
        debuffs: [
          {
            type: "water",
            value: 100
          }
        ],
        dualable: false
      },
    ]
  },
  {
    id: 2,
    names: {
      en: "Firion",
      fr: "Firion",
      tw: "弗利奧尼爾",
      kr: "프리오닐",
      de: "Firion",
      es: "Firion"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Fin Briar",
          fr: "Fin Briar",
          tw: "野薔薇之翼",
          kr: "핀의 들장미",
          de: "Fingestrüpp",
          es: "Fin Briar"
        },
        type: "finish",
        framesList: [30],
        castTime: 0,
        offset: 36,
        base: 180,
        ignore: 25
      },
      {
        id: 2,
        names: {
          en: "Fin Briar +2",
          fr: "Fin Briar +2",
          tw: "野薔薇之翼 +2",
          kr: "핀의 들장미 +2",
          de: "Fingestrüpp +2",
          es: "Fin Briar +2"
        },
        type: "finish",
        framesList: [30],
        castTime: 0,
        offset: 36,
        base: 230,
        ignore: 50
      }
    ]
  },
  {
    id: 3,
    names: {
      en: "Orlandeau",
      fr: "Orlandeau",
      tw: "奧爾蘭多",
      kr: "올란두",
      de: "Orlandeau",
      es: "Orlandeau"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Divine Ruination",
          fr: "Ruine divine",
          tw: "聖光爆裂破",
          kr: "성광폭렬파",
          de: "Göttliche Zerstörung",
          es: "Ruina divina"
        },
        framesList: [70, 7, 5, 7, 7, 7, 7],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50,
        debuffs: [
          {
            type: "light",
            value: 50
          }
        ]
      },
      {
        id: 2,
        names: {
          en: "Divine Ruination +2",
          fr: "Ruine divine +2",
          tw: "聖光爆裂破 +2",
          kr: "성광폭렬파 +2",
          de: "Göttliche Zerstörung +2",
          es: "Ruina divina +2"
        },
        framesList: [70, 7, 5, 7, 7, 7, 7],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        castTime: 40,
        offset: 16,
        base: 260,
        ignore: 50,
        debuffs: [
          {
            type: "light",
            value: 50
          }
        ]
      },
      {
        id: 3,
        names: {
          en: "Lightning Stab",
          fr: "Décharge sacrée",
          tw: "無雙閃電刺",
          kr: "무쌍번개 찌르기",
          de: "Heiliger Blitz",
          es: "Descarga sagrada"
        },
        framesList: [42, 5, 5, 5, 5, 5],
        hitDamage: [15, 15, 15, 15, 20, 20],
        castTime: 40,
        offset: 16,
        base: 230,
        elements: [
          "lightning"
        ],
      }
    ]
  },
  {
    id: 4,
    names: {
      en: "Lunera",
      fr: "Lunera",
      tw: "盧內拉",
      kr: "루네라",
      de: "Lunera",
      es: "Lunera"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Aureole Ray",
          fr: "Rayon auréole",
          tw: "日輪射線",
          kr: "광환의 광선",
          de: "Koronastrahl",
          es: "Rayo áureo"
        },
        framesList: [42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        castTime: 40,
        offset: 16,
        base: 400,
        elements: [
          "wind",
          "light"
        ],
        damage: "magic",
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Aureole Ray +2",
          fr: "Rayon auréole +2",
          tw: "日輪射線 +2",
          kr: "광환의 광선 +2",
          de: "Koronastrahl +2",
          es: "Rayo áureo +2"
        },
        framesList: [42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        hitDamage: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        castTime: 40,
        offset: 16,
        base: 720,
        elements: [
          "wind",
          "light"
        ],
        damage: "magic",
        dualable: false
      },
      {
        id: 3,
        names: {
          en: "Gleaming Arrow",
          fr: "Flèche étincelante",
          tw: "閃光箭",
          kr: "빛나는 화살",
          de: "Leuchtender Pfeil",
          es: "Saeta centella"
        },
        type: "finish",
        framesList: [410],
        castTime: 0,
        offset: 0,
        base: 1500,
        elements : [
          "light"
        ],
        damage: "magic",
        dualable: false
      },
      {
        id: 4,
        names: {
          en: "Gail Arrow",
          fr: "Flèche tornade",
          tw: "烈風箭",
          kr: "돌풍의 화살",
          de: "Gailpfeil",
          es: "Saeta tornado"
        },
        type: "finish",
        framesList: [70],
        castTime: 0,
        offset: 0,
        base: 1500,
        elements : [
          "wind"
        ],
        damage: "magic",
        dualable: false
      }
    ],
    dual: false
  },
  {
    id: 5,
    names: {
      en: "Aileen",
      fr: "Aileen",
      tw: "艾琳",
      kr: "아이린",
      de: "Aileen",
      es: "Aileen"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Piledriver",
          fr: "Sonnette",
          tw: "打樁機",
          kr: "항타기",
          de: "Ramme",
          es: "Martinete"
        },
        framesList: [2, 15, 15, 15, 15],
        castTime: 0,
        offset: 36,
        base: 200,
        ignore: 50,
        debuffs: [
          {
            type: "earth",
            value: 50
          }
        ]
      },
      {
        id: 2,
        names: {
          en: "Piledriver +2",
          fr: "Sonnette +2",
          tw: "打樁機 +2",
          kr: "항타기 +2",
          de: "Ramme +2",
          es: "Martinete +2"
        },
        framesList: [2, 8, 8, 8, 8, 8, 8],
        hitDamage: [14, 14, 14, 14, 14, 15, 15],
        castTime: 0,
        offset: 36,
        base: 250,
        ignore: 50,
        debuffs: [
          {
            type: "earth",
            value: 75
          }
        ]
      }
    ]
  },
  {
    id: 6,
    names: {
      en: "Dark Veritas",
      fr: "Veritas des Ténèbres",
      tw: "常暗之維利亞斯",
      kr: "영원한 어둠의 베리어스",
      de: "Veritas der Finstere",
      es: "Veritas el tenebroso"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Dark Punishment",
          fr: "Punition obscure",
          tw: "暗黑之罪",
          kr: "암흑의 죄업",
          de: "Dunkelstrafe",
          es: "Castigo tenebroso"
        },
        framesList: [70, 7, 5, 7, 7, 7, 7],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50,
        debuffs: [
          {
            type: "dark",
            value: 50
          }
        ]
      },
      {
        id: 2,
        names: {
          en: "Dark Edge",
          fr: "Entaille obscure",
          tw: "暗黑之刃",
          kr: "암흑의 칼",
          de: "Dunkelschneide",
          es: "Filo tenebroso"
        },
        type: "finish",
        framesList: [110],
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50,
        elements: [
          "dark"
        ]
      }
    ]
  },
  {
    id: 7,
    names: {
      en: "2B",
      fr: "2B",
      tw: "2B",
      kr: "2B",
      de: "2B",
      es: "2B"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Avoid Attack",
          fr: "Esquiver Attaque",
          tw: "閃避攻擊",
          kr: "어보이드 어택",
          de: "Angriff ausweichen",
          es: "Esquivar"
        },
        framesList: [42, 9, 9, 9, 9, 9, 9, 9],
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        castTime: 40,
        offset: 0,
        base: 900,
      },
      {
        id: 2,
        names: {
          en: "Extract Speed",
          fr: "Attaque Sonique",
          tw: "迅速攻擊",
          kr: "스피드 어택",
          de: "Extrakt-Tempo",
          es: "Lentificar"
        },
        framesList: [2, 7, 7, 7, 8, 8, 8, 8, 8, 8],
        castTime: 0,
        offset: 40,
        base: 600,
      },
      {
        id: 3,
        names: {
          en: "R050: Spear",
          fr: "R050: Lance",
          tw: "R050：矛",
          kr: "R050: 스피어",
          de: "R050: Speer",
          es: "R050: Lanza"
        },
        framesList: [22, 5, 5, 5, 5, 5],
        hitDamage: [16, 16, 17, 17, 17, 17],
        castTime: 0,
        offset: 40,
        base: 550,
      },
      {
        id: 4,
        names: {
          en: "Steel Pipe",
          fr: "Barre de fer",
          tw: "鐵管",
          kr: "쇠 파이프",
          de: "Stahlröhre",
          es: "Tubo de hierro"
        },
        framesList: [42, 8, 8, 8, 8, 8, 8, 9],
        hitDamage : [12, 12, 12, 12, 13, 13, 13, 13],
        castTime: 40,
        offset: 0,
        base: 200,
      },
      {
        id: 5,
        names: {
          en: "R040: Blade",
          tw: "R040：劍",
          kr: "R040: 블레이드",
          fr: "R040 : Lame",
          de: "R040: Klinge",
          es: "R040: Espada"
        },
        hitDamage: [
          20, 20, 20, 20, 20
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        framesList: [42, 40, 40, 40, 40],
        offset: 16,
        base: 250
      },
      {
        id: 6,
        names: {
          en: "A150: Vault",
          fr: "A150: Décharge",
          tw: "A150：伏特",
          kr: "A150: 볼트",
          de: "A150: Volt",
          es: "A150: Voltio"
        },
        type: "finish",
        framesList: [42],
        castTime: 40,
        offset: 0,
        base: 400,
        debuffs: [
          {
            type: "lightning",
            value: 65
          }
        ]
      },
      {
        id: 7,
        names: {
          en: "Self Destruct: 2B",
          fr: "Autodestruction : 2B",
          tw: "自爆：2B",
          kr: "자폭: 2B",
          de: "Selbstzerstörung: 2B",
          es: "Autodestrucción: 2B"
        },
        type: "finish",
        framesList: [80],
        castTime: 40,
        offset: 0,
        base: 999,
        dualable: false
      },
      {
        id: 8,
        names: {
          en: "Ho229 Type-B",
          fr: "Ho229 Type-B",
          tw: "Ho229 Type-B",
          kr: "Ho229 Type-B",
          de: "Ho229 Type-B",
          es: "Ho229 Tipo-B"
        },
        framesList: [125, 10, 10, 10, 11, 12, 12, 12, 12, 12],
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
      en: "9S",
      fr: "9S",
      tw: "9S",
      kr: "9S",
      de: "9S",
      es: "9S"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Counter Attack",
          fr: "Contre-attaquer",
          tw: "反制攻擊",
          kr: "카운터 어택",
          de: "Konterangriff",
          es: "Contragolpe"
        },
        framesList: [42, 10, 10, 10, 10],
        castTime: 40,
        offset: 0,
        base: 180,
        ignore: 50
      },
      {
        id: 2,
        names: {
          en: "Self Destruct: 9S",
          fr: "Autodestruction : 9S",
          tw: "自爆：9S",
          kr: "자폭: 9S",
          de: "Selbstzerstörung: 9S",
          es: "Autodestrucción: 9S"
        },
        type: "finish",
        framesList: [80],
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
      en: "A2",
      fr: "A2",
      tw: "A2",
      kr: "A2",
      de: "A2",
      es: "A2"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Dash Attack",
          fr: "Attaque rapide",
          tw: "突進攻擊",
          kr: "대시",
          de: "Sprintangriff",
          es: "Ataque en carrera"
        },
        framesList: [9, 7, 7, 8, 8, 16, 8],
        hitDamage: [10, 15, 15, 15, 15, 15, 15],
        castTime: 9,
        offset: 30,
        base: 400,
      },
      {
        id: 2,
        names: {
          en: "Offensive Heal Combo",
          fr: "Combo offensivo-curatif",
          tw: "攻擊時回復HP連擊",
          kr: "공격 HP 회복 콤보",
          de: "Offensive Heilkombo",
          es: "Combo curativo-ofensivo"
        },
        framesList: [35, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        hitDamage: [6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 9, 10, 10, 10],
        castTime: 35,
        offset: 31,
        base: 510,
      },
      {
        id: 3,
        names: {
          en: "Heavy Attack",
          fr: "Attaque lourde",
          tw: "強攻擊",
          kr: "강공격",
          de: "Schwerer Angriff",
          es: "Ataque pesado"
        },
        framesList: [42, 9, 9, 9, 9, 9, 5, 4, 9, 5],
        hitDamage: [12, 12, 8, 10, 10, 10, 10, 10, 9, 9],
        castTime: 40,
        offset: 16,
        base: 330,
      },
      {
        id: 4,
        names: {
          en: "Finisher",
          fr: "Coup fatal",
          tw: "必殺",
          kr: "필살",
          de: "Todesstoß",
          es: "Golpe de gracia"
        },
        type: "finish",
        framesList: [42],
        castTime: 40,
        offset: 16,
        base: 600
      }
    ]
  },
  {
    id: 10,
    names: {
      en: "Ace",
      fr: "Ace",
      tw: "艾斯",
      kr: "에이스",
      de: "Ace",
      es: "Ace"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Tri-Beam Laser +2 (orange)",
          fr: "Laser triple +2 (orange)",
          tw: "三重雷射 +2 (橙子)",
          kr: "트라이 레이저 +2 (주황색)",
          de: "Triple-Jackpot +2 (oranje)",
          es: "Láser triple +2 (naranja)"
        },
        framesList: [64, 7, 7, 7, 7, 7, 7],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        castTime: 0,
        offset: 46,
        base: 560,
        ignore: 25,
        debuffs: [
          {
            type: "fire",
            value: 75,
          },
          {
            type: "light",
            value: 75,
          },
          {
            type: "lightning",
            value: 75,
          }
        ],
        damage: "magic",
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Attack Hand",
          fr: "Tirage explosif",
          tw: "攻擊牌組",
          kr: "공격 편성",
          de: "Angriffsdeck",
          es: "Mano ofensiva"
        },
        type: "finish",
        framesList: [150],
        castTime: 75,
        offset: 0,
        base: 320,
        ignore: 25,
        damage: "magic",
        dualable: false
      },
      {
        id: 254000106,
        names: {
          en: "Jackpot Shot",
          tw: "雷射加農",
          kr: "포격 광선",
          fr: "Canon laser",
          de: "Jackpot-Shot",
          es: "As láser"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "magic",
        magicType: null,
        dualable: false,
        framesList: [190],
        offset: 8,
        base: 410,
        ignore: 50,
        type: "finish"
      }
    ]
  },
  {
    id: 11,
    names: {
      en: "Agrias",
      fr: "Agrias",
      tw: "阿格莉亞絲",
      kr: "아그리아스",
      de: "Agrias",
      es: "Agrias"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Divine Ruination",
          fr: "Ruine divine",
          tw: "聖光爆裂破",
          kr: "성광폭렬파",
          de: "Göttliche Zerstörung",
          es: "Ruina divina"
        },
        framesList: [70, 10, 10, 10, 10],
        castTime: 40,
        offset: 16,
        base: 160,
        ignore: 50,
        debuffs: [
          {
            type: "light",
            value: 50
          }
        ]
      },
      {
        id: 2,
        names: {
          en: "Divine Ruination +2",
          fr: "Ruine divine +2",
          tw: "聖光爆裂破 +2",
          kr: "성광폭렬파 +2",
          de: "Göttliche Zerstörung +2",
          es: "Ruina divina +2"
        },
        framesList: [70, 7, 5, 7, 7, 7, 7],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50,
        debuffs: [
          {
            type: "light",
            value: 50
          }
        ]
      }
    ]
  },
  {
    id: 12,
    names: {
      en: "Amelia",
      fr: "Amélia",
      tw: "艾美利亞",
      kr: "아멜리아",
      de: "Amelia",
      es: "Amelia"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Disorder",
          fr: "Désordre",
          tw: "無序亂射",
          kr: "난동",
          de: "Störung",
          es: "Desorden"
        },
        framesList: [42, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        castTime: 40,
        offset: 16,
        base: 200
      },
      {
        id: 2,
        names: {
          en: "Disorder +2",
          fr: "Désordre +2",
          tw: "無序亂射 +2",
          kr: "난동 +2",
          de: "Störung +2",
          es: "Desorden +2"
        },
        framesList: [42, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        castTime: 40,
        offset: 16,
        base: 350
      }
    ]
  },
  {
    id: 13,
    names: {
      en: "Ashe",
      fr: "Ashe",
      tw: "雅雪",
      kr: "아셰",
      de: "Ashe",
      es: "Ashe"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Heaven's Fury",
          fr: "Ire céleste",
          tw: "聖光爆裂斬",
          kr: "성광폭렬참",
          de: "Himmelszorn",
          es: "Aura celestial"
        },
        framesList: [72, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        castTime: 40,
        offset: 16,
        base: 230,
        ignore: 25,
        damage: "magic",
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Sword of Kings",
          fr: "Épée des Rois",
          tw: "霸王之劍",
          kr: "패왕의 검",
          de: "Schwert der Könige",
          es: "Espada de reyes"
        },
        framesList: [42, 10, 10, 10, 10, 10, 10],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        castTime: 40,
        offset: 16,
        base: 270,
      },
      {
        id: 705340,
        names: {
          en: "Heaven's Fury +2",
          tw: "聖光爆裂斬 +2",
          kr: "성광폭렬참 +2",
          fr: "Ire céleste +2",
          de: "Himmelszorn +2",
          es: "Aura celestial +2"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        castTime: 40,
        damage: "magic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        framesList: [72, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        offset: 16,
        base: 300,
        ignore: 25
      }
    ]
  },
  {
    id: 14,
    names: {
      en: "Bran",
      fr: "Bran",
      tw: "布蘭",
      kr: "브란",
      de: "Bran",
      es: "Bran"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Thunder Clap",
          fr: "Coup de tonnerre",
          tw: "雷霆一擊",
          kr: "내리치는 천둥번개",
          de: "Donnerkrachen",
          es: "Trueno atronador"
        },
        framesList: [47, 5, 5, 5, 5, 5, 5],
        hitDamage: [14, 14, 14, 14, 14, 15, 15],
        castTime: 40,
        offset: 16,
        base: 270,
        elements: [
          "light",
          "lightning"
        ],
        debuffs: [
          {
            type: "light",
            value: 50,
          },
          {
            type: "lightning",
            value: 50,
          }
        ]
      },
      {
        id: 2,
        names: {
          en: "Thunder Clap +2",
          fr: "Coup de tonnerre +2",
          tw: "雷霆一擊 +2",
          kr: "내리치는 천둥번개 +2",
          de: "Donnerkrachen +2",
          es: "Trueno atronador +2"
        },
        framesList: [47, 5, 5, 5, 5, 5, 5],
        hitDamage: [14, 14, 14, 14, 14, 15, 15],
        castTime: 40,
        offset: 16,
        base: 320,
        elements: [
          "light",
          "lightning"
        ],
        debuffs: [
          {
            type: "light",
            value: 50,
          },
          {
            type: "lightning",
            value: 50,
          }
        ]
      }
    ]
  },
  {
    id: 15,
    names: {
      en: "Chizuru",
      fr: "Chizuru",
      tw: "千鶴",
      kr: "치즈루",
      de: "Chizuru",
      es: "Chizuru"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Phantom Shadow",
          fr: "Ombre fantasmatique",
          tw: "夢幻泡影",
          kr: "몽환포영",
          de: "Schall und Rauch",
          es: "Sombra fantasma"
        },
        framesList: [22, 5, 5, 5, 5],
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
      en: "Dark Fina",
      fr: "Fina Obscure",
      tw: "魔人菲娜",
      kr: "마인 피나",
      de: "Dunkel-Fina",
      es: "Fina oscura"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Ultima +2",
          fr: "Ultima +2",
          tw: "究極 +2",
          kr: "알테마 +2",
          de: "Ultima +2",
          es: "Artema +2"
        },
        framesList: [140, 37, 38, 37, 38, 38, 37],
        hitDamage: [10, 10, 10, 10, 10, 10, 40],
        castTime: 40,
        offset: 16,
        base: 280,
        ignore: 50,
        damage: "magic",
        magicType: "black",
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Dystopia",
          fr: "Dystopie",
          tw: "敵托邦",
          kr: "디스토피아",
          de: "Dystopia",
          es: "Distopía"
        },
        type: "finish",
        framesList: [120],
        castTime: 40,
        offset: 16,
        base: 600,
        elements: [
          "dark"
        ],
        dualable: false,
        damage: "magic"
      }
    ],
    multipleBlack: 2
  },
  {
    id: 17,
    names: {
      en: "Fohlen",
      fr: "Fohlen",
      tw: "福倫",
      kr: "포렌",
      de: "Fohlen",
      es: "Fohlen"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Sonic Blast",
          fr: "Rafale sonique",
          tw: "音速突擊",
          kr: "소닉 블래스트",
          de: "Schallwelle",
          es: "Estallido sónico"
        },
        framesList: [10, 10, 10, 10, 10, 10, 10],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        castTime: 0,
        offset: 66,
        base: 200,
        ignore: 50,
        elements: [
          "wind"
        ]
      },
      {
        id: 2,
        names: {
          en: "Sonic Blast +2",
          fr: "Rafale sonique +2",
          tw: "音速突擊 +2",
          kr: "소닉 블래스트 +2",
          de: "Schallwelle +2",
          es: "Estallido sónico +2"
        },
        framesList: [10, 10, 10, 10, 10, 10, 10],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        castTime: 0,
        offset: 66,
        base: 250,
        ignore: 50,
        elements: [
          "wind"
        ]
      }
    ]
  },
  {
    id: 18,
    names: {
      en: "Fryevia",
      fr: "Fryevia",
      tw: "弗雷比亞",
      kr: "프레이비아",
      de: "Fryevia",
      es: "Fryevia"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Frost Flower Blitz",
          fr: "Pétales gelés",
          tw: "冰花迅雷",
          kr: "서리꽃 폭풍",
          de: "Eisblumenblitz",
          es: "Pétalos helados"
        },
        framesList: [40, 7, 5, 7, 7, 7, 7],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        castTime: 0,
        offset: 22,
        base: 800,
        damage: "hybrid",
        debuffs: [
          {
            type: "ice",
            value: 50
          }
        ],
        elements: [
          "ice"
        ]
      },
      {
        id: 2,
        names: {
          en: "Second Intention",
          fr: "Seconde intention",
          tw: "第二意願",
          kr: "숨겨진 의도",
          de: "Plan B",
          es: "Segundas intenciones"
        },
        type: "finish",
        framesList: [100],
        castTime: 0,
        offset: 66,
        base: 600,
        damage: "hybrid",
      },
      {
        id: 3,
        names: {
          en: "Frost Flower Blitz +2",
          fr: "Pétales gelés +2",
          tw: "冰花迅雷 +2",
          kr: "서리꽃 폭풍 +2",
          de: "Eisblumenblitz +2",
          es: "Pétalos helados +2"
        },
        framesList: [70, 7, 5, 7, 7, 7, 7],
        hitDamage: [
          14, 14, 14, 14, 14, 14, 16
        ],
        castTime: 40,
        offset: 16,
        base: 1000,
        damage: "hybrid",
        debuffs: [
          {
            type: "ice",
            value: 75
          }
        ],
        elements: [
          "ice"
        ]
      },
      {
        id: 4,
        names: {
          en: "Second Intention +2",
          fr: "Seconde intention +2",
          tw: "第二意願 +2",
          kr: "숨겨진 의도 +2",
          de: "Plan B +2",
          es: "Segundas intenciones +2"
        },
        type: "finish",
        framesList: [0],
        firstHit: 100,
        castTime: 0,
        offset: 66,
        base: 1200,
        damage: "hybrid",
      }
    ]
  },
  {
    id: 19,
    names: {
      en: "Gilgamesh",
      fr: "Gilgamesh",
      tw: "吉爾伽美什",
      kr: "길가메시",
      de: "Gilgamesch",
      es: "Gilgamesh"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Tri-Attack",
          fr: "Triple-attaque",
          tw: "三劍舞",
          kr: "세 자루의 검",
          de: "Dreifachschlag",
          es: "Triataque"
        },
        framesList: [0, 4, 16, 4, 16, 4],
        hitDamage: [16, 16, 17, 17, 17, 17],
        firstHit: 40,
        castTime: 40,
        offset: 26,
        base: 300,
      },
      {
        id: 2,
        names: {
          en: "Tri-Attack +2",
          fr: "Triple-attaque +2",
          tw: "三劍舞 +2",
          kr: "세 자루의 검 +2",
          de: "Dreifachschlag +2",
          es: "Triataque +2"
        },
        framesList: [0, 4, 6, 4, 6, 4, 6, 4, 6, 4, 6, 4],
        hitDamage: [8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9],
        firstHit: 40,
        castTime: 40,
        offset: 26,
        base: 300,
      },
      {
        id: 3,
        names: {
          en: "Snowpetal +2",
          fr: "Flocon de neige +2",
          tw: "雪月花 +2",
          kr: "설월화 +2",
          de: "Wintermondblüten +2",
          es: "Pétalo de nieve +2"
        },
        type: "finish",
        framesList: [0],
        firstHit: 60,
        castTime: 0,
        offset: 40,
        base: 200,
        ignore: 65
      }
    ]
  },
  {
    id: 20,
    names: {
      en: "Knight Delita",
      fr: "Delita Chevalier",
      tw: "騎士迪利塔",
      kr: "기사 디리타",
      de: "Ritter Delita",
      es: "Delita caballero"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Commanding Blade",
          fr: "Lame du commandant",
          tw: "霸道之劍",
          kr: "패도의 검",
          de: "Eindrucksvolle Klinge",
          es: "Hoja del comandante"
        },
        framesList: [0, 9, 9, 9, 9, 9, 9, 9],
        hitDamage: [12, 13, 12, 13, 12, 13, 12, 13],
        firstHit: 51,
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50
      },
      {
        id: 2,
        names: {
          en: "Lightning Stab",
          fr: "Décharge sacrée",
          tw: "無雙閃電刺",
          kr: "무쌍번개 찌르기",
          de: "Heiliger Blitz",
          es: "Descarga sagrada"
        },
        framesList: [0, 5, 5, 5, 5, 5],
        hitDamage: [15, 15, 15, 15, 20, 20],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 230,
        elements: [
          "lightning"
        ],
      },
      {
        id: 3,
        names: {
          en: "Strategic blade",
          fr: "Lame du stratège",
          tw: "謀略之劍",
          kr: "함정의 검",
          de: "Taktikklinge",
          es: "Hoja del estratega"
        },
        type: "finish",
        framesList: [0],
        firstHit: 20,
        castTime: 0,
        offset: 40,
        base: 250,
        ignore: 50,
        debuffs: [
          {
            type: "lightning",
            value: 50
          }
        ]
      },
      {
        id: 911061,
        names: {
          en: "Commanding Blade +2",
          tw: "霸道之劍 +2",
          kr: "패도의 검 +2",
          fr: "Lame du commandant +2",
          de: "Eindrucksvolle Klinge +2",
          es: "Hoja del comandante +2"
        },
        hitDamage: [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 51,
        framesList: [0, 9, 9, 9, 9, 9, 9, 9],
        offset: 16,
        base: 300,
        ignore: 50
      },
    ]
  },
  {
    id: 21,
    names: {
      en: "Light Veritas",
      fr: "Veritas de la Lumière",
      tw: "光輝之維利亞斯",
      kr: "찬란한 빛의 베리어스",
      de: "Veritas des Lichts",
      es: "Veritas el luminoso"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Divine Shot",
          fr: "Tir divin",
          tw: "聖徒射擊",
          kr: "성스러운 사격",
          de: "Göttlicher Schuss",
          es: "Disparo divino"
        },
        framesList: [0, 9, 9, 9, 9, 9, 9],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 700,
        damage: "hybrid",
        elements: [
          "light"
        ],
        debuffs: [
          {
            type: "light",
            value: 50
          }
        ]
      },
      {
        id: 2,
        names: {
          en: "Saint Buster",
          fr: "Casseur céleste",
          tw: "神聖破壞",
          kr: "세인트 버스터",
          de: "Heiligenjäger",
          es: "Destructor santo"
        },
        type: "finish",
        framesList: [0],
        firstHit: 150,
        castTime: 40,
        offset: 0,
        base: 1600,
        damage: "hybrid"
      }
    ]
  },
  {
    id: 22,
    names: {
      en: "Mercenary Ramza",
      fr: "Ramza Mercenaire",
      tw: "傭兵拉姆薩",
      kr: "용병 람자",
      de: "Söldner Ramza",
      es: "Ramza mercenario"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Blade of Justice",
          fr: "Lame de la justice",
          tw: "正義之劍",
          kr: "영웅의 검",
          de: "Klinge der Gerechtigkeit",
          es: "Hoja justiciera"
        },
        framesList: [0, 8, 8, 8, 8, 8, 6, 8],
        hitDamage: [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 250,
        ignore: 25,
      },
      {
        id: 705500,
        names: {
          en: "Blade of Justice +2",
          tw: "正義之劍 +2",
          kr: "정의로운 검 +2",
          fr: "Lame de la justice +2",
          de: "Schwert der Rechtschaffenheit +2",
          es: "Espada justiciera +2"
        },
        hitDamage: [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 42,
        framesList: [0, 8, 8, 8, 8, 8, 6, 8],
        offset: 16,
        base: 300,
        ignore: 25
      },
    ]
  },
  {
    id: 23,
    names: {
      en: "Randi",
      fr: "Randy",
      tw: "蘭迪",
      kr: "랜디",
      de: "Randi",
      es: "Randy"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Whirlwind Slash",
          tw: "旋風三段斬",
          kr: "질풍 삼단 베기",
          fr: "Entaille tourbillonnante",
          de: "Wirbelwindschnitt",
          es: "Tajo torbellino"
        },
        hitDamage: [50, 50],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [
          {
            type: "wind",
            value: 50
          }
        ],
        firstHit: 17,
        framesList: [0, 26],
        offset: 8,
        base: 700
      },
      {
        id: 2,
        names: {
          en: "Torrential Slash",
          tw: "前後逆波斬",
          kr: "전후격파 베기",
          fr: "Entaille torrentielle",
          de: "Reißender Schnitt",
          es: "Tajo torrencial"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 42,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        offset: 26,
        base: 700
      }
    ]
  },
  {
    id: 24,
    names: {
      en: "Rasler",
      fr: "Rasler",
      tw: "拉斯勒",
      kr: "라슬러",
      de: "Rasler",
      es: "Rasler"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Patriotic Slash",
          fr: "Coup patriotique",
          tw: "救國斬閃",
          kr: "구국의 검광",
          de: "Patriotischer Hieb",
          es: "Corte patriótico"
        },
        framesList: [0, 10, 10, 10, 10, 10, 10],
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
      en: "Reberta",
      fr: "Réberta",
      tw: "蕾貝爾塔",
      kr: "리베르타",
      de: "Reberta",
      es: "Reberta"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Mystic Thrust",
          fr: "Coup mystique",
          tw: "神秘衝擊",
          kr: "마법 찌르기",
          de: "Mystischer Stoß",
          es: "Estoque místico"
        },
        framesList: [0, 10, 10, 10, 10, 10, 10],
        hitDamage: [14, 14, 15, 14, 14, 15, 14],
        firstHit: 42,
        castTime: 42,
        offset: 24,
        base: 400,
      },
      {
        id: 911067,
        names: {
          en: "Mystic Thrust +1",
          tw: "神秘衝擊 +1",
          kr: "마법 찌르기 +1",
          fr: "Coup mystique +1",
          de: "Mystischer Stoß +1",
          es: "Estoque místico +1"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 42,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
        offset: 16,
        base: 450
      },
      {
        id: 911069,
        names: {
          en: "Mystic Thrust +2",
          tw: "神秘衝擊 +2",
          kr: "마법 찌르기 +2",
          fr: "Coup mystique +2",
          de: "Mystischer Stoß +2",
          es: "Estoque místico +2"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 42,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
        offset: 16,
        base: 500
      },
      {
        id: 911070,
        names: {
          en: "Mystic Blitz +2",
          tw: "神秘閃擊 +2",
          kr: "마법 공습 +2",
          fr: "Raid mystique +2",
          de: "Mystischer Blitz +2",
          es: "Centella mística +2"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 42,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
        offset: 16,
        base: 500
      }
    ]
  },
  {
    id: 26,
    names: {
      en: "Rikku",
      fr: "Rikku",
      tw: "琉克",
      kr: "류크",
      de: "Rikku",
      es: "Rikku"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Burning Soul",
          fr: "Âme ardente",
          tw: "燃燒之心",
          kr: "타오르는 마음",
          de: "Flammenseele",
          es: "Alma candente"
        },
        framesList: [0, 25, 25, 25, 25, 25, 25, 25, 25],
        hitDamage: [10, 10, 10, 10, 10, 10, 10, 10, 20],
        firstHit: 40,
        castTime: 40,
        offset: 16,
        base: 230,
        elements: [
          "fire"
        ]
      },
      {
        id: 2,
        names: {
          en: "Winter Storm",
          fr: "Avalanche",
          tw: "寒冬風暴",
          kr: "겨울 폭풍",
          de: "Wintersturm",
          es: "Tormenta invernal"
        },
        framesList: [0, 13, 13, 13, 13, 13, 13, 13, 13],
        hitDamage: [10, 10, 10, 10, 10, 10, 10, 10, 20],
        firstHit: 40,
        castTime: 40,
        offset: 16,
        base: 230,
        elements: [
          "ice"
        ]
      },
      {
        id: 3,
        names: {
          en: "Lightning Rod",
          fr: "Flash",
          tw: "閃電箭",
          kr: "라이트닝 볼트",
          de: "Blitzableiter",
          es: "Rayos fulminantes"
        },
        framesList: [0, 5, 5, 5, 5, 5, 5, 5, 5],
        hitDamage: [10, 10, 10, 10, 10, 10, 10, 10, 20],
        firstHit: 45,
        castTime: 40,
        offset: 16,
        base: 230,
        elements: [
          "lightning"
        ]
      },
      {
        id: 4,
        names: {
          en: "Tidal Wave",
          fr: "Tsunami",
          tw: "大海嘯",
          kr: "해일",
          de: "Flutwelle",
          es: "Ola sísmica"
        },
        framesList: [0, 9, 9, 9, 9, 9, 9, 9, 9],
        hitDamage: [10, 10, 10, 10, 10, 10, 10, 10, 20],
        firstHit: 40,
        castTime: 40,
        offset: 16,
        base: 230,
        elements: [
          "water"
        ]
      },
      {
        id: 5,
        names: {
          en: "Tidal Wave +2",
          fr: "Tsunami +2",
          tw: "大海嘯 +2",
          kr: "해일 +2",
          de: "Flutwelle +2",
          es: "Ola sísmica +2"
        },
        framesList: [0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 132,
        castTime: 40,
        offset: 16,
        base: 280,
        elements: [
          "water"
        ]
      }
    ]
  },
  {
    id: 27,
    names: {
      en: "Seabreeze Dark Fina",
      fr: "Fina Obscure en Maillot",
      tw: "涼爽魔人菲娜",
      kr: "바닷바람의 마인 피나",
      de: "Dunkel-Seewind-Fina",
      es: "Fina oscura de la marea"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Ultima +2",
          fr: "Ultima +2",
          tw: "究極 +2",
          kr: "알테마 +2",
          de: "Ultima +2",
          es: "Artema +2"
        },
        framesList: [0, 37, 38, 37, 38, 38, 37],
        hitDamage: [10, 10, 10, 10, 10, 10, 40],
        firstHit: 140,
        castTime: 40,
        offset: 16,
        base: 280,
        ignore: 50,
        damage: "magic",
        magicType: "black",
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Utopia",
          fr: "Utopie",
          tw: "烏托邦",
          kr: "유토피아",
          de: "Utopia",
          es: "Utopía"
        },
        type: "finish",
        framesList: [0],
        firstHit: 120,
        castTime: 40,
        offset: 16,
        base: 600,
        elements: [
          "water"
        ],
        dualable: false,
        damage: "magic"
      },
      {
        id: 3,
        names: {
          en: "Utopia +2",
          fr: "Utopie +2",
          tw: "烏托邦 +2",
          kr: "유토피아 +2",
          de: "Utopia +2",
          es: "Utopía +2"
        },
        type: "finish",
        framesList: [0],
        firstHit: 120,
        castTime: 40,
        offset: 16,
        base: 910,
        elements: [
          "water"
        ],
        dualable: false,
        damage: "magic"
      }
    ],
    multipleBlack: 2
  },
  {
    id: 28,
    names: {
      en: "Setzer",
      fr: "Setzer",
      tw: "塞策",
      kr: "셋쳐",
      de: "Setzer",
      es: "Setzer"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Prismatic Flash",
          fr: "Prisme arc-en-ciel",
          tw: "七色閃光",
          kr: "세븐플래시",
          de: "Prismatischer Blitz",
          es: "Multiflash"
        },
        base: 180,
        framesList: [0, 5, 5, 5, 5, 5, 5],
        hitDamage: [14, 14, 14, 14, 14, 15, 15],
        firstHit: 42,
        castTime: 0,
        offset: 56
      },
      {
        id: 2,
        names: {
          en: "Red Card",
          fr: "Carte sanglante",
          tw: "血色飛牌",
          kr: "레드 카드",
          de: "Rote Karte",
          es: "Carta roja"
        },
        framesList: [0, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 320
      },
      {
        id: 3,
        names: {
          en: "Double Dice",
          fr: "Double dés",
          tw: "雙重骰子",
          kr: "더블 주사위",
          de: "Doppelwürfel",
          es: "Dado doble"
        },
        type: "finish",
        framesList: [0],
        firstHit: 16,
        castTime: 0,
        offset: 56,
        base: 100
      },
      {
        id: 4,
        names: {
          en: "Red Card +2",
          fr: "Carte sanglante +2",
          tw: "血色飛牌 +2",
          kr: "레드 카드 +2",
          de: "Rote Karte +2",
          es: "Carta roja +2"
        },
        framesList: [0, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 450
      },
      {
        id: 5,
        names: {
          en: "Diving Bomb",
          tw: "俯衝炸彈",
          kr: "다이빙·봄",
          fr: "Saut en bombe",
          de: "Tauchbombe",
          es: "Salto en bomba"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 10, 20
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 150,
        framesList: [0, 6, 5, 7, 5, 5, 8, 5, 5],
        offset: 8,
        base: 390,
        ignore: 50,
        dualable: false
      }
    ]
  },
  {
    id: 29,
    names: {
      en: "Shantotto",
      fr: "Shantotto",
      tw: "香托托",
      kr: "샨토토",
      de: "Shantotto",
      es: "Shantotto"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Tornado",
          fr: "Tornade",
          tw: "龍捲風",
          kr: "토네이도",
          de: "Tornado",
          es: "Tornado"
        },
        framesList: [0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 212,
        castTime: 40,
        offset: 16,
        base: 250,
        elements: [
          "wind"
        ],
        debuffs: [
          {
            type: "wind",
            value: 50
          }
        ],
        damage: "magic",
        magicType: "black",
        dualable: false
      },
      {
        id: 20330,
        names: {
          en: "Aeroja",
          tw: "強勁風",
          kr: "에어로쟈",
          fr: "Vent max",
          de: "Aeroka",
          es: "Aero+++"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "wind"
        ],
        debuffs: [],
        dualable: false,
        firstHit: 170,
        framesList: [0],
        offset: 16,
        base: 600,
        type: "finish"
      }
    ],
    multipleBlack: 2
  },
  {
    id: 30,
    names: {
      en: "Trance Terra",
      fr: "Terra en transe",
      tw: "入神蒂娜",
      kr: "트랜스 티나",
      de: "Trance-Terra",
      es: "Terra en trance"
    },
    abilities: [
      {
        id: 500590,
        names: {
          en: "Chaos Wave",
          fr: "Onde chaotique",
          tw: "混沌波動",
          kr: "혼돈의 파동",
          de: "Chaoswelle",
          es: "Ola caótica"
        },
        framesList: [0, 20, 20, 20, 20],
        firstHit: 52,
        castTime: 40,
        offset: 16,
        base: 360,
        ignore: 50,
        damage: "magic",
        dualable: false
      },
      {
        id: 704700,
        names: {
          en: "Chaos Wave Awakened +2",
          fr: "Onde chaotique - Év. +2",
          tw: "覺醒混沌波動 +2",
          kr: "각성·혼돈의 파동 +2",
          de: "Chaoswelle erwacht +2",
          es: "Ola caótica - Haz +2"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        firstHit: 60,
        castTime: 40,
        offset: 12,
        base: 420,
        ignore: 50,
        damage: "magic",
        dualable: false
      },
      {
        id: 3,
        names: {
          en: "Ultima +2",
          fr: "Ultima +2",
          tw: "究極 +2",
          kr: "알테마 +2",
          de: "Ultima +2",
          es: "Artema +2"
        },
        framesList: [0, 37, 38, 37, 38, 38, 37],
        hitDamage: [10, 10, 10, 10, 10, 10, 40],
        firstHit: 140,
        castTime: 40,
        offset: 16,
        base: 280,
        ignore: 50,
        damage: "magic",
        magicType: "black",
        dualable: false
      },
      {
        id: 4,
        names: {
          en: "Riot Blade - Trance",
          fr: "入神·暴亂劍",
          tw: "트랜스·폭도의 검격",
          kr: "Lame rebelle - Transe",
          de: "Tumultschwert - Trance",
          es: "Hoja letal - trance"
        },
        framesList: [0, 10, 14, 9, 16, 12, 42, 4, 4],
        hitDamage: [10, 10, 10, 10, 10, 10, 10, 10, 20],
        firstHit: 49,
        castTime: 0,
        offset: 0,
        base: 390,
        ignore: 50,
        damage: "magic",
        dualable: false
      }
    ],
    multiCasts: [
      {
        count: 2,
        abilities: [
          500590,
          704700
        ]
      }
    ],
    multipleBlack: 2,
  },
  {
    id: 31,
    names: {
      en: "Vaan",
      fr: "Vaan",
      tw: "梵恩",
      kr: "반",
      de: "Vaan",
      es: "Vaan"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Assault Strike",
          fr: "Violent assaut",
          tw: "突擊強襲",
          kr: "강습 타격",
          de: "Angriffsschlag",
          es: "Golpe asaltador"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8, 8],
        hitDamage: [2, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 22,
        castTime: 20,
        offset: 16,
        base: 270
      },
      {
        id: 2,
        names: {
          en: "Assault Strike +2",
          fr: "Violent assaut +2",
          tw: "突擊強襲 +2",
          kr: "강습 타격 +2",
          de: "Angriffsschlag +2",
          es: "Golpe asaltador +2"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8, 8],
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
      en: "Vargas",
      fr: "Vargas",
      tw: "瓦爾加斯",
      kr: "발가스",
      de: "Vargas",
      es: "Vargas"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Flare Ride+",
          fr: "Galop enflammé +",
          tw: "焰光斬·改",
          kr: "강화 플레어 라이드",
          de: "Flammenritt Plus",
          es: "Galope flamígero +"
        },
        framesList: [0, 10, 10, 10, 78],
        firstHit: 2,
        castTime: 0,
        offset: 66,
        base: 200
      },
      {
        id: 2,
        names: {
          en: "Supreme Blaze",
          fr: "Explosion suprême",
          tw: "霸神之爆炎",
          kr: "패신의 폭염",
          de: "Meisterlohe",
          es: "Ardor supremo"
        },
        type: "finish",
        framesList: [0],
        firstHit: 240,
        castTime: 40,
        offset: 16,
        base: 250,
        ignore: 50,
        elements : [
          "fire"
        ]
      }
    ]
  },
  {
    id: 33,
    names: {
      en: "Victoria",
      fr: "Victoria",
      tw: "維多利亞",
      kr: "빅토리아",
      de: "Victoria",
      es: "Victoria"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Overflow",
          fr: "Dépassement",
          tw: "溢出",
          kr: "범람",
          de: "Überfluss",
          es: "Derrame"
        },
        framesList: [0, 24, 24, 24, 24, 24, 24, 24, 24, 24],
        firstHit: 57,
        castTime: 40,
        offset: 16,
        base: 940,
        elements: [
          "dark"
        ],
        damage: "magic",
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Overflow +2",
          fr: "Dépassement +2",
          tw: "溢出 +2",
          kr: "범람 +2",
          de: "Überfluss +2",
          es: "Derrame +2"
        },
        framesList: [0, 24, 24, 24, 24, 24, 24, 24, 24, 24],
        firstHit: 57,
        castTime: 40,
        offset: 16,
        base: 1150,
        elements: [
          "dark"
        ],
        damage: "magic",
        dualable: false
      }
    ]
  },
  {
    id: 34,
    names: {
      en: "Zidane",
      fr: "Djidane",
      tw: "吉坦",
      kr: "지탄",
      de: "Zidane",
      es: "Yitán"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Free Energy",
          fr: "Energétik",
          tw: "能量解放",
          kr: "자유로운 힘",
          de: "Kostenlose Energie",
          es: "Energía libre"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8, 8],
        hitDamage: [12, 13, 12, 13, 12, 13, 12, 13],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 360
      },
      {
        id: 2,
        names: {
          en: "Free Energy +2",
          fr: "Energétik +2",
          tw: "能量解放 +2",
          kr: "자유로운 힘 +2",
          de: "Kostenlose Energie +2",
          es: "Energía libre +2"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8, 8],
        hitDamage: [12, 13, 12, 13, 12, 13, 12, 13],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 450
      },
      {
        id: 3,
        names: {
          en: "Lucky Seven",
          fr: "Coudepot",
          tw: "幸運7",
          kr: "럭키 세븐",
          de: "Glückssieben",
          es: "Súper 7"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8],
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
      en: "Onion Knight",
      fr: "Chevalier Oignon",
      tw: "洋蔥劍士",
      kr: "양파 검사",
      de: "Zwiebelritter",
      es: "Caballero Cebolla"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Splendor of the Wind",
          fr: "Splendeur du vent",
          tw: "風之光輝",
          kr: "바람의 인도",
          de: "Windpracht",
          es: "Esplendor de viento"
        },
        framesList: [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 380,
        elements: [
          "wind"
        ]
      },
      {
        id: 2,
        names: {
          en: "Splendor of the Fire",
          fr: "Splendeur du feu",
          tw: "火之光輝",
          kr: "불꽃의 인도",
          de: "Feuerpracht",
          es: "Esplendor de fuego"
        },
        framesList: [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 380,
        elements: [
          "fire"
        ]
      },
      {
        id: 3,
        names: {
          en: "Splendor of the Earth",
          fr: "Splendeur de la terre",
          tw: "土之光輝",
          kr: "땅의 인도",
          de: "Erdpracht",
          es: "Esplendor de tierra"
        },
        framesList: [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 380,
        elements: [
          "earth"
        ]
      },
      {
        id: 4,
        names: {
          en: "Splendor of the Water",
          fr: "Splendeur de l'eau",
          tw: "水之光輝",
          kr: "물의 인도",
          de: "Wasserpracht",
          es: "Esplendor de agua"
        },
        framesList: [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 380,
        elements: [
          "water"
        ]
      },
      {
        id: 5,
        names: {
          en: "Onion Slice",
          fr: "Tranche-oignon",
          tw: "洋蔥刺",
          kr: "양파 슬라이스",
          de: "Zwiebelschnitt",
          es: "Corte cebolla"
        },
        framesList: [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 400
      },
      {
        id: 6,
        names: {
          en: "Full Speed Bladeblitz",
          fr: "Lame éclair rapide",
          tw: "全速全斬",
          kr: "전속 전방위 베기",
          de: "Voller Klingenblitz",
          es: "Tormenta de acero"
        },
        framesList: [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 220
      },
      {
        id: 7,
        names: {
          en: "Twin Swords",
          fr: "Double épées",
          tw: "雙劍",
          kr: "트윈 소드",
          de: "Zwillingsschwerter",
          es: "Espadas gemelas"
        },
        framesList: [0, 4, 47, 4, 35, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20, 4],
        hitDamage: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10],
        firstHit: 68,
        castTime: 40,
        offset: 0,
        base: 800,
        dualable: false
      },
      {
        id: 8,
        names: {
          en: "Onion Cutter",
          fr: "Coupe-oignon",
          tw: "洋蔥斬",
          kr: "양파 칼날",
          de: "Zwiebelschneider",
          es: "Cortador cebolla"
        },
        framesList: [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
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
      en: "Fire Veritas",
      fr: "Veritas des Flammes",
      tw: "劫火之維利亞斯",
      kr: "지옥불의 베리어스",
      de: "Veritas der Flammende",
      es: "Veritas el llameante"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Heavy Stomp",
          fr: "Piétinement",
          tw: "沉重印章",
          kr: "무거운 발구르기",
          de: "Schwerer Stampfer",
          es: "Pisotón fuerte"
        },
        type: "finish",
        framesList: [0],
        firstHit: 90,
        castTime: 40,
        offset: 0,
        base: 250,
        ignore: 50
      },
      {
        id: 2,
        names: {
          en: "Full Charge Stomp",
          fr: "Piétinement maximum",
          tw: "超蓄力印章",
          kr: "전력 발구르기",
          de: "Voller Stampfer",
          es: "Pisotón total"
        },
        type: "finish",
        framesList: [0],
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
      en: "Queen",
      fr: "Queen",
      tw: "葵因",
      kr: "퀸",
      de: "Queen",
      es: "Queen"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Devastate +2",
          fr: "Dévastation +2",
          tw: "毀滅之劍",
          kr: "데바스테이트",
          de: "Verwüstung",
          es: "Devastador"
        },
        framesList: [0, 26, 10, 10, 30],
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
      en: "Prishe",
      fr: "Prishe",
      tw: "普利修",
      kr: "프리쉬",
      de: "Prishe",
      es: "Prishe"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Raging Fists",
          fr: "Poings de colère",
          tw: "乱擊",
          kr: "난격",
          de: "Fäuste des Zorns",
          es: "Puños de la ira"
        },
        framesList: [0, 5, 5, 5, 5, 5, 5, 5],
        hitDamage: [12, 12, 12, 12, 12, 12, 12, 16],
        firstHit: 2,
        castTime: 0,
        offset: 66,
        base: 350
      },
      {
        id: 2,
        names: {
          en: "Prishe Special",
          fr: "Spécialité de Prishe",
          tw: "普利修特技",
          kr: "프리쉬 스페셜",
          de: "Prishe-Spezial",
          es: "Especial de Prishe"
        },
        framesList: [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
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
      en: "Nyx",
      fr: "Nyx",
      tw: "尼克斯",
      kr: "닉스",
      de: "Nyx",
      es: "Nyx"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Kingsglaive",
          fr: "Glaive du roi",
          tw: "王之劍",
          kr: "왕의 검",
          de: "Königsgleve",
          es: "Glaive real"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8, 8],
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 82,
        castTime: 40,
        offset: 26,
        base: 200,
        ignore: 50,
        debuffs: [
          {
            type: "fire",
            value: 50
          }
        ]
      },
      {
        id: 2,
        names: {
          en: "Desperate Blow",
          fr: "Attaque désespérée",
          tw: "拼死一擊",
          kr: "필사의 일격",
          de: "Verzweiflungsschlag",
          es: "Golpe finiquitador"
        },
        type: "finish",
        framesList: [0],
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
      en: "Glauca",
      fr: "Glauca",
      tw: "格拉烏卡",
      kr: "글라우카",
      de: "Glauca",
      es: "Glauca"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Daybreak Darkness",
          fr: "Ténèbres de l'aube",
          tw: "拂曉之暗",
          kr: "새벽의 어둠",
          de: "Dunkler Sonnenaufgang",
          es: "Oscuridad del ocaso"
        },
        framesList: [0, 9, 9, 9, 9, 9, 9, 9],
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 102,
        castTime: 40,
        offset: 26,
        base: 200,
        ignore: 25,
        debuffs: [
          {
            type: "light",
            value: 50,
          },
          {
            type: "dark",
            value: 50,
          }
        ]
      }
    ]
  },
  {
    id: 41,
    names: {
      en: "Pod 153",
      fr: "Pod 153",
      tw: "輔助機１５３",
      kr: "포드 153",
      de: "Pod 153",
      es: "Pod 153"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "R020: Mirage",
          fr: "R020: Mirage",
          tw: "R020：幻象",
          kr: "R020: 미라쥬",
          de: "R020: Illusion",
          es: "R020: Espejismo"
        },
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
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
      en: "Generic Spells",
      fr: "Sorts génériques",
      tw: "通用法術",
      kr: "일반 주문",
      de: "Generieke spreuken",
      es: "Hechizos genéricos"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Meteor",
          fr: "Météore",
          tw: "隕石",
          kr: "메테오",
          de: "Meteo",
          es: "Meteo"
        },
        type: "finish",
        framesList: [0],
        firstHit: 350,
        castTime: 40,
        offset: 16,
        base: 250,
        ignore: 25,
        damage: "magic",
        magicType: "black",
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Meteor +2",
          fr: "Météore +2",
          tw: "隕石 +2",
          kr: "메테오 +2",
          de: "Meteo +2",
          es: "Meteo +2"
        },
        type: "finish",
        framesList: [0, 20, 20],
        hitDamage: [33, 33, 34],
        firstHit: 310,
        castTime: 40,
        offset: 16,
        base: 300,
        ignore: 25,
        damage: "magic",
        magicType: "black",
        dualable: false
      },
      {
        id: 3,
        names: {
          en: "Ultima",
          fr: "Ultima",
          tw: "究極",
          kr: "알테마",
          de: "Ultima",
          es: "Artema"
        },
        type: "finish",
        framesList: [0],
        firstHit: 365,
        castTime: 40,
        offset: 0,
        base: 280,
        ignore: 50,
        damage: "magic",
        magicType: "black",
        dualable: false
      },
      {
        id: 4,
        names: {
          en: "Stonja",
          fr: "Terre max",
          tw: "強落石",
          kr: "스톤쟈",
          de: "Terraka",
          es: "Piedra+++"
        },
        type: "finish",
        framesList: [0],
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: "magic",
        elements: [
          "earth"
        ],
        magicType: "black",
        dualable: false
      },
      {
        id: 5,
        names: {
          en: "Aeroja",
          fr: "Vent max",
          tw: "強勁風",
          kr: "에어로쟈",
          de: "Aeroka",
          es: "Aero+++"
        },
        type: "finish",
        framesList: [0],
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: "magic",
        elements: [
          "wind"
        ],
        magicType: "black",
        dualable: false
      },
      {
        id: 6,
        names: {
          en: "Waterja",
          fr: "Eau max",
          tw: "強流水",
          kr: "워터쟈",
          de: "Aquaka",
          es: "Aqua+++"
        },
        type: "finish",
        framesList: [0],
        firstHit: 190,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: "magic",
        elements: [
          "water"
        ],
        magicType: "black",
        dualable: false
      },
      {
        id: 7,
        names: {
          en: "Thundaja",
          fr: "Foudre max",
          tw: "強雷電",
          kr: "선더쟈",
          de: "Blitzka",
          es: "Electro+++"
        },
        type: "finish",
        framesList: [0],
        firstHit: 150,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: "magic",
        elements: [
          "lightning"
        ],
        magicType: "black",
        dualable: false
      },
      {
        id: 8,
        names: {
          en: "Blizzaja",
          fr: "Glace max",
          tw: "強暴雪",
          kr: "블리자쟈",
          de: "Eiska",
          es: "Hielo+++"
        },
        type: "finish",
        framesList: [0],
        firstHit: 240,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: "magic",
        elements: [
          "ice"
        ],
        magicType: "black",
        dualable: false
      },
      {
        id: 9,
        names: {
          en: "firaja",
          fr: "Feu max",
          tw: "強火焰",
          kr: "파이자",
          de: "Feuka",
          es: "Piro+++"
        },
        type: "finish",
        framesList: [0],
        firstHit: 210,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: "magic",
        elements: [
          "fire"
        ],
        magicType: "black",
        dualable: false
      },
      {
        id: 10,
        names: {
          en: "Chainsaw",
          fr: "回轉電鋸",
          tw: "회전톱",
          kr: "Tronçonneuse",
          de: "Kettensäge",
          es: "Motosierra"
        },
        framesList: [0, 8, 8, 8, 8, 8, 16],
        hitDamage: [14, 14, 15, 14, 14, 15, 14],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 140,
        ignore: 25
      },
      {
        id: 11,
        names: {
          en: "Comet",
          fr: "Comète",
          tw: "彗星",
          kr: "코멧",
          de: "Komet",
          es: "Cometa"
        },
        type: "finish",
        framesList: [0],
        firstHit: 120,
        castTime: 40,
        offset: 16,
        base: 190,
        damage: "magic",
        magicType: "black",
        dualable: false
      },
      {
        id: 10210,
        names: {
          en: "Holy",
          tw: "神聖",
          kr: "홀리",
          fr: "Sidéral",
          de: "Sanctus",
          es: "Sanctus"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: "white",
        elements: [
          "light"
        ],
        debuffs: [],
        dualable: false,
        firstHit: 450,
        framesList: [0],
        offset: 16,
        base: 230,
        type: "finish"
      },
    ],
    multipleBlack: 2,
    multipleWhite: 2
  },
  {
    id: 43,
    names: {
      en: "Chic Ariana",
      fr: "Ariana chic",
      tw: "時尚亞莉安娜",
      kr: "시크 아리아나",
      de: "Schicke Ariana",
      es: "Ariana chic"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Alluring Chorus",
          fr: "Chœur envoûtant",
          tw: "魅惑合唱",
          kr: "매혹적인 코러스",
          de: "Verführerischer Refrain",
          es: "Coro seductor"
        },
        framesList: [0, 7, 7, 8, 8, 16, 8],
        hitDamage: [10, 15, 15, 15, 15, 15, 15],
        firstHit: 139,
        castTime: 0,
        offset: 56,
        base: 280,
        ignore: 25,
        damage: "magic",
        dualable: false
      }
    ]
  },
  {
    id: 44,
    names: {
      en: "Eve",
      fr: "Ève",
      tw: "夏娃",
      kr: "이브",
      de: "Eva",
      es: "Eva"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Roundhouse Kick",
          fr: "Coup de pied retourné",
          tw: "迴旋踢",
          kr: "돌려차기",
          de: "Roundhouse-Kick",
          es: "Patada giratoria"
        },
        type: "finish",
        framesList: [0],
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
      en: "Adam",
      fr: "Adam",
      tw: "亞當",
      kr: "아담",
      de: "Adam",
      es: "Adán"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Cube Explosion - Large",
          fr: "Explosion cubique - Grande",
          tw: "立方爆破・大",
          kr: "큐브 파괴·대",
          de: "Würfelexplosion - Groß",
          es: "Explosión cúbica - Grande"
        },
        type: "finish",
        framesList: [0],
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
      en: "Kelsus",
      fr: "Kelsus",
      tw: "凱爾蘇斯",
      kr: "켈서스",
      de: "Kelsus",
      es: "Kelsus"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Crushing Vice",
          fr: "Vice écrasant",
          tw: "雙臂重擊",
          kr: "바이스 크러쉬",
          de: "Schraubstock",
          es: "Aplastador vicioso"
        },
        type: "finish",
        framesList: [0],
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
      en: "Maxwell",
      fr: "Maxwell",
      tw: "麥斯威爾",
      kr: "막스웰",
      de: "Maxwell",
      es: "Maxwell"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Destiny",
          fr: "Destinée",
          tw: "命運",
          kr: "데스티니",
          de: "Schicksal",
          es: "Destino"
        },
        type: "finish",
        framesList: [0],
        firstHit: 102,
        castTime: 40,
        offset: 0,
        base: 200,
        ignore: 50,
        elements : [
          "light"
        ]
      }
    ]
  },
  {
    id: 49,
    names: {
      en: "Black Cat Lid",
      fr: "Chatte noire Lid",
      tw: "黑貓里德",
      kr: "검은 고양이 리드",
      de: "Schwarze Katze Lid",
      es: "Lid minina negra"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Ultimate Blow",
          fr: "Souffle ultime",
          tw: "究極一擊",
          kr: "궁극의  강타",
          de: "Ultimativer Schlag",
          es: "Golpe supremo"
        },
        type: "finish",
        framesList: [0],
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
      en: "Helena",
      fr: "Helena",
      tw: "海倫娜",
      kr: "헬레나",
      de: "Helena",
      es: "Helena"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Best Shot",
          fr: "Superbe tir",
          tw: "準確射擊",
          kr: "최고의 사격",
          de: "Bester Schuss",
          es: "Tiro superbio"
        },
        type: "finish",
        framesList: [0],
        firstHit: 100,
        castTime: 40,
        offset: 16,
        base: 450
      },
      {
        id: 2,
        names: {
          en: "Best Shot +2",
          fr: "Superbe tir +2",
          tw: "準確射擊 +2",
          kr: "최고의 사격 +2",
          de: "Bester Schuss +2",
          es: "Tiro superbio +2"
        },
        type: "finish",
        framesList: [0],
        firstHit: 100,
        castTime: 40,
        offset: 16,
        base: 555
      }
    ]
  },
  {
    id: 51,
    names: {
      en: "Zargabaath",
      fr: "Zargabaath",
      tw: "查格博斯",
      kr: "자르가바스",
      de: "Zargabaath",
      es: "Zargabaath"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Word of Law",
          fr: "Mot de la loi",
          tw: "法令",
          kr: "법전의 말씀",
          de: "Wort des Gesetzes",
          es: "Palabra de ley"
        },
        type: "finish",
        framesList: [0],
        firstHit: 270,
        castTime: 40,
        offset: 16,
        base: 300,
        ignore: 50,
        elements: [
          "light"
        ],
        dualable: false,
        damage: "magic"
      },
      {
        id: 911175,
        names: {
          en: "Word of Law +2",
          tw: "法令 +2",
          kr: "법전의 말씀 +2",
          fr: "Mot de la loi +2",
          de: "Wort des Gesetzes +2",
          es: "Palabra de ley +2"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: null,
        elements: [
          "light"
        ],
        debuffs: [],
        dualable: false,
        firstHit: 270,
        framesList: [0],
        offset: 16,
        base: 300,
        ignore: 50,
        type: "finish"
      }
    ]
  },
  {
    id: 52,
    names: {
      en: "Luneth",
      fr: "Luneth",
      tw: "路涅斯",
      kr: "루네스",
      de: "Luneth",
      es: "Luneth"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Cut Through +2",
          fr: "Trancher +2",
          tw: "斬殺 +2",
          kr: "깊이 베기 +2",
          de: "Dreindreschen +2",
          es: "Descuartizar +2"
        },
        type: "finish",
        framesList: [0],
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
      en: "Grace",
      fr: "Grace",
      tw: "格蕾斯",
      kr: "그레이스",
      de: "Grace",
      es: "Grace"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Destroy Arm +2",
          fr: "Détruire arme +2",
          tw: "毀滅臂鎧",
          kr: "파괴의 무기",
          de: "Armzerstörer",
          es: "Destruir arma"
        },
        type: "finish",
        framesList: [0],
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
      en: "Rem",
      fr: "Rem",
      tw: "蕾姆",
      kr: "렘",
      de: "Rem",
      es: "Rem"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Dagger Boomerang (Max)",
          fr: "Dague boomerang (Max)",
          tw: "迴旋匕首 (Max)",
          kr: "부메랑 대거 (Max)",
          de: "Dolchbumerang (Max)",
          es: "Dagas bumerán (Max)"
        },
        type: "finish",
        damage: "magic",
        framesList: [0],
        firstHit: 120,
        castTime: 40,
        offset: 0,
        base: 620
      },
      {
        id: 2,
        names: {
          en: "Dagger Boomerang +2 (Max)",
          fr: "Dague boomerang +2 (Max)",
          tw: "迴旋匕首 +2 (Max)",
          kr: "부메랑 대거 +2 (Max)",
          de: "Dolchbumerang +2 (Max)",
          es: "Dagas bumerán +2 (Max)"
        },
        type: "finish",
        damage: "magic",
        framesList: [0],
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
      en: "Zyrus",
      fr: "Zyrus",
      tw: "扎拉斯",
      kr: "자이러스",
      de: "Zyrus",
      es: "Zyrus"
    },
    abilities: [
      {
        id: 910225,
        names: {
          en: "Blood Pulsar",
          fr: "Pulsar de sang",
          tw: "血色脈衝",
          kr: "피의 펄서",
          de: "Blutpulsar",
          es: "Pulso sangriento"
        },
        type: "finish",
        framesList: [0],
        firstHit: 130,
        castTime: 30,
        offset: 16,
        base: 650,
        damage: "magic",
        dualable: false
      },
      {
        id: 910228,
        names: {
          en: "Blood Rend",
          fr: "Déchirure sanglante",
          tw: "血色撕裂",
          kr: "피의 열파",
          de: "Blutriss",
          es: "Hemorragia sangrienta"
        },
        type: "finish",
        framesList: [0],
        firstHit: 90,
        castTime: 30,
        offset: 16,
        base: 500,
        elements: [
          "water"
        ],
        damage: "magic",
        dualable: false
      },
      {
        id: 401001806,
        names: {
          en: "Blood Hydra",
          tw: "赤血九頭龍",
          kr: "피의 히드라",
          fr: "Hydre sanglante",
          de: "Bluthydra",
          es: "Hidra sangrienta"
        },
        type: "finish",
        framesList: [0],
        firstHit: 215,
        castTime: 45,
        offset: 0,
        base: 740,
        elements: [
          "water"
        ],
        damage: "magic",
        dualable: false
      },
      {
        id: 911033,
        names: {
          en: "Blood Rend +2",
          tw: "血色撕裂 +2",
          kr: "피의 열파 +2",
          fr: "Déchirure sanglante +2",
          de: "Blutriss +2",
          es: "Hemorragia sangrienta +2"
        },
        hitDamage: [
          100
        ],
        castTime: 30,
        damage: "magic",
        magicType: null,
        elements: [
          "water"
        ],
        debuffs: [],
        dualable: false,
        firstHit: 90,
        framesList: [0],
        offset: 16,
        base: 750,
        type: "finish"
      },
      {
        id: 911050,
        names: {
          en: "Blood Pulsar +2",
          tw: "血色脈衝 +2",
          kr: "피의 펄서 +2",
          fr: "Pulsar de sang +2",
          de: "Blutpulsar +2",
          es: "Pulso sangriento +2"
        },
        hitDamage: [
          100
        ],
        castTime: 30,
        damage: "magic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 130,
        framesList: [0],
        offset: 16,
        base: 1050,
        type: "finish"
      }
    ],
    multiCasts: [
      {
        count: 2,
        abilities: [
          910225,
          910228,
          911033,
          911050
        ]
      }
    ]
  },
  {
    id: 56,
    names: {
      en: "Shine",
      fr: "Shine",
      tw: "夏因",
      kr: "샤인",
      de: "Shine",
      es: "Shine"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Into Darkness",
          fr: "Obscurité sans fin",
          tw: "黑暗降臨",
          kr: "어둠 속으로",
          de: "Ins Dunkel",
          es: "Oscuridad profunda"
        },
        type: "finish",
        framesList: [0],
        firstHit: 23,
        castTime: 0,
        offset: 40,
        base: 420,
        elements: [
          "dark"
        ]
      }
    ]
  },
  {
    id: 57,
    names: {
      en: "Olive",
      fr: "Olive",
      tw: "奧利芙",
      kr: "올리브",
      de: "Olive",
      es: "Olivia"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "True Shot",
          fr: "Tir sérieux",
          tw: "精準射擊",
          kr: "진실의 포탄",
          de: "Wahrer Schuss",
          es: "Disparo verdadero"
        },
        type: "finish",
        framesList: [0],
        firstHit: 100,
        castTime: 20,
        offset: 26,
        base: 240,
        ignore: 50
      },
      {
        id: 2,
        names: {
          en: "True Shot +2",
          fr: "Tir sérieux +2",
          tw: "精準射擊 +2",
          kr: "진실의 포탄 +2",
          de: "Wahrer Schuss +2",
          es: "Disparo verdadero +2"
        },
        type: "finish",
        framesList: [0],
        firstHit: 100,
        castTime: 20,
        offset: 26,
        base: 350,
        ignore: 50
      }
    ],
    dual: false
  },
  {
    id: 58,
    names: {
      en: "Emperor",
      fr: "Empereur",
      tw: "皇帝",
      kr: "황제",
      de: "Imperator",
      es: "Emperador"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Starfall",
          fr: "Météorite",
          tw: "隕星",
          kr: "운석",
          de: "Sternenbruch",
          es: "Meteorito"
        },
        type: "finish",
        framesList: [0],
        firstHit: 350,
        castTime: 40,
        offset: 0,
        base: 230,
        ignore: 50,
        damage: "magic",
        dualable: false,
      },
      {
        id: 2,
        names: {
          en: "Fire From Below",
          fr: "Feu de l'Enfer",
          tw: "地獄業火",
          kr: "지옥의 업화",
          de: "Feuer von unten",
          es: "Fuego del averno"
        },
        type: "finish",
        framesList: [0],
        firstHit: 80,
        castTime: 40,
        offset: 0,
        base: 2000,
        damage: "magic",
        elements : [
          "fire"
        ],
        dualable: false,
      },
      {
        id: 3,
        names: {
          en: "Fire From Below +2",
          fr: "Feu de l'Enfer +2",
          tw: "地獄業火 +2",
          kr: "지옥의 업화 +2",
          de: "Feuer von unten +2",
          es: "Fuego del averno +2"
        },
        type: "finish",
        framesList: [0],
        firstHit: 80,
        castTime: 40,
        offset: 0,
        base: 2500,
        damage: "magic",
        elements : [
          "fire"
        ],
        debuffs: [
          {
            type: "fire",
            value: 50
          }
        ],
        dualable: false,
      }
    ]
  },
  {
    id: 59,
    names: {
      en: "Dark Knight Cecil",
      fr: "Cécil chevevalier noir",
      tw: "暗黑騎士塞西爾",
      kr: "암흑기사 세실",
      de: "Dunkelritter Cecil",
      es: "Cecil oscuro"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Soul Eater +2",
          fr: "Mangeur d'âme +2",
          tw: "噬魂 +2",
          kr: "영혼 포식자 +2",
          de: "Seelenfresser +2",
          es: "Devora almas +2"
        },
        type: "finish",
        framesList: [0],
        firstHit: 20,
        castTime: 0,
        offset: 40,
        base: 750,
        elements: [
          "dark"
        ],
        debuffs: [
          {
            type: "dark",
            value: 100
          }
        ]
      }
    ]
  },
  {
    id: 60,
    names: {
      en: "Gaffgarion",
      fr: "Gaffgarion",
      tw: "加夫加利安",
      kr: "가프가리온",
      de: "Gaffgarion",
      es: "Gaffgarion"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Abyssal Blade +2",
          fr: "Lame abyssale +2",
          tw: "罪惡斬",
          kr: "악마의 검",
          de: "Abyssklinge",
          es: "Hoja abisal"
        },
        type: "finish",
        framesList: [0],
        firstHit: 120,
        castTime: 40,
        offset: 0,
        base: 750,
        elements: [
          "dark"
        ]
      }
    ]
  },
  {
    id: 61,
    names: {
      en: "Kefka",
      fr: "Kefka",
      tw: "凱夫卡",
      kr: "케프카",
      de: "Kefka",
      es: "Kefka"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Light of Judgment +2",
          fr: "Lumière du jugement +2",
          tw: "制裁之光",
          kr: "심판의 빛",
          de: "Licht des Urteils",
          es: "Luz de juicio"
        },
        type: "finish",
        framesList: [0],
        firstHit: 110,
        castTime: 40,
        offset: 0,
        base: 280,
        ignore: 50,
        dualable: false,
        damage: "magic"
      }
    ]
  },
  {
    id: 62,
    names: {
      en: "Bartz",
      fr: "Bartz",
      tw: "巴茲",
      kr: "버츠",
      de: "Bartz",
      es: "Bartz"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Wind Shear +2",
          fr: "Tranche-vent +2",
          tw: "旋風斬",
          kr: "선풍참",
          de: "Windschneide",
          es: "Tajo de viento"
        },
        type: "finish",
        framesList: [0],
        firstHit: 70,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: "hybrid"
      }
    ]
  },
  {
    id: 63,
    names: {
      en: "Goken",
      fr: "Goken",
      tw: "剛健",
      kr: "고우켄",
      de: "Goken",
      es: "Goken"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Firm Punch",
          fr: "Poing ferme",
          tw: "剛拳",
          kr: "강권",
          de: "Solider Schlag",
          es: "Puñetazo firme"
        },
        framesList: [0, 10, 10, 10, 10, 10],
        hitDamage: [16, 16, 17, 17, 17, 17],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 300
      },
      {
        id: 2,
        names: {
          en: "Light Kick",
          fr: "Coup de pied léger",
          tw: "柔腳",
          kr: "유격",
          de: "Weicher Tritt",
          es: "Patada suave"
        },
        framesList: [0, 10, 10, 10, 10, 10],
        hitDamage: [16, 16, 17, 17, 17, 17],
        firstHit: 50,
        castTime: 40,
        offset: 16,
        base: 200
      },
      {
        id: 3,
        names: {
          en: "Wolfclaw Fist",
          fr: "Poings croc-de-loup",
          tw: "狼剛拳",
          kr: "늑대의 강권",
          de: "Wolfsklauenfaust",
          es: "Puño garra de lobo"
        },
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 500
      },
      {
        id: 4,
        names: {
          en: "Falcon Kick",
          fr: "Coup de pied du Faucon",
          tw: "鷹柔腳",
          kr: "매의 유격",
          de: "Falkentritt",
          es: "Patada halcón"
        },
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 300
      },
      {
        id: 5,
        names: {
          en: "Tigerclaw Fist",
          fr: "Poings croc-de-tigre",
          tw: "虎剛拳",
          kr: "호랑이의 강권",
          de: "Tigerklauenfaust",
          es: "Puño garra de tigre"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 600
      },
      {
        id: 6,
        names: {
          en: "Dragon Kick",
          fr: "Coup de pied du Dragon",
          tw: "龍柔腳",
          kr: "용의 유격",
          de: "Drachentritt",
          es: "Patada dragón"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 400
      },
      {
        id: 7,
        names: {
          en: "Fist Supreme",
          fr: "Coup de poings ultime",
          tw: "豪覇瞬烈拳",
          kr: "호패순열권",
          de: "Stärkste Faust",
          es: "Puño supremo"
        },
        framesList: [0, 7, 9, 7, 9, 7, 9, 9, 5, 5],
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
      en: "Toxic Rain",
      fr: "Pluie toxique",
      tw: "暴風酸性雨",
      kr: "산성 폭풍우",
      de: "Giftregen",
      es: "Lluvia tóxica"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Toxic Rain",
          fr: "Pluie toxique",
          tw: "暴風酸性雨",
          kr: "산성 폭풍우",
          de: "Giftregen",
          es: "Lluvia tóxica"
        },
        framesList: [0, 10, 10, 10, 10, 10, 10],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        firstHit: 50,
        castTime: 40,
        offset: 16,
        base: 180,
        ignore: 25,
        damage: "magic",
        dualable: false
      }
    ]
  },
  {
    id: 65,
    names: {
      en: "Alterna",
      fr: "Alternance",
      tw: "吸收",
      kr: "얼터너",
      de: "Alterna",
      es: "Versus"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Alterna",
          fr: "Alternance",
          tw: "吸收",
          kr: "얼터너",
          de: "Alterna",
          es: "Versus"
        },
        type: "finish",
        framesList: [0],
        firstHit: 365,
        castTime: 40,
        offset: 16,
        base: 510,
        ignore: 25,
        damage: "magic",
        dualable: false,
        magicType: "black"
      }
    ],
    multipleBlack: 2
  },
  {
    id: 66,
    names: {
      en: "Grim Lord Sakura",
      fr: "Sakura, Seigneur Sombre",
      tw: "冷血貴族櫻",
      kr: "사신 사쿠라",
      de: "Grimmige Herrin Sakura",
      es: "Sakura la parca"
    },
    abilities: [
      {
        id: 910520,
        names: {
          en: "Grim - Soul Barrage",
          fr: "Obscurité - Barrage spectral",
          tw: "冷血 - 靈魂彈幕",
          kr: "사신·영혼 난사",
          de: "Grimm - Seelensperre",
          es: "Parca - Ráfaga de alma"
        },
        framesList: [0, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        hitDamage: [5, 5, 5, 7, 7, 8, 9, 9, 10, 35],
        firstHit: 62,
        castTime: 30,
        offset: 26,
        base: 200,
        ignore: 50,
        damage: "magic",
        dualable: false
      },
      {
        id: 910526,
        names: {
          en: "Grim - Eldritch Flames",
          fr: "Obscurité - Flammes surnaturelles",
          tw: "冷血 - 鬼火",
          kr: "사신·오싹한 불꽃",
          de: "Grimm - Unirdische Flammen",
          es: "Parca - Llama de Eldritch"
        },
        framesList: [0, 10, 10, 10, 10],
        hitDamage: [10, 10, 15, 15, 50],
        firstHit: 110,
        castTime: 0,
        offset: 56,
        base: 300,
        damage: "magic",
        elements : [
          "dark",
          "fire"
        ],
        debuffs : [
          {
            type: "dark",
            value: 50
          },
          {
            type: "fire",
            value: 50
          }
        ],
        dualable: false
      },
      {
        id: 20310,
        names: {
          en: "Thundaja",
          tw: "強雷電",
          kr: "선더쟈",
          fr: "Foudre max",
          de: "Blitzka",
          es: "Electro+++"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "lightning"
        ],
        debuffs: [],
        dualable: false,
        firstHit: 150,
        framesList: [0],
        offset: 16,
        base: 600,
        type: "finish"
      },
      {
        id: 401002006,
        names: {
          en: "Phantom Fury",
          fr: "Furie fantomatique",
          tw: "狂怒幻影",
          kr: "유령의 진노",
          de: "Phantomwut",
          es: "Furia fantasma"
        },
        framesList: [0, 4, 4, 4, 4, 4, 4, 4, 30],
        hitDamage: [5, 7, 8, 9, 10, 11, 12, 13, 25],
        firstHit: 62,
        castTime: 60,
        offset: 0,
        base: 660,
        damage: "magic",
        dualable: false
      },
    ],
    multiCasts: [
      {
        count: 2,
        abilities: [
          910520,
          910526
        ]
      }
    ],
    multipleBlack: 2,
    multipleWhite: 1,
    multipleGreen: 1
  },
  {
    id: 67,
    names: {
      en: "Pirate Jake",
      fr: "Jake, Pirate",
      tw: "海盜傑科",
      kr: "해적 제이크",
      de: "Piraten-Jake",
      es: "Jake pirata"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Feed the Fishes",
          fr: "Nourrissez les poissons",
          tw: "餵魚",
          kr: "물고기 밥",
          de: "Macht sie zu Fischfutter!",
          es: "Echadlo a los peces"
        },
        framesList: [0, 5, 5, 5, 5, 5],
        hitDamage: [16, 16, 16, 17, 17, 18],
        firstHit: 22,
        castTime: 20,
        offset: 14,
        base: 350,
        debuffs: [
          {
            type: "water",
            value: 50
          }
        ]
      },
      {
        id: 2,
        names: {
          en: "Unleash the Kraken",
          fr: "Relâchez le Kraken",
          tw: "釋放克拉肯!",
          kr: "크라켄을 풀어라!",
          de: "Befreit den Kraken",
          es: "Soltad al Kraken"
        },
        framesList: [0, 10, 10, 10, 35, 10, 10, 10],
        hitDamage: [10, 10, 12, 12, 13, 13, 15, 15],
        firstHit: 62,
        castTime: 0,
        offset: 0,
        base: 570,
        dualable: false,
        elements: [
          "water"
        ],
        debuffs: [
          {
            type: "water",
            value: 74
          }
        ]
      },
    ],
  },
  {
    id: 68,
    names: {
      en: "Illusionist Nichol",
      fr: "Nichol, Illusionniste",
      tw: "幻術師尼科爾",
      kr: "마술사 니콜",
      de: "Illusionist Nichol",
      es: "Nichol ilusionista"
    },
    abilities: [
      {
        id: 910537,
        names: {
          en: "Illusion - Phantasmal Forces",
          fr: "Illusion - Forces fantasmagorique",
          tw: "幻術 - 幻影力量",
          kr: "마술·환영의 위력",
          de: "Illusion - Phantasmagorische Kräfte",
          es: "Ilusión - Fuerzas fantasmales"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        firstHit: 50,
        castTime: 20,
        offset: 16,
        base: 600,
        damage: "magic",
        dualable: false,
      }
    ],
    multiCasts: [
      {
        count: 2,
        abilities: [
          910537
        ]
      }
    ]
  },
  {
    id: 69,
    names: {
      en: "Siren",
      fr: "Sirène",
      tw: "塞壬",
      kr: "세이렌",
      de: "Sirene",
      es: "Sirena"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Lunatic Voice (2)",
          fr: "Voix ensorcelante (2)",
          tw: "狂迷之聲 (2)",
          kr: "광기의 노래 (2)",
          de: "Wahnstimme (2)",
          es: "Voz lunática (2)"
        },
        type: "finish",
        framesList: [0],
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 12000,
        damage: "magic",
        elements: [
          "water"
        ],
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Lunatic Voice (3)",
          fr: "Voix ensorcelante (3)",
          tw: "狂迷之聲 (3)",
          kr: "광기의 노래 (3)",
          de: "Wahnstimme (3)",
          es: "Voz lunática (3)"
        },
        type: "finish",
        framesList: [0],
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 21000,
        damage: "magic",
        elements: [
          "water"
        ],
        dualable: false
      }
    ]
  },
  {
    id: 70,
    names: {
      en: "Ifrit",
      fr: "Ifrit",
      tw: "伊弗利特",
      kr: "이프리트",
      de: "Ifrit",
      es: "Ifrit"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Hellfire (2)",
          fr: "Flammes de l'enfer (2)",
          tw: "地獄火焰 (2)",
          kr: "지옥의 화염 (2)",
          de: "Inferno (2)",
          es: "Fuego infernal (2)"
        },
        type: "finish",
        framesList: [0],
        firstHit: 110,
        castTime: 40,
        offset: 0,
        base: 14000,
        damage: "physic",
        elements: [
          "fire"
        ],
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Hellfire (3)",
          fr: "Flammes de l'enfer (3)",
          tw: "地獄火焰 (3)",
          kr: "지옥의 화염 (3)",
          de: "Inferno (3)",
          es: "Fuego infernal (3)"
        },
        type: "finish",
        framesList: [0],
        firstHit: 110,
        castTime: 40,
        offset: 0,
        base: 23500,
        damage: "physic",
        elements: [
          "fire"
        ],
        dualable: false
      }
    ]
  },
  {
    id: 71,
    names: {
      en: "Shiva",
      fr: "Shiva",
      tw: "濕婆",
      kr: "시바",
      de: "Shiva",
      es: "Shiva"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Diamond Dust (2)",
          fr: "Poussière de diamant (2)",
          tw: "鑽石星塵 (2)",
          kr: "다이아몬드 더스트 (2)",
          de: "Diamantstaub (2)",
          es: "Polvo de diamantes (2)"
        },
        type: "finish",
        framesList: [0],
        firstHit: 110,
        castTime: 40,
        offset: 0,
        base: 14000,
        damage: "magic",
        elements: [
          "ice"
        ],
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Diamond Dust (3)",
          fr: "Poussière de diamant (3)",
          tw: "鑽石星塵 (3)",
          kr: "다이아몬드 더스트 (3)",
          de: "Diamantstaub (3)",
          es: "Polvo de diamantes (3)"
        },
        type: "finish",
        framesList: [0],
        firstHit: 110,
        castTime: 40,
        offset: 0,
        base: 19000,
        damage: "magic",
        elements: [
          "ice"
        ],
        dualable: false
      }
    ]
  },
  {
    id: 72,
    names: {
      en: "Diabolos",
      fr: "Diabolos",
      tw: "迪亞波羅斯",
      kr: "디아볼로스",
      de: "Diabolos",
      es: "Diablo"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Dark Messenger (2)",
          fr: "Héraut ténébreux (2)",
          tw: "黑暗使者 (2)",
          kr: "어둠에서 온 사자 (2)",
          de: "Dunkler Bote (2)",
          es: "Emisario de la noche (2)"
        },
        type: "finish",
        framesList: [0],
        firstHit: 190,
        castTime: 40,
        offset: 0,
        base: 17000,
        damage: "magic",
        elements: [
          "dark"
        ],
        dualable: false
      }
    ]
  },
  {
    id: 73,
    names: {
      en: "Ramuh",
      fr: "Ramuh",
      tw: "拉姆",
      kr: "라무",
      de: "Ramuh",
      es: "Lamú"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Judgment Bolt (2)",
          fr: "Foudre du jugement (2)",
          tw: "制裁之雷 (2)",
          kr: "심판의 벼락 (2)",
          de: "Ionenschlag (2)",
          es: "Rayos de justicia (2)"
        },
        type: "finish",
        framesList: [0],
        firstHit: 110,
        castTime: 40,
        offset: 0,
        base: 14000,
        damage: "magic",
        elements: [
          "lightning"
        ],
        dualable: false
      },
      {
        id: 3,
        names: {
          en: "Judgment Bolt (3)",
          fr: "Foudre du jugement (3)",
          tw: "制裁之雷 (3)",
          kr: "심판의 벼락 (3)",
          de: "Ionenschlag (3)",
          es: "Rayos de justicia (3)"
        },
        type: "finish",
        framesList: [0],
        firstHit: 110,
        castTime: 40,
        offset: 0,
        base: 21000,
        damage: "magic",
        elements: [
          "lightning"
        ],
        dualable: false
      }
    ]
  },
  {
    id: 74,
    names: {
      en: "Titan",
      fr: "Titan",
      tw: "泰坦",
      kr: "타이탄",
      de: "Titan",
      es: "Titán"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Gaia's Wrath (2)",
          fr: "Colère de Gaïa (2)",
          tw: "大地之怒 (2)",
          kr: "대지의 분노 (2)",
          de: "Gaias Wut (2)",
          es: "Ira de la tierra (2)"
        },
        type: "finish",
        framesList: [0],
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 17000,
        damage: "physic",
        elements: [
          "earth"
        ],
        dualable: false
      }
    ]
  },
  {
    id: 75,
    names: {
      en: "Tetra Sylphid",
      fr: "Tétra-Sylphides",
      tw: "四方風精靈",
      kr: "테트라 실피드",
      de: "Tetra Sylphid",
      es: "Tetra Sílfide"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Heavenswind (2)",
          fr: "Vent céleste (2)",
          tw: "四天之風 (2)",
          kr: "사천의 바람 (2)",
          de: "Himmelswind (2)",
          es: "Viento celestial (2)"
        },
        type: "finish",
        framesList: [0],
        firstHit: 190,
        castTime: 40,
        offset: 0,
        base: 18000,
        damage: "magic",
        elements: [
          "wind"
        ],
        dualable: false
      }
    ]
  },
  {
    id: 76,
    names: {
      en: "Odin",
      fr: "Odin",
      tw: "奧汀",
      kr: "오딘",
      de: "Odin",
      es: "Odín"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Gungnir (2)",
          fr: "Gungnir (2)",
          tw: "奧汀神槍 (2)",
          kr: "궁니르 (2)",
          de: "Gungnir (2)",
          es: "Gungnir (2)"
        },
        type: "finish",
        framesList: [0],
        firstHit: 70,
        castTime: 40,
        offset: 0,
        base: 20000,
        damage: "physic",
        dualable: false
      }
    ]
  },
  {
    id: 77,
    names: {
      en: "Bahamut",
      fr: "Bahamut",
      tw: "巴哈姆特",
      kr: "바하무트",
      de: "Bahamut",
      es: "Bahamut"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Megaflare (1)",
          fr: "MégaBrasier (1)",
          tw: "百萬核爆 (1)",
          kr: "메가플레어 (1)",
          de: "Megaflamme (1)",
          es: "Megafulgor (1)"
        },
        type: "finish",
        framesList: [0],
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 30000,
        damage: "magic",
        dualable: false
      }
    ]
  },
  {
    id: 78,
    names: {
      en: "Loren",
      fr: "Loren",
      tw: "洛倫",
      kr: "로렌",
      de: "Loren",
      es: "Loren"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Swiftwind Blade",
          fr: "Lame oscillante",
          tw: "疾風之劍",
          kr: "질풍의 검",
          de: "Sturmwindklinge",
          es: "Cuchilla veloz"
        },
        framesList: [0, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        firstHit: 2,
        castTime: 0,
        offset: 66,
        base: 450,
        elements: [
          "wind"
        ],
      },
      {
        id: 2,
        names: {
          en: "Greased Lightning",
          fr: "Éclair supersonique",
          tw: "疾風迅雷",
          kr: "질풍신뢰",
          de: "Geölter Blitz",
          es: "Tormenta huracanada"
        },
        framesList: [0, 7, 7, 7, 7, 7, 7, 7],
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 2,
        castTime: 0,
        offset: 26,
        base: 250,
        ignore: 50,
      },
      {
        id: 3,
        names: {
          en: "Blade Prison",
          fr: "Prison de lames",
          tw: "劍獄",
          kr: "검의 감옥",
          de: "Klingengefängnis",
          es: "Prisión de cuchillas"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        firstHit: 42,
        castTime: 40,
        offset: 17,
        base: 400
      },
      {
        id: 4,
        names: {
          en: "Quickbolt Blade",
          fr: "Lame flashfoudre",
          tw: "迅雷之劍",
          kr: "신뢰의 검",
          de: "Donnerschlagklinge",
          es: "Cuchilla centella"
        },
        type: "finish",
        framesList: [0],
        firstHit: 50,
        castTime: 0,
        offset: 40,
        base: 225,
        ignore: 50,
        elements: [
          "lightning"
        ],
      },
      {
        id: 5,
        names: {
          en: "Kingdom's Order",
          fr: "Ordre royal",
          tw: "王國秩序",
          kr: "왕국의 질서",
          de: "Königlicher Befehl",
          es: "Orden del reino"
        },
        framesList: [0, 10, 13, 14, 14, 10, 13, 14, 24, 12, 34, 18, 18, 18, 16],
        hitDamage: [3, 3, 3, 3, 3, 3, 3, 3, 3, 12, 12, 12, 12, 12, 13],
        firstHit: 34,
        castTime: 0,
        offset: 0,
        base: 420,
        ignore: 50,
        debuffs: [
          {
            type: "wind",
            value: 74
          }
        ],
        dualable: false
      },
    ],
  },
  {
    id: 79,
    names: {
      en: "Barbariccia",
      tw: "巴爾巴莉希亞",
      kr: "발바리시아",
      fr: "Barbariccia",
      de: "Barbarizia",
      es: "Barbariccia"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Tornado",
          fr: "Tornade",
          tw: "龍捲風",
          kr: "토네이도",
          de: "Tornado",
          es: "Tornado"
        },
        framesList: [0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 212,
        castTime: 40,
        offset: 16,
        base: 250,
        elements: [
          "wind"
        ],
        debuffs: [
          {
            type: "wind",
            value: 50
          }
        ],
        damage: "magic",
        magicType: "black",
        dualable: false
      },
      {
        id: 20330,
        names: {
          en: "Aeroja",
          tw: "強勁風",
          kr: "에어로쟈",
          fr: "Vent max",
          de: "Aeroka",
          es: "Aero+++"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "wind"
        ],
        debuffs: [],
        dualable: false,
        firstHit: 170,
        framesList: [0],
        offset: 16,
        base: 600,
        type: "finish"
      },
      {
        id: 2,
        names: {
          en: "Sunder",
          fr: "Bourrasque électrique",
          tw: "斬斷",
          kr: "천둥",
          de: "Blitzwind",
          es: "Arrasar"
        },
        type: "finish",
        framesList: [0],
        firstHit: 100,
        castTime: 20,
        offset: 0,
        base: 1000,
        elements: [
          "wind",
          "lightning"
        ],
        damage: "magic",
        dualable: false
      },
      {
        id: 3,
        names: {
          en: "Maelstrom",
          fr: "Maelström",
          tw: "大漩渦",
          kr: "마엘스트롬",
          de: "Mahlstrom",
          es: "Vórtice"
        },
        framesList: [0, 5, 5, 10, 10, 20, 20],
        hitDamage: [10, 10, 20, 15, 15, 15, 15],
        firstHit: 100,
        castTime: 90,
        offset: 0,
        base: 840,
        elements: [
          "wind",
          "lightning"
        ],
        debuffs: [
          {
            type: "wind",
            value: 74,
          },
          {
            type: "lightning",
            value: 74,
          }
        ],
        damage: "magic",
        dualable: false
      }
    ],
    multipleBlack: 2
  },
  {
    id: 80,
    names: {
      en: "Cor",
      tw: "柯爾",
      kr: "코르",
      fr: "Cor",
      de: "Cor",
      es: "Cor"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Slaughtering Blade",
          tw: "斬瞬刀",
          kr: "참순도",
          fr: "Lame sanguinaire",
          de: "Schlachtklinge",
          es: "Hoja sanguinaria"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8, 8],
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
      en: "Noctis",
      tw: "諾克提斯",
      kr: "녹티스",
      fr: "Noctis",
      de: "Noctis",
      es: "Noctis"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Warp Strike",
          tw: "變移破解",
          kr: "시프트 브레이크",
          fr: "Assaut éclipse",
          de: "Warp-Angriff",
          es: "Lux Impetus"
        },
        framesList: [0, 22, 13],
        hitDamage: [60, 20, 20],
        firstHit: 52,
        castTime: 50,
        offset: 120,
        base: 250,
        ignore: 50,
        type: "finish"
      },
      {
        id: 2,
        names: {
          en: "Point-Blank Warp-Strike",
          tw: "零距離變移破解",
          kr: "영거리 시프트 브레이크",
          fr: "Assauts éclipse critiques",
          de: "Direkt-Warp",
          es: "Quemarropa"
        },
        framesList: [0, 22, 13],
        hitDamage: [60, 20, 20],
        firstHit: 52,
        castTime: 50,
        offset: 120,
        base: 525,
        ignore: 50,
        type: "finish"
      },
      {
        id: 3,
        names: {
          en: "Thunder Flask",
          tw: "雷電瓶",
          kr: "선더 보틀",
          fr: "Sphère de foudre",
          de: "Donnerflasche",
          es: "Vial Electro"
        },
        framesList: [0],
        firstHit: 80,
        castTime: 40,
        offset: 60,
        base: 400,
        damage: "hybrid",
        type: "finish",
        elements: [
          "lightning"
        ]
      },
      {
        id: 4,
        names: {
          en: "Blizzard Flask",
          tw: "暴雪瓶",
          kr: "블리자드 보틀",
          fr: "Sphère de glace",
          de: "Schneesturmflasche",
          es: "Vial Hielo"
        },
        framesList: [0],
        firstHit: 145,
        castTime: 40,
        offset: 60,
        base: 400,
        damage: "hybrid",
        type: "finish",
        elements: [
          "ice"
        ]
      },
      {
        id: 5,
        names: {
          en: "Fire Flask",
          tw: "火焰瓶",
          kr: "파이어 보틀",
          fr: "Sphère de feu",
          de: "Molotowcocktail",
          es: "Vial Piro"
        },
        framesList: [0],
        firstHit: 95,
        castTime: 40,
        offset: 60,
        base: 400,
        damage: "hybrid",
        type: "finish",
        elements: [
          "fire"
        ]
      },
      {
        id: 6,
        names: {
          en: "Armiger",
          tw: "幻影劍",
          kr: "팬텀 소드",
          fr: "Arsenal fantôme",
          de: "Armiger",
          es: "Coro espectral"
        },
        framesList: [0, 5, 11, 42, 50],
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
      en: "Duke",
      tw: "杜克",
      kr: "듀크",
      fr: "Duke",
      de: "Duke",
      es: "Duke"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Hexa Thrust",
          tw: "六角突擊",
          kr: "헥사 드러스트",
          fr: "Hexaestoque",
          de: "Sechserstoß",
          es: "Hexaestoque"
        },
        framesList: [0, 6, 6, 6, 6, 29],
        hitDamage: [10, 10, 10, 10, 10, 50],
        firstHit: 28,
        castTime: 0,
        offset: 66,
        base: 200,
        ignore: 50,
        debuffs: [
          {
            type: "ice",
            value: 50
          }
        ]
      },
      {
        id: 2,
        names: {
          en: "Vaskylade",
          tw: "龍騎槍蛇神突擊",
          kr: "용의 창 바스킬레이드",
          fr: "Vaskylade",
          de: "Vaskylade",
          es: "Vaskylade"
        },
        framesList: [0, 61, 49, 10, 10],
        firstHit: 74,
        castTime: 0,
        offset: 0,
        base: 520,
        ignore: 50,
        elements: [
          "ice"
        ],
        dualable: false
      },
      {
        id: 216480,
        names: {
          en: "Dragon Crash",
          tw: "龍墜",
          kr: "용추",
          fr: "Chute du dragon",
          de: "Drachenramme",
          es: "Caída del dragón"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [
          {
            type: "ice",
            value: 50
          }
        ],
        dualable: true,
        firstHit: 65,
        framesList: [0],
        offset: 16,
        base: 180,
        type: "finish"
      }
    ]
  },
  {
    id: 83,
    names: {
      en: "Aura",
      tw: "阿烏拉",
      kr: "아우라",
      fr: "Aura",
      de: "Aura",
      es: "Aura"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Hundred Thrusts",
          tw: "百烈槍",
          kr: "백열의 창",
          fr: "Cent coups",
          de: "Hundert Stöße",
          es: "Cien estoques"
        },
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        firstHit: 47,
        castTime: 40,
        offset: 0,
        base: 120,
        ignore: 50,
      },
      {
        id: 2,
        names: {
          en: "Thousand Thrusts",
          tw: "千烈槍",
          kr: "천열의 창",
          fr: "Mille coups",
          de: "Tausend Stöße",
          es: "Mil estoques"
        },
        framesList: [0, 10, 10, 10, 10, 10, 10, 10, 5, 10, 10, 10],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9],
        firstHit: 47,
        castTime: 40,
        offset: 0,
        base: 180,
        ignore: 50,
      },
      {
        id: 3,
        names: {
          en: "Tornado Spear",
          tw: "颶風矛",
          kr: "돌풍의 창",
          fr: "Lance tornade",
          de: "Tornadospeer",
          es: "Lanza tornado"
        },
        framesList: [0, 5, 7, 7, 7, 7, 7, 7, 7, 8],
        firstHit: 116,
        castTime: 0,
        offset: 0,
        base: 390,
        ignore: 50,
        elements: [
          "wind"
        ],
        debuffs: [
          {
            type: "wind",
            value: 72
          }
        ],
        dualable: false
      },
    ]
  },
  {
    id: 84,
    names: {
      en: "William",
      tw: "威廉",
      kr: "윌리엄",
      fr: "William",
      de: "William",
      es: "William"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Innocent Magika",
          tw: "聖潔魔法",
          kr: "이노센트 마기카",
          fr: "Magika innocente",
          de: "Unschuldige Magika",
          es: "Magika inocente"
        },
        framesList: [0, 40, 20, 30, 30],
        firstHit: 70,
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 25,
        damage: "magic",
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Quake",
          tw: "地槌",
          kr: "퀘이크",
          fr: "Séisme",
          de: "Beben",
          es: "Seísmo"
        },
        framesList: [0, 22, 21, 22, 23, 23, 22, 23],
        hitDamage: [12, 13, 12, 13, 12, 13, 12, 13],
        firstHit: 160,
        castTime: 40,
        offset: 16,
        base: 275,
        elements: [
          "earth"
        ],
        damage: "magic",
        magicType: "black",
        dualable: false
      },
      {
        id: 3,
        names: {
          en: "Grand Wave",
          tw: "大波動",
          kr: "거대한 파동",
          fr: "Grande vague",
          de: "Große Welle",
          es: "Gran oleaje"
        },
        framesList: [0],
        firstHit: 140,
        castTime: 0,
        offset: 0,
        base: 940,
        elements: [
          "earth"
        ],
        damage: "magic",
        type: "finish",
        dualable: false
      }
    ],
    multipleBlack: 2
  },
  {
    id: 85,
    names: {
      en: "Cloud",
      tw: "克勞德",
      kr: "클라우드",
      fr: "Cloud",
      de: "Cloud",
      es: "Cloud"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Climhazzard",
          tw: "罪惡烈斬",
          kr: "클라임 해저드",
          fr: "Péril ascendant",
          de: "Climgefahr",
          es: "Riesgo climático"
        },
        framesList: [0],
        firstHit: 4,
        castTime: 0,
        offset: 66,
        base: 275,
        ignore: 50,
        type: "finish"
      },
      {
        id: 2,
        names: {
          en: "Meteor Rain",
          tw: "流星雨",
          kr: "메테오 레인",
          fr: "Pluie de météorites",
          de: "Meteorregen",
          es: "Lluvia meteorito"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8, 8],
        hitDamage: [12, 12, 12, 12, 12, 12, 12, 16],
        firstHit: 84,
        castTime: 4,
        offset: 66,
        base: 180,
        ignore: 50
      },
      {
        id: 3,
        names: {
          en: "Finishing Touch",
          tw: "畫龍點睛",
          kr: "화룡점정",
          fr: "Finition",
          de: "Letzter Schliff",
          es: "Toque final"
        },
        framesList: [0],
        firstHit: 75,
        castTime: 0,
        offset: 66,
        base: 400,
        type: "finish"
      },
      {
        id: 4,
        names: {
          en: "Omnislash",
          tw: "超究武神霸斬",
          kr: "초구무신패참",
          fr: "Omnifrappe",
          de: "Omnischlag",
          es: "Omnilátigo"
        },
        framesList: [0, 18, 16, 32, 16, 12, 22, 22, 16, 14, 32, 18, 12, 30, 102],
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
    ],
    dual: false
  },
  {
    id: 86,
    names: {
      en: "Tinkerer Carrie",
      tw: "機械工匠凱莉",
      kr: "세공사 캐리",
      fr: "Carrie bricoleuse",
      de: "Tüftler Carrie",
      es: "Carrie la juguetera"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Mechanical Trinket",
          tw: "機械玩具箱",
          kr: "장난감 기계 상자",
          fr: "Babiole mécanique",
          de: "Aufziehkästchen",
          es: "Cacharro mecánico"
        },
        framesList: [0, 8, 8, 9],
        hitDamage: [20, 25, 25, 30],
        firstHit: 60,
        castTime: 40,
        offset: 16,
        base: 160,
        ignore: 50,
        debuffs: [
          {
            type: "ice",
            value: 50
          }
        ]
      },
      {
        id: 2,
        names: {
          en: "Robot Soldiers",
          tw: "機關士兵",
          kr: "로보트 병사",
          fr: "Soldat robot",
          de: "Aufziehsoldaten",
          es: "Robosoldados"
        },
        framesList: [0, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        firstHit: 60,
        castTime: 40,
        offset: 16,
        base: 300
      },
      {
        id: 3,
        names: {
          en: "Hope of Light",
          tw: "希望之光",
          kr: "빛에 대한 희망",
          fr: "Lumière de l'espoir",
          de: "Hoffnungsschimmer",
          es: "Estrella fugaz"
        },
        framesList: [0, 7, 7, 7, 7, 7],
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
      en: "Kryla",
      tw: "克里菈",
      kr: "크라일라",
      fr: "Kryla",
      de: "Kryla",
      es: "Kryla"
    },
    abilities: [
      {
        id: 910610,
        names: {
          en: "Jinx - Emberfrost Brew",
          tw: "惡兆 - 烈火將至",
          kr: "징크스 - 불의 양조",
          fr: "Maléfice - Braise gelée",
          de: "Verhexen - Eisbrand-Gebräu",
          es: "Gafe - Mezcolanza feroz"
        },
        framesList: [0],
        firstHit: 150,
        castTime: 40,
        offset: 16,
        base: 300,
        damage: "magic",
        type: "finish",
        elements: [
          "fire",
          "ice"
        ],
        debuffs: [
          {
            type: "fire",
            value: 50,
          },
          {
            type: "ice",
            value: 50,
          }
        ],
        dualable: false
      },
      {
        id: 910611,
        names: {
          en: "Jinx - Geysershock Brew",
          tw: "惡兆 - 暴雪將至",
          kr: "징크스 - 눈보라의 양조",
          fr: "Maléfice - Geyser électrique",
          de: "Verhexen - Sprudelschock-Gebräu",
          es: "Gafe - Mezcolanza tormentosa"
        },
        framesList: [0],
        firstHit: 70,
        castTime: 40,
        offset: 16,
        base: 300,
        damage: "magic",
        type: "finish",
        elements: [
          "lightning",
          "water"
        ],
        debuffs: [
          {
            type: "lightning",
            value: 50,
          },
          {
            type: "water",
            value: 50,
          }
        ],
        dualable: false
      },
      {
        id: 910613,
        names: {
          en: "Jinx - Cycloseismic Brew",
          tw: "惡兆 - 泥流將至",
          kr: "징크스 - 진흙의 양조",
          fr: "Maléfice - Cycloséisme",
          de: "Verhexen - Schlammböel-Gebräu",
          es: "Gafe - Mezcolanza turbia"
        },
        framesList: [0],
        firstHit: 180,
        castTime: 40,
        offset: 16,
        base: 300,
        damage: "magic",
        type: "finish",
        elements: [
          "wind",
          "earth"
        ],
        debuffs: [
          {
            type: "wind",
            value: 50,
          },
          {
            type: "earth",
            value: 50,
          }
        ],
        dualable: false
      }
    ],
    multiCasts: [
      {
        count: 2,
        abilities: [
          910610,
          910611,
          910613
        ]
      }
    ]
  },
  {
    id: 88,
    names: {
      en: "Christine",
      tw: "克莉絲汀",
      kr: "크리스틴",
      fr: "Christine",
      de: "Christine",
      es: "Christine"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Ice Shards",
          tw: "寒冰碎片",
          kr: "얼음 조각",
          fr: "Fragment de glace",
          de: "Eissplitter",
          es: "Fragmentos de hielo"
        },
        framesList: [0, 7, 7, 7, 7, 5, 7, 7, 7, 7],
        firstHit: 49,
        castTime: 20,
        offset: 0,
        base: 330,
        ignore: 25,
        damage: "magic",
        elements: [
          "ice"
        ],
        dualable: false,
        range: {
          min: -10
        }
      },
      {
        id: 910652,
        names: {
          en: "Absolute Zero",
          tw: "極限零凍",
          kr: "절대영도",
          fr: "Zéro absolu",
          de: "Absoluter Nullpunkt",
          es: "Cero absoluto"
        },
        framesList: [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        hitDamage: [8, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11],
        firstHit: 40,
        castTime: 20,
        offset: 16,
        base: 300,
        damage: "magic",
        elements: [
          "ice"
        ],
        dualable: false
      },
      {
        id: 910653,
        names: {
          en: "Absolute Zero (Max)",
          tw: "極限零凍 (Max)",
          kr: "절대영도 (Max)",
          fr: "Zéro absolu (Max)",
          de: "Absoluter Nullpunkt (Max)",
          es: "Cero absoluto (Max)"
        },
        framesList: [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        hitDamage: [8, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11],
        firstHit: 40,
        castTime: 20,
        offset: 16,
        base: 900,
        damage: "magic",
        elements: [
          "ice"
        ],
        dualable: false
      },
      {
        id: 910654,
        names: {
          en: "Snow Burial",
          tw: "冰雪葬",
          kr: "설장",
          fr: "Cercueil de neige",
          de: "Schneebegräbnis",
          es: "Entierro de nieve"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        firstHit: 60,
        castTime: 36,
        offset: 16,
        base: 350,
        ignore: 50,
        damage: "magic",
        elements: [
          "ice"
        ],
        dualable: false
      },
      {
        id: 5,
        names: {
          en: "Snowbear Rampage",
          tw: "失控雪熊",
          kr: "광란의 눈곰",
          fr: "Fureur de l'ours blanc",
          de: "Schneebär-Raserei",
          es: "Furia polar"
        },
        framesList: [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        hitDamage: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10],
        firstHit: 80,
        castTime: 1,
        offset: 0,
        base: 710,
        damage: "magic",
        elements: [
          "ice"
        ],
        dualable: false
      }
    ],
    multiCasts: [
      {
        count: 2,
        abilities: [
          910652,
          910653,
          910654
        ]
      }
    ]
  },
  {
    id: 89,
    names: {
      en: "White Knight Noel",
      tw: "白騎士諾埃爾",
      kr: "백기사 노엘",
      fr: "Chevalier blanc Noël",
      de: "Weißer Ritter Noel",
      es: "Caballero blanco Noel"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Glacial Wave +2",
          tw: "冰凍波 +2",
          kr: "빙하의 파도 +2",
          fr: "Onde glaciale +2",
          de: "Gletscherwelle +2",
          es: "Ola glacial +2"
        },
        framesList: [0, 6, 4, 3, 3],
        firstHit: 178,
        castTime: 40,
        offset: 16,
        base: 400,
        ignore: 25,
        damage: "magic",
        elements: [
          "ice"
        ],
        debuffs: [
          {
            type: "ice",
            value: 50
          }
        ],
        dualable: false
      }
    ]
  },
  {
    id: 90,
    names: {
      en: "Frozen Hurricane",
      tw: "冰凍颶風",
      kr: "프로즌 허리케인",
      fr: "Ouragan gelé",
      de: "Eisiger Sturmwind",
      es: "Huracán gélido"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Frozen Hurricane",
          tw: "冰凍颶風",
          kr: "프로즌 허리케인",
          fr: "Ouragan gelé",
          de: "Eisiger Sturmwind",
          es: "Huracán gélido"
        },
        framesList: [0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        firstHit: 80,
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 25,
        damage: "magic",
        elements: [
          "ice"
        ],
        dualable: false
      }
    ]
  },
  {
    id: 91,
    names: {
      en: "Kaliva",
      tw: "卡里瓦",
      kr: "카리바",
      fr: "Kaliva",
      de: "Kaliva",
      es: "Kaliva"
    },
    abilities: [
      {
        id: 910751,
        names: {
          en: "Focus Magic - Piercing Shot",
          tw: "魔法聚集-穿刺",
          kr: "포커스 매직·피어싱 샷",
          fr: "Concentration magique - Tir perforant",
          de: "Fokusmagie - Durchschuss",
          es: "Concentrar magia - Disparo penetrante"
        },
        framesList: [0, 6, 6, 6, 6],
        firstHit: 8,
        castTime: 40,
        offset: 16,
        base: 150,
        ignore: 30,
        damage: "magic",
        elements: [
          "ice"
        ],
        dualable: false
      },
      {
        id: 910752,
        names: {
          en: "Focus Magic - Water Shot",
          tw: "魔法聚集-水擊",
          kr: "포커스 매직·워터 샷",
          fr: "Concentration magique - Tir aquatique",
          de: "Fokusmagie - Wasserschuss",
          es: "Concentrar magia - Disparo acuático"
        },
        framesList: [0, 6, 6, 6, 6],
        firstHit: 8,
        castTime: 40,
        offset: 16,
        base: 150,
        damage: "magic",
        elements: [
          "water"
        ],
        dualable: false
      },
      {
        id: 910757,
        names: {
          en: "Focus Magic - Frostbite (Max)",
          tw: "魔法聚集-凍傷 (Max)",
          kr: "포커스 매직·프로스트바이트 (Max)",
          fr: "Concentration magique - Congélation (Max)",
          de: "Fokusmagie - Frostbeule (Max)",
          es: "Concentrar magia - Congelación (Max)"
        },
        framesList: [0],
        firstHit: 120,
        castTime: 40,
        offset: 16,
        base: 420,
        damage: "magic",
        type: "finish",
        elements: [
          "ice"
        ],
        dualable: false
      },
      {
        id: 910709,
        names: {
          en: "Aquatic Implosion",
          tw: "水波聚爆",
          kr: "아쿠아 임플로전",
          fr: "Explosion aquatique",
          de: "Aquatische Implosion",
          es: "Implosión acuática"
        },
        framesList: [0, 6, 6, 6, 6, 7],
        hitDamage: [16, 16, 16, 16, 16, 20],
        firstHit: 46,
        castTime: 40,
        offset: 16,
        base: 200,
        damage: "magic",
        elements: [
          "water"
        ],
        dualable: false
      },
      {
        id: 910759,
        names: {
          en: "Icicle Press",
          tw: "冰雪重壓",
          kr: "아이시클 프레스",
          fr: "Pression de stalactite",
          de: "Eiszapfenmangel",
          es: "Carámbano de hielo"
        },
        framesList: [0, 15],
        firstHit: 110,
        castTime: 40,
        offset: 16,
        base: 200,
        damage: "magic",
        type: "finish",
        debuffs: [
          {
            type: "ice",
            value: 50,
          },
          {
            type: "water",
            value: 50,
          }
        ],
        dualable: false
      },
      {
        id: 911140,
        names: {
          en: "Icicle Press +2",
          tw: "冰雪重壓 +2",
          kr: "아이시클 프레스 +2",
          fr: "Pression de stalactite +2",
          de: "Eiszapfenmangel +2",
          es: "Carámbano de hielo +2"
        },
        hitDamage: [
          50, 50
        ],
        castTime: 40,
        damage: "magic",
        magicType: null,
        elements: [],
        debuffs: [
          {
            type: "ice",
            value: 75
          },
          {
            type: "water",
            value: 75
          }
        ],
        dualable: false,
        firstHit: 110,
        framesList: [0, 15],
        offset: 16,
        base: 250
      }
    ],
    multiCasts: [
      {
        count: 3,
        abilities: [
          910751,
          910752,
          910757
        ]
      }
    ]
  },
  {
    id: 92,
    names: {
      en: "Ray Jack",
      tw: "雷佳克",
      kr: "레이 잭",
      fr: "Ray Jack",
      de: "Ray Jack",
      es: "Ray Jack"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Lightning Strike",
          tw: "電閃雷鳴",
          kr: "라이트닝 버스터",
          fr: "Frappe électrique",
          de: "Blitzhieb",
          es: "Golpe atronador"
        },
        framesList: [0, 5, 5, 5, 5, 5],
        hitDamage: [16, 17, 16, 17, 17, 17],
        firstHit: 46,
        castTime: 40,
        offset: 16,
        base: 400,
        elements: [
          "light"
        ]
      },
      {
        id: 2,
        names: {
          en: "Holy Affliction",
          tw: "聖光悲愴",
          kr: "홀리 어플릭션",
          fr: "Affliction sacrée",
          de: "Heilige Trübsal",
          es: "Aflicción sagrada"
        },
        framesList: [0, 6, 6, 6, 6, 6],
        hitDamage: [16, 17, 16, 17, 17, 17],
        firstHit: 46,
        castTime: 40,
        offset: 16,
        base: 400,
        elements: [
          "light"
        ]
      },
      {
        id: 3,
        names: {
          en: "Luminous Strike",
          tw: "輝光直擊",
          kr: "루미너스 스트라이크",
          fr: "Frappe lumineuse",
          de: "Leuchthieb",
          es: "Golpe de luz"
        },
        framesList: [0, 8, 8, 8, 8, 8],
        hitDamage: [16, 17, 16, 17, 17, 17],
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 450,
        elements: [
          "light"
        ]
      },
      {
        id: 4,
        names: {
          en: "Sacred Strike",
          tw: "聖光直擊",
          kr: "세이크리드 스트라이크",
          fr: "Frappe sacrée",
          de: "Heiliger Hieb",
          es: "Golpe sagrado"
        },
        framesList: [0, 6, 6, 6, 6, 6],
        hitDamage: [16, 17, 16, 17, 17, 17],
        firstHit: 46,
        castTime: 40,
        debuffs: [
          {
            type: "light",
            value: 50
          }
        ],
        offset: 8,
        base: 220,
        ignore: 50
      },
      {
        id: 911158,
        names: {
          en: "Sacred Strike +2",
          tw: "聖光直擊 +2",
          kr: "세이크리드 스트라이크 +2",
          fr: "Frappe sacrée +2",
          de: "Heiliger Hieb +2",
          es: "Golpe sagrado +2"
        },
        hitDamage: [
          6, 6, 7, 7, 8, 8, 8, 50
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [
          {
            type: "light",
            value: 50
          }
        ],
        dualable: true,
        firstHit: 42,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
        offset: 16,
        base: 260,
        ignore: 50
      },
      {
        id: 5,
        names: {
          en: "Morning Star",
          tw: "啟明星獻禮",
          kr: "루시퍼의 선물",
          fr: "Étoile du matin",
          de: "Morgenstern",
          es: "Estrella del alba"
        },
        framesList: [0, 6, 6, 6, 6, 7],
        hitDamage: [16, 16, 16, 16, 16, 20],
        firstHit: 46,
        castTime: 40,
        offset: 16,
        base: 220,
        elements: [
          "light"
        ]
      },
      {
        id: 6,
        names: {
          en: "Hero of Legend",
          tw: "神諭勇者",
          kr: "신탁의 용사",
          fr: "Héros légendaire",
          de: "Legendärer Held",
          es: "Héroe legendario"
        },
        framesList: [0],
        firstHit: 175,
        castTime: 40,
        offset: 16,
        base: 420,
        ignore: 50,
        elements: [
          "light"
        ],
        dualable: false
      }
    ]
  },
  {
    id: 93,
    names: {
      en: "Kaede",
      tw: "楓",
      kr: "카에데",
      fr: "Kaede",
      de: "Kaede",
      es: "Kaede"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Halberd Dance",
          tw: "薙刀艷舞",
          kr: "치도염무",
          fr: "Danse de hallebarde",
          de: "Hellebardentanz",
          es: "Danza de alabarda"
        },
        framesList: [0, 10, 10, 10, 10, 10],
        hitDamage: [16, 16, 17, 17, 17, 17],
        firstHit: 42,
        castTime: 40,
        offset: 26,
        base: 300,
        ignore: 25
      },
      {
        id: 2,
        names: {
          en: "Samurai Princess's Order",
          tw: "公主武士大號令",
          kr: "사무라이 공주의 대호령",
          fr: "Ordre de la princesse samouraï",
          de: "Befehl der Samurai-Prinzessin",
          es: "Orden de la princesa samurái"
        },
        framesList: [0, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        firstHit: 78,
        castTime: 0,
        offset: 0,
        base: 790,
        dualable: false
      }
    ]
  },
  {
    id: 94,
    names: {
      en: "Jiraiya",
      tw: "自來也",
      kr: "지라이야",
      fr: "Jiraiya",
      de: "Jiraiya",
      es: "Jiraiya"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Blazing Hell Slash",
          tw: "焰獄斬",
          kr: "염옥참",
          fr: "Entaille flammes infernales",
          de: "Flammender Höllenschlag",
          es: "Tajo de fuego infernal"
        },
        framesList: [0, 2, 4, 12, 5],
        firstHit: 24,
        castTime: 45,
        offset: 26,
        base: 550,
        damage: "hybrid",
        elements: [
          "fire"
        ]
      },
      {
        id: 2,
        names: {
          en: "Torpedo Stance",
          tw: "雷擊陣",
          kr: "전격진",
          fr: "Posture torpille",
          de: "Torpedo-Kata",
          es: "Formación torpedo"
        },
        framesList: [0, 10, 10, 10, 10],
        firstHit: 45,
        castTime: 40,
        offset: 26,
        base: 450,
        damage: "hybrid",
        elements: [
          "lightning"
        ]
      },
      {
        id: 3,
        names: {
          en: "Purgatory Fire Slash",
          tw: "煉獄剎燒斬",
          kr: "연옥찰소참",
          fr: "Flammes du purgatoire",
          de: "Flammenschlag des Purgatoriums",
          es: "Tajo ígneo del purgatorio"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8],
        hitDamage: [10, 10, 10, 10, 10, 10, 40],
        firstHit: 10,
        castTime: 0,
        offset: 8,
        base: 750,
        damage: "hybrid",
        elements: [
          "fire"
        ]
      },
      {
        id: 4,
        names: {
          en: "Thunder Strike Stance",
          tw: "轟雷衝擊陣",
          kr: "굉뇌격출진",
          fr: "Posture électrocoup",
          de: "Gewitterschlag-Kata",
          es: "Electrogolpe firme"
        },
        framesList: [0, 10, 10, 10, 10, 10, 10],
        hitDamage: [10, 10, 10, 10, 10, 20, 30],
        firstHit: 42,
        castTime: 40,
        offset: 26,
        base: 550,
        damage: "hybrid",
        elements: [
          "lightning"
        ]
      },
      {
        id: 5,
        names: {
          en: "Toad Art - Raiden",
          tw: "蟾蜍忍法·雷電",
          kr: "두꺼비 인법·뇌전",
          fr: "Art des crapauds - Raiden",
          de: "Krötenkunst - Raiden",
          es: "Artesapo - Raiden"
        },
        framesList: [0, 10, 10, 10, 10, 10, 10],
        hitDamage: [14, 14, 15, 14, 14, 15, 14],
        firstHit: 133,
        castTime: 0,
        offset: 0,
        base: 1400,
        damage: "hybrid",
        elements: [
          "lightning"
        ],
        dualable: false
      }
    ]
  },
  {
    id: 95,
    names: {
      en: "Pyro Glacial Lasswell",
      tw: "冰炎騎士拉斯韋爾",
      kr: "빙염의 기사 라스웰",
      fr: "Lasswell flammes gelées",
      de: "Eisflammenritter Lasswell",
      es: "Lasswell pirogélido"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Heavensplitter",
          tw: "眺望破天",
          kr: "조망파천",
          fr: "Partition céleste",
          de: "Himmelssplitter",
          es: "Partidor celeste"
        },
        framesList: [0],
        firstHit: 2,
        castTime: 0,
        offset: 8,
        type: "finish",
        base: 230
      },
      {
        id: 2,
        names: {
          en: "Crimson Flash",
          tw: "紅紫一閃",
          kr: "홍전일섬",
          fr: "Éclat pourpre",
          de: "Purpurblitz",
          es: "Destello escarlata"
        },
        framesList: [0],
        firstHit: 6,
        castTime: 0,
        offset: 8,
        base: 200,
        type: "finish",
        ignore: 50
      },
      {
        id: 3,
        names: {
          en: "Fatal Bloom",
          tw: "雪華終焉",
          kr: "설화종언",
          fr: "Floraison fatale",
          de: "Fatale Blüte",
          es: "Floración fatal"
        },
        framesList: [0],
        firstHit: 2,
        castTime: 0,
        offset: 8,
        base: 675,
        type: "finish",
        elements: [
          "ice"
        ],
        debuffs: [
          {
            type: "ice",
            value: 50
          }
        ]
      },
      {
        id: 4,
        names: {
          en: "Crimson Era",
          tw: "深紅終結",
          kr: "진홍의 종지부",
          fr: "Ère carmin",
          de: "Purpurne Ära",
          es: "Era carmesí"
        },
        framesList: [0],
        firstHit: 20,
        castTime: 0,
        offset: 8,
        base: 675,
        type: "finish",
        elements: [
          "fire"
        ],
        debuffs: [
          {
            type: "fire",
            value: 50
          }
        ]
      },
      {
        id: 5,
        names: {
          en: "Blade Flash - Final",
          tw: "紫電一閃・終",
          kr: "자전일섬·종",
          fr: "Flash pourpre - Final",
          de: "Flimmerklinge - Final",
          es: "Destello de hoja - Final"
        },
        framesList: [0],
        firstHit: 2,
        castTime: 0,
        offset: 8,
        base: 525,
        ignore: 50,
        type: "finish",
      },
      {
        id: 6,
        names: {
          en: "Unstoppable Wave",
          tw: "跋山涉水",
          kr: "발산섭수",
          fr: "Vague imparable",
          de: "Unaufhaltbare Welle",
          es: "Ola imparable"
        },
        framesList: [0],
        firstHit: 28,
        castTime: 0,
        offset: 0,
        base: 790,
        ignore: 50,
        dualable: false,
        type: "finish",
      }
    ]
  },
  {
    id: 96,
    names: {
      en: "Drace",
      tw: "朵芮絲",
      kr: "드레이스",
      fr: "Drace",
      de: "Drace",
      es: "Drace"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Revolt",
          tw: "反叛",
          kr: "반란",
          fr: "Révolte",
          de: "Revolte",
          es: "Levantamiento"
        },
        framesList: [0, 24, 24, 24, 24, 24],
        hitDamage: [16, 16, 16, 16, 16, 20],
        firstHit: 70,
        castTime: 40,
        offset: 16,
        base: 300,
        ignore: 25,
        damage: "magic",
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Flamephant",
          tw: "火炎幻想",
          kr: "불꽃의 사제",
          fr: "Flaméphant",
          de: "Flammenfant",
          es: "Flamígero"
        },
        framesList: [0],
        firstHit: 100,
        castTime: 40,
        offset: 16,
        base: 420,
        damage: "magic",
        type: "finish",
        elements: [
          "fire"
        ],
        dualable: false,
      }
    ]
  },
  {
    id: 97,
    names: {
      en: "Balthier",
      tw: "巴爾弗雷亞",
      kr: "발프레아",
      fr: "Balthier",
      de: "Balthier",
      es: "Balthier"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Elemental Shot - Fire",
          tw: "屬性強化彈·火",
          kr: "저항력 강화탄·불",
          fr: "Tir élémentaire : feu",
          de: "Elementarschuss - Feuer",
          es: "Tiro Piro"
        },
        framesList: [0],
        firstHit: 55,
        castTime: 0,
        offset: 8,
        base: 150,
        ignore: 50,
        type: "finish",
        debuffs: [
          {
            type: "fire",
            value: 60
          }
        ]
      },
      {
        id: 2,
        names: {
          en: "Elemental Shot - Lightning",
          tw: "屬性強化彈·雷",
          kr: "저항력 강화탄·번개",
          fr: "Tir élémentaire : foudre",
          de: "Elementarschuss - Blitz",
          es: "Tiro Electro"
        },
        framesList: [0],
        firstHit: 40,
        castTime: 0,
        offset: 8,
        base: 150,
        ignore: 50,
        type: "finish",
        debuffs: [
          {
            type: "lightning",
            value: 60
          }
        ]
      },
      {
        id: 3,
        names: {
          en: "Elemental Shot - Water",
          tw: "屬性強化彈·水",
          kr: "저항력 강화탄·물",
          fr: "Tir élémentaire : eau",
          de: "Elementarschuss - Wasser",
          es: "Tiro Aqua"
        },
        framesList: [0],
        firstHit: 90,
        castTime: 0,
        offset: 8,
        base: 150,
        ignore: 50,
        type: "finish",
        debuffs: [
          {
            type: "water",
            value: 60
          }
        ]
      },
      {
        id: 4,
        names: {
          en: "Elemental Shot - Light",
          tw: "屬性強化彈·光",
          kr: "저항력 강화탄·빛",
          fr: "Tir élémentaire : lumière",
          de: "Elementarschuss - Licht",
          es: "Tiro Sanctus"
        },
        framesList: [0],
        firstHit: 40,
        castTime: 0,
        offset: 8,
        base: 150,
        ignore: 50,
        type: "finish",
        debuffs: [
          {
            type: "light",
            value: 60
          }
        ]
      },
      {
        id: 5,
        names: {
          en: "Killer Shot",
          tw: "致命射擊",
          kr: "치명 사격",
          fr: "Tir mortel",
          de: "Todesschuss",
          es: "Tiro mortal"
        },
        framesList: [0],
        firstHit: 85,
        castTime: 40,
        offset: 16,
        base: 250,
        ignore: 50,
        type: "finish"
      },
      {
        id: 6,
        names: {
          en: "Finishing Blow",
          tw: "終極吐息",
          kr: "피니싱 블로우",
          fr: "Souffle final",
          de: "Gnadenhieb",
          es: "Estocada final"
        },
        framesList: [0],
        firstHit: 100,
        castTime: 40,
        offset: 16,
        base: 500,
        ignore: 50,
        type: "finish"
      },
      {
        id: 7,
        names: {
          en: "Element of Treachery",
          tw: "謀逆之相位星",
          kr: "역모의 아스팩트",
          fr: "Impact astral",
          de: "Element der Tücke",
          es: "Impacto astral"
        },
        framesList: [0],
        firstHit: 185,
        castTime: 0,
        offset: 0,
        base: 390,
        ignore: 50,
        type: "finish",
        dualable: false
      }
    ]
  },
  {
    id: 98,
    names: {
      en: "Blossom Sage Sakura",
      tw: "櫻雲賢者櫻",
      kr: "벚꽃의 현자 사쿠라",
      fr: "Sakura sage des fleurs",
      de: "Blütenmagierin Sakura",
      es: "Sakura sabia floreciente"
    },
    abilities: [
      {
        id: 219330,
        names: {
          en: "Quick Thunder's Light",
          tw: "迅・雷光",
          kr: "신속·뇌광",
          fr: "Lumière de l'éclair rapide",
          de: "Schnelles Donnerlicht",
          es: "Luz atronadora veloz"
        },
        framesList: [0, 10],
        firstHit: 2,
        castTime: 0,
        offset: 56,
        base: 230,
        type: "finish",
        damage: "magic",
        elements: [
          "lightning"
        ],
        debuffs: [
          {
            type: "lightning",
            value: 50
          }
        ],
        dualable: false
      },
      {
        id: 219340,
        names: {
          en: "Quick Bright Flash",
          tw: "迅・光閃",
          kr: "신속·섬광",
          fr: "Éclat lumineux rapide",
          de: "Schneller Heller Blitz",
          es: "Destello luminoso veloz"
        },
        framesList: [0, 10],
        firstHit: 2,
        castTime: 0,
        offset: 56,
        base: 230,
        type: "finish",
        damage: "magic",
        elements: [
          "light"
        ],
        debuffs: [
          {
            type: "light",
            value: 50
          }
        ],
        dualable: false
      },
      {
        id: 219350,
        names: {
          en: "Quick Blighted Gloom",
          tw: "迅・冥暗",
          kr: "신속·명암",
          fr: "Pénombre ternie rapide",
          de: "Schnelle Verdorbene Düsternis",
          es: "Penumbra luminosa veloz"
        },
        framesList: [0, 10],
        firstHit: 2,
        castTime: 0,
        offset: 56,
        base: 230,
        type: "finish",
        damage: "magic",
        elements: [
          "dark"
        ],
        debuffs: [
          {
            type: "dark",
            value: 50
          }
        ],
        dualable: false
      },
      {
        id: 219490,
        names: {
          en: "Quick Rebel Intention",
          tw: "迅・反叛之意",
          kr: "신속·반역의 결심",
          fr: "Rébellion instantanée",
          de: "Schneller Rebellenplan",
          es: "Rebeldía veloz"
        },
        framesList: [0],
        firstHit: 167,
        castTime: 0,
        offset: 160,
        base: 650,
        ignore: 25,
        type: "finish",
        damage: "magic",
        dualable: false
      },
      {
        id: 219320,
        names: {
          en: "Quick Final Thunder (Max)",
          tw: "迅・終焉轟雷 (Max)",
          kr: "신속·종말의 뇌락 (Max)",
          fr: "Éclair final rapide (Max)",
          de: "Schneller letzter Donner (Max)",
          es: "Trueno final veloz (Max)"
        },
        framesList: [0],
        firstHit: 150,
        castTime: 40,
        offset: 16,
        base: 1500,
        type: "finish",
        damage: "magic",
        elements: [
          "lightning"
        ],
        dualable: false
      },
      {
        id: 100012406,
        names: {
          en: "Eternal Ray",
          tw: "永恆之光",
          kr: "영원의 섬광",
          fr: "Rayon éternel",
          de: "Ewiger Strahl",
          es: "Rayo infinito"
        },
        framesList: [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        hitDamage: [2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3],
        firstHit: 12,
        castTime: 0,
        offset: 8,
        base: 800,
        type: "finish",
        damage: "magic",
        dualable: false
      }
    ],
    multiCasts: [
      {
        count: 2,
        abilities: [
          219320,
          219330,
          219340,
          219350,
          219490
        ]
      }
    ]
  },
  {
    id: 99,
    names: {
      en: "Yun",
      tw: "雲",
      kr: "윤",
      fr: "Yun",
      de: "Yun",
      es: "Yun"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Raging Bird",
          tw: "憤怒之鳥",
          kr: "분노한 새",
          fr: "Oiseau enragé",
          de: "Wütender Vogel",
          es: "Pájaro enrabietado"
        },
        framesList: [0, 3, 2, 3, 4, 2, 4, 2, 3, 2],
        hitDamage: [8, 8, 9, 9, 10, 10, 10, 11, 12, 13],
        firstHit: 38,
        castTime: 40,
        offset: 16,
        base: 300
      },
      {
        id: 2,
        names: {
          en: "Raging Bird +2",
          tw: "憤怒之鳥 +2",
          kr: "분노한 새 +2",
          fr: "Oiseau enragé +2",
          de: "Wütender Vogel +2",
          es: "Pájaro enrabietado +2"
        },
        framesList: [0, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        hitDamage: [8, 8, 9, 9, 10, 10, 10, 11, 12, 13],
        firstHit: 38,
        castTime: 40,
        offset: 16,
        base: 400
      },
      {
        id: 3,
        names: {
          en: "Blazing Combo",
          tw: "熾熱連擊",
          kr: "타오르는 연속 공격",
          fr: "Combo explosif",
          de: "Flammende Kombo",
          es: "Combo ígneo"
        },
        framesList: [0, 4, 6, 5, 8],
        hitDamage: [17, 19, 20, 21, 23],
        firstHit: 85,
        castTime: 40,
        offset: 16,
        base: 185,
        ignore: 25,
        elements: [
          "fire"
        ],
        debuffs: [
          {
            type: "fire",
            value: 30
          }
        ]
      },
      {
        id: 4,
        names: {
          en: "Blazing Combo +2",
          tw: "熾熱連擊 +2",
          kr: "타오르는 연속 공격 +2",
          fr: "Combo explosif +2",
          de: "Flammende Kombo +2",
          es: "Combo ígneo +2"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8, 8],
        hitDamage: [9, 10, 11, 12, 13, 14, 15, 16],
        firstHit: 82,
        castTime: 40,
        offset: 26,
        base: 300,
        ignore: 50,
        elements: [
          "fire"
        ],
        debuffs: [
          {
            type: "fire",
            value: 50
          }
        ]
      }
    ]
  },
  {
    id: 100,
    names: {
      en: "Cupid Artemios",
      tw: "愛神阿特米奧",
      kr: "큐피드 아르테미오스",
      fr: "Artemios-Cupidon",
      de: "Amor-Artemios",
      es: "Artemios Cupido"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Lux Magna +2",
          tw: "光輝一擊 +2",
          kr: "럭스 마그나 +2",
          fr: "Lux Magna +2",
          de: "Lux Magna +2",
          es: "Lux Magna +2"
        },
        framesList: [0],
        firstHit: 120,
        castTime: 40,
        offset: 16,
        base: 500,
        elements: [
          "light"
        ],
        debuffs: [
          {
            type: "light",
            value: 50,
          },
          {
            type: "dark",
            value: 50,
          }
        ]
      },
      {
        id: 2,
        names: {
          en: "Astral Shot",
          tw: "星光射擊",
          kr: "아스트랄 사격",
          fr: "Tir astral",
          de: "Astralschuss",
          es: "Saeta astral"
        },
        hitDamage: [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 16
        ],
        castTime: 0,
        damage: "physical",
        elements: [
          "light"
        ],
        debuffs: [],
        firstHit: 40,
        framesList: [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 9, 11, 15],
        offset: 8,
        base: 430,
        dualable: false
      }
    ]
  },
  {
    id: 101,
    names: {
      en: "Ang",
      tw: "昂",
      kr: "앙",
      fr: "Ang",
      de: "Ang",
      es: "Ang",
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Beast Hunter Arrow",
          tw: "狩獵之箭",
          kr: "엽수의 화살",
          fr: "Flèche chasse-bête",
          de: "Bestienjäger-Pfeil",
          es: "Flecha tumbabestias"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 85,
        framesList: [0],
        offset: 16,
        base: 275,
        type: "finish"
      },
      {
        id: 2,
        names: {
          en: "Bird Hunter Arrow",
          tw: "射鳥之箭",
          kr: "사조의 화살",
          fr: "Flèche chasse-oiseau",
          de: "Vogeljäger-Pfeil",
          es: "Flecha tumbapájaros"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 85,
        framesList: [0],
        offset: 16,
        base: 275,
        type: "finish"
      },
      {
        id: 3,
        names: {
          en: "Dragon Hunter Arrow",
          tw: "屠龍之箭",
          kr: "도룡의 화살",
          fr: "Flèche chasse-dragon",
          de: "Drachejäger-Pfeil",
          es: "Flecha tumbadragones"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 85,
        framesList: [0],
        offset: 16,
        base: 275,
        type: "finish"
      },
      {
        id: 4,
        names: {
          en: "Insect Hunter Arrow",
          tw: "殺蟲之箭",
          kr: "살충의 화살",
          fr: "Flèche chasse-insecte",
          de: "Insektenjäger-PFeil",
          es: "Flecha tumbainsectos"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 85,
        framesList: [0],
        offset: 16,
        base: 275,
        type: "finish"
      },
      {
        id: 5,
        names: {
          en: "Petrifying Shot",
          tw: "石化連射",
          kr: "석화연사",
          fr: "Tir pétrifiant",
          de: "Versteinernder Schuss",
          es: "Tiro petrificante"
        },
        hitDamage: [
          100
        ],
        castTime: 20,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 22,
        framesList: [0],
        offset: 16,
        base: 70,
        type: "finish"
      },
      {
        id: 6,
        names: {
          en: "Penetrating Shot",
          tw: "穿甲連射",
          kr: "철갑연사",
          fr: "Tir pénétrant",
          de: "Durchdringender Schuss",
          es: "Tiro penetrante"
        },
        hitDamage: [
          100
        ],
        castTime: 20,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 22,
        framesList: [0],
        offset: 16,
        base: 70,
        type: "finish"
      },
      {
        id: 7,
        names: {
          en: "Ash Shot",
          tw: "灰燼連射",
          kr: "회신연사",
          fr: "Tir de cendre",
          de: "Ascheschuss",
          es: "Tiro de ceniza"
        },
        hitDamage: [
          100
        ],
        castTime: 20,
        damage: "physical",
        elements: [],
        debuffs: [
          {
            type: "fire",
            value: 50
          }
        ],
        firstHit: 22,
        framesList: [0],
        offset: 16,
        base: 70,
        type: "finish"
      },
      {
        id: 8,
        names: {
          en: "Swift Shot",
          tw: "急速連射",
          kr: "질속연사",
          fr: "Tir ultra rapide",
          de: "Flinker Schuss",
          es: "Tiro rápido"
        },
        hitDamage: [
          100
        ],
        castTime: 20,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 22,
        framesList: [0],
        offset: 16,
        base: 200,
        type: "finish"
      },
      {
        id: 9,
        names: {
          en: "Armor Piercing Arrow",
          tw: "穿甲箭雨",
          kr: "철갑의 화살",
          fr: "Flèche brisarmure",
          de: "Panzerbrecher-Pfeil",
          es: "Flecha penetraarmaduras"
        },
        hitDamage: [
          16, 18, 20, 22, 24
        ],
        castTime: 20,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 82,
        framesList: [0, 7, 7, 7, 7],
        offset: 16,
        base: 180,
        ignore: 25
      },
      {
        id: 10,
        names: {
          en: "Falling Sun",
          tw: "射日",
          kr: "낙일",
          fr: "Soleil descendant",
          de: "Sonnensturz",
          es: "Sol descendente"
        },
        hitDamage: [
          100
        ],
        castTime: 60,
        damage: "physical",
        elements: [
          "fire"
        ],
        debuffs: [
          {
            type: "fire",
            value: 74
          }
        ],
        firstHit: 150,
        framesList: [0],
        base: 650,
        ignore: 50,
        offset: 16,
        type: "finish",
        dualable: false
      }
    ],
    dual: false
  },
  {
    id: 102,
    names: {
      en: "Prompto",
      tw: "普羅恩普特",
      kr: "프롬프토",
      fr: "Prompto",
      de: "Prompto",
      es: "Prompto"
    },
    abilities: [
      {
        id: 221400,
        names: {
          en: "Ballistic",
          tw: "扇形彈幕",
          kr: "불릿 팬",
          fr: "Déluge de balles",
          de: "Kugelhagel",
          es: "Gatillo fácil"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 42,
        base: 220,
        framesList: [0, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        offset: 16
      },
      {
        id: 221420,
        names: {
          en: "Circular Saw",
          tw: "圓盤鋸",
          kr: "서큘러 쏘우",
          fr: "Scie circulaire",
          de: "Wirbelsäge",
          es: "Sierra circular"
        },
        hitDamage: [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 42,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
        offset: 16,
        base: 225,
        ignore: 50
      },
      {
        id: 221430,
        names: {
          en: "Gravity Well",
          tw: "引力波",
          kr: "어트랙트 웨이브",
          fr: "Vortex",
          de: "Gravitationspulsator",
          es: "Gravitón"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [
          {
            type: "lightning",
            value: 60
          }
        ],
        firstHit: 110,
        framesList: [0],
        offset: 8,
        base: 360,
        type: "finish"
      },
      {
        id: 221390,
        names: {
          en: "Recoil",
          tw: "衝擊波",
          kr: "블래스터",
          fr: "Ravageur",
          de: "Rückstoß",
          es: "Fulminador"
        },
        hitDamage: [
          100
        ],
        castTime: 104,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 110,
        framesList: [0],
        offset: 16,
        base: 250,
        ignore: 50,
        type: "finish"
      },
      {
        id: 221450,
        names: {
          en: "Drillbreaker",
          tw: "破壞鑽頭",
          kr: "드릴 브레이커",
          fr: "Foreuse",
          de: "Perforator",
          es: "Perforador"
        },
        hitDamage: [
          100
        ],
        castTime: 104,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 114,
        framesList: [0],
        offset: 16,
        base: 200,
        ignore: 50,
        type: "finish"
      },
      {
        id: 215000706,
        names: {
          en: "Trigger-Happy",
          tw: "連發射擊",
          kr: "트리거 해피",
          fr: "Gâchette facile",
          de: "Nervöser Finger",
          es: "Metrallazo"
        },
        hitDamage: [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 16
        ],
        castTime: 138,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 180,
        framesList: [0, 8, 8, 8, 8, 8, 8, 8, 32, 8, 8, 8, 8, 8, 96],
        offset: 16,
        base: 800,
        dualable: false
      }
    ],
    multiCasts: [
      {
        count: 2,
        abilities: [
          221420,
          221430,
          221390,
          221450
        ]
      }
    ]
  },
  {
    id: 103,
    names: {
      en: "Beatrix",
      tw: "貝特麗克絲",
      kr: "베아트릭스",
      fr: "Béate",
      de: "Beatrix",
      es: "Beatrix"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Seiken - Thunder Slash",
          tw: "聖劍技・雷鳴劍",
          kr: "성검기·뇌명검",
          fr: "Lame Ste - Foudrolle",
          de: "Heiliges Schwert - Schocker",
          es: "Ira santa - Sable eléctrico"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        castTime: 0,
        damage: "physical",
        elements: [
          "lightning"
        ],
        debuffs: [],
        firstHit: 26,
        framesList: [0, 8, 8, 8, 8, 8, 8, 8],
        offset: 86,
        base: 400
      },
      {
        id: 2,
        names: {
          en: "Seiken - Stock Break",
          tw: "聖劍技・破曉斬",
          kr: "성검기·스톡 브레이크",
          fr: "Lame Ste - Fente",
          de: "Heiliges Schwert - Donnerklinge",
          es: "Ira santa - Devastación"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 72,
        framesList: [0],
        offset: 86,
        base: 200,
        type: "finish"
      },
      {
        id: 217070,
        names: {
          en: "Seiken - Climhazzard",
          tw: "聖劍技・天災",
          kr: "성검기·클라임 해저드",
          fr: "Lame Ste - Mortimer",
          de: "Heiliges Schwert - Exekutionsschlag",
          es: "Ira santa - Guillotina"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "hybrid",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 65,
        framesList: [0],
        offset: 86,
        base: 600,
        type: "finish"
      },
      {
        id: 4,
        names: {
          en: "Seiken - Saint Bringer",
          tw: "聖劍技・聖使",
          kr: "성검기·세인트 브링거",
          fr: "Lame Ste - Porteur de l'aube",
          de: "Heiliges Schwert - Heilsbringer",
          es: "Ira santa - Portador del alba"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [
          {
            type: "light",
            value: 50
          }
        ],
        firstHit: 12,
        framesList: [0, 8, 8, 8, 8, 8, 8, 8],
        offset: 86,
        base: 425
      },
      {
        id: 5,
        names: {
          en: "Seiken - Shock",
          tw: "聖劍技・震擊",
          kr: "성검기·쇼크",
          fr: "Lame Ste - Choc",
          de: "Heiliges Schwert - Atomisator",
          es: "Ira santa - Shock"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 42,
        framesList: [0],
        offset: 16,
        base: 265,
        ignore: 50,
        type: "finish"
      },
      {
        id: 6,
        names: {
          en: "Rose of May",
          tw: "皋月的荊棘",
          kr: "로즈 오브 메이",
          fr: "Rose de mai",
          de: "Mairosen",
          es: "Rosa de mayo"
        },
        hitDamage: [
          15, 15, 15, 55
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 98,
        framesList: [0, 32, 59, 87],
        offset: 8,
        base: 520,
        ignore: 50,
        dualable: false
      }
    ]
  },
  {
    id: 104,
    names: {
      en: "Yuri",
      tw: "百合",
      kr: "유리",
      fr: "Yuri",
      de: "Yuri",
      es: "Yuri"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Whirlwind Evasion 2",
          tw: "旋風遁・二式",
          kr: "질풍둔 2식",
          fr: "Évasion - Tornade II",
          de: "Wirbelwindvermeidung 2",
          es: "Evasión del remolino II"
        },
        hitDamage: [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        castTime: 40,
        damage: "hybrid",
        elements: [
          "wind"
        ],
        debuffs: [],
        firstHit: 59,
        framesList: [0, 8, 8, 8, 8, 8, 8, 8],
        offset: 16,
        base: 400
      },
      {
        id: 2,
        names: {
          en: "Earthsplit Evasion 2",
          tw: "土割遁・二式",
          kr: "토할둔 2식",
          fr: "Évasion - Fissure terrestre II",
          de: "Erdspaltenvermeidung 2",
          es: "Evasión partetierra II"
        },
        hitDamage: [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        castTime: 40,
        damage: "hybrid",
        elements: [
          "earth"
        ],
        debuffs: [],
        firstHit: 120,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
        offset: 16,
        base: 425
      },
      {
        id: 3,
        names: {
          en: "Mugen - Fake",
          tw: "夢幻之術・偽",
          kr: "몽환술·거짓",
          fr: "Rêverie - Tromperie",
          de: "Mugen - Täuschung",
          es: "Mugen - Falsedad"
        },
        hitDamage: [
          10, 10, 10, 20, 20, 30
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 42,
        framesList: [0, 8, 8, 14, 10, 10],
        offset: 16,
        base: 270
      },
      {
        id: 4,
        names: {
          en: "Heavenly Chains",
          tw: "天鎖滅襲刃",
          kr: "천쇄멸습인",
          fr: "Chaînes divines",
          de: "Himmlische Ketten",
          es: "Cadenas celestiales"
        },
        hitDamage: [
          15, 15, 15, 15, 40
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 18,
        framesList: [0, 30, 28, 10, 36],
        offset: 8,
        base: 742.5,
        dualable: false
      }
    ]
  },
  {
    id: 105,
    names: {
      en: "Divine Soleil",
      tw: "女神索蕾莜",
      kr: "여신 솔레이유",
      fr: "Soleil divine",
      de: "Göttliche Soleil",
      es: "Soleil divina"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Dance of Sorrow",
          tw: "憂傷之舞",
          kr: "비애의 춤",
          fr: "Danse du chagrin",
          de: "Tanz des Kummers",
          es: "Danza del dolor"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        elements: [],
        debuffs: [],
        firstHit: 120,
        framesList: [0],
        offset: 16,
        base: 250,
        type: "finish",
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Dance of Grievance",
          tw: "哀怨之舞",
          kr: "고충의 춤",
          fr: "Danse du ressentiment",
          de: "Tanz der Gram",
          es: "Danza del resentimiento"
        },
        hitDamage: [
          100
        ],
        castTime: 20,
        damage: "magic",
        elements: [],
        debuffs: [],
        firstHit: 20,
        framesList: [0],
        offset: 16,
        type: "finish",
        base: 300,
        dualable: false
      },
      {
        id: 3,
        names: {
          en: "Dance of Misery",
          tw: "悲痛之舞",
          kr: "도탄의 춤",
          fr: "Danse de la souffrance",
          de: "Tanz des Elends",
          es: "Danza del suplicio"
        },
        hitDamage: [
          100
        ],
        castTime: 20,
        damage: "magic",
        elements: [],
        debuffs: [],
        firstHit: 33,
        framesList: [0],
        offset: 16,
        type: "finish",
        base: 500,
        dualable: false
      },
      {
        id: 4,
        names: {
          en: "Wheel of Life",
          tw: "大輪迴",
          kr: "윤회",
          fr: "Roue de la vie",
          de: "Rad des Lebens",
          es: "Rueda de la vida"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        elements: [],
        debuffs: [],
        firstHit: 40,
        framesList: [0],
        offset: 16,
        type: "finish",
        base: 120,
        dualable: false
      }
    ]
  },
  {
    id: 106,
    names: {
      en: "Explorer Aileen",
      tw: "探險家艾琳",
      kr: "탐험가 아이린",
      fr: "Aileen exploratrice",
      de: "Forscher Aileen",
      es: "Aileen exploradora"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Assault Rifle",
          tw: "突擊步槍",
          kr: "돌격 소총",
          fr: "Fusil d'assaut",
          de: "Sturmgewehr",
          es: "Rifle de asalto"
        },
        hitDamage: [
          15, 15, 20, 15, 20, 15
        ],
        castTime: 60,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 60,
        framesList: [0, 6, 6, 6, 6, 6],
        offset: 16,
        base: 300
      },
      {
        id: 2,
        names: {
          en: "Piledriver Finish",
          tw: "終結打樁機",
          kr: "마지막 치명타",
          fr: "Coup aplatissant",
          de: "Dampframmenabgang",
          es: "Golpe aplastante"
        },
        hitDamage: [
          14, 14, 14, 14, 14, 15, 15
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 2,
        framesList: [0, 8, 8, 8, 8, 8, 8],
        offset: 36,
        base: 220,
        ignore: 50
      },
      {
        id: 3,
        names: {
          en: "Point-blank Impact",
          tw: "近距離衝擊",
          kr: "직격타",
          fr: "Impact à bout portant",
          de: "Direkter Aufprall",
          es: "Impacto a bocajarro"
        },
        hitDamage: [
          20, 20, 20, 40
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 36,
        framesList: [0, 71, 13, 105],
        offset: 8,
        base: 850,
        ignore: 50,
        dualable: false
      },
      {
        id: 4,
        names: {
          en: "Killing Blow",
          tw: "致命吹擊",
          kr: "치명타",
          fr: "Souffle mortel",
          de: "Todeshieb",
          es: "Golpe mortífero"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 60,
        framesList: [0],
        offset: 16,
        type: "finish",
        base: 1050
      }
    ],
    dual: false
  },
  {
    id: 107,
    names: {
      en: "Lara Croft",
      tw: "蘿拉·卡芙特",
      kr: "라라 크로프트",
      fr: "Lara Croft",
      de: "Lara Croft",
      es: "Lara Croft"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Full Auto Shotgun",
          tw: "全自動散彈槍",
          kr: "전자동 샷건",
          fr: "Fusil à pompe automatique",
          de: "Vollautomatikflinte",
          es: "Escopeta automática"
        },
        hitDamage: [
          14, 14, 15, 14, 14, 15, 14
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 42,
        framesList: [0, 8, 8, 8, 8, 8, 16],
        offset: 16,
        base: 160
      },
      {
        id: 2,
        names: {
          en: "Open Wound",
          tw: "皮開肉綻",
          kr: "아물지 않은 상처",
          fr: "Plaie ouverte",
          de: "Offene Wunde",
          es: "Heridas abiertas"
        },
        hitDamage: [
          14, 14, 14, 14, 14, 15, 15
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 2,
        framesList: [0, 8, 8, 8, 8, 8, 8],
        offset: 36,
        base: 200
      },
      {
        id: 3,
        names: {
          en: "Automatic Pistols",
          tw: "自動火槍",
          kr: "자동 권총",
          fr: "Pistolets automatiques",
          de: "Automatikpistolen",
          es: "Pistolas automáticas"
        },
        hitDamage: [
          16, 16, 16, 16, 16, 20
        ],
        castTime: 20,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 60,
        framesList: [0, 6, 6, 6, 6, 6],
        offset: 16,
        base: 220
      },
      {
        id: 4,
        names: {
          en: "Blaze of Glory",
          tw: "炎炎烈日",
          kr: "영광의 불꽃",
          fr: "Étincelle de gloire",
          de: "Ruhmesglanz",
          es: "Llamarada de gloria"
        },
        hitDamage: [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        castTime: 15,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 12,
        framesList: [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        offset: 16,
        base: 800,
        dualable: false
      }
    ]
  },
  {
    id: 108,
    names: {
      en: "Leviathan",
      tw: "利維坦",
      kr: "리바이어선",
      fr: "Léviathan",
      de: "Leviathan",
      es: "Leviatán"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Tsunami (2)",
          tw: "大海嘯 (2)",
          kr: "대해일 (2)",
          fr: "Tsunami (2)",
          de: "Tsunami (2)",
          es: "Tsunami (2)"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        elements: [
          "water"
        ],
        debuffs: [],
        dualable: false,
        ignore: 0,
        type: "magic",
        base: 38000,
        firstHit: 120,
        framesList: [0],
        offset: 8
      }
    ]
  },
  {
    id: 109,
    names: {
      en: "Kunshira",
      tw: "庫西拉",
      kr: "쿤시라",
      fr: "Kunshira",
      de: "Kunshira",
      es: "Kunshira"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Firaja Blade",
          tw: "強火焰劍",
          kr: "파이쟈 검",
          fr: "Lame feu max",
          de: "Feuka-Klinge",
          es: "Hoja Piro++"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "hybrid",
        elements: [
          "fire"
        ],
        debuffs: [],
        firstHit: 170,
        framesList: [0],
        offset: 8,
        base: 800,
        type: "finish"
      },
      {
        id: 2,
        names: {
          en: "Waterja Blade",
          tw: "強流水劍",
          kr: "워터쟈 검",
          fr: "Lame eau max",
          de: "Aquaka-Klinge",
          es: "Hoja Aqua++"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "hybrid",
        elements: [
          "water"
        ],
        debuffs: [],
        firstHit: 150,
        framesList: [0],
        offset: 8,
        base: 800,
        type: "finish"
      },
      {
        id: 3,
        names: {
          en: "Thundaja Blade",
          tw: "強雷電劍",
          kr: "선더쟈 검",
          fr: "Lame foudre max",
          de: "Blitzka-Klinge",
          es: "Hoja Electro++"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "hybrid",
        elements: [
          "lightning"
        ],
        debuffs: [],
        firstHit: 110,
        framesList: [0],
        offset: 8,
        base: 800,
        type: "finish"
      },
      {
        id: 4,
        names: {
          en: "Aeoroja Blade",
          tw: "強勁風劍",
          kr: "에어로쟈 검",
          fr: "Lame vent max",
          de: "Aeroka-Klinge",
          es: "Hoja Aero++"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "hybrid",
        elements: [
          "wind"
        ],
        debuffs: [],
        firstHit: 130,
        framesList: [0],
        offset: 8,
        base: 800,
        type: "finish"
      },
      {
        id: 5,
        names: {
          en: "Holy Blade",
          tw: "神聖劍",
          kr: "홀리 검",
          fr: "SidéLame",
          de: "Sanctusklinge",
          es: "Hoja Sanctus"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "hybrid",
        elements: [
          "light"
        ],
        debuffs: [],
        firstHit: 410,
        framesList: [0],
        offset: 8,
        base: 460,
        type: "finish"
      },
      {
        id: 6,
        names: {
          en: "Fire Formation",
          tw: "炎魔劍陣",
          kr: "염마검진",
          fr: "Formation de feu",
          de: "Feuerformation",
          es: "Formación hoja ígnea"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "hybrid",
        elements: [
          "fire"
        ],
        debuffs: [],
        firstHit: 120,
        framesList: [0],
        offset: 16,
        base: 550,
        type: "finish"
      },
      {
        id: 7,
        names: {
          en: "Water Formation",
          tw: "水魔劍陣",
          kr: "수마검진",
          fr: "Formation d'eau",
          de: "Wasserformation",
          es: "Formación hoja acuosa"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "hybrid",
        elements: [
          "water"
        ],
        debuffs: [],
        firstHit: 120,
        framesList: [0],
        offset: 16,
        base: 550,
        type: "finish"
      },
      {
        id: 8,
        names: {
          en: "Lightning Formation",
          tw: "雷魔劍陣",
          kr: "뇌마검진",
          fr: "Formation de foudre",
          de: "Blitzformation",
          es: "Formación hoja eléctrica"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "hybrid",
        elements: [
          "lightning"
        ],
        debuffs: [],
        firstHit: 120,
        framesList: [0],
        offset: 16,
        base: 550,
        type: "finish"
      },
      {
        id: 9,
        names: {
          en: "Wind Formation",
          tw: "風魔劍陣",
          kr: "풍마검진",
          fr: "Formation de vent",
          de: "Windformation",
          es: "Formación hoja aérea"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "hybrid",
        elements: [
          "wind"
        ],
        debuffs: [],
        firstHit: 120,
        framesList: [0],
        offset: 16,
        base: 550,
        type: "finish"
      },
      {
        id: 10,
        names: {
          en: "Light Formation",
          tw: "光魔劍陣",
          kr: "광마검진",
          fr: "Formation de lumière",
          de: "Lichtformation",
          es: "Formación hoja luminosa"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "hybrid",
        elements: [
          "light"
        ],
        debuffs: [],
        firstHit: 120,
        framesList: [0],
        offset: 16,
        base: 550,
        type: "finish"
      },
      {
        id: 11,
        names: {
          en: "Spellblade - Blazing Threat",
          tw: "魔法劍·炎威",
          kr: "마법검·염위",
          fr: "Magilame - Menace ardente",
          de: "Schwertmagie - Flammendrohung",
          es: "Esgrimago - Amenaza ígnea"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        castTime: 0,
        damage: "hybrid",
        elements: [
          "fire"
        ],
        debuffs: [
          {
            type: "fire",
            value: 50
          }
        ],
        firstHit: 2,
        framesList: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        offset: 8,
        base: 550
      },
      {
        id: 12,
        names: {
          en: "Spellblade - Calm Waters",
          tw: "魔法劍·水鏡",
          kr: "마법검·수경",
          fr: "Magilame - Eau calme",
          de: "Schwertmagie - Stille Wasser",
          es: "Esgrimago - Aguas calmadas"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        castTime: 0,
        damage: "hybrid",
        elements: [
          "water"
        ],
        debuffs: [
          {
            type: "water",
            value: 50
          }
        ],
        firstHit: 2,
        framesList: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        offset: 8,
        base: 550
      },
      {
        id: 13,
        names: {
          en: "Spellblade - Roaring Thunder",
          tw: "魔法劍·轟雷",
          kr: "마법검·굉뢰",
          fr: "Magilame - Éclair rugissant",
          de: "Schwertmagie - Brüllender Donner",
          es: "Esgrimago - Trueno rugidor"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        castTime: 0,
        damage: "hybrid",
        elements: [
          "lightning"
        ],
        debuffs: [
          {
            type: "lightning",
            value: 50
          }
        ],
        firstHit: 2,
        framesList: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        offset: 8,
        base: 550
      },
      {
        id: 14,
        names: {
          en: "Spellblade - Windstorm",
          tw: "魔法劍·暴風",
          kr: "마법검·폭풍",
          fr: "Magilame - Tempête éolienne",
          de: "Schwertmagie - Sturmwind",
          es: "Esgrimago - Tormenta eólica"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        castTime: 0,
        damage: "hybrid",
        elements: [
          "wind"
        ],
        debuffs: [
          {
            type: "wind",
            value: 50
          }
        ],
        firstHit: 2,
        framesList: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        offset: 8,
        base: 550
      },
      {
        id: 15,
        names: {
          en: "Spellblade - Glittering Light",
          tw: "魔法劍·煌光",
          kr: "마법검·황광",
          fr: "Magilame - Lumière éclatante",
          de: "Schwertmagie - Glitzerndes Licht",
          es: "Esgrimago - Luz destellante"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        castTime: 0,
        damage: "hybrid",
        elements: [
          "light"
        ],
        debuffs: [
          {
            type: "light",
            value: 50
          }
        ],
        firstHit: 2,
        framesList: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        offset: 8,
        base: 550
      },
      {
        id: 16,
        names: {
          en: "Mageblade",
          tw: "魔操劍",
          kr: "마술검",
          fr: "Sabre magique",
          de: "Spruchklinge",
          es: "Sable mágico"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "hybrid",
        elements: [],
        debuffs: [],
        firstHit: 72,
        framesList: [0],
        offset: 8,
        base: 700,
        type: "finish"
      },
      {
        id: 17,
        names: {
          en: "Superior Mageblade",
          tw: "翔·魔操劍",
          kr: "마술검·비상",
          fr: "Sabre magique +",
          de: "Überlegene Spruchklinge",
          es: "Sable mágico+"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "hybrid",
        elements: [],
        debuffs: [],
        firstHit: 12,
        framesList: [0],
        offset: 8,
        base: 1100,
        type: "finish"
      },
      {
        id: 18,
        names: {
          en: "Blade Master",
          tw: "魔劍大師",
          kr: "블레이드 마스터",
          fr: "Maître des lames",
          de: "Meisterklinge",
          es: "Maestro de la espada"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "hybrid",
        elements: [],
        debuffs: [],
        firstHit: 100,
        framesList: [0],
        offset: 8,
        base: 1800,
        type: "finish",
        dualable: false
      }
    ],
  },
  {
    id: 110,
    names: {
      en: "Lotus Mage Fina",
      tw: "白蓮魔道士菲娜",
      kr: "백련의 마도사 피나",
      fr: "Fina, mage du lotus",
      de: "Lotusmagierin Fina",
      es: "Fina maga del loto"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Arch Punisher",
          tw: "弧光執刑者",
          kr: "최고의 형벌자",
          fr: "Arc punisseur",
          de: "Erzbestrafer",
          es: "Archicastigador"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        elements: [
          "light"
        ],
        debuffs: [],
        firstHit: 190,
        framesList: [0],
        offset: 16,
        base: 360,
        type: "finish",
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Dystopia",
          fr: "Dystopie",
          tw: "敵托邦",
          kr: "디스토피아",
          de: "Dystopia",
          es: "Distopía"
        },
        type: "finish",
        framesList: [0],
        firstHit: 120,
        castTime: 40,
        offset: 16,
        base: 600,
        elements: [
          "dark"
        ],
        dualable: false,
        damage: "magic"
      },
      {
        id: 3,
        names: {
          en: "Ultima",
          fr: "Ultima",
          tw: "究極",
          kr: "알테마",
          de: "Ultima",
          es: "Artema"
        },
        type: "finish",
        framesList: [0],
        firstHit: 365,
        castTime: 40,
        offset: 0,
        base: 280,
        ignore: 50,
        damage: "magic",
        magicType: "black",
        dualable: false
      },
      {
        id: 221060,
        names: {
          en: "Sacred Burst",
          tw: "神聖爆發",
          kr: "거룩한 폭발",
          fr: "Éclat sacré",
          de: "Heilige Salve",
          es: "Estallido sacro"
        },
        "hitDamage": [
          14, 15, 14, 14, 14, 14, 15
        ],
        castTime: 40,
        damage: "magic",
        magicType: null,
        elements: [
          "light"
        ],
        debuffs: [],
        firstHit: 162,
        framesList: [0, 8, 8, 8, 8, 8, 8],
        offset: 16,
        base: 525,
        dualable: false
      },
      {
        id: 5,
        names: {
          en: "Judgment Cross",
          tw: "交錯審判",
          kr: "정의의 십자가",
          fr: "Signe du jugement",
          de: "Urteilskreuz",
          es: "Cruz del juicio"
        },
        hitDamage: [
          9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10
        ],
        castTime: 0,
        damage: "magic",
        elements: [],
        debuffs: [
          {
            type: "light",
            value: 50,
          },
          {
            type: "dark",
            value: 50,
          }
        ],
        firstHit: 8,
        framesList: [0, 20, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        offset: 8,
        base: 940,
        dualable: false
      }
    ],
    multipleBlack: 2
  },
  {
    id: 111,
    names: {
      en: "Lulu",
      tw: "露露",
      kr: "루루",
      fr: "Lulu",
      de: "Lulu",
      es: "Lulu"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Waterja",
          tw: "強流水",
          kr: "워터쟈",
          fr: "Eau max",
          de: "Aquaka",
          es: "Aqua+++"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        elements: [
          "water"
        ],
        debuffs: [],
        firstHit: 190,
        framesList: [0],
        offset: 16,
        base: 600,
        type: "finish",
        magicType: "black",
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Thundaja",
          tw: "強雷電",
          kr: "선더쟈",
          fr: "Foudre max",
          de: "Blitzka",
          es: "Electro+++"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        elements: [
          "lightning"
        ],
        debuffs: [],
        firstHit: 150,
        framesList: [0],
        offset: 16,
        base: 600,
        type: "finish",
        magicType: "black",
        dualable: false
      },
      {
        id: 3,
        names: {
          en: "Firaja",
          tw: "強火焰",
          kr: "파이자",
          fr: "Feu max",
          de: "Feuka",
          es: "Piro+++"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        elements: [
          "fire"
        ],
        debuffs: [],
        firstHit: 210,
        framesList: [0],
        offset: 16,
        base: 600,
        type: "finish",
        magicType: "black",
        dualable: false
      },
      {
        id: 4,
        names: {
          en: "Blizzaja",
          tw: "強暴雪",
          kr: "블리자쟈",
          fr: "Glace max",
          de: "Eiska",
          es: "Hielo+++"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        elements: [
          "ice"
        ],
        debuffs: [],
        firstHit: 240,
        framesList: [0],
        offset: 16,
        base: 600,
        type: "finish",
        magicType: "black",
        dualable: false
      },
      {
        id: 5,
        names: {
          en: "Flood",
          tw: "洪水",
          kr: "플러드",
          fr: "Inondation",
          de: "Flut",
          es: "Inundación"
        },
        hitDamage: [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        castTime: 40,
        damage: "magic",
        elements: [
          "water"
        ],
        debuffs: [
          {
            type: "lightning",
            value: 50
          }
        ],
        firstHit: 133,
        framesList: [0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        offset: 16,
        base: 250,
        magicType: "black",
        dualable: false
      },
      {
        id: 6,
        names: {
          en: "Ultima Fury",
          tw: "T·最終究極",
          kr: "T·알테마",
          fr: "Ultima T",
          de: "Ultima-Wut",
          es: "Artema triple"
        },
        hitDamage: [
          16, 16, 17, 17, 17, 17
        ],
        castTime: 0,
        damage: "magic",
        elements: [],
        debuffs: [],
        firstHit: 160,
        framesList: [0, 24, 24, 24, 24, 24],
        offset: 8,
        base: 570,
        ignore: 50,
        dualable: false
      }
    ],
    multipleBlack: 2
  },
  {
    id: 112,
    names: {
      en: "Yuna",
      tw: "優娜",
      kr: "유우나",
      fr: "Yuna",
      de: "Yuna",
      es: "Yuna"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Energy Ray",
          tw: "射擊光線",
          kr: "슈팅·레이",
          fr: "Hurlements",
          de: "Laserstrahl",
          es: "Rayo devastador"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        elements: [],
        debuffs: [],
        firstHit: 300,
        framesList: [0],
        offset: 16,
        base: 900,
        type: "finish",
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Energy Blast",
          tw: "射擊能量",
          kr: "슈팅·파워",
          fr: "Écho",
          de: "Solaris-Strahl",
          es: "Lluvia de muerte"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        elements: [],
        debuffs: [],
        firstHit: 285,
        framesList: [0],
        offset: 16,
        base: 2000,
        type: "finish",
        dualable: false
      }
    ]
  },
  {
    id: 113,
    names: {
      en: "Camille",
      tw: "卡米爾",
      kr: "카밀",
      fr: "Camille",
      de: "Camille",
      es: "Camille"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Swift Tidal Attack",
          tw: "水迅擊流斬",
          kr: "수신경류참",
          fr: "Attaque fluidovéloce",
          de: "Flinker Gezeitenstreich",
          es: "Ataque mareomotriz"
        },
        hitDamage: [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        castTime: 20,
        damage: "physical",
        elements: [],
        debuffs: [
          {
            type: "water",
            value: 50
          }
        ],
        firstHit: 22,
        framesList: [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20],
        offset: 16,
        base: 300
      },
      {
        id: 2,
        names: {
          en: "Earth-shattering Blade",
          tw: "土濤烈波劍",
          kr: "토주열파검",
          fr: "Lame briseterre",
          de: "Erdzerschmetterer",
          es: "Hoja sacudetierra"
        },
        hitDamage: [
          14, 14, 14, 14, 14, 15, 15
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [
          {
            type: "earth",
            value: 50
          }
        ],
        firstHit: 2,
        framesList: [0, 8, 8, 8, 8, 8, 8],
        offset: 36,
        base: 300
      },
      {
        id: 3,
        names: {
          en: "Burying Slash",
          tw: "水地靈劍·葬",
          kr: "물과 땅의 영검",
          fr: "Entaille brûlante",
          de: "Begräbnishieb",
          es: "Cuchillada enterradora"
        },
        hitDamage: [
          20, 20, 20, 20, 20
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [
          {
            type: "water",
            value: 74,
          },
          {
            type: "earth",
            value: 74,
          }
        ],
        firstHit: 26,
        framesList: [0, 10, 16, 80, 48],
        offset: 8,
        base: 740,
        dualable: false
      }
    ]
  },
  {
    id: 114,
    names: {
      en: "Emperor Shera",
      tw: "榭拉皇帝",
      kr: "시엘라 황제",
      fr: "Empereur Shera",
      de: "Imperator Shera",
      es: "Emperador Shera"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Ende Streiten",
          tw: "爭辯結論",
          kr: "투쟁의 끝",
          fr: "Ende Streiten",
          de: "Streitschlichter",
          es: "Tiro finiquitador"
        },
        hitDamage: [
          12, 12, 12, 12, 12, 12, 12, 16
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 16,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
        offset: 8,
        base: 480
      },
      {
        id: 2,
        names: {
          en: "Hell Shaft",
          tw: "地獄轉軸",
          kr: "헬 샤프트",
          fr: "Puit infernal",
          de: "Höllenschacht",
          es: "Pozo infernal"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "physical",
        elements: [
          "fire"
        ],
        debuffs: [],
        firstHit: 20,
        framesList: [0],
        offset: 8,
        base: 230,
        ignore: 25,
        type: "finish"
      },
      {
        id: 3,
        names: {
          en: "Repression",
          tw: "鎮壓",
          kr: "진압",
          fr: "Répression",
          de: "Repression",
          es: "Represión"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "physical",
        elements: [
          "fire"
        ],
        debuffs: [
          {
            type: "fire",
            value: 50
          }
        ],
        firstHit: 210,
        framesList: [0],
        offset: 16,
        base: 200,
        type: "finish"
      },
      {
        id: 4,
        names: {
          en: "Schmerzen",
          tw: "柔美",
          kr: "고통",
          fr: "Schmerzen",
          de: "Schmerzen",
          es: "Schmerzen"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "physical",
        elements: [
          "fire"
        ],
        debuffs: [],
        firstHit: 72,
        framesList: [0],
        offset: 16,
        base: 320,
        type: "finish"
      },
      {
        id: 5,
        names: {
          en: "Eroberung",
          tw: "征服",
          kr: "정복",
          fr: "Lame fantôme",
          de: "Eroberung",
          es: "Hoja de Geist"
        },
        hitDamage: [
          12, 12, 12, 12, 12, 12, 12, 16
        ],
        castTime: 14,
        damage: "physical",
        elements: [],
        debuffs: [
          {
            type: "fire",
            value: 60
          }
        ],
        firstHit: 16,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
        offset: 16,
        base: 420
      },
      {
        id: 6,
        names: {
          en: "Kaiser Verteidiger",
          tw: "皇帝守護",
          kr: "카이저 페어타이디거",
          fr: "Kaiser Verteidige",
          de: "Imperator Protegit!",
          es: "Kaiser Verteidige"
        },
        hitDamage: [
          9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 85,
        framesList: [0, 4, 21, 8, 85, 4, 4, 22, 6, 6, 12],
        offset: 8,
        base: 470,
        ignore: 50,
        dualable: false
      }
    ]
  },
  {
    id: 115,
    names: {
      en: "Nameless Gunner Jake",
      tw: "無名槍士傑科",
      kr: "무명의 총잡이 제이크",
      fr: "Jake, tireur anonyme",
      de: "Namenloser Pistolero Jake",
      es: "Jake el pistolero anónimo"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Dueling",
          tw: "決鬥",
          kr: "결투",
          fr: "Duelisme",
          de: "Duell",
          es: "Duelismo"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 40
        ],
        castTime: 15,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 15,
        framesList: [0, 10, 10, 10, 10, 10, 66],
        offset: 16,
        base: 360
      },
      {
        id: 2,
        names: {
          en: "Vaporiser",
          tw: "高熱射線",
          kr: "기화 장치",
          fr: "Vaporisateur",
          de: "Zerstäuber",
          es: "Evaporizador"
        },
        hitDamage: [
          13, 13, 13, 13, 13, 15
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 46,
        framesList: [0, 6, 6, 6, 6, 13],
        offset: 8,
        base: 250
      },
      {
        id: 3,
        names: {
          en: "Break Style+",
          tw: "破解風格·改",
          kr: "개량형 브레이크 스타일",
          fr: "Style briseur +",
          de: "Brecherstil+",
          es: "Estilo rompedor+"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 50
        ],
        castTime: 14,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 16,
        framesList: [0, 21, 32, 29, 9, 24],
        offset: 16,
        base: 250
      },
      {
        id: 4,
        names: {
          en: "Breakdown",
          tw: "潰擊降低",
          kr: "브레이크 다운",
          fr: "Rupture",
          de: "Zusammenbruch",
          es: "Rotura"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 50
        ],
        castTime: 14,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 16,
        framesList: [0, 21, 32, 29, 9, 24],
        offset: 16,
        base: 250
      },
      {
        id: 5,
        names: {
          en: "Last Shot",
          tw: "最後一射",
          kr: "라스트 샷",
          fr: "Dernier tir",
          de: "Letzter Schuss",
          es: "Disparo final"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 160,
        framesList: [0],
        offset: 16,
        base: 275,
        ignore: 50,
        type: "finish"
      },
      {
        id: 6,
        names: {
          en: "Fatal Barrage",
          tw: "致命火力",
          kr: "치명적 사격",
          fr: "Barrage fatal",
          de: "Tödliches Sperrfeuer",
          es: "Ráfaga mortal"
        },
        hitDamage: [
          11, 11, 11, 11, 11, 11, 11, 23
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 92,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
        offset: 16,
        base: 200,
        ignore: 50
      },
      {
        id: 7,
        names: {
          en: "Flame Assault",
          tw: "灼炎攻擊",
          kr: "화염 공격",
          fr: "Assaut enflammé",
          de: "Flammenangriff",
          es: "Asalto flamígero"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 50
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [
          {
            type: "fire",
            value: 50
          }
        ],
        firstHit: 42,
        framesList: [0, 10, 10, 10, 10, 10],
        offset: 8,
        base: 100
      },
      {
        id: 8,
        names: {
          en: "Ice Assault",
          tw: "寒冰攻擊",
          kr: "빙설 공격",
          fr: "Assaut glacé",
          de: "Eisangriff",
          es: "Asalto gélido"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 50
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [
          {
            type: "ice",
            value: 50
          }
        ],
        firstHit: 42,
        framesList: [0, 10, 10, 10, 10, 10],
        offset: 8,
        base: 100
      },
      {
        id: 9,
        names: {
          en: "Electro Assault",
          tw: "雷電攻擊",
          kr: "전격 공격",
          fr: "Assaut électrique",
          de: "Elektroangriff",
          es: "Asalto eléctrico"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 50
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [
          {
            type: "lightning",
            value: 50
          }
        ],
        firstHit: 42,
        framesList: [0, 10, 10, 10, 10, 10],
        offset: 8,
        base: 100
      },
      {
        id: 10,
        names: {
          en: "Light Assault",
          tw: "閃光攻擊",
          kr: "광선 공격",
          fr: "Assaut lumineux",
          de: "Lichtangriff",
          es: "Asalto luminoso"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 50
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [
          {
            type: "light",
            value: 50
          }
        ],
        firstHit: 42,
        framesList: [0, 10, 10, 10, 10, 10],
        offset: 8,
        base: 100
      },
      {
        id: 11,
        names: {
          en: "AL Type Light Particle Beam",
          tw: "AL式魔電粒子炮",
          kr: "AL식 마전입자포",
          fr: "Rayon à particules de lum. type AL",
          de: "AL-Typ Lichtpartikelstrahl",
          es: "Rayo de partículas de luz tipo AL"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 150,
        framesList: [0],
        offset: 8,
        base: 720,
        ignore: 50,
        type: "finish",
        dualable: false
      }
    ]
  },
  {
    id: 116,
    names: {
      en: "Emilia",
      tw: "埃米利亞",
      kr: "에밀리아",
      fr: "Émilia",
      de: "Emilia",
      es: "Emilia"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Throwing Fall",
          tw: "拋落",
          kr: "슬로잉 폴",
          fr: "Chute ralentie",
          de: "Gebremster Fall",
          es: "Caída ralentizada"
        },
        hitDamage: [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 42,
        framesList: [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        offset: 14,
        base: 250
      },
      {
        id: 2,
        names: {
          en: "Into Darkness",
          tw: "黑暗降臨",
          kr: "어둠 속으로",
          fr: "Obscurité sans fin",
          de: "Ins Dunkel",
          es: "Oscuridad profunda"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "physical",
        elements: [
          "dark"
        ],
        debuffs: [],
        firstHit: 23,
        framesList: [0],
        offset: 8,
        base: 420,
        type: "finish"
      },
      {
        id: 3,
        names: {
          en: "Funeral Knife",
          tw: "葬禮之刃",
          kr: "장례의 나이프",
          fr: "Couteau funéraire",
          de: "Begräbnismesser",
          es: "Cuchillo funerario"
        },
        hitDamage: [
          11, 11, 11, 11, 11, 11, 11, 11, 12
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 42,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10, 10],
        offset: 16,
        base: 325
      },
      {
        id: 4,
        names: {
          en: "Throwing Knife",
          tw: "緩速小刀",
          kr: "스로잉 나이프",
          fr: "Couteau de lancer",
          de: "Wurfmesser",
          es: "Cuchillada voladora"
        },
        hitDamage: [
          16, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 42,
        framesList: [0, 39, 4, 4, 4, 4, 4, 89, 4, 4, 4, 4, 4, 4, 4],
        offset: 8,
        base: 840,
        dualable: false
      }
    ]
  },
  {
    id: 117,
    names: {
      en: "Lightning",
      tw: "雷光",
      kr: "라이트닝",
      fr: "Lightning",
      de: "Lightning",
      es: "Lightning"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Area Blitz",
          tw: "區域衝擊波",
          kr: "구역 블래스트",
          fr: "Fauchage",
          de: "Rundumschlag",
          es: "Golpe circular"
        },
        hitDamage: [
          20, 20, 20, 20, 20
        ],
        castTime: 12,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 14,
        framesList: [0, 28, 26, 23, 43],
        offset: 16,
        base: 180
      },
      {
        id: 2,
        names: {
          en: "Area Blast +2",
          tw: "區域衝擊波 +2",
          kr: "구역 블래스트 +2",
          fr: "Fauchage +2",
          de: "Rundumschlag +2",
          es: "Golpe circular +2"
        },
        hitDamage: [
          20, 20, 20, 20, 20
        ],
        castTime: 12,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 14,
        framesList: [0, 28, 26, 23, 43],
        offset: 16,
        base: 220
      },
      {
        id: 3,
        names: {
          en: "Crushing Blow",
          tw: "絕影",
          kr: "절영",
          fr: "Charge éclair",
          de: "Zerstörer",
          es: "Arremetida"
        },
        hitDamage: [
          20, 20, 30, 30
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [
          {
            type: "lightning",
            value: 20
          }
        ],
        firstHit: 42,
        framesList: [0, 20, 30, 2],
        offset: 16,
        base: 270
      },
      {
        id: 4,
        names: {
          en: "Crushing Blow +2",
          tw: "絕影 +2",
          kr: "절영 +2",
          fr: "Charge éclair +2",
          de: "Zerstörer +2",
          es: "Arremetida +2"
        },
        hitDamage: [
          20, 20, 30, 30
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [
          {
            type: "lightning",
            value: 75
          }
        ],
        firstHit: 42,
        framesList: [0, 20, 30, 2],
        offset: 16,
        base: 350
      },
      {
        id: 5,
        names: {
          en: "Electric Blitz",
          tw: "電氣衝擊波",
          kr: "일렉트릭 블래스트",
          fr: "Électro-explosion",
          de: "Elektrische Walze",
          es: "Azote eléctrico"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "physical",
        elements: [
          "lightning"
        ],
        debuffs: [],
        firstHit: 30,
        framesList: [0],
        offset: 8,
        base: 200,
        type: "finish"
      },
      {
        id: 6,
        names: {
          en: "Heat Blitz",
          tw: "高溫衝擊波",
          kr: "히트 블래스트",
          fr: "Pyro-explosion",
          de: "Glutwalze",
          es: "Azote caluroso"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "physical",
        elements: [
          "fire"
        ],
        debuffs: [],
        firstHit: 110,
        framesList: [0],
        offset: 16,
        base: 190,
        type: "finish"
      },
      {
        id: 7,
        names: {
          en: "Ice Blitz",
          tw: "冰凍衝擊波",
          kr: "아이스 블래스트",
          fr: "Cryo-explosion",
          de: "Eiswalze",
          es: "Azote frío"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "physical",
        elements: [
          "ice"
        ],
        debuffs: [],
        firstHit: 110,
        framesList: [0],
        offset: 16,
        base: 190,
        type: "finish"
      },
      {
        id: 8,
        names: {
          en: "Aero Blitz",
          tw: "勁風衝擊波",
          kr: "에어로 블래스트",
          fr: "Aéro-explosion",
          de: "Aero-Walze",
          es: "Azote eólico"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "physical",
        elements: [
          "wind"
        ],
        debuffs: [],
        firstHit: 70,
        framesList: [0],
        offset: 16,
        base: 190,
        type: "finish"
      },
      {
        id: 9,
        names: {
          en: "Army of One",
          tw: "王牌驅散",
          kr: "신 드라이브",
          fr: "Combo éclair",
          de: "Ein-Mann-Armee",
          es: "Andanada"
        },
        hitDamage: [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuffs: [],
        firstHit: 39,
        framesList: [0, 14, 14, 34, 32, 42, 3, 7, 3, 24, 3, 31, 50, 3, 3, 4, 3, 3, 3, 3],
        offset: 8,
        base: 410,
        dualable: false
      }
    ]
  },
  {
    id: 118,
    names: {
      en: "Phoenix",
      tw: "地獄鳳凰",
      kr: "피닉스",
      fr: "Phénix",
      de: "Phönix",
      es: "Fénix"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Flames of Rebirth (2)",
          tw: "轉生之炎 (2)",
          kr: "윤회의 불꽃 (2)",
          fr: "Feu résurrecteur (2)",
          de: "Reinkarnationsflamme (2)",
          es: "Llamas del renacer (2)"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        elements: [
          "fire"
        ],
        debuffs: [],
        dualable: false,
        type: "finish",
        ignore: 0,
        damage: "magic",
        base: 8200,
        firstHit: 110,
        framesList: [0],
        offset: 8
      }
    ]
  },
  {
    id: 119,
    names: {
      en: "Orochi",
      tw: "八俁遠呂智",
      kr: "야마타노오로치",
      fr: "Hydragon",
      de: "Orochi",
      es: "Hidra"
    },
    abilities: [
      {
        id: 503070,
        names: {
          en: "Shock and Claw",
          tw: "恐怖之爪",
          kr: "공포의 발톱",
          fr: "Griffe de l'effroi",
          de: "Garstige Krallen",
          es: "Garra de espanto"
        },
        hitDamage: [
          20, 20, 60
        ],
        castTime: 32,
        damage: "physical",
        elements: [],
        debuff: [],
        firstHit: 34,
        framesList: [0, 26, 92],
        offset: 16,
        base: 225,
        ignore: 50
      },
      {
        id: 306000206,
        names: {
          en: "Purgatory Pyre",
          tw: "煉獄火焰",
          kr: "지옥의 화염",
          fr: "Tout feu tout flamme",
          de: "Feurige Säuberung",
          es: "Pira purgativa"
        },
        hitDamage: [
          8, 7, 8, 8, 7, 8, 7, 8, 7, 8, 8, 8, 8
        ],
        castTime: 0,
        damage: "hybrid",
        elements: [
          "fire"
        ],
        debuff: [],
        firstHit: 95,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 14],
        offset: 8,
        base: 610,
        dualable: false
      }
    ]
  },
  {
    id: 120,
    names: {
      en: "Dragonlord",
      tw: "龍王",
      kr: "용왕",
      fr: "Lordragon",
      de: "Drachenfürst",
      es: "Draconarius"
    },
    abilities: [
      {
        id: 205570,
        names: {
          en: "Kafrizzle",
          tw: "美拉蓋亞",
          kr: "메라가이아",
          fr: "Gigaflamme",
          de: "Schmurgel",
          es: "Superataque ígneo"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        elements: [
          "fire"
        ],
        debuff: [],
        firstHit: 240,
        framesList: [0],
        offset: 16,
        base: 2000,
        type: "finish",
        dualable: false
      },
      {
        id: 306000106,
        names: {
          en: "Dark Temptation",
          tw: "黑暗邀請",
          kr: "어둠으로의 초대",
          fr: "Tentation obscure",
          de: "Dunkle Versuchung",
          es: "Tentación oscura"
        },
        hitDamage: [
          20, 20, 20, 20, 20
        ],
        castTime: 0,
        damage: "physical",
        elements: [],
        debuff: [],
        firstHit: 149,
        framesList: [0, 9, 9, 9, 9],
        offset: 8,
        base: 390,
        dualable: false
      }
    ]
  },
  {
    id: 121,
    names: {
      en: "Lila",
      tw: "利拉",
      kr: "리라",
      fr: "Lila",
      de: "Lila",
      es: "Lila"
    },
    abilities: [
      {
        id: 224660,
        names: {
          en: "Martial Arts - Heaven Shift",
          tw: "格鬥術·操氣天沖",
          kr: "격투술·조기천충",
          fr: "Art martial - Chang. céleste",
          de: "Kampfkunst - Himmlischer Stoß",
          es: "Artes marciales - Cambio celeste"
        },
        hitDamage: [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10, 10, 10, 10
        ],
        castTime: 8,
        damage: "physical",
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 8,
        framesList: [0, 5, 5, 5, 5, 5, 5, 5, 7, 7, 10, 10, 10, 10],
        offset: 83,
        base: 1000
      },
      {
        id: 224650,
        names: {
          en: "Martial Arts - Overthrow",
          tw: "格鬥術·操氣滅升",
          kr: "격투술·조기멸승",
          fr: "Art martial - Renversement",
          de: "Kampfkunst - Überwindung",
          es: "Artes marciales - Llave celeste"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "physical",
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 120,
        framesList: [0],
        offset: 16,
        base: 650,
        type: "finish"
      },
      {
        id: 224670,
        names: {
          en: "Martial Arts - Heaven Scar",
          tw: "格鬥術·操氣裂天",
          kr: "격투술·조기열천",
          fr: "Art martial - Cicatrice céleste",
          de: "Kampfkunst - Himmelsspalter",
          es: "Artes marciales - Cicatriz celeste"
        },
        hitDamage: [
          15, 15, 15, 55
        ],
        castTime: 8,
        damage: "physical",
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 22,
        framesList: [0, 16, 37, 81],
        offset: 16,
        base: 750
      },
      {
        id: 224680,
        names: {
          en: "Martial Arts - Tojin Combo",
          tw: "格鬥術·鬥神連擊",
          kr: "격투술·투신연격",
          fr: "Art martial - Combo Tojin",
          de: "Kampfkunst - Salve des Kriegsgottes",
          es: "Artes marciales - Combo Tojin"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 40
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 10,
        framesList: [0, 10, 10, 10, 10, 10, 10],
        offset: 32,
        base: 520
      },
      {
        id: 100013806,
        names: {
          en: "Flower Barrage",
          tw: "六華仙裂",
          kr: "육화선열",
          fr: "Déluge de fleurs",
          de: "Blumenbeschuss",
          es: "Descarga floral"
        },
        hitDamage: [
          15, 10, 10, 10, 10, 10, 10, 10, 15
        ],
        castTime: 0,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 49,
        framesList: [0, 16, 16, 12, 8, 15, 6, 3, 54],
        offset: 8,
        base: 1240
      }
    ],
    multiCasts: [
      {
        count: 3,
        abilities: [
          224650,
          224660,
          224670,
          224680
        ]
      }
    ],
    multipleBlack: 1,
    multipleWhite: 1,
    multipleGreen: 1
  },
  {
    id: 122,
    names: {
      en: "Sephiroth",
      tw: "賽菲羅斯",
      kr: "세피로스",
      fr: "Séphiroth",
      de: "Sephiroth",
      es: "Sefirot"
    },
    abilities: [
      {
        id: 224510,
        names: {
          en: "Oblivion",
          tw: "虛空",
          kr: "허공",
          fr: "Chaos",
          de: "Vergessenheit",
          es: "Olvido"
        },
        hitDamage: [
          33, 33, 34
        ],
        castTime: 0,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 22,
        framesList: [0, 20, 30],
        offset: 8,
        base: 360
      },
      {
        id: 224520,
        names: {
          en: "The Heavens Wept",
          tw: "天舞輪迴斬",
          kr: "천무윤회참",
          fr: "Affliction céleste",
          de: "Samsara-Spalter",
          es: "Furia transmigratoria"
        },
        hitDamage: [
          14, 14, 14, 14, 14, 14, 16
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [
          {
            type: "light",
            value: 60
          },
          {
            type: "dark",
            value: 60
          }
        ],
        dualable: true,
        firstHit: 70,
        framesList: [0, 7, 5, 7, 7, 7, 7],
        offset: 16,
        base: 480
      },
      {
        id: 224550,
        names: {
          en: "Black Materia",
          tw: "黑色魔晶石",
          kr: "블랙 마테리아",
          fr: "Matéria noire",
          de: "Schwarze Materia",
          es: "Materia negra"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: null,
        elements: [],
        debuffs: [
          {
            type: "light",
            value: 70
          },
          {
            type: "dark",
            value: 70
          }
        ],
        dualable: false,
        firstHit: 350,
        framesList: [0],
        offset: 16,
        base: 180,
        ignore: 50,
        type: "finish"
      },
      {
        id: 224530,
        names: {
          en: "Aeolian Onslaught",
          tw: "一陣",
          kr: "일진",
          fr: "Charge éolienne",
          de: "Windböe",
          es: "Cortavientos"
        },
        hitDamage: [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 42,
        framesList: [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        offset: 14,
        base: 500
      },
      {
        id: 224540,
        names: {
          en: "Heaven's Light",
          tw: "天照",
          kr: "천국의 빛",
          fr: "Lumière des cieux",
          de: "Himmelslicht",
          es: "Luz del cielo"
        },
        hitDamage: [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10
        ],
        castTime: 0,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 0,
        framesList: [0, 14, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 6],
        offset: 80,
        base: 270,
        ignore: 50
      },
      {
        id: 224570,
        names: {
          en: "Octaslash",
          tw: "八刀一閃",
          kr: "팔도일섬",
          fr: "Octofrappe",
          de: "Achtstreich",
          es: "Octacorte"
        },
        hitDamage: [
          6, 6, 6, 6, 6, 6, 6, 58
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 42,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
        offset: 16,
        base: 250,
        ignore: 50
      },
      {
        id: 207001006,
        names: {
          en: "One-Winged Angel",
          tw: "獨翼天使",
          kr: "편익의 천사",
          fr: "Ange à une aile",
          de: "Einflügliger Engel",
          es: "Fulgor seráfico"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [
          {
            type: "light",
            value: 100
          },
          {
            type: "dark",
            value: 100
          }
        ],
        dualable: false,
        firstHit: 220,
        framesList: [0],
        offset: 8,
        base: 600,
        ignore: 50,
        type: "finish"
      }
    ],
    multipleBlack: 1,
    multipleWhite: 1,
    multipleGreen: 1
  },
  {
    id: 123,
    names: {
      en: "Heltich",
      tw: "海爾蒂克",
      kr: "헬틱",
      fr: "Heltich",
      de: "Heltich",
      es: "Heltich"
    },
    abilities: [
      {
        id: 506240,
        names: {
          en: "Originating Swirl",
          tw: "根源災禍",
          kr: "근원의 소용돌이",
          fr: "Tourbillon original",
          de: "Ursprungswirbel",
          es: "Torbellino original"
        },
        hitDamage: [
          14, 14, 14, 14, 14, 14, 16
        ],
        castTime: 40,
        damage: "magic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 82,
        framesList: [0, 10, 10, 10, 10, 10, 10],
        offset: 16,
        base: 320,
        ignore: 25
      },
      {
        id: 506250,
        names: {
          en: "True Originating Swirl",
          tw: "真·根源災禍",
          kr: "진·근원의 소용돌이",
          fr: "Tourbillon originel X",
          de: "Wahrer Ursprungswirbel",
          es: "Torbellino original+"
        },
        hitDamage: [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        castTime: 40,
        damage: "magic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 120,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        offset: 16,
        base: 320,
        ignore: 50
      },
      {
        id: 506260,
        names: {
          en: "Soul Drive",
          tw: "靈魂驅動",
          kr: "소울 드라이브",
          fr: "Sursaut d'âme",
          de: "Seelenschub",
          es: "Picado del alma"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 200,
        framesList: [0],
        offset: 16,
        base: 660,
        type: "finish"
      },
      {
        id: 100005706,
        names: {
          en: "Despair",
          tw: "絕望",
          kr: "절망",
          fr: "Désespoir",
          de: "Verzweiflung",
          es: "Desesperación"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "magic",
        magicType: null,
        elements: [
          "dark"
        ],
        debuffs: [],
        dualable: false,
        firstHit: 107,
        framesList: [0],
        offset: 8,
        base: 940,
        type: "finish"
      }
    ],
    multipleBlack: 2,
    multipleWhite: 1,
    multipleGreen: 1
  },
  {
    id: 124,
    names: {
      en: "Killian",
      tw: "希里安",
      kr: "킬리언",
      fr: "Killian",
      de: "Killian",
      es: "Killian"
    },
    abilities: [
      {
        id: 224000,
        names: {
          en: "Flashover",
          tw: "閃絡",
          kr: "섬략",
          fr: "Feu soudain",
          de: "Lichtbogen",
          es: "Combustión súbita"
        },
        hitDamage: [
          100
        ],
        castTime: 48,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [
          {
            type: "fire",
            value: 50
          }
        ],
        dualable: true,
        firstHit: 68,
        framesList: [0],
        offset: 16,
        base: 350,
        type: "finish"
      },
      {
        id: 224020,
        names: {
          en: "Gear-up",
          tw: "換檔加速",
          kr: "기어 상승",
          fr: "Préparation",
          de: "Gang hochschalten",
          es: "Cambio de marcha"
        },
        hitDamage: [
          100
        ],
        castTime: 38,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 78,
        framesList: [0],
        offset: 16,
        base: 400,
        type: "finish"
      },
      {
        id: 100013406,
        names: {
          en: "Blazing Drive",
          tw: "炙炎衝擊",
          kr: "블레이징 드라이브",
          fr: "Frappe brûlante",
          de: "Lodernder Schub",
          es: "Golpe abrasador"
        },
        hitDamage: [
          20, 20, 20, 40
        ],
        castTime: 0,
        damage: "physic",
        magicType: null,
        elements: [
          "fire"
        ],
        debuffs: [
          {
            type: "fire",
            value: 84
          }
        ],
        dualable: false,
        firstHit: 145,
        framesList: [0, 22, 58, 56],
        offset: 8,
        base: 840
      }
    ],
    multiCasts: [
      {
        count: 4,
        abilities: [
          224020
        ]
      }
    ],
    multipleBlack: 1,
    multipleWhite: 1,
    multipleGreen: 1
  },
  {
    id: 125,
    names: {
      en: "Heavenly Technician Lid",
      tw: "星虹技師里德",
      kr: "성홍의 기술자 리드",
      fr: "Lid, ingénieure cosmique",
      de: "Himmlische Technikerin Lid",
      es: "Lid ingeniera cósmica"
    },
    abilities: [
      {
        id: 223840,
        names: {
          en: "Sunlight Beam",
          tw: "太陽光束",
          kr: "선 라이트 빔",
          fr: "Rayon du soleil",
          de: "Sonnenstrahl",
          es: "Rayo solar"
        },
        hitDamage: [
          11, 11, 11, 11, 11, 11, 11, 23
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 92,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
        offset: 16,
        base: 200
      },
      {
        id: 506190,
        names: {
          en: "Running Fire+",
          tw: "牙式連發火槍·改",
          kr: "개량형 아식연발총",
          fr: "Tirs nourris +",
          de: "Lauffeuer+",
          es: "Bioametralladora+"
        },
        hitDamage: [
          2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 42,
        framesList: [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        offset: 16,
        base: 320,
        ignore: 25
      },
      {
        id: 506200,
        names: {
          en: "Explosive Type Panic Shells",
          tw: "炸裂式哀鳴彈",
          kr: "작렬식 아비규환탄",
          fr: "Cartouches de panique explosives",
          de: "Explodierende Pandämoniumkugeln",
          es: "Cartuchos de pánico explosivos"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 425,
        framesList: [0],
        offset: 16,
        base: 1200,
        type: "finish"
      },
      {
        id: 100011906,
        names: {
          en: "Mechabo Custom Hammer",
          tw: "機械鳥特製鐵錘",
          kr: "메카보 해머 커스텀",
          fr: "Marteau personnalisé de mécabo",
          de: "Mechabo-Maßhammer",
          es: "Martillo personalizable de Chocobot"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 4,
        framesList: [0],
        offset: 8,
        base: 940,
        type: "finish"
      }
    ],
    multipleBlack: 1,
    multipleWhite: 1,
    multipleGreen: 1
  },
  {
    id: 126,
    names: {
      en: "Pure Summoner Rydia",
      tw: "無瑕召喚士莉迪亞",
      kr: "순수의 소환사 리디아",
      fr: "Rydia, pure invocatrice",
      de: "Reine Beschwörerin Rydia",
      es: "Rydia invocadora pura"
    },
    abilities: [
      {
        id: 223400,
        names: {
          en: "Eidolon Chocobo Kick",
          tw: "幻獸陸行鳥的踢腿",
          kr: "환수 초코보의 발차기",
          fr: "Éon : Coup de chocobo",
          de: "Beschwörbarer Chocobo: Tritt",
          es: "Eidolón: patada chocobo"
        },
        hitDamage: [
          20, 20, 20, 20, 20
        ],
        castTime: 40,
        damage: "magic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 50,
        framesList: [0, 10, 10, 10, 10],
        offset: 16,
        base: 500
      },
      {
        id: 223420,
        names: {
          en: "Eidolon Cockatrice Peck",
          tw: "幻獸蛇雞獸的喙",
          kr: "환수 코카트리스의 부리",
          fr: "Éon : Bec de Coquatrice",
          de: "Beschwörbarer Basilisk: Schnabel",
          es: "Eidolón: picotazo de cocatriz"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: null,
        elements: [
          "earth"
        ],
        debuffs: [],
        dualable: false,
        firstHit: 80,
        framesList: [0],
        offset: 16,
        base: 1000,
        type: "finish"
      },
      {
        id: 20400,
        names: {
          en: "Quake",
          tw: "地槌",
          kr: "퀘이크",
          fr: "Séisme",
          de: "Beben",
          es: "Seísmo"
        },
        hitDamage: [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "earth"
        ],
        debuffs: [
          {
            type: "earth",
            value: 50
          }
        ],
        dualable: false,
        firstHit: 160,
        framesList: [0, 22, 21, 22, 23, 23, 22, 23],
        offset: 16,
        base: 275
      },
      {
        id: 20390,
        names: {
          en: "Tornado",
          tw: "龍捲風",
          kr: "토네이도",
          fr: "Tornade",
          de: "Tornado",
          es: "Tornado"
        },
        hitDamage: [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "wind"
        ],
        debuffs: [
          {
            type: "wind",
            value: 50
          }
        ],
        dualable: false,
        firstHit: 212,
        framesList: [0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        offset: 16,
        base: 250
      },
      {
        id: 20350,
        names: {
          en: "Flare",
          tw: "核爆",
          kr: "플레어",
          fr: "Brasier",
          de: "Flamme",
          es: "Fulgor"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "fire"
        ],
        debuffs: [
          {
            type: "water",
            value: 30
          }
        ],
        dualable: false,
        firstHit: 240,
        framesList: [0],
        offset: 16,
        base: 230,
        type: "finish"
      },
      {
        id: 223430,
        names: {
          en: "Eidolon Mindflayer's Chant",
          tw: "幻獸奪心魔的詠唱",
          kr: "환수 마인드 플레어의 영창",
          fr: "Éon : Chant de Psychopolype",
          de: "Beschwörbarer Gedankenschinder: Intonation",
          es: "Eidolón: canto del mentalis"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: null,
        elements: [
          "water"
        ],
        debuffs: [],
        dualable: false,
        firstHit: 140,
        framesList: [0],
        offset: 16,
        base: 1600,
        type: "finish"
      },
      {
        id: 20430,
        names: {
          en: "Meteor",
          tw: "隕石",
          kr: "메테오",
          fr: "Météore",
          de: "Meteo",
          es: "Meteo"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 350,
        framesList: [0],
        offset: 16,
        base: 250,
        ignore: 25,
        type: "finish"
      },
      {
        id: 223410,
        names: {
          en: "Eidolon Bomb Explosion",
          tw: "幻獸炸彈的自爆",
          kr: "환수 봄의 자폭",
          fr: "Éon : Explosion de Bombo",
          de: "Beschwörbarer Bomber : Explosion",
          es: "Eidolón: explosión bom"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: null,
        elements: [
          "fire"
        ],
        debuffs: [],
        dualable: false,
        firstHit: 150,
        framesList: [0],
        offset: 16,
        base: 1800,
        type: "finish"
      },
      {
        id: 204001506,
        names: {
          en: "Esper Mist Dragon Breath",
          tw: "幻獸霧龍的吐息",
          kr: "환수 미스트 드래곤의 순결",
          fr: "Éon dragon des brumes : souffle",
          de: "Esper Nebeldrache: Atem",
          es: "Esper dragón de Mist: aliento"
        },
        hitDamage: [
          2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3
        ],
        castTime: 188,
        damage: "magic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 188,
        framesList: [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        offset: 16,
        base: 2000
      }
    ],
    multipleBlack: 2,
    multipleWhite: 1,
    multipleGreen: 1
  },
  {
    id: 127,
    names: {
      en: "Atoning Dragoon Kain",
      tw: "極致龍騎士凱因",
      kr: "궁극의 용기사 카인",
      fr: "Kaïn, dragonnier repenti",
      de: "Sühnender Dragoner Kain",
      es: "Kain, dragontino redentor"
    },
    abilities: [
      {
        id: 223500,
        names: {
          en: "Piercing Darkness",
          tw: "刺骨黑暗",
          kr: "피어싱 스크로",
          fr: "Ténèbres perçantes",
          de: "Dunkeldurchstoß",
          es: "Tiniebla penetrante"
        },
        hitDamage: [
          9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10
        ],
        castTime: 0,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [
          {
            type: "dark",
            value: 50
          }
        ],
        dualable: true,
        firstHit: 2,
        framesList: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        offset: 8,
        base: 350
      },
      {
        id: 223490,
        names: {
          en: "Piercing Aqua",
          tw: "刺骨冰水",
          kr: "피어싱 아쿠아",
          fr: "Eau perçante",
          de: "Wasserdurchstoß",
          es: "Agua penetrante"
        },
        hitDamage: [
          9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10
        ],
        castTime: 0,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [
          {
            type: "water",
            value: 50
          }
        ],
        dualable: true,
        firstHit: 2,
        framesList: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        offset: 8,
        base: 350
      },
      {
        id: 223480,
        names: {
          en: "Piercing Air",
          tw: "刺骨寒風",
          kr: "피어싱 에어",
          fr: "Vent perçant",
          de: "Luftdurchstoß",
          es: "Viento penetrante"
        },
        hitDamage: [
          9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10
        ],
        castTime: 0,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [
          {
            type: "wind",
            value: 50
          }
        ],
        dualable: true,
        firstHit: 2,
        framesList: [0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        offset: 8,
        base: 350
      },
      {
        id: 223470,
        names: {
          en: "Sonic Gale",
          tw: "音速颶風",
          kr: "소닉 게일",
          fr: "Siroco sonique",
          de: "Schallsturm",
          es: "Siroco sónico"
        },
        hitDamage: [
          14, 14, 14, 14, 14, 14, 16
        ],
        castTime: 0,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 6,
        framesList: [0, 8, 8, 8, 8, 8, 8],
        offset: 8,
        base: 225,
        ignore: 50
      },
      {
        id: 204001606,
        names: {
          en: "Dragon's Bane",
          tw: "龍禍",
          kr: "드래곤 베인",
          fr: "Fléau du dragon",
          de: "Drachenunheil",
          es: "Pesadilla del dragón"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 182,
        framesList: [0],
        offset: 8,
        base: 570,
        ignore: 50,
        type: "finish"
      }
    ],
    multiCasts: [
      {
        count: 1,
        abilities: []
      }
    ],
    multipleBlack: 1,
    multipleWhite: 1,
    multipleGreen: 1
  },
  {
    id: 128,
    names: {
      en: "Yang",
      tw: "楊",
      kr: "얀",
      fr: "Yang",
      de: "Yang",
      es: "Yang"
    },
    abilities: [
      {
        id: 223790,
        names: {
          en: "All-out Scuffle",
          tw: "全力格鬥",
          kr: "전력 격투",
          fr: "Rixe totale",
          de: "Kompromissloser Nahkampf",
          es: "Reyerta total"
        },
        hitDamage: [
          16, 16, 16, 16, 16, 20
        ],
        castTime: 0,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 2,
        framesList: [0, 8, 8, 8, 8, 8],
        offset: 8,
        base: 200,
        ignore: 50
      },
      {
        id: 204000706,
        names: {
          en: "Happo Ranbu",
          tw: "八方亂舞",
          kr: "팔방난무",
          fr: "Happo Ranbu",
          de: "Happo Ranbu",
          es: "Happo Ranbu"
        },
        hitDamage: [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        castTime: 0,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 32,
        framesList: [0, 3, 18, 18, 3, 23, 3, 20, 26, 3, 34, 4],
        offset: 8,
        base: 840
      }
    ],
    multiCasts: [
      {
        count: 2,
        abilities: [
          223790
        ]
      }
    ],
    multipleBlack: 1,
    multipleWhite: 1,
    multipleGreen: 1
  },
  {
    id: 129,
    names: {
      en: "Lexa",
      tw: "萊基薩",
      kr: "렉사",
      fr: "Lexa",
      de: "Lexa",
      es: "Lexa"
    },
    abilities: [
      {
        id: 20330,
        names: {
          en: "Aeroja",
          tw: "強勁風",
          kr: "에어로쟈",
          fr: "Vent max",
          de: "Aeroka",
          es: "Aero+++"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "wind"
        ],
        debuffs: [],
        dualable: false,
        firstHit: 170,
        framesList: [0],
        offset: 16,
        base: 600,
        type: "finish"
      },
      {
        id: 225280,
        names: {
          en: "Liber Magika",
          tw: "魔法之書",
          kr: "리베르 마기카",
          fr: "Liber Magika",
          de: "Liber Magika",
          es: "Liber Magika"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 147,
        framesList: [0],
        offset: 16,
        base: 200,
        ignore: 25,
        type: "finish"
      },
      {
        id: 20390,
        names: {
          en: "Tornado",
          tw: "龍捲風",
          kr: "토네이도",
          fr: "Tornade",
          de: "Tornado",
          es: "Tornado"
        },
        hitDamage: [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "wind"
        ],
        debuffs: [
          {
            type: "wind",
            value: 50
          }
        ],
        dualable: false,
        firstHit: 212,
        framesList: [0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        offset: 16,
        base: 250
      },
      {
        id: 100014106,
        names: {
          en: "Fortis Tempest",
          tw: "強音暴風",
          kr: "포르티스 템페스타",
          fr: "Forte tempête",
          de: "Sturmkraft",
          es: "Fuerte tempestad"
        },
        hitDamage: [
          20, 20, 20, 20, 20
        ],
        castTime: 0,
        damage: "magic",
        magicType: null,
        elements: [
          "wind"
        ],
        debuffs: [],
        dualable: false,
        firstHit: 200,
        framesList: [0, 10, 10, 10, 10],
        offset: 8,
        base: 740
      }
    ],
    multipleBlack: 2,
    multipleWhite: 1,
    multipleGreen: 1
  },
  {
    id: 130,
    names: {
      en: "Maritime Strategist Nichol",
      tw: "洸洋軍師尼科爾",
      kr: "광양의 참모 니콜",
      fr: "Nichol, stratège maritime",
      de: "Maritimer Stratege Nichol",
      es: "Nichol estratega marino"
    },
    abilities: [
      {
        id: 225080,
        names: {
          en: "Sharp Kick",
          tw: "猛烈踢擊",
          kr: "샤프 킥",
          fr: "Coup de pied aiguisé",
          de: "Scharfer Tritt",
          es: "Patada aguda"
        },
        hitDamage: [
          100
        ],
        castTime: 0,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 5,
        framesList: [0],
        offset: 8,
        base: 270,
        type: "finish"
      },
      {
        id: 20300,
        names: {
          en: "Blizzaja",
          tw: "強暴雪",
          kr: "블리자쟈",
          fr: "Glace max",
          de: "Eiska",
          es: "Hielo+++"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "ice"
        ],
        debuffs: [],
        dualable: false,
        firstHit: 240,
        framesList: [0],
        offset: 16,
        base: 600,
        type: "finish"
      },
      {
        id: 20320,
        names: {
          en: "Waterja",
          tw: "強流水",
          kr: "워터쟈",
          fr: "Eau max",
          de: "Aquaka",
          es: "Aqua+++"
        },
        hitDamage: [
          100
        ],
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "water"
        ],
        debuffs: [],
        dualable: false,
        firstHit: 190,
        framesList: [0],
        offset: 16,
        base: 600,
        type: "finish"
      }
    ],
    multipleBlack: 2,
    multipleWhite: 2,
    multipleGreen: 2
  },
  {
    id: 131,
    names: {
      en: "Mario Frigo",
      tw: "馬里奧·弗瑞格",
      kr: "마리오 프리고",
      fr: "Mario Frego",
      de: "Mario Frigo",
      es: "Mario Frigo"
    },
    abilities: [
      {
        id: 911037,
        names: {
          en: "Rebel drop - Urga Stupka, 210",
          tw: "反抗軍空投：Urga Stupka, 210",
          kr: "물자 투하·Urga Stupka, 210",
          fr: "Livraison rebelle - Urga Stupka, 210",
          de: "Rebellennachschub - Urga Stupka, 210",
          es: "Lanzamiento rebelde - Urga Stupka, 210"
        },
        hitDamage: [
          25, 25, 25, 25
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 32,
        framesList: [0, 20, 20, 20],
        offset: 16,
        base: 180
      },
      {
        id: 911046,
        names: {
          en: "Rebel drop - Dionysus PLDS-H",
          tw: "反抗軍空投：Dionysus PLDS-H",
          kr: "물자 투하·Dionysus PLDS-H",
          fr: "Livraison rebelle - Dionysus PLDS-H",
          de: "Rebellennachschub - Dionysus PLDS-H",
          es: "Lanzamiento rebelde - Dionysus PLDS-H"
        },
        hitDamage: [
          14, 14, 14, 14, 14, 14, 16
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 70,
        framesList: [0, 7, 5, 7, 7, 7, 7],
        offset: 16,
        base: 300
      },
      {
        id: 401004106,
        names: {
          en: "Rebel drop - M488",
          tw: "反抗軍空投：M488",
          kr: "물자 투하·M488",
          fr: "Livraison rebelle - M488",
          de: "Rebellennachschub - M488",
          es: "Lanzamiento rebelde - M488"
        },
        hitDamage: [
          100
        ],
        castTime: 76,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 160,
        framesList: [0],
        offset: 16,
        base: 820,
        type: "finish"
      }
    ],
    multiCasts: [
      {
        count: 2,
        abilities: [
          911037,
          911046
        ]
      }
    ],
    multipleBlack: 1,
    multipleWhite: 1,
    multipleGreen: 1
  },
  {
    id: 132,
    names: {
      en: "Rico Rodriguez",
      tw: "瑞科·羅德里格茲",
      kr: "리코 로드리게즈",
      fr: "Rico Rodriguez",
      de: "Rico Rodriguez",
      es: "Rico Rodríguez"
    },
    abilities: [
      {
        id: 911096,
        names: {
          en: "Chaos Object Homing",
          tw: "爆破物追擊手榴彈",
          kr: "혼돈 물체 자동 추적 장치",
          fr: "Guidage d'objets de chaos",
          de: "Chaotisches Anvisieren",
          es: "Objeto caótico dirigido"
        },
        hitDamage: [
          6, 6, 6, 6, 6, 6, 6, 58
        ],
        castTime: 40,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: true,
        firstHit: 42,
        framesList: [0, 10, 10, 10, 10, 10, 10, 10],
        offset: 16,
        base: 210,
        ignore: 50
      },
      {
        id: 401004006,
        names: {
          en: "Death From Above",
          tw: "天降死亡",
          kr: "상공으로부터의 죽음",
          fr: "Mort céleste",
          de: "Tod von oben",
          es: "Muerte desde las alturas"
        },
        hitDamage: [
          9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10
        ],
        castTime: 140,
        damage: "physic",
        magicType: null,
        elements: [],
        debuffs: [],
        dualable: false,
        firstHit: 93,
        framesList: [0, 20, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        offset: 16,
        base: 570,
        ignore: 50
      }
    ],
    multiCasts: [
      {
        count: 1,
        abilities: []
      }
    ],
    multipleBlack: 1,
    multipleWhite: 1,
    multipleGreen: 1
  },
  {
    id: 133,
    names: {
      en: "Ling",
      tw: "鈴",
      kr: "링",
      fr: "Ling",
      de: "Ling",
      es: "Ling"
    },
    abilities: [
      {
        id: 100014506,
        names: {
          en: "Dance of the Phoenix",
          tw: "火鳳凰之舞",
          kr: "불사조의 춤",
          fr: "Danse du Phénix",
          de: "Tanz des Phönix",
          es: "Baile del fénix"
        },
        hitDamage: [
          20, 20, 20, 20, 20
        ],
        castTime: 50,
        damage: "magic",
        magicType: null,
        elements: [
          "fire"
        ],
        debuffs: [],
        dualable: false,
        firstHit: 190,
        framesList: [0, 10, 10, 10, 10],
        offset: 16,
        base: 620
      }
    ],
    multiCasts: [
      {
        count: 1,
        abilities: []
      }
    ],
    multipleBlack: 1,
    multipleWhite: 1,
    multipleGreen: 1
  }
];
