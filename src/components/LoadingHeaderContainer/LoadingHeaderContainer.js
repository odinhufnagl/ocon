import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from '../../common';
import { DIMENS } from '../../constants';
import useTheme from '../../hooks/useTheme';
import { translate } from '../../i18n';
import image from '../../../assets/images/logo/logo.png';
import Animated, { Easing, EasingNode } from 'react-native-reanimated';
const LoadingHeaderContainer = ({ animateOnFinish, animateTime, animate }) => {
  const { theme } = useTheme();

  const animation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    animate && startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: animateTime,
      useNativeDriver: true,
      easing: EasingNode.ease
    }).start(() => animateOnFinish());
  };

  return (
    <View style={styles.loadingContainer(theme)}>
      {/*
        <Text
          type="heading"
          animate={animate}
          animateTime={animateTime}
          animateOnFinish={animateOnFinish}
        >
          {translate('common.appName')}
        </Text>
  */}
      {animate && (
        <Animated.Image
          source={image}
          style={[styles.image, { opacity: animation }]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: (theme) => ({
    flex: 1,
    backgroundColor: theme.backgroundColor,
    ...DIMENS.common.centering
  }),
  image: {
    width: 75,
    height: 75
  }
});

export default LoadingHeaderContainer;
