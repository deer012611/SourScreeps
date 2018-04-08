import { ErrorMapper } from './utils';
import {
  roleBirth,
  roleBuilder,
  roleDig,
  roleEngineer,
  roleTransporter,
  roleUpgrader,
  roleOutDig,
  roleOutTransporter,
  roleSolider
} from './role';
import { Grafana } from './mod/Grafana';
// import { spawn } from 'child_process';

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
      creepNum: 3,
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
      creepNum: 2,
      creepProperty: [
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
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
      creepNum: 3,
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
      creepName: 'outTransporter-Flag2',
      creepNum: 2,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE],
        [
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
          WORK,
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
          MOVE,
          CARRY,
          CARRY,
          CARRY,
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
      creepName: 'solider',
      creepNum: 1,
      creepProperty: [[WORK, MOVE, CLAIM, CLAIM], [WORK, MOVE, CLAIM, CLAIM]]
    }
  ]);

  // Link
  const linkFrom = Game.getObjectById('5ac212ecac37e47fd05a46a3');
  // const linkTo = linkFrom.pos.findInRange(FIND_MY_STRUCTURES, 2, {
  //   filter: { structureType: STRUCTURE_LINK }
  // });
  var linkTo = Game.getObjectById('5ac2082a8f54c347c5c42679');

  if (linkFrom.energy === linkFrom.energyCapacity && linkTo.energy === 0) {
    linkFrom.transferEnergy(linkTo, 800);
  }

  // 防御塔
  var tower1 = Game.getObjectById('5ab6827b7afe841dc7136d09');
  var tower2 = Game.getObjectById('5ac236322a293d47b9ecaa41');

  const towercontrol = tower => {
    if (tower) {
      var closestBadRampart = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: structure => structure.hits < 3000 && structure.structureType === 'rampart'
      });
      // var closestRampart = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      //   filter: structure =>
      //     structure.hits < structure.hitsMax * 0.2 && structure.structureType === 'rampart'
      // });
      var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: structure =>
          structure.hits < structure.hitsMax * 0.2 &&
          structure.structureType !== 'rampart' &&
          structure.structureType !== 'constructedWall'
      });
      var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

      if (closestHostile) {
        tower.attack(closestHostile);
      } else if (tower.energy > tower.energyCapacity * 0.6) {
        if (closestBadRampart) {
          tower.repair(closestBadRampart);
        } else {
          // else if (closestRampart) {
          //   tower.repair(closestRampart);
          // } ///
          tower.repair(closestDamagedStructure);
        }
      }
    }
  };
  towercontrol(tower1);
  towercontrol(tower2);

  //
  for (name in Game.creeps) {
    var creep = Game.creeps[name];

    // 修脚下的路
    const checkroad = creep => {
      var closestRoad = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: structure =>
          structure.hits < structure.hitsMax * 0.8 && structure.structureType === 'road'
      });
      creep.repair(closestRoad);
    };
    checkroad(creep);
    //

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
    if (creep.memory.role === 'outDig-Flag2' || creep.memory.role === 'outDig-Flag3') {
      var digFlagPos = creep.name.split('-');
      roleOutDig(creep, digFlagPos[1]);
    }
    if (
      creep.memory.role === 'outTransporter-Flag2' ||
      creep.memory.role === 'outTransporter-Flag3'
    ) {
      var transFlagPos = creep.name.split('-');
      roleOutTransporter(creep, transFlagPos[1]);
    }
    if (creep.memory.role === 'engineer') {
      roleEngineer(creep);
    }
    if (creep.memory.role === 'solider') {
      roleSolider(creep);
    }
  }

  if (Game.time % 9 === 0 && Game.cpu.bucket > 5000) {
    Grafana.run();
  }

  //

  let goals = _.map(creep.room.find(FIND_SOURCES), function(source) {
    // We can't actually walk on sources-- set `range` to 1
    // so we path next to it.
    return { pos: source.pos, range: 1 };
  });
  console.log('goals:        ' + goals[0]);

  // 召回
  //  var targets = Game.getObjectById('5ab47aa30088cd3fa6624d68');
  //  creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffaa00'}});
});
