import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useTheme } from '../ThemeContext';

const HomeScreen = () => {
  const [profiles, setProfiles] = useState([
    { id: '1', name: 'Alice', image: 'https://example.com/alice.jpg' },
    { id: '2', name: 'Bob', image: 'https://example.com/bob.jpg' },
    { id: '3', name: 'Carol', image: 'https://example.com/carol.jpg' },
    // add more profiles as needed
  ]);
  const { darkModeEnabled } = useTheme();

  const renderCard = (card) => (
    <View style={[styles.card, darkModeEnabled && styles.darkCard]}>
      <Image style={styles.image} source={{ uri: card.image }} />
      <Text style={[styles.name, darkModeEnabled && styles.darkText]}>{card.name}</Text>
    </View>
  );

  return (
    <View style={[styles.container, darkModeEnabled && styles.darkContainer]}>
      <Text style={[styles.text, darkModeEnabled && styles.darkText]}>Discover Profiles</Text>
      <Swiper
        cards={profiles}
        renderCard={renderCard}
        onSwipedLeft={(cardIndex) => console.log('Swiped left on card:', cardIndex)}
        onSwipedRight={(cardIndex) => console.log('Swiped right on card:', cardIndex)}
        cardIndex={0}
        backgroundColor={darkModeEnabled ? '#121212' : '#f0f0f0'}
        stackSize={3}
        overlayLabels={{
          left: {
            title: 'NOPE',
            style: {
              label: {
                backgroundColor: 'red',
                color: 'white',
                fontSize: 24,
                padding: 10,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 20,
                marginLeft: -20,
              },
            },
          },
          right: {
            title: 'LIKE',
            style: {
              label: {
                backgroundColor: 'green',
                color: 'white',
                fontSize: 24,
                padding: 10,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 20,
                marginLeft: 20,
              },
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
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    paddingTop: 40,
  },
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    flex: 0.75,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkCard: {
    backgroundColor: '#2f2f2f',
    borderColor: '#333',
  },
  image: {
    width: '100%',
    height: '80%',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 10,
  },
  text: {
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
});

export default HomeScreen;
