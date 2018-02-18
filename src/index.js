import evolve from 'ramda/src/evolve'

export let _allApps = []

export default (defaultState) => {

    const appRef = {
        state: defaultState,
        evolveState,
        listen,
        _reset,
        _triggerListeners,
    }
    
    _allApps.push(appRef)

    let listenerList = []
    function listen(callback, shouldCallImmediately = true) {
        listenerList = listenerList.concat(callback)

        if(shouldCallImmediately){
            callback(appRef.state, appRef.state)
        }

        // listen usually returns a function that allows a user to stop listening
        return function unlisten() {
            listenerList = listenerList.filter(fn => fn !== callback)
        }
    }

    function evolveState(evolver) {
        
        const oldState = appRef.state

        appRef.state = evolve(evolver, appRef.state);

        listenerList.forEach(callback => callback(appRef.state, oldState))
    }

    function _reset() {
        listenerList = []
        appRef.state = defaultState
    }
    
    function _triggerListeners() {
        listenerList.forEach(callback => callback(appRef.state, appRef.state))
    }
    
    return appRef
}