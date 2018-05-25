export const roleBirth = (SPAWN: string, CREEP: array) => {
  // Spawn1造兵
  var creep = [];
  creep = CREEP;

  if (SPAWN === 'Spawn1' || SPAWN === 'Spawn2') {
    // 看builder的数量小于3，就先生产builder
    var buildsnum = _.filter(Game.creeps, creep => creep.memory.role === 'builder');
    if (buildsnum.length < 2) {
      creep = [
        {
          creepName: 'builder',
          creepNum: 2,
          creepProperty: [
            [WORK, CARRY, MOVE],
            [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
            [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
          ]
        }
      ];
    }
    // 看dig的数量小于3，就先生产dig
    var digsnum = _.filter(Game.creeps, creep => creep.memory.role === 'dig-1');
    if (digsnum.length < 1) {
      creep = [
        {
          creepName: 'dig-1',
          creepNum: 1,
          creepProperty: [
            [WORK, WORK, MOVE],
            [WORK, WORK, WORK, WORK, WORK, MOVE],
            [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE]
          ]
        }
      ];
    }

    // 看dig的数量小于3，就先生产dig
    var digs2num = _.filter(Game.creeps, creep => creep.memory.role === 'dig-2');
    if (digs2num.length < 1) {
      creep = [
        {
          creepName: 'dig-2',
          creepNum: 1,
          creepProperty: [
            [WORK, WORK, CARRY, MOVE],
            [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
            [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]
          ]
        }
      ];
    }

    // 看upgrader的数量小于3，就先生产upgrader
    var upgradernum = _.filter(Game.creeps, creep => creep.memory.role === 'upgrader');
    if (upgradernum.length < 1) {
      creep = [
        {
          creepName: 'upgrader',
          creepNum: 3,
          creepProperty: [
            [WORK, CARRY, MOVE],
            // [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
            [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
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
              CARRY,
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
            [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
            [
              WORK,
              WORK,
              CARRY,
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
              MOVE
            ]
          ]
        }
      ];
    }
  }

  for (var i = 0; i < creep.length; i++) {
    birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty, SPAWN);
  }

  function birth(_name, _num, _property, spawn) {
    var a = '';
    var p = [];
    a = _name;
    p = _property[0];
    //
    var n = _.filter(Game.creeps, creep => creep.memory.role === _name);
    if (_num !== 0) {
      console.log(
        '🏠 ' + Game.spawns[SPAWN].room.name + ' Totle:  ' + _name + ' ' + n.length + '/' + _num
      );
    }

    // 判断是否5个 extionsion活跃
    var extensions = Game.spawns[SPAWN].room.find(FIND_STRUCTURES, {
      filter: function(structure) {
        return structure.structureType === 'extension' && structure.isActive() === true;
      }
    });
    // transporter
    if (_name.split('-')[0] === 'transporter') {
      if (n.length < 1) {
        p = _property[0];
      } else if (extensions.length <= 5) {
        p = _property[0];
      } else if (extensions.length >= 10) {
        p = _property[2];
      }
    } else if (_name.split('-')[0] === 'dig') {
      // dig
      if (extensions.length <= 5) {
        p = _property[1];
      } else if (extensions.length > 5 && extensions.length < 10) {
        p = _property[1];
      } else if (extensions.length >= 10) {
        p = _property[2];
      }
    } else if (_property[2] && _name.split('-')[0] !== 'transporter') {
      // 其他
      if (extensions.length === 0) {
        p = _property[0];
      } else if (extensions.length <= 5) {
        p = _property[1];
      } else if (extensions.length >= 10 && extensions.length < 20) {
        p = _property[2];
      } else if (extensions.length >= 20) {
        p = _property[3] ? _property[3] : _property[2];
      }
    }

    var newName = '';
    if (n.length < _num) {
      if (_name.split('-')[1]) {
        newName = a + '-' + Game.time;
      } else {
        newName = a + Game.time;
      }

      console.log('🐒want a: ' + _name + '    with:' + p + '  named:  ' + newName);
      if (spawn === undefined) {
        Game.spawns[SPAWN].spawnCreep(p, newName, {
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
  if (Game.spawns[SPAWN].spawning) {
    var spawningCreep = Game.creeps[Game.spawns[SPAWN].spawning.name];
    Game.spawns[SPAWN].room.visual.text(
      '🐤' + spawningCreep.memory.role,
      Game.spawns[SPAWN].pos.x + 1,
      Game.spawns[SPAWN].pos.y,
      { align: 'left', opacity: 0.8 }
    );
  }
};
