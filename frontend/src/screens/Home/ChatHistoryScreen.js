import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { getSessions, initDB } from "../../services/sqlite-storage/ChatStorage";
import { useSQLiteContext } from "expo-sqlite";

const ChatHistoryScreen = ({ navigation }) => {
  const [sessions, setSessions] = useState([]);

  // Initialize DB and load sessions when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadData = async () => {
        try {
          // 1. Initialize DB
          initDB();

          // 2. Fetch Sessions
          const data = await getSessions();

          if (isActive) {
            setSessions(data);
          }
        } catch (e) {
          console.error("Failed to load history:", e);
        }
      };

      loadData();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
    }
    // Check if it's yesterday
    else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    // Check if it's within this week
    else if (today - date < 7 * 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString([], { weekday: "short" });
    }
    // Otherwise show date
    else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const renderSession = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate("Chatbot", { sessionId: item.id })}
      className="flex-row items-center bg-white px-4 py-4 mb-0.5"
    >
      {/* Avatar */}
      <View className="w-14 h-14 rounded-full bg-[#A8C8A0] items-center justify-center mr-3">
        <Ionicons name="sparkles" size={22} color="#FFFFFF" />
      </View>

      {/* Content */}
      <View className="flex-1 mr-2">
        <View className="flex-row justify-between items-center mb-1">
          <Text
            className="font-semibold text-gray-900 text-[15px]"
            numberOfLines={1}
          >
            {item.title || "Farmer Assistant"}
          </Text>
          <Text className="text-xs text-gray-400 ml-2">
            {formatTime(item.timestamp)}
          </Text>
        </View>
        <Text className="text-gray-500 text-[14px] leading-5" numberOfLines={2}>
          {item.lastMessage || "Start a new conversation..."}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F0]" edges={["top"]}>
      {/* Header */}
      <View className="px-5 py-4 bg-[#F5F5F0]">
        <View className="flex-row items-center justify-between mb-6">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 items-center justify-center -ml-2"
          >
            <Feather name="arrow-left" size={24} color="#1A1C1B" />
          </TouchableOpacity>

          {/* Title Section */}
          <View className="flex-1 ml-3">
            <Text className="text-2xl font-bold text-gray-900">Chats</Text>
            <Text className="text-sm text-gray-500 mt-1">
              {sessions.length} conversation{sessions.length !== 1 ? "s" : ""}
            </Text>
          </View>
        </View>

        {/* Search Bar (Optional - can be functional later) */}
        <View className="bg-white rounded-full px-4 py-3 flex-row items-center border border-gray-200">
          <Feather name="search" size={18} color="#9CA3AF" />
          <Text className="ml-3 text-gray-400 text-[15px]">
            Search conversations...
          </Text>
        </View>
      </View>

      {/* Chat List */}
      <View className="flex-1 bg-white mt-4">
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={renderSession}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          ItemSeparatorComponent={() => (
            <View
              className="bg-gray-100"
              style={{ height: 1, marginLeft: 70 }}
            />
          )}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center px-10">
              <View className="w-24 h-24 rounded-full bg-[#F5F5F0] items-center justify-center mb-4">
                <Ionicons
                  name="chatbubbles-outline"
                  size={48}
                  color="#A8C8A0"
                />
              </View>
              <Text className="text-gray-900 font-semibold text-lg mb-2">
                No conversations yet
              </Text>
              <Text className="text-gray-500 text-center text-[15px] leading-6">
                Start a new chat to get personalized advice for your farm and
                crops
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Chatbot", { sessionId: null })
                }
                className="mt-6 bg-[#7CB342] px-6 py-3 rounded-full flex-row items-center"
              >
                <Ionicons name="add" size={20} color="white" />
                <Text className="text-white font-semibold ml-2">
                  Start New Chat
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Chatbot", { sessionId: null })}
        className="absolute right-10 bottom-10 w-14 h-14 rounded-full bg-[#7CB342] items-center justify-center shadow-sm"
      >
        <Ionicons name="chatbubble-ellipses" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChatHistoryScreen;
