import { createTheme } from '@mui/material/styles';

/** 블랙 & 화이트 무채색 테마 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#000000', contrastText: '#ffffff' },
    secondary: { main: '#616161' },
    background: { default: '#fafafa', paper: '#ffffff' },
    text: { primary: '#111111', secondary: '#616161' },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 8 },
  spacing: 8,
});

export default theme;
