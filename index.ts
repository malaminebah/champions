type Player = {
  name: string;
  age: number;
  elo: number;
};
const players: Player[] = [
  { name: "Emanuel", age: 25, elo: 2000 },
  { name: "Jane", age: 20, elo: 2100 },
  { name: "Charlie", age: 22, elo: 1900 },
  { name: "Camille", age: 20, elo: 2000 },
  { name: "john", age: 23, elo: 2200 },
  { name: "Frank", age: 21, elo: 2100 },
];

function groupByAge(players: Player[]): Map<number, Player[]> {
  const group = new Map<number, Player[]>();
  players.forEach((player) => {
    if (!group.has(player.age)) {
      group.set(player.age, []);
    }
    group.get(player.age)?.push(player);
  });
  return group;
}

function findChampions(players: Player[]): Player[] {
  if (players.length <= 1) {
    return players;
  }

  const groupedByAge = groupByAge(players);
  const champions: Player[] = [];
  let maxElo = -Infinity;

  Array.from(groupedByAge.keys())
    .sort((a, b) => a - b) //tri les age par ordre décroissant
    .forEach((age) => {
      const group = groupedByAge.get(age);
      if (!group) return;

      group.sort((a, b) => b.elo - a.elo);

      group.forEach((player) => {
        if (player.elo > maxElo) {
          champions.push(player);
          maxElo = player.elo;
        }
      });
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
