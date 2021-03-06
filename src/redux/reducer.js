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
    currentWeight: '0',
    currentHeight: '0',
    targetWeight: '0',
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

const workouts = (state = [], { type, payload }) => {
  switch (type) {
    case 'SET_WORKOUTS':
      return payload;
    default:
      return state;
  }
};

const reFetch = (state = { reFetch: 0 }, { type, payload }) => {
  switch (type) {
    case 'INCREMENT_REFETCH':
      return { ...state, reFetch: state.reFetch + 1 };
    default:
      return state;
  }
};

const workoutMode = (
  state = { timer: 5400, currentExerciseIndex: 0 },
  { type, payload },
) => {
  switch (type) {
    case 'DECREMENT_TIMER':
      return { ...state, timer: state.timer - 1 };
    case 'RESET_TIMER':
      return { ...state, timer: 5400 };
    case 'INCREMENT_CURRENT_EXERCISE_INDEX':
      return { ...state, currentExerciseIndex: state.currentExerciseIndex + 1 };
    case 'RESET_CURRENT_EXERCISE_INDEX':
      return { ...state, currentExerciseIndex: 0 };
    default:
      return state;
  }
};

const auth = (
  state = {
    activeUser: '',
    activeUserToken: '',
    activeUserData: {
      name: 'Guest User',
      email: 'guest@guestmail.com',
      preferences: [{ name: 'Prefer Night Mode', state: false }],
    },
    isAuthSuccessful: false,
    loginError: '',
    signupError: '',
  },
  { type, payload },
) => {
  switch (type) {
    case 'SET_ACTIVE_USER':
      return { ...state, activeUser: payload };
    case 'SET_ACTIVE_USER_TOKEN':
      return { ...state, activeUserToken: payload };
    case 'SET_ACTIVE_USER_DATA':
      return { ...state, activeUserData: payload };
    case 'SET_IS_AUTH_SUCCESSFUL':
      return { ...state, isAuthSuccessful: payload };
    case 'SET_LOGIN_ERROR':
      return { ...state, loginError: payload };
    case 'SET_SIGNUP_ERROR':
      return { ...state, signupError: payload };
    case 'SIGN_OUT':
      return { ...state, activeUser: '', activeUserToken: '' };
    default:
      return state;
  }
};

const chat = (state = {users: [], activeChats: []}, { type, payload }) => {
  switch (type) {
    case 'SET_USERS':
      return {...state, users: payload};
    case 'SET_CHAT':
      return state;
    case 'ADD_CHAT':
      return {...state, activeChat: [...state.activeChats, payload]};
    default:
      return state;
  }
};

const modals = (state = { isChooseUserModalOpen: false }, { type, payload }) => {
  switch (type) {
    case 'SET_IS_CHOOSE_USER_MODAL_OPEN':
      return { ...state, isChooseUserModalOpen: payload };
    default:
      return state;
  }
}

const reducer = combineReducers({
  drawer,
  nightMode,
  info,
  workouts,
  reFetch,
  workoutMode,
  auth,
  chat,
  modals,
});
export default reducer;
