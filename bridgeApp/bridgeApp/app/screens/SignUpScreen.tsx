import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../ThemeContext';
import { Colors } from '../constants/colors';

type RootStackParamList = {
  SignUp: undefined;
  Login: undefined; 
  Phone: { phone: string};
  Email: { email: string };
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const { width } = Dimensions.get('window');

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const { darkModeEnabled } = useTheme();
  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      // Update the URL to your FastAPI backend
      await axios.post('http://10.0.2.2:8000/signup', { phone, email, password });
      Alert.alert('Success', 'User created successfully!');
      // Navigate to the email screen after signup
      navigation.navigate('Email', { email: email });
    } catch (error: any) {
      console.error(error);
      const errorMsg =
        error.response?.data?.detail || error.message || 'An error occurred during sign up';
      Alert.alert('Sign Up Failed', errorMsg);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.card, { backgroundColor: themeColors.cardBackground }]}>
        <Text style={[styles.header, { color: themeColors.text }]}>Sign Up</Text>
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor={themeColors.text}
          value={phone}
          onChangeText={setPhone}
          autoCapitalize="none"
          keyboardType="phone-pad"
          inputMode="tel"
          style={[styles.input, { borderColor: themeColors.cardBorder, color: themeColors.text }]}
        />
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
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={themeColors.text}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={[styles.input, { borderColor: themeColors.cardBorder, color: themeColors.text }]}
        />
        <TouchableOpacity
          style={[styles.signUpButton, { backgroundColor: '#ff6b6b' }]}
          onPress={handleSignUp}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.backText, { color: themeColors.text }]}>
            ← Back to login
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
    alignItems: 'center',
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
  signUpButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  signUpButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  backText: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;