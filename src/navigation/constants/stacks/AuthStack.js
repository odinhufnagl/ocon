import React from 'react';
import { Header } from '../../../common';
import { translate } from '../../../i18n';
import {
  LoginScreen,
  SignUpScreen,
  WelcomeScreen,
  PrivacyPolicyScreen
} from '../../../screens';
import {
  LOGIN_SCREEN,
  PRIVACY_POLICY_SCREEN,
  SIGN_UP_SCREEN,
  WELCOME_SCREEN
} from '../routes';

const cardStyleInterpolator = ({ current, layouts }) => {
  return {
    cardStyle: {
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0]
          })
        }
      ]
    }
  };
};

export const AuthStack = [
  {
    name: WELCOME_SCREEN,
    component: WelcomeScreen,
    options: { cardStyleInterpolator }
  },
  {
    name: LOGIN_SCREEN,
    component: LoginScreen,
    options: { cardStyleInterpolator }
  },
  {
    name: SIGN_UP_SCREEN,
    component: SignUpScreen,
    options: { cardStyleInterpolator }
  },
  {
    name: PRIVACY_POLICY_SCREEN,
    component: PrivacyPolicyScreen,
    options: ({ navigation }) => ({
      header: () => (
        <Header
          header={translate('headers.privacyPolicyScreen')}
          leftItems={[
            {
              icon: 'back',
              iconSize: 'medium',
              variant: 'secondary',
              onPress: () => navigation.goBack()
            }
          ]}
        />
      )
    })
  }
];
