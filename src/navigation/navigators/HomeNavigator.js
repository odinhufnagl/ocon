import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeStack } from '../constants/stacks/HomeStack';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      {HomeStack.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
