import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Chat from './components/Chat/chat';
import Home from './components/home';
import Channels from './components/channel';
import SplashPage from './components/SplashPage/splashpage';
import Dashboard from './components/dashboard/dashboard';
import FriendsList from './components/dashboard/friendslist';
import ServerDiscovery from './components/dashboard/serverdiscovery';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>


      <Switch>
        <Route path={['/login', '/register' ]} exact={true}>
          <LoginForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true} >
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path={['/channels', '/channels/:serverid' , '/channels/:serverid/:channelid']} exact={true}>
          <Dashboard />


        </ProtectedRoute>
        <ProtectedRoute path={['/guild-discovery']} exact={true}>
          <ServerDiscovery />

        </ProtectedRoute>

        <ProtectedRoute path='/chat' exact={true}>
          <Chat />
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <Route path = '*'>
            <Redirect to='/' />
          </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
