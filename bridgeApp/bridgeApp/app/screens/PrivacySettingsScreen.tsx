import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PrivacySettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy Settings</Text>
      <Text style={styles.text}>Manage your privacy preferences here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default PrivacySettingsScreen;