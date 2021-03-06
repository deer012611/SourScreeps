// 间隔执行
export function setTickout(func: Function, ticks: number): void {
  if (Game.time % ticks === 0) func();
}

export function getUsername(): string {
  return _(Game.rooms)
    .map('controller')
    .filter('my')
    .map('owner.username')
    .first() as string;
}

// 判断是否在白名单
// TODO: 读取 Ally 成员列表
export function isFriend(username: string) {
  return WHITELIST.indexOf(username) !== -1;
}

// 获取游戏对象
export class getGame {
  static objById(id: string): RoomObject | null {
    return Game.getObjectById(id);
  }

  static objsByIdArray(idArray: string[]) {
    const GameObjects = [] as any[];
    _.forEach(idArray, id => GameObjects.push(Game.getObjectById(id)));
    return _.compact(GameObjects);
  }

  static objsToIdArray(objs: any[]): string[] {
    return _.map(objs, 'id');
  }

  static flagByName(name: string): Flag {
    return Game.flags[name];
  }

  static flagsByNameArray(nameArray: string[]) {
    const Flags = [] as Flag[];
    _.forEach(nameArray, name => Flags.push(Game.flags[name]));
    return _.compact(Flags);
  }

  static flagsToNameArray(flags: Flag[]): string[] {
    return _.map(flags, 'name');
  }
}
