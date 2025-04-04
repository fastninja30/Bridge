import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    SignUp: undefined;
    Login: undefined; // or any other screen you navigate to after signup
  };


  type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

  type Props = {
    navigation: SignUpScreenNavigationProp;
  };
  
  const SignUpScreen: React.FC<Props> = ({ navigation }) => {
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
        const response = await axios.post('http://10.0.2.2:8000/signup', { email, password }); // Usually is http://127.0.0.1:8000/signup
        Alert.alert('Success', 'User created successfully!');
        // Navigate to the login or home screen
        navigation.navigate('Login');
      } catch (error: any) {
        console.error(error);
        const errorMsg =
          error.response?.data?.detail || error.message || 'An error occurred during sign up';
        Alert.alert('Sign Up Failed', errorMsg);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Sign Up" onPress={handleSignUp} />
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
      marginBottom: 24,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 12,
      marginBottom: 16,
      borderRadius: 4,
    },
  });
  
  export default SignUpScreen;
  