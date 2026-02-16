import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Or your icon library
import * as ImagePicker from "expo-image-picker";
import { API_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@env";
import { useAuth } from "../context/AuthContext"; // Import your hook

export default function ProfileAvatar() {
  const { user, token, updateUser } = useAuth(); // Access global user state
  const [uploading, setUploading] = useState(false);

  // 1. Pick Image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      handleUpload(result.assets[0].uri);
    }
  };

  // 2. Upload to Cloudinary & Update Backend
  const handleUpload = async (uri) => {
    setUploading(true);
    try {
      // A. Cloudinary Upload
      const data = new FormData();
      data.append("file", {
        uri: uri,
        type: "image/jpeg",
        name: `profile_${user.user_id}.jpg`,
      });
      data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "post",
          body: data,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const cloudData = await cloudRes.json();

      if (cloudData.secure_url) {
        // B. Update Backend (Neon)
        // Replace YOUR_IP with your computer's IP (e.g., 192.168.x.x) if using real device
        const backendRes = await fetch(
          `${API_URL}/images/users/${user.user_id}`,
          {
            method: "PATCH", // or PATCH
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Assuming your backend needs auth
            },
            body: JSON.stringify({
              imageUrl: cloudData.secure_url,
            }),
          },
        );

        if (backendRes.ok) {
          // C. Update Local State (So the UI updates instantly)
          await updateUser({ profilePicture: cloudData.secure_url });
          Alert.alert("Success", "Profile photo updated!");
        } else {
          Alert.alert("Error", "Failed to save to account");
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="relative">
      {/* 1. The Image or Placeholder */}
      <View className="w-24 h-24 rounded-full border-4 border-white shadow-sm bg-gray-200 overflow-hidden items-center justify-center">
        {user?.profilePicture ? (
          <Image
            source={{ uri: user.profilePicture }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Icon name="user" size={40} color="#9ca3af" />
        )}

        {/* Loading Overlay */}
        {uploading && (
          <View className="absolute inset-0 bg-black/40 items-center justify-center">
            <ActivityIndicator color="#fff" />
          </View>
        )}
      </View>

      {/* 2. The Edit Button */}
      <TouchableOpacity
        onPress={pickImage}
        disabled={uploading}
        className="absolute bottom-0 right-0 bg-[#388e3c] w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-sm"
      >
        <Icon name="camera" size={14} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
