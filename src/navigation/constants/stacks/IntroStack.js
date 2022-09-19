import { AvatarScreen, InfoScreen, ProfileImageScreen } from '../../../screens';
import { AVATAR_SCREEN, INFO_SCREEN, PROFILE_IMAGE_SCREEN } from '../routes';

export const IntroStack = [
  { name: PROFILE_IMAGE_SCREEN, component: ProfileImageScreen },
  { name: AVATAR_SCREEN, component: AvatarScreen },
  { name: INFO_SCREEN, component: InfoScreen }
];
