import { getThisMonthsTrips } from '../lib/api/api';
import { calcFrequencies, streak, weeklyData } from '../lib/helpers';
import { AppThunk } from '../lib/types';
import {
  endStatsRequest,
  setCurrentStreak,
  setMonthlyStats,
  setStatsError,
  setTrips,
  setWeeklyStats,
  startStatsRequest
} from '../redux/stats';

export const trips_thunk = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startStatsRequest());
    const data = await getThisMonthsTrips();

    if (!data) {
      dispatch(setStatsError('no trip data available'));
      return;
    }

    dispatch(setTrips(data));

    // if the user has no trips because it's their first time using the app, return
    if (data.length === 0) return;

    const { person: monthlyPerson, frequency: monthlyFrequency } =
      calcFrequencies(data);

    const totalMonthlyStats = {
      person: monthlyPerson,
      total: monthlyFrequency
    };

    dispatch(setMonthlyStats(totalMonthlyStats));

    const formatDataToWeekly = weeklyData(data);

    const { person: weeklyPerson, frequency: weeklyFrequency } =
      calcFrequencies(formatDataToWeekly);

    const totalWeeklyStats = {
      person: weeklyPerson,
      total: weeklyFrequency
    };
    dispatch(setWeeklyStats(totalWeeklyStats));

    const { person, streakCount } = streak(data);

    const totalCurrentStreak = {
      person,
      total: streakCount
    };
    dispatch(setCurrentStreak(totalCurrentStreak));
    dispatch(endStatsRequest());
  } catch (error) {
    dispatch(setStatsError('unable to fetch trip data'));
    console.log(error);
  }
};
