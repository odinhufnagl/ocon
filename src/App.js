import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import RootNavigator from './navigation';
import { darkTheme, ThemeProvider } from './theme';

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider theme={darkTheme}>
      <NavigationContainer>
        <RootNavigator></RootNavigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
