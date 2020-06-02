import { useMemo } from "react";
import { proxify } from "../proxify";

export const useLape = <T extends {}>(initialState: T): T => {
  const state = useMemo(() => initialState, []);

  return proxify(state);
};
