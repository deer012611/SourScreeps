export const roleBuilder = (creep: Creep) => {
  // 建造目标
  var targets;


  //
  var sources = creep.pos.findClosestByPath(FIND_SOURCES, {
    filter: structure => {
      return structure.energy > 0;
    }
  });
  var targetsdrop = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
  var containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
    filter: i => i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
  });

  if (containersWithEnergy) {
    if (creep.carry.energy > 0) {
      build();
    } else {
      harvest();
    }
  } else {
    if (creep.carry.energy < creep.carryCapacity) {
      harvest();
    } else {
      build();
    }
  }

  function build() {

  }

  function harvest() {
    if (creep.carry.energy < creep.carryCapacity) {
      // 如果container里边有能量->container
      if (containersWithEnergy) {
        console.log(containersWithEnergy[0]);
        if (creep.withdraw(containersWithEnergy[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(containersWithEnergy[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      } else if (targetsdrop) {
        creep.moveTo(targetsdrop);
        creep.pickup(targetsdrop, { visualizePathStyle: { stroke: '#ffffff' } });
        creep.say('😃');
      } else {
        if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
          creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }
    }
  }
};
