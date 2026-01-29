import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ImageBackground,
  Image
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons"; // Using Feather for consistency
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { getAllFarms } from "../../services/farmApi";

export default function AllFarmsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { token } = useAuth();

  // --- Data Fetching ---
  const fetchFarms = async () => {
    try {
      const res = await getAllFarms(token);
      setFarms(res.farms || []);
    } catch (error) {
      console.log("Failed to load farms:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFarms();
  };

  // --- Filter Logic ---
  const filteredFarms = farms.filter((farm) =>
    farm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Render Farm Card ---
  const renderFarmCard = ({ item }) => {
    // Mocking status logic for visual appeal (you can replace with real data)
    const isHealthy = true; 

    return (
      <TouchableOpacity 
        className="mb-6 mr-0"
        activeOpacity={0.9}
        onPress={() => navigation.navigate("FarmDetails", { farmId: item.id })}
      >
        {/* Card Container */}
        <View className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100">
            
            {/* 1. Image Area (Satellite View Mock) */}
            <View className="h-40 relative bg-gray-200">
                <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef' }} // Placeholder satellite image
                    className="w-full h-full"
                    resizeMode="cover"
                />
                
                {/* Status Badge */}
                <View className="absolute top-3 left-3 bg-white px-3 py-1 rounded-lg shadow-sm">
                    <Text className={`text-[10px] font-bold ${isHealthy ? 'text-green-700' : 'text-red-600'}`}>
                        {isHealthy ? "Good Condition" : "Needs Attention"}
                    </Text>
                </View>

                {/* Size Badge */}
                <View className="absolute bottom-3 right-3 bg-black/60 px-2 py-1 rounded-md backdrop-blur-md">
                     <Text className="text-white text-[10px] font-bold">
                        {item.size || "0"} {item.unit || "Ha"}
                     </Text>
                </View>
            </View>

            {/* 2. Content Area */}
            <View className="p-4">
                <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-lg font-bold text-[#1A1C1B]">{item.name}</Text>
                    <Feather name="chevron-right" size={18} color="#9CA3AF" />
                </View>
                
                <View className="flex-row items-center">
                    <Feather name="map-pin" size={12} color="#9CA3AF" />
                    <Text className="text-xs text-gray-500 ml-1">{item.location || "Unknown Location"}</Text>
                </View>

                {/* Quick Stats Row */}
                <View className="flex-row mt-4 pt-3 border-t border-gray-50">
                    <View className="flex-row items-center mr-4">
                        <Feather name="layers" size={12} color="#2E7D32" />
                        <Text className="text-xs text-gray-600 ml-1 font-medium">
                            {item.analytics?.totalCrops || 0} Crops
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                         <Feather name="check-circle" size={12} color="#2E7D32" />
                         <Text className="text-xs text-gray-600 ml-1 font-medium">
                            {item.analytics?.totalHarvested || 0} Harvests
                         </Text>
                    </View>
                </View>
            </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FDFDFD]">
      
      {/* --- Header Section --- */}
      <View className="px-5 pt-2 pb-4">
        <Text className="text-2xl font-bold text-[#1A1C1B] mb-4">My Farms</Text>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-[#F3F5F4] px-4 py-3 rounded-2xl">
            <Feather name="search" size={20} color="#9CA3AF" />
            <TextInput
                className="flex-1 ml-3 text-base text-[#1A1C1B]"
                placeholder="Search your farms..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#9CA3AF"
            />
             {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                    <Feather name="x-circle" size={18} color="#9CA3AF" />
                </TouchableOpacity>
            )}
        </View>
      </View>

      {/* --- Content Area --- */}
      {loading ? (
        <ActivityIndicator size="large" color="#2E7D32" className="mt-10" />
      ) : farms.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <View className="bg-green-50 p-6 rounded-full mb-4">
             <Feather name="map" size={40} color="#2E7D32" />
          </View>
          <Text className="text-xl font-bold text-gray-800">No Farms Found</Text>
          <Text className="text-center text-gray-500 mt-2">
            Start by adding your first farm to track crops and soil health.
          </Text>
        </View>
      ) : filteredFarms.length === 0 ? (
        <View className="flex-1 items-center justify-center mt-10">
            <Text className="text-gray-500">No farms match "{searchQuery}"</Text>
        </View>
      ) : (
        <FlatList
          data={filteredFarms}
          renderItem={renderFarmCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2E7D32" />
          }
        />
      )}

      {/* --- Floating Action Button (Add Farm) --- */}
      <TouchableOpacity
        onPress={() => navigation.navigate("AddFarm")}
        className="absolute bottom-8 right-6 h-16 w-16 bg-[#2E7D32] rounded-full items-center justify-center shadow-lg z-50"
        activeOpacity={0.8}
      >
        <Feather name="plus" size={32} color="white" />
      </TouchableOpacity>

    </SafeAreaView>
  );
}