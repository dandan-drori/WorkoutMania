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
