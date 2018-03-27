import { ErrorMapper } from './utils';
import {
  roleBirth,
  roleBuilder,
  roleDig,
  roleDismantler,
  roleEngineer,
  roleTransporter,
  roleUpgrader
} from './role';

export default ErrorMapper.wrapLoop(() => {
  // 清理缓存
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  // 生产creeps
  roleBirth([
    {
      creepName: 'transporter',
      creepNum: 4,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [(WORK, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE)],
        [WORK, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, MOVE, MOVE]
      ]
    },
    {
      creepName: 'dig-1',
      creepNum: 1,
      creepProperty: [
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, MOVE, MOVE]
      ]
    },
    {
      creepName: 'dig-2',
      creepNum: 1,
      creepProperty: [
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, MOVE, MOVE]
      ]
    },
    {
      creepName: 'upgrader',
      creepNum: 2,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE]
      ]
    },
    {
      creepName: 'builder',
      creepNum: 2,
      creepProperty: [[WORK, CARRY, MOVE], [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]]
    },
    {
      creepName: 'outbuilder',
      creepNum: 0,
      creepProperty: [[WORK, CARRY, MOVE], [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]]
    },
    {
      creepName: 'dismantler',
      creepNum: 0,
      creepProperty: [[WORK, CARRY, MOVE], [WORK, WORK, WORK, CARRY, MOVE, MOVE]]
    },
    {
      creepName: 'engineer',
      creepNum: 0,
      creepProperty: [[WORK, CARRY, MOVE], [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]]
    }
  ]);

  // 防御塔
  var tower = Game.getObjectById('5ab6827b7afe841dc7136d09');
  if (tower) {
    var closestBadRampart = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure => structure.hits < 1000 && structure.structureType === 'rampart'
    });
    var closestRampart = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure =>
        structure.hits < structure.hitsMax * 0.2 && structure.structureType === 'rampart'
    });
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
    } else {
      if (closestBadRampart) {
        tower.repair(closestBadRampart);
      } else if (closestRampart) {
        tower.repair(closestRampart);
      } else {
        tower.repair(closestDamagedStructure);
      }
    }
  }

  //
  for (name in Game.creeps) {
    var creep = Game.creeps[name];

    if (creep.memory.role === 'upgrader') {
      roleUpgrader(creep);
    }
    if (creep.memory.role === 'builder') {
      roleBuilder(creep);
    }
    if (creep.memory.role === 'transporter') {
      roleTransporter(creep);
    }
    if (creep.memory.role === 'dig-1' || creep.memory.role === 'dig-2') {
      var creepType = creep.name.split('-');

      if (creepType[1] === '1') {
        roleDig(creep, '59f1a38382100e1594f3ba5d');
      } else if (creepType[1] === '2') {
        roleDig(creep, '59f1a38382100e1594f3ba5e');
      }
    }
    if (creep.memory.role === 'engineer') {
      roleEngineer(creep);
    }
    if (creep.memory.role === 'dismantler') {
      roleDismantler(creep);
    }
  }

  // 召回
  //  var targets = Game.getObjectById('5ab47aa30088cd3fa6624d68');
  //  creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffaa00'}});
});
