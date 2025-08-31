import { TouchableOpacity, Text } from "react-native";
import React from "react";

const AppButton = ({ title, onPress, variant = "primary" }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`px-6 py-3 rounded-xl items-center justify-center my-2
        ${variant === "primary" ? "bg-green-700" : "bg-gray-200"}
      `}
    >
      <Text
        className={`text-base font-semibold
          ${variant === "primary" ? "text-white" : "text-gray-800"}
        `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;
