import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Animated,
  Platform,
  ActivityIndicator,
  StatusBar,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { sendMessageToAI } from "../../services/aiApi";

const ChatScreen = ({ navigation }) => {
  const { user, token } = useAuth();
  const flatListRef = useRef();

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "bot",
      text: `Hello ${user?.name || "there"}! I am Agrotrack AI. I have loaded your farm details. How can I help you today?`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [dotAnim1] = useState(new Animated.Value(0));
  const [dotAnim2] = useState(new Animated.Value(0));
  const [dotAnim3] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isTyping) {
      const animate = (anim, delay) => {
        Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(anim, {
              toValue: -8,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
        ).start();
      };

      animate(dotAnim1, 0);
      animate(dotAnim2, 150);
      animate(dotAnim3, 300);
    } else {
      dotAnim1.setValue(0);
      dotAnim2.setValue(0);
      dotAnim3.setValue(0);
    }
  }, [isTyping]);

  // Keyboard listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        // Scroll to end when keyboard shows
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // --- Handlers ---

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const response = await sendMessageToAI(user.user_id, userMsg.text, token);

    const botMsg = {
      id: (Date.now() + 1).toString(),
      sender: "bot",
      text: response.text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMsg]);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isTyping]);

  const renderMessage = ({ item }) => {
    const isUser = item.sender === "user";
    return (
      <View
        className={`flex-row mb-4 ${isUser ? "justify-end" : "justify-start"}`}
      >
        {!isUser && (
          <View className="w-8 h-8 rounded-full bg-[#E8F5E9] items-center justify-center mr-2 border border-green-100">
            <Ionicons name="sparkles" size={16} color="#2E7D32" />
          </View>
        )}

        <View
          className={`max-w-[80%] p-4 rounded-2xl ${
            isUser
              ? "bg-[#2E7D32] rounded-tr-sm"
              : "bg-white border border-gray-100 rounded-tl-sm shadow-sm"
          }`}
        >
          <Text
            className={`text-[15px] leading-5 ${isUser ? "text-white" : "text-[#1A1C1B]"}`}
          >
            {item.text}
          </Text>
          <Text
            className={`text-[10px] mt-2 text-right ${isUser ? "text-green-200" : "text-gray-400"}`}
          >
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FDFDFD]" edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-5 py-3 border-b border-gray-100 flex-row items-center justify-between bg-white">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center"
        >
          <Feather name="arrow-left" size={20} color="#1A1C1B" />
        </TouchableOpacity>

        <View className="items-center">
          <Text className="font-bold text-lg text-[#1A1C1B]">Agrotrack AI</Text>
          <View className="flex-row items-center">
            <View className="w-2 h-2 rounded-full bg-green-500 mr-1.5" />
            <Text className="text-xs text-gray-500">Online</Text>
          </View>
        </View>

        <TouchableOpacity className="w-10 h-10 items-center justify-center">
          <Feather name="more-horizontal" size={20} color="#1A1C1B" />
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 20,
          }}
          className="flex-1 bg-[#F9FAFB]"
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }}
          ListFooterComponent={
            isTyping && (
              <View className="flex-row items-center ml-2 mb-4">
                <View className="w-8 h-8 rounded-full bg-[#E8F5E9] items-center justify-center mr-2">
                  <Ionicons name="sparkles" size={16} color="#2E7D32" />
                </View>
                <View className="bg-white px-6 py-4 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm flex-row items-center justify-center">
                  <Animated.View
                    style={{
                      transform: [{ translateY: dotAnim1 }],
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#2E7D32",
                      marginHorizontal: 2,
                    }}
                  />
                  <Animated.View
                    style={{
                      transform: [{ translateY: dotAnim2 }],
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#2E7D32",
                      marginHorizontal: 2,
                    }}
                  />
                  <Animated.View
                    style={{
                      transform: [{ translateY: dotAnim3 }],
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#2E7D32",
                      marginHorizontal: 2,
                    }}
                  />
                </View>
              </View>
            )
          }
        />

        {/* Input Area with dynamic bottom padding based on keyboard height */}
        <View
          className="p-4 bg-white border-t border-gray-100 flex-row items-center"
          style={{
            paddingBottom:
              Platform.OS === "android" ? (keyboardHeight > 0 ? 16 : 16) : 16,
            marginBottom: Platform.OS === "android" ? keyboardHeight : 0,
          }}
        >
          <TouchableOpacity className="mr-3 p-2 bg-gray-50 rounded-full">
            <Feather name="plus" size={20} color="#6B7280" />
          </TouchableOpacity>

          <View className="flex-1 bg-[#F3F4F6] rounded-full px-4 py-3 flex-row items-center border border-transparent">
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask about your crops..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-[#1A1C1B] text-base max-h-20"
              multiline
              onFocus={() => {
                setTimeout(() => {
                  flatListRef.current?.scrollToEnd({ animated: true });
                }, 300);
              }}
            />
          </View>

          <TouchableOpacity
            onPress={handleSend}
            disabled={!input.trim()}
            className={`ml-3 w-12 h-12 rounded-full items-center justify-center shadow-sm ${
              input.trim() ? "bg-[#2E7D32]" : "bg-gray-200"
            }`}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
