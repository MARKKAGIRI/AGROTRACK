import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useAuth } from "../../context/AuthContext";
import { addFarm as addFarmApi } from "../../services/farmApi";
import { useNavigation } from '@react-navigation/native';
import MapPicker from "../../components/MapPicker";

const farmTypes = [
  "Crop Farm",
  "Livestock",
  "Mixed",
  "Orchard",
  "Greenhouse",
];

const AddFarm = () => {
  const { token } = useAuth();
  const navigation = useNavigation()

  const [name, setName] = useState("");
  const [locationText, setLocationText] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("Acres");
  const [type, setType] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [typeModalVisible, setTypeModalVisible] = useState(false);

  
  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Farm name is required";
    if (!locationText.trim()) e.location = "Location is required";
    if (!size || Number.isNaN(Number(size))) e.size = "Enter a valid size";
    if (!type) e.type = "Farm type is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        location: locationText.trim(),
        size: Number(size),
        unit,
        type,
        latitude,
        longitude,
      };

      await addFarmApi(payload, token);

      Alert.alert("Success", "Farm added successfully");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err?.message || "Failed to add farm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F0]">      

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="bg-white rounded-xl p-6 shadow-md">
          {/* Farm Name */}
          <Text className="text-green-800 font-medium mb-2">Farm Name</Text>
          <View className="flex-row items-center bg-gray-50 rounded-lg px-3 mb-3">
            <Ionicons name="home-outline" size={20} color="#4A7C59" />
            <TextInput
              placeholder="e.g., Green Valley Farm"
              value={name}
              onChangeText={setName}
              className="flex-1 px-3 py-3"
            />
          </View>
          {errors.name && <Text className="text-red-500 mb-2">{errors.name}</Text>}

          {/* Location */}
          <Text className="text-green-800 font-medium mb-2">Location</Text>
          <View className="flex-row items-center bg-gray-50 rounded-lg px-3 mb-2">
            <Ionicons name="location-outline" size={20} color="#4A7C59" />
            <TextInput
              placeholder="Enter farm address or coordinates"
              value={locationText}
              onChangeText={setLocationText}
              className="flex-1 px-3 py-3"
            />
          </View>
          <MapPicker
		  latitude={latitude}
		  longitude={longitude}
		  onLocationSelect={(coords) => {
			setLatitude(coords.latitude)
			setLongitude(coords.longitude)
		  }}
		  />
          {errors.location && <Text className="text-red-500 mb-2">{errors.location}</Text>}

          {/* Size + Unit */}
          <Text className="text-green-800 font-medium mb-2">Farm Size</Text>
          <View className="flex-row items-center mb-3">
            <View className="flex-1 mr-2 bg-gray-50 rounded-lg px-3">
              <TextInput
                keyboardType="numeric"
                placeholder="e.g., 10"
                value={size}
                onChangeText={setSize}
                className="py-3"
              />
            </View>
            <TouchableOpacity
              onPress={() => setUnit((u) => (u === "Acres" ? "Hectares" : "Acres"))}
              className="px-4 py-3 border rounded-lg border-gray-200 items-center justify-center"
            >
              <Text className="text-gray-700">{unit}</Text>
            </TouchableOpacity>
          </View>
          {errors.size && <Text className="text-red-500 mb-2">{errors.size}</Text>}

          {/* Farm Type */}
          <Text className="text-green-800 font-medium mb-2">Farm Type</Text>
          <TouchableOpacity
            onPress={() => setTypeModalVisible(true)}
            className="flex-row items-center bg-gray-50 rounded-lg px-3 py-3 mb-3"
          >
            <Ionicons name="layers-outline" size={20} color="#4A7C59" />
            <Text className="flex-1 px-3">{type || "Select farm type"}</Text>
            <Ionicons name="chevron-down" size={20} color="#9ca3af" />
          </TouchableOpacity>
          {errors.type && <Text className="text-red-500 mb-2">{errors.type}</Text>}

          {/* Submit */}
          <TouchableOpacity
            onPress={submit}
            disabled={loading}
            className={`w-full rounded-lg items-center justify-center py-3 ${
              loading ? "bg-green-400" : "bg-green-700"
            }`}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-semibold">Add Farm</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Type modal */}
      <Modal visible={typeModalVisible} animationType="slide" transparent>
        <View className="flex-1 justify-end ">
          <View className="bg-white rounded-t-xl p-4">
            <Text className="text-lg font-semibold mb-3">Select Farm Type</Text>
            {farmTypes.map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => {
                  setType(t);
                  setTypeModalVisible(false);
                }}
                className="py-3 border-b border-gray-100"
              >
                <Text>{t}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setTypeModalVisible(false)} className="mt-4 items-center py-3">
              <Text className="text-green-700">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddFarm;
