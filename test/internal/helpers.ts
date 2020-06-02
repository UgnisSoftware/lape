import { lape, resetUndoStack } from "../../src";

interface arr {
  amount: number;
}

interface Collection {
  name: string;
  email: string;
}

interface State {
  count: number;
  deep: {
    nest: boolean;
  };
  array: arr[];
  date: Date;
  users: { [key: string]: Collection };
}

export const createNewState = () => {
  resetUndoStack();

  const defaultState: State = {
    count: 0,
    deep: {
      nest: true,
    },
    array: [
      {
        amount: 1,
      },
      {
        amount: 2,
      },
    ],
    date: new Date(),
    users: {
      "1-id": {
        name: "asdasd",
        email: "asdasd@john.com",
      },
      "2-id": {
        name: "asdd",
        email: "asdasd@john.com",
      },
    },
  };

  return lape(defaultState);
};
