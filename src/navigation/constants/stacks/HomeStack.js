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
  { name: CAMERA_SCREEN, component: CameraScreen },
  { name: PROFILE_SCREEN, component: ProfileScreen },
  { name: HOME_SCREEN, component: HomeScreen },
  { name: YESTERDAY_SCREEN, component: YesterdayScreen }
];
