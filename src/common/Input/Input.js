import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TextInput, View, ViewPropTypes } from 'react-native';
import { Text } from '..';
import { DIMENS, SPACING, TYPOGRAPHY } from '../../constants';
import useTheme from '../../hooks/useTheme';

const Input = ({ style, multiline, value, title, ...props }) => {
  const { theme } = useTheme();

  return (
    <>
      <Text
        style={{ textTransform: 'uppercase', color: theme.textHighColor }}
        bold
        type="small"
      >
        {title}
      </Text>
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
    </>
  );
};

const styles = StyleSheet.create({
  defaultContainer: (theme) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.inputBackgroundColor,
    height: 50,
    borderRadius: DIMENS.common.borderRadiusMedium
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
