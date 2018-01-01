# energy
#### simple [cross-platform](#platforms) event emitter based on [`EventEmitter`](http://nodejs.org/api/events.html)

## API

#### Create an emitter instance

```js
var energy = require('energy')
var emitter = energy()
```

Or use `new` if you prefer. Either way works :)

```js
var energy = require('energy')
var emitter = new energy()
```

#### Methods
- [emitter.<b>on</b>(event, listener)](#emitter-on)
- [emitter.<b>off</b>(event?, listener?, quota?)](#emitter-off)
- [emitter.<b>emit</b>(event, ...args)](#emitter-emit)
- [emitter.<b>once</b>(event, listener)](#emitter-once)
- [emitter.<b>clone</b>()](#emitter-clone)
- [emitter.<b>listeners</b>(event)](#emitter-listeners)
- [emitter.<b>init</b>()](#emitter-init)
- [emitter.<b>to</b>(target)](#emitter-to)
- [<b>energy</b>.to(target)](#energy-to)
- [<b>energy</b>.applies(fns, scope, args, breaker?)](#energy-applies)

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
- <b>@return</b> <var>emitter</var>

<a name="emitter-clone"></a>
#### `emitter.clone()`
- Clone an emitter at its current state
- <b>@return</b> a new emitter

<a name="emitter-listeners"></a>
#### `emitter.listeners(event)`
- Access the listeners array for the specified <var>event</var>
- <b>@return</b> array (reference)

<a name="emitter-init"></a>
#### `emitter.init()`
- Reinitialize an emitter
- <b>@return</b> <var>emitter</var>

<a name="emitter-to"></a>
#### `emitter.to(target)`
- Make <var>target</var> [emitter-like](../../issues/3) based on `emitter` as the source.
- <b>@return</b> <var>emitter</var>

<a name="energy-to"></a>
#### `energy.to(target)`
- Make <var>target</var> emitter-like based on a `energy()` object as the source
- <b>@return</b> <var>target</var> with emitter methods and properties

<a name="energy-applies"></a>
#### `energy.applies(fns, scope, args, breaker?)`
- Apply each function with <var>scope</var> and <var>args</var>
- If <var>breaker</var> is defined, then functions can return <var>breaker</var> to abort subsequent applies
- <b>@return</b> integer (number of functions that fired)

<a name="platforms"></a>
## Compatibility

Works in [node](http://nodejs.org) **and** in any browser. Tested in node, Chrome, FF, Opera, IE8
