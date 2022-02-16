import { Header } from '../../../common';
import { translate } from '../../../i18n';
import { PostsScreen, YesterdayScreen } from '../../../screens';
import { POSTS_SCREEN, YESTERDAY_SCREEN } from '../routes';

export const YesterdayStack = [
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
  { name: POSTS_SCREEN, component: PostsScreen }
];
