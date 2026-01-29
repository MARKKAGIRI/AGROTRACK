import React, { use } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// --- 1. Define Helper Components FIRST to avoid errors ---

const WeatherStat = ({ label, value, icon }) => (
  <View className="items-center flex-1">
    <Feather name={icon} size={18} color="#2E7D32" />
    <Text className="font-bold text-[#1A1C1B] text-sm mt-2">{value}</Text>
    <Text className="text-gray-400 text-[10px] mt-0.5 uppercase tracking-wide">{label}</Text>
  </View>
);

const SectionHeader = ({ title, action }) => (
  <View className="flex-row justify-between items-center mb-4">
    <Text className="text-xl font-bold text-[#1A1C1B]">{title}</Text>
    <TouchableOpacity>
      <Text className="text-[#2E7D32] font-semibold text-sm">{action}</Text>
    </TouchableOpacity>
  </View>
);

const FieldCard = ({ name, size, status, isAlert, image }) => (
  <TouchableOpacity className="mr-4 w-40" activeOpacity={0.8}>
    <View className="rounded-3xl overflow-hidden h-48 bg-gray-100 shadow-sm border border-gray-100 relative">
      {/* Added fallback image source to prevent crashes if uri is missing */}
      <ImageBackground 
        source={{ uri: image || 'https://via.placeholder.com/150' }} 
        className="w-full h-full" 
        resizeMode="cover"
      >
        <View className="absolute inset-0 bg-black/10" /> 
        
        {/* Status Badge */}
        <View className={`absolute top-3 left-3 px-2 py-1 rounded-lg ${isAlert ? 'bg-white' : 'bg-white/90'}`}>
          <Text className={`text-[10px] font-bold ${isAlert ? 'text-red-600' : 'text-green-700'}`}>
            {status}
          </Text>
        </View>
      </ImageBackground>
    </View>
    
    <View className="mt-3 px-1">
      <Text className="font-bold text-[#1A1C1B] text-base">{name}</Text>
      <Text className="text-gray-500 text-xs">{size}</Text>
    </View>
  </TouchableOpacity>
);

const TaskItem = ({ title, time, completed, isUrgent }) => (
  <TouchableOpacity className="p-4 flex-row items-center justify-between">
    <View className="flex-row items-center flex-1">
      <View className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${completed ? 'bg-[#2E7D32] border-[#2E7D32]' : 'border-gray-300'}`}>
        {completed && <Feather name="check" size={14} color="white" />}
      </View>
      
      <View>
        <Text className={`font-semibold text-sm ${completed ? 'text-gray-400 line-through' : 'text-[#1A1C1B]'}`}>{title}</Text>
        <Text className="text-gray-400 text-xs mt-0.5 flex-row items-center">
          <Feather name="clock" size={10} /> {time}
        </Text>
      </View>
    </View>

    {isUrgent && (
      <View className="bg-red-50 px-2 py-1 rounded-md">
        <Text className="text-red-600 text-[10px] font-bold">URGENT</Text>
      </View>
    )}
  </TouchableOpacity>
);

// --- 2. Main Component ---

const Home = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-[#FDFDFD]">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="flex-row justify-between items-center mt-4 mb-6">
          <View className="flex-row items-center bg-[#F3F5F4] px-4 py-2 rounded-full border border-gray-100">
            <Feather name="map-pin" size={14} color="#2E7D32" />
            <Text className="ml-2 text-[#1A1C1B] font-semibold text-xs">Nairobi, Kenya</Text>
          </View>
          <TouchableOpacity className="relative p-2 bg-white rounded-full border border-gray-100 shadow-sm">
            <Feather name="bell" size={20} color="#1A1C1B" />
            <View className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </TouchableOpacity>
        </View>

        {/* Weather */}
        <View className="items-center mb-8">
            <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/869/869869.png' }} 
                className="w-28 h-28 mb-2"
                resizeMode="contain"
            />
            <Text className="text-5xl font-bold text-[#1A1C1B]">24°</Text>
            <Text className="text-gray-500 mt-1 font-medium">Partly sunny today</Text>
            
            <View className="flex-row justify-between w-full bg-white mt-6 p-5 rounded-3xl border border-[#F0F2F1] shadow-sm">
                <WeatherStat label="Humidity" value="77%" icon="droplet" />
                <View className="w-[1px] h-full bg-gray-100" />
                <WeatherStat label="Precipitation" value="< 0.1 in" icon="cloud-rain" />
                <View className="w-[1px] h-full bg-gray-100" />
                <WeatherStat label="Wind" value="6 mph" icon="wind" />
            </View>
        </View>

        {/* AI Banner */}
        <TouchableOpacity 
        className="bg-[#2E7D32] flex-row items-center justify-between p-5 rounded-3xl mb-8 shadow-lg shadow-green-200"
        onPress={() => navigation.navigate('Chatbot')}
        >
            <View className="flex-row items-center flex-1 pr-4">
                <View className="bg-white/20 p-3 rounded-full">
                    <Ionicons name="sparkles" size={20} color="white" /> 
                </View>
                <View className="ml-3">
                    <Text className="text-white font-bold text-base">AgroTrack AI</Text>
                    <Text className="text-green-100 text-xs mt-0.5">Check recommendations for your fields</Text>
                </View>
            </View>
            <Feather name="arrow-right" size={20} color="white" />
        </TouchableOpacity>

        {/* My Fields */}
        <SectionHeader title="My Fields" action="See All" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-8 -mx-5 px-5">
            <FieldCard 
                name="Tomatoes" 
                size="1.2 Ha" 
                status="Good" 
                image="https://images.unsplash.com/photo-1592419044706-39796d40f98c"
            />
            <FieldCard 
                name="Lettuce" 
                size="1.6 Ha" 
                status="Need Water" 
                isAlert 
                image="https://images.unsplash.com/photo-1500382017468-9049fed747ef"
            />
            <FieldCard 
                name="Maize" 
                size="3.0 Ha" 
                status="Good" 
                image="https://images.unsplash.com/photo-1625246333195-092996d93616"
            />
        </ScrollView>

        {/* Tasks */}
        <SectionHeader title="Tasks To Do" action="View Calendar" />
        <View className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
            <TaskItem title="Watering Block A" time="09:00 AM" completed={true} />
            <View className="h-[1px] bg-gray-50 mx-4" />
            <TaskItem title="Apply Fertilizer" time="11:30 AM" completed={false} isUrgent />
            <View className="h-[1px] bg-gray-50 mx-4" />
            <TaskItem title="Scout for Pests" time="02:00 PM" completed={false} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;