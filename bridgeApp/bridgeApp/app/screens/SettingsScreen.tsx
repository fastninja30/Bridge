import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../ThemeContext';
import { Colors } from "../constants/colors";

type SettingsStackParamList = {
  SettingsMain: undefined;
  PrivacySettings: undefined;
  AccountSettings: undefined;
}

type Props = {
  navigation: StackNavigationProp<SettingsStackParamList, 'SettingsMain'>;
}
const SettingsScreen: React.FC<Props> = ({ navigation }) => {

  // State for toggles
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { darkModeEnabled, toggleDarkMode } = useTheme(); // Get theme state
  const [locationEnabled, setLocationEnabled] = useState(true);
  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;
  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Notification Settings */}
      <View style={[styles.settingItem, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.cardBorder }]}>
        <Text style={[styles.settingText, { color: themeColors.text }]}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={notificationsEnabled ? '#007bff' : '#f4f3f4'}
        />
      </View>

      {/* Dark Mode Settings */}
      <View style={[styles.settingItem, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.cardBorder }]}>
        <Text style={[styles.settingText, { color: themeColors.text }]}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={toggleDarkMode}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={darkModeEnabled ? '#007bff' : '#f4f3f4'}
        />
      </View>

      {/* Location Settings */}
      <View style={[styles.settingItem, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.cardBorder }]}>
        <Text style={[styles.settingText, { color: themeColors.text }]}>Enable Location</Text>
        <Switch
          value={locationEnabled}
          onValueChange={setLocationEnabled}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={locationEnabled ? '#007bff' : '#f4f3f4'}
        />
      </View>

      {/* Privacy Settings */}
      <TouchableOpacity
        style={[styles.settingItem, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.cardBorder }]}
        onPress={() => navigation.navigate('PrivacySettings')}
      >
        <Text style={[styles.settingText, { color: themeColors.text }]}>Privacy Settings</Text>
        <Text style={[styles.arrow, { color: themeColors.text }]}>→</Text>
      </TouchableOpacity>

      {/* Account Settings */}
      <TouchableOpacity
        style={[styles.settingItem, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.cardBorder }]}
        onPress={() => navigation.navigate('AccountSettings')}
      >
        <Text style={[styles.settingText, { color: themeColors.text }]}>Account Settings</Text>
        <Text style={[styles.arrow, { color: themeColors.text }]}>→</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          navigation.getParent()?.getParent()?.reset({
            index: 0,
            routes: [{ name: 'Auth' }], 
          });
          console.log('User logged out');
        }}
        
      >
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 18,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;
