import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './navigation';
import { AuthProvider } from './providers/AuthProvider';
import { darkTheme, ThemeProvider } from './theme';

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootNavigator></RootNavigator>
          </GestureHandlerRootView>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
