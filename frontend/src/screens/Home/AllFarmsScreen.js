import React, { useState, useEffect } from "react";
import { getAllFarms } from "../../services/farmApi";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function AllFarmsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { user, token } = useAuth();

  // Fetch farms on load
  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await getAllFarms(token);
        setFarms(res.farms || []);
      } catch (error) {
        console.log("Failed to load farms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  // fetch farms again on refresh
  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const res = await getAllFarms(token);
      setFarms(res.farms || []);
    } catch (error) {
      console.log("Failed to load farms:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Filter based on search
  const filteredFarms = farms.filter((farm) =>
    farm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Farm card UI
  const renderFarmCard = ({ item }) => {
    const analytics = item.analytics || {
      totalCrops: 0,
      totalHarvested: 0,
      upcomingHarvest: 0,
    };

    return (
      <TouchableOpacity className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
        {/* Header */}
        <View className="flex-row items-start mb-4">
          <View className="w-12 h-12 rounded-xl bg-green-50 items-center justify-center mr-3">
            <Ionicons name="leaf" size={24} color="#16a34a" />
          </View>

          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-800 mb-1">
              {item.name}
            </Text>

            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={14} color="#6b7280" />
              <Text className="text-sm text-gray-500 ml-1">
                {item.location}
              </Text>
            </View>
          </View>
        </View>

        {/* Analytics */}
        <View className="flex-row bg-gray-50 rounded-xl p-3 mb-3">
          <View className="flex-1 items-center">
            <Ionicons name="grid-outline" size={18} color="#16a34a" />
            <Text className="text-xs text-gray-500 mt-1 mb-0.5">Size</Text>
            <Text className="text-base font-semibold text-gray-800">
              {item.size || "N/A"} {item.unit || ""}
            </Text>
          </View>

          <View className="flex-1 items-center">
            <Ionicons name="leaf-outline" size={18} color="#16a34a" />
            <Text className="text-xs text-gray-500 mt-1 mb-0.5">Crops</Text>
            <Text className="text-base font-semibold text-gray-800">
              {analytics.totalCrops}
            </Text>
          </View>

          <View className="flex-1 items-center">
            <Ionicons name="checkmark-done-outline" size={18} color="#16a34a" />
            <Text className="text-xs text-gray-500 mt-1 mb-0.5">Harvested</Text>
            <Text className="text-base font-semibold text-gray-800">
              {analytics.totalHarvested}
            </Text>
          </View>

          <View className="flex-1 items-center">
            <Ionicons name="time-outline" size={18} color="#16a34a" />
            <Text className="text-xs text-gray-500 mt-1 mb-0.5">Upcoming</Text>
            <Text className="text-base font-semibold text-gray-800">
              {analytics.upcomingHarvest}
            </Text>
          </View>
        </View>

        {/* View details button */}
        <TouchableOpacity
          className="flex-row items-center justify-center py-2.5"
          onPress={() =>
            navigation.navigate("FarmDetails", { farmId: item.id })
          }
        >
          <Text className="text-sm font-semibold text-green-600 mr-1">
            View Details
          </Text>
          <Ionicons name="chevron-forward" size={16} color="#16a34a" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      {/* Search Bar */}
      <View className="flex-row items-center bg-white mx-5 my-4 px-4 rounded-xl border border-gray-200">
        <Ionicons name="search-outline" size={20} color="#6b7280" />
        <TextInput
          className="flex-1 h-12 text-base ml-2"
          placeholder="Search farms..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9ca3af"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>

      {/* Loading / Empty states / Farm list */}
      {loading ? (
        <ActivityIndicator size="large" color="#16a34a" className="mt-10" />
      ) : farms.length === 0 ? (
        <View className="flex-1 items-center justify-center mt-10 px-6">
          <Ionicons name="leaf-outline" size={70} color="#16a34a" />
          <Text className="text-2xl font-bold text-gray-800 mt-4">
            No Farms Yet
          </Text>
          <Text className="text-center text-gray-500 mt-2">
            You haven’t added any farms. Tap the “+” button to get started!
          </Text>
        </View>
      ) : filteredFarms.length === 0 ? (
        <View className="flex-1 items-center justify-center mt-10 px-6">
          <Ionicons name="search-outline" size={60} color="#6b7280" />
          <Text className="text-xl font-semibold text-gray-800 mt-3">
            No Matching Farms
          </Text>
          <Text className="text-center text-gray-500 mt-1">
            Try adjusting your search terms.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredFarms}
          renderItem={renderFarmCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("AddFarm")}
        style={{
          position: "absolute",
          bottom: 40,
          right: 20,
          backgroundColor: "#28a745",
          padding: 16,
          borderRadius: 30,
          elevation: 6,
        }}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
