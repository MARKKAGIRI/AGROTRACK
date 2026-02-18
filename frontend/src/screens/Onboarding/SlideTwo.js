import React from 'react';
import { View, Text, Image } from 'react-native';

const SlideTwo = () => {
  return (
    <View className="w-full">
      <View className="gap-y-4 mb-8">
        <View className="bg-white rounded-[24px] p-5 shadow-sm shadow-gray-200">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[17px] font-extrabold text-[#0F172A]">Today's Tasks</Text>
            <View className="bg-[#E7F8E8] rounded-full px-3 py-1">
              <Text className="text-[12px] font-bold text-[#11C459]">3 Active</Text>
            </View>
          </View>
          
          <View className="h-[1px] bg-gray-100 mb-4" />

          <View className="flex-row items-start gap-x-3 mb-4">
            <View className="w-5 h-5 rounded-[6px] bg-[#11C459] items-center justify-center mt-0.5">
              <Text className="text-white text-[10px] font-bold">✓</Text>
            </View>
            <View>
              <Text className="text-[14px] text-[#94A3B8] line-through font-medium">Morning Irrigation</Text>
              <Text className="text-[12px] text-[#94A3B8] mt-0.5">Completed at 06:00 AM</Text>
            </View>
          </View>

          <View className="flex-row items-start gap-x-3 mb-4">
            <View className="w-5 h-5 rounded-[6px] border-[1.5px] border-gray-300 mt-0.5 bg-white" />
            <View>
              <Text className="text-[14px] font-bold text-[#0F172A]">Soil PH Test - Sector B</Text>
              <Text className="text-[12px] font-bold text-[#F59E0B] mt-0.5">Due Today • High Priority</Text>
            </View>
          </View>

          <View className="flex-row items-start gap-x-3">
            <View className="w-5 h-5 rounded-[6px] border-[1.5px] border-gray-300 mt-0.5 bg-white" />
            <View>
              <Text className="text-[14px] font-bold text-[#0F172A]">Harvest Wheat</Text>
              <Text className="text-[12px] text-[#94A3B8] mt-0.5">Pending Review</Text>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-[24px] p-4 shadow-sm shadow-gray-200 flex-row items-center gap-x-4">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=200&auto=format&fit=crop' }} 
            className="w-16 h-16 rounded-[16px]" 
          />
          <View className="flex-1">
            <Text className="text-[15px] font-extrabold text-[#0F172A]">Plot 4 - Corn</Text>
            <Text className="text-[13px] text-[#64748B] mt-1 leading-5">
              Moisture level low. Irrigation recommended.
            </Text>
          </View>
          <View className="w-8 h-8 items-center justify-center">
            <Text className="text-2xl">💧</Text>
          </View>
        </View>
      </View>

      <View className="items-center px-2">
        <Text className="text-[36px] font-extrabold text-[#0F172A] text-center leading-[42px] tracking-tight">
          Stay On Top of{'\n'}Every Task
        </Text>
        <Text className="text-[15px] text-[#64748B] text-center mt-4 leading-6 px-4">
          Plan, track, and complete farm activities without missing a step.
        </Text>
      </View>
    </View>
  );
};

export default SlideTwo;