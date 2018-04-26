export const roleSolider = (creep: Creep, flag: string) => {
  const goout = (creep: Creep, flag: string) => {
    if (Game.flags[flag].room === undefined) {
      creep.travelTo(Game.flags[flag], { visualizePathStyle: { stroke: '#a856fa' } });
    } else {
      var toRoom = Game.flags[flag].room.name;
      if (creep.room.name !== toRoom) {
        creep.travelTo(Game.flags[flag], { visualizePathStyle: { stroke: '#a856fa' } });
      } else {
        if (flag === 'Flag3') {
          var transporting = false;
          // memory
          if (!creep.memory.transporting && creep.carry.energy === 0) {
            creep.memory.transporting = true;
            creep.say('🔄');
          }
          if (creep.memory.transporting && creep.carry.energy === creep.carryCapacity) {
            creep.memory.transporting = false;
            creep.say('⚡');
          }
          var sources = creep.room.cacheFind(FIND_SOURCES);
          var targets = creep.room.find(FIND_STRUCTURES, {
            filter: structure => {
              return (
                structure.structureType === STRUCTURE_SPAWN &&
                structure.energy < structure.energyCapacity
              );
            }
          });
          console.log(targets);
          var targetsdrop = creep.room.cacheFind(FIND_DROPPED_RESOURCES, {
            filter: i => i.amount > creep.carryCapacity
          });
          if (creep.memory.transporting) {
            if (targetsdrop.length) {
              creep.travelTo(targetsdrop[0]);
              creep.pickup(targetsdrop[0], { visualizePathStyle: { stroke: '#ffffff' } });
              creep.say('😃');
            } else if (sources) {
              if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.travelTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
              }
            }
          } else {
            // if (targets) {
            //   if (creep.transfer(targets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            //     creep.travelTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
            //   }
            // }
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
              creep.travelTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
          }
        } else {
          if (creep.room.controller) {
            if (creep.reserveController(creep.room.controller) === ERR_NOT_IN_RANGE) {
              creep.travelTo(creep.room.controller);
            }
          }
        }
      }
    }
  };

  goout(creep, flag);
  // 注册
  // if (creep.room.controller) {
  //   console.log(1);
  //   if (creep.signController(creep.room.controller, 'Hallelujah ~ ') === ERR_NOT_IN_RANGE) {
  //     creep.travelTo(creep.room.controller);
  //   }
  // }
  // 占领
  // if (creep.room.controller) {
  //   if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) {
  //     creep.travelTo(creep.room.controller);
  //   }
  // }
};
