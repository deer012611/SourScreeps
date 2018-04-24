export const roleUpgrader = (creep: Creep, flag: string) => {
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
  var sources = creep.room.sources;

  const upgrade = (creep: Creep) => {
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
      } else if (targetSTORAGE) {
        // else if (targetLink.energy > 0) {
        //   if (creep.withdraw(targetLink, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        //     creep.travelTo(targetLink, { visualizePathStyle: { stroke: '#ffaa00' } });
        //     creep.say('Link');
        //   }
        // }
        if (creep.withdraw(targetSTORAGE, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.travelTo(targetSTORAGE, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      } else {
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
          creep.travelTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }
    }
  };
  if (Game.flags[flag] === undefined) {
    upgrade(creep);
  } else {
    if (Game.flags[flag].room === undefined) {
      creep.travelTo(Game.flags[flag]);
    } else {
      var toRoom = Game.flags[flag].room.name;
      if (creep.room.name !== toRoom) {
        creep.travelTo(Game.flags[flag]);
      } else {
        // 将稀有金属运送到storage
        var tombstone = creep.room.cacheFind(FIND_TOMBSTONES);
        console.log(tombstone);
        if (tombstone[0]) {
          creep.travelTo(tombstone[0], { visualizePathStyle: { stroke: '#ff6c3d' } });
        } else {
          // if (targetSTORAGE.length > 0) {
          //   if (creep.transfer(targetSTORAGE[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          //     creep.travelTo(targetSTORAGE[0], { visualizePathStyle: { stroke: '#ffffff' } });
          //   } else if (creep.transfer(targetSTORAGE[0], RESOURCE_GHODIUM_OXIDE) === ERR_NOT_IN_RANGE) {
          //     creep.travelTo(targetSTORAGE[0], { visualizePathStyle: { stroke: '#ffffff' } });
          //   }
          // }
          // if (targetSTORAGE.energy > targetSTORAGE.energyCapacity * 0.4)
          upgrade(creep);
        }
      }
    }
  }
};
