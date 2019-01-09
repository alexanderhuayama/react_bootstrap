import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import User from '../pages/maintenance/user';
import UserForm from '../pages/maintenance/user/UserForm';

// Styles
import '../assets/styles.css';

// Constantes de configuración
import { env } from '../utils/constants';

const App = () => {
  const { root, user } = env.path;

  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to={root} className="navbar-brand">Dashboard</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to={root} className="nav-link">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <span id="navbarDropdown" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Maintenance
                </span>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <Link to={user.root} className="dropdown-item">User</Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <main className="container">
          <Switch>
            <Route path={root} exact component={Home} />

            <Route path={user.root} exact component={User} />
            <Route path={`${user.root}${user.add}`} exact component={UserForm} />
            <Route path={`${user.root}${user.update}/:id`} exact component={UserForm} />
            <Route path={`${user.root}${user.detail}/:id`} exact component={UserForm} />

          </Switch>
        </main>
      </div>
    </BrowserRouter>
  )
};

export default App;
