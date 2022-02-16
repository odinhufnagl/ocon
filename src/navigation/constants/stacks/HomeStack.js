import React from 'react';
import { Header } from '../../../common';
import { translate } from '../../../i18n';
import {
  CameraScreen,
  HomeScreen,
  ProfileScreen,
  YesterdayScreen
} from '../../../screens';
import {
  CAMERA_SCREEN,
  HOME_SCREEN,
  PROFILE_SCREEN,
  YESTERDAY_SCREEN
} from '../routes';

export const HomeStack = [
  {
    name: YESTERDAY_SCREEN,
    component: YesterdayScreen,
    options: {
      header: ({ navigation }) => (
        <Header
          header={translate('headers.yesterdayScreen')}
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
    }
  },
  { name: CAMERA_SCREEN, component: CameraScreen },
  {
    name: PROFILE_SCREEN,
    component: ProfileScreen,
    options: {
      header: ({ navigation }) => (
        <Header
          header={translate('headers.profileScreen')}
          leftItems={[
            {
              icon: 'back',
              iconSize: 'medium',
              variant: 'secondary',
              onPress: () => navigation.goBack()
            }
          ]}
          rightItems={[
            { icon: 'heart', variant: 'secondary' },
            { icon: 'settings', variant: 'secondary' }
          ]}
        />
      )
    }
  },
  {
    name: HOME_SCREEN,
    component: HomeScreen,
    options: {
      header: ({ navigation }) => (
        <Header
          rightItems={[
            { icon: 'explore' },
            { icon: 'profile', iconSize: 'medium' }
          ]}
        />
      )
    }
  }
];
