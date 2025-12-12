import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth } from "../../context/AuthContext";
import { getAllCrops, addCropCycle } from "../../services/cropApi";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function AddCropCycleScreen() {
  const { token } = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const { farmId } = route.params;

  const [cropList, setCropList] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [cropModalVisible, setCropModalVisible] = useState(false);

  const [plantingDate, setPlantingDate] = useState(new Date());
  const [harvestDate, setHarvestDate] = useState(null);

  const [showPlantingPicker, setShowPlantingPicker] = useState(false);
  const [showHarvestPicker, setShowHarvestPicker] = useState(false);

  // Load crops on mount
  useEffect(() => {
    const loadCrops = async () => {
      const res = await getAllCrops(token);
      if (res.success) setCropList(res.crops);
    };
    loadCrops();
  }, []);

  const handleSubmit = async () => {
    if (!selectedCrop) {
      Alert.alert("Error", "Please select a crop.");
      return;
    }

    const payload = {
      cropId: selectedCrop.id,
      plantingDate,
      harvestDate,
      status: "planted",
    };

    const res = await addCropCycle(farmId, payload, token);

    if (res.success) {
      Alert.alert("Success", "Crop cycle added successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      Alert.alert("Error", res.message || "Failed to add crop cycle");
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-5">
      {/* Header */}
      <View className="flex-row items-center mb-5">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2e7d32" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800 ml-3">
          Add Crop Cycle
        </Text>
      </View>

      {/* Crop Selector */}
      <Text className="text-gray-600 mb-2">Select Crop</Text>
      <TouchableOpacity
        onPress={() => setCropModalVisible(true)}
        className="bg-white px-4 py-3 rounded-xl border border-gray-200"
      >
        <Text className="text-gray-700">
          {selectedCrop ? selectedCrop.cropName : "Choose a crop"}
        </Text>
      </TouchableOpacity>

      {/* Crop Modal */}
      <Modal
        visible={cropModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1 justify-center bg-black/30 p-5">
          <View className="bg-white rounded-xl p-5 max-h-[80%]">
            <Text className="text-lg font-bold mb-4">Select a Crop</Text>
            <FlatList
              data={cropList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`p-3 rounded-xl mb-2 ${
                    selectedCrop?.id === item.id
                      ? "bg-green-100"
                      : "bg-gray-50"
                  }`}
                  onPress={() => {
                    setSelectedCrop(item);
                    setCropModalVisible(false);
                  }}
                >
                  <Text className="text-gray-800 font-semibold">
                    {item.cropName}
                  </Text>
                  <Text className="text-gray-400 text-xs">{item.cropType}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setCropModalVisible(false)}
              className="mt-3 bg-gray-200 py-2 rounded-xl items-center"
            >
              <Text className="text-gray-700 font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Planting Date */}
      <View className="mt-5">
        <Text className="text-gray-600 mb-2">Planting Date</Text>
        <TouchableOpacity
          onPress={() => setShowPlantingPicker(true)}
          className="bg-white px-4 py-3 rounded-xl border border-gray-200"
        >
          <Text className="text-gray-700">{plantingDate.toDateString()}</Text>
        </TouchableOpacity>
        {showPlantingPicker && (
          <DateTimePicker
            value={plantingDate}
            mode="date"
            onChange={(event, date) => {
              setShowPlantingPicker(false);
              if (date) setPlantingDate(date);
            }}
          />
        )}
      </View>

      {/* Harvest Date */}
      <View className="mt-5">
        <Text className="text-gray-600 mb-2">
          Expected Harvest Date (Optional)
        </Text>
        <TouchableOpacity
          onPress={() => setShowHarvestPicker(true)}
          className="bg-white px-4 py-3 rounded-xl border border-gray-200"
        >
          <Text className="text-gray-700">
            {harvestDate ? harvestDate.toDateString() : "Select Date"}
          </Text>
        </TouchableOpacity>
        {showHarvestPicker && (
          <DateTimePicker
            value={harvestDate || new Date()}
            mode="date"
            onChange={(event, date) => {
              setShowHarvestPicker(false);
              if (date) setHarvestDate(date);
            }}
          />
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="mt-10 bg-green-600 py-4 rounded-2xl items-center"
      >
        <Text className="text-white font-bold">Add Crop Cycle</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
