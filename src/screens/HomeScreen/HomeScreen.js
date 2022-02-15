import React from 'react';
import { View } from 'react-native';
import { Button, Text } from '../../common';
import { CAMERA_SCREEN } from '../../navigation';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="navigate to camera screen"
        onPress={() => navigation.navigate(CAMERA_SCREEN)}
      ></Button>
    </View>
  );
};

export default HomeScreen;
