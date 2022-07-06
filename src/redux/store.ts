import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth";
import peopleReducer from "../redux/people";
import statsReducer from "../redux/stats";

export const store = configureStore({
  reducer: {
    //* pass the reducers in here as key value pairs
    auth: authReducer,
    people: peopleReducer,
    stats: statsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
