// 修脚下的路
export const fixNearby = creep => {
  const checkroad = creep => {
    var closestRoad = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure =>
        structure.hits < structure.hitsMax * 0.6 && structure.structureType === 'road'
    });
    creep.repair(closestRoad);
  };
  const checkcontainer = creep => {
    var closestContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure =>
        structure.hits < structure.hitsMax * 0.6 && structure.structureType === 'container'
    });
    creep.repair(closestContainer);
  };
  checkroad(creep);
  checkcontainer(creep);
};
