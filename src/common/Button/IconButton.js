import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewPropTypes } from 'react-native';
import { Icon } from '..';
import { DIMENS } from '../../constants';
import useTheme from '../../hooks/useTheme';

const IconButton = ({
  onPress,
  style,
  icon,
  iconSize,
  color,
  variant,
  disabled
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={disabled ? () => {} : onPress}
      style={[
        variant === 'flatten'
          ? styles.iconButtonFlattenContainer
          : styles.iconButtonContainer(theme, variant === 'transparent'),

        style
      ]}
    >
      <Icon variant={icon} size={iconSize} fill={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButtonContainer: (theme, isTransparent) => ({
    ...DIMENS.common.centering,
    backgroundColor: isTransparent ? 'rgba(0, 0,0, 0.22)' : theme.white,
    borderRadius: 38 / 2,
    width: 38,
    height: 38,
    shadowColor: !isTransparent && '#000',
    shadowOffset: !isTransparent && {
      width: 0,
      height: 2
    },
    shadowOpacity: !isTransparent && 0.1,
    shadowRadius: !isTransparent && 10.22,
    elevation: isTransparent ? 0 : 3
  }),
  iconButtonFlattenContainer: {
    width: 38,
    height: 38,
    ...DIMENS.common.centering
  }
});

IconButton.propTypes = {
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
  icon: PropTypes.string.isRequired,
  iconSize: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'flatten'])
};

export default IconButton;
