import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import useTheme from '../../hooks/useTheme';
import { YesterdayStack } from '../constants/stacks/YesterdayStack';

const Stack = createStackNavigator();

const YesterdayNavigator = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => {},
        headerMode: 'float',
        cardStyle: { backgroundColor: theme.backgroundColor }
      }}
    >
      {YesterdayStack.map((screen) => (
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

export default YesterdayNavigator;
