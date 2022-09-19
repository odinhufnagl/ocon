import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { ProfileImageScreen } from './screens';
import { darkTheme, defaultTheme, ThemeProvider } from './theme';

const App = () => {
  //const navigationRef = useRef();
  const [navigationRef, setNavigationRef] = useState();
  const onRefChange = useCallback((node) => {
    console.log('ref changed to:', node);
    setNavigationRef(node); // or change other state to re-render
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <NavigationContainer
          ref={onRefChange}
          theme={{
            ...DefaultTheme,

            colors: {
              ...DefaultTheme.colors,
              background: defaultTheme.backgroundColor
            }
          }}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootNavigator navigationRef={navigationRef} />
          </GestureHandlerRootView>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
