var _include_,_module_;_module_=function(e){return function(t,n,r){var i,s,o,u,a,f,l;r==null&&(r=o),o=(f=typeof window!=="undefined"&&window!==null?window:global)!=null?f:e,r==null&&(r=o),i=[],l=t.split(".");for(u=0,a=l.length;u<a;u++)s=l[u],r[s]==null&&(r[s]={}),r=r[s],i.push(r);return n.apply(r,i)}}(this),_include_=function(e,t){var n,r;for(n in t)r=t[n],e[n]=r;return t};
_module_('Wdr.ValueObjects', function (Wdr, ValueObjects) {
    this.ValueWithMax = function () {
        function ValueWithMax(param$, param$1) {
            this.current = param$;
            this.max = param$1;
        }
        return ValueWithMax;
    }();
});
_module_('Wdr.Domains', function (Wdr, Domains) {
    this.Player = function () {
        function Player() {
        }
        ;
        return Player;
    }();
});
_module_('Wdr.Service', function (Wdr, Service) {
    this.PlaySession = function () {
        0;
        function PlaySession() {
            this.gold = 0;
        }
        return PlaySession;
    }();
});
_module_('Wdr.Storages', function (Wdr, Storages) {
    this.SaveObject = function (super$) {
        extends$(SaveObject, super$);
        function SaveObject() {
            super$.apply(this, arguments);
        }
        SaveObject.prototype.key = 'saves';
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
_module_('Wdr.Component.Base', function (Wdr, Component, Base) {
    this.Component = Vue.extend({ methods: {} });
});
Vue.prototype.dispose = function () {
    this.$destroy();
    return console.info('dispose');
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

_module_('Wdr.Controllers.Base', function (Wdr, Controllers, Base) {
    this.Controller = function (super$) {
        extends$(Controller, super$);
        function Controller() {
            super$.apply(this, arguments);
        }
        Controller.prototype.beforeAction = function () {
        };
        Controller.prototype.afterAction = function () {
        };
        return Controller;
    }(Warden.Controller);
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
_module_('Wdr.Controllers', function (Wdr, Controllers) {
    this.EntryController = function (super$) {
        extends$(EntryController, super$);
        function EntryController() {
            super$.apply(this, arguments);
        }
        EntryController.prototype.beforeAction = function () {
            return console.log('before action');
        };
        EntryController.prototype.index = function () {
            return console.log('index');
        };
        EntryController.prototype.afterAction = function () {
            return console.log('after action');
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
void function () {
    var initializeStorages, SaveObject;
    SaveObject = Wdr.Storages.SaveObject;
    initializeStorages = function () {
        return new Promise(function (done) {
            return Momic.Model.setup({
                name: 'wdr',
                collections: { saves: {} }
            }).then(done);
        });
    };
    Warden.prototype.findController = function (controllerName) {
        return Wdr.Controllers[controllerName + 'Controller'];
    };
    $(function () {
        var router;
        localforage.clear().then(function () {
            return initializeStorages().then(function () {
                var saveObject;
                saveObject = new SaveObject();
                saveObject.name = 'mizchi';
                saveObject.gold = 0;
                return saveObject.save().then(function () {
                    console.log('save done!');
                    return SaveObject.find().then(function (saveObjects) {
                        return console.log(saveObjects);
                    });
                });
            });
        });
        router = new Warden();
        return router.match('', 'Entry#index');
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