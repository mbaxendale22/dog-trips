import type { Action, ThunkAction } from "@reduxjs/toolkit";
import type { store } from "../redux/store";

export type User = {
  id: number;
  createdAt: string;
  user_id: string;
  name: string;
  household: number;
};

export type DatedTrip = {
  id: number;
  created_at: string;
  user_profile: {
    id: number;
    created_at: string;
    name: string;
    household: number;
  };
  household: number;
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
