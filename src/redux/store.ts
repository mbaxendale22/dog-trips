import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    //* pass the reducers in here as key value pairs
    // auth: authReducer,
    // digitalAssets: digitalAssetsReducer,
    // logs: logsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
