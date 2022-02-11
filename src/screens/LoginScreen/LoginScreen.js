import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Container,
  IconButton,
  Input,
  Spacer,
  Text
} from '../../common';
import { DIMENS, SPACING } from '../../constants';
import { translate } from '../../i18n';
import { useAuthContext } from '../../providers/AuthProvider';
import { showSnackbar } from '../../utils';

const LoginScreen = ({ navigation }) => {
  const translateKey = 'loginScreen.';
  const { logIn } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const res = await logIn(email, password);
    if (!res) {
      showSnackbar(translate('snackbar.loginError'), 'error');
      setLoading(false);
    }
  };
  return (
    <Container style={styles.container}>
      <IconButton
        icon="back"
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
      />
      <View style={styles.centeredContainer}>
        <Text type="heading">{translate(translateKey + 'header')}</Text>
        <Spacer spacing="medium" />
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder={translate(translateKey + 'input1Placeholder')}
          autoCapitalize="none"
        />
        <Spacer spacing="large" />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder={translate(translateKey + 'input2Placeholder')}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Spacer spacing="large" />
        <Button
          title={translate(translateKey + 'button')}
          onPress={handleLogin}
          loading={loading}
          disabled={!email.length || !password.length}
        />
        <Spacer spacing="medium" />
        <Text type="small">{translate(translateKey + 'forgotPassword')}</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    ...DIMENS.common.centering,
    paddingBottom: 0
  },
  backIcon: {
    position: 'absolute',
    top: SPACING.medium,
    left: 0
  },
  centeredContainer: {
    width: '100%'
  }
});

export default LoginScreen;
