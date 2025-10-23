import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const THEME_GREEN = '#4A8B5C';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!EMAIL_REGEX.test(email.trim())) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Weak password', 'Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const handleSignIn = () => {
    if (!validate()) return;
    setLoading(true);
    // placeholder for actual sign-in logic
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Signed in', `Welcome back, ${email.split('@')[0]}!`);
    }, 800);
  };

  const handleGoogle = () => {
    // placeholder for Google sign-in
    Alert.alert('Google sign-in', 'Google auth not implemented in demo.');
  };

  const handleForgotPassword = () => {
    // navigate to forgot password screen or show dialog
    Alert.alert('Forgot Password', 'Password reset flow not implemented in demo.');
  };

  const handleSignUp = () => {
    // navigate to sign up screen
    Alert.alert('Sign Up', 'Navigate to sign up screen.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <MaterialCommunityIcons name="leaf" size={36} color="#fff" accessibilityLabel="Leaf icon" />
              <View style={styles.headerText}>
                <Text style={styles.title}>AgroTrack+</Text>
                <Text style={styles.subtitle}>Welcome back!</Text>
              </View>
            </View>

            {/* Card */}
            <View style={styles.card} accessible accessibilityLabel="Login form">
              <Text style={styles.formHeading}>Sign In to Your Account</Text>

              {/* Email */}
              <View style={styles.inputRow}>
                <MaterialCommunityIcons name="email-outline" size={20} color="#777" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="your.email@example.com"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  value={email}
                  onChangeText={setEmail}
                  accessibilityLabel="Email input"
                />
              </View>

              {/* Password */}
              <View style={styles.inputRow}>
                <Feather name="lock" size={18} color="#777" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  secureTextEntry={secureEntry}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                  accessibilityLabel="Password input"
                />
                <TouchableOpacity
                  onPress={() => setSecureEntry((s) => !s)}
                  style={styles.eyeBtn}
                  accessibilityLabel={secureEntry ? 'Show password' : 'Hide password'}
                >
                  <Feather name={secureEntry ? 'eye-off' : 'eye'} size={18} color="#555" />
                </TouchableOpacity>
              </View>

              {/* Forgot */}
              <TouchableOpacity onPress={handleForgotPassword} accessibilityLabel="Forgot password" style={styles.forgotWrap}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Sign In */}
              <TouchableOpacity
                style={[styles.signInBtn, loading && styles.signInBtnDisabled]}
                onPress={handleSignIn}
                disabled={loading}
                accessibilityLabel="Sign in"
              >
                <Text style={styles.signInText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
              </TouchableOpacity>

              {/* OR divider */}
              <View style={styles.orRow}>
                <View style={styles.line} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line} />
              </View>

              {/* Google */}
              <TouchableOpacity style={styles.googleBtn} onPress={handleGoogle} accessibilityLabel="Continue with Google">
                <FontAwesome name="google" size={18} color="#DB4437" style={styles.googleIcon} />
                <Text style={styles.googleText}>Continue with Google</Text>
              </TouchableOpacity>

              {/* Sign up */}
              <View style={styles.signUpRow}>
                <Text style={styles.noAccountText}>Don't have an account?</Text>
                <TouchableOpacity onPress={handleSignUp} accessibilityLabel="Sign up">
                  <Text style={styles.signUpText}> Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F2F7F3' },
  flex: { flex: 1 },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  header: {
    backgroundColor: THEME_GREEN,
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  headerText: {
    marginLeft: 12,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: '#e8f6ea',
    fontSize: 14,
    marginTop: 2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    width: '100%',
  },
  formHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ececec',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  icon: {
    marginHorizontal: 6,
  },
  input: {
    flex: 1,
    height: 44,
    color: '#222',
    paddingHorizontal: 8,
  },
  eyeBtn: {
    padding: 8,
  },
  forgotWrap: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  forgotText: {
    color: THEME_GREEN,
    fontWeight: '600',
  },
  signInBtn: {
    backgroundColor: THEME_GREEN,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  signInBtnDisabled: {
    opacity: 0.8,
  },
  signInText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e6e6e6',
  },
  orText: {
    marginHorizontal: 12,
    color: '#888',
    fontWeight: '600',
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  googleIcon: {
    marginRight: 10,
  },
  googleText: {
    color: '#333',
    fontWeight: '600',
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  noAccountText: {
    color: '#666',
  },
  signUpText: {
    color: THEME_GREEN,
    fontWeight: '700',
  },
});