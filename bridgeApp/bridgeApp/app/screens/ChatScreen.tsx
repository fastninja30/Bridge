import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import { Colors } from '../constants/colors';

const ChatScreen = () => {
  const route = useRoute();
  //const { userId } = route.params;

  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey! How are you?', sender: 'other' },
    { id: '2', text: 'I’m good, thanks! How about you?', sender: 'me' },
    { id: '3', text: 'Doing great! Want to grab coffee sometime?', sender: 'other' },
  ]);
  const { darkModeEnabled } = useTheme();
  const [inputText, setInputText] = useState('');
  const themeColors = darkModeEnabled ? Colors.dark : Colors.light;

  // Simulate an async operation (e.g., fetching messages)
  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const fetchMessages = async () => {
      try {
        // Simulate an API call
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve({ data: messages }), 1000)
        );

        if (isMounted) {
          setMessages(response.data); // Update state only if component is mounted
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();

    // Cleanup function
    return () => {
      isMounted = false; // Mark component as unmounted
    };
  }, []); // Empty dependency array means this runs once on mount

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: String(messages.length + 1),
        text: inputText,
        sender: 'me',
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={item.sender === 'me' ? styles.myMessage : styles.otherMessage}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: themeColors.background }]}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />

      <View style={[styles.inputContainer, darkModeEnabled && styles.darkInputContainer]}>
        <TextInput
          style={[styles.input, darkModeEnabled && styles.darkInput]}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  messagesContainer: {
    padding: 16,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    maxWidth: '80%',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderTopColor: '#e0e0e0',
  },
  darkInputContainer: {
    backgroundColor: '#333'
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  darkInput: {
    color: "#eee",
    backgroundColor: '#1e1e1e'
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChatScreen;