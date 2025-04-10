interface IUpdatedFields {
  id: number;
  comment: string;
  statusId: number;
  executorId: number;
}
export const updateData = async (updatedFields: IUpdatedFields) => {
  const url = `http://intravision-task.test01.intravision.ru/api/83f41211-5a40-48bb-b294-1f6656ea3a33/Tasks`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating resource:", error);
    throw error;
  }
};
