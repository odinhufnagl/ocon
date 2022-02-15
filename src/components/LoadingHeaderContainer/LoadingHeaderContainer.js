import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../common';
import { DIMENS } from '../../constants';
import useTheme from '../../hooks/useTheme';
import { translate } from '../../i18n';

const LoadingHeaderContainer = ({ animateOnFinish, animateTime, animate }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.loadingContainer(theme)}>
      <Text
        type="heading"
        animate={animate}
        animateTime={animateTime}
        animateOnFinish={animateOnFinish}
      >
        {translate('common.appName')}
      </Text>
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

export default LoadingHeaderContainer;
