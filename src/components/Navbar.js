import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

import {NavDropdown } from 'react-bootstrap';

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                 <li className="nav-item dropdown">
                 <NavDropdown title="Quizzes" id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.1" >
                     <Link className="nav-link" to="quizlist">Quiz List</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="4.2">
                        <Link className="nav-link" to="quizlist">My Quizzes</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3">
                        <Link className="nav-link" to="myquizzesplayed">My Quizzes Played</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.4">
                        <Link className="nav-link" to="createquiz">Create Quiz</Link>
                    </NavDropdown.Item>
                    
                    </NavDropdown>
                </li>
                 <li className="nav-item">
                    <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>
                        <img src='https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png' alt={user.name} title={user.name} className="rounded-circle"
                            style={{ width: '25px', marginRight: '5px'}} />
                            <b>{user.name}</b>  <i>Logout</i>
                    </a>
                </li>
            </ul>
        )
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="register">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Sign In</Link>
            </li>
        </ul>
      )
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">QuizApp</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));