import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, ViewPropTypes } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SPACING } from '../../constants';

const Container = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingBottom: SPACING.extraLarge
  }
});

Container.propTypes = {
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style
};

export default Container;
