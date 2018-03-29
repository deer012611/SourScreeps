export const roleBirth = (creep: Array) => {
  for (var i = 0; i < creep.length; i++) {
    // 看transporter的数量小于3，就先生产transporter
    var transnum = _.filter(Game.creeps, creep => creep.memory.role === 'transporter');
    if (creep[i].creepName !== 'transporter' && transnum.length < 2) {
      creep[i] = [
        {
          creepName: 'transporter',
          creepNum: 4,
          creepProperty: [[WORK, CARRY, MOVE], [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]]
        }
      ];
    }

    switch (creep[i].creepName) {
      case 'dig-1':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'dig-2':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'outDig':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'transporter':
        birth(creep[i].creepName, creep[i].creepNum, creep[i].creepProperty);
        break;
      case 'outTransporter':
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
      } else if (n.length < 2) {
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
      if (_name === 'dig-1' || _name === 'dig-2') {
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
