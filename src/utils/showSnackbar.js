import Snackbar from 'react-native-snackbar';
import { FONT_FAMILY } from '../constants/typography';
import { defaultTheme } from '../theme';

const DURATION = 3000;

const ERROR_COLOR = defaultTheme.errorColor;
const SUCCESS_COLOR = defaultTheme.successColor;
const NEUTRAL_COLOR = 'black';

export const showSnackbar = (text, variant, duration = DURATION) => {
  const isNeutral = !variant || variant === 'neutral';
  const isError = variant === 'error';
  Snackbar.show({
    text: text,
    duration: duration,
    fontFamily: FONT_FAMILY.semiBold,
    backgroundColor: isNeutral
      ? NEUTRAL_COLOR
      : isError
      ? ERROR_COLOR
      : SUCCESS_COLOR
  });
};
