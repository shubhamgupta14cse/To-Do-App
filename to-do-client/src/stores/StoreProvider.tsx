"use client";

import { createContext, useContext } from "react";
import { taskStore } from "./TaskStore";

const StoreContext = createContext({ taskStore });

export const StoreProvider = ({ children }: any) => {
  const stores = {
    taskStore,
  };

  return (
    <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
