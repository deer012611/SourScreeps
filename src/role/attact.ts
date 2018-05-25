export const roleAttact = (creep: Creep, flag: string) => {
  console.log(creep, flag);
  function goout(creep) {
    if (Game.flags[flag].room === undefined) {
      creep.travelTo(Game.flags[flag]);
    } else {
      var _toRoom = Game.flags[flag].room.name;
      //
      if (creep.room.name !== _toRoom) {
        creep.travelTo(Game.flags[flag], { visualizePathStyle: { stroke: '#ffaa00' } });
      } else {
        var invader = Game.flags[flag].room.find(FIND_HOSTILE_CREEPS);
        console.log('1234567     ', invader);
        if (creep.attack(invader[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(invader[0]);
        }
      }
    }
  }
  goout(creep);
};
