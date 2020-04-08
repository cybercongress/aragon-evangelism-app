import React from 'react';
import ReactDOM from 'react-dom';
import { AragonApi } from '@aragon/api-react';
import App from './App';

const reducer = state => {
  if (state === null) {
    return {
      isSyncing: true,
      believers: null,
    };
  }

  if (state.claims && state.account) {
    return {
      ...state,
      believers: state.believers
    };
  }

  return state;
};

ReactDOM.render(
  <AragonApi reducer={reducer}>
    <App />
  </AragonApi>,
  document.getElementById('root')
);
