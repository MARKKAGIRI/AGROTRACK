// screens/crops/EditCropScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateCrop, setAuthToken } from '../../services/cropApi';
import { useAuth } from '../../context/AuthContext';

const EditCropScreen = ({ navigation, route }) => {
  const { farmId, crop } = route.params; // Pass crop data from previous screen
  const { token } = useAuth();
  
  const [cropName, setCropName] = useState(crop.cropName);
  const [plantingDate, setPlantingDate] = useState(new Date(crop.plantingDate));
  const [harvestDate, setHarvestDate] = useState(new Date(crop.harvestDate));
  const [status, setStatus] = useState(crop.status);
  const [showPlantingPicker, setShowPlantingPicker] = useState(false);
  const [showHarvestPicker, setShowHarvestPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const statusOptions = ['upcoming', 'in-progress', 'completed'];

  const handleSubmit = async () => {
    // Validation
    if (!cropName.trim()) {
      Alert.alert('Error', 'Please enter a crop name');
      return;
    }

    if (harvestDate <= plantingDate) {
      Alert.alert('Error', 'Harvest date must be after planting date');
      return;
    }

    setLoading(true);
    setAuthToken(token);

    try {
      const cropData = {
        cropName: cropName.trim(),
        plantingDate: plantingDate.toISOString(),
        harvestDate: harvestDate.toISOString(),
        status,
      };

      const response = await updateCrop(farmId, crop.id, cropData);
      
      Alert.alert('Success', 'Crop cycle updated successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update crop cycle');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 p-4">

        {/* Form */}
        <View className="bg-white rounded-2xl p-4 shadow">
          {/* Crop Name */}
          <View className="mb-4">
            <Text className="text-gray-700 font-semibold mb-2">Crop Name *</Text>
            <TextInput
              className="bg-gray-50 border border-gray-300 rounded-xl p-3"
              placeholder="e.g., Tomatoes, Corn, Wheat"
              value={cropName}
              onChangeText={setCropName}
            />
          </View>

          {/* Planting Date */}
          <View className="mb-4">
            <Text className="text-gray-700 font-semibold mb-2">
              Planting Date *
            </Text>
            <Pressable
              onPress={() => setShowPlantingPicker(true)}
              className="bg-gray-50 border border-gray-300 rounded-xl p-3 flex-row justify-between items-center"
            >
              <Text className="text-gray-800">{formatDate(plantingDate)}</Text>
              <Ionicons name="calendar-outline" size={20} color="#6b7280" />
            </Pressable>
          </View>

          {showPlantingPicker && (
            <DateTimePicker
              value={plantingDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowPlantingPicker(false);
                if (date) setPlantingDate(date);
              }}
            />
          )}

          {/* Harvest Date */}
          <View className="mb-4">
            <Text className="text-gray-700 font-semibold mb-2">
              Expected Harvest Date *
            </Text>
            <Pressable
              onPress={() => setShowHarvestPicker(true)}
              className="bg-gray-50 border border-gray-300 rounded-xl p-3 flex-row justify-between items-center"
            >
              <Text className="text-gray-800">{formatDate(harvestDate)}</Text>
              <Ionicons name="calendar-outline" size={20} color="#6b7280" />
            </Pressable>
          </View>

          {showHarvestPicker && (
            <DateTimePicker
              value={harvestDate}
              mode="date"
              display="default"
              minimumDate={plantingDate}
              onChange={(event, date) => {
                setShowHarvestPicker(false);
                if (date) setHarvestDate(date);
              }}
            />
          )}

          {/* Status */}
          <View className="mb-4">
            <Text className="text-gray-700 font-semibold mb-2">Status *</Text>
            <View className="flex-row flex-wrap">
              {statusOptions.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => setStatus(option)}
                  className={`mr-2 mb-2 px-4 py-2 rounded-full ${
                    status === option ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <Text
                    className={`${
                      status === option ? 'text-white' : 'text-gray-700'
                    } font-semibold capitalize`}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <Pressable
          onPress={handleSubmit}
          disabled={loading}
          className={`mt-6 rounded-xl p-4 ${
            loading ? 'bg-gray-400' : 'bg-green-600'
          }`}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.3)' }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-center text-white text-lg font-semibold">
              Update Crop Cycle
            </Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditCropScreen;