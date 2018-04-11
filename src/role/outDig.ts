export const roleOutDig = (creep: Creep, flag: string) => {
  const goout = (creep: Creep) => {
    if (Game.flags[flag].room === undefined) {
      creep.travelTo(Game.flags[flag]);
    } else {
      var toRoom = Game.flags[flag].room.name;
      if (creep.room.name !== toRoom) {
        creep.travelTo(Game.flags[flag]);
        // const exitDir = Game.map.findExit(creep.room.name, toRoom);
        // const exitToAnotherRoom = creep.pos.findClosestByRange(exitDir);
        // creep.travelTo(exitToAnotherRoom, { visualizePathStyle: { stroke: '#ffaa00' } });
      } else {
        var sources = creep.room.cacheFind(FIND_SOURCES);
        if (sources[0].energy > 0) {
          if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            creep.travelTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
          }
        }
      }
    }
  };

  if (flag === 'Flag2') {
  } else {
    goout(creep);
  }

  // var targets = creep.room.cacheFind(FIND_STRUCTURES, {
  //   filter: structure => {
  //     return (
  //         (structure.structureType === STRUCTURE_SPAWN ||
  //         structure.structureType === STRUCTURE_EXTENSION ||
  //         structure.structureType === STRUCTURE_STORAGE) &&
  //         structure.energy < structure.energyCapacity
  //     );
  //   }
  // });
  // var containersNoEnergy = creep.room.cacheFind(FIND_STRUCTURES, {
  //   filter: i =>
  //   i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] < i.storeCapacity
  // });
  // var targetsTower = creep.room.cacheFind(FIND_STRUCTURES, {
  //   filter: structure => {
  //     return (
  //         structure.structureType === STRUCTURE_TOWER && structure.energy < structure.energyCapacity
  //     );
  //   }
  // });
  // function gohome() {
  //   if (creep.room.name !== 'E8N44') {
  //     // 回家
  //     const exitDir2 = Game.map.findExit('E9N44', 'E8N44');
  //     console.log(exitDir2);
  //     const exitToMyRoom = creep.pos.findClosestByRange(exitDir2);
  //     creep.travelTo(exitToMyRoom, { visualizePathStyle: { stroke: '#ffaa00' } });
  //   } else {
  //     transport();
  //   }
  // }
};
