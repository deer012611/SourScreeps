import { fixNearby } from '../function/function';
export const roleOutDig = (creep: Creep, flag: string) => {
  const goout = (creep: Creep, flag: string) => {
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
        fixNearby(creep);
        var sources = creep.room.cacheFind(FIND_SOURCES);
        var _sources = flag === 'Flag6' ? sources[1] : sources[0];
        if (sources[0]) {
          if (creep.harvest(_sources) === ERR_NOT_IN_RANGE) {
            creep.travelTo(_sources, { visualizePathStyle: { stroke: '#ffaa00' } });
          }
        }
      }
    }
  };

  goout(creep, flag);

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
