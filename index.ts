export type Player = {
  name: string;
  age: number;
  elo: number;
};
export const players: Player[] = [
  { name: "Harry", age: 25, elo: 2000 },
  { name: "Jane", age: 20, elo: 2100 },
  { name: "Charlie", age: 20, elo: 1900 },
  { name: "Camille", age: 20, elo: 3000 },
  { name: "john", age: 25, elo: 2200 },
  { name: "Frank", age: 31, elo: 2100 },
  { name: "Erwan", age: 31, elo: 2100 },
];

export function groupByAge(players: Player[]): Map<number, Player[]> {
  players.forEach((player, index) => {
    if (!player || typeof player.age !== "number") {
      throw new Error(
        `Invalid player at index ${index}: ${JSON.stringify(player)}`
      );
    }
  });
  const group = new Map<number, Player[]>();
  players.forEach((player) => {
    if (!group.has(player.age)) {
      group.set(player.age, []);
    }
    group.get(player.age)?.push(player);
  });
  return group;
}

export function findChampions(players: Player[]): Player[] {
  if (players.length <= 1) {
    return players;
  }

  const groupedByAge = groupByAge(players);
  const champions: Player[] = [];

  Array.from(groupedByAge.keys())
    .sort((a, b) => a - b)
    .forEach((age) => {
      const group = groupedByAge.get(age);
      if (!group) return;

      const bestPlayer = group.reduce((best, player) =>
        player.elo > best.elo ? player : best
      );
      if (bestPlayer.elo > 2500) {
        champions.push(bestPlayer);
      }
    });
    return champions;
}

const champions = findChampions(players);
console.log("The champions is :", champions);

//with lot of data

// function getRandomAge (min : number, max: number) : number{
//     return Math.random() *(max - min) + min
// }
// const largeDataset: Player[] = Array.from({ length: 10000 }, (_, i) => ({
//     name: `Player${i}`,
//     age: Math.floor(getRandomAge(9,99)),
//     elo: Math.floor(Math.random() * 3000),
//   }));

//   console.time("findChampions");
//   console.log(findChampions(largeDataset));
//   console.timeEnd("findChampions");
