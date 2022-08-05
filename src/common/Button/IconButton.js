import PropTypes from 'prop-types';
import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native';
import { Icon, Spacer } from '..';
import { DIMENS, IMAGES, SPACING } from '../../constants';
import useTheme from '../../hooks/useTheme';
const STYLES = {
  FLATTEN: 'flatten',
  TRANSPARENT: 'transparent',
  SECONDARY: 'secondary',
  PRIMARY: 'primary'
};

const getStyles = (variant) => {
  switch (variant) {
    case STYLES.FLATTEN:
      return styles.iconButtonFlattenContainer;
    case STYLES.TRANSPARENT:
      return styles.iconButtonTransparentContainer;
    case STYLES.SECONDARY:
      return styles.iconButtonSecondaryContainer;
    case STYLES.PRIMARY:
      return styles.iconButtonContainer;
    default:
      return styles.iconButtonContainer;
  }
};

const IconButton = ({
  onPress,
  style,
  icon,
  iconSize,
  variant,
  color = variant == STYLES.SECONDARY || variant == STYLES.TRANSPARENT
    ? 'white'
    : 'black',
  image,
  imageStyle,
  disabled
}) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={disabled ? () => {} : onPress}
      style={[getStyles(variant)(theme, image), style]}
    >
      {image && (
        <>
          <Image source={image} style={[styles.image, imageStyle]} />
          <Spacer orientation="horizontal" spacing="small" />
        </>
      )}
      <Icon variant={icon} size={iconSize} fill={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButtonContainer: (theme, existsMultipleItems) => ({
    ...DIMENS.common.centering,
    backgroundColor: theme.white,
    borderRadius: 38 / 2,
    width: existsMultipleItems ? 'auto' : 38,
    flexDirection: 'row',
    justifyContent: existsMultipleItems ? 'space-between' : 'center',
    paddingHorizontal: SPACING.small,
    alignItems: 'center',
    height: 38,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 10.22,
    elevation: 3
  }),
  iconButtonFlattenContainer: (theme, existsMultipleItems) => ({
    width: existsMultipleItems ? 'auto' : 38,
    flexDirection: 'row',
    justifyContent: existsMultipleItems ? 'space-between' : 'center',
    paddingHorizontal: SPACING.small,
    alignItems: 'center',
    height: 38,
    ...DIMENS.common.centering
  }),
  iconButtonTransparentContainer: (theme, existsMultipleItems) => ({
    ...DIMENS.common.centering,
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
    borderRadius: 100,
    width: existsMultipleItems ? 'auto' : 38,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: existsMultipleItems ? 'space-between' : 'center',
    paddingHorizontal: SPACING.small,
    height: 38
  }),
  iconButtonSecondaryContainer: (theme, existsMultipleItems) => ({
    ...DIMENS.common.centering,
    backgroundColor: theme.dp3,
    borderRadius: 100,
    width: existsMultipleItems ? 'auto' : 38,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: existsMultipleItems ? 'space-between' : 'center',
    paddingHorizontal: SPACING.small,
    height: 38
  }),
  image: {
    width: 25,
    height: 25
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
