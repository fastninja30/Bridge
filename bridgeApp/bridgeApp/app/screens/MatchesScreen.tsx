import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import { useMatches } from '../MatchesContext';

const MatchesScreen = () => {
  const navigation = useNavigation();
  const { darkModeEnabled } = useTheme();
  const { matches } = useMatches();

  // Render each matched profile
  const renderMatch = ({ item }) => (
    <View style={[styles.matchCard, darkModeEnabled && styles.darkMatchCard]}>
      <Image source={{ uri: item.image }} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <Text style={[styles.name, darkModeEnabled && styles.darkText]}>
          {item.name}
        </Text>
        <Text style={[styles.bio, darkModeEnabled && styles.darkText]}>
          {item.bio}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => navigation.navigate('Chat', { userId: item.id })}
      >
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, darkModeEnabled && styles.darkContainer]}>
      <Text style={[styles.title, darkModeEnabled && styles.darkText]}>
        Your Matches
      </Text>
      {matches.length === 0 ? (
        <Text style={[styles.noMatches, darkModeEnabled && styles.darkText]}>
          No matches yet
        </Text>
      ) : (
        <FlatList
          data={matches}
          renderItem={renderMatch}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  list: {
    paddingBottom: 16,
  },
  matchCard: {
    flexDirection: 'row',
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
  darkMatchCard: {
    backgroundColor: '#2f2f2f'
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  noMatches: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  chatButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  darkText: {
    color: '#fff',
  },
});

export default MatchesScreen;
