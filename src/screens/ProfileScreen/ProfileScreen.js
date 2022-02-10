import React from 'react';
import { View } from 'react-native';
import { Button, Text } from '../../common';
import { useAuthContext } from '../../providers/AuthProvider';

const ProfileScreen = () => {
  const { logOut } = useAuthContext();
  return (
    <View>
      <Text>Profile screen</Text>
      <Button title="log out" onPress={logOut}></Button>
    </View>
  );
};

export default ProfileScreen;
