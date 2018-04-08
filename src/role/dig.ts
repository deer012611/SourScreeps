export const roleDig = (creep: Creep, mineID: string) => {
  var sources = Game.getObjectById(mineID);
  var targetLink = Game.getObjectById('5ac212ecac37e47fd05a46a3');
  if (creep.memory.role === 'dig-2') {
    digLinkMiner(creep, sources);
  } else if (creep.memory.role === 'dig-1') {
    // var targetContainer = Game.getObjectById('5ac32e704e602b120b709868');
    // if (targetContainer.energy === 0) {
    //   if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
    //     creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
    //   }
    // } else {
    var sourcesLinkMiner = Game.getObjectById('59f1a38382100e1594f3ba5d');
    digLinkMiner(creep, sourcesLinkMiner);
    // }
  }

  function digLinkMiner(creep, sources) {
    if (creep.memory.role === 'dig-1') {
      if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    } else {
      if (targetLink.energy < targetLink.energyCapacity) {
        if (creep.carry.energy < creep.carryCapacity) {
          // var targetsdrop = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
          // if (targetsdrop) {
          //   creep.pickup(targetsdrop, { visualizePathStyle: { stroke: '#ffffff' } });
          // }
          // else {
          if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
          }
          // }
        } else {
          if (creep.transfer(targetLink, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targetLink, { visualizePathStyle: { stroke: '#ffffff' } });
          }
        }
      } else {
        if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
          creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }
    }
  }
};
