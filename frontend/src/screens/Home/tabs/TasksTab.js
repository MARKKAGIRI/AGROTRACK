import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function TasksTab() {
  return (
    <View>
      {/* Progress & Upcoming Task Row */}
      <View className="flex-row mb-6">
        {/* Percentage Circle */}
        <View className="bg-white border border-gray-100 p-4 rounded-2xl w-[35%] items-center justify-center mr-3 shadow-sm">
            <View className="w-16 h-16 rounded-full border-4 border-[#E8F5E9] items-center justify-center relative">
                <View className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-l-4 border-[#2E7D32] transform rotate-45" />
                <Text className="text-lg font-bold text-gray-800">80%</Text>
            </View>
            <Text className="text-xs text-gray-400 text-center mt-2">Tasks Completed</Text>
        </View>

        {/* Upcoming Task Card */}
        <View className="flex-1 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm justify-between">
            <View className="flex-row justify-between items-start">
                <Text className="text-[#2E7D32] text-xs font-semibold">Upcoming task</Text>
                <View className="bg-gray-100 px-2 py-1 rounded-md">
                    <Text className="text-[10px] font-bold text-gray-600">Today, 12:00</Text>
                </View>
            </View>
            <Text className="text-gray-800 font-medium text-sm mt-2" numberOfLines={2}>
                Setting up irrigation systems such as drip lines or sprinklers.
            </Text>
        </View>
      </View>

      {/* View All Button */}
      <TouchableOpacity className="w-full py-4 border border-gray-100 rounded-2xl flex-row justify-center items-center mb-8 shadow-sm bg-white">
        <Text className="font-bold text-[#1A1C1B] mr-2">View All Task</Text>
        <Feather name="chevron-right" size={16} color="black" />
      </TouchableOpacity>

      {/* Month Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-[#1A1C1B]">March</Text>
        <Feather name="search" size={20} color="black" />
      </View>

      {/* Calendar Strip */}
      <View className="flex-row justify-between mb-6">
        {[
            { day: 'Sun', date: '17' },
            { day: 'Mon', date: '18' },
            { day: 'Tue', date: '19', active: true },
            { day: 'Wed', date: '20' },
            { day: 'Thu', date: '21' },
        ].map((item, index) => (
            <View key={index} className="items-center">
                <Text className="text-gray-400 text-xs mb-1">{item.day}</Text>
                <View className={`h-8 w-8 rounded-full items-center justify-center ${item.active ? 'bg-[#2E7D32]' : 'bg-transparent'}`}>
                    <Text className={`font-bold ${item.active ? 'text-white' : 'text-[#1A1C1B]'}`}>{item.date}</Text>
                </View>
            </View>
        ))}
      </View>

      {/* Timeline Items */}
      <View className="pl-10 border-l border-dashed border-gray-200 ml-4 relative">
        <TimelineItem time="11:00" title="Sowing seeds or transplanting seedlings according to crop rotation." isChecked={false} />
        <TimelineItem time="11:45" title="Sowing seeds or transplanting seedlings according to crop rotation." isChecked={true} isActive />
        <TimelineItem time="13:00" title="Setting up irrigation systems such as drip lines or sprinklers." isChecked={false} />
      </View>

      {/* Manage Task Button */}
      <TouchableOpacity className="mt-6 bg-white border border-gray-200 py-4 rounded-2xl items-center shadow-sm">
        <Text className="font-bold text-[#1A1C1B]">Manage Task</Text>
      </TouchableOpacity>

       {/* Spacer for bottom button */}
       <View className="h-20" />
    </View>
  );
}

const TimelineItem = ({ time, title, isChecked, isActive }) => (
    <View className="mb-6 relative pl-6">
        <View className={`absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full ${isActive ? 'bg-[#2E7D32]' : 'bg-gray-300'}`} />
        <Text className="absolute -left-16 top-0 text-xs text-gray-400 font-medium">{time}</Text>
        <View className={`p-4 rounded-xl ${isActive ? 'bg-[#E8F5E9]/50 border-l-2 border-[#2E7D32]' : 'bg-[#F9FAFB]'}`}>
            <View className="flex-row justify-between items-start">
                <Text className={`text-xs flex-1 mr-2 ${isActive ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>{title}</Text>
                {isChecked ? (
                    <View className="bg-[#2E7D32] rounded-md p-1"><Feather name="check" size={12} color="white" /></View>
                ) : (
                    <View className="border border-gray-300 rounded-md w-5 h-5 bg-white" />
                )}
            </View>
        </View>
    </View>
);