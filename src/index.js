import evolve from 'ramda/src/evolve'

export let state;

let listenerList = []
export function listen(callback, shouldCallImmediately = true) {
    listenerList = listenerList.concat(callback)

    if(shouldCallImmediately){
        callback(state, state)
    }

    // listen usually returns a function that allows a user to stop listening
    return function unlisten() {
        listenerList = listenerList.filter(fn => fn !== callback)
    }
}

export function setState(newState) {

    const oldState = state

    state = newState
    
    listenerList.forEach(callback => callback(state, oldState))
}


export function evolveState(evolver) {

    setState(evolve(evolver, state))
}

export function _reset() {
    listenerList = []
    state = undefined
}