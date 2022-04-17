import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../../common';
import { SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';

const CameraButton = ({ onPress, text, style }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container(theme), style]}>
      <TouchableOpacity style={styles.button(theme)} onPress={onPress}>
        <Text style={styles.timer(theme)} bold>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (theme) => ({
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.white,
    borderRadius: 2000,
    paddingHorizontal: SPACING.tiny,
    paddingVertical: SPACING.tiny,
    elevation: 4
  }),
  button: (theme) => ({
    borderRadius: 2000,
    backgroundColor: theme.white,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }),
  timer: (theme) => ({
    color: theme.black
  })
});
export default CameraButton;
