export const roleUpgrader = (creep: Creep) => {
  var containersWithEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: i => i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
  });
  if (creep.memory.upgrading && creep.carry.energy === 0) {
    creep.memory.upgrading = false;
    creep.say('🔄 harvest');
  }
  if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
    creep.memory.upgrading = true;
    creep.say('⚡ upgrade');
  }

  if (creep.memory.upgrading) {
    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
    }
  } else {
    // 如果container里边有能量->container
    if (containersWithEnergy !== undefined) {
      if (creep.withdraw(containersWithEnergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(containersWithEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    } else {
      var targets = creep.room.find(FIND_DROPPED_RESOURCES);
      if (targets.length) {
        creep.moveTo(targets[0]);
        creep.pickup(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        creep.say('😃');
      } else if (containersWithEnergy !== undefined) {
        if (creep.withdraw(containersWithEnergy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(containersWithEnergy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
          creep.say('😍');
        }
      } else {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }
    }
  }
};
