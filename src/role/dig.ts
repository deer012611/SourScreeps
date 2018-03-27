export const roleDig = (creep: Creep, mineID: string) => {
  var sources = Game.getObjectById(mineID);
  // var sources = creep.room.find(FIND_SOURCES, {
  //   filter: structure => {
  //     return structure.energy > 0;
  //   }
  // });

  if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
    creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
  }
};
