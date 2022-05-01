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
    let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
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
                if (formError && form.hasAttribute("data-goto-error")) gotoblock_gotoBlock(formError, true, 1e3);
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
    const getConstructor = input => null !== input && "undefined" !== typeof input ? input.constructor : null;
    const instanceOf = (input, constructor) => Boolean(input && constructor && input instanceof constructor);
    const isNullOrUndefined = input => null === input || "undefined" === typeof input;
    const is_isObject = input => getConstructor(input) === Object;
    const isNumber = input => getConstructor(input) === Number && !Number.isNaN(input);
    const isString = input => getConstructor(input) === String;
    const isBoolean = input => getConstructor(input) === Boolean;
    const isFunction = input => getConstructor(input) === Function;
    const isArray = input => Array.isArray(input);
    const isWeakMap = input => instanceOf(input, WeakMap);
    const isNodeList = input => instanceOf(input, NodeList);
    const isTextNode = input => getConstructor(input) === Text;
    const isEvent = input => instanceOf(input, Event);
    const isKeyboardEvent = input => instanceOf(input, KeyboardEvent);
    const isCue = input => instanceOf(input, window.TextTrackCue) || instanceOf(input, window.VTTCue);
    const isTrack = input => instanceOf(input, TextTrack) || !isNullOrUndefined(input) && isString(input.kind);
    const isPromise = input => instanceOf(input, Promise) && isFunction(input.then);
    const isElement = input => null !== input && "object" === typeof input && 1 === input.nodeType && "object" === typeof input.style && "object" === typeof input.ownerDocument;
    const isEmpty = input => isNullOrUndefined(input) || (isString(input) || isArray(input) || isNodeList(input)) && !input.length || is_isObject(input) && !Object.keys(input).length;
    const isUrl = input => {
        if (instanceOf(input, window.URL)) return true;
        if (!isString(input)) return false;
        let string = input;
        if (!input.startsWith("http://") || !input.startsWith("https://")) string = `http://${input}`;
        try {
            return !isEmpty(new URL(string).hostname);
        } catch (_) {
            return false;
        }
    };
    const utils_is = {
        nullOrUndefined: isNullOrUndefined,
        object: is_isObject,
        number: isNumber,
        string: isString,
        boolean: isBoolean,
        function: isFunction,
        array: isArray,
        weakMap: isWeakMap,
        nodeList: isNodeList,
        element: isElement,
        textNode: isTextNode,
        event: isEvent,
        keyboardEvent: isKeyboardEvent,
        cue: isCue,
        track: isTrack,
        promise: isPromise,
        url: isUrl,
        empty: isEmpty
    };
    const transitionEndEvent = (() => {
        const element = document.createElement("span");
        const events = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        const type = Object.keys(events).find((event => void 0 !== element.style[event]));
        return utils_is.string(type) ? events[type] : false;
    })();
    function repaint(element, delay) {
        setTimeout((() => {
            try {
                element.hidden = true;
                element.offsetHeight;
                element.hidden = false;
            } catch (_) {}
        }), delay);
    }
    const browser_browser = {
        isIE: Boolean(window.document.documentMode),
        isEdge: window.navigator.userAgent.includes("Edge"),
        isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
        isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
        isIos: "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || /(iPad|iPhone|iPod)/gi.test(navigator.platform)
    };
    const utils_browser = browser_browser;
    function cloneDeep(object) {
        return JSON.parse(JSON.stringify(object));
    }
    function getDeep(object, path) {
        return path.split(".").reduce(((obj, key) => obj && obj[key]), object);
    }
    function objects_extend(target = {}, ...sources) {
        if (!sources.length) return target;
        const source = sources.shift();
        if (!utils_is.object(source)) return target;
        Object.keys(source).forEach((key => {
            if (utils_is.object(source[key])) {
                if (!Object.keys(target).includes(key)) Object.assign(target, {
                    [key]: {}
                });
                objects_extend(target[key], source[key]);
            } else Object.assign(target, {
                [key]: source[key]
            });
        }));
        return objects_extend(target, ...sources);
    }
    function wrap(elements, wrapper) {
        const targets = elements.length ? elements : [ elements ];
        Array.from(targets).reverse().forEach(((element, index) => {
            const child = index > 0 ? wrapper.cloneNode(true) : wrapper;
            const parent = element.parentNode;
            const sibling = element.nextSibling;
            child.appendChild(element);
            if (sibling) parent.insertBefore(child, sibling); else parent.appendChild(child);
        }));
    }
    function setAttributes(element, attributes) {
        if (!utils_is.element(element) || utils_is.empty(attributes)) return;
        Object.entries(attributes).filter((([, value]) => !utils_is.nullOrUndefined(value))).forEach((([key, value]) => element.setAttribute(key, value)));
    }
    function createElement(type, attributes, text) {
        const element = document.createElement(type);
        if (utils_is.object(attributes)) setAttributes(element, attributes);
        if (utils_is.string(text)) element.innerText = text;
        return element;
    }
    function elements_insertAfter(element, target) {
        if (!utils_is.element(element) || !utils_is.element(target)) return;
        target.parentNode.insertBefore(element, target.nextSibling);
    }
    function insertElement(type, parent, attributes, text) {
        if (!utils_is.element(parent)) return;
        parent.appendChild(createElement(type, attributes, text));
    }
    function removeElement(element) {
        if (utils_is.nodeList(element) || utils_is.array(element)) {
            Array.from(element).forEach(removeElement);
            return;
        }
        if (!utils_is.element(element) || !utils_is.element(element.parentNode)) return;
        element.parentNode.removeChild(element);
    }
    function emptyElement(element) {
        if (!utils_is.element(element)) return;
        let {length} = element.childNodes;
        while (length > 0) {
            element.removeChild(element.lastChild);
            length -= 1;
        }
    }
    function replaceElement(newChild, oldChild) {
        if (!utils_is.element(oldChild) || !utils_is.element(oldChild.parentNode) || !utils_is.element(newChild)) return null;
        oldChild.parentNode.replaceChild(newChild, oldChild);
        return newChild;
    }
    function getAttributesFromSelector(sel, existingAttributes) {
        if (!utils_is.string(sel) || utils_is.empty(sel)) return {};
        const attributes = {};
        const existing = objects_extend({}, existingAttributes);
        sel.split(",").forEach((s => {
            const selector = s.trim();
            const className = selector.replace(".", "");
            const stripped = selector.replace(/[[\]]/g, "");
            const parts = stripped.split("=");
            const [key] = parts;
            const value = parts.length > 1 ? parts[1].replace(/["']/g, "") : "";
            const start = selector.charAt(0);
            switch (start) {
              case ".":
                if (utils_is.string(existing.class)) attributes.class = `${existing.class} ${className}`; else attributes.class = className;
                break;

              case "#":
                attributes.id = selector.replace("#", "");
                break;

              case "[":
                attributes[key] = value;
                break;

              default:
                break;
            }
        }));
        return objects_extend(existing, attributes);
    }
    function toggleHidden(element, hidden) {
        if (!utils_is.element(element)) return;
        let hide = hidden;
        if (!utils_is.boolean(hide)) hide = !element.hidden;
        element.hidden = hide;
    }
    function elements_toggleClass(element, className, force) {
        if (utils_is.nodeList(element)) return Array.from(element).map((e => elements_toggleClass(e, className, force)));
        if (utils_is.element(element)) {
            let method = "toggle";
            if ("undefined" !== typeof force) method = force ? "add" : "remove";
            element.classList[method](className);
            return element.classList.contains(className);
        }
        return false;
    }
    function elements_hasClass(element, className) {
        return utils_is.element(element) && element.classList.contains(className);
    }
    function matches(element, selector) {
        const {prototype} = Element;
        function match() {
            return Array.from(document.querySelectorAll(selector)).includes(this);
        }
        const method = prototype.matches || prototype.webkitMatchesSelector || prototype.mozMatchesSelector || prototype.msMatchesSelector || match;
        return method.call(element, selector);
    }
    function elements_closest(element, selector) {
        const {prototype} = Element;
        function closestElement() {
            let el = this;
            do {
                if (matches.matches(el, selector)) return el;
                el = el.parentElement || el.parentNode;
            } while (null !== el && 1 === el.nodeType);
            return null;
        }
        const method = prototype.closest || closestElement;
        return method.call(element, selector);
    }
    function getElements(selector) {
        return this.elements.container.querySelectorAll(selector);
    }
    function getElement(selector) {
        return this.elements.container.querySelector(selector);
    }
    function setFocus(element = null, tabFocus = false) {
        if (!utils_is.element(element)) return;
        element.focus({
            preventScroll: true
        });
        if (tabFocus) elements_toggleClass(element, this.config.classNames.tabFocus);
    }
    const defaultCodecs = {
        "audio/ogg": "vorbis",
        "audio/wav": "1",
        "video/webm": "vp8, vorbis",
        "video/mp4": "avc1.42E01E, mp4a.40.2",
        "video/ogg": "theora"
    };
    const support_support = {
        audio: "canPlayType" in document.createElement("audio"),
        video: "canPlayType" in document.createElement("video"),
        check(type, provider, playsinline) {
            const canPlayInline = utils_browser.isIPhone && playsinline && support_support.playsinline;
            const api = support_support[type] || "html5" !== provider;
            const ui = api && support_support.rangeInput && ("video" !== type || !utils_browser.isIPhone || canPlayInline);
            return {
                api,
                ui
            };
        },
        pip: (() => {
            if (utils_browser.isIPhone) return false;
            if (utils_is["function"](createElement("video").webkitSetPresentationMode)) return true;
            if (document.pictureInPictureEnabled && !createElement("video").disablePictureInPicture) return true;
            return false;
        })(),
        airplay: utils_is["function"](window.WebKitPlaybackTargetAvailabilityEvent),
        playsinline: "playsInline" in document.createElement("video"),
        mime(input) {
            if (utils_is.empty(input)) return false;
            const [mediaType] = input.split("/");
            let type = input;
            if (!this.isHTML5 || mediaType !== this.type) return false;
            if (Object.keys(defaultCodecs).includes(type)) type += `; codecs="${defaultCodecs[input]}"`;
            try {
                return Boolean(type && this.media.canPlayType(type).replace(/no/, ""));
            } catch (_) {
                return false;
            }
        },
        textTracks: "textTracks" in document.createElement("video"),
        rangeInput: (() => {
            const range = document.createElement("input");
            range.type = "range";
            return "range" === range.type;
        })(),
        touch: "ontouchstart" in document.documentElement,
        transitions: false !== transitionEndEvent,
        reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
    };
    const plyr_support = support_support;
    const supportsPassiveListeners = (() => {
        let supported = false;
        try {
            const options = Object.defineProperty({}, "passive", {
                get() {
                    supported = true;
                    return null;
                }
            });
            window.addEventListener("test", null, options);
            window.removeEventListener("test", null, options);
        } catch (_) {}
        return supported;
    })();
    function toggleListener(element, event, callback, toggle = false, passive = true, capture = false) {
        if (!element || !("addEventListener" in element) || utils_is.empty(event) || !utils_is["function"](callback)) return;
        const events = event.split(" ");
        let options = capture;
        if (supportsPassiveListeners) options = {
            passive,
            capture
        };
        events.forEach((type => {
            if (this && this.eventListeners && toggle) this.eventListeners.push({
                element,
                type,
                callback,
                options
            });
            element[toggle ? "addEventListener" : "removeEventListener"](type, callback, options);
        }));
    }
    function events_on(element, events = "", callback, passive = true, capture = false) {
        toggleListener.call(this, element, events, callback, true, passive, capture);
    }
    function events_off(element, events = "", callback, passive = true, capture = false) {
        toggleListener.call(this, element, events, callback, false, passive, capture);
    }
    function events_once(element, events = "", callback, passive = true, capture = false) {
        const onceCallback = (...args) => {
            events_off(element, events, onceCallback, passive, capture);
            callback.apply(this, args);
        };
        toggleListener.call(this, element, events, onceCallback, true, passive, capture);
    }
    function triggerEvent(element, type = "", bubbles = false, detail = {}) {
        if (!utils_is.element(element) || utils_is.empty(type)) return;
        const event = new CustomEvent(type, {
            bubbles,
            detail: {
                ...detail,
                plyr: this
            }
        });
        element.dispatchEvent(event);
    }
    function unbindListeners() {
        if (this && this.eventListeners) {
            this.eventListeners.forEach((item => {
                const {element, type, callback, options} = item;
                element.removeEventListener(type, callback, options);
            }));
            this.eventListeners = [];
        }
    }
    function ready() {
        return new Promise((resolve => this.ready ? setTimeout(resolve, 0) : events_on.call(this, this.elements.container, "ready", resolve))).then((() => {}));
    }
    function silencePromise(value) {
        if (utils_is.promise(value)) value.then(null, (() => {}));
    }
    function dedupe(array) {
        if (!utils_is.array(array)) return array;
        return array.filter(((item, index) => array.indexOf(item) === index));
    }
    function arrays_closest(array, value) {
        if (!utils_is.array(array) || !array.length) return null;
        return array.reduce(((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev));
    }
    function supportsCSS(declaration) {
        if (!window || !window.CSS) return false;
        return window.CSS.supports(declaration);
    }
    const standardRatios = [ [ 1, 1 ], [ 4, 3 ], [ 3, 4 ], [ 5, 4 ], [ 4, 5 ], [ 3, 2 ], [ 2, 3 ], [ 16, 10 ], [ 10, 16 ], [ 16, 9 ], [ 9, 16 ], [ 21, 9 ], [ 9, 21 ], [ 32, 9 ], [ 9, 32 ] ].reduce(((out, [x, y]) => ({
        ...out,
        [x / y]: [ x, y ]
    })), {});
    function validateAspectRatio(input) {
        if (!utils_is.array(input) && (!utils_is.string(input) || !input.includes(":"))) return false;
        const ratio = utils_is.array(input) ? input : input.split(":");
        return ratio.map(Number).every(utils_is.number);
    }
    function reduceAspectRatio(ratio) {
        if (!utils_is.array(ratio) || !ratio.every(utils_is.number)) return null;
        const [width, height] = ratio;
        const getDivider = (w, h) => 0 === h ? w : getDivider(h, w % h);
        const divider = getDivider(width, height);
        return [ width / divider, height / divider ];
    }
    function getAspectRatio(input) {
        const parse = ratio => validateAspectRatio(ratio) ? ratio.split(":").map(Number) : null;
        let ratio = parse(input);
        if (null === ratio) ratio = parse(this.config.ratio);
        if (null === ratio && !utils_is.empty(this.embed) && utils_is.array(this.embed.ratio)) ({ratio} = this.embed);
        if (null === ratio && this.isHTML5) {
            const {videoWidth, videoHeight} = this.media;
            ratio = [ videoWidth, videoHeight ];
        }
        return reduceAspectRatio(ratio);
    }
    function setAspectRatio(input) {
        if (!this.isVideo) return {};
        const {wrapper} = this.elements;
        const ratio = getAspectRatio.call(this, input);
        if (!utils_is.array(ratio)) return {};
        const [x, y] = reduceAspectRatio(ratio);
        const useNative = supportsCSS(`aspect-ratio: ${x}/${y}`);
        const padding = 100 / x * y;
        if (useNative) wrapper.style.aspectRatio = `${x}/${y}`; else wrapper.style.paddingBottom = `${padding}%`;
        if (this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
            const height = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10);
            const offset = (height - padding) / (height / 50);
            if (this.fullscreen.active) wrapper.style.paddingBottom = null; else this.media.style.transform = `translateY(-${offset}%)`;
        } else if (this.isHTML5) wrapper.classList.add(this.config.classNames.videoFixedRatio);
        return {
            padding,
            ratio
        };
    }
    function roundAspectRatio(x, y, tolerance = .05) {
        const ratio = x / y;
        const closestRatio = arrays_closest(Object.keys(standardRatios), ratio);
        if (Math.abs(closestRatio - ratio) <= tolerance) return standardRatios[closestRatio];
        return [ x, y ];
    }
    function getViewportSize() {
        const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        return [ width, height ];
    }
    const html5 = {
        getSources() {
            if (!this.isHTML5) return [];
            const sources = Array.from(this.media.querySelectorAll("source"));
            return sources.filter((source => {
                const type = source.getAttribute("type");
                if (utils_is.empty(type)) return true;
                return plyr_support.mime.call(this, type);
            }));
        },
        getQualityOptions() {
            if (this.config.quality.forced) return this.config.quality.options;
            return html5.getSources.call(this).map((source => Number(source.getAttribute("size")))).filter(Boolean);
        },
        setup() {
            if (!this.isHTML5) return;
            const player = this;
            player.options.speed = player.config.speed.options;
            if (!utils_is.empty(this.config.ratio)) setAspectRatio.call(player);
            Object.defineProperty(player.media, "quality", {
                get() {
                    const sources = html5.getSources.call(player);
                    const source = sources.find((s => s.getAttribute("src") === player.source));
                    return source && Number(source.getAttribute("size"));
                },
                set(input) {
                    if (player.quality === input) return;
                    if (player.config.quality.forced && utils_is["function"](player.config.quality.onChange)) player.config.quality.onChange(input); else {
                        const sources = html5.getSources.call(player);
                        const source = sources.find((s => Number(s.getAttribute("size")) === input));
                        if (!source) return;
                        const {currentTime, paused, preload, readyState, playbackRate} = player.media;
                        player.media.src = source.getAttribute("src");
                        if ("none" !== preload || readyState) {
                            player.once("loadedmetadata", (() => {
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
        cancelRequests() {
            if (!this.isHTML5) return;
            removeElement(html5.getSources.call(this));
            this.media.setAttribute("src", this.config.blankVideo);
            this.media.load();
            this.debug.log("Cancelled network requests");
        }
    };
    const plyr_html5 = html5;
    function generateId(prefix) {
        return `${prefix}-${Math.floor(1e4 * Math.random())}`;
    }
    function format(input, ...args) {
        if (utils_is.empty(input)) return input;
        return input.toString().replace(/{(\d+)}/g, ((match, i) => args[i].toString()));
    }
    function getPercentage(current, max) {
        if (0 === current || 0 === max || Number.isNaN(current) || Number.isNaN(max)) return 0;
        return (current / max * 100).toFixed(2);
    }
    const replaceAll = (input = "", find = "", replace = "") => input.replace(new RegExp(find.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), replace.toString());
    const toTitleCase = (input = "") => input.toString().replace(/\w\S*/g, (text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()));
    function toPascalCase(input = "") {
        let string = input.toString();
        string = replaceAll(string, "-", " ");
        string = replaceAll(string, "_", " ");
        string = toTitleCase(string);
        return replaceAll(string, " ", "");
    }
    function strings_toCamelCase(input = "") {
        let string = input.toString();
        string = toPascalCase(string);
        return string.charAt(0).toLowerCase() + string.slice(1);
    }
    function stripHTML(source) {
        const fragment = document.createDocumentFragment();
        const element = document.createElement("div");
        fragment.appendChild(element);
        element.innerHTML = source;
        return fragment.firstChild.innerText;
    }
    function getHTML(element) {
        const wrapper = document.createElement("div");
        wrapper.appendChild(element);
        return wrapper.innerHTML;
    }
    const resources = {
        pip: "PIP",
        airplay: "AirPlay",
        html5: "HTML5",
        vimeo: "Vimeo",
        youtube: "YouTube"
    };
    const i18n = {
        get(key = "", config = {}) {
            if (utils_is.empty(key) || utils_is.empty(config)) return "";
            let string = getDeep(config.i18n, key);
            if (utils_is.empty(string)) {
                if (Object.keys(resources).includes(key)) return resources[key];
                return "";
            }
            const replace = {
                "{seektime}": config.seekTime,
                "{title}": config.title
            };
            Object.entries(replace).forEach((([k, v]) => {
                string = replaceAll(string, k, v);
            }));
            return string;
        }
    };
    const utils_i18n = i18n;
    class Storage {
        constructor(player) {
            this.enabled = player.config.storage.enabled;
            this.key = player.config.storage.key;
        }
        static get supported() {
            try {
                if (!("localStorage" in window)) return false;
                const test = "___test";
                window.localStorage.setItem(test, test);
                window.localStorage.removeItem(test);
                return true;
            } catch (_) {
                return false;
            }
        }
        get=key => {
            if (!Storage.supported || !this.enabled) return null;
            const store = window.localStorage.getItem(this.key);
            if (utils_is.empty(store)) return null;
            const json = JSON.parse(store);
            return utils_is.string(key) && key.length ? json[key] : json;
        };
        set=object => {
            if (!Storage.supported || !this.enabled) return;
            if (!utils_is.object(object)) return;
            let storage = this.get();
            if (utils_is.empty(storage)) storage = {};
            objects_extend(storage, object);
            try {
                window.localStorage.setItem(this.key, JSON.stringify(storage));
            } catch (_) {}
        };
    }
    const storage = Storage;
    function fetch_fetch(url, responseType = "text") {
        return new Promise(((resolve, reject) => {
            try {
                const request = new XMLHttpRequest;
                if (!("withCredentials" in request)) return;
                request.addEventListener("load", (() => {
                    if ("text" === responseType) try {
                        resolve(JSON.parse(request.responseText));
                    } catch (_) {
                        resolve(request.responseText);
                    } else resolve(request.response);
                }));
                request.addEventListener("error", (() => {
                    throw new Error(request.status);
                }));
                request.open("GET", url, true);
                request.responseType = responseType;
                request.send();
            } catch (error) {
                reject(error);
            }
        }));
    }
    function loadSprite(url, id) {
        if (!utils_is.string(url)) return;
        const prefix = "cache";
        const hasId = utils_is.string(id);
        let isCached = false;
        const exists = () => null !== document.getElementById(id);
        const update = (container, data) => {
            container.innerHTML = data;
            if (hasId && exists()) return;
            document.body.insertAdjacentElement("afterbegin", container);
        };
        if (!hasId || !exists()) {
            const useStorage = storage.supported;
            const container = document.createElement("div");
            container.setAttribute("hidden", "");
            if (hasId) container.setAttribute("id", id);
            if (useStorage) {
                const cached = window.localStorage.getItem(`${prefix}-${id}`);
                isCached = null !== cached;
                if (isCached) {
                    const data = JSON.parse(cached);
                    update(container, data.content);
                }
            }
            fetch_fetch(url).then((result => {
                if (utils_is.empty(result)) return;
                if (useStorage) try {
                    window.localStorage.setItem(`${prefix}-${id}`, JSON.stringify({
                        content: result
                    }));
                } catch (_) {}
                update(container, result);
            })).catch((() => {}));
        }
    }
    const getHours = value => Math.trunc(value / 60 / 60 % 60, 10);
    const getMinutes = value => Math.trunc(value / 60 % 60, 10);
    const getSeconds = value => Math.trunc(value % 60, 10);
    function formatTime(time = 0, displayHours = false, inverted = false) {
        if (!utils_is.number(time)) return formatTime(void 0, displayHours, inverted);
        const format = value => `0${value}`.slice(-2);
        let hours = getHours(time);
        const mins = getMinutes(time);
        const secs = getSeconds(time);
        if (displayHours || hours > 0) hours = `${hours}:`; else hours = "";
        return `${inverted && time > 0 ? "-" : ""}${hours}${format(mins)}:${format(secs)}`;
    }
    !function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("RangeTouch", t) : (e = e || self).RangeTouch = t();
    }(void 0, (function() {
        "use strict";
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
                Object.defineProperty(e, r.key, r);
            }
        }
        function t(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e;
        }
        function n(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), n.push.apply(n, r);
            }
            return n;
        }
        function r(e) {
            for (var r = 1; r < arguments.length; r++) {
                var i = null != arguments[r] ? arguments[r] : {};
                r % 2 ? n(Object(i), !0).forEach((function(n) {
                    t(e, n, i[n]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : n(Object(i)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
                }));
            }
            return e;
        }
        var i = {
            addCSS: !0,
            thumbWidth: 15,
            watch: !0
        };
        function u(e, t) {
            return function() {
                return Array.from(document.querySelectorAll(t)).includes(this);
            }.call(e, t);
        }
        var o = function(e) {
            return null != e ? e.constructor : null;
        }, c = function(e, t) {
            return !!(e && t && e instanceof t);
        }, l = function(e) {
            return null == e;
        }, a = function(e) {
            return o(e) === Object;
        }, s = function(e) {
            return o(e) === String;
        }, f = function(e) {
            return Array.isArray(e);
        }, h = function(e) {
            return c(e, NodeList);
        }, d = s, y = f, b = h, m = function(e) {
            return c(e, Element);
        }, g = function(e) {
            return c(e, Event);
        }, p = function(e) {
            return l(e) || (s(e) || f(e) || h(e)) && !e.length || a(e) && !Object.keys(e).length;
        };
        function v(e, t) {
            if (1 > t) {
                var n = function(e) {
                    var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                    return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
                }(t);
                return parseFloat(e.toFixed(n));
            }
            return Math.round(e / t) * t;
        }
        return function() {
            function t(e, n) {
                (function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                })(this, t), m(e) ? this.element = e : d(e) && (this.element = document.querySelector(e)), 
                m(this.element) && p(this.element.rangeTouch) && (this.config = r({}, i, {}, n), 
                this.init());
            }
            return n = t, c = [ {
                key: "setup",
                value: function(e) {
                    var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, o = null;
                    if (p(e) || d(e) ? o = Array.from(document.querySelectorAll(d(e) ? e : 'input[type="range"]')) : m(e) ? o = [ e ] : b(e) ? o = Array.from(e) : y(e) && (o = e.filter(m)), 
                    p(o)) return null;
                    var c = r({}, i, {}, n);
                    if (d(e) && c.watch) {
                        var l = new MutationObserver((function(n) {
                            Array.from(n).forEach((function(n) {
                                Array.from(n.addedNodes).forEach((function(n) {
                                    m(n) && u(n, e) && new t(n, c);
                                }));
                            }));
                        }));
                        l.observe(document.body, {
                            childList: !0,
                            subtree: !0
                        });
                    }
                    return o.map((function(e) {
                        return new t(e, n);
                    }));
                }
            }, {
                key: "enabled",
                get: function() {
                    return "ontouchstart" in document.documentElement;
                }
            } ], (o = [ {
                key: "init",
                value: function() {
                    t.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", 
                    this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this);
                }
            }, {
                key: "destroy",
                value: function() {
                    t.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", 
                    this.element.style.touchAction = ""), this.listeners(!1), this.element.rangeTouch = null);
                }
            }, {
                key: "listeners",
                value: function(e) {
                    var t = this, n = e ? "addEventListener" : "removeEventListener";
                    [ "touchstart", "touchmove", "touchend" ].forEach((function(e) {
                        t.element[n](e, (function(e) {
                            return t.set(e);
                        }), !1);
                    }));
                }
            }, {
                key: "get",
                value: function(e) {
                    if (!t.enabled || !g(e)) return null;
                    var n, r = e.target, i = e.changedTouches[0], u = parseFloat(r.getAttribute("min")) || 0, o = parseFloat(r.getAttribute("max")) || 100, c = parseFloat(r.getAttribute("step")) || 1, l = r.getBoundingClientRect(), a = 100 / l.width * (this.config.thumbWidth / 2) / 100;
                    return 0 > (n = 100 / l.width * (i.clientX - l.left)) ? n = 0 : 100 < n && (n = 100), 
                    50 > n ? n -= (100 - 2 * n) * a : 50 < n && (n += 2 * (n - 50) * a), u + v(n / 100 * (o - u), c);
                }
            }, {
                key: "set",
                value: function(e) {
                    t.enabled && g(e) && !e.target.disabled && (e.preventDefault(), e.target.value = this.get(e), 
                    function(e, t) {
                        if (e && t) {
                            var n = new Event(t, {
                                bubbles: !0
                            });
                            e.dispatchEvent(n);
                        }
                    }(e.target, "touchend" === e.type ? "change" : "input"));
                }
            } ]) && e(n.prototype, o), c && e(n, c), t;
            var n, o, c;
        }();
    }));
    const controls = {
        getIconUrl() {
            const url = new URL(this.config.iconUrl, window.location);
            const host = window.location.host ? window.location.host : window.top.location.host;
            const cors = url.host !== host || utils_browser.isIE && !window.svg4everybody;
            return {
                url: this.config.iconUrl,
                cors
            };
        },
        findElements() {
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
                if (utils_is.element(this.elements.progress)) this.elements.display.seekTooltip = this.elements.progress.querySelector(`.${this.config.classNames.tooltip}`);
                return true;
            } catch (error) {
                this.debug.warn("It looks like there is a problem with your custom controls HTML", error);
                this.toggleNativeControls(true);
                return false;
            }
        },
        createIcon(type, attributes) {
            const namespace = "http://www.w3.org/2000/svg";
            const iconUrl = controls.getIconUrl.call(this);
            const iconPath = `${!iconUrl.cors ? iconUrl.url : ""}#${this.config.iconPrefix}`;
            const icon = document.createElementNS(namespace, "svg");
            setAttributes(icon, objects_extend(attributes, {
                "aria-hidden": "true",
                focusable: "false"
            }));
            const use = document.createElementNS(namespace, "use");
            const path = `${iconPath}-${type}`;
            if ("href" in use) use.setAttributeNS("http://www.w3.org/1999/xlink", "href", path);
            use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", path);
            icon.appendChild(use);
            return icon;
        },
        createLabel(key, attr = {}) {
            const text = utils_i18n.get(key, this.config);
            const attributes = {
                ...attr,
                class: [ attr.class, this.config.classNames.hidden ].filter(Boolean).join(" ")
            };
            return createElement("span", attributes, text);
        },
        createBadge(text) {
            if (utils_is.empty(text)) return null;
            const badge = createElement("span", {
                class: this.config.classNames.menu.value
            });
            badge.appendChild(createElement("span", {
                class: this.config.classNames.menu.badge
            }, text));
            return badge;
        },
        createButton(buttonType, attr) {
            const attributes = objects_extend({}, attr);
            let type = strings_toCamelCase(buttonType);
            const props = {
                element: "button",
                toggle: false,
                label: null,
                icon: null,
                labelPressed: null,
                iconPressed: null
            };
            [ "element", "icon", "label" ].forEach((key => {
                if (Object.keys(attributes).includes(key)) {
                    props[key] = attributes[key];
                    delete attributes[key];
                }
            }));
            if ("button" === props.element && !Object.keys(attributes).includes("type")) attributes.type = "button";
            if (Object.keys(attributes).includes("class")) {
                if (!attributes.class.split(" ").some((c => c === this.config.classNames.control))) objects_extend(attributes, {
                    class: `${attributes.class} ${this.config.classNames.control}`
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
                attributes.class += ` ${this.config.classNames.control}--overlaid`;
                type = "play";
                props.label = "play";
                props.icon = "play";
                break;

              default:
                if (utils_is.empty(props.label)) props.label = type;
                if (utils_is.empty(props.icon)) props.icon = buttonType;
            }
            const button = createElement(props.element);
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
            objects_extend(attributes, getAttributesFromSelector(this.config.selectors.buttons[type], attributes));
            setAttributes(button, attributes);
            if ("play" === type) {
                if (!utils_is.array(this.elements.buttons[type])) this.elements.buttons[type] = [];
                this.elements.buttons[type].push(button);
            } else this.elements.buttons[type] = button;
            return button;
        },
        createRange(type, attributes) {
            const input = createElement("input", objects_extend(getAttributesFromSelector(this.config.selectors.inputs[type]), {
                type: "range",
                min: 0,
                max: 100,
                step: .01,
                value: 0,
                autocomplete: "off",
                role: "slider",
                "aria-label": utils_i18n.get(type, this.config),
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                "aria-valuenow": 0
            }, attributes));
            this.elements.inputs[type] = input;
            controls.updateRangeFill.call(this, input);
            RangeTouch.setup(input);
            return input;
        },
        createProgress(type, attributes) {
            const progress = createElement("progress", objects_extend(getAttributesFromSelector(this.config.selectors.display[type]), {
                min: 0,
                max: 100,
                value: 0,
                role: "progressbar",
                "aria-hidden": true
            }, attributes));
            if ("volume" !== type) {
                progress.appendChild(createElement("span", null, "0"));
                const suffixKey = {
                    played: "played",
                    buffer: "buffered"
                }[type];
                const suffix = suffixKey ? utils_i18n.get(suffixKey, this.config) : "";
                progress.innerText = `% ${suffix.toLowerCase()}`;
            }
            this.elements.display[type] = progress;
            return progress;
        },
        createTime(type, attrs) {
            const attributes = getAttributesFromSelector(this.config.selectors.display[type], attrs);
            const container = createElement("div", objects_extend(attributes, {
                class: `${attributes.class ? attributes.class : ""} ${this.config.classNames.display.time} `.trim(),
                "aria-label": utils_i18n.get(type, this.config)
            }), "00:00");
            this.elements.display[type] = container;
            return container;
        },
        bindMenuItemShortcuts(menuItem, type) {
            events_on.call(this, menuItem, "keydown keyup", (event => {
                if (![ "Space", "ArrowUp", "ArrowDown", "ArrowRight" ].includes(event.key)) return;
                event.preventDefault();
                event.stopPropagation();
                if ("keydown" === event.type) return;
                const isRadioButton = matches(menuItem, '[role="menuitemradio"]');
                if (!isRadioButton && [ "Space", "ArrowRight" ].includes(event.key)) controls.showMenuPanel.call(this, type, true); else {
                    let target;
                    if ("Space" !== event.key) {
                        if ("ArrowDown" === event.key || isRadioButton && "ArrowRight" === event.key) {
                            target = menuItem.nextElementSibling;
                            if (!utils_is.element(target)) target = menuItem.parentNode.firstElementChild;
                        } else {
                            target = menuItem.previousElementSibling;
                            if (!utils_is.element(target)) target = menuItem.parentNode.lastElementChild;
                        }
                        setFocus.call(this, target, true);
                    }
                }
            }), false);
            events_on.call(this, menuItem, "keyup", (event => {
                if ("Return" !== event.key) return;
                controls.focusFirstMenuItem.call(this, null, true);
            }));
        },
        createMenuItem({value, list, type, title, badge = null, checked = false}) {
            const attributes = getAttributesFromSelector(this.config.selectors.inputs[type]);
            const menuItem = createElement("button", objects_extend(attributes, {
                type: "button",
                role: "menuitemradio",
                class: `${this.config.classNames.control} ${attributes.class ? attributes.class : ""}`.trim(),
                "aria-checked": checked,
                value
            }));
            const flex = createElement("span");
            flex.innerHTML = title;
            if (utils_is.element(badge)) flex.appendChild(badge);
            menuItem.appendChild(flex);
            Object.defineProperty(menuItem, "checked", {
                enumerable: true,
                get() {
                    return "true" === menuItem.getAttribute("aria-checked");
                },
                set(check) {
                    if (check) Array.from(menuItem.parentNode.children).filter((node => matches(node, '[role="menuitemradio"]'))).forEach((node => node.setAttribute("aria-checked", "false")));
                    menuItem.setAttribute("aria-checked", check ? "true" : "false");
                }
            });
            this.listeners.bind(menuItem, "click keyup", (event => {
                if (utils_is.keyboardEvent(event) && "Space" !== event.key) return;
                event.preventDefault();
                event.stopPropagation();
                menuItem.checked = true;
                switch (type) {
                  case "language":
                    this.currentTrack = Number(value);
                    break;

                  case "quality":
                    this.quality = value;
                    break;

                  case "speed":
                    this.speed = parseFloat(value);
                    break;

                  default:
                    break;
                }
                controls.showMenuPanel.call(this, "home", utils_is.keyboardEvent(event));
            }), type, false);
            controls.bindMenuItemShortcuts.call(this, menuItem, type);
            list.appendChild(menuItem);
        },
        formatTime(time = 0, inverted = false) {
            if (!utils_is.number(time)) return time;
            const forceHours = getHours(this.duration) > 0;
            return formatTime(time, forceHours, inverted);
        },
        updateTimeDisplay(target = null, time = 0, inverted = false) {
            if (!utils_is.element(target) || !utils_is.number(time)) return;
            target.innerText = controls.formatTime(time, inverted);
        },
        updateVolume() {
            if (!this.supported.ui) return;
            if (utils_is.element(this.elements.inputs.volume)) controls.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume);
            if (utils_is.element(this.elements.buttons.mute)) this.elements.buttons.mute.pressed = this.muted || 0 === this.volume;
        },
        setRange(target, value = 0) {
            if (!utils_is.element(target)) return;
            target.value = value;
            controls.updateRangeFill.call(this, target);
        },
        updateProgress(event) {
            if (!this.supported.ui || !utils_is.event(event)) return;
            let value = 0;
            const setProgress = (target, input) => {
                const val = utils_is.number(input) ? input : 0;
                const progress = utils_is.element(target) ? target : this.elements.display.buffer;
                if (utils_is.element(progress)) {
                    progress.value = val;
                    const label = progress.getElementsByTagName("span")[0];
                    if (utils_is.element(label)) label.childNodes[0].nodeValue = val;
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

              default:
                break;
            }
        },
        updateRangeFill(target) {
            const range = utils_is.event(target) ? target.target : target;
            if (!utils_is.element(range) || "range" !== range.getAttribute("type")) return;
            if (matches(range, this.config.selectors.inputs.seek)) {
                range.setAttribute("aria-valuenow", this.currentTime);
                const currentTime = controls.formatTime(this.currentTime);
                const duration = controls.formatTime(this.duration);
                const format = utils_i18n.get("seekLabel", this.config);
                range.setAttribute("aria-valuetext", format.replace("{currentTime}", currentTime).replace("{duration}", duration));
            } else if (matches(range, this.config.selectors.inputs.volume)) {
                const percent = 100 * range.value;
                range.setAttribute("aria-valuenow", percent);
                range.setAttribute("aria-valuetext", `${percent.toFixed(1)}%`);
            } else range.setAttribute("aria-valuenow", range.value);
            if (!utils_browser.isWebkit) return;
            range.style.setProperty("--value", `${range.value / range.max * 100}%`);
        },
        updateSeekTooltip(event) {
            if (!this.config.tooltips.seek || !utils_is.element(this.elements.inputs.seek) || !utils_is.element(this.elements.display.seekTooltip) || 0 === this.duration) return;
            const tipElement = this.elements.display.seekTooltip;
            const visible = `${this.config.classNames.tooltip}--visible`;
            const toggle = show => elements_toggleClass(tipElement, visible, show);
            if (this.touch) {
                toggle(false);
                return;
            }
            let percent = 0;
            const clientRect = this.elements.progress.getBoundingClientRect();
            if (utils_is.event(event)) percent = 100 / clientRect.width * (event.pageX - clientRect.left); else if (elements_hasClass(tipElement, visible)) percent = parseFloat(tipElement.style.left, 10); else return;
            if (percent < 0) percent = 0; else if (percent > 100) percent = 100;
            const time = this.duration / 100 * percent;
            tipElement.innerText = controls.formatTime(time);
            const point = this.config.markers?.points?.find((({time: t}) => t === Math.round(time)));
            if (point) tipElement.insertAdjacentHTML("afterbegin", `${point.label}<br>`);
            tipElement.style.left = `${percent}%`;
            if (utils_is.event(event) && [ "mouseenter", "mouseleave" ].includes(event.type)) toggle("mouseenter" === event.type);
        },
        timeUpdate(event) {
            const invert = !utils_is.element(this.elements.display.duration) && this.config.invertTime;
            controls.updateTimeDisplay.call(this, this.elements.display.currentTime, invert ? this.duration - this.currentTime : this.currentTime, invert);
            if (event && "timeupdate" === event.type && this.media.seeking) return;
            controls.updateProgress.call(this, event);
        },
        durationUpdate() {
            if (!this.supported.ui || !this.config.invertTime && this.currentTime) return;
            if (this.duration >= 2 ** 32) {
                toggleHidden(this.elements.display.currentTime, true);
                toggleHidden(this.elements.progress, true);
                return;
            }
            if (utils_is.element(this.elements.inputs.seek)) this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
            const hasDuration = utils_is.element(this.elements.display.duration);
            if (!hasDuration && this.config.displayDuration && this.paused) controls.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration);
            if (hasDuration) controls.updateTimeDisplay.call(this, this.elements.display.duration, this.duration);
            if (this.config.markers.enabled) controls.setMarkers.call(this);
            controls.updateSeekTooltip.call(this);
        },
        toggleMenuButton(setting, toggle) {
            toggleHidden(this.elements.settings.buttons[setting], !toggle);
        },
        updateSetting(setting, container, input) {
            const pane = this.elements.settings.panels[setting];
            let value = null;
            let list = container;
            if ("captions" === setting) value = this.currentTrack; else {
                value = !utils_is.empty(input) ? input : this[setting];
                if (utils_is.empty(value)) value = this.config[setting].default;
                if (!utils_is.empty(this.options[setting]) && !this.options[setting].includes(value)) {
                    this.debug.warn(`Unsupported value of '${value}' for ${setting}`);
                    return;
                }
                if (!this.config[setting].options.includes(value)) {
                    this.debug.warn(`Disabled value of '${value}' for ${setting}`);
                    return;
                }
            }
            if (!utils_is.element(list)) list = pane && pane.querySelector('[role="menu"]');
            if (!utils_is.element(list)) return;
            const label = this.elements.settings.buttons[setting].querySelector(`.${this.config.classNames.menu.value}`);
            label.innerHTML = controls.getLabel.call(this, setting, value);
            const target = list && list.querySelector(`[value="${value}"]`);
            if (utils_is.element(target)) target.checked = true;
        },
        getLabel(setting, value) {
            switch (setting) {
              case "speed":
                return 1 === value ? utils_i18n.get("normal", this.config) : `${value}&times;`;

              case "quality":
                if (utils_is.number(value)) {
                    const label = utils_i18n.get(`qualityLabel.${value}`, this.config);
                    if (!label.length) return `${value}p`;
                    return label;
                }
                return toTitleCase(value);

              case "captions":
                return plyr_captions.getLabel.call(this);

              default:
                return null;
            }
        },
        setQualityMenu(options) {
            if (!utils_is.element(this.elements.settings.panels.quality)) return;
            const type = "quality";
            const list = this.elements.settings.panels.quality.querySelector('[role="menu"]');
            if (utils_is.array(options)) this.options.quality = dedupe(options).filter((quality => this.config.quality.options.includes(quality)));
            const toggle = !utils_is.empty(this.options.quality) && this.options.quality.length > 1;
            controls.toggleMenuButton.call(this, type, toggle);
            emptyElement(list);
            controls.checkMenu.call(this);
            if (!toggle) return;
            const getBadge = quality => {
                const label = utils_i18n.get(`qualityBadge.${quality}`, this.config);
                if (!label.length) return null;
                return controls.createBadge.call(this, label);
            };
            this.options.quality.sort(((a, b) => {
                const sorting = this.config.quality.options;
                return sorting.indexOf(a) > sorting.indexOf(b) ? 1 : -1;
            })).forEach((quality => {
                controls.createMenuItem.call(this, {
                    value: quality,
                    list,
                    type,
                    title: controls.getLabel.call(this, "quality", quality),
                    badge: getBadge(quality)
                });
            }));
            controls.updateSetting.call(this, type, list);
        },
        setCaptionsMenu() {
            if (!utils_is.element(this.elements.settings.panels.captions)) return;
            const type = "captions";
            const list = this.elements.settings.panels.captions.querySelector('[role="menu"]');
            const tracks = plyr_captions.getTracks.call(this);
            const toggle = Boolean(tracks.length);
            controls.toggleMenuButton.call(this, type, toggle);
            emptyElement(list);
            controls.checkMenu.call(this);
            if (!toggle) return;
            const options = tracks.map(((track, value) => ({
                value,
                checked: this.captions.toggled && this.currentTrack === value,
                title: plyr_captions.getLabel.call(this, track),
                badge: track.language && controls.createBadge.call(this, track.language.toUpperCase()),
                list,
                type: "language"
            })));
            options.unshift({
                value: -1,
                checked: !this.captions.toggled,
                title: utils_i18n.get("disabled", this.config),
                list,
                type: "language"
            });
            options.forEach(controls.createMenuItem.bind(this));
            controls.updateSetting.call(this, type, list);
        },
        setSpeedMenu() {
            if (!utils_is.element(this.elements.settings.panels.speed)) return;
            const type = "speed";
            const list = this.elements.settings.panels.speed.querySelector('[role="menu"]');
            this.options.speed = this.options.speed.filter((o => o >= this.minimumSpeed && o <= this.maximumSpeed));
            const toggle = !utils_is.empty(this.options.speed) && this.options.speed.length > 1;
            controls.toggleMenuButton.call(this, type, toggle);
            emptyElement(list);
            controls.checkMenu.call(this);
            if (!toggle) return;
            this.options.speed.forEach((speed => {
                controls.createMenuItem.call(this, {
                    value: speed,
                    list,
                    type,
                    title: controls.getLabel.call(this, "speed", speed)
                });
            }));
            controls.updateSetting.call(this, type, list);
        },
        checkMenu() {
            const {buttons} = this.elements.settings;
            const visible = !utils_is.empty(buttons) && Object.values(buttons).some((button => !button.hidden));
            toggleHidden(this.elements.settings.menu, !visible);
        },
        focusFirstMenuItem(pane, tabFocus = false) {
            if (this.elements.settings.popup.hidden) return;
            let target = pane;
            if (!utils_is.element(target)) target = Object.values(this.elements.settings.panels).find((p => !p.hidden));
            const firstItem = target.querySelector('[role^="menuitem"]');
            setFocus.call(this, firstItem, tabFocus);
        },
        toggleMenu(input) {
            const {popup} = this.elements.settings;
            const button = this.elements.buttons.settings;
            if (!utils_is.element(popup) || !utils_is.element(button)) return;
            const {hidden} = popup;
            let show = hidden;
            if (utils_is.boolean(input)) show = input; else if (utils_is.keyboardEvent(input) && "Escape" === input.key) show = false; else if (utils_is.event(input)) {
                const target = utils_is["function"](input.composedPath) ? input.composedPath()[0] : input.target;
                const isMenuItem = popup.contains(target);
                if (isMenuItem || !isMenuItem && input.target !== button && show) return;
            }
            button.setAttribute("aria-expanded", show);
            toggleHidden(popup, !show);
            elements_toggleClass(this.elements.container, this.config.classNames.menu.open, show);
            if (show && utils_is.keyboardEvent(input)) controls.focusFirstMenuItem.call(this, null, true); else if (!show && !hidden) setFocus.call(this, button, utils_is.keyboardEvent(input));
        },
        getMenuSize(tab) {
            const clone = tab.cloneNode(true);
            clone.style.position = "absolute";
            clone.style.opacity = 0;
            clone.removeAttribute("hidden");
            tab.parentNode.appendChild(clone);
            const width = clone.scrollWidth;
            const height = clone.scrollHeight;
            removeElement(clone);
            return {
                width,
                height
            };
        },
        showMenuPanel(type = "", tabFocus = false) {
            const target = this.elements.container.querySelector(`#plyr-settings-${this.id}-${type}`);
            if (!utils_is.element(target)) return;
            const container = target.parentNode;
            const current = Array.from(container.children).find((node => !node.hidden));
            if (plyr_support.transitions && !plyr_support.reducedMotion) {
                container.style.width = `${current.scrollWidth}px`;
                container.style.height = `${current.scrollHeight}px`;
                const size = controls.getMenuSize.call(this, target);
                const restore = event => {
                    if (event.target !== container || ![ "width", "height" ].includes(event.propertyName)) return;
                    container.style.width = "";
                    container.style.height = "";
                    events_off.call(this, container, transitionEndEvent, restore);
                };
                events_on.call(this, container, transitionEndEvent, restore);
                container.style.width = `${size.width}px`;
                container.style.height = `${size.height}px`;
            }
            toggleHidden(current, true);
            toggleHidden(target, false);
            controls.focusFirstMenuItem.call(this, target, tabFocus);
        },
        setDownloadUrl() {
            const button = this.elements.buttons.download;
            if (!utils_is.element(button)) return;
            button.setAttribute("href", this.download);
        },
        create(data) {
            const {bindMenuItemShortcuts, createButton, createProgress, createRange, createTime, setQualityMenu, setSpeedMenu, showMenuPanel} = controls;
            this.elements.controls = null;
            if (utils_is.array(this.config.controls) && this.config.controls.includes("play-large")) this.elements.container.appendChild(createButton.call(this, "play-large"));
            const container = createElement("div", getAttributesFromSelector(this.config.selectors.controls.wrapper));
            this.elements.controls = container;
            const defaultAttributes = {
                class: "plyr__controls__item"
            };
            dedupe(utils_is.array(this.config.controls) ? this.config.controls : []).forEach((control => {
                if ("restart" === control) container.appendChild(createButton.call(this, "restart", defaultAttributes));
                if ("rewind" === control) container.appendChild(createButton.call(this, "rewind", defaultAttributes));
                if ("play" === control) container.appendChild(createButton.call(this, "play", defaultAttributes));
                if ("fast-forward" === control) container.appendChild(createButton.call(this, "fast-forward", defaultAttributes));
                if ("progress" === control) {
                    const progressContainer = createElement("div", {
                        class: `${defaultAttributes.class} plyr__progress__container`
                    });
                    const progress = createElement("div", getAttributesFromSelector(this.config.selectors.progress));
                    progress.appendChild(createRange.call(this, "seek", {
                        id: `plyr-seek-${data.id}`
                    }));
                    progress.appendChild(createProgress.call(this, "buffer"));
                    if (this.config.tooltips.seek) {
                        const tooltip = createElement("span", {
                            class: this.config.classNames.tooltip
                        }, "00:00");
                        progress.appendChild(tooltip);
                        this.elements.display.seekTooltip = tooltip;
                    }
                    this.elements.progress = progress;
                    progressContainer.appendChild(this.elements.progress);
                    container.appendChild(progressContainer);
                }
                if ("current-time" === control) container.appendChild(createTime.call(this, "currentTime", defaultAttributes));
                if ("duration" === control) container.appendChild(createTime.call(this, "duration", defaultAttributes));
                if ("mute" === control || "volume" === control) {
                    let {volume} = this.elements;
                    if (!utils_is.element(volume) || !container.contains(volume)) {
                        volume = createElement("div", objects_extend({}, defaultAttributes, {
                            class: `${defaultAttributes.class} plyr__volume`.trim()
                        }));
                        this.elements.volume = volume;
                        container.appendChild(volume);
                    }
                    if ("mute" === control) volume.appendChild(createButton.call(this, "mute"));
                    if ("volume" === control && !utils_browser.isIos) {
                        const attributes = {
                            max: 1,
                            step: .05,
                            value: this.config.volume
                        };
                        volume.appendChild(createRange.call(this, "volume", objects_extend(attributes, {
                            id: `plyr-volume-${data.id}`
                        })));
                    }
                }
                if ("captions" === control) container.appendChild(createButton.call(this, "captions", defaultAttributes));
                if ("settings" === control && !utils_is.empty(this.config.settings)) {
                    const wrapper = createElement("div", objects_extend({}, defaultAttributes, {
                        class: `${defaultAttributes.class} plyr__menu`.trim(),
                        hidden: ""
                    }));
                    wrapper.appendChild(createButton.call(this, "settings", {
                        "aria-haspopup": true,
                        "aria-controls": `plyr-settings-${data.id}`,
                        "aria-expanded": false
                    }));
                    const popup = createElement("div", {
                        class: "plyr__menu__container",
                        id: `plyr-settings-${data.id}`,
                        hidden: ""
                    });
                    const inner = createElement("div");
                    const home = createElement("div", {
                        id: `plyr-settings-${data.id}-home`
                    });
                    const menu = createElement("div", {
                        role: "menu"
                    });
                    home.appendChild(menu);
                    inner.appendChild(home);
                    this.elements.settings.panels.home = home;
                    this.config.settings.forEach((type => {
                        const menuItem = createElement("button", objects_extend(getAttributesFromSelector(this.config.selectors.buttons.settings), {
                            type: "button",
                            class: `${this.config.classNames.control} ${this.config.classNames.control}--forward`,
                            role: "menuitem",
                            "aria-haspopup": true,
                            hidden: ""
                        }));
                        bindMenuItemShortcuts.call(this, menuItem, type);
                        events_on.call(this, menuItem, "click", (() => {
                            showMenuPanel.call(this, type, false);
                        }));
                        const flex = createElement("span", null, utils_i18n.get(type, this.config));
                        const value = createElement("span", {
                            class: this.config.classNames.menu.value
                        });
                        value.innerHTML = data[type];
                        flex.appendChild(value);
                        menuItem.appendChild(flex);
                        menu.appendChild(menuItem);
                        const pane = createElement("div", {
                            id: `plyr-settings-${data.id}-${type}`,
                            hidden: ""
                        });
                        const backButton = createElement("button", {
                            type: "button",
                            class: `${this.config.classNames.control} ${this.config.classNames.control}--back`
                        });
                        backButton.appendChild(createElement("span", {
                            "aria-hidden": true
                        }, utils_i18n.get(type, this.config)));
                        backButton.appendChild(createElement("span", {
                            class: this.config.classNames.hidden
                        }, utils_i18n.get("menuBack", this.config)));
                        events_on.call(this, pane, "keydown", (event => {
                            if ("ArrowLeft" !== event.key) return;
                            event.preventDefault();
                            event.stopPropagation();
                            showMenuPanel.call(this, "home", true);
                        }), false);
                        events_on.call(this, backButton, "click", (() => {
                            showMenuPanel.call(this, "home", false);
                        }));
                        pane.appendChild(backButton);
                        pane.appendChild(createElement("div", {
                            role: "menu"
                        }));
                        inner.appendChild(pane);
                        this.elements.settings.buttons[type] = menuItem;
                        this.elements.settings.panels[type] = pane;
                    }));
                    popup.appendChild(inner);
                    wrapper.appendChild(popup);
                    container.appendChild(wrapper);
                    this.elements.settings.popup = popup;
                    this.elements.settings.menu = wrapper;
                }
                if ("pip" === control && plyr_support.pip) container.appendChild(createButton.call(this, "pip", defaultAttributes));
                if ("airplay" === control && plyr_support.airplay) container.appendChild(createButton.call(this, "airplay", defaultAttributes));
                if ("download" === control) {
                    const attributes = objects_extend({}, defaultAttributes, {
                        element: "a",
                        href: this.download,
                        target: "_blank"
                    });
                    if (this.isHTML5) attributes.download = "";
                    const {download} = this.config.urls;
                    if (!utils_is.url(download) && this.isEmbed) objects_extend(attributes, {
                        icon: `logo-${this.provider}`,
                        label: this.provider
                    });
                    container.appendChild(createButton.call(this, "download", attributes));
                }
                if ("fullscreen" === control) container.appendChild(createButton.call(this, "fullscreen", defaultAttributes));
            }));
            if (this.isHTML5) setQualityMenu.call(this, plyr_html5.getQualityOptions.call(this));
            setSpeedMenu.call(this);
            return container;
        },
        inject() {
            if (this.config.loadSprite) {
                const icon = controls.getIconUrl.call(this);
                if (icon.cors) loadSprite(icon.url, "sprite-plyr");
            }
            this.id = Math.floor(1e4 * Math.random());
            let container = null;
            this.elements.controls = null;
            const props = {
                id: this.id,
                seektime: this.config.seekTime,
                title: this.config.title
            };
            let update = true;
            if (utils_is["function"](this.config.controls)) this.config.controls = this.config.controls.call(this, props);
            if (!this.config.controls) this.config.controls = [];
            if (utils_is.element(this.config.controls) || utils_is.string(this.config.controls)) container = this.config.controls; else {
                container = controls.create.call(this, {
                    id: this.id,
                    seektime: this.config.seekTime,
                    speed: this.speed,
                    quality: this.quality,
                    captions: plyr_captions.getLabel.call(this)
                });
                update = false;
            }
            const replace = input => {
                let result = input;
                Object.entries(props).forEach((([key, value]) => {
                    result = replaceAll(result, `{${key}}`, value);
                }));
                return result;
            };
            if (update) if (utils_is.string(this.config.controls)) container = replace(container);
            let target;
            if (utils_is.string(this.config.selectors.controls.container)) target = document.querySelector(this.config.selectors.controls.container);
            if (!utils_is.element(target)) target = this.elements.container;
            const insertMethod = utils_is.element(container) ? "insertAdjacentElement" : "insertAdjacentHTML";
            target[insertMethod]("afterbegin", container);
            if (!utils_is.element(this.elements.controls)) controls.findElements.call(this);
            if (!utils_is.empty(this.elements.buttons)) {
                const addProperty = button => {
                    const className = this.config.classNames.controlPressed;
                    Object.defineProperty(button, "pressed", {
                        enumerable: true,
                        get() {
                            return elements_hasClass(button, className);
                        },
                        set(pressed = false) {
                            elements_toggleClass(button, className, pressed);
                        }
                    });
                };
                Object.values(this.elements.buttons).filter(Boolean).forEach((button => {
                    if (utils_is.array(button) || utils_is.nodeList(button)) Array.from(button).filter(Boolean).forEach(addProperty); else addProperty(button);
                }));
            }
            if (utils_browser.isEdge) repaint(target);
            if (this.config.tooltips.controls) {
                const {classNames, selectors} = this.config;
                const selector = `${selectors.controls.wrapper} ${selectors.labels} .${classNames.hidden}`;
                const labels = getElements.call(this, selector);
                Array.from(labels).forEach((label => {
                    elements_toggleClass(label, this.config.classNames.hidden, false);
                    elements_toggleClass(label, this.config.classNames.tooltip, true);
                }));
            }
        },
        setMediaMetadata() {
            try {
                if ("mediaSession" in navigator) navigator.mediaSession.metadata = new window.MediaMetadata({
                    title: this.config.mediaMetadata.title,
                    artist: this.config.mediaMetadata.artist,
                    album: this.config.mediaMetadata.album,
                    artwork: this.config.mediaMetadata.artwork
                });
            } catch (_) {}
        },
        setMarkers() {
            if (!this.duration || this.elements.markers) return;
            const points = this.config.markers?.points?.filter((({time}) => time > 0 && time < this.duration));
            if (!points?.length) return;
            const containerFragment = document.createDocumentFragment();
            const pointsFragment = document.createDocumentFragment();
            let tipElement = null;
            const tipVisible = `${this.config.classNames.tooltip}--visible`;
            const toggleTip = show => elements_toggleClass(tipElement, tipVisible, show);
            points.forEach((point => {
                const markerElement = createElement("span", {
                    class: this.config.classNames.marker
                }, "");
                const left = `${point.time / this.duration * 100}%`;
                if (tipElement) {
                    markerElement.addEventListener("mouseenter", (() => {
                        if (point.label) return;
                        tipElement.style.left = left;
                        tipElement.innerHTML = point.label;
                        toggleTip(true);
                    }));
                    markerElement.addEventListener("mouseleave", (() => {
                        toggleTip(false);
                    }));
                }
                markerElement.addEventListener("click", (() => {
                    this.currentTime = point.time;
                }));
                markerElement.style.left = left;
                pointsFragment.appendChild(markerElement);
            }));
            containerFragment.appendChild(pointsFragment);
            if (!this.config.tooltips.seek) {
                tipElement = createElement("span", {
                    class: this.config.classNames.tooltip
                }, "");
                containerFragment.appendChild(tipElement);
            }
            this.elements.markers = {
                points: pointsFragment,
                tip: tipElement
            };
            this.elements.progress.appendChild(containerFragment);
        }
    };
    const plyr_controls = controls;
    function parseUrl(input, safe = true) {
        let url = input;
        if (safe) {
            const parser = document.createElement("a");
            parser.href = url;
            url = parser.href;
        }
        try {
            return new URL(url);
        } catch (_) {
            return null;
        }
    }
    function buildUrlParams(input) {
        const params = new URLSearchParams;
        if (utils_is.object(input)) Object.entries(input).forEach((([key, value]) => {
            params.set(key, value);
        }));
        return params;
    }
    const captions = {
        setup() {
            if (!this.supported.ui) return;
            if (!this.isVideo || this.isYouTube || this.isHTML5 && !plyr_support.textTracks) {
                if (utils_is.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions")) plyr_controls.setCaptionsMenu.call(this);
                return;
            }
            if (!utils_is.element(this.elements.captions)) {
                this.elements.captions = createElement("div", getAttributesFromSelector(this.config.selectors.captions));
                elements_insertAfter(this.elements.captions, this.elements.wrapper);
            }
            if (utils_browser.isIE && window.URL) {
                const elements = this.media.querySelectorAll("track");
                Array.from(elements).forEach((track => {
                    const src = track.getAttribute("src");
                    const url = parseUrl(src);
                    if (null !== url && url.hostname !== window.location.href.hostname && [ "http:", "https:" ].includes(url.protocol)) fetch_fetch(src, "blob").then((blob => {
                        track.setAttribute("src", window.URL.createObjectURL(blob));
                    })).catch((() => {
                        removeElement(track);
                    }));
                }));
            }
            const browserLanguages = navigator.languages || [ navigator.language || navigator.userLanguage || "en" ];
            const languages = dedupe(browserLanguages.map((language => language.split("-")[0])));
            let language = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
            if ("auto" === language) [language] = languages;
            let active = this.storage.get("captions");
            if (!utils_is.boolean(active)) ({active} = this.config.captions);
            Object.assign(this.captions, {
                toggled: false,
                active,
                language,
                languages
            });
            if (this.isHTML5) {
                const trackEvents = this.config.captions.update ? "addtrack removetrack" : "removetrack";
                events_on.call(this, this.media.textTracks, trackEvents, captions.update.bind(this));
            }
            setTimeout(captions.update.bind(this), 0);
        },
        update() {
            const tracks = captions.getTracks.call(this, true);
            const {active, language, meta, currentTrackNode} = this.captions;
            const languageExists = Boolean(tracks.find((track => track.language === language)));
            if (this.isHTML5 && this.isVideo) tracks.filter((track => !meta.get(track))).forEach((track => {
                this.debug.log("Track added", track);
                meta.set(track, {
                    default: "showing" === track.mode
                });
                if ("showing" === track.mode) track.mode = "hidden";
                events_on.call(this, track, "cuechange", (() => captions.updateCues.call(this)));
            }));
            if (languageExists && this.language !== language || !tracks.includes(currentTrackNode)) {
                captions.setLanguage.call(this, language);
                captions.toggle.call(this, active && languageExists);
            }
            if (this.elements) elements_toggleClass(this.elements.container, this.config.classNames.captions.enabled, !utils_is.empty(tracks));
            if (utils_is.array(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions")) plyr_controls.setCaptionsMenu.call(this);
        },
        toggle(input, passive = true) {
            if (!this.supported.ui) return;
            const {toggled} = this.captions;
            const activeClass = this.config.classNames.captions.active;
            const active = utils_is.nullOrUndefined(input) ? !toggled : input;
            if (active !== toggled) {
                if (!passive) {
                    this.captions.active = active;
                    this.storage.set({
                        captions: active
                    });
                }
                if (!this.language && active && !passive) {
                    const tracks = captions.getTracks.call(this);
                    const track = captions.findTrack.call(this, [ this.captions.language, ...this.captions.languages ], true);
                    this.captions.language = track.language;
                    captions.set.call(this, tracks.indexOf(track));
                    return;
                }
                if (this.elements.buttons.captions) this.elements.buttons.captions.pressed = active;
                elements_toggleClass(this.elements.container, activeClass, active);
                this.captions.toggled = active;
                plyr_controls.updateSetting.call(this, "captions");
                triggerEvent.call(this, this.media, active ? "captionsenabled" : "captionsdisabled");
            }
            setTimeout((() => {
                if (active && this.captions.toggled) this.captions.currentTrackNode.mode = "hidden";
            }));
        },
        set(index, passive = true) {
            const tracks = captions.getTracks.call(this);
            if (-1 === index) {
                captions.toggle.call(this, false, passive);
                return;
            }
            if (!utils_is.number(index)) {
                this.debug.warn("Invalid caption argument", index);
                return;
            }
            if (!(index in tracks)) {
                this.debug.warn("Track not found", index);
                return;
            }
            if (this.captions.currentTrack !== index) {
                this.captions.currentTrack = index;
                const track = tracks[index];
                const {language} = track || {};
                this.captions.currentTrackNode = track;
                plyr_controls.updateSetting.call(this, "captions");
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
        setLanguage(input, passive = true) {
            if (!utils_is.string(input)) {
                this.debug.warn("Invalid language argument", input);
                return;
            }
            const language = input.toLowerCase();
            this.captions.language = language;
            const tracks = captions.getTracks.call(this);
            const track = captions.findTrack.call(this, [ language ]);
            captions.set.call(this, tracks.indexOf(track), passive);
        },
        getTracks(update = false) {
            const tracks = Array.from((this.media || {}).textTracks || []);
            return tracks.filter((track => !this.isHTML5 || update || this.captions.meta.has(track))).filter((track => [ "captions", "subtitles" ].includes(track.kind)));
        },
        findTrack(languages, force = false) {
            const tracks = captions.getTracks.call(this);
            const sortIsDefault = track => Number((this.captions.meta.get(track) || {}).default);
            const sorted = Array.from(tracks).sort(((a, b) => sortIsDefault(b) - sortIsDefault(a)));
            let track;
            languages.every((language => {
                track = sorted.find((t => t.language === language));
                return !track;
            }));
            return track || (force ? sorted[0] : void 0);
        },
        getCurrentTrack() {
            return captions.getTracks.call(this)[this.currentTrack];
        },
        getLabel(track) {
            let currentTrack = track;
            if (!utils_is.track(currentTrack) && plyr_support.textTracks && this.captions.toggled) currentTrack = captions.getCurrentTrack.call(this);
            if (utils_is.track(currentTrack)) {
                if (!utils_is.empty(currentTrack.label)) return currentTrack.label;
                if (!utils_is.empty(currentTrack.language)) return track.language.toUpperCase();
                return utils_i18n.get("enabled", this.config);
            }
            return utils_i18n.get("disabled", this.config);
        },
        updateCues(input) {
            if (!this.supported.ui) return;
            if (!utils_is.element(this.elements.captions)) {
                this.debug.warn("No captions element to render to");
                return;
            }
            if (!utils_is.nullOrUndefined(input) && !Array.isArray(input)) {
                this.debug.warn("updateCues: Invalid input", input);
                return;
            }
            let cues = input;
            if (!cues) {
                const track = captions.getCurrentTrack.call(this);
                cues = Array.from((track || {}).activeCues || []).map((cue => cue.getCueAsHTML())).map(getHTML);
            }
            const content = cues.map((cueText => cueText.trim())).join("\n");
            const changed = content !== this.elements.captions.innerHTML;
            if (changed) {
                emptyElement(this.elements.captions);
                const caption = createElement("span", getAttributesFromSelector(this.config.selectors.caption));
                caption.innerHTML = content;
                this.elements.captions.appendChild(caption);
                triggerEvent.call(this, this.media, "cuechange");
            }
        }
    };
    const plyr_captions = captions;
    const defaults_defaults = {
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
        iconUrl: "https://cdn.plyr.io/3.7.2/plyr.svg",
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
            marker: "plyr__progress__marker",
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
                id: "data-plyr-embed-id",
                hash: "data-plyr-embed-hash"
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
        },
        mediaMetadata: {
            title: "",
            artist: "",
            album: "",
            artwork: []
        },
        markers: {
            enabled: false,
            points: []
        }
    };
    const config_defaults = defaults_defaults;
    const pip = {
        active: "picture-in-picture",
        inactive: "inline"
    };
    const providers = {
        html5: "html5",
        youtube: "youtube",
        vimeo: "vimeo"
    };
    const types = {
        audio: "audio",
        video: "video"
    };
    function getProviderByUrl(url) {
        if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(url)) return providers.youtube;
        if (/^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(url)) return providers.vimeo;
        return null;
    }
    const noop = () => {};
    class Console {
        constructor(enabled = false) {
            this.enabled = window.console && enabled;
            if (this.enabled) this.log("Debugging enabled");
        }
        get log() {
            return this.enabled ? Function.prototype.bind.call(console.log, console) : noop;
        }
        get warn() {
            return this.enabled ? Function.prototype.bind.call(console.warn, console) : noop;
        }
        get error() {
            return this.enabled ? Function.prototype.bind.call(console.error, console) : noop;
        }
    }
    class Fullscreen {
        constructor(player) {
            this.player = player;
            this.prefix = Fullscreen.prefix;
            this.property = Fullscreen.property;
            this.scrollPosition = {
                x: 0,
                y: 0
            };
            this.forceFallback = "force" === player.config.fullscreen.fallback;
            this.player.elements.fullscreen = player.config.fullscreen.container && elements_closest(this.player.elements.container, player.config.fullscreen.container);
            events_on.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : `${this.prefix}fullscreenchange`, (() => {
                this.onChange();
            }));
            events_on.call(this.player, this.player.elements.container, "dblclick", (event => {
                if (utils_is.element(this.player.elements.controls) && this.player.elements.controls.contains(event.target)) return;
                this.player.listeners.proxy(event, this.toggle, "fullscreen");
            }));
            events_on.call(this, this.player.elements.container, "keydown", (event => this.trapFocus(event)));
            this.update();
        }
        static get native() {
            return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
        }
        get usingNative() {
            return Fullscreen.native && !this.forceFallback;
        }
        static get prefix() {
            if (utils_is["function"](document.exitFullscreen)) return "";
            let value = "";
            const prefixes = [ "webkit", "moz", "ms" ];
            prefixes.some((pre => {
                if (utils_is["function"](document[`${pre}ExitFullscreen`]) || utils_is["function"](document[`${pre}CancelFullScreen`])) {
                    value = pre;
                    return true;
                }
                return false;
            }));
            return value;
        }
        static get property() {
            return "moz" === this.prefix ? "FullScreen" : "Fullscreen";
        }
        get enabled() {
            return (Fullscreen.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo;
        }
        get active() {
            if (!this.enabled) return false;
            if (!Fullscreen.native || this.forceFallback) return elements_hasClass(this.target, this.player.config.classNames.fullscreen.fallback);
            const element = !this.prefix ? this.target.getRootNode().fullscreenElement : this.target.getRootNode()[`${this.prefix}${this.property}Element`];
            return element && element.shadowRoot ? element === this.target.getRootNode().host : element === this.target;
        }
        get target() {
            return utils_browser.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container;
        }
        onChange=() => {
            if (!this.enabled) return;
            const button = this.player.elements.buttons.fullscreen;
            if (utils_is.element(button)) button.pressed = this.active;
            const target = this.target === this.player.media ? this.target : this.player.elements.container;
            triggerEvent.call(this.player, target, this.active ? "enterfullscreen" : "exitfullscreen", true);
        };
        toggleFallback=(toggle = false) => {
            if (toggle) this.scrollPosition = {
                x: window.scrollX || 0,
                y: window.scrollY || 0
            }; else window.scrollTo(this.scrollPosition.x, this.scrollPosition.y);
            document.body.style.overflow = toggle ? "hidden" : "";
            elements_toggleClass(this.target, this.player.config.classNames.fullscreen.fallback, toggle);
            if (utils_browser.isIos) {
                let viewport = document.head.querySelector('meta[name="viewport"]');
                const property = "viewport-fit=cover";
                if (!viewport) {
                    viewport = document.createElement("meta");
                    viewport.setAttribute("name", "viewport");
                }
                const hasProperty = utils_is.string(viewport.content) && viewport.content.includes(property);
                if (toggle) {
                    this.cleanupViewport = !hasProperty;
                    if (!hasProperty) viewport.content += `,${property}`;
                } else if (this.cleanupViewport) viewport.content = viewport.content.split(",").filter((part => part.trim() !== property)).join(",");
            }
            this.onChange();
        };
        trapFocus=event => {
            if (utils_browser.isIos || !this.active || "Tab" !== event.key) return;
            const focused = document.activeElement;
            const focusable = getElements.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]");
            const [first] = focusable;
            const last = focusable[focusable.length - 1];
            if (focused === last && !event.shiftKey) {
                first.focus();
                event.preventDefault();
            } else if (focused === first && event.shiftKey) {
                last.focus();
                event.preventDefault();
            }
        };
        update=() => {
            if (this.enabled) {
                let mode;
                if (this.forceFallback) mode = "Fallback (forced)"; else if (Fullscreen.native) mode = "Native"; else mode = "Fallback";
                this.player.debug.log(`${mode} fullscreen enabled`);
            } else this.player.debug.log("Fullscreen not supported and fallback disabled");
            elements_toggleClass(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled);
        };
        enter=() => {
            if (!this.enabled) return;
            if (utils_browser.isIos && this.player.config.fullscreen.iosNative) if (this.player.isVimeo) this.player.embed.requestFullscreen(); else this.target.webkitEnterFullscreen(); else if (!Fullscreen.native || this.forceFallback) this.toggleFallback(true); else if (!this.prefix) this.target.requestFullscreen({
                navigationUI: "hide"
            }); else if (!utils_is.empty(this.prefix)) this.target[`${this.prefix}Request${this.property}`]();
        };
        exit=() => {
            if (!this.enabled) return;
            if (utils_browser.isIos && this.player.config.fullscreen.iosNative) {
                this.target.webkitExitFullscreen();
                silencePromise(this.player.play());
            } else if (!Fullscreen.native || this.forceFallback) this.toggleFallback(false); else if (!this.prefix) (document.cancelFullScreen || document.exitFullscreen).call(document); else if (!utils_is.empty(this.prefix)) {
                const action = "moz" === this.prefix ? "Cancel" : "Exit";
                document[`${this.prefix}${action}${this.property}`]();
            }
        };
        toggle=() => {
            if (!this.active) this.enter(); else this.exit();
        };
    }
    const fullscreen = Fullscreen;
    function load_image_loadImage(src, minWidth = 1) {
        return new Promise(((resolve, reject) => {
            const image = new Image;
            const handler = () => {
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
    const ui = {
        addStyleHook() {
            elements_toggleClass(this.elements.container, this.config.selectors.container.replace(".", ""), true);
            elements_toggleClass(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
        },
        toggleNativeControls(toggle = false) {
            if (toggle && this.isHTML5) this.media.setAttribute("controls", ""); else this.media.removeAttribute("controls");
        },
        build() {
            this.listeners.media();
            if (!this.supported.ui) {
                this.debug.warn(`Basic support only for ${this.provider} ${this.type}`);
                ui.toggleNativeControls.call(this, true);
                return;
            }
            if (!utils_is.element(this.elements.controls)) {
                plyr_controls.inject.call(this);
                this.listeners.controls();
            }
            ui.toggleNativeControls.call(this);
            if (this.isHTML5) plyr_captions.setup.call(this);
            this.volume = null;
            this.muted = null;
            this.loop = null;
            this.quality = null;
            this.speed = null;
            plyr_controls.updateVolume.call(this);
            plyr_controls.timeUpdate.call(this);
            plyr_controls.durationUpdate.call(this);
            ui.checkPlaying.call(this);
            elements_toggleClass(this.elements.container, this.config.classNames.pip.supported, plyr_support.pip && this.isHTML5 && this.isVideo);
            elements_toggleClass(this.elements.container, this.config.classNames.airplay.supported, plyr_support.airplay && this.isHTML5);
            elements_toggleClass(this.elements.container, this.config.classNames.isIos, utils_browser.isIos);
            elements_toggleClass(this.elements.container, this.config.classNames.isTouch, this.touch);
            this.ready = true;
            setTimeout((() => {
                triggerEvent.call(this, this.media, "ready");
            }), 0);
            ui.setTitle.call(this);
            if (this.poster) ui.setPoster.call(this, this.poster, false).catch((() => {}));
            if (this.config.duration) plyr_controls.durationUpdate.call(this);
            if (this.config.mediaMetadata) plyr_controls.setMediaMetadata.call(this);
        },
        setTitle() {
            let label = utils_i18n.get("play", this.config);
            if (utils_is.string(this.config.title) && !utils_is.empty(this.config.title)) label += `, ${this.config.title}`;
            Array.from(this.elements.buttons.play || []).forEach((button => {
                button.setAttribute("aria-label", label);
            }));
            if (this.isEmbed) {
                const iframe = getElement.call(this, "iframe");
                if (!utils_is.element(iframe)) return;
                const title = !utils_is.empty(this.config.title) ? this.config.title : "video";
                const format = utils_i18n.get("frameTitle", this.config);
                iframe.setAttribute("title", format.replace("{title}", title));
            }
        },
        togglePoster(enable) {
            elements_toggleClass(this.elements.container, this.config.classNames.posterEnabled, enable);
        },
        setPoster(poster, passive = true) {
            if (passive && this.poster) return Promise.reject(new Error("Poster already set"));
            this.media.setAttribute("data-poster", poster);
            this.elements.poster.removeAttribute("hidden");
            return ready.call(this).then((() => load_image_loadImage(poster))).catch((error => {
                if (poster === this.poster) ui.togglePoster.call(this, false);
                throw error;
            })).then((() => {
                if (poster !== this.poster) throw new Error("setPoster cancelled by later call to setPoster");
            })).then((() => {
                Object.assign(this.elements.poster.style, {
                    backgroundImage: `url('${poster}')`,
                    backgroundSize: ""
                });
                ui.togglePoster.call(this, true);
                return poster;
            }));
        },
        checkPlaying(event) {
            elements_toggleClass(this.elements.container, this.config.classNames.playing, this.playing);
            elements_toggleClass(this.elements.container, this.config.classNames.paused, this.paused);
            elements_toggleClass(this.elements.container, this.config.classNames.stopped, this.stopped);
            Array.from(this.elements.buttons.play || []).forEach((target => {
                Object.assign(target, {
                    pressed: this.playing
                });
                target.setAttribute("aria-label", utils_i18n.get(this.playing ? "pause" : "play", this.config));
            }));
            if (utils_is.event(event) && "timeupdate" === event.type) return;
            ui.toggleControls.call(this);
        },
        checkLoading(event) {
            this.loading = [ "stalled", "waiting" ].includes(event.type);
            clearTimeout(this.timers.loading);
            this.timers.loading = setTimeout((() => {
                elements_toggleClass(this.elements.container, this.config.classNames.loading, this.loading);
                ui.toggleControls.call(this);
            }), this.loading ? 250 : 0);
        },
        toggleControls(force) {
            const {controls: controlsElement} = this.elements;
            if (controlsElement && this.config.hideControls) {
                const recentTouchSeek = this.touch && this.lastSeekTime + 2e3 > Date.now();
                this.toggleControls(Boolean(force || this.loading || this.paused || controlsElement.pressed || controlsElement.hover || recentTouchSeek));
            }
        },
        migrateStyles() {
            Object.values({
                ...this.media.style
            }).filter((key => !utils_is.empty(key) && utils_is.string(key) && key.startsWith("--plyr"))).forEach((key => {
                this.elements.container.style.setProperty(key, this.media.style.getPropertyValue(key));
                this.media.style.removeProperty(key);
            }));
            if (utils_is.empty(this.media.style)) this.media.removeAttribute("style");
        }
    };
    const plyr_ui = ui;
    class Listeners {
        constructor(player) {
            this.player = player;
            this.lastKey = null;
            this.focusTimer = null;
            this.lastKeyDown = null;
            this.handleKey = this.handleKey.bind(this);
            this.toggleMenu = this.toggleMenu.bind(this);
            this.setTabFocus = this.setTabFocus.bind(this);
            this.firstTouch = this.firstTouch.bind(this);
        }
        handleKey(event) {
            const {player} = this;
            const {elements} = player;
            const {key, type, altKey, ctrlKey, metaKey, shiftKey} = event;
            const pressed = "keydown" === type;
            const repeat = pressed && key === this.lastKey;
            if (altKey || ctrlKey || metaKey || shiftKey) return;
            if (!key) return;
            const seekByIncrement = increment => {
                player.currentTime = player.duration / 10 * increment;
            };
            if (pressed) {
                const focused = document.activeElement;
                if (utils_is.element(focused)) {
                    const {editable} = player.config.selectors;
                    const {seek} = elements.inputs;
                    if (focused !== seek && matches(focused, editable)) return;
                    if ("Space" === event.key && matches(focused, 'button, [role^="menuitem"]')) return;
                }
                const preventDefault = [ "Space", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "c", "f", "k", "l", "m" ];
                if (preventDefault.includes(key)) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                switch (key) {
                  case "0":
                  case "1":
                  case "2":
                  case "3":
                  case "4":
                  case "5":
                  case "6":
                  case "7":
                  case "8":
                  case "9":
                    if (!repeat) seekByIncrement(parseInt(key, 10));
                    break;

                  case "Space":
                  case "k":
                    if (!repeat) silencePromise(player.togglePlay());
                    break;

                  case "ArrowUp":
                    player.increaseVolume(.1);
                    break;

                  case "ArrowDown":
                    player.decreaseVolume(.1);
                    break;

                  case "m":
                    if (!repeat) player.muted = !player.muted;
                    break;

                  case "ArrowRight":
                    player.forward();
                    break;

                  case "ArrowLeft":
                    player.rewind();
                    break;

                  case "f":
                    player.fullscreen.toggle();
                    break;

                  case "c":
                    if (!repeat) player.toggleCaptions();
                    break;

                  case "l":
                    player.loop = !player.loop;
                    break;

                  default:
                    break;
                }
                if ("Escape" === key && !player.fullscreen.usingNative && player.fullscreen.active) player.fullscreen.toggle();
                this.lastKey = key;
            } else this.lastKey = null;
        }
        toggleMenu(event) {
            plyr_controls.toggleMenu.call(this.player, event);
        }
        firstTouch=() => {
            const {player} = this;
            const {elements} = player;
            player.touch = true;
            elements_toggleClass(elements.container, player.config.classNames.isTouch, true);
        };
        setTabFocus=event => {
            const {player} = this;
            const {elements} = player;
            const {key, type, timeStamp} = event;
            clearTimeout(this.focusTimer);
            if ("keydown" === type && "Tab" !== key) return;
            if ("keydown" === type) this.lastKeyDown = timeStamp;
            const removeCurrent = () => {
                const className = player.config.classNames.tabFocus;
                const current = getElements.call(player, `.${className}`);
                elements_toggleClass(current, className, false);
            };
            const wasKeyDown = timeStamp - this.lastKeyDown <= 20;
            if ("focus" === type && !wasKeyDown) return;
            removeCurrent();
            if ("focusout" !== type) this.focusTimer = setTimeout((() => {
                const focused = document.activeElement;
                if (!elements.container.contains(focused)) return;
                elements_toggleClass(document.activeElement, player.config.classNames.tabFocus, true);
            }), 10);
        };
        global=(toggle = true) => {
            const {player} = this;
            if (player.config.keyboard.global) toggleListener.call(player, window, "keydown keyup", this.handleKey, toggle, false);
            toggleListener.call(player, document.body, "click", this.toggleMenu, toggle);
            events_once.call(player, document.body, "touchstart", this.firstTouch);
            toggleListener.call(player, document.body, "keydown focus blur focusout", this.setTabFocus, toggle, false, true);
        };
        container=() => {
            const {player} = this;
            const {config, elements, timers} = player;
            if (!config.keyboard.global && config.keyboard.focused) events_on.call(player, elements.container, "keydown keyup", this.handleKey, false);
            events_on.call(player, elements.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", (event => {
                const {controls: controlsElement} = elements;
                if (controlsElement && "enterfullscreen" === event.type) {
                    controlsElement.pressed = false;
                    controlsElement.hover = false;
                }
                const show = [ "touchstart", "touchmove", "mousemove" ].includes(event.type);
                let delay = 0;
                if (show) {
                    plyr_ui.toggleControls.call(player, true);
                    delay = player.touch ? 3e3 : 2e3;
                }
                clearTimeout(timers.controls);
                timers.controls = setTimeout((() => plyr_ui.toggleControls.call(player, false)), delay);
            }));
            const setGutter = () => {
                if (!player.isVimeo || player.config.vimeo.premium) return;
                const target = elements.wrapper;
                const {active} = player.fullscreen;
                const [videoWidth, videoHeight] = getAspectRatio.call(player);
                const useNativeAspectRatio = supportsCSS(`aspect-ratio: ${videoWidth} / ${videoHeight}`);
                if (!active) {
                    if (useNativeAspectRatio) {
                        target.style.width = null;
                        target.style.height = null;
                    } else {
                        target.style.maxWidth = null;
                        target.style.margin = null;
                    }
                    return;
                }
                const [viewportWidth, viewportHeight] = getViewportSize();
                const overflow = viewportWidth / viewportHeight > videoWidth / videoHeight;
                if (useNativeAspectRatio) {
                    target.style.width = overflow ? "auto" : "100%";
                    target.style.height = overflow ? "100%" : "auto";
                } else {
                    target.style.maxWidth = overflow ? `${viewportHeight / videoHeight * videoWidth}px` : null;
                    target.style.margin = overflow ? "0 auto" : null;
                }
            };
            const resized = () => {
                clearTimeout(timers.resized);
                timers.resized = setTimeout(setGutter, 50);
            };
            events_on.call(player, elements.container, "enterfullscreen exitfullscreen", (event => {
                const {target} = player.fullscreen;
                if (target !== elements.container) return;
                if (!player.isEmbed && utils_is.empty(player.config.ratio)) return;
                setGutter();
                const method = "enterfullscreen" === event.type ? events_on : events_off;
                method.call(player, window, "resize", resized);
            }));
        };
        media=() => {
            const {player} = this;
            const {elements} = player;
            events_on.call(player, player.media, "timeupdate seeking seeked", (event => plyr_controls.timeUpdate.call(player, event)));
            events_on.call(player, player.media, "durationchange loadeddata loadedmetadata", (event => plyr_controls.durationUpdate.call(player, event)));
            events_on.call(player, player.media, "ended", (() => {
                if (player.isHTML5 && player.isVideo && player.config.resetOnEnd) {
                    player.restart();
                    player.pause();
                }
            }));
            events_on.call(player, player.media, "progress playing seeking seeked", (event => plyr_controls.updateProgress.call(player, event)));
            events_on.call(player, player.media, "volumechange", (event => plyr_controls.updateVolume.call(player, event)));
            events_on.call(player, player.media, "playing play pause ended emptied timeupdate", (event => plyr_ui.checkPlaying.call(player, event)));
            events_on.call(player, player.media, "waiting canplay seeked playing", (event => plyr_ui.checkLoading.call(player, event)));
            if (player.supported.ui && player.config.clickToPlay && !player.isAudio) {
                const wrapper = getElement.call(player, `.${player.config.classNames.video}`);
                if (!utils_is.element(wrapper)) return;
                events_on.call(player, elements.container, "click", (event => {
                    const targets = [ elements.container, wrapper ];
                    if (!targets.includes(event.target) && !wrapper.contains(event.target)) return;
                    if (player.touch && player.config.hideControls) return;
                    if (player.ended) {
                        this.proxy(event, player.restart, "restart");
                        this.proxy(event, (() => {
                            silencePromise(player.play());
                        }), "play");
                    } else this.proxy(event, (() => {
                        silencePromise(player.togglePlay());
                    }), "play");
                }));
            }
            if (player.supported.ui && player.config.disableContextMenu) events_on.call(player, elements.wrapper, "contextmenu", (event => {
                event.preventDefault();
            }), false);
            events_on.call(player, player.media, "volumechange", (() => {
                player.storage.set({
                    volume: player.volume,
                    muted: player.muted
                });
            }));
            events_on.call(player, player.media, "ratechange", (() => {
                plyr_controls.updateSetting.call(player, "speed");
                player.storage.set({
                    speed: player.speed
                });
            }));
            events_on.call(player, player.media, "qualitychange", (event => {
                plyr_controls.updateSetting.call(player, "quality", null, event.detail.quality);
            }));
            events_on.call(player, player.media, "ready qualitychange", (() => {
                plyr_controls.setDownloadUrl.call(player);
            }));
            const proxyEvents = player.config.events.concat([ "keyup", "keydown" ]).join(" ");
            events_on.call(player, player.media, proxyEvents, (event => {
                let {detail = {}} = event;
                if ("error" === event.type) detail = player.media.error;
                triggerEvent.call(player, elements.container, event.type, true, detail);
            }));
        };
        proxy=(event, defaultHandler, customHandlerKey) => {
            const {player} = this;
            const customHandler = player.config.listeners[customHandlerKey];
            const hasCustomHandler = utils_is["function"](customHandler);
            let returned = true;
            if (hasCustomHandler) returned = customHandler.call(player, event);
            if (false !== returned && utils_is["function"](defaultHandler)) defaultHandler.call(player, event);
        };
        bind=(element, type, defaultHandler, customHandlerKey, passive = true) => {
            const {player} = this;
            const customHandler = player.config.listeners[customHandlerKey];
            const hasCustomHandler = utils_is["function"](customHandler);
            events_on.call(player, element, type, (event => this.proxy(event, defaultHandler, customHandlerKey)), passive && !hasCustomHandler);
        };
        controls=() => {
            const {player} = this;
            const {elements} = player;
            const inputEvent = utils_browser.isIE ? "change" : "input";
            if (elements.buttons.play) Array.from(elements.buttons.play).forEach((button => {
                this.bind(button, "click", (() => {
                    silencePromise(player.togglePlay());
                }), "play");
            }));
            this.bind(elements.buttons.restart, "click", player.restart, "restart");
            this.bind(elements.buttons.rewind, "click", (() => {
                player.lastSeekTime = Date.now();
                player.rewind();
            }), "rewind");
            this.bind(elements.buttons.fastForward, "click", (() => {
                player.lastSeekTime = Date.now();
                player.forward();
            }), "fastForward");
            this.bind(elements.buttons.mute, "click", (() => {
                player.muted = !player.muted;
            }), "mute");
            this.bind(elements.buttons.captions, "click", (() => player.toggleCaptions()));
            this.bind(elements.buttons.download, "click", (() => {
                triggerEvent.call(player, player.media, "download");
            }), "download");
            this.bind(elements.buttons.fullscreen, "click", (() => {
                player.fullscreen.toggle();
            }), "fullscreen");
            this.bind(elements.buttons.pip, "click", (() => {
                player.pip = "toggle";
            }), "pip");
            this.bind(elements.buttons.airplay, "click", player.airplay, "airplay");
            this.bind(elements.buttons.settings, "click", (event => {
                event.stopPropagation();
                event.preventDefault();
                plyr_controls.toggleMenu.call(player, event);
            }), null, false);
            this.bind(elements.buttons.settings, "keyup", (event => {
                if (![ "Space", "Enter" ].includes(event.key)) return;
                if ("Enter" === event.key) {
                    plyr_controls.focusFirstMenuItem.call(player, null, true);
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                plyr_controls.toggleMenu.call(player, event);
            }), null, false);
            this.bind(elements.settings.menu, "keydown", (event => {
                if ("Escape" === event.key) plyr_controls.toggleMenu.call(player, event);
            }));
            this.bind(elements.inputs.seek, "mousedown mousemove", (event => {
                const rect = elements.progress.getBoundingClientRect();
                const percent = 100 / rect.width * (event.pageX - rect.left);
                event.currentTarget.setAttribute("seek-value", percent);
            }));
            this.bind(elements.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", (event => {
                const seek = event.currentTarget;
                const attribute = "play-on-seeked";
                if (utils_is.keyboardEvent(event) && ![ "ArrowLeft", "ArrowRight" ].includes(event.key)) return;
                player.lastSeekTime = Date.now();
                const play = seek.hasAttribute(attribute);
                const done = [ "mouseup", "touchend", "keyup" ].includes(event.type);
                if (play && done) {
                    seek.removeAttribute(attribute);
                    silencePromise(player.play());
                } else if (!done && player.playing) {
                    seek.setAttribute(attribute, "");
                    player.pause();
                }
            }));
            if (utils_browser.isIos) {
                const inputs = getElements.call(player, 'input[type="range"]');
                Array.from(inputs).forEach((input => this.bind(input, inputEvent, (event => repaint(event.target)))));
            }
            this.bind(elements.inputs.seek, inputEvent, (event => {
                const seek = event.currentTarget;
                let seekTo = seek.getAttribute("seek-value");
                if (utils_is.empty(seekTo)) seekTo = seek.value;
                seek.removeAttribute("seek-value");
                player.currentTime = seekTo / seek.max * player.duration;
            }), "seek");
            this.bind(elements.progress, "mouseenter mouseleave mousemove", (event => plyr_controls.updateSeekTooltip.call(player, event)));
            this.bind(elements.progress, "mousemove touchmove", (event => {
                const {previewThumbnails} = player;
                if (previewThumbnails && previewThumbnails.loaded) previewThumbnails.startMove(event);
            }));
            this.bind(elements.progress, "mouseleave touchend click", (() => {
                const {previewThumbnails} = player;
                if (previewThumbnails && previewThumbnails.loaded) previewThumbnails.endMove(false, true);
            }));
            this.bind(elements.progress, "mousedown touchstart", (event => {
                const {previewThumbnails} = player;
                if (previewThumbnails && previewThumbnails.loaded) previewThumbnails.startScrubbing(event);
            }));
            this.bind(elements.progress, "mouseup touchend", (event => {
                const {previewThumbnails} = player;
                if (previewThumbnails && previewThumbnails.loaded) previewThumbnails.endScrubbing(event);
            }));
            if (utils_browser.isWebkit) Array.from(getElements.call(player, 'input[type="range"]')).forEach((element => {
                this.bind(element, "input", (event => plyr_controls.updateRangeFill.call(player, event.target)));
            }));
            if (player.config.toggleInvert && !utils_is.element(elements.display.duration)) this.bind(elements.display.currentTime, "click", (() => {
                if (0 === player.currentTime) return;
                player.config.invertTime = !player.config.invertTime;
                plyr_controls.timeUpdate.call(player);
            }));
            this.bind(elements.inputs.volume, inputEvent, (event => {
                player.volume = event.target.value;
            }), "volume");
            this.bind(elements.controls, "mouseenter mouseleave", (event => {
                elements.controls.hover = !player.touch && "mouseenter" === event.type;
            }));
            if (elements.fullscreen) Array.from(elements.fullscreen.children).filter((c => !c.contains(elements.container))).forEach((child => {
                this.bind(child, "mouseenter mouseleave", (event => {
                    if (elements.controls) elements.controls.hover = !player.touch && "mouseenter" === event.type;
                }));
            }));
            this.bind(elements.controls, "mousedown mouseup touchstart touchend touchcancel", (event => {
                elements.controls.pressed = [ "mousedown", "touchstart" ].includes(event.type);
            }));
            this.bind(elements.controls, "focusin", (() => {
                const {config, timers} = player;
                elements_toggleClass(elements.controls, config.classNames.noTransition, true);
                plyr_ui.toggleControls.call(player, true);
                setTimeout((() => {
                    elements_toggleClass(elements.controls, config.classNames.noTransition, false);
                }), 0);
                const delay = this.touch ? 3e3 : 4e3;
                clearTimeout(timers.controls);
                timers.controls = setTimeout((() => plyr_ui.toggleControls.call(player, false)), delay);
            }));
            this.bind(elements.inputs.volume, "wheel", (event => {
                const inverted = event.webkitDirectionInvertedFromDevice;
                const [x, y] = [ event.deltaX, -event.deltaY ].map((value => inverted ? -value : value));
                const direction = Math.sign(Math.abs(x) > Math.abs(y) ? x : y);
                player.increaseVolume(direction / 50);
                const {volume} = player.media;
                if (1 === direction && volume < 1 || -1 === direction && volume > 0) event.preventDefault();
            }), "volume", false);
        };
    }
    const listeners = Listeners;
    function loadScript(url) {
        return new Promise(((resolve, reject) => {
            loadjs(url, {
                success: resolve,
                error: reject
            });
        }));
    }
    function parseId(url) {
        if (utils_is.empty(url)) return null;
        if (utils_is.number(Number(url))) return url;
        const regex = /^.*(vimeo.com\/|video\/)(\d+).*/;
        return url.match(regex) ? RegExp.$2 : url;
    }
    function parseHash(url) {
        const regex = /^.*(vimeo.com\/|video\/)(\d+)(\?.*&*h=|\/)+([\d,a-f]+)/;
        const found = url.match(regex);
        return found && 5 === found.length ? found[4] : null;
    }
    function assurePlaybackState(play) {
        if (play && !this.embed.hasPlayed) this.embed.hasPlayed = true;
        if (this.media.paused === play) {
            this.media.paused = !play;
            triggerEvent.call(this, this.media, play ? "play" : "pause");
        }
    }
    const vimeo = {
        setup() {
            const player = this;
            elements_toggleClass(player.elements.wrapper, player.config.classNames.embed, true);
            player.options.speed = player.config.speed.options;
            setAspectRatio.call(player);
            if (!utils_is.object(window.Vimeo)) loadScript(player.config.urls.vimeo.sdk).then((() => {
                vimeo.ready.call(player);
            })).catch((error => {
                player.debug.warn("Vimeo SDK (player.js) failed to load", error);
            })); else vimeo.ready.call(player);
        },
        ready() {
            const player = this;
            const config = player.config.vimeo;
            const {premium, referrerPolicy, ...frameParams} = config;
            let source = player.media.getAttribute("src");
            let hash = "";
            if (utils_is.empty(source)) {
                source = player.media.getAttribute(player.config.attributes.embed.id);
                hash = player.media.getAttribute(player.config.attributes.embed.hash);
            } else hash = parseHash(source);
            const hashParam = hash ? {
                h: hash
            } : {};
            if (premium) Object.assign(frameParams, {
                controls: false,
                sidedock: false
            });
            const params = buildUrlParams({
                loop: player.config.loop.active,
                autoplay: player.autoplay,
                muted: player.muted,
                gesture: "media",
                playsinline: !this.config.fullscreen.iosNative,
                ...hashParam,
                ...frameParams
            });
            const id = parseId(source);
            const iframe = createElement("iframe");
            const src = format(player.config.urls.vimeo.iframe, id, params);
            iframe.setAttribute("src", src);
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute("allow", [ "autoplay", "fullscreen", "picture-in-picture", "encrypted-media", "accelerometer", "gyroscope" ].join("; "));
            if (!utils_is.empty(referrerPolicy)) iframe.setAttribute("referrerPolicy", referrerPolicy);
            if (premium || !config.customControls) {
                iframe.setAttribute("data-poster", player.poster);
                player.media = replaceElement(iframe, player.media);
            } else {
                const wrapper = createElement("div", {
                    class: player.config.classNames.embedContainer,
                    "data-poster": player.poster
                });
                wrapper.appendChild(iframe);
                player.media = replaceElement(wrapper, player.media);
            }
            if (!config.customControls) fetch_fetch(format(player.config.urls.vimeo.api, src)).then((response => {
                if (utils_is.empty(response) || !response.thumbnail_url) return;
                plyr_ui.setPoster.call(player, response.thumbnail_url).catch((() => {}));
            }));
            player.embed = new window.Vimeo.Player(iframe, {
                autopause: player.config.autopause,
                muted: player.muted
            });
            player.media.paused = true;
            player.media.currentTime = 0;
            if (player.supported.ui) player.embed.disableTextTrack();
            player.media.play = () => {
                assurePlaybackState.call(player, true);
                return player.embed.play();
            };
            player.media.pause = () => {
                assurePlaybackState.call(player, false);
                return player.embed.pause();
            };
            player.media.stop = () => {
                player.pause();
                player.currentTime = 0;
            };
            let {currentTime} = player.media;
            Object.defineProperty(player.media, "currentTime", {
                get() {
                    return currentTime;
                },
                set(time) {
                    const {embed, media, paused, volume} = player;
                    const restorePause = paused && !embed.hasPlayed;
                    media.seeking = true;
                    triggerEvent.call(player, media, "seeking");
                    Promise.resolve(restorePause && embed.setVolume(0)).then((() => embed.setCurrentTime(time))).then((() => restorePause && embed.pause())).then((() => restorePause && embed.setVolume(volume))).catch((() => {}));
                }
            });
            let speed = player.config.speed.selected;
            Object.defineProperty(player.media, "playbackRate", {
                get() {
                    return speed;
                },
                set(input) {
                    player.embed.setPlaybackRate(input).then((() => {
                        speed = input;
                        triggerEvent.call(player, player.media, "ratechange");
                    })).catch((() => {
                        player.options.speed = [ 1 ];
                    }));
                }
            });
            let {volume} = player.config;
            Object.defineProperty(player.media, "volume", {
                get() {
                    return volume;
                },
                set(input) {
                    player.embed.setVolume(input).then((() => {
                        volume = input;
                        triggerEvent.call(player, player.media, "volumechange");
                    }));
                }
            });
            let {muted} = player.config;
            Object.defineProperty(player.media, "muted", {
                get() {
                    return muted;
                },
                set(input) {
                    const toggle = utils_is.boolean(input) ? input : false;
                    player.embed.setVolume(toggle ? 0 : player.config.volume).then((() => {
                        muted = toggle;
                        triggerEvent.call(player, player.media, "volumechange");
                    }));
                }
            });
            let {loop} = player.config;
            Object.defineProperty(player.media, "loop", {
                get() {
                    return loop;
                },
                set(input) {
                    const toggle = utils_is.boolean(input) ? input : player.config.loop.active;
                    player.embed.setLoop(toggle).then((() => {
                        loop = toggle;
                    }));
                }
            });
            let currentSrc;
            player.embed.getVideoUrl().then((value => {
                currentSrc = value;
                plyr_controls.setDownloadUrl.call(player);
            })).catch((error => {
                this.debug.warn(error);
            }));
            Object.defineProperty(player.media, "currentSrc", {
                get() {
                    return currentSrc;
                }
            });
            Object.defineProperty(player.media, "ended", {
                get() {
                    return player.currentTime === player.duration;
                }
            });
            Promise.all([ player.embed.getVideoWidth(), player.embed.getVideoHeight() ]).then((dimensions => {
                const [width, height] = dimensions;
                player.embed.ratio = roundAspectRatio(width, height);
                setAspectRatio.call(this);
            }));
            player.embed.setAutopause(player.config.autopause).then((state => {
                player.config.autopause = state;
            }));
            player.embed.getVideoTitle().then((title => {
                player.config.title = title;
                plyr_ui.setTitle.call(this);
            }));
            player.embed.getCurrentTime().then((value => {
                currentTime = value;
                triggerEvent.call(player, player.media, "timeupdate");
            }));
            player.embed.getDuration().then((value => {
                player.media.duration = value;
                triggerEvent.call(player, player.media, "durationchange");
            }));
            player.embed.getTextTracks().then((tracks => {
                player.media.textTracks = tracks;
                plyr_captions.setup.call(player);
            }));
            player.embed.on("cuechange", (({cues = []}) => {
                const strippedCues = cues.map((cue => stripHTML(cue.text)));
                plyr_captions.updateCues.call(player, strippedCues);
            }));
            player.embed.on("loaded", (() => {
                player.embed.getPaused().then((paused => {
                    assurePlaybackState.call(player, !paused);
                    if (!paused) triggerEvent.call(player, player.media, "playing");
                }));
                if (utils_is.element(player.embed.element) && player.supported.ui) {
                    const frame = player.embed.element;
                    frame.setAttribute("tabindex", -1);
                }
            }));
            player.embed.on("bufferstart", (() => {
                triggerEvent.call(player, player.media, "waiting");
            }));
            player.embed.on("bufferend", (() => {
                triggerEvent.call(player, player.media, "playing");
            }));
            player.embed.on("play", (() => {
                assurePlaybackState.call(player, true);
                triggerEvent.call(player, player.media, "playing");
            }));
            player.embed.on("pause", (() => {
                assurePlaybackState.call(player, false);
            }));
            player.embed.on("timeupdate", (data => {
                player.media.seeking = false;
                currentTime = data.seconds;
                triggerEvent.call(player, player.media, "timeupdate");
            }));
            player.embed.on("progress", (data => {
                player.media.buffered = data.percent;
                triggerEvent.call(player, player.media, "progress");
                if (1 === parseInt(data.percent, 10)) triggerEvent.call(player, player.media, "canplaythrough");
                player.embed.getDuration().then((value => {
                    if (value !== player.media.duration) {
                        player.media.duration = value;
                        triggerEvent.call(player, player.media, "durationchange");
                    }
                }));
            }));
            player.embed.on("seeked", (() => {
                player.media.seeking = false;
                triggerEvent.call(player, player.media, "seeked");
            }));
            player.embed.on("ended", (() => {
                player.media.paused = true;
                triggerEvent.call(player, player.media, "ended");
            }));
            player.embed.on("error", (detail => {
                player.media.error = detail;
                triggerEvent.call(player, player.media, "error");
            }));
            if (config.customControls) setTimeout((() => plyr_ui.build.call(player)), 0);
        }
    };
    const plugins_vimeo = vimeo;
    function youtube_parseId(url) {
        if (utils_is.empty(url)) return null;
        const regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        return url.match(regex) ? RegExp.$2 : url;
    }
    function youtube_assurePlaybackState(play) {
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
    const youtube = {
        setup() {
            elements_toggleClass(this.elements.wrapper, this.config.classNames.embed, true);
            if (utils_is.object(window.YT) && utils_is["function"](window.YT.Player)) youtube.ready.call(this); else {
                const callback = window.onYouTubeIframeAPIReady;
                window.onYouTubeIframeAPIReady = () => {
                    if (utils_is["function"](callback)) callback();
                    youtube.ready.call(this);
                };
                loadScript(this.config.urls.youtube.sdk).catch((error => {
                    this.debug.warn("YouTube API failed to load", error);
                }));
            }
        },
        getTitle(videoId) {
            const url = format(this.config.urls.youtube.api, videoId);
            fetch_fetch(url).then((data => {
                if (utils_is.object(data)) {
                    const {title, height, width} = data;
                    this.config.title = title;
                    plyr_ui.setTitle.call(this);
                    this.embed.ratio = roundAspectRatio(width, height);
                }
                setAspectRatio.call(this);
            })).catch((() => {
                setAspectRatio.call(this);
            }));
        },
        ready() {
            const player = this;
            const config = player.config.youtube;
            const currentId = player.media && player.media.getAttribute("id");
            if (!utils_is.empty(currentId) && currentId.startsWith("youtube-")) return;
            let source = player.media.getAttribute("src");
            if (utils_is.empty(source)) source = player.media.getAttribute(this.config.attributes.embed.id);
            const videoId = youtube_parseId(source);
            const id = generateId(player.provider);
            const container = createElement("div", {
                id,
                "data-poster": config.customControls ? player.poster : void 0
            });
            player.media = replaceElement(container, player.media);
            if (config.customControls) {
                const posterSrc = s => `https://i.ytimg.com/vi/${videoId}/${s}default.jpg`;
                load_image_loadImage(posterSrc("maxres"), 121).catch((() => load_image_loadImage(posterSrc("sd"), 121))).catch((() => load_image_loadImage(posterSrc("hq")))).then((image => plyr_ui.setPoster.call(player, image.src))).then((src => {
                    if (!src.includes("maxres")) player.elements.poster.style.backgroundSize = "cover";
                })).catch((() => {}));
            }
            player.embed = new window.YT.Player(player.media, {
                videoId,
                host: getHost(config),
                playerVars: objects_extend({}, {
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
                    onError(event) {
                        if (!player.media.error) {
                            const code = event.data;
                            const message = {
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
                    onPlaybackRateChange(event) {
                        const instance = event.target;
                        player.media.playbackRate = instance.getPlaybackRate();
                        triggerEvent.call(player, player.media, "ratechange");
                    },
                    onReady(event) {
                        if (utils_is["function"](player.media.play)) return;
                        const instance = event.target;
                        youtube.getTitle.call(player, videoId);
                        player.media.play = () => {
                            youtube_assurePlaybackState.call(player, true);
                            instance.playVideo();
                        };
                        player.media.pause = () => {
                            youtube_assurePlaybackState.call(player, false);
                            instance.pauseVideo();
                        };
                        player.media.stop = () => {
                            instance.stopVideo();
                        };
                        player.media.duration = instance.getDuration();
                        player.media.paused = true;
                        player.media.currentTime = 0;
                        Object.defineProperty(player.media, "currentTime", {
                            get() {
                                return Number(instance.getCurrentTime());
                            },
                            set(time) {
                                if (player.paused && !player.embed.hasPlayed) player.embed.mute();
                                player.media.seeking = true;
                                triggerEvent.call(player, player.media, "seeking");
                                instance.seekTo(time);
                            }
                        });
                        Object.defineProperty(player.media, "playbackRate", {
                            get() {
                                return instance.getPlaybackRate();
                            },
                            set(input) {
                                instance.setPlaybackRate(input);
                            }
                        });
                        let {volume} = player.config;
                        Object.defineProperty(player.media, "volume", {
                            get() {
                                return volume;
                            },
                            set(input) {
                                volume = input;
                                instance.setVolume(100 * volume);
                                triggerEvent.call(player, player.media, "volumechange");
                            }
                        });
                        let {muted} = player.config;
                        Object.defineProperty(player.media, "muted", {
                            get() {
                                return muted;
                            },
                            set(input) {
                                const toggle = utils_is.boolean(input) ? input : muted;
                                muted = toggle;
                                instance[toggle ? "mute" : "unMute"]();
                                instance.setVolume(100 * volume);
                                triggerEvent.call(player, player.media, "volumechange");
                            }
                        });
                        Object.defineProperty(player.media, "currentSrc", {
                            get() {
                                return instance.getVideoUrl();
                            }
                        });
                        Object.defineProperty(player.media, "ended", {
                            get() {
                                return player.currentTime === player.duration;
                            }
                        });
                        const speeds = instance.getAvailablePlaybackRates();
                        player.options.speed = speeds.filter((s => player.config.speed.options.includes(s)));
                        if (player.supported.ui && config.customControls) player.media.setAttribute("tabindex", -1);
                        triggerEvent.call(player, player.media, "timeupdate");
                        triggerEvent.call(player, player.media, "durationchange");
                        clearInterval(player.timers.buffering);
                        player.timers.buffering = setInterval((() => {
                            player.media.buffered = instance.getVideoLoadedFraction();
                            if (null === player.media.lastBuffered || player.media.lastBuffered < player.media.buffered) triggerEvent.call(player, player.media, "progress");
                            player.media.lastBuffered = player.media.buffered;
                            if (1 === player.media.buffered) {
                                clearInterval(player.timers.buffering);
                                triggerEvent.call(player, player.media, "canplaythrough");
                            }
                        }), 200);
                        if (config.customControls) setTimeout((() => plyr_ui.build.call(player)), 50);
                    },
                    onStateChange(event) {
                        const instance = event.target;
                        clearInterval(player.timers.playing);
                        const seeked = player.media.seeking && [ 1, 2 ].includes(event.data);
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
                            youtube_assurePlaybackState.call(player, false);
                            if (player.media.loop) {
                                instance.stopVideo();
                                instance.playVideo();
                            } else triggerEvent.call(player, player.media, "ended");
                            break;

                          case 1:
                            if (config.customControls && !player.config.autoplay && player.media.paused && !player.embed.hasPlayed) player.media.pause(); else {
                                youtube_assurePlaybackState.call(player, true);
                                triggerEvent.call(player, player.media, "playing");
                                player.timers.playing = setInterval((() => {
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
                            youtube_assurePlaybackState.call(player, false);
                            break;

                          case 3:
                            triggerEvent.call(player, player.media, "waiting");
                            break;

                          default:
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
    const plugins_youtube = youtube;
    const media = {
        setup() {
            if (!this.media) {
                this.debug.warn("No media element found!");
                return;
            }
            elements_toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", this.type), true);
            elements_toggleClass(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), true);
            if (this.isEmbed) elements_toggleClass(this.elements.container, this.config.classNames.type.replace("{0}", "video"), true);
            if (this.isVideo) {
                this.elements.wrapper = createElement("div", {
                    class: this.config.classNames.video
                });
                wrap(this.media, this.elements.wrapper);
                this.elements.poster = createElement("div", {
                    class: this.config.classNames.poster
                });
                this.elements.wrapper.appendChild(this.elements.poster);
            }
            if (this.isHTML5) plyr_html5.setup.call(this); else if (this.isYouTube) plugins_youtube.setup.call(this); else if (this.isVimeo) plugins_vimeo.setup.call(this);
        }
    };
    const plyr_media = media;
    const destroy = instance => {
        if (instance.manager) instance.manager.destroy();
        if (instance.elements.displayContainer) instance.elements.displayContainer.destroy();
        instance.elements.container.remove();
    };
    class Ads {
        constructor(player) {
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
            this.managerPromise = new Promise(((resolve, reject) => {
                this.on("loaded", resolve);
                this.on("error", reject);
            }));
            this.load();
        }
        get enabled() {
            const {config} = this;
            return this.player.isHTML5 && this.player.isVideo && config.enabled && (!utils_is.empty(config.publisherId) || utils_is.url(config.tagUrl));
        }
        load=() => {
            if (!this.enabled) return;
            if (!utils_is.object(window.google) || !utils_is.object(window.google.ima)) loadScript(this.player.config.urls.googleIMA.sdk).then((() => {
                this.ready();
            })).catch((() => {
                this.trigger("error", new Error("Google IMA SDK failed to load"));
            })); else this.ready();
        };
        ready=() => {
            if (!this.enabled) destroy(this);
            this.startSafetyTimer(12e3, "ready()");
            this.managerPromise.then((() => {
                this.clearSafetyTimer("onAdsManagerLoaded()");
            }));
            this.listeners();
            this.setupIMA();
        };
        get tagUrl() {
            const {config} = this;
            if (utils_is.url(config.tagUrl)) return config.tagUrl;
            const params = {
                AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
                AV_CHANNELID: "5a0458dc28a06145e4519d21",
                AV_URL: window.location.hostname,
                cb: Date.now(),
                AV_WIDTH: 640,
                AV_HEIGHT: 480,
                AV_CDIM2: config.publisherId
            };
            const base = "https://go.aniview.com/api/adserver6/vast/";
            return `${base}?${buildUrlParams(params)}`;
        }
        setupIMA=() => {
            this.elements.container = createElement("div", {
                class: this.player.config.classNames.ads
            });
            this.player.elements.container.appendChild(this.elements.container);
            google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);
            google.ima.settings.setLocale(this.player.config.ads.language);
            google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline);
            this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media);
            this.loader = new google.ima.AdsLoader(this.elements.displayContainer);
            this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, (event => this.onAdsManagerLoaded(event)), false);
            this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (error => this.onAdError(error)), false);
            this.requestAds();
        };
        requestAds=() => {
            const {container} = this.player.elements;
            try {
                const request = new google.ima.AdsRequest;
                request.adTagUrl = this.tagUrl;
                request.linearAdSlotWidth = container.offsetWidth;
                request.linearAdSlotHeight = container.offsetHeight;
                request.nonLinearAdSlotWidth = container.offsetWidth;
                request.nonLinearAdSlotHeight = container.offsetHeight;
                request.forceNonLinearFullSlot = false;
                request.setAdWillPlayMuted(!this.player.muted);
                this.loader.requestAds(request);
            } catch (error) {
                this.onAdError(error);
            }
        };
        pollCountdown=(start = false) => {
            if (!start) {
                clearInterval(this.countdownTimer);
                this.elements.container.removeAttribute("data-badge-text");
                return;
            }
            const update = () => {
                const time = formatTime(Math.max(this.manager.getRemainingTime(), 0));
                const label = `${utils_i18n.get("advertisement", this.player.config)} - ${time}`;
                this.elements.container.setAttribute("data-badge-text", label);
            };
            this.countdownTimer = setInterval(update, 100);
        };
        onAdsManagerLoaded=event => {
            if (!this.enabled) return;
            const settings = new google.ima.AdsRenderingSettings;
            settings.restoreCustomPlaybackStateOnAdBreakComplete = true;
            settings.enablePreloading = true;
            this.manager = event.getAdsManager(this.player, settings);
            this.cuePoints = this.manager.getCuePoints();
            this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (error => this.onAdError(error)));
            Object.keys(google.ima.AdEvent.Type).forEach((type => {
                this.manager.addEventListener(google.ima.AdEvent.Type[type], (e => this.onAdEvent(e)));
            }));
            this.trigger("loaded");
        };
        addCuePoints=() => {
            if (!utils_is.empty(this.cuePoints)) this.cuePoints.forEach((cuePoint => {
                if (0 !== cuePoint && -1 !== cuePoint && cuePoint < this.player.duration) {
                    const seekElement = this.player.elements.progress;
                    if (utils_is.element(seekElement)) {
                        const cuePercentage = 100 / this.player.duration * cuePoint;
                        const cue = createElement("span", {
                            class: this.player.config.classNames.cues
                        });
                        cue.style.left = `${cuePercentage.toString()}%`;
                        seekElement.appendChild(cue);
                    }
                }
            }));
        };
        onAdEvent=event => {
            const {container} = this.player.elements;
            const ad = event.getAd();
            const adData = event.getAdData();
            const dispatchEvent = type => {
                triggerEvent.call(this.player, this.player.media, `ads${type.replace(/_/g, "").toLowerCase()}`);
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
                if (adData.adError) this.player.debug.warn(`Non-fatal ad error: ${adData.adError.getMessage()}`);
                break;

              default:
                break;
            }
        };
        onAdError=event => {
            this.cancel();
            this.player.debug.warn("Ads error", event);
        };
        listeners=() => {
            const {container} = this.player.elements;
            let time;
            this.player.on("canplay", (() => {
                this.addCuePoints();
            }));
            this.player.on("ended", (() => {
                this.loader.contentComplete();
            }));
            this.player.on("timeupdate", (() => {
                time = this.player.currentTime;
            }));
            this.player.on("seeked", (() => {
                const seekedTime = this.player.currentTime;
                if (utils_is.empty(this.cuePoints)) return;
                this.cuePoints.forEach(((cuePoint, index) => {
                    if (time < cuePoint && cuePoint < seekedTime) {
                        this.manager.discardAdBreak();
                        this.cuePoints.splice(index, 1);
                    }
                }));
            }));
            window.addEventListener("resize", (() => {
                if (this.manager) this.manager.resize(container.offsetWidth, container.offsetHeight, google.ima.ViewMode.NORMAL);
            }));
        };
        play=() => {
            const {container} = this.player.elements;
            if (!this.managerPromise) this.resumeContent();
            this.managerPromise.then((() => {
                this.manager.setVolume(this.player.volume);
                this.elements.displayContainer.initialize();
                try {
                    if (!this.initialized) {
                        this.manager.init(container.offsetWidth, container.offsetHeight, google.ima.ViewMode.NORMAL);
                        this.manager.start();
                    }
                    this.initialized = true;
                } catch (adError) {
                    this.onAdError(adError);
                }
            })).catch((() => {}));
        };
        resumeContent=() => {
            this.elements.container.style.zIndex = "";
            this.playing = false;
            silencePromise(this.player.media.play());
        };
        pauseContent=() => {
            this.elements.container.style.zIndex = 3;
            this.playing = true;
            this.player.media.pause();
        };
        cancel=() => {
            if (this.initialized) this.resumeContent();
            this.trigger("error");
            this.loadAds();
        };
        loadAds=() => {
            this.managerPromise.then((() => {
                if (this.manager) this.manager.destroy();
                this.managerPromise = new Promise((resolve => {
                    this.on("loaded", resolve);
                    this.player.debug.log(this.manager);
                }));
                this.initialized = false;
                this.requestAds();
            })).catch((() => {}));
        };
        trigger=(event, ...args) => {
            const handlers = this.events[event];
            if (utils_is.array(handlers)) handlers.forEach((handler => {
                if (utils_is["function"](handler)) handler.apply(this, args);
            }));
        };
        on=(event, callback) => {
            if (!utils_is.array(this.events[event])) this.events[event] = [];
            this.events[event].push(callback);
            return this;
        };
        startSafetyTimer=(time, from) => {
            this.player.debug.log(`Safety timer invoked from: ${from}`);
            this.safetyTimer = setTimeout((() => {
                this.cancel();
                this.clearSafetyTimer("startSafetyTimer()");
            }), time);
        };
        clearSafetyTimer=from => {
            if (!utils_is.nullOrUndefined(this.safetyTimer)) {
                this.player.debug.log(`Safety timer cleared from: ${from}`);
                clearTimeout(this.safetyTimer);
                this.safetyTimer = null;
            }
        };
    }
    const ads = Ads;
    function clamp(input = 0, min = 0, max = 255) {
        return Math.min(Math.max(input, min), max);
    }
    const parseVtt = vttDataString => {
        const processedList = [];
        const frames = vttDataString.split(/\r\n\r\n|\n\n|\r\r/);
        frames.forEach((frame => {
            const result = {};
            const lines = frame.split(/\r\n|\n|\r/);
            lines.forEach((line => {
                if (!utils_is.number(result.startTime)) {
                    const matchTimes = line.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);
                    if (matchTimes) {
                        result.startTime = 60 * Number(matchTimes[1] || 0) * 60 + 60 * Number(matchTimes[2]) + Number(matchTimes[3]) + Number(`0.${matchTimes[4]}`);
                        result.endTime = 60 * Number(matchTimes[6] || 0) * 60 + 60 * Number(matchTimes[7]) + Number(matchTimes[8]) + Number(`0.${matchTimes[9]}`);
                    }
                } else if (!utils_is.empty(line.trim()) && utils_is.empty(result.text)) {
                    const lineSplit = line.trim().split("#xywh=");
                    [result.text] = lineSplit;
                    if (lineSplit[1]) [result.x, result.y, result.w, result.h] = lineSplit[1].split(",");
                }
            }));
            if (result.text) processedList.push(result);
        }));
        return processedList;
    };
    const fitRatio = (ratio, outer) => {
        const targetRatio = outer.width / outer.height;
        const result = {};
        if (ratio > targetRatio) {
            result.width = outer.width;
            result.height = 1 / ratio * outer.width;
        } else {
            result.height = outer.height;
            result.width = ratio * outer.height;
        }
        return result;
    };
    class PreviewThumbnails {
        constructor(player) {
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
        get enabled() {
            return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled;
        }
        load=() => {
            if (this.player.elements.display.seekTooltip) this.player.elements.display.seekTooltip.hidden = this.enabled;
            if (!this.enabled) return;
            this.getThumbnails().then((() => {
                if (!this.enabled) return;
                this.render();
                this.determineContainerAutoSizing();
                this.loaded = true;
            }));
        };
        getThumbnails=() => new Promise((resolve => {
            const {src} = this.player.config.previewThumbnails;
            if (utils_is.empty(src)) throw new Error("Missing previewThumbnails.src config attribute");
            const sortAndResolve = () => {
                this.thumbnails.sort(((x, y) => x.height - y.height));
                this.player.debug.log("Preview thumbnails", this.thumbnails);
                resolve();
            };
            if (utils_is["function"](src)) src((thumbnails => {
                this.thumbnails = thumbnails;
                sortAndResolve();
            })); else {
                const urls = utils_is.string(src) ? [ src ] : src;
                const promises = urls.map((u => this.getThumbnail(u)));
                Promise.all(promises).then(sortAndResolve);
            }
        }));
        getThumbnail=url => new Promise((resolve => {
            fetch_fetch(url).then((response => {
                const thumbnail = {
                    frames: parseVtt(response),
                    height: null,
                    urlPrefix: ""
                };
                if (!thumbnail.frames[0].text.startsWith("/") && !thumbnail.frames[0].text.startsWith("http://") && !thumbnail.frames[0].text.startsWith("https://")) thumbnail.urlPrefix = url.substring(0, url.lastIndexOf("/") + 1);
                const tempImage = new Image;
                tempImage.onload = () => {
                    thumbnail.height = tempImage.naturalHeight;
                    thumbnail.width = tempImage.naturalWidth;
                    this.thumbnails.push(thumbnail);
                    resolve();
                };
                tempImage.src = thumbnail.urlPrefix + thumbnail.frames[0].text;
            }));
        }));
        startMove=event => {
            if (!this.loaded) return;
            if (!utils_is.event(event) || ![ "touchmove", "mousemove" ].includes(event.type)) return;
            if (!this.player.media.duration) return;
            if ("touchmove" === event.type) this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100); else {
                const clientRect = this.player.elements.progress.getBoundingClientRect();
                const percentage = 100 / clientRect.width * (event.pageX - clientRect.left);
                this.seekTime = this.player.media.duration * (percentage / 100);
                if (this.seekTime < 0) this.seekTime = 0;
                if (this.seekTime > this.player.media.duration - 1) this.seekTime = this.player.media.duration - 1;
                this.mousePosX = event.pageX;
                this.elements.thumb.time.innerText = formatTime(this.seekTime);
                const point = this.player.config.markers?.points?.find((({time: t}) => t === Math.round(this.seekTime)));
                if (point) this.elements.thumb.time.insertAdjacentHTML("afterbegin", `${point.label}<br>`);
            }
            this.showImageAtCurrentTime();
        };
        endMove=() => {
            this.toggleThumbContainer(false, true);
        };
        startScrubbing=event => {
            if (utils_is.nullOrUndefined(event.button) || false === event.button || 0 === event.button) {
                this.mouseDown = true;
                if (this.player.media.duration) {
                    this.toggleScrubbingContainer(true);
                    this.toggleThumbContainer(false, true);
                    this.showImageAtCurrentTime();
                }
            }
        };
        endScrubbing=() => {
            this.mouseDown = false;
            if (Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime)) this.toggleScrubbingContainer(false); else events_once.call(this.player, this.player.media, "timeupdate", (() => {
                if (!this.mouseDown) this.toggleScrubbingContainer(false);
            }));
        };
        listeners=() => {
            this.player.on("play", (() => {
                this.toggleThumbContainer(false, true);
            }));
            this.player.on("seeked", (() => {
                this.toggleThumbContainer(false);
            }));
            this.player.on("timeupdate", (() => {
                this.lastTime = this.player.media.currentTime;
            }));
        };
        render=() => {
            this.elements.thumb.container = createElement("div", {
                class: this.player.config.classNames.previewThumbnails.thumbContainer
            });
            this.elements.thumb.imageContainer = createElement("div", {
                class: this.player.config.classNames.previewThumbnails.imageContainer
            });
            this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
            const timeContainer = createElement("div", {
                class: this.player.config.classNames.previewThumbnails.timeContainer
            });
            this.elements.thumb.time = createElement("span", {}, "00:00");
            timeContainer.appendChild(this.elements.thumb.time);
            this.elements.thumb.imageContainer.appendChild(timeContainer);
            if (utils_is.element(this.player.elements.progress)) this.player.elements.progress.appendChild(this.elements.thumb.container);
            this.elements.scrubbing.container = createElement("div", {
                class: this.player.config.classNames.previewThumbnails.scrubbingContainer
            });
            this.player.elements.wrapper.appendChild(this.elements.scrubbing.container);
        };
        destroy=() => {
            if (this.elements.thumb.container) this.elements.thumb.container.remove();
            if (this.elements.scrubbing.container) this.elements.scrubbing.container.remove();
        };
        showImageAtCurrentTime=() => {
            if (this.mouseDown) this.setScrubbingContainerSize(); else this.setThumbContainerSizeAndPos();
            const thumbNum = this.thumbnails[0].frames.findIndex((frame => this.seekTime >= frame.startTime && this.seekTime <= frame.endTime));
            const hasThumb = thumbNum >= 0;
            let qualityIndex = 0;
            if (!this.mouseDown) this.toggleThumbContainer(hasThumb);
            if (!hasThumb) return;
            this.thumbnails.forEach(((thumbnail, index) => {
                if (this.loadedImages.includes(thumbnail.frames[thumbNum].text)) qualityIndex = index;
            }));
            if (thumbNum !== this.showingThumb) {
                this.showingThumb = thumbNum;
                this.loadImage(qualityIndex);
            }
        };
        loadImage=(qualityIndex = 0) => {
            const thumbNum = this.showingThumb;
            const thumbnail = this.thumbnails[qualityIndex];
            const {urlPrefix} = thumbnail;
            const frame = thumbnail.frames[thumbNum];
            const thumbFilename = thumbnail.frames[thumbNum].text;
            const thumbUrl = urlPrefix + thumbFilename;
            if (!this.currentImageElement || this.currentImageElement.dataset.filename !== thumbFilename) {
                if (this.loadingImage && this.usingSprites) this.loadingImage.onload = null;
                const previewImage = new Image;
                previewImage.src = thumbUrl;
                previewImage.dataset.index = thumbNum;
                previewImage.dataset.filename = thumbFilename;
                this.showingThumbFilename = thumbFilename;
                this.player.debug.log(`Loading image: ${thumbUrl}`);
                previewImage.onload = () => this.showImage(previewImage, frame, qualityIndex, thumbNum, thumbFilename, true);
                this.loadingImage = previewImage;
                this.removeOldImages(previewImage);
            } else {
                this.showImage(this.currentImageElement, frame, qualityIndex, thumbNum, thumbFilename, false);
                this.currentImageElement.dataset.index = thumbNum;
                this.removeOldImages(this.currentImageElement);
            }
        };
        showImage=(previewImage, frame, qualityIndex, thumbNum, thumbFilename, newImage = true) => {
            this.player.debug.log(`Showing thumb: ${thumbFilename}. num: ${thumbNum}. qual: ${qualityIndex}. newimg: ${newImage}`);
            this.setImageSizeAndOffset(previewImage, frame);
            if (newImage) {
                this.currentImageContainer.appendChild(previewImage);
                this.currentImageElement = previewImage;
                if (!this.loadedImages.includes(thumbFilename)) this.loadedImages.push(thumbFilename);
            }
            this.preloadNearby(thumbNum, true).then(this.preloadNearby(thumbNum, false)).then(this.getHigherQuality(qualityIndex, previewImage, frame, thumbFilename));
        };
        removeOldImages=currentImage => {
            Array.from(this.currentImageContainer.children).forEach((image => {
                if ("img" !== image.tagName.toLowerCase()) return;
                const removeDelay = this.usingSprites ? 500 : 1e3;
                if (image.dataset.index !== currentImage.dataset.index && !image.dataset.deleting) {
                    image.dataset.deleting = true;
                    const {currentImageContainer} = this;
                    setTimeout((() => {
                        currentImageContainer.removeChild(image);
                        this.player.debug.log(`Removing thumb: ${image.dataset.filename}`);
                    }), removeDelay);
                }
            }));
        };
        preloadNearby=(thumbNum, forward = true) => new Promise((resolve => {
            setTimeout((() => {
                const oldThumbFilename = this.thumbnails[0].frames[thumbNum].text;
                if (this.showingThumbFilename === oldThumbFilename) {
                    let thumbnailsClone;
                    if (forward) thumbnailsClone = this.thumbnails[0].frames.slice(thumbNum); else thumbnailsClone = this.thumbnails[0].frames.slice(0, thumbNum).reverse();
                    let foundOne = false;
                    thumbnailsClone.forEach((frame => {
                        const newThumbFilename = frame.text;
                        if (newThumbFilename !== oldThumbFilename) if (!this.loadedImages.includes(newThumbFilename)) {
                            foundOne = true;
                            this.player.debug.log(`Preloading thumb filename: ${newThumbFilename}`);
                            const {urlPrefix} = this.thumbnails[0];
                            const thumbURL = urlPrefix + newThumbFilename;
                            const previewImage = new Image;
                            previewImage.src = thumbURL;
                            previewImage.onload = () => {
                                this.player.debug.log(`Preloaded thumb filename: ${newThumbFilename}`);
                                if (!this.loadedImages.includes(newThumbFilename)) this.loadedImages.push(newThumbFilename);
                                resolve();
                            };
                        }
                    }));
                    if (!foundOne) resolve();
                }
            }), 300);
        }));
        getHigherQuality=(currentQualityIndex, previewImage, frame, thumbFilename) => {
            if (currentQualityIndex < this.thumbnails.length - 1) {
                let previewImageHeight = previewImage.naturalHeight;
                if (this.usingSprites) previewImageHeight = frame.h;
                if (previewImageHeight < this.thumbContainerHeight) setTimeout((() => {
                    if (this.showingThumbFilename === thumbFilename) {
                        this.player.debug.log(`Showing higher quality thumb for: ${thumbFilename}`);
                        this.loadImage(currentQualityIndex + 1);
                    }
                }), 300);
            }
        };
        get currentImageContainer() {
            return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer;
        }
        get usingSprites() {
            return Object.keys(this.thumbnails[0].frames[0]).includes("w");
        }
        get thumbAspectRatio() {
            if (this.usingSprites) return this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h;
            return this.thumbnails[0].width / this.thumbnails[0].height;
        }
        get thumbContainerHeight() {
            if (this.mouseDown) {
                const {height} = fitRatio(this.thumbAspectRatio, {
                    width: this.player.media.clientWidth,
                    height: this.player.media.clientHeight
                });
                return height;
            }
            if (this.sizeSpecifiedInCSS) return this.elements.thumb.imageContainer.clientHeight;
            return Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4);
        }
        get currentImageElement() {
            return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement;
        }
        set currentImageElement(element) {
            if (this.mouseDown) this.currentScrubbingImageElement = element; else this.currentThumbnailImageElement = element;
        }
        toggleThumbContainer=(toggle = false, clearShowing = false) => {
            const className = this.player.config.classNames.previewThumbnails.thumbContainerShown;
            this.elements.thumb.container.classList.toggle(className, toggle);
            if (!toggle && clearShowing) {
                this.showingThumb = null;
                this.showingThumbFilename = null;
            }
        };
        toggleScrubbingContainer=(toggle = false) => {
            const className = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
            this.elements.scrubbing.container.classList.toggle(className, toggle);
            if (!toggle) {
                this.showingThumb = null;
                this.showingThumbFilename = null;
            }
        };
        determineContainerAutoSizing=() => {
            if (this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20) this.sizeSpecifiedInCSS = true;
        };
        setThumbContainerSizeAndPos=() => {
            const {imageContainer} = this.elements.thumb;
            if (!this.sizeSpecifiedInCSS) {
                const thumbWidth = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);
                imageContainer.style.height = `${this.thumbContainerHeight}px`;
                imageContainer.style.width = `${thumbWidth}px`;
            } else if (imageContainer.clientHeight > 20 && imageContainer.clientWidth < 20) {
                const thumbWidth = Math.floor(imageContainer.clientHeight * this.thumbAspectRatio);
                imageContainer.style.width = `${thumbWidth}px`;
            } else if (imageContainer.clientHeight < 20 && imageContainer.clientWidth > 20) {
                const thumbHeight = Math.floor(imageContainer.clientWidth / this.thumbAspectRatio);
                imageContainer.style.height = `${thumbHeight}px`;
            }
            this.setThumbContainerPos();
        };
        setThumbContainerPos=() => {
            const scrubberRect = this.player.elements.progress.getBoundingClientRect();
            const containerRect = this.player.elements.container.getBoundingClientRect();
            const {container} = this.elements.thumb;
            const min = containerRect.left - scrubberRect.left + 10;
            const max = containerRect.right - scrubberRect.left - container.clientWidth - 10;
            const position = this.mousePosX - scrubberRect.left - container.clientWidth / 2;
            const clamped = clamp(position, min, max);
            container.style.left = `${clamped}px`;
            container.style.setProperty("--preview-arrow-offset", `${position - clamped}px`);
        };
        setScrubbingContainerSize=() => {
            const {width, height} = fitRatio(this.thumbAspectRatio, {
                width: this.player.media.clientWidth,
                height: this.player.media.clientHeight
            });
            this.elements.scrubbing.container.style.width = `${width}px`;
            this.elements.scrubbing.container.style.height = `${height}px`;
        };
        setImageSizeAndOffset=(previewImage, frame) => {
            if (!this.usingSprites) return;
            const multiplier = this.thumbContainerHeight / frame.h;
            previewImage.style.height = `${previewImage.naturalHeight * multiplier}px`;
            previewImage.style.width = `${previewImage.naturalWidth * multiplier}px`;
            previewImage.style.left = `-${frame.x * multiplier}px`;
            previewImage.style.top = `-${frame.y * multiplier}px`;
        };
    }
    const preview_thumbnails = PreviewThumbnails;
    const source = {
        insertElements(type, attributes) {
            if (utils_is.string(attributes)) insertElement(type, this.media, {
                src: attributes
            }); else if (utils_is.array(attributes)) attributes.forEach((attribute => {
                insertElement(type, this.media, attribute);
            }));
        },
        change(input) {
            if (!getDeep(input, "sources.length")) {
                this.debug.warn("Invalid source format");
                return;
            }
            plyr_html5.cancelRequests.call(this);
            this.destroy.call(this, (() => {
                this.options.quality = [];
                removeElement(this.media);
                this.media = null;
                if (utils_is.element(this.elements.container)) this.elements.container.removeAttribute("class");
                const {sources, type} = input;
                const [{provider = providers.html5, src}] = sources;
                const tagName = "html5" === provider ? type : "div";
                const attributes = "html5" === provider ? {} : {
                    src
                };
                Object.assign(this, {
                    provider,
                    type,
                    supported: plyr_support.check(type, provider, this.config.playsinline),
                    media: createElement(tagName, attributes)
                });
                this.elements.container.appendChild(this.media);
                if (utils_is.boolean(input.autoplay)) this.config.autoplay = input.autoplay;
                if (this.isHTML5) {
                    if (this.config.crossorigin) this.media.setAttribute("crossorigin", "");
                    if (this.config.autoplay) this.media.setAttribute("autoplay", "");
                    if (!utils_is.empty(input.poster)) this.poster = input.poster;
                    if (this.config.loop.active) this.media.setAttribute("loop", "");
                    if (this.config.muted) this.media.setAttribute("muted", "");
                    if (this.config.playsinline) this.media.setAttribute("playsinline", "");
                }
                plyr_ui.addStyleHook.call(this);
                if (this.isHTML5) source.insertElements.call(this, "source", sources);
                this.config.title = input.title;
                plyr_media.setup.call(this);
                if (this.isHTML5) if (Object.keys(input).includes("tracks")) source.insertElements.call(this, "track", input.tracks);
                if (this.isHTML5 || this.isEmbed && !this.supported.ui) plyr_ui.build.call(this);
                if (this.isHTML5) this.media.load();
                if (!utils_is.empty(input.previewThumbnails)) {
                    Object.assign(this.config.previewThumbnails, input.previewThumbnails);
                    if (this.previewThumbnails && this.previewThumbnails.loaded) {
                        this.previewThumbnails.destroy();
                        this.previewThumbnails = null;
                    }
                    if (this.config.previewThumbnails.enabled) this.previewThumbnails = new preview_thumbnails(this);
                }
                this.fullscreen.update();
            }), true);
        }
    };
    const plyr_source = source;
    class Plyr {
        constructor(target, options) {
            this.timers = {};
            this.ready = false;
            this.loading = false;
            this.failed = false;
            this.touch = plyr_support.touch;
            this.media = target;
            if (utils_is.string(this.media)) this.media = document.querySelectorAll(this.media);
            if (window.jQuery && this.media instanceof jQuery || utils_is.nodeList(this.media) || utils_is.array(this.media)) this.media = this.media[0];
            this.config = objects_extend({}, config_defaults, Plyr.defaults, options || {}, (() => {
                try {
                    return JSON.parse(this.media.getAttribute("data-plyr-config"));
                } catch (_) {
                    return {};
                }
            })());
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
            this.debug.log("Support", plyr_support);
            if (utils_is.nullOrUndefined(this.media) || !utils_is.element(this.media)) {
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
            if (!plyr_support.check().api) {
                this.debug.error("Setup failed: no support");
                return;
            }
            const clone = this.media.cloneNode(true);
            clone.autoplay = false;
            this.elements.original = clone;
            const type = this.media.tagName.toLowerCase();
            let iframe = null;
            let url = null;
            switch (type) {
              case "div":
                iframe = this.media.querySelector("iframe");
                if (utils_is.element(iframe)) {
                    url = parseUrl(iframe.getAttribute("src"));
                    this.provider = getProviderByUrl(url.toString());
                    this.elements.container = this.media;
                    this.media = iframe;
                    this.elements.container.className = "";
                    if (url.search.length) {
                        const truthy = [ "1", "true" ];
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
                if (utils_is.empty(this.provider) || !Object.values(providers).includes(this.provider)) {
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
            this.supported = plyr_support.check(this.type, this.provider, this.config.playsinline);
            if (!this.supported.api) {
                this.debug.error("Setup failed: no support");
                return;
            }
            this.eventListeners = [];
            this.listeners = new listeners(this);
            this.storage = new storage(this);
            this.media.plyr = this;
            if (!utils_is.element(this.elements.container)) {
                this.elements.container = createElement("div", {
                    tabindex: 0
                });
                wrap(this.media, this.elements.container);
            }
            plyr_ui.migrateStyles.call(this);
            plyr_ui.addStyleHook.call(this);
            plyr_media.setup.call(this);
            if (this.config.debug) events_on.call(this, this.elements.container, this.config.events.join(" "), (event => {
                this.debug.log(`event: ${event.type}`);
            }));
            this.fullscreen = new fullscreen(this);
            if (this.isHTML5 || this.isEmbed && !this.supported.ui) plyr_ui.build.call(this);
            this.listeners.container();
            this.listeners.global();
            if (this.config.ads.enabled) this.ads = new ads(this);
            if (this.isHTML5 && this.config.autoplay) this.once("canplay", (() => silencePromise(this.play())));
            this.lastSeekTime = 0;
            if (this.config.previewThumbnails.enabled) this.previewThumbnails = new preview_thumbnails(this);
        }
        get isHTML5() {
            return this.provider === providers.html5;
        }
        get isEmbed() {
            return this.isYouTube || this.isVimeo;
        }
        get isYouTube() {
            return this.provider === providers.youtube;
        }
        get isVimeo() {
            return this.provider === providers.vimeo;
        }
        get isVideo() {
            return this.type === types.video;
        }
        get isAudio() {
            return this.type === types.audio;
        }
        play=() => {
            if (!utils_is["function"](this.media.play)) return null;
            if (this.ads && this.ads.enabled) this.ads.managerPromise.then((() => this.ads.play())).catch((() => silencePromise(this.media.play())));
            return this.media.play();
        };
        pause=() => {
            if (!this.playing || !utils_is["function"](this.media.pause)) return null;
            return this.media.pause();
        };
        get playing() {
            return Boolean(this.ready && !this.paused && !this.ended);
        }
        get paused() {
            return Boolean(this.media.paused);
        }
        get stopped() {
            return Boolean(this.paused && 0 === this.currentTime);
        }
        get ended() {
            return Boolean(this.media.ended);
        }
        togglePlay=input => {
            const toggle = utils_is.boolean(input) ? input : !this.playing;
            if (toggle) return this.play();
            return this.pause();
        };
        stop=() => {
            if (this.isHTML5) {
                this.pause();
                this.restart();
            } else if (utils_is["function"](this.media.stop)) this.media.stop();
        };
        restart=() => {
            this.currentTime = 0;
        };
        rewind=seekTime => {
            this.currentTime -= utils_is.number(seekTime) ? seekTime : this.config.seekTime;
        };
        forward=seekTime => {
            this.currentTime += utils_is.number(seekTime) ? seekTime : this.config.seekTime;
        };
        set currentTime(input) {
            if (!this.duration) return;
            const inputIsValid = utils_is.number(input) && input > 0;
            this.media.currentTime = inputIsValid ? Math.min(input, this.duration) : 0;
            this.debug.log(`Seeking to ${this.currentTime} seconds`);
        }
        get currentTime() {
            return Number(this.media.currentTime);
        }
        get buffered() {
            const {buffered} = this.media;
            if (utils_is.number(buffered)) return buffered;
            if (buffered && buffered.length && this.duration > 0) return buffered.end(0) / this.duration;
            return 0;
        }
        get seeking() {
            return Boolean(this.media.seeking);
        }
        get duration() {
            const fauxDuration = parseFloat(this.config.duration);
            const realDuration = (this.media || {}).duration;
            const duration = !utils_is.number(realDuration) || realDuration === 1 / 0 ? 0 : realDuration;
            return fauxDuration || duration;
        }
        set volume(value) {
            let volume = value;
            const max = 1;
            const min = 0;
            if (utils_is.string(volume)) volume = Number(volume);
            if (!utils_is.number(volume)) volume = this.storage.get("volume");
            if (!utils_is.number(volume)) ({volume} = this.config);
            if (volume > max) volume = max;
            if (volume < min) volume = min;
            this.config.volume = volume;
            this.media.volume = volume;
            if (!utils_is.empty(value) && this.muted && volume > 0) this.muted = false;
        }
        get volume() {
            return Number(this.media.volume);
        }
        increaseVolume=step => {
            const volume = this.media.muted ? 0 : this.volume;
            this.volume = volume + (utils_is.number(step) ? step : 0);
        };
        decreaseVolume=step => {
            this.increaseVolume(-step);
        };
        set muted(mute) {
            let toggle = mute;
            if (!utils_is.boolean(toggle)) toggle = this.storage.get("muted");
            if (!utils_is.boolean(toggle)) toggle = this.config.muted;
            this.config.muted = toggle;
            this.media.muted = toggle;
        }
        get muted() {
            return Boolean(this.media.muted);
        }
        get hasAudio() {
            if (!this.isHTML5) return true;
            if (this.isAudio) return true;
            return Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length);
        }
        set speed(input) {
            let speed = null;
            if (utils_is.number(input)) speed = input;
            if (!utils_is.number(speed)) speed = this.storage.get("speed");
            if (!utils_is.number(speed)) speed = this.config.speed.selected;
            const {minimumSpeed: min, maximumSpeed: max} = this;
            speed = clamp(speed, min, max);
            this.config.speed.selected = speed;
            setTimeout((() => {
                if (this.media) this.media.playbackRate = speed;
            }), 0);
        }
        get speed() {
            return Number(this.media.playbackRate);
        }
        get minimumSpeed() {
            if (this.isYouTube) return Math.min(...this.options.speed);
            if (this.isVimeo) return .5;
            return .0625;
        }
        get maximumSpeed() {
            if (this.isYouTube) return Math.max(...this.options.speed);
            if (this.isVimeo) return 2;
            return 16;
        }
        set quality(input) {
            const config = this.config.quality;
            const options = this.options.quality;
            if (!options.length) return;
            let quality = [ !utils_is.empty(input) && Number(input), this.storage.get("quality"), config.selected, config.default ].find(utils_is.number);
            let updateStorage = true;
            if (!options.includes(quality)) {
                const value = arrays_closest(options, quality);
                this.debug.warn(`Unsupported quality option: ${quality}, using ${value} instead`);
                quality = value;
                updateStorage = false;
            }
            config.selected = quality;
            this.media.quality = quality;
            if (updateStorage) this.storage.set({
                quality
            });
        }
        get quality() {
            return this.media.quality;
        }
        set loop(input) {
            const toggle = utils_is.boolean(input) ? input : this.config.loop.active;
            this.config.loop.active = toggle;
            this.media.loop = toggle;
        }
        get loop() {
            return Boolean(this.media.loop);
        }
        set source(input) {
            plyr_source.change.call(this, input);
        }
        get source() {
            return this.media.currentSrc;
        }
        get download() {
            const {download} = this.config.urls;
            return utils_is.url(download) ? download : this.source;
        }
        set download(input) {
            if (!utils_is.url(input)) return;
            this.config.urls.download = input;
            plyr_controls.setDownloadUrl.call(this);
        }
        set poster(input) {
            if (!this.isVideo) {
                this.debug.warn("Poster can only be set for video");
                return;
            }
            plyr_ui.setPoster.call(this, input, false).catch((() => {}));
        }
        get poster() {
            if (!this.isVideo) return null;
            return this.media.getAttribute("poster") || this.media.getAttribute("data-poster");
        }
        get ratio() {
            if (!this.isVideo) return null;
            const ratio = reduceAspectRatio(getAspectRatio.call(this));
            return utils_is.array(ratio) ? ratio.join(":") : ratio;
        }
        set ratio(input) {
            if (!this.isVideo) {
                this.debug.warn("Aspect ratio can only be set for video");
                return;
            }
            if (!utils_is.string(input) || !validateAspectRatio(input)) {
                this.debug.error(`Invalid aspect ratio specified (${input})`);
                return;
            }
            this.config.ratio = reduceAspectRatio(input);
            setAspectRatio.call(this);
        }
        set autoplay(input) {
            this.config.autoplay = utils_is.boolean(input) ? input : this.config.autoplay;
        }
        get autoplay() {
            return Boolean(this.config.autoplay);
        }
        toggleCaptions(input) {
            plyr_captions.toggle.call(this, input, false);
        }
        set currentTrack(input) {
            plyr_captions.set.call(this, input, false);
            plyr_captions.setup.call(this);
        }
        get currentTrack() {
            const {toggled, currentTrack} = this.captions;
            return toggled ? currentTrack : -1;
        }
        set language(input) {
            plyr_captions.setLanguage.call(this, input, false);
        }
        get language() {
            return (plyr_captions.getCurrentTrack.call(this) || {}).language;
        }
        set pip(input) {
            if (!plyr_support.pip) return;
            const toggle = utils_is.boolean(input) ? input : !this.pip;
            if (utils_is["function"](this.media.webkitSetPresentationMode)) this.media.webkitSetPresentationMode(toggle ? pip.active : pip.inactive);
            if (utils_is["function"](this.media.requestPictureInPicture)) if (!this.pip && toggle) this.media.requestPictureInPicture(); else if (this.pip && !toggle) document.exitPictureInPicture();
        }
        get pip() {
            if (!plyr_support.pip) return null;
            if (!utils_is.empty(this.media.webkitPresentationMode)) return this.media.webkitPresentationMode === pip.active;
            return this.media === document.pictureInPictureElement;
        }
        setPreviewThumbnails(thumbnailSource) {
            if (this.previewThumbnails && this.previewThumbnails.loaded) {
                this.previewThumbnails.destroy();
                this.previewThumbnails = null;
            }
            Object.assign(this.config.previewThumbnails, thumbnailSource);
            if (this.config.previewThumbnails.enabled) this.previewThumbnails = new preview_thumbnails(this);
        }
        airplay=() => {
            if (plyr_support.airplay) this.media.webkitShowPlaybackTargetPicker();
        };
        toggleControls=toggle => {
            if (this.supported.ui && !this.isAudio) {
                const isHidden = elements_hasClass(this.elements.container, this.config.classNames.hideControls);
                const force = "undefined" === typeof toggle ? void 0 : !toggle;
                const hiding = elements_toggleClass(this.elements.container, this.config.classNames.hideControls, force);
                if (hiding && utils_is.array(this.config.controls) && this.config.controls.includes("settings") && !utils_is.empty(this.config.settings)) plyr_controls.toggleMenu.call(this, false);
                if (hiding !== isHidden) {
                    const eventName = hiding ? "controlshidden" : "controlsshown";
                    triggerEvent.call(this, this.media, eventName);
                }
                return !hiding;
            }
            return false;
        };
        on=(event, callback) => {
            events_on.call(this, this.elements.container, event, callback);
        };
        once=(event, callback) => {
            events_once.call(this, this.elements.container, event, callback);
        };
        off=(event, callback) => {
            events_off(this.elements.container, event, callback);
        };
        destroy=(callback, soft = false) => {
            if (!this.ready) return;
            const done = () => {
                document.body.style.overflow = "";
                this.embed = null;
                if (soft) {
                    if (Object.keys(this.elements).length) {
                        removeElement(this.elements.buttons.play);
                        removeElement(this.elements.captions);
                        removeElement(this.elements.controls);
                        removeElement(this.elements.wrapper);
                        this.elements.buttons.play = null;
                        this.elements.captions = null;
                        this.elements.controls = null;
                        this.elements.wrapper = null;
                    }
                    if (utils_is["function"](callback)) callback();
                } else {
                    unbindListeners.call(this);
                    plyr_html5.cancelRequests.call(this);
                    replaceElement(this.elements.original, this.elements.container);
                    triggerEvent.call(this, this.elements.original, "destroyed", true);
                    if (utils_is["function"](callback)) callback.call(this.elements.original);
                    this.ready = false;
                    setTimeout((() => {
                        this.elements = null;
                        this.media = null;
                    }), 200);
                }
            };
            this.stop();
            clearTimeout(this.timers.loading);
            clearTimeout(this.timers.controls);
            clearTimeout(this.timers.resized);
            if (this.isHTML5) {
                plyr_ui.toggleNativeControls.call(this, true);
                done();
            } else if (this.isYouTube) {
                clearInterval(this.timers.buffering);
                clearInterval(this.timers.playing);
                if (null !== this.embed && utils_is["function"](this.embed.destroy)) this.embed.destroy();
                done();
            } else if (this.isVimeo) {
                if (null !== this.embed) this.embed.unload().then(done);
                setTimeout(done, 200);
            }
        };
        supports=type => plyr_support.mime.call(this, type);
        static supported(type, provider, inline) {
            return plyr_support.check(type, provider, inline);
        }
        static loadSprite(url, id) {
            return loadSprite(url, id);
        }
        static setup(selector, options = {}) {
            let targets = null;
            if (utils_is.string(selector)) targets = Array.from(document.querySelectorAll(selector)); else if (utils_is.nodeList(selector)) targets = Array.from(selector); else if (utils_is.array(selector)) targets = selector.filter(utils_is.element);
            if (utils_is.empty(targets)) return null;
            return targets.map((t => new Plyr(t, options)));
        }
    }
    Plyr.defaults = cloneDeep(config_defaults);
    const plyr = Plyr;
    const script_controls = `<button type="button" class="plyr__control plyr__control--overlaid" data-plyr="play"\naria-label="Play"><svg aria-hidden="true" focusable="false">\n   <use xlink:href="../../img/icons/icons.svg#svg-plyr-play-new"></use>\n</svg><span class="plyr__sr-only">Play</span></button>`;
    const player = new plyr("#player", {
        iconUrl: "../../img/icons/icons.svg",
        iconPrefix: "svg-plyr",
        controls: script_controls
    });
    var script_image = document.getElementsByClassName("main__image");
    new simpleParallax(script_image, {
        scale: 1.3,
        orientation: "up",
        overflow: true
    });
    document.addEventListener("click", documentActions);
    function documentActions(e) {
        const el = e.target;
        if (el.closest(".item-advantages")) {
            const itemAdvantagies = el.closest(".item-advantages");
            if (isMobile.any()) itemAdvantagies.classList.toggle("_show");
        }
        if (el.classList.contains("item-functions__text") || el.closest(".item-functions__text")) {
            const textWrap = el.closest(".item-functions__wrap");
            if (textWrap.classList.contains("_hide")) textWrap.classList.toggle("_show");
        }
        if (el.closest("._success")) {
            const form = el.closest("._success");
            if (form.classList.contains("_success")) form.classList.remove("_success");
        }
        if (!el.closest(".plyr")) player.pause();
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
            const itemFunctionsText = itemFunctions.querySelector(".item-functions__text");
            const itemFunctionsP = itemFunctions.querySelector(".item-functions__text p");
            let textHeightP = itemFunctionsP.offsetHeight;
            if (textHeightP > 112) {
                let textHeight = 155 + textHeightP;
                itemFunctionsText.style.height = textHeight + "px";
            }
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
            itemFunctionsText.style.height = "190px";
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
    headerScroll();
})();