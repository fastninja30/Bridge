import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from "../constants/colors";
import { useTheme } from '../ThemeContext';

type Visibility = 'Everyone' | 'MatchesOnly' | 'Nobody';
type LocationSharing = 'Precise' | 'Approximate' | 'Off';
type Message = 'Everyone' | 'MatchesOnly' | 'Nobody';

const PrivacySettingsScreen: React.FC = () => {
  const { darkModeEnabled, toggleDarkMode } = useTheme();
  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;
  const [visibility, setVisibility] = useState<Visibility>('Everyone');
  const [locationSharing, setLocationSharing] = useState<LocationSharing>('Off');
  const [message, setMessage] = useState<Message>('Everyone');
  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/*Profile Visibility*/}
      <View style={[styles.settingItem, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.cardBorder }]}>
        <Text style={[styles.settingText, { color: themeColors.text }]}>Who can see your profile</Text>
        <View style={[styles.pickerWrapper, {
          backgroundColor: themeColors.cardBackground,
          borderColor: themeColors.cardBorder
        }]}>
          <Picker
            selectedValue={visibility}
            style={styles.picker}
            dropdownIconColor={themeColors.text}            // Android dropdown arrow
            onValueChange={val => setVisibility(val as Visibility)}
            itemStyle={{ color: themeColors.text }}         // iOS item text
          >
            <Picker.Item label="Everyone"     value="Everyone"     />
            <Picker.Item label="Matches Only" value="MatchesOnly"  />
            <Picker.Item label="Nobody"       value="Nobody"        />
          </Picker>
        </View>
      </View>
      {/*Message*/}
      <View style={[styles.settingItem, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.cardBorder }]}>
        <Text style={[styles.settingText, { color: themeColors.text }]}>Who can message you</Text>
        <View style={[styles.pickerWrapper, {
          backgroundColor: themeColors.cardBackground,
          borderColor: themeColors.cardBorder
        }]}>
          <Picker
            selectedValue={message}
            style={styles.picker}
            dropdownIconColor={themeColors.text}            // Android dropdown arrow
            onValueChange={val => setMessage(val as Message)}
            itemStyle={{ color: themeColors.text }}         // iOS item text
          >
            <Picker.Item label="Everyone"     value="Everyone"     />
            <Picker.Item label="Matches Only" value="MatchesOnly"  />
            <Picker.Item label="Nobody"       value="Nobody"        />
          </Picker>
        </View>
      </View>
      {/*Location Sharing*/}
      <View style={[styles.settingItem, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.cardBorder }]}>
        <Text style={[styles.settingText, { color: themeColors.text }]}>Location Sharing</Text>
        <View style={[styles.pickerWrapper, {
          backgroundColor: themeColors.cardBackground,
          borderColor: themeColors.cardBorder
        }]}>
          <Picker
            selectedValue={locationSharing}
            style={styles.picker}
            dropdownIconColor={themeColors.text}            // Android dropdown arrow
            onValueChange={val => setLocationSharing(val as LocationSharing)}
            itemStyle={{ color: themeColors.text }}         // iOS item text
          >
            <Picker.Item label="Precise" value="Precise"/>
            <Picker.Item label="Approximate (City-Level)" value="Approximate"  />
            <Picker.Item label="Off" value="Off"  />
          </Picker>
        </View>
      </View>
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
});

export default PrivacySettingsScreen;
