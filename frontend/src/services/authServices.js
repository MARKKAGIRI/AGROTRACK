import { API_URL } from "@env";

export const loginUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.error || "Login failed");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Login failed", error);
  }
};

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.error || "Registration failed");
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Registration of user failed: ", error);
  }
};
