import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TextInput, View, ViewPropTypes } from 'react-native';
import { DIMENS, SPACING, TYPOGRAPHY } from '../../constants';
import useTheme from '../../hooks/useTheme';

const Input = ({ style, multiline, value, ...props }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.defaultContainer(theme),
        multiline && { height: 130 },
        style
      ]}
    >
      <TextInput
        placeholderTextColor={theme.inputPlaceholderColor}
        style={[styles.input, TYPOGRAPHY.primaryInputText(theme), style]}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        value={value}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: (theme) => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.inputBorderColor,
    height: 60,
    borderRadius: DIMENS.common.borderRadius
  }),
  input: {
    paddingLeft: SPACING.medium,

    height: '100%',
    flex: 1,
    textAlign: 'left'
  }
});

Input.propTypes = {
  rightIcon: PropTypes.string,
  style: ViewPropTypes.style,
  multiline: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  innerRef: PropTypes.object,
  unit: PropTypes.string,
  value: PropTypes.string
};

Input.defaultProps = {
  style: {},
  multiline: false
};

Input.displayName = 'Input';

export default Input;
