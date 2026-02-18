import React from 'react';
import { View, Text } from 'react-native';

const bars = [
  { month: "Mar", h: 40 },
  { month: "Apr", h: 50 },
  { month: "May", h: 45 },
  { month: "Jun", h: 60 },
  { month: "Jul", h: 80, best: true },
];

const SlideThree = () => {
  return (
    <View className="w-full">
      <View className="bg-white rounded-[24px] p-6 shadow-sm shadow-gray-200 mb-8 mt-4">
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center gap-x-3">
            <View className="w-10 h-10 rounded-full bg-[#E7F8E8] items-center justify-center">
              <Text className="text-lg">🌿</Text>
            </View>
            <View>
              <Text className="text-[17px] font-extrabold text-[#0F172A]">Yield History</Text>
              <Text className="text-[13px] text-[#64748B] mt-0.5">Past 6 months</Text>
            </View>
          </View>
          <View className="bg-[#E7F8E8] rounded-full px-3 py-1.5">
            <Text className="text-[12px] font-bold text-[#11C459]">↗ +15%</Text>
          </View>
        </View>

        <View className="h-[1px] bg-gray-100 mb-8" />

        <View className="flex-row justify-between items-end h-[100px] mb-6 relative">
          <View className="absolute top-[20%] w-full h-[1px] bg-gray-50" />
          <View className="absolute top-[60%] w-full h-[1px] bg-gray-50" />
          
          {bars.map((bar, index) => (
            <View key={index} className="items-center w-[15%]">
              {bar.best && (
                <View className="absolute -top-8 bg-[#0F172A] px-2 py-1 rounded-md items-center z-10">
                  <Text className="text-white text-[10px] font-bold">Best Yield</Text>
                  <View className="absolute -bottom-1 w-2 h-2 bg-[#0F172A] rotate-45" />
                </View>
              )}
              <View
                className={`w-full rounded-t-[6px] ${bar.best ? "bg-[#11C459]" : "bg-[#E7F8E8]"}`}
                style={{ height: bar.h }}
              />
              <Text className={`text-[12px] mt-2 ${bar.best ? "text-[#11C459] font-extrabold" : "text-[#94A3B8] font-medium"}`}>
                {bar.month}
              </Text>
            </View>
          ))}
        </View>

        <View className="h-[1px] bg-gray-100 mb-5" />

        <View className="flex-row justify-between">
          <View>
            <Text className="text-[13px] text-[#64748B] mb-1 font-medium">Total Harvest</Text>
            <Text className="text-[18px] font-extrabold text-[#0F172A]">1,240 Tons</Text>
          </View>
          <View className="items-end">
            <Text className="text-[13px] text-[#64748B] mb-1 font-medium">Efficiency</Text>
            <Text className="text-[18px] font-extrabold text-[#11C459]">94.2%</Text>
          </View>
        </View>
      </View>

      <View className="items-center px-2">
        <Text className="text-[36px] font-extrabold text-[#0F172A] text-center leading-[42px] tracking-tight">
          Make Better{'\n'}Farming Decisions
        </Text>
        <Text className="text-[15px] text-[#64748B] text-center mt-4 leading-6 px-4">
          View progress, analyze farm data, and improve yield season after season.
        </Text>
      </View>
    </View>
  );
};

export default SlideThree;