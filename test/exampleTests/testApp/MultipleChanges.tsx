import state from "./state";
import { connect, useLape } from "lape";

const MultipleChanges = () => {
  const localState = useLape({
    count: 0,
    shouldCrashIfAbove0: true,
  });
  const onClick = () => {
    state.count += 1;
    localState.count += 1;
    localState.shouldCrashIfAbove0 = false;
  };

  if (state.count !== localState.count) {
    throw Error("Multiple Render detected, lape should rerender after all changes applied");
  }

  if (localState.count > 0 && localState.shouldCrashIfAbove0) {
    throw Error("Multiple Render detected, lape should rerender after all changes applied");
  }

  return (
    <div style={{ margin: 20 }}>
      <div onClick={onClick}>
        G:{state.count}, L:{localState.count}
      </div>
    </div>
  );
};

export default connect(MultipleChanges);
