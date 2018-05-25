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
      creepNum: 1,
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
      creepName: 'outDig-Flag2',
      creepNum: 1,
      creepProperty: [
        [WORK, WORK, CARRY, MOVE],
        [WORK, WORK, WORK, CARRY, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
      ]
    },
    {
      creepName: 'outDig-Flag3',
      creepNum: 0,
      creepProperty: [
        [WORK, WORK, CARRY, MOVE],
        [WORK, WORK, WORK, CARRY, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
      ]
    },
    {
      creepName: 'outDig-Flag4',
      creepNum: 1,
      creepProperty: [
        [WORK, WORK, CARRY, MOVE],
        [WORK, WORK, WORK, CARRY, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
      ]
    },
    {
      creepName: 'outDig-Flag5',
      creepNum: 1,
      creepProperty: [
        [WORK, WORK, CARRY, MOVE],
        [WORK, WORK, WORK, CARRY, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
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
      creepName: 'outTransporter-Flag5',
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
      creepNum: 1,
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
      creepNum: 1,
      creepProperty: [[WORK, MOVE, MOVE, CLAIM, CLAIM], [WORK, MOVE, MOVE, CLAIM, CLAIM]]
    },
    {
      creepName: 'solider-Flag5',
      creepNum: 1,
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
    },
    {
      creepName: 'attactSolider',
      creepNum: 0,
      creepProperty: [[WORK, CARRY, MOVE, ATTACK], [WORK, CARRY, MOVE, ATTACK]]
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
      creepNum: 1,
      creepProperty: [
        [WORK, WORK, CARRY, MOVE],
        [WORK, WORK, WORK, WORK, WORK, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]
      ]
    },
    {
      creepName: 'upgrader-spawn2',
      creepNum: 2,
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
      // XX-开采房间-送达房间
      creepName: 'outTransporter-Flag4-Spawn2',
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
      // XX-开采房间-送达房间
      creepName: 'outTransporter-Flag6-Spawn2',
      creepNum: 0,
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
      creepName: 'outDig-Flag6',
      creepNum: 0,
      creepProperty: [
        [WORK, WORK, CARRY, MOVE],
        [WORK, WORK, WORK, CARRY, MOVE],
        [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
      ]
    },
    {
      creepName: 'solider-Flag6',
      creepNum: 0,
      creepProperty: [[WORK, MOVE, MOVE, CLAIM], [WORK, MOVE, MOVE, CLAIM]]
    }
    // {
    //   creepName: 'dig-spawn2-2',
    //   creepNum: 2,
    //   creepProperty: [[WORK, WORK, MOVE], [WORK, WORK, MOVE], [WORK, WORK, MOVE]]
    // },
  ];
  roleBirth('Spawn1', birthcreep);
  roleBirth('Spawn2', birthcreep2);

  // Link
  const linkFromWall = Game.getObjectById('5af0599fd417793950607dd3');
  const linkFromSource = Game.getObjectById('5adea4dbcd89a7456f1b0ee6');

  var linkTo = Game.getObjectById('5adeada83064b30ef970b24d');
  var linkToSource2 = Game.getObjectById('5af7a57ef6b01339a9cb5b97');

  if (linkFromSource) {
    if (linkFromWall.energy === linkFromWall.energyCapacity && linkTo.energy === 0) {
      linkFromWall.transferEnergy(linkTo, 800);
    }
    if (linkFromSource.energy === linkFromSource.energyCapacity && linkTo.energy === 0) {
      linkFromSource.transferEnergy(linkTo, 800);
    }
    if (linkFromSource.energy === linkFromSource.energyCapacity && linkTo.energy === 0) {
      linkFromSource.transferEnergy(linkToSource2, 800);
    }
  }

  // 防御塔
  var tower1 = Game.getObjectById('5ad97283beafc0400a8f0048');
  var tower2 = Game.getObjectById('5adee3200409f23c73cecb24');
  var tower3 = Game.getObjectById('5ae19a847b95733323a78f56');
  var tower4 = Game.getObjectById('5af7ab8f2d04d70cc3c46a6d');

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
  towercontrol(tower3);
  towercontrol(tower4);

  //
  // var attactcreep = Game.spawns['E9N44'].room.find(FIND_HOSTILE_CREEPS);
  // console.log('E9N44' + attactcreep);
  for (name in Game.creeps) {
    var creep = Game.creeps[name];
    //
    if (creep.memory.role.split('-')[0] === 'upgrader') {
      roleUpgrader(creep, creep.name.split('-')[1]);
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
    if (creep.memory.role.split('-')[0] === 'builder') {
      roleBuilder(creep, creep.name.split('-')[1]);
    }
    if (creep.memory.role.split('-')[0] === 'outDig') {
      roleOutDig(creep, creep.name.split('-')[1]);
    }
    if (creep.memory.role.split('-')[0] === 'outTransporter') {
      var transFlagPos = creep.name.split('-');
      roleOutTransporter(creep, transFlagPos[1], transFlagPos[3] ? transFlagPos[2] : 'Spawn1');
    }
    if (creep.memory.role.split('-')[0] === 'solider') {
      roleSolider(creep, creep.name.split('-')[1]);
    }
    if (creep.memory.role === 'engineer') {
      roleEngineer(creep);
    }
    if (creep.memory.role === 'attactSolider') {
      roleAttact(creep, 'Flag2');
    }

    // spawn2
    if (creep.memory.role === 'transporter-spawn2') {
      roleTransporter(creep, creep.name.split('-')[1]);
    }
    if (creep.memory.role === 'upgrader-spawn2') {
      roleUpgrader(creep, creep.name.split('-')[1]);
    }
    if (creep.memory.role === 'dig-spawn2-1') {
      if (creep.name.split('-')[2] === '1') {
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
