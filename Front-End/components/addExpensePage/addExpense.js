import axios from "axios";

const BASE_URL = "http://10.0.2.2:5000/api/expense"; // 

export async function AddExpense(categoryValue, textInputValue, currencyValue) {
  const url = `${BASE_URL}/addExpense`;

  try {
    const response = await axios.post(url, {
      categoryValue,
      textInputValue,
      currencyValue,
    });

    return response.data;
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
}
