(function(root) {
  var common = typeof module != 'undefined' && !!module.exports
    , aok = common ? require('aok') : root.aok
    , energy = common ? require('../src') : root.energy
    , emitter = energy()
    , key = 'key'
    , indexOf = [].indexOf
    , ran = false;

  function noop() {}
  function yes() { return true; }
   
  aok('instance', emitter instanceof energy);
  aok('listeners', typeof emitter.listeners(key).length == 'number');
  
  (function(id) {
    var bool = true, gone = indexOf ? function(what) {
      return -1 === emitter.listeners(key).indexOf(what);
    } : yes;
    emitter.on(key, noop).off(key, noop);
    if (bool = gone(noop)) {
      emitter.on(key, noop).on(key, noop).off(key, noop);
      bool = gone(noop);
    }
    aok({
        id: id
      , test: bool
    });
    emitter.off(key, noop);
  }('off'));

  emitter.off(key).once(key, function() {
    ran = true;
    aok('once', 0 === emitter.listeners(key).length);
  }).emit(key);
  
  (function(id, n) {
    var i = n, initial = emitter.listeners(key).length;
    emitter.off(key, noop);
    while (i--) emitter.on(key, noop);
    aok(id, n === emitter.listeners(key).length - initial);
    emitter.off(key, noop);
  }('repeat', 3));

  setTimeout(function() {
    ran ? aok.info('All tests ran.') : aok.warn('Some tests did not run yet.');
  }, 0);
}(this));