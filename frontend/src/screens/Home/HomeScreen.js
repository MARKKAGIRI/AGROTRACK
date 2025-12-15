import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../context/AuthContext";

import { AnimatedTaskTicker } from "../../components/AnimatedTaskTicker";

const Home = () => {
  const navigation = useNavigation();

  const { user, token } = useAuth();

  const dailyTasks = [
    { id: "1", title: "Irrigate tomatoes", time: "4:00 PM" },

    { id: "2", title: "Check greenhouse temperature", time: "10:00 AM" },

    { id: "3", title: "Apply nitrogen fertilizer", crop: "Maize" }
  ];

  const cropTasks = [
    { id: "a", title: "Apply nitrogen fertilizer", crop: "Maize" },

    { id: "b", title: "Scout for aphids", crop: "Tomatoes" },
  ];

  // console.log(token, user)

  return (
    <SafeAreaView className="flex-1 bg-[#F6FAF7]">
      <ScrollView contentContainerClassName="p-2.5 bg-[#F6FAF7] items-center">
        {/* Greeting & Next Task Card */}

        <View className="bg-[#e8f5e9] p-5 rounded-3xl shadow-sm mb-4 w-full">
          {/* Greeting */}

          <Text className="text-lg font-bold text-[#2e7d32]">
            Hello, {token ? user.name : "Farmer"} 
          </Text>

          <Text className="text-sm text-gray-600 mt-1">
            Here’s what needs your attention today
          </Text>

          {/* Daily Tasks */}

          <View className="mt-4 bg-white rounded-2xl p-4 border border-green-100">
            <Text className="text-xs font-bold text-green-700 mb-2 uppercase">
              Today’s Focus
            </Text>

            <AnimatedTaskTicker
              tasks={dailyTasks}
              icon="calendar-outline"
              accentColor="#388e3c"
            />
          </View>
        </View>

        {/* Farm Stats Card */}

        <View className="bg-[#fffde7] p-4 rounded-2xl w-full mb-4 shadow-sm">
          <Text className="text-lg font-semibold mb-3 text-[#fbc02d]">
            Farm Stats
          </Text>

          <View className="flex-row justify-between mb-3">
            <View className="bg-white rounded-xl py-3.5 px-2.5 items-center w-[48%] shadow-sm">
              <Icon name="sprout" size={28} color="#388e3c" />

              <Text className="text-sm text-[#666] mt-1.5 mb-0.5 text-center">
                Crops Planted
              </Text>

              <Text className="text-[17px] font-bold text-[#222] mt-0.5 text-center">
                120
              </Text>
            </View>

            <View className="bg-white rounded-xl py-3.5 px-2.5 items-center w-[48%] shadow-sm">
              <Icon name="basket" size={28} color="#fbc02d" />

              <Text className="text-sm text-[#666] mt-1.5 mb-0.5 text-center">
                Harvest Ready
              </Text>

              <Text className="text-[17px] font-bold text-[#222] mt-0.5 text-center">
                30
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between mb-3">
            <View className="bg-white rounded-xl py-3.5 px-2.5 items-center w-[48%] shadow-sm">
              <Icon name="cow" size={28} color="#795548" />

              <Text className="text-sm text-[#666] mt-1.5 mb-0.5 text-center">
                Livestock
              </Text>

              <Text className="text-[17px] font-bold text-[#222] mt-0.5 text-center">
                15
              </Text>
            </View>

            <View className="bg-white rounded-xl py-3.5 px-2.5 items-center w-[48%] shadow-sm">
              <Icon name="water" size={28} color="#039be5" />

              <Text className="text-sm text-[#666] mt-1.5 mb-0.5 text-center">
                Irrigation Level
              </Text>

              <Text className="text-[17px] font-bold text-[#222] mt-0.5 text-center">
                Optimal
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions Label */}

        <Text className="text-lg font-bold text-[#388e3c] mb-2 self-start">
          Quick Actions
        </Text>

        {/* Quick Actions */}

        <View className="w-full mt-2 mb-6">
          <View className="flex-row justify-between mb-4">
            <TouchableOpacity
              className="bg-white items-center justify-center py-4 px-4 rounded-2xl w-[48%] shadow-md"
              onPress={() => navigation.navigate("Analytics")}
            >
              <Icon name="chart-line" size={32} color="#388e3c" />

              <Text className="mt-2 text-[15px] font-semibold text-[#388e3c] text-center">
                Analytics
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white items-center justify-center py-4 px-4 rounded-2xl w-[48%] shadow-md"
              onPress={() => navigation.navigate("Tasks")}
            >
              <Icon name="clipboard-list" size={32} color="#388e3c" />

              <Text className="mt-2 text-[15px] font-semibold text-[#388e3c] text-center">
                View Tasks
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between mb-4">
            <TouchableOpacity
              className="bg-white items-center justify-center py-4 px-4 rounded-2xl w-[48%] shadow-md"
              onPress={() => navigation.navigate("Weather")}
            >
              <Icon name="weather-partly-cloudy" size={32} color="#388e3c" />

              <Text className="mt-2 text-[15px] font-semibold text-[#388e3c] text-center">
                Weather
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white items-center justify-center py-4 px-4 rounded-2xl w-[48%] shadow-md">
              <Icon name="calendar-clock" size={32} color="#388e3c" />

              <Text className="mt-2 text-[15px] font-semibold text-[#388e3c] text-center">
                Schedule Task
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating Chatbot Button */}

      <TouchableOpacity
        className="absolute bottom-6 right-6 w-16 h-16 rounded-full items-center justify-center"
        style={{
          backgroundColor: "rgba(56, 142, 60, 0.65)",

          borderWidth: 1,

          borderColor: "rgba(255, 255, 255, 0.2)",

          shadowColor: "#000",

          shadowOpacity: 0.2,

          shadowRadius: 6,

          elevation: 8,
        }}
        onPress={() => navigation.navigate("Chatbot")}
        activeOpacity={0.9}
      >
        <Icon name="robot" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
