// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../ThemeContext';
import { Colors } from '../constants/colors';

type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined; 
  SignUpScreen: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { darkModeEnabled } = useTheme();
  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Update the URL to your FastAPI backend
      const response = await axios.post('http://10.0.2.2:8000/login', { email, password });
      Alert.alert('Success', 'Logged in successfully!');
      // Navigate to the home screen (or another screen as needed)
      navigation.navigate('Main');
    } catch (error: any) {
      console.error(error);
      const errorMsg =
        error.response?.data?.detail || error.message || 'An error occurred during login';
      Alert.alert('Login Failed', errorMsg);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.header, { color: themeColors.text }]}>Login</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={themeColors.text}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={[styles.input, { borderColor: themeColors.cardBorder, color: themeColors.text }]}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={themeColors.text}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, { borderColor: themeColors.cardBorder, color: themeColors.text }]}
      />
      <TouchableOpacity style={[styles.loginButton, { backgroundColor: '#ff6b6b' }]} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
        <Text style={[styles.signUpText, { color: themeColors.text }]}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
    borderRadius: 4,
  },
  loginButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
