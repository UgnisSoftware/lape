import test from 'ava';

import {state, listen, setState, evolveState, _reset} from '../dist/index';

const defaultState = {
    count : 0
}

test.afterEach(t => {
    _reset()
});

// https://github.com/avajs/ava#assertions

test('SetState sets the state', t => {
    t.is(state, undefined)
    setState(defaultState)
    t.is(state, defaultState)
});

test('Listeners are immediately called', t => {
    setState(defaultState)

    listen((newStateReturned)=> t.is(newStateReturned, defaultState))
});

test('Listeners are not immediately called when a flag is set', t => {
    setState(defaultState)

    listen((newStateReturned)=> t.fail(), false)
    t.pass()
});

test('Setting state calls a listener with the new state', t => {
    setState(defaultState)

    const newState = {count: 1}
    listen((newStateReturned)=> t.is(newStateReturned, newState), false)
    setState(newState)
});

test('Unlistening works', t => {
    setState(defaultState)

    const newState = {count: 1}
    const unlisten = listen((newStateReturned)=> t.fail(), false)
    unlisten()
    setState(newState)
    t.pass()
});

test('Listen provides old state too', t => {
    setState(defaultState)

    const newState = {count: 1}
    listen((newStateReturned, oldState)=> t.is(oldState, defaultState), false)
    setState(newState)
});

test('Listen gets currents state as the oldState', t => {
    setState(defaultState)

    listen((newStateReturned, oldState)=> t.is(oldState, defaultState))
});

test('EvolveState changes the state', t => {
    t.is(state, undefined)
    setState(defaultState)
    t.is(state, defaultState)
    evolveState({
        count: (count) => 10
    })
    t.deepEqual(state, {
        count: 10
    })
});