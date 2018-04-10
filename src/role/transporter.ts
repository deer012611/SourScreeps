export const roleTransporter = (creep: Creep) => {
  var transporting = false;
  creep.memory.transporting = transporting;
  // memory
  if (!creep.memory.transporting && creep.carry.energy === 0) {
    creep.memory.transporting = true;
    creep.say('🔄');
  }
  if (creep.memory.transporting && creep.carry.energy === creep.carryCapacity) {
    creep.memory.transporting = false;
    creep.say('⚡');
  }
  // Link能量
  var targetLink = Game.getObjectById('5ac2082a8f54c347c5c42679');
  // source内存
  var source = creep.pos.findClosestByRange(FIND_SOURCES);
  creep.memory.source = source;

  // var tombstoneTarget = creep.room.find(FIND_TOMBSTONES);
  var carryTotal = creep.carryCapacity;
  var targetsdrop = creep.room.find(FIND_DROPPED_RESOURCES, {
    filter: i => i.amount > carryTotal
  });
  var storageWithEnergy = creep.room.find(FIND_STRUCTURES, {
    filter: i => i.structureType === STRUCTURE_STORAGE
  });
  var containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
    filter: i =>
      i.structureType === STRUCTURE_CONTAINER &&
      i.store[RESOURCE_ENERGY] > carryTotal &&
      (i.id === '5ab72c0441601c4096a94ad8' || i.id === '5ab6bf48458f8a49cb1d16e6')
  });
  var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure => {
      return (
        (structure.structureType === STRUCTURE_SPAWN ||
          structure.structureType === STRUCTURE_EXTENSION) &&
        structure.energy < structure.energyCapacity
      );
    }
  });
  var targetTower = creep.room.find(FIND_STRUCTURES, {
    filter: structure => {
      return (
        structure.structureType === STRUCTURE_TOWER && structure.energy < structure.energyCapacity
      );
    }
  });
  var targetSTORAGE = creep.room.find(FIND_STRUCTURES, {
    filter: structure => {
      return (
        //   structure.structureType === STRUCTURE_SPAWN ||
        // structure.structureType === STRUCTURE_EXTENSION ||
        structure.structureType === STRUCTURE_STORAGE
      );
    }
  });

  var containersNoEnergy = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: i =>
      i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] < i.storeCapacity * 0.95
  });
  // function harvest() {
  const harvest = (creep: Creep) => {
    // if (tombstoneTarget.length) {
    //   console.log('☠️' + tombstoneTarget);
    //   creep.moveTo(tombstoneTarget[0]);
    //   creep.pickup(tombstoneTarget[0], { visualizePathStyle: { stroke: '#ffffff' } });
    // } else
    // if (storageWithEnergy) {
    //   if (creep.withdraw(storageWithEnergy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    //     creep.moveTo(storageWithEnergy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
    //     creep.say('😍');
    //   }
    // } else
    if (targetLink.energy > 0) {
      if (creep.withdraw(targetLink, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetLink, { visualizePathStyle: { stroke: '#ffaa00' } });
        creep.say('Link');
      }
    } else if (targetsdrop.length) {
      creep.moveTo(targetsdrop[0]);
      creep.pickup(targetsdrop[0], { visualizePathStyle: { stroke: '#ffffff' } });
      creep.say('😃');
    } else {
      // else if (containersWithEnergy !== undefined) {
      //   if (creep.withdraw(containersWithEnergy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      //     creep.moveTo(containersWithEnergy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      //     creep.say('😍');
      //   }
      // }
      // else
      // if (storageWithEnergy) {
      //   if (creep.withdraw(storageWithEnergy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      //     creep.moveTo(storageWithEnergy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      //     creep.say('😍');
      //   }
      // } else if (creep.memory.source) {
      if (creep.harvest(creep.memory.source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.memory.source, { visualizePathStyle: { stroke: '#ffaa00' } });
      }
      // }
    }
  };

  // function transport() {
  const transport = (creep: Creep) => {
    if (targets) {
      if (creep.transfer(targets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else if (targetTower.length > 0) {
      if (creep.transfer(targetTower[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetTower[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else if (containersNoEnergy) {
      console.log(1233);
      if (creep.transfer(containersNoEnergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(containersNoEnergy, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else if (targetSTORAGE.length > 0) {
      if (creep.transfer(targetSTORAGE[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targetSTORAGE[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else {
      // else
      // else if (targetsTower.length > 0) {
      //   if (creep.transfer(targetsTower[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      //     creep.moveTo(targetsTower[0], { visualizePathStyle: { stroke: '#ffffff' } });
      //   }
      // }
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  };

  // ----
  if (creep.memory.transporting) {
    harvest(creep);
  } else {
    transport(creep);
  }
};
