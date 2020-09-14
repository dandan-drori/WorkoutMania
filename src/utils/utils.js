export const getData = async (url, dispatch, setData, setIsLoading) => {
  const response = await fetch(url);
  const json = await response.json();
  dispatch(setData(json.workouts));
  setIsLoading(false);
};

export const postData = (url, data) => {
  const reqOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data,
    }),
  };
  fetch(url, reqOptions);
};

export const deleteData = (url, data) => {
  const reqOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data,
    }),
  };
  fetch(url, reqOptions);
};

export const addExercise = (url, exercises, newExercise) => {
  const reqOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([
      {
        propName: 'exercises',
        value: [...exercises, newExercise],
      },
    ]),
  };
  fetch(url, reqOptions);
};

export const deleteExercise = (url, exercises, exerciseName) => {
  const filteredExercises = exercises.filter(
    fexercise => fexercise.name !== exerciseName,
  );

  const reqOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([
      {
        propName: 'exercises',
        value: filteredExercises,
      },
    ]),
  };
  fetch(url, reqOptions);
};

export const getExercises = async (url, setData, setIsLoading) => {
  const response = await fetch(url);
  const json = await response.json();
  setData(json.workout[0].exercises);
  setIsLoading(false);
};

export const updateDropset = async (url, exercises, exerciseName) => {
  const newExercises = exercises.map(exercise =>
    exercise.name === exerciseName
      ? { ...exercise, isDropset: !exercise.isDropset }
      : exercise,
  );

  const reqOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([
      {
        propName: 'exercises',
        value: newExercises,
      },
    ]),
  };
  fetch(url, reqOptions);
};

export const updateSuperset = async (url, exercises, exerciseName) => {
  const newExercises = exercises.map(exercise =>
    exercise.name === exerciseName
      ? { ...exercise, isSuperset: !exercise.isSuperset }
      : exercise,
  );

  const reqOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([
      {
        propName: 'exercises',
        value: newExercises,
      },
    ]),
  };
  fetch(url, reqOptions);
};

export const authenticateUser = async (
  url,
  email,
  password,
  dispatch,
  setActiveUser,
  setIsAuthSuccessful,
  setActiveUserToken,
  setError,
  AsyncStorage,
  navigation,
  setIsLoading,
) => {
  const reqOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password }),
  };
  const response = await fetch(url, reqOptions);
  const json = await response.json();
  if (json.message === 'Authentication process failed') {
    dispatch(setIsAuthSuccessful(false));
    dispatch(setError(json.message));
  } else {
    dispatch(setIsAuthSuccessful(true));
    dispatch(setError(''));
    dispatch(setActiveUser(email));
    dispatch(setActiveUserToken(json.token));
    AsyncStorage.setItem('token', json.token);
    AsyncStorage.setItem('email', email);
    navigation.navigate('HomeStack');
  }
  setIsLoading(false);
};

export const addUser = async (
  url,
  name,
  email,
  password,
  dispatch,
  setError,
  navigation,
  setIsLoading,
) => {
  const reqOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password, name: name }),
  };
  const response = await fetch(url, reqOptions);
  const json = await response.json();
  if (json.message !== 'Created user successfully') {
    dispatch(setError(json.message));
  } else {
    dispatch(setError(''));
    navigation.navigate('Login');
  }
  setIsLoading(false);
};

export const isValidEmail = email => {
  if (
    email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ) === null
  ) {
    return false;
  } else {
    return true;
  }
};

export const isValidPassword = password => {
  if (
    password.match(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}[!|@|#|$|%|^|&|*]{1,}/,
    ) === null
  ) {
    return false;
  } else {
    return true;
  }
};

export const getActiveUserData = async (url, dispatch, setActiveUserData) => {
  const response = await fetch(url);
  const json = await response.json();
  dispatch(setActiveUserData(json.user[0]));
};

export const togglePreferenceState = (
  url,
  oldPreferences,
  preferenceName,
  newState,
) => {
  const newPreferences = oldPreferences.map(oldPreference => {
    if (oldPreference.name === preferenceName) {
      oldPreference.state = newState;
    } else {
      return oldPreference;
    }
  });
  console.log(newPreferences);
  const reqOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([
      {
        propName: 'preferences',
        value: newPreferences,
      },
    ]),
  };
  fetch(url, reqOptions);
};
