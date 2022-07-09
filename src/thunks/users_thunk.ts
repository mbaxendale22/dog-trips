import { getUsersByHousehold } from '../lib/api/api';
import { AppThunk } from '../lib/types';
import {
  endUserRequest,
  setUser,
  setUserError,
  startUserRequest
} from '../redux/people';

export const users_thunk = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startUserRequest);

    const data = await getUsersByHousehold(1);

    dispatch(setUser(data));

    dispatch(endUserRequest);
  } catch (error) {
    dispatch(setUserError());

    console.log(error);
  }
};
