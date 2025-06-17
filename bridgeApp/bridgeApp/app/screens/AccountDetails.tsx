import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/colors';
import { useTheme } from '../ThemeContext';

const AccountDetailsScreen: React.FC = () => {
  const { darkModeEnabled } = useTheme();
  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSave = () => {
    // TODO: implement save logic (e.g., call API, validate, show success/error)
    console.log('Saving changes:', { email, password, confirmPassword });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>      
      <View
        style={[
          styles.settingItem,
          {
            backgroundColor: themeColors.cardBackground,
            borderColor: themeColors.cardBorder,
          },
        ]}
      >
        <Text style={[styles.settingText, { color: themeColors.text }]}>Email</Text>
        <TextInput
          style={[styles.input, { borderColor: themeColors.cardBorder, color: themeColors.text }]}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter new email"
          placeholderTextColor={themeColors.text + '80'}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View
        style={[
          styles.settingItem,
          {
            backgroundColor: themeColors.cardBackground,
            borderColor: themeColors.cardBorder,
          },
        ]}
      >
        <Text style={[styles.settingText, { color: themeColors.text }]}>New Password</Text>
        <TextInput
          style={[styles.input, { borderColor: themeColors.cardBorder, color: themeColors.text }]}
          value={password}
          onChangeText={setPassword}
          placeholder="New password"
          placeholderTextColor={themeColors.text + '80'}
          secureTextEntry
        />
      </View>

      <View
        style={[
          styles.settingItem,
          {
            backgroundColor: themeColors.cardBackground,
            borderColor: themeColors.cardBorder,
          },
        ]}
      >
        <Text style={[styles.settingText, { color: themeColors.text }]}>Confirm Password</Text>
        <TextInput
          style={[styles.input, { borderColor: themeColors.cardBorder, color: themeColors.text }]}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
          placeholderTextColor={themeColors.text + '80'}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingItem: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  settingText: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  button: {
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AccountDetailsScreen;
