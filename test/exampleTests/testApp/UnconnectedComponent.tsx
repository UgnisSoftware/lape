/** @jsxImportSource lape */
import state from "./state";

const actionSimple = () => {
  state.count += 1;
};
const NoConnectCount = () => (
  <div style={{ margin: 20 }} onClick={actionSimple}>
    Simple counter: {state.count}
  </div>
);

export default NoConnectCount;
