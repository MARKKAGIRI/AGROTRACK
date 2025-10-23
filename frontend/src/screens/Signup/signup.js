import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { registerUser } from "../../services/authServices";
import { useAuth } from "../../context/AuthContext";
import { ActivityIndicator } from "react-native-paper";

export default function Register() {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (fieldName, value) => {
    const updatedFormData = { ...formData, [fieldName]: value };
    setFormData(updatedFormData);

    if (
      updatedFormData.name &&
      updatedFormData.email &&
      updatedFormData.password &&
      updatedFormData.confirmPassword &&
      acceptedTerms
    ) {
      setIsLoginButtonDisabled(false);
    } else {
      setIsLoginButtonDisabled(true);
    }
  };

  const toggleAcceptedTerms = () => {
    const newValue = !acceptedTerms;
    setAcceptedTerms(newValue);

    if (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      newValue
    ) {
      setIsLoginButtonDisabled(false);
    } else {
      setIsLoginButtonDisabled(true);
    }
  };

  const validateForm = (formData) => {
    const { name, email, password, confirmPassword } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password || !confirmPassword)
      return { valid: false, message: "All fields are mandatory" };

    if (!emailRegex.test(email))
      return { valid: false, message: "Please enter a valid email address" };

    if (password !== confirmPassword)
      return { valid: false, message: "Passwords do not match" };

    if (password.length < 8)
      return {
        valid: false,
        message: "Password must be at least 8 characters",
      };

    return { valid: true };
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      const isDataValid = validateForm(formData);
      if (isDataValid.valid !== true) {
        console.warn(isDataValid); // show validation message
        return;
      }

      const data = await registerUser(formData);
      login(data.user, data.token);
    } catch (error) {
      console.error("Register error", error);
    } finally {
      setLoading(false);
    }
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
        <View className="-top-10 bg-white rounded-3xl p-8 shadow-md">
          <Text className="text-center text-xl font-semibold text-gray-700 mb-6">
            Create Your Account
          </Text>

          {/* Full Name */}
          <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Full Name
            </Text>
            <View className="flex-row items-center bg-green-50 border border-green-200 rounded-xl px-4">
              <Ionicons
                name="person-outline"
                size={20}
                color="#16a34a"
                className="mr-2"
              />
              <TextInput
                className="flex-1 h-12 text-base text-black"
                placeholder="John Doe"
                value={formData.name}
                onChangeText={(text) => {
                  handleChange("name", text);
                }}
              />
            </View>
          </View>

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
                value={formData.email}
                onChangeText={(text) => {
                  handleChange("email", text);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Phone */}
          {/* <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</Text>
            <View className="flex-row items-center bg-green-50 border border-green-200 rounded-xl px-4">
              <Ionicons name="call-outline" size={20} color="#16a34a" />
              <TextInput
                className="flex-1 h-12 ml-3 text-base text-black"
                placeholder="+1 (555) 000-0000"

                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View> */}

          {/* Password */}
          <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Password
            </Text>
            <View className="flex-row items-center bg-green-50 border border-green-200 rounded-xl px-4 relative">
              <Ionicons name="lock-closed-outline" size={20} color="#16a34a" />
              <TextInput
                className="flex-1 h-12 ml-3 text-base text-black"
                placeholder="Create a strong password"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(text) => {
                  handleChange("password", text);
                }}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-4 p-1"
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </Text>
            <View className="flex-row items-center bg-green-50 border border-green-200 rounded-xl px-4">
              <Ionicons name="lock-closed-outline" size={20} color="#16a34a" />
              <TextInput
                className="flex-1 h-12 ml-3 text-base text-black"
                placeholder="Re-enter your password"
                secureTextEntry={!showConfirmPassword}
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 p-1"
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              onPress={toggleAcceptedTerms}
              className={`w-5 h-5 border border-green-600 mr-2 rounded items-center justify-center ${
                acceptedTerms ? "bg-green-600" : "bg-white"
              }`}
            >
              {acceptedTerms && (
                <Ionicons name="checkmark" size={14} color="white" />
              )}
            </TouchableOpacity>

            {/* Text */}
            <Text className="text-sm text-gray-700 flex-shrink">
              I agree to the{" "}
              <Text className="text-green-600 font-semibold">
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text className="text-green-600 font-semibold">
                Privacy Policy
              </Text>
            </Text>
          </View>

          {/* Create Account Button */}
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
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="mx-4 text-gray-500 text-sm">OR</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          {/* Google Button */}
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

          {/* Sign In Link */}
          <View className="flex-row justify-center items-center mt-6">
            <Text className="text-sm text-gray-600">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity>
              <Text className="text-sm font-semibold text-green-600">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
