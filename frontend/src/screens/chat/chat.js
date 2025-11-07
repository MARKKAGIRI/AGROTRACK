import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
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
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
  Chat screen for AgroTrack+ assistant.

  Notes:
  - Messages are stored inverted (newest at index 0) to work with FlatList inverted prop.
  - AsyncStorage is used for simple persistence; STORAGE_KEY holds saved messages.
  - botResponseFor() implements a tiny keyword-based response engine.
  - TypingIndicator is a small Animated component to simulate bot thinking.
  - MessageBubble handles display and long-press actions (copy/share).
  - Use KeyboardAvoidingView + TouchableWithoutFeedback to provide good keyboard UX.
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

// Simple keyword-based bot — keep concise, extendable for future LLM integration
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

/* TypingIndicator
   - Animated three-dot indicator used while bot "types".
   - Keeps animation lightweight by looping a simple sequence.
*/
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

  const dotStyle = (delay) => ({
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
  });

  return (
    <View style={styles.typingWrap} accessibilityLabel="Bot typing indicator">
      <View style={styles.typingBubble}>
        <Animated.View style={dotStyle(0)} />
        <Animated.View style={dotStyle(150)} />
        <Animated.View style={dotStyle(300)} />
      </View>
    </View>
  );
}

/* MessageBubble
   - Renders a single message for bot or user.
   - onLongPress triggers actions (copy/share).
   - Uses simple avatars and time stamp.
*/
function MessageBubble({ item, onLongPress }) {
  const isUser = item.sender === 'user';
  return (
    <Pressable
      onLongPress={() => onLongPress && onLongPress(item)}
      accessibilityLabel={isUser ? 'Your message' : 'Assistant message'}
      style={[
        styles.messageRow,
        isUser ? styles.messageRowUser : styles.messageRowBot,
      ]}
    >
      {!isUser && (
        <View style={styles.avatarBot}>
          <MaterialCommunityIcons name="leaf" size={18} color={COLORS.white} />
        </View>
      )}
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}>
        <Text style={[styles.messageText, isUser ? styles.messageTextUser : styles.messageTextBot]}>
          {item.text}
        </Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      {isUser && (
        <View style={styles.avatarUser}>
          <Feather name="user" size={18} color="#fff" />
        </View>
      )}
    </Pressable>
  );
}

/* ChatScreen main component
   - Loads persisted messages on mount.
   - sendMessage handles adding user msg, simulating bot typing, and appending bot reply.
   - Messages are stored inverted (newest first) to work with inverted FlatList.
   - Provides quick topics, clear/export, copy/share features.
*/
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
    // persist messages
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages)).catch((e) =>
      console.warn('Save chat failed', e)
    );
    // auto-scroll
    if (listRef.current && messages.length) {
      // small timeout to allow layout to settle before scrolling
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
      // simulate bot typing
      setIsTyping(true);

      // simulate network/processing delay before bot reply
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
    // populate input for quick editing or immediate send
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

  // long-press actions menu
  const handleLongPressMessage = async (item) => {
    Alert.alert('Message actions', '', [
      { text: 'Copy', onPress: () => copyToClipboard(item.text) },
      { text: 'Share', onPress: () => shareMessage(item) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // copy helper: tries Clipboard API, falls back to Share
  const copyToClipboard = (text) => {
    // Use native Share fallback if Clipboard not available
    // Attempt to use Clipboard API
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
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

  // export conversation text and share
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
    <SafeAreaView style={styles.safe}>
      {/* Header with gradient */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.dark]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.header}
      >
        <View style={styles.headerInner}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <MaterialCommunityIcons name="leaf" size={22} color={COLORS.primary} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.headerTitle}>AgroTrack+ AI Assistant</Text>
              <Text style={styles.headerSubtitle}>Your smart farming companion</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={clearConversation} accessibilityLabel="Clear conversation" style={styles.iconBtn}>
              <Feather name="trash-2" size={18} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={exportConversation} accessibilityLabel="Share conversation" style={styles.iconBtn}>
              <Feather name="share-2" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Main area with keyboard handling */}
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Quick topics */}
            <View style={styles.topicsWrap}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.topicsScroll}>
                {QUICK_TOPICS.map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={styles.topicPill}
                    onPress={() => onQuickTopic(t)}
                    accessibilityLabel={`Quick topic ${t}`}
                  >
                    <Text style={styles.topicText}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Messages */}
            <View style={styles.messagesWrap}>
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
            <View style={styles.inputArea}>
              <TextInput
                style={styles.input}
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
                style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
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

// Styling kept modular and responsive-friendly (shadows differ per platform)
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.lightBg },
  flex: { flex: 1 },
  header: {
    paddingTop: Platform.OS === 'android' ? 22 : 10,
    paddingBottom: 12,
    paddingHorizontal: 14,
  },
  headerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { color: COLORS.white, fontWeight: '700', fontSize: 16 },
  headerSubtitle: { color: '#d1f7dc', fontSize: 12, marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { marginLeft: 12, padding: 6 },

  container: { flex: 1, paddingHorizontal: 12, paddingTop: 12 },
  topicsWrap: { height: 52, marginBottom: 8 },
  topicsScroll: { alignItems: 'center', paddingRight: 8 },
  topicPill: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e6f6ea',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  topicText: { color: COLORS.primary, fontWeight: '600', fontSize: 13 },

  messagesWrap: { flex: 1, marginBottom: 8 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', marginVertical: 6 },
  messageRowUser: { justifyContent: 'flex-end' },
  messageRowBot: { justifyContent: 'flex-start' },
  avatarBot: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarUser: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#4b5563',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  bubbleBot: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  bubbleUser: {
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 10,
  },
  messageText: { fontSize: 14, lineHeight: 18 },
  messageTextBot: { color: '#111' },
  messageTextUser: { color: '#fff' },
  timeText: { fontSize: 11, color: '#9ca3af', marginTop: 6, alignSelf: 'flex-end' },

  typingWrap: { paddingVertical: 6, alignItems: 'flex-start' },
  typingBubble: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    marginLeft: 48,
    alignItems: 'flex-end',
  },

  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: COLORS.lightBg,
    borderTopWidth: 1,
    borderTopColor: '#e6f6ea',
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    fontSize: 15,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#eef7ee',
  },
  sendBtn: {
    backgroundColor: COLORS.primary,
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.5 },
});