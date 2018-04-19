import { ErrorMapper } from './utils/ErrorMapper';
import {
  roleBirth,
  roleBuilder,
  roleDig,
  roleEngineer,
  roleTransporter,
  roleUpgrader,
  roleOutDig,
  roleOutTransporter,
  roleSolider,
  roleAttact
} from './role';
import { Emoji } from './utils/Emoji';
import { getUsername } from './utils';
import { Grafana } from './mod/Grafana';
// import { spawn } from 'child_process';

const Root = (): void => {
  if (_.isUndefined(global.isRoot)) {
    console.log(Emoji.reload, 'Code Reloading ...');
    global._ME = getUsername();
    // Extend game prototypes
    require('./prototypes');
    // Extend functions
    require('./global');
    // Checkpoint
    global.isRoot = true;
  }
};

export default ErrorMapper.wrapLoop(() => {
  Root();
  // 清理缓存
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  // 生产creeps
  roleBirth();

  // Link
  const linkFromWall = Game.getObjectById('5ad43d23ad602d2f8786d4fe');
  const linkFromSource = Game.getObjectById('5ac212ecac37e47fd05a46a3');

  var linkTo = Game.getObjectById('5ac2082a8f54c347c5c42679');
  if (linkFromWall && linkFromWall) {
    if (linkFromWall.energy === linkFromWall.energyCapacity && linkTo.energy === 0) {
      linkFromWall.transferEnergy(linkTo, 800);
    }
    if (linkFromSource.energy === linkFromSource.energyCapacity && linkTo.energy === 0) {
      linkFromSource.transferEnergy(linkTo, 800);
    }
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
          structure.hits < structure.hitsMax * 0.6 && structure.structureType === 'road'
      });
      creep.repair(closestRoad);
    };
    const checkcontainer = creep => {
      var closestContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: structure =>
          structure.hits < structure.hitsMax * 0.6 && structure.structureType === 'container'
      });
      creep.repair(closestContainer);
    };
    checkroad(creep);
    checkcontainer(creep);

    //
    // var creepRole = creep.name.split('-')[0];
    // var creepType = creep.name.split('-')[1];
    //
    // if (creepRole === 'upgrader') {
    //   roleUpgrader(creep);
    // }
    // if (creepRole === 'builder') {
    //   roleBuilder(creep);
    // }
    // if (creepRole === 'transporter') {
    //   roleTransporter(creep);
    // }
    // if (creepRole === 'dig-1' || creepRole === 'dig-2') {
    //   if (creepType === '1') {
    //     roleDig(creep, '59f1a38382100e1594f3ba5d');
    //   } else if (creepType === '2') {
    //     roleDig(creep, '59f1a38382100e1594f3ba5e');
    //   }
    // }
    // if (creepRole === 'builder') {
    //   roleBuilder(creep, creepType);
    // }
    // if (creepRole === 'outDig') {
    //   roleOutDig(creep, creepType);
    // }
    // if (creepRole === 'outTransporter') {
    //   roleBuilder(creep, creepType);
    // }
    // if (creepRole === 'solider') {
    //   roleBuilder(creep, creepType);
    // }
    // if (creepRole === 'engineer') {
    //   roleEngineer(creep);
    // }

    //
    if (creep.memory.role === 'upgrader' || creep.memory.role === 'upgrader-Flag6') {
      var upgraderFlagPos = creep.name.split('-');
      roleUpgrader(creep, upgraderFlagPos[1]);
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
    if (
      creep.memory.role === 'builder-Flag2' ||
      creep.memory.role === 'builder-Flag3' ||
      creep.memory.role === 'builder-Flag4' ||
      creep.memory.role === 'builder-Flag6'
    ) {
      var buildFlagPos = creep.name.split('-');
      roleBuilder(creep, buildFlagPos[1]);
    }
    if (
      creep.memory.role === 'outDig-Flag2' ||
      creep.memory.role === 'outDig-Flag3' ||
      creep.memory.role === 'outDig-Flag4' ||
      creep.memory.role === 'outDig-Flag5'
    ) {
      var digFlagPos = creep.name.split('-');
      roleOutDig(creep, digFlagPos[1]);
    }
    if (
      creep.memory.role === 'outTransporter-Flag1' ||
      creep.memory.role === 'outTransporter-Flag2' ||
      creep.memory.role === 'outTransporter-Flag3' ||
      creep.memory.role === 'outTransporter-Flag4' ||
      creep.memory.role === 'outTransporter-Flag5'
    ) {
      var transFlagPos = creep.name.split('-');
      roleOutTransporter(creep, transFlagPos[1]);
    }
    if (
      creep.memory.role === 'solider-Flag2' ||
      creep.memory.role === 'solider-Flag3' ||
      creep.memory.role === 'solider-Flag4' ||
      creep.memory.role === 'solider-Flag5' ||
      creep.memory.role === 'solider-Flag6'
    ) {
      var soliderFlagPos = creep.name.split('-');
      roleSolider(creep, soliderFlagPos[1]);
    }
    if (creep.memory.role === 'engineer') {
      roleEngineer(creep);
    }
    if (creep.memory.role === 'attactSolider') {
      roleAttact(creep);
    }
    // spawn2
    if (creep.memory.role === 'transporter-spawn2') {
      var transspawn = creep.name.split('-');
      roleTransporter(creep, transspawn[1]);
    }
    if (creep.memory.role === 'upgrader-spawn2') {
      var upgradspawn = creep.name.split('-');
      roleUpgrader(creep, upgradspawn[1]);
    }
    if (creep.memory.role === 'dig-spawn2-1' || creep.memory.role === 'dig-spawn2-2') {
      var creepType2 = creep.name.split('-');
      if (creepType2[2] === '1') {
        roleDig(creep, '59f1a35b82100e1594f3b6c0');
      } else if (creepType2[2] === '2') {
        roleDig(creep, '59f1a35b82100e1594f3b6bf');
      }
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
