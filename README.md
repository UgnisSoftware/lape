# Lape - state manager for React

Simple, mutable, memory efficient state manager built on Proxies.

Supports only the latest browsers.

## Example

```typescript
// STATE.ts
import { lape } from "lape";

export interface State {
  count: number;
  deep: {
    nest: boolean;
  };
}

const defaultState: State = {
  count: 0,
  deep: {
    nest: true,
  },
};

export default lape(defaultState);
```

```typescript
// APP.tsx
import { connect } from "lape";
import state from "@state"; // using ts paths here

const action = () => {
  state.count += 1;
};

class App extends React.Component {
  render() {
    return <div onClick={action}>{state.count}</div>;
  }
}

export default connect(App);
```

## Example explained:

Every app consists of 3 parts:

- State - a simple JSON structure
- Side-effects - rendering to DOM, fetching from server, setting timers, etc.
- Events - functions that change the state

### State

State can be any JSON structure that is passed into a `proxify` function. The `proxify` function transparently wraps all of your data and emits events on any Get or Set operations.

Note:

- don't put derived state\* / cache into your real state, always derive it from the "base" state with functions
- don't put functions into state.

\* Derived state is any state that can be calculated from another state

### Side effects

#### React

`connect` is a small wrapper around your component that records any Get operations from state. If any event changes the tracked state, the component will trigger it's render function.

#### Virtual fetch

Not implemented yet, use promises or async/await

### Events

Events is a function that mutates the state. Don't trigger it while doing side-effects or it might loop. Every side effect that used the changed state will update automatically.

## Pro tips:

- You should `connect` every component that uses global state, connecting just the root is fine, but connecting more is a good optimisation
- Don't mutate the state in render (same as setState())
- The end nodes, like strings/numbers/booleans, are not proxies, so don't do `lape('abc')`, have at least one parent `lape({name: 'abc'})`
- Same goes for reassignment:

```
const state = lape({user: {name: 'abc'}})
let name = state.user.name
name = 'cba' // This will not change the state, only reassign local variable because primitives are immutable in JS

let user = state.user
user.name = 'cba' // This will work as objects are shared by reference
```
