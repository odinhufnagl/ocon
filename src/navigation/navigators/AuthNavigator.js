import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AuthStack} from '../constants/stacks/AuthStack';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  console.log('authstack', AuthStack);
  return (
    <Stack.Navigator>
      {AuthStack.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
