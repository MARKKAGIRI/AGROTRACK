import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { getFarmById, getCropsByFarmId } from '../../services/farmApi';

export default function FarmDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { farmId } = route.params;
  const { token } = useAuth();

  const [farm, setFarm] = useState(null);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCrops, setLoadingCrops] = useState(true);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        const [farmRes, cropsRes] = await Promise.all([
          getFarmById(farmId, token),
          getCropsByFarmId(farmId, token)
        ]);

        if (farmRes.success) setFarm(farmRes.farm);
        if (cropsRes.success) setCrops(cropsRes.crops || []);
        
      } catch (error) {
        console.log('Error fetching farm data:', error);
      } finally {
        setLoading(false);
        setLoadingCrops(false);
      }
    };

    fetchFarmData();
  }, [farmId, token]);

  // --- Derived Calculations (Financials & Tasks) ---
  const { totalRevenue, totalExpenses, pendingTasks } = useMemo(() => {
    let rev = 0;
    let exp = 0;
    let tasks = [];

    // Loop through all crops to aggregate data
    crops.forEach(crop => {
      // Sum Revenue
      if (crop.revenues) {
        crop.revenues.forEach(r => rev += r.amount);
      }
      // Sum Expenses
      if (crop.expenses) {
        crop.expenses.forEach(e => exp += e.amount);
      }
      // Collect Pending Tasks
      if (crop.tasks) {
        const pending = crop.tasks.filter(t => t.status === 'pending').map(t => ({
          ...t,
          cropName: crop.crop?.name || 'Unknown Crop' // Assuming crop relation has name
        }));
        tasks = [...tasks, ...pending];
      }
    });

    return {
      totalRevenue: rev,
      totalExpenses: exp,
      pendingTasks: tasks
    };
  }, [crops]);

  // --- Helper Functions ---
  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString()}`; // Change symbol based on your region
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'growing') return 'bg-green-100 text-green-700';
    if (s === 'harvested') return 'bg-blue-100 text-blue-700';
    if (s === 'failed') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-600';
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#16a34a" />
      </SafeAreaView>
    );
  }

  if (!farm) return null; // Handle not found appropriately

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#16a34a" />

      {/* --- Header Section --- */}
      <View className="bg-[#2e7d32] pb-8 rounded-b-[10px] shadow-md">
       

        <View className="px-6 mt-6 flex-row items-center">
          <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center shadow-lg">
             <Ionicons name="leaf" size={32} color="#16a34a" />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-2xl font-bold text-white tracking-tight">{farm.name}</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="location-sharp" size={14} color="#bbf7d0" />
              <Text className="text-green-100 ml-1 text-sm font-medium">{farm.location}</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 -mt-6 px-5" showsVerticalScrollIndicator={false}>
        
        {/* --- Financial Overview (New Section) --- */}
        <View className="bg-white rounded-3xl p-5 shadow-sm mb-5 flex-row justify-between items-center">
          <View>
            <Text className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Total Revenue</Text>
            <Text className="text-xl font-bold text-gray-800">{formatCurrency(totalRevenue)}</Text>
          </View>
          <View className="h-10 w-[1px] bg-gray-100" />
          <View>
            <Text className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Total Expenses</Text>
            <Text className="text-xl font-bold text-gray-800">{formatCurrency(totalExpenses)}</Text>
          </View>
          <View className="h-10 w-[1px] bg-gray-100" />
          <View>
            <Text className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Net Profit</Text>
            <Text className={`text-xl font-bold ${totalRevenue - totalExpenses >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {formatCurrency(totalRevenue - totalExpenses)}
            </Text>
          </View>
        </View>

        {/* --- Pending Tasks (New Section) --- */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-gray-800 font-bold text-lg">Pending Tasks</Text>
            <TouchableOpacity>
               <Text className="text-green-600 text-sm font-semibold">See All</Text>
            </TouchableOpacity>
          </View>
          
          {pendingTasks.length === 0 ? (
            <View className="bg-white p-6 rounded-3xl items-center justify-center border border-dashed border-gray-200">
              <Ionicons name="checkmark-done-circle-outline" size={32} color="#d1d5db" />
              <Text className="text-gray-400 text-sm mt-2">No pending tasks</Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {pendingTasks.map((task) => (
                <View key={task.id} className="bg-white p-4 rounded-2xl mr-3 w-48 shadow-sm border border-gray-50">
                  <View className="flex-row justify-between items-start mb-2">
                     <View className="bg-orange-100 px-2 py-1 rounded-md">
                        <Text className="text-orange-600 text-[10px] font-bold uppercase">Pending</Text>
                     </View>
                     <Ionicons name="time-outline" size={16} color="#9ca3af" />
                  </View>
                  <Text className="text-gray-800 font-semibold mb-1" numberOfLines={1}>{task.title}</Text>
                  <Text className="text-gray-400 text-xs mb-3" numberOfLines={1}>{task.cropName}</Text>
                  
                  {/* Task Action Mock Button */}
                  <TouchableOpacity className="bg-gray-50 p-2 rounded-xl items-center">
                    <Text className="text-gray-600 text-xs font-semibold">Mark Done</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* --- Crop Cycles List --- */}
        <View className="mb-10">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-gray-800">Crop Cycles</Text>
            <TouchableOpacity className="flex-row items-center bg-green-50 px-3 py-1.5 rounded-full"
            onPress={() => navigation.navigate('AddCrop', { farmId })}>
              <Ionicons name="add" size={16} color="#16a34a" />
              <Text className="text-xs font-bold text-green-700 ml-1">Add Cycle</Text>
            </TouchableOpacity>
          </View>

          {loadingCrops ? (
            <ActivityIndicator size="small" color="#16a34a" />
          ) : crops.length === 0 ? (
             <View className="items-center py-8">
                <Text className="text-gray-400">No active crops found</Text>
             </View>
          ) : (
            crops.map((crop) => (
              <TouchableOpacity key={crop.id} className="bg-white rounded-3xl p-4 mb-3 shadow-sm border border-gray-50">
                <View className="flex-row items-center">
                  {/* Icon Box */}
                  <View className="w-12 h-12 bg-green-50 rounded-2xl items-center justify-center mr-4">
                    <Ionicons name="nutrition" size={24} color="#16a34a" />
                  </View>
                  
                  {/* Info */}
                  <View className="flex-1">
                    <View className="flex-row justify-between items-center mb-1">
                      <Text className="text-base font-bold text-gray-800">{crop.crop?.name || 'Crop'}</Text>
                      <View className={`px-2 py-0.5 rounded-full ${getStatusColor(crop.status)}`}>
                         <Text className="text-[10px] font-bold uppercase">{crop.status}</Text>
                      </View>
                    </View>
                    
                    <View className="flex-row items-center">
                       <Ionicons name="calendar-clear-outline" size={12} color="#9ca3af" />
                       <Text className="text-xs text-gray-400 ml-1 mr-3">
                         Planted: {new Date(crop.plantingDate).toLocaleDateString()}
                       </Text>
                    </View>
                  </View>
                  
                  <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}