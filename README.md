# energy
#### simple [cross-platform](#platforms) event emitter based on [`EventEmitter`](http://nodejs.org/api/events.html)

## API ([0.3](../../releases))

#### Require `energy`

```js
var energy = require('energy')
```

#### Create an emitter instance

```js
var emitter = energy()
```

#### Methods
- [emitter.<b>on</b>(event, listener)](#emitter-on)
- [emitter.<b>off</b>(event?, listener?, quota?)](#emitter-off)
- [emitter.<b>emit</b>(event, ...args)](#emitter-emit)
- [emitter.<b>once</b>(event, listener)](#emitter-once)
- [emitter.<b>listeners</b>(event)](#emitter-listeners)
- [energy.<b>applies</b>(fns, scope, args, breaker?)](#energy-applies)

#### Parameters

- <var>emitter</var> refers to an `energy()` object
- <var>event</var> refers to an event name
- <var>listener</var> refers to a function that listens to an event

<a name="emitter-on"></a>
#### `emitter.on(event, listener)`
- Add <var>listener</var> for <var>event</var>
- <b>@return</b> emitter

<a name="emitter-off"></a>
#### `emitter.off(event?, listener?, quota?)`
- Remove listener(s)
  - `.off()` removes all listeners for all events
  - `.off(event)` removes all <var>event</var> listeners
  - `.off(event, listener)` removes all occurrences of <var>event</var> <var>listener</var>
  - `.off(event, listener, quota)` remove <var>quota</var> occurrences of <var>event</var> <var>listener</var>
- <b>@return</b> emitter

<a name="emitter-emit"></a>
#### `emitter.emit(event, ...args)`
- Fire <var>event</var> listeners (in sequence) with the supplied arguments
- Listeners run in the context of <var>emitter</var>
- <b>@return</b> integer (number of listeners that fired)

<a name="emitter-once"></a>
#### `emitter.once(event, listener)`
- Add a one-time <var>event</var> <var>listener</var>
- <b>@return</b> emitter

<a name="emitter-listeners"></a>
#### `emitter.listeners(event)`
- Access the listeners array for the specified <var>event</var>
- <b>@return</b> array (reference)

<a name="emitter-init"></a>
#### `emitter.init()`
- Reinitialize an emitter 
- <b>@return</b> emitter

<a name="energy-applies"></a>
#### `energy.applies(fns, scope, args, breaker?)`
- Apply each function with <var>scope</var> and <var>args</var>
- If <var>breaker</var> is defined, then functions can return <var>breaker</var> to abort subsequent applies
- <b>@return</b> integer (number of functions that fired)

<a name="platforms"></a>
## Compatibility

Works in [node](http://nodejs.org) **and** in any browser. Tested in node, Chrome, FF, Opera, IE8

## Contribute
To make edits, first [fork the repo](https://help.github.com/articles/fork-a-repo), clone your fork, and `cd` into it. Run [tests](test) via the commands below and/or in a [browser](test/index.html). Make edits in [src](src) and [test](test) as needed. Push your changes and then submit a [pull request](https://help.github.com/articles/using-pull-requests). Builds (in the [project root](../../)) are created later via `grunt` and should not be changed in pull requests. CLI commands require [node](http://nodejs.org) and the [grunt-cli](http://gruntjs.com/getting-started) on your system.

<a name="cli"></a>
```sh
$ npm install -g grunt-cli # install grunt-cli if you haven't already
$ npm install # install devDependencies from package.json
$ grunt jshint:sub # lint sub dirs
$ grunt test # run tests
```

## Fund
Support this project by [tipping the developer](https://www.gittip.com/ryanve/) <samp><b>=)</b></samp>

## License

[MIT](package.json#L6-L7)