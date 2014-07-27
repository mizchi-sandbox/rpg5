module Wdr.Services {
  export class BattleSession {
    public players: Entities.Battle.Battler[];
    public enemies: Entities.Battle.Battler[];

    constructor(){
      this.players = [
        Wdr.Entities.Battle.Battler.create({name: 'mizchi', lv: 1, hp: 30, wt: 10, id: 1}),
        Wdr.Entities.Battle.Battler.create({name: 'bot', lv: 3, hp: 20, wt: 30, id: 2})
      ];

      this.enemies = [
        Wdr.Entities.Battle.Battler.create({name: 'goblin#1', lv: 1, wt:15, hp: 12, id: 3}),
        Wdr.Entities.Battle.Battler.create({name: 'goblin#2', lv: 1, wt:15, hp: 12, id: 4}),
        Wdr.Entities.Battle.Battler.create({name: 'goblin#3', lv: 1, wt:15, hp: 12, id: 5})
      ]
    }

    // findBattlerById :: String -> Wdr.Entities.Battle.Battler?
    public findBattlerById(battlerId: string){
      return _.find(
        [].concat(this.players, this.enemies),
        (battler) => battler.id === battlerId
      );
    }

    execAction(data){
      var actorId = data.actorId;
      var skillId = data.skillId;
      var targetId = data.targetId ? data.targetId : _.sample(this.enemies).id;

      var actor = this.findBattlerById(actorId);

      if(skillId === 'attack'){
        var target = this.findBattlerById(targetId);
        target.hp.current -= 4;
        console.log('attack');
      } else if(skillId === 'defenece'){
        console.log('defenece');
      } else if(skillId === 'escape'){
        console.log('escape');
      }
      actor.wt.current = 1;
    }

    isBattleFinisihed(): any {
      if(_.all(this.enemies.map((e) => e.hp.current <= 0))){
        return {eventType: 'player-win'};
      } else if(_.all(this.enemies.map((e) => e.hp.current <= 0 ))){
        return {eventType: 'enemy-win'};
      }
      return false;
    }

    processTurn() {
      var result = this.isBattleFinisihed();
      if(result) return [result];

      var reports = [];
      [].concat(this.players, this.enemies).map((p) => {
        if(p.hp.current < 1) return;

        if(p.wt.current < p.wt.max) {
          p.wt.current++;
        } else {
          if(_.contains(this.players, p)){
            reports.push(new Wdr.ValueObjects.Report({
              eventType: 'stopForUserInput',
              log: p.name + "は入力を待っている",
              battlerId: p.id
            }));
          } else {
            p.wt.current = 1;
            reports.push(new Wdr.ValueObjects.Report({
              eventType: 'action',
              log: p.name + "の行動",
              battlerId: p.id
            }));
          }
        }
      });
      return reports;
    }

    toJSON(){
      return {
        players: this.players.map((p) => p.toJSON()),
        enemies: this.enemies.map((e) => e.toJSON())
      };
    }
  }
}
