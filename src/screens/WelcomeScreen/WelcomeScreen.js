import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Spacer, Text } from '../../common';
import useTheme from '../../hooks/useTheme';
import { useAuthContext } from '../../providers/AuthProvider';

const WelcomeScreen = () => {
  const { theme } = useTheme();
  const { logIn } = useAuthContext();

  const [value, setValue] = useState('');

  const [value2, setValue2] = useState('');
  const [loading, setLoading] = useState(true);

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
      <Button
        title="Log in"
        onPress={() => {
          logIn(value, value2);
        }}
        disabled={value.length === 0 || value2.length === 0}
      ></Button>

      <View></View>
    </View>
  );
};
export default WelcomeScreen;
