import { postPerson, selectPerson } from "../lib/api/api";
import { calcFrequencies, streak, weeklyData } from "../lib/helpers";
import { AppThunk, DatedTrip } from "../lib/types";
import {
  clearSelectedUser,
  endUserRequest,
  setSelectedUser,
  setUserError,
  startUserRequest,
  usersSelector,
} from "../redux/people";
import {
  setCurrentStreak,
  setMonthlyStats,
  setWeeklyStats,
  tripsSelector,
} from "../redux/stats";

export const selecteduser_thunk =
  (): AppThunk => async (dispatch, getState) => {
    dispatch(clearSelectedUser);
    try {
      dispatch(startUserRequest);

      const state = getState();

      const users = usersSelector(state);

      if (!users) {
        dispatch(setUserError());
        return;
      }

      const dogwalker = selectPerson(users[0], users[1]);

      if (!dogwalker) return;

      dispatch(setSelectedUser(dogwalker));

      const trips = tripsSelector(state);

      if (!trips) return;

      //TODO these calculations are not coming out correctly after the first time or at least not updating on the UI correctly

      const newTrips = [...trips, dogwalker];

      const { person: monthlyPerson, frequency: monthlyFrequency } =
        calcFrequencies(newTrips as DatedTrip[]);

      const totalMonthlyStats = {
        person: monthlyPerson,
        total: monthlyFrequency,
      };

      dispatch(setMonthlyStats(totalMonthlyStats));

      const formatDataToWeekly = weeklyData(newTrips as DatedTrip[]);

      const { person: weeklyPerson, frequency: weeklyFrequency } =
        calcFrequencies(formatDataToWeekly);

      const totalWeeklyStats = {
        person: weeklyPerson,
        total: weeklyFrequency,
      };

      dispatch(setWeeklyStats(totalWeeklyStats));

      const { person, streakCount } = streak(newTrips as DatedTrip[]);

      const totalCurrentStreak = {
        person,
        total: streakCount,
      };
      dispatch(setCurrentStreak(totalCurrentStreak));

      await postPerson(dogwalker);

      dispatch(endUserRequest);
    } catch (error) {
      setUserError();
    }
  };
