import test from 'ava';

import lapeSnape from '../src/index';

const defaultState = {
    count : 0
}

// https://github.com/avajs/ava#assertions

test('Listeners are immediately called', t => {
    const state = lapeSnape(defaultState)

    state.listen((newStateReturned)=> t.is(newStateReturned, defaultState))
});

test('Listeners are not immediately called when a flag is set', t => {
    const state = lapeSnape(defaultState)

    state.listen((newStateReturned)=> t.fail(), false)
    t.pass()
});

test('Setting state calls a listener with the new state', t => {
    const state = lapeSnape(defaultState)

    const newState = {count: 1}
    state.listen((newStateReturned)=> t.is(newStateReturned, newState), false)
    state.setState(newState)
});

test('Unlistening works', t => {
    const state = lapeSnape(defaultState)

    const newState = {count: 1}
    const unlisten = state.listen((newStateReturned)=> t.fail(), false)
    unlisten()
    state.setState(newState)
    t.pass()
});

test('Listen provides old state too', t => {
    const state = lapeSnape(defaultState)

    const newState = {count: 1}
    state.listen((newStateReturned, oldState)=> t.is(oldState, defaultState), false)
    state.setState(newState)
});
