import React, { useState, useRef } from 'react';
import { View, Image, FlatList, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function FarmHeaderCarousel({ images = [], handleImageUpload }) {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData = images && images.length > 0 
    ? images 
    : ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000"];

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View className="h-[400px] w-full  overflow-hidden bg-gray-900 shadow-2xl relative">
      
      {/* A. The Carousel */}
      <FlatList
        data={carouselData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item }) => (
          <View style={{ width: SCREEN_WIDTH, height: 400 }}>
             <Image 
                source={{ uri: item }} 
                className="w-full h-full"
                resizeMode="cover"
             />
             {/* Dark Overlay for text readability */}
             <View className="absolute inset-0 bg-black/30" />
          </View>
        )}
      />

      {/* B. Floating Header Controls (Back & Edit) */}
      <View className="absolute top-12 left-6 right-6 flex-row justify-between z-20">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white/90 h-10 w-10 rounded-2xl items-center justify-center shadow-lg"
        >
          <Feather name="arrow-left" size={20} color="#1A1C1B" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleImageUpload}
          className="bg-white/90 px-4 py-2 rounded-2xl flex-row items-center shadow-lg"
        >
          <Feather name="camera" size={16} color="#1A1C1B" />
          <Text className="text-[#1A1C1B] font-bold text-xs ml-2">
            Add / Edit
          </Text>
        </TouchableOpacity>
      </View>

      {/* C. Pagination Dots */}
      <View className="absolute bottom-10 w-full flex-row justify-center items-center gap-2 z-20">
        {carouselData.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full ${
              index === activeIndex ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </View>

    </View>
  );
}