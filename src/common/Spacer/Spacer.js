import PropTypes, { number } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { SPACING } from '../../constants';

const Spacer = ({ orientation, spacing }) => {
  return (
    <View
      style={{
        [orientation === 'vertical' ? 'height' : 'width']:
          typeof spacing === 'string' ? SPACING[spacing] : spacing
      }}
    />
  );
};

Spacer.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  spacing: PropTypes.oneOfType([
    PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'extraLarge']),
    number
  ])
};

Spacer.defaultProps = {
  orientation: 'vertical',
  spacing: 'medium'
};

export default Spacer;
