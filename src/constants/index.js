import COUNTRIES from './countries';
import COUNTRY_CODES from './countryCodes';
import DIMENS from './dimensions';
import IMAGES from './images';
import SPACING from './spacing';
import TYPOGRAPHY from './typography';
import PAGINATION from './pagination';
import PERMISSIONS from './permissions';
const CAMERA_TIMER = '600';
const VIDEO_MAX_LENGTH = 10;
const MAX_REACIONS = 10;
const EMOJI_NAMES = {
  HEART_EYES: 'heart_eyes',
  GRINNING: 'grinning'
};
const REACTION_TYPE_IDS = {
  [EMOJI_NAMES.GRINNING]: 1,
  [EMOJI_NAMES.HEART_EYES]: 2
};
export {
  DIMENS,
  SPACING,
  TYPOGRAPHY,
  CAMERA_TIMER,
  MAX_REACIONS,
  EMOJI_NAMES,
  IMAGES,
  COUNTRIES,
  COUNTRY_CODES,
  REACTION_TYPE_IDS,
  PAGINATION,
  PERMISSIONS,
  VIDEO_MAX_LENGTH
};
