import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const AnalyticsScreen = () => {
  const plantData = [
    {
      name: "Tomatoes",
      icon: "🍅",
      planted: 12,
      growing: 8,
      harvested: 4,
      progress: 75,
      progressColor: "#22c55e"
    },
    {
      name: "Lettuce",
      icon: "🥬",
      planted: 8,
      growing: 6,
      harvested: 2,
      progress: 60,
      progressColor: "#22c55e"
    },
    {
      name: "Carrots",
      icon: "🥕",
      planted: 15,
      growing: 12,
      harvested: 3,
      progress: 45,
      progressColor: "#f59e0b"
    },
    {
      name: "Herbs",
      icon: "🌿",
      planted: 6,
      growing: 5,
      harvested: 1,
      progress: 85,
      progressColor: "#22c55e"
    },
    {
      name: "Peppers",
      icon: "🌶️",
      planted: 10,
      growing: 7,
      harvested: 3,
      progress: 65,
      progressColor: "#22c55e"
    },
    {
      name: "Spinach",
      icon: "🥬",
      planted: 20,
      growing: 15,
      harvested: 5,
      progress: 55,
      progressColor: "#f59e0b"
    },
    {
      name: "Cucumbers",
      icon: "🥒",
      planted: 8,
      growing: 6,
      harvested: 2,
      progress: 70,
      progressColor: "#22c55e"
    },
    {
      name: "Radishes",
      icon: "🌶️",
      planted: 25,
      growing: 18,
      harvested: 7,
      progress: 80,
      progressColor: "#22c55e"
    },
    {
      name: "Kale",
      icon: "🥬",
      planted: 12,
      growing: 10,
      harvested: 2,
      progress: 40,
      progressColor: "#f59e0b"
    },
    {
      name: "Broccoli",
      icon: "🥦",
      planted: 6,
      growing: 4,
      harvested: 2,
      progress: 30,
      progressColor: "#ef4444"
    }
  ];

  const totalPlants = plantData.reduce((sum, plant) => sum + plant.planted, 0);
  const readyToHarvest = plantData.filter(plant => plant.progress >= 70).length;

  const ProgressBar = ({ progress, color = "#22c55e" }) => (
    <View style={{ width: '100%', height: 8, backgroundColor: '#e5e7eb', borderRadius: 4 }}>
      <View 
        style={{ 
          width: `${progress}%`, 
          height: 8,
          backgroundColor: color,
          borderRadius: 4
        }} 
      />
    </View>
  );

  const PlantCard = ({ plant }) => (
    <View 
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        marginHorizontal: 20,
        marginBottom: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      {/* Header Row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View 
            style={{ 
              width: 40, 
              height: 40, 
              backgroundColor: '#fef2f2', 
              borderRadius: 20, 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: 12
            }}
          >
            <Text style={{ fontSize: 20 }}>{plant.icon}</Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937' }}>{plant.name}</Text>
        </View>
        <TouchableOpacity 
          style={{ 
            width: 30, 
            height: 30, 
            backgroundColor: '#f3f4f6', 
            borderRadius: 15, 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#6b7280' }}>+</Text>
        </TouchableOpacity>
      </View>
      
      {/* Numbers Row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#16a34a', marginBottom: 4 }}>{plant.planted}</Text>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>Planted</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#ea580c', marginBottom: 4 }}>{plant.growing}</Text>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>Growing</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#16a34a', marginBottom: 4 }}>{plant.harvested}</Text>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>Harvested</Text>
        </View>
      </View>
      
      {/* Progress Section */}
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={{ fontSize: 14, color: '#6b7280' }}>Growth Progress</Text>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#1f2937' }}>{plant.progress}%</Text>
        </View>
        <ProgressBar progress={plant.progress} color={plant.progressColor} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <StatusBar barStyle="light-content" backgroundColor="#22c55e" />
      
      {/* Header */}
      <LinearGradient
        colors={["#22c55e", "#16a34a"]}
        style={{ paddingHorizontal: 20, paddingVertical: 24 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Analytics</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 24, height: 24, backgroundColor: '#ef4444', borderRadius: 12, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>1</Text>
            </View>
            <View style={{ width: 32, height: 32, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>JD</Text>
            </View>
          </View>
        </View>
        <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16 }}>Welcome back, John Doe</Text>
      </LinearGradient>

      <ScrollView 
        style={{ flex: 1 }} 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Plant Performance Section */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 18, marginRight: 8 }}>📈</Text>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1f2937' }}>Plant Performance</Text>
          </View>
          
          {/* Season Summary Card */}
          <View style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', borderWidth: 1, borderRadius: 16, padding: 16 }}>
            <Text style={{ color: '#1f2937', fontWeight: '600', marginBottom: 16, fontSize: 16 }}>Season Summary</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#16a34a', marginBottom: 4 }}>{totalPlants}</Text>
                <Text style={{ color: '#4b5563', fontSize: 14 }}>Total Plants</Text>
              </View>
              <View>
                <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#16a34a', marginBottom: 4 }}>{readyToHarvest}</Text>
                <Text style={{ color: '#4b5563', fontSize: 14 }}>Ready to Harvest</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Plant Cards */}
        <View style={{ paddingTop: 8 }}>
          {plantData.map((plant, index) => (
            <PlantCard key={index} plant={plant} />
          ))}
        </View>
      </ScrollView>


    </SafeAreaView>
  );
};

export default AnalyticsScreen;

// const Analytics = () => {
//   return (
//     <View className="flex-1 justify-center items-center">
//       <Text className="text-lg font-bold">Analytics</Text>
//     </View>
//   )
// }

// export default Analytics