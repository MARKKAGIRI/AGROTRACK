import { API_URL } from "@env";

export const loginUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const text = await res.text();
    
    let data;
    try {
      data = JSON.parse(text); // try parsing JSON
    } catch (e) {
      throw new Error(`Invalid JSON response: ${text}`);
    }

    if (!res.ok) {
      throw new Error(data?.error || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const text = await res.text();
    
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Invalid JSON response: ${text}`);
    }

    if (!res.ok) throw new Error(data?.error || "Registration failed");
    return data;
  } catch (error) {
    console.error("Registration of user failed:", error);
    throw error;
  }
};


export const sendGoogleTokenToBackend = async (googleIdToken) => {
  try {
    const res = await fetch(`${API_URL}/auth/google`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        token: googleIdToken
      })
    });

    if(!res.ok) {
      const errorMessage = await res.json();
      throw new Error(`Backend verification failed: ${errorMessage}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error sending token to backend:", error);
    throw error;
  }
}
