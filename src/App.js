import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import RootNavigator from './navigation';
import { darkTheme, lightTheme, ThemeProvider } from './theme';

const App = () => {
  /**
   * The useColorScheme React hook provides and subscribes to color scheme
   * updates from the Appearance module. This will help automatically
   * switch from light theme to dark theme, based on user preference.
   */
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider theme={colorScheme === 'light' ? lightTheme : darkTheme}>
      <NavigationContainer>
        <RootNavigator></RootNavigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
