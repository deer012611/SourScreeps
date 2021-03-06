import { fixNearby } from '../function/function';
export const roleOutTransporter = (creep: Creep, flag: string, targetroom: string) => {
  var targetsBuild = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {
    filter: structure => {
      return structure.structureType === 'road' || structure.structureType === 'container';
    }
  });
  var transporting = false;
  // if (targetsBuild) {
  //   transporting = false;
  // } else {
  //   transporting = true;
  // }
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
  var targetStorage = creep.room.storage;
  var containersNoEnergy = creep.room.cacheFind(FIND_STRUCTURES, {
    filter: i =>
      i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] < i.storeCapacity
  });
  var targetsTower = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure => {
      return (
        structure.structureType === STRUCTURE_TOWER && structure.energy < structure.energyCapacity
      );
    }
  });
  var targetsLinkNear = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure => {
      return structure.structureType === STRUCTURE_LINK;
    }
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
  var containersWithEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: i =>
      i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > creep.carryCapacity
  });

  function goout(creep) {
    if (Game.flags[flag].room === undefined) {
      creep.travelTo(Game.flags[flag]);
    } else {
      var _toRoom = Game.flags[flag].room.name;
      //
      if (creep.room.name !== _toRoom) {
        creep.travelTo(Game.flags[flag], { visualizePathStyle: { stroke: '#ffaa00' } });
        // const exitDir = Game.map.findExit(creep.room.name, _toRoom);
        // const exitToAnotherRoom = creep.pos.findClosestByRange(exitDir);
        // creep.travelTo(exitToAnotherRoom, { visualizePathStyle: { stroke: '#ffaa00' } });
      } else {
        var targetsdrop = creep.room.cacheFind(FIND_DROPPED_RESOURCES, {
          filter: i => i.amount > creep.carryCapacity
        });
        if (targetsdrop.length) {
          creep.travelTo(targetsdrop[0]);
          creep.pickup(targetsdrop[0], { visualizePathStyle: { stroke: '#ffffff' } });
          creep.say('😃');
        } else if (containersWithEnergy) {
          // 如果container里边有能量->container
          if (creep.withdraw(containersWithEnergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.travelTo(containersWithEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
          }
        } else {
          var sources = creep.room.cacheFind(FIND_SOURCES);
          var _sources = flag === 'Flag6' ? sources[1] : sources[0];
          if (sources) {
            if (creep.harvest(_sources) === ERR_NOT_IN_RANGE) {
              creep.travelTo(_sources, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
          }
        }
      }
    }
  }
  const gohome = (creep: Creep, targetroom: string) => {
    if (creep.room.name !== Game.spawns[targetroom].room.name) {
      creep.travelTo(Game.spawns[targetroom]);
      // 回家
      // const exitDir2 = Game.map.findExit(Game.flags[flag].room.name, 'E8N44');
      // const exitToMyRoom = creep.pos.findClosestByRange(exitDir2);
      // creep.travelTo(exitToMyRoom, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else {
      if (flag === 'Flag1') {
        if (targets) {
          if (creep.transfer(targets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.travelTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
          }
        } else {
          if (creep.transfer(targetStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.travelTo(targetStorage, { visualizePathStyle: { stroke: '#ffffff' } });
          }
        }
      } else if (flag === 'Flag2') {
        if (creep.transfer(targetsLinkNear, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.travelTo(targetsLinkNear, { visualizePathStyle: { stroke: '#ffffff' } });
        }
      } else if (flag !== 'Flag2' && flag !== 'Flag1') {
        var targetLinkSource = creep.room.links;
        // var targetLinkWall = Game.getObjectById('5ad43d23ad602d2f8786d4fe');
        // var targetLinkSource = Game.getObjectById('5adea4dbcd89a7456f1b0ee6');
        if (targetLinkSource[1]) {
          console.log(12222222, targetLinkSource[1], creep);
          if (creep.transfer(targetLinkSource[1], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.travelTo(targetLinkSource[1], { visualizePathStyle: { stroke: '#ffffff' } });
          }
        } else if (targetsTower) {
          if (creep.transfer(targetsTower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.travelTo(targetsTower, { visualizePathStyle: { stroke: '#ffffff' } });
          }
        } else if (targetStorage) {
          if (creep.transfer(targetStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.travelTo(targetStorage, { visualizePathStyle: { stroke: '#ffffff' } });
          }
        }
      } else {
        if (targetsTower) {
          if (creep.transfer(targetsTower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.travelTo(targetsTower, { visualizePathStyle: { stroke: '#ffffff' } });
          }
        } else if (targetStorage) {
          if (creep.transfer(targetStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.travelTo(targetStorage, { visualizePathStyle: { stroke: '#ffffff' } });
          }
        }
      }
    }
  };
  // ----
  if (creep.memory.transporting) {
    goout(creep);
  } else {
    fixNearby(creep);
    if (targetsBuild && creep.room.name !== Game.spawns[targetroom].room.name) {
      if (creep.build(targetsBuild) === ERR_NOT_IN_RANGE) {
        creep.travelTo(targetsBuild, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else {
      gohome(creep, targetroom);
    }
  }
};
