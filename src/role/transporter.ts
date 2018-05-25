import { fixNearby } from '../function/function';
export const roleTransporter = (creep: Creep, myspawn) => {
  // 定义
  var targetLink = creep.room.links;
  var targetSTORAGE = creep.room.storage;
  var targetCONTAINER = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure => {
      return (
        structure.structureType === STRUCTURE_CONTAINER &&
        structure.id !== '5ac9b2af23774a6d4a9eaf4f' &&
        structure.store[RESOURCE_ENERGY] > creep.carryCapacity
      );
    }
  });
  var sources = creep.room.cacheFind(FIND_SOURCES, {
    filter: i => i.energy > 0
  });
  var targetsdrop = creep.room.cacheFind(FIND_DROPPED_RESOURCES, {
    filter: i => i.amount > creep.carryCapacity
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
  var targetTower = creep.room.cacheFind(FIND_STRUCTURES, {
    filter: structure => {
      return (
        structure.structureType === STRUCTURE_TOWER && structure.energy < structure.energyCapacity
      );
    }
  });

  var containersNoEnergy = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: i =>
      i.structureType === STRUCTURE_CONTAINER &&
      i.store[RESOURCE_ENERGY] < i.storeCapacity * 0.6 &&
      i.id !== '5aca5db82657b65071649939' &&
      i.id !== '5ac99e7dffa8cb395229aa64'
  });
  // function harvest() {
  const harvest = (creep: Creep) => {
    if (targetSTORAGE && targetSTORAGE.store[RESOURCE_ENERGY] > 0) {
      if (creep.withdraw(targetSTORAGE, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.travelTo(targetSTORAGE, { visualizePathStyle: { stroke: '#ffaa00' } });
        creep.say('😍');
      }
    } else if (targetLink[1] !== undefined && targetLink[1].energy > 0) {
      // console.log(creep.name, 1);
      if (creep.withdraw(targetLink[1], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.travelTo(targetLink[1], { visualizePathStyle: { stroke: '#ffaa00' } });
        creep.say('Link');
      }
    } else if (targetsdrop[0]) {
      creep.travelTo(targetsdrop[0]);
      creep.pickup(targetsdrop[0], { visualizePathStyle: { stroke: '#ffffff' } });
      creep.say('😃');
    } else if (targetCONTAINER) {
      // console.log(creep.name, 3);
      // console.log(creep.name, targetCONTAINER);
      if (creep.withdraw(targetCONTAINER, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.travelTo(targetCONTAINER, { visualizePathStyle: { stroke: '#ffaa00' } });
        creep.say('😍');
      }
    } else {
      // console.log(4, sources[0]);
      // else if (targetSTORAGE) {
      //   if (creep.withdraw(targetSTORAGE, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      //     creep.travelTo(targetSTORAGE, { visualizePathStyle: { stroke: '#ffaa00' } });
      //     creep.say('😍');
      //   }
      // }
      //
      // else
      // if (storageWithEnergy) {
      //   if (creep.withdraw(storageWithEnergy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      //     creep.travelTo(storageWithEnergy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      //     creep.say('😍');
      //   }
      // } else if (creep.memory.source) {
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        // console.log(5);
        creep.travelTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
      // }
    }
  };

  // function transport() {
  const transport = (creep: Creep) => {
    if (targets) {
      if (creep.transfer(targets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.travelTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else if (containersNoEnergy) {
      if (creep.transfer(containersNoEnergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.travelTo(containersNoEnergy, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else if (targetTower.length > 0) {
      if (creep.transfer(targetTower[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.travelTo(targetTower[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else if (sources[0]) {
      if (creep.transfer(sources[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.travelTo(sources[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else {
      // else
      // else if (targetsTower.length > 0) {
      //   if (creep.transfer(targetsTower[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      //     creep.travelTo(targetsTower[0], { visualizePathStyle: { stroke: '#ffffff' } });
      //   }
      // }
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.travelTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
  };

  var transporting = false;
  creep.memory.transporting = transporting;
  // memory
  if (!targetLink[1] && !targetsdrop[0] && !targetCONTAINER) {
    if (
      !creep.memory.transporting &&
      creep.carry.energy >= 0 &&
      creep.carry.energy < creep.carryCapacity
    ) {
      creep.memory.transporting = true;
      creep.say('🔄');
    }
  } else {
    if (!creep.memory.transporting && creep.carry.energy === 0) {
      creep.memory.transporting = true;
      creep.say('🔄');
    }
  }
  // else if (!creep.memory.transporting && creep.carry.energy === 0) {
  //   creep.memory.transporting = true;
  //   creep.say('🔄');
  // }
  if (creep.memory.transporting && creep.carry.energy === creep.carryCapacity) {
    creep.memory.transporting = false;
    creep.say('⚡');
  }

  // ----
  if (creep.memory.transporting) {
    if (targetLink[1] && targetLink[1].energy > 0) {
      if (creep.withdraw(targetLink[1], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.travelTo(targetLink[1]);
      }
    } else {
      harvest(creep);
    }
  } else {
    if (
      targetLink[1] &&
      targetLink[1].energy > 0 &&
      targetSTORAGE.store[RESOURCE_ENERGY] !== targetSTORAGE.storeCapacity
    ) {
      if (creep.transfer(targetSTORAGE, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.travelTo(targetSTORAGE);
      }
    } else {
      // fixNearby(creep);
      if (targetLink[1] || targetsdrop[0] || targetCONTAINER) {
        fixNearby(creep);
      }
      transport(creep);
    }
  }
};
