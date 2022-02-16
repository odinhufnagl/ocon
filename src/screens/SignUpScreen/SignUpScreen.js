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

const SignUpScreen = ({ navigation }) => {
  const translateKey = 'signUpScreen.';
  const { signUp } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    const res = await signUp(email, password);
    if (!res) {
      showSnackbar(translate('snackbar.signUpError'), 'error');
      setLoading(false);
    }
  };
  return (
    <Container style={styles.container}>
      <IconButton
        variant="secondary"
        iconSize="medium"
        icon="back"
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
      />
      <View style={styles.centeredContainer}>
        <Text type="heading">{translate(translateKey + 'header')}</Text>
        <Text type="body">{translate(translateKey + 'subheader')}</Text>
        <Spacer spacing="extraLarge" />
        <Input
          value={email}
          onChangeText={setEmail}
          title={translate(translateKey + 'input1Placeholder')}
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
        <Spacer spacing="large" />
        <Input
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          title={translate(translateKey + 'input3Placeholder')}
          placeholder={translate(translateKey + 'input3Placeholder')}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Spacer spacing="extraLarge" />
        <View style={styles.buttonContainer}>
          <Button
            title={translate(translateKey + 'button')}
            onPress={handleSignUp}
            loading={loading}
            disabled={
              !email.length || !password.length || password !== confirmPassword
            }
          />
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
  }
});

export default SignUpScreen;
