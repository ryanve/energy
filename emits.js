/*!
 * emits 0.0.0+201311140811
 * https://github.com/ryanve/emits
 * MIT License 2013 Ryan Van Etten
 */

(function(root, name, make) {
    if (typeof module != 'undefined' && module['exports']) module['exports'] = make();
    else root[name] = make(root); 
}(this, 'emits', function() {

    var emitter = emits.prototype = Emits.prototype
      , proceed = {}
      , array = []
      , slice = array.slice
      , owns = proceed.hasOwnProperty
      , toString = proceed.toString
      , events = '_events'
      , origin = '_origin'
      , emit = 'emit'
      , mode = 'mode'
      , init = 'init'
      , listeners = 'listeners'
      , isArray = Array.isArray || function(o) {
            return toString.call(array) === toString.call(o);
        };
        
    emitter[mode] = {'max': 0, 'all':false};
      
    function defaults(ops, defs) {
        for (var k in defs) if (void 0 === ops[k]) ops[k] = defs[k];
        return ops;
    }

    /**
     * @constructor
     */
    function Emits(ops) {
        this[mode] = ops instanceof Emits ? defaults({}, ops[mode]) : defaults(ops || {}, emitter[mode]);
        this[events] = {};
    }

    /**
     * @return {Emits}
     */
    function emits(o) {
        return o instanceof Emits ? o[init]() : new Emits(o);
    }
    
    /**
     * @param {{length:number}} fns
     * @param {*} scope
     * @param {Array|Arguments} args
     * @param {*=} stop breaker
     * @param {number} fired
     */
    function applies(fns, scope, args, stop) {
        var l = fns && fns.length, i = 0;
        stop = void 0 === stop ? proceed : stop;
        while (i < l) if (stop === fns[i++].apply(scope, args)) break;
        return i;
    }
    
    /**
     * @param {Object} o
     * @param {string} k
     * @param {*} def
     */
    function ensure(o, k, def) {
        o[k] = owns.call(this, k) && this[k] || def;
    }

    /**
     * @param {Array} a array to mutate
     * @param {*=} v value to remove
     */
    function pull(a, v, times) {
        times >>= 0;
        for (var i = a.length; i--;) {
            // Loop down so that splices don't interfere with subsequent iterations.
            if ((v === a[i] || a[i] && v === a[i][origin]) && a.splice(i, 1) && !--times) break;
        }
    }
    
    /**
     * @this {Emits|Object}
     */    
    emitter[init] = function() {
        ensure(this, mode, {});
        ensure(this, events, {});
        return this;
    };
        
    /**
     * @param {string|number} id
     * @param {number} fired
     */    
    emitter[emit] = function(id) {
        var rest = slice.call(arguments, 1), fired = applies(this[listeners](id), this, rest);
        this[mode]['all'] && applies(this[listeners](this[mode]['all']), this, rest);
        return fired;
    };
    
    /**
     * @param {string|number} id
     * @return {Array}
     */    
    emitter[listeners] = function(id) {
        return isArray(this[events][id]) ? this[events][id] : this[events][id] = [];
    };
    
    /**
     * @return {Emits}
     */    
    emitter['clone'] = function() {
        var clone = new Emits(this);
        defaults(clone[events], this[events]);
        return clone;
    };

    /**
     * @param {Array|string|number} id
     * @param {Function} fn
     * @return {Emits|Object}
     */    
    emitter['on'] = function on(id, fn) {
        if (null == id || null == fn) throw new TypeError('@on');
        var n, max = this[mode]['max'], iter = typeof id == 'function';
        n = this[listeners](iter ? fn : id).push(iter ? id : fn);
        if (0 < max && n > max) throw new RangeError('@max');
        return this;
    };
        
    /**
     * @param {(Function|string|number)=} id
     * @param {(Function|string|number)=} fn handler to remove or iterator index
     * @param {number=} times number of occurrences to remove - 0 (the default) removes all
     * @return {Emits|Object}
     */
    emitter['off'] = function(id, fn, times) {
        var iter = typeof id == 'function';
        if (null != fn) pull(this[listeners](iter ? fn : id), iter ? id : fn, times);
        else if (null != id && !iter) this[events][id] = void 0;
        else if (!arguments.length) this[events] = {};
        return this;
    };

    /**
     * @param {string|number} id
     * @param {number|boolean|null|undefined} more
     * @param {Function} fn
     * @return {Emits|Object}
     */
    emitter['many'] = function(id, more, fn) {
        var that = this, wrap = typeof more == 'number' ? function() {
            1 < --more || that['off'](id, wrap);
            return fn.apply(this, arguments);
        } : function() {
            more === fn.apply(this, arguments) || that['off'](id, wrap);
        };
        wrap[origin] = fn;
        return this['on'](id, wrap);
    };
    
    emitter['once'] = function(id, fn) {
        var iter = typeof id == 'function';
        return this['many'](iter ? fn : id, 1, iter ? id : fn);
    };

    emits['applies'] = applies;
    return emits;
}));