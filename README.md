# WIP lape

Simple and memory efficient state manager.

Built for games and complex apps, to prevent Garbage Collector induced lag spikes.


```typescript
  // STATE.ts
  import { proxify } from "lape";

  export interface State {
    count: number;
    deep: {
      nest: boolean;
    };
  }

  const defaultState: State = {
    count: 0,
    deep: {
      nest: true
    }
  };

  export default proxify(defaultState);
```

```typescript
  // APP.tsx
  import state from '@state' // using ts paths here

  const action = () => {
    state.count += 1;
  };

  class App extends React.Component {
    render() {
      return <div onClick={action}>{state.count}</div>;
    }
  }

  export default connect(App)
```


