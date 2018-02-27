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
import LandingScreen from './components/landing/LandingScreen';
import DiscoverScreen from './components/discover/DiscoverScreen';
import PurchasesScreen from './components/purchases/PurchasesScreen';
import AddSensorScreen from './components/add-sensor/AddSensorScreen';
import WalletScreen from './components/wallet/WalletScreen';
import SensorDetailsScreen from './components/sensor-details/SensorDetailsScreen';

import './styles/index.css';
import WebFontLoader from 'webfontloader';
import {
  userIsNotAuthenticatedRedir,
  userIsAuthenticatedRedir
} from './utils/auth';
import './index.css';

WebFontLoader.load({
  google: {
    families: ['Open Sans:300,400,500,700', 'Material Icons']
  }
});

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

// const auth = userIsNotAuthenticatedRedir(AuthContainer);
// const search = userIsAuthenticatedRedir(SearchContainer);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {/*}<Route path="/account" component={withRouter(auth)} />*/}
          <Route path="/discover" component={withRouter(DiscoverScreen)} />
          <Route path="/purchases" component={withRouter(PurchasesScreen)} />
          <Route path="/add-sensor" component={withRouter(AddSensorScreen)} />
          <Route path="/wallet" component={withRouter(WalletScreen)} />
          <Route path="/sensor-details/:id" component={withRouter(SensorDetailsScreen)} />
          <Route path="/" component={withRouter(LandingScreen)} />
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
