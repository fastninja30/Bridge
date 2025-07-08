// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../ThemeContext';
import { Colors } from '../constants/colors';
import * as WebBrowswer from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';


type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgetPassword: undefined;
};


type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Login'>;
};

const { width } = Dimensions.get('window');

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { darkModeEnabled } = useTheme();
  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    
    try {
      navigation.replace('Main' as any);
      await axios.post('http://10.0.2.2:8000/login', { email, password });
      Alert.alert('Success', 'Logged in successfully!');
      
      
    } catch (error: any) {
      console.error(error);
      const errorMsg =
        error.response?.data?.detail || error.message || 'An error occurred during login';
      Alert.alert('Login Failed', errorMsg);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.card, { backgroundColor: themeColors.cardBackground }]}>
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

        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: '#ff6b6b' }]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.googleButton}
          activeOpacity={0.7}
        >
          <Image
            source={require('../../assets/images/google_icon.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.googleButtonText}>Login with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={[styles.forgotText, { color: themeColors.text }]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.signUpText, { color: themeColors.text }]}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CARD_WIDTH = width * 0.6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',       // center horizontally
    padding: 16,
  },
  card: {
    width: CARD_WIDTH,
    padding: 24,
    borderRadius: 12,
    // on iOS:
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // on Android:
    elevation: 4,
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
  googleButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  logoImage: {
    position:'absolute',
    left: 16,
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  forgotText: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;