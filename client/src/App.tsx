import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme';
import { LoginPage, SignupPage } from '@/pages';
import { GlobalStyle } from '@/styles/';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/join" component={SignupPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
