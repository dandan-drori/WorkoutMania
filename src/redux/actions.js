export const openDrawer = () => {
  return { type: 'OPEN_DRAWER' };
};

export const closeDrawer = () => {
  return { type: 'CLOSE_DRAWER' };
};

export const turnNightModeOn = () => {
  return { type: 'TURN_NIGHTMODE_ON' };
};

export const turnNightModeOff = () => {
  return { type: 'TURN_NIGHTMODE_OFF' };
};

export const setCurrentWeight = value => {
  return { type: 'SET_CURRENT_WEIGHT', payload: value };
};

export const setCurrentHeight = value => {
  return { type: 'SET_CURRENT_HEIGHT', payload: value };
};

export const setTargetWeight = value => {
  return { type: 'SET_TARGET_WEIGHT', payload: value };
};

export const setWorkouts = workouts => {
  return { type: 'SET_WORKOUTS', payload: workouts };
};

export const incrementReFetch = () => {
  return { type: 'INCREMENT_REFETCH' };
};

export const decrementTimer = () => {
  return { type: 'DECREMENT_TIMER' };
};

export const incrementCurrentExerciseIndex = () => {
  return { type: 'INCREMENT_CURRENT_EXERCISE_INDEX' };
};

export const resetCurrentExerciseIndex = () => {
  return { type: 'RESET_CURRENT_EXERCISE_INDEX' };
};

export const resetTimer = () => {
  return { type: 'RESET_TIMER' };
};

export const setActiveUser = email => {
  return { type: 'SET_ACTIVE_USER', payload: email };
};

export const setActiveUserToken = token => {
  return { type: 'SET_ACTIVE_USER_TOKEN', payload: token };
};

export const setIsAuthSuccessful = isAuthSuccessful => {
  return { type: 'SET_IS_AUTH_SUCCESSFUL', payload: isAuthSuccessful };
};

export const setLoginError = err => {
  return { type: 'SET_LOGIN_ERROR', payload: err };
};

export const setSignupError = err => {
  return { type: 'SET_SIGNUP_ERROR', payload: err };
};

export const signOut = () => {
  return { type: 'SIGN_OUT' };
};
