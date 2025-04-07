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
