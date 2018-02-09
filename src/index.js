import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Switch, Route, withRouter } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createStore from './redux/create-store';
import AuthContainer from './components/authentication/AuthContainer';
import SearchContainer from './components/search/SearchContainer';
import './styles/index.css';
import {
  userIsNotAuthenticatedRedir,
  userIsAuthenticatedRedir
} from './utils/auth';
import './index.css';

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.__INITIAL_STATE__;
const history = createHistory();
const store = createStore(initialState, history);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

const auth = userIsNotAuthenticatedRedir(AuthContainer);
const search = userIsAuthenticatedRedir(SearchContainer);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/account" component={withRouter(auth)} />
          <Route component={withRouter(search)} />
        </Switch>
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE
  );
};

// ========================================================
// Go!
// ========================================================

render();
if (process.env.NODE_ENV === 'production') {
  registerServiceWorker(); // disable during dev/test
}
