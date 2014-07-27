/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="value-objects/report.ts" />
/// <reference path="value-objects/value-with-max.ts" />
/// <reference path="entities/base/entity.ts" />
/// <reference path="entities/actor.ts" />
/// <reference path="entities/battle/battler.ts" />
/// <reference path="services/play-session.ts" />
/// <reference path="services/battle-session.ts" />
console.log('application initialized');
module Wdr {
  export class Application {
    currentSession: Wdr.Services.PlaySession;
    events: any[] = [];
    loaded: boolean;

    loadPlaySession(saveObject){
      return new Promise((done) => {
        this.currentSession = new Wdr.Services.PlaySession();
        this.currentSession.saveId = saveObject.id;
        this.currentSession.name = saveObject.name;
        this.currentSession.gold = saveObject.gold;
        Wdr.Storages.Actor.find({ownerId: saveObject.id}).then((actors) => {
          this.currentSession.actors = actors.map((actor) => Wdr.Entities.Actor.create(actor));
          this.loaded = true;
          done(null);
        });
      });
    }
    savePlaySession(){}
  }
}
