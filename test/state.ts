import { lape } from "@lape";

interface arr {
  amount: number;
}

export interface State {
  count: number;
  deep: {
    nest: boolean;
  };
  array: arr[];
}

const defaultState: State = {
  count: 0,
  deep: {
    nest: true
  },
  array: [
    {
      amount: 1233
    }
  ]
};

export default lape(defaultState);
