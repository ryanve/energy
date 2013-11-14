# [emits](../../)
#### simple events emitter based on [`EventEmitter`](http://nodejs.org/api/events.html)

## API ([0.0](../../releases))

### `emits()` &rArr; `emits` instance

```js
// Create an emitter
var emitter = emits()
```

### Methods

#### `emitter` inherits from `emits.prototype`

- `emitter.listeners(name)` &rArr; array
- `emitter.on(name, fn)` &rArr; emitter
- `emitter.off(name?, fn?, occurrences?)` &rArr; emitter
- `emitter.emit(name, args...)` &rArr; integer
- `emitter.once(name, fn)` &rArr; emitter
- `emitter.many(name, times, fn)` &rArr; emitter
- `emitter.init()` &rArr; emitter

### Utilities

- `emits.applies(fns, scope, args, breaker?)` &rArr; integer

## License: [MIT](http://opensource.org/licenses/MIT)

Copyright (C) 2013 by [Ryan Van Etten](https://github.com/ryanve)