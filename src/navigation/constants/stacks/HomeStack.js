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
import { IntroStack } from './IntroStack';

const cardStyleInterpolator = ({ current, layouts }) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0]
          })
        }
      ]
    }
  };
};

export const HomeStack = [
  { name: INTRO_STACK, component: IntroNavigator },
  {
    name: HOME_SCREEN,
    component: HomeScreen,
    options: { cardStyleInterpolator }
  },
  { name: NOTIFICATION_SCREEN, component: NotificationScreen },
  { name: CAMERA_SCREEN, component: CameraScreen },
  {
    name: PROFILE_STACK,
    component: ProfileNavigator,
    options: { cardStyleInterpolator }
  },
  {
    name: YESTERDAY_STACK,
    component: YesterdayNavigator,
    options: { cardStyleInterpolator }
  }
];
