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
        variant="secondary"
        iconSize="medium"
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
      />
      <View style={styles.centeredContainer}>
        <Text type="heading">{translate(translateKey + 'header')}</Text>
        <Text type="body">{translate(translateKey + 'subheader')}</Text>
        <Spacer spacing="extraLarge" />
        <Input
          value={email}
          title={translate(translateKey + 'input1Placeholder')}
          onChangeText={setEmail}
          placeholder={translate(translateKey + 'input1Placeholder')}
          autoCapitalize="none"
        />
        <Spacer spacing="large" />
        <Input
          value={password}
          onChangeText={setPassword}
          title={translate(translateKey + 'input2Placeholder')}
          placeholder={translate(translateKey + 'input2Placeholder')}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Spacer spacing="extraLarge" />
        <Spacer spacing="medium" />
        <View style={styles.buttonContainer}>
          <Button
            title={translate(translateKey + 'button')}
            onPress={handleLogin}
            loading={loading}
            disabled={!email.length || !password.length}
          />
        </View>
        <Spacer spacing="medium" />
        <View style={styles.forgotPasswordContainer}>
          <Text type="small">{translate(translateKey + 'forgotPassword')}</Text>
        </View>
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
  },
  buttonContainer: {
    width: 127,
    alignSelf: 'center'
  },
  forgotPasswordContainer: {
    alignSelf: 'center'
  }
});

export default LoginScreen;
