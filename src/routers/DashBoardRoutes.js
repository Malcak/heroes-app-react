import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';
import { DCScreen } from '../components/dc/DCScreen';
import { MarvelScreen } from '../components/marvel/MarvelScreen';
import { HeroScreen } from '../components/heroes/HeroScreen';
import { SearchScreen } from '../components/search/SearchScreen';

export const DashBoardRoutes = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="container-fluid mt-2">
        <Switch>
          <Route exact path="/dc" component={DCScreen} />
          <Route exact path="/marvel" component={MarvelScreen} />
          <Route exact path="/hero/:heroId" component={HeroScreen} />
          <Route exact path="/search" component={SearchScreen} />
          <Redirect to="/dc" />
        </Switch>
      </div>
    </>
  );
};
