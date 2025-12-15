import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const HelpSupport = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
     

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        {/* Greeting */}
        <View className="bg-green-100 rounded-2xl p-4 mb-5 shadow-sm">
          <Text className="text-lg font-semibold text-green-900 mb-1">
            Need Assistance?
          </Text>
          <Text className="text-gray-700 text-sm">
            Our team is here to help you navigate AgroTrack.
          </Text>
        </View>

        {/* Get Help Section */}
        <Text className="text-gray-600 text-xs font-bold uppercase mb-2">
          Get Help
        </Text>
        <View className="mb-6 space-y-3">
          <HelpItem
            icon="help-circle-outline"
            title="FAQs"
            description="Find answers to common questions"
            iconColor="#16a34a"
          />
          <HelpItem
            icon="chatbubble-ellipses-outline"
            title="Chat with Support"
            description="Get instant help from our team"
            iconColor="#16a34a"
          />
          <HelpItem
            icon="mail-outline"
            title="Email Support"
            description="support@farmapp.com"
            iconColor="#16a34a"
          />
          <HelpItem
            icon="call-outline"
            title="Call Support"
            description="+254 700 123456"
            iconColor="#16a34a"
          />
        </View>

        {/* Resources Section */}
        <Text className="text-gray-600 text-xs font-bold uppercase mb-2">
          Resources
        </Text>
        <View className="mb-6 space-y-3">
          <HelpItem
            icon="book-outline"
            title="User Guide"
            description="Learn how to use the app"
            iconColor="#15803d"
          />
          <HelpItem
            icon="information-circle-outline"
            title="Farming Tips"
            description="Expert advice and best practices"
            iconColor="#15803d"
          />
          <HelpItem
            icon="people-outline"
            title="Community Forum"
            description="Connect with other farmers"
            iconColor="#15803d"
          />
        </View>

       
      </ScrollView>
    </SafeAreaView>
  );
};

const HelpItem = ({ icon, title, description, iconColor }) => (
  <TouchableOpacity className="bg-white p-4 rounded-2xl flex-row items-center shadow-sm">
    <Ionicons name={icon} size={28} color={iconColor} />
    <View className="ml-4 flex-1">
      <Text className="text-gray-800 font-semibold">{title}</Text>
      <Text className="text-gray-500 text-sm mt-1">{description}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
  </TouchableOpacity>
);

export default HelpSupport;
