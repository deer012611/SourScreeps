// 修脚下的路
export const fixNearby = creep => {
  var closestRoad = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure =>
      structure.hits < structure.hitsMax * 0.6 && structure.structureType === 'road'
  });
  var closestRampart = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure =>
      structure.hits < structure.hitsMax * 0.5 && structure.structureType === 'rampart'
  });
  var closestContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure =>
      structure.hits < structure.hitsMax * 0.7 && structure.structureType === 'container'
  });

  const checkroad = creep => {
    creep.repair(closestRoad);
  };
  const checkrampart = creep => {
    creep.repair(closestRampart);
  };
  const checkcontainer = creep => {
    creep.repair(closestContainer);
  };

  checkroad(creep);
  checkrampart(creep);
  checkcontainer(creep);
};
