import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const IntegrationItem = ({ icon, name, status, color }) => (
  <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-2xl mb-3 border border-gray-100 shadow-sm">
    <View className={`p-3 rounded-xl bg-${color}-50`}>
      <MaterialCommunityIcons name={icon} size={24} color={color} />
    </View>
    <View className="ml-4 flex-1">
      <Text className="text-gray-900 font-bold">{name}</Text>
      <Text className="text-gray-400 text-xs">{status}</Text>
    </View>
    <Feather name="chevron-right" size={18} color="#D1D5DB" />
  </TouchableOpacity>
);

export default function IntegrationsTab() {
  return (
    <ScrollView className="py-6 bg-white">
      <Text className="text-gray-400 text-[10px] font-black uppercase mb-4 tracking-widest">
        Connected Hardware
      </Text>
      
      <IntegrationItem 
        icon="router-wireless" 
        name="Soil Sensor Node #1" 
        status="Online • Battery 82%" 
        color="#10B981" 
      />
      
      <IntegrationItem 
        icon="weather-cloudy" 
        name="Weather Station" 
        status="Last Sync: 5m ago" 
        color="#3B82F6" 
      />

      <Text className="text-gray-400 text-[10px] font-black uppercase mt-6 mb-4 tracking-widest">
        Market & Logistics
      </Text>

      <IntegrationItem 
        icon="cart-outline" 
        name="Local Market Price" 
        status="Disconnected" 
        color="#6B7280" 
      />

      {/* Add New Integration Button */}
      <TouchableOpacity className="mt-4 border-2 border-dashed border-gray-200 rounded-2xl p-4 items-center">
        <Text className="text-gray-400 font-bold">+ Connect New Device</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}