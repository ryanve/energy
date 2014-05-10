!function(root) {
  var common = typeof module != 'undefined' && !!module.exports
    , aok = common ? require('aok') : root.aok
    , energy = common ? require('../src') : root.energy
    , emitters = [energy(), new energy]
    , key = 'key'
    , indexOf = [].indexOf

  function noop() {}
  function yes() { return true }
  
  function test(emitter, i) {
    var ran = []
    
    aok('instance-' + i, emitter instanceof energy)
    aok('listeners-' + i, typeof emitter.listeners(key).length == 'number')
    
    !function(id) {
      var bool = true, gone = indexOf ? function(what) {
        return -1 === emitter.listeners(key).indexOf(what)
      } : yes
      
      emitter.on(key, noop).off(key, noop)
      if (bool = gone(noop)) {
        emitter.on(key, noop).on(key, noop).off(key, noop)
        bool = gone(noop)
      }
      
      aok(id, bool)
      emitter.off(key, noop)
    }('off')

    emitter.off(key).once(key, function() {
      ran[i] = true
      aok('once-' + i, 0 === emitter.listeners(key).length)
    }).emit(key)
    
    aok('to', function() {
      var bool = wannabe === energy.to(wannabe) && typeof wannabe.emit == 'function'
      function wannabe() {
        wannabe.emit('called')
      }

      bool && wannabe.once('called', function() {
        bool = wannabe === this
      }) && wannabe()
      return bool
    })
    
    !function(id, n) {
      var i = n, initial = emitter.listeners(key).length
      emitter.off(key, noop)
      while (i--) emitter.on(key, noop)
      aok(id, n === emitter.listeners(key).length - initial)
      emitter.off(key, noop)
    }('repeat', 3)
    
    setTimeout(function() {
      if (ran[i]) aok.info('All tests ran for group ' + i)
      else aok.warn('Group ' + i + ' tests did not complete.')
    }, 0)
  }
  
  aok.pass(emitters, test)
  if (common) aok(require('deep-equal').apply(null, emitters))
}(this);