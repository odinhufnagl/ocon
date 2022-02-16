export const FONT_FAMILY = {
  PoppinsBold: 'Poppins-Bold',
  PoppinsSemiBold: 'Poppins-SemiBold',
  PoppinsRegular: 'Poppins-Regular'
};

export default {
  headingText: (theme) => ({
    fontFamily: FONT_FAMILY.PoppinsSemiBold,
    color: theme.textPrimaryColor,
    fontSize: 30
  }),
  bodyText: (theme) => ({
    fontFamily: FONT_FAMILY.PoppinsRegular,
    color: theme.textMediumColor,
    fontSize: 15
  }),
  bodyTextBold: (theme) => ({
    fontFamily: FONT_FAMILY.PoppinsSemiBold,
    color: theme.textPrimaryColor,
    fontSize: 15
  }),
  smallText: (theme) => ({
    fontFamily: FONT_FAMILY.PoppinsRegular,
    color: theme.textLowColor,
    fontSize: 13
  }),
  smallTextBold: (theme) => ({
    fontFamily: FONT_FAMILY.PoppinsSemiBold,
    color: theme.textLowColor,
    fontSize: 13
  }),
  primaryButtonText: (theme) => ({
    fontFamily: FONT_FAMILY.PoppinsSemiBold,
    color: theme.white,
    fontSize: 15
  }),
  secondaryButtonText: (theme) => ({
    fontFamily: FONT_FAMILY.PoppinsSemiBold,
    color: theme.secondaryButtonColor,
    fontSize: 15
  }),
  primaryInputText: (theme) => ({
    fontFamily: FONT_FAMILY.PoppinsSemiBold,
    color: theme.primaryInputTextColor,
    fontSize: 15
  }),
  headerText: (theme) => ({
    fontFamily: FONT_FAMILY.PoppinsSemiBold,
    color: theme.primaryInputTextColor,
    fontSize: 23
  }),
  largeHeaderText: (theme) => ({
    fontFamily: FONT_FAMILY.PoppinsSemiBold,
    color: theme.textPrimaryColor,
    fontSize: 50
  })
};
