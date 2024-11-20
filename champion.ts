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
    };

    return this.players.filter(player => 
      !this.players.some(otherPlayer => 
        otherPlayer !== player && 
        (
         
          (otherPlayer.elo > player.elo && otherPlayer.age <= player.age) ||

          (otherPlayer.age < player.age && otherPlayer.elo >= player.elo)
        )
      )
    );
  }
}