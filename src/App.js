import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { add } from 'react-native-reanimated';
import {
  coordsToAddress,
  getAddressesFromCoords,
  locationToAddress
} from './api/googleMaps';
import { useLocation } from './hooks';
import RootNavigator from './navigation';
import { AuthProvider } from './providers/AuthProvider';
import { darkTheme, ThemeProvider } from './theme';

const App = () => {
  const navigationRef = useRef();

  return (
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <NavigationContainer ref={navigationRef}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootNavigator navigationRef={navigationRef} />
          </GestureHandlerRootView>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
