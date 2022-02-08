import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, ViewPropTypes } from 'react-native';
import { DIMENS, SPACING, TYPOGRAPHY } from '../../constants';
import useTheme from '../../hooks/useTheme';

const Input = ({ style, multiline, value, ...props }) => {
  const { theme } = useTheme();

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.defaultContainer(theme, value.length > 0 || isFocused),
        multiline && { height: 130 },
        style
      ]}
    >
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
  defaultContainer: (theme, hasText) => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: hasText
      ? theme.inputHasTextBorderColor
      : theme.inputBorderColor,
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
