import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";

const weatherCodes = {
  0: { label: "Clear", icon: "sunny-outline" },
  1: { label: "Mainly Clear", icon: "partly-sunny-outline" },
  2: { label: "Partly Cloudy", icon: "cloudy-outline" },
  3: { label: "Overcast", icon: "cloud-outline" },
  45: { label: "Foggy", icon: "cloudy-outline" },
  48: { label: "Dense Fog", icon: "cloudy-outline" },
  51: { label: "Light Drizzle", icon: "rainy-outline" },
  61: { label: "Rain", icon: "rainy-outline" },
  71: { label: "Snow", icon: "snow-outline" },
  80: { label: "Rain Showers", icon: "umbrella-outline" },
};

const getWeatherIcon = (code) =>
  weatherCodes[code]?.icon ?? "cloud-outline";

export default function WeatherScreen({ navigation }) {
  const [coords, setCoords] = useState(null);
  const [current, setCurrent] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  const requestLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationError("Location permission denied.");
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setCoords({
        lat: loc.coords.latitude,
        lon: loc.coords.longitude,
      });
    } catch (err) {
      setLocationError("Could not fetch location.");
      setLoading(false);
    }
  };

  const fetchWeather = async (lat, lon) => {
    try {
      setLoading(true);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Africa%2FNairobi`;

      const res = await fetch(url);
      const data = await res.json();

      setCurrent(data.current_weather);

      setHourly(
        data.hourly.time.map((t, i) => ({
          time: t,
          temp: data.hourly.temperature_2m[i],
          code: data.hourly.weathercode[i],
        }))
      );

      setDaily(
        data.daily.time.map((t, i) => ({
          date: t,
          min: data.daily.temperature_2m_min[i],
          max: data.daily.temperature_2m_max[i],
          code: data.daily.weathercode[i],
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  useEffect(() => {
    if (coords) {
      fetchWeather(coords.lat, coords.lon);
    }
  }, [coords]);

  if (loading)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );

  if (locationError)
    return (
      <View className="flex-1 justify-center items-center bg-white px-5">
        <Text className="text-red-600 text-lg text-center">{locationError}</Text>
        <TouchableOpacity
          onPress={requestLocation}
          className="mt-6 bg-green-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <ScrollView
      className="flex-1 bg-green-50"
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => fetchWeather(coords.lat, coords.lon)} />
      }
    >
      {/* HEADER */}
      <LinearGradient
        colors={["#2e7d32", "#66bb6a"]}
        className="pt-14 pb-10 px-5 rounded-b-3xl"
      >
        
        {current && (
          <View className="mt-5 items-center">
            <Ionicons
              name={getWeatherIcon(current.weathercode)}
              size={90}
              color="white"
            />
            <Text className="text-white text-6xl font-bold mt-2">
              {current.temperature}°C
            </Text>
            <Text className="text-white text-xl">
              {weatherCodes[current.weathercode]?.label}
            </Text>
            <Text className="text-white mt-1">
              Wind: {current.windspeed} km/h
            </Text>
          </View>
        )}
      </LinearGradient>

      {/* HOURLY FORECAST */}
      <Text className="text-xl font-bold text-gray-800 mt-6 px-5">
        Next 12 Hours
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 mt-3"
      >
        {hourly.slice(0, 12).map((h, index) => (
          <View
            key={index}
            className="bg-white w-24 mr-3 p-3 rounded-xl shadow items-center"
          >
            <Text className="text-gray-500">
              {new Date(h.time).getHours()}:00
            </Text>
            <Ionicons
              name={getWeatherIcon(h.code)}
              size={30}
              color="#2e7d32"
              className="mt-1"
            />
            <Text className="text-lg font-semibold mt-1">{h.temp}°</Text>
          </View>
        ))}
      </ScrollView>

      {/* DAILY FORECAST */}
      <Text className="text-xl font-bold text-gray-800 mt-8 px-5">
        7-Day Forecast
      </Text>

      <View className="px-5 mt-3 mb-20">
        {daily.map((d, i) => (
          <View
            key={i}
            className="bg-white p-4 mb-3 rounded-xl shadow flex-row justify-between items-center"
          >
            <View>
              <Text className="font-semibold text-gray-800">
                {new Date(d.date).toDateString()}
              </Text>
              <Text className="text-gray-600">
                {weatherCodes[d.code]?.label}
              </Text>
            </View>

            <Ionicons
              name={getWeatherIcon(d.code)}
              size={32}
              color="#2e7d32"
            />

            <Text className="text-gray-700 font-semibold text-lg">
              {d.max}° / {d.min}°
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
