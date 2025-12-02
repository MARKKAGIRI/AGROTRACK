import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { getFarmById, getCropsByFarmId } from '../../services/farmApi'; // make sure getCropsByFarmId exists

export default function FarmDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { farmId } = route.params; // Get farm ID from navigation
  const { token } = useAuth();

  const [farm, setFarm] = useState(null);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCrops, setLoadingCrops] = useState(true);

  useEffect(() => {
    const fetchFarm = async () => {
      try {
        const res = await getFarmById(farmId, token);
        if (res.success) setFarm(res.farm);
      } catch (error) {
        console.log('Failed to load farm:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCrops = async () => {
      try {
        const res = await getCropsByFarmId(farmId, token);
        if (res.success) setCrops(res.crops || []);
      } catch (error) {
        console.log('Failed to load crops:', error);
        setCrops([]);
      } finally {
        setLoadingCrops(false);
      }
    };

    fetchFarm();
    fetchCrops();
  }, [farmId, token]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Growing':
        return 'bg-green-100 text-green-600';
      case 'Harvested':
        return 'bg-blue-100 text-blue-600';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-green-50">
        <ActivityIndicator size="large" color="#16a34a" />
      </SafeAreaView>
    );
  }

  if (!farm) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-green-50 px-6">
        <Ionicons name="leaf-outline" size={70} color="#16a34a" />
        <Text className="text-2xl font-bold text-gray-800 mt-4">
          Farm Not Found
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <StatusBar barStyle="light-content" backgroundColor="#16a34a" />

      {/* Header */}
      <View className="bg-green-600 px-5 pt-4 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 items-center justify-center">
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 items-center justify-center">
            <Ionicons name="ellipsis-vertical" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-start">
          <View className="w-16 h-16 rounded-2xl bg-white/20 items-center justify-center mr-4">
            <Ionicons name="leaf" size={32} color="#ffffff" />
          </View>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-white mb-1">{farm.name}</Text>
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={16} color="#bbf7d0" />
              <Text className="text-sm text-green-100 ml-1">{farm.location}</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View className="px-5 -mt-4">
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row">
              <View className="flex-1 items-center border-r border-gray-200">
                <Ionicons name="resize-outline" size={24} color="#16a34a" />
                <Text className="text-xs text-gray-500 mt-2 mb-1">Farm Size</Text>
                <Text className="text-lg font-bold text-gray-800">{farm.size || 'N/A'} {farm.unit || ''}</Text>
              </View>
              <View className="flex-1 items-center border-r border-gray-200">
                <Ionicons name="leaf-outline" size={24} color="#16a34a" />
                <Text className="text-xs text-gray-500 mt-2 mb-1">Crops</Text>
                <Text className="text-lg font-bold text-gray-800">{loadingCrops ? '...' : crops.length}</Text>
              </View>
              <View className="flex-1 items-center">
                <Ionicons name="checkmark-circle-outline" size={24} color="#16a34a" />
                <Text className="text-xs text-gray-500 mt-2 mb-1">Status</Text>
                <Text className="text-lg font-bold text-green-600">{farm.status || 'N/A'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Farm Information */}
        <View className="px-5 mt-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">Farm Information</Text>
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center mr-3">
                <Ionicons name="person-outline" size={20} color="#16a34a" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500">Owner</Text>
                <Text className="text-base font-semibold text-gray-800">{farm.owner?.name || 'N/A'}</Text>
              </View>
            </View>
            <View className="h-px bg-gray-200 my-2" />
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center mr-3">
                <Ionicons name="calendar-outline" size={20} color="#16a34a" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500">Created</Text>
                <Text className="text-base font-semibold text-gray-800">{new Date(farm.createdAt).toLocaleDateString()}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Crop Cycles Section */}
        <View className="px-5 mt-6 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-gray-800">Crop Cycles</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-sm font-semibold text-green-600 mr-1">Add New</Text>
              <Ionicons name="add-circle" size={20} color="#16a34a" />
            </TouchableOpacity>
          </View>

          {loadingCrops ? (
            <ActivityIndicator size="small" color="#16a34a" />
          ) : crops.length === 0 ? (
            <Text className="text-gray-500 text-center py-4">No crops added yet</Text>
          ) : (
            crops.map((crop) => (
              <TouchableOpacity key={crop.id} className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-gray-800 mb-1">{crop.cropName}</Text>
                    <View className="flex-row items-center">
                      <Ionicons name="calendar-outline" size={14} color="#6b7280" />
                      <Text className="text-xs text-gray-500 ml-1">
                        Planted: {new Date(crop.plantingDate).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                  <View className={`px-3 py-1 rounded-lg ${getStatusColor(crop.status)}`}>
                    <Text className={`text-xs font-semibold ${getStatusColor(crop.status)}`}>
                      {crop.status}
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="arrow-forward-outline" size={14} color="#6b7280" />
                  <Text className="text-xs text-gray-500 ml-1">
                    Harvest: {crop.harvestDate ? new Date(crop.harvestDate).toLocaleDateString() : 'N/A'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
