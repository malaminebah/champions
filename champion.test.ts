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

  it('should return older player when they have better elo', () => {
    const players: Player[] = [
      { name: 'Erwan', age: 20, elo: 2800 },
      { name: 'John', age: 40, elo: 3000 }
    ];
    const service = new ChampionService(players);
    expect(service.findChampions()).toEqual([{ name: 'John', age: 40, elo: 3000 }]);
  });

  it('should return younger player when equal elo', () => {
    const players: Player[] = [
      { name: 'Marc', age: 25, elo: 2800 },
      { name: 'John', age: 40, elo: 2800 }
    ];
    const service = new ChampionService(players);
    expect(service.findChampions()).toEqual([{ name: 'Marc', age: 25, elo: 2800 }]);
  });

  it('should return youngest player among multiple players with equal best elo', () => {
    const players: Player[] = [
      { name: 'Jane', age: 30, elo: 2800 },
      { name: 'Erwan', age: 20, elo: 2800 },
      { name: 'John', age: 40, elo: 2800 }
    ];
    const service = new ChampionService(players);
    expect(service.findChampions()).toEqual([{ name: 'Erwan', age: 20, elo: 2800 }]);
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

  it('should ignore age when player has absolute best elo', () => {
    const players: Player[] = [
      { name: 'Mike', age: 20, elo: 2800 },
      { name: 'Jane', age: 30, elo: 2900 },
      { name: 'John', age: 40, elo: 3000 }
    ];
    const service = new ChampionService(players);
    expect(service.findChampions()).toEqual([{ name: 'John', age: 40, elo: 3000 }]);
  });

  it('should handle mixed elo scenario correctly', () => {
    const players: Player[] = [
      { name: 'Mike', age: 20, elo: 2800 },
      { name: 'Marc', age: 25, elo: 2000 },
      { name: 'Jane', age: 30, elo: 2900 },
      { name: 'John', age: 40, elo: 2700 }
    ];
    const service = new ChampionService(players);
    expect(service.findChampions()).toEqual([{ name: 'Jane', age: 30, elo: 2900 }]);
  });
});