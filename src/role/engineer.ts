export const roleEngineer = (creep: Creep) => {
  if (creep.carry.energy > 0) {
    // 检查维修
    // 修战壕
    var closestBadRampart = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure => structure.hits < 1000 && structure.structureType === 'rampart'
    });
    var closestRampart = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure =>
        structure.hits < structure.hitsMax * 0.2 && structure.structureType === 'rampart'
    });
    // 修除了路和城墙以外的
    var closestOtherDamagedStructure = creep.room.find(FIND_STRUCTURES, {
      filter: structure =>
        structure.hits < structure.hitsMax &&
        structure.structureType !== 'constructedWall' &&
        structure.structureType !== 'road'
    });
    // 修城墙
    var closestWallDamagedStructure = creep.room.find(FIND_STRUCTURES, {
      filter: structure =>
        structure.hits < structure.hitsMax && structure.structureType === 'constructedWall'
    });
    var sources = creep.room.find(FIND_SOURCES);

    // ----
    if (closestBadRampart) {
      if (creep.repair(closestBadRampart[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(closestBadRampart[0], {
          visualizePathStyle: { stroke: '#00ff00' }
        });
        creep.say('🔧');
      }
    } else if (closestRampart) {
      if (creep.repair(closestRampart[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(closestRampart[0], {
          visualizePathStyle: { stroke: '#00ff00' }
        });
        creep.say('🔧');
      }
    } else if (closestOtherDamagedStructure !== undefined) {
      if (creep.repair(closestOtherDamagedStructure[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(closestOtherDamagedStructure[0], {
          visualizePathStyle: { stroke: '#00ff00' }
        });
        creep.say('🔧');
      }
    } else if (closestWallDamagedStructure !== undefined) {
      if (creep.repair(closestWallDamagedStructure[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(closestWallDamagedStructure[0], { visualizePathStyle: { stroke: '#00ff00' } });
        creep.say('🔧');
      }
    } else {
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  } else {
    // 如果container里边有能量->container
    var containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
      filter: i => i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
    });
    if (containersWithEnergy !== undefined) {
      if (creep.withdraw(containersWithEnergy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(containersWithEnergy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    } else {
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  }
};
