import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';
import { Colors } from '../constants/colors';
const ProfileScreen = () => {
  // Dummy user profile data
  const { darkModeEnabled } = useTheme();
  const user = {
    name: 'John Doe',
    age: 23,
    bio: 'Adventure seeker and coffee lover. Always up for a good conversation!',
    photos: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300',
    ],
  };
  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;
  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Profile Header */}
      <View style={[styles.header, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.cardBorder }]}>
        <Image source={{ uri: user.photos[0] }} style={styles.profileImage} />
        <Text style={[styles.name, darkModeEnabled && styles.darkName]}>{user.name}, {user.age}</Text>
        <Text style={[styles.bio, darkModeEnabled && styles.darkBio]}>{user.bio}</Text>
      </View>

      {/* Photos Section */}
      <View style={[styles.photosSection, { backgroundColor: themeColors.cardBackground, borderColor: themeColors.cardBorder }]}>
        <Text style={[styles.sectionTitle, darkModeEnabled && styles.darkSectionTitle]}>Photos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {user.photos.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={styles.photo} />
          ))}
        </ScrollView>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#1e1e1e'
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  darkHeader: {
    backgroundColor: '#333',
    borderBottomColor: '#555'
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  darkName: {
    color: '#fff'
  },
  bio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  darkBio: {
    color: '#eee'
  },
  photosSection: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 16,
  },
  darkPhotosSection: {
    backgroundColor: '#333'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  darkSectionTitle: {
    color: '#fff'
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 8,
  },
  editButton: {
    backgroundColor: '#ff6b6b',
    padding: 16,
    borderRadius: 10,
    margin: 16,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;