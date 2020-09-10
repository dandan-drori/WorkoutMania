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
) => {
  const reqOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password }),
  };
  const response = await fetch(url, reqOptions);
  const json = await response.json();
  if (json.message === 'Authentication process failed') {
    dispatch(setIsAuthSuccessful(true));
  }
  dispatch(setActiveUser(email));
  dispatch(setActiveUserToken(json.token));
};

export const addUser = (url, email, password, name) => {};
