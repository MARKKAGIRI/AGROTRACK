import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../services/authServices";
import { useAuth } from "../../context/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const THEME_GREEN = "#4A8B5C";

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const navigation = useNavigation();
 
  const [secureEntry, setSecureEntry] = useState(true);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (fieldName, value) => {
    const updatedFormData = { ...formData, [fieldName]: value };
    setFormData(updatedFormData);

    if (
      updatedFormData.email &&
      updatedFormData.password
    ) {
      setIsLoginButtonDisabled(false);
    } else {
      setIsLoginButtonDisabled(true);
    }
  };

  const validate = () => {
    if (!EMAIL_REGEX.test(formData.email.trim())) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return false;
    }
   
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      setLoading(true)
      const data = await loginUser(formData);
      login(data.user, data.token)
    } catch (error) {
       console.error("Login Failed", error);
      Alert.alert("Login Failed", "Invalid email or password. Please try again.");
    }finally{
      setLoading(false)
    }
  
  };

  const handleGoogle = () => {
    Alert.alert("Google sign-in", "Google auth not implemented in demo.");
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Forgot Password",
      "Password reset flow not implemented in demo."
    );
  };

  return (
    <SafeAreaView
      className="flex-1 bg-green-50"
      style={{ paddingTop: Constants.statusBarHeight }}
    >
      <StatusBar style="light" backgroundColor="#16a34a" />
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        className="px-1 relative"
      >
        {/* Header */}
        <View className="w-full h-52 bg-green-800 rounded-b-3xl justify-center items-center">
          <View className="flex-row items-center gap-2 mb-3">
            <View className="w-10 h-10 bg-white/20 rounded-full justify-center items-center">
              <Text className="text-2xl">🌱</Text>
            </View>
            <Text className="text-3xl font-bold text-white">AgroTrack+</Text>
          </View>
          <Text className="text-lg text-green-100">Welcome!</Text>
        </View>

        {/* Form */}
        <View className="-top-10 bg-white rounded-3xl p-8 shadow-lg w-[90vw]">
          <Text className="text-center text-xl font-semibold text-gray-700 mb-6">
            Sign In to Your Account
          </Text>

          {/* Email */}
          <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </Text>
            <View className="flex-row items-center bg-green-50 border border-green-200 rounded-xl px-4">
              <Ionicons name="mail-outline" size={20} color="#16a34a" />
              <TextInput
                className="flex-1 h-12 ml-3 text-base text-black"
                placeholder="your.email@example.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => {handleChange("email", text)}}
              />
            </View>
          </View>

          {/* Password */}
          <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Password
            </Text>
            <View className="flex-row items-center bg-green-50 border border-green-200 rounded-xl px-4 relative">
              <Feather name="lock" size={18} color="#777" />
              <TextInput
                className="flex-1 h-12 ml-3 text-base text-black"
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry={secureEntry}
                autoCapitalize="none"
                value={formData.password}
                onChangeText={(text) => {handleChange("password", text)}}
              />
              <TouchableOpacity
                onPress={() => setSecureEntry((s) => !s)}
                className="p-2"
              >
                <Feather
                  name={secureEntry ? "eye-off" : "eye"}
                  size={18}
                  color="#555"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={handleForgotPassword}
            className="items-end mb-3"
          >
            <Text className="text-[#4A8B5C] font-semibold">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Sign In */}
           <TouchableOpacity
            disabled={isLoginButtonDisabled}
            onPress={handleSubmit}
            activeOpacity={0.8}
            className={`${isLoginButtonDisabled ? "bg-gray-300" : "bg-green-600"} rounded-xl py-4 items-center shadow-md`}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-white text-base font-semibold">
                Login
              </Text>
            )}
          </TouchableOpacity>

          {/* OR Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="mx-4 text-gray-500 text-sm">OR</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          {/* Google */}
          <TouchableOpacity className="flex-row items-center justify-center bg-white border border-gray-300 rounded-xl py-4">
            <Image
              source={require("../../assets/images/google.png")}
              className="w-6 h-6 mr-3"
              resizeMode="contain"
            />
            <Text className="text-base font-medium text-gray-700">
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Sign Up page link*/}
          <View className="flex-row justify-center items-center mt-6">
            <Text className="text-sm text-gray-600">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text className="text-sm font-semibold text-green-600">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
