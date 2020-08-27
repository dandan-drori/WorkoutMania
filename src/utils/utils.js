export const getData = async (url, dispatch, setData, setIsLoading) => {
  const response = await fetch(url);
  const json = await response.json();
  dispatch(setData(json.workouts));
  setIsLoading(false);
};
