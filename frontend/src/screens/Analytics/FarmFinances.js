import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const FarmFinancesScreen = () => {
  const [activeTab, setActiveTab] = useState('All');

  // Sample data - replace with actual data from your backend
  const financialData = {
    totalRevenue: 84500,
    revenueChange: 12,
    totalExpenses: 52300,
    expensesChange: 5,
    netProfit: 32200,
    profitMargin: 38,
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [12000, 15000, 18000, 22000, 25000, 28000], // Revenue
        color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`, // Green
      },
      {
        data: [8000, 9500, 11000, 13000, 14000, 16000], // Expenses
        color: (opacity = 1) => `rgba(198, 40, 40, ${opacity})`, // Red
      },
    ],
  };

  const recentEntries = [
    { id: 1, type: 'revenue', label: 'Maize sale', date: '15 Mar 2025', amount: 12500 },
    { id: 2, type: 'revenue', label: 'Milk sales', date: '12 Mar 2025', amount: 8300 },
    { id: 3, type: 'expense', label: 'Fertilizer bags', date: '10 Mar 2025', amount: -4500 },
    { id: 4, type: 'expense', label: 'Casual labour', date: '8 Mar 2025', amount: -3200 },
    { id: 5, type: 'expense', label: 'Transport', date: '5 Mar 2025', amount: -1800 },
  ];

  const filteredEntries = activeTab === 'All'
    ? recentEntries
    : recentEntries.filter(entry => entry.type === activeTab.toLowerCase());

  const formatCurrency = (amount) => {
    return `KSh ${Math.abs(amount).toLocaleString()}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 bg-white">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
            <View>
              <Text className="text-lg font-semibold text-gray-900">Mark Kagiri</Text>
              <Text className="text-sm text-gray-500">Farm Finances · Season 2025</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Summary Cards */}
        <View className="flex-row px-6 py-4">
          <View className="flex-1 bg-white rounded-2xl p-4 mr-2 shadow-sm">
            <Text className="text-sm text-gray-500 mb-1">Total Revenue</Text>
            <Text className="text-xl font-bold text-green-600">
              {formatCurrency(financialData.totalRevenue)}
            </Text>
            <Text className="text-sm text-green-500">↑{financialData.revenueChange}%</Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-4 ml-2 shadow-sm">
            <Text className="text-sm text-gray-500 mb-1">Total Expenses</Text>
            <Text className="text-xl font-bold text-red-600">
              {formatCurrency(financialData.totalExpenses)}
            </Text>
            <Text className="text-sm text-red-500">↑{financialData.expensesChange}%</Text>
          </View>
        </View>

        {/* Net Profit Banner */}
        <View className="mx-6 mb-4 bg-green-800 rounded-2xl p-4 shadow-sm">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white text-lg font-semibold">Net Profit</Text>
              <Text className="text-white text-2xl font-bold">
                {formatCurrency(financialData.netProfit)}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-lime-300 text-sm">Profit margin</Text>
              <Text className="text-lime-300 text-xl font-bold">
                {financialData.profitMargin}%
              </Text>
            </View>
          </View>
        </View>

        {/* Financial Cashflow Chart */}
        <View className="mx-6 mb-4 bg-white rounded-2xl p-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xs text-gray-500 uppercase font-semibold">
              Financial Cashflow
            </Text>
            <TouchableOpacity>
              <Text className="text-green-600 text-sm font-medium">View Full Details →</Text>
            </TouchableOpacity>
          </View>

          <BarChart
            data={chartData}
            width={width - 48}
            height={200}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForLabels: {
                fontSize: 12,
              },
            }}
            showBarTops={false}
            fromZero
            withInnerLines={false}
          />

          {/* Legend */}
          <View className="flex-row justify-center mt-4">
            <View className="flex-row items-center mr-6">
              <View className="w-3 h-3 bg-green-600 rounded mr-2" />
              <Text className="text-xs text-gray-600">Revenue</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-3 h-3 bg-red-500 rounded mr-2" />
              <Text className="text-xs text-gray-600">Expenses</Text>
            </View>
          </View>
        </View>

        {/* Recent Entries */}
        <View className="mx-6 mb-4 bg-white rounded-2xl p-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Recent Entries</Text>

          {/* Filter Tabs */}
          <View className="flex-row mb-4">
            {['All', 'Revenue', 'Expenses'].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full mr-2 ${
                  activeTab === tab ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    activeTab === tab ? 'text-green-700' : 'text-gray-600'
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Entries List */}
          {filteredEntries.map((entry) => (
            <View key={entry.id} className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-row items-center">
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
                    entry.type === 'revenue' ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  <MaterialCommunityIcons
                    name={entry.type === 'revenue' ? 'trending-up' : 'trending-down'}
                    size={16}
                    color={entry.type === 'revenue' ? '#16a34a' : '#dc2626'}
                  />
                </View>
                <View>
                  <Text className="text-sm font-medium text-gray-900">{entry.label}</Text>
                  <Text className="text-xs text-gray-500">{entry.date}</Text>
                </View>
              </View>
              <Text
                className={`text-sm font-semibold ${
                  entry.type === 'revenue' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {entry.amount > 0 ? '+' : ''}{formatCurrency(entry.amount)}
              </Text>
            </View>
          ))}

          {/* Add New Entry Button */}
          <TouchableOpacity className="mt-4 border-2 border-green-200 rounded-xl py-3 items-center">
            <Text className="text-green-700 font-medium">+ Add new entry</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="flex-row bg-white border-t border-gray-200 px-6 py-2">
        <TouchableOpacity className="flex-1 items-center py-2">
          <Ionicons name="home-outline" size={24} color="#888" />
          <Text className="text-xs text-gray-500 mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center py-2">
          <MaterialCommunityIcons name="tractor" size={24} color="#2e7d32" />
          <Text className="text-xs text-green-700 mt-1 font-medium">Farms</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center py-2">
          <Ionicons name="person-outline" size={24} color="#888" />
          <Text className="text-xs text-gray-500 mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FarmFinancesScreen;