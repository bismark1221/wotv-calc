### Les chaines

#### Comment fonctionne le jeu ?
La première chose à savoir quand on veut faire les chaines, c'est que le jeux tourne en 60 frames par seconde

Ceci est important car les coups des différents sorts frappent tout les X frames et non pas des secondes ou des millisecondes

Cependant via un calcul assez simple on sait qu'1 frame = 16.66 milliseconds

#### Qu'est-ce-qu'une chaine exactement ?
C'est quand 2 unités, ou plus, vont frapper la cible avec des coups de façon alternée

Pour rentrer un peu plus dans les détails avec un petit exemple

L'unité 1 va taper en premier la cible, puis ensuite l'unité 2, l'unité 1 va ensuite re-taper, puis l'unité 2, etc...

En jeu globalement à chaque fois que vous voyer marquer "Combo", c'est que vous etes en train de faire une chaine :)

#### Pourquoi faire des chaines ?
Parce qu'on veut voir de gros chiffres ^^

Non, concrètement à chaque combo la puissance des coups augmente et ce jusqu'à X4

Voici le détail des modifications
 - Combo neutre : 10%
 - Combo élémentaire : 20% par éléments
 - Combo étincelle : 30%

Sachant que chacun de ces combos sont cumulables, du coup un combo feu + eau en étincelles fait grimpé la puissance de 80% d'un seul coup

Voici donc un tableau qui récapitule le nombre de coup nécessaire pour atteindre la modification maximal de X4

![chain modifier][chain_modifier]

#### Briser une chaine
Il y a plusieurs façons de briser une chaine
 - Une unité tape 2 fois d'affilé
 - Il y a un écart de plus de 21 frames entre 2 coups

Dès qu'une chaine est brisé, on repart à 0 combo et la puissance retombe donc elle aussi à X1

#### Ajouter un finisseur dans une chaine
A tout moment on faire frapper d'autres unités dans la chaine pour profiter de l'augmentation des dégats

Mais qu'est-ce-qu'on appel des finisseurs... C'est des unités qui ont des sorts qui ne font qu'un seul coup

De ce fait toute leur puissance peut-être augmenté d'un seul coup, de plus en général leur sort sont plus puissant que les sorts permettant de réaliser des chaines

Il faut donc essayer de les faire frapper dès que la puissance est à X4

#### Décortiquer les données de sort trouver sur internet
Il existe sur internet plusieurs façon de voir écrit les différents sorts de nos unités

Si on regarde de plus près Tidus avec son Attaque éclair
 - Version frames : 22-5-5-5-5-5-5-5-5-5-5-20
 - Version cumulée : 22-27-32-37-42-47-52-57-62-67-72-92
 - version ffbe-chain : 0-5-5-5-5-5-5-5-5-5-5-20

Ici le premier nombre que l'on voit dans les 2 premières écriture c'est le 1er coup, ici 22

Ça veut dire que Tidus frapera avec son Attaque éclair 22 frames après que vous ayez cliqué sur l'unité, soit 22 x 16,66 = 366.52 millisecondes

Ensuite grâce à la première écriture, on sait que le second coup survient 5 frames après le premier coup, soit à 27 frames (que l'on retrouve dans la version cumulée)

#### Particularité pour un double-sort ou via deux-armes
Reprenons notre Tidus avec son Attaque éclair (22-5-5-5-5-5-5-5-5-5-5-20)

Maintenant attaquons nous au cas où Tidus possède 2 armes, donc un deux-armes, dans ce cas là il nous une donnée supplémentaire : à quel moment commence le 2nd sort ?

Pour cela on trouve dans les données le temps de cast d'un sort, pour l'Attaque éclair de Tidus c'est 20 frames

Du coup la théorie voudrais le schéma suivant
 - 1er sort : 22-27-32-37-42-47-52-57-62-67-72-92
 - 2ème sort : 42-47-52-57-62-67-72-77-82-87-92-112

![fake tidus quick hit][fake_quick_hit]

Malheureusement ce n'est pas aussi simple... Grâce à Whahat de reddit, on a découvert que certains sorts subissait un délais d'attente supplémentaire, nommé offset, non présent dans les fichiers de données... ([Multi-Hit Chain Reference/Hit Data] and [frame delays on dualhit])

Pour l'Attaque éclair de Tidus on a donc découvert qu'il avait donc un offset de 16 frames, du coup voici les données réels pour Tidus
 - 1er sort : 22-27-32-37-42-47-52-57-62-67-72-92
 - 2ème sort : 58-63-68-73-78-83-88-93-98-103-108-128

![real tidus quick hit][real_quick_hit]

Comme vous pouvez le voir, le 2nd sort est donc lancé avant la fin du premier, c'est le cas pour beaucoup d'unités mais pas tous

Voici le cas d'Orlandeau qui "attend" la fin de son premier sort avant de lancer le second

![orlandeau][orlandeau]

#### Qu'est-ce-que les étincelles ?
Une étincelle survient quand 2 unité frappes lors de la même frame, attention par contre un seul des 2 coup est concidéré comme étincelle

#### L'importance des positions dans une chaine
Nouvelle découverte, en tout cas pour ma part, c'est que la position des unités à une importance dans les chaines

Une unité positionnée avant une autre frappera toujours avant, même dans le cadre d'un combo étincelle

Et c'est justement dans se cas précis où il peut se passer des choses bizarres, c'est le cas pour une chaine entre Tidus et Pirate Jake

Je vous met donc ici une petite vidéo de ma chaine youtube qui montre la différence de chaine en inversant juste Tidus et Pirate Jake de position

<iframe class="youtube" width="560" height="315" src="https://www.youtube.com/embed/vTmBNy9jMDY" frameborder="0" allowfullscreen></iframe>

Mais ne vous en faites pas sur le site cette problématique est déjà prise en compte

![chain tidus and pirate jake][tidus_pirate_jake]

##### Les macro
Je ne vais pas vous expliquer ici comment mettre en place les macro dans vos émulateurs mais juste quelques règles sur l'utilisation des macro
 - Memu : Attention vous devez avoir une ligne vide à la fin de votre fichier sinon le dernier coup ne marchera pas (elle est ajoutée dans le générateur, du coup si vous cliquez sur Copier il ne devrait pas y avoir de problèmes)
 - Pas de ligne vide dans le fichier entre les différentes instructions, aussi sous Memu que Nox


[chain_modifier]: ../../assets/how-to/ffbe_chain_modifier.png "Chain Modifier"
[fake_quick_hit]: ../../assets/how-to/fake_quick_hit.png "Fake Quick Hit"
[real_quick_hit]: ../../assets/how-to/real_quick_hit.png "Real Quick Hit"
[orlandeau]: ../../assets/how-to/orlandeau.png "Chain Orlandeau"
[tidus_pirate_jake]: ../../assets/how-to/tidus_pirate_jake.png "Chain Tidus and Pirate Jake"
[Multi-Hit Chain Reference/Hit Data]: https://dm.reddit.com/r/FFBraveExvius/comments/5dbam6/jp_multihit_chain_referencehit_data
[frame delays on dualhit]: https://dm.reddit.com/r/FFBraveExvius/comments/6ct7uc/frame_delays_for_many_popular_chaining_moves
