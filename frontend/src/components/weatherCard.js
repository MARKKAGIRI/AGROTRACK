// src/components/WeatherCard.js
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function WeatherCard({ temp, desc, humidity, wind }) {
  return (
    <View className="bg-white p-5 rounded-2xl shadow mb-5">
      <Text className="text-5xl font-bold">{temp}°C</Text>
      <Text className="text-xl capitalize my-2">{desc}</Text>

      <View className="flex-row items-center mt-2">
        <Ionicons name="water-outline" size={20} />
        <Text className="ml-2 text-base">Humidity: {humidity}%</Text>
      </View>

      <View className="flex-row items-center mt-1">
        <Ionicons name="leaf-outline" size={20} />
        <Text className="ml-2 text-base">Wind: {wind} m/s</Text>
      </View>
    </View>
  );
}
