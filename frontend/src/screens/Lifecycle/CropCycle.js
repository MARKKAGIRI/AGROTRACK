import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  getDaysSincePlanting,
  mapStageStatus,
  getActiveStage,
  getSeasonProgress,
  getHarvestWindow,
} from "../../utils/cropCycleHelpers";
import { useAuth } from "../../context/AuthContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getCropCycleById } from "../../services/cropApi";

export default function CropCycleScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { farmId, cropCycleId } = route.params;
  const { token } = useAuth();

  const [cycleData, setCycleData] = useState(null);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [expandedStages, setExpandedStages] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCycle = async () => {
      setLoading(true);
      try {
        const data = await getCropCycleById(farmId, cropCycleId, token);
        setCycleData(data);
      } catch (err) {
        console.error("Failed to load crop cycle", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCycle();
  }, []);

  const daysSincePlanting = cycleData
    ? getDaysSincePlanting(cycleData.plantingDate)
    : 0;

  const stagesWithStatus = cycleData
    ? mapStageStatus(cycleData.crop.growthData.growthStages, daysSincePlanting)
    : [];

  const activeStage = stagesWithStatus.length
    ? getActiveStage(stagesWithStatus)
    : null;

  /* Auto-expand active stage */
  useEffect(() => {
    if (!activeStage?.stage) return;
    setExpandedStages((prev) => {
      if (prev[activeStage.stage]) return prev;
      return { ...prev, [activeStage.stage]: true };
    });
  }, [activeStage?.stage]);

  const toggleTask = (taskId) => {
    setCheckedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const toggleStage = (stageName) => {
    setExpandedStages((prev) => ({
      ...prev,
      [stageName]: !prev[stageName],
    }));
  };

  if (loading || !cycleData) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  const { crop } = cycleData;
  const { growthData } = crop;
  const seasonProgress = getSeasonProgress(daysSincePlanting, growthData.seasonLengthDays);

  return (
    <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <View className="px-5 pt-4 pb-6">
        <View className="flex-row items-start justify-between mb-1">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900 mb-1">
              {crop.cropName}
            </Text>
            <Text className="text-sm text-gray-500">
              {crop.cropType} · {crop.region}
            </Text>
          </View>
          <View className="bg-emerald-500 px-3 py-1 rounded-md">
            <Text className="text-white text-xs font-semibold">Active</Text>
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View className="px-5 pb-6 flex-row">
        <View className="flex-1 mr-3">
          <View className="bg-gray-50 rounded-lg p-4">
            <Text className="text-xs text-gray-500 mb-1">Current Stage</Text>
            <Text className="text-base font-semibold text-gray-900">
              {activeStage?.stage || "Unknown"}
            </Text>
          </View>
        </View>
        <View className="flex-1 ml-3">
          <View className="bg-gray-50 rounded-lg p-4">
            <Text className="text-xs text-gray-500 mb-1">Progress</Text>
            <Text className="text-base font-semibold text-gray-900">
              Day {daysSincePlanting} of {growthData.seasonLengthDays}
            </Text>
          </View>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="px-5 pb-8">
        <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <View 
            className="bg-emerald-500 h-full" 
            style={{ width: `${seasonProgress}%` }} 
          />
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-xs text-gray-500">
            Planted {new Date(cycleData.plantingDate).toLocaleDateString()}
          </Text>
          <Text className="text-xs font-medium text-gray-700">
            {seasonProgress}%
          </Text>
        </View>
      </View>

      {/* Harvest Window */}
      <View className="px-5 pb-6">
        <View className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <View className="flex-row items-center">
            <Feather name="calendar" size={16} color="#f59e0b" />
            <Text className="text-sm text-gray-700 ml-2">
              Expected harvest: {" "}
              <Text className="font-medium text-gray-900">
                {(() => {
                  const { minDate, maxDate } = getHarvestWindow(
                    cycleData.plantingDate, 
                    growthData.seasonLengthDays
                  );
                  return `${minDate} – ${maxDate}`;
                })()}
              </Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Current Tasks */}
      {activeStage && activeStage.tasks.length > 0 && (
        <View className="px-5 pb-6">
          <Text className="text-base font-semibold text-gray-900 mb-3">
            Tasks for {activeStage.stage}
          </Text>
          
          <View className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {activeStage.tasks.map((task, idx) => {
              const taskId = `${activeStage.stage}-${idx}`;
              const isChecked = checkedTasks[taskId];
              const isLast = idx === activeStage.tasks.length - 1;
              
              return (
                <Pressable
                  key={taskId}
                  onPress={() => toggleTask(taskId)}
                  className={`flex-row items-center p-4 ${!isLast ? 'border-b border-gray-100' : ''}`}
                >
                  <View 
                    className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center
                      ${isChecked ? "bg-emerald-500 border-emerald-500" : "border-gray-300"}`}
                  >
                    {isChecked && <Feather name="check" size={14} color="white" />}
                  </View>
                  <Text 
                    className={`flex-1 text-sm ${
                      isChecked ? "text-gray-400 line-through" : "text-gray-700"
                    }`}
                  >
                    {task}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}

      {/* Growth Timeline */}
      <View className="px-5 pb-6">
        <Text className="text-base font-semibold text-gray-900 mb-3">
          Growth Timeline
        </Text>
        
        <View className="bg-white">
          {stagesWithStatus.map((stage, idx) => {
            const isLast = idx === stagesWithStatus.length - 1;
            const isActive = stage.status === "active";
            const isCompleted = stage.status === "completed";
            const isExpanded = expandedStages[stage.stage];

            return (
              <View key={idx} className="flex-row">
                {/* Timeline indicator */}
                <View className="items-center mr-4 pt-1">
                  <View 
                    className={`w-3 h-3 rounded-full ${
                      isActive 
                        ? "bg-emerald-500" 
                        : isCompleted 
                        ? "bg-gray-400" 
                        : "bg-gray-200"
                    }`}
                  />
                  {!isLast && (
                    <View 
                      className={`w-0.5 flex-1 mt-1 ${
                        isCompleted ? "bg-gray-300" : "bg-gray-200"
                      }`} 
                    />
                  )}
                </View>

                {/* Content */}
                <View className={`flex-1 ${!isLast ? 'pb-5' : ''}`}>
                  <TouchableOpacity 
                    onPress={() => toggleStage(stage.stage)}
                    className="flex-row justify-between items-start pb-2"
                  >
                    <View className="flex-1">
                      <Text 
                        className={`text-sm font-semibold mb-0.5 ${
                          isActive 
                            ? "text-emerald-600" 
                            : isCompleted 
                            ? "text-gray-900" 
                            : "text-gray-400"
                        }`}
                      >
                        {stage.stage}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {stage.durationRange.min}–{stage.durationRange.max} days
                      </Text>
                    </View>
                    <Feather 
                      name={isExpanded ? "chevron-up" : "chevron-down"} 
                      size={18} 
                      color="#9ca3af" 
                    />
                  </TouchableOpacity>

                  {isExpanded && (
                    <View className="mt-2 pl-0 pb-2">
                      {stage.tasks.map((task, tIdx) => (
                        <View key={tIdx} className="flex-row items-start mb-2">
                          <Text className="text-gray-400 mr-2 text-xs">•</Text>
                          <Text className="text-xs text-gray-600 flex-1 leading-5">
                            {task}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Risks Section */}
      <View className="px-5 pb-8">
        <Text className="text-base font-semibold text-gray-900 mb-3">
          Common Issues
        </Text>

        {/* Pests */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <MaterialCommunityIcons name="bug" size={16} color="#6b7280" />
            <Text className="text-sm text-gray-700 ml-2 font-medium">Pests</Text>
          </View>
          <View className="flex-row flex-wrap">
            {growthData.commonPests.map((pest, i) => (
              <View 
                key={i} 
                className="bg-gray-100 px-3 py-1.5 rounded-md mr-2 mb-2"
              >
                <Text className="text-xs text-gray-700">{pest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Diseases */}
        <View>
          <View className="flex-row items-center mb-2">
            <MaterialCommunityIcons name="bacteria" size={16} color="#6b7280" />
            <Text className="text-sm text-gray-700 ml-2 font-medium">Diseases</Text>
          </View>
          <View className="flex-row flex-wrap">
            {growthData.commonDiseases.map((disease, i) => (
              <View 
                key={i} 
                className="bg-gray-100 px-3 py-1.5 rounded-md mr-2 mb-2"
              >
                <Text className="text-xs text-gray-700">{disease}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

    </ScrollView>
  );
}