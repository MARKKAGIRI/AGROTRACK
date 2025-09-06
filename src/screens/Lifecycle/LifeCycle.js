import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import PlantCard from "../../components/PlantCard";
import { plants } from "../../services/CropData";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const LifeCycle = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-3">
      <FlatList
        data={plants}
        renderItem={({ item }) => <PlantCard plant={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="flex-row mb-6">
            <Ionicons name="calendar-sharp" size={24} color="green"></Ionicons>
            <Text className="text-green-800 font-bold text-2xl ml-3">LifeCycle Management</Text>
          </View>
        }
        ListFooterComponent={
          <Pressable
            // onPress={}
            className="bg-green-600 p-3 rounded-xl mt-6"
            android_ripple={{ color: (255, 255, 255, 0.3) }}
          >
            {({ pressed }) => (
              <Text
                className={`text-center text-white text-lg ${pressed ? "opacity-50" : ""}`}
              >
                + Add New Lifecycle Group
              </Text>
            )}
          </Pressable>
        }
      />
    </SafeAreaView>
  );
};

export default LifeCycle;
