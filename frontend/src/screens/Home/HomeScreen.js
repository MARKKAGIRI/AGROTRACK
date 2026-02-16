import React, { useState, useEffect, useCallback, useRef } from "react";import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import SectionHeader from "../../components/SectionHeader";
import WeatherCard from "../../components/weatherCard";
import NewsSection from "../../components/NewsSection";
import { useTransactionsHook } from "../../hooks/useTransactions";


// Import your API services
import { getAllFarms } from "../../services/farmApi";
import { getAllTasks } from "../../services/taskService";

// --- 1. Helper Components (Kept exactly the same) ---

const FarmCard = ({
  farmName,
  size,
  task,
  isAlert,
  moisture,
  temperature,
  image,
}) => (
  <TouchableOpacity className="mr-8 w-72" activeOpacity={0.8}>
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-300">
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <Text
            className="text-[#1A1C1B] font-bold text-lg leading-tight"
            numberOfLines={1}
          >
            {farmName}
          </Text>
          <Text className="text-gray-500 text-xs">{size} • Managed Area</Text>
        </View>

        <Image
          source={{ uri: image }}
          className="w-12 h-12 rounded-xl bg-gray-100 ml-2"
          resizeMode="cover"
        />
      </View>

      <View className="flex-row justify-between bg-gray-50 rounded-2xl p-3 mb-4 border border-gray-100">
        <View>
          <Text className="text-[9px] text-gray-400 uppercase font-bold">
            Soil Moisture
          </Text>
          <Text
            className={`text-sm font-bold ${moisture < 30 ? "text-amber-600" : "text-blue-600"}`}
          >
            {moisture}%
          </Text>
        </View>
        <View className="w-[1px] h-6 bg-gray-200 self-center" />
        <View>
          <Text className="text-[9px] text-gray-400 uppercase font-bold">
            Ambient Temp
          </Text>
          <Text className="text-sm font-bold text-gray-800">
            {temperature}°C
          </Text>
        </View>
      </View>

      <View className="pt-1">
        <Text className="text-[9px] text-gray-400 uppercase font-bold mb-1">
          Active Task
        </Text>
        <View className="flex-row items-center">
          <View
            className={`w-2 h-2 rounded-full mr-2 ${isAlert ? "bg-red-500" : "bg-green-500"}`}
          />
          <Text
            className={`text-sm font-bold flex-1 ${isAlert ? "text-red-600" : "text-gray-700"}`}
            numberOfLines={1}
          >
            {task}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const TaskItem = ({ title, farmName, time, completed, isUrgent, category }) => (
  <TouchableOpacity
    className={`p-4 mx-4 mb-3 flex-row items-center rounded-2xl border ${completed ? "bg-gray-50 border-transparent" : "bg-white border-gray-100 shadow-sm"}`}
    activeOpacity={0.7}
  >
    <View
      className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
        completed ? "bg-emerald-100" : isUrgent ? "bg-rose-100" : "bg-blue-50"
      }`}
    >
      {completed ? (
        <Feather name="check" size={18} color="#059669" />
      ) : (
        <Feather
          name={category === "Irrigation" ? "droplet" : "activity"}
          size={18}
          color={isUrgent ? "#e11d48" : "#2563eb"}
        />
      )}
    </View>

    <View className="flex-1">
      <View className="flex-row items-center mb-1">
        <Text
          className={`font-bold text-base ${completed ? "text-gray-400 line-through" : "text-gray-900"}`}
        >
          {title}
        </Text>
        {isUrgent && !completed && (
          <View className="ml-2 bg-rose-600 px-1.5 py-0.5 rounded shadow-sm">
            <Text className="text-white text-[8px] font-black uppercase">
              Urgent
            </Text>
          </View>
        )}
      </View>

      <View className="flex-row items-center">
        <View className="bg-gray-200 px-2 py-0.5 rounded-md mr-2">
          <Text className="text-[10px] font-bold text-gray-600 uppercase">
            {farmName}
          </Text>
        </View>
        <Text className="text-gray-400 text-[11px] font-medium">
          <Feather name="clock" size={10} /> {time}
        </Text>
      </View>
    </View>

    {!completed && (
      <View className="w-6 h-6 rounded-full border-2 border-gray-200" />
    )}
  </TouchableOpacity>
);

// --- 2. Main Component with Real Data ---

const Home = () => {

  const { transactions } = useTransactionsHook();

  const totals = transactions.reduce(
  (acc, item) => {
    if (item.type === "Revenue") {
      acc.revenue += item.amount;
    } else if (item.type === "Expense") {
      acc.expense += item.amount;
    }
    return acc;
  },
  { revenue: 0, expense: 0 }
);

  const { user, token } = useAuth();
  const navigation = useNavigation();

  // State for Real Data
  const [farms, setFarms] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  // Stats State
  const [stats, setStats] = useState({
    farmCount: 0,
    fieldCount: 0, // In your schema, fields might be CropCycles
  });

  // header animation logic
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = 90;

  const clampedScroll = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolateLeft: 'clamp',
  });

  const diffClamp = Animated.diffClamp(clampedScroll, 0, headerHeight);

  const translateY = diffClamp.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
  });


  const fetchData = async () => {
    try {
      if (!token) {
      console.log("Skipping fetch: No token available yet.");
      return;
    }
      // Fetch both in parallel for speed
      const [farmsResponse, tasksResponse] = await Promise.all([
        getAllFarms(token),
        getAllTasks(token),
      ]);

      if (farmsResponse.success) {
        const farmsData = farmsResponse.farms;
        setFarms(farmsData);

        const totalFarms = farmsData.length;

        const totalFields = farmsData.reduce((sum, farm) => {
          return sum + (farm.analytics?.totalCrops || 0);
        }, 0);

        setStats({ farmCount: totalFarms, fieldCount: totalFields });
      }

      if (tasksResponse.success) {
        setTasks(tasksResponse.data);
      }
    } catch (error) {
      console.error("Home data fetch error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  // Helpers for display
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get a random image for farms if none exists (Placeholder logic)
  const getFarmImage = (index) => {
    const images = [
      "https://images.unsplash.com/photo-1592419044706-39796d40f98c",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      "https://images.unsplash.com/photo-1625246333195-092996d93616",
    ];
    return images[index % images.length];
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FDFDFD]">
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: '#E5E7EB',
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 10,
          transform: [{ translateY: translateY }]
        }}
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-row pr-4">

            
            {user.profilePicture? (
              <Image
              source={{ uri: `${user.profilePicture}` }}
              className="w-12 h-12 rounded-full mr-4 border-2 border-gray-500"
            />
            ):            
            (
            <View className="w-12 h-12 rounded-full mr-4 border-2 border-gray-500 flex-row items-center justify-center">
              <Icon name="user" size={25} color="#000" />
            </View>
          )
            }
            


            <View>
              {/* Text changed to white for contrast */}
              <Text className="text-xl text-Black font-bold">
                Morning, {user?.name?.split(" ")[0] || "Farmer"}
              </Text>
              {/* Subtitle changed to a lighter gray */}
              <Text className="text-sm text-gray-800">
                Let's Check your farms
              </Text>
            </View>
          </View>
          {/* Bell icon inverted to match the dark theme */}
          <View className="bg-gray-800 p-3 rounded-full border border-gray-700 shadow-sm">
            <Feather name="bell" size={20} color="#F9FAFB" />
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={16} 
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 80 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#166534"]}
            progressViewOffset={50}
          />
        }
      >
  
        

        {/* Weather icon (Static/Mock for now) */}
        <WeatherCard />

        {/* Farms Summary stats (Dynamic Count) */}
        <View className="mt-4 space-y-4">
          <SectionHeader title="Farm Summary" action="View Full Details" onPress={() => navigation.navigate("Analytics")} />
          <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-300">
            <View className="flex-row items-center mb-6">
              <View className="flex-1">
                <Text className="text-3xl font-black text-gray-800">
                  {String(stats.farmCount).padStart(2, "0")}{" "}
                  <Text className="text-sm font-medium text-gray-400">
                    Farms
                  </Text>
                </Text>
                <View className="bg-emerald-50 self-start px-2 py-0.5 rounded-md mt-1">
                  <Text className="text-emerald-600 text-[10px] font-bold">
                    Active
                  </Text>
                </View>
              </View>
              <View className="w-[1px] h-10 bg-gray-100 mx-4" />
              <View className="flex-1">
                <Text className="text-3xl font-black text-gray-800">
                  {String(stats.fieldCount).padStart(2, "0")}{" "}
                  <Text className="text-sm font-medium text-gray-400">
                    Crop Cycles
                  </Text>
                </Text>
                {/* Calculate the percentage dynamically */}
                {(() => {
                  const totalFarms = stats.farmCount || 1;
                  const totalFields = stats.fieldCount || 0;

                  const rawPercentage = (totalFields / (totalFarms * 2)) * 100;
                  const percentage = Math.min(
                    100,
                    Math.max(0, Math.round(rawPercentage)),
                  );

                  return (
                    <View className="flex-row mt-1 items-center">
                      {/* Progress Bar Container */}
                      <View className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden flex-row">
                        {/* Dynamic Width Bar */}
                        <View
                          className="h-full bg-emerald-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </View>
                      <Text className="text-[10px] text-gray-400 ml-2">
                        {percentage}% Active
                      </Text>
                    </View>
                  );
                })()}
              </View>
            </View>

            {/* Financials (Static for demo) */}
            <View className="pt-5 border-t border-gray-50">
              <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-4">
                Financial Cashflow
              </Text>
              
              <View className="flex-row justify-between px-2 pb-2">
                <View>
                  <Text className="text-emerald-600 text-lg font-black">
                    KSH {totals.revenue.toLocaleString()}
                  </Text>
                  <Text className="text-[9px] text-gray-400 uppercase">
                    Total Revenue
                  </Text>
                </View>
                
                <View>
                  <Text className="text-rose-500 text-lg font-black">
                    KSH {totals.expense.toLocaleString()}
                  </Text>
                  <Text className="text-[9px] text-gray-400 uppercase">
                    Total Expenses
                  </Text>
                </View>
              </View>
              
            </View>
          </View>
        </View>

        {/* My Fields (Real Data) */}
        <View className="mt-8">
          <SectionHeader title="My Fields"/>
          {loading ? (
            <ActivityIndicator color="#166534" className="py-10" />
          ) : farms.length > 0 ? (
            <Animated.ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row mb-8 -mx-5 px-5"
            >
              {farms.map((farm, index) => (
                <FarmCard
                  key={farm.id}
                  farmName={farm.name}
                  size={`${farm.size || 0} ${farm.unit || "Ha"}`}
                  // If farm has a cropCycle, use its tasks, otherwise generic
                  task={
                    farm.cropCycles?.[0]?.tasks?.[0]?.title ||
                    "All systems nominal"
                  }
                  isAlert={false} // You can add logic here: e.g. if moisture < 20
                  // Use real weatherLog if available, else mock
                  moisture={
                    farm.weatherLogs?.[0]?.humidity ||
                    40 + Math.floor(Math.random() * 20)
                  }
                  temperature={
                    farm.weatherLogs?.[0]?.temperature ||
                    20 + Math.floor(Math.random() * 10)
                  }
                  image={getFarmImage(index)}
                />
              ))}
            </Animated.ScrollView>
          ) : (
            <Text className="text-gray-400 italic py-6">
              No farms added yet.
            </Text>
          )}
        </View>

        {/* Tasks (Real Data) */}
        <SectionHeader title="Tasks To Do" action="View Calendar" />
        <View className="bg-white rounded-3xl p-2 shadow-sm border border-gray-300">
          {loading ? (
            <ActivityIndicator color="#166534" className="py-10" />
          ) : tasks.length > 0 ? (
            // Filter to show only incomplete tasks, limit to 5
            tasks
              .filter((t) => t.status !== "completed")
              .slice(0, 3)
              .map((task) => (
                <TaskItem
                  key={task.id}
                  title={task.title}
                  // Access nested farm name safely
                  farmName={task.cropCycle?.farm?.name || "General Task"}
                  time={formatTime(task.date)}
                  completed={task.status === "completed"}
                  isUrgent={
                    task.type === "Harvest" || task.type === "Irrigation"
                  } // Simple logic for demo
                  category={task.type}
                />
              ))
          ) : (
            <Text className="text-gray-400 italic p-6 text-center">
              No pending tasks!
            </Text>
          )}
        </View>

        {/* News Articles section */}
        
        <NewsSection />
      </Animated.ScrollView>

      {/* Floating Chatbot Button */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate("Chathistory")}
        style={{ elevation: 5 }}
        className="absolute bottom-8 right-6 bg-[#2E7D32] w-16 h-16 rounded-full items-center justify-center shadow-xl border-4 border-white"
      >
        <Feather name="message-circle" size={28} color="white" />
        <View className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
