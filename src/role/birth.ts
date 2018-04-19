export const roleBirth = () => {
  // Spawn1造兵
  var creep = [];
  creep = [
    {
      creepName: 'transporter',
      creepNum: 2,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, MOVE, CARRY, MOVE],
        [
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          MOVE,
          CARRY,
          CARRY,
          MOVE,
          MOVE,
          MOVE,
          WORK,
          CARRY,
          MOVE,
          MOVE
        ]
      ]
    },
    {
      creepName: 'dig-1',
      creepNum: 1,
      creepProperty: [
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
      ]
    },
    {
      creepName: 'dig-2',
      creepNum: 1,
      creepProperty: [
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, MOVE],
        [
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          CARRY,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE
        ]
      ]
    },
    {
      creepName: 'upgrader',
      creepNum: 5,
      creepProperty: [
        [WORK, CARRY, MOVE],
        // [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
      ]
    },
    {
      creepName: 'builder',
      creepNum: 1,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          CARRY,
          CARRY,
          CARRY,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE
        ]
      ]
    },
    {
      creepName: 'engineer',
      creepNum: 1,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, MOVE]
      ]
    },
    {
      creepName: 'attactSolider',
      creepNum: 0,
      creepProperty: [[WORK, CARRY, MOVE, ATTACK], [WORK, CARRY, MOVE, ATTACK]]
    },
    {
      creepName: 'outDig-Flag2',
      creepNum: 0,
      creepProperty: [
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE]
      ]
    },
    {
      creepName: 'outDig-Flag3',
      creepNum: 0,
      creepProperty: [
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE]
      ]
    },
    {
      creepName: 'outDig-Flag4',
      creepNum: 0,
      creepProperty: [
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE]
      ]
    },
    {
      creepName: 'outDig-Flag5',
      creepNum: 0,
      creepProperty: [
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE]
      ]
    },
    {
      creepName: 'outTransporter-Flag1',
      creepNum: 0,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE],
        [
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          MOVE,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          WORK,
          CARRY,
          CARRY,
          MOVE
        ]
      ]
    },
    {
      creepName: 'outTransporter-Flag2',
      creepNum: 0,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE],
        [
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          MOVE,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          WORK,
          CARRY,
          CARRY,
          MOVE
        ]
      ]
    },
    {
      creepName: 'outTransporter-Flag3',
      creepNum: 0,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE],
        [
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          MOVE,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          WORK,
          CARRY,
          CARRY,
          MOVE
        ]
      ]
    },
    {
      creepName: 'outTransporter-Flag4',
      creepNum: 0,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE],
        [
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          MOVE,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          WORK,
          CARRY,
          CARRY,
          MOVE
        ]
      ]
    },
    {
      creepName: 'outTransporter-Flag5',
      creepNum: 0,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE],
        [
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          MOVE,
          CARRY,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          WORK,
          CARRY,
          MOVE
        ]
      ]
    },
    {
      creepName: 'builder-Flag2',
      creepNum: 0,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
      ]
    },
    {
      creepName: 'builder-Flag3',
      creepNum: 0,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
      ]
    },
    {
      creepName: 'builder-Flag4',
      creepNum: 0,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
      ]
    },
    {
      creepName: 'builder-Flag6',
      creepNum: 0,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
      ]
    },
    {
      creepName: 'solider-Flag2',
      creepNum: 0,
      creepProperty: [[WORK, MOVE, MOVE, CLAIM, CLAIM], [WORK, MOVE, MOVE, CLAIM, CLAIM]]
    },
    {
      creepName: 'solider-Flag3',
      creepNum: 0,
      creepProperty: [[WORK, MOVE, MOVE, CLAIM, CLAIM], [WORK, MOVE, MOVE, CLAIM, CLAIM]]
    },
    {
      creepName: 'solider-Flag4',
      creepNum: 0,
      creepProperty: [[WORK, MOVE, MOVE, CLAIM, CLAIM], [WORK, MOVE, MOVE, CLAIM, CLAIM]]
    },
    {
      creepName: 'solider-Flag5',
      creepNum: 0,
      creepProperty: [[WORK, MOVE, MOVE, CLAIM, CLAIM], [WORK, MOVE, MOVE, CLAIM, CLAIM]]
    },
    {
      creepName: 'solider-Flag6',
      creepNum: 0,
      creepProperty: [[WORK, MOVE, MOVE, CLAIM], [WORK, MOVE, MOVE, CLAIM]]
    },
    {
      creepName: 'upgrader-Flag6',
      creepNum: 0,
      creepProperty: [
        [WORK, CARRY, MOVE],
        // [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
        [
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          WORK,
          CARRY,
          CARRY,
          CARRY,
          CARRY,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE,
          MOVE
        ]
      ]
    }
  ];
  // 看dig的数量小于3，就先生产dig
  var digsnum = _.filter(Game.creeps, creep => creep.memory.role === 'dig-1');
  if (digsnum.length < 1) {
    creep = [
      {
        creepName: 'dig-1',
        creepNum: 1,
        creepProperty: [
          [WORK, WORK, MOVE],
          [WORK, WORK, WORK, MOVE],
          [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
        ]
      }
    ];
  }
  // 看builder的数量小于3，就先生产builder
  var buildsnum = _.filter(Game.creeps, creep => creep.memory.role === 'builder');
  if (buildsnum.length < 5) {
    creep = [
      {
        creepName: 'builder',
        creepNum: 5,
        creepProperty: [
          [WORK, CARRY, MOVE],
          [WORK, CARRY, MOVE],
          [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
        ]
      }
    ];
  } // 看builder的数量小于3，就先生产builder
  var upgradernum = _.filter(Game.creeps, creep => creep.memory.role === 'upgrader');
  if (upgradernum.length < 5) {
    creep = [
      {
        creepName: 'upgrader',
        creepNum: 5,
        creepProperty: [
          [WORK, CARRY, MOVE],
          [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
          [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
        ]
      }
    ];
  }

  // 看transporter的数量小于3，就先生产transporter
  var transnum = _.filter(Game.creeps, creep => creep.memory.role === 'transporter');
  if (transnum.length < 2) {
    creep = [
      {
        creepName: 'transporter',
        creepNum: 2,
        creepProperty: [
          [WORK, CARRY, MOVE],
          [WORK, CARRY, MOVE, CARRY, MOVE],
          [
            CARRY,
            CARRY,
            CARRY,
            CARRY,
            CARRY,
            CARRY,
            MOVE,
            CARRY,
            CARRY,
            MOVE,
            MOVE,
            MOVE,
            WORK,
            CARRY,
            MOVE,
            MOVE
          ]
        ]
      }
    ];
  }

  for (var i = 0; i < creep.length; i++) {
    birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
  }
  // Spawn2造兵
  // var creep2 = [];
  // creep2 = [
  // {
  //   creepName: 'transporter-spawn2',
  //   creepNum: 2,
  //   creepProperty: [[WORK, CARRY, MOVE], [WORK, CARRY, MOVE], [WORK, CARRY, MOVE]]
  // },
  // {
  //   creepName: 'dig-spawn2-1',
  //   creepNum: 2,
  //   creepProperty: [[WORK, WORK, MOVE], [WORK, WORK, MOVE], [WORK, WORK, MOVE]]
  // },
  // {
  //   creepName: 'dig-spawn2-2',
  //   creepNum: 2,
  //   creepProperty: [[WORK, WORK, MOVE], [WORK, WORK, MOVE], [WORK, WORK, MOVE]]
  // },
  // {
  //   creepName: 'upgrader-spawn2',
  //   creepNum: 2,
  //   creepProperty: [[WORK, CARRY, MOVE], [WORK, CARRY, MOVE], [WORK, CARRY, MOVE]]
  // }
  // ];
  // for (var j = 0; j < creep2.length; j++) {
  //   switch (creep2[j].creepName) {
  //     case 'transporter-spawn2':
  //       birth(creep2[j].creepName, creep2[j].creepNum, creep2[j].creepProperty, 'Spawn2');
  //       break;
  //     case 'dig-spawn2-1':
  //       birth(creep2[j].creepName, creep2[j].creepNum, creep2[j].creepProperty, 'Spawn2');
  //       break;
  //     case 'dig-spawn2-2':
  //       birth(creep2[j].creepName, creep2[j].creepNum, creep2[j].creepProperty, 'Spawn2');
  //       break;
  //     case 'upgrader-spawn2':
  //       birth(creep2[j].creepName, creep2[j].creepNum, creep2[j].creepProperty, 'Spawn2');
  //       break;
  //   }
  // }
  function birth(_name, _num, _property, spawn) {
    var a = '';
    var p = [];
    a = _name;
    p = _property[0];
    //
    var n = _.filter(Game.creeps, creep => creep.memory.role === _name);
    if (_num !== 0) {
      console.log('Totle:  ' + _name + ' ' + n.length + '/' + _num);
    }

    // 判断是否5个 extionsion活跃
    var extensions = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
      filter: function(structure) {
        return structure.structureType === 'extension' && structure.isActive() === true;
      }
    });
    // transporter
    if (_name === 'transporter') {
      if (extensions.length <= 5) {
        p = _property[0];
      } else if (n.length < 1) {
        p = _property[1];
      } else {
        p = _property[2];
      }
    } else if (_name === 'dig') {
      // dig
      if (extensions.length <= 5) {
        p = _property[1];
      } else {
        p = _property[2];
      }
    } else if (_property[2] && _name !== 'transporter') {
      // 其他
      if (extensions.length === 0) {
        p = _property[0];
      } else if (extensions.length <= 5) {
        p = _property[1];
      } else {
        p = _property[2];
      }
    }

    var newName = '';
    if (n.length < _num) {
      if (
        _name === 'dig-1' ||
        _name === 'dig-2' ||
        _name === 'attactSolider' ||
        _name === 'builder-Flag2' ||
        _name === 'builder-Flag3' ||
        _name === 'builder-Flag4' ||
        _name === 'builder-Flag6' ||
        _name === 'outDig-Flag2' ||
        _name === 'outDig-Flag3' ||
        _name === 'outDig-Flag4' ||
        _name === 'outDig-Flag5' ||
        _name === 'outTransporter-Flag1' ||
        _name === 'outTransporter-Flag2' ||
        _name === 'outTransporter-Flag3' ||
        _name === 'outTransporter-Flag4' ||
        _name === 'outTransporter-Flag5' ||
        _name === 'solider-Flag2' ||
        _name === 'solider-Flag3' ||
        _name === 'solider-Flag4' ||
        _name === 'solider-Flag5' ||
        _name === 'solider-Flag6' ||
        _name === 'transporter-spawn2' ||
        _name === 'dig-spawn2-1' ||
        _name === 'dig-spawn2-2' ||
        _name === 'upgrader-spawn2' ||
        _name === 'upgrader-Flag6'
      ) {
        newName = a + '-' + Game.time;
      } else {
        newName = a + Game.time;
      }

      console.log('🐒want a: ' + _name + '    with:' + p + '  named:  ' + newName);
      if (spawn === undefined) {
        Game.spawns['Spawn1'].spawnCreep(p, newName, {
          memory: { role: a }
        });
      } else if (Game.spawns[spawn]) {
        Game.spawns[spawn].spawnCreep(p, newName, {
          memory: { role: a }
        });
      }
    }
  }

  //
  if (Game.spawns['Spawn1'].spawning) {
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
      '🐤' + spawningCreep.memory.role,
      Game.spawns['Spawn1'].pos.x + 1,
      Game.spawns['Spawn1'].pos.y,
      { align: 'left', opacity: 0.8 }
    );
  }
};
