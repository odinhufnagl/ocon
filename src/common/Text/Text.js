import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text as RNText } from 'react-native';
import { TYPOGRAPHY } from '../../constants';
import useTheme from '../../hooks/useTheme';

const HEADING = 'heading';
const BODY = 'body';
const SMALL = 'small';
const PRIMARY_BUTTON = 'primaryButton';
const SECONDARY_BUTTON = 'secondaryButton';
const THIRD_BUTTON = 'thirdButton';
const HEADER = 'header';
const LARGE_HEADER = 'largeHeader';

const Text = ({
  type,
  bold,
  style,
  animate,
  animateTime = 500,

  animateOnFinish = () => {},
  ...props
}) => {
  const animation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    animate && startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: animateTime,
      useNativeDriver: true
    }).start(() => animateOnFinish());
  };

  const { theme } = useTheme();

  return animate ? (
    <Animated.Text
      style={StyleSheet.flatten([
        getTextStyle(type, bold, theme),
        style,
        { opacity: animation }
      ])}
      {...props}
    ></Animated.Text>
  ) : (
    <RNText
      style={StyleSheet.flatten([getTextStyle(type, bold, theme), style])}
      {...props}
    />
  );
};
const getTextStyle = (type, bold, theme) => {
  let style = '';

  switch (type) {
    case HEADING:
      style = 'headingText';
      break;
    case BODY:
      style = 'bodyText';
      break;
    case SMALL:
      style = 'smallText';
      break;
    case PRIMARY_BUTTON:
      style = 'primaryButtonText';
      break;
    case SECONDARY_BUTTON:
      style = 'secondaryButtonText';
      break;
    case THIRD_BUTTON:
      style = 'thirdButtonText';
      break;
    case HEADER:
      style = 'headerText';
      break;
    case LARGE_HEADER:
      style = 'largeHeaderText';
      break;
    default:
      style = 'bodyText';
  }
  if (bold) {
    style += 'Bold';
  }

  return TYPOGRAPHY[style](theme);
};

Text.propTypes = {
  type: PropTypes.oneOf([
    HEADING,
    BODY,
    SMALL,
    PRIMARY_BUTTON,
    SECONDARY_BUTTON,
    HEADER
  ]),
  bold: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

Text.defaultProps = {
  type: BODY,
  bold: false,
  style: {}
};

export default Text;
