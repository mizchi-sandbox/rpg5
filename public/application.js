var Wdr;
(function (Wdr) {
    (function (ValueObjects) {
        var ValueWithMax = (function () {
            function ValueWithMax(current, max) {
                this.current = current;
                this.max = max;
                this.max = max ? max : current;
            }
            return ValueWithMax;
        })();
        ValueObjects.ValueWithMax = ValueWithMax;
    })(Wdr.ValueObjects || (Wdr.ValueObjects = {}));
    var ValueObjects = Wdr.ValueObjects;
})(Wdr || (Wdr = {}));
var Wdr;
(function (Wdr) {
    (function (ValueObjects) {
        var Report = (function () {
            function Report(data) {
                this.eventType = data.eventType;
                this.log = data.log;
                this.battlerId = data.battlerId;
            }
            return Report;
        })();
        ValueObjects.Report = Report;
    })(Wdr.ValueObjects || (Wdr.ValueObjects = {}));
    var ValueObjects = Wdr.ValueObjects;
})(Wdr || (Wdr = {}));
var Wdr;
(function (Wdr) {
    (function (Entities) {
        (function (Base) {
            var Id = (function () {
                function Id() {
                    this.value = _.uniqueId();
                }
                return Id;
            })();
            Base.Id = Id;

            var Entity = (function () {
                function Entity() {
                    this.id = new Id();
                }
                Entity.prototype.equals = function (other) {
                    return this.id.value === other.id.value;
                };
                return Entity;
            })();
            Base.Entity = Entity;
        })(Entities.Base || (Entities.Base = {}));
        var Base = Entities.Base;
    })(Wdr.Entities || (Wdr.Entities = {}));
    var Entities = Wdr.Entities;
})(Wdr || (Wdr = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Wdr;
(function (Wdr) {
    (function (Entities) {
        var Actor = (function (_super) {
            __extends(Actor, _super);
            function Actor(name, lv, job, status) {
                _super.call(this);
                this.name = name;
                this.lv = lv;
                this.job = job;
                this.status = status;
            }
            Actor.create = function (data) {
                return new Actor(data.name, data.lv, data.job, data.status);
            };
            return Actor;
        })(Entities.Base.Entity);
        Entities.Actor = Actor;
    })(Wdr.Entities || (Wdr.Entities = {}));
    var Entities = Wdr.Entities;
})(Wdr || (Wdr = {}));
// ValueWithMax = Wdr.ValueObjects.ValueWithMax
var Wdr;
(function (Wdr) {
    (function (Entities) {
        (function (Battle) {
            var Battler = (function (_super) {
                __extends(Battler, _super);
                function Battler(name, lv, hp, wt, id) {
                    _super.call(this);
                    this.name = name;
                    this.lv = lv;
                    this.id = id;
                    this.hp = new Wdr.ValueObjects.ValueWithMax(hp, hp);
                    this.wt = new Wdr.ValueObjects.ValueWithMax(0, wt);
                }
                Battler.create = function (data) {
                    return new Battler(data.name, data.lv, data.hp, data.wt, data.id);
                };

                Battler.prototype.toJSON = function () {
                    return {
                        name: this.name,
                        id: this.id,
                        lv: this.lv,
                        wt: {
                            current: this.wt.current,
                            max: this.wt.max
                        },
                        hp: {
                            current: this.hp.current,
                            max: this.hp.max
                        }
                    };
                };
                return Battler;
            })(Wdr.Entities.Base.Entity);
            Battle.Battler = Battler;
        })(Entities.Battle || (Entities.Battle = {}));
        var Battle = Entities.Battle;
    })(Wdr.Entities || (Wdr.Entities = {}));
    var Entities = Wdr.Entities;
})(Wdr || (Wdr = {}));
var Wdr;
(function (Wdr) {
    (function (Services) {
        var PlaySession = (function () {
            function PlaySession() {
            }
            PlaySession.prototype.save = function () {
                var _this = this;
                return new Promise(function (done) {
                    Wdr.Storages.SaveObject.findOne({
                        id: _this.saveId
                    }).then(function (saveObject) {
                        saveObject.save({
                            gold: _this.gold
                        }).then(done);
                    });
                });
            };
            return PlaySession;
        })();
        Services.PlaySession = PlaySession;
    })(Wdr.Services || (Wdr.Services = {}));
    var Services = Wdr.Services;
})(Wdr || (Wdr = {}));
var Wdr;
(function (Wdr) {
    (function (Services) {
        var BattleSession = (function () {
            function BattleSession() {
                this.players = [
                    Wdr.Entities.Battle.Battler.create({ name: 'mizchi', lv: 1, hp: 30, wt: 10, id: 1 }),
                    Wdr.Entities.Battle.Battler.create({ name: 'bot', lv: 3, hp: 20, wt: 30, id: 2 })
                ];

                this.enemies = [
                    Wdr.Entities.Battle.Battler.create({ name: 'goblin#1', lv: 1, wt: 15, hp: 12, id: 3 }),
                    Wdr.Entities.Battle.Battler.create({ name: 'goblin#2', lv: 1, wt: 15, hp: 12, id: 4 }),
                    Wdr.Entities.Battle.Battler.create({ name: 'goblin#3', lv: 1, wt: 15, hp: 12, id: 5 })
                ];
            }
            // findBattlerById :: String -> Wdr.Entities.Battle.Battler?
            BattleSession.prototype.findBattlerById = function (battlerId) {
                return _.find([].concat(this.players, this.enemies), function (battler) {
                    return battler.id === battlerId;
                });
            };

            BattleSession.prototype.execAction = function (data) {
                var actorId = data.actorId;
                var skillId = data.skillId;
                var targetId = data.targetId ? data.targetId : _.sample(this.enemies).id;

                var actor = this.findBattlerById(actorId);

                if (skillId === 'attack') {
                    var target = this.findBattlerById(targetId);
                    target.hp.current -= 4;
                    console.log('attack');
                } else if (skillId === 'defenece') {
                    console.log('defenece');
                } else if (skillId === 'escape') {
                    console.log('escape');
                }
                actor.wt.current = 1;
            };

            BattleSession.prototype.isBattleFinisihed = function () {
                if (_.all(this.enemies.map(function (e) {
                    return e.hp.current <= 0;
                }))) {
                    return { eventType: 'player-win' };
                } else if (_.all(this.enemies.map(function (e) {
                    return e.hp.current <= 0;
                }))) {
                    return { eventType: 'enemy-win' };
                }
                return false;
            };

            BattleSession.prototype.processTurn = function () {
                var _this = this;
                var result = this.isBattleFinisihed();
                if (result)
                    return [result];

                var reports = [];
                [].concat(this.players, this.enemies).map(function (p) {
                    if (p.hp.current < 1)
                        return;

                    if (p.wt.current < p.wt.max) {
                        p.wt.current++;
                    } else {
                        if (_.contains(_this.players, p)) {
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
            };

            BattleSession.prototype.toJSON = function () {
                return {
                    players: this.players.map(function (p) {
                        return p.toJSON();
                    }),
                    enemies: this.enemies.map(function (e) {
                        return e.toJSON();
                    })
                };
            };
            return BattleSession;
        })();
        Services.BattleSession = BattleSession;
    })(Wdr.Services || (Wdr.Services = {}));
    var Services = Wdr.Services;
})(Wdr || (Wdr = {}));
var Wdr;
(function (Wdr) {
    (function (Storages) {
        var Actor = (function (_super) {
            __extends(Actor, _super);
            function Actor() {
                _super.apply(this, arguments);
            }
            return Actor;
        })(Momic.Model);
        Storages.Actor = Actor;
        Actor.prototype['key'] = 'actors';
    })(Wdr.Storages || (Wdr.Storages = {}));
    var Storages = Wdr.Storages;
})(Wdr || (Wdr = {}));

var Wdr;
(function (Wdr) {
    (function (Storages) {
        var SaveObject = (function (_super) {
            __extends(SaveObject, _super);
            function SaveObject() {
                _super.apply(this, arguments);
            }
            return SaveObject;
        })(Momic.Model);
        Storages.SaveObject = SaveObject;
        SaveObject.prototype['key'] = 'saves';
    })(Wdr.Storages || (Wdr.Storages = {}));
    var Storages = Wdr.Storages;
})(Wdr || (Wdr = {}));
/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/momic.d.ts" />
/// <reference path="value-objects/value-with-max.ts" />
/// <reference path="value-objects/report.ts" />
/// <reference path="value-objects/status.ts" />
/// <reference path="entities/base/entity.ts" />
/// <reference path="entities/actor.ts" />
/// <reference path="entities/battle/battler.ts" />
/// <reference path="services/play-session.ts" />
/// <reference path="services/battle-session.ts" />
/// <reference path="../storages/actor.ts" />
console.log('application initialized');
var Wdr;
(function (Wdr) {
    var Application = (function () {
        function Application() {
            this.events = [];
        }
        Application.prototype.loadPlaySession = function (saveObject) {
            var _this = this;
            return new Promise(function (done) {
                _this.currentSession = new Wdr.Services.PlaySession();
                _this.currentSession.saveId = saveObject.id;
                _this.currentSession.name = saveObject.name;
                _this.currentSession.gold = saveObject.gold;
                Wdr.Storages.Actor.find({ ownerId: saveObject.id }).then(function (actors) {
                    _this.currentSession.actors = actors.map(function (actor) {
                        return Wdr.Entities.Actor.create(actor);
                    });
                    _this.loaded = true;
                    done(null);
                });
            });
        };
        Application.prototype.savePlaySession = function () {
        };
        return Application;
    })();
    Wdr.Application = Application;
})(Wdr || (Wdr = {}));
//# sourceMappingURL=application.js.map
