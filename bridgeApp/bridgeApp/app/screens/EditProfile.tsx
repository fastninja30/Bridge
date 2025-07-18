import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../ThemeContext';
import { Colors } from '../constants/colors';

const placeholderImage = require('../../assets/images/placeholder.png');

// Dummy initial user data (replace with props or context as needed)
const initialUser = {
  name: 'John Doe',
  age: 23,
  bio: 'Adventure seeker and coffee lover. Always up for a good conversation!',
  photos: [
    'https://via.placeholder.com/300/FF0000',
    'https://via.placeholder.com/300/00FF00',
    'https://via.placeholder.com/300/0000FF',
  ],
};

const EditProfileScreen: React.FC = () => {
  const { darkModeEnabled } = useTheme();
  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;

  // Form state
  const [name, setName] = useState(initialUser.name);
  const [age, setAge] = useState(String(initialUser.age));
  const [bio, setBio] = useState(initialUser.bio);
  const [photos, setPhotos] = useState<string[]>([...initialUser.photos]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [erroredMap, setErroredMap] = useState<Record<string, boolean>>({});

  const handleImageError = (key: string) => () => {
    setErroredMap((m) => ({ ...m, [key]: true }));
  };

  const addPhoto = () => {
    if (newPhotoUrl.trim()) {
      setPhotos((prev) => [...prev, newPhotoUrl.trim()]);
      setNewPhotoUrl('');
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Replace with real save logic (API call, context update, etc.)
    Alert.alert('Profile Saved', `Name: ${name}\nAge: ${age}\nBio: ${bio}\nPhotos: ${photos.length}`);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      {/* Name Input */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.label, darkModeEnabled && styles.darkLabel]}>Name</Text>
        <TextInput
          style={[styles.input, { borderColor: themeColors.cardBorder }]}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor={darkModeEnabled ? '#aaa' : '#666'}
        />
      </View>

      {/* Age Input */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.label, darkModeEnabled && styles.darkLabel]}>Age</Text>
        <TextInput
          style={[styles.input, { borderColor: themeColors.cardBorder }]}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          placeholder="Enter your age"
          placeholderTextColor={darkModeEnabled ? '#aaa' : '#666'}
        />
      </View>

      {/* Bio Input */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.label, darkModeEnabled && styles.darkLabel]}>Bio</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            { borderColor: themeColors.cardBorder },
          ]}
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about yourself"
          placeholderTextColor={darkModeEnabled ? '#aaa' : '#666'}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Photos Management */}
      <View style={[styles.photosSection, { borderColor: themeColors.cardBorder }]}>
        <Text style={[styles.sectionTitle, darkModeEnabled && styles.darkSectionTitle]}>Photos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {photos.map((uri, index) => {
            const key = `edit-photo-${index}`;
            const source = erroredMap[key] ? placeholderImage : { uri };
            return (
              <View key={key} style={styles.photoContainer}>
                <Image
                  source={source}
                  defaultSource={placeholderImage}
                  onError={handleImageError(key)}
                  style={styles.photo}
                />
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removePhoto(index)}
                >
                  <Text style={styles.removeBtnText}>Remove</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.addPhotoContainer}>
          <TextInput
            style={[styles.input, { flex: 1, borderColor: themeColors.cardBorder }]}
            value={newPhotoUrl}
            onChangeText={setNewPhotoUrl}
            placeholder="Photo URL"
            placeholderTextColor={darkModeEnabled ? '#aaa' : '#666'}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addPhoto}>
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  darkLabel: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  textArea: {
    height: 100,
  },
  photosSection: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 24,
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
  photoContainer: {
    position: 'relative',
    marginRight: 12,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeBtn: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  removeBtnText: {
    color: '#fff',
    fontSize: 12,
  },
  addPhotoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  addBtn: {
    marginLeft: 8,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#ff6b6b',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 32,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfileScreen;
