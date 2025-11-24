import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const navigation = useNavigation();
  const { user, token } = useAuth();
  console.log(token);

  return (
    <SafeAreaView className="flex-1 bg-[#F6FAF7]">
      <ScrollView contentContainerClassName="p-2.5 bg-[#F6FAF7] items-center">
        {/* Header */}
        <View className="flex-row justify-between items-center w-full mb-4 p-4 rounded-2xl">
          <View>
            <Text className="text-base text-[#388e3c] font-medium">
              Welcome back,
            </Text>
            <Text className="text-[22px] font-bold text-[#222]">
              {token != null ? user.name : "John Doe"}
            </Text>
          </View>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
            className="w-12 h-12 rounded-full border-2 border-[#388e3c]"
          />
        </View>

        {/* Greeting & Next Task Card */}
        <View className="bg-[#e8f5e9] p-4 rounded-2xl w-full mb-4 shadow-sm">
          <Text className="text-lg font-semibold mb-2 text-[#388e3c]">
            Hello, {token != null ? user.name : "John Doe"} 👋
          </Text>
          <Text className="text-[15px] mb-1 text-[#333]">
            Hope you're having a productive day on the farm!
          </Text>
          <View className="flex-row items-center mt-2.5 bg-[#d0e8d6] p-2.5 rounded-lg">
            <Icon
              name="calendar-check"
              size={22}
              color="#388e3c"
              style={{ marginRight: 8 }}
            />
            <Text className="text-[15px] text-[#388e3c] font-semibold">
              Next Task: Water Tomatoes at 4:00 PM
            </Text>
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
            <TouchableOpacity className="bg-white items-center justify-center py-4 px-4 rounded-2xl w-[48%] shadow-md">
              <Icon name="plus-circle" size={32} color="#388e3c" />
              <Text className="mt-2 text-[15px] font-semibold text-[#388e3c] text-center">
                Add Crop
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