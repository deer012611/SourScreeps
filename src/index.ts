import { ErrorMapper } from './utils/ErrorMapper';
import {
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
import { roleBirth } from './function/birth';
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
  // 清理缓存
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }
  Root();

  // 生产creeps
  var birthcreep = [
    {
      creepName: 'transporter',
      creepNum: 3,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
      ]
    },
    {
      creepName: 'dig-1',
      creepNum: 1,
      creepProperty: [
        [WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE]
      ]
    },
    {
      creepName: 'dig-2',
      creepNum: 1,
      creepProperty: [
        [WORK, WORK, CARRY, MOVE],
        [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]
      ]
    },
    {
      creepName: 'upgrader',
      creepNum: 4,
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
    },
    {
      creepName: 'builder',
      creepNum: 2,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
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
      creepNum: 1,
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
      creepNum: 2,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE],
        [
          WORK,
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
          CARRY,
          MOVE,
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
      creepNum: 2,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
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
        [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
        [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
      ]
    },
    {
      creepName: 'solider-Flag2',
      creepNum: 1,
      creepProperty: [[MOVE, MOVE, CLAIM, CLAIM], [MOVE, MOVE, CLAIM, CLAIM]]
    },
    {
      creepName: 'solider-Flag3',
      creepNum: 0,
      creepProperty: [
        [WORK, CARRY, CARRY, MOVE, MOVE, CLAIM],
        [WORK, CARRY, CARRY, MOVE, MOVE, CLAIM]
      ]
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
      creepName: 'upgrader-Flag3',
      creepNum: 2,
      creepProperty: [
        [WORK, CARRY, MOVE],
        // [WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
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
  var birthcreep2 = [
    {
      creepName: 'transporter-spawn2',
      creepNum: 1,
      creepProperty: [
        [WORK, CARRY, MOVE],
        [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        [WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
      ]
    },
    {
      creepName: 'dig-spawn2-1',
      creepNum: 2,
      creepProperty: [
        [WORK, WORK, CARRY, MOVE],
        [WORK, WORK, WORK, WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]
      ]
    }
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
  ];
  roleBirth('Spawn1', birthcreep);
  roleBirth('Spawn2', birthcreep2);

  // Link
  // const linkFromWall = Game.getObjectById('5ad43d23ad602d2f8786d4fe');
  const linkFromSource = Game.getObjectById('5adea4dbcd89a7456f1b0ee6');

  var linkTo = Game.getObjectById('5adeada83064b30ef970b24d');
  if (linkFromSource) {
    // if (linkFromWall.energy === linkFromWall.energyCapacity && linkTo.energy === 0) {
    //   linkFromWall.transferEnergy(linkTo, 800);
    // }
    if (linkFromSource.energy === linkFromSource.energyCapacity && linkTo.energy === 0) {
      linkFromSource.transferEnergy(linkTo, 800);
    }
  }

  // 防御塔
  var tower1 = Game.getObjectById('5ad97283beafc0400a8f0048');
  var tower2 = Game.getObjectById('5adee3200409f23c73cecb24');

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
  // var attactcreep = Game.spawns['E9N44'].room.find(FIND_HOSTILE_CREEPS);
  // console.log('E9N44' + attactcreep);
  for (name in Game.creeps) {
    var creep = Game.creeps[name];
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
    if (creep.memory.role === 'upgrader' || creep.memory.role === 'upgrader-Flag3') {
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
    if (creep.memory.role === 'dig-spawn2-1') {
      var creepType2 = creep.name.split('-');
      if (creepType2[2] === '1') {
        roleDig(creep, '59f1a39482100e1594f3bbea');
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
