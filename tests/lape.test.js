import test from 'ava';

import lape from '../dist/index';

const defaultState = {
    count : 0
}

let app = lape(defaultState)
let { listen, evolveState, _reset} = app;

test.beforeEach(t => {
    _reset()
});

// https://github.com/avajs/ava#assertions

test('state is equal to default state', t => {
    t.is(app.state, defaultState)
});

test('Listeners are immediately called', t => {
    listen((newStateReturned)=> t.is(newStateReturned, defaultState))
});

test('Listeners are not immediately called when a flag is set', t => {
    listen((newStateReturned)=> t.fail(), false)
    t.pass()
});

test('Evolving state calls a listener with the new state', t => {
    const newState = {count: 1}
    const newStateEvolver = {count: () => 1}
    listen((newStateReturned)=> t.deepEqual(newStateReturned, newState), false)
    evolveState(newStateEvolver)
});

test('Unlistening works', t => {
    const newStateEvolver = {count: (count) => count + 1}
    const unlisten = listen((newStateReturned)=> t.fail(), false)
    unlisten()
    evolveState(newStateEvolver)
    t.pass()
});

test('Listen provides old state too', t => {
    const newStateEvolver = {count: (count) => count + 1}
    listen((newStateReturned, oldState)=> t.deepEqual(oldState, defaultState), false)
    evolveState(newStateEvolver)
});

test('state is equal to default state', t => {
    t.is(app.state, defaultState)
    const newStateEvolver = {count: (count) => count + 1}
    evolveState(newStateEvolver)
    listen((oldState) => console.log(oldState))
    const newState = {count: 1}
    t.deepEqual(app.state, newState)
});

test('Listen gets currents state as the oldState', t => {
    listen((newStateReturned, oldState)=> t.is(newStateReturned, app.state))
});