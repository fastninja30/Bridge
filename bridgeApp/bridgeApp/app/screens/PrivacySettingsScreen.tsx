import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { useTheme } from '../ThemeContext';

const PrivacySettingsScreen = () => {
  const { darkModeEnabled } = useTheme();
  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;
  return (
    <View style={[styles.container, { backgroundColor: themeColors.container}]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Privacy Settings</Text>
      <Text style={[styles.text, {color: themeColors.text }]}>Manage your privacy preferences here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
  },
});

export default PrivacySettingsScreen;