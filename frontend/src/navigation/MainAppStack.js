import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainStack from "./MainStack";
import WeatherScreen from "../screens/Home/WeatherScreen";
import AllFarmsScreen from "../screens/AllFarms/AllFarmsScreen";

const Stack = createNativeStackNavigator();

export default function MainAppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Weather"
        component={WeatherScreen}
        options={{
          title: "Weather",
          headerBackTitleVisible: false,
          headerTintColor: "#2e7d32",
        }}
      />
      <Stack.Screen
      name="AllFarms"
      component={AllFarmsScreen}
      options={{
        title: "AllFarmsScreen",
        headerBackTitleVisible: false,
        headerTintColor: "#2e7d32",
        }}
    />
    </Stack.Navigator>
  );
}