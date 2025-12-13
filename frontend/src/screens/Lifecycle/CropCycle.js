import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  parseDuration,
  getDaysSincePlanting,
  mapStageStatus,
  getActiveStage,
  getSeasonProgress,
  getHarvestWindow,
} from "../../utils/cropCycleHelpers";
import { getCropsByFarmId } from "../../services/farmApi";
import { useAuth } from "../../context/AuthContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getCropCycleById } from "../../services/cropApi";

// Mock Data
const mockData = {
  plantingDate: "2024-11-20",
  cropName: "Beans",
  cropType: "Legume",
  region: "East Africa / Kenya",
  growthData: {
    idealConditions: {
      temperature: {
        min: 15,
        max: 28,
        optimalRange: "18–24°C",
      },
      rainfall: {
        min: 300,
        max: 600,
        unit: "mm per season",
      },
      soil: {
        type: "Well-drained loam or sandy loam",
        phRange: "6.0–7.0",
      },
      sunlight: "Full sun (6+ hours per day)",
      altitude: "600–2000m",
    },
    growthStages: [
      {
        stage: "Land Preparation",
        durationDays: "7–10 days",
        tasks: [
          "Clear field and remove weeds",
          "Plough soil to 15–20 cm depth",
          "Break clods and level field",
          "Mix in farmyard manure (5 tons/acre)",
        ],
      },
      {
        stage: "Planting",
        durationDays: "1–3 days",
        tasks: [
          "Select clean, certified bean seeds",
          "Sow seeds 3–5 cm deep, 45 cm between rows, 10–15 cm between plants",
          "Apply basal fertilizer (DAP or NPK 10-26-10) at 20–40 kg/acre",
          "Ensure the soil is moist but not waterlogged",
        ],
      },
      {
        stage: "Germination",
        durationDays: "4–8 days",
        tasks: [
          "Monitor seedlings for uniform emergence",
          "Light irrigation if soil dries",
          "Check for early pests like bean fly",
          "Remove weeds around young seedlings",
        ],
      },
      {
        stage: "Vegetative Growth",
        durationDays: "15–25 days",
        tasks: [
          "Perform first weeding",
          "Apply top-dressing (low-nitrogen fertilizers only if needed)",
          "Scout for aphids and bean fly",
          "Ensure moderate and consistent moisture",
        ],
      },
      {
        stage: "Flowering",
        durationDays: "10–20 days",
        tasks: [
          "Ensure no moisture stress during flowering",
          "Monitor for fungal diseases like anthracnose",
          "Avoid heavy nitrogen fertilizer to prevent excessive leaves",
          "Light irrigation early morning if rainfall is low",
        ],
      },
      {
        stage: "Pod Formation",
        durationDays: "15–25 days",
        tasks: [
          "Irrigate moderately (avoid waterlogging)",
          "Control pests like pod borers",
          "Check for root rot and remove infected plants",
          "Stop nitrogen fertilizer completely",
        ],
      },
      {
        stage: "Maturity",
        durationDays: "10–15 days",
        tasks: [
          "Reduce irrigation to reduce disease risk",
          "Check pods for maturity and dryness",
          "Start preparing for harvest",
          "Avoid handling wet plants to reduce disease spread",
        ],
      },
      {
        stage: "Harvesting",
        durationDays: "3–7 days",
        tasks: [
          "Harvest when 80–90% of pods are dry",
          "Uproot plants or pick pods manually",
          "Dry beans on a clean mat to 12–13% moisture",
          "Store in airtight bags",
        ],
      },
    ],
    seasonLengthDays: "60–90",
    commonPests: ["Bean fly", "Aphids", "Pod borers", "Whiteflies"],
    commonDiseases: ["Anthracnose", "Root rot", "Angular leaf spot", "Rust"],
  },
};

// Mock weather data (replace with API)
const mockWeather = {
  temperature: 22,
  rainfall: 450,
};

