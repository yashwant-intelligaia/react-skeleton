import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import About from './components/About';
import Home from './components/Home';
import Loading from './components/Loading';
import Login from './components/Login';
import NotFound from './components/NotFound';
import { getIsLoggedIn } from './utils';

const requireLogin = (to, from, next) => {
  var loggedIn = getIsLoggedIn();
  if (to.meta.auth) {
    if (loggedIn) {
      next();
    }else{
      next.redirect('/login');
    }
  } else {
    if (!loggedIn) {
      next();
    }else{
      next.redirect('/');
    }
  }
};
 
function App(){
  return <BrowserRouter>
    <GuardProvider guards={[requireLogin]} loading={Loading} error={NotFound}>
      <Switch>
        <GuardedRoute path="/login" exact meta={{ auth: false }}><Login/></GuardedRoute>
        <GuardedRoute path="/" exact meta={{ auth: true }} ><Home/></GuardedRoute>
        <GuardedRoute path="/about" exact meta={{ auth: true }} ><About/></GuardedRoute>
        <GuardedRoute path="*" exact><NotFound/></GuardedRoute>
      </Switch>
    </GuardProvider>
  </BrowserRouter>
}

export default App;
