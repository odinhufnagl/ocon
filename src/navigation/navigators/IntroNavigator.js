import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import useTheme from '../../hooks/useTheme';
import { IntroStack } from '../constants/stacks/IntroStack';

const Stack = createStackNavigator();

const IntroNavigator = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => {},
        headerMode: 'float',
        cardStyle: { backgroundColor: theme.backgroundColor }
      }}
    >
      {IntroStack.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default IntroNavigator;
