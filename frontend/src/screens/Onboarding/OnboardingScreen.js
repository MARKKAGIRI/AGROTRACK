import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Animated } from "react-native";
import { useOnboarding } from "../../context/OnboardingContext";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import SlideThree from "./SlideThree";

const TOTAL_SLIDES = 3;

const OnboardingScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { completeOnboarding } = useOnboarding();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const isLast = currentSlide === TOTAL_SLIDES - 1;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(30);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentSlide]);

  const handleNext = async () => {
    if (!isLast) {
      setCurrentSlide(currentSlide + 1);
    } else {
      await completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const handleSkip = async () => {
    await completeOnboarding();
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 0: return <SlideOne />;
      case 1: return <SlideTwo />;
      case 2: return <SlideThree />;
      default: return <SlideOne />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9F9F6] py-7">
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F6" />

      <View className="flex-row justify-between items-center px-6 pt-4 pb-2 h-14">
        {currentSlide > 0 ? (
          <TouchableOpacity onPress={handleBack} hitSlop={15} className="w-10 h-10 justify-center">
            <Text className="text-[28px] text-[#0F172A] font-light">←</Text>
          </TouchableOpacity>
        ) : (
          <View className="w-10" />
        )}
        
        {currentSlide < TOTAL_SLIDES - 1 && (
          <TouchableOpacity onPress={handleSkip} hitSlop={15}>
            <Text className="text-[16px] font-bold text-[#11C459]">Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <Animated.View 
        style={{ 
          flex: 1, 
          opacity: fadeAnim, 
          transform: [{ translateY: slideAnim }] 
        }} 
        className="px-6 pt-4"
      >
        {renderSlide()}
      </Animated.View>

      <View className="flex-row justify-center items-center gap-x-2 py-6 mt-auto">
        {[...Array(TOTAL_SLIDES)].map((_, i) => (
          <View
            key={i}
            className={`h-2 rounded-full ${
              i === currentSlide ? "w-8 bg-[#11C459]" : "w-2 bg-[#D1F0D1]"
            }`}
          />
        ))}
      </View>

      <View className="px-6 pb-10 items-center w-full">
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.85}
          className="bg-[#11C459] rounded-full py-[18px] w-full items-center shadow-lg shadow-green-500/30"
        >
          <Text className="text-white text-[17px] font-bold tracking-wide">
            {isLast ? "Get Started →" : "Next →"}
          </Text>
        </TouchableOpacity>

        {isLast && (
          <TouchableOpacity onPress={handleSkip} className="mt-6 hitSlop={10}">
            <Text className="text-[15px] font-medium text-[#64748B]">I already have an account</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;