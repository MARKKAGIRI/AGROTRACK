import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainStack from "./MainStack";
import WeatherScreen from "../screens/Home/WeatherScreen";
import AllFarmsScreen from "../screens/AllFarms/AllFarmsScreen";
import EditCropScreen from "../screens/Lifecycle/EditCropScreen";
import AddCropScreen from "../screens/Lifecycle/AddCropScreen";
import CropTasks from "../screens/CropTasks/CropTasks";
import ChatScreen from "../screens/chat/chat";
import UpdateProfileScreen from "../screens/Profile/UpdateProfileScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import AddFarm from "../screens/Home/AddFarm";

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
        headerShown: false,
        }}
    />

    <Stack.Screen
        name="EditCrop"
        component={EditCropScreen}
        options={{
          title: "Edit Cropcycle",
          headerBackTitleVisible: false,
          headerTintColor: "#2e7d32",
        }}
      />

      <Stack.Screen
        name="AddCrop"
        component={AddCropScreen}
        options={{
          title: "Add Crops",
          headerBackTitleVisible: false,
          headerTintColor: "#2e7d32",
        }}
      />

      <Stack.Screen
        name="Tasks"
        component={CropTasks}
        options={{
          title: "Tasks",
          headerBackTitleVisible: false,
          headerTintColor: "#2e7d32",
        }}
      />

      <Stack.Screen
        name="Chatbot"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfileScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />

       <Stack.Screen
        name="AddFarm"
        component={AddFarm}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}

      
  