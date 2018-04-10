export const roleBirth = () => {
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
          CARRY,
          MOVE,
          MOVE,
          MOVE,
          MOVE
        ]
      ]
    },
    {
      creepName: 'upgrader',
      creepNum: 2,
      creepProperty: [
        [WORK, CARRY, MOVE],
        // [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
      ]
    },
    {
      creepName: 'builder',
      creepNum: 2,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
      ]
    },
    {
      creepName: 'engineer',
      creepNum: 1,
      creepProperty: [[WORK, CARRY, MOVE], [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]]
    },
    {
      creepName: 'outDig-Flag2',
      creepNum: 1,
      creepProperty: [
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE]
      ]
    },
    {
      creepName: 'outDig-Flag3',
      creepNum: 1,
      creepProperty: [
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE]
      ]
    },
    {
      creepName: 'outDig-Flag4',
      creepNum: 1,
      creepProperty: [
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE]
      ]
    },
    {
      creepName: 'outDig-Flag5',
      creepNum: 1,
      creepProperty: [
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE]
      ]
    },
    {
      creepName: 'outTransporter-Flag2',
      creepNum: 1,
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
      creepNum: 1,
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
      creepNum: 1,
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
      creepNum: 1,
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
          MOVE,
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
      creepName: 'solider-Flag2',
      creepNum: 1,
      creepProperty: [[WORK, MOVE, MOVE, CLAIM, CLAIM], [WORK, MOVE, MOVE, CLAIM, CLAIM]]
    },
    {
      creepName: 'solider-Flag3',
      creepNum: 1,
      creepProperty: [[WORK, MOVE, MOVE, CLAIM, CLAIM], [WORK, MOVE, MOVE, CLAIM, CLAIM]]
    },
    {
      creepName: 'solider-Flag4',
      creepNum: 1,
      creepProperty: [[WORK, MOVE, MOVE, CLAIM, CLAIM], [WORK, MOVE, MOVE, CLAIM, CLAIM]]
    },
    {
      creepName: 'solider-Flag5',
      creepNum: 1,
      creepProperty: [[WORK, MOVE, MOVE, CLAIM, CLAIM], [WORK, MOVE, MOVE, CLAIM, CLAIM]]
    }
  ];
  // 看dig的数量小于3，就先生产dig
  var digsnum = _.filter(Game.creeps, creep => creep.memory.role === 'dig-2');
  if (digsnum.length < 1) {
    creep = [
      {
        creepName: 'dig-2',
        creepNum: 1,
        creepProperty: [
          [WORK, WORK, MOVE],
          [WORK, WORK, WORK, MOVE],
          [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
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
    switch (creep[i].creepName) {
      case 'dig-1':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'dig-2':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'transporter':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'upgrader':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'builder':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'engineer':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'builder-Flag2':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'builder-Flag3':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'builder-Flag4':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'solider-Flag2':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'solider-Flag3':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'solider-Flag4':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'solider-Flag5':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'outTransporter-Flag2':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'outTransporter-Flag3':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'outTransporter-Flag4':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'outTransporter-Flag5':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'outDig-Flag2':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'outDig-Flag3':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'outDig-Flag4':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'outDig-Flag5':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
    }
  }

  function birth(_name, _num, _property, _creeptype) {
    var a = '';
    var p = [];
    a = _name;
    p = _property[0];
    //
    var n = _.filter(Game.creeps, creep => creep.memory.role === _name);
    console.log('Totle:  ' + _name + ' 🐒' + n.length + '/' + _num);

    // 判断是否5个 extionsion活跃
    var extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
      filter: s => {
        return s.structureType === STRUCTURE_EXTENSION && s.isActive() === true;
      }
    });
    // console.log(extensions.length);
    if (_name === 'transporter') {
      if (extensions.length < 5) {
        p = _property[0];
        // console.log("1burn :" + p)
      } else if (n.length < 1) {
        p = _property[1];
        // console.log('2burn :' + p);
      } else {
        p = _property[2];
      }
    } else if (_name === 'dig') {
      if (extensions.length < 5) {
        p = _property[1];
        // console.log("burn :" + p)
      } else {
        p = _property[2];
      }
    } else if (_property[2] && _name !== 'transporter') {
      p = _property[2];
      // console.log("//burn :" + p)
    } else if (_name !== 'transporter') {
      p = _property[1];
    }
    var newName = '';
    if (n.length < _num) {
      if (
        _name === 'dig-1' ||
        _name === 'dig-2' ||
        _name === 'builder-Flag2' ||
        _name === 'builder-Flag3' ||
        _name === 'builder-Flag4' ||
        _name === 'outDig-Flag2' ||
        _name === 'outDig-Flag3' ||
        _name === 'outDig-Flag4' ||
        _name === 'outDig-Flag5' ||
        _name === 'outTransporter-Flag2' ||
        _name === 'outTransporter-Flag3' ||
        _name === 'outTransporter-Flag4' ||
        _name === 'outTransporter-Flag5' ||
        _name === 'solider-Flag2' ||
        _name === 'solider-Flag3' ||
        _name === 'solider-Flag4' ||
        _name === 'solider-Flag5'
      ) {
        newName = a + '-' + Game.time;
      } else {
        newName = a + Game.time;
      }

      console.log('🐻want a: ' + _name + '    with:' + p + '  named:  ' + newName);
      Game.spawns['Spawn1'].spawnCreep(p, newName, {
        memory: { role: a }
      });
    }
  }

  //
  if (Game.spawns['Spawn1'].spawning) {
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
      '🐣' + spawningCreep.memory.role,
      Game.spawns['Spawn1'].pos.x + 1,
      Game.spawns['Spawn1'].pos.y,
      { align: 'left', opacity: 0.8 }
    );
  }
};
