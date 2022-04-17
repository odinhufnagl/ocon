import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native';
import { DIMENS, SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';
import Text from '../Text/Text';

const Button = ({
  title,
  onPress,
  style,
  disabled,
  variant,
  loading,
  size,
  id,
  shadow,
  ...props
}) => {
  const { theme } = useTheme();
  const getViewStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton(theme);
      case 'third':
        return styles.thirdButton(theme);
      default:
        return styles.primaryButton(theme, shadow);
    }
  };

  const getTextType = () => {
    switch (variant) {
      case 'secondary':
        return 'secondaryButton';
      case 'third':
        return 'thirdButton';
      default:
        return 'primaryButton';
    }
  };

  const getSize = () => {
    switch (size) {
      case 'small':
        return styles.sizeSmall;
      case 'medium':
        return styles.sizeMedium;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.7}
      onPress={disabled ? () => {} : onPress}
      disabled={loading ?? disabled}
      key={id}
      style={[styles.defaultStyle(), getViewStyle(), getSize(), style]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text
          type={getTextType()}
          style={[
            style?.color ? { color: style.color } : {},
            disabled ? styles.disabledButtonText(theme) : {}
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  defaultStyle: () => ({
    borderRadius: DIMENS.common.borderRadius,
    ...DIMENS.common.centering,
    width: '100%',
    paddingVertical: SPACING.small
  }),
  primaryButton: (theme, shadow) => ({
    backgroundColor: theme.primaryButtonColor,
    borderRadius: DIMENS.common.borderRadiusLarge,
    ...(shadow && {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 10.22,
      elevation: 3
    })
  }),
  secondaryButton: (theme) => ({
    borderColor: theme.borderColor,
    borderWidth: 3,
    borderRadius: DIMENS.common.borderRadiusLarge
  }),
  thirdButton: (theme) => ({
    backgroundColor: theme.dp3,
    borderRadius: DIMENS.common.borderRadiusLarge
  }),

  disabledButtonText: (theme) => ({
    color: theme.buttonDisabledTextColor
  })
});

Button.propTypes = {
  id: PropTypes.string,
  underlined: PropTypes.bool,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['secondary', 'third', 'fourth', 'error']),
  size: PropTypes.oneOf(['small', 'medium']),
  loading: PropTypes.bool,
  shadow: PropTypes.bool
};
Button.defaultProps = {
  shadow: true
};

export default Button;
