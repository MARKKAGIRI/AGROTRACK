import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

// create a context
const AuthContext = createContext();

// create a hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Use auth must be used inside the auth provider");
  }

  return context;
};

// the provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        const storedUser = await SecureStore.getItemAsync("user");

        if (storedToken) {
          setToken(storedToken);
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserInfo();
  }, []);

  const login = async (userData, userToken) => {
    try {
      await SecureStore.setItemAsync("token", userToken);
      await SecureStore.setItemAsync("user", JSON.stringify(userData));
      setUser(userData);
      setToken(userToken);
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
