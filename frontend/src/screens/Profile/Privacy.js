import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrivacyScreen = ({ navigation }) => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [activityStatus, setActivityStatus] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
     
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>

        {/* Security Section */}
        <Text className="text-gray-600 text-xs font-bold uppercase mb-2">Security</Text>
        <View className="space-y-3">
          <PrivacyItem
            icon="shield-checkmark"
            title="Two-Factor Authentication"
            description="Add extra security to your account"
            value={twoFactorAuth}
            onValueChange={setTwoFactorAuth}
          />
          <PrivacyItem
            icon="lock-closed"
            title="Biometric Login"
            description="Use fingerprint or face ID"
            value={biometricLogin}
            onValueChange={setBiometricLogin}
          />
         
        </View>

        {/* Privacy Section */}
        <Text className="text-gray-600 text-xs font-bold uppercase mt-6 mb-2">Privacy</Text>
        <View className="space-y-3">
          {/* <PrivacyItem
            icon="eye"
            title="Profile Visibility"
            description="Show your profile to other farmers"
            value={profileVisibility}
            onValueChange={setProfileVisibility}
          />
          <PrivacyItem
            icon="notifications"
            title="Activity Status"
            description="Let others see when you're online"
            value={activityStatus}
            onValueChange={setActivityStatus}
          /> */}
          <TouchableOpacity
            className="bg-white rounded-2xl p-4 flex-row items-center shadow-sm"
            onPress={() => navigation.navigate('DataPrivacy')}
          >
            <Ionicons name="shield" size={20} color="#16a34a" />
            <View className="ml-4 flex-1">
              <Text className="text-gray-800 font-semibold">Data & Privacy</Text>
              <Text className="text-gray-500 text-sm mt-1">Manage your data and privacy settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const PrivacyItem = ({ icon, title, description, value, onValueChange }) => (
  <View className="bg-white rounded-2xl p-4 flex-row items-center shadow-sm">
    <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center">
      <Ionicons name={icon} size={20} color="#16a34a" />
    </View>
    <View className="ml-4 flex-1">
      <Text className="text-gray-800 font-semibold">{title}</Text>
      <Text className="text-gray-500 text-sm mt-1">{description}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor={value ? "#16a34a" : "#f4f3f4"}
      trackColor={{ false: "#767577", true: "#a7f3d0" }}
    />
  </View>
);

export default PrivacyScreen;
