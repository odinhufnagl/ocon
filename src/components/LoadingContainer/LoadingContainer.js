import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { DIMENS } from '../../constants';
import useTheme from '../../hooks/useTheme';

const LoadingContainer = () => {
  const { theme } = useTheme();
  return (
    <View style={styles.loadingContainer(theme)}>
      <ActivityIndicator color="white" size={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: (theme) => ({
    flex: 1,
    backgroundColor: theme.backgroundColor,
    ...DIMENS.common.centering
  })
});

export default LoadingContainer;
