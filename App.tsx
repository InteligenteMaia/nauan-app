/**
 * APP.TSX
 * Entry point do aplicativo Nauan
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen } from '@screens/HomeScreen';
import { theme } from '@config/theme';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.background.primary}
        />
        <HomeScreen />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
