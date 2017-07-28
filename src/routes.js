import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Game } from './hangman/components/Game';
import { Movies } from './hangman/components/Movies';
import { States } from './hangman/components/States';
import { Videogames } from './hangman/components/Videogames';
import { TwoPlayer } from './hangman/components/TwoPlayer';
export default (
  <Route path="/" component={Game}>
    <Route path="/movies" component={Movies} />
    <Route path="/states" component={States} />
    <Route path="/videogames" component={Videogames} />
    <Route path="/twoplayer" component={TwoPlayer} />
  </Route>
)
