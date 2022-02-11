import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewPropTypes } from 'react-native';
import { Icon } from '..';
import { DIMENS, SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';

const IconButton = ({ onPress, style, icon, iconSize, color, variant }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        variant === 'flatten' ? {} : styles.iconButtonContainer(theme),
        style
      ]}
    >
      <Icon variant={icon} size={iconSize} fill={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButtonContainer: (theme) => ({
    padding: SPACING.small,
    ...DIMENS.common.centering,
    backgroundColor: theme.white,
    borderRadius: 38 / 2,
    width: 38,
    height: 38,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 10.22,
    elevation: 3
  })
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
