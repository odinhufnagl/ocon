import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import useTheme from '../../hooks/useTheme';
import { ProfileStack } from '../constants/stacks/ProfileStack';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => {},
        cardStyle: { backgroundColor: theme.backgroundColor }
      }}
    >
      {ProfileStack.map((screen) => (
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

export default ProfileNavigator;
