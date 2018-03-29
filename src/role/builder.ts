export const roleBuilder = (creep: Creep) => {
  // 建造目标
  var targets;
  var targetsRoad = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
    filter: structure => {
      return structure.structureType === 'road';
    }
  });
  var targetsOther = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
    filter: structure => {
      return structure.structureType !== 'road' && structure.structureType !== 'constructionSite';
    }
  });
  if (targetsOther) {
    targets = targetsOther;
  } else {
    targets = targetsRoad;
  }
  // 建造、修理战壕
  var buildRampart = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
    filter: structure => {
      return structure.structureType === 'rampart';
    }
  });
  var closestBadRampart = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure => structure.hits < 1000 && structure.structureType === 'rampart'
  });
  var closestRampart = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      structure.hits < structure.hitsMax * 0.2 && structure.structureType === 'rampart'
  });
  var fixtargets = '';
  if (closestBadRampart) {
    fixtargets = closestBadRampart;
  } else if (closestRampart) {
    fixtargets = closestRampart;
  }
  //
  var sources = creep.pos.findClosestByPath(FIND_SOURCES, {
    filter: structure => {
      return structure.energy > 0;
    }
  });
  var targetsdrop = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
  var containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
    filter: i => i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
  });
  var closestOtherDamagedStructure = creep.room.find(FIND_STRUCTURES, {
    filter: structure =>
      structure.hits < structure.hitsMax &&
      structure.structureType !== 'constructedWall' &&
      structure.structureType !== 'road'
  });
  var closestWallDamagedStructure = creep.room.find(FIND_STRUCTURES, {
    filter: structure =>
      structure.hits < structure.hitsMax && structure.structureType === 'constructedWall'
  });
  function goout() {
    if (creep.room.name !== 'E9N44') {
      const exitDir = Game.map.findExit('E8N44', 'E9N44');
      const exitToAnotherRoom = creep.pos.findClosestByRange(exitDir);
      creep.moveTo(exitToAnotherRoom, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else {
      if (targetsdrop) {
        if (creep.carry.energy > 0) {
          build();
        } else {
          harvest();
        }
      } else {
        if (creep.carry.energy < creep.carryCapacity) {
          harvest();
        } else {
          build();
        }
      }
      //
      // if (creep.carry.energy < creep.carryCapacity) {
      //   harvest();
      // } else {
      //   if (targets) {
      //     console.log(targets);
      //     if (creep.build(targets) === ERR_NOT_IN_RANGE) {
      //       creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
      //     }
      //   }
      // }

      // var sources = creep.room.find(FIND_SOURCES);
      // if (sources[0].energy > 0) {
      //   if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      //     creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      //   }
      // }
    }
  }
  // 其他屋子建造
  if (creep.id === '5abcbc3d7efca011e9417bb4') {
    goout();
    // if (creep.carry.energy < creep.carryCapacity) {
    //   harvest();
    // } else {
    //   build();
    // }
  } else {
    // 我的屋子建造
    if (containersWithEnergy) {
      if (creep.carry.energy > 0) {
        build();
      } else {
        harvest();
      }
    } else {
      if (creep.carry.energy < creep.carryCapacity) {
        harvest();
      } else {
        build();
      }
    }
  }

  function build() {
    if (buildRampart) {
      if (creep.build(buildRampart) === ERR_NOT_IN_RANGE) {
        creep.moveTo(buildRampart, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else if (targets) {
      console.log(targets);
      if (creep.build(targets) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else if (fixtargets) {
      if (creep.repair(fixtargets) === ERR_NOT_IN_RANGE) {
        creep.moveTo(fixtargets, {
          visualizePathStyle: { stroke: '#00ff00' }
        });
        creep.say('🔧');
      }
    } else {
      console.log('nothing to build -> fix');
      if (closestOtherDamagedStructure) {
        if (creep.repair(closestOtherDamagedStructure[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(closestOtherDamagedStructure[0], {
            visualizePathStyle: { stroke: '#00ff00' }
          });
          creep.say('🔧');
        }
      } else if (closestWallDamagedStructure) {
        if (creep.repair(closestWallDamagedStructure[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(closestWallDamagedStructure[0], {
            visualizePathStyle: { stroke: '#00ff00' }
          });
          creep.say('🔧');
        }
      } else {
        console.log('nothing to build or fix -> harvest');
        if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
          creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }
    }
  }

  function harvest() {
    if (creep.carry.energy < creep.carryCapacity) {
      // 如果container里边有能量->container
      if (containersWithEnergy[0] !== undefined) {
        console.log(containersWithEnergy[0]);
        if (creep.withdraw(containersWithEnergy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(containersWithEnergy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      } else if (targetsdrop) {
        creep.moveTo(targetsdrop);
        creep.pickup(targetsdrop, { visualizePathStyle: { stroke: '#ffffff' } });
        creep.say('😃');
      } else {
        if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
          creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }
    }
  }
};
