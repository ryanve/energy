# [emits](../../)
#### simple event emitter based on [`EventEmitter`](http://nodejs.org/api/events.html)

## API ([0.0](../../releases))

### `emits()` &rArr; `emits` instance

```js
// Create an emitter
var emitter = emits()
```

### Methods

#### `emitter` inherits from `emits.prototype`

- `emitter.listeners(event)` &rArr; array
- `emitter.on(event, fn)` &rArr; emitter
- `emitter.off(event?, fn?, occurrences?)` &rArr; emitter
- `emitter.emit(event, args...)` &rArr; integer
- `emitter.once(event, fn)` &rArr; emitter
- `emitter.many(event, times, fn)` &rArr; emitter
- `emitter.init()` &rArr; emitter

### Utilities

- `emits.applies(fns, scope, args, breaker?)` &rArr; integer

## License: [MIT](http://opensource.org/licenses/MIT)

Copyright (C) 2013 by [Ryan Van Etten](https://github.com/ryanve)