import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  Dimensions,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 80) / 3;

export default function EditFarmGallery({ images = [], onDelete }) {
  const [deletingUrl, setDeletingUrl] = useState(null);

  const confirmDelete = (imageUrl) => {
    Alert.alert("Delete Photo", "Are you sure you want to remove this photo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setDeletingUrl(imageUrl);
          await onDelete(imageUrl);
          setDeletingUrl(null);
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    const isDeleting = deletingUrl === item;

    return (
      <View
        style={{ width: ITEM_WIDTH, height: ITEM_WIDTH }}
        className="m-1 rounded-xl overflow-hidden bg-gray-200 relative shadow-sm"
      >
        <Image
          source={{ uri: item }}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Loading Overlay (Show when deleting) */}
        {isDeleting ? (
          <View className="absolute inset-0 bg-black/60 items-center justify-center z-20">
            <ActivityIndicator color="white" size="small" />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => confirmDelete(item)}
            className="absolute top-1 right-1 bg-white/90 w-7 h-7 rounded-full items-center justify-center shadow-sm z-10"
          >
            <Feather name="trash-2" size={14} color="#ef4444" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (!images || images.length === 0) {
    return (
      <View className="items-center justify-center py-10 opacity-50 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <Feather name="image" size={32} color="gray" />
        <Text className="text-gray-400 text-xs mt-2">No images yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      numColumns={3}
      columnWrapperStyle={{ justifyContent: "flex-start", gap: 4 }} // Clean Grid Alignment
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  );
}
