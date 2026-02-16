import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "@env";
import { useAuth } from "../../context/AuthContext";

const animalTypes = [
  "Cattle",
  "Poultry",
  "Goats",
  "Sheep",
  "Pigs",
  "Horses",
  "Rabbits",
];

const breeds = {
  Cattle: ["Holstein", "Angus", "Jersey", "Simmental"],
  Poultry: ["Broiler", "Layer", "Free-range", "Indigenous"],
  Goats: ["Alpine", "Saanen", "Nigerian Dwarf", "Boer"],
  Sheep: ["Dorper", "Merino", "Romney", "Suffolk"],
  Pigs: ["Large Black", "Duroc", "Yorkshire", "Landrace"],
  Horses: ["Arabian", "Thoroughbred", "Quarter Horse", "Friesian"],
  Rabbits: ["Angora", "Flemish Giant", "New Zealand", "Holland Lop"],
};

const AddAnimals = ({ navigation, route }) => {
  const { token } = useAuth();
  const farmId = route?.params?.farmId;

  const [photo, setPhoto] = useState(null);
  const [animalType, setAnimalType] = useState("");
  const [breed, setBreed] = useState("");
  const [quantity, setQuantity] = useState("");
  const [age, setAge] = useState("");
  const [ageUnit, setAgeUnit] = useState("Months");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [acquisitionDate, setAcquisitionDate] = useState("");
  const [healthStatus, setHealthStatus] = useState("Healthy");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [breedModalVisible, setBreedModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Image library permission not granted");
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.cancelled) {
        setPhoto(result.uri);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Camera permission is required to take a photo.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.7 });
    if (!result.cancelled) setPhoto(result.uri);
  };

  const validate = () => {
    const e = {};
    if (!animalType) e.animalType = "Animal type is required";
    if (!breed) e.breed = "Breed is required";
    if (!quantity || Number.isNaN(Number(quantity))) e.quantity = "Enter a valid quantity";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        farmId,
        animalType,
        breed,
        quantity: Number(quantity),
        age: age ? Number(age) : null,
        ageUnit,
        weight: weight ? Number(weight) : null,
        weightUnit,
        acquisitionDate,
        healthStatus,
        notes,
        photo,
      };

      const res = await fetch(`${API_URL}/api/animals/addAnimal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert("Success", "Animal added successfully");
        // reset
        setAnimalType("");
        setBreed("");
        setQuantity("");
        setAge("");
        setAgeUnit("Months");
        setWeight("");
        setWeightUnit("kg");
        setAcquisitionDate("");
        setHealthStatus("Healthy");
        setNotes("");
        setPhoto(null);
        navigation?.goBack();
      } else {
        console.error(data);
        Alert.alert("Error", data?.message || "Failed to add animal");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Unable to reach server");
    } finally {
      setLoading(false);
    }
  };

  const availableBreeds = breeds[animalType] || [];

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F0]">
      {/* Header */}
      <View className="h-14 bg-green-700 flex-row items-center px-3">
        <TouchableOpacity onPress={() => navigation?.goBack()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-white text-lg font-bold">Add Animals</Text>
        </View>
        <TouchableOpacity className="p-2">
          <Ionicons name="information-circle-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="bg-white rounded-xl p-6 shadow-md">
          {/* Photo */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={pickImage}
            className="items-center justify-center rounded-lg border-2 border-dashed border-gray-300 h-48 mb-4"
          >
            {photo ? (
              <Image source={{ uri: photo }} className="w-full h-full rounded-lg" />
            ) : (
              <View className="items-center">
                <Ionicons name="camera" size={36} color="#9ca3af" />
                <Text className="text-gray-400 mt-2">Add Animal Photo</Text>
                <View className="flex-row mt-2">
                  <TouchableOpacity onPress={pickImage} className="px-3 py-1">
                    <Text className="text-green-700">Choose</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={takePhoto} className="px-3 py-1">
                    <Text className="text-green-700">Take Photo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>

          {/* Animal Type */}
          <Text className="text-green-800 font-medium mb-2">Animal Type</Text>
          <TouchableOpacity
            onPress={() => setTypeModalVisible(true)}
            className="flex-row items-center bg-gray-50 rounded-lg px-3 py-3 mb-3"
          >
            <Ionicons name="paw-outline" size={20} color="#4A7C59" />
            <Text className="flex-1 px-3">{animalType || "Select animal type"}</Text>
            <Ionicons name="chevron-down" size={20} color="#9ca3af" />
          </TouchableOpacity>
          {errors.animalType && <Text className="text-red-500 mb-2">{errors.animalType}</Text>}

          {/* Breed */}
          {animalType && (
            <>
              <Text className="text-green-800 font-medium mb-2">Breed</Text>
              <TouchableOpacity
                onPress={() => setBreedModalVisible(true)}
                className="flex-row items-center bg-gray-50 rounded-lg px-3 py-3 mb-3"
              >
                <Ionicons name="layers-outline" size={20} color="#4A7C59" />
                <Text className="flex-1 px-3">{breed || "Select breed"}</Text>
                <Ionicons name="chevron-down" size={20} color="#9ca3af" />
              </TouchableOpacity>
              {errors.breed && <Text className="text-red-500 mb-2">{errors.breed}</Text>}
            </>
          )}

          {/* Quantity */}
          <Text className="text-green-800 font-medium mb-2">Quantity</Text>
          <View className="flex-row items-center bg-gray-50 rounded-lg px-3 mb-3">
            <Ionicons name="calculator-outline" size={20} color="#4A7C59" />
            <TextInput
              keyboardType="numeric"
              placeholder="e.g., 5"
              value={quantity}
              onChangeText={setQuantity}
              className="flex-1 px-3 py-3"
            />
          </View>
          {errors.quantity && <Text className="text-red-500 mb-2">{errors.quantity}</Text>}

          {/* Age + Unit */}
          <Text className="text-green-800 font-medium mb-2">Age</Text>
          <View className="flex-row items-center mb-3">
            <View className="flex-1 mr-2 bg-gray-50 rounded-lg px-3">
              <TextInput
                keyboardType="numeric"
                placeholder="e.g., 6"
                value={age}
                onChangeText={setAge}
                className="py-3"
              />
            </View>
            <TouchableOpacity
              onPress={() => setAgeUnit((u) => (u === "Months" ? "Years" : "Months"))}
              className="px-4 py-3 border rounded-lg border-gray-200 items-center justify-center"
            >
              <Text className="text-gray-700">{ageUnit}</Text>
            </TouchableOpacity>
          </View>

          {/* Weight + Unit */}
          <Text className="text-green-800 font-medium mb-2">Weight</Text>
          <View className="flex-row items-center mb-3">
            <View className="flex-1 mr-2 bg-gray-50 rounded-lg px-3">
              <TextInput
                keyboardType="numeric"
                placeholder="e.g., 50"
                value={weight}
                onChangeText={setWeight}
                className="py-3"
              />
            </View>
            <TouchableOpacity
              onPress={() => setWeightUnit((u) => (u === "kg" ? "lbs" : "kg"))}
              className="px-4 py-3 border rounded-lg border-gray-200 items-center justify-center"
            >
              <Text className="text-gray-700">{weightUnit}</Text>
            </TouchableOpacity>
          </View>

          {/* Acquisition Date */}
          <Text className="text-green-800 font-medium mb-2">Acquisition Date</Text>
          <View className="flex-row items-center bg-gray-50 rounded-lg px-3 mb-3">
            <Ionicons name="calendar-outline" size={20} color="#4A7C59" />
            <TextInput
              placeholder="YYYY-MM-DD"
              value={acquisitionDate}
              onChangeText={setAcquisitionDate}
              className="flex-1 px-3 py-3"
            />
          </View>

          {/* Health Status */}
          <Text className="text-green-800 font-medium mb-2">Health Status</Text>
          <View className="flex-row items-center bg-gray-50 rounded-lg px-3 mb-3">
            <Ionicons name="heart-outline" size={20} color="#4A7C59" />
            <TextInput
              placeholder="e.g., Healthy"
              value={healthStatus}
              onChangeText={setHealthStatus}
              className="flex-1 px-3 py-3"
            />
          </View>

          {/* Notes */}
          <Text className="text-green-800 font-medium mb-2">Notes</Text>
          <TextInput
            placeholder="Add any additional information about these animals..."
            value={notes}
            onChangeText={setNotes}
            className="bg-gray-50 rounded-lg px-3 py-3 mb-3"
            multiline
            numberOfLines={4}
          />

          {/* Actions */}
          <View>
            <TouchableOpacity
              onPress={submit}
              disabled={loading}
              className={`w-full rounded-lg items-center justify-center py-3 ${
                loading ? "bg-green-400" : "bg-green-700"
              }`}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-semibold">Add Animals</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation?.goBack()}
              className="w-full rounded-lg items-center justify-center py-3 mt-3 border border-green-700"
            >
              <Text className="text-green-700 font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Type Modal */}
      <Modal visible={typeModalVisible} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/30">
          <View className="bg-white rounded-t-xl p-4">
            <Text className="text-lg font-semibold mb-3">Select Animal Type</Text>
            {animalTypes.map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => {
                  setAnimalType(t);
                  setBreed(""); // reset breed when type changes
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

      {/* Breed Modal */}
      <Modal visible={breedModalVisible} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/30">
          <View className="bg-white rounded-t-xl p-4">
            <Text className="text-lg font-semibold mb-3">Select Breed</Text>
            {availableBreeds.map((b) => (
              <TouchableOpacity
                key={b}
                onPress={() => {
                  setBreed(b);
                  setBreedModalVisible(false);
                }}
                className="py-3 border-b border-gray-100"
              >
                <Text>{b}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setBreedModalVisible(false)} className="mt-4 items-center py-3">
              <Text className="text-green-700">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddAnimals;
