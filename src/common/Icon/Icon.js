import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { icons } from '../../../assets/index';
import DIMENS from '../../constants/dimensions';
import { ButtonSize } from '../../constants/enums';

const { icon } = DIMENS;

const getIconSize = (size) => {
  switch (size) {
    case ButtonSize.SMALL:
      return icon.small;
    case ButtonSize.EXTRA_SMALL:
      return icon.extraSmall;
    case ButtonSize.MEDIUM:
      return icon.medium;
    case ButtonSize.LARGE:
      return icon.large;
    case ButtonSize.EXTRA_LARGE:
      return icon.extraLarge;
    default:
      return icon.default;
  }
};

const Icon = (props) => {
  const { variant, fill, size, style } = props;
  const iconSize = getIconSize(size);

  const IconView = icons[variant] ? icons[variant] : null;

  return IconView ? (
    <View style={style}>
      <IconView fill={fill} size={iconSize} />
    </View>
  ) : (
    <Text>Missing icon</Text>
  );
};

Icon.propTypes = {
  variant: PropTypes.string.isRequired,
  size: PropTypes.oneOf([
    ButtonSize.EXTRA_SMALL,
    ButtonSize.SMALL,
    ButtonSize.MEDIUM,
    ButtonSize.LARGE,
    ButtonSize.EXTRA_LARGE
  ]),
  fill: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default Icon;
