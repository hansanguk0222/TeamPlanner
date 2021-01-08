import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme';
import LoginBox from '@/components/LoginBox/LoginBox';
import { GlobalStyle } from '@/styles/';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LoginBox />
    </ThemeProvider>
  );
};

export default App;
