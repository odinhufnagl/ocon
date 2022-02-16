import React from 'react';
import { Header } from '../../../common';
import { CameraScreen, HomeScreen, NotificationScreen } from '../../../screens';
import IntroNavigator from '../../navigators/IntroNavigator';
import ProfileNavigator from '../../navigators/ProfileNavigator';
import YesterdayNavigator from '../../navigators/YesterdayNavigator';
import {
  CAMERA_SCREEN,
  HOME_SCREEN,
  INTRO_STACK,
  NOTIFICATION_SCREEN,
  PROFILE_STACK,
  YESTERDAY_STACK
} from '../routes';

export const HomeStack = [
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
  },
  { name: NOTIFICATION_SCREEN, component: NotificationScreen },
  { name: CAMERA_SCREEN, component: CameraScreen },
  { name: INTRO_STACK, component: IntroNavigator },
  { name: PROFILE_STACK, component: ProfileNavigator },
  { name: YESTERDAY_STACK, component: YesterdayNavigator }
];
