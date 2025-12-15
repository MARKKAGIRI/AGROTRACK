import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";

const AnalyticsScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Financial Analytics from Revenue and Expense models
  const financialData = {
    totalRevenue: 456800,
    totalExpenses: 283400,
    netProfit: 173400,
    profitMargin: 38,
    revenueGrowth: 12.5,
    expensesByType: [
      { type: "Seeds & Fertilizer", amount: 85000, percentage: 30 },
      { type: "Labor", amount: 120000, percentage: 42 },
      { type: "Equipment", amount: 48400, percentage: 17 },
      { type: "Utilities", amount: 30000, percentage: 11 }
    ]
  };

  // Farm Performance from Farm model
  const farmStats = {
    totalFarms: 3,
    totalArea: 45.5,
    activeCropCycles: 12,
    completedCropCycles: 8,
    farms: [
      { name: "North Field", size: 20.5, unit: "acres", activeCrops: 5, revenue: 220000 },
      { name: "South Valley", size: 15.0, unit: "acres", activeCrops: 4, revenue: 156800 },
      { name: "East Garden", size: 10.0, unit: "acres", activeCrops: 3, revenue: 80000 }
    ]
  };

  // Crop Cycle Analytics from CropCycle, Crops, Revenue, and Expense models
  const cropCycleData = [
    {
      cropName: "Tomatoes",
      status: "growing",
      cycles: 3,
      planted: 12,
      harvested: 8,
      revenue: 125000,
      expenses: 62000,
      profit: 63000,
      profitMargin: 50,
      successRate: 85,
      avgGrowthDays: 75,
      progressColor: "bg-green-600"
    },
    {
      cropName: "Lettuce",
      status: "growing",
      cycles: 2,
      planted: 8,
      harvested: 6,
      revenue: 48000,
      expenses: 24000,
      profit: 24000,
      profitMargin: 50,
      successRate: 90,
      avgGrowthDays: 45,
      progressColor: "bg-green-600"
    },
    {
      cropName: "Carrots",
      status: "planted",
      cycles: 2,
      planted: 15,
      harvested: 10,
      revenue: 72000,
      expenses: 45000,
      profit: 27000,
      profitMargin: 38,
      successRate: 75,
      avgGrowthDays: 60,
      progressColor: "bg-amber-500"
    },
    {
      cropName: "Peppers",
      status: "harvested",
      cycles: 2,
      planted: 10,
      harvested: 10,
      revenue: 89000,
      expenses: 52000,
      profit: 37000,
      profitMargin: 42,
      successRate: 88,
      avgGrowthDays: 80,
      progressColor: "bg-green-600"
    },
    {
      cropName: "Spinach",
      status: "growing",
      cycles: 3,
      planted: 20,
      harvested: 15,
      revenue: 62800,
      expenses: 38000,
      profit: 24800,
      profitMargin: 39,
      successRate: 80,
      avgGrowthDays: 50,
      progressColor: "bg-green-600"
    }
  ];

  // Task Stats from Task model
  const taskStats = {
    pending: 8,
    completed: 24,
    overdue: 2,
    completionRate: 75,
    unreadNotifications: 5
  };

  // Weather Analytics from WeatherLog model
  const weatherData = {
    avgTemp: 24.5,
    avgHumidity: 65,
    totalRainfall: 45.2,
    avgWindSpeed: 12.3,
    optimalDays: 22,
    warningDays: 3
  };

  const formatKES = (amount) => {
    if (amount >= 1000000) {
      return `KES ${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `KES ${(amount / 1000).toFixed(0)}k`;
    }
    return `KES ${amount.toLocaleString()}`;
  };

  const ProgressBar = ({ progress, colorClass = "bg-green-600" }) => (
    <View className="w-full h-2 bg-gray-200 rounded">
      <View 
        className={`h-2 rounded ${colorClass}`}
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </View>
  );

  const MetricCard = ({ title, value, subtitle, textColor = "text-green-600", trend }) => (
    <View className="bg-white rounded-xl p-4 flex-1 mx-1 shadow-md">
      <Text className={`text-3xl font-bold mb-1 ${textColor}`}>{value}</Text>
      <Text className="text-xs text-gray-600 mb-1">{title}</Text>
      {subtitle && <Text className="text-xs text-gray-400">{subtitle}</Text>}
      {trend && (
        <View className="flex-row items-center mt-2">
          <Text className={`text-xs font-semibold ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
            {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }}
      >
       
        {/* Period Selector */}
        <View className="flex-row px-5 mb-5">
          {["week", "month", "year"].map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period)}
              className={`py-2 px-4 rounded-full mr-2 ${
                selectedPeriod === period ? "bg-green-600" : "bg-gray-200"
              }`}
            >
              <Text className={`font-semibold capitalize ${
                selectedPeriod === period ? "text-white" : "text-gray-700"
              }`}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Financial Overview */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center mb-4">
            <Text className="text-lg font-semibold text-gray-900">Financial Overview</Text>
          </View>
          
          <View className="flex-row mb-3">
            <MetricCard 
              title="Total Revenue" 
              value={formatKES(financialData.totalRevenue)} 
              textColor="text-green-600" 
              trend={financialData.revenueGrowth} 
            />
            <MetricCard 
              title="Net Profit" 
              value={formatKES(financialData.netProfit)} 
              textColor="text-green-600" 
              subtitle={`${financialData.profitMargin}% margin`} 
            />
          </View>

          <View className="bg-white rounded-xl p-4 shadow-md">
            <Text className="text-sm font-semibold text-gray-900 mb-3">Expenses Breakdown</Text>
            {financialData.expensesByType.map((expense, idx) => (
              <View key={idx} className="mb-3">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-sm text-gray-700">{expense.type}</Text>
                  <Text className="text-sm font-semibold text-gray-900">{formatKES(expense.amount)}</Text>
                </View>
                <ProgressBar progress={expense.percentage} colorClass="bg-amber-500" />
              </View>
            ))}
          </View>
        </View>

        {/* Farm Performance */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center mb-4">
            <Text className="text-lg font-semibold text-gray-900">Farm Performance</Text>
          </View>

          <View className="flex-row mb-3">
            <MetricCard 
              title="Total Farms" 
              value={farmStats.totalFarms} 
              textColor="text-green-600" 
              subtitle={`${farmStats.totalArea} acres total`} 
            />
            <MetricCard 
              title="Active Cycles" 
              value={farmStats.activeCropCycles} 
              textColor="text-orange-600" 
              subtitle={`${farmStats.completedCropCycles} completed`} 
            />
          </View>

          {farmStats.farms.map((farm, idx) => (
            <View key={idx} className="bg-white rounded-xl p-4 mb-3 shadow-md">
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-base font-semibold text-gray-900">{farm.name}</Text>
                  <Text className="text-xs text-gray-600 mt-0.5">{farm.size} {farm.unit}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-lg font-bold text-green-600">{formatKES(farm.revenue)}</Text>
                  <Text className="text-xs text-gray-600 mt-0.5">{farm.activeCrops} active crops</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Crop Cycle Analytics */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center mb-4">
            <Text className="text-lg font-semibold text-gray-900">Crop Performance</Text>
          </View>

          {cropCycleData.map((crop, idx) => (
            <View key={idx} className="bg-white rounded-xl p-4 mb-3 shadow-md">
              <View className="flex-row justify-between mb-4">
                <View className="flex-row items-center">
                  <View>
                    <Text className="text-base font-semibold text-gray-900">{crop.cropName}</Text>
                    <Text className="text-xs text-gray-600">{crop.cycles} cycles • {crop.avgGrowthDays} days avg</Text>
                  </View>
                </View>
                <View className={`px-2.5 py-1 rounded-xl ${
                  crop.status === "growing" ? "bg-yellow-100" : 
                  crop.status === "harvested" ? "bg-green-100" : "bg-red-100"
                }`}>
                  <Text className={`text-xs font-semibold capitalize ${
                    crop.status === "growing" ? "text-yellow-900" : 
                    crop.status === "harvested" ? "text-green-900" : "text-red-900"
                  }`}>{crop.status}</Text>
                </View>
              </View>

              <View className="flex-row justify-between mb-4">
                <View>
                  <Text className="text-xl font-bold text-green-600">{formatKES(crop.profit)}</Text>
                  <Text className="text-xs text-gray-600">Net Profit</Text>
                </View>
                <View>
                  <Text className="text-xl font-bold text-gray-900">{crop.profitMargin}%</Text>
                  <Text className="text-xs text-gray-600">Margin</Text>
                </View>
                <View>
                  <Text className="text-xl font-bold text-orange-600">{crop.successRate}%</Text>
                  <Text className="text-xs text-gray-600">Success Rate</Text>
                </View>
              </View>

              <View className="flex-row justify-between pt-3 border-t border-gray-200">
                <Text className="text-xs text-gray-600">
                  Revenue: <Text className="font-semibold text-green-600">{formatKES(crop.revenue)}</Text>
                </Text>
                <Text className="text-xs text-gray-600">
                  Expenses: <Text className="font-semibold text-red-600">{formatKES(crop.expenses)}</Text>
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tasks & Weather */}
        <View className="px-5 mb-6">
          <View className="flex-row mb-3">
            <View className="flex-1 mr-1.5">
              <View className="bg-white rounded-xl p-4 shadow-md">
                <Text className="text-sm font-semibold text-gray-900 mb-2">Tasks</Text>
                <Text className="text-2xl font-bold text-orange-600 mb-1">{taskStats.pending}</Text>
                <Text className="text-xs text-gray-600 mb-2">Pending</Text>
                <ProgressBar progress={taskStats.completionRate} colorClass="bg-green-600" />
                <Text className="text-xs text-gray-600 mt-1">{taskStats.completionRate}% completion rate</Text>
              </View>
            </View>
            <View className="flex-1 ml-1.5">
              <View className="bg-white rounded-xl p-4 shadow-md">
                <Text className="text-sm font-semibold text-gray-900 mb-2">Weather</Text>
                <Text className="text-2xl font-bold text-green-600 mb-1">{weatherData.avgTemp}°C</Text>
                <Text className="text-xs text-gray-600 mb-1">Avg Temperature</Text>
                <Text className="text-xs text-gray-600">{weatherData.totalRainfall}mm rainfall</Text>
                <Text className="text-xs text-gray-600">{weatherData.avgHumidity}% humidity</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyticsScreen;