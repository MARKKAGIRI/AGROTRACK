import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const About = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
     
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        {/* Top Card */}
        <View className="bg-white rounded-2xl p-6 items-center shadow-sm mb-6">
          <View className="bg-green-600 w-16 h-16 rounded-full items-center justify-center mb-3">
            <Text className="text-3xl">🌾</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-800 mb-1">AgroTrack</Text>
          <Text className="text-gray-500 text-sm mb-2">Version 2.4.1 (Build 241)</Text>
          <Text className="text-gray-700 text-center text-sm">
            Empowering farmers with tools and insights to grow better.
          </Text>
        </View>

        {/* Information Section */}
        <Text className="text-gray-600 text-xs font-bold uppercase mb-2">Information</Text>
        <View className="space-y-3 mb-6">
          <InfoItem
            icon="information-circle-outline"
            title="Terms of Service"
            description="Read our terms and conditions"
            iconColor="#16a34a"
          />
          <InfoItem
            icon="shield-outline"
            title="Privacy Policy"
            description="How we protect your data"
            iconColor="#16a34a"
          />
          <InfoItem
            icon="help-circle-outline"
            title="Licenses"
            description="Open source licenses"
            iconColor="#16a34a"
          />
        </View>

        {/* App Info Section */}
        <Text className="text-gray-600 text-xs font-bold uppercase mb-2">App Info</Text>
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <InfoRow label="Version" value="2.4.1" />
          <InfoRow label="Build Number" value="241" />
          <InfoRow label="Last Updated" value="Dec 8, 2025" />
          <TouchableOpacity className="mt-3 bg-green-600 rounded-xl py-3">
            <Text className="text-white text-center font-bold">Check for Updates</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="items-center mb-6">
          <Text className="text-gray-400 text-sm">Made with ❤️ for Kenyan Farmers</Text>
          <Text className="text-gray-400 text-sm">© 2025 AgroTrack. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoItem = ({ icon, title, description, iconColor }) => (
  <TouchableOpacity className="bg-white p-4 rounded-2xl flex-row items-center shadow-sm">
    <Ionicons name={icon} size={28} color={iconColor} />
    <View className="ml-4 flex-1">
      <Text className="text-gray-800 font-semibold">{title}</Text>
      <Text className="text-gray-500 text-sm mt-1">{description}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
  </TouchableOpacity>
);

const InfoRow = ({ label, value }) => (
  <View className="flex-row justify-between py-2 border-b border-gray-200">
    <Text className="text-gray-700 font-medium">{label}</Text>
    <Text className="text-gray-800 font-semibold">{value}</Text>
  </View>
);

export default About;
