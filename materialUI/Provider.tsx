'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';

interface Props {
    children: React.ReactNode
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

export default function MaterialProvider({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}