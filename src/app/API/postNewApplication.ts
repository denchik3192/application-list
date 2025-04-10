export const postNewApplication = async (
  nameValue: string,
  descriptionValue: string
) => {
  const url =
    "http://intravision-task.test01.intravision.ru/api/83f41211-5a40-48bb-b294-1f6656ea3a33/Tasks";

  const body = {
    name: nameValue,
    description: descriptionValue,
    comment: "string",
    price: 0,
    taskTypeId: 0,
    statusId: 0,
    priorityId: 0,
    serviceId: 0,
    resolutionDatePlan: "2025-03-30T17:32:42.053Z",
    initiatorId: 0,
    executorId: 0,
    executorGroupId: 0,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status:${response.status}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
};
