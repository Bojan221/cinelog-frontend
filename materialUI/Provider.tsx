'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';

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
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}