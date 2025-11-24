import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Easing,
  Alert,
  Share,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
  Chat screen for AgroTrack+ assistant - now using NativeWind for styling.
*/

const COLORS = {
  primary: '#16a34a', // green-600
  dark: '#15803d', // green-700
  lightBg: '#f0fdf4', // green-50
  white: '#ffffff',
  gray: '#6b7280',
};

const STORAGE_KEY = '@agrotrack_chat_messages';

const QUICK_TOPICS = [
  'Crop rotation tips',
  'Pest management',
  'Soil health',
  'Weather planning',
  'Irrigation advice',
  'Fertilizer recommendations',
];

// helper to format a simple HH:MM time string
const nowTime = (d = new Date()) =>
  d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// Simple keyword-based bot
const botResponseFor = (text) => {
  const t = text.toLowerCase();
  if (t.includes('pest') || t.includes('insect') || t.includes('aphid')) {
    return "Pest management tip: Inspect plants early in the morning. Use biological controls where possible (ladybugs, neem oil). For severe outbreaks, consider targeted pesticide application following label instructions.";
  }
  if (t.includes('soil') || t.includes('ph') || t.includes('nutrient')) {
    return "Soil health advice: Test your soil for pH and nutrients. Add organic matter (compost) to improve structure and microbial activity. Rotate legumes to replenish nitrogen.";
  }
  if (t.includes('irrig') || t.includes('water')) {
    return "Irrigation advice: Water in early morning to reduce evaporation and disease. Use drip irrigation for efficiency and monitor soil moisture rather than a fixed schedule.";
  }
  if (t.includes('weather')) {
    return "Weather planning: Check short-term forecasts before fieldwork. For frost risk, protect sensitive crops with covers; for heavy rain, avoid compacting wet soils.";
  }
  if (t.includes('crop rotation') || t.includes('rotation')) {
    return "Crop rotation tip: Alternate families (e.g., cereals -> legumes -> brassicas) to reduce pests/diseases and improve soil fertility.";
  }
  if (t.includes('organic')) {
    return "Organic approach: Use compost, green manures, and biological pest control. Focus on building soil life and crop diversity.";
  }
  return "Here's a tip: Keep records of tasks and observations. If you give me more details (crop, problem, location), I can provide tailored advice.";
};

/* TypingIndicator - Animated three-dot indicator */
function TypingIndicator() {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 450, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 450, easing: Easing.linear, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim]);

  const dotStyle = {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gray,
    marginHorizontal: 4,
    opacity: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.25, 1],
    }),
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -6],
        }),
      },
    ],
  };

  return (
    <View className="py-1.5 items-start" accessibilityLabel="Bot typing indicator">
      <View className="flex-row bg-white p-2 rounded-xl shadow-sm ml-12 items-end">
        <Animated.View style={dotStyle} />
        <Animated.View style={dotStyle} />
        <Animated.View style={dotStyle} />
      </View>
    </View>
  );
}

