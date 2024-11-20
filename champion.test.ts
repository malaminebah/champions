import { Player, ChampionService } from './champion';

describe('ChampionService', () => {
  it('should return empty array for empty input', () => {
    const service = new ChampionService([]);
    expect(service.findChampions()).toEqual([]);
  });

  it('should return single player for single input', () => {
    const player = { name: 'Mike', age: 25, elo: 2000 };
    const service = new ChampionService([player]);
    expect(service.findChampions()).toEqual([player]);
  });

  it('should be eliminate when someone is strictly stronger and younger or same age', () => {
    const players: Player[] = [
      { name: 'Mike', age: 30, elo: 2800 },
      { name: 'John', age: 30, elo: 3000 },
      { name: 'Jane', age: 25, elo: 3000 } ,

    ];
    const service = new ChampionService(players);
    expect(service.findChampions()).not.toContainEqual({ name: 'John', age: 30, elo: 3000 });
    expect(service.findChampions()).toContainEqual({ name: 'Jane', age: 25, elo: 3000 });
  });

  it('should be eliminate when someone is strictly younger and stronger or same score', () => {
    const players: Player[] = [
      { name: 'Mike', age: 30, elo: 2800 },
      { name: 'John', age: 25, elo: 2900 },
      { name: 'Jane', age: 20, elo: 2900 }  
    ];
    const service = new ChampionService(players);
    expect(service.findChampions()).toContainEqual({ name: 'Jane', age: 20, elo: 2900 });
  });

  it('should return all players of same youngest age with equal best elo', () => {
    const players: Player[] = [
      { name: 'Erwan', age: 20, elo: 2800 },
      { name: 'Mike', age: 20, elo: 2800 },
      { name: 'John', age: 40, elo: 2800 }
    ];
    const service = new ChampionService(players);
    expect(service.findChampions()).toEqual([
      { name: 'Erwan', age: 20, elo: 2800 },
      { name: 'Mike', age: 20, elo: 2800 }
    ]);
  });

  it('should keep both players when neither dominates the other', () => {
    const players: Player[] = [
      { name: 'Mike', age: 20, elo: 2800 },
      { name: 'John', age: 30, elo: 3000 }   
    ];
    const service = new ChampionService(players);
    expect(service.findChampions()).toContainEqual({ name: 'Mike', age: 20, elo: 2800 });
    expect(service.findChampions()).toContainEqual({ name: 'John', age: 30, elo: 3000 });
  });

  it('should handle mixed elo scenario correctly', () => {
    const players: Player[] = [
      { name: 'Harry', age: 20, elo: 2700 },
      { name: 'Mike', age: 19, elo: 2700 },
      { name: 'Marc', age: 25, elo: 2000 },
      { name: 'Jane', age: 30, elo: 2900 },
      { name: 'John', age: 40, elo: 2700 }
    ];
    const service = new ChampionService(players);
    expect(service.findChampions()).toEqual([{ name: 'Mike', age: 19, elo: 2700 }, { name: 'Jane', age: 30, elo: 2900 }]);
  });

  it('should handle multiple players with same attributes', () => {
    const players: Player[] = [
      { name: 'Mike', age: 20, elo: 2900 },
      { name: 'John', age: 20, elo: 2900 }
    ];
    const service = new ChampionService(players);
    expect(service.findChampions()).toContainEqual({ name: 'Mike', age: 20, elo: 2900 });
    expect(service.findChampions()).toContainEqual({ name: 'John', age: 20, elo: 2900 });
  });
});