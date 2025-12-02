import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/signup';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Login appears first */}
      <Stack.Screen name="Login" component={Login} />
      {/* Register appears only when user navigates */}
      <Stack.Screen name="Register" component={Register} />      
    </Stack.Navigator>
  );
}
