import MapView, { Marker } from "react-native-maps"
import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"

const MapPicker = ({ latitude, longitude, onLocationSelect }) => {
    const [ selectedLocation, setSelectedLocation ] = useState({
        latitude: latitude || -1.286389,
        longitude: longitude || 36.817223,
    })

    const handlePress = (event) => {
        const coords = event.nativeEvent.coordinate;
        setSelectedLocation(coords);
        onLocationSelect(coords)
    }

    return (
    <View style={{ height: 300, marginVertical: 16 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handlePress}
      >
        <Marker coordinate={selectedLocation} />
      </MapView>
      <Text style={{ textAlign: "center", marginTop: 8 }}>
        Tap on the map to select farm location
      </Text>
    </View>
  );
}

export default MapPicker;