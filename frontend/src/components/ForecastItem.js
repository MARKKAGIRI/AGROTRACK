// src/components/ForecastItem.js
import { View, Text } from "react-native";

export default function ForecastItem({ day, icon, temp }) {
  return (
    <View className="bg-gray-100 p-4 rounded-xl items-center mr-3 w-20">
      <Text className="font-semibold mb-1">{day}</Text>
      <Text className="text-2xl mb-1">{icon}</Text>
      <Text className="text-lg">{temp}°C</Text>
    </View>
  );
}
