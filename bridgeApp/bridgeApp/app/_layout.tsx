import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

// Theme and Matches Contexts
import { ThemeProvider, useTheme } from './ThemeContext';
import { MatchesProvider } from './MatchesContext';

// Screens
import HomeScreen from './screens/HomeScreen';
import MatchesScreen from './screens/MatchesScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import PrivacySettingsScreen from './screens/PrivacySettingsScreen';
import AccountSettingsScreen from './screens/AccountSettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Chat Stack Navigator
function ChatStack() {
  const { darkModeEnabled } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: darkModeEnabled ? '#1e1e1e' : '#fff' },
        headerTintColor: darkModeEnabled ? '#fff' : '#000',
      }}
    >
      <Stack.Screen
        name="ChatList"
        component={ChatScreen}
        options={{ title: 'Chats' }}
      />
      {/* Add more chat-related screens here if needed */}
    </Stack.Navigator>
  );
}

// Settings Stack Navigator
function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsMain"
        component={SettingsScreen}
        options={{ title: 'Settings', headerShown: false }}
      />
      <Stack.Screen
        name="PrivacySettings"
        component={PrivacySettingsScreen}
        options={{ title: 'Privacy Settings' }}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
        options={{ title: 'Account Settings' }}
      />
    </Stack.Navigator>
  );
}

// App Navigator using theme settings
function AppNavigator() {
  const { darkModeEnabled } = useTheme();

  return (
    <View style={[styles.container, darkModeEnabled && styles.darkContainer]}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: darkModeEnabled ? '#1e1e1e' : '#fff' },
          headerTintColor: darkModeEnabled ? '#fff' : '#000',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Matches') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Chat') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ff6b6b',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: darkModeEnabled ? '#222' : '#fff',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Discover' }} />
        <Tab.Screen name="Matches" component={MatchesScreen} options={{ title: 'Matches' }} />
        <Tab.Screen name="Chat" component={ChatStack} options={{ title: 'Chat' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Tab.Screen name="Settings" component={SettingsStack} options={{ title: 'Settings' }} />
      </Tab.Navigator>
    </View>
  );
}

// Main App Layout wrapped with Theme and Matches Providers
export default function AppLayout() {
  return (
    <ThemeProvider>
      <MatchesProvider>
        <AppNavigator />
      </MatchesProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
});
