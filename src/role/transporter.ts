import { fixNearby } from '../function/function';
export const roleTransporter = (creep: Creep, myspawn) => {
  var transporting = false;
  creep.memory.transporting = transporting;
  // memory
  // if (myspawn === 'spawn2') {
  //   if (
  //     !creep.memory.transporting &&
  //     creep.carry.energy >= 0 &&
  //     creep.carry.energy < creep.carryCapacity
  //   ) {
  //     creep.memory.transporting = true;
  //     creep.say('🔄');
  //   }
  // }
  if (!creep.memory.transporting && creep.carry.energy === 0) {
    creep.memory.transporting = true;
    creep.say('🔄');
  }
  // else if (!creep.memory.transporting && creep.carry.energy === 0) {
  //   creep.memory.transporting = true;
  //   creep.say('🔄');
  // }
  if (creep.memory.transporting && creep.carry.energy === creep.carryCapacity) {
    creep.memory.transporting = false;
    creep.say('⚡');
  }
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
  var sources = creep.room.sources;
  var targetsdrop = creep.room.cacheFind(FIND_DROPPED_RESOURCES);
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
      i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] < i.storeCapacity * 0.6
  });
  // function harvest() {
  const harvest = (creep: Creep) => {
    if (targetLink[0] !== undefined && targetLink[0].energy > 0) {
      // console.log(1);
      if (creep.withdraw(targetLink[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.travelTo(targetLink[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        creep.say('Link');
      }
    } else if (targetsdrop.length > 0) {
      // console.log(2);
      if (targetsdrop[0].amount > creep.carryCapacity) {
        creep.travelTo(targetsdrop[0]);
        creep.pickup(targetsdrop[0], { visualizePathStyle: { stroke: '#ffffff' } });
        creep.say('😃');
      }
    } else if (targetCONTAINER) {
      // console.log(3);
      if (creep.withdraw(targetCONTAINER, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.travelTo(targetCONTAINER, { visualizePathStyle: { stroke: '#ffaa00' } });
        creep.say('😍');
      }
    } else if (sources) {
      // console.log(4);
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
      } else {
        // console.log(6);
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
          creep.travelTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
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

  // ----
  if (creep.memory.transporting) {
    harvest(creep);
  } else {
    // if (targetLink[1] && targetLink[2]) {
    //   if (targetLink[1].energy === 800 && targetLink[2].energy === 800) {
    //     if (creep.transfer(targetSTORAGE, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    //       creep.travelTo(targetSTORAGE, { visualizePathStyle: { stroke: '#ffffff' } });
    //     }
    //   }
    // } else {
    // fixNearby(creep);
    fixNearby(creep);
    transport(creep);
    // }
  }
};
