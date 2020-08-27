import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import RootReducer from './redux/reducers/RootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSagas from './saga/rootSaga';

// khoi tao middleware
const sagaMiddleware = createSagaMiddleware();

// them middleware saga
const store = createStore(RootReducer, applyMiddleware(sagaMiddleware));

//chay root saga
sagaMiddleware.run(rootSagas);

const root = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(root, document.getElementById('root'));