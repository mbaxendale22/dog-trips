import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DatedTrip, RootState } from "../lib/types";

/* 
Types
*/

type SingleStat = {
  person: string;
  total: number;
};

type Stats = {
  trips: DatedTrip[] | null;
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
  api: {
    isLoading: boolean;
    error: boolean;
  };
};

/* 
State & Reducers 
*/

export const initialState: Stats = {
  trips: [],
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
  api: {
    isLoading: false,
    error: false,
  },
};

export const peopleSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    //insert redcers here
    setWeeklyStats: (state, action: PayloadAction<SingleStat>) => {
      state.weeklyStats = action.payload;
    },
    setMonthlyStats: (state, action: PayloadAction<SingleStat>) => {
      state.monthlyStats = action.payload;
    },
    setCurrentStreak: (state, action: PayloadAction<SingleStat>) => {
      state.currentStreak = action.payload;
    },
    startStatsRequest: (state) => {
      state.api.isLoading = true;
      state.api.error = false;
    },
    setStatsError: (state) => {
      state.api.error = true;
    },
    endStatsRequest: (state) => {
      state.api.isLoading = false;
      state.api.error = false;
    },
    setTrips: (state, action: PayloadAction<DatedTrip[] | null>) => {
      state.trips = action.payload;
    },
  },
});

export const {
  setWeeklyStats,
  setMonthlyStats,
  setCurrentStreak,
  startStatsRequest,
  setStatsError,
  endStatsRequest,
  setTrips,
} = peopleSlice.actions;

export default peopleSlice.reducer;

/* 
Selectors
*/

export const weeklyStatsSelector = ({ stats }: RootState) => stats.weeklyStats;

export const monthlyStatsSelector = ({ stats }: RootState) =>
  stats.monthlyStats;

export const currentStreakSelector = ({ stats }: RootState) =>
  stats.currentStreak;

export const statsLoadingSelector = ({ stats }: RootState) =>
  stats.api.isLoading;

export const statsErrorSelector = ({ stats }: RootState) => stats.api.error;

export const tripsSelector = ({ stats }: RootState) => stats.trips;
