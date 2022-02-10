import Snackbar from 'react-native-snackbar';
import { defaultTheme } from '../theme';

const DURATION = 3000;
const FONT_FAMILY = 'Poppins-SemiBold';
const ERROR_COLOR = defaultTheme.errorColor;
const SUCCESS_COLOR = defaultTheme.successColor;
const NEUTRAL_COLOR = 'black';

export const showSnackbar = (text, variant) => {
  const isNeutral = !variant || variant === 'neutral';
  const isError = variant === 'error';
  Snackbar.show({
    text: text,
    duration: DURATION,
    fontFamily: FONT_FAMILY,
    backgroundColor: isNeutral
      ? NEUTRAL_COLOR
      : isError
      ? ERROR_COLOR
      : SUCCESS_COLOR
  });
};
