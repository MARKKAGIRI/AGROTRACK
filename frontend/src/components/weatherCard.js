import React, { useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import { OPENWEATHER_API_KEY } from "@env";

const NAIROBI_COORDS = {
  latitude: -1.2921,
  longitude: 36.8219,
};

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [locationName, setLocationName] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  const getIcon = (condition, iconCode) => {
    if (!condition)
      return "https://cdn-icons-png.flaticon.com/512/1163/1163661.png"; // Default

    const main = condition.toLowerCase();
    const isNight = iconCode?.includes("n");

    if (isNight && (main.includes("clear") || main.includes("sun"))) {
      return "https://cdn-icons-png.flaticon.com/512/740/740878.png"; // Moon & Stars
    }

    // 2. Handle Standard Conditions
    if (main.includes("cloud"))
      return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
    if (main.includes("rain") || main.includes("drizzle"))
      return "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
    if (main.includes("thunder"))
      return "https://cdn-icons-png.flaticon.com/512/1163/1163663.png";
    if (main.includes("snow"))
      return "https://cdn-icons-png.flaticon.com/512/2315/2315302.png";
    if (main.includes("clear") || main.includes("sun"))
      return "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Sun

    return "https://cdn-icons-png.flaticon.com/512/1163/1163661.png"; // Default Part Sun/Cloud
  };

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`,
      );
      const data = await response.json();

      if (data.list) {
        setWeather(data.list[0]);
        setForecast([data.list[8], data.list[16], data.list[24]]); // Next 3 days

        if (data.city && data.city.name) {
          setLocationName(data.city.name);
        } else {
          setLocationName("Unknown Location");
        }
      }
    } catch (error) {
      console.error("API Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          fetchWeather(NAIROBI_COORDS.latitude, NAIROBI_COORDS.longitude);
          return;
        }

        const locationPromise = await Promise.race([
          Location.getCurrentPositionAsync({}),
          new Promise((_, reject) =>
            setTimeout(() => reject("GPS Timeout"), 2000),
          ),
        ]);

        fetchWeather(
          locationPromise.coords.latitude,
          locationPromise.coords.longitude,
        );
      } catch (err) {
        console.log("Using Default Location (Nairobi)");
        fetchWeather(NAIROBI_COORDS.latitude, NAIROBI_COORDS.longitude);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View className="w-full bg-white rounded-3xl p-5 mb-6 shadow-sm border border-gray-200 h-40 justify-center items-center">
        <ActivityIndicator size="small" color="#166534" />
        <Text className="text-gray-400 text-xs mt-2">Checking forecast...</Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View className="w-full bg-white rounded-3xl p-5 mb-6 shadow-sm border border-gray-200 h-32 justify-center items-center">
        <Text className="text-gray-400">Weather Unavailable</Text>
        <Text className="text-gray-300 text-xs">Check Internet Connection</Text>
      </View>
    );
  }

  return (
    <View className="max-h-36 w-full flex-row justify-between mb-6 border border-gray-200 bg-white rounded-3xl p-5 shadow-sm">
      {/* LEFT SIDE: Today's Weather + Location */}
      <View className="flex-1 border-r border-gray-100 pr-4">
        {/* Location Header */}
        <View className="flex-row items-center mb-1">
          <Feather name="map-pin" size={12} color="#166534" />
          <Text
            className="text-green-800 font-bold text-xs ml-1"
            numberOfLines={1}
          >
            {locationName}
          </Text>
        </View>

        <Text className="text-gray-400 text-[10px] mb-2">
          Today •{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </Text>

        <View className="flex-row items-center">
          <Image
            source={{
              uri: getIcon(weather.weather[0].main, weather.weather[0].icon),
            }}
            className="w-10 h-10"
            resizeMode="contain"
          />
          <Text className="ml-2 text-3xl font-bold text-[#1A1C1B]">
            {Math.round(weather.main.temp)}°
          </Text>
        </View>

        <Text
          className="text-gray-500 text-xs capitalize mt-1"
          numberOfLines={1}
        >
          {weather.weather[0].description}
        </Text>
      </View>

      {/* RIGHT SIDE: 3-Day Forecast */}
      <View className="flex-row justify-between flex-1 pl-4 pt-1">
        {forecast.map((day, index) => {
          if (!day) return null;
          const date = new Date(day.dt * 1000);
          const dayName = date.toLocaleDateString("en-US", {
            weekday: "short",
          });

          return (
            <View
              key={index}
              className="items-center justify-between h-full py-1"
            >
              <Text className="text-gray-400 text-[10px] font-medium">
                {dayName}
              </Text>
              <Image
                source={{
                  uri: getIcon(day.weather[0].main, day.weather[0].icon),
                }}
                className="w-6 h-6 my-1"
                resizeMode="contain"
              />
              <Text className="text-[#1A1C1B] font-bold text-xs">
                {Math.round(day.main.temp)}°
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
