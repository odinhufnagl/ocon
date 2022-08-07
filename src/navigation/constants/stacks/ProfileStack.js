import React from 'react';
import { Header } from '../../../common';
import { translate } from '../../../i18n';
import {
  LikedPostsScreen,
  PostsScreen,
  ProfileScreen,
  SettingsScreen
} from '../../../screens';
import SettingsNavigator from '../../navigators/SettingsNavigator';
import {
  LIKED_POSTS_SCREEN,
  POSTS_SCREEN,
  PROFILE_SCREEN,
  SETTINGS_SCREEN,
  SETTINGS_STACK
} from '../routes';
import { SettingsStack } from './SettingsStack';

export const ProfileStack = [
  {
    name: PROFILE_SCREEN,
    component: ProfileScreen
  },
  {
    name: SETTINGS_STACK,
    component: SettingsNavigator
  },
  { name: LIKED_POSTS_SCREEN, component: LikedPostsScreen },
  { name: POSTS_SCREEN, component: PostsScreen }
];
