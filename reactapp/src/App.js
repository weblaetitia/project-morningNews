import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScreenHome from "./ScreenHome";
import ScreenSources from "./ScreenSource";
import ScreenMyArticles from "./ScreenMyArticles";
import ScreenArticlesBySource from "./ScreenArticlesBySource";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import wishList from "./reducers/article.reducer";
import userToken from "./reducers/token.reducer";

const store = createStore(combineReducers({ wishList, userToken }));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={ScreenHome} />
          <Route path="/sources" exact component={ScreenSources} />
          <Route path="/articles/" exact component={ScreenMyArticles} />
          <Route
            path="/articles/:id"
            exact
            component={ScreenArticlesBySource}
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
