declare module Wdr.Storages {
  export class SaveObject {
    static findOne(query:any);
    save(data: any): any;
  }
}

module Wdr.Services {
  export class PlaySession{
    gold: number;
    name: string;
    saveId: string;
    players: Wdr.Entities.Actor[];

    save(){ return new Promise((done) => {
      Wdr.Storages.SaveObject.findOne({
        id: this.saveId
      }).then((saveObject) => {
        saveObject.save({
          gold: this.gold
        }).then(done);
      });
    });}
  }
}
