import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import { Colors } from '../constants/colors';

const placeholderImage = require('../../assets/images/placeholder.png');

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { darkModeEnabled } = useTheme();

  // track which images have errored
  const [erroredMap, setErroredMap] = useState<Record<string, boolean>>({});
  const handleImageError = (key: string) => () => {
    setErroredMap((m) => ({ ...m, [key]: true }));
  };

  // Dummy user profile data
  const user = {
    name: 'John Doe',
    age: 23,
    bio: 'Adventure seeker and coffee lover. Always up for a good conversation!',
    photos: [
      'https://via.placeholder.com/300/FF0000', // you can swap in real URLs
      'https://via.placeholder.com/300/00FF00',
      'https://via.placeholder.com/300/0000FF',
    ],
  };

  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;

  // header image source (fallback if it errors)
  const headerKey = 'header';
  const headerSource = erroredMap[headerKey]
    ? placeholderImage
    : { uri: user.photos[0] };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      {/* Profile Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: themeColors.cardBackground,
            borderColor: themeColors.cardBorder,
          },
        ]}
      >
        <Image
          source={headerSource}
          defaultSource={placeholderImage}
          onError={handleImageError(headerKey)}
          style={styles.profileImage}
        />
        <Text style={[styles.name, darkModeEnabled && styles.darkName]}>
          {user.name}, {user.age}
        </Text>
        <Text style={[styles.bio, darkModeEnabled && styles.darkBio]}>
          {user.bio}
        </Text>
      </View>

      {/* Photos Section */}
      <View
        style={[
          styles.photosSection,
          {
            backgroundColor: themeColors.cardBackground,
            borderColor: themeColors.cardBorder,
          },
        ]}
      >
        <Text style={[styles.sectionTitle, darkModeEnabled && styles.darkSectionTitle]}>
          Photos
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {user.photos.map((photo, index) => {
            const key = `photo-${index}`;
            const source = erroredMap[key]
              ? placeholderImage
              : { uri: photo };

            return (
              <Image
                key={key}
                source={source}
                defaultSource={placeholderImage}
                onError={handleImageError(key)}
                style={styles.photo}
              />
            );
          })}
        </ScrollView>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity
        style={styles.editButton}
        //onPress={() => navigation.navigate('EditProfile')}
      >
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
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
    color: '#fff',
  },
  bio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  darkBio: {
    color: '#eee',
  },
  photosSection: {
    padding: 160,
    backgroundColor: '#fff',
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  darkSectionTitle: {
    color: '#fff',
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
