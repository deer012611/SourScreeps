export const roleSolider = (creep: Creep, flag: string) => {
  const goout = (creep: Creep) => {
    if (Game.flags[flag].room === undefined) {
      creep.moveTo(Game.flags[flag], { visualizePathStyle: { stroke: '#a856fa' } });
    } else {
      var toRoom = Game.flags[flag].room.name;
      if (creep.room.name !== toRoom) {
        const exitDir = Game.map.findExit(creep.room.name, toRoom);
        const exitToAnotherRoom = creep.pos.findClosestByRange(exitDir);
        creep.moveTo(exitToAnotherRoom, { visualizePathStyle: { stroke: '#ffaa00' } });
      } else {
        if (creep.room.controller) {
          if (creep.reserveController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
          }
        }
        // if (creep.room.controller) {
        //   if (creep.signController(creep.room.controller, 'Hallelujah ~ ') === ERR_NOT_IN_RANGE) {
        //     creep.moveTo(creep.room.controller);
        //   }
        // }
      }
    }
  };

  goout(creep);
};
