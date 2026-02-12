import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { getCropsByFarmId } from "../../../services/farmApi";

export default function MonitoringTab({ userToken, farmId }) { // Pass farmId and token as props
  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data
  const loadCropData = async () => {
    if (!farmId) {
      setLoading(false);
      return; 
    }

    try {
      const response = await getCropsByFarmId(farmId, userToken);
      if (response.success) {
        setCycles(response.crops);
        
      } else {
        setError("Failed to load crops");
      }
    } catch (err) {
      console.error("Monitoring fetch error:", err);
      setError("Network error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch on mount or when farmId changes
  useEffect(() => {
    loadCropData();
  }, [farmId]);

  // Handle pull-to-refresh
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadCropData();
  }, []);

  // Helper functions for the UI logic
  const getProgress = (start, end) => {
    if (!end) return 50; // Default if no harvest date
    const total = new Date(end) - new Date(start);
    const elapsed = new Date() - new Date(start);
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  const getDaysElapsed = (start) => {
    const diff = new Date() - new Date(start);
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F5F7FA]">
        <ActivityIndicator size="large" color="#166534" />
        <Text className="text-gray-400 mt-2">Loading field data...</Text>
      </View>
    );
  }

  // Fallback if no farm is selected or available
  if (!farmId) {
     return (
        <View className="flex-1 justify-center items-center bg-[#F5F7FA] p-6">
           <Feather name="map" size={48} color="#9CA3AF" />
           <Text className="text-gray-500 mt-4 text-center">Please select a farm to view monitoring data.</Text>
        </View>
     )
  }

  return (
    <ScrollView 
      className="flex-1 bg-[#F5F7FA]" 
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      
      

      {/* 2. Quick Status Summary */}
      <View className="flex-row px-6 py-4 space-x-4">
        <View className="flex-1 bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex-row items-center">
            <View className="bg-green-100 p-2 rounded-lg mr-3">
                <Feather name="check-circle" size={18} color="#166534" />
            </View>
            <View>
                <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Active Crops</Text>
                <Text className="text-gray-900 font-bold text-lg">{cycles.length}</Text>
            </View>
        </View>
        <View className="flex-1 bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex-row items-center">
            <View className="bg-blue-100 p-2 rounded-lg mr-3">
                <Feather name="cloud-rain" size={18} color="#1e40af" />
            </View>
            <View>
                <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Rain Risk</Text>
                <Text className="text-gray-900 font-bold text-lg">None</Text>
            </View>
        </View>
      </View>

      {/* 3. Real Crop Cycles List */}
      <View className="px-6 pb-20">
        <Text className="text-gray-800 font-bold text-lg mb-4">Current Harvests</Text>
        
        {cycles.length > 0 ? (
          cycles.map((cycle) => (
            <CropCard 
              key={cycle.id} 
              cycle={cycle} 
              getProgress={getProgress} 
              getDaysElapsed={getDaysElapsed} 
            />
          ))
        ) : (
          <View className="items-center py-10">
            <Text className="text-gray-400">No active crops found for this farm.</Text>
            <TouchableOpacity className="mt-4 px-4 py-2 bg-green-600 rounded-lg">
               <Text className="text-white font-bold">Start a Season</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// --- Component: Real Data Crop Card ---
function CropCard({ cycle, getProgress, getDaysElapsed }) {
  // Safe extraction of data with fallbacks for the demo
  const progress = getProgress(cycle.plantingDate, cycle.harvestDate);
  const days = getDaysElapsed(cycle.plantingDate);
  const cropName = cycle.crop?.cropName || "Unknown Crop";
  const stage = cycle.stage || "Vegetative"; 
  const healthScore = 92; 
  const moisture = 28;
  const temp = 24;
  const isHealthy = healthScore > 80;

  return (
    <View className="bg-white rounded-2xl mb-5 shadow-sm border border-gray-100 overflow-hidden">
      <View className={`h-1 w-full ${isHealthy ? 'bg-green-500' : 'bg-amber-500'}`} />

      <View className="p-5">
        {/* Header */}
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-row items-center">
             <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-3 border border-gray-100">
                <Text className="text-lg">🌱</Text> 
             </View>
             <View>
                <Text className="text-gray-900 font-bold text-base">{cropName}</Text>
                <Text className="text-gray-400 text-xs">Planted: {new Date(cycle.plantingDate).toLocaleDateString()}</Text>
             </View>
          </View>
          <View className={`px-2 py-1 rounded-md ${isHealthy ? 'bg-green-50' : 'bg-amber-50'}`}>
            <Text className={`text-[10px] font-bold uppercase ${isHealthy ? 'text-green-700' : 'text-amber-700'}`}>
                {stage}
            </Text>
          </View>
        </View>

        {/* Timeline */}
        <View className="mb-6">
            <View className="flex-row justify-between mb-1">
                <Text className="text-gray-500 text-xs font-medium">Season Progress</Text>
                <Text className="text-gray-900 text-xs font-bold">Day {days}</Text>
            </View>
            <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <View 
                    style={{ width: `${progress}%` }} 
                    className={`h-full rounded-full ${isHealthy ? 'bg-green-500' : 'bg-amber-500'}`} 
                />
            </View>
        </View>

        {/* Real or Mocked Sensor Data */}
        <View className="flex-row border-t border-gray-100 pt-4">
            <View className="flex-1 items-center border-r border-gray-100">
                <Text className="text-gray-400 text-[10px] font-bold uppercase mb-1">Health</Text>
                <Text className={`text-lg font-black ${isHealthy ? 'text-green-600' : 'text-amber-600'}`}>
                    {healthScore}%
                </Text>
            </View>

            <View className="flex-1 items-center border-r border-gray-100">
                <Text className="text-gray-400 text-[10px] font-bold uppercase mb-1">Moisture</Text>
                <Text className="text-gray-800 text-lg font-black">{moisture}%</Text>
            </View>

            <View className="flex-1 items-center">
                <Text className="text-gray-400 text-[10px] font-bold uppercase mb-1">Temp</Text>
                <Text className="text-gray-800 text-lg font-black">{temp}°C</Text>
            </View>
        </View>
      </View>
    </View>
  );
}