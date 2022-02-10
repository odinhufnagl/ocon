import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAuthContext } from '../providers/AuthProvider';
import { ThemeContext } from '../theme';
import AuthNavigator from './navigators/AuthNavigator';
import HomeNavigator from './navigators/HomeNavigator';

const RootNavigator = () => {
  const { currentUser } = useAuthContext();
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.root(theme)}>
      {currentUser ? <HomeNavigator /> : <AuthNavigator />}
    </View>
  );
};

const styles = StyleSheet.create({
  root: (theme) => ({
    backgroundColor: 'blue',
    flex: 1
  })
});

export default RootNavigator;
