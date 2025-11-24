import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AllFarmsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample farm data
  const farms = [
    {
      id: '1',
      name: 'Green Valley Farm',
      location: 'Nairobi, Kenya',
      cropCount: 5,
      size: '10 acres',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Sunset Orchards',
      location: 'Kiambu, Kenya',
      cropCount: 3,
      size: '15 acres',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Highland Crops',
      location: 'Nakuru, Kenya',
      cropCount: 8,
      size: '20 acres',
      status: 'Active',
    },
    {
      id: '4',
      name: 'River Bend Farm',
      location: 'Kisumu, Kenya',
      cropCount: 4,
      size: '8 acres',
      status: 'Inactive',
    },
  ];

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
        <View className={`px-3 py-1 rounded-lg ${item.status === 'Active' ? 'bg-green-100' : 'bg-red-100'}`}>
          <Text className={`text-xs font-semibold ${item.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
            {item.status}
          </Text>
        </View>
      </View>

      <View className="flex-row bg-gray-50 rounded-xl p-3 mb-3">
        <View className="flex-1 items-center">
          <Ionicons name="grid-outline" size={18} color="#16a34a" />
          <Text className="text-xs text-gray-500 mt-1 mb-0.5">Crops</Text>
          <Text className="text-base font-semibold text-gray-800">{item.cropCount}</Text>
        </View>
        <View className="w-px bg-gray-300 mx-3" />
        <View className="flex-1 items-center">
          <Ionicons name="resize-outline" size={18} color="#16a34a" />
          <Text className="text-xs text-gray-500 mt-1 mb-0.5">Size</Text>
          <Text className="text-base font-semibold text-gray-800">{item.size}</Text>
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
          <Text className="text-sm text-green-100 mt-1">{farms.length} farms total</Text>
        </View>
        <TouchableOpacity className="w-12 h-12 rounded-full bg-white/20 items-center justify-center">
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
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>

      {/* Farms List */}
      <FlatList
        data={farms}
        renderItem={renderFarmCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}