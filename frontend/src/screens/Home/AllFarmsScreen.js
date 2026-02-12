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
  Image,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons"; // Using Feather for consistency
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { getAllFarms } from "../../services/farmApi";
import FarmCard from "../../components/FarmCard";
import SectionHeader from "../../components/SectionHeader";

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
    farm.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const HeaderComponent = () => (
    <View className="pt-2 pb-4">      
      {/* Season Overview */}
       <View className="mt-4 bg-white rounded-3xl p-5 shadow-sm border border-gray-300 mb-6">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-900 font-black text-base">
            Season Overview
          </Text>
          <View className="bg-emerald-100 px-2 py-1 rounded-lg">
            <Text className="text-emerald-700 text-[10px] font-bold uppercase">
              2026 Season
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap">
          {/* Total Farms */}
          <View className="w-1/2 pr-2 mb-4">
            <View className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
              <Text className="text-gray-400 text-[10px] uppercase font-bold mb-1">
                Total Farms
              </Text>
              <Text className="text-xl font-black text-gray-900">
                {farms.length}
              </Text>
            </View>
          </View>

          {/* Total Crops */}
          <View className="w-1/2 pl-2 mb-4">
            <View className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
              <Text className="text-gray-400 text-[10px] uppercase font-bold mb-1">
                Active Crops
              </Text>
              <Text className="text-xl font-black text-gray-900">
                {farms.reduce(
                  (sum, farm) => sum + (farm.analytics.totalCrops || 0),
                  0,
                )}
              </Text>
            </View>
          </View>

          {/* Harvested */}
          <View className="w-1/2 pr-2">
            <View className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
              <Text className="text-emerald-600 text-[10px] uppercase font-bold mb-1">
                Harvested
              </Text>
              <Text className="text-xl font-black text-emerald-700">
                {farms.reduce(
                  (sum, farm) => sum + (farm.analytics.totalHarvested || 0),
                  0,
                )}
              </Text>
            </View>
          </View>

          {/* Upcoming */}
          <View className="w-1/2 pl-2">
            <View className="bg-blue-50 p-3 rounded-2xl border border-blue-100">
              <Text className="text-blue-600 text-[10px] uppercase font-bold mb-1">
                Upcoming
              </Text>
              <Text className="text-xl font-black text-blue-700">
                {farms.reduce(
                  (sum, farm) => sum + (farm.analytics.upcomingLifecycle || 0),
                  0,
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FDFDFD]">
      
      <Text className="mx-5 text-2xl font-bold text-[#1A1C1B] mb-4">My Farms</Text>

      {/* Search Bar */}
      <View className="mx-5 flex-row items-center bg-[#F3F5F4] px-4 py-1 rounded-2xl">
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

      {/* Farms Section */}
      {loading ? (
        <ActivityIndicator size="large" color="#2E7D32" className="mt-10" />
      ) : farms.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <View className="bg-green-50 p-6 rounded-full mb-4">
            <Feather name="map" size={40} color="#2E7D32" />
          </View>
          <Text className="text-xl font-bold text-gray-800">
            No Farms Found
          </Text>
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
          renderItem={({ item }) => <FarmCard farm={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListHeaderComponent={
            <>
              <HeaderComponent />
              <SectionHeader title="All Farms" action="Sort By" />
            </>
          }
        />
      )}

      {/* Add Farm) */}
      <TouchableOpacity
        onPress={() => navigation.navigate("AddFarm")}
        className="flex-row absolute bottom-8 right-6 px-4 py-2 bg-[#2E7D32] rounded-full items-center justify-center shadow-lg z-50"
        activeOpacity={0.8}
      >
        <Text className="text-white text-lg font-bold ">New Farm</Text>
        <Feather name="plus" size={22} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
