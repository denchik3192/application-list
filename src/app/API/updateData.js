export const updateData = async (id, updatedFields) => {
  const url = `http://intravision-task.test01.intravision.ru/api/83f41211-5a40-48bb-b294-1f6656ea3a33/Tasks`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Updated resource:", result);
    return result;
  } catch (error) {
    console.error("Error updating resource:", error);
    throw error;
  }
};
