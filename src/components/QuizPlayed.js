import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Row, Card, Col } from 'react-bootstrap';
import { setCurrentPlayQuestion, playQuiz } from '../actions/quiz';
import { createAnswers } from '../actions/answers';
import PlayQuestion from './PlayQuestion';
const initialState = {
    errors: {}
};
class QuizPlayed extends Component {
    constructor() {
        super();
        this.state = { ...initialState };
    }
    
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
      


        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    render() {
        const { quizPlayed } = this.props;
        
        return (
            <div>
                <Row style={{ marginBottom: '20px' }}>
                    <Col></Col>
                    <Col xs={6}>
                        <Card style={{ width: '35rem' }}>
                            <Card.Header as="h5">Quiz Played:  {quizPlayed.quizTitle} </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <br /><b>Author: {quizPlayed.authorName}</b>
                                    <br /><b>Player: {quizPlayed.playerName}</b>
                                    <br /><b>Date: {quizPlayed.date}</b>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
               
                <Row>
                    <Col style={{ marginBottom: '15px', textAlign: 'center' }} >
                        <h4> Answers</h4>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '20px' }} >
                    {
                        quizPlayed.Answers.map(function (ans, idx) {
                            return (
                                <Card style={{ width: '14rem' }} key={idx}>
                                    <Card.Header as="h4">  {ans.textQ}  </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                         Player Reply:   {ans.text}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        }.bind(this))
                    }
                </Row>
            </div>
        );
    }
}

QuizPlayed.propTypes = {
    errors: PropTypes.object.isRequired,
    quizPlayed: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    quizPlayed: state.answers.currentQuizPlayed,

    errors: state.errors
});
export default connect(mapStateToProps, {  })(QuizPlayed);