import { Header } from '../../../common';
import { translate } from '../../../i18n';
import { PostsScreen, ProfileScreen, SettingsScreen } from '../../../screens';
import { POSTS_SCREEN, PROFILE_SCREEN, SETTINGS_SCREEN } from '../routes';

export const ProfileStack = [
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
  { name: SETTINGS_SCREEN, component: SettingsScreen },
  { name: POSTS_SCREEN, component: PostsScreen }
];
