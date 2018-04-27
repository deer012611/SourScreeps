export const roleEngineer = (creep: Creep) => {
  // memory
  var engineering = false;
  creep.memory.engineering = engineering;

  if (!creep.memory.engineering && creep.carry.energy === 0) {
    creep.memory.engineering = true;
    creep.say('🔄');
  }
  if (creep.memory.engineering && creep.carry.energy === creep.carryCapacity) {
    creep.memory.engineering = false;
    creep.say('⚡');
  }

  //
  // 检查维修
  // 修战壕
  var closestBadRampart = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure => structure.hits < 5000 && structure.structureType === 'rampart'
  });
  var closestRampart = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure => structure.hits < 20000 && structure.structureType === 'rampart'
  });
  // 修除了路和城墙以外的
  var closestOtherDamagedStructure = creep.room.cacheFind(FIND_STRUCTURES, {
    filter: structure =>
      structure.hits < structure.hitsMax &&
      structure.structureType !== 'constructedWall' &&
      structure.structureType !== 'road'
  });
  // 修城墙
  var closestWallDamagedStructure = creep.room.cacheFind(FIND_STRUCTURES, {
    filter: structure =>
      structure.hits < structure.hitsMax && structure.structureType === 'constructedWall'
  });
  var sources = creep.room.cacheFind(FIND_SOURCES);
  // 修路
  var closestRoad = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure =>
      structure.hits < structure.hitsMax * 0.7 && structure.structureType === 'road'
  });
  // 修油桶
  var closestContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure =>
      structure.hits < structure.hitsMax * 0.5 && structure.structureType === 'container'
  });

  // function repaire() {
  const repaire = (creep: Creep) => {
    // ----
    if (closestContainer) {
      if (creep.repair(closestContainer) === ERR_NOT_IN_RANGE) {
        creep.travelTo(closestContainer, {
          visualizePathStyle: { stroke: '#00ff00' }
        });
        creep.say('🛠️' + closestContainer.structureType);
      }
    } else if (closestBadRampart) {
      if (creep.repair(closestBadRampart) === ERR_NOT_IN_RANGE) {
        creep.travelTo(closestBadRampart, {
          visualizePathStyle: { stroke: '#00ff00' }
        });
        creep.say('🛠️' + closestBadRampart.structureType);
      }
    } else if (closestRampart) {
      if (creep.repair(closestRampart) === ERR_NOT_IN_RANGE) {
        creep.travelTo(closestRampart, {
          visualizePathStyle: { stroke: '#00ff00' }
        });
        creep.say('🔧');
      }
    } else if (closestOtherDamagedStructure !== undefined) {
      if (creep.repair(closestOtherDamagedStructure[0]) === ERR_NOT_IN_RANGE) {
        creep.travelTo(closestOtherDamagedStructure[0], {
          visualizePathStyle: { stroke: '#00ff00' }
        });
        creep.say('🔧');
      }
    } else if (closestRoad !== undefined) {
      if (creep.repair(closestRoad) === ERR_NOT_IN_RANGE) {
        creep.travelTo(closestRoad, {
          visualizePathStyle: { stroke: '#00ff00' }
        });
        creep.say('🔧');
      }
    } else if (closestWallDamagedStructure !== undefined && closestWallDamagedStructure !== '') {
      if (creep.repair(closestWallDamagedStructure) === ERR_NOT_IN_RANGE) {
        creep.travelTo(closestWallDamagedStructure, { visualizePathStyle: { stroke: '#00ff00' } });
        creep.say('🔧');
      }
    } else {
      console.log('engineer is nothing to repaire');
    }
  };

  // function harvest() {
  const harvest = (creep: Creep) => {
    // 如果container里边有能量->container
    var containersWithEnergy = creep.room.cacheFind(FIND_STRUCTURES, {
      filter: i => i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
    });
    var targetsdrop = creep.room.cacheFind(FIND_DROPPED_RESOURCES, {
      filter: i => i.amount > creep.carryCapacity
    });
    // if (containersWithEnergy) {
    //   console.log(22);
    //   if (creep.withdraw(containersWithEnergy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    //     creep.travelTo(containersWithEnergy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
    //   }
    // } else
    if (targetsdrop.length) {
      creep.travelTo(targetsdrop[0]);
      creep.pickup(targetsdrop[0], { visualizePathStyle: { stroke: '#ffffff' } });
      creep.say('😃');
    } else {
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.travelTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  };

  // ----
  // ----

  if (creep.memory.engineering) {
    harvest(creep);
  } else {
    repaire(creep);
  }
};
