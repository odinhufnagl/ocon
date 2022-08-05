import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Container } from '../../common';
import useTheme from '../../hooks/useTheme';
import { translate } from '../../i18n';
import { useAuthContext } from '../../providers/AuthProvider';

const SettingsScreen = () => {
  const { logOut } = useAuthContext();

  const handleLogout = () => {
    logOut();
  };

  const translateKey = 'settingsScreen.';
  return (
    <Container style={styles.container}>
      <Button
        title={translate(translateKey + 'logOut')}
        style={{ backgroundColor: theme.dp3 }}
        shadow={false}
        onPress={handleLogout}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '90%'
  }
});
export default SettingsScreen;
