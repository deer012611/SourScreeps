export const roleBuilder = (creep: Creep, flag: string) => {
  var transporting = false;
  // memory
  if (!creep.memory.transporting && creep.carry.energy === 0) {
    creep.memory.transporting = true;
    creep.say('🔄');
  }
  if (creep.memory.transporting && creep.carry.energy === creep.carryCapacity) {
    creep.memory.transporting = false;
    creep.say('⚡');
  }
  // 建造目标
  var targets;
  var targetsRoad = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {
    filter: structure => {
      return structure.structureType === 'road';
    }
  });
  var targetsOther = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {
    filter: structure => {
      return (
        structure.structureType !== 'road' &&
        structure.structureType !== 'constructionSite' &&
        structure.structureType !== 'constructedWall'
      );
    }
  });
  var targetsWall = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {
    filter: structure => {
      return structure.structureType === 'constructedWall';
    }
  });
  if (targetsOther) {
    targets = targetsOther;
  } else if (targetsRoad) {
    targets = targetsRoad;
  } else {
    targets = targetsWall;
  }
  // 建造、修理战壕
  var buildRampart = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {
    filter: structure => {
      return structure.structureType === 'rampart' || structure.hits === 1;
    }
  });
  var closestBadRampart = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: structure => structure.hits < 5000 && structure.structureType === 'rampart'
  });
  var closestRampart = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: structure => structure.hits < 10000 && structure.structureType === 'rampart'
  });
  var strengthenRampart = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: structure =>
      structure.hits < structure.hitsMax * 0.5 && structure.structureType === 'rampart'
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
  var targetsdrop = creep.room.cacheFind(FIND_DROPPED_RESOURCES, {
    filter: i => i.amount > creep.carryCapacity
  });
  var containersWithEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: i =>
      i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > creep.carryCapacity
  });
  var closestOtherDamagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: structure =>
      structure.hits < structure.hitsMax &&
      structure.structureType !== 'constructedWall' &&
      structure.structureType !== 'road'
  });
  var closestWallDamagedStructure = creep.room.cacheFind(FIND_STRUCTURES, {
    filter: structure =>
      structure.hits < structure.hitsMax && structure.structureType === 'constructedWall'
  });

  const build = (creep: Creep) => {
    var targetTower = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure => {
        return (
          structure.structureType === STRUCTURE_TOWER &&
          structure.energy < structure.energyCapacity * 0.6
        );
      }
    });
    if (targetTower) {
      if (creep.transfer(targetTower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.travelTo(targetTower, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else if (buildRampart) {
      if (creep.build(buildRampart) === ERR_NOT_IN_RANGE) {
        creep.travelTo(buildRampart, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else if (targets) {
      if (creep.build(targets) === ERR_NOT_IN_RANGE) {
        creep.travelTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else if (fixtargets) {
      if (creep.repair(fixtargets) === ERR_NOT_IN_RANGE) {
        creep.travelTo(fixtargets, {
          visualizePathStyle: { stroke: '#00ff00' }
        });
        creep.say('🔧');
      }
    } else {
      console.log('nothing to build -> fix');
      if (closestOtherDamagedStructure) {
        if (creep.repair(closestOtherDamagedStructure) === ERR_NOT_IN_RANGE) {
          creep.travelTo(closestOtherDamagedStructure, {
            visualizePathStyle: { stroke: '#00ff00' }
          });
          creep.say('🔧');
        }
      } else if (strengthenRampart) {
        if (creep.repair(strengthenRampart) === ERR_NOT_IN_RANGE) {
          creep.travelTo(strengthenRampart, {
            visualizePathStyle: { stroke: '#00ff00' }
          });
          creep.say('🔧');
        }
      } else if (closestWallDamagedStructure) {
        if (creep.repair(closestWallDamagedStructure[0]) === ERR_NOT_IN_RANGE) {
          creep.travelTo(closestWallDamagedStructure[0], {
            visualizePathStyle: { stroke: '#00ff00' }
          });
          creep.say('🔧');
        }
      } else {
        console.log('nothing to build or fix -> harvest');
        if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
          creep.travelTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }
    }
  };

  const harvest = (creep: Creep) => {
    if (creep.carry.energy < creep.carryCapacity) {
      if (targetsdrop.length) {
        creep.travelTo(targetsdrop[0]);
        creep.pickup(targetsdrop[0], { visualizePathStyle: { stroke: '#ffffff' } });
        creep.say('😃');
      } else if (containersWithEnergy) {
        // 如果container里边有能量->container
        if (creep.withdraw(containersWithEnergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.travelTo(containersWithEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      } else {
        if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
          creep.travelTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }
    }
  };

  const goout = (creep: Creep, flag: string) => {
    if (Game.flags[flag].room === undefined) {
      creep.travelTo(Game.flags[flag]);
    } else {
      var toRoom = Game.flags[flag].room.name;
      if (creep.room.name !== toRoom) {
        creep.travelTo(Game.flags[flag]);
      } else {
        if (creep.memory.transporting) {
          harvest(creep);
        } else {
          build(creep);
        }
        // if (targetsdrop) {
        //   if (creep.carry.energy > 0) {
        //     build(creep);
        //   } else {
        //     harvest(creep);
        //   }
        // } else {
        //   if (creep.carry.energy < creep.carryCapacity) {
        //     harvest(creep);
        //   } else {
        //     build(creep);
        //   }
        // }
      }
    }
  };

  // 其他屋子建造
  if (flag !== undefined) {
    goout(creep, flag);
  } else {
    // 我的屋子建造
    // if (containersWithEnergy) {
    //   if (creep.carry.energy > 0) {
    //     build(creep);
    //   } else {
    //     harvest(creep);
    //   }
    // } else {
    //   if (creep.carry.energy < creep.carryCapacity) {
    //     harvest(creep);
    //   } else {
    //     build(creep);
    //   }
    // }
    if (creep.memory.transporting) {
      harvest(creep);
    } else {
      build(creep);
      // }
    }
  }
};
