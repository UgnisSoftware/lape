# lape
Global state manager.

A simplified version of ELM/Redux.


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


There is an useful Ramda Evolve + setState shortcut:
```javascript
    import {evolveState} from 'lape'

    setState({a: 1})

    evolveState({a: (oldA)=> oldA + 1})

    console.log(state)                      // {a: 2}
```

Should be used only with other libraries that derive side effects from state - virtual-dom like React, and something handwritten for fetching, timers and other side effects.
