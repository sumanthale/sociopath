import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import LandingPage from './components/Layouts/LandingPage';
import Home from './components/Layouts/Home';
import { Component } from 'react';
import { auth } from './firebase/firebase';
import { connect, useSelector } from 'react-redux';
import { signSuccess, signInFailure } from './redux/user/user.actions';
import { compose } from 'redux';
import ForgotPassword from './components/Login/ForgotPassword';
import Profile from './components/Layouts/Profile/Profile';
import NavBar from './components/Layouts/NavBar/NavBar';
import Error from './components/Reusable/Error';

class App extends Component {
  componentDidMount() {
    const { signSuccess, signInFailure } = this.props;
    auth.onAuthStateChanged((user) => {
      if (user) {
        signSuccess(user);
      } else {
        signInFailure(null);
      }
    });
  }
  render() {
    const { user, loading } = this.props;
    return (
      <>
        {user && (
          <div style={{ height: '6rem' }}>
            <NavBar />
          </div>
        )}
        {!loading && (
          <Switch>
            <Route exact path="/login">
              {user ? <Redirect to="/" /> : <LandingPage />}
            </Route>
            <Route exact path="/register">
              {user ? <Redirect to="/" /> : <LandingPage />}
            </Route>
            <CustomRoute exact path="/" component={Home} />
            <CustomRoute exact path="/:profile" component={Profile} />

            <Route exact path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="**" render={() => <Error />} />
          </Switch>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.currentUser,
  loading: user.loading,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { signSuccess, signInFailure })
)(App);

const CustomRoute = (props) => {
  const user = useSelector((state) => state.user.currentUser);

  console.log('in custom route');
  if (user) {
    return <Route {...props} />;
  }
  return <Redirect to="/login" />;
};
