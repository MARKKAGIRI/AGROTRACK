import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

// 1. EXPANDED DATA WITH SNIPPETS
const newsData = [
  {
    id: 1,
    title: "Kenya set for historic maize harvest of 70M bags",
    snippet: "Agriculture CS confirms the country expects a record-breaking 70 million bags of maize this season following favorable weather and subsidized fertilizer distribution.",
    source: "Citizen Digital",
    handle: "@citizentvkenya",
    time: "2h",
    image: "https://images.unsplash.com/photo-1634467524884-897d0af5e08e?q=80&w=800&auto=format&fit=crop",
    url: "https://www.citizen.digital",
    avatarColor: "bg-orange-100",
    avatarText: "CD"
  },
  {
    id: 2,
    title: "KTDA releases new tea bonus payment rates",
    snippet: "Smallholder tea farmers under KTDA are set to receive their mini-bonus payments next week, with early reports showing a 15% increase from last year's rates.",
    source: "Business Daily",
    handle: "@BD_Africa",
    time: "4h",
    image: "https://images.unsplash.com/photo-1543248939-ff40856f65d4?q=80&w=800&auto=format&fit=crop",
    url: "https://www.businessdailyafrica.com",
    avatarColor: "bg-blue-100",
    avatarText: "BD"
  },
  {
    id: 3,
    title: "Govt announces new fertilizer subsidy prices",
    snippet: "The Ministry of Agriculture has released new guidelines for accessing the subsidized DAP fertilizer ahead of the upcoming long rains planting season.",
    source: "Ministry of Ag",
    handle: "@KilimoKE",
    time: "6h",
    image: "https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?q=80&w=800&auto=format&fit=crop",
    url: "https://kilimo.go.ke",
    avatarColor: "bg-green-100",
    avatarText: "MoA"
  },
  {
    id: 4,
    title: "New coffee reforms promise higher pay for farmers",
    snippet: "New structural reforms in the coffee sector are beginning to bear fruit as local cooperatives report higher direct sales to international buyers in Europe.",
    source: "Farmers Trend",
    handle: "@FarmersTrend",
    time: "12h",
    image: "https://images.unsplash.com/photo-1559525839-8f89773b000a?q=80&w=800&auto=format&fit=crop",
    url: "https://farmerstrend.co.ke",
    avatarColor: "bg-emerald-100",
    avatarText: "FT"
  },
  {
    id: 5,
    title: "Dairy farmers to receive better milk prices from New KCC",
    snippet: "New KCC announces a price increase of Ksh 5 per liter of raw milk delivered to its cooling plants across the country to support farmers against rising feed costs.",
    source: "Standard Media",
    handle: "@StandardKenya",
    time: "1d",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=800&auto=format&fit=crop",
    url: "https://www.standardmedia.co.ke",
    avatarColor: "bg-red-100",
    avatarText: "SM"
  },
  {
    id: 6,
    title: "Avocado exports hit record high in Murang'a County",
    snippet: "Hass avocado farmers in Murang'a celebrate as export volumes hit a new record, driven by recently opened markets in China and India.",
    source: "Business Daily",
    handle: "@BD_Africa",
    time: "2d",
    image: "https://images.unsplash.com/photo-1519162808019-7de1623bb68e?q=80&w=800&auto=format&fit=crop",
    url: "https://www.businessdailyafrica.com",
    avatarColor: "bg-blue-100",
    avatarText: "BD"
  },
  {
    id: 7,
    title: "How to prevent Potato Blight during the long rains",
    snippet: "Agronomists warn farmers in the Rift Valley to adopt preventive spraying schedules as the incoming heavy rains increase the risk of late blight destruction.",
    source: "AgroTips KE",
    handle: "@AgroTips",
    time: "3d",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop",
    url: "https://google.com",
    avatarColor: "bg-yellow-100",
    avatarText: "AT"
  },
];

export default function NewsSection() {
  
  const handleOpenLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View className="mt-8 mb-6 px-1">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-800">Agri-News & Updates</Text>
        
      </View>

      {/* Feed Layout */}
      <View className="space-y-4">
        {newsData.map((item) => (
          <TouchableOpacity 
            key={item.id}
            activeOpacity={0.9}
            onPress={() => handleOpenLink(item.url)}
            className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200 mb-6"
          >
            {/* Header: Avatar, Name, Handle, Time */}
            <View className="flex-row items-center mb-3">
              <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${item.avatarColor}`}>
                <Text className="font-bold text-gray-700 text-xs">{item.avatarText}</Text>
              </View>
              <View className="flex-1 flex-row items-center">
                <Text className="font-bold text-gray-900 mr-1">{item.source}</Text>
                <MaterialCommunityIcons name="check-decagram" size={14} color="#1D9BF0" />
                <Text className="text-gray-500 text-xs ml-1">{item.handle} • {item.time}</Text>
              </View>
              <TouchableOpacity>
                 <Feather name="more-horizontal" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Content: Title & Snippet */}
            <View className="mb-3 pr-2">
                <Text className="text-base font-bold text-gray-900 leading-6 mb-1">
                    {item.title}
                </Text>
                <Text className="text-sm text-gray-600 leading-5" numberOfLines={3}>
                    {item.snippet}
                </Text>
            </View>

            {/* Media: Large Image Attachment */}
            <Image
              source={{ uri: item.image }}
              className="w-full h-48 rounded-2xl bg-gray-100 mb-4 border border-gray-100"
              resizeMode="cover"
            />

            

          </TouchableOpacity>
        ))}
      </View>

      {/* "End of List" Indicator */}
      <View className="items-center mt-8 mb-4">
         <Feather name="check-circle" size={24} color="#D1D5DB" />
         <Text className="text-gray-400 text-xs mt-2 font-medium">You're all caught up</Text>
      </View>
    </View>
  );
}