export const FONT_FAMILY = {
  bold: 'Poppins-Bold',
  semiBold: 'Poppins-SemiBold',
  regular: 'Poppins-Regular'
};

export default {
  headingText: (theme) => ({
    fontFamily: FONT_FAMILY.semiBold,
    color: theme.textPrimaryColor,
    fontSize: 30
  }),
  bodyText: (theme) => ({
    fontFamily: FONT_FAMILY.regular,
    color: theme.textMediumColor,
    fontSize: 15
  }),
  bodyTextBold: (theme) => ({
    fontFamily: FONT_FAMILY.semiBold,
    color: theme.textPrimaryColor,
    fontSize: 15
  }),
  smallText: (theme) => ({
    fontFamily: FONT_FAMILY.regular,
    color: theme.textMediumColor,
    fontSize: 12
  }),
  smallTextBold: (theme) => ({
    fontFamily: FONT_FAMILY.semiBold,
    color: theme.textMediumColor,
    fontSize: 12
  }),
  primaryButtonText: (theme) => ({
    fontFamily: FONT_FAMILY.semiBold,
    color: theme.white,
    fontSize: 14
  }),
  secondaryButtonText: (theme) => ({
    fontFamily: FONT_FAMILY.semiBold,
    color: theme.white,
    fontSize: 14
  }),
  thirdButtonText: (theme) => ({
    fontFamily: FONT_FAMILY.semiBold,
    color: theme.white,
    fontSize: 11
  }),
  primaryInputText: (theme) => ({
    fontFamily: FONT_FAMILY.semiBold,
    color: theme.primaryInputTextColor,
    fontSize: 14
  }),
  headerText: (theme) => ({
    fontFamily: FONT_FAMILY.semiBold,
    color: theme.white,
    fontSize: 20
  }),
  largeHeaderText: (theme) => ({
    fontFamily: FONT_FAMILY.regular,
    color: theme.textPrimaryColor,
    fontSize: 50
  })
};
