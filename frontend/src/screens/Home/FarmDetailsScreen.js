import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Alert
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const { useRoute } = require("@react-navigation/native");
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "@env";

import TasksTab from "./tabs/TasksTab";
import MonitoringTab from "./tabs/MonitoringTab";
import IntegrationsTab from "./tabs/IntegrationsTab";
import { useFarmDetails } from "../../hooks/useFarmDetails";
import { useFarmCrops } from "../../hooks/useFarmCrops";
import FarmHeaderCarousel from "../../components/FarmHeaderCarousel";
import FarmImageUploader from "../../components/FarmImageUploader";
import EditFarmGallery from "../../components/EditFarmGallery";

export default function FarmDetailsScreen() {
  const route = useRoute();
  const { farmId } = route.params;
  const { token } = useAuth();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [isUploadModalVisible, setUploadModalVisible] = useState(false);

  const {
    data: farmDetails,
    isLoading: farmLoading,
    isError,
    refetch: refetchFarm,
  } = useFarmDetails(farmId, token);

  const { refetch: refetchCrops, isFetching } = useFarmCrops(farmId, token);

  const [activeTab, setActiveTab] = useState("Monitoring");
  const [imageLoading, setImageLoading] = useState(true);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchFarm(), refetchCrops()]);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleImageUpload = () => {
    setUploadModalVisible(true);
  };

  const onUploadSuccess = (newUrl) => {
    setUploadModalVisible(false);
    refetchFarm();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Monitoring":
        return <MonitoringTab userToken={token} farmId={farmId} />;
      case "Tasks":
        return <TasksTab />;
      case "Integrations":
        return <IntegrationsTab />;
      default:
        return <MonitoringTab userToken={token} farmId={farmId} />;
    }
  };

  const handleDeleteImage = async (imageUrl) => {
    try {
      const res = await fetch(`${API_URL}/images/farms/${farmId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (res.ok) {
        refetchFarm();
      } else {
        Alert.alert("Error", "Could not delete image.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      Alert.alert("Error", "Network request failed.");
    }
  };

  if (farmLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#388e3c" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 pb-32"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Farm Image Header */}
        <FarmHeaderCarousel
          images={farmDetails.images}
          handleImageUpload={() => {
            handleImageUpload();
          }}
        />

        {/* --- Main Data Container --- */}
        <View className="-mt-6 bg-white rounded-t-[32px] px-5 pt-8 pb-10 shadow-lg min-h-screen">
          {/* Header Row */}
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold text-[#1A1C1B]">
                {farmDetails?.name || (
                  <ActivityIndicator size="small" color="#1A1C1B" />
                )}
              </Text>
              <TouchableOpacity className="ml-2">
                <Feather name="edit-2" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Info Grid */}
          <View className="flex-row flex-wrap justify-between mb-8">
            <InfoCard
              label="Expenses"
              value="KSH 20,314.00"
              subColor="text-[#2E7D32]"
            />
            <InfoCard label="Harvest time" value="~4 Months" />
          </View>

          {/* Tab Navigation */}
          <View className="flex-row justify-between border-b border-[#F0F2F1] mb-6">
            {["Monitoring", "Tasks", "Integrations"].map((tab) => (
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

      {/* Updated Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isUploadModalVisible}
        onRequestClose={() => setUploadModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/60">
          {/* Touchable overlay to close when clicking outside */}
          <TouchableOpacity
            className="flex-1"
            onPress={() => setUploadModalVisible(false)}
          />

          <View className="bg-white rounded-t-[32px] h-[80%] shadow-2xl overflow-hidden">
            {/* 1. Header */}
            <View className="px-6 pt-6 pb-4 flex-row justify-between items-center border-b border-gray-100">
              <View>
                <Text className="text-xl font-extrabold text-gray-900">
                  Manage Photos
                </Text>
                <Text className="text-sm text-gray-500">
                  {farmDetails?.images?.length || 0} photos uploaded
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setUploadModalVisible(false)}
                className="bg-gray-100 w-10 h-10 rounded-full items-center justify-center"
              >
                <Feather name="x" size={20} color="#4b5563" />
              </TouchableOpacity>
            </View>

            {/* 2. Scrollable Content */}
            <View className="flex-1 px-5 pt-4">
              {/* Section: Gallery */}
              <Text className="text-sm font-bold text-gray-400 uppercase mb-3 tracking-wider">
                Current Gallery
              </Text>

              <View className="flex-1 bg-gray-50 rounded-2xl p-2 mb-6">
                <EditFarmGallery
                  images={farmDetails?.images || []}
                  onDelete={handleDeleteImage}
                />
              </View>

              {/* Section: Uploader */}
              <Text className="text-sm font-bold text-gray-400 uppercase mb-3 tracking-wider">
                Upload New
              </Text>
              <View className="mb-8">
                <FarmImageUploader
                  farmId={farmId}
                  onImageUploaded={onUploadSuccess}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
