(() => {
    var __webpack_modules__ = {
        957: (module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.d(__webpack_exports__, {
                ML: () => _gsScope,
                MQ: () => SimpleTimeline,
                SX: () => Ease,
                VN: () => TweenPlugin,
                ZP: () => TweenLite,
                fw: () => Animation,
                li: () => globals
            });
            module = __webpack_require__.hmd(module);
            /*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */            var _gsScope = "undefined" !== typeof window ? window : true && module.exports && "undefined" !== typeof __webpack_require__.g ? __webpack_require__.g : void 0 || {};
            var TweenLite = function(window) {
                "use strict";
                var _exports = {}, _doc = window.document, _globals = window.GreenSockGlobals = window.GreenSockGlobals || window;
                if (_globals.TweenLite) return _globals.TweenLite;
                var a, i, p, _ticker, _tickerActive, _namespace = function(ns) {
                    var i, a = ns.split("."), p = _globals;
                    for (i = 0; i < a.length; i++) p[a[i]] = p = p[a[i]] || {};
                    return p;
                }, gs = _namespace("com.greensock"), _tinyNum = 1e-8, _slice = function(a) {
                    var i, b = [], l = a.length;
                    for (i = 0; i !== l; b.push(a[i++])) ;
                    return b;
                }, _emptyFunc = function() {}, _isArray = function() {
                    var toString = Object.prototype.toString, array = toString.call([]);
                    return function(obj) {
                        return null != obj && (obj instanceof Array || "object" === typeof obj && !!obj.push && toString.call(obj) === array);
                    };
                }(), _defLookup = {}, Definition = function(ns, dependencies, func, global) {
                    this.sc = _defLookup[ns] ? _defLookup[ns].sc : [];
                    _defLookup[ns] = this;
                    this.gsClass = null;
                    this.func = func;
                    var _classes = [];
                    this.check = function(init) {
                        var cur, a, n, cl, i = dependencies.length, missing = i;
                        while (--i > -1) if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
                            _classes[i] = cur.gsClass;
                            missing--;
                        } else if (init) cur.sc.push(this);
                        if (0 === missing && func) {
                            a = ("com.greensock." + ns).split(".");
                            n = a.pop();
                            cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);
                            if (global) _globals[n] = _exports[n] = cl;
                            for (i = 0; i < this.sc.length; i++) this.sc[i].check();
                        }
                    };
                    this.check(true);
                }, _gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
                    return new Definition(ns, dependencies, func, global);
                }, _class = gs._class = function(ns, func, global) {
                    func = func || function() {};
                    _gsDefine(ns, [], (function() {
                        return func;
                    }), global);
                    return func;
                };
                _gsDefine.globals = _globals;
                var _baseParams = [ 0, 0, 1, 1 ], Ease = _class("easing.Ease", (function(func, extraParams, type, power) {
                    this._func = func;
                    this._type = type || 0;
                    this._power = power || 0;
                    this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
                }), true), _easeMap = Ease.map = {}, _easeReg = Ease.register = function(ease, names, types, create) {
                    var e, name, j, type, na = names.split(","), i = na.length, ta = (types || "easeIn,easeOut,easeInOut").split(",");
                    while (--i > -1) {
                        name = na[i];
                        e = create ? _class("easing." + name, null, true) : gs.easing[name] || {};
                        j = ta.length;
                        while (--j > -1) {
                            type = ta[j];
                            _easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease;
                        }
                    }
                };
                p = Ease.prototype;
                p._calcEnd = false;
                p.getRatio = function(p) {
                    if (this._func) {
                        this._params[0] = p;
                        return this._func.apply(null, this._params);
                    }
                    var t = this._type, pw = this._power, r = 1 === t ? 1 - p : 2 === t ? p : p < .5 ? 2 * p : 2 * (1 - p);
                    if (1 === pw) r *= r; else if (2 === pw) r *= r * r; else if (3 === pw) r *= r * r * r; else if (4 === pw) r *= r * r * r * r;
                    return 1 === t ? 1 - r : 2 === t ? r : p < .5 ? r / 2 : 1 - r / 2;
                };
                a = [ "Linear", "Quad", "Cubic", "Quart", "Quint,Strong" ];
                i = a.length;
                while (--i > -1) {
                    p = a[i] + ",Power" + i;
                    _easeReg(new Ease(null, null, 1, i), p, "easeOut", true);
                    _easeReg(new Ease(null, null, 2, i), p, "easeIn" + (0 === i ? ",easeNone" : ""));
                    _easeReg(new Ease(null, null, 3, i), p, "easeInOut");
                }
                _easeMap.linear = gs.easing.Linear.easeIn;
                _easeMap.swing = gs.easing.Quad.easeInOut;
                var EventDispatcher = _class("events.EventDispatcher", (function(target) {
                    this._listeners = {};
                    this._eventTarget = target || this;
                }));
                p = EventDispatcher.prototype;
                p.addEventListener = function(type, callback, scope, useParam, priority) {
                    priority = priority || 0;
                    var listener, i, list = this._listeners[type], index = 0;
                    if (this === _ticker && !_tickerActive) _ticker.wake();
                    if (null == list) this._listeners[type] = list = [];
                    i = list.length;
                    while (--i > -1) {
                        listener = list[i];
                        if (listener.c === callback && listener.s === scope) list.splice(i, 1); else if (0 === index && listener.pr < priority) index = i + 1;
                    }
                    list.splice(index, 0, {
                        c: callback,
                        s: scope,
                        up: useParam,
                        pr: priority
                    });
                };
                p.removeEventListener = function(type, callback) {
                    var i, list = this._listeners[type];
                    if (list) {
                        i = list.length;
                        while (--i > -1) if (list[i].c === callback) {
                            list.splice(i, 1);
                            return;
                        }
                    }
                };
                p.dispatchEvent = function(type) {
                    var i, t, listener, list = this._listeners[type];
                    if (list) {
                        i = list.length;
                        if (i > 1) list = list.slice(0);
                        t = this._eventTarget;
                        while (--i > -1) {
                            listener = list[i];
                            if (listener) if (listener.up) listener.c.call(listener.s || t, {
                                type,
                                target: t
                            }); else listener.c.call(listener.s || t);
                        }
                    }
                };
                var _reqAnimFrame = window.requestAnimationFrame, _cancelAnimFrame = window.cancelAnimationFrame, _getTime = Date.now || function() {
                    return (new Date).getTime();
                }, _lastUpdate = _getTime();
                a = [ "ms", "moz", "webkit", "o" ];
                i = a.length;
                while (--i > -1 && !_reqAnimFrame) {
                    _reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
                    _cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
                }
                _class("Ticker", (function(fps, useRAF) {
                    var _fps, _req, _id, _gap, _nextTime, _self = this, _startTime = _getTime(), _useRAF = false !== useRAF && _reqAnimFrame ? "auto" : false, _lagThreshold = 500, _adjustedLag = 33, _tickWord = "tick", _tick = function(manual) {
                        var overlap, dispatch, elapsed = _getTime() - _lastUpdate;
                        if (elapsed > _lagThreshold) _startTime += elapsed - _adjustedLag;
                        _lastUpdate += elapsed;
                        _self.time = (_lastUpdate - _startTime) / 1e3;
                        overlap = _self.time - _nextTime;
                        if (!_fps || overlap > 0 || true === manual) {
                            _self.frame++;
                            _nextTime += overlap + (overlap >= _gap ? .004 : _gap - overlap);
                            dispatch = true;
                        }
                        if (true !== manual) _id = _req(_tick);
                        if (dispatch) _self.dispatchEvent(_tickWord);
                    };
                    EventDispatcher.call(_self);
                    _self.time = _self.frame = 0;
                    _self.tick = function() {
                        _tick(true);
                    };
                    _self.lagSmoothing = function(threshold, adjustedLag) {
                        if (!arguments.length) return _lagThreshold < 1 / _tinyNum;
                        _lagThreshold = threshold || 1 / _tinyNum;
                        _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
                    };
                    _self.sleep = function() {
                        if (null == _id) return;
                        if (!_useRAF || !_cancelAnimFrame) clearTimeout(_id); else _cancelAnimFrame(_id);
                        _req = _emptyFunc;
                        _id = null;
                        if (_self === _ticker) _tickerActive = false;
                    };
                    _self.wake = function(seamless) {
                        if (null !== _id) _self.sleep(); else if (seamless) _startTime += -_lastUpdate + (_lastUpdate = _getTime()); else if (_self.frame > 10) _lastUpdate = _getTime() - _lagThreshold + 5;
                        _req = 0 === _fps ? _emptyFunc : !_useRAF || !_reqAnimFrame ? function(f) {
                            return setTimeout(f, 1e3 * (_nextTime - _self.time) + 1 | 0);
                        } : _reqAnimFrame;
                        if (_self === _ticker) _tickerActive = true;
                        _tick(2);
                    };
                    _self.fps = function(value) {
                        if (!arguments.length) return _fps;
                        _fps = value;
                        _gap = 1 / (_fps || 60);
                        _nextTime = this.time + _gap;
                        _self.wake();
                    };
                    _self.useRAF = function(value) {
                        if (!arguments.length) return _useRAF;
                        _self.sleep();
                        _useRAF = value;
                        _self.fps(_fps);
                    };
                    _self.fps(fps);
                    setTimeout((function() {
                        if ("auto" === _useRAF && _self.frame < 5 && "hidden" !== (_doc || {}).visibilityState) _self.useRAF(false);
                    }), 1500);
                }));
                p = gs.Ticker.prototype = new gs.events.EventDispatcher;
                p.constructor = gs.Ticker;
                var Animation = _class("core.Animation", (function(duration, vars) {
                    this.vars = vars = vars || {};
                    this._duration = this._totalDuration = duration || 0;
                    this._delay = Number(vars.delay) || 0;
                    this._timeScale = 1;
                    this._active = !!vars.immediateRender;
                    this.data = vars.data;
                    this._reversed = !!vars.reversed;
                    if (!_rootTimeline) return;
                    if (!_tickerActive) _ticker.wake();
                    var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
                    tl.add(this, tl._time);
                    if (this.vars.paused) this.paused(true);
                }));
                _ticker = Animation.ticker = new gs.Ticker;
                p = Animation.prototype;
                p._dirty = p._gc = p._initted = p._paused = false;
                p._totalTime = p._time = 0;
                p._rawPrevTime = -1;
                p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
                p._paused = false;
                var _checkTimeout = function() {
                    if (_tickerActive && _getTime() - _lastUpdate > 2e3 && ("hidden" !== (_doc || {}).visibilityState || !_ticker.lagSmoothing())) _ticker.wake();
                    var t = setTimeout(_checkTimeout, 2e3);
                    if (t.unref) t.unref();
                };
                _checkTimeout();
                p.play = function(from, suppressEvents) {
                    if (null != from) this.seek(from, suppressEvents);
                    return this.reversed(false).paused(false);
                };
                p.pause = function(atTime, suppressEvents) {
                    if (null != atTime) this.seek(atTime, suppressEvents);
                    return this.paused(true);
                };
                p.resume = function(from, suppressEvents) {
                    if (null != from) this.seek(from, suppressEvents);
                    return this.paused(false);
                };
                p.seek = function(time, suppressEvents) {
                    return this.totalTime(Number(time), false !== suppressEvents);
                };
                p.restart = function(includeDelay, suppressEvents) {
                    return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, false !== suppressEvents, true);
                };
                p.reverse = function(from, suppressEvents) {
                    if (null != from) this.seek(from || this.totalDuration(), suppressEvents);
                    return this.reversed(true).paused(false);
                };
                p.render = function(time, suppressEvents, force) {};
                p.invalidate = function() {
                    this._time = this._totalTime = 0;
                    this._initted = this._gc = false;
                    this._rawPrevTime = -1;
                    if (this._gc || !this.timeline) this._enabled(true);
                    return this;
                };
                p.isActive = function() {
                    var rawTime, tl = this._timeline, startTime = this._startTime;
                    return !tl || !this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime(true)) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale - _tinyNum;
                };
                p._enabled = function(enabled, ignoreTimeline) {
                    if (!_tickerActive) _ticker.wake();
                    this._gc = !enabled;
                    this._active = this.isActive();
                    if (true !== ignoreTimeline) if (enabled && !this.timeline) this._timeline.add(this, this._startTime - this._delay); else if (!enabled && this.timeline) this._timeline._remove(this, true);
                    return false;
                };
                p._kill = function(vars, target) {
                    return this._enabled(false, false);
                };
                p.kill = function(vars, target) {
                    this._kill(vars, target);
                    return this;
                };
                p._uncache = function(includeSelf) {
                    var tween = includeSelf ? this : this.timeline;
                    while (tween) {
                        tween._dirty = true;
                        tween = tween.timeline;
                    }
                    return this;
                };
                p._swapSelfInParams = function(params) {
                    var i = params.length, copy = params.concat();
                    while (--i > -1) if ("{self}" === params[i]) copy[i] = this;
                    return copy;
                };
                p._callback = function(type) {
                    var v = this.vars, callback = v[type], params = v[type + "Params"], scope = v[type + "Scope"] || v.callbackScope || this, l = params ? params.length : 0;
                    switch (l) {
                      case 0:
                        callback.call(scope);
                        break;

                      case 1:
                        callback.call(scope, params[0]);
                        break;

                      case 2:
                        callback.call(scope, params[0], params[1]);
                        break;

                      default:
                        callback.apply(scope, params);
                    }
                };
                p.eventCallback = function(type, callback, params, scope) {
                    if ("on" === (type || "").substr(0, 2)) {
                        var v = this.vars;
                        if (1 === arguments.length) return v[type];
                        if (null == callback) delete v[type]; else {
                            v[type] = callback;
                            v[type + "Params"] = _isArray(params) && -1 !== params.join("").indexOf("{self}") ? this._swapSelfInParams(params) : params;
                            v[type + "Scope"] = scope;
                        }
                        if ("onUpdate" === type) this._onUpdate = callback;
                    }
                    return this;
                };
                p.delay = function(value) {
                    if (!arguments.length) return this._delay;
                    if (this._timeline.smoothChildTiming) this.startTime(this._startTime + value - this._delay);
                    this._delay = value;
                    return this;
                };
                p.duration = function(value) {
                    if (!arguments.length) {
                        this._dirty = false;
                        return this._duration;
                    }
                    this._duration = this._totalDuration = value;
                    this._uncache(true);
                    if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (0 !== value) this.totalTime(this._totalTime * (value / this._duration), true);
                    return this;
                };
                p.totalDuration = function(value) {
                    this._dirty = false;
                    return !arguments.length ? this._totalDuration : this.duration(value);
                };
                p.time = function(value, suppressEvents) {
                    if (!arguments.length) return this._time;
                    if (this._dirty) this.totalDuration();
                    return this.totalTime(value > this._duration ? this._duration : value, suppressEvents);
                };
                p.totalTime = function(time, suppressEvents, uncapped) {
                    if (!_tickerActive) _ticker.wake();
                    if (!arguments.length) return this._totalTime;
                    if (this._timeline) {
                        if (time < 0 && !uncapped) time += this.totalDuration();
                        if (this._timeline.smoothChildTiming) {
                            if (this._dirty) this.totalDuration();
                            var totalDuration = this._totalDuration, tl = this._timeline;
                            if (time > totalDuration && !uncapped) time = totalDuration;
                            this._startTime = (this._paused ? this._pauseTime : tl._time) - (!this._reversed ? time : totalDuration - time) / this._timeScale;
                            if (!tl._dirty) this._uncache(false);
                            if (tl._timeline) while (tl._timeline) {
                                if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) tl.totalTime(tl._totalTime, true);
                                tl = tl._timeline;
                            }
                        }
                        if (this._gc) this._enabled(true, false);
                        if (this._totalTime !== time || 0 === this._duration) {
                            if (_lazyTweens.length) _lazyRender();
                            this.render(time, suppressEvents, false);
                            if (_lazyTweens.length) _lazyRender();
                        }
                    }
                    return this;
                };
                p.progress = p.totalProgress = function(value, suppressEvents) {
                    var duration = this.duration();
                    return !arguments.length ? duration ? this._time / duration : this.ratio : this.totalTime(duration * value, suppressEvents);
                };
                p.startTime = function(value) {
                    if (!arguments.length) return this._startTime;
                    if (value !== this._startTime) {
                        this._startTime = value;
                        if (this.timeline) if (this.timeline._sortChildren) this.timeline.add(this, value - this._delay);
                    }
                    return this;
                };
                p.endTime = function(includeRepeats) {
                    return this._startTime + (false != includeRepeats ? this.totalDuration() : this.duration()) / this._timeScale;
                };
                p.timeScale = function(value) {
                    if (!arguments.length) return this._timeScale;
                    var pauseTime, t;
                    value = value || _tinyNum;
                    if (this._timeline && this._timeline.smoothChildTiming) {
                        pauseTime = this._pauseTime;
                        t = pauseTime || 0 === pauseTime ? pauseTime : this._timeline.totalTime();
                        this._startTime = t - (t - this._startTime) * this._timeScale / value;
                    }
                    this._timeScale = value;
                    t = this.timeline;
                    while (t && t.timeline) {
                        t._dirty = true;
                        t.totalDuration();
                        t = t.timeline;
                    }
                    return this;
                };
                p.reversed = function(value) {
                    if (!arguments.length) return this._reversed;
                    if (value != this._reversed) {
                        this._reversed = value;
                        this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, true);
                    }
                    return this;
                };
                p.paused = function(value) {
                    if (!arguments.length) return this._paused;
                    var raw, elapsed, tl = this._timeline;
                    if (value != this._paused) if (tl) {
                        if (!_tickerActive && !value) _ticker.wake();
                        raw = tl.rawTime();
                        elapsed = raw - this._pauseTime;
                        if (!value && tl.smoothChildTiming) {
                            this._startTime += elapsed;
                            this._uncache(false);
                        }
                        this._pauseTime = value ? raw : null;
                        this._paused = value;
                        this._active = this.isActive();
                        if (!value && 0 !== elapsed && this._initted && this.duration()) {
                            raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
                            this.render(raw, raw === this._totalTime, true);
                        }
                    }
                    if (this._gc && !value) this._enabled(true, false);
                    return this;
                };
                var SimpleTimeline = _class("core.SimpleTimeline", (function(vars) {
                    Animation.call(this, 0, vars);
                    this.autoRemoveChildren = this.smoothChildTiming = true;
                }));
                p = SimpleTimeline.prototype = new Animation;
                p.constructor = SimpleTimeline;
                p.kill()._gc = false;
                p._first = p._last = p._recent = null;
                p._sortChildren = false;
                p.add = p.insert = function(child, position, align, stagger) {
                    var prevTween, st;
                    child._startTime = Number(position || 0) + child._delay;
                    if (child._paused) if (this !== child._timeline) child._pauseTime = this.rawTime() - (child._timeline.rawTime() - child._pauseTime);
                    if (child.timeline) child.timeline._remove(child, true);
                    child.timeline = child._timeline = this;
                    if (child._gc) child._enabled(true, true);
                    prevTween = this._last;
                    if (this._sortChildren) {
                        st = child._startTime;
                        while (prevTween && prevTween._startTime > st) prevTween = prevTween._prev;
                    }
                    if (prevTween) {
                        child._next = prevTween._next;
                        prevTween._next = child;
                    } else {
                        child._next = this._first;
                        this._first = child;
                    }
                    if (child._next) child._next._prev = child; else this._last = child;
                    child._prev = prevTween;
                    this._recent = child;
                    if (this._timeline) this._uncache(true);
                    return this;
                };
                p._remove = function(tween, skipDisable) {
                    if (tween.timeline === this) {
                        if (!skipDisable) tween._enabled(false, true);
                        if (tween._prev) tween._prev._next = tween._next; else if (this._first === tween) this._first = tween._next;
                        if (tween._next) tween._next._prev = tween._prev; else if (this._last === tween) this._last = tween._prev;
                        tween._next = tween._prev = tween.timeline = null;
                        if (tween === this._recent) this._recent = this._last;
                        if (this._timeline) this._uncache(true);
                    }
                    return this;
                };
                p.render = function(time, suppressEvents, force) {
                    var next, tween = this._first;
                    this._totalTime = this._time = this._rawPrevTime = time;
                    while (tween) {
                        next = tween._next;
                        if (tween._active || time >= tween._startTime && !tween._paused && !tween._gc) if (!tween._reversed) tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force); else tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
                        tween = next;
                    }
                };
                p.rawTime = function() {
                    if (!_tickerActive) _ticker.wake();
                    return this._totalTime;
                };
                var TweenLite = _class("TweenLite", (function(target, duration, vars) {
                    Animation.call(this, duration, vars);
                    this.render = TweenLite.prototype.render;
                    if (null == target) throw "Cannot tween a null target.";
                    this.target = target = "string" !== typeof target ? target : TweenLite.selector(target) || target;
                    var i, targ, targets, isSelector = target.jquery || target.length && target !== window && target[0] && (target[0] === window || target[0].nodeType && target[0].style && !target.nodeType), overwrite = this.vars.overwrite;
                    this._overwrite = overwrite = null == overwrite ? _overwriteLookup[TweenLite.defaultOverwrite] : "number" === typeof overwrite ? overwrite >> 0 : _overwriteLookup[overwrite];
                    if ((isSelector || target instanceof Array || target.push && _isArray(target)) && "number" !== typeof target[0]) {
                        this._targets = targets = _slice(target);
                        this._propLookup = [];
                        this._siblings = [];
                        for (i = 0; i < targets.length; i++) {
                            targ = targets[i];
                            if (!targ) {
                                targets.splice(i--, 1);
                                continue;
                            } else if ("string" === typeof targ) {
                                targ = targets[i--] = TweenLite.selector(targ);
                                if ("string" === typeof targ) targets.splice(i + 1, 1);
                                continue;
                            } else if (targ.length && targ !== window && targ[0] && (targ[0] === window || targ[0].nodeType && targ[0].style && !targ.nodeType)) {
                                targets.splice(i--, 1);
                                this._targets = targets = targets.concat(_slice(targ));
                                continue;
                            }
                            this._siblings[i] = _register(targ, this, false);
                            if (1 === overwrite) if (this._siblings[i].length > 1) _applyOverwrite(targ, this, null, 1, this._siblings[i]);
                        }
                    } else {
                        this._propLookup = {};
                        this._siblings = _register(target, this, false);
                        if (1 === overwrite) if (this._siblings.length > 1) _applyOverwrite(target, this, null, 1, this._siblings);
                    }
                    if (this.vars.immediateRender || 0 === duration && 0 === this._delay && false !== this.vars.immediateRender) {
                        this._time = -_tinyNum;
                        this.render(Math.min(0, -this._delay));
                    }
                }), true), _isSelector = function(v) {
                    return v && v.length && v !== window && v[0] && (v[0] === window || v[0].nodeType && v[0].style && !v.nodeType);
                }, _autoCSS = function(vars, target) {
                    var p, css = {};
                    for (p in vars) if (!_reservedProps[p] && (!(p in target) || "transform" === p || "x" === p || "y" === p || "width" === p || "height" === p || "className" === p || "border" === p) && (!_plugins[p] || _plugins[p] && _plugins[p]._autoCSS)) {
                        css[p] = vars[p];
                        delete vars[p];
                    }
                    vars.css = css;
                };
                p = TweenLite.prototype = new Animation;
                p.constructor = TweenLite;
                p.kill()._gc = false;
                p.ratio = 0;
                p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
                p._notifyPluginsOfEnabled = p._lazy = false;
                TweenLite.version = "2.1.3";
                TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
                TweenLite.defaultOverwrite = "auto";
                TweenLite.ticker = _ticker;
                TweenLite.autoSleep = 120;
                TweenLite.lagSmoothing = function(threshold, adjustedLag) {
                    _ticker.lagSmoothing(threshold, adjustedLag);
                };
                TweenLite.selector = window.$ || window.jQuery || function(e) {
                    var selector = window.$ || window.jQuery;
                    if (selector) {
                        TweenLite.selector = selector;
                        return selector(e);
                    }
                    if (!_doc) _doc = window.document;
                    return !_doc ? e : _doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById("#" === e.charAt(0) ? e.substr(1) : e);
                };
                var _lazyTweens = [], _lazyLookup = {}, _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, _relExp = /[\+-]=-?[\.\d]/, _setRatio = function(v) {
                    var val, pt = this._firstPT, min = 1e-6;
                    while (pt) {
                        val = !pt.blob ? pt.c * v + pt.s : 1 === v && null != this.end ? this.end : v ? this.join("") : this.start;
                        if (pt.m) val = pt.m.call(this._tween, val, this._target || pt.t, this._tween); else if (val < min) if (val > -min && !pt.blob) val = 0;
                        if (!pt.f) pt.t[pt.p] = val; else if (pt.fp) pt.t[pt.p](pt.fp, val); else pt.t[pt.p](val);
                        pt = pt._next;
                    }
                }, _blobRound = function(v) {
                    return (1e3 * v | 0) / 1e3 + "";
                }, _blobDif = function(start, end, filter, pt) {
                    var startNums, endNums, num, i, l, nonNumbers, currentNum, a = [], charIndex = 0, s = "", color = 0;
                    a.start = start;
                    a.end = end;
                    start = a[0] = start + "";
                    end = a[1] = end + "";
                    if (filter) {
                        filter(a);
                        start = a[0];
                        end = a[1];
                    }
                    a.length = 0;
                    startNums = start.match(_numbersExp) || [];
                    endNums = end.match(_numbersExp) || [];
                    if (pt) {
                        pt._next = null;
                        pt.blob = 1;
                        a._firstPT = a._applyPT = pt;
                    }
                    l = endNums.length;
                    for (i = 0; i < l; i++) {
                        currentNum = endNums[i];
                        nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex) - charIndex);
                        s += nonNumbers || !i ? nonNumbers : ",";
                        charIndex += nonNumbers.length;
                        if (color) color = (color + 1) % 5; else if ("rgba(" === nonNumbers.substr(-5)) color = 1;
                        if (currentNum === startNums[i] || startNums.length <= i) s += currentNum; else {
                            if (s) {
                                a.push(s);
                                s = "";
                            }
                            num = parseFloat(startNums[i]);
                            a.push(num);
                            a._firstPT = {
                                _next: a._firstPT,
                                t: a,
                                p: a.length - 1,
                                s: num,
                                c: ("=" === currentNum.charAt(1) ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : parseFloat(currentNum) - num) || 0,
                                f: 0,
                                m: color && color < 4 ? Math.round : _blobRound
                            };
                        }
                        charIndex += currentNum.length;
                    }
                    s += end.substr(charIndex);
                    if (s) a.push(s);
                    a.setRatio = _setRatio;
                    if (_relExp.test(end)) a.end = null;
                    return a;
                }, _addPropTween = function(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
                    if ("function" === typeof end) end = end(index || 0, target);
                    var blob, type = typeof target[prop], getterName = "function" !== type ? "" : prop.indexOf("set") || "function" !== typeof target["get" + prop.substr(3)] ? prop : "get" + prop.substr(3), s = "get" !== start ? start : !getterName ? target[prop] : funcParam ? target[getterName](funcParam) : target[getterName](), isRelative = "string" === typeof end && "=" === end.charAt(1), pt = {
                        t: target,
                        p: prop,
                        s,
                        f: "function" === type,
                        pg: 0,
                        n: overwriteProp || prop,
                        m: !mod ? 0 : "function" === typeof mod ? mod : Math.round,
                        pr: 0,
                        c: isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : parseFloat(end) - s || 0
                    };
                    if ("number" !== typeof s || "number" !== typeof end && !isRelative) if (funcParam || isNaN(s) || !isRelative && isNaN(end) || "boolean" === typeof s || "boolean" === typeof end) {
                        pt.fp = funcParam;
                        blob = _blobDif(s, isRelative ? parseFloat(pt.s) + pt.c + (pt.s + "").replace(/[0-9\-\.]/g, "") : end, stringFilter || TweenLite.defaultStringFilter, pt);
                        pt = {
                            t: blob,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 2,
                            pg: 0,
                            n: overwriteProp || prop,
                            pr: 0,
                            m: 0
                        };
                    } else {
                        pt.s = parseFloat(s);
                        if (!isRelative) pt.c = parseFloat(end) - pt.s || 0;
                    }
                    if (pt.c) {
                        if (pt._next = this._firstPT) pt._next._prev = pt;
                        this._firstPT = pt;
                        return pt;
                    }
                }, _internals = TweenLite._internals = {
                    isArray: _isArray,
                    isSelector: _isSelector,
                    lazyTweens: _lazyTweens,
                    blobDif: _blobDif
                }, _plugins = TweenLite._plugins = {}, _tweenLookup = _internals.tweenLookup = {}, _tweenLookupNum = 0, _reservedProps = _internals.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1,
                    id: 1,
                    yoyoEase: 1,
                    stagger: 1
                }, _overwriteLookup = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    true: 1,
                    false: 0
                }, _rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline, _rootTimeline = Animation._rootTimeline = new SimpleTimeline, _nextGCFrame = 30, _lazyRender = _internals.lazyRender = function() {
                    var i, tween, l = _lazyTweens.length;
                    _lazyLookup = {};
                    for (i = 0; i < l; i++) {
                        tween = _lazyTweens[i];
                        if (tween && false !== tween._lazy) {
                            tween.render(tween._lazy[0], tween._lazy[1], true);
                            tween._lazy = false;
                        }
                    }
                    _lazyTweens.length = 0;
                };
                _rootTimeline._startTime = _ticker.time;
                _rootFramesTimeline._startTime = _ticker.frame;
                _rootTimeline._active = _rootFramesTimeline._active = true;
                setTimeout(_lazyRender, 1);
                Animation._updateRoot = TweenLite.render = function() {
                    var i, a, p;
                    if (_lazyTweens.length) _lazyRender();
                    _rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
                    _rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
                    if (_lazyTweens.length) _lazyRender();
                    if (_ticker.frame >= _nextGCFrame) {
                        _nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);
                        for (p in _tweenLookup) {
                            a = _tweenLookup[p].tweens;
                            i = a.length;
                            while (--i > -1) if (a[i]._gc) a.splice(i, 1);
                            if (0 === a.length) delete _tweenLookup[p];
                        }
                        p = _rootTimeline._first;
                        if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && 1 === _ticker._listeners.tick.length) {
                            while (p && p._paused) p = p._next;
                            if (!p) _ticker.sleep();
                        }
                    }
                };
                _ticker.addEventListener("tick", Animation._updateRoot);
                var _register = function(target, tween, scrub) {
                    var a, i, id = target._gsTweenID;
                    if (!_tweenLookup[id || (target._gsTweenID = id = "t" + _tweenLookupNum++)]) _tweenLookup[id] = {
                        target,
                        tweens: []
                    };
                    if (tween) {
                        a = _tweenLookup[id].tweens;
                        a[i = a.length] = tween;
                        if (scrub) while (--i > -1) if (a[i] === tween) a.splice(i, 1);
                    }
                    return _tweenLookup[id].tweens;
                }, _onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {
                    var r1, r2, func = overwrittenTween.vars.onOverwrite;
                    if (func) r1 = func(overwrittenTween, overwritingTween, target, killedProps);
                    func = TweenLite.onOverwrite;
                    if (func) r2 = func(overwrittenTween, overwritingTween, target, killedProps);
                    return false !== r1 && false !== r2;
                }, _applyOverwrite = function(target, tween, props, mode, siblings) {
                    var i, changed, curTween, l;
                    if (1 === mode || mode >= 4) {
                        l = siblings.length;
                        for (i = 0; i < l; i++) if ((curTween = siblings[i]) !== tween) {
                            if (!curTween._gc) if (curTween._kill(null, target, tween)) changed = true;
                        } else if (5 === mode) break;
                        return changed;
                    }
                    var globalStart, startTime = tween._startTime + _tinyNum, overlaps = [], oCount = 0, zeroDur = 0 === tween._duration;
                    i = siblings.length;
                    while (--i > -1) if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) ; else if (curTween._timeline !== tween._timeline) {
                        globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
                        if (0 === _checkOverlap(curTween, globalStart, zeroDur)) overlaps[oCount++] = curTween;
                    } else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 2 * _tinyNum)) overlaps[oCount++] = curTween;
                    i = oCount;
                    while (--i > -1) {
                        curTween = overlaps[i];
                        l = curTween._firstPT;
                        if (2 === mode) if (curTween._kill(props, target, tween)) changed = true;
                        if (2 !== mode || !curTween._firstPT && curTween._initted && l) {
                            if (2 !== mode && !_onOverwrite(curTween, tween)) continue;
                            if (curTween._enabled(false, false)) changed = true;
                        }
                    }
                    return changed;
                }, _checkOverlap = function(tween, reference, zeroDur) {
                    var tl = tween._timeline, ts = tl._timeScale, t = tween._startTime;
                    while (tl._timeline) {
                        t += tl._startTime;
                        ts *= tl._timeScale;
                        if (tl._paused) return -100;
                        tl = tl._timeline;
                    }
                    t /= ts;
                    return t > reference ? t - reference : zeroDur && t === reference || !tween._initted && t - reference < 2 * _tinyNum ? _tinyNum : (t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum ? 0 : t - reference - _tinyNum;
                };
                p._init = function() {
                    var i, initPlugins, pt, p, startVars, l, v = this.vars, op = this._overwrittenProps, dur = this._duration, immediate = !!v.immediateRender, ease = v.ease, startAt = this._startAt;
                    if (v.startAt) {
                        if (startAt) {
                            startAt.render(-1, true);
                            startAt.kill();
                        }
                        startVars = {};
                        for (p in v.startAt) startVars[p] = v.startAt[p];
                        startVars.data = "isStart";
                        startVars.overwrite = false;
                        startVars.immediateRender = true;
                        startVars.lazy = immediate && false !== v.lazy;
                        startVars.startAt = startVars.delay = null;
                        startVars.onUpdate = v.onUpdate;
                        startVars.onUpdateParams = v.onUpdateParams;
                        startVars.onUpdateScope = v.onUpdateScope || v.callbackScope || this;
                        this._startAt = TweenLite.to(this.target || {}, 0, startVars);
                        if (immediate) if (this._time > 0) this._startAt = null; else if (0 !== dur) return;
                    } else if (v.runBackwards && 0 !== dur) if (startAt) {
                        startAt.render(-1, true);
                        startAt.kill();
                        this._startAt = null;
                    } else {
                        if (0 !== this._time) immediate = false;
                        pt = {};
                        for (p in v) if (!_reservedProps[p] || "autoCSS" === p) pt[p] = v[p];
                        pt.overwrite = 0;
                        pt.data = "isFromStart";
                        pt.lazy = immediate && false !== v.lazy;
                        pt.immediateRender = immediate;
                        this._startAt = TweenLite.to(this.target, 0, pt);
                        if (!immediate) {
                            this._startAt._init();
                            this._startAt._enabled(false);
                            if (this.vars.immediateRender) this._startAt = null;
                        } else if (0 === this._time) return;
                    }
                    this._ease = ease = !ease ? TweenLite.defaultEase : ease instanceof Ease ? ease : "function" === typeof ease ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
                    if (v.easeParams instanceof Array && ease.config) this._ease = ease.config.apply(ease, v.easeParams);
                    this._easeType = this._ease._type;
                    this._easePower = this._ease._power;
                    this._firstPT = null;
                    if (this._targets) {
                        l = this._targets.length;
                        for (i = 0; i < l; i++) if (this._initProps(this._targets[i], this._propLookup[i] = {}, this._siblings[i], op ? op[i] : null, i)) initPlugins = true;
                    } else initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
                    if (initPlugins) TweenLite._onPluginEvent("_onInitAllProps", this);
                    if (op) if (!this._firstPT) if ("function" !== typeof this.target) this._enabled(false, false);
                    if (v.runBackwards) {
                        pt = this._firstPT;
                        while (pt) {
                            pt.s += pt.c;
                            pt.c = -pt.c;
                            pt = pt._next;
                        }
                    }
                    this._onUpdate = v.onUpdate;
                    this._initted = true;
                };
                p._initProps = function(target, propLookup, siblings, overwrittenProps, index) {
                    var p, i, initPlugins, plugin, pt, v;
                    if (null == target) return false;
                    if (_lazyLookup[target._gsTweenID]) _lazyRender();
                    if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (false !== this.vars.autoCSS) _autoCSS(this.vars, target);
                    for (p in this.vars) {
                        v = this.vars[p];
                        if (_reservedProps[p]) {
                            if (v) if (v instanceof Array || v.push && _isArray(v)) if (-1 !== v.join("").indexOf("{self}")) this.vars[p] = v = this._swapSelfInParams(v, this);
                        } else if (_plugins[p] && (plugin = new _plugins[p])._onInitTween(target, this.vars[p], this, index)) {
                            this._firstPT = pt = {
                                _next: this._firstPT,
                                t: plugin,
                                p: "setRatio",
                                s: 0,
                                c: 1,
                                f: 1,
                                n: p,
                                pg: 1,
                                pr: plugin._priority,
                                m: 0
                            };
                            i = plugin._overwriteProps.length;
                            while (--i > -1) propLookup[plugin._overwriteProps[i]] = this._firstPT;
                            if (plugin._priority || plugin._onInitAllProps) initPlugins = true;
                            if (plugin._onDisable || plugin._onEnable) this._notifyPluginsOfEnabled = true;
                            if (pt._next) pt._next._prev = pt;
                        } else propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
                    }
                    if (overwrittenProps) if (this._kill(overwrittenProps, target)) return this._initProps(target, propLookup, siblings, overwrittenProps, index);
                    if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
                        this._kill(propLookup, target);
                        return this._initProps(target, propLookup, siblings, overwrittenProps, index);
                    }
                    if (this._firstPT) if (false !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) _lazyLookup[target._gsTweenID] = true;
                    return initPlugins;
                };
                p.render = function(time, suppressEvents, force) {
                    var isComplete, callback, pt, rawPrevTime, self = this, prevTime = self._time, duration = self._duration, prevRawPrevTime = self._rawPrevTime;
                    if (time >= duration - _tinyNum && time >= 0) {
                        self._totalTime = self._time = duration;
                        self.ratio = self._ease._calcEnd ? self._ease.getRatio(1) : 1;
                        if (!self._reversed) {
                            isComplete = true;
                            callback = "onComplete";
                            force = force || self._timeline.autoRemoveChildren;
                        }
                        if (0 === duration) if (self._initted || !self.vars.lazy || force) {
                            if (self._startTime === self._timeline._duration) time = 0;
                            if (prevRawPrevTime < 0 || time <= 0 && time >= -_tinyNum || prevRawPrevTime === _tinyNum && "isPause" !== self.data) if (prevRawPrevTime !== time) {
                                force = true;
                                if (prevRawPrevTime > _tinyNum) callback = "onReverseComplete";
                            }
                            self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum;
                        }
                    } else if (time < _tinyNum) {
                        self._totalTime = self._time = 0;
                        self.ratio = self._ease._calcEnd ? self._ease.getRatio(0) : 0;
                        if (0 !== prevTime || 0 === duration && prevRawPrevTime > 0) {
                            callback = "onReverseComplete";
                            isComplete = self._reversed;
                        }
                        if (time > -_tinyNum) time = 0; else if (time < 0) {
                            self._active = false;
                            if (0 === duration) if (self._initted || !self.vars.lazy || force) {
                                if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && "isPause" === self.data)) force = true;
                                self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum;
                            }
                        }
                        if (!self._initted || self._startAt && self._startAt.progress()) force = true;
                    } else {
                        self._totalTime = self._time = time;
                        if (self._easeType) {
                            var r = time / duration, type = self._easeType, pow = self._easePower;
                            if (1 === type || 3 === type && r >= .5) r = 1 - r;
                            if (3 === type) r *= 2;
                            if (1 === pow) r *= r; else if (2 === pow) r *= r * r; else if (3 === pow) r *= r * r * r; else if (4 === pow) r *= r * r * r * r;
                            self.ratio = 1 === type ? 1 - r : 2 === type ? r : time / duration < .5 ? r / 2 : 1 - r / 2;
                        } else self.ratio = self._ease.getRatio(time / duration);
                    }
                    if (self._time === prevTime && !force) return; else if (!self._initted) {
                        self._init();
                        if (!self._initted || self._gc) return; else if (!force && self._firstPT && (false !== self.vars.lazy && self._duration || self.vars.lazy && !self._duration)) {
                            self._time = self._totalTime = prevTime;
                            self._rawPrevTime = prevRawPrevTime;
                            _lazyTweens.push(self);
                            self._lazy = [ time, suppressEvents ];
                            return;
                        }
                        if (self._time && !isComplete) self.ratio = self._ease.getRatio(self._time / duration); else if (isComplete && self._ease._calcEnd) self.ratio = self._ease.getRatio(0 === self._time ? 0 : 1);
                    }
                    if (false !== self._lazy) self._lazy = false;
                    if (!self._active) if (!self._paused && self._time !== prevTime && time >= 0) self._active = true;
                    if (0 === prevTime) {
                        if (self._startAt) if (time >= 0) self._startAt.render(time, true, force); else if (!callback) callback = "_dummyGS";
                        if (self.vars.onStart) if (0 !== self._time || 0 === duration) if (!suppressEvents) self._callback("onStart");
                    }
                    pt = self._firstPT;
                    while (pt) {
                        if (pt.f) pt.t[pt.p](pt.c * self.ratio + pt.s); else pt.t[pt.p] = pt.c * self.ratio + pt.s;
                        pt = pt._next;
                    }
                    if (self._onUpdate) {
                        if (time < 0) if (self._startAt && -1e-4 !== time) self._startAt.render(time, true, force);
                        if (!suppressEvents) if (self._time !== prevTime || isComplete || force) self._callback("onUpdate");
                    }
                    if (callback) if (!self._gc || force) {
                        if (time < 0 && self._startAt && !self._onUpdate && -1e-4 !== time) self._startAt.render(time, true, force);
                        if (isComplete) {
                            if (self._timeline.autoRemoveChildren) self._enabled(false, false);
                            self._active = false;
                        }
                        if (!suppressEvents && self.vars[callback]) self._callback(callback);
                        if (0 === duration && self._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) self._rawPrevTime = 0;
                    }
                };
                p._kill = function(vars, target, overwritingTween) {
                    if ("all" === vars) vars = null;
                    if (null == vars) if (null == target || target === this.target) {
                        this._lazy = false;
                        return this._enabled(false, false);
                    }
                    target = "string" !== typeof target ? target || this._targets || this.target : TweenLite.selector(target) || target;
                    var i, overwrittenProps, p, pt, propLookup, changed, killProps, record, killed, simultaneousOverwrite = overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline, firstPT = this._firstPT;
                    if ((_isArray(target) || _isSelector(target)) && "number" !== typeof target[0]) {
                        i = target.length;
                        while (--i > -1) if (this._kill(vars, target[i], overwritingTween)) changed = true;
                    } else {
                        if (this._targets) {
                            i = this._targets.length;
                            while (--i > -1) if (target === this._targets[i]) {
                                propLookup = this._propLookup[i] || {};
                                this._overwrittenProps = this._overwrittenProps || [];
                                overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
                                break;
                            }
                        } else if (target !== this.target) return false; else {
                            propLookup = this._propLookup;
                            overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
                        }
                        if (propLookup) {
                            killProps = vars || propLookup;
                            record = vars !== overwrittenProps && "all" !== overwrittenProps && vars !== propLookup && ("object" !== typeof vars || !vars._tempKill);
                            if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
                                for (p in killProps) if (propLookup[p]) {
                                    if (!killed) killed = [];
                                    killed.push(p);
                                }
                                if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) return false;
                            }
                            for (p in killProps) {
                                if (pt = propLookup[p]) {
                                    if (simultaneousOverwrite) {
                                        if (pt.f) pt.t[pt.p](pt.s); else pt.t[pt.p] = pt.s;
                                        changed = true;
                                    }
                                    if (pt.pg && pt.t._kill(killProps)) changed = true;
                                    if (!pt.pg || 0 === pt.t._overwriteProps.length) {
                                        if (pt._prev) pt._prev._next = pt._next; else if (pt === this._firstPT) this._firstPT = pt._next;
                                        if (pt._next) pt._next._prev = pt._prev;
                                        pt._next = pt._prev = null;
                                    }
                                    delete propLookup[p];
                                }
                                if (record) overwrittenProps[p] = 1;
                            }
                            if (!this._firstPT && this._initted && firstPT) this._enabled(false, false);
                        }
                    }
                    return changed;
                };
                p.invalidate = function() {
                    if (this._notifyPluginsOfEnabled) TweenLite._onPluginEvent("_onDisable", this);
                    var t = this._time;
                    this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
                    this._notifyPluginsOfEnabled = this._active = this._lazy = false;
                    this._propLookup = this._targets ? {} : [];
                    Animation.prototype.invalidate.call(this);
                    if (this.vars.immediateRender) {
                        this._time = -_tinyNum;
                        this.render(t, false, false !== this.vars.lazy);
                    }
                    return this;
                };
                p._enabled = function(enabled, ignoreTimeline) {
                    if (!_tickerActive) _ticker.wake();
                    if (enabled && this._gc) {
                        var i, targets = this._targets;
                        if (targets) {
                            i = targets.length;
                            while (--i > -1) this._siblings[i] = _register(targets[i], this, true);
                        } else this._siblings = _register(this.target, this, true);
                    }
                    Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
                    if (this._notifyPluginsOfEnabled) if (this._firstPT) return TweenLite._onPluginEvent(enabled ? "_onEnable" : "_onDisable", this);
                    return false;
                };
                TweenLite.to = function(target, duration, vars) {
                    return new TweenLite(target, duration, vars);
                };
                TweenLite.from = function(target, duration, vars) {
                    vars.runBackwards = true;
                    vars.immediateRender = false != vars.immediateRender;
                    return new TweenLite(target, duration, vars);
                };
                TweenLite.fromTo = function(target, duration, fromVars, toVars) {
                    toVars.startAt = fromVars;
                    toVars.immediateRender = false != toVars.immediateRender && false != fromVars.immediateRender;
                    return new TweenLite(target, duration, toVars);
                };
                TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
                    return new TweenLite(callback, 0, {
                        delay,
                        onComplete: callback,
                        onCompleteParams: params,
                        callbackScope: scope,
                        onReverseComplete: callback,
                        onReverseCompleteParams: params,
                        immediateRender: false,
                        lazy: false,
                        useFrames,
                        overwrite: 0
                    });
                };
                TweenLite.set = function(target, vars) {
                    return new TweenLite(target, 0, vars);
                };
                TweenLite.getTweensOf = function(target, onlyActive) {
                    if (null == target) return [];
                    target = "string" !== typeof target ? target : TweenLite.selector(target) || target;
                    var i, a, j, t;
                    if ((_isArray(target) || _isSelector(target)) && "number" !== typeof target[0]) {
                        i = target.length;
                        a = [];
                        while (--i > -1) a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
                        i = a.length;
                        while (--i > -1) {
                            t = a[i];
                            j = i;
                            while (--j > -1) if (t === a[j]) a.splice(i, 1);
                        }
                    } else if (target._gsTweenID) {
                        a = _register(target).concat();
                        i = a.length;
                        while (--i > -1) if (a[i]._gc || onlyActive && !a[i].isActive()) a.splice(i, 1);
                    }
                    return a || [];
                };
                TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, onlyActive, vars) {
                    if ("object" === typeof onlyActive) {
                        vars = onlyActive;
                        onlyActive = false;
                    }
                    var a = TweenLite.getTweensOf(target, onlyActive), i = a.length;
                    while (--i > -1) a[i]._kill(vars, target);
                };
                var TweenPlugin = _class("plugins.TweenPlugin", (function(props, priority) {
                    this._overwriteProps = (props || "").split(",");
                    this._propName = this._overwriteProps[0];
                    this._priority = priority || 0;
                    this._super = TweenPlugin.prototype;
                }), true);
                p = TweenPlugin.prototype;
                TweenPlugin.version = "1.19.0";
                TweenPlugin.API = 2;
                p._firstPT = null;
                p._addTween = _addPropTween;
                p.setRatio = _setRatio;
                p._kill = function(lookup) {
                    var i, a = this._overwriteProps, pt = this._firstPT;
                    if (null != lookup[this._propName]) this._overwriteProps = []; else {
                        i = a.length;
                        while (--i > -1) if (null != lookup[a[i]]) a.splice(i, 1);
                    }
                    while (pt) {
                        if (null != lookup[pt.n]) {
                            if (pt._next) pt._next._prev = pt._prev;
                            if (pt._prev) {
                                pt._prev._next = pt._next;
                                pt._prev = null;
                            } else if (this._firstPT === pt) this._firstPT = pt._next;
                        }
                        pt = pt._next;
                    }
                    return false;
                };
                p._mod = p._roundProps = function(lookup) {
                    var val, pt = this._firstPT;
                    while (pt) {
                        val = lookup[this._propName] || null != pt.n && lookup[pt.n.split(this._propName + "_").join("")];
                        if (val && "function" === typeof val) if (2 === pt.f) pt.t._applyPT.m = val; else pt.m = val;
                        pt = pt._next;
                    }
                };
                TweenLite._onPluginEvent = function(type, tween) {
                    var changed, pt2, first, last, next, pt = tween._firstPT;
                    if ("_onInitAllProps" === type) {
                        while (pt) {
                            next = pt._next;
                            pt2 = first;
                            while (pt2 && pt2.pr > pt.pr) pt2 = pt2._next;
                            if (pt._prev = pt2 ? pt2._prev : last) pt._prev._next = pt; else first = pt;
                            if (pt._next = pt2) pt2._prev = pt; else last = pt;
                            pt = next;
                        }
                        pt = tween._firstPT = first;
                    }
                    while (pt) {
                        if (pt.pg) if ("function" === typeof pt.t[type]) if (pt.t[type]()) changed = true;
                        pt = pt._next;
                    }
                    return changed;
                };
                TweenPlugin.activate = function(plugins) {
                    var i = plugins.length;
                    while (--i > -1) if (plugins[i].API === TweenPlugin.API) _plugins[(new plugins[i])._propName] = plugins[i];
                    return true;
                };
                _gsDefine.plugin = function(config) {
                    if (!config || !config.propName || !config.init || !config.API) throw "illegal plugin definition.";
                    var prop, propName = config.propName, priority = config.priority || 0, overwriteProps = config.overwriteProps, map = {
                        init: "_onInitTween",
                        set: "setRatio",
                        kill: "_kill",
                        round: "_mod",
                        mod: "_mod",
                        initAll: "_onInitAllProps"
                    }, Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin", (function() {
                        TweenPlugin.call(this, propName, priority);
                        this._overwriteProps = overwriteProps || [];
                    }), true === config.global), p = Plugin.prototype = new TweenPlugin(propName);
                    p.constructor = Plugin;
                    Plugin.API = config.API;
                    for (prop in map) if ("function" === typeof config[prop]) p[map[prop]] = config[prop];
                    Plugin.version = config.version;
                    TweenPlugin.activate([ Plugin ]);
                    return Plugin;
                };
                a = window._gsQueue;
                if (a) {
                    for (i = 0; i < a.length; i++) a[i]();
                    for (p in _defLookup) if (!_defLookup[p].func) window.console.log("GSAP encountered missing dependency: " + p);
                }
                _tickerActive = false;
                return TweenLite;
            }(_gsScope);
            var globals = _gsScope.GreenSockGlobals;
            var nonGlobals = globals.com.greensock;
            var SimpleTimeline = nonGlobals.core.SimpleTimeline;
            var Animation = nonGlobals.core.Animation;
            var Ease = globals.Ease;
            globals.Linear;
            globals.Power1;
            globals.Power2;
            globals.Power3;
            globals.Power4;
            var TweenPlugin = globals.TweenPlugin;
            nonGlobals.events.EventDispatcher;
        },
        732: function(module) {
            !function(n, t) {
                true ? module.exports = t() : 0;
            }(0, (function() {
                "use strict";
                function n() {
                    return n = Object.assign || function(n) {
                        for (var t = 1; t < arguments.length; t++) {
                            var e = arguments[t];
                            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
                        }
                        return n;
                    }, n.apply(this, arguments);
                }
                var t = "undefined" != typeof window, e = t && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent), i = t && "IntersectionObserver" in window, o = t && "classList" in document.createElement("p"), a = t && window.devicePixelRatio > 1, r = {
                    elements_selector: ".lazy",
                    container: e || t ? document : null,
                    threshold: 300,
                    thresholds: null,
                    data_src: "src",
                    data_srcset: "srcset",
                    data_sizes: "sizes",
                    data_bg: "bg",
                    data_bg_hidpi: "bg-hidpi",
                    data_bg_multi: "bg-multi",
                    data_bg_multi_hidpi: "bg-multi-hidpi",
                    data_bg_set: "bg-set",
                    data_poster: "poster",
                    class_applied: "applied",
                    class_loading: "loading",
                    class_loaded: "loaded",
                    class_error: "error",
                    class_entered: "entered",
                    class_exited: "exited",
                    unobserve_completed: !0,
                    unobserve_entered: !1,
                    cancel_on_exit: !0,
                    callback_enter: null,
                    callback_exit: null,
                    callback_applied: null,
                    callback_loading: null,
                    callback_loaded: null,
                    callback_error: null,
                    callback_finish: null,
                    callback_cancel: null,
                    use_native: !1,
                    restore_on_error: !1
                }, c = function(t) {
                    return n({}, r, t);
                }, l = function(n, t) {
                    var e, i = "LazyLoad::Initialized", o = new n(t);
                    try {
                        e = new CustomEvent(i, {
                            detail: {
                                instance: o
                            }
                        });
                    } catch (n) {
                        (e = document.createEvent("CustomEvent")).initCustomEvent(i, !1, !1, {
                            instance: o
                        });
                    }
                    window.dispatchEvent(e);
                }, u = "src", s = "srcset", d = "sizes", f = "poster", _ = "llOriginalAttrs", g = "data", v = "loading", b = "loaded", m = "applied", p = "error", h = "native", E = "data-", I = "ll-status", y = function(n, t) {
                    return n.getAttribute(E + t);
                }, k = function(n) {
                    return y(n, I);
                }, w = function(n, t) {
                    return function(n, t, e) {
                        var i = "data-ll-status";
                        null !== e ? n.setAttribute(i, e) : n.removeAttribute(i);
                    }(n, 0, t);
                }, A = function(n) {
                    return w(n, null);
                }, L = function(n) {
                    return null === k(n);
                }, O = function(n) {
                    return k(n) === h;
                }, x = [ v, b, m, p ], C = function(n, t, e, i) {
                    n && (void 0 === i ? void 0 === e ? n(t) : n(t, e) : n(t, e, i));
                }, N = function(n, t) {
                    o ? n.classList.add(t) : n.className += (n.className ? " " : "") + t;
                }, M = function(n, t) {
                    o ? n.classList.remove(t) : n.className = n.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
                }, z = function(n) {
                    return n.llTempImage;
                }, T = function(n, t) {
                    if (t) {
                        var e = t._observer;
                        e && e.unobserve(n);
                    }
                }, R = function(n, t) {
                    n && (n.loadingCount += t);
                }, G = function(n, t) {
                    n && (n.toLoadCount = t);
                }, j = function(n) {
                    for (var t, e = [], i = 0; t = n.children[i]; i += 1) "SOURCE" === t.tagName && e.push(t);
                    return e;
                }, D = function(n, t) {
                    var e = n.parentNode;
                    e && "PICTURE" === e.tagName && j(e).forEach(t);
                }, H = function(n, t) {
                    j(n).forEach(t);
                }, V = [ u ], F = [ u, f ], B = [ u, s, d ], J = [ g ], P = function(n) {
                    return !!n[_];
                }, S = function(n) {
                    return n[_];
                }, U = function(n) {
                    return delete n[_];
                }, $ = function(n, t) {
                    if (!P(n)) {
                        var e = {};
                        t.forEach((function(t) {
                            e[t] = n.getAttribute(t);
                        })), n[_] = e;
                    }
                }, q = function(n, t) {
                    if (P(n)) {
                        var e = S(n);
                        t.forEach((function(t) {
                            !function(n, t, e) {
                                e ? n.setAttribute(t, e) : n.removeAttribute(t);
                            }(n, t, e[t]);
                        }));
                    }
                }, K = function(n, t, e) {
                    N(n, t.class_applied), w(n, m), e && (t.unobserve_completed && T(n, t), C(t.callback_applied, n, e));
                }, Q = function(n, t, e) {
                    N(n, t.class_loading), w(n, v), e && (R(e, 1), C(t.callback_loading, n, e));
                }, W = function(n, t, e) {
                    e && n.setAttribute(t, e);
                }, X = function(n, t) {
                    W(n, d, y(n, t.data_sizes)), W(n, s, y(n, t.data_srcset)), W(n, u, y(n, t.data_src));
                }, Y = {
                    IMG: function(n, t) {
                        D(n, (function(n) {
                            $(n, B), X(n, t);
                        })), $(n, B), X(n, t);
                    },
                    IFRAME: function(n, t) {
                        $(n, V), W(n, u, y(n, t.data_src));
                    },
                    VIDEO: function(n, t) {
                        H(n, (function(n) {
                            $(n, V), W(n, u, y(n, t.data_src));
                        })), $(n, F), W(n, f, y(n, t.data_poster)), W(n, u, y(n, t.data_src)), n.load();
                    },
                    OBJECT: function(n, t) {
                        $(n, J), W(n, g, y(n, t.data_src));
                    }
                }, Z = [ "IMG", "IFRAME", "VIDEO", "OBJECT" ], nn = function(n, t) {
                    !t || function(n) {
                        return n.loadingCount > 0;
                    }(t) || function(n) {
                        return n.toLoadCount > 0;
                    }(t) || C(n.callback_finish, t);
                }, tn = function(n, t, e) {
                    n.addEventListener(t, e), n.llEvLisnrs[t] = e;
                }, en = function(n, t, e) {
                    n.removeEventListener(t, e);
                }, on = function(n) {
                    return !!n.llEvLisnrs;
                }, an = function(n) {
                    if (on(n)) {
                        var t = n.llEvLisnrs;
                        for (var e in t) {
                            var i = t[e];
                            en(n, e, i);
                        }
                        delete n.llEvLisnrs;
                    }
                }, rn = function(n, t, e) {
                    !function(n) {
                        delete n.llTempImage;
                    }(n), R(e, -1), function(n) {
                        n && (n.toLoadCount -= 1);
                    }(e), M(n, t.class_loading), t.unobserve_completed && T(n, e);
                }, cn = function(n, t, e) {
                    var i = z(n) || n;
                    on(i) || function(n, t, e) {
                        on(n) || (n.llEvLisnrs = {});
                        var i = "VIDEO" === n.tagName ? "loadeddata" : "load";
                        tn(n, i, t), tn(n, "error", e);
                    }(i, (function(o) {
                        !function(n, t, e, i) {
                            var o = O(t);
                            rn(t, e, i), N(t, e.class_loaded), w(t, b), C(e.callback_loaded, t, i), o || nn(e, i);
                        }(0, n, t, e), an(i);
                    }), (function(o) {
                        !function(n, t, e, i) {
                            var o = O(t);
                            rn(t, e, i), N(t, e.class_error), w(t, p), C(e.callback_error, t, i), e.restore_on_error && q(t, B), 
                            o || nn(e, i);
                        }(0, n, t, e), an(i);
                    }));
                }, ln = function(n, t, e) {
                    !function(n) {
                        return Z.indexOf(n.tagName) > -1;
                    }(n) ? function(n, t, e) {
                        !function(n) {
                            n.llTempImage = document.createElement("IMG");
                        }(n), cn(n, t, e), function(n) {
                            P(n) || (n[_] = {
                                backgroundImage: n.style.backgroundImage
                            });
                        }(n), function(n, t, e) {
                            var i = y(n, t.data_bg), o = y(n, t.data_bg_hidpi), r = a && o ? o : i;
                            r && (n.style.backgroundImage = 'url("'.concat(r, '")'), z(n).setAttribute(u, r), 
                            Q(n, t, e));
                        }(n, t, e), function(n, t, e) {
                            var i = y(n, t.data_bg_multi), o = y(n, t.data_bg_multi_hidpi), r = a && o ? o : i;
                            r && (n.style.backgroundImage = r, K(n, t, e));
                        }(n, t, e), function(n, t, e) {
                            var i = y(n, t.data_bg_set);
                            if (i) {
                                var o = i.split("|"), a = o.map((function(n) {
                                    return "image-set(".concat(n, ")");
                                }));
                                n.style.backgroundImage = a.join(), "" === n.style.backgroundImage && (a = o.map((function(n) {
                                    return "-webkit-image-set(".concat(n, ")");
                                })), n.style.backgroundImage = a.join()), K(n, t, e);
                            }
                        }(n, t, e);
                    }(n, t, e) : function(n, t, e) {
                        cn(n, t, e), function(n, t, e) {
                            var i = Y[n.tagName];
                            i && (i(n, t), Q(n, t, e));
                        }(n, t, e);
                    }(n, t, e);
                }, un = function(n) {
                    n.removeAttribute(u), n.removeAttribute(s), n.removeAttribute(d);
                }, sn = function(n) {
                    D(n, (function(n) {
                        q(n, B);
                    })), q(n, B);
                }, dn = {
                    IMG: sn,
                    IFRAME: function(n) {
                        q(n, V);
                    },
                    VIDEO: function(n) {
                        H(n, (function(n) {
                            q(n, V);
                        })), q(n, F), n.load();
                    },
                    OBJECT: function(n) {
                        q(n, J);
                    }
                }, fn = function(n, t) {
                    (function(n) {
                        var t = dn[n.tagName];
                        t ? t(n) : function(n) {
                            if (P(n)) {
                                var t = S(n);
                                n.style.backgroundImage = t.backgroundImage;
                            }
                        }(n);
                    })(n), function(n, t) {
                        L(n) || O(n) || (M(n, t.class_entered), M(n, t.class_exited), M(n, t.class_applied), 
                        M(n, t.class_loading), M(n, t.class_loaded), M(n, t.class_error));
                    }(n, t), A(n), U(n);
                }, _n = [ "IMG", "IFRAME", "VIDEO" ], gn = function(n) {
                    return n.use_native && "loading" in HTMLImageElement.prototype;
                }, vn = function(n, t, e) {
                    n.forEach((function(n) {
                        return function(n) {
                            return n.isIntersecting || n.intersectionRatio > 0;
                        }(n) ? function(n, t, e, i) {
                            var o = function(n) {
                                return x.indexOf(k(n)) >= 0;
                            }(n);
                            w(n, "entered"), N(n, e.class_entered), M(n, e.class_exited), function(n, t, e) {
                                t.unobserve_entered && T(n, e);
                            }(n, e, i), C(e.callback_enter, n, t, i), o || ln(n, e, i);
                        }(n.target, n, t, e) : function(n, t, e, i) {
                            L(n) || (N(n, e.class_exited), function(n, t, e, i) {
                                e.cancel_on_exit && function(n) {
                                    return k(n) === v;
                                }(n) && "IMG" === n.tagName && (an(n), function(n) {
                                    D(n, (function(n) {
                                        un(n);
                                    })), un(n);
                                }(n), sn(n), M(n, e.class_loading), R(i, -1), A(n), C(e.callback_cancel, n, t, i));
                            }(n, t, e, i), C(e.callback_exit, n, t, i));
                        }(n.target, n, t, e);
                    }));
                }, bn = function(n) {
                    return Array.prototype.slice.call(n);
                }, mn = function(n) {
                    return n.container.querySelectorAll(n.elements_selector);
                }, pn = function(n) {
                    return function(n) {
                        return k(n) === p;
                    }(n);
                }, hn = function(n, t) {
                    return function(n) {
                        return bn(n).filter(L);
                    }(n || mn(t));
                }, En = function(n, e) {
                    var o = c(n);
                    this._settings = o, this.loadingCount = 0, function(n, t) {
                        i && !gn(n) && (t._observer = new IntersectionObserver((function(e) {
                            vn(e, n, t);
                        }), function(n) {
                            return {
                                root: n.container === document ? null : n.container,
                                rootMargin: n.thresholds || n.threshold + "px"
                            };
                        }(n)));
                    }(o, this), function(n, e) {
                        t && (e._onlineHandler = function() {
                            !function(n, t) {
                                var e;
                                (e = mn(n), bn(e).filter(pn)).forEach((function(t) {
                                    M(t, n.class_error), A(t);
                                })), t.update();
                            }(n, e);
                        }, window.addEventListener("online", e._onlineHandler));
                    }(o, this), this.update(e);
                };
                return En.prototype = {
                    update: function(n) {
                        var t, o, a = this._settings, r = hn(n, a);
                        G(this, r.length), !e && i ? gn(a) ? function(n, t, e) {
                            n.forEach((function(n) {
                                -1 !== _n.indexOf(n.tagName) && function(n, t, e) {
                                    n.setAttribute("loading", "lazy"), cn(n, t, e), function(n, t) {
                                        var e = Y[n.tagName];
                                        e && e(n, t);
                                    }(n, t), w(n, h);
                                }(n, t, e);
                            })), G(e, 0);
                        }(r, a, this) : (o = r, function(n) {
                            n.disconnect();
                        }(t = this._observer), function(n, t) {
                            t.forEach((function(t) {
                                n.observe(t);
                            }));
                        }(t, o)) : this.loadAll(r);
                    },
                    destroy: function() {
                        this._observer && this._observer.disconnect(), t && window.removeEventListener("online", this._onlineHandler), 
                        mn(this._settings).forEach((function(n) {
                            U(n);
                        })), delete this._observer, delete this._settings, delete this._onlineHandler, delete this.loadingCount, 
                        delete this.toLoadCount;
                    },
                    loadAll: function(n) {
                        var t = this, e = this._settings;
                        hn(n, e).forEach((function(n) {
                            T(n, t), ln(n, e, t);
                        }));
                    },
                    restoreAll: function() {
                        var n = this._settings;
                        mn(n).forEach((function(t) {
                            fn(t, n);
                        }));
                    }
                }, En.load = function(n, t) {
                    var e = c(t);
                    ln(n, e);
                }, En.resetStatus = function(n) {
                    A(n);
                }, t && function(n, t) {
                    if (t) if (t.length) for (var e, i = 0; e = t[i]; i += 1) l(n, e); else l(n, t);
                }(En, window.lazyLoadOptions), En;
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            id: moduleId,
            loaded: false,
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
    }
    (() => {
        __webpack_require__.d = (exports, definition) => {
            for (var key in definition) if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
                enumerable: true,
                get: definition[key]
            });
        };
    })();
    (() => {
        __webpack_require__.g = function() {
            if ("object" === typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if ("object" === typeof window) return window;
            }
        }();
    })();
    (() => {
        __webpack_require__.hmd = module => {
            module = Object.create(module);
            if (!module.children) module.children = [];
            Object.defineProperty(module, "exports", {
                enumerable: true,
                set: () => {
                    throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " + module.id);
                }
            });
            return module;
        };
    })();
    (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();
    (() => {
        "use strict";
        const flsModules = {};
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(2 == webP.height);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = true === support ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        function getHash() {
            if (location.hash) return location.hash.replace("#", "");
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let bodyLockStatus = true;
        let bodyLockToggle = (delay = 500) => {
            if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
        };
        let bodyUnlock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                setTimeout((() => {
                    for (let index = 0; index < lock_padding.length; index++) {
                        const el = lock_padding[index];
                        el.style.paddingRight = "0px";
                    }
                    body.style.paddingRight = "0px";
                    document.documentElement.classList.remove("lock");
                }), delay);
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        let bodyLock = (delay = 500) => {
            let body = document.querySelector("body");
            if (bodyLockStatus) {
                let lock_padding = document.querySelectorAll("[data-lp]");
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                }
                body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                document.documentElement.classList.add("lock");
                bodyLockStatus = false;
                setTimeout((function() {
                    bodyLockStatus = true;
                }), delay);
            }
        };
        function menuInit() {
            if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
                if (bodyLockStatus && e.target.closest(".icon-menu")) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            }));
        }
        function menuClose() {
            bodyUnlock();
            document.documentElement.classList.remove("menu-open");
        }
        function showMore() {
            window.addEventListener("load", (function(e) {
                const showMoreBlocks = document.querySelectorAll("[data-showmore]");
                let showMoreBlocksRegular;
                let mdQueriesArray;
                if (showMoreBlocks.length) {
                    showMoreBlocksRegular = Array.from(showMoreBlocks).filter((function(item, index, self) {
                        return !item.dataset.showmoreMedia;
                    }));
                    showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
                    document.addEventListener("click", showMoreActions);
                    document.addEventListener("mouseover", showMoreActions);
                    document.addEventListener("mouseout", showMoreActions);
                    mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
                    if (mdQueriesArray && mdQueriesArray.length) {
                        mdQueriesArray.forEach((mdQueriesItem => {
                            mdQueriesItem.matchMedia.addEventListener("change", (function() {
                                initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                            }));
                        }));
                        initItemsMedia(mdQueriesArray);
                    }
                }
                function initItemsMedia(mdQueriesArray) {
                    mdQueriesArray.forEach((mdQueriesItem => {
                        initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                }
                function initItems(showMoreBlocks, matchMedia) {
                    showMoreBlocks.forEach((showMoreBlock => {
                        initItem(showMoreBlock, matchMedia);
                    }));
                }
                function initItem(showMoreBlock, matchMedia = false) {
                    showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
                    let showMoreContent = showMoreBlock.querySelectorAll("[data-showmore-content]");
                    let showMoreButton = showMoreBlock.querySelectorAll("[data-showmore-button]");
                    showMoreContent = Array.from(showMoreContent).filter((item => item.closest("[data-showmore]") === showMoreBlock))[0];
                    showMoreButton = Array.from(showMoreButton).filter((item => item.closest("[data-showmore]") === showMoreBlock))[0];
                    const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
                    if (matchMedia.matches || !matchMedia) if (hiddenHeight < getOriginalHeight(showMoreContent)) {
                        _slideUp(showMoreContent, 0, hiddenHeight);
                        showMoreButton.hidden = false;
                    } else {
                        _slideDown(showMoreContent, 0, hiddenHeight);
                        showMoreButton.hidden = true;
                    } else {
                        _slideDown(showMoreContent, 0, hiddenHeight);
                        showMoreButton.hidden = true;
                    }
                }
                function getHeight(showMoreBlock, showMoreContent) {
                    let hiddenHeight = 0;
                    const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : "size";
                    if ("items" === showMoreType) {
                        const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
                        const showMoreItems = showMoreContent.children;
                        for (let index = 1; index < showMoreItems.length; index++) {
                            const showMoreItem = showMoreItems[index - 1];
                            hiddenHeight += showMoreItem.offsetHeight;
                            console.log(hiddenHeight);
                            if (index == showMoreTypeValue) break;
                        }
                    } else {
                        const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
                        hiddenHeight = showMoreTypeValue;
                    }
                    return hiddenHeight;
                }
                function getOriginalHeight(showMoreContent) {
                    let parentHidden;
                    let hiddenHeight = showMoreContent.offsetHeight;
                    showMoreContent.style.removeProperty("height");
                    if (showMoreContent.closest(`[hidden]`)) {
                        parentHidden = showMoreContent.closest(`[hidden]`);
                        parentHidden.hidden = false;
                    }
                    let originalHeight = showMoreContent.offsetHeight;
                    parentHidden ? parentHidden.hidden = true : null;
                    showMoreContent.style.height = `${hiddenHeight}px`;
                    return originalHeight;
                }
                function showMoreActions(e) {
                    const targetEvent = e.target;
                    const targetType = e.type;
                    if ("click" === targetType) {
                        if (targetEvent.closest("[data-showmore-button]")) {
                            const showMoreButton = targetEvent.closest("[data-showmore-button]");
                            const showMoreBlock = showMoreButton.closest("[data-showmore]");
                            const showMoreContent = showMoreBlock.querySelector("[data-showmore-content]");
                            const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : "500";
                            const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
                            if (!showMoreContent.classList.contains("_slide")) {
                                showMoreBlock.classList.contains("_showmore-active") ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
                                showMoreBlock.classList.toggle("_showmore-active");
                            }
                        }
                    } else if ("resize" === targetType) {
                        showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
                        mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
                    }
                }
            }));
        }
        function FLS(message) {
            setTimeout((() => {
                if (window.FLS) console.log(message);
            }), 0);
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
            const targetBlockElement = document.querySelector(targetBlock);
            if (targetBlockElement) {
                let headerItem = "";
                let headerItemHeight = 0;
                if (noHeader) {
                    headerItem = "header.header";
                    headerItemHeight = document.querySelector(headerItem).offsetHeight;
                }
                let options = {
                    speedAsDuration: true,
                    speed,
                    header: headerItem,
                    offset: offsetTop,
                    easing: "easeOutQuad"
                };
                document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                if ("undefined" !== typeof SmoothScroll) (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
                    let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
                    targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
                    targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
                    window.scrollTo({
                        top: targetBlockElementPosition,
                        behavior: "smooth"
                    });
                }
                FLS(`[gotoBlock]: Юхуу...едем к ${targetBlock}`);
            } else FLS(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${targetBlock}`);
        };
        function formFieldsInit(options = {
            viewPass: false
        }) {
            const formFields = document.querySelectorAll("input[placeholder],textarea[placeholder]");
            if (formFields.length) formFields.forEach((formField => {
                if (!formField.hasAttribute("data-placeholder-nohide")) formField.dataset.placeholder = formField.placeholder;
            }));
            document.body.addEventListener("focusin", (function(e) {
                const targetElement = e.target;
                if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                    if (targetElement.dataset.placeholder) targetElement.placeholder = "";
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.add("_form-focus");
                        targetElement.parentElement.classList.add("_form-focus");
                    }
                    formValidate.removeError(targetElement);
                }
            }));
            document.body.addEventListener("focusout", (function(e) {
                const targetElement = e.target;
                if ("INPUT" === targetElement.tagName || "TEXTAREA" === targetElement.tagName) {
                    if (targetElement.dataset.placeholder) targetElement.placeholder = targetElement.dataset.placeholder;
                    if (!targetElement.hasAttribute("data-no-focus-classes")) {
                        targetElement.classList.remove("_form-focus");
                        targetElement.parentElement.classList.remove("_form-focus");
                    }
                    if (targetElement.hasAttribute("data-validate")) formValidate.validateInput(targetElement);
                }
            }));
            if (options.viewPass) document.addEventListener("click", (function(e) {
                let targetElement = e.target;
                if (targetElement.closest('[class*="__viewpass"]')) {
                    let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
                    targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
                    targetElement.classList.toggle("_viewpass-active");
                }
            }));
        }
        let formValidate = {
            getErrors(form) {
                let error = 0;
                let formRequiredItems = form.querySelectorAll("*[data-required]");
                if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                    if ((null !== formRequiredItem.offsetParent || "SELECT" === formRequiredItem.tagName) && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
                }));
                return error;
            },
            validateInput(formRequiredItem) {
                let error = 0;
                if ("email" === formRequiredItem.dataset.required) {
                    formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                    if (this.emailTest(formRequiredItem)) {
                        this.addError(formRequiredItem);
                        error++;
                    } else this.removeError(formRequiredItem);
                } else if ("checkbox" === formRequiredItem.type && !formRequiredItem.checked) {
                    this.addError(formRequiredItem);
                    error++;
                } else if (!formRequiredItem.value.trim()) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
                return error;
            },
            addError(formRequiredItem) {
                formRequiredItem.classList.add("_form-error");
                formRequiredItem.parentElement.classList.add("_form-error");
                let inputError = formRequiredItem.parentElement.querySelector(".form__error");
                if (inputError) formRequiredItem.parentElement.removeChild(inputError);
                if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
            },
            removeError(formRequiredItem) {
                formRequiredItem.classList.remove("_form-error");
                formRequiredItem.parentElement.classList.remove("_form-error");
                if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
            },
            formClean(form) {
                form.reset();
                setTimeout((() => {
                    let inputs = form.querySelectorAll("input,textarea");
                    for (let index = 0; index < inputs.length; index++) {
                        const el = inputs[index];
                        el.parentElement.classList.remove("_form-focus");
                        el.classList.remove("_form-focus");
                        formValidate.removeError(el);
                    }
                    let checkboxes = form.querySelectorAll(".checkbox__input");
                    if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                        const checkbox = checkboxes[index];
                        checkbox.checked = false;
                    }
                    if (flsModules.select) {
                        let selects = form.querySelectorAll(".select");
                        if (selects.length) for (let index = 0; index < selects.length; index++) {
                            const select = selects[index].querySelector("select");
                            flsModules.select.selectBuild(select);
                        }
                    }
                }), 0);
            },
            emailTest(formRequiredItem) {
                return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
            }
        };
        function formSubmit(options = {
            validate: true
        }) {
            const forms = document.forms;
            if (forms.length) for (const form of forms) {
                form.addEventListener("submit", (function(e) {
                    const form = e.target;
                    formSubmitAction(form, e);
                }));
                form.addEventListener("reset", (function(e) {
                    const form = e.target;
                    formValidate.formClean(form);
                }));
            }
            async function formSubmitAction(form, e) {
                const error = !form.hasAttribute("data-no-validate") ? formValidate.getErrors(form) : 0;
                if (0 === error) {
                    const ajax = form.hasAttribute("data-ajax");
                    if (ajax) {
                        e.preventDefault();
                        const formAction = form.getAttribute("action") ? form.getAttribute("action").trim() : "#";
                        const formMethod = form.getAttribute("method") ? form.getAttribute("method").trim() : "GET";
                        const formData = new FormData(form);
                        form.classList.add("_sending");
                        const response = await fetch(formAction, {
                            method: formMethod,
                            body: formData
                        });
                        if (response.ok) {
                            let responseResult = await response.json();
                            form.classList.remove("_sending");
                            formSent(form, responseResult);
                        } else {
                            alert("Ошибка");
                            form.classList.remove("_sending");
                        }
                    } else if (form.hasAttribute("data-dev")) {
                        e.preventDefault();
                        formSent(form);
                    }
                } else {
                    e.preventDefault();
                    const formError = form.querySelector("._form-error");
                    if (formError && form.hasAttribute("data-goto-error")) gotoBlock(formError, true, 1e3);
                }
            }
            function formSent(form, responseResult = ``) {
                document.dispatchEvent(new CustomEvent("formSent", {
                    detail: {
                        form
                    }
                }));
                setTimeout((() => {
                    if (flsModules.popup) {
                        const popup = form.dataset.popupMessage;
                        popup ? flsModules.popup.open(popup) : null;
                    }
                }), 0);
                formValidate.formClean(form);
                formLogging(`Форма отправлена!`);
            }
            function formLogging(message) {
                FLS(`[Формы]: ${message}`);
            }
        }
        function getWindow_getWindow(node) {
            if (null == node) return window;
            if ("[object Window]" !== node.toString()) {
                var ownerDocument = node.ownerDocument;
                return ownerDocument ? ownerDocument.defaultView || window : window;
            }
            return node;
        }
        function isElement(node) {
            var OwnElement = getWindow_getWindow(node).Element;
            return node instanceof OwnElement || node instanceof Element;
        }
        function isHTMLElement(node) {
            var OwnElement = getWindow_getWindow(node).HTMLElement;
            return node instanceof OwnElement || node instanceof HTMLElement;
        }
        function isShadowRoot(node) {
            if ("undefined" === typeof ShadowRoot) return false;
            var OwnElement = getWindow_getWindow(node).ShadowRoot;
            return node instanceof OwnElement || node instanceof ShadowRoot;
        }
        var math_max = Math.max;
        var math_min = Math.min;
        var round = Math.round;
        function getBoundingClientRect(element, includeScale) {
            if (void 0 === includeScale) includeScale = false;
            var rect = element.getBoundingClientRect();
            var scaleX = 1;
            var scaleY = 1;
            if (isHTMLElement(element) && includeScale) {
                var offsetHeight = element.offsetHeight;
                var offsetWidth = element.offsetWidth;
                if (offsetWidth > 0) scaleX = round(rect.width) / offsetWidth || 1;
                if (offsetHeight > 0) scaleY = round(rect.height) / offsetHeight || 1;
            }
            return {
                width: rect.width / scaleX,
                height: rect.height / scaleY,
                top: rect.top / scaleY,
                right: rect.right / scaleX,
                bottom: rect.bottom / scaleY,
                left: rect.left / scaleX,
                x: rect.left / scaleX,
                y: rect.top / scaleY
            };
        }
        function getWindowScroll(node) {
            var win = getWindow_getWindow(node);
            var scrollLeft = win.pageXOffset;
            var scrollTop = win.pageYOffset;
            return {
                scrollLeft,
                scrollTop
            };
        }
        function getHTMLElementScroll(element) {
            return {
                scrollLeft: element.scrollLeft,
                scrollTop: element.scrollTop
            };
        }
        function getNodeScroll(node) {
            if (node === getWindow_getWindow(node) || !isHTMLElement(node)) return getWindowScroll(node); else return getHTMLElementScroll(node);
        }
        function getNodeName(element) {
            return element ? (element.nodeName || "").toLowerCase() : null;
        }
        function getDocumentElement(element) {
            return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
        }
        function getWindowScrollBarX(element) {
            return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
        }
        function getComputedStyle_getComputedStyle(element) {
            return getWindow_getWindow(element).getComputedStyle(element);
        }
        function isScrollParent(element) {
            var _getComputedStyle = getComputedStyle_getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
            return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
        }
        function isElementScaled(element) {
            var rect = element.getBoundingClientRect();
            var scaleX = round(rect.width) / element.offsetWidth || 1;
            var scaleY = round(rect.height) / element.offsetHeight || 1;
            return 1 !== scaleX || 1 !== scaleY;
        }
        function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
            if (void 0 === isFixed) isFixed = false;
            var isOffsetParentAnElement = isHTMLElement(offsetParent);
            var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
            var documentElement = getDocumentElement(offsetParent);
            var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
            var scroll = {
                scrollLeft: 0,
                scrollTop: 0
            };
            var offsets = {
                x: 0,
                y: 0
            };
            if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
                if ("body" !== getNodeName(offsetParent) || isScrollParent(documentElement)) scroll = getNodeScroll(offsetParent);
                if (isHTMLElement(offsetParent)) {
                    offsets = getBoundingClientRect(offsetParent, true);
                    offsets.x += offsetParent.clientLeft;
                    offsets.y += offsetParent.clientTop;
                } else if (documentElement) offsets.x = getWindowScrollBarX(documentElement);
            }
            return {
                x: rect.left + scroll.scrollLeft - offsets.x,
                y: rect.top + scroll.scrollTop - offsets.y,
                width: rect.width,
                height: rect.height
            };
        }
        function getLayoutRect(element) {
            var clientRect = getBoundingClientRect(element);
            var width = element.offsetWidth;
            var height = element.offsetHeight;
            if (Math.abs(clientRect.width - width) <= 1) width = clientRect.width;
            if (Math.abs(clientRect.height - height) <= 1) height = clientRect.height;
            return {
                x: element.offsetLeft,
                y: element.offsetTop,
                width,
                height
            };
        }
        function getParentNode(element) {
            if ("html" === getNodeName(element)) return element;
            return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
        }
        function getScrollParent(node) {
            if ([ "html", "body", "#document" ].indexOf(getNodeName(node)) >= 0) return node.ownerDocument.body;
            if (isHTMLElement(node) && isScrollParent(node)) return node;
            return getScrollParent(getParentNode(node));
        }
        function listScrollParents(element, list) {
            var _element$ownerDocumen;
            if (void 0 === list) list = [];
            var scrollParent = getScrollParent(element);
            var isBody = scrollParent === (null == (_element$ownerDocumen = element.ownerDocument) ? void 0 : _element$ownerDocumen.body);
            var win = getWindow_getWindow(scrollParent);
            var target = isBody ? [ win ].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
            var updatedList = list.concat(target);
            return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
        }
        function isTableElement(element) {
            return [ "table", "td", "th" ].indexOf(getNodeName(element)) >= 0;
        }
        function getTrueOffsetParent(element) {
            if (!isHTMLElement(element) || "fixed" === getComputedStyle_getComputedStyle(element).position) return null;
            return element.offsetParent;
        }
        function getContainingBlock(element) {
            var isFirefox = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
            var isIE = -1 !== navigator.userAgent.indexOf("Trident");
            if (isIE && isHTMLElement(element)) {
                var elementCss = getComputedStyle_getComputedStyle(element);
                if ("fixed" === elementCss.position) return null;
            }
            var currentNode = getParentNode(element);
            if (isShadowRoot(currentNode)) currentNode = currentNode.host;
            while (isHTMLElement(currentNode) && [ "html", "body" ].indexOf(getNodeName(currentNode)) < 0) {
                var css = getComputedStyle_getComputedStyle(currentNode);
                if ("none" !== css.transform || "none" !== css.perspective || "paint" === css.contain || -1 !== [ "transform", "perspective" ].indexOf(css.willChange) || isFirefox && "filter" === css.willChange || isFirefox && css.filter && "none" !== css.filter) return currentNode; else currentNode = currentNode.parentNode;
            }
            return null;
        }
        function getOffsetParent(element) {
            var window = getWindow_getWindow(element);
            var offsetParent = getTrueOffsetParent(element);
            while (offsetParent && isTableElement(offsetParent) && "static" === getComputedStyle_getComputedStyle(offsetParent).position) offsetParent = getTrueOffsetParent(offsetParent);
            if (offsetParent && ("html" === getNodeName(offsetParent) || "body" === getNodeName(offsetParent) && "static" === getComputedStyle_getComputedStyle(offsetParent).position)) return window;
            return offsetParent || getContainingBlock(element) || window;
        }
        var enums_top = "top";
        var bottom = "bottom";
        var right = "right";
        var left = "left";
        var auto = "auto";
        var basePlacements = [ enums_top, bottom, right, left ];
        var start = "start";
        var end = "end";
        var clippingParents = "clippingParents";
        var viewport = "viewport";
        var popper = "popper";
        var reference = "reference";
        var variationPlacements = basePlacements.reduce((function(acc, placement) {
            return acc.concat([ placement + "-" + start, placement + "-" + end ]);
        }), []);
        var enums_placements = [].concat(basePlacements, [ auto ]).reduce((function(acc, placement) {
            return acc.concat([ placement, placement + "-" + start, placement + "-" + end ]);
        }), []);
        var beforeRead = "beforeRead";
        var read = "read";
        var afterRead = "afterRead";
        var beforeMain = "beforeMain";
        var main = "main";
        var afterMain = "afterMain";
        var beforeWrite = "beforeWrite";
        var write = "write";
        var afterWrite = "afterWrite";
        var modifierPhases = [ beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite ];
        function order(modifiers) {
            var map = new Map;
            var visited = new Set;
            var result = [];
            modifiers.forEach((function(modifier) {
                map.set(modifier.name, modifier);
            }));
            function sort(modifier) {
                visited.add(modifier.name);
                var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
                requires.forEach((function(dep) {
                    if (!visited.has(dep)) {
                        var depModifier = map.get(dep);
                        if (depModifier) sort(depModifier);
                    }
                }));
                result.push(modifier);
            }
            modifiers.forEach((function(modifier) {
                if (!visited.has(modifier.name)) sort(modifier);
            }));
            return result;
        }
        function orderModifiers(modifiers) {
            var orderedModifiers = order(modifiers);
            return modifierPhases.reduce((function(acc, phase) {
                return acc.concat(orderedModifiers.filter((function(modifier) {
                    return modifier.phase === phase;
                })));
            }), []);
        }
        function debounce(fn) {
            var pending;
            return function() {
                if (!pending) pending = new Promise((function(resolve) {
                    Promise.resolve().then((function() {
                        pending = void 0;
                        resolve(fn());
                    }));
                }));
                return pending;
            };
        }
        function mergeByName(modifiers) {
            var merged = modifiers.reduce((function(merged, current) {
                var existing = merged[current.name];
                merged[current.name] = existing ? Object.assign({}, existing, current, {
                    options: Object.assign({}, existing.options, current.options),
                    data: Object.assign({}, existing.data, current.data)
                }) : current;
                return merged;
            }), {});
            return Object.keys(merged).map((function(key) {
                return merged[key];
            }));
        }
        var DEFAULT_OPTIONS = {
            placement: "bottom",
            modifiers: [],
            strategy: "absolute"
        };
        function areValidElements() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            return !args.some((function(element) {
                return !(element && "function" === typeof element.getBoundingClientRect);
            }));
        }
        function popperGenerator(generatorOptions) {
            if (void 0 === generatorOptions) generatorOptions = {};
            var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers = void 0 === _generatorOptions$def ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = void 0 === _generatorOptions$def2 ? DEFAULT_OPTIONS : _generatorOptions$def2;
            return function createPopper(reference, popper, options) {
                if (void 0 === options) options = defaultOptions;
                var state = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
                    modifiersData: {},
                    elements: {
                        reference,
                        popper
                    },
                    attributes: {},
                    styles: {}
                };
                var effectCleanupFns = [];
                var isDestroyed = false;
                var instance = {
                    state,
                    setOptions: function setOptions(setOptionsAction) {
                        var options = "function" === typeof setOptionsAction ? setOptionsAction(state.options) : setOptionsAction;
                        cleanupModifierEffects();
                        state.options = Object.assign({}, defaultOptions, state.options, options);
                        state.scrollParents = {
                            reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
                            popper: listScrollParents(popper)
                        };
                        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers)));
                        state.orderedModifiers = orderedModifiers.filter((function(m) {
                            return m.enabled;
                        }));
                        if (false) ;
                        runModifierEffects();
                        return instance.update();
                    },
                    forceUpdate: function forceUpdate() {
                        if (isDestroyed) return;
                        var _state$elements = state.elements, reference = _state$elements.reference, popper = _state$elements.popper;
                        if (!areValidElements(reference, popper)) {
                            if (false) ;
                            return;
                        }
                        state.rects = {
                            reference: getCompositeRect(reference, getOffsetParent(popper), "fixed" === state.options.strategy),
                            popper: getLayoutRect(popper)
                        };
                        state.reset = false;
                        state.placement = state.options.placement;
                        state.orderedModifiers.forEach((function(modifier) {
                            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
                        }));
                        for (var index = 0; index < state.orderedModifiers.length; index++) {
                            if (false) ;
                            if (true === state.reset) {
                                state.reset = false;
                                index = -1;
                                continue;
                            }
                            var _state$orderedModifie = state.orderedModifiers[index], fn = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = void 0 === _state$orderedModifie2 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
                            if ("function" === typeof fn) state = fn({
                                state,
                                options: _options,
                                name,
                                instance
                            }) || state;
                        }
                    },
                    update: debounce((function() {
                        return new Promise((function(resolve) {
                            instance.forceUpdate();
                            resolve(state);
                        }));
                    })),
                    destroy: function destroy() {
                        cleanupModifierEffects();
                        isDestroyed = true;
                    }
                };
                if (!areValidElements(reference, popper)) {
                    if (false) ;
                    return instance;
                }
                instance.setOptions(options).then((function(state) {
                    if (!isDestroyed && options.onFirstUpdate) options.onFirstUpdate(state);
                }));
                function runModifierEffects() {
                    state.orderedModifiers.forEach((function(_ref3) {
                        var name = _ref3.name, _ref3$options = _ref3.options, options = void 0 === _ref3$options ? {} : _ref3$options, effect = _ref3.effect;
                        if ("function" === typeof effect) {
                            var cleanupFn = effect({
                                state,
                                name,
                                instance,
                                options
                            });
                            var noopFn = function noopFn() {};
                            effectCleanupFns.push(cleanupFn || noopFn);
                        }
                    }));
                }
                function cleanupModifierEffects() {
                    effectCleanupFns.forEach((function(fn) {
                        return fn();
                    }));
                    effectCleanupFns = [];
                }
                return instance;
            };
        }
        null && popperGenerator();
        var passive = {
            passive: true
        };
        function effect(_ref) {
            var state = _ref.state, instance = _ref.instance, options = _ref.options;
            var _options$scroll = options.scroll, scroll = void 0 === _options$scroll ? true : _options$scroll, _options$resize = options.resize, resize = void 0 === _options$resize ? true : _options$resize;
            var window = getWindow_getWindow(state.elements.popper);
            var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
            if (scroll) scrollParents.forEach((function(scrollParent) {
                scrollParent.addEventListener("scroll", instance.update, passive);
            }));
            if (resize) window.addEventListener("resize", instance.update, passive);
            return function() {
                if (scroll) scrollParents.forEach((function(scrollParent) {
                    scrollParent.removeEventListener("scroll", instance.update, passive);
                }));
                if (resize) window.removeEventListener("resize", instance.update, passive);
            };
        }
        const eventListeners = {
            name: "eventListeners",
            enabled: true,
            phase: "write",
            fn: function fn() {},
            effect,
            data: {}
        };
        function getBasePlacement(placement) {
            return placement.split("-")[0];
        }
        function getVariation(placement) {
            return placement.split("-")[1];
        }
        function getMainAxisFromPlacement(placement) {
            return [ "top", "bottom" ].indexOf(placement) >= 0 ? "x" : "y";
        }
        function computeOffsets(_ref) {
            var reference = _ref.reference, element = _ref.element, placement = _ref.placement;
            var basePlacement = placement ? getBasePlacement(placement) : null;
            var variation = placement ? getVariation(placement) : null;
            var commonX = reference.x + reference.width / 2 - element.width / 2;
            var commonY = reference.y + reference.height / 2 - element.height / 2;
            var offsets;
            switch (basePlacement) {
              case enums_top:
                offsets = {
                    x: commonX,
                    y: reference.y - element.height
                };
                break;

              case bottom:
                offsets = {
                    x: commonX,
                    y: reference.y + reference.height
                };
                break;

              case right:
                offsets = {
                    x: reference.x + reference.width,
                    y: commonY
                };
                break;

              case left:
                offsets = {
                    x: reference.x - element.width,
                    y: commonY
                };
                break;

              default:
                offsets = {
                    x: reference.x,
                    y: reference.y
                };
            }
            var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
            if (null != mainAxis) {
                var len = "y" === mainAxis ? "height" : "width";
                switch (variation) {
                  case start:
                    offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
                    break;

                  case end:
                    offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
                    break;

                  default:
                }
            }
            return offsets;
        }
        function popperOffsets(_ref) {
            var state = _ref.state, name = _ref.name;
            state.modifiersData[name] = computeOffsets({
                reference: state.rects.reference,
                element: state.rects.popper,
                strategy: "absolute",
                placement: state.placement
            });
        }
        const modifiers_popperOffsets = {
            name: "popperOffsets",
            enabled: true,
            phase: "read",
            fn: popperOffsets,
            data: {}
        };
        var unsetSides = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        };
        function roundOffsetsByDPR(_ref) {
            var x = _ref.x, y = _ref.y;
            var win = window;
            var dpr = win.devicePixelRatio || 1;
            return {
                x: round(x * dpr) / dpr || 0,
                y: round(y * dpr) / dpr || 0
            };
        }
        function mapToStyles(_ref2) {
            var _Object$assign2;
            var popper = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
            var _offsets$x = offsets.x, x = void 0 === _offsets$x ? 0 : _offsets$x, _offsets$y = offsets.y, y = void 0 === _offsets$y ? 0 : _offsets$y;
            var _ref3 = "function" === typeof roundOffsets ? roundOffsets({
                x,
                y
            }) : {
                x,
                y
            };
            x = _ref3.x;
            y = _ref3.y;
            var hasX = offsets.hasOwnProperty("x");
            var hasY = offsets.hasOwnProperty("y");
            var sideX = left;
            var sideY = enums_top;
            var win = window;
            if (adaptive) {
                var offsetParent = getOffsetParent(popper);
                var heightProp = "clientHeight";
                var widthProp = "clientWidth";
                if (offsetParent === getWindow_getWindow(popper)) {
                    offsetParent = getDocumentElement(popper);
                    if ("static" !== getComputedStyle_getComputedStyle(offsetParent).position && "absolute" === position) {
                        heightProp = "scrollHeight";
                        widthProp = "scrollWidth";
                    }
                }
                offsetParent;
                if (placement === enums_top || (placement === left || placement === right) && variation === end) {
                    sideY = bottom;
                    var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
                    y -= offsetY - popperRect.height;
                    y *= gpuAcceleration ? 1 : -1;
                }
                if (placement === left || (placement === enums_top || placement === bottom) && variation === end) {
                    sideX = right;
                    var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
                    x -= offsetX - popperRect.width;
                    x *= gpuAcceleration ? 1 : -1;
                }
            }
            var commonStyles = Object.assign({
                position
            }, adaptive && unsetSides);
            var _ref4 = true === roundOffsets ? roundOffsetsByDPR({
                x,
                y
            }) : {
                x,
                y
            };
            x = _ref4.x;
            y = _ref4.y;
            if (gpuAcceleration) {
                var _Object$assign;
                return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", 
                _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", 
                _Object$assign));
            }
            return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", 
            _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
        }
        function computeStyles(_ref5) {
            var state = _ref5.state, options = _ref5.options;
            var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = void 0 === _options$gpuAccelerat ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = void 0 === _options$adaptive ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = void 0 === _options$roundOffsets ? true : _options$roundOffsets;
            if (false) ;
            var commonStyles = {
                placement: getBasePlacement(state.placement),
                variation: getVariation(state.placement),
                popper: state.elements.popper,
                popperRect: state.rects.popper,
                gpuAcceleration,
                isFixed: "fixed" === state.options.strategy
            };
            if (null != state.modifiersData.popperOffsets) state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
                offsets: state.modifiersData.popperOffsets,
                position: state.options.strategy,
                adaptive,
                roundOffsets
            })));
            if (null != state.modifiersData.arrow) state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
                offsets: state.modifiersData.arrow,
                position: "absolute",
                adaptive: false,
                roundOffsets
            })));
            state.attributes.popper = Object.assign({}, state.attributes.popper, {
                "data-popper-placement": state.placement
            });
        }
        const modifiers_computeStyles = {
            name: "computeStyles",
            enabled: true,
            phase: "beforeWrite",
            fn: computeStyles,
            data: {}
        };
        function applyStyles(_ref) {
            var state = _ref.state;
            Object.keys(state.elements).forEach((function(name) {
                var style = state.styles[name] || {};
                var attributes = state.attributes[name] || {};
                var element = state.elements[name];
                if (!isHTMLElement(element) || !getNodeName(element)) return;
                Object.assign(element.style, style);
                Object.keys(attributes).forEach((function(name) {
                    var value = attributes[name];
                    if (false === value) element.removeAttribute(name); else element.setAttribute(name, true === value ? "" : value);
                }));
            }));
        }
        function applyStyles_effect(_ref2) {
            var state = _ref2.state;
            var initialStyles = {
                popper: {
                    position: state.options.strategy,
                    left: "0",
                    top: "0",
                    margin: "0"
                },
                arrow: {
                    position: "absolute"
                },
                reference: {}
            };
            Object.assign(state.elements.popper.style, initialStyles.popper);
            state.styles = initialStyles;
            if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
            return function() {
                Object.keys(state.elements).forEach((function(name) {
                    var element = state.elements[name];
                    var attributes = state.attributes[name] || {};
                    var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
                    var style = styleProperties.reduce((function(style, property) {
                        style[property] = "";
                        return style;
                    }), {});
                    if (!isHTMLElement(element) || !getNodeName(element)) return;
                    Object.assign(element.style, style);
                    Object.keys(attributes).forEach((function(attribute) {
                        element.removeAttribute(attribute);
                    }));
                }));
            };
        }
        const modifiers_applyStyles = {
            name: "applyStyles",
            enabled: true,
            phase: "write",
            fn: applyStyles,
            effect: applyStyles_effect,
            requires: [ "computeStyles" ]
        };
        function distanceAndSkiddingToXY(placement, rects, offset) {
            var basePlacement = getBasePlacement(placement);
            var invertDistance = [ left, enums_top ].indexOf(basePlacement) >= 0 ? -1 : 1;
            var _ref = "function" === typeof offset ? offset(Object.assign({}, rects, {
                placement
            })) : offset, skidding = _ref[0], distance = _ref[1];
            skidding = skidding || 0;
            distance = (distance || 0) * invertDistance;
            return [ left, right ].indexOf(basePlacement) >= 0 ? {
                x: distance,
                y: skidding
            } : {
                x: skidding,
                y: distance
            };
        }
        function offset(_ref2) {
            var state = _ref2.state, options = _ref2.options, name = _ref2.name;
            var _options$offset = options.offset, offset = void 0 === _options$offset ? [ 0, 0 ] : _options$offset;
            var data = enums_placements.reduce((function(acc, placement) {
                acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
                return acc;
            }), {});
            var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
            if (null != state.modifiersData.popperOffsets) {
                state.modifiersData.popperOffsets.x += x;
                state.modifiersData.popperOffsets.y += y;
            }
            state.modifiersData[name] = data;
        }
        const modifiers_offset = {
            name: "offset",
            enabled: true,
            phase: "main",
            requires: [ "popperOffsets" ],
            fn: offset
        };
        var hash = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        function getOppositePlacement(placement) {
            return placement.replace(/left|right|bottom|top/g, (function(matched) {
                return hash[matched];
            }));
        }
        var getOppositeVariationPlacement_hash = {
            start: "end",
            end: "start"
        };
        function getOppositeVariationPlacement(placement) {
            return placement.replace(/start|end/g, (function(matched) {
                return getOppositeVariationPlacement_hash[matched];
            }));
        }
        function getViewportRect(element) {
            var win = getWindow_getWindow(element);
            var html = getDocumentElement(element);
            var visualViewport = win.visualViewport;
            var width = html.clientWidth;
            var height = html.clientHeight;
            var x = 0;
            var y = 0;
            if (visualViewport) {
                width = visualViewport.width;
                height = visualViewport.height;
                if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                    x = visualViewport.offsetLeft;
                    y = visualViewport.offsetTop;
                }
            }
            return {
                width,
                height,
                x: x + getWindowScrollBarX(element),
                y
            };
        }
        function getDocumentRect(element) {
            var _element$ownerDocumen;
            var html = getDocumentElement(element);
            var winScroll = getWindowScroll(element);
            var body = null == (_element$ownerDocumen = element.ownerDocument) ? void 0 : _element$ownerDocumen.body;
            var width = math_max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
            var height = math_max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
            var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
            var y = -winScroll.scrollTop;
            if ("rtl" === getComputedStyle_getComputedStyle(body || html).direction) x += math_max(html.clientWidth, body ? body.clientWidth : 0) - width;
            return {
                width,
                height,
                x,
                y
            };
        }
        function contains(parent, child) {
            var rootNode = child.getRootNode && child.getRootNode();
            if (parent.contains(child)) return true; else if (rootNode && isShadowRoot(rootNode)) {
                var next = child;
                do {
                    if (next && parent.isSameNode(next)) return true;
                    next = next.parentNode || next.host;
                } while (next);
            }
            return false;
        }
        function rectToClientRect(rect) {
            return Object.assign({}, rect, {
                left: rect.x,
                top: rect.y,
                right: rect.x + rect.width,
                bottom: rect.y + rect.height
            });
        }
        function getInnerBoundingClientRect(element) {
            var rect = getBoundingClientRect(element);
            rect.top = rect.top + element.clientTop;
            rect.left = rect.left + element.clientLeft;
            rect.bottom = rect.top + element.clientHeight;
            rect.right = rect.left + element.clientWidth;
            rect.width = element.clientWidth;
            rect.height = element.clientHeight;
            rect.x = rect.left;
            rect.y = rect.top;
            return rect;
        }
        function getClientRectFromMixedType(element, clippingParent) {
            return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
        }
        function getClippingParents(element) {
            var clippingParents = listScrollParents(getParentNode(element));
            var canEscapeClipping = [ "absolute", "fixed" ].indexOf(getComputedStyle_getComputedStyle(element).position) >= 0;
            var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
            if (!isElement(clipperElement)) return [];
            return clippingParents.filter((function(clippingParent) {
                return isElement(clippingParent) && contains(clippingParent, clipperElement) && "body" !== getNodeName(clippingParent);
            }));
        }
        function getClippingRect(element, boundary, rootBoundary) {
            var mainClippingParents = "clippingParents" === boundary ? getClippingParents(element) : [].concat(boundary);
            var clippingParents = [].concat(mainClippingParents, [ rootBoundary ]);
            var firstClippingParent = clippingParents[0];
            var clippingRect = clippingParents.reduce((function(accRect, clippingParent) {
                var rect = getClientRectFromMixedType(element, clippingParent);
                accRect.top = math_max(rect.top, accRect.top);
                accRect.right = math_min(rect.right, accRect.right);
                accRect.bottom = math_min(rect.bottom, accRect.bottom);
                accRect.left = math_max(rect.left, accRect.left);
                return accRect;
            }), getClientRectFromMixedType(element, firstClippingParent));
            clippingRect.width = clippingRect.right - clippingRect.left;
            clippingRect.height = clippingRect.bottom - clippingRect.top;
            clippingRect.x = clippingRect.left;
            clippingRect.y = clippingRect.top;
            return clippingRect;
        }
        function getFreshSideObject() {
            return {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            };
        }
        function mergePaddingObject(paddingObject) {
            return Object.assign({}, getFreshSideObject(), paddingObject);
        }
        function expandToHashMap(value, keys) {
            return keys.reduce((function(hashMap, key) {
                hashMap[key] = value;
                return hashMap;
            }), {});
        }
        function detectOverflow(state, options) {
            if (void 0 === options) options = {};
            var _options = options, _options$placement = _options.placement, placement = void 0 === _options$placement ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = void 0 === _options$boundary ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = void 0 === _options$rootBoundary ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = void 0 === _options$elementConte ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = void 0 === _options$altBoundary ? false : _options$altBoundary, _options$padding = _options.padding, padding = void 0 === _options$padding ? 0 : _options$padding;
            var paddingObject = mergePaddingObject("number" !== typeof padding ? padding : expandToHashMap(padding, basePlacements));
            var altContext = elementContext === popper ? reference : popper;
            var popperRect = state.rects.popper;
            var element = state.elements[altBoundary ? altContext : elementContext];
            var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
            var referenceClientRect = getBoundingClientRect(state.elements.reference);
            var popperOffsets = computeOffsets({
                reference: referenceClientRect,
                element: popperRect,
                strategy: "absolute",
                placement
            });
            var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
            var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
            var overflowOffsets = {
                top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
                bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
                left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
                right: elementClientRect.right - clippingClientRect.right + paddingObject.right
            };
            var offsetData = state.modifiersData.offset;
            if (elementContext === popper && offsetData) {
                var offset = offsetData[placement];
                Object.keys(overflowOffsets).forEach((function(key) {
                    var multiply = [ right, bottom ].indexOf(key) >= 0 ? 1 : -1;
                    var axis = [ enums_top, bottom ].indexOf(key) >= 0 ? "y" : "x";
                    overflowOffsets[key] += offset[axis] * multiply;
                }));
            }
            return overflowOffsets;
        }
        function computeAutoPlacement(state, options) {
            if (void 0 === options) options = {};
            var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = void 0 === _options$allowedAutoP ? enums_placements : _options$allowedAutoP;
            var variation = getVariation(placement);
            var placements = variation ? flipVariations ? variationPlacements : variationPlacements.filter((function(placement) {
                return getVariation(placement) === variation;
            })) : basePlacements;
            var allowedPlacements = placements.filter((function(placement) {
                return allowedAutoPlacements.indexOf(placement) >= 0;
            }));
            if (0 === allowedPlacements.length) {
                allowedPlacements = placements;
                if (false) ;
            }
            var overflows = allowedPlacements.reduce((function(acc, placement) {
                acc[placement] = detectOverflow(state, {
                    placement,
                    boundary,
                    rootBoundary,
                    padding
                })[getBasePlacement(placement)];
                return acc;
            }), {});
            return Object.keys(overflows).sort((function(a, b) {
                return overflows[a] - overflows[b];
            }));
        }
        function getExpandedFallbackPlacements(placement) {
            if (getBasePlacement(placement) === auto) return [];
            var oppositePlacement = getOppositePlacement(placement);
            return [ getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement) ];
        }
        function flip(_ref) {
            var state = _ref.state, options = _ref.options, name = _ref.name;
            if (state.modifiersData[name]._skip) return;
            var _options$mainAxis = options.mainAxis, checkMainAxis = void 0 === _options$mainAxis ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = void 0 === _options$altAxis ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = void 0 === _options$flipVariatio ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
            var preferredPlacement = state.options.placement;
            var basePlacement = getBasePlacement(preferredPlacement);
            var isBasePlacement = basePlacement === preferredPlacement;
            var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [ getOppositePlacement(preferredPlacement) ] : getExpandedFallbackPlacements(preferredPlacement));
            var placements = [ preferredPlacement ].concat(fallbackPlacements).reduce((function(acc, placement) {
                return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
                    placement,
                    boundary,
                    rootBoundary,
                    padding,
                    flipVariations,
                    allowedAutoPlacements
                }) : placement);
            }), []);
            var referenceRect = state.rects.reference;
            var popperRect = state.rects.popper;
            var checksMap = new Map;
            var makeFallbackChecks = true;
            var firstFittingPlacement = placements[0];
            for (var i = 0; i < placements.length; i++) {
                var placement = placements[i];
                var _basePlacement = getBasePlacement(placement);
                var isStartVariation = getVariation(placement) === start;
                var isVertical = [ enums_top, bottom ].indexOf(_basePlacement) >= 0;
                var len = isVertical ? "width" : "height";
                var overflow = detectOverflow(state, {
                    placement,
                    boundary,
                    rootBoundary,
                    altBoundary,
                    padding
                });
                var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : enums_top;
                if (referenceRect[len] > popperRect[len]) mainVariationSide = getOppositePlacement(mainVariationSide);
                var altVariationSide = getOppositePlacement(mainVariationSide);
                var checks = [];
                if (checkMainAxis) checks.push(overflow[_basePlacement] <= 0);
                if (checkAltAxis) checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
                if (checks.every((function(check) {
                    return check;
                }))) {
                    firstFittingPlacement = placement;
                    makeFallbackChecks = false;
                    break;
                }
                checksMap.set(placement, checks);
            }
            if (makeFallbackChecks) {
                var numberOfChecks = flipVariations ? 3 : 1;
                var _loop = function _loop(_i) {
                    var fittingPlacement = placements.find((function(placement) {
                        var checks = checksMap.get(placement);
                        if (checks) return checks.slice(0, _i).every((function(check) {
                            return check;
                        }));
                    }));
                    if (fittingPlacement) {
                        firstFittingPlacement = fittingPlacement;
                        return "break";
                    }
                };
                for (var _i = numberOfChecks; _i > 0; _i--) {
                    var _ret = _loop(_i);
                    if ("break" === _ret) break;
                }
            }
            if (state.placement !== firstFittingPlacement) {
                state.modifiersData[name]._skip = true;
                state.placement = firstFittingPlacement;
                state.reset = true;
            }
        }
        const modifiers_flip = {
            name: "flip",
            enabled: true,
            phase: "main",
            fn: flip,
            requiresIfExists: [ "offset" ],
            data: {
                _skip: false
            }
        };
        function getAltAxis(axis) {
            return "x" === axis ? "y" : "x";
        }
        function within(min, value, max) {
            return math_max(min, math_min(value, max));
        }
        function withinMaxClamp(min, value, max) {
            var v = within(min, value, max);
            return v > max ? max : v;
        }
        function preventOverflow(_ref) {
            var state = _ref.state, options = _ref.options, name = _ref.name;
            var _options$mainAxis = options.mainAxis, checkMainAxis = void 0 === _options$mainAxis ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = void 0 === _options$altAxis ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = void 0 === _options$tether ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = void 0 === _options$tetherOffset ? 0 : _options$tetherOffset;
            var overflow = detectOverflow(state, {
                boundary,
                rootBoundary,
                padding,
                altBoundary
            });
            var basePlacement = getBasePlacement(state.placement);
            var variation = getVariation(state.placement);
            var isBasePlacement = !variation;
            var mainAxis = getMainAxisFromPlacement(basePlacement);
            var altAxis = getAltAxis(mainAxis);
            var popperOffsets = state.modifiersData.popperOffsets;
            var referenceRect = state.rects.reference;
            var popperRect = state.rects.popper;
            var tetherOffsetValue = "function" === typeof tetherOffset ? tetherOffset(Object.assign({}, state.rects, {
                placement: state.placement
            })) : tetherOffset;
            var normalizedTetherOffsetValue = "number" === typeof tetherOffsetValue ? {
                mainAxis: tetherOffsetValue,
                altAxis: tetherOffsetValue
            } : Object.assign({
                mainAxis: 0,
                altAxis: 0
            }, tetherOffsetValue);
            var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
            var data = {
                x: 0,
                y: 0
            };
            if (!popperOffsets) return;
            if (checkMainAxis) {
                var _offsetModifierState$;
                var mainSide = "y" === mainAxis ? enums_top : left;
                var altSide = "y" === mainAxis ? bottom : right;
                var len = "y" === mainAxis ? "height" : "width";
                var offset = popperOffsets[mainAxis];
                var min = offset + overflow[mainSide];
                var max = offset - overflow[altSide];
                var additive = tether ? -popperRect[len] / 2 : 0;
                var minLen = variation === start ? referenceRect[len] : popperRect[len];
                var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
                var arrowElement = state.elements.arrow;
                var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
                    width: 0,
                    height: 0
                };
                var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
                var arrowPaddingMin = arrowPaddingObject[mainSide];
                var arrowPaddingMax = arrowPaddingObject[altSide];
                var arrowLen = within(0, referenceRect[len], arrowRect[len]);
                var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
                var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
                var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
                var clientOffset = arrowOffsetParent ? "y" === mainAxis ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
                var offsetModifierValue = null != (_offsetModifierState$ = null == offsetModifierState ? void 0 : offsetModifierState[mainAxis]) ? _offsetModifierState$ : 0;
                var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
                var tetherMax = offset + maxOffset - offsetModifierValue;
                var preventedOffset = within(tether ? math_min(min, tetherMin) : min, offset, tether ? math_max(max, tetherMax) : max);
                popperOffsets[mainAxis] = preventedOffset;
                data[mainAxis] = preventedOffset - offset;
            }
            if (checkAltAxis) {
                var _offsetModifierState$2;
                var _mainSide = "x" === mainAxis ? enums_top : left;
                var _altSide = "x" === mainAxis ? bottom : right;
                var _offset = popperOffsets[altAxis];
                var _len = "y" === altAxis ? "height" : "width";
                var _min = _offset + overflow[_mainSide];
                var _max = _offset - overflow[_altSide];
                var isOriginSide = -1 !== [ enums_top, left ].indexOf(basePlacement);
                var _offsetModifierValue = null != (_offsetModifierState$2 = null == offsetModifierState ? void 0 : offsetModifierState[altAxis]) ? _offsetModifierState$2 : 0;
                var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
                var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
                var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
                popperOffsets[altAxis] = _preventedOffset;
                data[altAxis] = _preventedOffset - _offset;
            }
            state.modifiersData[name] = data;
        }
        const modifiers_preventOverflow = {
            name: "preventOverflow",
            enabled: true,
            phase: "main",
            fn: preventOverflow,
            requiresIfExists: [ "offset" ]
        };
        var toPaddingObject = function toPaddingObject(padding, state) {
            padding = "function" === typeof padding ? padding(Object.assign({}, state.rects, {
                placement: state.placement
            })) : padding;
            return mergePaddingObject("number" !== typeof padding ? padding : expandToHashMap(padding, basePlacements));
        };
        function arrow(_ref) {
            var _state$modifiersData$;
            var state = _ref.state, name = _ref.name, options = _ref.options;
            var arrowElement = state.elements.arrow;
            var popperOffsets = state.modifiersData.popperOffsets;
            var basePlacement = getBasePlacement(state.placement);
            var axis = getMainAxisFromPlacement(basePlacement);
            var isVertical = [ left, right ].indexOf(basePlacement) >= 0;
            var len = isVertical ? "height" : "width";
            if (!arrowElement || !popperOffsets) return;
            var paddingObject = toPaddingObject(options.padding, state);
            var arrowRect = getLayoutRect(arrowElement);
            var minProp = "y" === axis ? enums_top : left;
            var maxProp = "y" === axis ? bottom : right;
            var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
            var startDiff = popperOffsets[axis] - state.rects.reference[axis];
            var arrowOffsetParent = getOffsetParent(arrowElement);
            var clientSize = arrowOffsetParent ? "y" === axis ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
            var centerToReference = endDiff / 2 - startDiff / 2;
            var min = paddingObject[minProp];
            var max = clientSize - arrowRect[len] - paddingObject[maxProp];
            var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
            var offset = within(min, center, max);
            var axisProp = axis;
            state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, 
            _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
        }
        function arrow_effect(_ref2) {
            var state = _ref2.state, options = _ref2.options;
            var _options$element = options.element, arrowElement = void 0 === _options$element ? "[data-popper-arrow]" : _options$element;
            if (null == arrowElement) return;
            if ("string" === typeof arrowElement) {
                arrowElement = state.elements.popper.querySelector(arrowElement);
                if (!arrowElement) return;
            }
            if (false) ;
            if (!contains(state.elements.popper, arrowElement)) {
                if (false) ;
                return;
            }
            state.elements.arrow = arrowElement;
        }
        const modifiers_arrow = {
            name: "arrow",
            enabled: true,
            phase: "main",
            fn: arrow,
            effect: arrow_effect,
            requires: [ "popperOffsets" ],
            requiresIfExists: [ "preventOverflow" ]
        };
        function getSideOffsets(overflow, rect, preventedOffsets) {
            if (void 0 === preventedOffsets) preventedOffsets = {
                x: 0,
                y: 0
            };
            return {
                top: overflow.top - rect.height - preventedOffsets.y,
                right: overflow.right - rect.width + preventedOffsets.x,
                bottom: overflow.bottom - rect.height + preventedOffsets.y,
                left: overflow.left - rect.width - preventedOffsets.x
            };
        }
        function isAnySideFullyClipped(overflow) {
            return [ enums_top, right, bottom, left ].some((function(side) {
                return overflow[side] >= 0;
            }));
        }
        function hide(_ref) {
            var state = _ref.state, name = _ref.name;
            var referenceRect = state.rects.reference;
            var popperRect = state.rects.popper;
            var preventedOffsets = state.modifiersData.preventOverflow;
            var referenceOverflow = detectOverflow(state, {
                elementContext: "reference"
            });
            var popperAltOverflow = detectOverflow(state, {
                altBoundary: true
            });
            var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
            var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
            var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
            var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
            state.modifiersData[name] = {
                referenceClippingOffsets,
                popperEscapeOffsets,
                isReferenceHidden,
                hasPopperEscaped
            };
            state.attributes.popper = Object.assign({}, state.attributes.popper, {
                "data-popper-reference-hidden": isReferenceHidden,
                "data-popper-escaped": hasPopperEscaped
            });
        }
        const modifiers_hide = {
            name: "hide",
            enabled: true,
            phase: "main",
            requiresIfExists: [ "preventOverflow" ],
            fn: hide
        };
        var defaultModifiers = [ eventListeners, modifiers_popperOffsets, modifiers_computeStyles, modifiers_applyStyles, modifiers_offset, modifiers_flip, modifiers_preventOverflow, modifiers_arrow, modifiers_hide ];
        var popper_createPopper = popperGenerator({
            defaultModifiers
        });
        var BOX_CLASS = "tippy-box";
        var CONTENT_CLASS = "tippy-content";
        var BACKDROP_CLASS = "tippy-backdrop";
        var ARROW_CLASS = "tippy-arrow";
        var SVG_ARROW_CLASS = "tippy-svg-arrow";
        var TOUCH_OPTIONS = {
            passive: true,
            capture: true
        };
        var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO() {
            return document.body;
        };
        function getValueAtIndexOrReturn(value, index, defaultValue) {
            if (Array.isArray(value)) {
                var v = value[index];
                return null == v ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
            }
            return value;
        }
        function isType(value, type) {
            var str = {}.toString.call(value);
            return 0 === str.indexOf("[object") && str.indexOf(type + "]") > -1;
        }
        function invokeWithArgsOrReturn(value, args) {
            return "function" === typeof value ? value.apply(void 0, args) : value;
        }
        function tippy_esm_debounce(fn, ms) {
            if (0 === ms) return fn;
            var timeout;
            return function(arg) {
                clearTimeout(timeout);
                timeout = setTimeout((function() {
                    fn(arg);
                }), ms);
            };
        }
        function splitBySpaces(value) {
            return value.split(/\s+/).filter(Boolean);
        }
        function normalizeToArray(value) {
            return [].concat(value);
        }
        function pushIfUnique(arr, value) {
            if (-1 === arr.indexOf(value)) arr.push(value);
        }
        function unique(arr) {
            return arr.filter((function(item, index) {
                return arr.indexOf(item) === index;
            }));
        }
        function tippy_esm_getBasePlacement(placement) {
            return placement.split("-")[0];
        }
        function arrayFrom(value) {
            return [].slice.call(value);
        }
        function removeUndefinedProps(obj) {
            return Object.keys(obj).reduce((function(acc, key) {
                if (void 0 !== obj[key]) acc[key] = obj[key];
                return acc;
            }), {});
        }
        function div() {
            return document.createElement("div");
        }
        function tippy_esm_isElement(value) {
            return [ "Element", "Fragment" ].some((function(type) {
                return isType(value, type);
            }));
        }
        function isNodeList(value) {
            return isType(value, "NodeList");
        }
        function isMouseEvent(value) {
            return isType(value, "MouseEvent");
        }
        function isReferenceElement(value) {
            return !!(value && value._tippy && value._tippy.reference === value);
        }
        function getArrayOfElements(value) {
            if (tippy_esm_isElement(value)) return [ value ];
            if (isNodeList(value)) return arrayFrom(value);
            if (Array.isArray(value)) return value;
            return arrayFrom(document.querySelectorAll(value));
        }
        function setTransitionDuration(els, value) {
            els.forEach((function(el) {
                if (el) el.style.transitionDuration = value + "ms";
            }));
        }
        function setVisibilityState(els, state) {
            els.forEach((function(el) {
                if (el) el.setAttribute("data-state", state);
            }));
        }
        function getOwnerDocument(elementOrElements) {
            var _element$ownerDocumen;
            var _normalizeToArray = normalizeToArray(elementOrElements), element = _normalizeToArray[0];
            return null != element && null != (_element$ownerDocumen = element.ownerDocument) && _element$ownerDocumen.body ? element.ownerDocument : document;
        }
        function isCursorOutsideInteractiveBorder(popperTreeData, event) {
            var clientX = event.clientX, clientY = event.clientY;
            return popperTreeData.every((function(_ref) {
                var popperRect = _ref.popperRect, popperState = _ref.popperState, props = _ref.props;
                var interactiveBorder = props.interactiveBorder;
                var basePlacement = tippy_esm_getBasePlacement(popperState.placement);
                var offsetData = popperState.modifiersData.offset;
                if (!offsetData) return true;
                var topDistance = "bottom" === basePlacement ? offsetData.top.y : 0;
                var bottomDistance = "top" === basePlacement ? offsetData.bottom.y : 0;
                var leftDistance = "right" === basePlacement ? offsetData.left.x : 0;
                var rightDistance = "left" === basePlacement ? offsetData.right.x : 0;
                var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
                var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
                var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
                var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
                return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
            }));
        }
        function updateTransitionEndListener(box, action, listener) {
            var method = action + "EventListener";
            [ "transitionend", "webkitTransitionEnd" ].forEach((function(event) {
                box[method](event, listener);
            }));
        }
        function actualContains(parent, child) {
            var target = child;
            while (target) {
                var _target$getRootNode;
                if (parent.contains(target)) return true;
                target = null == target.getRootNode ? void 0 : null == (_target$getRootNode = target.getRootNode()) ? void 0 : _target$getRootNode.host;
            }
            return false;
        }
        var currentInput = {
            isTouch: false
        };
        var lastMouseMoveTime = 0;
        function onDocumentTouchStart() {
            if (currentInput.isTouch) return;
            currentInput.isTouch = true;
            if (window.performance) document.addEventListener("mousemove", onDocumentMouseMove);
        }
        function onDocumentMouseMove() {
            var now = performance.now();
            if (now - lastMouseMoveTime < 20) {
                currentInput.isTouch = false;
                document.removeEventListener("mousemove", onDocumentMouseMove);
            }
            lastMouseMoveTime = now;
        }
        function onWindowBlur() {
            var activeElement = document.activeElement;
            if (isReferenceElement(activeElement)) {
                var instance = activeElement._tippy;
                if (activeElement.blur && !instance.state.isVisible) activeElement.blur();
            }
        }
        function bindGlobalEventListeners() {
            document.addEventListener("touchstart", onDocumentTouchStart, TOUCH_OPTIONS);
            window.addEventListener("blur", onWindowBlur);
        }
        var isBrowser = "undefined" !== typeof window && "undefined" !== typeof document;
        var isIE11 = isBrowser ? !!window.msCrypto : false;
        if (false) ;
        var pluginProps = {
            animateFill: false,
            followCursor: false,
            inlinePositioning: false,
            sticky: false
        };
        var renderProps = {
            allowHTML: false,
            animation: "fade",
            arrow: true,
            content: "",
            inertia: false,
            maxWidth: 350,
            role: "tooltip",
            theme: "",
            zIndex: 9999
        };
        var defaultProps = Object.assign({
            appendTo: TIPPY_DEFAULT_APPEND_TO,
            aria: {
                content: "auto",
                expanded: "auto"
            },
            delay: 0,
            duration: [ 300, 250 ],
            getReferenceClientRect: null,
            hideOnClick: true,
            ignoreAttributes: false,
            interactive: false,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            moveTransition: "",
            offset: [ 0, 10 ],
            onAfterUpdate: function onAfterUpdate() {},
            onBeforeUpdate: function onBeforeUpdate() {},
            onCreate: function onCreate() {},
            onDestroy: function onDestroy() {},
            onHidden: function onHidden() {},
            onHide: function onHide() {},
            onMount: function onMount() {},
            onShow: function onShow() {},
            onShown: function onShown() {},
            onTrigger: function onTrigger() {},
            onUntrigger: function onUntrigger() {},
            onClickOutside: function onClickOutside() {},
            placement: "top",
            plugins: [],
            popperOptions: {},
            render: null,
            showOnCreate: false,
            touch: true,
            trigger: "mouseenter focus",
            triggerTarget: null
        }, pluginProps, renderProps);
        var defaultKeys = Object.keys(defaultProps);
        var setDefaultProps = function setDefaultProps(partialProps) {
            if (false) ;
            var keys = Object.keys(partialProps);
            keys.forEach((function(key) {
                defaultProps[key] = partialProps[key];
            }));
        };
        function getExtendedPassedProps(passedProps) {
            var plugins = passedProps.plugins || [];
            var pluginProps = plugins.reduce((function(acc, plugin) {
                var name = plugin.name, defaultValue = plugin.defaultValue;
                if (name) {
                    var _name;
                    acc[name] = void 0 !== passedProps[name] ? passedProps[name] : null != (_name = defaultProps[name]) ? _name : defaultValue;
                }
                return acc;
            }), {});
            return Object.assign({}, passedProps, pluginProps);
        }
        function getDataAttributeProps(reference, plugins) {
            var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
                plugins
            }))) : defaultKeys;
            var props = propKeys.reduce((function(acc, key) {
                var valueAsString = (reference.getAttribute("data-tippy-" + key) || "").trim();
                if (!valueAsString) return acc;
                if ("content" === key) acc[key] = valueAsString; else try {
                    acc[key] = JSON.parse(valueAsString);
                } catch (e) {
                    acc[key] = valueAsString;
                }
                return acc;
            }), {});
            return props;
        }
        function evaluateProps(reference, props) {
            var out = Object.assign({}, props, {
                content: invokeWithArgsOrReturn(props.content, [ reference ])
            }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
            out.aria = Object.assign({}, defaultProps.aria, out.aria);
            out.aria = {
                expanded: "auto" === out.aria.expanded ? props.interactive : out.aria.expanded,
                content: "auto" === out.aria.content ? props.interactive ? null : "describedby" : out.aria.content
            };
            return out;
        }
        var innerHTML = function innerHTML() {
            return "innerHTML";
        };
        function dangerouslySetInnerHTML(element, html) {
            element[innerHTML()] = html;
        }
        function createArrowElement(value) {
            var arrow = div();
            if (true === value) arrow.className = ARROW_CLASS; else {
                arrow.className = SVG_ARROW_CLASS;
                if (tippy_esm_isElement(value)) arrow.appendChild(value); else dangerouslySetInnerHTML(arrow, value);
            }
            return arrow;
        }
        function setContent(content, props) {
            if (tippy_esm_isElement(props.content)) {
                dangerouslySetInnerHTML(content, "");
                content.appendChild(props.content);
            } else if ("function" !== typeof props.content) if (props.allowHTML) dangerouslySetInnerHTML(content, props.content); else content.textContent = props.content;
        }
        function getChildren(popper) {
            var box = popper.firstElementChild;
            var boxChildren = arrayFrom(box.children);
            return {
                box,
                content: boxChildren.find((function(node) {
                    return node.classList.contains(CONTENT_CLASS);
                })),
                arrow: boxChildren.find((function(node) {
                    return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
                })),
                backdrop: boxChildren.find((function(node) {
                    return node.classList.contains(BACKDROP_CLASS);
                }))
            };
        }
        function render(instance) {
            var popper = div();
            var box = div();
            box.className = BOX_CLASS;
            box.setAttribute("data-state", "hidden");
            box.setAttribute("tabindex", "-1");
            var content = div();
            content.className = CONTENT_CLASS;
            content.setAttribute("data-state", "hidden");
            setContent(content, instance.props);
            popper.appendChild(box);
            box.appendChild(content);
            onUpdate(instance.props, instance.props);
            function onUpdate(prevProps, nextProps) {
                var _getChildren = getChildren(popper), box = _getChildren.box, content = _getChildren.content, arrow = _getChildren.arrow;
                if (nextProps.theme) box.setAttribute("data-theme", nextProps.theme); else box.removeAttribute("data-theme");
                if ("string" === typeof nextProps.animation) box.setAttribute("data-animation", nextProps.animation); else box.removeAttribute("data-animation");
                if (nextProps.inertia) box.setAttribute("data-inertia", ""); else box.removeAttribute("data-inertia");
                box.style.maxWidth = "number" === typeof nextProps.maxWidth ? nextProps.maxWidth + "px" : nextProps.maxWidth;
                if (nextProps.role) box.setAttribute("role", nextProps.role); else box.removeAttribute("role");
                if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) setContent(content, instance.props);
                if (nextProps.arrow) {
                    if (!arrow) box.appendChild(createArrowElement(nextProps.arrow)); else if (prevProps.arrow !== nextProps.arrow) {
                        box.removeChild(arrow);
                        box.appendChild(createArrowElement(nextProps.arrow));
                    }
                } else if (arrow) box.removeChild(arrow);
            }
            return {
                popper,
                onUpdate
            };
        }
        render.$$tippy = true;
        var idCounter = 1;
        var mouseMoveListeners = [];
        var mountedInstances = [];
        function createTippy(reference, passedProps) {
            var props = evaluateProps(reference, Object.assign({}, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps))));
            var showTimeout;
            var hideTimeout;
            var scheduleHideAnimationFrame;
            var isVisibleFromClick = false;
            var didHideDueToDocumentMouseDown = false;
            var didTouchMove = false;
            var ignoreOnFirstUpdate = false;
            var lastTriggerEvent;
            var currentTransitionEndListener;
            var onFirstUpdate;
            var listeners = [];
            var debouncedOnMouseMove = tippy_esm_debounce(onMouseMove, props.interactiveDebounce);
            var currentTarget;
            var id = idCounter++;
            var popperInstance = null;
            var plugins = unique(props.plugins);
            var state = {
                isEnabled: true,
                isVisible: false,
                isDestroyed: false,
                isMounted: false,
                isShown: false
            };
            var instance = {
                id,
                reference,
                popper: div(),
                popperInstance,
                props,
                state,
                plugins,
                clearDelayTimeouts,
                setProps,
                setContent,
                show,
                hide,
                hideWithInteractivity,
                enable,
                disable,
                unmount,
                destroy
            };
            if (!props.render) {
                if (false) ;
                return instance;
            }
            var _props$render = props.render(instance), popper = _props$render.popper, onUpdate = _props$render.onUpdate;
            popper.setAttribute("data-tippy-root", "");
            popper.id = "tippy-" + instance.id;
            instance.popper = popper;
            reference._tippy = instance;
            popper._tippy = instance;
            var pluginsHooks = plugins.map((function(plugin) {
                return plugin.fn(instance);
            }));
            var hasAriaExpanded = reference.hasAttribute("aria-expanded");
            addListeners();
            handleAriaExpandedAttribute();
            handleStyles();
            invokeHook("onCreate", [ instance ]);
            if (props.showOnCreate) scheduleShow();
            popper.addEventListener("mouseenter", (function() {
                if (instance.props.interactive && instance.state.isVisible) instance.clearDelayTimeouts();
            }));
            popper.addEventListener("mouseleave", (function() {
                if (instance.props.interactive && instance.props.trigger.indexOf("mouseenter") >= 0) getDocument().addEventListener("mousemove", debouncedOnMouseMove);
            }));
            return instance;
            function getNormalizedTouchSettings() {
                var touch = instance.props.touch;
                return Array.isArray(touch) ? touch : [ touch, 0 ];
            }
            function getIsCustomTouchBehavior() {
                return "hold" === getNormalizedTouchSettings()[0];
            }
            function getIsDefaultRenderFn() {
                var _instance$props$rende;
                return !!(null != (_instance$props$rende = instance.props.render) && _instance$props$rende.$$tippy);
            }
            function getCurrentTarget() {
                return currentTarget || reference;
            }
            function getDocument() {
                var parent = getCurrentTarget().parentNode;
                return parent ? getOwnerDocument(parent) : document;
            }
            function getDefaultTemplateChildren() {
                return getChildren(popper);
            }
            function getDelay(isShow) {
                if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && "focus" === lastTriggerEvent.type) return 0;
                return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
            }
            function handleStyles(fromHide) {
                if (void 0 === fromHide) fromHide = false;
                popper.style.pointerEvents = instance.props.interactive && !fromHide ? "" : "none";
                popper.style.zIndex = "" + instance.props.zIndex;
            }
            function invokeHook(hook, args, shouldInvokePropsHook) {
                if (void 0 === shouldInvokePropsHook) shouldInvokePropsHook = true;
                pluginsHooks.forEach((function(pluginHooks) {
                    if (pluginHooks[hook]) pluginHooks[hook].apply(pluginHooks, args);
                }));
                if (shouldInvokePropsHook) {
                    var _instance$props;
                    (_instance$props = instance.props)[hook].apply(_instance$props, args);
                }
            }
            function handleAriaContentAttribute() {
                var aria = instance.props.aria;
                if (!aria.content) return;
                var attr = "aria-" + aria.content;
                var id = popper.id;
                var nodes = normalizeToArray(instance.props.triggerTarget || reference);
                nodes.forEach((function(node) {
                    var currentValue = node.getAttribute(attr);
                    if (instance.state.isVisible) node.setAttribute(attr, currentValue ? currentValue + " " + id : id); else {
                        var nextValue = currentValue && currentValue.replace(id, "").trim();
                        if (nextValue) node.setAttribute(attr, nextValue); else node.removeAttribute(attr);
                    }
                }));
            }
            function handleAriaExpandedAttribute() {
                if (hasAriaExpanded || !instance.props.aria.expanded) return;
                var nodes = normalizeToArray(instance.props.triggerTarget || reference);
                nodes.forEach((function(node) {
                    if (instance.props.interactive) node.setAttribute("aria-expanded", instance.state.isVisible && node === getCurrentTarget() ? "true" : "false"); else node.removeAttribute("aria-expanded");
                }));
            }
            function cleanupInteractiveMouseListeners() {
                getDocument().removeEventListener("mousemove", debouncedOnMouseMove);
                mouseMoveListeners = mouseMoveListeners.filter((function(listener) {
                    return listener !== debouncedOnMouseMove;
                }));
            }
            function onDocumentPress(event) {
                if (currentInput.isTouch) if (didTouchMove || "mousedown" === event.type) return;
                var actualTarget = event.composedPath && event.composedPath()[0] || event.target;
                if (instance.props.interactive && actualContains(popper, actualTarget)) return;
                if (normalizeToArray(instance.props.triggerTarget || reference).some((function(el) {
                    return actualContains(el, actualTarget);
                }))) {
                    if (currentInput.isTouch) return;
                    if (instance.state.isVisible && instance.props.trigger.indexOf("click") >= 0) return;
                } else invokeHook("onClickOutside", [ instance, event ]);
                if (true === instance.props.hideOnClick) {
                    instance.clearDelayTimeouts();
                    instance.hide();
                    didHideDueToDocumentMouseDown = true;
                    setTimeout((function() {
                        didHideDueToDocumentMouseDown = false;
                    }));
                    if (!instance.state.isMounted) removeDocumentPress();
                }
            }
            function onTouchMove() {
                didTouchMove = true;
            }
            function onTouchStart() {
                didTouchMove = false;
            }
            function addDocumentPress() {
                var doc = getDocument();
                doc.addEventListener("mousedown", onDocumentPress, true);
                doc.addEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
                doc.addEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
                doc.addEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
            }
            function removeDocumentPress() {
                var doc = getDocument();
                doc.removeEventListener("mousedown", onDocumentPress, true);
                doc.removeEventListener("touchend", onDocumentPress, TOUCH_OPTIONS);
                doc.removeEventListener("touchstart", onTouchStart, TOUCH_OPTIONS);
                doc.removeEventListener("touchmove", onTouchMove, TOUCH_OPTIONS);
            }
            function onTransitionedOut(duration, callback) {
                onTransitionEnd(duration, (function() {
                    if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) callback();
                }));
            }
            function onTransitionedIn(duration, callback) {
                onTransitionEnd(duration, callback);
            }
            function onTransitionEnd(duration, callback) {
                var box = getDefaultTemplateChildren().box;
                function listener(event) {
                    if (event.target === box) {
                        updateTransitionEndListener(box, "remove", listener);
                        callback();
                    }
                }
                if (0 === duration) return callback();
                updateTransitionEndListener(box, "remove", currentTransitionEndListener);
                updateTransitionEndListener(box, "add", listener);
                currentTransitionEndListener = listener;
            }
            function on(eventType, handler, options) {
                if (void 0 === options) options = false;
                var nodes = normalizeToArray(instance.props.triggerTarget || reference);
                nodes.forEach((function(node) {
                    node.addEventListener(eventType, handler, options);
                    listeners.push({
                        node,
                        eventType,
                        handler,
                        options
                    });
                }));
            }
            function addListeners() {
                if (getIsCustomTouchBehavior()) {
                    on("touchstart", onTrigger, {
                        passive: true
                    });
                    on("touchend", onMouseLeave, {
                        passive: true
                    });
                }
                splitBySpaces(instance.props.trigger).forEach((function(eventType) {
                    if ("manual" === eventType) return;
                    on(eventType, onTrigger);
                    switch (eventType) {
                      case "mouseenter":
                        on("mouseleave", onMouseLeave);
                        break;

                      case "focus":
                        on(isIE11 ? "focusout" : "blur", onBlurOrFocusOut);
                        break;

                      case "focusin":
                        on("focusout", onBlurOrFocusOut);
                        break;
                    }
                }));
            }
            function removeListeners() {
                listeners.forEach((function(_ref) {
                    var node = _ref.node, eventType = _ref.eventType, handler = _ref.handler, options = _ref.options;
                    node.removeEventListener(eventType, handler, options);
                }));
                listeners = [];
            }
            function onTrigger(event) {
                var _lastTriggerEvent;
                var shouldScheduleClickHide = false;
                if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) return;
                var wasFocused = "focus" === (null == (_lastTriggerEvent = lastTriggerEvent) ? void 0 : _lastTriggerEvent.type);
                lastTriggerEvent = event;
                currentTarget = event.currentTarget;
                handleAriaExpandedAttribute();
                if (!instance.state.isVisible && isMouseEvent(event)) mouseMoveListeners.forEach((function(listener) {
                    return listener(event);
                }));
                if ("click" === event.type && (instance.props.trigger.indexOf("mouseenter") < 0 || isVisibleFromClick) && false !== instance.props.hideOnClick && instance.state.isVisible) shouldScheduleClickHide = true; else scheduleShow(event);
                if ("click" === event.type) isVisibleFromClick = !shouldScheduleClickHide;
                if (shouldScheduleClickHide && !wasFocused) scheduleHide(event);
            }
            function onMouseMove(event) {
                var target = event.target;
                var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);
                if ("mousemove" === event.type && isCursorOverReferenceOrPopper) return;
                var popperTreeData = getNestedPopperTree().concat(popper).map((function(popper) {
                    var _instance$popperInsta;
                    var instance = popper._tippy;
                    var state = null == (_instance$popperInsta = instance.popperInstance) ? void 0 : _instance$popperInsta.state;
                    if (state) return {
                        popperRect: popper.getBoundingClientRect(),
                        popperState: state,
                        props
                    };
                    return null;
                })).filter(Boolean);
                if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
                    cleanupInteractiveMouseListeners();
                    scheduleHide(event);
                }
            }
            function onMouseLeave(event) {
                var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf("click") >= 0 && isVisibleFromClick;
                if (shouldBail) return;
                if (instance.props.interactive) {
                    instance.hideWithInteractivity(event);
                    return;
                }
                scheduleHide(event);
            }
            function onBlurOrFocusOut(event) {
                if (instance.props.trigger.indexOf("focusin") < 0 && event.target !== getCurrentTarget()) return;
                if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) return;
                scheduleHide(event);
            }
            function isEventListenerStopped(event) {
                return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf("touch") >= 0 : false;
            }
            function createPopperInstance() {
                destroyPopperInstance();
                var _instance$props2 = instance.props, popperOptions = _instance$props2.popperOptions, placement = _instance$props2.placement, offset = _instance$props2.offset, getReferenceClientRect = _instance$props2.getReferenceClientRect, moveTransition = _instance$props2.moveTransition;
                var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
                var computedReference = getReferenceClientRect ? {
                    getBoundingClientRect: getReferenceClientRect,
                    contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
                } : reference;
                var tippyModifier = {
                    name: "$$tippy",
                    enabled: true,
                    phase: "beforeWrite",
                    requires: [ "computeStyles" ],
                    fn: function fn(_ref2) {
                        var state = _ref2.state;
                        if (getIsDefaultRenderFn()) {
                            var _getDefaultTemplateCh = getDefaultTemplateChildren(), box = _getDefaultTemplateCh.box;
                            [ "placement", "reference-hidden", "escaped" ].forEach((function(attr) {
                                if ("placement" === attr) box.setAttribute("data-placement", state.placement); else if (state.attributes.popper["data-popper-" + attr]) box.setAttribute("data-" + attr, ""); else box.removeAttribute("data-" + attr);
                            }));
                            state.attributes.popper = {};
                        }
                    }
                };
                var modifiers = [ {
                    name: "offset",
                    options: {
                        offset
                    }
                }, {
                    name: "preventOverflow",
                    options: {
                        padding: {
                            top: 2,
                            bottom: 2,
                            left: 5,
                            right: 5
                        }
                    }
                }, {
                    name: "flip",
                    options: {
                        padding: 5
                    }
                }, {
                    name: "computeStyles",
                    options: {
                        adaptive: !moveTransition
                    }
                }, tippyModifier ];
                if (getIsDefaultRenderFn() && arrow) modifiers.push({
                    name: "arrow",
                    options: {
                        element: arrow,
                        padding: 3
                    }
                });
                modifiers.push.apply(modifiers, (null == popperOptions ? void 0 : popperOptions.modifiers) || []);
                instance.popperInstance = popper_createPopper(computedReference, popper, Object.assign({}, popperOptions, {
                    placement,
                    onFirstUpdate,
                    modifiers
                }));
            }
            function destroyPopperInstance() {
                if (instance.popperInstance) {
                    instance.popperInstance.destroy();
                    instance.popperInstance = null;
                }
            }
            function mount() {
                var appendTo = instance.props.appendTo;
                var parentNode;
                var node = getCurrentTarget();
                if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || "parent" === appendTo) parentNode = node.parentNode; else parentNode = invokeWithArgsOrReturn(appendTo, [ node ]);
                if (!parentNode.contains(popper)) parentNode.appendChild(popper);
                instance.state.isMounted = true;
                createPopperInstance();
                if (false) ;
            }
            function getNestedPopperTree() {
                return arrayFrom(popper.querySelectorAll("[data-tippy-root]"));
            }
            function scheduleShow(event) {
                instance.clearDelayTimeouts();
                if (event) invokeHook("onTrigger", [ instance, event ]);
                addDocumentPress();
                var delay = getDelay(true);
                var _getNormalizedTouchSe = getNormalizedTouchSettings(), touchValue = _getNormalizedTouchSe[0], touchDelay = _getNormalizedTouchSe[1];
                if (currentInput.isTouch && "hold" === touchValue && touchDelay) delay = touchDelay;
                if (delay) showTimeout = setTimeout((function() {
                    instance.show();
                }), delay); else instance.show();
            }
            function scheduleHide(event) {
                instance.clearDelayTimeouts();
                invokeHook("onUntrigger", [ instance, event ]);
                if (!instance.state.isVisible) {
                    removeDocumentPress();
                    return;
                }
                if (instance.props.trigger.indexOf("mouseenter") >= 0 && instance.props.trigger.indexOf("click") >= 0 && [ "mouseleave", "mousemove" ].indexOf(event.type) >= 0 && isVisibleFromClick) return;
                var delay = getDelay(false);
                if (delay) hideTimeout = setTimeout((function() {
                    if (instance.state.isVisible) instance.hide();
                }), delay); else scheduleHideAnimationFrame = requestAnimationFrame((function() {
                    instance.hide();
                }));
            }
            function enable() {
                instance.state.isEnabled = true;
            }
            function disable() {
                instance.hide();
                instance.state.isEnabled = false;
            }
            function clearDelayTimeouts() {
                clearTimeout(showTimeout);
                clearTimeout(hideTimeout);
                cancelAnimationFrame(scheduleHideAnimationFrame);
            }
            function setProps(partialProps) {
                if (false) ;
                if (instance.state.isDestroyed) return;
                invokeHook("onBeforeUpdate", [ instance, partialProps ]);
                removeListeners();
                var prevProps = instance.props;
                var nextProps = evaluateProps(reference, Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
                    ignoreAttributes: true
                }));
                instance.props = nextProps;
                addListeners();
                if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
                    cleanupInteractiveMouseListeners();
                    debouncedOnMouseMove = tippy_esm_debounce(onMouseMove, nextProps.interactiveDebounce);
                }
                if (prevProps.triggerTarget && !nextProps.triggerTarget) normalizeToArray(prevProps.triggerTarget).forEach((function(node) {
                    node.removeAttribute("aria-expanded");
                })); else if (nextProps.triggerTarget) reference.removeAttribute("aria-expanded");
                handleAriaExpandedAttribute();
                handleStyles();
                if (onUpdate) onUpdate(prevProps, nextProps);
                if (instance.popperInstance) {
                    createPopperInstance();
                    getNestedPopperTree().forEach((function(nestedPopper) {
                        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
                    }));
                }
                invokeHook("onAfterUpdate", [ instance, partialProps ]);
            }
            function setContent(content) {
                instance.setProps({
                    content
                });
            }
            function show() {
                if (false) ;
                var isAlreadyVisible = instance.state.isVisible;
                var isDestroyed = instance.state.isDestroyed;
                var isDisabled = !instance.state.isEnabled;
                var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
                var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);
                if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) return;
                if (getCurrentTarget().hasAttribute("disabled")) return;
                invokeHook("onShow", [ instance ], false);
                if (false === instance.props.onShow(instance)) return;
                instance.state.isVisible = true;
                if (getIsDefaultRenderFn()) popper.style.visibility = "visible";
                handleStyles();
                addDocumentPress();
                if (!instance.state.isMounted) popper.style.transition = "none";
                if (getIsDefaultRenderFn()) {
                    var _getDefaultTemplateCh2 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh2.box, content = _getDefaultTemplateCh2.content;
                    setTransitionDuration([ box, content ], 0);
                }
                onFirstUpdate = function onFirstUpdate() {
                    var _instance$popperInsta2;
                    if (!instance.state.isVisible || ignoreOnFirstUpdate) return;
                    ignoreOnFirstUpdate = true;
                    void popper.offsetHeight;
                    popper.style.transition = instance.props.moveTransition;
                    if (getIsDefaultRenderFn() && instance.props.animation) {
                        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(), _box = _getDefaultTemplateCh3.box, _content = _getDefaultTemplateCh3.content;
                        setTransitionDuration([ _box, _content ], duration);
                        setVisibilityState([ _box, _content ], "visible");
                    }
                    handleAriaContentAttribute();
                    handleAriaExpandedAttribute();
                    pushIfUnique(mountedInstances, instance);
                    null == (_instance$popperInsta2 = instance.popperInstance) ? void 0 : _instance$popperInsta2.forceUpdate();
                    invokeHook("onMount", [ instance ]);
                    if (instance.props.animation && getIsDefaultRenderFn()) onTransitionedIn(duration, (function() {
                        instance.state.isShown = true;
                        invokeHook("onShown", [ instance ]);
                    }));
                };
                mount();
            }
            function hide() {
                if (false) ;
                var isAlreadyHidden = !instance.state.isVisible;
                var isDestroyed = instance.state.isDestroyed;
                var isDisabled = !instance.state.isEnabled;
                var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);
                if (isAlreadyHidden || isDestroyed || isDisabled) return;
                invokeHook("onHide", [ instance ], false);
                if (false === instance.props.onHide(instance)) return;
                instance.state.isVisible = false;
                instance.state.isShown = false;
                ignoreOnFirstUpdate = false;
                isVisibleFromClick = false;
                if (getIsDefaultRenderFn()) popper.style.visibility = "hidden";
                cleanupInteractiveMouseListeners();
                removeDocumentPress();
                handleStyles(true);
                if (getIsDefaultRenderFn()) {
                    var _getDefaultTemplateCh4 = getDefaultTemplateChildren(), box = _getDefaultTemplateCh4.box, content = _getDefaultTemplateCh4.content;
                    if (instance.props.animation) {
                        setTransitionDuration([ box, content ], duration);
                        setVisibilityState([ box, content ], "hidden");
                    }
                }
                handleAriaContentAttribute();
                handleAriaExpandedAttribute();
                if (instance.props.animation) {
                    if (getIsDefaultRenderFn()) onTransitionedOut(duration, instance.unmount);
                } else instance.unmount();
            }
            function hideWithInteractivity(event) {
                if (false) ;
                getDocument().addEventListener("mousemove", debouncedOnMouseMove);
                pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
                debouncedOnMouseMove(event);
            }
            function unmount() {
                if (false) ;
                if (instance.state.isVisible) instance.hide();
                if (!instance.state.isMounted) return;
                destroyPopperInstance();
                getNestedPopperTree().forEach((function(nestedPopper) {
                    nestedPopper._tippy.unmount();
                }));
                if (popper.parentNode) popper.parentNode.removeChild(popper);
                mountedInstances = mountedInstances.filter((function(i) {
                    return i !== instance;
                }));
                instance.state.isMounted = false;
                invokeHook("onHidden", [ instance ]);
            }
            function destroy() {
                if (false) ;
                if (instance.state.isDestroyed) return;
                instance.clearDelayTimeouts();
                instance.unmount();
                removeListeners();
                delete reference._tippy;
                instance.state.isDestroyed = true;
                invokeHook("onDestroy", [ instance ]);
            }
        }
        function tippy(targets, optionalProps) {
            if (void 0 === optionalProps) optionalProps = {};
            var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
            if (false) ;
            bindGlobalEventListeners();
            var passedProps = Object.assign({}, optionalProps, {
                plugins
            });
            var elements = getArrayOfElements(targets);
            if (false) ;
            var instances = elements.reduce((function(acc, reference) {
                var instance = reference && createTippy(reference, passedProps);
                if (instance) acc.push(instance);
                return acc;
            }), []);
            return tippy_esm_isElement(targets) ? instances[0] : instances;
        }
        tippy.defaultProps = defaultProps;
        tippy.setDefaultProps = setDefaultProps;
        tippy.currentInput = currentInput;
        Object.assign({}, modifiers_applyStyles, {
            effect: function effect(_ref) {
                var state = _ref.state;
                var initialStyles = {
                    popper: {
                        position: state.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0"
                    },
                    arrow: {
                        position: "absolute"
                    },
                    reference: {}
                };
                Object.assign(state.elements.popper.style, initialStyles.popper);
                state.styles = initialStyles;
                if (state.elements.arrow) Object.assign(state.elements.arrow.style, initialStyles.arrow);
            }
        });
        tippy.setDefaultProps({
            render
        });
        const tippy_esm = tippy;
        flsModules.tippy = tippy_esm("#tip-hot", {
            placement: "top-start",
            content: "Популярное",
            theme: "hot"
        });
        flsModules.tippy = tippy_esm("#tip-fast", {
            placement: "top-start",
            content: "Быстрое чтение",
            theme: "fast"
        });
        flsModules.tippy = tippy_esm("#tip-new", {
            placement: "top-start",
            content: "Новое",
            theme: "new"
        });
        flsModules.tippy = tippy_esm("#tip-sert", {
            placement: "top-start",
            content: "Сертификат",
            theme: "sert"
        });
        flsModules.tippy = tippy_esm("#tip-letter", {
            placement: "top-start",
            content: "Благодарственное письмо",
            theme: "letter"
        });
        flsModules.tippy = tippy_esm("#tip-cup", {
            placement: "top-start",
            content: "Награда",
            theme: "cup"
        });
        function isObject(obj) {
            return null !== obj && "object" === typeof obj && "constructor" in obj && obj.constructor === Object;
        }
        function extend(target = {}, src = {}) {
            Object.keys(src).forEach((key => {
                if ("undefined" === typeof target[key]) target[key] = src[key]; else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
            }));
        }
        const ssrDocument = {
            body: {},
            addEventListener() {},
            removeEventListener() {},
            activeElement: {
                blur() {},
                nodeName: ""
            },
            querySelector() {
                return null;
            },
            querySelectorAll() {
                return [];
            },
            getElementById() {
                return null;
            },
            createEvent() {
                return {
                    initEvent() {}
                };
            },
            createElement() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute() {},
                    getElementsByTagName() {
                        return [];
                    }
                };
            },
            createElementNS() {
                return {};
            },
            importNode() {
                return null;
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            }
        };
        function ssr_window_esm_getDocument() {
            const doc = "undefined" !== typeof document ? document : {};
            extend(doc, ssrDocument);
            return doc;
        }
        const ssrWindow = {
            document: ssrDocument,
            navigator: {
                userAgent: ""
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            },
            history: {
                replaceState() {},
                pushState() {},
                go() {},
                back() {}
            },
            CustomEvent: function CustomEvent() {
                return this;
            },
            addEventListener() {},
            removeEventListener() {},
            getComputedStyle() {
                return {
                    getPropertyValue() {
                        return "";
                    }
                };
            },
            Image() {},
            Date() {},
            screen: {},
            setTimeout() {},
            clearTimeout() {},
            matchMedia() {
                return {};
            },
            requestAnimationFrame(callback) {
                if ("undefined" === typeof setTimeout) {
                    callback();
                    return null;
                }
                return setTimeout(callback, 0);
            },
            cancelAnimationFrame(id) {
                if ("undefined" === typeof setTimeout) return;
                clearTimeout(id);
            }
        };
        function ssr_window_esm_getWindow() {
            const win = "undefined" !== typeof window ? window : {};
            extend(win, ssrWindow);
            return win;
        }
        function makeReactive(obj) {
            const proto = obj.__proto__;
            Object.defineProperty(obj, "__proto__", {
                get() {
                    return proto;
                },
                set(value) {
                    proto.__proto__ = value;
                }
            });
        }
        class Dom7 extends Array {
            constructor(items) {
                if ("number" === typeof items) super(items); else {
                    super(...items || []);
                    makeReactive(this);
                }
            }
        }
        function arrayFlat(arr = []) {
            const res = [];
            arr.forEach((el => {
                if (Array.isArray(el)) res.push(...arrayFlat(el)); else res.push(el);
            }));
            return res;
        }
        function arrayFilter(arr, callback) {
            return Array.prototype.filter.call(arr, callback);
        }
        function arrayUnique(arr) {
            const uniqueArray = [];
            for (let i = 0; i < arr.length; i += 1) if (-1 === uniqueArray.indexOf(arr[i])) uniqueArray.push(arr[i]);
            return uniqueArray;
        }
        function qsa(selector, context) {
            if ("string" !== typeof selector) return [ selector ];
            const a = [];
            const res = context.querySelectorAll(selector);
            for (let i = 0; i < res.length; i += 1) a.push(res[i]);
            return a;
        }
        function dom7_esm_$(selector, context) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            let arr = [];
            if (!context && selector instanceof Dom7) return selector;
            if (!selector) return new Dom7(arr);
            if ("string" === typeof selector) {
                const html = selector.trim();
                if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
                    let toCreate = "div";
                    if (0 === html.indexOf("<li")) toCreate = "ul";
                    if (0 === html.indexOf("<tr")) toCreate = "tbody";
                    if (0 === html.indexOf("<td") || 0 === html.indexOf("<th")) toCreate = "tr";
                    if (0 === html.indexOf("<tbody")) toCreate = "table";
                    if (0 === html.indexOf("<option")) toCreate = "select";
                    const tempParent = document.createElement(toCreate);
                    tempParent.innerHTML = html;
                    for (let i = 0; i < tempParent.childNodes.length; i += 1) arr.push(tempParent.childNodes[i]);
                } else arr = qsa(selector.trim(), context || document);
            } else if (selector.nodeType || selector === window || selector === document) arr.push(selector); else if (Array.isArray(selector)) {
                if (selector instanceof Dom7) return selector;
                arr = selector;
            }
            return new Dom7(arrayUnique(arr));
        }
        dom7_esm_$.fn = Dom7.prototype;
        function addClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                el.classList.add(...classNames);
            }));
            return this;
        }
        function removeClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                el.classList.remove(...classNames);
            }));
            return this;
        }
        function toggleClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                classNames.forEach((className => {
                    el.classList.toggle(className);
                }));
            }));
        }
        function hasClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            return arrayFilter(this, (el => classNames.filter((className => el.classList.contains(className))).length > 0)).length > 0;
        }
        function attr(attrs, value) {
            if (1 === arguments.length && "string" === typeof attrs) {
                if (this[0]) return this[0].getAttribute(attrs);
                return;
            }
            for (let i = 0; i < this.length; i += 1) if (2 === arguments.length) this[i].setAttribute(attrs, value); else for (const attrName in attrs) {
                this[i][attrName] = attrs[attrName];
                this[i].setAttribute(attrName, attrs[attrName]);
            }
            return this;
        }
        function removeAttr(attr) {
            for (let i = 0; i < this.length; i += 1) this[i].removeAttribute(attr);
            return this;
        }
        function transform(transform) {
            for (let i = 0; i < this.length; i += 1) this[i].style.transform = transform;
            return this;
        }
        function transition(duration) {
            for (let i = 0; i < this.length; i += 1) this[i].style.transitionDuration = "string" !== typeof duration ? `${duration}ms` : duration;
            return this;
        }
        function on(...args) {
            let [eventType, targetSelector, listener, capture] = args;
            if ("function" === typeof args[1]) {
                [eventType, listener, capture] = args;
                targetSelector = void 0;
            }
            if (!capture) capture = false;
            function handleLiveEvent(e) {
                const target = e.target;
                if (!target) return;
                const eventData = e.target.dom7EventData || [];
                if (eventData.indexOf(e) < 0) eventData.unshift(e);
                if (dom7_esm_$(target).is(targetSelector)) listener.apply(target, eventData); else {
                    const parents = dom7_esm_$(target).parents();
                    for (let k = 0; k < parents.length; k += 1) if (dom7_esm_$(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
                }
            }
            function handleEvent(e) {
                const eventData = e && e.target ? e.target.dom7EventData || [] : [];
                if (eventData.indexOf(e) < 0) eventData.unshift(e);
                listener.apply(this, eventData);
            }
            const events = eventType.split(" ");
            let j;
            for (let i = 0; i < this.length; i += 1) {
                const el = this[i];
                if (!targetSelector) for (j = 0; j < events.length; j += 1) {
                    const event = events[j];
                    if (!el.dom7Listeners) el.dom7Listeners = {};
                    if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
                    el.dom7Listeners[event].push({
                        listener,
                        proxyListener: handleEvent
                    });
                    el.addEventListener(event, handleEvent, capture);
                } else for (j = 0; j < events.length; j += 1) {
                    const event = events[j];
                    if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
                    if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
                    el.dom7LiveListeners[event].push({
                        listener,
                        proxyListener: handleLiveEvent
                    });
                    el.addEventListener(event, handleLiveEvent, capture);
                }
            }
            return this;
        }
        function off(...args) {
            let [eventType, targetSelector, listener, capture] = args;
            if ("function" === typeof args[1]) {
                [eventType, listener, capture] = args;
                targetSelector = void 0;
            }
            if (!capture) capture = false;
            const events = eventType.split(" ");
            for (let i = 0; i < events.length; i += 1) {
                const event = events[i];
                for (let j = 0; j < this.length; j += 1) {
                    const el = this[j];
                    let handlers;
                    if (!targetSelector && el.dom7Listeners) handlers = el.dom7Listeners[event]; else if (targetSelector && el.dom7LiveListeners) handlers = el.dom7LiveListeners[event];
                    if (handlers && handlers.length) for (let k = handlers.length - 1; k >= 0; k -= 1) {
                        const handler = handlers[k];
                        if (listener && handler.listener === listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        } else if (!listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        }
                    }
                }
            }
            return this;
        }
        function trigger(...args) {
            const window = ssr_window_esm_getWindow();
            const events = args[0].split(" ");
            const eventData = args[1];
            for (let i = 0; i < events.length; i += 1) {
                const event = events[i];
                for (let j = 0; j < this.length; j += 1) {
                    const el = this[j];
                    if (window.CustomEvent) {
                        const evt = new window.CustomEvent(event, {
                            detail: eventData,
                            bubbles: true,
                            cancelable: true
                        });
                        el.dom7EventData = args.filter(((data, dataIndex) => dataIndex > 0));
                        el.dispatchEvent(evt);
                        el.dom7EventData = [];
                        delete el.dom7EventData;
                    }
                }
            }
            return this;
        }
        function transitionEnd(callback) {
            const dom = this;
            function fireCallBack(e) {
                if (e.target !== this) return;
                callback.call(this, e);
                dom.off("transitionend", fireCallBack);
            }
            if (callback) dom.on("transitionend", fireCallBack);
            return this;
        }
        function dom7_esm_outerWidth(includeMargins) {
            if (this.length > 0) {
                if (includeMargins) {
                    const styles = this.styles();
                    return this[0].offsetWidth + parseFloat(styles.getPropertyValue("margin-right")) + parseFloat(styles.getPropertyValue("margin-left"));
                }
                return this[0].offsetWidth;
            }
            return null;
        }
        function dom7_esm_outerHeight(includeMargins) {
            if (this.length > 0) {
                if (includeMargins) {
                    const styles = this.styles();
                    return this[0].offsetHeight + parseFloat(styles.getPropertyValue("margin-top")) + parseFloat(styles.getPropertyValue("margin-bottom"));
                }
                return this[0].offsetHeight;
            }
            return null;
        }
        function dom7_esm_offset() {
            if (this.length > 0) {
                const window = ssr_window_esm_getWindow();
                const document = ssr_window_esm_getDocument();
                const el = this[0];
                const box = el.getBoundingClientRect();
                const body = document.body;
                const clientTop = el.clientTop || body.clientTop || 0;
                const clientLeft = el.clientLeft || body.clientLeft || 0;
                const scrollTop = el === window ? window.scrollY : el.scrollTop;
                const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
                return {
                    top: box.top + scrollTop - clientTop,
                    left: box.left + scrollLeft - clientLeft
                };
            }
            return null;
        }
        function styles() {
            const window = ssr_window_esm_getWindow();
            if (this[0]) return window.getComputedStyle(this[0], null);
            return {};
        }
        function css(props, value) {
            const window = ssr_window_esm_getWindow();
            let i;
            if (1 === arguments.length) if ("string" === typeof props) {
                if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
            } else {
                for (i = 0; i < this.length; i += 1) for (const prop in props) this[i].style[prop] = props[prop];
                return this;
            }
            if (2 === arguments.length && "string" === typeof props) {
                for (i = 0; i < this.length; i += 1) this[i].style[props] = value;
                return this;
            }
            return this;
        }
        function each(callback) {
            if (!callback) return this;
            this.forEach(((el, index) => {
                callback.apply(el, [ el, index ]);
            }));
            return this;
        }
        function filter(callback) {
            const result = arrayFilter(this, callback);
            return dom7_esm_$(result);
        }
        function html(html) {
            if ("undefined" === typeof html) return this[0] ? this[0].innerHTML : null;
            for (let i = 0; i < this.length; i += 1) this[i].innerHTML = html;
            return this;
        }
        function dom7_esm_text(text) {
            if ("undefined" === typeof text) return this[0] ? this[0].textContent.trim() : null;
            for (let i = 0; i < this.length; i += 1) this[i].textContent = text;
            return this;
        }
        function is(selector) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            const el = this[0];
            let compareWith;
            let i;
            if (!el || "undefined" === typeof selector) return false;
            if ("string" === typeof selector) {
                if (el.matches) return el.matches(selector);
                if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                compareWith = dom7_esm_$(selector);
                for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
                return false;
            }
            if (selector === document) return el === document;
            if (selector === window) return el === window;
            if (selector.nodeType || selector instanceof Dom7) {
                compareWith = selector.nodeType ? [ selector ] : selector;
                for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
                return false;
            }
            return false;
        }
        function index() {
            let child = this[0];
            let i;
            if (child) {
                i = 0;
                while (null !== (child = child.previousSibling)) if (1 === child.nodeType) i += 1;
                return i;
            }
            return;
        }
        function eq(index) {
            if ("undefined" === typeof index) return this;
            const length = this.length;
            if (index > length - 1) return dom7_esm_$([]);
            if (index < 0) {
                const returnIndex = length + index;
                if (returnIndex < 0) return dom7_esm_$([]);
                return dom7_esm_$([ this[returnIndex] ]);
            }
            return dom7_esm_$([ this[index] ]);
        }
        function append(...els) {
            let newChild;
            const document = ssr_window_esm_getDocument();
            for (let k = 0; k < els.length; k += 1) {
                newChild = els[k];
                for (let i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = newChild;
                    while (tempDiv.firstChild) this[i].appendChild(tempDiv.firstChild);
                } else if (newChild instanceof Dom7) for (let j = 0; j < newChild.length; j += 1) this[i].appendChild(newChild[j]); else this[i].appendChild(newChild);
            }
            return this;
        }
        function prepend(newChild) {
            const document = ssr_window_esm_getDocument();
            let i;
            let j;
            for (i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = newChild;
                for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
            } else if (newChild instanceof Dom7) for (j = 0; j < newChild.length; j += 1) this[i].insertBefore(newChild[j], this[i].childNodes[0]); else this[i].insertBefore(newChild, this[i].childNodes[0]);
            return this;
        }
        function next(selector) {
            if (this.length > 0) {
                if (selector) {
                    if (this[0].nextElementSibling && dom7_esm_$(this[0].nextElementSibling).is(selector)) return dom7_esm_$([ this[0].nextElementSibling ]);
                    return dom7_esm_$([]);
                }
                if (this[0].nextElementSibling) return dom7_esm_$([ this[0].nextElementSibling ]);
                return dom7_esm_$([]);
            }
            return dom7_esm_$([]);
        }
        function nextAll(selector) {
            const nextEls = [];
            let el = this[0];
            if (!el) return dom7_esm_$([]);
            while (el.nextElementSibling) {
                const next = el.nextElementSibling;
                if (selector) {
                    if (dom7_esm_$(next).is(selector)) nextEls.push(next);
                } else nextEls.push(next);
                el = next;
            }
            return dom7_esm_$(nextEls);
        }
        function prev(selector) {
            if (this.length > 0) {
                const el = this[0];
                if (selector) {
                    if (el.previousElementSibling && dom7_esm_$(el.previousElementSibling).is(selector)) return dom7_esm_$([ el.previousElementSibling ]);
                    return dom7_esm_$([]);
                }
                if (el.previousElementSibling) return dom7_esm_$([ el.previousElementSibling ]);
                return dom7_esm_$([]);
            }
            return dom7_esm_$([]);
        }
        function prevAll(selector) {
            const prevEls = [];
            let el = this[0];
            if (!el) return dom7_esm_$([]);
            while (el.previousElementSibling) {
                const prev = el.previousElementSibling;
                if (selector) {
                    if (dom7_esm_$(prev).is(selector)) prevEls.push(prev);
                } else prevEls.push(prev);
                el = prev;
            }
            return dom7_esm_$(prevEls);
        }
        function dom7_esm_parent(selector) {
            const parents = [];
            for (let i = 0; i < this.length; i += 1) if (null !== this[i].parentNode) if (selector) {
                if (dom7_esm_$(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
            } else parents.push(this[i].parentNode);
            return dom7_esm_$(parents);
        }
        function parents(selector) {
            const parents = [];
            for (let i = 0; i < this.length; i += 1) {
                let parent = this[i].parentNode;
                while (parent) {
                    if (selector) {
                        if (dom7_esm_$(parent).is(selector)) parents.push(parent);
                    } else parents.push(parent);
                    parent = parent.parentNode;
                }
            }
            return dom7_esm_$(parents);
        }
        function closest(selector) {
            let closest = this;
            if ("undefined" === typeof selector) return dom7_esm_$([]);
            if (!closest.is(selector)) closest = closest.parents(selector).eq(0);
            return closest;
        }
        function find(selector) {
            const foundElements = [];
            for (let i = 0; i < this.length; i += 1) {
                const found = this[i].querySelectorAll(selector);
                for (let j = 0; j < found.length; j += 1) foundElements.push(found[j]);
            }
            return dom7_esm_$(foundElements);
        }
        function children(selector) {
            const children = [];
            for (let i = 0; i < this.length; i += 1) {
                const childNodes = this[i].children;
                for (let j = 0; j < childNodes.length; j += 1) if (!selector || dom7_esm_$(childNodes[j]).is(selector)) children.push(childNodes[j]);
            }
            return dom7_esm_$(children);
        }
        function remove() {
            for (let i = 0; i < this.length; i += 1) if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
            return this;
        }
        const noTrigger = "resize scroll".split(" ");
        function shortcut(name) {
            function eventHandler(...args) {
                if ("undefined" === typeof args[0]) {
                    for (let i = 0; i < this.length; i += 1) if (noTrigger.indexOf(name) < 0) if (name in this[i]) this[i][name](); else dom7_esm_$(this[i]).trigger(name);
                    return this;
                }
                return this.on(name, ...args);
            }
            return eventHandler;
        }
        shortcut("click");
        shortcut("blur");
        shortcut("focus");
        shortcut("focusin");
        shortcut("focusout");
        shortcut("keyup");
        shortcut("keydown");
        shortcut("keypress");
        shortcut("submit");
        shortcut("change");
        shortcut("mousedown");
        shortcut("mousemove");
        shortcut("mouseup");
        shortcut("mouseenter");
        shortcut("mouseleave");
        shortcut("mouseout");
        shortcut("mouseover");
        shortcut("touchstart");
        shortcut("touchend");
        shortcut("touchmove");
        shortcut("resize");
        shortcut("scroll");
        const Methods = {
            addClass,
            removeClass,
            hasClass,
            toggleClass,
            attr,
            removeAttr,
            transform,
            transition,
            on,
            off,
            trigger,
            transitionEnd,
            outerWidth: dom7_esm_outerWidth,
            outerHeight: dom7_esm_outerHeight,
            styles,
            offset: dom7_esm_offset,
            css,
            each,
            html,
            text: dom7_esm_text,
            is,
            index,
            eq,
            append,
            prepend,
            next,
            nextAll,
            prev,
            prevAll,
            parent: dom7_esm_parent,
            parents,
            closest,
            find,
            children,
            filter,
            remove
        };
        Object.keys(Methods).forEach((methodName => {
            Object.defineProperty(dom7_esm_$.fn, methodName, {
                value: Methods[methodName],
                writable: true
            });
        }));
        const dom = dom7_esm_$;
        function deleteProps(obj) {
            const object = obj;
            Object.keys(object).forEach((key => {
                try {
                    object[key] = null;
                } catch (e) {}
                try {
                    delete object[key];
                } catch (e) {}
            }));
        }
        function utils_nextTick(callback, delay) {
            if (void 0 === delay) delay = 0;
            return setTimeout(callback, delay);
        }
        function utils_now() {
            return Date.now();
        }
        function utils_getComputedStyle(el) {
            const window = ssr_window_esm_getWindow();
            let style;
            if (window.getComputedStyle) style = window.getComputedStyle(el, null);
            if (!style && el.currentStyle) style = el.currentStyle;
            if (!style) style = el.style;
            return style;
        }
        function utils_getTranslate(el, axis) {
            if (void 0 === axis) axis = "x";
            const window = ssr_window_esm_getWindow();
            let matrix;
            let curTransform;
            let transformMatrix;
            const curStyle = utils_getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
                transformMatrix = new window.WebKitCSSMatrix("none" === curTransform ? "" : curTransform);
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
                matrix = transformMatrix.toString().split(",");
            }
            if ("x" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (16 === matrix.length) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
            if ("y" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (16 === matrix.length) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
            return curTransform || 0;
        }
        function utils_isObject(o) {
            return "object" === typeof o && null !== o && o.constructor && "Object" === Object.prototype.toString.call(o).slice(8, -1);
        }
        function isNode(node) {
            if ("undefined" !== typeof window && "undefined" !== typeof window.HTMLElement) return node instanceof HTMLElement;
            return node && (1 === node.nodeType || 11 === node.nodeType);
        }
        function utils_extend() {
            const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
            const noExtend = [ "__proto__", "constructor", "prototype" ];
            for (let i = 1; i < arguments.length; i += 1) {
                const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
                if (void 0 !== nextSource && null !== nextSource && !isNode(nextSource)) {
                    const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                    for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                        const nextKey = keysArray[nextIndex];
                        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (void 0 !== desc && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                            to[nextKey] = {};
                            if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                        } else to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
        function utils_setCSSProperty(el, varName, varValue) {
            el.style.setProperty(varName, varValue);
        }
        function animateCSSModeScroll(_ref) {
            let {swiper, targetPosition, side} = _ref;
            const window = ssr_window_esm_getWindow();
            const startPosition = -swiper.translate;
            let startTime = null;
            let time;
            const duration = swiper.params.speed;
            swiper.wrapperEl.style.scrollSnapType = "none";
            window.cancelAnimationFrame(swiper.cssModeFrameID);
            const dir = targetPosition > startPosition ? "next" : "prev";
            const isOutOfBound = (current, target) => "next" === dir && current >= target || "prev" === dir && current <= target;
            const animate = () => {
                time = (new Date).getTime();
                if (null === startTime) startTime = time;
                const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
                const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
                let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
                if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
                swiper.wrapperEl.scrollTo({
                    [side]: currentPosition
                });
                if (isOutOfBound(currentPosition, targetPosition)) {
                    swiper.wrapperEl.style.overflow = "hidden";
                    swiper.wrapperEl.style.scrollSnapType = "";
                    setTimeout((() => {
                        swiper.wrapperEl.style.overflow = "";
                        swiper.wrapperEl.scrollTo({
                            [side]: currentPosition
                        });
                    }));
                    window.cancelAnimationFrame(swiper.cssModeFrameID);
                    return;
                }
                swiper.cssModeFrameID = window.requestAnimationFrame(animate);
            };
            animate();
        }
        let support;
        function calcSupport() {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            return {
                smoothScroll: document.documentElement && "scrollBehavior" in document.documentElement.style,
                touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
                passiveListener: function checkPassiveListener() {
                    let supportsPassive = false;
                    try {
                        const opts = Object.defineProperty({}, "passive", {
                            get() {
                                supportsPassive = true;
                            }
                        });
                        window.addEventListener("testPassiveListener", null, opts);
                    } catch (e) {}
                    return supportsPassive;
                }(),
                gestures: function checkGestures() {
                    return "ongesturestart" in window;
                }()
            };
        }
        function getSupport() {
            if (!support) support = calcSupport();
            return support;
        }
        let deviceCached;
        function calcDevice(_temp) {
            let {userAgent} = void 0 === _temp ? {} : _temp;
            const support = getSupport();
            const window = ssr_window_esm_getWindow();
            const platform = window.navigator.platform;
            const ua = userAgent || window.navigator.userAgent;
            const device = {
                ios: false,
                android: false
            };
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            const windows = "Win32" === platform;
            let macos = "MacIntel" === platform;
            const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
            if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
                ipad = ua.match(/(Version)\/([\d.]+)/);
                if (!ipad) ipad = [ 0, 1, "13_0_0" ];
                macos = false;
            }
            if (android && !windows) {
                device.os = "android";
                device.android = true;
            }
            if (ipad || iphone || ipod) {
                device.os = "ios";
                device.ios = true;
            }
            return device;
        }
        function getDevice(overrides) {
            if (void 0 === overrides) overrides = {};
            if (!deviceCached) deviceCached = calcDevice(overrides);
            return deviceCached;
        }
        let browser;
        function calcBrowser() {
            const window = ssr_window_esm_getWindow();
            function isSafari() {
                const ua = window.navigator.userAgent.toLowerCase();
                return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
            }
            return {
                isSafari: isSafari(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
            };
        }
        function getBrowser() {
            if (!browser) browser = calcBrowser();
            return browser;
        }
        function Resize(_ref) {
            let {swiper, on, emit} = _ref;
            const window = ssr_window_esm_getWindow();
            let observer = null;
            let animationFrame = null;
            const resizeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("beforeResize");
                emit("resize");
            };
            const createObserver = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                observer = new ResizeObserver((entries => {
                    animationFrame = window.requestAnimationFrame((() => {
                        const {width, height} = swiper;
                        let newWidth = width;
                        let newHeight = height;
                        entries.forEach((_ref2 => {
                            let {contentBoxSize, contentRect, target} = _ref2;
                            if (target && target !== swiper.el) return;
                            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                        }));
                        if (newWidth !== width || newHeight !== height) resizeHandler();
                    }));
                }));
                observer.observe(swiper.el);
            };
            const removeObserver = () => {
                if (animationFrame) window.cancelAnimationFrame(animationFrame);
                if (observer && observer.unobserve && swiper.el) {
                    observer.unobserve(swiper.el);
                    observer = null;
                }
            };
            const orientationChangeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("orientationchange");
            };
            on("init", (() => {
                if (swiper.params.resizeObserver && "undefined" !== typeof window.ResizeObserver) {
                    createObserver();
                    return;
                }
                window.addEventListener("resize", resizeHandler);
                window.addEventListener("orientationchange", orientationChangeHandler);
            }));
            on("destroy", (() => {
                removeObserver();
                window.removeEventListener("resize", resizeHandler);
                window.removeEventListener("orientationchange", orientationChangeHandler);
            }));
        }
        function Observer(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            const observers = [];
            const window = ssr_window_esm_getWindow();
            const attach = function(target, options) {
                if (void 0 === options) options = {};
                const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
                const observer = new ObserverFunc((mutations => {
                    if (1 === mutations.length) {
                        emit("observerUpdate", mutations[0]);
                        return;
                    }
                    const observerUpdate = function observerUpdate() {
                        emit("observerUpdate", mutations[0]);
                    };
                    if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
                }));
                observer.observe(target, {
                    attributes: "undefined" === typeof options.attributes ? true : options.attributes,
                    childList: "undefined" === typeof options.childList ? true : options.childList,
                    characterData: "undefined" === typeof options.characterData ? true : options.characterData
                });
                observers.push(observer);
            };
            const init = () => {
                if (!swiper.params.observer) return;
                if (swiper.params.observeParents) {
                    const containerParents = swiper.$el.parents();
                    for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
                }
                attach(swiper.$el[0], {
                    childList: swiper.params.observeSlideChildren
                });
                attach(swiper.$wrapperEl[0], {
                    attributes: false
                });
            };
            const destroy = () => {
                observers.forEach((observer => {
                    observer.disconnect();
                }));
                observers.splice(0, observers.length);
            };
            extendParams({
                observer: false,
                observeParents: false,
                observeSlideChildren: false
            });
            on("init", init);
            on("destroy", destroy);
        }
        const events_emitter = {
            on(events, handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if ("function" !== typeof handler) return self;
                const method = priority ? "unshift" : "push";
                events.split(" ").forEach((event => {
                    if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                    self.eventsListeners[event][method](handler);
                }));
                return self;
            },
            once(events, handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if ("function" !== typeof handler) return self;
                function onceHandler() {
                    self.off(events, onceHandler);
                    if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    handler.apply(self, args);
                }
                onceHandler.__emitterProxy = handler;
                return self.on(events, onceHandler, priority);
            },
            onAny(handler, priority) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if ("function" !== typeof handler) return self;
                const method = priority ? "unshift" : "push";
                if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
                return self;
            },
            offAny(handler) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsAnyListeners) return self;
                const index = self.eventsAnyListeners.indexOf(handler);
                if (index >= 0) self.eventsAnyListeners.splice(index, 1);
                return self;
            },
            off(events, handler) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsListeners) return self;
                events.split(" ").forEach((event => {
                    if ("undefined" === typeof handler) self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                        if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                    }));
                }));
                return self;
            },
            emit() {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsListeners) return self;
                let events;
                let data;
                let context;
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                if ("string" === typeof args[0] || Array.isArray(args[0])) {
                    events = args[0];
                    data = args.slice(1, args.length);
                    context = self;
                } else {
                    events = args[0].events;
                    data = args[0].data;
                    context = args[0].context || self;
                }
                data.unshift(context);
                const eventsArray = Array.isArray(events) ? events : events.split(" ");
                eventsArray.forEach((event => {
                    if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                        eventHandler.apply(context, [ event, ...data ]);
                    }));
                    if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                        eventHandler.apply(context, data);
                    }));
                }));
                return self;
            }
        };
        function updateSize() {
            const swiper = this;
            let width;
            let height;
            const $el = swiper.$el;
            if ("undefined" !== typeof swiper.params.width && null !== swiper.params.width) width = swiper.params.width; else width = $el[0].clientWidth;
            if ("undefined" !== typeof swiper.params.height && null !== swiper.params.height) height = swiper.params.height; else height = $el[0].clientHeight;
            if (0 === width && swiper.isHorizontal() || 0 === height && swiper.isVertical()) return;
            width = width - parseInt($el.css("padding-left") || 0, 10) - parseInt($el.css("padding-right") || 0, 10);
            height = height - parseInt($el.css("padding-top") || 0, 10) - parseInt($el.css("padding-bottom") || 0, 10);
            if (Number.isNaN(width)) width = 0;
            if (Number.isNaN(height)) height = 0;
            Object.assign(swiper, {
                width,
                height,
                size: swiper.isHorizontal() ? width : height
            });
        }
        function updateSlides() {
            const swiper = this;
            function getDirectionLabel(property) {
                if (swiper.isHorizontal()) return property;
                return {
                    width: "height",
                    "margin-top": "margin-left",
                    "margin-bottom ": "margin-right",
                    "margin-left": "margin-top",
                    "margin-right": "margin-bottom",
                    "padding-left": "padding-top",
                    "padding-right": "padding-bottom",
                    marginRight: "marginBottom"
                }[property];
            }
            function getDirectionPropertyValue(node, label) {
                return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
            }
            const params = swiper.params;
            const {$wrapperEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
            const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
            const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
            let snapGrid = [];
            const slidesGrid = [];
            const slidesSizesGrid = [];
            let offsetBefore = params.slidesOffsetBefore;
            if ("function" === typeof offsetBefore) offsetBefore = params.slidesOffsetBefore.call(swiper);
            let offsetAfter = params.slidesOffsetAfter;
            if ("function" === typeof offsetAfter) offsetAfter = params.slidesOffsetAfter.call(swiper);
            const previousSnapGridLength = swiper.snapGrid.length;
            const previousSlidesGridLength = swiper.slidesGrid.length;
            let spaceBetween = params.spaceBetween;
            let slidePosition = -offsetBefore;
            let prevSlideSize = 0;
            let index = 0;
            if ("undefined" === typeof swiperSize) return;
            if ("string" === typeof spaceBetween && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
            swiper.virtualSize = -spaceBetween;
            if (rtl) slides.css({
                marginLeft: "",
                marginBottom: "",
                marginTop: ""
            }); else slides.css({
                marginRight: "",
                marginBottom: "",
                marginTop: ""
            });
            if (params.centeredSlides && params.cssMode) {
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", "");
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", "");
            }
            const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
            if (gridEnabled) swiper.grid.initSlides(slidesLength);
            let slideSize;
            const shouldResetSlideSize = "auto" === params.slidesPerView && params.breakpoints && Object.keys(params.breakpoints).filter((key => "undefined" !== typeof params.breakpoints[key].slidesPerView)).length > 0;
            for (let i = 0; i < slidesLength; i += 1) {
                slideSize = 0;
                const slide = slides.eq(i);
                if (gridEnabled) swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
                if ("none" === slide.css("display")) continue;
                if ("auto" === params.slidesPerView) {
                    if (shouldResetSlideSize) slides[i].style[getDirectionLabel("width")] = ``;
                    const slideStyles = getComputedStyle(slide[0]);
                    const currentTransform = slide[0].style.transform;
                    const currentWebKitTransform = slide[0].style.webkitTransform;
                    if (currentTransform) slide[0].style.transform = "none";
                    if (currentWebKitTransform) slide[0].style.webkitTransform = "none";
                    if (params.roundLengths) slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true); else {
                        const width = getDirectionPropertyValue(slideStyles, "width");
                        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                        const boxSizing = slideStyles.getPropertyValue("box-sizing");
                        if (boxSizing && "border-box" === boxSizing) slideSize = width + marginLeft + marginRight; else {
                            const {clientWidth, offsetWidth} = slide[0];
                            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                        }
                    }
                    if (currentTransform) slide[0].style.transform = currentTransform;
                    if (currentWebKitTransform) slide[0].style.webkitTransform = currentWebKitTransform;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                } else {
                    slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                    if (slides[i]) slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
                }
                if (slides[i]) slides[i].swiperSlideSize = slideSize;
                slidesSizesGrid.push(slideSize);
                if (params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (0 === prevSlideSize && 0 !== i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (0 === i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                } else {
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
                swiper.virtualSize += slideSize + spaceBetween;
                prevSlideSize = slideSize;
                index += 1;
            }
            swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
            if (rtl && wrongRTL && ("slide" === params.effect || "coverflow" === params.effect)) $wrapperEl.css({
                width: `${swiper.virtualSize + params.spaceBetween}px`
            });
            if (params.setWrapperSize) $wrapperEl.css({
                [getDirectionLabel("width")]: `${swiper.virtualSize + params.spaceBetween}px`
            });
            if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
            if (!params.centeredSlides) {
                const newSlidesGrid = [];
                for (let i = 0; i < snapGrid.length; i += 1) {
                    let slidesGridItem = snapGrid[i];
                    if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                    if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
                }
                snapGrid = newSlidesGrid;
                if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
            }
            if (0 === snapGrid.length) snapGrid = [ 0 ];
            if (0 !== params.spaceBetween) {
                const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
                slides.filter(((_, slideIndex) => {
                    if (!params.cssMode) return true;
                    if (slideIndex === slides.length - 1) return false;
                    return true;
                })).css({
                    [key]: `${spaceBetween}px`
                });
            }
            if (params.centeredSlides && params.centeredSlidesBounds) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
                }));
                allSlidesSize -= params.spaceBetween;
                const maxSnap = allSlidesSize - swiperSize;
                snapGrid = snapGrid.map((snap => {
                    if (snap < 0) return -offsetBefore;
                    if (snap > maxSnap) return maxSnap + offsetAfter;
                    return snap;
                }));
            }
            if (params.centerInsufficientSlides) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
                }));
                allSlidesSize -= params.spaceBetween;
                if (allSlidesSize < swiperSize) {
                    const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
                    snapGrid.forEach(((snap, snapIndex) => {
                        snapGrid[snapIndex] = snap - allSlidesOffset;
                    }));
                    slidesGrid.forEach(((snap, snapIndex) => {
                        slidesGrid[snapIndex] = snap + allSlidesOffset;
                    }));
                }
            }
            Object.assign(swiper, {
                slides,
                snapGrid,
                slidesGrid,
                slidesSizesGrid
            });
            if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
                const addToSnapGrid = -swiper.snapGrid[0];
                const addToSlidesGrid = -swiper.slidesGrid[0];
                swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
                swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
            }
            if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
            if (snapGrid.length !== previousSnapGridLength) {
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                swiper.emit("snapGridLengthChange");
            }
            if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
            if (params.watchSlidesProgress) swiper.updateSlidesOffset();
            if (!isVirtual && !params.cssMode && ("slide" === params.effect || "fade" === params.effect)) {
                const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
                const hasClassBackfaceClassAdded = swiper.$el.hasClass(backFaceHiddenClass);
                if (slidesLength <= params.maxBackfaceHiddenSlides) {
                    if (!hasClassBackfaceClassAdded) swiper.$el.addClass(backFaceHiddenClass);
                } else if (hasClassBackfaceClassAdded) swiper.$el.removeClass(backFaceHiddenClass);
            }
        }
        function updateAutoHeight(speed) {
            const swiper = this;
            const activeSlides = [];
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            let newHeight = 0;
            let i;
            if ("number" === typeof speed) swiper.setTransition(speed); else if (true === speed) swiper.setTransition(swiper.params.speed);
            const getSlideByIndex = index => {
                if (isVirtual) return swiper.slides.filter((el => parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index))[0];
                return swiper.slides.eq(index)[0];
            };
            if ("auto" !== swiper.params.slidesPerView && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || dom([])).each((slide => {
                activeSlides.push(slide);
            })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
                const index = swiper.activeIndex + i;
                if (index > swiper.slides.length && !isVirtual) break;
                activeSlides.push(getSlideByIndex(index));
            } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
            for (i = 0; i < activeSlides.length; i += 1) if ("undefined" !== typeof activeSlides[i]) {
                const height = activeSlides[i].offsetHeight;
                newHeight = height > newHeight ? height : newHeight;
            }
            if (newHeight || 0 === newHeight) swiper.$wrapperEl.css("height", `${newHeight}px`);
        }
        function updateSlidesOffset() {
            const swiper = this;
            const slides = swiper.slides;
            for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
        }
        function updateSlidesProgress(translate) {
            if (void 0 === translate) translate = this && this.translate || 0;
            const swiper = this;
            const params = swiper.params;
            const {slides, rtlTranslate: rtl, snapGrid} = swiper;
            if (0 === slides.length) return;
            if ("undefined" === typeof slides[0].swiperSlideOffset) swiper.updateSlidesOffset();
            let offsetCenter = -translate;
            if (rtl) offsetCenter = translate;
            slides.removeClass(params.slideVisibleClass);
            swiper.visibleSlidesIndexes = [];
            swiper.visibleSlides = [];
            for (let i = 0; i < slides.length; i += 1) {
                const slide = slides[i];
                let slideOffset = slide.swiperSlideOffset;
                if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
                const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
                const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
                const slideBefore = -(offsetCenter - slideOffset);
                const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
                const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
                if (isVisible) {
                    swiper.visibleSlides.push(slide);
                    swiper.visibleSlidesIndexes.push(i);
                    slides.eq(i).addClass(params.slideVisibleClass);
                }
                slide.progress = rtl ? -slideProgress : slideProgress;
                slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
            }
            swiper.visibleSlides = dom(swiper.visibleSlides);
        }
        function updateProgress(translate) {
            const swiper = this;
            if ("undefined" === typeof translate) {
                const multiplier = swiper.rtlTranslate ? -1 : 1;
                translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
            }
            const params = swiper.params;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            let {progress, isBeginning, isEnd} = swiper;
            const wasBeginning = isBeginning;
            const wasEnd = isEnd;
            if (0 === translatesDiff) {
                progress = 0;
                isBeginning = true;
                isEnd = true;
            } else {
                progress = (translate - swiper.minTranslate()) / translatesDiff;
                isBeginning = progress <= 0;
                isEnd = progress >= 1;
            }
            Object.assign(swiper, {
                progress,
                isBeginning,
                isEnd
            });
            if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
            if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
            if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
            if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
            swiper.emit("progress", progress);
        }
        function updateSlidesClasses() {
            const swiper = this;
            const {slides, params, $wrapperEl, activeIndex, realIndex} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
            let activeSlide;
            if (isVirtual) activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`); else activeSlide = slides.eq(activeIndex);
            activeSlide.addClass(params.slideActiveClass);
            if (params.loop) if (activeSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
            let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
            if (params.loop && 0 === nextSlide.length) {
                nextSlide = slides.eq(0);
                nextSlide.addClass(params.slideNextClass);
            }
            let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
            if (params.loop && 0 === prevSlide.length) {
                prevSlide = slides.eq(-1);
                prevSlide.addClass(params.slidePrevClass);
            }
            if (params.loop) {
                if (nextSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
                if (prevSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
            }
            swiper.emitSlidesClasses();
        }
        function updateActiveIndex(newActiveIndex) {
            const swiper = this;
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            const {slidesGrid, snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
            let activeIndex = newActiveIndex;
            let snapIndex;
            if ("undefined" === typeof activeIndex) {
                for (let i = 0; i < slidesGrid.length; i += 1) if ("undefined" !== typeof slidesGrid[i + 1]) {
                    if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
                } else if (translate >= slidesGrid[i]) activeIndex = i;
                if (params.normalizeSlideIndex) if (activeIndex < 0 || "undefined" === typeof activeIndex) activeIndex = 0;
            }
            if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
                const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
                snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
            }
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            if (activeIndex === previousIndex) {
                if (snapIndex !== previousSnapIndex) {
                    swiper.snapIndex = snapIndex;
                    swiper.emit("snapIndexChange");
                }
                return;
            }
            const realIndex = parseInt(swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex, 10);
            Object.assign(swiper, {
                snapIndex,
                realIndex,
                previousIndex,
                activeIndex
            });
            swiper.emit("activeIndexChange");
            swiper.emit("snapIndexChange");
            if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
            if (swiper.initialized || swiper.params.runCallbacksOnInit) swiper.emit("slideChange");
        }
        function updateClickedSlide(e) {
            const swiper = this;
            const params = swiper.params;
            const slide = dom(e).closest(`.${params.slideClass}`)[0];
            let slideFound = false;
            let slideIndex;
            if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
                slideFound = true;
                slideIndex = i;
                break;
            }
            if (slide && slideFound) {
                swiper.clickedSlide = slide;
                if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(dom(slide).attr("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
            } else {
                swiper.clickedSlide = void 0;
                swiper.clickedIndex = void 0;
                return;
            }
            if (params.slideToClickedSlide && void 0 !== swiper.clickedIndex && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
        }
        const update = {
            updateSize,
            updateSlides,
            updateAutoHeight,
            updateSlidesOffset,
            updateSlidesProgress,
            updateProgress,
            updateSlidesClasses,
            updateActiveIndex,
            updateClickedSlide
        };
        function getSwiperTranslate(axis) {
            if (void 0 === axis) axis = this.isHorizontal() ? "x" : "y";
            const swiper = this;
            const {params, rtlTranslate: rtl, translate, $wrapperEl} = swiper;
            if (params.virtualTranslate) return rtl ? -translate : translate;
            if (params.cssMode) return translate;
            let currentTranslate = utils_getTranslate($wrapperEl[0], axis);
            if (rtl) currentTranslate = -currentTranslate;
            return currentTranslate || 0;
        }
        function setTranslate(translate, byController) {
            const swiper = this;
            const {rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress} = swiper;
            let x = 0;
            let y = 0;
            const z = 0;
            if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
            if (params.roundLengths) {
                x = Math.floor(x);
                y = Math.floor(y);
            }
            if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
            swiper.previousTranslate = swiper.translate;
            swiper.translate = swiper.isHorizontal() ? x : y;
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (0 === translatesDiff) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== progress) swiper.updateProgress(translate);
            swiper.emit("setTranslate", swiper.translate, byController);
        }
        function minTranslate() {
            return -this.snapGrid[0];
        }
        function maxTranslate() {
            return -this.snapGrid[this.snapGrid.length - 1];
        }
        function translateTo(translate, speed, runCallbacks, translateBounds, internal) {
            if (void 0 === translate) translate = 0;
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            if (void 0 === translateBounds) translateBounds = true;
            const swiper = this;
            const {params, wrapperEl} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition) return false;
            const minTranslate = swiper.minTranslate();
            const maxTranslate = swiper.maxTranslate();
            let newTranslate;
            if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
            swiper.updateProgress(newTranslate);
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                if (0 === speed) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: -newTranslate,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: -newTranslate,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            if (0 === speed) {
                swiper.setTransition(0);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionEnd");
                }
            } else {
                swiper.setTransition(speed);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionStart");
                }
                if (!swiper.animating) {
                    swiper.animating = true;
                    if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                        if (!swiper || swiper.destroyed) return;
                        if (e.target !== this) return;
                        swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.onTranslateToWrapperTransitionEnd = null;
                        delete swiper.onTranslateToWrapperTransitionEnd;
                        if (runCallbacks) swiper.emit("transitionEnd");
                    };
                    swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                }
            }
            return true;
        }
        const translate = {
            getTranslate: getSwiperTranslate,
            setTranslate,
            minTranslate,
            maxTranslate,
            translateTo
        };
        function setTransition(duration, byController) {
            const swiper = this;
            if (!swiper.params.cssMode) swiper.$wrapperEl.transition(duration);
            swiper.emit("setTransition", duration, byController);
        }
        function transitionEmit(_ref) {
            let {swiper, runCallbacks, direction, step} = _ref;
            const {activeIndex, previousIndex} = swiper;
            let dir = direction;
            if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
            swiper.emit(`transition${step}`);
            if (runCallbacks && activeIndex !== previousIndex) {
                if ("reset" === dir) {
                    swiper.emit(`slideResetTransition${step}`);
                    return;
                }
                swiper.emit(`slideChangeTransition${step}`);
                if ("next" === dir) swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
            }
        }
        function transitionStart(runCallbacks, direction) {
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            const {params} = swiper;
            if (params.cssMode) return;
            if (params.autoHeight) swiper.updateAutoHeight();
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "Start"
            });
        }
        function transitionEnd_transitionEnd(runCallbacks, direction) {
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            const {params} = swiper;
            swiper.animating = false;
            if (params.cssMode) return;
            swiper.setTransition(0);
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "End"
            });
        }
        const core_transition = {
            setTransition,
            transitionStart,
            transitionEnd: transitionEnd_transitionEnd
        };
        function slideTo(index, speed, runCallbacks, internal, initial) {
            if (void 0 === index) index = 0;
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            if ("number" !== typeof index && "string" !== typeof index) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
            if ("string" === typeof index) {
                const indexAsNumber = parseInt(index, 10);
                const isValidNumber = isFinite(indexAsNumber);
                if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
                index = indexAsNumber;
            }
            const swiper = this;
            let slideIndex = index;
            if (slideIndex < 0) slideIndex = 0;
            const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
            let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
            const translate = -snapGrid[snapIndex];
            swiper.updateProgress(translate);
            if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
                const normalizedTranslate = -Math.floor(100 * translate);
                const normalizedGrid = Math.floor(100 * slidesGrid[i]);
                const normalizedGridNext = Math.floor(100 * slidesGrid[i + 1]);
                if ("undefined" !== typeof slidesGrid[i + 1]) {
                    if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
                } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
            }
            if (swiper.initialized && slideIndex !== activeIndex) {
                if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) return false;
                if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
            }
            let direction;
            if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
            if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
                swiper.updateActiveIndex(slideIndex);
                if (params.autoHeight) swiper.updateAutoHeight();
                swiper.updateSlidesClasses();
                if ("slide" !== params.effect) swiper.setTranslate(translate);
                if ("reset" !== direction) {
                    swiper.transitionStart(runCallbacks, direction);
                    swiper.transitionEnd(runCallbacks, direction);
                }
                return false;
            }
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                const t = rtl ? translate : -translate;
                if (0 === speed) {
                    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                    if (isVirtual) {
                        swiper.wrapperEl.style.scrollSnapType = "none";
                        swiper._immediateVirtual = true;
                    }
                    wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    if (isVirtual) requestAnimationFrame((() => {
                        swiper.wrapperEl.style.scrollSnapType = "";
                        swiper._swiperImmediateVirtual = false;
                    }));
                } else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: t,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: t,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            swiper.setTransition(speed);
            swiper.setTranslate(translate);
            swiper.updateActiveIndex(slideIndex);
            swiper.updateSlidesClasses();
            swiper.emit("beforeTransitionStart", speed, internal);
            swiper.transitionStart(runCallbacks, direction);
            if (0 === speed) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
                    swiper.onSlideToWrapperTransitionEnd = null;
                    delete swiper.onSlideToWrapperTransitionEnd;
                    swiper.transitionEnd(runCallbacks, direction);
                };
                swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
            }
            return true;
        }
        function slideToLoop(index, speed, runCallbacks, internal) {
            if (void 0 === index) index = 0;
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            if ("string" === typeof index) {
                const indexAsNumber = parseInt(index, 10);
                const isValidNumber = isFinite(indexAsNumber);
                if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
                index = indexAsNumber;
            }
            const swiper = this;
            let newIndex = index;
            if (swiper.params.loop) newIndex += swiper.loopedSlides;
            return swiper.slideTo(newIndex, speed, runCallbacks, internal);
        }
        function slideNext(speed, runCallbacks, internal) {
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            const {animating, enabled, params} = swiper;
            if (!enabled) return swiper;
            let perGroup = params.slidesPerGroup;
            if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
            const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
            if (params.loop) {
                if (animating && params.loopPreventsSlide) return false;
                swiper.loopFix();
                swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            }
            if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
            return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
        }
        function slidePrev(speed, runCallbacks, internal) {
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            const {params, animating, snapGrid, slidesGrid, rtlTranslate, enabled} = swiper;
            if (!enabled) return swiper;
            if (params.loop) {
                if (animating && params.loopPreventsSlide) return false;
                swiper.loopFix();
                swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            }
            const translate = rtlTranslate ? swiper.translate : -swiper.translate;
            function normalize(val) {
                if (val < 0) return -Math.floor(Math.abs(val));
                return Math.floor(val);
            }
            const normalizedTranslate = normalize(translate);
            const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
            let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
            if ("undefined" === typeof prevSnap && params.cssMode) {
                let prevSnapIndex;
                snapGrid.forEach(((snap, snapIndex) => {
                    if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
                }));
                if ("undefined" !== typeof prevSnapIndex) prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
            }
            let prevIndex = 0;
            if ("undefined" !== typeof prevSnap) {
                prevIndex = slidesGrid.indexOf(prevSnap);
                if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
                if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) {
                    prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                    prevIndex = Math.max(prevIndex, 0);
                }
            }
            if (params.rewind && swiper.isBeginning) {
                const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
                return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
            }
            return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
        }
        function slideReset(speed, runCallbacks, internal) {
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            const swiper = this;
            return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
        }
        function slideToClosest(speed, runCallbacks, internal, threshold) {
            if (void 0 === speed) speed = this.params.speed;
            if (void 0 === runCallbacks) runCallbacks = true;
            if (void 0 === threshold) threshold = .5;
            const swiper = this;
            let index = swiper.activeIndex;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
            const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            if (translate >= swiper.snapGrid[snapIndex]) {
                const currentSnap = swiper.snapGrid[snapIndex];
                const nextSnap = swiper.snapGrid[snapIndex + 1];
                if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
            } else {
                const prevSnap = swiper.snapGrid[snapIndex - 1];
                const currentSnap = swiper.snapGrid[snapIndex];
                if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
            }
            index = Math.max(index, 0);
            index = Math.min(index, swiper.slidesGrid.length - 1);
            return swiper.slideTo(index, speed, runCallbacks, internal);
        }
        function slideToClickedSlide() {
            const swiper = this;
            const {params, $wrapperEl} = swiper;
            const slidesPerView = "auto" === params.slidesPerView ? swiper.slidesPerViewDynamic() : params.slidesPerView;
            let slideToIndex = swiper.clickedIndex;
            let realIndex;
            if (params.loop) {
                if (swiper.animating) return;
                realIndex = parseInt(dom(swiper.clickedSlide).attr("data-swiper-slide-index"), 10);
                if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                    swiper.loopFix();
                    slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                    swiper.loopFix();
                    slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex);
            } else swiper.slideTo(slideToIndex);
        }
        const slide = {
            slideTo,
            slideToLoop,
            slideNext,
            slidePrev,
            slideReset,
            slideToClosest,
            slideToClickedSlide
        };
        function loopCreate() {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const {params, $wrapperEl} = swiper;
            const $selector = $wrapperEl.children().length > 0 ? dom($wrapperEl.children()[0].parentNode) : $wrapperEl;
            $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
            let slides = $selector.children(`.${params.slideClass}`);
            if (params.loopFillGroupWithBlank) {
                const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
                if (blankSlidesNum !== params.slidesPerGroup) {
                    for (let i = 0; i < blankSlidesNum; i += 1) {
                        const blankNode = dom(document.createElement("div")).addClass(`${params.slideClass} ${params.slideBlankClass}`);
                        $selector.append(blankNode);
                    }
                    slides = $selector.children(`.${params.slideClass}`);
                }
            }
            if ("auto" === params.slidesPerView && !params.loopedSlides) params.loopedSlides = slides.length;
            swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
            swiper.loopedSlides += params.loopAdditionalSlides;
            if (swiper.loopedSlides > slides.length) swiper.loopedSlides = slides.length;
            const prependSlides = [];
            const appendSlides = [];
            slides.each(((el, index) => {
                const slide = dom(el);
                if (index < swiper.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - swiper.loopedSlides) prependSlides.push(el);
                slide.attr("data-swiper-slide-index", index);
            }));
            for (let i = 0; i < appendSlides.length; i += 1) $selector.append(dom(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
            for (let i = prependSlides.length - 1; i >= 0; i -= 1) $selector.prepend(dom(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
        }
        function loopFix() {
            const swiper = this;
            swiper.emit("beforeLoopFix");
            const {activeIndex, slides, loopedSlides, allowSlidePrev, allowSlideNext, snapGrid, rtlTranslate: rtl} = swiper;
            let newIndex;
            swiper.allowSlidePrev = true;
            swiper.allowSlideNext = true;
            const snapTranslate = -snapGrid[activeIndex];
            const diff = snapTranslate - swiper.getTranslate();
            if (activeIndex < loopedSlides) {
                newIndex = slides.length - 3 * loopedSlides + activeIndex;
                newIndex += loopedSlides;
                const slideChanged = swiper.slideTo(newIndex, 0, false, true);
                if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            } else if (activeIndex >= slides.length - loopedSlides) {
                newIndex = -slides.length + activeIndex + loopedSlides;
                newIndex += loopedSlides;
                const slideChanged = swiper.slideTo(newIndex, 0, false, true);
                if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            }
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            swiper.emit("loopFix");
        }
        function loopDestroy() {
            const swiper = this;
            const {$wrapperEl, params, slides} = swiper;
            $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
            slides.removeAttr("data-swiper-slide-index");
        }
        const loop = {
            loopCreate,
            loopFix,
            loopDestroy
        };
        function setGrabCursor(moving) {
            const swiper = this;
            if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            const el = "container" === swiper.params.touchEventsTarget ? swiper.el : swiper.wrapperEl;
            el.style.cursor = "move";
            el.style.cursor = moving ? "grabbing" : "grab";
        }
        function unsetGrabCursor() {
            const swiper = this;
            if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            swiper["container" === swiper.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "";
        }
        const grab_cursor = {
            setGrabCursor,
            unsetGrabCursor
        };
        function closestElement(selector, base) {
            if (void 0 === base) base = this;
            function __closestFrom(el) {
                if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
                if (el.assignedSlot) el = el.assignedSlot;
                const found = el.closest(selector);
                if (!found && !el.getRootNode) return null;
                return found || __closestFrom(el.getRootNode().host);
            }
            return __closestFrom(base);
        }
        function onTouchStart(event) {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const window = ssr_window_esm_getWindow();
            const data = swiper.touchEventsData;
            const {params, touches, enabled} = swiper;
            if (!enabled) return;
            if (swiper.animating && params.preventInteractionOnTransition) return;
            if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            let $targetEl = dom(e.target);
            if ("wrapper" === params.touchEventsTarget) if (!$targetEl.closest(swiper.wrapperEl).length) return;
            data.isTouchEvent = "touchstart" === e.type;
            if (!data.isTouchEvent && "which" in e && 3 === e.which) return;
            if (!data.isTouchEvent && "button" in e && e.button > 0) return;
            if (data.isTouched && data.isMoved) return;
            const swipingClassHasValue = !!params.noSwipingClass && "" !== params.noSwipingClass;
            if (swipingClassHasValue && e.target && e.target.shadowRoot && event.path && event.path[0]) $targetEl = dom(event.path[0]);
            const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
            const isTargetShadow = !!(e.target && e.target.shadowRoot);
            if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, $targetEl[0]) : $targetEl.closest(noSwipingSelector)[0])) {
                swiper.allowClick = true;
                return;
            }
            if (params.swipeHandler) if (!$targetEl.closest(params.swipeHandler)[0]) return;
            touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX;
            touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
            const startX = touches.currentX;
            const startY = touches.currentY;
            const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
            const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
            if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) if ("prevent" === edgeSwipeDetection) event.preventDefault(); else return;
            Object.assign(data, {
                isTouched: true,
                isMoved: false,
                allowTouchCallbacks: true,
                isScrolling: void 0,
                startMoving: void 0
            });
            touches.startX = startX;
            touches.startY = startY;
            data.touchStartTime = utils_now();
            swiper.allowClick = true;
            swiper.updateSize();
            swiper.swipeDirection = void 0;
            if (params.threshold > 0) data.allowThresholdMove = false;
            if ("touchstart" !== e.type) {
                let preventDefault = true;
                if ($targetEl.is(data.focusableElements)) {
                    preventDefault = false;
                    if ("SELECT" === $targetEl[0].nodeName) data.isTouched = false;
                }
                if (document.activeElement && dom(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) document.activeElement.blur();
                const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
                if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) e.preventDefault();
            }
            if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
            swiper.emit("touchStart", e);
        }
        function onTouchMove(event) {
            const document = ssr_window_esm_getDocument();
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, enabled} = swiper;
            if (!enabled) return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (!data.isTouched) {
                if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
                return;
            }
            if (data.isTouchEvent && "touchmove" !== e.type) return;
            const targetTouch = "touchmove" === e.type && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
            const pageX = "touchmove" === e.type ? targetTouch.pageX : e.pageX;
            const pageY = "touchmove" === e.type ? targetTouch.pageY : e.pageY;
            if (e.preventedByNestedSwiper) {
                touches.startX = pageX;
                touches.startY = pageY;
                return;
            }
            if (!swiper.allowTouchMove) {
                if (!dom(e.target).is(data.focusableElements)) swiper.allowClick = false;
                if (data.isTouched) {
                    Object.assign(touches, {
                        startX: pageX,
                        startY: pageY,
                        currentX: pageX,
                        currentY: pageY
                    });
                    data.touchStartTime = utils_now();
                }
                return;
            }
            if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
                if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                    data.isTouched = false;
                    data.isMoved = false;
                    return;
                }
            } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
            if (data.isTouchEvent && document.activeElement) if (e.target === document.activeElement && dom(e.target).is(data.focusableElements)) {
                data.isMoved = true;
                swiper.allowClick = false;
                return;
            }
            if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
            if (e.targetTouches && e.targetTouches.length > 1) return;
            touches.currentX = pageX;
            touches.currentY = pageY;
            const diffX = touches.currentX - touches.startX;
            const diffY = touches.currentY - touches.startY;
            if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
            if ("undefined" === typeof data.isScrolling) {
                let touchAngle;
                if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                    touchAngle = 180 * Math.atan2(Math.abs(diffY), Math.abs(diffX)) / Math.PI;
                    data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
                }
            }
            if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
            if ("undefined" === typeof data.startMoving) if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
            if (data.isScrolling) {
                data.isTouched = false;
                return;
            }
            if (!data.startMoving) return;
            swiper.allowClick = false;
            if (!params.cssMode && e.cancelable) e.preventDefault();
            if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
            if (!data.isMoved) {
                if (params.loop && !params.cssMode) swiper.loopFix();
                data.startTranslate = swiper.getTranslate();
                swiper.setTransition(0);
                if (swiper.animating) swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
                data.allowMomentumBounce = false;
                if (params.grabCursor && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(true);
                swiper.emit("sliderFirstMove", e);
            }
            swiper.emit("sliderMove", e);
            data.isMoved = true;
            let diff = swiper.isHorizontal() ? diffX : diffY;
            touches.diff = diff;
            diff *= params.touchRatio;
            if (rtl) diff = -diff;
            swiper.swipeDirection = diff > 0 ? "prev" : "next";
            data.currentTranslate = diff + data.startTranslate;
            let disableParentSwiper = true;
            let resistanceRatio = params.resistanceRatio;
            if (params.touchReleaseOnEdges) resistanceRatio = 0;
            if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
            } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
            }
            if (disableParentSwiper) e.preventedByNestedSwiper = true;
            if (!swiper.allowSlideNext && "next" === swiper.swipeDirection && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && "prev" === swiper.swipeDirection && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
            if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
                if (!data.allowThresholdMove) {
                    data.allowThresholdMove = true;
                    touches.startX = touches.currentX;
                    touches.startY = touches.currentY;
                    data.currentTranslate = data.startTranslate;
                    touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                    return;
                }
            } else {
                data.currentTranslate = data.startTranslate;
                return;
            }
            if (!params.followFinger || params.cssMode) return;
            if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
            swiper.updateProgress(data.currentTranslate);
            swiper.setTranslate(data.currentTranslate);
        }
        function onTouchEnd(event) {
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
            if (!enabled) return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
            data.allowTouchCallbacks = false;
            if (!data.isTouched) {
                if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            if (params.grabCursor && data.isMoved && data.isTouched && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(false);
            const touchEndTime = utils_now();
            const timeDiff = touchEndTime - data.touchStartTime;
            if (swiper.allowClick) {
                const pathTree = e.path || e.composedPath && e.composedPath();
                swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
                swiper.emit("tap click", e);
                if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
            }
            data.lastClickTime = utils_now();
            utils_nextTick((() => {
                if (!swiper.destroyed) swiper.allowClick = true;
            }));
            if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || 0 === touches.diff || data.currentTranslate === data.startTranslate) {
                data.isTouched = false;
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            let currentPos;
            if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
            if (params.cssMode) return;
            if (swiper.params.freeMode && params.freeMode.enabled) {
                swiper.freeMode.onTouchEnd({
                    currentPos
                });
                return;
            }
            let stopIndex = 0;
            let groupSize = swiper.slidesSizesGrid[0];
            for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
                const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
                if ("undefined" !== typeof slidesGrid[i + increment]) {
                    if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                        stopIndex = i;
                        groupSize = slidesGrid[i + increment] - slidesGrid[i];
                    }
                } else if (currentPos >= slidesGrid[i]) {
                    stopIndex = i;
                    groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
                }
            }
            let rewindFirstIndex = null;
            let rewindLastIndex = null;
            if (params.rewind) if (swiper.isBeginning) rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
            const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
            const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (timeDiff > params.longSwipesMs) {
                if (!params.longSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                if ("next" === swiper.swipeDirection) if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
                if ("prev" === swiper.swipeDirection) if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (null !== rewindLastIndex && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
            } else {
                if (!params.shortSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
                if (!isNavButtonTarget) {
                    if ("next" === swiper.swipeDirection) swiper.slideTo(null !== rewindFirstIndex ? rewindFirstIndex : stopIndex + increment);
                    if ("prev" === swiper.swipeDirection) swiper.slideTo(null !== rewindLastIndex ? rewindLastIndex : stopIndex);
                } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
            }
        }
        function onResize() {
            const swiper = this;
            const {params, el} = swiper;
            if (el && 0 === el.offsetWidth) return;
            if (params.breakpoints) swiper.setBreakpoint();
            const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
            swiper.allowSlideNext = true;
            swiper.allowSlidePrev = true;
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateSlidesClasses();
            if (("auto" === params.slidesPerView || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
            if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.run();
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
        }
        function onClick(e) {
            const swiper = this;
            if (!swiper.enabled) return;
            if (!swiper.allowClick) {
                if (swiper.params.preventClicks) e.preventDefault();
                if (swiper.params.preventClicksPropagation && swiper.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        }
        function onScroll() {
            const swiper = this;
            const {wrapperEl, rtlTranslate, enabled} = swiper;
            if (!enabled) return;
            swiper.previousTranslate = swiper.translate;
            if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
            if (0 === swiper.translate) swiper.translate = 0;
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (0 === translatesDiff) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
            swiper.emit("setTranslate", swiper.translate, false);
        }
        let dummyEventAttached = false;
        function dummyEventListener() {}
        const events = (swiper, method) => {
            const document = ssr_window_esm_getDocument();
            const {params, touchEvents, el, wrapperEl, device, support} = swiper;
            const capture = !!params.nested;
            const domMethod = "on" === method ? "addEventListener" : "removeEventListener";
            const swiperMethod = method;
            if (!support.touch) {
                el[domMethod](touchEvents.start, swiper.onTouchStart, false);
                document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
                document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
            } else {
                const passiveListener = "touchstart" === touchEvents.start && support.passiveListener && params.passiveListeners ? {
                    passive: true,
                    capture: false
                } : false;
                el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
                el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
                    passive: false,
                    capture
                } : capture);
                el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);
                if (touchEvents.cancel) el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
            }
            if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
            if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
            if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
        };
        function attachEvents() {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const {params, support} = swiper;
            swiper.onTouchStart = onTouchStart.bind(swiper);
            swiper.onTouchMove = onTouchMove.bind(swiper);
            swiper.onTouchEnd = onTouchEnd.bind(swiper);
            if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
            swiper.onClick = onClick.bind(swiper);
            if (support.touch && !dummyEventAttached) {
                document.addEventListener("touchstart", dummyEventListener);
                dummyEventAttached = true;
            }
            events(swiper, "on");
        }
        function detachEvents() {
            const swiper = this;
            events(swiper, "off");
        }
        const core_events = {
            attachEvents,
            detachEvents
        };
        const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
        function setBreakpoint() {
            const swiper = this;
            const {activeIndex, initialized, loopedSlides = 0, params, $el} = swiper;
            const breakpoints = params.breakpoints;
            if (!breakpoints || breakpoints && 0 === Object.keys(breakpoints).length) return;
            const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
            if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
            const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
            const breakpointParams = breakpointOnlyParams || swiper.originalParams;
            const wasMultiRow = isGridEnabled(swiper, params);
            const isMultiRow = isGridEnabled(swiper, breakpointParams);
            const wasEnabled = params.enabled;
            if (wasMultiRow && !isMultiRow) {
                $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            } else if (!wasMultiRow && isMultiRow) {
                $el.addClass(`${params.containerModifierClass}grid`);
                if (breakpointParams.grid.fill && "column" === breakpointParams.grid.fill || !breakpointParams.grid.fill && "column" === params.grid.fill) $el.addClass(`${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            }
            [ "navigation", "pagination", "scrollbar" ].forEach((prop => {
                const wasModuleEnabled = params[prop] && params[prop].enabled;
                const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
                if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
                if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
            }));
            const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
            const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
            if (directionChanged && initialized) swiper.changeDirection();
            utils_extend(swiper.params, breakpointParams);
            const isEnabled = swiper.params.enabled;
            Object.assign(swiper, {
                allowTouchMove: swiper.params.allowTouchMove,
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev
            });
            if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
            swiper.currentBreakpoint = breakpoint;
            swiper.emit("_beforeBreakpoint", breakpointParams);
            if (needsReLoop && initialized) {
                swiper.loopDestroy();
                swiper.loopCreate();
                swiper.updateSlides();
                swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
            }
            swiper.emit("breakpoint", breakpointParams);
        }
        function getBreakpoint(breakpoints, base, containerEl) {
            if (void 0 === base) base = "window";
            if (!breakpoints || "container" === base && !containerEl) return;
            let breakpoint = false;
            const window = ssr_window_esm_getWindow();
            const currentHeight = "window" === base ? window.innerHeight : containerEl.clientHeight;
            const points = Object.keys(breakpoints).map((point => {
                if ("string" === typeof point && 0 === point.indexOf("@")) {
                    const minRatio = parseFloat(point.substr(1));
                    const value = currentHeight * minRatio;
                    return {
                        value,
                        point
                    };
                }
                return {
                    value: point,
                    point
                };
            }));
            points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
            for (let i = 0; i < points.length; i += 1) {
                const {point, value} = points[i];
                if ("window" === base) {
                    if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
                } else if (value <= containerEl.clientWidth) breakpoint = point;
            }
            return breakpoint || "max";
        }
        const breakpoints = {
            setBreakpoint,
            getBreakpoint
        };
        function prepareClasses(entries, prefix) {
            const resultClasses = [];
            entries.forEach((item => {
                if ("object" === typeof item) Object.keys(item).forEach((classNames => {
                    if (item[classNames]) resultClasses.push(prefix + classNames);
                })); else if ("string" === typeof item) resultClasses.push(prefix + item);
            }));
            return resultClasses;
        }
        function addClasses() {
            const swiper = this;
            const {classNames, params, rtl, $el, device, support} = swiper;
            const suffixes = prepareClasses([ "initialized", params.direction, {
                "pointer-events": !support.touch
            }, {
                "free-mode": swiper.params.freeMode && params.freeMode.enabled
            }, {
                autoheight: params.autoHeight
            }, {
                rtl
            }, {
                grid: params.grid && params.grid.rows > 1
            }, {
                "grid-column": params.grid && params.grid.rows > 1 && "column" === params.grid.fill
            }, {
                android: device.android
            }, {
                ios: device.ios
            }, {
                "css-mode": params.cssMode
            }, {
                centered: params.cssMode && params.centeredSlides
            }, {
                "watch-progress": params.watchSlidesProgress
            } ], params.containerModifierClass);
            classNames.push(...suffixes);
            $el.addClass([ ...classNames ].join(" "));
            swiper.emitContainerClasses();
        }
        function removeClasses_removeClasses() {
            const swiper = this;
            const {$el, classNames} = swiper;
            $el.removeClass(classNames.join(" "));
            swiper.emitContainerClasses();
        }
        const classes = {
            addClasses,
            removeClasses: removeClasses_removeClasses
        };
        function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
            const window = ssr_window_esm_getWindow();
            let image;
            function onReady() {
                if (callback) callback();
            }
            const isPicture = dom(imageEl).parent("picture")[0];
            if (!isPicture && (!imageEl.complete || !checkForComplete)) if (src) {
                image = new window.Image;
                image.onload = onReady;
                image.onerror = onReady;
                if (sizes) image.sizes = sizes;
                if (srcset) image.srcset = srcset;
                if (src) image.src = src;
            } else onReady(); else onReady();
        }
        function preloadImages() {
            const swiper = this;
            swiper.imagesToLoad = swiper.$el.find("img");
            function onReady() {
                if ("undefined" === typeof swiper || null === swiper || !swiper || swiper.destroyed) return;
                if (void 0 !== swiper.imagesLoaded) swiper.imagesLoaded += 1;
                if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
                    if (swiper.params.updateOnImagesReady) swiper.update();
                    swiper.emit("imagesReady");
                }
            }
            for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
                const imageEl = swiper.imagesToLoad[i];
                swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute("src"), imageEl.srcset || imageEl.getAttribute("srcset"), imageEl.sizes || imageEl.getAttribute("sizes"), true, onReady);
            }
        }
        const core_images = {
            loadImage,
            preloadImages
        };
        function checkOverflow() {
            const swiper = this;
            const {isLocked: wasLocked, params} = swiper;
            const {slidesOffsetBefore} = params;
            if (slidesOffsetBefore) {
                const lastSlideIndex = swiper.slides.length - 1;
                const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + 2 * slidesOffsetBefore;
                swiper.isLocked = swiper.size > lastSlideRightEdge;
            } else swiper.isLocked = 1 === swiper.snapGrid.length;
            if (true === params.allowSlideNext) swiper.allowSlideNext = !swiper.isLocked;
            if (true === params.allowSlidePrev) swiper.allowSlidePrev = !swiper.isLocked;
            if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
            if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
        }
        const check_overflow = {
            checkOverflow
        };
        const defaults = {
            init: true,
            direction: "horizontal",
            touchEventsTarget: "wrapper",
            initialSlide: 0,
            speed: 300,
            cssMode: false,
            updateOnWindowResize: true,
            resizeObserver: true,
            nested: false,
            createElements: false,
            enabled: true,
            focusableElements: "input, select, option, textarea, button, video, label",
            width: null,
            height: null,
            preventInteractionOnTransition: false,
            userAgent: null,
            url: null,
            edgeSwipeDetection: false,
            edgeSwipeThreshold: 20,
            autoHeight: false,
            setWrapperSize: false,
            virtualTranslate: false,
            effect: "slide",
            breakpoints: void 0,
            breakpointsBase: "window",
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            slidesPerGroupAuto: false,
            centeredSlides: false,
            centeredSlidesBounds: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: true,
            centerInsufficientSlides: false,
            watchOverflow: true,
            roundLengths: false,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: true,
            allowTouchMove: true,
            threshold: 0,
            touchMoveStopPropagation: false,
            touchStartPreventDefault: true,
            touchStartForcePreventDefault: false,
            touchReleaseOnEdges: false,
            uniqueNavElements: true,
            resistance: true,
            resistanceRatio: .85,
            watchSlidesProgress: false,
            grabCursor: false,
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            preloadImages: true,
            updateOnImagesReady: true,
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: false,
            loopPreventsSlide: true,
            rewind: false,
            allowSlidePrev: true,
            allowSlideNext: true,
            swipeHandler: null,
            noSwiping: true,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: true,
            maxBackfaceHiddenSlides: 10,
            containerModifierClass: "swiper-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: true,
            _emitClasses: false
        };
        function moduleExtendParams(params, allModulesParams) {
            return function extendParams(obj) {
                if (void 0 === obj) obj = {};
                const moduleParamName = Object.keys(obj)[0];
                const moduleParams = obj[moduleParamName];
                if ("object" !== typeof moduleParams || null === moduleParams) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if ([ "navigation", "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && true === params[moduleParamName]) params[moduleParamName] = {
                    auto: true
                };
                if (!(moduleParamName in params && "enabled" in moduleParams)) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if (true === params[moduleParamName]) params[moduleParamName] = {
                    enabled: true
                };
                if ("object" === typeof params[moduleParamName] && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
                if (!params[moduleParamName]) params[moduleParamName] = {
                    enabled: false
                };
                utils_extend(allModulesParams, obj);
            };
        }
        const prototypes = {
            eventsEmitter: events_emitter,
            update,
            translate,
            transition: core_transition,
            slide,
            loop,
            grabCursor: grab_cursor,
            events: core_events,
            breakpoints,
            checkOverflow: check_overflow,
            classes,
            images: core_images
        };
        const extendedDefaults = {};
        class core_Swiper {
            constructor() {
                let el;
                let params;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                if (1 === args.length && args[0].constructor && "Object" === Object.prototype.toString.call(args[0]).slice(8, -1)) params = args[0]; else [el, params] = args;
                if (!params) params = {};
                params = utils_extend({}, params);
                if (el && !params.el) params.el = el;
                if (params.el && dom(params.el).length > 1) {
                    const swipers = [];
                    dom(params.el).each((containerEl => {
                        const newParams = utils_extend({}, params, {
                            el: containerEl
                        });
                        swipers.push(new core_Swiper(newParams));
                    }));
                    return swipers;
                }
                const swiper = this;
                swiper.__swiper__ = true;
                swiper.support = getSupport();
                swiper.device = getDevice({
                    userAgent: params.userAgent
                });
                swiper.browser = getBrowser();
                swiper.eventsListeners = {};
                swiper.eventsAnyListeners = [];
                swiper.modules = [ ...swiper.__modules__ ];
                if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
                const allModulesParams = {};
                swiper.modules.forEach((mod => {
                    mod({
                        swiper,
                        extendParams: moduleExtendParams(params, allModulesParams),
                        on: swiper.on.bind(swiper),
                        once: swiper.once.bind(swiper),
                        off: swiper.off.bind(swiper),
                        emit: swiper.emit.bind(swiper)
                    });
                }));
                const swiperParams = utils_extend({}, defaults, allModulesParams);
                swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
                swiper.originalParams = utils_extend({}, swiper.params);
                swiper.passedParams = utils_extend({}, params);
                if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                    swiper.on(eventName, swiper.params.on[eventName]);
                }));
                if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
                swiper.$ = dom;
                Object.assign(swiper, {
                    enabled: swiper.params.enabled,
                    el,
                    classNames: [],
                    slides: dom(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal() {
                        return "horizontal" === swiper.params.direction;
                    },
                    isVertical() {
                        return "vertical" === swiper.params.direction;
                    },
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: true,
                    isEnd: false,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: false,
                    allowSlideNext: swiper.params.allowSlideNext,
                    allowSlidePrev: swiper.params.allowSlidePrev,
                    touchEvents: function touchEvents() {
                        const touch = [ "touchstart", "touchmove", "touchend", "touchcancel" ];
                        const desktop = [ "pointerdown", "pointermove", "pointerup" ];
                        swiper.touchEventsTouch = {
                            start: touch[0],
                            move: touch[1],
                            end: touch[2],
                            cancel: touch[3]
                        };
                        swiper.touchEventsDesktop = {
                            start: desktop[0],
                            move: desktop[1],
                            end: desktop[2]
                        };
                        return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
                    }(),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        focusableElements: swiper.params.focusableElements,
                        lastClickTime: utils_now(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: true,
                    allowTouchMove: swiper.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                });
                swiper.emit("_swiper");
                if (swiper.params.init) swiper.init();
                return swiper;
            }
            enable() {
                const swiper = this;
                if (swiper.enabled) return;
                swiper.enabled = true;
                if (swiper.params.grabCursor) swiper.setGrabCursor();
                swiper.emit("enable");
            }
            disable() {
                const swiper = this;
                if (!swiper.enabled) return;
                swiper.enabled = false;
                if (swiper.params.grabCursor) swiper.unsetGrabCursor();
                swiper.emit("disable");
            }
            setProgress(progress, speed) {
                const swiper = this;
                progress = Math.min(Math.max(progress, 0), 1);
                const min = swiper.minTranslate();
                const max = swiper.maxTranslate();
                const current = (max - min) * progress + min;
                swiper.translateTo(current, "undefined" === typeof speed ? 0 : speed);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            emitContainerClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const cls = swiper.el.className.split(" ").filter((className => 0 === className.indexOf("swiper") || 0 === className.indexOf(swiper.params.containerModifierClass)));
                swiper.emit("_containerClasses", cls.join(" "));
            }
            getSlideClasses(slideEl) {
                const swiper = this;
                if (swiper.destroyed) return "";
                return slideEl.className.split(" ").filter((className => 0 === className.indexOf("swiper-slide") || 0 === className.indexOf(swiper.params.slideClass))).join(" ");
            }
            emitSlidesClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const updates = [];
                swiper.slides.each((slideEl => {
                    const classNames = swiper.getSlideClasses(slideEl);
                    updates.push({
                        slideEl,
                        classNames
                    });
                    swiper.emit("_slideClass", slideEl, classNames);
                }));
                swiper.emit("_slideClasses", updates);
            }
            slidesPerViewDynamic(view, exact) {
                if (void 0 === view) view = "current";
                if (void 0 === exact) exact = false;
                const swiper = this;
                const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
                let spv = 1;
                if (params.centeredSlides) {
                    let slideSize = slides[activeIndex].swiperSlideSize;
                    let breakLoop;
                    for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                    for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                } else if ("current" === view) for (let i = activeIndex + 1; i < slides.length; i += 1) {
                    const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                    if (slideInView) spv += 1;
                } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                    const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                    if (slideInView) spv += 1;
                }
                return spv;
            }
            update() {
                const swiper = this;
                if (!swiper || swiper.destroyed) return;
                const {snapGrid, params} = swiper;
                if (params.breakpoints) swiper.setBreakpoint();
                swiper.updateSize();
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
                function setTranslate() {
                    const translateValue = swiper.rtlTranslate ? -1 * swiper.translate : swiper.translate;
                    const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                    swiper.setTranslate(newTranslate);
                    swiper.updateActiveIndex();
                    swiper.updateSlidesClasses();
                }
                let translated;
                if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
                    setTranslate();
                    if (swiper.params.autoHeight) swiper.updateAutoHeight();
                } else {
                    if (("auto" === swiper.params.slidesPerView || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true); else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                    if (!translated) setTranslate();
                }
                if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
                swiper.emit("update");
            }
            changeDirection(newDirection, needUpdate) {
                if (void 0 === needUpdate) needUpdate = true;
                const swiper = this;
                const currentDirection = swiper.params.direction;
                if (!newDirection) newDirection = "horizontal" === currentDirection ? "vertical" : "horizontal";
                if (newDirection === currentDirection || "horizontal" !== newDirection && "vertical" !== newDirection) return swiper;
                swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
                swiper.emitContainerClasses();
                swiper.params.direction = newDirection;
                swiper.slides.each((slideEl => {
                    if ("vertical" === newDirection) slideEl.style.width = ""; else slideEl.style.height = "";
                }));
                swiper.emit("changeDirection");
                if (needUpdate) swiper.update();
                return swiper;
            }
            mount(el) {
                const swiper = this;
                if (swiper.mounted) return true;
                const $el = dom(el || swiper.params.el);
                el = $el[0];
                if (!el) return false;
                el.swiper = swiper;
                const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
                const getWrapper = () => {
                    if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                        const res = dom(el.shadowRoot.querySelector(getWrapperSelector()));
                        res.children = options => $el.children(options);
                        return res;
                    }
                    if (!$el.children) return dom($el).children(getWrapperSelector());
                    return $el.children(getWrapperSelector());
                };
                let $wrapperEl = getWrapper();
                if (0 === $wrapperEl.length && swiper.params.createElements) {
                    const document = ssr_window_esm_getDocument();
                    const wrapper = document.createElement("div");
                    $wrapperEl = dom(wrapper);
                    wrapper.className = swiper.params.wrapperClass;
                    $el.append(wrapper);
                    $el.children(`.${swiper.params.slideClass}`).each((slideEl => {
                        $wrapperEl.append(slideEl);
                    }));
                }
                Object.assign(swiper, {
                    $el,
                    el,
                    $wrapperEl,
                    wrapperEl: $wrapperEl[0],
                    mounted: true,
                    rtl: "rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction"),
                    rtlTranslate: "horizontal" === swiper.params.direction && ("rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction")),
                    wrongRTL: "-webkit-box" === $wrapperEl.css("display")
                });
                return true;
            }
            init(el) {
                const swiper = this;
                if (swiper.initialized) return swiper;
                const mounted = swiper.mount(el);
                if (false === mounted) return swiper;
                swiper.emit("beforeInit");
                if (swiper.params.breakpoints) swiper.setBreakpoint();
                swiper.addClasses();
                if (swiper.params.loop) swiper.loopCreate();
                swiper.updateSize();
                swiper.updateSlides();
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
                if (swiper.params.preloadImages) swiper.preloadImages();
                if (swiper.params.loop) swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
                swiper.attachEvents();
                swiper.initialized = true;
                swiper.emit("init");
                swiper.emit("afterInit");
                return swiper;
            }
            destroy(deleteInstance, cleanStyles) {
                if (void 0 === deleteInstance) deleteInstance = true;
                if (void 0 === cleanStyles) cleanStyles = true;
                const swiper = this;
                const {params, $el, $wrapperEl, slides} = swiper;
                if ("undefined" === typeof swiper.params || swiper.destroyed) return null;
                swiper.emit("beforeDestroy");
                swiper.initialized = false;
                swiper.detachEvents();
                if (params.loop) swiper.loopDestroy();
                if (cleanStyles) {
                    swiper.removeClasses();
                    $el.removeAttr("style");
                    $wrapperEl.removeAttr("style");
                    if (slides && slides.length) slides.removeClass([ params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass ].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index");
                }
                swiper.emit("destroy");
                Object.keys(swiper.eventsListeners).forEach((eventName => {
                    swiper.off(eventName);
                }));
                if (false !== deleteInstance) {
                    swiper.$el[0].swiper = null;
                    deleteProps(swiper);
                }
                swiper.destroyed = true;
                return null;
            }
            static extendDefaults(newDefaults) {
                utils_extend(extendedDefaults, newDefaults);
            }
            static get extendedDefaults() {
                return extendedDefaults;
            }
            static get defaults() {
                return defaults;
            }
            static installModule(mod) {
                if (!core_Swiper.prototype.__modules__) core_Swiper.prototype.__modules__ = [];
                const modules = core_Swiper.prototype.__modules__;
                if ("function" === typeof mod && modules.indexOf(mod) < 0) modules.push(mod);
            }
            static use(module) {
                if (Array.isArray(module)) {
                    module.forEach((m => core_Swiper.installModule(m)));
                    return core_Swiper;
                }
                core_Swiper.installModule(module);
                return core_Swiper;
            }
        }
        Object.keys(prototypes).forEach((prototypeGroup => {
            Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
                core_Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
            }));
        }));
        core_Swiper.use([ Resize, Observer ]);
        const core = core_Swiper;
        function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
            const document = ssr_window_esm_getDocument();
            if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
                if (!params[key] && true === params.auto) {
                    let element = swiper.$el.children(`.${checkProps[key]}`)[0];
                    if (!element) {
                        element = document.createElement("div");
                        element.className = checkProps[key];
                        swiper.$el.append(element);
                    }
                    params[key] = element;
                    originalParams[key] = element;
                }
            }));
            return params;
        }
        function Navigation(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            extendParams({
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: false,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock",
                    navigationDisabledClass: "swiper-navigation-disabled"
                }
            });
            swiper.navigation = {
                nextEl: null,
                $nextEl: null,
                prevEl: null,
                $prevEl: null
            };
            function getEl(el) {
                let $el;
                if (el) {
                    $el = dom(el);
                    if (swiper.params.uniqueNavElements && "string" === typeof el && $el.length > 1 && 1 === swiper.$el.find(el).length) $el = swiper.$el.find(el);
                }
                return $el;
            }
            function toggleEl($el, disabled) {
                const params = swiper.params.navigation;
                if ($el && $el.length > 0) {
                    $el[disabled ? "addClass" : "removeClass"](params.disabledClass);
                    if ($el[0] && "BUTTON" === $el[0].tagName) $el[0].disabled = disabled;
                    if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
                }
            }
            function update() {
                if (swiper.params.loop) return;
                const {$nextEl, $prevEl} = swiper.navigation;
                toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
                toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
            }
            function onPrevClick(e) {
                e.preventDefault();
                if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slidePrev();
            }
            function onNextClick(e) {
                e.preventDefault();
                if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slideNext();
            }
            function init() {
                const params = swiper.params.navigation;
                swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                    nextEl: "swiper-button-next",
                    prevEl: "swiper-button-prev"
                });
                if (!(params.nextEl || params.prevEl)) return;
                const $nextEl = getEl(params.nextEl);
                const $prevEl = getEl(params.prevEl);
                if ($nextEl && $nextEl.length > 0) $nextEl.on("click", onNextClick);
                if ($prevEl && $prevEl.length > 0) $prevEl.on("click", onPrevClick);
                Object.assign(swiper.navigation, {
                    $nextEl,
                    nextEl: $nextEl && $nextEl[0],
                    $prevEl,
                    prevEl: $prevEl && $prevEl[0]
                });
                if (!swiper.enabled) {
                    if ($nextEl) $nextEl.addClass(params.lockClass);
                    if ($prevEl) $prevEl.addClass(params.lockClass);
                }
            }
            function destroy() {
                const {$nextEl, $prevEl} = swiper.navigation;
                if ($nextEl && $nextEl.length) {
                    $nextEl.off("click", onNextClick);
                    $nextEl.removeClass(swiper.params.navigation.disabledClass);
                }
                if ($prevEl && $prevEl.length) {
                    $prevEl.off("click", onPrevClick);
                    $prevEl.removeClass(swiper.params.navigation.disabledClass);
                }
            }
            on("init", (() => {
                if (false === swiper.params.navigation.enabled) disable(); else {
                    init();
                    update();
                }
            }));
            on("toEdge fromEdge lock unlock", (() => {
                update();
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                const {$nextEl, $prevEl} = swiper.navigation;
                if ($nextEl) $nextEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
                if ($prevEl) $prevEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
            }));
            on("click", ((_s, e) => {
                const {$nextEl, $prevEl} = swiper.navigation;
                const targetEl = e.target;
                if (swiper.params.navigation.hideOnClick && !dom(targetEl).is($prevEl) && !dom(targetEl).is($nextEl)) {
                    if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                    let isHidden;
                    if ($nextEl) isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass); else if ($prevEl) isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
                    if (true === isHidden) emit("navigationShow"); else emit("navigationHide");
                    if ($nextEl) $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
                    if ($prevEl) $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
                }
            }));
            const enable = () => {
                swiper.$el.removeClass(swiper.params.navigation.navigationDisabledClass);
                init();
                update();
            };
            const disable = () => {
                swiper.$el.addClass(swiper.params.navigation.navigationDisabledClass);
                destroy();
            };
            Object.assign(swiper.navigation, {
                enable,
                disable,
                update,
                init,
                destroy
            });
        }
        function classes_to_selector_classesToSelector(classes) {
            if (void 0 === classes) classes = "";
            return `.${classes.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`;
        }
        function Pagination(_ref) {
            let {swiper, extendParams, on, emit} = _ref;
            const pfx = "swiper-pagination";
            extendParams({
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: false,
                    hideOnClick: false,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: false,
                    type: "bullets",
                    dynamicBullets: false,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: number => number,
                    formatFractionTotal: number => number,
                    bulletClass: `${pfx}-bullet`,
                    bulletActiveClass: `${pfx}-bullet-active`,
                    modifierClass: `${pfx}-`,
                    currentClass: `${pfx}-current`,
                    totalClass: `${pfx}-total`,
                    hiddenClass: `${pfx}-hidden`,
                    progressbarFillClass: `${pfx}-progressbar-fill`,
                    progressbarOppositeClass: `${pfx}-progressbar-opposite`,
                    clickableClass: `${pfx}-clickable`,
                    lockClass: `${pfx}-lock`,
                    horizontalClass: `${pfx}-horizontal`,
                    verticalClass: `${pfx}-vertical`,
                    paginationDisabledClass: `${pfx}-disabled`
                }
            });
            swiper.pagination = {
                el: null,
                $el: null,
                bullets: []
            };
            let bulletSize;
            let dynamicBulletIndex = 0;
            function isPaginationDisabled() {
                return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || 0 === swiper.pagination.$el.length;
            }
            function setSideBullets($bulletEl, position) {
                const {bulletActiveClass} = swiper.params.pagination;
                $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
            }
            function update() {
                const rtl = swiper.rtl;
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
                const $el = swiper.pagination.$el;
                let current;
                const total = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                if (swiper.params.loop) {
                    current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
                    if (current > slidesLength - 1 - 2 * swiper.loopedSlides) current -= slidesLength - 2 * swiper.loopedSlides;
                    if (current > total - 1) current -= total;
                    if (current < 0 && "bullets" !== swiper.params.paginationType) current = total + current;
                } else if ("undefined" !== typeof swiper.snapIndex) current = swiper.snapIndex; else current = swiper.activeIndex || 0;
                if ("bullets" === params.type && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                    const bullets = swiper.pagination.bullets;
                    let firstIndex;
                    let lastIndex;
                    let midIndex;
                    if (params.dynamicBullets) {
                        bulletSize = bullets.eq(0)[swiper.isHorizontal() ? "outerWidth" : "outerHeight"](true);
                        $el.css(swiper.isHorizontal() ? "width" : "height", `${bulletSize * (params.dynamicMainBullets + 4)}px`);
                        if (params.dynamicMainBullets > 1 && void 0 !== swiper.previousIndex) {
                            dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);
                            if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                        }
                        firstIndex = Math.max(current - dynamicBulletIndex, 0);
                        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                        midIndex = (lastIndex + firstIndex) / 2;
                    }
                    bullets.removeClass([ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((suffix => `${params.bulletActiveClass}${suffix}`)).join(" "));
                    if ($el.length > 1) bullets.each((bullet => {
                        const $bullet = dom(bullet);
                        const bulletIndex = $bullet.index();
                        if (bulletIndex === current) $bullet.addClass(params.bulletActiveClass);
                        if (params.dynamicBullets) {
                            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) $bullet.addClass(`${params.bulletActiveClass}-main`);
                            if (bulletIndex === firstIndex) setSideBullets($bullet, "prev");
                            if (bulletIndex === lastIndex) setSideBullets($bullet, "next");
                        }
                    })); else {
                        const $bullet = bullets.eq(current);
                        const bulletIndex = $bullet.index();
                        $bullet.addClass(params.bulletActiveClass);
                        if (params.dynamicBullets) {
                            const $firstDisplayedBullet = bullets.eq(firstIndex);
                            const $lastDisplayedBullet = bullets.eq(lastIndex);
                            for (let i = firstIndex; i <= lastIndex; i += 1) bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
                            if (swiper.params.loop) if (bulletIndex >= bullets.length) {
                                for (let i = params.dynamicMainBullets; i >= 0; i -= 1) bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
                                bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
                            } else {
                                setSideBullets($firstDisplayedBullet, "prev");
                                setSideBullets($lastDisplayedBullet, "next");
                            } else {
                                setSideBullets($firstDisplayedBullet, "prev");
                                setSideBullets($lastDisplayedBullet, "next");
                            }
                        }
                    }
                    if (params.dynamicBullets) {
                        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
                        const offsetProp = rtl ? "right" : "left";
                        bullets.css(swiper.isHorizontal() ? offsetProp : "top", `${bulletsOffset}px`);
                    }
                }
                if ("fraction" === params.type) {
                    $el.find(classes_to_selector_classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
                    $el.find(classes_to_selector_classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
                }
                if ("progressbar" === params.type) {
                    let progressbarDirection;
                    if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                    const scale = (current + 1) / total;
                    let scaleX = 1;
                    let scaleY = 1;
                    if ("horizontal" === progressbarDirection) scaleX = scale; else scaleY = scale;
                    $el.find(classes_to_selector_classesToSelector(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
                }
                if ("custom" === params.type && params.renderCustom) {
                    $el.html(params.renderCustom(swiper, current + 1, total));
                    emit("paginationRender", $el[0]);
                } else emit("paginationUpdate", $el[0]);
                if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
            }
            function render() {
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
                const $el = swiper.pagination.$el;
                let paginationHTML = "";
                if ("bullets" === params.type) {
                    let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                    if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
                    for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass); else paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
                    $el.html(paginationHTML);
                    swiper.pagination.bullets = $el.find(classes_to_selector_classesToSelector(params.bulletClass));
                }
                if ("fraction" === params.type) {
                    if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass); else paginationHTML = `<span class="${params.currentClass}"></span>` + " / " + `<span class="${params.totalClass}"></span>`;
                    $el.html(paginationHTML);
                }
                if ("progressbar" === params.type) {
                    if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass); else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
                    $el.html(paginationHTML);
                }
                if ("custom" !== params.type) emit("paginationRender", swiper.pagination.$el[0]);
            }
            function init() {
                swiper.params.pagination = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
                    el: "swiper-pagination"
                });
                const params = swiper.params.pagination;
                if (!params.el) return;
                let $el = dom(params.el);
                if (0 === $el.length) return;
                if (swiper.params.uniqueNavElements && "string" === typeof params.el && $el.length > 1) {
                    $el = swiper.$el.find(params.el);
                    if ($el.length > 1) $el = $el.filter((el => {
                        if (dom(el).parents(".swiper")[0] !== swiper.el) return false;
                        return true;
                    }));
                }
                if ("bullets" === params.type && params.clickable) $el.addClass(params.clickableClass);
                $el.addClass(params.modifierClass + params.type);
                $el.addClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if ("bullets" === params.type && params.dynamicBullets) {
                    $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
                    dynamicBulletIndex = 0;
                    if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
                }
                if ("progressbar" === params.type && params.progressbarOpposite) $el.addClass(params.progressbarOppositeClass);
                if (params.clickable) $el.on("click", classes_to_selector_classesToSelector(params.bulletClass), (function onClick(e) {
                    e.preventDefault();
                    let index = dom(this).index() * swiper.params.slidesPerGroup;
                    if (swiper.params.loop) index += swiper.loopedSlides;
                    swiper.slideTo(index);
                }));
                Object.assign(swiper.pagination, {
                    $el,
                    el: $el[0]
                });
                if (!swiper.enabled) $el.addClass(params.lockClass);
            }
            function destroy() {
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const $el = swiper.pagination.$el;
                $el.removeClass(params.hiddenClass);
                $el.removeClass(params.modifierClass + params.type);
                $el.removeClass(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);
                if (params.clickable) $el.off("click", classes_to_selector_classesToSelector(params.bulletClass));
            }
            on("init", (() => {
                if (false === swiper.params.pagination.enabled) disable(); else {
                    init();
                    render();
                    update();
                }
            }));
            on("activeIndexChange", (() => {
                if (swiper.params.loop) update(); else if ("undefined" === typeof swiper.snapIndex) update();
            }));
            on("snapIndexChange", (() => {
                if (!swiper.params.loop) update();
            }));
            on("slidesLengthChange", (() => {
                if (swiper.params.loop) {
                    render();
                    update();
                }
            }));
            on("snapGridLengthChange", (() => {
                if (!swiper.params.loop) {
                    render();
                    update();
                }
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                const {$el} = swiper.pagination;
                if ($el) $el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.pagination.lockClass);
            }));
            on("lock unlock", (() => {
                update();
            }));
            on("click", ((_s, e) => {
                const targetEl = e.target;
                const {$el} = swiper.pagination;
                if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el.length > 0 && !dom(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
                    if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                    const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);
                    if (true === isHidden) emit("paginationShow"); else emit("paginationHide");
                    $el.toggleClass(swiper.params.pagination.hiddenClass);
                }
            }));
            const enable = () => {
                swiper.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
                if (swiper.pagination.$el) swiper.pagination.$el.removeClass(swiper.params.pagination.paginationDisabledClass);
                init();
                render();
                update();
            };
            const disable = () => {
                swiper.$el.addClass(swiper.params.pagination.paginationDisabledClass);
                if (swiper.pagination.$el) swiper.pagination.$el.addClass(swiper.params.pagination.paginationDisabledClass);
                destroy();
            };
            Object.assign(swiper.pagination, {
                enable,
                disable,
                render,
                update,
                init,
                destroy
            });
        }
        function Thumb(_ref) {
            let {swiper, extendParams, on} = _ref;
            extendParams({
                thumbs: {
                    swiper: null,
                    multipleActiveThumbs: true,
                    autoScrollOffset: 0,
                    slideThumbActiveClass: "swiper-slide-thumb-active",
                    thumbsContainerClass: "swiper-thumbs"
                }
            });
            let initialized = false;
            let swiperCreated = false;
            swiper.thumbs = {
                swiper: null
            };
            function onThumbClick() {
                const thumbsSwiper = swiper.thumbs.swiper;
                if (!thumbsSwiper || thumbsSwiper.destroyed) return;
                const clickedIndex = thumbsSwiper.clickedIndex;
                const clickedSlide = thumbsSwiper.clickedSlide;
                if (clickedSlide && dom(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
                if ("undefined" === typeof clickedIndex || null === clickedIndex) return;
                let slideToIndex;
                if (thumbsSwiper.params.loop) slideToIndex = parseInt(dom(thumbsSwiper.clickedSlide).attr("data-swiper-slide-index"), 10); else slideToIndex = clickedIndex;
                if (swiper.params.loop) {
                    let currentIndex = swiper.activeIndex;
                    if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
                        swiper.loopFix();
                        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
                        currentIndex = swiper.activeIndex;
                    }
                    const prevIndex = swiper.slides.eq(currentIndex).prevAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
                    const nextIndex = swiper.slides.eq(currentIndex).nextAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
                    if ("undefined" === typeof prevIndex) slideToIndex = nextIndex; else if ("undefined" === typeof nextIndex) slideToIndex = prevIndex; else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex; else slideToIndex = prevIndex;
                }
                swiper.slideTo(slideToIndex);
            }
            function init() {
                const {thumbs: thumbsParams} = swiper.params;
                if (initialized) return false;
                initialized = true;
                const SwiperClass = swiper.constructor;
                if (thumbsParams.swiper instanceof SwiperClass) {
                    swiper.thumbs.swiper = thumbsParams.swiper;
                    Object.assign(swiper.thumbs.swiper.originalParams, {
                        watchSlidesProgress: true,
                        slideToClickedSlide: false
                    });
                    Object.assign(swiper.thumbs.swiper.params, {
                        watchSlidesProgress: true,
                        slideToClickedSlide: false
                    });
                } else if (utils_isObject(thumbsParams.swiper)) {
                    const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
                    Object.assign(thumbsSwiperParams, {
                        watchSlidesProgress: true,
                        slideToClickedSlide: false
                    });
                    swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
                    swiperCreated = true;
                }
                swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
                swiper.thumbs.swiper.on("tap", onThumbClick);
                return true;
            }
            function update(initial) {
                const thumbsSwiper = swiper.thumbs.swiper;
                if (!thumbsSwiper || thumbsSwiper.destroyed) return;
                const slidesPerView = "auto" === thumbsSwiper.params.slidesPerView ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
                const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
                const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
                if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
                    let currentThumbsIndex = thumbsSwiper.activeIndex;
                    let newThumbsIndex;
                    let direction;
                    if (thumbsSwiper.params.loop) {
                        if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
                            thumbsSwiper.loopFix();
                            thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
                            currentThumbsIndex = thumbsSwiper.activeIndex;
                        }
                        const prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();
                        const nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();
                        if ("undefined" === typeof prevThumbsIndex) newThumbsIndex = nextThumbsIndex; else if ("undefined" === typeof nextThumbsIndex) newThumbsIndex = prevThumbsIndex; else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) newThumbsIndex = thumbsSwiper.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex; else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) newThumbsIndex = nextThumbsIndex; else newThumbsIndex = prevThumbsIndex;
                        direction = swiper.activeIndex > swiper.previousIndex ? "next" : "prev";
                    } else {
                        newThumbsIndex = swiper.realIndex;
                        direction = newThumbsIndex > swiper.previousIndex ? "next" : "prev";
                    }
                    if (useOffset) newThumbsIndex += "next" === direction ? autoScrollOffset : -1 * autoScrollOffset;
                    if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
                        if (thumbsSwiper.params.centeredSlides) if (newThumbsIndex > currentThumbsIndex) newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1; else newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1; else if (newThumbsIndex > currentThumbsIndex && 1 === thumbsSwiper.params.slidesPerGroup) ;
                        thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : void 0);
                    }
                }
                let thumbsToActivate = 1;
                const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
                if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) thumbsToActivate = swiper.params.slidesPerView;
                if (!swiper.params.thumbs.multipleActiveThumbs) thumbsToActivate = 1;
                thumbsToActivate = Math.floor(thumbsToActivate);
                thumbsSwiper.slides.removeClass(thumbActiveClass);
                if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) for (let i = 0; i < thumbsToActivate; i += 1) thumbsSwiper.$wrapperEl.children(`[data-swiper-slide-index="${swiper.realIndex + i}"]`).addClass(thumbActiveClass); else for (let i = 0; i < thumbsToActivate; i += 1) thumbsSwiper.slides.eq(swiper.realIndex + i).addClass(thumbActiveClass);
            }
            on("beforeInit", (() => {
                const {thumbs} = swiper.params;
                if (!thumbs || !thumbs.swiper) return;
                init();
                update(true);
            }));
            on("slideChange update resize observerUpdate", (() => {
                update();
            }));
            on("setTransition", ((_s, duration) => {
                const thumbsSwiper = swiper.thumbs.swiper;
                if (!thumbsSwiper || thumbsSwiper.destroyed) return;
                thumbsSwiper.setTransition(duration);
            }));
            on("beforeDestroy", (() => {
                const thumbsSwiper = swiper.thumbs.swiper;
                if (!thumbsSwiper || thumbsSwiper.destroyed) return;
                if (swiperCreated) thumbsSwiper.destroy();
            }));
            Object.assign(swiper.thumbs, {
                init,
                update
            });
        }
        function freeMode(_ref) {
            let {swiper, extendParams, emit, once} = _ref;
            extendParams({
                freeMode: {
                    enabled: false,
                    momentum: true,
                    momentumRatio: 1,
                    momentumBounce: true,
                    momentumBounceRatio: 1,
                    momentumVelocityRatio: 1,
                    sticky: false,
                    minimumVelocity: .02
                }
            });
            function onTouchStart() {
                const translate = swiper.getTranslate();
                swiper.setTranslate(translate);
                swiper.setTransition(0);
                swiper.touchEventsData.velocities.length = 0;
                swiper.freeMode.onTouchEnd({
                    currentPos: swiper.rtl ? swiper.translate : -swiper.translate
                });
            }
            function onTouchMove() {
                const {touchEventsData: data, touches} = swiper;
                if (0 === data.velocities.length) data.velocities.push({
                    position: touches[swiper.isHorizontal() ? "startX" : "startY"],
                    time: data.touchStartTime
                });
                data.velocities.push({
                    position: touches[swiper.isHorizontal() ? "currentX" : "currentY"],
                    time: utils_now()
                });
            }
            function onTouchEnd(_ref2) {
                let {currentPos} = _ref2;
                const {params, $wrapperEl, rtlTranslate: rtl, snapGrid, touchEventsData: data} = swiper;
                const touchEndTime = utils_now();
                const timeDiff = touchEndTime - data.touchStartTime;
                if (currentPos < -swiper.minTranslate()) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                if (currentPos > -swiper.maxTranslate()) {
                    if (swiper.slides.length < snapGrid.length) swiper.slideTo(snapGrid.length - 1); else swiper.slideTo(swiper.slides.length - 1);
                    return;
                }
                if (params.freeMode.momentum) {
                    if (data.velocities.length > 1) {
                        const lastMoveEvent = data.velocities.pop();
                        const velocityEvent = data.velocities.pop();
                        const distance = lastMoveEvent.position - velocityEvent.position;
                        const time = lastMoveEvent.time - velocityEvent.time;
                        swiper.velocity = distance / time;
                        swiper.velocity /= 2;
                        if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) swiper.velocity = 0;
                        if (time > 150 || utils_now() - lastMoveEvent.time > 300) swiper.velocity = 0;
                    } else swiper.velocity = 0;
                    swiper.velocity *= params.freeMode.momentumVelocityRatio;
                    data.velocities.length = 0;
                    let momentumDuration = 1e3 * params.freeMode.momentumRatio;
                    const momentumDistance = swiper.velocity * momentumDuration;
                    let newPosition = swiper.translate + momentumDistance;
                    if (rtl) newPosition = -newPosition;
                    let doBounce = false;
                    let afterBouncePosition;
                    const bounceAmount = 20 * Math.abs(swiper.velocity) * params.freeMode.momentumBounceRatio;
                    let needsLoopFix;
                    if (newPosition < swiper.maxTranslate()) {
                        if (params.freeMode.momentumBounce) {
                            if (newPosition + swiper.maxTranslate() < -bounceAmount) newPosition = swiper.maxTranslate() - bounceAmount;
                            afterBouncePosition = swiper.maxTranslate();
                            doBounce = true;
                            data.allowMomentumBounce = true;
                        } else newPosition = swiper.maxTranslate();
                        if (params.loop && params.centeredSlides) needsLoopFix = true;
                    } else if (newPosition > swiper.minTranslate()) {
                        if (params.freeMode.momentumBounce) {
                            if (newPosition - swiper.minTranslate() > bounceAmount) newPosition = swiper.minTranslate() + bounceAmount;
                            afterBouncePosition = swiper.minTranslate();
                            doBounce = true;
                            data.allowMomentumBounce = true;
                        } else newPosition = swiper.minTranslate();
                        if (params.loop && params.centeredSlides) needsLoopFix = true;
                    } else if (params.freeMode.sticky) {
                        let nextSlide;
                        for (let j = 0; j < snapGrid.length; j += 1) if (snapGrid[j] > -newPosition) {
                            nextSlide = j;
                            break;
                        }
                        if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || "next" === swiper.swipeDirection) newPosition = snapGrid[nextSlide]; else newPosition = snapGrid[nextSlide - 1];
                        newPosition = -newPosition;
                    }
                    if (needsLoopFix) once("transitionEnd", (() => {
                        swiper.loopFix();
                    }));
                    if (0 !== swiper.velocity) {
                        if (rtl) momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity); else momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
                        if (params.freeMode.sticky) {
                            const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
                            const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
                            if (moveDistance < currentSlideSize) momentumDuration = params.speed; else if (moveDistance < 2 * currentSlideSize) momentumDuration = 1.5 * params.speed; else momentumDuration = 2.5 * params.speed;
                        }
                    } else if (params.freeMode.sticky) {
                        swiper.slideToClosest();
                        return;
                    }
                    if (params.freeMode.momentumBounce && doBounce) {
                        swiper.updateProgress(afterBouncePosition);
                        swiper.setTransition(momentumDuration);
                        swiper.setTranslate(newPosition);
                        swiper.transitionStart(true, swiper.swipeDirection);
                        swiper.animating = true;
                        $wrapperEl.transitionEnd((() => {
                            if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
                            emit("momentumBounce");
                            swiper.setTransition(params.speed);
                            setTimeout((() => {
                                swiper.setTranslate(afterBouncePosition);
                                $wrapperEl.transitionEnd((() => {
                                    if (!swiper || swiper.destroyed) return;
                                    swiper.transitionEnd();
                                }));
                            }), 0);
                        }));
                    } else if (swiper.velocity) {
                        emit("_freeModeNoMomentumRelease");
                        swiper.updateProgress(newPosition);
                        swiper.setTransition(momentumDuration);
                        swiper.setTranslate(newPosition);
                        swiper.transitionStart(true, swiper.swipeDirection);
                        if (!swiper.animating) {
                            swiper.animating = true;
                            $wrapperEl.transitionEnd((() => {
                                if (!swiper || swiper.destroyed) return;
                                swiper.transitionEnd();
                            }));
                        }
                    } else swiper.updateProgress(newPosition);
                    swiper.updateActiveIndex();
                    swiper.updateSlidesClasses();
                } else if (params.freeMode.sticky) {
                    swiper.slideToClosest();
                    return;
                } else if (params.freeMode) emit("_freeModeNoMomentumRelease");
                if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
                    swiper.updateProgress();
                    swiper.updateActiveIndex();
                    swiper.updateSlidesClasses();
                }
            }
            Object.assign(swiper, {
                freeMode: {
                    onTouchStart,
                    onTouchMove,
                    onTouchEnd
                }
            });
        }
        function initSliders() {
            let heroList = new core(".hero__list", {
                modules: [ Navigation ],
                observer: true,
                observeParents: true,
                slidesPerView: 3,
                spaceBetween: 0,
                direction: "vertical",
                autoHeight: true,
                speed: 800,
                on: {}
            });
            new core(".hero__slider", {
                modules: [ Navigation, Pagination, Thumb ],
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true,
                speed: 800,
                thumbs: {
                    swiper: heroList
                },
                pagination: {
                    el: ".hero__pagination",
                    type: "fraction",
                    clickable: true
                },
                navigation: {
                    nextEl: ".hero__arrow-next",
                    prevEl: ".hero__arrow-prev"
                },
                on: {}
            });
            if (document.querySelector(".statistics__list")) new core(".statistics__list", {
                modules: [ Navigation, freeMode ],
                slidesPerView: "auto",
                spaceBetween: 0,
                lazy: true,
                freeMode: {
                    enabled: true
                },
                navigation: {
                    prevEl: ".statistics__navigation-prev",
                    nextEl: ".statistics__navigation-next"
                },
                on: {}
            });
            if (document.querySelector(".awards__list")) new core(".awards__list", {
                modules: [ Navigation, freeMode ],
                slidesPerView: "auto",
                spaceBetween: 0,
                lazy: true,
                freeMode: {
                    enabled: true
                },
                navigation: {
                    prevEl: ".awards__navigation-prev",
                    nextEl: ".awards__navigation-next",
                    lockClass: "_hidden"
                },
                on: {}
            });
        }
        window.addEventListener("load", (function(e) {
            initSliders();
        }));
        var lazyload_min = __webpack_require__(732);
        new lazyload_min({
            elements_selector: "[data-src],[data-srcset],[data-bg],[data-bg-hidpi]",
            class_loaded: "_lazy-loaded"
        });
        let addWindowScrollEvent = false;
        function pageNavigation() {
            document.addEventListener("click", pageNavigationAction);
            document.addEventListener("watcherCallback", pageNavigationAction);
            function pageNavigationAction(e) {
                if ("click" === e.type) {
                    const targetElement = e.target;
                    if (targetElement.closest("[data-goto]")) {
                        const gotoLink = targetElement.closest("[data-goto]");
                        const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                        const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                        const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                        const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                        setTimeout((() => {
                            gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                        }), 500);
                        e.preventDefault();
                    }
                } else if ("watcherCallback" === e.type && e.detail) {
                    const entry = e.detail.entry;
                    const targetElement = entry.target;
                    if ("navigator" === targetElement.dataset.watch) {
                        document.querySelector(`[data-goto]._navigator-active`);
                        let navigatorCurrentItem;
                        if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
                            const element = targetElement.classList[index];
                            if (document.querySelector(`[data-goto=".${element}"]`)) {
                                navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                                break;
                            }
                        }
                        if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
                    }
                }
            }
            if (getHash()) {
                let goToHash;
                if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
                goToHash ? gotoBlock(goToHash, true, 500, 20) : null;
            }
        }
        function headerScroll() {
            addWindowScrollEvent = true;
            const header = document.querySelector("header.header");
            const headerShow = header.hasAttribute("data-scroll-show");
            const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
            const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
            let scrollDirection = 0;
            let timer;
            document.addEventListener("windowScroll", (function(e) {
                const scrollTop = window.scrollY;
                clearTimeout(timer);
                if (scrollTop >= startPoint) {
                    !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                    if (headerShow) {
                        if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                        timer = setTimeout((() => {
                            !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                        }), headerShowTimer);
                    }
                } else {
                    header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                    if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
                }
                scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
            }));
        }
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        /*!
 * lightgallery | 2.5.0 | June 13th 2022
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */
        /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
        var __assign = function() {
            __assign = Object.assign || function __assign(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        function __spreadArrays() {
            for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
            var r = Array(s), k = 0;
            for (i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
            k++) r[k] = a[j];
            return r;
        }
        var lGEvents = {
            afterAppendSlide: "lgAfterAppendSlide",
            init: "lgInit",
            hasVideo: "lgHasVideo",
            containerResize: "lgContainerResize",
            updateSlides: "lgUpdateSlides",
            afterAppendSubHtml: "lgAfterAppendSubHtml",
            beforeOpen: "lgBeforeOpen",
            afterOpen: "lgAfterOpen",
            slideItemLoad: "lgSlideItemLoad",
            beforeSlide: "lgBeforeSlide",
            afterSlide: "lgAfterSlide",
            posterClick: "lgPosterClick",
            dragStart: "lgDragStart",
            dragMove: "lgDragMove",
            dragEnd: "lgDragEnd",
            beforeNextSlide: "lgBeforeNextSlide",
            beforePrevSlide: "lgBeforePrevSlide",
            beforeClose: "lgBeforeClose",
            afterClose: "lgAfterClose",
            rotateLeft: "lgRotateLeft",
            rotateRight: "lgRotateRight",
            flipHorizontal: "lgFlipHorizontal",
            flipVertical: "lgFlipVertical",
            autoplay: "lgAutoplay",
            autoplayStart: "lgAutoplayStart",
            autoplayStop: "lgAutoplayStop"
        };
        var lightGalleryCoreSettings = {
            mode: "lg-slide",
            easing: "ease",
            speed: 400,
            licenseKey: "0000-0000-000-0000",
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 300,
            container: "",
            startAnimationDuration: 400,
            zoomFromOrigin: true,
            hideBarsDelay: 0,
            showBarsAfter: 1e4,
            slideDelay: 0,
            supportLegacyBrowser: true,
            allowMediaOverlap: false,
            videoMaxSize: "1280-720",
            loadYouTubePoster: true,
            defaultCaptionHeight: 0,
            ariaLabelledby: "",
            ariaDescribedby: "",
            resetScrollPosition: true,
            hideScrollbar: false,
            closable: true,
            swipeToClose: true,
            closeOnTap: true,
            showCloseIcon: true,
            showMaximizeIcon: false,
            loop: true,
            escKey: true,
            keyPress: true,
            trapFocus: true,
            controls: true,
            slideEndAnimation: true,
            hideControlOnEnd: false,
            mousewheel: false,
            getCaptionFromTitleOrAlt: true,
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: false,
            preload: 2,
            numberOfSlideItemsInDom: 10,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            index: 0,
            iframeWidth: "100%",
            iframeHeight: "100%",
            iframeMaxWidth: "100%",
            iframeMaxHeight: "100%",
            download: true,
            counter: true,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: true,
            enableDrag: true,
            dynamic: false,
            dynamicEl: [],
            extraProps: [],
            exThumbImage: "",
            isMobile: void 0,
            mobileSettings: {
                controls: false,
                showCloseIcon: false,
                download: false
            },
            plugins: [],
            strings: {
                closeGallery: "Close gallery",
                toggleMaximize: "Toggle maximize",
                previousSlide: "Previous slide",
                nextSlide: "Next slide",
                download: "Download",
                playVideo: "Play video"
            }
        };
        function initLgPolyfills() {
            (function() {
                if ("function" === typeof window.CustomEvent) return false;
                function CustomEvent(event, params) {
                    params = params || {
                        bubbles: false,
                        cancelable: false,
                        detail: null
                    };
                    var evt = document.createEvent("CustomEvent");
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                }
                window.CustomEvent = CustomEvent;
            })();
            (function() {
                if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
            })();
        }
        var lgQuery = function() {
            function lgQuery(selector) {
                this.cssVenderPrefixes = [ "TransitionDuration", "TransitionTimingFunction", "Transform", "Transition" ];
                this.selector = this._getSelector(selector);
                this.firstElement = this._getFirstEl();
                return this;
            }
            lgQuery.generateUUID = function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(c) {
                    var r = 16 * Math.random() | 0, v = "x" == c ? r : 3 & r | 8;
                    return v.toString(16);
                }));
            };
            lgQuery.prototype._getSelector = function(selector, context) {
                if (void 0 === context) context = document;
                if ("string" !== typeof selector) return selector;
                context = context || document;
                var fl = selector.substring(0, 1);
                if ("#" === fl) return context.querySelector(selector); else return context.querySelectorAll(selector);
            };
            lgQuery.prototype._each = function(func) {
                if (!this.selector) return this;
                if (void 0 !== this.selector.length) [].forEach.call(this.selector, func); else func(this.selector, 0);
                return this;
            };
            lgQuery.prototype._setCssVendorPrefix = function(el, cssProperty, value) {
                var property = cssProperty.replace(/-([a-z])/gi, (function(s, group1) {
                    return group1.toUpperCase();
                }));
                if (-1 !== this.cssVenderPrefixes.indexOf(property)) {
                    el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
                    el.style["webkit" + property] = value;
                    el.style["moz" + property] = value;
                    el.style["ms" + property] = value;
                    el.style["o" + property] = value;
                } else el.style[property] = value;
            };
            lgQuery.prototype._getFirstEl = function() {
                if (this.selector && void 0 !== this.selector.length) return this.selector[0]; else return this.selector;
            };
            lgQuery.prototype.isEventMatched = function(event, eventName) {
                var eventNamespace = eventName.split(".");
                return event.split(".").filter((function(e) {
                    return e;
                })).every((function(e) {
                    return -1 !== eventNamespace.indexOf(e);
                }));
            };
            lgQuery.prototype.attr = function(attr, value) {
                if (void 0 === value) {
                    if (!this.firstElement) return "";
                    return this.firstElement.getAttribute(attr);
                }
                this._each((function(el) {
                    el.setAttribute(attr, value);
                }));
                return this;
            };
            lgQuery.prototype.find = function(selector) {
                return $LG(this._getSelector(selector, this.selector));
            };
            lgQuery.prototype.first = function() {
                if (this.selector && void 0 !== this.selector.length) return $LG(this.selector[0]); else return $LG(this.selector);
            };
            lgQuery.prototype.eq = function(index) {
                return $LG(this.selector[index]);
            };
            lgQuery.prototype.parent = function() {
                return $LG(this.selector.parentElement);
            };
            lgQuery.prototype.get = function() {
                return this._getFirstEl();
            };
            lgQuery.prototype.removeAttr = function(attributes) {
                var attrs = attributes.split(" ");
                this._each((function(el) {
                    attrs.forEach((function(attr) {
                        return el.removeAttribute(attr);
                    }));
                }));
                return this;
            };
            lgQuery.prototype.wrap = function(className) {
                if (!this.firstElement) return this;
                var wrapper = document.createElement("div");
                wrapper.className = className;
                this.firstElement.parentNode.insertBefore(wrapper, this.firstElement);
                this.firstElement.parentNode.removeChild(this.firstElement);
                wrapper.appendChild(this.firstElement);
                return this;
            };
            lgQuery.prototype.addClass = function(classNames) {
                if (void 0 === classNames) classNames = "";
                this._each((function(el) {
                    classNames.split(" ").forEach((function(className) {
                        if (className) el.classList.add(className);
                    }));
                }));
                return this;
            };
            lgQuery.prototype.removeClass = function(classNames) {
                this._each((function(el) {
                    classNames.split(" ").forEach((function(className) {
                        if (className) el.classList.remove(className);
                    }));
                }));
                return this;
            };
            lgQuery.prototype.hasClass = function(className) {
                if (!this.firstElement) return false;
                return this.firstElement.classList.contains(className);
            };
            lgQuery.prototype.hasAttribute = function(attribute) {
                if (!this.firstElement) return false;
                return this.firstElement.hasAttribute(attribute);
            };
            lgQuery.prototype.toggleClass = function(className) {
                if (!this.firstElement) return this;
                if (this.hasClass(className)) this.removeClass(className); else this.addClass(className);
                return this;
            };
            lgQuery.prototype.css = function(property, value) {
                var _this = this;
                this._each((function(el) {
                    _this._setCssVendorPrefix(el, property, value);
                }));
                return this;
            };
            lgQuery.prototype.on = function(events, listener) {
                var _this = this;
                if (!this.selector) return this;
                events.split(" ").forEach((function(event) {
                    if (!Array.isArray(lgQuery.eventListeners[event])) lgQuery.eventListeners[event] = [];
                    lgQuery.eventListeners[event].push(listener);
                    _this.selector.addEventListener(event.split(".")[0], listener);
                }));
                return this;
            };
            lgQuery.prototype.once = function(event, listener) {
                var _this = this;
                this.on(event, (function() {
                    _this.off(event);
                    listener(event);
                }));
                return this;
            };
            lgQuery.prototype.off = function(event) {
                var _this = this;
                if (!this.selector) return this;
                Object.keys(lgQuery.eventListeners).forEach((function(eventName) {
                    if (_this.isEventMatched(event, eventName)) {
                        lgQuery.eventListeners[eventName].forEach((function(listener) {
                            _this.selector.removeEventListener(eventName.split(".")[0], listener);
                        }));
                        lgQuery.eventListeners[eventName] = [];
                    }
                }));
                return this;
            };
            lgQuery.prototype.trigger = function(event, detail) {
                if (!this.firstElement) return this;
                var customEvent = new CustomEvent(event.split(".")[0], {
                    detail: detail || null
                });
                this.firstElement.dispatchEvent(customEvent);
                return this;
            };
            lgQuery.prototype.load = function(url) {
                var _this = this;
                fetch(url).then((function(res) {
                    return res.text();
                })).then((function(html) {
                    _this.selector.innerHTML = html;
                }));
                return this;
            };
            lgQuery.prototype.html = function(html) {
                if (void 0 === html) {
                    if (!this.firstElement) return "";
                    return this.firstElement.innerHTML;
                }
                this._each((function(el) {
                    el.innerHTML = html;
                }));
                return this;
            };
            lgQuery.prototype.append = function(html) {
                this._each((function(el) {
                    if ("string" === typeof html) el.insertAdjacentHTML("beforeend", html); else el.appendChild(html);
                }));
                return this;
            };
            lgQuery.prototype.prepend = function(html) {
                this._each((function(el) {
                    el.insertAdjacentHTML("afterbegin", html);
                }));
                return this;
            };
            lgQuery.prototype.remove = function() {
                this._each((function(el) {
                    el.parentNode.removeChild(el);
                }));
                return this;
            };
            lgQuery.prototype.empty = function() {
                this._each((function(el) {
                    el.innerHTML = "";
                }));
                return this;
            };
            lgQuery.prototype.scrollTop = function(scrollTop) {
                if (void 0 !== scrollTop) {
                    document.body.scrollTop = scrollTop;
                    document.documentElement.scrollTop = scrollTop;
                    return this;
                } else return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            };
            lgQuery.prototype.scrollLeft = function(scrollLeft) {
                if (void 0 !== scrollLeft) {
                    document.body.scrollLeft = scrollLeft;
                    document.documentElement.scrollLeft = scrollLeft;
                    return this;
                } else return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
            };
            lgQuery.prototype.offset = function() {
                if (!this.firstElement) return {
                    left: 0,
                    top: 0
                };
                var rect = this.firstElement.getBoundingClientRect();
                var bodyMarginLeft = $LG("body").style().marginLeft;
                return {
                    left: rect.left - parseFloat(bodyMarginLeft) + this.scrollLeft(),
                    top: rect.top + this.scrollTop()
                };
            };
            lgQuery.prototype.style = function() {
                if (!this.firstElement) return {};
                return this.firstElement.currentStyle || window.getComputedStyle(this.firstElement);
            };
            lgQuery.prototype.width = function() {
                var style = this.style();
                return this.firstElement.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
            };
            lgQuery.prototype.height = function() {
                var style = this.style();
                return this.firstElement.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
            };
            lgQuery.eventListeners = {};
            return lgQuery;
        }();
        function $LG(selector) {
            initLgPolyfills();
            return new lgQuery(selector);
        }
        var defaultDynamicOptions = [ "src", "sources", "subHtml", "subHtmlUrl", "html", "video", "poster", "slideName", "responsive", "srcset", "sizes", "iframe", "downloadUrl", "download", "width", "facebookShareUrl", "tweetText", "iframeTitle", "twitterShareUrl", "pinterestShareUrl", "pinterestText", "fbHtml", "disqusIdentifier", "disqusUrl" ];
        function convertToData(attr) {
            if ("href" === attr) return "src";
            attr = attr.replace("data-", "");
            attr = attr.charAt(0).toLowerCase() + attr.slice(1);
            attr = attr.replace(/-([a-z])/g, (function(g) {
                return g[1].toUpperCase();
            }));
            return attr;
        }
        var utils = {
            getSize: function(el, container, spacing, defaultLgSize) {
                if (void 0 === spacing) spacing = 0;
                var LGel = $LG(el);
                var lgSize = LGel.attr("data-lg-size") || defaultLgSize;
                if (!lgSize) return;
                var isResponsiveSizes = lgSize.split(",");
                if (isResponsiveSizes[1]) {
                    var wWidth = window.innerWidth;
                    for (var i = 0; i < isResponsiveSizes.length; i++) {
                        var size_1 = isResponsiveSizes[i];
                        var responsiveWidth = parseInt(size_1.split("-")[2], 10);
                        if (responsiveWidth > wWidth) {
                            lgSize = size_1;
                            break;
                        }
                        if (i === isResponsiveSizes.length - 1) lgSize = size_1;
                    }
                }
                var size = lgSize.split("-");
                var width = parseInt(size[0], 10);
                var height = parseInt(size[1], 10);
                var cWidth = container.width();
                var cHeight = container.height() - spacing;
                var maxWidth = Math.min(cWidth, width);
                var maxHeight = Math.min(cHeight, height);
                var ratio = Math.min(maxWidth / width, maxHeight / height);
                return {
                    width: width * ratio,
                    height: height * ratio
                };
            },
            getTransform: function(el, container, top, bottom, imageSize) {
                if (!imageSize) return;
                var LGel = $LG(el).find("img").first();
                if (!LGel.get()) return;
                var containerRect = container.get().getBoundingClientRect();
                var wWidth = containerRect.width;
                var wHeight = container.height() - (top + bottom);
                var elWidth = LGel.width();
                var elHeight = LGel.height();
                var elStyle = LGel.style();
                var x = (wWidth - elWidth) / 2 - LGel.offset().left + (parseFloat(elStyle.paddingLeft) || 0) + (parseFloat(elStyle.borderLeft) || 0) + $LG(window).scrollLeft() + containerRect.left;
                var y = (wHeight - elHeight) / 2 - LGel.offset().top + (parseFloat(elStyle.paddingTop) || 0) + (parseFloat(elStyle.borderTop) || 0) + $LG(window).scrollTop() + top;
                var scX = elWidth / imageSize.width;
                var scY = elHeight / imageSize.height;
                var transform = "translate3d(" + (x *= -1) + "px, " + (y *= -1) + "px, 0) scale3d(" + scX + ", " + scY + ", 1)";
                return transform;
            },
            getIframeMarkup: function(iframeWidth, iframeHeight, iframeMaxWidth, iframeMaxHeight, src, iframeTitle) {
                var title = iframeTitle ? 'title="' + iframeTitle + '"' : "";
                return '<div class="lg-video-cont lg-has-iframe" style="width:' + iframeWidth + "; max-width:" + iframeMaxWidth + "; height: " + iframeHeight + "; max-height:" + iframeMaxHeight + '">\n                    <iframe class="lg-object" frameborder="0" ' + title + ' src="' + src + '"  allowfullscreen="true"></iframe>\n                </div>';
            },
            getImgMarkup: function(index, src, altAttr, srcset, sizes, sources) {
                var srcsetAttr = srcset ? 'srcset="' + srcset + '"' : "";
                var sizesAttr = sizes ? 'sizes="' + sizes + '"' : "";
                var imgMarkup = "<img " + altAttr + " " + srcsetAttr + "  " + sizesAttr + ' class="lg-object lg-image" data-index="' + index + '" src="' + src + '" />';
                var sourceTag = "";
                if (sources) {
                    var sourceObj = "string" === typeof sources ? JSON.parse(sources) : sources;
                    sourceTag = sourceObj.map((function(source) {
                        var attrs = "";
                        Object.keys(source).forEach((function(key) {
                            attrs += " " + key + '="' + source[key] + '"';
                        }));
                        return "<source " + attrs + "></source>";
                    }));
                }
                return "" + sourceTag + imgMarkup;
            },
            getResponsiveSrc: function(srcItms) {
                var rsWidth = [];
                var rsSrc = [];
                var src = "";
                for (var i = 0; i < srcItms.length; i++) {
                    var _src = srcItms[i].split(" ");
                    if ("" === _src[0]) _src.splice(0, 1);
                    rsSrc.push(_src[0]);
                    rsWidth.push(_src[1]);
                }
                var wWidth = window.innerWidth;
                for (var j = 0; j < rsWidth.length; j++) if (parseInt(rsWidth[j], 10) > wWidth) {
                    src = rsSrc[j];
                    break;
                }
                return src;
            },
            isImageLoaded: function(img) {
                if (!img) return false;
                if (!img.complete) return false;
                if (0 === img.naturalWidth) return false;
                return true;
            },
            getVideoPosterMarkup: function(_poster, dummyImg, videoContStyle, playVideoString, _isVideo) {
                var videoClass = "";
                if (_isVideo && _isVideo.youtube) videoClass = "lg-has-youtube"; else if (_isVideo && _isVideo.vimeo) videoClass = "lg-has-vimeo"; else videoClass = "lg-has-html5";
                return '<div class="lg-video-cont ' + videoClass + '" style="' + videoContStyle + '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' + playVideoString + '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' + playVideoString + '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' + (dummyImg || "") + '\n            <img class="lg-object lg-video-poster" src="' + _poster + '" />\n        </div>';
            },
            getFocusableElements: function(container) {
                var elements = container.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
                var visibleElements = [].filter.call(elements, (function(element) {
                    var style = window.getComputedStyle(element);
                    return "none" !== style.display && "hidden" !== style.visibility;
                }));
                return visibleElements;
            },
            getDynamicOptions: function(items, extraProps, getCaptionFromTitleOrAlt, exThumbImage) {
                var dynamicElements = [];
                var availableDynamicOptions = __spreadArrays(defaultDynamicOptions, extraProps);
                [].forEach.call(items, (function(item) {
                    var dynamicEl = {};
                    for (var i = 0; i < item.attributes.length; i++) {
                        var attr = item.attributes[i];
                        if (attr.specified) {
                            var dynamicAttr = convertToData(attr.name);
                            var label = "";
                            if (availableDynamicOptions.indexOf(dynamicAttr) > -1) label = dynamicAttr;
                            if (label) dynamicEl[label] = attr.value;
                        }
                    }
                    var currentItem = $LG(item);
                    var alt = currentItem.find("img").first().attr("alt");
                    var title = currentItem.attr("title");
                    var thumb = exThumbImage ? currentItem.attr(exThumbImage) : currentItem.find("img").first().attr("src");
                    dynamicEl.thumb = thumb;
                    if (getCaptionFromTitleOrAlt && !dynamicEl.subHtml) dynamicEl.subHtml = title || alt || "";
                    dynamicEl.alt = alt || title || "";
                    dynamicElements.push(dynamicEl);
                }));
                return dynamicElements;
            },
            isMobile: function() {
                return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            },
            isVideo: function(src, isHTML5VIdeo, index) {
                if (!src) if (isHTML5VIdeo) return {
                    html5: true
                }; else {
                    console.error("lightGallery :- data-src is not provided on slide item " + (index + 1) + ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/");
                    return;
                }
                var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i);
                var vimeo = src.match(/\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i);
                var wistia = src.match(/https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/);
                if (youtube) return {
                    youtube
                }; else if (vimeo) return {
                    vimeo
                }; else if (wistia) return {
                    wistia
                };
            }
        };
        var lgId = 0;
        var LightGallery = function() {
            function LightGallery(element, options) {
                this.lgOpened = false;
                this.index = 0;
                this.plugins = [];
                this.lGalleryOn = false;
                this.lgBusy = false;
                this.currentItemsInDom = [];
                this.prevScrollTop = 0;
                this.bodyPaddingRight = 0;
                this.isDummyImageRemoved = false;
                this.dragOrSwipeEnabled = false;
                this.mediaContainerPosition = {
                    top: 0,
                    bottom: 0
                };
                if (!element) return this;
                lgId++;
                this.lgId = lgId;
                this.el = element;
                this.LGel = $LG(element);
                this.generateSettings(options);
                this.buildModules();
                if (this.settings.dynamic && void 0 !== this.settings.dynamicEl && !Array.isArray(this.settings.dynamicEl)) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
                this.galleryItems = this.getItems();
                this.normalizeSettings();
                this.init();
                this.validateLicense();
                return this;
            }
            LightGallery.prototype.generateSettings = function(options) {
                this.settings = __assign(__assign({}, lightGalleryCoreSettings), options);
                if (this.settings.isMobile && "function" === typeof this.settings.isMobile ? this.settings.isMobile() : utils.isMobile()) {
                    var mobileSettings = __assign(__assign({}, this.settings.mobileSettings), this.settings.mobileSettings);
                    this.settings = __assign(__assign({}, this.settings), mobileSettings);
                }
            };
            LightGallery.prototype.normalizeSettings = function() {
                if (this.settings.slideEndAnimation) this.settings.hideControlOnEnd = false;
                if (!this.settings.closable) this.settings.swipeToClose = false;
                this.zoomFromOrigin = this.settings.zoomFromOrigin;
                if (this.settings.dynamic) this.zoomFromOrigin = false;
                if (!this.settings.container) this.settings.container = document.body;
                this.settings.preload = Math.min(this.settings.preload, this.galleryItems.length);
            };
            LightGallery.prototype.init = function() {
                var _this = this;
                this.addSlideVideoInfo(this.galleryItems);
                this.buildStructure();
                this.LGel.trigger(lGEvents.init, {
                    instance: this
                });
                if (this.settings.keyPress) this.keyPress();
                setTimeout((function() {
                    _this.enableDrag();
                    _this.enableSwipe();
                    _this.triggerPosterClick();
                }), 50);
                this.arrow();
                if (this.settings.mousewheel) this.mousewheel();
                if (!this.settings.dynamic) this.openGalleryOnItemClick();
            };
            LightGallery.prototype.openGalleryOnItemClick = function() {
                var _this = this;
                var _loop_1 = function(index) {
                    var element = this_1.items[index];
                    var $element = $LG(element);
                    var uuid = lgQuery.generateUUID();
                    $element.attr("data-lg-id", uuid).on("click.lgcustom-item-" + uuid, (function(e) {
                        e.preventDefault();
                        var currentItemIndex = _this.settings.index || index;
                        _this.openGallery(currentItemIndex, element);
                    }));
                };
                var this_1 = this;
                for (var index = 0; index < this.items.length; index++) _loop_1(index);
            };
            LightGallery.prototype.buildModules = function() {
                var _this = this;
                this.settings.plugins.forEach((function(plugin) {
                    _this.plugins.push(new plugin(_this, $LG));
                }));
            };
            LightGallery.prototype.validateLicense = function() {
                if (!this.settings.licenseKey) console.error("Please provide a valid license key"); else if ("0000-0000-000-0000" === this.settings.licenseKey) console.warn("lightGallery: " + this.settings.licenseKey + " license key is not valid for production use");
            };
            LightGallery.prototype.getSlideItem = function(index) {
                return $LG(this.getSlideItemId(index));
            };
            LightGallery.prototype.getSlideItemId = function(index) {
                return "#lg-item-" + this.lgId + "-" + index;
            };
            LightGallery.prototype.getIdName = function(id) {
                return id + "-" + this.lgId;
            };
            LightGallery.prototype.getElementById = function(id) {
                return $LG("#" + this.getIdName(id));
            };
            LightGallery.prototype.manageSingleSlideClassName = function() {
                if (this.galleryItems.length < 2) this.outer.addClass("lg-single-item"); else this.outer.removeClass("lg-single-item");
            };
            LightGallery.prototype.buildStructure = function() {
                var _this = this;
                var container = this.$container && this.$container.get();
                if (container) return;
                var controls = "";
                var subHtmlCont = "";
                if (this.settings.controls) controls = '<button type="button" id="' + this.getIdName("lg-prev") + '" aria-label="' + this.settings.strings["previousSlide"] + '" class="lg-prev lg-icon"> ' + this.settings.prevHtml + ' </button>\n                <button type="button" id="' + this.getIdName("lg-next") + '" aria-label="' + this.settings.strings["nextSlide"] + '" class="lg-next lg-icon"> ' + this.settings.nextHtml + " </button>";
                if (".lg-item" !== this.settings.appendSubHtmlTo) subHtmlCont = '<div class="lg-sub-html" role="status" aria-live="polite"></div>';
                var addClasses = "";
                if (this.settings.allowMediaOverlap) addClasses += "lg-media-overlap ";
                var ariaLabelledby = this.settings.ariaLabelledby ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"' : "";
                var ariaDescribedby = this.settings.ariaDescribedby ? 'aria-describedby="' + this.settings.ariaDescribedby + '"' : "";
                var containerClassName = "lg-container " + this.settings.addClass + " " + (document.body !== this.settings.container ? "lg-inline" : "");
                var closeIcon = this.settings.closable && this.settings.showCloseIcon ? '<button type="button" aria-label="' + this.settings.strings["closeGallery"] + '" id="' + this.getIdName("lg-close") + '" class="lg-close lg-icon"></button>' : "";
                var maximizeIcon = this.settings.showMaximizeIcon ? '<button type="button" aria-label="' + this.settings.strings["toggleMaximize"] + '" id="' + this.getIdName("lg-maximize") + '" class="lg-maximize lg-icon"></button>' : "";
                var template = '\n        <div class="' + containerClassName + '" id="' + this.getIdName("lg-container") + '" tabindex="-1" aria-modal="true" ' + ariaLabelledby + " " + ariaDescribedby + ' role="dialog"\n        >\n            <div id="' + this.getIdName("lg-backdrop") + '" class="lg-backdrop"></div>\n\n            <div id="' + this.getIdName("lg-outer") + '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' + addClasses + ' ">\n\n              <div id="' + this.getIdName("lg-content") + '" class="lg-content">\n                <div id="' + this.getIdName("lg-inner") + '" class="lg-inner">\n                </div>\n                ' + controls + '\n              </div>\n                <div id="' + this.getIdName("lg-toolbar") + '" class="lg-toolbar lg-group">\n                    ' + maximizeIcon + "\n                    " + closeIcon + "\n                    </div>\n                    " + (".lg-outer" === this.settings.appendSubHtmlTo ? subHtmlCont : "") + '\n                <div id="' + this.getIdName("lg-components") + '" class="lg-components">\n                    ' + (".lg-sub-html" === this.settings.appendSubHtmlTo ? subHtmlCont : "") + "\n                </div>\n            </div>\n        </div>\n        ";
                $LG(this.settings.container).append(template);
                if (document.body !== this.settings.container) $LG(this.settings.container).css("position", "relative");
                this.outer = this.getElementById("lg-outer");
                this.$lgComponents = this.getElementById("lg-components");
                this.$backdrop = this.getElementById("lg-backdrop");
                this.$container = this.getElementById("lg-container");
                this.$inner = this.getElementById("lg-inner");
                this.$content = this.getElementById("lg-content");
                this.$toolbar = this.getElementById("lg-toolbar");
                this.$backdrop.css("transition-duration", this.settings.backdropDuration + "ms");
                var outerClassNames = this.settings.mode + " ";
                this.manageSingleSlideClassName();
                if (this.settings.enableDrag) outerClassNames += "lg-grab ";
                this.outer.addClass(outerClassNames);
                this.$inner.css("transition-timing-function", this.settings.easing);
                this.$inner.css("transition-duration", this.settings.speed + "ms");
                if (this.settings.download) this.$toolbar.append('<a id="' + this.getIdName("lg-download") + '" target="_blank" rel="noopener" aria-label="' + this.settings.strings["download"] + '" download class="lg-download lg-icon"></a>');
                this.counter();
                $LG(window).on("resize.lg.global" + this.lgId + " orientationchange.lg.global" + this.lgId, (function() {
                    _this.refreshOnResize();
                }));
                this.hideBars();
                this.manageCloseGallery();
                this.toggleMaximize();
                this.initModules();
            };
            LightGallery.prototype.refreshOnResize = function() {
                if (this.lgOpened) {
                    var currentGalleryItem = this.galleryItems[this.index];
                    var __slideVideoInfo = currentGalleryItem.__slideVideoInfo;
                    this.mediaContainerPosition = this.getMediaContainerPosition();
                    var _a = this.mediaContainerPosition, top_1 = _a.top, bottom = _a.bottom;
                    this.currentImageSize = utils.getSize(this.items[this.index], this.outer, top_1 + bottom, __slideVideoInfo && this.settings.videoMaxSize);
                    if (__slideVideoInfo) this.resizeVideoSlide(this.index, this.currentImageSize);
                    if (this.zoomFromOrigin && !this.isDummyImageRemoved) {
                        var imgStyle = this.getDummyImgStyles(this.currentImageSize);
                        this.outer.find(".lg-current .lg-dummy-img").first().attr("style", imgStyle);
                    }
                    this.LGel.trigger(lGEvents.containerResize);
                }
            };
            LightGallery.prototype.resizeVideoSlide = function(index, imageSize) {
                var lgVideoStyle = this.getVideoContStyle(imageSize);
                var currentSlide = this.getSlideItem(index);
                currentSlide.find(".lg-video-cont").attr("style", lgVideoStyle);
            };
            LightGallery.prototype.updateSlides = function(items, index) {
                if (this.index > items.length - 1) this.index = items.length - 1;
                if (1 === items.length) this.index = 0;
                if (!items.length) {
                    this.closeGallery();
                    return;
                }
                var currentSrc = this.galleryItems[index].src;
                this.galleryItems = items;
                this.updateControls();
                this.$inner.empty();
                this.currentItemsInDom = [];
                var _index = 0;
                this.galleryItems.some((function(galleryItem, itemIndex) {
                    if (galleryItem.src === currentSrc) {
                        _index = itemIndex;
                        return true;
                    }
                    return false;
                }));
                this.currentItemsInDom = this.organizeSlideItems(_index, -1);
                this.loadContent(_index, true);
                this.getSlideItem(_index).addClass("lg-current");
                this.index = _index;
                this.updateCurrentCounter(_index);
                this.LGel.trigger(lGEvents.updateSlides);
            };
            LightGallery.prototype.getItems = function() {
                this.items = [];
                if (!this.settings.dynamic) {
                    if ("this" === this.settings.selector) this.items.push(this.el); else if (this.settings.selector) if ("string" === typeof this.settings.selector) if (this.settings.selectWithin) {
                        var selectWithin = $LG(this.settings.selectWithin);
                        this.items = selectWithin.find(this.settings.selector).get();
                    } else this.items = this.el.querySelectorAll(this.settings.selector); else this.items = this.settings.selector; else this.items = this.el.children;
                    return utils.getDynamicOptions(this.items, this.settings.extraProps, this.settings.getCaptionFromTitleOrAlt, this.settings.exThumbImage);
                } else return this.settings.dynamicEl || [];
            };
            LightGallery.prototype.shouldHideScrollbar = function() {
                return this.settings.hideScrollbar && document.body === this.settings.container;
            };
            LightGallery.prototype.hideScrollbar = function() {
                if (!this.shouldHideScrollbar()) return;
                this.bodyPaddingRight = parseFloat($LG("body").style().paddingRight);
                var bodyRect = document.documentElement.getBoundingClientRect();
                var scrollbarWidth = window.innerWidth - bodyRect.width;
                $LG(document.body).css("padding-right", scrollbarWidth + this.bodyPaddingRight + "px");
                $LG(document.body).addClass("lg-overlay-open");
            };
            LightGallery.prototype.resetScrollBar = function() {
                if (!this.shouldHideScrollbar()) return;
                $LG(document.body).css("padding-right", this.bodyPaddingRight + "px");
                $LG(document.body).removeClass("lg-overlay-open");
            };
            LightGallery.prototype.openGallery = function(index, element) {
                var _this = this;
                if (void 0 === index) index = this.settings.index;
                if (this.lgOpened) return;
                this.lgOpened = true;
                this.outer.removeClass("lg-hide-items");
                this.hideScrollbar();
                this.$container.addClass("lg-show");
                var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, index);
                this.currentItemsInDom = itemsToBeInsertedToDom;
                var items = "";
                itemsToBeInsertedToDom.forEach((function(item) {
                    items = items + '<div id="' + item + '" class="lg-item"></div>';
                }));
                this.$inner.append(items);
                this.addHtml(index);
                var transform = "";
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var _a = this.mediaContainerPosition, top = _a.top, bottom = _a.bottom;
                if (!this.settings.allowMediaOverlap) this.setMediaContainerPosition(top, bottom);
                var __slideVideoInfo = this.galleryItems[index].__slideVideoInfo;
                if (this.zoomFromOrigin && element) {
                    this.currentImageSize = utils.getSize(element, this.outer, top + bottom, __slideVideoInfo && this.settings.videoMaxSize);
                    transform = utils.getTransform(element, this.outer, top, bottom, this.currentImageSize);
                }
                if (!this.zoomFromOrigin || !transform) {
                    this.outer.addClass(this.settings.startClass);
                    this.getSlideItem(index).removeClass("lg-complete");
                }
                var timeout = this.settings.zoomFromOrigin ? 100 : this.settings.backdropDuration;
                setTimeout((function() {
                    _this.outer.addClass("lg-components-open");
                }), timeout);
                this.index = index;
                this.LGel.trigger(lGEvents.beforeOpen);
                this.getSlideItem(index).addClass("lg-current");
                this.lGalleryOn = false;
                this.prevScrollTop = $LG(window).scrollTop();
                setTimeout((function() {
                    if (_this.zoomFromOrigin && transform) {
                        var currentSlide_1 = _this.getSlideItem(index);
                        currentSlide_1.css("transform", transform);
                        setTimeout((function() {
                            currentSlide_1.addClass("lg-start-progress lg-start-end-progress").css("transition-duration", _this.settings.startAnimationDuration + "ms");
                            _this.outer.addClass("lg-zoom-from-image");
                        }));
                        setTimeout((function() {
                            currentSlide_1.css("transform", "translate3d(0, 0, 0)");
                        }), 100);
                    }
                    setTimeout((function() {
                        _this.$backdrop.addClass("in");
                        _this.$container.addClass("lg-show-in");
                    }), 10);
                    setTimeout((function() {
                        if (_this.settings.trapFocus && document.body === _this.settings.container) _this.trapFocus();
                    }), _this.settings.backdropDuration + 50);
                    if (!_this.zoomFromOrigin || !transform) setTimeout((function() {
                        _this.outer.addClass("lg-visible");
                    }), _this.settings.backdropDuration);
                    _this.slide(index, false, false, false);
                    _this.LGel.trigger(lGEvents.afterOpen);
                }));
                if (document.body === this.settings.container) $LG("html").addClass("lg-on");
            };
            LightGallery.prototype.getMediaContainerPosition = function() {
                if (this.settings.allowMediaOverlap) return {
                    top: 0,
                    bottom: 0
                };
                var top = this.$toolbar.get().clientHeight || 0;
                var subHtml = this.outer.find(".lg-components .lg-sub-html").get();
                var captionHeight = this.settings.defaultCaptionHeight || subHtml && subHtml.clientHeight || 0;
                var thumbContainer = this.outer.find(".lg-thumb-outer").get();
                var thumbHeight = thumbContainer ? thumbContainer.clientHeight : 0;
                var bottom = thumbHeight + captionHeight;
                return {
                    top,
                    bottom
                };
            };
            LightGallery.prototype.setMediaContainerPosition = function(top, bottom) {
                if (void 0 === top) top = 0;
                if (void 0 === bottom) bottom = 0;
                this.$content.css("top", top + "px").css("bottom", bottom + "px");
            };
            LightGallery.prototype.hideBars = function() {
                var _this = this;
                setTimeout((function() {
                    _this.outer.removeClass("lg-hide-items");
                    if (_this.settings.hideBarsDelay > 0) {
                        _this.outer.on("mousemove.lg click.lg touchstart.lg", (function() {
                            _this.outer.removeClass("lg-hide-items");
                            clearTimeout(_this.hideBarTimeout);
                            _this.hideBarTimeout = setTimeout((function() {
                                _this.outer.addClass("lg-hide-items");
                            }), _this.settings.hideBarsDelay);
                        }));
                        _this.outer.trigger("mousemove.lg");
                    }
                }), this.settings.showBarsAfter);
            };
            LightGallery.prototype.initPictureFill = function($img) {
                if (this.settings.supportLegacyBrowser) try {
                    picturefill({
                        elements: [ $img.get() ]
                    });
                } catch (e) {
                    console.warn("lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document.");
                }
            };
            LightGallery.prototype.counter = function() {
                if (this.settings.counter) {
                    var counterHtml = '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' + this.getIdName("lg-counter-current") + '" class="lg-counter-current">' + (this.index + 1) + ' </span> /\n                <span id="' + this.getIdName("lg-counter-all") + '" class="lg-counter-all">' + this.galleryItems.length + " </span></div>";
                    this.outer.find(this.settings.appendCounterTo).append(counterHtml);
                }
            };
            LightGallery.prototype.addHtml = function(index) {
                var subHtml;
                var subHtmlUrl;
                if (this.galleryItems[index].subHtmlUrl) subHtmlUrl = this.galleryItems[index].subHtmlUrl; else subHtml = this.galleryItems[index].subHtml;
                if (!subHtmlUrl) if (subHtml) {
                    var fL = subHtml.substring(0, 1);
                    if ("." === fL || "#" === fL) if (this.settings.subHtmlSelectorRelative && !this.settings.dynamic) subHtml = $LG(this.items).eq(index).find(subHtml).first().html(); else subHtml = $LG(subHtml).first().html();
                } else subHtml = "";
                if (".lg-item" !== this.settings.appendSubHtmlTo) if (subHtmlUrl) this.outer.find(".lg-sub-html").load(subHtmlUrl); else this.outer.find(".lg-sub-html").html(subHtml); else {
                    var currentSlide = $LG(this.getSlideItemId(index));
                    if (subHtmlUrl) currentSlide.load(subHtmlUrl); else currentSlide.append('<div class="lg-sub-html">' + subHtml + "</div>");
                }
                if ("undefined" !== typeof subHtml && null !== subHtml) if ("" === subHtml) this.outer.find(this.settings.appendSubHtmlTo).addClass("lg-empty-html"); else this.outer.find(this.settings.appendSubHtmlTo).removeClass("lg-empty-html");
                this.LGel.trigger(lGEvents.afterAppendSubHtml, {
                    index
                });
            };
            LightGallery.prototype.preload = function(index) {
                for (var i = 1; i <= this.settings.preload; i++) {
                    if (i >= this.galleryItems.length - index) break;
                    this.loadContent(index + i, false);
                }
                for (var j = 1; j <= this.settings.preload; j++) {
                    if (index - j < 0) break;
                    this.loadContent(index - j, false);
                }
            };
            LightGallery.prototype.getDummyImgStyles = function(imageSize) {
                if (!imageSize) return "";
                return "width:" + imageSize.width + "px;\n                margin-left: -" + imageSize.width / 2 + "px;\n                margin-top: -" + imageSize.height / 2 + "px;\n                height:" + imageSize.height + "px";
            };
            LightGallery.prototype.getVideoContStyle = function(imageSize) {
                if (!imageSize) return "";
                return "width:" + imageSize.width + "px;\n                height:" + imageSize.height + "px";
            };
            LightGallery.prototype.getDummyImageContent = function($currentSlide, index, alt) {
                var $currentItem;
                if (!this.settings.dynamic) $currentItem = $LG(this.items).eq(index);
                if ($currentItem) {
                    var _dummyImgSrc = void 0;
                    if (!this.settings.exThumbImage) _dummyImgSrc = $currentItem.find("img").first().attr("src"); else _dummyImgSrc = $currentItem.attr(this.settings.exThumbImage);
                    if (!_dummyImgSrc) return "";
                    var imgStyle = this.getDummyImgStyles(this.currentImageSize);
                    var dummyImgContent = "<img " + alt + ' style="' + imgStyle + '" class="lg-dummy-img" src="' + _dummyImgSrc + '" />';
                    $currentSlide.addClass("lg-first-slide");
                    this.outer.addClass("lg-first-slide-loading");
                    return dummyImgContent;
                }
                return "";
            };
            LightGallery.prototype.setImgMarkup = function(src, $currentSlide, index) {
                var currentGalleryItem = this.galleryItems[index];
                var alt = currentGalleryItem.alt, srcset = currentGalleryItem.srcset, sizes = currentGalleryItem.sizes, sources = currentGalleryItem.sources;
                var imgContent = "";
                var altAttr = alt ? 'alt="' + alt + '"' : "";
                if (this.isFirstSlideWithZoomAnimation()) imgContent = this.getDummyImageContent($currentSlide, index, altAttr); else imgContent = utils.getImgMarkup(index, src, altAttr, srcset, sizes, sources);
                var imgMarkup = '<picture class="lg-img-wrap"> ' + imgContent + "</picture>";
                $currentSlide.prepend(imgMarkup);
            };
            LightGallery.prototype.onSlideObjectLoad = function($slide, isHTML5VideoWithoutPoster, onLoad, onError) {
                var mediaObject = $slide.find(".lg-object").first();
                if (utils.isImageLoaded(mediaObject.get()) || isHTML5VideoWithoutPoster) onLoad(); else {
                    mediaObject.on("load.lg error.lg", (function() {
                        onLoad && onLoad();
                    }));
                    mediaObject.on("error.lg", (function() {
                        onError && onError();
                    }));
                }
            };
            LightGallery.prototype.onLgObjectLoad = function(currentSlide, index, delay, speed, isFirstSlide, isHTML5VideoWithoutPoster) {
                var _this = this;
                this.onSlideObjectLoad(currentSlide, isHTML5VideoWithoutPoster, (function() {
                    _this.triggerSlideItemLoad(currentSlide, index, delay, speed, isFirstSlide);
                }), (function() {
                    currentSlide.addClass("lg-complete lg-complete_");
                    currentSlide.html('<span class="lg-error-msg">Oops... Failed to load content...</span>');
                }));
            };
            LightGallery.prototype.triggerSlideItemLoad = function($currentSlide, index, delay, speed, isFirstSlide) {
                var _this = this;
                var currentGalleryItem = this.galleryItems[index];
                var _speed = isFirstSlide && "video" === this.getSlideType(currentGalleryItem) && !currentGalleryItem.poster ? speed : 0;
                setTimeout((function() {
                    $currentSlide.addClass("lg-complete lg-complete_");
                    _this.LGel.trigger(lGEvents.slideItemLoad, {
                        index,
                        delay: delay || 0,
                        isFirstSlide
                    });
                }), _speed);
            };
            LightGallery.prototype.isFirstSlideWithZoomAnimation = function() {
                return !!(!this.lGalleryOn && this.zoomFromOrigin && this.currentImageSize);
            };
            LightGallery.prototype.addSlideVideoInfo = function(items) {
                var _this = this;
                items.forEach((function(element, index) {
                    element.__slideVideoInfo = utils.isVideo(element.src, !!element.video, index);
                    if (element.__slideVideoInfo && _this.settings.loadYouTubePoster && !element.poster && element.__slideVideoInfo.youtube) element.poster = "//img.youtube.com/vi/" + element.__slideVideoInfo.youtube[1] + "/maxresdefault.jpg";
                }));
            };
            LightGallery.prototype.loadContent = function(index, rec) {
                var _this = this;
                var currentGalleryItem = this.galleryItems[index];
                var $currentSlide = $LG(this.getSlideItemId(index));
                var poster = currentGalleryItem.poster, srcset = currentGalleryItem.srcset, sizes = currentGalleryItem.sizes, sources = currentGalleryItem.sources;
                var src = currentGalleryItem.src;
                var video = currentGalleryItem.video;
                var _html5Video = video && "string" === typeof video ? JSON.parse(video) : video;
                if (currentGalleryItem.responsive) {
                    var srcDyItms = currentGalleryItem.responsive.split(",");
                    src = utils.getResponsiveSrc(srcDyItms) || src;
                }
                var videoInfo = currentGalleryItem.__slideVideoInfo;
                var lgVideoStyle = "";
                var iframe = !!currentGalleryItem.iframe;
                var isFirstSlide = !this.lGalleryOn;
                var delay = 0;
                if (isFirstSlide) if (this.zoomFromOrigin && this.currentImageSize) delay = this.settings.startAnimationDuration + 10; else delay = this.settings.backdropDuration + 10;
                if (!$currentSlide.hasClass("lg-loaded")) {
                    if (videoInfo) {
                        var _a = this.mediaContainerPosition, top_2 = _a.top, bottom = _a.bottom;
                        var videoSize = utils.getSize(this.items[index], this.outer, top_2 + bottom, videoInfo && this.settings.videoMaxSize);
                        lgVideoStyle = this.getVideoContStyle(videoSize);
                    }
                    if (iframe) {
                        var markup = utils.getIframeMarkup(this.settings.iframeWidth, this.settings.iframeHeight, this.settings.iframeMaxWidth, this.settings.iframeMaxHeight, src, currentGalleryItem.iframeTitle);
                        $currentSlide.prepend(markup);
                    } else if (poster) {
                        var dummyImg = "";
                        var hasStartAnimation = isFirstSlide && this.zoomFromOrigin && this.currentImageSize;
                        if (hasStartAnimation) dummyImg = this.getDummyImageContent($currentSlide, index, "");
                        markup = utils.getVideoPosterMarkup(poster, dummyImg || "", lgVideoStyle, this.settings.strings["playVideo"], videoInfo);
                        $currentSlide.prepend(markup);
                    } else if (videoInfo) {
                        markup = '<div class="lg-video-cont " style="' + lgVideoStyle + '"></div>';
                        $currentSlide.prepend(markup);
                    } else {
                        this.setImgMarkup(src, $currentSlide, index);
                        if (srcset || sources) {
                            var $img = $currentSlide.find(".lg-object");
                            this.initPictureFill($img);
                        }
                    }
                    if (poster || videoInfo) this.LGel.trigger(lGEvents.hasVideo, {
                        index,
                        src,
                        html5Video: _html5Video,
                        hasPoster: !!poster
                    });
                    this.LGel.trigger(lGEvents.afterAppendSlide, {
                        index
                    });
                    if (this.lGalleryOn && ".lg-item" === this.settings.appendSubHtmlTo) this.addHtml(index);
                }
                var _speed = 0;
                if (delay && !$LG(document.body).hasClass("lg-from-hash")) _speed = delay;
                if (this.isFirstSlideWithZoomAnimation()) {
                    setTimeout((function() {
                        $currentSlide.removeClass("lg-start-end-progress lg-start-progress").removeAttr("style");
                    }), this.settings.startAnimationDuration + 100);
                    if (!$currentSlide.hasClass("lg-loaded")) setTimeout((function() {
                        if ("image" === _this.getSlideType(currentGalleryItem)) {
                            var alt = currentGalleryItem.alt;
                            var altAttr = alt ? 'alt="' + alt + '"' : "";
                            $currentSlide.find(".lg-img-wrap").append(utils.getImgMarkup(index, src, altAttr, srcset, sizes, currentGalleryItem.sources));
                            if (srcset || sources) {
                                var $img = $currentSlide.find(".lg-object");
                                _this.initPictureFill($img);
                            }
                        }
                        if ("image" === _this.getSlideType(currentGalleryItem) || "video" === _this.getSlideType(currentGalleryItem) && poster) {
                            _this.onLgObjectLoad($currentSlide, index, delay, _speed, true, false);
                            _this.onSlideObjectLoad($currentSlide, !!(videoInfo && videoInfo.html5 && !poster), (function() {
                                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
                            }), (function() {
                                _this.loadContentOnFirstSlideLoad(index, $currentSlide, _speed);
                            }));
                        }
                    }), this.settings.startAnimationDuration + 100);
                }
                $currentSlide.addClass("lg-loaded");
                if (!this.isFirstSlideWithZoomAnimation() || "video" === this.getSlideType(currentGalleryItem) && !poster) this.onLgObjectLoad($currentSlide, index, delay, _speed, isFirstSlide, !!(videoInfo && videoInfo.html5 && !poster));
                if ((!this.zoomFromOrigin || !this.currentImageSize) && $currentSlide.hasClass("lg-complete_") && !this.lGalleryOn) setTimeout((function() {
                    $currentSlide.addClass("lg-complete");
                }), this.settings.backdropDuration);
                this.lGalleryOn = true;
                if (true === rec) if (!$currentSlide.hasClass("lg-complete_")) $currentSlide.find(".lg-object").first().on("load.lg error.lg", (function() {
                    _this.preload(index);
                })); else this.preload(index);
            };
            LightGallery.prototype.loadContentOnFirstSlideLoad = function(index, $currentSlide, speed) {
                var _this = this;
                setTimeout((function() {
                    $currentSlide.find(".lg-dummy-img").remove();
                    $currentSlide.removeClass("lg-first-slide");
                    _this.outer.removeClass("lg-first-slide-loading");
                    _this.isDummyImageRemoved = true;
                    _this.preload(index);
                }), speed + 300);
            };
            LightGallery.prototype.getItemsToBeInsertedToDom = function(index, prevIndex, numberOfItems) {
                var _this = this;
                if (void 0 === numberOfItems) numberOfItems = 0;
                var itemsToBeInsertedToDom = [];
                var possibleNumberOfItems = Math.max(numberOfItems, 3);
                possibleNumberOfItems = Math.min(possibleNumberOfItems, this.galleryItems.length);
                var prevIndexItem = "lg-item-" + this.lgId + "-" + prevIndex;
                if (this.galleryItems.length <= 3) {
                    this.galleryItems.forEach((function(_element, index) {
                        itemsToBeInsertedToDom.push("lg-item-" + _this.lgId + "-" + index);
                    }));
                    return itemsToBeInsertedToDom;
                }
                if (index < (this.galleryItems.length - 1) / 2) {
                    for (var idx = index; idx > index - possibleNumberOfItems / 2 && idx >= 0; idx--) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
                    var numberOfExistingItems = itemsToBeInsertedToDom.length;
                    for (idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index + idx + 1));
                } else {
                    for (idx = index; idx <= this.galleryItems.length - 1 && idx < index + possibleNumberOfItems / 2; idx++) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + idx);
                    numberOfExistingItems = itemsToBeInsertedToDom.length;
                    for (idx = 0; idx < possibleNumberOfItems - numberOfExistingItems; idx++) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (index - idx - 1));
                }
                if (this.settings.loop) if (index === this.galleryItems.length - 1) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + 0); else if (0 === index) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + (this.galleryItems.length - 1));
                if (-1 === itemsToBeInsertedToDom.indexOf(prevIndexItem)) itemsToBeInsertedToDom.push("lg-item-" + this.lgId + "-" + prevIndex);
                return itemsToBeInsertedToDom;
            };
            LightGallery.prototype.organizeSlideItems = function(index, prevIndex) {
                var _this = this;
                var itemsToBeInsertedToDom = this.getItemsToBeInsertedToDom(index, prevIndex, this.settings.numberOfSlideItemsInDom);
                itemsToBeInsertedToDom.forEach((function(item) {
                    if (-1 === _this.currentItemsInDom.indexOf(item)) _this.$inner.append('<div id="' + item + '" class="lg-item"></div>');
                }));
                this.currentItemsInDom.forEach((function(item) {
                    if (-1 === itemsToBeInsertedToDom.indexOf(item)) $LG("#" + item).remove();
                }));
                return itemsToBeInsertedToDom;
            };
            LightGallery.prototype.getPreviousSlideIndex = function() {
                var prevIndex = 0;
                try {
                    var currentItemId = this.outer.find(".lg-current").first().attr("id");
                    prevIndex = parseInt(currentItemId.split("-")[3]) || 0;
                } catch (error) {
                    prevIndex = 0;
                }
                return prevIndex;
            };
            LightGallery.prototype.setDownloadValue = function(index) {
                if (this.settings.download) {
                    var currentGalleryItem = this.galleryItems[index];
                    var hideDownloadBtn = false === currentGalleryItem.downloadUrl || "false" === currentGalleryItem.downloadUrl;
                    if (hideDownloadBtn) this.outer.addClass("lg-hide-download"); else {
                        var $download = this.getElementById("lg-download");
                        this.outer.removeClass("lg-hide-download");
                        $download.attr("href", currentGalleryItem.downloadUrl || currentGalleryItem.src);
                        if (currentGalleryItem.download) $download.attr("download", currentGalleryItem.download);
                    }
                }
            };
            LightGallery.prototype.makeSlideAnimation = function(direction, currentSlideItem, previousSlideItem) {
                var _this = this;
                if (this.lGalleryOn) previousSlideItem.addClass("lg-slide-progress");
                setTimeout((function() {
                    _this.outer.addClass("lg-no-trans");
                    _this.outer.find(".lg-item").removeClass("lg-prev-slide lg-next-slide");
                    if ("prev" === direction) {
                        currentSlideItem.addClass("lg-prev-slide");
                        previousSlideItem.addClass("lg-next-slide");
                    } else {
                        currentSlideItem.addClass("lg-next-slide");
                        previousSlideItem.addClass("lg-prev-slide");
                    }
                    setTimeout((function() {
                        _this.outer.find(".lg-item").removeClass("lg-current");
                        currentSlideItem.addClass("lg-current");
                        _this.outer.removeClass("lg-no-trans");
                    }), 50);
                }), this.lGalleryOn ? this.settings.slideDelay : 0);
            };
            LightGallery.prototype.slide = function(index, fromTouch, fromThumb, direction) {
                var _this = this;
                var prevIndex = this.getPreviousSlideIndex();
                this.currentItemsInDom = this.organizeSlideItems(index, prevIndex);
                if (this.lGalleryOn && prevIndex === index) return;
                var numberOfGalleryItems = this.galleryItems.length;
                if (!this.lgBusy) {
                    if (this.settings.counter) this.updateCurrentCounter(index);
                    var currentSlideItem = this.getSlideItem(index);
                    var previousSlideItem_1 = this.getSlideItem(prevIndex);
                    var currentGalleryItem = this.galleryItems[index];
                    var videoInfo = currentGalleryItem.__slideVideoInfo;
                    this.outer.attr("data-lg-slide-type", this.getSlideType(currentGalleryItem));
                    this.setDownloadValue(index);
                    if (videoInfo) {
                        var _a = this.mediaContainerPosition, top_3 = _a.top, bottom = _a.bottom;
                        var videoSize = utils.getSize(this.items[index], this.outer, top_3 + bottom, videoInfo && this.settings.videoMaxSize);
                        this.resizeVideoSlide(index, videoSize);
                    }
                    this.LGel.trigger(lGEvents.beforeSlide, {
                        prevIndex,
                        index,
                        fromTouch: !!fromTouch,
                        fromThumb: !!fromThumb
                    });
                    this.lgBusy = true;
                    clearTimeout(this.hideBarTimeout);
                    this.arrowDisable(index);
                    if (!direction) if (index < prevIndex) direction = "prev"; else if (index > prevIndex) direction = "next";
                    if (!fromTouch) this.makeSlideAnimation(direction, currentSlideItem, previousSlideItem_1); else {
                        this.outer.find(".lg-item").removeClass("lg-prev-slide lg-current lg-next-slide");
                        var touchPrev = void 0;
                        var touchNext = void 0;
                        if (numberOfGalleryItems > 2) {
                            touchPrev = index - 1;
                            touchNext = index + 1;
                            if (0 === index && prevIndex === numberOfGalleryItems - 1) {
                                touchNext = 0;
                                touchPrev = numberOfGalleryItems - 1;
                            } else if (index === numberOfGalleryItems - 1 && 0 === prevIndex) {
                                touchNext = 0;
                                touchPrev = numberOfGalleryItems - 1;
                            }
                        } else {
                            touchPrev = 0;
                            touchNext = 1;
                        }
                        if ("prev" === direction) this.getSlideItem(touchNext).addClass("lg-next-slide"); else this.getSlideItem(touchPrev).addClass("lg-prev-slide");
                        currentSlideItem.addClass("lg-current");
                    }
                    if (!this.lGalleryOn) this.loadContent(index, true); else setTimeout((function() {
                        _this.loadContent(index, true);
                        if (".lg-item" !== _this.settings.appendSubHtmlTo) _this.addHtml(index);
                    }), this.settings.speed + 50 + (fromTouch ? 0 : this.settings.slideDelay));
                    setTimeout((function() {
                        _this.lgBusy = false;
                        previousSlideItem_1.removeClass("lg-slide-progress");
                        _this.LGel.trigger(lGEvents.afterSlide, {
                            prevIndex,
                            index,
                            fromTouch,
                            fromThumb
                        });
                    }), (this.lGalleryOn ? this.settings.speed + 100 : 100) + (fromTouch ? 0 : this.settings.slideDelay));
                }
                this.index = index;
            };
            LightGallery.prototype.updateCurrentCounter = function(index) {
                this.getElementById("lg-counter-current").html(index + 1 + "");
            };
            LightGallery.prototype.updateCounterTotal = function() {
                this.getElementById("lg-counter-all").html(this.galleryItems.length + "");
            };
            LightGallery.prototype.getSlideType = function(item) {
                if (item.__slideVideoInfo) return "video"; else if (item.iframe) return "iframe"; else return "image";
            };
            LightGallery.prototype.touchMove = function(startCoords, endCoords, e) {
                var distanceX = endCoords.pageX - startCoords.pageX;
                var distanceY = endCoords.pageY - startCoords.pageY;
                var allowSwipe = false;
                if (this.swipeDirection) allowSwipe = true; else if (Math.abs(distanceX) > 15) {
                    this.swipeDirection = "horizontal";
                    allowSwipe = true;
                } else if (Math.abs(distanceY) > 15) {
                    this.swipeDirection = "vertical";
                    allowSwipe = true;
                }
                if (!allowSwipe) return;
                var $currentSlide = this.getSlideItem(this.index);
                if ("horizontal" === this.swipeDirection) {
                    null === e || void 0 === e ? void 0 : e.preventDefault();
                    this.outer.addClass("lg-dragging");
                    this.setTranslate($currentSlide, distanceX, 0);
                    var width = $currentSlide.get().offsetWidth;
                    var slideWidthAmount = 15 * width / 100;
                    var gutter = slideWidthAmount - Math.abs(10 * distanceX / 100);
                    this.setTranslate(this.outer.find(".lg-prev-slide").first(), -width + distanceX - gutter, 0);
                    this.setTranslate(this.outer.find(".lg-next-slide").first(), width + distanceX + gutter, 0);
                } else if ("vertical" === this.swipeDirection) if (this.settings.swipeToClose) {
                    null === e || void 0 === e ? void 0 : e.preventDefault();
                    this.$container.addClass("lg-dragging-vertical");
                    var opacity = 1 - Math.abs(distanceY) / window.innerHeight;
                    this.$backdrop.css("opacity", opacity);
                    var scale = 1 - Math.abs(distanceY) / (2 * window.innerWidth);
                    this.setTranslate($currentSlide, 0, distanceY, scale, scale);
                    if (Math.abs(distanceY) > 100) this.outer.addClass("lg-hide-items").removeClass("lg-components-open");
                }
            };
            LightGallery.prototype.touchEnd = function(endCoords, startCoords, event) {
                var _this = this;
                var distance;
                if ("lg-slide" !== this.settings.mode) this.outer.addClass("lg-slide");
                setTimeout((function() {
                    _this.$container.removeClass("lg-dragging-vertical");
                    _this.outer.removeClass("lg-dragging lg-hide-items").addClass("lg-components-open");
                    var triggerClick = true;
                    if ("horizontal" === _this.swipeDirection) {
                        distance = endCoords.pageX - startCoords.pageX;
                        var distanceAbs = Math.abs(endCoords.pageX - startCoords.pageX);
                        if (distance < 0 && distanceAbs > _this.settings.swipeThreshold) {
                            _this.goToNextSlide(true);
                            triggerClick = false;
                        } else if (distance > 0 && distanceAbs > _this.settings.swipeThreshold) {
                            _this.goToPrevSlide(true);
                            triggerClick = false;
                        }
                    } else if ("vertical" === _this.swipeDirection) {
                        distance = Math.abs(endCoords.pageY - startCoords.pageY);
                        if (_this.settings.closable && _this.settings.swipeToClose && distance > 100) {
                            _this.closeGallery();
                            return;
                        } else _this.$backdrop.css("opacity", 1);
                    }
                    _this.outer.find(".lg-item").removeAttr("style");
                    if (triggerClick && Math.abs(endCoords.pageX - startCoords.pageX) < 5) {
                        var target = $LG(event.target);
                        if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
                    }
                    _this.swipeDirection = void 0;
                }));
                setTimeout((function() {
                    if (!_this.outer.hasClass("lg-dragging") && "lg-slide" !== _this.settings.mode) _this.outer.removeClass("lg-slide");
                }), this.settings.speed + 100);
            };
            LightGallery.prototype.enableSwipe = function() {
                var _this = this;
                var startCoords = {};
                var endCoords = {};
                var isMoved = false;
                var isSwiping = false;
                if (this.settings.enableSwipe) {
                    this.$inner.on("touchstart.lg", (function(e) {
                        _this.dragOrSwipeEnabled = true;
                        var $item = _this.getSlideItem(_this.index);
                        if (($LG(e.target).hasClass("lg-item") || $item.get().contains(e.target)) && !_this.outer.hasClass("lg-zoomed") && !_this.lgBusy && 1 === e.targetTouches.length) {
                            isSwiping = true;
                            _this.touchAction = "swipe";
                            _this.manageSwipeClass();
                            startCoords = {
                                pageX: e.targetTouches[0].pageX,
                                pageY: e.targetTouches[0].pageY
                            };
                        }
                    }));
                    this.$inner.on("touchmove.lg", (function(e) {
                        if (isSwiping && "swipe" === _this.touchAction && 1 === e.targetTouches.length) {
                            endCoords = {
                                pageX: e.targetTouches[0].pageX,
                                pageY: e.targetTouches[0].pageY
                            };
                            _this.touchMove(startCoords, endCoords, e);
                            isMoved = true;
                        }
                    }));
                    this.$inner.on("touchend.lg", (function(event) {
                        if ("swipe" === _this.touchAction) {
                            if (isMoved) {
                                isMoved = false;
                                _this.touchEnd(endCoords, startCoords, event);
                            } else if (isSwiping) {
                                var target = $LG(event.target);
                                if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
                            }
                            _this.touchAction = void 0;
                            isSwiping = false;
                        }
                    }));
                }
            };
            LightGallery.prototype.enableDrag = function() {
                var _this = this;
                var startCoords = {};
                var endCoords = {};
                var isDraging = false;
                var isMoved = false;
                if (this.settings.enableDrag) {
                    this.outer.on("mousedown.lg", (function(e) {
                        _this.dragOrSwipeEnabled = true;
                        var $item = _this.getSlideItem(_this.index);
                        if ($LG(e.target).hasClass("lg-item") || $item.get().contains(e.target)) if (!_this.outer.hasClass("lg-zoomed") && !_this.lgBusy) {
                            e.preventDefault();
                            if (!_this.lgBusy) {
                                _this.manageSwipeClass();
                                startCoords = {
                                    pageX: e.pageX,
                                    pageY: e.pageY
                                };
                                isDraging = true;
                                _this.outer.get().scrollLeft += 1;
                                _this.outer.get().scrollLeft -= 1;
                                _this.outer.removeClass("lg-grab").addClass("lg-grabbing");
                                _this.LGel.trigger(lGEvents.dragStart);
                            }
                        }
                    }));
                    $LG(window).on("mousemove.lg.global" + this.lgId, (function(e) {
                        if (isDraging && _this.lgOpened) {
                            isMoved = true;
                            endCoords = {
                                pageX: e.pageX,
                                pageY: e.pageY
                            };
                            _this.touchMove(startCoords, endCoords);
                            _this.LGel.trigger(lGEvents.dragMove);
                        }
                    }));
                    $LG(window).on("mouseup.lg.global" + this.lgId, (function(event) {
                        if (!_this.lgOpened) return;
                        var target = $LG(event.target);
                        if (isMoved) {
                            isMoved = false;
                            _this.touchEnd(endCoords, startCoords, event);
                            _this.LGel.trigger(lGEvents.dragEnd);
                        } else if (_this.isPosterElement(target)) _this.LGel.trigger(lGEvents.posterClick);
                        if (isDraging) {
                            isDraging = false;
                            _this.outer.removeClass("lg-grabbing").addClass("lg-grab");
                        }
                    }));
                }
            };
            LightGallery.prototype.triggerPosterClick = function() {
                var _this = this;
                this.$inner.on("click.lg", (function(event) {
                    if (!_this.dragOrSwipeEnabled && _this.isPosterElement($LG(event.target))) _this.LGel.trigger(lGEvents.posterClick);
                }));
            };
            LightGallery.prototype.manageSwipeClass = function() {
                var _touchNext = this.index + 1;
                var _touchPrev = this.index - 1;
                if (this.settings.loop && this.galleryItems.length > 2) if (0 === this.index) _touchPrev = this.galleryItems.length - 1; else if (this.index === this.galleryItems.length - 1) _touchNext = 0;
                this.outer.find(".lg-item").removeClass("lg-next-slide lg-prev-slide");
                if (_touchPrev > -1) this.getSlideItem(_touchPrev).addClass("lg-prev-slide");
                this.getSlideItem(_touchNext).addClass("lg-next-slide");
            };
            LightGallery.prototype.goToNextSlide = function(fromTouch) {
                var _this = this;
                var _loop = this.settings.loop;
                if (fromTouch && this.galleryItems.length < 3) _loop = false;
                if (!this.lgBusy) if (this.index + 1 < this.galleryItems.length) {
                    this.index++;
                    this.LGel.trigger(lGEvents.beforeNextSlide, {
                        index: this.index
                    });
                    this.slide(this.index, !!fromTouch, false, "next");
                } else if (_loop) {
                    this.index = 0;
                    this.LGel.trigger(lGEvents.beforeNextSlide, {
                        index: this.index
                    });
                    this.slide(this.index, !!fromTouch, false, "next");
                } else if (this.settings.slideEndAnimation && !fromTouch) {
                    this.outer.addClass("lg-right-end");
                    setTimeout((function() {
                        _this.outer.removeClass("lg-right-end");
                    }), 400);
                }
            };
            LightGallery.prototype.goToPrevSlide = function(fromTouch) {
                var _this = this;
                var _loop = this.settings.loop;
                if (fromTouch && this.galleryItems.length < 3) _loop = false;
                if (!this.lgBusy) if (this.index > 0) {
                    this.index--;
                    this.LGel.trigger(lGEvents.beforePrevSlide, {
                        index: this.index,
                        fromTouch
                    });
                    this.slide(this.index, !!fromTouch, false, "prev");
                } else if (_loop) {
                    this.index = this.galleryItems.length - 1;
                    this.LGel.trigger(lGEvents.beforePrevSlide, {
                        index: this.index,
                        fromTouch
                    });
                    this.slide(this.index, !!fromTouch, false, "prev");
                } else if (this.settings.slideEndAnimation && !fromTouch) {
                    this.outer.addClass("lg-left-end");
                    setTimeout((function() {
                        _this.outer.removeClass("lg-left-end");
                    }), 400);
                }
            };
            LightGallery.prototype.keyPress = function() {
                var _this = this;
                $LG(window).on("keydown.lg.global" + this.lgId, (function(e) {
                    if (_this.lgOpened && true === _this.settings.escKey && 27 === e.keyCode) {
                        e.preventDefault();
                        if (_this.settings.allowMediaOverlap && _this.outer.hasClass("lg-can-toggle") && _this.outer.hasClass("lg-components-open")) _this.outer.removeClass("lg-components-open"); else _this.closeGallery();
                    }
                    if (_this.lgOpened && _this.galleryItems.length > 1) {
                        if (37 === e.keyCode) {
                            e.preventDefault();
                            _this.goToPrevSlide();
                        }
                        if (39 === e.keyCode) {
                            e.preventDefault();
                            _this.goToNextSlide();
                        }
                    }
                }));
            };
            LightGallery.prototype.arrow = function() {
                var _this = this;
                this.getElementById("lg-prev").on("click.lg", (function() {
                    _this.goToPrevSlide();
                }));
                this.getElementById("lg-next").on("click.lg", (function() {
                    _this.goToNextSlide();
                }));
            };
            LightGallery.prototype.arrowDisable = function(index) {
                if (!this.settings.loop && this.settings.hideControlOnEnd) {
                    var $prev = this.getElementById("lg-prev");
                    var $next = this.getElementById("lg-next");
                    if (index + 1 === this.galleryItems.length) $next.attr("disabled", "disabled").addClass("disabled"); else $next.removeAttr("disabled").removeClass("disabled");
                    if (0 === index) $prev.attr("disabled", "disabled").addClass("disabled"); else $prev.removeAttr("disabled").removeClass("disabled");
                }
            };
            LightGallery.prototype.setTranslate = function($el, xValue, yValue, scaleX, scaleY) {
                if (void 0 === scaleX) scaleX = 1;
                if (void 0 === scaleY) scaleY = 1;
                $el.css("transform", "translate3d(" + xValue + "px, " + yValue + "px, 0px) scale3d(" + scaleX + ", " + scaleY + ", 1)");
            };
            LightGallery.prototype.mousewheel = function() {
                var _this = this;
                var lastCall = 0;
                this.outer.on("wheel.lg", (function(e) {
                    if (!e.deltaY || _this.galleryItems.length < 2) return;
                    e.preventDefault();
                    var now = (new Date).getTime();
                    if (now - lastCall < 1e3) return;
                    lastCall = now;
                    if (e.deltaY > 0) _this.goToNextSlide(); else if (e.deltaY < 0) _this.goToPrevSlide();
                }));
            };
            LightGallery.prototype.isSlideElement = function(target) {
                return target.hasClass("lg-outer") || target.hasClass("lg-item") || target.hasClass("lg-img-wrap");
            };
            LightGallery.prototype.isPosterElement = function(target) {
                var playButton = this.getSlideItem(this.index).find(".lg-video-play-button").get();
                return target.hasClass("lg-video-poster") || target.hasClass("lg-video-play-button") || playButton && playButton.contains(target.get());
            };
            LightGallery.prototype.toggleMaximize = function() {
                var _this = this;
                this.getElementById("lg-maximize").on("click.lg", (function() {
                    _this.$container.toggleClass("lg-inline");
                    _this.refreshOnResize();
                }));
            };
            LightGallery.prototype.invalidateItems = function() {
                for (var index = 0; index < this.items.length; index++) {
                    var element = this.items[index];
                    var $element = $LG(element);
                    $element.off("click.lgcustom-item-" + $element.attr("data-lg-id"));
                }
            };
            LightGallery.prototype.trapFocus = function() {
                var _this = this;
                this.$container.get().focus({
                    preventScroll: true
                });
                $LG(window).on("keydown.lg.global" + this.lgId, (function(e) {
                    if (!_this.lgOpened) return;
                    var isTabPressed = "Tab" === e.key || 9 === e.keyCode;
                    if (!isTabPressed) return;
                    var focusableEls = utils.getFocusableElements(_this.$container.get());
                    var firstFocusableEl = focusableEls[0];
                    var lastFocusableEl = focusableEls[focusableEls.length - 1];
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            e.preventDefault();
                        }
                    } else if (document.activeElement === lastFocusableEl) {
                        firstFocusableEl.focus();
                        e.preventDefault();
                    }
                }));
            };
            LightGallery.prototype.manageCloseGallery = function() {
                var _this = this;
                if (!this.settings.closable) return;
                var mousedown = false;
                this.getElementById("lg-close").on("click.lg", (function() {
                    _this.closeGallery();
                }));
                if (this.settings.closeOnTap) {
                    this.outer.on("mousedown.lg", (function(e) {
                        var target = $LG(e.target);
                        if (_this.isSlideElement(target)) mousedown = true; else mousedown = false;
                    }));
                    this.outer.on("mousemove.lg", (function() {
                        mousedown = false;
                    }));
                    this.outer.on("mouseup.lg", (function(e) {
                        var target = $LG(e.target);
                        if (_this.isSlideElement(target) && mousedown) if (!_this.outer.hasClass("lg-dragging")) _this.closeGallery();
                    }));
                }
            };
            LightGallery.prototype.closeGallery = function(force) {
                var _this = this;
                if (!this.lgOpened || !this.settings.closable && !force) return 0;
                this.LGel.trigger(lGEvents.beforeClose);
                if (this.settings.resetScrollPosition && !this.settings.hideScrollbar) $LG(window).scrollTop(this.prevScrollTop);
                var currentItem = this.items[this.index];
                var transform;
                if (this.zoomFromOrigin && currentItem) {
                    var _a = this.mediaContainerPosition, top_4 = _a.top, bottom = _a.bottom;
                    var _b = this.galleryItems[this.index], __slideVideoInfo = _b.__slideVideoInfo, poster = _b.poster;
                    var imageSize = utils.getSize(currentItem, this.outer, top_4 + bottom, __slideVideoInfo && poster && this.settings.videoMaxSize);
                    transform = utils.getTransform(currentItem, this.outer, top_4, bottom, imageSize);
                }
                if (this.zoomFromOrigin && transform) {
                    this.outer.addClass("lg-closing lg-zoom-from-image");
                    this.getSlideItem(this.index).addClass("lg-start-end-progress").css("transition-duration", this.settings.startAnimationDuration + "ms").css("transform", transform);
                } else {
                    this.outer.addClass("lg-hide-items");
                    this.outer.removeClass("lg-zoom-from-image");
                }
                this.destroyModules();
                this.lGalleryOn = false;
                this.isDummyImageRemoved = false;
                this.zoomFromOrigin = this.settings.zoomFromOrigin;
                clearTimeout(this.hideBarTimeout);
                this.hideBarTimeout = false;
                $LG("html").removeClass("lg-on");
                this.outer.removeClass("lg-visible lg-components-open");
                this.$backdrop.removeClass("in").css("opacity", 0);
                var removeTimeout = this.zoomFromOrigin && transform ? Math.max(this.settings.startAnimationDuration, this.settings.backdropDuration) : this.settings.backdropDuration;
                this.$container.removeClass("lg-show-in");
                setTimeout((function() {
                    if (_this.zoomFromOrigin && transform) _this.outer.removeClass("lg-zoom-from-image");
                    _this.$container.removeClass("lg-show");
                    _this.resetScrollBar();
                    _this.$backdrop.removeAttr("style").css("transition-duration", _this.settings.backdropDuration + "ms");
                    _this.outer.removeClass("lg-closing " + _this.settings.startClass);
                    _this.getSlideItem(_this.index).removeClass("lg-start-end-progress");
                    _this.$inner.empty();
                    if (_this.lgOpened) _this.LGel.trigger(lGEvents.afterClose, {
                        instance: _this
                    });
                    if (_this.$container.get()) _this.$container.get().blur();
                    _this.lgOpened = false;
                }), removeTimeout + 100);
                return removeTimeout + 100;
            };
            LightGallery.prototype.initModules = function() {
                this.plugins.forEach((function(module) {
                    try {
                        module.init();
                    } catch (err) {
                        console.warn("lightGallery:- make sure lightGallery module is properly initiated");
                    }
                }));
            };
            LightGallery.prototype.destroyModules = function(destroy) {
                this.plugins.forEach((function(module) {
                    try {
                        if (destroy) module.destroy(); else module.closeGallery && module.closeGallery();
                    } catch (err) {
                        console.warn("lightGallery:- make sure lightGallery module is properly destroyed");
                    }
                }));
            };
            LightGallery.prototype.refresh = function(galleryItems) {
                if (!this.settings.dynamic) this.invalidateItems();
                if (galleryItems) this.galleryItems = galleryItems; else this.galleryItems = this.getItems();
                this.updateControls();
                this.openGalleryOnItemClick();
                this.LGel.trigger(lGEvents.updateSlides);
            };
            LightGallery.prototype.updateControls = function() {
                this.addSlideVideoInfo(this.galleryItems);
                this.updateCounterTotal();
                this.manageSingleSlideClassName();
            };
            LightGallery.prototype.destroy = function() {
                var _this = this;
                var closeTimeout = this.closeGallery(true);
                setTimeout((function() {
                    _this.destroyModules(true);
                    if (!_this.settings.dynamic) _this.invalidateItems();
                    $LG(window).off(".lg.global" + _this.lgId);
                    _this.LGel.off(".lg");
                    _this.$container.remove();
                }), closeTimeout);
                return closeTimeout;
            };
            return LightGallery;
        }();
        function lightGallery(el, options) {
            return new LightGallery(el, options);
        }
        const lightgallery_es5 = lightGallery;
        const galleries = document.querySelectorAll("[data-gallery]");
        if (galleries.length) {
            let galleyItems = [];
            galleries.forEach((gallery => {
                galleyItems.push({
                    gallery,
                    galleryClass: lightgallery_es5(gallery, {
                        licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
                        speed: 500
                    })
                });
            }));
            flsModules.gallery = galleyItems;
        }
        var TweenLite = __webpack_require__(957);
        /*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
        TweenLite.ML._gsDefine("TweenMax", [ "core.Animation", "core.SimpleTimeline", "TweenLite" ], (function() {
            var _slice = function(a) {
                var i, b = [], l = a.length;
                for (i = 0; i !== l; b.push(a[i++])) ;
                return b;
            }, _applyCycle = function(vars, targets, i) {
                var p, val, alt = vars.cycle;
                for (p in alt) {
                    val = alt[p];
                    vars[p] = "function" === typeof val ? val(i, targets[i], targets) : val[i % val.length];
                }
                delete vars.cycle;
            }, _distribute = function(v) {
                if ("function" === typeof v) return v;
                var vars = "object" === typeof v ? v : {
                    each: v
                }, ease = vars.ease, from = vars.from || 0, base = vars.base || 0, cache = {}, isFromKeyword = isNaN(from), axis = vars.axis, ratio = {
                    center: .5,
                    end: 1
                }[from] || 0;
                return function(i, target, a) {
                    var originX, originY, x, y, d, j, max, min, wrap, l = (a || vars).length, distances = cache[l];
                    if (!distances) {
                        wrap = "auto" === vars.grid ? 0 : (vars.grid || [ 1 / 0 ])[0];
                        if (!wrap) {
                            max = -1 / 0;
                            while (max < (max = a[wrap++].getBoundingClientRect().left) && wrap < l) ;
                            wrap--;
                        }
                        distances = cache[l] = [];
                        originX = isFromKeyword ? Math.min(wrap, l) * ratio - .5 : from % wrap;
                        originY = isFromKeyword ? l * ratio / wrap - .5 : from / wrap | 0;
                        max = 0;
                        min = 1 / 0;
                        for (j = 0; j < l; j++) {
                            x = j % wrap - originX;
                            y = originY - (j / wrap | 0);
                            distances[j] = d = !axis ? Math.sqrt(x * x + y * y) : Math.abs("y" === axis ? y : x);
                            if (d > max) max = d;
                            if (d < min) min = d;
                        }
                        distances.max = max - min;
                        distances.min = min;
                        distances.v = l = vars.amount || vars.each * (wrap > l ? l - 1 : !axis ? Math.max(wrap, l / wrap) : "y" === axis ? l / wrap : wrap) || 0;
                        distances.b = l < 0 ? base - l : base;
                    }
                    l = (distances[i] - distances.min) / distances.max;
                    return distances.b + (ease ? ease.getRatio(l) : l) * distances.v;
                };
            }, TweenMax = function(target, duration, vars) {
                TweenLite.ZP.call(this, target, duration, vars);
                this._cycle = 0;
                this._yoyo = true === this.vars.yoyo || !!this.vars.yoyoEase;
                this._repeat = this.vars.repeat || 0;
                this._repeatDelay = this.vars.repeatDelay || 0;
                if (this._repeat) this._uncache(true);
                this.render = TweenMax.prototype.render;
            }, _tinyNum = 1e-8, TweenLiteInternals = TweenLite.ZP._internals, _isSelector = TweenLiteInternals.isSelector, _isArray = TweenLiteInternals.isArray, p = TweenMax.prototype = TweenLite.ZP.to({}, .1, {}), _blankArray = [];
            TweenMax.version = "2.1.3";
            p.constructor = TweenMax;
            p.kill()._gc = false;
            TweenMax.killTweensOf = TweenMax.killDelayedCallsTo = TweenLite.ZP.killTweensOf;
            TweenMax.getTweensOf = TweenLite.ZP.getTweensOf;
            TweenMax.lagSmoothing = TweenLite.ZP.lagSmoothing;
            TweenMax.ticker = TweenLite.ZP.ticker;
            TweenMax.render = TweenLite.ZP.render;
            TweenMax.distribute = _distribute;
            p.invalidate = function() {
                this._yoyo = true === this.vars.yoyo || !!this.vars.yoyoEase;
                this._repeat = this.vars.repeat || 0;
                this._repeatDelay = this.vars.repeatDelay || 0;
                this._yoyoEase = null;
                this._uncache(true);
                return TweenLite.ZP.prototype.invalidate.call(this);
            };
            p.updateTo = function(vars, resetDuration) {
                var p, self = this, curRatio = self.ratio, immediate = self.vars.immediateRender || vars.immediateRender;
                if (resetDuration && self._startTime < self._timeline._time) {
                    self._startTime = self._timeline._time;
                    self._uncache(false);
                    if (self._gc) self._enabled(true, false); else self._timeline.insert(self, self._startTime - self._delay);
                }
                for (p in vars) self.vars[p] = vars[p];
                if (self._initted || immediate) if (resetDuration) {
                    self._initted = false;
                    if (immediate) self.render(0, true, true);
                } else {
                    if (self._gc) self._enabled(true, false);
                    if (self._notifyPluginsOfEnabled && self._firstPT) TweenLite.ZP._onPluginEvent("_onDisable", self);
                    if (self._time / self._duration > .998) {
                        var prevTime = self._totalTime;
                        self.render(0, true, false);
                        self._initted = false;
                        self.render(prevTime, true, false);
                    } else {
                        self._initted = false;
                        self._init();
                        if (self._time > 0 || immediate) {
                            var endValue, inv = 1 / (1 - curRatio), pt = self._firstPT;
                            while (pt) {
                                endValue = pt.s + pt.c;
                                pt.c *= inv;
                                pt.s = endValue - pt.c;
                                pt = pt._next;
                            }
                        }
                    }
                }
                return self;
            };
            p.render = function(time, suppressEvents, force) {
                if (!this._initted) if (0 === this._duration && this.vars.repeat) this.invalidate();
                var isComplete, callback, pt, cycleDuration, r, type, pow, rawPrevTime, yoyoEase, self = this, totalDur = !self._dirty ? self._totalDuration : self.totalDuration(), prevTime = self._time, prevTotalTime = self._totalTime, prevCycle = self._cycle, duration = self._duration, prevRawPrevTime = self._rawPrevTime;
                if (time >= totalDur - _tinyNum && time >= 0) {
                    self._totalTime = totalDur;
                    self._cycle = self._repeat;
                    if (self._yoyo && 0 !== (1 & self._cycle)) {
                        self._time = 0;
                        self.ratio = self._ease._calcEnd ? self._ease.getRatio(0) : 0;
                    } else {
                        self._time = duration;
                        self.ratio = self._ease._calcEnd ? self._ease.getRatio(1) : 1;
                    }
                    if (!self._reversed) {
                        isComplete = true;
                        callback = "onComplete";
                        force = force || self._timeline.autoRemoveChildren;
                    }
                    if (0 === duration) if (self._initted || !self.vars.lazy || force) {
                        if (self._startTime === self._timeline._duration) time = 0;
                        if (prevRawPrevTime < 0 || time <= 0 && time >= -_tinyNum || prevRawPrevTime === _tinyNum && "isPause" !== self.data) if (prevRawPrevTime !== time) {
                            force = true;
                            if (prevRawPrevTime > _tinyNum) callback = "onReverseComplete";
                        }
                        self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum;
                    }
                } else if (time < _tinyNum) {
                    self._totalTime = self._time = self._cycle = 0;
                    self.ratio = self._ease._calcEnd ? self._ease.getRatio(0) : 0;
                    if (0 !== prevTotalTime || 0 === duration && prevRawPrevTime > 0) {
                        callback = "onReverseComplete";
                        isComplete = self._reversed;
                    }
                    if (time > -_tinyNum) time = 0; else if (time < 0) {
                        self._active = false;
                        if (0 === duration) if (self._initted || !self.vars.lazy || force) {
                            if (prevRawPrevTime >= 0) force = true;
                            self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum;
                        }
                    }
                    if (!self._initted) force = true;
                } else {
                    self._totalTime = self._time = time;
                    if (0 !== self._repeat) {
                        cycleDuration = duration + self._repeatDelay;
                        self._cycle = self._totalTime / cycleDuration >> 0;
                        if (0 !== self._cycle) if (self._cycle === self._totalTime / cycleDuration && prevTotalTime <= time) self._cycle--;
                        self._time = self._totalTime - self._cycle * cycleDuration;
                        if (self._yoyo) if (0 !== (1 & self._cycle)) {
                            self._time = duration - self._time;
                            yoyoEase = self._yoyoEase || self.vars.yoyoEase;
                            if (yoyoEase) {
                                if (!self._yoyoEase) if (true === yoyoEase && !self._initted) {
                                    yoyoEase = self.vars.ease;
                                    self._yoyoEase = yoyoEase = !yoyoEase ? TweenLite.ZP.defaultEase : yoyoEase instanceof TweenLite.SX ? yoyoEase : "function" === typeof yoyoEase ? new TweenLite.SX(yoyoEase, self.vars.easeParams) : TweenLite.SX.map[yoyoEase] || TweenLite.ZP.defaultEase;
                                } else self._yoyoEase = yoyoEase = true === yoyoEase ? self._ease : yoyoEase instanceof TweenLite.SX ? yoyoEase : TweenLite.SX.map[yoyoEase];
                                self.ratio = yoyoEase ? 1 - yoyoEase.getRatio((duration - self._time) / duration) : 0;
                            }
                        }
                        if (self._time > duration) self._time = duration; else if (self._time < 0) self._time = 0;
                    }
                    if (self._easeType && !yoyoEase) {
                        r = self._time / duration;
                        type = self._easeType;
                        pow = self._easePower;
                        if (1 === type || 3 === type && r >= .5) r = 1 - r;
                        if (3 === type) r *= 2;
                        if (1 === pow) r *= r; else if (2 === pow) r *= r * r; else if (3 === pow) r *= r * r * r; else if (4 === pow) r *= r * r * r * r;
                        self.ratio = 1 === type ? 1 - r : 2 === type ? r : self._time / duration < .5 ? r / 2 : 1 - r / 2;
                    } else if (!yoyoEase) self.ratio = self._ease.getRatio(self._time / duration);
                }
                if (prevTime === self._time && !force && prevCycle === self._cycle) {
                    if (prevTotalTime !== self._totalTime) if (self._onUpdate) if (!suppressEvents) self._callback("onUpdate");
                    return;
                } else if (!self._initted) {
                    self._init();
                    if (!self._initted || self._gc) return; else if (!force && self._firstPT && (false !== self.vars.lazy && self._duration || self.vars.lazy && !self._duration)) {
                        self._time = prevTime;
                        self._totalTime = prevTotalTime;
                        self._rawPrevTime = prevRawPrevTime;
                        self._cycle = prevCycle;
                        TweenLiteInternals.lazyTweens.push(self);
                        self._lazy = [ time, suppressEvents ];
                        return;
                    }
                    if (self._time && !isComplete && !yoyoEase) self.ratio = self._ease.getRatio(self._time / duration); else if (isComplete && this._ease._calcEnd && !yoyoEase) self.ratio = self._ease.getRatio(0 === self._time ? 0 : 1);
                }
                if (false !== self._lazy) self._lazy = false;
                if (!self._active) if (!self._paused && self._time !== prevTime && time >= 0) self._active = true;
                if (0 === prevTotalTime) {
                    if (2 === self._initted && time > 0) self._init();
                    if (self._startAt) if (time >= 0) self._startAt.render(time, true, force); else if (!callback) callback = "_dummyGS";
                    if (self.vars.onStart) if (0 !== self._totalTime || 0 === duration) if (!suppressEvents) self._callback("onStart");
                }
                pt = self._firstPT;
                while (pt) {
                    if (pt.f) pt.t[pt.p](pt.c * self.ratio + pt.s); else pt.t[pt.p] = pt.c * self.ratio + pt.s;
                    pt = pt._next;
                }
                if (self._onUpdate) {
                    if (time < 0) if (self._startAt && self._startTime) self._startAt.render(time, true, force);
                    if (!suppressEvents) if (self._totalTime !== prevTotalTime || callback) self._callback("onUpdate");
                }
                if (self._cycle !== prevCycle) if (!suppressEvents) if (!self._gc) if (self.vars.onRepeat) self._callback("onRepeat");
                if (callback) if (!self._gc || force) {
                    if (time < 0 && self._startAt && !self._onUpdate && self._startTime) self._startAt.render(time, true, force);
                    if (isComplete) {
                        if (self._timeline.autoRemoveChildren) self._enabled(false, false);
                        self._active = false;
                    }
                    if (!suppressEvents && self.vars[callback]) self._callback(callback);
                    if (0 === duration && self._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) self._rawPrevTime = 0;
                }
            };
            TweenMax.to = function(target, duration, vars) {
                return new TweenMax(target, duration, vars);
            };
            TweenMax.from = function(target, duration, vars) {
                vars.runBackwards = true;
                vars.immediateRender = false != vars.immediateRender;
                return new TweenMax(target, duration, vars);
            };
            TweenMax.fromTo = function(target, duration, fromVars, toVars) {
                toVars.startAt = fromVars;
                toVars.immediateRender = false != toVars.immediateRender && false != fromVars.immediateRender;
                return new TweenMax(target, duration, toVars);
            };
            TweenMax.staggerTo = TweenMax.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                var l, copy, i, p, a = [], staggerFunc = _distribute(vars.stagger || stagger), cycle = vars.cycle, fromCycle = (vars.startAt || _blankArray).cycle;
                if (!_isArray(targets)) {
                    if ("string" === typeof targets) targets = TweenLite.ZP.selector(targets) || targets;
                    if (_isSelector(targets)) targets = _slice(targets);
                }
                targets = targets || [];
                l = targets.length - 1;
                for (i = 0; i <= l; i++) {
                    copy = {};
                    for (p in vars) copy[p] = vars[p];
                    if (cycle) {
                        _applyCycle(copy, targets, i);
                        if (null != copy.duration) {
                            duration = copy.duration;
                            delete copy.duration;
                        }
                    }
                    if (fromCycle) {
                        fromCycle = copy.startAt = {};
                        for (p in vars.startAt) fromCycle[p] = vars.startAt[p];
                        _applyCycle(copy.startAt, targets, i);
                    }
                    copy.delay = staggerFunc(i, targets[i], targets) + (copy.delay || 0);
                    if (i === l && onCompleteAll) copy.onComplete = function() {
                        if (vars.onComplete) vars.onComplete.apply(vars.onCompleteScope || this, arguments);
                        onCompleteAll.apply(onCompleteAllScope || vars.callbackScope || this, onCompleteAllParams || _blankArray);
                    };
                    a[i] = new TweenMax(targets[i], duration, copy);
                }
                return a;
            };
            TweenMax.staggerFrom = TweenMax.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                vars.runBackwards = true;
                vars.immediateRender = false != vars.immediateRender;
                return TweenMax.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
            };
            TweenMax.staggerFromTo = TweenMax.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                toVars.startAt = fromVars;
                toVars.immediateRender = false != toVars.immediateRender && false != fromVars.immediateRender;
                return TweenMax.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
            };
            TweenMax.delayedCall = function(delay, callback, params, scope, useFrames) {
                return new TweenMax(callback, 0, {
                    delay,
                    onComplete: callback,
                    onCompleteParams: params,
                    callbackScope: scope,
                    onReverseComplete: callback,
                    onReverseCompleteParams: params,
                    immediateRender: false,
                    useFrames,
                    overwrite: 0
                });
            };
            TweenMax.set = function(target, vars) {
                return new TweenMax(target, 0, vars);
            };
            TweenMax.isTweening = function(target) {
                return TweenLite.ZP.getTweensOf(target, true).length > 0;
            };
            var _getChildrenOf = function(timeline, includeTimelines) {
                var a = [], cnt = 0, tween = timeline._first;
                while (tween) {
                    if (tween instanceof TweenLite.ZP) a[cnt++] = tween; else {
                        if (includeTimelines) a[cnt++] = tween;
                        a = a.concat(_getChildrenOf(tween, includeTimelines));
                        cnt = a.length;
                    }
                    tween = tween._next;
                }
                return a;
            }, getAllTweens = TweenMax.getAllTweens = function(includeTimelines) {
                return _getChildrenOf(TweenLite.fw._rootTimeline, includeTimelines).concat(_getChildrenOf(TweenLite.fw._rootFramesTimeline, includeTimelines));
            };
            TweenMax.killAll = function(complete, tweens, delayedCalls, timelines) {
                if (null == tweens) tweens = true;
                if (null == delayedCalls) delayedCalls = true;
                var isDC, tween, i, a = getAllTweens(false != timelines), l = a.length, allTrue = tweens && delayedCalls && timelines;
                for (i = 0; i < l; i++) {
                    tween = a[i];
                    if (allTrue || tween instanceof TweenLite.MQ || (isDC = tween.target === tween.vars.onComplete) && delayedCalls || tweens && !isDC) if (complete) tween.totalTime(tween._reversed ? 0 : tween.totalDuration()); else tween._enabled(false, false);
                }
            };
            TweenMax.killChildTweensOf = function(parent, complete) {
                if (null == parent) return;
                var a, curParent, p, i, l, tl = TweenLiteInternals.tweenLookup;
                if ("string" === typeof parent) parent = TweenLite.ZP.selector(parent) || parent;
                if (_isSelector(parent)) parent = _slice(parent);
                if (_isArray(parent)) {
                    i = parent.length;
                    while (--i > -1) TweenMax.killChildTweensOf(parent[i], complete);
                    return;
                }
                a = [];
                for (p in tl) {
                    curParent = tl[p].target.parentNode;
                    while (curParent) {
                        if (curParent === parent) a = a.concat(tl[p].tweens);
                        curParent = curParent.parentNode;
                    }
                }
                l = a.length;
                for (i = 0; i < l; i++) {
                    if (complete) a[i].totalTime(a[i].totalDuration());
                    a[i]._enabled(false, false);
                }
            };
            var _changePause = function(pause, tweens, delayedCalls, timelines) {
                tweens = false !== tweens;
                delayedCalls = false !== delayedCalls;
                timelines = false !== timelines;
                var isDC, tween, a = getAllTweens(timelines), allTrue = tweens && delayedCalls && timelines, i = a.length;
                while (--i > -1) {
                    tween = a[i];
                    if (allTrue || tween instanceof TweenLite.MQ || (isDC = tween.target === tween.vars.onComplete) && delayedCalls || tweens && !isDC) tween.paused(pause);
                }
            };
            TweenMax.pauseAll = function(tweens, delayedCalls, timelines) {
                _changePause(true, tweens, delayedCalls, timelines);
            };
            TweenMax.resumeAll = function(tweens, delayedCalls, timelines) {
                _changePause(false, tweens, delayedCalls, timelines);
            };
            TweenMax.globalTimeScale = function(value) {
                var tl = TweenLite.fw._rootTimeline, t = TweenLite.ZP.ticker.time;
                if (!arguments.length) return tl._timeScale;
                value = value || _tinyNum;
                tl._startTime = t - (t - tl._startTime) * tl._timeScale / value;
                tl = TweenLite.fw._rootFramesTimeline;
                t = TweenLite.ZP.ticker.frame;
                tl._startTime = t - (t - tl._startTime) * tl._timeScale / value;
                tl._timeScale = TweenLite.fw._rootTimeline._timeScale = value;
                return value;
            };
            p.progress = function(value, suppressEvents) {
                return !arguments.length ? this.duration() ? this._time / this._duration : this.ratio : this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - value : value) + this._cycle * (this._duration + this._repeatDelay), suppressEvents);
            };
            p.totalProgress = function(value, suppressEvents) {
                return !arguments.length ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * value, suppressEvents);
            };
            p.time = function(value, suppressEvents) {
                if (!arguments.length) return this._time;
                if (this._dirty) this.totalDuration();
                var duration = this._duration, cycle = this._cycle, cycleDur = cycle * (duration + this._repeatDelay);
                if (value > duration) value = duration;
                return this.totalTime(this._yoyo && 1 & cycle ? duration - value + cycleDur : this._repeat ? value + cycleDur : value, suppressEvents);
            };
            p.duration = function(value) {
                if (!arguments.length) return this._duration;
                return TweenLite.fw.prototype.duration.call(this, value);
            };
            p.totalDuration = function(value) {
                if (!arguments.length) {
                    if (this._dirty) {
                        this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat;
                        this._dirty = false;
                    }
                    return this._totalDuration;
                }
                return -1 === this._repeat ? this : this.duration((value - this._repeat * this._repeatDelay) / (this._repeat + 1));
            };
            p.repeat = function(value) {
                if (!arguments.length) return this._repeat;
                this._repeat = value;
                return this._uncache(true);
            };
            p.repeatDelay = function(value) {
                if (!arguments.length) return this._repeatDelay;
                this._repeatDelay = value;
                return this._uncache(true);
            };
            p.yoyo = function(value) {
                if (!arguments.length) return this._yoyo;
                this._yoyo = value;
                return this;
            };
            return TweenMax;
        }), true);
        var TweenMax = TweenLite.li.TweenMax;
        /*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
        TweenLite.ML._gsDefine("plugins.CSSPlugin", [ "plugins.TweenPlugin", "TweenLite" ], (function() {
            var _hasPriority, _suffixMap, _cs, _overwriteProps, CSSPlugin = function() {
                TweenLite.VN.call(this, "css");
                this._overwriteProps.length = 0;
                this.setRatio = CSSPlugin.prototype.setRatio;
            }, _globals = TweenLite.ML._gsDefine.globals, _specialProps = {}, p = CSSPlugin.prototype = new TweenLite.VN("css");
            p.constructor = CSSPlugin;
            CSSPlugin.version = "2.1.3";
            CSSPlugin.API = 2;
            CSSPlugin.defaultTransformPerspective = 0;
            CSSPlugin.defaultSkewType = "compensated";
            CSSPlugin.defaultSmoothOrigin = true;
            p = "px";
            CSSPlugin.suffixMap = {
                top: p,
                right: p,
                bottom: p,
                left: p,
                width: p,
                height: p,
                fontSize: p,
                padding: p,
                margin: p,
                perspective: p,
                lineHeight: ""
            };
            var _autoRound, _reqSafariFix, _isSafari, _isFirefox, _isSafariLT6, _ieVers, _target, _index, _numExp = /(?:\-|\.|\b)(\d|\.|e\-)+/g, _relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, _valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, _valuesExpWithCommas = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b),?/gi, _NaNExp = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, _suffixExp = /(?:\d|\-|\+|=|#|\.)*/g, _opacityExp = /opacity *= *([^)]*)/i, _opacityValExp = /opacity:([^;]*)/i, _alphaFilterExp = /alpha\(opacity *=.+?\)/i, _rgbhslExp = /^(rgb|hsl)/, _capsExp = /([A-Z])/g, _camelExp = /-([a-z])/gi, _urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, _camelFunc = function(s, g) {
                return g.toUpperCase();
            }, _horizExp = /(?:Left|Right|Width)/i, _ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, _ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, _commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi, _complexExp = /[\s,\(]/i, _DEG2RAD = Math.PI / 180, _RAD2DEG = 180 / Math.PI, _forcePT = {}, _dummyElement = {
                style: {}
            }, _doc = TweenLite.ML.document || {
                createElement: function() {
                    return _dummyElement;
                }
            }, _createElement = function(type, ns) {
                var e = _doc.createElementNS ? _doc.createElementNS(ns || "http://www.w3.org/1999/xhtml", type) : _doc.createElement(type);
                return e.style ? e : _doc.createElement(type);
            }, _tempDiv = _createElement("div"), _tempImg = _createElement("img"), _internals = CSSPlugin._internals = {
                _specialProps
            }, _agent = (TweenLite.ML.navigator || {}).userAgent || "", _supportsOpacity = function() {
                var i = _agent.indexOf("Android"), a = _createElement("a");
                _isSafari = -1 !== _agent.indexOf("Safari") && -1 === _agent.indexOf("Chrome") && (-1 === i || parseFloat(_agent.substr(i + 8, 2)) > 3);
                _isSafariLT6 = _isSafari && parseFloat(_agent.substr(_agent.indexOf("Version/") + 8, 2)) < 6;
                _isFirefox = -1 !== _agent.indexOf("Firefox");
                if (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(_agent) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(_agent)) _ieVers = parseFloat(RegExp.$1);
                if (!a) return false;
                a.style.cssText = "top:1px;opacity:.55;";
                return /^0.55/.test(a.style.opacity);
            }(), _getIEOpacity = function(v) {
                return _opacityExp.test("string" === typeof v ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1;
            }, _log = function(s) {
                if (TweenLite.ML.console) console.log(s);
            }, _prefixCSS = "", _prefix = "", _checkPropPrefix = function(p, e) {
                e = e || _tempDiv;
                var a, i, s = e.style;
                if (void 0 !== s[p]) return p;
                p = p.charAt(0).toUpperCase() + p.substr(1);
                a = [ "O", "Moz", "ms", "Ms", "Webkit" ];
                i = 5;
                while (--i > -1 && void 0 === s[a[i] + p]) ;
                if (i >= 0) {
                    _prefix = 3 === i ? "ms" : a[i];
                    _prefixCSS = "-" + _prefix.toLowerCase() + "-";
                    return _prefix + p;
                }
                return null;
            }, _computedStyleScope = "undefined" !== typeof window ? window : _doc.defaultView || {
                getComputedStyle: function() {}
            }, _getComputedStyle = function(e) {
                return _computedStyleScope.getComputedStyle(e);
            }, _getStyle = CSSPlugin.getStyle = function(t, p, cs, calc, dflt) {
                var rv;
                if (!_supportsOpacity) if ("opacity" === p) return _getIEOpacity(t);
                if (!calc && t.style[p]) rv = t.style[p]; else if (cs = cs || _getComputedStyle(t)) rv = cs[p] || cs.getPropertyValue(p) || cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase()); else if (t.currentStyle) rv = t.currentStyle[p];
                return null != dflt && (!rv || "none" === rv || "auto" === rv || "auto auto" === rv) ? dflt : rv;
            }, _convertToPixels = _internals.convertToPixels = function(t, p, v, sfx, recurse) {
                if ("px" === sfx || !sfx && "lineHeight" !== p) return v;
                if ("auto" === sfx || !v) return 0;
                var pix, cache, time, horiz = _horizExp.test(p), node = t, style = _tempDiv.style, neg = v < 0, precise = 1 === v;
                if (neg) v = -v;
                if (precise) v *= 100;
                if ("lineHeight" === p && !sfx) {
                    cache = _getComputedStyle(t).lineHeight;
                    t.style.lineHeight = v;
                    pix = parseFloat(_getComputedStyle(t).lineHeight);
                    t.style.lineHeight = cache;
                } else if ("%" === sfx && -1 !== p.indexOf("border")) pix = v / 100 * (horiz ? t.clientWidth : t.clientHeight); else {
                    style.cssText = "border:0 solid red;position:" + _getStyle(t, "position") + ";line-height:0;";
                    if ("%" === sfx || !node.appendChild || "v" === sfx.charAt(0) || "rem" === sfx) {
                        node = t.parentNode || _doc.body;
                        if (-1 !== _getStyle(node, "display").indexOf("flex")) style.position = "absolute";
                        cache = node._gsCache;
                        time = TweenLite.ZP.ticker.frame;
                        if (cache && horiz && cache.time === time) return cache.width * v / 100;
                        style[horiz ? "width" : "height"] = v + sfx;
                    } else style[horiz ? "borderLeftWidth" : "borderTopWidth"] = v + sfx;
                    node.appendChild(_tempDiv);
                    pix = parseFloat(_tempDiv[horiz ? "offsetWidth" : "offsetHeight"]);
                    node.removeChild(_tempDiv);
                    if (horiz && "%" === sfx && false !== CSSPlugin.cacheWidths) {
                        cache = node._gsCache = node._gsCache || {};
                        cache.time = time;
                        cache.width = pix / v * 100;
                    }
                    if (0 === pix && !recurse) pix = _convertToPixels(t, p, v, sfx, true);
                }
                if (precise) pix /= 100;
                return neg ? -pix : pix;
            }, _calculateOffset = _internals.calculateOffset = function(t, p, cs) {
                if ("absolute" !== _getStyle(t, "position", cs)) return 0;
                var dim = "left" === p ? "Left" : "Top", v = _getStyle(t, "margin" + dim, cs);
                return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0);
            }, _getAllStyles = function(t, cs) {
                var i, tr, p, s = {};
                if (cs = cs || _getComputedStyle(t, null)) {
                    if (i = cs.length) while (--i > -1) {
                        p = cs[i];
                        if (-1 === p.indexOf("-transform") || _transformPropCSS === p) s[p.replace(_camelExp, _camelFunc)] = cs.getPropertyValue(p);
                    } else for (i in cs) if (-1 === i.indexOf("Transform") || _transformProp === i) s[i] = cs[i];
                } else if (cs = t.currentStyle || t.style) for (i in cs) if ("string" === typeof i && void 0 === s[i]) s[i.replace(_camelExp, _camelFunc)] = cs[i];
                if (!_supportsOpacity) s.opacity = _getIEOpacity(t);
                tr = _getTransform(t, cs, false);
                s.rotation = tr.rotation;
                s.skewX = tr.skewX;
                s.scaleX = tr.scaleX;
                s.scaleY = tr.scaleY;
                s.x = tr.x;
                s.y = tr.y;
                if (_supports3D) {
                    s.z = tr.z;
                    s.rotationX = tr.rotationX;
                    s.rotationY = tr.rotationY;
                    s.scaleZ = tr.scaleZ;
                }
                if (s.filters) delete s.filters;
                return s;
            }, _cssDif = function(t, s1, s2, vars, forceLookup) {
                var val, p, mpt, difs = {}, style = t.style;
                for (p in s2) if ("cssText" !== p) if ("length" !== p) if (isNaN(p)) if (s1[p] !== (val = s2[p]) || forceLookup && forceLookup[p]) if (-1 === p.indexOf("Origin")) if ("number" === typeof val || "string" === typeof val) {
                    difs[p] = "auto" === val && ("left" === p || "top" === p) ? _calculateOffset(t, p) : ("" === val || "auto" === val || "none" === val) && "string" === typeof s1[p] && "" !== s1[p].replace(_NaNExp, "") ? 0 : val;
                    if (void 0 !== style[p]) mpt = new MiniPropTween(style, p, style[p], mpt);
                }
                if (vars) for (p in vars) if ("className" !== p) difs[p] = vars[p];
                return {
                    difs,
                    firstMPT: mpt
                };
            }, _dimensions = {
                width: [ "Left", "Right" ],
                height: [ "Top", "Bottom" ]
            }, _margins = [ "marginLeft", "marginRight", "marginTop", "marginBottom" ], _getDimension = function(t, p, cs) {
                if ("svg" === (t.nodeName + "").toLowerCase()) return (cs || _getComputedStyle(t))[p] || 0; else if (t.getCTM && _isSVG(t)) return t.getBBox()[p] || 0;
                var v = parseFloat("width" === p ? t.offsetWidth : t.offsetHeight), a = _dimensions[p], i = a.length;
                cs = cs || _getComputedStyle(t, null);
                while (--i > -1) {
                    v -= parseFloat(_getStyle(t, "padding" + a[i], cs, true)) || 0;
                    v -= parseFloat(_getStyle(t, "border" + a[i] + "Width", cs, true)) || 0;
                }
                return v;
            }, _parsePosition = function(v, recObj) {
                if ("contain" === v || "auto" === v || "auto auto" === v) return v + " ";
                if (null == v || "" === v) v = "0 0";
                var i, a = v.split(" "), x = -1 !== v.indexOf("left") ? "0%" : -1 !== v.indexOf("right") ? "100%" : a[0], y = -1 !== v.indexOf("top") ? "0%" : -1 !== v.indexOf("bottom") ? "100%" : a[1];
                if (a.length > 3 && !recObj) {
                    a = v.split(", ").join(",").split(",");
                    v = [];
                    for (i = 0; i < a.length; i++) v.push(_parsePosition(a[i]));
                    return v.join(",");
                }
                if (null == y) y = "center" === x ? "50%" : "0"; else if ("center" === y) y = "50%";
                if ("center" === x || isNaN(parseFloat(x)) && -1 === (x + "").indexOf("=")) x = "50%";
                v = x + " " + y + (a.length > 2 ? " " + a[2] : "");
                if (recObj) {
                    recObj.oxp = -1 !== x.indexOf("%");
                    recObj.oyp = -1 !== y.indexOf("%");
                    recObj.oxr = "=" === x.charAt(1);
                    recObj.oyr = "=" === y.charAt(1);
                    recObj.ox = parseFloat(x.replace(_NaNExp, ""));
                    recObj.oy = parseFloat(y.replace(_NaNExp, ""));
                    recObj.v = v;
                }
                return recObj || v;
            }, _parseChange = function(e, b) {
                if ("function" === typeof e) e = e(_index, _target);
                return "string" === typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(b) || 0;
            }, _parseVal = function(v, d) {
                if ("function" === typeof v) v = v(_index, _target);
                var isRelative = "string" === typeof v && "=" === v.charAt(1);
                if ("string" === typeof v && "v" === v.charAt(v.length - 2)) v = (isRelative ? v.substr(0, 2) : 0) + window["inner" + ("vh" === v.substr(-2) ? "Height" : "Width")] * (parseFloat(isRelative ? v.substr(2) : v) / 100);
                return null == v ? d : isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(v.substr(2)) + d : parseFloat(v) || 0;
            }, _parseAngle = function(v, d, p, directionalEnd) {
                var cap, split, dif, result, isRelative, min = 1e-6;
                if ("function" === typeof v) v = v(_index, _target);
                if (null == v) result = d; else if ("number" === typeof v) result = v; else {
                    cap = 360;
                    split = v.split("_");
                    isRelative = "=" === v.charAt(1);
                    dif = (isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(split[0].substr(2)) : parseFloat(split[0])) * (-1 === v.indexOf("rad") ? 1 : _RAD2DEG) - (isRelative ? 0 : d);
                    if (split.length) {
                        if (directionalEnd) directionalEnd[p] = d + dif;
                        if (-1 !== v.indexOf("short")) {
                            dif %= cap;
                            if (dif !== dif % (cap / 2)) dif = dif < 0 ? dif + cap : dif - cap;
                        }
                        if (-1 !== v.indexOf("_cw") && dif < 0) dif = (dif + 9999999999 * cap) % cap - (dif / cap | 0) * cap; else if (-1 !== v.indexOf("ccw") && dif > 0) dif = (dif - 9999999999 * cap) % cap - (dif / cap | 0) * cap;
                    }
                    result = d + dif;
                }
                if (result < min && result > -min) result = 0;
                return result;
            }, _colorLookup = {
                aqua: [ 0, 255, 255 ],
                lime: [ 0, 255, 0 ],
                silver: [ 192, 192, 192 ],
                black: [ 0, 0, 0 ],
                maroon: [ 128, 0, 0 ],
                teal: [ 0, 128, 128 ],
                blue: [ 0, 0, 255 ],
                navy: [ 0, 0, 128 ],
                white: [ 255, 255, 255 ],
                fuchsia: [ 255, 0, 255 ],
                olive: [ 128, 128, 0 ],
                yellow: [ 255, 255, 0 ],
                orange: [ 255, 165, 0 ],
                gray: [ 128, 128, 128 ],
                purple: [ 128, 0, 128 ],
                green: [ 0, 128, 0 ],
                red: [ 255, 0, 0 ],
                pink: [ 255, 192, 203 ],
                cyan: [ 0, 255, 255 ],
                transparent: [ 255, 255, 255, 0 ]
            }, _hue = function(h, m1, m2) {
                h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
                return 255 * (6 * h < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : 3 * h < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) + .5 | 0;
            }, _parseColor = CSSPlugin.parseColor = function(v, toHSL) {
                var a, r, g, b, h, s, l, max, min, d, wasHSL;
                if (!v) a = _colorLookup.black; else if ("number" === typeof v) a = [ v >> 16, v >> 8 & 255, 255 & v ]; else {
                    if ("," === v.charAt(v.length - 1)) v = v.substr(0, v.length - 1);
                    if (_colorLookup[v]) a = _colorLookup[v]; else if ("#" === v.charAt(0)) {
                        if (4 === v.length) {
                            r = v.charAt(1);
                            g = v.charAt(2);
                            b = v.charAt(3);
                            v = "#" + r + r + g + g + b + b;
                        }
                        v = parseInt(v.substr(1), 16);
                        a = [ v >> 16, v >> 8 & 255, 255 & v ];
                    } else if ("hsl" === v.substr(0, 3)) {
                        a = wasHSL = v.match(_numExp);
                        if (!toHSL) {
                            h = Number(a[0]) % 360 / 360;
                            s = Number(a[1]) / 100;
                            l = Number(a[2]) / 100;
                            g = l <= .5 ? l * (s + 1) : l + s - l * s;
                            r = 2 * l - g;
                            if (a.length > 3) a[3] = Number(a[3]);
                            a[0] = _hue(h + 1 / 3, r, g);
                            a[1] = _hue(h, r, g);
                            a[2] = _hue(h - 1 / 3, r, g);
                        } else if (-1 !== v.indexOf("=")) return v.match(_relNumExp);
                    } else a = v.match(_numExp) || _colorLookup.transparent;
                    a[0] = Number(a[0]);
                    a[1] = Number(a[1]);
                    a[2] = Number(a[2]);
                    if (a.length > 3) a[3] = Number(a[3]);
                }
                if (toHSL && !wasHSL) {
                    r = a[0] / 255;
                    g = a[1] / 255;
                    b = a[2] / 255;
                    max = Math.max(r, g, b);
                    min = Math.min(r, g, b);
                    l = (max + min) / 2;
                    if (max === min) h = s = 0; else {
                        d = max - min;
                        s = l > .5 ? d / (2 - max - min) : d / (max + min);
                        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
                        h *= 60;
                    }
                    a[0] = h + .5 | 0;
                    a[1] = 100 * s + .5 | 0;
                    a[2] = 100 * l + .5 | 0;
                }
                return a;
            }, _formatColors = function(s, toHSL) {
                var i, color, temp, colors = s.match(_colorExp) || [], charIndex = 0, parsed = "";
                if (!colors.length) return s;
                for (i = 0; i < colors.length; i++) {
                    color = colors[i];
                    temp = s.substr(charIndex, s.indexOf(color, charIndex) - charIndex);
                    charIndex += temp.length + color.length;
                    color = _parseColor(color, toHSL);
                    if (3 === color.length) color.push(1);
                    parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
                }
                return parsed + s.substr(charIndex);
            }, _colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (p in _colorLookup) _colorExp += "|" + p + "\\b";
            _colorExp = new RegExp(_colorExp + ")", "gi");
            CSSPlugin.colorStringFilter = function(a) {
                var toHSL, combined = a[0] + " " + a[1];
                if (_colorExp.test(combined)) {
                    toHSL = -1 !== combined.indexOf("hsl(") || -1 !== combined.indexOf("hsla(");
                    a[0] = _formatColors(a[0], toHSL);
                    a[1] = _formatColors(a[1], toHSL);
                }
                _colorExp.lastIndex = 0;
            };
            if (!TweenLite.ZP.defaultStringFilter) TweenLite.ZP.defaultStringFilter = CSSPlugin.colorStringFilter;
            var _getFormatter = function(dflt, clr, collapsible, multi) {
                if (null == dflt) return function(v) {
                    return v;
                };
                var formatter, dColor = clr ? (dflt.match(_colorExp) || [ "" ])[0] : "", dVals = dflt.split(dColor).join("").match(_valuesExp) || [], pfx = dflt.substr(0, dflt.indexOf(dVals[0])), sfx = ")" === dflt.charAt(dflt.length - 1) ? ")" : "", delim = -1 !== dflt.indexOf(" ") ? " " : ",", numVals = dVals.length, dSfx = numVals > 0 ? dVals[0].replace(_numExp, "") : "";
                if (!numVals) return function(v) {
                    return v;
                };
                if (clr) {
                    formatter = function(v) {
                        var color, vals, i, a;
                        if ("number" === typeof v) v += dSfx; else if (multi && _commasOutsideParenExp.test(v)) {
                            a = v.replace(_commasOutsideParenExp, "|").split("|");
                            for (i = 0; i < a.length; i++) a[i] = formatter(a[i]);
                            return a.join(",");
                        }
                        color = (v.match(_colorExp) || [ dColor ])[0];
                        vals = v.split(color).join("").match(_valuesExp) || [];
                        i = vals.length;
                        if (numVals > i--) while (++i < numVals) vals[i] = collapsible ? vals[(i - 1) / 2 | 0] : dVals[i];
                        return pfx + vals.join(delim) + delim + color + sfx + (-1 !== v.indexOf("inset") ? " inset" : "");
                    };
                    return formatter;
                }
                formatter = function(v) {
                    var vals, a, i;
                    if ("number" === typeof v) v += dSfx; else if (multi && _commasOutsideParenExp.test(v)) {
                        a = v.replace(_commasOutsideParenExp, "|").split("|");
                        for (i = 0; i < a.length; i++) a[i] = formatter(a[i]);
                        return a.join(",");
                    }
                    vals = v.match("," === delim ? _valuesExp : _valuesExpWithCommas) || [];
                    i = vals.length;
                    if (numVals > i--) while (++i < numVals) vals[i] = collapsible ? vals[(i - 1) / 2 | 0] : dVals[i];
                    return (pfx && "none" !== v ? v.substr(0, v.indexOf(vals[0])) || pfx : pfx) + vals.join(delim) + sfx;
                };
                return formatter;
            }, _getEdgeParser = function(props) {
                props = props.split(",");
                return function(t, e, p, cssp, pt, plugin, vars) {
                    var i, a = (e + "").split(" ");
                    vars = {};
                    for (i = 0; i < 4; i++) vars[props[i]] = a[i] = a[i] || a[(i - 1) / 2 >> 0];
                    return cssp.parse(t, vars, pt, plugin);
                };
            }, MiniPropTween = (_internals._setPluginRatio = function(v) {
                this.plugin.setRatio(v);
                var val, pt, i, str, p, d = this.data, proxy = d.proxy, mpt = d.firstMPT, min = 1e-6;
                while (mpt) {
                    val = proxy[mpt.v];
                    if (mpt.r) val = mpt.r(val); else if (val < min && val > -min) val = 0;
                    mpt.t[mpt.p] = val;
                    mpt = mpt._next;
                }
                if (d.autoRotate) d.autoRotate.rotation = d.mod ? d.mod.call(this._tween, proxy.rotation, this.t, this._tween) : proxy.rotation;
                if (1 === v || 0 === v) {
                    mpt = d.firstMPT;
                    p = 1 === v ? "e" : "b";
                    while (mpt) {
                        pt = mpt.t;
                        if (!pt.type) pt[p] = pt.s + pt.xs0; else if (1 === pt.type) {
                            str = pt.xs0 + pt.s + pt.xs1;
                            for (i = 1; i < pt.l; i++) str += pt["xn" + i] + pt["xs" + (i + 1)];
                            pt[p] = str;
                        }
                        mpt = mpt._next;
                    }
                }
            }, function(t, p, v, next, r) {
                this.t = t;
                this.p = p;
                this.v = v;
                this.r = r;
                if (next) {
                    next._prev = this;
                    this._next = next;
                }
            }), CSSPropTween = (_internals._parseToProxy = function(t, vars, cssp, pt, plugin, shallow) {
                var i, p, xp, mpt, firstPT, bpt = pt, start = {}, end = {}, transform = cssp._transform, oldForce = _forcePT;
                cssp._transform = null;
                _forcePT = vars;
                pt = firstPT = cssp.parse(t, vars, pt, plugin);
                _forcePT = oldForce;
                if (shallow) {
                    cssp._transform = transform;
                    if (bpt) {
                        bpt._prev = null;
                        if (bpt._prev) bpt._prev._next = null;
                    }
                }
                while (pt && pt !== bpt) {
                    if (pt.type <= 1) {
                        p = pt.p;
                        end[p] = pt.s + pt.c;
                        start[p] = pt.s;
                        if (!shallow) {
                            mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
                            pt.c = 0;
                        }
                        if (1 === pt.type) {
                            i = pt.l;
                            while (--i > 0) {
                                xp = "xn" + i;
                                p = pt.p + "_" + xp;
                                end[p] = pt.data[xp];
                                start[p] = pt[xp];
                                if (!shallow) mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]);
                            }
                        }
                    }
                    pt = pt._next;
                }
                return {
                    proxy: start,
                    end,
                    firstMPT: mpt,
                    pt: firstPT
                };
            }, _internals.CSSPropTween = function(t, p, s, c, next, type, n, r, pr, b, e) {
                this.t = t;
                this.p = p;
                this.s = s;
                this.c = c;
                this.n = n || p;
                if (!(t instanceof CSSPropTween)) _overwriteProps.push(this.n);
                this.r = !r ? r : "function" === typeof r ? r : Math.round;
                this.type = type || 0;
                if (pr) {
                    this.pr = pr;
                    _hasPriority = true;
                }
                this.b = void 0 === b ? s : b;
                this.e = void 0 === e ? s + c : e;
                if (next) {
                    this._next = next;
                    next._prev = this;
                }
            }), _addNonTweeningNumericPT = function(target, prop, start, end, next, overwriteProp) {
                var pt = new CSSPropTween(target, prop, start, end - start, next, -1, overwriteProp);
                pt.b = start;
                pt.e = pt.xs0 = end;
                return pt;
            }, _parseComplex = CSSPlugin.parseComplex = function(t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
                b = b || dflt || "";
                if ("function" === typeof e) e = e(_index, _target);
                pt = new CSSPropTween(t, p, 0, 0, pt, setRatio ? 2 : 1, null, false, pr, b, e);
                e += "";
                if (clrs && _colorExp.test(e + b)) {
                    e = [ b, e ];
                    CSSPlugin.colorStringFilter(e);
                    b = e[0];
                    e = e[1];
                }
                var i, xi, ni, bv, ev, bnums, enums, bn, hasAlpha, temp, cv, str, useHSL, ba = b.split(", ").join(",").split(" "), ea = e.split(", ").join(",").split(" "), l = ba.length, autoRound = false !== _autoRound;
                if (-1 !== e.indexOf(",") || -1 !== b.indexOf(",")) {
                    if (-1 !== (e + b).indexOf("rgb") || -1 !== (e + b).indexOf("hsl")) {
                        ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
                        ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
                    } else {
                        ba = ba.join(" ").split(",").join(", ").split(" ");
                        ea = ea.join(" ").split(",").join(", ").split(" ");
                    }
                    l = ba.length;
                }
                if (l !== ea.length) {
                    ba = (dflt || "").split(" ");
                    l = ba.length;
                }
                pt.plugin = plugin;
                pt.setRatio = setRatio;
                _colorExp.lastIndex = 0;
                for (i = 0; i < l; i++) {
                    bv = ba[i];
                    ev = ea[i] + "";
                    bn = parseFloat(bv);
                    if (bn || 0 === bn) pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), autoRound && -1 !== ev.indexOf("px") ? Math.round : false, true); else if (clrs && _colorExp.test(bv)) {
                        str = ev.indexOf(")") + 1;
                        str = ")" + (str ? ev.substr(str) : "");
                        useHSL = -1 !== ev.indexOf("hsl") && _supportsOpacity;
                        temp = ev;
                        bv = _parseColor(bv, useHSL);
                        ev = _parseColor(ev, useHSL);
                        hasAlpha = bv.length + ev.length > 6;
                        if (hasAlpha && !_supportsOpacity && 0 === ev[3]) {
                            pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
                            pt.e = pt.e.split(ea[i]).join("transparent");
                        } else {
                            if (!_supportsOpacity) hasAlpha = false;
                            if (useHSL) pt.appendXtra(temp.substr(0, temp.indexOf("hsl")) + (hasAlpha ? "hsla(" : "hsl("), bv[0], _parseChange(ev[0], bv[0]), ",", false, true).appendXtra("", bv[1], _parseChange(ev[1], bv[1]), "%,", false).appendXtra("", bv[2], _parseChange(ev[2], bv[2]), hasAlpha ? "%," : "%" + str, false); else pt.appendXtra(temp.substr(0, temp.indexOf("rgb")) + (hasAlpha ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", Math.round, true).appendXtra("", bv[1], ev[1] - bv[1], ",", Math.round).appendXtra("", bv[2], ev[2] - bv[2], hasAlpha ? "," : str, Math.round);
                            if (hasAlpha) {
                                bv = bv.length < 4 ? 1 : bv[3];
                                pt.appendXtra("", bv, (ev.length < 4 ? 1 : ev[3]) - bv, str, false);
                            }
                        }
                        _colorExp.lastIndex = 0;
                    } else {
                        bnums = bv.match(_numExp);
                        if (!bnums) pt["xs" + pt.l] += pt.l || pt["xs" + pt.l] ? " " + ev : ev; else {
                            enums = ev.match(_relNumExp);
                            if (!enums || enums.length !== bnums.length) return pt;
                            ni = 0;
                            for (xi = 0; xi < bnums.length; xi++) {
                                cv = bnums[xi];
                                temp = bv.indexOf(cv, ni);
                                pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", autoRound && "px" === bv.substr(temp + cv.length, 2) ? Math.round : false, 0 === xi);
                                ni = temp + cv.length;
                            }
                            pt["xs" + pt.l] += bv.substr(ni);
                        }
                    }
                }
                if (-1 !== e.indexOf("=")) if (pt.data) {
                    str = pt.xs0 + pt.data.s;
                    for (i = 1; i < pt.l; i++) str += pt["xs" + i] + pt.data["xn" + i];
                    pt.e = str + pt["xs" + i];
                }
                if (!pt.l) {
                    pt.type = -1;
                    pt.xs0 = pt.e;
                }
                return pt.xfirst || pt;
            }, i = 9;
            p = CSSPropTween.prototype;
            p.l = p.pr = 0;
            while (--i > 0) {
                p["xn" + i] = 0;
                p["xs" + i] = "";
            }
            p.xs0 = "";
            p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;
            p.appendXtra = function(pfx, s, c, sfx, r, pad) {
                var pt = this, l = pt.l;
                pt["xs" + l] += pad && (l || pt["xs" + l]) ? " " + pfx : pfx || "";
                if (!c) if (0 !== l && !pt.plugin) {
                    pt["xs" + l] += s + (sfx || "");
                    return pt;
                }
                pt.l++;
                pt.type = pt.setRatio ? 2 : 1;
                pt["xs" + pt.l] = sfx || "";
                if (l > 0) {
                    pt.data["xn" + l] = s + c;
                    pt.rxp["xn" + l] = r;
                    pt["xn" + l] = s;
                    if (!pt.plugin) {
                        pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
                        pt.xfirst.xs0 = 0;
                    }
                    return pt;
                }
                pt.data = {
                    s: s + c
                };
                pt.rxp = {};
                pt.s = s;
                pt.c = c;
                pt.r = r;
                return pt;
            };
            var SpecialProp = function(p, options) {
                options = options || {};
                this.p = options.prefix ? _checkPropPrefix(p) || p : p;
                _specialProps[p] = _specialProps[this.p] = this;
                this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);
                if (options.parser) this.parse = options.parser;
                this.clrs = options.color;
                this.multi = options.multi;
                this.keyword = options.keyword;
                this.dflt = options.defaultValue;
                this.allowFunc = options.allowFunc;
                this.pr = options.priority || 0;
            }, _registerComplexSpecialProp = _internals._registerComplexSpecialProp = function(p, options, defaults) {
                if ("object" !== typeof options) options = {
                    parser: defaults
                };
                var i, a = p.split(","), d = options.defaultValue;
                defaults = defaults || [ d ];
                for (i = 0; i < a.length; i++) {
                    options.prefix = 0 === i && options.prefix;
                    options.defaultValue = defaults[i] || d;
                    new SpecialProp(a[i], options);
                }
            }, _registerPluginProp = _internals._registerPluginProp = function(p) {
                if (!_specialProps[p]) {
                    var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";
                    _registerComplexSpecialProp(p, {
                        parser: function(t, e, p, cssp, pt, plugin, vars) {
                            var pluginClass = _globals.com.greensock.plugins[pluginName];
                            if (!pluginClass) {
                                _log("Error: " + pluginName + " js file not loaded.");
                                return pt;
                            }
                            pluginClass._cssRegister();
                            return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars);
                        }
                    });
                }
            };
            p = SpecialProp.prototype;
            p.parseComplex = function(t, b, e, pt, plugin, setRatio) {
                var i, ba, ea, l, bi, ei, kwd = this.keyword;
                if (this.multi) if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
                    ba = b.replace(_commasOutsideParenExp, "|").split("|");
                    ea = e.replace(_commasOutsideParenExp, "|").split("|");
                } else if (kwd) {
                    ba = [ b ];
                    ea = [ e ];
                }
                if (ea) {
                    l = ea.length > ba.length ? ea.length : ba.length;
                    for (i = 0; i < l; i++) {
                        b = ba[i] = ba[i] || this.dflt;
                        e = ea[i] = ea[i] || this.dflt;
                        if (kwd) {
                            bi = b.indexOf(kwd);
                            ei = e.indexOf(kwd);
                            if (bi !== ei) if (-1 === ei) ba[i] = ba[i].split(kwd).join(""); else if (-1 === bi) ba[i] += " " + kwd;
                        }
                    }
                    b = ba.join(", ");
                    e = ea.join(", ");
                }
                return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
            };
            p.parse = function(t, e, p, cssp, pt, plugin, vars) {
                return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
            };
            CSSPlugin.registerSpecialProp = function(name, onInitTween, priority) {
                _registerComplexSpecialProp(name, {
                    parser: function(t, e, p, cssp, pt, plugin, vars) {
                        var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, false, priority);
                        rv.plugin = plugin;
                        rv.setRatio = onInitTween(t, e, cssp._tween, p);
                        return rv;
                    },
                    priority
                });
            };
            CSSPlugin.useSVGTransformAttr = true;
            var _useSVGTransformAttr, _transformProps = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","), _transformProp = _checkPropPrefix("transform"), _transformPropCSS = _prefixCSS + "transform", _transformOriginProp = _checkPropPrefix("transformOrigin"), _supports3D = null !== _checkPropPrefix("perspective"), Transform = _internals.Transform = function() {
                this.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
                this.force3D = false === CSSPlugin.defaultForce3D || !_supports3D ? false : CSSPlugin.defaultForce3D || "auto";
            }, _SVGElement = TweenLite.ML.SVGElement, _createSVG = function(type, container, attributes) {
                var p, element = _doc.createElementNS("http://www.w3.org/2000/svg", type), reg = /([a-z])([A-Z])/g;
                for (p in attributes) element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
                container.appendChild(element);
                return element;
            }, _docElement = _doc.documentElement || {}, _forceSVGTransformAttr = function() {
                var svg, rect, width, force = _ieVers || /Android/i.test(_agent) && !TweenLite.ML.chrome;
                if (_doc.createElementNS && _docElement.appendChild && !force) {
                    svg = _createSVG("svg", _docElement);
                    rect = _createSVG("rect", svg, {
                        width: 100,
                        height: 50,
                        x: 100
                    });
                    width = rect.getBoundingClientRect().width;
                    rect.style[_transformOriginProp] = "50% 50%";
                    rect.style[_transformProp] = "scaleX(0.5)";
                    force = width === rect.getBoundingClientRect().width && !(_isFirefox && _supports3D);
                    _docElement.removeChild(svg);
                }
                return force;
            }(), _parseSVGOrigin = function(e, local, decoratee, absolute, smoothOrigin, skipRecord) {
                var v, x, y, xOrigin, yOrigin, a, b, c, d, tx, ty, determinant, xOriginOld, yOriginOld, tm = e._gsTransform, m = _getMatrix(e, true);
                if (tm) {
                    xOriginOld = tm.xOrigin;
                    yOriginOld = tm.yOrigin;
                }
                if (!absolute || (v = absolute.split(" ")).length < 2) {
                    b = e.getBBox();
                    if (0 === b.x && 0 === b.y && b.width + b.height === 0) b = {
                        x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0,
                        y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0,
                        width: 0,
                        height: 0
                    };
                    local = _parsePosition(local).split(" ");
                    v = [ (-1 !== local[0].indexOf("%") ? parseFloat(local[0]) / 100 * b.width : parseFloat(local[0])) + b.x, (-1 !== local[1].indexOf("%") ? parseFloat(local[1]) / 100 * b.height : parseFloat(local[1])) + b.y ];
                }
                decoratee.xOrigin = xOrigin = parseFloat(v[0]);
                decoratee.yOrigin = yOrigin = parseFloat(v[1]);
                if (absolute && m !== _identity2DMatrix) {
                    a = m[0];
                    b = m[1];
                    c = m[2];
                    d = m[3];
                    tx = m[4];
                    ty = m[5];
                    determinant = a * d - b * c;
                    if (determinant) {
                        x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
                        y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
                        xOrigin = decoratee.xOrigin = v[0] = x;
                        yOrigin = decoratee.yOrigin = v[1] = y;
                    }
                }
                if (tm) {
                    if (skipRecord) {
                        decoratee.xOffset = tm.xOffset;
                        decoratee.yOffset = tm.yOffset;
                        tm = decoratee;
                    }
                    if (smoothOrigin || false !== smoothOrigin && false !== CSSPlugin.defaultSmoothOrigin) {
                        x = xOrigin - xOriginOld;
                        y = yOrigin - yOriginOld;
                        tm.xOffset += x * m[0] + y * m[2] - x;
                        tm.yOffset += x * m[1] + y * m[3] - y;
                    } else tm.xOffset = tm.yOffset = 0;
                }
                if (!skipRecord) e.setAttribute("data-svg-origin", v.join(" "));
            }, _getBBoxHack = function(swapIfPossible) {
                var bbox, svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), oldParent = this.parentNode, oldSibling = this.nextSibling, oldCSS = this.style.cssText;
                _docElement.appendChild(svg);
                svg.appendChild(this);
                this.style.display = "block";
                if (swapIfPossible) try {
                    bbox = this.getBBox();
                    this._originalGetBBox = this.getBBox;
                    this.getBBox = _getBBoxHack;
                } catch (e) {} else if (this._originalGetBBox) bbox = this._originalGetBBox();
                if (oldSibling) oldParent.insertBefore(this, oldSibling); else oldParent.appendChild(this);
                _docElement.removeChild(svg);
                this.style.cssText = oldCSS;
                return bbox;
            }, _getBBox = function(e) {
                try {
                    return e.getBBox();
                } catch (error) {
                    return _getBBoxHack.call(e, true);
                }
            }, _isSVG = function(e) {
                return !!(_SVGElement && e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
            }, _identity2DMatrix = [ 1, 0, 0, 1, 0, 0 ], _getMatrix = function(e, force2D) {
                var isDefault, s, m, n, dec, nextSibling, parent, tm = e._gsTransform || new Transform, rnd = 1e5, style = e.style;
                if (_transformProp) s = _getStyle(e, _transformPropCSS, null, true); else if (e.currentStyle) {
                    s = e.currentStyle.filter.match(_ieGetMatrixExp);
                    s = s && 4 === s.length ? [ s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), tm.x || 0, tm.y || 0 ].join(",") : "";
                }
                isDefault = !s || "none" === s || "matrix(1, 0, 0, 1, 0, 0)" === s;
                if (_transformProp && isDefault && !e.offsetParent && e !== _docElement) {
                    n = style.display;
                    style.display = "block";
                    parent = e.parentNode;
                    if (!parent || !e.offsetParent) {
                        dec = 1;
                        nextSibling = e.nextSibling;
                        _docElement.appendChild(e);
                    }
                    s = _getStyle(e, _transformPropCSS, null, true);
                    isDefault = !s || "none" === s || "matrix(1, 0, 0, 1, 0, 0)" === s;
                    if (n) style.display = n; else _removeProp(style, "display");
                    if (dec) if (nextSibling) parent.insertBefore(e, nextSibling); else if (parent) parent.appendChild(e); else _docElement.removeChild(e);
                }
                if (tm.svg || e.getCTM && _isSVG(e)) {
                    if (isDefault && -1 !== (style[_transformProp] + "").indexOf("matrix")) {
                        s = style[_transformProp];
                        isDefault = 0;
                    }
                    m = e.getAttribute("transform");
                    if (isDefault && m) {
                        m = e.transform.baseVal.consolidate().matrix;
                        s = "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + m.e + "," + m.f + ")";
                        isDefault = 0;
                    }
                }
                if (isDefault) return _identity2DMatrix;
                m = (s || "").match(_numExp) || [];
                i = m.length;
                while (--i > -1) {
                    n = Number(m[i]);
                    m[i] = (dec = n - (n |= 0)) ? (dec * rnd + (dec < 0 ? -.5 : .5) | 0) / rnd + n : n;
                }
                return force2D && m.length > 6 ? [ m[0], m[1], m[4], m[5], m[12], m[13] ] : m;
            }, _getTransform = _internals.getTransform = function(t, cs, rec, parse) {
                if (t._gsTransform && rec && !parse) return t._gsTransform;
                var m, i, scaleX, scaleY, rotation, skewX, tm = rec ? t._gsTransform || new Transform : new Transform, invX = tm.scaleX < 0, min = 2e-5, rnd = 1e5, zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin || 0 : 0, defaultTransformPerspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
                tm.svg = !!(t.getCTM && _isSVG(t));
                if (tm.svg) {
                    _parseSVGOrigin(t, _getStyle(t, _transformOriginProp, cs, false, "50% 50%") + "", tm, t.getAttribute("data-svg-origin"));
                    _useSVGTransformAttr = CSSPlugin.useSVGTransformAttr || _forceSVGTransformAttr;
                }
                m = _getMatrix(t);
                if (m !== _identity2DMatrix) {
                    if (16 === m.length) {
                        var t1, t2, t3, cos, sin, a11 = m[0], a21 = m[1], a31 = m[2], a41 = m[3], a12 = m[4], a22 = m[5], a32 = m[6], a42 = m[7], a13 = m[8], a23 = m[9], a33 = m[10], a14 = m[12], a24 = m[13], a34 = m[14], a43 = m[11], angle = Math.atan2(a32, a33);
                        if (tm.zOrigin) {
                            a34 = -tm.zOrigin;
                            a14 = a13 * a34 - m[12];
                            a24 = a23 * a34 - m[13];
                            a34 = a33 * a34 + tm.zOrigin - m[14];
                        }
                        tm.rotationX = angle * _RAD2DEG;
                        if (angle) {
                            cos = Math.cos(-angle);
                            sin = Math.sin(-angle);
                            t1 = a12 * cos + a13 * sin;
                            t2 = a22 * cos + a23 * sin;
                            t3 = a32 * cos + a33 * sin;
                            a13 = a12 * -sin + a13 * cos;
                            a23 = a22 * -sin + a23 * cos;
                            a33 = a32 * -sin + a33 * cos;
                            a43 = a42 * -sin + a43 * cos;
                            a12 = t1;
                            a22 = t2;
                            a32 = t3;
                        }
                        angle = Math.atan2(-a31, a33);
                        tm.rotationY = angle * _RAD2DEG;
                        if (angle) {
                            cos = Math.cos(-angle);
                            sin = Math.sin(-angle);
                            t1 = a11 * cos - a13 * sin;
                            t2 = a21 * cos - a23 * sin;
                            t3 = a31 * cos - a33 * sin;
                            a23 = a21 * sin + a23 * cos;
                            a33 = a31 * sin + a33 * cos;
                            a43 = a41 * sin + a43 * cos;
                            a11 = t1;
                            a21 = t2;
                            a31 = t3;
                        }
                        angle = Math.atan2(a21, a11);
                        tm.rotation = angle * _RAD2DEG;
                        if (angle) {
                            cos = Math.cos(angle);
                            sin = Math.sin(angle);
                            t1 = a11 * cos + a21 * sin;
                            t2 = a12 * cos + a22 * sin;
                            t3 = a13 * cos + a23 * sin;
                            a21 = a21 * cos - a11 * sin;
                            a22 = a22 * cos - a12 * sin;
                            a23 = a23 * cos - a13 * sin;
                            a11 = t1;
                            a12 = t2;
                            a13 = t3;
                        }
                        if (tm.rotationX && Math.abs(tm.rotationX) + Math.abs(tm.rotation) > 359.9) {
                            tm.rotationX = tm.rotation = 0;
                            tm.rotationY = 180 - tm.rotationY;
                        }
                        angle = Math.atan2(a12, a22);
                        tm.scaleX = (Math.sqrt(a11 * a11 + a21 * a21 + a31 * a31) * rnd + .5 | 0) / rnd;
                        tm.scaleY = (Math.sqrt(a22 * a22 + a32 * a32) * rnd + .5 | 0) / rnd;
                        tm.scaleZ = (Math.sqrt(a13 * a13 + a23 * a23 + a33 * a33) * rnd + .5 | 0) / rnd;
                        a11 /= tm.scaleX;
                        a12 /= tm.scaleY;
                        a21 /= tm.scaleX;
                        a22 /= tm.scaleY;
                        if (Math.abs(angle) > min) {
                            tm.skewX = angle * _RAD2DEG;
                            a12 = 0;
                            if ("simple" !== tm.skewType) tm.scaleY *= 1 / Math.cos(angle);
                        } else tm.skewX = 0;
                        tm.perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
                        tm.x = a14;
                        tm.y = a24;
                        tm.z = a34;
                        if (tm.svg) {
                            tm.x -= tm.xOrigin - (tm.xOrigin * a11 - tm.yOrigin * a12);
                            tm.y -= tm.yOrigin - (tm.yOrigin * a21 - tm.xOrigin * a22);
                        }
                    } else if (!_supports3D || parse || !m.length || tm.x !== m[4] || tm.y !== m[5] || !tm.rotationX && !tm.rotationY) {
                        var k = m.length >= 6, a = k ? m[0] : 1, b = m[1] || 0, c = m[2] || 0, d = k ? m[3] : 1;
                        tm.x = m[4] || 0;
                        tm.y = m[5] || 0;
                        scaleX = Math.sqrt(a * a + b * b);
                        scaleY = Math.sqrt(d * d + c * c);
                        rotation = a || b ? Math.atan2(b, a) * _RAD2DEG : tm.rotation || 0;
                        skewX = c || d ? Math.atan2(c, d) * _RAD2DEG + rotation : tm.skewX || 0;
                        tm.scaleX = scaleX;
                        tm.scaleY = scaleY;
                        tm.rotation = rotation;
                        tm.skewX = skewX;
                        if (_supports3D) {
                            tm.rotationX = tm.rotationY = tm.z = 0;
                            tm.perspective = defaultTransformPerspective;
                            tm.scaleZ = 1;
                        }
                        if (tm.svg) {
                            tm.x -= tm.xOrigin - (tm.xOrigin * a + tm.yOrigin * c);
                            tm.y -= tm.yOrigin - (tm.xOrigin * b + tm.yOrigin * d);
                        }
                    }
                    if (Math.abs(tm.skewX) > 90 && Math.abs(tm.skewX) < 270) if (invX) {
                        tm.scaleX *= -1;
                        tm.skewX += tm.rotation <= 0 ? 180 : -180;
                        tm.rotation += tm.rotation <= 0 ? 180 : -180;
                    } else {
                        tm.scaleY *= -1;
                        tm.skewX += tm.skewX <= 0 ? 180 : -180;
                    }
                    tm.zOrigin = zOrigin;
                    for (i in tm) if (tm[i] < min) if (tm[i] > -min) tm[i] = 0;
                }
                if (rec) {
                    t._gsTransform = tm;
                    if (tm.svg) if (_useSVGTransformAttr && t.style[_transformProp]) TweenLite.ZP.delayedCall(.001, (function() {
                        _removeProp(t.style, _transformProp);
                    })); else if (!_useSVGTransformAttr && t.getAttribute("transform")) TweenLite.ZP.delayedCall(.001, (function() {
                        t.removeAttribute("transform");
                    }));
                }
                return tm;
            }, _setIETransformRatio = function(v) {
                var filters, val, t = this.data, ang = -t.rotation * _DEG2RAD, skew = ang + t.skewX * _DEG2RAD, rnd = 1e5, a = (Math.cos(ang) * t.scaleX * rnd | 0) / rnd, b = (Math.sin(ang) * t.scaleX * rnd | 0) / rnd, c = (Math.sin(skew) * -t.scaleY * rnd | 0) / rnd, d = (Math.cos(skew) * t.scaleY * rnd | 0) / rnd, style = this.t.style, cs = this.t.currentStyle;
                if (!cs) return;
                val = b;
                b = -c;
                c = -val;
                filters = cs.filter;
                style.filter = "";
                var dx, dy, w = this.t.offsetWidth, h = this.t.offsetHeight, clip = "absolute" !== cs.position, m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d, ox = t.x + w * t.xPercent / 100, oy = t.y + h * t.yPercent / 100;
                if (null != t.ox) {
                    dx = (t.oxp ? w * t.ox * .01 : t.ox) - w / 2;
                    dy = (t.oyp ? h * t.oy * .01 : t.oy) - h / 2;
                    ox += dx - (dx * a + dy * b);
                    oy += dy - (dx * c + dy * d);
                }
                if (!clip) m += ", sizingMethod='auto expand')"; else {
                    dx = w / 2;
                    dy = h / 2;
                    m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
                }
                if (-1 !== filters.indexOf("DXImageTransform.Microsoft.Matrix(")) style.filter = filters.replace(_ieSetMatrixExp, m); else style.filter = m + " " + filters;
                if (0 === v || 1 === v) if (1 === a) if (0 === b) if (0 === c) if (1 === d) if (!clip || -1 !== m.indexOf("Dx=0, Dy=0")) if (!_opacityExp.test(filters) || 100 === parseFloat(RegExp.$1)) if (-1 === filters.indexOf(true && filters.indexOf("Alpha"))) style.removeAttribute("filter");
                if (!clip) {
                    var marg, prop, dif, mult = _ieVers < 8 ? 1 : -1;
                    dx = t.ieOffsetX || 0;
                    dy = t.ieOffsetY || 0;
                    t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
                    t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
                    for (i = 0; i < 4; i++) {
                        prop = _margins[i];
                        marg = cs[prop];
                        val = -1 !== marg.indexOf("px") ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
                        if (val !== t[prop]) dif = i < 2 ? -t.ieOffsetX : -t.ieOffsetY; else dif = i < 2 ? dx - t.ieOffsetX : dy - t.ieOffsetY;
                        style[prop] = (t[prop] = Math.round(val - dif * (0 === i || 2 === i ? 1 : mult))) + "px";
                    }
                }
            }, _setTransformRatio = _internals.set3DTransformRatio = _internals.setTransformRatio = function(v) {
                var t1, a11, a12, a13, a21, a22, a23, a31, a32, a33, a41, a42, a43, zOrigin, min, cos, sin, t2, transform, comma, zero, skew, rnd, t = this.data, style = this.t.style, angle = t.rotation, rotationX = t.rotationX, rotationY = t.rotationY, sx = t.scaleX, sy = t.scaleY, sz = t.scaleZ, x = t.x, y = t.y, z = t.z, isSVG = t.svg, perspective = t.perspective, force3D = t.force3D, skewY = t.skewY, skewX = t.skewX;
                if (skewY) {
                    skewX += skewY;
                    angle += skewY;
                }
                if (((1 === v || 0 === v) && "auto" === force3D && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !force3D) && !z && !perspective && !rotationY && !rotationX && 1 === sz || _useSVGTransformAttr && isSVG || !_supports3D) {
                    if (angle || skewX || isSVG) {
                        angle *= _DEG2RAD;
                        skew = skewX * _DEG2RAD;
                        rnd = 1e5;
                        a11 = Math.cos(angle) * sx;
                        a21 = Math.sin(angle) * sx;
                        a12 = Math.sin(angle - skew) * -sy;
                        a22 = Math.cos(angle - skew) * sy;
                        if (skew && "simple" === t.skewType) {
                            t1 = Math.tan(skew - skewY * _DEG2RAD);
                            t1 = Math.sqrt(1 + t1 * t1);
                            a12 *= t1;
                            a22 *= t1;
                            if (skewY) {
                                t1 = Math.tan(skewY * _DEG2RAD);
                                t1 = Math.sqrt(1 + t1 * t1);
                                a11 *= t1;
                                a21 *= t1;
                            }
                        }
                        if (isSVG) {
                            x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
                            y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
                            if (_useSVGTransformAttr && (t.xPercent || t.yPercent)) {
                                min = this.t.getBBox();
                                x += .01 * t.xPercent * min.width;
                                y += .01 * t.yPercent * min.height;
                            }
                            min = 1e-6;
                            if (x < min) if (x > -min) x = 0;
                            if (y < min) if (y > -min) y = 0;
                        }
                        transform = (a11 * rnd | 0) / rnd + "," + (a21 * rnd | 0) / rnd + "," + (a12 * rnd | 0) / rnd + "," + (a22 * rnd | 0) / rnd + "," + x + "," + y + ")";
                        if (isSVG && _useSVGTransformAttr) this.t.setAttribute("transform", "matrix(" + transform); else style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + transform;
                    } else style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + sx + ",0,0," + sy + "," + x + "," + y + ")";
                    return;
                }
                if (_isFirefox) {
                    min = 1e-4;
                    if (sx < min && sx > -min) sx = sz = 2e-5;
                    if (sy < min && sy > -min) sy = sz = 2e-5;
                    if (perspective && !t.z && !t.rotationX && !t.rotationY) perspective = 0;
                }
                if (angle || skewX) {
                    angle *= _DEG2RAD;
                    cos = a11 = Math.cos(angle);
                    sin = a21 = Math.sin(angle);
                    if (skewX) {
                        angle -= skewX * _DEG2RAD;
                        cos = Math.cos(angle);
                        sin = Math.sin(angle);
                        if ("simple" === t.skewType) {
                            t1 = Math.tan((skewX - skewY) * _DEG2RAD);
                            t1 = Math.sqrt(1 + t1 * t1);
                            cos *= t1;
                            sin *= t1;
                            if (t.skewY) {
                                t1 = Math.tan(skewY * _DEG2RAD);
                                t1 = Math.sqrt(1 + t1 * t1);
                                a11 *= t1;
                                a21 *= t1;
                            }
                        }
                    }
                    a12 = -sin;
                    a22 = cos;
                } else if (!rotationY && !rotationX && 1 === sz && !perspective && !isSVG) {
                    style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + x + "px," + y + "px," + z + "px)" + (1 !== sx || 1 !== sy ? " scale(" + sx + "," + sy + ")" : "");
                    return;
                } else {
                    a11 = a22 = 1;
                    a12 = a21 = 0;
                }
                a33 = 1;
                a13 = a23 = a31 = a32 = a41 = a42 = 0;
                a43 = perspective ? -1 / perspective : 0;
                zOrigin = t.zOrigin;
                min = 1e-6;
                comma = ",";
                zero = "0";
                angle = rotationY * _DEG2RAD;
                if (angle) {
                    cos = Math.cos(angle);
                    sin = Math.sin(angle);
                    a31 = -sin;
                    a41 = a43 * -sin;
                    a13 = a11 * sin;
                    a23 = a21 * sin;
                    a33 = cos;
                    a43 *= cos;
                    a11 *= cos;
                    a21 *= cos;
                }
                angle = rotationX * _DEG2RAD;
                if (angle) {
                    cos = Math.cos(angle);
                    sin = Math.sin(angle);
                    t1 = a12 * cos + a13 * sin;
                    t2 = a22 * cos + a23 * sin;
                    a32 = a33 * sin;
                    a42 = a43 * sin;
                    a13 = a12 * -sin + a13 * cos;
                    a23 = a22 * -sin + a23 * cos;
                    a33 *= cos;
                    a43 *= cos;
                    a12 = t1;
                    a22 = t2;
                }
                if (1 !== sz) {
                    a13 *= sz;
                    a23 *= sz;
                    a33 *= sz;
                    a43 *= sz;
                }
                if (1 !== sy) {
                    a12 *= sy;
                    a22 *= sy;
                    a32 *= sy;
                    a42 *= sy;
                }
                if (1 !== sx) {
                    a11 *= sx;
                    a21 *= sx;
                    a31 *= sx;
                    a41 *= sx;
                }
                if (zOrigin || isSVG) {
                    if (zOrigin) {
                        x += a13 * -zOrigin;
                        y += a23 * -zOrigin;
                        z += a33 * -zOrigin + zOrigin;
                    }
                    if (isSVG) {
                        x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
                        y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
                    }
                    if (x < min && x > -min) x = zero;
                    if (y < min && y > -min) y = zero;
                    if (z < min && z > -min) z = 0;
                }
                transform = t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(";
                transform += (a11 < min && a11 > -min ? zero : a11) + comma + (a21 < min && a21 > -min ? zero : a21) + comma + (a31 < min && a31 > -min ? zero : a31);
                transform += comma + (a41 < min && a41 > -min ? zero : a41) + comma + (a12 < min && a12 > -min ? zero : a12) + comma + (a22 < min && a22 > -min ? zero : a22);
                if (rotationX || rotationY || 1 !== sz) {
                    transform += comma + (a32 < min && a32 > -min ? zero : a32) + comma + (a42 < min && a42 > -min ? zero : a42) + comma + (a13 < min && a13 > -min ? zero : a13);
                    transform += comma + (a23 < min && a23 > -min ? zero : a23) + comma + (a33 < min && a33 > -min ? zero : a33) + comma + (a43 < min && a43 > -min ? zero : a43) + comma;
                } else transform += ",0,0,0,0,1,0,";
                transform += x + comma + y + comma + z + comma + (perspective ? 1 + -z / perspective : 1) + ")";
                style[_transformProp] = transform;
            };
            p = Transform.prototype;
            p.x = p.y = p.z = p.skewX = p.skewY = p.rotation = p.rotationX = p.rotationY = p.zOrigin = p.xPercent = p.yPercent = p.xOffset = p.yOffset = 0;
            p.scaleX = p.scaleY = p.scaleZ = 1;
            _registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                parser: function(t, e, parsingProp, cssp, pt, plugin, vars) {
                    if (cssp._lastParsedTransform === vars) return pt;
                    cssp._lastParsedTransform = vars;
                    var scaleFunc = vars.scale && "function" === typeof vars.scale ? vars.scale : 0;
                    if (scaleFunc) vars.scale = scaleFunc(_index, t);
                    var m2, copy, has3D, hasChange, dr, x, y, matrix, p, originalGSTransform = t._gsTransform, style = t.style, min = 1e-6, i = _transformProps.length, v = vars, endRotations = {}, transformOriginString = "transformOrigin", m1 = _getTransform(t, _cs, true, v.parseTransform), orig = v.transform && ("function" === typeof v.transform ? v.transform(_index, _target) : v.transform);
                    m1.skewType = v.skewType || m1.skewType || CSSPlugin.defaultSkewType;
                    cssp._transform = m1;
                    if ("rotationZ" in v) v.rotation = v.rotationZ;
                    if (orig && "string" === typeof orig && _transformProp) {
                        copy = _tempDiv.style;
                        copy[_transformProp] = orig;
                        copy.display = "block";
                        copy.position = "absolute";
                        if (-1 !== orig.indexOf("%")) {
                            copy.width = _getStyle(t, "width");
                            copy.height = _getStyle(t, "height");
                        }
                        _doc.body.appendChild(_tempDiv);
                        m2 = _getTransform(_tempDiv, null, false);
                        if ("simple" === m1.skewType) m2.scaleY *= Math.cos(m2.skewX * _DEG2RAD);
                        if (m1.svg) {
                            x = m1.xOrigin;
                            y = m1.yOrigin;
                            m2.x -= m1.xOffset;
                            m2.y -= m1.yOffset;
                            if (v.transformOrigin || v.svgOrigin) {
                                orig = {};
                                _parseSVGOrigin(t, _parsePosition(v.transformOrigin), orig, v.svgOrigin, v.smoothOrigin, true);
                                x = orig.xOrigin;
                                y = orig.yOrigin;
                                m2.x -= orig.xOffset - m1.xOffset;
                                m2.y -= orig.yOffset - m1.yOffset;
                            }
                            if (x || y) {
                                matrix = _getMatrix(_tempDiv, true);
                                m2.x -= x - (x * matrix[0] + y * matrix[2]);
                                m2.y -= y - (x * matrix[1] + y * matrix[3]);
                            }
                        }
                        _doc.body.removeChild(_tempDiv);
                        if (!m2.perspective) m2.perspective = m1.perspective;
                        if (null != v.xPercent) m2.xPercent = _parseVal(v.xPercent, m1.xPercent);
                        if (null != v.yPercent) m2.yPercent = _parseVal(v.yPercent, m1.yPercent);
                    } else if ("object" === typeof v) {
                        m2 = {
                            scaleX: _parseVal(null != v.scaleX ? v.scaleX : v.scale, m1.scaleX),
                            scaleY: _parseVal(null != v.scaleY ? v.scaleY : v.scale, m1.scaleY),
                            scaleZ: _parseVal(v.scaleZ, m1.scaleZ),
                            x: _parseVal(v.x, m1.x),
                            y: _parseVal(v.y, m1.y),
                            z: _parseVal(v.z, m1.z),
                            xPercent: _parseVal(v.xPercent, m1.xPercent),
                            yPercent: _parseVal(v.yPercent, m1.yPercent),
                            perspective: _parseVal(v.transformPerspective, m1.perspective)
                        };
                        dr = v.directionalRotation;
                        if (null != dr) if ("object" === typeof dr) for (copy in dr) v[copy] = dr[copy]; else v.rotation = dr;
                        if ("string" === typeof v.x && -1 !== v.x.indexOf("%")) {
                            m2.x = 0;
                            m2.xPercent = _parseVal(v.x, m1.xPercent);
                        }
                        if ("string" === typeof v.y && -1 !== v.y.indexOf("%")) {
                            m2.y = 0;
                            m2.yPercent = _parseVal(v.y, m1.yPercent);
                        }
                        m2.rotation = _parseAngle("rotation" in v ? v.rotation : "shortRotation" in v ? v.shortRotation + "_short" : m1.rotation, m1.rotation, "rotation", endRotations);
                        if (_supports3D) {
                            m2.rotationX = _parseAngle("rotationX" in v ? v.rotationX : "shortRotationX" in v ? v.shortRotationX + "_short" : m1.rotationX || 0, m1.rotationX, "rotationX", endRotations);
                            m2.rotationY = _parseAngle("rotationY" in v ? v.rotationY : "shortRotationY" in v ? v.shortRotationY + "_short" : m1.rotationY || 0, m1.rotationY, "rotationY", endRotations);
                        }
                        m2.skewX = _parseAngle(v.skewX, m1.skewX);
                        m2.skewY = _parseAngle(v.skewY, m1.skewY);
                    }
                    if (_supports3D && null != v.force3D) {
                        m1.force3D = v.force3D;
                        hasChange = true;
                    }
                    has3D = m1.force3D || m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective;
                    if (!has3D && null != v.scale) m2.scaleZ = 1;
                    while (--i > -1) {
                        p = _transformProps[i];
                        orig = m2[p] - m1[p];
                        if (orig > min || orig < -min || null != v[p] || null != _forcePT[p]) {
                            hasChange = true;
                            pt = new CSSPropTween(m1, p, m1[p], orig, pt);
                            if (p in endRotations) pt.e = endRotations[p];
                            pt.xs0 = 0;
                            pt.plugin = plugin;
                            cssp._overwriteProps.push(pt.n);
                        }
                    }
                    orig = "function" === typeof v.transformOrigin ? v.transformOrigin(_index, _target) : v.transformOrigin;
                    if (m1.svg && (orig || v.svgOrigin)) {
                        x = m1.xOffset;
                        y = m1.yOffset;
                        _parseSVGOrigin(t, _parsePosition(orig), m2, v.svgOrigin, v.smoothOrigin);
                        pt = _addNonTweeningNumericPT(m1, "xOrigin", (originalGSTransform ? m1 : m2).xOrigin, m2.xOrigin, pt, transformOriginString);
                        pt = _addNonTweeningNumericPT(m1, "yOrigin", (originalGSTransform ? m1 : m2).yOrigin, m2.yOrigin, pt, transformOriginString);
                        if (x !== m1.xOffset || y !== m1.yOffset) {
                            pt = _addNonTweeningNumericPT(m1, "xOffset", originalGSTransform ? x : m1.xOffset, m1.xOffset, pt, transformOriginString);
                            pt = _addNonTweeningNumericPT(m1, "yOffset", originalGSTransform ? y : m1.yOffset, m1.yOffset, pt, transformOriginString);
                        }
                        orig = "0px 0px";
                    }
                    if (orig || _supports3D && has3D && m1.zOrigin) if (_transformProp) {
                        hasChange = true;
                        p = _transformOriginProp;
                        if (!orig) {
                            orig = (_getStyle(t, p, _cs, false, "50% 50%") + "").split(" ");
                            orig = orig[0] + " " + orig[1] + " " + m1.zOrigin + "px";
                        }
                        orig += "";
                        pt = new CSSPropTween(style, p, 0, 0, pt, -1, transformOriginString);
                        pt.b = style[p];
                        pt.plugin = plugin;
                        if (_supports3D) {
                            copy = m1.zOrigin;
                            orig = orig.split(" ");
                            m1.zOrigin = (orig.length > 2 ? parseFloat(orig[2]) : copy) || 0;
                            pt.xs0 = pt.e = orig[0] + " " + (orig[1] || "50%") + " 0px";
                            pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n);
                            pt.b = copy;
                            pt.xs0 = pt.e = m1.zOrigin;
                        } else pt.xs0 = pt.e = orig;
                    } else _parsePosition(orig + "", m1);
                    if (hasChange) cssp._transformType = !(m1.svg && _useSVGTransformAttr) && (has3D || 3 === this._transformType) ? 3 : 2;
                    if (scaleFunc) vars.scale = scaleFunc;
                    return pt;
                },
                allowFunc: true,
                prefix: true
            });
            _registerComplexSpecialProp("boxShadow", {
                defaultValue: "0px 0px 0px 0px #999",
                prefix: true,
                color: true,
                multi: true,
                keyword: "inset"
            });
            _registerComplexSpecialProp("clipPath", {
                defaultValue: "inset(0%)",
                prefix: true,
                multi: true,
                formatter: _getFormatter("inset(0% 0% 0% 0%)", false, true)
            });
            _registerComplexSpecialProp("borderRadius", {
                defaultValue: "0px",
                parser: function(t, e, p, cssp, pt, plugin) {
                    e = this.format(e);
                    var ea1, i, es2, bs2, bs, es, bn, en, w, h, esfx, bsfx, rel, hn, vn, em, props = [ "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ], style = t.style;
                    w = parseFloat(t.offsetWidth);
                    h = parseFloat(t.offsetHeight);
                    ea1 = e.split(" ");
                    for (i = 0; i < props.length; i++) {
                        if (this.p.indexOf("border")) props[i] = _checkPropPrefix(props[i]);
                        bs = bs2 = _getStyle(t, props[i], _cs, false, "0px");
                        if (-1 !== bs.indexOf(" ")) {
                            bs2 = bs.split(" ");
                            bs = bs2[0];
                            bs2 = bs2[1];
                        }
                        es = es2 = ea1[i];
                        bn = parseFloat(bs);
                        bsfx = bs.substr((bn + "").length);
                        rel = "=" === es.charAt(1);
                        if (rel) {
                            en = parseInt(es.charAt(0) + "1", 10);
                            es = es.substr(2);
                            en *= parseFloat(es);
                            esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
                        } else {
                            en = parseFloat(es);
                            esfx = es.substr((en + "").length);
                        }
                        if ("" === esfx) esfx = _suffixMap[p] || bsfx;
                        if (esfx !== bsfx) {
                            hn = _convertToPixels(t, "borderLeft", bn, bsfx);
                            vn = _convertToPixels(t, "borderTop", bn, bsfx);
                            if ("%" === esfx) {
                                bs = hn / w * 100 + "%";
                                bs2 = vn / h * 100 + "%";
                            } else if ("em" === esfx) {
                                em = _convertToPixels(t, "borderLeft", 1, "em");
                                bs = hn / em + "em";
                                bs2 = vn / em + "em";
                            } else {
                                bs = hn + "px";
                                bs2 = vn + "px";
                            }
                            if (rel) {
                                es = parseFloat(bs) + en + esfx;
                                es2 = parseFloat(bs2) + en + esfx;
                            }
                        }
                        pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, false, "0px", pt);
                    }
                    return pt;
                },
                prefix: true,
                formatter: _getFormatter("0px 0px 0px 0px", false, true)
            });
            _registerComplexSpecialProp("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                defaultValue: "0px",
                parser: function(t, e, p, cssp, pt, plugin) {
                    return _parseComplex(t.style, p, this.format(_getStyle(t, p, _cs, false, "0px 0px")), this.format(e), false, "0px", pt);
                },
                prefix: true,
                formatter: _getFormatter("0px 0px", false, true)
            });
            _registerComplexSpecialProp("backgroundPosition", {
                defaultValue: "0 0",
                parser: function(t, e, p, cssp, pt, plugin) {
                    var ba, ea, i, pct, overlap, src, bp = "background-position", cs = _cs || _getComputedStyle(t, null), bs = this.format((cs ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), es = this.format(e);
                    if (-1 !== bs.indexOf("%") !== (-1 !== es.indexOf("%")) && es.split(",").length < 2) {
                        src = _getStyle(t, "backgroundImage").replace(_urlExp, "");
                        if (src && "none" !== src) {
                            ba = bs.split(" ");
                            ea = es.split(" ");
                            _tempImg.setAttribute("src", src);
                            i = 2;
                            while (--i > -1) {
                                bs = ba[i];
                                pct = -1 !== bs.indexOf("%");
                                if (pct !== (-1 !== ea[i].indexOf("%"))) {
                                    overlap = 0 === i ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
                                    ba[i] = pct ? parseFloat(bs) / 100 * overlap + "px" : parseFloat(bs) / overlap * 100 + "%";
                                }
                            }
                            bs = ba.join(" ");
                        }
                    }
                    return this.parseComplex(t.style, bs, es, pt, plugin);
                },
                formatter: _parsePosition
            });
            _registerComplexSpecialProp("backgroundSize", {
                defaultValue: "0 0",
                formatter: function(v) {
                    v += "";
                    return "co" === v.substr(0, 2) ? v : _parsePosition(-1 === v.indexOf(" ") ? v + " " + v : v);
                }
            });
            _registerComplexSpecialProp("perspective", {
                defaultValue: "0px",
                prefix: true
            });
            _registerComplexSpecialProp("perspectiveOrigin", {
                defaultValue: "50% 50%",
                prefix: true
            });
            _registerComplexSpecialProp("transformStyle", {
                prefix: true
            });
            _registerComplexSpecialProp("backfaceVisibility", {
                prefix: true
            });
            _registerComplexSpecialProp("userSelect", {
                prefix: true
            });
            _registerComplexSpecialProp("margin", {
                parser: _getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")
            });
            _registerComplexSpecialProp("padding", {
                parser: _getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")
            });
            _registerComplexSpecialProp("clip", {
                defaultValue: "rect(0px,0px,0px,0px)",
                parser: function(t, e, p, cssp, pt, plugin) {
                    var b, cs, delim;
                    if (_ieVers < 9) {
                        cs = t.currentStyle;
                        delim = _ieVers < 8 ? " " : ",";
                        b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
                        e = this.format(e).split(",").join(delim);
                    } else {
                        b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
                        e = this.format(e);
                    }
                    return this.parseComplex(t.style, b, e, pt, plugin);
                }
            });
            _registerComplexSpecialProp("textShadow", {
                defaultValue: "0px 0px 0px #999",
                color: true,
                multi: true
            });
            _registerComplexSpecialProp("autoRound,strictUnits", {
                parser: function(t, e, p, cssp, pt) {
                    return pt;
                }
            });
            _registerComplexSpecialProp("border", {
                defaultValue: "0px solid #000",
                parser: function(t, e, p, cssp, pt, plugin) {
                    var bw = _getStyle(t, "borderTopWidth", _cs, false, "0px"), end = this.format(e).split(" "), esfx = end[0].replace(_suffixExp, "");
                    if ("px" !== esfx) bw = parseFloat(bw) / _convertToPixels(t, "borderTopWidth", 1, esfx) + esfx;
                    return this.parseComplex(t.style, this.format(bw + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), end.join(" "), pt, plugin);
                },
                color: true,
                formatter: function(v) {
                    var a = v.split(" ");
                    return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || [ "#000" ])[0];
                }
            });
            _registerComplexSpecialProp("borderWidth", {
                parser: _getEdgeParser("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
            });
            _registerComplexSpecialProp("float,cssFloat,styleFloat", {
                parser: function(t, e, p, cssp, pt, plugin) {
                    var s = t.style, prop = "cssFloat" in s ? "cssFloat" : "styleFloat";
                    return new CSSPropTween(s, prop, 0, 0, pt, -1, p, false, 0, s[prop], e);
                }
            });
            var _setIEOpacityRatio = function(v) {
                var skip, t = this.t, filters = t.filter || _getStyle(this.data, "filter") || "", val = this.s + this.c * v | 0;
                if (100 === val) if (-1 === filters.indexOf("atrix(") && -1 === filters.indexOf("radient(") && -1 === filters.indexOf("oader(")) {
                    t.removeAttribute("filter");
                    skip = !_getStyle(this.data, "filter");
                } else {
                    t.filter = filters.replace(_alphaFilterExp, "");
                    skip = true;
                }
                if (!skip) {
                    if (this.xn1) t.filter = filters = filters || "alpha(opacity=" + val + ")";
                    if (-1 === filters.indexOf("pacity")) {
                        if (0 !== val || !this.xn1) t.filter = filters + " alpha(opacity=" + val + ")";
                    } else t.filter = filters.replace(_opacityExp, "opacity=" + val);
                }
            };
            _registerComplexSpecialProp("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function(t, e, p, cssp, pt, plugin) {
                    var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")), style = t.style, isAutoAlpha = "autoAlpha" === p;
                    if ("string" === typeof e && "=" === e.charAt(1)) e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + b;
                    if (isAutoAlpha && 1 === b && "hidden" === _getStyle(t, "visibility", _cs) && 0 !== e) b = 0;
                    if (_supportsOpacity) pt = new CSSPropTween(style, "opacity", b, e - b, pt); else {
                        pt = new CSSPropTween(style, "opacity", 100 * b, 100 * (e - b), pt);
                        pt.xn1 = isAutoAlpha ? 1 : 0;
                        style.zoom = 1;
                        pt.type = 2;
                        pt.b = "alpha(opacity=" + pt.s + ")";
                        pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
                        pt.data = t;
                        pt.plugin = plugin;
                        pt.setRatio = _setIEOpacityRatio;
                    }
                    if (isAutoAlpha) {
                        pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, 0 !== b ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit");
                        pt.xs0 = "inherit";
                        cssp._overwriteProps.push(pt.n);
                        cssp._overwriteProps.push(p);
                    }
                    return pt;
                }
            });
            var _removeProp = function(s, p) {
                if (p) if (s.removeProperty) {
                    if ("ms" === p.substr(0, 2) || "webkit" === p.substr(0, 6)) p = "-" + p;
                    s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
                } else s.removeAttribute(p);
            }, _setClassNameRatio = function(v) {
                this.t._gsClassPT = this;
                if (1 === v || 0 === v) {
                    this.t.setAttribute("class", 0 === v ? this.b : this.e);
                    var mpt = this.data, s = this.t.style;
                    while (mpt) {
                        if (!mpt.v) _removeProp(s, mpt.p); else s[mpt.p] = mpt.v;
                        mpt = mpt._next;
                    }
                    if (1 === v && this.t._gsClassPT === this) this.t._gsClassPT = null;
                } else if (this.t.getAttribute("class") !== this.e) this.t.setAttribute("class", this.e);
            };
            _registerComplexSpecialProp("className", {
                parser: function(t, e, p, cssp, pt, plugin, vars) {
                    var difData, bs, cnpt, cnptLookup, mpt, b = t.getAttribute("class") || "", cssText = t.style.cssText;
                    pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
                    pt.setRatio = _setClassNameRatio;
                    pt.pr = -11;
                    _hasPriority = true;
                    pt.b = b;
                    bs = _getAllStyles(t, _cs);
                    cnpt = t._gsClassPT;
                    if (cnpt) {
                        cnptLookup = {};
                        mpt = cnpt.data;
                        while (mpt) {
                            cnptLookup[mpt.p] = 1;
                            mpt = mpt._next;
                        }
                        cnpt.setRatio(1);
                    }
                    t._gsClassPT = pt;
                    pt.e = "=" !== e.charAt(1) ? e : b.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : "");
                    t.setAttribute("class", pt.e);
                    difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
                    t.setAttribute("class", b);
                    pt.data = difData.firstMPT;
                    if (t.style.cssText !== cssText) t.style.cssText = cssText;
                    pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin);
                    return pt;
                }
            });
            var _setClearPropsRatio = function(v) {
                if (1 === v || 0 === v) if (this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var a, p, i, clearTransform, transform, s = this.t.style, transformParse = _specialProps.transform.parse;
                    if ("all" === this.e) {
                        s.cssText = "";
                        clearTransform = true;
                    } else {
                        a = this.e.split(" ").join("").split(",");
                        i = a.length;
                        while (--i > -1) {
                            p = a[i];
                            if (_specialProps[p]) if (_specialProps[p].parse === transformParse) clearTransform = true; else p = "transformOrigin" === p ? _transformOriginProp : _specialProps[p].p;
                            _removeProp(s, p);
                        }
                    }
                    if (clearTransform) {
                        _removeProp(s, _transformProp);
                        transform = this.t._gsTransform;
                        if (transform) {
                            if (transform.svg) {
                                this.t.removeAttribute("data-svg-origin");
                                this.t.removeAttribute("transform");
                            }
                            delete this.t._gsTransform;
                        }
                    }
                }
            };
            _registerComplexSpecialProp("clearProps", {
                parser: function(t, e, p, cssp, pt) {
                    pt = new CSSPropTween(t, p, 0, 0, pt, 2);
                    pt.setRatio = _setClearPropsRatio;
                    pt.e = e;
                    pt.pr = -10;
                    pt.data = cssp._tween;
                    _hasPriority = true;
                    return pt;
                }
            });
            p = "bezier,throwProps,physicsProps,physics2D".split(",");
            i = p.length;
            while (i--) _registerPluginProp(p[i]);
            p = CSSPlugin.prototype;
            p._firstPT = p._lastParsedTransform = p._transform = null;
            p._onInitTween = function(target, vars, tween, index) {
                if (!target.nodeType) return false;
                this._target = _target = target;
                this._tween = tween;
                this._vars = vars;
                _index = index;
                _autoRound = vars.autoRound;
                _hasPriority = false;
                _suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
                _cs = _getComputedStyle(target, "");
                _overwriteProps = this._overwriteProps;
                var v, pt, pt2, first, last, next, zIndex, tpt, threeD, style = target.style;
                if (_reqSafariFix) if ("" === style.zIndex) {
                    v = _getStyle(target, "zIndex", _cs);
                    if ("auto" === v || "" === v) this._addLazySet(style, "zIndex", 0);
                }
                if ("string" === typeof vars) {
                    first = style.cssText;
                    v = _getAllStyles(target, _cs);
                    style.cssText = first + ";" + vars;
                    v = _cssDif(target, v, _getAllStyles(target)).difs;
                    if (!_supportsOpacity && _opacityValExp.test(vars)) v.opacity = parseFloat(RegExp.$1);
                    vars = v;
                    style.cssText = first;
                }
                if (vars.className) this._firstPT = pt = _specialProps.className.parse(target, vars.className, "className", this, null, null, vars); else this._firstPT = pt = this.parse(target, vars, null);
                if (this._transformType) {
                    threeD = 3 === this._transformType;
                    if (!_transformProp) style.zoom = 1; else if (_isSafari) {
                        _reqSafariFix = true;
                        if ("" === style.zIndex) {
                            zIndex = _getStyle(target, "zIndex", _cs);
                            if ("auto" === zIndex || "" === zIndex) this._addLazySet(style, "zIndex", 0);
                        }
                        if (_isSafariLT6) this._addLazySet(style, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden"));
                    }
                    pt2 = pt;
                    while (pt2 && pt2._next) pt2 = pt2._next;
                    tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);
                    this._linkCSSP(tpt, null, pt2);
                    tpt.setRatio = _transformProp ? _setTransformRatio : _setIETransformRatio;
                    tpt.data = this._transform || _getTransform(target, _cs, true);
                    tpt.tween = tween;
                    tpt.pr = -1;
                    _overwriteProps.pop();
                }
                if (_hasPriority) {
                    while (pt) {
                        next = pt._next;
                        pt2 = first;
                        while (pt2 && pt2.pr > pt.pr) pt2 = pt2._next;
                        if (pt._prev = pt2 ? pt2._prev : last) pt._prev._next = pt; else first = pt;
                        if (pt._next = pt2) pt2._prev = pt; else last = pt;
                        pt = next;
                    }
                    this._firstPT = first;
                }
                return true;
            };
            p.parse = function(target, vars, pt, plugin) {
                var p, sp, bn, en, bs, es, bsfx, esfx, isStr, rel, style = target.style;
                for (p in vars) {
                    es = vars[p];
                    sp = _specialProps[p];
                    if ("function" === typeof es && !(sp && sp.allowFunc)) es = es(_index, _target);
                    if (sp) pt = sp.parse(target, es, p, this, pt, plugin, vars); else if ("--" === p.substr(0, 2)) {
                        this._tween._propLookup[p] = this._addTween.call(this._tween, target.style, "setProperty", _getComputedStyle(target).getPropertyValue(p) + "", es + "", p, false, p);
                        continue;
                    } else {
                        bs = _getStyle(target, p, _cs) + "";
                        isStr = "string" === typeof es;
                        if ("color" === p || "fill" === p || "stroke" === p || -1 !== p.indexOf("Color") || isStr && _rgbhslExp.test(es)) {
                            if (!isStr) {
                                es = _parseColor(es);
                                es = (es.length > 3 ? "rgba(" : "rgb(") + es.join(",") + ")";
                            }
                            pt = _parseComplex(style, p, bs, es, true, "transparent", pt, 0, plugin);
                        } else if (isStr && _complexExp.test(es)) pt = _parseComplex(style, p, bs, es, true, null, pt, 0, plugin); else {
                            bn = parseFloat(bs);
                            bsfx = bn || 0 === bn ? bs.substr((bn + "").length) : "";
                            if ("" === bs || "auto" === bs) if ("width" === p || "height" === p) {
                                bn = _getDimension(target, p, _cs);
                                bsfx = "px";
                            } else if ("left" === p || "top" === p) {
                                bn = _calculateOffset(target, p, _cs);
                                bsfx = "px";
                            } else {
                                bn = "opacity" !== p ? 0 : 1;
                                bsfx = "";
                            }
                            rel = isStr && "=" === es.charAt(1);
                            if (rel) {
                                en = parseInt(es.charAt(0) + "1", 10);
                                es = es.substr(2);
                                en *= parseFloat(es);
                                esfx = es.replace(_suffixExp, "");
                            } else {
                                en = parseFloat(es);
                                esfx = isStr ? es.replace(_suffixExp, "") : "";
                            }
                            if ("" === esfx) esfx = p in _suffixMap ? _suffixMap[p] : bsfx;
                            es = en || 0 === en ? (rel ? en + bn : en) + esfx : vars[p];
                            if (bsfx !== esfx) if ("" !== esfx || "lineHeight" === p) if (en || 0 === en) if (bn) {
                                bn = _convertToPixels(target, p, bn, bsfx);
                                if ("%" === esfx) {
                                    bn /= _convertToPixels(target, p, 100, "%") / 100;
                                    if (true !== vars.strictUnits) bs = bn + "%";
                                } else if ("em" === esfx || "rem" === esfx || "vw" === esfx || "vh" === esfx) bn /= _convertToPixels(target, p, 1, esfx); else if ("px" !== esfx) {
                                    en = _convertToPixels(target, p, en, esfx);
                                    esfx = "px";
                                }
                                if (rel) if (en || 0 === en) es = en + bn + esfx;
                            }
                            if (rel) en += bn;
                            if ((bn || 0 === bn) && (en || 0 === en)) {
                                pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, p, false !== _autoRound && ("px" === esfx || "zIndex" === p), 0, bs, es);
                                pt.xs0 = esfx;
                            } else if (void 0 === style[p] || !es && (es + "" === "NaN" || null == es)) _log("invalid " + p + " tween value: " + vars[p]); else {
                                pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, p, false, 0, bs, es);
                                pt.xs0 = "none" === es && ("display" === p || -1 !== p.indexOf("Style")) ? bs : es;
                            }
                        }
                    }
                    if (plugin) if (pt && !pt.plugin) pt.plugin = plugin;
                }
                return pt;
            };
            p.setRatio = function(v) {
                var val, str, i, pt = this._firstPT, min = 1e-6;
                if (1 === v && (this._tween._time === this._tween._duration || 0 === this._tween._time)) while (pt) {
                    if (2 !== pt.type) if (pt.r && -1 !== pt.type) {
                        val = pt.r(pt.s + pt.c);
                        if (!pt.type) pt.t[pt.p] = val + pt.xs0; else if (1 === pt.type) {
                            i = pt.l;
                            str = pt.xs0 + val + pt.xs1;
                            for (i = 1; i < pt.l; i++) str += pt["xn" + i] + pt["xs" + (i + 1)];
                            pt.t[pt.p] = str;
                        }
                    } else pt.t[pt.p] = pt.e; else pt.setRatio(v);
                    pt = pt._next;
                } else if (v || !(this._tween._time === this._tween._duration || 0 === this._tween._time) || -1e-6 === this._tween._rawPrevTime) while (pt) {
                    val = pt.c * v + pt.s;
                    if (pt.r) val = pt.r(val); else if (val < min) if (val > -min) val = 0;
                    if (!pt.type) pt.t[pt.p] = val + pt.xs0; else if (1 === pt.type) {
                        i = pt.l;
                        if (2 === i) pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2; else if (3 === i) pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3; else if (4 === i) pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4; else if (5 === i) pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5; else {
                            str = pt.xs0 + val + pt.xs1;
                            for (i = 1; i < pt.l; i++) str += pt["xn" + i] + pt["xs" + (i + 1)];
                            pt.t[pt.p] = str;
                        }
                    } else if (-1 === pt.type) pt.t[pt.p] = pt.xs0; else if (pt.setRatio) pt.setRatio(v);
                    pt = pt._next;
                } else while (pt) {
                    if (2 !== pt.type) pt.t[pt.p] = pt.b; else pt.setRatio(v);
                    pt = pt._next;
                }
            };
            p._enableTransforms = function(threeD) {
                this._transform = this._transform || _getTransform(this._target, _cs, true);
                this._transformType = !(this._transform.svg && _useSVGTransformAttr) && (threeD || 3 === this._transformType) ? 3 : 2;
            };
            var lazySet = function(v) {
                this.t[this.p] = this.e;
                this.data._linkCSSP(this, this._next, null, true);
            };
            p._addLazySet = function(t, p, v) {
                var pt = this._firstPT = new CSSPropTween(t, p, 0, 0, this._firstPT, 2);
                pt.e = v;
                pt.setRatio = lazySet;
                pt.data = this;
            };
            p._linkCSSP = function(pt, next, prev, remove) {
                if (pt) {
                    if (next) next._prev = pt;
                    if (pt._next) pt._next._prev = pt._prev;
                    if (pt._prev) pt._prev._next = pt._next; else if (this._firstPT === pt) {
                        this._firstPT = pt._next;
                        remove = true;
                    }
                    if (prev) prev._next = pt; else if (!remove && null === this._firstPT) this._firstPT = pt;
                    pt._next = next;
                    pt._prev = prev;
                }
                return pt;
            };
            p._mod = function(lookup) {
                var pt = this._firstPT;
                while (pt) {
                    if ("function" === typeof lookup[pt.p]) pt.r = lookup[pt.p];
                    pt = pt._next;
                }
            };
            p._kill = function(lookup) {
                var pt, p, xfirst, copy = lookup;
                if (lookup.autoAlpha || lookup.alpha) {
                    copy = {};
                    for (p in lookup) copy[p] = lookup[p];
                    copy.opacity = 1;
                    if (copy.autoAlpha) copy.visibility = 1;
                }
                if (lookup.className && (pt = this._classNamePT)) {
                    xfirst = pt.xfirst;
                    if (xfirst && xfirst._prev) this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev); else if (xfirst === this._firstPT) this._firstPT = pt._next;
                    if (pt._next) this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
                    this._classNamePT = null;
                }
                pt = this._firstPT;
                while (pt) {
                    if (pt.plugin && pt.plugin !== p && pt.plugin._kill) {
                        pt.plugin._kill(lookup);
                        p = pt.plugin;
                    }
                    pt = pt._next;
                }
                return TweenLite.VN.prototype._kill.call(this, copy);
            };
            var _getChildStyles = function(e, props, targets) {
                var children, i, child, type;
                if (e.slice) {
                    i = e.length;
                    while (--i > -1) _getChildStyles(e[i], props, targets);
                    return;
                }
                children = e.childNodes;
                i = children.length;
                while (--i > -1) {
                    child = children[i];
                    type = child.type;
                    if (child.style) {
                        props.push(_getAllStyles(child));
                        if (targets) targets.push(child);
                    }
                    if ((1 === type || 9 === type || 11 === type) && child.childNodes.length) _getChildStyles(child, props, targets);
                }
            };
            CSSPlugin.cascadeTo = function(target, duration, vars) {
                var i, difs, p, from, tween = TweenLite.ZP.to(target, duration, vars), results = [ tween ], b = [], e = [], targets = [], _reservedProps = TweenLite.ZP._internals.reservedProps;
                target = tween._targets || tween.target;
                _getChildStyles(target, b, targets);
                tween.render(duration, true, true);
                _getChildStyles(target, e);
                tween.render(0, true, true);
                tween._enabled(true);
                i = targets.length;
                while (--i > -1) {
                    difs = _cssDif(targets[i], b[i], e[i]);
                    if (difs.firstMPT) {
                        difs = difs.difs;
                        for (p in vars) if (_reservedProps[p]) difs[p] = vars[p];
                        from = {};
                        for (p in difs) from[p] = b[i][p];
                        results.push(TweenLite.ZP.fromTo(targets[i], duration, from, difs));
                    }
                }
                return results;
            };
            TweenLite.VN.activate([ CSSPlugin ]);
            return CSSPlugin;
        }), true);
        var CSSPlugin = TweenLite.li.CSSPlugin;
        /*!
 * VERSION: 0.6.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
        var AttrPlugin = TweenLite.ML._gsDefine.plugin({
            propName: "attr",
            API: 2,
            version: "0.6.1",
            init: function(target, value, tween, index) {
                var p, end;
                if ("function" !== typeof target.setAttribute) return false;
                for (p in value) {
                    end = value[p];
                    if ("function" === typeof end) end = end(index, target);
                    this._addTween(target, "setAttribute", target.getAttribute(p) + "", end + "", p, false, p);
                    this._overwriteProps.push(p);
                }
                return true;
            }
        });
        /*!
 * VERSION: 1.6.0
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
        var RoundPropsPlugin = TweenLite.ML._gsDefine.plugin({
            propName: "roundProps",
            version: "1.7.0",
            priority: -1,
            API: 2,
            init: function(target, value, tween) {
                this._tween = tween;
                return true;
            }
        }), _getRoundFunc = function(v) {
            var p = v < 1 ? Math.pow(10, (v + "").length - 2) : 1;
            return function(n) {
                return (Math.round(n / v) * v * p | 0) / p;
            };
        }, _roundLinkedList = function(node, mod) {
            while (node) {
                if (!node.f && !node.blob) node.m = mod || Math.round;
                node = node._next;
            }
        }, p = RoundPropsPlugin.prototype;
        p._onInitAllProps = function() {
            var pt, next, i, p, tween = this._tween, rp = tween.vars.roundProps, lookup = {}, rpt = tween._propLookup.roundProps;
            if ("object" === typeof rp && !rp.push) for (p in rp) lookup[p] = _getRoundFunc(rp[p]); else {
                if ("string" === typeof rp) rp = rp.split(",");
                i = rp.length;
                while (--i > -1) lookup[rp[i]] = Math.round;
            }
            for (p in lookup) {
                pt = tween._firstPT;
                while (pt) {
                    next = pt._next;
                    if (pt.pg) pt.t._mod(lookup); else if (pt.n === p) if (2 === pt.f && pt.t) _roundLinkedList(pt.t._firstPT, lookup[p]); else {
                        this._add(pt.t, p, pt.s, pt.c, lookup[p]);
                        if (next) next._prev = pt._prev;
                        if (pt._prev) pt._prev._next = next; else if (tween._firstPT === pt) tween._firstPT = next;
                        pt._next = pt._prev = null;
                        tween._propLookup[p] = rpt;
                    }
                    pt = next;
                }
            }
            return false;
        };
        p._add = function(target, p, s, c, mod) {
            this._addTween(target, p, s, s + c, p, mod || Math.round);
            this._overwriteProps.push(p);
        };
        /*!
 * VERSION: 0.3.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
        var DirectionalRotationPlugin = TweenLite.ML._gsDefine.plugin({
            propName: "directionalRotation",
            version: "0.3.1",
            API: 2,
            init: function(target, value, tween, index) {
                if ("object" !== typeof value) value = {
                    rotation: value
                };
                this.finals = {};
                var p, v, start, end, dif, split, cap = true === value.useRadians ? 2 * Math.PI : 360, min = 1e-6;
                for (p in value) if ("useRadians" !== p) {
                    end = value[p];
                    if ("function" === typeof end) end = end(index, target);
                    split = (end + "").split("_");
                    v = split[0];
                    start = parseFloat("function" !== typeof target[p] ? target[p] : target[p.indexOf("set") || "function" !== typeof target["get" + p.substr(3)] ? p : "get" + p.substr(3)]());
                    end = this.finals[p] = "string" === typeof v && "=" === v.charAt(1) ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
                    dif = end - start;
                    if (split.length) {
                        v = split.join("_");
                        if (-1 !== v.indexOf("short")) {
                            dif %= cap;
                            if (dif !== dif % (cap / 2)) dif = dif < 0 ? dif + cap : dif - cap;
                        }
                        if (-1 !== v.indexOf("_cw") && dif < 0) dif = (dif + 9999999999 * cap) % cap - (dif / cap | 0) * cap; else if (-1 !== v.indexOf("ccw") && dif > 0) dif = (dif - 9999999999 * cap) % cap - (dif / cap | 0) * cap;
                    }
                    if (dif > min || dif < -min) {
                        this._addTween(target, p, start, start + dif, p);
                        this._overwriteProps.push(p);
                    }
                }
                return true;
            },
            set: function(ratio) {
                var pt;
                if (1 !== ratio) this._super.setRatio.call(this, ratio); else {
                    pt = this._firstPT;
                    while (pt) {
                        if (pt.f) pt.t[pt.p](this.finals[pt.p]); else pt.t[pt.p] = this.finals[pt.p];
                        pt = pt._next;
                    }
                }
            }
        });
        DirectionalRotationPlugin._autoCSS = true;
        /*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
        TweenLite.ML._gsDefine("TimelineLite", [ "core.Animation", "core.SimpleTimeline", "TweenLite" ], (function() {
            var TimelineLite = function(vars) {
                TweenLite.MQ.call(this, vars);
                var val, p, self = this, v = self.vars;
                self._labels = {};
                self.autoRemoveChildren = !!v.autoRemoveChildren;
                self.smoothChildTiming = !!v.smoothChildTiming;
                self._sortChildren = true;
                self._onUpdate = v.onUpdate;
                for (p in v) {
                    val = v[p];
                    if (_isArray(val)) if (-1 !== val.join("").indexOf("{self}")) v[p] = self._swapSelfInParams(val);
                }
                if (_isArray(v.tweens)) self.add(v.tweens, 0, v.align, v.stagger);
            }, _tinyNum = 1e-8, TweenLiteInternals = TweenLite.ZP._internals, _internals = TimelineLite._internals = {}, _isSelector = TweenLiteInternals.isSelector, _isArray = TweenLiteInternals.isArray, _lazyTweens = TweenLiteInternals.lazyTweens, _lazyRender = TweenLiteInternals.lazyRender, _globals = TweenLite.ML._gsDefine.globals, _copy = function(vars) {
                var p, copy = {};
                for (p in vars) copy[p] = vars[p];
                return copy;
            }, _applyCycle = function(vars, targets, i) {
                var p, val, alt = vars.cycle;
                for (p in alt) {
                    val = alt[p];
                    vars[p] = "function" === typeof val ? val(i, targets[i], targets) : val[i % val.length];
                }
                delete vars.cycle;
            }, _pauseCallback = _internals.pauseCallback = function() {}, _slice = function(a) {
                var i, b = [], l = a.length;
                for (i = 0; i !== l; b.push(a[i++])) ;
                return b;
            }, _defaultImmediateRender = function(tl, toVars, fromVars, defaultFalse) {
                var ir = "immediateRender";
                if (!(ir in toVars)) toVars[ir] = !(fromVars && false === fromVars[ir] || defaultFalse);
                return toVars;
            }, _distribute = function(v) {
                if ("function" === typeof v) return v;
                var vars = "object" === typeof v ? v : {
                    each: v
                }, ease = vars.ease, from = vars.from || 0, base = vars.base || 0, cache = {}, isFromKeyword = isNaN(from), axis = vars.axis, ratio = {
                    center: .5,
                    end: 1
                }[from] || 0;
                return function(i, target, a) {
                    var originX, originY, x, y, d, j, max, min, wrap, l = (a || vars).length, distances = cache[l];
                    if (!distances) {
                        wrap = "auto" === vars.grid ? 0 : (vars.grid || [ 1 / 0 ])[0];
                        if (!wrap) {
                            max = -1 / 0;
                            while (max < (max = a[wrap++].getBoundingClientRect().left) && wrap < l) ;
                            wrap--;
                        }
                        distances = cache[l] = [];
                        originX = isFromKeyword ? Math.min(wrap, l) * ratio - .5 : from % wrap;
                        originY = isFromKeyword ? l * ratio / wrap - .5 : from / wrap | 0;
                        max = 0;
                        min = 1 / 0;
                        for (j = 0; j < l; j++) {
                            x = j % wrap - originX;
                            y = originY - (j / wrap | 0);
                            distances[j] = d = !axis ? Math.sqrt(x * x + y * y) : Math.abs("y" === axis ? y : x);
                            if (d > max) max = d;
                            if (d < min) min = d;
                        }
                        distances.max = max - min;
                        distances.min = min;
                        distances.v = l = vars.amount || vars.each * (wrap > l ? l - 1 : !axis ? Math.max(wrap, l / wrap) : "y" === axis ? l / wrap : wrap) || 0;
                        distances.b = l < 0 ? base - l : base;
                    }
                    l = (distances[i] - distances.min) / distances.max;
                    return distances.b + (ease ? ease.getRatio(l) : l) * distances.v;
                };
            }, p = TimelineLite.prototype = new TweenLite.MQ;
            TimelineLite.version = "2.1.3";
            TimelineLite.distribute = _distribute;
            p.constructor = TimelineLite;
            p.kill()._gc = p._forcingPlayhead = p._hasPause = false;
            p.to = function(target, duration, vars, position) {
                var Engine = vars.repeat && _globals.TweenMax || TweenLite.ZP;
                return duration ? this.add(new Engine(target, duration, vars), position) : this.set(target, vars, position);
            };
            p.from = function(target, duration, vars, position) {
                return this.add((vars.repeat && _globals.TweenMax || TweenLite.ZP).from(target, duration, _defaultImmediateRender(this, vars)), position);
            };
            p.fromTo = function(target, duration, fromVars, toVars, position) {
                var Engine = toVars.repeat && _globals.TweenMax || TweenLite.ZP;
                toVars = _defaultImmediateRender(this, toVars, fromVars);
                return duration ? this.add(Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
            };
            p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                var copy, i, tl = new TimelineLite({
                    onComplete: onCompleteAll,
                    onCompleteParams: onCompleteAllParams,
                    callbackScope: onCompleteAllScope,
                    smoothChildTiming: this.smoothChildTiming
                }), staggerFunc = _distribute(vars.stagger || stagger), startAt = vars.startAt, cycle = vars.cycle;
                if ("string" === typeof targets) targets = TweenLite.ZP.selector(targets) || targets;
                targets = targets || [];
                if (_isSelector(targets)) targets = _slice(targets);
                for (i = 0; i < targets.length; i++) {
                    copy = _copy(vars);
                    if (startAt) {
                        copy.startAt = _copy(startAt);
                        if (startAt.cycle) _applyCycle(copy.startAt, targets, i);
                    }
                    if (cycle) {
                        _applyCycle(copy, targets, i);
                        if (null != copy.duration) {
                            duration = copy.duration;
                            delete copy.duration;
                        }
                    }
                    tl.to(targets[i], duration, copy, staggerFunc(i, targets[i], targets));
                }
                return this.add(tl, position);
            };
            p.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                vars.runBackwards = true;
                return this.staggerTo(targets, duration, _defaultImmediateRender(this, vars), stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
            };
            p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
                toVars.startAt = fromVars;
                return this.staggerTo(targets, duration, _defaultImmediateRender(this, toVars, fromVars), stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
            };
            p.call = function(callback, params, scope, position) {
                return this.add(TweenLite.ZP.delayedCall(0, callback, params, scope), position);
            };
            p.set = function(target, vars, position) {
                return this.add(new TweenLite.ZP(target, 0, _defaultImmediateRender(this, vars, null, true)), position);
            };
            TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
                vars = vars || {};
                if (null == vars.smoothChildTiming) vars.smoothChildTiming = true;
                var hasNegativeStart, time, tween, next, tl = new TimelineLite(vars), root = tl._timeline;
                if (null == ignoreDelayedCalls) ignoreDelayedCalls = true;
                root._remove(tl, true);
                tl._startTime = 0;
                tl._rawPrevTime = tl._time = tl._totalTime = root._time;
                tween = root._first;
                while (tween) {
                    next = tween._next;
                    if (!ignoreDelayedCalls || !(tween instanceof TweenLite.ZP && tween.target === tween.vars.onComplete)) {
                        time = tween._startTime - tween._delay;
                        if (time < 0) hasNegativeStart = 1;
                        tl.add(tween, time);
                    }
                    tween = next;
                }
                root.add(tl, 0);
                if (hasNegativeStart) tl.totalDuration();
                return tl;
            };
            p.add = function(value, position, align, stagger) {
                var curTime, l, i, child, tl, beforeRawTime, self = this;
                if ("number" !== typeof position) position = self._parseTimeOrLabel(position, 0, true, value);
                if (!(value instanceof TweenLite.fw)) if (value instanceof Array || value && value.push && _isArray(value)) {
                    align = align || "normal";
                    stagger = stagger || 0;
                    curTime = position;
                    l = value.length;
                    for (i = 0; i < l; i++) {
                        if (_isArray(child = value[i])) child = new TimelineLite({
                            tweens: child
                        });
                        self.add(child, curTime);
                        if ("string" !== typeof child && "function" !== typeof child) if ("sequence" === align) curTime = child._startTime + child.totalDuration() / child._timeScale; else if ("start" === align) child._startTime -= child.delay();
                        curTime += stagger;
                    }
                    return self._uncache(true);
                } else if ("string" === typeof value) return self.addLabel(value, position); else if ("function" === typeof value) value = TweenLite.ZP.delayedCall(0, value); else throw "Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.";
                TweenLite.MQ.prototype.add.call(self, value, position);
                if (value._time || !value._duration && value._initted) {
                    curTime = (self.rawTime() - value._startTime) * value._timeScale;
                    if (!value._duration || Math.abs(Math.max(0, Math.min(value.totalDuration(), curTime))) - value._totalTime > 1e-5) value.render(curTime, false, false);
                }
                if (self._gc || self._time === self._duration) if (!self._paused) if (self._duration < self.duration()) {
                    tl = self;
                    beforeRawTime = tl.rawTime() > value._startTime;
                    while (tl._timeline) {
                        if (beforeRawTime && tl._timeline.smoothChildTiming) tl.totalTime(tl._totalTime, true); else if (tl._gc) tl._enabled(true, false);
                        tl = tl._timeline;
                    }
                }
                return self;
            };
            p.remove = function(value) {
                if (value instanceof TweenLite.fw) {
                    this._remove(value, false);
                    var tl = value._timeline = value.vars.useFrames ? TweenLite.fw._rootFramesTimeline : TweenLite.fw._rootTimeline;
                    value._startTime = (value._paused ? value._pauseTime : tl._time) - (!value._reversed ? value._totalTime : value.totalDuration() - value._totalTime) / value._timeScale;
                    return this;
                } else if (value instanceof Array || value && value.push && _isArray(value)) {
                    var i = value.length;
                    while (--i > -1) this.remove(value[i]);
                    return this;
                } else if ("string" === typeof value) return this.removeLabel(value);
                return this.kill(null, value);
            };
            p._remove = function(tween, skipDisable) {
                TweenLite.MQ.prototype._remove.call(this, tween, skipDisable);
                var last = this._last;
                if (!last) this._time = this._totalTime = this._duration = this._totalDuration = 0; else if (this._time > this.duration()) {
                    this._time = this._duration;
                    this._totalTime = this._totalDuration;
                }
                return this;
            };
            p.append = function(value, offsetOrLabel) {
                return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
            };
            p.insert = p.insertMultiple = function(value, position, align, stagger) {
                return this.add(value, position || 0, align, stagger);
            };
            p.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {
                return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
            };
            p.addLabel = function(label, position) {
                this._labels[label] = this._parseTimeOrLabel(position);
                return this;
            };
            p.addPause = function(position, callback, params, scope) {
                var t = TweenLite.ZP.delayedCall(0, _pauseCallback, params, scope || this);
                t.vars.onComplete = t.vars.onReverseComplete = callback;
                t.data = "isPause";
                this._hasPause = true;
                return this.add(t, position);
            };
            p.removeLabel = function(label) {
                delete this._labels[label];
                return this;
            };
            p.getLabelTime = function(label) {
                return null != this._labels[label] ? this._labels[label] : -1;
            };
            p._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
                var clippedDuration, i;
                if (ignore instanceof TweenLite.fw && ignore.timeline === this) this.remove(ignore); else if (ignore && (ignore instanceof Array || ignore.push && _isArray(ignore))) {
                    i = ignore.length;
                    while (--i > -1) if (ignore[i] instanceof TweenLite.fw && ignore[i].timeline === this) this.remove(ignore[i]);
                }
                clippedDuration = "number" === typeof timeOrLabel && !offsetOrLabel ? 0 : this.duration() > 99999999999 ? this.recent().endTime(false) : this._duration;
                if ("string" === typeof offsetOrLabel) return this._parseTimeOrLabel(offsetOrLabel, appendIfAbsent && "number" === typeof timeOrLabel && null == this._labels[offsetOrLabel] ? timeOrLabel - clippedDuration : 0, appendIfAbsent);
                offsetOrLabel = offsetOrLabel || 0;
                if ("string" === typeof timeOrLabel && (isNaN(timeOrLabel) || null != this._labels[timeOrLabel])) {
                    i = timeOrLabel.indexOf("=");
                    if (-1 === i) {
                        if (null == this._labels[timeOrLabel]) return appendIfAbsent ? this._labels[timeOrLabel] = clippedDuration + offsetOrLabel : offsetOrLabel;
                        return this._labels[timeOrLabel] + offsetOrLabel;
                    }
                    offsetOrLabel = parseInt(timeOrLabel.charAt(i - 1) + "1", 10) * Number(timeOrLabel.substr(i + 1));
                    timeOrLabel = i > 1 ? this._parseTimeOrLabel(timeOrLabel.substr(0, i - 1), 0, appendIfAbsent) : clippedDuration;
                } else if (null == timeOrLabel) timeOrLabel = clippedDuration;
                return Number(timeOrLabel) + offsetOrLabel;
            };
            p.seek = function(position, suppressEvents) {
                return this.totalTime("number" === typeof position ? position : this._parseTimeOrLabel(position), false !== suppressEvents);
            };
            p.stop = function() {
                return this.paused(true);
            };
            p.gotoAndPlay = function(position, suppressEvents) {
                return this.play(position, suppressEvents);
            };
            p.gotoAndStop = function(position, suppressEvents) {
                return this.pause(position, suppressEvents);
            };
            p.render = function(time, suppressEvents, force) {
                if (this._gc) this._enabled(true, false);
                var tween, isComplete, next, callback, internalForce, pauseTween, curTime, pauseTime, self = this, prevTime = self._time, totalDur = !self._dirty ? self._totalDuration : self.totalDuration(), prevStart = self._startTime, prevTimeScale = self._timeScale, prevPaused = self._paused;
                if (prevTime !== self._time) time += self._time - prevTime;
                if (self._hasPause && !self._forcingPlayhead && !suppressEvents) {
                    if (time > prevTime) {
                        tween = self._first;
                        while (tween && tween._startTime <= time && !pauseTween) {
                            if (!tween._duration) if ("isPause" === tween.data && !tween.ratio && !(0 === tween._startTime && 0 === self._rawPrevTime)) pauseTween = tween;
                            tween = tween._next;
                        }
                    } else {
                        tween = self._last;
                        while (tween && tween._startTime >= time && !pauseTween) {
                            if (!tween._duration) if ("isPause" === tween.data && tween._rawPrevTime > 0) pauseTween = tween;
                            tween = tween._prev;
                        }
                    }
                    if (pauseTween) {
                        self._time = self._totalTime = time = pauseTween._startTime;
                        pauseTime = self._startTime + (self._reversed ? self._duration - time : time) / self._timeScale;
                    }
                }
                if (time >= totalDur - _tinyNum && time >= 0) {
                    self._totalTime = self._time = totalDur;
                    if (!self._reversed) if (!self._hasPausedChild()) {
                        isComplete = true;
                        callback = "onComplete";
                        internalForce = !!self._timeline.autoRemoveChildren;
                        if (0 === self._duration) if (time <= 0 && time >= -_tinyNum || self._rawPrevTime < 0 || self._rawPrevTime === _tinyNum) if (self._rawPrevTime !== time && self._first) {
                            internalForce = true;
                            if (self._rawPrevTime > _tinyNum) callback = "onReverseComplete";
                        }
                    }
                    self._rawPrevTime = self._duration || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum;
                    time = totalDur + 1e-4;
                } else if (time < _tinyNum) {
                    self._totalTime = self._time = 0;
                    if (time > -_tinyNum) time = 0;
                    if (0 !== prevTime || 0 === self._duration && self._rawPrevTime !== _tinyNum && (self._rawPrevTime > 0 || time < 0 && self._rawPrevTime >= 0)) {
                        callback = "onReverseComplete";
                        isComplete = self._reversed;
                    }
                    if (time < 0) {
                        self._active = false;
                        if (self._timeline.autoRemoveChildren && self._reversed) {
                            internalForce = isComplete = true;
                            callback = "onReverseComplete";
                        } else if (self._rawPrevTime >= 0 && self._first) internalForce = true;
                        self._rawPrevTime = time;
                    } else {
                        self._rawPrevTime = self._duration || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum;
                        if (0 === time && isComplete) {
                            tween = self._first;
                            while (tween && 0 === tween._startTime) {
                                if (!tween._duration) isComplete = false;
                                tween = tween._next;
                            }
                        }
                        time = 0;
                        if (!self._initted) internalForce = true;
                    }
                } else self._totalTime = self._time = self._rawPrevTime = time;
                if ((self._time === prevTime || !self._first) && !force && !internalForce && !pauseTween) return; else if (!self._initted) self._initted = true;
                if (!self._active) if (!self._paused && self._time !== prevTime && time > 0) self._active = true;
                if (0 === prevTime) if (self.vars.onStart) if (0 !== self._time || !self._duration) if (!suppressEvents) self._callback("onStart");
                curTime = self._time;
                if (curTime >= prevTime) {
                    tween = self._first;
                    while (tween) {
                        next = tween._next;
                        if (curTime !== self._time || self._paused && !prevPaused) break; else if (tween._active || tween._startTime <= curTime && !tween._paused && !tween._gc) {
                            if (pauseTween === tween) {
                                self.pause();
                                self._pauseTime = pauseTime;
                            }
                            if (!tween._reversed) tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force); else tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
                        }
                        tween = next;
                    }
                } else {
                    tween = self._last;
                    while (tween) {
                        next = tween._prev;
                        if (curTime !== self._time || self._paused && !prevPaused) break; else if (tween._active || tween._startTime <= prevTime && !tween._paused && !tween._gc) {
                            if (pauseTween === tween) {
                                pauseTween = tween._prev;
                                while (pauseTween && pauseTween.endTime() > self._time) {
                                    pauseTween.render(pauseTween._reversed ? pauseTween.totalDuration() - (time - pauseTween._startTime) * pauseTween._timeScale : (time - pauseTween._startTime) * pauseTween._timeScale, suppressEvents, force);
                                    pauseTween = pauseTween._prev;
                                }
                                pauseTween = null;
                                self.pause();
                                self._pauseTime = pauseTime;
                            }
                            if (!tween._reversed) tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force); else tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
                        }
                        tween = next;
                    }
                }
                if (self._onUpdate) if (!suppressEvents) {
                    if (_lazyTweens.length) _lazyRender();
                    self._callback("onUpdate");
                }
                if (callback) if (!self._gc) if (prevStart === self._startTime || prevTimeScale !== self._timeScale) if (0 === self._time || totalDur >= self.totalDuration()) {
                    if (isComplete) {
                        if (_lazyTweens.length) _lazyRender();
                        if (self._timeline.autoRemoveChildren) self._enabled(false, false);
                        self._active = false;
                    }
                    if (!suppressEvents && self.vars[callback]) self._callback(callback);
                }
            };
            p._hasPausedChild = function() {
                var tween = this._first;
                while (tween) {
                    if (tween._paused || tween instanceof TimelineLite && tween._hasPausedChild()) return true;
                    tween = tween._next;
                }
                return false;
            };
            p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
                ignoreBeforeTime = ignoreBeforeTime || -9999999999;
                var a = [], tween = this._first, cnt = 0;
                while (tween) {
                    if (tween._startTime < ignoreBeforeTime) ; else if (tween instanceof TweenLite.ZP) {
                        if (false !== tweens) a[cnt++] = tween;
                    } else {
                        if (false !== timelines) a[cnt++] = tween;
                        if (false !== nested) {
                            a = a.concat(tween.getChildren(true, tweens, timelines));
                            cnt = a.length;
                        }
                    }
                    tween = tween._next;
                }
                return a;
            };
            p.getTweensOf = function(target, nested) {
                var tweens, i, disabled = this._gc, a = [], cnt = 0;
                if (disabled) this._enabled(true, true);
                tweens = TweenLite.ZP.getTweensOf(target);
                i = tweens.length;
                while (--i > -1) if (tweens[i].timeline === this || nested && this._contains(tweens[i])) a[cnt++] = tweens[i];
                if (disabled) this._enabled(false, true);
                return a;
            };
            p.recent = function() {
                return this._recent;
            };
            p._contains = function(tween) {
                var tl = tween.timeline;
                while (tl) {
                    if (tl === this) return true;
                    tl = tl.timeline;
                }
                return false;
            };
            p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
                ignoreBeforeTime = ignoreBeforeTime || 0;
                var p, tween = this._first, labels = this._labels;
                while (tween) {
                    if (tween._startTime >= ignoreBeforeTime) tween._startTime += amount;
                    tween = tween._next;
                }
                if (adjustLabels) for (p in labels) if (labels[p] >= ignoreBeforeTime) labels[p] += amount;
                return this._uncache(true);
            };
            p._kill = function(vars, target) {
                if (!vars && !target) return this._enabled(false, false);
                var tweens = !target ? this.getChildren(true, true, false) : this.getTweensOf(target), i = tweens.length, changed = false;
                while (--i > -1) if (tweens[i]._kill(vars, target)) changed = true;
                return changed;
            };
            p.clear = function(labels) {
                var tweens = this.getChildren(false, true, true), i = tweens.length;
                this._time = this._totalTime = 0;
                while (--i > -1) tweens[i]._enabled(false, false);
                if (false !== labels) this._labels = {};
                return this._uncache(true);
            };
            p.invalidate = function() {
                var tween = this._first;
                while (tween) {
                    tween.invalidate();
                    tween = tween._next;
                }
                return TweenLite.fw.prototype.invalidate.call(this);
            };
            p._enabled = function(enabled, ignoreTimeline) {
                if (enabled === this._gc) {
                    var tween = this._first;
                    while (tween) {
                        tween._enabled(enabled, true);
                        tween = tween._next;
                    }
                }
                return TweenLite.MQ.prototype._enabled.call(this, enabled, ignoreTimeline);
            };
            p.totalTime = function(time, suppressEvents, uncapped) {
                this._forcingPlayhead = true;
                var val = TweenLite.fw.prototype.totalTime.apply(this, arguments);
                this._forcingPlayhead = false;
                return val;
            };
            p.duration = function(value) {
                if (!arguments.length) {
                    if (this._dirty) this.totalDuration();
                    return this._duration;
                }
                if (0 !== this.duration() && 0 !== value) this.timeScale(this._duration / value);
                return this;
            };
            p.totalDuration = function(value) {
                if (!arguments.length) {
                    if (this._dirty) {
                        var prev, end, max = 0, self = this, tween = self._last, prevStart = 999999999999;
                        while (tween) {
                            prev = tween._prev;
                            if (tween._dirty) tween.totalDuration();
                            if (tween._startTime > prevStart && self._sortChildren && !tween._paused && !self._calculatingDuration) {
                                self._calculatingDuration = 1;
                                self.add(tween, tween._startTime - tween._delay);
                                self._calculatingDuration = 0;
                            } else prevStart = tween._startTime;
                            if (tween._startTime < 0 && !tween._paused) {
                                max -= tween._startTime;
                                if (self._timeline.smoothChildTiming) {
                                    self._startTime += tween._startTime / self._timeScale;
                                    self._time -= tween._startTime;
                                    self._totalTime -= tween._startTime;
                                    self._rawPrevTime -= tween._startTime;
                                }
                                self.shiftChildren(-tween._startTime, false, -9999999999);
                                prevStart = 0;
                            }
                            end = tween._startTime + tween._totalDuration / tween._timeScale;
                            if (end > max) max = end;
                            tween = prev;
                        }
                        self._duration = self._totalDuration = max;
                        self._dirty = false;
                    }
                    return this._totalDuration;
                }
                return value && this.totalDuration() ? this.timeScale(this._totalDuration / value) : this;
            };
            p.paused = function(value) {
                if (false === value && this._paused) {
                    var tween = this._first;
                    while (tween) {
                        if (tween._startTime === this._time && "isPause" === tween.data) tween._rawPrevTime = 0;
                        tween = tween._next;
                    }
                }
                return TweenLite.fw.prototype.paused.apply(this, arguments);
            };
            p.usesFrames = function() {
                var tl = this._timeline;
                while (tl._timeline) tl = tl._timeline;
                return tl === TweenLite.fw._rootFramesTimeline;
            };
            p.rawTime = function(wrapRepeats) {
                return wrapRepeats && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(wrapRepeats) - this._startTime) * this._timeScale;
            };
            return TimelineLite;
        }), true);
        var TimelineLite = TweenLite.li.TimelineLite;
        /*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
        TweenLite.ML._gsDefine("TimelineMax", [ "TimelineLite", "TweenLite", "easing.Ease" ], (function() {
            var TimelineMax = function(vars) {
                TimelineLite.call(this, vars);
                this._repeat = this.vars.repeat || 0;
                this._repeatDelay = this.vars.repeatDelay || 0;
                this._cycle = 0;
                this._yoyo = !!this.vars.yoyo;
                this._dirty = true;
            }, _tinyNum = 1e-8, TweenLiteInternals = TweenLite.ZP._internals, _lazyTweens = TweenLiteInternals.lazyTweens, _lazyRender = TweenLiteInternals.lazyRender, _globals = TweenLite.ML._gsDefine.globals, _easeNone = new TweenLite.SX(null, null, 1, 0), p = TimelineMax.prototype = new TimelineLite;
            p.constructor = TimelineMax;
            p.kill()._gc = false;
            TimelineMax.version = "2.1.3";
            p.invalidate = function() {
                this._yoyo = !!this.vars.yoyo;
                this._repeat = this.vars.repeat || 0;
                this._repeatDelay = this.vars.repeatDelay || 0;
                this._uncache(true);
                return TimelineLite.prototype.invalidate.call(this);
            };
            p.addCallback = function(callback, position, params, scope) {
                return this.add(TweenLite.ZP.delayedCall(0, callback, params, scope), position);
            };
            p.removeCallback = function(callback, position) {
                if (callback) if (null == position) this._kill(null, callback); else {
                    var a = this.getTweensOf(callback, false), i = a.length, time = this._parseTimeOrLabel(position);
                    while (--i > -1) if (a[i]._startTime === time) a[i]._enabled(false, false);
                }
                return this;
            };
            p.removePause = function(position) {
                return this.removeCallback(TimelineLite._internals.pauseCallback, position);
            };
            p.tweenTo = function(position, vars) {
                vars = vars || {};
                var duration, p, t, copy = {
                    ease: _easeNone,
                    useFrames: this.usesFrames(),
                    immediateRender: false,
                    lazy: false
                }, Engine = vars.repeat && _globals.TweenMax || TweenLite.ZP;
                for (p in vars) copy[p] = vars[p];
                copy.time = this._parseTimeOrLabel(position);
                duration = Math.abs(Number(copy.time) - this._time) / this._timeScale || .001;
                t = new Engine(this, duration, copy);
                copy.onStart = function() {
                    t.target.paused(true);
                    if (t.vars.time !== t.target.time() && duration === t.duration() && !t.isFromTo) t.duration(Math.abs(t.vars.time - t.target.time()) / t.target._timeScale).render(t.time(), true, true);
                    if (vars.onStart) vars.onStart.apply(vars.onStartScope || vars.callbackScope || t, vars.onStartParams || []);
                };
                return t;
            };
            p.tweenFromTo = function(fromPosition, toPosition, vars) {
                vars = vars || {};
                fromPosition = this._parseTimeOrLabel(fromPosition);
                vars.startAt = {
                    onComplete: this.seek,
                    onCompleteParams: [ fromPosition ],
                    callbackScope: this
                };
                vars.immediateRender = false !== vars.immediateRender;
                var t = this.tweenTo(toPosition, vars);
                t.isFromTo = 1;
                return t.duration(Math.abs(t.vars.time - fromPosition) / this._timeScale || .001);
            };
            p.render = function(time, suppressEvents, force) {
                if (this._gc) this._enabled(true, false);
                var tween, isComplete, next, callback, internalForce, cycleDuration, pauseTween, curTime, pauseTime, self = this, prevTime = self._time, totalDur = !self._dirty ? self._totalDuration : self.totalDuration(), dur = self._duration, prevTotalTime = self._totalTime, prevStart = self._startTime, prevTimeScale = self._timeScale, prevRawPrevTime = self._rawPrevTime, prevPaused = self._paused, prevCycle = self._cycle;
                if (prevTime !== self._time) time += self._time - prevTime;
                if (time >= totalDur - _tinyNum && time >= 0) {
                    if (!self._locked) {
                        self._totalTime = totalDur;
                        self._cycle = self._repeat;
                    }
                    if (!self._reversed) if (!self._hasPausedChild()) {
                        isComplete = true;
                        callback = "onComplete";
                        internalForce = !!self._timeline.autoRemoveChildren;
                        if (0 === self._duration) if (time <= 0 && time >= -_tinyNum || prevRawPrevTime < 0 || prevRawPrevTime === _tinyNum) if (prevRawPrevTime !== time && self._first) {
                            internalForce = true;
                            if (prevRawPrevTime > _tinyNum) callback = "onReverseComplete";
                        }
                    }
                    self._rawPrevTime = self._duration || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum;
                    if (self._yoyo && 1 & self._cycle) self._time = time = 0; else {
                        self._time = dur;
                        time = dur + 1e-4;
                    }
                } else if (time < _tinyNum) {
                    if (!self._locked) self._totalTime = self._cycle = 0;
                    self._time = 0;
                    if (time > -_tinyNum) time = 0;
                    if (0 !== prevTime || 0 === dur && prevRawPrevTime !== _tinyNum && (prevRawPrevTime > 0 || time < 0 && prevRawPrevTime >= 0) && !self._locked) {
                        callback = "onReverseComplete";
                        isComplete = self._reversed;
                    }
                    if (time < 0) {
                        self._active = false;
                        if (self._timeline.autoRemoveChildren && self._reversed) {
                            internalForce = isComplete = true;
                            callback = "onReverseComplete";
                        } else if (prevRawPrevTime >= 0 && self._first) internalForce = true;
                        self._rawPrevTime = time;
                    } else {
                        self._rawPrevTime = dur || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum;
                        if (0 === time && isComplete) {
                            tween = self._first;
                            while (tween && 0 === tween._startTime) {
                                if (!tween._duration) isComplete = false;
                                tween = tween._next;
                            }
                        }
                        time = 0;
                        if (!self._initted) internalForce = true;
                    }
                } else {
                    if (0 === dur && prevRawPrevTime < 0) internalForce = true;
                    self._time = self._rawPrevTime = time;
                    if (!self._locked) {
                        self._totalTime = time;
                        if (0 !== self._repeat) {
                            cycleDuration = dur + self._repeatDelay;
                            self._cycle = self._totalTime / cycleDuration >> 0;
                            if (self._cycle) if (self._cycle === self._totalTime / cycleDuration && prevTotalTime <= time) self._cycle--;
                            self._time = self._totalTime - self._cycle * cycleDuration;
                            if (self._yoyo) if (1 & self._cycle) self._time = dur - self._time;
                            if (self._time > dur) {
                                self._time = dur;
                                time = dur + 1e-4;
                            } else if (self._time < 0) self._time = time = 0; else time = self._time;
                        }
                    }
                }
                if (self._hasPause && !self._forcingPlayhead && !suppressEvents) {
                    time = self._time;
                    if (time > prevTime || self._repeat && prevCycle !== self._cycle) {
                        tween = self._first;
                        while (tween && tween._startTime <= time && !pauseTween) {
                            if (!tween._duration) if ("isPause" === tween.data && !tween.ratio && !(0 === tween._startTime && 0 === self._rawPrevTime)) pauseTween = tween;
                            tween = tween._next;
                        }
                    } else {
                        tween = self._last;
                        while (tween && tween._startTime >= time && !pauseTween) {
                            if (!tween._duration) if ("isPause" === tween.data && tween._rawPrevTime > 0) pauseTween = tween;
                            tween = tween._prev;
                        }
                    }
                    if (pauseTween) {
                        pauseTime = self._startTime + (self._reversed ? self._duration - pauseTween._startTime : pauseTween._startTime) / self._timeScale;
                        if (pauseTween._startTime < dur) {
                            self._time = self._rawPrevTime = time = pauseTween._startTime;
                            self._totalTime = time + self._cycle * (self._totalDuration + self._repeatDelay);
                        }
                    }
                }
                if (self._cycle !== prevCycle) if (!self._locked) {
                    var backwards = self._yoyo && 0 !== (1 & prevCycle), wrap = backwards === (self._yoyo && 0 !== (1 & self._cycle)), recTotalTime = self._totalTime, recCycle = self._cycle, recRawPrevTime = self._rawPrevTime, recTime = self._time;
                    self._totalTime = prevCycle * dur;
                    if (self._cycle < prevCycle) backwards = !backwards; else self._totalTime += dur;
                    self._time = prevTime;
                    self._rawPrevTime = 0 === dur ? prevRawPrevTime - 1e-4 : prevRawPrevTime;
                    self._cycle = prevCycle;
                    self._locked = true;
                    prevTime = backwards ? 0 : dur;
                    self.render(prevTime, suppressEvents, 0 === dur);
                    if (!suppressEvents) if (!self._gc) if (self.vars.onRepeat) {
                        self._cycle = recCycle;
                        self._locked = false;
                        self._callback("onRepeat");
                    }
                    if (prevTime !== self._time) return;
                    if (wrap) {
                        self._cycle = prevCycle;
                        self._locked = true;
                        prevTime = backwards ? dur + 1e-4 : -1e-4;
                        self.render(prevTime, true, false);
                    }
                    self._locked = false;
                    if (self._paused && !prevPaused) return;
                    self._time = recTime;
                    self._totalTime = recTotalTime;
                    self._cycle = recCycle;
                    self._rawPrevTime = recRawPrevTime;
                }
                if ((self._time === prevTime || !self._first) && !force && !internalForce && !pauseTween) {
                    if (prevTotalTime !== self._totalTime) if (self._onUpdate) if (!suppressEvents) self._callback("onUpdate");
                    return;
                } else if (!self._initted) self._initted = true;
                if (!self._active) if (!self._paused && self._totalTime !== prevTotalTime && time > 0) self._active = true;
                if (0 === prevTotalTime) if (self.vars.onStart) if (0 !== self._totalTime || !self._totalDuration) if (!suppressEvents) self._callback("onStart");
                curTime = self._time;
                if (curTime >= prevTime) {
                    tween = self._first;
                    while (tween) {
                        next = tween._next;
                        if (curTime !== self._time || self._paused && !prevPaused) break; else if (tween._active || tween._startTime <= self._time && !tween._paused && !tween._gc) {
                            if (pauseTween === tween) {
                                self.pause();
                                self._pauseTime = pauseTime;
                            }
                            if (!tween._reversed) tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force); else tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
                        }
                        tween = next;
                    }
                } else {
                    tween = self._last;
                    while (tween) {
                        next = tween._prev;
                        if (curTime !== self._time || self._paused && !prevPaused) break; else if (tween._active || tween._startTime <= prevTime && !tween._paused && !tween._gc) {
                            if (pauseTween === tween) {
                                pauseTween = tween._prev;
                                while (pauseTween && pauseTween.endTime() > self._time) {
                                    pauseTween.render(pauseTween._reversed ? pauseTween.totalDuration() - (time - pauseTween._startTime) * pauseTween._timeScale : (time - pauseTween._startTime) * pauseTween._timeScale, suppressEvents, force);
                                    pauseTween = pauseTween._prev;
                                }
                                pauseTween = null;
                                self.pause();
                                self._pauseTime = pauseTime;
                            }
                            if (!tween._reversed) tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force); else tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
                        }
                        tween = next;
                    }
                }
                if (self._onUpdate) if (!suppressEvents) {
                    if (_lazyTweens.length) _lazyRender();
                    self._callback("onUpdate");
                }
                if (callback) if (!self._locked) if (!self._gc) if (prevStart === self._startTime || prevTimeScale !== self._timeScale) if (0 === self._time || totalDur >= self.totalDuration()) {
                    if (isComplete) {
                        if (_lazyTweens.length) _lazyRender();
                        if (self._timeline.autoRemoveChildren) self._enabled(false, false);
                        self._active = false;
                    }
                    if (!suppressEvents && self.vars[callback]) self._callback(callback);
                }
            };
            p.getActive = function(nested, tweens, timelines) {
                var i, tween, a = [], all = this.getChildren(nested || null == nested, tweens || null == nested, !!timelines), cnt = 0, l = all.length;
                for (i = 0; i < l; i++) {
                    tween = all[i];
                    if (tween.isActive()) a[cnt++] = tween;
                }
                return a;
            };
            p.getLabelAfter = function(time) {
                if (!time) if (0 !== time) time = this._time;
                var i, labels = this.getLabelsArray(), l = labels.length;
                for (i = 0; i < l; i++) if (labels[i].time > time) return labels[i].name;
                return null;
            };
            p.getLabelBefore = function(time) {
                if (null == time) time = this._time;
                var labels = this.getLabelsArray(), i = labels.length;
                while (--i > -1) if (labels[i].time < time) return labels[i].name;
                return null;
            };
            p.getLabelsArray = function() {
                var p, a = [], cnt = 0;
                for (p in this._labels) a[cnt++] = {
                    time: this._labels[p],
                    name: p
                };
                a.sort((function(a, b) {
                    return a.time - b.time;
                }));
                return a;
            };
            p.invalidate = function() {
                this._locked = false;
                return TimelineLite.prototype.invalidate.call(this);
            };
            p.progress = function(value, suppressEvents) {
                return !arguments.length ? this._time / this.duration() || 0 : this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - value : value) + this._cycle * (this._duration + this._repeatDelay), suppressEvents);
            };
            p.totalProgress = function(value, suppressEvents) {
                return !arguments.length ? this._totalTime / this.totalDuration() || 0 : this.totalTime(this.totalDuration() * value, suppressEvents);
            };
            p.totalDuration = function(value) {
                if (!arguments.length) {
                    if (this._dirty) {
                        TimelineLite.prototype.totalDuration.call(this);
                        this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat;
                    }
                    return this._totalDuration;
                }
                return -1 === this._repeat || !value ? this : this.timeScale(this.totalDuration() / value);
            };
            p.time = function(value, suppressEvents) {
                if (!arguments.length) return this._time;
                if (this._dirty) this.totalDuration();
                var duration = this._duration, cycle = this._cycle, cycleDur = cycle * (duration + this._repeatDelay);
                if (value > duration) value = duration;
                return this.totalTime(this._yoyo && 1 & cycle ? duration - value + cycleDur : this._repeat ? value + cycleDur : value, suppressEvents);
            };
            p.repeat = function(value) {
                if (!arguments.length) return this._repeat;
                this._repeat = value;
                return this._uncache(true);
            };
            p.repeatDelay = function(value) {
                if (!arguments.length) return this._repeatDelay;
                this._repeatDelay = value;
                return this._uncache(true);
            };
            p.yoyo = function(value) {
                if (!arguments.length) return this._yoyo;
                this._yoyo = value;
                return this;
            };
            p.currentLabel = function(value) {
                if (!arguments.length) return this.getLabelBefore(this._time + _tinyNum);
                return this.seek(value, true);
            };
            return TimelineMax;
        }), true);
        var TimelineMax = TweenLite.li.TimelineMax;
        /*!
 * VERSION: 1.3.9
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
        var _RAD2DEG = 180 / Math.PI, _r1 = [], _r2 = [], _r3 = [], _corProps = {}, _globals = TweenLite.ML._gsDefine.globals, Segment = function(a, b, c, d) {
            if (c === d) c = d - (d - b) / 1e6;
            if (a === b) b = a + (c - a) / 1e6;
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.da = d - a;
            this.ca = c - a;
            this.ba = b - a;
        }, _correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", cubicToQuadratic = function(a, b, c, d) {
            var q1 = {
                a
            }, q2 = {}, q3 = {}, q4 = {
                c: d
            }, mab = (a + b) / 2, mbc = (b + c) / 2, mcd = (c + d) / 2, mabc = (mab + mbc) / 2, mbcd = (mbc + mcd) / 2, m8 = (mbcd - mabc) / 8;
            q1.b = mab + (a - mab) / 4;
            q2.b = mabc + m8;
            q1.c = q2.a = (q1.b + q2.b) / 2;
            q2.c = q3.a = (mabc + mbcd) / 2;
            q3.b = mbcd - m8;
            q4.b = mcd + (d - mcd) / 4;
            q3.c = q4.a = (q3.b + q4.b) / 2;
            return [ q1, q2, q3, q4 ];
        }, _calculateControlPoints = function(a, curviness, quad, basic, correlate) {
            var i, p1, p2, p3, seg, m1, m2, mm, cp2, qb, r1, r2, tl, l = a.length - 1, ii = 0, cp1 = a[0].a;
            for (i = 0; i < l; i++) {
                seg = a[ii];
                p1 = seg.a;
                p2 = seg.d;
                p3 = a[ii + 1].d;
                if (correlate) {
                    r1 = _r1[i];
                    r2 = _r2[i];
                    tl = (r2 + r1) * curviness * .25 / (basic ? .5 : _r3[i] || .5);
                    m1 = p2 - (p2 - p1) * (basic ? .5 * curviness : 0 !== r1 ? tl / r1 : 0);
                    m2 = p2 + (p3 - p2) * (basic ? .5 * curviness : 0 !== r2 ? tl / r2 : 0);
                    mm = p2 - (m1 + ((m2 - m1) * (3 * r1 / (r1 + r2) + .5) / 4 || 0));
                } else {
                    m1 = p2 - (p2 - p1) * curviness * .5;
                    m2 = p2 + (p3 - p2) * curviness * .5;
                    mm = p2 - (m1 + m2) / 2;
                }
                m1 += mm;
                m2 += mm;
                seg.c = cp2 = m1;
                if (0 !== i) seg.b = cp1; else seg.b = cp1 = seg.a + .6 * (seg.c - seg.a);
                seg.da = p2 - p1;
                seg.ca = cp2 - p1;
                seg.ba = cp1 - p1;
                if (quad) {
                    qb = cubicToQuadratic(p1, cp1, cp2, p2);
                    a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
                    ii += 4;
                } else ii++;
                cp1 = m2;
            }
            seg = a[ii];
            seg.b = cp1;
            seg.c = cp1 + .4 * (seg.d - cp1);
            seg.da = seg.d - seg.a;
            seg.ca = seg.c - seg.a;
            seg.ba = cp1 - seg.a;
            if (quad) {
                qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
                a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
            }
        }, _parseAnchors = function(values, p, correlate, prepend) {
            var l, i, p1, p2, p3, tmp, a = [];
            if (prepend) {
                values = [ prepend ].concat(values);
                i = values.length;
                while (--i > -1) if ("string" === typeof (tmp = values[i][p])) if ("=" === tmp.charAt(1)) values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2));
            }
            l = values.length - 2;
            if (l < 0) {
                a[0] = new Segment(values[0][p], 0, 0, values[0][p]);
                return a;
            }
            for (i = 0; i < l; i++) {
                p1 = values[i][p];
                p2 = values[i + 1][p];
                a[i] = new Segment(p1, 0, 0, p2);
                if (correlate) {
                    p3 = values[i + 2][p];
                    _r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);
                    _r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2);
                }
            }
            a[i] = new Segment(values[i][p], 0, 0, values[i + 1][p]);
            return a;
        }, bezierThrough = function(values, curviness, quadratic, basic, correlate, prepend) {
            var i, p, a, j, r, l, seamless, last, obj = {}, props = [], first = prepend || values[0];
            correlate = "string" === typeof correlate ? "," + correlate + "," : _correlate;
            if (null == curviness) curviness = 1;
            for (p in values[0]) props.push(p);
            if (values.length > 1) {
                last = values[values.length - 1];
                seamless = true;
                i = props.length;
                while (--i > -1) {
                    p = props[i];
                    if (Math.abs(first[p] - last[p]) > .05) {
                        seamless = false;
                        break;
                    }
                }
                if (seamless) {
                    values = values.concat();
                    if (prepend) values.unshift(prepend);
                    values.push(values[1]);
                    prepend = values[values.length - 3];
                }
            }
            _r1.length = _r2.length = _r3.length = 0;
            i = props.length;
            while (--i > -1) {
                p = props[i];
                _corProps[p] = -1 !== correlate.indexOf("," + p + ",");
                obj[p] = _parseAnchors(values, p, _corProps[p], prepend);
            }
            i = _r1.length;
            while (--i > -1) {
                _r1[i] = Math.sqrt(_r1[i]);
                _r2[i] = Math.sqrt(_r2[i]);
            }
            if (!basic) {
                i = props.length;
                while (--i > -1) if (_corProps[p]) {
                    a = obj[props[i]];
                    l = a.length - 1;
                    for (j = 0; j < l; j++) {
                        r = a[j + 1].da / _r2[j] + a[j].da / _r1[j] || 0;
                        _r3[j] = (_r3[j] || 0) + r * r;
                    }
                }
                i = _r3.length;
                while (--i > -1) _r3[i] = Math.sqrt(_r3[i]);
            }
            i = props.length;
            j = quadratic ? 4 : 1;
            while (--i > -1) {
                p = props[i];
                a = obj[p];
                _calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]);
                if (seamless) {
                    a.splice(0, j);
                    a.splice(a.length - j, j);
                }
            }
            return obj;
        }, _parseBezierData = function(values, type, prepend) {
            type = type || "soft";
            var a, b, c, d, cur, i, j, l, p, cnt, tmp, obj = {}, inc = "cubic" === type ? 3 : 2, soft = "soft" === type, props = [];
            if (soft && prepend) values = [ prepend ].concat(values);
            if (null == values || values.length < inc + 1) throw "invalid Bezier data";
            for (p in values[0]) props.push(p);
            i = props.length;
            while (--i > -1) {
                p = props[i];
                obj[p] = cur = [];
                cnt = 0;
                l = values.length;
                for (j = 0; j < l; j++) {
                    a = null == prepend ? values[j][p] : "string" === typeof (tmp = values[j][p]) && "=" === tmp.charAt(1) ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
                    if (soft) if (j > 1) if (j < l - 1) cur[cnt++] = (a + cur[cnt - 2]) / 2;
                    cur[cnt++] = a;
                }
                l = cnt - inc + 1;
                cnt = 0;
                for (j = 0; j < l; j += inc) {
                    a = cur[j];
                    b = cur[j + 1];
                    c = cur[j + 2];
                    d = 2 === inc ? 0 : cur[j + 3];
                    cur[cnt++] = tmp = 3 === inc ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
                }
                cur.length = cnt;
            }
            return obj;
        }, _addCubicLengths = function(a, steps, resolution) {
            var d, d1, s, da, ca, ba, p, i, inv, bez, index, inc = 1 / resolution, j = a.length;
            while (--j > -1) {
                bez = a[j];
                s = bez.a;
                da = bez.d - s;
                ca = bez.c - s;
                ba = bez.b - s;
                d = d1 = 0;
                for (i = 1; i <= resolution; i++) {
                    p = inc * i;
                    inv = 1 - p;
                    d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);
                    index = j * resolution + i - 1;
                    steps[index] = (steps[index] || 0) + d * d;
                }
            }
        }, _parseLengthData = function(obj, resolution) {
            resolution = resolution >> 0 || 6;
            var p, i, l, index, a = [], lengths = [], d = 0, total = 0, threshold = resolution - 1, segments = [], curLS = [];
            for (p in obj) _addCubicLengths(obj[p], a, resolution);
            l = a.length;
            for (i = 0; i < l; i++) {
                d += Math.sqrt(a[i]);
                index = i % resolution;
                curLS[index] = d;
                if (index === threshold) {
                    total += d;
                    index = i / resolution >> 0;
                    segments[index] = curLS;
                    lengths[index] = total;
                    d = 0;
                    curLS = [];
                }
            }
            return {
                length: total,
                lengths,
                segments
            };
        }, BezierPlugin = TweenLite.ML._gsDefine.plugin({
            propName: "bezier",
            priority: -1,
            version: "1.3.9",
            API: 2,
            global: true,
            init: function(target, vars, tween) {
                this._target = target;
                if (vars instanceof Array) vars = {
                    values: vars
                };
                this._func = {};
                this._mod = {};
                this._props = [];
                this._timeRes = null == vars.timeResolution ? 6 : parseInt(vars.timeResolution, 10);
                var p, isFunc, i, j, prepend, values = vars.values || [], first = {}, second = values[0], autoRotate = vars.autoRotate || tween.vars.orientToBezier;
                this._autoRotate = autoRotate ? autoRotate instanceof Array ? autoRotate : [ [ "x", "y", "rotation", true === autoRotate ? 0 : Number(autoRotate) || 0 ] ] : null;
                for (p in second) this._props.push(p);
                i = this._props.length;
                while (--i > -1) {
                    p = this._props[i];
                    this._overwriteProps.push(p);
                    isFunc = this._func[p] = "function" === typeof target[p];
                    first[p] = !isFunc ? parseFloat(target[p]) : target[p.indexOf("set") || "function" !== typeof target["get" + p.substr(3)] ? p : "get" + p.substr(3)]();
                    if (!prepend) if (first[p] !== values[0][p]) prepend = first;
                }
                this._beziers = "cubic" !== vars.type && "quadratic" !== vars.type && "soft" !== vars.type ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, false, "thruBasic" === vars.type, vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
                this._segCount = this._beziers[p].length;
                if (this._timeRes) {
                    var ld = _parseLengthData(this._beziers, this._timeRes);
                    this._length = ld.length;
                    this._lengths = ld.lengths;
                    this._segments = ld.segments;
                    this._l1 = this._li = this._s1 = this._si = 0;
                    this._l2 = this._lengths[0];
                    this._curSeg = this._segments[0];
                    this._s2 = this._curSeg[0];
                    this._prec = 1 / this._curSeg.length;
                }
                if (autoRotate = this._autoRotate) {
                    this._initialRotations = [];
                    if (!(autoRotate[0] instanceof Array)) this._autoRotate = autoRotate = [ autoRotate ];
                    i = autoRotate.length;
                    while (--i > -1) {
                        for (j = 0; j < 3; j++) {
                            p = autoRotate[i][j];
                            this._func[p] = "function" === typeof target[p] ? target[p.indexOf("set") || "function" !== typeof target["get" + p.substr(3)] ? p : "get" + p.substr(3)] : false;
                        }
                        p = autoRotate[i][2];
                        this._initialRotations[i] = (this._func[p] ? this._func[p].call(this._target) : this._target[p]) || 0;
                        this._overwriteProps.push(p);
                    }
                }
                this._startRatio = tween.vars.runBackwards ? 1 : 0;
                return true;
            },
            set: function(v) {
                var curIndex, inv, i, p, b, t, val, l, lengths, curSeg, v1, segments = this._segCount, func = this._func, target = this._target, notStart = v !== this._startRatio;
                if (!this._timeRes) {
                    curIndex = v < 0 ? 0 : v >= 1 ? segments - 1 : segments * v >> 0;
                    t = (v - curIndex * (1 / segments)) * segments;
                } else {
                    lengths = this._lengths;
                    curSeg = this._curSeg;
                    v1 = v * this._length;
                    i = this._li;
                    if (v1 > this._l2 && i < segments - 1) {
                        l = segments - 1;
                        while (i < l && (this._l2 = lengths[++i]) <= v1) ;
                        this._l1 = lengths[i - 1];
                        this._li = i;
                        this._curSeg = curSeg = this._segments[i];
                        this._s2 = curSeg[this._s1 = this._si = 0];
                    } else if (v1 < this._l1 && i > 0) {
                        while (i > 0 && (this._l1 = lengths[--i]) >= v1) ;
                        if (0 === i && v1 < this._l1) this._l1 = 0; else i++;
                        this._l2 = lengths[i];
                        this._li = i;
                        this._curSeg = curSeg = this._segments[i];
                        this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
                        this._s2 = curSeg[this._si];
                    }
                    curIndex = i;
                    v1 -= this._l1;
                    i = this._si;
                    if (v1 > this._s2 && i < curSeg.length - 1) {
                        l = curSeg.length - 1;
                        while (i < l && (this._s2 = curSeg[++i]) <= v1) ;
                        this._s1 = curSeg[i - 1];
                        this._si = i;
                    } else if (v1 < this._s1 && i > 0) {
                        while (i > 0 && (this._s1 = curSeg[--i]) >= v1) ;
                        if (0 === i && v1 < this._s1) this._s1 = 0; else i++;
                        this._s2 = curSeg[i];
                        this._si = i;
                    }
                    t = 1 === v ? 1 : (i + (v1 - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
                }
                inv = 1 - t;
                i = this._props.length;
                while (--i > -1) {
                    p = this._props[i];
                    b = this._beziers[p][curIndex];
                    val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;
                    if (this._mod[p]) val = this._mod[p](val, target);
                    if (func[p]) target[p](val); else target[p] = val;
                }
                if (this._autoRotate) {
                    var b2, x1, y1, x2, y2, add, conv, ar = this._autoRotate;
                    i = ar.length;
                    while (--i > -1) {
                        p = ar[i][2];
                        add = ar[i][3] || 0;
                        conv = true === ar[i][4] ? 1 : _RAD2DEG;
                        b = this._beziers[ar[i][0]];
                        b2 = this._beziers[ar[i][1]];
                        if (b && b2) {
                            b = b[curIndex];
                            b2 = b2[curIndex];
                            x1 = b.a + (b.b - b.a) * t;
                            x2 = b.b + (b.c - b.b) * t;
                            x1 += (x2 - x1) * t;
                            x2 += (b.c + (b.d - b.c) * t - x2) * t;
                            y1 = b2.a + (b2.b - b2.a) * t;
                            y2 = b2.b + (b2.c - b2.b) * t;
                            y1 += (y2 - y1) * t;
                            y2 += (b2.c + (b2.d - b2.c) * t - y2) * t;
                            val = notStart ? Math.atan2(y2 - y1, x2 - x1) * conv + add : this._initialRotations[i];
                            if (this._mod[p]) val = this._mod[p](val, target);
                            if (func[p]) target[p](val); else target[p] = val;
                        }
                    }
                }
            }
        }), BezierPlugin_p = BezierPlugin.prototype;
        BezierPlugin.bezierThrough = bezierThrough;
        BezierPlugin.cubicToQuadratic = cubicToQuadratic;
        BezierPlugin._autoCSS = true;
        BezierPlugin.quadraticToCubic = function(a, b, c) {
            return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
        };
        BezierPlugin._cssRegister = function() {
            var CSSPlugin = _globals.CSSPlugin;
            if (!CSSPlugin) return;
            var _internals = CSSPlugin._internals, _parseToProxy = _internals._parseToProxy, _setPluginRatio = _internals._setPluginRatio, CSSPropTween = _internals.CSSPropTween;
            _internals._registerComplexSpecialProp("bezier", {
                parser: function(t, e, prop, cssp, pt, plugin) {
                    if (e instanceof Array) e = {
                        values: e
                    };
                    plugin = new BezierPlugin;
                    var i, p, data, values = e.values, l = values.length - 1, pluginValues = [], v = {};
                    if (l < 0) return pt;
                    for (i = 0; i <= l; i++) {
                        data = _parseToProxy(t, values[i], cssp, pt, plugin, l !== i);
                        pluginValues[i] = data.end;
                    }
                    for (p in e) v[p] = e[p];
                    v.values = pluginValues;
                    pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2);
                    pt.data = data;
                    pt.plugin = plugin;
                    pt.setRatio = _setPluginRatio;
                    if (0 === v.autoRotate) v.autoRotate = true;
                    if (v.autoRotate && !(v.autoRotate instanceof Array)) {
                        i = true === v.autoRotate ? 0 : Number(v.autoRotate);
                        v.autoRotate = null != data.end.left ? [ [ "left", "top", "rotation", i, false ] ] : null != data.end.x ? [ [ "x", "y", "rotation", i, false ] ] : false;
                    }
                    if (v.autoRotate) {
                        if (!cssp._transform) cssp._enableTransforms(false);
                        data.autoRotate = cssp._target._gsTransform;
                        data.proxy.rotation = data.autoRotate.rotation || 0;
                        cssp._overwriteProps.push("rotation");
                    }
                    plugin._onInitTween(data.proxy, v, cssp._tween);
                    return pt;
                }
            });
        };
        BezierPlugin_p._mod = function(lookup) {
            var val, op = this._overwriteProps, i = op.length;
            while (--i > -1) {
                val = lookup[op[i]];
                if (val && "function" === typeof val) this._mod[op[i]] = val;
            }
        };
        BezierPlugin_p._kill = function(lookup) {
            var p, i, a = this._props;
            for (p in this._beziers) if (p in lookup) {
                delete this._beziers[p];
                delete this._func[p];
                i = a.length;
                while (--i > -1) if (a[i] === p) a.splice(i, 1);
            }
            a = this._autoRotate;
            if (a) {
                i = a.length;
                while (--i > -1) if (lookup[a[i][2]]) a.splice(i, 1);
            }
            return this._super._kill.call(this, lookup);
        };
        /*!
 * VERSION: 1.16.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
        TweenLite.ML._gsDefine("easing.Back", [ "easing.Ease" ], (function() {
            var SteppedEase, ExpoScaleEase, RoughEase, _createElastic, w = TweenLite.ML.GreenSockGlobals || TweenLite.ML, gs = w.com.greensock, _2PI = 2 * Math.PI, _HALF_PI = Math.PI / 2, _class = gs._class, _create = function(n, f) {
                var C = _class("easing." + n, (function() {}), true), p = C.prototype = new TweenLite.SX;
                p.constructor = C;
                p.getRatio = f;
                return C;
            }, _easeReg = TweenLite.SX.register || function() {}, _wrap = function(name, EaseOut, EaseIn, EaseInOut, aliases) {
                var C = _class("easing." + name, {
                    easeOut: new EaseOut,
                    easeIn: new EaseIn,
                    easeInOut: new EaseInOut
                }, true);
                _easeReg(C, name);
                return C;
            }, EasePoint = function(time, value, next) {
                this.t = time;
                this.v = value;
                if (next) {
                    this.next = next;
                    next.prev = this;
                    this.c = next.v - value;
                    this.gap = next.t - time;
                }
            }, _createBack = function(n, f) {
                var C = _class("easing." + n, (function(overshoot) {
                    this._p1 = overshoot || 0 === overshoot ? overshoot : 1.70158;
                    this._p2 = 1.525 * this._p1;
                }), true), p = C.prototype = new TweenLite.SX;
                p.constructor = C;
                p.getRatio = f;
                p.config = function(overshoot) {
                    return new C(overshoot);
                };
                return C;
            }, Back = _wrap("Back", _createBack("BackOut", (function(p) {
                return (p -= 1) * p * ((this._p1 + 1) * p + this._p1) + 1;
            })), _createBack("BackIn", (function(p) {
                return p * p * ((this._p1 + 1) * p - this._p1);
            })), _createBack("BackInOut", (function(p) {
                return (p *= 2) < 1 ? .5 * p * p * ((this._p2 + 1) * p - this._p2) : .5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
            }))), SlowMo = _class("easing.SlowMo", (function(linearRatio, power, yoyoMode) {
                power = power || 0 === power ? power : .7;
                if (null == linearRatio) linearRatio = .7; else if (linearRatio > 1) linearRatio = 1;
                this._p = 1 !== linearRatio ? power : 0;
                this._p1 = (1 - linearRatio) / 2;
                this._p2 = linearRatio;
                this._p3 = this._p1 + this._p2;
                this._calcEnd = true === yoyoMode;
            }), true), p = SlowMo.prototype = new TweenLite.SX;
            p.constructor = SlowMo;
            p.getRatio = function(p) {
                var r = p + (.5 - p) * this._p;
                if (p < this._p1) return this._calcEnd ? 1 - (p = 1 - p / this._p1) * p : r - (p = 1 - p / this._p1) * p * p * p * r; else if (p > this._p3) return this._calcEnd ? 1 === p ? 0 : 1 - (p = (p - this._p3) / this._p1) * p : r + (p - r) * (p = (p - this._p3) / this._p1) * p * p * p;
                return this._calcEnd ? 1 : r;
            };
            SlowMo.ease = new SlowMo(.7, .7);
            p.config = SlowMo.config = function(linearRatio, power, yoyoMode) {
                return new SlowMo(linearRatio, power, yoyoMode);
            };
            SteppedEase = _class("easing.SteppedEase", (function(steps, immediateStart) {
                steps = steps || 1;
                this._p1 = 1 / steps;
                this._p2 = steps + (immediateStart ? 0 : 1);
                this._p3 = immediateStart ? 1 : 0;
            }), true);
            p = SteppedEase.prototype = new TweenLite.SX;
            p.constructor = SteppedEase;
            p.getRatio = function(p) {
                if (p < 0) p = 0; else if (p >= 1) p = .999999999;
                return ((this._p2 * p | 0) + this._p3) * this._p1;
            };
            p.config = SteppedEase.config = function(steps, immediateStart) {
                return new SteppedEase(steps, immediateStart);
            };
            ExpoScaleEase = _class("easing.ExpoScaleEase", (function(start, end, ease) {
                this._p1 = Math.log(end / start);
                this._p2 = end - start;
                this._p3 = start;
                this._ease = ease;
            }), true);
            p = ExpoScaleEase.prototype = new TweenLite.SX;
            p.constructor = ExpoScaleEase;
            p.getRatio = function(p) {
                if (this._ease) p = this._ease.getRatio(p);
                return (this._p3 * Math.exp(this._p1 * p) - this._p3) / this._p2;
            };
            p.config = ExpoScaleEase.config = function(start, end, ease) {
                return new ExpoScaleEase(start, end, ease);
            };
            RoughEase = _class("easing.RoughEase", (function(vars) {
                vars = vars || {};
                var x, y, bump, invX, obj, pnt, taper = vars.taper || "none", a = [], cnt = 0, points = 0 | (vars.points || 20), i = points, randomize = false !== vars.randomize, clamp = true === vars.clamp, template = vars.template instanceof TweenLite.SX ? vars.template : null, strength = "number" === typeof vars.strength ? .4 * vars.strength : .4;
                while (--i > -1) {
                    x = randomize ? Math.random() : 1 / points * i;
                    y = template ? template.getRatio(x) : x;
                    if ("none" === taper) bump = strength; else if ("out" === taper) {
                        invX = 1 - x;
                        bump = invX * invX * strength;
                    } else if ("in" === taper) bump = x * x * strength; else if (x < .5) {
                        invX = 2 * x;
                        bump = invX * invX * .5 * strength;
                    } else {
                        invX = 2 * (1 - x);
                        bump = invX * invX * .5 * strength;
                    }
                    if (randomize) y += Math.random() * bump - .5 * bump; else if (i % 2) y += .5 * bump; else y -= .5 * bump;
                    if (clamp) if (y > 1) y = 1; else if (y < 0) y = 0;
                    a[cnt++] = {
                        x,
                        y
                    };
                }
                a.sort((function(a, b) {
                    return a.x - b.x;
                }));
                pnt = new EasePoint(1, 1, null);
                i = points;
                while (--i > -1) {
                    obj = a[i];
                    pnt = new EasePoint(obj.x, obj.y, pnt);
                }
                this._prev = new EasePoint(0, 0, 0 !== pnt.t ? pnt : pnt.next);
            }), true);
            p = RoughEase.prototype = new TweenLite.SX;
            p.constructor = RoughEase;
            p.getRatio = function(p) {
                var pnt = this._prev;
                if (p > pnt.t) {
                    while (pnt.next && p >= pnt.t) pnt = pnt.next;
                    pnt = pnt.prev;
                } else while (pnt.prev && p <= pnt.t) pnt = pnt.prev;
                this._prev = pnt;
                return pnt.v + (p - pnt.t) / pnt.gap * pnt.c;
            };
            p.config = function(vars) {
                return new RoughEase(vars);
            };
            RoughEase.ease = new RoughEase;
            _wrap("Bounce", _create("BounceOut", (function(p) {
                if (p < 1 / 2.75) return 7.5625 * p * p; else if (p < 2 / 2.75) return 7.5625 * (p -= 1.5 / 2.75) * p + .75; else if (p < 2.5 / 2.75) return 7.5625 * (p -= 2.25 / 2.75) * p + .9375;
                return 7.5625 * (p -= 2.625 / 2.75) * p + .984375;
            })), _create("BounceIn", (function(p) {
                if ((p = 1 - p) < 1 / 2.75) return 1 - 7.5625 * p * p; else if (p < 2 / 2.75) return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + .75); else if (p < 2.5 / 2.75) return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + .9375);
                return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + .984375);
            })), _create("BounceInOut", (function(p) {
                var invert = p < .5;
                if (invert) p = 1 - 2 * p; else p = 2 * p - 1;
                if (p < 1 / 2.75) p *= 7.5625 * p; else if (p < 2 / 2.75) p = 7.5625 * (p -= 1.5 / 2.75) * p + .75; else if (p < 2.5 / 2.75) p = 7.5625 * (p -= 2.25 / 2.75) * p + .9375; else p = 7.5625 * (p -= 2.625 / 2.75) * p + .984375;
                return invert ? .5 * (1 - p) : .5 * p + .5;
            })));
            _wrap("Circ", _create("CircOut", (function(p) {
                return Math.sqrt(1 - (p -= 1) * p);
            })), _create("CircIn", (function(p) {
                return -(Math.sqrt(1 - p * p) - 1);
            })), _create("CircInOut", (function(p) {
                return (p *= 2) < 1 ? -.5 * (Math.sqrt(1 - p * p) - 1) : .5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
            })));
            _createElastic = function(n, f, def) {
                var C = _class("easing." + n, (function(amplitude, period) {
                    this._p1 = amplitude >= 1 ? amplitude : 1;
                    this._p2 = (period || def) / (amplitude < 1 ? amplitude : 1);
                    this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
                    this._p2 = _2PI / this._p2;
                }), true), p = C.prototype = new TweenLite.SX;
                p.constructor = C;
                p.getRatio = f;
                p.config = function(amplitude, period) {
                    return new C(amplitude, period);
                };
                return C;
            };
            _wrap("Elastic", _createElastic("ElasticOut", (function(p) {
                return this._p1 * Math.pow(2, -10 * p) * Math.sin((p - this._p3) * this._p2) + 1;
            }), .3), _createElastic("ElasticIn", (function(p) {
                return -this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2);
            }), .3), _createElastic("ElasticInOut", (function(p) {
                return (p *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2) * .5 + 1;
            }), .45));
            _wrap("Expo", _create("ExpoOut", (function(p) {
                return 1 - Math.pow(2, -10 * p);
            })), _create("ExpoIn", (function(p) {
                return Math.pow(2, 10 * (p - 1)) - .001;
            })), _create("ExpoInOut", (function(p) {
                return (p *= 2) < 1 ? .5 * Math.pow(2, 10 * (p - 1)) : .5 * (2 - Math.pow(2, -10 * (p - 1)));
            })));
            _wrap("Sine", _create("SineOut", (function(p) {
                return Math.sin(p * _HALF_PI);
            })), _create("SineIn", (function(p) {
                return -Math.cos(p * _HALF_PI) + 1;
            })), _create("SineInOut", (function(p) {
                return -.5 * (Math.cos(Math.PI * p) - 1);
            })));
            _class("easing.EaseLookup", {
                find: function(s) {
                    return TweenLite.SX.map[s];
                }
            }, true);
            _easeReg(w.SlowMo, "SlowMo", "ease,");
            _easeReg(RoughEase, "RoughEase", "ease,");
            _easeReg(SteppedEase, "SteppedEase", "ease,");
            return Back;
        }), true);
        var Back = TweenLite.li.Back;
        var Elastic = TweenLite.li.Elastic;
        var Bounce = TweenLite.li.Bounce;
        var RoughEase = TweenLite.li.RoughEase;
        var SlowMo = TweenLite.li.SlowMo;
        var SteppedEase = TweenLite.li.SteppedEase;
        var Circ = TweenLite.li.Circ;
        var Expo = TweenLite.li.Expo;
        var Sine = TweenLite.li.Sine;
        var ExpoScaleEase = TweenLite.li.ExpoScaleEase;
        /*!
 * VERSION: 2.1.3
 * DATE: 2019-05-17
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
        var TweenMax_TweenMax = TweenMax;
        TweenMax_TweenMax._autoActivated = [ TimelineLite, TimelineMax, CSSPlugin, AttrPlugin, BezierPlugin, RoundPropsPlugin, DirectionalRotationPlugin, Back, Elastic, Bounce, RoughEase, SlowMo, SteppedEase, Circ, Expo, Sine, ExpoScaleEase ];
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }), this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            }));
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
                    return item.breakpoint === mediaBreakpoint;
                }));
                matchMedia.addListener((function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                }));
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            } else for (let i = оbjects.length - 1; i >= 0; i--) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if ("last" === place || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if ("first" === place) {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (void 0 !== parent.children[index]) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if ("min" === this.type) Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return -1;
                    if ("last" === a.place || "first" === b.place) return 1;
                    return a.place - b.place;
                }
                return a.breakpoint - b.breakpoint;
            })); else {
                Array.prototype.sort.call(arr, (function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if ("first" === a.place || "last" === b.place) return 1;
                        if ("last" === a.place || "first" === b.place) return -1;
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                }));
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
        (function() {
            "use strict";
            var defaultConf = {
                ellipsis: "…",
                debounce: 0,
                responsive: true,
                className: ".clamp",
                lines: 2,
                portrait: null,
                break_word: true
            };
            var _idCounter = 0;
            var RAF_SUPPORTED = !!window.requestAnimationFrame;
            var newId = function() {
                _idCounter += 1;
                return _idCounter;
            };
            var setIdAttribute = function(element, id) {
                element.setAttribute("data-ellipsis-id", id);
            };
            var getIdAttribute = function(element) {
                return element.getAttribute("data-ellipsis-id");
            };
            var storeCache = function(cache, element) {
                var id = newId();
                setIdAttribute(element, id);
                cache[id] = cache[id] || {};
                cache[id].element = element;
                cache[id].innerHTML = element.innerHTML;
            };
            var retrieveCache = function(cache, element) {
                if (cache) return cache[getIdAttribute(element)]; else return null;
            };
            var getCachedElements = function(cache) {
                return Object.keys(cache).map((function(value, index) {
                    return cache[value].element;
                }));
            };
            var merge = function(obj1, obj2) {
                var obj3 = {};
                for (var attrn in obj1) obj3[attrn] = obj1[attrn];
                for (var attrnm in obj2) obj3[attrnm] = obj2[attrnm];
                return obj3;
            };
            function Ellipsis(opts) {
                var conf = merge(defaultConf, opts || {});
                this.create(conf);
                this.add();
            }
            Ellipsis.prototype = {
                conf: {},
                prop: {},
                lines: {},
                temp: null,
                listener: null,
                create: function(opts) {
                    this.conf = opts;
                    this.lines = {
                        get current() {
                            if (opts.portrait && window.innerHeight > window.innerWidth) return opts.portrait;
                            return opts.lines;
                        }
                    };
                    if (this.conf.responsive) {
                        this.temp = {};
                        var debounceTime = this.conf.debounce;
                        var listener;
                        if (RAF_SUPPORTED && !debounceTime) {
                            this._isScheduled = false;
                            var self = this;
                            listener = function(event) {
                                if (!self._isScheduled) {
                                    self._isScheduled = true;
                                    window.requestAnimationFrame((function() {
                                        self._isScheduled = false;
                                        self.add(getCachedElements(self.temp));
                                    }));
                                }
                            };
                        } else {
                            debounceTime = debounceTime || 16;
                            var debounce;
                            listener = function(event) {
                                clearTimeout(debounce);
                                debounce = setTimeout(function() {
                                    this.add(getCachedElements(this.temp));
                                }.bind(this), debounceTime);
                            };
                        }
                        this.listener = listener.bind(this);
                        window.addEventListener("resize", this.listener, false);
                        window.removeEventListener("beforeunload", this.listener, false);
                    }
                },
                destroy: function() {
                    this.listener && window.removeEventListener("resize", this.listener, false);
                },
                createProp: function(element) {
                    this.prop = {
                        get height() {
                            var viewportOffset = element.getBoundingClientRect();
                            return parseInt(viewportOffset.bottom - viewportOffset.top, 10);
                        },
                        get lineheight() {
                            var lineh = getComputedStyle(element).getPropertyValue("line-height");
                            if (String("normal|initial|inherit").indexOf(lineh) > -1) lineh = parseInt(getComputedStyle(element).getPropertyValue("font-size"), 10) + 2;
                            return parseInt(lineh, 10);
                        }
                    };
                },
                add: function(elements) {
                    if (!elements && this.conf.className) elements = document.querySelectorAll(this.conf.className);
                    if (elements) if (elements.length) for (var i = 0; i < elements.length; i++) this.addElement(elements[i]); else if (void 0 === elements.length) this.addElement(elements);
                },
                addElement: function(element) {
                    if (this.conf.responsive) {
                        var cached = retrieveCache(this.temp, element);
                        if (!cached) storeCache(this.temp, element); else if (element.innerHTML !== cached.innerHTML) element.innerHTML = cached.innerHTML;
                    }
                    this.createProp(element);
                    if (this.isNotCorrect()) if (element.childNodes.length && element.childNodes.length > 1) this.handleChildren(element); else if (element.childNodes.length && 1 === element.childNodes.length && 3 === element.childNodes[0].nodeType) this.simpleText(element);
                },
                breakWord: function(str, str2, fix) {
                    var words = str.split(" ");
                    words.pop();
                    if (fix) words.pop();
                    if (!str2) {
                        if (words[words.length - 1]) words[words.length - 1] = words[words.length - 1].replace(/(,$)/g, "").replace(/(\.$)/g, "");
                        words.push(this.conf.ellipsis);
                        return words.join(" ");
                    } else if (words[words.length - 1]) {
                        words[words.length - 1] = words[words.length - 1].replace(/(,$)/g, "").replace(/(\.$)/g, "");
                        words.push(this.conf.ellipsis);
                        return [ words.join(" "), str2 ];
                    } else if (!words[words.length - 1] && str2) {
                        var st = " " + str2.trim().replace(/(,$)/g, "").replace(/(\.$)/g, "") + " ";
                        words.push(this.conf.ellipsis);
                        return [ words.join(" "), st ];
                    }
                },
                simpleText: function(element) {
                    var childText = element.childNodes[0].nodeValue;
                    while (this.prop.height > this.prop.lineheight * this.lines.current) {
                        element.childNodes[0].nodeValue = childText.slice(0, -1);
                        childText = element.childNodes[0].nodeValue;
                    }
                    if (this.conf.break_word) {
                        element.childNodes[0].nodeValue = childText.slice(0, -this.conf.ellipsis.length) + this.conf.ellipsis;
                        if (this.isNotCorrect()) element.childNodes[0].nodeValue = " " + element.childNodes[0].nodeValue.slice(0, -(this.conf.ellipsis.length + 1)).trim().slice(0, -this.conf.ellipsis.length) + this.conf.ellipsis;
                    } else {
                        element.childNodes[0].nodeValue = this.breakWord(element.childNodes[0].nodeValue);
                        if (this.isNotCorrect()) element.childNodes[0].nodeValue = this.breakWord(element.childNodes[0].nodeValue, null, true);
                    }
                },
                isNotCorrect: function() {
                    return this.prop.height > this.prop.lineheight * this.lines.current;
                },
                processBreak: function(dOne, dTwo, fix) {
                    var r = this.breakWord(dOne.innerText || dOne.nodeValue, dTwo.innerText || dTwo.nodeValue, fix);
                    if (dOne.innerText) dOne.innerText = r[0]; else dOne.nodeValue = r[0];
                    if (dTwo.innerText) dTwo.innerText = r[1]; else dTwo.nodeValue = r[1];
                },
                handleChildren: function(e) {
                    var domChildren = e.childNodes;
                    var childText;
                    for (var i = domChildren.length - 1; i >= 0; i--) {
                        var displayOrigin;
                        if (8 === domChildren[i].nodeType) continue;
                        if (3 === domChildren[i].nodeType) {
                            displayOrigin = domChildren[i].nodeValue;
                            domChildren[i].nodeValue = "";
                        } else {
                            displayOrigin = getComputedStyle(domChildren[i]).getPropertyValue("display");
                            domChildren[i].style.display = "none";
                        }
                        if (this.prop.height <= this.prop.lineheight * this.lines.current) {
                            if (3 === domChildren[i].nodeType) {
                                domChildren[i].nodeValue = displayOrigin;
                                childText = domChildren[i].nodeValue;
                                while (this.prop.height > this.prop.lineheight * this.lines.current) {
                                    domChildren[i].nodeValue = childText.slice(0, -1);
                                    childText = domChildren[i].nodeValue;
                                }
                                if (this.conf.break_word) {
                                    domChildren[i].nodeValue = childText.slice(0, -this.conf.ellipsis.length) + this.conf.ellipsis;
                                    if (this.isNotCorrect()) {
                                        domChildren[i].nodeValue = " " + domChildren[i].nodeValue.slice(0, -this.conf.ellipsis.length).trim().slice(0, -this.conf.ellipsis.length);
                                        if (domChildren[i].nodeValue.length > 1) domChildren[i].nodeValue = domChildren[i].nodeValue.slice(0, -this.conf.ellipsis.length) + this.conf.ellipsis; else continue;
                                    }
                                } else {
                                    if (!domChildren[i].innerText && !domChildren[i].nodeValue) continue;
                                    this.processBreak(domChildren[i], domChildren[i - 1]);
                                    if (this.isNotCorrect()) {
                                        this.processBreak(domChildren[i], domChildren[i - 1], true);
                                        if (this.isNotCorrect()) {
                                            e.removeChild(domChildren[i]);
                                            continue;
                                        }
                                    }
                                }
                            } else {
                                domChildren[i].style.display = displayOrigin;
                                childText = domChildren[i].innerText;
                                while (this.prop.height > this.prop.lineheight * this.lines.current) {
                                    domChildren[i].innerText = childText.slice(0, -1);
                                    childText = domChildren[i].innerText;
                                }
                                if (this.conf.break_word) {
                                    domChildren[i].innerText = childText.slice(0, -this.conf.ellipsis.length) + this.conf.ellipsis;
                                    if (this.isNotCorrect()) {
                                        domChildren[i].innerText = " " + domChildren[i].innerText.slice(0, -this.conf.ellipsis.length).trim().slice(0, -this.conf.ellipsis.length);
                                        if (domChildren[i].innerText.length > 1) domChildren[i].innerText = domChildren[i].innerText.slice(0, -this.conf.ellipsis.length) + this.conf.ellipsis; else continue;
                                    }
                                } else {
                                    if (!domChildren[i].innerText && !domChildren[i].nodeValue) continue;
                                    this.processBreak(domChildren[i], domChildren[i - 1]);
                                    if (this.isNotCorrect()) {
                                        this.processBreak(domChildren[i], domChildren[i - 1], true);
                                        if (this.isNotCorrect()) {
                                            e.removeChild(domChildren[i]);
                                            continue;
                                        }
                                    }
                                }
                            }
                            break;
                        } else e.removeChild(domChildren[i]);
                    }
                }
            };
            var EllipsisClass = function(opts) {
                return new Ellipsis(opts);
            };
            if ("function" === typeof define && define.amd) define("ellipsis", [], (function() {
                return EllipsisClass;
            }));
            self.Ellipsis = EllipsisClass;
            return EllipsisClass;
        })();
        document.addEventListener("click", documentActionsClick);
        function documentActionsClick(e) {
            const el = e.target;
            if (el.closest(".lang-switch__current")) {
                const switcher = el.closest(".lang-switch");
                switcher.classList.toggle("lang-switch--active");
            }
            if (el.classList.contains("lang-switch__link")) {
                const switcher = el.closest(".lang-switch");
                const switcherCurrent = switcher.querySelector(".lang-switch__current span");
                switcherCurrent.textContent = el.textContent;
                if (switcher.classList.contains("lang-switch--active")) switcher.classList.remove("lang-switch--active");
            }
            if (el.classList.contains("writeus__open")) {
                el.closest(".hero").classList.toggle("hero--active");
                el.closest(".writeus").classList.toggle("writeus--active");
            }
            if (!el.closest(".header")) if (document.documentElement.classList.contains("menu-open")) menuClose();
            if (el.classList.contains("team__more")) ;
        }
        const header = document.querySelector("header.header");
        const script_scrollTop = document.querySelector(".scroll-top");
        document.addEventListener("windowScroll", (function(e) {
            if (script_scrollTop) if (header.classList.contains("_header-scroll")) {
                if (!script_scrollTop.classList.contains("_active")) script_scrollTop.classList.add("_active");
            } else if (!header.classList.contains("_header-scroll")) if (script_scrollTop.classList.contains("_active")) script_scrollTop.classList.remove("_active");
        }));
        document.querySelector(".hero__slider");
        document.getElementById("moving-div");
        var heroBtn = document.querySelector(".slide-hero__btn.btn");
        document.querySelector("#moving-div span");
        document.querySelector(".btn__hover");
        console.log(heroBtn);
        var ellipsis = Ellipsis({
            ellipsis: "…",
            debounce: 200,
            lines: 2,
            responsive: true,
            break_word: false
        });
        var script_elements = document.querySelectorAll(".text-clamp");
        ellipsis.add(script_elements);
        document.querySelector(".item-team__content");
        window["FLS"] = true;
        isWebp();
        menuInit();
        showMore();
        formFieldsInit({
            viewPass: false
        });
        formSubmit();
        pageNavigation();
        headerScroll();
    })();
})();