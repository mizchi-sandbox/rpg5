var _include_,_module_;_module_=function(e){return function(t,n,r){var i,s,o,u,a,f,l;r==null&&(r=o),o=(f=typeof window!=="undefined"&&window!==null?window:global)!=null?f:e,r==null&&(r=o),i=[],l=t.split(".");for(u=0,a=l.length;u<a;u++)s=l[u],r[s]==null&&(r[s]={}),r=r[s],i.push(r);return n.apply(r,i)}}(this),_include_=function(e,t){var n,r;for(n in t)r=t[n],e[n]=r;return t};
_module_('_', function (_) {
    0;
});
_module_('Wdr.ValueObjects', function (Wdr, ValueObjects) {
    this.Report = function () {
        0;
        0;
        0;
        function Report(param$) {
            var cache$;
            {
                cache$ = param$;
                this.eventType = cache$.eventType;
                this.log = cache$.log;
                this.battlerId = cache$.battlerId;
            }
        }
        return Report;
    }();
});
_module_('Wdr.ValueObjects', function (Wdr, ValueObjects) {
    this.ValueWithMax = function () {
        0;
        0;
        function ValueWithMax(param$, param$1) {
            this.current = param$;
            this.max = param$1;
            if (null != this.max)
                this.max;
            else
                this.max = this.current;
        }
        return ValueWithMax;
    }();
});
_module_('Wdr.Entities.Base', function (Wdr, Entities, Base) {
    Id = this.Id = function () {
        0;
        function Id() {
            this.value = _.uniqueId();
        }
        Id.prototype.equal = function (other) {
            return this.value === other.value;
        };
        return Id;
    }();
    this.Entity = function () {
        0;
        function Entity() {
            this.id = new Id();
        }
        Entity.prototype.equal = function (other) {
            return this.id.equal(other.id);
        };
        return Entity;
    }();
});
void function () {
    var ValueWithMax;
    ValueWithMax = Wdr.ValueObjects.ValueWithMax;
    _module_('Wdr.Entities.Battle', function (Wdr, Entities, Battle) {
        this.Battler = function (super$) {
            extends$(Battler, super$);
            0;
            0;
            0;
            0;
            function Battler(param$) {
                var cache$, hp, wt;
                {
                    cache$ = param$;
                    this.name = cache$.name;
                    this.lv = cache$.lv;
                    hp = cache$.hp;
                    wt = cache$.wt;
                    this.id = cache$.id;
                }
                this.hp = new Wdr.ValueObjects.ValueWithMax(hp, hp);
                this.wt = new Wdr.ValueObjects.ValueWithMax(0, wt);
            }
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
        }(Wdr.Entities.Base.Entity);
    });
    function isOwn$(o, p) {
        return {}.hasOwnProperty.call(o, p);
    }
    function extends$(child, parent) {
        for (var key in parent)
            if (isOwn$(parent, key))
                child[key] = parent[key];
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }
}.call(this);
_module_('Wdr.Entities', function (Wdr, Entities) {
    this.Player = function (super$) {
        extends$(Player, super$);
        function Player(data) {
            this.name = data.name;
            this.gold = data.gold;
        }
        Player.prototype.save = function () {
            return db.players.update({
                id: this.id,
                name: this.name,
                lv: this.lv,
                gold: this.gold
            });
        };
        Player.prototype.toJSON = function () {
            return {
                id: this.id,
                name: this.name,
                lv: this.lv,
                gold: this.gold
            };
        };
        Player.prototype.canPuchaseExtendables = function (extendableId, count) {
            var extendableData;
            if (null == count)
                count = 1;
            extendableData = ExtendablesData[extendableId];
            return this.gold >= extendableData.value * count;
        };
        Player.prototype.purchaseExtendables = function (extendableId, count) {
            if (null == count)
                count = 1;
            return new Promise(function (this$) {
                return function (done) {
                    var data;
                    data = ExtendablesData[extendableId];
                    this$.gold -= data.value * count;
                    return this$.save().then(function () {
                        return db.extendables.findOne({
                            extendableId: data.extendableId,
                            playerId: player.id
                        }).then(function (owned) {
                            var stuff;
                            if (null != owned) {
                                owned.amount += count;
                                return db.extendables.update(owned).then(function () {
                                    return done();
                                });
                            } else {
                                stuff = {
                                    extendableId: data.extendableId,
                                    playerId: player.id,
                                    amount: count
                                };
                                return db.extendables.insert(stuff).then(function () {
                                    return done();
                                });
                            }
                        });
                    });
                };
            }(this));
        };
        return Player;
    }(Wdr.Entities.Base.Entity);
});
function isOwn$(o, p) {
    return {}.hasOwnProperty.call(o, p);
}
function extends$(child, parent) {
    for (var key in parent)
        if (isOwn$(parent, key))
            child[key] = parent[key];
    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
}
_module_('Wdr.Services', function (Wdr, Services) {
    this.BattleSession = function () {
        function BattleSession() {
            this.players = [
                new Wdr.Entities.Battle.Battler({
                    name: 'mizchi',
                    lv: 1,
                    hp: 30,
                    wt: 10,
                    id: 1
                }),
                new Wdr.Entities.Battle.Battler({
                    name: 'bot',
                    lv: 3,
                    hp: 20,
                    wt: 30,
                    id: 2
                })
            ];
            this.enemies = [
                new Wdr.Entities.Battle.Battler({
                    name: 'goblin#1',
                    lv: 1,
                    wt: 15,
                    hp: 12,
                    id: 3
                }),
                new Wdr.Entities.Battle.Battler({
                    name: 'goblin#2',
                    lv: 1,
                    wt: 15,
                    hp: 12,
                    id: 4
                }),
                new Wdr.Entities.Battle.Battler({
                    name: 'goblin#3',
                    lv: 1,
                    wt: 15,
                    hp: 12,
                    id: 5
                })
            ];
        }
        BattleSession.prototype.findBattlerById = function (battlerId) {
            return _.find([].concat(this.players, this.enemies), function (battler) {
                return battler.id === battlerId;
            });
        };
        BattleSession.prototype.execAction = function (param$) {
            var actor, actorId, cache$, skillId, target, targetId;
            {
                cache$ = param$;
                actorId = cache$.actorId;
                skillId = cache$.skillId;
                targetId = cache$.targetId;
            }
            if (null != targetId)
                targetId;
            else
                targetId = _.sample(this.enemies).id;
            actor = this.findBattlerById(actorId);
            if (skillId === 'attack') {
                target = this.findBattlerById(targetId);
                target.hp.current--;
                console.log('attack');
            } else if (skillId === 'defenece') {
                console.log('defenece');
            }
            return actor.wt.current = 1;
        };
        BattleSession.prototype.processTurn = function () {
            return new Promise(function (this$) {
                return function (done) {
                    var p, reports;
                    reports = [];
                    for (var cache$ = [].concat(this$.players, this$.enemies), i$ = 0, length$ = cache$.length; i$ < length$; ++i$) {
                        p = cache$[i$];
                        if (p.wt.current < p.wt.max) {
                            p.wt.current++;
                        } else if (in$(p, this$.players)) {
                            reports.push(new Wdr.ValueObjects.Report({
                                eventType: 'stopForUserInput',
                                log: '' + p.name + '\u306f\u5165\u529b\u3092\u5f85\u3063\u3066\u3044\u308b',
                                battlerId: p.id
                            }));
                        } else {
                            p.wt.current = 1;
                            reports.push(new Wdr.ValueObjects.Report({
                                eventType: 'action',
                                log: '' + p.name + '\u306e\u884c\u52d5',
                                battlerId: p.id
                            }));
                        }
                    }
                    return done(reports);
                };
            }(this));
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
    }();
});
function isOwn$(o, p) {
    return {}.hasOwnProperty.call(o, p);
}
function extends$(child, parent) {
    for (var key in parent)
        if (isOwn$(parent, key))
            child[key] = parent[key];
    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
}
function in$(member, list) {
    for (var i = 0, length = list.length; i < length; ++i)
        if (i in list && list[i] === member)
            return true;
    return false;
}
_module_('Wdr.Services', function (Wdr, Services) {
    this.PlaySession = function () {
        0;
        0;
        0;
        function PlaySession() {
            this.gold = 0;
        }
        PlaySession.prototype.save = function () {
            return new Promise(function (this$) {
                return function (done) {
                    return Wdr.Storages.SaveObject.findOne({ id: this$.saveId }).then(function (this$1) {
                        return function (saveObject) {
                            return saveObject.save({ gold: this$1.gold }).then(done);
                        };
                    }(this$));
                };
            }(this));
        };
        return PlaySession;
    }();
});
function isOwn$(o, p) {
    return {}.hasOwnProperty.call(o, p);
}
function extends$(child, parent) {
    for (var key in parent)
        if (isOwn$(parent, key))
            child[key] = parent[key];
    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
}
function in$(member, list) {
    for (var i = 0, length = list.length; i < length; ++i)
        if (i in list && list[i] === member)
            return true;
    return false;
}
_module_('Wdr.Storages', function (Wdr, Storages) {
    this.SaveObject = function (super$) {
        extends$(SaveObject, super$);
        function SaveObject() {
            super$.apply(this, arguments);
        }
        SaveObject.prototype.key = 'saves';
        0;
        0;
        0;
        return SaveObject;
    }(Momic.Model);
});
function isOwn$(o, p) {
    return {}.hasOwnProperty.call(o, p);
}
function extends$(child, parent) {
    for (var key in parent)
        if (isOwn$(parent, key))
            child[key] = parent[key];
    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
}
function in$(member, list) {
    for (var i = 0, length = list.length; i < length; ++i)
        if (i in list && list[i] === member)
            return true;
    return false;
}
Vue.directive('dispatcher', {
    isLiteral: true,
    bind: function (value) {
        return this.el.addEventListener('click', function (this$) {
            return function () {
                return this$.vm.$dispatch(this$.expression);
            };
        }(this));
    }
});
Vue.prototype.dispose = function () {
    return this.$destroy();
};
_module_('Wdr.UI.Components.Base', function (Wdr, UI, Components, Base) {
    this.Component = Vue.extend({
        methods: {
            on: function (eventName, callback) {
                this.$off(eventName);
                return this.$on(eventName, callback);
            }
        }
    });
});
function isOwn$(o, p) {
    return {}.hasOwnProperty.call(o, p);
}
function extends$(child, parent) {
    for (var key in parent)
        if (isOwn$(parent, key))
            child[key] = parent[key];
    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
}
function in$(member, list) {
    for (var i = 0, length = list.length; i < length; ++i)
        if (i in list && list[i] === member)
            return true;
    return false;
}
void function () {
    var Battler, Component, Skill, Target;
    Component = Wdr.UI.Components.Base.Component;
    Skill = Component.extend({
        template: '<button v-on=\'click: onClick(this)\'>{{name}}</span>',
        methods: {
            onClick: function () {
                return this.$dispatch('skill-selected', this.$data.skillId);
            }
        }
    });
    Battler = Component.extend({ template: '<div>\n  lv.{{lv}} : {{name}}\n  HP: {{hp.current}}/{{hp.max}}\n  wt: {{wt.current}}/{{wt.max}}\n</div>' });
    Target = Component.extend({
        template: '<button v-on=\'click: onClick(this)\'>{{name}}</span>\n<span>HP: {{hp.current}}/{{hp.max}}</span>',
        methods: {
            onClick: function () {
                return this.$dispatch('target-selected', this.$data.id);
            }
        }
    });
    _module_('Wdr.UI.Components', function (Wdr, UI, Components) {
        this.Battle = Component.extend({
            components: {
                battler: Battler,
                skill: Skill,
                target: Target
            },
            template: '<h2>Players</h2>\n\n<ul class=\'players\'>\n  <li v-repeat=\'players\' v-component=\'battler\'></li>\n</ul>\n\n<h2>Enemies</h2>\n\n<ul class=\'enemies\'>\n  <li v-repeat=\'enemies\' v-component=\'battler\'></li>\n</ul>\n\n<div v-show=\'onUserInput\'>\n  <div v-show=\'inputState == "skill-select"\'>\n    <h2>SkillSelector</h2>\n    <ul class=\'skills\'>\n      <li v-repeat=\'skills\' v-component=\'skill\'></li>\n    </ul>\n  </div>\n\n  <div v-show=\'inputState == "target-select"\'>\n    <h2>TargetSelector</h2>\n    <ul class=\'targets\'>\n      <li v-repeat=\'targets\' v-component=\'target\'></li>\n    </ul>\n  </div>\n</div>\n\n<h2>Log</h2>\n<ul class=\'logs\'>\n  <li v-repeat=\'log\'>\n    {{message}}\n  </li>\n</ul>'
        });
    });
    function isOwn$(o, p) {
        return {}.hasOwnProperty.call(o, p);
    }
    function extends$(child, parent) {
        for (var key in parent)
            if (isOwn$(parent, key))
                child[key] = parent[key];
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }
    function in$(member, list) {
        for (var i = 0, length = list.length; i < length; ++i)
            if (i in list && list[i] === member)
                return true;
        return false;
    }
}.call(this);
void function () {
    var Component;
    Component = Wdr.UI.Components.Base.Component;
    _module_('Wdr.UI.Components.Camp', function (Wdr, UI, Components, Camp) {
        this.Camp = Component.extend({ template: '<h1>Camp</h1>\n<div>\n  name: {{playerName}}\n</div>\n\n<div>\n  gold: {{gold}}\n</div>\n\n<a href=\'dungeon-select\'>\u30c0\u30f3\u30b8\u30e7\u30f3\u3078</a>\n<a href=\'\'>\u30ed\u30b0\u30a2\u30a6\u30c8</a>\n\n<button v-dispatcher=\'debug-add-gold\'>add coin</button>\n<button v-dispatcher=\'save\'>save</button>' });
    });
    function isOwn$(o, p) {
        return {}.hasOwnProperty.call(o, p);
    }
    function extends$(child, parent) {
        for (var key in parent)
            if (isOwn$(parent, key))
                child[key] = parent[key];
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }
    function in$(member, list) {
        for (var i = 0, length = list.length; i < length; ++i)
            if (i in list && list[i] === member)
                return true;
        return false;
    }
}.call(this);
void function () {
    var Component;
    Component = Wdr.UI.Components.Base.Component;
    _module_('Wdr.UI.Components', function (Wdr, UI, Components) {
        this.DungeonSelect = Component.extend({
            template: '<ul>\n  <li v-repeat=\'dungeons\'>\n    <a href=\'/dungeons/{{href}}\'>\n      {{name}}\n    </a>\n  </li>\n</ul>',
            data: {
                dungeons: [{
                        name: '\u8a66\u7df4\u306e\u68ee',
                        href: 'tutorial'
                    }]
            }
        });
    });
    function isOwn$(o, p) {
        return {}.hasOwnProperty.call(o, p);
    }
    function extends$(child, parent) {
        for (var key in parent)
            if (isOwn$(parent, key))
                child[key] = parent[key];
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }
    function in$(member, list) {
        for (var i = 0, length = list.length; i < length; ++i)
            if (i in list && list[i] === member)
                return true;
        return false;
    }
}.call(this);
void function () {
    var Component;
    Component = Wdr.UI.Components.Base.Component;
    _module_('Wdr.UI.Components', function (Wdr, UI, Components) {
        this.Dungeon = Component.extend({ template: '<h1>\u30c0\u30f3\u30b8\u30e7\u30f3: {{name}}</h1>\n<button v-dispatcher=\'search\'>\u63a2\u3059</button>\n<button v-dispatcher=\'start-battle\'>\u6226\u95d8</button>' });
    });
    function isOwn$(o, p) {
        return {}.hasOwnProperty.call(o, p);
    }
    function extends$(child, parent) {
        for (var key in parent)
            if (isOwn$(parent, key))
                child[key] = parent[key];
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }
    function in$(member, list) {
        for (var i = 0, length = list.length; i < length; ++i)
            if (i in list && list[i] === member)
                return true;
        return false;
    }
}.call(this);
void function () {
    var Component;
    Component = Wdr.UI.Components.Base.Component;
    _module_('Wdr.UI.Components.Entry', function (Wdr, UI, Components, Entry) {
        this.Entry = Component.extend({
            template: '<h1>\u5192\u967a\u3092\u59cb\u3081\u308b</h1>\n<ul>\n  <li v-repeat=\'saveObjects\'>\n    {{name}} / gold: {{gold}}\n    <button v-on=\'click:selectGame(this)\'>\u306f\u3058\u3081\u308b</button>\n  </li>\n</ul>',
            methods: {
                selectGame: function (saveObject) {
                    return this.$dispatch('game-selected', saveObject);
                }
            }
        });
    });
    function isOwn$(o, p) {
        return {}.hasOwnProperty.call(o, p);
    }
    function extends$(child, parent) {
        for (var key in parent)
            if (isOwn$(parent, key))
                child[key] = parent[key];
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }
    function in$(member, list) {
        for (var i = 0, length = list.length; i < length; ++i)
            if (i in list && list[i] === member)
                return true;
        return false;
    }
}.call(this);
void function () {
    var Component;
    Component = Wdr.UI.Components.Base.Component;
    _module_('Wdr.UI.Components.Layout', function (Wdr, UI, Components, Layout) {
        this.Layout = Component.extend({
            template: '<header v-show=\'showHeader\'>\n  <a href=\'/camp\'>Camp</a>\n  <button v-on=\'click: clearStorages\'>\u521d\u671f\u5316</button>\n</header>\n<div id=\'scene-root\'></div>',
            methods: {
                clearStorages: function () {
                    return localforage.clear().then(function () {
                        Warden.navigate('/');
                        return window.location.reload();
                    });
                }
            }
        });
    });
    function isOwn$(o, p) {
        return {}.hasOwnProperty.call(o, p);
    }
    function extends$(child, parent) {
        for (var key in parent)
            if (isOwn$(parent, key))
                child[key] = parent[key];
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }
    function in$(member, list) {
        for (var i = 0, length = list.length; i < length; ++i)
            if (i in list && list[i] === member)
                return true;
        return false;
    }
}.call(this);
void function () {
    var Layout;
    Layout = Wdr.UI.Components.Layout.Layout;
    _module_('Wdr.Controllers.Base', function (Wdr, Controllers, Base) {
        this.Controller = function (super$) {
            extends$(Controller, super$);
            function Controller() {
                super$.apply(this, arguments);
            }
            Controller.prototype.beforeAction = function () {
                this.layout = this.reuse(Layout);
                this.layout.$appendTo('body');
                return this.layout.$data.showHeader = true;
            };
            return Controller;
        }(Warden.Controller);
    });
    Warden.prototype.findController = function (controllerName) {
        return Wdr.Controllers[controllerName + 'Controller'];
    };
    function isOwn$(o, p) {
        return {}.hasOwnProperty.call(o, p);
    }
    function extends$(child, parent) {
        for (var key in parent)
            if (isOwn$(parent, key))
                child[key] = parent[key];
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }
    function in$(member, list) {
        for (var i = 0, length = list.length; i < length; ++i)
            if (i in list && list[i] === member)
                return true;
        return false;
    }
}.call(this);
void function () {
    var Battle, Controller;
    Controller = Wdr.Controllers.Base.Controller;
    Battle = Wdr.UI.Components.Battle;
    _module_('Wdr.Controllers', function (Wdr, Controllers) {
        0;
        0;
        0;
        this.BattleController = function (super$) {
            extends$(BattleController, super$);
            function BattleController() {
                var instance$;
                instance$ = this;
                this.startGameLoop = function () {
                    return BattleController.prototype.startGameLoop.apply(instance$, arguments);
                };
                this.sync = function () {
                    return BattleController.prototype.sync.apply(instance$, arguments);
                };
                this.processReport = function (a, b) {
                    return BattleController.prototype.processReport.apply(instance$, arguments);
                };
                super$.apply(this, arguments);
            }
            BattleController.prototype.index = function () {
                var battle;
                this.battle = battle = this.reuse(Battle);
                this.battle.$appendTo('#scene-root');
                this.session = new Wdr.Services.BattleSession();
                this.battle.$data = this.session.toJSON();
                this.battle.$data.log = [{ message: '\u958b\u59cb' }];
                this.battle.$data.onUserInput = false;
                this.battle.$data.skills = [
                    {
                        name: '\u653b\u6483',
                        skillId: 'attack'
                    },
                    {
                        name: '\u9632\u5fa1',
                        skillId: 'defenece'
                    }
                ];
                return setTimeout(function (this$) {
                    return function () {
                        return this$.startGameLoop();
                    };
                }(this));
            };
            BattleController.prototype.waitUserInput = function (actorId) {
                return new Promise(function (this$) {
                    return function (done) {
                        var story;
                        Story = function (super$1) {
                            extends$(Story, super$1);
                            Story.prototype.steps = {
                                start: 'waitSkillSelect',
                                waitSkillSelect: [
                                    'waitTargetSelect',
                                    'end'
                                ],
                                waitTargetSelect: [
                                    'waitSkillSelect',
                                    'end'
                                ]
                            };
                            function Story(param$, param$1) {
                                var instance$;
                                instance$ = this;
                                this.waitTargetSelect = function (a) {
                                    return Story.prototype.waitTargetSelect.apply(instance$, arguments);
                                };
                                this.waitSkillSelect = function (a) {
                                    return Story.prototype.waitSkillSelect.apply(instance$, arguments);
                                };
                                this.battle = param$;
                                this.session = param$1;
                                Story.__super__.constructor.apply(this, arguments);
                            }
                            Story.prototype.waitSkillSelect = function (context) {
                                return new Promise(function (this$1) {
                                    return function (done) {
                                        console.log('story start');
                                        this$1.battle.$data.inputState = 'skill-select';
                                        return this$1.battle.$on('skill-selected', function (this$2) {
                                            return function (skillId) {
                                                this$2.battle.$off('skill-selected');
                                                context.skillId = skillId;
                                                return done('waitTargetSelect');
                                            };
                                        }(this$1));
                                    };
                                }(this));
                            };
                            Story.prototype.waitTargetSelect = function (context) {
                                return new Promise(function (this$1) {
                                    return function (done) {
                                        this$1.battle.$data.inputState = 'target-select';
                                        this$1.battle.$data.targets = this$1.session.enemies.map(function (e) {
                                            return e.toJSON();
                                        }).filter(function (e) {
                                            return e.hp.current > 0;
                                        });
                                        return this$1.battle.$on('target-selected', function (this$2) {
                                            return function (targetId) {
                                                this$2.battle.$off('target-selected');
                                                context.targetId = targetId;
                                                return done('end');
                                            };
                                        }(this$1));
                                    };
                                }(this));
                            };
                            return Story;
                        }(Libretto);
                        this$.log('\u5165\u529b\u3092\u5f85\u3063\u3066\u3044\u307e\u3059...');
                        story = new Story(this$.battle, this$.session);
                        return story.ready().then(function (context) {
                            context.actorId = actorId;
                            return done(context);
                        });
                    };
                }(this));
            };
            BattleController.prototype.log = function (message) {
                console.log(message);
                this.battle.$data.log.unshift({ message: message });
                if (this.battle.$data.log.length > 5)
                    return this.battle.$data.log.pop();
            };
            BattleController.prototype.processReport = function (p, report) {
                return new Promise(function (this$) {
                    return function (done) {
                        return p.then(function (this$1) {
                            return function () {
                                return setTimeout(function (this$2) {
                                    return function () {
                                        switch (report.eventType) {
                                        case 'action':
                                            if (report.log)
                                                this$2.log(report.log);
                                            return done();
                                        case 'stopForUserInput':
                                            this$2.battle.$data.onUserInput = true;
                                            return this$2.waitUserInput(report.battlerId).then(function (this$3) {
                                                return function (userInput) {
                                                    this$3.session.execAction(userInput);
                                                    this$3.sync();
                                                    this$3.battle.$data.onUserInput = false;
                                                    return done();
                                                };
                                            }(this$2));
                                        default:
                                            throw 'unknown event type:' + report.eventType;
                                        }
                                    };
                                }(this$1), 50);
                            };
                        }(this$));
                    };
                }(this));
            };
            BattleController.prototype.sync = function () {
                var battler, battlerVM;
                return function (accum$) {
                    for (var cache$ = [].concat(this.battle.$data.players, this.battle.$data.enemies), i$ = 0, length$ = cache$.length; i$ < length$; ++i$) {
                        battlerVM = cache$[i$];
                        battler = this.session.findBattlerById(battlerVM.id);
                        battlerVM.wt.current = battler.wt.current;
                        accum$.push(battlerVM.hp.current = battler.hp.current);
                    }
                    return accum$;
                }.call(this, []);
            };
            BattleController.prototype.startGameLoop = function () {
                var update;
                return (update = function (this$) {
                    return function () {
                        return this$.session.processTurn().then(function (this$1) {
                            return function (reports) {
                                return reports.reduce(this$1.processReport, Promise.resolve()).then(function (this$2) {
                                    return function () {
                                        return setTimeout(function (this$3) {
                                            return function () {
                                                this$3.sync();
                                                return update();
                                            };
                                        }(this$2), 50);
                                    };
                                }(this$1));
                            };
                        }(this$));
                    };
                }(this))();
            };
            return BattleController;
        }(Controller);
    });
    function isOwn$(o, p) {
        return {}.hasOwnProperty.call(o, p);
    }
    function extends$(child, parent) {
        for (var key in parent)
            if (isOwn$(parent, key))
                child[key] = parent[key];
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }
    function in$(member, list) {
        for (var i = 0, length = list.length; i < length; ++i)
            if (i in list && list[i] === member)
                return true;
        return false;
    }
}.call(this);
void function () {
    var Camp;
    Camp = Wdr.UI.Components.Camp.Camp;
    _module_('Wdr.Controllers', function (Wdr, Controllers) {
        this.CampController = function (super$) {
            extends$(CampController, super$);
            function CampController() {
                super$.apply(this, arguments);
            }
            CampController.prototype.index = function () {
                var camp;
                camp = this.reuse(Camp);
                camp.$appendTo('#scene-root');
                camp.$data.playerName = wdr.currentSession.name;
                camp.$data.gold = wdr.currentSession.gold;
                camp.on('debug-add-gold', function () {
                    var gold;
                    gold = camp.$data.gold + 100;
                    camp.$data.gold = gold;
                    return wdr.currentSession.gold = gold;
                });
                return camp.on('save', function () {
                    return wdr.currentSession.save().done(function () {
                        return console.log('save done');
                    });
                });
            };
            return CampController;
        }(Controllers.Base.Controller);
    });
    function isOwn$(o, p) {
        return {}.hasOwnProperty.call(o, p);
    }
    function extends$(child, parent) {
        for (var key in parent)
            if (isOwn$(parent, key))
                child[key] = parent[key];
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }
    function in$(member, list) {
        for (var i = 0, length = list.length; i < length; ++i)
            if (i in list && list[i] === member)
                return true;
        return false;
    }
}.call(this);
void function () {
    var Controller, Dungeon;
    Controller = Wdr.Controllers.Base.Controller;
    Dungeon = Wdr.UI.Components.Dungeon;
    _module_('Wdr.Controllers', function (Wdr, Controllers) {
        this.DungeonController = function (super$) {
            extends$(DungeonController, super$);
            function DungeonController() {
                super$.apply(this, arguments);
            }
            DungeonController.prototype.index = function (req) {
                var dungeon;
                dungeon = this.reuse(Dungeon);
                dungeon.$appendTo('#scene-root');
                dungeon.$data.name = req.name;
                return dungeon.on('start-battle', function (this$) {
                    return function () {
                        wdr.context = {
                            from: location.hash,
                            enemies: ['goblin']
                        };
                        return this$.navigate('battle');
                    };
                }(this));
            };
            return DungeonController;
        }(Controller);
    });
    function isOwn$(o, p) {
        return {}.hasOwnProperty.call(o, p);
    }
    function extends$(child, parent) {
        for (var key in parent)
            if (isOwn$(parent, key))
                child[key] = parent[key];
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }
    function in$(member, list) {
        for (var i = 0, length = list.length; i < length; ++i)
            if (i in list && list[i] === member)
                return true;
        return false;
    }
}.call(this);
void function () {
    var Controller, DungeonSelect;
    Controller = Wdr.Controllers.Base.Controller;
    DungeonSelect = Wdr.UI.Components.DungeonSelect;
    _module_('Wdr.Controllers', function (Wdr, Controllers) {
        this.DungeonSelectController = function (super$) {
            extends$(DungeonSelectController, super$);
            function DungeonSelectController() {
                super$.apply(this, arguments);
            }
            DungeonSelectController.prototype.index = function () {
                var dungeonSelect;
                dungeonSelect = this.reuse(DungeonSelect);
                return dungeonSelect.$appendTo('#scene-root');
            };
            return DungeonSelectController;
        }(Controller);
    });
    function isOwn$(o, p) {
        return {}.hasOwnProperty.call(o, p);
    }
    function extends$(child, parent) {
        for (var key in parent)
            if (isOwn$(parent, key))
                child[key] = parent[key];
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }
    function in$(member, list) {
        for (var i = 0, length = list.length; i < length; ++i)
            if (i in list && list[i] === member)
                return true;
        return false;
    }
}.call(this);
void function () {
    var Entry;
    Entry = Wdr.UI.Components.Entry.Entry;
    _module_('Wdr.Controllers', function (Wdr, Controllers) {
        this.EntryController = function (super$) {
            extends$(EntryController, super$);
            function EntryController() {
                super$.apply(this, arguments);
            }
            EntryController.prototype.index = function () {
                return new Promise(function (this$) {
                    return function (done) {
                        var entry;
                        this$.layout.$data.showHeader = false;
                        delete localStorage.currentPlayerId;
                        entry = this$.reuse(Entry);
                        Wdr.Storages.SaveObject.find().then(function (saveObjects) {
                            entry.$data.saveObjects = saveObjects;
                            entry.$appendTo('#scene-root');
                            return done();
                        });
                        return entry.on('game-selected', function (this$1) {
                            return function (saveObject) {
                                wdr.currentSession = Wdr.Application.createPlaySession(saveObject);
                                localStorage.currentPlayerId = saveObject.id;
                                return this$1.navigate('camp');
                            };
                        }(this$));
                    };
                }(this));
            };
            return EntryController;
        }(Controllers.Base.Controller);
    });
    function isOwn$(o, p) {
        return {}.hasOwnProperty.call(o, p);
    }
    function extends$(child, parent) {
        for (var key in parent)
            if (isOwn$(parent, key))
                child[key] = parent[key];
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }
    function in$(member, list) {
        for (var i = 0, length = list.length; i < length; ++i)
            if (i in list && list[i] === member)
                return true;
        return false;
    }
}.call(this);
Wdr.createRoutes = function (router) {
    router.match('', 'Entry#index');
    router.match('camp', 'Camp#index');
    router.match('dungeon-select', 'DungeonSelect#index');
    router.match('dungeons/:name', 'Dungeon#index');
    return router.match('battle', 'Battle#index');
};
function isOwn$(o, p) {
    return {}.hasOwnProperty.call(o, p);
}
function extends$(child, parent) {
    for (var key in parent)
        if (isOwn$(parent, key))
            child[key] = parent[key];
    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
}
function in$(member, list) {
    for (var i = 0, length = list.length; i < length; ++i)
        if (i in list && list[i] === member)
            return true;
    return false;
}
_module_('Wdr', function (Wdr) {
    this.Application = function () {
        0;
        0;
        Application.createPlaySession = function (saveObject) {
            var session;
            session = new Wdr.Services.PlaySession();
            session.saveId = saveObject.id;
            session.name = saveObject.name;
            session.gold = saveObject.gold;
            return session;
        };
        Application.prototype.savePlaySession = function () {
        };
        0;
        function Application() {
        }
        return Application;
    }();
});
function isOwn$(o, p) {
    return {}.hasOwnProperty.call(o, p);
}
function extends$(child, parent) {
    for (var key in parent)
        if (isOwn$(parent, key))
            child[key] = parent[key];
    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
}
function in$(member, list) {
    for (var i = 0, length = list.length; i < length; ++i)
        if (i in list && list[i] === member)
            return true;
    return false;
}
void function () {
    var initializeStorages, restoreLastSession, startRouter;
    localforage.setDriver('localStorageWrapper');
    initializeStorages = function () {
        return new Promise(function (done) {
            return Momic.Model.setup({
                name: 'wdr',
                collections: { saves: {} }
            }).then(function () {
                if (null != localStorage.getItem('dbInitialized')) {
                    return done();
                } else {
                    return Wdr.Storages.SaveObject.insert([
                        {
                            name: 'mizchi',
                            gold: 0
                        },
                        {
                            name: 'smurph',
                            gold: 100000
                        }
                    ]).then(function () {
                        localStorage.setItem('dbInitialized', 'initialized');
                        return done();
                    });
                }
            });
        });
    };
    restoreLastSession = function () {
        return new Promise(function (done) {
            return Wdr.Storages.SaveObject.findOne({ id: localStorage.currentPlayerId }).then(function (saveObject) {
                wdr.currentSession = Wdr.Application.createPlaySession(saveObject);
                return done();
            });
        });
    };
    startRouter = function () {
        Warden.replaceLinksToHashChange();
        return Wdr.createRoutes(new Warden());
    };
    $(function () {
        return initializeStorages().then(function () {
            window.wdr = new Wdr.Application();
            if (localStorage.currentPlayerId) {
                return restoreLastSession().then(function () {
                    return startRouter();
                });
            } else {
                return startRouter();
            }
        });
    });
    function isOwn$(o, p) {
        return {}.hasOwnProperty.call(o, p);
    }
    function extends$(child, parent) {
        for (var key in parent)
            if (isOwn$(parent, key))
                child[key] = parent[key];
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }
    function in$(member, list) {
        for (var i = 0, length = list.length; i < length; ++i)
            if (i in list && list[i] === member)
                return true;
        return false;
    }
}.call(this);