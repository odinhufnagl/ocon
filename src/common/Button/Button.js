import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native';
import { DIMENS, SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';
import Icon from '../Icon/Icon';
import Spacer from '../Spacer/Spacer';
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
  icon,
  iconFill = 'white',
  iconSize = 'medium',
  textStyle,
  ...props
}) => {
  const { theme } = useTheme();
  const getViewStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton(theme);
      case 'third':
        return styles.thirdButton(theme);
      case 'fourth':
        return styles.fourthButton(theme);
      default:
        return styles.primaryButton(theme);
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
      style={[styles.defaultStyle(shadow), getViewStyle(), getSize(), style]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <View style={styles.contentContainer}>
          <Text
            type={getTextType()}
            style={[
              style?.color ? { color: style.color } : {},
              disabled ? styles.disabledButtonText(theme) : {},
              textStyle
            ]}
          >
            {title}
          </Text>
          {icon && (
            <>
              <Spacer orientation="horizontal" spacing="medium" />
              <Icon variant={icon} fill={iconFill} size={iconSize} />
            </>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  defaultStyle: (shadow) => ({
    borderRadius: DIMENS.common.borderRadius,
    ...DIMENS.common.centering,
    width: '100%',
    paddingVertical: SPACING.small,
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
  primaryButton: (theme) => ({
    backgroundColor: theme.primaryButtonColor,
    borderRadius: DIMENS.common.borderRadiusMedium
  }),
  secondaryButton: (theme) => ({
    borderColor: theme.borderColor,
    backgroundColor: theme.backgroundColor,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: DIMENS.common.borderRadiusMedium
  }),
  thirdButton: (theme) => ({
    backgroundColor: theme.dp3,
    borderRadius: DIMENS.common.borderRadiusLarge
  }),
  fourthButton: (theme) => ({
    backgroundColor: theme.backgroundColor,
    elevation: 0,
    borderRadius: DIMENS.common.borderRadiusMedium
  }),

  disabledButtonText: (theme) => ({
    color: theme.buttonDisabledTextColor
  }),
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
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
