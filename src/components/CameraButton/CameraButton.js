import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../../common';
import { SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';

const CameraButton = ({
  onPress,
  onPressOut,
  onLongPress,
  isFilming,
  text,
  style
}) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container(theme, isFilming), style]}>
      <TouchableOpacity
        style={styles.button(theme)}
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={300}
        onPressOut={onPressOut}
      >
        <Text style={styles.timer(theme)} bold>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (theme, isFilming) => ({
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: isFilming ? theme.errorColor : theme.white,
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
