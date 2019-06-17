import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import UserContext, { initUserContextState } from './contexts/UserContext';
import 'rc-slider/assets/index.css';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

const Landing = React.lazy(() => import('./views/Pages/Landing'));

class App extends Component {
  state = initUserContextState;

  setValue = (key, val) => {
    this.setState({[key]: val});
  }

  setValues = (newValues) => {
    this.setState({ ...this.state, ...newValues });
  }

  render() {

    return (
      <UserContext.Provider value={{ ...this.state, setValue: this.setValue, setValues: this.setValues }}>
        <HashRouter>
            <React.Suspense fallback={loading()}>
              <Switch>
                <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
                <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
                
                <Route exact path="/" name="Landing" render={props => <Landing {...props}/>} />

                <Route path="/" name="Landing" render={props => <DefaultLayout {...props}/>} />

              </Switch>
            </React.Suspense>
        </HashRouter>
      </UserContext.Provider>
    );
  }
}

export default App;
