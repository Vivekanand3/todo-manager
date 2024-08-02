import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import ProjectView from './components/ProjectView';
import Login from './components/Login';
import Register from './components/Register';
import { getToken, setToken, removeToken } from './utils/token';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  const handleLogin = (token) => {
    setToken(token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {isLoggedIn ? (
              <li onClick={handleLogout}>Logout</li>
            ) : (
              <li><a href="/login">Login</a></li>
            )}
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/project/:id" component={ProjectView} />
          <Route path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
