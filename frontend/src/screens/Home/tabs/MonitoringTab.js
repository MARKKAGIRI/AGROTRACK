import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFarmCrops } from "../../../hooks/useFarmCrops";
import { useNavigation } from "@react-navigation/native";

export default function MonitoringTab({ userToken, farmId }) {
  const navigation = useNavigation();

  const {
    data: cycles = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useFarmCrops(farmId, userToken);

  const getProgress = (start, end) => {
    if (!end) return 50;
    const total = new Date(end) - new Date(start);
    const elapsed = new Date() - new Date(start);
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  const getDaysElapsed = (start) => {
    const diff = new Date() - new Date(start);
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  };

  if (!farmId) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F5F7FA] p-6">
        <Feather name="map" size={48} color="#9CA3AF" />
        <Text className="text-gray-500 mt-4 text-center">
          Please select a farm to view monitoring data.
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F5F7FA]">
        <ActivityIndicator size="large" color="#166534" />
        <Text className="text-gray-400 mt-2">Loading field data...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Failed to load crops</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      
    >
      <View className="pb-20">
        <Text className="text-gray-800 font-bold text-lg mb-4">
          Current Cropcycles
        </Text>

        {cycles.length > 0 ? (
          cycles.map((cycle) => (
            <CropCard
              key={cycle.id}
              cycle={cycle}
              getProgress={getProgress}
              getDaysElapsed={getDaysElapsed}
              farmId={farmId}
              cropCycleId={cycle.id}
            />
          ))
        ) : (
          <View className="items-center py-10">
            <Text className="text-gray-400">
              No active crops found for this farm.
            </Text>
            <TouchableOpacity
              className="mt-4 px-4 py-2 bg-green-600 rounded-lg"
              onPress={() => navigation.navigate("AddCrop", { farmId: farmId })}
            >
              <Text className="text-white font-bold">Start a Season</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function CropCard({ cycle, getProgress, getDaysElapsed, farmId, cropCycleId }) {
  const progress = getProgress(cycle.plantingDate, cycle.harvestDate);
  const days = getDaysElapsed(cycle.plantingDate);
  const cropName = cycle.crop?.cropName || "Unknown Crop";

  const healthScore = 92;
  const moisture = 28;
  const temp = 24;
  const isHealthy = healthScore > 80;
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {navigation.navigate("CropCycle", {farmId: farmId, cropCycleId: cropCycleId})}}>
      <View className="bg-white rounded-2xl mb-5 shadow-sm border border-gray-300 overflow-hidden">
        <View className="p-5">
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-3 border border-gray-100">
                <Text className="text-lg">🌱</Text>
              </View>

              <View>
                <Text className="text-gray-900 font-bold text-base">
                  {cropName}
                </Text>

                <Text className="text-gray-400 text-xs">
                  Planted: {new Date(cycle.plantingDate).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>

          <View className="mb-6">
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-500 text-xs font-medium">
                Season Progress
              </Text>
              <Text className="text-gray-900 text-xs font-bold">
                Day {days}
              </Text>
            </View>

            <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <View
                style={{ width: `${progress}%` }}
                className="h-full rounded-full bg-green-500"
              />
            </View>
          </View>

          <View className="flex-row border-t border-gray-100 pt-4">
            <Metric label="Health" value={`${healthScore}%`} good={isHealthy} />
            <Metric label="Moisture" value={`${moisture}%`} />
            <Metric label="Temp" value={`${temp}°C`} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Metric({ label, value, good }) {
  return (
    <View className="flex-1 items-center border-r border-gray-100 last:border-r-0">
      <Text className="text-gray-400 text-[10px] font-bold uppercase mb-1">
        {label}
      </Text>

      <Text
        className={`text-lg font-black ${
          good ? "text-green-600" : "text-gray-800"
        }`}
      >
        {value}
      </Text>
    </View>
  );
}
