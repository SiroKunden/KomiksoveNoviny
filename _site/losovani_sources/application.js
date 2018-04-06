/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */
/*
    Winwheel.js, by Douglas McKechie @ www.dougtesting.net
    See website for tutorials and other documentation.

    The MIT License (MIT)

    Copyright (c) 2017 Douglas McKechie

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/
function Winwheel(t, e) {
    defaultOptions = {
        canvasId: "canvas",
        centerX: null,
        centerY: null,
        outerRadius: null,
        innerRadius: 0,
        numSegments: 1,
        drawMode: "code",
        rotationAngle: 0,
        textFontFamily: "Arial",
        textFontSize: 20,
        textFontWeight: "bold",
        textOrientation: "horizontal",
        textAlignment: "center",
        textDirection: "normal",
        textMargin: 70,
        textFillStyle: "black",
        textStrokeStyle: null,
        textLineWidth: 1,
        fillStyle: "silver",
        strokeStyle: "black",
        lineWidth: 1,
        clearTheCanvas: !0,
        imageOverlay: !1,
        drawText: !0,
        pointerAngle: 0,
        wheelImage: null,
        imageDirection: "N"
    };
    for (var n in defaultOptions) null != t && "undefined" != typeof t[n] ? this[n] = t[n] : this[n] = defaultOptions[n];
    if (null != t)
        for (var n in t) "undefined" == typeof this[n] && (this[n] = t[n]);
    for (this.canvasId ? (this.canvas = document.getElementById(this.canvasId), this.canvas ? (null == this.centerX && (this.centerX = this.canvas.width / 2), null == this.centerY && (this.centerY = this.canvas.height / 2), null == this.outerRadius && (this.canvas.width < this.canvas.height ? this.outerRadius = this.canvas.width / 2 - this.lineWidth : this.outerRadius = this.canvas.height / 2 - this.lineWidth), this.ctx = this.canvas.getContext("2d")) : (this.canvas = null, this.ctx = null)) : (this.cavnas = null, this.ctx = null), this.segments = new Array(null), x = 1; x <= this.numSegments; x++) null != t && t.segments && "undefined" != typeof t.segments[x - 1] ? this.segments[x] = new Segment(t.segments[x - 1]) : this.segments[x] = new Segment;
    if (this.updateSegmentSizes(), null === this.textMargin && (this.textMargin = this.textFontSize / 1.7), null != t && t.animation && "undefined" != typeof t.animation ? this.animation = new Animation(t.animation) : this.animation = new Animation, null != t && t.pins && "undefined" != typeof t.pins && (this.pins = new Pin(t.pins)), "image" == this.drawMode || "segmentImage" == this.drawMode ? ("undefined" == typeof t.fillStyle && (this.fillStyle = null), "undefined" == typeof t.strokeStyle && (this.strokeStyle = "red"), "undefined" == typeof t.drawText && (this.drawText = !1), "undefined" == typeof t.lineWidth && (this.lineWidth = 1), "undefined" == typeof e && (e = !1)) : "undefined" == typeof e && (e = !0), null != t && t.pointerGuide && "undefined" != typeof t.pointerGuide ? this.pointerGuide = new PointerGuide(t.pointerGuide) : this.pointerGuide = new PointerGuide, 1 == e) this.draw(this.clearTheCanvas);
    else if ("segmentImage" == this.drawMode)
        for (winwheelToDrawDuringAnimation = this, winhweelAlreadyDrawn = !1, y = 1; y <= this.numSegments; y++) null !== this.segments[y].image && (this.segments[y].imgData = new Image, this.segments[y].imgData.onload = winwheelLoadedImage, this.segments[y].imgData.src = this.segments[y].image)
}

function Pin(t) {
    defaultOptions = {
        visible: !0,
        number: 36,
        outerRadius: 3,
        fillStyle: "grey",
        strokeStyle: "black",
        lineWidth: 1,
        margin: 3
    };
    for (var e in defaultOptions) null != t && "undefined" != typeof t[e] ? this[e] = t[e] : this[e] = defaultOptions[e];
    if (null != t)
        for (var e in t) "undefined" == typeof this[e] && (this[e] = t[e])
}

function Animation(t) {
    defaultOptions = {
        type: "spinOngoing",
        direction: "clockwise",
        propertyName: null,
        propertyValue: null,
        duration: 10,
        yoyo: !1,
        repeat: 0,
        easing: "power3.easeOut",
        stopAngle: null,
        spins: null,
        clearTheCanvas: null,
        callbackFinished: null,
        callbackBefore: null,
        callbackAfter: null
    };
    for (var e in defaultOptions) null != t && "undefined" != typeof t[e] ? this[e] = t[e] : this[e] = defaultOptions[e];
    if (null != t)
        for (var e in t) "undefined" == typeof this[e] && (this[e] = t[e])
}

function Segment(t) {
    defaultOptions = {
        size: null,
        text: "",
        fillStyle: null,
        strokeStyle: null,
        lineWidth: null,
        textFontFamily: null,
        textFontSize: null,
        textFontWeight: null,
        textOrientation: null,
        textAlignment: null,
        textDirection: null,
        textMargin: null,
        textFillStyle: null,
        textStrokeStyle: null,
        textLineWidth: null,
        image: null,
        imageDirection: null,
        imgData: null
    };
    for (var e in defaultOptions) null != t && "undefined" != typeof t[e] ? this[e] = t[e] : this[e] = defaultOptions[e];
    if (null != t)
        for (var e in t) "undefined" == typeof this[e] && (this[e] = t[e]);
    this.startAngle = 0, this.endAngle = 0
}

function PointerGuide(t) {
    defaultOptions = {
        display: !1,
        strokeStyle: "red",
        lineWidth: 3
    };
    for (var e in defaultOptions) null != t && "undefined" != typeof t[e] ? this[e] = t[e] : this[e] = defaultOptions[e]
}

function winwheelPercentToDegrees(t) {
    var e = 0;
    if (t > 0 && 100 >= t) {
        var n = t / 100;
        e = 360 * n
    }
    return e
}

function winwheelAnimationLoop() {
    winwheelToDrawDuringAnimation && (0 != winwheelToDrawDuringAnimation.animation.clearTheCanvas && winwheelToDrawDuringAnimation.ctx.clearRect(0, 0, winwheelToDrawDuringAnimation.canvas.width, winwheelToDrawDuringAnimation.canvas.height), null != winwheelToDrawDuringAnimation.animation.callbackBefore && eval(winwheelToDrawDuringAnimation.animation.callbackBefore), winwheelToDrawDuringAnimation.draw(!1), null != winwheelToDrawDuringAnimation.animation.callbackAfter && eval(winwheelToDrawDuringAnimation.animation.callbackAfter))
}

function winwheelStopAnimation(canCallback) {
    0 != canCallback && null != winwheelToDrawDuringAnimation.animation.callbackFinished && eval(winwheelToDrawDuringAnimation.animation.callbackFinished)
}

function winwheelLoadedImage() {
    if (0 == winhweelAlreadyDrawn) {
        var t = 0;
        for (i = 1; i <= winwheelToDrawDuringAnimation.numSegments; i++) null != winwheelToDrawDuringAnimation.segments[i].imgData && winwheelToDrawDuringAnimation.segments[i].imgData.height && t++;
        t == winwheelToDrawDuringAnimation.numSegments && (winhweelAlreadyDrawn = !0, winwheelToDrawDuringAnimation.draw())
    }
}! function(t, e) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
        if (!t.document) throw new Error("jQuery requires a window with a document");
        return e(t)
    } : e(t)
}("undefined" != typeof window ? window : this, function(t, e) {
    function n(t) {
        var e = "length" in t && t.length,
            n = rt.type(t);
        return "function" === n || rt.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t
    }

    function i(t, e, n) {
        if (rt.isFunction(e)) return rt.grep(t, function(t, i) {
            return !!e.call(t, i, t) !== n
        });
        if (e.nodeType) return rt.grep(t, function(t) {
            return t === e !== n
        });
        if ("string" == typeof e) {
            if (dt.test(e)) return rt.filter(e, t, n);
            e = rt.filter(e, t)
        }
        return rt.grep(t, function(t) {
            return rt.inArray(t, e) >= 0 !== n
        })
    }

    function r(t, e) {
        do t = t[e]; while (t && 1 !== t.nodeType);
        return t
    }

    function o(t) {
        var e = bt[t] = {};
        return rt.each(t.match(xt) || [], function(t, n) {
            e[n] = !0
        }), e
    }

    function a() {
        pt.addEventListener ? (pt.removeEventListener("DOMContentLoaded", s, !1), t.removeEventListener("load", s, !1)) : (pt.detachEvent("onreadystatechange", s), t.detachEvent("onload", s))
    }

    function s() {
        (pt.addEventListener || "load" === event.type || "complete" === pt.readyState) && (a(), rt.ready())
    }

    function l(t, e, n) {
        if (void 0 === n && 1 === t.nodeType) {
            var i = "data-" + e.replace(At, "-$1").toLowerCase();
            if (n = t.getAttribute(i), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : Ct.test(n) ? rt.parseJSON(n) : n
                } catch (r) {}
                rt.data(t, e, n)
            } else n = void 0
        }
        return n
    }

    function c(t) {
        var e;
        for (e in t)
            if (("data" !== e || !rt.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
        return !0
    }

    function u(t, e, n, i) {
        if (rt.acceptData(t)) {
            var r, o, a = rt.expando,
                s = t.nodeType,
                l = s ? rt.cache : t,
                c = s ? t[a] : t[a] && a;
            if (c && l[c] && (i || l[c].data) || void 0 !== n || "string" != typeof e) return c || (c = s ? t[a] = V.pop() || rt.guid++ : a), l[c] || (l[c] = s ? {} : {
                toJSON: rt.noop
            }), ("object" == typeof e || "function" == typeof e) && (i ? l[c] = rt.extend(l[c], e) : l[c].data = rt.extend(l[c].data, e)), o = l[c], i || (o.data || (o.data = {}), o = o.data), void 0 !== n && (o[rt.camelCase(e)] = n), "string" == typeof e ? (r = o[e], null == r && (r = o[rt.camelCase(e)])) : r = o, r
        }
    }

    function h(t, e, n) {
        if (rt.acceptData(t)) {
            var i, r, o = t.nodeType,
                a = o ? rt.cache : t,
                s = o ? t[rt.expando] : rt.expando;
            if (a[s]) {
                if (e && (i = n ? a[s] : a[s].data)) {
                    rt.isArray(e) ? e = e.concat(rt.map(e, rt.camelCase)) : e in i ? e = [e] : (e = rt.camelCase(e), e = e in i ? [e] : e.split(" ")), r = e.length;
                    for (; r--;) delete i[e[r]];
                    if (n ? !c(i) : !rt.isEmptyObject(i)) return
                }(n || (delete a[s].data, c(a[s]))) && (o ? rt.cleanData([t], !0) : nt.deleteExpando || a != a.window ? delete a[s] : a[s] = null)
            }
        }
    }

    function d() {
        return !0
    }

    function f() {
        return !1
    }

    function p() {
        try {
            return pt.activeElement
        } catch (t) {}
    }

    function g(t) {
        var e = Lt.split("|"),
            n = t.createDocumentFragment();
        if (n.createElement)
            for (; e.length;) n.createElement(e.pop());
        return n
    }

    function m(t, e) {
        var n, i, r = 0,
            o = typeof t.getElementsByTagName !== St ? t.getElementsByTagName(e || "*") : typeof t.querySelectorAll !== St ? t.querySelectorAll(e || "*") : void 0;
        if (!o)
            for (o = [], n = t.childNodes || t; null != (i = n[r]); r++) !e || rt.nodeName(i, e) ? o.push(i) : rt.merge(o, m(i, e));
        return void 0 === e || e && rt.nodeName(t, e) ? rt.merge([t], o) : o
    }

    function v(t) {
        $t.test(t.type) && (t.defaultChecked = t.checked)
    }

    function y(t, e) {
        return rt.nodeName(t, "table") && rt.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
    }

    function x(t) {
        return t.type = (null !== rt.find.attr(t, "type")) + "/" + t.type, t
    }

    function b(t) {
        var e = Yt.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"), t
    }

    function w(t, e) {
        for (var n, i = 0; null != (n = t[i]); i++) rt._data(n, "globalEval", !e || rt._data(e[i], "globalEval"))
    }

    function T(t, e) {
        if (1 === e.nodeType && rt.hasData(t)) {
            var n, i, r, o = rt._data(t),
                a = rt._data(e, o),
                s = o.events;
            if (s) {
                delete a.handle, a.events = {};
                for (n in s)
                    for (i = 0, r = s[n].length; r > i; i++) rt.event.add(e, n, s[n][i])
            }
            a.data && (a.data = rt.extend({}, a.data))
        }
    }

    function S(t, e) {
        var n, i, r;
        if (1 === e.nodeType) {
            if (n = e.nodeName.toLowerCase(), !nt.noCloneEvent && e[rt.expando]) {
                r = rt._data(e);
                for (i in r.events) rt.removeEvent(e, i, r.handle);
                e.removeAttribute(rt.expando)
            }
            "script" === n && e.text !== t.text ? (x(e).text = t.text, b(e)) : "object" === n ? (e.parentNode && (e.outerHTML = t.outerHTML), nt.html5Clone && t.innerHTML && !rt.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === n && $t.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === n ? e.defaultSelected = e.selected = t.defaultSelected : ("input" === n || "textarea" === n) && (e.defaultValue = t.defaultValue)
        }
    }

    function C(e, n) {
        var i, r = rt(n.createElement(e)).appendTo(n.body),
            o = t.getDefaultComputedStyle && (i = t.getDefaultComputedStyle(r[0])) ? i.display : rt.css(r[0], "display");
        return r.detach(), o
    }

    function A(t) {
        var e = pt,
            n = Zt[t];
        return n || (n = C(t, e), "none" !== n && n || (Kt = (Kt || rt("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = (Kt[0].contentWindow || Kt[0].contentDocument).document, e.write(), e.close(), n = C(t, e), Kt.detach()), Zt[t] = n), n
    }

    function k(t, e) {
        return {
            get: function() {
                var n = t();
                if (null != n) return n ? void delete this.get : (this.get = e).apply(this, arguments)
            }
        }
    }

    function E(t, e) {
        if (e in t) return e;
        for (var n = e.charAt(0).toUpperCase() + e.slice(1), i = e, r = de.length; r--;)
            if (e = de[r] + n, e in t) return e;
        return i
    }

    function D(t, e) {
        for (var n, i, r, o = [], a = 0, s = t.length; s > a; a++) i = t[a], i.style && (o[a] = rt._data(i, "olddisplay"), n = i.style.display, e ? (o[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && Dt(i) && (o[a] = rt._data(i, "olddisplay", A(i.nodeName)))) : (r = Dt(i), (n && "none" !== n || !r) && rt._data(i, "olddisplay", r ? n : rt.css(i, "display"))));
        for (a = 0; s > a; a++) i = t[a], i.style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? o[a] || "" : "none"));
        return t
    }

    function N(t, e, n) {
        var i = le.exec(e);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : e
    }

    function $(t, e, n, i, r) {
        for (var o = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += rt.css(t, n + Et[o], !0, r)), i ? ("content" === n && (a -= rt.css(t, "padding" + Et[o], !0, r)), "margin" !== n && (a -= rt.css(t, "border" + Et[o] + "Width", !0, r))) : (a += rt.css(t, "padding" + Et[o], !0, r), "padding" !== n && (a += rt.css(t, "border" + Et[o] + "Width", !0, r)));
        return a
    }

    function R(t, e, n) {
        var i = !0,
            r = "width" === e ? t.offsetWidth : t.offsetHeight,
            o = te(t),
            a = nt.boxSizing && "border-box" === rt.css(t, "boxSizing", !1, o);
        if (0 >= r || null == r) {
            if (r = ee(t, e, o), (0 > r || null == r) && (r = t.style[e]), ie.test(r)) return r;
            i = a && (nt.boxSizingReliable() || r === t.style[e]), r = parseFloat(r) || 0
        }
        return r + $(t, e, n || (a ? "border" : "content"), i, o) + "px"
    }

    function j(t, e, n, i, r) {
        return new j.prototype.init(t, e, n, i, r)
    }

    function I() {
        return setTimeout(function() {
            fe = void 0
        }), fe = rt.now()
    }

    function _(t, e) {
        var n, i = {
                height: t
            },
            r = 0;
        for (e = e ? 1 : 0; 4 > r; r += 2 - e) n = Et[r], i["margin" + n] = i["padding" + n] = t;
        return e && (i.opacity = i.width = t), i
    }

    function O(t, e, n) {
        for (var i, r = (xe[e] || []).concat(xe["*"]), o = 0, a = r.length; a > o; o++)
            if (i = r[o].call(n, e, t)) return i
    }

    function L(t, e, n) {
        var i, r, o, a, s, l, c, u, h = this,
            d = {},
            f = t.style,
            p = t.nodeType && Dt(t),
            g = rt._data(t, "fxshow");
        n.queue || (s = rt._queueHooks(t, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function() {
            s.unqueued || l()
        }), s.unqueued++, h.always(function() {
            h.always(function() {
                s.unqueued--, rt.queue(t, "fx").length || s.empty.fire()
            })
        })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], c = rt.css(t, "display"), u = "none" === c ? rt._data(t, "olddisplay") || A(t.nodeName) : c, "inline" === u && "none" === rt.css(t, "float") && (nt.inlineBlockNeedsLayout && "inline" !== A(t.nodeName) ? f.zoom = 1 : f.display = "inline-block")), n.overflow && (f.overflow = "hidden", nt.shrinkWrapBlocks() || h.always(function() {
            f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
        }));
        for (i in e)
            if (r = e[i], ge.exec(r)) {
                if (delete e[i], o = o || "toggle" === r, r === (p ? "hide" : "show")) {
                    if ("show" !== r || !g || void 0 === g[i]) continue;
                    p = !0
                }
                d[i] = g && g[i] || rt.style(t, i)
            } else c = void 0;
        if (rt.isEmptyObject(d)) "inline" === ("none" === c ? A(t.nodeName) : c) && (f.display = c);
        else {
            g ? "hidden" in g && (p = g.hidden) : g = rt._data(t, "fxshow", {}), o && (g.hidden = !p), p ? rt(t).show() : h.done(function() {
                rt(t).hide()
            }), h.done(function() {
                var e;
                rt._removeData(t, "fxshow");
                for (e in d) rt.style(t, e, d[e])
            });
            for (i in d) a = O(p ? g[i] : 0, i, h), i in g || (g[i] = a.start, p && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
        }
    }

    function F(t, e) {
        var n, i, r, o, a;
        for (n in t)
            if (i = rt.camelCase(n), r = e[i], o = t[n], rt.isArray(o) && (r = o[1], o = t[n] = o[0]), n !== i && (t[i] = o, delete t[n]), a = rt.cssHooks[i], a && "expand" in a) {
                o = a.expand(o), delete t[i];
                for (n in o) n in t || (t[n] = o[n], e[n] = r)
            } else e[i] = r
    }

    function M(t, e, n) {
        var i, r, o = 0,
            a = ye.length,
            s = rt.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (r) return !1;
                for (var e = fe || I(), n = Math.max(0, c.startTime + c.duration - e), i = n / c.duration || 0, o = 1 - i, a = 0, l = c.tweens.length; l > a; a++) c.tweens[a].run(o);
                return s.notifyWith(t, [c, o, n]), 1 > o && l ? n : (s.resolveWith(t, [c]), !1)
            },
            c = s.promise({
                elem: t,
                props: rt.extend({}, e),
                opts: rt.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: e,
                originalOptions: n,
                startTime: fe || I(),
                duration: n.duration,
                tweens: [],
                createTween: function(e, n) {
                    var i = rt.Tween(t, c.opts, e, n, c.opts.specialEasing[e] || c.opts.easing);
                    return c.tweens.push(i), i
                },
                stop: function(e) {
                    var n = 0,
                        i = e ? c.tweens.length : 0;
                    if (r) return this;
                    for (r = !0; i > n; n++) c.tweens[n].run(1);
                    return e ? s.resolveWith(t, [c, e]) : s.rejectWith(t, [c, e]), this
                }
            }),
            u = c.props;
        for (F(u, c.opts.specialEasing); a > o; o++)
            if (i = ye[o].call(c, t, u, c.opts)) return i;
        return rt.map(u, O, c), rt.isFunction(c.opts.start) && c.opts.start.call(t, c), rt.fx.timer(rt.extend(l, {
            elem: t,
            anim: c,
            queue: c.opts.queue
        })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function P(t) {
        return function(e, n) {
            "string" != typeof e && (n = e, e = "*");
            var i, r = 0,
                o = e.toLowerCase().match(xt) || [];
            if (rt.isFunction(n))
                for (; i = o[r++];) "+" === i.charAt(0) ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n)
        }
    }

    function B(t, e, n, i) {
        function r(s) {
            var l;
            return o[s] = !0, rt.each(t[s] || [], function(t, s) {
                var c = s(e, n, i);
                return "string" != typeof c || a || o[c] ? a ? !(l = c) : void 0 : (e.dataTypes.unshift(c), r(c), !1)
            }), l
        }
        var o = {},
            a = t === He;
        return r(e.dataTypes[0]) || !o["*"] && r("*")
    }

    function W(t, e) {
        var n, i, r = rt.ajaxSettings.flatOptions || {};
        for (i in e) void 0 !== e[i] && ((r[i] ? t : n || (n = {}))[i] = e[i]);
        return n && rt.extend(!0, t, n), t
    }

    function z(t, e, n) {
        for (var i, r, o, a, s = t.contents, l = t.dataTypes;
            "*" === l[0];) l.shift(), void 0 === r && (r = t.mimeType || e.getResponseHeader("Content-Type"));
        if (r)
            for (a in s)
                if (s[a] && s[a].test(r)) {
                    l.unshift(a);
                    break
                }
        if (l[0] in n) o = l[0];
        else {
            for (a in n) {
                if (!l[0] || t.converters[a + " " + l[0]]) {
                    o = a;
                    break
                }
                i || (i = a)
            }
            o = o || i
        }
        return o ? (o !== l[0] && l.unshift(o), n[o]) : void 0
    }

    function H(t, e, n, i) {
        var r, o, a, s, l, c = {},
            u = t.dataTypes.slice();
        if (u[1])
            for (a in t.converters) c[a.toLowerCase()] = t.converters[a];
        for (o = u.shift(); o;)
            if (t.responseFields[o] && (n[t.responseFields[o]] = e), !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = o, o = u.shift())
                if ("*" === o) o = l;
                else if ("*" !== l && l !== o) {
            if (a = c[l + " " + o] || c["* " + o], !a)
                for (r in c)
                    if (s = r.split(" "), s[1] === o && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
                        a === !0 ? a = c[r] : c[r] !== !0 && (o = s[0], u.unshift(s[1]));
                        break
                    }
            if (a !== !0)
                if (a && t["throws"]) e = a(e);
                else try {
                    e = a(e)
                } catch (h) {
                    return {
                        state: "parsererror",
                        error: a ? h : "No conversion from " + l + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: e
        }
    }

    function q(t, e, n, i) {
        var r;
        if (rt.isArray(e)) rt.each(e, function(e, r) {
            n || Ye.test(t) ? i(t, r) : q(t + "[" + ("object" == typeof r ? e : "") + "]", r, n, i)
        });
        else if (n || "object" !== rt.type(e)) i(t, e);
        else
            for (r in e) q(t + "[" + r + "]", e[r], n, i)
    }

    function X() {
        try {
            return new t.XMLHttpRequest
        } catch (e) {}
    }

    function U() {
        try {
            return new t.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }

    function Y(t) {
        return rt.isWindow(t) ? t : 9 === t.nodeType ? t.defaultView || t.parentWindow : !1
    }
    var V = [],
        G = V.slice,
        Q = V.concat,
        J = V.push,
        K = V.indexOf,
        Z = {},
        tt = Z.toString,
        et = Z.hasOwnProperty,
        nt = {},
        it = "1.11.3",
        rt = function(t, e) {
            return new rt.fn.init(t, e)
        },
        ot = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        at = /^-ms-/,
        st = /-([\da-z])/gi,
        lt = function(t, e) {
            return e.toUpperCase()
        };
    rt.fn = rt.prototype = {
        jquery: it,
        constructor: rt,
        selector: "",
        length: 0,
        toArray: function() {
            return G.call(this)
        },
        get: function(t) {
            return null != t ? 0 > t ? this[t + this.length] : this[t] : G.call(this)
        },
        pushStack: function(t) {
            var e = rt.merge(this.constructor(), t);
            return e.prevObject = this, e.context = this.context, e
        },
        each: function(t, e) {
            return rt.each(this, t, e)
        },
        map: function(t) {
            return this.pushStack(rt.map(this, function(e, n) {
                return t.call(e, n, e)
            }))
        },
        slice: function() {
            return this.pushStack(G.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(t) {
            var e = this.length,
                n = +t + (0 > t ? e : 0);
            return this.pushStack(n >= 0 && e > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: J,
        sort: V.sort,
        splice: V.splice
    }, rt.extend = rt.fn.extend = function() {
        var t, e, n, i, r, o, a = arguments[0] || {},
            s = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" == typeof a || rt.isFunction(a) || (a = {}), s === l && (a = this, s--); l > s; s++)
            if (null != (r = arguments[s]))
                for (i in r) t = a[i], n = r[i], a !== n && (c && n && (rt.isPlainObject(n) || (e = rt.isArray(n))) ? (e ? (e = !1, o = t && rt.isArray(t) ? t : []) : o = t && rt.isPlainObject(t) ? t : {}, a[i] = rt.extend(c, o, n)) : void 0 !== n && (a[i] = n));
        return a
    }, rt.extend({
        expando: "jQuery" + (it + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(t) {
            throw new Error(t)
        },
        noop: function() {},
        isFunction: function(t) {
            return "function" === rt.type(t)
        },
        isArray: Array.isArray || function(t) {
            return "array" === rt.type(t)
        },
        isWindow: function(t) {
            return null != t && t == t.window
        },
        isNumeric: function(t) {
            return !rt.isArray(t) && t - parseFloat(t) + 1 >= 0
        },
        isEmptyObject: function(t) {
            var e;
            for (e in t) return !1;
            return !0
        },
        isPlainObject: function(t) {
            var e;
            if (!t || "object" !== rt.type(t) || t.nodeType || rt.isWindow(t)) return !1;
            try {
                if (t.constructor && !et.call(t, "constructor") && !et.call(t.constructor.prototype, "isPrototypeOf")) return !1
            } catch (n) {
                return !1
            }
            if (nt.ownLast)
                for (e in t) return et.call(t, e);
            for (e in t);
            return void 0 === e || et.call(t, e)
        },
        type: function(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? Z[tt.call(t)] || "object" : typeof t
        },
        globalEval: function(e) {
            e && rt.trim(e) && (t.execScript || function(e) {
                t.eval.call(t, e)
            })(e)
        },
        camelCase: function(t) {
            return t.replace(at, "ms-").replace(st, lt)
        },
        nodeName: function(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        },
        each: function(t, e, i) {
            var r, o = 0,
                a = t.length,
                s = n(t);
            if (i) {
                if (s)
                    for (; a > o && (r = e.apply(t[o], i), r !== !1); o++);
                else
                    for (o in t)
                        if (r = e.apply(t[o], i), r === !1) break
            } else if (s)
                for (; a > o && (r = e.call(t[o], o, t[o]), r !== !1); o++);
            else
                for (o in t)
                    if (r = e.call(t[o], o, t[o]), r === !1) break; return t
        },
        trim: function(t) {
            return null == t ? "" : (t + "").replace(ot, "")
        },
        makeArray: function(t, e) {
            var i = e || [];
            return null != t && (n(Object(t)) ? rt.merge(i, "string" == typeof t ? [t] : t) : J.call(i, t)), i
        },
        inArray: function(t, e, n) {
            var i;
            if (e) {
                if (K) return K.call(e, t, n);
                for (i = e.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
                    if (n in e && e[n] === t) return n
            }
            return -1
        },
        merge: function(t, e) {
            for (var n = +e.length, i = 0, r = t.length; n > i;) t[r++] = e[i++];
            if (n !== n)
                for (; void 0 !== e[i];) t[r++] = e[i++];
            return t.length = r, t
        },
        grep: function(t, e, n) {
            for (var i, r = [], o = 0, a = t.length, s = !n; a > o; o++) i = !e(t[o], o), i !== s && r.push(t[o]);
            return r
        },
        map: function(t, e, i) {
            var r, o = 0,
                a = t.length,
                s = n(t),
                l = [];
            if (s)
                for (; a > o; o++) r = e(t[o], o, i), null != r && l.push(r);
            else
                for (o in t) r = e(t[o], o, i), null != r && l.push(r);
            return Q.apply([], l)
        },
        guid: 1,
        proxy: function(t, e) {
            var n, i, r;
            return "string" == typeof e && (r = t[e], e = t, t = r), rt.isFunction(t) ? (n = G.call(arguments, 2), i = function() {
                return t.apply(e || this, n.concat(G.call(arguments)))
            }, i.guid = t.guid = t.guid || rt.guid++, i) : void 0
        },
        now: function() {
            return +new Date
        },
        support: nt
    }), rt.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
        Z["[object " + e + "]"] = e.toLowerCase()
    });
    var ct =
        /*!
         * Sizzle CSS Selector Engine v2.2.0-pre
         * http://sizzlejs.com/
         *
         * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2014-12-16
         */
        function(t) {
            function e(t, e, n, i) {
                var r, o, a, s, l, c, h, f, p, g;
                if ((e ? e.ownerDocument || e : B) !== j && R(e), e = e || j, n = n || [], s = e.nodeType, "string" != typeof t || !t || 1 !== s && 9 !== s && 11 !== s) return n;
                if (!i && _) {
                    if (11 !== s && (r = yt.exec(t)))
                        if (a = r[1]) {
                            if (9 === s) {
                                if (o = e.getElementById(a), !o || !o.parentNode) return n;
                                if (o.id === a) return n.push(o), n
                            } else if (e.ownerDocument && (o = e.ownerDocument.getElementById(a)) && M(e, o) && o.id === a) return n.push(o), n
                        } else {
                            if (r[2]) return K.apply(n, e.getElementsByTagName(t)), n;
                            if ((a = r[3]) && w.getElementsByClassName) return K.apply(n, e.getElementsByClassName(a)), n
                        }
                    if (w.qsa && (!O || !O.test(t))) {
                        if (f = h = P, p = e, g = 1 !== s && t, 1 === s && "object" !== e.nodeName.toLowerCase()) {
                            for (c = A(t), (h = e.getAttribute("id")) ? f = h.replace(bt, "\\$&") : e.setAttribute("id", f), f = "[id='" + f + "'] ", l = c.length; l--;) c[l] = f + d(c[l]);
                            p = xt.test(t) && u(e.parentNode) || e, g = c.join(",")
                        }
                        if (g) try {
                            return K.apply(n, p.querySelectorAll(g)), n
                        } catch (m) {} finally {
                            h || e.removeAttribute("id")
                        }
                    }
                }
                return E(t.replace(lt, "$1"), e, n, i)
            }

            function n() {
                function t(n, i) {
                    return e.push(n + " ") > T.cacheLength && delete t[e.shift()], t[n + " "] = i
                }
                var e = [];
                return t
            }

            function i(t) {
                return t[P] = !0, t
            }

            function r(t) {
                var e = j.createElement("div");
                try {
                    return !!t(e)
                } catch (n) {
                    return !1
                } finally {
                    e.parentNode && e.parentNode.removeChild(e), e = null
                }
            }

            function o(t, e) {
                for (var n = t.split("|"), i = t.length; i--;) T.attrHandle[n[i]] = e
            }

            function a(t, e) {
                var n = e && t,
                    i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || Y) - (~t.sourceIndex || Y);
                if (i) return i;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === e) return -1;
                return t ? 1 : -1
            }

            function s(t) {
                return function(e) {
                    var n = e.nodeName.toLowerCase();
                    return "input" === n && e.type === t
                }
            }

            function l(t) {
                return function(e) {
                    var n = e.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && e.type === t
                }
            }

            function c(t) {
                return i(function(e) {
                    return e = +e, i(function(n, i) {
                        for (var r, o = t([], n.length, e), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
                    })
                })
            }

            function u(t) {
                return t && "undefined" != typeof t.getElementsByTagName && t
            }

            function h() {}

            function d(t) {
                for (var e = 0, n = t.length, i = ""; n > e; e++) i += t[e].value;
                return i
            }

            function f(t, e, n) {
                var i = e.dir,
                    r = n && "parentNode" === i,
                    o = z++;
                return e.first ? function(e, n, o) {
                    for (; e = e[i];)
                        if (1 === e.nodeType || r) return t(e, n, o)
                } : function(e, n, a) {
                    var s, l, c = [W, o];
                    if (a) {
                        for (; e = e[i];)
                            if ((1 === e.nodeType || r) && t(e, n, a)) return !0
                    } else
                        for (; e = e[i];)
                            if (1 === e.nodeType || r) {
                                if (l = e[P] || (e[P] = {}), (s = l[i]) && s[0] === W && s[1] === o) return c[2] = s[2];
                                if (l[i] = c, c[2] = t(e, n, a)) return !0
                            }
                }
            }

            function p(t) {
                return t.length > 1 ? function(e, n, i) {
                    for (var r = t.length; r--;)
                        if (!t[r](e, n, i)) return !1;
                    return !0
                } : t[0]
            }

            function g(t, n, i) {
                for (var r = 0, o = n.length; o > r; r++) e(t, n[r], i);
                return i
            }

            function m(t, e, n, i, r) {
                for (var o, a = [], s = 0, l = t.length, c = null != e; l > s; s++)(o = t[s]) && (!n || n(o, i, r)) && (a.push(o), c && e.push(s));
                return a
            }

            function v(t, e, n, r, o, a) {
                return r && !r[P] && (r = v(r)), o && !o[P] && (o = v(o, a)), i(function(i, a, s, l) {
                    var c, u, h, d = [],
                        f = [],
                        p = a.length,
                        v = i || g(e || "*", s.nodeType ? [s] : s, []),
                        y = !t || !i && e ? v : m(v, d, t, s, l),
                        x = n ? o || (i ? t : p || r) ? [] : a : y;
                    if (n && n(y, x, s, l), r)
                        for (c = m(x, f), r(c, [], s, l), u = c.length; u--;)(h = c[u]) && (x[f[u]] = !(y[f[u]] = h));
                    if (i) {
                        if (o || t) {
                            if (o) {
                                for (c = [], u = x.length; u--;)(h = x[u]) && c.push(y[u] = h);
                                o(null, x = [], c, l)
                            }
                            for (u = x.length; u--;)(h = x[u]) && (c = o ? tt(i, h) : d[u]) > -1 && (i[c] = !(a[c] = h))
                        }
                    } else x = m(x === a ? x.splice(p, x.length) : x), o ? o(null, a, x, l) : K.apply(a, x)
                })
            }

            function y(t) {
                for (var e, n, i, r = t.length, o = T.relative[t[0].type], a = o || T.relative[" "], s = o ? 1 : 0, l = f(function(t) {
                        return t === e
                    }, a, !0), c = f(function(t) {
                        return tt(e, t) > -1
                    }, a, !0), u = [function(t, n, i) {
                        var r = !o && (i || n !== D) || ((e = n).nodeType ? l(t, n, i) : c(t, n, i));
                        return e = null, r
                    }]; r > s; s++)
                    if (n = T.relative[t[s].type]) u = [f(p(u), n)];
                    else {
                        if (n = T.filter[t[s].type].apply(null, t[s].matches), n[P]) {
                            for (i = ++s; r > i && !T.relative[t[i].type]; i++);
                            return v(s > 1 && p(u), s > 1 && d(t.slice(0, s - 1).concat({
                                value: " " === t[s - 2].type ? "*" : ""
                            })).replace(lt, "$1"), n, i > s && y(t.slice(s, i)), r > i && y(t = t.slice(i)), r > i && d(t))
                        }
                        u.push(n)
                    }
                return p(u)
            }

            function x(t, n) {
                var r = n.length > 0,
                    o = t.length > 0,
                    a = function(i, a, s, l, c) {
                        var u, h, d, f = 0,
                            p = "0",
                            g = i && [],
                            v = [],
                            y = D,
                            x = i || o && T.find.TAG("*", c),
                            b = W += null == y ? 1 : Math.random() || .1,
                            w = x.length;
                        for (c && (D = a !== j && a); p !== w && null != (u = x[p]); p++) {
                            if (o && u) {
                                for (h = 0; d = t[h++];)
                                    if (d(u, a, s)) {
                                        l.push(u);
                                        break
                                    }
                                c && (W = b)
                            }
                            r && ((u = !d && u) && f--, i && g.push(u))
                        }
                        if (f += p, r && p !== f) {
                            for (h = 0; d = n[h++];) d(g, v, a, s);
                            if (i) {
                                if (f > 0)
                                    for (; p--;) g[p] || v[p] || (v[p] = Q.call(l));
                                v = m(v)
                            }
                            K.apply(l, v), c && !i && v.length > 0 && f + n.length > 1 && e.uniqueSort(l)
                        }
                        return c && (W = b, D = y), g
                    };
                return r ? i(a) : a
            }
            var b, w, T, S, C, A, k, E, D, N, $, R, j, I, _, O, L, F, M, P = "sizzle" + 1 * new Date,
                B = t.document,
                W = 0,
                z = 0,
                H = n(),
                q = n(),
                X = n(),
                U = function(t, e) {
                    return t === e && ($ = !0), 0
                },
                Y = 1 << 31,
                V = {}.hasOwnProperty,
                G = [],
                Q = G.pop,
                J = G.push,
                K = G.push,
                Z = G.slice,
                tt = function(t, e) {
                    for (var n = 0, i = t.length; i > n; n++)
                        if (t[n] === e) return n;
                    return -1
                },
                et = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                nt = "[\\x20\\t\\r\\n\\f]",
                it = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                rt = it.replace("w", "w#"),
                ot = "\\[" + nt + "*(" + it + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + rt + "))|)" + nt + "*\\]",
                at = ":(" + it + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ot + ")*)|.*)\\)|)",
                st = new RegExp(nt + "+", "g"),
                lt = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
                ct = new RegExp("^" + nt + "*," + nt + "*"),
                ut = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
                ht = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"),
                dt = new RegExp(at),
                ft = new RegExp("^" + rt + "$"),
                pt = {
                    ID: new RegExp("^#(" + it + ")"),
                    CLASS: new RegExp("^\\.(" + it + ")"),
                    TAG: new RegExp("^(" + it.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + ot),
                    PSEUDO: new RegExp("^" + at),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + et + ")$", "i"),
                    needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
                },
                gt = /^(?:input|select|textarea|button)$/i,
                mt = /^h\d$/i,
                vt = /^[^{]+\{\s*\[native \w/,
                yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                xt = /[+~]/,
                bt = /'|\\/g,
                wt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"),
                Tt = function(t, e, n) {
                    var i = "0x" + e - 65536;
                    return i !== i || n ? e : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                },
                St = function() {
                    R()
                };
            try {
                K.apply(G = Z.call(B.childNodes), B.childNodes), G[B.childNodes.length].nodeType
            } catch (Ct) {
                K = {
                    apply: G.length ? function(t, e) {
                        J.apply(t, Z.call(e))
                    } : function(t, e) {
                        for (var n = t.length, i = 0; t[n++] = e[i++];);
                        t.length = n - 1
                    }
                }
            }
            w = e.support = {}, C = e.isXML = function(t) {
                var e = t && (t.ownerDocument || t).documentElement;
                return e ? "HTML" !== e.nodeName : !1
            }, R = e.setDocument = function(t) {
                var e, n, i = t ? t.ownerDocument || t : B;
                return i !== j && 9 === i.nodeType && i.documentElement ? (j = i, I = i.documentElement, n = i.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", St, !1) : n.attachEvent && n.attachEvent("onunload", St)), _ = !C(i), w.attributes = r(function(t) {
                    return t.className = "i", !t.getAttribute("className")
                }), w.getElementsByTagName = r(function(t) {
                    return t.appendChild(i.createComment("")), !t.getElementsByTagName("*").length
                }), w.getElementsByClassName = vt.test(i.getElementsByClassName), w.getById = r(function(t) {
                    return I.appendChild(t).id = P, !i.getElementsByName || !i.getElementsByName(P).length
                }), w.getById ? (T.find.ID = function(t, e) {
                    if ("undefined" != typeof e.getElementById && _) {
                        var n = e.getElementById(t);
                        return n && n.parentNode ? [n] : []
                    }
                }, T.filter.ID = function(t) {
                    var e = t.replace(wt, Tt);
                    return function(t) {
                        return t.getAttribute("id") === e
                    }
                }) : (delete T.find.ID, T.filter.ID = function(t) {
                    var e = t.replace(wt, Tt);
                    return function(t) {
                        var n = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                        return n && n.value === e
                    }
                }), T.find.TAG = w.getElementsByTagName ? function(t, e) {
                    return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : w.qsa ? e.querySelectorAll(t) : void 0
                } : function(t, e) {
                    var n, i = [],
                        r = 0,
                        o = e.getElementsByTagName(t);
                    if ("*" === t) {
                        for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                        return i
                    }
                    return o
                }, T.find.CLASS = w.getElementsByClassName && function(t, e) {
                    return _ ? e.getElementsByClassName(t) : void 0
                }, L = [], O = [], (w.qsa = vt.test(i.querySelectorAll)) && (r(function(t) {
                    I.appendChild(t).innerHTML = "<a id='" + P + "'></a><select id='" + P + "-\f]' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && O.push("[*^$]=" + nt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || O.push("\\[" + nt + "*(?:value|" + et + ")"), t.querySelectorAll("[id~=" + P + "-]").length || O.push("~="), t.querySelectorAll(":checked").length || O.push(":checked"), t.querySelectorAll("a#" + P + "+*").length || O.push(".#.+[+~]")
                }), r(function(t) {
                    var e = i.createElement("input");
                    e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && O.push("name" + nt + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || O.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), O.push(",.*:")
                })), (w.matchesSelector = vt.test(F = I.matches || I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && r(function(t) {
                    w.disconnectedMatch = F.call(t, "div"), F.call(t, "[s!='']:x"), L.push("!=", at)
                }), O = O.length && new RegExp(O.join("|")), L = L.length && new RegExp(L.join("|")), e = vt.test(I.compareDocumentPosition), M = e || vt.test(I.contains) ? function(t, e) {
                    var n = 9 === t.nodeType ? t.documentElement : t,
                        i = e && e.parentNode;
                    return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
                } : function(t, e) {
                    if (e)
                        for (; e = e.parentNode;)
                            if (e === t) return !0;
                    return !1
                }, U = e ? function(t, e) {
                    if (t === e) return $ = !0, 0;
                    var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                    return n ? n : (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & n || !w.sortDetached && e.compareDocumentPosition(t) === n ? t === i || t.ownerDocument === B && M(B, t) ? -1 : e === i || e.ownerDocument === B && M(B, e) ? 1 : N ? tt(N, t) - tt(N, e) : 0 : 4 & n ? -1 : 1)
                } : function(t, e) {
                    if (t === e) return $ = !0, 0;
                    var n, r = 0,
                        o = t.parentNode,
                        s = e.parentNode,
                        l = [t],
                        c = [e];
                    if (!o || !s) return t === i ? -1 : e === i ? 1 : o ? -1 : s ? 1 : N ? tt(N, t) - tt(N, e) : 0;
                    if (o === s) return a(t, e);
                    for (n = t; n = n.parentNode;) l.unshift(n);
                    for (n = e; n = n.parentNode;) c.unshift(n);
                    for (; l[r] === c[r];) r++;
                    return r ? a(l[r], c[r]) : l[r] === B ? -1 : c[r] === B ? 1 : 0
                }, i) : j
            }, e.matches = function(t, n) {
                return e(t, null, null, n)
            }, e.matchesSelector = function(t, n) {
                if ((t.ownerDocument || t) !== j && R(t), n = n.replace(ht, "='$1']"), w.matchesSelector && _ && (!L || !L.test(n)) && (!O || !O.test(n))) try {
                    var i = F.call(t, n);
                    if (i || w.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i
                } catch (r) {}
                return e(n, j, null, [t]).length > 0
            }, e.contains = function(t, e) {
                return (t.ownerDocument || t) !== j && R(t), M(t, e)
            }, e.attr = function(t, e) {
                (t.ownerDocument || t) !== j && R(t);
                var n = T.attrHandle[e.toLowerCase()],
                    i = n && V.call(T.attrHandle, e.toLowerCase()) ? n(t, e, !_) : void 0;
                return void 0 !== i ? i : w.attributes || !_ ? t.getAttribute(e) : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
            }, e.error = function(t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }, e.uniqueSort = function(t) {
                var e, n = [],
                    i = 0,
                    r = 0;
                if ($ = !w.detectDuplicates, N = !w.sortStable && t.slice(0), t.sort(U), $) {
                    for (; e = t[r++];) e === t[r] && (i = n.push(r));
                    for (; i--;) t.splice(n[i], 1)
                }
                return N = null, t
            }, S = e.getText = function(t) {
                var e, n = "",
                    i = 0,
                    r = t.nodeType;
                if (r) {
                    if (1 === r || 9 === r || 11 === r) {
                        if ("string" == typeof t.textContent) return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) n += S(t)
                    } else if (3 === r || 4 === r) return t.nodeValue
                } else
                    for (; e = t[i++];) n += S(e);
                return n
            }, T = e.selectors = {
                cacheLength: 50,
                createPseudo: i,
                match: pt,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(t) {
                        return t[1] = t[1].replace(wt, Tt), t[3] = (t[3] || t[4] || t[5] || "").replace(wt, Tt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                    },
                    CHILD: function(t) {
                        return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                    },
                    PSEUDO: function(t) {
                        var e, n = !t[6] && t[2];
                        return pt.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && dt.test(n) && (e = A(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(t) {
                        var e = t.replace(wt, Tt).toLowerCase();
                        return "*" === t ? function() {
                            return !0
                        } : function(t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        }
                    },
                    CLASS: function(t) {
                        var e = H[t + " "];
                        return e || (e = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) && H(t, function(t) {
                            return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(t, n, i) {
                        return function(r) {
                            var o = e.attr(r, t);
                            return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o.replace(st, " ") + " ").indexOf(i) > -1 : "|=" === n ? o === i || o.slice(0, i.length + 1) === i + "-" : !1) : !0
                        }
                    },
                    CHILD: function(t, e, n, i, r) {
                        var o = "nth" !== t.slice(0, 3),
                            a = "last" !== t.slice(-4),
                            s = "of-type" === e;
                        return 1 === i && 0 === r ? function(t) {
                            return !!t.parentNode
                        } : function(e, n, l) {
                            var c, u, h, d, f, p, g = o !== a ? "nextSibling" : "previousSibling",
                                m = e.parentNode,
                                v = s && e.nodeName.toLowerCase(),
                                y = !l && !s;
                            if (m) {
                                if (o) {
                                    for (; g;) {
                                        for (h = e; h = h[g];)
                                            if (s ? h.nodeName.toLowerCase() === v : 1 === h.nodeType) return !1;
                                        p = g = "only" === t && !p && "nextSibling"
                                    }
                                    return !0
                                }
                                if (p = [a ? m.firstChild : m.lastChild], a && y) {
                                    for (u = m[P] || (m[P] = {}), c = u[t] || [], f = c[0] === W && c[1], d = c[0] === W && c[2], h = f && m.childNodes[f]; h = ++f && h && h[g] || (d = f = 0) || p.pop();)
                                        if (1 === h.nodeType && ++d && h === e) {
                                            u[t] = [W, f, d];
                                            break
                                        }
                                } else if (y && (c = (e[P] || (e[P] = {}))[t]) && c[0] === W) d = c[1];
                                else
                                    for (;
                                        (h = ++f && h && h[g] || (d = f = 0) || p.pop()) && ((s ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++d || (y && ((h[P] || (h[P] = {}))[t] = [W, d]), h !== e)););
                                return d -= r, d === i || d % i === 0 && d / i >= 0
                            }
                        }
                    },
                    PSEUDO: function(t, n) {
                        var r, o = T.pseudos[t] || T.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                        return o[P] ? o(n) : o.length > 1 ? (r = [t, t, "", n], T.setFilters.hasOwnProperty(t.toLowerCase()) ? i(function(t, e) {
                            for (var i, r = o(t, n), a = r.length; a--;) i = tt(t, r[a]), t[i] = !(e[i] = r[a])
                        }) : function(t) {
                            return o(t, 0, r)
                        }) : o
                    }
                },
                pseudos: {
                    not: i(function(t) {
                        var e = [],
                            n = [],
                            r = k(t.replace(lt, "$1"));
                        return r[P] ? i(function(t, e, n, i) {
                            for (var o, a = r(t, null, i, []), s = t.length; s--;)(o = a[s]) && (t[s] = !(e[s] = o))
                        }) : function(t, i, o) {
                            return e[0] = t, r(e, null, o, n), e[0] = null, !n.pop()
                        }
                    }),
                    has: i(function(t) {
                        return function(n) {
                            return e(t, n).length > 0
                        }
                    }),
                    contains: i(function(t) {
                        return t = t.replace(wt, Tt),
                            function(e) {
                                return (e.textContent || e.innerText || S(e)).indexOf(t) > -1
                            }
                    }),
                    lang: i(function(t) {
                        return ft.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(wt, Tt).toLowerCase(),
                            function(e) {
                                var n;
                                do
                                    if (n = _ ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return n = n.toLowerCase(), n === t || 0 === n.indexOf(t + "-");
                                while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function(e) {
                        var n = t.location && t.location.hash;
                        return n && n.slice(1) === e.id
                    },
                    root: function(t) {
                        return t === I
                    },
                    focus: function(t) {
                        return t === j.activeElement && (!j.hasFocus || j.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                    },
                    enabled: function(t) {
                        return t.disabled === !1
                    },
                    disabled: function(t) {
                        return t.disabled === !0
                    },
                    checked: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && !!t.checked || "option" === e && !!t.selected
                    },
                    selected: function(t) {
                        return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                    },
                    empty: function(t) {
                        for (t = t.firstChild; t; t = t.nextSibling)
                            if (t.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(t) {
                        return !T.pseudos.empty(t)
                    },
                    header: function(t) {
                        return mt.test(t.nodeName)
                    },
                    input: function(t) {
                        return gt.test(t.nodeName)
                    },
                    button: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && "button" === t.type || "button" === e
                    },
                    text: function(t) {
                        var e;
                        return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                    },
                    first: c(function() {
                        return [0]
                    }),
                    last: c(function(t, e) {
                        return [e - 1]
                    }),
                    eq: c(function(t, e, n) {
                        return [0 > n ? n + e : n]
                    }),
                    even: c(function(t, e) {
                        for (var n = 0; e > n; n += 2) t.push(n);
                        return t
                    }),
                    odd: c(function(t, e) {
                        for (var n = 1; e > n; n += 2) t.push(n);
                        return t
                    }),
                    lt: c(function(t, e, n) {
                        for (var i = 0 > n ? n + e : n; --i >= 0;) t.push(i);
                        return t
                    }),
                    gt: c(function(t, e, n) {
                        for (var i = 0 > n ? n + e : n; ++i < e;) t.push(i);
                        return t
                    })
                }
            }, T.pseudos.nth = T.pseudos.eq;
            for (b in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) T.pseudos[b] = s(b);
            for (b in {
                    submit: !0,
                    reset: !0
                }) T.pseudos[b] = l(b);
            return h.prototype = T.filters = T.pseudos, T.setFilters = new h, A = e.tokenize = function(t, n) {
                var i, r, o, a, s, l, c, u = q[t + " "];
                if (u) return n ? 0 : u.slice(0);
                for (s = t, l = [], c = T.preFilter; s;) {
                    (!i || (r = ct.exec(s))) && (r && (s = s.slice(r[0].length) || s), l.push(o = [])), i = !1, (r = ut.exec(s)) && (i = r.shift(), o.push({
                        value: i,
                        type: r[0].replace(lt, " ")
                    }), s = s.slice(i.length));
                    for (a in T.filter) !(r = pt[a].exec(s)) || c[a] && !(r = c[a](r)) || (i = r.shift(), o.push({
                        value: i,
                        type: a,
                        matches: r
                    }), s = s.slice(i.length));
                    if (!i) break
                }
                return n ? s.length : s ? e.error(t) : q(t, l).slice(0)
            }, k = e.compile = function(t, e) {
                var n, i = [],
                    r = [],
                    o = X[t + " "];
                if (!o) {
                    for (e || (e = A(t)), n = e.length; n--;) o = y(e[n]), o[P] ? i.push(o) : r.push(o);
                    o = X(t, x(r, i)), o.selector = t
                }
                return o
            }, E = e.select = function(t, e, n, i) {
                var r, o, a, s, l, c = "function" == typeof t && t,
                    h = !i && A(t = c.selector || t);
                if (n = n || [], 1 === h.length) {
                    if (o = h[0] = h[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === e.nodeType && _ && T.relative[o[1].type]) {
                        if (e = (T.find.ID(a.matches[0].replace(wt, Tt), e) || [])[0], !e) return n;
                        c && (e = e.parentNode), t = t.slice(o.shift().value.length)
                    }
                    for (r = pt.needsContext.test(t) ? 0 : o.length; r-- && (a = o[r], !T.relative[s = a.type]);)
                        if ((l = T.find[s]) && (i = l(a.matches[0].replace(wt, Tt), xt.test(o[0].type) && u(e.parentNode) || e))) {
                            if (o.splice(r, 1), t = i.length && d(o), !t) return K.apply(n, i), n;
                            break
                        }
                }
                return (c || k(t, h))(i, e, !_, n, xt.test(t) && u(e.parentNode) || e), n
            }, w.sortStable = P.split("").sort(U).join("") === P, w.detectDuplicates = !!$, R(), w.sortDetached = r(function(t) {
                return 1 & t.compareDocumentPosition(j.createElement("div"))
            }), r(function(t) {
                return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
            }) || o("type|href|height|width", function(t, e, n) {
                return n ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
            }), w.attributes && r(function(t) {
                return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
            }) || o("value", function(t, e, n) {
                return n || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
            }), r(function(t) {
                return null == t.getAttribute("disabled")
            }) || o(et, function(t, e, n) {
                var i;
                return n ? void 0 : t[e] === !0 ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
            }), e
        }(t);
    rt.find = ct, rt.expr = ct.selectors, rt.expr[":"] = rt.expr.pseudos, rt.unique = ct.uniqueSort, rt.text = ct.getText, rt.isXMLDoc = ct.isXML, rt.contains = ct.contains;
    var ut = rt.expr.match.needsContext,
        ht = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        dt = /^.[^:#\[\.,]*$/;
    rt.filter = function(t, e, n) {
        var i = e[0];
        return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? rt.find.matchesSelector(i, t) ? [i] : [] : rt.find.matches(t, rt.grep(e, function(t) {
            return 1 === t.nodeType
        }))
    }, rt.fn.extend({
        find: function(t) {
            var e, n = [],
                i = this,
                r = i.length;
            if ("string" != typeof t) return this.pushStack(rt(t).filter(function() {
                for (e = 0; r > e; e++)
                    if (rt.contains(i[e], this)) return !0
            }));
            for (e = 0; r > e; e++) rt.find(t, i[e], n);
            return n = this.pushStack(r > 1 ? rt.unique(n) : n), n.selector = this.selector ? this.selector + " " + t : t, n
        },
        filter: function(t) {
            return this.pushStack(i(this, t || [], !1))
        },
        not: function(t) {
            return this.pushStack(i(this, t || [], !0))
        },
        is: function(t) {
            return !!i(this, "string" == typeof t && ut.test(t) ? rt(t) : t || [], !1).length
        }
    });
    var ft, pt = t.document,
        gt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        mt = rt.fn.init = function(t, e) {
            var n, i;
            if (!t) return this;
            if ("string" == typeof t) {
                if (n = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : gt.exec(t), !n || !n[1] && e) return !e || e.jquery ? (e || ft).find(t) : this.constructor(e).find(t);
                if (n[1]) {
                    if (e = e instanceof rt ? e[0] : e, rt.merge(this, rt.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : pt, !0)), ht.test(n[1]) && rt.isPlainObject(e))
                        for (n in e) rt.isFunction(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                    return this
                }
                if (i = pt.getElementById(n[2]), i && i.parentNode) {
                    if (i.id !== n[2]) return ft.find(t);
                    this.length = 1, this[0] = i
                }
                return this.context = pt, this.selector = t, this
            }
            return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : rt.isFunction(t) ? "undefined" != typeof ft.ready ? ft.ready(t) : t(rt) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), rt.makeArray(t, this))
        };
    mt.prototype = rt.fn, ft = rt(pt);
    var vt = /^(?:parents|prev(?:Until|All))/,
        yt = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    rt.extend({
        dir: function(t, e, n) {
            for (var i = [], r = t[e]; r && 9 !== r.nodeType && (void 0 === n || 1 !== r.nodeType || !rt(r).is(n));) 1 === r.nodeType && i.push(r), r = r[e];
            return i
        },
        sibling: function(t, e) {
            for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
            return n
        }
    }), rt.fn.extend({
        has: function(t) {
            var e, n = rt(t, this),
                i = n.length;
            return this.filter(function() {
                for (e = 0; i > e; e++)
                    if (rt.contains(this, n[e])) return !0
            })
        },
        closest: function(t, e) {
            for (var n, i = 0, r = this.length, o = [], a = ut.test(t) || "string" != typeof t ? rt(t, e || this.context) : 0; r > i; i++)
                for (n = this[i]; n && n !== e; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && rt.find.matchesSelector(n, t))) {
                        o.push(n);
                        break
                    }
            return this.pushStack(o.length > 1 ? rt.unique(o) : o)
        },
        index: function(t) {
            return t ? "string" == typeof t ? rt.inArray(this[0], rt(t)) : rt.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(t, e) {
            return this.pushStack(rt.unique(rt.merge(this.get(), rt(t, e))))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }), rt.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return rt.dir(t, "parentNode")
        },
        parentsUntil: function(t, e, n) {
            return rt.dir(t, "parentNode", n)
        },
        next: function(t) {
            return r(t, "nextSibling")
        },
        prev: function(t) {
            return r(t, "previousSibling")
        },
        nextAll: function(t) {
            return rt.dir(t, "nextSibling")
        },
        prevAll: function(t) {
            return rt.dir(t, "previousSibling")
        },
        nextUntil: function(t, e, n) {
            return rt.dir(t, "nextSibling", n)
        },
        prevUntil: function(t, e, n) {
            return rt.dir(t, "previousSibling", n)
        },
        siblings: function(t) {
            return rt.sibling((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return rt.sibling(t.firstChild)
        },
        contents: function(t) {
            return rt.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : rt.merge([], t.childNodes)
        }
    }, function(t, e) {
        rt.fn[t] = function(n, i) {
            var r = rt.map(this, e, n);
            return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (r = rt.filter(i, r)), this.length > 1 && (yt[t] || (r = rt.unique(r)), vt.test(t) && (r = r.reverse())), this.pushStack(r)
        }
    });
    var xt = /\S+/g,
        bt = {};
    rt.Callbacks = function(t) {
        t = "string" == typeof t ? bt[t] || o(t) : rt.extend({}, t);
        var e, n, i, r, a, s, l = [],
            c = !t.once && [],
            u = function(o) {
                for (n = t.memory && o, i = !0, a = s || 0, s = 0, r = l.length, e = !0; l && r > a; a++)
                    if (l[a].apply(o[0], o[1]) === !1 && t.stopOnFalse) {
                        n = !1;
                        break
                    }
                e = !1, l && (c ? c.length && u(c.shift()) : n ? l = [] : h.disable())
            },
            h = {
                add: function() {
                    if (l) {
                        var i = l.length;
                        ! function o(e) {
                            rt.each(e, function(e, n) {
                                var i = rt.type(n);
                                "function" === i ? t.unique && h.has(n) || l.push(n) : n && n.length && "string" !== i && o(n)
                            })
                        }(arguments), e ? r = l.length : n && (s = i, u(n))
                    }
                    return this
                },
                remove: function() {
                    return l && rt.each(arguments, function(t, n) {
                        for (var i;
                            (i = rt.inArray(n, l, i)) > -1;) l.splice(i, 1), e && (r >= i && r--, a >= i && a--)
                    }), this
                },
                has: function(t) {
                    return t ? rt.inArray(t, l) > -1 : !(!l || !l.length)
                },
                empty: function() {
                    return l = [], r = 0, this
                },
                disable: function() {
                    return l = c = n = void 0, this
                },
                disabled: function() {
                    return !l
                },
                lock: function() {
                    return c = void 0, n || h.disable(), this
                },
                locked: function() {
                    return !c
                },
                fireWith: function(t, n) {
                    return !l || i && !c || (n = n || [], n = [t, n.slice ? n.slice() : n], e ? c.push(n) : u(n)), this
                },
                fire: function() {
                    return h.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!i
                }
            };
        return h
    }, rt.extend({
        Deferred: function(t) {
            var e = [
                    ["resolve", "done", rt.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", rt.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", rt.Callbacks("memory")]
                ],
                n = "pending",
                i = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return r.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var t = arguments;
                        return rt.Deferred(function(n) {
                            rt.each(e, function(e, o) {
                                var a = rt.isFunction(t[e]) && t[e];
                                r[o[1]](function() {
                                    var t = a && a.apply(this, arguments);
                                    t && rt.isFunction(t.promise) ? t.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === i ? n.promise() : this, a ? [t] : arguments)
                                })
                            }), t = null
                        }).promise()
                    },
                    promise: function(t) {
                        return null != t ? rt.extend(t, i) : i
                    }
                },
                r = {};
            return i.pipe = i.then, rt.each(e, function(t, o) {
                var a = o[2],
                    s = o[3];
                i[o[1]] = a.add, s && a.add(function() {
                    n = s
                }, e[1 ^ t][2].disable, e[2][2].lock), r[o[0]] = function() {
                    return r[o[0] + "With"](this === r ? i : this, arguments), this
                }, r[o[0] + "With"] = a.fireWith
            }), i.promise(r), t && t.call(r, r), r
        },
        when: function(t) {
            var e, n, i, r = 0,
                o = G.call(arguments),
                a = o.length,
                s = 1 !== a || t && rt.isFunction(t.promise) ? a : 0,
                l = 1 === s ? t : rt.Deferred(),
                c = function(t, n, i) {
                    return function(r) {
                        n[t] = this, i[t] = arguments.length > 1 ? G.call(arguments) : r, i === e ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
                    }
                };
            if (a > 1)
                for (e = new Array(a), n = new Array(a), i = new Array(a); a > r; r++) o[r] && rt.isFunction(o[r].promise) ? o[r].promise().done(c(r, i, o)).fail(l.reject).progress(c(r, n, e)) : --s;
            return s || l.resolveWith(i, o), l.promise()
        }
    });
    var wt;
    rt.fn.ready = function(t) {
        return rt.ready.promise().done(t), this
    }, rt.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(t) {
            t ? rt.readyWait++ : rt.ready(!0)
        },
        ready: function(t) {
            if (t === !0 ? !--rt.readyWait : !rt.isReady) {
                if (!pt.body) return setTimeout(rt.ready);
                rt.isReady = !0, t !== !0 && --rt.readyWait > 0 || (wt.resolveWith(pt, [rt]), rt.fn.triggerHandler && (rt(pt).triggerHandler("ready"), rt(pt).off("ready")))
            }
        }
    }), rt.ready.promise = function(e) {
        if (!wt)
            if (wt = rt.Deferred(), "complete" === pt.readyState) setTimeout(rt.ready);
            else if (pt.addEventListener) pt.addEventListener("DOMContentLoaded", s, !1), t.addEventListener("load", s, !1);
        else {
            pt.attachEvent("onreadystatechange", s), t.attachEvent("onload", s);
            var n = !1;
            try {
                n = null == t.frameElement && pt.documentElement
            } catch (i) {}
            n && n.doScroll && ! function r() {
                if (!rt.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (t) {
                        return setTimeout(r, 50)
                    }
                    a(), rt.ready()
                }
            }()
        }
        return wt.promise(e)
    };
    var Tt, St = "undefined";
    for (Tt in rt(nt)) break;
    nt.ownLast = "0" !== Tt, nt.inlineBlockNeedsLayout = !1, rt(function() {
            var t, e, n, i;
            n = pt.getElementsByTagName("body")[0], n && n.style && (e = pt.createElement("div"), i = pt.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(e), typeof e.style.zoom !== St && (e.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", nt.inlineBlockNeedsLayout = t = 3 === e.offsetWidth, t && (n.style.zoom = 1)), n.removeChild(i))
        }),
        function() {
            var t = pt.createElement("div");
            if (null == nt.deleteExpando) {
                nt.deleteExpando = !0;
                try {
                    delete t.test
                } catch (e) {
                    nt.deleteExpando = !1
                }
            }
            t = null
        }(), rt.acceptData = function(t) {
            var e = rt.noData[(t.nodeName + " ").toLowerCase()],
                n = +t.nodeType || 1;
            return 1 !== n && 9 !== n ? !1 : !e || e !== !0 && t.getAttribute("classid") === e
        };
    var Ct = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        At = /([A-Z])/g;
    rt.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(t) {
            return t = t.nodeType ? rt.cache[t[rt.expando]] : t[rt.expando], !!t && !c(t)
        },
        data: function(t, e, n) {
            return u(t, e, n)
        },
        removeData: function(t, e) {
            return h(t, e)
        },
        _data: function(t, e, n) {
            return u(t, e, n, !0)
        },
        _removeData: function(t, e) {
            return h(t, e, !0)
        }
    }), rt.fn.extend({
        data: function(t, e) {
            var n, i, r, o = this[0],
                a = o && o.attributes;
            if (void 0 === t) {
                if (this.length && (r = rt.data(o), 1 === o.nodeType && !rt._data(o, "parsedAttrs"))) {
                    for (n = a.length; n--;) a[n] && (i = a[n].name, 0 === i.indexOf("data-") && (i = rt.camelCase(i.slice(5)), l(o, i, r[i])));
                    rt._data(o, "parsedAttrs", !0)
                }
                return r
            }
            return "object" == typeof t ? this.each(function() {
                rt.data(this, t)
            }) : arguments.length > 1 ? this.each(function() {
                rt.data(this, t, e)
            }) : o ? l(o, t, rt.data(o, t)) : void 0
        },
        removeData: function(t) {
            return this.each(function() {
                rt.removeData(this, t)
            })
        }
    }), rt.extend({
        queue: function(t, e, n) {
            var i;
            return t ? (e = (e || "fx") + "queue", i = rt._data(t, e), n && (!i || rt.isArray(n) ? i = rt._data(t, e, rt.makeArray(n)) : i.push(n)), i || []) : void 0
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var n = rt.queue(t, e),
                i = n.length,
                r = n.shift(),
                o = rt._queueHooks(t, e),
                a = function() {
                    rt.dequeue(t, e)
                };
            "inprogress" === r && (r = n.shift(), i--), r && ("fx" === e && n.unshift("inprogress"), delete o.stop, r.call(t, a, o)), !i && o && o.empty.fire()
        },
        _queueHooks: function(t, e) {
            var n = e + "queueHooks";
            return rt._data(t, n) || rt._data(t, n, {
                empty: rt.Callbacks("once memory").add(function() {
                    rt._removeData(t, e + "queue"), rt._removeData(t, n)
                })
            })
        }
    }), rt.fn.extend({
        queue: function(t, e) {
            var n = 2;
            return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? rt.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                var n = rt.queue(this, t, e);
                rt._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && rt.dequeue(this, t)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                rt.dequeue(this, t)
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, e) {
            var n, i = 1,
                r = rt.Deferred(),
                o = this,
                a = this.length,
                s = function() {
                    --i || r.resolveWith(o, [o])
                };
            for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; a--;) n = rt._data(o[a], t + "queueHooks"), n && n.empty && (i++, n.empty.add(s));
            return s(), r.promise(e)
        }
    });
    var kt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Et = ["Top", "Right", "Bottom", "Left"],
        Dt = function(t, e) {
            return t = e || t, "none" === rt.css(t, "display") || !rt.contains(t.ownerDocument, t)
        },
        Nt = rt.access = function(t, e, n, i, r, o, a) {
            var s = 0,
                l = t.length,
                c = null == n;
            if ("object" === rt.type(n)) {
                r = !0;
                for (s in n) rt.access(t, e, s, n[s], !0, o, a)
            } else if (void 0 !== i && (r = !0, rt.isFunction(i) || (a = !0), c && (a ? (e.call(t, i), e = null) : (c = e, e = function(t, e, n) {
                    return c.call(rt(t), n)
                })), e))
                for (; l > s; s++) e(t[s], n, a ? i : i.call(t[s], s, e(t[s], n)));
            return r ? t : c ? e.call(t) : l ? e(t[0], n) : o
        },
        $t = /^(?:checkbox|radio)$/i;
    ! function() {
        var t = pt.createElement("input"),
            e = pt.createElement("div"),
            n = pt.createDocumentFragment();
        if (e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", nt.leadingWhitespace = 3 === e.firstChild.nodeType, nt.tbody = !e.getElementsByTagName("tbody").length, nt.htmlSerialize = !!e.getElementsByTagName("link").length, nt.html5Clone = "<:nav></:nav>" !== pt.createElement("nav").cloneNode(!0).outerHTML, t.type = "checkbox", t.checked = !0, n.appendChild(t), nt.appendChecked = t.checked, e.innerHTML = "<textarea>x</textarea>", nt.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, n.appendChild(e), e.innerHTML = "<input type='radio' checked='checked' name='t'/>", nt.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, nt.noCloneEvent = !0, e.attachEvent && (e.attachEvent("onclick", function() {
                nt.noCloneEvent = !1
            }), e.cloneNode(!0).click()), null == nt.deleteExpando) {
            nt.deleteExpando = !0;
            try {
                delete e.test
            } catch (i) {
                nt.deleteExpando = !1
            }
        }
    }(),
    function() {
        var e, n, i = pt.createElement("div");
        for (e in {
                submit: !0,
                change: !0,
                focusin: !0
            }) n = "on" + e, (nt[e + "Bubbles"] = n in t) || (i.setAttribute(n, "t"), nt[e + "Bubbles"] = i.attributes[n].expando === !1);
        i = null
    }();
    var Rt = /^(?:input|select|textarea)$/i,
        jt = /^key/,
        It = /^(?:mouse|pointer|contextmenu)|click/,
        _t = /^(?:focusinfocus|focusoutblur)$/,
        Ot = /^([^.]*)(?:\.(.+)|)$/;
    rt.event = {
        global: {},
        add: function(t, e, n, i, r) {
            var o, a, s, l, c, u, h, d, f, p, g, m = rt._data(t);
            if (m) {
                for (n.handler && (l = n, n = l.handler, r = l.selector), n.guid || (n.guid = rt.guid++), (a = m.events) || (a = m.events = {}), (u = m.handle) || (u = m.handle = function(t) {
                        return typeof rt === St || t && rt.event.triggered === t.type ? void 0 : rt.event.dispatch.apply(u.elem, arguments)
                    }, u.elem = t), e = (e || "").match(xt) || [""], s = e.length; s--;) o = Ot.exec(e[s]) || [], f = g = o[1], p = (o[2] || "").split(".").sort(), f && (c = rt.event.special[f] || {}, f = (r ? c.delegateType : c.bindType) || f, c = rt.event.special[f] || {}, h = rt.extend({
                    type: f,
                    origType: g,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: r,
                    needsContext: r && rt.expr.match.needsContext.test(r),
                    namespace: p.join(".")
                }, l), (d = a[f]) || (d = a[f] = [], d.delegateCount = 0, c.setup && c.setup.call(t, i, p, u) !== !1 || (t.addEventListener ? t.addEventListener(f, u, !1) : t.attachEvent && t.attachEvent("on" + f, u))), c.add && (c.add.call(t, h), h.handler.guid || (h.handler.guid = n.guid)), r ? d.splice(d.delegateCount++, 0, h) : d.push(h), rt.event.global[f] = !0);
                t = null
            }
        },
        remove: function(t, e, n, i, r) {
            var o, a, s, l, c, u, h, d, f, p, g, m = rt.hasData(t) && rt._data(t);
            if (m && (u = m.events)) {
                for (e = (e || "").match(xt) || [""], c = e.length; c--;)
                    if (s = Ot.exec(e[c]) || [], f = g = s[1], p = (s[2] || "").split(".").sort(), f) {
                        for (h = rt.event.special[f] || {}, f = (i ? h.delegateType : h.bindType) || f, d = u[f] || [], s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = d.length; o--;) a = d[o], !r && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || i && i !== a.selector && ("**" !== i || !a.selector) || (d.splice(o, 1), a.selector && d.delegateCount--, h.remove && h.remove.call(t, a));
                        l && !d.length && (h.teardown && h.teardown.call(t, p, m.handle) !== !1 || rt.removeEvent(t, f, m.handle), delete u[f])
                    } else
                        for (f in u) rt.event.remove(t, f + e[c], n, i, !0);
                rt.isEmptyObject(u) && (delete m.handle, rt._removeData(t, "events"))
            }
        },
        trigger: function(e, n, i, r) {
            var o, a, s, l, c, u, h, d = [i || pt],
                f = et.call(e, "type") ? e.type : e,
                p = et.call(e, "namespace") ? e.namespace.split(".") : [];
            if (s = u = i = i || pt, 3 !== i.nodeType && 8 !== i.nodeType && !_t.test(f + rt.event.triggered) && (f.indexOf(".") >= 0 && (p = f.split("."), f = p.shift(), p.sort()), a = f.indexOf(":") < 0 && "on" + f, e = e[rt.expando] ? e : new rt.Event(f, "object" == typeof e && e),
                    e.isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = i), n = null == n ? [e] : rt.makeArray(n, [e]), c = rt.event.special[f] || {}, r || !c.trigger || c.trigger.apply(i, n) !== !1)) {
                if (!r && !c.noBubble && !rt.isWindow(i)) {
                    for (l = c.delegateType || f, _t.test(l + f) || (s = s.parentNode); s; s = s.parentNode) d.push(s), u = s;
                    u === (i.ownerDocument || pt) && d.push(u.defaultView || u.parentWindow || t)
                }
                for (h = 0;
                    (s = d[h++]) && !e.isPropagationStopped();) e.type = h > 1 ? l : c.bindType || f, o = (rt._data(s, "events") || {})[e.type] && rt._data(s, "handle"), o && o.apply(s, n), o = a && s[a], o && o.apply && rt.acceptData(s) && (e.result = o.apply(s, n), e.result === !1 && e.preventDefault());
                if (e.type = f, !r && !e.isDefaultPrevented() && (!c._default || c._default.apply(d.pop(), n) === !1) && rt.acceptData(i) && a && i[f] && !rt.isWindow(i)) {
                    u = i[a], u && (i[a] = null), rt.event.triggered = f;
                    try {
                        i[f]()
                    } catch (g) {}
                    rt.event.triggered = void 0, u && (i[a] = u)
                }
                return e.result
            }
        },
        dispatch: function(t) {
            t = rt.event.fix(t);
            var e, n, i, r, o, a = [],
                s = G.call(arguments),
                l = (rt._data(this, "events") || {})[t.type] || [],
                c = rt.event.special[t.type] || {};
            if (s[0] = t, t.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, t) !== !1) {
                for (a = rt.event.handlers.call(this, t, l), e = 0;
                    (r = a[e++]) && !t.isPropagationStopped();)
                    for (t.currentTarget = r.elem, o = 0;
                        (i = r.handlers[o++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(i.namespace)) && (t.handleObj = i, t.data = i.data, n = ((rt.event.special[i.origType] || {}).handle || i.handler).apply(r.elem, s), void 0 !== n && (t.result = n) === !1 && (t.preventDefault(), t.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, t), t.result
            }
        },
        handlers: function(t, e) {
            var n, i, r, o, a = [],
                s = e.delegateCount,
                l = t.target;
            if (s && l.nodeType && (!t.button || "click" !== t.type))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (l.disabled !== !0 || "click" !== t.type)) {
                        for (r = [], o = 0; s > o; o++) i = e[o], n = i.selector + " ", void 0 === r[n] && (r[n] = i.needsContext ? rt(n, this).index(l) >= 0 : rt.find(n, this, null, [l]).length), r[n] && r.push(i);
                        r.length && a.push({
                            elem: l,
                            handlers: r
                        })
                    }
            return s < e.length && a.push({
                elem: this,
                handlers: e.slice(s)
            }), a
        },
        fix: function(t) {
            if (t[rt.expando]) return t;
            var e, n, i, r = t.type,
                o = t,
                a = this.fixHooks[r];
            for (a || (this.fixHooks[r] = a = It.test(r) ? this.mouseHooks : jt.test(r) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, t = new rt.Event(o), e = i.length; e--;) n = i[e], t[n] = o[n];
            return t.target || (t.target = o.srcElement || pt), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, a.filter ? a.filter(t, o) : t
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(t, e) {
                return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(t, e) {
                var n, i, r, o = e.button,
                    a = e.fromElement;
                return null == t.pageX && null != e.clientX && (i = t.target.ownerDocument || pt, r = i.documentElement, n = i.body, t.pageX = e.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0), t.pageY = e.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0)), !t.relatedTarget && a && (t.relatedTarget = a === t.target ? e.toElement : a), t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== p() && this.focus) try {
                        return this.focus(), !1
                    } catch (t) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === p() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return rt.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(t) {
                    return rt.nodeName(t.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        },
        simulate: function(t, e, n, i) {
            var r = rt.extend(new rt.Event, n, {
                type: t,
                isSimulated: !0,
                originalEvent: {}
            });
            i ? rt.event.trigger(r, null, e) : rt.event.dispatch.call(e, r), r.isDefaultPrevented() && n.preventDefault()
        }
    }, rt.removeEvent = pt.removeEventListener ? function(t, e, n) {
        t.removeEventListener && t.removeEventListener(e, n, !1)
    } : function(t, e, n) {
        var i = "on" + e;
        t.detachEvent && (typeof t[i] === St && (t[i] = null), t.detachEvent(i, n))
    }, rt.Event = function(t, e) {
        return this instanceof rt.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? d : f) : this.type = t, e && rt.extend(this, e), this.timeStamp = t && t.timeStamp || rt.now(), void(this[rt.expando] = !0)) : new rt.Event(t, e)
    }, rt.Event.prototype = {
        isDefaultPrevented: f,
        isPropagationStopped: f,
        isImmediatePropagationStopped: f,
        preventDefault: function() {
            var t = this.originalEvent;
            this.isDefaultPrevented = d, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
        },
        stopPropagation: function() {
            var t = this.originalEvent;
            this.isPropagationStopped = d, t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = d, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
        }
    }, rt.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(t, e) {
        rt.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function(t) {
                var n, i = this,
                    r = t.relatedTarget,
                    o = t.handleObj;
                return (!r || r !== i && !rt.contains(i, r)) && (t.type = o.origType, n = o.handler.apply(this, arguments), t.type = e), n
            }
        }
    }), nt.submitBubbles || (rt.event.special.submit = {
        setup: function() {
            return rt.nodeName(this, "form") ? !1 : void rt.event.add(this, "click._submit keypress._submit", function(t) {
                var e = t.target,
                    n = rt.nodeName(e, "input") || rt.nodeName(e, "button") ? e.form : void 0;
                n && !rt._data(n, "submitBubbles") && (rt.event.add(n, "submit._submit", function(t) {
                    t._submit_bubble = !0
                }), rt._data(n, "submitBubbles", !0))
            })
        },
        postDispatch: function(t) {
            t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && rt.event.simulate("submit", this.parentNode, t, !0))
        },
        teardown: function() {
            return rt.nodeName(this, "form") ? !1 : void rt.event.remove(this, "._submit")
        }
    }), nt.changeBubbles || (rt.event.special.change = {
        setup: function() {
            return Rt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (rt.event.add(this, "propertychange._change", function(t) {
                "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
            }), rt.event.add(this, "click._change", function(t) {
                this._just_changed && !t.isTrigger && (this._just_changed = !1), rt.event.simulate("change", this, t, !0)
            })), !1) : void rt.event.add(this, "beforeactivate._change", function(t) {
                var e = t.target;
                Rt.test(e.nodeName) && !rt._data(e, "changeBubbles") && (rt.event.add(e, "change._change", function(t) {
                    !this.parentNode || t.isSimulated || t.isTrigger || rt.event.simulate("change", this.parentNode, t, !0)
                }), rt._data(e, "changeBubbles", !0))
            })
        },
        handle: function(t) {
            var e = t.target;
            return this !== e || t.isSimulated || t.isTrigger || "radio" !== e.type && "checkbox" !== e.type ? t.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return rt.event.remove(this, "._change"), !Rt.test(this.nodeName)
        }
    }), nt.focusinBubbles || rt.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        var n = function(t) {
            rt.event.simulate(e, t.target, rt.event.fix(t), !0)
        };
        rt.event.special[e] = {
            setup: function() {
                var i = this.ownerDocument || this,
                    r = rt._data(i, e);
                r || i.addEventListener(t, n, !0), rt._data(i, e, (r || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this,
                    r = rt._data(i, e) - 1;
                r ? rt._data(i, e, r) : (i.removeEventListener(t, n, !0), rt._removeData(i, e))
            }
        }
    }), rt.fn.extend({
        on: function(t, e, n, i, r) {
            var o, a;
            if ("object" == typeof t) {
                "string" != typeof e && (n = n || e, e = void 0);
                for (o in t) this.on(o, e, n, t[o], r);
                return this
            }
            if (null == n && null == i ? (i = e, n = e = void 0) : null == i && ("string" == typeof e ? (i = n, n = void 0) : (i = n, n = e, e = void 0)), i === !1) i = f;
            else if (!i) return this;
            return 1 === r && (a = i, i = function(t) {
                return rt().off(t), a.apply(this, arguments)
            }, i.guid = a.guid || (a.guid = rt.guid++)), this.each(function() {
                rt.event.add(this, t, i, n, e)
            })
        },
        one: function(t, e, n, i) {
            return this.on(t, e, n, i, 1)
        },
        off: function(t, e, n) {
            var i, r;
            if (t && t.preventDefault && t.handleObj) return i = t.handleObj, rt(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof t) {
                for (r in t) this.off(r, e, t[r]);
                return this
            }
            return (e === !1 || "function" == typeof e) && (n = e, e = void 0), n === !1 && (n = f), this.each(function() {
                rt.event.remove(this, t, n, e)
            })
        },
        trigger: function(t, e) {
            return this.each(function() {
                rt.event.trigger(t, e, this)
            })
        },
        triggerHandler: function(t, e) {
            var n = this[0];
            return n ? rt.event.trigger(t, e, n, !0) : void 0
        }
    });
    var Lt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Ft = / jQuery\d+="(?:null|\d+)"/g,
        Mt = new RegExp("<(?:" + Lt + ")[\\s/>]", "i"),
        Pt = /^\s+/,
        Bt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Wt = /<([\w:]+)/,
        zt = /<tbody/i,
        Ht = /<|&#?\w+;/,
        qt = /<(?:script|style|link)/i,
        Xt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ut = /^$|\/(?:java|ecma)script/i,
        Yt = /^true\/(.*)/,
        Vt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Gt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: nt.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        Qt = g(pt),
        Jt = Qt.appendChild(pt.createElement("div"));
    Gt.optgroup = Gt.option, Gt.tbody = Gt.tfoot = Gt.colgroup = Gt.caption = Gt.thead, Gt.th = Gt.td, rt.extend({
        clone: function(t, e, n) {
            var i, r, o, a, s, l = rt.contains(t.ownerDocument, t);
            if (nt.html5Clone || rt.isXMLDoc(t) || !Mt.test("<" + t.nodeName + ">") ? o = t.cloneNode(!0) : (Jt.innerHTML = t.outerHTML, Jt.removeChild(o = Jt.firstChild)), !(nt.noCloneEvent && nt.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || rt.isXMLDoc(t)))
                for (i = m(o), s = m(t), a = 0; null != (r = s[a]); ++a) i[a] && S(r, i[a]);
            if (e)
                if (n)
                    for (s = s || m(t), i = i || m(o), a = 0; null != (r = s[a]); a++) T(r, i[a]);
                else T(t, o);
            return i = m(o, "script"), i.length > 0 && w(i, !l && m(t, "script")), i = s = r = null, o
        },
        buildFragment: function(t, e, n, i) {
            for (var r, o, a, s, l, c, u, h = t.length, d = g(e), f = [], p = 0; h > p; p++)
                if (o = t[p], o || 0 === o)
                    if ("object" === rt.type(o)) rt.merge(f, o.nodeType ? [o] : o);
                    else if (Ht.test(o)) {
                for (s = s || d.appendChild(e.createElement("div")), l = (Wt.exec(o) || ["", ""])[1].toLowerCase(), u = Gt[l] || Gt._default, s.innerHTML = u[1] + o.replace(Bt, "<$1></$2>") + u[2], r = u[0]; r--;) s = s.lastChild;
                if (!nt.leadingWhitespace && Pt.test(o) && f.push(e.createTextNode(Pt.exec(o)[0])), !nt.tbody)
                    for (o = "table" !== l || zt.test(o) ? "<table>" !== u[1] || zt.test(o) ? 0 : s : s.firstChild, r = o && o.childNodes.length; r--;) rt.nodeName(c = o.childNodes[r], "tbody") && !c.childNodes.length && o.removeChild(c);
                for (rt.merge(f, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                s = d.lastChild
            } else f.push(e.createTextNode(o));
            for (s && d.removeChild(s), nt.appendChecked || rt.grep(m(f, "input"), v), p = 0; o = f[p++];)
                if ((!i || -1 === rt.inArray(o, i)) && (a = rt.contains(o.ownerDocument, o), s = m(d.appendChild(o), "script"), a && w(s), n))
                    for (r = 0; o = s[r++];) Ut.test(o.type || "") && n.push(o);
            return s = null, d
        },
        cleanData: function(t, e) {
            for (var n, i, r, o, a = 0, s = rt.expando, l = rt.cache, c = nt.deleteExpando, u = rt.event.special; null != (n = t[a]); a++)
                if ((e || rt.acceptData(n)) && (r = n[s], o = r && l[r])) {
                    if (o.events)
                        for (i in o.events) u[i] ? rt.event.remove(n, i) : rt.removeEvent(n, i, o.handle);
                    l[r] && (delete l[r], c ? delete n[s] : typeof n.removeAttribute !== St ? n.removeAttribute(s) : n[s] = null, V.push(r))
                }
        }
    }), rt.fn.extend({
        text: function(t) {
            return Nt(this, function(t) {
                return void 0 === t ? rt.text(this) : this.empty().append((this[0] && this[0].ownerDocument || pt).createTextNode(t))
            }, null, t, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = y(this, t);
                    e.appendChild(t)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = y(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },
        remove: function(t, e) {
            for (var n, i = t ? rt.filter(t, this) : this, r = 0; null != (n = i[r]); r++) e || 1 !== n.nodeType || rt.cleanData(m(n)), n.parentNode && (e && rt.contains(n.ownerDocument, n) && w(m(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++) {
                for (1 === t.nodeType && rt.cleanData(m(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                t.options && rt.nodeName(t, "select") && (t.options.length = 0)
            }
            return this
        },
        clone: function(t, e) {
            return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function() {
                return rt.clone(this, t, e)
            })
        },
        html: function(t) {
            return Nt(this, function(t) {
                var e = this[0] || {},
                    n = 0,
                    i = this.length;
                if (void 0 === t) return 1 === e.nodeType ? e.innerHTML.replace(Ft, "") : void 0;
                if ("string" == typeof t && !qt.test(t) && (nt.htmlSerialize || !Mt.test(t)) && (nt.leadingWhitespace || !Pt.test(t)) && !Gt[(Wt.exec(t) || ["", ""])[1].toLowerCase()]) {
                    t = t.replace(Bt, "<$1></$2>");
                    try {
                        for (; i > n; n++) e = this[n] || {}, 1 === e.nodeType && (rt.cleanData(m(e, !1)), e.innerHTML = t);
                        e = 0
                    } catch (r) {}
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function() {
            var t = arguments[0];
            return this.domManip(arguments, function(e) {
                t = this.parentNode, rt.cleanData(m(this)), t && t.replaceChild(e, this)
            }), t && (t.length || t.nodeType) ? this : this.remove()
        },
        detach: function(t) {
            return this.remove(t, !0)
        },
        domManip: function(t, e) {
            t = Q.apply([], t);
            var n, i, r, o, a, s, l = 0,
                c = this.length,
                u = this,
                h = c - 1,
                d = t[0],
                f = rt.isFunction(d);
            if (f || c > 1 && "string" == typeof d && !nt.checkClone && Xt.test(d)) return this.each(function(n) {
                var i = u.eq(n);
                f && (t[0] = d.call(this, n, i.html())), i.domManip(t, e)
            });
            if (c && (s = rt.buildFragment(t, this[0].ownerDocument, !1, this), n = s.firstChild, 1 === s.childNodes.length && (s = n), n)) {
                for (o = rt.map(m(s, "script"), x), r = o.length; c > l; l++) i = s, l !== h && (i = rt.clone(i, !0, !0), r && rt.merge(o, m(i, "script"))), e.call(this[l], i, l);
                if (r)
                    for (a = o[o.length - 1].ownerDocument, rt.map(o, b), l = 0; r > l; l++) i = o[l], Ut.test(i.type || "") && !rt._data(i, "globalEval") && rt.contains(a, i) && (i.src ? rt._evalUrl && rt._evalUrl(i.src) : rt.globalEval((i.text || i.textContent || i.innerHTML || "").replace(Vt, "")));
                s = n = null
            }
            return this
        }
    }), rt.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, e) {
        rt.fn[t] = function(t) {
            for (var n, i = 0, r = [], o = rt(t), a = o.length - 1; a >= i; i++) n = i === a ? this : this.clone(!0), rt(o[i])[e](n), J.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var Kt, Zt = {};
    ! function() {
        var t;
        nt.shrinkWrapBlocks = function() {
            if (null != t) return t;
            t = !1;
            var e, n, i;
            return n = pt.getElementsByTagName("body")[0], n && n.style ? (e = pt.createElement("div"), i = pt.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(e), typeof e.style.zoom !== St && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", e.appendChild(pt.createElement("div")).style.width = "5px", t = 3 !== e.offsetWidth), n.removeChild(i), t) : void 0
        }
    }();
    var te, ee, ne = /^margin/,
        ie = new RegExp("^(" + kt + ")(?!px)[a-z%]+$", "i"),
        re = /^(top|right|bottom|left)$/;
    t.getComputedStyle ? (te = function(e) {
            return e.ownerDocument.defaultView.opener ? e.ownerDocument.defaultView.getComputedStyle(e, null) : t.getComputedStyle(e, null)
        }, ee = function(t, e, n) {
            var i, r, o, a, s = t.style;
            return n = n || te(t), a = n ? n.getPropertyValue(e) || n[e] : void 0, n && ("" !== a || rt.contains(t.ownerDocument, t) || (a = rt.style(t, e)), ie.test(a) && ne.test(e) && (i = s.width, r = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = r, s.maxWidth = o)), void 0 === a ? a : a + ""
        }) : pt.documentElement.currentStyle && (te = function(t) {
            return t.currentStyle
        }, ee = function(t, e, n) {
            var i, r, o, a, s = t.style;
            return n = n || te(t), a = n ? n[e] : void 0, null == a && s && s[e] && (a = s[e]), ie.test(a) && !re.test(e) && (i = s.left, r = t.runtimeStyle, o = r && r.left, o && (r.left = t.currentStyle.left), s.left = "fontSize" === e ? "1em" : a, a = s.pixelLeft + "px", s.left = i, o && (r.left = o)), void 0 === a ? a : a + "" || "auto"
        }),
        function() {
            function e() {
                var e, n, i, r;
                n = pt.getElementsByTagName("body")[0], n && n.style && (e = pt.createElement("div"), i = pt.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(e), e.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o = a = !1, l = !0, t.getComputedStyle && (o = "1%" !== (t.getComputedStyle(e, null) || {}).top, a = "4px" === (t.getComputedStyle(e, null) || {
                    width: "4px"
                }).width, r = e.appendChild(pt.createElement("div")), r.style.cssText = e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", r.style.marginRight = r.style.width = "0", e.style.width = "1px", l = !parseFloat((t.getComputedStyle(r, null) || {}).marginRight), e.removeChild(r)), e.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", r = e.getElementsByTagName("td"), r[0].style.cssText = "margin:0;border:0;padding:0;display:none", s = 0 === r[0].offsetHeight, s && (r[0].style.display = "", r[1].style.display = "none", s = 0 === r[0].offsetHeight), n.removeChild(i))
            }
            var n, i, r, o, a, s, l;
            n = pt.createElement("div"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = n.getElementsByTagName("a")[0], i = r && r.style, i && (i.cssText = "float:left;opacity:.5", nt.opacity = "0.5" === i.opacity, nt.cssFloat = !!i.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", nt.clearCloneStyle = "content-box" === n.style.backgroundClip, nt.boxSizing = "" === i.boxSizing || "" === i.MozBoxSizing || "" === i.WebkitBoxSizing, rt.extend(nt, {
                reliableHiddenOffsets: function() {
                    return null == s && e(), s
                },
                boxSizingReliable: function() {
                    return null == a && e(), a
                },
                pixelPosition: function() {
                    return null == o && e(), o
                },
                reliableMarginRight: function() {
                    return null == l && e(), l
                }
            }))
        }(), rt.swap = function(t, e, n, i) {
            var r, o, a = {};
            for (o in e) a[o] = t.style[o], t.style[o] = e[o];
            r = n.apply(t, i || []);
            for (o in e) t.style[o] = a[o];
            return r
        };
    var oe = /alpha\([^)]*\)/i,
        ae = /opacity\s*=\s*([^)]*)/,
        se = /^(none|table(?!-c[ea]).+)/,
        le = new RegExp("^(" + kt + ")(.*)$", "i"),
        ce = new RegExp("^([+-])=(" + kt + ")", "i"),
        ue = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        he = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        de = ["Webkit", "O", "Moz", "ms"];
    rt.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var n = ee(t, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": nt.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(t, e, n, i) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var r, o, a, s = rt.camelCase(e),
                    l = t.style;
                if (e = rt.cssProps[s] || (rt.cssProps[s] = E(l, s)), a = rt.cssHooks[e] || rt.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (r = a.get(t, !1, i)) ? r : l[e];
                if (o = typeof n, "string" === o && (r = ce.exec(n)) && (n = (r[1] + 1) * r[2] + parseFloat(rt.css(t, e)), o = "number"), null != n && n === n && ("number" !== o || rt.cssNumber[s] || (n += "px"), nt.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (l[e] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(t, n, i))))) try {
                    l[e] = n
                } catch (c) {}
            }
        },
        css: function(t, e, n, i) {
            var r, o, a, s = rt.camelCase(e);
            return e = rt.cssProps[s] || (rt.cssProps[s] = E(t.style, s)), a = rt.cssHooks[e] || rt.cssHooks[s], a && "get" in a && (o = a.get(t, !0, n)), void 0 === o && (o = ee(t, e, i)), "normal" === o && e in he && (o = he[e]), "" === n || n ? (r = parseFloat(o), n === !0 || rt.isNumeric(r) ? r || 0 : o) : o
        }
    }), rt.each(["height", "width"], function(t, e) {
        rt.cssHooks[e] = {
            get: function(t, n, i) {
                return n ? se.test(rt.css(t, "display")) && 0 === t.offsetWidth ? rt.swap(t, ue, function() {
                    return R(t, e, i)
                }) : R(t, e, i) : void 0
            },
            set: function(t, n, i) {
                var r = i && te(t);
                return N(t, n, i ? $(t, e, i, nt.boxSizing && "border-box" === rt.css(t, "boxSizing", !1, r), r) : 0)
            }
        }
    }), nt.opacity || (rt.cssHooks.opacity = {
        get: function(t, e) {
            return ae.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
        },
        set: function(t, e) {
            var n = t.style,
                i = t.currentStyle,
                r = rt.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                o = i && i.filter || n.filter || "";
            n.zoom = 1, (e >= 1 || "" === e) && "" === rt.trim(o.replace(oe, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === e || i && !i.filter) || (n.filter = oe.test(o) ? o.replace(oe, r) : o + " " + r)
        }
    }), rt.cssHooks.marginRight = k(nt.reliableMarginRight, function(t, e) {
        return e ? rt.swap(t, {
            display: "inline-block"
        }, ee, [t, "marginRight"]) : void 0
    }), rt.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(t, e) {
        rt.cssHooks[t + e] = {
            expand: function(n) {
                for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) r[t + Et[i] + e] = o[i] || o[i - 2] || o[0];
                return r
            }
        }, ne.test(t) || (rt.cssHooks[t + e].set = N)
    }), rt.fn.extend({
        css: function(t, e) {
            return Nt(this, function(t, e, n) {
                var i, r, o = {},
                    a = 0;
                if (rt.isArray(e)) {
                    for (i = te(t), r = e.length; r > a; a++) o[e[a]] = rt.css(t, e[a], !1, i);
                    return o
                }
                return void 0 !== n ? rt.style(t, e, n) : rt.css(t, e)
            }, t, e, arguments.length > 1)
        },
        show: function() {
            return D(this, !0)
        },
        hide: function() {
            return D(this)
        },
        toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                Dt(this) ? rt(this).show() : rt(this).hide()
            })
        }
    }), rt.Tween = j, j.prototype = {
        constructor: j,
        init: function(t, e, n, i, r, o) {
            this.elem = t, this.prop = n, this.easing = r || "swing", this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = o || (rt.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var t = j.propHooks[this.prop];
            return t && t.get ? t.get(this) : j.propHooks._default.get(this)
        },
        run: function(t) {
            var e, n = j.propHooks[this.prop];
            return this.options.duration ? this.pos = e = rt.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : j.propHooks._default.set(this), this
        }
    }, j.prototype.init.prototype = j.prototype, j.propHooks = {
        _default: {
            get: function(t) {
                var e;
                return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = rt.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
            },
            set: function(t) {
                rt.fx.step[t.prop] ? rt.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[rt.cssProps[t.prop]] || rt.cssHooks[t.prop]) ? rt.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
            }
        }
    }, j.propHooks.scrollTop = j.propHooks.scrollLeft = {
        set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    }, rt.easing = {
        linear: function(t) {
            return t
        },
        swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        }
    }, rt.fx = j.prototype.init, rt.fx.step = {};
    var fe, pe, ge = /^(?:toggle|show|hide)$/,
        me = new RegExp("^(?:([+-])=|)(" + kt + ")([a-z%]*)$", "i"),
        ve = /queueHooks$/,
        ye = [L],
        xe = {
            "*": [function(t, e) {
                var n = this.createTween(t, e),
                    i = n.cur(),
                    r = me.exec(e),
                    o = r && r[3] || (rt.cssNumber[t] ? "" : "px"),
                    a = (rt.cssNumber[t] || "px" !== o && +i) && me.exec(rt.css(n.elem, t)),
                    s = 1,
                    l = 20;
                if (a && a[3] !== o) {
                    o = o || a[3], r = r || [], a = +i || 1;
                    do s = s || ".5", a /= s, rt.style(n.elem, t, a + o); while (s !== (s = n.cur() / i) && 1 !== s && --l)
                }
                return r && (a = n.start = +a || +i || 0, n.unit = o, n.end = r[1] ? a + (r[1] + 1) * r[2] : +r[2]), n
            }]
        };
    rt.Animation = rt.extend(M, {
            tweener: function(t, e) {
                rt.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                for (var n, i = 0, r = t.length; r > i; i++) n = t[i], xe[n] = xe[n] || [], xe[n].unshift(e)
            },
            prefilter: function(t, e) {
                e ? ye.unshift(t) : ye.push(t)
            }
        }), rt.speed = function(t, e, n) {
            var i = t && "object" == typeof t ? rt.extend({}, t) : {
                complete: n || !n && e || rt.isFunction(t) && t,
                duration: t,
                easing: n && e || e && !rt.isFunction(e) && e
            };
            return i.duration = rt.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in rt.fx.speeds ? rt.fx.speeds[i.duration] : rt.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                rt.isFunction(i.old) && i.old.call(this), i.queue && rt.dequeue(this, i.queue)
            }, i
        }, rt.fn.extend({
            fadeTo: function(t, e, n, i) {
                return this.filter(Dt).css("opacity", 0).show().end().animate({
                    opacity: e
                }, t, n, i)
            },
            animate: function(t, e, n, i) {
                var r = rt.isEmptyObject(t),
                    o = rt.speed(e, n, i),
                    a = function() {
                        var e = M(this, rt.extend({}, t), o);
                        (r || rt._data(this, "finish")) && e.stop(!0)
                    };
                return a.finish = a, r || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function(t, e, n) {
                var i = function(t) {
                    var e = t.stop;
                    delete t.stop, e(n)
                };
                return "string" != typeof t && (n = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                    var e = !0,
                        r = null != t && t + "queueHooks",
                        o = rt.timers,
                        a = rt._data(this);
                    if (r) a[r] && a[r].stop && i(a[r]);
                    else
                        for (r in a) a[r] && a[r].stop && ve.test(r) && i(a[r]);
                    for (r = o.length; r--;) o[r].elem !== this || null != t && o[r].queue !== t || (o[r].anim.stop(n), e = !1, o.splice(r, 1));
                    (e || !n) && rt.dequeue(this, t)
                })
            },
            finish: function(t) {
                return t !== !1 && (t = t || "fx"), this.each(function() {
                    var e, n = rt._data(this),
                        i = n[t + "queue"],
                        r = n[t + "queueHooks"],
                        o = rt.timers,
                        a = i ? i.length : 0;
                    for (n.finish = !0, rt.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                    for (e = 0; a > e; e++) i[e] && i[e].finish && i[e].finish.call(this);
                    delete n.finish
                })
            }
        }), rt.each(["toggle", "show", "hide"], function(t, e) {
            var n = rt.fn[e];
            rt.fn[e] = function(t, i, r) {
                return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(_(e, !0), t, i, r)
            }
        }), rt.each({
            slideDown: _("show"),
            slideUp: _("hide"),
            slideToggle: _("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(t, e) {
            rt.fn[t] = function(t, n, i) {
                return this.animate(e, t, n, i)
            }
        }), rt.timers = [], rt.fx.tick = function() {
            var t, e = rt.timers,
                n = 0;
            for (fe = rt.now(); n < e.length; n++) t = e[n], t() || e[n] !== t || e.splice(n--, 1);
            e.length || rt.fx.stop(), fe = void 0
        }, rt.fx.timer = function(t) {
            rt.timers.push(t), t() ? rt.fx.start() : rt.timers.pop()
        }, rt.fx.interval = 13, rt.fx.start = function() {
            pe || (pe = setInterval(rt.fx.tick, rt.fx.interval))
        }, rt.fx.stop = function() {
            clearInterval(pe), pe = null
        }, rt.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, rt.fn.delay = function(t, e) {
            return t = rt.fx ? rt.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, n) {
                var i = setTimeout(e, t);
                n.stop = function() {
                    clearTimeout(i)
                }
            })
        },
        function() {
            var t, e, n, i, r;
            e = pt.createElement("div"), e.setAttribute("className", "t"), e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = e.getElementsByTagName("a")[0], n = pt.createElement("select"), r = n.appendChild(pt.createElement("option")), t = e.getElementsByTagName("input")[0], i.style.cssText = "top:1px", nt.getSetAttribute = "t" !== e.className, nt.style = /top/.test(i.getAttribute("style")), nt.hrefNormalized = "/a" === i.getAttribute("href"), nt.checkOn = !!t.value, nt.optSelected = r.selected, nt.enctype = !!pt.createElement("form").enctype, n.disabled = !0, nt.optDisabled = !r.disabled, t = pt.createElement("input"), t.setAttribute("value", ""), nt.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), nt.radioValue = "t" === t.value
        }();
    var be = /\r/g;
    rt.fn.extend({
        val: function(t) {
            var e, n, i, r = this[0]; {
                if (arguments.length) return i = rt.isFunction(t), this.each(function(n) {
                    var r;
                    1 === this.nodeType && (r = i ? t.call(this, n, rt(this).val()) : t, null == r ? r = "" : "number" == typeof r ? r += "" : rt.isArray(r) && (r = rt.map(r, function(t) {
                        return null == t ? "" : t + ""
                    })), e = rt.valHooks[this.type] || rt.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, r, "value") || (this.value = r))
                });
                if (r) return e = rt.valHooks[r.type] || rt.valHooks[r.nodeName.toLowerCase()], e && "get" in e && void 0 !== (n = e.get(r, "value")) ? n : (n = r.value, "string" == typeof n ? n.replace(be, "") : null == n ? "" : n)
            }
        }
    }), rt.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = rt.find.attr(t, "value");
                    return null != e ? e : rt.trim(rt.text(t))
                }
            },
            select: {
                get: function(t) {
                    for (var e, n, i = t.options, r = t.selectedIndex, o = "select-one" === t.type || 0 > r, a = o ? null : [], s = o ? r + 1 : i.length, l = 0 > r ? s : o ? r : 0; s > l; l++)
                        if (n = i[l], (n.selected || l === r) && (nt.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !rt.nodeName(n.parentNode, "optgroup"))) {
                            if (e = rt(n).val(), o) return e;
                            a.push(e)
                        }
                    return a
                },
                set: function(t, e) {
                    for (var n, i, r = t.options, o = rt.makeArray(e), a = r.length; a--;)
                        if (i = r[a], rt.inArray(rt.valHooks.option.get(i), o) >= 0) try {
                            i.selected = n = !0
                        } catch (s) {
                            i.scrollHeight
                        } else i.selected = !1;
                    return n || (t.selectedIndex = -1), r
                }
            }
        }
    }), rt.each(["radio", "checkbox"], function() {
        rt.valHooks[this] = {
            set: function(t, e) {
                return rt.isArray(e) ? t.checked = rt.inArray(rt(t).val(), e) >= 0 : void 0
            }
        }, nt.checkOn || (rt.valHooks[this].get = function(t) {
            return null === t.getAttribute("value") ? "on" : t.value
        })
    });
    var we, Te, Se = rt.expr.attrHandle,
        Ce = /^(?:checked|selected)$/i,
        Ae = nt.getSetAttribute,
        ke = nt.input;
    rt.fn.extend({
        attr: function(t, e) {
            return Nt(this, rt.attr, t, e, arguments.length > 1)
        },
        removeAttr: function(t) {
            return this.each(function() {
                rt.removeAttr(this, t)
            })
        }
    }), rt.extend({
        attr: function(t, e, n) {
            var i, r, o = t.nodeType;
            if (t && 3 !== o && 8 !== o && 2 !== o) return typeof t.getAttribute === St ? rt.prop(t, e, n) : (1 === o && rt.isXMLDoc(t) || (e = e.toLowerCase(), i = rt.attrHooks[e] || (rt.expr.match.bool.test(e) ? Te : we)), void 0 === n ? i && "get" in i && null !== (r = i.get(t, e)) ? r : (r = rt.find.attr(t, e), null == r ? void 0 : r) : null !== n ? i && "set" in i && void 0 !== (r = i.set(t, n, e)) ? r : (t.setAttribute(e, n + ""), n) : void rt.removeAttr(t, e))
        },
        removeAttr: function(t, e) {
            var n, i, r = 0,
                o = e && e.match(xt);
            if (o && 1 === t.nodeType)
                for (; n = o[r++];) i = rt.propFix[n] || n, rt.expr.match.bool.test(n) ? ke && Ae || !Ce.test(n) ? t[i] = !1 : t[rt.camelCase("default-" + n)] = t[i] = !1 : rt.attr(t, n, ""), t.removeAttribute(Ae ? n : i)
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (!nt.radioValue && "radio" === e && rt.nodeName(t, "input")) {
                        var n = t.value;
                        return t.setAttribute("type", e), n && (t.value = n), e
                    }
                }
            }
        }
    }), Te = {
        set: function(t, e, n) {
            return e === !1 ? rt.removeAttr(t, n) : ke && Ae || !Ce.test(n) ? t.setAttribute(!Ae && rt.propFix[n] || n, n) : t[rt.camelCase("default-" + n)] = t[n] = !0, n
        }
    }, rt.each(rt.expr.match.bool.source.match(/\w+/g), function(t, e) {
        var n = Se[e] || rt.find.attr;
        Se[e] = ke && Ae || !Ce.test(e) ? function(t, e, i) {
            var r, o;
            return i || (o = Se[e], Se[e] = r, r = null != n(t, e, i) ? e.toLowerCase() : null, Se[e] = o), r
        } : function(t, e, n) {
            return n ? void 0 : t[rt.camelCase("default-" + e)] ? e.toLowerCase() : null
        }
    }), ke && Ae || (rt.attrHooks.value = {
        set: function(t, e, n) {
            return rt.nodeName(t, "input") ? void(t.defaultValue = e) : we && we.set(t, e, n)
        }
    }), Ae || (we = {
        set: function(t, e, n) {
            var i = t.getAttributeNode(n);
            return i || t.setAttributeNode(i = t.ownerDocument.createAttribute(n)), i.value = e += "", "value" === n || e === t.getAttribute(n) ? e : void 0
        }
    }, Se.id = Se.name = Se.coords = function(t, e, n) {
        var i;
        return n ? void 0 : (i = t.getAttributeNode(e)) && "" !== i.value ? i.value : null
    }, rt.valHooks.button = {
        get: function(t, e) {
            var n = t.getAttributeNode(e);
            return n && n.specified ? n.value : void 0
        },
        set: we.set
    }, rt.attrHooks.contenteditable = {
        set: function(t, e, n) {
            we.set(t, "" === e ? !1 : e, n)
        }
    }, rt.each(["width", "height"], function(t, e) {
        rt.attrHooks[e] = {
            set: function(t, n) {
                return "" === n ? (t.setAttribute(e, "auto"), n) : void 0
            }
        }
    })), nt.style || (rt.attrHooks.style = {
        get: function(t) {
            return t.style.cssText || void 0
        },
        set: function(t, e) {
            return t.style.cssText = e + ""
        }
    });
    var Ee = /^(?:input|select|textarea|button|object)$/i,
        De = /^(?:a|area)$/i;
    rt.fn.extend({
        prop: function(t, e) {
            return Nt(this, rt.prop, t, e, arguments.length > 1)
        },
        removeProp: function(t) {
            return t = rt.propFix[t] || t, this.each(function() {
                try {
                    this[t] = void 0, delete this[t]
                } catch (e) {}
            })
        }
    }), rt.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(t, e, n) {
            var i, r, o, a = t.nodeType;
            if (t && 3 !== a && 8 !== a && 2 !== a) return o = 1 !== a || !rt.isXMLDoc(t), o && (e = rt.propFix[e] || e, r = rt.propHooks[e]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : t[e] = n : r && "get" in r && null !== (i = r.get(t, e)) ? i : t[e]
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    var e = rt.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : Ee.test(t.nodeName) || De.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        }
    }), nt.hrefNormalized || rt.each(["href", "src"], function(t, e) {
        rt.propHooks[e] = {
            get: function(t) {
                return t.getAttribute(e, 4)
            }
        }
    }), nt.optSelected || (rt.propHooks.selected = {
        get: function(t) {
            var e = t.parentNode;
            return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
        }
    }), rt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        rt.propFix[this.toLowerCase()] = this
    }), nt.enctype || (rt.propFix.enctype = "encoding");
    var Ne = /[\t\r\n\f]/g;
    rt.fn.extend({
        addClass: function(t) {
            var e, n, i, r, o, a, s = 0,
                l = this.length,
                c = "string" == typeof t && t;
            if (rt.isFunction(t)) return this.each(function(e) {
                rt(this).addClass(t.call(this, e, this.className))
            });
            if (c)
                for (e = (t || "").match(xt) || []; l > s; s++)
                    if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Ne, " ") : " ")) {
                        for (o = 0; r = e[o++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                        a = rt.trim(i), n.className !== a && (n.className = a)
                    }
            return this
        },
        removeClass: function(t) {
            var e, n, i, r, o, a, s = 0,
                l = this.length,
                c = 0 === arguments.length || "string" == typeof t && t;
            if (rt.isFunction(t)) return this.each(function(e) {
                rt(this).removeClass(t.call(this, e, this.className))
            });
            if (c)
                for (e = (t || "").match(xt) || []; l > s; s++)
                    if (n = this[s], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Ne, " ") : "")) {
                        for (o = 0; r = e[o++];)
                            for (; i.indexOf(" " + r + " ") >= 0;) i = i.replace(" " + r + " ", " ");
                        a = t ? rt.trim(i) : "", n.className !== a && (n.className = a)
                    }
            return this
        },
        toggleClass: function(t, e) {
            var n = typeof t;
            return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : rt.isFunction(t) ? this.each(function(n) {
                rt(this).toggleClass(t.call(this, n, this.className, e), e)
            }) : this.each(function() {
                if ("string" === n)
                    for (var e, i = 0, r = rt(this), o = t.match(xt) || []; e = o[i++];) r.hasClass(e) ? r.removeClass(e) : r.addClass(e);
                else(n === St || "boolean" === n) && (this.className && rt._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : rt._data(this, "__className__") || "")
            })
        },
        hasClass: function(t) {
            for (var e = " " + t + " ", n = 0, i = this.length; i > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Ne, " ").indexOf(e) >= 0) return !0;
            return !1
        }
    }), rt.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
        rt.fn[e] = function(t, n) {
            return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
        }
    }), rt.fn.extend({
        hover: function(t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        },
        bind: function(t, e, n) {
            return this.on(t, null, e, n)
        },
        unbind: function(t, e) {
            return this.off(t, null, e)
        },
        delegate: function(t, e, n, i) {
            return this.on(e, t, n, i)
        },
        undelegate: function(t, e, n) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
        }
    });
    var $e = rt.now(),
        Re = /\?/,
        je = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    rt.parseJSON = function(e) {
        if (t.JSON && t.JSON.parse) return t.JSON.parse(e + "");
        var n, i = null,
            r = rt.trim(e + "");
        return r && !rt.trim(r.replace(je, function(t, e, r, o) {
            return n && e && (i = 0), 0 === i ? t : (n = r || e, i += !o - !r, "")
        })) ? Function("return " + r)() : rt.error("Invalid JSON: " + e)
    }, rt.parseXML = function(e) {
        var n, i;
        if (!e || "string" != typeof e) return null;
        try {
            t.DOMParser ? (i = new DOMParser, n = i.parseFromString(e, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(e))
        } catch (r) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || rt.error("Invalid XML: " + e), n
    };
    var Ie, _e, Oe = /#.*$/,
        Le = /([?&])_=[^&]*/,
        Fe = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Me = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Pe = /^(?:GET|HEAD)$/,
        Be = /^\/\//,
        We = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        ze = {},
        He = {},
        qe = "*/".concat("*");
    try {
        _e = location.href
    } catch (Xe) {
        _e = pt.createElement("a"), _e.href = "", _e = _e.href
    }
    Ie = We.exec(_e.toLowerCase()) || [], rt.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: _e,
            type: "GET",
            isLocal: Me.test(Ie[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": qe,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": rt.parseJSON,
                "text xml": rt.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(t, e) {
            return e ? W(W(t, rt.ajaxSettings), e) : W(rt.ajaxSettings, t)
        },
        ajaxPrefilter: P(ze),
        ajaxTransport: P(He),
        ajax: function(t, e) {
            function n(t, e, n, i) {
                var r, u, v, y, b, T = e;
                2 !== x && (x = 2, s && clearTimeout(s), c = void 0, a = i || "", w.readyState = t > 0 ? 4 : 0, r = t >= 200 && 300 > t || 304 === t, n && (y = z(h, w, n)), y = H(h, y, w, r), r ? (h.ifModified && (b = w.getResponseHeader("Last-Modified"), b && (rt.lastModified[o] = b), b = w.getResponseHeader("etag"), b && (rt.etag[o] = b)), 204 === t || "HEAD" === h.type ? T = "nocontent" : 304 === t ? T = "notmodified" : (T = y.state, u = y.data, v = y.error, r = !v)) : (v = T, (t || !T) && (T = "error", 0 > t && (t = 0))), w.status = t, w.statusText = (e || T) + "", r ? p.resolveWith(d, [u, T, w]) : p.rejectWith(d, [w, T, v]), w.statusCode(m), m = void 0, l && f.trigger(r ? "ajaxSuccess" : "ajaxError", [w, h, r ? u : v]), g.fireWith(d, [w, T]), l && (f.trigger("ajaxComplete", [w, h]), --rt.active || rt.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (e = t, t = void 0), e = e || {};
            var i, r, o, a, s, l, c, u, h = rt.ajaxSetup({}, e),
                d = h.context || h,
                f = h.context && (d.nodeType || d.jquery) ? rt(d) : rt.event,
                p = rt.Deferred(),
                g = rt.Callbacks("once memory"),
                m = h.statusCode || {},
                v = {},
                y = {},
                x = 0,
                b = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function(t) {
                        var e;
                        if (2 === x) {
                            if (!u)
                                for (u = {}; e = Fe.exec(a);) u[e[1].toLowerCase()] = e[2];
                            e = u[t.toLowerCase()]
                        }
                        return null == e ? null : e
                    },
                    getAllResponseHeaders: function() {
                        return 2 === x ? a : null
                    },
                    setRequestHeader: function(t, e) {
                        var n = t.toLowerCase();
                        return x || (t = y[n] = y[n] || t, v[t] = e), this
                    },
                    overrideMimeType: function(t) {
                        return x || (h.mimeType = t), this
                    },
                    statusCode: function(t) {
                        var e;
                        if (t)
                            if (2 > x)
                                for (e in t) m[e] = [m[e], t[e]];
                            else w.always(t[w.status]);
                        return this
                    },
                    abort: function(t) {
                        var e = t || b;
                        return c && c.abort(e), n(0, e), this
                    }
                };
            if (p.promise(w).complete = g.add, w.success = w.done, w.error = w.fail, h.url = ((t || h.url || _e) + "").replace(Oe, "").replace(Be, Ie[1] + "//"), h.type = e.method || e.type || h.method || h.type, h.dataTypes = rt.trim(h.dataType || "*").toLowerCase().match(xt) || [""], null == h.crossDomain && (i = We.exec(h.url.toLowerCase()), h.crossDomain = !(!i || i[1] === Ie[1] && i[2] === Ie[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (Ie[3] || ("http:" === Ie[1] ? "80" : "443")))), h.data && h.processData && "string" != typeof h.data && (h.data = rt.param(h.data, h.traditional)), B(ze, h, e, w), 2 === x) return w;
            l = rt.event && h.global, l && 0 === rt.active++ && rt.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Pe.test(h.type), o = h.url, h.hasContent || (h.data && (o = h.url += (Re.test(o) ? "&" : "?") + h.data, delete h.data), h.cache === !1 && (h.url = Le.test(o) ? o.replace(Le, "$1_=" + $e++) : o + (Re.test(o) ? "&" : "?") + "_=" + $e++)), h.ifModified && (rt.lastModified[o] && w.setRequestHeader("If-Modified-Since", rt.lastModified[o]), rt.etag[o] && w.setRequestHeader("If-None-Match", rt.etag[o])), (h.data && h.hasContent && h.contentType !== !1 || e.contentType) && w.setRequestHeader("Content-Type", h.contentType), w.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + qe + "; q=0.01" : "") : h.accepts["*"]);
            for (r in h.headers) w.setRequestHeader(r, h.headers[r]);
            if (h.beforeSend && (h.beforeSend.call(d, w, h) === !1 || 2 === x)) return w.abort();
            b = "abort";
            for (r in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) w[r](h[r]);
            if (c = B(He, h, e, w)) {
                w.readyState = 1, l && f.trigger("ajaxSend", [w, h]), h.async && h.timeout > 0 && (s = setTimeout(function() {
                    w.abort("timeout")
                }, h.timeout));
                try {
                    x = 1, c.send(v, n)
                } catch (T) {
                    if (!(2 > x)) throw T;
                    n(-1, T)
                }
            } else n(-1, "No Transport");
            return w
        },
        getJSON: function(t, e, n) {
            return rt.get(t, e, n, "json")
        },
        getScript: function(t, e) {
            return rt.get(t, void 0, e, "script")
        }
    }), rt.each(["get", "post"], function(t, e) {
        rt[e] = function(t, n, i, r) {
            return rt.isFunction(n) && (r = r || i, i = n, n = void 0), rt.ajax({
                url: t,
                type: e,
                dataType: r,
                data: n,
                success: i
            })
        }
    }), rt._evalUrl = function(t) {
        return rt.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, rt.fn.extend({
        wrapAll: function(t) {
            if (rt.isFunction(t)) return this.each(function(e) {
                rt(this).wrapAll(t.call(this, e))
            });
            if (this[0]) {
                var e = rt(t, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                    return t
                }).append(this)
            }
            return this
        },
        wrapInner: function(t) {
            return rt.isFunction(t) ? this.each(function(e) {
                rt(this).wrapInner(t.call(this, e))
            }) : this.each(function() {
                var e = rt(this),
                    n = e.contents();
                n.length ? n.wrapAll(t) : e.append(t)
            })
        },
        wrap: function(t) {
            var e = rt.isFunction(t);
            return this.each(function(n) {
                rt(this).wrapAll(e ? t.call(this, n) : t)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                rt.nodeName(this, "body") || rt(this).replaceWith(this.childNodes)
            }).end()
        }
    }), rt.expr.filters.hidden = function(t) {
        return t.offsetWidth <= 0 && t.offsetHeight <= 0 || !nt.reliableHiddenOffsets() && "none" === (t.style && t.style.display || rt.css(t, "display"))
    }, rt.expr.filters.visible = function(t) {
        return !rt.expr.filters.hidden(t)
    };
    var Ue = /%20/g,
        Ye = /\[\]$/,
        Ve = /\r?\n/g,
        Ge = /^(?:submit|button|image|reset|file)$/i,
        Qe = /^(?:input|select|textarea|keygen)/i;
    rt.param = function(t, e) {
        var n, i = [],
            r = function(t, e) {
                e = rt.isFunction(e) ? e() : null == e ? "" : e, i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
            };
        if (void 0 === e && (e = rt.ajaxSettings && rt.ajaxSettings.traditional), rt.isArray(t) || t.jquery && !rt.isPlainObject(t)) rt.each(t, function() {
            r(this.name, this.value)
        });
        else
            for (n in t) q(n, t[n], e, r);
        return i.join("&").replace(Ue, "+")
    }, rt.fn.extend({
        serialize: function() {
            return rt.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var t = rt.prop(this, "elements");
                return t ? rt.makeArray(t) : this
            }).filter(function() {
                var t = this.type;
                return this.name && !rt(this).is(":disabled") && Qe.test(this.nodeName) && !Ge.test(t) && (this.checked || !$t.test(t))
            }).map(function(t, e) {
                var n = rt(this).val();
                return null == n ? null : rt.isArray(n) ? rt.map(n, function(t) {
                    return {
                        name: e.name,
                        value: t.replace(Ve, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: n.replace(Ve, "\r\n")
                }
            }).get()
        }
    }), rt.ajaxSettings.xhr = void 0 !== t.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && X() || U()
    } : X;
    var Je = 0,
        Ke = {},
        Ze = rt.ajaxSettings.xhr();
    t.attachEvent && t.attachEvent("onunload", function() {
        for (var t in Ke) Ke[t](void 0, !0)
    }), nt.cors = !!Ze && "withCredentials" in Ze, Ze = nt.ajax = !!Ze, Ze && rt.ajaxTransport(function(t) {
        if (!t.crossDomain || nt.cors) {
            var e;
            return {
                send: function(n, i) {
                    var r, o = t.xhr(),
                        a = ++Je;
                    if (o.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                        for (r in t.xhrFields) o[r] = t.xhrFields[r];
                    t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType), t.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (r in n) void 0 !== n[r] && o.setRequestHeader(r, n[r] + "");
                    o.send(t.hasContent && t.data || null), e = function(n, r) {
                        var s, l, c;
                        if (e && (r || 4 === o.readyState))
                            if (delete Ke[a], e = void 0, o.onreadystatechange = rt.noop, r) 4 !== o.readyState && o.abort();
                            else {
                                c = {}, s = o.status, "string" == typeof o.responseText && (c.text = o.responseText);
                                try {
                                    l = o.statusText
                                } catch (u) {
                                    l = ""
                                }
                                s || !t.isLocal || t.crossDomain ? 1223 === s && (s = 204) : s = c.text ? 200 : 404
                            }
                        c && i(s, l, c, o.getAllResponseHeaders())
                    }, t.async ? 4 === o.readyState ? setTimeout(e) : o.onreadystatechange = Ke[a] = e : e()
                },
                abort: function() {
                    e && e(void 0, !0)
                }
            }
        }
    }), rt.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(t) {
                return rt.globalEval(t), t
            }
        }
    }), rt.ajaxPrefilter("script", function(t) {
        void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
    }), rt.ajaxTransport("script", function(t) {
        if (t.crossDomain) {
            var e, n = pt.head || rt("head")[0] || pt.documentElement;
            return {
                send: function(i, r) {
                    e = pt.createElement("script"), e.async = !0, t.scriptCharset && (e.charset = t.scriptCharset), e.src = t.url, e.onload = e.onreadystatechange = function(t, n) {
                        (n || !e.readyState || /loaded|complete/.test(e.readyState)) && (e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e), e = null, n || r(200, "success"))
                    }, n.insertBefore(e, n.firstChild)
                },
                abort: function() {
                    e && e.onload(void 0, !0)
                }
            }
        }
    });
    var tn = [],
        en = /(=)\?(?=&|$)|\?\?/;
    rt.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = tn.pop() || rt.expando + "_" + $e++;
            return this[t] = !0, t
        }
    }), rt.ajaxPrefilter("json jsonp", function(e, n, i) {
        var r, o, a, s = e.jsonp !== !1 && (en.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && en.test(e.data) && "data");
        return s || "jsonp" === e.dataTypes[0] ? (r = e.jsonpCallback = rt.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(en, "$1" + r) : e.jsonp !== !1 && (e.url += (Re.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
            return a || rt.error(r + " was not called"), a[0]
        }, e.dataTypes[0] = "json", o = t[r], t[r] = function() {
            a = arguments
        }, i.always(function() {
            t[r] = o, e[r] && (e.jsonpCallback = n.jsonpCallback, tn.push(r)), a && rt.isFunction(o) && o(a[0]), a = o = void 0
        }), "script") : void 0
    }), rt.parseHTML = function(t, e, n) {
        if (!t || "string" != typeof t) return null;
        "boolean" == typeof e && (n = e, e = !1), e = e || pt;
        var i = ht.exec(t),
            r = !n && [];
        return i ? [e.createElement(i[1])] : (i = rt.buildFragment([t], e, r), r && r.length && rt(r).remove(), rt.merge([], i.childNodes))
    };
    var nn = rt.fn.load;
    rt.fn.load = function(t, e, n) {
        if ("string" != typeof t && nn) return nn.apply(this, arguments);
        var i, r, o, a = this,
            s = t.indexOf(" ");
        return s >= 0 && (i = rt.trim(t.slice(s, t.length)), t = t.slice(0, s)), rt.isFunction(e) ? (n = e, e = void 0) : e && "object" == typeof e && (o = "POST"), a.length > 0 && rt.ajax({
            url: t,
            type: o,
            dataType: "html",
            data: e
        }).done(function(t) {
            r = arguments, a.html(i ? rt("<div>").append(rt.parseHTML(t)).find(i) : t)
        }).complete(n && function(t, e) {
            a.each(n, r || [t.responseText, e, t])
        }), this
    }, rt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
        rt.fn[e] = function(t) {
            return this.on(e, t)
        }
    }), rt.expr.filters.animated = function(t) {
        return rt.grep(rt.timers, function(e) {
            return t === e.elem
        }).length
    };
    var rn = t.document.documentElement;
    rt.offset = {
        setOffset: function(t, e, n) {
            var i, r, o, a, s, l, c, u = rt.css(t, "position"),
                h = rt(t),
                d = {};
            "static" === u && (t.style.position = "relative"), s = h.offset(), o = rt.css(t, "top"), l = rt.css(t, "left"), c = ("absolute" === u || "fixed" === u) && rt.inArray("auto", [o, l]) > -1, c ? (i = h.position(), a = i.top, r = i.left) : (a = parseFloat(o) || 0, r = parseFloat(l) || 0), rt.isFunction(e) && (e = e.call(t, n, s)), null != e.top && (d.top = e.top - s.top + a), null != e.left && (d.left = e.left - s.left + r), "using" in e ? e.using.call(t, d) : h.css(d)
        }
    }, rt.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                rt.offset.setOffset(this, t, e)
            });
            var e, n, i = {
                    top: 0,
                    left: 0
                },
                r = this[0],
                o = r && r.ownerDocument;
            if (o) return e = o.documentElement, rt.contains(e, r) ? (typeof r.getBoundingClientRect !== St && (i = r.getBoundingClientRect()), n = Y(o), {
                top: i.top + (n.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: i.left + (n.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }) : i
        },
        position: function() {
            if (this[0]) {
                var t, e, n = {
                        top: 0,
                        left: 0
                    },
                    i = this[0];
                return "fixed" === rt.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), rt.nodeName(t[0], "html") || (n = t.offset()), n.top += rt.css(t[0], "borderTopWidth", !0), n.left += rt.css(t[0], "borderLeftWidth", !0)), {
                    top: e.top - n.top - rt.css(i, "marginTop", !0),
                    left: e.left - n.left - rt.css(i, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent || rn; t && !rt.nodeName(t, "html") && "static" === rt.css(t, "position");) t = t.offsetParent;
                return t || rn
            })
        }
    }), rt.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, e) {
        var n = /Y/.test(e);
        rt.fn[t] = function(i) {
            return Nt(this, function(t, i, r) {
                var o = Y(t);
                return void 0 === r ? o ? e in o ? o[e] : o.document.documentElement[i] : t[i] : void(o ? o.scrollTo(n ? rt(o).scrollLeft() : r, n ? r : rt(o).scrollTop()) : t[i] = r)
            }, t, i, arguments.length, null)
        }
    }), rt.each(["top", "left"], function(t, e) {
        rt.cssHooks[e] = k(nt.pixelPosition, function(t, n) {
            return n ? (n = ee(t, e), ie.test(n) ? rt(t).position()[e] + "px" : n) : void 0
        })
    }), rt.each({
        Height: "height",
        Width: "width"
    }, function(t, e) {
        rt.each({
            padding: "inner" + t,
            content: e,
            "": "outer" + t
        }, function(n, i) {
            rt.fn[i] = function(i, r) {
                var o = arguments.length && (n || "boolean" != typeof i),
                    a = n || (i === !0 || r === !0 ? "margin" : "border");
                return Nt(this, function(e, n, i) {
                    var r;
                    return rt.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + t], r["scroll" + t], e.body["offset" + t], r["offset" + t], r["client" + t])) : void 0 === i ? rt.css(e, n, a) : rt.style(e, n, i, a)
                }, e, o ? i : void 0, o, null)
            }
        })
    }), rt.fn.size = function() {
        return this.length
    }, rt.fn.andSelf = rt.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return rt
    });
    var on = t.jQuery,
        an = t.$;
    return rt.noConflict = function(e) {
        return t.$ === rt && (t.$ = an), e && t.jQuery === rt && (t.jQuery = on), rt
    }, typeof e === St && (t.jQuery = t.$ = rt), rt
}),
function(t, e) {
    "use strict";
    t.rails !== e && t.error("jquery-ujs has already been loaded!");
    var n, i = t(document);
    t.rails = n = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]",
        buttonClickSelector: "button[data-remote]:not(form button), button[data-confirm]:not(form button)",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input[type=file]:not([disabled])",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        csrfToken: function() {
            return t("meta[name=csrf-token]").attr("content")
        },
        csrfParam: function() {
            return t("meta[name=csrf-param]").attr("content")
        },
        CSRFProtection: function(t) {
            var e = n.csrfToken();
            e && t.setRequestHeader("X-CSRF-Token", e)
        },
        refreshCSRFTokens: function() {
            t('form input[name="' + n.csrfParam() + '"]').val(n.csrfToken())
        },
        fire: function(e, n, i) {
            var r = t.Event(n);
            return e.trigger(r, i), r.result !== !1
        },
        confirm: function(t) {
            return confirm(t)
        },
        ajax: function(e) {
            return t.ajax(e)
        },
        href: function(t) {
            return t[0].href
        },
        isRemote: function(t) {
            return t.data("remote") !== e && t.data("remote") !== !1
        },
        handleRemote: function(i) {
            var r, o, a, s, l, c;
            if (n.fire(i, "ajax:before")) {
                if (s = i.data("with-credentials") || null, l = i.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, i.is("form")) {
                    r = i.attr("method"), o = i.attr("action"), a = i.serializeArray();
                    var u = i.data("ujs:submit-button");
                    u && (a.push(u), i.data("ujs:submit-button", null))
                } else i.is(n.inputChangeSelector) ? (r = i.data("method"), o = i.data("url"), a = i.serialize(), i.data("params") && (a = a + "&" + i.data("params"))) : i.is(n.buttonClickSelector) ? (r = i.data("method") || "get", o = i.data("url"), a = i.serialize(), i.data("params") && (a = a + "&" + i.data("params"))) : (r = i.data("method"), o = n.href(i), a = i.data("params") || null);
                return c = {
                    type: r || "GET",
                    data: a,
                    dataType: l,
                    beforeSend: function(t, r) {
                        return r.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + r.accepts.script), n.fire(i, "ajax:beforeSend", [t, r]) ? void i.trigger("ajax:send", t) : !1
                    },
                    success: function(t, e, n) {
                        i.trigger("ajax:success", [t, e, n])
                    },
                    complete: function(t, e) {
                        i.trigger("ajax:complete", [t, e])
                    },
                    error: function(t, e, n) {
                        i.trigger("ajax:error", [t, e, n])
                    },
                    crossDomain: n.isCrossDomain(o)
                }, s && (c.xhrFields = {
                    withCredentials: s
                }), o && (c.url = o), n.ajax(c)
            }
            return !1
        },
        isCrossDomain: function(t) {
            var e = document.createElement("a");
            e.href = location.href;
            var n = document.createElement("a");
            try {
                return n.href = t, n.href = n.href, !((!n.protocol || ":" === n.protocol) && !n.host || e.protocol + "//" + e.host == n.protocol + "//" + n.host)
            } catch (i) {
                return !0
            }
        },
        handleMethod: function(i) {
            var r = n.href(i),
                o = i.data("method"),
                a = i.attr("target"),
                s = n.csrfToken(),
                l = n.csrfParam(),
                c = t('<form method="post" action="' + r + '"></form>'),
                u = '<input name="_method" value="' + o + '" type="hidden" />';
            l === e || s === e || n.isCrossDomain(r) || (u += '<input name="' + l + '" value="' + s + '" type="hidden" />'), a && c.attr("target", a), c.hide().append(u).appendTo("body"), c.submit()
        },
        formElements: function(e, n) {
            return e.is("form") ? t(e[0].elements).filter(n) : e.find(n)
        },
        disableFormElements: function(e) {
            n.formElements(e, n.disableSelector).each(function() {
                n.disableFormElement(t(this))
            })
        },
        disableFormElement: function(t) {
            var n, i;
            n = t.is("button") ? "html" : "val", i = t.data("disable-with"), t.data("ujs:enable-with", t[n]()), i !== e && t[n](i), t.prop("disabled", !0)
        },
        enableFormElements: function(e) {
            n.formElements(e, n.enableSelector).each(function() {
                n.enableFormElement(t(this))
            })
        },
        enableFormElement: function(t) {
            var e = t.is("button") ? "html" : "val";
            "undefined" != typeof t.data("ujs:enable-with") && t[e](t.data("ujs:enable-with")), t.prop("disabled", !1)
        },
        allowAction: function(t) {
            var e, i = t.data("confirm"),
                r = !1;
            if (!i) return !0;
            if (n.fire(t, "confirm")) {
                try {
                    r = n.confirm(i)
                } catch (o) {
                    (console.error || console.log).call(console, o.stack || o)
                }
                e = n.fire(t, "confirm:complete", [r])
            }
            return r && e
        },
        blankInputs: function(e, n, i) {
            var r, o, a = t(),
                s = n || "input,textarea",
                l = e.find(s);
            return l.each(function() {
                if (r = t(this), o = r.is("input[type=checkbox],input[type=radio]") ? r.is(":checked") : !!r.val(), o === i) {
                    if (r.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + r.attr("name") + '"]').length) return !0;
                    a = a.add(r)
                }
            }), a.length ? a : !1
        },
        nonBlankInputs: function(t, e) {
            return n.blankInputs(t, e, !0)
        },
        stopEverything: function(e) {
            return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
        },
        disableElement: function(t) {
            var i = t.data("disable-with");
            t.data("ujs:enable-with", t.html()), i !== e && t.html(i), t.bind("click.railsDisable", function(t) {
                return n.stopEverything(t)
            })
        },
        enableElement: function(t) {
            t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable")
        }
    }, n.fire(i, "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, i) {
        t.crossDomain || n.CSRFProtection(i)
    }), t(window).on("pageshow.rails", function() {
        t(t.rails.enableSelector).each(function() {
            var e = t(this);
            e.data("ujs:enable-with") && t.rails.enableFormElement(e)
        }), t(t.rails.linkDisableSelector).each(function() {
            var e = t(this);
            e.data("ujs:enable-with") && t.rails.enableElement(e)
        })
    }), i.delegate(n.linkDisableSelector, "ajax:complete", function() {
        n.enableElement(t(this))
    }), i.delegate(n.buttonDisableSelector, "ajax:complete", function() {
        n.enableFormElement(t(this))
    }), i.delegate(n.linkClickSelector, "click.rails", function(e) {
        var i = t(this),
            r = i.data("method"),
            o = i.data("params"),
            a = e.metaKey || e.ctrlKey;
        if (!n.allowAction(i)) return n.stopEverything(e);
        if (!a && i.is(n.linkDisableSelector) && n.disableElement(i), n.isRemote(i)) {
            if (a && (!r || "GET" === r) && !o) return !0;
            var s = n.handleRemote(i);
            return s === !1 ? n.enableElement(i) : s.fail(function() {
                n.enableElement(i)
            }), !1
        }
        return r ? (n.handleMethod(i), !1) : void 0
    }), i.delegate(n.buttonClickSelector, "click.rails", function(e) {
        var i = t(this);
        if (!n.allowAction(i) || !n.isRemote(i)) return n.stopEverything(e);
        i.is(n.buttonDisableSelector) && n.disableFormElement(i);
        var r = n.handleRemote(i);
        return r === !1 ? n.enableFormElement(i) : r.fail(function() {
            n.enableFormElement(i)
        }), !1
    }), i.delegate(n.inputChangeSelector, "change.rails", function(e) {
        var i = t(this);
        return n.allowAction(i) && n.isRemote(i) ? (n.handleRemote(i), !1) : n.stopEverything(e)
    }), i.delegate(n.formSubmitSelector, "submit.rails", function(i) {
        var r, o, a = t(this),
            s = n.isRemote(a);
        if (!n.allowAction(a)) return n.stopEverything(i);
        if (a.attr("novalidate") === e && (r = n.blankInputs(a, n.requiredInputSelector, !1), r && n.fire(a, "ajax:aborted:required", [r]))) return n.stopEverything(i);
        if (s) {
            if (o = n.nonBlankInputs(a, n.fileInputSelector)) {
                setTimeout(function() {
                    n.disableFormElements(a)
                }, 13);
                var l = n.fire(a, "ajax:aborted:file", [o]);
                return l || setTimeout(function() {
                    n.enableFormElements(a)
                }, 13), l
            }
            return n.handleRemote(a), !1
        }
        setTimeout(function() {
            n.disableFormElements(a)
        }, 13)
    }), i.delegate(n.formInputClickSelector, "click.rails", function(e) {
        var i = t(this);
        if (!n.allowAction(i)) return n.stopEverything(e);
        var r = i.attr("name"),
            o = r ? {
                name: r,
                value: i.val()
            } : null;
        i.closest("form").data("ujs:submit-button", o)
    }), i.delegate(n.formSubmitSelector, "ajax:send.rails", function(e) {
        this === e.target && n.disableFormElements(t(this))
    }), i.delegate(n.formSubmitSelector, "ajax:complete.rails", function(e) {
        this === e.target && n.enableFormElements(t(this))
    }), t(function() {
        n.refreshCSRFTokens()
    }))
}(jQuery), Winwheel.prototype.updateSegmentSizes = function() {
    if (this.segments) {
        var t = 0,
            e = 0;
        for (x = 1; x <= this.numSegments; x++) null !== this.segments[x].size && (t += this.segments[x].size, e++);
        var n = 360 - t,
            i = 0;
        n > 0 && (i = n / (this.numSegments - e));
        var r = 0;
        for (x = 1; x <= this.numSegments; x++) this.segments[x].startAngle = r, r += this.segments[x].size ? this.segments[x].size : i, this.segments[x].endAngle = r
    }
}, Winwheel.prototype.clearCanvas = function() {
    this.ctx && this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
}, Winwheel.prototype.draw = function(t) {
    this.ctx && ("undefined" != typeof t ? 1 == t && this.clearCanvas() : this.clearCanvas(), "image" == this.drawMode ? (this.drawWheelImage(), 1 == this.drawText && this.drawSegmentText(), 1 == this.imageOverlay && this.drawSegments()) : "segmentImage" == this.drawMode ? (this.drawSegmentImages(), 1 == this.drawText && this.drawSegmentText(), 1 == this.imageOverlay && this.drawSegments()) : (this.drawSegments(), 1 == this.drawText && this.drawSegmentText()), "undefined" != typeof this.pins && 1 == this.pins.visible && this.drawPins(), 1 == this.pointerGuide.display && this.drawPointerGuide())
}, Winwheel.prototype.drawPins = function() {
    if (this.pins && this.pins.number) {
        var t = 360 / this.pins.number;
        for (i = 1; i <= this.pins.number; i++) this.ctx.save(), this.ctx.strokeStyle = this.pins.strokeStyle, this.ctx.lineWidth = this.pins.lineWidth, this.ctx.fillStyle = this.pins.fillStyle, this.ctx.translate(this.centerX, this.centerY), this.ctx.rotate(this.degToRad(i * t + this.rotationAngle)), this.ctx.translate(-this.centerX, -this.centerY), this.ctx.beginPath(), this.ctx.arc(this.centerX, this.centerY - this.outerRadius + this.pins.outerRadius + this.pins.margin, this.pins.outerRadius, 0, 2 * Math.PI), this.pins.fillStyle && this.ctx.fill(), this.pins.strokeStyle && this.ctx.stroke(), this.ctx.restore()
    }
}, Winwheel.prototype.drawPointerGuide = function() {
    this.ctx && (this.ctx.save(), this.ctx.translate(this.centerX, this.centerY), this.ctx.rotate(this.degToRad(this.pointerAngle)), this.ctx.translate(-this.centerX, -this.centerY), this.ctx.strokeStyle = this.pointerGuide.strokeStyle, this.ctx.lineWidth = this.pointerGuide.lineWidth, this.ctx.beginPath(), this.ctx.moveTo(this.centerX, this.centerY), this.ctx.lineTo(this.centerX, -(this.outerRadius / 4)), this.ctx.stroke(), this.ctx.restore())
}, Winwheel.prototype.drawWheelImage = function() {
    if (null != this.wheelImage) {
        var t = this.centerX - this.wheelImage.height / 2,
            e = this.centerY - this.wheelImage.width / 2;
        this.ctx.save(), this.ctx.translate(this.centerX, this.centerY), this.ctx.rotate(this.degToRad(this.rotationAngle)), this.ctx.translate(-this.centerX, -this.centerY), this.ctx.drawImage(this.wheelImage, t, e), this.ctx.restore()
    }
}, Winwheel.prototype.drawSegmentImages = function() {
    if (this.ctx && this.segments)
        for (x = 1; x <= this.numSegments; x++)
            if (seg = this.segments[x], seg.imgData.height) {
                var t = 0,
                    e = 0,
                    n = 0,
                    i = "";
                i = null !== seg.imageDirection ? seg.imageDirection : this.imageDirection, "S" == i ? (t = this.centerX - seg.imgData.width / 2, e = this.centerY, n = seg.startAngle + 180 + (seg.endAngle - seg.startAngle) / 2) : "E" == i ? (t = this.centerX, e = this.centerY - seg.imgData.height / 2, n = seg.startAngle + 270 + (seg.endAngle - seg.startAngle) / 2) : "W" == i ? (t = this.centerX - seg.imgData.width, e = this.centerY - seg.imgData.height / 2, n = seg.startAngle + 90 + (seg.endAngle - seg.startAngle) / 2) : (t = this.centerX - seg.imgData.width / 2, e = this.centerY - seg.imgData.height, n = seg.startAngle + (seg.endAngle - seg.startAngle) / 2), this.ctx.save(), this.ctx.translate(this.centerX, this.centerY), this.ctx.rotate(this.degToRad(this.rotationAngle + n)), this.ctx.translate(-this.centerX, -this.centerY), this.ctx.drawImage(seg.imgData, t, e), this.ctx.restore()
            } else console.log("Segment " + x + " imgData is not loaded")
}, Winwheel.prototype.drawSegments = function() {
    if (this.ctx && this.segments)
        for (x = 1; x <= this.numSegments; x++) {
            seg = this.segments[x];
            var t, e, n;
            t = null !== seg.fillStyle ? seg.fillStyle : this.fillStyle, this.ctx.fillStyle = t, e = null !== seg.lineWidth ? seg.lineWidth : this.lineWidth, this.ctx.lineWidth = e, n = null !== seg.strokeStyle ? seg.strokeStyle : this.strokeStyle, this.ctx.strokeStyle = n, (n || t) && (this.ctx.beginPath(), this.innerRadius || this.ctx.moveTo(this.centerX, this.centerY), this.ctx.arc(this.centerX, this.centerY, this.outerRadius, this.degToRad(seg.startAngle + this.rotationAngle - 90), this.degToRad(seg.endAngle + this.rotationAngle - 90), !1), this.innerRadius ? this.ctx.arc(this.centerX, this.centerY, this.innerRadius, this.degToRad(seg.endAngle + this.rotationAngle - 90), this.degToRad(seg.startAngle + this.rotationAngle - 90), !0) : this.ctx.lineTo(this.centerX, this.centerY), t && this.ctx.fill(), n && this.ctx.stroke())
        }
}, Winwheel.prototype.drawSegmentText = function() {
    if (this.ctx) {
        var t, e, n, r, o, a, s, l, c, u, h;
        for (x = 1; x <= this.numSegments; x++) {
            if (this.ctx.save(), seg = this.segments[x], seg.text) {
                t = null !== seg.textFontFamily ? seg.textFontFamily : this.textFontFamily, e = null !== seg.textFontSize ? seg.textFontSize : this.textFontSize, n = null !== seg.textFontWeight ? seg.textFontWeight : this.textFontWeight, r = null !== seg.textOrientation ? seg.textOrientation : this.textOrientation, o = null !== seg.textAlignment ? seg.textAlignment : this.textAlignment, a = null !== seg.textDirection ? seg.textDirection : this.textDirection, s = null !== seg.textMargin ? seg.textMargin : this.textMargin, l = null !== seg.textFillStyle ? seg.textFillStyle : this.textFillStyle, c = null !== seg.textStrokeStyle ? seg.textStrokeStyle : this.textStrokeStyle, u = null !== seg.textLineWidth ? seg.textLineWidth : this.textLineWidth, h = "", null != n && (h += n + " "), null != e && (h += e + "px "), null != t && (h += t), this.ctx.font = h, this.ctx.fillStyle = l, this.ctx.strokeStyle = c, this.ctx.lineWidth = u;
                var d = seg.text.split("\n"),
                    f = 0 - e * (d.length / 2) + e / 2;
                for ("curved" != r || "inner" != o && "outer" != o || (f = 0), i = 0; i < d.length; i++) {
                    if ("reversed" == a) {
                        if ("horizontal" == r) {
                            "inner" == o ? this.ctx.textAlign = "right" : "outer" == o ? this.ctx.textAlign = "left" : this.ctx.textAlign = "center", this.ctx.textBaseline = "middle";
                            var p = this.degToRad(seg.endAngle - (seg.endAngle - seg.startAngle) / 2 + this.rotationAngle - 90 - 180);
                            this.ctx.save(), this.ctx.translate(this.centerX, this.centerY), this.ctx.rotate(p), this.ctx.translate(-this.centerX, -this.centerY), "inner" == o ? (l && this.ctx.fillText(d[i], this.centerX - this.innerRadius - s, this.centerY + f), c && this.ctx.strokeText(d[i], this.centerX - this.innerRadius - s, this.centerY + f)) : "outer" == o ? (l && this.ctx.fillText(d[i], this.centerX - this.outerRadius + s, this.centerY + f), c && this.ctx.strokeText(d[i], this.centerX - this.outerRadius + s, this.centerY + f)) : (l && this.ctx.fillText(d[i], this.centerX - this.innerRadius - (this.outerRadius - this.innerRadius) / 2 - s, this.centerY + f), c && this.ctx.strokeText(d[i], this.centerX - this.innerRadius - (this.outerRadius - this.innerRadius) / 2 - s, this.centerY + f)), this.ctx.restore()
                        } else if ("vertical" == r) {
                            this.ctx.textAlign = "center", "inner" == o ? this.ctx.textBaseline = "top" : "outer" == o ? this.ctx.textBaseline = "bottom" : this.ctx.textBaseline = "middle";
                            var p = seg.endAngle - (seg.endAngle - seg.startAngle) / 2 - 180;
                            if (p += this.rotationAngle, this.ctx.save(), this.ctx.translate(this.centerX, this.centerY), this.ctx.rotate(this.degToRad(p)), this.ctx.translate(-this.centerX, -this.centerY), "outer" == o) var g = this.centerY + this.outerRadius - s;
                            else if ("inner" == o) var g = this.centerY + this.innerRadius + s;
                            var m = e - e / 9;
                            if ("outer" == o)
                                for (var v = d[i].length - 1; v >= 0; v--) character = d[i].charAt(v), l && this.ctx.fillText(character, this.centerX + f, g), c && this.ctx.strokeText(character, this.centerX + f, g), g -= m;
                            else if ("inner" == o)
                                for (var v = 0; v < d[i].length; v++) character = d[i].charAt(v), l && this.ctx.fillText(character, this.centerX + f, g), c && this.ctx.strokeText(character, this.centerX + f, g), g += m;
                            else if ("center" == o) {
                                var y = 0;
                                d[i].length > 1 && (y = m * (d[i].length - 1) / 2);
                                for (var g = this.centerY + this.innerRadius + (this.outerRadius - this.innerRadius) / 2 + y + s, v = d[i].length - 1; v >= 0; v--) character = d[i].charAt(v), l && this.ctx.fillText(character, this.centerX + f, g), c && this.ctx.strokeText(character, this.centerX + f, g), g -= m
                            }
                            this.ctx.restore()
                        } else if ("curved" == r) {
                            var b = 0;
                            "inner" == o ? (b = this.innerRadius + s, this.ctx.textBaseline = "top") : "outer" == o ? (b = this.outerRadius - s, this.ctx.textBaseline = "bottom", b -= e * (d.length - 1)) : "center" == o && (b = this.innerRadius + s + (this.outerRadius - this.innerRadius) / 2, this.ctx.textBaseline = "middle");
                            var w = 0,
                                T = 0;
                            for (d[i].length > 1 ? (this.ctx.textAlign = "left", w = 4 * (e / 10), radiusPercent = 100 / b, w *= radiusPercent, totalArc = w * d[i].length, T = seg.startAngle + ((seg.endAngle - seg.startAngle) / 2 - totalArc / 2)) : (T = seg.startAngle + (seg.endAngle - seg.startAngle) / 2, this.ctx.textAlign = "center"), T += this.rotationAngle, T -= 180, v = d[i].length; v >= 0; v--) this.ctx.save(), character = d[i].charAt(v), this.ctx.translate(this.centerX, this.centerY), this.ctx.rotate(this.degToRad(T)), this.ctx.translate(-this.centerX, -this.centerY), c && this.ctx.strokeText(character, this.centerX, this.centerY + b + f), l && this.ctx.fillText(character, this.centerX, this.centerY + b + f), T += w, this.ctx.restore()
                        }
                    } else if ("horizontal" == r) {
                        "inner" == o ? this.ctx.textAlign = "left" : "outer" == o ? this.ctx.textAlign = "right" : this.ctx.textAlign = "center", this.ctx.textBaseline = "middle";
                        var p = this.degToRad(seg.endAngle - (seg.endAngle - seg.startAngle) / 2 + this.rotationAngle - 90);
                        this.ctx.save(), this.ctx.translate(this.centerX, this.centerY), this.ctx.rotate(p), this.ctx.translate(-this.centerX, -this.centerY), "inner" == o ? (l && this.ctx.fillText(d[i], this.centerX + this.innerRadius + s, this.centerY + f), c && this.ctx.strokeText(d[i], this.centerX + this.innerRadius + s, this.centerY + f)) : "outer" == o ? (l && this.ctx.fillText(d[i], this.centerX + this.outerRadius - s, this.centerY + f),
                            c && this.ctx.strokeText(d[i], this.centerX + this.outerRadius - s, this.centerY + f)) : (l && this.ctx.fillText(d[i], this.centerX + this.innerRadius + (this.outerRadius - this.innerRadius) / 2 + s, this.centerY + f), c && this.ctx.strokeText(d[i], this.centerX + this.innerRadius + (this.outerRadius - this.innerRadius) / 2 + s, this.centerY + f)), this.ctx.restore()
                    } else if ("vertical" == r) {
                        this.ctx.textAlign = "center", "inner" == o ? this.ctx.textBaseline = "bottom" : "outer" == o ? this.ctx.textBaseline = "top" : this.ctx.textBaseline = "middle";
                        var p = seg.endAngle - (seg.endAngle - seg.startAngle) / 2;
                        if (p += this.rotationAngle, this.ctx.save(), this.ctx.translate(this.centerX, this.centerY), this.ctx.rotate(this.degToRad(p)), this.ctx.translate(-this.centerX, -this.centerY), "outer" == o) var g = this.centerY - this.outerRadius + s;
                        else if ("inner" == o) var g = this.centerY - this.innerRadius - s;
                        var m = e - e / 9;
                        if ("outer" == o)
                            for (var v = 0; v < d[i].length; v++) character = d[i].charAt(v), l && this.ctx.fillText(character, this.centerX + f, g), c && this.ctx.strokeText(character, this.centerX + f, g), g += m;
                        else if ("inner" == o)
                            for (var v = d[i].length - 1; v >= 0; v--) character = d[i].charAt(v), l && this.ctx.fillText(character, this.centerX + f, g), c && this.ctx.strokeText(character, this.centerX + f, g), g -= m;
                        else if ("center" == o) {
                            var y = 0;
                            d[i].length > 1 && (y = m * (d[i].length - 1) / 2);
                            for (var g = this.centerY - this.innerRadius - (this.outerRadius - this.innerRadius) / 2 - y - s, v = 0; v < d[i].length; v++) character = d[i].charAt(v), l && this.ctx.fillText(character, this.centerX + f, g), c && this.ctx.strokeText(character, this.centerX + f, g), g += m
                        }
                        this.ctx.restore()
                    } else if ("curved" == r) {
                        var b = 0;
                        "inner" == o ? (b = this.innerRadius + s, this.ctx.textBaseline = "bottom", b += e * (d.length - 1)) : "outer" == o ? (b = this.outerRadius - s, this.ctx.textBaseline = "top") : "center" == o && (b = this.innerRadius + s + (this.outerRadius - this.innerRadius) / 2, this.ctx.textBaseline = "middle");
                        var w = 0,
                            T = 0;
                        for (d[i].length > 1 ? (this.ctx.textAlign = "left", w = 4 * (e / 10), radiusPercent = 100 / b, w *= radiusPercent, totalArc = w * d[i].length, T = seg.startAngle + ((seg.endAngle - seg.startAngle) / 2 - totalArc / 2)) : (T = seg.startAngle + (seg.endAngle - seg.startAngle) / 2, this.ctx.textAlign = "center"), T += this.rotationAngle, v = 0; v < d[i].length; v++) this.ctx.save(), character = d[i].charAt(v), this.ctx.translate(this.centerX, this.centerY), this.ctx.rotate(this.degToRad(T)), this.ctx.translate(-this.centerX, -this.centerY), c && this.ctx.strokeText(character, this.centerX, this.centerY - b + f), l && this.ctx.fillText(character, this.centerX, this.centerY - b + f), T += w, this.ctx.restore()
                    }
                    f += e
                }
            }
            this.ctx.restore()
        }
    }
}, Winwheel.prototype.degToRad = function(t) {
    return .017453292519943295 * t
}, Winwheel.prototype.setCenter = function(t, e) {
    this.centerX = t, this.centerY = e
}, Winwheel.prototype.addSegment = function(t, e) {
    newSegment = new Segment(t), this.numSegments++;
    var n;
    if ("undefined" != typeof e) {
        for (var i = this.numSegments; i > e; i--) this.segments[i] = this.segments[i - 1];
        this.segments[e] = newSegment, n = e
    } else this.segments[this.numSegments] = newSegment, n = this.numSegments;
    return this.updateSegmentSizes(), this.segments[n]
}, Winwheel.prototype.setCanvasId = function(t) {
    t ? (this.canvasId = t, this.canvas = document.getElementById(this.canvasId), this.canvas && (this.ctx = this.canvas.getContext("2d"))) : (this.canvasId = null, this.ctx = null, this.canvas = null)
}, Winwheel.prototype.deleteSegment = function(t) {
    if (this.numSegments > 1) {
        if ("undefined" != typeof t)
            for (var e = t; e < this.numSegments; e++) this.segments[e] = this.segments[e + 1];
        this.segments[this.numSegments] = void 0, this.numSegments--, this.updateSegmentSizes()
    }
}, Winwheel.prototype.windowToCanvas = function(t, e) {
    var n = this.canvas.getBoundingClientRect();
    return {
        x: Math.floor(t - n.left * (this.canvas.width / n.width)),
        y: Math.floor(e - n.top * (this.canvas.height / n.height))
    }
}, Winwheel.prototype.getSegmentAt = function(t, e) {
    var n = null,
        i = this.getSegmentNumberAt(t, e);
    return null !== i && (n = this.segments[i]), n
}, Winwheel.prototype.getSegmentNumberAt = function(t, e) {
    var n, i, r, o, a, s = this.windowToCanvas(t, e);
    s.x > this.centerX ? (r = s.x - this.centerX, i = "R") : (r = this.centerX - s.x, i = "L"), s.y > this.centerY ? (o = s.y - this.centerY, n = "B") : (o = this.centerY - s.y, n = "T");
    var l = o / r,
        c = 180 * Math.atan(l) / Math.PI,
        u = 0;
    if (a = Math.sqrt(o * o + r * r), "T" == n && "R" == i ? u = Math.round(90 - c) : "B" == n && "R" == i ? u = Math.round(c + 90) : "B" == n && "L" == i ? u = Math.round(90 - c + 180) : "T" == n && "L" == i && (u = Math.round(c + 270)), 0 != this.rotationAngle) {
        var h = this.getRotationPosition();
        u -= h, 0 > u && (u = 360 - Math.abs(u))
    }
    for (var d = null, t = 1; t <= this.numSegments; t++)
        if (u >= this.segments[t].startAngle && u <= this.segments[t].endAngle && a >= this.innerRadius && a <= this.outerRadius) {
            d = t;
            break
        }
    return d
}, Winwheel.prototype.getIndicatedSegment = function() {
    var t = this.getIndicatedSegmentNumber();
    return this.segments[t]
}, Winwheel.prototype.getIndicatedSegmentNumber = function() {
    var t = 0,
        e = this.getRotationPosition(),
        n = Math.floor(this.pointerAngle - e);
    for (0 > n && (n = 360 - Math.abs(n)), x = 1; x < this.segments.length; x++)
        if (n >= this.segments[x].startAngle && n <= this.segments[x].endAngle) {
            t = x;
            break
        }
    return t
}, Winwheel.prototype.getRotationPosition = function() {
    var t = this.rotationAngle;
    if (t >= 0) {
        if (t > 360) {
            var e = Math.floor(t / 360);
            t -= 360 * e
        }
    } else {
        if (-360 > t) {
            var e = Math.ceil(t / 360);
            t -= 360 * e
        }
        t = 360 + t
    }
    return t
}, Winwheel.prototype.startAnimation = function() {
    if (this.animation) {
        this.computeAnimation(), winwheelToDrawDuringAnimation = this;
        var t = new Array(null);
        t[this.animation.propertyName] = this.animation.propertyValue, t.yoyo = this.animation.yoyo, t.repeat = this.animation.repeat, t.ease = this.animation.easing, t.onUpdate = winwheelAnimationLoop, t.onComplete = winwheelStopAnimation, this.tween = TweenMax.to(this, this.animation.duration, t)
    }
}, Winwheel.prototype.stopAnimation = function(t) {
    winwheelToDrawDuringAnimation && (winwheelToDrawDuringAnimation.tween.kill(), winwheelStopAnimation(t)), winwheelToDrawDuringAnimation = this
}, Winwheel.prototype.pauseAnimation = function() {
    this.tween && this.tween.pause()
}, Winwheel.prototype.resumeAnimation = function() {
    this.tween && this.tween.play()
}, Winwheel.prototype.computeAnimation = function() {
    this.animation && ("spinOngoing" == this.animation.type ? (this.animation.propertyName = "rotationAngle", null == this.animation.spins && (this.animation.spins = 5), null == this.animation.repeat && (this.animation.repeat = -1), null == this.animation.easing && (this.animation.easing = "Linear.easeNone"), null == this.animation.yoyo && (this.animation.yoyo = !1), this.animation.propertyValue = 360 * this.animation.spins, "anti-clockwise" == this.animation.direction && (this.animation.propertyValue = 0 - this.animation.propertyValue)) : "spinToStop" == this.animation.type ? (this.animation.propertyName = "rotationAngle", null == this.animation.spins && (this.animation.spins = 5), null == this.animation.repeat && (this.animation.repeat = 0), null == this.animation.easing && (this.animation.easing = "Power4.easeOut"), null == this.animation.stopAngle ? this.animation._stopAngle = Math.floor(359 * Math.random()) : this.animation._stopAngle = 360 - this.animation.stopAngle + this.pointerAngle, null == this.animation.yoyo && (this.animation.yoyo = !1), this.animation.propertyValue = 360 * this.animation.spins, "anti-clockwise" == this.animation.direction ? (this.animation.propertyValue = 0 - this.animation.propertyValue, this.animation.propertyValue -= 360 - this.animation._stopAngle) : this.animation.propertyValue += this.animation._stopAngle) : "spinAndBack" == this.animation.type ? (this.animation.propertyName = "rotationAngle", null == this.animation.spins && (this.animation.spins = 5), null == this.animation.repeat && (this.animation.repeat = 1), null == this.animation.easing && (this.animation.easing = "Power2.easeInOut"), null == this.animation.yoyo && (this.animation.yoyo = !0), null == this.animation.stopAngle ? this.animation._stopAngle = 0 : this.animation._stopAngle = 360 - this.animation.stopAngle, this.animation.propertyValue = 360 * this.animation.spins, "anti-clockwise" == this.animation.direction ? (this.animation.propertyValue = 0 - this.animation.propertyValue, this.animation.propertyValue -= 360 - this.animation._stopAngle) : this.animation.propertyValue += this.animation._stopAngle) : "custom" == this.animation.type)
}, Winwheel.prototype.getRandomForSegment = function(t) {
    var e = 0;
    if (t)
        if ("undefined" != typeof this.segments[t]) {
            var n = this.segments[t].startAngle,
                i = this.segments[t].endAngle,
                r = i - n - 2;
            r > 0 ? e = n + 1 + Math.floor(Math.random() * r) : console.log("Segment size is too small to safely get random angle inside it")
        } else console.log("Segment " + t + " undefined");
    else console.log("Segment number not specified");
    return e
}, Segment.prototype.changeImage = function(t, e) {
    this.image = t, this.imgData = null, e && (this.imageDirection = e), winhweelAlreadyDrawn = !1, this.imgData = new Image, this.imgData.onload = winwheelLoadedImage, this.imgData.src = this.image
};
var winwheelToDrawDuringAnimation = null,
    winhweelAlreadyDrawn = !1;
