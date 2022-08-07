import React from 'react';
import { Header } from '../../../common';
import { translate } from '../../../i18n';
import { SettingsScreen, PrivacyPolicyScreen } from '../../../screens';

import { defaultTheme } from '../../../theme';
import { PRIVACY_POLICY_SCREEN, SETTINGS_SCREEN } from '../routes';

export const SettingsStack = [
  {
    name: SETTINGS_SCREEN,
    component: SettingsScreen,
    options: ({ navigation }) => ({
      header: () => (
        <Header
          header={translate('headers.settingsScreen')}
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
