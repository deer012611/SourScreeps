export const roleUpgrader = (creep: Creep) => {
  var containersWithEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: i => i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
  });
  var targetsdrop = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
  var targetLink = Game.getObjectById('5ac2082a8f54c347c5c42679');
  if (creep.memory.upgrading && creep.carry.energy === 0) {
    creep.memory.upgrading = false;
    creep.say('🔄 harvest');
  }
  if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
    creep.memory.upgrading = true;
    creep.say('⚡ upgrade');
  }

  var targetSTORAGE = creep.room.storage;
  // 将稀有金属运送到storage
  // if (targetsSTORAGE.length > 0 ) {
  //   if (creep.transfer(targetsSTORAGE[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
  //     creep.travelTo(targetsSTORAGE[0], { visualizePathStyle: { stroke: '#ffffff' } });
  //   } else if (creep.transfer(targetsSTORAGE[0], RESOURCE_GHODIUM_OXIDE) === ERR_NOT_IN_RANGE) {
  //     creep.travelTo(targetsSTORAGE[0], { visualizePathStyle: { stroke: '#ffffff' } });
  //   }
  // }
  // if (targetSTORAGE.energy > targetSTORAGE.energyCapacity * 0.4)
  if (creep.memory.upgrading) {
    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.travelTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
    }
  } else {
    if (containersWithEnergy) {
      // 如果container里边有能量->container
      if (creep.withdraw(containersWithEnergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.travelTo(containersWithEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    } else if (targetLink.energy > 0) {
      if (creep.withdraw(targetLink, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.travelTo(targetLink, { visualizePathStyle: { stroke: '#ffaa00' } });
        creep.say('Link');
      }
    } else if (targetSTORAGE) {
      if (creep.withdraw(targetSTORAGE, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.travelTo(targetSTORAGE, { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
    // else {
    //    else if (targetSTORAGE.energy > targetSTORAGE.energyCapacity * 0.4) {
    //     if (creep.withdraw(targetSTORAGE, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    //       creep.travelTo(targetSTORAGE, { visualizePathStyle: { stroke: '#ffaa00' } });
    //     }
    //   } else if (targetsdrop) {
    //     creep.travelTo(targetsdrop);
    //     creep.pickup(targetsdrop, { visualizePathStyle: { stroke: '#ffffff' } });
    //     creep.say('😃');
    //   } else {
    //     var sources = creep.room.cacheFind(FIND_SOURCES);
    //     if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
    //       creep.travelTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
    //     }
    //   }
    // }
  }
};
