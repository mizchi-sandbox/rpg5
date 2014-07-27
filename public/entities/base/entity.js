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
//# sourceMappingURL=entity.js.map
