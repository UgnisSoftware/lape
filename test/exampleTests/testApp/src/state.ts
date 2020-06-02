import { lape } from "lape";

interface arr {
  amount: number;
}

interface Collection {
  name: string;
  email: string;
}

export interface State {
  count: number;
  deep: {
    nest: boolean;
  };
  array: arr[];
  date: Date;
  users: { [key: string]: Collection };
}

const defaultState: State = {
  count: 0,
  deep: {
    nest: true,
  },
  array: [
    {
      amount: 1233,
    },
  ],
  date: new Date(),
  users: {
    "1-id": {
      name: "asdasd",
      email: "asdasd@john.com",
    },
  },
};

export default lape(defaultState);
