"use strict";
(self.webpackChunkangular_blog = self.webpackChunkangular_blog || []).push([
    [179], {
        485: () => {
            function Q(e) {
                return "function" == typeof e
            }

            function eo(e) {
                const n = e(r => {
                    Error.call(r), r.stack = (new Error).stack
                });
                return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n
            }
            const Si = eo(e => function(n) {
                e(this), this.message = n ? `${n.length} errors occurred during unsubscription:\n${n.map((r,o)=>`${o+1}) ${r.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = n
            });

            function to(e, t) {
                if (e) {
                    const n = e.indexOf(t);
                    0 <= n && e.splice(n, 1)
                }
            }
            class Ze {
                constructor(t) {
                    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null
                }
                unsubscribe() {
                    let t;
                    if (!this.closed) {
                        this.closed = !0;
                        const {
                            _parentage: n
                        } = this;
                        if (n)
                            if (this._parentage = null, Array.isArray(n))
                                for (const i of n) i.remove(this);
                            else n.remove(this);
                        const {
                            initialTeardown: r
                        } = this;
                        if (Q(r)) try {
                            r()
                        } catch (i) {
                            t = i instanceof Si ? i.errors : [i]
                        }
                        const {
                            _finalizers: o
                        } = this;
                        if (o) {
                            this._finalizers = null;
                            for (const i of o) try {
                                Qd(i)
                            } catch (s) {
                                t = t ?? [], s instanceof Si ? t = [...t, ...s.errors] : t.push(s)
                            }
                        }
                        if (t) throw new Si(t)
                    }
                }
                add(t) {
                    var n;
                    if (t && t !== this)
                        if (this.closed) Qd(t);
                        else {
                            if (t instanceof Ze) {
                                if (t.closed || t._hasParent(this)) return;
                                t._addParent(this)
                            }(this._finalizers = null !== (n = this._finalizers) && void 0 !== n ? n : []).push(t)
                        }
                }
                _hasParent(t) {
                    const {
                        _parentage: n
                    } = this;
                    return n === t || Array.isArray(n) && n.includes(t)
                }
                _addParent(t) {
                    const {
                        _parentage: n
                    } = this;
                    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t
                }
                _removeParent(t) {
                    const {
                        _parentage: n
                    } = this;
                    n === t ? this._parentage = null : Array.isArray(n) && to(n, t)
                }
                remove(t) {
                    const {
                        _finalizers: n
                    } = this;
                    n && to(n, t), t instanceof Ze && t._removeParent(this)
                }
            }
            Ze.EMPTY = (() => {
                const e = new Ze;
                return e.closed = !0, e
            })();
            const Wd = Ze.EMPTY;

            function Zd(e) {
                return e instanceof Ze || e && "closed" in e && Q(e.remove) && Q(e.add) && Q(e.unsubscribe)
            }

            function Qd(e) {
                Q(e) ? e() : e.unsubscribe()
            }
            const In = {
                    onUnhandledError: null,
                    onStoppedNotification: null,
                    Promise: void 0,
                    useDeprecatedSynchronousErrorHandling: !1,
                    useDeprecatedNextContext: !1
                },
                Ti = {
                    setTimeout(e, t, ...n) {
                        const {
                            delegate: r
                        } = Ti;
                        return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n)
                    },
                    clearTimeout(e) {
                        const {
                            delegate: t
                        } = Ti;
                        return (t?.clearTimeout || clearTimeout)(e)
                    },
                    delegate: void 0
                };

            function Yd(e) {
                Ti.setTimeout(() => {
                    const {
                        onUnhandledError: t
                    } = In;
                    if (!t) throw e;
                    t(e)
                })
            }

            function Va() {}
            const dw = Ba("C", void 0, void 0);

            function Ba(e, t, n) {
                return {
                    kind: e,
                    value: t,
                    error: n
                }
            }
            let bn = null;

            function Ai(e) {
                if (In.useDeprecatedSynchronousErrorHandling) {
                    const t = !bn;
                    if (t && (bn = {
                            errorThrown: !1,
                            error: null
                        }), e(), t) {
                        const {
                            errorThrown: n,
                            error: r
                        } = bn;
                        if (bn = null, n) throw r
                    }
                } else e()
            }
            class Ha extends Ze {
                constructor(t) {
                    super(), this.isStopped = !1, t ? (this.destination = t, Zd(t) && t.add(this)) : this.destination = yw
                }
                static create(t, n, r) {
                    return new no(t, n, r)
                }
                next(t) {
                    this.isStopped ? za(function hw(e) {
                        return Ba("N", e, void 0)
                    }(t), this) : this._next(t)
                }
                error(t) {
                    this.isStopped ? za(function fw(e) {
                        return Ba("E", void 0, e)
                    }(t), this) : (this.isStopped = !0, this._error(t))
                }
                complete() {
                    this.isStopped ? za(dw, this) : (this.isStopped = !0, this._complete())
                }
                unsubscribe() {
                    this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null)
                }
                _next(t) {
                    this.destination.next(t)
                }
                _error(t) {
                    try {
                        this.destination.error(t)
                    } finally {
                        this.unsubscribe()
                    }
                }
                _complete() {
                    try {
                        this.destination.complete()
                    } finally {
                        this.unsubscribe()
                    }
                }
            }
            const gw = Function.prototype.bind;

            function Ua(e, t) {
                return gw.call(e, t)
            }
            class mw {
                constructor(t) {
                    this.partialObserver = t
                }
                next(t) {
                    const {
                        partialObserver: n
                    } = this;
                    if (n.next) try {
                        n.next(t)
                    } catch (r) {
                        Ni(r)
                    }
                }
                error(t) {
                    const {
                        partialObserver: n
                    } = this;
                    if (n.error) try {
                        n.error(t)
                    } catch (r) {
                        Ni(r)
                    } else Ni(t)
                }
                complete() {
                    const {
                        partialObserver: t
                    } = this;
                    if (t.complete) try {
                        t.complete()
                    } catch (n) {
                        Ni(n)
                    }
                }
            }
            class no extends Ha {
                constructor(t, n, r) {
                    let o;
                    if (super(), Q(t) || !t) o = {
                        next: t ?? void 0,
                        error: n ?? void 0,
                        complete: r ?? void 0
                    };
                    else {
                        let i;
                        this && In.useDeprecatedNextContext ? (i = Object.create(t), i.unsubscribe = () => this.unsubscribe(), o = {
                            next: t.next && Ua(t.next, i),
                            error: t.error && Ua(t.error, i),
                            complete: t.complete && Ua(t.complete, i)
                        }) : o = t
                    }
                    this.destination = new mw(o)
                }
            }

            function Ni(e) {
                In.useDeprecatedSynchronousErrorHandling ? function pw(e) {
                    In.useDeprecatedSynchronousErrorHandling && bn && (bn.errorThrown = !0, bn.error = e)
                }(e) : Yd(e)
            }

            function za(e, t) {
                const {
                    onStoppedNotification: n
                } = In;
                n && Ti.setTimeout(() => n(e, t))
            }
            const yw = {
                    closed: !0,
                    next: Va,
                    error: function vw(e) {
                        throw e
                    },
                    complete: Va
                },
                Ga = "function" == typeof Symbol && Symbol.observable || "@@observable";

            function sn(e) {
                return e
            }

            function Kd(e) {
                return 0 === e.length ? sn : 1 === e.length ? e[0] : function(n) {
                    return e.reduce((r, o) => o(r), n)
                }
            }
            let he = (() => {
                class e {
                    constructor(n) {
                        n && (this._subscribe = n)
                    }
                    lift(n) {
                        const r = new e;
                        return r.source = this, r.operator = n, r
                    }
                    subscribe(n, r, o) {
                        const i = function ww(e) {
                            return e && e instanceof Ha || function Cw(e) {
                                return e && Q(e.next) && Q(e.error) && Q(e.complete)
                            }(e) && Zd(e)
                        }(n) ? n : new no(n, r, o);
                        return Ai(() => {
                            const {
                                operator: s,
                                source: a
                            } = this;
                            i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i))
                        }), i
                    }
                    _trySubscribe(n) {
                        try {
                            return this._subscribe(n)
                        } catch (r) {
                            n.error(r)
                        }
                    }
                    forEach(n, r) {
                        return new(r = Xd(r))((o, i) => {
                            const s = new no({
                                next: a => {
                                    try {
                                        n(a)
                                    } catch (u) {
                                        i(u), s.unsubscribe()
                                    }
                                },
                                error: i,
                                complete: o
                            });
                            this.subscribe(s)
                        })
                    }
                    _subscribe(n) {
                        var r;
                        return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(n)
                    } [Ga]() {
                        return this
                    }
                    pipe(...n) {
                        return Kd(n)(this)
                    }
                    toPromise(n) {
                        return new(n = Xd(n))((r, o) => {
                            let i;
                            this.subscribe(s => i = s, s => o(s), () => r(i))
                        })
                    }
                }
                return e.create = t => new e(t), e
            })();

            function Xd(e) {
                var t;
                return null !== (t = e ?? In.Promise) && void 0 !== t ? t : Promise
            }
            const _w = eo(e => function() {
                e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
            });
            let gt = (() => {
                class e extends he {
                    constructor() {
                        super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null
                    }
                    lift(n) {
                        const r = new Jd(this, this);
                        return r.operator = n, r
                    }
                    _throwIfClosed() {
                        if (this.closed) throw new _w
                    }
                    next(n) {
                        Ai(() => {
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.currentObservers || (this.currentObservers = Array.from(this.observers));
                                for (const r of this.currentObservers) r.next(n)
                            }
                        })
                    }
                    error(n) {
                        Ai(() => {
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.hasError = this.isStopped = !0, this.thrownError = n;
                                const {
                                    observers: r
                                } = this;
                                for (; r.length;) r.shift().error(n)
                            }
                        })
                    }
                    complete() {
                        Ai(() => {
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.isStopped = !0;
                                const {
                                    observers: n
                                } = this;
                                for (; n.length;) n.shift().complete()
                            }
                        })
                    }
                    unsubscribe() {
                        this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
                    }
                    get observed() {
                        var n;
                        return (null === (n = this.observers) || void 0 === n ? void 0 : n.length) > 0
                    }
                    _trySubscribe(n) {
                        return this._throwIfClosed(), super._trySubscribe(n)
                    }
                    _subscribe(n) {
                        return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n)
                    }
                    _innerSubscribe(n) {
                        const {
                            hasError: r,
                            isStopped: o,
                            observers: i
                        } = this;
                        return r || o ? Wd : (this.currentObservers = null, i.push(n), new Ze(() => {
                            this.currentObservers = null, to(i, n)
                        }))
                    }
                    _checkFinalizedStatuses(n) {
                        const {
                            hasError: r,
                            thrownError: o,
                            isStopped: i
                        } = this;
                        r ? n.error(o) : i && n.complete()
                    }
                    asObservable() {
                        const n = new he;
                        return n.source = this, n
                    }
                }
                return e.create = (t, n) => new Jd(t, n), e
            })();
            class Jd extends gt {
                constructor(t, n) {
                    super(), this.destination = t, this.source = n
                }
                next(t) {
                    var n, r;
                    null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.next) || void 0 === r || r.call(n, t)
                }
                error(t) {
                    var n, r;
                    null === (r = null === (n = this.destination) || void 0 === n ? void 0 : n.error) || void 0 === r || r.call(n, t)
                }
                complete() {
                    var t, n;
                    null === (n = null === (t = this.destination) || void 0 === t ? void 0 : t.complete) || void 0 === n || n.call(t)
                }
                _subscribe(t) {
                    var n, r;
                    return null !== (r = null === (n = this.source) || void 0 === n ? void 0 : n.subscribe(t)) && void 0 !== r ? r : Wd
                }
            }

            function ef(e) {
                return Q(e?.lift)
            }

            function pe(e) {
                return t => {
                    if (ef(t)) return t.lift(function(n) {
                        try {
                            return e(n, this)
                        } catch (r) {
                            this.error(r)
                        }
                    });
                    throw new TypeError("Unable to lift unknown Observable type")
                }
            }

            function ge(e, t, n, r, o) {
                return new Ew(e, t, n, r, o)
            }
            class Ew extends Ha {
                constructor(t, n, r, o, i, s) {
                    super(t), this.onFinalize = i, this.shouldUnsubscribe = s, this._next = n ? function(a) {
                        try {
                            n(a)
                        } catch (u) {
                            t.error(u)
                        }
                    } : super._next, this._error = o ? function(a) {
                        try {
                            o(a)
                        } catch (u) {
                            t.error(u)
                        } finally {
                            this.unsubscribe()
                        }
                    } : super._error, this._complete = r ? function() {
                        try {
                            r()
                        } catch (a) {
                            t.error(a)
                        } finally {
                            this.unsubscribe()
                        }
                    } : super._complete
                }
                unsubscribe() {
                    var t;
                    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                        const {
                            closed: n
                        } = this;
                        super.unsubscribe(), !n && (null === (t = this.onFinalize) || void 0 === t || t.call(this))
                    }
                }
            }

            function K(e, t) {
                return pe((n, r) => {
                    let o = 0;
                    n.subscribe(ge(r, i => {
                        r.next(e.call(t, i, o++))
                    }))
                })
            }

            function an(e) {
                return this instanceof an ? (this.v = e, this) : new an(e)
            }

            function sf(e) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var n, t = e[Symbol.asyncIterator];
                return t ? t.call(e) : (e = function Qa(e) {
                    var t = "function" == typeof Symbol && Symbol.iterator,
                        n = t && e[t],
                        r = 0;
                    if (n) return n.call(e);
                    if (e && "number" == typeof e.length) return {
                        next: function() {
                            return e && r >= e.length && (e = void 0), {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
                }(e), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
                    return this
                }, n);

                function r(i) {
                    n[i] = e[i] && function(s) {
                        return new Promise(function(a, u) {
                            ! function o(i, s, a, u) {
                                Promise.resolve(u).then(function(c) {
                                    i({
                                        value: c,
                                        done: a
                                    })
                                }, s)
                            }(a, u, (s = e[i](s)).done, s.value)
                        })
                    }
                }
            }
            "function" == typeof SuppressedError && SuppressedError;
            const af = e => e && "number" == typeof e.length && "function" != typeof e;

            function uf(e) {
                return Q(e?.then)
            }

            function cf(e) {
                return Q(e[Ga])
            }

            function lf(e) {
                return Symbol.asyncIterator && Q(e?.[Symbol.asyncIterator])
            }

            function df(e) {
                return new TypeError(`You provided ${null!==e&&"object"==typeof e?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
            }
            const ff = function Gw() {
                return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
            }();

            function hf(e) {
                return Q(e?.[ff])
            }

            function pf(e) {
                return function rf(e, t, n) {
                    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                    var o, r = n.apply(e, t || []),
                        i = [];
                    return o = {}, s("next"), s("throw"), s("return"), o[Symbol.asyncIterator] = function() {
                        return this
                    }, o;

                    function s(f) {
                        r[f] && (o[f] = function(h) {
                            return new Promise(function(p, g) {
                                i.push([f, h, p, g]) > 1 || a(f, h)
                            })
                        })
                    }

                    function a(f, h) {
                        try {
                            ! function u(f) {
                                f.value instanceof an ? Promise.resolve(f.value.v).then(c, l) : d(i[0][2], f)
                            }(r[f](h))
                        } catch (p) {
                            d(i[0][3], p)
                        }
                    }

                    function c(f) {
                        a("next", f)
                    }

                    function l(f) {
                        a("throw", f)
                    }

                    function d(f, h) {
                        f(h), i.shift(), i.length && a(i[0][0], i[0][1])
                    }
                }(this, arguments, function*() {
                    const n = e.getReader();
                    try {
                        for (;;) {
                            const {
                                value: r,
                                done: o
                            } = yield an(n.read());
                            if (o) return yield an(void 0);
                            yield yield an(r)
                        }
                    } finally {
                        n.releaseLock()
                    }
                })
            }

            function gf(e) {
                return Q(e?.getReader)
            }

            function nt(e) {
                if (e instanceof he) return e;
                if (null != e) {
                    if (cf(e)) return function qw(e) {
                        return new he(t => {
                            const n = e[Ga]();
                            if (Q(n.subscribe)) return n.subscribe(t);
                            throw new TypeError("Provided object does not correctly implement Symbol.observable")
                        })
                    }(e);
                    if (af(e)) return function Ww(e) {
                        return new he(t => {
                            for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                            t.complete()
                        })
                    }(e);
                    if (uf(e)) return function Zw(e) {
                        return new he(t => {
                            e.then(n => {
                                t.closed || (t.next(n), t.complete())
                            }, n => t.error(n)).then(null, Yd)
                        })
                    }(e);
                    if (lf(e)) return mf(e);
                    if (hf(e)) return function Qw(e) {
                        return new he(t => {
                            for (const n of e)
                                if (t.next(n), t.closed) return;
                            t.complete()
                        })
                    }(e);
                    if (gf(e)) return function Yw(e) {
                        return mf(pf(e))
                    }(e)
                }
                throw df(e)
            }

            function mf(e) {
                return new he(t => {
                    (function Kw(e, t) {
                        var n, r, o, i;
                        return function tf(e, t, n, r) {
                            return new(n || (n = Promise))(function(i, s) {
                                function a(l) {
                                    try {
                                        c(r.next(l))
                                    } catch (d) {
                                        s(d)
                                    }
                                }

                                function u(l) {
                                    try {
                                        c(r.throw(l))
                                    } catch (d) {
                                        s(d)
                                    }
                                }

                                function c(l) {
                                    l.done ? i(l.value) : function o(i) {
                                        return i instanceof n ? i : new n(function(s) {
                                            s(i)
                                        })
                                    }(l.value).then(a, u)
                                }
                                c((r = r.apply(e, t || [])).next())
                            })
                        }(this, void 0, void 0, function*() {
                            try {
                                for (n = sf(e); !(r = yield n.next()).done;)
                                    if (t.next(r.value), t.closed) return
                            } catch (s) {
                                o = {
                                    error: s
                                }
                            } finally {
                                try {
                                    r && !r.done && (i = n.return) && (yield i.call(n))
                                } finally {
                                    if (o) throw o.error
                                }
                            }
                            t.complete()
                        })
                    })(e, t).catch(n => t.error(n))
                })
            }

            function Vt(e, t, n, r = 0, o = !1) {
                const i = t.schedule(function() {
                    n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe()
                }, r);
                if (e.add(i), !o) return i
            }

            function Ce(e, t, n = 1 / 0) {
                return Q(t) ? Ce((r, o) => K((i, s) => t(r, i, o, s))(nt(e(r, o))), n) : ("number" == typeof t && (n = t), pe((r, o) => function Xw(e, t, n, r, o, i, s, a) {
                    const u = [];
                    let c = 0,
                        l = 0,
                        d = !1;
                    const f = () => {
                            d && !u.length && !c && t.complete()
                        },
                        h = g => c < r ? p(g) : u.push(g),
                        p = g => {
                            i && t.next(g), c++;
                            let y = !1;
                            nt(n(g, l++)).subscribe(ge(t, D => {
                                o?.(D), i ? h(D) : t.next(D)
                            }, () => {
                                y = !0
                            }, void 0, () => {
                                if (y) try {
                                    for (c--; u.length && c < r;) {
                                        const D = u.shift();
                                        s ? Vt(t, s, () => p(D)) : p(D)
                                    }
                                    f()
                                } catch (D) {
                                    t.error(D)
                                }
                            }))
                        };
                    return e.subscribe(ge(t, h, () => {
                        d = !0, f()
                    })), () => {
                        a?.()
                    }
                }(r, o, e, n)))
            }

            function qn(e = 1 / 0) {
                return Ce(sn, e)
            }
            const Mt = new he(e => e.complete());

            function Ya(e) {
                return e[e.length - 1]
            }

            function ro(e) {
                return function e_(e) {
                    return e && Q(e.schedule)
                }(Ya(e)) ? e.pop() : void 0
            }

            function vf(e, t = 0) {
                return pe((n, r) => {
                    n.subscribe(ge(r, o => Vt(r, e, () => r.next(o), t), () => Vt(r, e, () => r.complete(), t), o => Vt(r, e, () => r.error(o), t)))
                })
            }

            function yf(e, t = 0) {
                return pe((n, r) => {
                    r.add(e.schedule(() => n.subscribe(r), t))
                })
            }

            function Df(e, t) {
                if (!e) throw new Error("Iterable cannot be null");
                return new he(n => {
                    Vt(n, t, () => {
                        const r = e[Symbol.asyncIterator]();
                        Vt(n, t, () => {
                            r.next().then(o => {
                                o.done ? n.complete() : n.next(o.value)
                            })
                        }, 0, !0)
                    })
                })
            }

            function we(e, t) {
                return t ? function u_(e, t) {
                    if (null != e) {
                        if (cf(e)) return function r_(e, t) {
                            return nt(e).pipe(yf(t), vf(t))
                        }(e, t);
                        if (af(e)) return function i_(e, t) {
                            return new he(n => {
                                let r = 0;
                                return t.schedule(function() {
                                    r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule())
                                })
                            })
                        }(e, t);
                        if (uf(e)) return function o_(e, t) {
                            return nt(e).pipe(yf(t), vf(t))
                        }(e, t);
                        if (lf(e)) return Df(e, t);
                        if (hf(e)) return function s_(e, t) {
                            return new he(n => {
                                let r;
                                return Vt(n, t, () => {
                                    r = e[ff](), Vt(n, t, () => {
                                        let o, i;
                                        try {
                                            ({
                                                value: o,
                                                done: i
                                            } = r.next())
                                        } catch (s) {
                                            return void n.error(s)
                                        }
                                        i ? n.complete() : n.next(o)
                                    }, 0, !0)
                                }), () => Q(r?.return) && r.return()
                            })
                        }(e, t);
                        if (gf(e)) return function a_(e, t) {
                            return Df(pf(e), t)
                        }(e, t)
                    }
                    throw df(e)
                }(e, t) : nt(e)
            }
            class rt extends gt {
                constructor(t) {
                    super(), this._value = t
                }
                get value() {
                    return this.getValue()
                }
                _subscribe(t) {
                    const n = super._subscribe(t);
                    return !n.closed && t.next(this._value), n
                }
                getValue() {
                    const {
                        hasError: t,
                        thrownError: n,
                        _value: r
                    } = this;
                    if (t) throw n;
                    return this._throwIfClosed(), r
                }
                next(t) {
                    super.next(this._value = t)
                }
            }

            function x(...e) {
                return we(e, ro(e))
            }

            function Cf(e = {}) {
                const {
                    connector: t = (() => new gt),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0
                } = e;
                return i => {
                    let s, a, u, c = 0,
                        l = !1,
                        d = !1;
                    const f = () => {
                            a?.unsubscribe(), a = void 0
                        },
                        h = () => {
                            f(), s = u = void 0, l = d = !1
                        },
                        p = () => {
                            const g = s;
                            h(), g?.unsubscribe()
                        };
                    return pe((g, y) => {
                        c++, !d && !l && f();
                        const D = u = u ?? t();
                        y.add(() => {
                            c--, 0 === c && !d && !l && (a = Ka(p, o))
                        }), D.subscribe(y), !s && c > 0 && (s = new no({
                            next: m => D.next(m),
                            error: m => {
                                d = !0, f(), a = Ka(h, n, m), D.error(m)
                            },
                            complete: () => {
                                l = !0, f(), a = Ka(h, r), D.complete()
                            }
                        }), nt(g).subscribe(s))
                    })(i)
                }
            }

            function Ka(e, t, ...n) {
                if (!0 === t) return void e();
                if (!1 === t) return;
                const r = new no({
                    next: () => {
                        r.unsubscribe(), e()
                    }
                });
                return nt(t(...n)).subscribe(r)
            }

            function St(e, t) {
                return pe((n, r) => {
                    let o = null,
                        i = 0,
                        s = !1;
                    const a = () => s && !o && r.complete();
                    n.subscribe(ge(r, u => {
                        o?.unsubscribe();
                        let c = 0;
                        const l = i++;
                        nt(e(u, l)).subscribe(o = ge(r, d => r.next(t ? t(u, d, l, c++) : d), () => {
                            o = null, a()
                        }))
                    }, () => {
                        s = !0, a()
                    }))
                })
            }

            function d_(e, t) {
                return e === t
            }

            function W(e) {
                for (let t in e)
                    if (e[t] === W) return t;
                throw Error("Could not find renamed property on target object.")
            }

            function me(e) {
                if ("string" == typeof e) return e;
                if (Array.isArray(e)) return "[" + e.map(me).join(", ") + "]";
                if (null == e) return "" + e;
                if (e.overriddenName) return `${e.overriddenName}`;
                if (e.name) return `${e.name}`;
                const t = e.toString();
                if (null == t) return "" + t;
                const n = t.indexOf("\n");
                return -1 === n ? t : t.substring(0, n)
            }

            function Xa(e, t) {
                return null == e || "" === e ? null === t ? "" : t : null == t || "" === t ? e : e + " " + t
            }
            const f_ = W({
                __forward_ref__: W
            });

            function Ja(e) {
                return e.__forward_ref__ = Ja, e.toString = function() {
                    return me(this())
                }, e
            }

            function R(e) {
                return eu(e) ? e() : e
            }

            function eu(e) {
                return "function" == typeof e && e.hasOwnProperty(f_) && e.__forward_ref__ === Ja
            }

            function tu(e) {
                return e && !!e.\u0275providers
            }
            const wf = "https://g.co/ng/security#xss";
            class C extends Error {
                constructor(t, n) {
                    super(function xi(e, t) {
                        return `NG0${Math.abs(e)}${t?": "+t:""}`
                    }(t, n)), this.code = t
                }
            }

            function O(e) {
                return "string" == typeof e ? e : null == e ? "" : String(e)
            }

            function nu(e, t) {
                throw new C(-201, !1)
            }

            function ot(e, t) {
                null == e && function T(e, t, n, r) {
                    throw new Error(`ASSERTION ERROR: ${e}` + (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`))
                }(t, e, null, "!=")
            }

            function S(e) {
                return {
                    token: e.token,
                    providedIn: e.providedIn || null,
                    factory: e.factory,
                    value: void 0
                }
            }

            function un(e) {
                return {
                    providers: e.providers || [],
                    imports: e.imports || []
                }
            }

            function Oi(e) {
                return _f(e, Fi) || _f(e, Ef)
            }

            function _f(e, t) {
                return e.hasOwnProperty(t) ? e[t] : null
            }

            function Pi(e) {
                return e && (e.hasOwnProperty(ru) || e.hasOwnProperty(C_)) ? e[ru] : null
            }
            const Fi = W({
                    \u0275prov: W
                }),
                ru = W({
                    \u0275inj: W
                }),
                Ef = W({
                    ngInjectableDef: W
                }),
                C_ = W({
                    ngInjectorDef: W
                });
            var j = function(e) {
                return e[e.Default = 0] = "Default", e[e.Host = 1] = "Host", e[e.Self = 2] = "Self", e[e.SkipSelf = 4] = "SkipSelf", e[e.Optional = 8] = "Optional", e
            }(j || {});
            let ou;

            function Ve(e) {
                const t = ou;
                return ou = e, t
            }

            function bf(e, t, n) {
                const r = Oi(e);
                return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : n & j.Optional ? null : void 0 !== t ? t : void nu(me(e))
            }
            const X = globalThis,
                oo = {},
                cu = "__NG_DI_FLAG__",
                ki = "ngTempTokenPath",
                E_ = /\n/gm,
                Sf = "__source";
            let Wn;

            function cn(e) {
                const t = Wn;
                return Wn = e, t
            }

            function M_(e, t = j.Default) {
                if (void 0 === Wn) throw new C(-203, !1);
                return null === Wn ? bf(e, void 0, t) : Wn.get(e, t & j.Optional ? null : void 0, t)
            }

            function b(e, t = j.Default) {
                return (function If() {
                    return ou
                }() || M_)(R(e), t)
            }

            function _(e, t = j.Default) {
                return b(e, Li(t))
            }

            function Li(e) {
                return typeof e > "u" || "number" == typeof e ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)
            }

            function lu(e) {
                const t = [];
                for (let n = 0; n < e.length; n++) {
                    const r = R(e[n]);
                    if (Array.isArray(r)) {
                        if (0 === r.length) throw new C(900, !1);
                        let o, i = j.Default;
                        for (let s = 0; s < r.length; s++) {
                            const a = r[s],
                                u = S_(a);
                            "number" == typeof u ? -1 === u ? o = a.token : i |= u : o = a
                        }
                        t.push(b(o, i))
                    } else t.push(b(r))
                }
                return t
            }

            function io(e, t) {
                return e[cu] = t, e.prototype[cu] = t, e
            }

            function S_(e) {
                return e[cu]
            }

            function Bt(e) {
                return {
                    toString: e
                }.toString()
            }
            var ji = function(e) {
                    return e[e.OnPush = 0] = "OnPush", e[e.Default = 1] = "Default", e
                }(ji || {}),
                mt = function(e) {
                    return e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom", e
                }(mt || {});
            const Tt = {},
                U = [],
                $i = W({
                    \u0275cmp: W
                }),
                du = W({
                    \u0275dir: W
                }),
                fu = W({
                    \u0275pipe: W
                }),
                Af = W({
                    \u0275mod: W
                }),
                Ht = W({
                    \u0275fac: W
                }),
                so = W({
                    __NG_ELEMENT_ID__: W
                }),
                Nf = W({
                    __NG_ENV_ID__: W
                });

            function Rf(e, t, n) {
                let r = e.length;
                for (;;) {
                    const o = e.indexOf(t, n);
                    if (-1 === o) return o;
                    if (0 === o || e.charCodeAt(o - 1) <= 32) {
                        const i = t.length;
                        if (o + i === r || e.charCodeAt(o + i) <= 32) return o
                    }
                    n = o + 1
                }
            }

            function hu(e, t, n) {
                let r = 0;
                for (; r < n.length;) {
                    const o = n[r];
                    if ("number" == typeof o) {
                        if (0 !== o) break;
                        r++;
                        const i = n[r++],
                            s = n[r++],
                            a = n[r++];
                        e.setAttribute(t, s, a, i)
                    } else {
                        const i = o,
                            s = n[++r];
                        Of(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++
                    }
                }
                return r
            }

            function xf(e) {
                return 3 === e || 4 === e || 6 === e
            }

            function Of(e) {
                return 64 === e.charCodeAt(0)
            }

            function ao(e, t) {
                if (null !== t && 0 !== t.length)
                    if (null === e || 0 === e.length) e = t.slice();
                    else {
                        let n = -1;
                        for (let r = 0; r < t.length; r++) {
                            const o = t[r];
                            "number" == typeof o ? n = o : 0 === n || Pf(e, n, o, null, -1 === n || 2 === n ? t[++r] : null)
                        }
                    } return e
            }

            function Pf(e, t, n, r, o) {
                let i = 0,
                    s = e.length;
                if (-1 === t) s = -1;
                else
                    for (; i < e.length;) {
                        const a = e[i++];
                        if ("number" == typeof a) {
                            if (a === t) {
                                s = -1;
                                break
                            }
                            if (a > t) {
                                s = i - 1;
                                break
                            }
                        }
                    }
                for (; i < e.length;) {
                    const a = e[i];
                    if ("number" == typeof a) break;
                    if (a === n) {
                        if (null === r) return void(null !== o && (e[i + 1] = o));
                        if (r === e[i + 1]) return void(e[i + 2] = o)
                    }
                    i++, null !== r && i++, null !== o && i++
                } - 1 !== s && (e.splice(s, 0, t), i = s + 1), e.splice(i++, 0, n), null !== r && e.splice(i++, 0, r), null !== o && e.splice(i++, 0, o)
            }
            const Ff = "ng-template";

            function N_(e, t, n) {
                let r = 0,
                    o = !0;
                for (; r < e.length;) {
                    let i = e[r++];
                    if ("string" == typeof i && o) {
                        const s = e[r++];
                        if (n && "class" === i && -1 !== Rf(s.toLowerCase(), t, 0)) return !0
                    } else {
                        if (1 === i) {
                            for (; r < e.length && "string" == typeof(i = e[r++]);)
                                if (i.toLowerCase() === t) return !0;
                            return !1
                        }
                        "number" == typeof i && (o = !1)
                    }
                }
                return !1
            }

            function kf(e) {
                return 4 === e.type && e.value !== Ff
            }

            function R_(e, t, n) {
                return t === (4 !== e.type || n ? e.value : Ff)
            }

            function x_(e, t, n) {
                let r = 4;
                const o = e.attrs || [],
                    i = function F_(e) {
                        for (let t = 0; t < e.length; t++)
                            if (xf(e[t])) return t;
                        return e.length
                    }(o);
                let s = !1;
                for (let a = 0; a < t.length; a++) {
                    const u = t[a];
                    if ("number" != typeof u) {
                        if (!s)
                            if (4 & r) {
                                if (r = 2 | 1 & r, "" !== u && !R_(e, u, n) || "" === u && 1 === t.length) {
                                    if (vt(r)) return !1;
                                    s = !0
                                }
                            } else {
                                const c = 8 & r ? u : t[++a];
                                if (8 & r && null !== e.attrs) {
                                    if (!N_(e.attrs, c, n)) {
                                        if (vt(r)) return !1;
                                        s = !0
                                    }
                                    continue
                                }
                                const d = O_(8 & r ? "class" : u, o, kf(e), n);
                                if (-1 === d) {
                                    if (vt(r)) return !1;
                                    s = !0;
                                    continue
                                }
                                if ("" !== c) {
                                    let f;
                                    f = d > i ? "" : o[d + 1].toLowerCase();
                                    const h = 8 & r ? f : null;
                                    if (h && -1 !== Rf(h, c, 0) || 2 & r && c !== f) {
                                        if (vt(r)) return !1;
                                        s = !0
                                    }
                                }
                            }
                    } else {
                        if (!s && !vt(r) && !vt(u)) return !1;
                        if (s && vt(u)) continue;
                        s = !1, r = u | 1 & r
                    }
                }
                return vt(r) || s
            }

            function vt(e) {
                return 0 == (1 & e)
            }

            function O_(e, t, n, r) {
                if (null === t) return -1;
                let o = 0;
                if (r || !n) {
                    let i = !1;
                    for (; o < t.length;) {
                        const s = t[o];
                        if (s === e) return o;
                        if (3 === s || 6 === s) i = !0;
                        else {
                            if (1 === s || 2 === s) {
                                let a = t[++o];
                                for (;
                                    "string" == typeof a;) a = t[++o];
                                continue
                            }
                            if (4 === s) break;
                            if (0 === s) {
                                o += 4;
                                continue
                            }
                        }
                        o += i ? 1 : 2
                    }
                    return -1
                }
                return function k_(e, t) {
                    let n = e.indexOf(4);
                    if (n > -1)
                        for (n++; n < e.length;) {
                            const r = e[n];
                            if ("number" == typeof r) return -1;
                            if (r === t) return n;
                            n++
                        }
                    return -1
                }(t, e)
            }

            function Lf(e, t, n = !1) {
                for (let r = 0; r < t.length; r++)
                    if (x_(e, t[r], n)) return !0;
                return !1
            }

            function jf(e, t) {
                return e ? ":not(" + t.trim() + ")" : t
            }

            function j_(e) {
                let t = e[0],
                    n = 1,
                    r = 2,
                    o = "",
                    i = !1;
                for (; n < e.length;) {
                    let s = e[n];
                    if ("string" == typeof s)
                        if (2 & r) {
                            const a = e[++n];
                            o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
                        } else 8 & r ? o += "." + s : 4 & r && (o += " " + s);
                    else "" !== o && !vt(s) && (t += jf(i, o), o = ""), r = s, i = i || !vt(r);
                    n++
                }
                return "" !== o && (t += jf(i, o)), t
            }

            function Ut(e) {
                return Bt(() => {
                    const t = Vf(e),
                        n = {
                            ...t,
                            decls: e.decls,
                            vars: e.vars,
                            template: e.template,
                            consts: e.consts || null,
                            ngContentSelectors: e.ngContentSelectors,
                            onPush: e.changeDetection === ji.OnPush,
                            directiveDefs: null,
                            pipeDefs: null,
                            dependencies: t.standalone && e.dependencies || null,
                            getStandaloneInjector: null,
                            signals: e.signals ?? !1,
                            data: e.data || {},
                            encapsulation: e.encapsulation || mt.Emulated,
                            styles: e.styles || U,
                            _: null,
                            schemas: e.schemas || null,
                            tView: null,
                            id: ""
                        };
                    Bf(n);
                    const r = e.dependencies;
                    return n.directiveDefs = Vi(r, !1), n.pipeDefs = Vi(r, !0), n.id = function q_(e) {
                        let t = 0;
                        const n = [e.selectors, e.ngContentSelectors, e.hostVars, e.hostAttrs, e.consts, e.vars, e.decls, e.encapsulation, e.standalone, e.signals, e.exportAs, JSON.stringify(e.inputs), JSON.stringify(e.outputs), Object.getOwnPropertyNames(e.type.prototype), !!e.contentQueries, !!e.viewQuery].join("|");
                        for (const o of n) t = Math.imul(31, t) + o.charCodeAt(0) << 0;
                        return t += 2147483648, "c" + t
                    }(n), n
                })
            }

            function H_(e) {
                return B(e) || _e(e)
            }

            function U_(e) {
                return null !== e
            }

            function Sn(e) {
                return Bt(() => ({
                    type: e.type,
                    bootstrap: e.bootstrap || U,
                    declarations: e.declarations || U,
                    imports: e.imports || U,
                    exports: e.exports || U,
                    transitiveCompileScopes: null,
                    schemas: e.schemas || null,
                    id: e.id || null
                }))
            }

            function $f(e, t) {
                if (null == e) return Tt;
                const n = {};
                for (const r in e)
                    if (e.hasOwnProperty(r)) {
                        let o = e[r],
                            i = o;
                        Array.isArray(o) && (i = o[1], o = o[0]), n[o] = r, t && (t[o] = i)
                    } return n
            }

            function Ne(e) {
                return Bt(() => {
                    const t = Vf(e);
                    return Bf(t), t
                })
            }

            function B(e) {
                return e[$i] || null
            }

            function _e(e) {
                return e[du] || null
            }

            function Re(e) {
                return e[fu] || null
            }

            function Ye(e, t) {
                const n = e[Af] || null;
                if (!n && !0 === t) throw new Error(`Type ${me(e)} does not have '\u0275mod' property.`);
                return n
            }

            function Vf(e) {
                const t = {};
                return {
                    type: e.type,
                    providersResolver: null,
                    factory: null,
                    hostBindings: e.hostBindings || null,
                    hostVars: e.hostVars || 0,
                    hostAttrs: e.hostAttrs || null,
                    contentQueries: e.contentQueries || null,
                    declaredInputs: t,
                    inputTransforms: null,
                    inputConfig: e.inputs || Tt,
                    exportAs: e.exportAs || null,
                    standalone: !0 === e.standalone,
                    signals: !0 === e.signals,
                    selectors: e.selectors || U,
                    viewQuery: e.viewQuery || null,
                    features: e.features || null,
                    setInput: null,
                    findHostDirectiveDefs: null,
                    hostDirectives: null,
                    inputs: $f(e.inputs, t),
                    outputs: $f(e.outputs)
                }
            }

            function Bf(e) {
                e.features?.forEach(t => t(e))
            }

            function Vi(e, t) {
                if (!e) return null;
                const n = t ? Re : H_;
                return () => ("function" == typeof e ? e() : e).map(r => n(r)).filter(U_)
            }
            const ae = 0,
                w = 1,
                k = 2,
                re = 3,
                yt = 4,
                uo = 5,
                Me = 6,
                Qn = 7,
                ce = 8,
                ln = 9,
                Yn = 10,
                P = 11,
                co = 12,
                Hf = 13,
                Kn = 14,
                le = 15,
                lo = 16,
                Xn = 17,
                At = 18,
                fo = 19,
                Uf = 20,
                dn = 21,
                zt = 22,
                ho = 23,
                po = 24,
                $ = 25,
                pu = 1,
                zf = 2,
                Nt = 7,
                Jn = 9,
                Ee = 11;

            function He(e) {
                return Array.isArray(e) && "object" == typeof e[pu]
            }

            function xe(e) {
                return Array.isArray(e) && !0 === e[pu]
            }

            function gu(e) {
                return 0 != (4 & e.flags)
            }

            function Tn(e) {
                return e.componentOffset > -1
            }

            function Hi(e) {
                return 1 == (1 & e.flags)
            }

            function Dt(e) {
                return !!e.template
            }

            function mu(e) {
                return 0 != (512 & e[k])
            }

            function An(e, t) {
                return e.hasOwnProperty(Ht) ? e[Ht] : null
            }
            let Ie = null,
                Ui = !1;

            function it(e) {
                const t = Ie;
                return Ie = e, t
            }
            const Wf = {
                version: 0,
                dirty: !1,
                producerNode: void 0,
                producerLastReadVersion: void 0,
                producerIndexOfThis: void 0,
                nextProducerIndex: 0,
                liveConsumerNode: void 0,
                liveConsumerIndexOfThis: void 0,
                consumerAllowSignalWrites: !1,
                consumerIsAlwaysLive: !1,
                producerMustRecompute: () => !1,
                producerRecomputeValue: () => {},
                consumerMarkedDirty: () => {}
            };

            function Qf(e) {
                if (!mo(e) || e.dirty) {
                    if (!e.producerMustRecompute(e) && !Xf(e)) return void(e.dirty = !1);
                    e.producerRecomputeValue(e), e.dirty = !1
                }
            }

            function Kf(e) {
                e.dirty = !0,
                    function Yf(e) {
                        if (void 0 === e.liveConsumerNode) return;
                        const t = Ui;
                        Ui = !0;
                        try {
                            for (const n of e.liveConsumerNode) n.dirty || Kf(n)
                        } finally {
                            Ui = t
                        }
                    }(e), e.consumerMarkedDirty?.(e)
            }

            function yu(e) {
                return e && (e.nextProducerIndex = 0), it(e)
            }

            function Du(e, t) {
                if (it(t), e && void 0 !== e.producerNode && void 0 !== e.producerIndexOfThis && void 0 !== e.producerLastReadVersion) {
                    if (mo(e))
                        for (let n = e.nextProducerIndex; n < e.producerNode.length; n++) zi(e.producerNode[n], e.producerIndexOfThis[n]);
                    for (; e.producerNode.length > e.nextProducerIndex;) e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop()
                }
            }

            function Xf(e) {
                er(e);
                for (let t = 0; t < e.producerNode.length; t++) {
                    const n = e.producerNode[t],
                        r = e.producerLastReadVersion[t];
                    if (r !== n.version || (Qf(n), r !== n.version)) return !0
                }
                return !1
            }

            function Jf(e) {
                if (er(e), mo(e))
                    for (let t = 0; t < e.producerNode.length; t++) zi(e.producerNode[t], e.producerIndexOfThis[t]);
                e.producerNode.length = e.producerLastReadVersion.length = e.producerIndexOfThis.length = 0, e.liveConsumerNode && (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0)
            }

            function zi(e, t) {
                if (function th(e) {
                        e.liveConsumerNode ??= [], e.liveConsumerIndexOfThis ??= []
                    }(e), er(e), 1 === e.liveConsumerNode.length)
                    for (let r = 0; r < e.producerNode.length; r++) zi(e.producerNode[r], e.producerIndexOfThis[r]);
                const n = e.liveConsumerNode.length - 1;
                if (e.liveConsumerNode[t] = e.liveConsumerNode[n], e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n], e.liveConsumerNode.length--, e.liveConsumerIndexOfThis.length--, t < e.liveConsumerNode.length) {
                    const r = e.liveConsumerIndexOfThis[t],
                        o = e.liveConsumerNode[t];
                    er(o), o.producerIndexOfThis[r] = t
                }
            }

            function mo(e) {
                return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0
            }

            function er(e) {
                e.producerNode ??= [], e.producerIndexOfThis ??= [], e.producerLastReadVersion ??= []
            }
            let nh = null;
            const sh = () => {},
                iE = (() => ({
                    ...Wf,
                    consumerIsAlwaysLive: !0,
                    consumerAllowSignalWrites: !1,
                    consumerMarkedDirty: e => {
                        e.schedule(e.ref)
                    },
                    hasRun: !1,
                    cleanupFn: sh
                }))();
            class sE {
                constructor(t, n, r) {
                    this.previousValue = t, this.currentValue = n, this.firstChange = r
                }
                isFirstChange() {
                    return this.firstChange
                }
            }

            function Nn() {
                return ah
            }

            function ah(e) {
                return e.type.prototype.ngOnChanges && (e.setInput = uE), aE
            }

            function aE() {
                const e = ch(this),
                    t = e?.current;
                if (t) {
                    const n = e.previous;
                    if (n === Tt) e.previous = t;
                    else
                        for (let r in t) n[r] = t[r];
                    e.current = null, this.ngOnChanges(t)
                }
            }

            function uE(e, t, n, r) {
                const o = this.declaredInputs[n],
                    i = ch(e) || function cE(e, t) {
                        return e[uh] = t
                    }(e, {
                        previous: Tt,
                        current: null
                    }),
                    s = i.current || (i.current = {}),
                    a = i.previous,
                    u = a[o];
                s[o] = new sE(u && u.currentValue, t, a === Tt), e[r] = t
            }
            Nn.ngInherit = !0;
            const uh = "__ngSimpleChanges__";

            function ch(e) {
                return e[uh] || null
            }
            const Rt = function(e, t, n) {};

            function J(e) {
                for (; Array.isArray(e);) e = e[ae];
                return e
            }

            function Ue(e, t) {
                return J(t[e.index])
            }

            function fh(e, t) {
                return e.data[t]
            }

            function Ke(e, t) {
                const n = t[e];
                return He(n) ? n : n[ae]
            }

            function hn(e, t) {
                return null == t ? null : e[t]
            }

            function hh(e) {
                e[Xn] = 0
            }

            function gE(e) {
                1024 & e[k] || (e[k] |= 1024, gh(e, 1))
            }

            function ph(e) {
                1024 & e[k] && (e[k] &= -1025, gh(e, -1))
            }

            function gh(e, t) {
                let n = e[re];
                if (null === n) return;
                n[uo] += t;
                let r = n;
                for (n = n[re]; null !== n && (1 === t && 1 === r[uo] || -1 === t && 0 === r[uo]);) n[uo] += t, r = n, n = n[re]
            }
            const A = {
                lFrame: Mh(null),
                bindingsEnabled: !0,
                skipHydrationRootTNode: null
            };

            function yh() {
                return A.bindingsEnabled
            }

            function v() {
                return A.lFrame.lView
            }

            function H() {
                return A.lFrame.tView
            }

            function be() {
                let e = Dh();
                for (; null !== e && 64 === e.type;) e = e.parent;
                return e
            }

            function Dh() {
                return A.lFrame.currentTNode
            }

            function xt(e, t) {
                const n = A.lFrame;
                n.currentTNode = e, n.isParent = t
            }

            function Iu() {
                return A.lFrame.isParent
            }

            function rr() {
                return A.lFrame.bindingIndex++
            }

            function AE(e, t) {
                const n = A.lFrame;
                n.bindingIndex = n.bindingRootIndex = e, Mu(t)
            }

            function Mu(e) {
                A.lFrame.currentDirectiveIndex = e
            }

            function Tu(e) {
                A.lFrame.currentQueryIndex = e
            }

            function RE(e) {
                const t = e[w];
                return 2 === t.type ? t.declTNode : 1 === t.type ? e[Me] : null
            }

            function Ih(e, t, n) {
                if (n & j.SkipSelf) {
                    let o = t,
                        i = e;
                    for (; !(o = o.parent, null !== o || n & j.Host || (o = RE(i), null === o || (i = i[Kn], 10 & o.type))););
                    if (null === o) return !1;
                    t = o, e = i
                }
                const r = A.lFrame = bh();
                return r.currentTNode = t, r.lView = e, !0
            }

            function Au(e) {
                const t = bh(),
                    n = e[w];
                A.lFrame = t, t.currentTNode = n.firstChild, t.lView = e, t.tView = n, t.contextLView = e, t.bindingIndex = n.bindingStartIndex, t.inI18n = !1
            }

            function bh() {
                const e = A.lFrame,
                    t = null === e ? null : e.child;
                return null === t ? Mh(e) : t
            }

            function Mh(e) {
                const t = {
                    currentTNode: null,
                    isParent: !0,
                    lView: null,
                    tView: null,
                    selectedIndex: -1,
                    contextLView: null,
                    elementDepthCount: 0,
                    currentNamespace: null,
                    currentDirectiveIndex: -1,
                    bindingRootIndex: -1,
                    bindingIndex: -1,
                    currentQueryIndex: 0,
                    parent: e,
                    child: null,
                    inI18n: !1
                };
                return null !== e && (e.child = t), t
            }

            function Sh() {
                const e = A.lFrame;
                return A.lFrame = e.parent, e.currentTNode = null, e.lView = null, e
            }
            const Th = Sh;

            function Nu() {
                const e = Sh();
                e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0
            }

            function Pe() {
                return A.lFrame.selectedIndex
            }

            function Rn(e) {
                A.lFrame.selectedIndex = e
            }

            function ie() {
                const e = A.lFrame;
                return fh(e.tView, e.selectedIndex)
            }
            let Nh = !0;

            function qi() {
                return Nh
            }

            function pn(e) {
                Nh = e
            }

            function Wi(e, t) {
                for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
                    const i = e.data[n].type.prototype,
                        {
                            ngAfterContentInit: s,
                            ngAfterContentChecked: a,
                            ngAfterViewInit: u,
                            ngAfterViewChecked: c,
                            ngOnDestroy: l
                        } = i;
                    s && (e.contentHooks ??= []).push(-n, s), a && ((e.contentHooks ??= []).push(n, a), (e.contentCheckHooks ??= []).push(n, a)), u && (e.viewHooks ??= []).push(-n, u), c && ((e.viewHooks ??= []).push(n, c), (e.viewCheckHooks ??= []).push(n, c)), null != l && (e.destroyHooks ??= []).push(n, l)
                }
            }

            function Zi(e, t, n) {
                Rh(e, t, 3, n)
            }

            function Qi(e, t, n, r) {
                (3 & e[k]) === n && Rh(e, t, n, r)
            }

            function Ru(e, t) {
                let n = e[k];
                (3 & n) === t && (n &= 8191, n += 1, e[k] = n)
            }

            function Rh(e, t, n, r) {
                const i = r ?? -1,
                    s = t.length - 1;
                let a = 0;
                for (let u = void 0 !== r ? 65535 & e[Xn] : 0; u < s; u++)
                    if ("number" == typeof t[u + 1]) {
                        if (a = t[u], null != r && a >= r) break
                    } else t[u] < 0 && (e[Xn] += 65536), (a < i || -1 == i) && ($E(e, n, t, u), e[Xn] = (4294901760 & e[Xn]) + u + 2), u++
            }

            function xh(e, t) {
                Rt(4, e, t);
                const n = it(null);
                try {
                    t.call(e)
                } finally {
                    it(n), Rt(5, e, t)
                }
            }

            function $E(e, t, n, r) {
                const o = n[r] < 0,
                    i = n[r + 1],
                    a = e[o ? -n[r] : n[r]];
                o ? e[k] >> 13 < e[Xn] >> 16 && (3 & e[k]) === t && (e[k] += 8192, xh(a, i)) : xh(a, i)
            }
            const or = -1;
            class yo {
                constructor(t, n, r) {
                    this.factory = t, this.resolving = !1, this.canSeeViewProviders = n, this.injectImpl = r
                }
            }

            function Ou(e) {
                return e !== or
            }

            function Do(e) {
                return 32767 & e
            }

            function Co(e, t) {
                let n = function UE(e) {
                        return e >> 16
                    }(e),
                    r = t;
                for (; n > 0;) r = r[Kn], n--;
                return r
            }
            let Pu = !0;

            function Yi(e) {
                const t = Pu;
                return Pu = e, t
            }
            const Oh = 255,
                Ph = 5;
            let zE = 0;
            const Ot = {};

            function Ki(e, t) {
                const n = Fh(e, t);
                if (-1 !== n) return n;
                const r = t[w];
                r.firstCreatePass && (e.injectorIndex = t.length, Fu(r.data, e), Fu(t, null), Fu(r.blueprint, null));
                const o = Xi(e, t),
                    i = e.injectorIndex;
                if (Ou(o)) {
                    const s = Do(o),
                        a = Co(o, t),
                        u = a[w].data;
                    for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | u[s + c]
                }
                return t[i + 8] = o, i
            }

            function Fu(e, t) {
                e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
            }

            function Fh(e, t) {
                return -1 === e.injectorIndex || e.parent && e.parent.injectorIndex === e.injectorIndex || null === t[e.injectorIndex + 8] ? -1 : e.injectorIndex
            }

            function Xi(e, t) {
                if (e.parent && -1 !== e.parent.injectorIndex) return e.parent.injectorIndex;
                let n = 0,
                    r = null,
                    o = t;
                for (; null !== o;) {
                    if (r = Uh(o), null === r) return or;
                    if (n++, o = o[Kn], -1 !== r.injectorIndex) return r.injectorIndex | n << 16
                }
                return or
            }

            function ku(e, t, n) {
                ! function GE(e, t, n) {
                    let r;
                    "string" == typeof n ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(so) && (r = n[so]), null == r && (r = n[so] = zE++);
                    const o = r & Oh;
                    t.data[e + (o >> Ph)] |= 1 << o
                }(e, t, n)
            }

            function kh(e, t, n) {
                if (n & j.Optional || void 0 !== e) return e;
                nu()
            }

            function Lh(e, t, n, r) {
                if (n & j.Optional && void 0 === r && (r = null), !(n & (j.Self | j.Host))) {
                    const o = e[ln],
                        i = Ve(void 0);
                    try {
                        return o ? o.get(t, r, n & j.Optional) : bf(t, r, n & j.Optional)
                    } finally {
                        Ve(i)
                    }
                }
                return kh(r, 0, n)
            }

            function jh(e, t, n, r = j.Default, o) {
                if (null !== e) {
                    if (2048 & t[k] && !(r & j.Self)) {
                        const s = function KE(e, t, n, r, o) {
                            let i = e,
                                s = t;
                            for (; null !== i && null !== s && 2048 & s[k] && !(512 & s[k]);) {
                                const a = $h(i, s, n, r | j.Self, Ot);
                                if (a !== Ot) return a;
                                let u = i.parent;
                                if (!u) {
                                    const c = s[Uf];
                                    if (c) {
                                        const l = c.get(n, Ot, r);
                                        if (l !== Ot) return l
                                    }
                                    u = Uh(s), s = s[Kn]
                                }
                                i = u
                            }
                            return o
                        }(e, t, n, r, Ot);
                        if (s !== Ot) return s
                    }
                    const i = $h(e, t, n, r, Ot);
                    if (i !== Ot) return i
                }
                return Lh(t, n, r, o)
            }

            function $h(e, t, n, r, o) {
                const i = function ZE(e) {
                    if ("string" == typeof e) return e.charCodeAt(0) || 0;
                    const t = e.hasOwnProperty(so) ? e[so] : void 0;
                    return "number" == typeof t ? t >= 0 ? t & Oh : YE : t
                }(n);
                if ("function" == typeof i) {
                    if (!Ih(t, e, r)) return r & j.Host ? kh(o, 0, r) : Lh(t, n, r, o);
                    try {
                        let s;
                        if (s = i(r), null != s || r & j.Optional) return s;
                        nu()
                    } finally {
                        Th()
                    }
                } else if ("number" == typeof i) {
                    let s = null,
                        a = Fh(e, t),
                        u = or,
                        c = r & j.Host ? t[le][Me] : null;
                    for ((-1 === a || r & j.SkipSelf) && (u = -1 === a ? Xi(e, t) : t[a + 8], u !== or && Bh(r, !1) ? (s = t[w], a = Do(u), t = Co(u, t)) : a = -1); - 1 !== a;) {
                        const l = t[w];
                        if (Vh(i, a, l.data)) {
                            const d = WE(a, t, n, s, r, c);
                            if (d !== Ot) return d
                        }
                        u = t[a + 8], u !== or && Bh(r, t[w].data[a + 8] === c) && Vh(i, a, t) ? (s = l, a = Do(u), t = Co(u, t)) : a = -1
                    }
                }
                return o
            }

            function WE(e, t, n, r, o, i) {
                const s = t[w],
                    a = s.data[e + 8],
                    l = function Ji(e, t, n, r, o) {
                        const i = e.providerIndexes,
                            s = t.data,
                            a = 1048575 & i,
                            u = e.directiveStart,
                            l = i >> 20,
                            f = o ? a + l : e.directiveEnd;
                        for (let h = r ? a : a + l; h < f; h++) {
                            const p = s[h];
                            if (h < u && n === p || h >= u && p.type === n) return h
                        }
                        if (o) {
                            const h = s[u];
                            if (h && Dt(h) && h.type === n) return u
                        }
                        return null
                    }(a, s, n, null == r ? Tn(a) && Pu : r != s && 0 != (3 & a.type), o & j.Host && i === a);
                return null !== l ? xn(t, s, l, a) : Ot
            }

            function xn(e, t, n, r) {
                let o = e[n];
                const i = t.data;
                if (function VE(e) {
                        return e instanceof yo
                    }(o)) {
                    const s = o;
                    s.resolving && function h_(e, t) {
                        const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
                        throw new C(-200, `Circular dependency in DI detected for ${e}${n}`)
                    }(function q(e) {
                        return "function" == typeof e ? e.name || e.toString() : "object" == typeof e && null != e && "function" == typeof e.type ? e.type.name || e.type.toString() : O(e)
                    }(i[n]));
                    const a = Yi(s.canSeeViewProviders);
                    s.resolving = !0;
                    const c = s.injectImpl ? Ve(s.injectImpl) : null;
                    Ih(e, r, j.Default);
                    try {
                        o = e[n] = s.factory(void 0, i, e, r), t.firstCreatePass && n >= r.directiveStart && function jE(e, t, n) {
                            const {
                                ngOnChanges: r,
                                ngOnInit: o,
                                ngDoCheck: i
                            } = t.type.prototype;
                            if (r) {
                                const s = ah(t);
                                (n.preOrderHooks ??= []).push(e, s), (n.preOrderCheckHooks ??= []).push(e, s)
                            }
                            o && (n.preOrderHooks ??= []).push(0 - e, o), i && ((n.preOrderHooks ??= []).push(e, i), (n.preOrderCheckHooks ??= []).push(e, i))
                        }(n, i[n], t)
                    } finally {
                        null !== c && Ve(c), Yi(a), s.resolving = !1, Th()
                    }
                }
                return o
            }

            function Vh(e, t, n) {
                return !!(n[t + (e >> Ph)] & 1 << e)
            }

            function Bh(e, t) {
                return !(e & j.Self || e & j.Host && t)
            }
            class Fe {
                constructor(t, n) {
                    this._tNode = t, this._lView = n
                }
                get(t, n, r) {
                    return jh(this._tNode, this._lView, t, Li(r), n)
                }
            }

            function YE() {
                return new Fe(be(), v())
            }

            function Lu(e) {
                return eu(e) ? () => {
                    const t = Lu(R(e));
                    return t && t()
                } : An(e)
            }

            function Uh(e) {
                const t = e[w],
                    n = t.type;
                return 2 === n ? t.declTNode : 1 === n ? e[Me] : null
            }
            const sr = "__parameters__";

            function ur(e, t, n) {
                return Bt(() => {
                    const r = function ju(e) {
                        return function(...n) {
                            if (e) {
                                const r = e(...n);
                                for (const o in r) this[o] = r[o]
                            }
                        }
                    }(t);

                    function o(...i) {
                        if (this instanceof o) return r.apply(this, i), this;
                        const s = new o(...i);
                        return a.annotation = s, a;

                        function a(u, c, l) {
                            const d = u.hasOwnProperty(sr) ? u[sr] : Object.defineProperty(u, sr, {
                                value: []
                            })[sr];
                            for (; d.length <= l;) d.push(null);
                            return (d[l] = d[l] || []).push(s), u
                        }
                    }
                    return n && (o.prototype = Object.create(n.prototype)), o.prototype.ngMetadataName = e, o.annotationCls = o, o
                })
            }

            function lr(e, t) {
                e.forEach(n => Array.isArray(n) ? lr(n, t) : t(n))
            }

            function Gh(e, t, n) {
                t >= e.length ? e.push(n) : e.splice(t, 0, n)
            }

            function ts(e, t) {
                return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
            }
            const rs = io(ur("Optional"), 8),
                os = io(ur("SkipSelf"), 4);

            function cs(e) {
                return 128 == (128 & e.flags)
            }
            var gn = function(e) {
                return e[e.Important = 1] = "Important", e[e.DashCase = 2] = "DashCase", e
            }(gn || {});
            const zu = new Map;
            let TI = 0;
            const qu = "__ngContext__";

            function Se(e, t) {
                He(t) ? (e[qu] = t[fo], function NI(e) {
                    zu.set(e[fo], e)
                }(t)) : e[qu] = t
            }
            let Wu;

            function Zu(e, t) {
                return Wu(e, t)
            }

            function Mo(e) {
                const t = e[re];
                return xe(t) ? t[re] : t
            }

            function fp(e) {
                return pp(e[co])
            }

            function hp(e) {
                return pp(e[yt])
            }

            function pp(e) {
                for (; null !== e && !xe(e);) e = e[yt];
                return e
            }

            function pr(e, t, n, r, o) {
                if (null != r) {
                    let i, s = !1;
                    xe(r) ? i = r : He(r) && (s = !0, r = r[ae]);
                    const a = J(r);
                    0 === e && null !== n ? null == o ? yp(t, n, a) : On(t, n, a, o || null, !0) : 1 === e && null !== n ? On(t, n, a, o || null, !0) : 2 === e ? function ms(e, t, n) {
                        const r = ps(e, t);
                        r && function QI(e, t, n, r) {
                            e.removeChild(t, n, r)
                        }(e, r, t, n)
                    }(t, a, s) : 3 === e && t.destroyNode(a), null != i && function XI(e, t, n, r, o) {
                        const i = n[Nt];
                        i !== J(n) && pr(t, e, r, i, o);
                        for (let a = Ee; a < n.length; a++) {
                            const u = n[a];
                            To(u[w], u, e, t, r, i)
                        }
                    }(t, e, i, n, o)
                }
            }

            function fs(e, t, n) {
                return e.createElement(t, n)
            }

            function mp(e, t) {
                const n = e[Jn],
                    r = n.indexOf(t);
                ph(t), n.splice(r, 1)
            }

            function hs(e, t) {
                if (e.length <= Ee) return;
                const n = Ee + t,
                    r = e[n];
                if (r) {
                    const o = r[lo];
                    null !== o && o !== e && mp(o, r), t > 0 && (e[n - 1][yt] = r[yt]);
                    const i = ts(e, Ee + t);
                    ! function BI(e, t) {
                        To(e, t, t[P], 2, null, null), t[ae] = null, t[Me] = null
                    }(r[w], r);
                    const s = i[At];
                    null !== s && s.detachView(i[w]), r[re] = null, r[yt] = null, r[k] &= -129
                }
                return r
            }

            function Yu(e, t) {
                if (!(256 & t[k])) {
                    const n = t[P];
                    t[ho] && Jf(t[ho]), t[po] && Jf(t[po]), n.destroyNode && To(e, t, n, 3, null, null),
                        function zI(e) {
                            let t = e[co];
                            if (!t) return Ku(e[w], e);
                            for (; t;) {
                                let n = null;
                                if (He(t)) n = t[co];
                                else {
                                    const r = t[Ee];
                                    r && (n = r)
                                }
                                if (!n) {
                                    for (; t && !t[yt] && t !== e;) He(t) && Ku(t[w], t), t = t[re];
                                    null === t && (t = e), He(t) && Ku(t[w], t), n = t && t[yt]
                                }
                                t = n
                            }
                        }(t)
                }
            }

            function Ku(e, t) {
                if (!(256 & t[k])) {
                    t[k] &= -129, t[k] |= 256,
                        function ZI(e, t) {
                            let n;
                            if (null != e && null != (n = e.destroyHooks))
                                for (let r = 0; r < n.length; r += 2) {
                                    const o = t[n[r]];
                                    if (!(o instanceof yo)) {
                                        const i = n[r + 1];
                                        if (Array.isArray(i))
                                            for (let s = 0; s < i.length; s += 2) {
                                                const a = o[i[s]],
                                                    u = i[s + 1];
                                                Rt(4, a, u);
                                                try {
                                                    u.call(a)
                                                } finally {
                                                    Rt(5, a, u)
                                                }
                                            } else {
                                                Rt(4, o, i);
                                                try {
                                                    i.call(o)
                                                } finally {
                                                    Rt(5, o, i)
                                                }
                                            }
                                    }
                                }
                        }(e, t),
                        function WI(e, t) {
                            const n = e.cleanup,
                                r = t[Qn];
                            if (null !== n)
                                for (let i = 0; i < n.length - 1; i += 2)
                                    if ("string" == typeof n[i]) {
                                        const s = n[i + 3];
                                        s >= 0 ? r[s]() : r[-s].unsubscribe(), i += 2
                                    } else n[i].call(r[n[i + 1]]);
                            null !== r && (t[Qn] = null);
                            const o = t[dn];
                            if (null !== o) {
                                t[dn] = null;
                                for (let i = 0; i < o.length; i++)(0, o[i])()
                            }
                        }(e, t), 1 === t[w].type && t[P].destroy();
                    const n = t[lo];
                    if (null !== n && xe(t[re])) {
                        n !== t[re] && mp(n, t);
                        const r = t[At];
                        null !== r && r.detachView(e)
                    }! function RI(e) {
                        zu.delete(e[fo])
                    }(t)
                }
            }

            function Xu(e, t, n) {
                return function vp(e, t, n) {
                    let r = t;
                    for (; null !== r && 40 & r.type;) r = (t = r).parent;
                    if (null === r) return n[ae];
                    {
                        const {
                            componentOffset: o
                        } = r;
                        if (o > -1) {
                            const {
                                encapsulation: i
                            } = e.data[r.directiveStart + o];
                            if (i === mt.None || i === mt.Emulated) return null
                        }
                        return Ue(r, n)
                    }
                }(e, t.parent, n)
            }

            function On(e, t, n, r, o) {
                e.insertBefore(t, n, r, o)
            }

            function yp(e, t, n) {
                e.appendChild(t, n)
            }

            function Dp(e, t, n, r, o) {
                null !== r ? On(e, t, n, r, o) : yp(e, t, n)
            }

            function ps(e, t) {
                return e.parentNode(t)
            }
            let Ju, rc, ys, _p = function wp(e, t, n) {
                return 40 & e.type ? Ue(e, n) : null
            };

            function gs(e, t, n, r) {
                const o = Xu(e, r, t),
                    i = t[P],
                    a = function Cp(e, t, n) {
                        return _p(e, t, n)
                    }(r.parent || t[Me], r, t);
                if (null != o)
                    if (Array.isArray(n))
                        for (let u = 0; u < n.length; u++) Dp(i, o, n[u], a, !1);
                    else Dp(i, o, n, a, !1);
                void 0 !== Ju && Ju(i, r, t, n, o)
            }

            function So(e, t) {
                if (null !== t) {
                    const n = t.type;
                    if (3 & n) return Ue(t, e);
                    if (4 & n) return ec(-1, e[t.index]);
                    if (8 & n) {
                        const r = t.child;
                        if (null !== r) return So(e, r);
                        {
                            const o = e[t.index];
                            return xe(o) ? ec(-1, o) : J(o)
                        }
                    }
                    if (32 & n) return Zu(t, e)() || J(e[t.index]);
                    {
                        const r = Ip(e, t);
                        return null !== r ? Array.isArray(r) ? r[0] : So(Mo(e[le]), r) : So(e, t.next)
                    }
                }
                return null
            }

            function Ip(e, t) {
                return null !== t ? e[le][Me].projection[t.projection] : null
            }

            function ec(e, t) {
                const n = Ee + e + 1;
                if (n < t.length) {
                    const r = t[n],
                        o = r[w].firstChild;
                    if (null !== o) return So(r, o)
                }
                return t[Nt]
            }

            function tc(e, t, n, r, o, i, s) {
                for (; null != n;) {
                    const a = r[n.index],
                        u = n.type;
                    if (s && 0 === t && (a && Se(J(a), r), n.flags |= 2), 32 != (32 & n.flags))
                        if (8 & u) tc(e, t, n.child, r, o, i, !1), pr(t, e, o, a, i);
                        else if (32 & u) {
                        const c = Zu(n, r);
                        let l;
                        for (; l = c();) pr(t, e, o, l, i);
                        pr(t, e, o, a, i)
                    } else 16 & u ? Mp(e, t, r, n, o, i) : pr(t, e, o, a, i);
                    n = s ? n.projectionNext : n.next
                }
            }

            function To(e, t, n, r, o, i) {
                tc(n, r, e.firstChild, t, o, i, !1)
            }

            function Mp(e, t, n, r, o, i) {
                const s = n[le],
                    u = s[Me].projection[r.projection];
                if (Array.isArray(u))
                    for (let c = 0; c < u.length; c++) pr(t, e, o, u[c], i);
                else {
                    let c = u;
                    const l = s[re];
                    cs(r) && (c.flags |= 128), tc(e, t, c, l, o, i, !0)
                }
            }

            function Sp(e, t, n) {
                "" === n ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n)
            }

            function Tp(e, t, n) {
                const {
                    mergedAttrs: r,
                    classes: o,
                    styles: i
                } = n;
                null !== r && hu(e, t, r), null !== o && Sp(e, t, o), null !== i && function eb(e, t, n) {
                    e.setAttribute(t, "style", n)
                }(e, t, i)
            }

            function Rp(e) {
                return function oc() {
                    if (void 0 === ys && (ys = null, X.trustedTypes)) try {
                        ys = X.trustedTypes.createPolicy("angular#unsafe-bypass", {
                            createHTML: e => e,
                            createScript: e => e,
                            createScriptURL: e => e
                        })
                    } catch {}
                    return ys
                }()?.createScriptURL(e) || e
            }
            class xp {
                constructor(t) {
                    this.changingThisBreaksApplicationSecurity = t
                }
                toString() {
                    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${wf})`
                }
            }

            function mn(e) {
                return e instanceof xp ? e.changingThisBreaksApplicationSecurity : e
            }

            function Ao(e, t) {
                const n = function lb(e) {
                    return e instanceof xp && e.getTypeName() || null
                }(e);
                if (null != n && n !== t) {
                    if ("ResourceURL" === n && "URL" === t) return !0;
                    throw new Error(`Required a safe ${t}, got a ${n} (see ${wf})`)
                }
                return n === t
            }
            const pb = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
            var vr = function(e) {
                return e[e.NONE = 0] = "NONE", e[e.HTML = 1] = "HTML", e[e.STYLE = 2] = "STYLE", e[e.SCRIPT = 3] = "SCRIPT", e[e.URL = 4] = "URL", e[e.RESOURCE_URL = 5] = "RESOURCE_URL", e
            }(vr || {});

            function Ro(e) {
                const t = xo();
                return t ? t.sanitize(vr.URL, e) || "" : Ao(e, "URL") ? mn(e) : function ic(e) {
                    return (e = String(e)).match(pb) ? e : "unsafe:" + e
                }(O(e))
            }

            function $p(e) {
                const t = xo();
                if (t) return Rp(t.sanitize(vr.RESOURCE_URL, e) || "");
                if (Ao(e, "ResourceURL")) return Rp(mn(e));
                throw new C(904, !1)
            }

            function xo() {
                const e = v();
                return e && e[Yn].sanitizer
            }
            class I {
                constructor(t, n) {
                    this._desc = t, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, "number" == typeof n ? this.__NG_ELEMENT_ID__ = n : void 0 !== n && (this.\u0275prov = S({
                        token: this,
                        providedIn: n.providedIn || "root",
                        factory: n.factory
                    }))
                }
                get multi() {
                    return this
                }
                toString() {
                    return `InjectionToken ${this._desc}`
                }
            }
            const Oo = new I("ENVIRONMENT_INITIALIZER"),
                Bp = new I("INJECTOR", -1),
                Hp = new I("INJECTOR_DEF_TYPES");
            class cc {
                get(t, n = oo) {
                    if (n === oo) {
                        const r = new Error(`NullInjectorError: No provider for ${me(t)}!`);
                        throw r.name = "NullInjectorError", r
                    }
                    return n
                }
            }

            function Sb(...e) {
                return {
                    \u0275providers: zp(0, e),
                    \u0275fromNgModule: !0
                }
            }

            function zp(e, ...t) {
                const n = [],
                    r = new Set;
                let o;
                const i = s => {
                    n.push(s)
                };
                return lr(t, s => {
                    const a = s;
                    Cs(a, i, [], r) && (o ||= [], o.push(a))
                }), void 0 !== o && Gp(o, i), n
            }

            function Gp(e, t) {
                for (let n = 0; n < e.length; n++) {
                    const {
                        ngModule: r,
                        providers: o
                    } = e[n];
                    lc(o, i => {
                        t(i, r)
                    })
                }
            }

            function Cs(e, t, n, r) {
                if (!(e = R(e))) return !1;
                let o = null,
                    i = Pi(e);
                const s = !i && B(e);
                if (i || s) {
                    if (s && !s.standalone) return !1;
                    o = e
                } else {
                    const u = e.ngModule;
                    if (i = Pi(u), !i) return !1;
                    o = u
                }
                const a = r.has(o);
                if (s) {
                    if (a) return !1;
                    if (r.add(o), s.dependencies) {
                        const u = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
                        for (const c of u) Cs(c, t, n, r)
                    }
                } else {
                    if (!i) return !1;
                    {
                        if (null != i.imports && !a) {
                            let c;
                            r.add(o);
                            try {
                                lr(i.imports, l => {
                                    Cs(l, t, n, r) && (c ||= [], c.push(l))
                                })
                            } finally {}
                            void 0 !== c && Gp(c, t)
                        }
                        if (!a) {
                            const c = An(o) || (() => new o);
                            t({
                                provide: o,
                                useFactory: c,
                                deps: U
                            }, o), t({
                                provide: Hp,
                                useValue: o,
                                multi: !0
                            }, o), t({
                                provide: Oo,
                                useValue: () => b(o),
                                multi: !0
                            }, o)
                        }
                        const u = i.providers;
                        if (null != u && !a) {
                            const c = e;
                            lc(u, l => {
                                t(l, c)
                            })
                        }
                    }
                }
                return o !== e && void 0 !== e.providers
            }

            function lc(e, t) {
                for (let n of e) tu(n) && (n = n.\u0275providers), Array.isArray(n) ? lc(n, t) : t(n)
            }
            const Tb = W({
                provide: String,
                useValue: W
            });

            function dc(e) {
                return null !== e && "object" == typeof e && Tb in e
            }

            function Pn(e) {
                return "function" == typeof e
            }
            const fc = new I("Set Injector scope."),
                ws = {},
                Nb = {};
            let hc;

            function _s() {
                return void 0 === hc && (hc = new cc), hc
            }
            class at {}
            class Es extends at {
                get destroyed() {
                    return this._destroyed
                }
                constructor(t, n, r, o) {
                    super(), this.parent = n, this.source = r, this.scopes = o, this.records = new Map, this._ngOnDestroyHooks = new Set, this._onDestroyHooks = [], this._destroyed = !1, gc(t, s => this.processProvider(s)), this.records.set(Bp, yr(void 0, this)), o.has("environment") && this.records.set(at, yr(void 0, this));
                    const i = this.records.get(fc);
                    null != i && "string" == typeof i.value && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(Hp.multi, U, j.Self))
                }
                destroy() {
                    this.assertNotDestroyed(), this._destroyed = !0;
                    try {
                        for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
                        const t = this._onDestroyHooks;
                        this._onDestroyHooks = [];
                        for (const n of t) n()
                    } finally {
                        this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear()
                    }
                }
                onDestroy(t) {
                    return this.assertNotDestroyed(), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t)
                }
                runInContext(t) {
                    this.assertNotDestroyed();
                    const n = cn(this),
                        r = Ve(void 0);
                    try {
                        return t()
                    } finally {
                        cn(n), Ve(r)
                    }
                }
                get(t, n = oo, r = j.Default) {
                    if (this.assertNotDestroyed(), t.hasOwnProperty(Nf)) return t[Nf](this);
                    r = Li(r);
                    const i = cn(this),
                        s = Ve(void 0);
                    try {
                        if (!(r & j.SkipSelf)) {
                            let u = this.records.get(t);
                            if (void 0 === u) {
                                const c = function Fb(e) {
                                    return "function" == typeof e || "object" == typeof e && e instanceof I
                                }(t) && Oi(t);
                                u = c && this.injectableDefInScope(c) ? yr(pc(t), ws) : null, this.records.set(t, u)
                            }
                            if (null != u) return this.hydrate(t, u)
                        }
                        return (r & j.Self ? _s() : this.parent).get(t, n = r & j.Optional && n === oo ? null : n)
                    } catch (a) {
                        if ("NullInjectorError" === a.name) {
                            if ((a[ki] = a[ki] || []).unshift(me(t)), i) throw a;
                            return function T_(e, t, n, r) {
                                const o = e[ki];
                                throw t[Sf] && o.unshift(t[Sf]), e.message = function A_(e, t, n, r = null) {
                                    e = e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1) ? e.slice(2) : e;
                                    let o = me(t);
                                    if (Array.isArray(t)) o = t.map(me).join(" -> ");
                                    else if ("object" == typeof t) {
                                        let i = [];
                                        for (let s in t)
                                            if (t.hasOwnProperty(s)) {
                                                let a = t[s];
                                                i.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : me(a)))
                                            } o = `{${i.join(", ")}}`
                                    }
                                    return `${n}${r?"("+r+")":""}[${o}]: ${e.replace(E_,"\n  ")}`
                                }("\n" + e.message, o, n, r), e.ngTokenPath = o, e[ki] = null, e
                            }(a, t, "R3InjectorError", this.source)
                        }
                        throw a
                    } finally {
                        Ve(s), cn(i)
                    }
                }
                resolveInjectorInitializers() {
                    const t = cn(this),
                        n = Ve(void 0);
                    try {
                        const o = this.get(Oo.multi, U, j.Self);
                        for (const i of o) i()
                    } finally {
                        cn(t), Ve(n)
                    }
                }
                toString() {
                    const t = [],
                        n = this.records;
                    for (const r of n.keys()) t.push(me(r));
                    return `R3Injector[${t.join(", ")}]`
                }
                assertNotDestroyed() {
                    if (this._destroyed) throw new C(205, !1)
                }
                processProvider(t) {
                    let n = Pn(t = R(t)) ? t : R(t && t.provide);
                    const r = function xb(e) {
                        return dc(e) ? yr(void 0, e.useValue) : yr(function Zp(e, t, n) {
                            let r;
                            if (Pn(e)) {
                                const o = R(e);
                                return An(o) || pc(o)
                            }
                            if (dc(e)) r = () => R(e.useValue);
                            else if (function Wp(e) {
                                    return !(!e || !e.useFactory)
                                }(e)) r = () => e.useFactory(...lu(e.deps || []));
                            else if (function qp(e) {
                                    return !(!e || !e.useExisting)
                                }(e)) r = () => b(R(e.useExisting));
                            else {
                                const o = R(e && (e.useClass || e.provide));
                                if (! function Ob(e) {
                                        return !!e.deps
                                    }(e)) return An(o) || pc(o);
                                r = () => new o(...lu(e.deps))
                            }
                            return r
                        }(e), ws)
                    }(t);
                    if (Pn(t) || !0 !== t.multi) this.records.get(n);
                    else {
                        let o = this.records.get(n);
                        o || (o = yr(void 0, ws, !0), o.factory = () => lu(o.multi), this.records.set(n, o)), n = t, o.multi.push(t)
                    }
                    this.records.set(n, r)
                }
                hydrate(t, n) {
                    return n.value === ws && (n.value = Nb, n.value = n.factory()), "object" == typeof n.value && n.value && function Pb(e) {
                        return null !== e && "object" == typeof e && "function" == typeof e.ngOnDestroy
                    }(n.value) && this._ngOnDestroyHooks.add(n.value), n.value
                }
                injectableDefInScope(t) {
                    if (!t.providedIn) return !1;
                    const n = R(t.providedIn);
                    return "string" == typeof n ? "any" === n || this.scopes.has(n) : this.injectorDefTypes.has(n)
                }
                removeOnDestroy(t) {
                    const n = this._onDestroyHooks.indexOf(t); - 1 !== n && this._onDestroyHooks.splice(n, 1)
                }
            }

            function pc(e) {
                const t = Oi(e),
                    n = null !== t ? t.factory : An(e);
                if (null !== n) return n;
                if (e instanceof I) throw new C(204, !1);
                if (e instanceof Function) return function Rb(e) {
                    const t = e.length;
                    if (t > 0) throw function Eo(e, t) {
                        const n = [];
                        for (let r = 0; r < e; r++) n.push(t);
                        return n
                    }(t, "?"), new C(204, !1);
                    const n = function D_(e) {
                        return e && (e[Fi] || e[Ef]) || null
                    }(e);
                    return null !== n ? () => n.factory(e) : () => new e
                }(e);
                throw new C(204, !1)
            }

            function yr(e, t, n = !1) {
                return {
                    factory: e,
                    value: t,
                    multi: n ? [] : void 0
                }
            }

            function gc(e, t) {
                for (const n of e) Array.isArray(n) ? gc(n, t) : n && tu(n) ? gc(n.\u0275providers, t) : t(n)
            }
            const Is = new I("AppId", {
                    providedIn: "root",
                    factory: () => kb
                }),
                kb = "ng",
                Qp = new I("Platform Initializer"),
                Dr = new I("Platform ID", {
                    providedIn: "platform",
                    factory: () => "unknown"
                }),
                Yp = new I("CSP nonce", {
                    providedIn: "root",
                    factory: () => function mr() {
                        if (void 0 !== rc) return rc;
                        if (typeof document < "u") return document;
                        throw new C(210, !1)
                    }().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") || null
                });
            let Kp = (e, t, n) => null;

            function Ec(e, t, n = !1) {
                return Kp(e, t, n)
            }
            class qb {}
            class eg {}
            class Zb {
                resolveComponentFactory(t) {
                    throw function Wb(e) {
                        const t = Error(`No component factory found for ${me(e)}.`);
                        return t.ngComponent = e, t
                    }(t)
                }
            }
            let Ns = (() => {
                class e {
                    static #e = this.NULL = new Zb
                }
                return e
            })();

            function Qb() {
                return _r(be(), v())
            }

            function _r(e, t) {
                return new vn(Ue(e, t))
            }
            let vn = (() => {
                class e {
                    constructor(n) {
                        this.nativeElement = n
                    }
                    static #e = this.__NG_ELEMENT_ID__ = Qb
                }
                return e
            })();
            class ng {}
            let Rs = (() => {
                    class e {
                        constructor() {
                            this.destroyNode = null
                        }
                        static #e = this.__NG_ELEMENT_ID__ = () => function Kb() {
                            const e = v(),
                                n = Ke(be().index, e);
                            return (He(n) ? n : e)[P]
                        }()
                    }
                    return e
                })(),
                Xb = (() => {
                    class e {
                        static #e = this.\u0275prov = S({
                            token: e,
                            providedIn: "root",
                            factory: () => null
                        })
                    }
                    return e
                })();
            class xs {
                constructor(t) {
                    this.full = t, this.major = t.split(".")[0], this.minor = t.split(".")[1], this.patch = t.split(".").slice(2).join(".")
                }
            }
            const Jb = new xs("16.2.10"),
                Mc = {};

            function sg(e, t = null, n = null, r) {
                const o = ag(e, t, n, r);
                return o.resolveInjectorInitializers(), o
            }

            function ag(e, t = null, n = null, r, o = new Set) {
                const i = [n || U, Sb(e)];
                return r = r || ("object" == typeof e ? void 0 : me(e)), new Es(i, t || _s(), r || null, o)
            }
            let ut = (() => {
                class e {
                    static #e = this.THROW_IF_NOT_FOUND = oo;
                    static #t = this.NULL = new cc;
                    static create(n, r) {
                        if (Array.isArray(n)) return sg({
                            name: ""
                        }, r, n, "");
                        {
                            const o = n.name ?? "";
                            return sg({
                                name: o
                            }, n.parent, n.providers, o)
                        }
                    }
                    static #n = this.\u0275prov = S({
                        token: e,
                        providedIn: "any",
                        factory: () => b(Bp)
                    });
                    static #r = this.__NG_ELEMENT_ID__ = -1
                }
                return e
            })();

            function Tc(e) {
                return e.ngOriginalError
            }
            class Zt {
                constructor() {
                    this._console = console
                }
                handleError(t) {
                    const n = this._findOriginalError(t);
                    this._console.error("ERROR", t), n && this._console.error("ORIGINAL ERROR", n)
                }
                _findOriginalError(t) {
                    let n = t && Tc(t);
                    for (; n && Tc(n);) n = Tc(n);
                    return n || null
                }
            }

            function Nc(e) {
                return t => {
                    setTimeout(e, void 0, t)
                }
            }
            const ke = class sM extends gt {
                constructor(t = !1) {
                    super(), this.__isAsync = t
                }
                emit(t) {
                    super.next(t)
                }
                subscribe(t, n, r) {
                    let o = t,
                        i = n || (() => null),
                        s = r;
                    if (t && "object" == typeof t) {
                        const u = t;
                        o = u.next?.bind(u), i = u.error?.bind(u), s = u.complete?.bind(u)
                    }
                    this.__isAsync && (i = Nc(i), o && (o = Nc(o)), s && (s = Nc(s)));
                    const a = super.subscribe({
                        next: o,
                        error: i,
                        complete: s
                    });
                    return t instanceof Ze && t.add(a), a
                }
            };

            function cg(...e) {}
            class ee {
                constructor({
                    enableLongStackTrace: t = !1,
                    shouldCoalesceEventChangeDetection: n = !1,
                    shouldCoalesceRunChangeDetection: r = !1
                }) {
                    if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new ke(!1), this.onMicrotaskEmpty = new ke(!1), this.onStable = new ke(!1), this.onError = new ke(!1), typeof Zone > "u") throw new C(908, !1);
                    Zone.assertZonePatched();
                    const o = this;
                    o._nesting = 0, o._outer = o._inner = Zone.current, Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec)), t && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)), o.shouldCoalesceEventChangeDetection = !r && n, o.shouldCoalesceRunChangeDetection = r, o.lastRequestAnimationFrameId = -1, o.nativeRequestAnimationFrame = function aM() {
                            const e = "function" == typeof X.requestAnimationFrame;
                            let t = X[e ? "requestAnimationFrame" : "setTimeout"],
                                n = X[e ? "cancelAnimationFrame" : "clearTimeout"];
                            if (typeof Zone < "u" && t && n) {
                                const r = t[Zone.__symbol__("OriginalDelegate")];
                                r && (t = r);
                                const o = n[Zone.__symbol__("OriginalDelegate")];
                                o && (n = o)
                            }
                            return {
                                nativeRequestAnimationFrame: t,
                                nativeCancelAnimationFrame: n
                            }
                        }().nativeRequestAnimationFrame,
                        function lM(e) {
                            const t = () => {
                                ! function cM(e) {
                                    e.isCheckStableRunning || -1 !== e.lastRequestAnimationFrameId || (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(X, () => {
                                        e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                                            e.lastRequestAnimationFrameId = -1, xc(e), e.isCheckStableRunning = !0, Rc(e), e.isCheckStableRunning = !1
                                        }, void 0, () => {}, () => {})), e.fakeTopEventTask.invoke()
                                    }), xc(e))
                                }(e)
                            };
                            e._inner = e._inner.fork({
                                name: "angular",
                                properties: {
                                    isAngularZone: !0
                                },
                                onInvokeTask: (n, r, o, i, s, a) => {
                                    if (function fM(e) {
                                            return !(!Array.isArray(e) || 1 !== e.length) && !0 === e[0].data?.__ignore_ng_zone__
                                        }(a)) return n.invokeTask(o, i, s, a);
                                    try {
                                        return lg(e), n.invokeTask(o, i, s, a)
                                    } finally {
                                        (e.shouldCoalesceEventChangeDetection && "eventTask" === i.type || e.shouldCoalesceRunChangeDetection) && t(), dg(e)
                                    }
                                },
                                onInvoke: (n, r, o, i, s, a, u) => {
                                    try {
                                        return lg(e), n.invoke(o, i, s, a, u)
                                    } finally {
                                        e.shouldCoalesceRunChangeDetection && t(), dg(e)
                                    }
                                },
                                onHasTask: (n, r, o, i) => {
                                    n.hasTask(o, i), r === o && ("microTask" == i.change ? (e._hasPendingMicrotasks = i.microTask, xc(e), Rc(e)) : "macroTask" == i.change && (e.hasPendingMacrotasks = i.macroTask))
                                },
                                onHandleError: (n, r, o, i) => (n.handleError(o, i), e.runOutsideAngular(() => e.onError.emit(i)), !1)
                            })
                        }(o)
                }
                static isInAngularZone() {
                    return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone")
                }
                static assertInAngularZone() {
                    if (!ee.isInAngularZone()) throw new C(909, !1)
                }
                static assertNotInAngularZone() {
                    if (ee.isInAngularZone()) throw new C(909, !1)
                }
                run(t, n, r) {
                    return this._inner.run(t, n, r)
                }
                runTask(t, n, r, o) {
                    const i = this._inner,
                        s = i.scheduleEventTask("NgZoneEvent: " + o, t, uM, cg, cg);
                    try {
                        return i.runTask(s, n, r)
                    } finally {
                        i.cancelTask(s)
                    }
                }
                runGuarded(t, n, r) {
                    return this._inner.runGuarded(t, n, r)
                }
                runOutsideAngular(t) {
                    return this._outer.run(t)
                }
            }
            const uM = {};

            function Rc(e) {
                if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable) try {
                    e._nesting++, e.onMicrotaskEmpty.emit(null)
                } finally {
                    if (e._nesting--, !e.hasPendingMicrotasks) try {
                        e.runOutsideAngular(() => e.onStable.emit(null))
                    } finally {
                        e.isStable = !0
                    }
                }
            }

            function xc(e) {
                e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && -1 !== e.lastRequestAnimationFrameId)
            }

            function lg(e) {
                e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null))
            }

            function dg(e) {
                e._nesting--, Rc(e)
            }
            class dM {
                constructor() {
                    this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new ke, this.onMicrotaskEmpty = new ke, this.onStable = new ke, this.onError = new ke
                }
                run(t, n, r) {
                    return t.apply(n, r)
                }
                runGuarded(t, n, r) {
                    return t.apply(n, r)
                }
                runOutsideAngular(t) {
                    return t()
                }
                runTask(t, n, r, o) {
                    return t.apply(n, r)
                }
            }
            const fg = new I("", {
                providedIn: "root",
                factory: hg
            });

            function hg() {
                const e = _(ee);
                let t = !0;
                return function c_(...e) {
                    const t = ro(e),
                        n = function n_(e, t) {
                            return "number" == typeof Ya(e) ? e.pop() : t
                        }(e, 1 / 0),
                        r = e;
                    return r.length ? 1 === r.length ? nt(r[0]) : qn(n)(we(r, t)) : Mt
                }(new he(o => {
                    t = e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks, e.runOutsideAngular(() => {
                        o.next(t), o.complete()
                    })
                }), new he(o => {
                    let i;
                    e.runOutsideAngular(() => {
                        i = e.onStable.subscribe(() => {
                            ee.assertNotInAngularZone(), queueMicrotask(() => {
                                !t && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks && (t = !0, o.next(!0))
                            })
                        })
                    });
                    const s = e.onUnstable.subscribe(() => {
                        ee.assertInAngularZone(), t && (t = !1, e.runOutsideAngular(() => {
                            o.next(!1)
                        }))
                    });
                    return () => {
                        i.unsubscribe(), s.unsubscribe()
                    }
                }).pipe(Cf()))
            }

            function Qt(e) {
                return e instanceof Function ? e() : e
            }
            let Oc = (() => {
                class e {
                    constructor() {
                        this.renderDepth = 0, this.handler = null
                    }
                    begin() {
                        this.handler?.validateBegin(), this.renderDepth++
                    }
                    end() {
                        this.renderDepth--, 0 === this.renderDepth && this.handler?.execute()
                    }
                    ngOnDestroy() {
                        this.handler?.destroy(), this.handler = null
                    }
                    static #e = this.\u0275prov = S({
                        token: e,
                        providedIn: "root",
                        factory: () => new e
                    })
                }
                return e
            })();

            function ko(e) {
                for (; e;) {
                    e[k] |= 64;
                    const t = Mo(e);
                    if (mu(e) && !t) return e;
                    e = t
                }
                return null
            }
            const yg = new I("", {
                providedIn: "root",
                factory: () => !1
            });
            let Ps = null;

            function _g(e, t) {
                return e[t] ?? bg()
            }

            function Eg(e, t) {
                const n = bg();
                n.producerNode?.length && (e[t] = Ps, n.lView = e, Ps = Ig())
            }
            const _M = {
                ...Wf,
                consumerIsAlwaysLive: !0,
                consumerMarkedDirty: e => {
                    ko(e.lView)
                },
                lView: null
            };

            function Ig() {
                return Object.create(_M)
            }

            function bg() {
                return Ps ??= Ig(), Ps
            }
            const F = {};

            function ct(e) {
                Mg(H(), v(), Pe() + e, !1)
            }

            function Mg(e, t, n, r) {
                if (!r)
                    if (3 == (3 & t[k])) {
                        const i = e.preOrderCheckHooks;
                        null !== i && Zi(t, i, n)
                    } else {
                        const i = e.preOrderHooks;
                        null !== i && Qi(t, i, 0, n)
                    } Rn(n)
            }

            function M(e, t = j.Default) {
                const n = v();
                return null === n ? b(e, t) : jh(be(), n, R(e), t)
            }

            function Fs(e, t, n, r, o, i, s, a, u, c, l) {
                const d = t.blueprint.slice();
                return d[ae] = o, d[k] = 140 | r, (null !== c || e && 2048 & e[k]) && (d[k] |= 2048), hh(d), d[re] = d[Kn] = e, d[ce] = n, d[Yn] = s || e && e[Yn], d[P] = a || e && e[P], d[ln] = u || e && e[ln] || null, d[Me] = i, d[fo] = function AI() {
                    return TI++
                }(), d[zt] = l, d[Uf] = c, d[le] = 2 == t.type ? e[le] : d, d
            }

            function br(e, t, n, r, o) {
                let i = e.data[t];
                if (null === i) i = function Pc(e, t, n, r, o) {
                        const i = Dh(),
                            s = Iu(),
                            u = e.data[t] = function NM(e, t, n, r, o, i) {
                                let s = t ? t.injectorIndex : -1,
                                    a = 0;
                                return function nr() {
                                    return null !== A.skipHydrationRootTNode
                                }() && (a |= 128), {
                                    type: n,
                                    index: r,
                                    insertBeforeIndex: null,
                                    injectorIndex: s,
                                    directiveStart: -1,
                                    directiveEnd: -1,
                                    directiveStylingLast: -1,
                                    componentOffset: -1,
                                    propertyBindings: null,
                                    flags: a,
                                    providerIndexes: 0,
                                    value: o,
                                    attrs: i,
                                    mergedAttrs: null,
                                    localNames: null,
                                    initialInputs: void 0,
                                    inputs: null,
                                    outputs: null,
                                    tView: null,
                                    next: null,
                                    prev: null,
                                    projectionNext: null,
                                    child: null,
                                    parent: t,
                                    projection: null,
                                    styles: null,
                                    stylesWithoutHost: null,
                                    residualStyles: void 0,
                                    classes: null,
                                    classesWithoutHost: null,
                                    residualClasses: void 0,
                                    classBindings: 0,
                                    styleBindings: 0
                                }
                            }(0, s ? i : i && i.parent, n, t, r, o);
                        return null === e.firstChild && (e.firstChild = u), null !== i && (s ? null == i.child && null !== u.parent && (i.child = u) : null === i.next && (i.next = u, u.prev = i)), u
                    }(e, t, n, r, o),
                    function TE() {
                        return A.lFrame.inI18n
                    }() && (i.flags |= 32);
                else if (64 & i.type) {
                    i.type = n, i.value = r, i.attrs = o;
                    const s = function vo() {
                        const e = A.lFrame,
                            t = e.currentTNode;
                        return e.isParent ? t : t.parent
                    }();
                    i.injectorIndex = null === s ? -1 : s.injectorIndex
                }
                return xt(i, !0), i
            }

            function Lo(e, t, n, r) {
                if (0 === n) return -1;
                const o = t.length;
                for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
                return o
            }

            function Tg(e, t, n, r, o) {
                const i = _g(t, ho),
                    s = Pe(),
                    a = 2 & r;
                try {
                    Rn(-1), a && t.length > $ && Mg(e, t, $, !1), Rt(a ? 2 : 0, o);
                    const c = a ? i : null,
                        l = yu(c);
                    try {
                        null !== c && (c.dirty = !1), n(r, o)
                    } finally {
                        Du(c, l)
                    }
                } finally {
                    a && null === t[ho] && Eg(t, ho), Rn(s), Rt(a ? 3 : 1, o)
                }
            }

            function Fc(e, t, n) {
                if (gu(t)) {
                    const r = it(null);
                    try {
                        const i = t.directiveEnd;
                        for (let s = t.directiveStart; s < i; s++) {
                            const a = e.data[s];
                            a.contentQueries && a.contentQueries(1, n[s], s)
                        }
                    } finally {
                        it(r)
                    }
                }
            }

            function Ag(e) {
                const t = e.tView;
                return null === t || t.incompleteFirstPass ? e.tView = jc(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts, e.id) : t
            }

            function jc(e, t, n, r, o, i, s, a, u, c, l) {
                const d = $ + r,
                    f = d + o,
                    h = function IM(e, t) {
                        const n = [];
                        for (let r = 0; r < t; r++) n.push(r < e ? null : F);
                        return n
                    }(d, f),
                    p = "function" == typeof c ? c() : c;
                return h[w] = {
                    type: e,
                    blueprint: h,
                    template: n,
                    queries: null,
                    viewQuery: a,
                    declTNode: t,
                    data: h.slice().fill(null, d),
                    bindingStartIndex: d,
                    expandoStartIndex: f,
                    hostBindingOpCodes: null,
                    firstCreatePass: !0,
                    firstUpdatePass: !0,
                    staticViewQueries: !1,
                    staticContentQueries: !1,
                    preOrderHooks: null,
                    preOrderCheckHooks: null,
                    contentHooks: null,
                    contentCheckHooks: null,
                    viewHooks: null,
                    viewCheckHooks: null,
                    destroyHooks: null,
                    cleanup: null,
                    contentQueries: null,
                    components: null,
                    directiveRegistry: "function" == typeof i ? i() : i,
                    pipeRegistry: "function" == typeof s ? s() : s,
                    firstChild: null,
                    schemas: u,
                    consts: p,
                    incompleteFirstPass: !1,
                    ssrId: l
                }
            }
            let Ng = e => null;

            function Rg(e, t, n, r) {
                for (let o in e)
                    if (e.hasOwnProperty(o)) {
                        n = null === n ? {} : n;
                        const i = e[o];
                        null === r ? xg(n, t, o, i) : r.hasOwnProperty(o) && xg(n, t, r[o], i)
                    } return n
            }

            function xg(e, t, n, r) {
                e.hasOwnProperty(n) ? e[n].push(t, r) : e[n] = [t, r]
            }

            function Je(e, t, n, r, o, i, s, a) {
                const u = Ue(t, n);
                let l, c = t.inputs;
                !a && null != c && (l = c[r]) ? (Uc(e, n, l, r, o), Tn(t) && function OM(e, t) {
                    const n = Ke(t, e);
                    16 & n[k] || (n[k] |= 64)
                }(n, t.index)) : 3 & t.type && (r = function xM(e) {
                    return "class" === e ? "className" : "for" === e ? "htmlFor" : "formaction" === e ? "formAction" : "innerHtml" === e ? "innerHTML" : "readonly" === e ? "readOnly" : "tabindex" === e ? "tabIndex" : e
                }(r), o = null != s ? s(o, t.value || "", r) : o, i.setProperty(u, r, o))
            }

            function Og(e, t, n, r, o, i) {
                for (let c = 0; c < r.length; c++) ku(Ki(n, t), e, r[c].type);
                ! function HM(e, t, n) {
                    e.flags |= 1, e.directiveStart = t, e.directiveEnd = t + n, e.providerIndexes = t
                }(n, e.data.length, r.length);
                for (let c = 0; c < r.length; c++) {
                    const l = r[c];
                    l.providersResolver && l.providersResolver(l)
                }
                let s = !1,
                    a = !1,
                    u = Lo(e, t, r.length, null);
                for (let c = 0; c < r.length; c++) {
                    const l = r[c];
                    n.mergedAttrs = ao(n.mergedAttrs, l.hostAttrs), UM(e, n, t, u, l), BM(u, l, o), null !== l.contentQueries && (n.flags |= 4), (null !== l.hostBindings || null !== l.hostAttrs || 0 !== l.hostVars) && (n.flags |= 64);
                    const d = l.type.prototype;
                    !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((e.preOrderHooks ??= []).push(n.index), s = !0), !a && (d.ngOnChanges || d.ngDoCheck) && ((e.preOrderCheckHooks ??= []).push(n.index), a = !0), u++
                }! function RM(e, t, n) {
                    const o = t.directiveEnd,
                        i = e.data,
                        s = t.attrs,
                        a = [];
                    let u = null,
                        c = null;
                    for (let l = t.directiveStart; l < o; l++) {
                        const d = i[l],
                            f = n ? n.get(d) : null,
                            p = f ? f.outputs : null;
                        u = Rg(d.inputs, l, u, f ? f.inputs : null), c = Rg(d.outputs, l, c, p);
                        const g = null === u || null === s || kf(t) ? null : qM(u, l, s);
                        a.push(g)
                    }
                    null !== u && (u.hasOwnProperty("class") && (t.flags |= 8), u.hasOwnProperty("style") && (t.flags |= 16)), t.initialInputs = a, t.inputs = u, t.outputs = c
                }(e, n, i)
            }

            function Pg(e, t, n) {
                const r = n.directiveStart,
                    o = n.directiveEnd,
                    i = n.index,
                    s = function NE() {
                        return A.lFrame.currentDirectiveIndex
                    }();
                try {
                    Rn(i);
                    for (let a = r; a < o; a++) {
                        const u = e.data[a],
                            c = t[a];
                        Mu(a), (null !== u.hostBindings || 0 !== u.hostVars || null !== u.hostAttrs) && jM(u, c)
                    }
                } finally {
                    Rn(-1), Mu(s)
                }
            }

            function jM(e, t) {
                null !== e.hostBindings && e.hostBindings(1, t)
            }

            function Vc(e, t, n) {
                t.componentOffset = n, (e.components ??= []).push(t.index)
            }

            function BM(e, t, n) {
                if (n) {
                    if (t.exportAs)
                        for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
                    Dt(t) && (n[""] = e)
                }
            }

            function UM(e, t, n, r, o) {
                e.data[r] = o;
                const i = o.factory || (o.factory = An(o.type)),
                    s = new yo(i, Dt(o), M);
                e.blueprint[r] = s, n[r] = s,
                    function FM(e, t, n, r, o) {
                        const i = o.hostBindings;
                        if (i) {
                            let s = e.hostBindingOpCodes;
                            null === s && (s = e.hostBindingOpCodes = []);
                            const a = ~t.index;
                            (function kM(e) {
                                let t = e.length;
                                for (; t > 0;) {
                                    const n = e[--t];
                                    if ("number" == typeof n && n < 0) return n
                                }
                                return 0
                            })(s) != a && s.push(a), s.push(n, r, i)
                        }
                    }(e, t, r, Lo(e, n, o.hostVars, F), o)
            }

            function Pt(e, t, n, r, o, i) {
                const s = Ue(e, t);
                ! function Bc(e, t, n, r, o, i, s) {
                    if (null == i) e.removeAttribute(t, o, n);
                    else {
                        const a = null == s ? O(i) : s(i, r || "", o);
                        e.setAttribute(t, o, a, n)
                    }
                }(t[P], s, i, e.value, n, r, o)
            }

            function GM(e, t, n, r, o, i) {
                const s = i[t];
                if (null !== s)
                    for (let a = 0; a < s.length;) Fg(r, n, s[a++], s[a++], s[a++])
            }

            function Fg(e, t, n, r, o) {
                const i = it(null);
                try {
                    const s = e.inputTransforms;
                    null !== s && s.hasOwnProperty(r) && (o = s[r].call(t, o)), null !== e.setInput ? e.setInput(t, o, n, r) : t[r] = o
                } finally {
                    it(i)
                }
            }

            function qM(e, t, n) {
                let r = null,
                    o = 0;
                for (; o < n.length;) {
                    const i = n[o];
                    if (0 !== i)
                        if (5 !== i) {
                            if ("number" == typeof i) break;
                            if (e.hasOwnProperty(i)) {
                                null === r && (r = []);
                                const s = e[i];
                                for (let a = 0; a < s.length; a += 2)
                                    if (s[a] === t) {
                                        r.push(i, s[a + 1], n[o + 1]);
                                        break
                                    }
                            }
                            o += 2
                        } else o += 2;
                    else o += 4
                }
                return r
            }

            function Lg(e, t) {
                const n = e.contentQueries;
                if (null !== n)
                    for (let r = 0; r < n.length; r += 2) {
                        const i = n[r + 1];
                        if (-1 !== i) {
                            const s = e.data[i];
                            Tu(n[r]), s.contentQueries(2, t[i], i)
                        }
                    }
            }

            function ks(e, t) {
                return e[co] ? e[Hf][yt] = t : e[co] = t, e[Hf] = t, t
            }

            function Hc(e, t, n) {
                Tu(0);
                const r = it(null);
                try {
                    t(e, n)
                } finally {
                    it(r)
                }
            }

            function Bg(e, t) {
                const n = e[ln],
                    r = n ? n.get(Zt, null) : null;
                r && r.handleError(t)
            }

            function Uc(e, t, n, r, o) {
                for (let i = 0; i < n.length;) {
                    const s = n[i++],
                        a = n[i++];
                    Fg(e.data[s], t[s], r, a, o)
                }
            }

            function Yt(e, t, n) {
                const r = function Gi(e, t) {
                    return J(t[e])
                }(t, e);
                ! function gp(e, t, n) {
                    e.setValue(t, n)
                }(e[P], r, n)
            }

            function WM(e, t) {
                const n = Ke(t, e),
                    r = n[w];
                ! function ZM(e, t) {
                    for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n])
                }(r, n);
                const o = n[ae];
                null !== o && null === n[zt] && (n[zt] = Ec(o, n[ln])), zc(r, n, n[ce])
            }

            function zc(e, t, n) {
                Au(t);
                try {
                    const r = e.viewQuery;
                    null !== r && Hc(1, r, n);
                    const o = e.template;
                    null !== o && Tg(e, t, o, 1, n), e.firstCreatePass && (e.firstCreatePass = !1), e.staticContentQueries && Lg(e, t), e.staticViewQueries && Hc(2, e.viewQuery, n);
                    const i = e.components;
                    null !== i && function QM(e, t) {
                        for (let n = 0; n < t.length; n++) WM(e, t[n])
                    }(t, i)
                } catch (r) {
                    throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), r
                } finally {
                    t[k] &= -5, Nu()
                }
            }
            let Hg = (() => {
                class e {
                    constructor() {
                        this.all = new Set, this.queue = new Map
                    }
                    create(n, r, o) {
                        const i = typeof Zone > "u" ? null : Zone.current,
                            s = function oE(e, t, n) {
                                const r = Object.create(iE);
                                n && (r.consumerAllowSignalWrites = !0), r.fn = e, r.schedule = t;
                                const o = s => {
                                    r.cleanupFn = s
                                };
                                return r.ref = {
                                    notify: () => Kf(r),
                                    run: () => {
                                        if (r.dirty = !1, r.hasRun && !Xf(r)) return;
                                        r.hasRun = !0;
                                        const s = yu(r);
                                        try {
                                            r.cleanupFn(), r.cleanupFn = sh, r.fn(o)
                                        } finally {
                                            Du(r, s)
                                        }
                                    },
                                    cleanup: () => r.cleanupFn()
                                }, r.ref
                            }(n, c => {
                                this.all.has(c) && this.queue.set(c, i)
                            }, o);
                        let a;
                        this.all.add(s), s.notify();
                        const u = () => {
                            s.cleanup(), a?.(), this.all.delete(s), this.queue.delete(s)
                        };
                        return a = r?.onDestroy(u), {
                            destroy: u
                        }
                    }
                    flush() {
                        if (0 !== this.queue.size)
                            for (const [n, r] of this.queue) this.queue.delete(n), r ? r.run(() => n.run()) : n.run()
                    }
                    get isQueueEmpty() {
                        return 0 === this.queue.size
                    }
                    static #e = this.\u0275prov = S({
                        token: e,
                        providedIn: "root",
                        factory: () => new e
                    })
                }
                return e
            })();

            function Ls(e, t, n) {
                let r = n ? e.styles : null,
                    o = n ? e.classes : null,
                    i = 0;
                if (null !== t)
                    for (let s = 0; s < t.length; s++) {
                        const a = t[s];
                        "number" == typeof a ? i = a : 1 == i ? o = Xa(o, a) : 2 == i && (r = Xa(r, a + ": " + t[++s] + ";"))
                    }
                n ? e.styles = r : e.stylesWithoutHost = r, n ? e.classes = o : e.classesWithoutHost = o
            }

            function jo(e, t, n, r, o = !1) {
                for (; null !== n;) {
                    const i = t[n.index];
                    null !== i && r.push(J(i)), xe(i) && Ug(i, r);
                    const s = n.type;
                    if (8 & s) jo(e, t, n.child, r);
                    else if (32 & s) {
                        const a = Zu(n, t);
                        let u;
                        for (; u = a();) r.push(u)
                    } else if (16 & s) {
                        const a = Ip(t, n);
                        if (Array.isArray(a)) r.push(...a);
                        else {
                            const u = Mo(t[le]);
                            jo(u[w], u, a, r, !0)
                        }
                    }
                    n = o ? n.projectionNext : n.next
                }
                return r
            }

            function Ug(e, t) {
                for (let n = Ee; n < e.length; n++) {
                    const r = e[n],
                        o = r[w].firstChild;
                    null !== o && jo(r[w], r, o, t)
                }
                e[Nt] !== e[ae] && t.push(e[Nt])
            }

            function js(e, t, n, r = !0) {
                const o = t[Yn],
                    i = o.rendererFactory,
                    s = o.afterRenderEventManager;
                i.begin?.(), s?.begin();
                try {
                    zg(e, t, e.template, n)
                } catch (u) {
                    throw r && Bg(t, u), u
                } finally {
                    i.end?.(), o.effectManager?.flush(), s?.end()
                }
            }

            function zg(e, t, n, r) {
                const o = t[k];
                if (256 != (256 & o)) {
                    t[Yn].effectManager?.flush(), Au(t);
                    try {
                        hh(t),
                            function wh(e) {
                                return A.lFrame.bindingIndex = e
                            }(e.bindingStartIndex), null !== n && Tg(e, t, n, 2, r);
                        const s = 3 == (3 & o);
                        if (s) {
                            const c = e.preOrderCheckHooks;
                            null !== c && Zi(t, c, null)
                        } else {
                            const c = e.preOrderHooks;
                            null !== c && Qi(t, c, 0, null), Ru(t, 0)
                        }
                        if (function XM(e) {
                                for (let t = fp(e); null !== t; t = hp(t)) {
                                    if (!t[zf]) continue;
                                    const n = t[Jn];
                                    for (let r = 0; r < n.length; r++) {
                                        gE(n[r])
                                    }
                                }
                            }(t), Gg(t, 2), null !== e.contentQueries && Lg(e, t), s) {
                            const c = e.contentCheckHooks;
                            null !== c && Zi(t, c)
                        } else {
                            const c = e.contentHooks;
                            null !== c && Qi(t, c, 1), Ru(t, 1)
                        }! function EM(e, t) {
                            const n = e.hostBindingOpCodes;
                            if (null === n) return;
                            const r = _g(t, po);
                            try {
                                for (let o = 0; o < n.length; o++) {
                                    const i = n[o];
                                    if (i < 0) Rn(~i);
                                    else {
                                        const s = i,
                                            a = n[++o],
                                            u = n[++o];
                                        AE(a, s), r.dirty = !1;
                                        const c = yu(r);
                                        try {
                                            u(2, t[s])
                                        } finally {
                                            Du(r, c)
                                        }
                                    }
                                }
                            } finally {
                                null === t[po] && Eg(t, po), Rn(-1)
                            }
                        }(e, t);
                        const a = e.components;
                        null !== a && Wg(t, a, 0);
                        const u = e.viewQuery;
                        if (null !== u && Hc(2, u, r), s) {
                            const c = e.viewCheckHooks;
                            null !== c && Zi(t, c)
                        } else {
                            const c = e.viewHooks;
                            null !== c && Qi(t, c, 2), Ru(t, 2)
                        }!0 === e.firstUpdatePass && (e.firstUpdatePass = !1), t[k] &= -73, ph(t)
                    } finally {
                        Nu()
                    }
                }
            }

            function Gg(e, t) {
                for (let n = fp(e); null !== n; n = hp(n))
                    for (let r = Ee; r < n.length; r++) qg(n[r], t)
            }

            function JM(e, t, n) {
                qg(Ke(t, e), n)
            }

            function qg(e, t) {
                if (! function hE(e) {
                        return 128 == (128 & e[k])
                    }(e)) return;
                const n = e[w],
                    r = e[k];
                if (80 & r && 0 === t || 1024 & r || 2 === t) zg(n, e, n.template, e[ce]);
                else if (e[uo] > 0) {
                    Gg(e, 1);
                    const o = n.components;
                    null !== o && Wg(e, o, 1)
                }
            }

            function Wg(e, t, n) {
                for (let r = 0; r < t.length; r++) JM(e, t[r], n)
            }
            class $o {
                get rootNodes() {
                    const t = this._lView,
                        n = t[w];
                    return jo(n, t, n.firstChild, [])
                }
                constructor(t, n) {
                    this._lView = t, this._cdRefInjectingView = n, this._appRef = null, this._attachedToViewContainer = !1
                }
                get context() {
                    return this._lView[ce]
                }
                set context(t) {
                    this._lView[ce] = t
                }
                get destroyed() {
                    return 256 == (256 & this._lView[k])
                }
                destroy() {
                    if (this._appRef) this._appRef.detachView(this);
                    else if (this._attachedToViewContainer) {
                        const t = this._lView[re];
                        if (xe(t)) {
                            const n = t[8],
                                r = n ? n.indexOf(this) : -1;
                            r > -1 && (hs(t, r), ts(n, r))
                        }
                        this._attachedToViewContainer = !1
                    }
                    Yu(this._lView[w], this._lView)
                }
                onDestroy(t) {
                    ! function mh(e, t) {
                        if (256 == (256 & e[k])) throw new C(911, !1);
                        null === e[dn] && (e[dn] = []), e[dn].push(t)
                    }(this._lView, t)
                }
                markForCheck() {
                    ko(this._cdRefInjectingView || this._lView)
                }
                detach() {
                    this._lView[k] &= -129
                }
                reattach() {
                    this._lView[k] |= 128
                }
                detectChanges() {
                    js(this._lView[w], this._lView, this.context)
                }
                checkNoChanges() {}
                attachToViewContainerRef() {
                    if (this._appRef) throw new C(902, !1);
                    this._attachedToViewContainer = !0
                }
                detachFromAppRef() {
                    this._appRef = null,
                        function UI(e, t) {
                            To(e, t, t[P], 2, null, null)
                        }(this._lView[w], this._lView)
                }
                attachToAppRef(t) {
                    if (this._attachedToViewContainer) throw new C(902, !1);
                    this._appRef = t
                }
            }
            class e0 extends $o {
                constructor(t) {
                    super(t), this._view = t
                }
                detectChanges() {
                    const t = this._view;
                    js(t[w], t, t[ce], !1)
                }
                checkNoChanges() {}
                get context() {
                    return null
                }
            }
            class Zg extends Ns {
                constructor(t) {
                    super(), this.ngModule = t
                }
                resolveComponentFactory(t) {
                    const n = B(t);
                    return new Vo(n, this.ngModule)
                }
            }

            function Qg(e) {
                const t = [];
                for (let n in e) e.hasOwnProperty(n) && t.push({
                    propName: e[n],
                    templateName: n
                });
                return t
            }
            class n0 {
                constructor(t, n) {
                    this.injector = t, this.parentInjector = n
                }
                get(t, n, r) {
                    r = Li(r);
                    const o = this.injector.get(t, Mc, r);
                    return o !== Mc || n === Mc ? o : this.parentInjector.get(t, n, r)
                }
            }
            class Vo extends eg {
                get inputs() {
                    const t = this.componentDef,
                        n = t.inputTransforms,
                        r = Qg(t.inputs);
                    if (null !== n)
                        for (const o of r) n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
                    return r
                }
                get outputs() {
                    return Qg(this.componentDef.outputs)
                }
                constructor(t, n) {
                    super(), this.componentDef = t, this.ngModule = n, this.componentType = t.type, this.selector = function $_(e) {
                        return e.map(j_).join(",")
                    }(t.selectors), this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [], this.isBoundToModule = !!n
                }
                create(t, n, r, o) {
                    let i = (o = o || this.ngModule) instanceof at ? o : o?.injector;
                    i && null !== this.componentDef.getStandaloneInjector && (i = this.componentDef.getStandaloneInjector(i) || i);
                    const s = i ? new n0(t, i) : t,
                        a = s.get(ng, null);
                    if (null === a) throw new C(407, !1);
                    const d = {
                            rendererFactory: a,
                            sanitizer: s.get(Xb, null),
                            effectManager: s.get(Hg, null),
                            afterRenderEventManager: s.get(Oc, null)
                        },
                        f = a.createRenderer(null, this.componentDef),
                        h = this.componentDef.selectors[0][0] || "div",
                        p = r ? function bM(e, t, n, r) {
                            const i = r.get(yg, !1) || n === mt.ShadowDom,
                                s = e.selectRootElement(t, i);
                            return function MM(e) {
                                Ng(e)
                            }(s), s
                        }(f, r, this.componentDef.encapsulation, s) : fs(f, h, function t0(e) {
                            const t = e.toLowerCase();
                            return "svg" === t ? "svg" : "math" === t ? "math" : null
                        }(h)),
                        D = this.componentDef.signals ? 4608 : this.componentDef.onPush ? 576 : 528;
                    let m = null;
                    null !== p && (m = Ec(p, s, !0));
                    const E = jc(0, null, null, 1, 0, null, null, null, null, null, null),
                        N = Fs(null, E, null, D, null, null, d, f, s, null, m);
                    let V, We;
                    Au(N);
                    try {
                        const on = this.componentDef;
                        let Jr, qd = null;
                        on.findHostDirectiveDefs ? (Jr = [], qd = new Map, on.findHostDirectiveDefs(on, Jr, qd), Jr.push(on)) : Jr = [on];
                        const LF = function o0(e, t) {
                                const n = e[w],
                                    r = $;
                                return e[r] = t, br(n, r, 2, "#host", null)
                            }(N, p),
                            jF = function s0(e, t, n, r, o, i, s) {
                                const a = o[w];
                                ! function a0(e, t, n, r) {
                                    for (const o of e) t.mergedAttrs = ao(t.mergedAttrs, o.hostAttrs);
                                    null !== t.mergedAttrs && (Ls(t, t.mergedAttrs, !0), null !== n && Tp(r, n, t))
                                }(r, e, t, s);
                                let u = null;
                                null !== t && (u = Ec(t, o[ln]));
                                const c = i.rendererFactory.createRenderer(t, n);
                                let l = 16;
                                n.signals ? l = 4096 : n.onPush && (l = 64);
                                const d = Fs(o, Ag(n), null, l, o[e.index], e, i, c, null, null, u);
                                return a.firstCreatePass && Vc(a, e, r.length - 1), ks(o, d), o[e.index] = d
                            }(LF, p, on, Jr, N, d, f);
                        We = fh(E, $), p && function c0(e, t, n, r) {
                            if (r) hu(e, n, ["ng-version", Jb.full]);
                            else {
                                const {
                                    attrs: o,
                                    classes: i
                                } = function V_(e) {
                                    const t = [],
                                        n = [];
                                    let r = 1,
                                        o = 2;
                                    for (; r < e.length;) {
                                        let i = e[r];
                                        if ("string" == typeof i) 2 === o ? "" !== i && t.push(i, e[++r]) : 8 === o && n.push(i);
                                        else {
                                            if (!vt(o)) break;
                                            o = i
                                        }
                                        r++
                                    }
                                    return {
                                        attrs: t,
                                        classes: n
                                    }
                                }(t.selectors[0]);
                                o && hu(e, n, o), i && i.length > 0 && Sp(e, n, i.join(" "))
                            }
                        }(f, on, p, r), void 0 !== n && function l0(e, t, n) {
                            const r = e.projection = [];
                            for (let o = 0; o < t.length; o++) {
                                const i = n[o];
                                r.push(null != i ? Array.from(i) : null)
                            }
                        }(We, this.ngContentSelectors, n), V = function u0(e, t, n, r, o, i) {
                            const s = be(),
                                a = o[w],
                                u = Ue(s, o);
                            Og(a, o, s, n, null, r);
                            for (let l = 0; l < n.length; l++) Se(xn(o, a, s.directiveStart + l, s), o);
                            Pg(a, o, s), u && Se(u, o);
                            const c = xn(o, a, s.directiveStart + s.componentOffset, s);
                            if (e[ce] = o[ce] = c, null !== i)
                                for (const l of i) l(c, t);
                            return Fc(a, s, e), c
                        }(jF, on, Jr, qd, N, [d0]), zc(E, N, null)
                    } finally {
                        Nu()
                    }
                    return new r0(this.componentType, V, _r(We, N), N, We)
                }
            }
            class r0 extends qb {
                constructor(t, n, r, o, i) {
                    super(), this.location = r, this._rootLView = o, this._tNode = i, this.previousInputValues = null, this.instance = n, this.hostView = this.changeDetectorRef = new e0(o), this.componentType = t
                }
                setInput(t, n) {
                    const r = this._tNode.inputs;
                    let o;
                    if (null !== r && (o = r[t])) {
                        if (this.previousInputValues ??= new Map, this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n)) return;
                        const i = this._rootLView;
                        Uc(i[w], i, o, t, n), this.previousInputValues.set(t, n), ko(Ke(this._tNode.index, i))
                    }
                }
                get injector() {
                    return new Fe(this._tNode, this._rootLView)
                }
                destroy() {
                    this.hostView.destroy()
                }
                onDestroy(t) {
                    this.hostView.onDestroy(t)
                }
            }

            function d0() {
                const e = be();
                Wi(v()[w], e)
            }

            function tm(e) {
                const t = e.inputConfig,
                    n = {};
                for (const r in t)
                    if (t.hasOwnProperty(r)) {
                        const o = t[r];
                        Array.isArray(o) && o[2] && (n[r] = o[2])
                    } e.inputTransforms = n
            }

            function Te(e, t, n) {
                return !Object.is(e[t], n) && (e[t] = n, !0)
            }

            function qc(e, t, n, r) {
                const o = v();
                return Te(o, rr(), t) && (H(), Pt(ie(), o, e, t, n, r)), qc
            }

            function Sr(e, t, n, r) {
                return Te(e, rr(), n) ? t + O(n) + r : F
            }

            function Go(e, t, n) {
                const r = v();
                return Te(r, rr(), t) && Je(H(), ie(), r, e, t, r[P], n, !1), Go
            }

            function Xc(e, t, n, r, o) {
                const s = o ? "class" : "style";
                Uc(e, n, t.inputs[s], s, r)
            }

            function se(e, t, n, r) {
                const o = v(),
                    i = H(),
                    s = $ + e,
                    a = o[P],
                    u = i.firstCreatePass ? function q0(e, t, n, r, o, i) {
                        const s = t.consts,
                            u = br(t, e, 2, r, hn(s, o));
                        return function $c(e, t, n, r) {
                            if (yh()) {
                                const o = null === r ? null : {
                                        "": -1
                                    },
                                    i = function $M(e, t) {
                                        const n = e.directiveRegistry;
                                        let r = null,
                                            o = null;
                                        if (n)
                                            for (let i = 0; i < n.length; i++) {
                                                const s = n[i];
                                                if (Lf(t, s.selectors, !1))
                                                    if (r || (r = []), Dt(s))
                                                        if (null !== s.findHostDirectiveDefs) {
                                                            const a = [];
                                                            o = o || new Map, s.findHostDirectiveDefs(s, a, o), r.unshift(...a, s), Vc(e, t, a.length)
                                                        } else r.unshift(s), Vc(e, t, 0);
                                                else o = o || new Map, s.findHostDirectiveDefs?.(s, r, o), r.push(s)
                                            }
                                        return null === r ? null : [r, o]
                                    }(e, n);
                                let s, a;
                                null === i ? s = a = null : [s, a] = i, null !== s && Og(e, t, n, s, o, a), o && function VM(e, t, n) {
                                    if (t) {
                                        const r = e.localNames = [];
                                        for (let o = 0; o < t.length; o += 2) {
                                            const i = n[t[o + 1]];
                                            if (null == i) throw new C(-301, !1);
                                            r.push(t[o], i)
                                        }
                                    }
                                }(n, r, o)
                            }
                            n.mergedAttrs = ao(n.mergedAttrs, n.attrs)
                        }(t, n, u, hn(s, i)), null !== u.attrs && Ls(u, u.attrs, !1), null !== u.mergedAttrs && Ls(u, u.mergedAttrs, !0), null !== t.queries && t.queries.elementStart(t, u), u
                    }(s, i, o, t, n, r) : i.data[s],
                    c = mm(i, o, u, a, t, e);
                o[s] = c;
                const l = Hi(u);
                return xt(u, !0), Tp(a, c, u), 32 != (32 & u.flags) && qi() && gs(i, o, c, u), 0 === function vE() {
                        return A.lFrame.elementDepthCount
                    }() && Se(c, o),
                    function yE() {
                        A.lFrame.elementDepthCount++
                    }(), l && (function kc(e, t, n) {
                        yh() && (function LM(e, t, n, r) {
                            const o = n.directiveStart,
                                i = n.directiveEnd;
                            Tn(n) && function zM(e, t, n) {
                                const r = Ue(t, e),
                                    o = Ag(n);
                                let s = 16;
                                n.signals ? s = 4096 : n.onPush && (s = 64);
                                const a = ks(e, Fs(e, o, null, s, r, t, null, e[Yn].rendererFactory.createRenderer(r, n), null, null, null));
                                e[t.index] = a
                            }(t, n, e.data[o + n.componentOffset]), e.firstCreatePass || Ki(n, t), Se(r, t);
                            const s = n.initialInputs;
                            for (let a = o; a < i; a++) {
                                const u = e.data[a],
                                    c = xn(t, e, a, n);
                                Se(c, t), null !== s && GM(0, a - o, c, u, 0, s), Dt(u) && (Ke(n.index, t)[ce] = xn(t, e, a, n))
                            }
                        }(e, t, n, Ue(n, t)), 64 == (64 & n.flags) && Pg(e, t, n))
                    }(i, o, u), Fc(i, u, o)), null !== r && function Lc(e, t, n = Ue) {
                        const r = t.localNames;
                        if (null !== r) {
                            let o = t.index + 1;
                            for (let i = 0; i < r.length; i += 2) {
                                const s = r[i + 1],
                                    a = -1 === s ? n(t, e) : e[s];
                                e[o++] = a
                            }
                        }
                    }(o, u), se
            }

            function oe() {
                let e = be();
                Iu() ? function bu() {
                    A.lFrame.isParent = !1
                }() : (e = e.parent, xt(e, !1));
                const t = e;
                (function CE(e) {
                    return A.skipHydrationRootTNode === e
                })(t) && function IE() {
                    A.skipHydrationRootTNode = null
                }(),
                function DE() {
                    A.lFrame.elementDepthCount--
                }();
                const n = H();
                return n.firstCreatePass && (Wi(n, e), gu(e) && n.queries.elementEnd(e)), null != t.classesWithoutHost && function BE(e) {
                    return 0 != (8 & e.flags)
                }(t) && Xc(n, t, v(), t.classesWithoutHost, !0), null != t.stylesWithoutHost && function HE(e) {
                    return 0 != (16 & e.flags)
                }(t) && Xc(n, t, v(), t.stylesWithoutHost, !1), oe
            }

            function De(e, t, n, r) {
                return se(e, t, n, r), oe(), De
            }
            let mm = (e, t, n, r, o, i) => (pn(!0), fs(r, o, function Ah() {
                return A.lFrame.currentNamespace
            }()));

            function Gs(e) {
                return !!e && "function" == typeof e.then
            }

            function Dm(e) {
                return !!e && "function" == typeof e.subscribe
            }

            function tl(e, t, n, r) {
                const o = v(),
                    i = H(),
                    s = be();
                return function wm(e, t, n, r, o, i, s) {
                    const a = Hi(r),
                        c = e.firstCreatePass && function $g(e) {
                            return e.cleanup || (e.cleanup = [])
                        }(e),
                        l = t[ce],
                        d = function jg(e) {
                            return e[Qn] || (e[Qn] = [])
                        }(t);
                    let f = !0;
                    if (3 & r.type || s) {
                        const g = Ue(r, t),
                            y = s ? s(g) : g,
                            D = d.length,
                            m = s ? N => s(J(N[r.index])) : r.index;
                        let E = null;
                        if (!s && a && (E = function J0(e, t, n, r) {
                                const o = e.cleanup;
                                if (null != o)
                                    for (let i = 0; i < o.length - 1; i += 2) {
                                        const s = o[i];
                                        if (s === n && o[i + 1] === r) {
                                            const a = t[Qn],
                                                u = o[i + 2];
                                            return a.length > u ? a[u] : null
                                        }
                                        "string" == typeof s && (i += 2)
                                    }
                                return null
                            }(e, t, o, r.index)), null !== E)(E.__ngLastListenerFn__ || E).__ngNextListenerFn__ = i, E.__ngLastListenerFn__ = i, f = !1;
                        else {
                            i = Em(r, t, l, i, !1);
                            const N = n.listen(y, o, i);
                            d.push(i, N), c && c.push(o, m, D, D + 1)
                        }
                    } else i = Em(r, t, l, i, !1);
                    const h = r.outputs;
                    let p;
                    if (f && null !== h && (p = h[o])) {
                        const g = p.length;
                        if (g)
                            for (let y = 0; y < g; y += 2) {
                                const V = t[p[y]][p[y + 1]].subscribe(i),
                                    We = d.length;
                                d.push(i, V), c && c.push(o, r.index, We, -(We + 1))
                            }
                    }
                }(i, o, o[P], s, e, t, r), tl
            }

            function _m(e, t, n, r) {
                try {
                    return Rt(6, t, n), !1 !== n(r)
                } catch (o) {
                    return Bg(e, o), !1
                } finally {
                    Rt(7, t, n)
                }
            }

            function Em(e, t, n, r, o) {
                return function i(s) {
                    if (s === Function) return r;
                    ko(e.componentOffset > -1 ? Ke(e.index, t) : t);
                    let u = _m(t, n, r, s),
                        c = i.__ngNextListenerFn__;
                    for (; c;) u = _m(t, n, c, s) && u, c = c.__ngNextListenerFn__;
                    return o && !1 === u && s.preventDefault(), u
                }
            }

            function qo(e, t, n) {
                return nl(e, "", t, "", n), qo
            }

            function nl(e, t, n, r, o) {
                const i = v(),
                    s = Sr(i, t, n, r);
                return s !== F && Je(H(), ie(), i, e, s, i[P], o, !1), nl
            }

            function et(e, t = "") {
                const n = v(),
                    r = H(),
                    o = e + $,
                    i = r.firstCreatePass ? br(r, o, 1, t, null) : r.data[o],
                    s = Wm(r, n, i, t, e);
                n[o] = s, qi() && gs(r, n, s, i), xt(i, !1)
            }
            let Wm = (e, t, n, r, o) => (pn(!0), function ds(e, t) {
                return e.createText(t)
            }(t[P], r));

            function Zo(e) {
                return Qo("", e, ""), Zo
            }

            function Qo(e, t, n) {
                const r = v(),
                    o = Sr(r, e, t, n);
                return o !== F && Yt(r, Pe(), o), Qo
            }
            const Lr = "en-US";
            let gv = Lr;
            class jn {}
            class Bv {}
            class hl extends jn {
                constructor(t, n, r) {
                    super(), this._parent = n, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new Zg(this);
                    const o = Ye(t);
                    this._bootstrapComponents = Qt(o.bootstrap), this._r3Injector = ag(t, n, [{
                        provide: jn,
                        useValue: this
                    }, {
                        provide: Ns,
                        useValue: this.componentFactoryResolver
                    }, ...r], me(t), new Set(["environment"])), this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(t)
                }
                get injector() {
                    return this._r3Injector
                }
                destroy() {
                    const t = this._r3Injector;
                    !t.destroyed && t.destroy(), this.destroyCbs.forEach(n => n()), this.destroyCbs = null
                }
                onDestroy(t) {
                    this.destroyCbs.push(t)
                }
            }
            class pl extends Bv {
                constructor(t) {
                    super(), this.moduleType = t
                }
                create(t) {
                    return new hl(this.moduleType, t, [])
                }
            }
            class Hv extends jn {
                constructor(t) {
                    super(), this.componentFactoryResolver = new Zg(this), this.instance = null;
                    const n = new Es([...t.providers, {
                        provide: jn,
                        useValue: this
                    }, {
                        provide: Ns,
                        useValue: this.componentFactoryResolver
                    }], t.parent || _s(), t.debugName, new Set(["environment"]));
                    this.injector = n, t.runEnvironmentInitializers && n.resolveInjectorInitializers()
                }
                destroy() {
                    this.injector.destroy()
                }
                onDestroy(t) {
                    this.injector.onDestroy(t)
                }
            }

            function gl(e, t, n = null) {
                return new Hv({
                    providers: e,
                    parent: t,
                    debugName: n,
                    runEnvironmentInitializers: !0
                }).injector
            }
            let YT = (() => {
                class e {
                    constructor(n) {
                        this._injector = n, this.cachedInjectors = new Map
                    }
                    getOrCreateStandaloneInjector(n) {
                        if (!n.standalone) return null;
                        if (!this.cachedInjectors.has(n)) {
                            const r = zp(0, n.type),
                                o = r.length > 0 ? gl([r], this._injector, `Standalone[${n.type.name}]`) : null;
                            this.cachedInjectors.set(n, o)
                        }
                        return this.cachedInjectors.get(n)
                    }
                    ngOnDestroy() {
                        try {
                            for (const n of this.cachedInjectors.values()) null !== n && n.destroy()
                        } finally {
                            this.cachedInjectors.clear()
                        }
                    }
                    static #e = this.\u0275prov = S({
                        token: e,
                        providedIn: "environment",
                        factory: () => new e(b(at))
                    })
                }
                return e
            })();

            function Uv(e) {
                e.getStandaloneInjector = t => t.get(YT).getOrCreateStandaloneInjector(e)
            }

            function Xs(e, t, n, r) {
                return function Yv(e, t, n, r, o, i) {
                    const s = t + n;
                    return Te(e, s, o) ? function Ft(e, t, n) {
                        return e[t] = n
                    }(e, s + 1, i ? r.call(i, o) : r(o)) : function ti(e, t) {
                        const n = e[t];
                        return n === F ? void 0 : n
                    }(e, s + 1)
                }(v(), function Oe() {
                    const e = A.lFrame;
                    let t = e.bindingRootIndex;
                    return -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t
                }(), e, t, n, r)
            }

            function EA(e, t, n, r = !0) {
                const o = t[w];
                if (function GI(e, t, n, r) {
                        const o = Ee + r,
                            i = n.length;
                        r > 0 && (n[o - 1][yt] = t), r < i - Ee ? (t[yt] = n[o], Gh(n, Ee + r, t)) : (n.push(t), t[yt] = null), t[re] = n;
                        const s = t[lo];
                        null !== s && n !== s && function qI(e, t) {
                            const n = e[Jn];
                            t[le] !== t[re][re][le] && (e[zf] = !0), null === n ? e[Jn] = [t] : n.push(t)
                        }(s, t);
                        const a = t[At];
                        null !== a && a.insertView(e), t[k] |= 128
                    }(o, t, e, n), r) {
                    const i = ec(n, e),
                        s = t[P],
                        a = ps(s, e[Nt]);
                    null !== a && function HI(e, t, n, r, o, i) {
                        r[ae] = o, r[Me] = t, To(e, r, n, 1, o, i)
                    }(o, e[Me], s, t, a, i)
                }
            }
            Symbol;
            let _t = (() => {
                class e {
                    static #e = this.__NG_ELEMENT_ID__ = xA
                }
                return e
            })();

            function xA() {
                return function ay(e, t) {
                    let n;
                    const r = t[e.index];
                    return xe(r) ? n = r : (n = function kg(e, t, n, r) {
                        return [e, !0, !1, t, null, 0, r, n, null, null, null]
                    }(r, t, null, e), t[e.index] = n, ks(t, n)), uy(n, t, e, r), new iy(n, e, t)
                }(be(), v())
            }
            const OA = _t,
                iy = class extends OA {
                    constructor(t, n, r) {
                        super(), this._lContainer = t, this._hostTNode = n, this._hostLView = r
                    }
                    get element() {
                        return _r(this._hostTNode, this._hostLView)
                    }
                    get injector() {
                        return new Fe(this._hostTNode, this._hostLView)
                    }
                    get parentInjector() {
                        const t = Xi(this._hostTNode, this._hostLView);
                        if (Ou(t)) {
                            const n = Co(t, this._hostLView),
                                r = Do(t);
                            return new Fe(n[w].data[r + 8], n)
                        }
                        return new Fe(null, this._hostLView)
                    }
                    clear() {
                        for (; this.length > 0;) this.remove(this.length - 1)
                    }
                    get(t) {
                        const n = sy(this._lContainer);
                        return null !== n && n[t] || null
                    }
                    get length() {
                        return this._lContainer.length - Ee
                    }
                    createEmbeddedView(t, n, r) {
                        let o, i;
                        "number" == typeof r ? o = r : null != r && (o = r.index, i = r.injector);
                        const a = t.createEmbeddedViewImpl(n || {}, i, null);
                        return this.insertImpl(a, o, false), a
                    }
                    createComponent(t, n, r, o, i) {
                        const s = t && ! function _o(e) {
                            return "function" == typeof e
                        }(t);
                        let a;
                        if (s) a = n;
                        else {
                            const g = n || {};
                            a = g.index, r = g.injector, o = g.projectableNodes, i = g.environmentInjector || g.ngModuleRef
                        }
                        const u = s ? t : new Vo(B(t)),
                            c = r || this.parentInjector;
                        if (!i && null == u.ngModule) {
                            const y = (s ? c : this.parentInjector).get(at, null);
                            y && (i = y)
                        }
                        B(u.componentType ?? {});
                        const h = u.create(c, o, null, i);
                        return this.insertImpl(h.hostView, a, false), h
                    }
                    insert(t, n) {
                        return this.insertImpl(t, n, !1)
                    }
                    insertImpl(t, n, r) {
                        const o = t._lView;
                        if (function pE(e) {
                                return xe(e[re])
                            }(o)) {
                            const u = this.indexOf(t);
                            if (-1 !== u) this.detach(u);
                            else {
                                const c = o[re],
                                    l = new iy(c, c[Me], c[re]);
                                l.detach(l.indexOf(t))
                            }
                        }
                        const s = this._adjustIndex(n),
                            a = this._lContainer;
                        return EA(a, o, s, !r), t.attachToViewContainerRef(), Gh(yl(a), s, t), t
                    }
                    move(t, n) {
                        return this.insert(t, n)
                    }
                    indexOf(t) {
                        const n = sy(this._lContainer);
                        return null !== n ? n.indexOf(t) : -1
                    }
                    remove(t) {
                        const n = this._adjustIndex(t, -1),
                            r = hs(this._lContainer, n);
                        r && (ts(yl(this._lContainer), n), Yu(r[w], r))
                    }
                    detach(t) {
                        const n = this._adjustIndex(t, -1),
                            r = hs(this._lContainer, n);
                        return r && null != ts(yl(this._lContainer), n) ? new $o(r) : null
                    }
                    _adjustIndex(t, n = 0) {
                        return t ?? this.length + n
                    }
                };

            function sy(e) {
                return e[8]
            }

            function yl(e) {
                return e[8] || (e[8] = [])
            }
            let uy = function cy(e, t, n, r) {
                if (e[Nt]) return;
                let o;
                o = 8 & n.type ? J(r) : function PA(e, t) {
                    const n = e[P],
                        r = n.createComment(""),
                        o = Ue(t, e);
                    return On(n, ps(n, o), r, function YI(e, t) {
                        return e.nextSibling(t)
                    }(n, o), !1), r
                }(t, n), e[Nt] = o
            };
            const Al = new I("Application Initializer");
            let Nl = (() => {
                    class e {
                        constructor() {
                            this.initialized = !1, this.done = !1, this.donePromise = new Promise((n, r) => {
                                this.resolve = n, this.reject = r
                            }), this.appInits = _(Al, {
                                optional: !0
                            }) ?? []
                        }
                        runInitializers() {
                            if (this.initialized) return;
                            const n = [];
                            for (const o of this.appInits) {
                                const i = o();
                                if (Gs(i)) n.push(i);
                                else if (Dm(i)) {
                                    const s = new Promise((a, u) => {
                                        i.subscribe({
                                            complete: a,
                                            error: u
                                        })
                                    });
                                    n.push(s)
                                }
                            }
                            const r = () => {
                                this.done = !0, this.resolve()
                            };
                            Promise.all(n).then(() => {
                                r()
                            }).catch(o => {
                                this.reject(o)
                            }), 0 === n.length && r(), this.initialized = !0
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = S({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                Py = (() => {
                    class e {
                        log(n) {
                            console.log(n)
                        }
                        warn(n) {
                            console.warn(n)
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = S({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "platform"
                        })
                    }
                    return e
                })();
            const Xt = new I("LocaleId", {
                providedIn: "root",
                factory: () => _(Xt, j.Optional | j.SkipSelf) || function dN() {
                    return typeof $localize < "u" && $localize.locale || Lr
                }()
            });
            let Fy = (() => {
                class e {
                    constructor() {
                        this.taskId = 0, this.pendingTasks = new Set, this.hasPendingTasks = new rt(!1)
                    }
                    add() {
                        this.hasPendingTasks.next(!0);
                        const n = this.taskId++;
                        return this.pendingTasks.add(n), n
                    }
                    remove(n) {
                        this.pendingTasks.delete(n), 0 === this.pendingTasks.size && this.hasPendingTasks.next(!1)
                    }
                    ngOnDestroy() {
                        this.pendingTasks.clear(), this.hasPendingTasks.next(!1)
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            class pN {
                constructor(t, n) {
                    this.ngModuleFactory = t, this.componentFactories = n
                }
            }
            let ky = (() => {
                class e {
                    compileModuleSync(n) {
                        return new pl(n)
                    }
                    compileModuleAsync(n) {
                        return Promise.resolve(this.compileModuleSync(n))
                    }
                    compileModuleAndAllComponentsSync(n) {
                        const r = this.compileModuleSync(n),
                            i = Qt(Ye(n).declarations).reduce((s, a) => {
                                const u = B(a);
                                return u && s.push(new Vo(u)), s
                            }, []);
                        return new pN(r, i)
                    }
                    compileModuleAndAllComponentsAsync(n) {
                        return Promise.resolve(this.compileModuleAndAllComponentsSync(n))
                    }
                    clearCache() {}
                    clearCacheFor(n) {}
                    getModuleId(n) {}
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            const Vy = new I(""),
                ra = new I("");
            let Fl, Ol = (() => {
                    class e {
                        constructor(n, r, o) {
                            this._ngZone = n, this.registry = r, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, Fl || (function PN(e) {
                                Fl = e
                            }(o), o.addToWindow(r)), this._watchAngularEvents(), n.run(() => {
                                this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
                            })
                        }
                        _watchAngularEvents() {
                            this._ngZone.onUnstable.subscribe({
                                next: () => {
                                    this._didWork = !0, this._isZoneStable = !1
                                }
                            }), this._ngZone.runOutsideAngular(() => {
                                this._ngZone.onStable.subscribe({
                                    next: () => {
                                        ee.assertNotInAngularZone(), queueMicrotask(() => {
                                            this._isZoneStable = !0, this._runCallbacksIfReady()
                                        })
                                    }
                                })
                            })
                        }
                        increasePendingRequestCount() {
                            return this._pendingCount += 1, this._didWork = !0, this._pendingCount
                        }
                        decreasePendingRequestCount() {
                            if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                            return this._runCallbacksIfReady(), this._pendingCount
                        }
                        isStable() {
                            return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                        }
                        _runCallbacksIfReady() {
                            if (this.isStable()) queueMicrotask(() => {
                                for (; 0 !== this._callbacks.length;) {
                                    let n = this._callbacks.pop();
                                    clearTimeout(n.timeoutId), n.doneCb(this._didWork)
                                }
                                this._didWork = !1
                            });
                            else {
                                let n = this.getPendingTasks();
                                this._callbacks = this._callbacks.filter(r => !r.updateCb || !r.updateCb(n) || (clearTimeout(r.timeoutId), !1)), this._didWork = !0
                            }
                        }
                        getPendingTasks() {
                            return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(n => ({
                                source: n.source,
                                creationLocation: n.creationLocation,
                                data: n.data
                            })) : []
                        }
                        addCallback(n, r, o) {
                            let i = -1;
                            r && r > 0 && (i = setTimeout(() => {
                                this._callbacks = this._callbacks.filter(s => s.timeoutId !== i), n(this._didWork, this.getPendingTasks())
                            }, r)), this._callbacks.push({
                                doneCb: n,
                                timeoutId: i,
                                updateCb: o
                            })
                        }
                        whenStable(n, r, o) {
                            if (o && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                            this.addCallback(n, r, o), this._runCallbacksIfReady()
                        }
                        getPendingRequestCount() {
                            return this._pendingCount
                        }
                        registerApplication(n) {
                            this.registry.registerApplication(n, this)
                        }
                        unregisterApplication(n) {
                            this.registry.unregisterApplication(n)
                        }
                        findProviders(n, r, o) {
                            return []
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(b(ee), b(Pl), b(ra))
                        };
                        static #t = this.\u0275prov = S({
                            token: e,
                            factory: e.\u0275fac
                        })
                    }
                    return e
                })(),
                Pl = (() => {
                    class e {
                        constructor() {
                            this._applications = new Map
                        }
                        registerApplication(n, r) {
                            this._applications.set(n, r)
                        }
                        unregisterApplication(n) {
                            this._applications.delete(n)
                        }
                        unregisterAllApplications() {
                            this._applications.clear()
                        }
                        getTestability(n) {
                            return this._applications.get(n) || null
                        }
                        getAllTestabilities() {
                            return Array.from(this._applications.values())
                        }
                        getAllRootElements() {
                            return Array.from(this._applications.keys())
                        }
                        findTestabilityInTree(n, r = !0) {
                            return Fl?.findTestabilityInTree(this, n, r) ?? null
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = S({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "platform"
                        })
                    }
                    return e
                })(),
                Dn = null;
            const By = new I("AllowMultipleToken"),
                kl = new I("PlatformDestroyListeners"),
                Ll = new I("appBootstrapListener");
            class Uy {
                constructor(t, n) {
                    this.name = t, this.token = n
                }
            }

            function Gy(e, t, n = []) {
                const r = `Platform: ${t}`,
                    o = new I(r);
                return (i = []) => {
                    let s = jl();
                    if (!s || s.injector.get(By, !1)) {
                        const a = [...n, ...i, {
                            provide: o,
                            useValue: !0
                        }];
                        e ? e(a) : function LN(e) {
                            if (Dn && !Dn.get(By, !1)) throw new C(400, !1);
                            (function Hy() {
                                ! function J_(e) {
                                    nh = e
                                }(() => {
                                    throw new C(600, !1)
                                })
                            })(), Dn = e;
                            const t = e.get(Wy);
                            (function zy(e) {
                                e.get(Qp, null)?.forEach(n => n())
                            })(e)
                        }(function qy(e = [], t) {
                            return ut.create({
                                name: t,
                                providers: [{
                                    provide: fc,
                                    useValue: "platform"
                                }, {
                                    provide: kl,
                                    useValue: new Set([() => Dn = null])
                                }, ...e]
                            })
                        }(a, r))
                    }
                    return function $N(e) {
                        const t = jl();
                        if (!t) throw new C(401, !1);
                        return t
                    }()
                }
            }

            function jl() {
                return Dn?.get(Wy) ?? null
            }
            let Wy = (() => {
                class e {
                    constructor(n) {
                        this._injector = n, this._modules = [], this._destroyListeners = [], this._destroyed = !1
                    }
                    bootstrapModuleFactory(n, r) {
                        const o = function VN(e = "zone.js", t) {
                            return "noop" === e ? new dM : "zone.js" === e ? new ee(t) : e
                        }(r?.ngZone, function Zy(e) {
                            return {
                                enableLongStackTrace: !1,
                                shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                                shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1
                            }
                        }({
                            eventCoalescing: r?.ngZoneEventCoalescing,
                            runCoalescing: r?.ngZoneRunCoalescing
                        }));
                        return o.run(() => {
                            const i = function QT(e, t, n) {
                                    return new hl(e, t, n)
                                }(n.moduleType, this.injector, function Jy(e) {
                                    return [{
                                        provide: ee,
                                        useFactory: e
                                    }, {
                                        provide: Oo,
                                        multi: !0,
                                        useFactory: () => {
                                            const t = _(HN, {
                                                optional: !0
                                            });
                                            return () => t.initialize()
                                        }
                                    }, {
                                        provide: Xy,
                                        useFactory: BN
                                    }, {
                                        provide: fg,
                                        useFactory: hg
                                    }]
                                }(() => o)),
                                s = i.injector.get(Zt, null);
                            return o.runOutsideAngular(() => {
                                    const a = o.onError.subscribe({
                                        next: u => {
                                            s.handleError(u)
                                        }
                                    });
                                    i.onDestroy(() => {
                                        oa(this._modules, i), a.unsubscribe()
                                    })
                                }),
                                function Qy(e, t, n) {
                                    try {
                                        const r = n();
                                        return Gs(r) ? r.catch(o => {
                                            throw t.runOutsideAngular(() => e.handleError(o)), o
                                        }) : r
                                    } catch (r) {
                                        throw t.runOutsideAngular(() => e.handleError(r)), r
                                    }
                                }(s, o, () => {
                                    const a = i.injector.get(Nl);
                                    return a.runInitializers(), a.donePromise.then(() => (function mv(e) {
                                        ot(e, "Expected localeId to be defined"), "string" == typeof e && (gv = e.toLowerCase().replace(/_/g, "-"))
                                    }(i.injector.get(Xt, Lr) || Lr), this._moduleDoBootstrap(i), i))
                                })
                        })
                    }
                    bootstrapModule(n, r = []) {
                        const o = Yy({}, r);
                        return function FN(e, t, n) {
                            const r = new pl(n);
                            return Promise.resolve(r)
                        }(0, 0, n).then(i => this.bootstrapModuleFactory(i, o))
                    }
                    _moduleDoBootstrap(n) {
                        const r = n.injector.get(Vr);
                        if (n._bootstrapComponents.length > 0) n._bootstrapComponents.forEach(o => r.bootstrap(o));
                        else {
                            if (!n.instance.ngDoBootstrap) throw new C(-403, !1);
                            n.instance.ngDoBootstrap(r)
                        }
                        this._modules.push(n)
                    }
                    onDestroy(n) {
                        this._destroyListeners.push(n)
                    }
                    get injector() {
                        return this._injector
                    }
                    destroy() {
                        if (this._destroyed) throw new C(404, !1);
                        this._modules.slice().forEach(r => r.destroy()), this._destroyListeners.forEach(r => r());
                        const n = this._injector.get(kl, null);
                        n && (n.forEach(r => r()), n.clear()), this._destroyed = !0
                    }
                    get destroyed() {
                        return this._destroyed
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(b(ut))
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "platform"
                    })
                }
                return e
            })();

            function Yy(e, t) {
                return Array.isArray(t) ? t.reduce(Yy, e) : {
                    ...e,
                    ...t
                }
            }
            let Vr = (() => {
                class e {
                    constructor() {
                        this._bootstrapListeners = [], this._runningTick = !1, this._destroyed = !1, this._destroyListeners = [], this._views = [], this.internalErrorHandler = _(Xy), this.zoneIsStable = _(fg), this.componentTypes = [], this.components = [], this.isStable = _(Fy).hasPendingTasks.pipe(St(n => n ? x(!1) : this.zoneIsStable), function l_(e, t = sn) {
                            return e = e ?? d_, pe((n, r) => {
                                let o, i = !0;
                                n.subscribe(ge(r, s => {
                                    const a = t(s);
                                    (i || !e(o, a)) && (i = !1, o = a, r.next(s))
                                }))
                            })
                        }(), Cf()), this._injector = _(at)
                    }
                    get destroyed() {
                        return this._destroyed
                    }
                    get injector() {
                        return this._injector
                    }
                    bootstrap(n, r) {
                        const o = n instanceof eg;
                        if (!this._injector.get(Nl).done) throw !o && function Zn(e) {
                            const t = B(e) || _e(e) || Re(e);
                            return null !== t && t.standalone
                        }(n), new C(405, !1);
                        let s;
                        s = o ? n : this._injector.get(Ns).resolveComponentFactory(n), this.componentTypes.push(s.componentType);
                        const a = function kN(e) {
                                return e.isBoundToModule
                            }(s) ? void 0 : this._injector.get(jn),
                            c = s.create(ut.NULL, [], r || s.selector, a),
                            l = c.location.nativeElement,
                            d = c.injector.get(Vy, null);
                        return d?.registerApplication(l), c.onDestroy(() => {
                            this.detachView(c.hostView), oa(this.components, c), d?.unregisterApplication(l)
                        }), this._loadComponent(c), c
                    }
                    tick() {
                        if (this._runningTick) throw new C(101, !1);
                        try {
                            this._runningTick = !0;
                            for (let n of this._views) n.detectChanges()
                        } catch (n) {
                            this.internalErrorHandler(n)
                        } finally {
                            this._runningTick = !1
                        }
                    }
                    attachView(n) {
                        const r = n;
                        this._views.push(r), r.attachToAppRef(this)
                    }
                    detachView(n) {
                        const r = n;
                        oa(this._views, r), r.detachFromAppRef()
                    }
                    _loadComponent(n) {
                        this.attachView(n.hostView), this.tick(), this.components.push(n);
                        const r = this._injector.get(Ll, []);
                        r.push(...this._bootstrapListeners), r.forEach(o => o(n))
                    }
                    ngOnDestroy() {
                        if (!this._destroyed) try {
                            this._destroyListeners.forEach(n => n()), this._views.slice().forEach(n => n.destroy())
                        } finally {
                            this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = []
                        }
                    }
                    onDestroy(n) {
                        return this._destroyListeners.push(n), () => oa(this._destroyListeners, n)
                    }
                    destroy() {
                        if (this._destroyed) throw new C(406, !1);
                        const n = this._injector;
                        n.destroy && !n.destroyed && n.destroy()
                    }
                    get viewCount() {
                        return this._views.length
                    }
                    warnIfDestroyed() {}
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();

            function oa(e, t) {
                const n = e.indexOf(t);
                n > -1 && e.splice(n, 1)
            }
            const Xy = new I("", {
                providedIn: "root",
                factory: () => _(Zt).handleError.bind(void 0)
            });

            function BN() {
                const e = _(ee),
                    t = _(Zt);
                return n => e.runOutsideAngular(() => t.handleError(n))
            }
            let HN = (() => {
                class e {
                    constructor() {
                        this.zone = _(ee), this.applicationRef = _(Vr)
                    }
                    initialize() {
                        this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
                            next: () => {
                                this.zone.run(() => {
                                    this.applicationRef.tick()
                                })
                            }
                        }))
                    }
                    ngOnDestroy() {
                        this._onMicrotaskEmptySubscription?.unsubscribe()
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            let $l = (() => {
                class e {
                    static #e = this.__NG_ELEMENT_ID__ = zN
                }
                return e
            })();

            function zN(e) {
                return function GN(e, t, n) {
                    if (Tn(e) && !n) {
                        const r = Ke(e.index, t);
                        return new $o(r, r)
                    }
                    return 47 & e.type ? new $o(t[le], t) : null
                }(be(), v(), 16 == (16 & e))
            }
            const oR = Gy(null, "core", []);
            let iR = (() => {
                class e {
                    constructor(n) {}
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(b(Vr))
                    };
                    static #t = this.\u0275mod = Sn({
                        type: e
                    });
                    static #n = this.\u0275inj = un({})
                }
                return e
            })();

            function Gl(e) {
                return "boolean" == typeof e ? e : null != e && "false" !== e
            }
            let ql = null;

            function Br() {
                return ql
            }
            class DR {}
            const dt = new I("DocumentToken");
            let Wl = (() => {
                class e {
                    historyGo(n) {
                        throw new Error("Not implemented")
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: function() {
                            return _(wR)
                        },
                        providedIn: "platform"
                    })
                }
                return e
            })();
            const CR = new I("Location Initialized");
            let wR = (() => {
                class e extends Wl {
                    constructor() {
                        super(), this._doc = _(dt), this._location = window.location, this._history = window.history
                    }
                    getBaseHrefFromDOM() {
                        return Br().getBaseHref(this._doc)
                    }
                    onPopState(n) {
                        const r = Br().getGlobalEventTarget(this._doc, "window");
                        return r.addEventListener("popstate", n, !1), () => r.removeEventListener("popstate", n)
                    }
                    onHashChange(n) {
                        const r = Br().getGlobalEventTarget(this._doc, "window");
                        return r.addEventListener("hashchange", n, !1), () => r.removeEventListener("hashchange", n)
                    }
                    get href() {
                        return this._location.href
                    }
                    get protocol() {
                        return this._location.protocol
                    }
                    get hostname() {
                        return this._location.hostname
                    }
                    get port() {
                        return this._location.port
                    }
                    get pathname() {
                        return this._location.pathname
                    }
                    get search() {
                        return this._location.search
                    }
                    get hash() {
                        return this._location.hash
                    }
                    set pathname(n) {
                        this._location.pathname = n
                    }
                    pushState(n, r, o) {
                        this._history.pushState(n, r, o)
                    }
                    replaceState(n, r, o) {
                        this._history.replaceState(n, r, o)
                    }
                    forward() {
                        this._history.forward()
                    }
                    back() {
                        this._history.back()
                    }
                    historyGo(n = 0) {
                        this._history.go(n)
                    }
                    getState() {
                        return this._history.state
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: function() {
                            return new e
                        },
                        providedIn: "platform"
                    })
                }
                return e
            })();

            function Zl(e, t) {
                if (0 == e.length) return t;
                if (0 == t.length) return e;
                let n = 0;
                return e.endsWith("/") && n++, t.startsWith("/") && n++, 2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
            }

            function vD(e) {
                const t = e.match(/#|\?|$/),
                    n = t && t.index || e.length;
                return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n)
            }

            function Jt(e) {
                return e && "?" !== e[0] ? "?" + e : e
            }
            let Vn = (() => {
                class e {
                    historyGo(n) {
                        throw new Error("Not implemented")
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: function() {
                            return _(DD)
                        },
                        providedIn: "root"
                    })
                }
                return e
            })();
            const yD = new I("appBaseHref");
            let DD = (() => {
                    class e extends Vn {
                        constructor(n, r) {
                            super(), this._platformLocation = n, this._removeListenerFns = [], this._baseHref = r ?? this._platformLocation.getBaseHrefFromDOM() ?? _(dt).location?.origin ?? ""
                        }
                        ngOnDestroy() {
                            for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
                        }
                        onPopState(n) {
                            this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
                        }
                        getBaseHref() {
                            return this._baseHref
                        }
                        prepareExternalUrl(n) {
                            return Zl(this._baseHref, n)
                        }
                        path(n = !1) {
                            const r = this._platformLocation.pathname + Jt(this._platformLocation.search),
                                o = this._platformLocation.hash;
                            return o && n ? `${r}${o}` : r
                        }
                        pushState(n, r, o, i) {
                            const s = this.prepareExternalUrl(o + Jt(i));
                            this._platformLocation.pushState(n, r, s)
                        }
                        replaceState(n, r, o, i) {
                            const s = this.prepareExternalUrl(o + Jt(i));
                            this._platformLocation.replaceState(n, r, s)
                        }
                        forward() {
                            this._platformLocation.forward()
                        }
                        back() {
                            this._platformLocation.back()
                        }
                        getState() {
                            return this._platformLocation.getState()
                        }
                        historyGo(n = 0) {
                            this._platformLocation.historyGo?.(n)
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(b(Wl), b(yD, 8))
                        };
                        static #t = this.\u0275prov = S({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                _R = (() => {
                    class e extends Vn {
                        constructor(n, r) {
                            super(), this._platformLocation = n, this._baseHref = "", this._removeListenerFns = [], null != r && (this._baseHref = r)
                        }
                        ngOnDestroy() {
                            for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
                        }
                        onPopState(n) {
                            this._removeListenerFns.push(this._platformLocation.onPopState(n), this._platformLocation.onHashChange(n))
                        }
                        getBaseHref() {
                            return this._baseHref
                        }
                        path(n = !1) {
                            let r = this._platformLocation.hash;
                            return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r
                        }
                        prepareExternalUrl(n) {
                            const r = Zl(this._baseHref, n);
                            return r.length > 0 ? "#" + r : r
                        }
                        pushState(n, r, o, i) {
                            let s = this.prepareExternalUrl(o + Jt(i));
                            0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.pushState(n, r, s)
                        }
                        replaceState(n, r, o, i) {
                            let s = this.prepareExternalUrl(o + Jt(i));
                            0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.replaceState(n, r, s)
                        }
                        forward() {
                            this._platformLocation.forward()
                        }
                        back() {
                            this._platformLocation.back()
                        }
                        getState() {
                            return this._platformLocation.getState()
                        }
                        historyGo(n = 0) {
                            this._platformLocation.historyGo?.(n)
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(b(Wl), b(yD, 8))
                        };
                        static #t = this.\u0275prov = S({
                            token: e,
                            factory: e.\u0275fac
                        })
                    }
                    return e
                })(),
                Ql = (() => {
                    class e {
                        constructor(n) {
                            this._subject = new ke, this._urlChangeListeners = [], this._urlChangeSubscription = null, this._locationStrategy = n;
                            const r = this._locationStrategy.getBaseHref();
                            this._basePath = function bR(e) {
                                if (new RegExp("^(https?:)?//").test(e)) {
                                    const [, n] = e.split(/\/\/[^\/]+/);
                                    return n
                                }
                                return e
                            }(vD(CD(r))), this._locationStrategy.onPopState(o => {
                                this._subject.emit({
                                    url: this.path(!0),
                                    pop: !0,
                                    state: o.state,
                                    type: o.type
                                })
                            })
                        }
                        ngOnDestroy() {
                            this._urlChangeSubscription?.unsubscribe(), this._urlChangeListeners = []
                        }
                        path(n = !1) {
                            return this.normalize(this._locationStrategy.path(n))
                        }
                        getState() {
                            return this._locationStrategy.getState()
                        }
                        isCurrentPathEqualTo(n, r = "") {
                            return this.path() == this.normalize(n + Jt(r))
                        }
                        normalize(n) {
                            return e.stripTrailingSlash(function IR(e, t) {
                                if (!e || !t.startsWith(e)) return t;
                                const n = t.substring(e.length);
                                return "" === n || ["/", ";", "?", "#"].includes(n[0]) ? n : t
                            }(this._basePath, CD(n)))
                        }
                        prepareExternalUrl(n) {
                            return n && "/" !== n[0] && (n = "/" + n), this._locationStrategy.prepareExternalUrl(n)
                        }
                        go(n, r = "", o = null) {
                            this._locationStrategy.pushState(o, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Jt(r)), o)
                        }
                        replaceState(n, r = "", o = null) {
                            this._locationStrategy.replaceState(o, "", n, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Jt(r)), o)
                        }
                        forward() {
                            this._locationStrategy.forward()
                        }
                        back() {
                            this._locationStrategy.back()
                        }
                        historyGo(n = 0) {
                            this._locationStrategy.historyGo?.(n)
                        }
                        onUrlChange(n) {
                            return this._urlChangeListeners.push(n), this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(r => {
                                this._notifyUrlChangeListeners(r.url, r.state)
                            })), () => {
                                const r = this._urlChangeListeners.indexOf(n);
                                this._urlChangeListeners.splice(r, 1), 0 === this._urlChangeListeners.length && (this._urlChangeSubscription?.unsubscribe(), this._urlChangeSubscription = null)
                            }
                        }
                        _notifyUrlChangeListeners(n = "", r) {
                            this._urlChangeListeners.forEach(o => o(n, r))
                        }
                        subscribe(n, r, o) {
                            return this._subject.subscribe({
                                next: n,
                                error: r,
                                complete: o
                            })
                        }
                        static #e = this.normalizeQueryParams = Jt;
                        static #t = this.joinWithSlash = Zl;
                        static #n = this.stripTrailingSlash = vD;
                        static #r = this.\u0275fac = function(r) {
                            return new(r || e)(b(Vn))
                        };
                        static #o = this.\u0275prov = S({
                            token: e,
                            factory: function() {
                                return function ER() {
                                    return new Ql(b(Vn))
                                }()
                            },
                            providedIn: "root"
                        })
                    }
                    return e
                })();

            function CD(e) {
                return e.replace(/\/index.html$/, "")
            }
            let Vx = (() => {
                class e {
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275mod = Sn({
                        type: e
                    });
                    static #n = this.\u0275inj = un({})
                }
                return e
            })();

            function kD(e) {
                return "server" === e
            }
            let zx = (() => {
                class e {
                    static #e = this.\u0275prov = S({
                        token: e,
                        providedIn: "root",
                        factory: () => new Gx(b(dt), window)
                    })
                }
                return e
            })();
            class Gx {
                constructor(t, n) {
                    this.document = t, this.window = n, this.offset = () => [0, 0]
                }
                setOffset(t) {
                    this.offset = Array.isArray(t) ? () => t : t
                }
                getScrollPosition() {
                    return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0]
                }
                scrollToPosition(t) {
                    this.supportsScrolling() && this.window.scrollTo(t[0], t[1])
                }
                scrollToAnchor(t) {
                    if (!this.supportsScrolling()) return;
                    const n = function qx(e, t) {
                        const n = e.getElementById(t) || e.getElementsByName(t)[0];
                        if (n) return n;
                        if ("function" == typeof e.createTreeWalker && e.body && "function" == typeof e.body.attachShadow) {
                            const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
                            let o = r.currentNode;
                            for (; o;) {
                                const i = o.shadowRoot;
                                if (i) {
                                    const s = i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                                    if (s) return s
                                }
                                o = r.nextNode()
                            }
                        }
                        return null
                    }(this.document, t);
                    n && (this.scrollToElement(n), n.focus())
                }
                setHistoryScrollRestoration(t) {
                    this.supportsScrolling() && (this.window.history.scrollRestoration = t)
                }
                scrollToElement(t) {
                    const n = t.getBoundingClientRect(),
                        r = n.left + this.window.pageXOffset,
                        o = n.top + this.window.pageYOffset,
                        i = this.offset();
                    this.window.scrollTo(r - i[0], o - i[1])
                }
                supportsScrolling() {
                    try {
                        return !!this.window && !!this.window.scrollTo && "pageXOffset" in this.window
                    } catch {
                        return !1
                    }
                }
            }
            class mO extends DR {
                constructor() {
                    super(...arguments), this.supportsDOMEvents = !0
                }
            }
            class fd extends mO {
                static makeCurrent() {
                    ! function yR(e) {
                        ql || (ql = e)
                    }(new fd)
                }
                onAndCancel(t, n, r) {
                    return t.addEventListener(n, r), () => {
                        t.removeEventListener(n, r)
                    }
                }
                dispatchEvent(t, n) {
                    t.dispatchEvent(n)
                }
                remove(t) {
                    t.parentNode && t.parentNode.removeChild(t)
                }
                createElement(t, n) {
                    return (n = n || this.getDefaultDocument()).createElement(t)
                }
                createHtmlDocument() {
                    return document.implementation.createHTMLDocument("fakeTitle")
                }
                getDefaultDocument() {
                    return document
                }
                isElementNode(t) {
                    return t.nodeType === Node.ELEMENT_NODE
                }
                isShadowRoot(t) {
                    return t instanceof DocumentFragment
                }
                getGlobalEventTarget(t, n) {
                    return "window" === n ? window : "document" === n ? t : "body" === n ? t.body : null
                }
                getBaseHref(t) {
                    const n = function vO() {
                        return ci = ci || document.querySelector("base"), ci ? ci.getAttribute("href") : null
                    }();
                    return null == n ? null : function yO(e) {
                        wa = wa || document.createElement("a"), wa.setAttribute("href", e);
                        const t = wa.pathname;
                        return "/" === t.charAt(0) ? t : `/${t}`
                    }(n)
                }
                resetBaseElement() {
                    ci = null
                }
                getUserAgent() {
                    return window.navigator.userAgent
                }
                getCookie(t) {
                    return function cx(e, t) {
                        t = encodeURIComponent(t);
                        for (const n of e.split(";")) {
                            const r = n.indexOf("="),
                                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
                            if (o.trim() === t) return decodeURIComponent(i)
                        }
                        return null
                    }(document.cookie, t)
                }
            }
            let wa, ci = null,
                CO = (() => {
                    class e {
                        build() {
                            return new XMLHttpRequest
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = S({
                            token: e,
                            factory: e.\u0275fac
                        })
                    }
                    return e
                })();
            const hd = new I("EventManagerPlugins");
            let BD = (() => {
                class e {
                    constructor(n, r) {
                        this._zone = r, this._eventNameToPlugin = new Map, n.forEach(o => {
                            o.manager = this
                        }), this._plugins = n.slice().reverse()
                    }
                    addEventListener(n, r, o) {
                        return this._findPluginFor(r).addEventListener(n, r, o)
                    }
                    getZone() {
                        return this._zone
                    }
                    _findPluginFor(n) {
                        let r = this._eventNameToPlugin.get(n);
                        if (r) return r;
                        if (r = this._plugins.find(i => i.supports(n)), !r) throw new C(5101, !1);
                        return this._eventNameToPlugin.set(n, r), r
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(b(hd), b(ee))
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            class HD {
                constructor(t) {
                    this._doc = t
                }
            }
            const pd = "ng-app-id";
            let UD = (() => {
                class e {
                    constructor(n, r, o, i = {}) {
                        this.doc = n, this.appId = r, this.nonce = o, this.platformId = i, this.styleRef = new Map, this.hostNodes = new Set, this.styleNodesInDOM = this.collectServerRenderedStyles(), this.platformIsServer = kD(i), this.resetHostNodes()
                    }
                    addStyles(n) {
                        for (const r of n) 1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r)
                    }
                    removeStyles(n) {
                        for (const r of n) this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r)
                    }
                    ngOnDestroy() {
                        const n = this.styleNodesInDOM;
                        n && (n.forEach(r => r.remove()), n.clear());
                        for (const r of this.getAllStyles()) this.onStyleRemoved(r);
                        this.resetHostNodes()
                    }
                    addHost(n) {
                        this.hostNodes.add(n);
                        for (const r of this.getAllStyles()) this.addStyleToHost(n, r)
                    }
                    removeHost(n) {
                        this.hostNodes.delete(n)
                    }
                    getAllStyles() {
                        return this.styleRef.keys()
                    }
                    onStyleAdded(n) {
                        for (const r of this.hostNodes) this.addStyleToHost(r, n)
                    }
                    onStyleRemoved(n) {
                        const r = this.styleRef;
                        r.get(n)?.elements?.forEach(o => o.remove()), r.delete(n)
                    }
                    collectServerRenderedStyles() {
                        const n = this.doc.head?.querySelectorAll(`style[${pd}="${this.appId}"]`);
                        if (n?.length) {
                            const r = new Map;
                            return n.forEach(o => {
                                null != o.textContent && r.set(o.textContent, o)
                            }), r
                        }
                        return null
                    }
                    changeUsageCount(n, r) {
                        const o = this.styleRef;
                        if (o.has(n)) {
                            const i = o.get(n);
                            return i.usage += r, i.usage
                        }
                        return o.set(n, {
                            usage: r,
                            elements: []
                        }), r
                    }
                    getStyleElement(n, r) {
                        const o = this.styleNodesInDOM,
                            i = o?.get(r);
                        if (i?.parentNode === n) return o.delete(r), i.removeAttribute(pd), i;
                        {
                            const s = this.doc.createElement("style");
                            return this.nonce && s.setAttribute("nonce", this.nonce), s.textContent = r, this.platformIsServer && s.setAttribute(pd, this.appId), s
                        }
                    }
                    addStyleToHost(n, r) {
                        const o = this.getStyleElement(n, r);
                        n.appendChild(o);
                        const i = this.styleRef,
                            s = i.get(r)?.elements;
                        s ? s.push(o) : i.set(r, {
                            elements: [o],
                            usage: 1
                        })
                    }
                    resetHostNodes() {
                        const n = this.hostNodes;
                        n.clear(), n.add(this.doc.head)
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(b(dt), b(Is), b(Yp, 8), b(Dr))
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            const gd = {
                    svg: "http://www.w3.org/2000/svg",
                    xhtml: "http://www.w3.org/1999/xhtml",
                    xlink: "http://www.w3.org/1999/xlink",
                    xml: "http://www.w3.org/XML/1998/namespace",
                    xmlns: "http://www.w3.org/2000/xmlns/",
                    math: "http://www.w3.org/1998/MathML/"
                },
                md = /%COMP%/g,
                IO = new I("RemoveStylesOnCompDestroy", {
                    providedIn: "root",
                    factory: () => !1
                });

            function GD(e, t) {
                return t.map(n => n.replace(md, e))
            }
            let qD = (() => {
                class e {
                    constructor(n, r, o, i, s, a, u, c = null) {
                        this.eventManager = n, this.sharedStylesHost = r, this.appId = o, this.removeStylesOnCompDestroy = i, this.doc = s, this.platformId = a, this.ngZone = u, this.nonce = c, this.rendererByCompId = new Map, this.platformIsServer = kD(a), this.defaultRenderer = new vd(n, s, u, this.platformIsServer)
                    }
                    createRenderer(n, r) {
                        if (!n || !r) return this.defaultRenderer;
                        this.platformIsServer && r.encapsulation === mt.ShadowDom && (r = {
                            ...r,
                            encapsulation: mt.Emulated
                        });
                        const o = this.getOrCreateRenderer(n, r);
                        return o instanceof ZD ? o.applyToHost(n) : o instanceof yd && o.applyStyles(), o
                    }
                    getOrCreateRenderer(n, r) {
                        const o = this.rendererByCompId;
                        let i = o.get(r.id);
                        if (!i) {
                            const s = this.doc,
                                a = this.ngZone,
                                u = this.eventManager,
                                c = this.sharedStylesHost,
                                l = this.removeStylesOnCompDestroy,
                                d = this.platformIsServer;
                            switch (r.encapsulation) {
                                case mt.Emulated:
                                    i = new ZD(u, c, r, this.appId, l, s, a, d);
                                    break;
                                case mt.ShadowDom:
                                    return new TO(u, c, n, r, s, a, this.nonce, d);
                                default:
                                    i = new yd(u, c, r, l, s, a, d)
                            }
                            o.set(r.id, i)
                        }
                        return i
                    }
                    ngOnDestroy() {
                        this.rendererByCompId.clear()
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(b(BD), b(UD), b(Is), b(IO), b(dt), b(Dr), b(ee), b(Yp))
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            class vd {
                constructor(t, n, r, o) {
                    this.eventManager = t, this.doc = n, this.ngZone = r, this.platformIsServer = o, this.data = Object.create(null), this.destroyNode = null
                }
                destroy() {}
                createElement(t, n) {
                    return n ? this.doc.createElementNS(gd[n] || n, t) : this.doc.createElement(t)
                }
                createComment(t) {
                    return this.doc.createComment(t)
                }
                createText(t) {
                    return this.doc.createTextNode(t)
                }
                appendChild(t, n) {
                    (WD(t) ? t.content : t).appendChild(n)
                }
                insertBefore(t, n, r) {
                    t && (WD(t) ? t.content : t).insertBefore(n, r)
                }
                removeChild(t, n) {
                    t && t.removeChild(n)
                }
                selectRootElement(t, n) {
                    let r = "string" == typeof t ? this.doc.querySelector(t) : t;
                    if (!r) throw new C(-5104, !1);
                    return n || (r.textContent = ""), r
                }
                parentNode(t) {
                    return t.parentNode
                }
                nextSibling(t) {
                    return t.nextSibling
                }
                setAttribute(t, n, r, o) {
                    if (o) {
                        n = o + ":" + n;
                        const i = gd[o];
                        i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r)
                    } else t.setAttribute(n, r)
                }
                removeAttribute(t, n, r) {
                    if (r) {
                        const o = gd[r];
                        o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`)
                    } else t.removeAttribute(n)
                }
                addClass(t, n) {
                    t.classList.add(n)
                }
                removeClass(t, n) {
                    t.classList.remove(n)
                }
                setStyle(t, n, r, o) {
                    o & (gn.DashCase | gn.Important) ? t.style.setProperty(n, r, o & gn.Important ? "important" : "") : t.style[n] = r
                }
                removeStyle(t, n, r) {
                    r & gn.DashCase ? t.style.removeProperty(n) : t.style[n] = ""
                }
                setProperty(t, n, r) {
                    t[n] = r
                }
                setValue(t, n) {
                    t.nodeValue = n
                }
                listen(t, n, r) {
                    if ("string" == typeof t && !(t = Br().getGlobalEventTarget(this.doc, t))) throw new Error(`Unsupported event target ${t} for event ${n}`);
                    return this.eventManager.addEventListener(t, n, this.decoratePreventDefault(r))
                }
                decoratePreventDefault(t) {
                    return n => {
                        if ("__ngUnwrap__" === n) return t;
                        !1 === (this.platformIsServer ? this.ngZone.runGuarded(() => t(n)) : t(n)) && n.preventDefault()
                    }
                }
            }

            function WD(e) {
                return "TEMPLATE" === e.tagName && void 0 !== e.content
            }
            class TO extends vd {
                constructor(t, n, r, o, i, s, a, u) {
                    super(t, i, s, u), this.sharedStylesHost = n, this.hostEl = r, this.shadowRoot = r.attachShadow({
                        mode: "open"
                    }), this.sharedStylesHost.addHost(this.shadowRoot);
                    const c = GD(o.id, o.styles);
                    for (const l of c) {
                        const d = document.createElement("style");
                        a && d.setAttribute("nonce", a), d.textContent = l, this.shadowRoot.appendChild(d)
                    }
                }
                nodeOrShadowRoot(t) {
                    return t === this.hostEl ? this.shadowRoot : t
                }
                appendChild(t, n) {
                    return super.appendChild(this.nodeOrShadowRoot(t), n)
                }
                insertBefore(t, n, r) {
                    return super.insertBefore(this.nodeOrShadowRoot(t), n, r)
                }
                removeChild(t, n) {
                    return super.removeChild(this.nodeOrShadowRoot(t), n)
                }
                parentNode(t) {
                    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
                }
                destroy() {
                    this.sharedStylesHost.removeHost(this.shadowRoot)
                }
            }
            class yd extends vd {
                constructor(t, n, r, o, i, s, a, u) {
                    super(t, i, s, a), this.sharedStylesHost = n, this.removeStylesOnCompDestroy = o, this.styles = u ? GD(u, r.styles) : r.styles
                }
                applyStyles() {
                    this.sharedStylesHost.addStyles(this.styles)
                }
                destroy() {
                    this.removeStylesOnCompDestroy && this.sharedStylesHost.removeStyles(this.styles)
                }
            }
            class ZD extends yd {
                constructor(t, n, r, o, i, s, a, u) {
                    const c = o + "-" + r.id;
                    super(t, n, r, i, s, a, u, c), this.contentAttr = function bO(e) {
                        return "_ngcontent-%COMP%".replace(md, e)
                    }(c), this.hostAttr = function MO(e) {
                        return "_nghost-%COMP%".replace(md, e)
                    }(c)
                }
                applyToHost(t) {
                    this.applyStyles(), this.setAttribute(t, this.hostAttr, "")
                }
                createElement(t, n) {
                    const r = super.createElement(t, n);
                    return super.setAttribute(r, this.contentAttr, ""), r
                }
            }
            let AO = (() => {
                class e extends HD {
                    constructor(n) {
                        super(n)
                    }
                    supports(n) {
                        return !0
                    }
                    addEventListener(n, r, o) {
                        return n.addEventListener(r, o, !1), () => this.removeEventListener(n, r, o)
                    }
                    removeEventListener(n, r, o) {
                        return n.removeEventListener(r, o)
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(b(dt))
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            const QD = ["alt", "control", "meta", "shift"],
                NO = {
                    "\b": "Backspace",
                    "\t": "Tab",
                    "\x7f": "Delete",
                    "\x1b": "Escape",
                    Del: "Delete",
                    Esc: "Escape",
                    Left: "ArrowLeft",
                    Right: "ArrowRight",
                    Up: "ArrowUp",
                    Down: "ArrowDown",
                    Menu: "ContextMenu",
                    Scroll: "ScrollLock",
                    Win: "OS"
                },
                RO = {
                    alt: e => e.altKey,
                    control: e => e.ctrlKey,
                    meta: e => e.metaKey,
                    shift: e => e.shiftKey
                };
            let xO = (() => {
                class e extends HD {
                    constructor(n) {
                        super(n)
                    }
                    supports(n) {
                        return null != e.parseEventName(n)
                    }
                    addEventListener(n, r, o) {
                        const i = e.parseEventName(r),
                            s = e.eventCallback(i.fullKey, o, this.manager.getZone());
                        return this.manager.getZone().runOutsideAngular(() => Br().onAndCancel(n, i.domEventName, s))
                    }
                    static parseEventName(n) {
                        const r = n.toLowerCase().split("."),
                            o = r.shift();
                        if (0 === r.length || "keydown" !== o && "keyup" !== o) return null;
                        const i = e._normalizeKey(r.pop());
                        let s = "",
                            a = r.indexOf("code");
                        if (a > -1 && (r.splice(a, 1), s = "code."), QD.forEach(c => {
                                const l = r.indexOf(c);
                                l > -1 && (r.splice(l, 1), s += c + ".")
                            }), s += i, 0 != r.length || 0 === i.length) return null;
                        const u = {};
                        return u.domEventName = o, u.fullKey = s, u
                    }
                    static matchEventFullKeyCode(n, r) {
                        let o = NO[n.key] || n.key,
                            i = "";
                        return r.indexOf("code.") > -1 && (o = n.code, i = "code."), !(null == o || !o) && (o = o.toLowerCase(), " " === o ? o = "space" : "." === o && (o = "dot"), QD.forEach(s => {
                            s !== o && (0, RO[s])(n) && (i += s + ".")
                        }), i += o, i === r)
                    }
                    static eventCallback(n, r, o) {
                        return i => {
                            e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i))
                        }
                    }
                    static _normalizeKey(n) {
                        return "esc" === n ? "escape" : n
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(b(dt))
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            const kO = Gy(oR, "browser", [{
                    provide: Dr,
                    useValue: "browser"
                }, {
                    provide: Qp,
                    useValue: function OO() {
                        fd.makeCurrent()
                    },
                    multi: !0
                }, {
                    provide: dt,
                    useFactory: function FO() {
                        return function ob(e) {
                            rc = e
                        }(document), document
                    },
                    deps: []
                }]),
                LO = new I(""),
                XD = [{
                    provide: ra,
                    useClass: class DO {
                        addToWindow(t) {
                            X.getAngularTestability = (r, o = !0) => {
                                const i = t.findTestabilityInTree(r, o);
                                if (null == i) throw new C(5103, !1);
                                return i
                            }, X.getAllAngularTestabilities = () => t.getAllTestabilities(), X.getAllAngularRootElements = () => t.getAllRootElements(), X.frameworkStabilizers || (X.frameworkStabilizers = []), X.frameworkStabilizers.push(r => {
                                const o = X.getAllAngularTestabilities();
                                let i = o.length,
                                    s = !1;
                                const a = function(u) {
                                    s = s || u, i--, 0 == i && r(s)
                                };
                                o.forEach(u => {
                                    u.whenStable(a)
                                })
                            })
                        }
                        findTestabilityInTree(t, n, r) {
                            return null == n ? null : t.getTestability(n) ?? (r ? Br().isShadowRoot(n) ? this.findTestabilityInTree(t, n.host, !0) : this.findTestabilityInTree(t, n.parentElement, !0) : null)
                        }
                    },
                    deps: []
                }, {
                    provide: Vy,
                    useClass: Ol,
                    deps: [ee, Pl, ra]
                }, {
                    provide: Ol,
                    useClass: Ol,
                    deps: [ee, Pl, ra]
                }],
                JD = [{
                        provide: fc,
                        useValue: "root"
                    }, {
                        provide: Zt,
                        useFactory: function PO() {
                            return new Zt
                        },
                        deps: []
                    }, {
                        provide: hd,
                        useClass: AO,
                        multi: !0,
                        deps: [dt, ee, Dr]
                    }, {
                        provide: hd,
                        useClass: xO,
                        multi: !0,
                        deps: [dt]
                    }, qD, UD, BD, {
                        provide: ng,
                        useExisting: qD
                    }, {
                        provide: class Wx {},
                        useClass: CO,
                        deps: []
                    },
                    []
                ];
            let jO = (() => {
                    class e {
                        constructor(n) {}
                        static withServerTransition(n) {
                            return {
                                ngModule: e,
                                providers: [{
                                    provide: Is,
                                    useValue: n.appId
                                }]
                            }
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(b(LO, 12))
                        };
                        static #t = this.\u0275mod = Sn({
                            type: e
                        });
                        static #n = this.\u0275inj = un({
                            providers: [...JD, ...XD],
                            imports: [Vx, iR]
                        })
                    }
                    return e
                })(),
                eC = (() => {
                    class e {
                        constructor(n) {
                            this._doc = n
                        }
                        getTitle() {
                            return this._doc.title
                        }
                        setTitle(n) {
                            this._doc.title = n || ""
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(b(dt))
                        };
                        static #t = this.\u0275prov = S({
                            token: e,
                            factory: function(r) {
                                let o = null;
                                return o = r ? new r : function VO() {
                                    return new eC(b(dt))
                                }(), o
                            },
                            providedIn: "root"
                        })
                    }
                    return e
                })();
            typeof window < "u" && window;
            const {
                isArray: qO
            } = Array, {
                getPrototypeOf: WO,
                prototype: ZO,
                keys: QO
            } = Object;
            const {
                isArray: XO
            } = Array;

            function Cd(...e) {
                const t = ro(e),
                    n = function t_(e) {
                        return Q(Ya(e)) ? e.pop() : void 0
                    }(e),
                    {
                        args: r,
                        keys: o
                    } = function YO(e) {
                        if (1 === e.length) {
                            const t = e[0];
                            if (qO(t)) return {
                                args: t,
                                keys: null
                            };
                            if (function KO(e) {
                                    return e && "object" == typeof e && WO(e) === ZO
                                }(t)) {
                                const n = QO(t);
                                return {
                                    args: n.map(r => t[r]),
                                    keys: n
                                }
                            }
                        }
                        return {
                            args: e,
                            keys: null
                        }
                    }(e);
                if (0 === r.length) return we([], t);
                const i = new he(function nP(e, t, n = sn) {
                    return r => {
                        oC(t, () => {
                            const {
                                length: o
                            } = e, i = new Array(o);
                            let s = o,
                                a = o;
                            for (let u = 0; u < o; u++) oC(t, () => {
                                const c = we(e[u], t);
                                let l = !1;
                                c.subscribe(ge(r, d => {
                                    i[u] = d, l || (l = !0, a--), a || r.next(n(i.slice()))
                                }, () => {
                                    --s || r.complete()
                                }))
                            }, r)
                        }, r)
                    }
                }(r, t, o ? s => function tP(e, t) {
                    return e.reduce((n, r, o) => (n[r] = t[o], n), {})
                }(o, s) : sn));
                return n ? i.pipe(function eP(e) {
                    return K(t => function JO(e, t) {
                        return XO(t) ? e(...t) : e(t)
                    }(e, t))
                }(n)) : i
            }

            function oC(e, t, n) {
                e ? Vt(n, e, t) : t()
            }
            const _a = eo(e => function() {
                e(this), this.name = "EmptyError", this.message = "no elements in sequence"
            });

            function wd(...e) {
                return function rP() {
                    return qn(1)
                }()(we(e, ro(e)))
            }

            function iC(e) {
                return new he(t => {
                    nt(e()).subscribe(t)
                })
            }

            function li(e, t) {
                const n = Q(e) ? e : () => e,
                    r = o => o.error(n());
                return new he(t ? o => t.schedule(r, 0, o) : r)
            }

            function _d() {
                return pe((e, t) => {
                    let n = null;
                    e._refCount++;
                    const r = ge(t, void 0, void 0, void 0, () => {
                        if (!e || e._refCount <= 0 || 0 < --e._refCount) return void(n = null);
                        const o = e._connection,
                            i = n;
                        n = null, o && (!i || o === i) && o.unsubscribe(), t.unsubscribe()
                    });
                    e.subscribe(r), r.closed || (n = e.connect())
                })
            }
            class sC extends he {
                constructor(t, n) {
                    super(), this.source = t, this.subjectFactory = n, this._subject = null, this._refCount = 0, this._connection = null, ef(t) && (this.lift = t.lift)
                }
                _subscribe(t) {
                    return this.getSubject().subscribe(t)
                }
                getSubject() {
                    const t = this._subject;
                    return (!t || t.isStopped) && (this._subject = this.subjectFactory()), this._subject
                }
                _teardown() {
                    this._refCount = 0;
                    const {
                        _connection: t
                    } = this;
                    this._subject = this._connection = null, t?.unsubscribe()
                }
                connect() {
                    let t = this._connection;
                    if (!t) {
                        t = this._connection = new Ze;
                        const n = this.getSubject();
                        t.add(this.source.subscribe(ge(n, void 0, () => {
                            this._teardown(), n.complete()
                        }, r => {
                            this._teardown(), n.error(r)
                        }, () => this._teardown()))), t.closed && (this._connection = null, t = Ze.EMPTY)
                    }
                    return t
                }
                refCount() {
                    return _d()(this)
                }
            }

            function Ur(e) {
                return e <= 0 ? () => Mt : pe((t, n) => {
                    let r = 0;
                    t.subscribe(ge(n, o => {
                        ++r <= e && (n.next(o), e <= r && n.complete())
                    }))
                })
            }

            function wn(e, t) {
                return pe((n, r) => {
                    let o = 0;
                    n.subscribe(ge(r, i => e.call(t, i, o++) && r.next(i)))
                })
            }

            function Ea(e) {
                return pe((t, n) => {
                    let r = !1;
                    t.subscribe(ge(n, o => {
                        r = !0, n.next(o)
                    }, () => {
                        r || n.next(e), n.complete()
                    }))
                })
            }

            function aC(e = iP) {
                return pe((t, n) => {
                    let r = !1;
                    t.subscribe(ge(n, o => {
                        r = !0, n.next(o)
                    }, () => r ? n.complete() : n.error(e())))
                })
            }

            function iP() {
                return new _a
            }

            function Bn(e, t) {
                const n = arguments.length >= 2;
                return r => r.pipe(e ? wn((o, i) => e(o, i, r)) : sn, Ur(1), n ? Ea(t) : aC(() => new _a))
            }

            function di(e, t) {
                return Q(t) ? Ce(e, t, 1) : Ce(e, 1)
            }

            function Ae(e, t, n) {
                const r = Q(e) || t || n ? {
                    next: e,
                    error: t,
                    complete: n
                } : e;
                return r ? pe((o, i) => {
                    var s;
                    null === (s = r.subscribe) || void 0 === s || s.call(r);
                    let a = !0;
                    o.subscribe(ge(i, u => {
                        var c;
                        null === (c = r.next) || void 0 === c || c.call(r, u), i.next(u)
                    }, () => {
                        var u;
                        a = !1, null === (u = r.complete) || void 0 === u || u.call(r), i.complete()
                    }, u => {
                        var c;
                        a = !1, null === (c = r.error) || void 0 === c || c.call(r, u), i.error(u)
                    }, () => {
                        var u, c;
                        a && (null === (u = r.unsubscribe) || void 0 === u || u.call(r)), null === (c = r.finalize) || void 0 === c || c.call(r)
                    }))
                }) : sn
            }

            function Hn(e) {
                return pe((t, n) => {
                    let i, r = null,
                        o = !1;
                    r = t.subscribe(ge(n, void 0, void 0, s => {
                        i = nt(e(s, Hn(e)(t))), r ? (r.unsubscribe(), r = null, i.subscribe(n)) : o = !0
                    })), o && (r.unsubscribe(), r = null, i.subscribe(n))
                })
            }

            function Ed(e) {
                return e <= 0 ? () => Mt : pe((t, n) => {
                    let r = [];
                    t.subscribe(ge(n, o => {
                        r.push(o), e < r.length && r.shift()
                    }, () => {
                        for (const o of r) n.next(o);
                        n.complete()
                    }, void 0, () => {
                        r = null
                    }))
                })
            }

            function Id(e) {
                return pe((t, n) => {
                    try {
                        t.subscribe(n)
                    } finally {
                        n.add(e)
                    }
                })
            }
            const L = "primary",
                fi = Symbol("RouteTitle");
            class dP {
                constructor(t) {
                    this.params = t || {}
                }
                has(t) {
                    return Object.prototype.hasOwnProperty.call(this.params, t)
                }
                get(t) {
                    if (this.has(t)) {
                        const n = this.params[t];
                        return Array.isArray(n) ? n[0] : n
                    }
                    return null
                }
                getAll(t) {
                    if (this.has(t)) {
                        const n = this.params[t];
                        return Array.isArray(n) ? n : [n]
                    }
                    return []
                }
                get keys() {
                    return Object.keys(this.params)
                }
            }

            function zr(e) {
                return new dP(e)
            }

            function fP(e, t, n) {
                const r = n.path.split("/");
                if (r.length > e.length || "full" === n.pathMatch && (t.hasChildren() || r.length < e.length)) return null;
                const o = {};
                for (let i = 0; i < r.length; i++) {
                    const s = r[i],
                        a = e[i];
                    if (s.startsWith(":")) o[s.substring(1)] = a;
                    else if (s !== a.path) return null
                }
                return {
                    consumed: e.slice(0, r.length),
                    posParams: o
                }
            }

            function jt(e, t) {
                const n = e ? Object.keys(e) : void 0,
                    r = t ? Object.keys(t) : void 0;
                if (!n || !r || n.length != r.length) return !1;
                let o;
                for (let i = 0; i < n.length; i++)
                    if (o = n[i], !uC(e[o], t[o])) return !1;
                return !0
            }

            function uC(e, t) {
                if (Array.isArray(e) && Array.isArray(t)) {
                    if (e.length !== t.length) return !1;
                    const n = [...e].sort(),
                        r = [...t].sort();
                    return n.every((o, i) => r[i] === o)
                }
                return e === t
            }

            function cC(e) {
                return e.length > 0 ? e[e.length - 1] : null
            }

            function _n(e) {
                return function GO(e) {
                    return !!e && (e instanceof he || Q(e.lift) && Q(e.subscribe))
                }(e) ? e : Gs(e) ? we(Promise.resolve(e)) : x(e)
            }
            const pP = {
                    exact: function fC(e, t, n) {
                        if (!Un(e.segments, t.segments) || !Ia(e.segments, t.segments, n) || e.numberOfChildren !== t.numberOfChildren) return !1;
                        for (const r in t.children)
                            if (!e.children[r] || !fC(e.children[r], t.children[r], n)) return !1;
                        return !0
                    },
                    subset: hC
                },
                lC = {
                    exact: function gP(e, t) {
                        return jt(e, t)
                    },
                    subset: function mP(e, t) {
                        return Object.keys(t).length <= Object.keys(e).length && Object.keys(t).every(n => uC(e[n], t[n]))
                    },
                    ignored: () => !0
                };

            function dC(e, t, n) {
                return pP[n.paths](e.root, t.root, n.matrixParams) && lC[n.queryParams](e.queryParams, t.queryParams) && !("exact" === n.fragment && e.fragment !== t.fragment)
            }

            function hC(e, t, n) {
                return pC(e, t, t.segments, n)
            }

            function pC(e, t, n, r) {
                if (e.segments.length > n.length) {
                    const o = e.segments.slice(0, n.length);
                    return !(!Un(o, n) || t.hasChildren() || !Ia(o, n, r))
                }
                if (e.segments.length === n.length) {
                    if (!Un(e.segments, n) || !Ia(e.segments, n, r)) return !1;
                    for (const o in t.children)
                        if (!e.children[o] || !hC(e.children[o], t.children[o], r)) return !1;
                    return !0
                } {
                    const o = n.slice(0, e.segments.length),
                        i = n.slice(e.segments.length);
                    return !!(Un(e.segments, o) && Ia(e.segments, o, r) && e.children[L]) && pC(e.children[L], t, i, r)
                }
            }

            function Ia(e, t, n) {
                return t.every((r, o) => lC[n](e[o].parameters, r.parameters))
            }
            class Gr {
                constructor(t = new Z([], {}), n = {}, r = null) {
                    this.root = t, this.queryParams = n, this.fragment = r
                }
                get queryParamMap() {
                    return this._queryParamMap || (this._queryParamMap = zr(this.queryParams)), this._queryParamMap
                }
                toString() {
                    return DP.serialize(this)
                }
            }
            class Z {
                constructor(t, n) {
                    this.segments = t, this.children = n, this.parent = null, Object.values(n).forEach(r => r.parent = this)
                }
                hasChildren() {
                    return this.numberOfChildren > 0
                }
                get numberOfChildren() {
                    return Object.keys(this.children).length
                }
                toString() {
                    return ba(this)
                }
            }
            class hi {
                constructor(t, n) {
                    this.path = t, this.parameters = n
                }
                get parameterMap() {
                    return this._parameterMap || (this._parameterMap = zr(this.parameters)), this._parameterMap
                }
                toString() {
                    return vC(this)
                }
            }

            function Un(e, t) {
                return e.length === t.length && e.every((n, r) => n.path === t[r].path)
            }
            let pi = (() => {
                class e {
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: function() {
                            return new bd
                        },
                        providedIn: "root"
                    })
                }
                return e
            })();
            class bd {
                parse(t) {
                    const n = new NP(t);
                    return new Gr(n.parseRootSegment(), n.parseQueryParams(), n.parseFragment())
                }
                serialize(t) {
                    const n = `/${gi(t.root,!0)}`,
                        r = function _P(e) {
                            const t = Object.keys(e).map(n => {
                                const r = e[n];
                                return Array.isArray(r) ? r.map(o => `${Ma(n)}=${Ma(o)}`).join("&") : `${Ma(n)}=${Ma(r)}`
                            }).filter(n => !!n);
                            return t.length ? `?${t.join("&")}` : ""
                        }(t.queryParams);
                    return `${n}${r}${"string"==typeof t.fragment?`#${function CP(e){return encodeURI(e)}(t.fragment)}`:""}`
                }
            }
            const DP = new bd;

            function ba(e) {
                return e.segments.map(t => vC(t)).join("/")
            }

            function gi(e, t) {
                if (!e.hasChildren()) return ba(e);
                if (t) {
                    const n = e.children[L] ? gi(e.children[L], !1) : "",
                        r = [];
                    return Object.entries(e.children).forEach(([o, i]) => {
                        o !== L && r.push(`${o}:${gi(i,!1)}`)
                    }), r.length > 0 ? `${n}(${r.join("//")})` : n
                } {
                    const n = function yP(e, t) {
                        let n = [];
                        return Object.entries(e.children).forEach(([r, o]) => {
                            r === L && (n = n.concat(t(o, r)))
                        }), Object.entries(e.children).forEach(([r, o]) => {
                            r !== L && (n = n.concat(t(o, r)))
                        }), n
                    }(e, (r, o) => o === L ? [gi(e.children[L], !1)] : [`${o}:${gi(r,!1)}`]);
                    return 1 === Object.keys(e.children).length && null != e.children[L] ? `${ba(e)}/${n[0]}` : `${ba(e)}/(${n.join("//")})`
                }
            }

            function gC(e) {
                return encodeURIComponent(e).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
            }

            function Ma(e) {
                return gC(e).replace(/%3B/gi, ";")
            }

            function Md(e) {
                return gC(e).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
            }

            function Sa(e) {
                return decodeURIComponent(e)
            }

            function mC(e) {
                return Sa(e.replace(/\+/g, "%20"))
            }

            function vC(e) {
                return `${Md(e.path)}${function wP(e){return Object.keys(e).map(t=>`;${Md(t)}=${Md(e[t])}`).join("")}(e.parameters)}`
            }
            const EP = /^[^\/()?;#]+/;

            function Sd(e) {
                const t = e.match(EP);
                return t ? t[0] : ""
            }
            const IP = /^[^\/()?;=#]+/,
                MP = /^[^=?&#]+/,
                TP = /^[^&#]+/;
            class NP {
                constructor(t) {
                    this.url = t, this.remaining = t
                }
                parseRootSegment() {
                    return this.consumeOptional("/"), "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new Z([], {}) : new Z([], this.parseChildren())
                }
                parseQueryParams() {
                    const t = {};
                    if (this.consumeOptional("?"))
                        do {
                            this.parseQueryParam(t)
                        } while (this.consumeOptional("&"));
                    return t
                }
                parseFragment() {
                    return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
                }
                parseChildren() {
                    if ("" === this.remaining) return {};
                    this.consumeOptional("/");
                    const t = [];
                    for (this.peekStartsWith("(") || t.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), t.push(this.parseSegment());
                    let n = {};
                    this.peekStartsWith("/(") && (this.capture("/"), n = this.parseParens(!0));
                    let r = {};
                    return this.peekStartsWith("(") && (r = this.parseParens(!1)), (t.length > 0 || Object.keys(n).length > 0) && (r[L] = new Z(t, n)), r
                }
                parseSegment() {
                    const t = Sd(this.remaining);
                    if ("" === t && this.peekStartsWith(";")) throw new C(4009, !1);
                    return this.capture(t), new hi(Sa(t), this.parseMatrixParams())
                }
                parseMatrixParams() {
                    const t = {};
                    for (; this.consumeOptional(";");) this.parseParam(t);
                    return t
                }
                parseParam(t) {
                    const n = function bP(e) {
                        const t = e.match(IP);
                        return t ? t[0] : ""
                    }(this.remaining);
                    if (!n) return;
                    this.capture(n);
                    let r = "";
                    if (this.consumeOptional("=")) {
                        const o = Sd(this.remaining);
                        o && (r = o, this.capture(r))
                    }
                    t[Sa(n)] = Sa(r)
                }
                parseQueryParam(t) {
                    const n = function SP(e) {
                        const t = e.match(MP);
                        return t ? t[0] : ""
                    }(this.remaining);
                    if (!n) return;
                    this.capture(n);
                    let r = "";
                    if (this.consumeOptional("=")) {
                        const s = function AP(e) {
                            const t = e.match(TP);
                            return t ? t[0] : ""
                        }(this.remaining);
                        s && (r = s, this.capture(r))
                    }
                    const o = mC(n),
                        i = mC(r);
                    if (t.hasOwnProperty(o)) {
                        let s = t[o];
                        Array.isArray(s) || (s = [s], t[o] = s), s.push(i)
                    } else t[o] = i
                }
                parseParens(t) {
                    const n = {};
                    for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
                        const r = Sd(this.remaining),
                            o = this.remaining[r.length];
                        if ("/" !== o && ")" !== o && ";" !== o) throw new C(4010, !1);
                        let i;
                        r.indexOf(":") > -1 ? (i = r.slice(0, r.indexOf(":")), this.capture(i), this.capture(":")) : t && (i = L);
                        const s = this.parseChildren();
                        n[i] = 1 === Object.keys(s).length ? s[L] : new Z([], s), this.consumeOptional("//")
                    }
                    return n
                }
                peekStartsWith(t) {
                    return this.remaining.startsWith(t)
                }
                consumeOptional(t) {
                    return !!this.peekStartsWith(t) && (this.remaining = this.remaining.substring(t.length), !0)
                }
                capture(t) {
                    if (!this.consumeOptional(t)) throw new C(4011, !1)
                }
            }

            function yC(e) {
                return e.segments.length > 0 ? new Z([], {
                    [L]: e
                }) : e
            }

            function DC(e) {
                const t = {};
                for (const r of Object.keys(e.children)) {
                    const i = DC(e.children[r]);
                    if (r === L && 0 === i.segments.length && i.hasChildren())
                        for (const [s, a] of Object.entries(i.children)) t[s] = a;
                    else(i.segments.length > 0 || i.hasChildren()) && (t[r] = i)
                }
                return function RP(e) {
                    if (1 === e.numberOfChildren && e.children[L]) {
                        const t = e.children[L];
                        return new Z(e.segments.concat(t.segments), t.children)
                    }
                    return e
                }(new Z(e.segments, t))
            }

            function zn(e) {
                return e instanceof Gr
            }

            function CC(e) {
                let t;
                const o = yC(function n(i) {
                    const s = {};
                    for (const u of i.children) {
                        const c = n(u);
                        s[u.outlet] = c
                    }
                    const a = new Z(i.url, s);
                    return i === e && (t = a), a
                }(e.root));
                return t ?? o
            }

            function wC(e, t, n, r) {
                let o = e;
                for (; o.parent;) o = o.parent;
                if (0 === t.length) return Td(o, o, o, n, r);
                const i = function OP(e) {
                    if ("string" == typeof e[0] && 1 === e.length && "/" === e[0]) return new EC(!0, 0, e);
                    let t = 0,
                        n = !1;
                    const r = e.reduce((o, i, s) => {
                        if ("object" == typeof i && null != i) {
                            if (i.outlets) {
                                const a = {};
                                return Object.entries(i.outlets).forEach(([u, c]) => {
                                    a[u] = "string" == typeof c ? c.split("/") : c
                                }), [...o, {
                                    outlets: a
                                }]
                            }
                            if (i.segmentPath) return [...o, i.segmentPath]
                        }
                        return "string" != typeof i ? [...o, i] : 0 === s ? (i.split("/").forEach((a, u) => {
                            0 == u && "." === a || (0 == u && "" === a ? n = !0 : ".." === a ? t++ : "" != a && o.push(a))
                        }), o) : [...o, i]
                    }, []);
                    return new EC(n, t, r)
                }(t);
                if (i.toRoot()) return Td(o, o, new Z([], {}), n, r);
                const s = function PP(e, t, n) {
                        if (e.isAbsolute) return new Aa(t, !0, 0);
                        if (!n) return new Aa(t, !1, NaN);
                        if (null === n.parent) return new Aa(n, !0, 0);
                        const r = Ta(e.commands[0]) ? 0 : 1;
                        return function FP(e, t, n) {
                            let r = e,
                                o = t,
                                i = n;
                            for (; i > o;) {
                                if (i -= o, r = r.parent, !r) throw new C(4005, !1);
                                o = r.segments.length
                            }
                            return new Aa(r, !1, o - i)
                        }(n, n.segments.length - 1 + r, e.numberOfDoubleDots)
                    }(i, o, e),
                    a = s.processChildren ? vi(s.segmentGroup, s.index, i.commands) : IC(s.segmentGroup, s.index, i.commands);
                return Td(o, s.segmentGroup, a, n, r)
            }

            function Ta(e) {
                return "object" == typeof e && null != e && !e.outlets && !e.segmentPath
            }

            function mi(e) {
                return "object" == typeof e && null != e && e.outlets
            }

            function Td(e, t, n, r, o) {
                let s, i = {};
                r && Object.entries(r).forEach(([u, c]) => {
                    i[u] = Array.isArray(c) ? c.map(l => `${l}`) : `${c}`
                }), s = e === t ? n : _C(e, t, n);
                const a = yC(DC(s));
                return new Gr(a, i, o)
            }

            function _C(e, t, n) {
                const r = {};
                return Object.entries(e.children).forEach(([o, i]) => {
                    r[o] = i === t ? n : _C(i, t, n)
                }), new Z(e.segments, r)
            }
            class EC {
                constructor(t, n, r) {
                    if (this.isAbsolute = t, this.numberOfDoubleDots = n, this.commands = r, t && r.length > 0 && Ta(r[0])) throw new C(4003, !1);
                    const o = r.find(mi);
                    if (o && o !== cC(r)) throw new C(4004, !1)
                }
                toRoot() {
                    return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
                }
            }
            class Aa {
                constructor(t, n, r) {
                    this.segmentGroup = t, this.processChildren = n, this.index = r
                }
            }

            function IC(e, t, n) {
                if (e || (e = new Z([], {})), 0 === e.segments.length && e.hasChildren()) return vi(e, t, n);
                const r = function LP(e, t, n) {
                        let r = 0,
                            o = t;
                        const i = {
                            match: !1,
                            pathIndex: 0,
                            commandIndex: 0
                        };
                        for (; o < e.segments.length;) {
                            if (r >= n.length) return i;
                            const s = e.segments[o],
                                a = n[r];
                            if (mi(a)) break;
                            const u = `${a}`,
                                c = r < n.length - 1 ? n[r + 1] : null;
                            if (o > 0 && void 0 === u) break;
                            if (u && c && "object" == typeof c && void 0 === c.outlets) {
                                if (!MC(u, c, s)) return i;
                                r += 2
                            } else {
                                if (!MC(u, {}, s)) return i;
                                r++
                            }
                            o++
                        }
                        return {
                            match: !0,
                            pathIndex: o,
                            commandIndex: r
                        }
                    }(e, t, n),
                    o = n.slice(r.commandIndex);
                if (r.match && r.pathIndex < e.segments.length) {
                    const i = new Z(e.segments.slice(0, r.pathIndex), {});
                    return i.children[L] = new Z(e.segments.slice(r.pathIndex), e.children), vi(i, 0, o)
                }
                return r.match && 0 === o.length ? new Z(e.segments, {}) : r.match && !e.hasChildren() ? Ad(e, t, n) : r.match ? vi(e, 0, o) : Ad(e, t, n)
            }

            function vi(e, t, n) {
                if (0 === n.length) return new Z(e.segments, {});
                {
                    const r = function kP(e) {
                            return mi(e[0]) ? e[0].outlets : {
                                [L]: e
                            }
                        }(n),
                        o = {};
                    if (Object.keys(r).some(i => i !== L) && e.children[L] && 1 === e.numberOfChildren && 0 === e.children[L].segments.length) {
                        const i = vi(e.children[L], t, n);
                        return new Z(e.segments, i.children)
                    }
                    return Object.entries(r).forEach(([i, s]) => {
                        "string" == typeof s && (s = [s]), null !== s && (o[i] = IC(e.children[i], t, s))
                    }), Object.entries(e.children).forEach(([i, s]) => {
                        void 0 === r[i] && (o[i] = s)
                    }), new Z(e.segments, o)
                }
            }

            function Ad(e, t, n) {
                const r = e.segments.slice(0, t);
                let o = 0;
                for (; o < n.length;) {
                    const i = n[o];
                    if (mi(i)) {
                        const u = jP(i.outlets);
                        return new Z(r, u)
                    }
                    if (0 === o && Ta(n[0])) {
                        r.push(new hi(e.segments[t].path, bC(n[0]))), o++;
                        continue
                    }
                    const s = mi(i) ? i.outlets[L] : `${i}`,
                        a = o < n.length - 1 ? n[o + 1] : null;
                    s && a && Ta(a) ? (r.push(new hi(s, bC(a))), o += 2) : (r.push(new hi(s, {})), o++)
                }
                return new Z(r, {})
            }

            function jP(e) {
                const t = {};
                return Object.entries(e).forEach(([n, r]) => {
                    "string" == typeof r && (r = [r]), null !== r && (t[n] = Ad(new Z([], {}), 0, r))
                }), t
            }

            function bC(e) {
                const t = {};
                return Object.entries(e).forEach(([n, r]) => t[n] = `${r}`), t
            }

            function MC(e, t, n) {
                return e == n.path && jt(t, n.parameters)
            }
            const yi = "imperative";
            class $t {
                constructor(t, n) {
                    this.id = t, this.url = n
                }
            }
            class Na extends $t {
                constructor(t, n, r = "imperative", o = null) {
                    super(t, n), this.type = 0, this.navigationTrigger = r, this.restoredState = o
                }
                toString() {
                    return `NavigationStart(id: ${this.id}, url: '${this.url}')`
                }
            }
            class En extends $t {
                constructor(t, n, r) {
                    super(t, n), this.urlAfterRedirects = r, this.type = 1
                }
                toString() {
                    return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
                }
            }
            class Di extends $t {
                constructor(t, n, r, o) {
                    super(t, n), this.reason = r, this.code = o, this.type = 2
                }
                toString() {
                    return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
                }
            }
            class qr extends $t {
                constructor(t, n, r, o) {
                    super(t, n), this.reason = r, this.code = o, this.type = 16
                }
            }
            class Ra extends $t {
                constructor(t, n, r, o) {
                    super(t, n), this.error = r, this.target = o, this.type = 3
                }
                toString() {
                    return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
                }
            }
            class SC extends $t {
                constructor(t, n, r, o) {
                    super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = 4
                }
                toString() {
                    return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class $P extends $t {
                constructor(t, n, r, o) {
                    super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = 7
                }
                toString() {
                    return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class VP extends $t {
                constructor(t, n, r, o, i) {
                    super(t, n), this.urlAfterRedirects = r, this.state = o, this.shouldActivate = i, this.type = 8
                }
                toString() {
                    return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
                }
            }
            class BP extends $t {
                constructor(t, n, r, o) {
                    super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = 5
                }
                toString() {
                    return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class HP extends $t {
                constructor(t, n, r, o) {
                    super(t, n), this.urlAfterRedirects = r, this.state = o, this.type = 6
                }
                toString() {
                    return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class UP {
                constructor(t) {
                    this.route = t, this.type = 9
                }
                toString() {
                    return `RouteConfigLoadStart(path: ${this.route.path})`
                }
            }
            class zP {
                constructor(t) {
                    this.route = t, this.type = 10
                }
                toString() {
                    return `RouteConfigLoadEnd(path: ${this.route.path})`
                }
            }
            class GP {
                constructor(t) {
                    this.snapshot = t, this.type = 11
                }
                toString() {
                    return `ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class qP {
                constructor(t) {
                    this.snapshot = t, this.type = 12
                }
                toString() {
                    return `ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class WP {
                constructor(t) {
                    this.snapshot = t, this.type = 13
                }
                toString() {
                    return `ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class ZP {
                constructor(t) {
                    this.snapshot = t, this.type = 14
                }
                toString() {
                    return `ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class TC {
                constructor(t, n, r) {
                    this.routerEvent = t, this.position = n, this.anchor = r, this.type = 15
                }
                toString() {
                    return `Scroll(anchor: '${this.anchor}', position: '${this.position?`${this.position[0]}, ${this.position[1]}`:null}')`
                }
            }
            class Nd {}
            class Rd {
                constructor(t) {
                    this.url = t
                }
            }
            class QP {
                constructor() {
                    this.outlet = null, this.route = null, this.injector = null, this.children = new Ci, this.attachRef = null
                }
            }
            let Ci = (() => {
                class e {
                    constructor() {
                        this.contexts = new Map
                    }
                    onChildOutletCreated(n, r) {
                        const o = this.getOrCreateContext(n);
                        o.outlet = r, this.contexts.set(n, o)
                    }
                    onChildOutletDestroyed(n) {
                        const r = this.getContext(n);
                        r && (r.outlet = null, r.attachRef = null)
                    }
                    onOutletDeactivated() {
                        const n = this.contexts;
                        return this.contexts = new Map, n
                    }
                    onOutletReAttached(n) {
                        this.contexts = n
                    }
                    getOrCreateContext(n) {
                        let r = this.getContext(n);
                        return r || (r = new QP, this.contexts.set(n, r)), r
                    }
                    getContext(n) {
                        return this.contexts.get(n) || null
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            class AC {
                constructor(t) {
                    this._root = t
                }
                get root() {
                    return this._root.value
                }
                parent(t) {
                    const n = this.pathFromRoot(t);
                    return n.length > 1 ? n[n.length - 2] : null
                }
                children(t) {
                    const n = xd(t, this._root);
                    return n ? n.children.map(r => r.value) : []
                }
                firstChild(t) {
                    const n = xd(t, this._root);
                    return n && n.children.length > 0 ? n.children[0].value : null
                }
                siblings(t) {
                    const n = Od(t, this._root);
                    return n.length < 2 ? [] : n[n.length - 2].children.map(o => o.value).filter(o => o !== t)
                }
                pathFromRoot(t) {
                    return Od(t, this._root).map(n => n.value)
                }
            }

            function xd(e, t) {
                if (e === t.value) return t;
                for (const n of t.children) {
                    const r = xd(e, n);
                    if (r) return r
                }
                return null
            }

            function Od(e, t) {
                if (e === t.value) return [t];
                for (const n of t.children) {
                    const r = Od(e, n);
                    if (r.length) return r.unshift(t), r
                }
                return []
            }
            class nn {
                constructor(t, n) {
                    this.value = t, this.children = n
                }
                toString() {
                    return `TreeNode(${this.value})`
                }
            }

            function Wr(e) {
                const t = {};
                return e && e.children.forEach(n => t[n.value.outlet] = n), t
            }
            class NC extends AC {
                constructor(t, n) {
                    super(t), this.snapshot = n, Pd(this, t)
                }
                toString() {
                    return this.snapshot.toString()
                }
            }

            function RC(e, t) {
                const n = function YP(e, t) {
                        const s = new xa([], {}, {}, "", {}, L, t, null, {});
                        return new OC("", new nn(s, []))
                    }(0, t),
                    r = new rt([new hi("", {})]),
                    o = new rt({}),
                    i = new rt({}),
                    s = new rt({}),
                    a = new rt(""),
                    u = new Gn(r, o, s, a, i, L, t, n.root);
                return u.snapshot = n.root, new NC(new nn(u, []), n)
            }
            class Gn {
                constructor(t, n, r, o, i, s, a, u) {
                    this.urlSubject = t, this.paramsSubject = n, this.queryParamsSubject = r, this.fragmentSubject = o, this.dataSubject = i, this.outlet = s, this.component = a, this._futureSnapshot = u, this.title = this.dataSubject?.pipe(K(c => c[fi])) ?? x(void 0), this.url = t, this.params = n, this.queryParams = r, this.fragment = o, this.data = i
                }
                get routeConfig() {
                    return this._futureSnapshot.routeConfig
                }
                get root() {
                    return this._routerState.root
                }
                get parent() {
                    return this._routerState.parent(this)
                }
                get firstChild() {
                    return this._routerState.firstChild(this)
                }
                get children() {
                    return this._routerState.children(this)
                }
                get pathFromRoot() {
                    return this._routerState.pathFromRoot(this)
                }
                get paramMap() {
                    return this._paramMap || (this._paramMap = this.params.pipe(K(t => zr(t)))), this._paramMap
                }
                get queryParamMap() {
                    return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(K(t => zr(t)))), this._queryParamMap
                }
                toString() {
                    return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
                }
            }

            function xC(e, t = "emptyOnly") {
                const n = e.pathFromRoot;
                let r = 0;
                if ("always" !== t)
                    for (r = n.length - 1; r >= 1;) {
                        const o = n[r],
                            i = n[r - 1];
                        if (o.routeConfig && "" === o.routeConfig.path) r--;
                        else {
                            if (i.component) break;
                            r--
                        }
                    }
                return function KP(e) {
                    return e.reduce((t, n) => ({
                        params: {
                            ...t.params,
                            ...n.params
                        },
                        data: {
                            ...t.data,
                            ...n.data
                        },
                        resolve: {
                            ...n.data,
                            ...t.resolve,
                            ...n.routeConfig?.data,
                            ...n._resolvedData
                        }
                    }), {
                        params: {},
                        data: {},
                        resolve: {}
                    })
                }(n.slice(r))
            }
            class xa {
                get title() {
                    return this.data?.[fi]
                }
                constructor(t, n, r, o, i, s, a, u, c) {
                    this.url = t, this.params = n, this.queryParams = r, this.fragment = o, this.data = i, this.outlet = s, this.component = a, this.routeConfig = u, this._resolve = c
                }
                get root() {
                    return this._routerState.root
                }
                get parent() {
                    return this._routerState.parent(this)
                }
                get firstChild() {
                    return this._routerState.firstChild(this)
                }
                get children() {
                    return this._routerState.children(this)
                }
                get pathFromRoot() {
                    return this._routerState.pathFromRoot(this)
                }
                get paramMap() {
                    return this._paramMap || (this._paramMap = zr(this.params)), this._paramMap
                }
                get queryParamMap() {
                    return this._queryParamMap || (this._queryParamMap = zr(this.queryParams)), this._queryParamMap
                }
                toString() {
                    return `Route(url:'${this.url.map(r=>r.toString()).join("/")}', path:'${this.routeConfig?this.routeConfig.path:""}')`
                }
            }
            class OC extends AC {
                constructor(t, n) {
                    super(n), this.url = t, Pd(this, n)
                }
                toString() {
                    return PC(this._root)
                }
            }

            function Pd(e, t) {
                t.value._routerState = e, t.children.forEach(n => Pd(e, n))
            }

            function PC(e) {
                const t = e.children.length > 0 ? ` { ${e.children.map(PC).join(", ")} } ` : "";
                return `${e.value}${t}`
            }

            function Fd(e) {
                if (e.snapshot) {
                    const t = e.snapshot,
                        n = e._futureSnapshot;
                    e.snapshot = n, jt(t.queryParams, n.queryParams) || e.queryParamsSubject.next(n.queryParams), t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment), jt(t.params, n.params) || e.paramsSubject.next(n.params),
                        function hP(e, t) {
                            if (e.length !== t.length) return !1;
                            for (let n = 0; n < e.length; ++n)
                                if (!jt(e[n], t[n])) return !1;
                            return !0
                        }(t.url, n.url) || e.urlSubject.next(n.url), jt(t.data, n.data) || e.dataSubject.next(n.data)
                } else e.snapshot = e._futureSnapshot, e.dataSubject.next(e._futureSnapshot.data)
            }

            function kd(e, t) {
                const n = jt(e.params, t.params) && function vP(e, t) {
                    return Un(e, t) && e.every((n, r) => jt(n.parameters, t[r].parameters))
                }(e.url, t.url);
                return n && !(!e.parent != !t.parent) && (!e.parent || kd(e.parent, t.parent))
            }
            let Ld = (() => {
                class e {
                    constructor() {
                        this.activated = null, this._activatedRoute = null, this.name = L, this.activateEvents = new ke, this.deactivateEvents = new ke, this.attachEvents = new ke, this.detachEvents = new ke, this.parentContexts = _(Ci), this.location = _(_t), this.changeDetector = _($l), this.environmentInjector = _(at), this.inputBinder = _(Oa, {
                            optional: !0
                        }), this.supportsBindingToComponentInputs = !0
                    }
                    get activatedComponentRef() {
                        return this.activated
                    }
                    ngOnChanges(n) {
                        if (n.name) {
                            const {
                                firstChange: r,
                                previousValue: o
                            } = n.name;
                            if (r) return;
                            this.isTrackedInParentContexts(o) && (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)), this.initializeOutletWithName()
                        }
                    }
                    ngOnDestroy() {
                        this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name), this.inputBinder?.unsubscribeFromRouteData(this)
                    }
                    isTrackedInParentContexts(n) {
                        return this.parentContexts.getContext(n)?.outlet === this
                    }
                    ngOnInit() {
                        this.initializeOutletWithName()
                    }
                    initializeOutletWithName() {
                        if (this.parentContexts.onChildOutletCreated(this.name, this), this.activated) return;
                        const n = this.parentContexts.getContext(this.name);
                        n?.route && (n.attachRef ? this.attach(n.attachRef, n.route) : this.activateWith(n.route, n.injector))
                    }
                    get isActivated() {
                        return !!this.activated
                    }
                    get component() {
                        if (!this.activated) throw new C(4012, !1);
                        return this.activated.instance
                    }
                    get activatedRoute() {
                        if (!this.activated) throw new C(4012, !1);
                        return this._activatedRoute
                    }
                    get activatedRouteData() {
                        return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
                    }
                    detach() {
                        if (!this.activated) throw new C(4012, !1);
                        this.location.detach();
                        const n = this.activated;
                        return this.activated = null, this._activatedRoute = null, this.detachEvents.emit(n.instance), n
                    }
                    attach(n, r) {
                        this.activated = n, this._activatedRoute = r, this.location.insert(n.hostView), this.inputBinder?.bindActivatedRouteToOutletComponent(this), this.attachEvents.emit(n.instance)
                    }
                    deactivate() {
                        if (this.activated) {
                            const n = this.component;
                            this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(n)
                        }
                    }
                    activateWith(n, r) {
                        if (this.isActivated) throw new C(4013, !1);
                        this._activatedRoute = n;
                        const o = this.location,
                            s = n.snapshot.component,
                            a = this.parentContexts.getOrCreateContext(this.name).children,
                            u = new XP(n, a, o.injector);
                        this.activated = o.createComponent(s, {
                            index: o.length,
                            injector: u,
                            environmentInjector: r ?? this.environmentInjector
                        }), this.changeDetector.markForCheck(), this.inputBinder?.bindActivatedRouteToOutletComponent(this), this.activateEvents.emit(this.activated.instance)
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275dir = Ne({
                        type: e,
                        selectors: [
                            ["router-outlet"]
                        ],
                        inputs: {
                            name: "name"
                        },
                        outputs: {
                            activateEvents: "activate",
                            deactivateEvents: "deactivate",
                            attachEvents: "attach",
                            detachEvents: "detach"
                        },
                        exportAs: ["outlet"],
                        standalone: !0,
                        features: [Nn]
                    })
                }
                return e
            })();
            class XP {
                constructor(t, n, r) {
                    this.route = t, this.childContexts = n, this.parent = r
                }
                get(t, n) {
                    return t === Gn ? this.route : t === Ci ? this.childContexts : this.parent.get(t, n)
                }
            }
            const Oa = new I("");
            let FC = (() => {
                class e {
                    constructor() {
                        this.outletDataSubscriptions = new Map
                    }
                    bindActivatedRouteToOutletComponent(n) {
                        this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n)
                    }
                    unsubscribeFromRouteData(n) {
                        this.outletDataSubscriptions.get(n)?.unsubscribe(), this.outletDataSubscriptions.delete(n)
                    }
                    subscribeToRouteData(n) {
                        const {
                            activatedRoute: r
                        } = n, o = Cd([r.queryParams, r.params, r.data]).pipe(St(([i, s, a], u) => (a = {
                            ...i,
                            ...s,
                            ...a
                        }, 0 === u ? x(a) : Promise.resolve(a)))).subscribe(i => {
                            if (!n.isActivated || !n.activatedComponentRef || n.activatedRoute !== r || null === r.component) return void this.unsubscribeFromRouteData(n);
                            const s = function vR(e) {
                                const t = B(e);
                                if (!t) return null;
                                const n = new Vo(t);
                                return {
                                    get selector() {
                                        return n.selector
                                    },
                                    get type() {
                                        return n.componentType
                                    },
                                    get inputs() {
                                        return n.inputs
                                    },
                                    get outputs() {
                                        return n.outputs
                                    },
                                    get ngContentSelectors() {
                                        return n.ngContentSelectors
                                    },
                                    get isStandalone() {
                                        return t.standalone
                                    },
                                    get isSignal() {
                                        return t.signals
                                    }
                                }
                            }(r.component);
                            if (s)
                                for (const {
                                        templateName: a
                                    }
                                    of s.inputs) n.activatedComponentRef.setInput(a, i[a]);
                            else this.unsubscribeFromRouteData(n)
                        });
                        this.outletDataSubscriptions.set(n, o)
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();

            function wi(e, t, n) {
                if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
                    const r = n.value;
                    r._futureSnapshot = t.value;
                    const o = function e1(e, t, n) {
                        return t.children.map(r => {
                            for (const o of n.children)
                                if (e.shouldReuseRoute(r.value, o.value.snapshot)) return wi(e, r, o);
                            return wi(e, r)
                        })
                    }(e, t, n);
                    return new nn(r, o)
                } {
                    if (e.shouldAttach(t.value)) {
                        const i = e.retrieve(t.value);
                        if (null !== i) {
                            const s = i.route;
                            return s.value._futureSnapshot = t.value, s.children = t.children.map(a => wi(e, a)), s
                        }
                    }
                    const r = function t1(e) {
                            return new Gn(new rt(e.url), new rt(e.params), new rt(e.queryParams), new rt(e.fragment), new rt(e.data), e.outlet, e.component, e)
                        }(t.value),
                        o = t.children.map(i => wi(e, i));
                    return new nn(r, o)
                }
            }
            const jd = "ngNavigationCancelingError";

            function kC(e, t) {
                const {
                    redirectTo: n,
                    navigationBehaviorOptions: r
                } = zn(t) ? {
                    redirectTo: t,
                    navigationBehaviorOptions: void 0
                } : t, o = LC(!1, 0, t);
                return o.url = n, o.navigationBehaviorOptions = r, o
            }

            function LC(e, t, n) {
                const r = new Error("NavigationCancelingError: " + (e || ""));
                return r[jd] = !0, r.cancellationCode = t, n && (r.url = n), r
            }

            function jC(e) {
                return e && e[jd]
            }
            let $C = (() => {
                class e {
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275cmp = Ut({
                        type: e,
                        selectors: [
                            ["ng-component"]
                        ],
                        standalone: !0,
                        features: [Uv],
                        decls: 1,
                        vars: 0,
                        template: function(r, o) {
                            1 & r && De(0, "router-outlet")
                        },
                        dependencies: [Ld],
                        encapsulation: 2
                    })
                }
                return e
            })();

            function $d(e) {
                const t = e.children && e.children.map($d),
                    n = t ? {
                        ...e,
                        children: t
                    } : {
                        ...e
                    };
                return !n.component && !n.loadComponent && (t || n.loadChildren) && n.outlet && n.outlet !== L && (n.component = $C), n
            }

            function bt(e) {
                return e.outlet || L
            }

            function _i(e) {
                if (!e) return null;
                if (e.routeConfig?._injector) return e.routeConfig._injector;
                for (let t = e.parent; t; t = t.parent) {
                    const n = t.routeConfig;
                    if (n?._loadedInjector) return n._loadedInjector;
                    if (n?._injector) return n._injector
                }
                return null
            }
            class c1 {
                constructor(t, n, r, o, i) {
                    this.routeReuseStrategy = t, this.futureState = n, this.currState = r, this.forwardEvent = o, this.inputBindingEnabled = i
                }
                activate(t) {
                    const n = this.futureState._root,
                        r = this.currState ? this.currState._root : null;
                    this.deactivateChildRoutes(n, r, t), Fd(this.futureState.root), this.activateChildRoutes(n, r, t)
                }
                deactivateChildRoutes(t, n, r) {
                    const o = Wr(n);
                    t.children.forEach(i => {
                        const s = i.value.outlet;
                        this.deactivateRoutes(i, o[s], r), delete o[s]
                    }), Object.values(o).forEach(i => {
                        this.deactivateRouteAndItsChildren(i, r)
                    })
                }
                deactivateRoutes(t, n, r) {
                    const o = t.value,
                        i = n ? n.value : null;
                    if (o === i)
                        if (o.component) {
                            const s = r.getContext(o.outlet);
                            s && this.deactivateChildRoutes(t, n, s.children)
                        } else this.deactivateChildRoutes(t, n, r);
                    else i && this.deactivateRouteAndItsChildren(n, r)
                }
                deactivateRouteAndItsChildren(t, n) {
                    t.value.component && this.routeReuseStrategy.shouldDetach(t.value.snapshot) ? this.detachAndStoreRouteSubtree(t, n) : this.deactivateRouteAndOutlet(t, n)
                }
                detachAndStoreRouteSubtree(t, n) {
                    const r = n.getContext(t.value.outlet),
                        o = r && t.value.component ? r.children : n,
                        i = Wr(t);
                    for (const s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], o);
                    if (r && r.outlet) {
                        const s = r.outlet.detach(),
                            a = r.children.onOutletDeactivated();
                        this.routeReuseStrategy.store(t.value.snapshot, {
                            componentRef: s,
                            route: t,
                            contexts: a
                        })
                    }
                }
                deactivateRouteAndOutlet(t, n) {
                    const r = n.getContext(t.value.outlet),
                        o = r && t.value.component ? r.children : n,
                        i = Wr(t);
                    for (const s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], o);
                    r && (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()), r.attachRef = null, r.route = null)
                }
                activateChildRoutes(t, n, r) {
                    const o = Wr(n);
                    t.children.forEach(i => {
                        this.activateRoutes(i, o[i.value.outlet], r), this.forwardEvent(new ZP(i.value.snapshot))
                    }), t.children.length && this.forwardEvent(new qP(t.value.snapshot))
                }
                activateRoutes(t, n, r) {
                    const o = t.value,
                        i = n ? n.value : null;
                    if (Fd(o), o === i)
                        if (o.component) {
                            const s = r.getOrCreateContext(o.outlet);
                            this.activateChildRoutes(t, n, s.children)
                        } else this.activateChildRoutes(t, n, r);
                    else if (o.component) {
                        const s = r.getOrCreateContext(o.outlet);
                        if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
                            const a = this.routeReuseStrategy.retrieve(o.snapshot);
                            this.routeReuseStrategy.store(o.snapshot, null), s.children.onOutletReAttached(a.contexts), s.attachRef = a.componentRef, s.route = a.route.value, s.outlet && s.outlet.attach(a.componentRef, a.route.value), Fd(a.route.value), this.activateChildRoutes(t, null, s.children)
                        } else {
                            const a = _i(o.snapshot);
                            s.attachRef = null, s.route = o, s.injector = a, s.outlet && s.outlet.activateWith(o, s.injector), this.activateChildRoutes(t, null, s.children)
                        }
                    } else this.activateChildRoutes(t, null, r)
                }
            }
            class VC {
                constructor(t) {
                    this.path = t, this.route = this.path[this.path.length - 1]
                }
            }
            class Pa {
                constructor(t, n) {
                    this.component = t, this.route = n
                }
            }

            function l1(e, t, n) {
                const r = e._root;
                return Ei(r, t ? t._root : null, n, [r.value])
            }

            function Zr(e, t) {
                const n = Symbol(),
                    r = t.get(e, n);
                return r === n ? "function" != typeof e || function y_(e) {
                    return null !== Oi(e)
                }(e) ? t.get(e) : e : r
            }

            function Ei(e, t, n, r, o = {
                canDeactivateChecks: [],
                canActivateChecks: []
            }) {
                const i = Wr(t);
                return e.children.forEach(s => {
                    (function f1(e, t, n, r, o = {
                        canDeactivateChecks: [],
                        canActivateChecks: []
                    }) {
                        const i = e.value,
                            s = t ? t.value : null,
                            a = n ? n.getContext(e.value.outlet) : null;
                        if (s && i.routeConfig === s.routeConfig) {
                            const u = function h1(e, t, n) {
                                if ("function" == typeof n) return n(e, t);
                                switch (n) {
                                    case "pathParamsChange":
                                        return !Un(e.url, t.url);
                                    case "pathParamsOrQueryParamsChange":
                                        return !Un(e.url, t.url) || !jt(e.queryParams, t.queryParams);
                                    case "always":
                                        return !0;
                                    case "paramsOrQueryParamsChange":
                                        return !kd(e, t) || !jt(e.queryParams, t.queryParams);
                                    default:
                                        return !kd(e, t)
                                }
                            }(s, i, i.routeConfig.runGuardsAndResolvers);
                            u ? o.canActivateChecks.push(new VC(r)) : (i.data = s.data, i._resolvedData = s._resolvedData), Ei(e, t, i.component ? a ? a.children : null : n, r, o), u && a && a.outlet && a.outlet.isActivated && o.canDeactivateChecks.push(new Pa(a.outlet.component, s))
                        } else s && Ii(t, a, o), o.canActivateChecks.push(new VC(r)), Ei(e, null, i.component ? a ? a.children : null : n, r, o)
                    })(s, i[s.value.outlet], n, r.concat([s.value]), o), delete i[s.value.outlet]
                }), Object.entries(i).forEach(([s, a]) => Ii(a, n.getContext(s), o)), o
            }

            function Ii(e, t, n) {
                const r = Wr(e),
                    o = e.value;
                Object.entries(r).forEach(([i, s]) => {
                    Ii(s, o.component ? t ? t.children.getContext(i) : null : t, n)
                }), n.canDeactivateChecks.push(new Pa(o.component && t && t.outlet && t.outlet.isActivated ? t.outlet.component : null, o))
            }

            function bi(e) {
                return "function" == typeof e
            }

            function BC(e) {
                return e instanceof _a || "EmptyError" === e?.name
            }
            const Fa = Symbol("INITIAL_VALUE");

            function Qr() {
                return St(e => Cd(e.map(t => t.pipe(Ur(1), function oP(...e) {
                    const t = ro(e);
                    return pe((n, r) => {
                        (t ? wd(e, n, t) : wd(e, n)).subscribe(r)
                    })
                }(Fa)))).pipe(K(t => {
                    for (const n of t)
                        if (!0 !== n) {
                            if (n === Fa) return Fa;
                            if (!1 === n || n instanceof Gr) return n
                        } return !0
                }), wn(t => t !== Fa), Ur(1)))
            }

            function HC(e) {
                return function Dw(...e) {
                    return Kd(e)
                }(Ae(t => {
                    if (zn(t)) throw kC(0, t)
                }), K(t => !0 === t))
            }
            class ka {
                constructor(t) {
                    this.segmentGroup = t || null
                }
            }
            class UC {
                constructor(t) {
                    this.urlTree = t
                }
            }

            function Yr(e) {
                return li(new ka(e))
            }

            function zC(e) {
                return li(new UC(e))
            }
            class O1 {
                constructor(t, n) {
                    this.urlSerializer = t, this.urlTree = n
                }
                noMatchError(t) {
                    return new C(4002, !1)
                }
                lineralizeSegments(t, n) {
                    let r = [],
                        o = n.root;
                    for (;;) {
                        if (r = r.concat(o.segments), 0 === o.numberOfChildren) return x(r);
                        if (o.numberOfChildren > 1 || !o.children[L]) return li(new C(4e3, !1));
                        o = o.children[L]
                    }
                }
                applyRedirectCommands(t, n, r) {
                    return this.applyRedirectCreateUrlTree(n, this.urlSerializer.parse(n), t, r)
                }
                applyRedirectCreateUrlTree(t, n, r, o) {
                    const i = this.createSegmentGroup(t, n.root, r, o);
                    return new Gr(i, this.createQueryParams(n.queryParams, this.urlTree.queryParams), n.fragment)
                }
                createQueryParams(t, n) {
                    const r = {};
                    return Object.entries(t).forEach(([o, i]) => {
                        if ("string" == typeof i && i.startsWith(":")) {
                            const a = i.substring(1);
                            r[o] = n[a]
                        } else r[o] = i
                    }), r
                }
                createSegmentGroup(t, n, r, o) {
                    const i = this.createSegments(t, n.segments, r, o);
                    let s = {};
                    return Object.entries(n.children).forEach(([a, u]) => {
                        s[a] = this.createSegmentGroup(t, u, r, o)
                    }), new Z(i, s)
                }
                createSegments(t, n, r, o) {
                    return n.map(i => i.path.startsWith(":") ? this.findPosParam(t, i, o) : this.findOrReturn(i, r))
                }
                findPosParam(t, n, r) {
                    const o = r[n.path.substring(1)];
                    if (!o) throw new C(4001, !1);
                    return o
                }
                findOrReturn(t, n) {
                    let r = 0;
                    for (const o of n) {
                        if (o.path === t.path) return n.splice(r), o;
                        r++
                    }
                    return t
                }
            }
            const Vd = {
                matched: !1,
                consumedSegments: [],
                remainingSegments: [],
                parameters: {},
                positionalParamSegments: {}
            };

            function P1(e, t, n, r, o) {
                const i = Bd(e, t, n);
                return i.matched ? (r = function r1(e, t) {
                    return e.providers && !e._injector && (e._injector = gl(e.providers, t, `Route: ${e.path}`)), e._injector ?? t
                }(t, r), function N1(e, t, n, r) {
                    const o = t.canMatch;
                    return o && 0 !== o.length ? x(o.map(s => {
                        const a = Zr(s, e);
                        return _n(function D1(e) {
                            return e && bi(e.canMatch)
                        }(a) ? a.canMatch(t, n) : e.runInContext(() => a(t, n)))
                    })).pipe(Qr(), HC()) : x(!0)
                }(r, t, n).pipe(K(s => !0 === s ? i : {
                    ...Vd
                }))) : x(i)
            }

            function Bd(e, t, n) {
                if ("" === t.path) return "full" === t.pathMatch && (e.hasChildren() || n.length > 0) ? {
                    ...Vd
                } : {
                    matched: !0,
                    consumedSegments: [],
                    remainingSegments: n,
                    parameters: {},
                    positionalParamSegments: {}
                };
                const o = (t.matcher || fP)(n, e, t);
                if (!o) return {
                    ...Vd
                };
                const i = {};
                Object.entries(o.posParams ?? {}).forEach(([a, u]) => {
                    i[a] = u.path
                });
                const s = o.consumed.length > 0 ? {
                    ...i,
                    ...o.consumed[o.consumed.length - 1].parameters
                } : i;
                return {
                    matched: !0,
                    consumedSegments: o.consumed,
                    remainingSegments: n.slice(o.consumed.length),
                    parameters: s,
                    positionalParamSegments: o.posParams ?? {}
                }
            }

            function GC(e, t, n, r) {
                return n.length > 0 && function L1(e, t, n) {
                    return n.some(r => La(e, t, r) && bt(r) !== L)
                }(e, n, r) ? {
                    segmentGroup: new Z(t, k1(r, new Z(n, e.children))),
                    slicedSegments: []
                } : 0 === n.length && function j1(e, t, n) {
                    return n.some(r => La(e, t, r))
                }(e, n, r) ? {
                    segmentGroup: new Z(e.segments, F1(e, 0, n, r, e.children)),
                    slicedSegments: n
                } : {
                    segmentGroup: new Z(e.segments, e.children),
                    slicedSegments: n
                }
            }

            function F1(e, t, n, r, o) {
                const i = {};
                for (const s of r)
                    if (La(e, n, s) && !o[bt(s)]) {
                        const a = new Z([], {});
                        i[bt(s)] = a
                    } return {
                    ...o,
                    ...i
                }
            }

            function k1(e, t) {
                const n = {};
                n[L] = t;
                for (const r of e)
                    if ("" === r.path && bt(r) !== L) {
                        const o = new Z([], {});
                        n[bt(r)] = o
                    } return n
            }

            function La(e, t, n) {
                return (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) && "" === n.path
            }
            class H1 {
                constructor(t, n, r, o, i, s, a) {
                    this.injector = t, this.configLoader = n, this.rootComponentType = r, this.config = o, this.urlTree = i, this.paramsInheritanceStrategy = s, this.urlSerializer = a, this.allowRedirects = !0, this.applyRedirects = new O1(this.urlSerializer, this.urlTree)
                }
                noMatchError(t) {
                    return new C(4002, !1)
                }
                recognize() {
                    const t = GC(this.urlTree.root, [], [], this.config).segmentGroup;
                    return this.processSegmentGroup(this.injector, this.config, t, L).pipe(Hn(n => {
                        if (n instanceof UC) return this.allowRedirects = !1, this.urlTree = n.urlTree, this.match(n.urlTree);
                        throw n instanceof ka ? this.noMatchError(n) : n
                    }), K(n => {
                        const r = new xa([], Object.freeze({}), Object.freeze({
                                ...this.urlTree.queryParams
                            }), this.urlTree.fragment, {}, L, this.rootComponentType, null, {}),
                            o = new nn(r, n),
                            i = new OC("", o),
                            s = function xP(e, t, n = null, r = null) {
                                return wC(CC(e), t, n, r)
                            }(r, [], this.urlTree.queryParams, this.urlTree.fragment);
                        return s.queryParams = this.urlTree.queryParams, i.url = this.urlSerializer.serialize(s), this.inheritParamsAndData(i._root), {
                            state: i,
                            tree: s
                        }
                    }))
                }
                match(t) {
                    return this.processSegmentGroup(this.injector, this.config, t.root, L).pipe(Hn(r => {
                        throw r instanceof ka ? this.noMatchError(r) : r
                    }))
                }
                inheritParamsAndData(t) {
                    const n = t.value,
                        r = xC(n, this.paramsInheritanceStrategy);
                    n.params = Object.freeze(r.params), n.data = Object.freeze(r.data), t.children.forEach(o => this.inheritParamsAndData(o))
                }
                processSegmentGroup(t, n, r, o) {
                    return 0 === r.segments.length && r.hasChildren() ? this.processChildren(t, n, r) : this.processSegment(t, n, r, r.segments, o, !0)
                }
                processChildren(t, n, r) {
                    const o = [];
                    for (const i of Object.keys(r.children)) "primary" === i ? o.unshift(i) : o.push(i);
                    return we(o).pipe(di(i => {
                        const s = r.children[i],
                            a = function a1(e, t) {
                                const n = e.filter(r => bt(r) === t);
                                return n.push(...e.filter(r => bt(r) !== t)), n
                            }(n, i);
                        return this.processSegmentGroup(t, a, s, i)
                    }), function aP(e, t) {
                        return pe(function sP(e, t, n, r, o) {
                            return (i, s) => {
                                let a = n,
                                    u = t,
                                    c = 0;
                                i.subscribe(ge(s, l => {
                                    const d = c++;
                                    u = a ? e(u, l, d) : (a = !0, l), r && s.next(u)
                                }, o && (() => {
                                    a && s.next(u), s.complete()
                                })))
                            }
                        }(e, t, arguments.length >= 2, !0))
                    }((i, s) => (i.push(...s), i)), Ea(null), function uP(e, t) {
                        const n = arguments.length >= 2;
                        return r => r.pipe(e ? wn((o, i) => e(o, i, r)) : sn, Ed(1), n ? Ea(t) : aC(() => new _a))
                    }(), Ce(i => {
                        if (null === i) return Yr(r);
                        const s = qC(i);
                        return function U1(e) {
                            e.sort((t, n) => t.value.outlet === L ? -1 : n.value.outlet === L ? 1 : t.value.outlet.localeCompare(n.value.outlet))
                        }(s), x(s)
                    }))
                }
                processSegment(t, n, r, o, i, s) {
                    return we(n).pipe(di(a => this.processSegmentAgainstRoute(a._injector ?? t, n, a, r, o, i, s).pipe(Hn(u => {
                        if (u instanceof ka) return x(null);
                        throw u
                    }))), Bn(a => !!a), Hn(a => {
                        if (BC(a)) return function V1(e, t, n) {
                            return 0 === t.length && !e.children[n]
                        }(r, o, i) ? x([]) : Yr(r);
                        throw a
                    }))
                }
                processSegmentAgainstRoute(t, n, r, o, i, s, a) {
                    return function $1(e, t, n, r) {
                        return !!(bt(e) === r || r !== L && La(t, n, e)) && ("**" === e.path || Bd(t, e, n).matched)
                    }(r, o, i, s) ? void 0 === r.redirectTo ? this.matchSegmentAgainstRoute(t, o, r, i, s, a) : a && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s) : Yr(o) : Yr(o)
                }
                expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
                    return "**" === o.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s) : this.expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
                }
                expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
                    const i = this.applyRedirects.applyRedirectCommands([], r.redirectTo, {});
                    return r.redirectTo.startsWith("/") ? zC(i) : this.applyRedirects.lineralizeSegments(r, i).pipe(Ce(s => {
                        const a = new Z(s, {});
                        return this.processSegment(t, n, a, s, o, !1)
                    }))
                }
                expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
                    const {
                        matched: a,
                        consumedSegments: u,
                        remainingSegments: c,
                        positionalParamSegments: l
                    } = Bd(n, o, i);
                    if (!a) return Yr(n);
                    const d = this.applyRedirects.applyRedirectCommands(u, o.redirectTo, l);
                    return o.redirectTo.startsWith("/") ? zC(d) : this.applyRedirects.lineralizeSegments(o, d).pipe(Ce(f => this.processSegment(t, r, n, f.concat(c), s, !1)))
                }
                matchSegmentAgainstRoute(t, n, r, o, i, s) {
                    let a;
                    if ("**" === r.path) {
                        const u = o.length > 0 ? cC(o).parameters : {};
                        a = x({
                            snapshot: new xa(o, u, Object.freeze({
                                ...this.urlTree.queryParams
                            }), this.urlTree.fragment, WC(r), bt(r), r.component ?? r._loadedComponent ?? null, r, ZC(r)),
                            consumedSegments: [],
                            remainingSegments: []
                        }), n.children = {}
                    } else a = P1(n, r, o, t).pipe(K(({
                        matched: u,
                        consumedSegments: c,
                        remainingSegments: l,
                        parameters: d
                    }) => u ? {
                        snapshot: new xa(c, d, Object.freeze({
                            ...this.urlTree.queryParams
                        }), this.urlTree.fragment, WC(r), bt(r), r.component ?? r._loadedComponent ?? null, r, ZC(r)),
                        consumedSegments: c,
                        remainingSegments: l
                    } : null));
                    return a.pipe(St(u => null === u ? Yr(n) : this.getChildConfig(t = r._injector ?? t, r, o).pipe(St(({
                        routes: c
                    }) => {
                        const l = r._loadedInjector ?? t,
                            {
                                snapshot: d,
                                consumedSegments: f,
                                remainingSegments: h
                            } = u,
                            {
                                segmentGroup: p,
                                slicedSegments: g
                            } = GC(n, f, h, c);
                        if (0 === g.length && p.hasChildren()) return this.processChildren(l, c, p).pipe(K(D => null === D ? null : [new nn(d, D)]));
                        if (0 === c.length && 0 === g.length) return x([new nn(d, [])]);
                        const y = bt(r) === i;
                        return this.processSegment(l, c, p, g, y ? L : i, !0).pipe(K(D => [new nn(d, D)]))
                    }))))
                }
                getChildConfig(t, n, r) {
                    return n.children ? x({
                        routes: n.children,
                        injector: t
                    }) : n.loadChildren ? void 0 !== n._loadedRoutes ? x({
                        routes: n._loadedRoutes,
                        injector: n._loadedInjector
                    }) : function A1(e, t, n, r) {
                        const o = t.canLoad;
                        return void 0 === o || 0 === o.length ? x(!0) : x(o.map(s => {
                            const a = Zr(s, e);
                            return _n(function g1(e) {
                                return e && bi(e.canLoad)
                            }(a) ? a.canLoad(t, n) : e.runInContext(() => a(t, n)))
                        })).pipe(Qr(), HC())
                    }(t, n, r).pipe(Ce(o => o ? this.configLoader.loadChildren(t, n).pipe(Ae(i => {
                        n._loadedRoutes = i.routes, n._loadedInjector = i.injector
                    })) : function x1(e) {
                        return li(LC(!1, 3))
                    }())) : x({
                        routes: [],
                        injector: t
                    })
                }
            }

            function z1(e) {
                const t = e.value.routeConfig;
                return t && "" === t.path
            }

            function qC(e) {
                const t = [],
                    n = new Set;
                for (const r of e) {
                    if (!z1(r)) {
                        t.push(r);
                        continue
                    }
                    const o = t.find(i => r.value.routeConfig === i.value.routeConfig);
                    void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r)
                }
                for (const r of n) {
                    const o = qC(r.children);
                    t.push(new nn(r.value, o))
                }
                return t.filter(r => !n.has(r))
            }

            function WC(e) {
                return e.data || {}
            }

            function ZC(e) {
                return e.resolve || {}
            }

            function QC(e) {
                return "string" == typeof e.title || null === e.title
            }

            function Hd(e) {
                return St(t => {
                    const n = e(t);
                    return n ? we(n).pipe(K(() => t)) : x(t)
                })
            }
            const Kr = new I("ROUTES");
            let Ud = (() => {
                class e {
                    constructor() {
                        this.componentLoaders = new WeakMap, this.childrenLoaders = new WeakMap, this.compiler = _(ky)
                    }
                    loadComponent(n) {
                        if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
                        if (n._loadedComponent) return x(n._loadedComponent);
                        this.onLoadStartListener && this.onLoadStartListener(n);
                        const r = _n(n.loadComponent()).pipe(K(YC), Ae(i => {
                                this.onLoadEndListener && this.onLoadEndListener(n), n._loadedComponent = i
                            }), Id(() => {
                                this.componentLoaders.delete(n)
                            })),
                            o = new sC(r, () => new gt).pipe(_d());
                        return this.componentLoaders.set(n, o), o
                    }
                    loadChildren(n, r) {
                        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
                        if (r._loadedRoutes) return x({
                            routes: r._loadedRoutes,
                            injector: r._loadedInjector
                        });
                        this.onLoadStartListener && this.onLoadStartListener(r);
                        const i = function K1(e, t, n, r) {
                                return _n(e.loadChildren()).pipe(K(YC), Ce(o => o instanceof Bv || Array.isArray(o) ? x(o) : we(t.compileModuleAsync(o))), K(o => {
                                    r && r(e);
                                    let i, s, a = !1;
                                    return Array.isArray(o) ? (s = o, !0) : (i = o.create(n).injector, s = i.get(Kr, [], {
                                        optional: !0,
                                        self: !0
                                    }).flat()), {
                                        routes: s.map($d),
                                        injector: i
                                    }
                                }))
                            }(r, this.compiler, n, this.onLoadEndListener).pipe(Id(() => {
                                this.childrenLoaders.delete(r)
                            })),
                            s = new sC(i, () => new gt).pipe(_d());
                        return this.childrenLoaders.set(r, s), s
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();

            function YC(e) {
                return function X1(e) {
                    return e && "object" == typeof e && "default" in e
                }(e) ? e.default : e
            }
            let ja = (() => {
                class e {
                    get hasRequestedNavigation() {
                        return 0 !== this.navigationId
                    }
                    constructor() {
                        this.currentNavigation = null, this.currentTransition = null, this.lastSuccessfulNavigation = null, this.events = new gt, this.transitionAbortSubject = new gt, this.configLoader = _(Ud), this.environmentInjector = _(at), this.urlSerializer = _(pi), this.rootContexts = _(Ci), this.inputBindingEnabled = null !== _(Oa, {
                            optional: !0
                        }), this.navigationId = 0, this.afterPreactivation = () => x(void 0), this.rootComponentType = null, this.configLoader.onLoadEndListener = o => this.events.next(new zP(o)), this.configLoader.onLoadStartListener = o => this.events.next(new UP(o))
                    }
                    complete() {
                        this.transitions?.complete()
                    }
                    handleNavigationRequest(n) {
                        const r = ++this.navigationId;
                        this.transitions?.next({
                            ...this.transitions.value,
                            ...n,
                            id: r
                        })
                    }
                    setupNavigations(n, r, o) {
                        return this.transitions = new rt({
                            id: 0,
                            currentUrlTree: r,
                            currentRawUrl: r,
                            currentBrowserUrl: r,
                            extractedUrl: n.urlHandlingStrategy.extract(r),
                            urlAfterRedirects: n.urlHandlingStrategy.extract(r),
                            rawUrl: r,
                            extras: {},
                            resolve: null,
                            reject: null,
                            promise: Promise.resolve(!0),
                            source: yi,
                            restoredState: null,
                            currentSnapshot: o.snapshot,
                            targetSnapshot: null,
                            currentRouterState: o,
                            targetRouterState: null,
                            guards: {
                                canActivateChecks: [],
                                canDeactivateChecks: []
                            },
                            guardsResult: null
                        }), this.transitions.pipe(wn(i => 0 !== i.id), K(i => ({
                            ...i,
                            extractedUrl: n.urlHandlingStrategy.extract(i.rawUrl)
                        })), St(i => {
                            this.currentTransition = i;
                            let s = !1,
                                a = !1;
                            return x(i).pipe(Ae(u => {
                                this.currentNavigation = {
                                    id: u.id,
                                    initialUrl: u.rawUrl,
                                    extractedUrl: u.extractedUrl,
                                    trigger: u.source,
                                    extras: u.extras,
                                    previousNavigation: this.lastSuccessfulNavigation ? {
                                        ...this.lastSuccessfulNavigation,
                                        previousNavigation: null
                                    } : null
                                }
                            }), St(u => {
                                const c = u.currentBrowserUrl.toString(),
                                    l = !n.navigated || u.extractedUrl.toString() !== c || c !== u.currentUrlTree.toString();
                                if (!l && "reload" !== (u.extras.onSameUrlNavigation ?? n.onSameUrlNavigation)) {
                                    const f = "";
                                    return this.events.next(new qr(u.id, this.urlSerializer.serialize(u.rawUrl), f, 0)), u.resolve(null), Mt
                                }
                                if (n.urlHandlingStrategy.shouldProcessUrl(u.rawUrl)) return x(u).pipe(St(f => {
                                    const h = this.transitions?.getValue();
                                    return this.events.next(new Na(f.id, this.urlSerializer.serialize(f.extractedUrl), f.source, f.restoredState)), h !== this.transitions?.getValue() ? Mt : Promise.resolve(f)
                                }), function G1(e, t, n, r, o, i) {
                                    return Ce(s => function B1(e, t, n, r, o, i, s = "emptyOnly") {
                                        return new H1(e, t, n, r, o, s, i).recognize()
                                    }(e, t, n, r, s.extractedUrl, o, i).pipe(K(({
                                        state: a,
                                        tree: u
                                    }) => ({
                                        ...s,
                                        targetSnapshot: a,
                                        urlAfterRedirects: u
                                    }))))
                                }(this.environmentInjector, this.configLoader, this.rootComponentType, n.config, this.urlSerializer, n.paramsInheritanceStrategy), Ae(f => {
                                    i.targetSnapshot = f.targetSnapshot, i.urlAfterRedirects = f.urlAfterRedirects, this.currentNavigation = {
                                        ...this.currentNavigation,
                                        finalUrl: f.urlAfterRedirects
                                    };
                                    const h = new SC(f.id, this.urlSerializer.serialize(f.extractedUrl), this.urlSerializer.serialize(f.urlAfterRedirects), f.targetSnapshot);
                                    this.events.next(h)
                                }));
                                if (l && n.urlHandlingStrategy.shouldProcessUrl(u.currentRawUrl)) {
                                    const {
                                        id: f,
                                        extractedUrl: h,
                                        source: p,
                                        restoredState: g,
                                        extras: y
                                    } = u, D = new Na(f, this.urlSerializer.serialize(h), p, g);
                                    this.events.next(D);
                                    const m = RC(0, this.rootComponentType).snapshot;
                                    return this.currentTransition = i = {
                                        ...u,
                                        targetSnapshot: m,
                                        urlAfterRedirects: h,
                                        extras: {
                                            ...y,
                                            skipLocationChange: !1,
                                            replaceUrl: !1
                                        }
                                    }, x(i)
                                } {
                                    const f = "";
                                    return this.events.next(new qr(u.id, this.urlSerializer.serialize(u.extractedUrl), f, 1)), u.resolve(null), Mt
                                }
                            }), Ae(u => {
                                const c = new $P(u.id, this.urlSerializer.serialize(u.extractedUrl), this.urlSerializer.serialize(u.urlAfterRedirects), u.targetSnapshot);
                                this.events.next(c)
                            }), K(u => (this.currentTransition = i = {
                                ...u,
                                guards: l1(u.targetSnapshot, u.currentSnapshot, this.rootContexts)
                            }, i)), function w1(e, t) {
                                return Ce(n => {
                                    const {
                                        targetSnapshot: r,
                                        currentSnapshot: o,
                                        guards: {
                                            canActivateChecks: i,
                                            canDeactivateChecks: s
                                        }
                                    } = n;
                                    return 0 === s.length && 0 === i.length ? x({
                                        ...n,
                                        guardsResult: !0
                                    }) : function _1(e, t, n, r) {
                                        return we(e).pipe(Ce(o => function T1(e, t, n, r, o) {
                                            const i = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
                                            return i && 0 !== i.length ? x(i.map(a => {
                                                const u = _i(t) ?? o,
                                                    c = Zr(a, u);
                                                return _n(function y1(e) {
                                                    return e && bi(e.canDeactivate)
                                                }(c) ? c.canDeactivate(e, t, n, r) : u.runInContext(() => c(e, t, n, r))).pipe(Bn())
                                            })).pipe(Qr()) : x(!0)
                                        }(o.component, o.route, n, t, r)), Bn(o => !0 !== o, !0))
                                    }(s, r, o, e).pipe(Ce(a => a && function p1(e) {
                                        return "boolean" == typeof e
                                    }(a) ? function E1(e, t, n, r) {
                                        return we(t).pipe(di(o => wd(function b1(e, t) {
                                            return null !== e && t && t(new GP(e)), x(!0)
                                        }(o.route.parent, r), function I1(e, t) {
                                            return null !== e && t && t(new WP(e)), x(!0)
                                        }(o.route, r), function S1(e, t, n) {
                                            const r = t[t.length - 1],
                                                i = t.slice(0, t.length - 1).reverse().map(s => function d1(e) {
                                                    const t = e.routeConfig ? e.routeConfig.canActivateChild : null;
                                                    return t && 0 !== t.length ? {
                                                        node: e,
                                                        guards: t
                                                    } : null
                                                }(s)).filter(s => null !== s).map(s => iC(() => x(s.guards.map(u => {
                                                    const c = _i(s.node) ?? n,
                                                        l = Zr(u, c);
                                                    return _n(function v1(e) {
                                                        return e && bi(e.canActivateChild)
                                                    }(l) ? l.canActivateChild(r, e) : c.runInContext(() => l(r, e))).pipe(Bn())
                                                })).pipe(Qr())));
                                            return x(i).pipe(Qr())
                                        }(e, o.path, n), function M1(e, t, n) {
                                            const r = t.routeConfig ? t.routeConfig.canActivate : null;
                                            if (!r || 0 === r.length) return x(!0);
                                            const o = r.map(i => iC(() => {
                                                const s = _i(t) ?? n,
                                                    a = Zr(i, s);
                                                return _n(function m1(e) {
                                                    return e && bi(e.canActivate)
                                                }(a) ? a.canActivate(t, e) : s.runInContext(() => a(t, e))).pipe(Bn())
                                            }));
                                            return x(o).pipe(Qr())
                                        }(e, o.route, n))), Bn(o => !0 !== o, !0))
                                    }(r, i, e, t) : x(a)), K(a => ({
                                        ...n,
                                        guardsResult: a
                                    })))
                                })
                            }(this.environmentInjector, u => this.events.next(u)), Ae(u => {
                                if (i.guardsResult = u.guardsResult, zn(u.guardsResult)) throw kC(0, u.guardsResult);
                                const c = new VP(u.id, this.urlSerializer.serialize(u.extractedUrl), this.urlSerializer.serialize(u.urlAfterRedirects), u.targetSnapshot, !!u.guardsResult);
                                this.events.next(c)
                            }), wn(u => !!u.guardsResult || (this.cancelNavigationTransition(u, "", 3), !1)), Hd(u => {
                                if (u.guards.canActivateChecks.length) return x(u).pipe(Ae(c => {
                                    const l = new BP(c.id, this.urlSerializer.serialize(c.extractedUrl), this.urlSerializer.serialize(c.urlAfterRedirects), c.targetSnapshot);
                                    this.events.next(l)
                                }), St(c => {
                                    let l = !1;
                                    return x(c).pipe(function q1(e, t) {
                                        return Ce(n => {
                                            const {
                                                targetSnapshot: r,
                                                guards: {
                                                    canActivateChecks: o
                                                }
                                            } = n;
                                            if (!o.length) return x(n);
                                            let i = 0;
                                            return we(o).pipe(di(s => function W1(e, t, n, r) {
                                                const o = e.routeConfig,
                                                    i = e._resolve;
                                                return void 0 !== o?.title && !QC(o) && (i[fi] = o.title),
                                                    function Z1(e, t, n, r) {
                                                        const o = function Q1(e) {
                                                            return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)]
                                                        }(e);
                                                        if (0 === o.length) return x({});
                                                        const i = {};
                                                        return we(o).pipe(Ce(s => function Y1(e, t, n, r) {
                                                            const o = _i(t) ?? r,
                                                                i = Zr(e, o);
                                                            return _n(i.resolve ? i.resolve(t, n) : o.runInContext(() => i(t, n)))
                                                        }(e[s], t, n, r).pipe(Bn(), Ae(a => {
                                                            i[s] = a
                                                        }))), Ed(1), function cP(e) {
                                                            return K(() => e)
                                                        }(i), Hn(s => BC(s) ? Mt : li(s)))
                                                    }(i, e, t, r).pipe(K(s => (e._resolvedData = s, e.data = xC(e, n).resolve, o && QC(o) && (e.data[fi] = o.title), null)))
                                            }(s.route, r, e, t)), Ae(() => i++), Ed(1), Ce(s => i === o.length ? x(n) : Mt))
                                        })
                                    }(n.paramsInheritanceStrategy, this.environmentInjector), Ae({
                                        next: () => l = !0,
                                        complete: () => {
                                            l || this.cancelNavigationTransition(c, "", 2)
                                        }
                                    }))
                                }), Ae(c => {
                                    const l = new HP(c.id, this.urlSerializer.serialize(c.extractedUrl), this.urlSerializer.serialize(c.urlAfterRedirects), c.targetSnapshot);
                                    this.events.next(l)
                                }))
                            }), Hd(u => {
                                const c = l => {
                                    const d = [];
                                    l.routeConfig?.loadComponent && !l.routeConfig._loadedComponent && d.push(this.configLoader.loadComponent(l.routeConfig).pipe(Ae(f => {
                                        l.component = f
                                    }), K(() => {})));
                                    for (const f of l.children) d.push(...c(f));
                                    return d
                                };
                                return Cd(c(u.targetSnapshot.root)).pipe(Ea(), Ur(1))
                            }), Hd(() => this.afterPreactivation()), K(u => {
                                const c = function JP(e, t, n) {
                                    const r = wi(e, t._root, n ? n._root : void 0);
                                    return new NC(r, t)
                                }(n.routeReuseStrategy, u.targetSnapshot, u.currentRouterState);
                                return this.currentTransition = i = {
                                    ...u,
                                    targetRouterState: c
                                }, i
                            }), Ae(() => {
                                this.events.next(new Nd)
                            }), ((e, t, n, r) => K(o => (new c1(t, o.targetRouterState, o.currentRouterState, n, r).activate(e), o)))(this.rootContexts, n.routeReuseStrategy, u => this.events.next(u), this.inputBindingEnabled), Ur(1), Ae({
                                next: u => {
                                    s = !0, this.lastSuccessfulNavigation = this.currentNavigation, this.events.next(new En(u.id, this.urlSerializer.serialize(u.extractedUrl), this.urlSerializer.serialize(u.urlAfterRedirects))), n.titleStrategy?.updateTitle(u.targetRouterState.snapshot), u.resolve(!0)
                                },
                                complete: () => {
                                    s = !0
                                }
                            }), function lP(e) {
                                return pe((t, n) => {
                                    nt(e).subscribe(ge(n, () => n.complete(), Va)), !n.closed && t.subscribe(n)
                                })
                            }(this.transitionAbortSubject.pipe(Ae(u => {
                                throw u
                            }))), Id(() => {
                                s || a || this.cancelNavigationTransition(i, "", 1), this.currentNavigation?.id === i.id && (this.currentNavigation = null)
                            }), Hn(u => {
                                if (a = !0, jC(u)) this.events.next(new Di(i.id, this.urlSerializer.serialize(i.extractedUrl), u.message, u.cancellationCode)),
                                    function n1(e) {
                                        return jC(e) && zn(e.url)
                                    }(u) ? this.events.next(new Rd(u.url)) : i.resolve(!1);
                                else {
                                    this.events.next(new Ra(i.id, this.urlSerializer.serialize(i.extractedUrl), u, i.targetSnapshot ?? void 0));
                                    try {
                                        i.resolve(n.errorHandler(u))
                                    } catch (c) {
                                        i.reject(c)
                                    }
                                }
                                return Mt
                            }))
                        }))
                    }
                    cancelNavigationTransition(n, r, o) {
                        const i = new Di(n.id, this.urlSerializer.serialize(n.extractedUrl), r, o);
                        this.events.next(i), n.resolve(!1)
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();

            function KC(e) {
                return e !== yi
            }
            let XC = (() => {
                    class e {
                        buildTitle(n) {
                            let r, o = n.root;
                            for (; void 0 !== o;) r = this.getResolvedTitleForRoute(o) ?? r, o = o.children.find(i => i.outlet === L);
                            return r
                        }
                        getResolvedTitleForRoute(n) {
                            return n.data[fi]
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = S({
                            token: e,
                            factory: function() {
                                return _(J1)
                            },
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                J1 = (() => {
                    class e extends XC {
                        constructor(n) {
                            super(), this.title = n
                        }
                        updateTitle(n) {
                            const r = this.buildTitle(n);
                            void 0 !== r && this.title.setTitle(r)
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(b(eC))
                        };
                        static #t = this.\u0275prov = S({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                eF = (() => {
                    class e {
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = S({
                            token: e,
                            factory: function() {
                                return _(nF)
                            },
                            providedIn: "root"
                        })
                    }
                    return e
                })();
            class tF {
                shouldDetach(t) {
                    return !1
                }
                store(t, n) {}
                shouldAttach(t) {
                    return !1
                }
                retrieve(t) {
                    return null
                }
                shouldReuseRoute(t, n) {
                    return t.routeConfig === n.routeConfig
                }
            }
            let nF = (() => {
                class e extends tF {
                    static #e = this.\u0275fac = function() {
                        let n;
                        return function(o) {
                            return (n || (n = function Hh(e) {
                                return Bt(() => {
                                    const t = e.prototype.constructor,
                                        n = t[Ht] || Lu(t),
                                        r = Object.prototype;
                                    let o = Object.getPrototypeOf(e.prototype).constructor;
                                    for (; o && o !== r;) {
                                        const i = o[Ht] || Lu(o);
                                        if (i && i !== n) return i;
                                        o = Object.getPrototypeOf(o)
                                    }
                                    return i => new i
                                })
                            }(e)))(o || e)
                        }
                    }();
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            const $a = new I("", {
                providedIn: "root",
                factory: () => ({})
            });
            let rF = (() => {
                    class e {
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = S({
                            token: e,
                            factory: function() {
                                return _(oF)
                            },
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                oF = (() => {
                    class e {
                        shouldProcessUrl(n) {
                            return !0
                        }
                        extract(n) {
                            return n
                        }
                        merge(n, r) {
                            return n
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = S({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })();
            var Mi = function(e) {
                return e[e.COMPLETE = 0] = "COMPLETE", e[e.FAILED = 1] = "FAILED", e[e.REDIRECTING = 2] = "REDIRECTING", e
            }(Mi || {});

            function JC(e, t) {
                e.events.pipe(wn(n => n instanceof En || n instanceof Di || n instanceof Ra || n instanceof qr), K(n => n instanceof En || n instanceof qr ? Mi.COMPLETE : n instanceof Di && (0 === n.code || 1 === n.code) ? Mi.REDIRECTING : Mi.FAILED), wn(n => n !== Mi.REDIRECTING), Ur(1)).subscribe(() => {
                    t()
                })
            }

            function iF(e) {
                throw e
            }

            function sF(e, t, n) {
                return t.parse("/")
            }
            const aF = {
                    paths: "exact",
                    fragment: "ignored",
                    matrixParams: "ignored",
                    queryParams: "exact"
                },
                uF = {
                    paths: "subset",
                    fragment: "ignored",
                    matrixParams: "ignored",
                    queryParams: "subset"
                };
            let pt = (() => {
                class e {
                    get navigationId() {
                        return this.navigationTransitions.navigationId
                    }
                    get browserPageId() {
                        return "computed" !== this.canceledNavigationResolution ? this.currentPageId : this.location.getState()?.\u0275routerPageId ?? this.currentPageId
                    }
                    get events() {
                        return this._events
                    }
                    constructor() {
                        this.disposed = !1, this.currentPageId = 0, this.console = _(Py), this.isNgZoneEnabled = !1, this._events = new gt, this.options = _($a, {
                            optional: !0
                        }) || {}, this.pendingTasks = _(Fy), this.errorHandler = this.options.errorHandler || iF, this.malformedUriErrorHandler = this.options.malformedUriErrorHandler || sF, this.navigated = !1, this.lastSuccessfulId = -1, this.urlHandlingStrategy = _(rF), this.routeReuseStrategy = _(eF), this.titleStrategy = _(XC), this.onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore", this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly", this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred", this.canceledNavigationResolution = this.options.canceledNavigationResolution || "replace", this.config = _(Kr, {
                            optional: !0
                        })?.flat() ?? [], this.navigationTransitions = _(ja), this.urlSerializer = _(pi), this.location = _(Ql), this.componentInputBindingEnabled = !!_(Oa, {
                            optional: !0
                        }), this.eventsSubscription = new Ze, this.isNgZoneEnabled = _(ee) instanceof ee && ee.isInAngularZone(), this.resetConfig(this.config), this.currentUrlTree = new Gr, this.rawUrlTree = this.currentUrlTree, this.browserUrlTree = this.currentUrlTree, this.routerState = RC(0, null), this.navigationTransitions.setupNavigations(this, this.currentUrlTree, this.routerState).subscribe(n => {
                            this.lastSuccessfulId = n.id, this.currentPageId = this.browserPageId
                        }, n => {
                            this.console.warn(`Unhandled Navigation Error: ${n}`)
                        }), this.subscribeToNavigationEvents()
                    }
                    subscribeToNavigationEvents() {
                        const n = this.navigationTransitions.events.subscribe(r => {
                            try {
                                const {
                                    currentTransition: o
                                } = this.navigationTransitions;
                                if (null === o) return void(ew(r) && this._events.next(r));
                                if (r instanceof Na) KC(o.source) && (this.browserUrlTree = o.extractedUrl);
                                else if (r instanceof qr) this.rawUrlTree = o.rawUrl;
                                else if (r instanceof SC) {
                                    if ("eager" === this.urlUpdateStrategy) {
                                        if (!o.extras.skipLocationChange) {
                                            const i = this.urlHandlingStrategy.merge(o.urlAfterRedirects, o.rawUrl);
                                            this.setBrowserUrl(i, o)
                                        }
                                        this.browserUrlTree = o.urlAfterRedirects
                                    }
                                } else if (r instanceof Nd) this.currentUrlTree = o.urlAfterRedirects, this.rawUrlTree = this.urlHandlingStrategy.merge(o.urlAfterRedirects, o.rawUrl), this.routerState = o.targetRouterState, "deferred" === this.urlUpdateStrategy && (o.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, o), this.browserUrlTree = o.urlAfterRedirects);
                                else if (r instanceof Di) 0 !== r.code && 1 !== r.code && (this.navigated = !0), (3 === r.code || 2 === r.code) && this.restoreHistory(o);
                                else if (r instanceof Rd) {
                                    const i = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl),
                                        s = {
                                            skipLocationChange: o.extras.skipLocationChange,
                                            replaceUrl: "eager" === this.urlUpdateStrategy || KC(o.source)
                                        };
                                    this.scheduleNavigation(i, yi, null, s, {
                                        resolve: o.resolve,
                                        reject: o.reject,
                                        promise: o.promise
                                    })
                                }
                                r instanceof Ra && this.restoreHistory(o, !0), r instanceof En && (this.navigated = !0), ew(r) && this._events.next(r)
                            } catch (o) {
                                this.navigationTransitions.transitionAbortSubject.next(o)
                            }
                        });
                        this.eventsSubscription.add(n)
                    }
                    resetRootComponentType(n) {
                        this.routerState.root.component = n, this.navigationTransitions.rootComponentType = n
                    }
                    initialNavigation() {
                        if (this.setUpLocationChangeListener(), !this.navigationTransitions.hasRequestedNavigation) {
                            const n = this.location.getState();
                            this.navigateToSyncWithBrowser(this.location.path(!0), yi, n)
                        }
                    }
                    setUpLocationChangeListener() {
                        this.locationSubscription || (this.locationSubscription = this.location.subscribe(n => {
                            const r = "popstate" === n.type ? "popstate" : "hashchange";
                            "popstate" === r && setTimeout(() => {
                                this.navigateToSyncWithBrowser(n.url, r, n.state)
                            }, 0)
                        }))
                    }
                    navigateToSyncWithBrowser(n, r, o) {
                        const i = {
                                replaceUrl: !0
                            },
                            s = o?.navigationId ? o : null;
                        if (o) {
                            const u = {
                                ...o
                            };
                            delete u.navigationId, delete u.\u0275routerPageId, 0 !== Object.keys(u).length && (i.state = u)
                        }
                        const a = this.parseUrl(n);
                        this.scheduleNavigation(a, r, s, i)
                    }
                    get url() {
                        return this.serializeUrl(this.currentUrlTree)
                    }
                    getCurrentNavigation() {
                        return this.navigationTransitions.currentNavigation
                    }
                    get lastSuccessfulNavigation() {
                        return this.navigationTransitions.lastSuccessfulNavigation
                    }
                    resetConfig(n) {
                        this.config = n.map($d), this.navigated = !1, this.lastSuccessfulId = -1
                    }
                    ngOnDestroy() {
                        this.dispose()
                    }
                    dispose() {
                        this.navigationTransitions.complete(), this.locationSubscription && (this.locationSubscription.unsubscribe(), this.locationSubscription = void 0), this.disposed = !0, this.eventsSubscription.unsubscribe()
                    }
                    createUrlTree(n, r = {}) {
                        const {
                            relativeTo: o,
                            queryParams: i,
                            fragment: s,
                            queryParamsHandling: a,
                            preserveFragment: u
                        } = r, c = u ? this.currentUrlTree.fragment : s;
                        let d, l = null;
                        switch (a) {
                            case "merge":
                                l = {
                                    ...this.currentUrlTree.queryParams,
                                    ...i
                                };
                                break;
                            case "preserve":
                                l = this.currentUrlTree.queryParams;
                                break;
                            default:
                                l = i || null
                        }
                        null !== l && (l = this.removeEmptyProps(l));
                        try {
                            d = CC(o ? o.snapshot : this.routerState.snapshot.root)
                        } catch {
                            ("string" != typeof n[0] || !n[0].startsWith("/")) && (n = []), d = this.currentUrlTree.root
                        }
                        return wC(d, n, l, c ?? null)
                    }
                    navigateByUrl(n, r = {
                        skipLocationChange: !1
                    }) {
                        const o = zn(n) ? n : this.parseUrl(n),
                            i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
                        return this.scheduleNavigation(i, yi, null, r)
                    }
                    navigate(n, r = {
                        skipLocationChange: !1
                    }) {
                        return function cF(e) {
                            for (let t = 0; t < e.length; t++)
                                if (null == e[t]) throw new C(4008, !1)
                        }(n), this.navigateByUrl(this.createUrlTree(n, r), r)
                    }
                    serializeUrl(n) {
                        return this.urlSerializer.serialize(n)
                    }
                    parseUrl(n) {
                        let r;
                        try {
                            r = this.urlSerializer.parse(n)
                        } catch (o) {
                            r = this.malformedUriErrorHandler(o, this.urlSerializer, n)
                        }
                        return r
                    }
                    isActive(n, r) {
                        let o;
                        if (o = !0 === r ? {
                                ...aF
                            } : !1 === r ? {
                                ...uF
                            } : r, zn(n)) return dC(this.currentUrlTree, n, o);
                        const i = this.parseUrl(n);
                        return dC(this.currentUrlTree, i, o)
                    }
                    removeEmptyProps(n) {
                        return Object.keys(n).reduce((r, o) => {
                            const i = n[o];
                            return null != i && (r[o] = i), r
                        }, {})
                    }
                    scheduleNavigation(n, r, o, i, s) {
                        if (this.disposed) return Promise.resolve(!1);
                        let a, u, c;
                        s ? (a = s.resolve, u = s.reject, c = s.promise) : c = new Promise((d, f) => {
                            a = d, u = f
                        });
                        const l = this.pendingTasks.add();
                        return JC(this, () => {
                            queueMicrotask(() => this.pendingTasks.remove(l))
                        }), this.navigationTransitions.handleNavigationRequest({
                            source: r,
                            restoredState: o,
                            currentUrlTree: this.currentUrlTree,
                            currentRawUrl: this.currentUrlTree,
                            currentBrowserUrl: this.browserUrlTree,
                            rawUrl: n,
                            extras: i,
                            resolve: a,
                            reject: u,
                            promise: c,
                            currentSnapshot: this.routerState.snapshot,
                            currentRouterState: this.routerState
                        }), c.catch(d => Promise.reject(d))
                    }
                    setBrowserUrl(n, r) {
                        const o = this.urlSerializer.serialize(n);
                        if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
                            const s = {
                                ...r.extras.state,
                                ...this.generateNgRouterState(r.id, this.browserPageId)
                            };
                            this.location.replaceState(o, "", s)
                        } else {
                            const i = {
                                ...r.extras.state,
                                ...this.generateNgRouterState(r.id, this.browserPageId + 1)
                            };
                            this.location.go(o, "", i)
                        }
                    }
                    restoreHistory(n, r = !1) {
                        if ("computed" === this.canceledNavigationResolution) {
                            const i = this.currentPageId - this.browserPageId;
                            0 !== i ? this.location.historyGo(i) : this.currentUrlTree === this.getCurrentNavigation()?.finalUrl && 0 === i && (this.resetState(n), this.browserUrlTree = n.currentUrlTree, this.resetUrlToCurrentUrlTree())
                        } else "replace" === this.canceledNavigationResolution && (r && this.resetState(n), this.resetUrlToCurrentUrlTree())
                    }
                    resetState(n) {
                        this.routerState = n.currentRouterState, this.currentUrlTree = n.currentUrlTree, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n.rawUrl)
                    }
                    resetUrlToCurrentUrlTree() {
                        this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId))
                    }
                    generateNgRouterState(n, r) {
                        return "computed" === this.canceledNavigationResolution ? {
                            navigationId: n,
                            \u0275routerPageId: r
                        } : {
                            navigationId: n
                        }
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();

            function ew(e) {
                return !(e instanceof Nd || e instanceof Rd)
            }
            let Xr = (() => {
                class e {
                    constructor(n, r, o, i, s, a) {
                        this.router = n, this.route = r, this.tabIndexAttribute = o, this.renderer = i, this.el = s, this.locationStrategy = a, this.href = null, this.commands = null, this.onChanges = new gt, this.preserveFragment = !1, this.skipLocationChange = !1, this.replaceUrl = !1;
                        const u = s.nativeElement.tagName?.toLowerCase();
                        this.isAnchorElement = "a" === u || "area" === u, this.isAnchorElement ? this.subscription = n.events.subscribe(c => {
                            c instanceof En && this.updateHref()
                        }) : this.setTabIndexIfNotOnNativeEl("0")
                    }
                    setTabIndexIfNotOnNativeEl(n) {
                        null != this.tabIndexAttribute || this.isAnchorElement || this.applyAttributeValue("tabindex", n)
                    }
                    ngOnChanges(n) {
                        this.isAnchorElement && this.updateHref(), this.onChanges.next(this)
                    }
                    set routerLink(n) {
                        null != n ? (this.commands = Array.isArray(n) ? n : [n], this.setTabIndexIfNotOnNativeEl("0")) : (this.commands = null, this.setTabIndexIfNotOnNativeEl(null))
                    }
                    onClick(n, r, o, i, s) {
                        return !!(null === this.urlTree || this.isAnchorElement && (0 !== n || r || o || i || s || "string" == typeof this.target && "_self" != this.target)) || (this.router.navigateByUrl(this.urlTree, {
                            skipLocationChange: this.skipLocationChange,
                            replaceUrl: this.replaceUrl,
                            state: this.state
                        }), !this.isAnchorElement)
                    }
                    ngOnDestroy() {
                        this.subscription?.unsubscribe()
                    }
                    updateHref() {
                        this.href = null !== this.urlTree && this.locationStrategy ? this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(this.urlTree)) : null;
                        const n = null === this.href ? null : function Vp(e, t, n) {
                            return function Mb(e, t) {
                                return "src" === t && ("embed" === e || "frame" === e || "iframe" === e || "media" === e || "script" === e) || "href" === t && ("base" === e || "link" === e) ? $p : Ro
                            }(t, n)(e)
                        }(this.href, this.el.nativeElement.tagName.toLowerCase(), "href");
                        this.applyAttributeValue("href", n)
                    }
                    applyAttributeValue(n, r) {
                        const o = this.renderer,
                            i = this.el.nativeElement;
                        null !== r ? o.setAttribute(i, n, r) : o.removeAttribute(i, n)
                    }
                    get urlTree() {
                        return null === this.commands ? null : this.router.createUrlTree(this.commands, {
                            relativeTo: void 0 !== this.relativeTo ? this.relativeTo : this.route,
                            queryParams: this.queryParams,
                            fragment: this.fragment,
                            queryParamsHandling: this.queryParamsHandling,
                            preserveFragment: this.preserveFragment
                        })
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(M(pt), M(Gn), function es(e) {
                            return function qE(e, t) {
                                if ("class" === t) return e.classes;
                                if ("style" === t) return e.styles;
                                const n = e.attrs;
                                if (n) {
                                    const r = n.length;
                                    let o = 0;
                                    for (; o < r;) {
                                        const i = n[o];
                                        if (xf(i)) break;
                                        if (0 === i) o += 2;
                                        else if ("number" == typeof i)
                                            for (o++; o < r && "string" == typeof n[o];) o++;
                                        else {
                                            if (i === t) return n[o + 1];
                                            o += 2
                                        }
                                    }
                                }
                                return null
                            }(be(), e)
                        }("tabindex"), M(Rs), M(vn), M(Vn))
                    };
                    static #t = this.\u0275dir = Ne({
                        type: e,
                        selectors: [
                            ["", "routerLink", ""]
                        ],
                        hostVars: 1,
                        hostBindings: function(r, o) {
                            1 & r && tl("click", function(s) {
                                return o.onClick(s.button, s.ctrlKey, s.shiftKey, s.altKey, s.metaKey)
                            }), 2 & r && qc("target", o.target)
                        },
                        inputs: {
                            target: "target",
                            queryParams: "queryParams",
                            fragment: "fragment",
                            queryParamsHandling: "queryParamsHandling",
                            state: "state",
                            relativeTo: "relativeTo",
                            preserveFragment: ["preserveFragment", "preserveFragment", Gl],
                            skipLocationChange: ["skipLocationChange", "skipLocationChange", Gl],
                            replaceUrl: ["replaceUrl", "replaceUrl", Gl],
                            routerLink: "routerLink"
                        },
                        standalone: !0,
                        features: [tm, Nn]
                    })
                }
                return e
            })();
            class tw {}
            let fF = (() => {
                class e {
                    constructor(n, r, o, i, s) {
                        this.router = n, this.injector = o, this.preloadingStrategy = i, this.loader = s
                    }
                    setUpPreloading() {
                        this.subscription = this.router.events.pipe(wn(n => n instanceof En), di(() => this.preload())).subscribe(() => {})
                    }
                    preload() {
                        return this.processRoutes(this.injector, this.router.config)
                    }
                    ngOnDestroy() {
                        this.subscription && this.subscription.unsubscribe()
                    }
                    processRoutes(n, r) {
                        const o = [];
                        for (const i of r) {
                            i.providers && !i._injector && (i._injector = gl(i.providers, n, `Route: ${i.path}`));
                            const s = i._injector ?? n,
                                a = i._loadedInjector ?? s;
                            (i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad || i.loadComponent && !i._loadedComponent) && o.push(this.preloadConfig(s, i)), (i.children || i._loadedRoutes) && o.push(this.processRoutes(a, i.children ?? i._loadedRoutes))
                        }
                        return we(o).pipe(qn())
                    }
                    preloadConfig(n, r) {
                        return this.preloadingStrategy.preload(r, () => {
                            let o;
                            o = r.loadChildren && void 0 === r.canLoad ? this.loader.loadChildren(n, r) : x(null);
                            const i = o.pipe(Ce(s => null === s ? x(void 0) : (r._loadedRoutes = s.routes, r._loadedInjector = s.injector, this.processRoutes(s.injector ?? n, s.routes))));
                            return r.loadComponent && !r._loadedComponent ? we([i, this.loader.loadComponent(r)]).pipe(qn()) : i
                        })
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(b(pt), b(ky), b(at), b(tw), b(Ud))
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            const zd = new I("");
            let nw = (() => {
                class e {
                    constructor(n, r, o, i, s = {}) {
                        this.urlSerializer = n, this.transitions = r, this.viewportScroller = o, this.zone = i, this.options = s, this.lastId = 0, this.lastSource = "imperative", this.restoredId = 0, this.store = {}, s.scrollPositionRestoration = s.scrollPositionRestoration || "disabled", s.anchorScrolling = s.anchorScrolling || "disabled"
                    }
                    init() {
                        "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"), this.routerEventsSubscription = this.createScrollEvents(), this.scrollEventsSubscription = this.consumeScrollEvents()
                    }
                    createScrollEvents() {
                        return this.transitions.events.subscribe(n => {
                            n instanceof Na ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(), this.lastSource = n.navigationTrigger, this.restoredId = n.restoredState ? n.restoredState.navigationId : 0) : n instanceof En ? (this.lastId = n.id, this.scheduleScrollEvent(n, this.urlSerializer.parse(n.urlAfterRedirects).fragment)) : n instanceof qr && 0 === n.code && (this.lastSource = void 0, this.restoredId = 0, this.scheduleScrollEvent(n, this.urlSerializer.parse(n.url).fragment))
                        })
                    }
                    consumeScrollEvents() {
                        return this.transitions.events.subscribe(n => {
                            n instanceof TC && (n.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(n.position) : n.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(n.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
                        })
                    }
                    scheduleScrollEvent(n, r) {
                        this.zone.runOutsideAngular(() => {
                            setTimeout(() => {
                                this.zone.run(() => {
                                    this.transitions.events.next(new TC(n, "popstate" === this.lastSource ? this.store[this.restoredId] : null, r))
                                })
                            }, 0)
                        })
                    }
                    ngOnDestroy() {
                        this.routerEventsSubscription?.unsubscribe(), this.scrollEventsSubscription?.unsubscribe()
                    }
                    static #e = this.\u0275fac = function(r) {
                        ! function Sg() {
                            throw new Error("invalid")
                        }()
                    };
                    static #t = this.\u0275prov = S({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();

            function rn(e, t) {
                return {
                    \u0275kind: e,
                    \u0275providers: t
                }
            }

            function ow() {
                const e = _(ut);
                return t => {
                    const n = e.get(Vr);
                    if (t !== n.components[0]) return;
                    const r = e.get(pt),
                        o = e.get(iw);
                    1 === e.get(Gd) && r.initialNavigation(), e.get(sw, null, j.Optional)?.setUpPreloading(), e.get(zd, null, j.Optional)?.init(), r.resetRootComponentType(n.componentTypes[0]), o.closed || (o.next(), o.complete(), o.unsubscribe())
                }
            }
            const iw = new I("", {
                    factory: () => new gt
                }),
                Gd = new I("", {
                    providedIn: "root",
                    factory: () => 1
                }),
                sw = new I("");

            function mF(e) {
                return rn(0, [{
                    provide: sw,
                    useExisting: fF
                }, {
                    provide: tw,
                    useExisting: e
                }])
            }
            const aw = new I("ROUTER_FORROOT_GUARD"),
                yF = [Ql, {
                    provide: pi,
                    useClass: bd
                }, pt, Ci, {
                    provide: Gn,
                    useFactory: function rw(e) {
                        return e.routerState.root
                    },
                    deps: [pt]
                }, Ud, []];

            function DF() {
                return new Uy("Router", pt)
            }
            let uw = (() => {
                class e {
                    constructor(n) {}
                    static forRoot(n, r) {
                        return {
                            ngModule: e,
                            providers: [yF, [], {
                                    provide: Kr,
                                    multi: !0,
                                    useValue: n
                                }, {
                                    provide: aw,
                                    useFactory: EF,
                                    deps: [
                                        [pt, new rs, new os]
                                    ]
                                }, {
                                    provide: $a,
                                    useValue: r || {}
                                }, r?.useHash ? {
                                    provide: Vn,
                                    useClass: _R
                                } : {
                                    provide: Vn,
                                    useClass: DD
                                }, {
                                    provide: zd,
                                    useFactory: () => {
                                        const e = _(zx),
                                            t = _(ee),
                                            n = _($a),
                                            r = _(ja),
                                            o = _(pi);
                                        return n.scrollOffset && e.setOffset(n.scrollOffset), new nw(o, r, e, t, n)
                                    }
                                }, r?.preloadingStrategy ? mF(r.preloadingStrategy).\u0275providers : [], {
                                    provide: Uy,
                                    multi: !0,
                                    useFactory: DF
                                }, r?.initialNavigation ? IF(r) : [], r?.bindToComponentInputs ? rn(8, [FC, {
                                    provide: Oa,
                                    useExisting: FC
                                }]).\u0275providers : [],
                                [{
                                    provide: cw,
                                    useFactory: ow
                                }, {
                                    provide: Ll,
                                    multi: !0,
                                    useExisting: cw
                                }]
                            ]
                        }
                    }
                    static forChild(n) {
                        return {
                            ngModule: e,
                            providers: [{
                                provide: Kr,
                                multi: !0,
                                useValue: n
                            }]
                        }
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(b(aw, 8))
                    };
                    static #t = this.\u0275mod = Sn({
                        type: e
                    });
                    static #n = this.\u0275inj = un({})
                }
                return e
            })();

            function EF(e) {
                return "guarded"
            }

            function IF(e) {
                return ["disabled" === e.initialNavigation ? rn(3, [{
                    provide: Al,
                    multi: !0,
                    useFactory: () => {
                        const t = _(pt);
                        return () => {
                            t.setUpLocationChangeListener()
                        }
                    }
                }, {
                    provide: Gd,
                    useValue: 2
                }]).\u0275providers : [], "enabledBlocking" === e.initialNavigation ? rn(2, [{
                    provide: Gd,
                    useValue: 0
                }, {
                    provide: Al,
                    multi: !0,
                    deps: [ut],
                    useFactory: t => {
                        const n = t.get(CR, Promise.resolve());
                        return () => n.then(() => new Promise(r => {
                            const o = t.get(pt),
                                i = t.get(iw);
                            JC(o, () => {
                                r(!0)
                            }), t.get(ja).afterPreactivation = () => (r(!0), i.closed ? x(void 0) : i), o.initialNavigation()
                        }))
                    }
                }]).\u0275providers : []]
            }
            const cw = new I("");
            let MF = (() => {
                class e {
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275cmp = Ut({
                        type: e,
                        selectors: [
                            ["app-menu-title"]
                        ],
                        decls: 5,
                        vars: 0,
                        consts: [
                            [1, "container__menu-title"]
                        ],
                        template: function(r, o) {
                            1 & r && (se(0, "div", 0), De(1, "hr"), se(2, "h1"), et(3, "Dai's dog4"), oe(), De(4, "hr"), oe())
                        },
                        styles: [".container__menu-title[_ngcontent-%COMP%] > h1[_ngcontent-%COMP%]{margin-top:15px;margin-bottom:15px;font-size:135px;font-dog4:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;display:flex;justify-content:center;color:#a81961;text-shadow:0px 0px 5px grey,0px 0px 10px grey,0px 0px 15px grey,0px 0px 20px #1e0c42,0px 0px 30px #1e0c42,0px 0px 40px #1e0c42,0px 0px 55px #1e0c42,0px 0px 75px #1e0c42}.container__menu-title[_ngcontent-%COMP%] > hr[_ngcontent-%COMP%]{margin-top:20px;margin-bottom:5px}", "@media (max-width: 700px){.container__menu-title[_ngcontent-%COMP%] > h1[_ngcontent-%COMP%]{font-size:10px}}"]
                    })
                }
                return e
            })();
            const lw = function(e) {
                return ["content", e]
            };
            let SF = (() => {
                class e {
                    constructor() {
                        this.photoCover = "", this.cardTitle = "", this.cardDescription = "", this.Id = "0"
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275cmp = Ut({
                        type: e,
                        selectors: [
                            ["app-big-card"]
                        ],
                        inputs: {
                            photoCover: "photoCover",
                            cardTitle: "cardTitle",
                            cardDescription: "cardDescription",
                            Id: "Id"
                        },
                        decls: 11,
                        vars: 9,
                        consts: [
                            [1, "container__big-card"],
                            [1, "big-card__photo"],
                            ["alt", "placeholder", "height", "200px", "srcset", "", 3, "src"],
                            [1, "big-card__title"],
                            [3, "routerLink"],
                            [1, "big-card__description"]
                        ],
                        template: function(r, o) {
                            1 & r && (se(0, "div", 0)(1, "div", 1), De(2, "img", 2), oe(), se(3, "div", 3)(4, "h1")(5, "a", 4), et(6), oe()()(), se(7, "div", 5)(8, "p")(9, "a", 4), et(10), oe()()()()), 2 & r && (ct(2), qo("src", o.photoCover, Ro), ct(3), Go("routerLink", Xs(5, lw, o.Id)), ct(1), Zo(o.cardTitle), ct(3), Go("routerLink", Xs(7, lw, o.Id)), ct(1), Qo(" ", o.cardDescription, " "))
                        },
                        dependencies: [Xr],
                        styles: [".container__big-card[_ngcontent-%COMP%]{width:400px;height:500px;margin-left:20px;margin-right:20px;display:flex;justify-content:flex-start;align-items:flex-start;flex-direction:column}.big-card__title[_ngcontent-%COMP%]{margin-top:15px;font-size:20px}.big-card__description[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{margin-top:20px}.big-card__description[_ngcontent-%COMP%] > p[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]{color:#e3e0b3}.big-card__photo[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:100%;min-width:400px;object-fit:cover;border-radius:10px}"]
                    })
                }
                return e
            })();
            const TF = function(e) {
                return ["content", e]
            };
            let AF = (() => {
                class e {
                    constructor() {
                        this.photoCover = "", this.cardTitle = "", this.Id = "0"
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275cmp = Ut({
                        type: e,
                        selectors: [
                            ["app-small-card"]
                        ],
                        inputs: {
                            photoCover: "photoCover",
                            cardTitle: "cardTitle",
                            Id: "Id"
                        },
                        decls: 10,
                        vars: 5,
                        consts: [
                            [1, "container__small-card"],
                            [1, "container__small-card-content"],
                            [1, "small-card__photo"],
                            ["alt", "", 3, "src"],
                            [1, "small-card__title"],
                            [3, "routerLink"],
                            [1, "container__small-card__separator"]
                        ],
                        template: function(r, o) {
                            1 & r && (se(0, "div", 0)(1, "div", 1)(2, "div", 2), De(3, "img", 3), oe(), se(4, "div", 4)(5, "h1")(6, "a", 5), et(7), oe()()()(), se(8, "div", 6), De(9, "hr"), oe()()), 2 & r && (ct(3), qo("src", o.photoCover, Ro), ct(3), Go("routerLink", Xs(3, TF, o.Id)), ct(1), Zo(o.cardTitle))
                        },
                        dependencies: [Xr],
                        styles: [".container__small-card[_ngcontent-%COMP%]{width:700px;margin-bottom:15px}.container__small-card-content[_ngcontent-%COMP%]{display:flex}.small-card__photo[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:200px;min-width:200px;margin-right:20px;object-fit:cover;border-radius:10px}.small-card__title[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.container__small-card__separator[_ngcontent-%COMP%]{margin-top:15px}"]
                    })
                }
                return e
            })();
            const RF = [{
                id: "1",
                photo: "assets/images/dog1.jpg",
                title: "Pretinho",
                description: "O auge da fofura esse doguinho."
            }, {
                id: "2",
                photo: "assets/images/dog2.jpg",
                title: "Max",
                description: "O que você acha de mim hihi.."
            }, {
                id: "3",
                photo: "assets/images/dog3.jpg",
                title: "Bob",
                description: "Admire minha beleza."
            }, {
                id: "4",
                photo: "assets/images/dog4.jpg",
                title: "Rocket",
                description: "Cachorro fofo."
            }],
                xF = [{
                    path: "",
                    component: (() => {
                        class e {
                            static #e = this.\u0275fac = function(r) {
                                return new(r || e)
                            };
                            static #t = this.\u0275cmp = Ut({
                                type: e,
                                selectors: [
                                    ["app-home"]
                                ],
                                decls: 8,
                                vars: 0,
                                consts:[
                                    [1, "container__articles"],
                                    [1, "articles__main"],
                                    ["Id", "1", "photoCover", "assets/images/dog3.jpg", "cardTitle", "O auge da fofura esse doguinho."],
                                    [1, "articles__others"],
                                    ["Id", "2", "photoCover", "assets/images/dog2.jpg", "cardTitle", "O que você acha de mim hihi.."],
                                    ["Id", "3", "photoCover", "assets/images/dog4.jpg", "cardTitle", "Admire minha beleza."],
                                    ["Id", "4", "photoCover", "assets/images/dog1.jpg", "cardTitle", "Cachorro fofo."]
                                ],
                                template: function(r, o) {
                                    1 & r && (De(0, "app-menu-title"), se(1, "div", 0)(2, "div", 1), De(3, "app-big-card", 2), oe(), se(4, "div", 3), De(5, "app-small-card", 4)(6, "app-small-card", 5)(7, "app-small-card", 6), oe()())
                                },
                                dependencies: [MF, SF, AF],
                                styles: [".container__articles[_ngcontent-%COMP%]{margin-top:20px;display:flex;justify-content:center}"]
                            })
                        }
                        return e
                    })()
                }, {
                    path: "content/:id",
                    component: (() => {
                        class e {
                            constructor(n) {
                                this.route = n, this.photoCover = "", this.contentTitle = "", this.contentDescription = "", this.id = "0"
                            }
                            ngOnInit() {
                                this.route.paramMap.subscribe(n => this.id = n.get("id")), this.setValuesToComponents(this.id)
                            }
                            setValuesToComponents(n) {
                                const r = RF.filter(o => o.id == n)[0];
                                this.contentTitle = r.title, this.contentDescription = r.description, this.photoCover = r.photo
                            }
                            static #e = this.\u0275fac = function(r) {
                                return new(r || e)(M(Gn))
                            };
                            static #t = this.\u0275cmp = Ut({
                                type: e,
                                selectors: [
                                    ["app-content"]
                                ],
                                inputs: {
                                    photoCover: "photoCover",
                                    contentTitle: "contentTitle",
                                    contentDescription: "contentDescription"
                                },
                                decls: 12,
                                vars: 3,
                                consts: [
                                    [1, "container__content"],
                                    [1, "content__cover"],
                                    ["alt", "", 3, "src"],
                                    [1, "content__title"],
                                    ["routerLink", ""],
                                    [1, "content__description"]
                                ],
                                template: function(r, o) {
                                    1 & r && (se(0, "div", 0)(1, "div", 1), De(2, "img", 2), oe(), se(3, "div", 3)(4, "h1"), et(5), oe(), De(6, "hr"), oe(), se(7, "a", 4), et(8, " << VOLTAR "), oe(), se(9, "div", 5)(10, "p"), et(11), oe()()()), 2 & r && (ct(2), qo("src", o.photoCover, Ro), ct(3), Zo(o.contentTitle), ct(6), Qo(" ", o.contentDescription, " "))
                                },
                                dependencies: [Xr],
                                styles: [".container__content[_ngcontent-%COMP%]{width:100%;height:100vh;margin-top:20px;display:flex;flex-direction:column;align-items:center}.content__cover[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:300px;height:200px;min-width:300px;object-fit:cover;border-radius:5px;border:3px solid #e3e0b3}.content__description[_ngcontent-%COMP%]{margin-top:15px}.content__description[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{color:#e3e0b3;margin-top:20px}"]
                            })
                        }
                        return e
                    })()
                }];
            let OF = (() => {
                    class e {
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275mod = Sn({
                            type: e
                        });
                        static #n = this.\u0275inj = un({
                            imports: [uw.forRoot(xF), uw]
                        })
                    }
                    return e
                })(),
                PF = (() => {
                    class e {
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275cmp = Ut({
                            type: e,
                            selectors: [
                                ["app-menu-bar"]
                            ],
                            decls: 17,
                            vars: 0,
                            consts: [
                                [1, "container__menu-bar"],
                                ["href", "https://www.linkedin.com/in/leonardo-siqueira-2b9636217/"],
                                ["href", "https://github.com/LeonardoSiqueira01"],
                                ["href", "https://github.com/LeonardoSiqueira01"]
                            ],
                            template: function(r, o) {
                                1 & r && (se(0, "div", 0)(1, "ul")(2, "li"), De(3, "a", 1), et(4, "Linkedin"), oe(), se(5, "li")(6, "span"), et(7, "\u2022"), oe()(), se(8, "li"), De(9, "a", 2), et(10, "Github"), oe(), se(11, "li")(12, "span"), et(13, "\u2022"), oe()(), se(14, "li"), De(15, "a", 3), et(16, "Instagram"), oe()()())
                            },
                            styles: [".container__menu-bar[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%]{display:flex}.container__menu-bar[_ngcontent-%COMP%] > ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{margin-right:20px}"]
                        })
                    }
                    return e
                })(),
                FF = (() => {
                    class e {
                        constructor() {
                            this.title = "angular-blog"
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275cmp = Ut({
                            type: e,
                            selectors: [
                                ["app-root"]
                            ],
                            decls: 3,
                            vars: 0,
                            template: function(r, o) {
                                1 & r && (se(0, "header"), De(1, "app-menu-bar"), oe(), De(2, "router-outlet"))
                            },
                            dependencies: [Ld, PF],
                            styles: ["header[_ngcontent-%COMP%]{margin-top:15px;display:flex;justify-content:center}"]
                        })
                    }
                    return e
                })(),
                kF = (() => {
                    class e {
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275mod = Sn({
                            type: e,
                            bootstrap: [FF]
                        });
                        static #n = this.\u0275inj = un({
                            imports: [jO, OF]
                        })
                    }
                    return e
                })();
            kO().bootstrapModule(kF).catch(e => console.error(e))
        }
    },
    Q => {
        Q(Q.s = 485)
    }
]);// This is just a sample script. Paste your real code (javascript or HTML) here.

if ('this_is'==/an_example/){of_beautifier();}else{var a=b?(c%d):e[f];}