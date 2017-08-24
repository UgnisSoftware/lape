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

    function setState(newState) {
        state = newState
        
        listenerList.forEach(callback => callback(state))
    }
    
    return {
        listen,
        setState,
    }
}