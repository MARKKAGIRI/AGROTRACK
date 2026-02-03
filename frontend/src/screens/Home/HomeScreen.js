import React, { use } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

const SectionHeader = ({ title, action }) => (
  <View className="flex-row justify-between items-center mb-4">
    <Text className="text-xl font-bold text-[#1A1C1B]">{title}</Text>
    <TouchableOpacity>
      <Text className="text-[#2E7D32] font-semibold text-sm">{action}</Text>
    </TouchableOpacity>
  </View>
);

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
      {/* Header: Farm Identity & Thumbnail */}
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

        {/* Functional Image Thumbnail */}
        <Image
          source={{ uri: image }}
          className="w-12 h-12 rounded-xl bg-gray-100 ml-2"
          resizeMode="cover"
        />
      </View>

      {/* Resource Metrics Section */}
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

      {/* Critical Task Section */}
      <View className="pt-1">
        <Text className="text-[9px] text-gray-400 uppercase font-bold mb-1">
          Active Task
        </Text>
        <View className="flex-row items-center">
          {/* Status Indicator Dot */}
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
    {/* Status Icon */}
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

    {/* Task Details */}
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

      {/* The Context Link: Farm Name & Time */}
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

    {/* Completion Toggle Indicator (Visual only) */}
    {!completed && (
      <View className="w-6 h-6 rounded-full border-2 border-gray-200" />
    )}
  </TouchableOpacity>
);

// --- 2. Main Component ---

const Home = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-[#FDFDFD]">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Sections */}
        <View className="flex-row justify-between items-center mt-4 mb-8">
          <View className="flex-row pr-4">
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
              className="w-12 h-12 rounded-full mr-4"
            />
            <View>
              <Text className="text-xl text-[#1A1C1B] font-bold">
                Morning, {user.name}
              </Text>
              <Text className="text-sm  text-gray-500">
                Let's Check your fields
              </Text>
            </View>
          </View>
          {/* notification icon */}
          <View className="bg-white p-3 rounded-full shadow-sm border border-gray-100">
            <Feather name="bell" size={20} color="#16a34a" />
          </View>
        </View>

        {/* Weather icon */}
        <View className="flex-row justify-between mb-8 border-gray-300 border bg-white rounded-3xl p-5 shadow-sm">
          {/* todays weather details section  */}
          <View className="flex-row items-center border-black/5 pb-4">
            <View className="flex-col  mt-2">
              <Text className="text-gray-400 text-sm">Today • Sep 21</Text>
              <View className="flex-row items-center mr-4">
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
                  }}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
                <Text className="ml-4 text-2xl font-semibold text-[#1A1C1B]">
                  22°C
                </Text>
              </View>

              <Text className="text-gray-500 text-sm">Sunny, Clear Sky</Text>
            </View>
          </View>

          {/* Coming days summary */}
          <View className="flex-row justify-between border-black/5 flex-1 ml-4 pt-2">
            {["Wed", "Thu", "Fri"].map((day, index) => (
              <View key={index} className="items-center">
                <Text className="text-gray-400 text-sm mb-1">{day}</Text>
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
                  }}
                  className="w-8 h-8 mb-1"
                  resizeMode="contain"
                />
                <Text className="text-[#1A1C1B] font-bold text-sm">
                  {20 + index}°
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Farms Summary stats */}
        <View className="mt-4 space-y-4">
          <SectionHeader title="Farm Summary" action="View Full Details" />
          {/* Existing Farm/Field Summary Card with Refined Styling */}
          <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-300">
            <View className="flex-row items-center mb-6">
              <View className="flex-1">
                <Text className="text-3xl font-black text-gray-800">
                  03{" "}
                  <Text className="text-sm font-medium text-gray-400">
                    Farms
                  </Text>
                </Text>
                <View className="bg-emerald-50 self-start px-2 py-0.5 rounded-md mt-1">
                  <Text className="text-emerald-600 text-[10px] font-bold">
                    +1 this month
                  </Text>
                </View>
              </View>
              <View className="w-[1px] h-10 bg-gray-100 mx-4" />
              <View className="flex-1">
                <Text className="text-3xl font-black text-gray-800">
                  07{" "}
                  <Text className="text-sm font-medium text-gray-400">
                    Fields
                  </Text>
                </Text>
                <View className="flex-row mt-1 items-center">
                  <View className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden flex-row">
                    <View className="h-full bg-emerald-500 w-[70%]" />
                  </View>
                  <Text className="text-[10px] text-gray-400 ml-2">
                    70% Active
                  </Text>
                </View>
              </View>
            </View>

            <View className="pt-5 border-t border-gray-50">
              <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-4">
                Financial Cashflow
              </Text>

              <View className="flex-row items-end justify-between h-24 px-2">
                {[
                  { label: "Jan", rev: 60, exp: 40 },
                  { label: "Feb", rev: 80, exp: 30 },
                  { label: "Mar", rev: 45, exp: 50 },
                  { label: "Apr", rev: 90, exp: 20 },
                ].map((item, index) => (
                  <View key={index} className="items-center space-y-2">
                    <View className="flex-row items-end space-x-1">
                      <View
                        className="w-2 bg-emerald-500 rounded-t-sm"
                        style={{ height: item.rev }}
                      />
                      <View
                        className="w-2 bg-rose-400 rounded-t-sm"
                        style={{ height: item.exp }}
                      />
                    </View>
                    <Text className="text-[10px] text-gray-400 font-medium">
                      {item.label}
                    </Text>
                  </View>
                ))}

                {/* Totals Label */}
                <View className="ml-4 justify-center">
                  <View className="mb-2">
                    <Text className="text-emerald-600 text-lg font-black">
                      $12,400
                    </Text>
                    <Text className="text-[9px] text-gray-400 uppercase">
                      Total Revenue
                    </Text>
                  </View>
                  <View>
                    <Text className="text-rose-500 text-lg font-black">
                      $4,200
                    </Text>
                    <Text className="text-[9px] text-gray-400 uppercase">
                      Total Expenses
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* My Fields */}

        <View className="mt-8">
          <SectionHeader title="My Fields" action="See All" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row mb-8 -mx-5 px-5"
          >
            <FarmCard
              farmName="Green Valley Estate"
              size="12.5 Ha"
              task="Routine Inspection"
              moisture={45}
              temperature={24}
              image="https://images.unsplash.com/photo-1592419044706-39796d40f98c"
            />
            <FarmCard
              farmName="Riverbend Farm"
              size="8.2 Ha"
              task="Urgent: Irrigation Needed"
              isAlert
              moisture={18}
              temperature={31}
              image="https://images.unsplash.com/photo-1500382017468-9049fed747ef"
            />
            <FarmCard
              farmName="Sunrise Highlands"
              size="24.0 Ha"
              task="Monitor Pests"
              moisture={52}
              temperature={22}
              image="https://images.unsplash.com/photo-1625246333195-092996d93616"
            />
          </ScrollView>
        </View>

        {/* Tasks */}
        <SectionHeader title="Tasks To Do" action="View Calendar" />
        <View className="bg-white rounded-3xl p-2 shadow-sm border border-gray-300">
          <TaskItem
            title="Irrigate North Sector"
            farmName="Green Valley"
            time="08:00 AM"
            isUrgent={true}
            category="Irrigation"
          />
          <TaskItem
            title="Check Soil PH Levels"
            farmName="Riverbend Farm"
            time="10:30 AM"
            completed={true}
          />
        </View>
      </ScrollView>

      {/* Floating Chatbot Button */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate("Chatbot")}
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
