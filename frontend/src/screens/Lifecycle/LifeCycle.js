// screens/LifeCycle.js
import { View, Text, FlatList, Pressable, ActivityIndicator, Alert } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import PlantCard from "../../components/PlantCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { getCropsByFarm, setAuthToken } from "../../services/cropApi";
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const LifeCycle = ({ route }) => {
  const navigation = useNavigation()
  const { user, token } = useAuth();
  const { farmId } = "0d5bdfe5-d7b9-4b2a-94e9-8e165627307c";
  
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCrops = async () => {
    try {
      setAuthToken(token);
      const response = await getCropsByFarm(farmId);
      setCrops(response.crops || response.cropCycles || []); // Handle different response formats
    } catch (error) {
      Alert.alert('Error', 'Failed to load crops. Please try again.');
      console.error('Fetch crops error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch crops on screen focus
  useFocusEffect(
    useCallback(() => {
      fetchCrops();
    }, [farmId, token])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCrops();
  };

  const handleAddCrop = () => {
    navigation.navigate('AddCrop', { farmId });
  };

  const handleEditCrop = (crop) => {
    navigation.navigate('EditCrop', { farmId, crop });
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
        <ActivityIndicator size="large" color="#16a34a" />
        <Text className="text-gray-600 mt-4">Loading crops...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-3">
      <FlatList
        data={crops}
        renderItem={({ item }) => (
          <PlantCard 
            plant={item} 
            onEdit={() => handleEditCrop(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <View className="flex-row mb-6">
            <Ionicons name="calendar-sharp" size={24} color="green" />
            <Text className="text-green-800 font-bold text-2xl ml-3">
              LifeCycle Management
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View className="bg-white rounded-2xl p-8 items-center justify-center my-4">
            <Ionicons name="leaf-outline" size={64} color="#d1d5db" />
            <Text className="text-gray-500 text-lg mt-4 text-center">
              No crops added yet
            </Text>
            <Text className="text-gray-400 text-sm mt-2 text-center">
              Start tracking your crops by adding a new crop cycle
            </Text>
          </View>
        }
        ListFooterComponent={
          <Pressable
            onPress={handleAddCrop}
            className="bg-green-600 p-3 rounded-xl mt-6"
            android_ripple={{ color: 'rgba(255, 255, 255, 0.3)' }}
          >
            {({ pressed }) => (
              <Text
                className={`text-center text-white text-lg ${pressed ? "opacity-50" : ""}`}
              >
                + Add New Crop Cycle
              </Text>
            )}
          </Pressable>
        }
      />
    </SafeAreaView>
  );
};

export default LifeCycle;