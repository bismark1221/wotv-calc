export const UNITS: any[] = [
  {
    id: 1,
    names: {
      en: "Tidus",
      tw: "提達",
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
        offset: 14,
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
        offset: 14,
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
        offset: 14,
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
        framesList: [100],
        castTime: 40,
        offset: 14,
        base: 200,
        ignore: 50,
        elements: [
          "water"
        ]
      },
      {
        "id": 226821,
        "names": {
          "en": "Jecht Shot 2",
          "tw": "傑克特射門２",
          "kr": "젝트 슛2",
          "fr": "Jecht Shoot 2",
          "de": "Jekkt-Spezial 2",
          "es": "Chut de Jecht S"
        },
        "castTime": 40,
        "framesList": [
          100
        ],
        "offset": 14,
        "base": 800,
        "debuffs": [
          {
            "type": "water",
            "value": 65
          }
        ]
      },
      {
        "id": 210000107,
        "names": {
          "en": "Blitz Ace",
          "tw": "水鬥球王牌",
          "kr": "블리츠의 에이스",
          "fr": "As du Blitz",
          "de": "Blitzballgott",
          "es": "As del blitzbol"
        },
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 20
        ],
        "dualable": false,
        "framesList": [
          106, 4, 10, 4, 10, 4, 4, 4, 12, 4, 20, 4, 14, 4, 36, 150
        ],
        "offset": 8,
        "base": 1200,
        "debuffs": [
          {
            "type": "water",
            "value": 100
          }
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          226821,
          1,
          2,
          3,
          4
        ]
      }
    ]
  },
  {
    id: 2,
    names: {
      en: "Firion",
      tw: "弗利奧尼爾",
      kr: "프리오닐"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Fin Briar",
          tw: "野薔薇之翼",
          kr: "핀의 들장미",
          de: "Fingestrüpp"
        },
        framesList: [30],
        offset: 36,
        base: 180,
        ignore: 25
      },
      {
        id: 2,
        names: {
          en: "Fin Briar +2",
          tw: "野薔薇之翼 +2",
          kr: "핀의 들장미 +2",
          de: "Fingestrüpp +2"
        },
        framesList: [30],
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
      tw: "奧爾蘭多",
      kr: "올란두"
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
        offset: 14,
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
        offset: 14,
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
        offset: 14,
        base: 230,
        elements: [
          "lightning"
        ],
      },
      {
        id: 226772,
        "names": {
          "en": "Blade of Creation",
          "tw": "萬象光明劍",
          "kr": "만상광명검",
          "fr": "Lumière de la Création",
          "de": "Klinge der strahlenden Schöpfung",
          "es": "Hoja de la creación"
        },
        "framesList": [
          20
        ],
        "offset": 8,
        "base": 420
      },
      {
        id: 507340,
        "names": {
          "en": "Perfect Ultima Sword",
          "tw": "完全究極劍",
          "kr": "완전 알테마 검",
          "fr": "Lame d'Altéma divine",
          "de": "Vollkommenes Ultimaschwert",
          "es": "Sable artema perfecto"
        },
        "framesList": [
          40
        ],
        "offset": 8,
        "base": 750,
        "ignore": 50
      },
      {
        id: 253000807,
        "names": {
          "en": "Swordplay: Raiden",
          "tw": "全劍技「雷神」",
          "kr": "전검기 '뇌신'",
          "fr": "Passe d'arme : Raiden",
          "de": "Schwertkampf: Raiden",
          "es": "Esgrima - Raiden"
        },
        "hitDamage": [
          30,
          30,
          40
        ],
        "dualable": false,
        "framesList": [
          53,
          58,
          42
        ],
        "offset": 8,
        "base": 900
      },
      {
        id: 900000027,
        "names": {
          "en": "Swordplay: Raiden + 1",
          "tw": "全劍技「雷神」 + 1",
          "kr": "전검기 '뇌신' + 1",
          "fr": "Passe d'arme : Raiden + 1",
          "de": "Schwertkampf: Raiden + 1",
          "es": "Esgrima - Raiden + 1"
        },
        "hitDamage": [
          30,
          30,
          40
        ],
        "dualable": false,
        "framesList": [
          53,
          58,
          42
        ],
        "offset": 8,
        "base": 1200
      }
    ]
  },
  {
    id: 4,
    names: {
      en: "Lunera",
      tw: "盧內拉",
      kr: "루네라"
    },
    abilities: [
      {
        id: 209620,
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
        offset: 14,
        base: 620,
        elements: [
          "wind",
          "light"
        ],
        damage: "magic",
        dualable: false
      },
      {
        id: 704540,
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
        offset: 14,
        base: 940,
        elements: [
          "wind",
          "light"
        ],
        damage: "magic",
        dualable: false
      },
      {
        id: 209630,
        names: {
          en: "Gleaming Arrow",
          fr: "Flèche étincelante",
          tw: "閃光箭",
          kr: "빛나는 화살",
          de: "Leuchtender Pfeil",
          es: "Saeta centella"
        },
        framesList: [410],
        base: 2000,
        elements : [
          "light"
        ],
        damage: "magic",
        dualable: false
      },
      {
        id: 209570,
        names: {
          en: "Gail Arrow",
          fr: "Flèche tornade",
          tw: "烈風箭",
          kr: "돌풍의 화살",
          de: "Gailpfeil",
          es: "Saeta tornado"
        },
        framesList: [70],
        base: 2000,
        elements : [
          "wind"
        ],
        damage: "magic",
        dualable: false
      },
      {
        "id": 227081,
        "names": {
          "en": "Hagion Veloz",
          "tw": "聖靈之箭",
          "kr": "성령의 화살"
        },
        "damage": "magic",
        "base": 2500,
        "hitDamage": [
          33, 33, 34
        ],
        "dualable": false,
        "framesList": [
          70, 20, 20
        ],
        "offset": 8
      },
      {
        "id": 100007507,
        "names": {
          "en": "Bright Arrow",
          "tw": "光明箭",
          "kr": "광명의 화살",
          "fr": "Flèche éclatante",
          "de": "Greller Pfeil",
          "es": "Flecha resplandeciente"
        },
        "damage": "magic",
        "base": 1800,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "dualable": false,
        "framesList": [
          132, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          209620,
          209630,
          209570,
          704540,
          227081
        ]
      }
    ],
    dual: false
  },
  {
    id: 5,
    names: {
      en: "Aileen",
      tw: "艾琳",
      kr: "아이린"
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
        offset: 36,
        base: 320,
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
        offset: 36,
        base: 370,
        ignore: 50,
        debuffs: [
          {
            type: "earth",
            value: 75
          }
        ]
      },
      {
        "id": 100005907,
        "names": {
          "en": "Fatal Impact",
          "tw": "毀滅衝擊",
          "kr": "페이탈 임팩트",
          "fr": "Impact fatal",
          "de": "Fataler Aufprall",
          "es": "Impacto fatal"
        },
        "base": 1025,
        "hitDamage": [
          20, 20, 20, 40
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          36, 71, 13, 105
        ],
        "offset": 8
      }
    ]
  },
  {
    id: 6,
    names: {
      en: "Veritas of the Dark",
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
        offset: 14,
        base: 300,
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
        framesList: [110],
        castTime: 40,
        offset: 14,
        base: 300,
        ignore: 50,
        elements: [
          "dark"
        ]
      },
      {
        id: 705820,
        "names": {
          "en": "Dark Punishment + 2",
          "tw": "暗黑之罪 + 2",
          "kr": "암흑의 죄업 + 2",
          "fr": "Punition obscure + 2",
          "de": "Dunkelstrafe + 2",
          "es": "Castigo tenebroso + 2"
        },
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 360,
        "ignore": 50,
        "debuffs": [
          {
            "type": "dark",
            "value": 50
          }
        ]
      },
      {
        id: 705800,
        "names": {
          "en": "Dark Edge + 2",
          "tw": "暗黑之刃 + 2",
          "kr": "암흑의 칼 + 2",
          "fr": "Entaille obscure + 2",
          "de": "Dunkelschneide + 2",
          "es": "Filo tenebroso + 2"
        },
        castTime: 40,
        offset: 14,
        "elements": [
          "dark"
        ],
        "framesList": [
          210
        ],
        "base": 300,
        "ignore": 50
      },
      {
        "id": 226871,
        "names": {
          "en": "Dark Blade of Vengeance",
          "tw": "怨誓之暗刃",
          "kr": "원수의 검은 칼날",
          "fr": "Coutelas de la rancœur",
          "de": "Dunkelklinge der Rache",
          "es": "Alfanje del rencor"
        },
        "base": 650,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10
        ],
        "debuffs": [
          {
            "type": "dark",
            "value": 65
          }
        ],
        "framesList": [
          0, 14, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 6
        ],
        "offset": 8
      },
      {
        "id": 100007707,
        "names": {
          "en": "Seal of Conviction",
          "tw": "斷罪刻印",
          "kr": "단죄의 각인",
          "fr": "Sceau de conviction",
          "de": "Siegel der Überzeugung",
          "es": "Sello penitente"
        },
        "base": 800,
        "hitDamage": [
          4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 24
        ],
        "elements": [
          "dark"
        ],
        "dualable": false,
        "framesList": [
          45, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 6, 5, 22
        ],
        "offset": 8
      },
      {
        "id": 900000057,
        "names": {
          "en": "Seal of Conviction + 1",
          "tw": "斷罪刻印 + 1",
          "kr": "단죄의 각인 + 1",
          "fr": "Sceau de conviction + 1",
          "de": "Siegel der Überzeugung + 1",
          "es": "Sello penitente + 1"
        },
        "base": 1000,
        "hitDamage": [
          4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 24
        ],
        "elements": [
          "dark"
        ],
        "dualable": false,
        "framesList": [
          45, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 6, 5, 22
        ],
        "offset": 8
      }
    ]
  },
  {
    id: 7,
    names: {
      en: "2B"
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
        offset: 14,
        base: 1000,
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
        offset: 40,
        base: 700,
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
        offset: 14,
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
        framesList: [42, 40, 40, 40, 40],
        offset: 14,
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
        framesList: [42],
        castTime: 40,
        offset: 14,
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
        framesList: [80],
        castTime: 40,
        offset: 14,
        base: 999,
        dualable: false
      },
      {
        "id": 503950,
        "names": {
          "en": "Charge Blade",
          "tw": "充能劍",
          "kr": "차지 블레이드",
          "fr": "Lames chargées",
          "de": "Klinge aufladen",
          "es": "Cargar espada"
        },
        "base": 750,
        "hitDamage": [
          6.666666666666668, 6.666666666666668, 6.666666666666668, 6.666666666666668, 6.666666666666668, 6.666666666666668, 6.666666666666668, 6.666666666666668, 6.666666666666668, 6.666666666666668, 6.666666666666668, 6.666666666666668, 6.666666666666668, 6.666666666666668, 6.666666666666668
        ],
        "castTime": 120,
        "offset": 48,
        "framesList": [
          42, 40, 16, 24, 16, 16, 8, 16, 16, 8, 16, 16, 24, 16, 40
        ]
      },
      {
        "id": 509312,
        "names": {
          "en": "True Charge Blade",
          "tw": "真·充能劍",
          "kr": "진·차지 블레이드",
          "fr": "Lame à charge véritable",
          "de": "Wahre geladene Klinge",
          "es": "Hoja cargada de la verdad"
        },
        "base": 1200,
        "hitDamage": [
          3.666666666666667, 3.666666666666667, 3.666666666666667, 3.666666666666667, 3.666666666666667, 3.666666666666667, 3.666666666666667, 3.666666666666667, 4, 3.666666666666667, 3.666666666666667, 3.666666666666667, 3.666666666666667, 3.666666666666667, 3.666666666666667, 3.666666666666667, 3.666666666666667, 4, 3.666666666666667, 3.666666666666667, 3.666666666666667, 3.666666666666667, 3.666666666666667, 3.666666666666667, 3.666666666666667, 3.666666666666667, 4
        ],
        "castTime": 120,
        "framesList": [
          42, 20, 20, 16, 4, 16, 4, 16, 4, 12, 4, 4, 12, 4, 4, 12, 4, 4, 12, 4, 16, 4, 16, 4, 16, 20, 20
        ],
        "offset": 48
      },
      {
        "id": 509313,
        "names": {
          "en": "True Charge Spear",
          "tw": "真·充能矛",
          "kr": "진·차지 스피어",
          "fr": "Lance à charge véritable",
          "de": "Wahrer geladener Speer",
          "es": "Lanza cargada de la verdad"
        },
        "base": 600,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 73
        ],
        "castTime": 40,
        "framesList": [
          110, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 509314,
        "names": {
          "en": "True Charge Volt",
          "tw": "真·充能伏特",
          "kr": "진·차지 볼트",
          "fr": "Foudre à charge véritable",
          "de": "Wahrer geladener Schock",
          "es": "Relámpago cargado de la verdad"
        },
        "base": 700,
        "hitDamage": [
          100
        ],
        "debuffs": [
          {
            "type": "lightning",
            "value": 100
          }
        ],
        "framesList": [
          40
        ],
        "offset": 8
      },
      {
        "id": 509315,
        "names": {
          "en": "YoRHa Sword Dance",
          "tw": "寄葉式·亂舞斬",
          "kr": "요르하식·난무",
          "fr": "Danse d'épée YoRHa",
          "de": "YoRHa Klingentanz",
          "es": "Danza de la espada de YoRHa"
        },
        "base": 1500,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "framesList": [
          80, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 509316,
        "names": {
          "en": "YoRHa Slaughter Dance",
          "tw": "寄葉式·殲滅亂舞斬",
          "kr": "요르하식·섬멸 난무",
          "fr": "Danse du massacre YoRHa",
          "de": "YoRHa Massakertanz",
          "es": "Danza de la hecatombe de YoRHa"
        },
        "base": 1100,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "framesList": [
          80, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 310000107,
        "names": {
          "en": "Ho229 Type-B",
          "es": "Ho229 Tipo-B"
        },
        "base": 1400,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          125, 10, 10, 10, 11, 12, 12, 12, 12, 12
        ],
        "offset": 8
      },
      {
        "id": 900000320,
        "names": {
          "en": "Ho229 Type-B + 1",
          "es": "Ho229 Tipo-B + 1"
        },
        "base": 1400,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          125, 10, 10, 10, 11, 12, 12, 12, 12, 12
        ],
        "offset": 8
      }
    ]
  },
  {
    id: 8,
    names: {
      en: "9S"
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
        offset: 14,
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
        framesList: [80],
        castTime: 40,
        offset: 14,
        base: 999,
        dualable: false
      },
    ]
  },
  {
    id: 9,
    names: {
      en: "A2"
    },
    abilities: [
      {
        id: 910288,
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
        base: 550,
      },
      {
        id: 910289,
        names: {
          en: "Offensive Heal Combo",
          fr: "Combo offensivo-curatif",
          tw: "攻擊時回復HP連擊",
          kr: "공격 HP 회복 콤보",
          de: "Offensive Heilkombo",
          es: "Combo curativo-ofensivo"
        },
        framesList: [35, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        "hitDamage": [
          11.764705882352942, 11.764705882352942, 11.764705882352942, 11.764705882352942, 12.745098039215685, 18.627450980392158, 19.607843137254903, 0.2352941176470588, 0.2352941176470588, 0.2352941176470588, 0.2352941176470588, 0.2549019607843137, 0.3725490196078431, 0.392156862745098
        ],
        castTime: 35,
        offset: 31,
        base: 510,
      },
      {
        id: 910298,
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
        offset: 14,
        base: 480,
      },
      {
        id: 910294,
        names: {
          en: "Finisher",
          fr: "Coup fatal",
          tw: "必殺",
          kr: "필살",
          de: "Todesstoß",
          es: "Golpe de gracia"
        },
        framesList: [42],
        castTime: 40,
        offset: 14,
        base: 750
      },
      {
        "id": 509320,
        "names": {
          "en": "Avoid Heavy Attack",
          "tw": "閃避重擊",
          "kr": "헤비 어택·어보이드",
          "fr": "Anti-attaque lourde",
          "de": "Schweren Angriff vermeiden",
          "es": "Antiataque pesado"
        },
        "base": 750,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ],
        "offset": 14
      },
      {
        "id": 509324,
        "names": {
          "en": "Hateful Blade",
          "tw": "憎惡之刃",
          "kr": "증오의 칼날",
          "fr": "Lame haineuse",
          "de": "Hasserfüllte Klinge",
          "es": "Hoja abominable"
        },
        "base": 1800,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "framesList": [
          53
        ],
        "offset": 14
      },
      {
        "id": 401001207,
        "names": {
          "en": "Berserk",
          "tw": "狂暴",
          "kr": "버서커",
          "fr": "Folie meurtrière",
          "de": "Berserker",
          "es": "Ráksasa"
        },
        "base": 1000,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "framesList": [
          170
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          910288,
          910289,
          910298,
          910294,
          509320,
          509324
        ]
      }
    ]
  },
  {
    id: 10,
    names: {
      en: "Ace",
      tw: "艾斯",
      kr: "에이스"
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
        framesList: [150],
        castTime: 75,
        offset: 14,
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
        damage: "magic",
        dualable: false,
        framesList: [190],
        base: 800,
        ignore: 50
      },
      {
        "id": 900000017,
        "names": {
          "en": "Jackpot Shot + 1",
          "tw": "雷射加農 + 1",
          "kr": "포격 광선 + 1",
          "fr": "Canon laser + 1",
          "de": "Jackpot-Shot + 1",
          "es": "As láser + 1"
        },
        "damage": "magic",
        "dualable": false,
        "framesList": [
          190
        ],
        "offset": 8,
        "base": 900,
        "ignore": 50
      }
    ]
  },
  {
    id: 11,
    names: {
      en: "Agrias",
      tw: "阿格莉亞絲",
      kr: "아그리아스"
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
        offset: 14,
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
        offset: 14,
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
      tw: "艾美利亞",
      kr: "아멜리아"
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
        offset: 14,
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
        offset: 14,
        base: 350
      }
    ]
  },
  {
    id: 13,
    names: {
      en: "Ashe",
      tw: "雅雪",
      kr: "아셰"
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
        offset: 14,
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
        offset: 14,
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
        dualable: false,
        framesList: [72, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        offset: 14,
        base: 300,
        ignore: 25
      }
    ]
  },
  {
    id: 14,
    names: {
      en: "Bran",
      tw: "布蘭",
      kr: "브란"
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
        offset: 14,
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
        offset: 14,
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
      tw: "千鶴",
      kr: "치즈루"
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
          tw: "究極 +2",
          kr: "알테마 +2",
          es: "Artema +2"
        },
        framesList: [140, 37, 38, 37, 38, 38, 37],
        hitDamage: [10, 10, 10, 10, 10, 10, 40],
        castTime: 40,
        offset: 14,
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
          es: "Distopía"
        },
        framesList: [120],
        castTime: 40,
        offset: 14,
        base: 600,
        elements: [
          "dark"
        ],
        dualable: false,
        damage: "magic"
      },
      {
        id: 20390,
        "names": {
          "en": "Tornado",
          "tw": "龍捲風",
          "kr": "토네이도",
          "fr": "Tornade"
        },
        "damage": "magic",
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14,
        "base": 250,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ]
      },
      {
        id: 20400,
        "names": {
          "en": "Quake",
          "tw": "地槌",
          "kr": "퀘이크",
          "fr": "Séisme",
          "de": "Beben",
          "es": "Seísmo"
        },
        "damage": "magic",
        "hitDamage": [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "earth"
        ],
        "dualable": false,
        "framesList": [
          160, 22, 21, 22, 23, 23, 22, 23
        ],
        "offset": 14,
        "base": 275,
        "debuffs": [
          {
            "type": "earth",
            "value": 50
          }
        ]
      },
      {
        id: 100000317,
        "names": {
          "en": "Hell's Judgment",
          "tw": "地獄審判",
          "kr": "지옥의 심판",
          "fr": "Juge des Enfers",
          "de": "Höllischer Richtspruch",
          "es": "Juicio infernal"
        },
        "damage": "magic",
        "hitDamage": [
          8, 8, 8, 8, 8, 20, 20, 20
        ],
        "elements": [
          "dark"
        ],
        "dualable": false,
        "framesList": [
          6, 12, 12, 12, 12, 42, 4, 4
        ],
        "offset": 8,
        "base": 525,
        "ignore": 50
      },
      {
        id: 507330,
        "names": {
          "en": "Diastrophism",
          "tw": "迪亞斯之杯",
          "kr": "지각 변동",
          "fr": "Diastrophisme",
          "de": "Schrumpfung",
          "es": "Diastrofismo"
        },
        "damage": "magic",
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 20, 20
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "dualable": false,
        "framesList": [
          70, 17, 17, 17, 17, 17, 17, 18
        ],
        "offset": 14,
        "base": 850,
        "debuffs": [
          {
            "type": "earth",
            "value": 60
          }
        ]
      },
      {
        id: 507331,
        "names": {
          "en": "Boreas Gale",
          "tw": "鬥士颶風",
          "kr": "북쪽의 돌풍",
          "fr": "Mistral violent",
          "de": "Heftiger Nordwind",
          "es": "Ventisca boreal"
        },
        "damage": "magic",
        "hitDamage": [
          12, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "dualable": false,
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14,
        "base": 760,
        "debuffs": [
          {
            "type": "wind",
            "value": 60
          }
        ]
      }
    ],
    multipleBlack: 2
  },
  {
    id: 17,
    names: {
      en: "Fohlen",
      tw: "福倫",
      kr: "포렌"
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
        offset: 66,
        base: 250,
        ignore: 50,
        elements: [
          "wind"
        ]
      },
      {
        "id": 100006807,
        "names": {
          "en": "Resonant Slash",
          "tw": "共振斬擊",
          "kr": "공명참",
          "fr": "Coup résonnant",
          "de": "Resonanzschlag",
          "es": "Corte resonante"
        },
        "base": 1400,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 13, 13, 14, 15
        ],
        "dualable": false,
        "framesList": [
          70, 3, 3, 27, 2, 3, 17, 2, 3, 33, 3, 3, 3
        ],
        "offset": 8
      }
    ]
  },
  {
    id: 18,
    names: {
      en: "Fryevia",
      tw: "弗雷比亞",
      kr: "프레이비아"
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
        offset: 22,
        base: 1000,
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
        framesList: [100],
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
        offset: 14,
        base: 1200,
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
        framesList: [100],
        offset: 66,
        base: 1200,
        damage: "hybrid",
      },
      {
        "id": 911629,
        "names": {
          "en": "Flower Assault",
          "tw": "花之突擊",
          "kr": "꽃잎 강습",
          "fr": "Coup de la fleur",
          "de": "Blumiger Überfall",
          "es": "Asalto floral"
        },
        "damage": "hybrid",
        "base": 1200,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 58
        ],
        "castTime": 40,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 911631,
        "names": {
          "en": "Frost Riposte",
          "tw": "冰霜轉身",
          "kr": "서리 반격",
          "fr": "Riposte de givre",
          "de": "Frostriposte",
          "es": "Estocada gélida"
        },
        "damage": "hybrid",
        "base": 2100,
        "hitDamage": [
          100
        ],
        "elements": [
          "ice"
        ],
        "framesList": [
          60
        ],
        "offset": 8
      },
      {
        "id": 911665,
        "names": {
          "en": "Aurora Storm",
          "tw": "極光風暴",
          "kr": "극광의 폭풍",
          "fr": "Tempête de l'Aurore",
          "de": "Aurora-Sturm",
          "es": "Tormenta del alba"
        },
        "damage": "hybrid",
        "base": 1500,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "castTime": 40,
        "elements": [
          "ice",
          "light"
        ],
        "framesList": [
          42, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "offset": 14
      },
      {
        "id": 302001407,
        "names": {
          "en": "Ice Prison",
          "tw": "寒冰牢獄",
          "kr": "얼음 감옥",
          "fr": "Prison de glace",
          "de": "Eisgefängnis",
          "es": "Prisión helada"
        },
        "damage": "hybrid",
        "base": 2480,
        "hitDamage": [
          5, 5, 10, 80
        ],
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          15, 20, 55, 70
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          1,
          2,
          3,
          4,
          911629,
          911631
        ]
      }
    ]
  },
  {
    id: 19,
    names: {
      en: "Gilgamesh",
      tw: "吉爾伽美什",
      kr: "길가메시",
      de: "Gilgamesch"
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
        framesList: [40, 4, 16, 4, 16, 4],
        hitDamage: [16, 16, 17, 17, 17, 17],
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
        framesList: [40, 4, 6, 4, 6, 4, 6, 4, 6, 4, 6, 4],
        hitDamage: [8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9],
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
        framesList: [60],
        offset: 40,
        base: 200,
        ignore: 65
      },
      {
        id: 227481,
        "names": {
          "en": "Secret Sword Art - Excalipoor",
          "tw": "【秘劍】石中劍",
          "kr": "[비검] 엑스칼리파",
          "fr": "[Tech. secrète] Excalipur",
          "de": "[Geheimtechnik] Exkalipoor",
          "es": "Arte secreto de la espada - Excalipur"
        },
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 1
      },
      {
        id: 227482,
        "names": {
          "en": "Secret Sword Art - Kotetsu",
          "tw": "【秘劍】虎徹",
          "kr": "[비검] 고테쓰",
          "fr": "[Tech. secrète] Kotetsu",
          "de": "[Geheimtechnik] Kotetsu",
          "es": "Arte secreto de la espada - Kotetsu"
        },
        "hitDamage": [
          25,
          25,
          25,
          25
        ],
        "castTime": 40,
        "framesList": [
          42,
          10,
          10,
          10
        ],
        "offset": 14,
        "base": 550
      },
      {
        id: 507934,
        "names": {
          "en": "Secret Sword Art - Excalibur",
          "tw": "【秘劍】石中劍",
          "kr": "[비검] 엑스칼리버",
          "fr": "[Tech. secrète] Excalibur",
          "de": "[Geheimtechnik] Exkalibur",
          "es": "Arte secreto de la espada - Excalibur"
        },
        "hitDamage": [
          14,
          14,
          14,
          14,
          14,
          14,
          16
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "framesList": [
          70,
          7,
          5,
          7,
          7,
          7,
          7
        ],
        "offset": 14,
        "base": 780
      },
      {
        id: 507935,
        "names": {
          "en": "Secret Sword Art - Muramasa",
          "tw": "【秘劍】村正",
          "kr": "[비검] 무라마사",
          "fr": "[Tech. secrète] Muramasa",
          "de": "[Geheimtechnik] Muramasa",
          "es": "Arte secreto de la espada - Muramasa"
        },
        "damage": "hybrid",
        "hitDamage": [
          20,
          20,
          20,
          20,
          20
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "framesList": [
          42,
          8,
          8,
          8,
          8
        ],
        "offset": 14,
        "base": 1520
      },
      {
        id: 507937,
        "names": {
          "en": "Secret Sword Art - Genji Blade",
          "tw": "【秘劍】源氏之刀",
          "kr": "[비검] 겐지의 도",
          "fr": "[Tech. secrète] Lame de Genji",
          "de": "[Geheimtechnik] Genji-Klinge",
          "es": "Arte secreto de la espada - Hoja de Genji"
        },
        "castTime": 40,
        "framesList": [
          110
        ],
        "offset": 14,
        "base": 450,
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          },
          {
            "type": "ice",
            "value": 60
          },
          {
            "type": "lightning",
            "value": 60
          },
          {
            "type": "water",
            "value": 60
          },
          {
            "type": "wind",
            "value": 60
          },
          {
            "type": "earth",
            "value": 60
          },
          {
            "type": "light",
            "value": 60
          },
          {
            "type": "dark",
            "value": 60
          }
        ]
      },
      {
        id: 507936,
        "names": {
          "en": "Secret Sword Art - Zantetsuken",
          "tw": "【秘劍】斬鐵劍",
          "kr": "[비검] 참철검",
          "fr": "[Tech. secrète] Zantetsuken",
          "de": "[Geheimtechnik] Zantetsuken",
          "es": "Arte secreto de la espada - Zantetsuken"
        },
        "framesList": [
          60
        ],
        "offset": 8,
        "base": 600
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
        framesList: [51, 9, 9, 9, 9, 9, 9, 9],
        hitDamage: [12, 13, 12, 13, 12, 13, 12, 13],
        castTime: 40,
        offset: 14,
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
        framesList: [42, 5, 5, 5, 5, 5],
        hitDamage: [15, 15, 15, 15, 20, 20],
        castTime: 40,
        offset: 14,
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
        framesList: [20],
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
        framesList: [51, 9, 9, 9, 9, 9, 9, 9],
        offset: 14,
        base: 300,
        ignore: 50
      },
      {
        "id": 227101,
        "names": {
          "en": "Raging Inferno",
          "tw": "亂之炎",
          "kr": "혼란의 불꽃",
          "fr": "Déluge infernal",
          "de": "Tobende Feuersbrunst",
          "es": "Furia infernal"
        },
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "elements": [
          "fire"
        ],
        "framesList": [
          12, 8, 8, 8, 8, 8, 8, 8, 8, 8
        ],
        "offset": 8,
        "base": 680
      },
      {
        "id": 226772,
        "names": {
          "en": "Blade of Creation",
          "tw": "萬象光明劍",
          "kr": "만상광명검",
          "fr": "Lumière de la Création",
          "de": "Klinge der strahlenden Schöpfung",
          "es": "Hoja de la creación"
        },
        "framesList": [
          20
        ],
        "offset": 8,
        "base": 420
      },
      {
        "id": 507610,
        "names": {
          "en": "Blade of Absolute Supremacy",
          "tw": "絕霸剛衝劍",
          "kr": "절패강충검",
          "fr": "Tueur suprême",
          "de": "Klinge der Absoluten Herrschaft",
          "es": "Hoja de la supremacía absoluta"
        },
        "framesList": [
          130
        ],
        "offset": 8,
        "base": 825,
        "ignore": 50
      },
      {
        "id": 253000217,
        "names": {
          "en": "Blade of Dark Desire",
          "tw": "野心黑劍",
          "kr": "어두운 야심의 검",
          "fr": "Lame des désirs obscurs",
          "de": "Klinge der dunklen Begierde",
          "es": "Hoja del deseo impío"
        },
        "hitDamage": [
          20, 20, 20, 40
        ],
        "dualable": false,
        "framesList": [
          58, 20, 22, 77
        ],
        "offset": 8,
        "base": 1400
      },
      {
        "id": 2530002172,
        "names": {
          "en": "Blade of Dark Desire + 2",
          "tw": "野心黑劍 + 2",
          "kr": "어두운 야심의 검 + 2",
          "fr": "Lame des désirs obscurs + 2",
          "de": "Klinge der dunklen Begierde + 2",
          "es": "Hoja del deseo impío + 2"
        },
        "hitDamage": [
          20, 20, 20, 40
        ],
        "dualable": false,
        "framesList": [
          58, 20, 22, 77
        ],
        "offset": 8,
        "base": 1600,
        debuffs: [
          {
            type: "lightning",
            value: 100
          }
        ]
      },
    ]
  },
  {
    id: 21,
    names: {
      en: "Veritas of the Light",
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
        framesList: [42, 9, 9, 9, 9, 9, 9],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        castTime: 40,
        offset: 14,
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
        framesList: [150],
        castTime: 40,
        offset: 14,
        base: 1600,
        damage: "hybrid"
      },
      {
        id: 70140,
        "names": {
          "en": "Ultima + 2",
          "tw": "究極 + 2",
          "kr": "알테마 + 2",
          "es": "Artema + 2"
        },
        "damage": "magic",
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 40
        ],
        "castTime": 40,
        "magicType": "black",
        "dualable": false,
        "framesList": [
          140, 37, 38, 37, 38, 38, 37
        ],
        "offset": 14,
        "base": 280,
        "ignore": 50
      },
      {
        id: 706000,
        "names": {
          "en": "Divine Shot + 2",
          "tw": "聖徒射擊 + 2",
          "kr": "성스러운 사격 + 2",
          "fr": "Tir divin + 2",
          "de": "Göttlicher Schuss + 2",
          "es": "Disparo divino + 2"
        },
        "damage": "hybrid",
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "framesList": [
          42, 9, 9, 9, 9, 9, 9
        ],
        "offset": 14,
        "base": 850,
        "debuffs": [
          {
            "type": "light",
            "value": 65
          }
        ]
      },
      {
        "id": 507643,
        "names": {
          "en": "Saint Eraser",
          "tw": "神聖抹除",
          "kr": "성스러운 말소",
          "fr": "Effacement divin",
          "de": "Heilige Auslöschung",
          "es": "Eliminación divina"
        },
        "damage": "hybrid",
        "base": 4000,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "framesList": [
          220
        ],
        "offset": 14
      },
      {
        "id": 100008207,
        "names": {
          "en": "Dawn of Judgment",
          "tw": "裁決曉光",
          "kr": "심판의 새벽빛",
          "fr": "Aube du jugement",
          "de": "Urteilsdämmerung",
          "es": "Amanecer de justicia"
        },
        "damage": "hybrid",
        "base": 2520,
        "hitDamage": [
          4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 10
        ],
        "elements": [
          "light"
        ],
        "dualable": false,
        "framesList": [
          26, 6, 6, 6, 6, 6, 6, 6, 36, 6, 6, 6, 96, 13, 13, 13, 14, 14, 13
        ],
        "offset": 8
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
        framesList: [42, 8, 8, 8, 8, 8, 6, 8],
        hitDamage: [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        castTime: 40,
        offset: 14,
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
        framesList: [42, 8, 8, 8, 8, 8, 6, 8],
        offset: 14,
        base: 300,
        ignore: 25
      },
      {
        "id": 227101,
        "names": {
          "en": "Raging Inferno",
          "tw": "亂之炎",
          "kr": "혼란의 불꽃",
          "fr": "Déluge infernal",
          "de": "Tobende Feuersbrunst",
          "es": "Furia infernal"
        },
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "elements": [
          "fire"
        ],
        "framesList": [
          12, 8, 8, 8, 8, 8, 8, 8, 8, 8
        ],
        "offset": 8,
        "base": 680
      },
      {
        "id": 507602,
        "names": {
          "en": "Crush Resistance",
          "tw": "咬擊超狼破",
          "kr": "교격초랑파",
          "fr": "Oppression",
          "de": "Resistenzbrecher",
          "es": "Resistencia aplastante"
        },
        "castTime": 62,
        "framesList": [
          62
        ],
        "offset": 14,
        "base": 1200,
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          },
          {
            "type": "ice",
            "value": 60
          },
          {
            "type": "lightning",
            "value": 60
          },
          {
            "type": "water",
            "value": 60
          },
          {
            "type": "wind",
            "value": 60
          },
          {
            "type": "earth",
            "value": 60
          },
          {
            "type": "light",
            "value": 60
          },
          {
            "type": "dark",
            "value": 60
          }
        ]
      },
      {
        "id": 253000117,
        "names": {
          "en": "Ultima Blade",
          "tw": "究極劍刃",
          "kr": "알테마 검",
          "fr": "Lame Ultima",
          "de": "Ultima-Klinge",
          "es": "Hoja Artema"
        },
        "dualable": false,
        "framesList": [
          230
        ],
        "offset": 8,
        "base": 600,
        "ignore": 50
      }
    ]
  },
  {
    id: 23,
    names: {
      en: "Randi",
      fr: "Randy",
      tw: "蘭迪",
      kr: "랜디",
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
        debuffs: [
          {
            type: "wind",
            value: 50
          }
        ],
        framesList: [17, 26],
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
        framesList: [42, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        offset: 26,
        base: 700
      }
    ]
  },
  {
    id: 24,
    names: {
      en: "Rasler",
      tw: "拉斯勒",
      kr: "라슬러"
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
        framesList: [42, 10, 10, 10, 10, 10, 10],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
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
      kr: "리베르타"
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
        framesList: [42, 10, 10, 10, 10, 10, 10],
        hitDamage: [14, 14, 15, 14, 14, 15, 14],
        castTime: 40,
        offset: 14,
        base: 500,
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
        framesList: [42, 10, 10, 10, 10, 10, 10, 10],
        offset: 14,
        base: 550
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
        framesList: [42, 10, 10, 10, 10, 10, 10, 10],
        offset: 14,
        base: 600
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
        framesList: [42, 10, 10, 10, 10, 10, 10, 10],
        offset: 14,
        base: 600
      },
      {
        "id": 911321,
        "names": {
          "en": "Crimson Raid",
          "tw": "深紅爆擊",
          "kr": "진홍의 폭격",
          "fr": "Descente rouge",
          "de": "Blutroter Raubzug",
          "es": "Invasión carmesí"
        },
        "castTime": 20,
        "framesList": [
          100
        ],
        "offset": 14,
        "base": 700
      },
      {
        "id": 911323,
        "names": {
          "en": "Red Vengeance",
          "tw": "血色復仇",
          "kr": "적색의 복수",
          "fr": "Vengeance écarlate",
          "de": "Rote Rache",
          "es": "Venganza escarlata"
        },
        "base": 470,
        dualable: false,
        "hitDamage": [
          100
        ],
        "framesList": [
          0
        ],
        "offset": 8
      },
      {
        "id": 401001707,
        "names": {
          "en": "Destructive Thrust",
          "tw": "破壞衝擊",
          "kr": "파괴의 찌르기",
          "fr": "Coup destructeur",
          "de": "Zerstörungsstoß",
          "es": "Estoque demoledor"
        },
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 10
        ],
        "dualable": false,
        "framesList": [
          147, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "offset": 8,
        "base": 1400
      },
      {
        "id": 950000002,
        "names": {
          "en": "Destructive Thrust + 1",
          "tw": "破壞衝擊 + 1",
          "kr": "파괴의 찌르기 + 1",
          "fr": "Coup destructeur + 1",
          "de": "Zerstörungsstoß + 1",
          "es": "Estoque demoledor + 1"
        },
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 10
        ],
        "dualable": false,
        "framesList": [
          147, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "offset": 8,
        "base": 1400,
        "debuffs": [
          {
            "type": "fire",
            "value": 104
          },
          {
            "type": "ice",
            "value": 104
          },
          {
            "type": "lightning",
            "value": 104
          }
        ]
      }
    ]
  },
  {
    id: 26,
    names: {
      en: "Rikku",
      tw: "琉克",
      kr: "류크"
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
        framesList: [40, 25, 25, 25, 25, 25, 25, 25, 25],
        hitDamage: [10, 10, 10, 10, 10, 10, 10, 10, 20],
        castTime: 40,
        offset: 14,
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
        framesList: [40, 13, 13, 13, 13, 13, 13, 13, 13],
        hitDamage: [10, 10, 10, 10, 10, 10, 10, 10, 20],
        castTime: 40,
        offset: 14,
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
        framesList: [45, 5, 5, 5, 5, 5, 5, 5, 5],
        hitDamage: [10, 10, 10, 10, 10, 10, 10, 10, 20],
        castTime: 40,
        offset: 14,
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
        framesList: [40, 9, 9, 9, 9, 9, 9, 9, 9],
        hitDamage: [10, 10, 10, 10, 10, 10, 10, 10, 20],
        castTime: 40,
        offset: 14,
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
        framesList: [132, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        castTime: 40,
        offset: 14,
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
          tw: "究極 +2",
          kr: "알테마 +2",
          es: "Artema +2"
        },
        framesList: [140, 37, 38, 37, 38, 38, 37],
        hitDamage: [10, 10, 10, 10, 10, 10, 40],
        castTime: 40,
        offset: 14,
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
          es: "Utopía"
        },
        framesList: [120],
        castTime: 40,
        offset: 14,
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
          es: "Utopía +2"
        },
        framesList: [120],
        castTime: 40,
        offset: 14,
        base: 910,
        elements: [
          "water"
        ],
        dualable: false,
        damage: "magic"
      },
      {
        id: 20380,
        "names": {
          "en": "Flood",
          "tw": "洪水",
          "kr": "플러드",
          "fr": "Inondation",
          "de": "Flut",
          "es": "Inundación"
        },
        "damage": "magic",
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          133, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14,
        "base": 250,
        "debuffs": [
          {
            "type": "lightning",
            "value": 50
          }
        ]
      },
      {
        id: 20390,
        "names": {
          "en": "Tornado",
          "tw": "龍捲風",
          "kr": "토네이도",
          "fr": "Tornade"
        },
        "damage": "magic",
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14,
        "base": 250,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ]
      },
      {
        id: 507331,
        "names": {
          "en": "Boreas Gale",
          "tw": "鬥士颶風",
          "kr": "북쪽의 돌풍",
          "fr": "Mistral violent",
          "de": "Heftiger Nordwind",
          "es": "Ventisca boreal"
        },
        "damage": "magic",
        "hitDamage": [
          12, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "dualable": false,
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14,
        "base": 760,
        "debuffs": [
          {
            "type": "wind",
            "value": 60
          }
        ]
      },
      {
        id: 507410,
        "names": {
          "en": "Meereszorn",
          "tw": "海洋之怒",
          "kr": "바다의 분노"
        },
        "damage": "magic",
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          133, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14,
        "base": 900,
        "debuffs": [
          {
            "type": "water",
            "value": 60
          }
        ]
      },
      {
        id: 100007207,
        "names": {
          "en": "Hell's Waters",
          "tw": "地獄邪水",
          "kr": "사악한 물의 심판",
          "fr": "Eaux infernales",
          "de": "Höllenwasser",
          "es": "Aguas infernales"
        },
        "damage": "magic",
        "hitDamage": [
          8, 8, 8, 8, 8, 20, 20, 20
        ],
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          6, 12, 12, 12, 12, 42, 4, 4
        ],
        "offset": 8,
        "base": 525,
        "ignore": 50
      },
      {
        id: 900000037,
        "names": {
          "en": "Hell's Waters + 1",
          "tw": "地獄邪水 + 1",
          "kr": "사악한 물의 심판 + 1",
          "fr": "Eaux infernales + 1",
          "de": "Höllenwasser + 1",
          "es": "Aguas infernales + 1"
        },
        "damage": "magic",
        "hitDamage": [
          8, 8, 8, 8, 8, 20, 20, 20
        ],
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          6, 12, 12, 12, 12, 42, 4, 4
        ],
        "offset": 8,
        "base": 600,
        "ignore": 50
      }
    ],
    multipleBlack: 2
  },
  {
    id: 28,
    names: {
      en: "Setzer",
      tw: "塞策",
      kr: "셋쳐"
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
        framesList: [42, 5, 5, 5, 5, 5, 5],
        hitDamage: [14, 14, 14, 14, 14, 15, 15],
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
        framesList: [42, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        castTime: 40,
        offset: 14,
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
        framesList: [16],
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
        framesList: [42, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        castTime: 40,
        offset: 14,
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
        framesList: [150, 6, 5, 7, 5, 5, 8, 5, 5],
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
      tw: "香托托",
      kr: "샨토토"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Tornado",
          fr: "Tornade",
          tw: "龍捲風",
          kr: "토네이도"
        },
        framesList: [80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        castTime: 40,
        offset: 14,
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
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "wind"
        ],
        dualable: false,
        framesList: [170],
        offset: 14,
        base: 600
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
        framesList: [52, 20, 20, 20, 20],
        castTime: 50,
        offset: 14,
        base: 460,
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
        framesList: [60, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        castTime: 40,
        offset: 12,
        base: 520,
        ignore: 50,
        damage: "magic",
        dualable: false
      },
      {
        id: 3,
        names: {
          en: "Ultima +2",
          tw: "究極 +2",
          kr: "알테마 +2",
          es: "Artema +2"
        },
        framesList: [140, 37, 38, 37, 38, 38, 37],
        hitDamage: [10, 10, 10, 10, 10, 10, 40],
        castTime: 40,
        offset: 14,
        base: 280,
        ignore: 50,
        damage: "magic",
        magicType: "black",
        dualable: false
      },
      {
        "id": 226852,
        "names": {
          "en": "Chaos Dark",
          "tw": "混沌黑暗",
          "kr": "혼돈의 어둠",
          "fr": "Ténèbres chaotiques",
          "de": "Chaosdunkelheit",
          "es": "Oscuridad caótica"
        },
        "damage": "magic",
        "hitDamage": [
          20,
          20,
          20,
          20,
          20
        ],
        "castTime": 50,
        "elements": [
          "dark"
        ],
        "dualable": false,
        "framesList": [
          52,
          20,
          20,
          20,
          20
        ],
        "offset": 14,
        "base": 1400
      },
      {
        "id": 226853,
        "names": {
          "en": "Chaos Flare",
          "tw": "混沌核爆",
          "kr": "혼돈의 불꽃",
          "fr": "Brasier chaotique",
          "de": "Chaosflammen",
          "es": "Fulgor caótico"
        },
        "damage": "magic",
        "hitDamage": [
          20,
          20,
          20,
          20,
          20
        ],
        "castTime": 50,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "framesList": [
          52,
          20,
          20,
          20,
          20
        ],
        "offset": 14,
        "base": 1400
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
        framesList: [49, 10, 14, 9, 16, 12, 42, 4, 4],
        hitDamage: [10, 10, 10, 10, 10, 10, 10, 10, 20],
        base: 640,
        ignore: 50,
        damage: "magic",
        dualable: false
      }
    ],
    multiCasts: [
      {
        count: 4,
        abilities: [
          500590,
          704700,
          226852,
          226853
        ]
      }
    ],
    multipleBlack: 2,
  },
  {
    id: 31,
    names: {
      en: "Vaan",
      tw: "梵恩",
      kr: "반"
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
        framesList: [22, 8, 8, 8, 8, 8, 8, 8],
        hitDamage: [2, 12, 12, 12, 13, 13, 13, 13],
        castTime: 20,
        offset: 14,
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
        framesList: [22, 8, 8, 8, 8, 8, 8, 8],
        hitDamage: [2, 12, 12, 12, 13, 13, 13, 13],
        castTime: 20,
        offset: 14,
        base: 400
      }
    ]
  },
  {
    id: 32,
    names: {
      en: "Vargas",
      tw: "瓦爾加斯",
      kr: "발가스"
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
        framesList: [2, 10, 10, 10, 78],
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
        framesList: [240],
        castTime: 40,
        offset: 14,
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
      tw: "維多利亞",
      kr: "빅토리아"
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
        framesList: [57, 24, 24, 24, 24, 24, 24, 24, 24, 24],
        castTime: 40,
        offset: 14,
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
        framesList: [57, 24, 24, 24, 24, 24, 24, 24, 24, 24],
        castTime: 40,
        offset: 14,
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
        framesList: [42, 8, 8, 8, 8, 8, 8, 8],
        hitDamage: [12, 13, 12, 13, 12, 13, 12, 13],
        castTime: 40,
        offset: 14,
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
        framesList: [42, 8, 8, 8, 8, 8, 8, 8],
        hitDamage: [12, 13, 12, 13, 12, 13, 12, 13],
        castTime: 40,
        offset: 14,
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
        framesList: [42, 8, 8, 8, 8, 8, 8],
        hitDamage: [14, 14, 14, 14, 14, 15, 15],
        castTime: 40,
        offset: 14,
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
        framesList: [42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
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
        framesList: [42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
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
        framesList: [42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
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
        framesList: [42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
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
        framesList: [42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
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
        framesList: [42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        castTime: 40,
        offset: 14,
        base: 220
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
        framesList: [42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        hitDamage: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7],
        castTime: 40,
        offset: 14,
        base: 520
      },
      {
        id: 507308,
        "names": {
          "en": "Splendor of the Wind + 2",
          "tw": "風之光輝 + 2",
          "kr": "바람의 인도 + 2",
          "fr": "Splendeur du vent + 2",
          "de": "Windpracht + 2",
          "es": "Esplendor de viento + 2"
        },
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 400,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ]
      },
      {
        id: 507310,
        "names": {
          "en": "Splendor of the Fire + 2",
          "tw": "火之光輝 + 2",
          "kr": "불꽃의 인도 + 2",
          "fr": "Splendeur du feu + 2",
          "de": "Feuerpracht + 2",
          "es": "Esplendor de fuego + 2"
        },
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 400,
        "debuffs": [
          {
            "type": "fire",
            "value": 50
          }
        ]
      },
      {
        id: 507312,
        "names": {
          "en": "Splendor of the Water + 2",
          "tw": "水之光輝 + 2",
          "kr": "물의 인도 + 2",
          "fr": "Splendeur de l'eau + 2",
          "de": "Wasserpracht + 2",
          "es": "Esplendor de agua + 2"
        },
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 400,
        "debuffs": [
          {
            "type": "water",
            "value": 50
          }
        ]
      },
      {
        id: 507314,
        "names": {
          "en": "Splendor of the Earth + 2",
          "tw": "土之光輝 + 2",
          "kr": "땅의 인도 + 2",
          "fr": "Splendeur de la terre + 2",
          "de": "Erdpracht + 2",
          "es": "Esplendor de tierra + 2"
        },
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 400,
        "debuffs": [
          {
            "type": "earth",
            "value": 50
          }
        ]
      },
      {
        "id": 506840,
        "names": {
          "en": "Onion Slice (+ 2)",
          "tw": "洋蔥刺 (+ 2)",
          "kr": "양파 슬라이스 (+ 2)",
          "fr": "Tranche-oignon (+ 2)",
          "de": "Zwiebelschnitt (+ 2)",
          "es": "Corte cebolla (+ 2)"
        },
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 720
      },
      {
        "id": 506860,
        "names": {
          "en": "Onion Cutter (+ 2)",
          "tw": "洋蔥斬 (+ 2)",
          "kr": "양파 칼날 (+ 2)",
          "fr": "Coupe-oignon (+ 2)",
          "de": "Zwiebelschneider (+ 2)",
          "es": "Cortador cebolla (+ 2)"
        },
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7
        ],
        "castTime": 40,
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 880
      },
      {
        "id": 507290,
        "names": {
          "en": "Onion Chop",
          "tw": "洋蔥斬碎",
          "kr": "다진 양파",
          "fr": "Taillade de l'Oignon",
          "de": "Zwiebelschlag",
          "es": "Tajo Cebolla"
        },
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "framesList": [
          42, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "offset": 8,
        "base": 1100
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
        framesList: [68, 4, 47, 4, 35, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20, 4],
        hitDamage: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10],
        base: 1100,
        dualable: false
      }
    ]
  },
  {
    id: 36,
    names: {
      en: "Veritas of the Flame",
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
        framesList: [90],
        castTime: 40,
        offset: 14,
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
        framesList: [90],
        castTime: 40,
        offset: 14,
        base: 500,
        ignore: 50
      },
      {
        id: 911181,
        "names": {
          "en": "Heavy Stomp + 2",
          "tw": "沉重印章 + 2",
          "kr": "무거운 발구르기 + 2",
          "fr": "Piétinement + 2",
          "de": "Schwerer Stampfer + 2",
          "es": "Pisotón fuerte + 2"
        },
        "castTime": 40,
        "framesList": [
          90
        ],
        "offset": 14,
        "base": 300,
        "ignore": 50
      },
      {
        id: 911182,
        "names": {
          "en": "Power Stomp + 2",
          "tw": "全力重踏 + 2",
          "kr": "힘의 발구르기 + 2",
          "fr": "Choc brutal + 2",
          "de": "Kraftstampfer + 2",
          "es": "Pisotón potente + 2"
        },
        "castTime": 40,
        "framesList": [
          90
        ],
        "offset": 14,
        "base": 500,
        "ignore": 50
      },
      {
        id: 506290,
        "names": {
          "en": "Full Charge Stomp + 2",
          "tw": "超蓄力印章 + 2",
          "kr": "전력 발구르기 + 2",
          "fr": "Piétinement maximum + 2",
          "de": "Voller Stampfer + 2",
          "es": "Pisotón total + 2"
        },
        "castTime": 40,
        "framesList": [
          90
        ],
        "offset": 14,
        "base": 620,
        "ignore": 50
      },
      {
        "id": 227131,
        "names": {
          "en": "Big Swing",
          "tw": "大力揮舞",
          "kr": "빅 스윙",
          "fr": "Grosse frappe",
          "de": "Großer Schwung",
          "es": "Gran golpe"
        },
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "framesList": [
          47
        ],
        "offset": 14
      },
      {
        "id": 507641,
        "names": {
          "en": "Red Inferno",
          "tw": "火紅地獄",
          "kr": "적색의 불길",
          "fr": "Enfer rouge",
          "de": "Rotes Inferno",
          "es": "Al rojo vivo"
        },
        "base": 3000,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "framesList": [
          92
        ],
        "offset": 14
      },
      {
        "id": 100008007,
        "names": {
          "en": "Burning Hellfire",
          "tw": "狂猛獄炎",
          "kr": "맹렬한 지옥불",
          "fr": "Feu de l'enfer",
          "de": "Brennendes Höllenfeuer",
          "es": "Fuego del averno"
        },
        "base": 740,
        "hitDamage": [
          100
        ],
        "elements": [
          "fire"
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          100
        ],
        "offset": 8
      }
    ]
  },
  {
    id: 37,
    names: {
      en: "Queen",
      tw: "葵因",
      kr: "퀸"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Devastate + 2",
          fr: "Dévastation + 2",
          tw: "毀滅之劍 + 2",
          kr: "데바스테이트 + 2",
          de: "Verwüstung + 2",
          es: "Devastador + 2"
        },
        framesList: [20, 26, 10, 10, 30],
        castTime: 40,
        offset: 80,
        base: 800
      },
      {
        "id": 226751,
        "names": {
          "en": "Armor Piercing",
          "tw": "鎧甲刺穿",
          "kr": "아머 피어싱",
          "fr": "Perforation renforcée",
          "de": "Rüstungsdurchstoß",
          "es": "Perforarmaduras"
        },
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 20,
        "framesList": [
          22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20
        ],
        "offset": 14,
        "base": 550
      },
      {
        "id": 226753,
        "names": {
          "en": "Hollow Piercing",
          "tw": "洞穿",
          "kr": "홀로우 피어싱",
          "fr": "Perforation vide",
          "de": "Hohldurchstoß",
          "es": "Perforación nimia"
        },
        "framesList": [
          2
        ],
        "offset": 8,
        "base": 375,
        "ignore": 50
      },
      {
        "id": 507321,
        "names": {
          "en": "Exploder",
          "tw": "雷管",
          "kr": "익스플로더",
          "fr": "Explosif",
          "de": "Sprengzünder",
          "es": "Explosivo"
        },
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 20
        ],
        "elements": [
          "lightning"
        ],
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 8,
        "base": 1500
      },
      {
        "id": 254000207,
        "names": {
          "en": "Divine Judgment",
          "tw": "十字審判",
          "kr": "크로스 저지",
          "fr": "Croix du jugement",
          "de": "Richtkreuz",
          "es": "Iudicium Crux"
        },
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "elements": [
          "light"
        ],
        "dualable": false,
        "framesList": [
          73, 15, 15, 15, 15, 15, 15
        ],
        "offset": 8,
        "base": 1400
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          226751,
          226753
        ]
      }
    ]
  },
  {
    id: 38,
    names: {
      en: "Prishe",
      tw: "普利修",
      kr: "프리쉬"
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
        framesList: [2, 5, 5, 5, 5, 5, 5, 5],
        hitDamage: [12, 12, 12, 12, 12, 12, 12, 16],
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
        framesList: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        hitDamage: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 16],
        offset: 66,
        base: 500,
        ignore: 50
      },
      {
        id: 504940,
        "names": {
          "en": "Tornado Kick+ + 2",
          "tw": "鬥魂旋風腳+ + 2",
          "kr": "투귀질풍각+ + 2",
          "fr": "Coup de pied tornade + + 2",
          "de": "Tornadotritt+ + 2",
          "es": "Patada tornado+ + 2"
        },
        "hitDamage": [
          30, 30, 40
        ],
        "framesList": [
          0, 30, 30
        ],
        "base": 250,
        "ignore": 50,
        offset: 66,
      },
      {
        id: 504970,
        "names": {
          "en": "Prishe Special + 2",
          "tw": "普利修特技 + 2",
          "kr": "프리쉬 스페셜 + 2",
          "fr": "Spécialité de Prishe + 2",
          "de": "Prishe-Spezial + 2",
          "es": "Especial de Prishe + 2"
        },
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 16
        ],
        "framesList": [
          4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "base": 500,
        "ignore": 50,
        offset: 66,
        "debuffs": [
          {
            "type": "fire",
            "value": 40
          },
          {
            "type": "ice",
            "value": 40
          },
          {
            "type": "lightning",
            "value": 40
          },
          {
            "type": "water",
            "value": 40
          },
          {
            "type": "wind",
            "value": 40
          },
          {
            "type": "earth",
            "value": 40
          },
          {
            "type": "light",
            "value": 40
          },
          {
            "type": "dark",
            "value": 40
          }
        ]
      },
      {
        "id": 227091,
        "names": {
          "en": "Knuckle Sandwich",
          "tw": "迎面猛拳",
          "kr": "너클 샌드위치",
          "fr": "Prise en sandwich",
          "de": "Backpfeife",
          "es": "Puñodillo"
        },
        "base": 520,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "framesList": [
          52
        ],
        "offset": 14
      },
      {
        "id": 507590,
        "names": {
          "en": "Auroral Uppercut",
          "tw": "羅剎七星拳",
          "kr": "나찰칠성권",
          "fr": "Uppercut de l'aurore",
          "de": "Rosiger Kinnhaken",
          "es": "Corte superior de la aurora"
        },
        "base": 1000,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "elements": [
          "light"
        ],
        "ignore": 50,
        "framesList": [
          19, 10, 10, 10, 10, 10, 20
        ],
        "offset": 8
      },
      {
        "id": 211000407,
        "names": {
          "en": "Nullifying Dropkick",
          "tw": "昆侖八象腳",
          "kr": "곤륜팔상각",
          "fr": "Savate immunisante",
          "de": "Verheerender Prellstoß",
          "es": "Patada aérea anuladora"
        },
        "base": 820,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          98
        ],
        "offset": 8
      },
      {
        "id": 900000067,
        "names": {
          "en": "Nullifying Dropkick + 1",
          "tw": "昆侖八象腳 + 1",
          "kr": "곤륜팔상각 + 1",
          "fr": "Savate immunisante + 1",
          "de": "Verheerender Prellstoß + 1",
          "es": "Patada aérea anuladora + 1"
        },
        "base": 820,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          },
          {
            "type": "ice",
            "value": 60
          },
          {
            "type": "lightning",
            "value": 60
          },
          {
            "type": "water",
            "value": 60
          },
          {
            "type": "wind",
            "value": 60
          },
          {
            "type": "earth",
            "value": 60
          },
          {
            "type": "light",
            "value": 60
          },
          {
            "type": "dark",
            "value": 60
          }
        ],
        "framesList": [
          98
        ],
        "offset": 8
      }
    ]
  },
  {
    id: 39,
    names: {
      en: "Nyx",
      tw: "尼克斯",
      kr: "닉스"
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
        framesList: [82, 8, 8, 8, 8, 8, 8, 8],
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        castTime: 40,
        offset: 26,
        base: 220,
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
        framesList: [180],
        castTime: 40,
        offset: 86,
        base: 900,
      },
      {
        "id": 706840,
        "names": {
          "en": "Warp Strike + 2",
          "tw": "變移破解 + 2",
          "kr": "시프트 브레이크 + 2",
          "fr": "Assaut éclipse + 2",
          "de": "Warp-Angriff + 2",
          "es": "Lux Impetus + 2"
        },
        "framesList": [
          40
        ],
        "offset": 8,
        "base": 250,
        "ignore": 50
      },
      {
        "id": 706860,
        "names": {
          "en": "Warp Charge + 2",
          "tw": "變移蓄力 + 2",
          "kr": "시프트 차지 + 2",
          "fr": "Charge éclipse + 2",
          "de": "Warpansturm + 2",
          "es": "Lux Assultus + 2"
        },
        "framesList": [
          40
        ],
        "offset": 8,
        "base": 250,
        "ignore": 50
      },
      {
        "id": 706880,
        "names": {
          "en": "Kingsglaive + 2",
          "tw": "王之劍 + 2",
          "kr": "왕의 검 + 2",
          "fr": "Glaive du roi + 2",
          "de": "Königsgleve + 2",
          "es": "Glaive real + 2"
        },
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "castTime": 40,
        "framesList": [
          82, 8, 8, 8, 8, 8, 8, 8
        ],
        "offset": 26,
        "base": 325,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 70
          }
        ]
      },
      {
        "id": 215001107,
        "names": {
          "en": "Lethal Combat",
          "tw": "致命格鬥",
          "kr": "목숨을 건 전투",
          "fr": "Combat mortel",
          "de": "Tödlicher Kampf",
          "es": "Trifulca letal"
        },
        "hitDamage": [
          25, 25, 25, 25
        ],
        "dualable": false,
        "framesList": [
          36, 43, 27, 34
        ],
        "offset": 8,
        "base": 800,
        "ignore": 50
      },
      {
        "id": 900000197,
        "names": {
          "en": "Lethal Combat + 1",
          "tw": "致命格鬥 + 1",
          "kr": "목숨을 건 전투 + 1",
          "fr": "Combat mortel + 1",
          "de": "Tödlicher Kampf + 1",
          "es": "Trifulca letal + 1"
        },
        "hitDamage": [
          25, 25, 25, 25
        ],
        "dualable": false,
        "framesList": [
          36, 43, 27, 34
        ],
        "offset": 8,
        "base": 800,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          }
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          706840,
          706860,
          706880
        ]
      }
    ]
  },
  {
    id: 40,
    names: {
      en: "Glauca",
      tw: "格拉烏卡",
      kr: "글라우카"
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
        framesList: [102, 9, 9, 9, 9, 9, 9, 9],
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
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
      },
      {
        id: 706940,
        "names": {
          "en": "Great Chop + 2",
          "tw": "大斬擊 + 2",
          "kr": "대참격 + 2",
          "fr": "Grand coup + 2",
          "de": "Großes Beil + 2",
          "es": "Despedazador + 2"
        },
        "castTime": 30,
        "framesList": [
          140
        ],
        "offset": 14,
        "base": 260,
        "ignore": 50
      }
    ]
  },
  {
    id: 41,
    names: {
      en: "Pod 153",
      tw: "輔助機１５３",
      kr: "포드 153"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "R020: Mirage",
          tw: "R020：幻象",
          kr: "R020: 미라쥬",
          de: "R020: Illusion",
          es: "R020: Espejismo"
        },
        framesList: [42, 10, 10, 10, 10, 10, 10, 10],
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        castTime: 40,
        offset: 14,
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
          de: "Meteo"
        },
        framesList: [350],
        castTime: 40,
        offset: 14,
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
          de: "Meteo +2"
        },
        type: "finish",
        framesList: [310, 20, 20],
        hitDamage: [33, 33, 34],
        castTime: 40,
        offset: 14,
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
          tw: "究極",
          kr: "알테마",
          es: "Artema"
        },
        framesList: [365],
        castTime: 40,
        offset: 14,
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
        framesList: [170],
        castTime: 40,
        offset: 14,
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
        framesList: [170],
        castTime: 40,
        offset: 14,
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
        framesList: [190],
        castTime: 40,
        offset: 14,
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
        framesList: [150],
        castTime: 40,
        offset: 14,
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
        framesList: [240],
        castTime: 40,
        offset: 14,
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
        framesList: [210],
        castTime: 40,
        offset: 14,
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
        framesList: [42, 8, 8, 8, 8, 8, 16],
        hitDamage: [14, 14, 15, 14, 14, 15, 14],
        castTime: 40,
        offset: 14,
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
        framesList: [120],
        castTime: 40,
        offset: 14,
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
          de: "Sanctus"
        },
        castTime: 40,
        damage: "magic",
        magicType: "white",
        elements: [
          "light"
        ],
        dualable: false,
        framesList: [450],
        offset: 14,
        base: 230
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
      de: "Schicke Ariana"
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
        framesList: [139, 7, 7, 8, 8, 16, 8],
        hitDamage: [10, 15, 15, 15, 15, 15, 15],
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
        framesList: [10],
        offset: 40,
        base: 350,
      }
    ]
  },
  {
    id: 45,
    names: {
      en: "Adam",
      tw: "亞當",
      kr: "아담",
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
        framesList: [60],
        offset: 40,
        base: 500,
      }
    ]
  },
  {
    id: 47,
    names: {
      en: "Kelsus",
      tw: "凱爾蘇斯",
      kr: "켈서스"
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
        framesList: [60],
        offset: 40,
        base: 500,
      }
    ]
  },
  {
    id: 48,
    names: {
      en: "Maxwell",
      tw: "麥斯威爾",
      kr: "막스웰"
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
        framesList: [102],
        castTime: 40,
        offset: 14,
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
        framesList: [70],
        castTime: 40,
        offset: 14,
        base: 250,
        ignore: 35
      }
    ]
  },
  {
    id: 50,
    names: {
      en: "Helena",
      tw: "海倫娜",
      kr: "헬레나"
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
        framesList: [100],
        castTime: 40,
        offset: 14,
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
        framesList: [100],
        castTime: 40,
        offset: 14,
        base: 555
      }
    ]
  },
  {
    id: 51,
    names: {
      en: "Zargabaath",
      tw: "查格博斯",
      kr: "자르가바스"
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
        framesList: [270],
        castTime: 40,
        offset: 14,
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
        castTime: 40,
        damage: "magic",
        elements: [
          "light"
        ],
        dualable: false,
        framesList: [270],
        offset: 14,
        base: 300,
        ignore: 50
      },
      {
        "id": 911415,
        "names": {
          "en": "Vengeance Blade",
          "tw": "復仇·刀刃",
          "kr": "벤젠스 블레이드",
          "fr": "Lame vengeresse",
          "de": "Racheklinge",
          "es": "Hoja de la venganza"
        },
        "base": 600,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 58
        ],
        "castTime": 40,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 401001107,
        "names": {
          "en": "Alexander Crest",
          "tw": "亞歷山大紋章",
          "kr": "알렉산더의 문장",
          "fr": "Emblème d'Alexandre",
          "de": "Alexanderwappen",
          "es": "Emblema alexandrino"
        },
        "base": 645,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          180
        ],
        "offset": 8
      }
    ]
  },
  {
    id: 52,
    names: {
      en: "Luneth",
      tw: "路涅斯",
      kr: "루네스"
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
        framesList: [60],
        offset: 40,
        base: 525,
        ignore: 50
      },
      {
        id: 226731,
        "names": {
          "en": "Blade Torrent",
          "tw": "流劍之舞",
          "kr": "연검의 춤",
          "fr": "Torrent de lames",
          "de": "Klingenflut",
          "es": "Torrente de espadas"
        },
        "hitDamage": [
          30,
          30,
          40
        ],
        "framesList": [
          27,
          16,
          34
        ],
        "offset": 8,
        "base": 1000
      },
      {
        id: 203000207,
        "names": {
          "en": "Strong Heart",
          "tw": "勇敢之心",
          "kr": "강인한 마음",
          "fr": "Âme courageuse",
          "de": "Mutiges Herz",
          "es": "Corazón fuerte"
        },
        "dualable": false,
        "framesList": [
          142
        ],
        "offset": 8,
        "base": 1350
      },
      {
        id: 203000207,
        "names": {
          "en": "Strong Heart + 1",
          "tw": "勇敢之心 + 1",
          "kr": "강인한 마음 + 1",
          "fr": "Âme courageuse + 1",
          "de": "Mutiges Herz + 1",
          "es": "Corazón fuerte + 1"
        },
        "dualable": false,
        "framesList": [
          142
        ],
        debuffs: [
          {
            type: "fire",
            value: 74
          },
          {
            type: "water",
            value: 74
          },
          {
            type: "wind",
            value: 74
          },
          {
            type: "earth",
            value: 74
          }
        ],
        "offset": 8,
        "base": 1350
      }
    ]
  },
  {
    id: 53,
    names: {
      en: "Grace",
      tw: "格蕾斯",
      kr: "그레이스"
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
        framesList: [80],
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
      tw: "蕾姆",
      kr: "렘"
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
        damage: "magic",
        framesList: [120],
        castTime: 40,
        offset: 14,
        base: 820
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
        damage: "magic",
        framesList: [120],
        castTime: 40,
        offset: 14,
        base: 1060
      },
      {
        "id": 226811,
        "names": {
          "en": "Flying Daggers",
          "tw": "匕首投擲",
          "kr": "대거 샷",
          "fr": "Dagues furieuses",
          "de": "Fliegende Dolche",
          "es": "Dagas voladoras"
        },
        "damage": "magic",
        "base": 640,
        "hitDamage": [
          11, 11, 11, 11, 11, 11, 11, 11, 12
        ],
        "castTime": 20,
        "framesList": [
          30, 20, 20, 20, 20, 20, 20, 20, 20
        ],
        "offset": 14
      },
      {
        "id": 20390,
        "names": {
          "en": "Tornado",
          "tw": "龍捲風",
          "kr": "토네이도",
          "fr": "Tornade"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ],
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14
      },
      {
        "id": 20400,
        "names": {
          "en": "Quake",
          "tw": "地槌",
          "kr": "퀘이크",
          "fr": "Séisme",
          "de": "Beben",
          "es": "Seísmo"
        },
        "damage": "magic",
        "base": 275,
        "hitDamage": [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "earth"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "earth",
            "value": 50
          }
        ],
        "framesList": [
          160, 22, 21, 22, 23, 23, 22, 23
        ],
        "offset": 14
      },
      {
        "id": 254000907,
        "names": {
          "en": "Seraphim Strike",
          "tw": "魔法衛星",
          "kr": "매직 새틀라이트",
          "fr": "Punition céleste",
          "de": "Seraphim-Schlag",
          "es": "Haz brujo"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          100
        ],
        "offset": 8
      }
    ],
    "multipleBlack": 2,
  },
  {
    id: 55,
    names: {
      en: "Zyrus",
      tw: "扎拉斯",
      kr: "자이러스"
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
        framesList: [130],
        castTime: 30,
        offset: 14,
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
        framesList: [90],
        castTime: 30,
        offset: 14,
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
        framesList: [215],
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
        castTime: 30,
        damage: "magic",
        elements: [
          "water"
        ],
        dualable: false,
        framesList: [90],
        offset: 14,
        base: 750
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
        castTime: 30,
        damage: "magic",
        dualable: false,
        framesList: [130],
        offset: 14,
        base: 1050
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
      tw: "夏因",
      kr: "샤인"
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
        framesList: [23],
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
      tw: "奧利芙",
      kr: "올리브",
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
        framesList: [100],
        castTime: 20,
        offset: 14,
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
        framesList: [100],
        castTime: 20,
        offset: 14,
        base: 350,
        ignore: 50
      },
      {
        id: 911185,
        "names": {
          "en": "Empowering Shot",
          "tw": "增力射擊",
          "kr": "혈기의 포탄",
          "fr": "Tir valorisant",
          "de": "Bestärkender Schuss",
          "es": "Disparo empoderante"
        },
        "castTime": 20,
        "framesList": [
          100
        ],
        "offset": 14,
        "base": 300,
        "ignore": 50
      },
      {
        id: 911189,
        "names": {
          "en": "Immolation Blast",
          "tw": "獻祭衝擊",
          "kr": "희생의 돌풍",
          "fr": "Immolation",
          "de": "Zorniges Opfer<br>",
          "es": "Inmolación"
        },
        "castTime": 40,
        "framesList": [
          240
        ],
        "offset": 14,
        "base": 1500,
        "debuffs": [
          {
            "type": "fire",
            "value": 100
          },
          {
            "type": "lightning",
            "value": 100
          }
        ]
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
        framesList: [350],
        castTime: 40,
        offset: 14,
        base: 230,
        ignore: 50,
        damage: "magic",
        dualable: false,
      },
      {
        id: 204980,
        names: {
          en: "Fire From Below",
          fr: "Feu de l'Enfer",
          tw: "地獄業火",
          kr: "지옥의 업화",
          de: "Feuer von unten",
          es: "Fuego del averno"
        },
        framesList: [80],
        castTime: 40,
        offset: 14,
        base: 2000,
        damage: "magic",
        elements : [
          "fire"
        ],
        dualable: false,
      },
      {
        id: 702720,
        names: {
          en: "Fire From Below +2",
          fr: "Feu de l'Enfer +2",
          tw: "地獄業火 +2",
          kr: "지옥의 업화 +2",
          de: "Feuer von unten +2",
          es: "Fuego del averno +2"
        },
        framesList: [80],
        castTime: 40,
        offset: 14,
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
      },
      {
        "id": 202000507,
        "names": {
          "en": "Fierce Wind",
          "tw": "龍捲",
          "kr": "회오리바람",
          "fr": "Cyclone",
          "de": "Heftiger Wind",
          "es": "Ciclón"
        },
        "damage": "magic",
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "elements": [
          "wind"
        ],
        "dualable": false,
        "framesList": [
          78, 4, 4, 4, 4, 4, 4
        ],
        "offset": 8,
        "base": 1350,
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          },
          {
            "type": "ice",
            "value": 60
          },
          {
            "type": "lightning",
            "value": 60
          },
          {
            "type": "water",
            "value": 60
          },
          {
            "type": "wind",
            "value": 60
          },
          {
            "type": "earth",
            "value": 60
          },
          {
            "type": "light",
            "value": 60
          },
          {
            "type": "dark",
            "value": 60
          }
        ]
      }
    ],
    "multipleBlack": 2,
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          204980,
          702720
        ]
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
        framesList: [20],
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
      },
      {
        id: 507261,
        "names": {
          "en": "Soul Over",
          "tw": "靈魂終結",
          "kr": "소울 오버",
          "fr": "Esprit supérieur",
          "de": "Superseele",
          "es": "Quitaalmas"
        },
        "castTime": 10,
        "framesList": [
          42
        ],
        "offset": 14,
        "base": 1300
      },
      {
        id: 204000117,
        "names": {
          "en": "Shadowbringer",
          "tw": "暗影使者",
          "kr": "섀도우 브링거",
          "fr": "Emprise de l'ombre",
          "de": "Schattenbringer",
          "es": "Portasombras"
        },
        "elements": [
          "dark"
        ],
        "dualable": false,
        "framesList": [
          300
        ],
        "offset": 8,
        "base": 1150
      }
    ]
  },
  {
    id: 60,
    names: {
      en: "Gaffgarion",
      tw: "加夫加利安",
      kr: "가프가리온"
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
        framesList: [120],
        castTime: 40,
        offset: 14,
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
      tw: "凱夫卡",
      kr: "케프카"
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
        framesList: [110],
        castTime: 40,
        offset: 14,
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
      tw: "巴茲",
      kr: "버츠"
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
        framesList: [70],
        castTime: 40,
        offset: 14,
        base: 700,
        damage: "hybrid"
      }
    ]
  },
  {
    id: 63,
    names: {
      en: "Goken",
      tw: "剛健",
      kr: "고우켄"
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
        framesList: [42, 10, 10, 10, 10, 10],
        hitDamage: [16, 16, 17, 17, 17, 17],
        castTime: 40,
        offset: 14,
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
        framesList: [50, 10, 10, 10, 10, 10],
        hitDamage: [16, 16, 17, 17, 17, 17],
        castTime: 40,
        offset: 14,
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
        framesList: [42, 10, 10, 10, 10, 10, 10, 10],
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        castTime: 40,
        offset: 14,
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
        framesList: [42, 10, 10, 10, 10, 10, 10, 10],
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        castTime: 40,
        offset: 14,
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
        framesList: [42, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        castTime: 40,
        offset: 14,
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
        framesList: [42, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        castTime: 40,
        offset: 14,
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
        framesList: [47, 7, 9, 7, 9, 7, 9, 9, 5, 5],
        hitDamage: [5, 5, 5, 5, 5, 5, 5, 65],
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
        framesList: [50, 10, 10, 10, 10, 10, 10],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        castTime: 40,
        offset: 14,
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
          es: "Versus"
        },
        framesList: [365],
        castTime: 40,
        offset: 14,
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
        framesList: [62, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        hitDamage: [5, 5, 5, 7, 7, 8, 9, 9, 10, 35],
        castTime: 30,
        offset: 26,
        base: 300,
        ignore: 50,
        damage: "magic",
        dualable: false
      },
      {
        "id": 911453,
        "names": {
          "en": "Grim - Soul Barrage + 2",
          "tw": "冷血 - 靈魂彈幕 + 2",
          "kr": "사신·영혼 난사 + 2",
          "fr": "Obscurité - Barrage spectral + 2",
          "de": "Grimm - Seelensperre + 2",
          "es": "Parca - Ráfaga de alma + 2"
        },
        "damage": "magic",
        "base": 400,
        "hitDamage": [
          5, 5, 5, 7, 7, 8, 9, 9, 10, 35
        ],
        "castTime": 30,
        "dualable": false,
        "ignore": 50,
        "framesList": [
          62, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
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
        framesList: [110, 10, 10, 10, 10],
        hitDamage: [10, 10, 15, 15, 50],
        offset: 56,
        base: 400,
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
        "id": 911451,
        "names": {
          "en": "Grim - Eldritch Flames + 2",
          "tw": "冷血 - 鬼火 + 2",
          "kr": "사신·오싹한 불꽃 + 2",
          "fr": "Obscurité - Flammes surnaturelles + 2",
          "de": "Grimm - Unirdische Flammen + 2",
          "es": "Parca - Llama de Eldritch + 2"
        },
        "damage": "magic",
        "base": 500,
        "hitDamage": [
          10, 10, 15, 15, 50
        ],
        "elements": [
          "fire",
          "dark"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "fire",
            "value": 65
          },
          {
            "type": "dark",
            "value": 65
          }
        ],
        "framesList": [
          110, 10, 10, 10, 10
        ],
        "offset": 8
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
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "lightning"
        ],
        dualable: false,
        framesList: [150],
        offset: 14,
        base: 600
      },
      {
        "id": 911459,
        "names": {
          "en": "Grim - Eldritch Wave",
          "tw": "冷血 - 恐懼波",
          "kr": "사신·으스스한 파동",
          "fr": "Obscurité - Onde spectrale",
          "de": "Grimm - Schauerliche Welle",
          "es": "Parca - Ola de Eldritch"
        },
        "damage": "magic",
        "base": 700,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 50,
        "elements": [
          "fire",
          "dark"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "fire",
            "value": 50
          },
          {
            "type": "dark",
            "value": 50
          }
        ],
        "framesList": [
          52, 20, 20, 20, 20
        ],
        "offset": 14
      },
      {
        "id": 401002007,
        "names": {
          "en": "Phantom Fury",
          "tw": "狂怒幻影",
          "kr": "유령의 진노",
          "fr": "Furie fantomatique",
          "de": "Phantomwut",
          "es": "Furia fantasma"
        },
        "damage": "magic",
        "base": 1110,
        "hitDamage": [
          5, 7, 8, 9, 10, 11, 12, 13, 25
        ],
        "dualable": false,
        "framesList": [
          62, 4, 4, 4, 4, 4, 4, 4, 30
        ],
        "offset": 8
      }
    ],
    "multipleBlack": 2,
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          910520,
          910526,
          911459,
          911453,
          911451
        ]
      }
    ]
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
        framesList: [22, 5, 5, 5, 5, 5],
        hitDamage: [16, 16, 16, 17, 17, 18],
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
        "id": 911544,
        "names": {
          "en": "Feed the Fishes + 2",
          "tw": "餵魚 + 2",
          "kr": "물고기 밥 + 2",
          "fr": "Nourrissez les poissons + 2",
          "de": "Macht sie zu Fischfutter! + 2",
          "es": "Echadlo a los peces + 2"
        },
        "base": 450,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 20,
        "debuffs": [
          {
            "type": "water",
            "value": 50
          }
        ],
        "framesList": [
          22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20
        ],
        "offset": 14
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
        framesList: [62, 10, 10, 10, 35, 10, 10, 10],
        hitDamage: [10, 10, 12, 12, 13, 13, 15, 15],
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
      }
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
        framesList: [50, 8, 8, 8, 8, 8, 8],
        hitDamage: [14, 14, 14, 14, 14, 14, 16],
        castTime: 20,
        offset: 14,
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
        framesList: [170],
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
        framesList: [170],
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
      tw: "伊弗利特",
      kr: "이프리트"
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
        framesList: [110],
        base: 14000,
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
        framesList: [110],
        base: 23500,
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
      tw: "濕婆",
      kr: "시바"
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
        framesList: [110],
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
        framesList: [110],
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
      tw: "迪亞波羅斯",
      kr: "디아볼로스",
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
        framesList: [190],
        base: 17000,
        damage: "magic",
        elements: [
          "dark"
        ],
        dualable: false
      },
      {
        id: 10503,
        "names": {
          "en": "Dark Messenger (3)",
          "tw": "黑暗使者 (3)",
          "kr": "어둠에서 온 사자 (3)",
          "fr": "Héraut ténébreux (3)",
          "de": "Dunkler Bote (3)",
          "es": "Emisario de la noche (3)"
        },
        elements: [
          "dark"
        ],
        "dualable": false,
        "damage": "magic",
        "base": 30000,
        "framesList": [
          400
        ],
        "offset": 8
      }
    ]
  },
  {
    id: 73,
    names: {
      en: "Ramuh",
      tw: "拉姆",
      kr: "라무",
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
        framesList: [110],
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
        framesList: [110],
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
      tw: "泰坦",
      kr: "타이탄",
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
        framesList: [170],
        base: 17000,
        elements: [
          "earth"
        ],
        dualable: false
      },
      {
        id: 10803,
        names: {
          en: "Gaia's Wrath (3)",
          tw: "大地之怒 (3)",
          kr: "대지의 분노 (3)",
          fr: "Colère de Gaïa (3)",
          de: "Gaias Wut (3)",
          es: "Ira de la tierra (3)"
        },
        elements: [
          "earth"
        ],
        dualable: false,
        base: 22000,
        framesList: [120]
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
        framesList: [190],
        base: 18000,
        damage: "magic",
        elements: [
          "wind"
        ],
        dualable: false
      },
      {
        id: 10903,
        "names": {
          "en": "Heavenswind (3)",
          "tw": "四天之風 (3)",
          "kr": "사천의 바람 (3)",
          "fr": "Vent céleste (3)",
          "de": "Himmelswind (3)",
          "es": "Viento celestial (3)"
        },
        "castTime": 40,
        "dualable": false,
        "damage": "magic",
        "base": 23000,
        "framesList": [
          230
        ],
        elements: [
          "wind"
        ],
        "offset": 14
      }
    ]
  },
  {
    id: 76,
    names: {
      en: "Odin",
      tw: "奧汀",
      kr: "오딘",
      es: "Odín"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Zantetsuken (2)",
          tw: "斬鐵劍 (2)",
          kr: "참철검 (2)",
          es: "Sable justiciero (2)"
        },
        framesList: [70],
        base: 20000,
        dualable: false
      },
      {
        "id": 11003,
        "names": {
          "en": "Shin Zantetsuken (3)",
          "tw": "真·斬鐵劍 (3)",
          "kr": "진·참철검 (3)",
          "es": "Sable justiciero+ (3)"
        },
        "dualable": false,
        "base": 21000,
        "framesList": [
          70
        ]
      }
    ]
  },
  {
    id: 77,
    names: {
      en: "Bahamut",
      tw: "巴哈姆特",
      kr: "바하무트"
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
        framesList: [170],
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
      tw: "洛倫",
      kr: "로렌"
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
        framesList: [2, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        offset: 66,
        base: 680,
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
        framesList: [2, 7, 7, 7, 7, 7, 7, 7],
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        offset: 26,
        base: 360,
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
        framesList: [42, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        castTime: 40,
        offset: 17,
        base: 640
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
        framesList: [50],
        offset: 40,
        base: 350,
        ignore: 50,
        elements: [
          "lightning"
        ],
      },
      {
        "id": 227162,
        "names": {
          "en": "High-Voltage Twin Blade",
          "tw": "迅雷雙刃",
          "kr": "신뢰의 쌍날",
          "fr": "Lame jumelle électrifiée",
          "de": "Donnernde Zwillingsklinge",
          "es": "Espada doble de alto voltaje"
        },
        "base": 600,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "debuffs": [
          {
            "type": "lightning",
            "value": 65
          }
        ],
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 227163,
        "names": {
          "en": "Dazzling Twin Blade",
          "tw": "炫光雙刃",
          "kr": "현광의 쌍날",
          "fr": "Lame jumelle éblouissante",
          "de": "Gleißende Zwillingsklinge",
          "es": "Espada doble deslumbrante"
        },
        "base": 600,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "debuffs": [
          {
            "type": "light",
            "value": 65
          }
        ],
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 227161,
        "names": {
          "en": "Tempestuous Twin Blade",
          "tw": "疾風雙刃",
          "kr": "질풍의 쌍날",
          "fr": "Lame jumelle tempétueuse",
          "de": "Stürmische Zwillingsklinge",
          "es": "Espada doble tempestuosa"
        },
        "base": 600,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "debuffs": [
          {
            "type": "wind",
            "value": 65
          }
        ],
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 227164,
        "names": {
          "en": "Tempest Flash",
          "tw": "烈風飛電",
          "kr": "열풍비전",
          "fr": "Éclat de tempête",
          "de": "Sturmblitz",
          "es": "Destello tempestuoso"
        },
        "base": 620,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "elements": [
          "lightning",
          "wind"
        ],
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "offset": 14
      },
      {
        "id": 100009107,
        "names": {
          "en": "Kingdom's Order",
          "tw": "王國秩序",
          "kr": "왕국의 질서",
          "fr": "Ordre royal",
          "de": "Königlicher Befehl",
          "es": "Orden del reino"
        },
        "base": 750,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 12, 12, 12, 12, 12, 13
        ],
        "dualable": false,
        "ignore": 50,
        "debuffs": [
          {
            "type": "lightning",
            "value": 79
          },
          {
            "type": "wind",
            "value": 79
          }
        ],
        "framesList": [
          34, 10, 13, 14, 14, 10, 13, 14, 24, 12, 34, 18, 18, 18, 16
        ],
        "offset": 8
      }
    ],
  },
  {
    id: 79,
    names: {
      en: "Barbariccia",
      tw: "巴爾巴莉希亞",
      kr: "발바리시아",
      de: "Barbarizia"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Tornado",
          fr: "Tornade",
          tw: "龍捲風",
          kr: "토네이도"
        },
        framesList: [80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        castTime: 40,
        offset: 14,
        base: 300,
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
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "wind"
        ],
        dualable: false,
        framesList: [170],
        offset: 14,
        base: 600
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
        framesList: [100],
        castTime: 20,
        offset: 14,
        base: 1000,
        elements: [
          "wind",
          "lightning"
        ],
        damage: "magic",
        dualable: false
      },
      {
        "id": 911394,
        "names": {
          "en": "Sunder + 2",
          "tw": "斬斷 + 2",
          "kr": "천둥 + 2",
          "fr": "Bourrasque électrique + 2",
          "de": "Blitzwind + 2",
          "es": "Arrasar + 2"
        },
        "damage": "magic",
        "base": 2000,
        "hitDamage": [
          100
        ],
        "castTime": 20,
        "elements": [
          "lightning",
          "wind"
        ],
        "dualable": false,
        "framesList": [
          100
        ],
        "offset": 14
      },
      {
        "id": 911398,
        "names": {
          "en": "Tempest Eye Wall",
          "tw": "暴風眼之牆",
          "kr": "태풍의 눈",
          "fr": "Mur cyclonique",
          "de": "Sturmaugenmauer",
          "es": "Muro tempestuoso"
        },
        "damage": "magic",
        "base": 1200,
        "hitDamage": [
          12, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8
        ],
        "castTime": 40,
        "elements": [
          "lightning",
          "wind"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "lightning",
            "value": 120
          },
          {
            "type": "wind",
            "value": 120
          }
        ],
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14
      },
      {
        "id": 91014,
        "names": {
          "en": "Raging Wind",
          "tw": "烈風",
          "kr": "조에어로",
          "fr": "Vent rageur",
          "de": "Wütende Winde",
          "es": "Viento furibundo"
        },
        "damage": "magic",
        "base": 1200,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "framesList": [
          100
        ],
        "offset": 14
      },
      {
        "id": 401001407,
        "names": {
          "en": "Maelstrom",
          "tw": "大漩渦",
          "kr": "마엘스트롬",
          "fr": "Maelström",
          "de": "Mahlstrom",
          "es": "Vórtice"
        },
        "damage": "magic",
        "base": 545,
        "hitDamage": [
          6, 6, 7, 7, 8, 8, 9, 9, 40
        ],
        "elements": [
          "lightning",
          "wind"
        ],
        "dualable": false,
        "ignore": 50,
        "debuffs": [
          {
            "type": "lightning",
            "value": 104
          },
          {
            "type": "wind",
            "value": 104
          }
        ],
        "framesList": [
          100, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 8
      }
    ],
    multipleBlack: 3
  },
  {
    id: 80,
    names: {
      en: "Cor",
      tw: "柯爾",
      kr: "코르"
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
        offset: 60,
        base: 280
      },
      {
        id: 2,
        names: {
          en: "Slaughtering Blade + 2",
          tw: "斬瞬刀 + 2",
          kr: "참순도 + 2",
          fr: "Lame sanguinaire + 2",
          de: "Schlachtklinge + 2",
          es: "Hoja sanguinaria + 2"
        },
        framesList: [0, 8, 8, 8, 8, 8, 8, 8],
        hitDamage: [12, 12, 12, 12, 12, 12, 12, 16],
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
      kr: "녹티스"
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
        framesList: [52, 22, 13],
        hitDamage: [60, 20, 20],
        castTime: 50,
        offset: 120,
        base: 350,
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
        framesList: [52, 22, 13],
        hitDamage: [60, 20, 20],
        castTime: 50,
        offset: 120,
        base: 625,
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
        framesList: [80],
        castTime: 40,
        offset: 60,
        base: 400,
        damage: "hybrid",
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
        framesList: [145],
        castTime: 40,
        offset: 60,
        base: 400,
        damage: "hybrid",
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
        framesList: [95],
        castTime: 40,
        offset: 60,
        base: 400,
        damage: "hybrid",
        elements: [
          "fire"
        ]
      },
      {
        "id": 507682,
        "names": {
          "en": "Quintcast III (1)",
          "tw": "無盡華爾滋 (1)",
          "kr": "엔드리스 왈츠 (1)",
          "fr": "Arcane quintuple III (1)",
          "de": "Ars Quintae III (1)",
          "es": "Elementia++ V (1)"
        },
        "damage": "hybrid",
        "base": 600,
        "hitDamage": [
          50, 50
        ],
        "castTime": 40,
        "elements": [
          "fire",
          "ice"
        ],
        "framesList": [
          75, 105
        ],
        "offset": 14
      },
      {
        "id": 507683,
        "names": {
          "en": "Quintcast III (2)",
          "tw": "無盡華爾滋 (2)",
          "kr": "엔드리스 왈츠 (2)",
          "fr": "Arcane quintuple III (2)",
          "de": "Ars Quintae III (2)",
          "es": "Elementia++ V (2)"
        },
        "damage": "hybrid",
        "base": 750,
        "hitDamage": [
          33, 33, 34
        ],
        "castTime": 40,
        "elements": [
          "fire",
          "ice",
          "lightning"
        ],
        "framesList": [
          125, 40, 55
        ],
        "offset": 14
      },
      {
        "id": 507684,
        "names": {
          "en": "Quintcast III (3)",
          "tw": "無盡華爾滋 (3)",
          "kr": "엔드리스 왈츠 (3)",
          "fr": "Arcane quintuple III (3)",
          "de": "Ars Quintae III (3)",
          "es": "Elementia++ V (3)"
        },
        "damage": "hybrid",
        "base": 900,
        "hitDamage": [
          25, 25, 25, 25
        ],
        "castTime": 40,
        "elements": [
          "fire",
          "ice",
          "lightning"
        ],
        "framesList": [
          40, 55, 105, 40
        ],
        "offset": 14
      },
      {
        "id": 507685,
        "names": {
          "en": "Quintcast III (4)",
          "tw": "無盡華爾滋 (4)",
          "kr": "엔드리스 왈츠 (4)",
          "fr": "Arcane quintuple III (4)",
          "de": "Ars Quintae III (4)",
          "es": "Elementia++ V (4)"
        },
        "damage": "hybrid",
        "base": 1050,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 40,
        "elements": [
          "fire",
          "ice",
          "lightning"
        ],
        "framesList": [
          25, 155, 40, 55, 105
        ],
        "offset": 14
      },
      {
        "id": 507681,
        "names": {
          "en": "Armiger Wakes",
          "tw": "覺醒幻影劍",
          "kr": "각성 팬텀 소드",
          "fr": "Arsenal fantôme éveillé",
          "de": "Erwachte Königswaffen",
          "es": "Despertar del coro espectral"
        },
        "base": 4400,
        "hitDamage": [
          16, 16, 16, 16, 16, 20
        ],
        "castTime": 40,
        "framesList": [
          72, 5, 5, 5, 5, 5
        ],
        "offset": 14
      },
      {
        "id": 215000107,
        "names": {
          "en": "Armiger",
          "tw": "幻影劍",
          "kr": "팬텀 소드",
          "fr": "Arsenal fantôme",
          "de": "Königswaffen",
          "es": "Coro espectral"
        },
        "base": 1680,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "dualable": false,
        "framesList": [
          121, 5, 11, 42, 50
        ],
        "offset": 8
      }
    ]
  },
  {
    id: 82,
    names: {
      en: "Duke",
      tw: "杜克",
      kr: "듀크"
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
        framesList: [28, 6, 6, 6, 6, 29],
        hitDamage: [10, 10, 10, 10, 10, 50],
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
        id: 3,
        names: {
          en: "Hexa Thrust + 2",
          tw: "六角突擊 + 2",
          kr: "헥사 드러스트 + 2",
          fr: "Hexaestoque + 2",
          de: "Sechserstoß + 2",
          es: "Hexaestoque + 2"
        },
        framesList: [28, 6, 6, 6, 6, 29],
        hitDamage: [10, 10, 10, 10, 10, 50],
        offset: 66,
        base: 250,
        ignore: 50,
        debuffs: [
          {
            type: "ice",
            value: 75
          }
        ]
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
        castTime: 40,
        debuffs: [
          {
            type: "ice",
            value: 50
          }
        ],
        framesList: [65],
        offset: 14,
        base: 180
      },
      {
        "id": 227540,
        "names": {
          "en": "Heavenfall Spear - Skyrule",
          "tw": "飛天滅龍槍·操天",
          "kr": "비천멸룡창·조천",
          "fr": "Lance tombeciel - Loi des cieux",
          "de": "Himmelsfallspeer - Luftherrscher",
          "es": "Lanza derrumbacielos - Ley celestial"
        },
        "base": 470,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "framesList": [
          0
        ],
        "offset": 8
      },
      {
        "id": 227541,
        "names": {
          "en": "Gelid Spear",
          "tw": "光熱之槍",
          "kr": "혹한의 창",
          "fr": "Lance de givre",
          "de": "Eisiger Speer",
          "es": "Lanza gélida"
        },
        "base": 640,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 26,
        "debuffs": [
          {
            "type": "ice",
            "value": 70
          }
        ],
        "framesList": [
          28, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 507980,
        "names": {
          "en": "Draconic Sealing Spears",
          "tw": "封龍滅槍陣",
          "kr": "봉룡멸창진",
          "fr": "Lances du sceau draconien",
          "de": "Drakonische Siegelspeere",
          "es": "Lanzas de sellado dragontino"
        },
        "base": 700,
        "hitDamage": [
          100
        ],
        "castTime": 10,
        "debuffs": [
          {
            "type": "ice",
            "value": 100
          }
        ],
        "framesList": [
          172
        ],
        "offset": 14
      },
      {
        "id": 507981,
        "names": {
          "en": "Heavenfall Spear - Icebreaker",
          "tw": "飛天滅龍槍·破冰",
          "kr": "비천멸룡창·빙괴",
          "fr": "Lance tombeciel - Briseglace",
          "de": "Himmelsfallspeer - Eisbrecher",
          "es": "Lanza derrumbacielos - Rompehielo"
        },
        "base": 750,
        "hitDamage": [
          100
        ],
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          0
        ],
        "offset": 8
      },
      {
        "id": 100010807,
        "names": {
          "en": "Vaskylade",
          "tw": "龍騎槍蛇神突擊",
          "kr": "용의 창 바스킬레이드"
        },
        "base": 900,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "elements": [
          "ice"
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          74, 61, 49, 10, 10
        ],
        "offset": 8
      }
    ]
  },
  {
    id: 83,
    names: {
      en: "Aura",
      tw: "阿烏拉",
      kr: "아우라"
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
        framesList: [47, 10, 10, 10, 10, 10, 10, 10],
        hitDamage: [12, 12, 12, 12, 13, 13, 13, 13],
        castTime: 40,
        offset: 14,
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
        framesList: [47, 10, 10, 10, 10, 10, 10, 10, 5, 10, 10, 10],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9],
        castTime: 40,
        offset: 14,
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
        framesList: [116, 5, 7, 7, 7, 7, 7, 7, 7, 8],
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
      {
        "id": 706400,
        "names": {
          "en": "Thousand Thrusts + 2",
          "tw": "千烈槍 + 2",
          "kr": "천열의 창 + 2",
          "fr": "Mille coups + 2",
          "de": "Tausend Stöße + 2",
          "es": "Mil estoques + 2"
        },
        "hitDamage": [
          8,
          8,
          8,
          8,
          8,
          8,
          8,
          8,
          9,
          9,
          9,
          9
        ],
        "castTime": 40,
        "framesList": [
          47,
          10,
          10,
          10,
          10,
          10,
          10,
          10,
          5,
          10,
          10,
          10
        ],
        "offset": 14,
        "base": 275,
        "ignore": 50
      }
    ]
  },
  {
    id: 84,
    names: {
      en: "William",
      tw: "威廉",
      kr: "윌리엄"
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
        framesList: [70, 40, 20, 30, 30],
        castTime: 40,
        offset: 14,
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
        framesList: [160, 22, 21, 22, 23, 23, 22, 23],
        hitDamage: [12, 13, 12, 13, 12, 13, 12, 13],
        castTime: 40,
        offset: 14,
        base: 275,
        elements: [
          "earth"
        ],
        damage: "magic",
        magicType: "black",
        dualable: false
      },
      {
        "id": 70433,
        "names": {
          "en": "Quake + 2",
          "tw": "地槌 + 2",
          "kr": "퀘이크 + 2",
          "fr": "Séisme + 2",
          "de": "Beben + 2",
          "es": "Seísmo + 2"
        },
        "damage": "magic",
        "base": 320,
        "hitDamage": [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "earth"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "earth",
            "value": 65
          }
        ],
        "framesList": [
          160, 22, 21, 22, 23, 23, 22, 23
        ],
        "offset": 14
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
        framesList: [140],
        base: 940,
        elements: [
          "earth"
        ],
        damage: "magic",
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
      kr: "클라우드"
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
        framesList: [4],
        offset: 66,
        base: 400,
        ignore: 50
      },
      {
        id: 2,
        names: {
          en: "Climhazzard +2",
          tw: "罪惡烈斬 +2",
          kr: "클라임 해저드 +2",
          fr: "Péril ascendant +2",
          de: "Climgefahr +2",
          es: "Riesgo climático +2"
        },
        framesList: [4],
        offset: 66,
        base: 500,
        ignore: 50
      },
      {
        id: 3,
        names: {
          en: "Meteor Rain",
          tw: "流星雨",
          kr: "메테오 레인",
          fr: "Pluie de météorites",
          de: "Meteorregen",
          es: "Lluvia meteorito"
        },
        framesList: [84, 8, 8, 8, 8, 8, 8, 8],
        hitDamage: [12, 12, 12, 12, 12, 12, 12, 16],
        castTime: 4,
        offset: 66,
        base: 210,
        ignore: 50
      },
      {
        id: 4,
        names: {
          en: "Finishing Touch",
          tw: "畫龍點睛",
          kr: "화룡점정",
          fr: "Finition",
          de: "Letzter Schliff",
          es: "Toque final"
        },
        framesList: [75],
        offset: 66,
        base: 400
      },
      {
        id: 5,
        names: {
          en: "Omnislash",
          tw: "超究武神霸斬",
          kr: "초구무신패참",
          fr: "Omnifrappe",
          de: "Omnischlag",
          es: "Omnilátigo"
        },
        framesList: [188, 18, 16, 32, 16, 12, 22, 22, 16, 14, 32, 18, 12, 30, 102],
        hitDamage: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 30],
        base: 1250,
        ignore: 50,
        dualable: false,
        range: {
          min: -360
        }
      },
    ],
    multiCasts: [
      {
        count: 2,
        abilities: [
          1,
          2,
          3,
          4
        ]
      }
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
        framesList: [60, 8, 8, 9],
        hitDamage: [20, 25, 25, 30],
        castTime: 40,
        offset: 14,
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
        framesList: [62, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        castTime: 40,
        offset: 14,
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
        framesList: [80, 7, 7, 7, 7, 7],
        hitDamage: [12, 12, 12, 12, 12, 40],
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
      kr: "크라일라"
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
        framesList: [150],
        castTime: 40,
        offset: 14,
        base: 400,
        damage: "magic",
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
        framesList: [70],
        castTime: 40,
        offset: 14,
        base: 400,
        damage: "magic",
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
        framesList: [180],
        castTime: 40,
        offset: 14,
        base: 400,
        damage: "magic",
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
      },
      {
        "id": 401002707,
        "names": {
          "en": "Mambo Hodge-podge",
          "tw": "雜燴舞蹈",
          "kr": "뒤죽박죽 맘보",
          "fr": "Mambo étrange",
          "de": "Mambo-Sammelsurium",
          "es": "Mambo extraño"
        },
        "damage": "magic",
        "base": 1490,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "framesList": [
          400
        ],
        "offset": 8
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
      kr: "크리스틴"
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
        framesList: [49, 7, 7, 7, 7, 5, 7, 7, 7, 7],
        castTime: 20,
        offset: 14,
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
        framesList: [40, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        hitDamage: [8, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11],
        castTime: 20,
        offset: 14,
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
        framesList: [40, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        hitDamage: [8, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11],
        castTime: 20,
        offset: 14,
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
        framesList: [60, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        castTime: 36,
        offset: 14,
        base: 350,
        ignore: 50,
        damage: "magic",
        elements: [
          "ice"
        ],
        dualable: false
      },
      {
        "id": 20300,
        "names": {
          "en": "Blizzaja",
          "tw": "強暴雪",
          "kr": "블리자쟈",
          "fr": "Glace max",
          "de": "Eiska",
          "es": "Hielo+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          240
        ],
        "offset": 14
      },
      {
        "id": 20360,
        "names": {
          "en": "Freeze",
          "tw": "冰結",
          "kr": "프리즈",
          "fr": "Gel",
          "de": "Frost",
          "es": "Congelación"
        },
        "damage": "magic",
        "base": 275,
        "hitDamage": [
          5, 5, 5, 10, 10, 10, 15, 40
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "ice"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "ice",
            "value": 50
          }
        ],
        "framesList": [
          140, 14, 14, 14, 14, 14, 15, 15
        ],
        "offset": 14
      },
      {
        "id": 401002607,
        "names": {
          "en": "Snowbear Rampage",
          "tw": "失控雪熊",
          "kr": "광란의 눈곰",
          "fr": "Fureur de l'ours blanc",
          "de": "Schneebär-Raserei",
          "es": "Furia polar"
        },
        "damage": "magic",
        "base": 1290,
        "hitDamage": [
          9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10
        ],
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          80, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
        ],
        "offset": 8
      }
    ],
    multiCasts: [
      {
        count: 4,
        abilities: [
          910652,
          910653,
          910654
        ]
      }
    ],
    "multipleBlack": 2,
    "multipleWhite": 2,
    "multipleGreen": 2
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
        framesList: [178, 6, 4, 3, 3],
        castTime: 40,
        offset: 14,
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
      },
      {
        "id": 20330,
        "names": {
          "en": "Aeroja",
          "tw": "強勁風",
          "kr": "에어로쟈",
          "fr": "Vent max",
          "de": "Aeroka",
          "es": "Aero+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "framesList": [
          170
        ],
        "offset": 14
      },
      {
        "id": 20390,
        "names": {
          "en": "Tornado",
          "tw": "龍捲風",
          "kr": "토네이도",
          "fr": "Tornade"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ],
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14
      },
      {
        "id": 20300,
        "names": {
          "en": "Blizzaja",
          "tw": "強暴雪",
          "kr": "블리자쟈",
          "fr": "Glace max",
          "de": "Eiska",
          "es": "Hielo+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          240
        ],
        "offset": 14
      },
      {
        "id": 20360,
        "names": {
          "en": "Freeze",
          "tw": "冰結",
          "kr": "프리즈",
          "fr": "Gel",
          "de": "Frost",
          "es": "Congelación"
        },
        "damage": "magic",
        "base": 275,
        "hitDamage": [
          5, 5, 5, 10, 10, 10, 15, 40
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "ice"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "ice",
            "value": 50
          }
        ],
        "framesList": [
          140, 14, 14, 14, 14, 14, 15, 15
        ],
        "offset": 14
      }
    ],
    "multipleBlack": 3
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
        framesList: [80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        castTime: 40,
        offset: 14,
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
      kr: "카리바"
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
        framesList: [8, 6, 6, 6, 6],
        castTime: 40,
        offset: 14,
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
        framesList: [8, 6, 6, 6, 6],
        castTime: 40,
        offset: 14,
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
        framesList: [120],
        castTime: 40,
        offset: 14,
        base: 420,
        damage: "magic",
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
        framesList: [46, 6, 6, 6, 6, 7],
        hitDamage: [16, 16, 16, 16, 16, 20],
        castTime: 40,
        offset: 14,
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
        framesList: [110, 15],
        castTime: 40,
        offset: 14,
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
        framesList: [110, 15],
        offset: 14,
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
      kr: "레이 잭"
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
        framesList: [46, 5, 5, 5, 5, 5],
        hitDamage: [16, 17, 16, 17, 17, 17],
        castTime: 40,
        offset: 14,
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
        framesList: [46, 6, 6, 6, 6, 6],
        hitDamage: [16, 17, 16, 17, 17, 17],
        castTime: 40,
        offset: 14,
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
        framesList: [42, 8, 8, 8, 8, 8],
        hitDamage: [16, 17, 16, 17, 17, 17],
        castTime: 40,
        offset: 14,
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
        framesList: [46, 6, 6, 6, 6, 6],
        hitDamage: [16, 17, 16, 17, 17, 17],
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
        debuffs: [
          {
            type: "light",
            value: 50
          }
        ],
        framesList: [42, 10, 10, 10, 10, 10, 10, 10],
        offset: 14,
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
        framesList: [46, 6, 6, 6, 6, 7],
        hitDamage: [16, 16, 16, 16, 16, 20],
        castTime: 40,
        offset: 14,
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
        framesList: [175],
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
      kr: "카에데"
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
        framesList: [42, 10, 10, 10, 10, 10],
        hitDamage: [16, 16, 17, 17, 17, 17],
        castTime: 40,
        offset: 26,
        base: 300,
        ignore: 25
      },
      {
        id: 2,
        names: {
          en: "Halberd Dance + 2",
          tw: "薙刀艷舞 + 2",
          kr: "치도염무 + 2",
          fr: "Danse de hallebarde + 2",
          de: "Hellebardentanz + 2",
          es: "Danza de alabarda + 2"
        },
        framesList: [42, 10, 10, 10, 10, 10],
        hitDamage: [16, 16, 17, 17, 17, 17],
        castTime: 40,
        offset: 26,
        base: 375,
        ignore: 25
      },
      {
        id: 3,
        names: {
          en: "Samurai Princess's Order",
          tw: "公主武士大號令",
          kr: "사무라이 공주의 대호령",
          fr: "Ordre de la princesse samouraï",
          de: "Befehl der Samurai-Prinzessin",
          es: "Orden de la princesa samurái"
        },
        framesList: [78, 10, 10, 10, 10, 10, 10, 10, 10, 10],
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
      kr: "지라이야"
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
        framesList: [24, 2, 4, 12, 5],
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
        framesList: [45, 10, 10, 10, 10],
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
        framesList: [10, 8, 8, 8, 8, 8, 8],
        hitDamage: [10, 10, 10, 10, 10, 10, 40],
        offset: 8,
        base: 1360,
        damage: "hybrid",
        elements: [
          "fire"
        ]
      },
      {
        "id": 912122,
        "names": {
          "en": "Purgatory Fire Slash + 2",
          "tw": "煉獄剎燒斬 + 2",
          "kr": "연옥찰소참 + 2",
          "fr": "Flammes du purgatoire + 2",
          "de": "Flammenschlag des Purgatoriums + 2",
          "es": "Tajo ígneo del purgatorio + 2"
        },
        "damage": "hybrid",
        "base": 990,
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 50
          }
        ],
        "framesList": [
          82, 8, 8, 8, 8, 8, 8, 8
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
        framesList: [42, 10, 10, 10, 10, 10, 10],
        hitDamage: [10, 10, 10, 10, 10, 20, 30],
        castTime: 40,
        offset: 26,
        base: 980,
        damage: "hybrid",
        elements: [
          "lightning"
        ]
      },
      {
        "id": 912124,
        "names": {
          "en": "Thunder Strike Stance + 2",
          "tw": "轟雷衝擊陣 + 2",
          "kr": "굉뇌격출진 + 2",
          "fr": "Posture électrocoup + 2",
          "de": "Gewitterschlag-Kata + 2",
          "es": "Electrogolpe firme + 2"
        },
        "damage": "hybrid",
        "base": 770,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 58
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "lightning",
            "value": 50
          }
        ],
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 911920,
        "names": {
          "en": "True Purgatory Fire Slash",
          "tw": "真‧煉獄剎燒斬",
          "kr": "진·연옥찰소참",
          "fr": "Flammes du purgatoire ultimes",
          "de": "Wahrer Flammenschlag des Purgatoriums",
          "es": "Tajo fulminante del purgatorio"
        },
        "damage": "hybrid",
        "base": 1600,
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 50
          }
        ],
        "framesList": [
          82, 8, 8, 8, 8, 8, 8, 8
        ]
      },
      {
        "id": 911921,
        "names": {
          "en": "True Thunder Strike Stance",
          "tw": "真‧轟雷擊衝陣",
          "kr": "진·굉뇌격출진",
          "fr": "Posture électrocoup ultime",
          "de": "Wahre Gewitterschlag-Kata",
          "es": "Azote fulminante del trueno"
        },
        "damage": "hybrid",
        "base": 1200,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 58
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "lightning",
            "value": 50
          }
        ],
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 227963,
        "names": {
          "en": "Shadow Dragon Roar",
          "tw": "暗龍咆絕破",
          "kr": "흑룡포절파",
          "fr": "Rugissement du dragon des ombres",
          "de": "Gebrüll des Schattendrachen",
          "es": "Rugido del dragón de las sombras"
        },
        "damage": "hybrid",
        "base": 1800,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "dark",
            "value": 50
          }
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 227960,
        "names": {
          "en": "Demonic Spark",
          "tw": "鬼火花",
          "kr": "도깨비불꽃",
          "fr": "Étincelle démoniaque",
          "de": "Dämonenfunke",
          "es": "Chispa demoníaca"
        },
        "damage": "hybrid",
        "base": 240,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 75
          },
          {
            "type": "lightning",
            "value": 75
          },
          {
            "type": "dark",
            "value": 75
          }
        ],
        "framesList": [
          90
        ]
      },
      {
        "id": 912126,
        "names": {
          "en": "Demonic Spark + 2",
          "tw": "鬼火花 + 2",
          "kr": "도깨비불꽃 + 2",
          "fr": "Étincelle démoniaque + 2",
          "de": "Dämonenfunke + 2",
          "es": "Chispa demoníaca + 2"
        },
        "damage": "hybrid",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 90
          },
          {
            "type": "lightning",
            "value": 90
          },
          {
            "type": "dark",
            "value": 90
          }
        ],
        "framesList": [
          90
        ]
      },
      {
        "id": 508230,
        "names": {
          "en": "Shadowless Thrust",
          "tw": "無影一刺",
          "kr": "그림자 없는 일격",
          "fr": "Frappe sans ombre",
          "de": "Schattenloser Streich",
          "es": "Asalto sin sombra"
        },
        "damage": "hybrid",
        "base": 3600,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          10
        ]
      },
      {
        "id": 100011307,
        "names": {
          "en": "Toad Art - Raiden",
          "tw": "蟾蜍忍法·雷電",
          "kr": "두꺼비 인법·뇌전",
          "fr": "Art des crapauds - Raiden",
          "de": "Krötenkunst - Raiden",
          "es": "Artesapo - Raiden"
        },
        "damage": "hybrid",
        "base": 2720,
        "hitDamage": [
          14, 14, 15, 14, 14, 15, 14
        ],
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          133, 10, 10, 10, 10, 10, 10
        ]
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
        framesList: [2],
        offset: 8,
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
        framesList: [6],
        offset: 8,
        base: 200,
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
        framesList: [2],
        offset: 8,
        base: 1100,
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
        framesList: [20],
        offset: 8,
        base: 1100,
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
        framesList: [2],
        offset: 8,
        base: 800,
        ignore: 50,
      },
      {
        "id": 227560,
        "names": {
          "en": "Winter's Oblivion",
          "tw": "無明冰月",
          "kr": "무명빙월",
          "fr": "Oubli hivernal",
          "de": "Winter der Spirituellen Dunkelheit",
          "es": "Abandono invernal"
        },
        "base": 520,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "debuffs": [
          {
            "type": "ice",
            "value": 60
          },
          {
            "type": "wind",
            "value": 60
          }
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 508001,
        "names": {
          "en": "Absolute Mirror of Equity",
          "tw": "極·明鏡",
          "kr": "극·명경",
          "fr": "Sérénité absolue",
          "de": "Vollkommene Kata",
          "es": "Tranquilidad absoluta"
        },
        "base": 650,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "ignore": 50,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ],
        "offset": 14
      },
      {
        "id": 227561,
        "names": {
          "en": "Obliterating Mirror of Equity",
          "tw": "絕·明鏡",
          "kr": "절·명경",
          "fr": "Sérénité destructrice",
          "de": "Vernichtende Kata",
          "es": "Tranquilidad destructiva"
        },
        "base": 450,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "ignore": 50,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ],
        "offset": 14
      },
      {
        "id": 100011707,
        "names": {
          "en": "Unstoppable Wave",
          "tw": "跋山涉水",
          "kr": "발산섭수",
          "fr": "Vague imparable",
          "de": "Unaufhaltbare Welle",
          "es": "Ola imparable"
        },
        "base": 1200,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 100
          },
          {
            "type": "ice",
            "value": 100
          }
        ],
        "framesList": [
          28
        ],
        "offset": 8
      }
    ]
  },
  {
    id: 96,
    names: {
      en: "Drace",
      tw: "朵芮絲",
      kr: "드레이스"
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
        framesList: [70, 24, 24, 24, 24, 24],
        hitDamage: [16, 16, 16, 16, 16, 20],
        castTime: 40,
        offset: 14,
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
        framesList: [100],
        castTime: 40,
        offset: 14,
        base: 420,
        damage: "magic",
        elements: [
          "fire"
        ],
        dualable: false,
      },
      {
        id: 3,
        names: {
          en: "Flamephant + 2",
          tw: "火炎幻想 + 2",
          kr: "불꽃의 사제 + 2",
          fr: "Flaméphant + 2",
          de: "Flammenfant + 2",
          es: "Flamígero + 2"
        },
        framesList: [100],
        castTime: 40,
        offset: 14,
        base: 600,
        damage: "magic",
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
      kr: "발프레아"
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
        framesList: [55],
        offset: 8,
        base: 250,
        ignore: 50,
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
        framesList: [40],
        offset: 8,
        base: 250,
        ignore: 50,
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
        framesList: [90],
        offset: 8,
        base: 250,
        ignore: 50,
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
        framesList: [40],
        offset: 8,
        base: 250,
        ignore: 50,
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
        framesList: [85],
        castTime: 40,
        offset: 14,
        base: 350,
        ignore: 50
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
        framesList: [100],
        castTime: 40,
        offset: 14,
        base: 700,
        ignore: 50
      },
      {
        "id": 507940,
        "names": {
          "en": "Rapid Shot",
          "tw": "快速射擊",
          "kr": "신속 사격",
          "fr": "Rafale rapide",
          "de": "Schnellfeuer",
          "es": "Disparo rápido"
        },
        "base": 6000,
        "hitDamage": [
          5.000000000000001, 5.000000000000001, 6.666666666666668, 5.000000000000001, 5.000000000000001, 6.666666666666668, 5.000000000000001, 5.000000000000001, 6.666666666666668, 5.000000000000001, 5.000000000000001, 6.666666666666668, 5.000000000000001, 5.000000000000001, 6.666666666666668, 5.000000000000001, 5.000000000000001, 6.666666666666668
        ],
        "offset": 8,
        "framesList": [
          34, 5, 3, 5, 3, 4, 1, 3, 4, 1, 3, 4, 1, 3, 4, 1, 7, 8
        ]
      },
      {
        "id": 912213,
        "names": {
          "en": "Rapid Shot + 2",
          "tw": "快速射擊 + 2",
          "kr": "신속 사격 + 2",
          "fr": "Rafale rapide + 2",
          "de": "Schnellfeuer + 2",
          "es": "Disparo rápido + 2"
        },
        "base": 6000,
        "hitDamage": [
          7.5, 7.5, 10, 7.5, 7.5, 10, 7.5, 7.5, 10, 7.5, 7.5, 10
        ],
        "offset": 8,
        "framesList": [
          34, 5, 3, 5, 3, 4, 1, 3, 4, 1, 7, 8
        ]
      },
      {
        "id": 507942,
        "names": {
          "en": "Trick Weapon",
          "tw": "詭計武器",
          "kr": "트릭 웨폰",
          "fr": "Tir vicieux",
          "de": "Trickwaffe",
          "es": "Arma trucada"
        },
        "base": 800,
        "hitDamage": [
          100
        ],
        "castTime": 32,
        "debuffs": [
          {
            "type": "fire",
            "value": 110
          },
          {
            "type": "light",
            "value": 110
          },
          {
            "type": "lightning",
            "value": 110
          },
          {
            "type": "water",
            "value": 110
          }
        ],
        "framesList": [
          37
        ],
        "offset": 14
      },
      {
        "id": 227502,
        "names": {
          "en": "Syphon Shot",
          "tw": "攝魔彈",
          "kr": "아스필 불릿",
          "fr": "Balle aspirante",
          "de": "Syphon-Schuss",
          "es": "Sifón"
        },
        "damage": "hybrid",
        "base": 140,
        "hitDamage": [
          100
        ],
        "castTime": 32,
        "framesList": [
          122
        ],
        "offset": 14
      },
      {
        "id": 212000507,
        "names": {
          "en": "Element of Treachery",
          "tw": "謀逆之相位星",
          "kr": "역모의 아스팩트",
          "fr": "Impact astral",
          "de": "Element der Tücke",
          "es": "Impacto astral"
        },
        "base": 700,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          185
        ],
        "offset": 8
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
        framesList: [2, 10],
        offset: 56,
        base: 380,
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
        framesList: [2, 10],
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
        framesList: [2, 10],
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
        framesList: [167],
        offset: 140,
        base: 730,
        ignore: 25,
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
        framesList: [150],
        castTime: 40,
        offset: 14,
        base: 1650,
        damage: "magic",
        elements: [
          "lightning"
        ],
        dualable: false
      },
      {
        "id": 219360,
        "names": {
          "en": "Quick Shock Blade",
          "tw": "迅・雷之刃",
          "kr": "신속·번개의 검",
          "fr": "Lame électrique rapide",
          "de": "Schnelle Schockklinge",
          "es": "Hoja de choque veloz"
        },
        "damage": "magic",
        "base": 330,
        "hitDamage": [
          100
        ],
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "lightning",
            "value": 50
          }
        ],
        "framesList": [
          10
        ],
        "offset": 8
      },
      {
        "id": 100012407,
        "names": {
          "en": "Eternal Ray",
          "tw": "永恆之光",
          "kr": "영원의 섬광",
          "fr": "Rayon éternel",
          "de": "Ewiger Strahl",
          "es": "Rayo infinito"
        },
        "damage": "magic",
        "base": 1800,
        "hitDamage": [
          2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3
        ],
        "dualable": false,
        "framesList": [
          12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "offset": 8
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
          219360,
          219490
        ]
      },
      {
        "count": 5,
        "abilities": [
          219320,
          219330,
          219360
        ]
      }
    ]
  },
  {
    id: 99,
    names: {
      en: "Yun",
      tw: "雲",
      kr: "윤"
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
        framesList: [38, 3, 2, 3, 4, 2, 4, 2, 3, 2],
        hitDamage: [8, 8, 9, 9, 10, 10, 10, 11, 12, 13],
        castTime: 40,
        offset: 14,
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
        framesList: [38, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        hitDamage: [8, 8, 9, 9, 10, 10, 10, 11, 12, 13],
        castTime: 40,
        offset: 14,
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
        framesList: [85, 4, 6, 5, 8],
        hitDamage: [17, 19, 20, 21, 23],
        castTime: 40,
        offset: 14,
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
        framesList: [82, 8, 8, 8, 8, 8, 8, 8],
        hitDamage: [9, 10, 11, 12, 13, 14, 15, 16],
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
      },
      {
        "id": 912018,
        "names": {
          "en": "Multi-Barrage",
          "tw": "多重連射",
          "kr": "다중 사격",
          "fr": "Averse de coups",
          "de": "Multi-Sperrfeuer",
          "es": "Fuego múltiple"
        },
        "base": 350,
        "hitDamage": [
          4, 4, 4, 4, 4, 4, 4, 72
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 912017,
        "names": {
          "en": "Multi-Barrage+",
          "tw": "多重連射改",
          "kr": "개량형 다중 사격",
          "fr": "Averse de coups +",
          "de": "Multi-Sperrfeuer+",
          "es": "Fuego múltiple+"
        },
        "base": 600,
        "hitDamage": [
          4, 4, 4, 4, 4, 4, 4, 72
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 912023,
        "names": {
          "en": "Perfect Strikes",
          "tw": "完美直擊",
          "kr": "완벽한 타격",
          "fr": "Enchaînement parfait",
          "de": "Perfekte Treffer",
          "es": "Golpe perfecto"
        },
        "base": 800,
        "hitDamage": [
          5, 5, 6, 6, 7, 7, 9, 55
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 302000907,
        "names": {
          "en": "Golden Talisman",
          "tw": "黃金護符",
          "kr": "황금의 부적",
          "fr": "Talisman doré",
          "de": "Goldener Talisman",
          "es": "Talismán dorado"
        },
        "base": 1000,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          100
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
          kr: "럭스 마그나 +2"
        },
        framesList: [120],
        castTime: 40,
        offset: 14,
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
        elements: [
          "light"
        ],
        framesList: [40, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 9, 11, 15],
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
      kr: "앙"
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
        castTime: 40,
        framesList: [85],
        offset: 14,
        base: 275
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
        castTime: 40,
        framesList: [85],
        offset: 14,
        base: 275
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
        castTime: 40,
        framesList: [85],
        offset: 14,
        base: 275
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
        castTime: 40,
        framesList: [85],
        offset: 14,
        base: 275
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
        castTime: 60,
        framesList: [22, 36, 36],
        offset: 48,
        base: 210
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
        castTime: 60,
        framesList: [22, 36, 36],
        offset: 48,
        base: 210
      },
      {
        id: 11,
        names: {
          en: "Penetrating Shot + 2",
          tw: "穿甲連射 + 2",
          kr: "철갑연사 + 2",
          fr: "Tir pénétrant + 2",
          de: "Durchdringender Schuss + 2",
          es: "Tiro penetrante + 2"
        },
        castTime: 60,
        framesList: [22, 36, 36],
        offset: 48,
        base: 300,
        ignore: 50
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
        castTime: 60,
        debuffs: [
          {
            type: "fire",
            value: 50
          }
        ],
        framesList: [22, 36, 36],
        offset: 48,
        base: 210
      },
      {
        id: 72,
        names: {
          en: "Ash Shot + 2",
          tw: "灰燼連射 + 2",
          kr: "회신연사 + 2",
          fr: "Tir de cendre + 2",
          de: "Ascheschuss + 2",
          es: "Tiro de ceniza + 2"
        },
        castTime: 60,
        debuffs: [
          {
            type: "fire",
            value: 75
          }
        ],
        framesList: [22, 36, 36],
        offset: 48,
        base: 300,
        ignore: 50
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
        castTime: 60,
        framesList: [22, 36, 36],
        offset: 48,
        base: 600
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
        framesList: [82, 7, 7, 7, 7],
        offset: 14,
        base: 180,
        ignore: 25
      },
      {
        "id": 912031,
        "names": {
          "en": "Azure Arrow",
          "tw": "蒼風之箭",
          "kr": "창풍의 화살",
          "fr": "Flèches azur",
          "de": "Azurblauer Pfeil",
          "es": "Flecha azulada"
        },
        "base": 400,
        "hitDamage": [
          100
        ],
        "castTime": 20,
        "offset": 14,
        "debuffs": [
          {
            "type": "wind",
            "value": 75
          }
        ],
        "framesList": [
          22
        ]
      },
      {
        "id": 912034,
        "names": {
          "en": "Power Arrow",
          "tw": "力量之箭",
          "kr": "힘있는 화살",
          "fr": "Tir focalisé",
          "de": "Kraftpfeil",
          "es": "Flecha implacable"
        },
        "base": 350,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "ignore": 50,
        "framesList": [
          22
        ]
      },
      {
        "id": 912028,
        "names": {
          "en": "Bold Shot",
          "tw": "大膽射擊",
          "kr": "대담한 발포",
          "fr": "Tir audacieux",
          "de": "Gewagter Schuss",
          "es": "Tiro audaz"
        },
        "base": 1000,
        "hitDamage": [50, 50],
        "offset": 36,
        "ignore": 50,
        "framesList": [
          15, 36
        ]
      },
      {
        "id": 401003907,
        "names": {
          "en": "Falling Sun",
          "tw": "射日",
          "kr": "지는 해",
          "fr": "Soleil descendant",
          "de": "Sonnensturz",
          "es": "Sol descendente"
        },
        "base": 940,
        "hitDamage": [
          100
        ],
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 90
          }
        ],
        "framesList": [
          150
        ]
      }
    ],
    dual: false,
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          9,
          1,
          2,
          3,
          4,
          912031,
          912034
        ]
      }
    ]
  },
  {
    id: 102,
    names: {
      en: "Prompto",
      tw: "普羅恩普特",
      kr: "프롬프토"
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
        base: 220,
        framesList: [42, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        offset: 14
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
        framesList: [42, 10, 10, 10, 10, 10, 10, 10],
        offset: 14,
        base: 225,
        ignore: 50
      },
      {
        "id": 912329,
        "names": {
          "en": "Circular Saw + 2",
          "tw": "圓盤鋸 + 2",
          "kr": "서큘러 쏘우 + 2",
          "fr": "Scie circulaire + 2",
          "de": "Wirbelsäge + 2",
          "es": "Sierra circular + 2"
        },
        "base": 500,
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ]
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
        debuffs: [
          {
            type: "lightning",
            value: 60
          }
        ],
        framesList: [110],
        offset: 8,
        base: 360
      },
      {
        "id": 707535,
        "names": {
          "en": "Gravity Well + 2",
          "tw": "引力波 + 2",
          "kr": "어트랙트 웨이브 + 2",
          "fr": "Vortex + 2",
          "de": "Gravitationspulsator + 2",
          "es": "Gravitón + 2"
        },
        "base": 500,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "debuffs": [
          {
            "type": "lightning",
            "value": 75
          }
        ],
        "framesList": [
          110
        ]
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
        castTime: 104,
        framesList: [110],
        offset: 14,
        base: 250,
        ignore: 50
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
        castTime: 104,
        framesList: [114],
        offset: 14,
        base: 200,
        ignore: 50
      },
      {
        "id": 707529,
        "names": {
          "en": "Drillbreaker + 2",
          "tw": "破壞鑽頭 + 2",
          "kr": "드릴 브레이커 + 2",
          "fr": "Foreuse + 2",
          "de": "Perforator + 2",
          "es": "Perforador + 2"
        },
        "base": 300,
        "hitDamage": [
          100
        ],
        "castTime": 104,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          114
        ]
      },
      {
        "id": 508070,
        "names": {
          "en": "Overkill",
          "tw": "突擊必殺",
          "kr": "레이드 킬",
          "fr": "Coup de grâce",
          "de": "Verschrotten",
          "es": "Golpe de gracia"
        },
        "base": 400,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "framesList": [
          10
        ],
        "offset": 8
      },
      {
        "id": 508073,
        "names": {
          "en": "Rapidus SMG",
          "tw": "小號",
          "kr": "투바",
          "fr": "Mitraillette",
          "de": "Maschinengewehr",
          "es": "Dyne"
        },
        "base": 840,
        "hitDamage": [
          2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
        ],
        "castTime": 40,
        "framesList": [
          42, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "offset": 14
      },
      {
        "id": 508074,
        "names": {
          "en": "Sagitta rifle",
          "tw": "穿心",
          "kr": "렉타 사지타",
          "fr": "Fusil à lunette",
          "de": "Scharfschützengewehr",
          "es": "Lekta Sagitta"
        },
        "base": 945,
        "hitDamage": [
          100
        ],
        "castTime": 20,
        "framesList": [
          72
        ],
        "offset": 14
      },
      {
        "id": 508075,
        "names": {
          "en": "Alea bazooka",
          "tw": "投機者",
          "kr": "알레아",
          "fr": "Lance-roquette",
          "de": "Raketenwerfer (FFXV)",
          "es": "Alea"
        },
        "base": 785,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "ignore": 50,
        "framesList": [
          90
        ],
        "offset": 14
      },
      {
        "id": 508079,
        "names": {
          "en": "Trigger-Happy",
          "tw": "大獎狩獵",
          "kr": "프라이즈 헌트",
          "fr": "Gâchette facile",
          "de": "Mega-Ballistik",
          "es": "Caza perfecta"
        },
        "base": 1350,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 50
        ],
        "castTime": 40,
        "framesList": [
          42, 8, 8, 8, 8, 8, 8, 8, 8, 8, 30
        ],
        "offset": 14
      },
      {
        "id": 215000707,
        "names": {
          "en": "Trigger-Happy (LB)",
          "tw": "連發射擊 (LB)",
          "kr": "트리거 해피 (LB)",
          "fr": "Gâchette facile (LB)",
          "de": "Nervöser Finger (LB)",
          "es": "Caza perfecta (LB)"
        },
        "base": 1070,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 16
        ],
        "dualable": false,
        "framesList": [
          180, 8, 8, 8, 8, 8, 8, 8, 32, 8, 8, 8, 8, 8, 96
        ],
        "offset": 8
      }
    ],
    multiCasts: [
      {
        count: 2,
        abilities: [
          221390,
          221420,
          221430,
          221450,
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
      fr: "Béate"
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
        elements: [
          "lightning"
        ],
        framesList: [26, 8, 8, 8, 8, 8, 8, 8],
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
        framesList: [72],
        offset: 86,
        base: 200
      },
      {
        id: 4,
        names: {
          en: "Seiken - Stock Break+ + 2",
          tw: "聖劍技・破曉斬+ + 2",
          kr: "성검기·스톡 브레이크+ + 2",
          fr: "Lame Ste - Fente+ + 2",
          de: "Heiliges Schwert - Donnerklinge+ + 2",
          es: "Ira santa - Devastación+ + 2"
        },
        framesList: [72],
        offset: 86,
        base: 500
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
        damage: "hybrid",
        framesList: [65],
        offset: 86,
        base: 600
      },
      {
        id: 217070,
        names: {
          en: "Seiken - Climhazzard+ + 2",
          tw: "聖劍技・天災+ + 2",
          kr: "성검기·클라임 해저드+ + 2",
          fr: "Lame Ste - Mortimer+ + 2",
          de: "Heiliges Schwert - Exekutionsschlag+ + 2",
          es: "Ira santa - Guillotina+ + 2"
        },
        damage: "hybrid",
        framesList: [65],
        offset: 86,
        base: 1500
      },
      {
        id: 13,
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
        debuffs: [
          {
            type: "light",
            value: 50
          }
        ],
        framesList: [12, 8, 8, 8, 8, 8, 8, 8],
        offset: 86,
        base: 425
      },
      {
        id: 14,
        names: {
          en: "Seiken - Saint Bringer+ + 2",
          tw: "聖劍技・聖使+ + 2",
          kr: "성검기·세인트 브링거+ + 2",
          fr: "Lame Ste - Porteur de l'aube+ + 2",
          de: "Heiliges Schwert - Heilsbringer+ + 2",
          es: "Ira santa - Portador del alba+ + 2"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        debuffs: [
          {
            type: "light",
            value: 50
          }
        ],
        framesList: [70, 6, 6, 6, 6, 6, 6, 6],
        "castTime": 40,
        "offset": 14,
        base: 1000
      },
      {
        id: 15,
        names: {
          en: "Seiken - Shock",
          tw: "聖劍技・震擊",
          kr: "성검기·쇼크",
          fr: "Lame Ste - Choc",
          de: "Heiliges Schwert - Atomisator",
          es: "Ira santa - Shock"
        },
        castTime: 40,
        framesList: [42],
        offset: 14,
        base: 265,
        ignore: 50
      },
      {
        "id": 507632,
        "names": {
          "en": "Seiken - Rose Finale",
          "tw": "聖劍技・最終玫瑰",
          "kr": "성검기: 로즈 오브 피날레",
          "fr": "Lame sainte - Bouquet final",
          "de": "Heiliges Schwert - Rosenfinale",
          "es": "Seiken - Rosa final"
        },
        "damage": "hybrid",
        "base": 4200,
        "hitDamage": [
          100
        ],
        "castTime": 24,
        "elements": [
          "light"
        ],
        "framesList": [
          124
        ],
        "offset": 14
      },
      {
        "id": 209001107,
        "names": {
          "en": "Rose of May",
          "tw": "皋月的荊棘",
          "kr": "로즈 오브 메이",
          "fr": "Rose de mai",
          "de": "Mairosen",
          "es": "Rosa de mayo"
        },
        "base": 675,
        "hitDamage": [
          15, 15, 15, 55
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          98, 32, 59, 87
        ],
        "offset": 8
      },
      {
        "id": 900000097,
        "names": {
          "en": "Rose of May + 1",
          "tw": "皋月的荊棘 + 1",
          "kr": "로즈 오브 메이 + 1",
          "fr": "Rose de mai + 1",
          "de": "Mairosen + 1",
          "es": "Rosa de mayo + 1"
        },
        "base": 675,
        "hitDamage": [
          15, 15, 15, 55
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          98, 32, 59, 87
        ],
        "offset": 8
      }
    ]
  },
  {
    id: 104,
    names: {
      en: "Yuri",
      tw: "百合",
      kr: "유리"
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
        framesList: [59, 8, 8, 8, 8, 8, 8, 8],
        offset: 14,
        base: 400
      },
      {
        id: 10,
        names: {
          en: "Whirlwind Evasion 2 + 2",
          tw: "旋風遁・二式 + 2",
          kr: "질풍둔 2식 + 2",
          fr: "Évasion - Tornade II + 2",
          de: "Wirbelwindvermeidung 2 + 2",
          es: "Evasión del remolino II + 2"
        },
        hitDamage: [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        castTime: 40,
        damage: "hybrid",
        elements: [
          "wind"
        ],
        framesList: [80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        offset: 14,
        base: 700
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
        framesList: [120, 10, 10, 10, 10, 10, 10, 10],
        offset: 14,
        base: 425
      },
      {
        id: 20,
        names: {
          en: "Earthsplit Evasion 2 + 2",
          tw: "土割遁・二式 + 2",
          kr: "토할둔 2식 + 2",
          fr: "Évasion - Fissure terrestre II + 2",
          de: "Erdspaltenvermeidung 2 + 2",
          es: "Evasión partetierra II + 2"
        },
        hitDamage: [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        castTime: 40,
        damage: "hybrid",
        elements: [
          "earth"
        ],
        framesList: [160, 22, 21, 22, 23, 23, 22, 23],
        offset: 14,
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
        framesList: [42, 8, 8, 14, 10, 10],
        offset: 14,
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
        framesList: [18, 30, 28, 10, 36],
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
        castTime: 40,
        damage: "magic",
        framesList: [120],
        offset: 14,
        base: 250,
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
        castTime: 20,
        damage: "magic",
        framesList: [20],
        offset: 14,
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
        castTime: 20,
        damage: "magic",
        framesList: [33],
        offset: 14,
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
        castTime: 40,
        damage: "magic",
        framesList: [40],
        offset: 14,
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
        framesList: [60, 6, 6, 6, 6, 6],
        offset: 14,
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
        framesList: [2, 8, 8, 8, 8, 8, 8],
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
        framesList: [36, 71, 13, 105],
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
        castTime: 40,
        framesList: [60],
        offset: 14,
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
      kr: "라라 크로프트"
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
        framesList: [42, 8, 8, 8, 8, 8, 16],
        offset: 14,
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
        framesList: [2, 8, 8, 8, 8, 8, 8],
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
        framesList: [60, 6, 6, 6, 6, 6],
        offset: 14,
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
        framesList: [12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
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
      es: "Leviatán"
    },
    abilities: [
      {
        id: 1,
        names: {
          en: "Tsunami (2)",
          tw: "大海嘯 (2)",
          kr: "대해일 (2)"
        },
        elements: [
          "water"
        ],
        dualable: false,
        type: "magic",
        base: 38000,
        framesList: [120]
      },
      {
        id: 2,
        names: {
          en: "Tsunami (3)",
          tw: "大海嘯 (3)",
          kr: "대해일 (3)"
        },
        elements: [
          "water"
        ],
        dualable: false,
        type: "magic",
        base: 40000,
        framesList: [120]
      }
    ]
  },
  {
    id: 109,
    names: {
      en: "Kunshira",
      tw: "庫西拉",
      kr: "쿤시라"
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
        damage: "hybrid",
        elements: [
          "fire"
        ],
        framesList: [170],
        offset: 8,
        base: 800
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
        damage: "hybrid",
        elements: [
          "water"
        ],
        framesList: [150],
        offset: 8,
        base: 800
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
        damage: "hybrid",
        elements: [
          "lightning"
        ],
        framesList: [110],
        offset: 8,
        base: 800
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
        damage: "hybrid",
        elements: [
          "wind"
        ],
        framesList: [130],
        offset: 8,
        base: 800
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
        damage: "hybrid",
        elements: [
          "light"
        ],
        framesList: [410],
        offset: 8,
        base: 460
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
        castTime: 40,
        damage: "hybrid",
        elements: [
          "fire"
        ],
        framesList: [120],
        offset: 14,
        base: 550
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
        castTime: 40,
        damage: "hybrid",
        elements: [
          "water"
        ],
        framesList: [120],
        offset: 14,
        base: 550
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
        castTime: 40,
        damage: "hybrid",
        elements: [
          "lightning"
        ],
        framesList: [120],
        offset: 14,
        base: 550
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
        castTime: 40,
        damage: "hybrid",
        elements: [
          "wind"
        ],
        framesList: [120],
        offset: 14,
        base: 550
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
        castTime: 40,
        damage: "hybrid",
        elements: [
          "light"
        ],
        framesList: [120],
        offset: 14,
        base: 550
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
        framesList: [2, 8, 8, 8, 8, 8, 8, 8, 8, 8],
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
        framesList: [2, 8, 8, 8, 8, 8, 8, 8, 8, 8],
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
        framesList: [2, 8, 8, 8, 8, 8, 8, 8, 8, 8],
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
        framesList: [2, 8, 8, 8, 8, 8, 8, 8, 8, 8],
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
        framesList: [2, 8, 8, 8, 8, 8, 8, 8, 8, 8],
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
        damage: "hybrid",
        framesList: [72],
        offset: 8,
        base: 700
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
        damage: "hybrid",
        framesList: [12],
        offset: 8,
        base: 1100
      },
      {
        "id": 227610,
        "names": {
          "en": "Tempest Spellblade",
          "tw": "風雷魔劍舞",
          "kr": "풍뢰의 마검무",
          "fr": "Magilame des tempêtes",
          "de": "Sturmschwertmagie",
          "es": "Esgrimago tempestuoso"
        },
        "damage": "hybrid",
        "base": 1100,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "elements": [
          "lightning",
          "wind"
        ],
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "offset": 14
      },
      {
        "id": 227611,
        "names": {
          "en": "Tempest Spellblade + 2",
          "tw": "風雷魔劍舞 + 2",
          "kr": "풍뢰의 마검무 + 2",
          "fr": "Magilame des tempêtes + 2",
          "de": "Sturmschwertmagie + 2",
          "es": "Esgrimago tempestuoso + 2"
        },
        "damage": "hybrid",
        "base": 1600,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "elements": [
          "lightning",
          "wind"
        ],
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "offset": 14
      },
      {
        "id": 100012607,
        "names": {
          "en": "Blade Master",
          "tw": "魔劍大師",
          "kr": "블레이드 마스터",
          "fr": "Maître des lames",
          "de": "Meisterklinge",
          "es": "Maestro de espadas"
        },
        "damage": "hybrid",
        "base": 3200,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "framesList": [
          100
        ],
        "offset": 8
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
        castTime: 40,
        damage: "magic",
        elements: [
          "light"
        ],
        framesList: [190],
        offset: 14,
        base: 360,
        dualable: false
      },
      {
        id: 2,
        names: {
          en: "Dystopia",
          fr: "Dystopie",
          tw: "敵托邦",
          kr: "디스토피아",
          es: "Distopía"
        },
        framesList: [120],
        castTime: 40,
        offset: 14,
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
          tw: "究極",
          kr: "알테마",
          es: "Artema"
        },
        framesList: [365],
        castTime: 40,
        offset: 14,
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
        elements: [
          "light"
        ],
        framesList: [162, 8, 8, 8, 8, 8, 8],
        offset: 14,
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
        damage: "magic",
        debuffs: [
          {
            type: "light",
            value: 75,
          },
          {
            type: "dark",
            value: 75,
          }
        ],
        framesList: [8, 20, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        base: 1040,
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
      kr: "루루"
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
        castTime: 40,
        damage: "magic",
        elements: [
          "water"
        ],
        framesList: [190],
        offset: 14,
        base: 600,
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
        castTime: 40,
        damage: "magic",
        elements: [
          "lightning"
        ],
        framesList: [150],
        offset: 14,
        base: 600,
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
        castTime: 40,
        damage: "magic",
        elements: [
          "fire"
        ],
        framesList: [210],
        offset: 14,
        base: 600,
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
        castTime: 40,
        damage: "magic",
        elements: [
          "ice"
        ],
        framesList: [240],
        offset: 14,
        base: 600,
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
        framesList: [133, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        offset: 14,
        base: 250,
        magicType: "black",
        dualable: false
      },
      {
        id: 55555,
        names: {
          en: "Flood + 2",
          tw: "洪水 + 2",
          kr: "플러드 + 2",
          fr: "Inondation + 2",
          de: "Flut + 2",
          es: "Inundación + 2"
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
        framesList: [133, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        offset: 14,
        base: 400,
        magicType: "black",
        dualable: false
      },
      {
        "id": 20390,
        "names": {
          "en": "Tornado",
          "tw": "龍捲風",
          "kr": "토네이도",
          "fr": "Tornade"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ],
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14
      },
      {
        "id": 508020,
        "names": {
          "en": "Flare Fury",
          "tw": "T·核爆",
          "kr": "T·플레어",
          "fr": "S. Brasier",
          "de": "Flare-Wut",
          "es": "Fulgor T"
        },
        "damage": "magic",
        "base": 1000,
        "hitDamage": [
          30, 30, 40
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "ignore": 25,
        "debuffs": [
          {
            "type": "water",
            "value": 100
          }
        ],
        "framesList": [
          240, 20, 20
        ],
        "offset": 14
      },
      {
        "id": 508020111,
        "names": {
          "en": "Flare Fury + 2",
          "tw": "T·核爆 + 2",
          "kr": "T·플레어 + 2",
          "fr": "S. Brasier + 2",
          "de": "Flare-Wut + 2",
          "es": "Fulgor T + 2"
        },
        "damage": "magic",
        "base": 1500,
        "hitDamage": [
          30, 30, 40
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "ignore": 25,
        "debuffs": [
          {
            "type": "water",
            "value": 120
          }
        ],
        "framesList": [
          240, 20, 20
        ],
        "offset": 14
      },
      {
        "id": 20760,
        "names": {
          "en": "Raging Water",
          "tw": "狂水",
          "kr": "조워터",
          "fr": "Flots déchaînés",
          "de": "Reißender Strom",
          "es": "Aguas enfurecidas"
        },
        "damage": "magic",
        "base": 1200,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          110
        ],
        "offset": 14
      },
      {
        "id": 210000407,
        "names": {
          "en": "Ultima Fury",
          "tw": "T·最終究極",
          "kr": "T·알테마",
          "fr": "Ultima T",
          "de": "Ultima-Wut",
          "es": "Artema triple"
        },
        "damage": "magic",
        "base": 750,
        "hitDamage": [
          16, 16, 17, 17, 17, 17
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          160, 24, 24, 24, 24, 24
        ],
        "offset": 8
      }
    ],
    multipleBlack: 3
  },
  {
    id: 112,
    names: {
      en: "Yuna",
      tw: "優娜",
      kr: "유우나"
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
        castTime: 40,
        damage: "magic",
        framesList: [300],
        offset: 14,
        base: 900,
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
        castTime: 40,
        damage: "magic",
        framesList: [285],
        offset: 14,
        base: 2000,
        dualable: false
      }
    ],
    multipleBlack: 2,
    multipleWhite: 2
  },
  {
    id: 113,
    names: {
      en: "Camille",
      tw: "卡米爾",
      kr: "카밀"
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
        debuffs: [
          {
            type: "water",
            value: 50
          }
        ],
        framesList: [22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20],
        offset: 14,
        base: 300
      },
      {
        id: 11,
        names: {
          en: "Swift Tidal Attack + 2",
          tw: "水迅擊流斬 + 2",
          kr: "수신경류참 + 2",
          fr: "Attaque fluidovéloce + 2",
          de: "Flinker Gezeitenstreich + 2",
          es: "Ataque mareomotriz + 2"
        },
        hitDamage: [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        castTime: 20,
        debuffs: [
          {
            type: "water",
            value: 65
          }
        ],
        framesList: [22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20],
        offset: 14,
        base: 400
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
        debuffs: [
          {
            type: "earth",
            value: 50
          }
        ],
        framesList: [2, 8, 8, 8, 8, 8, 8],
        offset: 36,
        base: 300
      },
      {
        id: 21,
        names: {
          en: "Earth-shattering Blade + 2",
          tw: "土濤烈波劍 + 2",
          kr: "토주열파검 + 2",
          fr: "Lame briseterre + 2",
          de: "Erdzerschmetterer + 2",
          es: "Hoja sacudetierra + 2"
        },
        hitDamage: [
          14, 14, 14, 14, 14, 15, 15
        ],
        debuffs: [
          {
            type: "earth",
            value: 65
          }
        ],
        framesList: [2, 8, 8, 8, 8, 8, 8],
        offset: 36,
        base: 400
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
        framesList: [26, 10, 16, 80, 48],
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
        framesList: [16, 10, 10, 10, 10, 10, 10, 10],
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
        elements: [
          "fire"
        ],
        framesList: [20],
        offset: 8,
        base: 230,
        ignore: 25
      },
      {
        id: 3,
        names: {
          en: "Repression",
          tw: "鎮壓",
          kr: "진압",
          fr: "Répression",
          es: "Represión"
        },
        castTime: 40,
        elements: [
          "fire"
        ],
        debuffs: [
          {
            type: "fire",
            value: 50
          }
        ],
        framesList: [210],
        offset: 14,
        base: 200
      },
      {
        id: 4,
        names: {
          en: "Schmerzen",
          tw: "柔美",
          kr: "고통"
        },
        castTime: 40,
        elements: [
          "fire"
        ],
        framesList: [72],
        offset: 14,
        base: 320
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
        debuffs: [
          {
            type: "fire",
            value: 60
          }
        ],
        framesList: [16, 10, 10, 10, 10, 10, 10, 10],
        offset: 14,
        base: 420
      },
      {
        "id": 228003,
        "names": {
          "en": "Flughöhe",
          "tw": "飛行高度",
          "kr": "비행 고도",
          "es": "Altitud"
        },
        "base": 235,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 912391,
        "names": {
          "en": "Flughöhe + 2",
          "tw": "飛行高度 + 2",
          "kr": "비행 고도 + 2",
          "es": "Altitud + 2"
        },
        "base": 500,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 100013307,
        "names": {
          "en": "Kaiser Verteidiger",
          "tw": "皇帝守護",
          "kr": "카이저 페어타이디거",
          "fr": "Imperator Protegit",
          "de": "Imperator Protegit!",
          "es": "Imperator Protegit"
        },
        "base": 600,
        "hitDamage": [
          9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          85, 4, 21, 8, 85, 4, 4, 22, 6, 6, 12
        ]
      },
      {
        "id": 900000217,
        "names": {
          "en": "Kaiser Verteidiger + 1",
          "tw": "皇帝守護 + 1",
          "kr": "카이저 페어타이디거 + 1",
          "fr": "Imperator Protegit + 1",
          "de": "Imperator Protegit! + 1",
          "es": "Imperator Protegit + 1"
        },
        "base": 650,
        "hitDamage": [
          9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          85, 4, 21, 8, 85, 4, 4, 22, 6, 6, 12
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          1,
          2,
          3,
          4,
          5,
          228003,
          912391
        ]
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
        framesList: [15, 10, 10, 10, 10, 10, 66],
        offset: 14,
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
        framesList: [46, 6, 6, 6, 6, 13],
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
        framesList: [16, 21, 32, 29, 9, 24],
        offset: 14,
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
        framesList: [16, 21, 32, 29, 9, 24],
        offset: 14,
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
        castTime: 40,
        framesList: [160],
        offset: 14,
        base: 275,
        ignore: 50
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
        framesList: [92, 10, 10, 10, 10, 10, 10, 10],
        offset: 14,
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
        debuffs: [
          {
            type: "fire",
            value: 50
          }
        ],
        framesList: [42, 10, 10, 10, 10, 10],
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
        debuffs: [
          {
            type: "ice",
            value: 50
          }
        ],
        framesList: [42, 10, 10, 10, 10, 10],
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
        debuffs: [
          {
            type: "lightning",
            value: 50
          }
        ],
        framesList: [42, 10, 10, 10, 10, 10],
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
        debuffs: [
          {
            type: "light",
            value: 50
          }
        ],
        framesList: [42, 10, 10, 10, 10, 10],
        offset: 8,
        base: 100
      },
      {
        "id": 227992,
        "names": {
          "en": "Plasma Wave",
          "tw": "等離子編織",
          "kr": "플라즈마 웨이브",
          "fr": "Vague de plasma",
          "de": "Plasmawelle",
          "es": "Onda de plasma"
        },
        "base": 360,
        "hitDamage": [
          4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          40, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ]
      },
      {
        "id": 227993,
        "names": {
          "en": "Alpha Cannon",
          "tw": "阿爾法加農炮",
          "kr": "알파 캐논",
          "fr": "Canon alpha",
          "de": "Alphakanone",
          "es": "Cañón alfa"
        },
        "base": 620,
        "hitDamage": [
          30, 30, 40
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 20, 10
        ]
      },
      {
        "id": 508263,
        "names": {
          "en": "Last Shot",
          "tw": "最後一射",
          "kr": "라스트 샷",
          "fr": "Dernier tir",
          "de": "Letzter Schuss",
          "es": "Disparo final"
        },
        "base": 500,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          160
        ]
      },
      {
        "id": 100012007,
        "names": {
          "en": "AL Type Light Particle Beam",
          "tw": "AL式魔電粒子炮",
          "kr": "AL식 마전입자포",
          "fr": "Rayon à particules de lum. type AL",
          "de": "AL-Typ Lichtpartikelstrahl",
          "es": "Rayo de partículas de luz (tipo AL)"
        },
        "base": 1200,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          150
        ]
      }
    ]
  },
  {
    id: 116,
    names: {
      en: "Emilia",
      tw: "埃米利亞",
      kr: "에밀리아",
      fr: "Émilia"
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
        framesList: [42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
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
        elements: [
          "dark"
        ],
        framesList: [23],
        offset: 8,
        base: 420
      },
      {
        "id": 702520,
        "names": {
          "en": "Into Darkness + 2",
          "tw": "黑暗降臨 + 2",
          "kr": "어둠 속으로 + 2",
          "fr": "Obscurité sans fin + 2",
          "de": "Ins Dunkel + 2",
          "es": "Oscuridad profunda + 2"
        },
        "base": 510,
        "hitDamage": [
          100
        ],
        "elements": [
          "dark"
        ],
        "offset": 8,
        "framesList": [
          23
        ]
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
        framesList: [42, 10, 10, 10, 10, 10, 10, 10, 10],
        offset: 14,
        base: 325
      },
      {
        "id": 707435,
        "names": {
          "en": "Funeral Knife + 2",
          "tw": "葬禮之刃 + 2",
          "kr": "장례의 나이프 + 2",
          "fr": "Couteau funéraire + 2",
          "de": "Begräbnismesser + 2",
          "es": "Cuchillo funerario + 2"
        },
        "base": 500,
        "hitDamage": [
          11, 11, 11, 11, 11, 11, 11, 23
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ]
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
        framesList: [42, 39, 4, 4, 4, 4, 4, 89, 4, 4, 4, 4, 4, 4, 4],
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
      kr: "라이트닝"
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
        framesList: [14, 28, 26, 23, 43],
        offset: 14,
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
        framesList: [14, 28, 26, 23, 43],
        offset: 14,
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
        debuffs: [
          {
            type: "lightning",
            value: 20
          }
        ],
        framesList: [42, 20, 30, 2],
        offset: 14,
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
        debuffs: [
          {
            type: "lightning",
            value: 75
          }
        ],
        framesList: [42, 20, 30, 2],
        offset: 14,
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
        elements: [
          "lightning"
        ],
        framesList: [30],
        offset: 8,
        base: 200
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
        castTime: 40,
        elements: [
          "fire"
        ],
        framesList: [110],
        offset: 14,
        base: 190
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
        castTime: 40,
        elements: [
          "ice"
        ],
        framesList: [110],
        offset: 14,
        base: 190
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
        castTime: 40,
        elements: [
          "wind"
        ],
        framesList: [70],
        offset: 14,
        base: 190
      },
      {
        id: 507240,
        "names": {
          "en": "Lightning Strike",
          "tw": "雷光斬",
          "kr": "뇌광참",
          "fr": "Lames foudroyantes",
          "de": "Donnerspalter",
          "es": "Corte fulmíneo"
        },
        "hitDamage": [
          30, 30, 40
        ],
        "framesList": [
          2, 10, 10
        ],
        "offset": 8,
        "base": 1100,
        "debuffs": [
          {
            "type": "lightning",
            "value": 100
          }
        ]
      },
      {
        id: 226682,
        "names": {
          "en": "Endless Army",
          "tw": "無盡驅散",
          "kr": "엔드리스 드라이브",
          "fr": "Symbiose infinie",
          "de": "Infinitmorph",
          "es": "Empatía infinita"
        },
        "castTime": 20,
        hitDamage: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12],
        "framesList": [
          22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20
        ],
        "offset": 14,
        "base": 720
      },
      {
        id: 213000107,
        "names": {
          "en": "Army of One",
          "tw": "王牌驅散",
          "kr": "신 드라이브",
          "fr": "Combo éclair",
          "de": "Ein-Mann-Armee",
          "es": "Andanada"
        },
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "dualable": false,
        "framesList": [
          39, 14, 14, 34, 32, 42, 3, 7, 3, 24, 3, 31, 50, 3, 3, 4, 3, 3, 3, 3
        ],
        "offset": 8,
        "base": 1800
      },
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
        elements: [
          "fire"
        ],
        dualable: false,
        damage: "magic",
        base: 8200,
        framesList: [110]
      },
      {
        "id": 11403,
        "names": {
          "en": "Flames of Rebirth (3)",
          "tw": "轉生之炎 (3)",
          "kr": "윤회의 불꽃 (3)",
          "fr": "Feu résurrecteur (3)",
          "de": "Reinkarnationsflamme (3)",
          "es": "Llamas del renacer (3)"
        },
        "elements": [
          "fire"
        ],
        "dualable": false,
        "damage": "magic",
        "base": 20000,
        "framesList": [
          110
        ]
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
        debuff: [],
        framesList: [34, 26, 92],
        offset: 14,
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
        damage: "hybrid",
        elements: [
          "fire"
        ],
        debuff: [],
        framesList: [95, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 14],
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
        castTime: 40,
        damage: "magic",
        elements: [
          "fire"
        ],
        debuff: [],
        framesList: [240],
        offset: 14,
        base: 2000,
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
        debuff: [],
        framesList: [149, 9, 9, 9, 9],
        base: 390,
        dualable: false
      },
      {
        "id": 507553,
        "names": {
          "en": "Kafrizzle + 2",
          "tw": "美拉蓋亞 + 2",
          "kr": "메라가이아 + 2",
          "fr": "Gigaflamme + 2",
          "de": "Schmurgel + 2",
          "es": "Superataque ígneo + 2"
        },
        "damage": "magic",
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "framesList": [
          240
        ],
        "offset": 14,
        "base": 3000
      },
      {
        "id": 507554,
        "names": {
          "en": "Kafrizzle + 2 (Max)",
          "tw": "美拉蓋亞 + 2 (Max)",
          "kr": "메라가이아 + 2 (Max)",
          "fr": "Gigaflamme + 2 (Max)",
          "de": "Schmurgel + 2 (Max)",
          "es": "Superataque ígneo + 2 (Max)"
        },
        "damage": "magic",
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "framesList": [
          240
        ],
        "offset": 14,
        "base": 4400
      }
    ]
  },
  {
    id: 121,
    names: {
      en: "Lila",
      tw: "利拉",
      kr: "리라"
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
        framesList: [8, 5, 5, 5, 5, 5, 5, 5, 7, 7, 10, 10, 10, 10],
        offset: 83,
        base: 1000
      },
      {
        "id": 707608,
        "names": {
          "en": "Martial Arts - Heaven Shift + 2",
          "tw": "格鬥術·操氣天沖 + 2",
          "kr": "격투술·조기천충 + 2",
          "fr": "Art martial - Chang. céleste + 2",
          "de": "Kampfkunst - Himmlischer Stoß + 2",
          "es": "Artes marciales - Cambio celeste + 2"
        },
        "damage": "magic",
        "base": 1500,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 8, 8, 8, 8, 8, 10
        ],
        "castTime": 8,
        "offset": 14,
        "framesList": [
          8, 5, 5, 5, 5, 5, 5, 5, 7, 7, 9, 9, 9, 9, 9, 9
        ]
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
        castTime: 40,
        framesList: [120],
        offset: 14,
        base: 650
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
        framesList: [22, 16, 37, 81],
        offset: 14,
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
        framesList: [10, 10, 10, 10, 10, 10, 10],
        offset: 32,
        base: 520
      },
      {
        "id": 707610,
        "names": {
          "en": "Martial Arts - Tojin Combo + 2",
          "tw": "格鬥術·鬥神連擊 + 2",
          "kr": "격투술·투신연격 + 2",
          "fr": "Art martial - Combo Tojin + 2",
          "de": "Kampfkunst - Salve des Kriegsgottes + 2",
          "es": "Artes marciales - Combo Tojin + 2"
        },
        "base": 1400,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 55
        ],
        "castTime": 10,
        "offset": 14,
        "framesList": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ]
      },,
      {
        "id": 508330,
        "names": {
          "en": "Martial Arts - Waking Palm",
          "tw": "格鬥術·醒眼掌",
          "kr": "격투술·성안장",
          "fr": "Arts martiaux - Paume de l'éveil",
          "de": "Kampfkunst - Erwachende Hand",
          "es": "Artes marciales - Palma del despertar"
        },
        "base": 2600,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          10
        ]
      },
      {
        "id": 228062,
        "names": {
          "en": "Martial Arts - Shield Breaker",
          "tw": "格鬥術·壞盾突",
          "kr": "격투술·괴순돌",
          "fr": "Arts martiaux - Brise-bouclier",
          "de": "Kampfkunst - Schildbrecher",
          "es": "Artes marciales - Rompescudo"
        },
        "base": 240,
        "hitDamage": [
          25, 25, 25, 25
        ],
        "offset": 8,
        "framesList": [
          0, 5, 5, 5
        ]
      },
      {
        "id": 100013807,
        "names": {
          "en": "Flower Barrage",
          "tw": "六華仙裂",
          "kr": "육화선열",
          "fr": "Déluge de fleurs",
          "de": "Blumenbeschuss",
          "es": "Descarga floral"
        },
        "base": 1650,
        "hitDamage": [
          15, 10, 10, 10, 10, 10, 10, 10, 15
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          49, 16, 16, 12, 8, 15, 6, 3, 54
        ]
      },
      {
        "id": 900000237,
        "names": {
          "en": "Flower Barrage + 1",
          "tw": "六華仙裂 + 1",
          "kr": "육화선열 + 1",
          "fr": "Déluge de fleurs + 1",
          "de": "Blumenbeschuss + 1",
          "es": "Descarga floral + 1"
        },
        "base": 1800,
        "hitDamage": [
          15, 10, 10, 10, 10, 10, 10, 10, 15
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          49, 16, 16, 12, 8, 15, 6, 3, 54
        ]
      }
    ],
    multiCasts: [
      {
        count: 3,
        abilities: [
          224650,
          224660,
          224670,
          224680,
          508330,
          228062
        ]
      }
    ]
  },
  {
    id: 122,
    names: {
      en: "Sephiroth",
      tw: "賽菲羅斯",
      kr: "세피로스",
      fr: "Séphiroth",
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
        framesList: [22, 20, 30],
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
        framesList: [70, 7, 5, 7, 7, 7, 7],
        offset: 14,
        base: 680
      },
      {
        id: 111224520,
        names: {
          en: "The Heavens Wept + 2",
          tw: "天舞輪迴斬 + 2",
          kr: "천무윤회참 + 2",
          fr: "Affliction céleste + 2",
          de: "Samsara-Spalter + 2",
          es: "Furia transmigratoria + 2"
        },
        hitDamage: [
          14, 14, 14, 14, 14, 14, 16
        ],
        castTime: 40,
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
        framesList: [70, 7, 5, 7, 7, 7, 7],
        offset: 14,
        base: 900
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
        castTime: 40,
        damage: "magic",
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
        framesList: [350],
        offset: 14,
        base: 180,
        ignore: 50
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
        framesList: [42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
        offset: 14,
        base: 700
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
        framesList: [0, 14, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 6],
        offset: 80,
        base: 370,
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
        framesList: [42, 10, 10, 10, 10, 10, 10, 10],
        offset: 14,
        base: 360,
        ignore: 50
      },
      {
        "id": 228052,
        "names": {
          "en": "Consuming Light",
          "tw": "蝕光",
          "kr": "빛의 잠식",
          "fr": "Éclipse de lumière",
          "de": "Lichtfinsternis",
          "es": "Eclipse luminoso"
        },
        "base": 690,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 20,
        "framesList": [
          22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20
        ],
        "offset": 14
      },
      {
        "id": 228053,
        "names": {
          "en": "Descent into Darkness",
          "tw": "墮暗",
          "kr": "암흑 타락",
          "fr": "Descente aux ténèbres",
          "de": "Sturz in die Finsternis",
          "es": "Descenso a la Oscuridad"
        },
        "base": 690,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 20,
        "framesList": [
          22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20
        ],
        "offset": 14
      },
      {
        "id": 228051,
        "names": {
          "en": "Supremacy",
          "tw": "震天動地",
          "kr": "진천동지",
          "fr": "Désastre",
          "de": "Übermacht",
          "es": "Inmanencia"
        },
        "base": 800,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ],
        "offset": 14
      },
      {
        "id": 508320,
        "names": {
          "en": "Tragic End",
          "tw": "悲慘終結",
          "kr": "비극적 결말",
          "fr": "Fin tragique",
          "de": "Tragisches Ende",
          "es": "Final trágico"
        },
        "base": 1700,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "framesList": [
          120
        ],
        "offset": 14
      },
      {
        "id": 111508320,
        "names": {
          "en": "Tragic End + 2",
          "tw": "悲慘終結 + 2",
          "kr": "비극적 결말 + 2",
          "fr": "Fin tragique + 2",
          "de": "Tragisches Ende + 2",
          "es": "Final trágico + 2"
        },
        "base": 2800,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "framesList": [
          120
        ],
        "offset": 14
      },
      {
        id: 207001007,
        names: {
          en: "One-Winged Angel",
          tw: "獨翼天使",
          kr: "편익의 천사",
          fr: "Ange à une aile",
          de: "Einflügliger Engel",
          es: "Fulgor seráfico"
        },
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
        framesList: [220],
        base: 1150,
        ignore: 50
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          224520,
          111224520,
          224530,
          224540,
          224510,
          224570,
          228052,
          228053,
          228051,
        ]
      }
    ]
  },
  {
    id: 123,
    names: {
      en: "Heltich",
      tw: "海爾蒂克",
      kr: "헬틱"
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
        dualable: false,
        framesList: [82, 10, 10, 10, 10, 10, 10],
        offset: 14,
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
        dualable: false,
        framesList: [120, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        offset: 14,
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
        castTime: 40,
        damage: "magic",
        dualable: false,
        framesList: [200],
        offset: 14,
        base: 660
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
        damage: "magic",
        elements: [
          "dark"
        ],
        dualable: false,
        framesList: [107],
        base: 940
      }
    ],
    multipleBlack: 2
  },
  {
    id: 124,
    names: {
      en: "Killian",
      tw: "希里安",
      kr: "킬리언"
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
        castTime: 48,
        debuffs: [
          {
            type: "fire",
            value: 50
          }
        ],
        framesList: [68],
        offset: 14,
        base: 350
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
        castTime: 38,
        framesList: [78],
        offset: 14,
        base: 400
      },
      {
        id: 224020111,
        names: {
          en: "Gear-up + 2",
          tw: "換檔加速 + 2",
          kr: "기어 상승 + 2",
          fr: "Préparation + 2",
          de: "Gang hochschalten + 2",
          es: "Cambio de marcha + 2"
        },
        castTime: 38,
        framesList: [78],
        offset: 14,
        base: 620
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
        framesList: [145, 22, 58, 56],
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
    ]
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
        framesList: [92, 10, 10, 10, 10, 10, 10, 10],
        offset: 14,
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
        dualable: false,
        framesList: [42, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        offset: 14,
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
        castTime: 40,
        dualable: false,
        framesList: [425],
        offset: 14,
        base: 1200
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
        dualable: false,
        framesList: [4],
        base: 940
      }
    ]
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
        dualable: false,
        framesList: [50, 10, 10, 10, 10],
        offset: 14,
        base: 650
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
        castTime: 40,
        damage: "magic",
        elements: [
          "earth"
        ],
        dualable: false,
        framesList: [80],
        offset: 14,
        base: 1150
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
        framesList: [160, 22, 21, 22, 23, 23, 22, 23],
        offset: 14,
        base: 375
      },
      {
        id: 20390,
        names: {
          en: "Tornado",
          tw: "龍捲風",
          kr: "토네이도",
          fr: "Tornade"
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
        framesList: [80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        offset: 14,
        base: 350
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
        framesList: [240],
        offset: 14,
        base: 330
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
        castTime: 40,
        damage: "magic",
        elements: [
          "water"
        ],
        dualable: false,
        framesList: [140],
        offset: 14,
        base: 1750
      },
      {
        "id": 707565,
        "names": {
          "en": "Eidolon Mindflayer's Chant + 2",
          "tw": "幻獸奪心魔的詠唱 + 2",
          "kr": "환수 마인드 플레어의 영창 + 2",
          "fr": "Éon : Chant de Psychopolype + 2",
          "de": "Beschwörbarer Gedankenschinder: Intonation + 2",
          "es": "Eidolón: canto del mentalis + 2"
        },
        "damage": "magic",
        "base": 2000,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          140
        ]
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
        castTime: 40,
        damage: "magic",
        magicType: "black",
        dualable: false,
        framesList: [350],
        offset: 14,
        base: 350,
        ignore: 25
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
        castTime: 40,
        damage: "magic",
        elements: [
          "fire"
        ],
        dualable: false,
        framesList: [150],
        offset: 14,
        base: 1950
      },
      {
        "id": 912406,
        "names": {
          "en": "Eidolon Bomb Explosion + 2",
          "tw": "幻獸炸彈的自爆 + 2",
          "kr": "환수 봄의 자폭 + 2",
          "fr": "Éon : Explosion de Bombo + 2",
          "de": "Beschwörbarer Bomber: Explosion + 2",
          "es": "Eidolón: explosión bom + 2"
        },
        "damage": "magic",
        "base": 2500,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          150
        ]
      },
      {
        "id": 508281,
        "names": {
          "en": "Burst Storm",
          "tw": "爆裂風暴",
          "kr": "버스트 스톰",
          "fr": "Tempête explosive",
          "de": "Rauschender Sturm",
          "es": "Explosión tormentosa"
        },
        "damage": "magic",
        "base": 1600,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "water",
            "value": 75
          },
          {
            "type": "wind",
            "value": 75
          },
          {
            "type": "earth",
            "value": 75
          }
        ],
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ]
      },
      {
        "id": 912415,
        "names": {
          "en": "Burst Storm + 2",
          "tw": "爆裂風暴 + 2",
          "kr": "버스트 스톰 + 2",
          "fr": "Tempête explosive + 2",
          "de": "Rauschender Sturm + 2",
          "es": "Explosión tormentosa + 2"
        },
        "damage": "magic",
        "base": 2400,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "water",
            "value": 100
          },
          {
            "type": "wind",
            "value": 100
          },
          {
            "type": "earth",
            "value": 100
          }
        ],
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ]
      },
      {
        "id": 204001507,
        "names": {
          "en": "Mist Dragon Breath",
          "tw": "幻獸霧龍的吐息",
          "kr": "환수 미스트 드래곤의 숨결",
          "fr": "Souffle du dragon des brumes",
          "de": "Nebeldrache: Atem",
          "es": "Esper dragón de Mist: aliento"
        },
        "damage": "magic",
        "base": 2800,
        "hitDamage": [
          2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          188, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ]
      }
    ],
    multipleBlack: 3,
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          223400,
          223420,
          223430,
          707565
        ]
      }
    ]
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
        debuffs: [
          {
            type: "dark",
            value: 50
          }
        ],
        framesList: [2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        offset: 8,
        base: 600
      },
      {
        "id": 707573,
        "names": {
          "en": "Piercing Darkness + 2",
          "tw": "刺骨黑暗 + 2",
          "kr": "피어싱 스크로 + 2",
          "fr": "Ténèbres perçantes + 2",
          "de": "Dunkeldurchstoß + 2",
          "es": "Tiniebla penetrante + 2"
        },
        "base": 1000,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 8, 8, 8, 8, 8, 10
        ],
        "castTime": 8,
        "offset": 14,
        "debuffs": [
          {
            "type": "dark",
            "value": 90
          }
        ],
        "framesList": [
          8, 5, 5, 5, 5, 5, 5, 5, 7, 7, 9, 9, 9, 9, 9, 9
        ]
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
        debuffs: [
          {
            type: "water",
            value: 50
          }
        ],
        framesList: [2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        offset: 8,
        base: 600
      },
      {
        "id": 707571,
        "names": {
          "en": "Piercing Aqua + 2",
          "tw": "刺骨冰水 + 2",
          "kr": "피어싱 아쿠아 + 2",
          "fr": "Eau perçante + 2",
          "de": "Wasserdurchstoß + 2",
          "es": "Agua penetrante + 2"
        },
        "base": 1000,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 8, 8, 8, 8, 8, 10
        ],
        "castTime": 8,
        "offset": 14,
        "debuffs": [
          {
            "type": "water",
            "value": 90
          }
        ],
        "framesList": [
          8, 5, 5, 5, 5, 5, 5, 5, 7, 7, 9, 9, 9, 9, 9, 9
        ]
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
        debuffs: [
          {
            type: "wind",
            value: 50
          }
        ],
        framesList: [2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        offset: 8,
        base: 600
      },
      {
        "id": 707569,
        "names": {
          "en": "Piercing Air + 2",
          "tw": "刺骨寒風 + 2",
          "kr": "피어싱 에어 + 2",
          "fr": "Vent perçant + 2",
          "de": "Luftdurchstoß + 2",
          "es": "Viento penetrante + 2"
        },
        "base": 1000,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 8, 8, 8, 8, 8, 10
        ],
        "castTime": 8,
        "offset": 14,
        "debuffs": [
          {
            "type": "wind",
            "value": 90
          }
        ],
        "framesList": [
          8, 5, 5, 5, 5, 5, 5, 5, 7, 7, 9, 9, 9, 9, 9, 9
        ]
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
        framesList: [6, 8, 8, 8, 8, 8, 8],
        offset: 8,
        base: 345,
        ignore: 50
      },
      {
        "id": 228022,
        "names": {
          "en": "Dragon Raid+",
          "tw": "龍之劍改",
          "kr": "개량형 드래곤 레이드",
          "fr": "Raid de dragon +",
          "de": "Drachenangriff+",
          "es": "Ataque dragón"
        },
        "base": 580,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "dualable": false,
        "framesList": [
          0
        ]
      },
      {
        "id": 912402,
        "names": {
          "en": "Dragon Raid+ + 2",
          "tw": "龍之劍改 + 2",
          "kr": "개량형 드래곤 레이드 + 2",
          "fr": "Raid de dragon + + 2",
          "de": "Drachenangriff+ + 2",
          "es": "Ataque dragón + 2"
        },
        "base": 800,
        "hitDamage": [
          100
        ],
        "castTime": 10,
        "offset": 14,
        "dualable": false,
        "framesList": [
          0
        ]
      },
      {
        "id": 508290,
        "names": {
          "en": "Piercing Dead",
          "tw": "穿刺死亡",
          "kr": "날카로운 죽음",
          "fr": "Mort perçante",
          "de": "Todesspieß",
          "es": "Pinchazo mortal"
        },
        "base": 1000,
        "hitDamage": [
          30, 30, 40
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          46, 10, 10
        ]
      },
      {
        "id": 228021,
        "names": {
          "en": "Accumulating Blow",
          "tw": "積累打擊",
          "kr": "타격 축적",
          "fr": "Frappe accumulée",
          "de": "Schlag auf Schlag",
          "es": "Golpe acumulativo"
        },
        "base": 330,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          110
        ]
      },
      {
        "id": 204001607,
        "names": {
          "en": "Dragon's Bane",
          "tw": "龍禍",
          "kr": "드래곤 베인",
          "fr": "Fléau du dragon",
          "de": "Drachenunheil",
          "es": "Pesadilla del dragón"
        },
        "base": 850,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          182
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          223480,
          223490,
          223500,
          707569,
          707571,
          707573,
          223470,
          508290
        ]
      }
    ]
  },
  {
    id: 128,
    names: {
      en: "Yang",
      tw: "楊",
      kr: "얀"
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
        framesList: [2, 8, 8, 8, 8, 8],
        offset: 8,
        base: 200,
        ignore: 50
      },
      {
        "id": 707577,
        "names": {
          "en": "All-out Scuffle + 2",
          "tw": "全力格鬥 + 2",
          "kr": "전력 격투 + 2",
          "fr": "Rixe totale + 2",
          "de": "Kompromissloser Nahkampf + 2",
          "es": "Reyerta total + 2"
        },
        "base": 250,
        "hitDamage": [
          14, 14, 14, 14, 14, 15, 15
        ],
        "castTime": 10,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          2, 8, 8, 8, 8, 8, 8
        ]
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
        dualable: false,
        framesList: [32, 3, 18, 18, 3, 23, 3, 20, 26, 3, 34, 4],
        base: 840
      }
    ],
    multiCasts: [
      {
        count: 2,
        abilities: [
          223790,
          707577
        ]
      }
    ]
  },
  {
    id: 129,
    names: {
      en: "Lexa",
      tw: "萊基薩",
      kr: "렉사"
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
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "wind"
        ],
        dualable: false,
        framesList: [170],
        offset: 14,
        base: 600
      },
      {
        id: 225280,
        names: {
          en: "Liber Magika",
          tw: "魔法之書",
          kr: "리베르 마기카"
        },
        castTime: 40,
        damage: "magic",
        dualable: false,
        framesList: [147],
        offset: 14,
        base: 200,
        ignore: 25
      },
      {
        id: 20390,
        names: {
          en: "Tornado",
          tw: "龍捲風",
          kr: "토네이도",
          fr: "Tornade"
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
        framesList: [80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        offset: 14,
        base: 250
      },
      {
        "id": 70441,
        "names": {
          "en": "Tornado + 2",
          "tw": "龍捲風 + 2",
          "kr": "토네이도 + 2",
          "fr": "Tornade + 2"
        },
        "damage": "magic",
        "base": 350,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "wind",
            "value": 65
          }
        ],
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ]
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
        damage: "magic",
        elements: [
          "wind"
        ],
        dualable: false,
        framesList: [200, 10, 10, 10, 10],
        base: 740
      }
    ],
    multipleBlack: 2
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
        framesList: [5],
        offset: 8,
        base: 270
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
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "ice"
        ],
        dualable: false,
        framesList: [240],
        offset: 14,
        base: 600
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
        castTime: 40,
        damage: "magic",
        magicType: "black",
        elements: [
          "water"
        ],
        dualable: false,
        framesList: [190],
        offset: 14,
        base: 600
      },
      {
        "id": 20380,
        "names": {
          "en": "Flood",
          "tw": "洪水",
          "kr": "플러드",
          "fr": "Inondation",
          "de": "Flut",
          "es": "Inundación"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "water"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "lightning",
            "value": 50
          }
        ],
        "framesList": [
          133, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ]
      },
      {
        "id": 20760,
        "names": {
          "en": "Raging Water",
          "tw": "狂水",
          "kr": "조워터",
          "fr": "Flots déchaînés",
          "de": "Reißender Strom",
          "es": "Aguas enfurecidas"
        },
        "damage": "magic",
        "base": 1200,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "water"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          110
        ]
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
      fr: "Mario Frego"
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
        framesList: [32, 20, 20, 20],
        offset: 14,
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
        framesList: [70, 7, 5, 7, 7, 7, 7],
        offset: 14,
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
        dualable: false,
        framesList: [160],
        base: 820
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
    ]
  },
  {
    id: 132,
    names: {
      en: "Rico Rodriguez",
      tw: "瑞科·羅德里格茲",
      kr: "리코 로드리게즈"
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
        framesList: [42, 10, 10, 10, 10, 10, 10, 10],
        offset: 14,
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
        dualable: false,
        framesList: [93, 20, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        base: 570,
        ignore: 50
      }
    ]
  },
  {
    id: 133,
    names: {
      en: "Ling",
      tw: "鈴",
      kr: "링"
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
        elements: [
          "fire"
        ],
        dualable: false,
        framesList: [190, 10, 10, 10, 10],
        base: 620
      }
    ]
  },
  {
    id: 134,
    names: {
      en: "Aranea",
      tw: "艾拉妮亞",
      kr: "아라네아"
    },
    abilities: [,
      {
        "id": 227620,
        "names": {
          "en": "Dragoon Dive",
          "tw": "龍躍",
          "kr": "드래곤 리프",
          "fr": "Saut de dragon",
          "de": "Drachensatz",
          "es": "Caída dracontina"
        },
        "base": 470,
        "hitDamage": [
          100
        ],
        "castTime": 10,
        "dualable": false,
        "framesList": [
          0
        ],
        "offset": 14
      },
      {
        "id": 227622,
        "names": {
          "en": "High Dragoon Dive",
          "tw": "龍騰",
          "kr": "하이 드래곤 리프",
          "fr": "Super saut de dragon",
          "de": "Hoher Drachensatz",
          "es": "Caída dracontina+"
        },
        "base": 750,
        "hitDamage": [
          100
        ],
        "castTime": 10,
        "dualable": false,
        "framesList": [
          0
        ],
        "offset": 14
      },
      {
        "id": 912321,
        "names": {
          "en": "High Dragoon Dive + 2",
          "tw": "龍騰 + 2",
          "kr": "하이 드래곤 리프 + 2",
          "fr": "Super saut de dragon + 2",
          "de": "Hoher Drachensatz + 2",
          "es": "Caída dracontina+ + 2"
        },
        "base": 1000,
        "hitDamage": [
          100
        ],
        "castTime": 10,
        "offset": 14,
        "dualable": false,
        "framesList": [
          0
        ]
      },
      {
        "id": 215000607,
        "names": {
          "en": "Highwind",
          "tw": "制空強擊",
          "kr": "에어 슈페리오리티",
          "fr": "Suprématie aérienne",
          "de": "Lufthoheit",
          "es": "As del aire"
        },
        "base": 1200,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          151
        ],
        "offset": 8
      }
    ]
  },
  {
    id: 135,
    names: {
      en: "Ukiyo",
      tw: "浮世",
      kr: "우키요"
    },
    abilities: [
      {
        id: 227346,
        names: {
          en: "Tengu Charm",
          tw: "天狗之符",
          kr: "텐구의 부적",
          fr: "Amulette (tengu)",
          de: "Tengu-Gebet",
          es: "Amuleto tengu"
        },
        damage: "magic",
        hitDamage: [
          11, 11, 11, 11, 11, 11, 11, 11, 12
        ],
        castTime: 110,
        elements: [
          "wind"
        ],
        dualable: false,
        framesList: [
          122, 7, 7, 7, 7, 7, 7, 7, 17
        ],
        offset: 14,
        base: 140,
        debuffs: [
          {
            type: "wind",
            value: 60
          }
        ]
      },
      {
        id: 227347,
        names: {
          en: "Dragon Charm",
          tw: "龍之符",
          kr: "용의 부적",
          fr: "Amulette (dragon)",
          de: "Drachen-Gebet",
          es: "Amuleto dragoniano"
        },
        damage: "magic",
        castTime: 110,
        dualable: false,
        framesList: [
          112, 6, 6, 6, 6
        ],
        offset: 14,
        base: 250
      },
      {
        id: 227351,
        names: {
          en: "Ukiyo's Light Spell",
          tw: "浮世式陽咒彈",
          kr: "우키요식 주술탄[양]",
          fr: "Sort de lumière d'Ukiyo",
          de: "Ukiyos Lichtspruch",
          es: "Hechizo lumínico de Ukiyo"
        },
        damage: "magic",
        hitDamage: [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        castTime: 40,
        elements: [
          "light"
        ],
        dualable: false,
        framesList: [
          72, 10, 10, 10, 10, 10, 10, 10
        ],
        offset: 14,
        base: 450
      },
      {
        id: 227350,
        names: {
          en: "Tsukumo's Transformation",
          tw: "付喪變化",
          kr: "츠쿠모 변화",
          fr: "Transformation de Tsukumo",
          de: "Tsukumo-Verwandlung",
          es: "Transformación de Tsukumo"
        },
        damage: "magic",
        castTime: 110,
        dualable: false,
        framesList: [
          150
        ],
        offset: 14,
        base: 300
      },
      {
        id: 507861,
        names: {
          en: "Demon Tsukumo",
          tw: "鬼付喪",
          kr: "귀신 츠쿠모",
          fr: "Tsukumo démoniaque",
          de: "Dämonischer Tsukumo",
          es: "Tsukumo demoníaco"
        },
        damage: "magic",
        castTime: 40,
        dualable: false,
        framesList: [
          42, 8, 8, 8, 11
        ],
        offset: 14,
        base: 800,
        ignore: 25
      },
      {
        id: 100016606,
        names: {
          en: "Tsukumo's Descent",
          tw: "付喪降臨",
          kr: "츠쿠모 강림",
          fr: "Attaque de Tsukumo",
          de: "Tsukomos Herabkunft",
          es: "Descenso de Tsukumo"
        },
        damage: "magic",
        elements: [
          "light",
          "dark"
        ],
        dualable: false,
        framesList: [
          180, 66, 10, 10, 10
        ],
        base: 1380
      }
    ]
  },
  {
    id: 136,
    names: {
      en: "Zile",
      tw: "扎伊爾",
      kr: "자일"
    },
    abilities: [
      {
        id: 226350,
        names: {
          en: "Heavy Shell",
          tw: "重炮彈",
          kr: "중포탄",
          fr: "Carapace lourde",
          de: "Schwere Artilleriegranaten",
          es: "Cartucho pesado"
        },
        castTime: 75,
        framesList: [
          145
        ],
        offset: 14,
        base: 150,
        ignore: 50
      },
      {
        id: 507130,
        names: {
          en: "Powerful Shell",
          tw: "強力炮彈",
          kr: "강력 포탄",
          fr: "Balle puissante",
          de: "Kraftprojektil",
          es: "Escudo potente"
        },
        castTime: 75,
        framesList: [
          110
        ],
        offset: 14,
        base: 825
      },
      {
        id: 507140,
        names: {
          en: "Super Shell",
          tw: "超強力炮彈",
          kr: "초강력 포탄",
          fr: "Super balle",
          de: "Super Kraftprojektil",
          es: "Superescudo"
        },
        castTime: 75,
        framesList: [
          135
        ],
        offset: 14,
        base: 1500
      },
      {
        id: 507150,
        names: {
          en: "Devastating Shell",
          tw: "激烈強力炮彈",
          kr: "격렬 강력 포탄",
          fr: "Balle dévastatrice",
          de: "Verheerendes Kraftprojektil",
          es: "Escudo devastador"
        },
        castTime: 75,
        framesList: [
          135
        ],
        offset: 14,
        base: 2250
      },
      {
        id: 507170,
        names: {
          en: "Miraculous Shell",
          tw: "填充火藥過多的奇蹟大爆炸彈",
          kr: "화약 오버 기적의 대폭발탄",
          fr: "Bouclier miraculeux",
          de: "Übervolles Wundersprenggeschoss",
          es: "Escudo milagroso"
        },
        castTime: 75,
        framesList: [
          275
        ],
        offset: 14,
        base: 2650
      },
      {
        id: 100015206,
        names: {
          en: "Knightly Crossfire!",
          tw: "騎士團十字炮火！",
          kr: "기사단식 십자포화!",
          fr: "Passe d'armes chevaleresque !",
          de: "Ritterliches Kreuzfeuer!",
          es: "¡Fuego cruzado entre caballeros!"
        },
        hitDamage: [
          20, 20, 60
        ],
        dualable: false,
        framesList: [
          286, 30, 30
        ],
        base: 1720
      }
    ]
  },
  {
    id: 137,
    names: {
      en: "Raegen",
      tw: "雷根",
      kr: "레겐"
    },
    abilities: [
      {
        id: 226130,
        names: {
          en: "Hero's Edge",
          tw: "英雄之刃",
          kr: "영웅의 검날",
          fr: "Lame de héros",
          de: "Heldenklinge",
          es: "Filo del héroe"
        },
        hitDamage: [
          20, 20, 60
        ],
        framesList: [
          8, 13, 22
        ],
        base: 240
      },
      {
        id: 226120,
        names: {
          en: "Blades of Azure Crimson",
          tw: "緋蒼之劍",
          kr: "비창의 검",
          fr: "Lames azur carmin",
          de: "Purpurazurklingen",
          es: "Hojas azul enrojecido"
        },
        hitDamage: [
          14, 14, 14, 14, 14, 14, 16
        ],
        castTime: 40,
        framesList: [
          70, 7, 5, 7, 7, 7, 7
        ],
        offset: 14,
        base: 480,
        debuffs: [
          {
            type: "fire",
            value: 60
          },
          {
            type: "ice",
            value: 60
          }
        ]
      },
      {
        "id": 228080,
        "names": {
          "en": "Sword of Ares",
          "tw": "戰神霸刀",
          "kr": "전투신의 패도",
          "fr": "Épée d'Arès",
          "de": "Schwert des Kriegsgottes",
          "es": "Espada de Ares"
        },
        "base": 280,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          110
        ]
      },
      {
        "id": 228081,
        "names": {
          "en": "Octostrike Blade",
          "tw": "八連刃",
          "kr": "팔연검",
          "fr": "Lame octimpact",
          "de": "Klinge des Achtfachen Streichs",
          "es": "Hoja octaimpacto"
        },
        "base": 345,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 508350,
        "names": {
          "en": "Azure Flame Edge",
          "tw": "八連刃",
          "kr": "파염의 창검",
          "fr": "Lame de flamme azur",
          "de": "Azurblaue Flammenklinge",
          "es": "Filo azurígneo"
        },
        "base": 1450,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 100
          }
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 508351,
        "names": {
          "en": "Crimson Frost Edge",
          "tw": "破炎蒼劍",
          "kr": "열빙의 비검",
          "fr": "Lame de glace écarlate",
          "de": "Purpurrote Frostklinge",
          "es": "Filo gélido escarlata"
        },
        "base": 1450,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "debuffs": [
          {
            "type": "ice",
            "value": 100
          }
        ],
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 100010007,
        "names": {
          "en": "Darkness Purging Blades of Azure Crimson",
          "tw": "斬暗緋蒼之劍",
          "kr": "어둠을 떨치는 비창의 검",
          "fr": "Lames azur carmin briseuses de ténèbres",
          "de": "Dunkelheit bannende Purpurazurklingen",
          "es": "Hojas azul enrojecido de oscuridad purgadora"
        },
        "base": 2100,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "dualable": false,
        "offset": 8,
        "debuffs": [
          {
            "type": "fire",
            "value": 100
          },
          {
            "type": "ice",
            "value": 100
          }
        ],
        "framesList": [
          22, 10, 10, 10, 10, 10, 13
        ]
      }
    ]
  },
  {
    id: 138,
    names: {
      en: "Mediena",
      tw: "美迪愛娜",
      kr: "메디아나"
    },
    abilities: [
      {
        id: 20290,
        names: {
          en: "Firaja",
          tw: "強火焰",
          kr: "파이자",
          fr: "Feu max",
          de: "Feuka",
          es: "Piro+++"
        },
        damage: "magic",
        castTime: 40,
        magicType: "black",
        elements: [
          "fire"
        ],
        dualable: false,
        framesList: [
          210
        ],
        offset: 14,
        base: 700
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
        damage: "magic",
        castTime: 40,
        magicType: "black",
        elements: [
          "lightning"
        ],
        dualable: false,
        framesList: [
          150
        ],
        offset: 14,
        base: 700
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
        damage: "magic",
        castTime: 40,
        magicType: "black",
        elements: [
          "wind"
        ],
        dualable: false,
        framesList: [
          170
        ],
        offset: 14,
        base: 700
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
        damage: "magic",
        castTime: 40,
        magicType: "black",
        elements: [
          "ice"
        ],
        dualable: false,
        framesList: [
          240
        ],
        offset: 14,
        base: 800
      },
      {
        id: 20360,
        names: {
          en: "Freeze",
          tw: "冰結",
          kr: "프리즈",
          fr: "Gel",
          de: "Frost",
          es: "Congelación"
        },
        damage: "magic",
        hitDamage: [
          5, 5, 5, 10, 10, 10, 15, 40
        ],
        castTime: 40,
        magicType: "black",
        elements: [
          "ice"
        ],
        dualable: false,
        framesList: [
          140, 14, 14, 14, 14, 14, 15, 15
        ],
        offset: 14,
        base: 475,
        debuffs: [
          {
            type: "ice",
            value: 50
          }
        ]
      },
      {
        id: 20550,
        names: {
          "en": "Raging Ice",
          "tw": "烈冰",
          "kr": "조블리자",
          "fr": "Glace rageuse",
          "de": "Wütendes Eis",
          "es": "Hielo furibundo"
        },
        damage: "magic",
        castTime: 40,
        magicType: "black",
        elements: [
          "ice"
        ],
        dualable: false,
        framesList: [
          250
        ],
        offset: 14,
        base: 1400
      },
      {
        "id": 20390,
        "names": {
          "en": "Tornado",
          "tw": "龍捲風",
          "kr": "토네이도",
          "fr": "Tornade"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ],
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ]
      },
      {
        "id": 508312,
        "names": {
          "en": "Ice Catastrophe",
          "tw": "寒冰災變",
          "kr": "결빙의 재앙",
          "fr": "Calamité glaciale",
          "de": "Eiskatastrophe",
          "es": "Catástrofe glacial"
        },
        "damage": "magic",
        "base": 1000,
        "hitDamage": [
          100
        ],
        "castTime": 41,
        "elements": [
          "ice"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "ice",
            "value": 100
          }
        ],
        "framesList": [
          140
        ]
      },
      {
        "id": 100014007,
        "names": {
          "en": "Cosmo Plume",
          "tw": "宇宙羽流",
          "kr": "코스모 플룸",
          "fr": "Plume cosmique",
          "de": "Kosmofeder",
          "es": "Pilar cósmico"
        },
        "damage": "magic",
        "base": 780,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 20, 20, 25
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          40, 8, 52, 8, 14, 48, 12, 12, 10, 10
        ]
      }
    ],
    multipleBlack: 3,
    multipleWhite: 3,
    multipleGreen: 3
  },
  {
  id: 139,
    names: {
      en: "Awakened Rain",
      tw: "雷因（覺醒）",
      kr: "레인(각성한 힘)",
      fr: "Rain éveillé",
      de: "Erweckter Rain",
      es: "Rain despertado"
    },
    abilities: [
      {
        id: 226410,
        names: {
          en: "Rising Ray",
          tw: "上升射線",
          kr: "승천하는 광선",
          fr: "Rayon ascendant",
          de: "Emporsteigender Strahl",
          es: "Rayo creciente"
        },
        damage: "magic",
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        castTime: 40,
        framesList: [
          110, 9, 9, 9, 9, 9, 9, 9, 9, 9
        ],
        offset: 14,
        base: 360
      },
      {
        "id": 228091,
        "names": {
          "en": "Soul Prominence",
          "tw": "日珥",
          "kr": "홍염의 영혼",
          "fr": "Grandeur d'âme",
          "de": "Seelenlodern",
          "es": "Prominencia espiritual"
        },
        "damage": "magic",
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 40
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "framesList": [
          52, 8, 8, 8, 8, 8, 8
        ],
        "offset": 14,
        "base": 360
      },
      {
        "id": 228092,
        "names": {
          "en": "Earth Explosion",
          "tw": "撼地爆裂",
          "kr": "대지의 폭발",
          "fr": "Explosion terrestre",
          "de": "Erdexplosion",
          "es": "Explosión de tierra"
        },
        "damage": "magic",
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 40
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "framesList": [
          52, 8, 8, 8, 8, 8, 8
        ],
        "offset": 14,
        "base": 360
      },
      {
        "id": 100015807,
        "names": {
          "en": "Blood Linkage",
          "tw": "鮮血連結",
          "kr": "이어진 핏줄",
          "fr": "Lien du sang",
          "de": "Blutsbande",
          "es": "Unión de sangre"
        },
        "damage": "magic",
        "hitDamage": [
          4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5
        ],
        "dualable": false,
        "framesList": [
          140, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "offset": 8,
        "base": 2600
      }
    ]
  },
  {
    id: 140,
    names: {
      en: "Reimi",
      tw: "蕾米",
      kr: "레이미"
    },
    abilities: [
      {
        id: 225620,
        names: {
          en: "Chaotic Blossoms",
          tw: "亂櫻",
          kr: "벚꽃난무",
          fr: "Fleurs du chaos",
          de: "Chaosblüten",
          es: "Flores del caos"
        },
        hitDamage: [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        framesList: [
          2, 8, 8, 8, 8, 8, 8, 8, 8, 8
        ],
        base: 200,
        offset: 8
      },
      {
        id: 225630,
        names: {
          en: "Crimson Squall",
          tw: "紅陣雨",
          kr: "붉은 가을비",
          fr: "Hurlement pourpre",
          de: "Sturmpfeil",
          es: "Lluvia carmesí"
        },
        hitDamage: [
          12, 12, 12, 12, 12, 12, 12, 16
        ],
        castTime: 40,
        framesList: [
          42, 7, 7, 7, 7, 7, 7, 7
        ],
        offset: 14,
        base: 220
      },
      {
        id: 225640,
        names: {
          en: "Crescent Wings",
          tw: "弦月",
          kr: "조각달",
          fr: "Ailes en croissant",
          de: "Flügel des Zorns",
          es: "Alas crecientes"
        },
        hitDamage: [
          50, 50
        ],
        castTime: 40,
        framesList: [
          142, 4
        ],
        offset: 14,
        base: 200,
        ignore: 25
      },
      {
        id: 319000106,
        names: {
          en: "Savage Sparrows",
          tw: "荒燕",
          kr: "황연",
          fr: "Moineaux sauvages",
          de: "Wildspatzen",
          es: "Gorriones salvajes"
        },
        hitDamage: [
          16, 16, 17, 17, 17, 17
        ],
        dualable: false,
        framesList: [
          103, 5, 5, 5, 5, 5
        ],
        base: 720
      }
    ],
    multiCasts: [
      {
        count: 2,
        abilities: [
          225620,
          225630,
          225640
        ]
      }
    ]
  },
  {
    id: 141,
    names: {
      en: "Fidel",
      tw: "菲德爾",
      kr: "피델"
    },
    abilities: [
      {
        id: 225770,
        names: {
          en: "Mirror Blade",
          tw: "鏡面剎",
          kr: "경면살",
          fr: "Lame miroir",
          de: "Spiegelwelt",
          es: "Espada reflejante"
        },
        hitDamage: [
          20, 20, 20, 20, 20
        ],
        framesList: [
          17, 9, 17, 39, 8
        ],
        base: 360,
        offset: 8
      },
      {
        id: 225420,
        names: {
          en: "Abyssal Gate",
          tw: "迷失者閃避",
          kr: "스트레이어 보이드",
          fr: "Porte des abysses",
          de: "Einschießen",
          es: "Puerta a las profundidades"
        },
        hitDamage: [
          33, 33, 34
        ],
        castTime: 40,
        framesList: [
          52, 40, 40
        ],
        offset: 14,
        base: 400
      },
      {
        id: 225760,
        names: {
          en: "Cyclone Blade",
          tw: "颶風之刃",
          kr: "사이클론 블레이드",
          fr: "Lame cyclone",
          de: "Wirbelsturmklinge",
          es: "Espada ciclónica"
        },
        hitDamage: [
          20, 20, 20, 20, 20
        ],
        castTime: 40,
        framesList: [
          62, 8, 8, 8, 8
        ],
        offset: 14,
        base: 200,
        debuffs: [
          {
            type: "wind",
            value: 50
          }
        ]
      },
      {
        id: 225410,
        names: {
          en: "Air Raid",
          tw: "垂直空中襲擊",
          kr: "바티칼 에어레이드",
          fr: "Raid aérien",
          de: "Vertikaler Luftschlag",
          es: "Asalto aéreo"
        },
        hitDamage: [
          11, 11, 11, 11, 11, 11, 11, 11, 12
        ],
        castTime: 40,
        framesList: [
          42, 30, 7, 3, 4, 4, 7, 7, 7
        ],
        offset: 14,
        base: 350,
        ignore: 50
      },
      {
        id: 320000106,
        names: {
          en: "Ethereal Blast",
          tw: "異凍·衝擊",
          kr: "이데리얼 블래스트",
          fr: "Explosion iserial",
          de: "Iserialknall",
          es: "Explosión etérea"
        },
        hitDamage: [
          8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9
        ],
        dualable: false,
        framesList: [
          202, 10, 10, 10, 10, 10, 10, 10, 20, 8, 8, 8
        ],
        base: 550,
        ignore: 50
      }
    ]
  },
  {
    id: 142,
    "names": {
      "en": "Fayt",
      "tw": "菲特",
      "kr": "페이트"
    },
    "abilities": [
      {
        "id": 225400,
        "names": {
          "en": "Blade of Fury",
          "tw": "連鎖刃器",
          "kr": "블레이드 리액터",
          "fr": "Onde tranchante",
          "de": "Klingenreaktor",
          "es": "Hoja reactiva"
        },
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 15,
        "framesList": [
          17, 13, 17, 23, 35
        ],
        "offset": 14,
        "base": 1250
      },
      {
        "id": 225390,
        "names": {
          "en": "Side Kick",
          "tw": "衝突反射",
          "kr": "리플렉트 스트라이프",
          "fr": "Mêlée défoulante",
          "de": "Reflektierte Zwietracht",
          "es": "Riña reflectante"
        },
        "hitDamage": [
          33, 33, 34
        ],
        "framesList": [
          2, 5, 5
        ],
        "base": 240,
        offset: 8
      },
      {
        "id": 225420,
        "names": {
          "en": "Abyssal Gate",
          "tw": "迷失者閃避",
          "kr": "스트레이어 보이드",
          "fr": "Porte des abysses",
          "de": "Einschießen",
          "es": "Puerta a las profundidades"
        },
        "hitDamage": [
          33, 33, 34
        ],
        "castTime": 40,
        "framesList": [
          52, 40, 40
        ],
        "offset": 14,
        "base": 400
      },
      {
        "id": 225410,
        "names": {
          "en": "Air Raid",
          "tw": "垂直空中襲擊",
          "kr": "바티칼 에어레이드",
          "fr": "Raid aérien",
          "de": "Vertikaler Luftschlag",
          "es": "Asalto aéreo"
        },
        "hitDamage": [
          11, 11, 11, 11, 11, 11, 11, 11, 12
        ],
        "castTime": 40,
        "framesList": [
          42, 30, 7, 3, 4, 4, 7, 7, 7
        ],
        "offset": 14,
        "base": 350,
        "ignore": 50
      },
      {
        "id": 911893,
        "names": {
          "en": "Charge (SO3)",
          "tw": "蓄力 (SO3)",
          "kr": "충전 (SO3)",
          "de": "Ansturm (SO3)",
          "es": "Recarga (SO3)"
        },
        "base": 520,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          100
        ]
      },
      {
        "id": 911894,
        "names": {
          "en": "Enhanced Shotgun Blast",
          "tw": "強化散彈槍·伏特",
          "kr": "강화 샷건·볼트",
          "fr": "Super fusillade explosive",
          "de": "Verstärkter Schrotflintenschuss",
          "es": "Supertiroteo explosivo"
        },
        "base": 650,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 911897,
        "names": {
          "en": "Enhanced Aerial",
          "tw": "強化大氣",
          "kr": "강화 에어리얼",
          "fr": "Super onde de choc",
          "de": "Verstärkter Luftangriff",
          "es": "Superonda de choque"
        },
        "base": 1400,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          110
        ]
      },
      {
        "id": 318000107,
        "names": {
          "en": "Ethereal Blast of Time",
          "tw": "異凍·衝刺·刻",
          "kr": "이데리얼 블래스트·타임",
          "fr": "Explosion éthérée du temps",
          "de": "Ätherischer Zeitknall",
          "es": "Explosión temporal etérea"
        },
        "base": 800,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9
        ],
        "framesList": [
          202, 10, 10, 10, 10, 10, 10, 10, 20, 8, 8, 8
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 70
          },
          {
            "type": "ice",
            "value": 70
          },
          {
            "type": "lightning",
            "value": 70
          },
          {
            "type": "water",
            "value": 70
          },
          {
            "type": "wind",
            "value": 70
          },
          {
            "type": "earth",
            "value": 70
          },
          {
            "type": "light",
            "value": 70
          },
          {
            "type": "dark",
            "value": 70
          }
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          225400,
          225390,
          225420,
          225410,
          911893,
          911894,
          911897
        ]
      }
    ]
  },
  {
    id: 143,
    "names": {
      "en": "Rena",
      "tw": "蕾娜",
      "kr": "레나"
    },
    "abilities": [
      {
        id: 225570,
        "names": {
          "en": "Laser Beams",
          "tw": "光束",
          "kr": "레이",
          "fr": "Rayon",
          "de": "Strahl",
          "es": "Rayo láser"
        },
        "damage": "magic",
        "hitDamage": [
          11, 11, 11, 11, 11, 11, 11, 11, 12
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "dualable": false,
        "framesList": [
          60, 8, 8, 8, 8, 8, 8, 8, 8
        ],
        "offset": 14,
        "base": 180
      },
      {
        id: 225580,
        "names": {
          "en": "Star Flare",
          "tw": "星耀",
          "kr": "스타 플레어",
          "fr": "Brasier stellaire",
          "de": "Sternenfeuer",
          "es": "Fulgor estelar"
        },
        "damage": "magic",
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "dualable": false,
        "framesList": [
          140, 30, 30, 30, 30, 30, 30
        ],
        "offset": 14,
        "base": 660
      },
      {
        "id": 911906,
        "names": {
          "en": "Fix Cloud",
          "tw": "修復之雲",
          "kr": "픽스 클라우드",
          "fr": "Brume temporelle",
          "de": "Gestockte Wolke",
          "es": "Bruma aturdidora"
        },
        "damage": "magic",
        "base": 400,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          110
        ]
      },
      {
        "id": 911907,
        "names": {
          "en": "Light Cross",
          "tw": "交叉光芒",
          "kr": "빛의 십자가",
          "fr": "Croix de lumière",
          "de": "Lichtkreuz",
          "es": "Cruz luminosa"
        },
        "damage": "magic",
        "base": 1040,
        "hitDamage": [
          7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 9
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7, 14, 7, 5, 7, 7, 7, 7
        ]
      }
    ],
    multiCasts: [
      {
        count: 2,
        abilities: [
          225570,
          225580,
          911906
        ]
      }
    ]
  },
  {
    id: 144,
    "names": {
      "en": "Veritas of the Waters",
      "tw": "水華之維利亞斯",
      "kr": "물꽃의 베리어스",
      "fr": "Veritas des Mers",
      "de": "Veritas der Meere",
      "es": "Veritas el marino"
    },
    "abilities": [
      {
        id: 100007906,
        "names": {
          "en": "Aquatic Retribution",
          "tw": "華麗水罰",
          "kr": "화려한 물고문",
          "fr": "Châtiment aquatique",
          "de": "Aquatische Vergeltung",
          "es": "Retribución marina"
        },
        "damage": "magic",
        "hitDamage": [
          20,
          20,
          60
        ],
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          76,
          11,
          8
        ],
        "base": 570
      },
      {
        id: 506450,
        "names": {
          "en": "Psycho Skewer + 2",
          "tw": "瘋狂穿刺 + 2",
          "kr": "사이코스큐어 + 2",
          "fr": "Empalement psychotique + 2",
          "de": "Psycho-Spieß + 2",
          "es": "Pincho psicopático + 2"
        },
        "damage": "magic",
        "castTime": 40,
        "dualable": false,
        "framesList": [
          190
        ],
        "offset": 14,
        "base": 1000
      },
      {
        "id": 506510,
        "names": {
          "en": "Swift Current + 2",
          "tw": "急流 + 2",
          "kr": "급류 + 2",
          "fr": "Courant rapide + 2",
          "de": "Flinke Strömung + 2",
          "es": "Corriente potente + 2"
        },
        "damage": "magic",
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          100, 15, 15, 15, 15
        ],
        "offset": 14,
        "base": 500,
        "ignore": 25
      },
      {
        "id": 506520,
        "names": {
          "en": "Aqua Prison + 2",
          "tw": "水業牢籠 + 2",
          "kr": "물의 감옥 + 2",
          "fr": "Prison aquatique + 2",
          "de": "Aquagefängnis + 2",
          "es": "Prisión acuática + 2"
        },
        "damage": "magic",
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          42, 15, 15, 15, 15
        ],
        "offset": 14,
        "base": 250,
        "ignore": 25
      }
    ],
    "multipleBlack": 2,
    "multipleWhite": 2,
    "multipleGreen": 2
  },
  {
    id: 145,
    "names": {
      "en": "Werei",
      "tw": "韋萊",
      "kr": "웨라이"
    },
    "abilities": [
      {
        id: 705000,
        "names": {
          "en": "Stone Fall + 2",
          "tw": "墜石 + 2",
          "kr": "낙석 + 2",
          "fr": "Chute de pierre + 2",
          "de": "Steinschlag + 2",
          "es": "Avalancha de rocas + 2"
        },
        "elements": [
          "earth"
        ],
        "framesList": [
          140
        ],
        "offset": 8,
        "base": 400,
        "debuffs": [
          {
            "type": "earth",
            "value": 65
          }
        ]
      }
    ]
  },
  {
    id: 146,
    "names": {
      "en": "Zell",
      "tw": "賽爾",
      "kr": "젤",
      "de": "Xell"
    },
    "abilities": [
      {
        id: 507213,
        "names": {
          "en": "Punch Rush",
          "tw": "衝鋒拳",
          "kr": "러쉬 펀치",
          "fr": "Poing suprême",
          "de": "Sturmfaust",
          "es": "Lluvia de puños"
        },
        "hitDamage": [
          20,
          20,
          20,
          40
        ],
        "castTime": 22,
        "framesList": [
          24,
          5,
          5,
          15
        ],
        "offset": 14,
        "base": 300
      },
      {
        id: 507217,
        "names": {
          "en": "Mach Kick",
          "tw": "馬赫踢",
          "kr": "마하 킥",
          "fr": "Forcing",
          "de": "Sonic-Kick",
          "es": "Patada lateral"
        },
        "framesList": [
          2
        ],
        "offset": 8,
        "base": 200
      },
      {
        id: 507222,
        "names": {
          "en": "Dolphin Blow",
          "tw": "海豚猛攻",
          "kr": "돌핀 블로우",
          "fr": "Delphinium",
          "de": "Delphin-Schlag",
          "es": "Ataque del delfín"
        },
        "hitDamage": [
          30,
          70
        ],
        "castTime": 22,
        "elements": [
          "water"
        ],
        "framesList": [
          24,
          25
        ],
        "offset": 14,
        "base": 400
      },
      {
        id: 507223,
        "names": {
          "en": "Different Beat",
          "tw": "迥異打擊",
          "kr": "디퍼런트 비트",
          "fr": "Trapèze",
          "es": "Novamás"
        },
        "hitDamage": [
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          37
        ],
        "framesList": [
          2,
          10,
          10,
          10,
          10,
          10,
          10,
          10,
          10,
          88
        ],
        "offset": 8,
        "base": 1400
      },
      {
        id: 507210,
        "names": {
          "en": "Booya",
          "tw": "頭槌激震",
          "kr": "헤드 쇼크",
          "fr": "Feinte",
          "de": "Kopfstoß",
          "es": "Rodillazo"
        },
        "castTime": 47,
        "framesList": [
          49
        ],
        "offset": 14,
        "base": 300
      },
      {
        id: 507215,
        "names": {
          "en": "Heel Drop",
          "tw": "落踝",
          "kr": "발뒤꿈치 내려찍기",
          "fr": "Achille",
          "de": "Ferskick",
          "es": "Golpe de talón"
        },
        "framesList": [
          2
        ],
        "offset": 8,
        "base": 200
      },
      {
        id: 507219,
        "names": {
          "en": "Burning Rave",
          "tw": "燃燒咆哮",
          "kr": "버닝 레이브",
          "fr": "Fahrenheit",
          "de": "Burning-Rave",
          "es": "Furia ardiente"
        },
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "framesList": [
          100
        ],
        "offset": 14,
        "base": 600
      },
      {
        id: 507216,
        "names": {
          "en": "Heel Drop",
          "tw": "落踝",
          "kr": "발뒤꿈치 내려찍기",
          "fr": "Achille",
          "de": "Ferskick",
          "es": "Golpe de talón"
        },
        "framesList": [
          2
        ],
        "offset": 8,
        "base": 200
      },
      {
        id: 507220,
        "names": {
          "en": "Meteor Strike",
          "tw": "隕石撞擊",
          "kr": "메테오 스트라이크",
          "fr": "Frappe Météore",
          "de": "Meteor-Wurf",
          "es": "Titán"
        },
        "castTime": 10,
        "framesList": [
          12
        ],
        "offset": 14,
        "base": 400
      },
      {
        id: 507214,
        "names": {
          "en": "Mach Kick",
          "tw": "馬赫踢",
          "kr": "마하 킥",
          "fr": "Forcing",
          "de": "Sonic-Kick",
          "es": "Patada lateral"
        },
        "framesList": [
          2
        ],
        "offset": 8,
        "base": 200
      },
      {
        id: 507218,
        "names": {
          "en": "Dolphin Blow",
          "tw": "海豚猛攻",
          "kr": "돌핀 블로우",
          "fr": "Delphinium",
          "de": "Delphin-Schlag",
          "es": "Ataque del delfín"
        },
        "hitDamage": [
          30,
          70
        ],
        "castTime": 22,
        "elements": [
          "water"
        ],
        "framesList": [
          24,
          25
        ],
        "offset": 14,
        "base": 400
      },
      {
        id: 507221,
        "names": {
          "en": "Meteor Barret",
          "tw": "隕石子彈",
          "kr": "메테오 바렛",
          "fr": "Stratosphère",
          "de": "Meteor-Bullet",
          "es": "Bala humana"
        },
        "framesList": [
          170
        ],
        "offset": 8,
        "base": 800
      },
      {
        id: 208000406,
        "names": {
          "en": "My Final Heaven",
          "tw": "自創終極天堂",
          "kr": "나의 파이널 헤븐",
          "fr": "Mon Ciel ultime",
          "de": "Xells Final-Heaven",
          "es": "Mi juicio final"
        },
        "dualable": false,
        "framesList": [
          483
        ],
        "offset": 8,
        "base": 1260
      }
    ]
  },
  {
    id: 147,
    "names": {
      "en": "Rinoa",
      "tw": "莉諾雅",
      "kr": "리노아",
      "fr": "Linoa"
    },
    "abilities": [
      {
        id: 20390,
        "names": {
          "en": "Tornado",
          "tw": "龍捲風",
          "kr": "토네이도",
          "fr": "Tornade"
        },
        "damage": "magic",
        "hitDamage": [
          8,
          8,
          8,
          8,
          8,
          8,
          8,
          8,
          8,
          8,
          8,
          12
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "framesList": [
          80,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12
        ],
        "offset": 14,
        "base": 250,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ]
      },
      {
        id: 226644,
        "names": {
          "en": "Angelo Tackle",
          "tw": "安傑洛擒敵",
          "kr": "안젤로 태클",
          "fr": "Angel Boxer",
          "de": "Angel-Tackle",
          "es": "Placaje de Ángelo"
        },
        "damage": "magic",
        "dualable": false,
        "framesList": [
          7
        ],
        "offset": 8,
        "base": 2850
      },
      {
        id: 20560,
        "names": {
          "en": "Apocalypse",
          "tw": "末世",
          "kr": "아포칼립스",
          "de": "Apokalypse",
          "es": "Apocalipsis"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "dualable": false,
        "framesList": [
          540
        ],
        "offset": 14,
        "base": 1000
      },
      {
        id: 208000207,
        "names": {
          "en": "Wishing Star",
          "tw": "願望之星",
          "kr": "위싱 스타",
          "fr": "Phantasme",
          "de": "Sternschnuppe",
          "es": "Estrella fugaz"
        },
        "damage": "hybrid",
        "hitDamage": [
          10,
          10,
          10,
          10,
          10,
          10,
          10,
          30
        ],
        "dualable": false,
        "framesList": [
          135,
          44,
          24,
          15,
          15,
          14,
          11,
          62
        ],
        "offset": 8,
        "base": 2290
      }
    ],
    multipleBlack : 3,
    multipleWhite : 3,
    multipleGreen : 3
  },
  {
    id: 148,
    "names": {
      "en": "Squall",
      "tw": "斯考爾",
      "kr": "스퀄"
    },
    "abilities": [
      {
        id: 226624,
        "names": {
          "en": "Flame Barret",
          "tw": "烈焰子彈",
          "kr": "플레임 바렛",
          "fr": "Barillet flammes",
          "de": "Flammenbarrett",
          "es": "Broche de fuego"
        },
        "hitDamage": [
          10, 10, 10, 10, 60
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "framesList": [
          42, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 225,
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          }
        ]
      },
      {
        id: 226626,
        "names": {
          "en": "Wind Barret",
          "tw": "疾風子彈",
          "kr": "윈드 바렛",
          "fr": "Barillet vent",
          "de": "Windbarrett",
          "es": "Broche de viento"
        },
        "hitDamage": [
          10, 10, 10, 10, 60
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "framesList": [
          42, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 225,
        "debuffs": [
          {
            "type": "wind",
            "value": 60
          }
        ]
      },
      {
        id: 226625,
        "names": {
          "en": "Thunder Barret",
          "tw": "迅雷子彈",
          "kr": "선더 바렛",
          "fr": "Barillet tonnerre",
          "de": "Donnerbarrett",
          "es": "Broche de rayo"
        },
        "hitDamage": [
          10, 10, 10, 10, 60
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "framesList": [
          42, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 225,
        "debuffs": [
          {
            "type": "lightning",
            "value": 60
          }
        ]
      },
      {
        id: 226627,
        "names": {
          "en": "Light Barret",
          "tw": "閃光子彈",
          "kr": "라이트 바렛",
          "fr": "Barillet lumière",
          "de": "Lichtbarrett",
          "es": "Broche de luz"
        },
        "hitDamage": [
          10, 10, 10, 10, 60
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "framesList": [
          42, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 225,
        "debuffs": [
          {
            "type": "light",
            "value": 60
          }
        ]
      },
      {
        id: 226622,
        "names": {
          "en": "Blasting Zone",
          "tw": "燃燒領域",
          "kr": "블래스팅 존",
          "fr": "Déflagration",
          "de": "Blast-Zone",
          "es": "Guillotina cósmica"
        },
        "framesList": [
          40
        ],
        "offset": 8,
        "base": 200,
        "ignore": 50
      },
      {
        id: 911245,
        "names": {
          "en": "Keen Edge",
          "tw": "利刃",
          "kr": "킨 엣지",
          "fr": "Tranchant acéré",
          "de": "Kühne Schneide",
          "es": "Filo acerado"
        },
        "hitDamage": [
          50,
          50
        ],
        "framesList": [
          2,
          10
        ],
        "offset": 86,
        "base": 300,
        "ignore": 50
      },
      {
        id: 208000107,
        "names": {
          "en": "Lion Heart",
          "tw": "終結之心",
          "kr": "엔드 오브 하트",
          "fr": "Cœur de lion",
          "de": "Herzensbrecher",
          "es": "Súmmum"
        },
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 50
        ],
        "dualable": false,
        "framesList": [
          98, 20, 28, 10, 47, 22, 16, 14, 8, 10, 12, 8, 12, 16, 12, 125, 122
        ],
        "offset": 8,
        "base": 1050,
        "ignore": 50
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          226622,
          911245,
          226624,
          226625,
          226626,
          226627
        ]
      }
    ]
  },
  {
    id: 149,
    "names": {
      "en": "Delita",
      "tw": "迪利塔",
      "kr": "디리타"
    },
    "abilities": [
      {
        id: 226693,
        "names": {
          "en": "Northern Sky Apprentice",
          "tw": "見習北天劍",
          "kr": "견습 북천검",
          "fr": "Apprenti du Ciel Septentrional",
          "de": "Lehrling des Nördlichen Himmelstils",
          "es": "Aprendiz del cielo norteño"
        },
        "hitDamage": [
          16, 16, 16, 16, 16, 20
        ],
        "castTime": 40,
        "framesList": [
          62, 5, 10, 10, 10, 10
        ],
        "offset": 36,
        "base": 600
      },
      {
        id: 507260,
        "names": {
          "en": "Karma Blade",
          "tw": "因果劍",
          "kr": "인과의 검",
          "fr": "Lame-karma",
          "de": "Schicksalsschwert",
          "es": "Hoja del karma"
        },
        "framesList": [
          82
        ],
        "offset": 8,
        "base": 1100,
        "debuffs": [
          {
            "type": "dark",
            "value": 120
          }
        ]
      },
      {
        id: 253000207,
        "names": {
          "en": "Hallowed Bolt",
          "tw": "無雙閃電刺",
          "kr": "무쌍번개 찌르기",
          "fr": "Éclair béni",
          "de": "Heiliger Blitz",
          "es": "Descarga sagrada"
        },
        "hitDamage": [
          10, 10, 10, 20, 20, 30
        ],
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "framesList": [
          30, 4, 35, 41, 4, 4
        ],
        "offset": 8,
        "base": 1240
      }
    ]
  },
  {
    id: 150,
    "names": {
      "en": "Ramza",
      "tw": "拉姆薩",
      "kr": "람자"
    },
    "abilities": [
      {
        id: 226693,
        "names": {
          "en": "Northern Sky Apprentice",
          "tw": "見習北天劍",
          "kr": "견습 북천검",
          "fr": "Apprenti du Ciel Septentrional",
          "de": "Lehrling des Nördlichen Himmelstils",
          "es": "Aprendiz del cielo norteño"
        },
        "hitDamage": [
          16, 16, 16, 16, 16, 20
        ],
        "castTime": 40,
        "framesList": [
          62, 5, 10, 10, 10, 10
        ],
        "offset": 36,
        "base": 600
      }
    ]
  },
  {
    id: 151,
    "names": {
      "en": "Nalu",
      "tw": "娜露",
      "kr": "나루"
    },
    "abilities": [
      {
        "id": 226912,
        "names": {
          "en": "Lightning Spear Jab",
          "tw": "雷槍一迅",
          "kr": "뇌창일신",
          "fr": "Coup de lance de foudre",
          "de": "Blitzspeerstich",
          "es": "Lanzada de rayo"
        },
        "elements": [
          "lightning"
        ],
        "framesList": [
          10
        ],
        "offset": 8,
        "base": 400
      },
      {
        "id": 226913,
        "names": {
          "en": "Thunder Spear",
          "tw": "雷鳴槍",
          "kr": "뇌명창",
          "fr": "Lance-tonnerre",
          "de": "Donnerspeer",
          "es": "Lanza de rayo"
        },
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 20,
        "framesList": [
          22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20
        ],
        "offset": 14,
        "base": 250,
        "ignore": 50,
        "debuffs": [
          {
            "type": "lightning",
            "value": 60
          }
        ]
      },
      {
        "id": 507490,
        "names": {
          "en": "Thunder Fang",
          "tw": "槍牙襲雷",
          "kr": "창아습뢰",
          "fr": "Croc foudroyant",
          "de": "Donnerzahn",
          "es": "Colmillo de rayo"
        },
        "hitDamage": [
          12, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8
        ],
        "elements": [
          "lightning"
        ],
        "framesList": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 8,
        "base": 1100
      },
      {
        "id": 100015407,
        "names": {
          "en": "Beastly Symbiosis",
          "tw": "獸往無盡",
          "kr": "수왕무진",
          "fr": "Symbiose bestiale",
          "de": "Bestiae ad Infinitum",
          "es": "Simbiosis bestial"
        },
        "hitDamage": [
          4, 4, 4, 5, 4, 4, 5, 4, 4, 4, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 5
        ],
        "dualable": false,
        "framesList": [
          56, 6, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "offset": 8,
        "base": 1200,
        "debuffs": [
          {
            "type": "lightning",
            "value": 100
          }
        ]
      }
    ]
  },
  {
    "id": 152,
    "names": {
      "en": "Pecciotta",
      "tw": "皮曹塔",
      "kr": "페초타"
    },
    "abilities": [
      {
        "id": 100015506,
        "names": {
          "en": "Black Storm",
          "tw": "漫天風沙",
          "kr": "검은 폭풍",
          "fr": "Tempête noire",
          "de": "Sandsturm",
          "es": "Tormenta negra"
        },
        "dualable": false,
        "framesList": [
          0
        ],
        "offset": 8,
        "base": 700
      },
      {
        "id": 507500,
        "names": {
          "en": "Glorious Wind",
          "tw": "風靈暴怒",
          "kr": "영광의 바람",
          "fr": "Vent glorieux",
          "de": "Ruhmreicher Wind",
          "es": "Viento de gloria"
        },
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10
        ],
        "castTime": 40,
        "framesList": [
          60, 7, 7, 8, 7, 7, 8, 7, 7, 8, 7, 7, 8, 7, 7, 8
        ],
        "offset": 14,
        "base": 500,
        "debuffs": [
          {
            "type": "wind",
            "value": 60
          }
        ]
      }
    ]
  },
  {
    "id": 153,
    "names": {
      "en": "Shinju",
      "tw": "真珠",
      "kr": "신쥬"
    },
    "abilities": [
      {
        "id": 507515,
        "names": {
          "en": "Violent Tail",
          "tw": "暴力馬尾",
          "kr": "난폭한 꼬리",
          "fr": "Coup de queue violent",
          "de": "Gewaltschweif",
          "es": "Cola violenta"
        },
        "hitDamage": [
          14, 14, 14, 14, 14, 15, 15
        ],
        "framesList": [
          2, 8, 8, 8, 8, 8, 8
        ],
        "offset": 36,
        "base": 300,
        "ignore": 50
      },
      {
        "id": 226956,
        "names": {
          "en": "Shut up already!",
          "tw": "你好煩啊！",
          "kr": "짜증 난다고!",
          "fr": "Tais-toi donc !",
          "de": "Du nervst!",
          "es": "¡¿Pero por qué no te callas?!"
        },
        "hitDamage": [
          25, 25, 25, 25
        ],
        "framesList": [
          22, 9, 9, 10
        ],
        "offset": 36,
        "base": 200
      },
      {
        "id": 507510,
        "names": {
          "en": "Now we're talkin'!",
          "tw": "來感覺了！！",
          "kr": "감이 오는데!!",
          "fr": "Exactement c'qui m'fallait !",
          "de": "Jetzt kommen wir der Sache näher!",
          "es": "¡Ahora sí!"
        },
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "framesList": [
          25, 7, 7, 7, 7
        ],
        "offset": 36,
        "base": 400
      },
      {
        "id": 507511,
        "names": {
          "en": "Hyped Up!",
          "tw": "情緒MAX！！！",
          "kr": "텐션 MAX!!!",
          "fr": "À 100 % !",
          "de": "Bombenstimmung!",
          "es": "¡A tope!"
        },
        "hitDamage": [
          16, 16, 16, 16, 16, 20
        ],
        "castTime": 40,
        "framesList": [
          55, 10, 10, 10, 10, 10
        ],
        "offset": 14,
        "base": 500,
        "debuffs": [
          {
            "type": "earth",
            "value": 60
          }
        ]
      },
      {
        "id": 100015606,
        "names": {
          "en": "Soil Rush",
          "tw": "靈魂突進",
          "kr": "토지 돌진",
          "fr": "Ruée terrestre",
          "de": "Erdsturz",
          "es": "Celeridad terrenal"
        },
        "hitDamage": [
          4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 16
        ],
        "dualable": false,
        "framesList": [
          38, 10, 10, 10, 6, 6, 6, 6, 6, 6, 6, 6, 5, 4, 4, 4, 4, 4, 4, 4, 4, 24
        ],
        "offset": 8,
        "base": 1080,
        "debuffs": [
          {
            "type": "earth",
            "value": 84
          }
        ]
      }
    ]
  },
  {
    id: 154,
    "names": {
      "en": "Václav Koller",
      "tw": "瓦茨拉夫·科勒",
      "kr": "바클라프 콜러"
    },
    "abilities": [
      {
        "id": 911119,
        "names": {
          "en": "Toy Gun Experimentation",
          "tw": "玩具槍實驗",
          "kr": "장난감 총 실험",
          "fr": "Expérimentation au pistolet en plastique",
          "de": "Spielzeugpistolenexperimente",
          "es": "Experimentación con armas de juguete"
        },
        "hitDamage": [
          30, 30, 40
        ],
        "castTime": 40,
        "framesList": [
          80, 10, 10
        ],
        "offset": 14,
        "base": 180
      },
      {
        "id": 911121,
        "names": {
          "en": "Mass Remote Hacking",
          "tw": "大規模遠端駭入",
          "kr": "매스 리부트 해킹",
          "fr": "Piratage à distance massif",
          "de": "Massenhaftes Remote Hacken",
          "es": "Hackeo remoto en masa"
        },
        "hitDamage": [
          30, 30, 40
        ],
        "castTime": 40,
        "framesList": [
          80, 10, 10
        ],
        "offset": 14,
        "base": 200
      },
      {
        "id": 911122,
        "names": {
          "en": "Crippling Experimentation",
          "tw": "傷殘實驗",
          "kr": "실험 저해",
          "fr": "Expérimentation paralysante",
          "de": "Schädigende Experimente",
          "es": "Experimentación catastrófica"
        },
        "hitDamage": [
          16, 16, 17, 17
        ],
        "castTime": 40,
        "framesList": [
          40, 8, 8, 8
        ],
        "offset": 14,
        "base": 150
      },
      {
        "id": 911127,
        "names": {
          "en": "Augmentation Tuning",
          "tw": "強化調整",
          "kr": "증강 튜닝",
          "fr": "Augmentation personnalisée",
          "de": "Augmentierungsanpassung",
          "es": "Ajustes de aumento"
        },
        "hitDamage": [
          16, 16, 17, 17
        ],
        "castTime": 40,
        "framesList": [
          40, 8, 8, 8
        ],
        "offset": 14,
        "base": 200
      },
      {
        "id": 911132,
        "names": {
          "en": "Full Augmentation Potential",
          "tw": "最大強化潛能",
          "kr": "최대 증강 잠재력",
          "fr": "Augmentation potentiel maximum",
          "de": "Volles Augmentierungspotenzial",
          "es": "Potencial máximo de aumentos"
        },
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "castTime": 40,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14,
        "base": 250,
        "ignore": 25
      },
      {
        "id": 401005106,
        "names": {
          "en": "Augmentation Revolution",
          "tw": "強化革命",
          "kr": "증강 혁명",
          "fr": "Révolution de l'augmentation",
          "de": "Augmentierungsrevolution",
          "es": "Revolución de los aumentos"
        },
        "hitDamage": [
          25, 25, 25, 25
        ],
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "framesList": [
          304, 2, 2, 2
        ],
        "offset": 8,
        "base": 420
      }
    ]
  },
  {
    id: 155,
    "names": {
      "en": "Viktor Marchenko",
      "tw": "維克托·馬爾琴科",
      "kr": "빅토르 마르첸코"
    },
    "abilities": [
      {
        "id": 911217,
        "names": {
          "en": "P.E.P.S. Knockback",
          "tw": "P.E.P.S.衝擊",
          "kr": "P.E.P.S. 넉백",
          "fr": "PRIME - Répulsion",
          "de": "P.E.P.S. Rückstoß",
          "es": "Bloqueo P.E.P.S."
        },
        "framesList": [
          40
        ],
        "offset": 8,
        "base": 300
      },
      {
        "id": 911226,
        "names": {
          "en": "Pro-Augmentation",
          "tw": "擁護強化人",
          "kr": "증강 인류 지지",
          "fr": "Pro-augmentation",
          "es": "Proaumento"
        },
        "castTime": 40,
        "framesList": [
          130
        ],
        "offset": 14,
        "base": 400
      },
      {
        "id": 911227,
        "names": {
          "en": "Pro-Human",
          "tw": "擁護人類",
          "kr": "일반 인류 지지",
          "fr": "Pro-humain",
          "de": "Pro-Mensch",
          "es": "Prohumano"
        },
        "castTime": 40,
        "framesList": [
          130
        ],
        "offset": 14,
        "base": 400
      },
      {
        "id": 911229,
        "names": {
          "en": "Takedown",
          "tw": "擊倒",
          "kr": "테이크다운",
          "fr": "Renverser",
          "es": "Derribamiento"
        },
        "framesList": [
          40
        ],
        "offset": 8,
        "base": 750
      },
      {
        "id": 911231,
        "names": {
          "en": "Security System",
          "tw": "保全系統",
          "kr": "보안 시스템",
          "fr": "Système de sécurité",
          "de": "Sicherheitssystem",
          "es": "Sistema de seguridad"
        },
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "offset": 14,
        "base": 650
      },
      {
        "id": 911242,
        "names": {
          "en": "Icarus Dash",
          "tw": "伊卡洛斯衝刺",
          "kr": "이카루스 대쉬",
          "fr": "Accélération Icarus",
          "de": "Ikarus-Sprint",
          "es": "Esprint de Ícaro"
        },
        "castTime": 1,
        "framesList": [
          40
        ],
        "offset": 14,
        "base": 1850,
        "debuffs": [
          {
            "type": "lightning",
            "value": 75
          }
        ]
      },
      {
        "id": 911243,
        "names": {
          "en": "Plasma Bolt",
          "tw": "等離子閃電",
          "kr": "플라즈마 볼트",
          "fr": "Éclair à Plasma",
          "de": "Plasmablitz",
          "es": "Rayo de plasma"
        },
        "framesList": [
          40
        ],
        "offset": 8,
        "base": 1850,
        "debuffs": [
          {
            "type": "fire",
            "value": 75
          }
        ]
      },
      {
        "id": 401005007,
        "names": {
          "en": "Hyperion Plasma Blast",
          "tw": "太陽神等離子爆破",
          "kr": "하이페리온 플라즈마 블래스트",
          "fr": "Explosion à plasma Hyperion",
          "de": "Hyperion-Plasmablitz",
          "es": "Explosión de plasma Hiperión"
        },
        "dualable": false,
        "framesList": [
          260
        ],
        "offset": 8,
        "base": 1500
      }
    ]
  },
  {
    id: 156,
    "names": {
      "en": "Adam Jensen",
      "tw": "亞當·傑森",
      "kr": "아담 젠슨"
    },
    "abilities": [
      {
        "id": 911193,
        "names": {
          "en": "Wall Breaker",
          "tw": "破牆者",
          "kr": "장벽 브레이커",
          "fr": "Briseur de mur",
          "de": "Wand durchschlagen",
          "es": "Rompemuros"
        },
        "framesList": [
          40
        ],
        "offset": 8,
        "base": 100
      },
      {
        "id": 911196,
        "names": {
          "en": "P.E.P.S. Knockback",
          "tw": "P.E.P.S.衝擊",
          "kr": "P.E.P.S. 넉백",
          "fr": "PRIME - Répulsion",
          "de": "P.E.P.S. Rückstoß",
          "es": "Bloqueo P.E.P.S."
        },
        "castTime": 40,
        "framesList": [
          100
        ],
        "offset": 14,
        "base": 300
      },
      {
        "id": 911199,
        "names": {
          "en": "TESLA",
          "kr": "테슬라"
        },
        "hitDamage": [
          15, 15, 15, 15, 20, 20
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "framesList": [
          42, 5, 5, 5, 5, 5
        ],
        "offset": 14,
        "base": 350,
        "debuffs": [
          {
            "type": "lightning",
            "value": 50
          }
        ]
      },
      {
        "id": 911200,
        "names": {
          "en": "Wideband Frequency-Jammer",
          "tw": "頻寬干擾器",
          "kr": "광대역 주파수 방해 전파",
          "fr": "Brouilleur à bande large",
          "de": "Breitbandfrequenz-Störsender",
          "es": "Bloqueador de frecuencias de banda ancha"
        },
        "framesList": [
          31
        ],
        "offset": 8,
        "base": 100
      },
      {
        "id": 911204,
        "names": {
          "en": "Quicksilver Reflex Booster",
          "tw": "水銀反射加速器",
          "kr": "퀵실버 리플렉스 부스터",
          "fr": "Booster de réflexes Quicksilver",
          "de": "Quecksilber-Reflexbooster",
          "es": "Potenciador de reflejos"
        },
        "castTime": 3,
        "framesList": [
          60
        ],
        "offset": 14,
        "base": 300
      },
      {
        "id": 911206,
        "names": {
          "en": "Nanoblade",
          "tw": "奈米刀片",
          "kr": "나노 블레이드",
          "fr": "Nanolame",
          "de": "Nanoklinge",
          "es": "Nanocuchilla"
        },
        "castTime": 10,
        "framesList": [
          2
        ],
        "offset": 14,
        "base": 1400
      },
      {
        "id": 911239,
        "names": {
          "en": "Explosive Heat Blade",
          "tw": "爆破熱能刀片",
          "kr": "폭발열 블레이드",
          "fr": "Nanolame explosive",
          "de": "Explosive Hitzeklinge",
          "es": "Cuchilla calorífica explosiva"
        },
        "elements": [
          "fire"
        ],
        "framesList": [
          10
        ],
        "offset": 8,
        "base": 1200,
        "debuffs": [
          {
            "type": "fire",
            "value": 100
          }
        ]
      },
      {
        "id": 911240,
        "names": {
          "en": "Typhoon Explosive System",
          "tw": "颱風爆破系統",
          "kr": "타이푼 폭발 시스템",
          "fr": "Système explosif Typhoon",
          "de": "Taifun-Explosivsystem",
          "es": "Sistema de explosiones Typhoon"
        },
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14,
        "base": 1200,
        "debuffs": [
          {
            "type": "fire",
            "value": 75
          }
        ]
      },
      {
        "id": 911241,
        "names": {
          "en": "Remote Hacking",
          "tw": "遠端駭入",
          "kr": "원격 해킹",
          "fr": "Piratage à distance",
          "de": "Remote Hacken",
          "es": "Hackeo remoto"
        },
        "framesList": [
          31
        ],
        "offset": 8,
        "base": 1700
      },
      {
        "id": 401004907,
        "names": {
          "en": "Icarus Dash - Charged Dash",
          "tw": "伊卡洛斯衝刺 - 蓄力衝刺",
          "kr": "이카루스 대쉬 - 전력 질주",
          "fr": "Accélération Icarus - Accélération chargée",
          "de": "Ikarus-Sprint: Beschleunigen",
          "es": "Esprint de Ícaro - Carga"
        },
        "dualable": false,
        "framesList": [
          126
        ],
        "offset": 8,
        "base": 1040,
        "ignore": 50,
        "debuffs": [
          {
            "type": "lightning",
            "value": 100
          }
        ]
      }
    ]
  },
  {
    id: 157,
    "names": {
      "en": "Alexander",
      "tw": "亞歷山大",
      "kr": "알렉산더",
      "fr": "Alexandre",
      "es": "Alejandro"
    },
    "abilities": [
      {
        id: 11301,
        "names": {
          "en": "Divine Judgment (1)",
          "tw": "神聖審判 (1)",
          "kr": "성스러운 심판 (1)",
          "fr": "Jugement divin (1)",
          "de": "Jüngstes Gericht (1)",
          "es": "Veredicto final (1)"
        },
        "elements": [
          "light"
        ],
        "dualable": false,
        "damage": "magic",
        "base": 5000,
        "framesList": [
          100
        ],
        "offset": 8
      },
      {
        id: 11302,
        "names": {
          "en": "Divine Judgment (2)",
          "tw": "神聖審判 (2)",
          "kr": "성스러운 심판 (2)",
          "fr": "Jugement divin (2)",
          "de": "Jüngstes Gericht (2)",
          "es": "Veredicto final (2)"
        },
        "elements": [
          "light"
        ],
        "dualable": false,
        "damage": "magic",
        "base": 14000,
        "framesList": [
          110
        ],
        "offset": 8
      }
    ]
  },
  {
    id: 158,
    "names": {
      "en": "Shadow Lord",
      "tw": "黑暗之王",
      "kr": "암흑의 왕",
      "fr": "Seigneur des ombres",
      "de": "Schattenlord",
      "es": "Señor oscuro"
    },
    "abilities": [
      {
        id: 507701,
        "names": {
          "en": "Dynamic Assault",
          "tw": "動態突擊",
          "kr": "역동적 돌격",
          "fr": "Assaut dynamique",
          "de": "Dynamischer Angriff",
          "es": "Asalto dinámico"
        },
        "castTime": 40,
        "framesList": [
          50
        ],
        "offset": 14,
        "base": 1125
      },
      {
        id: 507703,
        "names": {
          "en": "Violent Rupture",
          "tw": "暴力狂歡",
          "kr": "폭력적 파괴",
          "fr": "Rupture violente",
          "de": "Gewaltsamer Bruch",
          "es": "Ruptura violenta"
        },
        "castTime": 20,
        "framesList": [
          30
        ],
        "offset": 14,
        "base": 450,
        "ignore": 50
      },
      {
        id: 507705,
        "names": {
          "en": "Oblivion Smash",
          "tw": "忘卻粉碎",
          "kr": "망각의 강타",
          "fr": "Frappe de l'oubli",
          "de": "Schlag der Vergessenheit",
          "es": "Golpe de olvido"
        },
        "castTime": 40,
        "framesList": [
          52
        ],
        "offset": 14,
        "base": 450
      },
      {
        id: 507707,
        "names": {
          "en": "Cross Smash",
          "tw": "交叉粉碎",
          "kr": "십자 강타",
          "fr": "Frappe croisée",
          "de": "Kreuzschlag",
          "es": "Golpe en cruz"
        },
        "hitDamage": [
          25,
          25,
          25,
          25
        ],
        "castTime": 24,
        "framesList": [
          26,
          5,
          5,
          5
        ],
        "offset": 14,
        "base": 750,
        "debuffs": [
          {
            "type": "dark",
            "value": 100
          }
        ]
      },
      {
        id: 507709,
        "names": {
          "en": "Dynamic Implosion",
          "tw": "動態聚爆",
          "kr": "역동적 폭축",
          "fr": "Implosion dynamique",
          "de": "Dynamische Implosion",
          "es": "Implosión dinámica"
        },
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "framesList": [
          92
        ],
        "offset": 14,
        "base": 1800
      },
      {
        id: 211000907,
        "names": {
          "en": "Tera Slash",
          "tw": "大地斬擊",
          "kr": "테라 슬래시",
          "fr": "Terratranche",
          "de": "Teraschlag",
          "es": "Teracorte"
        },
        "dualable": false,
        "framesList": [
          66
        ],
        "offset": 8,
        "base": 900
      }
    ]
  },
  {
    id: 159,
    "names": {
      "en": "Livid Shantotto",
      "tw": "狂暴香托托",
      "kr": "분노한 샨토토",
      "fr": "Shantotto furieuse",
      "de": "Tobende Shantotto",
      "es": "Shantotto enfurecida"
    },
    "abilities": [
      {
        id: 20570,
        "names": {
          "en": "Stone I",
          "tw": "落石I",
          "kr": "스톤I",
          "fr": "Pierre II",
          "de": "Terra I",
          "es": "Piedra I"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "earth"
        ],
        "dualable": false,
        "framesList": [
          120
        ],
        "offset": 14,
        "base": 800
      },
      {
        id: 20580,
        "names": {
          "en": "Water I",
          "tw": "流水I",
          "kr": "워터I",
          "fr": "Eau II",
          "de": "Aqua I",
          "es": "Aqua I"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          80
        ],
        "offset": 14,
        "base": 810
      },
      {
        id: 20590,
        "names": {
          "en": "Aero I",
          "tw": "勁風I",
          "kr": "에어로I",
          "fr": "Vent II"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "framesList": [
          100
        ],
        "offset": 14,
        "base": 820
      },
      {
        id: 20600,
        "names": {
          "en": "Fire I",
          "tw": "火焰I",
          "kr": "파이어I",
          "fr": "Feu II",
          "de": "Feura I",
          "es": "Piro I"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "fire"
        ],
        "dualable": false,
        "framesList": [
          80
        ],
        "offset": 14,
        "base": 830
      },
      {
        id: 20610,
        "names": {
          "en": "Blizzard I",
          "tw": "暴雪I",
          "kr": "블리자드I",
          "fr": "Glace II",
          "de": "Eis I",
          "es": "Hielo I"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          130
        ],
        "offset": 14,
        "base": 840
      },
      {
        id: 20620,
        "names": {
          "en": "Thunder I",
          "tw": "雷電I",
          "kr": "선더I",
          "fr": "Foudre I",
          "de": "Blitz I",
          "es": "Electro I"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "framesList": [
          70
        ],
        "offset": 14,
        "base": 850
      },
      {
        id: 20630,
        "names": {
          "en": "Stonega V",
          "tw": "大落石V",
          "kr": "스톤가V",
          "fr": "OmniPierre V",
          "de": "Terraga V",
          "es": "Piedra++ V"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "earth"
        ],
        "dualable": false,
        "framesList": [
          180
        ],
        "offset": 14,
        "base": 1000
      },
      {
        id: 20640,
        "names": {
          "en": "Waterga V",
          "tw": "大流水V",
          "kr": "워터가V",
          "fr": "OmniEau V",
          "de": "Aquaga V",
          "es": "Aqua++ V"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          110
        ],
        "offset": 14,
        "base": 1005
      },
      {
        id: 20650,
        "names": {
          "en": "Aeroga V",
          "tw": "大勁風V",
          "kr": "에어로가V",
          "fr": "OmniVent V",
          "es": "Aero++ V"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "framesList": [
          110
        ],
        "offset": 14,
        "base": 1010
      },
      {
        id: 20660,
        "names": {
          "en": "Firaga V",
          "tw": "大火焰V",
          "kr": "파이가V",
          "fr": "OmniFeu V",
          "de": "Feuga V",
          "es": "Piro++ V"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "fire"
        ],
        "dualable": false,
        "framesList": [
          150
        ],
        "offset": 14,
        "base": 1015
      },
      {
        id: 20670,
        "names": {
          "en": "Blizzaga V",
          "tw": "大暴雪V",
          "kr": "블리자가V",
          "fr": "OmniGlace V",
          "de": "Eisga V",
          "es": "Hielo++ V"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          150
        ],
        "offset": 14,
        "base": 1020
      },
      {
        id: 20680,
        "names": {
          "en": "Thundaga V",
          "tw": "大雷電V",
          "kr": "선더가V",
          "fr": "OmniFoudre V",
          "de": "Blitzga B",
          "es": "Electro++ V"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "framesList": [
          70
        ],
        "offset": 14,
        "base": 1025
      },
      {
        id: 227193,
        "names": {
          "en": "Doctor's Orders",
          "tw": "博士命令",
          "kr": "닥터의 명령",
          "fr": "Ordre du médecin",
          "de": "Ärztliche Anweisung",
          "es": "Órdenes del médico"
        },
        "damage": "magic",
        "hitDamage": [
          7,
          7,
          7,
          7,
          7,
          7,
          58
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "dualable": false,
        "framesList": [
          150,
          7,
          5,
          7,
          7,
          7,
          7
        ],
        "offset": 14,
        "base": 1120,
        "debuffs": [
          {
            "type": "earth",
            "value": 60
          },
          {
            "type": "dark",
            "value": 60
          }
        ]
      },
      {
        id: 227195,
        "names": {
          "en": "Lesson in Pain",
          "tw": "痛苦的教訓",
          "kr": "고통 속 교훈",
          "fr": "Leçon douloureuse",
          "de": "Schmerzhafte Lehrstunde",
          "es": "Lección dolorosa"
        },
        "damage": "magic",
        "hitDamage": [
          7,
          7,
          7,
          7,
          7,
          7,
          58
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          100,
          8,
          8,
          8,
          8,
          8,
          8
        ],
        "offset": 14,
        "base": 1100,
        "debuffs": [
          {
            "type": "ice",
            "value": 60
          },
          {
            "type": "water",
            "value": 60
          }
        ]
      },
      {
        id: 227200,
        "names": {
          "en": "Colossal Shantotto",
          "tw": "巨大香托托",
          "kr": "콜로설 샨토토",
          "fr": "Shantotto colossale",
          "de": "Kolossale Shantotto",
          "es": "Shantotto colosal"
        },
        "damage": "magic",
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "dualable": false,
        "framesList": [
          130
        ],
        "offset": 14,
        "base": 320
      },
      {
        id: 20690,
        "names": {
          "en": "Bio III",
          "tw": "毒化III",
          "kr": "바이오III",
          "fr": "Bactérie III"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "dark"
        ],
        "dualable": false,
        "framesList": [
          120
        ],
        "offset": 14,
        "base": 120
      },
      {
        id: 227194,
        "names": {
          "en": "Empirical Research",
          "tw": "實驗研究",
          "kr": "실증적 조사",
          "fr": "Recherches empiriques",
          "de": "Empirische Forschung",
          "es": "Investigación empírica"
        },
        "damage": "magic",
        "hitDamage": [
          4,
          4,
          4,
          4,
          4,
          4,
          4,
          4,
          4,
          4,
          4,
          56
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "framesList": [
          70,
          10,
          10,
          10,
          10,
          10,
          10,
          10,
          10,
          10,
          10,
          10
        ],
        "offset": 14,
        "base": 1080,
        "debuffs": [
          {
            "type": "lightning",
            "value": 60
          },
          {
            "type": "wind",
            "value": 60
          }
        ]
      },
      {
        id: 20730,
        "names": {
          "en": "Flood II",
          "tw": "洪水II",
          "kr": "플러드II",
          "fr": "Déluge II",
          "de": "Flut II",
          "es": "Inundación II"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          160
        ],
        "offset": 14,
        "base": 700,
        "debuffs": [
          {
            "type": "water",
            "value": 50
          }
        ]
      },
      {
        id: 227192,
        "names": {
          "en": "Final Exam",
          "tw": "最終測驗",
          "kr": "마지막 시험",
          "fr": "Examen final",
          "de": "Abschlußprüfung",
          "es": "Examen final"
        },
        "damage": "magic",
        "hitDamage": [
          7,
          7,
          7,
          7,
          7,
          7,
          58
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "dualable": false,
        "framesList": [
          70,
          7,
          5,
          7,
          7,
          7,
          7
        ],
        "offset": 14,
        "base": 1150,
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          },
          {
            "type": "light",
            "value": 60
          }
        ]
      },
      {
        id: 20700,
        "names": {
          "en": "Flare II",
          "tw": "核爆II",
          "kr": "플레어II",
          "fr": "Brasier II",
          "de": "Flamme II",
          "es": "Fulgor II"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "fire"
        ],
        "dualable": false,
        "framesList": [
          240
        ],
        "offset": 14,
        "base": 700,
        "debuffs": [
          {
            "type": "fire",
            "value": 50
          }
        ]
      },
      {
        id: 211000807,
        "names": {
          "en": "Play Rough",
          "tw": "爆發",
          "kr": "분노",
          "fr": "Turbulence",
          "de": "Ausraster",
          "es": "Juego duro"
        },
        "damage": "magic",
        "hitDamage": [
          10,
          10,
          10,
          10,
          10,
          10,
          40
        ],
        "dualable": false,
        "framesList": [
          42,
          38,
          70,
          50,
          50,
          68,
          132
        ],
        "offset": 8,
        "base": 1200,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 70
          },
          {
            "type": "ice",
            "value": 70
          },
          {
            "type": "lightning",
            "value": 70
          },
          {
            "type": "water",
            "value": 70
          },
          {
            "type": "wind",
            "value": 70
          },
          {
            "type": "earth",
            "value": 70
          }
        ]
      }
    ],
    "multipleWhite": 3,
    "multipleBlack": 3,
    "multipleGreen": 3
  },
  {
    "id": 160,
    "names": {
      "en": "Slime Knight",
      "tw": "史萊姆騎士",
      "kr": "슬라임 나이트",
      "fr": "Monte-gluant",
      "de": "Schleimritter",
      "es": "Jinete de limo"
    },
    "abilities": [
      {
        "id": 205720,
        "names": {
          "en": "Thunder Slash",
          "tw": "閃電斬",
          "kr": "번개 베기",
          "fr": "Lame d'éclair",
          "de": "Blitzhieb",
          "es": "Estocada de trueno"
        },
        "elements": [
          "lightning"
        ],
        "framesList": [
          40
        ],
        "offset": 8,
        "base": 160
      },
      {
        "id": 205930,
        "names": {
          "en": "Sizz",
          "tw": "基拉",
          "kr": "기라",
          "fr": "Crame",
          "de": "Knister",
          "es": "Miniincendio"
        },
        "damage": "magic",
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "framesList": [
          70
        ],
        "offset": 14,
        "base": 130
      },
      {
        "id": 227043,
        "names": {
          "en": "Frost Slash",
          "tw": "冰結斬",
          "kr": "빙결 베기",
          "fr": "Lame de gel",
          "de": "Frosthieb",
          "es": "Estocada de hielo"
        },
        "damage": "hybrid",
        "castTime": 29,
        "elements": [
          "ice"
        ],
        "framesList": [
          100
        ],
        "offset": 14,
        "base": 180
      },
      {
        "id": 205590,
        "names": {
          "en": "Sizzle",
          "tw": "貝基拉瑪",
          "kr": "베기라마",
          "fr": "Supercrame",
          "de": "Brutzel",
          "es": "Incendio"
        },
        "damage": "magic",
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "framesList": [
          80
        ],
        "offset": 14,
        "base": 140
      },
      {
        "id": 205690,
        "names": {
          "en": "Unbridled Blade",
          "tw": "全心全力斬",
          "kr": "전신전령 베기",
          "fr": "Entaille mortelle",
          "de": "Volldampfschlitzer",
          "es": "Estocada letal"
        },
        "framesList": [
          10
        ],
        "offset": 8,
        "base": 300
      },
      {
        "id": 227042,
        "names": {
          "en": "Gale Slash",
          "tw": "風迅斬",
          "kr": "풍신 베기",
          "fr": "Lame d'Éole",
          "de": "Sturmwindhieb",
          "es": "Estocada huracanada"
        },
        "damage": "hybrid",
        "castTime": 29,
        "elements": [
          "wind"
        ],
        "framesList": [
          140
        ],
        "offset": 14,
        "base": 380
      },
      {
        "id": 227041,
        "names": {
          "en": "Super Double-Edged Slash",
          "tw": "超捨生斬",
          "kr": "슈퍼 양날 베기",
          "fr": "Super double-lame",
          "de": "Zweischneider Superhieb",
          "es": "Superestocada doble"
        },
        "castTime": 29,
        "framesList": [
          50
        ],
        "offset": 14,
        "base": 600
      },
      {
        "id": 306001206,
        "names": {
          "en": "Hallowed Slash",
          "tw": "神聖之刃",
          "kr": "홀리 엣지",
          "fr": "Lame bénie",
          "de": "Seliger Hieb",
          "es": "Estocada encantada"
        },
        "damage": "hybrid",
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "framesList": [
          140
        ],
        "offset": 8,
        "base": 1100
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          227041,
          227042,
          227043
        ]
      }
    ]
  },
  {
    "id": 161,
    "names": {
      "en": "Überkilling Machine",
      "tw": "殺戮魔神",
      "kr": "킬러 마징가",
      "fr": "Mékanocinglé",
      "de": "Obertodmaschine",
      "es": "Máquina supermortal"
    },
    "abilities": [
      {
        "id": 205710,
        "names": {
          "en": "Metal Slash",
          "tw": "金屬斬",
          "kr": "메탈 베기",
          "fr": "Lame de métal",
          "de": "Metallhieb",
          "es": "Estocada metálica"
        },
        "dualable": false,
        "framesList": [
          10
        ],
        "offset": 8,
        "base": 2000
      },
      {
        "id": 205700,
        "names": {
          "en": "Cutting Edge",
          "tw": "渾身斬",
          "kr": "혼신의 베기",
          "fr": "Entaille puissante",
          "de": "Schnittiger Schlag",
          "es": "Tajada mortal"
        },
        "framesList": [
          0
        ],
        "offset": 8,
        "base": 180
      },
      {
        "id": 205720,
        "names": {
          "en": "Thunder Slash",
          "tw": "閃電斬",
          "kr": "번개 베기",
          "fr": "Lame d'éclair",
          "de": "Blitzhieb",
          "es": "Estocada de trueno"
        },
        "elements": [
          "lightning"
        ],
        "framesList": [
          40
        ],
        "offset": 8,
        "base": 160
      },
      {
        "id": 205730,
        "names": {
          "en": "Flame Slash",
          "tw": "火炎斬",
          "kr": "화염 베기",
          "fr": "Lame de feu",
          "de": "Flammenhieb",
          "es": "Estocada flamígera"
        },
        "elements": [
          "fire"
        ],
        "framesList": [
          55
        ],
        "offset": 8,
        "base": 160
      },
      {
        "id": 205740,
        "names": {
          "en": "Kacrackle Slash",
          "tw": "瑪夏德斬",
          "kr": "마햐드 베기",
          "fr": "Entaille mégaglace",
          "de": "Eiszeit (DQ)",
          "es": "Estocada superhelada"
        },
        "elements": [
          "ice"
        ],
        "framesList": [
          125
        ],
        "offset": 8,
        "base": 160
      },
      {
        "id": 507572,
        "names": {
          "en": "Executioner's Slash",
          "tw": "大魔神斬",
          "kr": "대마신 베기",
          "fr": "Taillade du bourreau",
          "de": "Scharfrichterhieb",
          "es": "Estocada ejecutora"
        },
        "hitDamage": [
          50,
          50
        ],
        "framesList": [
          31,
          31
        ],
        "offset": 8,
        "base": 525
      },
      {
        "id": 227051,
        "names": {
          "en": "Multislash",
          "tw": "暴雨斬",
          "kr": "장대비 베기",
          "fr": "Multi-lame",
          "de": "Multihieb",
          "es": "Multiestocada"
        },
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 260
      },
      {
        "id": 227055,
        "names": {
          "en": "Dragon Slash",
          "tw": "惡龍斬",
          "kr": "드래곤 베기",
          "fr": "Lame du dragon",
          "de": "Drachenhieb",
          "es": "Dragoestocada"
        },
        "castTime": 40,
        "framesList": [
          52
        ],
        "offset": 14,
        "base": 250
      },
      {
        "id": 227053,
        "names": {
          "en": "Demon Demeaner",
          "tw": "惡魔斬",
          "kr": "악마 베기",
          "fr": "Démonlition",
          "de": "Dämonenhieb",
          "es": "Exorcista"
        },
        "castTime": 40,
        "framesList": [
          70
        ],
        "offset": 14,
        "base": 250
      },
      {
        "id": 227054,
        "names": {
          "en": "Undead Undoer",
          "tw": "殭屍斬",
          "kr": "좀비 베기",
          "fr": "Morozombie",
          "de": "Untotentöter",
          "es": "Exterminamuertos"
        },
        "castTime": 40,
        "framesList": [
          70
        ],
        "offset": 14,
        "base": 250
      },
      {
        "id": 227050,
        "names": {
          "en": "Mace Helichopter",
          "tw": "鐵球大回轉",
          "kr": "쇠구슬 돌리기",
          "fr": "Hélicouptère de massue",
          "de": "Keulenrotor",
          "es": "Mazo helitroceador"
        },
        "hitDamage": [
          50,
          50
        ],
        "castTime": 40,
        "framesList": [
          45,
          20
        ],
        "offset": 14,
        "base": 320
      },
      {
        "id": 306001106,
        "names": {
          "en": "Code Zero",
          "tw": "代碼復位",
          "kr": "코드 제로",
          "fr": "Code zéro",
          "es": "Código Cero"
        },
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "dualable": false,
        "framesList": [
          37, 15, 15, 15, 15, 15, 15, 15, 15, 15
        ],
        "offset": 8,
        "base": 1020
      }
    ]
  },
  {
    "id": 162,
    "names": {
      "en": "Marquis de Léon",
      "tw": "獅王",
      "kr": "킹 레오",
      "fr": "Lord Lionel"
    },
    "abilities": [
      {
        "id": 205590,
        "names": {
          "en": "Sizzle",
          "tw": "貝基拉瑪",
          "kr": "베기라마",
          "fr": "Supercrame",
          "de": "Brutzel",
          "es": "Incendio"
        },
        "damage": "magic",
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "framesList": [
          80
        ],
        "offset": 14,
        "base": 140
      },
      {
        "id": 206050,
        "names": {
          "en": "Total War Cry",
          "tw": "猛烈吼叫",
          "kr": "세찬 외침",
          "fr": "Super cri de guerre",
          "de": "Kampfurschrei",
          "es": "Gran grito de guerra"
        },
        "castTime": 40,
        "framesList": [
          45
        ],
        "offset": 14,
        "base": 100,
        "ignore": 25
      },
      {
        "id": 205740,
        "names": {
          "en": "Kacrackle Slash",
          "tw": "瑪夏德斬",
          "kr": "마햐드 베기",
          "fr": "Entaille mégaglace",
          "de": "Eiszeit (DQ)",
          "es": "Estocada superhelada"
        },
        "elements": [
          "ice"
        ],
        "framesList": [
          125
        ],
        "offset": 8,
        "base": 160
      },
      {
        "id": 227003,
        "names": {
          "en": "Wild Animaul",
          "tw": "慈悲斬",
          "kr": "메타 베기",
          "fr": "Coupe sauvage",
          "de": "Zerschnitzeln",
          "es": "Fauna salvaje"
        },
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "castTime": 40,
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 180
      },
      {
        "id": 205580,
        "names": {
          "en": "Kafrizz",
          "tw": "美拉佐瑪",
          "kr": "메라조마",
          "fr": "Mégaflamme",
          "de": "Zisch",
          "es": "Megaataque ígneo"
        },
        "damage": "magic",
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "framesList": [
          150
        ],
        "offset": 14,
        "base": 180
      },
      {
        "id": 227001,
        "names": {
          "en": "Freezing Blizzard",
          "tw": "凍結暴風雪",
          "kr": "얼어붙은 눈보라",
          "fr": "Souffle de givre",
          "de": "Kältesturm",
          "es": "Tormenta heladora"
        },
        "damage": "magic",
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "castTime": 40,
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          55, 5, 5, 5, 5, 5, 5, 5
        ],
        "offset": 14,
        "base": 250,
        "debuffs": [
          {
            "type": "ice",
            "value": 60
          }
        ]
      },
      {
        "id": 227005,
        "names": {
          "en": "Kacrack",
          "tw": "瑪夏德",
          "kr": "마햐드",
          "fr": "Mégaglace",
          "de": "Klirr",
          "es": "Superhelada"
        },
        "damage": "magic",
        "castTime": 40,
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          240
        ],
        "offset": 14,
        "base": 400
      },
      {
        "id": 227000,
        "names": {
          "en": "Knuckle Sandwich",
          "tw": "正拳突擊",
          "kr": "정권 찌르기",
          "fr": "Casse-dentier",
          "de": "Furchtbare Faust",
          "es": "Puñodillo"
        },
        "castTime": 70,
        "framesList": [
          72
        ],
        "offset": 14,
        "base": 265,
        "ignore": 50
      },
      {
        "id": 507543,
        "names": {
          "en": "Fiendish Fauna Fist",
          "tw": "魔人百獸拳",
          "kr": "마인백수권",
          "fr": "Poing du démon bestial",
          "de": "Diabolische Faunafaust",
          "es": "Puño animamistoso"
        },
        "castTime": 40,
        "framesList": [
          170
        ],
        "offset": 14,
        "base": 650
      },
      {
        "id": 227024,
        "names": {
          "en": "Blizzard Slash",
          "tw": "暴雪衝擊",
          "kr": "블리자 러쉬",
          "fr": "Lame de blizzard",
          "de": "Eishieb",
          "es": "Estocada helada"
        },
        "elements": [
          "ice"
        ],
        "framesList": [
          90
        ],
        "offset": 8,
        "base": 700
      },
      {
        "id": 306001007,
        "names": {
          "en": "Blizzard Blast",
          "tw": "極寒凍結",
          "kr": "극한동결",
          "fr": "Tempête de neige",
          "de": "Fieser Frost",
          "es": "Ráfaga glacial"
        },
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          62, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 8,
        "base": 1800
      }
    ]
  },
  {
    "id": 163,
    "names": {
      "en": "Estark",
      "tw": "艾斯塔克",
      "kr": "에스타크"
    },
    "abilities": [
      {
        "id": 226983,
        "names": {
          "en": "Crushing Smash",
          "tw": "擊潰",
          "kr": "때려눕히기",
          "fr": "Frappe violente",
          "de": "Schmetterschlag",
          "es": "Golpe aplastante"
        },
        "castTime": 40,
        "framesList": [
          47
        ],
        "offset": 14,
        "base": 180
      },
      {
        "id": 226987,
        "names": {
          "en": "Assassin's Stab",
          "tw": "刺客襲擊",
          "kr": "어쌔신 어택",
          "fr": "Coup de l'assassin",
          "de": "Meuchelmörder",
          "es": "Puñalada asesina"
        },
        "castTime": 40,
        "framesList": [
          45
        ],
        "offset": 14,
        "base": 250
      },
      {
        "id": 226985,
        "names": {
          "en": "True Attack Attacker",
          "tw": "真·碎刃",
          "kr": "진·칼날 부수기",
          "fr": "Attaque-attaque X",
          "de": "Wahrer Klingenbrecher",
          "es": "Ultraatacaatacante"
        },
        "castTime": 50,
        "framesList": [
          52
        ],
        "offset": 14,
        "base": 170
      },
      {
        "id": 226981,
        "names": {
          "en": "Lordly Thrust",
          "tw": "帝王一閃",
          "kr": "황제의 일섬",
          "fr": "Frappe seigneuriale",
          "de": "Herrlicher Stoß",
          "es": "Impulso señorial"
        },
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 250,
        "ignore": 50
      },
      {
        "id": 507531,
        "names": {
          "en": "Lightning Storm",
          "tw": "地獄雷打",
          "kr": "지고 스파크",
          "fr": "Lame choc",
          "de": "Blitzgewitter",
          "es": "Tormenta luminosa"
        },
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 1000,
        "debuffs": [
          {
            "type": "dark",
            "value": 100
          }
        ]
      },
      {
        "id": 306000907,
        "names": {
          "en": "Death Blow",
          "tw": "必殺一擊",
          "kr": "필살의 일격",
          "fr": "Frappe létale",
          "de": "Todesstoß",
          "es": "Golpe mortal"
        },
        "dualable": false,
        "framesList": [
          117
        ],
        "offset": 8,
        "base": 2100
      }
    ]
  },
  {
    "id": 164,
    "names": {
      "en": "Hyoh",
      "tw": "獵豹",
      "kr": "효우",
      "de": "Hyou",
      "es": "Hyou"
    },
    "abilities": [
      {
        "id": 227282,
        "names": {
          "en": "Flame Blade",
          "tw": "烈焰劍",
          "kr": "플레임 블레이드",
          "fr": "Lame enflammée",
          "de": "Flammenklinge",
          "es": "Hoja llameante"
        },
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 350,
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          }
        ]
      },
      {
        "id": 227283,
        "names": {
          "en": "Voltage Blade",
          "tw": "伏特劍",
          "kr": "볼트 블레이드",
          "fr": "Lame électrisante",
          "de": "Voltklinge",
          "es": "Hoja de voltaje"
        },
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 350,
        "debuffs": [
          {
            "type": "lightning",
            "value": 60
          }
        ]
      },
      {
        "id": 227284,
        "names": {
          "en": "Life-severing Blade",
          "tw": "絕命劍",
          "kr": "명절검",
          "fr": "Lame coupe-vie",
          "de": "Lebenstrennende Klinge",
          "es": "Hoja rebanavidas"
        },
        "castTime": 22,
        "framesList": [
          22
        ],
        "offset": 14,
        "base": 210
      },
      {
        "id": 227285,
        "names": {
          "en": "Unknown Traitor",
          "tw": "不明背叛者",
          "kr": "무명의 반역자",
          "fr": "Traître inconnu",
          "de": "Unbekannter Verräter",
          "es": "Traidor desconocido"
        },
        "castTime": 40,
        "dualable": false,
        "framesList": [
          140
        ],
        "offset": 14,
        "base": 180
      },
      {
        "id": 227281,
        "names": {
          "en": "Ruthless Blade",
          "tw": "冷酷劍刃",
          "kr": "루슬리스 블레이드",
          "fr": "Lame implacable",
          "de": "Gnadenlose Klinge",
          "es": "Hoja implacable"
        },
        "hitDamage": [
          9, 9, 9, 9, 9, 11, 7, 7, 7, 7, 7, 9
        ],
        "castTime": 40,
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 350
      },
      {
        "id": 227280,
        "names": {
          "en": "Servant of the Blade",
          "tw": "劍奴",
          "kr": "블레이드 슬레이브",
          "fr": "Serviteur de l'épée",
          "de": "Diener der Klinge",
          "es": "Esclavo de la espada"
        },
        "hitDamage": [
          3.4782608695652173, 3.4782608695652173, 3.4782608695652173, 3.4782608695652173, 3.4782608695652173, 4.3478260869565215, 78.26086956521739
        ],
        "castTime": 40,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 410
      },
      {
        "id": 507742,
        "names": {
          "en": "Phantom Blade",
          "tw": "幻影劍刃",
          "kr": "팬텀 블레이드",
          "fr": "Lame fantôme",
          "de": "Phantomklinge",
          "es": "Hoja fantasma"
        },
        "hitDamage": [
          8, 8, 8, 8, 8, 10, 50
        ],
        "castTime": 40,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 560,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 100
          },
          {
            "type": "lightning",
            "value": 100
          }
        ]
      },
      {
        "id": 100016207,
        "names": {
          "en": "Extreme Nova",
          "tw": "終極新星",
          "kr": "극한의 광휘",
          "fr": "Nova extrême",
          "de": "Extremnova",
          "es": "Nova extrema"
        },
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13
        ],
        "dualable": false,
        "framesList": [
          28, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "offset": 8,
        "base": 1900
      }
    ],
    dual: false,
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          227280,
          227281,
          227282,
          227283,
          227284,
          227285
        ]
      }
    ]
  },
  {
    "id": 165,
    "names": {
      "en": "Aloha Lasswell",
      "tw": "拉斯韋爾（泳裝）",
      "kr": "알로하 라스웰",
      "fr": "Lasswell tenue d'été",
      "de": "Aloha-Lasswell",
      "es": "Lasswell hawaiano"
    },
    "abilities": [
      {
        "id": 911269,
        "names": {
          "en": "Summer - Tidal Splash",
          "tw": "夏日 - 潮汐噴濺",
          "kr": "여름·파도의 물보라",
          "fr": "Été - Reflux des marées",
          "de": "Sommer - Wellenspritzer",
          "es": "Verano - Salpicón de las mareas"
        },
        "castTime": 40,
        "framesList": [
          70
        ],
        "offset": 14,
        "base": 200
      },
      {
        "id": 911272,
        "names": {
          "en": "Summer - Sea Breeze",
          "tw": "夏日 - 海風",
          "kr": "여름·바닷바람",
          "fr": "Été - Brise marine",
          "de": "Sommer - Meeresbrise",
          "es": "Verano - Brisa marina"
        },
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "framesList": [
          70
        ],
        "offset": 14,
        "base": 200
      },
      {
        "id": 911279,
        "names": {
          "en": "Summer - Waves of the Ocean",
          "tw": "夏日 - 海洋波浪",
          "kr": "여름·파도",
          "fr": "Été - Vagues océaniques",
          "de": "Sommer - Ozeanwellen",
          "es": "Verano - Voluntad del océano"
        },
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 460,
        "debuffs": [
          {
            "type": "water",
            "value": 60
          }
        ]
      },
      {
        "id": 911278,
        "names": {
          "en": "Summer - Winds of the Sea",
          "tw": "夏日 - 大海之風",
          "kr": "여름·해풍",
          "fr": "Été - Ailes marines",
          "de": "Sommer - Meereswinde",
          "es": "Verano - Voluntad de los mares"
        },
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 460,
        "debuffs": [
          {
            "type": "wind",
            "value": 60
          }
        ]
      },
      {
        "id": 911280,
        "names": {
          "en": "Summer - Ocean Splitter",
          "tw": "夏日 - 分裂大海",
          "kr": "여름·바다 가르기",
          "fr": "Été - Séparation des océans",
          "de": "Sommer - Ozeanspalter",
          "es": "Verano - Rompeocéanos"
        },
        "elements": [
          "water"
        ],
        "framesList": [
          70
        ],
        "offset": 8,
        "base": 540
      },
      {
        "id": 911286,
        "names": {
          "en": "Summer - Showdown",
          "tw": "夏日 - 撒手鐧",
          "kr": "여름·대결",
          "fr": "Été - Confrontation",
          "de": "Sommer - Showdown",
          "es": "Verano - Enfrentamiento"
        },
        "framesList": [
          70
        ],
        "offset": 8,
        "base": 1200
      },
      {
        "id": 911288,
        "names": {
          "en": "Enriched Mind",
          "tw": "充實心靈",
          "kr": "풍부한 지식",
          "fr": "Esprit enrichi",
          "de": "Reicherer Geist",
          "es": "Mente enriquecida"
        },
        "castTime": 40,
        "dualable": false,
        "framesList": [
          120
        ],
        "offset": 14,
        "base": 500
      },
      {
        "id": 401005307,
        "names": {
          "en": "Shark Wave",
          "tw": "鯊魚浪潮",
          "kr": "경파",
          "fr": "Vague-requin",
          "de": "Hai-Welle",
          "es": "Ola de tiburón"
        },
        "hitDamage": [
          50,
          50
        ],
        "dualable": false,
        "framesList": [
          125,
          80
        ],
        "offset": 8,
        "base": 1290,
        "debuffs": [
          {
            "type": "water",
            "value": 100
          },
          {
            "type": "wind",
            "value": 100
          }
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          911269,
          911272,
          911278,
          911279,
          911280
        ]
      }
    ]
  },
  {
    "id": 166,
    "names": {
      "en": "Seaside Nichol",
      "tw": "尼科爾（泳裝）",
      "kr": "바닷가의 니콜",
      "fr": "Nichol tenue d'été",
      "de": "Badestrand-Nichol",
      "es": "Nichol playero"
    },
    "abilities": [
      {
        "id": 20300,
        "names": {
          "en": "Blizzaja",
          "tw": "強暴雪",
          "kr": "블리자쟈",
          "fr": "Glace max",
          "de": "Eiska",
          "es": "Hielo+++"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          240
        ],
        "offset": 14,
        "base": 600
      },
      {
        "id": 20320,
        "names": {
          "en": "Waterja",
          "tw": "強流水",
          "kr": "워터쟈",
          "fr": "Eau max",
          "de": "Aquaka",
          "es": "Aqua+++"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          190
        ],
        "offset": 14,
        "base": 600
      },
      {
        "id": 911301,
        "names": {
          "en": "Diver - Waterfall",
          "tw": "潛水員 - 瀑布",
          "kr": "다이버·폭포",
          "fr": "Plongeur - Chute d'eau",
          "de": "Taucher - Wasserfall",
          "es": "Buceo - Catarata"
        },
        "damage": "magic",
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          150
        ],
        "offset": 14,
        "base": 250,
        "debuffs": [
          {
            "type": "water",
            "value": 50
          }
        ]
      },
      {
        "id": 911302,
        "names": {
          "en": "Diver - Icicle",
          "tw": "潛水員 - 冰柱",
          "kr": "다이버·고드름",
          "fr": "Plongeur - Stalactite",
          "de": "Taucher - Eiszapfen",
          "es": "Buceo - Carámbano"
        },
        "damage": "magic",
        "castTime": 40,
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          110
        ],
        "offset": 14,
        "base": 250,
        "debuffs": [
          {
            "type": "ice",
            "value": 50
          }
        ]
      },
      {
        "id": 20380,
        "names": {
          "en": "Flood",
          "tw": "洪水",
          "kr": "플러드",
          "fr": "Inondation",
          "de": "Flut",
          "es": "Inundación"
        },
        "damage": "magic",
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          133, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14,
        "base": 250,
        "debuffs": [
          {
            "type": "lightning",
            "value": 50
          }
        ]
      },
      {
        "id": 911312,
        "names": {
          "en": "Diver - Submersion",
          "tw": "潛水員 - 下潛",
          "kr": "다이버·잠수",
          "fr": "Plongeur - Immersion",
          "de": "Taucher - Untertauchen",
          "es": "Buceo - Inmersión"
        },
        "damage": "magic",
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          133, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14,
        "base": 360
      },
      {
        "id": 911313,
        "names": {
          "en": "Diver - Regelation",
          "tw": "潛水員 - 再凝",
          "kr": "다이버·복빙",
          "fr": "Plongeur - Surgélation",
          "de": "Taucher - Regelation",
          "es": "Buceo - Regelación"
        },
        "damage": "magic",
        "hitDamage": [
          5, 5, 5, 10, 10, 10, 15, 40
        ],
        "castTime": 40,
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          140, 14, 14, 14, 14, 14, 15, 15
        ],
        "offset": 14,
        "base": 360
      }
    ],
    "multipleBlack": 2,
    "multipleWhite": 2,
    "multipleGreen": 2,
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          911301,
          911302,
          911312,
          911313
        ]
      }
    ]
  },
  {
    "id": 167,
    "names": {
      "en": "Summertime Luka",
      "tw": "露露卡（泳裝）",
      "kr": "여름날의 루루카",
      "fr": "Luluka tenue d'été",
      "de": "Sommerferien-Luka",
      "es": "Luka estival"
    },
    "abilities": [
      {
        "id": 911255,
        "names": {
          "en": "Aqua - Splash",
          "tw": "水域 - 噴濺",
          "kr": "아쿠아·물보라",
          "fr": "Aqua - éclaboussure",
          "de": "Aqua - Spritzer",
          "es": "Aqua - Salpicón"
        },
        "damage": "magic",
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          80
        ],
        "offset": 14,
        "base": 200
      },
      {
        "id": 911256,
        "names": {
          "en": "Aqua - Stream",
          "tw": "水域 - 激流",
          "kr": "아쿠아·격류",
          "fr": "Aqua - courant",
          "de": "Aqua - Schwall",
          "es": "Aqua - Corriente"
        },
        "damage": "magic",
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          110
        ],
        "offset": 14,
        "base": 600
      },
      {
        "id": 911258,
        "names": {
          "en": "Aqua - Whirlpool",
          "tw": "水域 - 漩渦",
          "kr": "아쿠아·소용돌이",
          "fr": "Aqua - Tourbillon",
          "de": "Aqua - Strudel",
          "es": "Aqua - Remolino"
        },
        "damage": "magic",
        "castTime": 40,
        "dualable": false,
        "framesList": [
          110
        ],
        "offset": 14,
        "base": 250,
        "debuffs": [
          {
            "type": "water",
            "value": 50
          }
        ]
      },
      {
        "id": 911260,
        "names": {
          "en": "Aqua - Tidal Party",
          "tw": "水域 - 潮汐",
          "kr": "아쿠아·조석",
          "fr": "Aqua - Marée",
          "de": "Aqua - Wellenparty",
          "es": "Aqua - Equipo mareomotriz"
        },
        "damage": "magic",
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          133, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14,
        "base": 250
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          911255,
          911256,
          911258,
          911260
        ]
      }
    ]
  },
  {
    "id": 168,
    "names": {
      "en": "Circe",
      "tw": "瑟希",
      "kr": "서스",
      "fr": "Circé"
    },
    "abilities": [
      {
        "id": 911353,
        "names": {
          "en": "Predict - Blazing Omen",
          "tw": "預言-炙熱預兆",
          "kr": "예측·화재의 징조",
          "fr": "Présage - Augure ardent",
          "de": "Weissaung - Omen der Glut",
          "es": "Predicción - Presagio abrasador"
        },
        "damage": "magic",
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "framesList": [
          95
        ],
        "offset": 14,
        "base": 260
      },
      {
        "id": 911354,
        "names": {
          "en": "Predict - Freezing Omen",
          "tw": "預言-凍結預兆",
          "kr": "예측·빙결의 징조",
          "fr": "Présage - Augure glacial",
          "de": "Weissagung - Omen des Frosts",
          "es": "Predicción - Presagio helado"
        },
        "damage": "magic",
        "castTime": 40,
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          130
        ],
        "offset": 14,
        "base": 260
      },
      {
        "id": 911355,
        "names": {
          "en": "Predict - Cyclonic Omen",
          "tw": "預言-風旋預兆",
          "kr": "예측·선풍의 징조",
          "fr": "Présage - Augure tempétueux",
          "de": "Weissagung - Omen des Zyklons",
          "es": "Predicción - Presagio ciclónico"
        },
        "damage": "magic",
        "hitDamage": [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        "castTime": 40,
        "elements": [
          "wind",
          "earth"
        ],
        "dualable": false,
        "framesList": [
          160, 22, 21, 22, 23, 23, 22, 23
        ],
        "offset": 14,
        "base": 260
      },
      {
        "id": 911356,
        "names": {
          "en": "Predict - Torrential Omen",
          "tw": "預言-滂沱預兆",
          "kr": "예측·홍수의 징조",
          "fr": "Présage - Augure torrentiel",
          "de": "Weissagung - Omen der Flut",
          "es": "Predicción - Presagio torrencial"
        },
        "damage": "magic",
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          133, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14,
        "base": 260
      },
      {
        "id": 911360,
        "names": {
          "en": "Predict - Rapture",
          "tw": "預言-喜樂",
          "kr": "예측·황홀감",
          "fr": "Présage - Ascension",
          "de": "Weissagung - Entrückung",
          "es": "Predicción - Éxtasis"
        },
        "damage": "magic",
        "castTime": 4,
        "dualable": false,
        "framesList": [
          6
        ],
        "offset": 14,
        "base": 425,
        "ignore": 50
      },
      {
        "id": 401004407,
        "names": {
          "en": "Premonition",
          "tw": "徵兆",
          "kr": "불길한 예감",
          "fr": "Prémonition",
          "de": "Vorahnung",
          "es": "Premonición"
        },
        "damage": "magic",
        "hitDamage": [
          25, 25, 25, 25
        ],
        "dualable": false,
        "framesList": [
          40, 40, 40, 50
        ],
        "offset": 8,
        "base": 2400,
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          },
          {
            "type": "ice",
            "value": 60
          },
          {
            "type": "lightning",
            "value": 60
          },
          {
            "type": "water",
            "value": 60
          },
          {
            "type": "wind",
            "value": 60
          },
          {
            "type": "earth",
            "value": 60
          },
          {
            "type": "light",
            "value": 60
          },
          {
            "type": "dark",
            "value": 60
          }
        ]
      },
      {
        "id": 911373,
        "names": {
          "en": "Predict - Downpour",
          "tw": "預言 - 暴雨",
          "kr": "예측·폭우",
          "fr": "Présage - Averse",
          "de": "Weissagung - Regenguss",
          "es": "Predicción - Aguacero"
        },
        "damage": "magic",
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          133, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14,
        "base": 900
      },
      {
        "id": 911374,
        "names": {
          "en": "Predict - Sandstorm",
          "tw": "預言 - 沙暴",
          "kr": "예측·모래 폭풍",
          "fr": "Présage - Sirocco",
          "de": "Weissagung - Sandsturm",
          "es": "Predicción - Tormenta de arena"
        },
        "damage": "magic",
        "hitDamage": [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        "castTime": 40,
        "elements": [
          "wind",
          "earth"
        ],
        "dualable": false,
        "framesList": [
          160, 22, 21, 22, 23, 23, 22, 23
        ],
        "offset": 14,
        "base": 600
      },
      {
        "id": 911375,
        "names": {
          "en": "Predict - Flash-freeze",
          "tw": "預言 - 急凍",
          "kr": "예측·급속 냉동",
          "fr": "Présage - Blizzard",
          "de": "Weissagung - Schockfrost",
          "es": "Predicción - Destello helado"
        },
        "damage": "magic",
        "castTime": 40,
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          130
        ],
        "offset": 14,
        "base": 680
      },
      {
        "id": 911376,
        "names": {
          "en": "Predict - Heat Wave",
          "tw": "預言 - 熱浪",
          "kr": "예측·열파",
          "fr": "Présage - Canicule",
          "de": "Weissagung - Hitzewelle",
          "es": "Predicción - Ola de calor"
        },
        "damage": "magic",
        "castTime": 95,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "framesList": [
          95
        ],
        "offset": 14,
        "base": 430
      }
    ],
    "multiCasts": [
      {
        "count": 4,
        "abilities": [
          911353,
          911354,
          911355,
          911356,
          911360,
          911373,
          911374,
          911375,
          911376
        ]
      }
    ]
  },
  {
    "id": 169,
    "names": {
      "en": "Malphasie",
      "tw": "瑪爾菲希",
      "kr": "멜파지"
    },
    "abilities": [
      {
        "id": 911326,
        "names": {
          "en": "Swooping Strike",
          "tw": "俯衝猛擊",
          "kr": "급강하 공격",
          "fr": "Frappe fulgurante",
          "de": "Sturzflug-Streich",
          "es": "Golpe en picado"
        },
        "damage": "hybrid",
        "castTime": 40,
        "framesList": [
          140
        ],
        "offset": 14,
        "base": 180
      },
      {
        "id": 911328,
        "names": {
          "en": "Menacing Strike",
          "tw": "威脅猛擊",
          "kr": "위협적 공격",
          "fr": "Frappe menaçante",
          "de": "Bedrohender Streich",
          "es": "Golpe amenazante"
        },
        "damage": "hybrid",
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "framesList": [
          80
        ],
        "offset": 14,
        "base": 400
      },
      {
        "id": 911329,
        "names": {
          "en": "Flying Strike",
          "tw": "飛行猛擊",
          "kr": "비행 공격",
          "fr": "Frappe aérienne",
          "de": "Flugstreich",
          "es": "Golpe volador"
        },
        "damage": "hybrid",
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "framesList": [
          110
        ],
        "offset": 14,
        "base": 400
      },
      {
        "id": 20330,
        "names": {
          "en": "Aeroja",
          "tw": "強勁風",
          "kr": "에어로쟈",
          "fr": "Vent max",
          "de": "Aeroka",
          "es": "Aero+++"
        },
        "damage": "magic",
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "framesList": [
          170
        ],
        "offset": 14,
        "base": 600
      },
      {
        "id": 911335,
        "names": {
          "en": "Tenebrous Dive",
          "tw": "黑暗潛躍",
          "kr": "암흑 침강",
          "fr": "Plongeon ténébreux",
          "de": "Dunkler Sturzflug",
          "es": "Descenso tenebroso"
        },
        "damage": "hybrid",
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 800,
        "debuffs": [
          {
            "type": "dark",
            "value": 50
          }
        ]
      },
      {
        "id": 911336,
        "names": {
          "en": "Aerial Dive",
          "tw": "空中潛躍",
          "kr": "공중 침강",
          "fr": "Plongeon aérien",
          "de": "Wehender Sturzflug",
          "es": "Descenso aéreo"
        },
        "damage": "hybrid",
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14,
        "base": 800,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ]
      },
      {
        "id": 911341,
        "names": {
          "en": "Thousand Wings+",
          "tw": "千之羽+",
          "kr": "천 개의 깃털+",
          "fr": "Mille et une ailes +",
          "de": "Tausend Flügel+",
          "es": "Miles de alas+"
        },
        "damage": "hybrid",
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14,
        "base": 1100
      },
      {
        "id": 911340,
        "names": {
          "en": "Thousand Wings",
          "tw": "千之羽",
          "kr": "천 개의 깃털",
          "fr": "Mille et une ailes",
          "de": "Tausend Flügel",
          "es": "Miles de alas"
        },
        "damage": "hybrid",
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14,
        "base": 800
      },
      {
        "id": 911343,
        "names": {
          "en": "Vengeful Sky",
          "tw": "復仇之空",
          "kr": "복수의 하늘",
          "fr": "Ciel vengeur",
          "de": "Rachsüchtiger Himmel",
          "es": "Cielo vengativo"
        },
        "damage": "hybrid",
        "framesList": [
          40
        ],
        "offset": 8,
        "base": 400
      },
      {
        "id": 911345,
        "names": {
          "en": "Fiendish Winds",
          "tw": "殘酷之風",
          "kr": "기괴한 바람",
          "fr": "Vents démoniaques",
          "de": "Teuflische Winde",
          "es": "Alas hostiles"
        },
        "damage": "hybrid",
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "offset": 14,
        "base": 1100
      },
      {
        "id": 911346,
        "names": {
          "en": "Turbulence",
          "tw": "亂流",
          "kr": "난기류",
          "fr": "Hourvari",
          "de": "Turbulenz",
          "es": "Turbulencia"
        },
        "damage": "hybrid",
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "offset": 14,
        "base": 1100
      },
      {
        "id": 911348,
        "names": {
          "en": "Intense Rancor",
          "tw": "極端怨仇",
          "kr": "맹렬한 원한",
          "fr": "Rancœur absolue",
          "de": "Gewaltiger Groll",
          "es": "Ultrarrencor"
        },
        "damage": "hybrid",
        "castTime": 40,
        "framesList": [
          72
        ],
        "offset": 14,
        "base": 2600
      },
      {
        "id": 401004607,
        "names": {
          "en": "Murderous Intent",
          "tw": "殺意",
          "kr": "살의",
          "fr": "Desseins meurtriers",
          "de": "Mordlust",
          "es": "Intento asesino"
        },
        "damage": "hybrid",
        "hitDamage": [
          30, 30, 40
        ],
        "dualable": false,
        "framesList": [
          155, 45, 20
        ],
        "offset": 8,
        "base": 2720
      },
      {
        "id": 911384,
        "names": {
          "en": "Raucous Storm",
          "tw": "嘶吼風暴",
          "kr": "거센 폭풍",
          "fr": "Orage retentissant",
          "de": "Dröhnender Sturm",
          "es": "Tormenta torrencial"
        },
        "damage": "hybrid",
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "wind",
          "dark"
        ],
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14,
        "base": 1600
      }
    ],
    "multipleBlack": 2,
    "multipleWhite": 2,
    "multipleGreen": 2
  },
  {
    "id": 170,
    "names": {
      "en": "Ignis",
      "tw": "伊格尼斯",
      "kr": "이그니스"
    },
    "abilities": [
      {
        "id": 507870,
        "names": {
          "en": "Final Blow",
          "tw": "最終一擊",
          "kr": "파이널 어택",
          "fr": "Coup final",
          "de": "Endgültiger Angriff",
          "es": "Golpe final"
        },
        "base": 400,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "framesList": [
          32, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 8
      },
      {
        "id": 507871,
        "names": {
          "en": "Overwhelm",
          "tw": "全員突擊",
          "kr": "라운드 어설트",
          "fr": "Persécution",
          "de": "Alle auf einen",
          "es": "Opresión"
        },
        "base": 350,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "ignore": 50,
        "framesList": [
          32, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 8
      },
      {
        "id": 215000507,
        "names": {
          "en": "Sagefire",
          "tw": "賢者之炎",
          "kr": "현자의 불꽃",
          "fr": "Enfièvrement",
          "de": "Ungleiches Paar",
          "es": "Fuego de la sabiduría"
        },
        "damage": "magic",
        "base": 400,
        "hitDamage": [
          100
        ],
        "elements": [
          "fire"
        ],
        "dualable": false,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 100
          }
        ],
        "framesList": [
          178
        ],
        "offset": 8
      },
      {
        "id": 900000107,
        "names": {
          "en": "Sagefire + 1",
          "tw": "賢者之炎 + 1",
          "kr": "현자의 불꽃 + 1",
          "fr": "Enfièvrement + 1",
          "de": "Ungleiches Paar + 1",
          "es": "Fuego de la sabiduría + 1"
        },
        "damage": "magic",
        "base": 400,
        "hitDamage": [
          100
        ],
        "elements": [
          "fire"
        ],
        "dualable": false,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 100
          },
          {
            "type": "ice",
            "value": 100
          },
          {
            "type": "lightning",
            "value": 100
          }
        ],
        "framesList": [
          178
        ],
        "offset": 8
      }
    ]
  },
  {
    "id": 171,
    "names": {
      "en": "Ravus",
      "tw": "瑞布斯",
      "kr": "레이브스"
    },
    "abilities": [
      {
        "id": 227382,
        "names": {
          "en": "Blitz Blade",
          "tw": "連續斬",
          "kr": "연속 베기",
          "fr": "Lame-foudre",
          "de": "Serienschnitt",
          "es": "Hoja relámpago"
        },
        "base": 400,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 13,
        "framesList": [
          15, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 227384,
        "names": {
          "en": "Zantetsuken",
          "tw": "斬鐵劍",
          "kr": "참철검",
          "es": "Sable justiciero"
        },
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "ignore": 50,
        "debuffs": [
          {
            "type": "dark",
            "value": 50
          }
        ],
        "framesList": [
          50
        ],
        "offset": 14
      },
      {
        "id": 507891,
        "names": {
          "en": "True Zantetsuken",
          "tw": "真·斬鐵劍",
          "kr": "진·참철검",
          "fr": "Zantetsuken +",
          "de": "Wahres Zantetsuken",
          "es": "Sable justiciero real"
        },
        "base": 350,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "ignore": 50,
        "debuffs": [
          {
            "type": "dark",
            "value": 70
          }
        ],
        "framesList": [
          50
        ],
        "offset": 14
      },
      {
        "id": 215001006,
        "names": {
          "en": "Technique - Last Rites",
          "tw": "奧義·黃泉送葬",
          "kr": "오의·황천 보내기",
          "fr": "Technique - Derniers rites",
          "de": "Technik - Letzte Salbung",
          "es": "Técnica - Últimos ritos"
        },
        "base": 940,
        "hitDamage": [
          100
        ],
        "elements": [
          "dark"
        ],
        "dualable": false,
        "framesList": [
          139
        ],
        "offset": 8
      }
    ]
  },
  {
    "id": 172,
    "names": {
      "en": "Macmedi",
      "tw": "麥克梅迪",
      "kr": "마크메디"
    },
    "abilities": [
      {
        "id": 227671,
        "names": {
          "en": "Bullet Barrage",
          "tw": "彈幕射擊",
          "kr": "탄막 사격",
          "fr": "Mur de balles",
          "de": "Kugelhagel",
          "es": "Ráfaga de balas"
        },
        "base": 280,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 227678,
        "names": {
          "en": "Shooting Arm",
          "tw": "射擊武裝",
          "kr": "사격장비",
          "fr": "Bras armé",
          "de": "Schusshand",
          "es": "Brazo disparador"
        },
        "base": 150,
        "hitDamage": [
          100
        ],
        "castTime": 58,
        "framesList": [
          50
        ],
        "offset": 14
      },
      {
        "id": 227672,
        "names": {
          "en": "Shot in the Dark",
          "tw": "暗黑彈",
          "kr": "암흑탄",
          "fr": "Tir dans le noir",
          "de": "Schuss im Dunkeln",
          "es": "Disparo en la oscuridad"
        },
        "base": 210,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "ignore": 50,
        "framesList": [
          100
        ],
        "offset": 14
      },
      {
        "id": 100016706,
        "names": {
          "en": "Auto Operation",
          "tw": "自動操縱",
          "kr": "자동 조작",
          "fr": "Opération automatique",
          "de": "Automatische Bedienung",
          "es": "Autooperación"
        },
        "base": 590,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 25
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          78, 7, 7, 7, 8, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 8
        ],
        "offset": 8
      }
    ]
  },
  {
    "id": 173,
    "names": {
      "en": "Citra",
      "tw": "希特拉",
      "kr": "시트라"
    },
    "abilities": [
      {
        "id": 227652,
        "names": {
          "en": "Evocation - Light of Supremacy",
          "tw": "喚起·霸光",
          "kr": "환기·패광",
          "fr": "Appel - Lumière de la domination",
          "de": "Rufen - Licht der Übermacht",
          "es": "Invocación - Luz de la supremacía"
        },
        "damage": "magic",
        "base": 900,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "framesList": [
          90
        ],
        "offset": 14
      },
      {
        "id": 227653,
        "names": {
          "en": "Holy Mind",
          "tw": "精神聖域",
          "kr": "성스러운 축복",
          "fr": "Saint Esprit",
          "de": "Heiliger Sinn",
          "es": "Mente sagrada"
        },
        "damage": "magic",
        "base": 350,
        "hitDamage": [
          7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 9
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "dualable": false,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7, 14, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 227650,
        "names": {
          "en": "Evocation - Light of Ruin",
          "tw": "喚起·滅光",
          "kr": "환기·멸광",
          "fr": "Appel - Lumière de la destruction",
          "de": "Rufen - Licht des Untergangs",
          "es": "Invocación - Luz ruinosa"
        },
        "damage": "magic",
        "base": 2000,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "framesList": [
          110
        ],
        "offset": 14
      },
      {
        "id": 508095,
        "names": {
          "en": "Evocation - Fierce Light of Supremacy",
          "tw": "喚起·絕霸光",
          "kr": "환기·절패광",
          "fr": "Appel - Lum. de la domination absolue",
          "de": "Rufen - Licht der absoluten Übermacht",
          "es": "Invocación - Luz feroz de la supremacía"
        },
        "damage": "magic",
        "base": 2500,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "framesList": [
          150
        ],
        "offset": 14
      },
      {
        "id": 100016907,
        "names": {
          "en": "Gleam of Reverie",
          "tw": "夢想閃耀",
          "kr": "환상의 반짝임",
          "fr": "Lueur onirique",
          "de": "Glänzende Träumerei",
          "es": "Brillo ensoñador"
        },
        "damage": "magic",
        "base": 1600,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          },
          {
            "type": "ice",
            "value": 60
          },
          {
            "type": "lightning",
            "value": 60
          },
          {
            "type": "water",
            "value": 60
          },
          {
            "type": "wind",
            "value": 60
          },
          {
            "type": "earth",
            "value": 60
          },
          {
            "type": "light",
            "value": 60
          },
          {
            "type": "dark",
            "value": 60
          }
        ],
        "framesList": [
          330
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          227650,
          227652
        ]
      }
    ]
  },
  {
    "id": 174,
    "names": {
      "en": "Dracu Lasswell",
      "tw": "吸血鬼拉斯韋爾",
      "kr": "드라큘라 라스웰",
      "fr": "Draculasswell",
      "de": "Dracu-Lasswell",
      "es": "Draculasswell"
    },
    "abilities": [
      {
        "id": 911438,
        "names": {
          "en": "Crescent Blade",
          "tw": "新月劍",
          "kr": "언월도",
          "fr": "Lame en croissant de lune",
          "de": "Sichelklinge",
          "es": "Hoja creciente"
        },
        "base": 200,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "ignore": 50,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 911444,
        "names": {
          "en": "Equity Slash",
          "tw": "兩斷劍",
          "kr": "양단검",
          "fr": "Taillade miroir",
          "de": "Spaltende Klinge",
          "es": "Corte de la equidad"
        },
        "base": 345,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "ignore": 50,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ],
        "offset": 14
      },
      {
        "id": 911446,
        "names": {
          "en": "Dark Descent",
          "tw": "黑暗墮落",
          "kr": "어둠으로의 추락",
          "fr": "Sombre descente",
          "de": "Dunkler Abstieg",
          "es": "Descenso oscuro"
        },
        "damage": "hybrid",
        "base": 2600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "debuffs": [
          {
            "type": "dark",
            "value": 70
          }
        ],
        "framesList": [
          290
        ],
        "offset": 14
      },
      {
        "id": 401000307,
        "names": {
          "en": "Azure Sky",
          "tw": "雲外蒼天",
          "kr": "운외창천",
          "fr": "Ciel sans nuage",
          "de": "Wolkenbeben",
          "es": "Cielo azul"
        },
        "base": 1190,
        "hitDamage": [
          100
        ],
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          80
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          911438,
          911444
        ]
      }
    ]
  },
  {
    "id": 175,
    "names": {
      "en": "Lilith",
      "tw": "莉莉絲",
      "kr": "릴리스"
    },
    "abilities": [
      {
        "id": 911485,
        "names": {
          "en": "Serpenté - Dusk Lash",
          "tw": "蛇蠍・黃昏鞭擊",
          "kr": "뱀여인·황혼의 채찍질",
          "fr": "Serpenté - Fouet du crépuscule",
          "de": "Serpenté - Peitschenhieb der Abenddämmerung",
          "es": "Serpenté - Látigo crepuscular"
        },
        "damage": "magic",
        "base": 500,
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "dark",
            "value": 60
          }
        ],
        "framesList": [
          82, 8, 8, 8, 8, 8, 8, 8
        ],
        "offset": 26
      },
      {
        "id": 911486,
        "names": {
          "en": "Serpenté - Dawn Lash",
          "tw": "蛇蠍・黎明鞭擊",
          "kr": "뱀여인·새벽의 채찍질",
          "fr": "Serpenté - Fouet de l'aube",
          "de": "Serpenté - Peitschenhieb der Morgendämmerung",
          "es": "Serpenté - Látigo del alba"
        },
        "damage": "magic",
        "base": 500,
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          }
        ],
        "framesList": [
          82, 8, 8, 8, 8, 8, 8, 8
        ],
        "offset": 26
      },
      {
        "id": 911489,
        "names": {
          "en": "Life Siphon",
          "tw": "生命虹吸",
          "kr": "생명 흡수",
          "fr": "Siphon vital",
          "de": "Lebenssog",
          "es": "Sifón vital"
        },
        "base": 400,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "framesList": [
          120
        ],
        "offset": 14
      },
      {
        "id": 911494,
        "names": {
          "en": "Serpenté - Kiss of Midnight",
          "tw": "蛇蠍・午夜之吻",
          "kr": "뱀여인·반야의 키스",
          "fr": "Serpenté - Baiser de minuit",
          "de": "Serpenté - Mitternachtskuss",
          "es": "Serpenté - Beso de medianoche"
        },
        "damage": "magic",
        "base": 400,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "elements": [
          "fire",
          "dark"
        ],
        "dualable": false,
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "offset": 14
      },
      {
        "id": 401005907,
        "names": {
          "en": "Sinister Dance",
          "tw": "邪靈之舞",
          "kr": "사악한 춤",
          "fr": "Danse sinistre",
          "de": "Sinistrer Tanz",
          "es": "Danza siniestra"
        },
        "damage": "magic",
        "base": 1090,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 20
        ],
        "dualable": false,
        "framesList": [
          85, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          911485,
          911486,
          911494
        ]
      }
    ]
  },
  {
    "id": 176,
    "names": {
      "en": "Lucius",
      "tw": "路西亞斯",
      "kr": "루시우스"
    },
    "abilities": [
      {
        "id": 911529,
        "names": {
          "en": "Demonic Barrage",
          "tw": "惡魔彈幕",
          "kr": "악마의 탄막",
          "fr": "Rafale démoniaque",
          "de": "Dämonisches Trommelfeuer",
          "es": "Ráfaga demoníaca"
        },
        "base": 400,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "dualable": false,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 911518,
        "names": {
          "en": "Piercing Barrage",
          "tw": "貫通彈幕",
          "kr": "관통의 탄막",
          "fr": "Rafale pénétrante",
          "de": "Durchschießendes Trommelfeuer",
          "es": "Ráfaga penetrante"
        },
        "base": 240,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 58
        ],
        "castTime": 40,
        "ignore": 50,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 911519,
        "names": {
          "en": "Cleaving Barrage",
          "tw": "分裂彈幕",
          "kr": "절삭의 탄막",
          "fr": "Rafale clivante",
          "de": "Spaltendes Trommelfeuer",
          "es": "Ráfaga rompedora"
        },
        "base": 350,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "framesList": [
          40
        ],
        "offset": 14
      },
      {
        "id": 911520,
        "names": {
          "en": "Crushing Barrage",
          "tw": "粉碎彈幕",
          "kr": "분쇄의 탄막",
          "fr": "Rafale écrasante",
          "de": "Zerschmetterndes Trommelfeuer",
          "es": "Ráfaga demoledora"
        },
        "base": 520,
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "castTime": 40,
        "framesList": [
          82, 8, 8, 8, 8, 8, 8, 8
        ],
        "offset": 26
      },
      {
        "id": 911524,
        "names": {
          "en": "Blood Moon Barrage",
          "tw": "血月彈幕",
          "kr": "적월의 탄막",
          "fr": "Rafale de la lune sanglante",
          "de": "Trommelfeuer des Blutmondes",
          "es": "Ráfaga de la luna de sangre"
        },
        "base": 640,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "elements": [
          "fire",
          "dark"
        ],
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "offset": 14
      },
      {
        "id": 401006007,
        "names": {
          "en": "Sinister Fury",
          "tw": "邪靈之怒",
          "kr": "사악한 분노",
          "fr": "Furie sinistre",
          "de": "Unheilvoller Zorn",
          "es": "Furia siniestra"
        },
        "base": 1400,
        "hitDamage": [
          5, 5, 6, 5, 5, 7, 5, 5, 7, 50
        ],
        "dualable": false,
        "framesList": [
          105, 10, 5, 5, 10, 5, 5, 10, 10, 20
        ],
        "offset": 8
      }
    ],
    "multipleBlack": 2
  },
  {
    "id": 177,
    "names": {
      "en": "Anima",
      "tw": "暴怒靈獸",
      "kr": "아니마",
      "es": "Ánima"
    },
    "abilities": [
      {
        "id": 11702,
        "names": {
          "en": "Oblivion (2)",
          "tw": "混沌·D (2)",
          "kr": "카오틱·D (2)",
          "fr": "Chaos (2)",
          "de": "Chaos-Dimension (2)",
          "es": "Caos liberado (2)"
        },
        "elements": ["dark"],
        "dualable": false,
        "damage": "magic",
        "base": 12000,
        "framesList": [
          60
        ]
      }
    ]
  },
  {
    "id": 178,
    "names": {
      "en": "Lucian",
      "tw": "露西奧",
      "kr": "루시오"
    },
    "abilities": [
      {
        "id": 227800,
        "names": {
          "en": "Air Slash",
          "tw": "裂氣斬",
          "kr": "바람의 참격",
          "fr": "Taillade aérienne",
          "de": "Luftstreich",
          "es": "Corte aéreo"
        },
        "base": 220,
        "hitDamage": [
          100
        ],
        "castTime": 10,
        "framesList": [
          12
        ],
        "offset": 14
      },
      {
        "id": 227801,
        "names": {
          "en": "Strike Edge",
          "tw": "重擊劍刃",
          "kr": "타격의 칼날",
          "fr": "Lame brutale",
          "de": "Schneidenschlag",
          "es": "Filo impactante"
        },
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 10,
        "framesList": [
          12
        ],
        "offset": 14
      },
      {
        "id": 227804,
        "names": {
          "en": "Slanting Blow",
          "tw": "傾斜打擊",
          "kr": "사선 베어 올리기",
          "fr": "Coup oblique",
          "de": "Schräger Schlag",
          "es": "Golpe sesgado"
        },
        "base": 150,
        "hitDamage": [
          100
        ],
        "framesList": [
          2
        ],
        "offset": 8
      },
      {
        "id": 227805,
        "names": {
          "en": "Scarlet Edge",
          "tw": "猩紅劍刃",
          "kr": "붉은 칼날",
          "fr": "Tranchant écarlate",
          "de": "Scharlachrote Schneide",
          "es": "Filo escarlata"
        },
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 10,
        "debuffs": [
          {
            "type": "lightning",
            "value": 50
          }
        ],
        "framesList": [
          12
        ],
        "offset": 14
      },
      {
        "id": 227807,
        "names": {
          "en": "Shining Bolt",
          "tw": "耀眼閃電",
          "kr": "빛나는 뇌격",
          "fr": "Éclair brillant",
          "de": "Leuchtender Blitzschlag",
          "es": "Rayo cegador"
        },
        "base": 320,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "elements": [
          "lightning"
        ],
        "framesList": [
          22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20
        ],
        "offset": 8
      },
      {
        "id": 227809,
        "names": {
          "en": "Emotional Blow",
          "tw": "回憶一擊",
          "kr": "마음을 담은 일격",
          "fr": "Coup d'émotion",
          "de": "Emotionaler Schlag",
          "es": "Golpe emotivo"
        },
        "base": 360,
        "hitDamage": [
          100
        ],
        "framesList": [
          12
        ],
        "offset": 8
      },
      {
        "id": 330000406,
        "names": {
          "en": "Round Rip Saber",
          "tw": "圓裂劍",
          "kr": "라운드 립 세이버",
          "fr": "Sabre circulaire",
          "de": "Rundschnittsäbel",
          "es": "Sable desgarrador"
        },
        "base": 800,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "framesList": [
          70, 28, 44, 20, 56
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          227800,
          227801,
          227804,
          227805,
          227807,
          227809
        ]
      }
    ]
  },
  {
    "id": 179,
    "names": {
      "en": "Arngrim",
      "tw": "阿瑠瑟",
      "kr": "아류제"
    },
    "abilities": [
      {
        "id": 227781,
        "names": {
          "en": "Spinning Back-Knuckle",
          "tw": "躍動背擊",
          "kr": "회전 백 너클",
          "fr": "Revers de main",
          "de": "Wirbelnde Knöchelfaust",
          "es": "Revés giratorio"
        },
        "base": 250,
        "hitDamage": [
          100
        ],
        "framesList": [
          22
        ],
        "offset": 8
      },
      {
        "id": 227782,
        "names": {
          "en": "Wrenching Swing",
          "tw": "痛苦揮舞",
          "kr": "비틀어 휘두르기",
          "fr": "Volée déchirante",
          "de": "Seitlicher Schwinger",
          "es": "Tajo desgarrador"
        },
        "base": 300,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "framesList": [
          42
        ],
        "offset": 14
      },
      {
        "id": 227783,
        "names": {
          "en": "High Wind",
          "tw": "空之疾風",
          "kr": "하이윈드",
          "fr": "Grand vent",
          "de": "Windpeitsche",
          "es": "Alto viento"
        },
        "base": 400,
        "hitDamage": [
          100
        ],
        "castTime": 28,
        "framesList": [
          30
        ],
        "offset": 14
      },
      {
        "id": 227786,
        "names": {
          "en": "Dragon Slayer",
          "tw": "龍劍士",
          "kr": "드래곤 슬레이어",
          "fr": "Tueur de Dragon",
          "de": "Drachentöter (VP)",
          "es": "Flagelo de dragones"
        },
        "base": 1000,
        "hitDamage": [
          100
        ],
        "framesList": [
          30
        ],
        "offset": 8
      },
      {
        "id": 227788,
        "names": {
          "en": "Wild Break",
          "tw": "難忍劇痛",
          "kr": "와일드 브레이크",
          "fr": "Sauvagerie",
          "de": "Blutrausch",
          "es": "Acometida salvaje"
        },
        "base": 320,
        "hitDamage": [
          100
        ],
        "castTime": 28,
        "framesList": [
          30
        ],
        "offset": 14
      },
      {
        "id": 227789,
        "names": {
          "en": "Blaze Blade",
          "tw": "焰光之刃",
          "kr": "타오르는 칼날",
          "fr": "Lame enflammée",
          "de": "Gleißende Klinge",
          "es": "Cuchillada llameante"
        },
        "base": 100,
        "hitDamage": [
          100
        ],
        "castTime": 28,
        "debuffs": [
          {
            "type": "fire",
            "value": 50
          }
        ],
        "framesList": [
          30
        ],
        "offset": 14
      },
      {
        "id": 227792,
        "names": {
          "en": "Storm Edge",
          "tw": "風暴劍刃",
          "kr": "폭풍의 칼날",
          "fr": "Tempête de lames",
          "de": "Sturmklinge",
          "es": "Filo tormentoso"
        },
        "base": 800,
        "hitDamage": [
          50, 50
        ],
        "framesList": [
          42, 20
        ],
        "offset": 8
      },
      {
        "id": 227794,
        "names": {
          "en": "Dead End",
          "tw": "死亡終結",
          "kr": "결사의 일격",
          "fr": "Impasse",
          "de": "Sackgasse",
          "es": "Callejón sin salida"
        },
        "base": 1200,
        "hitDamage": [
          100
        ],
        "framesList": [
          30
        ],
        "offset": 8
      },
      {
        "id": 330000307,
        "names": {
          "en": "Final Blast",
          "tw": "最終衝擊",
          "kr": "파이널 블래스트",
          "fr": "Déflagration finale",
          "de": "Das Jüngste Gericht",
          "es": "Ráfaga final"
        },
        "base": 1800,
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "elements": [
          "fire"
        ],
        "dualable": false,
        "framesList": [
          107, 7, 10, 10, 105, 11, 7, 5
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          227781,
          227782,
          227783,
          227786,
          227788,
          227789,
          227792,
          227794
        ]
      }
    ]
  },
  {
    "id": 180,
    "names": {
      "en": "Freya (VP)",
      "tw": "芙蕾",
      "kr": "프레이"
    },
    "abilities": [
      {
        "id": 227763,
        "names": {
          "en": "Critical Flare",
          "tw": "暴擊火花",
          "kr": "화염 강타",
          "fr": "Brasier critique",
          "de": "Kritische Flammen",
          "es": "Fulgor crítico"
        },
        "damage": "magic",
        "base": 200,
        "hitDamage": [
          11, 11, 11, 11, 11, 11, 11, 11, 12
        ],
        "castTime": 40,
        "dualable": false,
        "framesList": [
          70, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "offset": 14
      },
      {
        "id": 227764,
        "names": {
          "en": "Aerial Burst",
          "tw": "空襲爆裂",
          "kr": "공기 폭발",
          "fr": "Explosion aérienne",
          "de": "Luftschlag",
          "es": "Explosión aérea"
        },
        "damage": "magic",
        "base": 160,
        "hitDamage": [
          33, 33, 34
        ],
        "castTime": 40,
        "dualable": false,
        "framesList": [
          72, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 227765,
        "names": {
          "en": "Thunder Sword",
          "tw": "雷霆劍",
          "kr": "우레의 검격",
          "fr": "Épée de tonnerre",
          "de": "Donnerschwert",
          "es": "Espada de trueno"
        },
        "damage": "magic",
        "base": 400,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 70,
        "dualable": false,
        "framesList": [
          80, 15, 15, 15, 15
        ],
        "offset": 14
      },
      {
        "id": 227769,
        "names": {
          "en": "Thunder Strike",
          "tw": "雷電強擊",
          "kr": "번개 타격",
          "fr": "Coup de tonnerre",
          "de": "Donnerschlag",
          "es": "Ataque de rayos"
        },
        "damage": "magic",
        "base": 360,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 70,
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "lightning",
            "value": 50
          }
        ],
        "framesList": [
          80, 15, 15, 15, 15
        ],
        "offset": 14
      },
      {
        "id": 227770,
        "names": {
          "en": "Crimson Strike",
          "tw": "胭紅強擊",
          "kr": "진홍의 타격",
          "fr": "Coup écarlate",
          "de": "Purpurner Schlag",
          "es": "Ataque carmesí"
        },
        "damage": "magic",
        "base": 360,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 70,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "fire",
            "value": 50
          }
        ],
        "framesList": [
          80, 15, 15, 15, 15
        ],
        "offset": 14
      },
      {
        "id": 227771,
        "names": {
          "en": "Queen Press",
          "tw": "女王氣息",
          "kr": "여왕의 중압감",
          "fr": "Étau de reine",
          "de": "Königinnenpresse",
          "es": "Prensa soberana"
        },
        "damage": "magic",
        "base": 525,
        "hitDamage": [
          33, 33, 34
        ],
        "castTime": 190,
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          140, 30, 30
        ],
        "offset": 14
      },
      {
        "id": 227774,
        "names": {
          "en": "Victory Sword",
          "tw": "勝利之劍",
          "kr": "승리의 검격",
          "fr": "Épée victorieuse",
          "de": "Siegesschwert",
          "es": "Espada victoriosa"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          5.333333333333334, 5.333333333333334, 5.333333333333334, 5.333333333333334, 5.333333333333334, 6.666666666666668, 66.66666666666667
        ],
        "dualable": false,
        "framesList": [
          14, 8, 6, 10, 8, 8, 8
        ],
        "offset": 8
      },
      {
        "id": 227775,
        "names": {
          "en": "Heavenly Punishment",
          "tw": "天國制裁",
          "kr": "천벌",
          "fr": "Punition divine",
          "de": "Strafe des Himmels",
          "es": "Castigo divino"
        },
        "damage": "magic",
        "base": 1200,
        "hitDamage": [
          7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 9
        ],
        "castTime": 5,
        "dualable": false,
        "framesList": [
          7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 330000207,
        "names": {
          "en": "Ether Strike",
          "tw": "以太強擊",
          "kr": "에테르 스트라이크",
          "fr": "Fulgurance d'éther",
          "de": "Ätherschlag",
          "es": "Golpe etéreo"
        },
        "damage": "magic",
        "base": 3000,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "framesList": [
          460
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          227763,
          227764,
          227765,
          227769,
          227770,
          227771,
          227774,
          227775
        ]
      }
    ]
  },
  {
    "id": 181,
    "names": {
      "en": "Lenneth",
      "tw": "蕾娜絲",
      "kr": "레나스"
    },
    "abilities": [
      {
        "id": 227732,
        "names": {
          "en": "Bolt Slash",
          "tw": "迅箭斬",
          "kr": "번개의 참격",
          "fr": "Taillade fulgurante",
          "de": "Zerfetzender Blitz",
          "es": "Corte de rayo"
        },
        "base": 230,
        "hitDamage": [
          100
        ],
        "castTime": 10,
        "framesList": [
          12
        ],
        "offset": 14
      },
      {
        "id": 227734,
        "names": {
          "en": "Spread Shot",
          "tw": "擴散射擊",
          "kr": "확산 사격",
          "fr": "Tir diffus",
          "de": "Streuschuss",
          "es": "Tiro de largo alcance"
        },
        "base": 350,
        "hitDamage": [
          50, 50
        ],
        "castTime": 40,
        "framesList": [
          52, 10
        ],
        "offset": 14
      },
      {
        "id": 227735,
        "names": {
          "en": "Moment Slide",
          "tw": "瞬時斬",
          "kr": "찰나의 맹습",
          "fr": "Glissement fugace",
          "de": "Schnelles Gleiten",
          "es": "Ataque reptante"
        },
        "base": 130,
        "hitDamage": [
          100
        ],
        "framesList": [
          12
        ],
        "offset": 8
      },
      {
        "id": 227737,
        "names": {
          "en": "Tri-Blast",
          "tw": "三重爆發",
          "kr": "삼연속 폭격",
          "fr": "Triple déflagration",
          "de": "Dreierschuss",
          "es": "Ráfaga triple"
        },
        "base": 170,
        "hitDamage": [
          33, 33, 34
        ],
        "castTime": 40,
        "framesList": [
          42, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 227738,
        "names": {
          "en": "Vertical Raid",
          "tw": "縱向突襲",
          "kr": "버티컬 레이드",
          "fr": "Raid vertical",
          "de": "Vertikaler Angriff",
          "es": "Asalto vertical"
        },
        "base": 280,
        "hitDamage": [
          50, 50
        ],
        "castTime": 10,
        "framesList": [
          12, 8
        ],
        "offset": 14
      },
      {
        "id": 227743,
        "names": {
          "en": "Infinity Blast",
          "tw": "無限衝擊",
          "kr": "무한 폭격",
          "fr": "Impact infini",
          "de": "Endlosschuss",
          "es": "Ráfaga infinita"
        },
        "base": 320,
        "hitDamage": [
          25, 25, 25, 25
        ],
        "castTime": 40,
        "framesList": [
          52, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 227747,
        "names": {
          "en": "Glowing Pierce",
          "tw": "灼光之槍",
          "kr": "섬광 찌르기",
          "fr": "Percée éblouissante",
          "de": "Durchbohrung",
          "es": "Zambullida"
        },
        "base": 200,
        "hitDamage": [
          14, 14, 14, 14, 14, 15, 15
        ],
        "castTime": 1,
        "ignore": 50,
        "debuffs": [
          {
            "type": "light",
            "value": 60
          },
          {
            "type": "dark",
            "value": 60
          }
        ],
        "framesList": [
          2, 8, 8, 8, 8, 8, 8
        ],
        "offset": 14
      },
      {
        "id": 227750,
        "names": {
          "en": "Code Break",
          "tw": "代碼破壞",
          "kr": "코드 브레이크",
          "fr": "Craquage de code",
          "de": "Codebrecher",
          "es": "Rompecódigo"
        },
        "base": 750,
        "hitDamage": [
          100
        ],
        "castTime": 24,
        "framesList": [
          38
        ],
        "offset": 14
      },
      {
        "id": 227751,
        "names": {
          "en": "Ethereal Shot",
          "tw": "空靈射擊",
          "kr": "환상의 사격",
          "fr": "Tir éthéré",
          "de": "Ätherschuss",
          "es": "Tiro etéreo"
        },
        "base": 840,
        "hitDamage": [
          25, 25, 25, 25
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "framesList": [
          90, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 227752,
        "names": {
          "en": "Radiant White Wings",
          "tw": "閃耀白翼",
          "kr": "흰 날개의 광휘",
          "fr": "Ailes blanches radieuses",
          "de": "Gleißende Weiße Flügel",
          "es": "Alas blancas resplandecientes"
        },
        "base": 1000,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "castTime": 5,
        "debuffs": [
          {
            "type": "light",
            "value": 100
          },
          {
            "type": "dark",
            "value": 100
          }
        ],
        "framesList": [
          26, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8
        ],
        "offset": 14
      },
      {
        "id": 330000107,
        "names": {
          "en": "Nibelung Valesti",
          "tw": "尼伯龍根之裁",
          "kr": "니벨룽 발레스티",
          "de": "Nibelungen Valesti"
        },
        "base": 2000,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 20, 40
        ],
        "dualable": false,
        "framesList": [
          98, 16, 11, 12, 6, 24, 32, 28, 230, 53
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          227732,
          227735,
          227738,
          227747,
          227750,
          227752,
          227734,
          227737,
          227743,
          227751
        ]
      }
    ]
  },
  {
    "id": 182,
    "names": {
      "en": "Machina",
      "tw": "馬其納",
      "kr": "마키나"
    },
    "abilities": [
      {
        "id": 228313,
        "names": {
          "en": "Dark Side",
          "tw": "黑暗面",
          "kr": "다크 사이드",
          "fr": "Sphère sombre",
          "de": "Dunkle Macht",
          "es": "Manto de Érebo"
        },
        "base": 400,
        "hitDamage": [
          15, 15, 15, 15, 15
        ],
        "castTime": 12,
        "elements": [
          "dark"
        ],
        "framesList": [
          32, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 228312,
        "names": {
          "en": "Siphon Sword",
          "tw": "吸能劍",
          "kr": "드레인 소드",
          "fr": "Lame vampirique",
          "de": "Subvitaschwert",
          "es": "Filo drenador"
        },
        "base": 150,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 2,
        "framesList": [
          4, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 20220,
        "names": {
          "en": "Thundaga",
          "tw": "大雷電",
          "kr": "선더가",
          "fr": "Foudre X",
          "de": "Blitzga",
          "es": "Electro++"
        },
        "damage": "magic",
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "framesList": [
          70
        ],
        "offset": 14
      },
      {
        "id": 228311,
        "names": {
          "en": "Stunning Slash",
          "tw": "眩暈劍",
          "kr": "스턴 블레이드",
          "fr": "Lame assommante",
          "de": "Betäubungshieb",
          "es": "Táser"
        },
        "base": 300,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 2,
        "framesList": [
          4, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 228310,
        "names": {
          "en": "Element Eiger",
          "tw": "元素巔峰",
          "kr": "엘리멘트 아이거",
          "fr": "Élément d'Eiger",
          "es": "Elemento de Eiger"
        },
        "base": 520,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          },
          {
            "type": "ice",
            "value": 60
          },
          {
            "type": "lightning",
            "value": 60
          }
        ],
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ],
        "offset": 14
      },
      {
        "id": 508511,
        "names": {
          "en": "Rush Blade",
          "tw": "衝鋒劍",
          "kr": "러쉬 블레이드",
          "fr": "Lame de Fougue",
          "de": "Hastklinge",
          "es": "Hoja veloz"
        },
        "base": 500,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "ignore": 50,
        "framesList": [
          14, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 8
      },
      {
        "id": 254001807,
        "names": {
          "en": "Cyclone Drive",
          "tw": "迴旋猛擊",
          "kr": "스핀 드라이브",
          "fr": "Vrilles",
          "de": "Zyklonantrieb",
          "es": "Estoque tornado"
        },
        "base": 700,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 45
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          132, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
        ],
        "offset": 8
      }
    ]
  },
  {
    "id": 183,
    "names": {
      "en": "Kurasame",
      "tw": "暮雨",
      "kr": "쿠라사메"
    },
    "abilities": [
      {
        "id": 228335,
        "names": {
          "en": "Blizzaja Sword",
          "tw": "強暴雪劍",
          "kr": "블리자쟈 검",
          "fr": "Épée glace max",
          "de": "Eiska-Schwert",
          "es": "Espada Hielo+++"
        },
        "damage": "hybrid",
        "base": 800,
        "hitDamage": [
          100
        ],
        "elements": [
          "ice"
        ],
        "framesList": [
          200
        ],
        "offset": 8
      },
      {
        "id": 20210,
        "names": {
          "en": "Blizzaga",
          "tw": "大暴雪",
          "kr": "블리자가",
          "fr": "Glace X",
          "de": "Eisga",
          "es": "Hielo++"
        },
        "damage": "magic",
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          150
        ],
        "offset": 14
      },
      {
        "id": 228332,
        "names": {
          "en": "Zekken - Freezing Showers",
          "tw": "絕劍·冰雨",
          "kr": "절검·얼음비",
          "fr": "Zekken - Douches gelées",
          "de": "Zekken - Eiskalter Schauer",
          "es": "Zekken - Tromba de granizo"
        },
        "damage": "hybrid",
        "base": 700,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "elements": [
          "ice"
        ],
        "framesList": [
          42, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "offset": 8
      },
      {
        "id": 228331,
        "names": {
          "en": "Zekken - Cloudless Rain",
          "tw": "絕劍·天泣",
          "kr": "절검·맑은비",
          "fr": "Zekken - Pluie sans nuage",
          "de": "Zekken - Wolkenloser Regen",
          "es": "Zekken - Lluvia de cielo despejado"
        },
        "damage": "hybrid",
        "base": 700,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "elements": [
          "water"
        ],
        "framesList": [
          32, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "offset": 8
      },
      {
        "id": 508520,
        "names": {
          "en": "Zekken - Twilight Rain",
          "tw": "絕劍·暮雨",
          "kr": "절검·저녁비",
          "fr": "Zekken - Pluie du crépuscule",
          "de": "Zekken - Regen im Zwielicht",
          "es": "Zekken - Lluvia del crepúsculo"
        },
        "damage": "hybrid",
        "base": 2400,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 34
        ],
        "castTime": 20,
        "framesList": [
          22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20
        ],
        "offset": 14
      },
      {
        "id": 228333,
        "names": {
          "en": "Zekken - Sudden Downpour",
          "tw": "絕劍·驟雨",
          "kr": "절검·소나기",
          "fr": "Zekken - Averse soudaine",
          "de": "Zekken - Plötzlicher Niederschlag",
          "es": "Zekken - Aguacero inesperado"
        },
        "damage": "hybrid",
        "base": 1260,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 20,
        "framesList": [
          22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20
        ],
        "offset": 14
      },
      {
        "id": 20300,
        "names": {
          "en": "Blizzaja",
          "tw": "強暴雪",
          "kr": "블리자쟈",
          "fr": "Glace max",
          "de": "Eiska",
          "es": "Hielo+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          240
        ],
        "offset": 14
      },
      {
        "id": 508525,
        "names": {
          "en": "Thrust of Death",
          "tw": "死神刺突",
          "kr": "사신의 찌르기",
          "fr": "Coup mortel",
          "de": "Stoß des Todes",
          "es": "Estocada mortífera"
        },
        "base": 300,
        "hitDamage": [
          100
        ],
        "framesList": [
          5
        ],
        "offset": 8
      },
      {
        "id": 900000297,
        "names": {
          "en": "Absolute Zero + 1",
          "tw": "絕對零度 + 1",
          "kr": "절대 영도 + 1",
          "fr": "Zéro absolu + 1",
          "de": "Absoluter Nullpunkt + 1",
          "es": "Cero absoluto + 1"
        },
        "damage": "hybrid",
        "base": 3000,
        "hitDamage": [
          100
        ],
        "elements": [
          "ice"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "ice",
            "value": 100
          }
        ],
        "framesList": [
          176,
          0
        ],
        "offset": 8
      },
      {
        "id": 508524,
        "names": {
          "en": "Diamond Rain",
          "tw": "鑽石之雨",
          "kr": "다이아몬드 레인",
          "fr": "Pluie de diamant",
          "de": "Diamantregen",
          "es": "Lluvia de diamantes"
        },
        "damage": "hybrid",
        "base": 5400,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13
        ],
        "elements": [
          "ice"
        ],
        "framesList": [
          2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "offset": 8
      },
      {
        "id": 228342,
        "names": {
          "en": "Intimidating Stance",
          "tw": "恫嚇體勢",
          "kr": "중단세",
          "fr": "Pose d'intimidation",
          "de": "Einschüchternde Stellung",
          "es": "Aire intimidante"
        },
        "damage": "magic",
        "base": 2,
        "hitDamage": [],
        "dualable": false,
        "ignore": null,
        "framesList": [],
        "offset": 8
      },
      {
        "id": 254001907,
        "names": {
          "en": "Absolute Zero",
          "tw": "絕對零度",
          "kr": "절대 영도",
          "fr": "Zéro absolu",
          "de": "Absoluter Nullpunkt",
          "es": "Cero absoluto"
        },
        "damage": "hybrid",
        "base": 3000,
        "hitDamage": [
          100
        ],
        "elements": [
          "ice"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "ice",
            "value": 100
          }
        ],
        "framesList": [
          176,
          0
        ],
        "offset": 8
      }
    ],
    "multipleBlack": 2,
    "multipleWhite": 2,
    "multipleGreen": 2,
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          228331,
          228332,
          228333,
          508520
        ]
      }
    ]
  },
  {
    "id": 184,
    "names": {
      "en": "Beryl",
      "tw": "貝利爾",
      "kr": "베릴"
    },
    "abilities": [
      {
        "id": 911568,
        "names": {
          "en": "Exposed Guilt",
          "tw": "歉疚暴露",
          "kr": "드러난 유죄",
          "fr": "Culpabilité avérée",
          "de": "Bloßgelegte Schuld",
          "es": "Culpa al descubierto"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          100
        ],
        "framesList": [
          40
        ],
        "offset": 8
      },
      {
        "id": 911569,
        "names": {
          "en": "Exposed Sins",
          "tw": "罪孽暴露",
          "kr": "드러난 죄악",
          "fr": "Péchés avérés",
          "de": "Bloßgelegte Sünden",
          "es": "Pecados al descubierto"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          100
        ],
        "framesList": [
          40
        ],
        "offset": 8
      },
      {
        "id": 911580,
        "names": {
          "en": "Heaven - Penance Poke",
          "tw": "天堂-苦修猛擊",
          "kr": "천국·속죄",
          "fr": "Paradis - Frappe de pénitence",
          "de": "Himmel - Strafstups",
          "es": "Cielo - Toque de penitencia"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 58
        ],
        "castTime": 40,
        "ignore": 50,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 911582,
        "names": {
          "en": "Heaven - Judgement",
          "tw": "天堂-審判",
          "kr": "천국·심판",
          "fr": "Paradis - Jugement",
          "de": "Himmel - Urteil",
          "es": "Cielo - Juicio"
        },
        "damage": "magic",
        "base": 840,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "framesList": [
          40
        ],
        "offset": 14
      },
      {
        "id": 911583,
        "names": {
          "en": "Heaven - Force of Light",
          "tw": "天堂-光之力",
          "kr": "천국·빛의 힘",
          "fr": "Paradis - Force de lumière",
          "de": "Himmel - Macht des Lichts",
          "es": "Hocicazo - Fuerza lumínica"
        },
        "damage": "magic",
        "base": 480,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "debuffs": [
          {
            "type": "light",
            "value": 60
          }
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 911586,
        "names": {
          "en": "Heaven - Ye Not Guilty",
          "tw": "天堂-汝等無罪",
          "kr": "천국·무죄",
          "fr": "Paradis - Non coupable",
          "de": "Himmel - Bist frei von Schuld",
          "es": "Cielo - Sin culpa"
        },
        "damage": "magic",
        "base": 1050,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 50,
        "framesList": [
          52, 20, 20, 20, 20
        ],
        "offset": 14
      },
      {
        "id": 911589,
        "names": {
          "en": "Born to Die - Heaven Mode",
          "tw": "生來而亡-天堂模式",
          "kr": "본 투 다이·천국 모드",
          "fr": "Né pour mourir - Mode paradisiaque",
          "de": "Geboren zu Sterben - Himmelmodus",
          "es": "Nacido para morir - Modo celestial"
        },
        "damage": "magic",
        "base": 1200,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "debuffs": [
          {
            "type": "light",
            "value": 100
          }
        ],
        "framesList": [
          40
        ],
        "offset": 14
      },
      {
        "id": 401004807,
        "names": {
          "en": "Final Doink",
          "tw": "最終菜刀戳",
          "kr": "마지막 칼질",
          "fr": "Coup éreintant",
          "de": "Letzter Streich",
          "es": "Golpe agotador"
        },
        "damage": "magic",
        "base": 1530,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "framesList": [
          130
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          911580,
          911582,
          911583,
          911586,
          911589
        ]
      }
    ]
  },
  {
    "id": 185,
    "names": {
      "en": "Ellesperis",
      "tw": "艾莉絲珮芮絲",
      "kr": "엘레스페리스"
    },
    "abilities": [
      {
        "id": 911600,
        "names": {
          "en": "Blood Twirl",
          "tw": "血之螺旋",
          "kr": "피의 소용돌이",
          "fr": "Tourbillon sanglant",
          "de": "Blutspirale",
          "es": "Coágulo"
        },
        "base": 240,
        "hitDamage": [
          100
        ],
        "framesList": [
          0
        ],
        "offset": 8
      },
      {
        "id": 911602,
        "names": {
          "en": "Open You Up",
          "tw": "空門大開",
          "kr": "마음을 열어라",
          "fr": "Ouvrez grand",
          "de": "Aufreißer",
          "es": "Abrelotodo"
        },
        "base": 350,
        "hitDamage": [
          100
        ],
        "framesList": [
          0
        ],
        "offset": 8
      },
      {
        "id": 911608,
        "names": {
          "en": "Vengeful Blade",
          "tw": "報復之刃",
          "kr": "복수의 칼날",
          "fr": "Lame vengeresse",
          "de": "Racheklinge",
          "es": "Hoja vengativa"
        },
        "base": 300,
        "hitDamage": [
          100
        ],
        "castTime": 30,
        "framesList": [
          0
        ],
        "offset": 14
      },
      {
        "id": 911612,
        "names": {
          "en": "Forced Transfusion",
          "tw": "強迫輸血",
          "kr": "강제 투입",
          "fr": "Transfusion forcée",
          "de": "Erzwungene Transfusion",
          "es": "Transfusión forzosa"
        },
        "base": 210,
        "hitDamage": [
          100
        ],
        "framesList": [
          40
        ],
        "offset": 8
      },
      {
        "id": 911615,
        "names": {
          "en": "Human Splitter",
          "tw": "人類綻裂者",
          "kr": "인간 분열",
          "fr": "Fléau d'humain",
          "de": "Menschensplitter",
          "es": "Partehumanos"
        },
        "base": 480,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 911616,
        "names": {
          "en": "Demon Splitter",
          "tw": "惡魔綻裂者",
          "kr": "악마 분열",
          "fr": "Fléau de démon",
          "de": "Dämonensplitter",
          "es": "Partedemonios"
        },
        "base": 480,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 911618,
        "names": {
          "en": "Blood Sacrifice",
          "tw": "鮮血獻祭",
          "kr": "피의 희생",
          "fr": "Sacrifice de sang",
          "de": "Blutopfer",
          "es": "Sacrificio de sangre"
        },
        "base": 430,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 58
        ],
        "castTime": 40,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 911620,
        "names": {
          "en": "Hemomancer's Strike",
          "tw": "血巫師之擊",
          "kr": "헤모맨서의 타격",
          "fr": "Frappe d'hémomancienne",
          "de": "Streich des Blutmagiers",
          "es": "Golpe de hemomante"
        },
        "base": 1250,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10
        ],
        "castTime": 40,
        "framesList": [
          80, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 401004707,
        "names": {
          "en": "The Thirst",
          "tw": "飢渴",
          "kr": "갈증",
          "fr": "La soif",
          "de": "Der Durst",
          "es": "Sed intensa"
        },
        "base": 945,
        "hitDamage": [
          68.25396825396825,
          31.74603174603175
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          190,
          20
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          911600,
          911602,
          911608,
          911612,
          911615,
          911616,
          911618
        ]
      }
    ]
  },
  {
    "id": 186,
    "names": {
      "en": "Gladiolus",
      "tw": "格拉迪歐藍斯",
      "kr": "글라디올러스"
    },
    "abilities": [
      {
        "id": 216070,
        "names": {
          "en": "Tempest",
          "tw": "風暴掃擊",
          "kr": "템페스트",
          "fr": "Tourbillon",
          "de": "Sturm",
          "es": "Tempestad"
        },
        "base": 180,
        "hitDamage": [
          25,
          75
        ],
        "castTime": 40,
        "framesList": [
          42,
          50
        ],
        "offset": 14
      },
      {
        "id": 216080,
        "names": {
          "en": "Dawnhammer",
          "tw": "破曉強擊",
          "kr": "던 브레이커",
          "fr": "Fendeur de l'aube",
          "de": "Dämmerbrecher",
          "es": "Filo del alba"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "ignore": 50,
        "framesList": [
          50
        ],
        "offset": 8
      },
      {
        "id": 216140,
        "names": {
          "en": "Reflex",
          "tw": "識破",
          "kr": "간파",
          "fr": "Réflexe",
          "es": "Todo o nada"
        },
        "base": 20,
        "hitDamage": [],
        "dualable": false,
        "framesList": [],
        "offset": 8
      },
      {
        "id": 216090,
        "names": {
          "en": "Cyclone",
          "tw": "颶風",
          "kr": "사이클론",
          "de": "Zyklon",
          "es": "Ciclón"
        },
        "base": 250,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "framesList": [
          2, 45, 30, 30, 45
        ],
        "offset": 8
      },
      {
        "id": 507990,
        "names": {
          "en": "Maelstrom",
          "tw": "動亂",
          "kr": "업히벌",
          "fr": "Tourbillon",
          "de": "Orkan",
          "es": "Guardián infinito"
        },
        "base": 1000,
        "hitDamage": [
          100
        ],
        "castTime": 86,
        "framesList": [
          92
        ],
        "offset": 14
      },
      {
        "id": 507991,
        "names": {
          "en": "Dual Master",
          "tw": "二天一流",
          "kr": "이천일류",
          "fr": "Double lame",
          "de": "Klingentanz",
          "es": "Musashi"
        },
        "base": 1800,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 40
        ],
        "framesList": [
          36, 7, 7, 7, 6, 8, 17
        ],
        "offset": 8
      },
      {
        "id": 227551,
        "names": {
          "en": "Razor Edge",
          "tw": "回轉刀刃",
          "kr": "오비탈 엣지",
          "fr": "Fauchage",
          "de": "Kreisklinge",
          "es": "Furia del acero"
        },
        "base": 900,
        "hitDamage": [
          100
        ],
        "framesList": [
          4
        ],
        "offset": 8
      },
      {
        "id": 215000207,
        "names": {
          "en": "Impulse",
          "tw": "增幅衝擊",
          "kr": "라이징 임펄스",
          "fr": "Éradication",
          "de": "Steigender Impuls",
          "es": "Erradicación"
        },
        "base": 595,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          200
        ],
        "offset": 8
      },
      {
        "id": 900000127,
        "names": {
          "en": "Impulse + 1",
          "tw": "增幅衝擊 + 1",
          "kr": "라이징 임펄스 + 1",
          "fr": "Éradication + 1",
          "de": "Steigender Impuls + 1",
          "es": "Erradicación + 1"
        },
        "base": 620,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          200
        ],
        "offset": 8
      }
    ]
  },
  {
    "id": 187,
    "names": {
      "en": "Elfreeda",
      "tw": "艾爾弗里德",
      "kr": "엘프리데",
      "de": "Elfriede"
    },
    "abilities": [
      {
        "id": 215010,
        "names": {
          "en": "Frozen Blade",
          "tw": "冰凍劍",
          "kr": "프로즌 블레이드",
          "fr": "Lame gelée",
          "de": "Frierklinge",
          "es": "Cuchilla congelante"
        },
        "base": 300,
        "hitDamage": [
          100
        ],
        "elements": [
          "ice"
        ],
        "framesList": [
          120
        ],
        "offset": 8
      },
      {
        "id": 215020,
        "names": {
          "en": "Icicle Storm",
          "tw": "冰凌風暴",
          "kr": "아이시클 스톰",
          "fr": "Tempête de stalactites",
          "de": "Eiszapfensturm",
          "es": "Tormenta de témpanos"
        },
        "base": 200,
        "hitDamage": [
          50,
          50
        ],
        "elements": [
          "ice"
        ],
        "framesList": [
          30,
          30
        ],
        "offset": 8
      },
      {
        "id": 20210,
        "names": {
          "en": "Blizzaga",
          "tw": "大暴雪",
          "kr": "블리자가",
          "fr": "Glace X",
          "de": "Eisga",
          "es": "Hielo++"
        },
        "damage": "magic",
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          150
        ],
        "offset": 14
      },
      {
        "id": 215030,
        "names": {
          "en": "Frostbite",
          "tw": "冰霜痛擊",
          "kr": "동상",
          "fr": "Gelure",
          "de": "Frostbiss",
          "es": "Frío quemador"
        },
        "base": 450,
        "hitDamage": [50, 50],
        "castTime": 100,
        "offset": 14,
        "debuffs": [
          {
            "type": "ice",
            "value": 50
          }
        ],
        "framesList": [10, 70]
      },
      {
        "id": 215031,
        "names": {
          "en": "Frostbite + 2",
          "tw": "冰霜痛擊 + 2",
          "kr": "동상 + 2",
          "fr": "Gelure + 2",
          "de": "Frostbiss + 2",
          "es": "Frío quemador + 2"
        },
        "base": 600,
        "hitDamage": [50, 50],
        "castTime": 100,
        "offset": 14,
        "debuffs": [
          {
            "type": "ice",
            "value": 75
          }
        ],
        "framesList": [10, 70]
      },
      {
        "id": 227523,
        "names": {
          "en": "Empyrean Frost Arrow",
          "tw": "天穹冰矢",
          "kr": "창공의 서리활",
          "fr": "Flèche de glace divine",
          "de": "Himmlischer Eispfeil",
          "es": "Flecha gélida del empíreo"
        },
        "base": 600,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "castTime": 40,
        "elements": [
          "ice"
        ],
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
        ],
        "offset": 14
      },
      {
        "id": 100009807,
        "names": {
          "en": "Skating Heart",
          "tw": "滑冰之心",
          "kr": "스케이팅 하트",
          "fr": "Cœur glissant",
          "de": "Gleitendes Herz",
          "es": "Espíritu patinador"
        },
        "base": 700,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "elements": [
          "ice"
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          28, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8
        ],
        "offset": 8
      }
    ]
  },
  {
    "id": 188,
    "names": {
      "en": "Aurora Fryevia",
      "tw": "極光弗雷比亞",
      "kr": "오로라 프레이비아",
      "fr": "Fryevia de l'Aurore"
    },
    "abilities": [
      {
        "id": 911642,
        "names": {
          "en": "Flash - Luster",
          "tw": "閃光・光澤",
          "kr": "섬광·광채",
          "fr": "Flash - Éclat",
          "de": "Blitz - Glanz",
          "es": "Destello - Resplandor"
        },
        "damage": "hybrid",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 20,
        "elements": [
          "light"
        ],
        "framesList": [
          34
        ],
        "offset": 14
      },
      {
        "id": 911643,
        "names": {
          "en": "Purge",
          "tw": "釋放",
          "kr": "숙청",
          "de": "Reinigung",
          "es": "Purga"
        },
        "damage": "hybrid",
        "base": 400,
        "hitDamage": [
          100
        ],
        "castTime": 10,
        "framesList": [
          12
        ],
        "offset": 14
      },
      {
        "id": 911645,
        "names": {
          "en": "Flash - Brilliance",
          "tw": "閃光・輝煌",
          "kr": "섬광·광휘",
          "fr": "Flash - Brillance",
          "de": "Blitz - Brillanz",
          "es": "Destello - Fulgor"
        },
        "damage": "hybrid",
        "base": 600,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ],
        "offset": 14
      },
      {
        "id": 911651,
        "names": {
          "en": "Flash - Dazzle",
          "tw": "閃光・奪目",
          "kr": "섬광·황홀",
          "fr": "Flash - Reflet",
          "de": "Blitz - Blenden",
          "es": "Destello - Obnubilación"
        },
        "damage": "hybrid",
        "base": 1100,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 911654,
        "names": {
          "en": "Flash - Endless Punishment",
          "tw": "閃光・無盡懲罰",
          "kr": "섬광·영원한 형벌",
          "fr": "Flash - Punition éternelle",
          "de": "Blitz - Endlose Bestrafung",
          "es": "Destello - Castigo infinito"
        },
        "damage": "hybrid",
        "base": 750,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "offset": 14
      },
      {
        "id": 911657,
        "names": {
          "en": "Flash - Furious Radiance",
          "tw": "閃光・強烈光輝",
          "kr": "섬광·맹렬한 빛",
          "fr": "Flash - Rayonnement furieux",
          "de": "Blitz - Zorniger Glanz",
          "es": "Destello - Resplandor colérico"
        },
        "damage": "hybrid",
        "base": 1400,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "debuffs": [
          {
            "type": "light",
            "value": 100
          }
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 911665,
        "names": {
          "en": "Aurora Storm",
          "tw": "極光風暴",
          "kr": "극광의 폭풍",
          "fr": "Tempête de l'Aurore",
          "de": "Aurora-Sturm",
          "es": "Tormenta del alba"
        },
        "damage": "hybrid",
        "base": 1500,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "castTime": 40,
        "elements": [
          "ice",
          "light"
        ],
        "framesList": [
          42, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "offset": 14
      },
      {
        "id": 911660,
        "names": {
          "en": "First Light",
          "tw": "初始之光",
          "kr": "여명",
          "fr": "Premières lueurs",
          "de": "Erstes Licht",
          "es": "Primeros albores"
        },
        "damage": "hybrid",
        "base": 4000,
        "hitDamage": [
          100
        ],
        "framesList": [
          130
        ],
        "offset": 8
      },
      {
        "id": 401006407,
        "names": {
          "en": "Judge and Jury",
          "tw": "法官與陪審員",
          "kr": "판사와 배심원",
          "fr": "Seule juge",
          "de": "Alleiniger Richter",
          "es": "Jueza y jurado"
        },
        "damage": "hybrid",
        "base": 2720,
        "hitDamage": [
          2, 2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8
        ],
        "dualable": false,
        "framesList": [
          60, 10, 48, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          911642,
          911645,
          911651,
          911654,
          911657,
          911665
        ]
      }
    ],
    dual: false
  },
  {
    "id": 189,
    "names": {
      "en": "Sieghard",
      "tw": "吉克哈特",
      "kr": "지크하르트"
    },
    "abilities": [
      {
        "id": 228403,
        "names": {
          "en": "Mind Charm",
          "tw": "D·精神魅惑",
          "kr": "D·정신적 매혹",
          "fr": "Charme de l'esprit",
          "de": "Geistiger Charme",
          "es": "Embrujo mental"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "framesList": [
          92
        ],
        "offset": 14
      },
      {
        "id": 228417,
        "names": {
          "en": "Dangerous Rose",
          "tw": "D·危險玫瑰",
          "kr": "D·위험한 장미",
          "fr": "Rose dangereuse",
          "de": "Gefährliche Rose",
          "es": "Rosa peligrosa"
        },
        "base": 280,
        "hitDamage": [
          12, 12, 12, 12, 12, 12, 12, 16
        ],
        "castTime": 40,
        "framesList": [
          42, 8, 8, 8, 8, 8, 8, 8
        ],
        "offset": 14
      },
      {
        "id": 20340,
        "names": {
          "en": "Stonja",
          "tw": "強落石",
          "kr": "스톤쟈",
          "fr": "Terre max",
          "de": "Terraka",
          "es": "Piedra+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "earth"
        ],
        "dualable": false,
        "framesList": [
          170
        ],
        "offset": 14
      },
      {
        "id": 228402,
        "names": {
          "en": "Block Charm",
          "tw": "D·防禦魅惑",
          "kr": "D·방어적 매혹",
          "fr": "Charme du physique",
          "de": "Entwaffnender Charme",
          "es": "Bloquear embrujo"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "framesList": [
          92
        ],
        "offset": 14
      },
      {
        "id": 228404,
        "names": {
          "en": "Full Break Charm",
          "tw": "D·身心潰擊魅惑",
          "kr": "D·풀 브레이크적 매혹",
          "fr": "Charme dévastateur",
          "de": "Vernichtender Charme",
          "es": "Embrujo rompetodo"
        },
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "framesList": [
          92
        ],
        "offset": 14
      },
      {
        "id": 508574,
        "names": {
          "en": "Earthbound",
          "tw": "地縛",
          "kr": "지상의 속박",
          "fr": "Terre-à-terre",
          "de": "Erdgebunden",
          "es": "Vínculo terrenal"
        },
        "base": 200,
        "hitDamage": [
          14, 14, 14, 14, 14, 15, 15
        ],
        "debuffs": [
          {
            "type": "earth",
            "value": 100
          }
        ],
        "framesList": [
          2, 8, 8, 8, 8, 8, 8
        ],
        "offset": 8
      },
      {
        "id": 100017907,
        "names": {
          "en": "Beauteous Sanctuary",
          "tw": "美若聖域",
          "kr": "미의 성역",
          "fr": "Sanctuaire de la beauté suprême",
          "de": "Hinreißendes Heiligtum",
          "es": "Santuario de la belleza"
        },
        "base": 1690,
        "hitDamage": [
          30, 30, 40
        ],
        "dualable": false,
        "framesList": [
          4, 15, 15
        ],
        "offset": 8
      }
    ],
    dual: false
  },
  {
    "id": 190,
    "names": {
      "en": "Dietlinde",
      "tw": "底特瑞奇",
      "kr": "디트린데"
    },
    "abilities": [
      {
        "id": 228422,
        "names": {
          "en": "One-Shot Kill",
          "tw": "一槍斃命",
          "kr": "원 샷 킬",
          "fr": "Mort subite",
          "de": "Eine Kugel, ein Abschuss",
          "es": "Disparo mortal"
        },
        "base": 210,
        "hitDamage": [
          100
        ],
        "framesList": [
          85
        ],
        "offset": 8
      },
      {
        "id": 228424,
        "names": {
          "en": "Arm Snipe",
          "tw": "狙臂",
          "kr": "무장 저격",
          "fr": "Tir au bras",
          "de": "Armschuss",
          "es": "Disparo al brazo"
        },
        "base": 225,
        "hitDamage": [
          100
        ],
        "castTime": 10,
        "framesList": [
          65
        ],
        "offset": 14
      },
      {
        "id": 228425,
        "names": {
          "en": "Head Snipe",
          "tw": "狙頭",
          "kr": "머리 저격",
          "fr": "Tir à la tête",
          "de": "Kopfschuss",
          "es": "Disparo a la cabeza"
        },
        "base": 225,
        "hitDamage": [
          100
        ],
        "castTime": 10,
        "framesList": [
          85
        ],
        "offset": 14
      },
      {
        "id": 228421,
        "names": {
          "en": "Machine Gun Parasol",
          "tw": "陽傘機槍",
          "kr": "머신건 파라솔",
          "fr": "Parapluie mitrailleur",
          "de": "Maschinengewehrschirm",
          "es": "Parametralletas"
        },
        "base": 450,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 228420,
        "names": {
          "en": "Smartshot",
          "tw": "迅捷射擊",
          "kr": "스마트 샷",
          "fr": "Tir de précision",
          "de": "Gripsschuss",
          "es": "Tiro inteligente"
        },
        "base": 225,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "ignore": 50,
        "framesList": [
          100
        ],
        "offset": 14
      },
      {
        "id": 508581,
        "names": {
          "en": "My Fair Lady Gunner",
          "tw": "女槍手",
          "kr": "총잡이 숙녀",
          "fr": "La belle et le flingue",
          "de": "Holde Schützin<br>",
          "es": "Mi querida pistolera"
        },
        "base": 250,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "ignore": 50,
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 100018006,
        "names": {
          "en": "Lady's Bullet",
          "tw": "貴婦人的子彈",
          "kr": "미스트리스의 총탄",
          "fr": "Balle de dame",
          "de": "Damenhafte Kugel",
          "es": "Bala de señora"
        },
        "base": 740,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 60
        ],
        "dualable": false,
        "framesList": [
          66, 10, 10, 10, 10, 10, 10, 10, 65
        ],
        "offset": 8
      }
    ]
  },
  {
    "id": 191,
    "names": {
      "en": "Theobald",
      "tw": "迪奧巴特",
      "kr": "테오볼트"
    },
    "abilities": [
      {
        "id": 228431,
        "names": {
          "en": "Aqua Philosophy",
          "tw": "水之哲理",
          "kr": "물의 철학",
          "fr": "Philosophie aquatique",
          "de": "Aquatische Philosophie",
          "es": "Filosofía acuática"
        },
        "damage": "magic",
        "base": 280,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "water",
            "value": 50
          }
        ],
        "framesList": [
          40, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 20300,
        "names": {
          "en": "Blizzaja",
          "tw": "強暴雪",
          "kr": "블리자쟈",
          "fr": "Glace max",
          "de": "Eiska",
          "es": "Hielo+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "ice"
        ],
        "dualable": false,
        "framesList": [
          240
        ],
        "offset": 14
      },
      {
        "id": 20320,
        "names": {
          "en": "Waterja",
          "tw": "強流水",
          "kr": "워터쟈",
          "fr": "Eau max",
          "de": "Aquaka",
          "es": "Aqua+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          190
        ],
        "offset": 14
      },
      {
        "id": 20380,
        "names": {
          "en": "Flood",
          "tw": "洪水",
          "kr": "플러드",
          "fr": "Inondation",
          "de": "Flut",
          "es": "Inundación"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "water"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "lightning",
            "value": 50
          }
        ],
        "framesList": [
          133, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14
      },
      {
        "id": 228430,
        "names": {
          "en": "Aqua Authority",
          "tw": "水之權能",
          "kr": "물의 권세",
          "fr": "Autorité aquatique",
          "de": "Aquatische Autorität",
          "es": "Autoridad acuática"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          133, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14
      }
    ],
    "multipleBlack": 2,
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          228430,
          228431
        ]
      }
    ]
  },
  {
    "id": 192,
    "names": {
      "en": "Popstar Katy",
      "tw": "流行音樂巨星凱蒂",
      "kr": "팝스타 케이티",
      "es": "Estrella del pop Katy"
    },
    "abilities": [
      {
        "id": 911678,
        "names": {
          "en": "Command - Cue the Spotlight",
          "tw": "指令 - 聚光燈",
          "kr": "커맨드·스포트라이트 큐",
          "fr": "Ordre - Caler les lumières",
          "de": "Befehl - Rampenlicht-Einsatz",
          "es": "Orden - Hacia el foco"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 60,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "framesList": [
          40
        ],
        "offset": 14
      },
      {
        "id": 911679,
        "names": {
          "en": "Command - Bass Blast",
          "tw": "指令 - 重低音衝擊",
          "kr": "커맨드·베이스 소리",
          "fr": "Ordre - Explosion des basses",
          "de": "Befehl - Bassexplosion",
          "es": "Orden - Explosión de bajo"
        },
        "damage": "magic",
        "base": 275,
        "hitDamage": [
          10, 10, 15, 10, 10, 15, 10, 20
        ],
        "castTime": 40,
        "dualable": false,
        "framesList": [
          160, 22, 21, 22, 23, 23, 22, 23
        ],
        "offset": 14
      },
      {
        "id": 911681,
        "names": {
          "en": "Command - Backup Dancer Step",
          "tw": "指令 - 僕從拍掌",
          "kr": "커맨드·백댄서의 스텝",
          "fr": "Ordre - Pas de danseur",
          "de": "Befehl - Backup-Tanzschritt",
          "es": "Orden - Paso hacia atrás de bailarina"
        },
        "damage": "magic",
        "base": 300,
        "hitDamage": [
          50, 50
        ],
        "castTime": 30,
        "dualable": false,
        "framesList": [
          30, 25
        ],
        "offset": 14
      },
      {
        "id": 911684,
        "names": {
          "en": "Command - Backup Dancer Rush",
          "tw": "指令 - 僕從衝刺",
          "kr": "커맨드·백댄서의 분주함",
          "fr": "Ordre - Accélération de danseur",
          "de": "Befehl - Backup-Tanzsturm",
          "es": "Orden - Carrerilla hacia atrás de bailarina"
        },
        "damage": "magic",
        "base": 700,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "framesList": [
          50
        ],
        "offset": 8
      },
      {
        "id": 911692,
        "names": {
          "en": "Command - Showtime",
          "tw": "指令 - 開演",
          "kr": "커맨드·쇼타임",
          "fr": "Ordre - Lever de rideau",
          "de": "Befehl - Showtime",
          "es": "Orden - Comienza el espectáculo"
        },
        "damage": "magic",
        "base": 800,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "dualable": false,
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14
      },
      {
        "id": 401006307,
        "names": {
          "en": "Eye See You",
          "es": "¡Te veo!"
        },
        "damage": "magic",
        "base": 1540,
        "hitDamage": [
          30, 30, 40
        ],
        "dualable": false,
        "framesList": [
          250, 25, 40
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          911678,
          911679,
          911681,
          911684,
          911692
        ]
      }
    ]
  },
  {
    "id": 193,
    "names": {
      "en": "Tiana",
      "tw": "蒂安娜",
      "kr": "티아나"
    },
    "abilities": [
      {
        "id": 911733,
        "names": {
          "en": "Formula - Disastrous Wind",
          "tw": "公式 - 災害之風",
          "kr": "포뮬라·재앙의 바람",
          "fr": "Formule - Vent désastreux",
          "de": "Formel - Katastrophaler Wind",
          "es": "Fórmula - Viento huracanado"
        },
        "damage": "magic",
        "base": 500,
        "hitDamage": [
          100
        ],
        "castTime": 1,
        "elements": [
          "wind"
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ],
        "framesList": [
          82
        ],
        "offset": 14
      },
      {
        "id": 911747,
        "names": {
          "en": "Formula - Quaking Earth",
          "tw": "公式 - 顫動之土",
          "kr": "포뮬라·대지의 전율",
          "fr": "Formule - Terre tremblante",
          "de": "Formel - Bebende Erde",
          "es": "Fórmula - Seísmo"
        },
        "damage": "magic",
        "base": 1400,
        "hitDamage": [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "dualable": false,
        "framesList": [
          160, 22, 21, 22, 23, 23, 22, 23
        ],
        "offset": 14
      },
      {
        "id": 911736,
        "names": {
          "en": "Formula - Raging Fire",
          "tw": "公式 - 憤怒之火",
          "kr": "포뮬라·분노의 화염",
          "fr": "Formule - Feu ravageur",
          "de": "Formel - Tobendes Feuer",
          "es": "Fórmula - Fuego implacable"
        },
        "damage": "magic",
        "base": 550,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 50,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "framesList": [
          52, 20, 20, 20, 20
        ],
        "offset": 14
      },
      {
        "id": 911741,
        "names": {
          "en": "Formula - Troubled Water",
          "tw": "公式 - 憂愁之水",
          "kr": "포뮬라·거친 물살",
          "fr": "Formule - Eaux troubles",
          "de": "Formel - Aufgewühlte Gewässer",
          "es": "Fórmula - Aguas turbulentas"
        },
        "damage": "magic",
        "base": 350,
        "hitDamage": [
          50, 50
        ],
        "elements": [
          "water"
        ],
        "dualable": false,
        "framesList": [
          82, 10
        ],
        "offset": 8
      },
      {
        "id": 911742,
        "names": {
          "en": "Formula - Dreadful Lightning",
          "tw": "公式 - 恐懼之雷",
          "kr": "포뮬라·무시무시한 번개",
          "fr": "Formule - Foudre menaçante",
          "de": "Formel - Grässlicher Blitz",
          "es": "Fórmula - Rayo amenazador"
        },
        "damage": "magic",
        "base": 350,
        "hitDamage": [
          100
        ],
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "framesList": [
          92
        ],
        "offset": 8
      },
      {
        "id": 911750,
        "names": {
          "en": "Formula - Starfall",
          "tw": "公式 - 星隕",
          "kr": "포뮬라·쏟아지는 별",
          "fr": "Formule - Pluie stellaire",
          "de": "Formel - Sternfall",
          "es": "Fórmula - Lluvia de estrellas"
        },
        "damage": "magic",
        "base": 650,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "ignore": 50,
        "framesList": [
          120
        ],
        "offset": 14
      },
      {
        "id": 401006207,
        "names": {
          "en": "Accidental Mixture",
          "tw": "意外混合",
          "kr": "뜻밖의 혼합물",
          "fr": "Mélange accidentel",
          "de": "Zufallsmischung",
          "es": "Mezcla accidental"
        },
        "damage": "magic",
        "base": 1200,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          90
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 4,
        "abilities": [
          911747,
          911733,
          911736
        ]
      },
      {
        "count": 2,
        "abilities": [
          911741,
          911742,
          911750,
          911747,
          911733,
          911736
        ]
      }
    ]
  },
  {
    "id": 194,
    "names": {
      "en": "Felix",
      "tw": "菲利克斯",
      "kr": "펠릭스",
      "fr": "Félix",
      "es": "Félix"
    },
    "abilities": [
      {
        "id": 911701,
        "names": {
          "en": "Toy Pellet - Hail",
          "tw": "玩具碎片 - 冰雹",
          "kr": "장난감 총알·우박",
          "fr": "Balles en plastique - Grêle",
          "de": "Spielzeugschuss - Hagel",
          "es": "Balín de juguete - Granizo"
        },
        "damage": "hybrid",
        "base": 500,
        "hitDamage": [
          100
        ],
        "debuffs": [
          {
            "type": "earth",
            "value": 60
          }
        ],
        "framesList": [
          60
        ],
        "offset": 8
      },
      {
        "id": 911700,
        "names": {
          "en": "Toy Pellet - Ember",
          "tw": "玩具碎片 - 灰燼",
          "kr": "장난감 총알·장작",
          "fr": "Balles en plastique - Braise",
          "de": "Spielzeugschuss - Glut",
          "es": "Balín de juguete - Ascua"
        },
        "damage": "hybrid",
        "base": 500,
        "hitDamage": [
          100
        ],
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          }
        ],
        "framesList": [
          60
        ],
        "offset": 8
      },
      {
        "id": 911706,
        "names": {
          "en": "Toy Blaster",
          "tw": "玩具火焰發射器",
          "kr": "장난감 총잡이",
          "fr": "Petit canon",
          "de": "Spielzeugblaster",
          "es": "Cañón de juguete"
        },
        "damage": "hybrid",
        "base": 800,
        "hitDamage": [
          100
        ],
        "framesList": [
          60
        ],
        "offset": 8
      },
      {
        "id": 911708,
        "names": {
          "en": "Toy Rifle - Flora",
          "tw": "玩具步槍 - 植物",
          "kr": "장난감 소총·플로라",
          "fr": "Petit fusil - Flore",
          "de": "Spielzeuggewehr - Flora",
          "es": "Rifle de juguete - Flora"
        },
        "damage": "hybrid",
        "base": 1000,
        "hitDamage": [
          100
        ],
        "framesList": [
          60
        ],
        "offset": 8
      },
      {
        "id": 911727,
        "names": {
          "en": "Salute - Blade Rush",
          "tw": "敬禮 - 劍刃疾走",
          "kr": "경례·칼날 돌진",
          "fr": "Salut - Lame véloce",
          "de": "Salut - Klingenzorn",
          "es": "Saludo - Hoja veloz"
        },
        "damage": "hybrid",
        "base": 2400,
        "hitDamage": [
          25, 25, 25, 25
        ],
        "castTime": 40,
        "framesList": [
          10, 8, 9, 9
        ],
        "offset": 14
      },
      {
        "id": 911709,
        "names": {
          "en": "Toy Rifle - Fauna",
          "tw": "玩具步槍 - 動物",
          "kr": "장난감 소총·파우나",
          "fr": "Petit fusil - Faune",
          "de": "Spielzeuggewehr - Fauna",
          "es": "Rifle de juguete - Fauna"
        },
        "damage": "hybrid",
        "base": 1000,
        "hitDamage": [
          100
        ],
        "framesList": [
          60
        ],
        "offset": 8
      },
      {
        "id": 911710,
        "names": {
          "en": "Salute - Torch Lighting",
          "tw": "敬禮 - 點燃火把",
          "kr": "경례·횃불 빛",
          "fr": "Salut - Torche allumée",
          "de": "Salut - Fackelbeleuchtung",
          "es": "Saludo - Antorcha encendida"
        },
        "damage": "hybrid",
        "base": 580,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 58
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 911711,
        "names": {
          "en": "Salute - Perimeter Check",
          "tw": "敬禮 - 邊境巡查",
          "kr": "경례·주변 경계",
          "fr": "Salut - Ronde de surveillance",
          "de": "Salut - Umgebungspatrouille",
          "es": "Saludo - Ronda de valoración"
        },
        "damage": "hybrid",
        "base": 580,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 58
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 911731,
        "names": {
          "en": "Salute - Blade Storm",
          "tw": "敬禮 - 劍刃風暴",
          "kr": "경례·칼날 폭풍",
          "fr": "Salut - Tempête de lames",
          "de": "Salut - Klingensturm",
          "es": "Saludo - Tormenta de espadas"
        },
        "damage": "hybrid",
        "base": 950,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "offset": 14
      },
      {
        "id": 911717,
        "names": {
          "en": "Toy Pop Blast",
          "tw": "玩具爆炸衝擊",
          "kr": "장난감 폭발",
          "fr": "Avalanche de jouets",
          "de": "Spielzeugknaller",
          "es": "Avalancha de juguetes"
        },
        "damage": "hybrid",
        "base": 1000,
        "hitDamage": [
          100
        ],
        "debuffs": [
          {
            "type": "fire",
            "value": 75
          },
          {
            "type": "earth",
            "value": 75
          }
        ],
        "framesList": [
          60
        ],
        "offset": 8
      },
      {
        "id": 911723,
        "names": {
          "en": "Ember Blade Frenzy",
          "tw": "火劍亂舞",
          "kr": "화염검 난무",
          "fr": "Frénésie incandescente",
          "de": "Glutschwert-Raserei",
          "es": "Frenesí incandescente"
        },
        "damage": "hybrid",
        "base": 3200,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "framesList": [
          80, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 911725,
        "names": {
          "en": "Wooden Blade Frenzy",
          "tw": "木劍亂舞",
          "kr": "목판검 난무",
          "fr": "Pluie d'estocs en bois",
          "de": "Holzschwert-Raserei",
          "es": "Furor de espadas de madera"
        },
        "damage": "hybrid",
        "base": 3200,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "framesList": [
          80, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 401006107,
        "names": {
          "en": "Toy Volley Fire",
          "tw": "玩具齊射",
          "kr": "장난감 일제 사격",
          "fr": "Rideau de balles en plastique",
          "de": "Spielzeugsalvenschuss",
          "es": "Lluvia de balas de juguete"
        },
        "damage": "hybrid",
        "base": 3000,
        "hitDamage": [
          7, 6, 7, 7, 7, 6, 7, 6, 7, 6, 7, 7, 7, 6, 7
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "fire",
            "value": 100
          },
          {
            "type": "earth",
            "value": 100
          }
        ],
        "framesList": [
          280, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          911710,
          911711,
          911727,
          911731
        ]
      }
    ]
  },
  {
    "id": 195,
    "names": {
      "en": "Sora",
      "tw": "索拉",
      "kr": "소라"
    },
    "abilities": [
      {
        "id": 230842,
        "names": {
          "en": "Slapshot",
          "tw": "全力揮擊",
          "kr": "슬랩 샷",
          "fr": "Frappe éclair",
          "de": "Ratzefatze",
          "es": "Golpe súbito"
        },
        "base": 320,
        "hitDamage": [
          30, 30, 40
        ],
        "framesList": [
          17, 22, 39
        ],
        "offset": 8
      },
      {
        "id": 230843,
        "names": {
          "en": "Stun Impact",
          "tw": "氣絕衝擊",
          "kr": "스턴 임팩트",
          "fr": "Dôme d'impact",
          "de": "Betäubungsschlag",
          "es": "Aturdidor"
        },
        "base": 280,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "framesList": [
          80
        ],
        "offset": 14
      },
      {
        "id": 230844,
        "names": {
          "en": "Hurricane Blast",
          "tw": "颶風休止符",
          "kr": "허리케인 피리어드",
          "fr": "Frappe ouragan",
          "de": "Orkanstoß",
          "es": "Pulso Huracanado"
        },
        "base": 250,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ],
        "offset": 14
      },
      {
        "id": 230845,
        "names": {
          "en": "Blitz",
          "tw": "潰擊",
          "kr": "파이널 브레이크",
          "fr": "Coup de grâce",
          "de": "Brutalo",
          "es": "Guillotina final"
        },
        "base": 380,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "framesList": [
          42
        ],
        "offset": 14
      },
      {
        "id": 230849,
        "names": {
          "en": "Vortex",
          "tw": "能量漩渦",
          "kr": "볼텍스",
          "de": "Rotator",
          "es": "Vórtice"
        },
        "base": 480,
        "hitDamage": [
          200
        ],
        "castTime": 40,
        "framesList": [
          57
        ],
        "offset": 14
      },
      {
        "id": 230850,
        "names": {
          "en": "Ripple Drive",
          "tw": "波濤彈擊",
          "kr": "리플 드라이브",
          "fr": "Propagation",
          "de": "Wellenschub",
          "es": "Oleada Mágica"
        },
        "base": 350,
        "hitDamage": [
          12, 12, 12, 12, 12, 12, 12, 16
        ],
        "castTime": 4,
        "framesList": [
          84, 8, 8, 8, 8, 8, 8, 8
        ],
        "offset": 14
      },
      {
        "id": 230851,
        "names": {
          "en": "Sonic Blade",
          "tw": "音速斬擊",
          "kr": "소닉 레이브",
          "fr": "Aquilon",
          "de": "Perforieren",
          "es": "Estocada veloz"
        },
        "base": 450,
        "hitDamage": [
          1.92, 1.92, 1.92, 1.92, 1.92, 2.4, 88
        ],
        "castTime": 40,
        "ignore": 50,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 230857,
        "names": {
          "en": "Ars Arcanum",
          "tw": "最終奧義",
          "kr": "라스트 아르카눔",
          "fr": "Arcanes",
          "es": "Último arcano"
        },
        "base": 600,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ],
        "offset": 14
      },
      {
        "id": 230858,
        "names": {
          "en": "Strike Raid",
          "tw": "衝撞突襲",
          "kr": "스트라이크 레이드",
          "fr": "Diskobolos",
          "de": "Schwertwurf",
          "es": "Tiro mortífero"
        },
        "base": 400,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "framesList": [
          50
        ],
        "offset": 14
      },
      {
        "id": 335000107,
        "names": {
          "en": "Ragnarok",
          "tw": "諸神黃昏",
          "kr": "라그나로크",
          "de": "Ragnarök"
        },
        "base": 2080,
        "hitDamage": [
          10, 10, 10, 10, 10, 50
        ],
        "dualable": false,
        "framesList": [
          30, 16, 13, 14, 16, 64
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          230842,
          230843,
          230844,
          230845,
          230849,
          230850,
          230851,
          230857,
          230858
        ]
      }
    ]
  },
  {
    "id": 196,
    "names": {
      "en": "Cloud (KH)",
      "tw": "克勞德(KH)",
      "kr": "클라우드(KH)"
    },
    "abilities": [
      {
        "id": 230862,
        "names": {
          "en": "Braver",
          "tw": "勇猛烈斬",
          "kr": "브레이버",
          "fr": "Bravoure",
          "de": "Mutangriff",
          "es": "Héroe"
        },
        "base": 340,
        "hitDamage": [
          100
        ],
        "castTime": 4,
        "framesList": [
          6
        ],
        "offset": 14
      },
      {
        "id": 230863,
        "names": {
          "en": "Cross-slash",
          "tw": "兇斬",
          "kr": "흉베기",
          "fr": "Taillade croisée",
          "de": "Kreuzhieb",
          "es": "Látigo-cruzado"
        },
        "base": 300,
        "hitDamage": [
          10, 10, 10, 10, 60
        ],
        "castTime": 19,
        "framesList": [
          19, 26, 30, 30, 30
        ],
        "offset": 14
      },
      {
        "id": 230864,
        "names": {
          "en": "Blade Beam",
          "tw": "破晄擊",
          "kr": "파황격",
          "fr": "Contre taillade",
          "de": "Klingenstrahl",
          "es": "Rayo espada"
        },
        "base": 325,
        "hitDamage": [
          50, 50
        ],
        "framesList": [
          4, 4
        ],
        "offset": 8
      },
      {
        "id": 230865,
        "names": {
          "en": "Assault Charge",
          "tw": "突襲衝鋒",
          "kr": "어설트 차지",
          "fr": "Assaut chargé",
          "de": "Überfallangriff",
          "es": "Carga de asalto"
        },
        "base": 210,
        "hitDamage": [
          100
        ],
        "castTime": 15,
        "ignore": 50,
        "framesList": [
          17
        ],
        "offset": 14
      },
      {
        "id": 230869,
        "names": {
          "en": "Climhazzard",
          "tw": "罪惡烈斬",
          "kr": "클라임 해저드",
          "fr": "Péril ascendant",
          "de": "Climgefahr",
          "es": "Salto mortal"
        },
        "base": 275,
        "hitDamage": [
          100
        ],
        "castTime": 15,
        "ignore": 50,
        "framesList": [
          19
        ],
        "offset": 14
      },
      {
        "id": 230870,
        "names": {
          "en": "Meteor Rain",
          "tw": "流星雨",
          "kr": "메테오 레인",
          "fr": "Pluie de météorites",
          "de": "Meteoregen",
          "es": "Lluvia de meteoros"
        },
        "base": 200,
        "hitDamage": [
          12, 12, 12, 12, 12, 12, 12, 16
        ],
        "castTime": 4,
        "ignore": 50,
        "framesList": [
          84, 8, 8, 8, 8, 8, 8, 8
        ],
        "offset": 14
      },
      {
        "id": 230871,
        "names": {
          "en": "Split Burst",
          "tw": "劈裂爆破",
          "kr": "스플릿 버스트",
          "fr": "Rupture explosive",
          "de": "Spaltsalve",
          "es": "Ruptura explosiva"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "castTime": 17,
        "ignore": 50,
        "framesList": [
          19
        ],
        "offset": 14
      },
      {
        "id": 230872,
        "names": {
          "en": "Sonic Blade",
          "tw": "音速斬擊",
          "kr": "소닉 레이브",
          "fr": "Aquilon",
          "de": "Perforieren",
          "es": "Estocada veloz"
        },
        "base": 190,
        "hitDamage": [
          1.6842105263157896, 1.6842105263157896, 1.6842105263157896, 1.6842105263157896, 1.6842105263157896, 2.105263157894737, 89.47368421052632
        ],
        "castTime": 40,
        "ignore": 50,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 509744,
        "names": {
          "en": "Cross-slash+",
          "tw": "兇斬 改",
          "kr": "개량형 흉베기",
          "fr": "Taillade croisée +",
          "de": "Kreuzhieb+",
          "es": "Látigo-cruzado+"
        },
        "base": 800,
        "hitDamage": [
          10, 10, 10, 10, 60
        ],
        "castTime": 19,
        "framesList": [
          19, 26, 30, 30, 30
        ],
        "offset": 14
      },
      {
        "id": 509745,
        "names": {
          "en": "Assault Break",
          "tw": "突擊破壞",
          "kr": "어설트 브레이크",
          "fr": "Assaut destructeur",
          "de": "Bruchangriff",
          "es": "Asalto quebrantador"
        },
        "base": 1000,
        "hitDamage": [
          100
        ],
        "castTime": 15,
        "ignore": 50,
        "framesList": [
          19
        ],
        "offset": 14
      },
      {
        "id": 230879,
        "names": {
          "en": "Continuum Cut",
          "tw": "連續劈斬",
          "kr": "컨티넘 컷",
          "fr": "Continuum",
          "de": "Kontinuummesser",
          "es": "Corte infinito"
        },
        "base": 850,
        "hitDamage": [
          1.2307692307692308, 1.2307692307692308, 1.2307692307692308, 1.2307692307692308, 1.2307692307692308, 1.5384615384615383, 92.3076923076923
        ],
        "castTime": 40,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 335000207,
        "names": {
          "en": "Omnislash",
          "tw": "超究武神霸斬",
          "kr": "초구무신패참",
          "fr": "Omnifrappe",
          "de": "Omnischlag",
          "es": "Omnilátigo"
        },
        "base": 1920,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 70
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          216, 34, 26, 12, 10, 9, 53
        ],
        "offset": 8,
        range: {
          min: -360
        }
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          230862,
          230863,
          230864,
          230865,
          230869,
          230870,
          230871,
          230872,
          509745,
          230879,
          509744
        ]
      }
    ]
  },
  {
    "id": 197,
    "names": {
      "en": "Barret",
      "tw": "巴雷特",
      "kr": "바렛"
    },
    "abilities": [
      {
        "id": 227874,
        "names": {
          "en": "Satellite Beam",
          "tw": "衛星射線",
          "kr": "새틀라이트 빔",
          "fr": "Frappe satellite",
          "de": "Satellitenstrahl",
          "es": "Haz del satélite"
        },
        "base": 300,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "castTime": 40,
        "framesList": [
          125, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 227875,
        "names": {
          "en": "Ungarmax",
          "tw": "極度憤怒",
          "kr": "앵거 맥스",
          "fr": "Colère maximale",
          "de": "Wutanfall"
        },
        "base": 200,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 15
        ],
        "castTime": 88,
        "ignore": 50,
        "framesList": [
          90, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "offset": 14
      },
      {
        "id": 207000206,
        "names": {
          "en": "Catastrophe",
          "tw": "災變",
          "kr": "카타스트로피",
          "de": "Katastrophe",
          "es": "Catástrofe"
        },
        "base": 520,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "dualable": false,
        "ignore": 50,
        "framesList": [
          230, 6, 6, 6, 7, 6, 6, 6, 7, 6, 6, 6, 7, 6, 6, 6, 7, 6, 6, 8
        ],
        "offset": 8
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          227874,
          227875
        ]
      }
    ]
  },
  {
    "id": 198,
    "names": {
      "en": "Vincent",
      "tw": "文森特",
      "kr": "빈센트"
    },
    "abilities": [
      {
        "id": 227851,
        "names": {
          "en": "Berserk Dance",
          "tw": "狂戰士之舞",
          "kr": "버서크 댄스",
          "fr": "Danse furieuse",
          "de": "Wahnsinnstanz",
          "es": "Danza loca"
        },
        "base": 300,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 40,
        "framesList": [
          42, 15, 15, 15, 15
        ],
        "offset": 14
      },
      {
        "id": 227850,
        "names": {
          "en": "Beast Flare",
          "tw": "手槍火光",
          "kr": "비스트 플레어",
          "fr": "Brasier bestial",
          "de": "Biesterflamme",
          "es": "Flama de bestia"
        },
        "base": 350,
        "hitDamage": [
          33, 33, 34
        ],
        "castTime": 160,
        "elements": [
          "fire"
        ],
        "framesList": [
          110, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 227853,
        "names": {
          "en": "Livewire",
          "tw": "活體火花",
          "kr": "라이브 스파크",
          "fr": "Colère foudroyante",
          "de": "Lebensfunken",
          "es": "Cable activo"
        },
        "base": 350,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 40
        ],
        "castTime": 41,
        "elements": [
          "lightning"
        ],
        "framesList": [
          52, 10, 10, 10, 10, 10, 10
        ],
        "offset": 14
      },
      {
        "id": 227852,
        "names": {
          "en": "Gigadunk",
          "tw": "十億暴扣",
          "kr": "기가덩크",
          "fr": "Pilonnage gigas",
          "de": "Gigafaust"
        },
        "base": 335,
        "hitDamage": [
          100
        ],
        "ignore": 50,
        "framesList": [
          10
        ],
        "offset": 8
      },
      {
        "id": 227854,
        "names": {
          "en": "Splattercombo",
          "tw": "濺射連擊",
          "kr": "스플래터 콤보",
          "fr": "Massacre sanglant",
          "de": "Sägenkombo",
          "es": "Salpicacombo"
        },
        "base": 670,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 30
        ],
        "framesList": [
          2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 8
      },
      {
        "id": 227856,
        "names": {
          "en": "Chaos Saber",
          "tw": "混沌劍",
          "kr": "카오스 세이버",
          "fr": "Lame de chaos",
          "de": "Chaossäbel",
          "es": "Sable del caos"
        },
        "base": 225,
        "hitDamage": [
          100
        ],
        "castTime": 70,
        "ignore": 50,
        "framesList": [
          72
        ],
        "offset": 14
      },
      {
        "id": 207000807,
        "names": {
          "en": "Satan Slam",
          "tw": "撒旦衝擊",
          "kr": "사탄 임팩트",
          "fr": "Impact satanique",
          "de": "Höllenpein",
          "es": "Portazo Satán"
        },
        "base": 650,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "framesList": [
          520
        ],
        "offset": 8
      },
      {
        "id": 900000187,
        "names": {
          "en": "Satan Slam + 1",
          "tw": "撒旦衝擊 + 1",
          "kr": "사탄 임팩트 + 1",
          "fr": "Impact satanique + 1",
          "de": "Höllenpein + 1",
          "es": "Portazo Satán + 1"
        },
        "base": 750,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "framesList": [
          520
        ],
        "offset": 8
      }
    ],
    dual: false
  },
  {
    "id": 199,
    "names": {
      "en": "Tifa",
      "tw": "蒂法",
      "kr": "티파"
    },
    "abilities": [
      {
        "id": 227830,
        "names": {
          "en": "Beat Rush",
          "tw": "掌擊衝鋒",
          "kr": "장타 러쉬",
          "fr": "Volée de paumes",
          "de": "Schlagsturm",
          "es": "Golpe veloz"
        },
        "base": 220,
        "hitDamage": [
          33, 33, 34
        ],
        "framesList": [
          2, 13, 12
        ],
        "offset": 8
      },
      {
        "id": 227831,
        "names": {
          "en": "Somersault",
          "tw": "空翻",
          "kr": "서머솔트",
          "fr": "Saut périlleux",
          "de": "Salto",
          "es": "Salto mortal"
        },
        "base": 240,
        "hitDamage": [
          100
        ],
        "framesList": [
          10
        ],
        "offset": 8
      },
      {
        "id": 227832,
        "names": {
          "en": "Waterkick",
          "tw": "水面踢",
          "kr": "수면 차기",
          "fr": "Coup de pied circulaire",
          "de": "Wassertritt",
          "es": "Golpeagua"
        },
        "base": 310,
        "hitDamage": [
          100
        ],
        "elements": [
          "water"
        ],
        "framesList": [
          10
        ],
        "offset": 8
      },
      {
        "id": 227833,
        "names": {
          "en": "Meteodrive",
          "tw": "隕石驅動",
          "kr": "메테오 드라이브",
          "fr": "Chute météore",
          "es": "Meteobatida"
        },
        "base": 450,
        "hitDamage": [
          100
        ],
        "framesList": [
          10
        ],
        "offset": 8
      },
      {
        "id": 227834,
        "names": {
          "en": "Dolphin Blow",
          "tw": "海豚猛攻",
          "kr": "돌핀 블로우",
          "fr": "Uppercut dauphin",
          "de": "Delfinschlag",
          "es": "Golpe de delfín"
        },
        "base": 330,
        "hitDamage": [
          100
        ],
        "elements": [
          "water"
        ],
        "debuffs": [
          {
            "type": "water",
            "value": 60
          }
        ],
        "framesList": [
          10
        ],
        "offset": 8
      },
      {
        "id": 227835,
        "names": {
          "en": "Meteor Strike",
          "tw": "隕石撞擊",
          "kr": "메테오 스트라이크",
          "fr": "Frappe météore",
          "de": "Meteorschlag",
          "es": "Ataque meteorito"
        },
        "base": 400,
        "hitDamage": [
          100
        ],
        "framesList": [
          82
        ],
        "offset": 8
      },
      {
        "id": 227837,
        "names": {
          "en": "Zangan Combination",
          "tw": "斬岩組合拳",
          "kr": "잔간 콤비네이션",
          "fr": "Enchaînement de Zangan",
          "de": "Zangan-Kombo",
          "es": "Combo de Zangan"
        },
        "base": 300,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 22
        ],
        "ignore": 50,
        "framesList": [
          2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20
        ],
        "offset": 8
      },
      {
        "id": 227836,
        "names": {
          "en": "Final Heaven",
          "tw": "終極天堂",
          "kr": "파이널 헤븐",
          "fr": "Ciel ultime",
          "de": "Himmelsfaust",
          "es": "Cielo final"
        },
        "base": 700,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 508161,
        "names": {
          "en": "Overdrive Plus",
          "tw": "增驅+",
          "kr": "오버 드라이브·플러스",
          "fr": "Super chute plus",
          "de": "Mega-Ekstase",
          "es": "Turbo+"
        },
        "base": 2300,
        "hitDamage": [
          100
        ],
        "framesList": [
          140
        ],
        "offset": 8
      },
      {
        "id": 508162,
        "names": {
          "en": "Seventh Heaven",
          "tw": "第七天堂",
          "kr": "세븐스 헤븐",
          "fr": "Septième Ciel",
          "de": "Siebter Himmel",
          "es": "Séptimo Cielo"
        },
        "base": 670,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 40
        ],
        "ignore": 50,
        "framesList": [
          132, 10, 10, 10, 10, 10, 10
        ],
        "offset": 8
      },
      {
        "id": 207000307,
        "names": {
          "en": "Limit Reels",
          "tw": "極限轉軸",
          "kr": "리미트 릴",
          "fr": "Pugilatoire",
          "de": "Limitrolle",
          "es": "Espiral límite"
        },
        "base": 1450,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 25, 40
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "water",
            "value": 100
          }
        ],
        "framesList": [
          133, 10, 20, 35, 55, 57, 52, 137, 84
        ],
        "offset": 8
      },
      {
        "id": 900000177,
        "names": {
          "en": "Limit Reels + 1",
          "tw": "極限轉軸 + 1",
          "kr": "리미트 릴 + 1",
          "fr": "Pugilatoire + 1",
          "de": "Limitrolle + 1",
          "es": "Espiral límite + 1"
        },
        "base": 1450,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 25, 40
        ],
        "dualable": false,
        "debuffs": [
          {
            "type": "water",
            "value": 100
          }
        ],
        "framesList": [
          133, 10, 20, 35, 55, 57, 52, 137, 84
        ],
        "offset": 8
      }
    ]
  },
  {
    "id": 200,
    "names": {
      "en": "Yubel",
      "tw": "尤貝爾",
      "kr": "유벨"
    },
    "abilities": [
      {
        "id": 228654,
        "names": {
          "en": "Powered Up Pinwheel",
          "tw": "風車·私有",
          "kr": "풍차 칼날·사유물",
          "fr": "Moulin à vent",
          "de": "Brausendes Windrad",
          "es": "Molinete implacable"
        },
        "base": 100,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "framesList": [
          110
        ],
        "offset": 14
      },
      {
        "id": 228653,
        "names": {
          "en": "Chocobo Beak",
          "tw": "陸行鳥之喙",
          "kr": "초코보 부리",
          "fr": "Choco-bec",
          "de": "Chocobo-Schnabel",
          "es": "Chocobopico"
        },
        "base": 210,
        "hitDamage": [
          100
        ],
        "framesList": [
          60
        ],
        "offset": 8
      },
      {
        "id": 228652,
        "names": {
          "en": "Chocobo Dash",
          "tw": "陸行鳥衝擊",
          "kr": "초코보 대시",
          "fr": "Choco-galop",
          "de": "Chocobo-Sprint",
          "es": "Chocobogalope"
        },
        "base": 250,
        "hitDamage": [
          100
        ],
        "ignore": 50,
        "debuffs": [
          {
            "type": "ice",
            "value": 50
          },
          {
            "type": "dark",
            "value": 50
          }
        ],
        "framesList": [
          40
        ],
        "offset": 8
      },
      {
        "id": 228650,
        "names": {
          "en": "Frost Blade, Flame Ring",
          "tw": "冰刃火環",
          "kr": "빙인화환",
          "fr": "Givrelame & pyrocercle",
          "de": "Frostklinge, Flammenring",
          "es": "Hoja gélida, Anillo pírico"
        },
        "base": 380,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "ice"
        ],
        "debuffs": [
          {
            "type": "fire",
            "value": 70
          }
        ],
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 228651,
        "names": {
          "en": "Shadow Blade, Light Ring",
          "tw": "暗刃光環",
          "kr": "암인광환",
          "fr": "Ombrelame & luminocercle",
          "de": "Schattenklinge, Lichtring",
          "es": "Hoja umbrosa, Anillo refulgente"
        },
        "base": 380,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "debuffs": [
          {
            "type": "light",
            "value": 70
          }
        ],
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ],
        "offset": 14
      },
      {
        "id": 100018506,
        "names": {
          "en": "Combination Attack",
          "tw": "組合攻擊",
          "kr": "조합 공격",
          "fr": "Attaque combinée",
          "de": "Komboangriff",
          "es": "Combinación de ataques"
        },
        "base": 840,
        "hitDamage": [
          33, 33, 34
        ],
        "dualable": false,
        "framesList": [
          142, 20, 20
        ],
        "offset": 8
      }
    ]
  },
  {
    "id": 201,
    "names": {
      "en": "Sophia",
      "tw": "索菲雅",
      "kr": "소피아"
    },
    "abilities": [
      {
        "id": 911857,
        "names": {
          "en": "Fire Bolt (SO3)",
          "tw": "火焰箭（SO3）",
          "kr": "파이어 볼트(SO3)",
          "fr": "Boule de feu (SO3)",
          "de": "Feuerpfeil (SO3)",
          "es": "Rayo de fuego (SO3)"
        },
        "damage": "magic",
        "base": 320,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          }
        ],
        "framesList": [
          40
        ]
      },
      {
        "id": 911858,
        "names": {
          "en": "Ice Needles",
          "tw": "寒冰針刺",
          "kr": "아이스 니들",
          "fr": "Dards de glace",
          "de": "Eisnadeln",
          "es": "Agujas de hielo"
        },
        "damage": "magic",
        "base": 320,
        "hitDamage": [
          100
        ],
        "castTime": 20,
        "elements": [
          "ice"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "ice",
            "value": 60
          }
        ],
        "framesList": [
          40
        ]
      },
      {
        "id": 911859,
        "names": {
          "en": "Lightning Blast",
          "tw": "雷霆衝擊",
          "kr": "라이트닝 블래스트",
          "fr": "Foudre (SO3)",
          "de": "Blitzruption",
          "es": "Explosión de rayo"
        },
        "damage": "magic",
        "base": 320,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "lightning",
            "value": 60
          }
        ],
        "framesList": [
          40
        ]
      },
      {
        "id": 911860,
        "names": {
          "en": "Earth Glaive",
          "tw": "大地之劍",
          "kr": "어스 글레이브",
          "fr": "Glaive de terre",
          "de": "Erdgleve",
          "es": "Gurja de tierra"
        },
        "damage": "magic",
        "base": 320,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "earth",
            "value": 60
          }
        ],
        "framesList": [
          40
        ]
      },
      {
        "id": 911866,
        "names": {
          "en": "Crush",
          "tw": "壓迫",
          "kr": "프레스",
          "fr": "Pression",
          "de": "Presse",
          "es": "Pulverización"
        },
        "damage": "magic",
        "base": 240,
        "hitDamage": [
          100
        ],
        "elements": [
          "earth"
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          15
        ]
      },
      {
        "id": 911867,
        "names": {
          "en": "Thunder Flare",
          "tw": "雷電閃耀",
          "kr": "선더 플레어",
          "fr": "Coup de tonnerre",
          "de": "Donnerfackel",
          "es": "Llama de trueno"
        },
        "damage": "magic",
        "base": 240,
        "hitDamage": [
          100
        ],
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          40
        ]
      },
      {
        "id": 911870,
        "names": {
          "en": "Deep Freeze",
          "tw": "深寒凍結",
          "kr": "딥 프리즈",
          "fr": "Surgélation",
          "de": "Tiefgefrieren",
          "es": "Hipotermia total"
        },
        "damage": "magic",
        "base": 220,
        "hitDamage": [
          5, 5, 5, 10, 10, 10, 15, 40
        ],
        "castTime": 40,
        "elements": [
          "ice"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          140, 14, 14, 14, 14, 14, 15, 15
        ]
      },
      {
        "id": 911873,
        "names": {
          "en": "Fireball (SO3)",
          "tw": "爆裂（SO3）",
          "kr": "폭발(SO3)",
          "fr": "Explosion (SO3)",
          "de": "Explosion (SO3)",
          "es": "Bola de fuego (SO3)"
        },
        "damage": "magic",
        "base": 200,
        "hitDamage": [
          100
        ],
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          30
        ]
      },
      {
        "id": 911878,
        "names": {
          "en": "Blood Scylla",
          "tw": "嗜血斯庫拉",
          "kr": "블러드 스킬라",
          "fr": "Scylla",
          "de": "Blutskylla",
          "es": "Escila sanguinaria"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "castTime": 10,
        "dualable": false,
        "offset": 14,
        "framesList": [
          55
        ]
      },
      {
        "id": 911879,
        "names": {
          "en": "Stone Rain",
          "tw": "岩石之雨",
          "kr": "록 레인",
          "fr": "Pluie de pierres",
          "de": "Steinregen",
          "es": "Lluvia de piedra"
        },
        "damage": "magic",
        "base": 1150,
        "hitDamage": [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          160, 22, 21, 22, 23, 23, 22, 23
        ]
      },
      {
        "id": 911883,
        "names": {
          "en": "Southern Cross (SO3)",
          "tw": "南十字星（SO3）",
          "kr": "남십자성(SO3)",
          "fr": "Croix du Sud (SO3)",
          "de": "Kreuz des Südens (SO3)",
          "es": "Cruz del Sur (SO3)"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [100],
        "elements": [
          "fire",
          "dark"
        ],
        "dualable": false,
        "offset": 8,
        "debuffs": [
          {
            "type": "fire",
            "value": 75
          },
          {
            "type": "dark",
            "value": 75
          }
        ],
        "framesList": [
          50
        ]
      },
      {
        "id": 911884,
        "names": {
          "en": "Efreet",
          "tw": "伊弗利特之劍",
          "kr": "이프리트 소드",
          "fr": "Éfrit",
          "de": "Ifritschwert",
          "es": "Espada Ifrit"
        },
        "damage": "magic",
        "base": 1400,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 50,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          52, 20, 20, 20, 20
        ]
      },
      {
        "id": 911885,
        "names": {
          "en": "Ravenous Fiend",
          "tw": "貪婪惡魔",
          "kr": "그렘린 레어",
          "fr": "Gremlins",
          "de": "Räuberischer Freund",
          "es": "Diablillos voraces"
        },
        "damage": "magic",
        "base": 1400,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 50,
        "elements": [
          "dark"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          52, 20, 20, 20, 20
        ]
      },
      {
        "id": 401006507,
        "names": {
          "en": "Meteor Swarm",
          "tw": "流星雨",
          "kr": "메테오 스웜",
          "fr": "Nuée de météores",
          "de": "Meteorstrom",
          "es": "Nubarrón de meteoros"
        },
        "damage": "magic",
        "base": 1290,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 100
          }
        ],
        "framesList": [
          130, 10, 10, 5, 5
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          911857,
          911858,
          911859,
          911860,
          911866,
          911867,
          911870,
          911873,
          911878,
          911879,
          911884,
          911885
        ]
      }
    ]
  },
  {
    "id": 202,
    "names": {
      "en": "Miyuki",
      "tw": "美雪",
      "kr": "미유키"
    },
    "abilities": [
      {
        "id": 218130,
        "names": {
          "en": "Kunai Rain",
          "tw": "苦無雨",
          "kr": "수리검 강우",
          "fr": "Pluie de kunai",
          "de": "Kunai-Regen",
          "es": "Lluvia de kunai"
        },
        "base": 180,
        "hitDamage": [
          16, 16, 17, 17, 17, 17
        ],
        "castTime": 40,
        "offset": 14,
        "debuffs": [
          {
            "type": "lightning",
            "value": 50
          }
        ],
        "framesList": [
          42, 8, 8, 8, 8, 8
        ]
      },
      {
        "id": 218131,
        "names": {
          "en": "Kunai Rain + 2",
          "tw": "苦無雨 + 2",
          "kr": "수리검 강우 + 2",
          "fr": "Pluie de kunai + 2",
          "de": "Kunai-Regen + 2",
          "es": "Lluvia de kunai + 2"
        },
        "base": 230,
        "hitDamage": [
          16, 16, 17, 17, 17, 17
        ],
        "castTime": 40,
        "offset": 14,
        "debuffs": [
          {
            "type": "lightning",
            "value": 60
          }
        ],
        "framesList": [
          42, 8, 8, 8, 8, 8
        ]
      },
      {
        "id": 217700,
        "names": {
          "en": "Lightning 2",
          "tw": "雷擊二式",
          "kr": "뇌격 2식",
          "fr": "Éclair II",
          "de": "Blitzschlag 2",
          "es": "Relámpago II"
        },
        "damage": "hybrid",
        "base": 450,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "offset": 14,
        "framesList": [
          70
        ]
      },
      {
        "id": 218090,
        "names": {
          "en": "Blitz 2",
          "tw": "雷迅二式",
          "kr": "뇌신 2식",
          "fr": "Tonnerre II",
          "de": "Entladung 2",
          "es": "Centella II"
        },
        "damage": "hybrid",
        "base": 400,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "offset": 14,
        "framesList": [
          50
        ]
      },
      {
        "id": 218100,
        "names": {
          "en": "Trick Attack",
          "tw": "暗算偷襲",
          "kr": "속여넘기기",
          "fr": "Attaque feintée",
          "de": "Trickangriff",
          "es": "Ataque engañoso"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          2
        ]
      },
      {
        "id": 218110,
        "names": {
          "en": "Shadowbinder",
          "tw": "影縫",
          "kr": "그림자 솔기",
          "fr": "Entrave d'ombre",
          "de": "Schattenbinden",
          "es": "Tejedor de sombras"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          45
        ]
      },
      {
        "id": 218140,
        "names": {
          "en": "Thundersplit Blade",
          "tw": "絕雙雷裂刃",
          "kr": "절쌍뇌열인",
          "fr": "Lame tranchefoudre",
          "de": "Donnerspaltklinge",
          "es": "Cuchilla parterayo"
        },
        "base": 360,
        "hitDamage": [
          10, 10, 10, 10, 10, 50
        ],
        "elements": [
          "lightning"
        ],
        "offset": 8,
        "framesList": [
          14, 14, 15, 15, 15, 14
        ]
      },
      {
        "id": 218141,
        "names": {
          "en": "Thundersplit Blade + 2",
          "tw": "絕雙雷裂刃 + 2",
          "kr": "절쌍뇌열인 + 2",
          "fr": "Lame tranchefoudre + 2",
          "de": "Donnerspaltklinge + 2",
          "es": "Cuchilla parterayo + 2"
        },
        "base": 450,
        "hitDamage": [
          10, 10, 10, 10, 10, 50
        ],
        "elements": [
          "lightning"
        ],
        "offset": 8,
        "framesList": [
          14, 14, 15, 15, 15, 14
        ]
      },
      {
        "id": 100003806,
        "names": {
          "en": "Mugen",
          "tw": "夢幻之術",
          "kr": "몽환술"
        },
        "base": 790,
        "hitDamage": [
          7, 7, 7, 7, 7, 7, 7, 7, 7, 12, 12, 13
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          138, 1, 1, 1, 1, 1, 1, 1, 1, 17, 10, 10
        ]
      }
    ]
  },
  {
    "id": 203,
    "names": {
      "en": "Auron",
      "tw": "奧隆",
      "kr": "아론"
    },
    "abilities": [
      {
        "id": 228909,
        "names": {
          "en": "Power Break",
          "tw": "潰力",
          "kr": "파워 브레이크",
          "fr": "Émousse",
          "de": "Kraftbrecher",
          "es": "Rompebrazo"
        },
        "base": 120,
        "hitDamage": [
          100
        ],
        "castTime": 16,
        "offset": 14,
        "framesList": [
          18
        ]
      },
      {
        "id": 228910,
        "names": {
          "en": "Magic Break",
          "tw": "潰魔",
          "kr": "매직 브레이크",
          "fr": "Annumagik",
          "de": "Magiebrecher",
          "es": "Rompemagia"
        },
        "base": 120,
        "hitDamage": [
          100
        ],
        "castTime": 16,
        "offset": 14,
        "framesList": [
          18
        ]
      },
      {
        "id": 228911,
        "names": {
          "en": "Armor Break",
          "tw": "潰甲",
          "kr": "아머 브레이크",
          "fr": "Trépan",
          "de": "Panzerbrecher",
          "es": "Rompecoraza"
        },
        "base": 120,
        "hitDamage": [
          100
        ],
        "castTime": 16,
        "offset": 14,
        "framesList": [
          18
        ]
      },
      {
        "id": 228912,
        "names": {
          "en": "Mental Break",
          "tw": "潰心",
          "kr": "멘탈 브레이크",
          "fr": "Déprime",
          "de": "Geistbrecher",
          "es": "Rompecoraza"
        },
        "base": 120,
        "hitDamage": [
          100
        ],
        "castTime": 16,
        "offset": 14,
        "framesList": [
          18
        ]
      },
      {
        "id": 228903,
        "names": {
          "en": "Banishing Blade",
          "tw": "征伐",
          "kr": "정벌",
          "fr": "Éradication",
          "de": "Suppression",
          "es": "Hoja exiliadora"
        },
        "base": 180,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          48
        ]
      },
      {
        "id": 228901,
        "names": {
          "en": "Dragon Fang",
          "tw": "牙龍",
          "kr": "아룡",
          "fr": "Dent de dragon",
          "de": "Seisma",
          "es": "Sablazo sísmico"
        },
        "base": 360,
        "hitDamage": [
          100
        ],
        "castTime": 16,
        "offset": 14,
        "framesList": [
          68
        ]
      },
      {
        "id": 228906,
        "names": {
          "en": "Gnawing Flame",
          "tw": "蝕炎",
          "kr": "융염",
          "fr": "Flamme dévorante",
          "de": "Zerfressende Flamme",
          "es": "Llama lacerante"
        },
        "base": 450,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 50
          }
        ],
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 228907,
        "names": {
          "en": "Hellstorm",
          "tw": "業風",
          "kr": "업풍",
          "fr": "Ouragan infernal",
          "de": "Höllenwind",
          "es": "Tormenta infernal"
        },
        "base": 450,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ],
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 228902,
        "names": {
          "en": "Shooting Star",
          "tw": "流星",
          "kr": "유성",
          "fr": "Comète",
          "de": "Holosiderit",
          "es": "Estrella fugaz"
        },
        "base": 275,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "ignore": 50,
        "framesList": [
          38
        ]
      },
      {
        "id": 508764,
        "names": {
          "en": "Take the Initiative",
          "tw": "先驅",
          "kr": "선구자",
          "fr": "Esprit d'initiative",
          "de": "Vorpreschen",
          "es": "Precursor"
        },
        "base": 1000,
        "hitDamage": [
          100
        ],
        "castTime": 16,
        "offset": 14,
        "framesList": [
          42
        ]
      },
      {
        "id": 508761,
        "names": {
          "en": "God-Killer",
          "tw": "弒神",
          "kr": "신살",
          "fr": "Déicide",
          "de": "Gottestöter",
          "es": "Ejecutor de dioses"
        },
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 16,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          126
        ]
      },
      {
        "id": 210000607,
        "names": {
          "en": "Tornado",
          "tw": "陣風",
          "kr": "진풍",
          "fr": "Tornade",
          "de": "Zephyr",
          "es": "Huracán"
        },
        "base": 900,
        "hitDamage": [
          2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 79
          },
          {
            "type": "wind",
            "value": 79
          }
        ],
        "framesList": [
          225, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          228909,
          228910,
          228911,
          228912
        ]
      },
      {
        "count": 3,
        "abilities": [
          228901,
          228902,
          228903,
          228906,
          228907,
          508761
        ]
      }
    ]
  },
  {
    "id": 204,
    "names": {
      "en": "Jecht",
      "tw": "傑克特",
      "kr": "젝트",
      "de": "Jekkt"
    },
    "abilities": [
      {
        "id": 207040,
        "names": {
          "en": "Jecht Shot",
          "tw": "傑克特射門",
          "kr": "젝트 슛",
          "fr": "Jecht Shoot",
          "de": "Jekkt-Spezial",
          "es": "Chut de Jecht"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "offset": 14,
        "ignore": 50,
        "framesList": [
          100
        ]
      },
      {
        "id": 228880,
        "names": {
          "en": "Jecht Beam",
          "tw": "傑克特光束",
          "kr": "젝트 빔",
          "fr": "Regard de tueur",
          "de": "Jekkt-Strahl",
          "es": "Rayo de Jecht"
        },
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          65
        ]
      },
      {
        "id": 228883,
        "names": {
          "en": "Triumphant Grasp",
          "tw": "傑克特之指",
          "kr": "젝트 핑거",
          "fr": "Poigne de fer",
          "de": "Jekkt-Finger",
          "es": "Mano de Jecht"
        },
        "base": 420,
        "hitDamage": [
          28.571428571428573,
          71.42857142857143
        ],
        "offset": 8,
        "framesList": [
          19,
          47
        ]
      },
      {
        "id": 228884,
        "names": {
          "en": "Jecht Bomber",
          "tw": "傑克特轟炸",
          "kr": "젝트 보머",
          "fr": "Aura oppressante",
          "de": "Jekkt-Bombe",
          "es": "Furia de Jecht"
        },
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 66,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          66
        ]
      },
      {
        "id": 228885,
        "names": {
          "en": "Jecht Shot Mark III",
          "tw": "傑克特射門3號",
          "kr": "젝트 님 슛 3호",
          "fr": "Incroyable Shoot du Grand Jecht no 3",
          "de": "Jekkt-Spezial 3",
          "es": "Chut de Jecht número 3"
        },
        "base": 400,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          100
        ]
      },
      {
        "id": 228881,
        "names": {
          "en": "Jecht Rush",
          "tw": "傑克特衝鋒",
          "kr": "젝트 러쉬",
          "fr": "Ruée de Jecht",
          "de": "Jekkt-Rausch",
          "es": "Acometida de Jecht"
        },
        "base": 300,
        "hitDamage": [
          2.666666666666667, 2.666666666666667, 2.666666666666667, 2.666666666666667, 2.666666666666667, 3.333333333333334, 83.33333333333331
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "debuffs": [
          {
            "type": "water",
            "value": 75
          }
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 228882,
        "names": {
          "en": "Hot Steel",
          "tw": "傑克特斬擊",
          "kr": "젝트 슬래시",
          "fr": "Feinte de Jecht",
          "de": "Jekkt-Hieb",
          "es": "Acero caliente"
        },
        "base": 520,
        "hitDamage": [
          2.0769230769230766, 2.0769230769230766, 2.0769230769230766, 2.0769230769230766, 2.0769230769230766, 2.0769230769230766, 2.0769230769230766, 2.0769230769230766, 2.0769230769230766, 2.0769230769230766, 2.307692307692308, 76.92307692307692
        ],
        "castTime": 20,
        "offset": 14,
        "framesList": [
          22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20
        ]
      },
      {
        "id": 228886,
        "names": {
          "en": "Quick Block",
          "tw": "快速格擋",
          "kr": "퀵 블록",
          "fr": "Blocage rapide",
          "de": "Blitzblock",
          "es": "Bloqueo rápido"
        },
        "base": 180,
        "hitDamage": [
          30, 70
        ],
        "castTime": 17,
        "offset": 14,
        "framesList": [
          18, 48
        ]
      },
      {
        "id": 508753,
        "names": {
          "en": "Otherworld",
          "tw": "另一個世界",
          "kr": "다른 세계",
          "fr": "Outremonde",
          "es": "Ultramundo"
        },
        "base": 900,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          290
        ]
      },
      {
        "id": 210001007,
        "names": {
          "en": "Ultimate Jecht Shot",
          "tw": "真·傑克特射門",
          "kr": "진 젝트 소드",
          "fr": "Ultime Jecht Shoot",
          "de": "Original Jekkt-Spezial",
          "es": "Auténtico chut de Jecht"
        },
        "base": 1600,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          365
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          207040,
          228880,
          228881,
          228882,
          228883,
          228884,
          228885,
          228886
        ]
      }
    ]
  },
  {
    "id": 205,
    "names": {
      "en": "Belgemine",
      "tw": "貝爾格米娜",
      "kr": "베르게미네",
      "de": "Belgmene"
    },
    "abilities": [
      {
        "id": 228930,
        "names": {
          "en": "Valefor's Power",
          "tw": "瓦爾法雷之力",
          "kr": "발파레의 힘",
          "fr": "Pouvoir de Valefor",
          "de": "Macht von Valfaris",
          "es": "Poder de Valefor"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          140
        ]
      },
      {
        "id": 228931,
        "names": {
          "en": "Ifrit's Power",
          "tw": "伊弗利特之力",
          "kr": "이프리트의 힘",
          "fr": "Pouvoir d'Ifrit",
          "de": "Macht von Ifrit",
          "es": "Poder de Ifrit"
        },
        "damage": "magic",
        "base": 300,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "ice",
            "value": 50
          }
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 228932,
        "names": {
          "en": "Ixion's Power",
          "tw": "伊克西翁之力",
          "kr": "익시온의 힘",
          "fr": "Pouvoir d'Ixion",
          "de": "Macht von Ixion",
          "es": "Poder de Ixion"
        },
        "damage": "magic",
        "base": 300,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "water",
            "value": 50
          }
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 228933,
        "names": {
          "en": "Shiva's Power",
          "tw": "濕婆之力",
          "kr": "시바의 힘",
          "fr": "Pouvoir de Shiva",
          "de": "Macht von Shiva",
          "es": "Poder de Shiva"
        },
        "damage": "magic",
        "base": 300,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "ice"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 50
          }
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 228934,
        "names": {
          "en": "Bahamut's Power",
          "tw": "巴哈姆特之力",
          "kr": "바하무트의 힘",
          "fr": "Pouvoir de Bahamut",
          "de": "Macht von Bahamut",
          "es": "Poder de Bahamut"
        },
        "damage": "magic",
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          210
        ]
      },
      {
        "id": 228936,
        "names": {
          "en": "Anima's Power",
          "tw": "靈魂之力",
          "kr": "아니마의 힘",
          "fr": "Pouvoir d'Anima",
          "de": "Macht von Anima",
          "es": "Poder de Ánima"
        },
        "damage": "magic",
        "base": 350,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "light",
            "value": 40
          },
          {
            "type": "dark",
            "value": 40
          }
        ],
        "framesList": [
          100
        ]
      },
      {
        "id": 228937,
        "names": {
          "en": "Magus Sisters' Power",
          "tw": "梅格思三姐妹之力",
          "kr": "메이거스 3자매의 힘",
          "fr": "Pouvoir des Sœurs Magus",
          "de": "Macht der Magus-Schwestern",
          "es": "Poder de las hermanas Magus"
        },
        "damage": "magic",
        "base": 225,
        "hitDamage": [
          100
        ],
        "castTime": 41,
        "dualable": false,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          450
        ]
      },
      {
        "id": 210001906,
        "names": {
          "en": "Dance of Summoning",
          "tw": "召喚連舞",
          "kr": "소환연무",
          "fr": "Danse d'invocation",
          "de": "Beschwörungstanz",
          "es": "Danza de la invocación"
        },
        "damage": "magic",
        "base": 740,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          460
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          228930,
          228931,
          228932,
          228933,
          228934,
          228936,
          228937
        ]
      }
    ]
  },
  {
    "id": 206,
    "names": {
      "en": "Qin",
      "tw": "琴",
      "kr": "친"
    },
    "abilities": [
      {
        "id": 911953,
        "names": {
          "en": "Recital - Vengeance Maelstrom",
          "tw": "演奏 - 廣陵散",
          "kr": "연주·광릉산",
          "fr": "Récital - Maelström vengeur",
          "de": "Aufführung - Mahlstrom der Rache",
          "es": "Recital - Vórtice vengativo"
        },
        "damage": "magic",
        "base": 500,
        "hitDamage": [
          100
        ],
        "castTime": 15,
        "dualable": false,
        "offset": 14,
        "framesList": [
          20
        ]
      },
      {
        "id": 911955,
        "names": {
          "en": "Recital - Elemental Storm",
          "tw": "演奏 - 五行嵐",
          "kr": "연주·영속의 폭풍",
          "fr": "Récital - Typhon des éléments",
          "de": "Aufführung - Elementarsturm",
          "es": "Recital - Tormenta elemental"
        },
        "damage": "magic",
        "base": 300,
        "hitDamage": [100],
        "castTime": 5,
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 70
          },
          {
            "type": "ice",
            "value": 70
          },
          {
            "type": "lightning",
            "value": 70
          },
          {
            "type": "water",
            "value": 70
          },
          {
            "type": "wind",
            "value": 70
          },
          {
            "type": "earth",
            "value": 70
          },
          {
            "type": "light",
            "value": 70
          },
          {
            "type": "dark",
            "value": 70
          }
        ],
        "framesList": [
          60
        ]
      },
      {
        "id": 911959,
        "names": {
          "en": "Recital - Nomad's Revenge",
          "tw": "演奏 - 胡笳十八拍",
          "kr": "연주·노마드의 복수",
          "fr": "Récital - Revanche du nomade",
          "de": "Aufführung - Rache des Nomaden",
          "es": "Recital - Venganza de los nómadas"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 15,
        "dualable": false,
        "offset": 14,
        "framesList": [
          60
        ]
      },
      {
        "id": 911961,
        "names": {
          "en": "Recital - Ten-Sided Ambush",
          "tw": "演奏 - 十面埋伏",
          "kr": "연주·십면 매복",
          "fr": "Récital - Embuscade de tous côtés",
          "de": "Aufführung - Zehnseitiger Überfall",
          "es": "Recital - Emboscada sin escapatoria"
        },
        "damage": "magic",
        "base": 300,
        "hitDamage": [100],
        "castTime": 5,
        "dualable": false,
        "offset": 14,
        "framesList": [
          60
        ]
      },
      {
        "id": 911965,
        "names": {
          "en": "Recital - Ambitious Comforts",
          "tw": "演奏 - 平沙落雁",
          "kr": "연주·야심찬 위안",
          "fr": "Récital - Réconfort des oies sauvages",
          "de": "Aufführung - Ambitionierte Behaglichkeiten",
          "es": "Recital - Consuelo insaciable"
        },
        "damage": "magic",
        "base": 300,
        "hitDamage": [100],
        "castTime": 15,
        "dualable": false,
        "offset": 14,
        "framesList": [
          60
        ]
      },
      {
        "id": 911969,
        "names": {
          "en": "Recital - Singing Praise",
          "tw": "演奏 - 漁舟唱晚",
          "kr": "연주·찬송",
          "fr": "Récital - Fierté du pêcheur",
          "de": "Aufführung - Lobgesang",
          "es": "Recital - Orgullo de cantante"
        },
        "damage": "magic",
        "base": 300,
        "hitDamage": [100],
        "castTime": 20,
        "dualable": false,
        "offset": 14,
        "framesList": [
          70
        ]
      },
      {
        "id": 911975,
        "names": {
          "en": "Recital - Secret Lark",
          "tw": "演奏 - 寒鴉戲水",
          "kr": "연주·비밀의 종달새",
          "fr": "Récital - Escapade du corbeau",
          "de": "Aufführung - Krähenspiel",
          "es": "Recital - Chanza enigmática"
        },
        "damage": "magic",
        "base": 300,
        "hitDamage": [100],
        "castTime": 10,
        "dualable": false,
        "offset": 14,
        "framesList": [
          60
        ]
      },
      {
        "id": 911979,
        "names": {
          "en": "Recital - Invigorating Praise",
          "tw": "演奏 - 梅花三弄",
          "kr": "연주·활기찬 찬사",
          "fr": "Récital - Force des fleurs de pêcher",
          "de": "Aufführung - Erfrischender Lobgesang",
          "es": "Recital - Elogio reconfortante"
        },
        "damage": "magic",
        "base": 300,
        "hitDamage": [100],
        "castTime": 10,
        "dualable": false,
        "offset": 14,
        "framesList": [
          60
        ]
      },
      {
        "id": 911985,
        "names": {
          "en": "Butterfly Dance",
          "tw": "蝶舞",
          "kr": "접무",
          "fr": "Danse du papillon",
          "de": "Tanz der Schmetterlinge",
          "es": "Danza de la mariposa"
        },
        "damage": "magic",
        "base": 500,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 50,
        "dualable": false,
        "offset": 14,
        "framesList": [
          52, 20, 20, 20, 20
        ]
      },
      {
        "id": 911986,
        "names": {
          "en": "Searing Phoenix",
          "tw": "燃燒的朱雀",
          "kr": "타오르는 주작",
          "fr": "Phénix incandescent",
          "de": "Sengender Phönix",
          "es": "Fénix llameante"
        },
        "damage": "magic",
        "base": 500,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 58
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 911988,
        "names": {
          "en": "Razor Petal Storm",
          "tw": "剃刀風暴",
          "kr": "체도풍",
          "fr": "Tornade de pétales tranchants",
          "de": "Sturm der messerscharfen Blüten",
          "es": "Tormenta de pétalos filosos"
        },
        "damage": "magic",
        "base": 500,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 911987,
        "names": {
          "en": "Rushing River Flow",
          "tw": "急流河川",
          "kr": "급류강하",
          "fr": "Rivière impétueuse",
          "de": "Rauschender Flußstrom",
          "es": "Caudal impetuoso"
        },
        "damage": "magic",
        "base": 500,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 911996,
        "names": {
          "en": "Moonlight Waltz",
          "tw": "月光華爾茲",
          "kr": "월광의 왈츠",
          "fr": "Valse au clair de lune",
          "de": "Mondscheinwalzer",
          "es": "Vals del claro de luna"
        },
        "damage": "magic",
        "base": 500,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ]
      },
      {
        "id": 950000006,
        "names": {
          "en": "Piercing of a Million Needles",
          "tw": "散針百萬",
          "kr": "산침일만",
          "fr": "Ponction d'un million d'aiguilles",
          "de": "Eine Million Stechnadeln",
          "es": "Millón de agujas punzantes"
        },
        "damage": "magic",
        "base": 2000,
        "hitDamage": [
          2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 12, 14, 20
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          110, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          911985,
          911986,
          911987,
          911988,
          911996
        ]
      }
    ]
  },
  {
    "id": 207,
    "names": {
      "en": "Bai Hu & Zhu Que",
      "tw": "白虎&朱雀",
      "kr": "바이 후 & 주 체",
      "es": "Bai Hu y Zhu Que"
    },
    "abilities": [
      {
        "id": 912039,
        "names": {
          "en": "Element Arts - Blazing Kick",
          "tw": "五行式 - 烈火踢",
          "kr": "속성술·열화축",
          "fr": "Arcane élémentaire - Pied enflammé",
          "de": "Elementarkünste - Lodernder Tritt",
          "es": "Artes elementales - Patada llameante"
        },
        "damage": "magic",
        "base": 550,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 50
          }
        ],
        "framesList": [
          64
        ]
      },
      {
        "id": 912040,
        "names": {
          "en": "Element Arts - Tornado Punch",
          "tw": "五行式 - 旋風拳",
          "kr": "속성술·선풍권",
          "fr": "Arcane élémentaire - Poing tempétueux",
          "de": "Elementarkünste - Tornadofaust",
          "es": "Artes elementales - Puño huracanado"
        },
        "base": 300,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ],
        "framesList": [
          64
        ]
      },
      {
        "id": 912043,
        "names": {
          "en": "Element Arts - Lightning Fist",
          "tw": "五行式 - 雷電拳",
          "kr": "속성술·뇌전권",
          "fr": "Arcane élémentaire - Poing fulgurant",
          "de": "Elementarkünste - Blitzfaust",
          "es": "Artes elementales - Puño relámpago"
        },
        "base": 400,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "lightning",
            "value": 50
          }
        ],
        "framesList": [
          64
        ]
      },
      {
        "id": 912044,
        "names": {
          "en": "Element Arts - Seismic Kick",
          "tw": "五行式 - 地震踢",
          "kr": "속성술·지진축",
          "fr": "Arcane élémentaire - Pied tellurique",
          "de": "Elementarkünste - Seismischer Tritt",
          "es": "Artes elementales - Patada sísmica"
        },
        "damage": "magic",
        "base": 700,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "earth",
            "value": 50
          }
        ],
        "framesList": [
          64
        ]
      },
      {
        "id": 912047,
        "names": {
          "en": "White Tiger - Shattering Fist",
          "tw": "白虎式 - 破碎拳",
          "kr": "백호술·파쇄권",
          "fr": "Tigre blanc - Poing fracassant",
          "de": "Weißer Tiger - Zerschmetternde Faust",
          "es": "Tigre blanco - Puño aplastante"
        },
        "base": 720,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 912048,
        "names": {
          "en": "Blood Phoenix - Defensive Stance",
          "tw": "朱雀式 - 防禦法",
          "kr": "주작술·방어법",
          "fr": "Phénix de sang - Posture défensive",
          "de": "Blutroter Phönix - Verteidigungsstand",
          "es": "Fénix escarlata - Postura de defensa"
        },
        "damage": "magic",
        "base": 950,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 912050,
        "names": {
          "en": "White Tiger - Piercing Claw",
          "tw": "白虎式 - 穿心爪",
          "kr": "백호술·천심조",
          "fr": "Tigre blanc - Griffe lacérante",
          "de": "Weißer Tiger - Durchstoßende Kralle",
          "es": "Tigre blanco - Garra lacerante"
        },
        "base": 200,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 58
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 912051,
        "names": {
          "en": "Blood Phoenix - Burning Strike",
          "tw": "朱雀式 - 猛火拳擊",
          "kr": "주작술·맹화권격",
          "fr": "Phénix de sang - Frappe ardente",
          "de": "Blutroter Phönix - Brennender Streich",
          "es": "Fénix escarlata - Golpe calcinante"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 58
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 912053,
        "names": {
          "en": "White Tiger - Tiger's Roar",
          "tw": "白虎式 - 虎嘯",
          "kr": "백호술·호랑이의 포효",
          "fr": "Tigre blanc - Rugissement du tigre",
          "de": "Weißer Tiger - Gebrüll des Tigers",
          "es": "Tigre blanco - Rugido del tigre"
        },
        "base": 400,
        "hitDamage": [],
        "offset": 8,
        "framesList": [
          110
        ]
      },
      {
        "id": 912060,
        "names": {
          "en": "Saint's Arts - Spirit Palm",
          "tw": "聖人式 - 拳魂",
          "kr": "성인술·혼장",
          "fr": "Arcane du saint - Paume de l'esprit",
          "de": "Heiligenkünste - Geisteshandfläche",
          "es": "Artes santas - Palma espiritual"
        },
        "damage": "magic",
        "base": 1100,
        "hitDamage": [
          41, 59
        ],
        "castTime": 20,
        "offset": 14,
        "framesList": [
          64, 10
        ]
      },
      {
        "id": 912071,
        "names": {
          "en": "Saint's Arts - True Spirit Palm",
          "tw": "聖人式 - 真魂掌",
          "kr": "성인술·진혼장",
          "fr": "Arcane spéciale - Paume de l'esprit suprême",
          "de": "Heiligenkünste - Wahre Geisteshandfläche",
          "es": "Artes santas - Palma espiritual suprema"
        },
        "base": 1000,
        "hitDamage": [
          60, 40
        ],
        "castTime": 20,
        "offset": 14,
        "framesList": [
          64, 10
        ]
      },
      {
        "id": 912061,
        "names": {
          "en": "White Tiger - Limit Strike",
          "tw": "白虎式 - 極限拳",
          "kr": "백호술·극한권",
          "fr": "Tigre blanc - Coup transcendantal",
          "de": "Weißer Tiger - Limitstreich",
          "es": "Tigre blanco - Golpe de oro"
        },
        "base": 300,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "ignore": 50,
        "framesList": [
          64
        ]
      },
      {
        "id": 912062,
        "names": {
          "en": "Blood Phoenix - Energy Burst",
          "tw": "朱雀式 - 能量釋放",
          "kr": "주작술·에너지 방출",
          "fr": "Phénix de sang - Déflagration d'énergie",
          "de": "Blutroter Phönix - Energierausch",
          "es": "Fénix escarlata - Descarga de energía"
        },
        "damage": "magic",
        "base": 1050,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          64
        ]
      },
      {
        "id": 912067,
        "names": {
          "en": "Special Arts - Ferocious Tiger Strike",
          "tw": "特別式 - 猛虎拳擊",
          "kr": "특별술·맹호권격",
          "fr": "Arcane spéciale - Frappe du tigre féroce",
          "de": "Spezialkünste - Wilder Tigerstreich",
          "es": "Artes especiales - Golpe salvaje del tigre"
        },
        "base": 830,
        "hitDamage": [
          2.5060240963855422, 2.5060240963855422, 2.5060240963855422, 2.5060240963855422, 2.5060240963855422, 3.1325301204819276, 84.33734939759034
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 912069,
        "names": {
          "en": "Special Arts - Swift Phoenix Strike",
          "tw": "特別式 - 迅朱雀拳擊",
          "kr": "특별술·신주작권격",
          "fr": "Arcane spéciale - Frappe du phénix vif",
          "de": "Spezialkünste - Flinker Phönixstreich",
          "es": "Artes especiales - Golpe rápido del fénix"
        },
        "damage": "magic",
        "base": 1660,
        "hitDamage": [
          2.5060240963855422, 2.5060240963855422, 2.5060240963855422, 2.5060240963855422, 2.5060240963855422, 3.1325301204819276, 84.33734939759034
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 401006707,
        "names": {
          "en": "Ultimate Art - Tiger & Phoenix Strike",
          "tw": "究極式 - 白虎朱雀攻擊",
          "kr": "궁극술·백호 주작 공격",
          "fr": "Arcane ultime - Frappe du tigre et du phénix",
          "de": "Ultimative Kunst - Tiger- & Phönix-Streich",
          "es": "Arte supremo - Golpe del tigre y del fénix"
        },
        "base": 3180,
        "hitDamage": [
          56.28930817610062, 43.71069182389938
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          95, 25
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          912047,
          912050,
          912053,
          912061,
          912039,
          912040,
          912043,
          912044,
          912060,
          912071,
          912048,
          912051,
          912054,
          912062
        ]
      },
      {
        "count": 4,
        "abilities": [
          912039,
          912040,
          912043,
          912044,
          912047,
          912050,
          912053,
          912061,
          912048,
          912051,
          912054,
          912062,
          912064,
          912067,
          912069
        ]
      }
    ]
  },
  {
    "id": 208,
    "names": {
      "en": "Ignacio",
      "tw": "伊格尼西奧",
      "kr": "이그니시오"
    },
    "abilities": [
      {
        "id": 228963,
        "names": {
          "en": "Termination Stamp",
          "tw": "終結踩踏",
          "kr": "터미네이트 스탬프",
          "fr": "Pilon fatal",
          "de": "Auslöschungsstampfer",
          "es": "Pisotón mortal"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          2
        ]
      },
      {
        "id": 20200,
        "names": {
          "en": "Firaga",
          "tw": "大火焰",
          "kr": "파이가",
          "fr": "Feu X",
          "de": "Feuga",
          "es": "Piro++"
        },
        "damage": "magic",
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          150
        ]
      },
      {
        "id": 228964,
        "names": {
          "en": "Suction Stamp",
          "tw": "抽離踩踏",
          "kr": "석션 스탬프",
          "fr": "Pilon-siphon",
          "de": "Saugstampfer",
          "es": "Pisotón succionador"
        },
        "base": 80,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          40
        ]
      },
      {
        "id": 228962,
        "names": {
          "en": "Burst Stamp",
          "tw": "爆裂踩踏",
          "kr": "버스트 스탬프",
          "fr": "Pilon éclatant",
          "de": "Berststampfer",
          "es": "Pisotón explosivo"
        },
        "base": 275,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "ignore": 50,
        "framesList": [
          17
        ]
      },
      {
        "id": 20290,
        "names": {
          "en": "Firaja",
          "tw": "強火焰",
          "kr": "파이자",
          "fr": "Feu max",
          "de": "Feuka",
          "es": "Piro+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          210
        ]
      },
      {
        "id": 228961,
        "names": {
          "en": "Crush Stamp",
          "tw": "粉碎踩踏",
          "kr": "크러쉬 스탬프",
          "fr": "Pilon écrasant",
          "de": "Zerschmetternder Stampfer",
          "es": "Pisotón aplastante"
        },
        "base": 250,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 75
          }
        ],
        "framesList": [
          17
        ]
      },
      {
        "id": 228965,
        "names": {
          "en": "Critical Stamp",
          "tw": "致命踩踏",
          "kr": "크리티컬 스탬프",
          "fr": "Pilon critique",
          "de": "Kritischer Stampfer",
          "es": "Pisotón crítico"
        },
        "base": 750,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          2
        ]
      },
      {
        "id": 508791,
        "names": {
          "en": "Full Burst Stamp",
          "tw": "全爆裂踩踏",
          "kr": "풀 버스트 스탬프",
          "fr": "Pilon éclatant absolu",
          "de": "Voller Doppelstampfer",
          "es": "Pisotón superexplosivo"
        },
        "base": 525,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "ignore": 50,
        "framesList": [
          17
        ]
      },
      {
        "id": 100018707,
        "names": {
          "en": "Ardent Conflagration",
          "tw": "紅炎超熱爆碎擊",
          "kr": "홍염폭열파쇄격",
          "fr": "Conflagration ardente",
          "de": "Tobende Feuersbrunst",
          "es": "Conflagración ardiente"
        },
        "base": 1135,
        "hitDamage": [
          4.863436123348018, 4.863436123348018, 4.863436123348018, 4.863436123348018, 4.863436123348018, 6.079295154185022, 69.60352422907489
        ],
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          228961,
          228962,
          228963,
          228964,
          228965,
          228966,
          228968,
          228969,
          228970,
          228971,
          228972
        ]
      }
    ]
  },
  {
    "id": 209,
    "names": {
      "en": "Myra",
      "tw": "米菈",
      "kr": "마이라"
    },
    "abilities": [
      {
        "id": 912091,
        "names": {
          "en": "Fighting!",
          "tw": "加油！",
          "kr": "파이팅!",
          "fr": "Je fonce !",
          "de": "Toi toi toi!",
          "es": "¡A luchar!"
        },
        "damage": "magic",
        "base": 180,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      }
    ],
    "multipleWhite": 2,
    "multipleBlack": 2,
    "multipleGreen": 2,
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          912091
        ]
      }
    ]
  },
  {
    "id": 210,
    "names": {
      "en": "Wadow",
      "tw": "瓦多",
      "kr": "와도우"
    },
    "abilities": [
      {
        "id": 214280,
        "names": {
          "en": "Earthsplit Evasion",
          "tw": "土割遁",
          "kr": "토할둔",
          "fr": "Évasion - Fissure terrestre",
          "de": "Erdspaltenvermeidung",
          "es": "Evasión partetierras"
        },
        "damage": "hybrid",
        "base": 300,
        "hitDamage": [
          16, 16, 17, 17, 17, 17
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "offset": 14,
        "framesList": [
          50, 8, 8, 8, 8, 8
        ]
      },
      {
        "id": 218200,
        "names": {
          "en": "Earthsplit Evasion 2",
          "tw": "土割遁・二式",
          "kr": "토할둔 2식",
          "fr": "Évasion - Fissure terrestre II",
          "de": "Erdspaltenvermeidung 2",
          "es": "Evasión partetierra II"
        },
        "damage": "hybrid",
        "base": 425,
        "hitDamage": [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "offset": 14,
        "framesList": [
          120, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 707315,
        "names": {
          "en": "Earthsplit Evasion 2 + 2",
          "tw": "土割遁・二式 + 2",
          "kr": "토할둔 2식 + 2",
          "fr": "Évasion - Fissure terrestre II + 2",
          "de": "Erdspaltenvermeidung 2 + 2",
          "es": "Evasión partetierra II + 2"
        },
        "damage": "hybrid",
        "base": 700,
        "hitDamage": [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "offset": 14,
        "framesList": [
          160, 22, 21, 22, 23, 23, 22, 23
        ]
      },
      {
        "id": 220950,
        "names": {
          "en": "Septic Blade",
          "tw": "多毒刀",
          "kr": "부식도",
          "fr": "Lame sceptique",
          "de": "Giftklinge",
          "es": "Hoja séptica"
        },
        "damage": "hybrid",
        "base": 400,
        "hitDamage": [
          100
        ],
        "castTime": 47,
        "offset": 14,
        "framesList": [
          49
        ]
      },
      {
        "id": 221340,
        "names": {
          "en": "Dog Attack - Earth",
          "tw": "忍犬突·土",
          "kr": "닌자견 돌격·땅",
          "fr": "Attaque canine - Terre",
          "de": "Hundsangriff - Erde",
          "es": "Ataque canino - Tierra"
        },
        "damage": "hybrid",
        "base": 400,
        "hitDamage": [
          100
        ],
        "elements": [
          "earth"
        ],
        "offset": 8,
        "debuffs": [
          {
            "type": "earth",
            "value": 60
          }
        ],
        "framesList": [
          49
        ]
      },
      {
        "id": 221350,
        "names": {
          "en": "Dog Attack - Light",
          "tw": "忍犬突·光",
          "kr": "닌자견 돌격·빛",
          "fr": "Attaque canine - Lumière",
          "de": "Hundsangriff - Licht",
          "es": "Ataque canino - Luz"
        },
        "damage": "hybrid",
        "base": 400,
        "hitDamage": [
          100
        ],
        "elements": [
          "light"
        ],
        "offset": 8,
        "debuffs": [
          {
            "type": "light",
            "value": 60
          }
        ],
        "framesList": [
          49
        ]
      },
      {
        "id": 220930,
        "names": {
          "en": "Super Dog Attack - Earth",
          "tw": "超忍犬突·土",
          "kr": "슈퍼 닌자견 돌격·땅",
          "fr": "Superattaque canine - Terre",
          "de": "Super-Hundeangriff - Erde",
          "es": "Superataque canino - Tierra"
        },
        "damage": "hybrid",
        "base": 1000,
        "hitDamage": [
          25, 25, 25, 25
        ],
        "elements": [
          "earth"
        ],
        "offset": 8,
        "debuffs": [
          {
            "type": "earth",
            "value": 60
          }
        ],
        "framesList": [
          25, 8, 8, 8
        ]
      },
      {
        "id": 220940,
        "names": {
          "en": "Super Dog Attack - Light",
          "tw": "超忍犬突·光",
          "kr": "슈퍼 닌자견 돌격·빛",
          "fr": "Superattaque canine - Lumière",
          "de": "Super-Hundeangriff - Licht",
          "es": "Superataque canino - Luz"
        },
        "damage": "hybrid",
        "base": 1000,
        "hitDamage": [
          25, 25, 25, 25
        ],
        "elements": [
          "light"
        ],
        "offset": 8,
        "debuffs": [
          {
            "type": "light",
            "value": 60
          }
        ],
        "framesList": [
          25, 8, 8, 8
        ]
      },
      {
        "id": 100012706,
        "names": {
          "en": "Earthen Helix",
          "tw": "豪土螺旋輪",
          "kr": "호토나선륜",
          "fr": "Hélice terrestre",
          "de": "Erdhelix",
          "es": "Hélice terrenal"
        },
        "damage": "hybrid",
        "base": 800,
        "hitDamage": [
          33, 33, 34
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          190, 30, 30
        ]
      }
    ]
  },
  {
    "id": 211,
    "names": {
      "en": "Unei",
      "tw": "烏內",
      "kr": "우네",
      "fr": "Unéi",
      "es": "Une"
    },
    "abilities": [
      {
        "id": 20210,
        "names": {
          "en": "Blizzaga",
          "tw": "大暴雪",
          "kr": "블리자가",
          "fr": "Glace X",
          "de": "Eisga",
          "es": "Hielo++"
        },
        "damage": "magic",
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "ice"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          150
        ]
      },
      {
        "id": 228600,
        "names": {
          "en": "Snowstorm",
          "tw": "吹雪",
          "kr": "설풍",
          "fr": "Tempête de neige",
          "de": "Schneesturm",
          "es": "Tormenta de nieve"
        },
        "damage": "magic",
        "base": 275,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "ice"
        ],
        "dualable": false,
        "offset": 14,
        "ignore": 25,
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ]
      },
      {
        "id": 20390,
        "names": {
          "en": "Tornado",
          "tw": "龍捲風",
          "kr": "토네이도",
          "fr": "Tornade"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ],
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ]
      },
      {
        "id": 203001505,
        "names": {
          "en": "Magic Ice Wedge",
          "tw": "魔導冰楔",
          "kr": "마도빙설",
          "fr": "Cale de glace magique",
          "de": "Magischer Eiskeil",
          "es": "Cuña mágica helada"
        },
        "damage": "magic",
        "base": 640,
        "hitDamage": [
          16, 16, 16, 16, 16, 20
        ],
        "elements": [
          "ice"
        ],
        "dualable": false,
        "offset": 8,
        "debuffs": [
          {
            "type": "ice",
            "value": 89
          }
        ],
        "framesList": [
          30, 22, 22, 22, 22, 22
        ]
      }
    ],
    "multipleBlack": 2,
    "multipleWhite": 2,
    "multipleGreen": 2
  },
  {
    "id": 212,
    "names": {
      "en": "Doga",
      "tw": "多加",
      "kr": "도가"
    },
    "abilities": [
      {
        "id": 20200,
        "names": {
          "en": "Firaga",
          "tw": "大火焰",
          "kr": "파이가",
          "fr": "Feu X",
          "de": "Feuga",
          "es": "Piro++"
        },
        "damage": "magic",
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          150
        ]
      },
      {
        "id": 20160,
        "names": {
          "en": "Drain",
          "tw": "吸血",
          "kr": "드레인",
          "fr": "Saignée",
          "de": "Subvita",
          "es": "Drenaje"
        },
        "base": 80,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "dualable": false,
        "offset": 14,
        "framesList": [
          120
        ]
      },
      {
        "id": 20350,
        "names": {
          "en": "Flare",
          "tw": "核爆",
          "kr": "플레어",
          "fr": "Brasier",
          "de": "Flamme",
          "es": "Fulgor"
        },
        "damage": "magic",
        "base": 230,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "water",
            "value": 30
          }
        ],
        "framesList": [
          240
        ]
      },
      {
        "id": 20290,
        "names": {
          "en": "Firaja",
          "tw": "強火焰",
          "kr": "파이자",
          "fr": "Feu max",
          "de": "Feuka",
          "es": "Piro+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          210
        ]
      },
      {
        "id": 20400,
        "names": {
          "en": "Quake",
          "tw": "地槌",
          "kr": "퀘이크",
          "fr": "Séisme",
          "de": "Beben",
          "es": "Seísmo"
        },
        "damage": "magic",
        "base": 275,
        "hitDamage": [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "earth"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "earth",
            "value": 50
          }
        ],
        "framesList": [
          160, 22, 21, 22, 23, 23, 22, 23
        ]
      },
      {
        "id": 203000606,
        "names": {
          "en": "Doga's Flame",
          "tw": "多加之炎",
          "kr": "도가의 불꽃",
          "fr": "Flamme de Doga",
          "de": "Dogas Flamme",
          "es": "Llama de Doga"
        },
        "damage": "magic",
        "base": 740,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 8,
        "debuffs": [
          {
            "type": "fire",
            "value": 100
          }
        ],
        "framesList": [
          37, 15, 15, 15, 15, 15, 15
        ]
      }
    ],
    "multipleBlack": 2,
    "multipleWhite": 2,
    "multipleGreen": 2
  },
  {
    "id": 213,
    "names": {
      "en": "Onion Knight Refia",
      "tw": "洋蔥劍士蕾菲亞",
      "kr": "양파 검사 레피아",
      "fr": "Refia, chevalier oignon",
      "de": "Zwiebelritter Refia",
      "es": "Refia, Caballero Cebolla"
    },
    "abilities": [
      {
        "id": 211420,
        "names": {
          "en": "Full Speed Bladeblitz",
          "tw": "全速全斬",
          "kr": "전속 전방위 베기",
          "fr": "Lame éclair rapide",
          "de": "Voller Klingenblitz",
          "es": "Tormenta de acero"
        },
        "base": 220,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ]
      },
      {
        "id": 228551,
        "names": {
          "en": "Onion Shredder",
          "tw": "洋蔥攪拌機",
          "kr": "양파 채썰기",
          "fr": "Taille-oignon",
          "de": "Zwiebelschredder",
          "es": "Picacebolla"
        },
        "base": 450,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 42,
        "offset": 14,
        "framesList": [
          44, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ]
      },
      {
        "id": 508620,
        "names": {
          "en": "Hacked to Pieces",
          "tw": "切碎",
          "kr": "산산조각 내기",
          "fr": "En mille morceaux",
          "de": "Kleingehackt",
          "es": "Picadillo de enemigo"
        },
        "base": 550,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ]
      },
      {
        "id": 508622,
        "names": {
          "en": "Onion Meteor",
          "tw": "洋蔥隕石",
          "kr": "양파 메테오",
          "fr": "Météore d'oignon",
          "de": "Zwiebelmeteor",
          "es": "Meteorito Cebolla"
        },
        "base": 600,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "castTime": 2,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          44, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ]
      },
      {
        "id": 203001307,
        "names": {
          "en": "Radiant Sword",
          "tw": "閃耀之劍",
          "kr": "트윙클 소드",
          "fr": "Épée radieuse",
          "de": "Leuchtendes Schwert",
          "es": "Espada resplandeciente"
        },
        "base": 1600,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 55
        ],
        "dualable": false,
        "offset": 8,
        "debuffs": [
          {
            "type": "fire",
            "value": 80
          },
          {
            "type": "water",
            "value": 80
          },
          {
            "type": "wind",
            "value": 80
          },
          {
            "type": "earth",
            "value": 80
          }
        ],
        "framesList": [
          61, 6, 6, 6, 22, 6, 6, 6, 6, 55
        ]
      }
    ]
  },
  {
    "id": 214,
    "names": {
      "en": "Dark Knight Luneth",
      "tw": "魔劍士魯內斯",
      "kr": "마검사 루네스",
      "fr": "Luneth, chevalier noir",
      "de": "Dunkelritter Luneth",
      "es": "Luneth, Caballero Oscuro"
    },
    "abilities": [
      {
        "id": 200170,
        "names": {
          "en": "Darkness",
          "tw": "黑暗魔法",
          "kr": "암흑",
          "fr": "Ténèbres",
          "de": "Schwarzkunst",
          "es": "Oscuridad"
        },
        "base": 150,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "offset": 14,
        "framesList": [
          80
        ]
      },
      {
        "id": 203330,
        "names": {
          "en": "Hit All",
          "tw": "攻擊全體",
          "kr": "전체 히트",
          "fr": "Frappe-tout",
          "de": "Multitreffer",
          "es": "Golpe global"
        },
        "base": 180,
        "hitDamage": [100],
        "offset": 8,
        "framesList": [27]
      },
      {
        "id": 228571,
        "names": {
          "en": "Dark Blade - Kyuumei-Youtou",
          "tw": "暗黑劍·吸命妖刀",
          "kr": "암흑검·생명을 빨아들이는 요도",
          "fr": "Lame obscure - Kyuumei-Youtou",
          "de": "Dunkelklinge - Lebensfresserklinge",
          "es": "Hoja oscura - Kyuumei-Youtou"
        },
        "base": 100,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          45
        ]
      },
      {
        "id": 228574,
        "names": {
          "en": "Dark Blade - Kikuichimonji",
          "tw": "暗黑劍·菊一文字",
          "kr": "암흑검·키쿠이치몬지",
          "fr": "Lame obscure - Kikuichimonji",
          "de": "Dunkelklinge - Chrysanthemenzeichen",
          "es": "Hoja oscura - Kikuichimonji"
        },
        "base": 300,
        "hitDamage": [
          100
        ],
        "castTime": 24,
        "offset": 14,
        "framesList": [
          27
        ]
      },
      {
        "id": 228575,
        "names": {
          "en": "Dark Blade - Masamune",
          "tw": "暗黑劍·正宗",
          "kr": "암흑검·마사무네",
          "fr": "Lame obscure - Masamune",
          "de": "Dunkelklinge - Masamune",
          "es": "Hoja oscura - Masamune"
        },
        "base": 300,
        "hitDamage": [
          100
        ],
        "castTime": 25,
        "offset": 14,
        "framesList": [
          27
        ]
      },
      {
        "id": 228570,
        "names": {
          "en": "Dark Blade - Ansai",
          "tw": "暗黑劍·闇碎",
          "kr": "암흑검·암쇄",
          "fr": "Lame obscure - Ansaï",
          "de": "Dunkelklinge - Ansai",
          "es": "Hoja oscura - Ansai"
        },
        "base": 350,
        "hitDamage": [
          100
        ],
        "castTime": 25,
        "offset": 14,
        "debuffs": [
          {
            "type": "dark",
            "value": 60
          }
        ],
        "framesList": [
          27
        ]
      },
      {
        "id": 228573,
        "names": {
          "en": "Dark Blade - Kotetsu",
          "tw": "暗黑劍·虎徹",
          "kr": "암흑검·코테츠",
          "fr": "Lame obscure - Kotetsu",
          "de": "Dunkelklinge - Kotetsu",
          "es": "Hoja oscura - Kotetsu"
        },
        "base": 350,
        "hitDamage": [
          100
        ],
        "castTime": 25,
        "offset": 14,
        "framesList": [
          27
        ]
      },
      {
        "id": 228572,
        "names": {
          "en": "Dark Blade - Ashura",
          "tw": "暗黑劍·阿修羅",
          "kr": "암흑검·아수라",
          "fr": "Lame obscure - Ashura",
          "de": "Dunkelklinge - Ashura",
          "es": "Hoja oscura - Ashura"
        },
        "base": 350,
        "hitDamage": [
          100
        ],
        "castTime": 25,
        "offset": 14,
        "framesList": [
          42
        ]
      },
      {
        "id": 228576,
        "names": {
          "en": "Dark Blade - Ma-no-Meigeki",
          "tw": "暗黑劍·魔冥擊",
          "kr": "암흑검·마의 명격",
          "fr": "Lame obscure - Ma-no-Meigeki",
          "de": "Dunkelklinge - Teuflischer Dunkelstreich",
          "es": "Hoja oscura - Ma-no-Meigeki"
        },
        "base": 750,
        "hitDamage": [
          100
        ],
        "castTime": 25,
        "offset": 14,
        "framesList": [
          27
        ]
      },
      {
        "id": 508632,
        "names": {
          "en": "Scar of the Abyss",
          "tw": "深淵傷痕",
          "kr": "심연의 상흔",
          "fr": "Cicatrice de l'abysse",
          "de": "Narbe des Abgrunds",
          "es": "Cicatriz del abismo"
        },
        "base": 1700,
        "hitDamage": [100],
        "castTime": 1,
        "offset": 14,
        "framesList": [
          227
        ]
      },
      {
        "id": 203001407,
        "names": {
          "en": "Blade of Destruction",
          "tw": "魔滅刃",
          "kr": "마멸인",
          "fr": "Lame de destruction",
          "de": "Klinge der Zerstörung",
          "es": "Hoja de la destrucción"
        },
        "base": 1100,
        "hitDamage": [100],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          90
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          228570,
          228571,
          228572,
          228573,
          228574,
          228575,
          228576,
          508630
        ]
      }
    ]
  },
  {
    "id": 215,
    "names": {
      "en": "Falma",
      "tw": "法瑪",
      "kr": "팔마"
    },
    "abilities": [
      {
        "id": 229334,
        "names": {
          "en": "Reverse Thrust - HP",
          "tw": "反轉推力・HP",
          "kr": "역추진 장치·HP",
          "fr": "Virevolte arrière - PV",
          "de": "Umkehrschub - LP",
          "es": "Empuje de reversa - VIT"
        },
        "base": 130,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          120
        ]
      },
      {
        "id": 229332,
        "names": {
          "en": "Wings of a Dream",
          "tw": "夢之翼",
          "kr": "꿈의 날개",
          "fr": "Ailes oniriques",
          "de": "Traumflügel",
          "es": "Alas oníricas"
        },
        "base": 240,
        "hitDamage": [
          16, 16, 16, 16, 16, 20
        ],
        "castTime": 40,
        "offset": 14,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          },
          {
            "type": "light",
            "value": 50
          }
        ],
        "framesList": [
          52, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 229333,
        "names": {
          "en": "Full Speed Ahead",
          "tw": "全速前進",
          "kr": "전속 전진",
          "fr": "En avant toute !",
          "de": "Mit Volldampf voraus",
          "es": "A toda velocidad"
        },
        "base": 240,
        "hitDamage": [
          16, 16, 16, 16, 16, 20
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          52, 10, 10, 10, 10, 10,
          48
        ]
      },
      {
        "id": 229331,
        "names": {
          "en": "Landing Lights",
          "tw": "著陸指示燈",
          "kr": "랜딩 글라이드",
          "fr": "Phares d'atterrissage",
          "de": "Landescheinwerfer",
          "es": "Luces de aterrizaje"
        },
        "base": 300,
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "offset": 14,
        "framesList": [
          52, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 229330,
        "names": {
          "en": "Wingtip",
          "tw": "翼梢",
          "kr": "윙 팁",
          "fr": "Aileron",
          "de": "Flügelspitze",
          "es": "Punta de ala"
        },
        "base": 300,
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "offset": 14,
        "framesList": [
          52, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 100019805,
        "names": {
          "en": "Signal Bullet",
          "tw": "訊號子彈",
          "kr": "신호탄",
          "fr": "Balle signalétique",
          "de": "Signalschuss",
          "es": "Bala señalizadora"
        },
        "base": 440,
        "hitDamage": [
          33, 33, 34
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          196, 20, 20
        ]
      }
    ]
  },
  {
    "id": 216,
    "names": {
      "en": "Nagflar",
      "tw": "納古爾法",
      "kr": "나글파",
      "de": "Naglfar"
    },
    "abilities": [
      {
        "id": 209910,
        "names": {
          "en": "Heavy Hammer",
          "tw": "沉重鎚擊",
          "kr": "무거운 망치",
          "fr": "Marteau lourd",
          "de": "Schwerer Hammer",
          "es": "Martillo pesado"
        },
        "base": 160,
        "hitDamage": [
          33, 33, 34
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 25,
        "framesList": [
          42, 10, 10
        ]
      },
      {
        "id": 229311,
        "names": {
          "en": "Dig it up, lali!",
          "tw": "挖起來啦哩！",
          "kr": "캐내자라리!",
          "fr": "On refait surface !",
          "de": "Zu Tage, lali!",
          "es": "¡Y después a excavar!"
        },
        "base": 400,
        "hitDamage": [
          14, 14, 14, 14, 14, 15, 15
        ],
        "elements": [
          "earth"
        ],
        "offset": 36,
        "debuffs": [
          {
            "type": "earth",
            "value": 50
          }
        ],
        "framesList": [
          2, 8, 8, 8, 8, 8, 8
        ]
      },
      {
        "id": 209920,
        "names": {
          "en": "Special Hammer",
          "tw": "特殊鎚擊",
          "kr": "스페셜 망치",
          "fr": "Marteau spécial",
          "de": "Spezialhammer",
          "es": "Martillo especial"
        },
        "base": 140,
        "hitDamage": [
          14, 14, 15, 14, 14, 15, 14
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 25,
        "framesList": [
          42, 8, 8, 8, 8, 8, 16
        ]
      },
      {
        "id": 229310,
        "names": {
          "en": "Dig down deep, lali!",
          "tw": "向下挖啦哩！",
          "kr": "파자라리!",
          "fr": "On creuse profond !",
          "de": "Grab tief, lali!",
          "es": "¡Cavar, cavar, cavar, lalá!"
        },
        "base": 320,
        "hitDamage": [
          14, 14, 14, 14, 14, 15, 15
        ],
        "elements": [
          "earth"
        ],
        "offset": 36,
        "debuffs": [
          {
            "type": "earth",
            "value": 50
          }
        ],
        "framesList": [
          2, 8, 8, 8, 8, 8, 8
        ]
      },
      {
        "id": 100019706,
        "names": {
          "en": "General's Toolbox",
          "tw": "大將的工作道具",
          "kr": "대장의 작업 도구",
          "fr": "Boîte à outils du général",
          "de": "Werkzeugkasten des Generals",
          "es": "Caja de herramientas del general"
        },
        "base": 840,
        "hitDamage": [
          10, 10, 10, 10, 60
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          108, 6, 12, 6, 14
        ]
      }
    ]
  },
  {
    "id": 217,
    "names": {
      "en": "Cid",
      "tw": "希德",
      "kr": "시드"
    },
    "abilities": [
      {
        "id": 508944,
        "names": {
          "en": "Gale Grid",
          "tw": "風向坐標",
          "kr": "게일 그리드",
          "fr": "Rafale ravageuse",
          "de": "Sturmgitter",
          "es": "Rosa de los vientos"
        },
        "base": 450,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "debuffs": [
          {
            "type": "wind",
            "value": 75
          }
        ],
        "dualable": false,
        "framesList": [
          0
        ]
      },
      {
        "id": 508945,
        "names": {
          "en": "Gale Grid+",
          "tw": "風向坐標·改",
          "kr": "개량형 게일 그리드",
          "fr": "Rafale ravageuse +",
          "de": "Sturmgitter+",
          "es": "Rosa de los vientos+"
        },
        "base": 1000,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "debuffs": [
          {
            "type": "wind",
            "value": 100
          }
        ],
        "dualable": false,
        "framesList": [
          0
        ]
      },
      {
        "id": 508946,
        "names": {
          "en": "Spineshatter Dive 0+",
          "tw": "破碎衝零式·改",
          "kr": "개량형 척추 강타 0식",
          "fr": "Piqué brise-échine style 0 +",
          "de": "Zerschmetternder Sturzflug 0+",
          "es": "Rompespaldas 0+"
        },
        "base": 1850,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "dualable": false,
        "framesList": [
          0
        ]
      },
      {
        "id": 508947,
        "names": {
          "en": "True Spineshatter Dive 0",
          "tw": "真破碎衝零式",
          "kr": "진 척추 강타 0식",
          "fr": "Piqué brise-échine style 0 absolu",
          "de": "Wahrer Zerschmetternder Sturzflug 0+",
          "es": "Rompespaldas 0 mortal"
        },
        "base": 1850,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "dualable": false,
        "framesList": [
          0
        ]
      },
      {
        "id": 212190,
        "names": {
          "en": "Blade Dance",
          "tw": "劍舞",
          "kr": "칼춤",
          "fr": "Danse du sabre",
          "de": "Schwerttanz",
          "es": "Baile de espadas"
        },
        "base": 360,
        "hitDamage": [13.3333333333, 20, 13.3333333333, 20, 13.3333333334, 20],
        "offset": 24,
        "framesList": [27, 57, 90, 120, 153, 183],
        "castTime": 75,
      },
      {
        "id": 229274,
        "names": {
          "en": "Sky Charge",
          "tw": "天空蓄力",
          "kr": "스카이 차지",
          "fr": "Charge céleste",
          "de": "Luftansturm",
          "es": "Carga celestial"
        },
        "base": 80,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          120
        ]
      },
      {
        "id": 221330,
        "names": {
          "en": "Dispel Lance",
          "tw": "驅魔長槍",
          "kr": "디스펠 랜스",
          "fr": "Lance dissipation",
          "de": "Bannlanze",
          "es": "Lanza Antimagia"
        },
        "base": 200,
        "hitDamage": [40, 60],
        "offset": 8,
        "framesList": [27, 57],
        "castTime": 25,
      },
      {
        "id": 508942,
        "names": {
          "en": "Aerial Shot",
          "tw": "航空射擊",
          "kr": "공중 사격",
          "fr": "Tir aérien",
          "de": "Luftschuss",
          "es": "Golpe aéreo"
        },
        "base": 450,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "dualable": false,
        "framesList": [
          0
        ]
      },
      {
        "id": 508943,
        "names": {
          "en": "Aerial Shot+",
          "tw": "航空射擊·改",
          "kr": "개량형 공중 사격",
          "fr": "Tir aérien +",
          "de": "Luftschuss+",
          "es": "Golpe aéreo+"
        },
        "base": 1000,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "dualable": false,
        "framesList": [
          0
        ]
      },
      {
        "id": 508940,
        "names": {
          "en": "Downforce",
          "tw": "下壓力",
          "kr": "다운 포스",
          "fr": "Courant descendant",
          "de": "Abtrieb",
          "es": "Fuerza aerodinámica"
        },
        "base": 450,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "dualable": false,
        "framesList": [
          0
        ]
      },
      {
        "id": 508941,
        "names": {
          "en": "Downforce+",
          "tw": "下壓力·改",
          "kr": "개량형 다운 포스",
          "fr": "Courant descendant +",
          "de": "Abtrieb+",
          "es": "Fuerza aerodinámica+"
        },
        "base": 1000,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "dualable": false,
        "framesList": [
          0
        ]
      },
      {
        "id": 229276,
        "names": {
          "en": "Air Stratus",
          "tw": "天氣層雲",
          "kr": "대폭격",
          "fr": "Stratus protecteur",
          "de": "Nebelwolke",
          "es": "Estrato de aire"
        },
        "base": 470,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "dualable": false,
        "framesList": [
          0
        ]
      },
      {
        "id": 229277,
        "names": {
          "en": "Beast Spindle",
          "tw": "猛獸迴旋",
          "kr": "비스트 스핀들",
          "fr": "Broche bestiale",
          "de": "Bestienspindel",
          "es": "Cabrestante de bestias"
        },
        "base": 850,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "dualable": false,
        "framesList": [
          0
        ]
      },
      {
        "id": 100019507,
        "names": {
          "en": "Invincible Highwind",
          "tw": "無敵·神風",
          "kr": "인빈시블 하이윈드",
          "fr": "Invincible Hautvent",
          "de": "Unbesiegbarer Sturmwind",
          "es": "Torbellino indomable"
        },
        "base": 1400,
        "hitDamage": [
          100
        ],
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          30
        ]
      }
    ],
    dual: false
  },
  {
    "id": 218,
    "names": {
      "en": "Yuraisha",
      "tw": "尤萊莎",
      "kr": "유라이샤"
    },
    "abilities": [
      {
        "id": 20250,
        "names": {
          "en": "Stonga",
          "tw": "大落石",
          "kr": "스톤가",
          "fr": "Terre X",
          "de": "Terraga",
          "es": "Piedra++"
        },
        "damage": "magic",
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "earth"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          180
        ]
      },
      {
        "id": 20240,
        "names": {
          "en": "Aeroga",
          "tw": "大勁風",
          "kr": "에어로가",
          "fr": "Vent X",
          "es": "Aero++"
        },
        "damage": "magic",
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          110
        ]
      },
      {
        "id": 20340,
        "names": {
          "en": "Stonja",
          "tw": "強落石",
          "kr": "스톤쟈",
          "fr": "Terre max",
          "de": "Terraka",
          "es": "Piedra+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "earth"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          170
        ]
      },
      {
        "id": 20330,
        "names": {
          "en": "Aeroja",
          "tw": "強勁風",
          "kr": "에어로쟈",
          "fr": "Vent max",
          "de": "Aeroka",
          "es": "Aero+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          170
        ]
      },
      {
        "id": 228508,
        "names": {
          "en": "Dissipation Slam",
          "tw": "解咒抹掌",
          "kr": "해주말장",
          "fr": "Horion dissipateur",
          "de": "Zerstreuender Schlag",
          "es": "Golpe desenfrenado"
        },
        "base": 100,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          2
        ]
      },
      {
        "id": 20400,
        "names": {
          "en": "Quake",
          "tw": "地槌",
          "kr": "퀘이크",
          "fr": "Séisme",
          "de": "Beben",
          "es": "Seísmo"
        },
        "damage": "magic",
        "base": 275,
        "hitDamage": [
          12, 13, 12, 13, 12, 13, 12, 13
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "earth"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "earth",
            "value": 50
          }
        ],
        "framesList": [
          160, 22, 21, 22, 23, 23, 22, 23
        ]
      }
    ],
    "multipleBlack": 2,
    "multipleWhite": 2,
    "multipleGreen": 2
  },
  {
    "id": 219,
    "names": {
      "en": "Ishil",
      "tw": "伊修爾",
      "kr": "이실"
    },
    "abilities": [
      {
        "id": 228540,
        "names": {
          "en": "Area Shot",
          "tw": "範圍射擊",
          "kr": "범구역 사격",
          "fr": "Tir de zone",
          "de": "Flächenschuss",
          "es": "Zona de tiro"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42
        ]
      },
      {
        "id": 228541,
        "names": {
          "en": "Twin Arrow",
          "tw": "雙箭",
          "kr": "쌍화살",
          "fr": "Flèches jumelles",
          "de": "Zwillingspfeil",
          "es": "Flechas gemelas"
        },
        "base": 440,
        "hitDamage": [
          50, 50
        ],
        "castTime": 80,
        "offset": 32,
        "framesList": [
          42, 56
        ]
      },
      {
        "id": 228542,
        "names": {
          "en": "Hawk Shot",
          "tw": "鷹隼射擊",
          "kr": "매의 사격",
          "fr": "Tir de l'aigle",
          "de": "Adlerschuss",
          "es": "Tiro de halcón"
        },
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          100
        ]
      },
      {
        "id": 228543,
        "names": {
          "en": "Chaos Arrow",
          "tw": "混沌箭",
          "kr": "혼돈의 화살",
          "fr": "Flèche du chaos",
          "de": "Chaospfeil",
          "es": "Flecha caótica"
        },
        "base": 150,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42
        ]
      },
      {
        "id": 228546,
        "names": {
          "en": "Impaling Shot",
          "tw": "撕裂射擊",
          "kr": "천공의 사격",
          "fr": "Empalement instantané",
          "de": "Pfählschuss",
          "es": "Disparo perforador"
        },
        "base": 300,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 20,
        "framesList": [
          50
        ]
      },
      {
        "id": 228547,
        "names": {
          "en": "Squall Arrow",
          "tw": "狂風射擊",
          "kr": "돌풍의 화살",
          "fr": "Flèche du requin",
          "de": "Sturmpfeile",
          "es": "Flecha tempestuosa"
        },
        "base": 425,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 200,
        "offset": 80,
        "framesList": [
          80, 56, 56, 56, 56
        ]
      },
      {
        "id": 100017805,
        "names": {
          "en": "Scorching Bow",
          "tw": "燒盡魔弓",
          "kr": "소진마궁",
          "fr": "Arc flamboyant",
          "de": "Sengender Bogen",
          "es": "Arco ardiente"
        },
        "base": 720,
        "hitDamage": [
          100
        ],
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          120
        ]
      }
    ]
  },
  {
    "id": 220,
    "names": {
      "en": "Franis",
      "tw": "弗拉尼斯",
      "kr": "프라니스"
    },
    "abilities": [
      {
        "id": 228520,
        "names": {
          "en": "Thrust",
          "tw": "刺突",
          "kr": "꿰뚫기",
          "fr": "Coup plongeant",
          "de": "Stoß",
          "es": "Estocada"
        },
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 18,
        "offset": 14,
        "framesList": [
          10
        ]
      },
      {
        "id": 200440,
        "names": {
          "en": "Bladeblitz",
          "tw": "全斬",
          "kr": "전방위 베기",
          "fr": "Lame éclair",
          "de": "Klingenblitz",
          "es": "Relámpago de acero"
        },
        "base": 140,
        "hitDamage": [50, 50],
        "offset": 18,
        "framesList": [20, 36]
      },
      {
        "id": 228521,
        "names": {
          "en": "Heat Knuckle",
          "tw": "灼熱一指",
          "kr": "작열의 너클",
          "fr": "Poing ardent",
          "de": "Hitzefaust",
          "es": "Puño ardiente"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "elements": [
          "fire"
        ],
        "offset": 8,
        "framesList": [
          15
        ]
      },
      {
        "id": 508610,
        "names": {
          "en": "Burning Reprisal",
          "tw": "反擊灼刀",
          "kr": "반격의 작도",
          "fr": "Riposte enflammée",
          "de": "Brennende Vergeltung",
          "es": "Represalia ardiente"
        },
        "base": 200,
        "hitDamage": [
          50, 50
        ],
        "castTime": 18,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "framesList": [
          20, 16
        ]
      },
      {
        "id": 228524,
        "names": {
          "en": "Searing Slash",
          "tw": "炎熱斬",
          "kr": "염열참",
          "fr": "Entaille incendiaire",
          "de": "Sengender Schnitt",
          "es": "Corte abrasador"
        },
        "base": 280,
        "hitDamage": [
          50, 50
        ],
        "castTime": 18,
        "offset": 14,
        "framesList": [
          20, 16
        ]
      },
      {
        "id": 228525,
        "names": {
          "en": "Double Strike",
          "tw": "二連刺",
          "kr": "연속 찌르기",
          "fr": "Double frappe",
          "de": "Doppelstreich",
          "es": "Golpe doble"
        },
        "base": 360,
        "hitDamage": [
          50, 50
        ],
        "offset": 8,
        "framesList": [
          2, 8
        ]
      },
      {
        "id": 228529,
        "names": {
          "en": "Hellflame Flash",
          "tw": "業炎閃",
          "kr": "업염섬",
          "fr": "Éclair infernal",
          "de": "Höllischer Blitz",
          "es": "Fulgor infernal"
        },
        "base": 380,
        "hitDamage": [
          50, 50
        ],
        "castTime": 18,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "framesList": [
          20, 16
        ]
      },
      {
        "id": 228530,
        "names": {
          "en": "Carmine Bisect",
          "tw": "洋紅二分斬",
          "kr": "암적색의 양단",
          "fr": "Division sanglante",
          "de": "Blutrote Zweiteilung",
          "es": "División sanguinolenta"
        },
        "base": 340,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "offset": 8,
        "debuffs": [
          {
            "type": "fire",
            "value": 50
          }
        ],
        "framesList": [
          2, 10, 10, 10, 10
        ]
      },
      {
        "id": 228528,
        "names": {
          "en": "Full-Body Lunge",
          "tw": "渾身刺",
          "kr": "혼신의 찌르기",
          "fr": "Placage total",
          "de": "Totaler Ausfallschritt",
          "es": "Placaje total"
        },
        "base": 420,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          2
        ]
      },
      {
        "id": 100017706,
        "names": {
          "en": "Violent Heat",
          "tw": "暴力擊打",
          "kr": "혹서",
          "fr": "Chaleur cuisante",
          "de": "Brutale Hitze",
          "es": "Quemazón violenta"
        },
        "base": 535,
        "hitDamage": [
          100
        ],
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          206
        ]
      }
    ]
  },
  {
    "id": 221,
    "names": {
      "en": "Karlette",
      "tw": "卡瑞菈特",
      "kr": "칼레라트"
    },
    "abilities": [
      {
        "id": 20320,
        "names": {
          "en": "Waterja",
          "tw": "強流水",
          "kr": "워터쟈",
          "fr": "Eau max",
          "de": "Aquaka",
          "es": "Aqua+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "water"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          190
        ]
      },
      {
        "id": 20330,
        "names": {
          "en": "Aeroja",
          "tw": "強勁風",
          "kr": "에어로쟈",
          "fr": "Vent max",
          "de": "Aeroka",
          "es": "Aero+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          170
        ]
      },
      {
        "id": 20290,
        "names": {
          "en": "Firaja",
          "tw": "強火焰",
          "kr": "파이자",
          "fr": "Feu max",
          "de": "Feuka",
          "es": "Piro+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          210
        ]
      },
      {
        "id": 20310,
        "names": {
          "en": "Thundaja",
          "tw": "強雷電",
          "kr": "선더쟈",
          "fr": "Foudre max",
          "de": "Blitzka",
          "es": "Electro+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          150
        ]
      },
      {
        "id": 229243,
        "names": {
          "en": "Aquatic Creation",
          "tw": "洪水鍛造",
          "kr": "워터 포지",
          "fr": "Création aquatique",
          "de": "Aquatische Schöpfung",
          "es": "Creación acuática"
        },
        "damage": "hybrid",
        "base": 1150,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 20,
        "elements": [
          "water"
        ],
        "offset": 14,
        "framesList": [
          22, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 20
        ]
      },
      {
        "id": 229244,
        "names": {
          "en": "Aerial Creation",
          "tw": "暴風鍛造",
          "kr": "에어로 포지",
          "fr": "Création aérienne",
          "de": "Luftige Schöpfung",
          "es": "Creación aérea"
        },
        "damage": "hybrid",
        "base": 1150,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 229241,
        "names": {
          "en": "Volcanic Creation",
          "tw": "猛火鍛造",
          "kr": "파이어 포지",
          "fr": "Création volcanique",
          "de": "Vulkanische Schöpfung",
          "es": "Creación ígnea"
        },
        "damage": "hybrid",
        "base": 1300,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "framesList": [
          45
        ]
      },
      {
        "id": 229242,
        "names": {
          "en": "Cosmic Creation",
          "tw": "落雷鍛造",
          "kr": "선더 포지",
          "fr": "Création cosmique",
          "de": "Kosmische Schöpfung",
          "es": "Creación eléctrica"
        },
        "damage": "hybrid",
        "base": 1150,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 229253,
        "names": {
          "en": "Merciless",
          "tw": "冷酷無情",
          "kr": "무자비",
          "fr": "Sans merci",
          "de": "Gnadenlos",
          "es": "Inmisericordia"
        },
        "damage": "hybrid",
        "base": 1100,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "elements": [
          "lightning",
          "light"
        ],
        "offset": 14,
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ]
      },
      {
        "id": 508932,
        "names": {
          "en": "Lost Legacy",
          "tw": "失落的遺產",
          "kr": "잃어버린 유산",
          "fr": "Héritage perdu",
          "de": "Verlorenes Vermächtnis",
          "es": "Legado perdido"
        },
        "damage": "hybrid",
        "base": 3600,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          68
        ]
      },
      {
        "id": 100019907,
        "names": {
          "en": "Elemental Lord",
          "tw": "元素之主",
          "kr": "원소의 제왕",
          "fr": "Seigneur des éléments",
          "de": "Herr der Elemente",
          "es": "Señor de los elementos"
        },
        "damage": "hybrid",
        "base": 3600,
        "hitDamage": [
          4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 13, 13, 7, 8, 15
        ],
        "dualable": false,
        "offset": 8,
        "debuffs": [
          {
            "type": "fire",
            "value": 80
          },
          {
            "type": "lightning",
            "value": 80
          },
          {
            "type": "water",
            "value": 80
          },
          {
            "type": "wind",
            "value": 80
          }
        ],
        "framesList": [
          40, 9, 7, 9, 7, 9, 7, 9, 7, 9, 7, 54, 20, 20, 20, 20
        ]
      }
    ],
    "multipleBlack": 2,
    "multipleWhite": 2,
    "multipleGreen": 2,
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          229241,
          229242,
          229243,
          229244,
          229253
        ]
      }
    ],
    dual: false
  },
  {
    "id": 222,
    "names": {
      "en": "Chu-Chu",
      "tw": "啾啾",
      "kr": "츄츄"
    },
    "abilities": [
      {
        "id": 228841,
        "names": {
          "en": "Culen Prayer",
          "tw": "庫雷恩的祈禱",
          "kr": "코른의 기도",
          "fr": "Prière de Culen",
          "de": "Culen-Gebet",
          "es": "Oración de Culen"
        },
        "base": 1,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          80
        ]
      },
      {
        "id": 228842,
        "names": {
          "en": "Myrm Prayer",
          "tw": "穆魯姆的祈禱",
          "kr": "물룸의 기도",
          "fr": "Prière de Myrm",
          "de": "Myrm-Gebet",
          "es": "Oración de Myrm"
        },
        "base": 1,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          150
        ]
      },
      {
        "id": 228845,
        "names": {
          "en": "Forest Wind",
          "tw": "森林之風",
          "kr": "숲의 바람",
          "fr": "Vent sylvestre",
          "de": "Waldwind",
          "es": "Viento del bosque"
        },
        "damage": "magic",
        "base": 200,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          120
        ]
      },
      {
        "id": 228847,
        "names": {
          "en": "Earth Gnome",
          "tw": "大地居民",
          "kr": "대지의 주민",
          "fr": "Habitante de la terre",
          "de": "Erdgnom",
          "es": "Gnomo de tierra"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          100
        ]
      },
      {
        "id": 228848,
        "names": {
          "en": "Ancient Myth",
          "tw": "太古的神秘",
          "kr": "태고의 신비",
          "fr": "Mythe séculaire",
          "de": "Uraltes Mysterium",
          "es": "Mito antiguo"
        },
        "damage": "magic",
        "base": 300,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          150
        ]
      },
      {
        "id": 331000605,
        "names": {
          "en": "Chu-Chu's Spell",
          "tw": "啾啾特製",
          "kr": "츄츄 스페셜",
          "fr": "Charme de Chu-Chu",
          "de": "Chu-Chus Spruch",
          "es": "Hechizo de Chu-Chu"
        },
        "damage": "magic",
        "base": 550,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          220
        ]
      }
    ]
  },
  {
    "id": 223,
    "names": {
      "en": "Rico",
      "tw": "利柯",
      "kr": "리코"
    },
    "abilities": [
      {
        "id": 228821,
        "names": {
          "en": "Rico Rocket",
          "tw": "利柯火箭",
          "kr": "리코 로켓",
          "fr": "Rico-roquette",
          "de": "Rico-Rakete",
          "es": "Cohete Rico"
        },
        "base": 180,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          2
        ]
      },
      {
        "id": 228822,
        "names": {
          "en": "Death Drive",
          "tw": "死亡驅動",
          "kr": "데스 드라이브",
          "fr": "Ruée mortelle",
          "de": "Tödliche Hektik",
          "es": "Impulso mortal"
        },
        "base": 210,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          2
        ]
      },
      {
        "id": 228823,
        "names": {
          "en": "Dragon Fist",
          "tw": "龍拳",
          "kr": "드래곤 너클",
          "fr": "Poing du dragon",
          "de": "Drachenfaust",
          "es": "Puño del dragón"
        },
        "base": 170,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          2
        ]
      },
      {
        "id": 228825,
        "names": {
          "en": "Fire Bomb",
          "tw": "雷炎爆彈",
          "kr": "염뢰 폭탄",
          "fr": "Bombe incendiaire",
          "de": "Feuerbombe",
          "es": "Bomba ígnea"
        },
        "base": 250,
        "hitDamage": [
          100
        ],
        "elements": [
          "fire"
        ],
        "offset": 8,
        "framesList": [
          20
        ]
      },
      {
        "id": 228826,
        "names": {
          "en": "Pile Crusher",
          "tw": "堆疊粉碎",
          "kr": "파일 크러시",
          "fr": "Brise-os",
          "de": "Knochenbrecher",
          "es": "Triturahuesos"
        },
        "base": 210,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          2
        ]
      },
      {
        "id": 228827,
        "names": {
          "en": "Spin Strike",
          "tw": "抽絲直擊",
          "kr": "설트 스트라이크",
          "fr": "Frappe-torpille",
          "de": "Schleuderstoß",
          "es": "Golpe centrífugo"
        },
        "base": 270,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          2
        ]
      },
      {
        "id": 228829,
        "names": {
          "en": "Hell Splash",
          "tw": "地獄飛濺",
          "kr": "헬 스플래시",
          "fr": "Fissure de l'enfer",
          "de": "Höllenspritzer",
          "es": "Salpicón infernal"
        },
        "base": 340,
        "hitDamage": [
          100
        ],
        "castTime": 50,
        "elements": [
          "earth"
        ],
        "offset": 14,
        "framesList": [
          60
        ]
      },
      {
        "id": 228830,
        "names": {
          "en": "Flame Lariat",
          "tw": "炎獄套索",
          "kr": "염옥의 래리어트",
          "fr": "Lariat enflammé",
          "de": "Flammenlasso",
          "es": "Reata en llamas"
        },
        "base": 340,
        "hitDamage": [
          100
        ],
        "elements": [
          "fire"
        ],
        "offset": 8,
        "framesList": [
          60
        ]
      },
      {
        "id": 228831,
        "names": {
          "en": "Death Roll",
          "tw": "死亡翻滾",
          "kr": "데스 롤",
          "fr": "Roulade de la mort",
          "de": "Todesrolle",
          "es": "La suerte está echada"
        },
        "base": 300,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          70
        ]
      }
    ]
  },
  {
    "id": 224,
    "names": {
      "en": "Emeralda",
      "tw": "艾美拉達",
      "kr": "에메랄다",
      "de": "Smaragda",
      "es": "Esmeralda"
    },
    "abilities": [
      {
        "id": 228771,
        "names": {
          "en": "Leg Cutter",
          "tw": "斷足",
          "kr": "레그 커터",
          "fr": "Tranche-jambe",
          "de": "Beinschneider",
          "es": "Rompepiernas"
        },
        "base": 170,
        "hitDamage": [
          50,
          50
        ],
        "offset": 8,
        "framesList": [
          2,
          20
        ]
      },
      {
        "id": 228772,
        "names": {
          "en": "Wave Cutter",
          "tw": "浪切",
          "kr": "웨이브 커터",
          "fr": "Tranche-vague",
          "de": "Wellenschneider",
          "es": "Rompeolas"
        },
        "base": 240,
        "hitDamage": [
          50,
          50
        ],
        "offset": 8,
        "framesList": [
          2,
          20
        ]
      },
      {
        "id": 228773,
        "names": {
          "en": "Anemo Dharm",
          "tw": "風之達姆",
          "kr": "리그 담",
          "fr": "Anémodharma",
          "de": "Anemo-Dharma",
          "es": "Anemodarma"
        },
        "damage": "magic",
        "base": 220,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          80
        ]
      },
      {
        "id": 228774,
        "names": {
          "en": "Terra Feist",
          "tw": "大地暴虐",
          "kr": "루드 피스트",
          "fr": "Terralutte",
          "de": "Terra-Faust",
          "es": "Combaterra"
        },
        "damage": "magic",
        "base": 220,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          200
        ]
      },
      {
        "id": 228776,
        "names": {
          "en": "Grand Arm",
          "tw": "恢宏之臂",
          "kr": "그랜드 암",
          "fr": "Bras tellurique",
          "de": "Großer Arm",
          "es": "Brazo grandioso"
        },
        "base": 320,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          40
        ]
      },
      {
        "id": 228777,
        "names": {
          "en": "Divider",
          "tw": "分割者",
          "kr": "디바이더",
          "fr": "Déphasement",
          "de": "Teiler",
          "es": "Divisorio"
        },
        "base": 260,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "offset": 8,
        "framesList": [
          2, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ]
      },
      {
        "id": 228778,
        "names": {
          "en": "Thermo Geist",
          "tw": "火之感性",
          "kr": "엘라 지스트",
          "fr": "Esprit thermique",
          "de": "Thermo-Geist",
          "es": "Termofasma"
        },
        "damage": "magic",
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          150
        ]
      },
      {
        "id": 228779,
        "names": {
          "en": "Aqua Dhaum",
          "tw": "水之多姆",
          "kr": "레이 돔",
          "fr": "Aquadôme",
          "de": "Wasser-Dharma",
          "es": "Acuípula"
        },
        "damage": "magic",
        "base": 180,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          133, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ]
      },
      {
        "id": 228784,
        "names": {
          "en": "Reycount",
          "tw": "射線計數",
          "kr": "레이 카운트",
          "fr": "Ultrarayon",
          "de": "Strahlenzahl",
          "es": "Rayúltiple"
        },
        "base": 400,
        "hitDamage": [
          25, 25, 25, 25
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          82, 20, 20, 20
        ]
      },
      {
        "id": 228785,
        "names": {
          "en": "Tornado Hand",
          "tw": "龍捲之手",
          "kr": "토네이도 핸드",
          "fr": "Main-tornade",
          "de": "Tornado-Hand",
          "es": "Mano huracanada"
        },
        "base": 380,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ],
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ]
      },
      {
        "id": 228786,
        "names": {
          "en": "Flying Arm",
          "tw": "飛臂",
          "kr": "플라잉 암",
          "fr": "Bras-boomerang",
          "de": "Fliegender Arm",
          "es": "Brazo volador"
        },
        "base": 200,
        "hitDamage": [
          50, 50
        ],
        "offset": 8,
        "framesList": [
          20, 22
        ]
      },
      {
        "id": 228783,
        "names": {
          "en": "Dark Beast",
          "tw": "黑暗野獸",
          "kr": "다크 비스트",
          "fr": "Bête obscure",
          "de": "Dunkle Bestie",
          "es": "Bestia oscura"
        },
        "base": 430,
        "hitDamage": [
          100
        ],
        "elements": [
          "dark"
        ],
        "offset": 8,
        "framesList": [
          80
        ]
      },
      {
        "id": 331000306,
        "names": {
          "en": "Rapid Nanogrowth",
          "tw": "納米急速增長",
          "kr": "나노 초고속 성장",
          "fr": "Nanocroissance accélérée",
          "de": "Schnelles Nanowachstum",
          "es": "Nanocrecimiento veloz"
        },
        "base": 1150,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 30
        ],
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          65, 25, 29, 30, 3, 4, 21, 25, 26, 53, 59, 3, 4, 5, 348
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          228771,
          228772,
          228773,
          228774,
          228776,
          228777,
          228778,
          228779,
          228783,
          228784,
          228785,
          228786
        ]
      }
    ]
  },
  {
    "id": 225,
    "names": {
      "en": "Bart",
      "tw": "巴特",
      "kr": "발트"
    },
    "abilities": [
      {
        "id": 228793,
        "names": {
          "en": "Head Hunter",
          "tw": "首級獵人",
          "kr": "넥 헌터",
          "fr": "Chasseur de tête",
          "de": "Kopfgeldjäger",
          "es": "Cazamolleras"
        },
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 19,
        "offset": 14,
        "framesList": [
          21
        ]
      },
      {
        "id": 228794,
        "names": {
          "en": "Rhythm Shock",
          "tw": "節奏震擊",
          "kr": "리듬 쇼크",
          "fr": "Choc rythmique",
          "de": "Rhythmisches Beben",
          "es": "Sacudida rítmica"
        },
        "base": 220,
        "hitDamage": [
          50, 50
        ],
        "offset": 8,
        "framesList": [
          2, 40
        ]
      },
      {
        "id": 228795,
        "names": {
          "en": "Bracer",
          "tw": "頸縛",
          "kr": "넥 소서",
          "fr": "Fortifiant",
          "de": "Verstärken",
          "es": "Fortín"
        },
        "base": 300,
        "hitDamage": [
          25, 25, 25, 25
        ],
        "offset": 8,
        "ignore": 50,
        "framesList": [
          2, 20, 20, 20
        ]
      },
      {
        "id": 228799,
        "names": {
          "en": "Prominence",
          "tw": "卓越",
          "kr": "홍염",
          "fr": "Renommée",
          "de": "Prominenz",
          "es": "Prominencia"
        },
        "base": 560,
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "framesList": [
          82, 8, 8, 8, 8, 8, 8, 8
        ]
      },
      {
        "id": 228800,
        "names": {
          "en": "Land Break",
          "tw": "陸地破裂",
          "kr": "랜드 브레이크",
          "fr": "Brise-terre",
          "de": "Anlandung",
          "es": "Rompetierra"
        },
        "base": 300,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "earth",
            "value": 50
          }
        ],
        "framesList": [
          100
        ]
      },
      {
        "id": 228801,
        "names": {
          "en": "Angel",
          "tw": "天使",
          "kr": "엔젤",
          "fr": "Ange vengeur",
          "de": "Engel",
          "es": "Ángel"
        },
        "base": 300,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ],
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ]
      },
      {
        "id": 228802,
        "names": {
          "en": "Tornado (Xenogears)",
          "tw": "龍捲颶風 (Xenogears)",
          "kr": "토네이도 (Xenogears)",
          "fr": "Tourbillon (Xenogears)",
          "es": "Tifón (Xenogears)"
        },
        "base": 460,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "offset": 14,
        "framesList": [
          133, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ]
      },
      {
        "id": 508732,
        "names": {
          "en": "Justice (Xenogears)",
          "tw": "帝王制裁",
          "kr": "제왕의 심판(Xenogears)",
          "de": "Gerechtigkeit (Xenogears)",
          "es": "Ecuanimidad (Xenogears)"
        },
        "base": 1200,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 331000407,
        "names": {
          "en": "Yggdrasil IV",
          "tw": "世界樹IV",
          "kr": "초거대 기어 위그드라실 IV"
        },
        "base": 1660,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          420
        ]
      }
    ]
  },
  {
    "id": 226,
    "names": {
      "en": "Fei",
      "tw": "飛",
      "kr": "페이"
    },
    "abilities": [
      {
        "id": 228713,
        "names": {
          "en": "Raijin",
          "tw": "武技雷迅",
          "kr": "무예 뇌신"
        },
        "base": 280,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          40
        ]
      },
      {
        "id": 228714,
        "names": {
          "en": "Hoten",
          "tw": "武技崩天",
          "kr": "무예 붕천"
        },
        "base": 300,
        "hitDamage": [11, 11, 11, 11, 11, 11, 11, 11, 12],
        "offset": 246,
        "framesList": [
          26, 42, 74, 98, 114, 146, 170, 186, 218
        ]
      },
      {
        "id": 228715,
        "names": {
          "en": "Senretsu",
          "tw": "武技千烈",
          "kr": "무예 천열"
        },
        "base": 180,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "offset": 8,
        "framesList": [
          2, 10, 10, 10, 20
        ]
      },
      {
        "id": 228716,
        "names": {
          "en": "Guided Shot",
          "tw": "彈指",
          "kr": "지탄",
          "fr": "Tir guidé",
          "de": "Gezielter Schuss",
          "es": "Tiro enfilado"
        },
        "base": 150,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 20,
        "framesList": [
          70
        ]
      },
      {
        "id": 228722,
        "names": {
          "en": "Hagan",
          "tw": "武技破岩",
          "kr": "무예 파암"
        },
        "base": 400,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "offset": 8,
        "framesList": [
          2, 10, 10, 10, 10
        ]
      },
      {
        "id": 228723,
        "names": {
          "en": "Ryujin",
          "tw": "武技龍迅",
          "kr": "무예 용신"
        },
        "base": 400,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "offset": 8,
        "framesList": [
          2, 10, 10, 10, 10
        ]
      },
      {
        "id": 228724,
        "names": {
          "en": "Koho",
          "tw": "武技虎咆",
          "kr": "무예 호포"
        },
        "base": 450,
        "hitDamage": [
          50, 50
        ],
        "offset": 8,
        "framesList": [
          2, 60
        ]
      },
      {
        "id": 228725,
        "names": {
          "en": "Radiance",
          "tw": "千光",
          "kr": "천광",
          "de": "Glanz",
          "es": "Resplandor"
        },
        "damage": "magic",
        "base": 800,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          150
        ]
      },
      {
        "id": 508704,
        "names": {
          "en": "Big Bang",
          "tw": "銀牙",
          "kr": "은아",
          "de": "Urknall"
        },
        "damage": "magic",
        "base": 1000,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          200
        ]
      },
      {
        "id": 228731,
        "names": {
          "en": "Kakei",
          "tw": "超武技火勁",
          "kr": "초무예 화경"
        },
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 50
          }
        ],
        "framesList": [
          100
        ]
      },
      {
        "id": 228732,
        "names": {
          "en": "Chikei",
          "tw": "超武技地勁",
          "kr": "초무예 지경"
        },
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "earth",
            "value": 50
          }
        ],
        "framesList": [
          75
        ]
      },
      {
        "id": 228733,
        "names": {
          "en": "Fukei",
          "tw": "超武技風勁",
          "kr": "초무예 풍경"
        },
        "base": 600,
        "hitDamage": [
          7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 9
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ],
        "framesList": [
          52, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9
        ]
      },
      {
        "id": 228734,
        "names": {
          "en": "Suikei",
          "tw": "超武技水勁",
          "kr": "초무예 수경"
        },
        "base": 600,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "water",
            "value": 50
          }
        ],
        "framesList": [
          40, 18, 18, 18, 86
        ]
      },
      {
        "id": 228735,
        "names": {
          "en": "Kokei",
          "tw": "超武技光勁",
          "kr": "초무예 광경"
        },
        "base": 600,
        "hitDamage": [
          25, 25, 25, 25
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "light",
            "value": 50
          }
        ],
        "framesList": [
          40, 15, 16, 49
        ]
      },
      {
        "id": 228736,
        "names": {
          "en": "Yamikei",
          "tw": "超武技暗勁",
          "kr": "초무예 암경"
        },
        "base": 800,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "dark",
            "value": 50
          }
        ],
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 331000107,
        "names": {
          "en": "Chi Combo",
          "tw": "超武技連擊",
          "kr": "초무예 콤보",
          "fr": "Déchaînement de qi",
          "de": "Chi-Kombo",
          "es": "Combo de chi"
        },
        "base": 2000,
        "hitDamage": [
          4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 12
        ],
        "dualable": false,
        "offset": 8,
        "debuffs": [
          {
            "type": "fire",
            "value": 80
          },
          {
            "type": "water",
            "value": 80
          },
          {
            "type": "wind",
            "value": 80
          },
          {
            "type": "earth",
            "value": 80
          },
          {
            "type": "light",
            "value": 80
          },
          {
            "type": "dark",
            "value": 80
          }
        ],
        "framesList": [
          69, 33, 18, 18, 18, 75, 58, 11, 14, 9, 8, 12, 3, 6, 9, 6, 47, 20, 22, 15, 16, 47, 266
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          228713,
          228714,
          228715,
          228716,
          228722,
          228723,
          228724,
          228725,
          508704,
          228731,
          228732,
          228733,
          228734,
          228735,
          228736
        ]
      }
    ]
  },
  {
    "id": 227,
    "names": {
      "en": "Elly",
      "tw": "艾蕾",
      "kr": "엘리"
    },
    "abilities": [
      {
        "id": 228743,
        "names": {
          "en": "Anemo Bolt",
          "tw": "風之弩箭",
          "kr": "리그 볼트",
          "fr": "Anémovolt",
          "de": "Anemo-Bolzen",
          "es": "Anemolámpago"
        },
        "damage": "magic",
        "base": 400,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          70
        ]
      },
      {
        "id": 228744,
        "names": {
          "en": "Terra Lance",
          "tw": "大地之槍",
          "kr": "루드 랜스",
          "fr": "Terralance",
          "de": "Terra-Lanze",
          "es": "Lanza Terra"
        },
        "damage": "magic",
        "base": 400,
        "hitDamage": [
          33, 33, 34
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          42, 10, 10
        ]
      },
      {
        "id": 228745,
        "names": {
          "en": "Thermo Cube",
          "tw": "火之立方",
          "kr": "엘라 큐브",
          "fr": "Cube thermique",
          "de": "Thermo-Kubus",
          "es": "Termocubo"
        },
        "damage": "magic",
        "base": 400,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          80
        ]
      },
      {
        "id": 228746,
        "names": {
          "en": "Aqua Ice",
          "tw": "水之冰擊",
          "kr": "레이 아이스",
          "fr": "Aquaglace",
          "de": "Wassereis",
          "es": "Acuirámbano"
        },
        "damage": "magic",
        "base": 400,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          145
        ]
      },
      {
        "id": 228751,
        "names": {
          "en": "Screamer",
          "tw": "狂嘯",
          "kr": "스크리머",
          "fr": "Hurleur",
          "de": "Kreischer",
          "es": "El grito"
        },
        "damage": "magic",
        "base": 100,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          40, 10, 10, 10, 10
        ]
      },
      {
        "id": 228752,
        "names": {
          "en": "Breakthrough",
          "tw": "突透",
          "kr": "브레이크 스루",
          "fr": "Percée",
          "de": "Durchbruch",
          "es": "Progreso"
        },
        "damage": "magic",
        "base": 100,
        "hitDamage": [
          16, 16, 16, 16, 16, 20
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          42, 8, 8, 8, 8, 8
        ]
      },
      {
        "id": 228753,
        "names": {
          "en": "Anemo Burn",
          "tw": "風之爆破",
          "kr": "리그 번",
          "fr": "Anémobrûlure",
          "de": "Anemo-Verbrennung",
          "es": "Anemodura"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          33, 33, 34
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "wind",
            "value": 60
          }
        ],
        "framesList": [
          55, 10, 10
        ]
      },
      {
        "id": 228754,
        "names": {
          "en": "Terra Storm",
          "tw": "大地衝蕩",
          "kr": "루드 스톰",
          "fr": "Terratempête",
          "de": "Terra-Sturm",
          "es": "Tormenterra"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "earth",
            "value": 60
          }
        ],
        "framesList": [
          88, 8, 8, 8, 8, 8, 8, 6, 8, 8, 6, 8, 8, 8, 9, 28
        ]
      },
      {
        "id": 228755,
        "names": {
          "en": "Thermo Dragon",
          "tw": "火之龍嘯",
          "kr": "엘라 드래곤",
          "fr": "Dragon thermique",
          "de": "Thermo-Drache",
          "es": "Termodragón"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          }
        ],
        "framesList": [
          120
        ]
      },
      {
        "id": 228756,
        "names": {
          "en": "Aqua Mist",
          "tw": "水之迷霧",
          "kr": "레이 미스트",
          "fr": "Aquabrume",
          "de": "Wassernebel",
          "es": "Acuibruma"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "water",
            "value": 60
          }
        ],
        "framesList": [
          70, 10, 10, 10, 65
        ]
      },
      {
        "id": 228760,
        "names": {
          "en": "Anemo Wave",
          "tw": "風之破浪",
          "kr": "리그 웨이브",
          "fr": "Anémovague",
          "de": "Anemo-Welle",
          "es": "Anemola"
        },
        "damage": "magic",
        "base": 1450,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 50,
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          52, 20, 20, 20, 20
        ]
      },
      {
        "id": 228761,
        "names": {
          "en": "Terra Ghost",
          "tw": "大地魂魄",
          "kr": "루드 고스트",
          "fr": "Terrafantôme",
          "de": "Terra-Geist",
          "es": "Terrafasma"
        },
        "damage": "magic",
        "base": 1450,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          100
        ]
      },
      {
        "id": 228762,
        "names": {
          "en": "Thermo Largo",
          "tw": "火之緩行",
          "kr": "엘라 라고",
          "fr": "Largo thermique",
          "de": "Themo-Largo",
          "es": "Largo ardiente"
        },
        "damage": "magic",
        "base": 1450,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          120
        ]
      },
      {
        "id": 228763,
        "names": {
          "en": "Aqua Lord",
          "tw": "水之主宰",
          "kr": "레이 로드",
          "fr": "Aquaseigneur",
          "de": "Wasserherr",
          "es": "Señor de las aguas"
        },
        "damage": "magic",
        "base": 1450,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          220
        ]
      },
      {
        "id": 508713,
        "names": {
          "en": "Eschatology",
          "tw": "末世論",
          "kr": "종말론",
          "fr": "Eschatologie",
          "de": "Eschatologie",
          "es": "Escatología"
        },
        "damage": "magic",
        "base": 1600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          120
        ]
      },
      {
        "id": 331000207,
        "names": {
          "en": "Vierge's AERODs",
          "tw": "處女座·艾阿多",
          "kr": "비에르주 에어드",
          "fr": "AERO de la Vierge",
          "de": "Vierges AERODs",
          "es": "DOE de Vierge"
        },
        "damage": "magic",
        "base": 2000,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          380
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 5,
        "abilities": [
          228743,
          228744,
          228745,
          228746,
          228751,
          228752,
          228753,
          228754,
          228755,
          228756,
          228760,
          228761,
          228762,
          228763,
          508713
        ]
      }
    ]
  },
  {
    "id": 228,
    "names": {
      "en": "Construct 8",
      "tw": "勞動八號",
      "kr": "노동 8호",
      "fr": "Travailleur no 8",
      "de": "Konstrukt 8",
      "es": "Autómata 8"
    },
    "abilities": [
      {
        "id": 229200,
        "names": {
          "en": "Destroy",
          "tw": "損毀",
          "kr": "파괴하기",
          "fr": "Détruire",
          "de": "Zerstören",
          "es": "Exterminación"
        },
        "base": 300,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          40
        ]
      },
      {
        "id": 229201,
        "names": {
          "en": "Compress",
          "tw": "壓縮",
          "kr": "압축하기",
          "fr": "Aplatir",
          "de": "Pressen",
          "es": "Estrujamiento"
        },
        "damage": "magic",
        "base": 230,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          32
        ]
      },
      {
        "id": 229202,
        "names": {
          "en": "Dispose",
          "tw": "處理",
          "kr": "처리하기",
          "fr": "Éliminer",
          "de": "Entsorgen",
          "es": "Exterminio"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 38,
        "offset": 14,
        "framesList": [
          68
        ]
      },
      {
        "id": 229203,
        "names": {
          "en": "Crush",
          "tw": "碾碎",
          "kr": "분쇄하기",
          "fr": "Broyer",
          "de": "Zerschmettern",
          "es": "Aplastamiento"
        },
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 35,
        "offset": 14,
        "framesList": [
          67
        ]
      },
      {
        "id": 253001405,
        "names": {
          "en": "Dispose of Him",
          "tw": "收拾掉他",
          "kr": "저 녀석을 해치워라 포",
          "fr": "Élimination",
          "de": "Entsorge ihn!",
          "es": "Eliminación"
        },
        "damage": "magic",
        "base": 790,
        "hitDamage": [
          10, 10, 10, 10, 10, 50
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          78, 10, 10, 10, 10, 10
        ]
      }
    ]
  },
  {
    "id": 229,
    "names": {
      "en": "Reis",
      "tw": "蕾潔",
      "kr": "레제"
    },
    "abilities": [
      {
        "id": 229,
        "names": {
          "en": "Ice Breath (FFT)",
          "tw": "寒冰吐息",
          "kr": "아이스 브레스",
          "fr": "Souffle glacial (FFT)",
          "de": "Eisatem (FFT)",
          "es": "Hálito frío (FFT)"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "castTime": 40,
        "elements": [
          "ice"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          52, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 229181,
        "names": {
          "en": "Fire Breath (FFT)",
          "tw": "烈火吐息",
          "kr": "파이어 브레스",
          "fr": "Souffle enflammé (FFT)",
          "de": "Feueratem (FFT)",
          "es": "Hálito de fuego (FFT)"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          52, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 229182,
        "names": {
          "en": "Thunder Breath",
          "tw": "雷電吐息",
          "kr": "선더 브레스",
          "fr": "Souffle électrique (FFT)",
          "de": "Donneratem",
          "es": "Hálito electrizante"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          52, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 253000706,
        "names": {
          "en": "Holy Breath",
          "tw": "聖潔吐息",
          "kr": "홀리 브레스",
          "fr": "Souffle sacré",
          "de": "Heiliger Atem",
          "es": "Hálito sagrado"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "elements": [
          "light"
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 74
          },
          {
            "type": "ice",
            "value": 74
          },
          {
            "type": "lightning",
            "value": 74
          }
        ],
        "framesList": [
          110
        ]
      }
    ]
  },
  {
    "id": 230,
    "names": {
      "en": "Beowulf",
      "tw": "貝奧武甫",
      "kr": "베오울프"
    },
    "abilities": [
      {
        "id": 229165,
        "names": {
          "en": "Hrunting",
          "tw": "赫倫汀",
          "kr": "흐룬팅"
        },
        "damage": "hybrid",
        "base": 1800,
        "hitDamage": [10,  10,  10,  10,  10,  10,  10,  30],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 229166,
        "names": {
          "en": "Nægling",
          "tw": "納格林",
          "kr": "네일링",
          "fr": "Næglind",
          "es": "Næglind"
        },
        "damage": "hybrid",
        "base": 1800,
        "hitDamage": [6,  6,  6,  6,  6,  6,  6,  58],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 508921,
        "names": {
          "en": "Saber",
          "tw": "劍擊",
          "kr": "세이버",
          "fr": "Sabre",
          "de": "Säbel",
          "es": "Sable"
        },
        "damage": "hybrid",
        "base": 5400,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ]
      },
      {
        "id": 253001007,
        "names": {
          "en": "Vengeance",
          "tw": "衝擊！",
          "kr": "쇼크!",
          "fr": "Représailles",
          "de": "Rache",
          "es": "Venganza"
        },
        "damage": "hybrid",
        "base": 3200,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          197
        ]
      }
    ]
  },
  {
    "id": 231,
    "names": {
      "en": "High Seraph Ultima",
      "tw": "聖天使阿爾蒂瑪",
      "kr": "성천사 알테마",
      "fr": "Ultima, le Grand Séraphin",
      "de": "Cherub Ultima",
      "es": "Ángel Artema"
    },
    "abilities": [
      {
        "id": 20440,
        "names": {
          "en": "Ultima",
          "tw": "究極",
          "kr": "알테마",
          "es": "Artema"
        },
        "damage": "magic",
        "base": 280,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "dualable": false,
        "offset": 14,
        "ignore": 25,
        "framesList": [
          365
        ]
      },
      {
        "id": 20290,
        "names": {
          "en": "Firaja",
          "tw": "強火焰",
          "kr": "파이자",
          "fr": "Feu max",
          "de": "Feuka",
          "es": "Piro+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          210
        ]
      },
      {
        "id": 20310,
        "names": {
          "en": "Thundaja",
          "tw": "強雷電",
          "kr": "선더쟈",
          "fr": "Foudre max",
          "de": "Blitzka",
          "es": "Electro+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          150
        ]
      },
      {
        "id": 20300,
        "names": {
          "en": "Blizzaja",
          "tw": "強暴雪",
          "kr": "블리자쟈",
          "fr": "Glace max",
          "de": "Eiska",
          "es": "Hielo+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "ice"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          240
        ]
      },
      {
        "id": 229121,
        "names": {
          "en": "Unholy Darkness",
          "tw": "暗黑神聖",
          "kr": "다크 홀리",
          "fr": "Ténèbres impies",
          "de": "Unheilige Dunkelheit",
          "es": "Oscuridad impía"
        },
        "damage": "magic",
        "base": 475,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          450
        ]
      },
      {
        "id": 229122,
        "names": {
          "en": "Nanoflare",
          "tw": "毫微核爆",
          "kr": "나노 플레어",
          "fr": "Nanobrasier",
          "es": "Nanollamarada"
        },
        "damage": "magic",
        "base": 150,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          240
        ]
      },
      {
        "id": 229123,
        "names": {
          "en": "Twister",
          "tw": "颶風",
          "kr": "허리케인",
          "fr": "Autan",
          "es": "Huracán"
        },
        "damage": "magic",
        "base": 300,
        "hitDamage": [
          8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 12
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "wind",
            "value": 75
          }
        ],
        "framesList": [
          80, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ]
      },
      {
        "id": 229124,
        "names": {
          "en": "Almagest",
          "tw": "至高無上",
          "kr": "알마게스트",
          "fr": "Almageste",
          "es": "Almagesto"
        },
        "damage": "magic",
        "base": 450,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 60
          },
          {
            "type": "ice",
            "value": 60
          },
          {
            "type": "lightning",
            "value": 60
          }
        ],
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 229125,
        "names": {
          "en": "Arcane Magicks - Ultima",
          "tw": "究極魔法·究極",
          "kr": "궁극 마법·알테마",
          "fr": "Arcane magique - Ultima",
          "de": "Arkanmagie - Ultima",
          "es": "Encantamiento arcano - Artema"
        },
        "damage": "magic",
        "base": 1850,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 50,
        "dualable": false,
        "offset": 14,
        "framesList": [
          52, 20, 20, 20, 20
        ]
      },
      {
        "id": 508906,
        "names": {
          "en": "Grand Cross",
          "tw": "大十字",
          "kr": "그랜드 크로스",
          "fr": "Croix suprême",
          "de": "Riesenkreuz",
          "es": "Cruz grandiosa"
        },
        "damage": "magic",
        "base": 1100,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          130
        ]
      },
      {
        "id": 253001307,
        "names": {
          "en": "Divine Ultima",
          "tw": "完全究極",
          "kr": "완전 알테마",
          "fr": "Hécatombe",
          "de": "Göttliche Ultima",
          "es": "Artema divina"
        },
        "damage": "magic",
        "base": 1350,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          560
        ]
      }
    ],
    "multipleBlack": 2,
    "multipleWhite": 2,
    "multipleGreen": 2,
    "multiCasts": [
      {
        "count": 4,
        "abilities": [
          229121,
          229122,
          229123,
          229124,
          229125,
          229127,
          229128,
          229129,
          229130,
          508906
        ]
      }
    ]
  },
  {
    "id": 232,
    "names": {
      "en": "Asura",
      "tw": "阿修羅",
      "kr": "아수라"
    },
    "abilities": [
      {
        "id": 11801,
        "names": {
          "en": "Infinite Cosmos (1)",
          "tw": "三千大千世界 (1)",
          "kr": "삼천대천세계 (1)",
          "fr": "Cosmos infini (1)",
          "de": "Unendlicher Kosmos (1)",
          "es": "Cosmos infinito (1)"
        },
        "elements": [],
        "dualable": false,
        "base": 28000,
        "offset": 8,
        "framesList": [
          40
        ]
      }
    ]
  },
  {
    "id": 233,
    "names": {
      "en": "Kyanos",
      "tw": "青駭鳥",
      "kr": "키아노스"
    },
    "abilities": [
      {
        "id": 229844,
        "names": {
          "en": "Raging Blade of Protection",
          "tw": "滅陣護劍",
          "kr": "멸진의 호검",
          "fr": "Lame enragée de protection",
          "de": "Rasende Klinge des Schutzes",
          "es": "Hoja iracunda de la protección"
        },
        "base": 280,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 20, 20
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 229842,
        "names": {
          "en": "Gale Blade",
          "tw": "劍風擊",
          "kr": "검풍격",
          "fr": "Glaive de rafale",
          "de": "Sturmklinge",
          "es": "Hoja huracanada"
        },
        "base": 280,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 229843,
        "names": {
          "en": "Raging Blade of Destruction",
          "tw": "滅陣攻劍",
          "kr": "멸진의 공검",
          "fr": "Lame enragée de destruction",
          "de": "Rasende Klinge der Zerstörung",
          "es": "Hoja iracunda de la destrucción"
        },
        "base": 280,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 20, 20
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 229841,
        "names": {
          "en": "Storm Dagger",
          "tw": "嵐壞劍",
          "kr": "남괴검",
          "fr": "Dague de tempête",
          "de": "Sturmdolch",
          "es": "Daga tempestuosa"
        },
        "base": 280,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "castTime": 40,
        "offset": 14,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ],
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 229845,
        "names": {
          "en": "Vengeful Blade of Domination",
          "tw": "討仇霸劍",
          "kr": "토구의 패검",
          "fr": "Lame vengeresse de domination",
          "de": "Rachsüchtige Klinge der Herrschaft",
          "es": "Hoja vengativa del sometimiento"
        },
        "base": 320,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 20, 20
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 509240,
        "names": {
          "en": "Vertex Rampage",
          "tw": "頂峰暴亂",
          "kr": "광란의 싸움",
          "fr": "Fureur déchaînée",
          "de": "Gipfelraserei",
          "es": "Estampida angular"
        },
        "base": 300,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10, 10, 10,
          38
        ]
      },
      {
        "id": 229840,
        "names": {
          "en": "Focal Rampage",
          "tw": "戰鬥・暴亂",
          "kr": "광란의 싸움",
          "fr": "Fureur ciblée",
          "de": "Gezielte Raserei",
          "es": "Estampida focal"
        },
        "base": 250,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          42, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 100020706,
        "names": {
          "en": "Escalating Onslaught",
          "tw": "升天猛襲斬",
          "kr": "승천맹습참",
          "fr": "Assaut effréné",
          "de": "Eskalierender Frontalangriff",
          "es": "Superacometida"
        },
        "base": 1000,
        "hitDamage": [
          10, 10, 10, 10, 30, 30
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          47, 18, 20, 45, 39, 35
        ]
      }
    ]
  },
  {
    "id": 234,
    "names": {
      "en": "Crimson",
      "tw": "深紅",
      "kr": "크림슨",
      "de": "Porphura"
    },
    "abilities": [
      {
        "id": 229825,
        "names": {
          "en": "Mist-Piercing Blade",
          "tw": "霧消之劍",
          "kr": "무소의 검",
          "fr": "Lame perce-brume",
          "de": "Nebelverwehende Klinge",
          "es": "Hoja perforabruma"
        },
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          42
        ]
      },
      {
        "id": 229824,
        "names": {
          "en": "Ice Riser",
          "tw": "冰起",
          "kr": "아이스 라이저",
          "fr": "Montée des glaces",
          "de": "Vereiser",
          "es": "Elevación glacial"
        },
        "base": 280,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 229827,
        "names": {
          "en": "Cleansing Blade",
          "tw": "清靜刃",
          "kr": "청정인",
          "fr": "Lame purificatrice",
          "de": "Reinigende Klinge",
          "es": "Hoja purificadora"
        },
        "base": 210,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 229822,
        "names": {
          "en": "Combustion Blade",
          "tw": "降炎之劍",
          "kr": "강염의 검",
          "fr": "Glaive incinérateur",
          "de": "Entzündende Klinge",
          "es": "Hoja calcinadora"
        },
        "base": 350,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 75
          }
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 229828,
        "names": {
          "en": "Great Slash Combo",
          "tw": "大連斬",
          "kr": "대연참",
          "fr": "Entailles jumelles",
          "de": "Große Hiebkombo",
          "es": "Supercombo rebanador"
        },
        "base": 320,
        "hitDamage": [50, 50],
        "offset": 32,
        "castTime": 24,
        "framesList": [14, 42]
      },
      {
        "id": 229823,
        "names": {
          "en": "Fire Riser",
          "tw": "火起",
          "kr": "파이어 라이저",
          "fr": "Montée des flammes",
          "de": "Brandstifter",
          "es": "Elevación flamígera"
        },
        "base": 280,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 229826,
        "names": {
          "en": "Exorcism Blade",
          "tw": "退魔刃",
          "kr": "퇴마인",
          "fr": "Épée d'exorcisme",
          "de": "Exorzismusklinge",
          "es": "Hoja exorcista"
        },
        "base": 210,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 229821,
        "names": {
          "en": "Slayer's Flame Blade",
          "tw": "斬魔火劍",
          "kr": "참마의 화검",
          "fr": "Incandessabre du pourfendeur",
          "de": "Flammenklinge des Schlächters",
          "es": "Hoja flamígera del verdugo"
        },
        "base": 650,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 229829,
        "names": {
          "en": "Noble Banishing Blade",
          "tw": "碎魔剛劍",
          "kr": "쇄마의 강검",
          "fr": "Noble lame du bannissement",
          "de": "Robuste Bannklinge",
          "es": "Hoja noble exorcista"
        },
        "base": 380,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 509231,
        "names": {
          "en": "Heatwave Formation Strike",
          "tw": "火炎陣突",
          "kr": "화염진돌",
          "fr": "Frappe caniculaire",
          "de": "Flächenbrandmanöver",
          "es": "Golpe Ola de calor"
        },
        "base": 850,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 100
          }
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 509232,
        "names": {
          "en": "Blizzard Formation Strike",
          "tw": "冰嵐陣突",
          "kr": "빙람진돌",
          "fr": "Frappe polaire",
          "de": "Schneesturmmanöver",
          "es": "Golpe Ola de frío"
        },
        "base": 850,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "debuffs": [
          {
            "type": "ice",
            "value": 100
          }
        ],
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 100020607,
        "names": {
          "en": "Blade of Expulsion",
          "tw": "復仇之劍",
          "kr": "떨쳐내는 검",
          "fr": "Lame d'expulsion",
          "de": "Verjagende Klinge",
          "es": "Hoja del destierro"
        },
        "base": 2600,
        "hitDamage": [
          4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          106, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          229821,
          229822,
          229823,
          229824,
          229825,
          229826,
          229827,
          229828,
          229829,
          509231,
          509232
        ]
      }
    ]
  },
  {
    "id": 235,
    "names": {
      "en": "Esther",
      "tw": "艾斯德爾",
      "kr": "에스더",
      "fr": "Pâquerette",
      "de": "Ostera"
    },
    "abilities": [
      {
        "id": 912164,
        "names": {
          "en": "Shock Flash",
          "tw": "震撼閃光",
          "kr": "충격파",
          "fr": "Foudre de guerre",
          "de": "Schockblitz",
          "es": "Rayo eléctrico"
        },
        "base": 300,
        "hitDamage": [
          14, 14, 14, 14, 14, 15, 15
        ],
        "castTime": 7,
        "offset": 14,
        "framesList": [
          25, 10, 11, 10, 10, 10, 10
        ]
      },
      {
        "id": 912169,
        "names": {
          "en": "Shock Reflex",
          "tw": "震撼反射",
          "kr": "충격 반사",
          "fr": "Réflexes éclair",
          "de": "Schockreflex",
          "es": "Reflejo electrizante"
        },
        "base": 240,
        "hitDamage": [
          4, 4, 4, 4, 4.333333333333334, 6.333333333333334, 6.666666666666668, 8, 8, 8, 8, 8.666666666666668, 12.666666666666668, 13.333333333333336
        ],
        "castTime": 54,
        "elements": [
          "lightning"
        ],
        "offset": 14,
        "ignore": 50,
        "framesList": [
          35, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ]
      },
      {
        "id": 912173,
        "names": {
          "en": "Storm Brand",
          "tw": "風暴烙印",
          "kr": "폭풍 검",
          "fr": "Signe des tempêtes",
          "de": "Sturmzeichen",
          "es": "Marca de tormenta"
        },
        "base": 280,
        "hitDamage": [
          7, 7, 7, 7, 7, 7, 7, 7, 44
        ],
        "castTime": 38,
        "elements": [
          "lightning"
        ],
        "offset": 14,
        "ignore": 50,
        "framesList": [
          42, 6, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 912192,
        "names": {
          "en": "Static Barrage",
          "tw": "靜電彈幕",
          "kr": "정적인 연발 사격",
          "fr": "Barrage statique",
          "de": "Statisches Sperrfeuer",
          "es": "Ráfaga estática"
        },
        "base": 450,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 912176,
        "names": {
          "en": "Storm Calling",
          "tw": "風暴呼喊",
          "kr": "폭풍 호출",
          "fr": "Appel des tempêtes",
          "de": "Sturmrufen",
          "es": "Llamada a la tormenta"
        },
        "base": 430,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 912180,
        "names": {
          "en": "Demagnetizing Strike",
          "tw": "消磁衝擊",
          "kr": "자기소거 타격",
          "fr": "Frappe démagnétisante",
          "de": "Entmagnetisierender Schlag",
          "es": "Golpe desimantador"
        },
        "base": 350,
        "hitDamage": [
          7, 7, 7, 7, 7, 7, 7, 7, 44
        ],
        "castTime": 38,
        "offset": 14,
        "ignore": 50,
        "debuffs": [
          {
            "type": "lightning",
            "value": 75
          }
        ],
        "framesList": [
          42, 6, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 912189,
        "names": {
          "en": "Storm Clouds",
          "tw": "風暴將至",
          "kr": "먹구름",
          "fr": "Nuages des tempêtes",
          "de": "Sturmwolken",
          "es": "Nubes de tormenta"
        },
        "base": 1100,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 912190,
        "names": {
          "en": "Bolting Strike",
          "tw": "雷電衝擊",
          "kr": "번개같은 타격",
          "fr": "Fulguro-frappe",
          "de": "Flächenblitz",
          "es": "Golpe relámpago"
        },
        "base": 400,
        "hitDamage": [
          7, 7, 7, 7, 7, 7, 7, 7, 44
        ],
        "castTime": 38,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          42, 6, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 401006807,
        "names": {
          "en": "Raikiri",
          "tw": "雷切",
          "kr": "라이키리"
        },
        "base": 1390,
        "hitDamage": [
          2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 9, 9, 10
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ]
      },
      {
        "id": 950000007,
        "names": {
          "en": "Absolute Raikiri + 1",
          "tw": "神·雷切 + 1",
          "kr": "궁극의 라이키리 + 1",
          "fr": "Raikiri absolu + 1",
          "de": "Ultimativer Raikiri + 1",
          "es": "Raikiri fulminante + 1"
        },
        "base": 1590,
        "hitDamage": [
          2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 9, 9, 10
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          912169,
          912173,
          912176,
          912180,
          912190,
          912189
        ]
      }
    ]
  },
  {
    "id": 236,
    "names": {
      "en": "Sylvie",
      "tw": "西路比",
      "kr": "실비"
    },
    "abilities": [
      {
        "id": 912309,
        "names": {
          "en": "Bunny Kick",
          "tw": "兔子踢",
          "kr": "토끼 발차기",
          "fr": "Frappe du lapin",
          "de": "Häschentritt",
          "es": "Patada de conejo"
        },
        "base": 370,
        "hitDamage": [
          7, 7, 7, 7, 7, 7, 7, 7, 44
        ],
        "castTime": 38,
        "offset": 14,
        "ignore": 25,
        "framesList": [
          42, 6, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 912310,
        "names": {
          "en": "Mystical Egg",
          "tw": "神秘彩蛋",
          "kr": "신비의 달걀",
          "fr": "Œuf mystique",
          "de": "Mystisches Ei",
          "es": "Huevo místico"
        },
        "damage": "magic",
        "base": 420,
        "hitDamage": [
          7, 7, 7, 7, 7, 7, 7, 7, 44
        ],
        "castTime": 38,
        "dualable": false,
        "offset": 14,
        "ignore": 25,
        "framesList": [
          42, 6, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 912311,
        "names": {
          "en": "Cotton Tail",
          "tw": "棉絨尾巴",
          "kr": "솜털 꼬리",
          "fr": "Queue de coton",
          "de": "Plüschschwanz",
          "es": "Cola algodonada"
        },
        "base": 450,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 912312,
        "names": {
          "en": "Enchanted Egg",
          "tw": "附魔彩蛋",
          "kr": "요술 달걀",
          "fr": "Œuf enchanté",
          "de": "Verzaubertes Ei",
          "es": "Huevo encantado"
        },
        "damage": "magic",
        "base": 500,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          912309,
          912310,
          912311,
          912312
        ]
      }
    ]
  },
  {
    "id": 237,
    "names": {
      "en": "Billy",
      "tw": "比利",
      "kr": "빌리"
    },
    "abilities": [
      {
        "id": 229101,
        "names": {
          "en": "Adams Apple",
          "tw": "亞當的蘋果",
          "kr": "금단의 과실",
          "fr": "Pomme d'Adam",
          "de": "Adamsapfel",
          "es": "Manzana de Adán"
        },
        "base": 180,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          2
        ]
      },
      {
        "id": 229102,
        "names": {
          "en": "Gunholic",
          "tw": "槍械迷",
          "kr": "건 홀릭",
          "fr": "Tireur de génie",
          "de": "Knarrenkuschler",
          "es": "Adicto a las pistolas"
        },
        "base": 220,
        "hitDamage": [
          15, 15, 15.454545454545455, 54.54545454545455
        ],
        "offset": 8,
        "framesList": [
          2, 10, 10, 50
        ]
      },
      {
        "id": 229103,
        "names": {
          "en": "Hell Blast",
          "tw": "天堂保佑",
          "kr": "지옥의 폭풍",
          "fr": "Balle des limbes",
          "de": "Höllische Explosion",
          "es": "Explosión infernal"
        },
        "base": 240,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          10
        ]
      },
      {
        "id": 229108,
        "names": {
          "en": "Nut Crack",
          "tw": "胡桃夾",
          "kr": "넛 크랙",
          "fr": "Tir broyeur",
          "de": "Nussknacker",
          "es": "Cascanueces"
        },
        "base": 270,
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42, 8, 8, 8, 8, 8, 8, 8
        ]
      },
      {
        "id": 508890,
        "names": {
          "en": "Pious Prayer",
          "tw": "虔誠的祈禱",
          "kr": "경건한 기도",
          "fr": "Prière dévote",
          "de": "Andächtiges Gebet",
          "es": "Oración misericordiosa"
        },
        "base": 250,
        "hitDamage": [
          16, 16, 17, 17, 17, 17
        ],
        "castTime": 43,
        "offset": 14,
        "framesList": [
          45, 15, 15, 15, 15, 37
        ]
      },
      {
        "id": 229109,
        "names": {
          "en": "Sky Walker",
          "tw": "天行者",
          "kr": "스카이 워커",
          "fr": "Tir céleste",
          "de": "Himmelsläufer",
          "es": "Peregrino celeste"
        },
        "base": 300,
        "hitDamage": [
          16, 16, 16, 16, 16, 20
        ],
        "offset": 8,
        "framesList": [
          2, 10, 10, 10, 10, 18
        ]
      },
      {
        "id": 229114,
        "names": {
          "en": "Banfrau",
          "tw": "跳躍連擊",
          "kr": "반프라우",
          "de": "Bannfrau"
        },
        "base": 380,
        "hitDamage": [
          25, 25, 25, 25
        ],
        "offset": 8,
        "framesList": [
          2, 10, 30, 20
        ]
      },
      {
        "id": 229115,
        "names": {
          "en": "Holy Gate",
          "tw": "天堂之門",
          "kr": "천국의 문",
          "fr": "Porte sacrée",
          "de": "Heiliges Tor",
          "es": "Puerta sagrada"
        },
        "base": 350,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 40,
        "offset": 14,
        "debuffs": [
          {
            "type": "earth",
            "value": 60
          }
        ],
        "framesList": [
          122, 10, 10, 10, 10
        ]
      },
      {
        "id": 229116,
        "names": {
          "en": "True Dream",
          "tw": "真實夢境",
          "kr": "진정한 꿈",
          "fr": "Rêve sincère",
          "de": "Wahrer Traum",
          "es": "Sueño verdadero"
        },
        "base": 420,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          30
        ]
      },
      {
        "id": 331000906,
        "names": {
          "en": "Dear Friend",
          "tw": "親愛的朋友",
          "kr": "디어 프렌드",
          "fr": "Fidèle camarade",
          "de": "Mein lieber Freund",
          "es": "Amigo del alma"
        },
        "base": 1000,
        "hitDamage": [
          15, 15, 15, 15, 15, 25
        ],
        "dualable": false,
        "offset": 8,
        "debuffs": [
          {
            "type": "fire",
            "value": 80
          },
          {
            "type": "water",
            "value": 80
          },
          {
            "type": "wind",
            "value": 80
          },
          {
            "type": "earth",
            "value": 80
          }
        ],
        "framesList": [
          120, 10, 10, 10, 10, 40
        ]
      }
    ]
  },
  {
    "id": 238,
    "names": {
      "en": "Citan",
      "tw": "紫檀",
      "kr": "시탄",
      "es": "Citán"
    },
    "abilities": [
      {
        "id": 229043,
        "names": {
          "en": "Ukigumo",
          "tw": "浮雲",
          "kr": "부운"
        },
        "base": 280,
        "hitDamage": [
          33, 33, 34
        ],
        "castTime": 16,
        "offset": 14,
        "framesList": [
          18, 23, 35
        ]
      },
      {
        "id": 229044,
        "names": {
          "en": "Shinrai",
          "tw": "震雷",
          "kr": "진뢰"
        },
        "base": 230,
        "hitDamage": [
          16, 16, 16, 16, 16, 20
        ],
        "offset": 8,
        "framesList": [
          2, 12, 12, 12, 12, 22
        ]
      },
      {
        "id": 229045,
        "names": {
          "en": "Hakai",
          "tw": "波壞",
          "kr": "파괴"
        },
        "base": 180,
        "hitDamage": [
          33, 33, 34
        ],
        "castTime": 16,
        "offset": 14,
        "framesList": [
          18, 23, 35
        ]
      },
      {
        "id": 229046,
        "names": {
          "en": "Renken",
          "tw": "連劍",
          "kr": "연검"
        },
        "base": 400,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "offset": 8,
        "framesList": [
          2, 8, 8, 8, 8, 8, 8
        ]
      },
      {
        "id": 229051,
        "names": {
          "en": "Willow Wind",
          "tw": "風精ｰ柳ｰ",
          "kr": "풍정 -버들-",
          "fr": "Vent du saule",
          "de": "Weidenwind",
          "es": "Viento salguero"
        },
        "base": 450,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "wind",
            "value": 50
          }
        ],
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 229052,
        "names": {
          "en": "Rare Earth",
          "tw": "地精ｰ崩ｰ",
          "kr": "지정 -붕괴-",
          "fr": "Terre raréfiée",
          "de": "Erdbruch",
          "es": "Tierra misteriosa"
        },
        "base": 450,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "earth",
            "value": 50
          }
        ],
        "framesList": [
          120
        ]
      },
      {
        "id": 229053,
        "names": {
          "en": "Hell Fire",
          "tw": "火精ｰ獄ｰ",
          "kr": "화정 -지옥-",
          "fr": "Feu des limbes",
          "de": "Höllenfeuer",
          "es": "Fuego infernal"
        },
        "base": 450,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 50
          }
        ],
        "framesList": [
          70
        ]
      },
      {
        "id": 229054,
        "names": {
          "en": "Tsunami Ice",
          "tw": "水精ｰ裂ｰ",
          "kr": "수정 -파열-",
          "fr": "Raz-de-glacée",
          "de": "Eistsunami",
          "es": "Tsunami glaciar"
        },
        "base": 400,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "water",
            "value": 50
          }
        ],
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 229055,
        "names": {
          "en": "Ougi",
          "tw": "奧義",
          "kr": "오의"
        },
        "base": 500,
        "hitDamage": [
          25, 25, 25, 25
        ],
        "offset": 8,
        "framesList": [
          2, 20, 20, 20
        ]
      },
      {
        "id": 508873,
        "names": {
          "en": "Zanretsu",
          "tw": "烈斬",
          "kr": "참열"
        },
        "base": 2000,
        "hitDamage": [
          50, 50
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          82, 30
        ]
      },
      {
        "id": 229062,
        "names": {
          "en": "Amaoto",
          "tw": "雨音",
          "kr": "빗소리"
        },
        "base": 900,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          65
        ]
      },
      {
        "id": 229063,
        "names": {
          "en": "Festive Wind",
          "tw": "風精刀氣ｰ宴ｰ",
          "kr": "풍정 도검기 -연회-",
          "fr": "Vent festif",
          "de": "Festlicher Wind",
          "es": "Viento festivo"
        },
        "base": 875,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 229064,
        "names": {
          "en": "Rumble Earth",
          "tw": "地精刀氣ｰ轟ｰ",
          "kr": "지정 도검기 -굉음-",
          "fr": "Terre tremblante",
          "de": "Erdgrollen",
          "es": "Sacudida terrenal"
        },
        "base": 850,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "offset": 14,
        "framesList": [
          100
        ]
      },
      {
        "id": 229065,
        "names": {
          "en": "Haze of Fire",
          "tw": "火精刀氣ｰ朧ｰ",
          "kr": "화정 도검기 -몽롱-",
          "fr": "Brume de flammes",
          "de": "Feuerschimmer",
          "es": "Bruma abrasadora"
        },
        "base": 800,
        "hitDamage": [
          33, 33, 34
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "framesList": [
          62, 20, 20
        ]
      },
      {
        "id": 229066,
        "names": {
          "en": "Crystal Water",
          "tw": "水精刀氣ｰ鏡ｰ",
          "kr": "수정 도검기 -거울-",
          "fr": "Eau cristalline",
          "de": "Kristallwasser",
          "es": "Agua cristalina"
        },
        "base": 875,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 331000707,
        "names": {
          "en": "Arcane Combo",
          "tw": "刀氣連擊",
          "kr": "도검기 콤보",
          "fr": "Combo des arcanes",
          "de": "Arkane Kombo",
          "es": "Combo arcano"
        },
        "base": 2600,
        "hitDamage": [
          7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          78, 43, 47, 91, 54, 27, 21, 21, 21, 21, 26, 104, 194
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          229043,
          229044,
          229045,
          229046,
          229051,
          229052,
          229053,
          229054,
          229055,
          229062,
          229063,
          229064,
          229065,
          229066,
          508873
        ]
      }
    ]
  },
  {
    "id": 239,
    "names": {
      "en": "Maria (Xenogears)",
      "tw": "瑪利亞(Xenogears)",
      "kr": "마리아(Xenogears)",
      "es": "María (Xenogears)"
    },
    "abilities": [
      {
        "id": 229073,
        "names": {
          "en": "Robo Beam",
          "tw": "機械射線",
          "kr": "로봇 광선",
          "fr": "Roborayon",
          "de": "Robo-Strahl",
          "es": "Rayo robótico"
        },
        "damage": "magic",
        "base": 420,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          120
        ]
      },
      {
        "id": 229074,
        "names": {
          "en": "Robo Missile",
          "tw": "機器人飛彈",
          "kr": "로봇 미사일",
          "fr": "Robomissile",
          "de": "Robo-Rakete",
          "es": "Misil robótico"
        },
        "damage": "magic",
        "base": 350,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          82, 10, 10, 10, 10
        ]
      },
      {
        "id": 229075,
        "names": {
          "en": "Robo Punch",
          "tw": "機械重拳",
          "kr": "로봇 펀치",
          "fr": "Robopoing",
          "de": "Robo-Schlag",
          "es": "Puñetazo robótico"
        },
        "damage": "magic",
        "base": 200,
        "hitDamage": [
          100
        ],
        "castTime": 63,
        "dualable": false,
        "offset": 14,
        "framesList": [
          65
        ]
      },
      {
        "id": 229076,
        "names": {
          "en": "Robo Kick",
          "tw": "機械重踢",
          "kr": "로봇 킥",
          "fr": "Robohorion",
          "de": "Robo-Tritt",
          "es": "Patada robótica"
        },
        "damage": "magic",
        "base": 200,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          50
        ]
      },
      {
        "id": 229080,
        "names": {
          "en": "Gravity Fist",
          "tw": "重力拳",
          "kr": "중력장 펀치",
          "fr": "Poing de gravité",
          "de": "Graviton-Schlag",
          "es": "Puño gravitatorio"
        },
        "damage": "magic",
        "base": 2600,
        "hitDamage": [
          100
        ],
        "castTime": 63,
        "dualable": false,
        "offset": 14,
        "framesList": [
          65
        ]
      },
      {
        "id": 229081,
        "names": {
          "en": "Head Dive",
          "tw": "頭部衝擊",
          "kr": "다이빙 헤딩",
          "fr": "Tête plongeante",
          "de": "Kopfwärts voran",
          "es": "Chapuzón"
        },
        "base": 310,
        "hitDamage": [
          3.225806451612903
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          10
        ]
      },
      {
        "id": 229082,
        "names": {
          "en": "Gravity Press",
          "tw": "重力壓迫",
          "kr": "중력장 프레스",
          "fr": "Presse de gravité",
          "de": "Graviton-Presse",
          "es": "Prensa gravitatoria"
        },
        "damage": "magic",
        "base": 450,
        "hitDamage": [
          50, 50
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          2, 8
        ]
      },
      {
        "id": 229083,
        "names": {
          "en": "Missile Pod",
          "tw": "導彈輔助機",
          "kr": "미사일 포드",
          "fr": "Capsule de missiles",
          "de": "Raketenpod",
          "es": "Portamisiles"
        },
        "damage": "magic",
        "base": 150,
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          82, 8, 8, 8, 8, 8, 8, 8
        ]
      },
      {
        "id": 229084,
        "names": {
          "en": "Short-Range Graviton",
          "tw": "短距離重力炮",
          "kr": "단거리 중력장포",
          "fr": "Graviton de courte portée",
          "de": "Kurzstrecken-Graviton",
          "es": "Gravitón de corto alcance"
        },
        "damage": "magic",
        "base": 800,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          80, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 229090,
        "names": {
          "en": "Iron Break",
          "tw": "鋼鐵破壞",
          "kr": "아이언 브레이크",
          "fr": "Brisure de fer",
          "de": "Eisenbrecher",
          "es": "Fractura férrea"
        },
        "damage": "magic",
        "base": 550,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          40
        ]
      },
      {
        "id": 229091,
        "names": {
          "en": "Iron Storm",
          "tw": "鋼鐵風暴",
          "kr": "아이언 스톰",
          "fr": "Tempête de fer",
          "de": "Eisensturm",
          "es": "Tormenta férrea"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          15, 15, 15, 15, 20, 20
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          2, 10, 10, 10, 20, 10
        ]
      },
      {
        "id": 229092,
        "names": {
          "en": "Fire Drive",
          "tw": "火焰驅動",
          "kr": "아이언 드라이브",
          "fr": "Choc de flammes",
          "de": "Feuerantrieb",
          "es": "Ofensiva ardiente"
        },
        "damage": "magic",
        "base": 750,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 229093,
        "names": {
          "en": "Magneto",
          "tw": "電磁吐息",
          "kr": "마그네토 브레스",
          "fr": "Magnétisme"
        },
        "damage": "magic",
        "base": 550,
        "hitDamage": [
          12, 12, 12, 12, 13, 13, 13, 13
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 80
          }
        ],
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 508882,
        "names": {
          "en": "Maria Beat",
          "tw": "瑪利亞打擊",
          "kr": "마리아 비트",
          "fr": "Talent de Maria",
          "de": "Marias Rhythmus",
          "es": "Al ritmo de María"
        },
        "damage": "magic",
        "base": 1700,
        "hitDamage": [
          7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 9
        ],
        "castTime": 40,
        "dualable": false,
        "offset": 14,
        "framesList": [
          42, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 14
        ]
      },
      {
        "id": 331000807,
        "names": {
          "en": "Graviton Gun",
          "tw": "重力砲",
          "kr": "중력장포",
          "fr": "Pistolet à graviton",
          "de": "Graviton-Pistole",
          "es": "Pistola-gravitón"
        },
        "damage": "magic",
        "base": 3800,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          750
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          229073,
          229074,
          229075,
          229076,
          229080,
          229081,
          229082,
          229083,
          229084,
          229090,
          229091,
          229092,
          229093,
          508882
        ]
      }
    ]
  },
  {
    "id": 240,
    "names": {
      "en": "Black Mage Golbez",
      "tw": "漆黑魔道士高貝扎",
      "kr": "칠흑의 마도사 골베자",
      "fr": "Golbez mage noir",
      "de": "Schwarzmagier Golbez",
      "es": "Mago negro Golbez"
    },
    "abilities": [
      {
        "id": 20260,
        "names": {
          "en": "Bioga",
          "tw": "劇毒化",
          "kr": "바이오가",
          "fr": "Toxine X",
          "es": "Bio++"
        },
        "damage": "magic",
        "base": 140,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "dark"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          210
        ]
      },
      {
        "id": 229442,
        "names": {
          "en": "Binding Cold",
          "tw": "咒縛大冷氣",
          "kr": "주박의 냉기",
          "fr": "Chaînes glaciales",
          "de": "Eisfessel",
          "es": "Frío paralizador"
        },
        "damage": "magic",
        "base": 900,
        "hitDamage": [
          100
        ],
        "castTime": 79,
        "elements": [
          "ice"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          230
        ]
      },
      {
        "id": 229444,
        "names": {
          "en": "Abyssal Scythe",
          "tw": "深淵鐮刀",
          "kr": "심연의 낫",
          "fr": "Faux abyssale",
          "de": "Abgrundsense",
          "es": "Guadaña abismal"
        },
        "damage": "magic",
        "base": 450,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "dark",
            "value": 60
          }
        ],
        "framesList": [
          42
        ]
      },
      {
        "id": 20290,
        "names": {
          "en": "Firaja",
          "tw": "強火焰",
          "kr": "파이자",
          "fr": "Feu max",
          "de": "Feuka",
          "es": "Piro+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          210
        ]
      },
      {
        "id": 20300,
        "names": {
          "en": "Blizzaja",
          "tw": "強暴雪",
          "kr": "블리자쟈",
          "fr": "Glace max",
          "de": "Eiska",
          "es": "Hielo+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "ice"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          240
        ]
      },
      {
        "id": 20310,
        "names": {
          "en": "Thundaja",
          "tw": "強雷電",
          "kr": "선더쟈",
          "fr": "Foudre max",
          "de": "Blitzka",
          "es": "Electro+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "lightning"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          150
        ]
      },
      {
        "id": 20350,
        "names": {
          "en": "Flare",
          "tw": "核爆",
          "kr": "플레어",
          "fr": "Brasier",
          "de": "Flamme",
          "es": "Fulgor"
        },
        "damage": "magic",
        "base": 230,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "water",
            "value": 30
          }
        ],
        "framesList": [
          240
        ]
      },
      {
        "id": 20430,
        "names": {
          "en": "Meteor",
          "tw": "隕石",
          "kr": "메테오",
          "fr": "Météore",
          "de": "Meteo",
          "es": "Meteo"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "dualable": false,
        "offset": 14,
        "ignore": 25,
        "framesList": [
          350
        ]
      },
      {
        "id": 509021,
        "names": {
          "en": "Black Fang",
          "tw": "黑牙",
          "kr": "검은 송곳니",
          "fr": "Crocs sombres",
          "de": "Schwarze Fänge",
          "es": "Colmillo negro"
        },
        "damage": "magic",
        "base": 1000,
        "hitDamage": [
          100
        ],
        "castTime": 79,
        "elements": [
          "dark"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "dark",
            "value": 75
          }
        ],
        "framesList": [
          202
        ]
      },
      {
        "id": 509022,
        "names": {
          "en": "Jet-Black Fang",
          "tw": "漆黑之牙",
          "kr": "칠흑의 송곳니",
          "fr": "Crocs de jais",
          "de": "Rabenschwarze Fänge",
          "es": "Colmillo azabache"
        },
        "damage": "magic",
        "base": 1600,
        "hitDamage": [
          33, 33, 34
        ],
        "castTime": 79,
        "elements": [
          "dark"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "dark",
            "value": 100
          }
        ],
        "framesList": [
          202, 5, 5
        ]
      },
      {
        "id": 229446,
        "names": {
          "en": "Scarmiglione's Power",
          "tw": "斯卡米留尼之力",
          "kr": "스컬밀리오네의 힘",
          "fr": "Pouvoir de Scarmiglione",
          "de": "Scarmigliones Macht",
          "es": "Poder de Scarmiglione"
        },
        "damage": "magic",
        "base": 550,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          70
        ]
      },
      {
        "id": 229447,
        "names": {
          "en": "Cagnazzo's Power",
          "tw": "凱納槽之力",
          "kr": "카이나초의 힘",
          "fr": "Pouvoir de Cagnazzo",
          "de": "Cagnazzos Macht",
          "es": "Poder de Cagnazzo"
        },
        "damage": "magic",
        "base": 450,
        "hitDamage": [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.1111111111111112, 88.88888888888889
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          133, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12
        ]
      },
      {
        "id": 229448,
        "names": {
          "en": "Barbariccia's Power",
          "tw": "巴爾巴莉希亞之力",
          "kr": "발바리시아의 힘",
          "fr": "Pouvoir de Barbariccia",
          "de": "Barbarizias Macht",
          "es": "Poder de Barbariccia"
        },
        "damage": "magic",
        "base": 450,
        "hitDamage": [
          1.5555555555555554, 1.5555555555555554, 1.5555555555555554, 1.5555555555555554, 1.5555555555555554, 1.5555555555555554, 1.7777777777777777, 88.88888888888889
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          50, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 20410,
        "names": {
          "en": "Impact",
          "tw": "衝擊",
          "kr": "임팩트",
          "de": "Aufprall",
          "es": "Impacto"
        },
        "damage": "magic",
        "base": 210,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "dark"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          290
        ]
      },
      {
        "id": 229449,
        "names": {
          "en": "Rubicante's Power",
          "tw": "盧比坎特之力",
          "kr": "루비칸테의 힘",
          "fr": "Pouvoir de Rubicante",
          "de": "Rubicantes Macht",
          "es": "Poder de Rubicante"
        },
        "damage": "magic",
        "base": 450,
        "hitDamage": [
          1.222222222222222, 1.222222222222222, 1.222222222222222, 1.222222222222222, 1.222222222222222, 1.222222222222222, 1.222222222222222, 1.222222222222222, 1.333333333333333, 88.88888888888889
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          52, 6, 6, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 229451,
        "names": {
          "en": "Abyssal Quasar",
          "tw": "深淵類星體",
          "kr": "어비스 퀘이사",
          "fr": "Quasar abyssal",
          "de": "Abyssus-Nova",
          "es": "Nova abismal"
        },
        "damage": "magic",
        "base": 200,
        "hitDamage": [
          3.125, 3.125, 3.125, 3.125, 87.5
        ],
        "castTime": 50,
        "elements": [
          "dark"
        ],
        "dualable": false,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          52, 20, 20, 20, 20
        ]
      },
      {
        "id": 509024,
        "names": {
          "en": "Twin Meteor",
          "tw": "W隕石",
          "kr": "W메테오",
          "fr": "Météore X",
          "de": "Doppelmeteo",
          "es": "Meteo dual"
        },
        "damage": "magic",
        "base": 1800,
        "hitDamage": [
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "dualable": false,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          141, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 204001707,
        "names": {
          "en": "Dark Abyss",
          "tw": "深淵之暗",
          "kr": "심연의 어둠",
          "fr": "Abysse des ténèbres",
          "de": "Dunkler Abgrund",
          "es": "Abismo de tinieblas"
        },
        "damage": "magic",
        "base": 1350,
        "hitDamage": [
          100
        ],
        "elements": [
          "dark"
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "debuffs": [
          {
            "type": "dark",
            "value": 100
          }
        ],
        "framesList": [
          200
        ]
      }
    ],
    "multipleBlack": 2,
    "multipleWhite": 2,
    "multipleGreen": 2,
    "multiCasts": [
      {
        "count": 4,
        "abilities": [
          229442,
          229444,
          229446,
          229447,
          229448,
          229449,
          229451,
          509021,
          509022,
          509024
        ]
      }
    ]
  },
  {
    "id": 241,
    "names": {
      "en": "Gravey",
      "tw": "格雷比",
      "kr": "그레이비"
    },
    "abilities": [
      {
        "id": 229594,
        "names": {
          "en": "Overedge",
          "tw": "終結之刃",
          "kr": "오버 엣지",
          "fr": "Au-delà",
          "de": "Überhang",
          "es": "Más allá de la frontera"
        },
        "base": 210,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          45
        ]
      },
      {
        "id": 200350,
        "names": {
          "en": "Fireworks",
          "tw": "霸彈",
          "kr": "제압 탄환",
          "fr": "Feux d'artifice",
          "de": "Strahlenkugel",
          "es": "Kiai total"
        },
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 25,
        "framesList": [
          130
        ]
      },
      {
        "id": 229592,
        "names": {
          "en": "Killer Sword",
          "tw": "殺戮之劍",
          "kr": "킬러 소드",
          "fr": "Épée létale",
          "de": "Killerschwert",
          "es": "Espada asesina"
        },
        "base": 210,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          60
        ]
      },
      {
        "id": 229593,
        "names": {
          "en": "Flame Slash (FFBE)",
          "tw": "火焰斬擊",
          "kr": "화염 베기(FFBE)",
          "fr": "Coup enflammé (FFBE)",
          "de": "Flammenhieb (FFBE)",
          "es": "Estocada flamígera (FFBE)"
        },
        "base": 280,
        "hitDamage": [
          100
        ],
        "elements": [
          "fire"
        ],
        "offset": 8,
        "framesList": [
          7
        ]
      },
      {
        "id": 229591,
        "names": {
          "en": "Sacrificial Blade",
          "tw": "刀鋒犧牲",
          "kr": "번제의 검",
          "fr": "Lame sacrificielle",
          "de": "Opferklinge",
          "es": "Hoja sacrificadora"
        },
        "base": 320,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          112
        ]
      },
      {
        "id": 229590,
        "names": {
          "en": "Burn Breaker",
          "tw": "爆炎破壞者",
          "kr": "번 브레이커",
          "fr": "Brisebrûlure",
          "de": "Brandbrecher",
          "es": "Destrucción abrasiva"
        },
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 50
          }
        ],
        "framesList": [
          100
        ]
      },
      {
        "id": 100020106,
        "names": {
          "en": "Snare Slash",
          "tw": "奪搶抽打",
          "kr": "올가미의 참격",
          "fr": "Piège éblouissant",
          "de": "Fallenbrecher",
          "es": "Corte sorpresa"
        },
        "base": 840,
        "hitDamage": [
          20, 20, 20, 40
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          120, 10, 15, 23
        ]
      }
    ]
  },
  {
    "id": 242,
    "names": {
      "en": "Tomoe",
      "tw": "巴",
      "kr": "토모에"
    },
    "abilities": [
      {
        "id": 229615,
        "names": {
          "en": "Guard Sniper",
          "tw": "防衛·狙擊",
          "kr": "가드 스나이퍼",
          "fr": "Garde sniper",
          "de": "Deckender Scharfschütze",
          "es": "Guarda francotiradora"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          102
        ]
      },
      {
        "id": 229614,
        "names": {
          "en": "Attack Sniper",
          "tw": "攻擊·狙擊",
          "kr": "어택 스나이퍼",
          "fr": "Snipassaut",
          "de": "Offensiver Scharfschütze",
          "es": "Ataque francotirador"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          102
        ]
      },
      {
        "id": 229611,
        "names": {
          "en": "Sniper Shot",
          "tw": "狙擊射擊",
          "kr": "스나이퍼 샷",
          "fr": "Tir précis",
          "de": "Heckenschuss",
          "es": "Disparo de francotiradora"
        },
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          102
        ]
      },
      {
        "id": 229613,
        "names": {
          "en": "Fatal Shot",
          "tw": "致命射擊",
          "kr": "파탈 샷",
          "fr": "Tir létal",
          "de": "Tödlicher Schuss",
          "es": "Tiro fatal"
        },
        "base": 675,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          100
        ]
      },
      {
        "id": 229610,
        "names": {
          "en": "First Burst",
          "tw": "首次爆破",
          "kr": "퍼스트 버스트",
          "fr": "Premier éclat",
          "de": "Erster Streuschuss",
          "es": "Primer estallido"
        },
        "base": 280,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          125
        ]
      },
      {
        "id": 509120,
        "names": {
          "en": "Second Burst",
          "tw": "二次爆破",
          "kr": "세컨드 버스트",
          "fr": "Second éclat",
          "de": "Zweiter Streuschuss",
          "es": "Segundo estallido"
        },
        "base": 280,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          140
        ]
      },
      {
        "id": 509121,
        "names": {
          "en": "Lagoa Burst",
          "tw": "拉戈亞爆破",
          "kr": "라고아 버스트",
          "fr": "Explo-Lagoa",
          "de": "Lagoa-Sperrfeuer",
          "es": "Estallido Lagoa"
        },
        "base": 300,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          140
        ]
      },
      {
        "id": 100020206,
        "names": {
          "en": "Burst Sniper",
          "tw": "爆破狙擊",
          "kr": "버스트 스나이퍼",
          "fr": "Snipéclat",
          "de": "Sperrfeuer-Scharfschütze",
          "es": "Francotiradora explosiva"
        },
        "base": 590,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          233
        ]
      }
    ]
  },

  {
    "id": 243,
    "names": {
      "en": "Akstar",
      "tw": "阿克斯特",
      "kr": "엑스타"
    },
    "abilities": [
      {
        "id": 200330,
        "names": {
          "en": "Fingersnap",
          "tw": "醒夢",
          "kr": "백일몽",
          "fr": "Éveil",
          "de": "Fieberwahn",
          "es": "Agudeza"
        },
        "base": 110,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70
        ]
      },
      {
        "id": 229566,
        "names": {
          "en": "Polar Vortex - Frost",
          "tw": "冰碎 ─凍─",
          "kr": "빙쇄-얼음-",
          "fr": "Vortex polaire - Gelure",
          "de": "Polarwirbel - Frost",
          "es": "Torbellino polar - Escarcha"
        },
        "base": 320,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "ice"
        ],
        "offset": 14,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 229563,
        "names": {
          "en": "Mirror of Equity - Acuity",
          "tw": "明鏡・銳",
          "kr": "잔잔한 거울·예",
          "fr": "Sérénité - Acuité",
          "de": "Kata - Scharfsinn",
          "es": "Tranquilidad - Agudeza"
        },
        "base": 300,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 229562,
        "names": {
          "en": "Thirty Slash Combo",
          "tw": "三十連斬",
          "kr": "삼십연참",
          "fr": "Trente entailles",
          "de": "Dreißig-Hiebe-Kombo",
          "es": "Triacontacombo rebanador"
        },
        "base": 450,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ]
      },
      {
        "id": 229567,
        "names": {
          "en": "Blazing Heat - Ash",
          "tw": "炎熱 ─灰─",
          "kr": "염열-재-",
          "fr": "Embrasement - Cendres",
          "de": "Lodernde Hitze - Asche",
          "es": "Ardor abrasador - Cenizas"
        },
        "base": 320,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 229564,
        "names": {
          "en": "Mirror of Equity - Disorder",
          "tw": "明鏡・亂",
          "kr": "잔잔한 거울·란",
          "fr": "Sérénité - Désordre",
          "de": "Kata - Chaos",
          "es": "Tranquilidad - Disturbio"
        },
        "base": 280,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 229565,
        "names": {
          "en": "Mirror of Equity - Supremacy",
          "tw": "明鏡・霸",
          "kr": "잔잔한 거울·패",
          "fr": "Sérénité - Domination",
          "de": "Kata - Übermacht",
          "es": "Tranquilidad - Supremacía"
        },
        "base": 230,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 229561,
        "names": {
          "en": "Absolute Mirror of Equity",
          "tw": "極・明鏡",
          "kr": "극·잔잔한 거울",
          "fr": "Sérénité absolue",
          "de": "Vollkommene Kata",
          "es": "Tranquilidad total"
        },
        "base": 675,
        "hitDamage": [
          1.0370370370370372, 1.0370370370370372, 1.0370370370370372, 1.0370370370370372, 1.0370370370370372, 1.1111111111111112, 1.1111111111111112, 92.5925925925926
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 509112,
        "names": {
          "en": "True Mirror of Equity",
          "tw": "真・明鏡",
          "kr": "진·잔잔한 거울",
          "fr": "Véritable Sérénité",
          "de": "Wahre Kata",
          "es": "Tranquilidad verdadera"
        },
        "base": 650,
        "hitDamage": [
          3.230769230769231, 3.230769230769231, 3.230769230769231, 3.230769230769231, 3.230769230769231, 3.4615384615384612, 3.4615384615384612, 76.92307692307692
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 229571,
        "names": {
          "en": "Mirror of Equity - Emptiness",
          "tw": "明鏡・虛",
          "kr": "잔잔한 거울·허",
          "fr": "Sérénité absolue - Vide",
          "de": "Kata - Leere",
          "es": "Tranquilidad - Desolación"
        },
        "base": 230,
        "hitDamage": [
          3.4782608695652173, 3.4782608695652173, 3.695652173913044, 3.695652173913044, 3.695652173913044, 3.695652173913044, 78.26086956521739
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "debuffs": [
          {
            "type": "fire",
            "value": 75
          },
          {
            "type": "ice",
            "value": 75
          }
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 100020007,
        "names": {
          "en": "Subjection to Equity - Rainfall",
          "tw": "必殺劍・雨曝",
          "kr": "필살검·강우",
          "fr": "Soumission à la Sérénité - Pluie torrentielle",
          "de": "Kataunterwerfung - Regenschauer",
          "es": "Tranquilidad subordinada - Diluvio"
        },
        "base": 1490,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 61
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          229561,
          229562,
          229563,
          229564,
          229565,
          229566,
          229567,
          229571,
          509112
        ]
      }
    ]
  },
  {
    "id": 244,
    "names": {
      "en": "Zeno of the Beta Star",
      "tw": "二鬥星傑諾",
      "kr": "이성투사 제노",
      "fr": "Xeno de l'étoile Bêta",
      "de": "Beta-Stern-Zeno",
      "es": "Zeno de la estrella Beta"
    },
    "abilities": [
      {
        "id": 912337,
        "names": {
          "en": "Fingersnap",
          "tw": "醒夢",
          "kr": "성몽",
          "fr": "Éveil",
          "de": "Fieberwahn",
          "es": "Agudeza"
        },
        "base": 110,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70
        ]
      },
      {
        "id": 912340,
        "names": {
          "en": "Mirror of Equity - Acuity",
          "tw": "明鏡・銳",
          "kr": "잔잔한 거울·예",
          "fr": "Sérénité - Acuité",
          "de": "Kata - Scharfsinn",
          "es": "Tranquilidad - Agudeza"
        },
        "base": 300,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 912341,
        "names": {
          "en": "Scorch",
          "tw": "陽炎",
          "kr": "양염",
          "fr": "Brûlure",
          "de": "Verbrennen",
          "es": "Calcinación"
        },
        "base": 450,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "fire",
            "value": 100
          }
        ],
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 912346,
        "names": {
          "en": "Dismissal",
          "tw": "斷動",
          "kr": "단동",
          "fr": "Interruption",
          "de": "Immobilia",
          "es": "Oportunidad"
        },
        "base": 400,
        "hitDamage": [
          100
        ],
        "castTime": 15,
        "offset": 14,
        "framesList": [
          1
        ]
      },
      {
        "id": 912347,
        "names": {
          "en": "Blazing Heat - Ash",
          "tw": "炎熱 ─灰─",
          "kr": "염열-재-",
          "fr": "Embrasement - Cendres",
          "de": "Lodernde Hitze - Asche",
          "es": "Ardor abrasador - Cenizas"
        },
        "base": 320,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 20290,
        "names": {
          "en": "Firaja",
          "tw": "強火焰",
          "kr": "파이자",
          "fr": "Feu max",
          "de": "Feuka",
          "es": "Piro+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "fire"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          210
        ]
      },
      {
        "id": 912349,
        "names": {
          "en": "Imminent Death",
          "tw": "死亡迫近",
          "kr": "다가오는 죽음",
          "fr": "Mort imminente",
          "de": "Bevorstehender Tod",
          "es": "Muerte fulminante"
        },
        "base": 400,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70
        ]
      },
      {
        "id": 912350,
        "names": {
          "en": "Firaga Slash",
          "tw": "大火焰劍",
          "kr": "파이가 검",
          "fr": "Lame Feu X",
          "de": "Feuga-Schnitt",
          "es": "Corte Piro++"
        },
        "base": 300,
        "hitDamage": [
          4.666666666666667, 4.666666666666667, 4.666666666666667, 4.666666666666667, 4.666666666666667, 5.000000000000001, 5.000000000000001, 66.66666666666667
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 912351,
        "names": {
          "en": "Mirror of Equity - Disorder",
          "tw": "明鏡・亂",
          "kr": "잔잔한 거울·란",
          "fr": "Sérénité - Désordre",
          "de": "Kata - Chaos",
          "es": "Tranquilidad - Disturbio"
        },
        "base": 280,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 912353,
        "names": {
          "en": "Mirror of Equity - Supremacy",
          "tw": "明鏡・霸",
          "kr": "잔잔한 거울·패",
          "fr": "Sérénité - Domination",
          "de": "Kata - Übermacht",
          "es": "Tranquilidad - Supremacía"
        },
        "base": 230,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 912354,
        "names": {
          "en": "Absolute Mirror of Equity",
          "tw": "極・明鏡",
          "kr": "극·잔잔한 거울",
          "fr": "Sérénité absolue",
          "de": "Vollkommene Kata",
          "es": "Tranquilidad total"
        },
        "base": 650,
        "hitDamage": [
          1.0769230769230769, 1.0769230769230769, 1.0769230769230769, 1.0769230769230769, 1.0769230769230769, 1.153846153846154, 1.153846153846154, 92.3076923076923
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 912357,
        "names": {
          "en": "Kaleido Slash",
          "tw": "三十虹連斬",
          "kr": "삼십홍연참",
          "fr": "Tranche-kaléido",
          "de": "Kaleidoschnitt",
          "es": "Caleidocorte"
        },
        "base": 400,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ]
      },
      {
        "id": 912358,
        "names": {
          "en": "Crimson Flash",
          "tw": "紅閃",
          "kr": "홍섬",
          "fr": "Éclat pourpre",
          "de": "Purpurner Blitz",
          "es": "Destello carmesí"
        },
        "base": 400,
        "hitDamage": [
          7, 7, 7, 7, 7, 7, 7, 7, 44
        ],
        "castTime": 38,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          42, 6, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 912370,
        "names": {
          "en": "True Mirror of Equity",
          "tw": "真・明鏡",
          "kr": "진·잔잔한 거울",
          "fr": "Véritable Sérénité",
          "de": "Wahre Kata",
          "es": "Tranquilidad verdadera"
        },
        "base": 650,
        "hitDamage": [
          3.230769230769231, 3.230769230769231, 3.230769230769231, 3.230769230769231, 3.230769230769231, 3.4615384615384612, 3.4615384615384612, 76.92307692307692
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 912371,
        "names": {
          "en": "Obliterating Mirror of Equity's Roar",
          "tw": "絕·明鏡 ─咆哮─",
          "kr": "절·잔잔한 거울-포효-",
          "fr": "Rugissement de la Sérénité primordiale",
          "de": "Gebrüll der Vernichtenden Kata",
          "es": "Rugido de Tranquilidad fulminante"
        },
        "base": 1000,
        "hitDamage": [
          1.4, 1.4, 1.4, 1.4, 1.4, 1.5, 1.5, 90
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 401007607,
        "names": {
          "en": "Subjection to Equity - Crimson",
          "tw": "必殺劍·紅",
          "kr": "필살검·진홍",
          "fr": "Soumission à la Sérénité - Éclat carmin",
          "de": "Kataunterwerfung - Purpur",
          "es": "Tranquilidad subordinada - Carmesí"
        },
        "base": 1490,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 61
        ],
        "dualable": false,
        "offset": 8,
        "ignore": 50,
        "framesList": [
          92, 17, 6, 6, 16, 6, 16, 6, 6, 16, 6, 16, 6, 20
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          912340,
          912341,
          912346,
          912347,
          912349,
          912350,
          912351,
          912353,
          912354,
          912357,
          912358,
          912371,
          912370
        ]
      }
    ],
    maxChainCap: 6
  },
  {
    "id": 245,
    "names": {
      "en": "Yego",
      "tw": "伊戈",
      "kr": "이고"
    },
    "abilities": [
      {
        "id": 229412,
        "names": {
          "en": "Smash",
          "tw": "猛擊",
          "kr": "맹타",
          "fr": "Fracas",
          "de": "Niederschlagen",
          "es": "Estragos"
        },
        "base": 350,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          44
        ]
      },
      {
        "id": 20240,
        "names": {
          "en": "Aeroga",
          "tw": "大勁風",
          "kr": "에어로가",
          "fr": "Vent X",
          "es": "Aero++"
        },
        "damage": "magic",
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          110
        ]
      },
      {
        "id": 229414,
        "names": {
          "en": "Malboro Tentacle",
          "tw": "毛爾波爾觸手",
          "kr": "몰볼의 촉수",
          "fr": "Tentacule de morbol",
          "de": "Morbol-Tentakel",
          "es": "Tentáculo molbol"
        },
        "base": 280,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          70
        ]
      },
      {
        "id": 229419,
        "names": {
          "en": "Wild Whip",
          "tw": "狂野鞭打",
          "kr": "맹렬한 채찍",
          "fr": "Fouet sauvage",
          "de": "Wilder Peitschenhieb",
          "es": "Látigo salvaje"
        },
        "base": 480,
        "hitDamage": [
          33, 33, 34
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          45, 4, 4
        ]
      },
      {
        "id": 20330,
        "names": {
          "en": "Aeroja",
          "tw": "強勁風",
          "kr": "에어로쟈",
          "fr": "Vent max",
          "de": "Aeroka",
          "es": "Aero+++"
        },
        "damage": "magic",
        "base": 600,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "wind"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          170
        ]
      },
      {
        "id": 229420,
        "names": {
          "en": "Ground Whip",
          "tw": "大地之鞭",
          "kr": "대지의 채찍",
          "fr": "Fouet tellurique",
          "de": "Bodenpeitsche",
          "es": "Látigo terrestre"
        },
        "base": 560,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "earth",
            "value": 75
          }
        ],
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 229426,
        "names": {
          "en": "Brutal Whip",
          "tw": "殘暴鞭",
          "kr": "무자비한 채찍",
          "fr": "Fouet brutal",
          "de": "Brutale Peitsche",
          "es": "Látigo brutal"
        },
        "base": 700,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "earth",
            "value": 100
          }
        ],
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 509015,
        "names": {
          "en": "Toxic Whip",
          "tw": "強毒鞭",
          "kr": "맹독성 채찍 조이기",
          "fr": "Fouet hyper venimeux",
          "de": "Giftpeitsche",
          "es": "Pongámonos serios"
        },
        "base": 1600,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 16, 24
        ],
        "castTime": 20,
        "offset": 14,
        "framesList": [
          38, 15, 14, 24, 3, 13, 13, 44
        ]
      },
      {
        "id": 100019207,
        "names": {
          "en": "Malboro Bite",
          "tw": "毛爾波爾咬",
          "kr": "몰볼 바이트",
          "fr": "Morsure de morbol",
          "de": "Morbol-Biss",
          "es": "Mordisco de molbol"
        },
        "base": 2600,
        "hitDamage": [
          100
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          156
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          229412,
          229413,
          229414,
          229418,
          229419,
          229420,
          229425,
          229426,
          229427,
          229428,
          509010,
          509015
        ]
      }
    ]
  },
  {
    "id": 248,
    "names": {
      "en": "Nagi",
      "tw": "那岐",
      "kr": "나기"
    },
    "abilities": [
      {
        "id": 229392,
        "names": {
          "en": "Water Projection",
          "tw": "水影",
          "kr": "수영",
          "fr": "Projection aquatique",
          "de": "Wasserprojektion",
          "es": "Proyección acuosa"
        },
        "damage": "hybrid",
        "base": 750,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "offset": 14,
        "framesList": [
          190
        ]
      },
      {
        "id": 229393,
        "names": {
          "en": "Ice Splinters",
          "tw": "冰粒",
          "kr": "빙립",
          "fr": "Échardes de glace",
          "de": "Eissplitter",
          "es": "Partículas de hielo"
        },
        "damage": "hybrid",
        "base": 750,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "ice"
        ],
        "offset": 14,
        "framesList": [
          240
        ]
      },
      {
        "id": 229394,
        "names": {
          "en": "Yin-Yang Bind",
          "tw": "陰陽影縫",
          "kr": "음양의 그림자 묶기",
          "fr": "Lien du Yin et Yang",
          "de": "Ying-Yang Stickerei",
          "es": "Amarre yin-yang"
        },
        "damage": "hybrid",
        "base": 500,
        "hitDamage": [
          100
        ],
        "castTime": 20,
        "offset": 14,
        "framesList": [
          50
        ]
      },
      {
        "id": 229398,
        "names": {
          "en": "Poison Mist",
          "tw": "毒霧",
          "kr": "독안개",
          "fr": "Brume empoisonnée",
          "de": "Giftnebel",
          "es": "Niebla venenosa"
        },
        "damage": "hybrid",
        "base": 550,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          180
        ]
      },
      {
        "id": 229399,
        "names": {
          "en": "Brilliance",
          "tw": "炫目",
          "kr": "현요",
          "fr": "Illumination",
          "de": "Brillianz",
          "es": "Resplandor"
        },
        "damage": "hybrid",
        "base": 1650,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "light",
            "value": 100
          }
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 229400,
        "names": {
          "en": "Dark Spirits",
          "tw": "幽暗",
          "kr": "유암",
          "fr": "Esprits obscurs",
          "de": "Dunkle Geister",
          "es": "Ánimos oscuros"
        },
        "damage": "hybrid",
        "base": 1650,
        "hitDamage": [
          14, 14, 14, 14, 14, 14, 16
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "dark",
            "value": 100
          }
        ],
        "framesList": [
          70, 7, 5, 7, 7, 7, 7
        ]
      },
      {
        "id": 229401,
        "names": {
          "en": "Dying Flora",
          "tw": "瀕死之花",
          "kr": "무성화",
          "fr": "Fleur mourante",
          "de": "Sterbende Pflanzen",
          "es": "Flora moribunda"
        },
        "damage": "hybrid",
        "base": 1100,
        "hitDamage": [
          6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10
        ],
        "castTime": 40,
        "offset": 14,
        "debuffs": [
          {
            "type": "ice",
            "value": 60
          },
          {
            "type": "wind",
            "value": 60
          }
        ],
        "framesList": [
          80, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 229405,
        "names": {
          "en": "Projection - Dance of Darkness",
          "tw": "投影·暗亂舞",
          "kr": "투영·암난무",
          "fr": "Projection - Danse des ténèbres",
          "de": "Projektion - Tanz der Dunkelheit",
          "es": "Proyección - Danza oscura"
        },
        "damage": "hybrid",
        "base": 1750,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "offset": 14,
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ]
      },
      {
        "id": 509001,
        "names": {
          "en": "Projection - Dance of Destruction",
          "tw": "投影·滅卻亂舞",
          "kr": "투영·멸각난무",
          "fr": "Projection - Danse de la destruction",
          "de": "Projektion - Tanz der Zerstörung",
          "es": "Proyección - Danza destructiva"
        },
        "damage": "hybrid",
        "base": 2800,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "dark"
        ],
        "offset": 14,
        "framesList": [
          60
        ]
      },
      {
        "id": 100019107,
        "names": {
          "en": "Illusory Possession - Fox Fire",
          "tw": "幻想憑依·狐火",
          "kr": "환상빙의·여우불",
          "fr": "Possession illusoire - Renard de feu",
          "de": "Illusorische Besessenheit - Fuchslichter",
          "es": "Posesión ilusoria - Fuego de zorro"
        },
        "damage": "hybrid",
        "base": 3000,
        "hitDamage": [
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 45
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          86, 10, 10, 10, 10, 10, 10, 10, 10, 10, 53, 143
        ]
      }
    ]
  },
  {
    "id": 247,
    "names": {
      "en": "Zolulu & Delulu",
      "tw": "佐魯魯&德魯魯",
      "kr": "조루루&데루루",
      "es": "Zolulu y Delulu"
    },
    "abilities": [
      {
        "id": 229373,
        "names": {
          "en": "Disarm Target",
          "tw": "解除武裝",
          "kr": "무장 타겟",
          "fr": "Désarmement - Arme",
          "de": "Ziel entwaffnen",
          "es": "Desarme"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          87
        ]
      },
      {
        "id": 229374,
        "names": {
          "en": "Deshield Target",
          "tw": "解除護盾",
          "kr": "보호구 타겟",
          "fr": "Désarmement - Bouclier",
          "de": "Ziel abrüsten",
          "es": "Desamparo"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          87
        ]
      },
      {
        "id": 20210,
        "names": {
          "en": "Blizzaga",
          "tw": "大暴雪",
          "kr": "블리자가",
          "fr": "Glace X",
          "de": "Eisga",
          "es": "Hielo++"
        },
        "damage": "magic",
        "base": 180,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "magicType": "black",
        "elements": [
          "ice"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          150
        ]
      },
      {
        "id": 229378,
        "names": {
          "en": "Raging Bow",
          "tw": "烈弓",
          "kr": "분노의 화살",
          "fr": "Arc enragé",
          "de": "Tobender Bogen",
          "es": "Arco furioso"
        },
        "base": 230,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          50, 10, 10, 10, 10
        ]
      },
      {
        "id": 229379,
        "names": {
          "en": "Straining Shot",
          "tw": "滿弓射擊",
          "kr": "전력 사격",
          "fr": "Tir incapacitant",
          "de": "Angespannter Schuss",
          "es": "Tiro tensado"
        },
        "base": 340,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          80
        ]
      },
      {
        "id": 229382,
        "names": {
          "en": "Thunder Scheme",
          "tw": "偽計的雷箭",
          "kr": "속임수의 번개 화살",
          "fr": "Plan électrique",
          "de": "Donnerplan",
          "es": "Plan relámpago"
        },
        "base": 280,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "lightning"
        ],
        "offset": 14,
        "framesList": [
          80
        ]
      },
      {
        "id": 100019306,
        "names": {
          "en": "Dirty Combination",
          "tw": "骯髒連擊",
          "kr": "더러운 협동 플레이",
          "fr": "Combinaison fourbe",
          "de": "Schmutzige Kombo",
          "es": "Combinación turbia"
        },
        "base": 900,
        "hitDamage": [
          8, 8, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 29
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          75, 6, 5, 5, 5, 5, 7, 10, 7, 8, 9, 10, 11, 21
        ]
      }
    ]
  },
  {
    "id": 246,
    "names": {
      "en": "Galas",
      "tw": "伽拉斯",
      "kr": "갈라스"
    },
    "abilities": [
      {
        "id": 229351,
        "names": {
          "en": "Slash Down",
          "tw": "落下斬擊",
          "kr": "내려치기",
          "fr": "Coup bas",
          "de": "Fallschnitt",
          "es": "Despedazar"
        },
        "base": 180,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          2
        ]
      },
      {
        "id": 229352,
        "names": {
          "en": "Muscle Press",
          "tw": "肌肉強壓",
          "kr": "근육 압박",
          "fr": "Pression musculaire",
          "de": "Muskelpresse",
          "es": "Presión muscular"
        },
        "base": 220,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          2
        ]
      },
      {
        "id": 229353,
        "names": {
          "en": "Massive Cut",
          "tw": "大切斷",
          "kr": "대절단",
          "fr": "Super coup",
          "de": "Superschnitt",
          "es": "Supercorte"
        },
        "base": 150,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42
        ]
      },
      {
        "id": 229355,
        "names": {
          "en": "Power Rush",
          "tw": "力量衝擊",
          "kr": "힘의 돌진",
          "fr": "Ruée de puissance",
          "de": "Machtrausch",
          "es": "Riada de poder"
        },
        "base": 260,
        "hitDamage": [
          10, 10, 10, 70
        ],
        "castTime": 29,
        "offset": 14,
        "framesList": [
          31, 11, 12, 53
        ]
      },
      {
        "id": 229356,
        "names": {
          "en": "Hell's Fissure",
          "tw": "地獄裂縫",
          "kr": "지옥의 균열",
          "fr": "Fissure infernale",
          "de": "Höllenriss",
          "es": "Grieta infernal"
        },
        "base": 200,
        "hitDamage": [
          100
        ],
        "elements": [
          "earth"
        ],
        "offset": 8,
        "framesList": [
          107
        ]
      },
      {
        "id": 229357,
        "names": {
          "en": "Jab",
          "tw": "根基",
          "kr": "거센 찌르기",
          "fr": "Prescription",
          "de": "Kinnhaken",
          "es": "Prescripción"
        },
        "base": 270,
        "hitDamage": [
          100
        ],
        "offset": 8,
        "framesList": [
          2
        ]
      },
      {
        "id": 229360,
        "names": {
          "en": "Bloody Chopper",
          "tw": "嗜血撕裂者",
          "kr": "피의 흉검",
          "fr": "Couperet sanglant",
          "de": "Bluthacker",
          "es": "Tajo sangriento"
        },
        "base": 120,
        "hitDamage": [
          100
        ],
        "castTime": 29,
        "offset": 14,
        "framesList": [
          140
        ]
      },
      {
        "id": 229361,
        "names": {
          "en": "Ground Shake",
          "tw": "大地震擊",
          "kr": "대지 흔들기",
          "fr": "Secousse violente",
          "de": "Bodentremor",
          "es": "Temblor de tierra"
        },
        "base": 250,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 40,
        "elements": [
          "earth"
        ],
        "offset": 14,
        "framesList": [
          60, 8, 8, 8, 8
        ]
      },
      {
        "id": 100019405,
        "names": {
          "en": "Sparking Destroyer",
          "tw": "破壞火花",
          "kr": "섬광의 파괴자",
          "fr": "Destructeur électrique",
          "de": "Funkenschlagender Zerstörer",
          "es": "Destructor chispeante"
        },
        "base": 800,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 52
        ],
        "dualable": false,
        "offset": 8,
        "framesList": [
          139, 6, 12, 3, 6, 6, 8, 10, 6, 6, 6, 6, 6, 6, 6, 6, 6
        ]
      }
    ]
  },
  {
    "id": 249,
    "names": {
      "en": "King Edgar of Figaro",
      "tw": "費加羅國王埃德加",
      "kr": "피가로의 왕 에드가",
      "fr": "Edgar, roi de Figaro",
      "de": "König Edgar von Figaro",
      "es": "Edgar, rey de Fígaro"
    },
    "abilities": [
      {
        "id": 229940,
        "names": {
          "en": "Auto Crossbow (FFVI)",
          "tw": "自動弩",
          "kr": "자동 석궁",
          "fr": "Arbalète à rafales",
          "de": "Auto-Armbrust (FFVI)",
          "es": "Autoballesta (FFVI)"
        },
        "base": 180,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          42, 5, 5, 5, 5
        ]
      },
      {
        "id": 229943,
        "names": {
          "en": "Flash (FFVI)",
          "tw": "強光照射器",
          "kr": "태양 광선",
          "fr": "Flash",
          "de": "Gleißer (FFVI)"
        },
        "base": 300,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 30
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "light",
            "value": 50
          }
        ],
        "framesList": [
          60, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 229944,
        "names": {
          "en": "Drill (FFVI)",
          "tw": "鑽頭",
          "kr": "드릴",
          "fr": "Foreuse",
          "de": "Bohrer (FFVI)",
          "es": "Taladro (FFVI)"
        },
        "base": 240,
        "hitDamage": [
          5, 95
        ],
        "castTime": 18,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          20, 127
        ]
      },
      {
        "id": 229945,
        "names": {
          "en": "Chainsaw (FFVI)",
          "tw": "回轉電鋸",
          "kr": "회전톱",
          "fr": "Tronçonneuse",
          "de": "Kettensäge (FFVI)",
          "es": "Sierra mecánica (FFVI)"
        },
        "base": 480,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 73
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          110, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 229948,
        "names": {
          "en": "Air Anchor",
          "tw": "空氣錨",
          "kr": "에어 앵커",
          "fr": "Ancreur aérien",
          "de": "Luftanker",
          "es": "Ancla aérea"
        },
        "base": 420,
        "hitDamage": [
          30, 30, 40
        ],
        "castTime": 40,
        "offset": 14,
        "framesList": [
          72, 10, 10
        ]
      },
      {
        "id": 509287,
        "names": {
          "en": "Royal Shock",
          "tw": "王族衝擊",
          "kr": "고귀한 타격",
          "fr": "Choc royal",
          "de": "Königsschock",
          "es": "Impacto magno"
        },
        "base": 1750,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ]
      },
      {
        "id": 509283,
        "names": {
          "en": "Corona Beam",
          "tw": "日冕射線",
          "kr": "빛무리 광선",
          "fr": "Rayon coronaire",
          "de": "Korona-Strahl",
          "es": "Haz de corona"
        },
        "base": 400,
        "hitDamage": [
          11, 11, 11, 11, 11, 11, 11, 23
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "offset": 14,
        "debuffs": [
          {
            "type": "light",
            "value": 75
          }
        ],
        "framesList": [
          92, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 509284,
        "names": {
          "en": "Trifecta Drill",
          "tw": "三連鑽頭",
          "kr": "3종 효과 드릴",
          "fr": "Foreuse à triple effet",
          "de": "Trifecta-Bohrer",
          "es": "Perforación triple"
        },
        "base": 540,
        "hitDamage": [
          1.666666666666667, 31.66666666666667, 33.333333333333336, 33.333333333333336
        ],
        "castTime": 10,
        "offset": 14,
        "ignore": 50,
        "debuffs": [
          {
            "type": "water",
            "value": 100
          },
          {
            "type": "earth",
            "value": 100
          },
          {
            "type": "light",
            "value": 100
          }
        ],
        "framesList": [
          20, 46, 42, 35
        ]
      },
      {
        "id": 206001907,
        "names": {
          "en": "Glory of Figaro",
          "tw": "費加羅的榮光",
          "kr": "피가로의 영광",
          "fr": "Splendeur de Figaro",
          "de": "Figaros Glanz",
          "es": "Esplendor de Fígaro"
        },
        "base": 2200,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          233, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          229940,
          229943,
          229944,
          229945,
          229948,
          509283,
          509284,
          509287
        ]
      }
    ]
  },
  {
    "id": 250,
    "names": {
      "en": "Monk Sabin of Kolts",
      "tw": "科爾茲格鬥家馬修",
      "kr": "콜츠의 격투가 매시",
      "fr": "Sabin, moine de Kolts",
      "de": "Mönch Sabin von Kolts",
      "es": "Sabin, monje de Kolts"
    },
    "abilities": [
      {
        "id": 200200,
        "names": {
          "en": "Kick",
          "tw": "踢擊",
          "kr": "발차기",
          "fr": "Coup de pied",
          "de": "Tritt",
          "es": "Puntapié"
        },
        "base": 110,
        "hitDamage": [
          33, 33, 34
        ],
        "castTime": 10,
        "offset": 14,
        "framesList": [
          2, 3, 3
        ]
      },
      {
        "id": 229970,
        "names": {
          "en": "Raging Fist (FFVI)",
          "tw": "爆裂拳",
          "kr": "폭렬권",
          "fr": "Poing foudroyant",
          "de": "Faustwirbel (FFVI)",
          "es": "Puños de ira (FFVI)"
        },
        "base": 300,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 3,
        "offset": 14,
        "framesList": [
          5, 9, 18, 30, 16
        ]
      },
      {
        "id": 229971,
        "names": {
          "en": "Aura Cannon (FFVI)",
          "tw": "靈氣炮",
          "kr": "아우라 포격",
          "fr": "Rayon d'aura",
          "de": "Aura-Kanone (FFVI)",
          "es": "Cañón de aura (FFVI)"
        },
        "damage": "magic",
        "base": 250,
        "hitDamage": [
          100
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "offset": 14,
        "framesList": [
          80
        ]
      },
      {
        "id": 229972,
        "names": {
          "en": "Meteor Strike (FFVI)",
          "tw": "隕石撞擊",
          "kr": "메테오 스트라이크",
          "fr": "Chute du météore",
          "de": "Meteorit (FFVI)",
          "es": "Impacto Meteo (FFVI)"
        },
        "base": 275,
        "hitDamage": [
          100
        ],
        "castTime": 10,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          20
        ]
      },
      {
        "id": 229973,
        "names": {
          "en": "Rising Phoenix",
          "tw": "鳳凰之舞",
          "kr": "봉황의 춤",
          "fr": "Danse du Phénix",
          "de": "Phönixtanz",
          "es": "Vuelo del Fénix"
        },
        "base": 320,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "castTime": 40,
        "elements": [
          "fire"
        ],
        "offset": 14,
        "framesList": [
          110, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 229974,
        "names": {
          "en": "Razor Gale",
          "tw": "真空波",
          "kr": "진공파",
          "fr": "Vague de vide",
          "de": "Klingensturm",
          "es": "Ráfaga lacerante"
        },
        "base": 320,
        "hitDamage": [
          10, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ],
        "castTime": 40,
        "elements": [
          "wind"
        ],
        "offset": 14,
        "framesList": [
          110, 10, 10, 10, 10, 10, 10, 10, 10, 10
        ]
      },
      {
        "id": 229977,
        "names": {
          "en": "Phantom Rush",
          "tw": "夢幻鬥舞",
          "kr": "몽환투무",
          "fr": "Rixe évanescente",
          "de": "Phantomstoß",
          "es": "Estampida espectral"
        },
        "base": 300,
        "hitDamage": [
          1.1666666666666667, 1.1666666666666667, 1.1666666666666667, 1.1666666666666667, 1.1666666666666667, 1.2500000000000002, 1.2500000000000002, 91.66666666666669
        ],
        "castTime": 40,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 509302,
        "names": {
          "en": "Tiger Break",
          "tw": "猛虎破",
          "kr": "타이거 브레이크",
          "fr": "Élan du tigre",
          "de": "Steintiger",
          "es": "Descarga del tigre"
        },
        "base": 1500,
        "hitDamage": [
          20, 20, 20, 20, 20
        ],
        "castTime": 10,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          2, 7, 7, 7, 7
        ]
      },
      {
        "id": 206002007,
        "names": {
          "en": "Duncan Combo",
          "tw": "鄧肯·協作",
          "kr": "던컨 콤비네이션",
          "fr": "Combo de Duncan",
          "de": "Duncans Kombo",
          "es": "Combo de Duncan"
        },
        "base": 1750,
        "hitDamage": [
          1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
        ],
        "dualable": false,
        "offset": 14,
        "ignore": 50,
        "framesList": [
          55, 3, 3, 3, 3, 3, 3, 3, 3, 67, 3, 3, 3, 3, 4, 4, 68, 6, 6, 6, 73, 34, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 3,
        "abilities": [
          200200,
          229970,
          229971,
          229972,
          229973,
          229974,
          229977,
          509302
        ]
      }
    ]
  },
  {
    "id": 251,
    "names": {
      "en": "Summer Fina & Lid",
      "tw": "夏日菲娜&里德",
      "kr": "여름의 피나&리드",
      "fr": "Fina & Lid en maillot",
      "de": "Sommer-Fina & -Lid",
      "es": "Fina y Lid veraniegas"
    },
    "abilities": [
      {
        "id": 223860,
        "names": {
          "en": "Arms Dissolver",
          "tw": "武裝溶解",
          "kr": "무력 용해",
          "fr": "Dissoudre armes",
          "de": "Waffenauflöser",
          "es": "Disolvente de armas"
        },
        "base": 100,
        "hitDamage": [
          20, 80
        ],
        "castTime": 32,
        "offset": 14,
        "framesList": [
          34, 98
        ]
      },
      {
        "id": 223870,
        "names": {
          "en": "Barrier Dissolver",
          "tw": "屏障溶解",
          "kr": "장벽 용해",
          "fr": "Dissoudre barrière",
          "de": "Barrierenauflöser",
          "es": "Disolvente de barreras"
        },
        "base": 100,
        "hitDamage": [
          20, 80
        ],
        "castTime": 32,
        "offset": 14,
        "framesList": [
          34, 98
        ]
      },
      {
        "id": 509210,
        "names": {
          "en": "Water Splash",
          "tw": "水花飛濺",
          "kr": "살수",
          "fr": "Éclaboussures d'eau",
          "de": "Wasserspritzer",
          "es": "Salpicadura de agua"
        },
        "base": 200,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "offset": 14,
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ]
      }
    ]
  },
  {
    "id": 252,
    "names": {
      "en": "Summer Folka & Citra",
      "tw": "夏日芙爾卡&希特拉",
      "kr": "여름의 폴카&시트라",
      "fr": "Folka & Citra en maillot",
      "de": "Sommer-Folka & -Citra",
      "es": "Folka y Citra veraniegas"
    },
    "abilities": [
      {
        "id": 230063,
        "names": {
          "en": "Summon - Sunshine",
          "tw": "日光召喚",
          "kr": "소환·햇살",
          "fr": "Invocation - Rayon de soleil",
          "de": "Beschwörung - Sonnenschein",
          "es": "Invocación - Rayos de sol"
        },
        "damage": "magic",
        "base": 1050,
        "hitDamage": [
          2, 2, 2, 2, 2, 2, 2.285714285714286, 85.71428571428571
        ],
        "castTime": 40,
        "elements": [
          "light"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 230062,
        "names": {
          "en": "Summon - Waves",
          "tw": "波濤召喚",
          "kr": "소환·파도",
          "fr": "Invocation - Vagues",
          "de": "Beschwörung - Wellen",
          "es": "Invocación - Olas"
        },
        "damage": "magic",
        "base": 1050,
        "hitDamage": [
          2, 2, 2, 2, 2, 2, 2.285714285714286, 85.71428571428571
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 509210,
        "names": {
          "en": "Water Splash",
          "tw": "水花飛濺",
          "kr": "살수",
          "fr": "Éclaboussures d'eau",
          "de": "Wasserspritzer",
          "es": "Salpicadura de agua"
        },
        "base": 200,
        "hitDamage": [
          3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "offset": 14,
        "framesList": [
          42, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ]
      },
      {
        "id": 509351,
        "names": {
          "en": "Summon - Sparkling Waves",
          "tw": "閃光波濤召喚",
          "kr": "해변 별장에서의 휴식",
          "fr": "Invocation - Vagues étincelantes",
          "de": "Beschwörung - Funkelnde Wellen",
          "es": "Invocación - Olas espumosas"
        },
        "damage": "magic",
        "base": 2150,
        "hitDamage": [
          2.604651162790698, 2.604651162790698, 2.604651162790698, 2.604651162790698, 2.604651162790698, 2.604651162790698, 2.9767441860465116, 81.3953488372093
        ],
        "castTime": 40,
        "elements": [
          "water",
          "light"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 230070,
        "names": {
          "en": "High Tide Spirit",
          "tw": "沙灘召喚士",
          "kr": "영혼의 만조",
          "fr": "Esprit de la marée haute",
          "de": "Geist der Flut",
          "es": "Espíritu de pleamar"
        },
        "damage": "magic",
        "base": 1200,
        "hitDamage": [
          2.3333333333333335, 2.3333333333333335, 2.3333333333333335, 2.3333333333333335, 2.3333333333333335, 2.3333333333333335, 2.666666666666667, 83.33333333333331
        ],
        "castTime": 40,
        "elements": [
          "water"
        ],
        "dualable": false,
        "offset": 14,
        "framesList": [
          70, 6, 6, 6, 6, 6, 6, 6
        ]
      },
      {
        "id": 100020907,
        "names": {
          "en": "Fun in the Sun",
          "tw": "女士們的夏日假期",
          "kr": "숙녀들의 여름 휴가",
          "fr": "S'amuser sous le soleil",
          "de": "Spaß in der Sonne",
          "es": "Diversión bajo el sol"
        },
        "damage": "magic",
        "base": 3000,
        "hitDamage": [
          20, 20, 60
        ],
        "elements": [
          "water"
        ],
        "dualable": false,
        "offset": 14,
        "debuffs": [
          {
            "type": "water",
            "value": 100
          },
          {
            "type": "light",
            "value": 100
          }
        ],
        "framesList": [
          64, 46, 146
        ]
      }
    ],
    "multiCasts": [
      {
        "count": 2,
        "abilities": [
          230062,
          230063,
          230070,
          509351
        ]
      }
    ]
  }
];
