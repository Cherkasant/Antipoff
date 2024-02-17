import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Home from '../Home';
import SignUp from '../SignUp';
import Profile from '../Profile';

export enum PathNames {
  Home = '/main',
  SignUp = '/',
  Profile = '/profile/:id'
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PathNames.SignUp} element={<SignUp />} />
        <Route path={PathNames.Home} element={<Home />} />
        <Route path={PathNames.Profile} element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
