import { combineReducers } from 'redux';

const drawer = (state = { isDrawerOpen: false }, { type, payload }) => {
  switch (type) {
    case 'OPEN_DRAWER':
      return { ...state, isDrawerOpen: true };
    case 'CLOSE_DRAWER':
      return { ...state, isDrawerOpen: false };
    default:
      return state;
  }
};

const nightMode = (state = { isNightModeOn: false }, { type, payload }) => {
  switch (type) {
    case 'TURN_NIGHTMODE_ON':
      return { ...state, isNightModeOn: true };
    case 'TURN_NIGHTMODE_OFF':
      return { ...state, isNightModeOn: false };
    default:
      return state;
  }
};

const info = (
  state = {
    currentWeight: 0,
    currentHeight: 0,
    targetWeight: 0,
  },
  { type, payload },
) => {
  switch (type) {
    case 'SET_CURRENT_WEIGHT':
      return { ...state, currentWeight: payload };
    case 'SET_CURRENT_HEIGHT':
      return { ...state, currentHeight: payload };
    case 'SET_TARGET_WEIGHT':
      return { ...state, targetWeight: payload };
    default:
      return state;
  }
};

const reducer = combineReducers({ drawer, nightMode, info });
export default reducer;
