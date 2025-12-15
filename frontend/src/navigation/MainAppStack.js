import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainStack from "./MainStack";
import WeatherScreen from "../screens/Home/WeatherScreen";
import AllFarmsScreen from "../screens/Home/AllFarmsScreen";
import EditCropScreen from "../screens/Lifecycle/EditCropScreen";
import AddCropScreen from "../screens/Lifecycle/AddCropScreen";
import CropTasks from "../screens/Home/Tasks";
import ChatScreen from "../screens/Home/chat";
import UpdateProfileScreen from "../screens/Profile/UpdateProfileScreen";
import SettingsScreen from "../screens/Profile/SettingsScreen";
import AddFarm from "../screens/Home/AddFarm";
import FarmDetailsScreen from "../screens/Home/FarmDetailsScreen";
import PrivacyScreen from "../screens/Profile/Privacy";
import HelpSupport from "../screens/Profile/HelpSupport";
import About from "../screens/Profile/About";
import CropCycleScreen from "../screens/Lifecycle/CropCycle";
import AnalyticsScreen from "../screens/Analytics/Analytics";

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
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          title: "Analytics",
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#2e7d32", // optional
          },
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
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#2e7d32", // optional
          },
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
          title: "Edit Profile",
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerStyle: {
          backgroundColor: "#2e7d32", // optional
          },
        }}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#2e7d32", // optional
          },
        }}
      />

      <Stack.Screen
        name="AddFarm"
        component={AddFarm}
        options={{
          title: "New Farm",
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#2e7d32", // optional
          },
        }}
      />

      <Stack.Screen
        name="FarmDetails"
        component={FarmDetailsScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#2e7d32", // optional
          },
        }}
      />

      <Stack.Screen
        name="CropCycle"
        component={CropCycleScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          title: "Privacy & Security",
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#2e7d32", // optional
          },
        }}
      />
      <Stack.Screen
        name="Help"
        component={HelpSupport}
        options={{
          title: "Help & Support",
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#2e7d32", // optional
          },
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: "About",
          headerBackTitleVisible: false,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#2e7d32", // optional
          },
        }}
      />
    </Stack.Navigator>
  );
}
