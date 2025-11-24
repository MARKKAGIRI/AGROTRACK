import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import MainAppStack from "./MainAppStack";
import AuthStack from "./AuthStack";

const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <MainAppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
