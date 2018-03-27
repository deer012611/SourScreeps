export const roleDismantler = (creep: Creep) => {
  // 舔掉落物
  var targets = creep.room.find(FIND_DROPPED_RESOURCES, {
    filter: i => i.amount > 0
  });

  if ((creep.carry.energy = creep.carryCapacity)) {
    console.log('??');
    console.log(creep.carry.energy, creep.carryCapacity);
    if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(Game.spawns['Spawn1']);
    }
  } else {
    console.log('!!!');
    if (targets.length > 0) {
      creep.moveTo(targets[0]);
      creep.pickup(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
      creep.say('💰');
    }
  }
  // const target = creep.pos.findClosestByRange(FIND_STRUCTURES,
  //     {filter: {structureType: STRUCTURE_WALL}});
  // const target = creep.room.find(FIND_STRUCTURES,
  //     {filter: {structureType: STRUCTURE_WALL}});
  //     console.log(target[3].hits)
  // if(target[3]) {
  //     if(creep.dismantle(target[3]) == ERR_NOT_IN_RANGE) {
  //         creep.moveTo(target[3], {visualizePathStyle: {stroke: '#ffaa00'}});
  //     }
  // }
};
