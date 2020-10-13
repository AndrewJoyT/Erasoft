/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Article from './src/pages/Article';

import store from './src/config/Redux/Store';
import { Provider } from 'react-redux';
const RNR = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNR);
