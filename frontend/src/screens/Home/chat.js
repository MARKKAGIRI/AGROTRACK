import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext'; // Import Auth Context
import { sendMessageToAI } from '../../services/aiApi'; 

const ChatScreen = ({ navigation }) => {
  const { user, token } = useAuth(); // Get user details and token
  const flatListRef = useRef();
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
        id: '1',
        sender: 'bot',
        // Personalized greeting based on auth data
        text: `Hello ${user?.name || 'there'}! I am Agrotrack AI. I have loaded your farm details. How can I help you today?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // --- Handlers ---

  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. Add User Message immediately (Optimistic UI)
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // 2. Call Backend Service
    // Pass userId and token so backend can fetch context
    const response = await sendMessageToAI(user.user_id, userMsg.text, token);

    // 3. Add AI Response
    const botMsg = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: response.text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMsg]);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

  // --- Render Components ---

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View className={`flex-row mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && (
           <View className="w-8 h-8 rounded-full bg-[#E8F5E9] items-center justify-center mr-2 border border-green-100">
             <Ionicons name="sparkles" size={16} color="#2E7D32" />
           </View>
        )}
        
        <View className={`max-w-[80%] p-4 rounded-2xl ${
            isUser 
            ? 'bg-[#2E7D32] rounded-tr-sm' 
            : 'bg-white border border-gray-100 rounded-tl-sm shadow-sm'
        }`}>
            <Text className={`text-[15px] leading-5 ${isUser ? 'text-white' : 'text-[#1A1C1B]'}`}>
                {item.text}
            </Text>
            <Text className={`text-[10px] mt-2 text-right ${isUser ? 'text-green-200' : 'text-gray-400'}`}>
                {item.time}
            </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FDFDFD]">
      <StatusBar barStyle="dark-content" />
      
      {/* 1. Clean Header */}
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

      {/* 2. Chat Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{ padding: 20, paddingBottom: 20 }}
          className="flex-1 bg-[#F9FAFB]"
          ListFooterComponent={
            isTyping && (
                <View className="flex-row items-center ml-2 mb-4">
                    <View className="w-8 h-8 rounded-full bg-[#E8F5E9] items-center justify-center mr-2">
                        <Ionicons name="sparkles" size={16} color="#2E7D32" />
                    </View>
                    <View className="bg-white p-3 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm">
                        <ActivityIndicator size="small" color="#2E7D32" />
                    </View>
                </View>
            )
          }
        />

        {/* 3. Input Area */}
        <View className="p-4 bg-white border-t border-gray-100 flex-row items-center safe-pb">
            <TouchableOpacity className="mr-3 p-2 bg-gray-50 rounded-full">
                <Feather name="plus" size={20} color="#6B7280" />
            </TouchableOpacity>

            <View className="flex-1 bg-[#F3F4F6] rounded-full px-4 py-3 flex-row items-center focus:border-green-500 border border-transparent">
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Ask about your crops..."
                    placeholderTextColor="#9CA3AF"
                    className="flex-1 text-[#1A1C1B] text-base max-h-24"
                    multiline
                />
            </View>

            <TouchableOpacity 
                onPress={handleSend}
                disabled={!input.trim()}
                className={`ml-3 w-12 h-12 rounded-full items-center justify-center shadow-sm ${
                    input.trim() ? 'bg-[#2E7D32]' : 'bg-gray-200'
                }`}
            >
                <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;