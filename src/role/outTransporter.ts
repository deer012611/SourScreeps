export const roleOutTransporter = (creep: Creep, flag: string) => {
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
  //
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

  var targetsContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure => {
      return (
        (structure.structureType === STRUCTURE_SPAWN ||
          structure.structureType === STRUCTURE_EXTENSION) &&
        structure.energy < structure.energyCapacity
      );
    }
  });

  function goout() {
    if (Game.flags[flag].room === undefined) {
      creep.moveTo(Game.flags[flag]);
    } else {
      var _toRoom = Game.flags[flag].room.name;
      //
      if (creep.room.name !== _toRoom) {
        creep.moveTo(Game.flags[flag], { visualizePathStyle: { stroke: '#ffaa00' } });
        // const exitDir = Game.map.findExit(creep.room.name, _toRoom);
        // const exitToAnotherRoom = creep.pos.findClosestByRange(exitDir);
        // creep.moveTo(exitToAnotherRoom, { visualizePathStyle: { stroke: '#ffaa00' } });
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
          if (sources) {
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
              creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
          }
        }
      }
    }
  }
  const gohome = (creep: Creep) => {
    if (creep.room.name !== 'E8N44') {
      creep.moveTo(Game.flags['Flag1']);
      // 回家
      // const exitDir2 = Game.map.findExit(Game.flags[flag].room.name, 'E8N44');
      // const exitToMyRoom = creep.pos.findClosestByRange(exitDir2);
      // creep.moveTo(exitToMyRoom, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else {
      if (flag === 'Flag3' || flag === 'Flag4') {
        var targetLink = Game.getObjectById('5ac212ecac37e47fd05a46a3');
        if (creep.transfer(targetLink, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targetLink, { visualizePathStyle: { stroke: '#ffffff' } });
        }
      } else {
        if (targetsContainer) {
          if (creep.transfer(targetsContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targetsContainer, { visualizePathStyle: { stroke: '#ffffff' } });
          }
        } else if (targets.length > 0) {
          if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
          }
        }
      }
    }
  };

  // ----
  if (creep.memory.transporting) {
    goout(creep);
  } else {
    gohome(creep);
  }
};
