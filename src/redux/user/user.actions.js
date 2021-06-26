import { auth } from '../../firebase/firebase';
import UserActionTypes from './user.types';

export const signSuccess = (user, history) => {
  if (history) {
    history.push('/');
  }
  return {
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user,
  };
};

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});
export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const signUp = ({ email, password, repassword }) => async (dispatch) => {
  try {
    if (password !== repassword) {
      throw new Error('Password Does not match');
    }
    const user = await auth.createUserWithEmailAndPassword(email, password);

    dispatch(signSuccess(user));
  } catch (error) {
    console.log(error);
    clearErrors(dispatch);
    dispatch(signUpFailure(error.message));
  }
};

export const signIn = ({ email, password }) => async (dispatch) => {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password);

    dispatch(signSuccess(user));
  } catch (error) {
    console.log(error);
    clearErrors(dispatch);

    dispatch(signInFailure(error.message));
  }
};
export const signOut = () => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch(signOutSuccess());
  } catch (error) {
    console.log(error);
    clearErrors(dispatch);
    dispatch(signOutFailure(error.message));
  }
};

const clearErrors = (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: UserActionTypes.CLEAR_ERRORS,
    });
  }, 5000);
};
