/** @preserve npm.im/energy */
!function(root, name, make) {
  if (typeof module != 'undefined' && module.exports) module.exports = make()
  else root[name] = make()
}(this, 'energy', function() {

  var emitter = energy.prototype = Energy.prototype
    , array = []
    , slice = array.slice
    , owns = {}.hasOwnProperty
    , events = '_events'
    , origin = '_origin'
    , emit = 'emit'
    , init = 'init'
    , listeners = 'listeners'
    , ifArray = function(o) {
        return o instanceof Array && o
      }

  function defaults(ops, defs) {
    for (var k in defs) if (void 0 === ops[k]) ops[k] = defs[k]
    return ops
  }

  /**
   * @constructor
   */
  function Energy() {
    this[events] = {}
  }

  /**
   * @return {Energy} emitter instance
   */
  function energy(o) {
    return o instanceof Energy ? o[init]() : new Energy
  }

  /**
   * @this {Function} wrapper that constructs the source instance
   * @param {Object|Function} target to convert into emitter
   * @return {Object|Function} target converted into emitter
   */
  energy['to'] = function(target) {
    return defaults(target, this.call())
  }

  /**
   * @this {Object|Energy|Function} source emitter or emitter-like
   * @param {Object|Energy|Function} target to convert into emitter
   * @return {Object|Energy|Function} source for chaining
   */
  emitter['to'] = function(target) {
    defaults(target, this)
    return this
  }

  /**
   * @param {{length:number}} fns
   * @param {*} scope
   * @param {Array|Arguments} args
   * @return {number} fired
   */
  function applies(fns, scope, args) {
    var l = fns && fns.length, i = 0
    while (i < l) fns[i++].apply(scope, args)
    return i
  }

  /**
   * @param {Object} o
   * @param {string} k
   * @param {*} def
   */
  function ensure(o, k, def) {
    o[k] = owns.call(this, k) && this[k] || def
  }

  /**
   * @param {*} listener
   * @param {*} fn
   * @return {boolean} true if they're the same listener
   */
  function is(listener, fn) {
    return listener === fn || !!listener && listener[origin] === fn
  }

  /**
   * @param {Array} a array to mutate
   * @param {*=} v value to remove
   * @param {number=} quota occurrences to remove
   */
  function pull(a, v, quota) {
    quota >>= 0
    // Loop down so that splices don't interfere with subsequent iterations
    for (var i = a.length; i--;) if (is(a[i], v) && a.splice(i, 1) && !--quota) break
  }

  /**
   * @this {Energy|Object}
   */
  emitter[init] = function() {
    ensure(this, events, {})
    return this
  }

  /**
   * @param {string|number} id
   * @return {number} fired
   */
  emitter[emit] = function(id) {
    var rest = slice.call(arguments, 1), fired = applies(this[listeners](id), this, rest)
    return fired
  }

  /**
   * @param {string|number} id
   * @return {Array}
   */
  emitter[listeners] = function(id) {
    if (null == id) throw new TypeError('@listeners')
    return this[events][id] = ifArray(this[events][id]) || []
  }

  /**
   * @return {Energy}
   */
  emitter['clone'] = function() {
    var clone = new Energy(this)
    defaults(clone[events], this[events])
    return clone
  }

  /**
   * @param {string|number} id
   * @param {Function} fn listener to add
   * @return {Energy|Object}
   */
  emitter['on'] = function on(id, fn) {
    if (null == id || null == fn) throw new TypeError('@on')
    this[listeners](id).push(fn)
    return this
  }

  /**
   * @param {(string|number)=} id
   * @param {Function=} fn listener to remove
   * @param {number=} quota occurrences to remove (the default 0 removes all)
   * @return {Energy|Object}
   */
  emitter['off'] = function(id, fn, quota) {
    if (null != fn) pull(this[listeners](id), fn, quota)
    else if (null != id) this[events][id] = void 0
    else if (!arguments.length) this[events] = {}
    return this
  }

  /**
   * @param {string|number} id
   * @param {Function} fn one-time listener to add
   * @return {Energy|Object}
   */
  emitter['once'] = function(id, fn) {
    var that = this, handler = function() {
      that['off'](id, handler)
      return fn.apply(this, arguments)
    }
    handler[origin] = fn
    return this['on'](id, handler)
  }

  energy['applies'] = applies
  return energy
});
