import {
  createBox,
  createText,
  createTheme,
  useTheme as useReTheme,
} from '@shopify/restyle'

export const Text = createText<Theme>()

Text.defaultProps = {
  variant: 'body',
}

export const palette = {
  primary: '#303779',

  // Dark Mode:
  fontLightest: '#FFF',
  fontLightSubheader: '#3a3a3a',
  darkBackground: '#141414',
  darkInputBlurBorder: 'rgba(255,255,255,0.1)',
  darkInputBG: '#262837',
  darkDisabledButtonBorder: 'rgba(255,255,255,0.1)',

  // Light Mode Text:
  fontDarkest: '#07090D',
  fontDarkSubheader: '#5d6579',
  lightBackground: '#fff',
  disabledGray: 'rgba(48,55,121,0.1)',
  lightInputBlurBorder: 'rgba(48,55,121,0.2)',
  lightInputBG: '#f1f3fd',
  lightDisabledButtonBorder: '#D9D9D9',

  inputErrorBG: 'rgba(223,31,21,0.1)',
  /* placeholder: PlatformColor('placeholderText').valueOf().toString(), */
  black: '#0E121B',
  white: '#FFF',
  error: '#df1f15',
}

export const lightTheme = createTheme({
  colors: {
    primary: palette.primary,
    error: palette.error,

    white: palette.white,
    black: palette.black,

    buttonPrimaryBackground: palette.primary,
    buttonDisabled: palette.disabledGray,
    buttonDisabledBorder: palette.lightDisabledButtonBorder,

    fontHeader: palette.fontDarkest,
    fontSubheader: palette.fontDarkSubheader,
    /* placeholder: palette.placeholder, */

    mainBackground: palette.lightBackground,
    mainForeground: palette.black,
    cardPrimaryBackground: palette.white,
    inputBlurColor: palette.lightInputBlurBorder,
    inputBG: palette.lightInputBG,
    inputErrorBG: palette.inputErrorBG,
  },
  cardVariants: {
    defaults: {
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
    },
    regular: {
      // We can refer to other values in the theme here, and use responsive props
      padding: {
        phone: 's',
        tablet: 'm',
      },
    },
    elevated: {
      padding: {
        phone: 's',
        tablet: 'm',
      },
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 15,
      elevation: 5,
    },
  },
  spacing: {
    inputS: 12,
    inputM: 20,
    xs: 4,
    s: 8,
    m: 14,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  borderRadii: {
    xs: 4,
    s: 8,
    m: 14,
    l: 24,
    xl: 40,
    xxl: 80,
  },
  textVariants: {
    heading: {
      fontWeight: '600',
      fontSize: 32,
      lineHeight: 40,
      color: 'fontHeader',
      letterSpacing: 0.5,
      textAlign: 'center',
    },
    subheader: {
      fontWeight: '500',
      fontSize: 20,
      lineHeight: 26,
      color: 'fontSubheader',
    },
    body: {
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      color: 'fontHeader',
    },
    link: {
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
      color: 'primary',
    },
    button: {
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 20,
      color: 'white',
    },
    placeholder: {
      fontSize: 14,
      color: 'placeholder',
    },
    outlinedButton: {
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 20,
      color: 'primary',
    },
    outlinedButtonDisabled: {
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 20,
      color: 'buttonDisabled',
    },
  },
})

export const darkTheme: Theme = createTheme({
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    mainBackground: palette.darkBackground,
    mainForeground: palette.white,
    cardPrimaryBackground: palette.darkBackground,

    buttonDisabledBorder: palette.darkDisabledButtonBorder,

    fontHeader: palette.fontLightest,
    fontSubheader: palette.fontLightSubheader,
    inputBlurColor: palette.darkInputBlurBorder,
    inputBG: palette.darkInputBG,
  },
})

export type Theme = typeof lightTheme
export const Box = createBox<Theme>()
export const useTheme = () => useReTheme<Theme>()
