import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function FarmCard({ farm }) {
    const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="mb-6 mr-0"
      activeOpacity={0.9}
      onPress={() => navigation.navigate("FarmDetails", { farmId: farm.id })}
    >
      <View className="w-full flex-row h-32 border border-gray-300 rounded-xl overflow-hidden shadow-sm">
        {/* farm image*/}
        <View className="px-3 h-full flex-row items-center justify-center bg-gray-100">
          <Image
            src={
              farm.imageUrl ||
              "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
            }
            alt={farm.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </View>

        {/* farm details */}
        <View className="flex-1 h-full ">
          {/* farm alert */}
          <View className="absolute top-2 right-4 bg-gray-200 px-2 py-1 rounded-lg shadow-sm">
            <Text className="text-xs text-green-700">
                {farm.alerts?? "No Alerts"}
            </Text>
          </View>

          <View className="p-4 flex flex-col justify-center h-full">
            <Text className="text-lg font-bold mb-2">{farm.name}</Text>
            {/* main crop type */}
            <Text className="text-sm text-gray-600 mb-1">
              Lifecycles: {farm.analytics.totalCrops || "0"}
            </Text>

            {/* location and size */}            
            <View className="flex-row ">
              <Feather name="map-pin" size={14} color="gray" />
              <Text className="ml-1 text-sm text-gray-600">{farm.location || "Unknown Location"}</Text>
              <Text className="text-sm text-gray-600 mb-1">
                {" "}{farm.size || "0"} {farm.unit || "Ha"}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* floating arrow head right */}
      <View className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
        <Feather name="chevron-right" size={18} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
}

export default FarmCard;
