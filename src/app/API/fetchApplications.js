export const fetchApplications = async () => {
  try {
    const response = await fetch(
      "http://intravision-task.test01.intravision.ru/odata/tasks?tenantguid=83f41211-5a40-48bb-b294-1f6656ea3a33"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    console.error("Error fetching applications:", err);
    throw err;
  }
};
