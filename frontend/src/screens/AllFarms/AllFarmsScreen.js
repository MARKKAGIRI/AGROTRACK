import React, { useState, useEffect } from "react";
import { getAllFarms } from "../../services/farmApi";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function AllFarmsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { user, token } = useAuth()

  // Fetch farms on load
  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const res = await getAllFarms(user.user_id, token);
        setFarms(res.farms || []);
      } catch (error) {w
        console.log("Failed to load fa rms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  // Filter based on search
  const filteredFarms = farms.filter((farm) =>
    farm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Farm card UI
  const renderFarmCard = ({ item }) => (
    <TouchableOpacity className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
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
            <Text className="text-sm text-gray-500 ml-1">{item.location}</Text>
          </View>
        </View>

        <View
          className={`px-3 py-1 rounded-lg ${
            item.status === "Active" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              item.status === "Active" ? "text-green-600" : "text-red-600"
            }`}
          >
            {item.status || "Active"}
          </Text>
        </View>
      </View>

      <View className="flex-row bg-gray-50 rounded-xl p-3 mb-3">
        <View className="flex-1 items-center">
          <Ionicons name="grid-outline" size={18} color="#16a34a" />
          <Text className="text-xs text-gray-500 mt-1 mb-0.5">Size</Text>
          <Text className="text-base font-semibold text-gray-800">
            {item.size || "N/A"}
          </Text>
        </View>
      </View>

      <TouchableOpacity className="flex-row items-center justify-center py-2.5">
        <Text className="text-sm font-semibold text-green-600 mr-1">
          View Details
        </Text>
        <Ionicons name="chevron-forward" size={16} color="#16a34a" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <StatusBar barStyle="light-content" backgroundColor="#16a34a" />

      {/* Header */}
      <View className="bg-green-600 px-5 py-6 flex-row justify-between items-center rounded-b-3xl">
        <View>
          <Text className="text-3xl font-bold text-white">My Farms</Text>
          <Text className="text-sm text-green-100 mt-1">
            {farms.length} farms total
          </Text>
        </View>
        <TouchableOpacity className="w-12 h-12 rounded-full bg-white/20 items-center justify-center"
        onPress={() => navigation.navigate("AddFarm")}>
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

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

      {/* Loading */}
      {loading ? (
        <ActivityIndicator size="large" color="#16a34a" className="mt-10" />
      ) : farms.length === 0 ? (
        // *****************************
        // EMPTY STATE → No farms at all
        // *****************************
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
        // *****************************************
        // EMPTY STATE → User typed search query but
        // no matching farms found
        // *****************************************
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
        />
      )}
    </SafeAreaView>
  );
}
