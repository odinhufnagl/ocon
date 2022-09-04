import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Container, Header, Spacer } from '../../common';
import { QuestionModal } from '../../components';
import useTheme from '../../hooks/useTheme';
import { translate } from '../../i18n';
import { PRIVACY_POLICY_SCREEN } from '../../navigation';
import { useAuthContext } from '../../providers/AuthProvider';
import { showSnackbar } from '../../utils';

const SettingsScreen = ({ navigation }) => {
  const { logOut } = useAuthContext();
  const { theme } = useTheme();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const handleLogout = () => {
    logOut();
  };
  const handleDeleteAccount = () => {
    showSnackbar(translate('snackbar.deleteAccount'), 'neutral');
  };

  const translateKey = 'settingsScreen.';
  return (
    <>
      <QuestionModal
        visible={logoutModalVisible}
        setVisible={setLogoutModalVisible}
        title={translate('modals.logOut.title')}
        buttonClose={{ title: translate('modals.logOut.buttonClose') }}
        buttonAction={{
          title: translate('modals.logOut.buttonAction'),
          onPress: handleLogout
        }}
      />

      <Container style={styles.container}>
        <Spacer spacing="large" />
        <Button
          title={translate(translateKey + 'privacyPolicy')}
          onPress={() => navigation.navigate(PRIVACY_POLICY_SCREEN)}
          shadow={false}
        />
        <Spacer />
        <Button
          title={translate(translateKey + 'logOut')}
          style={{ backgroundColor: theme.dp3 }}
          shadow={false}
          onPress={() => setLogoutModalVisible(true)}
        />
        <Spacer />
        <Button
          title={translate(translateKey + 'deleteAccount')}
          style={{ backgroundColor: theme.dp3 }}
          shadow={false}
          onPress={handleDeleteAccount}
        />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%'
  }
});
export default SettingsScreen;
