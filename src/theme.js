import { createTheme } from '@mui/material/styles';

/**
 * 컬러 팔레트 디자인 시스템 기반 테마.
 * 시스템 다크모드(prefers-color-scheme)를 자동으로 따릅니다.
 * 컴포넌트에서는 index.css 의 --color-* 변수를 사용합니다.
 */
const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'media' },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#111111', contrastText: '#FFFFFF' },
        secondary: { main: '#E9E6E1' },
        background: { default: '#FFFFFF', paper: '#F5F5F5' },
        text: { primary: '#111111', secondary: '#555555' },
        divider: '#E5E5E5',
      },
    },
    dark: {
      palette: {
        primary: { main: '#FFFFFF', contrastText: '#0A0A0A' },
        secondary: { main: '#2A2926' },
        background: { default: '#0A0A0A', paper: '#161616' },
        text: { primary: '#F5F5F5', secondary: '#BBBBBB' },
        divider: '#2E2E2E',
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 8 },
  spacing: 8,
});

export default theme;
