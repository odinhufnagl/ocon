import React from 'react';
import { View } from 'react-native';
import { Button, Text } from '../../common';
import { CAMERA_SCREEN, YESTERDAY_SCREEN } from '../../navigation';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="navigate to camera screen"
        onPress={() => navigation.navigate(CAMERA_SCREEN)}
      ></Button>
      <Button
        title="navigate to explore screen"
        onPress={() => navigation.navigate(YESTERDAY_SCREEN)}
      ></Button>
    </View>
  );
};

export default HomeScreen;
