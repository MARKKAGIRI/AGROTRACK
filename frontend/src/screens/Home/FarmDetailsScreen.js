import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  Image,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getSatelliteDataDirectly } from "../../services/FarmService";
const { useRoute } = require("@react-navigation/native");
import { useAuth } from "../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";

import TasksTab from "./tabs/TasksTab";
import MonitoringTab from "./tabs/MonitoringTab";
import IntegrationsTab from "./tabs/IntegrationsTab";
import { getFarmById } from "../../services/farmApi";

export default function FarmDetailsScreen() {
  const route = useRoute();
  const { farmId } = route.params;
  const { token } = useAuth();
  const navigation = useNavigation();
  const [farmDetails, setFarmDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("Task");
  const [imageLoading, setImageLoading] = useState(true);
  const [farmLoading, setFarmLoading] = useState(true);
  

  useEffect(() => {
    const fetchFarmDetails = async () => {
      const farmData = await getFarmById(farmId, token);
      setFarmDetails(farmData.farm);
      setFarmLoading(false);
      
    };

    fetchFarmDetails();
  }, [farmId, token]);

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    })

    if (!result.canceled){
      setFarmDetails({...farmDetails, imageUri: result.assets[0].uri});

      // TODO: upload image to firebase
    }    
  }
  

  const renderContent = (token, farmId) => {
    switch (activeTab) {
      case "Monitoring":
        return <MonitoringTab />;
      case "Tasks":
        return <TasksTab />;
      case "Integrations":
        return <IntegrationsTab />;
      default:
        return <MonitoringTab userToken={token} farmId={farmId} />;
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-32">
        {/* Farm Image Header */}
        <View className="h-[400px] w-full overflow-hidden rounded-b-[40px] bg-gray-900 shadow-2xl">
          <ImageBackground
            source={{
              uri: farmDetails?.imageUri ||
                    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000"
                  
            }}
            className="w-full h-full justify-between p-6 pt-12"
            resizeMode="cover"
          >
            <View className="absolute inset-0 bg-black/30" />

            {/* Top Row */}
            <View className="flex-row justify-between items-start z-10">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="bg-white/90 h-10 w-10 rounded-2xl items-center justify-center shadow-lg"
              >
                <Feather name="arrow-left" size={20} color="#1A1C1B" />
              </TouchableOpacity>

              {/* Edit Photo Button */}
              <TouchableOpacity
                onPress={handleImageUpload}
                className="bg-white/90 px-4 py-2 rounded-2xl flex-row items-center shadow-lg"
              >
                <Feather name="camera" size={16} color="#1A1C1B" />
                <Text className="text-[#1A1C1B] font-bold text-xs ml-2">
                  Change Photo
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* --- Main Data Container --- */}
        <View className="-mt-6 bg-white rounded-t-[32px] px-5 pt-8 pb-10 shadow-lg min-h-screen">
          {/* Header Row */}
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold text-[#1A1C1B]">
                {farmDetails?.name || <ActivityIndicator size="small" color="#1A1C1B" />}
              </Text>
              <TouchableOpacity className="ml-2">
                <Feather name="edit-2" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="bg-[#F3F5F4] px-3 py-2 rounded-lg flex-row items-center">
              <Text className="text-[#1A1C1B] font-medium mr-1 text-xs">
                More Details
              </Text>
              <Feather name="chevron-right" size={14} color="#1A1C1B" />
            </TouchableOpacity>
          </View>

          {/* Info Grid */}
          <View className="flex-row flex-wrap justify-between mb-8">
            <InfoCard
              label="Crop Health"
              value="Good"
              isBadge
              badgeColor="bg-[#E8F5E9]"
              textColor="text-[#2E7D32]"
              icon="chevron-right"
            />
            <InfoCard label="Planting date" value="12/01/2024" />
            <InfoCard
              label="Expenses"
              value="$2,314.00"
              subValue="-10%"
              subColor="text-[#2E7D32]"
              icon="chevron-right"
            />
            <InfoCard label="Harvest time" value="~4 Months" />
          </View>

          {/* Tab Navigation */}
          <View className="flex-row justify-between border-b border-[#F0F2F1] mb-6">
            {["Monitoring", "Tasks" ,"Integrations"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`pb-3 border-b-2 ${activeTab === tab ? "border-[#2E7D32]" : "border-transparent"}`}
              >
                <Text
                  className={`font-semibold ${activeTab === tab ? "text-[#2E7D32]" : "text-[#9CA3AF]"}`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* --- Dynamic Tab Content --- */}
          {renderContent(token, farmId)}
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
const InfoCard = ({
  label,
  value,
  subValue,
  subColor,
  isBadge,
  badgeColor,
  textColor,
  icon,
}) => (
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
          {subValue && (
            <Text className={`text-xs ml-2 ${subColor} font-medium`}>
              {subValue}
            </Text>
          )}
        </View>
      )}
      {icon && (
        <View className="bg-gray-50 rounded-full p-1">
          <Feather name={icon} size={12} color="gray" />
        </View>
      )}
    </View>
  </View>
);
