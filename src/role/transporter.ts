export const roleTransporter = (creep: Creep) => {
  var tombstoneTarget = creep.room.find(FIND_TOMBSTONES);
  if (creep.carry.energy < creep.carryCapacity) {
    var carryTotal = creep.carryCapacity;
    var targetsdrop = creep.room.find(FIND_DROPPED_RESOURCES, {
      filter: i => i.amount > carryTotal
    });
    var containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
      filter: i =>
        i.structureType === STRUCTURE_CONTAINER &&
        i.store[RESOURCE_ENERGY] > carryTotal &&
        (i.id === '5ab72c0441601c4096a94ad8' || i.id === '5ab6bf48458f8a49cb1d16e6')
    });
    if (tombstoneTarget.length) {
      console.log('☠️' + tombstoneTarget);
      creep.moveTo(tombstoneTarget[0]);
      creep.pickup(tombstoneTarget[0], { visualizePathStyle: { stroke: '#ffffff' } });
    } else if (targetsdrop.length) {
      creep.moveTo(targetsdrop[0]);
      creep.pickup(targetsdrop[0], { visualizePathStyle: { stroke: '#ffffff' } });
      creep.say('😃');
    } else {
      // else if (containersWithEnergy !== undefined) {
      //   console.log(3);
      //   if (creep.withdraw(containersWithEnergy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      //     creep.moveTo(containersWithEnergy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      //     creep.say('😍');
      //   }
      // }
      var sources = creep.room.find(FIND_SOURCES);
      if (sources[0].energy > 0) {
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }
    }
  } else {
    var targets = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_EXTENSION) &&
          structure.energy < structure.energyCapacity
        );
      }
    });
    var targetsTower = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          structure.structureType === STRUCTURE_TOWER && structure.energy < structure.energyCapacity
        );
      }
    });
    var containersNoEnergy = creep.room.find(FIND_STRUCTURES, {
      filter: i =>
        i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] < i.storeCapacity
    });
    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else if (targetsTower.length > 0) {
      if (creep.transfer(targetsTower[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetsTower[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else if (containersNoEnergy !== undefined) {
      if (creep.transfer(containersNoEnergy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(containersNoEnergy[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  }
};
