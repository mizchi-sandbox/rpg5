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
console.log('application initialized');
//# sourceMappingURL=application.js.map