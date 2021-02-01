import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme';
import { LoginPage, SignupPage, MyPage, HomePage, CardListLumpPage } from '@/pages';
import { GlobalStyle } from '@/styles/';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/join" exact component={SignupPage} />
          <Route path="/team/:teamId" exact component={CardListLumpPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
