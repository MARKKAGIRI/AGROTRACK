import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { OnboardingContext } from "../context/OnboardingContext";

import MainAppStack from "./MainAppStack";
import AuthStack from "./AuthStack";
import OnboardingStack from "./OnboardingStack";

const RootNavigator = () => {
  const { user, loading } = useAuth();
  const [hasOnboarded, setHasOnboarded] = useState(null);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem("hasOnboarded");
        setHasOnboarded(value === "true");
      } catch (error) {
        console.log("Error checking onboarding:", error);
      } finally {
        setCheckingOnboarding(false);
      }
    };

    checkOnboarding();
  }, []);

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("hasOnboarded", "true");
      setHasOnboarded(true);
    } catch (error) {
      console.log("Error saving onboarding status:", error);
    }
  };

  if (loading || checkingOnboarding) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  return (
    <OnboardingContext.Provider value={{ completeOnboarding }}>
      <NavigationContainer>
        {!hasOnboarded ? (
          <OnboardingStack />
        ) : user ? (
          <MainAppStack />
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </OnboardingContext.Provider>
  );
};

export default RootNavigator;