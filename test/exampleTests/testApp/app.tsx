import * as React from "react";
import state from "./state";
import { connect } from "../../../src";

const actionSimple = () => {
  state.count += 1;
};
export const SimpleCount = connect(() => (
  <div style={{ margin: 20 }} onClick={actionSimple}>
    Simple counter: {state.count}
  </div>
));

// const actionDeep = () => {
//   state.deep.nest = !state.deep.nest;
// };
// const DeepChange = connect(() => (
//   <div style={{ margin: 20 }} onClick={actionDeep}>
//     {state.deep.nest.toString()}
//   </div>
// ));
//
// const actionIncrement = (i) => () => {
//   recordUndo(() => {
//     state.array[i].amount += 123;
//   });
// };
// const actionAdd = () => {
//   recordUndo(() => {
//     state.array.push({ amount: 123 });
//   });
// };
// const actionRemove = (i) => () => {
//   recordUndo(() => {
//     state.array.splice(i, 1);
//   });
// };
//
// const Array = connect(() => (
//   <div style={{ margin: 20 }}>
//     {state.array.map((data, i) => (
//       <div key={i}>
//         <div onClick={actionIncrement(i)}>{data.amount}</div>
//         <span onClick={actionRemove(i)}>x</span>
//       </div>
//     ))}
//     <div onClick={actionAdd}>add</div>
//   </div>
// ));
//
// const FirstArray = connect(() => (
//   <div style={{ margin: 20 }}>
//     <div>
//       <div onClick={actionIncrement(0)}>{state.array[0]?.amount}</div>
//     </div>
//   </div>
// ));
//
// const Four = connect(() => {
//   const localState = useLape({
//     count: 1,
//   });
//
//   const onClick = () => {
//     recordUndo(() => {
//       localState.count = localState.count + 1;
//       localState.count = localState.count + 1;
//       localState.count = localState.count + 1;
//     }, "counts");
//   };
//
//   return (
//     <div style={{ margin: 20 }}>
//       <span onClick={() => undo("counts")}>{" <="}</span>
//       <span>{"      "}</span>
//       <span onClick={() => redo("counts")}>{"=>"}</span>
//       <div onClick={onClick}>{localState.count}</div>
//     </div>
//   );
// });
//
// const DateComponent = connect(() => {
//   const onClick = () => {
//     state.date = new Date();
//   };
//
//   return (
//     <div style={{ margin: 20 }}>
//       <div onClick={onClick}>{state.date.toISOString()}</div>
//     </div>
//   );
// });
//
// const GlobalLocalUndo = connect(() => {
//   const localState = useLape({
//     count: 0,
//   });
//   const onClick = () => {
//     recordUndo(() => {
//       state.count += 1;
//       localState.count += 1;
//     });
//   };
//
//   return (
//     <div style={{ margin: 20 }}>
//       <div onClick={onClick}>
//         G: {state.count}, L: {localState.count}
//       </div>
//     </div>
//   );
// });
//
// const Collection = connect(() => {
//   return (
//     <div style={{ margin: 20 }}>
//       {Object.values(state.users).map((user) => {
//         const onClick = () => {
//           recordUndo(() => {
//             user.name += 1;
//             delete user.email;
//           });
//           state.users["abc" + Math.random()] = {
//             name: "abc",
//             email: "abc@abc.com",
//           };
//         };
//         return (
//           <div onClick={onClick}>
//             Name: {user.name}, Email: {user.email}
//           </div>
//         );
//       })}
//     </div>
//   );
// });
