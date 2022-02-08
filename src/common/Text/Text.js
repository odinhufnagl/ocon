import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import { TYPOGRAPHY } from '../../constants';
import useTheme from '../../hooks/useTheme';

// Possible value for prop "type" for Text
// add other if required
const HEADING = 'heading';
const BODY = 'body';
const SMALL = 'small';
const PRIMARY_BUTTON = 'primaryButton';
const SECONDARY_BUTTON = 'secondaryButton';

const Text = ({ type, bold, style, ...props }) => {
  const { theme } = useTheme();
  return (
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
    SECONDARY_BUTTON
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
