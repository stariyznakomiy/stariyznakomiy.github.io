(() => {
    var __webpack_modules__ = {
        211: function(__unused_webpack_module, exports) {
            (function(global, factory) {
                true ? factory(exports) : 0;
            })(0, (function(exports) {
                "use strict";
                exports.PipsMode = void 0;
                (function(PipsMode) {
                    PipsMode["Range"] = "range";
                    PipsMode["Steps"] = "steps";
                    PipsMode["Positions"] = "positions";
                    PipsMode["Count"] = "count";
                    PipsMode["Values"] = "values";
                })(exports.PipsMode || (exports.PipsMode = {}));
                exports.PipsType = void 0;
                (function(PipsType) {
                    PipsType[PipsType["None"] = -1] = "None";
                    PipsType[PipsType["NoValue"] = 0] = "NoValue";
                    PipsType[PipsType["LargeValue"] = 1] = "LargeValue";
                    PipsType[PipsType["SmallValue"] = 2] = "SmallValue";
                })(exports.PipsType || (exports.PipsType = {}));
                function isValidFormatter(entry) {
                    return isValidPartialFormatter(entry) && "function" === typeof entry.from;
                }
                function isValidPartialFormatter(entry) {
                    return "object" === typeof entry && "function" === typeof entry.to;
                }
                function removeElement(el) {
                    el.parentElement.removeChild(el);
                }
                function isSet(value) {
                    return null !== value && void 0 !== value;
                }
                function preventDefault(e) {
                    e.preventDefault();
                }
                function unique(array) {
                    return array.filter((function(a) {
                        return !this[a] ? this[a] = true : false;
                    }), {});
                }
                function closest(value, to) {
                    return Math.round(value / to) * to;
                }
                function offset(elem, orientation) {
                    var rect = elem.getBoundingClientRect();
                    var doc = elem.ownerDocument;
                    var docElem = doc.documentElement;
                    var pageOffset = getPageOffset(doc);
                    if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) pageOffset.x = 0;
                    return orientation ? rect.top + pageOffset.y - docElem.clientTop : rect.left + pageOffset.x - docElem.clientLeft;
                }
                function isNumeric(a) {
                    return "number" === typeof a && !isNaN(a) && isFinite(a);
                }
                function addClassFor(element, className, duration) {
                    if (duration > 0) {
                        addClass(element, className);
                        setTimeout((function() {
                            removeClass(element, className);
                        }), duration);
                    }
                }
                function limit(a) {
                    return Math.max(Math.min(a, 100), 0);
                }
                function asArray(a) {
                    return Array.isArray(a) ? a : [ a ];
                }
                function countDecimals(numStr) {
                    numStr = String(numStr);
                    var pieces = numStr.split(".");
                    return pieces.length > 1 ? pieces[1].length : 0;
                }
                function addClass(el, className) {
                    if (el.classList && !/\s/.test(className)) el.classList.add(className); else el.className += " " + className;
                }
                function removeClass(el, className) {
                    if (el.classList && !/\s/.test(className)) el.classList.remove(className); else el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
                }
                function hasClass(el, className) {
                    return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
                }
                function getPageOffset(doc) {
                    var supportPageOffset = void 0 !== window.pageXOffset;
                    var isCSS1Compat = "CSS1Compat" === (doc.compatMode || "");
                    var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
                    var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;
                    return {
                        x,
                        y
                    };
                }
                function getActions() {
                    return window.navigator.pointerEnabled ? {
                        start: "pointerdown",
                        move: "pointermove",
                        end: "pointerup"
                    } : window.navigator.msPointerEnabled ? {
                        start: "MSPointerDown",
                        move: "MSPointerMove",
                        end: "MSPointerUp"
                    } : {
                        start: "mousedown touchstart",
                        move: "mousemove touchmove",
                        end: "mouseup touchend"
                    };
                }
                function getSupportsPassive() {
                    var supportsPassive = false;
                    try {
                        var opts = Object.defineProperty({}, "passive", {
                            get: function() {
                                supportsPassive = true;
                            }
                        });
                        window.addEventListener("test", null, opts);
                    } catch (e) {}
                    return supportsPassive;
                }
                function getSupportsTouchActionNone() {
                    return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
                }
                function subRangeRatio(pa, pb) {
                    return 100 / (pb - pa);
                }
                function fromPercentage(range, value, startRange) {
                    return 100 * value / (range[startRange + 1] - range[startRange]);
                }
                function toPercentage(range, value) {
                    return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0], 0);
                }
                function isPercentage(range, value) {
                    return value * (range[1] - range[0]) / 100 + range[0];
                }
                function getJ(value, arr) {
                    var j = 1;
                    while (value >= arr[j]) j += 1;
                    return j;
                }
                function toStepping(xVal, xPct, value) {
                    if (value >= xVal.slice(-1)[0]) return 100;
                    var j = getJ(value, xVal);
                    var va = xVal[j - 1];
                    var vb = xVal[j];
                    var pa = xPct[j - 1];
                    var pb = xPct[j];
                    return pa + toPercentage([ va, vb ], value) / subRangeRatio(pa, pb);
                }
                function fromStepping(xVal, xPct, value) {
                    if (value >= 100) return xVal.slice(-1)[0];
                    var j = getJ(value, xPct);
                    var va = xVal[j - 1];
                    var vb = xVal[j];
                    var pa = xPct[j - 1];
                    var pb = xPct[j];
                    return isPercentage([ va, vb ], (value - pa) * subRangeRatio(pa, pb));
                }
                function getStep(xPct, xSteps, snap, value) {
                    if (100 === value) return value;
                    var j = getJ(value, xPct);
                    var a = xPct[j - 1];
                    var b = xPct[j];
                    if (snap) {
                        if (value - a > (b - a) / 2) return b;
                        return a;
                    }
                    if (!xSteps[j - 1]) return value;
                    return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
                }
                var Spectrum = function() {
                    function Spectrum(entry, snap, singleStep) {
                        this.xPct = [];
                        this.xVal = [];
                        this.xSteps = [];
                        this.xNumSteps = [];
                        this.xHighestCompleteStep = [];
                        this.xSteps = [ singleStep || false ];
                        this.xNumSteps = [ false ];
                        this.snap = snap;
                        var index;
                        var ordered = [];
                        Object.keys(entry).forEach((function(index) {
                            ordered.push([ asArray(entry[index]), index ]);
                        }));
                        ordered.sort((function(a, b) {
                            return a[0][0] - b[0][0];
                        }));
                        for (index = 0; index < ordered.length; index++) this.handleEntryPoint(ordered[index][1], ordered[index][0]);
                        this.xNumSteps = this.xSteps.slice(0);
                        for (index = 0; index < this.xNumSteps.length; index++) this.handleStepPoint(index, this.xNumSteps[index]);
                    }
                    Spectrum.prototype.getDistance = function(value) {
                        var distances = [];
                        for (var index = 0; index < this.xNumSteps.length - 1; index++) distances[index] = fromPercentage(this.xVal, value, index);
                        return distances;
                    };
                    Spectrum.prototype.getAbsoluteDistance = function(value, distances, direction) {
                        var xPct_index = 0;
                        if (value < this.xPct[this.xPct.length - 1]) while (value > this.xPct[xPct_index + 1]) xPct_index++; else if (value === this.xPct[this.xPct.length - 1]) xPct_index = this.xPct.length - 2;
                        if (!direction && value === this.xPct[xPct_index + 1]) xPct_index++;
                        if (null === distances) distances = [];
                        var start_factor;
                        var rest_factor = 1;
                        var rest_rel_distance = distances[xPct_index];
                        var range_pct = 0;
                        var rel_range_distance = 0;
                        var abs_distance_counter = 0;
                        var range_counter = 0;
                        if (direction) start_factor = (value - this.xPct[xPct_index]) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]); else start_factor = (this.xPct[xPct_index + 1] - value) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
                        while (rest_rel_distance > 0) {
                            range_pct = this.xPct[xPct_index + 1 + range_counter] - this.xPct[xPct_index + range_counter];
                            if (distances[xPct_index + range_counter] * rest_factor + 100 - 100 * start_factor > 100) {
                                rel_range_distance = range_pct * start_factor;
                                rest_factor = (rest_rel_distance - 100 * start_factor) / distances[xPct_index + range_counter];
                                start_factor = 1;
                            } else {
                                rel_range_distance = distances[xPct_index + range_counter] * range_pct / 100 * rest_factor;
                                rest_factor = 0;
                            }
                            if (direction) {
                                abs_distance_counter -= rel_range_distance;
                                if (this.xPct.length + range_counter >= 1) range_counter--;
                            } else {
                                abs_distance_counter += rel_range_distance;
                                if (this.xPct.length - range_counter >= 1) range_counter++;
                            }
                            rest_rel_distance = distances[xPct_index + range_counter] * rest_factor;
                        }
                        return value + abs_distance_counter;
                    };
                    Spectrum.prototype.toStepping = function(value) {
                        value = toStepping(this.xVal, this.xPct, value);
                        return value;
                    };
                    Spectrum.prototype.fromStepping = function(value) {
                        return fromStepping(this.xVal, this.xPct, value);
                    };
                    Spectrum.prototype.getStep = function(value) {
                        value = getStep(this.xPct, this.xSteps, this.snap, value);
                        return value;
                    };
                    Spectrum.prototype.getDefaultStep = function(value, isDown, size) {
                        var j = getJ(value, this.xPct);
                        if (100 === value || isDown && value === this.xPct[j - 1]) j = Math.max(j - 1, 1);
                        return (this.xVal[j] - this.xVal[j - 1]) / size;
                    };
                    Spectrum.prototype.getNearbySteps = function(value) {
                        var j = getJ(value, this.xPct);
                        return {
                            stepBefore: {
                                startValue: this.xVal[j - 2],
                                step: this.xNumSteps[j - 2],
                                highestStep: this.xHighestCompleteStep[j - 2]
                            },
                            thisStep: {
                                startValue: this.xVal[j - 1],
                                step: this.xNumSteps[j - 1],
                                highestStep: this.xHighestCompleteStep[j - 1]
                            },
                            stepAfter: {
                                startValue: this.xVal[j],
                                step: this.xNumSteps[j],
                                highestStep: this.xHighestCompleteStep[j]
                            }
                        };
                    };
                    Spectrum.prototype.countStepDecimals = function() {
                        var stepDecimals = this.xNumSteps.map(countDecimals);
                        return Math.max.apply(null, stepDecimals);
                    };
                    Spectrum.prototype.hasNoSize = function() {
                        return this.xVal[0] === this.xVal[this.xVal.length - 1];
                    };
                    Spectrum.prototype.convert = function(value) {
                        return this.getStep(this.toStepping(value));
                    };
                    Spectrum.prototype.handleEntryPoint = function(index, value) {
                        var percentage;
                        if ("min" === index) percentage = 0; else if ("max" === index) percentage = 100; else percentage = parseFloat(index);
                        if (!isNumeric(percentage) || !isNumeric(value[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
                        this.xPct.push(percentage);
                        this.xVal.push(value[0]);
                        var value1 = Number(value[1]);
                        if (!percentage) {
                            if (!isNaN(value1)) this.xSteps[0] = value1;
                        } else this.xSteps.push(isNaN(value1) ? false : value1);
                        this.xHighestCompleteStep.push(0);
                    };
                    Spectrum.prototype.handleStepPoint = function(i, n) {
                        if (!n) return;
                        if (this.xVal[i] === this.xVal[i + 1]) {
                            this.xSteps[i] = this.xHighestCompleteStep[i] = this.xVal[i];
                            return;
                        }
                        this.xSteps[i] = fromPercentage([ this.xVal[i], this.xVal[i + 1] ], n, 0) / subRangeRatio(this.xPct[i], this.xPct[i + 1]);
                        var totalSteps = (this.xVal[i + 1] - this.xVal[i]) / this.xNumSteps[i];
                        var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
                        var step = this.xVal[i] + this.xNumSteps[i] * highestStep;
                        this.xHighestCompleteStep[i] = step;
                    };
                    return Spectrum;
                }();
                var defaultFormatter = {
                    to: function(value) {
                        return void 0 === value ? "" : value.toFixed(2);
                    },
                    from: Number
                };
                var cssClasses = {
                    target: "target",
                    base: "base",
                    origin: "origin",
                    handle: "handle",
                    handleLower: "handle-lower",
                    handleUpper: "handle-upper",
                    touchArea: "touch-area",
                    horizontal: "horizontal",
                    vertical: "vertical",
                    background: "background",
                    connect: "connect",
                    connects: "connects",
                    ltr: "ltr",
                    rtl: "rtl",
                    textDirectionLtr: "txt-dir-ltr",
                    textDirectionRtl: "txt-dir-rtl",
                    draggable: "draggable",
                    drag: "state-drag",
                    tap: "state-tap",
                    active: "active",
                    tooltip: "tooltip",
                    pips: "pips",
                    pipsHorizontal: "pips-horizontal",
                    pipsVertical: "pips-vertical",
                    marker: "marker",
                    markerHorizontal: "marker-horizontal",
                    markerVertical: "marker-vertical",
                    markerNormal: "marker-normal",
                    markerLarge: "marker-large",
                    markerSub: "marker-sub",
                    value: "value",
                    valueHorizontal: "value-horizontal",
                    valueVertical: "value-vertical",
                    valueNormal: "value-normal",
                    valueLarge: "value-large",
                    valueSub: "value-sub"
                };
                var INTERNAL_EVENT_NS = {
                    tooltips: ".__tooltips",
                    aria: ".__aria"
                };
                function testStep(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'step' is not numeric.");
                    parsed.singleStep = entry;
                }
                function testKeyboardPageMultiplier(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
                    parsed.keyboardPageMultiplier = entry;
                }
                function testKeyboardMultiplier(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
                    parsed.keyboardMultiplier = entry;
                }
                function testKeyboardDefaultStep(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
                    parsed.keyboardDefaultStep = entry;
                }
                function testRange(parsed, entry) {
                    if ("object" !== typeof entry || Array.isArray(entry)) throw new Error("noUiSlider: 'range' is not an object.");
                    if (void 0 === entry.min || void 0 === entry.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
                    parsed.spectrum = new Spectrum(entry, parsed.snap || false, parsed.singleStep);
                }
                function testStart(parsed, entry) {
                    entry = asArray(entry);
                    if (!Array.isArray(entry) || !entry.length) throw new Error("noUiSlider: 'start' option is incorrect.");
                    parsed.handles = entry.length;
                    parsed.start = entry;
                }
                function testSnap(parsed, entry) {
                    if ("boolean" !== typeof entry) throw new Error("noUiSlider: 'snap' option must be a boolean.");
                    parsed.snap = entry;
                }
                function testAnimate(parsed, entry) {
                    if ("boolean" !== typeof entry) throw new Error("noUiSlider: 'animate' option must be a boolean.");
                    parsed.animate = entry;
                }
                function testAnimationDuration(parsed, entry) {
                    if ("number" !== typeof entry) throw new Error("noUiSlider: 'animationDuration' option must be a number.");
                    parsed.animationDuration = entry;
                }
                function testConnect(parsed, entry) {
                    var connect = [ false ];
                    var i;
                    if ("lower" === entry) entry = [ true, false ]; else if ("upper" === entry) entry = [ false, true ];
                    if (true === entry || false === entry) {
                        for (i = 1; i < parsed.handles; i++) connect.push(entry);
                        connect.push(false);
                    } else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count."); else connect = entry;
                    parsed.connect = connect;
                }
                function testOrientation(parsed, entry) {
                    switch (entry) {
                      case "horizontal":
                        parsed.ort = 0;
                        break;

                      case "vertical":
                        parsed.ort = 1;
                        break;

                      default:
                        throw new Error("noUiSlider: 'orientation' option is invalid.");
                    }
                }
                function testMargin(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'margin' option must be numeric.");
                    if (0 === entry) return;
                    parsed.margin = parsed.spectrum.getDistance(entry);
                }
                function testLimit(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'limit' option must be numeric.");
                    parsed.limit = parsed.spectrum.getDistance(entry);
                    if (!parsed.limit || parsed.handles < 2) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
                }
                function testPadding(parsed, entry) {
                    var index;
                    if (!isNumeric(entry) && !Array.isArray(entry)) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
                    if (Array.isArray(entry) && !(2 === entry.length || isNumeric(entry[0]) || isNumeric(entry[1]))) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
                    if (0 === entry) return;
                    if (!Array.isArray(entry)) entry = [ entry, entry ];
                    parsed.padding = [ parsed.spectrum.getDistance(entry[0]), parsed.spectrum.getDistance(entry[1]) ];
                    for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
                    var totalPadding = entry[0] + entry[1];
                    var firstValue = parsed.spectrum.xVal[0];
                    var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1];
                    if (totalPadding / (lastValue - firstValue) > 1) throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
                }
                function testDirection(parsed, entry) {
                    switch (entry) {
                      case "ltr":
                        parsed.dir = 0;
                        break;

                      case "rtl":
                        parsed.dir = 1;
                        break;

                      default:
                        throw new Error("noUiSlider: 'direction' option was not recognized.");
                    }
                }
                function testBehaviour(parsed, entry) {
                    if ("string" !== typeof entry) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
                    var tap = entry.indexOf("tap") >= 0;
                    var drag = entry.indexOf("drag") >= 0;
                    var fixed = entry.indexOf("fixed") >= 0;
                    var snap = entry.indexOf("snap") >= 0;
                    var hover = entry.indexOf("hover") >= 0;
                    var unconstrained = entry.indexOf("unconstrained") >= 0;
                    var dragAll = entry.indexOf("drag-all") >= 0;
                    var smoothSteps = entry.indexOf("smooth-steps") >= 0;
                    if (fixed) {
                        if (2 !== parsed.handles) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
                        testMargin(parsed, parsed.start[1] - parsed.start[0]);
                    }
                    if (unconstrained && (parsed.margin || parsed.limit)) throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
                    parsed.events = {
                        tap: tap || snap,
                        drag,
                        dragAll,
                        smoothSteps,
                        fixed,
                        snap,
                        hover,
                        unconstrained
                    };
                }
                function testTooltips(parsed, entry) {
                    if (false === entry) return;
                    if (true === entry || isValidPartialFormatter(entry)) {
                        parsed.tooltips = [];
                        for (var i = 0; i < parsed.handles; i++) parsed.tooltips.push(entry);
                    } else {
                        entry = asArray(entry);
                        if (entry.length !== parsed.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
                        entry.forEach((function(formatter) {
                            if ("boolean" !== typeof formatter && !isValidPartialFormatter(formatter)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
                        }));
                        parsed.tooltips = entry;
                    }
                }
                function testHandleAttributes(parsed, entry) {
                    if (entry.length !== parsed.handles) throw new Error("noUiSlider: must pass a attributes for all handles.");
                    parsed.handleAttributes = entry;
                }
                function testAriaFormat(parsed, entry) {
                    if (!isValidPartialFormatter(entry)) throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
                    parsed.ariaFormat = entry;
                }
                function testFormat(parsed, entry) {
                    if (!isValidFormatter(entry)) throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
                    parsed.format = entry;
                }
                function testKeyboardSupport(parsed, entry) {
                    if ("boolean" !== typeof entry) throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
                    parsed.keyboardSupport = entry;
                }
                function testDocumentElement(parsed, entry) {
                    parsed.documentElement = entry;
                }
                function testCssPrefix(parsed, entry) {
                    if ("string" !== typeof entry && false !== entry) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
                    parsed.cssPrefix = entry;
                }
                function testCssClasses(parsed, entry) {
                    if ("object" !== typeof entry) throw new Error("noUiSlider: 'cssClasses' must be an object.");
                    if ("string" === typeof parsed.cssPrefix) {
                        parsed.cssClasses = {};
                        Object.keys(entry).forEach((function(key) {
                            parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
                        }));
                    } else parsed.cssClasses = entry;
                }
                function testOptions(options) {
                    var parsed = {
                        margin: null,
                        limit: null,
                        padding: null,
                        animate: true,
                        animationDuration: 300,
                        ariaFormat: defaultFormatter,
                        format: defaultFormatter
                    };
                    var tests = {
                        step: {
                            r: false,
                            t: testStep
                        },
                        keyboardPageMultiplier: {
                            r: false,
                            t: testKeyboardPageMultiplier
                        },
                        keyboardMultiplier: {
                            r: false,
                            t: testKeyboardMultiplier
                        },
                        keyboardDefaultStep: {
                            r: false,
                            t: testKeyboardDefaultStep
                        },
                        start: {
                            r: true,
                            t: testStart
                        },
                        connect: {
                            r: true,
                            t: testConnect
                        },
                        direction: {
                            r: true,
                            t: testDirection
                        },
                        snap: {
                            r: false,
                            t: testSnap
                        },
                        animate: {
                            r: false,
                            t: testAnimate
                        },
                        animationDuration: {
                            r: false,
                            t: testAnimationDuration
                        },
                        range: {
                            r: true,
                            t: testRange
                        },
                        orientation: {
                            r: false,
                            t: testOrientation
                        },
                        margin: {
                            r: false,
                            t: testMargin
                        },
                        limit: {
                            r: false,
                            t: testLimit
                        },
                        padding: {
                            r: false,
                            t: testPadding
                        },
                        behaviour: {
                            r: true,
                            t: testBehaviour
                        },
                        ariaFormat: {
                            r: false,
                            t: testAriaFormat
                        },
                        format: {
                            r: false,
                            t: testFormat
                        },
                        tooltips: {
                            r: false,
                            t: testTooltips
                        },
                        keyboardSupport: {
                            r: true,
                            t: testKeyboardSupport
                        },
                        documentElement: {
                            r: false,
                            t: testDocumentElement
                        },
                        cssPrefix: {
                            r: true,
                            t: testCssPrefix
                        },
                        cssClasses: {
                            r: true,
                            t: testCssClasses
                        },
                        handleAttributes: {
                            r: false,
                            t: testHandleAttributes
                        }
                    };
                    var defaults = {
                        connect: false,
                        direction: "ltr",
                        behaviour: "tap",
                        orientation: "horizontal",
                        keyboardSupport: true,
                        cssPrefix: "noUi-",
                        cssClasses,
                        keyboardPageMultiplier: 5,
                        keyboardMultiplier: 1,
                        keyboardDefaultStep: 10
                    };
                    if (options.format && !options.ariaFormat) options.ariaFormat = options.format;
                    Object.keys(tests).forEach((function(name) {
                        if (!isSet(options[name]) && void 0 === defaults[name]) {
                            if (tests[name].r) throw new Error("noUiSlider: '" + name + "' is required.");
                            return;
                        }
                        tests[name].t(parsed, !isSet(options[name]) ? defaults[name] : options[name]);
                    }));
                    parsed.pips = options.pips;
                    var d = document.createElement("div");
                    var msPrefix = void 0 !== d.style.msTransform;
                    var noPrefix = void 0 !== d.style.transform;
                    parsed.transformRule = noPrefix ? "transform" : msPrefix ? "msTransform" : "webkitTransform";
                    var styles = [ [ "left", "top" ], [ "right", "bottom" ] ];
                    parsed.style = styles[parsed.dir][parsed.ort];
                    return parsed;
                }
                function scope(target, options, originalOptions) {
                    var actions = getActions();
                    var supportsTouchActionNone = getSupportsTouchActionNone();
                    var supportsPassive = supportsTouchActionNone && getSupportsPassive();
                    var scope_Target = target;
                    var scope_Base;
                    var scope_Handles;
                    var scope_Connects;
                    var scope_Pips;
                    var scope_Tooltips;
                    var scope_Spectrum = options.spectrum;
                    var scope_Values = [];
                    var scope_Locations = [];
                    var scope_HandleNumbers = [];
                    var scope_ActiveHandlesCount = 0;
                    var scope_Events = {};
                    var scope_Document = target.ownerDocument;
                    var scope_DocumentElement = options.documentElement || scope_Document.documentElement;
                    var scope_Body = scope_Document.body;
                    var scope_DirOffset = "rtl" === scope_Document.dir || 1 === options.ort ? 0 : 100;
                    function addNodeTo(addTarget, className) {
                        var div = scope_Document.createElement("div");
                        if (className) addClass(div, className);
                        addTarget.appendChild(div);
                        return div;
                    }
                    function addOrigin(base, handleNumber) {
                        var origin = addNodeTo(base, options.cssClasses.origin);
                        var handle = addNodeTo(origin, options.cssClasses.handle);
                        addNodeTo(handle, options.cssClasses.touchArea);
                        handle.setAttribute("data-handle", String(handleNumber));
                        if (options.keyboardSupport) {
                            handle.setAttribute("tabindex", "0");
                            handle.addEventListener("keydown", (function(event) {
                                return eventKeydown(event, handleNumber);
                            }));
                        }
                        if (void 0 !== options.handleAttributes) {
                            var attributes_1 = options.handleAttributes[handleNumber];
                            Object.keys(attributes_1).forEach((function(attribute) {
                                handle.setAttribute(attribute, attributes_1[attribute]);
                            }));
                        }
                        handle.setAttribute("role", "slider");
                        handle.setAttribute("aria-orientation", options.ort ? "vertical" : "horizontal");
                        if (0 === handleNumber) addClass(handle, options.cssClasses.handleLower); else if (handleNumber === options.handles - 1) addClass(handle, options.cssClasses.handleUpper);
                        return origin;
                    }
                    function addConnect(base, add) {
                        if (!add) return false;
                        return addNodeTo(base, options.cssClasses.connect);
                    }
                    function addElements(connectOptions, base) {
                        var connectBase = addNodeTo(base, options.cssClasses.connects);
                        scope_Handles = [];
                        scope_Connects = [];
                        scope_Connects.push(addConnect(connectBase, connectOptions[0]));
                        for (var i = 0; i < options.handles; i++) {
                            scope_Handles.push(addOrigin(base, i));
                            scope_HandleNumbers[i] = i;
                            scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
                        }
                    }
                    function addSlider(addTarget) {
                        addClass(addTarget, options.cssClasses.target);
                        if (0 === options.dir) addClass(addTarget, options.cssClasses.ltr); else addClass(addTarget, options.cssClasses.rtl);
                        if (0 === options.ort) addClass(addTarget, options.cssClasses.horizontal); else addClass(addTarget, options.cssClasses.vertical);
                        var textDirection = getComputedStyle(addTarget).direction;
                        if ("rtl" === textDirection) addClass(addTarget, options.cssClasses.textDirectionRtl); else addClass(addTarget, options.cssClasses.textDirectionLtr);
                        return addNodeTo(addTarget, options.cssClasses.base);
                    }
                    function addTooltip(handle, handleNumber) {
                        if (!options.tooltips || !options.tooltips[handleNumber]) return false;
                        return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
                    }
                    function isSliderDisabled() {
                        return scope_Target.hasAttribute("disabled");
                    }
                    function isHandleDisabled(handleNumber) {
                        var handleOrigin = scope_Handles[handleNumber];
                        return handleOrigin.hasAttribute("disabled");
                    }
                    function removeTooltips() {
                        if (scope_Tooltips) {
                            removeEvent("update" + INTERNAL_EVENT_NS.tooltips);
                            scope_Tooltips.forEach((function(tooltip) {
                                if (tooltip) removeElement(tooltip);
                            }));
                            scope_Tooltips = null;
                        }
                    }
                    function tooltips() {
                        removeTooltips();
                        scope_Tooltips = scope_Handles.map(addTooltip);
                        bindEvent("update" + INTERNAL_EVENT_NS.tooltips, (function(values, handleNumber, unencoded) {
                            if (!scope_Tooltips || !options.tooltips) return;
                            if (false === scope_Tooltips[handleNumber]) return;
                            var formattedValue = values[handleNumber];
                            if (true !== options.tooltips[handleNumber]) formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
                            scope_Tooltips[handleNumber].innerHTML = formattedValue;
                        }));
                    }
                    function aria() {
                        removeEvent("update" + INTERNAL_EVENT_NS.aria);
                        bindEvent("update" + INTERNAL_EVENT_NS.aria, (function(values, handleNumber, unencoded, tap, positions) {
                            scope_HandleNumbers.forEach((function(index) {
                                var handle = scope_Handles[index];
                                var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
                                var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);
                                var now = positions[index];
                                var text = String(options.ariaFormat.to(unencoded[index]));
                                min = scope_Spectrum.fromStepping(min).toFixed(1);
                                max = scope_Spectrum.fromStepping(max).toFixed(1);
                                now = scope_Spectrum.fromStepping(now).toFixed(1);
                                handle.children[0].setAttribute("aria-valuemin", min);
                                handle.children[0].setAttribute("aria-valuemax", max);
                                handle.children[0].setAttribute("aria-valuenow", now);
                                handle.children[0].setAttribute("aria-valuetext", text);
                            }));
                        }));
                    }
                    function getGroup(pips) {
                        if (pips.mode === exports.PipsMode.Range || pips.mode === exports.PipsMode.Steps) return scope_Spectrum.xVal;
                        if (pips.mode === exports.PipsMode.Count) {
                            if (pips.values < 2) throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
                            var interval = pips.values - 1;
                            var spread = 100 / interval;
                            var values = [];
                            while (interval--) values[interval] = interval * spread;
                            values.push(100);
                            return mapToRange(values, pips.stepped);
                        }
                        if (pips.mode === exports.PipsMode.Positions) return mapToRange(pips.values, pips.stepped);
                        if (pips.mode === exports.PipsMode.Values) {
                            if (pips.stepped) return pips.values.map((function(value) {
                                return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                            }));
                            return pips.values;
                        }
                        return [];
                    }
                    function mapToRange(values, stepped) {
                        return values.map((function(value) {
                            return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
                        }));
                    }
                    function generateSpread(pips) {
                        function safeIncrement(value, increment) {
                            return Number((value + increment).toFixed(7));
                        }
                        var group = getGroup(pips);
                        var indexes = {};
                        var firstInRange = scope_Spectrum.xVal[0];
                        var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
                        var ignoreFirst = false;
                        var ignoreLast = false;
                        var prevPct = 0;
                        group = unique(group.slice().sort((function(a, b) {
                            return a - b;
                        })));
                        if (group[0] !== firstInRange) {
                            group.unshift(firstInRange);
                            ignoreFirst = true;
                        }
                        if (group[group.length - 1] !== lastInRange) {
                            group.push(lastInRange);
                            ignoreLast = true;
                        }
                        group.forEach((function(current, index) {
                            var step;
                            var i;
                            var q;
                            var low = current;
                            var high = group[index + 1];
                            var newPct;
                            var pctDifference;
                            var pctPos;
                            var type;
                            var steps;
                            var realSteps;
                            var stepSize;
                            var isSteps = pips.mode === exports.PipsMode.Steps;
                            if (isSteps) step = scope_Spectrum.xNumSteps[index];
                            if (!step) step = high - low;
                            if (void 0 === high) high = low;
                            step = Math.max(step, 1e-7);
                            for (i = low; i <= high; i = safeIncrement(i, step)) {
                                newPct = scope_Spectrum.toStepping(i);
                                pctDifference = newPct - prevPct;
                                steps = pctDifference / (pips.density || 1);
                                realSteps = Math.round(steps);
                                stepSize = pctDifference / realSteps;
                                for (q = 1; q <= realSteps; q += 1) {
                                    pctPos = prevPct + q * stepSize;
                                    indexes[pctPos.toFixed(5)] = [ scope_Spectrum.fromStepping(pctPos), 0 ];
                                }
                                type = group.indexOf(i) > -1 ? exports.PipsType.LargeValue : isSteps ? exports.PipsType.SmallValue : exports.PipsType.NoValue;
                                if (!index && ignoreFirst && i !== high) type = 0;
                                if (!(i === high && ignoreLast)) indexes[newPct.toFixed(5)] = [ i, type ];
                                prevPct = newPct;
                            }
                        }));
                        return indexes;
                    }
                    function addMarking(spread, filterFunc, formatter) {
                        var _a, _b;
                        var element = scope_Document.createElement("div");
                        var valueSizeClasses = (_a = {}, _a[exports.PipsType.None] = "", _a[exports.PipsType.NoValue] = options.cssClasses.valueNormal, 
                        _a[exports.PipsType.LargeValue] = options.cssClasses.valueLarge, _a[exports.PipsType.SmallValue] = options.cssClasses.valueSub, 
                        _a);
                        var markerSizeClasses = (_b = {}, _b[exports.PipsType.None] = "", _b[exports.PipsType.NoValue] = options.cssClasses.markerNormal, 
                        _b[exports.PipsType.LargeValue] = options.cssClasses.markerLarge, _b[exports.PipsType.SmallValue] = options.cssClasses.markerSub, 
                        _b);
                        var valueOrientationClasses = [ options.cssClasses.valueHorizontal, options.cssClasses.valueVertical ];
                        var markerOrientationClasses = [ options.cssClasses.markerHorizontal, options.cssClasses.markerVertical ];
                        addClass(element, options.cssClasses.pips);
                        addClass(element, 0 === options.ort ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);
                        function getClasses(type, source) {
                            var a = source === options.cssClasses.value;
                            var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
                            var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
                            return source + " " + orientationClasses[options.ort] + " " + sizeClasses[type];
                        }
                        function addSpread(offset, value, type) {
                            type = filterFunc ? filterFunc(value, type) : type;
                            if (type === exports.PipsType.None) return;
                            var node = addNodeTo(element, false);
                            node.className = getClasses(type, options.cssClasses.marker);
                            node.style[options.style] = offset + "%";
                            if (type > exports.PipsType.NoValue) {
                                node = addNodeTo(element, false);
                                node.className = getClasses(type, options.cssClasses.value);
                                node.setAttribute("data-value", String(value));
                                node.style[options.style] = offset + "%";
                                node.innerHTML = String(formatter.to(value));
                            }
                        }
                        Object.keys(spread).forEach((function(offset) {
                            addSpread(offset, spread[offset][0], spread[offset][1]);
                        }));
                        return element;
                    }
                    function removePips() {
                        if (scope_Pips) {
                            removeElement(scope_Pips);
                            scope_Pips = null;
                        }
                    }
                    function pips(pips) {
                        removePips();
                        var spread = generateSpread(pips);
                        var filter = pips.filter;
                        var format = pips.format || {
                            to: function(value) {
                                return String(Math.round(value));
                            }
                        };
                        scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));
                        return scope_Pips;
                    }
                    function baseSize() {
                        var rect = scope_Base.getBoundingClientRect();
                        var alt = "offset" + [ "Width", "Height" ][options.ort];
                        return 0 === options.ort ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
                    }
                    function attachEvent(events, element, callback, data) {
                        var method = function(event) {
                            var e = fixEvent(event, data.pageOffset, data.target || element);
                            if (!e) return false;
                            if (isSliderDisabled() && !data.doNotReject) return false;
                            if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) return false;
                            if (events === actions.start && void 0 !== e.buttons && e.buttons > 1) return false;
                            if (data.hover && e.buttons) return false;
                            if (!supportsPassive) e.preventDefault();
                            e.calcPoint = e.points[options.ort];
                            callback(e, data);
                            return;
                        };
                        var methods = [];
                        events.split(" ").forEach((function(eventName) {
                            element.addEventListener(eventName, method, supportsPassive ? {
                                passive: true
                            } : false);
                            methods.push([ eventName, method ]);
                        }));
                        return methods;
                    }
                    function fixEvent(e, pageOffset, eventTarget) {
                        var touch = 0 === e.type.indexOf("touch");
                        var mouse = 0 === e.type.indexOf("mouse");
                        var pointer = 0 === e.type.indexOf("pointer");
                        var x = 0;
                        var y = 0;
                        if (0 === e.type.indexOf("MSPointer")) pointer = true;
                        if ("mousedown" === e.type && !e.buttons && !e.touches) return false;
                        if (touch) {
                            var isTouchOnTarget = function(checkTouch) {
                                var target = checkTouch.target;
                                return target === eventTarget || eventTarget.contains(target) || e.composed && e.composedPath().shift() === eventTarget;
                            };
                            if ("touchstart" === e.type) {
                                var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);
                                if (targetTouches.length > 1) return false;
                                x = targetTouches[0].pageX;
                                y = targetTouches[0].pageY;
                            } else {
                                var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);
                                if (!targetTouch) return false;
                                x = targetTouch.pageX;
                                y = targetTouch.pageY;
                            }
                        }
                        pageOffset = pageOffset || getPageOffset(scope_Document);
                        if (mouse || pointer) {
                            x = e.clientX + pageOffset.x;
                            y = e.clientY + pageOffset.y;
                        }
                        e.pageOffset = pageOffset;
                        e.points = [ x, y ];
                        e.cursor = mouse || pointer;
                        return e;
                    }
                    function calcPointToPercentage(calcPoint) {
                        var location = calcPoint - offset(scope_Base, options.ort);
                        var proposal = 100 * location / baseSize();
                        proposal = limit(proposal);
                        return options.dir ? 100 - proposal : proposal;
                    }
                    function getClosestHandle(clickedPosition) {
                        var smallestDifference = 100;
                        var handleNumber = false;
                        scope_Handles.forEach((function(handle, index) {
                            if (isHandleDisabled(index)) return;
                            var handlePosition = scope_Locations[index];
                            var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition);
                            var clickAtEdge = 100 === differenceWithThisHandle && 100 === smallestDifference;
                            var isCloser = differenceWithThisHandle < smallestDifference;
                            var isCloserAfter = differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition;
                            if (isCloser || isCloserAfter || clickAtEdge) {
                                handleNumber = index;
                                smallestDifference = differenceWithThisHandle;
                            }
                        }));
                        return handleNumber;
                    }
                    function documentLeave(event, data) {
                        if ("mouseout" === event.type && "HTML" === event.target.nodeName && null === event.relatedTarget) eventEnd(event, data);
                    }
                    function eventMove(event, data) {
                        if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === event.buttons && 0 !== data.buttonsProperty) return eventEnd(event, data);
                        var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
                        var proposal = 100 * movement / data.baseSize;
                        moveHandles(movement > 0, proposal, data.locations, data.handleNumbers, data.connect);
                    }
                    function eventEnd(event, data) {
                        if (data.handle) {
                            removeClass(data.handle, options.cssClasses.active);
                            scope_ActiveHandlesCount -= 1;
                        }
                        data.listeners.forEach((function(c) {
                            scope_DocumentElement.removeEventListener(c[0], c[1]);
                        }));
                        if (0 === scope_ActiveHandlesCount) {
                            removeClass(scope_Target, options.cssClasses.drag);
                            setZindex();
                            if (event.cursor) {
                                scope_Body.style.cursor = "";
                                scope_Body.removeEventListener("selectstart", preventDefault);
                            }
                        }
                        if (options.events.smoothSteps) {
                            data.handleNumbers.forEach((function(handleNumber) {
                                setHandle(handleNumber, scope_Locations[handleNumber], true, true, false, false);
                            }));
                            data.handleNumbers.forEach((function(handleNumber) {
                                fireEvent("update", handleNumber);
                            }));
                        }
                        data.handleNumbers.forEach((function(handleNumber) {
                            fireEvent("change", handleNumber);
                            fireEvent("set", handleNumber);
                            fireEvent("end", handleNumber);
                        }));
                    }
                    function eventStart(event, data) {
                        if (data.handleNumbers.some(isHandleDisabled)) return;
                        var handle;
                        if (1 === data.handleNumbers.length) {
                            var handleOrigin = scope_Handles[data.handleNumbers[0]];
                            handle = handleOrigin.children[0];
                            scope_ActiveHandlesCount += 1;
                            addClass(handle, options.cssClasses.active);
                        }
                        event.stopPropagation();
                        var listeners = [];
                        var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
                            target: event.target,
                            handle,
                            connect: data.connect,
                            listeners,
                            startCalcPoint: event.calcPoint,
                            baseSize: baseSize(),
                            pageOffset: event.pageOffset,
                            handleNumbers: data.handleNumbers,
                            buttonsProperty: event.buttons,
                            locations: scope_Locations.slice()
                        });
                        var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
                            target: event.target,
                            handle,
                            listeners,
                            doNotReject: true,
                            handleNumbers: data.handleNumbers
                        });
                        var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
                            target: event.target,
                            handle,
                            listeners,
                            doNotReject: true,
                            handleNumbers: data.handleNumbers
                        });
                        listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
                        if (event.cursor) {
                            scope_Body.style.cursor = getComputedStyle(event.target).cursor;
                            if (scope_Handles.length > 1) addClass(scope_Target, options.cssClasses.drag);
                            scope_Body.addEventListener("selectstart", preventDefault, false);
                        }
                        data.handleNumbers.forEach((function(handleNumber) {
                            fireEvent("start", handleNumber);
                        }));
                    }
                    function eventTap(event) {
                        event.stopPropagation();
                        var proposal = calcPointToPercentage(event.calcPoint);
                        var handleNumber = getClosestHandle(proposal);
                        if (false === handleNumber) return;
                        if (!options.events.snap) addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
                        setHandle(handleNumber, proposal, true, true);
                        setZindex();
                        fireEvent("slide", handleNumber, true);
                        fireEvent("update", handleNumber, true);
                        if (!options.events.snap) {
                            fireEvent("change", handleNumber, true);
                            fireEvent("set", handleNumber, true);
                        } else eventStart(event, {
                            handleNumbers: [ handleNumber ]
                        });
                    }
                    function eventHover(event) {
                        var proposal = calcPointToPercentage(event.calcPoint);
                        var to = scope_Spectrum.getStep(proposal);
                        var value = scope_Spectrum.fromStepping(to);
                        Object.keys(scope_Events).forEach((function(targetEvent) {
                            if ("hover" === targetEvent.split(".")[0]) scope_Events[targetEvent].forEach((function(callback) {
                                callback.call(scope_Self, value);
                            }));
                        }));
                    }
                    function eventKeydown(event, handleNumber) {
                        if (isSliderDisabled() || isHandleDisabled(handleNumber)) return false;
                        var horizontalKeys = [ "Left", "Right" ];
                        var verticalKeys = [ "Down", "Up" ];
                        var largeStepKeys = [ "PageDown", "PageUp" ];
                        var edgeKeys = [ "Home", "End" ];
                        if (options.dir && !options.ort) horizontalKeys.reverse(); else if (options.ort && !options.dir) {
                            verticalKeys.reverse();
                            largeStepKeys.reverse();
                        }
                        var key = event.key.replace("Arrow", "");
                        var isLargeDown = key === largeStepKeys[0];
                        var isLargeUp = key === largeStepKeys[1];
                        var isDown = key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown;
                        var isUp = key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp;
                        var isMin = key === edgeKeys[0];
                        var isMax = key === edgeKeys[1];
                        if (!isDown && !isUp && !isMin && !isMax) return true;
                        event.preventDefault();
                        var to;
                        if (isUp || isDown) {
                            var direction = isDown ? 0 : 1;
                            var steps = getNextStepsForHandle(handleNumber);
                            var step = steps[direction];
                            if (null === step) return false;
                            if (false === step) step = scope_Spectrum.getDefaultStep(scope_Locations[handleNumber], isDown, options.keyboardDefaultStep);
                            if (isLargeUp || isLargeDown) step *= options.keyboardPageMultiplier; else step *= options.keyboardMultiplier;
                            step = Math.max(step, 1e-7);
                            step *= isDown ? -1 : 1;
                            to = scope_Values[handleNumber] + step;
                        } else if (isMax) to = options.spectrum.xVal[options.spectrum.xVal.length - 1]; else to = options.spectrum.xVal[0];
                        setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true);
                        fireEvent("slide", handleNumber);
                        fireEvent("update", handleNumber);
                        fireEvent("change", handleNumber);
                        fireEvent("set", handleNumber);
                        return false;
                    }
                    function bindSliderEvents(behaviour) {
                        if (!behaviour.fixed) scope_Handles.forEach((function(handle, index) {
                            attachEvent(actions.start, handle.children[0], eventStart, {
                                handleNumbers: [ index ]
                            });
                        }));
                        if (behaviour.tap) attachEvent(actions.start, scope_Base, eventTap, {});
                        if (behaviour.hover) attachEvent(actions.move, scope_Base, eventHover, {
                            hover: true
                        });
                        if (behaviour.drag) scope_Connects.forEach((function(connect, index) {
                            if (false === connect || 0 === index || index === scope_Connects.length - 1) return;
                            var handleBefore = scope_Handles[index - 1];
                            var handleAfter = scope_Handles[index];
                            var eventHolders = [ connect ];
                            var handlesToDrag = [ handleBefore, handleAfter ];
                            var handleNumbersToDrag = [ index - 1, index ];
                            addClass(connect, options.cssClasses.draggable);
                            if (behaviour.fixed) {
                                eventHolders.push(handleBefore.children[0]);
                                eventHolders.push(handleAfter.children[0]);
                            }
                            if (behaviour.dragAll) {
                                handlesToDrag = scope_Handles;
                                handleNumbersToDrag = scope_HandleNumbers;
                            }
                            eventHolders.forEach((function(eventHolder) {
                                attachEvent(actions.start, eventHolder, eventStart, {
                                    handles: handlesToDrag,
                                    handleNumbers: handleNumbersToDrag,
                                    connect
                                });
                            }));
                        }));
                    }
                    function bindEvent(namespacedEvent, callback) {
                        scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
                        scope_Events[namespacedEvent].push(callback);
                        if ("update" === namespacedEvent.split(".")[0]) scope_Handles.forEach((function(a, index) {
                            fireEvent("update", index);
                        }));
                    }
                    function isInternalNamespace(namespace) {
                        return namespace === INTERNAL_EVENT_NS.aria || namespace === INTERNAL_EVENT_NS.tooltips;
                    }
                    function removeEvent(namespacedEvent) {
                        var event = namespacedEvent && namespacedEvent.split(".")[0];
                        var namespace = event ? namespacedEvent.substring(event.length) : namespacedEvent;
                        Object.keys(scope_Events).forEach((function(bind) {
                            var tEvent = bind.split(".")[0];
                            var tNamespace = bind.substring(tEvent.length);
                            if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) if (!isInternalNamespace(tNamespace) || namespace === tNamespace) delete scope_Events[bind];
                        }));
                    }
                    function fireEvent(eventName, handleNumber, tap) {
                        Object.keys(scope_Events).forEach((function(targetEvent) {
                            var eventType = targetEvent.split(".")[0];
                            if (eventName === eventType) scope_Events[targetEvent].forEach((function(callback) {
                                callback.call(scope_Self, scope_Values.map(options.format.to), handleNumber, scope_Values.slice(), tap || false, scope_Locations.slice(), scope_Self);
                            }));
                        }));
                    }
                    function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue, smoothSteps) {
                        var distance;
                        if (scope_Handles.length > 1 && !options.events.unconstrained) {
                            if (lookBackward && handleNumber > 0) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.margin, false);
                                to = Math.max(to, distance);
                            }
                            if (lookForward && handleNumber < scope_Handles.length - 1) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.margin, true);
                                to = Math.min(to, distance);
                            }
                        }
                        if (scope_Handles.length > 1 && options.limit) {
                            if (lookBackward && handleNumber > 0) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.limit, false);
                                to = Math.min(to, distance);
                            }
                            if (lookForward && handleNumber < scope_Handles.length - 1) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.limit, true);
                                to = Math.max(to, distance);
                            }
                        }
                        if (options.padding) {
                            if (0 === handleNumber) {
                                distance = scope_Spectrum.getAbsoluteDistance(0, options.padding[0], false);
                                to = Math.max(to, distance);
                            }
                            if (handleNumber === scope_Handles.length - 1) {
                                distance = scope_Spectrum.getAbsoluteDistance(100, options.padding[1], true);
                                to = Math.min(to, distance);
                            }
                        }
                        if (!smoothSteps) to = scope_Spectrum.getStep(to);
                        to = limit(to);
                        if (to === reference[handleNumber] && !getValue) return false;
                        return to;
                    }
                    function inRuleOrder(v, a) {
                        var o = options.ort;
                        return (o ? a : v) + ", " + (o ? v : a);
                    }
                    function moveHandles(upward, proposal, locations, handleNumbers, connect) {
                        var proposals = locations.slice();
                        var firstHandle = handleNumbers[0];
                        var smoothSteps = options.events.smoothSteps;
                        var b = [ !upward, upward ];
                        var f = [ upward, !upward ];
                        handleNumbers = handleNumbers.slice();
                        if (upward) handleNumbers.reverse();
                        if (handleNumbers.length > 1) handleNumbers.forEach((function(handleNumber, o) {
                            var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false, smoothSteps);
                            if (false === to) proposal = 0; else {
                                proposal = to - proposals[handleNumber];
                                proposals[handleNumber] = to;
                            }
                        })); else b = f = [ true ];
                        var state = false;
                        handleNumbers.forEach((function(handleNumber, o) {
                            state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o], false, smoothSteps) || state;
                        }));
                        if (state) {
                            handleNumbers.forEach((function(handleNumber) {
                                fireEvent("update", handleNumber);
                                fireEvent("slide", handleNumber);
                            }));
                            if (void 0 != connect) fireEvent("drag", firstHandle);
                        }
                    }
                    function transformDirection(a, b) {
                        return options.dir ? 100 - a - b : a;
                    }
                    function updateHandlePosition(handleNumber, to) {
                        scope_Locations[handleNumber] = to;
                        scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
                        var translation = transformDirection(to, 0) - scope_DirOffset;
                        var translateRule = "translate(" + inRuleOrder(translation + "%", "0") + ")";
                        scope_Handles[handleNumber].style[options.transformRule] = translateRule;
                        updateConnect(handleNumber);
                        updateConnect(handleNumber + 1);
                    }
                    function setZindex() {
                        scope_HandleNumbers.forEach((function(handleNumber) {
                            var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
                            var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
                            scope_Handles[handleNumber].style.zIndex = String(zIndex);
                        }));
                    }
                    function setHandle(handleNumber, to, lookBackward, lookForward, exactInput, smoothSteps) {
                        if (!exactInput) to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false, smoothSteps);
                        if (false === to) return false;
                        updateHandlePosition(handleNumber, to);
                        return true;
                    }
                    function updateConnect(index) {
                        if (!scope_Connects[index]) return;
                        var l = 0;
                        var h = 100;
                        if (0 !== index) l = scope_Locations[index - 1];
                        if (index !== scope_Connects.length - 1) h = scope_Locations[index];
                        var connectWidth = h - l;
                        var translateRule = "translate(" + inRuleOrder(transformDirection(l, connectWidth) + "%", "0") + ")";
                        var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";
                        scope_Connects[index].style[options.transformRule] = translateRule + " " + scaleRule;
                    }
                    function resolveToValue(to, handleNumber) {
                        if (null === to || false === to || void 0 === to) return scope_Locations[handleNumber];
                        if ("number" === typeof to) to = String(to);
                        to = options.format.from(to);
                        if (false !== to) to = scope_Spectrum.toStepping(to);
                        if (false === to || isNaN(to)) return scope_Locations[handleNumber];
                        return to;
                    }
                    function valueSet(input, fireSetEvent, exactInput) {
                        var values = asArray(input);
                        var isInit = void 0 === scope_Locations[0];
                        fireSetEvent = void 0 === fireSetEvent ? true : fireSetEvent;
                        if (options.animate && !isInit) addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
                        scope_HandleNumbers.forEach((function(handleNumber) {
                            setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false, exactInput);
                        }));
                        var i = 1 === scope_HandleNumbers.length ? 0 : 1;
                        if (isInit && scope_Spectrum.hasNoSize()) {
                            exactInput = true;
                            scope_Locations[0] = 0;
                            if (scope_HandleNumbers.length > 1) {
                                var space_1 = 100 / (scope_HandleNumbers.length - 1);
                                scope_HandleNumbers.forEach((function(handleNumber) {
                                    scope_Locations[handleNumber] = handleNumber * space_1;
                                }));
                            }
                        }
                        for (;i < scope_HandleNumbers.length; ++i) scope_HandleNumbers.forEach((function(handleNumber) {
                            setHandle(handleNumber, scope_Locations[handleNumber], true, true, exactInput);
                        }));
                        setZindex();
                        scope_HandleNumbers.forEach((function(handleNumber) {
                            fireEvent("update", handleNumber);
                            if (null !== values[handleNumber] && fireSetEvent) fireEvent("set", handleNumber);
                        }));
                    }
                    function valueReset(fireSetEvent) {
                        valueSet(options.start, fireSetEvent);
                    }
                    function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
                        handleNumber = Number(handleNumber);
                        if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) throw new Error("noUiSlider: invalid handle number, got: " + handleNumber);
                        setHandle(handleNumber, resolveToValue(value, handleNumber), true, true, exactInput);
                        fireEvent("update", handleNumber);
                        if (fireSetEvent) fireEvent("set", handleNumber);
                    }
                    function valueGet(unencoded) {
                        if (void 0 === unencoded) unencoded = false;
                        if (unencoded) return 1 === scope_Values.length ? scope_Values[0] : scope_Values.slice(0);
                        var values = scope_Values.map(options.format.to);
                        if (1 === values.length) return values[0];
                        return values;
                    }
                    function destroy() {
                        removeEvent(INTERNAL_EVENT_NS.aria);
                        removeEvent(INTERNAL_EVENT_NS.tooltips);
                        Object.keys(options.cssClasses).forEach((function(key) {
                            removeClass(scope_Target, options.cssClasses[key]);
                        }));
                        while (scope_Target.firstChild) scope_Target.removeChild(scope_Target.firstChild);
                        delete scope_Target.noUiSlider;
                    }
                    function getNextStepsForHandle(handleNumber) {
                        var location = scope_Locations[handleNumber];
                        var nearbySteps = scope_Spectrum.getNearbySteps(location);
                        var value = scope_Values[handleNumber];
                        var increment = nearbySteps.thisStep.step;
                        var decrement = null;
                        if (options.snap) return [ value - nearbySteps.stepBefore.startValue || null, nearbySteps.stepAfter.startValue - value || null ];
                        if (false !== increment) if (value + increment > nearbySteps.stepAfter.startValue) increment = nearbySteps.stepAfter.startValue - value;
                        if (value > nearbySteps.thisStep.startValue) decrement = nearbySteps.thisStep.step; else if (false === nearbySteps.stepBefore.step) decrement = false; else decrement = value - nearbySteps.stepBefore.highestStep;
                        if (100 === location) increment = null; else if (0 === location) decrement = null;
                        var stepDecimals = scope_Spectrum.countStepDecimals();
                        if (null !== increment && false !== increment) increment = Number(increment.toFixed(stepDecimals));
                        if (null !== decrement && false !== decrement) decrement = Number(decrement.toFixed(stepDecimals));
                        return [ decrement, increment ];
                    }
                    function getNextSteps() {
                        return scope_HandleNumbers.map(getNextStepsForHandle);
                    }
                    function updateOptions(optionsToUpdate, fireSetEvent) {
                        var v = valueGet();
                        var updateAble = [ "margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips" ];
                        updateAble.forEach((function(name) {
                            if (void 0 !== optionsToUpdate[name]) originalOptions[name] = optionsToUpdate[name];
                        }));
                        var newOptions = testOptions(originalOptions);
                        updateAble.forEach((function(name) {
                            if (void 0 !== optionsToUpdate[name]) options[name] = newOptions[name];
                        }));
                        scope_Spectrum = newOptions.spectrum;
                        options.margin = newOptions.margin;
                        options.limit = newOptions.limit;
                        options.padding = newOptions.padding;
                        if (options.pips) pips(options.pips); else removePips();
                        if (options.tooltips) tooltips(); else removeTooltips();
                        scope_Locations = [];
                        valueSet(isSet(optionsToUpdate.start) ? optionsToUpdate.start : v, fireSetEvent);
                    }
                    function setupSlider() {
                        scope_Base = addSlider(scope_Target);
                        addElements(options.connect, scope_Base);
                        bindSliderEvents(options.events);
                        valueSet(options.start);
                        if (options.pips) pips(options.pips);
                        if (options.tooltips) tooltips();
                        aria();
                    }
                    setupSlider();
                    var scope_Self = {
                        destroy,
                        steps: getNextSteps,
                        on: bindEvent,
                        off: removeEvent,
                        get: valueGet,
                        set: valueSet,
                        setHandle: valueSetHandle,
                        reset: valueReset,
                        __moveHandles: function(upward, proposal, handleNumbers) {
                            moveHandles(upward, proposal, scope_Locations, handleNumbers);
                        },
                        options: originalOptions,
                        updateOptions,
                        target: scope_Target,
                        removePips,
                        removeTooltips,
                        getPositions: function() {
                            return scope_Locations.slice();
                        },
                        getTooltips: function() {
                            return scope_Tooltips;
                        },
                        getOrigins: function() {
                            return scope_Handles;
                        },
                        pips
                    };
                    return scope_Self;
                }
                function initialize(target, originalOptions) {
                    if (!target || !target.nodeName) throw new Error("noUiSlider: create requires a single element, got: " + target);
                    if (target.noUiSlider) throw new Error("noUiSlider: Slider was already initialized.");
                    var options = testOptions(originalOptions);
                    var api = scope(target, options, originalOptions);
                    target.noUiSlider = api;
                    return api;
                }
                var nouislider = {
                    __spectrum: Spectrum,
                    cssClasses,
                    create: initialize
                };
                exports.create = initialize;
                exports.cssClasses = cssClasses;
                exports["default"] = nouislider;
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
            }));
        },
        9: () => {
            (function($, window, document, undefined) {
                function Owl(element, options) {
                    this.settings = null;
                    this.options = $.extend({}, Owl.Defaults, options);
                    this.$element = $(element);
                    this._handlers = {};
                    this._plugins = {};
                    this._supress = {};
                    this._current = null;
                    this._speed = null;
                    this._coordinates = [];
                    this._breakpoint = null;
                    this._width = null;
                    this._items = [];
                    this._clones = [];
                    this._mergers = [];
                    this._widths = [];
                    this._invalidated = {};
                    this._pipe = [];
                    this._drag = {
                        time: null,
                        target: null,
                        pointer: null,
                        stage: {
                            start: null,
                            current: null
                        },
                        direction: null
                    };
                    this._states = {
                        current: {},
                        tags: {
                            initializing: [ "busy" ],
                            animating: [ "busy" ],
                            dragging: [ "interacting" ]
                        }
                    };
                    $.each([ "onResize", "onThrottledResize" ], $.proxy((function(i, handler) {
                        this._handlers[handler] = $.proxy(this[handler], this);
                    }), this));
                    $.each(Owl.Plugins, $.proxy((function(key, plugin) {
                        this._plugins[key.charAt(0).toLowerCase() + key.slice(1)] = new plugin(this);
                    }), this));
                    $.each(Owl.Workers, $.proxy((function(priority, worker) {
                        this._pipe.push({
                            filter: worker.filter,
                            run: $.proxy(worker.run, this)
                        });
                    }), this));
                    this.setup();
                    this.initialize();
                }
                Owl.Defaults = {
                    items: 3,
                    loop: false,
                    center: false,
                    rewind: false,
                    checkVisibility: true,
                    mouseDrag: true,
                    touchDrag: true,
                    pullDrag: true,
                    freeDrag: false,
                    margin: 0,
                    stagePadding: 0,
                    merge: false,
                    mergeFit: true,
                    autoWidth: false,
                    startPosition: 0,
                    rtl: false,
                    smartSpeed: 250,
                    fluidSpeed: false,
                    dragEndSpeed: false,
                    responsive: {},
                    responsiveRefreshRate: 200,
                    responsiveBaseElement: window,
                    fallbackEasing: "swing",
                    slideTransition: "",
                    info: false,
                    nestedItemSelector: false,
                    itemElement: "div",
                    stageElement: "div",
                    refreshClass: "owl-refresh",
                    loadedClass: "owl-loaded",
                    loadingClass: "owl-loading",
                    rtlClass: "owl-rtl",
                    responsiveClass: "owl-responsive",
                    dragClass: "owl-drag",
                    itemClass: "owl-item",
                    stageClass: "owl-stage",
                    stageOuterClass: "owl-stage-outer",
                    grabClass: "owl-grab"
                };
                Owl.Width = {
                    Default: "default",
                    Inner: "inner",
                    Outer: "outer"
                };
                Owl.Type = {
                    Event: "event",
                    State: "state"
                };
                Owl.Plugins = {};
                Owl.Workers = [ {
                    filter: [ "width", "settings" ],
                    run: function() {
                        this._width = this.$element.width();
                    }
                }, {
                    filter: [ "width", "items", "settings" ],
                    run: function(cache) {
                        cache.current = this._items && this._items[this.relative(this._current)];
                    }
                }, {
                    filter: [ "items", "settings" ],
                    run: function() {
                        this.$stage.children(".cloned").remove();
                    }
                }, {
                    filter: [ "width", "items", "settings" ],
                    run: function(cache) {
                        var margin = this.settings.margin || "", grid = !this.settings.autoWidth, rtl = this.settings.rtl, css = {
                            width: "auto",
                            "margin-left": rtl ? margin : "",
                            "margin-right": rtl ? "" : margin
                        };
                        !grid && this.$stage.children().css(css);
                        cache.css = css;
                    }
                }, {
                    filter: [ "width", "items", "settings" ],
                    run: function(cache) {
                        var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin, merge = null, iterator = this._items.length, grid = !this.settings.autoWidth, widths = [];
                        cache.items = {
                            merge: false,
                            width
                        };
                        while (iterator--) {
                            merge = this._mergers[iterator];
                            merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;
                            cache.items.merge = merge > 1 || cache.items.merge;
                            widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
                        }
                        this._widths = widths;
                    }
                }, {
                    filter: [ "items", "settings" ],
                    run: function() {
                        var clones = [], items = this._items, settings = this.settings, view = Math.max(2 * settings.items, 4), size = 2 * Math.ceil(items.length / 2), repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0, append = "", prepend = "";
                        repeat /= 2;
                        while (repeat > 0) {
                            clones.push(this.normalize(clones.length / 2, true));
                            append += items[clones[clones.length - 1]][0].outerHTML;
                            clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
                            prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
                            repeat -= 1;
                        }
                        this._clones = clones;
                        $(append).addClass("cloned").appendTo(this.$stage);
                        $(prepend).addClass("cloned").prependTo(this.$stage);
                    }
                }, {
                    filter: [ "width", "items", "settings" ],
                    run: function() {
                        var rtl = this.settings.rtl ? 1 : -1, size = this._clones.length + this._items.length, iterator = -1, previous = 0, current = 0, coordinates = [];
                        while (++iterator < size) {
                            previous = coordinates[iterator - 1] || 0;
                            current = this._widths[this.relative(iterator)] + this.settings.margin;
                            coordinates.push(previous + current * rtl);
                        }
                        this._coordinates = coordinates;
                    }
                }, {
                    filter: [ "width", "items", "settings" ],
                    run: function() {
                        var padding = this.settings.stagePadding, coordinates = this._coordinates, css = {
                            width: Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + 2 * padding,
                            "padding-left": padding || "",
                            "padding-right": padding || ""
                        };
                        this.$stage.css(css);
                    }
                }, {
                    filter: [ "width", "items", "settings" ],
                    run: function(cache) {
                        var iterator = this._coordinates.length, grid = !this.settings.autoWidth, items = this.$stage.children();
                        if (grid && cache.items.merge) while (iterator--) {
                            cache.css.width = this._widths[this.relative(iterator)];
                            items.eq(iterator).css(cache.css);
                        } else if (grid) {
                            cache.css.width = cache.items.width;
                            items.css(cache.css);
                        }
                    }
                }, {
                    filter: [ "items" ],
                    run: function() {
                        this._coordinates.length < 1 && this.$stage.removeAttr("style");
                    }
                }, {
                    filter: [ "width", "items", "settings" ],
                    run: function(cache) {
                        cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
                        cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
                        this.reset(cache.current);
                    }
                }, {
                    filter: [ "position" ],
                    run: function() {
                        this.animate(this.coordinates(this._current));
                    }
                }, {
                    filter: [ "width", "position", "items", "settings" ],
                    run: function() {
                        var inner, outer, i, n, rtl = this.settings.rtl ? 1 : -1, padding = 2 * this.settings.stagePadding, begin = this.coordinates(this.current()) + padding, end = begin + this.width() * rtl, matches = [];
                        for (i = 0, n = this._coordinates.length; i < n; i++) {
                            inner = this._coordinates[i - 1] || 0;
                            outer = Math.abs(this._coordinates[i]) + padding * rtl;
                            if (this.op(inner, "<=", begin) && this.op(inner, ">", end) || this.op(outer, "<", begin) && this.op(outer, ">", end)) matches.push(i);
                        }
                        this.$stage.children(".active").removeClass("active");
                        this.$stage.children(":eq(" + matches.join("), :eq(") + ")").addClass("active");
                        this.$stage.children(".center").removeClass("center");
                        if (this.settings.center) this.$stage.children().eq(this.current()).addClass("center");
                    }
                } ];
                Owl.prototype.initializeStage = function() {
                    this.$stage = this.$element.find("." + this.settings.stageClass);
                    if (this.$stage.length) return;
                    this.$element.addClass(this.options.loadingClass);
                    this.$stage = $("<" + this.settings.stageElement + ">", {
                        class: this.settings.stageClass
                    }).wrap($("<div/>", {
                        class: this.settings.stageOuterClass
                    }));
                    this.$element.append(this.$stage.parent());
                };
                Owl.prototype.initializeItems = function() {
                    var $items = this.$element.find(".owl-item");
                    if ($items.length) {
                        this._items = $items.get().map((function(item) {
                            return $(item);
                        }));
                        this._mergers = this._items.map((function() {
                            return 1;
                        }));
                        this.refresh();
                        return;
                    }
                    this.replace(this.$element.children().not(this.$stage.parent()));
                    if (this.isVisible()) this.refresh(); else this.invalidate("width");
                    this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass);
                };
                Owl.prototype.initialize = function() {
                    this.enter("initializing");
                    this.trigger("initialize");
                    this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);
                    if (this.settings.autoWidth && !this.is("pre-loading")) {
                        var imgs, nestedSelector, width;
                        imgs = this.$element.find("img");
                        nestedSelector = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : undefined;
                        width = this.$element.children(nestedSelector).width();
                        if (imgs.length && width <= 0) this.preloadAutoWidthImages(imgs);
                    }
                    this.initializeStage();
                    this.initializeItems();
                    this.registerEventHandlers();
                    this.leave("initializing");
                    this.trigger("initialized");
                };
                Owl.prototype.isVisible = function() {
                    return this.settings.checkVisibility ? this.$element.is(":visible") : true;
                };
                Owl.prototype.setup = function() {
                    var viewport = this.viewport(), overwrites = this.options.responsive, match = -1, settings = null;
                    if (!overwrites) settings = $.extend({}, this.options); else {
                        $.each(overwrites, (function(breakpoint) {
                            if (breakpoint <= viewport && breakpoint > match) match = Number(breakpoint);
                        }));
                        settings = $.extend({}, this.options, overwrites[match]);
                        if ("function" === typeof settings.stagePadding) settings.stagePadding = settings.stagePadding();
                        delete settings.responsive;
                        if (settings.responsiveClass) this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + match));
                    }
                    this.trigger("change", {
                        property: {
                            name: "settings",
                            value: settings
                        }
                    });
                    this._breakpoint = match;
                    this.settings = settings;
                    this.invalidate("settings");
                    this.trigger("changed", {
                        property: {
                            name: "settings",
                            value: this.settings
                        }
                    });
                };
                Owl.prototype.optionsLogic = function() {
                    if (this.settings.autoWidth) {
                        this.settings.stagePadding = false;
                        this.settings.merge = false;
                    }
                };
                Owl.prototype.prepare = function(item) {
                    var event = this.trigger("prepare", {
                        content: item
                    });
                    if (!event.data) event.data = $("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(item);
                    this.trigger("prepared", {
                        content: event.data
                    });
                    return event.data;
                };
                Owl.prototype.update = function() {
                    var i = 0, n = this._pipe.length, filter = $.proxy((function(p) {
                        return this[p];
                    }), this._invalidated), cache = {};
                    while (i < n) {
                        if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) this._pipe[i].run(cache);
                        i++;
                    }
                    this._invalidated = {};
                    !this.is("valid") && this.enter("valid");
                };
                Owl.prototype.width = function(dimension) {
                    dimension = dimension || Owl.Width.Default;
                    switch (dimension) {
                      case Owl.Width.Inner:
                      case Owl.Width.Outer:
                        return this._width;

                      default:
                        return this._width - 2 * this.settings.stagePadding + this.settings.margin;
                    }
                };
                Owl.prototype.refresh = function() {
                    this.enter("refreshing");
                    this.trigger("refresh");
                    this.setup();
                    this.optionsLogic();
                    this.$element.addClass(this.options.refreshClass);
                    this.update();
                    this.$element.removeClass(this.options.refreshClass);
                    this.leave("refreshing");
                    this.trigger("refreshed");
                };
                Owl.prototype.onThrottledResize = function() {
                    window.clearTimeout(this.resizeTimer);
                    this.resizeTimer = window.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
                };
                Owl.prototype.onResize = function() {
                    if (!this._items.length) return false;
                    if (this._width === this.$element.width()) return false;
                    if (!this.isVisible()) return false;
                    this.enter("resizing");
                    if (this.trigger("resize").isDefaultPrevented()) {
                        this.leave("resizing");
                        return false;
                    }
                    this.invalidate("width");
                    this.refresh();
                    this.leave("resizing");
                    this.trigger("resized");
                };
                Owl.prototype.registerEventHandlers = function() {
                    if ($.support.transition) this.$stage.on($.support.transition.end + ".owl.core", $.proxy(this.onTransitionEnd, this));
                    if (false !== this.settings.responsive) this.on(window, "resize", this._handlers.onThrottledResize);
                    if (this.settings.mouseDrag) {
                        this.$element.addClass(this.options.dragClass);
                        this.$stage.on("mousedown.owl.core", $.proxy(this.onDragStart, this));
                        this.$stage.on("dragstart.owl.core selectstart.owl.core", (function() {
                            return false;
                        }));
                    }
                    if (this.settings.touchDrag) {
                        this.$stage.on("touchstart.owl.core", $.proxy(this.onDragStart, this));
                        this.$stage.on("touchcancel.owl.core", $.proxy(this.onDragEnd, this));
                    }
                };
                Owl.prototype.onDragStart = function(event) {
                    var stage = null;
                    if (3 === event.which) return;
                    if ($.support.transform) {
                        stage = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(",");
                        stage = {
                            x: stage[16 === stage.length ? 12 : 4],
                            y: stage[16 === stage.length ? 13 : 5]
                        };
                    } else {
                        stage = this.$stage.position();
                        stage = {
                            x: this.settings.rtl ? stage.left + this.$stage.width() - this.width() + this.settings.margin : stage.left,
                            y: stage.top
                        };
                    }
                    if (this.is("animating")) {
                        $.support.transform ? this.animate(stage.x) : this.$stage.stop();
                        this.invalidate("position");
                    }
                    this.$element.toggleClass(this.options.grabClass, "mousedown" === event.type);
                    this.speed(0);
                    this._drag.time = (new Date).getTime();
                    this._drag.target = $(event.target);
                    this._drag.stage.start = stage;
                    this._drag.stage.current = stage;
                    this._drag.pointer = this.pointer(event);
                    $(document).on("mouseup.owl.core touchend.owl.core", $.proxy(this.onDragEnd, this));
                    $(document).one("mousemove.owl.core touchmove.owl.core", $.proxy((function(event) {
                        var delta = this.difference(this._drag.pointer, this.pointer(event));
                        $(document).on("mousemove.owl.core touchmove.owl.core", $.proxy(this.onDragMove, this));
                        if (Math.abs(delta.x) < Math.abs(delta.y) && this.is("valid")) return;
                        event.preventDefault();
                        this.enter("dragging");
                        this.trigger("drag");
                    }), this));
                };
                Owl.prototype.onDragMove = function(event) {
                    var minimum = null, maximum = null, pull = null, delta = this.difference(this._drag.pointer, this.pointer(event)), stage = this.difference(this._drag.stage.start, delta);
                    if (!this.is("dragging")) return;
                    event.preventDefault();
                    if (this.settings.loop) {
                        minimum = this.coordinates(this.minimum());
                        maximum = this.coordinates(this.maximum() + 1) - minimum;
                        stage.x = ((stage.x - minimum) % maximum + maximum) % maximum + minimum;
                    } else {
                        minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
                        maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
                        pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
                        stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
                    }
                    this._drag.stage.current = stage;
                    this.animate(stage.x);
                };
                Owl.prototype.onDragEnd = function(event) {
                    var delta = this.difference(this._drag.pointer, this.pointer(event)), stage = this._drag.stage.current, direction = delta.x > 0 ^ this.settings.rtl ? "left" : "right";
                    $(document).off(".owl.core");
                    this.$element.removeClass(this.options.grabClass);
                    if (0 !== delta.x && this.is("dragging") || !this.is("valid")) {
                        this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
                        this.current(this.closest(stage.x, 0 !== delta.x ? direction : this._drag.direction));
                        this.invalidate("position");
                        this.update();
                        this._drag.direction = direction;
                        if (Math.abs(delta.x) > 3 || (new Date).getTime() - this._drag.time > 300) this._drag.target.one("click.owl.core", (function() {
                            return false;
                        }));
                    }
                    if (!this.is("dragging")) return;
                    this.leave("dragging");
                    this.trigger("dragged");
                };
                Owl.prototype.closest = function(coordinate, direction) {
                    var position = -1, pull = 30, width = this.width(), coordinates = this.coordinates();
                    if (!this.settings.freeDrag) $.each(coordinates, $.proxy((function(index, value) {
                        if ("left" === direction && coordinate > value - pull && coordinate < value + pull) position = index; else if ("right" === direction && coordinate > value - width - pull && coordinate < value - width + pull) position = index + 1; else if (this.op(coordinate, "<", value) && this.op(coordinate, ">", coordinates[index + 1] !== undefined ? coordinates[index + 1] : value - width)) position = "left" === direction ? index + 1 : index;
                        return -1 === position;
                    }), this));
                    if (!this.settings.loop) if (this.op(coordinate, ">", coordinates[this.minimum()])) position = coordinate = this.minimum(); else if (this.op(coordinate, "<", coordinates[this.maximum()])) position = coordinate = this.maximum();
                    return position;
                };
                Owl.prototype.animate = function(coordinate) {
                    var animate = this.speed() > 0;
                    this.is("animating") && this.onTransitionEnd();
                    if (animate) {
                        this.enter("animating");
                        this.trigger("translate");
                    }
                    if ($.support.transform3d && $.support.transition) this.$stage.css({
                        transform: "translate3d(" + coordinate + "px,0px,0px)",
                        transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
                    }); else if (animate) this.$stage.animate({
                        left: coordinate + "px"
                    }, this.speed(), this.settings.fallbackEasing, $.proxy(this.onTransitionEnd, this)); else this.$stage.css({
                        left: coordinate + "px"
                    });
                };
                Owl.prototype.is = function(state) {
                    return this._states.current[state] && this._states.current[state] > 0;
                };
                Owl.prototype.current = function(position) {
                    if (position === undefined) return this._current;
                    if (0 === this._items.length) return undefined;
                    position = this.normalize(position);
                    if (this._current !== position) {
                        var event = this.trigger("change", {
                            property: {
                                name: "position",
                                value: position
                            }
                        });
                        if (event.data !== undefined) position = this.normalize(event.data);
                        this._current = position;
                        this.invalidate("position");
                        this.trigger("changed", {
                            property: {
                                name: "position",
                                value: this._current
                            }
                        });
                    }
                    return this._current;
                };
                Owl.prototype.invalidate = function(part) {
                    if ("string" === $.type(part)) {
                        this._invalidated[part] = true;
                        this.is("valid") && this.leave("valid");
                    }
                    return $.map(this._invalidated, (function(v, i) {
                        return i;
                    }));
                };
                Owl.prototype.reset = function(position) {
                    position = this.normalize(position);
                    if (position === undefined) return;
                    this._speed = 0;
                    this._current = position;
                    this.suppress([ "translate", "translated" ]);
                    this.animate(this.coordinates(position));
                    this.release([ "translate", "translated" ]);
                };
                Owl.prototype.normalize = function(position, relative) {
                    var n = this._items.length, m = relative ? 0 : this._clones.length;
                    if (!this.isNumeric(position) || n < 1) position = undefined; else if (position < 0 || position >= n + m) position = ((position - m / 2) % n + n) % n + m / 2;
                    return position;
                };
                Owl.prototype.relative = function(position) {
                    position -= this._clones.length / 2;
                    return this.normalize(position, true);
                };
                Owl.prototype.maximum = function(relative) {
                    var iterator, reciprocalItemsWidth, elementWidth, settings = this.settings, maximum = this._coordinates.length;
                    if (settings.loop) maximum = this._clones.length / 2 + this._items.length - 1; else if (settings.autoWidth || settings.merge) {
                        iterator = this._items.length;
                        if (iterator) {
                            reciprocalItemsWidth = this._items[--iterator].width();
                            elementWidth = this.$element.width();
                            while (iterator--) {
                                reciprocalItemsWidth += this._items[iterator].width() + this.settings.margin;
                                if (reciprocalItemsWidth > elementWidth) break;
                            }
                        }
                        maximum = iterator + 1;
                    } else if (settings.center) maximum = this._items.length - 1; else maximum = this._items.length - settings.items;
                    if (relative) maximum -= this._clones.length / 2;
                    return Math.max(maximum, 0);
                };
                Owl.prototype.minimum = function(relative) {
                    return relative ? 0 : this._clones.length / 2;
                };
                Owl.prototype.items = function(position) {
                    if (position === undefined) return this._items.slice();
                    position = this.normalize(position, true);
                    return this._items[position];
                };
                Owl.prototype.mergers = function(position) {
                    if (position === undefined) return this._mergers.slice();
                    position = this.normalize(position, true);
                    return this._mergers[position];
                };
                Owl.prototype.clones = function(position) {
                    var odd = this._clones.length / 2, even = odd + this._items.length, map = function(index) {
                        return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2;
                    };
                    if (position === undefined) return $.map(this._clones, (function(v, i) {
                        return map(i);
                    }));
                    return $.map(this._clones, (function(v, i) {
                        return v === position ? map(i) : null;
                    }));
                };
                Owl.prototype.speed = function(speed) {
                    if (speed !== undefined) this._speed = speed;
                    return this._speed;
                };
                Owl.prototype.coordinates = function(position) {
                    var coordinate, multiplier = 1, newPosition = position - 1;
                    if (position === undefined) return $.map(this._coordinates, $.proxy((function(coordinate, index) {
                        return this.coordinates(index);
                    }), this));
                    if (this.settings.center) {
                        if (this.settings.rtl) {
                            multiplier = -1;
                            newPosition = position + 1;
                        }
                        coordinate = this._coordinates[position];
                        coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
                    } else coordinate = this._coordinates[newPosition] || 0;
                    coordinate = Math.ceil(coordinate);
                    return coordinate;
                };
                Owl.prototype.duration = function(from, to, factor) {
                    if (0 === factor) return 0;
                    return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs(factor || this.settings.smartSpeed);
                };
                Owl.prototype.to = function(position, speed) {
                    var current = this.current(), revert = null, distance = position - this.relative(current), direction = (distance > 0) - (distance < 0), items = this._items.length, minimum = this.minimum(), maximum = this.maximum();
                    if (this.settings.loop) {
                        if (!this.settings.rewind && Math.abs(distance) > items / 2) distance += -1 * direction * items;
                        position = current + distance;
                        revert = ((position - minimum) % items + items) % items + minimum;
                        if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
                            current = revert - distance;
                            position = revert;
                            this.reset(current);
                        }
                    } else if (this.settings.rewind) {
                        maximum += 1;
                        position = (position % maximum + maximum) % maximum;
                    } else position = Math.max(minimum, Math.min(maximum, position));
                    this.speed(this.duration(current, position, speed));
                    this.current(position);
                    if (this.isVisible()) this.update();
                };
                Owl.prototype.next = function(speed) {
                    speed = speed || false;
                    this.to(this.relative(this.current()) + 1, speed);
                };
                Owl.prototype.prev = function(speed) {
                    speed = speed || false;
                    this.to(this.relative(this.current()) - 1, speed);
                };
                Owl.prototype.onTransitionEnd = function(event) {
                    if (event !== undefined) {
                        event.stopPropagation();
                        if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) return false;
                    }
                    this.leave("animating");
                    this.trigger("translated");
                };
                Owl.prototype.viewport = function() {
                    var width;
                    if (this.options.responsiveBaseElement !== window) width = $(this.options.responsiveBaseElement).width(); else if (window.innerWidth) width = window.innerWidth; else if (document.documentElement && document.documentElement.clientWidth) width = document.documentElement.clientWidth; else console.warn("Can not detect viewport width.");
                    return width;
                };
                Owl.prototype.replace = function(content) {
                    this.$stage.empty();
                    this._items = [];
                    if (content) content = content instanceof jQuery ? content : $(content);
                    if (this.settings.nestedItemSelector) content = content.find("." + this.settings.nestedItemSelector);
                    content.filter((function() {
                        return 1 === this.nodeType;
                    })).each($.proxy((function(index, item) {
                        item = this.prepare(item);
                        this.$stage.append(item);
                        this._items.push(item);
                        this._mergers.push(1 * item.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
                    }), this));
                    this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);
                    this.invalidate("items");
                };
                Owl.prototype.add = function(content, position) {
                    var current = this.relative(this._current);
                    position = position === undefined ? this._items.length : this.normalize(position, true);
                    content = content instanceof jQuery ? content : $(content);
                    this.trigger("add", {
                        content,
                        position
                    });
                    content = this.prepare(content);
                    if (0 === this._items.length || position === this._items.length) {
                        0 === this._items.length && this.$stage.append(content);
                        0 !== this._items.length && this._items[position - 1].after(content);
                        this._items.push(content);
                        this._mergers.push(1 * content.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
                    } else {
                        this._items[position].before(content);
                        this._items.splice(position, 0, content);
                        this._mergers.splice(position, 0, 1 * content.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
                    }
                    this._items[current] && this.reset(this._items[current].index());
                    this.invalidate("items");
                    this.trigger("added", {
                        content,
                        position
                    });
                };
                Owl.prototype.remove = function(position) {
                    position = this.normalize(position, true);
                    if (position === undefined) return;
                    this.trigger("remove", {
                        content: this._items[position],
                        position
                    });
                    this._items[position].remove();
                    this._items.splice(position, 1);
                    this._mergers.splice(position, 1);
                    this.invalidate("items");
                    this.trigger("removed", {
                        content: null,
                        position
                    });
                };
                Owl.prototype.preloadAutoWidthImages = function(images) {
                    images.each($.proxy((function(i, element) {
                        this.enter("pre-loading");
                        element = $(element);
                        $(new Image).one("load", $.proxy((function(e) {
                            element.attr("src", e.target.src);
                            element.css("opacity", 1);
                            this.leave("pre-loading");
                            !this.is("pre-loading") && !this.is("initializing") && this.refresh();
                        }), this)).attr("src", element.attr("src") || element.attr("data-src") || element.attr("data-src-retina"));
                    }), this));
                };
                Owl.prototype.destroy = function() {
                    this.$element.off(".owl.core");
                    this.$stage.off(".owl.core");
                    $(document).off(".owl.core");
                    if (false !== this.settings.responsive) {
                        window.clearTimeout(this.resizeTimer);
                        this.off(window, "resize", this._handlers.onThrottledResize);
                    }
                    for (var i in this._plugins) this._plugins[i].destroy();
                    this.$stage.children(".cloned").remove();
                    this.$stage.unwrap();
                    this.$stage.children().contents().unwrap();
                    this.$stage.children().unwrap();
                    this.$stage.remove();
                    this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel");
                };
                Owl.prototype.op = function(a, o, b) {
                    var rtl = this.settings.rtl;
                    switch (o) {
                      case "<":
                        return rtl ? a > b : a < b;

                      case ">":
                        return rtl ? a < b : a > b;

                      case ">=":
                        return rtl ? a <= b : a >= b;

                      case "<=":
                        return rtl ? a >= b : a <= b;

                      default:
                        break;
                    }
                };
                Owl.prototype.on = function(element, event, listener, capture) {
                    if (element.addEventListener) element.addEventListener(event, listener, capture); else if (element.attachEvent) element.attachEvent("on" + event, listener);
                };
                Owl.prototype.off = function(element, event, listener, capture) {
                    if (element.removeEventListener) element.removeEventListener(event, listener, capture); else if (element.detachEvent) element.detachEvent("on" + event, listener);
                };
                Owl.prototype.trigger = function(name, data, namespace, state, enter) {
                    var status = {
                        item: {
                            count: this._items.length,
                            index: this.current()
                        }
                    }, handler = $.camelCase($.grep([ "on", name, namespace ], (function(v) {
                        return v;
                    })).join("-").toLowerCase()), event = $.Event([ name, "owl", namespace || "carousel" ].join(".").toLowerCase(), $.extend({
                        relatedTarget: this
                    }, status, data));
                    if (!this._supress[name]) {
                        $.each(this._plugins, (function(name, plugin) {
                            if (plugin.onTrigger) plugin.onTrigger(event);
                        }));
                        this.register({
                            type: Owl.Type.Event,
                            name
                        });
                        this.$element.trigger(event);
                        if (this.settings && "function" === typeof this.settings[handler]) this.settings[handler].call(this, event);
                    }
                    return event;
                };
                Owl.prototype.enter = function(name) {
                    $.each([ name ].concat(this._states.tags[name] || []), $.proxy((function(i, name) {
                        if (this._states.current[name] === undefined) this._states.current[name] = 0;
                        this._states.current[name]++;
                    }), this));
                };
                Owl.prototype.leave = function(name) {
                    $.each([ name ].concat(this._states.tags[name] || []), $.proxy((function(i, name) {
                        this._states.current[name]--;
                    }), this));
                };
                Owl.prototype.register = function(object) {
                    if (object.type === Owl.Type.Event) {
                        if (!$.event.special[object.name]) $.event.special[object.name] = {};
                        if (!$.event.special[object.name].owl) {
                            var _default = $.event.special[object.name]._default;
                            $.event.special[object.name]._default = function(e) {
                                if (_default && _default.apply && (!e.namespace || -1 === e.namespace.indexOf("owl"))) return _default.apply(this, arguments);
                                return e.namespace && e.namespace.indexOf("owl") > -1;
                            };
                            $.event.special[object.name].owl = true;
                        }
                    } else if (object.type === Owl.Type.State) {
                        if (!this._states.tags[object.name]) this._states.tags[object.name] = object.tags; else this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
                        this._states.tags[object.name] = $.grep(this._states.tags[object.name], $.proxy((function(tag, i) {
                            return $.inArray(tag, this._states.tags[object.name]) === i;
                        }), this));
                    }
                };
                Owl.prototype.suppress = function(events) {
                    $.each(events, $.proxy((function(index, event) {
                        this._supress[event] = true;
                    }), this));
                };
                Owl.prototype.release = function(events) {
                    $.each(events, $.proxy((function(index, event) {
                        delete this._supress[event];
                    }), this));
                };
                Owl.prototype.pointer = function(event) {
                    var result = {
                        x: null,
                        y: null
                    };
                    event = event.originalEvent || event || window.event;
                    event = event.touches && event.touches.length ? event.touches[0] : event.changedTouches && event.changedTouches.length ? event.changedTouches[0] : event;
                    if (event.pageX) {
                        result.x = event.pageX;
                        result.y = event.pageY;
                    } else {
                        result.x = event.clientX;
                        result.y = event.clientY;
                    }
                    return result;
                };
                Owl.prototype.isNumeric = function(number) {
                    return !isNaN(parseFloat(number));
                };
                Owl.prototype.difference = function(first, second) {
                    return {
                        x: first.x - second.x,
                        y: first.y - second.y
                    };
                };
                $.fn.owlCarousel = function(option) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    return this.each((function() {
                        var $this = $(this), data = $this.data("owl.carousel");
                        if (!data) {
                            data = new Owl(this, "object" == typeof option && option);
                            $this.data("owl.carousel", data);
                            $.each([ "next", "prev", "to", "destroy", "refresh", "replace", "add", "remove" ], (function(i, event) {
                                data.register({
                                    type: Owl.Type.Event,
                                    name: event
                                });
                                data.$element.on(event + ".owl.carousel.core", $.proxy((function(e) {
                                    if (e.namespace && e.relatedTarget !== this) {
                                        this.suppress([ event ]);
                                        data[event].apply(this, [].slice.call(arguments, 1));
                                        this.release([ event ]);
                                    }
                                }), data));
                            }));
                        }
                        if ("string" == typeof option && "_" !== option.charAt(0)) data[option].apply(data, args);
                    }));
                };
                $.fn.owlCarousel.Constructor = Owl;
            })(window.Zepto || window.jQuery, window, document);
            /**
 * AutoRefresh Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */            (function($, window, document, undefined) {
                var AutoRefresh = function(carousel) {
                    this._core = carousel;
                    this._interval = null;
                    this._visible = null;
                    this._handlers = {
                        "initialized.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && this._core.settings.autoRefresh) this.watch();
                        }), this)
                    };
                    this._core.options = $.extend({}, AutoRefresh.Defaults, this._core.options);
                    this._core.$element.on(this._handlers);
                };
                AutoRefresh.Defaults = {
                    autoRefresh: true,
                    autoRefreshInterval: 500
                };
                AutoRefresh.prototype.watch = function() {
                    if (this._interval) return;
                    this._visible = this._core.isVisible();
                    this._interval = window.setInterval($.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
                };
                AutoRefresh.prototype.refresh = function() {
                    if (this._core.isVisible() === this._visible) return;
                    this._visible = !this._visible;
                    this._core.$element.toggleClass("owl-hidden", !this._visible);
                    this._visible && this._core.invalidate("width") && this._core.refresh();
                };
                AutoRefresh.prototype.destroy = function() {
                    var handler, property;
                    window.clearInterval(this._interval);
                    for (handler in this._handlers) this._core.$element.off(handler, this._handlers[handler]);
                    for (property in Object.getOwnPropertyNames(this)) "function" != typeof this[property] && (this[property] = null);
                };
                $.fn.owlCarousel.Constructor.Plugins.AutoRefresh = AutoRefresh;
            })(window.Zepto || window.jQuery, window, document);
            /**
 * Lazy Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */            (function($, window, document, undefined) {
                var Lazy = function(carousel) {
                    this._core = carousel;
                    this._loaded = [];
                    this._handlers = {
                        "initialized.owl.carousel change.owl.carousel resized.owl.carousel": $.proxy((function(e) {
                            if (!e.namespace) return;
                            if (!this._core.settings || !this._core.settings.lazyLoad) return;
                            if (e.property && "position" == e.property.name || "initialized" == e.type) {
                                var settings = this._core.settings, n = settings.center && Math.ceil(settings.items / 2) || settings.items, i = settings.center && -1 * n || 0, position = (e.property && e.property.value !== undefined ? e.property.value : this._core.current()) + i, clones = this._core.clones().length, load = $.proxy((function(i, v) {
                                    this.load(v);
                                }), this);
                                if (settings.lazyLoadEager > 0) {
                                    n += settings.lazyLoadEager;
                                    if (settings.loop) {
                                        position -= settings.lazyLoadEager;
                                        n++;
                                    }
                                }
                                while (i++ < n) {
                                    this.load(clones / 2 + this._core.relative(position));
                                    clones && $.each(this._core.clones(this._core.relative(position)), load);
                                    position++;
                                }
                            }
                        }), this)
                    };
                    this._core.options = $.extend({}, Lazy.Defaults, this._core.options);
                    this._core.$element.on(this._handlers);
                };
                Lazy.Defaults = {
                    lazyLoad: false,
                    lazyLoadEager: 0
                };
                Lazy.prototype.load = function(position) {
                    var $item = this._core.$stage.children().eq(position), $elements = $item && $item.find(".owl-lazy");
                    if (!$elements || $.inArray($item.get(0), this._loaded) > -1) return;
                    $elements.each($.proxy((function(index, element) {
                        var image, $element = $(element), url = window.devicePixelRatio > 1 && $element.attr("data-src-retina") || $element.attr("data-src") || $element.attr("data-srcset");
                        this._core.trigger("load", {
                            element: $element,
                            url
                        }, "lazy");
                        if ($element.is("img")) $element.one("load.owl.lazy", $.proxy((function() {
                            $element.css("opacity", 1);
                            this._core.trigger("loaded", {
                                element: $element,
                                url
                            }, "lazy");
                        }), this)).attr("src", url); else if ($element.is("source")) $element.one("load.owl.lazy", $.proxy((function() {
                            this._core.trigger("loaded", {
                                element: $element,
                                url
                            }, "lazy");
                        }), this)).attr("srcset", url); else {
                            image = new Image;
                            image.onload = $.proxy((function() {
                                $element.css({
                                    "background-image": 'url("' + url + '")',
                                    opacity: "1"
                                });
                                this._core.trigger("loaded", {
                                    element: $element,
                                    url
                                }, "lazy");
                            }), this);
                            image.src = url;
                        }
                    }), this));
                    this._loaded.push($item.get(0));
                };
                Lazy.prototype.destroy = function() {
                    var handler, property;
                    for (handler in this.handlers) this._core.$element.off(handler, this.handlers[handler]);
                    for (property in Object.getOwnPropertyNames(this)) "function" != typeof this[property] && (this[property] = null);
                };
                $.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;
            })(window.Zepto || window.jQuery, window, document);
            /**
 * AutoHeight Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */            (function($, window, document, undefined) {
                var AutoHeight = function(carousel) {
                    this._core = carousel;
                    this._previousHeight = null;
                    this._handlers = {
                        "initialized.owl.carousel refreshed.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && this._core.settings.autoHeight) this.update();
                        }), this),
                        "changed.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && this._core.settings.autoHeight && "position" === e.property.name) this.update();
                        }), this),
                        "loaded.owl.lazy": $.proxy((function(e) {
                            if (e.namespace && this._core.settings.autoHeight && e.element.closest("." + this._core.settings.itemClass).index() === this._core.current()) this.update();
                        }), this)
                    };
                    this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);
                    this._core.$element.on(this._handlers);
                    this._intervalId = null;
                    var refThis = this;
                    $(window).on("load", (function() {
                        if (refThis._core.settings.autoHeight) refThis.update();
                    }));
                    $(window).resize((function() {
                        if (refThis._core.settings.autoHeight) {
                            if (null != refThis._intervalId) clearTimeout(refThis._intervalId);
                            refThis._intervalId = setTimeout((function() {
                                refThis.update();
                            }), 250);
                        }
                    }));
                };
                AutoHeight.Defaults = {
                    autoHeight: false,
                    autoHeightClass: "owl-height"
                };
                AutoHeight.prototype.update = function() {
                    var start = this._core._current, end = start + this._core.settings.items, lazyLoadEnabled = this._core.settings.lazyLoad, visible = this._core.$stage.children().toArray().slice(start, end), heights = [], maxheight = 0;
                    $.each(visible, (function(index, item) {
                        heights.push($(item).height());
                    }));
                    maxheight = Math.max.apply(null, heights);
                    if (maxheight <= 1 && lazyLoadEnabled && this._previousHeight) maxheight = this._previousHeight;
                    this._previousHeight = maxheight;
                    this._core.$stage.parent().height(maxheight).addClass(this._core.settings.autoHeightClass);
                };
                AutoHeight.prototype.destroy = function() {
                    var handler, property;
                    for (handler in this._handlers) this._core.$element.off(handler, this._handlers[handler]);
                    for (property in Object.getOwnPropertyNames(this)) "function" !== typeof this[property] && (this[property] = null);
                };
                $.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;
            })(window.Zepto || window.jQuery, window, document);
            /**
 * Video Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */            (function($, window, document, undefined) {
                var Video = function(carousel) {
                    this._core = carousel;
                    this._videos = {};
                    this._playing = null;
                    this._handlers = {
                        "initialized.owl.carousel": $.proxy((function(e) {
                            if (e.namespace) this._core.register({
                                type: "state",
                                name: "playing",
                                tags: [ "interacting" ]
                            });
                        }), this),
                        "resize.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && this._core.settings.video && this.isInFullScreen()) e.preventDefault();
                        }), this),
                        "refreshed.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && this._core.is("resizing")) this._core.$stage.find(".cloned .owl-video-frame").remove();
                        }), this),
                        "changed.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && "position" === e.property.name && this._playing) this.stop();
                        }), this),
                        "prepared.owl.carousel": $.proxy((function(e) {
                            if (!e.namespace) return;
                            var $element = $(e.content).find(".owl-video");
                            if ($element.length) {
                                $element.css("display", "none");
                                this.fetch($element, $(e.content));
                            }
                        }), this)
                    };
                    this._core.options = $.extend({}, Video.Defaults, this._core.options);
                    this._core.$element.on(this._handlers);
                    this._core.$element.on("click.owl.video", ".owl-video-play-icon", $.proxy((function(e) {
                        this.play(e);
                    }), this));
                };
                Video.Defaults = {
                    video: false,
                    videoHeight: false,
                    videoWidth: false
                };
                Video.prototype.fetch = function(target, item) {
                    var type = function() {
                        if (target.attr("data-vimeo-id")) return "vimeo"; else if (target.attr("data-vzaar-id")) return "vzaar"; else return "youtube";
                    }(), id = target.attr("data-vimeo-id") || target.attr("data-youtube-id") || target.attr("data-vzaar-id"), width = target.attr("data-width") || this._core.settings.videoWidth, height = target.attr("data-height") || this._core.settings.videoHeight, url = target.attr("href");
                    if (url) {
                        id = url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
                        if (id[3].indexOf("youtu") > -1) type = "youtube"; else if (id[3].indexOf("vimeo") > -1) type = "vimeo"; else if (id[3].indexOf("vzaar") > -1) type = "vzaar"; else throw new Error("Video URL not supported.");
                        id = id[6];
                    } else throw new Error("Missing video URL.");
                    this._videos[url] = {
                        type,
                        id,
                        width,
                        height
                    };
                    item.attr("data-video", url);
                    this.thumbnail(target, this._videos[url]);
                };
                Video.prototype.thumbnail = function(target, video) {
                    var tnLink, icon, path, dimensions = video.width && video.height ? "width:" + video.width + "px;height:" + video.height + "px;" : "", customTn = target.find("img"), srcType = "src", lazyClass = "", settings = this._core.settings, create = function(path) {
                        icon = '<div class="owl-video-play-icon"></div>';
                        if (settings.lazyLoad) tnLink = $("<div/>", {
                            class: "owl-video-tn " + lazyClass,
                            srcType: path
                        }); else tnLink = $("<div/>", {
                            class: "owl-video-tn",
                            style: "opacity:1;background-image:url(" + path + ")"
                        });
                        target.after(tnLink);
                        target.after(icon);
                    };
                    target.wrap($("<div/>", {
                        class: "owl-video-wrapper",
                        style: dimensions
                    }));
                    if (this._core.settings.lazyLoad) {
                        srcType = "data-src";
                        lazyClass = "owl-lazy";
                    }
                    if (customTn.length) {
                        create(customTn.attr(srcType));
                        customTn.remove();
                        return false;
                    }
                    if ("youtube" === video.type) {
                        path = "//img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
                        create(path);
                    } else if ("vimeo" === video.type) $.ajax({
                        type: "GET",
                        url: "//vimeo.com/api/v2/video/" + video.id + ".json",
                        jsonp: "callback",
                        dataType: "jsonp",
                        success: function(data) {
                            path = data[0].thumbnail_large;
                            create(path);
                        }
                    }); else if ("vzaar" === video.type) $.ajax({
                        type: "GET",
                        url: "//vzaar.com/api/videos/" + video.id + ".json",
                        jsonp: "callback",
                        dataType: "jsonp",
                        success: function(data) {
                            path = data.framegrab_url;
                            create(path);
                        }
                    });
                };
                Video.prototype.stop = function() {
                    this._core.trigger("stop", null, "video");
                    this._playing.find(".owl-video-frame").remove();
                    this._playing.removeClass("owl-video-playing");
                    this._playing = null;
                    this._core.leave("playing");
                    this._core.trigger("stopped", null, "video");
                };
                Video.prototype.play = function(event) {
                    var html, target = $(event.target), item = target.closest("." + this._core.settings.itemClass), video = this._videos[item.attr("data-video")], width = video.width || "100%", height = video.height || this._core.$stage.height();
                    if (this._playing) return;
                    this._core.enter("playing");
                    this._core.trigger("play", null, "video");
                    item = this._core.items(this._core.relative(item.index()));
                    this._core.reset(item.index());
                    html = $('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>');
                    html.attr("height", height);
                    html.attr("width", width);
                    if ("youtube" === video.type) html.attr("src", "//www.youtube.com/embed/" + video.id + "?autoplay=1&rel=0&v=" + video.id); else if ("vimeo" === video.type) html.attr("src", "//player.vimeo.com/video/" + video.id + "?autoplay=1"); else if ("vzaar" === video.type) html.attr("src", "//view.vzaar.com/" + video.id + "/player?autoplay=true");
                    $(html).wrap('<div class="owl-video-frame" />').insertAfter(item.find(".owl-video"));
                    this._playing = item.addClass("owl-video-playing");
                };
                Video.prototype.isInFullScreen = function() {
                    var element = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
                    return element && $(element).parent().hasClass("owl-video-frame");
                };
                Video.prototype.destroy = function() {
                    var handler, property;
                    this._core.$element.off("click.owl.video");
                    for (handler in this._handlers) this._core.$element.off(handler, this._handlers[handler]);
                    for (property in Object.getOwnPropertyNames(this)) "function" != typeof this[property] && (this[property] = null);
                };
                $.fn.owlCarousel.Constructor.Plugins.Video = Video;
            })(window.Zepto || window.jQuery, window, document);
            /**
 * Animate Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */            (function($, window, document, undefined) {
                var Animate = function(scope) {
                    this.core = scope;
                    this.core.options = $.extend({}, Animate.Defaults, this.core.options);
                    this.swapping = true;
                    this.previous = undefined;
                    this.next = undefined;
                    this.handlers = {
                        "change.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && "position" == e.property.name) {
                                this.previous = this.core.current();
                                this.next = e.property.value;
                            }
                        }), this),
                        "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": $.proxy((function(e) {
                            if (e.namespace) this.swapping = "translated" == e.type;
                        }), this),
                        "translate.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) this.swap();
                        }), this)
                    };
                    this.core.$element.on(this.handlers);
                };
                Animate.Defaults = {
                    animateOut: false,
                    animateIn: false
                };
                Animate.prototype.swap = function() {
                    if (1 !== this.core.settings.items) return;
                    if (!$.support.animation || !$.support.transition) return;
                    this.core.speed(0);
                    var left, clear = $.proxy(this.clear, this), previous = this.core.$stage.children().eq(this.previous), next = this.core.$stage.children().eq(this.next), incoming = this.core.settings.animateIn, outgoing = this.core.settings.animateOut;
                    if (this.core.current() === this.previous) return;
                    if (outgoing) {
                        left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
                        previous.one($.support.animation.end, clear).css({
                            left: left + "px"
                        }).addClass("animated owl-animated-out").addClass(outgoing);
                    }
                    if (incoming) next.one($.support.animation.end, clear).addClass("animated owl-animated-in").addClass(incoming);
                };
                Animate.prototype.clear = function(e) {
                    $(e.target).css({
                        left: ""
                    }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut);
                    this.core.onTransitionEnd();
                };
                Animate.prototype.destroy = function() {
                    var handler, property;
                    for (handler in this.handlers) this.core.$element.off(handler, this.handlers[handler]);
                    for (property in Object.getOwnPropertyNames(this)) "function" != typeof this[property] && (this[property] = null);
                };
                $.fn.owlCarousel.Constructor.Plugins.Animate = Animate;
            })(window.Zepto || window.jQuery, window, document);
            /**
 * Autoplay Plugin
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author Artus Kolanowski
 * @author David Deutsch
 * @author Tom De Caluwé
 * @license The MIT License (MIT)
 */            (function($, window, document, undefined) {
                var Autoplay = function(carousel) {
                    this._core = carousel;
                    this._call = null;
                    this._time = 0;
                    this._timeout = 0;
                    this._paused = true;
                    this._handlers = {
                        "changed.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && "settings" === e.property.name) if (this._core.settings.autoplay) this.play(); else this.stop(); else if (e.namespace && "position" === e.property.name && this._paused) this._time = 0;
                        }), this),
                        "initialized.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && this._core.settings.autoplay) this.play();
                        }), this),
                        "play.owl.autoplay": $.proxy((function(e, t, s) {
                            if (e.namespace) this.play(t, s);
                        }), this),
                        "stop.owl.autoplay": $.proxy((function(e) {
                            if (e.namespace) this.stop();
                        }), this),
                        "mouseover.owl.autoplay": $.proxy((function() {
                            if (this._core.settings.autoplayHoverPause && this._core.is("rotating")) this.pause();
                        }), this),
                        "mouseleave.owl.autoplay": $.proxy((function() {
                            if (this._core.settings.autoplayHoverPause && this._core.is("rotating")) this.play();
                        }), this),
                        "touchstart.owl.core": $.proxy((function() {
                            if (this._core.settings.autoplayHoverPause && this._core.is("rotating")) this.pause();
                        }), this),
                        "touchend.owl.core": $.proxy((function() {
                            if (this._core.settings.autoplayHoverPause) this.play();
                        }), this)
                    };
                    this._core.$element.on(this._handlers);
                    this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
                };
                Autoplay.Defaults = {
                    autoplay: false,
                    autoplayTimeout: 5e3,
                    autoplayHoverPause: false,
                    autoplaySpeed: false
                };
                Autoplay.prototype._next = function(speed) {
                    this._call = window.setTimeout($.proxy(this._next, this, speed), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read());
                    if (this._core.is("interacting") || document.hidden) return;
                    this._core.next(speed || this._core.settings.autoplaySpeed);
                };
                Autoplay.prototype.read = function() {
                    return (new Date).getTime() - this._time;
                };
                Autoplay.prototype.play = function(timeout, speed) {
                    var elapsed;
                    if (!this._core.is("rotating")) this._core.enter("rotating");
                    timeout = timeout || this._core.settings.autoplayTimeout;
                    elapsed = Math.min(this._time % (this._timeout || timeout), timeout);
                    if (this._paused) {
                        this._time = this.read();
                        this._paused = false;
                    } else window.clearTimeout(this._call);
                    this._time += this.read() % timeout - elapsed;
                    this._timeout = timeout;
                    this._call = window.setTimeout($.proxy(this._next, this, speed), timeout - elapsed);
                };
                Autoplay.prototype.stop = function() {
                    if (this._core.is("rotating")) {
                        this._time = 0;
                        this._paused = true;
                        window.clearTimeout(this._call);
                        this._core.leave("rotating");
                    }
                };
                Autoplay.prototype.pause = function() {
                    if (this._core.is("rotating") && !this._paused) {
                        this._time = this.read();
                        this._paused = true;
                        window.clearTimeout(this._call);
                    }
                };
                Autoplay.prototype.destroy = function() {
                    var handler, property;
                    this.stop();
                    for (handler in this._handlers) this._core.$element.off(handler, this._handlers[handler]);
                    for (property in Object.getOwnPropertyNames(this)) "function" != typeof this[property] && (this[property] = null);
                };
                $.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;
            })(window.Zepto || window.jQuery, window, document);
            /**
 * Navigation Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */            (function($, window, document, undefined) {
                "use strict";
                var Navigation = function(carousel) {
                    this._core = carousel;
                    this._initialized = false;
                    this._pages = [];
                    this._controls = {};
                    this._templates = [];
                    this.$element = this._core.$element;
                    this._overrides = {
                        next: this._core.next,
                        prev: this._core.prev,
                        to: this._core.to
                    };
                    this._handlers = {
                        "prepared.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && this._core.settings.dotsData) this._templates.push('<div class="' + this._core.settings.dotClass + '">' + $(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
                        }), this),
                        "added.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && this._core.settings.dotsData) this._templates.splice(e.position, 0, this._templates.pop());
                        }), this),
                        "remove.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && this._core.settings.dotsData) this._templates.splice(e.position, 1);
                        }), this),
                        "changed.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && "position" == e.property.name) this.draw();
                        }), this),
                        "initialized.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && !this._initialized) {
                                this._core.trigger("initialize", null, "navigation");
                                this.initialize();
                                this.update();
                                this.draw();
                                this._initialized = true;
                                this._core.trigger("initialized", null, "navigation");
                            }
                        }), this),
                        "refreshed.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && this._initialized) {
                                this._core.trigger("refresh", null, "navigation");
                                this.update();
                                this.draw();
                                this._core.trigger("refreshed", null, "navigation");
                            }
                        }), this)
                    };
                    this._core.options = $.extend({}, Navigation.Defaults, this._core.options);
                    this.$element.on(this._handlers);
                };
                Navigation.Defaults = {
                    nav: false,
                    navText: [ '<span aria-label="' + "Previous" + '">&#x2039;</span>', '<span aria-label="' + "Next" + '">&#x203a;</span>' ],
                    navSpeed: false,
                    navElement: 'button type="button" role="presentation"',
                    navContainer: false,
                    navContainerClass: "owl-nav",
                    navClass: [ "owl-prev", "owl-next" ],
                    slideBy: 1,
                    dotClass: "owl-dot",
                    dotsClass: "owl-dots",
                    dots: true,
                    dotsEach: false,
                    dotsData: false,
                    dotsSpeed: false,
                    dotsContainer: false
                };
                Navigation.prototype.initialize = function() {
                    var override, settings = this._core.settings;
                    this._controls.$relative = (settings.navContainer ? $(settings.navContainer) : $("<div>").addClass(settings.navContainerClass).appendTo(this.$element)).addClass("disabled");
                    this._controls.$previous = $("<" + settings.navElement + ">").addClass(settings.navClass[0]).html(settings.navText[0]).prependTo(this._controls.$relative).on("click", $.proxy((function(e) {
                        this.prev(settings.navSpeed);
                    }), this));
                    this._controls.$next = $("<" + settings.navElement + ">").addClass(settings.navClass[1]).html(settings.navText[1]).appendTo(this._controls.$relative).on("click", $.proxy((function(e) {
                        this.next(settings.navSpeed);
                    }), this));
                    if (!settings.dotsData) this._templates = [ $('<button role="button">').addClass(settings.dotClass).append($("<span>")).prop("outerHTML") ];
                    this._controls.$absolute = (settings.dotsContainer ? $(settings.dotsContainer) : $("<div>").addClass(settings.dotsClass).appendTo(this.$element)).addClass("disabled");
                    this._controls.$absolute.on("click", "button", $.proxy((function(e) {
                        var index = $(e.target).parent().is(this._controls.$absolute) ? $(e.target).index() : $(e.target).parent().index();
                        e.preventDefault();
                        this.to(index, settings.dotsSpeed);
                    }), this));
                    for (override in this._overrides) this._core[override] = $.proxy(this[override], this);
                };
                Navigation.prototype.destroy = function() {
                    var handler, control, property, override, settings;
                    settings = this._core.settings;
                    for (handler in this._handlers) this.$element.off(handler, this._handlers[handler]);
                    for (control in this._controls) if ("$relative" === control && settings.navContainer) this._controls[control].html(""); else this._controls[control].remove();
                    for (override in this.overides) this._core[override] = this._overrides[override];
                    for (property in Object.getOwnPropertyNames(this)) "function" != typeof this[property] && (this[property] = null);
                };
                Navigation.prototype.update = function() {
                    var i, j, k, lower = this._core.clones().length / 2, upper = lower + this._core.items().length, maximum = this._core.maximum(true), settings = this._core.settings, size = settings.center || settings.autoWidth || settings.dotsData ? 1 : settings.dotsEach || settings.items;
                    if ("page" !== settings.slideBy) settings.slideBy = Math.min(settings.slideBy, settings.items);
                    if (settings.dots || "page" == settings.slideBy) {
                        this._pages = [];
                        for (i = lower, j = 0, k = 0; i < upper; i++) {
                            if (j >= size || 0 === j) {
                                this._pages.push({
                                    start: Math.min(maximum, i - lower),
                                    end: i - lower + size - 1
                                });
                                if (Math.min(maximum, i - lower) === maximum) break;
                                j = 0, ++k;
                            }
                            j += this._core.mergers(this._core.relative(i));
                        }
                    }
                };
                Navigation.prototype.draw = function() {
                    var difference, settings = this._core.settings, disabled = this._core.items().length <= settings.items, index = this._core.relative(this._core.current()), loop = settings.loop || settings.rewind;
                    this._controls.$relative.toggleClass("disabled", !settings.nav || disabled);
                    if (settings.nav) {
                        this._controls.$previous.toggleClass("disabled", !loop && index <= this._core.minimum(true));
                        this._controls.$next.toggleClass("disabled", !loop && index >= this._core.maximum(true));
                    }
                    this._controls.$absolute.toggleClass("disabled", !settings.dots || disabled);
                    if (settings.dots) {
                        difference = this._pages.length - this._controls.$absolute.children().length;
                        if (settings.dotsData && 0 !== difference) this._controls.$absolute.html(this._templates.join("")); else if (difference > 0) this._controls.$absolute.append(new Array(difference + 1).join(this._templates[0])); else if (difference < 0) this._controls.$absolute.children().slice(difference).remove();
                        this._controls.$absolute.find(".active").removeClass("active");
                        this._controls.$absolute.children().eq($.inArray(this.current(), this._pages)).addClass("active");
                    }
                };
                Navigation.prototype.onTrigger = function(event) {
                    var settings = this._core.settings;
                    event.page = {
                        index: $.inArray(this.current(), this._pages),
                        count: this._pages.length,
                        size: settings && (settings.center || settings.autoWidth || settings.dotsData ? 1 : settings.dotsEach || settings.items)
                    };
                };
                Navigation.prototype.current = function() {
                    var current = this._core.relative(this._core.current());
                    return $.grep(this._pages, $.proxy((function(page, index) {
                        return page.start <= current && page.end >= current;
                    }), this)).pop();
                };
                Navigation.prototype.getPosition = function(successor) {
                    var position, length, settings = this._core.settings;
                    if ("page" == settings.slideBy) {
                        position = $.inArray(this.current(), this._pages);
                        length = this._pages.length;
                        successor ? ++position : --position;
                        position = this._pages[(position % length + length) % length].start;
                    } else {
                        position = this._core.relative(this._core.current());
                        length = this._core.items().length;
                        successor ? position += settings.slideBy : position -= settings.slideBy;
                    }
                    return position;
                };
                Navigation.prototype.next = function(speed) {
                    $.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
                };
                Navigation.prototype.prev = function(speed) {
                    $.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
                };
                Navigation.prototype.to = function(position, speed, standard) {
                    var length;
                    if (!standard && this._pages.length) {
                        length = this._pages.length;
                        $.proxy(this._overrides.to, this._core)(this._pages[(position % length + length) % length].start, speed);
                    } else $.proxy(this._overrides.to, this._core)(position, speed);
                };
                $.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;
            })(window.Zepto || window.jQuery, window, document);
            /**
 * Hash Plugin
 * @version 2.3.4
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */            (function($, window, document, undefined) {
                "use strict";
                var Hash = function(carousel) {
                    this._core = carousel;
                    this._hashes = {};
                    this.$element = this._core.$element;
                    this._handlers = {
                        "initialized.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && "URLHash" === this._core.settings.startPosition) $(window).trigger("hashchange.owl.navigation");
                        }), this),
                        "prepared.owl.carousel": $.proxy((function(e) {
                            if (e.namespace) {
                                var hash = $(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                                if (!hash) return;
                                this._hashes[hash] = e.content;
                            }
                        }), this),
                        "changed.owl.carousel": $.proxy((function(e) {
                            if (e.namespace && "position" === e.property.name) {
                                var current = this._core.items(this._core.relative(this._core.current())), hash = $.map(this._hashes, (function(item, hash) {
                                    return item === current ? hash : null;
                                })).join();
                                if (!hash || window.location.hash.slice(1) === hash) return;
                                window.location.hash = hash;
                            }
                        }), this)
                    };
                    this._core.options = $.extend({}, Hash.Defaults, this._core.options);
                    this.$element.on(this._handlers);
                    $(window).on("hashchange.owl.navigation", $.proxy((function(e) {
                        var hash = window.location.hash.substring(1), items = this._core.$stage.children(), position = this._hashes[hash] && items.index(this._hashes[hash]);
                        if (position === undefined || position === this._core.current()) return;
                        this._core.to(this._core.relative(position), false, true);
                    }), this));
                };
                Hash.Defaults = {
                    URLhashListener: false
                };
                Hash.prototype.destroy = function() {
                    var handler, property;
                    $(window).off("hashchange.owl.navigation");
                    for (handler in this._handlers) this._core.$element.off(handler, this._handlers[handler]);
                    for (property in Object.getOwnPropertyNames(this)) "function" != typeof this[property] && (this[property] = null);
                };
                $.fn.owlCarousel.Constructor.Plugins.Hash = Hash;
            })(window.Zepto || window.jQuery, window, document);
            /**
 * Support Plugin
 *
 * @version 2.3.4
 * @author Vivid Planet Software GmbH
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */            (function($, window, document, undefined) {
                var style = $("<support>").get(0).style, prefixes = "Webkit Moz O ms".split(" "), events = {
                    transition: {
                        end: {
                            WebkitTransition: "webkitTransitionEnd",
                            MozTransition: "transitionend",
                            OTransition: "oTransitionEnd",
                            transition: "transitionend"
                        }
                    },
                    animation: {
                        end: {
                            WebkitAnimation: "webkitAnimationEnd",
                            MozAnimation: "animationend",
                            OAnimation: "oAnimationEnd",
                            animation: "animationend"
                        }
                    }
                }, tests = {
                    csstransforms: function() {
                        return !!test("transform");
                    },
                    csstransforms3d: function() {
                        return !!test("perspective");
                    },
                    csstransitions: function() {
                        return !!test("transition");
                    },
                    cssanimations: function() {
                        return !!test("animation");
                    }
                };
                function test(property, prefixed) {
                    var result = false, upper = property.charAt(0).toUpperCase() + property.slice(1);
                    $.each((property + " " + prefixes.join(upper + " ") + upper).split(" "), (function(i, property) {
                        if (style[property] !== undefined) {
                            result = prefixed ? property : true;
                            return false;
                        }
                    }));
                    return result;
                }
                function prefixed(property) {
                    return test(property, true);
                }
                if (tests.csstransitions()) {
                    $.support.transition = new String(prefixed("transition"));
                    $.support.transition.end = events.transition.end[$.support.transition];
                }
                if (tests.cssanimations()) {
                    $.support.animation = new String(prefixed("animation"));
                    $.support.animation.end = events.animation.end[$.support.animation];
                }
                if (tests.csstransforms()) {
                    $.support.transform = new String(prefixed("transform"));
                    $.support.transform3d = tests.csstransforms3d();
                }
            })(window.Zepto || window.jQuery, window, document);
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
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        __webpack_require__(9);
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
                        if (spollersBlock.classList.contains("_spoller-init")) {
                            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                            spollerClose.classList.remove("_spoller-active");
                            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                        }
                    }));
                }));
            }
        }
        function menuClose() {
            bodyUnlock();
            document.documentElement.classList.remove("menu-open");
        }
        function showMore() {
            document.addEventListener("DOMContentLoaded", (function(e) {
                const showMoreBlocks = document.querySelectorAll("[data-showmore]");
                let showMoreBlocksRegular;
                let mdQueriesArray;
                if (showMoreBlocks.length) {
                    showMoreBlocksRegular = Array.from(showMoreBlocks).filter((function(item, index, self) {
                        return !item.dataset.showmoreMedia;
                    }));
                    showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
                    document.addEventListener("click", showMoreActions);
                    window.addEventListener("resize", showMoreActions);
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
        let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
            const targetBlockElement = document.querySelector(targetBlock);
            if (targetBlockElement) {
                let headerItem = "";
                let headerItemHeight = 0;
                if (noHeader) {
                    headerItem = "header.header";
                    const headerElement = document.querySelector(headerItem);
                    if (!headerElement.classList.contains("_header-scroll")) {
                        headerElement.style.cssText = `transition-duration: 0s;`;
                        headerElement.classList.add("_header-scroll");
                        headerItemHeight = headerElement.offsetHeight;
                        headerElement.classList.remove("_header-scroll");
                        setTimeout((() => {
                            headerElement.style.cssText = ``;
                        }), 0);
                    } else headerItemHeight = headerElement.offsetHeight;
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
        function formSubmit() {
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
                    if (form.querySelector("._form-error") && form.hasAttribute("data-goto-error")) {
                        const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : "._form-error";
                        gotoblock_gotoBlock(formGoToErrorClass, true, 1e3);
                    }
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
                }), 4e3);
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
        function formRating() {
            const ratings = document.querySelectorAll(".rating");
            if (ratings.length > 0) initRatings();
            function initRatings() {
                let ratingActive, ratingValue;
                for (let index = 0; index < ratings.length; index++) {
                    const rating = ratings[index];
                    initRating(rating);
                }
                function initRating(rating) {
                    initRatingVars(rating);
                    setRatingActiveWidth();
                    if (rating.classList.contains("rating_set")) setRating(rating);
                }
                function initRatingVars(rating) {
                    ratingActive = rating.querySelector(".rating__active");
                    ratingValue = rating.querySelector(".rating__value");
                }
                function setRatingActiveWidth(index = ratingValue.innerHTML) {
                    const ratingActiveWidth = index / .05;
                    ratingActive.style.width = `${ratingActiveWidth}%`;
                }
                function setRating(rating) {
                    const ratingItems = rating.querySelectorAll(".rating__item");
                    for (let index = 0; index < ratingItems.length; index++) {
                        const ratingItem = ratingItems[index];
                        ratingItem.addEventListener("mouseenter", (function(e) {
                            initRatingVars(rating);
                            setRatingActiveWidth(ratingItem.value);
                        }));
                        ratingItem.addEventListener("mouseleave", (function(e) {
                            setRatingActiveWidth();
                        }));
                        ratingItem.addEventListener("click", (function(e) {
                            initRatingVars(rating);
                            if (rating.dataset.ajax) setRatingValue(ratingItem.value, rating); else {
                                ratingValue.innerHTML = index + 1;
                                setRatingActiveWidth();
                            }
                        }));
                    }
                }
                async function setRatingValue(value, rating) {
                    if (!rating.classList.contains("rating_sending")) {
                        rating.classList.add("rating_sending");
                        let response = await fetch("rating.json", {
                            method: "GET"
                        });
                        if (response.ok) {
                            const result = await response.json();
                            const newRating = result.newRating;
                            ratingValue.innerHTML = newRating;
                            setRatingActiveWidth();
                            rating.classList.remove("rating_sending");
                        } else {
                            alert("Ошибка");
                            rating.classList.remove("rating_sending");
                        }
                    }
                }
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
        var nouislider = __webpack_require__(211);
        function rangeInit() {
            const rangeItems = document.querySelectorAll("[data-range]");
            if (rangeItems.length) rangeItems.forEach((rangeItem => {
                const fromValue = rangeItem.querySelector("[data-range-from]");
                const toValue = rangeItem.querySelector("[data-range-to]");
                var inputs = [ fromValue, toValue ];
                const item = rangeItem.querySelector("[data-range-item]");
                nouislider.create(item, {
                    start: [ Number(fromValue.value), Number(toValue.value) ],
                    connect: true,
                    range: {
                        min: [ Number(fromValue.dataset.rangeFrom) ],
                        max: [ Number(toValue.dataset.rangeTo) ]
                    }
                });
                item.noUiSlider.on("update", (function(values, handle) {
                    inputs[handle].value = Math.floor(values[handle]);
                }));
            }));
        }
        rangeInit();
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
        function utils_nextTick(callback, delay = 0) {
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
        function utils_getTranslate(el, axis = "x") {
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
        function utils_extend(...args) {
            const to = Object(args[0]);
            const noExtend = [ "__proto__", "constructor", "prototype" ];
            for (let i = 1; i < args.length; i += 1) {
                const nextSource = args[i];
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
        function animateCSSModeScroll({swiper, targetPosition, side}) {
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
        function calcDevice({userAgent} = {}) {
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
        function getDevice(overrides = {}) {
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
        function Resize({swiper, on, emit}) {
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
                        entries.forEach((({contentBoxSize, contentRect, target}) => {
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
        function Observer({swiper, extendParams, on, emit}) {
            const observers = [];
            const window = ssr_window_esm_getWindow();
            const attach = (target, options = {}) => {
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
                function onceHandler(...args) {
                    self.off(events, onceHandler);
                    if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
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
            emit(...args) {
                const self = this;
                if (!self.eventsListeners || self.destroyed) return self;
                if (!self.eventsListeners) return self;
                let events;
                let data;
                let context;
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
        function updateSlidesProgress(translate = this && this.translate || 0) {
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
        function getSwiperTranslate(axis = (this.isHorizontal() ? "x" : "y")) {
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
        function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
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
        function transitionEmit({swiper, runCallbacks, direction, step}) {
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
        function transitionStart(runCallbacks = true, direction) {
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
        function transitionEnd_transitionEnd(runCallbacks = true, direction) {
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
        function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
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
            const translate = -snapGrid[snapIndex];
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
            if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
            swiper.updateProgress(translate);
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
        function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
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
        function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
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
        function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
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
        function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
            const swiper = this;
            return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
        }
        function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = .5) {
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
            if (swiper.loopedSlides > slides.length && swiper.params.loopedSlidesLimit) swiper.loopedSlides = slides.length;
            const prependSlides = [];
            const appendSlides = [];
            slides.each(((el, index) => {
                const slide = dom(el);
                slide.attr("data-swiper-slide-index", index);
            }));
            for (let i = 0; i < swiper.loopedSlides; i += 1) {
                const index = i - Math.floor(i / slides.length) * slides.length;
                appendSlides.push(slides.eq(index)[0]);
                prependSlides.unshift(slides.eq(slides.length - index - 1)[0]);
            }
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
        function closestElement(selector, base = this) {
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
            const eventPath = event.composedPath ? event.composedPath() : event.path;
            if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) $targetEl = dom(eventPath[0]);
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
        function getBreakpoint(breakpoints, base = "window", containerEl) {
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
            loopedSlidesLimit: true,
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
            return function extendParams(obj = {}) {
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
            constructor(...args) {
                let el;
                let params;
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
            slidesPerViewDynamic(view = "current", exact = false) {
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
            changeDirection(newDirection, needUpdate = true) {
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
            changeLanguageDirection(direction) {
                const swiper = this;
                if (swiper.rtl && "rtl" === direction || !swiper.rtl && "ltr" === direction) return;
                swiper.rtl = "rtl" === direction;
                swiper.rtlTranslate = "horizontal" === swiper.params.direction && swiper.rtl;
                if (swiper.rtl) {
                    swiper.$el.addClass(`${swiper.params.containerModifierClass}rtl`);
                    swiper.el.dir = "rtl";
                } else {
                    swiper.$el.removeClass(`${swiper.params.containerModifierClass}rtl`);
                    swiper.el.dir = "ltr";
                }
                swiper.update();
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
            destroy(deleteInstance = true, cleanStyles = true) {
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
        function Navigation({swiper, extendParams, on, emit}) {
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
                emit("navigationPrev");
            }
            function onNextClick(e) {
                e.preventDefault();
                if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slideNext();
                emit("navigationNext");
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
        function classes_to_selector_classesToSelector(classes = "") {
            return `.${classes.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`;
        }
        function Pagination({swiper, extendParams, on, emit}) {
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
                if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el && $el.length > 0 && !dom(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
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
        function Thumb({swiper, extendParams, on}) {
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
                let thumbsToActivate = 1;
                const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
                if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) thumbsToActivate = swiper.params.slidesPerView;
                if (!swiper.params.thumbs.multipleActiveThumbs) thumbsToActivate = 1;
                thumbsToActivate = Math.floor(thumbsToActivate);
                thumbsSwiper.slides.removeClass(thumbActiveClass);
                if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) for (let i = 0; i < thumbsToActivate; i += 1) thumbsSwiper.$wrapperEl.children(`[data-swiper-slide-index="${swiper.realIndex + i}"]`).addClass(thumbActiveClass); else for (let i = 0; i < thumbsToActivate; i += 1) thumbsSwiper.slides.eq(swiper.realIndex + i).addClass(thumbActiveClass);
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
        function freeMode({swiper, extendParams, emit, once}) {
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
            function onTouchEnd({currentPos}) {
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
            if (document.querySelector(".products-category-swiper .swiper")) new core(".products-category-swiper .swiper", {
                modules: [ Navigation, freeMode ],
                observer: true,
                observeParents: true,
                slidesPerView: "auto",
                spaceBetween: 0,
                autoHeight: true,
                speed: 800,
                freeMode: true,
                navigation: {
                    prevEl: ".products-category-swiper .swiper-button-prev",
                    nextEl: ".products-category-swiper .swiper-button-next"
                },
                on: {}
            });
            if (document.querySelector(".recepts-category-swiper .swiper")) new core(".recepts-category-swiper .swiper", {
                modules: [ Navigation, freeMode ],
                observer: true,
                observeParents: true,
                slidesPerView: "auto",
                spaceBetween: 0,
                autoHeight: true,
                speed: 800,
                freeMode: true,
                navigation: {
                    prevEl: ".recepts-category-swiper .swiper-button-prev",
                    nextEl: ".recepts-category-swiper .swiper-button-next"
                },
                on: {}
            });
            if (document.querySelector(".kz-product-card__thumbs.swiper")) {
                const thumbsSwiper = new core(".kz-product-card__thumbs.swiper", {
                    modules: [ Navigation, Thumb ],
                    observer: true,
                    observeParents: true,
                    slidesPerView: 5,
                    spaceBetween: 16,
                    autoHeight: false,
                    speed: 800,
                    breakpoints: {
                        320: {
                            slidesPerView: 2
                        },
                        375: {
                            slidesPerView: 3
                        },
                        480: {
                            slidesPerView: 4
                        },
                        550: {
                            slidesPerView: 5
                        },
                        768: {
                            slidesPerView: 4
                        },
                        1199: {
                            slidesPerView: 5
                        }
                    },
                    on: {}
                });
                new core(".kz-product-card__slides.swiper", {
                    modules: [ Navigation, Pagination, Thumb ],
                    observer: true,
                    watchOverflow: true,
                    observeParents: true,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    autoHeight: false,
                    speed: 800,
                    thumbs: {
                        swiper: thumbsSwiper
                    },
                    pagination: {
                        el: ".kz-product-card__slides-pagination",
                        clickable: true
                    },
                    navigation: {
                        prevEl: ".kz-product-card__slides-prev",
                        nextEl: ".kz-product-card__slides-next"
                    },
                    on: {}
                });
            }
        }
        window.addEventListener("load", (function(e) {
            initSliders();
        }));
        var lazyload_min = __webpack_require__(732);
        new lazyload_min({
            elements_selector: "[data-src],[data-srcset],[data-bg],[data-bg-hidpi],[data-bg-set]",
            class_loaded: "_lazy-loaded"
        });
        let addWindowScrollEvent = false;
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        const heroSlider = document.querySelector(".index-slider__slides");
        const contentSlider = document.querySelector(".content-slider");
        if (heroSlider) {
            new Flickity(heroSlider, {
                wrapAround: !0,
                pageDots: !0,
                setGallerySize: false,
                fade: !0,
                imagesLoaded: true,
                cellAlign: "left"
            });
        }
        if (contentSlider) {
            new Flickity(heroSlider, {
                wrapAround: !0,
                prevNextButtons: !1,
                pageDots: !1,
                cellAlign: "left",
                imagesLoaded: !0,
                adaptiveHeight: !0
            });
        }
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
        class ProductCounter {
            constructor(product) {
                this.product = product;
                this.counter = product.querySelector(".kz-product-counter");
                if (!this.counter) return null;
                this.currentNode = this.counter.querySelector(".kz-product-counter__current .value");
                this.minusButton = this.counter.querySelector(`[data-action='minus']`);
                this.plusButton = this.counter.querySelector(`[data-action='plus']`);
                this.maxCount = parseInt(this.counter.dataset.max);
                this.initialCount = parseInt(this.currentNode.textContent);
            }
            init() {
                if (!this.counter) return;
                this.setActiveControls();
                this.minusButton.addEventListener("click", (() => {
                    this.decreaseCounter();
                }));
                this.plusButton.addEventListener("click", (() => {
                    this.inreaseCounter();
                }));
            }
            update(newValue, newMax) {
                this.currentNode.textContent = newValue;
                this.maxCount = +newMax;
                this.counter.dataset.max = newMax;
                this.setActiveControls();
            }
            get currentCount() {
                return parseInt(this.currentNode.textContent);
            }
            set currentCount(value) {
                this.currentNode.textContent = value;
            }
            decreaseCounter() {
                const current = parseInt(this.currentNode.textContent);
                let newValue = current;
                newValue = current - 1;
                this.plusButton.classList.remove("disabled");
                if (newValue < 1) return current; else if (1 === newValue) this.minusButton.classList.add("disabled");
                this.currentNode.textContent = newValue;
                return newValue;
            }
            inreaseCounter() {
                const current = parseInt(this.currentNode.textContent);
                let newValue = current;
                newValue = current + 1;
                this.minusButton.classList.remove("disabled");
                if (newValue > this.maxCount) return current; else if (newValue === this.maxCount) this.plusButton.classList.add("disabled");
                this.currentNode.textContent = newValue;
                return newValue;
            }
            setActiveControls() {
                this.minusButton.classList.remove("disabled");
                this.plusButton.classList.remove("disabled");
                if (this.maxCount === this.initialCount) this.plusButton.classList.add("disabled");
                if (1 === this.initialCount) this.minusButton.classList.add("disabled");
            }
        }
        const product = document.querySelector(".kz-product-card");
        if (product) {
            let counter = new ProductCounter(product);
            counter.init();
        }
        document.addEventListener("click", documentClickAction);
        function documentClickAction(e) {
            const el = e.target;
            if (el.closest(".kz-product-card__like")) {
                const fav = el.closest(".kz-product-card__like");
                fav.classList.toggle("active");
            }
        }
        let map = document.querySelector("#map");
        if (map) {
            ymaps.ready(init);
            function init() {
                var myMap = new ymaps.Map("map", {
                    center: [ 59.91795236804815, 30.304908500000003 ],
                    zoom: 10
                });
                var glyphIcon = new ymaps.Placemark([ 59.89769956422329, 30.512033499999973 ], {
                    iconCaption: "Магазин «Компас Здоровья»",
                    balloonContent: "<div class='icon-content'><div class='icon-content__image' style='background-image: url(img/shops/shop.png)'></div><div class='icon-content__wrap'><div class='icon-content__address'><span class='icon-content__title'>Адрес</span><span class='icon-content__value'>м. улица Дыбенко Кудрово, Европейский пр. д. 3</span></div><div class='icon-content__work-time'><span class='icon-content__title'>Режим работы</span><span class='icon-content__value'>Ежедневно с 8:00 до 20:00</span></div><div class='icon-content__phone'><span class='icon-content__title'>Телефон</span><span class='icon-content__value'>+7 (900) 00-00-00</span></div></div></div>"
                }, {
                    preset: "islands#greenIcon"
                });
                myMap.geoObjects.add(glyphIcon);
                glyphIcon = new ymaps.Placemark([ 59.89769956422329, 30.512033499999973 ], {
                    iconCaption: "Магазин «Компас Здоровья»",
                    balloonContent: "<div class='icon-content'><div class='icon-content__image' style='background-image: url(img/shops/shop.png)'></div><div class='icon-content__wrap'><div class='icon-content__address'><span class='icon-content__title'>Адрес</span><span class='icon-content__value'>м. улица Дыбенко Кудрово, Европейский пр. д. 3</span></div><div class='icon-content__work-time'><span class='icon-content__title'>Режим работы</span><span class='icon-content__value'>Ежедневно с 8:00 до 20:00</span></div><div class='icon-content__phone'><span class='icon-content__title'>Телефон</span><span class='icon-content__value'>+7 (900) 00-00-00</span></div></div></div>"
                }, {
                    preset: "islands#greenIcon"
                });
                myMap.geoObjects.add(glyphIcon);
                myMap.behaviors.disable("scrollZoom");
            }
        }
        new Plyr("#youtube-1", {});
        (function(window, document, $, undefined) {
            "use strict";
            var H = $("html"), W = $(window), D = $(document), F = $.fancybox = function() {
                F.open.apply(this, arguments);
            }, IE = navigator.userAgent.match(/msie/i), didUpdate = null, isTouch = document.createTouch !== undefined, isQuery = function(obj) {
                return obj && obj.hasOwnProperty && obj instanceof $;
            }, isString = function(str) {
                return str && "string" === $.type(str);
            }, isPercentage = function(str) {
                return isString(str) && str.indexOf("%") > 0;
            }, isScrollable = function(el) {
                return el && !(el.style.overflow && "hidden" === el.style.overflow) && (el.clientWidth && el.scrollWidth > el.clientWidth || el.clientHeight && el.scrollHeight > el.clientHeight);
            }, getScalar = function(orig, dim) {
                var value = parseInt(orig, 10) || 0;
                if (dim && isPercentage(orig)) value = F.getViewport()[dim] / 100 * value;
                return Math.ceil(value);
            }, getValue = function(value, dim) {
                return getScalar(value, dim) + "px";
            };
            $.extend(F, {
                version: "2.1.5",
                defaults: {
                    padding: 15,
                    margin: 20,
                    width: 800,
                    height: 600,
                    minWidth: 100,
                    minHeight: 100,
                    maxWidth: 9999,
                    maxHeight: 9999,
                    pixelRatio: 1,
                    autoSize: true,
                    autoHeight: false,
                    autoWidth: false,
                    autoResize: true,
                    autoCenter: !isTouch,
                    fitToView: true,
                    aspectRatio: false,
                    topRatio: .5,
                    leftRatio: .5,
                    scrolling: "auto",
                    wrapCSS: "",
                    arrows: true,
                    closeBtn: true,
                    closeClick: false,
                    nextClick: false,
                    mouseWheel: true,
                    autoPlay: false,
                    playSpeed: 3e3,
                    preload: 3,
                    modal: false,
                    loop: true,
                    ajax: {
                        dataType: "html",
                        headers: {
                            "X-fancyBox": true
                        }
                    },
                    iframe: {
                        scrolling: "auto",
                        preload: true
                    },
                    swf: {
                        wmode: "transparent",
                        allowfullscreen: "true",
                        allowscriptaccess: "always"
                    },
                    keys: {
                        next: {
                            13: "left",
                            34: "up",
                            39: "left",
                            40: "up"
                        },
                        prev: {
                            8: "right",
                            33: "down",
                            37: "right",
                            38: "down"
                        },
                        close: [ 27 ],
                        play: [ 32 ],
                        toggle: [ 70 ]
                    },
                    direction: {
                        next: "left",
                        prev: "right"
                    },
                    scrollOutside: true,
                    index: 0,
                    type: null,
                    href: null,
                    content: null,
                    title: null,
                    tpl: {
                        wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                        image: '<img class="fancybox-image" src="{href}" alt="" />',
                        iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : "") + "></iframe>",
                        error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                        closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                        next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                        prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>',
                        loading: '<div id="fancybox-loading"><div></div></div>'
                    },
                    openEffect: "fade",
                    openSpeed: 250,
                    openEasing: "swing",
                    openOpacity: true,
                    openMethod: "zoomIn",
                    closeEffect: "fade",
                    closeSpeed: 250,
                    closeEasing: "swing",
                    closeOpacity: true,
                    closeMethod: "zoomOut",
                    nextEffect: "elastic",
                    nextSpeed: 250,
                    nextEasing: "swing",
                    nextMethod: "changeIn",
                    prevEffect: "elastic",
                    prevSpeed: 250,
                    prevEasing: "swing",
                    prevMethod: "changeOut",
                    helpers: {
                        overlay: true,
                        title: true
                    },
                    onCancel: $.noop,
                    beforeLoad: $.noop,
                    afterLoad: $.noop,
                    beforeShow: $.noop,
                    afterShow: $.noop,
                    beforeChange: $.noop,
                    beforeClose: $.noop,
                    afterClose: $.noop
                },
                group: {},
                opts: {},
                previous: null,
                coming: null,
                current: null,
                isActive: false,
                isOpen: false,
                isOpened: false,
                wrap: null,
                skin: null,
                outer: null,
                inner: null,
                player: {
                    timer: null,
                    isActive: false
                },
                ajaxLoad: null,
                imgPreload: null,
                transitions: {},
                helpers: {},
                open: function(group, opts) {
                    if (!group) return;
                    if (!$.isPlainObject(opts)) opts = {};
                    if (false === F.close(true)) return;
                    if (!$.isArray(group)) group = isQuery(group) ? $(group).get() : [ group ];
                    $.each(group, (function(i, element) {
                        var href, title, content, type, rez, hrefParts, selector, obj = {};
                        if ("object" === $.type(element)) {
                            if (element.nodeType) element = $(element);
                            if (isQuery(element)) {
                                obj = {
                                    href: element.data("fancybox-href") || element.attr("href"),
                                    title: $("<div/>").text(element.data("fancybox-title") || element.attr("title") || "").html(),
                                    isDom: true,
                                    element
                                };
                                if ($.metadata) $.extend(true, obj, element.metadata());
                            } else obj = element;
                        }
                        href = opts.href || obj.href || (isString(element) ? element : null);
                        title = opts.title !== undefined ? opts.title : obj.title || "";
                        content = opts.content || obj.content;
                        type = content ? "html" : opts.type || obj.type;
                        if (!type && obj.isDom) {
                            type = element.data("fancybox-type");
                            if (!type) {
                                rez = element.prop("class").match(/fancybox\.(\w+)/);
                                type = rez ? rez[1] : null;
                            }
                        }
                        if (isString(href)) {
                            if (!type) if (F.isImage(href)) type = "image"; else if (F.isSWF(href)) type = "swf"; else if ("#" === href.charAt(0)) type = "inline"; else if (isString(element)) {
                                type = "html";
                                content = element;
                            }
                            if ("ajax" === type) {
                                hrefParts = href.split(/\s+/, 2);
                                href = hrefParts.shift();
                                selector = hrefParts.shift();
                            }
                        }
                        if (!content) if ("inline" === type) {
                            if (href) content = $(isString(href) ? href.replace(/.*(?=#[^\s]+$)/, "") : href); else if (obj.isDom) content = element;
                        } else if ("html" === type) content = href; else if (!type && !href && obj.isDom) {
                            type = "inline";
                            content = element;
                        }
                        $.extend(obj, {
                            href,
                            type,
                            content,
                            title,
                            selector
                        });
                        group[i] = obj;
                    }));
                    F.opts = $.extend(true, {}, F.defaults, opts);
                    if (opts.keys !== undefined) F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
                    F.group = group;
                    return F._start(F.opts.index);
                },
                cancel: function() {
                    var coming = F.coming;
                    if (coming && false === F.trigger("onCancel")) return;
                    F.hideLoading();
                    if (!coming) return;
                    if (F.ajaxLoad) F.ajaxLoad.abort();
                    F.ajaxLoad = null;
                    if (F.imgPreload) F.imgPreload.onload = F.imgPreload.onerror = null;
                    if (coming.wrap) coming.wrap.stop(true, true).trigger("onReset").remove();
                    F.coming = null;
                    if (!F.current) F._afterZoomOut(coming);
                },
                close: function(event) {
                    F.cancel();
                    if (false === F.trigger("beforeClose")) return;
                    F.unbindEvents();
                    if (!F.isActive) return;
                    if (!F.isOpen || true === event) {
                        $(".fancybox-wrap").stop(true).trigger("onReset").remove();
                        F._afterZoomOut();
                    } else {
                        F.isOpen = F.isOpened = false;
                        F.isClosing = true;
                        $(".fancybox-item, .fancybox-nav").remove();
                        F.wrap.stop(true, true).removeClass("fancybox-opened");
                        F.transitions[F.current.closeMethod]();
                    }
                },
                play: function(action) {
                    var clear = function() {
                        clearTimeout(F.player.timer);
                    }, set = function() {
                        clear();
                        if (F.current && F.player.isActive) F.player.timer = setTimeout(F.next, F.current.playSpeed);
                    }, stop = function() {
                        clear();
                        D.unbind(".player");
                        F.player.isActive = false;
                        F.trigger("onPlayEnd");
                    }, start = function() {
                        if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
                            F.player.isActive = true;
                            D.bind({
                                "onCancel.player beforeClose.player": stop,
                                "onUpdate.player": set,
                                "beforeLoad.player": clear
                            });
                            set();
                            F.trigger("onPlayStart");
                        }
                    };
                    if (true === action || !F.player.isActive && false !== action) start(); else stop();
                },
                next: function(direction) {
                    var current = F.current;
                    if (current) {
                        if (!isString(direction)) direction = current.direction.next;
                        F.jumpto(current.index + 1, direction, "next");
                    }
                },
                prev: function(direction) {
                    var current = F.current;
                    if (current) {
                        if (!isString(direction)) direction = current.direction.prev;
                        F.jumpto(current.index - 1, direction, "prev");
                    }
                },
                jumpto: function(index, direction, router) {
                    var current = F.current;
                    if (!current) return;
                    index = getScalar(index);
                    F.direction = direction || current.direction[index >= current.index ? "next" : "prev"];
                    F.router = router || "jumpto";
                    if (current.loop) {
                        if (index < 0) index = current.group.length + index % current.group.length;
                        index %= current.group.length;
                    }
                    if (current.group[index] !== undefined) {
                        F.cancel();
                        F._start(index);
                    }
                },
                reposition: function(e, onlyAbsolute) {
                    var pos, current = F.current, wrap = current ? current.wrap : null;
                    if (wrap) {
                        pos = F._getPosition(onlyAbsolute);
                        if (e && "scroll" === e.type) {
                            delete pos.position;
                            wrap.stop(true, true).animate(pos, 200);
                        } else {
                            wrap.css(pos);
                            current.pos = $.extend({}, current.dim, pos);
                        }
                    }
                },
                update: function(e) {
                    var type = e && e.originalEvent && e.originalEvent.type, anyway = !type || "orientationchange" === type;
                    if (anyway) {
                        clearTimeout(didUpdate);
                        didUpdate = null;
                    }
                    if (!F.isOpen || didUpdate) return;
                    didUpdate = setTimeout((function() {
                        var current = F.current;
                        if (!current || F.isClosing) return;
                        F.wrap.removeClass("fancybox-tmp");
                        if (anyway || "load" === type || "resize" === type && current.autoResize) F._setDimension();
                        if (!("scroll" === type && current.canShrink)) F.reposition(e);
                        F.trigger("onUpdate");
                        didUpdate = null;
                    }), anyway && !isTouch ? 0 : 300);
                },
                toggle: function(action) {
                    if (F.isOpen) {
                        F.current.fitToView = "boolean" === $.type(action) ? action : !F.current.fitToView;
                        if (isTouch) {
                            F.wrap.removeAttr("style").addClass("fancybox-tmp");
                            F.trigger("onUpdate");
                        }
                        F.update();
                    }
                },
                hideLoading: function() {
                    D.unbind(".loading");
                    $("#fancybox-loading").remove();
                },
                showLoading: function() {
                    var el, viewport;
                    F.hideLoading();
                    el = $(F.opts.tpl.loading).click(F.cancel).appendTo("body");
                    D.bind("keydown.loading", (function(e) {
                        if (27 === (e.which || e.keyCode)) {
                            e.preventDefault();
                            F.cancel();
                        }
                    }));
                    if (!F.defaults.fixed) {
                        viewport = F.getViewport();
                        el.css({
                            position: "absolute",
                            top: .5 * viewport.h + viewport.y,
                            left: .5 * viewport.w + viewport.x
                        });
                    }
                    F.trigger("onLoading");
                },
                getViewport: function() {
                    var locked = F.current && F.current.locked || false, rez = {
                        x: W.scrollLeft(),
                        y: W.scrollTop()
                    };
                    if (locked && locked.length) {
                        rez.w = locked[0].clientWidth;
                        rez.h = locked[0].clientHeight;
                    } else {
                        rez.w = isTouch && window.innerWidth ? window.innerWidth : W.width();
                        rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
                    }
                    return rez;
                },
                unbindEvents: function() {
                    if (F.wrap && isQuery(F.wrap)) F.wrap.unbind(".fb");
                    D.unbind(".fb");
                    W.unbind(".fb");
                },
                bindEvents: function() {
                    var keys, current = F.current;
                    if (!current) return;
                    W.bind("orientationchange.fb" + (isTouch ? "" : " resize.fb") + (current.autoCenter && !current.locked ? " scroll.fb" : ""), F.update);
                    keys = current.keys;
                    if (keys) D.bind("keydown.fb", (function(e) {
                        var code = e.which || e.keyCode, target = e.target || e.srcElement;
                        if (27 === code && F.coming) return false;
                        if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is("[contenteditable]")))) $.each(keys, (function(i, val) {
                            if (current.group.length > 1 && val[code] !== undefined) {
                                F[i](val[code]);
                                e.preventDefault();
                                return false;
                            }
                            if ($.inArray(code, val) > -1) {
                                F[i]();
                                e.preventDefault();
                                return false;
                            }
                        }));
                    }));
                    if ($.fn.mousewheel && current.mouseWheel) F.wrap.bind("mousewheel.fb", (function(e, delta, deltaX, deltaY) {
                        var target = e.target || null, parent = $(target), canScroll = false;
                        while (parent.length) {
                            if (canScroll || parent.is(".fancybox-skin") || parent.is(".fancybox-wrap")) break;
                            canScroll = isScrollable(parent[0]);
                            parent = $(parent).parent();
                        }
                        if (0 !== delta && !canScroll) if (F.group.length > 1 && !current.canShrink) {
                            if (deltaY > 0 || deltaX > 0) F.prev(deltaY > 0 ? "down" : "left"); else if (deltaY < 0 || deltaX < 0) F.next(deltaY < 0 ? "up" : "right");
                            e.preventDefault();
                        }
                    }));
                },
                trigger: function(event, o) {
                    var ret, obj = o || F.coming || F.current;
                    if (obj) {
                        if ($.isFunction(obj[event])) ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
                        if (false === ret) return false;
                        if (obj.helpers) $.each(obj.helpers, (function(helper, opts) {
                            if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
                        }));
                    }
                    D.trigger(event);
                },
                isImage: function(str) {
                    return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
                },
                isSWF: function(str) {
                    return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
                },
                _start: function(index) {
                    var obj, href, type, margin, padding, coming = {};
                    index = getScalar(index);
                    obj = F.group[index] || null;
                    if (!obj) return false;
                    coming = $.extend(true, {}, F.opts, obj);
                    margin = coming.margin;
                    padding = coming.padding;
                    if ("number" === $.type(margin)) coming.margin = [ margin, margin, margin, margin ];
                    if ("number" === $.type(padding)) coming.padding = [ padding, padding, padding, padding ];
                    if (coming.modal) $.extend(true, coming, {
                        closeBtn: false,
                        closeClick: false,
                        nextClick: false,
                        arrows: false,
                        mouseWheel: false,
                        keys: null,
                        helpers: {
                            overlay: {
                                closeClick: false
                            }
                        }
                    });
                    if (coming.autoSize) coming.autoWidth = coming.autoHeight = true;
                    if ("auto" === coming.width) coming.autoWidth = true;
                    if ("auto" === coming.height) coming.autoHeight = true;
                    coming.group = F.group;
                    coming.index = index;
                    F.coming = coming;
                    if (false === F.trigger("beforeLoad")) {
                        F.coming = null;
                        return;
                    }
                    type = coming.type;
                    href = coming.href;
                    if (!type) {
                        F.coming = null;
                        if (F.current && F.router && "jumpto" !== F.router) {
                            F.current.index = index;
                            return F[F.router](F.direction);
                        }
                        return false;
                    }
                    F.isActive = true;
                    if ("image" === type || "swf" === type) {
                        coming.autoHeight = coming.autoWidth = false;
                        coming.scrolling = "visible";
                    }
                    if ("image" === type) coming.aspectRatio = true;
                    if ("iframe" === type && isTouch) coming.scrolling = "scroll";
                    coming.wrap = $(coming.tpl.wrap).addClass("fancybox-" + (isTouch ? "mobile" : "desktop") + " fancybox-type-" + type + " fancybox-tmp " + coming.wrapCSS).appendTo(coming.parent || "body");
                    $.extend(coming, {
                        skin: $(".fancybox-skin", coming.wrap),
                        outer: $(".fancybox-outer", coming.wrap),
                        inner: $(".fancybox-inner", coming.wrap)
                    });
                    $.each([ "Top", "Right", "Bottom", "Left" ], (function(i, v) {
                        coming.skin.css("padding" + v, getValue(coming.padding[i]));
                    }));
                    F.trigger("onReady");
                    if ("inline" === type || "html" === type) {
                        if (!coming.content || !coming.content.length) return F._error("content");
                    } else if (!href) return F._error("href");
                    if ("image" === type) F._loadImage(); else if ("ajax" === type) F._loadAjax(); else if ("iframe" === type) F._loadIframe(); else F._afterLoad();
                },
                _error: function(type) {
                    $.extend(F.coming, {
                        type: "html",
                        autoWidth: true,
                        autoHeight: true,
                        minWidth: 0,
                        minHeight: 0,
                        scrolling: "no",
                        hasError: type,
                        content: F.coming.tpl.error
                    });
                    F._afterLoad();
                },
                _loadImage: function() {
                    var img = F.imgPreload = new Image;
                    img.onload = function() {
                        this.onload = this.onerror = null;
                        F.coming.width = this.width / F.opts.pixelRatio;
                        F.coming.height = this.height / F.opts.pixelRatio;
                        F._afterLoad();
                    };
                    img.onerror = function() {
                        this.onload = this.onerror = null;
                        F._error("image");
                    };
                    img.src = F.coming.href;
                    if (true !== img.complete) F.showLoading();
                },
                _loadAjax: function() {
                    var coming = F.coming;
                    F.showLoading();
                    F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
                        url: coming.href,
                        error: function(jqXHR, textStatus) {
                            if (F.coming && "abort" !== textStatus) F._error("ajax", jqXHR); else F.hideLoading();
                        },
                        success: function(data, textStatus) {
                            if ("success" === textStatus) {
                                coming.content = data;
                                F._afterLoad();
                            }
                        }
                    }));
                },
                _loadIframe: function() {
                    var coming = F.coming, iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", isTouch ? "auto" : coming.iframe.scrolling).attr("src", coming.href);
                    $(coming.wrap).bind("onReset", (function() {
                        try {
                            $(this).find("iframe").hide().attr("src", "//about:blank").end().empty();
                        } catch (e) {}
                    }));
                    if (coming.iframe.preload) {
                        F.showLoading();
                        iframe.one("load", (function() {
                            $(this).data("ready", 1);
                            if (!isTouch) $(this).bind("load.fb", F.update);
                            $(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
                            F._afterLoad();
                        }));
                    }
                    coming.content = iframe.appendTo(coming.inner);
                    if (!coming.iframe.preload) F._afterLoad();
                },
                _preloadImages: function() {
                    var item, i, group = F.group, current = F.current, len = group.length, cnt = current.preload ? Math.min(current.preload, len - 1) : 0;
                    for (i = 1; i <= cnt; i += 1) {
                        item = group[(current.index + i) % len];
                        if ("image" === item.type && item.href) (new Image).src = item.href;
                    }
                },
                _afterLoad: function() {
                    var current, content, type, scrolling, href, embed, coming = F.coming, previous = F.current, placeholder = "fancybox-placeholder";
                    F.hideLoading();
                    if (!coming || false === F.isActive) return;
                    if (false === F.trigger("afterLoad", coming, previous)) {
                        coming.wrap.stop(true).trigger("onReset").remove();
                        F.coming = null;
                        return;
                    }
                    if (previous) {
                        F.trigger("beforeChange", previous);
                        previous.wrap.stop(true).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove();
                    }
                    F.unbindEvents();
                    current = coming;
                    content = coming.content;
                    type = coming.type;
                    scrolling = coming.scrolling;
                    $.extend(F, {
                        wrap: current.wrap,
                        skin: current.skin,
                        outer: current.outer,
                        inner: current.inner,
                        current,
                        previous
                    });
                    href = current.href;
                    switch (type) {
                      case "inline":
                      case "ajax":
                      case "html":
                        if (current.selector) content = $("<div>").html(content).find(current.selector); else if (isQuery(content)) {
                            if (!content.data(placeholder)) content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter(content).hide());
                            content = content.show().detach();
                            current.wrap.bind("onReset", (function() {
                                if ($(this).find(content).length) content.hide().replaceAll(content.data(placeholder)).data(placeholder, false);
                            }));
                        }
                        break;

                      case "image":
                        content = current.tpl.image.replace(/\{href\}/g, href);
                        break;

                      case "swf":
                        content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
                        embed = "";
                        $.each(current.swf, (function(name, val) {
                            content += '<param name="' + name + '" value="' + val + '"></param>';
                            embed += " " + name + '="' + val + '"';
                        }));
                        content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + "></embed></object>";
                        break;
                    }
                    if (!(isQuery(content) && content.parent().is(current.inner))) current.inner.append(content);
                    F.trigger("beforeShow");
                    current.inner.css("overflow", "yes" === scrolling ? "scroll" : "no" === scrolling ? "hidden" : scrolling);
                    F._setDimension();
                    F.reposition();
                    F.isOpen = false;
                    F.coming = null;
                    F.bindEvents();
                    if (!F.isOpened) $(".fancybox-wrap").not(current.wrap).stop(true).trigger("onReset").remove(); else if (previous.prevMethod) F.transitions[previous.prevMethod]();
                    F.transitions[F.isOpened ? current.nextMethod : current.openMethod]();
                    F._preloadImages();
                },
                _setDimension: function() {
                    var wPadding, hPadding, wSpace, hSpace, origWidth, origHeight, origMaxWidth, origMaxHeight, ratio, width_, height_, maxWidth_, maxHeight_, iframe, body, viewport = F.getViewport(), steps = 0, canShrink = false, canExpand = false, wrap = F.wrap, skin = F.skin, inner = F.inner, current = F.current, width = current.width, height = current.height, minWidth = current.minWidth, minHeight = current.minHeight, maxWidth = current.maxWidth, maxHeight = current.maxHeight, scrolling = current.scrolling, scrollOut = current.scrollOutside ? current.scrollbarWidth : 0, margin = current.margin, wMargin = getScalar(margin[1] + margin[3]), hMargin = getScalar(margin[0] + margin[2]);
                    wrap.add(skin).add(inner).width("auto").height("auto").removeClass("fancybox-tmp");
                    wPadding = getScalar(skin.outerWidth(true) - skin.width());
                    hPadding = getScalar(skin.outerHeight(true) - skin.height());
                    wSpace = wMargin + wPadding;
                    hSpace = hMargin + hPadding;
                    origWidth = isPercentage(width) ? (viewport.w - wSpace) * getScalar(width) / 100 : width;
                    origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;
                    if ("iframe" === current.type) {
                        iframe = current.content;
                        if (current.autoHeight && 1 === iframe.data("ready")) try {
                            if (iframe[0].contentWindow.document.location) {
                                inner.width(origWidth).height(9999);
                                body = iframe.contents().find("body");
                                if (scrollOut) body.css("overflow-x", "hidden");
                                origHeight = body.outerHeight(true);
                            }
                        } catch (e) {}
                    } else if (current.autoWidth || current.autoHeight) {
                        inner.addClass("fancybox-tmp");
                        if (!current.autoWidth) inner.width(origWidth);
                        if (!current.autoHeight) inner.height(origHeight);
                        if (current.autoWidth) origWidth = inner.width();
                        if (current.autoHeight) origHeight = inner.height();
                        inner.removeClass("fancybox-tmp");
                    }
                    width = getScalar(origWidth);
                    height = getScalar(origHeight);
                    ratio = origWidth / origHeight;
                    minWidth = getScalar(isPercentage(minWidth) ? getScalar(minWidth, "w") - wSpace : minWidth);
                    maxWidth = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, "w") - wSpace : maxWidth);
                    minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, "h") - hSpace : minHeight);
                    maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, "h") - hSpace : maxHeight);
                    origMaxWidth = maxWidth;
                    origMaxHeight = maxHeight;
                    if (current.fitToView) {
                        maxWidth = Math.min(viewport.w - wSpace, maxWidth);
                        maxHeight = Math.min(viewport.h - hSpace, maxHeight);
                    }
                    maxWidth_ = viewport.w - wMargin;
                    maxHeight_ = viewport.h - hMargin;
                    if (current.aspectRatio) {
                        if (width > maxWidth) {
                            width = maxWidth;
                            height = getScalar(width / ratio);
                        }
                        if (height > maxHeight) {
                            height = maxHeight;
                            width = getScalar(height * ratio);
                        }
                        if (width < minWidth) {
                            width = minWidth;
                            height = getScalar(width / ratio);
                        }
                        if (height < minHeight) {
                            height = minHeight;
                            width = getScalar(height * ratio);
                        }
                    } else {
                        width = Math.max(minWidth, Math.min(width, maxWidth));
                        if (current.autoHeight && "iframe" !== current.type) {
                            inner.width(width);
                            height = inner.height();
                        }
                        height = Math.max(minHeight, Math.min(height, maxHeight));
                    }
                    if (current.fitToView) {
                        inner.width(width).height(height);
                        wrap.width(width + wPadding);
                        width_ = wrap.width();
                        height_ = wrap.height();
                        if (current.aspectRatio) while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
                            if (steps++ > 19) break;
                            height = Math.max(minHeight, Math.min(maxHeight, height - 10));
                            width = getScalar(height * ratio);
                            if (width < minWidth) {
                                width = minWidth;
                                height = getScalar(width / ratio);
                            }
                            if (width > maxWidth) {
                                width = maxWidth;
                                height = getScalar(width / ratio);
                            }
                            inner.width(width).height(height);
                            wrap.width(width + wPadding);
                            width_ = wrap.width();
                            height_ = wrap.height();
                        } else {
                            width = Math.max(minWidth, Math.min(width, width - (width_ - maxWidth_)));
                            height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
                        }
                    }
                    if (scrollOut && "auto" === scrolling && height < origHeight && width + wPadding + scrollOut < maxWidth_) width += scrollOut;
                    inner.width(width).height(height);
                    wrap.width(width + wPadding);
                    width_ = wrap.width();
                    height_ = wrap.height();
                    canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
                    canExpand = current.aspectRatio ? width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight : (width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight);
                    $.extend(current, {
                        dim: {
                            width: getValue(width_),
                            height: getValue(height_)
                        },
                        origWidth,
                        origHeight,
                        canShrink,
                        canExpand,
                        wPadding,
                        hPadding,
                        wrapSpace: height_ - skin.outerHeight(true),
                        skinSpace: skin.height() - height
                    });
                    if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) inner.height("auto");
                },
                _getPosition: function(onlyAbsolute) {
                    var current = F.current, viewport = F.getViewport(), margin = current.margin, width = F.wrap.width() + margin[1] + margin[3], height = F.wrap.height() + margin[0] + margin[2], rez = {
                        position: "absolute",
                        top: margin[0],
                        left: margin[3]
                    };
                    if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) rez.position = "fixed"; else if (!current.locked) {
                        rez.top += viewport.y;
                        rez.left += viewport.x;
                    }
                    rez.top = getValue(Math.max(rez.top, rez.top + (viewport.h - height) * current.topRatio));
                    rez.left = getValue(Math.max(rez.left, rez.left + (viewport.w - width) * current.leftRatio));
                    return rez;
                },
                _afterZoomIn: function() {
                    var current = F.current;
                    if (!current) return;
                    F.isOpen = F.isOpened = true;
                    F.wrap.css("overflow", "visible").addClass("fancybox-opened").hide().show(0);
                    F.update();
                    if (current.closeClick || current.nextClick && F.group.length > 1) F.inner.css("cursor", "pointer").bind("click.fb", (function(e) {
                        if (!$(e.target).is("a") && !$(e.target).parent().is("a")) {
                            e.preventDefault();
                            F[current.closeClick ? "close" : "next"]();
                        }
                    }));
                    if (current.closeBtn) $(current.tpl.closeBtn).appendTo(F.skin).bind("click.fb", (function(e) {
                        e.preventDefault();
                        F.close();
                    }));
                    if (current.arrows && F.group.length > 1) {
                        if (current.loop || current.index > 0) $(current.tpl.prev).appendTo(F.outer).bind("click.fb", F.prev);
                        if (current.loop || current.index < F.group.length - 1) $(current.tpl.next).appendTo(F.outer).bind("click.fb", F.next);
                    }
                    F.trigger("afterShow");
                    if (!current.loop && current.index === current.group.length - 1) F.play(false); else if (F.opts.autoPlay && !F.player.isActive) {
                        F.opts.autoPlay = false;
                        F.play(true);
                    }
                },
                _afterZoomOut: function(obj) {
                    obj = obj || F.current;
                    $(".fancybox-wrap").trigger("onReset").remove();
                    $.extend(F, {
                        group: {},
                        opts: {},
                        router: false,
                        current: null,
                        isActive: false,
                        isOpened: false,
                        isOpen: false,
                        isClosing: false,
                        wrap: null,
                        skin: null,
                        outer: null,
                        inner: null
                    });
                    F.trigger("afterClose", obj);
                }
            });
            F.transitions = {
                getOrigPosition: function() {
                    var current = F.current, element = current.element, orig = current.orig, pos = {}, width = 50, height = 50, hPadding = current.hPadding, wPadding = current.wPadding, viewport = F.getViewport();
                    if (!orig && current.isDom && element.is(":visible")) {
                        orig = element.find("img:first");
                        if (!orig.length) orig = element;
                    }
                    if (isQuery(orig)) {
                        pos = orig.offset();
                        if (orig.is("img")) {
                            width = orig.outerWidth();
                            height = orig.outerHeight();
                        }
                    } else {
                        pos.top = viewport.y + (viewport.h - height) * current.topRatio;
                        pos.left = viewport.x + (viewport.w - width) * current.leftRatio;
                    }
                    if ("fixed" === F.wrap.css("position") || current.locked) {
                        pos.top -= viewport.y;
                        pos.left -= viewport.x;
                    }
                    pos = {
                        top: getValue(pos.top - hPadding * current.topRatio),
                        left: getValue(pos.left - wPadding * current.leftRatio),
                        width: getValue(width + wPadding),
                        height: getValue(height + hPadding)
                    };
                    return pos;
                },
                step: function(now, fx) {
                    var ratio, padding, value, prop = fx.prop, current = F.current, wrapSpace = current.wrapSpace, skinSpace = current.skinSpace;
                    if ("width" === prop || "height" === prop) {
                        ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);
                        if (F.isClosing) ratio = 1 - ratio;
                        padding = "width" === prop ? current.wPadding : current.hPadding;
                        value = now - padding;
                        F.skin[prop](getScalar("width" === prop ? value : value - wrapSpace * ratio));
                        F.inner[prop](getScalar("width" === prop ? value : value - wrapSpace * ratio - skinSpace * ratio));
                    }
                },
                zoomIn: function() {
                    var current = F.current, startPos = current.pos, effect = current.openEffect, elastic = "elastic" === effect, endPos = $.extend({
                        opacity: 1
                    }, startPos);
                    delete endPos.position;
                    if (elastic) {
                        startPos = this.getOrigPosition();
                        if (current.openOpacity) startPos.opacity = .1;
                    } else if ("fade" === effect) startPos.opacity = .1;
                    F.wrap.css(startPos).animate(endPos, {
                        duration: "none" === effect ? 0 : current.openSpeed,
                        easing: current.openEasing,
                        step: elastic ? this.step : null,
                        complete: F._afterZoomIn
                    });
                },
                zoomOut: function() {
                    var current = F.current, effect = current.closeEffect, elastic = "elastic" === effect, endPos = {
                        opacity: .1
                    };
                    if (elastic) {
                        endPos = this.getOrigPosition();
                        if (current.closeOpacity) endPos.opacity = .1;
                    }
                    F.wrap.animate(endPos, {
                        duration: "none" === effect ? 0 : current.closeSpeed,
                        easing: current.closeEasing,
                        step: elastic ? this.step : null,
                        complete: F._afterZoomOut
                    });
                },
                changeIn: function() {
                    var field, current = F.current, effect = current.nextEffect, startPos = current.pos, endPos = {
                        opacity: 1
                    }, direction = F.direction, distance = 200;
                    startPos.opacity = .1;
                    if ("elastic" === effect) {
                        field = "down" === direction || "up" === direction ? "top" : "left";
                        if ("down" === direction || "right" === direction) {
                            startPos[field] = getValue(getScalar(startPos[field]) - distance);
                            endPos[field] = "+=" + distance + "px";
                        } else {
                            startPos[field] = getValue(getScalar(startPos[field]) + distance);
                            endPos[field] = "-=" + distance + "px";
                        }
                    }
                    if ("none" === effect) F._afterZoomIn(); else F.wrap.css(startPos).animate(endPos, {
                        duration: current.nextSpeed,
                        easing: current.nextEasing,
                        complete: F._afterZoomIn
                    });
                },
                changeOut: function() {
                    var previous = F.previous, effect = previous.prevEffect, endPos = {
                        opacity: .1
                    }, direction = F.direction, distance = 200;
                    if ("elastic" === effect) endPos["down" === direction || "up" === direction ? "top" : "left"] = ("up" === direction || "left" === direction ? "-" : "+") + "=" + distance + "px";
                    previous.wrap.animate(endPos, {
                        duration: "none" === effect ? 0 : previous.prevSpeed,
                        easing: previous.prevEasing,
                        complete: function() {
                            $(this).trigger("onReset").remove();
                        }
                    });
                }
            };
            F.helpers.overlay = {
                defaults: {
                    closeClick: true,
                    speedOut: 200,
                    showEarly: true,
                    css: {},
                    locked: !isTouch,
                    fixed: true
                },
                overlay: null,
                fixed: false,
                el: $("html"),
                create: function(opts) {
                    var parent;
                    opts = $.extend({}, this.defaults, opts);
                    if (this.overlay) this.close();
                    parent = F.coming ? F.coming.parent : opts.parent;
                    this.overlay = $('<div class="fancybox-overlay"></div>').appendTo(parent && parent.length ? parent : "body");
                    this.fixed = false;
                    if (opts.fixed && F.defaults.fixed) {
                        this.overlay.addClass("fancybox-overlay-fixed");
                        this.fixed = true;
                    }
                },
                open: function(opts) {
                    var that = this;
                    opts = $.extend({}, this.defaults, opts);
                    if (this.overlay) this.overlay.unbind(".overlay").width("auto").height("auto"); else this.create(opts);
                    if (!this.fixed) {
                        W.bind("resize.overlay", $.proxy(this.update, this));
                        this.update();
                    }
                    if (opts.closeClick) this.overlay.bind("click.overlay", (function(e) {
                        if ($(e.target).hasClass("fancybox-overlay")) {
                            if (F.isActive) F.close(); else that.close();
                            return false;
                        }
                    }));
                    this.overlay.css(opts.css).show();
                },
                close: function() {
                    W.unbind("resize.overlay");
                    if (this.el.hasClass("fancybox-lock")) {
                        $(".fancybox-margin").removeClass("fancybox-margin");
                        this.el.removeClass("fancybox-lock");
                        W.scrollTop(this.scrollV).scrollLeft(this.scrollH);
                    }
                    $(".fancybox-overlay").remove().hide();
                    $.extend(this, {
                        overlay: null,
                        fixed: false
                    });
                },
                update: function() {
                    var offsetWidth, width = "100%";
                    this.overlay.width(width).height("100%");
                    if (IE) {
                        offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                        if (D.width() > offsetWidth) width = D.width();
                    } else if (D.width() > W.width()) width = D.width();
                    this.overlay.width(width).height(D.height());
                },
                onReady: function(opts, obj) {
                    var overlay = this.overlay;
                    $(".fancybox-overlay").stop(true, true);
                    if (!overlay) this.create(opts);
                    if (opts.locked && this.fixed && obj.fixed) {
                        obj.locked = this.overlay.append(obj.wrap);
                        obj.fixed = false;
                    }
                    if (true === opts.showEarly) this.beforeShow.apply(this, arguments);
                },
                beforeShow: function(opts, obj) {
                    if (obj.locked && !this.el.hasClass("fancybox-lock")) {
                        if (false !== this.fixPosition) $("*").filter((function() {
                            return "fixed" === $(this).css("position") && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap");
                        })).addClass("fancybox-margin");
                        this.el.addClass("fancybox-margin");
                        this.scrollV = W.scrollTop();
                        this.scrollH = W.scrollLeft();
                        this.el.addClass("fancybox-lock");
                        W.scrollTop(this.scrollV).scrollLeft(this.scrollH);
                    }
                    this.open(opts);
                },
                onUpdate: function() {
                    if (!this.fixed) this.update();
                },
                afterClose: function(opts) {
                    if (this.overlay && !F.coming) this.overlay.fadeOut(opts.speedOut, $.proxy(this.close, this));
                }
            };
            F.helpers.title = {
                defaults: {
                    type: "float",
                    position: "bottom"
                },
                beforeShow: function(opts) {
                    var title, target, current = F.current, text = current.title, type = opts.type;
                    if ($.isFunction(text)) text = text.call(current.element, current);
                    if (!isString(text) || "" === $.trim(text)) return;
                    title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + "</div>");
                    switch (type) {
                      case "inside":
                        target = F.skin;
                        break;

                      case "outside":
                        target = F.wrap;
                        break;

                      case "over":
                        target = F.inner;
                        break;

                      default:
                        target = F.skin;
                        title.appendTo("body");
                        if (IE) title.width(title.width());
                        title.wrapInner('<span class="child"></span>');
                        F.current.margin[2] += Math.abs(getScalar(title.css("margin-bottom")));
                        break;
                    }
                    title["top" === opts.position ? "prependTo" : "appendTo"](target);
                }
            };
            $.fn.fancybox = function(options) {
                var index, that = $(this), selector = this.selector || "", run = function(e) {
                    var relType, relVal, what = $(this).blur(), idx = index;
                    if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is(".fancybox-wrap")) {
                        relType = options.groupAttr || "data-fancybox-group";
                        relVal = what.attr(relType);
                        if (!relVal) {
                            relType = "rel";
                            relVal = what.get(0)[relType];
                        }
                        if (relVal && "" !== relVal && "nofollow" !== relVal) {
                            what = selector.length ? $(selector) : that;
                            what = what.filter("[" + relType + '="' + relVal + '"]');
                            idx = what.index(this);
                        }
                        options.index = idx;
                        if (false !== F.open(what, options)) e.preventDefault();
                    }
                };
                options = options || {};
                index = options.index || 0;
                if (!selector || false === options.live) that.unbind("click.fb-start").bind("click.fb-start", run); else D.undelegate(selector, "click.fb-start").delegate(selector + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", run);
                this.filter("[data-fancybox-start=1]").trigger("click");
                return this;
            };
            D.ready((function() {
                var w1, w2;
                if ($.scrollbarWidth === undefined) $.scrollbarWidth = function() {
                    var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), child = parent.children(), width = child.innerWidth() - child.height(99).innerWidth();
                    parent.remove();
                    return width;
                };
                if ($.support.fixedPosition === undefined) $.support.fixedPosition = function() {
                    var elem = $('<div style="position:fixed;top:20px;"></div>').appendTo("body"), fixed = 20 === elem[0].offsetTop || 15 === elem[0].offsetTop;
                    elem.remove();
                    return fixed;
                }();
                $.extend(F.defaults, {
                    scrollbarWidth: $.scrollbarWidth(),
                    fixed: $.support.fixedPosition,
                    parent: $("body")
                });
                w1 = $(window).width();
                H.addClass("fancybox-lock-test");
                w2 = $(window).width();
                H.removeClass("fancybox-lock-test");
                $("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
            }));
        })(window, document, jQuery);
        (function(factory, jQuery, Zepto) {
            if ("function" === typeof define && define.amd) define([ "jquery" ], factory); else if ("object" === typeof exports && "undefined" === typeof Meteor) module.exports = factory(require("jquery")); else factory(jQuery || Zepto);
        })((function($) {
            "use strict";
            var Mask = function(el, mask, options) {
                var p = {
                    invalid: [],
                    getCaret: function() {
                        try {
                            var sel, pos = 0, ctrl = el.get(0), dSel = document.selection, cSelStart = ctrl.selectionStart;
                            if (dSel && -1 === navigator.appVersion.indexOf("MSIE 10")) {
                                sel = dSel.createRange();
                                sel.moveStart("character", -p.val().length);
                                pos = sel.text.length;
                            } else if (cSelStart || "0" === cSelStart) pos = cSelStart;
                            return pos;
                        } catch (e) {}
                    },
                    setCaret: function(pos) {
                        try {
                            if (el.is(":focus")) {
                                var range, ctrl = el.get(0);
                                if (ctrl.setSelectionRange) ctrl.setSelectionRange(pos, pos); else {
                                    range = ctrl.createTextRange();
                                    range.collapse(true);
                                    range.moveEnd("character", pos);
                                    range.moveStart("character", pos);
                                    range.select();
                                }
                            }
                        } catch (e) {}
                    },
                    events: function() {
                        el.on("keydown.mask", (function(e) {
                            el.data("mask-keycode", e.keyCode || e.which);
                            el.data("mask-previus-value", el.val());
                            el.data("mask-previus-caret-pos", p.getCaret());
                            p.maskDigitPosMapOld = p.maskDigitPosMap;
                        })).on($.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", p.behaviour).on("paste.mask drop.mask", (function() {
                            setTimeout((function() {
                                el.keydown().keyup();
                            }), 100);
                        })).on("change.mask", (function() {
                            el.data("changed", true);
                        })).on("blur.mask", (function() {
                            if (oldValue !== p.val() && !el.data("changed")) el.trigger("change");
                            el.data("changed", false);
                        })).on("blur.mask", (function() {
                            oldValue = p.val();
                        })).on("focus.mask", (function(e) {
                            if (true === options.selectOnFocus) $(e.target).select();
                        })).on("focusout.mask", (function() {
                            if (options.clearIfNotMatch && !regexMask.test(p.val())) p.val("");
                        }));
                    },
                    getRegexMask: function() {
                        var translation, pattern, optional, recursive, oRecursive, r, maskChunks = [];
                        for (var i = 0; i < mask.length; i++) {
                            translation = jMask.translation[mask.charAt(i)];
                            if (translation) {
                                pattern = translation.pattern.toString().replace(/.{1}$|^.{1}/g, "");
                                optional = translation.optional;
                                recursive = translation.recursive;
                                if (recursive) {
                                    maskChunks.push(mask.charAt(i));
                                    oRecursive = {
                                        digit: mask.charAt(i),
                                        pattern
                                    };
                                } else maskChunks.push(!optional && !recursive ? pattern : pattern + "?");
                            } else maskChunks.push(mask.charAt(i).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                        }
                        r = maskChunks.join("");
                        if (oRecursive) r = r.replace(new RegExp("(" + oRecursive.digit + "(.*" + oRecursive.digit + ")?)"), "($1)?").replace(new RegExp(oRecursive.digit, "g"), oRecursive.pattern);
                        return new RegExp(r);
                    },
                    destroyEvents: function() {
                        el.off([ "input", "keydown", "keyup", "paste", "drop", "blur", "focusout", "" ].join(".mask "));
                    },
                    val: function(v) {
                        var r, isInput = el.is("input"), method = isInput ? "val" : "text";
                        if (arguments.length > 0) {
                            if (el[method]() !== v) el[method](v);
                            r = el;
                        } else r = el[method]();
                        return r;
                    },
                    calculateCaretPosition: function(oldVal) {
                        var newVal = p.getMasked(), caretPosNew = p.getCaret();
                        if (oldVal !== newVal) {
                            var caretPosOld = el.data("mask-previus-caret-pos") || 0, newValL = newVal.length, oldValL = oldVal.length, maskDigitsBeforeCaret = 0, maskDigitsAfterCaret = 0, maskDigitsBeforeCaretAll = 0, maskDigitsBeforeCaretAllOld = 0, i = 0;
                            for (i = caretPosNew; i < newValL; i++) {
                                if (!p.maskDigitPosMap[i]) break;
                                maskDigitsAfterCaret++;
                            }
                            for (i = caretPosNew - 1; i >= 0; i--) {
                                if (!p.maskDigitPosMap[i]) break;
                                maskDigitsBeforeCaret++;
                            }
                            for (i = caretPosNew - 1; i >= 0; i--) if (p.maskDigitPosMap[i]) maskDigitsBeforeCaretAll++;
                            for (i = caretPosOld - 1; i >= 0; i--) if (p.maskDigitPosMapOld[i]) maskDigitsBeforeCaretAllOld++;
                            if (caretPosNew > oldValL) caretPosNew = 10 * newValL; else if (caretPosOld >= caretPosNew && caretPosOld !== oldValL) {
                                if (!p.maskDigitPosMapOld[caretPosNew]) {
                                    var caretPos = caretPosNew;
                                    caretPosNew -= maskDigitsBeforeCaretAllOld - maskDigitsBeforeCaretAll;
                                    caretPosNew -= maskDigitsBeforeCaret;
                                    if (p.maskDigitPosMap[caretPosNew]) caretPosNew = caretPos;
                                }
                            } else if (caretPosNew > caretPosOld) {
                                caretPosNew += maskDigitsBeforeCaretAll - maskDigitsBeforeCaretAllOld;
                                caretPosNew += maskDigitsAfterCaret;
                            }
                        }
                        return caretPosNew;
                    },
                    behaviour: function(e) {
                        e = e || window.event;
                        p.invalid = [];
                        var keyCode = el.data("mask-keycode");
                        if (-1 === $.inArray(keyCode, jMask.byPassKeys)) {
                            var newVal = p.getMasked(), caretPos = p.getCaret(), oldVal = el.data("mask-previus-value") || "";
                            setTimeout((function() {
                                p.setCaret(p.calculateCaretPosition(oldVal));
                            }), $.jMaskGlobals.keyStrokeCompensation);
                            p.val(newVal);
                            p.setCaret(caretPos);
                            return p.callbacks(e);
                        }
                    },
                    getMasked: function(skipMaskChars, val) {
                        var lastMaskChar, check, buf = [], value = void 0 === val ? p.val() : val + "", m = 0, maskLen = mask.length, v = 0, valLen = value.length, offset = 1, addMethod = "push", resetPos = -1, maskDigitCount = 0, maskDigitPosArr = [];
                        if (options.reverse) {
                            addMethod = "unshift";
                            offset = -1;
                            lastMaskChar = 0;
                            m = maskLen - 1;
                            v = valLen - 1;
                            check = function() {
                                return m > -1 && v > -1;
                            };
                        } else {
                            lastMaskChar = maskLen - 1;
                            check = function() {
                                return m < maskLen && v < valLen;
                            };
                        }
                        var lastUntranslatedMaskChar;
                        while (check()) {
                            var maskDigit = mask.charAt(m), valDigit = value.charAt(v), translation = jMask.translation[maskDigit];
                            if (translation) {
                                if (valDigit.match(translation.pattern)) {
                                    buf[addMethod](valDigit);
                                    if (translation.recursive) {
                                        if (-1 === resetPos) resetPos = m; else if (m === lastMaskChar && m !== resetPos) m = resetPos - offset;
                                        if (lastMaskChar === resetPos) m -= offset;
                                    }
                                    m += offset;
                                } else if (valDigit === lastUntranslatedMaskChar) {
                                    maskDigitCount--;
                                    lastUntranslatedMaskChar = void 0;
                                } else if (translation.optional) {
                                    m += offset;
                                    v -= offset;
                                } else if (translation.fallback) {
                                    buf[addMethod](translation.fallback);
                                    m += offset;
                                    v -= offset;
                                } else p.invalid.push({
                                    p: v,
                                    v: valDigit,
                                    e: translation.pattern
                                });
                                v += offset;
                            } else {
                                if (!skipMaskChars) buf[addMethod](maskDigit);
                                if (valDigit === maskDigit) {
                                    maskDigitPosArr.push(v);
                                    v += offset;
                                } else {
                                    lastUntranslatedMaskChar = maskDigit;
                                    maskDigitPosArr.push(v + maskDigitCount);
                                    maskDigitCount++;
                                }
                                m += offset;
                            }
                        }
                        var lastMaskCharDigit = mask.charAt(lastMaskChar);
                        if (maskLen === valLen + 1 && !jMask.translation[lastMaskCharDigit]) buf.push(lastMaskCharDigit);
                        var newVal = buf.join("");
                        p.mapMaskdigitPositions(newVal, maskDigitPosArr, valLen);
                        return newVal;
                    },
                    mapMaskdigitPositions: function(newVal, maskDigitPosArr, valLen) {
                        var maskDiff = options.reverse ? newVal.length - valLen : 0;
                        p.maskDigitPosMap = {};
                        for (var i = 0; i < maskDigitPosArr.length; i++) p.maskDigitPosMap[maskDigitPosArr[i] + maskDiff] = 1;
                    },
                    callbacks: function(e) {
                        var val = p.val(), changed = val !== oldValue, defaultArgs = [ val, e, el, options ], callback = function(name, criteria, args) {
                            if ("function" === typeof options[name] && criteria) options[name].apply(this, args);
                        };
                        callback("onChange", true === changed, defaultArgs);
                        callback("onKeyPress", true === changed, defaultArgs);
                        callback("onComplete", val.length === mask.length, defaultArgs);
                        callback("onInvalid", p.invalid.length > 0, [ val, e, el, p.invalid, options ]);
                    }
                };
                el = $(el);
                var regexMask, jMask = this, oldValue = p.val();
                mask = "function" === typeof mask ? mask(p.val(), void 0, el, options) : mask;
                jMask.mask = mask;
                jMask.options = options;
                jMask.remove = function() {
                    var caret = p.getCaret();
                    if (jMask.options.placeholder) el.removeAttr("placeholder");
                    if (el.data("mask-maxlength")) el.removeAttr("maxlength");
                    p.destroyEvents();
                    p.val(jMask.getCleanVal());
                    p.setCaret(caret);
                    return el;
                };
                jMask.getCleanVal = function() {
                    return p.getMasked(true);
                };
                jMask.getMaskedVal = function(val) {
                    return p.getMasked(false, val);
                };
                jMask.init = function(onlyMask) {
                    onlyMask = onlyMask || false;
                    options = options || {};
                    jMask.clearIfNotMatch = $.jMaskGlobals.clearIfNotMatch;
                    jMask.byPassKeys = $.jMaskGlobals.byPassKeys;
                    jMask.translation = $.extend({}, $.jMaskGlobals.translation, options.translation);
                    jMask = $.extend(true, {}, jMask, options);
                    regexMask = p.getRegexMask();
                    if (onlyMask) {
                        p.events();
                        p.val(p.getMasked());
                    } else {
                        if (options.placeholder) el.attr("placeholder", options.placeholder);
                        if (el.data("mask")) el.attr("autocomplete", "off");
                        for (var i = 0, maxlength = true; i < mask.length; i++) {
                            var translation = jMask.translation[mask.charAt(i)];
                            if (translation && translation.recursive) {
                                maxlength = false;
                                break;
                            }
                        }
                        if (maxlength) el.attr("maxlength", mask.length).data("mask-maxlength", true);
                        p.destroyEvents();
                        p.events();
                        var caret = p.getCaret();
                        p.val(p.getMasked());
                        p.setCaret(caret);
                    }
                };
                jMask.init(!el.is("input"));
            };
            $.maskWatchers = {};
            var HTMLAttributes = function() {
                var input = $(this), options = {}, prefix = "data-mask-", mask = input.attr("data-mask");
                if (input.attr(prefix + "reverse")) options.reverse = true;
                if (input.attr(prefix + "clearifnotmatch")) options.clearIfNotMatch = true;
                if ("true" === input.attr(prefix + "selectonfocus")) options.selectOnFocus = true;
                if (notSameMaskObject(input, mask, options)) return input.data("mask", new Mask(this, mask, options));
            }, notSameMaskObject = function(field, mask, options) {
                options = options || {};
                var maskObject = $(field).data("mask"), stringify = JSON.stringify, value = $(field).val() || $(field).text();
                try {
                    if ("function" === typeof mask) mask = mask(value);
                    return "object" !== typeof maskObject || stringify(maskObject.options) !== stringify(options) || maskObject.mask !== mask;
                } catch (e) {}
            }, eventSupported = function(eventName) {
                var isSupported, el = document.createElement("div");
                eventName = "on" + eventName;
                isSupported = eventName in el;
                if (!isSupported) {
                    el.setAttribute(eventName, "return;");
                    isSupported = "function" === typeof el[eventName];
                }
                el = null;
                return isSupported;
            };
            $.fn.mask = function(mask, options) {
                options = options || {};
                var selector = this.selector, globals = $.jMaskGlobals, interval = globals.watchInterval, watchInputs = options.watchInputs || globals.watchInputs, maskFunction = function() {
                    if (notSameMaskObject(this, mask, options)) return $(this).data("mask", new Mask(this, mask, options));
                };
                $(this).each(maskFunction);
                if (selector && "" !== selector && watchInputs) {
                    clearInterval($.maskWatchers[selector]);
                    $.maskWatchers[selector] = setInterval((function() {
                        $(document).find(selector).each(maskFunction);
                    }), interval);
                }
                return this;
            };
            $.fn.masked = function(val) {
                return this.data("mask").getMaskedVal(val);
            };
            $.fn.unmask = function() {
                clearInterval($.maskWatchers[this.selector]);
                delete $.maskWatchers[this.selector];
                return this.each((function() {
                    var dataMask = $(this).data("mask");
                    if (dataMask) dataMask.remove().removeData("mask");
                }));
            };
            $.fn.cleanVal = function() {
                return this.data("mask").getCleanVal();
            };
            $.applyDataMask = function(selector) {
                selector = selector || $.jMaskGlobals.maskElements;
                var $selector = selector instanceof $ ? selector : $(selector);
                $selector.filter($.jMaskGlobals.dataMaskAttr).each(HTMLAttributes);
            };
            var globals = {
                maskElements: "input,td,span,div",
                dataMaskAttr: "*[data-mask]",
                dataMask: true,
                watchInterval: 300,
                watchInputs: true,
                keyStrokeCompensation: 10,
                useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && eventSupported("input"),
                watchDataMask: false,
                byPassKeys: [ 9, 16, 17, 18, 36, 37, 38, 39, 40, 91 ],
                translation: {
                    0: {
                        pattern: /\d/
                    },
                    9: {
                        pattern: /\d/,
                        optional: true
                    },
                    "#": {
                        pattern: /\d/,
                        recursive: true
                    },
                    A: {
                        pattern: /[a-zA-Z0-9]/
                    },
                    S: {
                        pattern: /[a-zA-Z]/
                    }
                }
            };
            $.jMaskGlobals = $.jMaskGlobals || {};
            globals = $.jMaskGlobals = $.extend(true, {}, globals, $.jMaskGlobals);
            if (globals.dataMask) $.applyDataMask();
            setInterval((function() {
                if ($.jMaskGlobals.watchDataMask) $.applyDataMask();
            }), globals.watchInterval);
        }), window.jQuery, window.Zepto);
        $(document).ready((function() {
            $(".hamburger-menu").click((function() {
                $(this).toggleClass("open");
                $(".main-header__navigation").toggleClass("open");
                $("body").toggleClass("popup-open");
            }));
            $(".main-header__action--cart").click((function() {
                $("body").addClass("popup-open");
                $("#popup-basket").addClass("open");
                $(".popup-wrap").addClass("open");
            }));
            $(".get-callback").click((function() {
                $("body").addClass("popup-open");
                $("#call-back").addClass("open");
                $(".popup-wrap").addClass("open");
            }));
            $(".get-vacancy").click((function() {
                $("body").addClass("popup-open");
                $("#vacancy").addClass("open");
                $(".popup-wrap").addClass("open");
            }));
            $(".get-question").click((function() {
                $("body").addClass("popup-open");
                $("#popup-question").addClass("open");
                $(".popup-wrap").addClass("open");
            }));
            $(".kz-product-card__one-click").click((function() {
                $("body").addClass("popup-open");
                $("#buy-click").addClass("open");
                $(".popup-wrap").addClass("open");
            }));
            $(".product-card__one-click").click((function() {
                $("body").addClass("popup-open");
                $("#buy-click").addClass("open");
                $(".popup-wrap").addClass("open");
            }));
            $(".location").click((function() {
                $("body").addClass("popup-open");
                $("#popup-city").addClass("open");
                $(".popup-wrap").addClass("open");
            }));
            $(".fixed-buttons__button-review").click((function() {
                $("body").addClass("popup-open");
                $("#popup-review").addClass("open");
                $(".popup-wrap").addClass("open");
            }));
            $(document).mouseup((function(e) {
                var container = $(".popup");
                if (0 === container.has(e.target).length) {
                    $("body").removeClass("popup-open");
                    $(".popup").removeClass("open");
                    $(".popup-wrap").removeClass("open");
                }
            }));
            $(".popup .close").click((function() {
                $("body").removeClass("popup-open");
                $(".popup").removeClass("open");
                $(".popup-wrap").removeClass("open");
            }));
            $("input[name='phone']").mask("+7(999)999-99-99");
            $("#call-back").submit((function(event) {
                event.preventDefault();
                if ($('#call-back input[name="agree"]').is(":checked")) $.getJSON("/ajax/callback.php", {
                    phone: $('#call-back input[name="phone"]').val(),
                    name: $('#call-back input[name="name"]').val(),
                    agree: $('#call-back input[name="agree"]').val()
                }, (function(data) {
                    if ("ok" == data.status) $("#call-back .form-block").html('<div class="success">Ваша заявка на обратный звонок принята! Скоро с Вами свяжется менеджер</div>'); else $("#call-back .error").append('<div class="error">' + data.msg + "</div>");
                })); else $("#call-back .error").append('<div class="error">Подтвердите согласие на обработку персональных данных</div>');
            }));
            $("#has-question").submit((function(event) {
                event.preventDefault();
                $.getJSON("/ajax/callback.php", {
                    phone: $('#has-question input[name="phone"]').val(),
                    name: "Заявка с формы на главной странице"
                }, (function(data) {
                    if ("ok" == data.status) $(".has-question .form-block").html('<div class="success">Ваша заявка принята! Скоро с Вами свяжется менеджер</div>'); else $(".has-question .error").append('<div class="error">' + data.msg + "</div>");
                }));
            }));
            $(".faq__item .icon").click((function() {
                const parent = $(this).parents(".faq__item");
                const items = $(".faq__item .answer");
                if (!parent.hasClass("active")) {
                    items.each((function() {
                        if ("block" === $(this).css("display")) {
                            $(this).parents(".faq__item").toggleClass("active");
                            $(this).slideToggle();
                        }
                    }));
                    parent.toggleClass("active");
                    parent.find(".answer").slideToggle();
                    return;
                }
                if (parent.hasClass("active")) {
                    parent.toggleClass("active");
                    parent.find(".answer").slideToggle();
                    return;
                }
            }));
            $(".aside_category-body").css("display", "none");
            $(".aside_category-block-title").click((function() {
                const parent = $(this).parents(".aside_category_block");
                parent.toggleClass("active");
                parent.find(".aside_category-body").slideToggle();
            }));
            $(".vacancies__item-title").click((function() {
                const parent = $(this).parents(".vacancies__item");
                const items = $(".vacancies__item .vacancies__item-body");
                if (!parent.hasClass("active")) {
                    items.each((function() {
                        if ("block" === $(this).css("display")) {
                            $(this).parents(".vacancies__item").toggleClass("active");
                            $(this).slideToggle();
                        }
                    }));
                    parent.toggleClass("active");
                    parent.find(".vacancies__item-body").slideToggle();
                    return;
                }
                if (parent.hasClass("active")) {
                    parent.toggleClass("active");
                    parent.find(".vacancies__item-body").slideToggle();
                    return;
                }
            }));
            $(".aside_category-facts-title").click((function() {
                const parent = $(this).parents(".aside_category-facts-item");
                parent.toggleClass("active");
                parent.find(".aside_category-facts-body").slideToggle();
            }));
            $(".category_items-more").click((function() {
                const parent = $(this).parents(".category_items-list");
                parent.find(".category_item").removeAttr("hidden");
                $(this).hide();
            }));
            $(".aside_category-top").css("display", "none");
            $(".aside_category_btn").click((function() {
                const parent = $(this).parents(".aside_category");
                parent.toggleClass("active");
                parent.find(".aside_category-top").slideToggle();
            }));
        }));
        $(document).ready((function() {
            $(".products-collection__filter-btn").click((function() {
                const type = $(this).attr("data-type");
                $(".products-collection__filter-btn").removeClass("active");
                $(this).addClass("active");
                $(".products-collection__slide").removeClass("selected");
                $(".products-collection__slide[data-type='" + type + "']").addClass("selected");
            }));
            $(".kz-product-description__tab").click((function() {
                const type = $(this).attr("data-type");
                $(".kz-product-description__tab").removeClass("active");
                $(this).addClass("active");
                $(".kz-product-description__content").removeClass("selected");
                $(".kz-product-description__content[data-type='" + type + "']").addClass("selected");
            }));
            $(".kz-product-description__availability-tab").click((function() {
                const type = $(this).attr("data-type");
                $(".kz-product-description__availability-tab").removeClass("active");
                $(this).addClass("active");
                $(".kz-product-description__availability-body").removeClass("selected");
                $(".kz-product-description__availability-body[data-type='" + type + "']").addClass("selected");
            }));
            $(".blog__filter-btn").click((function() {
                const type = $(this).attr("data-type");
                $(".blog__filter-btn").removeClass("active");
                $(this).addClass("active");
                if ("ALL" === type) {
                    $(".blog__item").addClass("selected");
                    $(".blog__aside").css("display", "none");
                } else {
                    $(".blog__item").removeClass("selected");
                    $(".blog__item[data-type='" + type + "']").addClass("selected");
                    $(".blog__aside").css("display", "block");
                }
            }));
        }));
        $(document).ready((function() {
            $(".tab-nav__item").click((function() {
                const parent = $(this).parents(".tab");
                parent.find(".tab-nav__item").removeClass("active");
                $(this).addClass("active");
                const type = $(this).attr("data-type");
                parent.find(".tab-value__item").removeClass("active");
                parent.find(".tab-value__item[data-type='" + type + "']").addClass("active");
            }));
        }));
        (function(factory) {
            if ("function" === typeof define && define.amd) define([ "jquery", "../version", "../keycode" ], factory); else factory(jQuery);
        })((function($) {
            $.extend($.ui, {
                datepicker: {
                    version: "@VERSION"
                }
            });
            var datepicker_instActive;
            function datepicker_getZindex(elem) {
                var position, value;
                while (elem.length && elem[0] !== document) {
                    position = elem.css("position");
                    if ("absolute" === position || "relative" === position || "fixed" === position) {
                        value = parseInt(elem.css("zIndex"), 10);
                        if (!isNaN(value) && 0 !== value) return value;
                    }
                    elem = elem.parent();
                }
                return 0;
            }
            function Datepicker() {
                this._curInst = null;
                this._keyEvent = false;
                this._disabledInputs = [];
                this._datepickerShowing = false;
                this._inDialog = false;
                this._mainDivId = "ui-datepicker-div";
                this._inlineClass = "ui-datepicker-inline";
                this._appendClass = "ui-datepicker-append";
                this._triggerClass = "ui-datepicker-trigger";
                this._dialogClass = "ui-datepicker-dialog";
                this._disableClass = "ui-datepicker-disabled";
                this._unselectableClass = "ui-datepicker-unselectable";
                this._currentClass = "ui-datepicker-current-day";
                this._dayOverClass = "ui-datepicker-days-cell-over";
                this.regional = [];
                this.regional[""] = {
                    closeText: "Done",
                    prevText: "Prev",
                    nextText: "Next",
                    currentText: "Today",
                    monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
                    monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                    dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
                    dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
                    dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
                    weekHeader: "Wk",
                    dateFormat: "mm/dd/yy",
                    firstDay: 0,
                    isRTL: false,
                    showMonthAfterYear: false,
                    yearSuffix: ""
                };
                this._defaults = {
                    showOn: "focus",
                    showAnim: "fadeIn",
                    showOptions: {},
                    defaultDate: null,
                    appendText: "",
                    buttonText: "...",
                    buttonImage: "",
                    buttonImageOnly: false,
                    hideIfNoPrevNext: false,
                    navigationAsDateFormat: false,
                    gotoCurrent: false,
                    changeMonth: false,
                    changeYear: false,
                    yearRange: "c-10:c+10",
                    showOtherMonths: false,
                    selectOtherMonths: false,
                    showWeek: false,
                    calculateWeek: this.iso8601Week,
                    shortYearCutoff: "+10",
                    minDate: null,
                    maxDate: null,
                    duration: "fast",
                    beforeShowDay: null,
                    beforeShow: null,
                    onSelect: null,
                    onChangeMonthYear: null,
                    onClose: null,
                    numberOfMonths: 1,
                    showCurrentAtPos: 0,
                    stepMonths: 1,
                    stepBigMonths: 12,
                    altField: "",
                    altFormat: "",
                    constrainInput: true,
                    showButtonPanel: false,
                    autoSize: false,
                    disabled: false
                };
                $.extend(this._defaults, this.regional[""]);
                this.regional.en = $.extend(true, {}, this.regional[""]);
                this.regional["en-US"] = $.extend(true, {}, this.regional.en);
                this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
            }
            $.extend(Datepicker.prototype, {
                markerClassName: "hasDatepicker",
                maxRows: 4,
                _widgetDatepicker: function() {
                    return this.dpDiv;
                },
                setDefaults: function(settings) {
                    datepicker_extendRemove(this._defaults, settings || {});
                    return this;
                },
                _attachDatepicker: function(target, settings) {
                    var nodeName, inline, inst;
                    nodeName = target.nodeName.toLowerCase();
                    inline = "div" === nodeName || "span" === nodeName;
                    if (!target.id) {
                        this.uuid += 1;
                        target.id = "dp" + this.uuid;
                    }
                    inst = this._newInst($(target), inline);
                    inst.settings = $.extend({}, settings || {});
                    if ("input" === nodeName) this._connectDatepicker(target, inst); else if (inline) this._inlineDatepicker(target, inst);
                },
                _newInst: function(target, inline) {
                    var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
                    return {
                        id,
                        input: target,
                        selectedDay: 0,
                        selectedMonth: 0,
                        selectedYear: 0,
                        drawMonth: 0,
                        drawYear: 0,
                        inline,
                        dpDiv: !inline ? this.dpDiv : datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
                    };
                },
                _connectDatepicker: function(target, inst) {
                    var input = $(target);
                    inst.append = $([]);
                    inst.trigger = $([]);
                    if (input.hasClass(this.markerClassName)) return;
                    this._attachments(input, inst);
                    input.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp);
                    this._autoSize(inst);
                    $.data(target, "datepicker", inst);
                    if (inst.settings.disabled) this._disableDatepicker(target);
                },
                _attachments: function(input, inst) {
                    var showOn, buttonText, buttonImage, appendText = this._get(inst, "appendText"), isRTL = this._get(inst, "isRTL");
                    if (inst.append) inst.append.remove();
                    if (appendText) {
                        inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");
                        input[isRTL ? "before" : "after"](inst.append);
                    }
                    input.off("focus", this._showDatepicker);
                    if (inst.trigger) inst.trigger.remove();
                    showOn = this._get(inst, "showOn");
                    if ("focus" === showOn || "both" === showOn) input.on("focus", this._showDatepicker);
                    if ("button" === showOn || "both" === showOn) {
                        buttonText = this._get(inst, "buttonText");
                        buttonImage = this._get(inst, "buttonImage");
                        inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                            src: buttonImage,
                            alt: buttonText,
                            title: buttonText
                        }) : $("<button type='button'></button>").addClass(this._triggerClass).html(!buttonImage ? buttonText : $("<img/>").attr({
                            src: buttonImage,
                            alt: buttonText,
                            title: buttonText
                        })));
                        input[isRTL ? "before" : "after"](inst.trigger);
                        inst.trigger.on("click", (function() {
                            if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) $.datepicker._hideDatepicker(); else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
                                $.datepicker._hideDatepicker();
                                $.datepicker._showDatepicker(input[0]);
                            } else $.datepicker._showDatepicker(input[0]);
                            return false;
                        }));
                    }
                },
                _autoSize: function(inst) {
                    if (this._get(inst, "autoSize") && !inst.inline) {
                        var findMax, max, maxI, i, date = new Date(2009, 12 - 1, 20), dateFormat = this._get(inst, "dateFormat");
                        if (dateFormat.match(/[DM]/)) {
                            findMax = function(names) {
                                max = 0;
                                maxI = 0;
                                for (i = 0; i < names.length; i++) if (names[i].length > max) {
                                    max = names[i].length;
                                    maxI = i;
                                }
                                return maxI;
                            };
                            date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort")));
                            date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - date.getDay());
                        }
                        inst.input.attr("size", this._formatDate(inst, date).length);
                    }
                },
                _inlineDatepicker: function(target, inst) {
                    var divSpan = $(target);
                    if (divSpan.hasClass(this.markerClassName)) return;
                    divSpan.addClass(this.markerClassName).append(inst.dpDiv);
                    $.data(target, "datepicker", inst);
                    this._setDate(inst, this._getDefaultDate(inst), true);
                    this._updateDatepicker(inst);
                    this._updateAlternate(inst);
                    if (inst.settings.disabled) this._disableDatepicker(target);
                    inst.dpDiv.css("display", "block");
                },
                _dialogDatepicker: function(input, date, onSelect, settings, pos) {
                    var id, browserWidth, browserHeight, scrollX, scrollY, inst = this._dialogInst;
                    if (!inst) {
                        this.uuid += 1;
                        id = "dp" + this.uuid;
                        this._dialogInput = $("<input type='text' id='" + id + "' style='position: absolute; top: -100px; width: 0px;'/>");
                        this._dialogInput.on("keydown", this._doKeyDown);
                        $("body").append(this._dialogInput);
                        inst = this._dialogInst = this._newInst(this._dialogInput, false);
                        inst.settings = {};
                        $.data(this._dialogInput[0], "datepicker", inst);
                    }
                    datepicker_extendRemove(inst.settings, settings || {});
                    date = date && date.constructor === Date ? this._formatDate(inst, date) : date;
                    this._dialogInput.val(date);
                    this._pos = pos ? pos.length ? pos : [ pos.pageX, pos.pageY ] : null;
                    if (!this._pos) {
                        browserWidth = document.documentElement.clientWidth;
                        browserHeight = document.documentElement.clientHeight;
                        scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                        scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                        this._pos = [ browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY ];
                    }
                    this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
                    inst.settings.onSelect = onSelect;
                    this._inDialog = true;
                    this.dpDiv.addClass(this._dialogClass);
                    this._showDatepicker(this._dialogInput[0]);
                    if ($.blockUI) $.blockUI(this.dpDiv);
                    $.data(this._dialogInput[0], "datepicker", inst);
                    return this;
                },
                _destroyDatepicker: function(target) {
                    var nodeName, $target = $(target), inst = $.data(target, "datepicker");
                    if (!$target.hasClass(this.markerClassName)) return;
                    nodeName = target.nodeName.toLowerCase();
                    $.removeData(target, "datepicker");
                    if ("input" === nodeName) {
                        inst.append.remove();
                        inst.trigger.remove();
                        $target.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp);
                    } else if ("div" === nodeName || "span" === nodeName) $target.removeClass(this.markerClassName).empty();
                    if (datepicker_instActive === inst) {
                        datepicker_instActive = null;
                        this._curInst = null;
                    }
                },
                _enableDatepicker: function(target) {
                    var nodeName, inline, $target = $(target), inst = $.data(target, "datepicker");
                    if (!$target.hasClass(this.markerClassName)) return;
                    nodeName = target.nodeName.toLowerCase();
                    if ("input" === nodeName) {
                        target.disabled = false;
                        inst.trigger.filter("button").each((function() {
                            this.disabled = false;
                        })).end().filter("img").css({
                            opacity: "1.0",
                            cursor: ""
                        });
                    } else if ("div" === nodeName || "span" === nodeName) {
                        inline = $target.children("." + this._inlineClass);
                        inline.children().removeClass("ui-state-disabled");
                        inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false);
                    }
                    this._disabledInputs = $.map(this._disabledInputs, (function(value) {
                        return value === target ? null : value;
                    }));
                },
                _disableDatepicker: function(target) {
                    var nodeName, inline, $target = $(target), inst = $.data(target, "datepicker");
                    if (!$target.hasClass(this.markerClassName)) return;
                    nodeName = target.nodeName.toLowerCase();
                    if ("input" === nodeName) {
                        target.disabled = true;
                        inst.trigger.filter("button").each((function() {
                            this.disabled = true;
                        })).end().filter("img").css({
                            opacity: "0.5",
                            cursor: "default"
                        });
                    } else if ("div" === nodeName || "span" === nodeName) {
                        inline = $target.children("." + this._inlineClass);
                        inline.children().addClass("ui-state-disabled");
                        inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true);
                    }
                    this._disabledInputs = $.map(this._disabledInputs, (function(value) {
                        return value === target ? null : value;
                    }));
                    this._disabledInputs[this._disabledInputs.length] = target;
                },
                _isDisabledDatepicker: function(target) {
                    if (!target) return false;
                    for (var i = 0; i < this._disabledInputs.length; i++) if (this._disabledInputs[i] === target) return true;
                    return false;
                },
                _getInst: function(target) {
                    try {
                        return $.data(target, "datepicker");
                    } catch (err) {
                        throw "Missing instance data for this datepicker";
                    }
                },
                _optionDatepicker: function(target, name, value) {
                    var settings, date, minDate, maxDate, inst = this._getInst(target);
                    if (2 === arguments.length && "string" === typeof name) return "defaults" === name ? $.extend({}, $.datepicker._defaults) : inst ? "all" === name ? $.extend({}, inst.settings) : this._get(inst, name) : null;
                    settings = name || {};
                    if ("string" === typeof name) {
                        settings = {};
                        settings[name] = value;
                    }
                    if (inst) {
                        if (this._curInst === inst) this._hideDatepicker();
                        date = this._getDateDatepicker(target, true);
                        minDate = this._getMinMaxDate(inst, "min");
                        maxDate = this._getMinMaxDate(inst, "max");
                        datepicker_extendRemove(inst.settings, settings);
                        if (null !== minDate && void 0 !== settings.dateFormat && void 0 === settings.minDate) inst.settings.minDate = this._formatDate(inst, minDate);
                        if (null !== maxDate && void 0 !== settings.dateFormat && void 0 === settings.maxDate) inst.settings.maxDate = this._formatDate(inst, maxDate);
                        if ("disabled" in settings) if (settings.disabled) this._disableDatepicker(target); else this._enableDatepicker(target);
                        this._attachments($(target), inst);
                        this._autoSize(inst);
                        this._setDate(inst, date);
                        this._updateAlternate(inst);
                        this._updateDatepicker(inst);
                    }
                },
                _changeDatepicker: function(target, name, value) {
                    this._optionDatepicker(target, name, value);
                },
                _refreshDatepicker: function(target) {
                    var inst = this._getInst(target);
                    if (inst) this._updateDatepicker(inst);
                },
                _setDateDatepicker: function(target, date) {
                    var inst = this._getInst(target);
                    if (inst) {
                        this._setDate(inst, date);
                        this._updateDatepicker(inst);
                        this._updateAlternate(inst);
                    }
                },
                _getDateDatepicker: function(target, noDefault) {
                    var inst = this._getInst(target);
                    if (inst && !inst.inline) this._setDateFromField(inst, noDefault);
                    return inst ? this._getDate(inst) : null;
                },
                _doKeyDown: function(event) {
                    var onSelect, dateStr, sel, inst = $.datepicker._getInst(event.target), handled = true, isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
                    inst._keyEvent = true;
                    if ($.datepicker._datepickerShowing) switch (event.keyCode) {
                      case 9:
                        $.datepicker._hideDatepicker();
                        handled = false;
                        break;

                      case 13:
                        sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv);
                        if (sel[0]) $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
                        onSelect = $.datepicker._get(inst, "onSelect");
                        if (onSelect) {
                            dateStr = $.datepicker._formatDate(inst);
                            onSelect.apply(inst.input ? inst.input[0] : null, [ dateStr, inst ]);
                        } else $.datepicker._hideDatepicker();
                        return false;

                      case 27:
                        $.datepicker._hideDatepicker();
                        break;

                      case 33:
                        $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                        break;

                      case 34:
                        $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                        break;

                      case 35:
                        if (event.ctrlKey || event.metaKey) $.datepicker._clearDate(event.target);
                        handled = event.ctrlKey || event.metaKey;
                        break;

                      case 36:
                        if (event.ctrlKey || event.metaKey) $.datepicker._gotoToday(event.target);
                        handled = event.ctrlKey || event.metaKey;
                        break;

                      case 37:
                        if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, isRTL ? +1 : -1, "D");
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                        break;

                      case 38:
                        if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, -7, "D");
                        handled = event.ctrlKey || event.metaKey;
                        break;

                      case 39:
                        if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, isRTL ? -1 : +1, "D");
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                        break;

                      case 40:
                        if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, +7, "D");
                        handled = event.ctrlKey || event.metaKey;
                        break;

                      default:
                        handled = false;
                    } else if (36 === event.keyCode && event.ctrlKey) $.datepicker._showDatepicker(this); else handled = false;
                    if (handled) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                },
                _doKeyPress: function(event) {
                    var chars, chr, inst = $.datepicker._getInst(event.target);
                    if ($.datepicker._get(inst, "constrainInput")) {
                        chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
                        chr = String.fromCharCode(null == event.charCode ? event.keyCode : event.charCode);
                        return event.ctrlKey || event.metaKey || chr < " " || !chars || chars.indexOf(chr) > -1;
                    }
                },
                _doKeyUp: function(event) {
                    var date, inst = $.datepicker._getInst(event.target);
                    if (inst.input.val() !== inst.lastVal) try {
                        date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() : null, $.datepicker._getFormatConfig(inst));
                        if (date) {
                            $.datepicker._setDateFromField(inst);
                            $.datepicker._updateAlternate(inst);
                            $.datepicker._updateDatepicker(inst);
                        }
                    } catch (err) {}
                    return true;
                },
                _showDatepicker: function(input) {
                    input = input.target || input;
                    if ("input" !== input.nodeName.toLowerCase()) input = $("input", input.parentNode)[0];
                    if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) return;
                    var inst, beforeShow, beforeShowSettings, isFixed, offset, showAnim, duration;
                    inst = $.datepicker._getInst(input);
                    if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
                        $.datepicker._curInst.dpDiv.stop(true, true);
                        if (inst && $.datepicker._datepickerShowing) $.datepicker._hideDatepicker($.datepicker._curInst.input[0]);
                    }
                    beforeShow = $.datepicker._get(inst, "beforeShow");
                    beforeShowSettings = beforeShow ? beforeShow.apply(input, [ input, inst ]) : {};
                    if (false === beforeShowSettings) return;
                    datepicker_extendRemove(inst.settings, beforeShowSettings);
                    inst.lastVal = null;
                    $.datepicker._lastInput = input;
                    $.datepicker._setDateFromField(inst);
                    if ($.datepicker._inDialog) input.value = "";
                    if (!$.datepicker._pos) {
                        $.datepicker._pos = $.datepicker._findPos(input);
                        $.datepicker._pos[1] += input.offsetHeight;
                    }
                    isFixed = false;
                    $(input).parents().each((function() {
                        isFixed |= "fixed" === $(this).css("position");
                        return !isFixed;
                    }));
                    offset = {
                        left: $.datepicker._pos[0],
                        top: $.datepicker._pos[1]
                    };
                    $.datepicker._pos = null;
                    inst.dpDiv.empty();
                    inst.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    });
                    $.datepicker._updateDatepicker(inst);
                    offset = $.datepicker._checkOffset(inst, offset, isFixed);
                    inst.dpDiv.css({
                        position: $.datepicker._inDialog && $.blockUI ? "static" : isFixed ? "fixed" : "absolute",
                        display: "none",
                        left: offset.left + "px",
                        top: offset.top + "px"
                    });
                    if (!inst.inline) {
                        showAnim = $.datepicker._get(inst, "showAnim");
                        duration = $.datepicker._get(inst, "duration");
                        inst.dpDiv.css("z-index", datepicker_getZindex($(input)) + 1);
                        $.datepicker._datepickerShowing = true;
                        if ($.effects && $.effects.effect[showAnim]) inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration); else inst.dpDiv[showAnim || "show"](showAnim ? duration : null);
                        if ($.datepicker._shouldFocusInput(inst)) inst.input.trigger("focus");
                        $.datepicker._curInst = inst;
                    }
                },
                _updateDatepicker: function(inst) {
                    this.maxRows = 4;
                    datepicker_instActive = inst;
                    inst.dpDiv.empty().append(this._generateHTML(inst));
                    this._attachHandlers(inst);
                    var origyearshtml, numMonths = this._getNumberOfMonths(inst), cols = numMonths[1], width = 17, activeCell = inst.dpDiv.find("." + this._dayOverClass + " a");
                    if (activeCell.length > 0) datepicker_handleMouseover.apply(activeCell.get(0));
                    inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
                    if (cols > 1) inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", width * cols + "em");
                    inst.dpDiv[(1 !== numMonths[0] || 1 !== numMonths[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi");
                    inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
                    if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(inst)) inst.input.trigger("focus");
                    if (inst.yearshtml) {
                        origyearshtml = inst.yearshtml;
                        setTimeout((function() {
                            if (origyearshtml === inst.yearshtml && inst.yearshtml) inst.dpDiv.find("select.ui-datepicker-year").first().replaceWith(inst.yearshtml);
                            origyearshtml = inst.yearshtml = null;
                        }), 0);
                    }
                },
                _shouldFocusInput: function(inst) {
                    return inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && !inst.input.is(":focus");
                },
                _checkOffset: function(inst, offset, isFixed) {
                    var dpWidth = inst.dpDiv.outerWidth(), dpHeight = inst.dpDiv.outerHeight(), inputWidth = inst.input ? inst.input.outerWidth() : 0, inputHeight = inst.input ? inst.input.outerHeight() : 0, viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()), viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
                    offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0;
                    offset.left -= isFixed && offset.left === inst.input.offset().left ? $(document).scrollLeft() : 0;
                    offset.top -= isFixed && offset.top === inst.input.offset().top + inputHeight ? $(document).scrollTop() : 0;
                    offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
                    offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) : 0);
                    return offset;
                },
                _findPos: function(obj) {
                    var position, inst = this._getInst(obj), isRTL = this._get(inst, "isRTL");
                    while (obj && ("hidden" === obj.type || 1 !== obj.nodeType || $.expr.pseudos.hidden(obj))) obj = obj[isRTL ? "previousSibling" : "nextSibling"];
                    position = $(obj).offset();
                    return [ position.left, position.top ];
                },
                _hideDatepicker: function(input) {
                    var showAnim, duration, postProcess, onClose, inst = this._curInst;
                    if (!inst || input && inst !== $.data(input, "datepicker")) return;
                    if (this._datepickerShowing) {
                        showAnim = this._get(inst, "showAnim");
                        duration = this._get(inst, "duration");
                        postProcess = function() {
                            $.datepicker._tidyDialog(inst);
                        };
                        if ($.effects && ($.effects.effect[showAnim] || $.effects[showAnim])) inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess); else inst.dpDiv["slideDown" === showAnim ? "slideUp" : "fadeIn" === showAnim ? "fadeOut" : "hide"](showAnim ? duration : null, postProcess);
                        if (!showAnim) postProcess();
                        this._datepickerShowing = false;
                        onClose = this._get(inst, "onClose");
                        if (onClose) onClose.apply(inst.input ? inst.input[0] : null, [ inst.input ? inst.input.val() : "", inst ]);
                        this._lastInput = null;
                        if (this._inDialog) {
                            this._dialogInput.css({
                                position: "absolute",
                                left: "0",
                                top: "-100px"
                            });
                            if ($.blockUI) {
                                $.unblockUI();
                                $("body").append(this.dpDiv);
                            }
                        }
                        this._inDialog = false;
                    }
                },
                _tidyDialog: function(inst) {
                    inst.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
                },
                _checkExternalClick: function(event) {
                    if (!$.datepicker._curInst) return;
                    var $target = $(event.target), inst = $.datepicker._getInst($target[0]);
                    if ($target[0].id !== $.datepicker._mainDivId && 0 === $target.parents("#" + $.datepicker._mainDivId).length && !$target.hasClass($.datepicker.markerClassName) && !$target.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) || $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst) $.datepicker._hideDatepicker();
                },
                _adjustDate: function(id, offset, period) {
                    var target = $(id), inst = this._getInst(target[0]);
                    if (this._isDisabledDatepicker(target[0])) return;
                    this._adjustInstDate(inst, offset, period);
                    this._updateDatepicker(inst);
                },
                _gotoToday: function(id) {
                    var date, target = $(id), inst = this._getInst(target[0]);
                    if (this._get(inst, "gotoCurrent") && inst.currentDay) {
                        inst.selectedDay = inst.currentDay;
                        inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                        inst.drawYear = inst.selectedYear = inst.currentYear;
                    } else {
                        date = new Date;
                        inst.selectedDay = date.getDate();
                        inst.drawMonth = inst.selectedMonth = date.getMonth();
                        inst.drawYear = inst.selectedYear = date.getFullYear();
                    }
                    this._notifyChange(inst);
                    this._adjustDate(target);
                },
                _selectMonthYear: function(id, select, period) {
                    var target = $(id), inst = this._getInst(target[0]);
                    inst["selected" + ("M" === period ? "Month" : "Year")] = inst["draw" + ("M" === period ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);
                    this._notifyChange(inst);
                    this._adjustDate(target);
                },
                _selectDay: function(id, month, year, td) {
                    var inst, target = $(id);
                    if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) return;
                    inst = this._getInst(target[0]);
                    inst.selectedDay = inst.currentDay = $("a", td).html();
                    inst.selectedMonth = inst.currentMonth = month;
                    inst.selectedYear = inst.currentYear = year;
                    this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
                },
                _clearDate: function(id) {
                    var target = $(id);
                    this._selectDate(target, "");
                },
                _selectDate: function(id, dateStr) {
                    var onSelect, target = $(id), inst = this._getInst(target[0]);
                    dateStr = null != dateStr ? dateStr : this._formatDate(inst);
                    if (inst.input) inst.input.val(dateStr);
                    this._updateAlternate(inst);
                    onSelect = this._get(inst, "onSelect");
                    if (onSelect) onSelect.apply(inst.input ? inst.input[0] : null, [ dateStr, inst ]); else if (inst.input) inst.input.trigger("change");
                    if (inst.inline) this._updateDatepicker(inst); else {
                        this._hideDatepicker();
                        this._lastInput = inst.input[0];
                        if ("object" !== typeof inst.input[0]) inst.input.trigger("focus");
                        this._lastInput = null;
                    }
                },
                _updateAlternate: function(inst) {
                    var altFormat, date, dateStr, altField = this._get(inst, "altField");
                    if (altField) {
                        altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
                        date = this._getDate(inst);
                        dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                        $(altField).val(dateStr);
                    }
                },
                noWeekends: function(date) {
                    var day = date.getDay();
                    return [ day > 0 && day < 6, "" ];
                },
                iso8601Week: function(date) {
                    var time, checkDate = new Date(date.getTime());
                    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
                    time = checkDate.getTime();
                    checkDate.setMonth(0);
                    checkDate.setDate(1);
                    return Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1;
                },
                parseDate: function(format, value, settings) {
                    if (null == format || null == value) throw "Invalid arguments";
                    value = "object" === typeof value ? value.toString() : value + "";
                    if ("" === value) return null;
                    var iFormat, dim, extra, date, iValue = 0, shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff, shortYearCutoff = "string" !== typeof shortYearCutoffTemp ? shortYearCutoffTemp : (new Date).getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10), dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, year = -1, month = -1, day = -1, doy = -1, literal = false, lookAhead = function(match) {
                        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                        if (matches) iFormat++;
                        return matches;
                    }, getNumber = function(match) {
                        var isDoubled = lookAhead(match), size = "@" === match ? 14 : "!" === match ? 20 : "y" === match && isDoubled ? 4 : "o" === match ? 3 : 2, minSize = "y" === match ? size : 1, digits = new RegExp("^\\d{" + minSize + "," + size + "}"), num = value.substring(iValue).match(digits);
                        if (!num) throw "Missing number at position " + iValue;
                        iValue += num[0].length;
                        return parseInt(num[0], 10);
                    }, getName = function(match, shortNames, longNames) {
                        var index = -1, names = $.map(lookAhead(match) ? longNames : shortNames, (function(v, k) {
                            return [ [ k, v ] ];
                        })).sort((function(a, b) {
                            return -(a[1].length - b[1].length);
                        }));
                        $.each(names, (function(i, pair) {
                            var name = pair[1];
                            if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
                                index = pair[0];
                                iValue += name.length;
                                return false;
                            }
                        }));
                        if (-1 !== index) return index + 1; else throw "Unknown name at position " + iValue;
                    }, checkLiteral = function() {
                        if (value.charAt(iValue) !== format.charAt(iFormat)) throw "Unexpected literal at position " + iValue;
                        iValue++;
                    };
                    for (iFormat = 0; iFormat < format.length; iFormat++) if (literal) if ("'" === format.charAt(iFormat) && !lookAhead("'")) literal = false; else checkLiteral(); else switch (format.charAt(iFormat)) {
                      case "d":
                        day = getNumber("d");
                        break;

                      case "D":
                        getName("D", dayNamesShort, dayNames);
                        break;

                      case "o":
                        doy = getNumber("o");
                        break;

                      case "m":
                        month = getNumber("m");
                        break;

                      case "M":
                        month = getName("M", monthNamesShort, monthNames);
                        break;

                      case "y":
                        year = getNumber("y");
                        break;

                      case "@":
                        date = new Date(getNumber("@"));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;

                      case "!":
                        date = new Date((getNumber("!") - this._ticksTo1970) / 1e4);
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;

                      case "'":
                        if (lookAhead("'")) checkLiteral(); else literal = true;
                        break;

                      default:
                        checkLiteral();
                    }
                    if (iValue < value.length) {
                        extra = value.substr(iValue);
                        if (!/^\s+/.test(extra)) throw "Extra/unparsed characters found in date: " + extra;
                    }
                    if (-1 === year) year = (new Date).getFullYear(); else if (year < 100) year += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
                    if (doy > -1) {
                        month = 1;
                        day = doy;
                        do {
                            dim = this._getDaysInMonth(year, month - 1);
                            if (day <= dim) break;
                            month++;
                            day -= dim;
                        } while (true);
                    }
                    date = this._daylightSavingAdjust(new Date(year, month - 1, day));
                    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) throw "Invalid date";
                    return date;
                },
                ATOM: "yy-mm-dd",
                COOKIE: "D, dd M yy",
                ISO_8601: "yy-mm-dd",
                RFC_822: "D, d M y",
                RFC_850: "DD, dd-M-y",
                RFC_1036: "D, d M y",
                RFC_1123: "D, d M yy",
                RFC_2822: "D, d M yy",
                RSS: "D, d M y",
                TICKS: "!",
                TIMESTAMP: "@",
                W3C: "yy-mm-dd",
                _ticksTo1970: 24 * (365 * (1970 - 1) + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 60 * 60 * 1e7,
                formatDate: function(format, date, settings) {
                    if (!date) return "";
                    var iFormat, dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, lookAhead = function(match) {
                        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                        if (matches) iFormat++;
                        return matches;
                    }, formatNumber = function(match, value, len) {
                        var num = "" + value;
                        if (lookAhead(match)) while (num.length < len) num = "0" + num;
                        return num;
                    }, formatName = function(match, value, shortNames, longNames) {
                        return lookAhead(match) ? longNames[value] : shortNames[value];
                    }, output = "", literal = false;
                    if (date) for (iFormat = 0; iFormat < format.length; iFormat++) if (literal) if ("'" === format.charAt(iFormat) && !lookAhead("'")) literal = false; else output += format.charAt(iFormat); else switch (format.charAt(iFormat)) {
                      case "d":
                        output += formatNumber("d", date.getDate(), 2);
                        break;

                      case "D":
                        output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                        break;

                      case "o":
                        output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                        break;

                      case "m":
                        output += formatNumber("m", date.getMonth() + 1, 2);
                        break;

                      case "M":
                        output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                        break;

                      case "y":
                        output += lookAhead("y") ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? "0" : "") + date.getFullYear() % 100;
                        break;

                      case "@":
                        output += date.getTime();
                        break;

                      case "!":
                        output += 1e4 * date.getTime() + this._ticksTo1970;
                        break;

                      case "'":
                        if (lookAhead("'")) output += "'"; else literal = true;
                        break;

                      default:
                        output += format.charAt(iFormat);
                    }
                    return output;
                },
                _possibleChars: function(format) {
                    var iFormat, chars = "", literal = false, lookAhead = function(match) {
                        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                        if (matches) iFormat++;
                        return matches;
                    };
                    for (iFormat = 0; iFormat < format.length; iFormat++) if (literal) if ("'" === format.charAt(iFormat) && !lookAhead("'")) literal = false; else chars += format.charAt(iFormat); else switch (format.charAt(iFormat)) {
                      case "d":
                      case "m":
                      case "y":
                      case "@":
                        chars += "0123456789";
                        break;

                      case "D":
                      case "M":
                        return null;

                      case "'":
                        if (lookAhead("'")) chars += "'"; else literal = true;
                        break;

                      default:
                        chars += format.charAt(iFormat);
                    }
                    return chars;
                },
                _get: function(inst, name) {
                    return void 0 !== inst.settings[name] ? inst.settings[name] : this._defaults[name];
                },
                _setDateFromField: function(inst, noDefault) {
                    if (inst.input.val() === inst.lastVal) return;
                    var dateFormat = this._get(inst, "dateFormat"), dates = inst.lastVal = inst.input ? inst.input.val() : null, defaultDate = this._getDefaultDate(inst), date = defaultDate, settings = this._getFormatConfig(inst);
                    try {
                        date = this.parseDate(dateFormat, dates, settings) || defaultDate;
                    } catch (event) {
                        dates = noDefault ? "" : dates;
                    }
                    inst.selectedDay = date.getDate();
                    inst.drawMonth = inst.selectedMonth = date.getMonth();
                    inst.drawYear = inst.selectedYear = date.getFullYear();
                    inst.currentDay = dates ? date.getDate() : 0;
                    inst.currentMonth = dates ? date.getMonth() : 0;
                    inst.currentYear = dates ? date.getFullYear() : 0;
                    this._adjustInstDate(inst);
                },
                _getDefaultDate: function(inst) {
                    return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date));
                },
                _determineDate: function(inst, date, defaultDate) {
                    var offsetNumeric = function(offset) {
                        var date = new Date;
                        date.setDate(date.getDate() + offset);
                        return date;
                    }, offsetString = function(offset) {
                        try {
                            return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst));
                        } catch (e) {}
                        var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date, year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, matches = pattern.exec(offset);
                        while (matches) {
                            switch (matches[2] || "d") {
                              case "d":
                              case "D":
                                day += parseInt(matches[1], 10);
                                break;

                              case "w":
                              case "W":
                                day += 7 * parseInt(matches[1], 10);
                                break;

                              case "m":
                              case "M":
                                month += parseInt(matches[1], 10);
                                day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                                break;

                              case "y":
                              case "Y":
                                year += parseInt(matches[1], 10);
                                day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                                break;
                            }
                            matches = pattern.exec(offset);
                        }
                        return new Date(year, month, day);
                    }, newDate = null == date || "" === date ? defaultDate : "string" === typeof date ? offsetString(date) : "number" === typeof date ? isNaN(date) ? defaultDate : offsetNumeric(date) : new Date(date.getTime());
                    newDate = newDate && "Invalid Date" === newDate.toString() ? defaultDate : newDate;
                    if (newDate) {
                        newDate.setHours(0);
                        newDate.setMinutes(0);
                        newDate.setSeconds(0);
                        newDate.setMilliseconds(0);
                    }
                    return this._daylightSavingAdjust(newDate);
                },
                _daylightSavingAdjust: function(date) {
                    if (!date) return null;
                    date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
                    return date;
                },
                _setDate: function(inst, date, noChange) {
                    var clear = !date, origMonth = inst.selectedMonth, origYear = inst.selectedYear, newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date));
                    inst.selectedDay = inst.currentDay = newDate.getDate();
                    inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
                    inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
                    if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) this._notifyChange(inst);
                    this._adjustInstDate(inst);
                    if (inst.input) inst.input.val(clear ? "" : this._formatDate(inst));
                },
                _getDate: function(inst) {
                    var startDate = !inst.currentYear || inst.input && "" === inst.input.val() ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
                    return startDate;
                },
                _attachHandlers: function(inst) {
                    var stepMonths = this._get(inst, "stepMonths"), id = "#" + inst.id.replace(/\\\\/g, "\\");
                    inst.dpDiv.find("[data-handler]").map((function() {
                        var handler = {
                            prev: function() {
                                $.datepicker._adjustDate(id, -stepMonths, "M");
                            },
                            next: function() {
                                $.datepicker._adjustDate(id, +stepMonths, "M");
                            },
                            hide: function() {
                                $.datepicker._hideDatepicker();
                            },
                            today: function() {
                                $.datepicker._gotoToday(id);
                            },
                            selectDay: function() {
                                $.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
                                return false;
                            },
                            selectMonth: function() {
                                $.datepicker._selectMonthYear(id, this, "M");
                                return false;
                            },
                            selectYear: function() {
                                $.datepicker._selectMonthYear(id, this, "Y");
                                return false;
                            }
                        };
                        $(this).on(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
                    }));
                },
                _generateHTML: function(inst) {
                    var maxDraw, prevText, prev, nextText, next, currentText, gotoDate, controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin, monthNames, monthNamesShort, beforeShowDay, showOtherMonths, selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate, cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows, printDate, dRow, tbody, daySettings, otherMonth, unselectable, tempDate = new Date, today = this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())), isRTL = this._get(inst, "isRTL"), showButtonPanel = this._get(inst, "showButtonPanel"), hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"), navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"), numMonths = this._getNumberOfMonths(inst), showCurrentAtPos = this._get(inst, "showCurrentAtPos"), stepMonths = this._get(inst, "stepMonths"), isMultiMonth = 1 !== numMonths[0] || 1 !== numMonths[1], currentDate = this._daylightSavingAdjust(!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)), minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), drawMonth = inst.drawMonth - showCurrentAtPos, drawYear = inst.drawYear;
                    if (drawMonth < 0) {
                        drawMonth += 12;
                        drawYear--;
                    }
                    if (maxDate) {
                        maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate()));
                        maxDraw = minDate && maxDraw < minDate ? minDate : maxDraw;
                        while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                            drawMonth--;
                            if (drawMonth < 0) {
                                drawMonth = 11;
                                drawYear--;
                            }
                        }
                    }
                    inst.drawMonth = drawMonth;
                    inst.drawYear = drawYear;
                    prevText = this._get(inst, "prevText");
                    prevText = !navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst));
                    prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" + " title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>";
                    nextText = this._get(inst, "nextText");
                    nextText = !navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst));
                    next = this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" + " title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>";
                    currentText = this._get(inst, "currentText");
                    gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today;
                    currentText = !navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst));
                    controls = !inst.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(inst, "closeText") + "</button>" : "";
                    buttonPanel = showButtonPanel ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" + ">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";
                    firstDay = parseInt(this._get(inst, "firstDay"), 10);
                    firstDay = isNaN(firstDay) ? 0 : firstDay;
                    showWeek = this._get(inst, "showWeek");
                    dayNames = this._get(inst, "dayNames");
                    dayNamesMin = this._get(inst, "dayNamesMin");
                    monthNames = this._get(inst, "monthNames");
                    monthNamesShort = this._get(inst, "monthNamesShort");
                    beforeShowDay = this._get(inst, "beforeShowDay");
                    showOtherMonths = this._get(inst, "showOtherMonths");
                    selectOtherMonths = this._get(inst, "selectOtherMonths");
                    defaultDate = this._getDefaultDate(inst);
                    html = "";
                    for (row = 0; row < numMonths[0]; row++) {
                        group = "";
                        this.maxRows = 4;
                        for (col = 0; col < numMonths[1]; col++) {
                            selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                            cornerClass = " ui-corner-all";
                            calender = "";
                            if (isMultiMonth) {
                                calender += "<div class='ui-datepicker-group";
                                if (numMonths[1] > 1) switch (col) {
                                  case 0:
                                    calender += " ui-datepicker-group-first";
                                    cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                                    break;

                                  case numMonths[1] - 1:
                                    calender += " ui-datepicker-group-last";
                                    cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                                    break;

                                  default:
                                    calender += " ui-datepicker-group-middle";
                                    cornerClass = "";
                                    break;
                                }
                                calender += "'>";
                            }
                            calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" + (/all|left/.test(cornerClass) && 0 === row ? isRTL ? next : prev : "") + (/all|right/.test(cornerClass) && 0 === row ? isRTL ? prev : next : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>";
                            thead = showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "";
                            for (dow = 0; dow < 7; dow++) {
                                day = (dow + firstDay) % 7;
                                thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
                            }
                            calender += thead + "</tr></thead><tbody>";
                            daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                            if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
                            leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                            curRows = Math.ceil((leadDays + daysInMonth) / 7);
                            numRows = isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows;
                            this.maxRows = numRows;
                            printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                            for (dRow = 0; dRow < numRows; dRow++) {
                                calender += "<tr>";
                                tbody = !showWeek ? "" : "<td class='ui-datepicker-week-col'>" + this._get(inst, "calculateWeek")(printDate) + "</td>";
                                for (dow = 0; dow < 7; dow++) {
                                    daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [ printDate ]) : [ true, "" ];
                                    otherMonth = printDate.getMonth() !== drawMonth;
                                    unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && printDate < minDate || maxDate && printDate > maxDate;
                                    tbody += "<td class='" + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + (printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent || defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime() ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + ((!otherMonth || showOtherMonths) && daySettings[2] ? " title='" + daySettings[2].replace(/'/g, "&#39;") + "'" : "") + (unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" + (printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + "' href='#'>" + printDate.getDate() + "</a>") + "</td>";
                                    printDate.setDate(printDate.getDate() + 1);
                                    printDate = this._daylightSavingAdjust(printDate);
                                }
                                calender += tbody + "</tr>";
                            }
                            drawMonth++;
                            if (drawMonth > 11) {
                                drawMonth = 0;
                                drawYear++;
                            }
                            calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (numMonths[0] > 0 && col === numMonths[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
                            group += calender;
                        }
                        html += group;
                    }
                    html += buttonPanel;
                    inst._keyEvent = false;
                    return html;
                },
                _generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
                    var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear, changeMonth = this._get(inst, "changeMonth"), changeYear = this._get(inst, "changeYear"), showMonthAfterYear = this._get(inst, "showMonthAfterYear"), html = "<div class='ui-datepicker-title'>", monthHtml = "";
                    if (secondary || !changeMonth) monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>"; else {
                        inMinYear = minDate && minDate.getFullYear() === drawYear;
                        inMaxYear = maxDate && maxDate.getFullYear() === drawYear;
                        monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
                        for (month = 0; month < 12; month++) if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) monthHtml += "<option value='" + month + "'" + (month === drawMonth ? " selected='selected'" : "") + ">" + monthNamesShort[month] + "</option>";
                        monthHtml += "</select>";
                    }
                    if (!showMonthAfterYear) html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
                    if (!inst.yearshtml) {
                        inst.yearshtml = "";
                        if (secondary || !changeYear) html += "<span class='ui-datepicker-year'>" + drawYear + "</span>"; else {
                            years = this._get(inst, "yearRange").split(":");
                            thisYear = (new Date).getFullYear();
                            determineYear = function(value) {
                                var year = value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) : value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10);
                                return isNaN(year) ? thisYear : year;
                            };
                            year = determineYear(years[0]);
                            endYear = Math.max(year, determineYear(years[1] || ""));
                            year = minDate ? Math.max(year, minDate.getFullYear()) : year;
                            endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear;
                            inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                            for (;year <= endYear; year++) inst.yearshtml += "<option value='" + year + "'" + (year === drawYear ? " selected='selected'" : "") + ">" + year + "</option>";
                            inst.yearshtml += "</select>";
                            html += inst.yearshtml;
                            inst.yearshtml = null;
                        }
                    }
                    html += this._get(inst, "yearSuffix");
                    if (showMonthAfterYear) html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml;
                    html += "</div>";
                    return html;
                },
                _adjustInstDate: function(inst, offset, period) {
                    var year = inst.selectedYear + ("Y" === period ? offset : 0), month = inst.selectedMonth + ("M" === period ? offset : 0), day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + ("D" === period ? offset : 0), date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
                    inst.selectedDay = date.getDate();
                    inst.drawMonth = inst.selectedMonth = date.getMonth();
                    inst.drawYear = inst.selectedYear = date.getFullYear();
                    if ("M" === period || "Y" === period) this._notifyChange(inst);
                },
                _restrictMinMax: function(inst, date) {
                    var minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), newDate = minDate && date < minDate ? minDate : date;
                    return maxDate && newDate > maxDate ? maxDate : newDate;
                },
                _notifyChange: function(inst) {
                    var onChange = this._get(inst, "onChangeMonthYear");
                    if (onChange) onChange.apply(inst.input ? inst.input[0] : null, [ inst.selectedYear, inst.selectedMonth + 1, inst ]);
                },
                _getNumberOfMonths: function(inst) {
                    var numMonths = this._get(inst, "numberOfMonths");
                    return null == numMonths ? [ 1, 1 ] : "number" === typeof numMonths ? [ 1, numMonths ] : numMonths;
                },
                _getMinMaxDate: function(inst, minMax) {
                    return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
                },
                _getDaysInMonth: function(year, month) {
                    return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
                },
                _getFirstDayOfMonth: function(year, month) {
                    return new Date(year, month, 1).getDay();
                },
                _canAdjustMonth: function(inst, offset, curYear, curMonth) {
                    var numMonths = this._getNumberOfMonths(inst), date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
                    if (offset < 0) date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
                    return this._isInRange(inst, date);
                },
                _isInRange: function(inst, date) {
                    var yearSplit, currentYear, minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), minYear = null, maxYear = null, years = this._get(inst, "yearRange");
                    if (years) {
                        yearSplit = years.split(":");
                        currentYear = (new Date).getFullYear();
                        minYear = parseInt(yearSplit[0], 10);
                        maxYear = parseInt(yearSplit[1], 10);
                        if (yearSplit[0].match(/[+\-].*/)) minYear += currentYear;
                        if (yearSplit[1].match(/[+\-].*/)) maxYear += currentYear;
                    }
                    return (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear);
                },
                _getFormatConfig: function(inst) {
                    var shortYearCutoff = this._get(inst, "shortYearCutoff");
                    shortYearCutoff = "string" !== typeof shortYearCutoff ? shortYearCutoff : (new Date).getFullYear() % 100 + parseInt(shortYearCutoff, 10);
                    return {
                        shortYearCutoff,
                        dayNamesShort: this._get(inst, "dayNamesShort"),
                        dayNames: this._get(inst, "dayNames"),
                        monthNamesShort: this._get(inst, "monthNamesShort"),
                        monthNames: this._get(inst, "monthNames")
                    };
                },
                _formatDate: function(inst, day, month, year) {
                    if (!day) {
                        inst.currentDay = inst.selectedDay;
                        inst.currentMonth = inst.selectedMonth;
                        inst.currentYear = inst.selectedYear;
                    }
                    var date = day ? "object" === typeof day ? day : this._daylightSavingAdjust(new Date(year, month, day)) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
                    return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
                }
            });
            function datepicker_bindHover(dpDiv) {
                var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
                return dpDiv.on("mouseout", selector, (function() {
                    $(this).removeClass("ui-state-hover");
                    if (-1 !== this.className.indexOf("ui-datepicker-prev")) $(this).removeClass("ui-datepicker-prev-hover");
                    if (-1 !== this.className.indexOf("ui-datepicker-next")) $(this).removeClass("ui-datepicker-next-hover");
                })).on("mouseover", selector, datepicker_handleMouseover);
            }
            function datepicker_handleMouseover() {
                if (!$.datepicker._isDisabledDatepicker(datepicker_instActive.inline ? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0])) {
                    $(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                    $(this).addClass("ui-state-hover");
                    if (-1 !== this.className.indexOf("ui-datepicker-prev")) $(this).addClass("ui-datepicker-prev-hover");
                    if (-1 !== this.className.indexOf("ui-datepicker-next")) $(this).addClass("ui-datepicker-next-hover");
                }
            }
            function datepicker_extendRemove(target, props) {
                $.extend(target, props);
                for (var name in props) if (null == props[name]) target[name] = props[name];
                return target;
            }
            $.fn.datepicker = function(options) {
                if (!this.length) return this;
                if (!$.datepicker.initialized) {
                    $(document).on("mousedown", $.datepicker._checkExternalClick);
                    $.datepicker.initialized = true;
                }
                if (0 === $("#" + $.datepicker._mainDivId).length) $("body").append($.datepicker.dpDiv);
                var otherArgs = Array.prototype.slice.call(arguments, 1);
                if ("string" === typeof options && ("isDisabled" === options || "getDate" === options || "widget" === options)) return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [ this[0] ].concat(otherArgs));
                if ("option" === options && 2 === arguments.length && "string" === typeof arguments[1]) return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [ this[0] ].concat(otherArgs));
                return this.each((function() {
                    "string" === typeof options ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [ this ].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options);
                }));
            };
            $.datepicker = new Datepicker;
            $.datepicker.initialized = false;
            $.datepicker.uuid = (new Date).getTime();
            $.datepicker.version = "@VERSION";
            return $.datepicker;
        }));
        $(document).ready((function() {
            $(".filter_checkbox").on("click", (function(e) {
                e.preventDefault();
                let id = $(this).find("input").val();
                let url = new URL(window.location.href);
                if (url.searchParams.has("PAGEN_1")) url.searchParams.delete("PAGEN_1");
                if (!url.searchParams.has("set_filter")) url.searchParams.append("set_filter", "Y");
                if (url.searchParams.has("arrFilter_pf[FILTER][]")) {
                    let add = true;
                    let idArr = url.searchParams.getAll("arrFilter_pf[FILTER][]");
                    url.searchParams.delete("arrFilter_pf[FILTER][]");
                    idArr.forEach((function(element, index) {
                        if (element != id) url.searchParams.append("arrFilter_pf[FILTER][]", element); else add = false;
                    }));
                    if (add) url.searchParams.append("arrFilter_pf[FILTER][]", id);
                } else url.searchParams.append("arrFilter_pf[FILTER][]", id);
                document.location.href = url;
            }));
            $(".ajax_page").on("click", (function(e) {
                let url = new URL(window.location.href);
                if (url.searchParams.has("PAGEN_1")) url.searchParams.set("PAGEN_1", $(this).data("page")); else url.searchParams.append("PAGEN_1", $(this).data("page"));
                document.location.href = url;
            }));
            $(".checkout-collapse-trigger").on("click", (function() {
                $(this).toggleClass("active");
                $(".checkout_list").slideToggle(300);
            }));
            $(document).on("click", ".js-add-to-cart", (function(e) {
                e.preventDefault();
                const id = $(this).data("id");
                $.ajax({
                    url: "/ajax/basket_add.php",
                    type: "post",
                    data: "id=" + id + "&quantity=1",
                    success: function(response) {
                        response = JSON.parse(response);
                        if ("success" == response.status) {
                            $("#basket_count").html(response.count);
                            $("#header-basket-modal-counter").html(response.count);
                            $("#header-basket-modal-price").html(response.totalPrice);
                            $("#addToCartSuccess .modal-body p").text("Товар успешно добавлен в корзину");
                            $("#addToCartSuccess").modal();
                        } else $("#addToCartSuccess .modal-body p").text("Товар не добавлен в корзину");
                        setTimeout((() => {
                            $("#addToCartSuccess .close").trigger("click");
                        }), 3e3);
                    }
                });
            }));
            $(".add_to_cart").on("click", (function(e) {
                e.preventDefault();
                let id = $(this).closest("li").data("id");
                $.ajax({
                    url: "/ajax/add2Basket.php",
                    type: "post",
                    data: "p_id=" + id + "&quantity=1",
                    success: function(response) {
                        response = JSON.parse(response);
                        if ("OK" == response.STATUS) {
                            $(".cart-counter").html(response.COUNT);
                            $("#addToCartSuccess .modal-body p").text("Товар успешно добавлен в корзину");
                        } else $("#addToCartSuccess .modal-body p").text("Товар не добавлен в корзину");
                        setTimeout((() => {
                            $("#addToCartSuccess .close").trigger("click");
                        }), 3e3);
                    }
                });
            }));
            $(".wrap_content .btn_green").on("click", (function(e) {
                e.preventDefault();
                let id = $(this).data("id");
                let quantity = Number($(".number input").val());
                console.log(quantity);
                if (Number.isInteger(quantity) && quantity > 0) $.ajax({
                    url: "/ajax/add2Basket.php",
                    type: "post",
                    data: "p_id=" + id + "&quantity=" + quantity,
                    success: function(response) {
                        response = JSON.parse(response);
                        if ("OK" == response.STATUS) {
                            $("#cart-counter").html(response.COUNT);
                            $("#header-basket-modal-counter").html(response.COUNT);
                            $("#header-basket-modal-price").html(response.PRICE);
                            $("#addToCartSuccess .modal-body p").text("Товар успешно добавлен в корзину");
                        } else $("#addToCartSuccess .modal-body p").text("Товар не добавлен в корзину");
                    }
                }); else alert("Не корректное кол-во товара");
            }));
            $(".create_order").on("click", (function(e) {
                e.preventDefault();
                if ($(this).parents(".checkout_order_courier").find('input[type="checkbox"]').is(":checked")) var canBy = true; else {
                    $(this).parents(".checkout_order_courier").find('input[type="checkbox"]').parent(".custom-checkbox").addClass("was-validated");
                    canBy = false;
                }
                var dellivery = $("#delivery_hide").val();
                let inputsValidated = true;
                if (5 == dellivery) $("input").each((function(index) {
                    if (!canBy) return;
                    $(this).removeClass("error");
                    let name = $(this).attr("name");
                    let type = $(this).attr("type");
                    let value = $(this).val();
                    if (void 0 !== name) if (0 == name.indexOf("info[PICKUP]") && -1 == name.indexOf("info[PICKUP][RECIPIENT]") && "" == value) {
                        inputsValidated = false;
                        $(this).addClass("error");
                    } else if ("email" == type && 0 == name.indexOf("info[PICKUP]") && -1 == name.indexOf("info[PICKUP][RECIPIENT]") && !isEmailValid(value)) {
                        $(this).addClass("error");
                        inputsValidated = false;
                    }
                })); else if (6 == dellivery) $("input").each((function(index) {
                    if (!canBy) return;
                    $(this).removeClass("error");
                    let name = $(this).attr("name");
                    let type = $(this).attr("type");
                    let value = $(this).val();
                    if (void 0 !== name) {
                        if (0 == name.indexOf("info[COURIER]") && -1 == name.indexOf("info[COURIER][RECIPIENT]") && "" == value) {
                            inputsValidated = false;
                            $(this).addClass("error");
                        }
                    } else if ("email" == type && 0 == name.indexOf("info[COURIER]") && -1 == name.indexOf("info[COURIER][RECIPIENT]") && !isEmailValid(value)) {
                        $(this).addClass("error");
                        inputsValidated = false;
                    }
                })); else alert("Неизвестная ошибка. Перезагрузите страницу");
                if (!inputsValidated) alert("Заполните все поля, отмеченные красным");
                if (canBy && inputsValidated) {
                    $(this).addClass("disabled").attr("disabled", true);
                    $.ajax({
                        url: "/ajax/order.php",
                        type: "post",
                        data: $("input:checked,select,textarea,input[type=text],input[type=hidden],input[type=email]"),
                        success: function(response) {
                            let json = JSON.parse(response);
                            console.log(json, "json");
                            if ("GOOD" === json.status) window.top.location.href = "/personal/order/?ORDER_ID=" + json.ID; else alert("Данные заполнены некорректно");
                        }
                    });
                }
            }));
            $(".checkout_order_btn").on("click", (function(e) {
                $("#delivery_hide").val($(this).data("id"));
            }));
            $(document).on("click", ".js-favorite-add", (function(e) {
                $.ajax({
                    url: "/ajax/favorite_add.php",
                    type: "post",
                    data: "id=" + $(this).data("id"),
                    success: function(response) {
                        const res = JSON.parse(response);
                        $("#favoriteAdd .modal-body p").text(res.message);
                        $("#favorite_count").html(res.favorite_count);
                        $(".js-favorite-add").toggleClass("active");
                        const text = $(".js-favorite-add .js-favorite-add-text").text();
                        $(".js-favorite-add .js-favorite-add-text").text("В избранное" == text ? "В избранном" : "В избранное");
                    }
                });
            }));
            $(document).on("click", ".favorite_add", (function(e) {
                if ($(this).parents("label").find("input").is(":checked")) $("#favoriteAdd .modal-body p").text("Товар убран из избранного"); else $("#favoriteAdd .modal-body p").text("Товар добавлен в избранное");
                $.ajax({
                    url: "/ajax/favorite.php",
                    type: "post",
                    data: "id=" + $(this).data("id"),
                    success: function(response) {
                        $("#favorite_count").html(response);
                    }
                });
            }));
            $(document).on("click", ".favorite_add_close", (function(e) {
                e.preventDefault();
                $("#favoriteAdd .modal-body p").text("Для добавления товара в избранное нужно зарегестрироваться");
                $("#favoriteAdd .modal-footer .btn_green").attr("href", "/personal/reg").text("Зарегестрироваться");
            }));
            $(document).on("click", ".del_favorite", (function() {
                $.ajax({
                    url: "/ajax/favorite.php",
                    type: "post",
                    data: "id=" + $(this).data("id"),
                    success: function(response) {
                        $("#favorite_count").html(response);
                    }
                });
            }));
            $(document).on("click", ".dell_product", (function() {
                let store = $(this).data("store");
                $.ajax({
                    url: "/ajax/dellBasket.php",
                    type: "post",
                    data: "id=" + $(this).data("id"),
                    success: function(response) {
                        document.location.href = location.origin + location.pathname + "?store_id=" + store;
                    }
                });
            }));
            $(document).on("click", ".add_postponed", (function() {
                let store = $(this).data("store");
                $.ajax({
                    url: "/ajax/postponed.php",
                    type: "post",
                    data: "id=" + $(this).data("id") + "&id_to_dell=" + $(this).data("id2"),
                    success: function(response) {
                        document.location.href = location.origin + location.pathname + "?store_id=" + store;
                    }
                });
            }));
            $(document).on("click", ".del_postponed", (function() {
                $.ajax({
                    url: "/ajax/postponedDell.php",
                    type: "post",
                    data: "id=" + $(this).data("id"),
                    success: function(response) {}
                });
            }));
            $(document).on("submit", "#reviews_Form", (function(e) {
                e.preventDefault();
                $.ajax({
                    url: "/ajax/reviews.php",
                    type: "post",
                    data: $(" input:not( [type=radio] ) ,input:checked ,textarea"),
                    success: function(response) {
                        if ("GOOD" === response) $("#reviews_Form").html('<p class="text-success h4 text-center">Спасибо. Ваш вопрос принят</p>');
                    }
                });
            }));
            $(document).on("click", "ul.category_items li", (function(e) {
                e.preventDefault();
                console.log("click");
            }));
            $(document).on("click", "li.filter_manufacturer", (function(e) {
                e.preventDefault();
                document.location.href = document.location.origin + document.location.pathname + "?set_filter=Y&" + $(this).data("filter") + "=Y";
            }));
            $(document).on("click", "li.filter_section", (function(e) {
                e.preventDefault();
                let id = $(this).data("id");
                let url = new URL(window.location.href);
                if (url.searchParams.has("SECTION_ID[]")) {
                    let add = true;
                    let idArr = url.searchParams.getAll("SECTION_ID[]");
                    url.searchParams.delete("SECTION_ID[]");
                    idArr.forEach((function(element, index) {
                        if (element != id) url.searchParams.append("SECTION_ID[]", element); else add = false;
                    }));
                    if (add) url.searchParams.append("SECTION_ID[]", id);
                } else url.searchParams.append("SECTION_ID[]", id);
                document.location.href = url;
            }));
            var files;
            $("input[type=file]").change((function() {
                files = this.files;
            }));
            console.log($("[data-mask='phone']"));
            $("[data-mask='phone']").mask("+7 (999) 999-9999");
            $(document).on("submit", "#questions", (function(e) {
                e.preventDefault();
                var data = $("#questions").serializeArray();
                const obMail = data.find((el => "EMAIL" === el.name));
                const reg = /\S+@\S+\.\S+/;
                if (!obMail.value.match(reg)) {
                    if ($(this).find(".email-not-valid").length) {
                        $(this).find(".email-not-valid").toggleClass("again");
                        setTimeout((function() {
                            $(".email-not-valid.again").toggleClass("again");
                        }), 200);
                    } else $(this).find('[name="EMAIL"]').before('<div class="email-not-valid">Не верно введен e-mail</div>');
                    return false;
                }
                data.forEach((function(element, index) {
                    if ("reg-type-1" == element["name"]) data[index] = {
                        name: "reg-type-1",
                        value: $("input[name='reg-type-1']:checked").data("name")
                    };
                }));
                var info = new FormData;
                if ("undefined" !== typeof files) {
                    $.each(files, (function(key, value) {
                        info.append(key, value);
                    }));
                    info.append("my_file_upload", 1);
                }
                data.forEach((function(element) {
                    info.append(element["name"], element["value"]);
                }));
                $.ajax({
                    type: "post",
                    url: "/ajax/quations.php",
                    cache: false,
                    data: info,
                    processData: false,
                    contentType: false,
                    success: function(jsonResopce) {
                        $("#questions").html('<p class="text-success h4 text-center">Спасибо. Ваш вопрос принят</p>');
                    }
                });
            }));
            $(document).on("submit", "#swap", (function(e) {
                e.preventDefault();
                $.ajax({
                    url: "/ajax/swap.php",
                    type: "post",
                    data: $("input,textarea"),
                    success: function(response) {
                        if ("GOOD" === response) {
                            alert("Ваша заявка оформлена");
                            document.location.href = location.href;
                        }
                    }
                });
            }));
            $(document).on("submit", "#subscribe", (function(e) {
                e.preventDefault();
                var elId = $(this).find('input[type="email"]')[0].id;
                if (!$($("#" + elId)).val()) {
                    $('#subscribe input[type="email"]').addClass("is-invalid");
                    $(this).find(".invalid-feedback").addClass("d-block");
                    $(this).find(".invalid-feedback").html("Поле Email обязательно для заполнения");
                } else if (false == validateEmail("subscribe", elId)) {
                    $(this).find(".invalid-feedback").html("Не верно введен Email (Должен быть вида name@mail.ru)");
                    $(this).find(".invalid-feedback").addClass("d-block");
                } else $.ajax({
                    url: "/ajax/subscribe.php",
                    type: "post",
                    data: $("input"),
                    success: function(response) {
                        if ("GOOD" === response) $("#subscribe").html('<p class="text-success h4 text-center">Спасибо, вы оформили подписку</p>');
                    }
                });
            }));
            $(document).on("click", ".add_store", (function() {
                $("#store").val($(this).data("id"));
            }));
            function validateEmail(form_id, email) {
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                var address = document.forms[form_id].elements[email].value;
                if (false == reg.test(address)) return false;
            }
            $(document).on("click", ".set_coupon", (function(e) {
                e.preventDefault();
                $.ajax({
                    url: "/ajax/set_coupon.php",
                    type: "post",
                    data: $("#coupon"),
                    success: function(response) {
                        document.location.href = location.href;
                    }
                });
            }));
            $(".header-basket-modal").click((function(event) {
                event.stopPropagation();
            }));
            if (window.innerWidth <= 500) {
                togglePrice();
                setInterval(togglePrice, 18e4);
            }
            function showPrice() {
                $(".header-basket-modal").css({
                    visibility: "visible",
                    opacity: "1"
                });
            }
            function hidePrice() {
                $(".header-basket-modal").css({
                    visibility: "hidden",
                    opacity: "0"
                });
            }
            function togglePrice() {
                showPrice();
                setTimeout(hidePrice, 3e3);
            }
        }));
        function isEmailValid(value) {
            const emailRegex = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.))+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]/i;
            const result = value.match(emailRegex);
            if (result && result[0]) return true;
            return false;
        }
        window["FLS"] = true;
        isWebp();
        spollers();
        showMore();
        formSubmit();
        formRating();
    })();
})();