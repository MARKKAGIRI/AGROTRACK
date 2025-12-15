import { TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Major screens

import HomeScreen from "../screens/Home/HomeScreen";
import Analytics from "../screens/Analytics/Analytics";
import AllFarmsScreen from "../screens/Home/AllFarmsScreen"
import Profile from "../screens/Profile/Profile";


const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#2e7d32",
          tabBarInactiveTintColor: "#888",
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case "Home":
                iconName = "home-outline";
                break;
              case "Farms":
                iconName = "tractor";
                break;
              case "Profile":
                iconName = "account";
                break;
              default:
                iconName = "ellipse-outline";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >

        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} activeOpacity={0.8} />
            ),
          }}
        />
        
        <Tab.Screen
          name="Farms"
          component={AllFarmsScreen}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} activeOpacity={0.8} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity {...props} activeOpacity={0.8} />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default MainStack;
