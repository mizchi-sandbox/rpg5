var _include_,_module_;_module_=function(e){return function(t,n,r){var i,s,o,u,a,f,l;r==null&&(r=o),o=(f=typeof window!=="undefined"&&window!==null?window:global)!=null?f:e,r==null&&(r=o),i=[],l=t.split(".");for(u=0,a=l.length;u<a;u++)s=l[u],r[s]==null&&(r[s]={}),r=r[s],i.push(r);return n.apply(r,i)}}(this),_include_=function(e,t){var n,r;for(n in t)r=t[n],e[n]=r;return t};
_module_('_', function (_) {
    0;
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
    this.PlaySession = function () {
        0;
        0;
        0;
        function PlaySession() {
            this.gold = 0;
        }
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
void function () {
    var Component;
    Component = Wdr.UI.Components.Base.Component;
    _module_('Wdr.UI.Components.Camp', function (Wdr, UI, Components, Camp) {
        this.Camp = Component.extend({ template: '<h1>Camp</h1>' });
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
}.call(this);
void function () {
    var Component;
    Component = Wdr.UI.Components.Base.Component;
    _module_('Wdr.UI.Components.Layout', function (Wdr, UI, Components, Layout) {
        this.Layout = Component.extend({ template: '<header>\n  <a href=\'/\'>Home</a>\n  <a href=\'/camp\'>Camp</a>\n</header>\n<div id=\'scene-root\'></div>' });
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
                return this.layout.$appendTo('body');
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
                return camp;
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
                        entry = this$.reuse(Entry);
                        Wdr.Storages.SaveObject.find().then(function (saveObjects) {
                            entry.$data.saveObjects = saveObjects;
                            entry.$appendTo('#scene-root');
                            return done();
                        });
                        return entry.on('game-selected', function (this$1) {
                            return function (saveObject) {
                                wdr.currentSession = Wdr.Application.createPlaySession(saveObject);
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
}.call(this);
Wdr.createRoutes = function (router) {
    router.match('', 'Entry#index');
    return router.match('camp', 'Camp#index');
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
_module_('Wdr', function (Wdr) {
    this.Application = function () {
        0;
        Application.createPlaySession = function (saveObject) {
            var session;
            session = new Wdr.Services.PlaySession();
            session.saveId = saveObject.id;
            session.name = saveObject.name;
            return session.gold = saveObject.gold;
        };
        Application.prototype.savePlaySession = function () {
        };
        0;
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
void function () {
    var initializeStorages;
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
    0;
    $(function () {
        return localforage.clear().then(function () {
            return initializeStorages().then(function () {
                window.wdr = new Wdr.Application();
                Wdr.createRoutes(new Warden());
                return Warden.replaceLinksToHashChange();
            });
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
}.call(this);