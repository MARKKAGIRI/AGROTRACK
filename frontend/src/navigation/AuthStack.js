import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login/Login';
import Register from '../screens/Signup/signup';

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
