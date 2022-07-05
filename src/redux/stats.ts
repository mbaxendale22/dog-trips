import { createSlice } from "@reduxjs/toolkit";

type Stats = {
  weeklyStats: {
    person: string;
    total: number;
  };
  monthlyStats: {
    person: string;
    total: number;
  };
  currentStreak: {
    person: string;
    total: number;
  };
};

export const initialState: Stats = {
  weeklyStats: {
    person: "",
    total: 0,
  },
  monthlyStats: {
    person: "",
    total: 0,
  },
  currentStreak: {
    person: "",
    total: 0,
  },
};

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    //insert reducers here
  },
});

// export const authRememberMeSelector = ({ auth }: RootState) => auth.rememberMe
