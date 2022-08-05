import { AvatarScreen, InfoScreen } from '../../../screens';
import { AVATAR_SCREEN, INFO_SCREEN } from '../routes';

export const IntroStack = [
  { name: AVATAR_SCREEN, component: AvatarScreen },
  { name: INFO_SCREEN, component: InfoScreen }
];
