# energy
#### simple [cross-platform](#platforms) event emitter based on [`EventEmitter`](http://nodejs.org/api/events.html)

## API ([0.3](../../releases))

### `energy()` &rArr; `energy` instance

```js
// Create an emitter.
var emitter = energy()
```

### emitter methods
- `emitter.listeners(event)` &rArr; array
- `emitter.on(event, fn)` &rArr; emitter
- `emitter.off(event?, fn?, occurrences?)` &rArr; emitter
- `emitter.emit(event, args...)` &rArr; integer
- `emitter.once(event, fn)` &rArr; emitter
- `emitter.init()` &rArr; emitter

### static utilities
- `energy.applies(fns, scope, args, breaker?)` &rArr; integer

<a name="platforms"></a>
## Compatibility

Works in node **and** in any browser. Tested in node, Chrome, FF, Opera, IE8

## Contribute
Make edits in [/<b>src</b>](./src). Run [tests](test) in [node](#cli) or in the [browser](test/index.html).

<a name="cli"></a>
```sh
$ npm install # install devDependencies
$ grunt jshint:sub # lint sub dirs
$ grunt test # run tests
```

## Fund
<b>[Tip the developer](https://www.gittip.com/ryanve/)</b> =)

## License

[MIT](package.json#L6-L7)