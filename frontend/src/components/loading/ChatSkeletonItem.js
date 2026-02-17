import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

const ChatSkeletonItem = () => {
  // Animation Value
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Loop the animation (Breathing effect)
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View className="flex-row items-center bg-white px-4 py-4 mb-0.5">
      {/* Avatar Skeleton */}
      <Animated.View 
        className="w-14 h-14 rounded-full bg-gray-200 mr-3" 
        style={{ opacity }} 
      />

      <View className="flex-1 mr-2">
        <View className="flex-row justify-between items-center mb-2">
          {/* Title Skeleton */}
          <Animated.View 
            className="h-4 w-32 bg-gray-200 rounded" 
            style={{ opacity }} 
          />
          {/* Time Skeleton */}
          <Animated.View 
            className="h-3 w-10 bg-gray-200 rounded" 
            style={{ opacity }} 
          />
        </View>
        
        {/* Message Line 1 */}
        <Animated.View 
          className="h-3 w-full bg-gray-200 rounded mb-1.5" 
          style={{ opacity }} 
        />
        {/* Message Line 2 (Shorter) */}
        <Animated.View 
          className="h-3 w-2/3 bg-gray-200 rounded" 
          style={{ opacity }} 
        />
      </View>
    </View>
  );
};

export default ChatSkeletonItem;