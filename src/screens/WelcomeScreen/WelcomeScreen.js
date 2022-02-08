import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Spacer, Text } from '../../common';
import useTheme from '../../hooks/useTheme';

const WelcomeScreen = () => {
  const { theme } = useTheme();

  const [value, setValue] = useState('');

  const [value2, setValue2] = useState('');

  return (
    <View style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
      <Text type="heading">Log in</Text>
      <Spacer></Spacer>
      <Input placeholder="email" value={value} onChangeText={setValue}></Input>
      <Spacer spacing="large"></Spacer>
      <Input
        placeholder="password"
        value={value2}
        onChangeText={setValue2}
      ></Input>
      <Spacer spacing="large"></Spacer>
      <Button title="Log in"></Button>

      <View></View>
    </View>
  );
};
export default WelcomeScreen;
