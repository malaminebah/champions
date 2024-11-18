import {Player,groupByAge, findChampions } from './index'


describe('groupByAge', () => {
  it('should group players by age correctly (normal case)', () => {
    const players: Player[] = [
      { name: 'Alice', age: 25, elo: 1200 },
      { name: 'Bob', age: 30, elo: 1400 },
      { name: 'Charlie', age: 25, elo: 1250 },
      { name: 'Dave', age: 30, elo: 1350 },
      { name: 'Eve', age: 20, elo: 1500 },
    ];

    const result = groupByAge(players);

    expect(result).toEqual(
      new Map<number, Player[]>([
        [25, [
          { name: 'Alice', age: 25, elo: 1200 },
          { name: 'Charlie', age: 25, elo: 1250 },
        ]],
        [30, [
          { name: 'Bob', age: 30, elo: 1400 },
          { name: 'Dave', age: 30, elo: 1350 },
        ]],
        [20, [
          { name: 'Eve', age: 20, elo: 1500 },
        ]],
      ])
    );
  });

  it('should return an empty Map if players array is empty', () => {
    const result = groupByAge([]);
    expect(result).toEqual(new Map<number, Player[]>());
  });

  it('should handle players with the same age', () => {
    const players: Player[] = [
      { name: 'Alice', age: 25, elo: 1200 },
      { name: 'Charlie', age: 25, elo: 1250 },
    ];

    const result = groupByAge(players);

    expect(result).toEqual(
      new Map<number, Player[]>([
        [25, [
          { name: 'Alice', age: 25, elo: 1200 },
          { name: 'Charlie', age: 25, elo: 1250 },
        ]],
      ])
    );
  });

  it('should throw an error if players do not have an age property', () => {
    const invalidPlayers: any[] = [
      { name: 'Alice', elo: 1200 },
      { name: 'Bob', age: 30, elo: 1400 },
    ];

    expect(() => groupByAge(invalidPlayers as Player[])).toThrow();
  });

  it('should return the input array if it contains 0 or 1 player', () => {
    const singlePlayer: Player[] = [{ name: 'Alice', age: 25, elo: 1200 }];
    expect(findChampions([])).toEqual([]);
    expect(findChampions(singlePlayer)).toEqual(singlePlayer);
  });

  it('should return the player with the highest elo from each group', () => {
    const players: Player[] = [
      { name: 'Alice', age: 25, elo: 3000 },
      { name: 'Bob', age: 30, elo: 2900 },
      { name: 'Charlie', age: 25, elo: 2800 },
      { name: 'Dave', age: 30, elo: 2500 },
      { name: 'Eve', age: 20, elo: 2950 },
    ];

    const result = findChampions(players);

    expect(result).toEqual([
      { name: 'Eve', age: 20, elo: 2950 },
      { name: 'Alice', age: 25, elo: 3000 },
      { name: 'Bob', age: 30, elo: 2900 },
    ]);
  });

  it('should return no champions if no player beats the initial score', () => {
    const players: Player[] = [
      { name: 'Alice', age: 25, elo: 1000 },
      { name: 'Bob', age: 30, elo: 2000 },
    ];

    const result = findChampions(players);

    expect(result).toEqual([]);
  });

  it('should handle groups with multiple players correctly', () => {
    const players: Player[] = [
      { name: 'Alice', age: 25, elo: 3500 },
      { name: 'Charlie', age: 25, elo: 3000 },
      { name: 'Bob', age: 30, elo: 2500 },
      { name: 'Dave', age: 30, elo: 3600 },
    ];

    const result = findChampions(players);

    expect(result).toEqual([
      { name: 'Alice', age: 25, elo: 3500 },
      { name: 'Dave', age: 30, elo: 3600 },
    ]);
  });


});
