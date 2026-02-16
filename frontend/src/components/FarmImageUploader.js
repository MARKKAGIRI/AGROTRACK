import React, { useState } from 'react';
import { View, Button, Image, Alert, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET, API_URL } from "@env";
import { useAuth } from '../context/AuthContext'; 

export default function FarmImageUploader({ farmId, onImageUploaded }) {
  const { token } = useAuth(); 
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 1. Pick Image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  

  const handleUpload = async () => {
    if (!image) return;
    setUploading(true);

    try {
      const data = new FormData();
      data.append('file', {
        uri: image,
        type: 'image/jpeg',
        name: `farm_${farmId}_${Date.now()}.jpg`,
      });
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      data.append('cloud_name', CLOUDINARY_CLOUD_NAME);
      data.append('folder', 'agrotrack_farms');

      const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'post',
        body: data,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const cloudData = await cloudRes.json();

      if (cloudData.secure_url) {
        await saveToBackend(cloudData.secure_url);
      } else {
        Alert.alert("Error", "Cloudinary upload failed");
      }

    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  const saveToBackend = async (url) => {
    try {
      const res = await fetch(`${API_URL}/images/farms/${farmId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          imageUrl: url
        })
      });

      if (res.ok) {
        Alert.alert("Success", "Farm photo added!");
        setImage(null); // Clear preview
        if (onImageUploaded) onImageUploaded(url);
      } else {
        const err = await res.text();
        console.log("Backend Error:", err);
        Alert.alert("Error", "Failed to save to farm.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Network request failed");
    }
  };

  return (
    <View className="p-4 bg-white rounded-lg shadow-sm mt-4">
      <Text className="text-lg font-bold text-gray-800 mb-2">Add Farm Photo</Text>
      
      {/* Preview Area */}
      {image ? (
        <View className="mb-4">
          <Image source={{ uri: image }} className="w-full h-48 rounded-lg mb-2" resizeMode="cover" />
          <View className="flex-row justify-between">
             <Button title="Cancel" onPress={() => setImage(null)} color="#ff4444" />
             {uploading ? (
               <ActivityIndicator size="small" color="#388e3c" />
             ) : (
               <Button title="Upload Photo" onPress={handleUpload} color="#388e3c" />
             )}
          </View>
        </View>
      ) : (
        <TouchableOpacity 
          onPress={pickImage}
          className="h-12 border-2 border-dashed border-gray-300 rounded-lg items-center justify-center bg-gray-50"
        >
          <Text className="text-gray-500">+ Select Photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}