import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, ViewPropTypes, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SPACING } from '../../constants';

const Container = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SPACING.medium,
    paddingBottom: SPACING.extraLarge,
    marginTop: Platform.OS === 'ios' ? SPACING.medium + 20 : 0
  }
});

Container.propTypes = {
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style
};

export default Container;
