var _include_,_module_;_module_=function(e){return function(t,n,r){var i,s,o,u,a,f,l;r==null&&(r=o),o=(f=typeof window!=="undefined"&&window!==null?window:global)!=null?f:e,r==null&&(r=o),i=[],l=t.split(".");for(u=0,a=l.length;u<a;u++)s=l[u],r[s]==null&&(r[s]={}),r=r[s],i.push(r);return n.apply(r,i)}}(this),_include_=function(e,t){var n,r;for(n in t)r=t[n],e[n]=r;return t};
_module_('_', function (_) {
    0;
});
_module_('Wdr.Utils', function (Wdr, Utils) {
    this.template = function (str, obj) {
        if (null == obj)
            obj = {};
        return jade.compile(str)(obj);
    };
});
window._j = Wdr.Utils.template;
window._cc = function (tpl, obj) {
    if (null == obj)
        obj = {};
    return coffeecup.render(tpl, obj);
};
window._p = function (fullfill, fail) {
    return new Promise(fullfill, fail);
};


_module_('Wdr.Storages', function (Wdr, Storages) {
    this.Actor = function (super$) {
        extends$(Actor, super$);
        function Actor() {
            super$.apply(this, arguments);
        }
        Actor.prototype.key = 'actors';
        0;
        0;
        0;
        0;
        0;
        0;
        return Actor;
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
            },
            $waitAnyOnce: function (events) {
                var cbs, eventName, fn;
                cbs = {};
                return function (accum$) {
                    for (eventName in events) {
                        fn = events[eventName];
                        accum$.push(function (this$) {
                            return function (eventName, fn) {
                                return this$.$on(eventName, cbs[eventName] = function (this$1) {
                                    return function () {
                                        var k, v;
                                        for (k in cbs) {
                                            v = cbs[k];
                                            this$1.$off(k, v);
                                        }
                                        return fn.apply(null, [].slice.call(arguments));
                                    };
                                }(this$));
                            };
                        }(this)(eventName, fn));
                    }
                    return accum$;
                }.call(this, []);
            },
            $j: function (query) {
                return $(this.$el).find(query);
            },
            $velocity: function (query) {
                var args, cache$;
                args = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
                return (cache$ = this.$j(query)).velocity.apply(cache$, [].slice.call(args));
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
    _module_('Wdr.UI.Components', function (Wdr, UI, Components) {
        this.BattleResult = Component.extend({
            created: function () {
                return console.log('battle result created');
            },
            data: {
                gold: 50,
                exp: 20,
                rewards: [
                    { itemName: '\u85ac\u8349' },
                    { itemName: '\u9244\u9271\u77f3' }
                ]
            },
            template: _cc(function () {
                h2('You win');
                p(function () {
                    return span('\u7372\u5f97\u30b4\u30fc\u30eb\u30c9: {{gold}}');
                });
                p(function () {
                    return span('\u7372\u5f97\u7d4c\u9a13\u5024: {{exp}}');
                });
                ul(function () {
                    return li({ 'v-repeat': 'rewards' }, function () {
                        return span('{{itemName}}');
                    });
                });
                return button({ 'v-on': 'click: back' }, '\u623b\u308b');
            }),
            methods: {
                back: function () {
                    return this.$dispatch('back');
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
    var Battler, Component, Skill, Target;
    Component = Wdr.UI.Components.Base.Component;
    Skill = Component.extend({
        template: _cc(function () {
            return button({ 'v-on': 'click: onClick(this)' }, '{{name}}');
        }),
        methods: {
            onClick: function () {
                return this.$dispatch('skill-selected', this.$data.skillId);
            }
        }
    });
    Battler = Component.extend({
        template: _cc(function () {
            return div({ 'class': 'battler' }, function () {
                span('lv.{{lv}} : {{name}}');
                span('HP: {{hp.current}}/{{hp.max}}');
                return span('wt: {{wt.current}}/{{wt.max}}');
            });
        })
    });
    Target = Component.extend({
        template: _cc(function () {
            return button({ 'v-on': 'click: onClick(this)' }, function () {
                return text('{{name}}:HP:{{hp.current}}/{{hp.max}}');
            });
        }),
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
            template: _cc(function () {
                return div({ 'class': 'battle-container' }, function () {
                    ul({ 'class': 'players' }, function () {
                        return li({
                            'v-repeat': 'players',
                            'v-component': 'battler'
                        });
                    });
                    ul({ 'class': 'enemies' }, function () {
                        return li({
                            'v-repeat': 'enemies',
                            'v-component': 'battler'
                        });
                    });
                    div({
                        'class': 'user-controller',
                        'v-show': 'onUserInput'
                    }, function () {
                        div({ 'v-show': 'inputState == \'skill-select\'' }, function () {
                            return ul({ 'class': 'skills' }, function () {
                                return li({
                                    'v-repeat': 'skills',
                                    'v-component': 'skill'
                                });
                            });
                        });
                        return div({ 'v-show': 'inputState == \'target-select\'' }, function () {
                            return ul({ 'class': 'targets' }, function () {
                                li({
                                    'v-repeat': 'targets',
                                    'v-component': 'target'
                                });
                                return li(function () {
                                    return button({ 'v-dispatcher': 'back-to-skill-select' }, function () {
                                        return '\u623b\u308b';
                                    });
                                });
                            });
                        });
                    });
                    hr();
                    return ul({ 'class': 'logs' }, function () {
                        return li({ 'v-repeat': 'log' }, function () {
                            return '{{message}}';
                        });
                    });
                });
            })
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
    _module_('Wdr.UI.Components.Camp', function (Wdr, UI, Components, Camp) {
        this.Camp = Component.extend({
            template: _cc(function () {
                h1('Camp');
                text('name: {{playerName}}');
                div('gold: {{gold}}');
                return ul({ 'class': 'menu' }, function () {
                    li(function () {
                        return a({ href: 'dungeon-select' }, function () {
                            return '\u30c0\u30f3\u30b8\u30e7\u30f3\u3078';
                        });
                    });
                    li(function () {
                        return a(function () {
                            return '\u88c5\u5099';
                        });
                    });
                    li(function () {
                        return a(function () {
                            return '\u30b9\u30ad\u30eb';
                        });
                    });
                    li(function () {
                        return a(function () {
                            return '\u30b7\u30e7\u30c3\u30d7';
                        });
                    });
                    return li(function () {
                        return a({ href: '' }, '\u30ed\u30b0\u30a2\u30a6\u30c8');
                    });
                });
            })
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
    _module_('Wdr.UI.Components', function (Wdr, UI, Components) {
        this.DungeonSelect = Component.extend({
            template: _cc(function () {
                h2('\u30c0\u30f3\u30b8\u30e7\u30f3\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044');
                return ul(function () {
                    return li({ 'v-repeat': 'dungeons' }, function () {
                        return a({ href: 'dungeons/{{href}}' }, '{{name}}');
                    });
                });
            }),
            data: {
                dungeons: [{
                        name: '\u30c1\u30e5\u30fc\u30c8\u30ea\u30a2\u30eb\u30b9\u30c6\u30fc\u30b8',
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
}.call(this);
void function () {
    var Component;
    Component = Wdr.UI.Components.Base.Component;
    _module_('Wdr.UI.Components', function (Wdr, UI, Components) {
        var Cell;
        Cell = Component.extend({
            template: _cc(function () {
                return span('{{$index}}');
            })
        });
        this.Dungeon = Component.extend({
            components: { cell: Cell },
            template: _cc(function () {
                return div({ 'class': 'dungeon-container' }, function () {
                    h1('\u30c0\u30f3\u30b8\u30e7\u30f3: {{name}}');
                    button({ 'v-dispatcher': 'search' }, '\u63a2\u3059');
                    button({ 'v-dispatcher': 'start-battle' }, '\u6226\u95d8');
                    return button({ 'v-dispatcher': 'back' }, '\u623b\u308b');
                });
            })
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
    _module_('Wdr.UI.Components.Entry', function (Wdr, UI, Components, Entry) {
        this.Entry = Component.extend({
            template: _cc(function () {
                return div({ 'class': 'entry-container' }, function () {
                    h1('RPG(\u4eee) proto5');
                    hr();
                    h2('\u5192\u967a\u3092\u59cb\u3081\u308b');
                    ul({ 'class': 'save-data-list' }, function () {
                        return li({ 'v-repeat': 'saveObjects' }, function () {
                            span({ 'class': 'text' }, '\u30c7\u30fc\u30bf{{$index}}:');
                            span({ 'class': 'text' }, '{{name}}');
                            span({ 'class': 'text' }, '${{gold}}');
                            return button({ 'v-on': 'click:selectGame(this)' }, '\u306f\u3058\u3081\u308b');
                        });
                    });
                    return p('\u6ce8\u610f: mizchi\u304c\u958b\u767a\u3057\u3066\u3044\u308bRPG\u306e\u30d7\u30ed\u30c8\u30bf\u30a4\u30d7\u3067\u3059\u3002\u4e88\u544a\u306a\u304f\u30c7\u30fc\u30bf\u306e\u4e92\u63db\u6027\u304c\u58ca\u308c\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002');
                });
            }),
            attached: function () {
                console.log('attached');
                this.$j('h1').css({ opacity: 0 });
                return this.$j('h1').velocity({ opacity: 1 }, 1000);
            },
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
        0;
        this.Layout = Component.extend({
            template: _cc(function () {
                div({ id: 'wdr-container' }, function () {
                    return div({ id: 'scene-root' });
                });
                return header({
                    'class': 'debug-header',
                    'v-show': 'showHeader',
                    'v-transition': true
                }, function () {
                    text('debug');
                    button({ 'v-on': 'click: toCamp' }, '\u30ad\u30e3\u30f3\u30d7\u3078');
                    button({ 'v-on': 'click: addGold' }, function () {
                        return '\u30b4\u30fc\u30eb\u30c9\u5897\u52a0';
                    });
                    button({ 'v-on': 'click: save' }, 'save');
                    return button({ 'v-on': 'click: clearStorages' }, '\u521d\u671f\u5316');
                });
            }),
            methods: {
                toCamp: function () {
                    return Warden.navigate('camp');
                },
                clearStorages: function () {
                    return localforage.clear().then(function () {
                        Warden.navigate('/');
                        return window.location.reload();
                    });
                },
                addGold: function () {
                    return wdr.currentSession.gold += 100;
                },
                save: function () {
                    return wdr.currentSession.save().done(function () {
                        return console.log('save done');
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
                this.vm = battle = this.reuse(Battle);
                this.vm.$appendTo('#scene-root');
                this.session = new Wdr.Services.BattleSession();
                this.vm.$data = this.session.toJSON();
                this.vm.$data.log = [{ message: '\u958b\u59cb' }];
                this.vm.$data.onUserInput = false;
                return setTimeout(function (this$) {
                    return function () {
                        return this$.startGameLoop();
                    };
                }(this));
            };
            BattleController.prototype.waitUserInput = function (actorId) {
                return new Promise(function (this$) {
                    return function (done) {
                        var UserInputStory;
                        UserInputStory = Libretto.extend({
                            steps: {
                                start: 'waitSkillSelect',
                                waitSkillSelect: [
                                    'waitTargetSelect',
                                    'end'
                                ],
                                waitTargetSelect: [
                                    'waitSkillSelect',
                                    'end'
                                ]
                            },
                            waitSkillSelect: function (this$1) {
                                return function (userInputContext) {
                                    return new Promise(function (this$2) {
                                        return function (done) {
                                            var getSkills;
                                            this$2.vm.$data.inputState = 'skill-select';
                                            getSkills = function () {
                                                return [
                                                    {
                                                        name: '\u653b\u6483',
                                                        skillId: 'attack',
                                                        targetType: 'single'
                                                    },
                                                    {
                                                        name: '\u9632\u5fa1',
                                                        skillId: 'defenece',
                                                        targetType: 'none'
                                                    },
                                                    {
                                                        name: '\u9003\u8d70',
                                                        skillId: 'escape',
                                                        targetType: 'none'
                                                    }
                                                ];
                                            };
                                            this$2.vm.$data.skills = getSkills();
                                            return this$2.vm.$on('skill-selected', function (this$3) {
                                                return function (skillId) {
                                                    var skill, skills;
                                                    this$3.vm.$off('skill-selected');
                                                    skills = getSkills();
                                                    skill = _.find(skills, { skillId: skillId });
                                                    userInputContext.skillId = skill.skillId;
                                                    switch (skill.targetType) {
                                                    case 'single':
                                                        return done('waitTargetSelect');
                                                    case 'none':
                                                        return done('end');
                                                    }
                                                };
                                            }(this$2));
                                        };
                                    }(this$1));
                                };
                            }(this$),
                            waitTargetSelect: function (this$1) {
                                return function (userInputContext) {
                                    return new Promise(function (this$2) {
                                        return function (done) {
                                            this$2.vm.$data.inputState = 'target-select';
                                            this$2.vm.$data.targets = this$2.session.enemies.map(function (e) {
                                                return e.toJSON();
                                            }).filter(function (e) {
                                                return e.hp.current > 0;
                                            });
                                            return this$2.vm.$waitAnyOnce({
                                                'target-selected': function (targetId) {
                                                    userInputContext.targetId = targetId;
                                                    return done('end');
                                                },
                                                'back-to-skill-select': function () {
                                                    return done('waitSkillSelect');
                                                }
                                            });
                                        };
                                    }(this$1));
                                };
                            }(this$)
                        });
                        this$.log('\u5165\u529b\u3092\u5f85\u3063\u3066\u3044\u307e\u3059...');
                        return new UserInputStory().ready().then(function (context) {
                            context.actorId = actorId;
                            return done(context);
                        });
                    };
                }(this));
            };
            BattleController.prototype.log = function (message) {
                console.log(message);
                this.vm.$data.log.unshift({ message: message });
                if (this.vm.$data.log.length > 5)
                    return this.vm.$data.log.pop();
            };
            BattleController.prototype.processReport = function (p, report) {
                return new Promise(function (this$) {
                    return function (done, reject) {
                        return p.then(function (this$1) {
                            return function () {
                                return setTimeout(function (this$2) {
                                    return function () {
                                        switch (report.eventType) {
                                        case 'player-win':
                                            this$2.stopped = true;
                                            return reject();
                                        case 'enemy-win':
                                            this$2.stopped = true;
                                            return reject();
                                        case 'action':
                                            if (report.log)
                                                this$2.log(report.log);
                                            return done();
                                        case 'stopForUserInput':
                                            this$2.vm.$data.onUserInput = true;
                                            return this$2.waitUserInput(report.battlerId).then(function (this$3) {
                                                return function (userInput) {
                                                    this$3.session.execAction(userInput);
                                                    this$3.sync();
                                                    this$3.vm.$data.onUserInput = false;
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
                    for (var cache$ = [].concat(this.vm.$data.players, this.vm.$data.enemies), i$ = 0, length$ = cache$.length; i$ < length$; ++i$) {
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
                        var reports;
                        reports = this$.session.processTurn();
                        return reports.reduce(this$.processReport, Promise.resolve()).then(function (this$1) {
                            return function () {
                                return setTimeout(function (this$2) {
                                    return function () {
                                        this$2.sync();
                                        return update();
                                    };
                                }(this$1), 50);
                            };
                        }(this$), function (this$1) {
                            return function () {
                                return this$1.end();
                            };
                        }(this$));
                    };
                }(this))();
            };
            BattleController.prototype.end = function () {
                return this.navigate('battle-result');
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
}.call(this);
void function () {
    var BattleResult, Controller;
    Controller = Wdr.Controllers.Base.Controller;
    BattleResult = Wdr.UI.Components.BattleResult;
    _module_('Wdr.Controllers', function (Wdr, Controllers) {
        this.BattleResultController = function (super$) {
            extends$(BattleResultController, super$);
            function BattleResultController() {
                super$.apply(this, arguments);
            }
            BattleResultController.prototype.index = function () {
                this.vm = this.reuse(BattleResult);
                this.vm.$appendTo('#scene-root');
                return this.vm.on('back', function (this$) {
                    return function () {
                        console.log('battle result');
                        if (localStorage.resumePoint) {
                            return this$.navigate(localStorage.resumePoint);
                        } else {
                            return this$.navigate('camp');
                        }
                    };
                }(this));
            };
            return BattleResultController;
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
                return camp.$data.gold = wdr.currentSession.gold;
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
    var Controller, createDummyDungeon, Dungeon;
    Controller = Wdr.Controllers.Base.Controller;
    Dungeon = Wdr.UI.Components.Dungeon;
    createDummyDungeon = function () {
        return [
            [
                1,
                1,
                1,
                1,
                1,
                1,
                1
            ],
            [
                1,
                0,
                0,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                1,
                1,
                1,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                1
            ],
            [
                1,
                0,
                1,
                1,
                0,
                0,
                1
            ],
            [
                1,
                0,
                1,
                0,
                0,
                1,
                1
            ],
            [
                1,
                1,
                1,
                1,
                1,
                1,
                1
            ]
        ];
    };
    _module_('Wdr.Controllers', function (Wdr, Controllers) {
        this.DungeonController = function (super$) {
            extends$(DungeonController, super$);
            function DungeonController() {
                super$.apply(this, arguments);
            }
            DungeonController.prototype.index = function (req) {
                this.vm = this.reuse(Dungeon);
                this.vm.$appendTo('#scene-root');
                this.vm.$data.name = req.name;
                this.vm.$data.cells = _.flatten(createDummyDungeon());
                localStorage.resumePoint = location.hash;
                this.vm.on('start-battle', function (this$) {
                    return function () {
                        wdr.context = {
                            from: location.hash,
                            enemies: ['goblin']
                        };
                        return this$.navigate('battle');
                    };
                }(this));
                return this.vm.on('back', function (this$) {
                    return function () {
                        return this$.navigate('camp');
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
                            entry.$data.saveObjects = _.clone(saveObjects);
                            entry.$appendTo('#scene-root');
                            return done();
                        });
                        return entry.on('game-selected', function (this$1) {
                            return function (saveObject) {
                                return wdr.loadPlaySession(saveObject).then(function (this$2) {
                                    return function () {
                                        localStorage.currentPlayerId = saveObject.id;
                                        return this$2.navigate('camp');
                                    };
                                }(this$1));
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
    router.match('camp', 'Camp#index');
    router.match('dungeon-select', 'DungeonSelect#index');
    router.match('dungeons/:name', 'Dungeon#index');
    router.match('battle', 'Battle#index');
    return router.match('battle-result', 'BattleResult#index');
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
        Application.prototype.loadPlaySession = function (saveObject) {
            return new Promise(function (this$) {
                return function (done) {
                    this$.currentSession = new Wdr.Services.PlaySession();
                    this$.currentSession.saveId = saveObject.id;
                    this$.currentSession.name = saveObject.name;
                    this$.currentSession.gold = saveObject.gold;
                    return Wdr.Storages.Actor.find({ ownerId: saveObject.id }).then(function (this$1) {
                        return function (actors) {
                            this$1.currentSession.actors = actors.map(function (actor) {
                                return Wdr.Entities.Actor.create(actor);
                            });
                            this$1.loaded = true;
                            return done();
                        };
                    }(this$));
                };
            }(this));
        };
        Application.prototype.savePlaySession = function () {
        };
        0;
        function Application() {
            var instance$;
            instance$ = this;
            this.loadPlaySession = function (a) {
                return Application.prototype.loadPlaySession.apply(instance$, arguments);
            };
            this.events = [];
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
    var createCheatSave, createDummySave, initializeStorages, restoreLastSession, startRouter;
    localforage.setDriver('localStorageWrapper');
    createDummySave = function () {
        return new Promise(function (done) {
            return Wdr.Storages.SaveObject.insert({
                name: 'mizchi',
                gold: 0
            }).then(function (param$) {
                var save;
                save = param$[0];
                return Wdr.Storages.Actor.insert({
                    ownerId: save.id,
                    name: 'mizchi',
                    lv: 1,
                    job: 'novice',
                    status: {
                        str: 10,
                        int: 10,
                        dex: 10
                    }
                }).then(function (param$1) {
                    var member;
                    member = param$1[0];
                    save.partyMemberIds = [member.id];
                    return save.save().then(function () {
                        return done();
                    });
                });
            });
        });
    };
    createCheatSave = function () {
        return new Promise(function (done) {
            return Wdr.Storages.SaveObject.insert({
                name: 'cheater',
                gold: 100000
            }).then(function (param$) {
                var save;
                save = param$[0];
                return Wdr.Storages.Actor.insert({
                    ownerSaveId: save.id,
                    name: 'cheater',
                    lv: 100,
                    job: 'novice',
                    status: {
                        str: 30,
                        int: 30,
                        dex: 30
                    }
                }).then(function (param$1) {
                    var member;
                    member = param$1[0];
                    save.partyMemberIds = [member.id];
                    return save.save().then(function () {
                        return done();
                    });
                });
            });
        });
    };
    initializeStorages = function () {
        return new Promise(function (done) {
            return Momic.Model.setup({
                name: 'wdr',
                collections: {
                    saves: {},
                    actors: {}
                }
            }).then(function () {
                if (null != localStorage.getItem('dbInitialized'))
                    return done();
                return Promise.all([
                    createDummySave(),
                    createCheatSave()
                ]).then(function () {
                    localStorage.setItem('dbInitialized', 'initialized');
                    return done();
                });
            });
        });
    };
    restoreLastSession = function () {
        return new Promise(function (done) {
            return Wdr.Storages.SaveObject.findOne({ id: localStorage.currentPlayerId }).then(function (saveObject) {
                return wdr.loadPlaySession(saveObject).then(function () {
                    return done();
                });
            });
        });
    };
    startRouter = function () {
        Warden.replaceLinksToHashChange();
        return Wdr.createRoutes(new Warden());
    };
    $(function () {
        $('body').empty();
        FastClick.attach(document.body);
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
    window.addEventListener('mousedown', function (e) {
        return e.preventDefault();
    }, false);
    window.addEventListener('mousemove', function (e) {
        return e.preventDefault();
    }, false);
    window.addEventListener('mouseup', function (e) {
        return e.preventDefault();
    }, false);
    window.addEventListener('touchstart', function (e) {
        return e.preventDefault();
    }, false);
    window.addEventListener('touchmove', function (e) {
        return e.preventDefault();
    }, false);
    window.addEventListener('touchend', function (e) {
        return e.preventDefault();
    }, false);
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