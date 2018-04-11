export const roleDig = (creep: Creep, mineID: string) => {
  var sources = Game.getObjectById(mineID);
  var targetLink = Game.getObjectById('5ac212ecac37e47fd05a46a3');
  var targetContainer = Game.getObjectById('5aca5db82657b65071649939');
  if (creep.memory.role === 'dig-2') {
    digLinkMiner(creep, sources);
  } else if (creep.memory.role === 'dig-1') {
    var sourcesLinkMiner = Game.getObjectById('59f1a38382100e1594f3ba5d');
    digLinkMiner(creep, sourcesLinkMiner);
  }

  function digLinkMiner(creep, sources) {
    if (creep.memory.role === 'dig-1') {
      if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
        creep.travelTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    } else {
      if (targetLink.energy < targetLink.energyCapacity) {
        if (creep.carry.energy < creep.carryCapacity) {
          var targetsdrop = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
          if (sources.energy !== 0) {
            console.log(1);
            if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
              creep.travelTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
          } else if (targetsdrop) {
            console.log(2);
            creep.pickup(targetsdrop, { visualizePathStyle: { stroke: '#ffffff' } });
          } else if (targetContainer.energy !== 0) {
            console.log(3);
            if (creep.withdraw(targetContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.travelTo(targetContainer, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
          } else {
            console.log(4);
          }
          // }
        } else {
          if (creep.transfer(targetLink, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.travelTo(targetLink, { visualizePathStyle: { stroke: '#ffffff' } });
          }
        }
      }
      // else {
      // if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
      //   creep.travelTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
      // }
      // }
    }
  }
};
