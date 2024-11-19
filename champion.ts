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
