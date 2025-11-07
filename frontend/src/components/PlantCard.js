import { View, Text, Pressable } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const statusColors = {
  completed: "text-green-600",
  "in-progress": "text-red-500",
  upcoming: "text-gray-400",
};

const PlantCard = ({ plant }) => {
  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow">
      {/* Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View>
          <View className="flex-row items-center">
            <Ionicons name="leaf-outline" size={20} color="#16a34a" />
            <Text className="ml-2 text-lg font-bold">{plant.name}</Text>
          </View>
          {/* Status badge  */}
          <View className="mt-1 bg-green-100 px-3 py-1 rounded-full self-start">
            <Text className="text-green-700 text-sm font-semibold">
              {plant.status}
            </Text>
          </View>
        </View>

        {/* Plus button */}
        <Pressable className="bg-gray-300 p-3 rounded-xl" onPress={
          () => { /* Handle add action */ 
            navigation?.navigate("CropTasks", { plantId: plant.id });
          }
        }>
          <Ionicons name="add" size={20} color="#4b5563" />
        </Pressable>
      </View>

      {/* Stages */}
      {plant.stages.map((stage, index) => (
        <View key={index} className="flex-row mb-3">
          {/* Timeline + Icon */}
          <View className="items-center w-6">
            <Ionicons
              name={
                stage.status === "completed"
                  ? "checkmark-circle-outline"
                  : stage.status === "in-progress"
                    ? "time-outline"
                    : "alert-circle-outline"
              }
              size={20}
              color={
                stage.status === "completed"
                  ? "#16a34a"
                  : stage.status === "in-progress"
                    ? "#dc2626"
                    : "#9ca3af"
              }
            />
            {/* Vertical line */}

            <View
              className={`w-px flex-1 mt-1 ${
                stage.status === "completed"
                  ? "bg-green-600"
                  : stage.status === "in-progress"
                    ? "bg-red-500"
                    : "bg-gray-300"
              }`}
            />
          </View>

          {/* Stage info */}
          <View className="ml-2 flex-1">
            <Text
              className={`font-semibold ${
                stage.status === "completed"
                  ? "text-green-600"
                  : stage.status === "in-progress"
                    ? "text-red-500"
                    : "text-gray-400"
              }`}
            >
              {stage.title}
            </Text>
            <Text className="text-gray-600 text-sm">{stage.date}</Text>
            <Text className="text-gray-500 text-sm">{stage.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default PlantCard;
