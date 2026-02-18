import React from 'react';
import { View, Image, Text } from 'react-native';

const SlideOne = () => {
  return (
    <View className="w-full">
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=800&auto=format&fit=crop' }}
        className="w-full h-[340px] rounded-[32px] mb-8"
        resizeMode="cover"
      />
      <View className="items-center px-2">
        <Text className="text-[36px] font-extrabold text-[#0F172A] text-center leading-[42px] tracking-tight">
          Track Your Farm.
        </Text>
        <Text className="text-[36px] font-extrabold text-[#11C459] text-center leading-[42px] tracking-tight">
          Grow With{'\n'}Confidence.
        </Text>
        <Text className="text-[15px] text-[#64748B] text-center mt-4 leading-6 px-4">
          Manage crops, monitor tasks, and increase productivity — all in one place.
        </Text>
      </View>
    </View>
  );
};

export default SlideOne;