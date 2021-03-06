import { TargetType } from '../enums/target';
import { RoleType } from '../enums/creep';
import { ActionType } from '../enums/action';
import { travelTo } from '../utils/Travel';
Object.defineProperties(Creep.prototype, {
  role: {
    get(): RoleType {
      return this.memory.role;
    }
  },
  homeRoom: {
    get(): Room {
      return Game.rooms[this.memory.homeRoom];
    }
  },
  isInHomeRoom: {
    get(): boolean {
      return this.memory.homeRoom === this.room.name;
    }
  },
  action: {
    get(): string {
      return this.memory.action;
    }
  },
  target: {
    get(): Target | undefined {
      const target = this.memory.target;
      if (target === null) return undefined;
      switch (this.memory.targetType) {
        case TargetType.id:
          const obj = Game.getObjectById(target) as RoomObject;
          return _.isNull(obj) ? undefined : obj;
        case TargetType.flag:
          return Game.flags[target];
        case TargetType.room:
          return Game.rooms[target];
      }
    }
  },
  totalCarry: {
    get(): number {
      return _.sum(this.carry);
    }
  },
  isEmpty: {
    get(): boolean {
      return this.totalCarry === 0;
    }
  },
  isFull: {
    get(): boolean {
      return this.totalCarry === this.carryCapacity;
    }
  },
  missingHits: {
    get(): number {
      return this.hitsMax - this.hits;
    }
  },
  isHurt: {
    get(): boolean {
      return this.hits < this.hitsMax;
    }
  },
  isMove: {
    get(): boolean {
      if (_.isUndefined(this.memory.unMove)) this.memory.unMove = 0;
      const lastPos = this.memory._pos;
      if (_.isUndefined(lastPos)) return false;
      return lastPos.x !== this.pos.x || lastPos.y !== this.pos.y;
    }
  }
});

Creep.prototype.setTarget = function(target: Target): void {
  if (!_.isUndefined(_.get(target, 'id'))) {
    this.memory.target = _.get(target, 'id');
    this.memory.targetType = TargetType.id;
  } else {
    this.memory.target = _.get(target, 'name');
    if (!_.isUndefined(_.get(target, 'color'))) {
      this.memory.targetType = TargetType.flag;
    } else {
      this.memory.targetType = TargetType.room;
    }
  }
};

Creep.prototype.setAction = function(action: ActionType): void {
  this.memory.action = action;
};

Creep.prototype.getBodyparts = function(partTypes: BodyPartConstant): number {
  return _(this.body)
    .filter({ partTypes })
    .value().length;
};

Creep.prototype.hasBodyparts = function(
  partTypes: BodyPartConstant | BodyPartConstant[],
  start: number = 0
): boolean {
  const body = this.body;
  const limit = body.length;
  if (!_.isArray(partTypes)) partTypes = [partTypes];
  for (let i = start; i < limit; i++) {
    if (_.includes(partTypes, body[i].type)) return true;
  }
  return false;
};

Creep.prototype.hasActiveBodyparts = function(
  partTypes: BodyPartConstant | BodyPartConstant[]
): boolean {
  return this.hasBodyparts(partTypes, this.body.length - Math.ceil(this.hits * 0.01));
};

Creep.prototype.travelTo = travelTo;
