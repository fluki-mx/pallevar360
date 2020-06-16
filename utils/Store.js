/**
 * Store de la Plataforma para compartir data entre múltiples componentes,
 * funciona como redux.
 */

import * as React from 'react';
import { Paginator } from './funcs';

// State Global, contiene: 
//  - El cátalogo de películas
//  - Pagina actual 
//  - Película actual
//  - Si el reproductor esta en play.
const State = {
  catalog: undefined,
  activePage: 1,
  activeMovie: -1,
  playing: false
};

const listeners = new Set();

function updateComponents() {
  for (const cb of listeners.values()) {
    cb();
  }
}

export function initialize() {
  const catalog = Paginator(State.activePage, 3);
  State.catalog = catalog;
  updateComponents();
}

export function activeMovie(id) {
  State.activeMovie = id;
  updateComponents();
}

export function changePlayerStatus() {
  State.playing = !State.playing;
  updateComponents();
}

export function changePage(num) {
  State.activePage = num;
  State.activeMovie = -1;
  const catalog = Paginator(num, 3)

  State.catalog = catalog
  updateComponents( )
}

export function connect(Component) {
  return class Wrapper extends React.Component {
    state = {
      catalog: State.catalog,
      activeMovie: State.activeMovie,
      playing: State.playing
    };

    _listener = () => {
      this.setState({
        catalog: State.catalog,
        activeMovie: State.activeMovie,
        playing: State.playing
      });
    };

    componentDidMount() {
      listeners.add(this._listener);
    }

    componentWillUnmount() {
      listeners.delete(this._listener);
    }

    render() {
      return (
        <Component
          {...this.props}
          catalog={this.state.catalog}
          activeMovie={this.state.activeMovie}
          playing={this.state.playing}
        />
      );
    }
  };
}
