import React from 'react';
import { Header } from '../../../common';
import { translate } from '../../../i18n';
import {
  LikedPostsScreen,
  PostsScreen,
  ProfileScreen,
  SettingsScreen
} from '../../../screens';
import {
  LIKED_POSTS_SCREEN,
  POSTS_SCREEN,
  PROFILE_SCREEN,
  SETTINGS_SCREEN
} from '../routes';

export const ProfileStack = [
  {
    name: PROFILE_SCREEN,
    component: ProfileScreen
  },
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
  { name: LIKED_POSTS_SCREEN, component: LikedPostsScreen },
  { name: POSTS_SCREEN, component: PostsScreen }
];
