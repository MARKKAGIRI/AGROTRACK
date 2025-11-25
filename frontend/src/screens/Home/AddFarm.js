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
import * as Location from "expo-location";
import { API_URL } from "@env";
import { useAuth } from "../../context/AuthContext";
import { addFarm as addFarmApi } from "../../services/farmApi";


const suggestedCrops = [
	"Tomatoes",
	"Corn",
	"Wheat",
	"Vegetables",
	"Fruits",
];

const farmTypes = [
	"Crop Farm",
	"Livestock",
	"Mixed",
	"Orchard",
	"Greenhouse",
];

const AddFarm = ({ navigation }) => {
	const { token, user } = useAuth();

	const [photo, setPhoto] = useState(null);
	const [name, setName] = useState("");
	const [locationText, setLocationText] = useState("");
	const [size, setSize] = useState("");
	const [unit, setUnit] = useState("Acres");
	const [type, setType] = useState("");
	const [crops, setCrops] = useState([]);
	const [customCrop, setCustomCrop] = useState("");
	const [notes, setNotes] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [typeModalVisible, setTypeModalVisible] = useState(false);

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

			if (!result.canceled) {
				setPhoto(result.assets[0].uri);
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

		const result = await ImagePicker.launchCameraAsync({
			allowsEditing: false,
			quality: 0.7,
		});

		if (!result.canceled) {
			setPhoto(result.assets[0].uri);
		}
	};

	const useCurrentLocation = async () => {
		try {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Permission required", "Location permission is required to use current location.");
				return;
			}
			const loc = await Location.getCurrentPositionAsync({});
			const reverse = await Location.reverseGeocodeAsync({
				latitude: loc.coords.latitude,
				longitude: loc.coords.longitude,
			});
			if (reverse && reverse.length > 0) {
				const place = reverse[0];
				const addr = `${place.name || ""} ${place.city || ""} ${place.region || ""} ${place.postalCode || ""}`.trim();
				setLocationText(addr || `${loc.coords.latitude.toFixed(4)}, ${loc.coords.longitude.toFixed(4)}`);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const toggleCrop = (crop) => {
		if (crops.includes(crop)) {
			setCrops(crops.filter((c) => c !== crop));
		} else {
			setCrops([...crops, crop]);
		}
	};

	const addCustomCrop = () => {
		const trimmed = customCrop.trim();
		if (!trimmed) return;
		if (!crops.includes(trimmed)) setCrops([...crops, trimmed]);
		setCustomCrop("");
	};

	const validate = () => {
		const e = {};
		if (!name.trim()) e.name = "Farm name is required";
		if (!locationText.trim()) e.location = "Location is required";
		if (!size || Number.isNaN(Number(size))) e.size = "Enter a valid size";
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
			crops,
			notes,
			photo, // you may handle uploading separately
		};

		const data = await addFarmApi(payload, user.user_id, token); // <-- use API service

		Alert.alert("Success", "Farm added successfully");

		// Reset form
		setName("");
		setLocationText("");
		setSize("");
		setUnit("Acres");
		setType("");
		setCrops([]);
		setNotes("");
		setPhoto(null);
		navigation?.goBack();

	} catch (err) {
		console.error(err);
		Alert.alert("Error", err?.message || "Failed to add farm");
	} finally {
		setLoading(false);
	}
};


	return (
		<SafeAreaView className="flex-1 bg-[#F5F5F0]">
			{/* Header */}
			<View className="h-14 bg-green-700 flex-row items-center px-3">
				<TouchableOpacity onPress={() => navigation?.goBack()} className="p-2">
					<Ionicons name="arrow-back" size={24} color="#fff" />
				</TouchableOpacity>
				<View className="flex-1 items-center">
					<Text className="text-white text-lg font-bold">Add New Farm</Text>
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
								<Text className="text-gray-400 mt-2">Add Farm Photo</Text>
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

					{/* Name */}
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
							placeholder="Enter farm address"
							value={locationText}
							onChangeText={setLocationText}
							className="flex-1 px-3 py-3"
						/>
					</View>
					<TouchableOpacity onPress={useCurrentLocation} className="mb-3">
						<Text className="text-green-700">Use Current Location</Text>
					</TouchableOpacity>
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

					{/* Crops multi-select */}
					<Text className="text-green-800 font-medium mb-2">Primary Crops</Text>
					<View className="flex-row flex-wrap mb-3">
						{suggestedCrops.map((c) => (
							<TouchableOpacity
								key={c}
								onPress={() => toggleCrop(c)}
								className={`px-3 py-2 mr-2 mb-2 rounded-full border ${
									crops.includes(c) ? "bg-green-100 border-green-200" : "bg-gray-100 border-gray-200"
								}`}
							>
								<Text className={`${crops.includes(c) ? "text-green-800" : "text-gray-700"}`}>{c}</Text>
							</TouchableOpacity>
						))}
					</View>
					<View className="flex-row items-center mb-3">
						<TextInput
							placeholder="Add custom crop"
							value={customCrop}
							onChangeText={setCustomCrop}
							className="flex-1 bg-gray-50 rounded-lg px-3 py-3 mr-2"
						/>
						<TouchableOpacity onPress={addCustomCrop} className="px-4 py-3 bg-green-600 rounded-lg">
							<Ionicons name="add" size={20} color="#fff" />
						</TouchableOpacity>
					</View>

					{/* Notes */}
					<Text className="text-green-800 font-medium mb-2">Notes</Text>
					<TextInput
						placeholder="Add any additional information about your farm..."
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
							{loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-semibold">Add Farm</Text>}
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

			{/* Type modal */}
			<Modal visible={typeModalVisible} animationType="slide" transparent>
				<View className="flex-1 justify-end bg-black/30">
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
