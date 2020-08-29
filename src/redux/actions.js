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
