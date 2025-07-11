// PhoneValidScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../ThemeContext';
import { Colors } from '../constants/colors';
import { useRoute, RouteProp } from '@react-navigation/native';

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Email: { email: string };
  Phone: undefined;
};

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Phone'>;
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.6;

const PhoneValidScreen: React.FC<Props> = ({ navigation }) => {
  const route = useRoute<RouteProp<AuthStackParamList, 'Phone'>>(); 
  const { darkModeEnabled } = useTheme();
  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;
  const [phone] = useState();
  const [code, setCode] = useState('');

  //const resendEmail TODO: create resend email function
  const phoneValid = async () => {
    try {
      // Adjust this endpoint to whatever your backend expects
      await axios.post('http://10.0.2.2:8000/phone-valid', { phone, code });
      Alert.alert('Success','Phone verified!');
      navigation.navigate("Login");
    } catch (error: any) {
      console.error(error);
      const errorMsg =
        error.response?.data?.detail || error.message || 'An error occurred';
      Alert.alert('Request Failed', errorMsg);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.card, { backgroundColor: themeColors.cardBackground }]}>
        <Text style={[styles.header, { color: themeColors.text }]}>
          Phone Validation
        </Text>
        <Text style={[styles.text, { color: themeColors.text }]}>
          Check your text messages to validate your account
        </Text>

        <Text style={[styles.text, { color: themeColors.text, marginTop: 16 }]}>
          Enter the code sent to your text messages:
        </Text>
        <TextInput
          style={[styles.input, { borderColor: themeColors.text, color: themeColors.text }]}
          placeholder="Verification Code"
          placeholderTextColor={themeColors.text}
          keyboardType="number-pad"
          maxLength={6}
          value={code}
          onChangeText={setCode}
      
        />
        <TouchableOpacity
                  style={[styles.sendButton, { backgroundColor: '#ff6b6b' }]}
                  onPress={phoneValid}
                >
                  <Text style={styles.sendButtonText}>Verify Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={[styles.backText, { color: themeColors.text }]}>
            ← Back to Signup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    // iOS shadow:
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Android elevation:
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
  sendButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  backText: {
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  }
});

export default PhoneValidScreen;
