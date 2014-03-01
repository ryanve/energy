# energy
#### simple cross-platform event emitter based on [`EventEmitter`](http://nodejs.org/api/events.html)

## API ([0.2](../../releases))

### `energy()` &rArr; `energy` instance

```js
// Create an emitter
var emitter = energy()
```

### Methods

#### `emitter` inherits from `energy.prototype`

- `emitter.listeners(event)` &rArr; array
- `emitter.on(event, fn)` &rArr; emitter
- `emitter.off(event?, fn?, occurrences?)` &rArr; emitter
- `emitter.emit(event, args...)` &rArr; integer
- `emitter.once(event, fn)` &rArr; emitter
- [@deprecated](../../issues/2) `emitter.many(event, times, fn)` &rArr; emitter
- `emitter.init()` &rArr; emitter

### Utilities

- `energy.applies(fns, scope, args, breaker?)` &rArr; integer

## License

[MIT](package.json#L6-L7)