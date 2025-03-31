import { configureStore } from "@reduxjs/toolkit";
import applicationsReducer from "./slices/applicationsSlice";
import newApplicationReducer from "./slices/applicationsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      applications: applicationsReducer,
      application: newApplicationReducer,
    },
  });
};
