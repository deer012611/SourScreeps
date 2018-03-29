export const roleOutDig = (creep: Creep) => {
  goout();

  console.log(creep.room);
  function goout() {
    if (creep.room.name !== 'E9N44') {
      const exitDir = Game.map.findExit('E8N44', 'E9N44');
      const exitToAnotherRoom = creep.pos.findClosestByRange(exitDir);
      creep.moveTo(exitToAnotherRoom, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else {
      var sources = creep.room.find(FIND_SOURCES);
      if (sources[0].energy > 0) {
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }
    }
  }

  // var targets = creep.room.find(FIND_STRUCTURES, {
  //   filter: structure => {
  //     return (
  //         (structure.structureType === STRUCTURE_SPAWN ||
  //         structure.structureType === STRUCTURE_EXTENSION ||
  //         structure.structureType === STRUCTURE_STORAGE) &&
  //         structure.energy < structure.energyCapacity
  //     );
  //   }
  // });
  // var containersNoEnergy = creep.room.find(FIND_STRUCTURES, {
  //   filter: i =>
  //   i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] < i.storeCapacity
  // });
  // var targetsTower = creep.room.find(FIND_STRUCTURES, {
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
  //     creep.moveTo(exitToMyRoom, { visualizePathStyle: { stroke: '#ffaa00' } });
  //   } else {
  //     transport();
  //   }
  // }
};
