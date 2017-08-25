
export let state;

let listenerList = []
export function listen(callback, shouldCallImmediately = true) {
    listenerList = listenerList.concat(callback)

    if(shouldCallImmediately){
        callback(state)
    }

    // listen usually returns a function that allows a user to stop listening
    return function unlisten() {
        listenerList = listenerList.filter(fn => fn !== callback)
    }
}

export function setState(newState) {

    const oldState = state

    // change the state to a new one before calling listeners
    state = newState
    
    listenerList.forEach(callback => callback(state, oldState))
}

export function _reset() {
    listenerList = []
    state = undefined
}

export default {
    state,
    listen,
    setState,
}