declare var db: any; // Fix later

module Wdr.Entities {
  export class Player extends Base.Entity {
    public name: string;
    public gold: number;

    constructor(data){
      super();
      this.name = data.name;
      this.gold = data.gold;
    }

    save(){
      return db.players.update({
        id: this.id,
        name: this.name,
        lv: this.lv,
        gold: this.@gold
      });
    }

    toJSON(){
      return {id: this.id, name: this.name, lv: this.lv, this.gold};
    }

    // canPuchaseExtendables(extendableId, count = 1):boolean {
    //   extendableData = ExtendablesData[extendableId]
    //   @gold >= extendableData.value * count
    // }

    // # (ID, [count]) -> Promise()
    // purchaseExtendables: (extendableId, count = 1) -> new Promise (done) =>
    //   data = ExtendablesData[extendableId]
    //   @gold -= data.value * count
    //   @save().then =>
    //     db.extendables.findOne(extendableId: data.extendableId, playerId: player.id).then (owned) =>
    //       if owned?
    //         owned.amount += count
    //         db.extendables.update(owned).then => done()
    //       else
    //         stuff =
    //           extendableId: data.extendableId
    //           playerId: player.id
    //           amount: count
    //         db.extendables.insert(stuff).then => done()
  }
}
