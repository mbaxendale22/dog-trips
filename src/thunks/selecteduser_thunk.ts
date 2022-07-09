import { postPerson, selectPerson } from '../lib/api/api';
import {
  calcFrequencies,
  generateRandomNum,
  streak,
  weeklyData
} from '../lib/helpers';
import { AppThunk, DatedTrip } from '../lib/types';
import {
  clearSelectedUser,
  endUserRequest,
  setSelectedUser,
  setUserError,
  startUserRequest,
  usersSelector
} from '../redux/people';
import {
  setCurrentStreak,
  setMonthlyStats,
  setTrips,
  setWeeklyStats,
  tripsSelector
} from '../redux/stats';

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

      const TEMP_TRIP_ID = generateRandomNum(1, 500);
      const TEMP_TRIP_CA = new Date().toISOString();

      const newFormattedTrip = {
        id: TEMP_TRIP_ID,
        created_at: TEMP_TRIP_CA,
        user_profile: {
          id: dogwalker.id,
          created_at: dogwalker.created_at,
          name: dogwalker.name,
          household: dogwalker.household
        },
        household: dogwalker.household
      };

      const newTrips = [...trips, newFormattedTrip];

      if (!newTrips) return;

      dispatch(setTrips(newTrips));

      const { person: monthlyPerson, frequency: monthlyFrequency } =
        calcFrequencies(newTrips as DatedTrip[]);

      const totalMonthlyStats = {
        person: monthlyPerson,
        total: monthlyFrequency
      };

      dispatch(setMonthlyStats(totalMonthlyStats));

      const formatDataToWeekly = weeklyData(newTrips as DatedTrip[]);

      const { person: weeklyPerson, frequency: weeklyFrequency } =
        calcFrequencies(formatDataToWeekly);

      const totalWeeklyStats = {
        person: weeklyPerson,
        total: weeklyFrequency
      };

      dispatch(setWeeklyStats(totalWeeklyStats));

      const { person, streakCount } = streak(newTrips as DatedTrip[]);

      const totalCurrentStreak = {
        person,
        total: streakCount
      };
      dispatch(setCurrentStreak(totalCurrentStreak));

      await postPerson(dogwalker);

      dispatch(endUserRequest);
    } catch (error) {
      setUserError();
    }
  };
