import * as React from 'react';
import { Paginator } from './funcs';

/**
 * If you want to share data between multiple root components, you'll need a
 * global store like Redux. This is similar to building a web app where you
 * want to synchronize data between a sidebar and a main view - just extended
 * into three dimensions.
 * To simplify this sample, we implement a trivial Redux-like store that will
 * ensure all of our elements are synchronized.
 */
const State = {
  catalog: undefined,
  activePage: 1,
  activeMovie: -1,
};

const listeners = new Set();

function updateComponents() {
  for (const cb of listeners.values()) {
    cb();
  }
}

export function initialize() {
  const catalog = Paginator(State.activePage, 3)
  State.catalog = catalog
  updateComponents( )
}

export function activeMovie(id) {
  State.activeMovie = id;
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
    };

    _listener = () => {
      this.setState({
        catalog: State.catalog,
        activeMovie: State.activeMovie,
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
        />
      );
    }
  };
}
