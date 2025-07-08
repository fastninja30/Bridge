import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useTheme } from '../ThemeContext';
import { useMatches } from '../MatchesContext';
import { Colors } from '../constants/colors';
// Update: placeholder image asset, add a placeholder.png in your assets folder
import placeholderImage from '../assets/placeholder.png';

const HomeScreen = () => {
  const [profiles, setProfiles] = useState([
    { id: '1', name: 'Alice', image: 'https://example.com/alice.jpg' },
    { id: '2', name: 'Bob', image: 'https://example.com/bob.jpg' },
    { id: '3', name: 'Carol', image: 'https://example.com/carol.jpg' },
    // add more profiles as needed
  ]);

  const { darkModeEnabled } = useTheme();
  const { addMatch } = useMatches();
  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;

  // Local component to handle placeholder fallback
  const CardImage = ({ uri }: { uri: string }) => {
    const [loadError, setLoadError] = useState(false);
    return (
      <Image
        style={styles.image}
        source={
          loadError || !uri
            ? placeholderImage
            : { uri }
        }
        onError={() => setLoadError(true)}
      />
    );
  };

  const handleSwipedLeft = useCallback((cardIndex: number) => {
    // TODO: analytics or feedback for passing
    console.log('Swiped left on card:', cardIndex);
  }, []);

  const handleSwipedRight = useCallback((cardIndex: number) => {
    console.log('Swiped right on card:', cardIndex);
    const likedProfile = profiles[cardIndex];
    if (likedProfile) {
      addMatch(likedProfile);
    }
  }, [profiles, addMatch]);

  const renderCard = useCallback(
    (card) => (
      <View
        key={card.id}
        style={[
          styles.card,
          {
            backgroundColor: themeColors.cardBackground,
            borderColor: themeColors.cardBorder,
          },
        ]}
      >
        {/* Use CardImage to show placeholder */}
        <CardImage uri={card.image} />
        <Text style={[styles.name, { color: themeColors.text }]}>
          {card.name}
        </Text>
      </View>
    ),
    [themeColors]
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>      
      <Text style={[styles.title, { color: themeColors.text }]}>Discover Profiles</Text>
      <Swiper
        key={darkModeEnabled ? 'dark' : 'light'}
        cards={profiles}
        renderCard={renderCard}
        onSwipedLeft={handleSwipedLeft}
        onSwipedRight={handleSwipedRight}
        cardIndex={0}
        backgroundColor={themeColors.background}
        stackSize={3}
        overlayLabels={{
          left: {
            title: 'NOPE',
            style: {
              label: {
                backgroundColor: themeColors.rejectLabelBg || 'red',
                color: themeColors.rejectLabelText || 'white',
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
                backgroundColor: themeColors.acceptLabelBg || 'green',
                color: themeColors.acceptLabelText || 'white',
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
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
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default HomeScreen;
