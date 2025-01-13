const palette = {
  primary: {
    light: '#4dabf5',
    main: '#2196f3',
    dark: '#1769aa',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  success: {
    light: '#4caf50',
    main: '#2e7d32',
    dark: '#1b5e20',
  },
  error: {
    light: '#ef5350',
    main: '#d32f2f',
    dark: '#c62828',
  },
};

export const lightTheme = {
  colors: {
    primary: palette.primary.main,
    background: palette.grey[50],
    card: '#ffffff',
    text: palette.grey[900],
    border: palette.grey[200],
    placeholder: palette.grey[100],
    error: palette.error.main,
    success: palette.success.main,
    textSecondary: palette.grey[600],
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
  typography: {
    title: {
      fontSize: 24,
      fontWeight: '700' as const,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600' as const,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      color: palette.grey[600],
    },
  },
  shadows: {
    card: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    primary: palette.primary.light,
    background: palette.grey[900],
    card: palette.grey[800],
    text: palette.grey[50],
    border: palette.grey[700],
    placeholder: palette.grey[700],
    error: palette.error.light,
    success: palette.success.light,
    textSecondary: palette.grey[400],
  },
  shadows: {
    card: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    },
  },
};

export type Theme = typeof lightTheme;
export const theme = lightTheme; 