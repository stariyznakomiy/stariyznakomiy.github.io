(() => {
    var __webpack_modules__ = {
        732: function(module) {
            !function(n, t) {
                true ? module.exports = t() : 0;
            }(0, (function() {
                "use strict";
                function n() {
                    return n = Object.assign || function(n) {
                        for (var t = 1; t < arguments.length; t++) {
                            var e = arguments[t];
                            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
                        }
                        return n;
                    }, n.apply(this, arguments);
                }
                var t = "undefined" != typeof window, e = t && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent), o = t && "IntersectionObserver" in window, i = t && "classList" in document.createElement("p"), a = t && window.devicePixelRatio > 1, r = {
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
                }, u = function(n, t) {
                    var e, o = "LazyLoad::Initialized", i = new n(t);
                    try {
                        e = new CustomEvent(o, {
                            detail: {
                                instance: i
                            }
                        });
                    } catch (n) {
                        (e = document.createEvent("CustomEvent")).initCustomEvent(o, !1, !1, {
                            instance: i
                        });
                    }
                    window.dispatchEvent(e);
                }, l = "src", s = "srcset", f = "sizes", d = "poster", _ = "llOriginalAttrs", g = "data", v = "loading", b = "loaded", p = "applied", m = "error", h = "native", E = "data-", I = "ll-status", y = function(n, t) {
                    return n.getAttribute(E + t);
                }, k = function(n) {
                    return y(n, I);
                }, A = function(n, t) {
                    return function(n, t, e) {
                        var o = "data-ll-status";
                        null !== e ? n.setAttribute(o, e) : n.removeAttribute(o);
                    }(n, 0, t);
                }, w = function(n) {
                    return A(n, null);
                }, L = function(n) {
                    return null === k(n);
                }, O = function(n) {
                    return k(n) === h;
                }, x = [ v, b, p, m ], C = function(n, t, e, o) {
                    n && (void 0 === o ? void 0 === e ? n(t) : n(t, e) : n(t, e, o));
                }, N = function(n, t) {
                    i ? n.classList.add(t) : n.className += (n.className ? " " : "") + t;
                }, M = function(n, t) {
                    i ? n.classList.remove(t) : n.className = n.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
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
                    for (var t, e = [], o = 0; t = n.children[o]; o += 1) "SOURCE" === t.tagName && e.push(t);
                    return e;
                }, D = function(n, t) {
                    var e = n.parentNode;
                    e && "PICTURE" === e.tagName && j(e).forEach(t);
                }, V = function(n, t) {
                    j(n).forEach(t);
                }, F = [ l ], B = [ l, d ], J = [ l, s, f ], P = [ g ], S = function(n) {
                    return !!n[_];
                }, U = function(n) {
                    return n[_];
                }, $ = function(n) {
                    return delete n[_];
                }, q = function(n, t) {
                    if (!S(n)) {
                        var e = {};
                        t.forEach((function(t) {
                            e[t] = n.getAttribute(t);
                        })), n[_] = e;
                    }
                }, H = function(n, t) {
                    if (S(n)) {
                        var e = U(n);
                        t.forEach((function(t) {
                            !function(n, t, e) {
                                e ? n.setAttribute(t, e) : n.removeAttribute(t);
                            }(n, t, e[t]);
                        }));
                    }
                }, K = function(n, t, e) {
                    N(n, t.class_applied), A(n, p), e && (t.unobserve_completed && T(n, t), C(t.callback_applied, n, e));
                }, Q = function(n, t, e) {
                    N(n, t.class_loading), A(n, v), e && (R(e, 1), C(t.callback_loading, n, e));
                }, W = function(n, t, e) {
                    e && n.setAttribute(t, e);
                }, X = function(n, t) {
                    W(n, f, y(n, t.data_sizes)), W(n, s, y(n, t.data_srcset)), W(n, l, y(n, t.data_src));
                }, Y = {
                    IMG: function(n, t) {
                        D(n, (function(n) {
                            q(n, J), X(n, t);
                        })), q(n, J), X(n, t);
                    },
                    IFRAME: function(n, t) {
                        q(n, F), W(n, l, y(n, t.data_src));
                    },
                    VIDEO: function(n, t) {
                        V(n, (function(n) {
                            q(n, F), W(n, l, y(n, t.data_src));
                        })), q(n, B), W(n, d, y(n, t.data_poster)), W(n, l, y(n, t.data_src)), n.load();
                    },
                    OBJECT: function(n, t) {
                        q(n, P), W(n, g, y(n, t.data_src));
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
                            var o = t[e];
                            en(n, e, o);
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
                    var o = z(n) || n;
                    on(o) || function(n, t, e) {
                        on(n) || (n.llEvLisnrs = {});
                        var o = "VIDEO" === n.tagName ? "loadeddata" : "load";
                        tn(n, o, t), tn(n, "error", e);
                    }(o, (function(i) {
                        !function(n, t, e, o) {
                            var i = O(t);
                            rn(t, e, o), N(t, e.class_loaded), A(t, b), C(e.callback_loaded, t, o), i || nn(e, o);
                        }(0, n, t, e), an(o);
                    }), (function(i) {
                        !function(n, t, e, o) {
                            var i = O(t);
                            rn(t, e, o), N(t, e.class_error), A(t, m), C(e.callback_error, t, o), e.restore_on_error && H(t, J), 
                            i || nn(e, o);
                        }(0, n, t, e), an(o);
                    }));
                }, un = function(n, t, e) {
                    !function(n) {
                        return Z.indexOf(n.tagName) > -1;
                    }(n) ? function(n, t, e) {
                        !function(n) {
                            n.llTempImage = document.createElement("IMG");
                        }(n), cn(n, t, e), function(n) {
                            S(n) || (n[_] = {
                                backgroundImage: n.style.backgroundImage
                            });
                        }(n), function(n, t, e) {
                            var o = y(n, t.data_bg), i = y(n, t.data_bg_hidpi), r = a && i ? i : o;
                            r && (n.style.backgroundImage = 'url("'.concat(r, '")'), z(n).setAttribute(l, r), 
                            Q(n, t, e));
                        }(n, t, e), function(n, t, e) {
                            var o = y(n, t.data_bg_multi), i = y(n, t.data_bg_multi_hidpi), r = a && i ? i : o;
                            r && (n.style.backgroundImage = r, K(n, t, e));
                        }(n, t, e), function(n, t, e) {
                            var o = y(n, t.data_bg_set);
                            if (o) {
                                var i = o.split("|"), a = i.map((function(n) {
                                    return "image-set(".concat(n, ")");
                                }));
                                n.style.backgroundImage = a.join(), "" === n.style.backgroundImage && (a = i.map((function(n) {
                                    return "-webkit-image-set(".concat(n, ")");
                                })), n.style.backgroundImage = a.join()), K(n, t, e);
                            }
                        }(n, t, e);
                    }(n, t, e) : function(n, t, e) {
                        cn(n, t, e), function(n, t, e) {
                            var o = Y[n.tagName];
                            o && (o(n, t), Q(n, t, e));
                        }(n, t, e);
                    }(n, t, e);
                }, ln = function(n) {
                    n.removeAttribute(l), n.removeAttribute(s), n.removeAttribute(f);
                }, sn = function(n) {
                    D(n, (function(n) {
                        H(n, J);
                    })), H(n, J);
                }, fn = {
                    IMG: sn,
                    IFRAME: function(n) {
                        H(n, F);
                    },
                    VIDEO: function(n) {
                        V(n, (function(n) {
                            H(n, F);
                        })), H(n, B), n.load();
                    },
                    OBJECT: function(n) {
                        H(n, P);
                    }
                }, dn = function(n, t) {
                    (function(n) {
                        var t = fn[n.tagName];
                        t ? t(n) : function(n) {
                            if (S(n)) {
                                var t = U(n);
                                n.style.backgroundImage = t.backgroundImage;
                            }
                        }(n);
                    })(n), function(n, t) {
                        L(n) || O(n) || (M(n, t.class_entered), M(n, t.class_exited), M(n, t.class_applied), 
                        M(n, t.class_loading), M(n, t.class_loaded), M(n, t.class_error));
                    }(n, t), w(n), $(n);
                }, _n = [ "IMG", "IFRAME", "VIDEO" ], gn = function(n) {
                    return n.use_native && "loading" in HTMLImageElement.prototype;
                }, vn = function(n, t, e) {
                    n.forEach((function(n) {
                        return function(n) {
                            return n.isIntersecting || n.intersectionRatio > 0;
                        }(n) ? function(n, t, e, o) {
                            var i = function(n) {
                                return x.indexOf(k(n)) >= 0;
                            }(n);
                            A(n, "entered"), N(n, e.class_entered), M(n, e.class_exited), function(n, t, e) {
                                t.unobserve_entered && T(n, e);
                            }(n, e, o), C(e.callback_enter, n, t, o), i || un(n, e, o);
                        }(n.target, n, t, e) : function(n, t, e, o) {
                            L(n) || (N(n, e.class_exited), function(n, t, e, o) {
                                e.cancel_on_exit && function(n) {
                                    return k(n) === v;
                                }(n) && "IMG" === n.tagName && (an(n), function(n) {
                                    D(n, (function(n) {
                                        ln(n);
                                    })), ln(n);
                                }(n), sn(n), M(n, e.class_loading), R(o, -1), w(n), C(e.callback_cancel, n, t, o));
                            }(n, t, e, o), C(e.callback_exit, n, t, o));
                        }(n.target, n, t, e);
                    }));
                }, bn = function(n) {
                    return Array.prototype.slice.call(n);
                }, pn = function(n) {
                    return n.container.querySelectorAll(n.elements_selector);
                }, mn = function(n) {
                    return function(n) {
                        return k(n) === m;
                    }(n);
                }, hn = function(n, t) {
                    return function(n) {
                        return bn(n).filter(L);
                    }(n || pn(t));
                }, En = function(n, e) {
                    var i = c(n);
                    this._settings = i, this.loadingCount = 0, function(n, t) {
                        o && !gn(n) && (t._observer = new IntersectionObserver((function(e) {
                            vn(e, n, t);
                        }), function(n) {
                            return {
                                root: n.container === document ? null : n.container,
                                rootMargin: n.thresholds || n.threshold + "px"
                            };
                        }(n)));
                    }(i, this), function(n, e) {
                        t && window.addEventListener("online", (function() {
                            !function(n, t) {
                                var e;
                                (e = pn(n), bn(e).filter(mn)).forEach((function(t) {
                                    M(t, n.class_error), w(t);
                                })), t.update();
                            }(n, e);
                        }));
                    }(i, this), this.update(e);
                };
                return En.prototype = {
                    update: function(n) {
                        var t, i, a = this._settings, r = hn(n, a);
                        G(this, r.length), !e && o ? gn(a) ? function(n, t, e) {
                            n.forEach((function(n) {
                                -1 !== _n.indexOf(n.tagName) && function(n, t, e) {
                                    n.setAttribute("loading", "lazy"), cn(n, t, e), function(n, t) {
                                        var e = Y[n.tagName];
                                        e && e(n, t);
                                    }(n, t), A(n, h);
                                }(n, t, e);
                            })), G(e, 0);
                        }(r, a, this) : (i = r, function(n) {
                            n.disconnect();
                        }(t = this._observer), function(n, t) {
                            t.forEach((function(t) {
                                n.observe(t);
                            }));
                        }(t, i)) : this.loadAll(r);
                    },
                    destroy: function() {
                        this._observer && this._observer.disconnect(), pn(this._settings).forEach((function(n) {
                            $(n);
                        })), delete this._observer, delete this._settings, delete this.loadingCount, delete this.toLoadCount;
                    },
                    loadAll: function(n) {
                        var t = this, e = this._settings;
                        hn(n, e).forEach((function(n) {
                            T(n, t), un(n, e, t);
                        }));
                    },
                    restoreAll: function() {
                        var n = this._settings;
                        pn(n).forEach((function(t) {
                            dn(t, n);
                        }));
                    }
                }, En.load = function(n, t) {
                    var e = c(t);
                    un(n, e);
                }, En.resetStatus = function(n) {
                    w(n);
                }, t && function(n, t) {
                    if (t) if (t.length) for (var e, o = 0; e = t[o]; o += 1) u(n, e); else u(n, t);
                }(En, window.lazyLoadOptions), En;
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
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
        let isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
            }
        };
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
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
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
        function spollers() {
            const spollersArray = document.querySelectorAll("[data-spollers]");
            if (spollersArray.length > 0) {
                const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                    return !item.dataset.spollers.split(",")[0];
                }));
                if (spollersRegular.length) initSpollers(spollersRegular);
                let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                function initSpollers(spollersArray, matchMedia = false) {
                    spollersArray.forEach((spollersBlock => {
                        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                        if (matchMedia.matches || !matchMedia) {
                            spollersBlock.classList.add("_spoller-init");
                            initSpollerBody(spollersBlock);
                            spollersBlock.addEventListener("click", setSpollerAction);
                        } else {
                            spollersBlock.classList.remove("_spoller-init");
                            initSpollerBody(spollersBlock, false);
                            spollersBlock.removeEventListener("click", setSpollerAction);
                        }
                    }));
                }
                function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                    let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                    if (spollerTitles.length) {
                        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                        spollerTitles.forEach((spollerTitle => {
                            if (hideSpollerBody) {
                                spollerTitle.removeAttribute("tabindex");
                                if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                            } else {
                                spollerTitle.setAttribute("tabindex", "-1");
                                spollerTitle.nextElementSibling.hidden = false;
                            }
                        }));
                    }
                }
                function setSpollerAction(e) {
                    const el = e.target;
                    if (el.closest("[data-spoller]")) {
                        const spollerTitle = el.closest("[data-spoller]");
                        const spollersBlock = spollerTitle.closest("[data-spollers]");
                        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        if (!spollersBlock.querySelectorAll("._slide").length) {
                            if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                            spollerTitle.classList.toggle("_spoller-active");
                            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                        }
                        e.preventDefault();
                    }
                }
                function hideSpollersBody(spollersBlock) {
                    const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                        spollerActiveTitle.classList.remove("_spoller-active");
                        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                    }
                }
                const spollersClose = document.querySelectorAll("[data-spoller-close]");
                if (spollersClose.length) document.addEventListener("click", (function(e) {
                    const el = e.target;
                    if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                        const spollersBlock = spollerClose.closest("[data-spollers]");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        spollerClose.classList.remove("_spoller-active");
                        _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                    }));
                }));
            }
        }
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
        class Popup {
            constructor(options) {
                let config = {
                    logging: true,
                    init: true,
                    attributeOpenButton: "data-popup",
                    attributeCloseButton: "data-close",
                    fixElementSelector: "[data-lp]",
                    youtubeAttribute: "data-popup-youtube",
                    youtubePlaceAttribute: "data-popup-youtube-place",
                    setAutoplayYoutube: true,
                    classes: {
                        popup: "popup",
                        popupContent: "popup__content",
                        popupActive: "popup_show",
                        bodyActive: "popup-show"
                    },
                    focusCatch: true,
                    closeEsc: true,
                    bodyLock: true,
                    hashSettings: {
                        location: true,
                        goHash: true
                    },
                    on: {
                        beforeOpen: function() {},
                        afterOpen: function() {},
                        beforeClose: function() {},
                        afterClose: function() {}
                    }
                };
                this.youTubeCode;
                this.isOpen = false;
                this.targetOpen = {
                    selector: false,
                    element: false
                };
                this.previousOpen = {
                    selector: false,
                    element: false
                };
                this.lastClosed = {
                    selector: false,
                    element: false
                };
                this._dataValue = false;
                this.hash = false;
                this._reopen = false;
                this._selectorOpen = false;
                this.lastFocusEl = false;
                this._focusEl = [ "a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])' ];
                this.options = {
                    ...config,
                    ...options,
                    classes: {
                        ...config.classes,
                        ...options?.classes
                    },
                    hashSettings: {
                        ...config.hashSettings,
                        ...options?.hashSettings
                    },
                    on: {
                        ...config.on,
                        ...options?.on
                    }
                };
                this.bodyLock = false;
                this.options.init ? this.initPopups() : null;
            }
            initPopups() {
                this.popupLogging(`Проснулся`);
                this.eventsPopup();
            }
            eventsPopup() {
                document.addEventListener("click", function(e) {
                    const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
                    if (buttonOpen) {
                        e.preventDefault();
                        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
                        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
                        if ("error" !== this._dataValue) {
                            if (!this.isOpen) this.lastFocusEl = buttonOpen;
                            this.targetOpen.selector = `${this._dataValue}`;
                            this._selectorOpen = true;
                            this.open();
                            return;
                        } else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);
                        return;
                    }
                    const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
                    if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
                        e.preventDefault();
                        this.close();
                        return;
                    }
                }.bind(this));
                document.addEventListener("keydown", function(e) {
                    if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
                        e.preventDefault();
                        this.close();
                        return;
                    }
                    if (this.options.focusCatch && 9 == e.which && this.isOpen) {
                        this._focusCatch(e);
                        return;
                    }
                }.bind(this));
                if (this.options.hashSettings.goHash) {
                    window.addEventListener("hashchange", function() {
                        if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
                    }.bind(this));
                    window.addEventListener("load", function() {
                        if (window.location.hash) this._openToHash();
                    }.bind(this));
                }
            }
            open(selectorValue) {
                if (bodyLockStatus) {
                    this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
                    if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
                        this.targetOpen.selector = selectorValue;
                        this._selectorOpen = true;
                    }
                    if (this.isOpen) {
                        this._reopen = true;
                        this.close();
                    }
                    if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                    if (!this._reopen) this.previousActiveElement = document.activeElement;
                    this.targetOpen.element = document.querySelector(this.targetOpen.selector);
                    if (this.targetOpen.element) {
                        if (this.youTubeCode) {
                            const codeVideo = this.youTubeCode;
                            const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                            const iframe = document.createElement("iframe");
                            iframe.setAttribute("allowfullscreen", "");
                            const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
                            iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
                            iframe.setAttribute("src", urlVideo);
                            if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                                this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
                            }
                            this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
                        }
                        if (this.options.hashSettings.location) {
                            this._getHash();
                            this._setHash();
                        }
                        this.options.on.beforeOpen(this);
                        document.dispatchEvent(new CustomEvent("beforePopupOpen", {
                            detail: {
                                popup: this
                            }
                        }));
                        this.targetOpen.element.classList.add(this.options.classes.popupActive);
                        document.documentElement.classList.add(this.options.classes.bodyActive);
                        if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
                        this.targetOpen.element.setAttribute("aria-hidden", "false");
                        this.previousOpen.selector = this.targetOpen.selector;
                        this.previousOpen.element = this.targetOpen.element;
                        this._selectorOpen = false;
                        this.isOpen = true;
                        setTimeout((() => {
                            this._focusTrap();
                        }), 50);
                        this.options.on.afterOpen(this);
                        document.dispatchEvent(new CustomEvent("afterPopupOpen", {
                            detail: {
                                popup: this
                            }
                        }));
                        this.popupLogging(`Открыл попап`);
                    } else this.popupLogging(`Ой ой, такого попапа нет.Проверьте корректность ввода. `);
                }
            }
            close(selectorValue) {
                if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
                if (!this.isOpen || !bodyLockStatus) return;
                this.options.on.beforeClose(this);
                document.dispatchEvent(new CustomEvent("beforePopupClose", {
                    detail: {
                        popup: this
                    }
                }));
                if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
                this.previousOpen.element.classList.remove(this.options.classes.popupActive);
                this.previousOpen.element.setAttribute("aria-hidden", "true");
                if (!this._reopen) {
                    document.documentElement.classList.remove(this.options.classes.bodyActive);
                    !this.bodyLock ? bodyUnlock() : null;
                    this.isOpen = false;
                }
                this._removeHash();
                if (this._selectorOpen) {
                    this.lastClosed.selector = this.previousOpen.selector;
                    this.lastClosed.element = this.previousOpen.element;
                }
                this.options.on.afterClose(this);
                document.dispatchEvent(new CustomEvent("afterPopupClose", {
                    detail: {
                        popup: this
                    }
                }));
                setTimeout((() => {
                    this._focusTrap();
                }), 50);
                this.popupLogging(`Закрыл попап`);
            }
            _getHash() {
                if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
            }
            _openToHash() {
                let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
                const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
                if (buttons && classInHash) this.open(classInHash);
            }
            _setHash() {
                history.pushState("", "", this.hash);
            }
            _removeHash() {
                history.pushState("", "", window.location.href.split("#")[0]);
            }
            _focusCatch(e) {
                const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
                const focusArray = Array.prototype.slice.call(focusable);
                const focusedIndex = focusArray.indexOf(document.activeElement);
                if (e.shiftKey && 0 === focusedIndex) {
                    focusArray[focusArray.length - 1].focus();
                    e.preventDefault();
                }
                if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                    focusArray[0].focus();
                    e.preventDefault();
                }
            }
            _focusTrap() {
                const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
                if (!this.isOpen && this.lastFocusEl) this.lastFocusEl.focus(); else focusable[0].focus();
            }
            popupLogging(message) {
                this.options.logging ? FLS(`[Попапос]: ${message}`) : null;
            }
        }
        flsModules.popup = new Popup({});
        /*!
 * simpleParallax - simpleParallax is a simple JavaScript library that gives your website parallax animations on any images or videos, 
 * @date: 20-08-2020 14:0:14, 
 * @version: 5.6.2,
 * @link: https://simpleparallax.com/
 */
        (function webpackUniversalModuleDefinition(root, factory) {
            if ("object" === typeof exports && "object" === typeof module) module.exports = factory(); else if ("function" === typeof define && define.amd) define("simpleParallax", [], factory); else if ("object" === typeof exports) exports["simpleParallax"] = factory(); else root["simpleParallax"] = factory();
        })(window, (function() {
            return function(modules) {
                var installedModules = {};
                function __nested_webpack_require_804__(moduleId) {
                    if (installedModules[moduleId]) return installedModules[moduleId].exports;
                    var module = installedModules[moduleId] = {
                        i: moduleId,
                        l: false,
                        exports: {}
                    };
                    modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_804__);
                    module.l = true;
                    return module.exports;
                }
                __nested_webpack_require_804__.m = modules;
                __nested_webpack_require_804__.c = installedModules;
                __nested_webpack_require_804__.d = function(exports, name, getter) {
                    if (!__nested_webpack_require_804__.o(exports, name)) Object.defineProperty(exports, name, {
                        enumerable: true,
                        get: getter
                    });
                };
                __nested_webpack_require_804__.r = function(exports) {
                    if ("undefined" !== typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
                        value: "Module"
                    });
                    Object.defineProperty(exports, "__esModule", {
                        value: true
                    });
                };
                __nested_webpack_require_804__.t = function(value, mode) {
                    if (1 & mode) value = __nested_webpack_require_804__(value);
                    if (8 & mode) return value;
                    if (4 & mode && "object" === typeof value && value && value.__esModule) return value;
                    var ns = Object.create(null);
                    __nested_webpack_require_804__.r(ns);
                    Object.defineProperty(ns, "default", {
                        enumerable: true,
                        value
                    });
                    if (2 & mode && "string" != typeof value) for (var key in value) __nested_webpack_require_804__.d(ns, key, function(key) {
                        return value[key];
                    }.bind(null, key));
                    return ns;
                };
                __nested_webpack_require_804__.n = function(module) {
                    var getter = module && module.__esModule ? function getDefault() {
                        return module["default"];
                    } : function getModuleExports() {
                        return module;
                    };
                    __nested_webpack_require_804__.d(getter, "a", getter);
                    return getter;
                };
                __nested_webpack_require_804__.o = function(object, property) {
                    return Object.prototype.hasOwnProperty.call(object, property);
                };
                __nested_webpack_require_804__.p = "";
                return __nested_webpack_require_804__(__nested_webpack_require_804__.s = 0);
            }([ function(module, __webpack_exports__, __nested_webpack_require_4280__) {
                "use strict";
                __nested_webpack_require_4280__.r(__webpack_exports__);
                __nested_webpack_require_4280__.d(__webpack_exports__, "default", (function() {
                    return simpleParallax_SimpleParallax;
                }));
                var isSupportedBrowser = function isSupportedBrowser() {
                    return Element.prototype.closest && "IntersectionObserver" in window;
                };
                var helpers_isSupportedBrowser = isSupportedBrowser;
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }
                function _defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                function _createClass(Constructor, protoProps, staticProps) {
                    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) _defineProperties(Constructor, staticProps);
                    return Constructor;
                }
                var Viewport = function() {
                    function Viewport() {
                        _classCallCheck(this, Viewport);
                        this.positions = {
                            top: 0,
                            bottom: 0,
                            height: 0
                        };
                    }
                    _createClass(Viewport, [ {
                        key: "setViewportTop",
                        value: function setViewportTop(container) {
                            this.positions.top = container ? container.scrollTop : window.pageYOffset;
                            return this.positions;
                        }
                    }, {
                        key: "setViewportBottom",
                        value: function setViewportBottom() {
                            this.positions.bottom = this.positions.top + this.positions.height;
                            return this.positions;
                        }
                    }, {
                        key: "setViewportAll",
                        value: function setViewportAll(container) {
                            this.positions.top = container ? container.scrollTop : window.pageYOffset;
                            this.positions.height = container ? container.clientHeight : document.documentElement.clientHeight;
                            this.positions.bottom = this.positions.top + this.positions.height;
                            return this.positions;
                        }
                    } ]);
                    return Viewport;
                }();
                var viewport = new Viewport;
                var convertToArray = function convertToArray(elements) {
                    if (NodeList.prototype.isPrototypeOf(elements) || HTMLCollection.prototype.isPrototypeOf(elements)) return Array.from(elements);
                    if ("string" === typeof elements || elements instanceof String) return document.querySelectorAll(elements);
                    return [ elements ];
                };
                var helpers_convertToArray = convertToArray;
                var cssTransform = function cssTransform() {
                    var prefixes = "transform webkitTransform mozTransform oTransform msTransform".split(" ");
                    var transform;
                    var i = 0;
                    while (void 0 === transform) {
                        transform = void 0 !== document.createElement("div").style[prefixes[i]] ? prefixes[i] : void 0;
                        i += 1;
                    }
                    return transform;
                };
                var helpers_cssTransform = cssTransform();
                var isImageLoaded = function isImageLoaded(media) {
                    if ("img" !== media.tagName.toLowerCase() && "picture" !== media.tagName.toLowerCase()) return true;
                    if (!media) return false;
                    if (!media.complete) return false;
                    if ("undefined" !== typeof media.naturalWidth && 0 === media.naturalWidth) return false;
                    return true;
                };
                var helpers_isImageLoaded = isImageLoaded;
                function _toConsumableArray(arr) {
                    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
                }
                function _nonIterableSpread() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }
                function _unsupportedIterableToArray(o, minLen) {
                    if (!o) return;
                    if ("string" === typeof o) return _arrayLikeToArray(o, minLen);
                    var n = Object.prototype.toString.call(o).slice(8, -1);
                    if ("Object" === n && o.constructor) n = o.constructor.name;
                    if ("Map" === n || "Set" === n) return Array.from(o);
                    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
                }
                function _iterableToArray(iter) {
                    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) return Array.from(iter);
                }
                function _arrayWithoutHoles(arr) {
                    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
                }
                function _arrayLikeToArray(arr, len) {
                    if (null == len || len > arr.length) len = arr.length;
                    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
                    return arr2;
                }
                function parallax_classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }
                function parallax_defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                function parallax_createClass(Constructor, protoProps, staticProps) {
                    if (protoProps) parallax_defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) parallax_defineProperties(Constructor, staticProps);
                    return Constructor;
                }
                var parallax_ParallaxInstance = function() {
                    function ParallaxInstance(element, options) {
                        var _this = this;
                        parallax_classCallCheck(this, ParallaxInstance);
                        this.element = element;
                        this.elementContainer = element;
                        this.settings = options;
                        this.isVisible = true;
                        this.isInit = false;
                        this.oldTranslateValue = -1;
                        this.init = this.init.bind(this);
                        this.customWrapper = this.settings.customWrapper && this.element.closest(this.settings.customWrapper) ? this.element.closest(this.settings.customWrapper) : null;
                        if (helpers_isImageLoaded(element)) this.init(); else this.element.addEventListener("load", (function() {
                            setTimeout((function() {
                                _this.init(true);
                            }), 50);
                        }));
                    }
                    parallax_createClass(ParallaxInstance, [ {
                        key: "init",
                        value: function init(asyncInit) {
                            var _this2 = this;
                            if (this.isInit) return;
                            if (asyncInit) this.rangeMax = null;
                            if (this.element.closest(".simpleParallax")) return;
                            if (false === this.settings.overflow) this.wrapElement(this.element);
                            this.setTransformCSS();
                            this.getElementOffset();
                            this.intersectionObserver();
                            this.getTranslateValue();
                            this.animate();
                            if (this.settings.delay > 0) setTimeout((function() {
                                _this2.setTransitionCSS();
                                _this2.elementContainer.classList.add("simple-parallax-initialized");
                            }), 10); else this.elementContainer.classList.add("simple-parallax-initialized");
                            this.isInit = true;
                        }
                    }, {
                        key: "wrapElement",
                        value: function wrapElement() {
                            var elementToWrap = this.element.closest("picture") || this.element;
                            var wrapper = this.customWrapper || document.createElement("div");
                            wrapper.classList.add("simpleParallax");
                            wrapper.style.overflow = "hidden";
                            if (!this.customWrapper) {
                                elementToWrap.parentNode.insertBefore(wrapper, elementToWrap);
                                wrapper.appendChild(elementToWrap);
                            }
                            this.elementContainer = wrapper;
                        }
                    }, {
                        key: "unWrapElement",
                        value: function unWrapElement() {
                            var wrapper = this.elementContainer;
                            if (this.customWrapper) {
                                wrapper.classList.remove("simpleParallax");
                                wrapper.style.overflow = "";
                            } else wrapper.replaceWith.apply(wrapper, _toConsumableArray(wrapper.childNodes));
                        }
                    }, {
                        key: "setTransformCSS",
                        value: function setTransformCSS() {
                            if (false === this.settings.overflow) this.element.style[helpers_cssTransform] = "scale(".concat(this.settings.scale, ")");
                            this.element.style.willChange = "transform";
                        }
                    }, {
                        key: "setTransitionCSS",
                        value: function setTransitionCSS() {
                            this.element.style.transition = "transform ".concat(this.settings.delay, "s ").concat(this.settings.transition);
                        }
                    }, {
                        key: "unSetStyle",
                        value: function unSetStyle() {
                            this.element.style.willChange = "";
                            this.element.style[helpers_cssTransform] = "";
                            this.element.style.transition = "";
                        }
                    }, {
                        key: "getElementOffset",
                        value: function getElementOffset() {
                            var positions = this.elementContainer.getBoundingClientRect();
                            this.elementHeight = positions.height;
                            this.elementTop = positions.top + viewport.positions.top;
                            if (this.settings.customContainer) {
                                var parentPositions = this.settings.customContainer.getBoundingClientRect();
                                this.elementTop = positions.top - parentPositions.top + viewport.positions.top;
                            }
                            this.elementBottom = this.elementHeight + this.elementTop;
                        }
                    }, {
                        key: "buildThresholdList",
                        value: function buildThresholdList() {
                            var thresholds = [];
                            for (var i = 1; i <= this.elementHeight; i++) {
                                var ratio = i / this.elementHeight;
                                thresholds.push(ratio);
                            }
                            return thresholds;
                        }
                    }, {
                        key: "intersectionObserver",
                        value: function intersectionObserver() {
                            var options = {
                                root: null,
                                threshold: this.buildThresholdList()
                            };
                            this.observer = new IntersectionObserver(this.intersectionObserverCallback.bind(this), options);
                            this.observer.observe(this.element);
                        }
                    }, {
                        key: "intersectionObserverCallback",
                        value: function intersectionObserverCallback(entries) {
                            var _this3 = this;
                            entries.forEach((function(entry) {
                                if (entry.isIntersecting) _this3.isVisible = true; else _this3.isVisible = false;
                            }));
                        }
                    }, {
                        key: "checkIfVisible",
                        value: function checkIfVisible() {
                            return this.elementBottom > viewport.positions.top && this.elementTop < viewport.positions.bottom;
                        }
                    }, {
                        key: "getRangeMax",
                        value: function getRangeMax() {
                            var elementImageHeight = this.element.clientHeight;
                            this.rangeMax = elementImageHeight * this.settings.scale - elementImageHeight;
                        }
                    }, {
                        key: "getTranslateValue",
                        value: function getTranslateValue() {
                            var percentage = ((viewport.positions.bottom - this.elementTop) / ((viewport.positions.height + this.elementHeight) / 100)).toFixed(1);
                            percentage = Math.min(100, Math.max(0, percentage));
                            if (0 !== this.settings.maxTransition && percentage > this.settings.maxTransition) percentage = this.settings.maxTransition;
                            if (this.oldPercentage === percentage) return false;
                            if (!this.rangeMax) this.getRangeMax();
                            this.translateValue = (percentage / 100 * this.rangeMax - this.rangeMax / 2).toFixed(0);
                            if (this.oldTranslateValue === this.translateValue) return false;
                            this.oldPercentage = percentage;
                            this.oldTranslateValue = this.translateValue;
                            return true;
                        }
                    }, {
                        key: "animate",
                        value: function animate() {
                            var translateValueY = 0;
                            var translateValueX = 0;
                            var inlineCss;
                            if (this.settings.orientation.includes("left") || this.settings.orientation.includes("right")) translateValueX = "".concat(this.settings.orientation.includes("left") ? -1 * this.translateValue : this.translateValue, "px");
                            if (this.settings.orientation.includes("up") || this.settings.orientation.includes("down")) translateValueY = "".concat(this.settings.orientation.includes("up") ? -1 * this.translateValue : this.translateValue, "px");
                            if (false === this.settings.overflow) inlineCss = "translate3d(".concat(translateValueX, ", ").concat(translateValueY, ", 0) scale(").concat(this.settings.scale, ")"); else inlineCss = "translate3d(".concat(translateValueX, ", ").concat(translateValueY, ", 0)");
                            this.element.style[helpers_cssTransform] = inlineCss;
                        }
                    } ]);
                    return ParallaxInstance;
                }();
                var parallax = parallax_ParallaxInstance;
                function simpleParallax_toConsumableArray(arr) {
                    return simpleParallax_arrayWithoutHoles(arr) || simpleParallax_iterableToArray(arr) || simpleParallax_unsupportedIterableToArray(arr) || simpleParallax_nonIterableSpread();
                }
                function simpleParallax_nonIterableSpread() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }
                function simpleParallax_iterableToArray(iter) {
                    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) return Array.from(iter);
                }
                function simpleParallax_arrayWithoutHoles(arr) {
                    if (Array.isArray(arr)) return simpleParallax_arrayLikeToArray(arr);
                }
                function _slicedToArray(arr, i) {
                    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || simpleParallax_unsupportedIterableToArray(arr, i) || _nonIterableRest();
                }
                function _nonIterableRest() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }
                function simpleParallax_unsupportedIterableToArray(o, minLen) {
                    if (!o) return;
                    if ("string" === typeof o) return simpleParallax_arrayLikeToArray(o, minLen);
                    var n = Object.prototype.toString.call(o).slice(8, -1);
                    if ("Object" === n && o.constructor) n = o.constructor.name;
                    if ("Map" === n || "Set" === n) return Array.from(o);
                    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return simpleParallax_arrayLikeToArray(o, minLen);
                }
                function simpleParallax_arrayLikeToArray(arr, len) {
                    if (null == len || len > arr.length) len = arr.length;
                    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
                    return arr2;
                }
                function _iterableToArrayLimit(arr, i) {
                    if ("undefined" === typeof Symbol || !(Symbol.iterator in Object(arr))) return;
                    var _arr = [];
                    var _n = true;
                    var _d = false;
                    var _e = void 0;
                    try {
                        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
                            _arr.push(_s.value);
                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = true;
                        _e = err;
                    } finally {
                        try {
                            if (!_n && null != _i["return"]) _i["return"]();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                function _arrayWithHoles(arr) {
                    if (Array.isArray(arr)) return arr;
                }
                function simpleParallax_classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }
                function simpleParallax_defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                function simpleParallax_createClass(Constructor, protoProps, staticProps) {
                    if (protoProps) simpleParallax_defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) simpleParallax_defineProperties(Constructor, staticProps);
                    return Constructor;
                }
                var isInit = false;
                var instances = [];
                var frameID;
                var resizeID;
                var simpleParallax_SimpleParallax = function() {
                    function SimpleParallax(elements, options) {
                        simpleParallax_classCallCheck(this, SimpleParallax);
                        if (!elements) return;
                        if (!helpers_isSupportedBrowser()) return;
                        this.elements = helpers_convertToArray(elements);
                        this.defaults = {
                            delay: 0,
                            orientation: "up",
                            scale: 1.3,
                            overflow: false,
                            transition: "cubic-bezier(0,0,0,1)",
                            customContainer: "",
                            customWrapper: "",
                            maxTransition: 0
                        };
                        this.settings = Object.assign(this.defaults, options);
                        if (this.settings.customContainer) {
                            var _convertToArray = helpers_convertToArray(this.settings.customContainer);
                            var _convertToArray2 = _slicedToArray(_convertToArray, 1);
                            this.customContainer = _convertToArray2[0];
                        }
                        this.lastPosition = -1;
                        this.resizeIsDone = this.resizeIsDone.bind(this);
                        this.refresh = this.refresh.bind(this);
                        this.proceedRequestAnimationFrame = this.proceedRequestAnimationFrame.bind(this);
                        this.init();
                    }
                    simpleParallax_createClass(SimpleParallax, [ {
                        key: "init",
                        value: function init() {
                            var _this = this;
                            viewport.setViewportAll(this.customContainer);
                            instances = [].concat(simpleParallax_toConsumableArray(this.elements.map((function(element) {
                                return new parallax(element, _this.settings);
                            }))), simpleParallax_toConsumableArray(instances));
                            if (!isInit) {
                                this.proceedRequestAnimationFrame();
                                window.addEventListener("resize", this.resizeIsDone);
                                isInit = true;
                            }
                        }
                    }, {
                        key: "resizeIsDone",
                        value: function resizeIsDone() {
                            clearTimeout(resizeID);
                            resizeID = setTimeout(this.refresh, 200);
                        }
                    }, {
                        key: "proceedRequestAnimationFrame",
                        value: function proceedRequestAnimationFrame() {
                            var _this2 = this;
                            viewport.setViewportTop(this.customContainer);
                            if (this.lastPosition === viewport.positions.top) {
                                frameID = window.requestAnimationFrame(this.proceedRequestAnimationFrame);
                                return;
                            }
                            viewport.setViewportBottom();
                            instances.forEach((function(instance) {
                                _this2.proceedElement(instance);
                            }));
                            frameID = window.requestAnimationFrame(this.proceedRequestAnimationFrame);
                            this.lastPosition = viewport.positions.top;
                        }
                    }, {
                        key: "proceedElement",
                        value: function proceedElement(instance) {
                            var isVisible = false;
                            if (this.customContainer) isVisible = instance.checkIfVisible(); else isVisible = instance.isVisible;
                            if (!isVisible) return;
                            if (!instance.getTranslateValue()) return;
                            instance.animate();
                        }
                    }, {
                        key: "refresh",
                        value: function refresh() {
                            viewport.setViewportAll(this.customContainer);
                            instances.forEach((function(instance) {
                                instance.getElementOffset();
                                instance.getRangeMax();
                            }));
                            this.lastPosition = -1;
                        }
                    }, {
                        key: "destroy",
                        value: function destroy() {
                            var _this3 = this;
                            var instancesToDestroy = [];
                            instances = instances.filter((function(instance) {
                                if (_this3.elements.includes(instance.element)) {
                                    instancesToDestroy.push(instance);
                                    return false;
                                }
                                return instance;
                            }));
                            instancesToDestroy.forEach((function(instance) {
                                instance.unSetStyle();
                                if (false === _this3.settings.overflow) instance.unWrapElement();
                            }));
                            if (!instances.length) {
                                window.cancelAnimationFrame(frameID);
                                window.removeEventListener("resize", this.refresh);
                                isInit = false;
                            }
                        }
                    } ]);
                    return SimpleParallax;
                }();
            } ])["default"];
        }));
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
                    console.log(formError);
                    if (formError && form.hasAttribute("data-goto-error")) gotoBlock(formError, true, 1e3);
                }
            }
            function formSent(form, responseResult = ``) {
                document.dispatchEvent(new CustomEvent("formSent", {
                    detail: {
                        form
                    }
                }));
                form.classList.add("_success");
                setTimeout((() => {
                    form.classList.remove("_success");
                }), 2e3);
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
        class SelectConstructor {
            constructor(props, data = null) {
                let defaultConfig = {
                    init: true,
                    logging: true
                };
                this.config = Object.assign(defaultConfig, props);
                this.selectClasses = {
                    classSelect: "select",
                    classSelectBody: "select__body",
                    classSelectTitle: "select__title",
                    classSelectValue: "select__value",
                    classSelectLabel: "select__label",
                    classSelectInput: "select__input",
                    classSelectText: "select__text",
                    classSelectLink: "select__link",
                    classSelectOptions: "select__options",
                    classSelectOptionsScroll: "select__scroll",
                    classSelectOption: "select__option",
                    classSelectContent: "select__content",
                    classSelectRow: "select__row",
                    classSelectData: "select__asset",
                    classSelectDisabled: "_select-disabled",
                    classSelectTag: "_select-tag",
                    classSelectOpen: "_select-open",
                    classSelectActive: "_select-active",
                    classSelectFocus: "_select-focus",
                    classSelectMultiple: "_select-multiple",
                    classSelectCheckBox: "_select-checkbox",
                    classSelectOptionSelected: "_select-selected",
                    classSelectPseudoLabel: "_select-pseudo-label"
                };
                this._this = this;
                if (this.config.init) {
                    const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select");
                    if (selectItems.length) {
                        this.selectsInit(selectItems);
                        this.setLogging(`Проснулся, построил селектов: (${selectItems.length})`);
                    } else this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
                }
            }
            getSelectClass(className) {
                return `.${className}`;
            }
            getSelectElement(selectItem, className) {
                return {
                    originalSelect: selectItem.querySelector("select"),
                    selectElement: selectItem.querySelector(this.getSelectClass(className))
                };
            }
            selectsInit(selectItems) {
                selectItems.forEach(((originalSelect, index) => {
                    this.selectInit(originalSelect, index + 1);
                }));
                document.addEventListener("click", function(e) {
                    this.selectsActions(e);
                }.bind(this));
                document.addEventListener("keydown", function(e) {
                    this.selectsActions(e);
                }.bind(this));
                document.addEventListener("focusin", function(e) {
                    this.selectsActions(e);
                }.bind(this));
                document.addEventListener("focusout", function(e) {
                    this.selectsActions(e);
                }.bind(this));
            }
            selectInit(originalSelect, index) {
                const _this = this;
                let selectItem = document.createElement("div");
                selectItem.classList.add(this.selectClasses.classSelect);
                originalSelect.parentNode.insertBefore(selectItem, originalSelect);
                selectItem.appendChild(originalSelect);
                originalSelect.hidden = true;
                index ? originalSelect.dataset.id = index : null;
                if (this.getSelectPlaceholder(originalSelect)) {
                    originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
                    if (this.getSelectPlaceholder(originalSelect).label.show) {
                        const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                        selectItemTitle.insertAdjacentHTML("afterbegin", `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
                    }
                }
                selectItem.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
                this.selectBuild(originalSelect);
                originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : "150";
                originalSelect.addEventListener("change", (function(e) {
                    _this.selectChange(e);
                }));
            }
            selectBuild(originalSelect) {
                const selectItem = originalSelect.parentElement;
                selectItem.dataset.id = originalSelect.dataset.id;
                originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
                originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
                originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
                this.setSelectTitleValue(selectItem, originalSelect);
                this.setOptions(selectItem, originalSelect);
                originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
                originalSelect.hasAttribute("data-open") ? this.selectAction(selectItem) : null;
                this.selectDisabled(selectItem, originalSelect);
            }
            selectsActions(e) {
                const targetElement = e.target;
                const targetType = e.type;
                if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                    const selectItem = targetElement.closest(".select") ? targetElement.closest(".select") : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
                    const originalSelect = this.getSelectElement(selectItem).originalSelect;
                    if ("click" === targetType) {
                        if (!originalSelect.disabled) if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                            const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
                            const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
                            this.optionAction(selectItem, originalSelect, optionItem);
                        } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) this.selectAction(selectItem); else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
                            const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                            this.optionAction(selectItem, originalSelect, optionItem);
                        }
                    } else if ("focusin" === targetType || "focusout" === targetType) {
                        if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) "focusin" === targetType ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
                    } else if ("keydown" === targetType && "Escape" === e.code) this.selectsСlose();
                } else this.selectsСlose();
            }
            selectsСlose(selectOneGroup) {
                const selectsGroup = selectOneGroup ? selectOneGroup : document;
                const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
                if (selectActiveItems.length) selectActiveItems.forEach((selectActiveItem => {
                    this.selectСlose(selectActiveItem);
                }));
            }
            selectСlose(selectItem) {
                const originalSelect = this.getSelectElement(selectItem).originalSelect;
                const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
                if (!selectOptions.classList.contains("_slide")) {
                    selectItem.classList.remove(this.selectClasses.classSelectOpen);
                    _slideUp(selectOptions, originalSelect.dataset.speed);
                }
            }
            selectAction(selectItem) {
                const originalSelect = this.getSelectElement(selectItem).originalSelect;
                const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
                if (originalSelect.closest("[data-one-select]")) {
                    const selectOneGroup = originalSelect.closest("[data-one-select]");
                    this.selectsСlose(selectOneGroup);
                }
                if (!selectOptions.classList.contains("_slide")) {
                    selectItem.classList.toggle(this.selectClasses.classSelectOpen);
                    _slideToggle(selectOptions, originalSelect.dataset.speed);
                }
            }
            setSelectTitleValue(selectItem, originalSelect) {
                const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
                const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                if (selectItemTitle) selectItemTitle.remove();
                selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
            }
            getSelectTitleValue(selectItem, originalSelect) {
                let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
                if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
                    selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map((option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`)).join("");
                    if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
                        document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
                        if (originalSelect.hasAttribute("data-search")) selectTitleValue = false;
                    }
                }
                selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : "";
                let pseudoAttribute = "";
                let pseudoAttributeClass = "";
                if (originalSelect.hasAttribute("data-pseudo-label")) {
                    pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заполните атрибут"`;
                    pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
                }
                this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
                if (originalSelect.hasAttribute("data-search")) return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`; else {
                    const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : "";
                    return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
                }
            }
            getSelectElementContent(selectOption) {
                const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : "";
                const selectOptionDataHTML = selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
                let selectOptionContentHTML = ``;
                selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
                selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
                selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
                selectOptionContentHTML += selectOptionData ? `</span>` : "";
                selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
                selectOptionContentHTML += selectOption.textContent;
                selectOptionContentHTML += selectOptionData ? `</span>` : "";
                selectOptionContentHTML += selectOptionData ? `</span>` : "";
                return selectOptionContentHTML;
            }
            getSelectPlaceholder(originalSelect) {
                const selectPlaceholder = Array.from(originalSelect.options).find((option => !option.value));
                if (selectPlaceholder) return {
                    value: selectPlaceholder.textContent,
                    show: selectPlaceholder.hasAttribute("data-show"),
                    label: {
                        show: selectPlaceholder.hasAttribute("data-label"),
                        text: selectPlaceholder.dataset.label
                    }
                };
            }
            getSelectedOptionsData(originalSelect, type) {
                let selectedOptions = [];
                if (originalSelect.multiple) selectedOptions = Array.from(originalSelect.options).filter((option => option.value)).filter((option => option.selected)); else selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
                return {
                    elements: selectedOptions.map((option => option)),
                    values: selectedOptions.filter((option => option.value)).map((option => option.value)),
                    html: selectedOptions.map((option => this.getSelectElementContent(option)))
                };
            }
            getOptions(originalSelect) {
                let selectOptionsScroll = originalSelect.hasAttribute("data-scroll") ? `data-simplebar` : "";
                let selectOptionsScrollHeight = originalSelect.dataset.scroll ? `style="max-height:${originalSelect.dataset.scroll}px"` : "";
                let selectOptions = Array.from(originalSelect.options);
                if (selectOptions.length > 0) {
                    let selectOptionsHTML = ``;
                    if (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show || originalSelect.multiple) selectOptions = selectOptions.filter((option => option.value));
                    selectOptionsHTML += selectOptionsScroll ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">` : "";
                    selectOptions.forEach((selectOption => {
                        selectOptionsHTML += this.getOption(selectOption, originalSelect);
                    }));
                    selectOptionsHTML += selectOptionsScroll ? `</div>` : "";
                    return selectOptionsHTML;
                }
            }
            getOption(selectOption, originalSelect) {
                const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : "";
                const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute("data-show-selected") && !originalSelect.multiple ? `hidden` : ``;
                const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : "";
                const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
                const selectOptionLinkTarget = selectOption.hasAttribute("data-href-blank") ? `target="_blank"` : "";
                let selectOptionHTML = ``;
                selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
                selectOptionHTML += this.getSelectElementContent(selectOption);
                selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
                return selectOptionHTML;
            }
            setOptions(selectItem, originalSelect) {
                const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
                selectItemOptions.innerHTML = this.getOptions(originalSelect);
            }
            optionAction(selectItem, originalSelect, optionItem) {
                if (originalSelect.multiple) {
                    optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
                    const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
                    originalSelectSelectedItems.forEach((originalSelectSelectedItem => {
                        originalSelectSelectedItem.removeAttribute("selected");
                    }));
                    const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
                    selectSelectedItems.forEach((selectSelectedItems => {
                        originalSelect.querySelector(`option[value="${selectSelectedItems.dataset.value}"]`).setAttribute("selected", "selected");
                    }));
                } else {
                    if (!originalSelect.hasAttribute("data-show-selected")) {
                        if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
                        optionItem.hidden = true;
                    }
                    originalSelect.value = optionItem.hasAttribute("data-value") ? optionItem.dataset.value : optionItem.textContent;
                    this.selectAction(selectItem);
                }
                this.setSelectTitleValue(selectItem, originalSelect);
                this.setSelectChange(originalSelect);
            }
            selectChange(e) {
                const originalSelect = e.target;
                this.selectBuild(originalSelect);
                this.setSelectChange(originalSelect);
            }
            setSelectChange(originalSelect) {
                if (originalSelect.hasAttribute("data-validate")) formValidate.validateInput(originalSelect);
                if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
                    let tempButton = document.createElement("button");
                    tempButton.type = "submit";
                    originalSelect.closest("form").append(tempButton);
                    tempButton.click();
                    tempButton.remove();
                }
                const selectItem = originalSelect.parentElement;
                this.selectCallback(selectItem, originalSelect);
            }
            selectDisabled(selectItem, originalSelect) {
                if (originalSelect.disabled) {
                    selectItem.classList.add(this.selectClasses.classSelectDisabled);
                    this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
                } else {
                    selectItem.classList.remove(this.selectClasses.classSelectDisabled);
                    this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
                }
            }
            searchActions(selectItem) {
                this.getSelectElement(selectItem).originalSelect;
                const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
                const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
                const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
                const _this = this;
                selectInput.addEventListener("input", (function() {
                    selectOptionsItems.forEach((selectOptionsItem => {
                        if (selectOptionsItem.textContent.toUpperCase().indexOf(selectInput.value.toUpperCase()) >= 0) selectOptionsItem.hidden = false; else selectOptionsItem.hidden = true;
                    }));
                    true === selectOptions.hidden ? _this.selectAction(selectItem) : null;
                }));
            }
            selectCallback(selectItem, originalSelect) {
                document.dispatchEvent(new CustomEvent("selectCallback", {
                    detail: {
                        select: originalSelect
                    }
                }));
            }
            setLogging(message) {
                this.config.logging ? FLS(`[select]: ${message}`) : null;
            }
        }
        flsModules.select = new SelectConstructor({});
        function ssr_window_esm_isObject(obj) {
            return null !== obj && "object" === typeof obj && "constructor" in obj && obj.constructor === Object;
        }
        function extend(target = {}, src = {}) {
            Object.keys(src).forEach((key => {
                if ("undefined" === typeof target[key]) target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
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
        function offset() {
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
            offset,
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
            if ("auto" !== swiper.params.slidesPerView && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) swiper.visibleSlides.each((slide => {
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
            if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, e.target) : $targetEl.closest(noSwipingSelector)[0])) {
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
                    lockClass: "swiper-button-lock"
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
                init();
                update();
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
            Object.assign(swiper.navigation, {
                update,
                init,
                destroy
            });
        }
        function Controller(_ref) {
            let {swiper, extendParams, on} = _ref;
            extendParams({
                controller: {
                    control: void 0,
                    inverse: false,
                    by: "slide"
                }
            });
            swiper.controller = {
                control: void 0
            };
            function LinearSpline(x, y) {
                const binarySearch = function search() {
                    let maxIndex;
                    let minIndex;
                    let guess;
                    return (array, val) => {
                        minIndex = -1;
                        maxIndex = array.length;
                        while (maxIndex - minIndex > 1) {
                            guess = maxIndex + minIndex >> 1;
                            if (array[guess] <= val) minIndex = guess; else maxIndex = guess;
                        }
                        return maxIndex;
                    };
                }();
                this.x = x;
                this.y = y;
                this.lastIndex = x.length - 1;
                let i1;
                let i3;
                this.interpolate = function interpolate(x2) {
                    if (!x2) return 0;
                    i3 = binarySearch(this.x, x2);
                    i1 = i3 - 1;
                    return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
                };
                return this;
            }
            function getInterpolateFunction(c) {
                if (!swiper.controller.spline) swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
            }
            function setTranslate(_t, byController) {
                const controlled = swiper.controller.control;
                let multiplier;
                let controlledTranslate;
                const Swiper = swiper.constructor;
                function setControlledTranslate(c) {
                    const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
                    if ("slide" === swiper.params.controller.by) {
                        getInterpolateFunction(c);
                        controlledTranslate = -swiper.controller.spline.interpolate(-translate);
                    }
                    if (!controlledTranslate || "container" === swiper.params.controller.by) {
                        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
                        controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
                    }
                    if (swiper.params.controller.inverse) controlledTranslate = c.maxTranslate() - controlledTranslate;
                    c.updateProgress(controlledTranslate);
                    c.setTranslate(controlledTranslate, swiper);
                    c.updateActiveIndex();
                    c.updateSlidesClasses();
                }
                if (Array.isArray(controlled)) {
                    for (let i = 0; i < controlled.length; i += 1) if (controlled[i] !== byController && controlled[i] instanceof Swiper) setControlledTranslate(controlled[i]);
                } else if (controlled instanceof Swiper && byController !== controlled) setControlledTranslate(controlled);
            }
            function setTransition(duration, byController) {
                const Swiper = swiper.constructor;
                const controlled = swiper.controller.control;
                let i;
                function setControlledTransition(c) {
                    c.setTransition(duration, swiper);
                    if (0 !== duration) {
                        c.transitionStart();
                        if (c.params.autoHeight) utils_nextTick((() => {
                            c.updateAutoHeight();
                        }));
                        c.$wrapperEl.transitionEnd((() => {
                            if (!controlled) return;
                            if (c.params.loop && "slide" === swiper.params.controller.by) c.loopFix();
                            c.transitionEnd();
                        }));
                    }
                }
                if (Array.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i += 1) if (controlled[i] !== byController && controlled[i] instanceof Swiper) setControlledTransition(controlled[i]);
                } else if (controlled instanceof Swiper && byController !== controlled) setControlledTransition(controlled);
            }
            function removeSpline() {
                if (!swiper.controller.control) return;
                if (swiper.controller.spline) {
                    swiper.controller.spline = void 0;
                    delete swiper.controller.spline;
                }
            }
            on("beforeInit", (() => {
                swiper.controller.control = swiper.params.controller.control;
            }));
            on("update", (() => {
                removeSpline();
            }));
            on("resize", (() => {
                removeSpline();
            }));
            on("observerUpdate", (() => {
                removeSpline();
            }));
            on("setTranslate", ((_s, translate, byController) => {
                if (!swiper.controller.control) return;
                swiper.controller.setTranslate(translate, byController);
            }));
            on("setTransition", ((_s, duration, byController) => {
                if (!swiper.controller.control) return;
                swiper.controller.setTransition(duration, byController);
            }));
            Object.assign(swiper.controller, {
                setTranslate,
                setTransition
            });
        }
        core.use([ Controller ]);
        function initSliders() {
            let tarifsTitle = new core(".sliders-tarifs__head-slider", {
                modules: [ Navigation ],
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true,
                speed: 800,
                navigation: {
                    prevEl: ".sliders-tarifs__prev",
                    nextEl: ".sliders-tarifs__next"
                },
                on: {}
            });
            let tarifsList = new core(".sliders-tarifs__body-slider", {
                modules: [ Navigation ],
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true,
                speed: 800,
                navigation: {
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next"
                },
                on: {}
            });
            tarifsTitle.controller.control = tarifsList;
            tarifsList.controller.control = tarifsTitle;
        }
        window.addEventListener("load", (function(e) {
            initSliders();
        }));
        var lazyload_min = __webpack_require__(732);
        new lazyload_min({
            elements_selector: "[data-src],[data-srcset]",
            class_loaded: "_lazy-loaded",
            use_native: true
        });
        class ScrollWatcher {
            constructor(props) {
                let defaultConfig = {
                    logging: true
                };
                this.config = Object.assign(defaultConfig, props);
                this.observer;
                !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
            }
            scrollWatcherUpdate() {
                this.scrollWatcherRun();
            }
            scrollWatcherRun() {
                document.documentElement.classList.add("watcher");
                this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
            }
            scrollWatcherConstructor(items) {
                if (items.length) {
                    this.scrollWatcherLogging(`Проснулся, слежу за объектами (${items.length})...`);
                    let uniqParams = uniqArray(Array.from(items).map((function(item) {
                        return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                    })));
                    uniqParams.forEach((uniqParam => {
                        let uniqParamArray = uniqParam.split("|");
                        let paramsWatch = {
                            root: uniqParamArray[0],
                            margin: uniqParamArray[1],
                            threshold: uniqParamArray[2]
                        };
                        let groupItems = Array.from(items).filter((function(item) {
                            let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                            let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                            let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                            if (String(watchRoot) === paramsWatch.root && String(watchMargin) === paramsWatch.margin && String(watchThreshold) === paramsWatch.threshold) return item;
                        }));
                        let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                        this.scrollWatcherInit(groupItems, configWatcher);
                    }));
                } else this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
            }
            getScrollWatcherConfig(paramsWatch) {
                let configWatcher = {};
                if (document.querySelector(paramsWatch.root)) configWatcher.root = document.querySelector(paramsWatch.root); else if ("null" !== paramsWatch.root) this.scrollWatcherLogging(`Эмм... родительского объекта ${paramsWatch.root} нет на странице`);
                configWatcher.rootMargin = paramsWatch.margin;
                if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
                    this.scrollWatcherLogging(`Ой ой, настройку data-watch-margin нужно задавать в PX или %`);
                    return;
                }
                if ("prx" === paramsWatch.threshold) {
                    paramsWatch.threshold = [];
                    for (let i = 0; i <= 1; i += .005) paramsWatch.threshold.push(i);
                } else paramsWatch.threshold = paramsWatch.threshold.split(",");
                configWatcher.threshold = paramsWatch.threshold;
                return configWatcher;
            }
            scrollWatcherCreate(configWatcher) {
                this.observer = new IntersectionObserver(((entries, observer) => {
                    entries.forEach((entry => {
                        this.scrollWatcherCallback(entry, observer);
                    }));
                }), configWatcher);
            }
            scrollWatcherInit(items, configWatcher) {
                this.scrollWatcherCreate(configWatcher);
                items.forEach((item => this.observer.observe(item)));
            }
            scrollWatcherIntersecting(entry, targetElement) {
                if (entry.isIntersecting) {
                    !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
                    this.scrollWatcherLogging(`Я вижу ${targetElement.classList}, добавил класс _watcher-view`);
                } else {
                    targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
                    this.scrollWatcherLogging(`Я не вижу ${targetElement.classList}, убрал класс _watcher-view`);
                }
            }
            scrollWatcherOff(targetElement, observer) {
                observer.unobserve(targetElement);
                this.scrollWatcherLogging(`Я перестал следить за ${targetElement.classList}`);
            }
            scrollWatcherLogging(message) {
                this.config.logging ? FLS(`[Наблюдатель]: ${message}`) : null;
            }
            scrollWatcherCallback(entry, observer) {
                const targetElement = entry.target;
                this.scrollWatcherIntersecting(entry, targetElement);
                targetElement.hasAttribute("data-watch-once") && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
                document.dispatchEvent(new CustomEvent("watcherCallback", {
                    detail: {
                        entry
                    }
                }));
            }
        }
        flsModules.watcher = new ScrollWatcher({});
        let addWindowScrollEvent = false;
        function pageNavigation() {
            document.addEventListener("click", pageNavigationAction);
            document.addEventListener("watcherCallback", pageNavigationAction);
            function pageNavigationAction(e) {
                if ("click" === e.type) {
                    const targetElement = e.target;
                    if (targetElement.closest("[data-goto]")) {
                        console.log(targetElement);
                        const gotoLink = targetElement.closest("[data-goto]");
                        const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                        const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                        const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                        const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                        gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
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
        "object" === typeof navigator && function(global, factory) {
            "object" === typeof exports && "undefined" !== typeof module ? module.exports = factory() : "function" === typeof define && define.amd ? define("Plyr", factory) : (global = "undefined" !== typeof globalThis ? globalThis : global || self, 
            global.Plyr = factory());
        }(void 0, (function() {
            "use strict";
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            function _createClass(Constructor, protoProps, staticProps) {
                if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                if (staticProps) _defineProperties(Constructor, staticProps);
                return Constructor;
            }
            function _defineProperty(obj, key, value) {
                if (key in obj) Object.defineProperty(obj, key, {
                    value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                }); else obj[key] = value;
                return obj;
            }
            function ownKeys(object, enumerableOnly) {
                var keys = Object.keys(object);
                if (Object.getOwnPropertySymbols) {
                    var symbols = Object.getOwnPropertySymbols(object);
                    if (enumerableOnly) symbols = symbols.filter((function(sym) {
                        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                    }));
                    keys.push.apply(keys, symbols);
                }
                return keys;
            }
            function _objectSpread2(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = null != arguments[i] ? arguments[i] : {};
                    if (i % 2) ownKeys(Object(source), true).forEach((function(key) {
                        _defineProperty(target, key, source[key]);
                    })); else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); else ownKeys(Object(source)).forEach((function(key) {
                        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                    }));
                }
                return target;
            }
            function _objectWithoutPropertiesLoose(source, excluded) {
                if (null == source) return {};
                var target = {};
                var sourceKeys = Object.keys(source);
                var key, i;
                for (i = 0; i < sourceKeys.length; i++) {
                    key = sourceKeys[i];
                    if (excluded.indexOf(key) >= 0) continue;
                    target[key] = source[key];
                }
                return target;
            }
            function _objectWithoutProperties(source, excluded) {
                if (null == source) return {};
                var target = _objectWithoutPropertiesLoose(source, excluded);
                var key, i;
                if (Object.getOwnPropertySymbols) {
                    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
                    for (i = 0; i < sourceSymbolKeys.length; i++) {
                        key = sourceSymbolKeys[i];
                        if (excluded.indexOf(key) >= 0) continue;
                        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
                        target[key] = source[key];
                    }
                }
                return target;
            }
            function _slicedToArray(arr, i) {
                return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
            }
            function _toConsumableArray(arr) {
                return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
            }
            function _arrayWithoutHoles(arr) {
                if (Array.isArray(arr)) return _arrayLikeToArray(arr);
            }
            function _arrayWithHoles(arr) {
                if (Array.isArray(arr)) return arr;
            }
            function _iterableToArray(iter) {
                if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) return Array.from(iter);
            }
            function _iterableToArrayLimit(arr, i) {
                if ("undefined" === typeof Symbol || !(Symbol.iterator in Object(arr))) return;
                var _arr = [];
                var _n = true;
                var _d = false;
                var _e = void 0;
                try {
                    for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
                        _arr.push(_s.value);
                        if (i && _arr.length === i) break;
                    }
                } catch (err) {
                    _d = true;
                    _e = err;
                } finally {
                    try {
                        if (!_n && null != _i["return"]) _i["return"]();
                    } finally {
                        if (_d) throw _e;
                    }
                }
                return _arr;
            }
            function _unsupportedIterableToArray(o, minLen) {
                if (!o) return;
                if ("string" === typeof o) return _arrayLikeToArray(o, minLen);
                var n = Object.prototype.toString.call(o).slice(8, -1);
                if ("Object" === n && o.constructor) n = o.constructor.name;
                if ("Map" === n || "Set" === n) return Array.from(o);
                if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
            }
            function _arrayLikeToArray(arr, len) {
                if (null == len || len > arr.length) len = arr.length;
                for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
                return arr2;
            }
            function _nonIterableSpread() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function _nonIterableRest() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            function _classCallCheck$1(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
            }
            function _defineProperties$1(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                    Object.defineProperty(e, r.key, r);
                }
            }
            function _createClass$1(e, t, n) {
                return t && _defineProperties$1(e.prototype, t), n && _defineProperties$1(e, n), 
                e;
            }
            function _defineProperty$1(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e;
            }
            function ownKeys$1(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable;
                    }))), n.push.apply(n, r);
                }
                return n;
            }
            function _objectSpread2$1(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? ownKeys$1(Object(n), !0).forEach((function(t) {
                        _defineProperty$1(e, t, n[t]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ownKeys$1(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                    }));
                }
                return e;
            }
            var defaults = {
                addCSS: !0,
                thumbWidth: 15,
                watch: !0
            };
            function matches(e, t) {
                return function() {
                    return Array.from(document.querySelectorAll(t)).includes(this);
                }.call(e, t);
            }
            function trigger(e, t) {
                if (e && t) {
                    var n = new Event(t, {
                        bubbles: !0
                    });
                    e.dispatchEvent(n);
                }
            }
            var getConstructor = function getConstructor(e) {
                return null != e ? e.constructor : null;
            }, instanceOf = function instanceOf(e, t) {
                return !!(e && t && e instanceof t);
            }, isNullOrUndefined = function isNullOrUndefined(e) {
                return null == e;
            }, isObject = function isObject(e) {
                return getConstructor(e) === Object;
            }, isNumber = function isNumber(e) {
                return getConstructor(e) === Number && !Number.isNaN(e);
            }, isString = function isString(e) {
                return getConstructor(e) === String;
            }, isBoolean = function isBoolean(e) {
                return getConstructor(e) === Boolean;
            }, isFunction = function isFunction(e) {
                return getConstructor(e) === Function;
            }, isArray = function isArray(e) {
                return Array.isArray(e);
            }, isNodeList = function isNodeList(e) {
                return instanceOf(e, NodeList);
            }, isElement = function isElement(e) {
                return instanceOf(e, Element);
            }, isEvent = function isEvent(e) {
                return instanceOf(e, Event);
            }, isEmpty = function isEmpty(e) {
                return isNullOrUndefined(e) || (isString(e) || isArray(e) || isNodeList(e)) && !e.length || isObject(e) && !Object.keys(e).length;
            }, is = {
                nullOrUndefined: isNullOrUndefined,
                object: isObject,
                number: isNumber,
                string: isString,
                boolean: isBoolean,
                function: isFunction,
                array: isArray,
                nodeList: isNodeList,
                element: isElement,
                event: isEvent,
                empty: isEmpty
            };
            function getDecimalPlaces(e) {
                var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
            }
            function round(e, t) {
                if (1 > t) {
                    var n = getDecimalPlaces(t);
                    return parseFloat(e.toFixed(n));
                }
                return Math.round(e / t) * t;
            }
            var RangeTouch = function() {
                function e(t, n) {
                    _classCallCheck$1(this, e), is.element(t) ? this.element = t : is.string(t) && (this.element = document.querySelector(t)), 
                    is.element(this.element) && is.empty(this.element.rangeTouch) && (this.config = _objectSpread2$1({}, defaults, {}, n), 
                    this.init());
                }
                return _createClass$1(e, [ {
                    key: "init",
                    value: function value() {
                        e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", 
                        this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this);
                    }
                }, {
                    key: "destroy",
                    value: function value() {
                        e.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", 
                        this.element.style.touchAction = ""), this.listeners(!1), this.element.rangeTouch = null);
                    }
                }, {
                    key: "listeners",
                    value: function value(e) {
                        var t = this, n = e ? "addEventListener" : "removeEventListener";
                        [ "touchstart", "touchmove", "touchend" ].forEach((function(e) {
                            t.element[n](e, (function(e) {
                                return t.set(e);
                            }), !1);
                        }));
                    }
                }, {
                    key: "get",
                    value: function value(t) {
                        if (!e.enabled || !is.event(t)) return null;
                        var n, r = t.target, i = t.changedTouches[0], o = parseFloat(r.getAttribute("min")) || 0, s = parseFloat(r.getAttribute("max")) || 100, u = parseFloat(r.getAttribute("step")) || 1, c = r.getBoundingClientRect(), a = 100 / c.width * (this.config.thumbWidth / 2) / 100;
                        return 0 > (n = 100 / c.width * (i.clientX - c.left)) ? n = 0 : 100 < n && (n = 100), 
                        50 > n ? n -= (100 - 2 * n) * a : 50 < n && (n += 2 * (n - 50) * a), o + round(n / 100 * (s - o), u);
                    }
                }, {
                    key: "set",
                    value: function value(t) {
                        e.enabled && is.event(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), 
                        trigger(t.target, "touchend" === t.type ? "change" : "input"));
                    }
                } ], [ {
                    key: "setup",
                    value: function value(t) {
                        var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, r = null;
                        if (is.empty(t) || is.string(t) ? r = Array.from(document.querySelectorAll(is.string(t) ? t : 'input[type="range"]')) : is.element(t) ? r = [ t ] : is.nodeList(t) ? r = Array.from(t) : is.array(t) && (r = t.filter(is.element)), 
                        is.empty(r)) return null;
                        var i = _objectSpread2$1({}, defaults, {}, n);
                        if (is.string(t) && i.watch) {
                            var o = new MutationObserver((function(n) {
                                Array.from(n).forEach((function(n) {
                                    Array.from(n.addedNodes).forEach((function(n) {
                                        is.element(n) && matches(n, t) && new e(n, i);
                                    }));
                                }));
                            }));
                            o.observe(document.body, {
                                childList: !0,
                                subtree: !0
                            });
                        }
                        return r.map((function(t) {
                            return new e(t, n);
                        }));
                    }
                }, {
                    key: "enabled",
                    get: function get() {
                        return "ontouchstart" in document.documentElement;
                    }
                } ]), e;
            }();
            var getConstructor$1 = function getConstructor(input) {
                return null !== input && "undefined" !== typeof input ? input.constructor : null;
            };
            var instanceOf$1 = function instanceOf(input, constructor) {
                return Boolean(input && constructor && input instanceof constructor);
            };
            var isNullOrUndefined$1 = function isNullOrUndefined(input) {
                return null === input || "undefined" === typeof input;
            };
            var isObject$1 = function isObject(input) {
                return getConstructor$1(input) === Object;
            };
            var isNumber$1 = function isNumber(input) {
                return getConstructor$1(input) === Number && !Number.isNaN(input);
            };
            var isString$1 = function isString(input) {
                return getConstructor$1(input) === String;
            };
            var isBoolean$1 = function isBoolean(input) {
                return getConstructor$1(input) === Boolean;
            };
            var isFunction$1 = function isFunction(input) {
                return getConstructor$1(input) === Function;
            };
            var isArray$1 = function isArray(input) {
                return Array.isArray(input);
            };
            var isWeakMap = function isWeakMap(input) {
                return instanceOf$1(input, WeakMap);
            };
            var isNodeList$1 = function isNodeList(input) {
                return instanceOf$1(input, NodeList);
            };
            var isElement$1 = function isElement(input) {
                return instanceOf$1(input, Element);
            };
            var isTextNode = function isTextNode(input) {
                return getConstructor$1(input) === Text;
            };
            var isEvent$1 = function isEvent(input) {
                return instanceOf$1(input, Event);
            };
            var isKeyboardEvent = function isKeyboardEvent(input) {
                return instanceOf$1(input, KeyboardEvent);
            };
            var isCue = function isCue(input) {
                return instanceOf$1(input, window.TextTrackCue) || instanceOf$1(input, window.VTTCue);
            };
            var isTrack = function isTrack(input) {
                return instanceOf$1(input, TextTrack) || !isNullOrUndefined$1(input) && isString$1(input.kind);
            };
            var isPromise = function isPromise(input) {
                return instanceOf$1(input, Promise) && isFunction$1(input.then);
            };
            var isEmpty$1 = function isEmpty(input) {
                return isNullOrUndefined$1(input) || (isString$1(input) || isArray$1(input) || isNodeList$1(input)) && !input.length || isObject$1(input) && !Object.keys(input).length;
            };
            var isUrl = function isUrl(input) {
                if (instanceOf$1(input, window.URL)) return true;
                if (!isString$1(input)) return false;
                var string = input;
                if (!input.startsWith("http://") || !input.startsWith("https://")) string = "http://".concat(input);
                try {
                    return !isEmpty$1(new URL(string).hostname);
                } catch (e) {
                    return false;
                }
            };
            var is$1 = {
                nullOrUndefined: isNullOrUndefined$1,
                object: isObject$1,
                number: isNumber$1,
                string: isString$1,
                boolean: isBoolean$1,
                function: isFunction$1,
                array: isArray$1,
                weakMap: isWeakMap,
                nodeList: isNodeList$1,
                element: isElement$1,
                textNode: isTextNode,
                event: isEvent$1,
                keyboardEvent: isKeyboardEvent,
                cue: isCue,
                track: isTrack,
                promise: isPromise,
                url: isUrl,
                empty: isEmpty$1
            };
            var transitionEndEvent = function() {
                var element = document.createElement("span");
                var events = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
                var type = Object.keys(events).find((function(event) {
                    return void 0 !== element.style[event];
                }));
                return is$1.string(type) ? events[type] : false;
            }();
            function repaint(element, delay) {
                setTimeout((function() {
                    try {
                        element.hidden = true;
                        element.offsetHeight;
                        element.hidden = false;
                    } catch (e) {}
                }), delay);
            }
            var browser = {
                isIE: 
                /* @cc_on!@ */
                !!document.documentMode,
                isEdge: window.navigator.userAgent.includes("Edge"),
                isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
                isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
                isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform)
            };
            function cloneDeep(object) {
                return JSON.parse(JSON.stringify(object));
            }
            function getDeep(object, path) {
                return path.split(".").reduce((function(obj, key) {
                    return obj && obj[key];
                }), object);
            }
            function extend() {
                var target = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) sources[_key - 1] = arguments[_key];
                if (!sources.length) return target;
                var source = sources.shift();
                if (!is$1.object(source)) return target;
                Object.keys(source).forEach((function(key) {
                    if (is$1.object(source[key])) {
                        if (!Object.keys(target).includes(key)) Object.assign(target, _defineProperty({}, key, {}));
                        extend(target[key], source[key]);
                    } else Object.assign(target, _defineProperty({}, key, source[key]));
                }));
                return extend.apply(void 0, [ target ].concat(sources));
            }
            function wrap(elements, wrapper) {
                var targets = elements.length ? elements : [ elements ];
                Array.from(targets).reverse().forEach((function(element, index) {
                    var child = index > 0 ? wrapper.cloneNode(true) : wrapper;
                    var parent = element.parentNode;
                    var sibling = element.nextSibling;
                    child.appendChild(element);
                    if (sibling) parent.insertBefore(child, sibling); else parent.appendChild(child);
                }));
            }
            function setAttributes(element, attributes) {
                if (!is$1.element(element) || is$1.empty(attributes)) return;
                Object.entries(attributes).filter((function(_ref) {
                    var _ref2 = _slicedToArray(_ref, 2), value = _ref2[1];
                    return !is$1.nullOrUndefined(value);
                })).forEach((function(_ref3) {
                    var _ref4 = _slicedToArray(_ref3, 2), key = _ref4[0], value = _ref4[1];
                    return element.setAttribute(key, value);
                }));
            }
            function createElement(type, attributes, text) {
                var element = document.createElement(type);
                if (is$1.object(attributes)) setAttributes(element, attributes);
                if (is$1.string(text)) element.innerText = text;
                return element;
            }
            function insertAfter(element, target) {
                if (!is$1.element(element) || !is$1.element(target)) return;
                target.parentNode.insertBefore(element, target.nextSibling);
            }
            function insertElement(type, parent, attributes, text) {
                if (!is$1.element(parent)) return;
                parent.appendChild(createElement(type, attributes, text));
            }
            function removeElement(element) {
                if (is$1.nodeList(element) || is$1.array(element)) {
                    Array.from(element).forEach(removeElement);
                    return;
                }
                if (!is$1.element(element) || !is$1.element(element.parentNode)) return;
                element.parentNode.removeChild(element);
            }
            function emptyElement(element) {
                if (!is$1.element(element)) return;
                var length = element.childNodes.length;
                while (length > 0) {
                    element.removeChild(element.lastChild);
                    length -= 1;
                }
            }
            function replaceElement(newChild, oldChild) {
                if (!is$1.element(oldChild) || !is$1.element(oldChild.parentNode) || !is$1.element(newChild)) return null;
                oldChild.parentNode.replaceChild(newChild, oldChild);
                return newChild;
            }
            function getAttributesFromSelector(sel, existingAttributes) {
                if (!is$1.string(sel) || is$1.empty(sel)) return {};
                var attributes = {};
                var existing = extend({}, existingAttributes);
                sel.split(",").forEach((function(s) {
                    var selector = s.trim();
                    var className = selector.replace(".", "");
                    var stripped = selector.replace(/[[\]]/g, "");
                    var parts = stripped.split("=");
                    var _parts = _slicedToArray(parts, 1), key = _parts[0];
                    var value = parts.length > 1 ? parts[1].replace(/["']/g, "") : "";
                    var start = selector.charAt(0);
                    switch (start) {
                      case ".":
                        if (is$1.string(existing.class)) attributes.class = "".concat(existing.class, " ").concat(className); else attributes.class = className;
                        break;

                      case "#":
                        attributes.id = selector.replace("#", "");
                        break;

                      case "[":
                        attributes[key] = value;
                        break;
                    }
                }));
                return extend(existing, attributes);
            }
            function toggleHidden(element, hidden) {
                if (!is$1.element(element)) return;
                var hide = hidden;
                if (!is$1.boolean(hide)) hide = !element.hidden;
                element.hidden = hide;
            }
            function toggleClass(element, className, force) {
                if (is$1.nodeList(element)) return Array.from(element).map((function(e) {
                    return toggleClass(e, className, force);
                }));
                if (is$1.element(element)) {
                    var method = "toggle";
                    if ("undefined" !== typeof force) method = force ? "add" : "remove";
                    element.classList[method](className);
                    return element.classList.contains(className);
                }
                return false;
            }
            function hasClass(element, className) {
                return is$1.element(element) && element.classList.contains(className);
            }
            function matches$1(element, selector) {
                var _Element = Element, prototype = _Element.prototype;
                function match() {
                    return Array.from(document.querySelectorAll(selector)).includes(this);
                }
                var method = prototype.matches || prototype.webkitMatchesSelector || prototype.mozMatchesSelector || prototype.msMatchesSelector || match;
                return method.call(element, selector);
            }
            function closest(element, selector) {
                var _Element2 = Element, prototype = _Element2.prototype;
                function closestElement() {
                    var el = this;
                    do {
                        if (matches$1.matches(el, selector)) return el;
                        el = el.parentElement || el.parentNode;
                    } while (null !== el && 1 === el.nodeType);
                    return null;
                }
                var method = prototype.closest || closestElement;
                return method.call(element, selector);
            }
            function getElements(selector) {
                return this.elements.container.querySelectorAll(selector);
            }
            function getElement(selector) {
                return this.elements.container.querySelector(selector);
            }
            function setFocus() {
                var element = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                var tabFocus = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
                if (!is$1.element(element)) return;
                element.focus({
                    preventScroll: true
                });
                if (tabFocus) toggleClass(element, this.config.classNames.tabFocus);
            }
            var defaultCodecs = {
                "audio/ogg": "vorbis",
                "audio/wav": "1",
                "video/webm": "vp8, vorbis",
                "video/mp4": "avc1.42E01E, mp4a.40.2",
                "video/ogg": "theora"
            };
            var support = {
                audio: "canPlayType" in document.createElement("audio"),
                video: "canPlayType" in document.createElement("video"),
                check: function check(type, provider, playsinline) {
                    var canPlayInline = browser.isIPhone && playsinline && support.playsinline;
                    var api = support[type] || "html5" !== provider;
                    var ui = api && support.rangeInput && ("video" !== type || !browser.isIPhone || canPlayInline);
                    return {
                        api,
                        ui
                    };
                },
                pip: function() {
                    if (browser.isIPhone) return false;
                    if (is$1.function(createElement("video").webkitSetPresentationMode)) return true;
                    if (document.pictureInPictureEnabled && !createElement("video").disablePictureInPicture) return true;
                    return false;
                }(),
                airplay: is$1.function(window.WebKitPlaybackTargetAvailabilityEvent),
                playsinline: "playsInline" in document.createElement("video"),
                mime: function mime(input) {
                    if (is$1.empty(input)) return false;
                    var _input$split = input.split("/"), _input$split2 = _slicedToArray(_input$split, 1), mediaType = _input$split2[0];
                    var type = input;
                    if (!this.isHTML5 || mediaType !== this.type) return false;
                    if (Object.keys(defaultCodecs).includes(type)) type += '; codecs="'.concat(defaultCodecs[input], '"');
                    try {
                        return Boolean(type && this.media.canPlayType(type).replace(/no/, ""));
                    } catch (e) {
                        return false;
                    }
                },
                textTracks: "textTracks" in document.createElement("video"),
                rangeInput: function() {
                    var range = document.createElement("input");
                    range.type = "range";
                    return "range" === range.type;
                }(),
                touch: "ontouchstart" in document.documentElement,
                transitions: false !== transitionEndEvent,
                reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
            };
            var supportsPassiveListeners = function() {
                var supported = false;
                try {
                    var options = Object.defineProperty({}, "passive", {
                        get: function get() {
                            supported = true;
                            return null;
                        }
                    });
                    window.addEventListener("test", null, options);
                    window.removeEventListener("test", null, options);
                } catch (e) {}
                return supported;
            }();
            function toggleListener(element, event, callback) {
                var _this = this;
                var toggle = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : false;
                var passive = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : true;
                var capture = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : false;
                if (!element || !("addEventListener" in element) || is$1.empty(event) || !is$1.function(callback)) return;
                var events = event.split(" ");
                var options = capture;
                if (supportsPassiveListeners) options = {
                    passive,
                    capture
                };
                events.forEach((function(type) {
                    if (_this && _this.eventListeners && toggle) _this.eventListeners.push({
                        element,
                        type,
                        callback,
                        options
                    });
                    element[toggle ? "addEventListener" : "removeEventListener"](type, callback, options);
                }));
            }
            function on(element) {
                var events = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                var callback = arguments.length > 2 ? arguments[2] : void 0;
                var passive = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : true;
                var capture = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : false;
                toggleListener.call(this, element, events, callback, true, passive, capture);
            }
            function off(element) {
                var events = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                var callback = arguments.length > 2 ? arguments[2] : void 0;
                var passive = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : true;
                var capture = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : false;
                toggleListener.call(this, element, events, callback, false, passive, capture);
            }
            function once(element) {
                var _this2 = this;
                var events = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                var callback = arguments.length > 2 ? arguments[2] : void 0;
                var passive = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : true;
                var capture = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : false;
                var onceCallback = function onceCallback() {
                    off(element, events, onceCallback, passive, capture);
                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    callback.apply(_this2, args);
                };
                toggleListener.call(this, element, events, onceCallback, true, passive, capture);
            }
            function triggerEvent(element) {
                var type = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                var bubbles = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : false;
                var detail = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                if (!is$1.element(element) || is$1.empty(type)) return;
                var event = new CustomEvent(type, {
                    bubbles,
                    detail: _objectSpread2(_objectSpread2({}, detail), {}, {
                        plyr: this
                    })
                });
                element.dispatchEvent(event);
            }
            function unbindListeners() {
                if (this && this.eventListeners) {
                    this.eventListeners.forEach((function(item) {
                        var element = item.element, type = item.type, callback = item.callback, options = item.options;
                        element.removeEventListener(type, callback, options);
                    }));
                    this.eventListeners = [];
                }
            }
            function ready() {
                var _this3 = this;
                return new Promise((function(resolve) {
                    return _this3.ready ? setTimeout(resolve, 0) : on.call(_this3, _this3.elements.container, "ready", resolve);
                })).then((function() {}));
            }
            function silencePromise(value) {
                if (is$1.promise(value)) value.then(null, (function() {}));
            }
            function validateRatio(input) {
                if (!is$1.array(input) && (!is$1.string(input) || !input.includes(":"))) return false;
                var ratio = is$1.array(input) ? input : input.split(":");
                return ratio.map(Number).every(is$1.number);
            }
            function reduceAspectRatio(ratio) {
                if (!is$1.array(ratio) || !ratio.every(is$1.number)) return null;
                var _ratio = _slicedToArray(ratio, 2), width = _ratio[0], height = _ratio[1];
                var getDivider = function getDivider(w, h) {
                    return 0 === h ? w : getDivider(h, w % h);
                };
                var divider = getDivider(width, height);
                return [ width / divider, height / divider ];
            }
            function getAspectRatio(input) {
                var parse = function parse(ratio) {
                    return validateRatio(ratio) ? ratio.split(":").map(Number) : null;
                };
                var ratio = parse(input);
                if (null === ratio) ratio = parse(this.config.ratio);
                if (null === ratio && !is$1.empty(this.embed) && is$1.array(this.embed.ratio)) ratio = this.embed.ratio;
                if (null === ratio && this.isHTML5) {
                    var _this$media = this.media, videoWidth = _this$media.videoWidth, videoHeight = _this$media.videoHeight;
                    ratio = reduceAspectRatio([ videoWidth, videoHeight ]);
                }
                return ratio;
            }
            function setAspectRatio(input) {
                if (!this.isVideo) return {};
                var wrapper = this.elements.wrapper;
                var ratio = getAspectRatio.call(this, input);
                var _ref = is$1.array(ratio) ? ratio : [ 0, 0 ], _ref2 = _slicedToArray(_ref, 2), w = _ref2[0], h = _ref2[1];
                var padding = 100 / w * h;
                wrapper.style.paddingBottom = "".concat(padding, "%");
                if (this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
                    var height = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10);
                    var offset = (height - padding) / (height / 50);
                    if (this.fullscreen.active) wrapper.style.paddingBottom = null; else this.media.style.transform = "translateY(-".concat(offset, "%)");
                } else if (this.isHTML5) wrapper.classList.toggle(this.config.classNames.videoFixedRatio, null !== ratio);
                return {
                    padding,
                    ratio
                };
            }
            var html5 = {
                getSources: function getSources() {
                    var _this = this;
                    if (!this.isHTML5) return [];
                    var sources = Array.from(this.media.querySelectorAll("source"));
                    return sources.filter((function(source) {
                        var type = source.getAttribute("type");
                        if (is$1.empty(type)) return true;
                        return support.mime.call(_this, type);
                    }));
                },
                getQualityOptions: function getQualityOptions() {
                    if (this.config.quality.forced) return this.config.quality.options;
                    return html5.getSources.call(this).map((function(source) {
                        return Number(source.getAttribute("size"));
                    })).filter(Boolean);
                },
                setup: function setup() {
                    if (!this.isHTML5) return;
                    var player = this;
                    player.options.speed = player.config.speed.options;
                    if (!is$1.empty(this.config.ratio)) setAspectRatio.call(player);
                    Object.defineProperty(player.media, "quality", {
                        get: function get() {
                            var sources = html5.getSources.call(player);
                            var source = sources.find((function(s) {
                                return s.getAttribute("src") === player.source;
                            }));
                            return source && Number(source.getAttribute("size"));
                        },
                        set: function set(input) {
                            if (player.quality === input) return;
                            if (player.config.quality.forced && is$1.function(player.config.quality.onChange)) player.config.quality.onChange(input); else {
                                var sources = html5.getSources.call(player);
                                var source = sources.find((function(s) {
                                    return Number(s.getAttribute("size")) === input;
                                }));
                                if (!source) return;
                                var _player$media = player.media, currentTime = _player$media.currentTime, paused = _player$media.paused, preload = _player$media.preload, readyState = _player$media.readyState, playbackRate = _player$media.playbackRate;
                                player.media.src = source.getAttribute("src");
                                if ("none" !== preload || readyState) {
                                    player.once("loadedmetadata", (function() {
                                        player.speed = playbackRate;
                                        player.currentTime = currentTime;
                                        if (!paused) silencePromise(player.play());
                                    }));
                                    player.media.load();
                                }
                            }
                            triggerEvent.call(player, player.media, "qualitychange", false, {
                                quality: input
                            });
                        }
                    });
                },
                cancelRequests: function cancelRequests() {
                    if (!this.isHTML5) return;
                    removeElement(html5.getSources.call(this));
                    this.media.setAttribute("src", this.config.blankVideo);
                    this.media.load();
                    this.debug.log("Cancelled network requests");
                }
            };
            function dedupe(array) {
                if (!is$1.array(array)) return array;
                return array.filter((function(item, index) {
                    return array.indexOf(item) === index;
                }));
            }
            function closest$1(array, value) {
                if (!is$1.array(array) || !array.length) return null;
                return array.reduce((function(prev, curr) {
                    return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
                }));
            }
            function generateId(prefix) {
                return "".concat(prefix, "-").concat(Math.floor(1e4 * Math.random()));
            }
            function format(input) {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
                if (is$1.empty(input)) return input;
                return input.toString().replace(/{(\d+)}/g, (function(match, i) {
                    return args[i].toString();
                }));
            }
            function getPercentage(current, max) {
                if (0 === current || 0 === max || Number.isNaN(current) || Number.isNaN(max)) return 0;
                return (current / max * 100).toFixed(2);
            }
            var replaceAll = function replaceAll() {
                var input = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                var find = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                var replace = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                return input.replace(new RegExp(find.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), replace.toString());
            };
            var toTitleCase = function toTitleCase() {
                var input = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                return input.toString().replace(/\w\S*/g, (function(text) {
                    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
                }));
            };
            function toPascalCase() {
                var input = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                var string = input.toString();
                string = replaceAll(string, "-", " ");
                string = replaceAll(string, "_", " ");
                string = toTitleCase(string);
                return replaceAll(string, " ", "");
            }
            function toCamelCase() {
                var input = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                var string = input.toString();
                string = toPascalCase(string);
                return string.charAt(0).toLowerCase() + string.slice(1);
            }
            function stripHTML(source) {
                var fragment = document.createDocumentFragment();
                var element = document.createElement("div");
                fragment.appendChild(element);
                element.innerHTML = source;
                return fragment.firstChild.innerText;
            }
            function getHTML(element) {
                var wrapper = document.createElement("div");
                wrapper.appendChild(element);
                return wrapper.innerHTML;
            }
            var resources = {
                pip: "PIP",
                airplay: "AirPlay",
                html5: "HTML5",
                vimeo: "Vimeo",
                youtube: "YouTube"
            };
            var i18n = {
                get: function get() {
                    var key = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    var config = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    if (is$1.empty(key) || is$1.empty(config)) return "";
                    var string = getDeep(config.i18n, key);
                    if (is$1.empty(string)) {
                        if (Object.keys(resources).includes(key)) return resources[key];
                        return "";
                    }
                    var replace = {
                        "{seektime}": config.seekTime,
                        "{title}": config.title
                    };
                    Object.entries(replace).forEach((function(_ref) {
                        var _ref2 = _slicedToArray(_ref, 2), k = _ref2[0], v = _ref2[1];
                        string = replaceAll(string, k, v);
                    }));
                    return string;
                }
            };
            var Storage = function() {
                function Storage(player) {
                    _classCallCheck(this, Storage);
                    this.enabled = player.config.storage.enabled;
                    this.key = player.config.storage.key;
                }
                _createClass(Storage, [ {
                    key: "get",
                    value: function get(key) {
                        if (!Storage.supported || !this.enabled) return null;
                        var store = window.localStorage.getItem(this.key);
                        if (is$1.empty(store)) return null;
                        var json = JSON.parse(store);
                        return is$1.string(key) && key.length ? json[key] : json;
                    }
                }, {
                    key: "set",
                    value: function set(object) {
                        if (!Storage.supported || !this.enabled) return;
                        if (!is$1.object(object)) return;
                        var storage = this.get();
                        if (is$1.empty(storage)) storage = {};
                        extend(storage, object);
                        window.localStorage.setItem(this.key, JSON.stringify(storage));
                    }
                } ], [ {
                    key: "supported",
                    get: function get() {
                        try {
                            if (!("localStorage" in window)) return false;
                            var test = "___test";
                            window.localStorage.setItem(test, test);
                            window.localStorage.removeItem(test);
                            return true;
                        } catch (e) {
                            return false;
                        }
                    }
                } ]);
                return Storage;
            }();
            function fetch(url) {
                var responseType = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text";
                return new Promise((function(resolve, reject) {
                    try {
                        var request = new XMLHttpRequest;
                        if (!("withCredentials" in request)) return;
                        request.addEventListener("load", (function() {
                            if ("text" === responseType) try {
                                resolve(JSON.parse(request.responseText));
                            } catch (e) {
                                resolve(request.responseText);
                            } else resolve(request.response);
                        }));
                        request.addEventListener("error", (function() {
                            throw new Error(request.status);
                        }));
                        request.open("GET", url, true);
                        request.responseType = responseType;
                        request.send();
                    } catch (e) {
                        reject(e);
                    }
                }));
            }
            function loadSprite(url, id) {
                if (!is$1.string(url)) return;
                var prefix = "cache";
                var hasId = is$1.string(id);
                var isCached = false;
                var exists = function exists() {
                    return null !== document.getElementById(id);
                };
                var update = function update(container, data) {
                    container.innerHTML = data;
                    if (hasId && exists()) return;
                    document.body.insertAdjacentElement("afterbegin", container);
                };
                if (!hasId || !exists()) {
                    var useStorage = Storage.supported;
                    var container = document.createElement("div");
                    container.setAttribute("hidden", "");
                    if (hasId) container.setAttribute("id", id);
                    if (useStorage) {
                        var cached = window.localStorage.getItem("".concat(prefix, "-").concat(id));
                        isCached = null !== cached;
                        if (isCached) {
                            var data = JSON.parse(cached);
                            update(container, data.content);
                        }
                    }
                    fetch(url).then((function(result) {
                        if (is$1.empty(result)) return;
                        if (useStorage) window.localStorage.setItem("".concat(prefix, "-").concat(id), JSON.stringify({
                            content: result
                        }));
                        update(container, result);
                    })).catch((function() {}));
                }
            }
            var getHours = function getHours(value) {
                return Math.trunc(value / 60 / 60 % 60, 10);
            };
            var getMinutes = function getMinutes(value) {
                return Math.trunc(value / 60 % 60, 10);
            };
            var getSeconds = function getSeconds(value) {
                return Math.trunc(value % 60, 10);
            };
            function formatTime() {
                var time = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                var displayHours = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
                var inverted = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : false;
                if (!is$1.number(time)) return formatTime(void 0, displayHours, inverted);
                var format = function format(value) {
                    return "0".concat(value).slice(-2);
                };
                var hours = getHours(time);
                var mins = getMinutes(time);
                var secs = getSeconds(time);
                if (displayHours || hours > 0) hours = "".concat(hours, ":"); else hours = "";
                return "".concat(inverted && time > 0 ? "-" : "").concat(hours).concat(format(mins), ":").concat(format(secs));
            }
            var controls = {
                getIconUrl: function getIconUrl() {
                    var url = new URL(this.config.iconUrl, window.location);
                    var cors = url.host !== window.location.host || browser.isIE && !window.svg4everybody;
                    return {
                        url: this.config.iconUrl,
                        cors
                    };
                },
                findElements: function findElements() {
                    try {
                        this.elements.controls = getElement.call(this, this.config.selectors.controls.wrapper);
                        this.elements.buttons = {
                            play: getElements.call(this, this.config.selectors.buttons.play),
                            pause: getElement.call(this, this.config.selectors.buttons.pause),
                            restart: getElement.call(this, this.config.selectors.buttons.restart),
                            rewind: getElement.call(this, this.config.selectors.buttons.rewind),
                            fastForward: getElement.call(this, this.config.selectors.buttons.fastForward),
                            mute: getElement.call(this, this.config.selectors.buttons.mute),
                            pip: getElement.call(this, this.config.selectors.buttons.pip),
                            airplay: getElement.call(this, this.config.selectors.buttons.airplay),
                            settings: getElement.call(this, this.config.selectors.buttons.settings),
                            captions: getElement.call(this, this.config.selectors.buttons.captions),
                            fullscreen: getElement.call(this, this.config.selectors.buttons.fullscreen)
                        };
                        this.elements.progress = getElement.call(this, this.config.selectors.progress);
                        this.elements.inputs = {
                            seek: getElement.call(this, this.config.selectors.inputs.seek),
                            volume: getElement.call(this, this.config.selectors.inputs.volume)
                        };
                        this.elements.display = {
                            buffer: getElement.call(this, this.config.selectors.display.buffer),
                            currentTime: getElement.call(this, this.config.selectors.display.currentTime),
                            duration: getElement.call(this, this.config.selectors.display.duration)
                        };
                        if (is$1.element(this.elements.progress)) this.elements.display.seekTooltip = this.elements.progress.querySelector(".".concat(this.config.classNames.tooltip));
                        return true;
                    } catch (error) {
                        this.debug.warn("It looks like there is a problem with your custom controls HTML", error);
                        this.toggleNativeControls(true);
                        return false;
                    }
                },
                createIcon: function createIcon(type, attributes) {
                    var namespace = "http://www.w3.org/2000/svg";
                    var iconUrl = controls.getIconUrl.call(this);
                    var iconPath = "".concat(!iconUrl.cors ? iconUrl.url : "", "#").concat(this.config.iconPrefix);
                    var icon = document.createElementNS(namespace, "svg");
                    setAttributes(icon, extend(attributes, {
                        "aria-hidden": "true",
                        focusable: "false"
                    }));
                    var use = document.createElementNS(namespace, "use");
                    var path = "".concat(iconPath, "-").concat(type);
                    if ("href" in use) use.setAttributeNS("http://www.w3.org/1999/xlink", "href", path);
                    use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", path);
                    icon.appendChild(use);
                    return icon;
                },
                createLabel: function createLabel(key) {
                    var attr = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    var text = i18n.get(key, this.config);
                    var attributes = _objectSpread2(_objectSpread2({}, attr), {}, {
                        class: [ attr.class, this.config.classNames.hidden ].filter(Boolean).join(" ")
                    });
                    return createElement("span", attributes, text);
                },
                createBadge: function createBadge(text) {
                    if (is$1.empty(text)) return null;
                    var badge = createElement("span", {
                        class: this.config.classNames.menu.value
                    });
                    badge.appendChild(createElement("span", {
                        class: this.config.classNames.menu.badge
                    }, text));
                    return badge;
                },
                createButton: function createButton(buttonType, attr) {
                    var _this = this;
                    var attributes = extend({}, attr);
                    var type = toCamelCase(buttonType);
                    var props = {
                        element: "button",
                        toggle: false,
                        label: null,
                        icon: null,
                        labelPressed: null,
                        iconPressed: null
                    };
                    [ "element", "icon", "label" ].forEach((function(key) {
                        if (Object.keys(attributes).includes(key)) {
                            props[key] = attributes[key];
                            delete attributes[key];
                        }
                    }));
                    if ("button" === props.element && !Object.keys(attributes).includes("type")) attributes.type = "button";
                    if (Object.keys(attributes).includes("class")) {
                        if (!attributes.class.split(" ").some((function(c) {
                            return c === _this.config.classNames.control;
                        }))) extend(attributes, {
                            class: "".concat(attributes.class, " ").concat(this.config.classNames.control)
                        });
                    } else attributes.class = this.config.classNames.control;
                    switch (buttonType) {
                      case "play":
                        props.toggle = true;
                        props.label = "play";
                        props.labelPressed = "pause";
                        props.icon = "play";
                        props.iconPressed = "pause";
                        break;

                      case "mute":
                        props.toggle = true;
                        props.label = "mute";
                        props.labelPressed = "unmute";
                        props.icon = "volume";
                        props.iconPressed = "muted";
                        break;

                      case "captions":
                        props.toggle = true;
                        props.label = "enableCaptions";
                        props.labelPressed = "disableCaptions";
                        props.icon = "captions-off";
                        props.iconPressed = "captions-on";
                        break;

                      case "fullscreen":
                        props.toggle = true;
                        props.label = "enterFullscreen";
                        props.labelPressed = "exitFullscreen";
                        props.icon = "enter-fullscreen";
                        props.iconPressed = "exit-fullscreen";
                        break;

                      case "play-large":
                        attributes.class += " ".concat(this.config.classNames.control, "--overlaid");
                        type = "play";
                        props.label = "play";
                        props.icon = "play";
                        break;

                      default:
                        if (is$1.empty(props.label)) props.label = type;
                        if (is$1.empty(props.icon)) props.icon = buttonType;
                    }
                    var button = createElement(props.element);
                    if (props.toggle) {
                        button.appendChild(controls.createIcon.call(this, props.iconPressed, {
                            class: "icon--pressed"
                        }));
                        button.appendChild(controls.createIcon.call(this, props.icon, {
                            class: "icon--not-pressed"
                        }));
                        button.appendChild(controls.createLabel.call(this, props.labelPressed, {
                            class: "label--pressed"
                        }));
                        button.appendChild(controls.createLabel.call(this, props.label, {
                            class: "label--not-pressed"
                        }));
                    } else {
                        button.appendChild(controls.createIcon.call(this, props.icon));
                        button.appendChild(controls.createLabel.call(this, props.label));
                    }
                    extend(attributes, getAttributesFromSelector(this.config.selectors.buttons[type], attributes));
                    setAttributes(button, attributes);
                    if ("play" === type) {
                        if (!is$1.array(this.elements.buttons[type])) this.elements.buttons[type] = [];
                        this.elements.buttons[type].push(button);
                    } else this.elements.buttons[type] = button;
                    return button;
                },
                createRange: function createRange(type, attributes) {
                    var input = createElement("input", extend(getAttributesFromSelector(this.config.selectors.inputs[type]), {
                        type: "range",
                        min: 0,
                        max: 100,
                        step: .01,
                        value: 0,
                        autocomplete: "off",
                        role: "slider",
                        "aria-label": i18n.get(type, this.config),
                        "aria-valuemin": 0,
                        "aria-valuemax": 100,
                        "aria-valuenow": 0
                    }, attributes));
                    this.elements.inputs[type] = input;
                    controls.updateRangeFill.call(this, input);
                    RangeTouch.setup(input);
                    return input;
                },
                createProgress: function createProgress(type, attributes) {
                    var progress = createElement("progress", extend(getAttributesFromSelector(this.config.selectors.display[type]), {
                        min: 0,
                        max: 100,
                        value: 0,
                        role: "progressbar",
                        "aria-hidden": true
                    }, attributes));
                    if ("volume" !== type) {
                        progress.appendChild(createElement("span", null, "0"));
                        var suffixKey = {
                            played: "played",
                            buffer: "buffered"
                        }[type];
                        var suffix = suffixKey ? i18n.get(suffixKey, this.config) : "";
                        progress.innerText = "% ".concat(suffix.toLowerCase());
                    }
                    this.elements.display[type] = progress;
                    return progress;
                },
                createTime: function createTime(type, attrs) {
                    var attributes = getAttributesFromSelector(this.config.selectors.display[type], attrs);
                    var container = createElement("div", extend(attributes, {
                        class: "".concat(attributes.class ? attributes.class : "", " ").concat(this.config.classNames.display.time, " ").trim(),
                        "aria-label": i18n.get(type, this.config)
                    }), "00:00");
                    this.elements.display[type] = container;
                    return container;
                },
                bindMenuItemShortcuts: function bindMenuItemShortcuts(menuItem, type) {
                    var _this2 = this;
                    on.call(this, menuItem, "keydown keyup", (function(event) {
                        if (![ 32, 38, 39, 40 ].includes(event.which)) return;
                        event.preventDefault();
                        event.stopPropagation();
                        if ("keydown" === event.type) return;
                        var isRadioButton = matches$1(menuItem, '[role="menuitemradio"]');
                        if (!isRadioButton && [ 32, 39 ].includes(event.which)) controls.showMenuPanel.call(_this2, type, true); else {
                            var target;
                            if (32 !== event.which) {
                                if (40 === event.which || isRadioButton && 39 === event.which) {
                                    target = menuItem.nextElementSibling;
                                    if (!is$1.element(target)) target = menuItem.parentNode.firstElementChild;
                                } else {
                                    target = menuItem.previousElementSibling;
                                    if (!is$1.element(target)) target = menuItem.parentNode.lastElementChild;
                                }
                                setFocus.call(_this2, target, true);
                            }
                        }
                    }), false);
                    on.call(this, menuItem, "keyup", (function(event) {
                        if (13 !== event.which) return;
                        controls.focusFirstMenuItem.call(_this2, null, true);
                    }));
                },
                createMenuItem: function createMenuItem(_ref) {
                    var _this3 = this;
                    var value = _ref.value, list = _ref.list, type = _ref.type, title = _ref.title, _ref$badge = _ref.badge, badge = void 0 === _ref$badge ? null : _ref$badge, _ref$checked = _ref.checked, checked = void 0 === _ref$checked ? false : _ref$checked;
                    var attributes = getAttributesFromSelector(this.config.selectors.inputs[type]);
                    var menuItem = createElement("button", extend(attributes, {
                        type: "button",
                        role: "menuitemradio",
                        class: "".concat(this.config.classNames.control, " ").concat(attributes.class ? attributes.class : "").trim(),
                        "aria-checked": checked,
                        value
                    }));
                    var flex = createElement("span");
                    flex.innerHTML = title;
                    if (is$1.element(badge)) flex.appendChild(badge);
                    menuItem.appendChild(flex);
                    Object.defineProperty(menuItem, "checked", {
                        enumerable: true,
                        get: function get() {
                            return "true" === menuItem.getAttribute("aria-checked");
                        },
                        set: function set(check) {
                            if (check) Array.from(menuItem.parentNode.children).filter((function(node) {
                                return matches$1(node, '[role="menuitemradio"]');
                            })).forEach((function(node) {
                                return node.setAttribute("aria-checked", "false");
                            }));
                            menuItem.setAttribute("aria-checked", check ? "true" : "false");
                        }
                    });
                    this.listeners.bind(menuItem, "click keyup", (function(event) {
                        if (is$1.keyboardEvent(event) && 32 !== event.which) return;
                        event.preventDefault();
                        event.stopPropagation();
                        menuItem.checked = true;
                        switch (type) {
                          case "language":
                            _this3.currentTrack = Number(value);
                            break;

                          case "quality":
                            _this3.quality = value;
                            break;

                          case "speed":
                            _this3.speed = parseFloat(value);
                            break;
                        }
                        controls.showMenuPanel.call(_this3, "home", is$1.keyboardEvent(event));
                    }), type, false);
                    controls.bindMenuItemShortcuts.call(this, menuItem, type);
                    list.appendChild(menuItem);
                },
                formatTime: function formatTime$1() {
                    var time = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                    var inverted = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
                    if (!is$1.number(time)) return time;
                    var forceHours = getHours(this.duration) > 0;
                    return formatTime(time, forceHours, inverted);
                },
                updateTimeDisplay: function updateTimeDisplay() {
                    var target = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                    var time = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    var inverted = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : false;
                    if (!is$1.element(target) || !is$1.number(time)) return;
                    target.innerText = controls.formatTime(time, inverted);
                },
                updateVolume: function updateVolume() {
                    if (!this.supported.ui) return;
                    if (is$1.element(this.elements.inputs.volume)) controls.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume);
                    if (is$1.element(this.elements.buttons.mute)) this.elements.buttons.mute.pressed = this.muted || 0 === this.volume;
                },
                setRange: function setRange(target) {
                    var value = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    if (!is$1.element(target)) return;
                    target.value = value;
                    controls.updateRangeFill.call(this, target);
                },
                updateProgress: function updateProgress(event) {
                    var _this4 = this;
                    if (!this.supported.ui || !is$1.event(event)) return;
                    var value = 0;
                    var setProgress = function setProgress(target, input) {
                        var val = is$1.number(input) ? input : 0;
                        var progress = is$1.element(target) ? target : _this4.elements.display.buffer;
                        if (is$1.element(progress)) {
                            progress.value = val;
                            var label = progress.getElementsByTagName("span")[0];
                            if (is$1.element(label)) label.childNodes[0].nodeValue = val;
                        }
                    };
                    if (event) switch (event.type) {
                      case "timeupdate":
                      case "seeking":
                      case "seeked":
                        value = getPercentage(this.currentTime, this.duration);
                        if ("timeupdate" === event.type) controls.setRange.call(this, this.elements.inputs.seek, value);
                        break;

                      case "playing":
                      case "progress":
                        setProgress(this.elements.display.buffer, 100 * this.buffered);
                        break;
                    }
                },
                updateRangeFill: function updateRangeFill(target) {
                    var range = is$1.event(target) ? target.target : target;
                    if (!is$1.element(range) || "range" !== range.getAttribute("type")) return;
                    if (matches$1(range, this.config.selectors.inputs.seek)) {
                        range.setAttribute("aria-valuenow", this.currentTime);
                        var currentTime = controls.formatTime(this.currentTime);
                        var duration = controls.formatTime(this.duration);
                        var format = i18n.get("seekLabel", this.config);
                        range.setAttribute("aria-valuetext", format.replace("{currentTime}", currentTime).replace("{duration}", duration));
                    } else if (matches$1(range, this.config.selectors.inputs.volume)) {
                        var percent = 100 * range.value;
                        range.setAttribute("aria-valuenow", percent);
                        range.setAttribute("aria-valuetext", "".concat(percent.toFixed(1), "%"));
                    } else range.setAttribute("aria-valuenow", range.value);
                    if (!browser.isWebkit) return;
                    range.style.setProperty("--value", "".concat(range.value / range.max * 100, "%"));
                },
                updateSeekTooltip: function updateSeekTooltip(event) {
                    var _this5 = this;
                    if (!this.config.tooltips.seek || !is$1.element(this.elements.inputs.seek) || !is$1.element(this.elements.display.seekTooltip) || 0 === this.duration) return;
                    var visible = "".concat(this.config.classNames.tooltip, "--visible");
                    var toggle = function toggle(show) {
                        return toggleClass(_this5.elements.display.seekTooltip, visible, show);
                    };
                    if (this.touch) {
                        toggle(false);
                        return;
                    }
                    var percent = 0;
                    var clientRect = this.elements.progress.getBoundingClientRect();
                    if (is$1.event(event)) percent = 100 / clientRect.width * (event.pageX - clientRect.left); else if (hasClass(this.elements.display.seekTooltip, visible)) percent = parseFloat(this.elements.display.seekTooltip.style.left, 10); else return;
                    if (percent < 0) percent = 0; else if (percent > 100) percent = 100;
                    controls.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * percent);
                    this.elements.display.seekTooltip.style.left = "".concat(percent, "%");
                    if (is$1.event(event) && [ "mouseenter", "mouseleave" ].includes(event.type)) toggle("mouseenter" === event.type);
                },
                timeUpdate: function timeUpdate(event) {
                    var invert = !is$1.element(this.elements.display.duration) && this.config.invertTime;
                    controls.updateTimeDisplay.call(this, this.elements.display.currentTime, invert ? this.duration - this.currentTime : this.currentTime, invert);
                    if (event && "timeupdate" === event.type && this.media.seeking) return;
                    controls.updateProgress.call(this, event);
                },
                durationUpdate: function durationUpdate() {
                    if (!this.supported.ui || !this.config.invertTime && this.currentTime) return;
                    if (this.duration >= Math.pow(2, 32)) {
                        toggleHidden(this.elements.display.currentTime, true);
                        toggleHidden(this.elements.progress, true);
                        return;
                    }
                    if (is$1.element(this.elements.inputs.seek)) this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
                    var hasDuration = is$1.element(this.elements.display.duration);
                    if (!hasDuration && this.config.displayDuration && this.paused) controls.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration);
                    if (hasDuration) controls.updateTimeDisplay.call(this, this.elements.display.duration, this.duration);
                    controls.updateSeekTooltip.call(this);
                },
                toggleMenuButton: function toggleMenuButton(setting, toggle) {
                    toggleHidden(this.elements.settings.buttons[setting], !toggle);
                },
                updateSetting: function updateSetting(setting, container, input) {
                    var pane = this.elements.settings.panels[setting];
                    var value = null;
                    var list = container;
                    if ("captions" === setting) value = this.currentTrack; else {
                        value = !is$1.empty(input) ? input : this[setting];
                        if (is$1.empty(value)) value = this.config[setting].default;
                        if (!is$1.empty(this.options[setting]) && !this.options[setting].includes(value)) {
                            this.debug.warn("Unsupported value of '".concat(value, "' for ").concat(setting));
                            return;
                        }
                        if (!this.config[setting].options.includes(value)) {
                            this.debug.warn("Disabled value of '".concat(value, "' for ").concat(setting));
                            return;
                        }
                    }
                    if (!is$1.element(list)) list = pane && pane.querySelector('[role="menu"]');
                    if (!is$1.element(list)) return;
                    var label = this.elements.settings.buttons[setting].querySelector(".".concat(this.config.classNames.menu.value));
                    label.innerHTML = controls.getLabel.call(this, setting, value);
                    var target = list && list.querySelector('[value="'.concat(value, '"]'));
                    if (is$1.element(target)) target.checked = true;
                },
                getLabel: function getLabel(setting, value) {
                    switch (setting) {
                      case "speed":
                        return 1 === value ? i18n.get("normal", this.config) : "".concat(value, "&times;");

                      case "quality":
                        if (is$1.number(value)) {
                            var label = i18n.get("qualityLabel.".concat(value), this.config);
                            if (!label.length) return "".concat(value, "p");
                            return label;
                        }
                        return toTitleCase(value);

                      case "captions":
                        return captions.getLabel.call(this);

                      default:
                        return null;
                    }
                },
                setQualityMenu: function setQualityMenu(options) {
                    var _this6 = this;
                    if (!is$1.element(this.elements.settings.panels.quality)) return;
                    var type = "quality";
                    var list = this.elements.settings.panels.quality.querySelector('[role="menu"]');
                    if (is$1.array(options)) this.options.quality = dedupe(options).filter((function(quality) {
                        return _this6.config.quality.options.includes(quality);
                    }));
                    var toggle = !is$1.empty(this.options.quality) && this.options.quality.length > 1;
                    controls.toggleMenuButton.call(this, type, toggle);
                    emptyElement(list);
                    controls.checkMenu.call(this);
                    if (!toggle) return;
                    var getBadge = function getBadge(quality) {
                        var label = i18n.get("qualityBadge.".concat(quality), _this6.config);
                        if (!label.length) return null;
                        return controls.createBadge.call(_this6, label);
                    };
                    this.options.quality.sort((function(a, b) {
                        var sorting = _this6.config.quality.options;
                        return sorting.indexOf(a) > sorting.indexOf(b) ? 1 : -1;
                    })).forEach((function(quality) {
                        controls.createMenuItem.call(_this6, {
                            value: quality,
                            list,
                            type,
                            title: controls.getLabel.call(_this6, "quality", quality),
                            badge: getBadge(quality)
                        });
                    }));
                    controls.updateSetting.call(this, type, list);
                },
                setCaptionsMenu: function setCaptionsMenu() {
                    var _this7 = this;
                    if (!is$1.element(this.elements.settings.panels.captions)) return;
                    var type = "captions";
                    var list = this.elements.settings.panels.captions.querySelector('[role="menu"]');
                    var tracks = captions.getTracks.call(this);
                    var toggle = Boolean(tracks.length);
                    controls.toggleMenuButton.call(this, type, toggle);
                    emptyElement(list);
                    controls.checkMenu.call(this);
                    if (!toggle) return;
                    var options = tracks.map((function(track, value) {
                        return {
                            value,
                            checked: _this7.captions.toggled && _this7.currentTrack === value,
                            title: captions.getLabel.call(_this7, track),
                            badge: track.language && controls.createBadge.call(_this7, track.language.toUpperCase()),
                            list,
                            type: "language"
                        };
                    }));
                    options.unshift({
                        value: -1,
                        checked: !this.captions.toggled,
                        title: i18n.get("disabled", this.config),
                        list,
                        type: "language"
                    });
                    options.forEach(controls.createMenuItem.bind(this));
                    controls.updateSetting.call(this, type, list);
                },
                setSpeedMenu: function setSpeedMenu() {
                    var _this8 = this;
                    if (!is$1.element(this.elements.settings.panels.speed)) return;
                    var type = "speed";
                    var list = this.elements.settings.panels.speed.querySelector('[role="menu"]');
                    this.options.speed = this.options.speed.filter((function(o) {
                        return o >= _this8.minimumSpeed && o <= _this8.maximumSpeed;
                    }));
                    var toggle = !is$1.empty(this.options.speed) && this.options.speed.length > 1;
                    controls.toggleMenuButton.call(this, type, toggle);
                    emptyElement(list);
                    controls.checkMenu.call(this);
                    if (!toggle) return;
                    this.options.speed.forEach((function(speed) {
                        controls.createMenuItem.call(_this8, {
                            value: speed,
                            list,
                            type,
                            title: controls.getLabel.call(_this8, "speed", speed)
                        });
                    }));
                    controls.updateSetting.call(this, type, list);
                },
                checkMenu: function checkMenu() {
                    var buttons = this.elements.settings.buttons;
                    var visible = !is$1.empty(buttons) && Object.values(buttons).some((function(button) {
                        return !button.hidden;
                    }));
                    toggleHidden(this.elements.settings.menu, !visible);
                },
                focusFirstMenuItem: function focusFirstMenuItem(pane) {
                    var tabFocus = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
                    if (this.elements.settings.popup.hidden) return;
                    var target = pane;
                    if (!is$1.element(target)) target = Object.values(this.elements.settings.panels).find((function(p) {
                        return !p.hidden;
                    }));
                    var firstItem = target.querySelector('[role^="menuitem"]');
                    setFocus.call(this, firstItem, tabFocus);
                },
                toggleMenu: function toggleMenu(input) {
                    var popup = this.elements.settings.popup;
                    var button = this.elements.buttons.settings;
                    if (!is$1.element(popup) || !is$1.element(button)) return;
                    var hidden = popup.hidden;
                    var show = hidden;
                    if (is$1.boolean(input)) show = input; else if (is$1.keyboardEvent(input) && 27 === input.which) show = false; else if (is$1.event(input)) {
                        var target = is$1.function(input.composedPath) ? input.composedPath()[0] : input.target;
                        var isMenuItem = popup.contains(target);
                        if (isMenuItem || !isMenuItem && input.target !== button && show) return;
                    }
                    button.setAttribute("aria-expanded", show);
                    toggleHidden(popup, !show);
                    toggleClass(this.elements.container, this.config.classNames.menu.open, show);
                    if (show && is$1.keyboardEvent(input)) controls.focusFirstMenuItem.call(this, null, true); else if (!show && !hidden) setFocus.call(this, button, is$1.keyboardEvent(input));
                },
                getMenuSize: function getMenuSize(tab) {
                    var clone = tab.cloneNode(true);
                    clone.style.position = "absolute";
                    clone.style.opacity = 0;
                    clone.removeAttribute("hidden");
                    tab.parentNode.appendChild(clone);
                    var width = clone.scrollWidth;
                    var height = clone.scrollHeight;
                    removeElement(clone);
                    return {
                        width,
                        height
                    };
                },
                showMenuPanel: function showMenuPanel() {
                    var _this9 = this;
                    var type = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                    var tabFocus = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
                    var target = this.elements.container.querySelector("#plyr-settings-".concat(this.id, "-").concat(type));
                    if (!is$1.element(target)) return;
                    var container = target.parentNode;
                    var current = Array.from(container.children).find((function(node) {
                        return !node.hidden;
                    }));
                    if (support.transitions && !support.reducedMotion) {
                        container.style.width = "".concat(current.scrollWidth, "px");
                        container.style.height = "".concat(current.scrollHeight, "px");
                        var size = controls.getMenuSize.call(this, target);
                        var restore = function restore(event) {
                            if (event.target !== container || ![ "width", "height" ].includes(event.propertyName)) return;
                            container.style.width = "";
                            container.style.height = "";
                            off.call(_this9, container, transitionEndEvent, restore);
                        };
                        on.call(this, container, transitionEndEvent, restore);
                        container.style.width = "".concat(size.width, "px");
                        container.style.height = "".concat(size.height, "px");
                    }
                    toggleHidden(current, true);
                    toggleHidden(target, false);
                    controls.focusFirstMenuItem.call(this, target, tabFocus);
                },
                setDownloadUrl: function setDownloadUrl() {
                    var button = this.elements.buttons.download;
                    if (!is$1.element(button)) return;
                    button.setAttribute("href", this.download);
                },
                create: function create(data) {
                    var _this10 = this;
                    var bindMenuItemShortcuts = controls.bindMenuItemShortcuts, createButton = controls.createButton, createProgress = controls.createProgress, createRange = controls.createRange, createTime = controls.createTime, setQualityMenu = controls.setQualityMenu, setSpeedMenu = controls.setSpeedMenu, showMenuPanel = controls.showMenuPanel;
                    this.elements.controls = null;
                    if (is$1.array(this.config.controls) && this.config.controls.includes("play-large")) this.elements.container.appendChild(createButton.call(this, "play-large"));
                    var container = createElement("div", getAttributesFromSelector(this.config.selectors.controls.wrapper));
                    this.elements.controls = container;
                    var defaultAttributes = {
                        class: "plyr__controls__item"
                    };
                    dedupe(is$1.array(this.config.controls) ? this.config.controls : []).forEach((function(control) {
                        if ("restart" === control) container.appendChild(createButton.call(_this10, "restart", defaultAttributes));
                        if ("rewind" === control) container.appendChild(createButton.call(_this10, "rewind", defaultAttributes));
                        if ("play" === control) container.appendChild(createButton.call(_this10, "play", defaultAttributes));
                        if ("fast-forward" === control) container.appendChild(createButton.call(_this10, "fast-forward", defaultAttributes));
                        if ("progress" === control) {
                            var progressContainer = createElement("div", {
                                class: "".concat(defaultAttributes.class, " plyr__progress__container")
                            });
                            var progress = createElement("div", getAttributesFromSelector(_this10.config.selectors.progress));
                            progress.appendChild(createRange.call(_this10, "seek", {
                                id: "plyr-seek-".concat(data.id)
                            }));
                            progress.appendChild(createProgress.call(_this10, "buffer"));
                            if (_this10.config.tooltips.seek) {
                                var tooltip = createElement("span", {
                                    class: _this10.config.classNames.tooltip
                                }, "00:00");
                                progress.appendChild(tooltip);
                                _this10.elements.display.seekTooltip = tooltip;
                            }
                            _this10.elements.progress = progress;
                            progressContainer.appendChild(_this10.elements.progress);
                            container.appendChild(progressContainer);
                        }
                        if ("current-time" === control) container.appendChild(createTime.call(_this10, "currentTime", defaultAttributes));
                        if ("duration" === control) container.appendChild(createTime.call(_this10, "duration", defaultAttributes));
                        if ("mute" === control || "volume" === control) {
                            var volume = _this10.elements.volume;
                            if (!is$1.element(volume) || !container.contains(volume)) {
                                volume = createElement("div", extend({}, defaultAttributes, {
                                    class: "".concat(defaultAttributes.class, " plyr__volume").trim()
                                }));
                                _this10.elements.volume = volume;
                                container.appendChild(volume);
                            }
                            if ("mute" === control) volume.appendChild(createButton.call(_this10, "mute"));
                            if ("volume" === control && !browser.isIos) {
                                var attributes = {
                                    max: 1,
                                    step: .05,
                                    value: _this10.config.volume
                                };
                                volume.appendChild(createRange.call(_this10, "volume", extend(attributes, {
                                    id: "plyr-volume-".concat(data.id)
                                })));
                            }
                        }
                        if ("captions" === control) container.appendChild(createButton.call(_this10, "captions", defaultAttributes));
                        if ("settings" === control && !is$1.empty(_this10.config.settings)) {
                            var wrapper = createElement("div", extend({}, defaultAttributes, {
                                class: "".concat(defaultAttributes.class, " plyr__menu").trim(),
                                hidden: ""
                            }));
                            wrapper.appendChild(createButton.call(_this10, "settings", {
                                "aria-haspopup": true,
                                "aria-controls": "plyr-settings-".concat(data.id),
                                "aria-expanded": false
                            }));
                            var popup = createElement("div", {
                                class: "plyr__menu__container",
                                id: "plyr-settings-".concat(data.id),
                                hidden: ""
                            });
                            var inner = createElement("div");
                            var home = createElement("div", {
                                id: "plyr-settings-".concat(data.id, "-home")
                            });
                            var menu = createElement("div", {
                                role: "menu"
                            });
                            home.appendChild(menu);
                            inner.appendChild(home);
                            _this10.elements.settings.panels.home = home;
                            _this10.config.settings.forEach((function(type) {
                                var menuItem = createElement("button", extend(getAttributesFromSelector(_this10.config.selectors.buttons.settings), {
                                    type: "button",
                                    class: "".concat(_this10.config.classNames.control, " ").concat(_this10.config.classNames.control, "--forward"),
                                    role: "menuitem",
                                    "aria-haspopup": true,
                                    hidden: ""
                                }));
                                bindMenuItemShortcuts.call(_this10, menuItem, type);
                                on.call(_this10, menuItem, "click", (function() {
                                    showMenuPanel.call(_this10, type, false);
                                }));
                                var flex = createElement("span", null, i18n.get(type, _this10.config));
                                var value = createElement("span", {
                                    class: _this10.config.classNames.menu.value
                                });
                                value.innerHTML = data[type];
                                flex.appendChild(value);
                                menuItem.appendChild(flex);
                                menu.appendChild(menuItem);
                                var pane = createElement("div", {
                                    id: "plyr-settings-".concat(data.id, "-").concat(type),
                                    hidden: ""
                                });
                                var backButton = createElement("button", {
                                    type: "button",
                                    class: "".concat(_this10.config.classNames.control, " ").concat(_this10.config.classNames.control, "--back")
                                });
                                backButton.appendChild(createElement("span", {
                                    "aria-hidden": true
                                }, i18n.get(type, _this10.config)));
                                backButton.appendChild(createElement("span", {
                                    class: _this10.config.classNames.hidden
                                }, i18n.get("menuBack", _this10.config)));
                                on.call(_this10, pane, "keydown", (function(event) {
                                    if (37 !== event.which) return;
                                    event.preventDefault();
                                    event.stopPropagation();
                                    showMenuPanel.call(_this10, "home", true);
                                }), false);
                                on.call(_this10, backButton, "click", (function() {
                                    showMenuPanel.call(_this10, "home", false);
                                }));
                                pane.appendChild(backButton);
                                pane.appendChild(createElement("div", {
                                    role: "menu"
                                }));
                                inner.appendChild(pane);
                                _this10.elements.settings.buttons[type] = menuItem;
                                _this10.elements.settings.panels[type] = pane;
                            }));
                            popup.appendChild(inner);
                            wrapper.appendChild(popup);
                            container.appendChild(wrapper);
                            _this10.elements.settings.popup = popup;
                            _this10.elements.settings.menu = wrapper;
                        }
                        if ("pip" === control && support.pip) container.appendChild(createButton.call(_this10, "pip", defaultAttributes));
                        if ("airplay" === control && support.airplay) container.appendChild(createButton.call(_this10, "airplay", defaultAttributes));
                        if ("download" === control) {
                            var _attributes = extend({}, defaultAttributes, {
                                element: "a",
                                href: _this10.download,
                                target: "_blank"
                            });
                            if (_this10.isHTML5) _attributes.download = "";
                            var download = _this10.config.urls.download;
                            if (!is$1.url(download) && _this10.isEmbed) extend(_attributes, {
                                icon: "logo-".concat(_this10.provider),
                                label: _this10.provider
                            });
                            container.appendChild(createButton.call(_this10, "download", _attributes));
                        }
                        if ("fullscreen" === control) container.appendChild(createButton.call(_this10, "fullscreen", defaultAttributes));
                    }));
                    if (this.isHTML5) setQualityMenu.call(this, html5.getQualityOptions.call(this));
                    setSpeedMenu.call(this);
                    return container;
                },
                inject: function inject() {
                    var _this11 = this;
                    if (this.config.loadSprite) {
                        var icon = controls.getIconUrl.call(this);
                        if (icon.cors) loadSprite(icon.url, "sprite-plyr");
                    }
                    this.id = Math.floor(1e4 * Math.random());
                    var container = null;
                    this.elements.controls = null;
                    var props = {
                        id: this.id,
                        seektime: this.config.seekTime,
                        title: this.config.title
                    };
                    var update = true;
                    if (is$1.function(this.config.controls)) this.config.controls = this.config.controls.call(this, props);
                    if (!this.config.controls) this.config.controls = [];
                    if (is$1.element(this.config.controls) || is$1.string(this.config.controls)) container = this.config.controls; else {
                        container = controls.create.call(this, {
                            id: this.id,
                            seektime: this.config.seekTime,
                            speed: this.speed,
                            quality: this.quality,
                            captions: captions.getLabel.call(this)
                        });
                        update = false;
                    }
                    var replace = function replace(input) {
                        var result = input;
                        Object.entries(props).forEach((function(_ref2) {
                            var _ref3 = _slicedToArray(_ref2, 2), key = _ref3[0], value = _ref3[1];
                            result = replaceAll(result, "{".concat(key, "}"), value);
                        }));
                        return result;
                    };
                    if (update) if (is$1.string(this.config.controls)) container = replace(container);
                    var target;
                    if (is$1.string(this.config.selectors.controls.container)) target = document.querySelector(this.config.selectors.controls.container);
                    if (!is$1.element(target)) target = this.elements.container;
                    var insertMethod = is$1.element(container) ? "insertAdjacentElement" : "insertAdjacentHTML";
                    target[insertMethod]("afterbegin", container);
                    if (!is$1.element(this.elements.controls)) controls.findElements.call(this);
                    if (!is$1.empty(this.elements.buttons)) {
                        var addProperty = function addProperty(button) {
                            var className = _this11.config.classNames.controlPressed;
                            Object.defineProperty(button, "pressed", {
                                enumerable: true,
                                get: function get() {
                                    return hasClass(button, className);
                                },
                                set: function set() {
                                    var pressed = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
                                    toggleClass(button, className, pressed);
                                }
                            });
                        };
                        Object.values(this.elements.buttons).filter(Boolean).forEach((function(button) {
                            if (is$1.array(button) || is$1.nodeList(button)) Array.from(button).filter(Boolean).forEach(addProperty); else addProperty(button);
                        }));
                    }
                    if (browser.isEdge) repaint(target);
                    if (this.config.tooltips.controls) {
                        var _this$config = this.config, classNames = _this$config.classNames, selectors = _this$config.selectors;
                        var selector = "".concat(selectors.controls.wrapper, " ").concat(selectors.labels, " .").concat(classNames.hidden);
                        var labels = getElements.call(this, selector);
                        Array.from(labels).forEach((function(label) {
                            toggleClass(label, _this11.config.classNames.hidden, false);
                            toggleClass(label, _this11.config.classNames.tooltip, true);
                        }));
                    }
                }
            };
            function parseUrl(input) {
                var safe = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : true;
                var url = input;
                if (safe) {
                    var parser = document.createElement("a");
                    parser.href = url;
                    url = parser.href;
                }
                try {
                    return new URL(url);
                } catch (e) {
                    return null;
                }
            }
            function buildUrlParams(input) {
                var params = new URLSearchParams;
                if (is$1.object(input)) Object.entries(input).forEach((function(_ref) {
                    var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
                    params.set(key, value);
                }));
                return params;
            }
            var captions = {
                setup: function setup() {
                    if (!this.supported.ui) return;
                    if (!this.isVideo || this.isYouTube || this.isHTML5 && !support.textTracks) {
                        if (is$1.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions")) controls.setCaptionsMenu.call(this);
                        return;
                    }
                    if (!is$1.element(this.elements.captions)) {
                        this.elements.captions = createElement("div", getAttributesFromSelector(this.config.selectors.captions));
                        insertAfter(this.elements.captions, this.elements.wrapper);
                    }
                    if (browser.isIE && window.URL) {
                        var elements = this.media.querySelectorAll("track");
                        Array.from(elements).forEach((function(track) {
                            var src = track.getAttribute("src");
                            var url = parseUrl(src);
                            if (null !== url && url.hostname !== window.location.href.hostname && [ "http:", "https:" ].includes(url.protocol)) fetch(src, "blob").then((function(blob) {
                                track.setAttribute("src", window.URL.createObjectURL(blob));
                            })).catch((function() {
                                removeElement(track);
                            }));
                        }));
                    }
                    var browserLanguages = navigator.languages || [ navigator.language || navigator.userLanguage || "en" ];
                    var languages = dedupe(browserLanguages.map((function(language) {
                        return language.split("-")[0];
                    })));
                    var language = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
                    if ("auto" === language) {
                        var _languages = _slicedToArray(languages, 1);
                        language = _languages[0];
                    }
                    var active = this.storage.get("captions");
                    if (!is$1.boolean(active)) active = this.config.captions.active;
                    Object.assign(this.captions, {
                        toggled: false,
                        active,
                        language,
                        languages
                    });
                    if (this.isHTML5) {
                        var trackEvents = this.config.captions.update ? "addtrack removetrack" : "removetrack";
                        on.call(this, this.media.textTracks, trackEvents, captions.update.bind(this));
                    }
                    setTimeout(captions.update.bind(this), 0);
                },
                update: function update() {
                    var _this = this;
                    var tracks = captions.getTracks.call(this, true);
                    var _this$captions = this.captions, active = _this$captions.active, language = _this$captions.language, meta = _this$captions.meta, currentTrackNode = _this$captions.currentTrackNode;
                    var languageExists = Boolean(tracks.find((function(track) {
                        return track.language === language;
                    })));
                    if (this.isHTML5 && this.isVideo) tracks.filter((function(track) {
                        return !meta.get(track);
                    })).forEach((function(track) {
                        _this.debug.log("Track added", track);
                        meta.set(track, {
                            default: "showing" === track.mode
                        });
                        if ("showing" === track.mode) track.mode = "hidden";
                        on.call(_this, track, "cuechange", (function() {
                            return captions.updateCues.call(_this);
                        }));
                    }));
                    if (languageExists && this.language !== language || !tracks.includes(currentTrackNode)) {
                        captions.setLanguage.call(this, language);
                        captions.toggle.call(this, active && languageExists);
                    }
                    toggleClass(this.elements.container, this.config.classNames.captions.enabled, !is$1.empty(tracks));
                    if (is$1.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions")) controls.setCaptionsMenu.call(this);
                },
                toggle: function toggle(input) {
                    var _this2 = this;
                    var passive = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : true;
                    if (!this.supported.ui) return;
                    var toggled = this.captions.toggled;
                    var activeClass = this.config.classNames.captions.active;
                    var active = is$1.nullOrUndefined(input) ? !toggled : input;
                    if (active !== toggled) {
                        if (!passive) {
                            this.captions.active = active;
                            this.storage.set({
                                captions: active
                            });
                        }
                        if (!this.language && active && !passive) {
                            var tracks = captions.getTracks.call(this);
                            var track = captions.findTrack.call(this, [ this.captions.language ].concat(_toConsumableArray(this.captions.languages)), true);
                            this.captions.language = track.language;
                            captions.set.call(this, tracks.indexOf(track));
                            return;
                        }
                        if (this.elements.buttons.captions) this.elements.buttons.captions.pressed = active;
                        toggleClass(this.elements.container, activeClass, active);
                        this.captions.toggled = active;
                        controls.updateSetting.call(this, "captions");
                        triggerEvent.call(this, this.media, active ? "captionsenabled" : "captionsdisabled");
                    }
                    setTimeout((function() {
                        if (active && _this2.captions.toggled) _this2.captions.currentTrackNode.mode = "hidden";
                    }));
                },
                set: function set(index) {
                    var passive = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : true;
                    var tracks = captions.getTracks.call(this);
                    if (-1 === index) {
                        captions.toggle.call(this, false, passive);
                        return;
                    }
                    if (!is$1.number(index)) {
                        this.debug.warn("Invalid caption argument", index);
                        return;
                    }
                    if (!(index in tracks)) {
                        this.debug.warn("Track not found", index);
                        return;
                    }
                    if (this.captions.currentTrack !== index) {
                        this.captions.currentTrack = index;
                        var track = tracks[index];
                        var _ref = track || {}, language = _ref.language;
                        this.captions.currentTrackNode = track;
                        controls.updateSetting.call(this, "captions");
                        if (!passive) {
                            this.captions.language = language;
                            this.storage.set({
                                language
                            });
                        }
                        if (this.isVimeo) this.embed.enableTextTrack(language);
                        triggerEvent.call(this, this.media, "languagechange");
                    }
                    captions.toggle.call(this, true, passive);
                    if (this.isHTML5 && this.isVideo) captions.updateCues.call(this);
                },
                setLanguage: function setLanguage(input) {
                    var passive = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : true;
                    if (!is$1.string(input)) {
                        this.debug.warn("Invalid language argument", input);
                        return;
                    }
                    var language = input.toLowerCase();
                    this.captions.language = language;
                    var tracks = captions.getTracks.call(this);
                    var track = captions.findTrack.call(this, [ language ]);
                    captions.set.call(this, tracks.indexOf(track), passive);
                },
                getTracks: function getTracks() {
                    var _this3 = this;
                    var update = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
                    var tracks = Array.from((this.media || {}).textTracks || []);
                    return tracks.filter((function(track) {
                        return !_this3.isHTML5 || update || _this3.captions.meta.has(track);
                    })).filter((function(track) {
                        return [ "captions", "subtitles" ].includes(track.kind);
                    }));
                },
                findTrack: function findTrack(languages) {
                    var _this4 = this;
                    var force = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
                    var tracks = captions.getTracks.call(this);
                    var sortIsDefault = function sortIsDefault(track) {
                        return Number((_this4.captions.meta.get(track) || {}).default);
                    };
                    var sorted = Array.from(tracks).sort((function(a, b) {
                        return sortIsDefault(b) - sortIsDefault(a);
                    }));
                    var track;
                    languages.every((function(language) {
                        track = sorted.find((function(t) {
                            return t.language === language;
                        }));
                        return !track;
                    }));
                    return track || (force ? sorted[0] : void 0);
                },
                getCurrentTrack: function getCurrentTrack() {
                    return captions.getTracks.call(this)[this.currentTrack];
                },
                getLabel: function getLabel(track) {
                    var currentTrack = track;
                    if (!is$1.track(currentTrack) && support.textTracks && this.captions.toggled) currentTrack = captions.getCurrentTrack.call(this);
                    if (is$1.track(currentTrack)) {
                        if (!is$1.empty(currentTrack.label)) return currentTrack.label;
                        if (!is$1.empty(currentTrack.language)) return track.language.toUpperCase();
                        return i18n.get("enabled", this.config);
                    }
                    return i18n.get("disabled", this.config);
                },
                updateCues: function updateCues(input) {
                    if (!this.supported.ui) return;
                    if (!is$1.element(this.elements.captions)) {
                        this.debug.warn("No captions element to render to");
                        return;
                    }
                    if (!is$1.nullOrUndefined(input) && !Array.isArray(input)) {
                        this.debug.warn("updateCues: Invalid input", input);
                        return;
                    }
                    var cues = input;
                    if (!cues) {
                        var track = captions.getCurrentTrack.call(this);
                        cues = Array.from((track || {}).activeCues || []).map((function(cue) {
                            return cue.getCueAsHTML();
                        })).map(getHTML);
                    }
                    var content = cues.map((function(cueText) {
                        return cueText.trim();
                    })).join("\n");
                    var changed = content !== this.elements.captions.innerHTML;
                    if (changed) {
                        emptyElement(this.elements.captions);
                        var caption = createElement("span", getAttributesFromSelector(this.config.selectors.caption));
                        caption.innerHTML = content;
                        this.elements.captions.appendChild(caption);
                        triggerEvent.call(this, this.media, "cuechange");
                    }
                }
            };
            var defaults$1 = {
                enabled: true,
                title: "",
                debug: false,
                autoplay: false,
                autopause: true,
                playsinline: true,
                seekTime: 10,
                volume: 1,
                muted: false,
                duration: null,
                displayDuration: true,
                invertTime: true,
                toggleInvert: true,
                ratio: null,
                clickToPlay: true,
                hideControls: true,
                resetOnEnd: false,
                disableContextMenu: true,
                loadSprite: true,
                iconPrefix: "plyr",
                iconUrl: "https://cdn.plyr.io/3.6.3/plyr.svg",
                blankVideo: "https://cdn.plyr.io/static/blank.mp4",
                quality: {
                    default: 576,
                    options: [ 4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240 ],
                    forced: false,
                    onChange: null
                },
                loop: {
                    active: false
                },
                speed: {
                    selected: 1,
                    options: [ .5, .75, 1, 1.25, 1.5, 1.75, 2, 4 ]
                },
                keyboard: {
                    focused: true,
                    global: false
                },
                tooltips: {
                    controls: false,
                    seek: true
                },
                captions: {
                    active: false,
                    language: "auto",
                    update: false
                },
                fullscreen: {
                    enabled: true,
                    fallback: true,
                    iosNative: false
                },
                storage: {
                    enabled: true,
                    key: "plyr"
                },
                controls: [ "play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen" ],
                settings: [ "captions", "quality", "speed" ],
                i18n: {
                    restart: "Restart",
                    rewind: "Rewind {seektime}s",
                    play: "Play",
                    pause: "Pause",
                    fastForward: "Forward {seektime}s",
                    seek: "Seek",
                    seekLabel: "{currentTime} of {duration}",
                    played: "Played",
                    buffered: "Buffered",
                    currentTime: "Current time",
                    duration: "Duration",
                    volume: "Volume",
                    mute: "Mute",
                    unmute: "Unmute",
                    enableCaptions: "Enable captions",
                    disableCaptions: "Disable captions",
                    download: "Download",
                    enterFullscreen: "Enter fullscreen",
                    exitFullscreen: "Exit fullscreen",
                    frameTitle: "Player for {title}",
                    captions: "Captions",
                    settings: "Settings",
                    pip: "PIP",
                    menuBack: "Go back to previous menu",
                    speed: "Speed",
                    normal: "Normal",
                    quality: "Quality",
                    loop: "Loop",
                    start: "Start",
                    end: "End",
                    all: "All",
                    reset: "Reset",
                    disabled: "Disabled",
                    enabled: "Enabled",
                    advertisement: "Ad",
                    qualityBadge: {
                        2160: "4K",
                        1440: "HD",
                        1080: "HD",
                        720: "HD",
                        576: "SD",
                        480: "SD"
                    }
                },
                urls: {
                    download: null,
                    vimeo: {
                        sdk: "https://player.vimeo.com/api/player.js",
                        iframe: "https://player.vimeo.com/video/{0}?{1}",
                        api: "https://vimeo.com/api/oembed.json?url={0}"
                    },
                    youtube: {
                        sdk: "https://www.youtube.com/iframe_api",
                        api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"
                    },
                    googleIMA: {
                        sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
                    }
                },
                listeners: {
                    seek: null,
                    play: null,
                    pause: null,
                    restart: null,
                    rewind: null,
                    fastForward: null,
                    mute: null,
                    volume: null,
                    captions: null,
                    download: null,
                    fullscreen: null,
                    pip: null,
                    airplay: null,
                    speed: null,
                    quality: null,
                    loop: null,
                    language: null
                },
                events: [ "ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick" ],
                selectors: {
                    editable: "input, textarea, select, [contenteditable]",
                    container: ".plyr",
                    controls: {
                        container: null,
                        wrapper: ".plyr__controls"
                    },
                    labels: "[data-plyr]",
                    buttons: {
                        play: '[data-plyr="play"]',
                        pause: '[data-plyr="pause"]',
                        restart: '[data-plyr="restart"]',
                        rewind: '[data-plyr="rewind"]',
                        fastForward: '[data-plyr="fast-forward"]',
                        mute: '[data-plyr="mute"]',
                        captions: '[data-plyr="captions"]',
                        download: '[data-plyr="download"]',
                        fullscreen: '[data-plyr="fullscreen"]',
                        pip: '[data-plyr="pip"]',
                        airplay: '[data-plyr="airplay"]',
                        settings: '[data-plyr="settings"]',
                        loop: '[data-plyr="loop"]'
                    },
                    inputs: {
                        seek: '[data-plyr="seek"]',
                        volume: '[data-plyr="volume"]',
                        speed: '[data-plyr="speed"]',
                        language: '[data-plyr="language"]',
                        quality: '[data-plyr="quality"]'
                    },
                    display: {
                        currentTime: ".plyr__time--current",
                        duration: ".plyr__time--duration",
                        buffer: ".plyr__progress__buffer",
                        loop: ".plyr__progress__loop",
                        volume: ".plyr__volume--display"
                    },
                    progress: ".plyr__progress",
                    captions: ".plyr__captions",
                    caption: ".plyr__caption"
                },
                classNames: {
                    type: "plyr--{0}",
                    provider: "plyr--{0}",
                    video: "plyr__video-wrapper",
                    embed: "plyr__video-embed",
                    videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
                    embedContainer: "plyr__video-embed__container",
                    poster: "plyr__poster",
                    posterEnabled: "plyr__poster-enabled",
                    ads: "plyr__ads",
                    control: "plyr__control",
                    controlPressed: "plyr__control--pressed",
                    playing: "plyr--playing",
                    paused: "plyr--paused",
                    stopped: "plyr--stopped",
                    loading: "plyr--loading",
                    hover: "plyr--hover",
                    tooltip: "plyr__tooltip",
                    cues: "plyr__cues",
                    hidden: "plyr__sr-only",
                    hideControls: "plyr--hide-controls",
                    isIos: "plyr--is-ios",
                    isTouch: "plyr--is-touch",
                    uiSupported: "plyr--full-ui",
                    noTransition: "plyr--no-transition",
                    display: {
                        time: "plyr__time"
                    },
                    menu: {
                        value: "plyr__menu__value",
                        badge: "plyr__badge",
                        open: "plyr--menu-open"
                    },
                    captions: {
                        enabled: "plyr--captions-enabled",
                        active: "plyr--captions-active"
                    },
                    fullscreen: {
                        enabled: "plyr--fullscreen-enabled",
                        fallback: "plyr--fullscreen-fallback"
                    },
                    pip: {
                        supported: "plyr--pip-supported",
                        active: "plyr--pip-active"
                    },
                    airplay: {
                        supported: "plyr--airplay-supported",
                        active: "plyr--airplay-active"
                    },
                    tabFocus: "plyr__tab-focus",
                    previewThumbnails: {
                        thumbContainer: "plyr__preview-thumb",
                        thumbContainerShown: "plyr__preview-thumb--is-shown",
                        imageContainer: "plyr__preview-thumb__image-container",
                        timeContainer: "plyr__preview-thumb__time-container",
                        scrubbingContainer: "plyr__preview-scrubbing",
                        scrubbingContainerShown: "plyr__preview-scrubbing--is-shown"
                    }
                },
                attributes: {
                    embed: {
                        provider: "data-plyr-provider",
                        id: "data-plyr-embed-id"
                    }
                },
                ads: {
                    enabled: false,
                    publisherId: "",
                    tagUrl: ""
                },
                previewThumbnails: {
                    enabled: false,
                    src: ""
                },
                vimeo: {
                    byline: false,
                    portrait: false,
                    title: false,
                    speed: true,
                    transparent: false,
                    customControls: true,
                    referrerPolicy: null,
                    premium: false
                },
                youtube: {
                    rel: 0,
                    showinfo: 0,
                    iv_load_policy: 3,
                    modestbranding: 1,
                    customControls: true,
                    noCookie: false
                }
            };
            var pip = {
                active: "picture-in-picture",
                inactive: "inline"
            };
            var providers = {
                html5: "html5",
                youtube: "youtube",
                vimeo: "vimeo"
            };
            var types = {
                audio: "audio",
                video: "video"
            };
            function getProviderByUrl(url) {
                if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(url)) return providers.youtube;
                if (/^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(url)) return providers.vimeo;
                return null;
            }
            var noop = function noop() {};
            var Console = function() {
                function Console() {
                    var enabled = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
                    _classCallCheck(this, Console);
                    this.enabled = window.console && enabled;
                    if (this.enabled) this.log("Debugging enabled");
                }
                _createClass(Console, [ {
                    key: "log",
                    get: function get() {
                        return this.enabled ? Function.prototype.bind.call(console.log, console) : noop;
                    }
                }, {
                    key: "warn",
                    get: function get() {
                        return this.enabled ? Function.prototype.bind.call(console.warn, console) : noop;
                    }
                }, {
                    key: "error",
                    get: function get() {
                        return this.enabled ? Function.prototype.bind.call(console.error, console) : noop;
                    }
                } ]);
                return Console;
            }();
            var Fullscreen = function() {
                function Fullscreen(player) {
                    var _this = this;
                    _classCallCheck(this, Fullscreen);
                    this.player = player;
                    this.prefix = Fullscreen.prefix;
                    this.property = Fullscreen.property;
                    this.scrollPosition = {
                        x: 0,
                        y: 0
                    };
                    this.forceFallback = "force" === player.config.fullscreen.fallback;
                    this.player.elements.fullscreen = player.config.fullscreen.container && closest(this.player.elements.container, player.config.fullscreen.container);
                    on.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : "".concat(this.prefix, "fullscreenchange"), (function() {
                        _this.onChange();
                    }));
                    on.call(this.player, this.player.elements.container, "dblclick", (function(event) {
                        if (is$1.element(_this.player.elements.controls) && _this.player.elements.controls.contains(event.target)) return;
                        _this.player.listeners.proxy(event, _this.toggle, "fullscreen");
                    }));
                    on.call(this, this.player.elements.container, "keydown", (function(event) {
                        return _this.trapFocus(event);
                    }));
                    this.update();
                }
                _createClass(Fullscreen, [ {
                    key: "onChange",
                    value: function onChange() {
                        if (!this.enabled) return;
                        var button = this.player.elements.buttons.fullscreen;
                        if (is$1.element(button)) button.pressed = this.active;
                        var target = this.target === this.player.media ? this.target : this.player.elements.container;
                        triggerEvent.call(this.player, target, this.active ? "enterfullscreen" : "exitfullscreen", true);
                    }
                }, {
                    key: "toggleFallback",
                    value: function toggleFallback() {
                        var toggle = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
                        if (toggle) this.scrollPosition = {
                            x: window.scrollX || 0,
                            y: window.scrollY || 0
                        }; else window.scrollTo(this.scrollPosition.x, this.scrollPosition.y);
                        document.body.style.overflow = toggle ? "hidden" : "";
                        toggleClass(this.target, this.player.config.classNames.fullscreen.fallback, toggle);
                        if (browser.isIos) {
                            var viewport = document.head.querySelector('meta[name="viewport"]');
                            var property = "viewport-fit=cover";
                            if (!viewport) {
                                viewport = document.createElement("meta");
                                viewport.setAttribute("name", "viewport");
                            }
                            var hasProperty = is$1.string(viewport.content) && viewport.content.includes(property);
                            if (toggle) {
                                this.cleanupViewport = !hasProperty;
                                if (!hasProperty) viewport.content += ",".concat(property);
                            } else if (this.cleanupViewport) viewport.content = viewport.content.split(",").filter((function(part) {
                                return part.trim() !== property;
                            })).join(",");
                        }
                        this.onChange();
                    }
                }, {
                    key: "trapFocus",
                    value: function trapFocus(event) {
                        if (browser.isIos || !this.active || "Tab" !== event.key || 9 !== event.keyCode) return;
                        var focused = document.activeElement;
                        var focusable = getElements.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]");
                        var _focusable = _slicedToArray(focusable, 1), first = _focusable[0];
                        var last = focusable[focusable.length - 1];
                        if (focused === last && !event.shiftKey) {
                            first.focus();
                            event.preventDefault();
                        } else if (focused === first && event.shiftKey) {
                            last.focus();
                            event.preventDefault();
                        }
                    }
                }, {
                    key: "update",
                    value: function update() {
                        if (this.enabled) {
                            var mode;
                            if (this.forceFallback) mode = "Fallback (forced)"; else if (Fullscreen.native) mode = "Native"; else mode = "Fallback";
                            this.player.debug.log("".concat(mode, " fullscreen enabled"));
                        } else this.player.debug.log("Fullscreen not supported and fallback disabled");
                        toggleClass(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled);
                    }
                }, {
                    key: "enter",
                    value: function enter() {
                        if (!this.enabled) return;
                        if (browser.isIos && this.player.config.fullscreen.iosNative) this.target.webkitEnterFullscreen(); else if (!Fullscreen.native || this.forceFallback) this.toggleFallback(true); else if (!this.prefix) this.target.requestFullscreen({
                            navigationUI: "hide"
                        }); else if (!is$1.empty(this.prefix)) this.target["".concat(this.prefix, "Request").concat(this.property)]();
                    }
                }, {
                    key: "exit",
                    value: function exit() {
                        if (!this.enabled) return;
                        if (browser.isIos && this.player.config.fullscreen.iosNative) {
                            this.target.webkitExitFullscreen();
                            silencePromise(this.player.play());
                        } else if (!Fullscreen.native || this.forceFallback) this.toggleFallback(false); else if (!this.prefix) (document.cancelFullScreen || document.exitFullscreen).call(document); else if (!is$1.empty(this.prefix)) {
                            var action = "moz" === this.prefix ? "Cancel" : "Exit";
                            document["".concat(this.prefix).concat(action).concat(this.property)]();
                        }
                    }
                }, {
                    key: "toggle",
                    value: function toggle() {
                        if (!this.active) this.enter(); else this.exit();
                    }
                }, {
                    key: "usingNative",
                    get: function get() {
                        return Fullscreen.native && !this.forceFallback;
                    }
                }, {
                    key: "enabled",
                    get: function get() {
                        return (Fullscreen.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo;
                    }
                }, {
                    key: "active",
                    get: function get() {
                        if (!this.enabled) return false;
                        if (!Fullscreen.native || this.forceFallback) return hasClass(this.target, this.player.config.classNames.fullscreen.fallback);
                        var element = !this.prefix ? document.fullscreenElement : document["".concat(this.prefix).concat(this.property, "Element")];
                        return element && element.shadowRoot ? element === this.target.getRootNode().host : element === this.target;
                    }
                }, {
                    key: "target",
                    get: function get() {
                        return browser.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container;
                    }
                } ], [ {
                    key: "native",
                    get: function get() {
                        return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
                    }
                }, {
                    key: "prefix",
                    get: function get() {
                        if (is$1.function(document.exitFullscreen)) return "";
                        var value = "";
                        var prefixes = [ "webkit", "moz", "ms" ];
                        prefixes.some((function(pre) {
                            if (is$1.function(document["".concat(pre, "ExitFullscreen")]) || is$1.function(document["".concat(pre, "CancelFullScreen")])) {
                                value = pre;
                                return true;
                            }
                            return false;
                        }));
                        return value;
                    }
                }, {
                    key: "property",
                    get: function get() {
                        return "moz" === this.prefix ? "FullScreen" : "Fullscreen";
                    }
                } ]);
                return Fullscreen;
            }();
            function loadImage(src) {
                var minWidth = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                return new Promise((function(resolve, reject) {
                    var image = new Image;
                    var handler = function handler() {
                        delete image.onload;
                        delete image.onerror;
                        (image.naturalWidth >= minWidth ? resolve : reject)(image);
                    };
                    Object.assign(image, {
                        onload: handler,
                        onerror: handler,
                        src
                    });
                }));
            }
            var ui = {
                addStyleHook: function addStyleHook() {
                    toggleClass(this.elements.container, this.config.selectors.container.replace(".", ""), true);
                    toggleClass(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
                },
                toggleNativeControls: function toggleNativeControls() {
                    var toggle = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
                    if (toggle && this.isHTML5) this.media.setAttribute("controls", ""); else this.media.removeAttribute("controls");
                },
                build: function build() {
                    var _this = this;
                    this.listeners.media();
                    if (!this.supported.ui) {
                        this.debug.warn("Basic support only for ".concat(this.provider, " ").concat(this.type));
                        ui.toggleNativeControls.call(this, true);
                        return;
                    }
                    if (!is$1.element(this.elements.controls)) {
                        controls.inject.call(this);
                        this.listeners.controls();
                    }
                    ui.toggleNativeControls.call(this);
                    if (this.isHTML5) captions.setup.call(this);
                    this.volume = null;
                    this.muted = null;
                    this.loop = null;
                    this.quality = null;
                    this.speed = null;
                    controls.updateVolume.call(this);
                    controls.timeUpdate.call(this);
                    ui.checkPlaying.call(this);
                    toggleClass(this.elements.container, this.config.classNames.pip.supported, support.pip && this.isHTML5 && this.isVideo);
                    toggleClass(this.elements.container, this.config.classNames.airplay.supported, support.airplay && this.isHTML5);
                    toggleClass(this.elements.container, this.config.classNames.isIos, browser.isIos);
                    toggleClass(this.elements.container, this.config.classNames.isTouch, this.touch);
                    this.ready = true;
                    setTimeout((function() {
                        triggerEvent.call(_this, _this.media, "ready");
                    }), 0);
                    ui.setTitle.call(this);
                    if (this.poster) ui.setPoster.call(this, this.poster, false).catch((function() {}));
                    if (this.config.duration) controls.durationUpdate.call(this);
                },
                setTitle: function setTitle() {
                    var label = i18n.get("play", this.config);
                    if (is$1.string(this.config.title) && !is$1.empty(this.config.title)) label += ", ".concat(this.config.title);
                    Array.from(this.elements.buttons.play || []).forEach((function(button) {
                        button.setAttribute("aria-label", label);
                    }));
                    if (this.isEmbed) {
                        var iframe = getElement.call(this, "iframe");
                        if (!is$1.element(iframe)) return;
                        var title = !is$1.empty(this.config.title) ? this.config.title : "video";
                        var format = i18n.get("frameTitle", this.config);
                        iframe.setAttribute("title", format.replace("{title}", title));
                    }
                },
                togglePoster: function togglePoster(enable) {
                    toggleClass(this.elements.container, this.config.classNames.posterEnabled, enable);
                },
                setPoster: function setPoster(poster) {
                    var _this2 = this;
                    var passive = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : true;
                    if (passive && this.poster) return Promise.reject(new Error("Poster already set"));
                    this.media.setAttribute("data-poster", poster);
                    this.elements.poster.removeAttribute("hidden");
                    return ready.call(this).then((function() {
                        return loadImage(poster);
                    })).catch((function(err) {
                        if (poster === _this2.poster) ui.togglePoster.call(_this2, false);
                        throw err;
                    })).then((function() {
                        if (poster !== _this2.poster) throw new Error("setPoster cancelled by later call to setPoster");
                    })).then((function() {
                        Object.assign(_this2.elements.poster.style, {
                            backgroundImage: "url('".concat(poster, "')"),
                            backgroundSize: ""
                        });
                        ui.togglePoster.call(_this2, true);
                        return poster;
                    }));
                },
                checkPlaying: function checkPlaying(event) {
                    var _this3 = this;
                    toggleClass(this.elements.container, this.config.classNames.playing, this.playing);
                    toggleClass(this.elements.container, this.config.classNames.paused, this.paused);
                    toggleClass(this.elements.container, this.config.classNames.stopped, this.stopped);
                    Array.from(this.elements.buttons.play || []).forEach((function(target) {
                        Object.assign(target, {
                            pressed: _this3.playing
                        });
                        target.setAttribute("aria-label", i18n.get(_this3.playing ? "pause" : "play", _this3.config));
                    }));
                    if (is$1.event(event) && "timeupdate" === event.type) return;
                    ui.toggleControls.call(this);
                },
                checkLoading: function checkLoading(event) {
                    var _this4 = this;
                    this.loading = [ "stalled", "waiting" ].includes(event.type);
                    clearTimeout(this.timers.loading);
                    this.timers.loading = setTimeout((function() {
                        toggleClass(_this4.elements.container, _this4.config.classNames.loading, _this4.loading);
                        ui.toggleControls.call(_this4);
                    }), this.loading ? 250 : 0);
                },
                toggleControls: function toggleControls(force) {
                    var controlsElement = this.elements.controls;
                    if (controlsElement && this.config.hideControls) {
                        var recentTouchSeek = this.touch && this.lastSeekTime + 2e3 > Date.now();
                        this.toggleControls(Boolean(force || this.loading || this.paused || controlsElement.pressed || controlsElement.hover || recentTouchSeek));
                    }
                },
                migrateStyles: function migrateStyles() {
                    var _this5 = this;
                    Object.values(_objectSpread2({}, this.media.style)).filter((function(key) {
                        return !is$1.empty(key) && is$1.string(key) && key.startsWith("--plyr");
                    })).forEach((function(key) {
                        _this5.elements.container.style.setProperty(key, _this5.media.style.getPropertyValue(key));
                        _this5.media.style.removeProperty(key);
                    }));
                    if (is$1.empty(this.media.style)) this.media.removeAttribute("style");
                }
            };
            var Listeners = function() {
                function Listeners(player) {
                    _classCallCheck(this, Listeners);
                    this.player = player;
                    this.lastKey = null;
                    this.focusTimer = null;
                    this.lastKeyDown = null;
                    this.handleKey = this.handleKey.bind(this);
                    this.toggleMenu = this.toggleMenu.bind(this);
                    this.setTabFocus = this.setTabFocus.bind(this);
                    this.firstTouch = this.firstTouch.bind(this);
                }
                _createClass(Listeners, [ {
                    key: "handleKey",
                    value: function handleKey(event) {
                        var player = this.player;
                        var elements = player.elements;
                        var code = event.keyCode ? event.keyCode : event.which;
                        var pressed = "keydown" === event.type;
                        var repeat = pressed && code === this.lastKey;
                        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
                        if (!is$1.number(code)) return;
                        var seekByKey = function seekByKey() {
                            player.currentTime = player.duration / 10 * (code - 48);
                        };
                        if (pressed) {
                            var focused = document.activeElement;
                            if (is$1.element(focused)) {
                                var editable = player.config.selectors.editable;
                                var seek = elements.inputs.seek;
                                if (focused !== seek && matches$1(focused, editable)) return;
                                if (32 === event.which && matches$1(focused, 'button, [role^="menuitem"]')) return;
                            }
                            var preventDefault = [ 32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79 ];
                            if (preventDefault.includes(code)) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                            switch (code) {
                              case 48:
                              case 49:
                              case 50:
                              case 51:
                              case 52:
                              case 53:
                              case 54:
                              case 55:
                              case 56:
                              case 57:
                                if (!repeat) seekByKey();
                                break;

                              case 32:
                              case 75:
                                if (!repeat) silencePromise(player.togglePlay());
                                break;

                              case 38:
                                player.increaseVolume(.1);
                                break;

                              case 40:
                                player.decreaseVolume(.1);
                                break;

                              case 77:
                                if (!repeat) player.muted = !player.muted;
                                break;

                              case 39:
                                player.forward();
                                break;

                              case 37:
                                player.rewind();
                                break;

                              case 70:
                                player.fullscreen.toggle();
                                break;

                              case 67:
                                if (!repeat) player.toggleCaptions();
                                break;

                              case 76:
                                player.loop = !player.loop;
                                break;
                            }
                            if (27 === code && !player.fullscreen.usingNative && player.fullscreen.active) player.fullscreen.toggle();
                            this.lastKey = code;
                        } else this.lastKey = null;
                    }
                }, {
                    key: "toggleMenu",
                    value: function toggleMenu(event) {
                        controls.toggleMenu.call(this.player, event);
                    }
                }, {
                    key: "firstTouch",
                    value: function firstTouch() {
                        var player = this.player;
                        var elements = player.elements;
                        player.touch = true;
                        toggleClass(elements.container, player.config.classNames.isTouch, true);
                    }
                }, {
                    key: "setTabFocus",
                    value: function setTabFocus(event) {
                        var player = this.player;
                        var elements = player.elements;
                        clearTimeout(this.focusTimer);
                        if ("keydown" === event.type && 9 !== event.which) return;
                        if ("keydown" === event.type) this.lastKeyDown = event.timeStamp;
                        var removeCurrent = function removeCurrent() {
                            var className = player.config.classNames.tabFocus;
                            var current = getElements.call(player, ".".concat(className));
                            toggleClass(current, className, false);
                        };
                        var wasKeyDown = event.timeStamp - this.lastKeyDown <= 20;
                        if ("focus" === event.type && !wasKeyDown) return;
                        removeCurrent();
                        if ("focusout" !== event.type) this.focusTimer = setTimeout((function() {
                            var focused = document.activeElement;
                            if (!elements.container.contains(focused)) return;
                            toggleClass(document.activeElement, player.config.classNames.tabFocus, true);
                        }), 10);
                    }
                }, {
                    key: "global",
                    value: function global() {
                        var toggle = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : true;
                        var player = this.player;
                        if (player.config.keyboard.global) toggleListener.call(player, window, "keydown keyup", this.handleKey, toggle, false);
                        toggleListener.call(player, document.body, "click", this.toggleMenu, toggle);
                        once.call(player, document.body, "touchstart", this.firstTouch);
                        toggleListener.call(player, document.body, "keydown focus blur focusout", this.setTabFocus, toggle, false, true);
                    }
                }, {
                    key: "container",
                    value: function container() {
                        var player = this.player;
                        var config = player.config, elements = player.elements, timers = player.timers;
                        if (!config.keyboard.global && config.keyboard.focused) on.call(player, elements.container, "keydown keyup", this.handleKey, false);
                        on.call(player, elements.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", (function(event) {
                            var controlsElement = elements.controls;
                            if (controlsElement && "enterfullscreen" === event.type) {
                                controlsElement.pressed = false;
                                controlsElement.hover = false;
                            }
                            var show = [ "touchstart", "touchmove", "mousemove" ].includes(event.type);
                            var delay = 0;
                            if (show) {
                                ui.toggleControls.call(player, true);
                                delay = player.touch ? 3e3 : 2e3;
                            }
                            clearTimeout(timers.controls);
                            timers.controls = setTimeout((function() {
                                return ui.toggleControls.call(player, false);
                            }), delay);
                        }));
                        var setGutter = function setGutter(ratio, padding, toggle) {
                            if (!player.isVimeo || player.config.vimeo.premium) return;
                            var target = player.elements.wrapper.firstChild;
                            var _ratio = _slicedToArray(ratio, 2), y = _ratio[1];
                            var _getAspectRatio$call = getAspectRatio.call(player), _getAspectRatio$call2 = _slicedToArray(_getAspectRatio$call, 2), videoX = _getAspectRatio$call2[0], videoY = _getAspectRatio$call2[1];
                            target.style.maxWidth = toggle ? "".concat(y / videoY * videoX, "px") : null;
                            target.style.margin = toggle ? "0 auto" : null;
                        };
                        var setPlayerSize = function setPlayerSize(measure) {
                            if (!measure) return setAspectRatio.call(player);
                            var rect = elements.container.getBoundingClientRect();
                            var width = rect.width, height = rect.height;
                            return setAspectRatio.call(player, "".concat(width, ":").concat(height));
                        };
                        var resized = function resized() {
                            clearTimeout(timers.resized);
                            timers.resized = setTimeout(setPlayerSize, 50);
                        };
                        on.call(player, elements.container, "enterfullscreen exitfullscreen", (function(event) {
                            var _player$fullscreen = player.fullscreen, target = _player$fullscreen.target, usingNative = _player$fullscreen.usingNative;
                            if (target !== elements.container) return;
                            if (!player.isEmbed && is$1.empty(player.config.ratio)) return;
                            var isEnter = "enterfullscreen" === event.type;
                            var _setPlayerSize = setPlayerSize(isEnter), padding = _setPlayerSize.padding, ratio = _setPlayerSize.ratio;
                            setGutter(ratio, padding, isEnter);
                            if (isEnter) setTimeout((function() {
                                return repaint(elements.container);
                            }), 100);
                            if (!usingNative) if (isEnter) on.call(player, window, "resize", resized); else off.call(player, window, "resize", resized);
                        }));
                    }
                }, {
                    key: "media",
                    value: function media() {
                        var _this = this;
                        var player = this.player;
                        var elements = player.elements;
                        on.call(player, player.media, "timeupdate seeking seeked", (function(event) {
                            return controls.timeUpdate.call(player, event);
                        }));
                        on.call(player, player.media, "durationchange loadeddata loadedmetadata", (function(event) {
                            return controls.durationUpdate.call(player, event);
                        }));
                        on.call(player, player.media, "ended", (function() {
                            if (player.isHTML5 && player.isVideo && player.config.resetOnEnd) {
                                player.restart();
                                player.pause();
                            }
                        }));
                        on.call(player, player.media, "progress playing seeking seeked", (function(event) {
                            return controls.updateProgress.call(player, event);
                        }));
                        on.call(player, player.media, "volumechange", (function(event) {
                            return controls.updateVolume.call(player, event);
                        }));
                        on.call(player, player.media, "playing play pause ended emptied timeupdate", (function(event) {
                            return ui.checkPlaying.call(player, event);
                        }));
                        on.call(player, player.media, "waiting canplay seeked playing", (function(event) {
                            return ui.checkLoading.call(player, event);
                        }));
                        if (player.supported.ui && player.config.clickToPlay && !player.isAudio) {
                            var wrapper = getElement.call(player, ".".concat(player.config.classNames.video));
                            if (!is$1.element(wrapper)) return;
                            on.call(player, elements.container, "click", (function(event) {
                                var targets = [ elements.container, wrapper ];
                                if (!targets.includes(event.target) && !wrapper.contains(event.target)) return;
                                if (player.touch && player.config.hideControls) return;
                                if (player.ended) {
                                    _this.proxy(event, player.restart, "restart");
                                    _this.proxy(event, (function() {
                                        silencePromise(player.play());
                                    }), "play");
                                } else _this.proxy(event, (function() {
                                    silencePromise(player.togglePlay());
                                }), "play");
                            }));
                        }
                        if (player.supported.ui && player.config.disableContextMenu) on.call(player, elements.wrapper, "contextmenu", (function(event) {
                            event.preventDefault();
                        }), false);
                        on.call(player, player.media, "volumechange", (function() {
                            player.storage.set({
                                volume: player.volume,
                                muted: player.muted
                            });
                        }));
                        on.call(player, player.media, "ratechange", (function() {
                            controls.updateSetting.call(player, "speed");
                            player.storage.set({
                                speed: player.speed
                            });
                        }));
                        on.call(player, player.media, "qualitychange", (function(event) {
                            controls.updateSetting.call(player, "quality", null, event.detail.quality);
                        }));
                        on.call(player, player.media, "ready qualitychange", (function() {
                            controls.setDownloadUrl.call(player);
                        }));
                        var proxyEvents = player.config.events.concat([ "keyup", "keydown" ]).join(" ");
                        on.call(player, player.media, proxyEvents, (function(event) {
                            var _event$detail = event.detail, detail = void 0 === _event$detail ? {} : _event$detail;
                            if ("error" === event.type) detail = player.media.error;
                            triggerEvent.call(player, elements.container, event.type, true, detail);
                        }));
                    }
                }, {
                    key: "proxy",
                    value: function proxy(event, defaultHandler, customHandlerKey) {
                        var player = this.player;
                        var customHandler = player.config.listeners[customHandlerKey];
                        var hasCustomHandler = is$1.function(customHandler);
                        var returned = true;
                        if (hasCustomHandler) returned = customHandler.call(player, event);
                        if (false !== returned && is$1.function(defaultHandler)) defaultHandler.call(player, event);
                    }
                }, {
                    key: "bind",
                    value: function bind(element, type, defaultHandler, customHandlerKey) {
                        var _this2 = this;
                        var passive = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : true;
                        var player = this.player;
                        var customHandler = player.config.listeners[customHandlerKey];
                        var hasCustomHandler = is$1.function(customHandler);
                        on.call(player, element, type, (function(event) {
                            return _this2.proxy(event, defaultHandler, customHandlerKey);
                        }), passive && !hasCustomHandler);
                    }
                }, {
                    key: "controls",
                    value: function controls$1() {
                        var _this3 = this;
                        var player = this.player;
                        var elements = player.elements;
                        var inputEvent = browser.isIE ? "change" : "input";
                        if (elements.buttons.play) Array.from(elements.buttons.play).forEach((function(button) {
                            _this3.bind(button, "click", (function() {
                                silencePromise(player.togglePlay());
                            }), "play");
                        }));
                        this.bind(elements.buttons.restart, "click", player.restart, "restart");
                        this.bind(elements.buttons.rewind, "click", (function() {
                            player.lastSeekTime = Date.now();
                            player.rewind();
                        }), "rewind");
                        this.bind(elements.buttons.fastForward, "click", (function() {
                            player.lastSeekTime = Date.now();
                            player.forward();
                        }), "fastForward");
                        this.bind(elements.buttons.mute, "click", (function() {
                            player.muted = !player.muted;
                        }), "mute");
                        this.bind(elements.buttons.captions, "click", (function() {
                            return player.toggleCaptions();
                        }));
                        this.bind(elements.buttons.download, "click", (function() {
                            triggerEvent.call(player, player.media, "download");
                        }), "download");
                        this.bind(elements.buttons.fullscreen, "click", (function() {
                            player.fullscreen.toggle();
                        }), "fullscreen");
                        this.bind(elements.buttons.pip, "click", (function() {
                            player.pip = "toggle";
                        }), "pip");
                        this.bind(elements.buttons.airplay, "click", player.airplay, "airplay");
                        this.bind(elements.buttons.settings, "click", (function(event) {
                            event.stopPropagation();
                            event.preventDefault();
                            controls.toggleMenu.call(player, event);
                        }), null, false);
                        this.bind(elements.buttons.settings, "keyup", (function(event) {
                            var code = event.which;
                            if (![ 13, 32 ].includes(code)) return;
                            if (13 === code) {
                                controls.focusFirstMenuItem.call(player, null, true);
                                return;
                            }
                            event.preventDefault();
                            event.stopPropagation();
                            controls.toggleMenu.call(player, event);
                        }), null, false);
                        this.bind(elements.settings.menu, "keydown", (function(event) {
                            if (27 === event.which) controls.toggleMenu.call(player, event);
                        }));
                        this.bind(elements.inputs.seek, "mousedown mousemove", (function(event) {
                            var rect = elements.progress.getBoundingClientRect();
                            var percent = 100 / rect.width * (event.pageX - rect.left);
                            event.currentTarget.setAttribute("seek-value", percent);
                        }));
                        this.bind(elements.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", (function(event) {
                            var seek = event.currentTarget;
                            var code = event.keyCode ? event.keyCode : event.which;
                            var attribute = "play-on-seeked";
                            if (is$1.keyboardEvent(event) && 39 !== code && 37 !== code) return;
                            player.lastSeekTime = Date.now();
                            var play = seek.hasAttribute(attribute);
                            var done = [ "mouseup", "touchend", "keyup" ].includes(event.type);
                            if (play && done) {
                                seek.removeAttribute(attribute);
                                silencePromise(player.play());
                            } else if (!done && player.playing) {
                                seek.setAttribute(attribute, "");
                                player.pause();
                            }
                        }));
                        if (browser.isIos) {
                            var inputs = getElements.call(player, 'input[type="range"]');
                            Array.from(inputs).forEach((function(input) {
                                return _this3.bind(input, inputEvent, (function(event) {
                                    return repaint(event.target);
                                }));
                            }));
                        }
                        this.bind(elements.inputs.seek, inputEvent, (function(event) {
                            var seek = event.currentTarget;
                            var seekTo = seek.getAttribute("seek-value");
                            if (is$1.empty(seekTo)) seekTo = seek.value;
                            seek.removeAttribute("seek-value");
                            player.currentTime = seekTo / seek.max * player.duration;
                        }), "seek");
                        this.bind(elements.progress, "mouseenter mouseleave mousemove", (function(event) {
                            return controls.updateSeekTooltip.call(player, event);
                        }));
                        this.bind(elements.progress, "mousemove touchmove", (function(event) {
                            var previewThumbnails = player.previewThumbnails;
                            if (previewThumbnails && previewThumbnails.loaded) previewThumbnails.startMove(event);
                        }));
                        this.bind(elements.progress, "mouseleave touchend click", (function() {
                            var previewThumbnails = player.previewThumbnails;
                            if (previewThumbnails && previewThumbnails.loaded) previewThumbnails.endMove(false, true);
                        }));
                        this.bind(elements.progress, "mousedown touchstart", (function(event) {
                            var previewThumbnails = player.previewThumbnails;
                            if (previewThumbnails && previewThumbnails.loaded) previewThumbnails.startScrubbing(event);
                        }));
                        this.bind(elements.progress, "mouseup touchend", (function(event) {
                            var previewThumbnails = player.previewThumbnails;
                            if (previewThumbnails && previewThumbnails.loaded) previewThumbnails.endScrubbing(event);
                        }));
                        if (browser.isWebkit) Array.from(getElements.call(player, 'input[type="range"]')).forEach((function(element) {
                            _this3.bind(element, "input", (function(event) {
                                return controls.updateRangeFill.call(player, event.target);
                            }));
                        }));
                        if (player.config.toggleInvert && !is$1.element(elements.display.duration)) this.bind(elements.display.currentTime, "click", (function() {
                            if (0 === player.currentTime) return;
                            player.config.invertTime = !player.config.invertTime;
                            controls.timeUpdate.call(player);
                        }));
                        this.bind(elements.inputs.volume, inputEvent, (function(event) {
                            player.volume = event.target.value;
                        }), "volume");
                        this.bind(elements.controls, "mouseenter mouseleave", (function(event) {
                            elements.controls.hover = !player.touch && "mouseenter" === event.type;
                        }));
                        if (elements.fullscreen) Array.from(elements.fullscreen.children).filter((function(c) {
                            return !c.contains(elements.container);
                        })).forEach((function(child) {
                            _this3.bind(child, "mouseenter mouseleave", (function(event) {
                                elements.controls.hover = !player.touch && "mouseenter" === event.type;
                            }));
                        }));
                        this.bind(elements.controls, "mousedown mouseup touchstart touchend touchcancel", (function(event) {
                            elements.controls.pressed = [ "mousedown", "touchstart" ].includes(event.type);
                        }));
                        this.bind(elements.controls, "focusin", (function() {
                            var config = player.config, timers = player.timers;
                            toggleClass(elements.controls, config.classNames.noTransition, true);
                            ui.toggleControls.call(player, true);
                            setTimeout((function() {
                                toggleClass(elements.controls, config.classNames.noTransition, false);
                            }), 0);
                            var delay = _this3.touch ? 3e3 : 4e3;
                            clearTimeout(timers.controls);
                            timers.controls = setTimeout((function() {
                                return ui.toggleControls.call(player, false);
                            }), delay);
                        }));
                        this.bind(elements.inputs.volume, "wheel", (function(event) {
                            var inverted = event.webkitDirectionInvertedFromDevice;
                            var _map = [ event.deltaX, -event.deltaY ].map((function(value) {
                                return inverted ? -value : value;
                            })), _map2 = _slicedToArray(_map, 2), x = _map2[0], y = _map2[1];
                            var direction = Math.sign(Math.abs(x) > Math.abs(y) ? x : y);
                            player.increaseVolume(direction / 50);
                            var volume = player.media.volume;
                            if (1 === direction && volume < 1 || -1 === direction && volume > 0) event.preventDefault();
                        }), "volume", false);
                    }
                } ]);
                return Listeners;
            }();
            "undefined" !== typeof globalThis ? globalThis : "undefined" !== typeof window ? window : "undefined" !== typeof global ? global : "undefined" !== typeof self && self;
            function createCommonjsModule(fn, module) {
                return module = {
                    exports: {}
                }, fn(module, module.exports), module.exports;
            }
            var loadjs_umd = createCommonjsModule((function(module, exports) {
                (function(root, factory) {
                    module.exports = factory();
                })(0, (function() {
                    var devnull = function devnull() {}, bundleIdCache = {}, bundleResultCache = {}, bundleCallbackQueue = {};
                    function subscribe(bundleIds, callbackFn) {
                        bundleIds = bundleIds.push ? bundleIds : [ bundleIds ];
                        var fn, bundleId, r, q, depsNotFound = [], i = bundleIds.length, numWaiting = i;
                        fn = function fn(bundleId, pathsNotFound) {
                            if (pathsNotFound.length) depsNotFound.push(bundleId);
                            numWaiting--;
                            if (!numWaiting) callbackFn(depsNotFound);
                        };
                        while (i--) {
                            bundleId = bundleIds[i];
                            r = bundleResultCache[bundleId];
                            if (r) {
                                fn(bundleId, r);
                                continue;
                            }
                            q = bundleCallbackQueue[bundleId] = bundleCallbackQueue[bundleId] || [];
                            q.push(fn);
                        }
                    }
                    function publish(bundleId, pathsNotFound) {
                        if (!bundleId) return;
                        var q = bundleCallbackQueue[bundleId];
                        bundleResultCache[bundleId] = pathsNotFound;
                        if (!q) return;
                        while (q.length) {
                            q[0](bundleId, pathsNotFound);
                            q.splice(0, 1);
                        }
                    }
                    function executeCallbacks(args, depsNotFound) {
                        if (args.call) args = {
                            success: args
                        };
                        if (depsNotFound.length) (args.error || devnull)(depsNotFound); else (args.success || devnull)(args);
                    }
                    function loadFile(path, callbackFn, args, numTries) {
                        var isLegacyIECss, e, doc = document, async = args.async, maxTries = (args.numRetries || 0) + 1, beforeCallbackFn = args.before || devnull, pathname = path.replace(/[\?|#].*$/, ""), pathStripped = path.replace(/^(css|img)!/, "");
                        numTries = numTries || 0;
                        if (/(^css!|\.css$)/.test(pathname)) {
                            e = doc.createElement("link");
                            e.rel = "stylesheet";
                            e.href = pathStripped;
                            isLegacyIECss = "hideFocus" in e;
                            if (isLegacyIECss && e.relList) {
                                isLegacyIECss = 0;
                                e.rel = "preload";
                                e.as = "style";
                            }
                        } else if (/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(pathname)) {
                            e = doc.createElement("img");
                            e.src = pathStripped;
                        } else {
                            e = doc.createElement("script");
                            e.src = path;
                            e.async = void 0 === async ? true : async;
                        }
                        e.onload = e.onerror = e.onbeforeload = function(ev) {
                            var result = ev.type[0];
                            if (isLegacyIECss) try {
                                if (!e.sheet.cssText.length) result = "e";
                            } catch (x) {
                                if (18 != x.code) result = "e";
                            }
                            if ("e" == result) {
                                numTries += 1;
                                if (numTries < maxTries) return loadFile(path, callbackFn, args, numTries);
                            } else if ("preload" == e.rel && "style" == e.as) return e.rel = "stylesheet";
                            callbackFn(path, result, ev.defaultPrevented);
                        };
                        if (false !== beforeCallbackFn(path, e)) doc.head.appendChild(e);
                    }
                    function loadFiles(paths, callbackFn, args) {
                        paths = paths.push ? paths : [ paths ];
                        var fn, i, numWaiting = paths.length, x = numWaiting, pathsNotFound = [];
                        fn = function fn(path, result, defaultPrevented) {
                            if ("e" == result) pathsNotFound.push(path);
                            if ("b" == result) if (defaultPrevented) pathsNotFound.push(path); else return;
                            numWaiting--;
                            if (!numWaiting) callbackFn(pathsNotFound);
                        };
                        for (i = 0; i < x; i++) loadFile(paths[i], fn, args);
                    }
                    function loadjs(paths, arg1, arg2) {
                        var bundleId, args;
                        if (arg1 && arg1.trim) bundleId = arg1;
                        args = (bundleId ? arg2 : arg1) || {};
                        if (bundleId) if (bundleId in bundleIdCache) throw "LoadJS"; else bundleIdCache[bundleId] = true;
                        function loadFn(resolve, reject) {
                            loadFiles(paths, (function(pathsNotFound) {
                                executeCallbacks(args, pathsNotFound);
                                if (resolve) executeCallbacks({
                                    success: resolve,
                                    error: reject
                                }, pathsNotFound);
                                publish(bundleId, pathsNotFound);
                            }), args);
                        }
                        if (args.returnPromise) return new Promise(loadFn); else loadFn();
                    }
                    loadjs.ready = function ready(deps, args) {
                        subscribe(deps, (function(depsNotFound) {
                            executeCallbacks(args, depsNotFound);
                        }));
                        return loadjs;
                    };
                    loadjs.done = function done(bundleId) {
                        publish(bundleId, []);
                    };
                    loadjs.reset = function reset() {
                        bundleIdCache = {};
                        bundleResultCache = {};
                        bundleCallbackQueue = {};
                    };
                    loadjs.isDefined = function isDefined(bundleId) {
                        return bundleId in bundleIdCache;
                    };
                    return loadjs;
                }));
            }));
            function loadScript(url) {
                return new Promise((function(resolve, reject) {
                    loadjs_umd(url, {
                        success: resolve,
                        error: reject
                    });
                }));
            }
            function parseId(url) {
                if (is$1.empty(url)) return null;
                if (is$1.number(Number(url))) return url;
                var regex = /^.*(vimeo.com\/|video\/)(\d+).*/;
                return url.match(regex) ? RegExp.$2 : url;
            }
            function assurePlaybackState(play) {
                if (play && !this.embed.hasPlayed) this.embed.hasPlayed = true;
                if (this.media.paused === play) {
                    this.media.paused = !play;
                    triggerEvent.call(this, this.media, play ? "play" : "pause");
                }
            }
            var vimeo = {
                setup: function setup() {
                    var player = this;
                    toggleClass(player.elements.wrapper, player.config.classNames.embed, true);
                    player.options.speed = player.config.speed.options;
                    setAspectRatio.call(player);
                    if (!is$1.object(window.Vimeo)) loadScript(player.config.urls.vimeo.sdk).then((function() {
                        vimeo.ready.call(player);
                    })).catch((function(error) {
                        player.debug.warn("Vimeo SDK (player.js) failed to load", error);
                    })); else vimeo.ready.call(player);
                },
                ready: function ready() {
                    var _this = this;
                    var player = this;
                    var config = player.config.vimeo;
                    var premium = config.premium, referrerPolicy = config.referrerPolicy, frameParams = _objectWithoutProperties(config, [ "premium", "referrerPolicy" ]);
                    if (premium) Object.assign(frameParams, {
                        controls: false,
                        sidedock: false
                    });
                    var params = buildUrlParams(_objectSpread2({
                        loop: player.config.loop.active,
                        autoplay: player.autoplay,
                        muted: player.muted,
                        gesture: "media",
                        playsinline: !this.config.fullscreen.iosNative
                    }, frameParams));
                    var source = player.media.getAttribute("src");
                    if (is$1.empty(source)) source = player.media.getAttribute(player.config.attributes.embed.id);
                    var id = parseId(source);
                    var iframe = createElement("iframe");
                    var src = format(player.config.urls.vimeo.iframe, id, params);
                    iframe.setAttribute("src", src);
                    iframe.setAttribute("allowfullscreen", "");
                    iframe.setAttribute("allow", "autoplay,fullscreen,picture-in-picture");
                    if (!is$1.empty(referrerPolicy)) iframe.setAttribute("referrerPolicy", referrerPolicy);
                    if (premium || !config.customControls) {
                        iframe.setAttribute("data-poster", player.poster);
                        player.media = replaceElement(iframe, player.media);
                    } else {
                        var wrapper = createElement("div", {
                            class: player.config.classNames.embedContainer,
                            "data-poster": player.poster
                        });
                        wrapper.appendChild(iframe);
                        player.media = replaceElement(wrapper, player.media);
                    }
                    if (!config.customControls) fetch(format(player.config.urls.vimeo.api, src)).then((function(response) {
                        if (is$1.empty(response) || !response.thumbnail_url) return;
                        ui.setPoster.call(player, response.thumbnail_url).catch((function() {}));
                    }));
                    player.embed = new window.Vimeo.Player(iframe, {
                        autopause: player.config.autopause,
                        muted: player.muted
                    });
                    player.media.paused = true;
                    player.media.currentTime = 0;
                    if (player.supported.ui) player.embed.disableTextTrack();
                    player.media.play = function() {
                        assurePlaybackState.call(player, true);
                        return player.embed.play();
                    };
                    player.media.pause = function() {
                        assurePlaybackState.call(player, false);
                        return player.embed.pause();
                    };
                    player.media.stop = function() {
                        player.pause();
                        player.currentTime = 0;
                    };
                    var currentTime = player.media.currentTime;
                    Object.defineProperty(player.media, "currentTime", {
                        get: function get() {
                            return currentTime;
                        },
                        set: function set(time) {
                            var embed = player.embed, media = player.media, paused = player.paused, volume = player.volume;
                            var restorePause = paused && !embed.hasPlayed;
                            media.seeking = true;
                            triggerEvent.call(player, media, "seeking");
                            Promise.resolve(restorePause && embed.setVolume(0)).then((function() {
                                return embed.setCurrentTime(time);
                            })).then((function() {
                                return restorePause && embed.pause();
                            })).then((function() {
                                return restorePause && embed.setVolume(volume);
                            })).catch((function() {}));
                        }
                    });
                    var speed = player.config.speed.selected;
                    Object.defineProperty(player.media, "playbackRate", {
                        get: function get() {
                            return speed;
                        },
                        set: function set(input) {
                            player.embed.setPlaybackRate(input).then((function() {
                                speed = input;
                                triggerEvent.call(player, player.media, "ratechange");
                            })).catch((function() {
                                player.options.speed = [ 1 ];
                            }));
                        }
                    });
                    var volume = player.config.volume;
                    Object.defineProperty(player.media, "volume", {
                        get: function get() {
                            return volume;
                        },
                        set: function set(input) {
                            player.embed.setVolume(input).then((function() {
                                volume = input;
                                triggerEvent.call(player, player.media, "volumechange");
                            }));
                        }
                    });
                    var muted = player.config.muted;
                    Object.defineProperty(player.media, "muted", {
                        get: function get() {
                            return muted;
                        },
                        set: function set(input) {
                            var toggle = is$1.boolean(input) ? input : false;
                            player.embed.setVolume(toggle ? 0 : player.config.volume).then((function() {
                                muted = toggle;
                                triggerEvent.call(player, player.media, "volumechange");
                            }));
                        }
                    });
                    var loop = player.config.loop;
                    Object.defineProperty(player.media, "loop", {
                        get: function get() {
                            return loop;
                        },
                        set: function set(input) {
                            var toggle = is$1.boolean(input) ? input : player.config.loop.active;
                            player.embed.setLoop(toggle).then((function() {
                                loop = toggle;
                            }));
                        }
                    });
                    var currentSrc;
                    player.embed.getVideoUrl().then((function(value) {
                        currentSrc = value;
                        controls.setDownloadUrl.call(player);
                    })).catch((function(error) {
                        _this.debug.warn(error);
                    }));
                    Object.defineProperty(player.media, "currentSrc", {
                        get: function get() {
                            return currentSrc;
                        }
                    });
                    Object.defineProperty(player.media, "ended", {
                        get: function get() {
                            return player.currentTime === player.duration;
                        }
                    });
                    Promise.all([ player.embed.getVideoWidth(), player.embed.getVideoHeight() ]).then((function(dimensions) {
                        var _dimensions = _slicedToArray(dimensions, 2), width = _dimensions[0], height = _dimensions[1];
                        player.embed.ratio = [ width, height ];
                        setAspectRatio.call(_this);
                    }));
                    player.embed.setAutopause(player.config.autopause).then((function(state) {
                        player.config.autopause = state;
                    }));
                    player.embed.getVideoTitle().then((function(title) {
                        player.config.title = title;
                        ui.setTitle.call(_this);
                    }));
                    player.embed.getCurrentTime().then((function(value) {
                        currentTime = value;
                        triggerEvent.call(player, player.media, "timeupdate");
                    }));
                    player.embed.getDuration().then((function(value) {
                        player.media.duration = value;
                        triggerEvent.call(player, player.media, "durationchange");
                    }));
                    player.embed.getTextTracks().then((function(tracks) {
                        player.media.textTracks = tracks;
                        captions.setup.call(player);
                    }));
                    player.embed.on("cuechange", (function(_ref) {
                        var _ref$cues = _ref.cues, cues = void 0 === _ref$cues ? [] : _ref$cues;
                        var strippedCues = cues.map((function(cue) {
                            return stripHTML(cue.text);
                        }));
                        captions.updateCues.call(player, strippedCues);
                    }));
                    player.embed.on("loaded", (function() {
                        player.embed.getPaused().then((function(paused) {
                            assurePlaybackState.call(player, !paused);
                            if (!paused) triggerEvent.call(player, player.media, "playing");
                        }));
                        if (is$1.element(player.embed.element) && player.supported.ui) {
                            var frame = player.embed.element;
                            frame.setAttribute("tabindex", -1);
                        }
                    }));
                    player.embed.on("bufferstart", (function() {
                        triggerEvent.call(player, player.media, "waiting");
                    }));
                    player.embed.on("bufferend", (function() {
                        triggerEvent.call(player, player.media, "playing");
                    }));
                    player.embed.on("play", (function() {
                        assurePlaybackState.call(player, true);
                        triggerEvent.call(player, player.media, "playing");
                    }));
                    player.embed.on("pause", (function() {
                        assurePlaybackState.call(player, false);
                    }));
                    player.embed.on("timeupdate", (function(data) {
                        player.media.seeking = false;
                        currentTime = data.seconds;
                        triggerEvent.call(player, player.media, "timeupdate");
                    }));
                    player.embed.on("progress", (function(data) {
                        player.media.buffered = data.percent;
                        triggerEvent.call(player, player.media, "progress");
                        if (1 === parseInt(data.percent, 10)) triggerEvent.call(player, player.media, "canplaythrough");
                        player.embed.getDuration().then((function(value) {
                            if (value !== player.media.duration) {
                                player.media.duration = value;
                                triggerEvent.call(player, player.media, "durationchange");
                            }
                        }));
                    }));
                    player.embed.on("seeked", (function() {
                        player.media.seeking = false;
                        triggerEvent.call(player, player.media, "seeked");
                    }));
                    player.embed.on("ended", (function() {
                        player.media.paused = true;
                        triggerEvent.call(player, player.media, "ended");
                    }));
                    player.embed.on("error", (function(detail) {
                        player.media.error = detail;
                        triggerEvent.call(player, player.media, "error");
                    }));
                    if (config.customControls) setTimeout((function() {
                        return ui.build.call(player);
                    }), 0);
                }
            };
            function parseId$1(url) {
                if (is$1.empty(url)) return null;
                var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                return url.match(regex) ? RegExp.$2 : url;
            }
            function assurePlaybackState$1(play) {
                if (play && !this.embed.hasPlayed) this.embed.hasPlayed = true;
                if (this.media.paused === play) {
                    this.media.paused = !play;
                    triggerEvent.call(this, this.media, play ? "play" : "pause");
                }
            }
            function getHost(config) {
                if (config.noCookie) return "https://www.youtube-nocookie.com";
                if ("http:" === window.location.protocol) return "http://www.youtube.com";
                return;
            }
            var youtube = {
                setup: function setup() {
                    var _this = this;
                    toggleClass(this.elements.wrapper, this.config.classNames.embed, true);
                    if (is$1.object(window.YT) && is$1.function(window.YT.Player)) youtube.ready.call(this); else {
                        var callback = window.onYouTubeIframeAPIReady;
                        window.onYouTubeIframeAPIReady = function() {
                            if (is$1.function(callback)) callback();
                            youtube.ready.call(_this);
                        };
                        loadScript(this.config.urls.youtube.sdk).catch((function(error) {
                            _this.debug.warn("YouTube API failed to load", error);
                        }));
                    }
                },
                getTitle: function getTitle(videoId) {
                    var _this2 = this;
                    var url = format(this.config.urls.youtube.api, videoId);
                    fetch(url).then((function(data) {
                        if (is$1.object(data)) {
                            var title = data.title, height = data.height, width = data.width;
                            _this2.config.title = title;
                            ui.setTitle.call(_this2);
                            _this2.embed.ratio = [ width, height ];
                        }
                        setAspectRatio.call(_this2);
                    })).catch((function() {
                        setAspectRatio.call(_this2);
                    }));
                },
                ready: function ready() {
                    var player = this;
                    var config = player.config.youtube;
                    var currentId = player.media && player.media.getAttribute("id");
                    if (!is$1.empty(currentId) && currentId.startsWith("youtube-")) return;
                    var source = player.media.getAttribute("src");
                    if (is$1.empty(source)) source = player.media.getAttribute(this.config.attributes.embed.id);
                    var videoId = parseId$1(source);
                    var id = generateId(player.provider);
                    var container = createElement("div", {
                        id,
                        "data-poster": config.customControls ? player.poster : void 0
                    });
                    player.media = replaceElement(container, player.media);
                    if (config.customControls) {
                        var posterSrc = function posterSrc(s) {
                            return "https://i.ytimg.com/vi/".concat(videoId, "/").concat(s, "default.jpg");
                        };
                        loadImage(posterSrc("maxres"), 121).catch((function() {
                            return loadImage(posterSrc("sd"), 121);
                        })).catch((function() {
                            return loadImage(posterSrc("hq"));
                        })).then((function(image) {
                            return ui.setPoster.call(player, image.src);
                        })).then((function(src) {
                            if (!src.includes("maxres")) player.elements.poster.style.backgroundSize = "cover";
                        })).catch((function() {}));
                    }
                    player.embed = new window.YT.Player(player.media, {
                        videoId,
                        host: getHost(config),
                        playerVars: extend({}, {
                            autoplay: player.config.autoplay ? 1 : 0,
                            hl: player.config.hl,
                            controls: player.supported.ui && config.customControls ? 0 : 1,
                            disablekb: 1,
                            playsinline: !player.config.fullscreen.iosNative ? 1 : 0,
                            cc_load_policy: player.captions.active ? 1 : 0,
                            cc_lang_pref: player.config.captions.language,
                            widget_referrer: window ? window.location.href : null
                        }, config),
                        events: {
                            onError: function onError(event) {
                                if (!player.media.error) {
                                    var code = event.data;
                                    var message = {
                                        2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                                        5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                                        100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                                        101: "The owner of the requested video does not allow it to be played in embedded players.",
                                        150: "The owner of the requested video does not allow it to be played in embedded players."
                                    }[code] || "An unknown error occured";
                                    player.media.error = {
                                        code,
                                        message
                                    };
                                    triggerEvent.call(player, player.media, "error");
                                }
                            },
                            onPlaybackRateChange: function onPlaybackRateChange(event) {
                                var instance = event.target;
                                player.media.playbackRate = instance.getPlaybackRate();
                                triggerEvent.call(player, player.media, "ratechange");
                            },
                            onReady: function onReady(event) {
                                if (is$1.function(player.media.play)) return;
                                var instance = event.target;
                                youtube.getTitle.call(player, videoId);
                                player.media.play = function() {
                                    assurePlaybackState$1.call(player, true);
                                    instance.playVideo();
                                };
                                player.media.pause = function() {
                                    assurePlaybackState$1.call(player, false);
                                    instance.pauseVideo();
                                };
                                player.media.stop = function() {
                                    instance.stopVideo();
                                };
                                player.media.duration = instance.getDuration();
                                player.media.paused = true;
                                player.media.currentTime = 0;
                                Object.defineProperty(player.media, "currentTime", {
                                    get: function get() {
                                        return Number(instance.getCurrentTime());
                                    },
                                    set: function set(time) {
                                        if (player.paused && !player.embed.hasPlayed) player.embed.mute();
                                        player.media.seeking = true;
                                        triggerEvent.call(player, player.media, "seeking");
                                        instance.seekTo(time);
                                    }
                                });
                                Object.defineProperty(player.media, "playbackRate", {
                                    get: function get() {
                                        return instance.getPlaybackRate();
                                    },
                                    set: function set(input) {
                                        instance.setPlaybackRate(input);
                                    }
                                });
                                var volume = player.config.volume;
                                Object.defineProperty(player.media, "volume", {
                                    get: function get() {
                                        return volume;
                                    },
                                    set: function set(input) {
                                        volume = input;
                                        instance.setVolume(100 * volume);
                                        triggerEvent.call(player, player.media, "volumechange");
                                    }
                                });
                                var muted = player.config.muted;
                                Object.defineProperty(player.media, "muted", {
                                    get: function get() {
                                        return muted;
                                    },
                                    set: function set(input) {
                                        var toggle = is$1.boolean(input) ? input : muted;
                                        muted = toggle;
                                        instance[toggle ? "mute" : "unMute"]();
                                        instance.setVolume(100 * volume);
                                        triggerEvent.call(player, player.media, "volumechange");
                                    }
                                });
                                Object.defineProperty(player.media, "currentSrc", {
                                    get: function get() {
                                        return instance.getVideoUrl();
                                    }
                                });
                                Object.defineProperty(player.media, "ended", {
                                    get: function get() {
                                        return player.currentTime === player.duration;
                                    }
                                });
                                var speeds = instance.getAvailablePlaybackRates();
                                player.options.speed = speeds.filter((function(s) {
                                    return player.config.speed.options.includes(s);
                                }));
                                if (player.supported.ui && config.customControls) player.media.setAttribute("tabindex", -1);
                                triggerEvent.call(player, player.media, "timeupdate");
                                triggerEvent.call(player, player.media, "durationchange");
                                clearInterval(player.timers.buffering);
                                player.timers.buffering = setInterval((function() {
                                    player.media.buffered = instance.getVideoLoadedFraction();
                                    if (null === player.media.lastBuffered || player.media.lastBuffered < player.media.buffered) triggerEvent.call(player, player.media, "progress");
                                    player.media.lastBuffered = player.media.buffered;
                                    if (1 === player.media.buffered) {
                                        clearInterval(player.timers.buffering);
                                        triggerEvent.call(player, player.media, "canplaythrough");
                                    }
                                }), 200);
                                if (config.customControls) setTimeout((function() {
                                    return ui.build.call(player);
                                }), 50);
                            },
                            onStateChange: function onStateChange(event) {
                                var instance = event.target;
                                clearInterval(player.timers.playing);
                                var seeked = player.media.seeking && [ 1, 2 ].includes(event.data);
                                if (seeked) {
                                    player.media.seeking = false;
                                    triggerEvent.call(player, player.media, "seeked");
                                }
                                switch (event.data) {
                                  case -1:
                                    triggerEvent.call(player, player.media, "timeupdate");
                                    player.media.buffered = instance.getVideoLoadedFraction();
                                    triggerEvent.call(player, player.media, "progress");
                                    break;

                                  case 0:
                                    assurePlaybackState$1.call(player, false);
                                    if (player.media.loop) {
                                        instance.stopVideo();
                                        instance.playVideo();
                                    } else triggerEvent.call(player, player.media, "ended");
                                    break;

                                  case 1:
                                    if (config.customControls && !player.config.autoplay && player.media.paused && !player.embed.hasPlayed) player.media.pause(); else {
                                        assurePlaybackState$1.call(player, true);
                                        triggerEvent.call(player, player.media, "playing");
                                        player.timers.playing = setInterval((function() {
                                            triggerEvent.call(player, player.media, "timeupdate");
                                        }), 50);
                                        if (player.media.duration !== instance.getDuration()) {
                                            player.media.duration = instance.getDuration();
                                            triggerEvent.call(player, player.media, "durationchange");
                                        }
                                    }
                                    break;

                                  case 2:
                                    if (!player.muted) player.embed.unMute();
                                    assurePlaybackState$1.call(player, false);
                                    break;

                                  case 3:
                                    triggerEvent.call(player, player.media, "waiting");
                                    break;
                                }
                                triggerEvent.call(player, player.elements.container, "statechange", false, {
                                    code: event.data
                                });
                            }
                        }
                    });
                }
            };
            var media = {
                setup: function setup() {
                    if (!this.media) {
                        this.debug.warn("No media element found!");
                        return;
                    }
                    toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", this.type), true);
                    toggleClass(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), true);
                    if (this.isEmbed) toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", "video"), true);
                    if (this.isVideo) {
                        this.elements.wrapper = createElement("div", {
                            class: this.config.classNames.video
                        });
                        wrap(this.media, this.elements.wrapper);
                        this.elements.poster = createElement("div", {
                            class: this.config.classNames.poster,
                            hidden: ""
                        });
                        this.elements.wrapper.appendChild(this.elements.poster);
                    }
                    if (this.isHTML5) html5.setup.call(this); else if (this.isYouTube) youtube.setup.call(this); else if (this.isVimeo) vimeo.setup.call(this);
                }
            };
            var destroy = function destroy(instance) {
                if (instance.manager) instance.manager.destroy();
                if (instance.elements.displayContainer) instance.elements.displayContainer.destroy();
                instance.elements.container.remove();
            };
            var Ads = function() {
                function Ads(player) {
                    var _this = this;
                    _classCallCheck(this, Ads);
                    this.player = player;
                    this.config = player.config.ads;
                    this.playing = false;
                    this.initialized = false;
                    this.elements = {
                        container: null,
                        displayContainer: null
                    };
                    this.manager = null;
                    this.loader = null;
                    this.cuePoints = null;
                    this.events = {};
                    this.safetyTimer = null;
                    this.countdownTimer = null;
                    this.managerPromise = new Promise((function(resolve, reject) {
                        _this.on("loaded", resolve);
                        _this.on("error", reject);
                    }));
                    this.load();
                }
                _createClass(Ads, [ {
                    key: "load",
                    value: function load() {
                        var _this2 = this;
                        if (!this.enabled) return;
                        if (!is$1.object(window.google) || !is$1.object(window.google.ima)) loadScript(this.player.config.urls.googleIMA.sdk).then((function() {
                            _this2.ready();
                        })).catch((function() {
                            _this2.trigger("error", new Error("Google IMA SDK failed to load"));
                        })); else this.ready();
                    }
                }, {
                    key: "ready",
                    value: function ready() {
                        var _this3 = this;
                        if (!this.enabled) destroy(this);
                        this.startSafetyTimer(12e3, "ready()");
                        this.managerPromise.then((function() {
                            _this3.clearSafetyTimer("onAdsManagerLoaded()");
                        }));
                        this.listeners();
                        this.setupIMA();
                    }
                }, {
                    key: "setupIMA",
                    value: function setupIMA() {
                        var _this4 = this;
                        this.elements.container = createElement("div", {
                            class: this.player.config.classNames.ads
                        });
                        this.player.elements.container.appendChild(this.elements.container);
                        google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
                        google.ima.settings.setLocale(this.player.config.ads.language);
                        google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline);
                        this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media);
                        this.loader = new google.ima.AdsLoader(this.elements.displayContainer);
                        this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, (function(event) {
                            return _this4.onAdsManagerLoaded(event);
                        }), false);
                        this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (function(error) {
                            return _this4.onAdError(error);
                        }), false);
                        this.requestAds();
                    }
                }, {
                    key: "requestAds",
                    value: function requestAds() {
                        var container = this.player.elements.container;
                        try {
                            var request = new google.ima.AdsRequest;
                            request.adTagUrl = this.tagUrl;
                            request.linearAdSlotWidth = container.offsetWidth;
                            request.linearAdSlotHeight = container.offsetHeight;
                            request.nonLinearAdSlotWidth = container.offsetWidth;
                            request.nonLinearAdSlotHeight = container.offsetHeight;
                            request.forceNonLinearFullSlot = false;
                            request.setAdWillPlayMuted(!this.player.muted);
                            this.loader.requestAds(request);
                        } catch (e) {
                            this.onAdError(e);
                        }
                    }
                }, {
                    key: "pollCountdown",
                    value: function pollCountdown() {
                        var _this5 = this;
                        var start = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
                        if (!start) {
                            clearInterval(this.countdownTimer);
                            this.elements.container.removeAttribute("data-badge-text");
                            return;
                        }
                        var update = function update() {
                            var time = formatTime(Math.max(_this5.manager.getRemainingTime(), 0));
                            var label = "".concat(i18n.get("advertisement", _this5.player.config), " - ").concat(time);
                            _this5.elements.container.setAttribute("data-badge-text", label);
                        };
                        this.countdownTimer = setInterval(update, 100);
                    }
                }, {
                    key: "onAdsManagerLoaded",
                    value: function onAdsManagerLoaded(event) {
                        var _this6 = this;
                        if (!this.enabled) return;
                        var settings = new google.ima.AdsRenderingSettings;
                        settings.restoreCustomPlaybackStateOnAdBreakComplete = true;
                        settings.enablePreloading = true;
                        this.manager = event.getAdsManager(this.player, settings);
                        this.cuePoints = this.manager.getCuePoints();
                        this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (function(error) {
                            return _this6.onAdError(error);
                        }));
                        Object.keys(google.ima.AdEvent.Type).forEach((function(type) {
                            _this6.manager.addEventListener(google.ima.AdEvent.Type[type], (function(e) {
                                return _this6.onAdEvent(e);
                            }));
                        }));
                        this.trigger("loaded");
                    }
                }, {
                    key: "addCuePoints",
                    value: function addCuePoints() {
                        var _this7 = this;
                        if (!is$1.empty(this.cuePoints)) this.cuePoints.forEach((function(cuePoint) {
                            if (0 !== cuePoint && -1 !== cuePoint && cuePoint < _this7.player.duration) {
                                var seekElement = _this7.player.elements.progress;
                                if (is$1.element(seekElement)) {
                                    var cuePercentage = 100 / _this7.player.duration * cuePoint;
                                    var cue = createElement("span", {
                                        class: _this7.player.config.classNames.cues
                                    });
                                    cue.style.left = "".concat(cuePercentage.toString(), "%");
                                    seekElement.appendChild(cue);
                                }
                            }
                        }));
                    }
                }, {
                    key: "onAdEvent",
                    value: function onAdEvent(event) {
                        var _this8 = this;
                        var container = this.player.elements.container;
                        var ad = event.getAd();
                        var adData = event.getAdData();
                        var dispatchEvent = function dispatchEvent(type) {
                            triggerEvent.call(_this8.player, _this8.player.media, "ads".concat(type.replace(/_/g, "").toLowerCase()));
                        };
                        dispatchEvent(event.type);
                        switch (event.type) {
                          case google.ima.AdEvent.Type.LOADED:
                            this.trigger("loaded");
                            this.pollCountdown(true);
                            if (!ad.isLinear()) {
                                ad.width = container.offsetWidth;
                                ad.height = container.offsetHeight;
                            }
                            break;

                          case google.ima.AdEvent.Type.STARTED:
                            this.manager.setVolume(this.player.volume);
                            break;

                          case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                            if (this.player.ended) this.loadAds(); else this.loader.contentComplete();
                            break;

                          case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                            this.pauseContent();
                            break;

                          case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                            this.pollCountdown();
                            this.resumeContent();
                            break;

                          case google.ima.AdEvent.Type.LOG:
                            if (adData.adError) this.player.debug.warn("Non-fatal ad error: ".concat(adData.adError.getMessage()));
                            break;
                        }
                    }
                }, {
                    key: "onAdError",
                    value: function onAdError(event) {
                        this.cancel();
                        this.player.debug.warn("Ads error", event);
                    }
                }, {
                    key: "listeners",
                    value: function listeners() {
                        var _this9 = this;
                        var container = this.player.elements.container;
                        var time;
                        this.player.on("canplay", (function() {
                            _this9.addCuePoints();
                        }));
                        this.player.on("ended", (function() {
                            _this9.loader.contentComplete();
                        }));
                        this.player.on("timeupdate", (function() {
                            time = _this9.player.currentTime;
                        }));
                        this.player.on("seeked", (function() {
                            var seekedTime = _this9.player.currentTime;
                            if (is$1.empty(_this9.cuePoints)) return;
                            _this9.cuePoints.forEach((function(cuePoint, index) {
                                if (time < cuePoint && cuePoint < seekedTime) {
                                    _this9.manager.discardAdBreak();
                                    _this9.cuePoints.splice(index, 1);
                                }
                            }));
                        }));
                        window.addEventListener("resize", (function() {
                            if (_this9.manager) _this9.manager.resize(container.offsetWidth, container.offsetHeight, google.ima.ViewMode.NORMAL);
                        }));
                    }
                }, {
                    key: "play",
                    value: function play() {
                        var _this10 = this;
                        var container = this.player.elements.container;
                        if (!this.managerPromise) this.resumeContent();
                        this.managerPromise.then((function() {
                            _this10.manager.setVolume(_this10.player.volume);
                            _this10.elements.displayContainer.initialize();
                            try {
                                if (!_this10.initialized) {
                                    _this10.manager.init(container.offsetWidth, container.offsetHeight, google.ima.ViewMode.NORMAL);
                                    _this10.manager.start();
                                }
                                _this10.initialized = true;
                            } catch (adError) {
                                _this10.onAdError(adError);
                            }
                        })).catch((function() {}));
                    }
                }, {
                    key: "resumeContent",
                    value: function resumeContent() {
                        this.elements.container.style.zIndex = "";
                        this.playing = false;
                        silencePromise(this.player.media.play());
                    }
                }, {
                    key: "pauseContent",
                    value: function pauseContent() {
                        this.elements.container.style.zIndex = 3;
                        this.playing = true;
                        this.player.media.pause();
                    }
                }, {
                    key: "cancel",
                    value: function cancel() {
                        if (this.initialized) this.resumeContent();
                        this.trigger("error");
                        this.loadAds();
                    }
                }, {
                    key: "loadAds",
                    value: function loadAds() {
                        var _this11 = this;
                        this.managerPromise.then((function() {
                            if (_this11.manager) _this11.manager.destroy();
                            _this11.managerPromise = new Promise((function(resolve) {
                                _this11.on("loaded", resolve);
                                _this11.player.debug.log(_this11.manager);
                            }));
                            _this11.initialized = false;
                            _this11.requestAds();
                        })).catch((function() {}));
                    }
                }, {
                    key: "trigger",
                    value: function trigger(event) {
                        var _this12 = this;
                        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
                        var handlers = this.events[event];
                        if (is$1.array(handlers)) handlers.forEach((function(handler) {
                            if (is$1.function(handler)) handler.apply(_this12, args);
                        }));
                    }
                }, {
                    key: "on",
                    value: function on(event, callback) {
                        if (!is$1.array(this.events[event])) this.events[event] = [];
                        this.events[event].push(callback);
                        return this;
                    }
                }, {
                    key: "startSafetyTimer",
                    value: function startSafetyTimer(time, from) {
                        var _this13 = this;
                        this.player.debug.log("Safety timer invoked from: ".concat(from));
                        this.safetyTimer = setTimeout((function() {
                            _this13.cancel();
                            _this13.clearSafetyTimer("startSafetyTimer()");
                        }), time);
                    }
                }, {
                    key: "clearSafetyTimer",
                    value: function clearSafetyTimer(from) {
                        if (!is$1.nullOrUndefined(this.safetyTimer)) {
                            this.player.debug.log("Safety timer cleared from: ".concat(from));
                            clearTimeout(this.safetyTimer);
                            this.safetyTimer = null;
                        }
                    }
                }, {
                    key: "enabled",
                    get: function get() {
                        var config = this.config;
                        return this.player.isHTML5 && this.player.isVideo && config.enabled && (!is$1.empty(config.publisherId) || is$1.url(config.tagUrl));
                    }
                }, {
                    key: "tagUrl",
                    get: function get() {
                        var config = this.config;
                        if (is$1.url(config.tagUrl)) return config.tagUrl;
                        var params = {
                            AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
                            AV_CHANNELID: "5a0458dc28a06145e4519d21",
                            AV_URL: window.location.hostname,
                            cb: Date.now(),
                            AV_WIDTH: 640,
                            AV_HEIGHT: 480,
                            AV_CDIM2: config.publisherId
                        };
                        var base = "https://go.aniview.com/api/adserver6/vast/";
                        return "".concat(base, "?").concat(buildUrlParams(params));
                    }
                } ]);
                return Ads;
            }();
            var parseVtt = function parseVtt(vttDataString) {
                var processedList = [];
                var frames = vttDataString.split(/\r\n\r\n|\n\n|\r\r/);
                frames.forEach((function(frame) {
                    var result = {};
                    var lines = frame.split(/\r\n|\n|\r/);
                    lines.forEach((function(line) {
                        if (!is$1.number(result.startTime)) {
                            var matchTimes = line.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);
                            if (matchTimes) {
                                result.startTime = 60 * Number(matchTimes[1] || 0) * 60 + 60 * Number(matchTimes[2]) + Number(matchTimes[3]) + Number("0.".concat(matchTimes[4]));
                                result.endTime = 60 * Number(matchTimes[6] || 0) * 60 + 60 * Number(matchTimes[7]) + Number(matchTimes[8]) + Number("0.".concat(matchTimes[9]));
                            }
                        } else if (!is$1.empty(line.trim()) && is$1.empty(result.text)) {
                            var lineSplit = line.trim().split("#xywh=");
                            var _lineSplit = _slicedToArray(lineSplit, 1);
                            result.text = _lineSplit[0];
                            if (lineSplit[1]) {
                                var _lineSplit$1$split = lineSplit[1].split(",");
                                var _lineSplit$1$split2 = _slicedToArray(_lineSplit$1$split, 4);
                                result.x = _lineSplit$1$split2[0];
                                result.y = _lineSplit$1$split2[1];
                                result.w = _lineSplit$1$split2[2];
                                result.h = _lineSplit$1$split2[3];
                            }
                        }
                    }));
                    if (result.text) processedList.push(result);
                }));
                return processedList;
            };
            var fitRatio = function fitRatio(ratio, outer) {
                var targetRatio = outer.width / outer.height;
                var result = {};
                if (ratio > targetRatio) {
                    result.width = outer.width;
                    result.height = 1 / ratio * outer.width;
                } else {
                    result.height = outer.height;
                    result.width = ratio * outer.height;
                }
                return result;
            };
            var PreviewThumbnails = function() {
                function PreviewThumbnails(player) {
                    _classCallCheck(this, PreviewThumbnails);
                    this.player = player;
                    this.thumbnails = [];
                    this.loaded = false;
                    this.lastMouseMoveTime = Date.now();
                    this.mouseDown = false;
                    this.loadedImages = [];
                    this.elements = {
                        thumb: {},
                        scrubbing: {}
                    };
                    this.load();
                }
                _createClass(PreviewThumbnails, [ {
                    key: "load",
                    value: function load() {
                        var _this = this;
                        if (this.player.elements.display.seekTooltip) this.player.elements.display.seekTooltip.hidden = this.enabled;
                        if (!this.enabled) return;
                        this.getThumbnails().then((function() {
                            if (!_this.enabled) return;
                            _this.render();
                            _this.determineContainerAutoSizing();
                            _this.loaded = true;
                        }));
                    }
                }, {
                    key: "getThumbnails",
                    value: function getThumbnails() {
                        var _this2 = this;
                        return new Promise((function(resolve) {
                            var src = _this2.player.config.previewThumbnails.src;
                            if (is$1.empty(src)) throw new Error("Missing previewThumbnails.src config attribute");
                            var sortAndResolve = function sortAndResolve() {
                                _this2.thumbnails.sort((function(x, y) {
                                    return x.height - y.height;
                                }));
                                _this2.player.debug.log("Preview thumbnails", _this2.thumbnails);
                                resolve();
                            };
                            if (is$1.function(src)) src((function(thumbnails) {
                                _this2.thumbnails = thumbnails;
                                sortAndResolve();
                            })); else {
                                var urls = is$1.string(src) ? [ src ] : src;
                                var promises = urls.map((function(u) {
                                    return _this2.getThumbnail(u);
                                }));
                                Promise.all(promises).then(sortAndResolve);
                            }
                        }));
                    }
                }, {
                    key: "getThumbnail",
                    value: function getThumbnail(url) {
                        var _this3 = this;
                        return new Promise((function(resolve) {
                            fetch(url).then((function(response) {
                                var thumbnail = {
                                    frames: parseVtt(response),
                                    height: null,
                                    urlPrefix: ""
                                };
                                if (!thumbnail.frames[0].text.startsWith("/") && !thumbnail.frames[0].text.startsWith("http://") && !thumbnail.frames[0].text.startsWith("https://")) thumbnail.urlPrefix = url.substring(0, url.lastIndexOf("/") + 1);
                                var tempImage = new Image;
                                tempImage.onload = function() {
                                    thumbnail.height = tempImage.naturalHeight;
                                    thumbnail.width = tempImage.naturalWidth;
                                    _this3.thumbnails.push(thumbnail);
                                    resolve();
                                };
                                tempImage.src = thumbnail.urlPrefix + thumbnail.frames[0].text;
                            }));
                        }));
                    }
                }, {
                    key: "startMove",
                    value: function startMove(event) {
                        if (!this.loaded) return;
                        if (!is$1.event(event) || ![ "touchmove", "mousemove" ].includes(event.type)) return;
                        if (!this.player.media.duration) return;
                        if ("touchmove" === event.type) this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100); else {
                            var clientRect = this.player.elements.progress.getBoundingClientRect();
                            var percentage = 100 / clientRect.width * (event.pageX - clientRect.left);
                            this.seekTime = this.player.media.duration * (percentage / 100);
                            if (this.seekTime < 0) this.seekTime = 0;
                            if (this.seekTime > this.player.media.duration - 1) this.seekTime = this.player.media.duration - 1;
                            this.mousePosX = event.pageX;
                            this.elements.thumb.time.innerText = formatTime(this.seekTime);
                        }
                        this.showImageAtCurrentTime();
                    }
                }, {
                    key: "endMove",
                    value: function endMove() {
                        this.toggleThumbContainer(false, true);
                    }
                }, {
                    key: "startScrubbing",
                    value: function startScrubbing(event) {
                        if (is$1.nullOrUndefined(event.button) || false === event.button || 0 === event.button) {
                            this.mouseDown = true;
                            if (this.player.media.duration) {
                                this.toggleScrubbingContainer(true);
                                this.toggleThumbContainer(false, true);
                                this.showImageAtCurrentTime();
                            }
                        }
                    }
                }, {
                    key: "endScrubbing",
                    value: function endScrubbing() {
                        var _this4 = this;
                        this.mouseDown = false;
                        if (Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime)) this.toggleScrubbingContainer(false); else once.call(this.player, this.player.media, "timeupdate", (function() {
                            if (!_this4.mouseDown) _this4.toggleScrubbingContainer(false);
                        }));
                    }
                }, {
                    key: "listeners",
                    value: function listeners() {
                        var _this5 = this;
                        this.player.on("play", (function() {
                            _this5.toggleThumbContainer(false, true);
                        }));
                        this.player.on("seeked", (function() {
                            _this5.toggleThumbContainer(false);
                        }));
                        this.player.on("timeupdate", (function() {
                            _this5.lastTime = _this5.player.media.currentTime;
                        }));
                    }
                }, {
                    key: "render",
                    value: function render() {
                        this.elements.thumb.container = createElement("div", {
                            class: this.player.config.classNames.previewThumbnails.thumbContainer
                        });
                        this.elements.thumb.imageContainer = createElement("div", {
                            class: this.player.config.classNames.previewThumbnails.imageContainer
                        });
                        this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
                        var timeContainer = createElement("div", {
                            class: this.player.config.classNames.previewThumbnails.timeContainer
                        });
                        this.elements.thumb.time = createElement("span", {}, "00:00");
                        timeContainer.appendChild(this.elements.thumb.time);
                        this.elements.thumb.container.appendChild(timeContainer);
                        if (is$1.element(this.player.elements.progress)) this.player.elements.progress.appendChild(this.elements.thumb.container);
                        this.elements.scrubbing.container = createElement("div", {
                            class: this.player.config.classNames.previewThumbnails.scrubbingContainer
                        });
                        this.player.elements.wrapper.appendChild(this.elements.scrubbing.container);
                    }
                }, {
                    key: "destroy",
                    value: function destroy() {
                        if (this.elements.thumb.container) this.elements.thumb.container.remove();
                        if (this.elements.scrubbing.container) this.elements.scrubbing.container.remove();
                    }
                }, {
                    key: "showImageAtCurrentTime",
                    value: function showImageAtCurrentTime() {
                        var _this6 = this;
                        if (this.mouseDown) this.setScrubbingContainerSize(); else this.setThumbContainerSizeAndPos();
                        var thumbNum = this.thumbnails[0].frames.findIndex((function(frame) {
                            return _this6.seekTime >= frame.startTime && _this6.seekTime <= frame.endTime;
                        }));
                        var hasThumb = thumbNum >= 0;
                        var qualityIndex = 0;
                        if (!this.mouseDown) this.toggleThumbContainer(hasThumb);
                        if (!hasThumb) return;
                        this.thumbnails.forEach((function(thumbnail, index) {
                            if (_this6.loadedImages.includes(thumbnail.frames[thumbNum].text)) qualityIndex = index;
                        }));
                        if (thumbNum !== this.showingThumb) {
                            this.showingThumb = thumbNum;
                            this.loadImage(qualityIndex);
                        }
                    }
                }, {
                    key: "loadImage",
                    value: function loadImage() {
                        var _this7 = this;
                        var qualityIndex = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                        var thumbNum = this.showingThumb;
                        var thumbnail = this.thumbnails[qualityIndex];
                        var urlPrefix = thumbnail.urlPrefix;
                        var frame = thumbnail.frames[thumbNum];
                        var thumbFilename = thumbnail.frames[thumbNum].text;
                        var thumbUrl = urlPrefix + thumbFilename;
                        if (!this.currentImageElement || this.currentImageElement.dataset.filename !== thumbFilename) {
                            if (this.loadingImage && this.usingSprites) this.loadingImage.onload = null;
                            var previewImage = new Image;
                            previewImage.src = thumbUrl;
                            previewImage.dataset.index = thumbNum;
                            previewImage.dataset.filename = thumbFilename;
                            this.showingThumbFilename = thumbFilename;
                            this.player.debug.log("Loading image: ".concat(thumbUrl));
                            previewImage.onload = function() {
                                return _this7.showImage(previewImage, frame, qualityIndex, thumbNum, thumbFilename, true);
                            };
                            this.loadingImage = previewImage;
                            this.removeOldImages(previewImage);
                        } else {
                            this.showImage(this.currentImageElement, frame, qualityIndex, thumbNum, thumbFilename, false);
                            this.currentImageElement.dataset.index = thumbNum;
                            this.removeOldImages(this.currentImageElement);
                        }
                    }
                }, {
                    key: "showImage",
                    value: function showImage(previewImage, frame, qualityIndex, thumbNum, thumbFilename) {
                        var newImage = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : true;
                        this.player.debug.log("Showing thumb: ".concat(thumbFilename, ". num: ").concat(thumbNum, ". qual: ").concat(qualityIndex, ". newimg: ").concat(newImage));
                        this.setImageSizeAndOffset(previewImage, frame);
                        if (newImage) {
                            this.currentImageContainer.appendChild(previewImage);
                            this.currentImageElement = previewImage;
                            if (!this.loadedImages.includes(thumbFilename)) this.loadedImages.push(thumbFilename);
                        }
                        this.preloadNearby(thumbNum, true).then(this.preloadNearby(thumbNum, false)).then(this.getHigherQuality(qualityIndex, previewImage, frame, thumbFilename));
                    }
                }, {
                    key: "removeOldImages",
                    value: function removeOldImages(currentImage) {
                        var _this8 = this;
                        Array.from(this.currentImageContainer.children).forEach((function(image) {
                            if ("img" !== image.tagName.toLowerCase()) return;
                            var removeDelay = _this8.usingSprites ? 500 : 1e3;
                            if (image.dataset.index !== currentImage.dataset.index && !image.dataset.deleting) {
                                image.dataset.deleting = true;
                                var currentImageContainer = _this8.currentImageContainer;
                                setTimeout((function() {
                                    currentImageContainer.removeChild(image);
                                    _this8.player.debug.log("Removing thumb: ".concat(image.dataset.filename));
                                }), removeDelay);
                            }
                        }));
                    }
                }, {
                    key: "preloadNearby",
                    value: function preloadNearby(thumbNum) {
                        var _this9 = this;
                        var forward = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : true;
                        return new Promise((function(resolve) {
                            setTimeout((function() {
                                var oldThumbFilename = _this9.thumbnails[0].frames[thumbNum].text;
                                if (_this9.showingThumbFilename === oldThumbFilename) {
                                    var thumbnailsClone;
                                    if (forward) thumbnailsClone = _this9.thumbnails[0].frames.slice(thumbNum); else thumbnailsClone = _this9.thumbnails[0].frames.slice(0, thumbNum).reverse();
                                    var foundOne = false;
                                    thumbnailsClone.forEach((function(frame) {
                                        var newThumbFilename = frame.text;
                                        if (newThumbFilename !== oldThumbFilename) if (!_this9.loadedImages.includes(newThumbFilename)) {
                                            foundOne = true;
                                            _this9.player.debug.log("Preloading thumb filename: ".concat(newThumbFilename));
                                            var urlPrefix = _this9.thumbnails[0].urlPrefix;
                                            var thumbURL = urlPrefix + newThumbFilename;
                                            var previewImage = new Image;
                                            previewImage.src = thumbURL;
                                            previewImage.onload = function() {
                                                _this9.player.debug.log("Preloaded thumb filename: ".concat(newThumbFilename));
                                                if (!_this9.loadedImages.includes(newThumbFilename)) _this9.loadedImages.push(newThumbFilename);
                                                resolve();
                                            };
                                        }
                                    }));
                                    if (!foundOne) resolve();
                                }
                            }), 300);
                        }));
                    }
                }, {
                    key: "getHigherQuality",
                    value: function getHigherQuality(currentQualityIndex, previewImage, frame, thumbFilename) {
                        var _this10 = this;
                        if (currentQualityIndex < this.thumbnails.length - 1) {
                            var previewImageHeight = previewImage.naturalHeight;
                            if (this.usingSprites) previewImageHeight = frame.h;
                            if (previewImageHeight < this.thumbContainerHeight) setTimeout((function() {
                                if (_this10.showingThumbFilename === thumbFilename) {
                                    _this10.player.debug.log("Showing higher quality thumb for: ".concat(thumbFilename));
                                    _this10.loadImage(currentQualityIndex + 1);
                                }
                            }), 300);
                        }
                    }
                }, {
                    key: "toggleThumbContainer",
                    value: function toggleThumbContainer() {
                        var toggle = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
                        var clearShowing = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
                        var className = this.player.config.classNames.previewThumbnails.thumbContainerShown;
                        this.elements.thumb.container.classList.toggle(className, toggle);
                        if (!toggle && clearShowing) {
                            this.showingThumb = null;
                            this.showingThumbFilename = null;
                        }
                    }
                }, {
                    key: "toggleScrubbingContainer",
                    value: function toggleScrubbingContainer() {
                        var toggle = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
                        var className = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
                        this.elements.scrubbing.container.classList.toggle(className, toggle);
                        if (!toggle) {
                            this.showingThumb = null;
                            this.showingThumbFilename = null;
                        }
                    }
                }, {
                    key: "determineContainerAutoSizing",
                    value: function determineContainerAutoSizing() {
                        if (this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20) this.sizeSpecifiedInCSS = true;
                    }
                }, {
                    key: "setThumbContainerSizeAndPos",
                    value: function setThumbContainerSizeAndPos() {
                        if (!this.sizeSpecifiedInCSS) {
                            var thumbWidth = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);
                            this.elements.thumb.imageContainer.style.height = "".concat(this.thumbContainerHeight, "px");
                            this.elements.thumb.imageContainer.style.width = "".concat(thumbWidth, "px");
                        } else if (this.elements.thumb.imageContainer.clientHeight > 20 && this.elements.thumb.imageContainer.clientWidth < 20) {
                            var _thumbWidth = Math.floor(this.elements.thumb.imageContainer.clientHeight * this.thumbAspectRatio);
                            this.elements.thumb.imageContainer.style.width = "".concat(_thumbWidth, "px");
                        } else if (this.elements.thumb.imageContainer.clientHeight < 20 && this.elements.thumb.imageContainer.clientWidth > 20) {
                            var thumbHeight = Math.floor(this.elements.thumb.imageContainer.clientWidth / this.thumbAspectRatio);
                            this.elements.thumb.imageContainer.style.height = "".concat(thumbHeight, "px");
                        }
                        this.setThumbContainerPos();
                    }
                }, {
                    key: "setThumbContainerPos",
                    value: function setThumbContainerPos() {
                        var seekbarRect = this.player.elements.progress.getBoundingClientRect();
                        var plyrRect = this.player.elements.container.getBoundingClientRect();
                        var container = this.elements.thumb.container;
                        var minVal = plyrRect.left - seekbarRect.left + 10;
                        var maxVal = plyrRect.right - seekbarRect.left - container.clientWidth - 10;
                        var previewPos = this.mousePosX - seekbarRect.left - container.clientWidth / 2;
                        if (previewPos < minVal) previewPos = minVal;
                        if (previewPos > maxVal) previewPos = maxVal;
                        container.style.left = "".concat(previewPos, "px");
                    }
                }, {
                    key: "setScrubbingContainerSize",
                    value: function setScrubbingContainerSize() {
                        var _fitRatio = fitRatio(this.thumbAspectRatio, {
                            width: this.player.media.clientWidth,
                            height: this.player.media.clientHeight
                        }), width = _fitRatio.width, height = _fitRatio.height;
                        this.elements.scrubbing.container.style.width = "".concat(width, "px");
                        this.elements.scrubbing.container.style.height = "".concat(height, "px");
                    }
                }, {
                    key: "setImageSizeAndOffset",
                    value: function setImageSizeAndOffset(previewImage, frame) {
                        if (!this.usingSprites) return;
                        var multiplier = this.thumbContainerHeight / frame.h;
                        previewImage.style.height = "".concat(previewImage.naturalHeight * multiplier, "px");
                        previewImage.style.width = "".concat(previewImage.naturalWidth * multiplier, "px");
                        previewImage.style.left = "-".concat(frame.x * multiplier, "px");
                        previewImage.style.top = "-".concat(frame.y * multiplier, "px");
                    }
                }, {
                    key: "enabled",
                    get: function get() {
                        return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled;
                    }
                }, {
                    key: "currentImageContainer",
                    get: function get() {
                        if (this.mouseDown) return this.elements.scrubbing.container;
                        return this.elements.thumb.imageContainer;
                    }
                }, {
                    key: "usingSprites",
                    get: function get() {
                        return Object.keys(this.thumbnails[0].frames[0]).includes("w");
                    }
                }, {
                    key: "thumbAspectRatio",
                    get: function get() {
                        if (this.usingSprites) return this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h;
                        return this.thumbnails[0].width / this.thumbnails[0].height;
                    }
                }, {
                    key: "thumbContainerHeight",
                    get: function get() {
                        if (this.mouseDown) {
                            var _fitRatio2 = fitRatio(this.thumbAspectRatio, {
                                width: this.player.media.clientWidth,
                                height: this.player.media.clientHeight
                            }), height = _fitRatio2.height;
                            return height;
                        }
                        if (this.sizeSpecifiedInCSS) return this.elements.thumb.imageContainer.clientHeight;
                        return Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4);
                    }
                }, {
                    key: "currentImageElement",
                    get: function get() {
                        if (this.mouseDown) return this.currentScrubbingImageElement;
                        return this.currentThumbnailImageElement;
                    },
                    set: function set(element) {
                        if (this.mouseDown) this.currentScrubbingImageElement = element; else this.currentThumbnailImageElement = element;
                    }
                } ]);
                return PreviewThumbnails;
            }();
            var source = {
                insertElements: function insertElements(type, attributes) {
                    var _this = this;
                    if (is$1.string(attributes)) insertElement(type, this.media, {
                        src: attributes
                    }); else if (is$1.array(attributes)) attributes.forEach((function(attribute) {
                        insertElement(type, _this.media, attribute);
                    }));
                },
                change: function change(input) {
                    var _this2 = this;
                    if (!getDeep(input, "sources.length")) {
                        this.debug.warn("Invalid source format");
                        return;
                    }
                    html5.cancelRequests.call(this);
                    this.destroy.call(this, (function() {
                        _this2.options.quality = [];
                        removeElement(_this2.media);
                        _this2.media = null;
                        if (is$1.element(_this2.elements.container)) _this2.elements.container.removeAttribute("class");
                        var sources = input.sources, type = input.type;
                        var _sources = _slicedToArray(sources, 1), _sources$ = _sources[0], _sources$$provider = _sources$.provider, provider = void 0 === _sources$$provider ? providers.html5 : _sources$$provider, src = _sources$.src;
                        var tagName = "html5" === provider ? type : "div";
                        var attributes = "html5" === provider ? {} : {
                            src
                        };
                        Object.assign(_this2, {
                            provider,
                            type,
                            supported: support.check(type, provider, _this2.config.playsinline),
                            media: createElement(tagName, attributes)
                        });
                        _this2.elements.container.appendChild(_this2.media);
                        if (is$1.boolean(input.autoplay)) _this2.config.autoplay = input.autoplay;
                        if (_this2.isHTML5) {
                            if (_this2.config.crossorigin) _this2.media.setAttribute("crossorigin", "");
                            if (_this2.config.autoplay) _this2.media.setAttribute("autoplay", "");
                            if (!is$1.empty(input.poster)) _this2.poster = input.poster;
                            if (_this2.config.loop.active) _this2.media.setAttribute("loop", "");
                            if (_this2.config.muted) _this2.media.setAttribute("muted", "");
                            if (_this2.config.playsinline) _this2.media.setAttribute("playsinline", "");
                        }
                        ui.addStyleHook.call(_this2);
                        if (_this2.isHTML5) source.insertElements.call(_this2, "source", sources);
                        _this2.config.title = input.title;
                        media.setup.call(_this2);
                        if (_this2.isHTML5) if (Object.keys(input).includes("tracks")) source.insertElements.call(_this2, "track", input.tracks);
                        if (_this2.isHTML5 || _this2.isEmbed && !_this2.supported.ui) ui.build.call(_this2);
                        if (_this2.isHTML5) _this2.media.load();
                        if (!is$1.empty(input.previewThumbnails)) {
                            Object.assign(_this2.config.previewThumbnails, input.previewThumbnails);
                            if (_this2.previewThumbnails && _this2.previewThumbnails.loaded) {
                                _this2.previewThumbnails.destroy();
                                _this2.previewThumbnails = null;
                            }
                            if (_this2.config.previewThumbnails.enabled) _this2.previewThumbnails = new PreviewThumbnails(_this2);
                        }
                        _this2.fullscreen.update();
                    }), true);
                }
            };
            function clamp() {
                var input = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                var min = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                var max = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 255;
                return Math.min(Math.max(input, min), max);
            }
            var Plyr = function() {
                function Plyr(target, options) {
                    var _this = this;
                    _classCallCheck(this, Plyr);
                    this.timers = {};
                    this.ready = false;
                    this.loading = false;
                    this.failed = false;
                    this.touch = support.touch;
                    this.media = target;
                    if (is$1.string(this.media)) this.media = document.querySelectorAll(this.media);
                    if (window.jQuery && this.media instanceof jQuery || is$1.nodeList(this.media) || is$1.array(this.media)) this.media = this.media[0];
                    this.config = extend({}, defaults$1, Plyr.defaults, options || {}, function() {
                        try {
                            return JSON.parse(_this.media.getAttribute("data-plyr-config"));
                        } catch (e) {
                            return {};
                        }
                    }());
                    this.elements = {
                        container: null,
                        fullscreen: null,
                        captions: null,
                        buttons: {},
                        display: {},
                        progress: {},
                        inputs: {},
                        settings: {
                            popup: null,
                            menu: null,
                            panels: {},
                            buttons: {}
                        }
                    };
                    this.captions = {
                        active: null,
                        currentTrack: -1,
                        meta: new WeakMap
                    };
                    this.fullscreen = {
                        active: false
                    };
                    this.options = {
                        speed: [],
                        quality: []
                    };
                    this.debug = new Console(this.config.debug);
                    this.debug.log("Config", this.config);
                    this.debug.log("Support", support);
                    if (is$1.nullOrUndefined(this.media) || !is$1.element(this.media)) {
                        this.debug.error("Setup failed: no suitable element passed");
                        return;
                    }
                    if (this.media.plyr) {
                        this.debug.warn("Target already setup");
                        return;
                    }
                    if (!this.config.enabled) {
                        this.debug.error("Setup failed: disabled by config");
                        return;
                    }
                    if (!support.check().api) {
                        this.debug.error("Setup failed: no support");
                        return;
                    }
                    var clone = this.media.cloneNode(true);
                    clone.autoplay = false;
                    this.elements.original = clone;
                    var type = this.media.tagName.toLowerCase();
                    var iframe = null;
                    var url = null;
                    switch (type) {
                      case "div":
                        iframe = this.media.querySelector("iframe");
                        if (is$1.element(iframe)) {
                            url = parseUrl(iframe.getAttribute("src"));
                            this.provider = getProviderByUrl(url.toString());
                            this.elements.container = this.media;
                            this.media = iframe;
                            this.elements.container.className = "";
                            if (url.search.length) {
                                var truthy = [ "1", "true" ];
                                if (truthy.includes(url.searchParams.get("autoplay"))) this.config.autoplay = true;
                                if (truthy.includes(url.searchParams.get("loop"))) this.config.loop.active = true;
                                if (this.isYouTube) {
                                    this.config.playsinline = truthy.includes(url.searchParams.get("playsinline"));
                                    this.config.youtube.hl = url.searchParams.get("hl");
                                } else this.config.playsinline = true;
                            }
                        } else {
                            this.provider = this.media.getAttribute(this.config.attributes.embed.provider);
                            this.media.removeAttribute(this.config.attributes.embed.provider);
                        }
                        if (is$1.empty(this.provider) || !Object.keys(providers).includes(this.provider)) {
                            this.debug.error("Setup failed: Invalid provider");
                            return;
                        }
                        this.type = types.video;
                        break;

                      case "video":
                      case "audio":
                        this.type = type;
                        this.provider = providers.html5;
                        if (this.media.hasAttribute("crossorigin")) this.config.crossorigin = true;
                        if (this.media.hasAttribute("autoplay")) this.config.autoplay = true;
                        if (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) this.config.playsinline = true;
                        if (this.media.hasAttribute("muted")) this.config.muted = true;
                        if (this.media.hasAttribute("loop")) this.config.loop.active = true;
                        break;

                      default:
                        this.debug.error("Setup failed: unsupported type");
                        return;
                    }
                    this.supported = support.check(this.type, this.provider, this.config.playsinline);
                    if (!this.supported.api) {
                        this.debug.error("Setup failed: no support");
                        return;
                    }
                    this.eventListeners = [];
                    this.listeners = new Listeners(this);
                    this.storage = new Storage(this);
                    this.media.plyr = this;
                    if (!is$1.element(this.elements.container)) {
                        this.elements.container = createElement("div", {
                            tabindex: 0
                        });
                        wrap(this.media, this.elements.container);
                    }
                    ui.migrateStyles.call(this);
                    ui.addStyleHook.call(this);
                    media.setup.call(this);
                    if (this.config.debug) on.call(this, this.elements.container, this.config.events.join(" "), (function(event) {
                        _this.debug.log("event: ".concat(event.type));
                    }));
                    this.fullscreen = new Fullscreen(this);
                    if (this.isHTML5 || this.isEmbed && !this.supported.ui) ui.build.call(this);
                    this.listeners.container();
                    this.listeners.global();
                    if (this.config.ads.enabled) this.ads = new Ads(this);
                    if (this.isHTML5 && this.config.autoplay) this.once("canplay", (function() {
                        return silencePromise(_this.play());
                    }));
                    this.lastSeekTime = 0;
                    if (this.config.previewThumbnails.enabled) this.previewThumbnails = new PreviewThumbnails(this);
                }
                _createClass(Plyr, [ {
                    key: "play",
                    value: function play() {
                        var _this2 = this;
                        if (!is$1.function(this.media.play)) return null;
                        if (this.ads && this.ads.enabled) this.ads.managerPromise.then((function() {
                            return _this2.ads.play();
                        })).catch((function() {
                            return silencePromise(_this2.media.play());
                        }));
                        return this.media.play();
                    }
                }, {
                    key: "pause",
                    value: function pause() {
                        if (!this.playing || !is$1.function(this.media.pause)) return null;
                        return this.media.pause();
                    }
                }, {
                    key: "togglePlay",
                    value: function togglePlay(input) {
                        var toggle = is$1.boolean(input) ? input : !this.playing;
                        if (toggle) return this.play();
                        return this.pause();
                    }
                }, {
                    key: "stop",
                    value: function stop() {
                        if (this.isHTML5) {
                            this.pause();
                            this.restart();
                        } else if (is$1.function(this.media.stop)) this.media.stop();
                    }
                }, {
                    key: "restart",
                    value: function restart() {
                        this.currentTime = 0;
                    }
                }, {
                    key: "rewind",
                    value: function rewind(seekTime) {
                        this.currentTime -= is$1.number(seekTime) ? seekTime : this.config.seekTime;
                    }
                }, {
                    key: "forward",
                    value: function forward(seekTime) {
                        this.currentTime += is$1.number(seekTime) ? seekTime : this.config.seekTime;
                    }
                }, {
                    key: "increaseVolume",
                    value: function increaseVolume(step) {
                        var volume = this.media.muted ? 0 : this.volume;
                        this.volume = volume + (is$1.number(step) ? step : 0);
                    }
                }, {
                    key: "decreaseVolume",
                    value: function decreaseVolume(step) {
                        this.increaseVolume(-step);
                    }
                }, {
                    key: "toggleCaptions",
                    value: function toggleCaptions(input) {
                        captions.toggle.call(this, input, false);
                    }
                }, {
                    key: "airplay",
                    value: function airplay() {
                        if (support.airplay) this.media.webkitShowPlaybackTargetPicker();
                    }
                }, {
                    key: "toggleControls",
                    value: function toggleControls(toggle) {
                        if (this.supported.ui && !this.isAudio) {
                            var isHidden = hasClass(this.elements.container, this.config.classNames.hideControls);
                            var force = "undefined" === typeof toggle ? void 0 : !toggle;
                            var hiding = toggleClass(this.elements.container, this.config.classNames.hideControls, force);
                            if (hiding && is$1.array(this.config.controls) && this.config.controls.includes("settings") && !is$1.empty(this.config.settings)) controls.toggleMenu.call(this, false);
                            if (hiding !== isHidden) {
                                var eventName = hiding ? "controlshidden" : "controlsshown";
                                triggerEvent.call(this, this.media, eventName);
                            }
                            return !hiding;
                        }
                        return false;
                    }
                }, {
                    key: "on",
                    value: function on$1(event, callback) {
                        on.call(this, this.elements.container, event, callback);
                    }
                }, {
                    key: "once",
                    value: function once$1(event, callback) {
                        once.call(this, this.elements.container, event, callback);
                    }
                }, {
                    key: "off",
                    value: function off$1(event, callback) {
                        off(this.elements.container, event, callback);
                    }
                }, {
                    key: "destroy",
                    value: function destroy(callback) {
                        var _this3 = this;
                        var soft = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
                        if (!this.ready) return;
                        var done = function done() {
                            document.body.style.overflow = "";
                            _this3.embed = null;
                            if (soft) {
                                if (Object.keys(_this3.elements).length) {
                                    removeElement(_this3.elements.buttons.play);
                                    removeElement(_this3.elements.captions);
                                    removeElement(_this3.elements.controls);
                                    removeElement(_this3.elements.wrapper);
                                    _this3.elements.buttons.play = null;
                                    _this3.elements.captions = null;
                                    _this3.elements.controls = null;
                                    _this3.elements.wrapper = null;
                                }
                                if (is$1.function(callback)) callback();
                            } else {
                                unbindListeners.call(_this3);
                                html5.cancelRequests.call(_this3);
                                replaceElement(_this3.elements.original, _this3.elements.container);
                                triggerEvent.call(_this3, _this3.elements.original, "destroyed", true);
                                if (is$1.function(callback)) callback.call(_this3.elements.original);
                                _this3.ready = false;
                                setTimeout((function() {
                                    _this3.elements = null;
                                    _this3.media = null;
                                }), 200);
                            }
                        };
                        this.stop();
                        clearTimeout(this.timers.loading);
                        clearTimeout(this.timers.controls);
                        clearTimeout(this.timers.resized);
                        if (this.isHTML5) {
                            ui.toggleNativeControls.call(this, true);
                            done();
                        } else if (this.isYouTube) {
                            clearInterval(this.timers.buffering);
                            clearInterval(this.timers.playing);
                            if (null !== this.embed && is$1.function(this.embed.destroy)) this.embed.destroy();
                            done();
                        } else if (this.isVimeo) {
                            if (null !== this.embed) this.embed.unload().then(done);
                            setTimeout(done, 200);
                        }
                    }
                }, {
                    key: "supports",
                    value: function supports(type) {
                        return support.mime.call(this, type);
                    }
                }, {
                    key: "isHTML5",
                    get: function get() {
                        return this.provider === providers.html5;
                    }
                }, {
                    key: "isEmbed",
                    get: function get() {
                        return this.isYouTube || this.isVimeo;
                    }
                }, {
                    key: "isYouTube",
                    get: function get() {
                        return this.provider === providers.youtube;
                    }
                }, {
                    key: "isVimeo",
                    get: function get() {
                        return this.provider === providers.vimeo;
                    }
                }, {
                    key: "isVideo",
                    get: function get() {
                        return this.type === types.video;
                    }
                }, {
                    key: "isAudio",
                    get: function get() {
                        return this.type === types.audio;
                    }
                }, {
                    key: "playing",
                    get: function get() {
                        return Boolean(this.ready && !this.paused && !this.ended);
                    }
                }, {
                    key: "paused",
                    get: function get() {
                        return Boolean(this.media.paused);
                    }
                }, {
                    key: "stopped",
                    get: function get() {
                        return Boolean(this.paused && 0 === this.currentTime);
                    }
                }, {
                    key: "ended",
                    get: function get() {
                        return Boolean(this.media.ended);
                    }
                }, {
                    key: "currentTime",
                    set: function set(input) {
                        if (!this.duration) return;
                        var inputIsValid = is$1.number(input) && input > 0;
                        this.media.currentTime = inputIsValid ? Math.min(input, this.duration) : 0;
                        this.debug.log("Seeking to ".concat(this.currentTime, " seconds"));
                    },
                    get: function get() {
                        return Number(this.media.currentTime);
                    }
                }, {
                    key: "buffered",
                    get: function get() {
                        var buffered = this.media.buffered;
                        if (is$1.number(buffered)) return buffered;
                        if (buffered && buffered.length && this.duration > 0) return buffered.end(0) / this.duration;
                        return 0;
                    }
                }, {
                    key: "seeking",
                    get: function get() {
                        return Boolean(this.media.seeking);
                    }
                }, {
                    key: "duration",
                    get: function get() {
                        var fauxDuration = parseFloat(this.config.duration);
                        var realDuration = (this.media || {}).duration;
                        var duration = !is$1.number(realDuration) || realDuration === 1 / 0 ? 0 : realDuration;
                        return fauxDuration || duration;
                    }
                }, {
                    key: "volume",
                    set: function set(value) {
                        var volume = value;
                        var max = 1;
                        var min = 0;
                        if (is$1.string(volume)) volume = Number(volume);
                        if (!is$1.number(volume)) volume = this.storage.get("volume");
                        if (!is$1.number(volume)) volume = this.config.volume;
                        if (volume > max) volume = max;
                        if (volume < min) volume = min;
                        this.config.volume = volume;
                        this.media.volume = volume;
                        if (!is$1.empty(value) && this.muted && volume > 0) this.muted = false;
                    },
                    get: function get() {
                        return Number(this.media.volume);
                    }
                }, {
                    key: "muted",
                    set: function set(mute) {
                        var toggle = mute;
                        if (!is$1.boolean(toggle)) toggle = this.storage.get("muted");
                        if (!is$1.boolean(toggle)) toggle = this.config.muted;
                        this.config.muted = toggle;
                        this.media.muted = toggle;
                    },
                    get: function get() {
                        return Boolean(this.media.muted);
                    }
                }, {
                    key: "hasAudio",
                    get: function get() {
                        if (!this.isHTML5) return true;
                        if (this.isAudio) return true;
                        return Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length);
                    }
                }, {
                    key: "speed",
                    set: function set(input) {
                        var _this4 = this;
                        var speed = null;
                        if (is$1.number(input)) speed = input;
                        if (!is$1.number(speed)) speed = this.storage.get("speed");
                        if (!is$1.number(speed)) speed = this.config.speed.selected;
                        var min = this.minimumSpeed, max = this.maximumSpeed;
                        speed = clamp(speed, min, max);
                        this.config.speed.selected = speed;
                        setTimeout((function() {
                            _this4.media.playbackRate = speed;
                        }), 0);
                    },
                    get: function get() {
                        return Number(this.media.playbackRate);
                    }
                }, {
                    key: "minimumSpeed",
                    get: function get() {
                        if (this.isYouTube) return Math.min.apply(Math, _toConsumableArray(this.options.speed));
                        if (this.isVimeo) return .5;
                        return .0625;
                    }
                }, {
                    key: "maximumSpeed",
                    get: function get() {
                        if (this.isYouTube) return Math.max.apply(Math, _toConsumableArray(this.options.speed));
                        if (this.isVimeo) return 2;
                        return 16;
                    }
                }, {
                    key: "quality",
                    set: function set(input) {
                        var config = this.config.quality;
                        var options = this.options.quality;
                        if (!options.length) return;
                        var quality = [ !is$1.empty(input) && Number(input), this.storage.get("quality"), config.selected, config.default ].find(is$1.number);
                        var updateStorage = true;
                        if (!options.includes(quality)) {
                            var value = closest$1(options, quality);
                            this.debug.warn("Unsupported quality option: ".concat(quality, ", using ").concat(value, " instead"));
                            quality = value;
                            updateStorage = false;
                        }
                        config.selected = quality;
                        this.media.quality = quality;
                        if (updateStorage) this.storage.set({
                            quality
                        });
                    },
                    get: function get() {
                        return this.media.quality;
                    }
                }, {
                    key: "loop",
                    set: function set(input) {
                        var toggle = is$1.boolean(input) ? input : this.config.loop.active;
                        this.config.loop.active = toggle;
                        this.media.loop = toggle;
                    },
                    get: function get() {
                        return Boolean(this.media.loop);
                    }
                }, {
                    key: "source",
                    set: function set(input) {
                        source.change.call(this, input);
                    },
                    get: function get() {
                        return this.media.currentSrc;
                    }
                }, {
                    key: "download",
                    get: function get() {
                        var download = this.config.urls.download;
                        return is$1.url(download) ? download : this.source;
                    },
                    set: function set(input) {
                        if (!is$1.url(input)) return;
                        this.config.urls.download = input;
                        controls.setDownloadUrl.call(this);
                    }
                }, {
                    key: "poster",
                    set: function set(input) {
                        if (!this.isVideo) {
                            this.debug.warn("Poster can only be set for video");
                            return;
                        }
                        ui.setPoster.call(this, input, false).catch((function() {}));
                    },
                    get: function get() {
                        if (!this.isVideo) return null;
                        return this.media.getAttribute("poster") || this.media.getAttribute("data-poster");
                    }
                }, {
                    key: "ratio",
                    get: function get() {
                        if (!this.isVideo) return null;
                        var ratio = reduceAspectRatio(getAspectRatio.call(this));
                        return is$1.array(ratio) ? ratio.join(":") : ratio;
                    },
                    set: function set(input) {
                        if (!this.isVideo) {
                            this.debug.warn("Aspect ratio can only be set for video");
                            return;
                        }
                        if (!is$1.string(input) || !validateRatio(input)) {
                            this.debug.error("Invalid aspect ratio specified (".concat(input, ")"));
                            return;
                        }
                        this.config.ratio = input;
                        setAspectRatio.call(this);
                    }
                }, {
                    key: "autoplay",
                    set: function set(input) {
                        var toggle = is$1.boolean(input) ? input : this.config.autoplay;
                        this.config.autoplay = toggle;
                    },
                    get: function get() {
                        return Boolean(this.config.autoplay);
                    }
                }, {
                    key: "currentTrack",
                    set: function set(input) {
                        captions.set.call(this, input, false);
                    },
                    get: function get() {
                        var _this$captions = this.captions, toggled = _this$captions.toggled, currentTrack = _this$captions.currentTrack;
                        return toggled ? currentTrack : -1;
                    }
                }, {
                    key: "language",
                    set: function set(input) {
                        captions.setLanguage.call(this, input, false);
                    },
                    get: function get() {
                        return (captions.getCurrentTrack.call(this) || {}).language;
                    }
                }, {
                    key: "pip",
                    set: function set(input) {
                        if (!support.pip) return;
                        var toggle = is$1.boolean(input) ? input : !this.pip;
                        if (is$1.function(this.media.webkitSetPresentationMode)) this.media.webkitSetPresentationMode(toggle ? pip.active : pip.inactive);
                        if (is$1.function(this.media.requestPictureInPicture)) if (!this.pip && toggle) this.media.requestPictureInPicture(); else if (this.pip && !toggle) document.exitPictureInPicture();
                    },
                    get: function get() {
                        if (!support.pip) return null;
                        if (!is$1.empty(this.media.webkitPresentationMode)) return this.media.webkitPresentationMode === pip.active;
                        return this.media === document.pictureInPictureElement;
                    }
                } ], [ {
                    key: "supported",
                    value: function supported(type, provider, inline) {
                        return support.check(type, provider, inline);
                    }
                }, {
                    key: "loadSprite",
                    value: function loadSprite$1(url, id) {
                        return loadSprite(url, id);
                    }
                }, {
                    key: "setup",
                    value: function setup(selector) {
                        var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        var targets = null;
                        if (is$1.string(selector)) targets = Array.from(document.querySelectorAll(selector)); else if (is$1.nodeList(selector)) targets = Array.from(selector); else if (is$1.array(selector)) targets = selector.filter(is$1.element);
                        if (is$1.empty(targets)) return null;
                        return targets.map((function(t) {
                            return new Plyr(t, options);
                        }));
                    }
                } ]);
                return Plyr;
            }();
            Plyr.defaults = cloneDeep(defaults$1);
            return Plyr;
        }));
        const player = new Plyr("#player", {});
        const player2 = new Plyr("#youtube-1", {});
        var script_image = document.getElementsByClassName("main__parallax");
        new simpleParallax(script_image, {
            scale: 1.2,
            orientation: "up",
            overflow: true
        });
        const animItems = document.querySelectorAll(".animated");
        if (animItems.length > 0) {
            window.addEventListener("scroll", animOnScroll);
            function animOnScroll() {
                for (let index = 0; index < animItems.length; index++) {
                    const animItem = animItems[index];
                    const animItemHeight = animItem.offsetHeight;
                    const animItemOffset = offset(animItem).top;
                    const animStart = 1.3;
                    let animItemPoint = window.innerHeight - animItemHeight / animStart;
                    if (animItemHeight > window.innerHeight) animItemPoint = window.innerHeight - window.innerHeight / animStart;
                    if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) animItem.classList.add("_active");
                }
            }
            function offset(el) {
                const rect = el.getBoundingClientRect(), scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                return {
                    top: rect.top + scrollTop,
                    left: rect.left + scrollLeft
                };
            }
            setTimeout((() => {
                animOnScroll();
            }), 1e3);
        }
        window.addEventListener("resize", (function() {
            if (window.screen.availWidth > 768) {
                menuClose();
                const spollerTitle = document.querySelector(".additional__button-title");
                if (!spollerTitle.classList.contains("_spoller-active")) {
                    spollerTitle.classList.add("_spoller-active");
                    spollerTitle.nextElementSibling.hidden = false;
                }
            }
        }));
        document.addEventListener("click", documentActions);
        function documentActions(e) {
            const el = e.target;
            if (el.closest(".item-advantages")) {
                const itemAdvantagies = el.closest(".item-advantages");
                if (isMobile.any()) itemAdvantagies.classList.toggle("_show");
            }
            if (el.closest("._success")) {
                const form = el.closest("._success");
                if (form.classList.contains("_success")) form.classList.remove("_success");
            }
            if (!el.closest(".plyr")) {
                player.pause();
                player2.pause();
            }
            if (el.classList.contains("cookies__button")) el.closest(".cookies ").classList.add("_hide");
            if (el.classList.contains("additional__button-title") || el.closest(".additional__row-bot")) {
                const row = document.querySelector(".additional__row-bot");
                const cols = row.querySelectorAll(".additional__col");
                cols.forEach((col => {
                    const button = col.querySelector(".additional__button");
                    const buttonTitle = col.querySelector(".additional__button-title");
                    if (buttonTitle.classList.contains("_spoller-active")) {
                        button.style.minHeight = "100%";
                        button.classList.add("_active");
                    } else {
                        button.style.minHeight = null;
                        button.classList.remove("_active");
                    }
                }));
            }
        }
        document.addEventListener("mouseover", menuHover);
        function menuHover(e) {
            const el = e.target;
            if (el.classList.contains("menu__link")) {
                el.closest(".menu__list").classList.add("_hover");
                let menuHover = el.closest(".menu__list").querySelector(".menu__hover");
                let linkWidth = el.offsetWidth;
                var linkLeft = el.offsetLeft;
                menuHover.style.width = linkWidth + "px";
                menuHover.style.left = linkLeft + "px";
            }
            if (el.closest(".item-functions")) {
                const itemFunctions = el.closest(".item-functions");
                const itemsFunctions = document.querySelectorAll(".item-functions");
                const itemFunctionsText = itemFunctions.querySelector(".item-functions__text");
                const itemFunctionsP = itemFunctions.querySelector(".item-functions__text p");
                let textHeightP = itemFunctionsP.offsetHeight;
                if (textHeightP > 112) {
                    let textHeight = 112 + textHeightP;
                    itemFunctionsText.style.height = textHeight + "px";
                }
                itemsFunctions.forEach((itemFunctions => {
                    if (itemFunctions.classList.contains("_show")) itemFunctions.classList.remove("_show");
                }));
                itemFunctions.classList.add("_show");
            }
        }
        document.addEventListener("mouseout", menuOut);
        function menuOut(e) {
            const el = e.target;
            if (el.classList.contains("menu__link")) if (el.closest("._hover")) el.closest("._hover").classList.remove("_hover");
            if (el.closest(".item-functions")) {
                const itemFunctions = el.closest(".item-functions");
                const itemFunctionsText = itemFunctions.querySelector(".item-functions__text");
                const itemFunctionsP = itemFunctions.querySelector(".item-functions__text p");
                itemFunctionsText.offsetHeight;
                itemFunctionsP.offsetHeight;
                itemFunctionsText.style.height = "112px";
            }
        }
        window["FLS"] = true;
        isWebp();
        menuInit();
        spollers();
        formFieldsInit({
            viewPass: false
        });
        formSubmit();
        pageNavigation();
        headerScroll();
    })();
})();