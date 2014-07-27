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
console.log('application initialized');
//# sourceMappingURL=application.js.map