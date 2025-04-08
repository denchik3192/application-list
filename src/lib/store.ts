import { configureStore } from "@reduxjs/toolkit";
import applicationsReducer from "./slices/applicationsSlice";
import newApplicationReducer from "./slices/applicationsSlice";
import prioritiesReducer from "./slices/prioritiesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      applications: applicationsReducer,
      application: newApplicationReducer,
      priorities: prioritiesReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
