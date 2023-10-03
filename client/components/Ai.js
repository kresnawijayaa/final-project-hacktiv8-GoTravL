// App.js

import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import AiComponent from './AiComponent';
import { useNavigation } from '@react-navigation/native';

const Ai = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>

      <AiComponent
        imageUrl="https://i.pinimg.com/736x/55/44/2f/55442f2018fd5e2781c732f90f1f7756.jpg"
        buttonText="Ask ame!"
        onButtonPress={() => navigation.navigate('AiChatScreen')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

  },
  topText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Ai;
