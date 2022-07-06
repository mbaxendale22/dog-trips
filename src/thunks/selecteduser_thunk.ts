import { postPerson, selectPerson } from "../lib/api/api";
import { AppThunk } from "../lib/types";
import {
  clearSelectedUser,
  endUserRequest,
  setSelectedUser,
  setUserError,
  startUserRequest,
  usersSelector,
} from "../redux/people";
import { tripsSelector } from "../redux/stats";

export const selecteduser_thunk =
  (): AppThunk => async (dispatch, getState) => {
    dispatch(clearSelectedUser);
    try {
      dispatch(startUserRequest);

      const state = getState();

      const users = usersSelector(state);

      const dogwalker = selectPerson(users[0], users[1]);

      dispatch(setSelectedUser(dogwalker));

      const trips = tripsSelector(state);

      //TODO spread the new data into trips and update the state, running the calcs too and update the stats ui

      dispatch(endUserRequest);

      const response = await postPerson(dogwalker);
    } catch (error) {
      setUserError();
    }
  };
