import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import createStore from './utils/create-store';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import TokenSale from './components/TokenSale';

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.__INITIAL_STATE__;
const history = createHistory();
const store = createStore(initialState, history);

const url = new URL(window.location.href);
if (url.searchParams) {
  const ref = url.searchParams && url.searchParams.get('ref');
  if (ref) {
    localStorage.setItem('ref', ref);
  }
  const code = url.searchParams.get('referrer');
  if (code) {
    localStorage.setItem('code', code);
  }
}

localStorage.setItem('referrer', document.referrer);

// ========================================================
// Render Setup
// ========================================================

try {
  ReactDOM.render(
    <Provider store={store}>
      <TokenSale />
    </Provider>,
    document.getElementById('root')
  );
} catch (e) {
  console.error(e);
}

//registerServiceWorker();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.unregister();
  });
}