/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if (
    /*! BigText - v0.1.8 - 2015-02-28
     * https://github.com/zachleat/bigtext
     * Copyright (c) 2015 Zach Leatherman (@zachleat)
     * MIT License */
    function(t, e) {
        "use strict";

        function n(t, e, n, i, r, o, a) {
            var s;
            if (a = "number" == typeof a ? a : 0, t.css(n, i + o), s = t.width(), s >= e) {
                if (t.css(n, ""), s === e) return {
                    match: "exact",
                    size: parseFloat((parseFloat(i) - .1).toFixed(3))
                };
                var l = e - a,
                    c = s - e;
                return {
                    match: "estimate",
                    size: parseFloat((parseFloat(i) - ("word-spacing" === n && a && l > c ? 0 : r)).toFixed(3))
                }
            }
            return s
        }

        function i(t, i, r, o, a) {
            var s = t.clone(!0).addClass("bigtext-cloned").css({
                    fontFamily: t.css("font-family"),
                    textTransform: t.css("text-transform"),
                    wordSpacing: t.css("word-spacing"),
                    letterSpacing: t.css("letter-spacing"),
                    position: "absolute",
                    left: l.DEBUG_MODE ? 0 : -9999,
                    top: l.DEBUG_MODE ? 0 : -9999
                }).appendTo(document.body),
                c = [],
                u = [],
                h = [],
                d = [];
            return i.css("float", "left").each(function() {
                var t, i, s = e(this),
                    u = l.supports.wholeNumberFontSizeOnly ? [8, 4, 1] : [8, 4, 1, .1];
                if (s.hasClass(l.EXEMPT_CLASS)) return c.push(null), d.push(null), void h.push(!1);
                var f = 32,
                    p = parseFloat(s.css("font-size")),
                    g = (s.width() / p).toFixed(6);
                i = parseInt(r / g, 10) - f;
                t: for (var m = 0, v = u.length; v > m; m++) e: for (var y = 1, x = 10; x >= y; y++) {
                    if (i + y * u[m] > o) {
                        i = o;
                        break t
                    }
                    if (t = n(s, r, "font-size", i + y * u[m], u[m], "px", t), "number" != typeof t) {
                        if (i = t.size, "exact" === t.match) break t;
                        break e
                    }
                }
                d.push(r / i), i > o ? (c.push(o), h.push(!1)) : a && a > i ? (c.push(a), h.push(!0)) : (c.push(i), h.push(!1))
            }).each(function(t) {
                var i, o = e(this),
                    a = 0,
                    s = 1;
                if (o.hasClass(l.EXEMPT_CLASS)) return void u.push(null);
                o.css("font-size", c[t] + "px");
                for (var h = 1, d = 3; d > h; h += s)
                    if (i = n(o, r, "word-spacing", h, s, "px", i), "number" != typeof i) {
                        a = i.size;
                        break
                    }
                o.css("font-size", ""), u.push(a)
            }).removeAttr("style"), l.DEBUG_MODE ? s.css({
                "background-color": "rgba(255,255,255,.4)"
            }) : s.remove(), {
                fontSizes: c,
                wordSpacings: u,
                ratios: d,
                minFontSizes: h
            }
        }
        var r = 0,
            o = e("head"),
            a = t.BigText,
            s = e.fn.bigtext,
            l = {
                DEBUG_MODE: !1,
                DEFAULT_MIN_FONT_SIZE_PX: null,
                DEFAULT_MAX_FONT_SIZE_PX: 528,
                GLOBAL_STYLE_ID: "bigtext-style",
                STYLE_ID: "bigtext-id",
                LINE_CLASS_PREFIX: "bigtext-line",
                EXEMPT_CLASS: "bigtext-exempt",
                noConflict: function(n) {
                    return n && (e.fn.bigtext = s, t.BigText = a), l
                },
                supports: {
                    wholeNumberFontSizeOnly: function() {
                        if (!("getComputedStyle" in t)) return !0;
                        var n = e("<div/>").css({
                                position: "absolute",
                                "font-size": "14.1px"
                            }).insertBefore(e("script").eq(0)),
                            i = t.getComputedStyle(n[0], null),
                            r = i && "14px" === i.getPropertyValue("font-size");
                        return n.remove(), r
                    }()
                },
                init: function() {
                    e("#" + l.GLOBAL_STYLE_ID).length || o.append(l.generateStyleTag(l.GLOBAL_STYLE_ID, [".bigtext * { white-space: nowrap; } .bigtext > * { display: block; }", ".bigtext ." + l.EXEMPT_CLASS + ", .bigtext ." + l.EXEMPT_CLASS + " * { white-space: normal; }"]))
                },
                bindResize: function(n, i) {
                    var r;
                    e(t).unbind(n).bind(n, function() {
                        r && clearTimeout(r), r = setTimeout(i, 100)
                    })
                },
                getStyleId: function(t) {
                    return l.STYLE_ID + "-" + t
                },
                generateStyleTag: function(t, n) {
                    return e("<style>" + n.join("\n") + "</style>").attr("id", t)
                },
                clearCss: function(t) {
                    var n = l.getStyleId(t);
                    e("#" + n).remove()
                },
                generateCss: function(t, e, n, i) {
                    var r = [];
                    l.clearCss(t);
                    for (var o = 0, a = e.length; a > o; o++) r.push("#" + t + " ." + l.LINE_CLASS_PREFIX + o + " {" + (i[o] ? " white-space: normal;" : "") + (e[o] ? " font-size: " + e[o] + "px;" : "") + (n[o] ? " word-spacing: " + n[o] + "px;" : "") + "}");
                    return l.generateStyleTag(l.getStyleId(t), r)
                },
                jQueryMethod: function(t) {
                    return l.init(), t = e.extend({
                        minfontsize: l.DEFAULT_MIN_FONT_SIZE_PX,
                        maxfontsize: l.DEFAULT_MAX_FONT_SIZE_PX,
                        childSelector: "",
                        resize: !0
                    }, t || {}), this.each(function() {
                        var n = e(this).addClass("bigtext"),
                            a = n.width(),
                            s = n.attr("id"),
                            c = t.childSelector ? n.find(t.childSelector) : n.children();
                        s || (s = "bigtext-id" + r++, n.attr("id", s)), t.resize && l.bindResize("resize.bigtext-event-" + s, function() {
                            l.jQueryMethod.call(e("#" + s), t)
                        }), l.clearCss(s), c.addClass(function(t, e) {
                            return [e.replace(new RegExp("\\b" + l.LINE_CLASS_PREFIX + "\\d+\\b"), ""), l.LINE_CLASS_PREFIX + t].join(" ")
                        });
                        var u = i(n, c, a, t.maxfontsize, t.minfontsize);
                        o.append(l.generateCss(s, u.fontSizes, u.wordSpacings, u.minFontSizes))
                    }), this.trigger("bigtext:complete")
                }
            };
        e.fn.bigtext = l.jQueryMethod, t.BigText = l
    }(this, jQuery), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 2) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")
}(jQuery),
/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+ function(t) {
    "use strict";

    function e() {
        var t = document.createElement("bootstrap"),
            e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var n in e)
            if (void 0 !== t.style[n]) return {
                end: e[n]
            };
        return !1
    }
    t.fn.emulateTransitionEnd = function(e) {
        var n = !1,
            i = this;
        t(this).one("bsTransitionEnd", function() {
            n = !0
        });
        var r = function() {
            n || t(i).trigger(t.support.transition.end)
        };
        return setTimeout(r, e), this
    }, t(function() {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery),
/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+ function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var n = t(this),
                r = n.data("bs.alert");
            r || n.data("bs.alert", r = new i(this)), "string" == typeof e && r[e].call(n)
        })
    }
    var n = '[data-dismiss="alert"]',
        i = function(e) {
            t(e).on("click", n, this.close)
        };
    i.VERSION = "3.3.6", i.TRANSITION_DURATION = 150, i.prototype.close = function(e) {
        function n() {
            a.detach().trigger("closed.bs.alert").remove()
        }
        var r = t(this),
            o = r.attr("data-target");
        o || (o = r.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
        var a = t(o);
        e && e.preventDefault(), a.length || (a = r.closest(".alert")), a.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (a.removeClass("in"), t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n())
    };
    var r = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function() {
        return t.fn.alert = r, this
    }, t(document).on("click.bs.alert.data-api", n, i.prototype.close)
}(jQuery),
/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+ function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.button"),
                o = "object" == typeof e && e;
            r || i.data("bs.button", r = new n(this, o)), "toggle" == e ? r.toggle() : e && r.setState(e)
        })
    }
    var n = function(e, i) {
        this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, i), this.isLoading = !1
    };
    n.VERSION = "3.3.6", n.DEFAULTS = {
        loadingText: "loading..."
    }, n.prototype.setState = function(e) {
        var n = "disabled",
            i = this.$element,
            r = i.is("input") ? "val" : "html",
            o = i.data();
        e += "Text", null == o.resetText && i.data("resetText", i[r]()), setTimeout(t.proxy(function() {
            i[r](null == o[e] ? this.options[e] : o[e]), "loadingText" == e ? (this.isLoading = !0, i.addClass(n).attr(n, n)) : this.isLoading && (this.isLoading = !1, i.removeClass(n).removeAttr(n))
        }, this), 0)
    }, n.prototype.toggle = function() {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var n = this.$element.find("input");
            "radio" == n.prop("type") ? (n.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), n.prop("checked", this.$element.hasClass("active")), t && n.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var i = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = n, t.fn.button.noConflict = function() {
        return t.fn.button = i, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(n) {
        var i = t(n.target);
        i.hasClass("btn") || (i = i.closest(".btn")), e.call(i, "toggle"), t(n.target).is('input[type="radio"]') || t(n.target).is('input[type="checkbox"]') || n.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery),
/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+ function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.carousel"),
                o = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e),
                a = "string" == typeof e ? e : o.slide;
            r || i.data("bs.carousel", r = new n(this, o)), "number" == typeof e ? r.to(e) : a ? r[a]() : o.interval && r.pause().cycle()
        })
    }
    var n = function(e, n) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    n.VERSION = "3.3.6", n.TRANSITION_DURATION = 600, n.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, n.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, n.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, n.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, n.prototype.getItemForDirection = function(t, e) {
        var n = this.getItemIndex(e),
            i = "prev" == t && 0 === n || "next" == t && n == this.$items.length - 1;
        if (i && !this.options.wrap) return e;
        var r = "prev" == t ? -1 : 1,
            o = (n + r) % this.$items.length;
        return this.$items.eq(o)
    }, n.prototype.to = function(t) {
        var e = this,
            n = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t)
        }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", this.$items.eq(t))
    }, n.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, n.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, n.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, n.prototype.slide = function(e, i) {
        var r = this.$element.find(".item.active"),
            o = i || this.getItemForDirection(e, r),
            a = this.interval,
            s = "next" == e ? "left" : "right",
            l = this;
        if (o.hasClass("active")) return this.sliding = !1;
        var c = o[0],
            u = t.Event("slide.bs.carousel", {
                relatedTarget: c,
                direction: s
            });
        if (this.$element.trigger(u), !u.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var h = t(this.$indicators.children()[this.getItemIndex(o)]);
                h && h.addClass("active")
            }
            var d = t.Event("slid.bs.carousel", {
                relatedTarget: c,
                direction: s
            });
            return t.support.transition && this.$element.hasClass("slide") ? (o.addClass(e), o[0].offsetWidth, r.addClass(s), o.addClass(s), r.one("bsTransitionEnd", function() {
                o.removeClass([e, s].join(" ")).addClass("active"), r.removeClass(["active", s].join(" ")), l.sliding = !1, setTimeout(function() {
                    l.$element.trigger(d)
                }, 0)
            }).emulateTransitionEnd(n.TRANSITION_DURATION)) : (r.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(d)), a && this.cycle(), this
        }
    };
    var i = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = n, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = i, this
    };
    var r = function(n) {
        var i, r = t(this),
            o = t(r.attr("data-target") || (i = r.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""));
        if (o.hasClass("carousel")) {
            var a = t.extend({}, o.data(), r.data()),
                s = r.attr("data-slide-to");
            s && (a.interval = !1), e.call(o, a), s && o.data("bs.carousel").to(s), n.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var n = t(this);
            e.call(n, n.data())
        })
    })
}(jQuery),
/* ========================================================================
 * Bootstrap: collapse.js v3.3.6
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+ function(t) {
    "use strict";

    function e(e) {
        var n, i = e.attr("data-target") || (n = e.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "");
        return t(i)
    }

    function n(e) {
        return this.each(function() {
            var n = t(this),
                r = n.data("bs.collapse"),
                o = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            !r && o.toggle && /show|hide/.test(e) && (o.toggle = !1), r || n.data("bs.collapse", r = new i(this, o)), "string" == typeof e && r[e]()
        })
    }
    var i = function(e, n) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, n), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    i.VERSION = "3.3.6", i.TRANSITION_DURATION = 350, i.DEFAULTS = {
        toggle: !0
    }, i.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, i.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, r = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(r && r.length && (e = r.data("bs.collapse"), e && e.transitioning))) {
                var o = t.Event("show.bs.collapse");
                if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                    r && r.length && (n.call(r, "hide"), e || r.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var s = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return s.call(this);
                    var l = t.camelCase(["scroll", a].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(s, this)).emulateTransitionEnd(i.TRANSITION_DURATION)[a](this.$element[0][l])
                }
            }
        }
    }, i.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var r = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[n](0).one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : r.call(this)
            }
        }
    }, i.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, i.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(n, i) {
            var r = t(i);
            this.addAriaAndCollapsedClass(e(r), r)
        }, this)).end()
    }, i.prototype.addAriaAndCollapsedClass = function(t, e) {
        var n = t.hasClass("in");
        t.attr("aria-expanded", n), e.toggleClass("collapsed", !n).attr("aria-expanded", n)
    };
    var r = t.fn.collapse;
    t.fn.collapse = n, t.fn.collapse.Constructor = i, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = r, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(i) {
        var r = t(this);
        r.attr("data-target") || i.preventDefault();
        var o = e(r),
            a = o.data("bs.collapse"),
            s = a ? "toggle" : r.data();
        n.call(o, s)
    })
}(jQuery),
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+ function(t) {
    "use strict";

    function e(e) {
        var n = e.attr("data-target");
        n || (n = e.attr("href"), n = n && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var i = n && t(n);
        return i && i.length ? i : e.parent()
    }

    function n(n) {
        n && 3 === n.which || (t(r).remove(), t(o).each(function() {
            var i = t(this),
                r = e(i),
                o = {
                    relatedTarget: this
                };
            r.hasClass("open") && (n && "click" == n.type && /input|textarea/i.test(n.target.tagName) && t.contains(r[0], n.target) || (r.trigger(n = t.Event("hide.bs.dropdown", o)), n.isDefaultPrevented() || (i.attr("aria-expanded", "false"), r.removeClass("open").trigger(t.Event("hidden.bs.dropdown", o)))))
        }))
    }

    function i(e) {
        return this.each(function() {
            var n = t(this),
                i = n.data("bs.dropdown");
            i || n.data("bs.dropdown", i = new a(this)), "string" == typeof e && i[e].call(n)
        })
    }
    var r = ".dropdown-backdrop",
        o = '[data-toggle="dropdown"]',
        a = function(e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
    a.VERSION = "3.3.6", a.prototype.toggle = function(i) {
        var r = t(this);
        if (!r.is(".disabled, :disabled")) {
            var o = e(r),
                a = o.hasClass("open");
            if (n(), !a) {
                "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", n);
                var s = {
                    relatedTarget: this
                };
                if (o.trigger(i = t.Event("show.bs.dropdown", s)), i.isDefaultPrevented()) return;
                r.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("open").trigger(t.Event("shown.bs.dropdown", s))
            }
            return !1
        }
    }, a.prototype.keydown = function(n) {
        if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName)) {
            var i = t(this);
            if (n.preventDefault(), n.stopPropagation(), !i.is(".disabled, :disabled")) {
                var r = e(i),
                    a = r.hasClass("open");
                if (!a && 27 != n.which || a && 27 == n.which) return 27 == n.which && r.find(o).trigger("focus"), i.trigger("click");
                var s = " li:not(.disabled):visible a",
                    l = r.find(".dropdown-menu" + s);
                if (l.length) {
                    var c = l.index(n.target);
                    38 == n.which && c > 0 && c--, 40 == n.which && c < l.length - 1 && c++, ~c || (c = 0), l.eq(c).trigger("focus")
                }
            }
        }
    };
    var s = t.fn.dropdown;
    t.fn.dropdown = i, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = s, this
    }, t(document).on("click.bs.dropdown.data-api", n).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", o, a.prototype.toggle).on("keydown.bs.dropdown.data-api", o, a.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", a.prototype.keydown)
}(jQuery),
/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+ function(t) {
    "use strict";

    function e(e, i) {
        return this.each(function() {
            var r = t(this),
                o = r.data("bs.modal"),
                a = t.extend({}, n.DEFAULTS, r.data(), "object" == typeof e && e);
            o || r.data("bs.modal", o = new n(this, a)), "string" == typeof e ? o[e](i) : a.show && o.show(i)
        })
    }
    var n = function(e, n) {
        this.options = n, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    n.VERSION = "3.3.6", n.TRANSITION_DURATION = 300, n.BACKDROP_TRANSITION_DURATION = 150, n.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, n.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t)
    }, n.prototype.show = function(e) {
        var i = this,
            r = t.Event("show.bs.modal", {
                relatedTarget: e
            });
        this.$element.trigger(r), this.isShown || r.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            i.$element.one("mouseup.dismiss.bs.modal", function(e) {
                t(e.target).is(i.$element) && (i.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var r = t.support.transition && i.$element.hasClass("fade");
            i.$element.parent().length || i.$element.appendTo(i.$body), i.$element.show().scrollTop(0), i.adjustDialog(), r && i.$element[0].offsetWidth, i.$element.addClass("in"), i.enforceFocus();
            var o = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            r ? i.$dialog.one("bsTransitionEnd", function() {
                i.$element.trigger("focus").trigger(o)
            }).emulateTransitionEnd(n.TRANSITION_DURATION) : i.$element.trigger("focus").trigger(o)
        }))
    }, n.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : this.hideModal())
    }, n.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, n.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, n.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, n.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, n.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, n.prototype.backdrop = function(e) {
        var i = this,
            r = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = t.support.transition && r;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + r).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            o ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function() {
                i.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION) : a()
        } else e && e()
    }, n.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, n.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, n.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, n.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, n.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, n.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, n.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var i = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = n, t.fn.modal.noConflict = function() {
        return t.fn.modal = i, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(n) {
        var i = t(this),
            r = i.attr("href"),
            o = t(i.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
            a = o.data("bs.modal") ? "toggle" : t.extend({
                remote: !/#/.test(r) && r
            }, o.data(), i.data());
        i.is("a") && n.preventDefault(), o.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || o.one("hidden.bs.modal", function() {
                i.is(":visible") && i.trigger("focus")
            })
        }), e.call(o, a, this)
    })
}(jQuery),
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+ function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.tooltip"),
                o = "object" == typeof e && e;
            (r || !/destroy|hide/.test(e)) && (r || i.data("bs.tooltip", r = new n(this, o)), "string" == typeof e && r[e]())
        })
    }
    var n = function(t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    n.VERSION = "3.3.6", n.TRANSITION_DURATION = 150, n.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, n.prototype.init = function(e, n, i) {
        if (this.enabled = !0, this.type = e, this.$element = t(n), this.options = this.getOptions(i), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var r = this.options.trigger.split(" "), o = r.length; o--;) {
            var a = r[o];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != a) {
                var s = "hover" == a ? "mouseenter" : "focusin",
                    l = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, n.prototype.getDefaults = function() {
        return n.DEFAULTS
    }, n.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, n.prototype.getDelegateOptions = function() {
        var e = {},
            n = this.getDefaults();
        return this._options && t.each(this._options, function(t, i) {
            n[t] != i && (e[t] = i)
        }), e
    }, n.prototype.enter = function(e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusin" == e.type ? "focus" : "hover"] = !0), n.tip().hasClass("in") || "in" == n.hoverState ? void(n.hoverState = "in") : (clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? void(n.timeout = setTimeout(function() {
            "in" == n.hoverState && n.show()
        }, n.options.delay.show)) : n.show())
    }, n.prototype.isInStateTrue = function() {
        for (var t in this.inState)
            if (this.inState[t]) return !0;
        return !1
    }, n.prototype.leave = function(e) {
        var n = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n)), e instanceof t.Event && (n.inState["focusout" == e.type ? "focus" : "hover"] = !1), n.isInStateTrue() ? void 0 : (clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? void(n.timeout = setTimeout(function() {
            "out" == n.hoverState && n.hide()
        }, n.options.delay.hide)) : n.hide())
    }, n.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var i = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !i) return;
            var r = this,
                o = this.tip(),
                a = this.getUID(this.type);
            this.setContent(), o.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && o.addClass("fade");
            var s = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                c = l.test(s);
            c && (s = s.replace(l, "") || "top"), o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(s).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var u = this.getPosition(),
                h = o[0].offsetWidth,
                d = o[0].offsetHeight;
            if (c) {
                var f = s,
                    p = this.getPosition(this.$viewport);
                s = "bottom" == s && u.bottom + d > p.bottom ? "top" : "top" == s && u.top - d < p.top ? "bottom" : "right" == s && u.right + h > p.width ? "left" : "left" == s && u.left - h < p.left ? "right" : s, o.removeClass(f).addClass(s)
            }
            var g = this.getCalculatedOffset(s, u, h, d);
            this.applyPlacement(g, s);
            var m = function() {
                var t = r.hoverState;
                r.$element.trigger("shown.bs." + r.type), r.hoverState = null, "out" == t && r.leave(r)
            };
            t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", m).emulateTransitionEnd(n.TRANSITION_DURATION) : m()
        }
    }, n.prototype.applyPlacement = function(e, n) {
        var i = this.tip(),
            r = i[0].offsetWidth,
            o = i[0].offsetHeight,
            a = parseInt(i.css("margin-top"), 10),
            s = parseInt(i.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(s) && (s = 0), e.top += a, e.left += s, t.offset.setOffset(i[0], t.extend({
            using: function(t) {
                i.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), i.addClass("in");
        var l = i[0].offsetWidth,
            c = i[0].offsetHeight;
        "top" == n && c != o && (e.top = e.top + o - c);
        var u = this.getViewportAdjustedDelta(n, e, l, c);
        u.left ? e.left += u.left : e.top += u.top;
        var h = /top|bottom/.test(n),
            d = h ? 2 * u.left - r + l : 2 * u.top - o + c,
            f = h ? "offsetWidth" : "offsetHeight";
        i.offset(e), this.replaceArrow(d, i[0][f], h)
    }, n.prototype.replaceArrow = function(t, e, n) {
        this.arrow().css(n ? "left" : "top", 50 * (1 - t / e) + "%").css(n ? "top" : "left", "")
    }, n.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, n.prototype.hide = function(e) {
        function i() {
            "in" != r.hoverState && o.detach(), r.$element.removeAttr("aria-describedby").trigger("hidden.bs." + r.type), e && e()
        }
        var r = this,
            o = t(this.$tip),
            a = t.Event("hide.bs." + this.type);
        return this.$element.trigger(a), a.isDefaultPrevented() ? void 0 : (o.removeClass("in"), t.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i(), this.hoverState = null, this)
    }, n.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, n.prototype.hasContent = function() {
        return this.getTitle()
    }, n.prototype.getPosition = function(e) {
        e = e || this.$element;
        var n = e[0],
            i = "BODY" == n.tagName,
            r = n.getBoundingClientRect();
        null == r.width && (r = t.extend({}, r, {
            width: r.right - r.left,
            height: r.bottom - r.top
        }));
        var o = i ? {
                top: 0,
                left: 0
            } : e.offset(),
            a = {
                scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
            },
            s = i ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, r, a, s, o)
    }, n.prototype.getCalculatedOffset = function(t, e, n, i) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - n / 2
        } : "top" == t ? {
            top: e.top - i,
            left: e.left + e.width / 2 - n / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - i / 2,
            left: e.left - n
        } : {
            top: e.top + e.height / 2 - i / 2,
            left: e.left + e.width
        }
    }, n.prototype.getViewportAdjustedDelta = function(t, e, n, i) {
        var r = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return r;
        var o = this.options.viewport && this.options.viewport.padding || 0,
            a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var s = e.top - o - a.scroll,
                l = e.top + o - a.scroll + i;
            s < a.top ? r.top = a.top - s : l > a.top + a.height && (r.top = a.top + a.height - l)
        } else {
            var c = e.left - o,
                u = e.left + o + n;
            c < a.left ? r.left = a.left - c : u > a.right && (r.left = a.left + a.width - u)
        }
        return r
    }, n.prototype.getTitle = function() {
        var t, e = this.$element,
            n = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(e[0]) : n.title)
    }, n.prototype.getUID = function(t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, n.prototype.tip = function() {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, n.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, n.prototype.enable = function() {
        this.enabled = !0
    }, n.prototype.disable = function() {
        this.enabled = !1
    }, n.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, n.prototype.toggle = function(e) {
        var n = this;
        e && (n = t(e.currentTarget).data("bs." + this.type), n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, n))), e ? (n.inState.click = !n.inState.click, n.isInStateTrue() ? n.enter(n) : n.leave(n)) : n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
    }, n.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null
        })
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = n, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = i, this
    }
}(jQuery),
/* ========================================================================
 * Bootstrap: popover.js v3.3.6
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+ function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.popover"),
                o = "object" == typeof e && e;
            (r || !/destroy|hide/.test(e)) && (r || i.data("bs.popover", r = new n(this, o)), "string" == typeof e && r[e]())
        })
    }
    var n = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    n.VERSION = "3.3.6", n.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), n.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), n.prototype.constructor = n, n.prototype.getDefaults = function() {
        return n.DEFAULTS
    }, n.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle(),
            n = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof n ? "html" : "append" : "text"](n), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, n.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, n.prototype.getContent = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, n.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var i = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = n, t.fn.popover.noConflict = function() {
        return t.fn.popover = i, this
    }
}(jQuery),
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.6
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+ function(t) {
    "use strict";

    function e(n, i) {
        this.$body = t(document.body), this.$scrollElement = t(t(n).is(document.body) ? window : n), this.options = t.extend({}, e.DEFAULTS, i), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
    }

    function n(n) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.scrollspy"),
                o = "object" == typeof n && n;
            r || i.data("bs.scrollspy", r = new e(this, o)), "string" == typeof n && r[n]()
        })
    }
    e.VERSION = "3.3.6", e.DEFAULTS = {
        offset: 10
    }, e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function() {
        var e = this,
            n = "offset",
            i = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (n = "position", i = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var e = t(this),
                r = e.data("target") || e.attr("href"),
                o = /^#./.test(r) && t(r);
            return o && o.length && o.is(":visible") && [
                [o[n]().top + i, r]
            ] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            e.offsets.push(this[0]), e.targets.push(this[1])
        })
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            n = this.getScrollHeight(),
            i = this.options.offset + n - this.$scrollElement.height(),
            r = this.offsets,
            o = this.targets,
            a = this.activeTarget;
        if (this.scrollHeight != n && this.refresh(), e >= i) return a != (t = o[o.length - 1]) && this.activate(t);
        if (a && e < r[0]) return this.activeTarget = null, this.clear();
        for (t = r.length; t--;) a != o[t] && e >= r[t] && (void 0 === r[t + 1] || e < r[t + 1]) && this.activate(o[t])
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, this.clear();
        var n = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            i = t(n).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var i = t.fn.scrollspy;
    t.fn.scrollspy = n, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = i, this
    }, t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            n.call(e, e.data())
        })
    })
}(jQuery),
/* ========================================================================
 * Bootstrap: tab.js v3.3.6
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+ function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.tab");
            r || i.data("bs.tab", r = new n(this)), "string" == typeof e && r[e]()
        })
    }
    var n = function(e) {
        this.element = t(e)
    };
    n.VERSION = "3.3.6", n.TRANSITION_DURATION = 150, n.prototype.show = function() {
        var e = this.element,
            n = e.closest("ul:not(.dropdown-menu)"),
            i = e.data("target");
        if (i || (i = e.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var r = n.find(".active:last a"),
                o = t.Event("hide.bs.tab", {
                    relatedTarget: e[0]
                }),
                a = t.Event("show.bs.tab", {
                    relatedTarget: r[0]
                });
            if (r.trigger(o), e.trigger(a), !a.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var s = t(i);
                this.activate(e.closest("li"), n), this.activate(s, s.parent(), function() {
                    r.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: r[0]
                    })
                })
            }
        }
    }, n.prototype.activate = function(e, i, r) {
        function o() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), s ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), r && r()
        }
        var a = i.find("> .active"),
            s = r && t.support.transition && (a.length && a.hasClass("fade") || !!i.find("> .fade").length);
        a.length && s ? a.one("bsTransitionEnd", o).emulateTransitionEnd(n.TRANSITION_DURATION) : o(), a.removeClass("in")
    };
    var i = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = n, t.fn.tab.noConflict = function() {
        return t.fn.tab = i, this
    };
    var r = function(n) {
        n.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', r).on("click.bs.tab.data-api", '[data-toggle="pill"]', r)
}(jQuery),
/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+ function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                r = i.data("bs.affix"),
                o = "object" == typeof e && e;
            r || i.data("bs.affix", r = new n(this, o)), "string" == typeof e && r[e]()
        })
    }
    var n = function(e, i) {
        this.options = t.extend({}, n.DEFAULTS, i), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    n.VERSION = "3.3.6", n.RESET = "affix affix-top affix-bottom", n.DEFAULTS = {
        offset: 0,
        target: window
    }, n.prototype.getState = function(t, e, n, i) {
        var r = this.$target.scrollTop(),
            o = this.$element.offset(),
            a = this.$target.height();
        if (null != n && "top" == this.affixed) return n > r ? "top" : !1;
        if ("bottom" == this.affixed) return null != n ? r + this.unpin <= o.top ? !1 : "bottom" : t - i >= r + a ? !1 : "bottom";
        var s = null == this.affixed,
            l = s ? r : o.top,
            c = s ? a : e;
        return null != n && n >= r ? "top" : null != i && l + c >= t - i ? "bottom" : !1
    }, n.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(n.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, n.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, n.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(),
                i = this.options.offset,
                r = i.top,
                o = i.bottom,
                a = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof i && (o = r = i), "function" == typeof r && (r = i.top(this.$element)), "function" == typeof o && (o = i.bottom(this.$element));
            var s = this.getState(a, e, r, o);
            if (this.affixed != s) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (s ? "-" + s : ""),
                    c = t.Event(l + ".bs.affix");
                if (this.$element.trigger(c), c.isDefaultPrevented()) return;
                this.affixed = s, this.unpin = "bottom" == s ? this.getPinnedOffset() : null, this.$element.removeClass(n.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == s && this.$element.offset({
                top: a - e - o
            })
        }
    };
    var i = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = n, t.fn.affix.noConflict = function() {
        return t.fn.affix = i, this
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var n = t(this),
                i = n.data();
            i.offset = i.offset || {}, null != i.offsetBottom && (i.offset.bottom = i.offsetBottom), null != i.offsetTop && (i.offset.top = i.offsetTop), e.call(n, i)
        })
    })
}(jQuery),
function() {
    "use strict";
    var t = function() {
            var t = "abcdefghijklmnoprstuvwy",
                e = ["horizontal", "horizontalBack", "vertical", "verticalUp", "diagonal", "diagonalUp", "diagonalBack", "diagonalUpBack"],
                n = {
                    horizontal: function(t, e, n) {
                        return {
                            x: t + n,
                            y: e
                        }
                    },
                    horizontalBack: function(t, e, n) {
                        return {
                            x: t - n,
                            y: e
                        }
                    },
                    vertical: function(t, e, n) {
                        return {
                            x: t,
                            y: e + n
                        }
                    },
                    verticalUp: function(t, e, n) {
                        return {
                            x: t,
                            y: e - n
                        }
                    },
                    diagonal: function(t, e, n) {
                        return {
                            x: t + n,
                            y: e + n
                        }
                    },
                    diagonalBack: function(t, e, n) {
                        return {
                            x: t - n,
                            y: e + n
                        }
                    },
                    diagonalUp: function(t, e, n) {
                        return {
                            x: t + n,
                            y: e - n
                        }
                    },
                    diagonalUpBack: function(t, e, n) {
                        return {
                            x: t - n,
                            y: e - n
                        }
                    }
                },
                i = {
                    horizontal: function(t, e, n, i, r) {
                        return i >= t + r
                    },
                    horizontalBack: function(t, e, n, i, r) {
                        return t + 1 >= r
                    },
                    vertical: function(t, e, n, i, r) {
                        return n >= e + r
                    },
                    verticalUp: function(t, e, n, i, r) {
                        return e + 1 >= r
                    },
                    diagonal: function(t, e, n, i, r) {
                        return i >= t + r && n >= e + r
                    },
                    diagonalBack: function(t, e, n, i, r) {
                        return t + 1 >= r && n >= e + r
                    },
                    diagonalUp: function(t, e, n, i, r) {
                        return i >= t + r && e + 1 >= r
                    },
                    diagonalUpBack: function(t, e, n, i, r) {
                        return t + 1 >= r && e + 1 >= r
                    }
                },
                r = {
                    horizontal: function(t, e, n) {
                        return {
                            x: 0,
                            y: e + 1
                        }
                    },
                    horizontalBack: function(t, e, n) {
                        return {
                            x: n - 1,
                            y: e
                        }
                    },
                    vertical: function(t, e, n) {
                        return {
                            x: 0,
                            y: e + 100
                        }
                    },
                    verticalUp: function(t, e, n) {
                        return {
                            x: 0,
                            y: n - 1
                        }
                    },
                    diagonal: function(t, e, n) {
                        return {
                            x: 0,
                            y: e + 1
                        }
                    },
                    diagonalBack: function(t, e, n) {
                        return {
                            x: n - 1,
                            y: t >= n - 1 ? e + 1 : e
                        }
                    },
                    diagonalUp: function(t, e, n) {
                        return {
                            x: 0,
                            y: n - 1 > e ? n - 1 : e + 1
                        }
                    },
                    diagonalUpBack: function(t, e, n) {
                        return {
                            x: n - 1,
                            y: t >= n - 1 ? e + 1 : e
                        }
                    }
                },
                o = function(t, e) {
                    var n, i, r, o = [];
                    for (n = 0; n < e.height; n++)
                        for (o.push([]), i = 0; i < e.width; i++) o[n].push("");
                    for (n = 0, r = t.length; r > n; n++)
                        if (!a(o, e, t[n])) return null;
                    return o
                },
                a = function(t, e, i) {
                    var r = s(t, e, i);
                    if (0 === r.length) return !1;
                    var o = r[Math.floor(Math.random() * r.length)];
                    return u(t, i, o.x, o.y, n[o.orientation]), !0
                },
                s = function(t, e, o) {
                    for (var a = [], s = e.height, u = e.width, h = o.length, d = 0, f = 0, p = e.orientations.length; p > f; f++)
                        for (var g = e.orientations[f], m = i[g], v = n[g], y = r[g], x = 0, b = 0; s > b;)
                            if (m(x, b, s, u, h)) {
                                var w = l(o, t, x, b, v);
                                (w >= d || !e.preferOverlap && w > -1) && (d = w, a.push({
                                    x: x,
                                    y: b,
                                    orientation: g,
                                    overlap: w
                                })), x++, x >= u && (x = 0, b++)
                            } else {
                                var T = y(x, b, h);
                                x = T.x, b = T.y
                            }
                    return e.preferOverlap ? c(a, d) : a
                },
                l = function(t, e, n, i, r) {
                    for (var o = 0, a = 0, s = t.length; s > a; a++) {
                        var l = r(n, i, a),
                            c = e[l.y][l.x];
                        if (c === t[a]) o++;
                        else if ("" !== c) return -1
                    }
                    return o
                },
                c = function(t, e) {
                    for (var n = [], i = 0, r = t.length; r > i; i++) t[i].overlap >= e && n.push(t[i]);
                    return n
                },
                u = function(t, e, n, i, r) {
                    for (var o = 0, a = e.length; a > o; o++) {
                        var s = r(n, i, o);
                        t[s.y][s.x] = e[o]
                    }
                };
            return {
                validOrientations: e,
                orientations: n,
                newPuzzle: function(t, n) {
                    var i, r, a = 0,
                        s = n || {};
                    i = t.slice(0).sort(function(t, e) {
                        return t.length < e.length ? 1 : 0
                    });
                    for (var l = {
                            height: s.height || i[0].length,
                            width: s.width || i[0].length,
                            orientations: s.orientations || e,
                            fillBlanks: void 0 !== s.fillBlanks ? s.fillBlanks : !0,
                            maxAttempts: s.maxAttempts || 3,
                            preferOverlap: void 0 !== s.preferOverlap ? s.preferOverlap : !0
                        }; !r;) {
                        for (; !r && a++ < l.maxAttempts;) r = o(i, l);
                        r || (l.height++, l.width++, a = 0)
                    }
                    return l.fillBlanks && this.fillBlanks(r, l), r
                },
                fillBlanks: function(e) {
                    for (var n = 0, i = e.length; i > n; n++)
                        for (var r = e[n], o = 0, a = r.length; a > o; o++)
                            if (!e[n][o]) {
                                var s = Math.floor(Math.random() * t.length);
                                e[n][o] = t[s]
                            }
                },
                solve: function(t, n) {
                    for (var i = {
                            height: t.length,
                            width: t[0].length,
                            orientations: e,
                            preferOverlap: !0
                        }, r = [], o = [], a = 0, l = n.length; l > a; a++) {
                        var c = n[a],
                            u = s(t, i, c);
                        u.length > 0 && u[0].overlap === c.length ? (u[0].word = c, r.push(u[0])) : o.push(c)
                    }
                    return {
                        found: r,
                        notFound: o
                    }
                },
                print: function(t) {
                    for (var e = "", n = 0, i = t.length; i > n; n++) {
                        for (var r = t[n], o = 0, a = r.length; a > o; o++) e += ("" === r[o] ? " " : r[o]) + " ";
                        e += "\n"
                    }
                    return e
                }
            }
        },
        e = "undefined" != typeof exports && null !== exports ? exports : window;
    e.wordfind = t()
}.call(this),
    function(t, e, n) {
        "use strict";
        var i = function() {
            var i, r, o, a = function(t, n) {
                    for (var i = "", r = 0, o = n.length; o > r; r++) {
                        var a = n[r];
                        i += "<div>";
                        for (var s = 0, l = a.length; l > s; s++) i += '<button class="puzzleSquare" x="' + s + '" y="' + r + '">', i += a[s] || "&nbsp;", i += "</button>";
                        i += "</div>"
                    }
                    e(t).html(i)
                },
                s = function(t, n) {
                    for (var i = "<ol>", r = 0, o = n.length; o > r; r++) {
                        var a = n[r];
                        i += '<li class="word ' + a + '">' + a
                    }
                    i += "</ol>", e(t).html(i)
                },
                l = [],
                c = "",
                u = function() {
                    e(this).addClass("selected"), r = this, l.push(this), c = e(this).text()
                },
                h = function(t) {
                    if (r) {
                        var n = l[l.length - 1];
                        if (n != t) {
                            for (var i, a = 0, s = l.length; s > a; a++)
                                if (l[a] == t) {
                                    i = a + 1;
                                    break
                                }
                            for (; i < l.length;) e(l[l.length - 1]).removeClass("selected"), l.splice(i, 1), c = c.substr(0, c.length - 1);
                            var u = m(e(r).attr("x") - 0, e(r).attr("y") - 0, e(t).attr("x") - 0, e(t).attr("y") - 0);
                            u && (l = [r], c = e(r).text(), n !== r && (e(n).removeClass("selected"), n = r), o = u);
                            var h = m(e(n).attr("x") - 0, e(n).attr("y") - 0, e(t).attr("x") - 0, e(t).attr("y") - 0);
                            h && (o && o !== h || (o = h, p(t)))
                        }
                    }
                },
                d = function(e) {
                    var n = e.originalEvent.touches[0].pageX,
                        i = e.originalEvent.touches[0].pageY,
                        r = t.elementFromPoint(n, i);
                    h(r)
                },
                f = function() {
                    h(this)
                },
                p = function(t) {
                    for (var n = 0, r = i.length; r > n; n++)
                        if (0 === i[n].indexOf(c + e(t).text())) {
                            e(t).addClass("selected"), l.push(t), c += e(t).text();
                            break
                        }
                },
                g = function() {
                    for (var t = 0, n = i.length; n > t; t++) i[t] === c && (e(".selected").addClass("found"), i.splice(t, 1), e("." + c).addClass("wordFound")), 0 === i.length && e(".puzzleSquare").addClass("complete");
                    e(".selected").removeClass("selected"), r = null, l = [], c = "", o = null
                },
                m = function(t, e, i, r) {
                    for (var o in n.orientations) {
                        var a = n.orientations[o],
                            s = a(t, e, 1);
                        if (s.x === i && s.y === r) return o
                    }
                    return null
                };
            return {
                create: function(t, r, o, l) {
                    i = t.slice(0).sort();
                    var c = n.newPuzzle(t, l);
                    return a(r, c), s(o, i), window.navigator.msPointerEnabled ? (e(".puzzleSquare").on("MSPointerDown", u), e(".puzzleSquare").on("MSPointerOver", h), e(".puzzleSquare").on("MSPointerUp", g)) : (e(".puzzleSquare").mousedown(u), e(".puzzleSquare").mouseenter(f), e(".puzzleSquare").mouseup(g), e(".puzzleSquare").on("touchstart", u), e(".puzzleSquare").on("touchmove", d), e(".puzzleSquare").on("touchend", g)), c
                },
                solve: function(t, i) {
                    for (var r = n.solve(t, i).found, o = 0, a = r.length; a > o; o++) {
                        var s = r[o].word,
                            l = r[o].orientation,
                            c = r[o].x,
                            u = r[o].y,
                            h = n.orientations[l];
                        if (!e("." + s).hasClass("wordFound")) {
                            for (var d = 0, f = s.length; f > d; d++) {
                                var p = h(c, u, d);
                                e('[x="' + p.x + '"][y="' + p.y + '"]').addClass("solved")
                            }
                            e("." + s).addClass("wordFound")
                        }
                    }
                }
            }
        };
        window.wordfindgame = i()
    }(document, jQuery, wordfind);