import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import useTheme from '../../hooks/useTheme';
import { IntroStack } from '../constants/stacks/IntroStack';
import { SettingsStack } from '../constants/stacks/SettingsStack';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => {},
        cardStyle: { backgroundColor: theme.backgroundColor }
      }}
    >
      {SettingsStack.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
