import { View, Text, TouchableOpacity } from "react-native";

function SectionHeader({ title, action, onPress }) {
  return (
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-xl font-bold text-[#1A1C1B]">{title}</Text>
      <TouchableOpacity 
      onPress={onPress}
      >
        <Text className="text-[#2E7D32] font-semibold text-sm">{action}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SectionHeader;
