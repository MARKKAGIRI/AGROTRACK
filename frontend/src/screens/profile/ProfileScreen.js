import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UpdateProfileScreen() {
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('+254 712 345 678');
  const [location, setLocation] = useState('Nairobi, Kenya');

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <StatusBar barStyle="light-content" backgroundColor="#16a34a" />

      {/* Header */}
      <View className="bg-green-600 px-5 pt-4 pb-6">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity className="w-10 h-10 items-center justify-center">
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Edit Profile</Text>
          <View className="w-10" />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View className="items-center -mt-12 mb-6">
          <View className="relative">
            <View className="w-24 h-24 rounded-full bg-white items-center justify-center shadow-lg">
              <View className="w-20 h-20 rounded-full bg-green-100 items-center justify-center">
                <Ionicons name="person" size={40} color="#16a34a" />
              </View>
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-green-600 items-center justify-center border-2 border-white">
              <Ionicons name="camera" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text className="text-sm text-gray-500 mt-3">Tap to change photo</Text>
        </View>

        {/* Form Section */}
        <View className="px-5">
          {/* Full Name */}
          <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 mb-2">Full Name</Text>
            <View className="flex-row items-center bg-white rounded-xl px-4 border border-gray-200">
              <Ionicons name="person-outline" size={20} color="#16a34a" />
              <TextInput
                className="flex-1 h-14 text-base ml-3"
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Email */}
          <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 mb-2">Email Address</Text>
            <View className="flex-row items-center bg-white rounded-xl px-4 border border-gray-200">
              <Ionicons name="mail-outline" size={20} color="#16a34a" />
              <TextInput
                className="flex-1 h-14 text-base ml-3"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Phone Number */}
          <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 mb-2">Phone Number</Text>
            <View className="flex-row items-center bg-white rounded-xl px-4 border border-gray-200">
              <Ionicons name="call-outline" size={20} color="#16a34a" />
              <TextInput
                className="flex-1 h-14 text-base ml-3"
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Location */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">Location</Text>
            <View className="flex-row items-center bg-white rounded-xl px-4 border border-gray-200">
              <Ionicons name="location-outline" size={20} color="#16a34a" />
              <TextInput
                className="flex-1 h-14 text-base ml-3"
                value={location}
                onChangeText={setLocation}
                placeholder="Enter your location"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Password Section */}
          <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-800 mb-1">Password</Text>
                <Text className="text-sm text-gray-500">Change your password</Text>
              </View>
              <TouchableOpacity className="w-10 h-10 items-center justify-center">
                <Ionicons name="chevron-forward" size={20} color="#16a34a" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Account Info */}
          <View className="bg-green-50 rounded-2xl p-4 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#16a34a" />
              <View className="flex-1 ml-3">
                <Text className="text-sm font-medium text-gray-700 mb-1">Account Information</Text>
                <Text className="text-xs text-gray-500">
                  Make sure your contact information is up to date for better communication.
                </Text>
              </View>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity className="bg-green-600 rounded-xl py-4 items-center mb-4 shadow-md">
            <Text className="text-base font-semibold text-white">Save Changes</Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity className="bg-white border-2 border-gray-300 rounded-xl py-4 items-center mb-8">
            <Text className="text-base font-semibold text-gray-700">Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}