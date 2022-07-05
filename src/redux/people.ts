import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../lib/types";

type Person = {
  id: number;
  createdAt: string;
  name: string;
  household: number;
};

type PeopleState = {
  api: {
    isLoading: boolean;
    error: boolean;
  };
  users: Person[] | null | undefined;
};

export const initialState: PeopleState = {
  api: {
    isLoading: false,
    error: false,
  },
  users: [],
};

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    startUserRequest: (state) => {
      state.api.isLoading = true;
      state.api.error = false;
    },

    setUserError: (state) => {
      state.api.error = true;
    },

    endUserRequest: (state) => {
      state.api.isLoading = false;
      state.api.error = false;
    },

    setUser: (state, action: PayloadAction<Person[] | null | undefined>) => {
      state.users = action.payload;
    },
  },
});

export const { startUserRequest, setUserError, endUserRequest, setUser } =
  peopleSlice.actions;

export default peopleSlice.reducer;

export const peopleIsLoadingSelector = ({ people }: RootState) =>
  people.api.isLoading;
export const peopleIsErrorSelector = ({ people }: RootState) =>
  people.api.error;
export const peopleUserSelector = ({ people }: RootState) => people.api.users;
