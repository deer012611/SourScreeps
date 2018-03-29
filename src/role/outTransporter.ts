export const roleOutTransporter = (creep: Creep) => {
  var targets = creep.room.find(FIND_STRUCTURES, {
    filter: structure => {
      return (
        //   structure.structureType === STRUCTURE_SPAWN ||
        // structure.structureType === STRUCTURE_EXTENSION ||
        structure.structureType === STRUCTURE_STORAGE
      );
    }
  });
  var containersNoEnergy = creep.room.find(FIND_STRUCTURES, {
    filter: i =>
      i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] < i.storeCapacity
  });
  var targetsTower = creep.room.find(FIND_STRUCTURES, {
    filter: structure => {
      return (
        structure.structureType === STRUCTURE_TOWER && structure.energy < structure.energyCapacity
      );
    }
  });

  if (creep.carry.energy < creep.carryCapacity) {
    goout();
  } else {
    gohome();
  }

  function goout() {
    if (creep.room.name !== 'E9N44') {
      const exitDir = Game.map.findExit('E8N44', 'E9N44');
      const exitToAnotherRoom = creep.pos.findClosestByRange(exitDir);
      creep.moveTo(exitToAnotherRoom, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else {
      var targetsdrop = creep.room.find(FIND_DROPPED_RESOURCES, {
        filter: i => i.amount > creep.carryCapacity
      });
      if (targetsdrop.length) {
        creep.moveTo(targetsdrop[0]);
        creep.pickup(targetsdrop[0], { visualizePathStyle: { stroke: '#ffffff' } });
        creep.say('😃');
      } else {
        var sources = creep.room.find(FIND_SOURCES);
        if (sources[0].energy > 0) {
          if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
          }
        }
      }
    }
  }

  function gohome() {
    if (creep.room.name !== 'E8N44') {
      // 回家
      const exitDir2 = Game.map.findExit('E9N44', 'E8N44');
      const exitToMyRoom = creep.pos.findClosestByRange(exitDir2);
      creep.moveTo(exitToMyRoom, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else {
      transport();
    }
  }

  function transport() {
    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
      }
      // } else if (containersNoEnergy !== undefined) {
      //   if (creep.transfer(containersNoEnergy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      //     creep.moveTo(containersNoEnergy[0], { visualizePathStyle: { stroke: '#ffffff' } });
      //   }
      // } else if (targetsTower.length > 0) {
      //   if (creep.transfer(targetsTower[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      //     creep.moveTo(targetsTower[0], { visualizePathStyle: { stroke: '#ffffff' } });
      //   }
    }
  }
};
