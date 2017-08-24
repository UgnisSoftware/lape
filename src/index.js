export default (defaultState) => {
    
    // keep a reference for new listeners
    let state = defaultState;

    let listenerList = []
    function listen(callback, shouldCallImmediately = true) {
        listenerList = listenerList.concat(callback)

        if(shouldCallImmediately){
            callback(state)
        }
        
        // listen usually returns a function that allows a user to stop listening
        return function unlisten() {
            listenerList = listenerList.filter(fn => fn !== callback)
        }
    }

    function setState(reducer) {

        const newState = reducer(state)

        listenerList.forEach(callback => callback(newState, state))

        state = newState
    }
    
    return {
        listen,
        setState,
    }
}