// app/screens/HomeScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useTheme } from '../ThemeContext';
import { useMatches } from '../MatchesContext';
import { Colors } from '../constants/colors';

interface Profile {
  id: string;
  name: string;
  image: string | null;
}

const placeholderImage = require('../../assets/images/placeholder.png');

const HomeScreen: React.FC = () => {
  const [profiles] = useState<Profile[]>([
    { id: '1', name: 'Alice', image: 'https://example.com/alice.jpg' },
    { id: '2', name: 'Bob',   image: 'https://example.com/bob.jpg' },
    { id: '3', name: 'Carol', image: null },  // no URL → placeholder
  ]);
  const [erroredMap, setErroredMap] = useState<Record<string, boolean>>({});
  const { darkModeEnabled } = useTheme();
  const { addMatch } = useMatches();
  const theme = darkModeEnabled ? Colors.dark : Colors.light;

  const handleImageError = (id: string) => () => {
    setErroredMap(m => ({ ...m, [id]: true }));
  };

  // now a pure renderer — no hooks inside here!
  const renderCard = (card: Profile) => {
    // if the remote image failed or is null, fall back to placeholder
    const source = !erroredMap[card.id] && card.image
      ? { uri: card.image }
      : placeholderImage;

    return (
      <View style={[styles.card, {
        backgroundColor: theme.cardBackground,
        borderColor: theme.cardBorder,
      }]}>
        <Image
          style={styles.image}
          defaultSource={placeholderImage}     // iOS only but doesn't hurt on Android
          source={source}
          onError={handleImageError(card.id)}
        />
        <Text style={[styles.name, { color: theme.text }]}>
          {card.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.text }]}>
        Discover Profiles
      </Text>
      <Swiper
        key={darkModeEnabled ? 'dark' : 'light'}  // re-render deck on theme change
        cards={profiles}
        renderCard={renderCard}
        onSwipedLeft={(i) => console.log('Nope:', i)}
        onSwipedRight={(i) => {
          console.log('Liked:', i);
          addMatch(profiles[i]);
        }}
        cardIndex={0}
        backgroundColor={theme.background}
        stackSize={3}
        overlayLabels={{
          left: {
            title: 'NOPE',
            style: {
              label: { backgroundColor: 'red', color: 'white', fontSize: 24, padding: 10 },
              wrapper: { flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', marginTop: 20, marginLeft: -20 },
            },
          },
          right: {
            title: 'LIKE',
            style: {
              label: { backgroundColor: 'green', color: 'white', fontSize: 24, padding: 10 },
              wrapper: { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 20, marginLeft: 20 },
            },
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  card: {
    flex: 0.75,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default HomeScreen;
