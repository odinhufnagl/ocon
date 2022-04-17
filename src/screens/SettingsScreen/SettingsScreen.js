import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Container, Spacer } from '../../common';
import { translate } from '../../i18n';
import { useAuthContext } from '../../providers/AuthProvider';

const SettingsScreen = () => {
  const { logOut } = useAuthContext();

  const handleLogout = () => {
    logOut();
  };

  const handleDeleteAccount = () => {};

  const translateKey = 'settingsScreen.';
  return (
    <Container style={styles.container}>
      <Button
        title={translate(translateKey + 'logOut')}
        variant="secondary"
        onPress={handleLogout}
      />
      <Spacer spacing="large" />
      <Button
        title={translate(translateKey + 'deleteAccount')}
        variant="secondary"
        onPress={handleDeleteAccount}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    alignSelf: 'center'
  }
});
export default SettingsScreen;