/* MessageBubble - Renders a single message */
function MessageBubble({ item, onLongPress }) {
  const isUser = item.sender === 'user';
  return (
    <Pressable
      onLongPress={() => onLongPress && onLongPress(item)}
      accessibilityLabel={isUser ? 'Your message' : 'Assistant message'}
      className={`flex-row items-end my-1.5 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <View className="w-[34px] h-[34px] rounded-lg bg-[#16a34a] items-center justify-center mr-2">
          <MaterialCommunityIcons name="leaf" size={18} color={COLORS.white} />
        </View>
      )}
      <View 
        className={`max-w-[80%] p-3 rounded-xl shadow-sm ${
          isUser 
            ? 'bg-[#16a34a] rounded-tr-sm rounded-tl-xl rounded-bl-xl' 
            : 'bg-white rounded-tl-sm rounded-tr-xl rounded-br-xl'
        }`}
      >
        <Text className={`text-sm leading-[18px] ${isUser ? 'text-white' : 'text-[#111]'}`}>
          {item.text}
        </Text>
        <Text className="text-[11px] text-gray-400 mt-1.5 self-end">{item.time}</Text>
      </View>
      {isUser && (
        <View className="w-[34px] h-[34px] rounded-full bg-gray-600 items-center justify-center ml-2">
          <Feather name="user" size={18} color="#fff" />
        </View>
      )}
    </Pressable>
  );
}

/* ChatScreen main component */
export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loadingRestore, setLoadingRestore] = useState(true);
  const listRef = useRef(null);

  // restore conversation or set a welcome message
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setMessages(JSON.parse(raw));
        else {
          const welcome = {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: 'Hello! I am AgroTrack+ Assistant. Ask me about pests, soil, irrigation, weather, or crop rotation.',
            time: nowTime(),
          };
          setMessages([welcome]);
        }
      } catch (e) {
        console.warn('Restore chat failed', e);
      } finally {
        setLoadingRestore(false);
      }
    })();
  }, []);

  // persist messages whenever they change and auto-scroll to latest
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages)).catch((e) =>
      console.warn('Save chat failed', e)
    );
    if (listRef.current && messages.length) {
      setTimeout(() => listRef.current.scrollToOffset({ offset: 0, animated: true }), 200);
    }
  }, [messages]);

  // sendMessage: add user message, clear input, simulate bot response
  const sendMessage = useCallback(
    (text) => {
      if (!text || !text.trim()) return;
      const userMsg = {
        id: `u-${Date.now()}`,
        sender: 'user',
        text: text.trim(),
        time: nowTime(),
      };
      setMessages((m) => [userMsg, ...m]);
      setInput('');
      setIsTyping(true);

      setTimeout(() => {
        const botText = botResponseFor(text);
        const botMsg = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: botText,
          time: nowTime(),
        };
        setMessages((m) => [botMsg, ...m]);
        setIsTyping(false);
      }, 900 + Math.random() * 800);
    },
    [setMessages]
  );

  const onQuickTopic = (topic) => {
    setInput(topic);
  };

  const clearConversation = async () => {
    Alert.alert('Clear conversation', 'Are you sure you want to clear the chat?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          setMessages([]);
          await AsyncStorage.removeItem(STORAGE_KEY);
        },
      },
    ]);
  };

  const handleLongPressMessage = async (item) => {
    Alert.alert('Message actions', '', [
      { text: 'Copy', onPress: () => copyToClipboard(item.text) },
      { text: 'Share', onPress: () => shareMessage(item) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const copyToClipboard = (text) => {
    try {
      const Clipboard = require('react-native').Clipboard || require('expo-clipboard');
      if (Clipboard && Clipboard.setString) {
        Clipboard.setString(text);
        Alert.alert('Copied', 'Message copied to clipboard.');
        return;
      }
    } catch (e) {
      /* ignore */
    }
    Share.share({ message: text }).catch(() => {});
  };

  const shareMessage = async (item) => {
    try {
      await Share.share({ message: `${item.sender === 'user' ? 'You' : 'Assistant'}: ${item.text}` });
    } catch (e) {
      console.warn('Share failed', e);
    }
  };

  const exportConversation = async () => {
    const text = messages
      .slice()
      .reverse()
      .map((m) => `${m.time} ${m.sender === 'user' ? 'You' : 'Assistant'}: ${m.text}`)
      .join('\n\n');
    try {
      await Share.share({ message: text || 'No messages' });
    } catch (e) {
      console.warn('Export failed', e);
    }
  };

  const renderItem = ({ item }) => <MessageBubble item={item} onLongPress={handleLongPressMessage} />;

  return (
    <SafeAreaView className="flex-1 bg-[#f0fdf4]">
      {/* Header with gradient */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.dark]}
        start={[0, 0]}
        end={[1, 1]}
        className={`${Platform.OS === 'android' ? 'pt-5' : 'pt-2'} pb-3 px-3.5`}
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="w-11 h-11 rounded-xl bg-white items-center justify-center">
              <MaterialCommunityIcons name="leaf" size={22} color={COLORS.primary} />
            </View>
            <View className="ml-2.5">
              <Text className="text-white font-bold text-base">AgroTrack+ AI Assistant</Text>
              <Text className="text-[#d1f7dc] text-xs mt-0.5">Your smart farming companion</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity onPress={clearConversation} accessibilityLabel="Clear conversation" className="ml-3 p-1.5">
              <Feather name="trash-2" size={18} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={exportConversation} accessibilityLabel="Share conversation" className="ml-3 p-1.5">
              <Feather name="share-2" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Main area with keyboard handling */}
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 px-3 pt-3">
            {/* Quick topics */}
            <View className="h-[52px] mb-2">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="items-center pr-2">
                {QUICK_TOPICS.map((t) => (
                  <TouchableOpacity
                    key={t}
                    className="bg-white px-3 py-2 rounded-full mr-2 border border-[#e6f6ea] shadow-sm"
                    onPress={() => onQuickTopic(t)}
                    accessibilityLabel={`Quick topic ${t}`}
                  >
                    <Text className="text-[#16a34a] font-semibold text-[13px]">{t}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Messages */}
            <View className="flex-1 mb-2">
              <FlatList
                ref={listRef}
                data={messages}
                renderItem={renderItem}
                keyExtractor={(i) => i.id}
                inverted
                contentContainerStyle={{ paddingTop: 12, paddingBottom: 12 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              />
              {isTyping && <TypingIndicator />}
            </View>

            {/* Input */}
            <View className="flex-row items-end py-2 px-1.5 bg-[#f0fdf4] border-t border-[#e6f6ea]">
              <TextInput
                className={`flex-1 min-h-[44px] max-h-[120px] bg-white rounded-xl px-3 ${Platform.OS === 'ios' ? 'py-2.5' : 'py-2'} text-[15px] mr-2 border border-[#eef7ee]`}
                value={input}
                onChangeText={setInput}
                placeholder="Ask about pests, soil, watering..."
                multiline
                accessibilityLabel="Message input"
                returnKeyType="send"
                onSubmitEditing={() => {
                  if (input.trim()) sendMessage(input);
                }}
              />
              <TouchableOpacity
                className={`bg-[#16a34a] w-12 h-12 rounded-xl items-center justify-center ${!input.trim() && 'opacity-50'}`}
                onPress={() => {
                  if (input.trim()) sendMessage(input);
                }}
                disabled={!input.trim()}
                accessibilityLabel="Send message"
              >
                <Ionicons name="send" size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}