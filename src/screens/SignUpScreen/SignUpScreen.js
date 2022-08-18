import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Button,
  Container,
  IconButton,
  Input,
  Spacer,
  Text
} from '../../common';
import { DIMENS, SPACING } from '../../constants';
import { useTheme } from '../../hooks';
import { translate } from '../../i18n';
import { useAuthContext } from '../../providers/AuthProvider';
import { showSnackbar } from '../../utils';
import CheckBox from 'expo-checkbox';
import { PRIVACY_POLICY_SCREEN } from '../../navigation';

const SignUpScreen = ({ navigation }) => {
  const translateKey = 'signUpScreen.';
  const { signUp } = useAuthContext();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
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
        <Spacer spacing="small" />
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
        <Spacer spacing="large" />
        <View style={styles.privacyPolicyContainer}>
          <CheckBox
            color={theme.primaryColor}
            onValueChange={setPrivacyPolicyChecked}
            value={privacyPolicyChecked}
          />
          <Spacer spacing="small" orientation="horizontal" />
          <Text style={{ fontSize: 10 }}>
            I agree to and have read captureit's{' '}
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(PRIVACY_POLICY_SCREEN)}
            >
              <Text
                style={{
                  color: theme.primaryColor,
                  fontSize: 10,
                  textDecorationLine: 'underline'
                }}
              >
                Privacy Policy
              </Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
        <Spacer spacing="extraLarge" />
        <Spacer spacing="medium" />
        <View style={styles.buttonContainer}>
          <Button
            title={translate(translateKey + 'button')}
            onPress={handleSignUp}
            loading={loading}
            disabled={
              !email.length ||
              !password.length ||
              password !== confirmPassword ||
              !privacyPolicyChecked
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
  },
  privacyPolicyContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default SignUpScreen;
