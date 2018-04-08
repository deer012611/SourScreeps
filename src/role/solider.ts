export const roleSolider = (creep: Creep) => {
  const goout = (creep: Creep) => {
    if (creep.room.name !== 'E9N44') {
      const exitDir = Game.map.findExit('E8N44', 'E9N44');
      const exitToAnotherRoom = creep.pos.findClosestByRange(exitDir);
      creep.moveTo(exitToAnotherRoom, { visualizePathStyle: { stroke: '#ffaa00' } });
    } else {
      var targetsdrop = creep.room.find(FIND_DROPPED_RESOURCES, {
        filter: i => i.amount > creep.carryCapacity
      });
      if (creep.room.controller) {
        if (creep.reserveController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
        }
      }
    }
  };

  goout(creep);
};