export default function CropCycleScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [checkedTasks, setCheckedTasks] = useState({});
  const [expandedStages, setExpandedStages] = useState({});
  const [cycleData, setCycleData] = useState(null);
  const { token } = useAuth();
  const { farmId, cropCycleId } = route.params;
  const [loading, setLoading] = useState(false);

  const { plantingDate, cropName, cropType, region, growthData } = mockData;
  const daysSincePlanting = getDaysSincePlanting(plantingDate);
  const stagesWithStatus = mapStageStatus(
    growthData.growthStages,
    daysSincePlanting
  );
  const activeStage = getActiveStage(stagesWithStatus);
  const seasonProgress = getSeasonProgress(
    daysSincePlanting,
    growthData.seasonLengthDays
  );
  const harvestWindow = getHarvestWindow(
    plantingDate,
    growthData.seasonLengthDays
  );

  const toggleTask = (taskId) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const toggleStage = (stageName) => {
    setExpandedStages((prev) => ({
      ...prev,
      [stageName]: !prev[stageName],
    }));
  };

  // Auto-expand active stage
  useEffect(() => {
    if (activeStage) {
      setExpandedStages((prev) => ({
        ...prev,
        [activeStage.stage]: true,
      }));
    }
  }, [activeStage]);

  useEffect(() => {
    const getCycleData = async () => {
      setLoading(true);
      try {
        const data = await getCropCycleById(farmId, cropCycleId, token);
        setCycleData(data);
        // console.log(data)
      } catch (error) {
        console.log("Error fetching farm data:", error);
      } finally {
        setLoading(false);
      }
    };

    getCycleData();
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-green-600 px-4 pt-12 pb-6">
        <Text className="text-white text-3xl font-bold">{cycleData?.crop.cropName || "loading..."}</Text>
        <Text className="text-green-100 text-sm mt-1">
          {cycleData?.crop.cropType || 'loading...'} • {cycleData?.crop.region || 'loading'}
        </Text>
        <View className="flex-row items-center mt-4 bg-green-700 rounded-lg p-3">
          <View className="flex-1">
            <Text className="text-green-100 text-xs">Current Stage</Text>
            <Text className="text-white text-lg font-semibold">
              {activeStage ? activeStage.stage : "Completed"}
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
            {seasonProgress}%
          </Text>
        </View>
        <View className="bg-gray-200 h-3 rounded-full overflow-hidden">
          <View
            className="bg-green-500 h-full rounded-full"
            style={{ width: `${seasonProgress}%` }}
          />
        </View>
        <Text className="text-gray-500 text-xs mt-2">
          Expected harvest: {harvestWindow.minDate} - {harvestWindow.maxDate}
        </Text>
      </View>

      {/* Today's Priority Tasks */}
      {activeStage && (
        <View className="bg-amber-50 mx-4 mt-4 p-4 rounded-lg border-2 border-amber-300">
          <View className="flex-row items-center mb-3">
            <Text className="text-2xl mr-2">⭐</Text>
            <Text className="text-amber-900 text-lg font-bold flex-1">
              Today's Priority Tasks
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
                  className={`flex-1 text-gray-800 ${
                    checkedTasks[taskId] ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      {/* Weather Conditions */}
      <View className="bg-white mx-4 mt-4 p-4 rounded-lg shadow-sm">
        <Text className="text-gray-800 font-bold text-lg mb-3">
          Current Conditions
        </Text>

        <View className="flex-row items-center mb-3 bg-green-50 p-3 rounded-lg">
          <Text className="text-2xl mr-3">🌡️</Text>
          <View className="flex-1">
            <Text className="text-gray-700 font-semibold">Temperature</Text>
            <Text className="text-gray-600 text-sm">
              {mockWeather.temperature}°C • Ideal:{" "}
              {growthData.idealConditions.temperature.optimalRange}
            </Text>
          </View>
          <Text className="text-green-600 text-xl">✅</Text>
        </View>

        <View className="flex-row items-center mb-3 bg-green-50 p-3 rounded-lg">
          <Text className="text-2xl mr-3">☔</Text>
          <View className="flex-1">
            <Text className="text-gray-700 font-semibold">Rainfall</Text>
            <Text className="text-gray-600 text-sm">
              Season total: {mockWeather.rainfall}mm • Ideal:{" "}
              {growthData.idealConditions.rainfall.min}-
              {growthData.idealConditions.rainfall.max}mm
            </Text>
          </View>
          <Text className="text-green-600 text-xl">✅</Text>
        </View>

        <View className="flex-row items-center bg-blue-50 p-3 rounded-lg">
          <Text className="text-2xl mr-3">🌍</Text>
          <View className="flex-1">
            <Text className="text-gray-700 font-semibold">Soil Type</Text>
            <Text className="text-gray-600 text-sm">
              {growthData.idealConditions.soil.type}
            </Text>
          </View>
        </View>
      </View>

      {/* Growth Timeline */}
      <View className="bg-white mx-4 mt-4 p-4 rounded-lg shadow-sm">
        <Text className="text-gray-800 font-bold text-lg mb-3">
          Growth Timeline
        </Text>

        {stagesWithStatus.map((stage, idx) => {
          const isExpanded = expandedStages[stage.stage];
          const isActive = stage.status === "active";
          const isCompleted = stage.status === "completed";
          const isLocked = stage.status === "locked";

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
                  {isCompleted ? "✅" : isActive ? "🟢" : "🔒"}
                </Text>
                <View className="flex-1">
                  <Text
                    className={`font-semibold ${
                      isActive
                        ? "text-green-900"
                        : isCompleted
                          ? "text-gray-500"
                          : "text-gray-400"
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

              {isExpanded && !isLocked && (
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

        <View className="mb-3">
          <Text className="text-gray-700 font-semibold mb-2">
            🐛 Common Pests
          </Text>
          <View className="flex-row flex-wrap">
            {growthData.commonPests.map((pest, idx) => (
              <View
                key={idx}
                className="bg-red-50 px-3 py-1 rounded-full mr-2 mb-2"
              >
                <Text className="text-red-700 text-sm">{pest}</Text>
              </View>
            ))}
          </View>
        </View>

        <View>
          <Text className="text-gray-700 font-semibold mb-2">
            🦠 Common Diseases
          </Text>
          <View className="flex-row flex-wrap">
            {growthData.commonDiseases.map((disease, idx) => (
              <View
                key={idx}
                className="bg-orange-50 px-3 py-1 rounded-full mr-2 mb-2"
              >
                <Text className="text-orange-700 text-sm">{disease}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
