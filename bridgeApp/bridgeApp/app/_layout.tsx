import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

// Import the Colors constants file
import { Colors } from './constants/colors';

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
  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',    // or your dark color
          borderBottomWidth: 0,      // remove any manual border
          elevation: 0,              // remove Android shadow
          shadowOpacity: 0,          // remove iOS shadow
        },
        headerShadowVisible: false,
        headerTintColor: themeColors.text,
      }}
    >
      <Stack.Screen
        name="ChatList"
        component={ChatScreen}
        options={{ title: 'Chats' , headerShown: false }}
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

// App Navigator using theme settings and Colors constants
function AppNavigator() {
  const { darkModeEnabled } = useTheme();
  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.container }]}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: themeColors.tabBackground },
          headerTintColor: themeColors.text,
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
          tabBarActiveTintColor: themeColors.activeTint,
          tabBarInactiveTintColor: themeColors.inactiveTint,
          tabBarStyle: {
            backgroundColor: themeColors.tabBackground,
            borderTopColor: themeColors.tabBorder,
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Discover' , headerShadowVisible: false}} />
        <Tab.Screen name="Matches" component={MatchesScreen} options={{ title: 'Matches' , headerShadowVisible: false}} />
        <Tab.Screen name="Chat" component={ChatStack} options={{ title: 'Chat' , headerShadowVisible: false}} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' , headerShadowVisible: false}} />
        <Tab.Screen name="Settings" component={SettingsStack} options={{ title: 'Settings' , headerShadowVisible: false}} />
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
  },
});
