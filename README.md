# lape
Global state manager - useful when trying to refactor out of a sticky situations.

A simplified mash of Redux and Onionify, based on Lambda calculus.

Makes all of your code access a single global state:

```javascript
    import {state, setState, listen} from 'lape'

    console.log(state)            // undefined

    setState(1)

    console.log(state)            // 1

    listen((state, oldState) => { // Do side effect in listen
        console.log(state)        // logs 1 immediately
    }, true)                      // flag for immediate invocation, default is true

    setState(2)                   // listen logs 2
```

Should be used only with other libraries that derive side effects from state - virtual-dom like React, and something handwritten for fetching, timers and other side effects.
