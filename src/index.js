import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router, Route, IndexRoute, browserHistory } from 'react-router-dom'
import { App, Home, Login, Register, Wall } from 'containers';
import { Link } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <div>
          <Route path="/" component={ App}/>
          <Route path="/home" component={ Home}/>
          <Route path="/login" component={ Login}/>
          <Route path="/register" component={ Register }/>
          <Route path="/wall/:username" component={Wall}/>
        </div>
      </BrowserRouter>
    </Provider>, rootElement
);
