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
  Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { sendMessageToAI } from "../../services/aiApi";
import AIMarkdown from "../../components/AIMarkdown";
import {
  addMessageToDB,
  getMessagesForSession,
  createSession,
  initDB,
  syncMessagesForSession,
} from "../../services/sqlite-storage/ChatStorage";

const ChatScreen = ({ route, navigation }) => {
  const { user, token } = useAuth();
  const flatListRef = useRef();
  const { sessionId: initialSessionId } = route.params || {};
  const [currentSessionId, setCurrentSessionId] = useState(initialSessionId);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Only show loading if we're opening an existing chat
  const [isLoading, setIsLoading] = useState(!!initialSessionId);

  const [messages, setMessages] = useState(
    // Only pre-populate welcome message for new chats
    initialSessionId
      ? []
      : [
          {
            id: "welcome_msg",
            sender: "bot",
            text: `Hello ${user?.name?.split(" ")[0] || "there"}, I am Agrotrack AI. I have loaded your farm details. How can I help you today?`,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]
  );

  const [selectedImage, setSelectedImage] = useState(null);

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
          ])
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

  // Load messages on mount
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      await initDB();

      if (currentSessionId) {
        // Existing chat — load from DB
        try {
          let loadedMsgs = await getMessagesForSession(currentSessionId);

          if (!loadedMsgs || loadedMsgs.length === 0) {
            await syncMessagesForSession(currentSessionId, token);
            loadedMsgs = await getMessagesForSession(currentSessionId);
          }

          if (isMounted && loadedMsgs && loadedMsgs.length > 0) {
            const formatted = loadedMsgs.map((m) => ({
              ...m,
              time: new Date(m.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }));
            setMessages(formatted);
          }
        } catch (error) {
          console.error("Error loading messages:", error);
        } finally {
          if (isMounted) setIsLoading(false);
        }
      }
      // New chat — welcome message already set in useState, nothing to load
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [currentSessionId, token]);

  // Keyboard listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const textToSend = input.trim();
    const imageToSend = selectedImage;

    setInput("");
    setSelectedImage(null);

    let activeSessionId = currentSessionId;

    if (!activeSessionId) {
      activeSessionId = Date.now().toString();
      setCurrentSessionId(activeSessionId);
      try {
        await createSession(activeSessionId, textToSend || "Image Analysis");
      } catch (e) {
        console.error("Failed to create session:", e);
        return;
      }
    }

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      image: imageToSend,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      await addMessageToDB(userMsg, activeSessionId);
    } catch (e) {
      console.error("Failed to save user message:", e);
    }

    try {
      const response = await sendMessageToAI(
        user.user_id,
        textToSend,
        imageToSend,
        token,
        activeSessionId
      );

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: response.text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
      await addMessageToDB(botMsg, activeSessionId);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: "Sorry, I'm having trouble connecting right now. Please try again.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isTyping]);

  const renderMessage = ({ item }) => {
    const isUser = item.sender === "user";

    return (
      <View className="mb-6">
        <Text
          className={`text-xs text-gray-400 mb-2 ${isUser ? "text-right mr-14" : "ml-14"}`}
        >
          {isUser ? "Me" : "Assistant"}
        </Text>

        <View
          className={`flex-row ${isUser ? "justify-end" : "justify-start"} items-start`}
        >
          {!isUser && (
            <View className="w-12 h-12 rounded-full bg-[#A8C8A0] items-center justify-center mr-3">
              <Ionicons name="sparkles" size={20} color="#FFFFFF" />
            </View>
          )}

          <View
            className={`max-w-[75%] px-5 py-4 rounded-3xl ${
              isUser
                ? "bg-[#A8C8A0] rounded-tr-md"
                : "bg-[#F5F1E8] rounded-tl-md"
            }`}
          >
            {item.image && (
              <Image
                source={{ uri: item.image }}
                className="w-48 h-48 rounded-lg mb-2 bg-gray-200"
                resizeMode="cover"
              />
            )}

            {isUser ? (
              <Text className="text-[15px] leading-6 text-[#2C2C2C]">
                {item.text}
              </Text>
            ) : (
              <AIMarkdown content={item.text} />
            )}

            <Text
              className={`text-[11px] mt-2 text-right ${isUser ? "text-gray-600" : "text-gray-500"}`}
            >
              Read {item.time}
            </Text>
          </View>

          {isUser && (
            <View className="w-12 h-12 rounded-full overflow-hidden ml-3 bg-gray-200">
              {user?.profilePicture ? (
                <Image
                  source={{ uri: user.profilePicture }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full bg-gray-300 items-center justify-center">
                  <Ionicons name="person" size={24} color="#6B7280" />
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fff]" edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-5 py-4 flex-row items-center border-b border-gray-100 justify-between bg-[#fff]">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center"
        >
          <Feather name="arrow-left" size={24} color="#1A1C1B" />
        </TouchableOpacity>

        <View className="items-center">
          <View className="flex-row items-center mb-1">
            <View className="w-8 h-8 rounded-full bg-[#D4E7D0] items-center justify-center mr-2">
              <Ionicons name="leaf" size={16} color="#2E7D32" />
            </View>
            <Text className="font-semibold text-[17px] text-[#1A1C1B]">
              Farmer Assistant
            </Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-2 h-2 rounded-full bg-[#7CB342] mr-1.5" />
            <Text className="text-xs text-gray-500">Online</Text>
          </View>
        </View>

        <TouchableOpacity className="w-10 h-10 items-center justify-center">
          <Feather name="more-vertical" size={20} color="#1A1C1B" />
        </TouchableOpacity>
      </View>

      {/* Loading State — only shown for existing chats while fetching */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center bg-[#F9FAFB]">
          <View className="w-16 h-16 rounded-full bg-[#E8F5E9] items-center justify-center mb-4">
            <Ionicons name="sparkles" size={28} color="#7CB342" />
          </View>
          <ActivityIndicator size="small" color="#7CB342" />
          <Text className="text-gray-400 text-sm mt-3">
            Loading conversation...
          </Text>
        </View>
      ) : (
        /* Chat Area */
        <View className="flex-1">
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 8,
              paddingBottom: 20,
            }}
            className="flex-1"
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }}
            ListFooterComponent={
              isTyping && (
                <View className="mb-6">
                  <Text className="text-xs text-gray-400 mb-2 ml-14">
                    Assistant
                  </Text>
                  <View className="flex-row items-start">
                    <View className="w-12 h-12 rounded-full bg-[#A8C8A0] items-center justify-center mr-3">
                      <Ionicons name="sparkles" size={20} color="#FFFFFF" />
                    </View>
                    <View className="bg-[#F5F1E8] px-6 py-4 rounded-3xl rounded-tl-md flex-row items-center justify-center">
                      <Animated.View
                        style={{
                          transform: [{ translateY: dotAnim1 }],
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "#7CB342",
                          marginHorizontal: 2,
                        }}
                      />
                      <Animated.View
                        style={{
                          transform: [{ translateY: dotAnim2 }],
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "#7CB342",
                          marginHorizontal: 2,
                        }}
                      />
                      <Animated.View
                        style={{
                          transform: [{ translateY: dotAnim3 }],
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "#7CB342",
                          marginHorizontal: 2,
                        }}
                      />
                    </View>
                  </View>
                </View>
              )
            }
          />

          {/* Quick Action Chips */}
          <View className="px-4 pb-3 pt-2">
            <View className="flex-row">
              <TouchableOpacity className="bg-white rounded-full px-4 py-2.5 mr-2 flex-row items-center border border-gray-200">
                <Ionicons name="sunny" size={16} color="#F59E0B" />
                <Text className="ml-2 text-sm text-gray-700">Weather Info</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white rounded-full px-4 py-2.5 mr-2 flex-row items-center border border-gray-200">
                <Ionicons name="leaf" size={16} color="#7CB342" />
                <Text className="ml-2 text-sm text-gray-700">Crop Advice</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white rounded-full px-4 py-2.5 flex-row items-center border border-gray-200">
                <Ionicons name="stats-chart" size={16} color="#059669" />
                <Text className="ml-2 text-sm text-gray-700">Market</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Input Area */}
          <View
            className="bg-white border-t border-gray-200"
            style={{
              paddingBottom:
                Platform.OS === "android"
                  ? keyboardHeight > 0
                    ? 16
                    : 16
                  : 16,
              marginBottom: Platform.OS === "android" ? keyboardHeight : 0,
              padding: 16,
            }}
          >
            {/* Image Preview */}
            {selectedImage && (
              <View className="mb-3 flex-row">
                <View className="relative">
                  <Image
                    source={{ uri: selectedImage }}
                    className="w-16 h-16 rounded-lg border border-gray-200"
                  />
                  <TouchableOpacity
                    onPress={() => setSelectedImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center border border-white"
                  >
                    <Feather name="x" size={12} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View className="flex-row items-center bg-[#F5F5F0] rounded-full px-4 py-2 mb-3">
              <TouchableOpacity onPress={pickImage} className="mr-2">
                <Ionicons name="add-circle" size={24} color="#9CA3AF" />
              </TouchableOpacity>

              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Type your question here..."
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-[#1A1C1B] text-[15px] max-h-20"
                multiline
                onFocus={() =>
                  setTimeout(
                    () => flatListRef.current?.scrollToEnd({ animated: true }),
                    300
                  )
                }
              />

              <TouchableOpacity className="mr-2">
                <Ionicons name="mic" size={24} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSend}
                disabled={!input.trim() && !selectedImage}
                className={`w-11 h-11 rounded-full items-center justify-center ${
                  input.trim() || selectedImage ? "bg-[#7CB342]" : "bg-gray-300"
                }`}
              >
                <Ionicons name="send" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;