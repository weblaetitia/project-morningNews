import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ScreenHome from './ScreenHome';
import ScreenSources from './ScreenSource'
import ScreenMyArticles from './ScreenMyArticles'
import ScreenArticlesBySource from './ScreenArticlesBySource'

function App() {
    return (
    <Router >
      <Switch>
        <Route path='/' exact component={ScreenHome} />
        <Route path='/sources' exact component={ScreenSources} />
        <Route path='/articles/' exact component={ScreenMyArticles} />
        <Route path='/articles/:id' exact component={ScreenArticlesBySource} />
      </Switch>
    </Router>
  );
}

export default App;
