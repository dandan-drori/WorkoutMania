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

const reducer = combineReducers({ drawer, nightMode });
export default reducer;
