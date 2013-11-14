(function(root) {
    var common = typeof module != 'undefined' && !!module.exports
      , aok = common ? require('../node_modules/aok') : root.aok
      , emits = common ? require('../src') : root.emits
      , emitter = emits()
      , key = 'key'
      , indexOf = [].indexOf
      , ran = false;

    function noop() {}
    function yes() { return true; }
     
    aok({
        id: 'instance'
      , test: emitter instanceof emits
    });

    aok({
        id: 'listeners'
      , test: typeof emitter.listeners(key).length == 'number'
    });
    
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
        aok({
            id: 'once'
          , test: 0 === emitter.listeners(key).length 
        });
    }).emit(key);

    (function(id, n, tally) {
        emitter.off(key).many(key, n, function() {
            ++tally;
            n == tally ? aok({
                id: id 
              , test: true
            }) : n < tally && aok({
                id: id
              , test: false
            });
        });
        while (n--) emitter.emit(key);
        emitter.emit(key); // extra call checks if it was removed
    }('many', 2, 0));
    
    (function(id, n) {
        var i = n, initial = emitter.listeners(key).length;
        emitter.off(key, noop);
        while (i--) emitter.on(key, noop);
        aok({
            id: id
          , test: n === (emitter.listeners(key).length-initial)
        });
        emitter.off(key, noop);
    }('repeat', 3));

    setTimeout(function() {
        ran || aok.warn('Expected tests did not run yet.');
    }, 1000);
}(this));