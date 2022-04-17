import { PostsScreen, YesterdayScreen } from '../../../screens';
import { POSTS_SCREEN, YESTERDAY_SCREEN } from '../routes';

export const YesterdayStack = [
  {
    name: YESTERDAY_SCREEN,
    component: YesterdayScreen
  },
  { name: POSTS_SCREEN, component: PostsScreen }
];
