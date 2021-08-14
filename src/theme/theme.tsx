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
  /* darkDisabledGray: 'rgba(255, 255, 255,0.1)', */

  // Light Mode Text:
  fontDarkest: '#07090D',
  fontDarkSubheader: '#5d6579',
  lightBackground: '#f7fbff',
  disabledGray: 'rgba(48,55,121,0.1)',

  black: '#0E121B',
  white: '#FFF',
}

export const lightTheme = createTheme({
  colors: {
    primary: palette.primary,

    white: palette.white,
    black: palette.black,

    buttonPrimaryBackground: palette.primary,
    buttonDisabled: palette.disabledGray,

    fontHeader: palette.fontDarkest,
    fontSubheader: palette.fontDarkSubheader,

    mainBackground: palette.lightBackground,
    mainForeground: palette.black,
    cardPrimaryBackground: palette.white,
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

    fontHeader: palette.fontLightest,
    fontSubheader: palette.fontLightSubheader,
  },
})

export type Theme = typeof lightTheme
export const Box = createBox<Theme>()
export const useTheme = () => useReTheme<Theme>()
