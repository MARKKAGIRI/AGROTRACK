import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const { user, token, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            // navigation.navigate('Login'); // Uncomment if needed
          },
        },
      ]
    );
  };

  const profileMenuItems = [
    {
      icon: 'account-edit',
      title: 'Edit Profile',
      subtitle: 'Update your personal information',
      color: '#388e3c',
      onPress: () => {
       
        navigation.navigate("UpdateProfile")
      },
    },
    {
      icon: 'cog',
      title: 'Settings',
      subtitle: 'App preferences and notifications',
      color: '#6b7280',
      onPress: () => {
        // navigation.navigate('Settings');
        navigation.navigate("Settings")
      },
    },
    {
      icon: 'shield-check',
      title: 'Privacy & Security',
      subtitle: 'Manage your privacy settings',
      color: '#0284c7',
      onPress: () => {
        navigation.navigate("Privacy")
      },
    },
    {
      icon: 'help-circle',
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      color: '#ca8a04',
      onPress: () => {
        navigation.navigate("Help")
      },
    },
    {
      icon: 'information',
      title: 'About',
      subtitle: 'App version and information',
      color: '#7c3aed',
      onPress: () => {
        navigation.navigate("About")
      },
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F6FAF7]">
      <ScrollView contentContainerClassName="p-4 pb-8">
        {/* Profile Header */}
        <View className="items-center mb-5 bg-gradient-to-br from-[#d0e8d6] to-[#e8f5e9] p-6 rounded-2xl w-full shadow-sm">
          <View className="relative">
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              className="w-24 h-24 rounded-full border-4 border-[#388e3c] mb-3"
            />
            <TouchableOpacity className="absolute bottom-2 right-0 bg-[#388e3c] w-8 h-8 rounded-full items-center justify-center border-2 border-white">
              <Icon name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-bold text-[#222] mb-1">
            {token != null ? user.name : "John Doe"}
          </Text>
          <Text className="text-base text-[#388e3c] font-medium mb-3">
            Farmer
          </Text>
          <View className="flex-row items-center bg-white/60 px-4 py-2 rounded-full">
            <Icon name="medal" size={18} color="#fbbf24" />
            <Text className="text-sm text-[#666] ml-2 font-medium">Premium Member</Text>
          </View>
        </View>

        {/* Contact Info Card */}
        <View className="bg-white rounded-2xl p-4 w-full mb-5 shadow-sm">
          <Text className="text-lg font-bold text-[#388e3c] mb-3">Contact Information</Text>
          
          <View className="flex-row items-center mb-3 pb-3 border-b border-gray-100">
            <View className="w-10 h-10 bg-[#e8f5e9] rounded-full items-center justify-center">
              <Icon name="email" size={20} color="#388e3c" />
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-xs text-[#666] mb-0.5">Email</Text>
              <Text className="text-sm text-[#333] font-medium">
                {token != null ? user.email : "johndoe@email.com"}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-3 pb-3 border-b border-gray-100">
            <View className="w-10 h-10 bg-[#e8f5e9] rounded-full items-center justify-center">
              <Icon name="phone" size={20} color="#388e3c" />
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-xs text-[#666] mb-0.5">Phone</Text>
              <Text className="text-sm text-[#333] font-medium">+254 712 345678</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-[#e8f5e9] rounded-full items-center justify-center">
              <Icon name="map-marker" size={20} color="#388e3c" />
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-xs text-[#666] mb-0.5">Location</Text>
              <Text className="text-sm text-[#333] font-medium">Nyeri, Kenya</Text>
            </View>
          </View>
        </View>

        

        {/* Profile Menu Items */}
        <View className="bg-white rounded-2xl p-2 mb-5 shadow-sm">
          {profileMenuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              className={`flex-row items-center p-3 rounded-xl ${
                index !== profileMenuItems.length - 1 ? 'mb-1' : ''
              } active:bg-gray-50`}
            >
              <View className="w-11 h-11 bg-gray-50 rounded-xl items-center justify-center">
                <Icon name={item.icon} size={24} color={item.color} />
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-base font-semibold text-[#222] mb-0.5">
                  {item.title}
                </Text>
                <Text className="text-xs text-[#666]">{item.subtitle}</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center bg-red-50 border-2 border-red-200 py-4 px-8 rounded-2xl mb-4 active:bg-red-100"
        >
          <Icon name="logout" size={22} color="#dc2626" />
          <Text className="text-red-600 text-base font-semibold ml-2">Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text className="text-center text-xs text-gray-400 mt-2">
          AgroTrack+ v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;