export const getApplication = async (id: number) => {
  const response = await fetch(
    `http://intravision-task.test01.intravision.ru/api/83f41211-5a40-48bb-b294-1f6656ea3a33/Tasks/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const json = await response.json();
  return json;
};
