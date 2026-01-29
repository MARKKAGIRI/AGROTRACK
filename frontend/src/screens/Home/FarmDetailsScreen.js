import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StatusBar, ImageBackground, Image } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Import your new components
import TasksTab from "./tabs/TasksTab";
import MonitoringTab from "./tabs/MonitoringTab";
import IntegrationsTab from "./tabs/IntegrationsTab";
import SettingsTab from "./tabs/SettingsTab";

export default function FarmDetailsScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Task");

  const renderContent = () => {
    switch (activeTab) {
      case "Task": return <TasksTab />;
      case "Monitoring": return <MonitoringTab />;
      case "Integrations": return <IntegrationsTab />;
      case "Settings": return <SettingsTab />;
      default: return <TasksTab />;
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-32">
        {/* --- Satellite Header & Field Outline --- */}
        <View className="relative h-80 w-full">
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef' }}
            className="w-full h-full justify-between p-6 pt-12"
            resizeMode="cover"
          >
            <TouchableOpacity onPress={() => navigation.goBack()} className="bg-white h-10 w-10 rounded-xl items-center justify-center shadow-sm">
               <Feather name="arrow-left" size={20} color="black" />
            </TouchableOpacity>

            {/* Field Polygon Overlay */}
            <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/White_polygon.svg/1024px-White_polygon.svg.png' }} 
                className="absolute top-20 left-10 w-64 h-40 opacity-80"
                resizeMode="contain"
            />

            <View className="flex-row justify-between items-end mb-4">
                <View className="bg-white/90 px-3 py-1.5 rounded-md">
                    <Text className="text-[10px] font-semibold text-gray-800">Generate by Satellite imagery services</Text>
                </View>
                <TouchableOpacity className="bg-white h-10 w-10 rounded-xl items-center justify-center shadow-sm">
                    <Feather name="maximize" size={20} color="black" />
                </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* --- Main Data Container --- */}
        <View className="-mt-6 bg-white rounded-t-[32px] px-5 pt-8 pb-10 shadow-lg min-h-screen">
          
          {/* Header Row */}
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center">
                <Text className="text-2xl font-bold text-[#1A1C1B]">Tomatoes Field</Text>
                <TouchableOpacity className="ml-2"><Feather name="edit-2" size={16} color="#9CA3AF" /></TouchableOpacity>
            </View>
            <TouchableOpacity className="bg-[#F3F5F4] px-3 py-2 rounded-lg flex-row items-center">
                <Text className="text-[#1A1C1B] font-medium mr-1 text-xs">More Details</Text>
                <Feather name="chevron-right" size={14} color="#1A1C1B" />
            </TouchableOpacity>
          </View>

          {/* Info Grid */}
          <View className="flex-row flex-wrap justify-between mb-8">
            <InfoCard label="Crop Health" value="Good" isBadge badgeColor="bg-[#E8F5E9]" textColor="text-[#2E7D32]" icon="chevron-right" />
            <InfoCard label="Planting date" value="12/01/2024" />
            <InfoCard label="Expenses" value="$2,314.00" subValue="-10%" subColor="text-[#2E7D32]" icon="chevron-right" />
            <InfoCard label="Harvest time" value="~4 Months" />
          </View>

          {/* Tab Navigation */}
          <View className="flex-row justify-between border-b border-[#F0F2F1] mb-6">
            {['Task', 'Monitoring', 'Integrations', 'Settings'].map((tab) => (
                <TouchableOpacity 
                    key={tab} 
                    onPress={() => setActiveTab(tab)}
                    className={`pb-3 border-b-2 ${activeTab === tab ? 'border-[#2E7D32]' : 'border-transparent'}`}
                >
                    <Text className={`font-semibold ${activeTab === tab ? 'text-[#2E7D32]' : 'text-[#9CA3AF]'}`}>{tab}</Text>
                </TouchableOpacity>
            ))}
          </View>

          {/* --- Dynamic Tab Content --- */}
          {renderContent()}

        </View>
      </ScrollView>

      <TouchableOpacity 
        className="absolute bottom-8 right-6 h-16 w-16 bg-[#2E7D32] rounded-full items-center justify-center shadow-xl z-50"
        activeOpacity={0.8}
        // onPress={() => navigation.navigate('ChatScreen')} 
      >
          {/* 'sparkles' exists in Ionicons and is the standard AI icon */}
          <Ionicons name="sparkles" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

// Reusable Info Card Component
const InfoCard = ({ label, value, subValue, subColor, isBadge, badgeColor, textColor, icon }) => (
  <View className="w-[48%] bg-white border border-[#F3F5F4] p-4 rounded-2xl mb-4 shadow-sm">
    <Text className="text-gray-400 text-xs mb-2">{label}</Text>
    <View className="flex-row items-center justify-between">
        {isBadge ? (
            <View className={`${badgeColor} px-2 py-1 rounded-md`}>
                <Text className={`${textColor} font-bold text-xs`}>{value}</Text>
            </View>
        ) : (
            <View className="flex-row items-baseline">
                <Text className="text-[#1A1C1B] font-bold text-base">{value}</Text>
                {subValue && <Text className={`text-xs ml-2 ${subColor} font-medium`}>{subValue}</Text>}
            </View>
        )}
        {icon && <View className="bg-gray-50 rounded-full p-1"><Feather name={icon} size={12} color="gray" /></View>}
    </View>
  </View>
);