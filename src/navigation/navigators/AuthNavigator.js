import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import useTheme from "../../hooks/useTheme";
import { AuthStack } from "../constants/stacks/AuthStack";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => {},
        headerMode: "float",
        cardStyle: { backgroundColor: theme.backgroundColor },
      }}
    >
      {AuthStack.map((screen) => (
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
