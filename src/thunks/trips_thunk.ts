import { getThisMonthsTrips } from "../lib/api/api";
import { calcFrequencies, streak, weeklyData } from "../lib/helpers";
import { AppThunk, DatedTrip } from "../lib/types";
import {
  endStatsRequest,
  setMonthlyStats,
  setStatsError,
  setTrips,
  setWeeklyStats,
  startStatsRequest,
} from "../redux/stats";

export const trips_thunk = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startStatsRequest());
    const data = await getThisMonthsTrips();

    dispatch(setTrips(data));

    const { person: monthlyPerson, frequency: monthlyFrequency } =
      calcFrequencies(data as DatedTrip[]);

    const totalMonthlyStats = {
      person: monthlyPerson,
      total: monthlyFrequency,
    };

    dispatch(setMonthlyStats(totalMonthlyStats));

    const formatDataToWeekly = weeklyData(data as DatedTrip[]);

    const { person: weeklyPerson, frequency: weeklyFrequency } =
      calcFrequencies(formatDataToWeekly);

    const totalWeeklyStats = {
      person: weeklyPerson,
      total: weeklyFrequency,
    };
    dispatch(setWeeklyStats(totalWeeklyStats));

    const { person, streakCount } = streak(data as DatedTrip[]);

    const totalCurrentStreak = {
      person,
      total: streakCount,
    };
    dispatch(setWeeklyStats(totalCurrentStreak));
    dispatch(endStatsRequest());
  } catch (error) {
    dispatch(setStatsError());
    console.log(error);
  }
};
