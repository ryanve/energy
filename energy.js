/*!
 * energy 0.3.0+201403100550
 * https://github.com/ryanve/energy
 * MIT License (c) 2014 Ryan Van Etten
 */

(function(root, name, make) {
  if (typeof module != 'undefined' && module['exports']) module['exports'] = make();
  else root[name] = make();
}(this, 'energy', function() {

  var emitter = energy.prototype = Energy.prototype
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
  function Energy(ops) {
    this[mode] = ops instanceof Energy ? defaults({}, ops[mode]) : defaults(ops || {}, emitter[mode]);
    this[events] = {};
  }

  /**
   * @return {Energy}
   */
  function energy(o) {
    return o instanceof Energy ? o[init]() : new Energy(o);
  }
  
  /**
   * @param {{length:number}} fns
   * @param {*} scope
   * @param {Array|Arguments} args
   * @param {*=} stop breaker
   * @return {number} fired
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
   * @param {number=} times occurrences to remove
   */
  function pull(a, v, times) {
    times >>= 0;
    for (var i = a.length; i--;) {
      // Loop down so that splices don't interfere with subsequent iterations.
      if ((v === a[i] || a[i] && v === a[i][origin]) && a.splice(i, 1) && !--times) break;
    }
  }
  
  /**
   * @this {Energy|Object}
   */  
  emitter[init] = function() {
    ensure(this, mode, {});
    ensure(this, events, {});
    return this;
  };
    
  /**
   * @param {string|number} id
   * @return {number} fired
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
   * @return {Energy}
   */  
  emitter['clone'] = function() {
    var clone = new Energy(this);
    defaults(clone[events], this[events]);
    return clone;
  };

  /**
   * @param {string|number} id
   * @param {Function} fn listener to add
   * @return {Energy|Object}
   */
  emitter['on'] = function on(id, fn) {
    if (null == id || null == fn) throw new TypeError('@on');
    var n, max = this[mode]['max'];
    n = this[listeners](id).push(fn);
    if (0 < max && n > max) throw new RangeError('@max');
    return this;
  };
    
  /**
   * @param {(string|number)=} id
   * @param {Function=} fn listener to remove
   * @param {number=} times occurrences to remove (the default 0 removes all)
   * @return {Energy|Object}
   */
  emitter['off'] = function(id, fn, times) {
    if (null != fn) pull(this[listeners](id), fn, times);
    else if (null != id) this[events][id] = void 0;
    else if (!arguments.length) this[events] = {};
    return this;
  };

  /**
   * @param {string|number} id
   * @param {Function} fn one-time listener to add
   * @return {Energy|Object}
   */
  emitter['once'] = function(id, fn) {
    var that = this, handler = function() {
      that['off'](id, handler);
      return fn.apply(this, arguments);
    };
    handler[origin] = fn;
    return this['on'](id, handler);
  };

  energy['applies'] = applies;
  return energy;
}));