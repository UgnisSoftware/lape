# Lape

[ugnissoftware.github.io/lape/](ugnissoftware.github.io/lape/)

Simple state manager for React built on Proxies.

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
import state from "./state";

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
