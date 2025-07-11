import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from "../constants/colors";
import { useTheme } from '../ThemeContext';
import { StackNavigationProp } from '@react-navigation/stack';

type Notis = 'All' | 'Limited' | 'None';

type AccountStackParamList = {
  AccountSettings: undefined;
  AccountDetails: undefined;
}

type Props = {
  navigation: StackNavigationProp<AccountStackParamList, 'AccountSettings'>;
}

const AccountSettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { darkModeEnabled, toggleDarkMode } = useTheme();
  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;
  const [notis, setNotis] = useState<Notis>('All');
  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/*Change Account Details*/}
      <TouchableOpacity
        style={[styles.settingItem, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.cardBorder }]}
        onPress={() => navigation.navigate('AccountDetails')}
      >
        <Text style={[styles.settingText, { color: themeColors.text }]}>Change email or password</Text>
        <Text style={[styles.arrow, { color: themeColors.text }]}>→</Text>
      </TouchableOpacity>
      {/*Notifications*/}
      <View style={[styles.settingItem, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.cardBorder }]}>
        <Text style={[styles.settingText, { color: themeColors.text }]}>Location Sharing</Text>
        <View style={[styles.pickerWrapper, {
          backgroundColor: themeColors.cardBackground,
          borderColor: themeColors.cardBorder
        }]}>
          <Picker
            selectedValue={notis}
            style={styles.picker}
            dropdownIconColor={themeColors.text}            // Android dropdown arrow
            onValueChange={val => setNotis(val as Notis)}
            itemStyle={{ color: themeColors.text }}         // iOS item text
          >
            <Picker.Item label="All" value="all"/>
            <Picker.Item label="Limited" value="limited"  />
            <Picker.Item label="Off" value="off"  />
          </Picker>
        </View>
      </View>
        
      <TouchableOpacity 
        style={styles.googleButton}
        activeOpacity={0.7}
      >
        <Image
          source={require('../../assets/images/google_icon.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.googleButtonText}>Link to Google Account</Text>
      </TouchableOpacity>
      
      {/* Logout Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          console.log('Delete Account');
        }}
      >
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
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
  settingText: { fontSize: 16 },
  // wrap around Picker so you get the same card border & radius
  pickerWrapper: {
    borderWidth:   1,
    borderRadius:  8,
    overflow:      'hidden',
  },
  // actual Picker sizing
  picker: {
    height: 32,
    width:  180,
    // you *could* also set backgroundColor & color here,
    // but since we're wrapping it, it's not necessary
  },
  arrow: {
    fontSize: 18,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  googleButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
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
});

export default AccountSettingsScreen;
