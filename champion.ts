import { log } from "console";

export type Player = {
  name: string;
  age: number;
  elo: number;
};

export class ChampionService {
  private players: Player[];

  constructor(players: Player[]) {
    this.players = players;
  }

  public findChampions(): Player[] {
    if (this.players.length <= 1) {
      return this.players;
    }

    const bestElo = Math.max(...this.players.map((player) => player.elo));

    const playersWithBestElo = this.players.filter(
      (player) => player.elo === bestElo
    );

    if (playersWithBestElo.length === 1) {
      return playersWithBestElo;
    }

    const youngestAge = Math.min(
      ...playersWithBestElo.map((player) => player.age)
    );

    return playersWithBestElo.filter((player) => player.age === youngestAge);
  }
}

const players : Player[] = [
  { name: 'Jane', age: 30, elo: 2500 },
  { name: 'Erwan', age: 20, elo: 2800 },
  { name: 'John', age: 40, elo: 2900 },
  { name: 'Toto', age: 15, elo: 2900 }

]
const service = new ChampionService(players)
console.log(service.findChampions())