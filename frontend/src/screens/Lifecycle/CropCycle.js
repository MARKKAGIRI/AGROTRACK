import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
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

  /* -------------------- FETCH DATA -------------------- */
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

  /* -------------------- DERIVED DATA -------------------- */
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
      // already expanded → do nothing (prevents loop)
      if (prev[activeStage.stage]) return prev;

      return {
        ...prev,
        [activeStage.stage]: true,
      };
    });
  }, [activeStage?.stage]);

  /* -------------------- HANDLERS -------------------- */
  const toggleTask = (taskId) => {
    setCheckedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const toggleStage = (stageName) => {
    setExpandedStages((prev) => ({
      ...prev,
      [stageName]: !prev[stageName],
    }));
  };

  if (!cycleData) {
  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-12">
      {/* Header skeleton */}
      <View className="bg-green-600 rounded-xl p-6 mb-6">
        <View className="h-6 bg-green-500 rounded w-2/3 mb-2" />
        <View className="h-4 bg-green-500 rounded w-1/2" />
      </View>

      {/* Cards skeleton */}
      {[1, 2, 3].map((_, i) => (
        <View
          key={i}
          className="bg-white rounded-xl p-4 mb-4"
        >
          <View className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
          <View className="h-3 bg-gray-200 rounded w-full mb-2" />
          <View className="h-3 bg-gray-200 rounded w-5/6" />
        </View>
      ))}
    </ScrollView>
  );
}


  const { crop } = cycleData;
  const { growthData } = crop;

  
  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-green-600 px-4 pt-12 pb-6">
        <Text className="text-white text-3xl font-bold">{crop.cropName}</Text>
        <Text className="text-green-100 text-sm mt-1">
          {crop.cropType} • {crop.region}
        </Text>

        <View className="flex-row items-center mt-4 bg-green-700 rounded-lg p-3">
          <View className="flex-1">
            <Text className="text-green-100 text-xs">Current Stage</Text>
            <Text className="text-white text-lg font-semibold">
              {activeStage?.stage || "—"}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-green-100 text-xs">Days Since Planting</Text>
            <Text className="text-white text-2xl font-bold">
              {daysSincePlanting}
            </Text>
          </View>
        </View>
      </View>

      {/* Season Progress */}
      <View className="bg-white mx-4 mt-4 p-4 rounded-lg shadow-sm">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-700 font-semibold">Season Progress</Text>
          <Text className="text-green-600 font-bold text-lg">
            {getSeasonProgress(daysSincePlanting, growthData.seasonLengthDays)}%
          </Text>
        </View>

        <View className="bg-gray-200 h-3 rounded-full overflow-hidden">
          <View
            className="bg-green-500 h-full"
            style={{
              width: `${getSeasonProgress(
                daysSincePlanting,
                growthData.seasonLengthDays
              )}%`,
            }}
          />
        </View>

        <Text className="text-gray-500 text-xs mt-2">
          Expected harvest:{" "}
          {(() => {
            const { minDate, maxDate } = getHarvestWindow(
              cycleData.plantingDate,
              growthData.seasonLengthDays
            );
            return `${minDate} – ${maxDate}`;
          })()}
        </Text>
      </View>

      {/* Priority Tasks */}
      {activeStage && (
        <View className="bg-amber-50 mx-4 mt-4 p-4 rounded-lg border-2 border-amber-300">
          <View className="flex-row items-center mb-3">
            <Text className="text-2xl mr-2">⭐</Text>
            <Text className="text-amber-900 text-lg font-bold flex-1">
              Priority Tasks
            </Text>
            {activeStage.daysRemaining > 0 && (
              <Text className="text-amber-700 text-xs font-semibold">
                {activeStage.daysRemaining} days left
              </Text>
            )}
          </View>

          {activeStage.tasks.map((task, idx) => {
            const taskId = `${activeStage.stage}-${idx}`;

            return (
              <Pressable
                key={taskId}
                onPress={() => toggleTask(taskId)}
                className="flex-row items-start mb-3 bg-white p-3 rounded-lg"
              >
                <View
                  className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${
                    checkedTasks[taskId]
                      ? "bg-green-500 border-green-500"
                      : "border-gray-300"
                  }`}
                >
                  {checkedTasks[taskId] && (
                    <Text className="text-white text-sm">✓</Text>
                  )}
                </View>
                <Text
                  className={`flex-1 ${
                    checkedTasks[taskId]
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      {/* Growth Timeline */}
      {/* Growth Timeline */}
      <View className="bg-white mx-4 mt-4 p-4 rounded-lg shadow-sm">
        <Text className="text-gray-800 font-bold text-lg mb-3">
          Growth Timeline
        </Text>

        {stagesWithStatus.map((stage, idx) => {
          const isExpanded = expandedStages[stage.stage];
          const isActive = stage.status === "active";
          const isCompleted = stage.status === "completed";

          return (
            <View key={idx} className="mb-3">
              <TouchableOpacity
                onPress={() => toggleStage(stage.stage)}
                className={`p-3 rounded-lg flex-row items-center ${
                  isActive
                    ? "bg-green-100 border-2 border-green-400"
                    : isCompleted
                      ? "bg-gray-100"
                      : "bg-gray-50 border border-gray-300"
                }`}
              >
                <Text className="text-2xl mr-3">
                  {isCompleted ? "✅" : isActive ? "🟢" : "⚪"}
                </Text>

                <View className="flex-1">
                  <Text
                    className={`font-semibold ${
                      isActive
                        ? "text-green-900"
                        : isCompleted
                          ? "text-gray-600"
                          : "text-gray-700"
                    }`}
                  >
                    {stage.stage}
                  </Text>

                  <Text className="text-xs text-gray-500">
                    {stage.durationRange.min}–{stage.durationRange.max} days
                    {isActive && ` • Day ${stage.daysIntoStage + 1}`}
                  </Text>
                </View>

                <Text className="text-gray-400">{isExpanded ? "▲" : "▼"}</Text>
              </TouchableOpacity>

              {isExpanded && (
                <View className="mt-2 ml-12">
                  {stage.tasks.map((task, taskIdx) => (
                    <View key={taskIdx} className="flex-row items-start mb-2">
                      <Text className="text-green-600 mr-2">•</Text>
                      <Text
                        className={`flex-1 text-sm ${
                          isCompleted ? "text-gray-400" : "text-gray-700"
                        }`}
                      >
                        {task}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Risks */}
      <View className="bg-white mx-4 mt-4 mb-6 p-4 rounded-lg shadow-sm">
        <Text className="text-gray-800 font-bold text-lg mb-3">
          Watch Out For
        </Text>

        <Text className="font-semibold mb-2">🐛 Common Pests</Text>
        <View className="flex-row flex-wrap mb-4">
          {growthData.commonPests.map((p, i) => (
            <View
              key={i}
              className="bg-red-50 px-3 py-1 rounded-full mr-2 mb-2"
            >
              <Text className="text-red-700 text-sm">{p}</Text>
            </View>
          ))}
        </View>

        <Text className="font-semibold mb-2">🦠 Common Diseases</Text>
        <View className="flex-row flex-wrap">
          {growthData.commonDiseases.map((d, i) => (
            <View
              key={i}
              className="bg-orange-50 px-3 py-1 rounded-full mr-2 mb-2"
            >
              <Text className="text-orange-700 text-sm">{d}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
