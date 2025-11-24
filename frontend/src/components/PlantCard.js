// components/PlantCard.js
import { View, Text, Pressable } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const PlantCard = ({ plant, onEdit }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Calculate days until harvest or days since planting
  const getDaysInfo = () => {
    const now = new Date();
    const harvest = new Date(plant.harvestDate);
    const planting = new Date(plant.plantingDate);
    
    if (plant.status === 'completed') {
      return 'Completed';
    } else if (plant.status === 'in-progress') {
      const daysUntilHarvest = Math.ceil((harvest - now) / (1000 * 60 * 60 * 24));
      return daysUntilHarvest > 0 
        ? `${daysUntilHarvest} days until harvest` 
        : 'Ready to harvest';
    } else {
      const daysUntilPlanting = Math.ceil((planting - now) / (1000 * 60 * 60 * 24));
      return daysUntilPlanting > 0 
        ? `Starts in ${daysUntilPlanting} days` 
        : 'Ready to plant';
    }
  };

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow">
      {/* Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <View className="flex-row items-center">
            <Ionicons name="leaf-outline" size={20} color="#16a34a" />
            <Text className="ml-2 text-lg font-bold">{plant.cropName}</Text>
          </View>
          
          {/* Status badge */}
          <View className={`mt-1 px-3 py-1 rounded-full self-start ${getStatusColor(plant.status)}`}>
            <Text className={`text-sm font-semibold capitalize ${getStatusColor(plant.status).split(' ')[1]}`}>
              {plant.status.replace('-', ' ')}
            </Text>
          </View>

          {/* Days info */}
          <Text className="text-gray-500 text-sm mt-2">
            {getDaysInfo()}
          </Text>
        </View>

        {/* Edit button */}
        <Pressable 
          onPress={onEdit}
          className="bg-green-100 p-3 rounded-xl"
          android_ripple={{ color: 'rgba(22, 163, 74, 0.2)' }}
        >
          <Ionicons name="pencil" size={20} color="#16a34a" />
        </Pressable>
      </View>

      {/* Timeline */}
      <View className="mt-3 border-t border-gray-200 pt-3">
        {/* Planting Date */}
        <View className="flex-row mb-3">
          <View className="items-center w-6">
            <Ionicons
              name={plant.status !== 'upcoming' ? "checkmark-circle" : "ellipse-outline"}
              size={20}
              color={plant.status !== 'upcoming' ? "#16a34a" : "#9ca3af"}
            />
            <View className={`w-px h-8 mt-1 ${plant.status !== 'upcoming' ? 'bg-green-600' : 'bg-gray-300'}`} />
          </View>
          
          <View className="ml-3 flex-1">
            <Text className={`font-semibold ${plant.status !== 'upcoming' ? 'text-green-600' : 'text-gray-400'}`}>
              Planting
            </Text>
            <Text className="text-gray-600 text-sm">
              {formatDate(plant.plantingDate)}
            </Text>
          </View>
        </View>

        {/* Harvest Date */}
        <View className="flex-row">
          <View className="items-center w-6">
            <Ionicons
              name={plant.status === 'completed' ? "checkmark-circle" : 
                    plant.status === 'in-progress' ? "time-outline" : "ellipse-outline"}
              size={20}
              color={plant.status === 'completed' ? "#16a34a" : 
                     plant.status === 'in-progress' ? "#eab308" : "#9ca3af"}
            />
          </View>
          
          <View className="ml-3 flex-1">
            <Text className={`font-semibold ${
              plant.status === 'completed' ? 'text-green-600' : 
              plant.status === 'in-progress' ? 'text-yellow-600' : 'text-gray-400'
            }`}>
              Harvest
            </Text>
            <Text className="text-gray-600 text-sm">
              {formatDate(plant.harvestDate)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlantCard;