import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigation();

  const SettingsItem = ({ icon, title, subtitle, onPress, showArrow = true, rightComponent }) => (
    <TouchableOpacity 
      className="bg-white rounded-2xl p-4 mb-3 shadow-sm"
      onPress={onPress}
      disabled={!onPress}
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center mr-3">
          <Ionicons name={icon} size={20} color="#16a34a" />
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-800">{title}</Text>
          {subtitle && (
            <Text className="text-xs text-gray-500 mt-0.5">{subtitle}</Text>
          )}
        </View>
        {rightComponent || (showArrow && (
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        ))}
      </View>
    </TouchableOpacity>
  );

  const SettingsSection = ({ title, children }) => (
    <View className="mb-6">
      <Text className="text-sm font-bold text-gray-600 uppercase mb-3 px-1">
        {title}
      </Text>
      {children}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <StatusBar barStyle="light-content" backgroundColor="#16a34a" />

      {/* Header */}
      <View className="bg-green-600 px-5 pt-4 pb-6 rounded-b-3xl">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity className="w-10 h-10 items-center justify-center"
           onPress={() => {navigation.goBack()}}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Settings</Text>
          <View className="w-10" />
        </View>
      </View>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <SettingsSection title="Account">
          <SettingsItem
            icon="lock-closed-outline"
            title="Change Password"
            subtitle="Update your password"
            onPress={() => {}}
          />
          <SettingsItem
            icon="shield-checkmark-outline"
            title="Privacy & Security"
            subtitle="Manage your privacy settings"
            onPress={() => {}}
          />
        </SettingsSection>

        {/* Notifications Section */}
        <SettingsSection title="Notifications">
          <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center mr-3">
                  <Ionicons name="notifications-outline" size={20} color="#16a34a" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-800">Push Notifications</Text>
                  <Text className="text-xs text-gray-500 mt-0.5">Get updates on your device</Text>
                </View>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: '#d1d5db', true: '#86efac' }}
                thumbColor={pushNotifications ? '#16a34a' : '#f3f4f6'}
              />
            </View>
            <View className="h-px bg-gray-200 mb-4" />
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center mr-3">
                  <Ionicons name="mail-outline" size={20} color="#16a34a" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-800">Email Notifications</Text>
                  <Text className="text-xs text-gray-500 mt-0.5">Receive updates via email</Text>
                </View>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: '#d1d5db', true: '#86efac' }}
                thumbColor={emailNotifications ? '#16a34a' : '#f3f4f6'}
              />
            </View>
          </View>
        </SettingsSection>

        {/* Preferences Section */}
        <SettingsSection title="Preferences">
          <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center mr-3">
                  <Ionicons name="moon-outline" size={20} color="#16a34a" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-800">Dark Mode</Text>
                  <Text className="text-xs text-gray-500 mt-0.5">Switch to dark theme</Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#d1d5db', true: '#86efac' }}
                thumbColor={darkMode ? '#16a34a' : '#f3f4f6'}
              />
            </View>
          </View>
          <SettingsItem
            icon="language-outline"
            title="Language"
            subtitle="English (US)"
            onPress={() => {}}
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}