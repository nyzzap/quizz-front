import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import store from './store';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import QuizList from './components/QuizList';
import MyQuizList from './components/MyQuizList';

import PlayQuiz from './components/PlayQuiz';
import MyQuizzesPlayed from './components/MyQuizzesPlayed';
import QuizPlayed from './components/QuizPlayed';
import CreateQuiz from './components/CreateQuiz';

import 'bootstrap/dist/css/bootstrap.min.css';
import ModifyQuiz from './components/ModifyQuiz';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>

          <Navbar />
          <Switch>
            <Route exact path="/"  >
              <Home />
            </Route>
          </Switch>
          <Route path="/quizlist" component={QuizList} />
          <Route path="/playquiz" component={PlayQuiz} />
          <Route path="/myquizlist" component={MyQuizList} />
          <Route path="/modifyquiz" component={ModifyQuiz} />

          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/myquizzesplayed" component={MyQuizzesPlayed} />
          <Route path="/quizplayed" component={QuizPlayed} />
          <Route path="/createquiz" component={CreateQuiz} />
        </Router>
      </div>
    );
  }
}

export default App;