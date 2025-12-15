import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function AnimatedTaskTicker({ tasks, icon, accentColor }) {
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Safety check
    if (!tasks || tasks.length === 0) return;

    // 1. Reset values immediately for the new item entry
    translateY.setValue(20);
    opacity.setValue(0);

    // 2. Define the animation sequence (Enter -> Wait -> Exit)
    const animation = Animated.sequence([
      // Enter Animation
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Stay visible for 4 seconds
      Animated.delay(4000),
      // Exit Animation
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -20,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]);

    // 3. Start the animation
    animation.start(({ finished }) => {
      // Only switch to the next task if the animation finished naturally
      // (This prevents state updates if the component unmounts mid-animation)
      if (finished) {
        setIndex((prev) => (prev + 1) % tasks.length);
      }
    });

    // Cleanup: Stop the animation if the component unmounts or tasks change
    return () => animation.stop();

  }, [index, tasks]); // Re-run effect whenever index updates

  if (!tasks || !tasks.length) {
    return (
      <Text className="text-gray-400 text-sm">
        No tasks scheduled
      </Text>
    );
  }

  const task = tasks[index];

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        opacity,
      }}
      // Added 'w-full' so the container doesn't shrink
      className="flex-row items-center w-full h-6" 
    >
      <Ionicons name={icon} size={20} color={accentColor} />
      
      <Text 
        // Added numberOfLines to cut off very long text
        numberOfLines={1} 
        ellipsizeMode="tail"
        // Added 'flex-1' so it takes up all width regardless of text length
        className="ml-2 text-[15px] font-semibold text-gray-800 flex-1"
      >
        {task.title}
        {task.time && (
          <Text className="text-gray-500 font-normal">
            {' '}• {task.time}
          </Text>
        )}
        {task.crop && (
          <Text className="text-gray-500 font-normal">
            {' '}({task.crop})
          </Text>
        )}
      </Text>
    </Animated.View>
  );
}