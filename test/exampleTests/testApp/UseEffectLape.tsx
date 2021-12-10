import state from "./state";
import { connect, useLape } from "lape";
import { useLapeEffect } from "../../../src/hook/hook";

const DeriveLocalState = () => {
  const localState = useLape({
    count: 0,
  });
  const onClick = () => {
    state.count += 1;
  };

  useLapeEffect(() => {
    localState.count = state.count
  })

  return (
    <div style={{ margin: 20 }}>
      <div onClick={onClick}>
        G:{state.count}, L:{localState.count}
      </div>
    </div>
  );
};

export default connect(DeriveLocalState);
