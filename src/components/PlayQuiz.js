import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Row, Card, Col } from 'react-bootstrap';
import { setCurrentPlayQuestion, playQuiz } from '../actions/quiz';
import { createAnswers } from '../actions/answers';
import PlayQuestion from './PlayQuestion';
const initialState = {
    answersList: [],
    answers: [],
    quizHead: {},
    errors: {},
    idxQuestion: 0
};
class PlayQuiz extends Component {
    constructor() {
        super();
        this.state = { ...initialState };
        this.handleSendQuizPlay = this.handleSendQuizPlay.bind(this);
    }
    handleSendQuizPlay(e) {
        e.preventDefault();
        this.setState(initialState);
        
        const mapAnswers = this.state.answersList.map(function (ans, idx) {
            return {
                textQ: ans.question?.text,
                typeQ: ans.question?.type,
                optionsQ : ans.question?.options ? ans.question?.options : null,
                text: ans.answer,
                success: false
            }
        });
        const answersModel = {
            playerName: '',
            playerId: '',
            authorName: this.props.quizHeadDetail.userName,
            authorId: this.props.quizHeadDetail.userId,
            quizId : this.props.quizHeadDetail._id,
            quizTitle:  this.props.quizHeadDetail.title,
            Answers: mapAnswers
        }
        this.props.createAnswers(answersModel, this.props.history);

    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.quizDetailAnswer) {
            //SaveCurrent Answ / Quest
            this.setState(prevState => ({
                answersList: [...prevState.answersList, nextProps.quizDetailAnswer]
            }))
            //NextQuestion
            if (this.state.idxQuestion < this.props.quizDetail.length) {
                const newIdx = this.state.idxQuestion + 1;
                this.setState({
                    idxQuestion: newIdx
                });
                this.props.setCurrentPlayQuestion(this.props.quizDetail[newIdx]);

            } else {
                // Finish Quiz

            }
        }


        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    render() {
        const { quizHeadDetail, quizDetail } = this.props;
        const { answersList } = this.state;
        const FinishForm = (
            <Card style={{ width: '35rem' }}>
                <Card.Header as="h5">Quiz Complete!</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <br /><b>Check yours answers & Send Quiz or Exit</b>
                    </Card.Text>

                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Button variant="success"
                            onClick={(e) => this.handleSendQuizPlay(e)}>Send!</Button></Col>
                        <Col>
                            <Link to="quizlist"><Button variant="warning">Exit</Button></Link>
                        </Col>
                        <Col></Col>
                    </Row>
                </Card.Footer>
            </Card>
        );
        return (
            <div>
                <Row style={{ marginBottom: '20px' }}>
                    <Col></Col>
                    <Col xs={6}>
                        <Card style={{ width: '35rem' }}>
                            <Card.Header as="h5">Playing:  {quizHeadDetail.title} </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {quizHeadDetail.description}
                                    <br /><b>Author: {quizHeadDetail.userName}</b>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
                <Row style={{ marginBottom: '20px' }}>
                    <Col></Col>
                    <Col xs={6}>
                        {(this.state.idxQuestion < this.props.quizDetail.length) ?
                            <PlayQuestion />
                            : FinishForm}

                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col style={{ marginBottom: '15px', textAlign: 'center' }} >
                        <h4>Yours Answers</h4>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '20px' }} >
                    {
                        answersList.map(function (ans, idx) {
                            return (
                                <Card style={{ width: '14rem' }} key={idx}>
                                    <Card.Header as="h4">  {ans.question?.text}  </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            {ans.answer}
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

PlayQuiz.propTypes = {
    createAnswers: PropTypes.func.isRequired,
    setCurrentPlayQuestion: PropTypes.func.isRequired,
    playQuiz: PropTypes.func.isRequired,
    quizDetailAnswer: PropTypes.object,
    quizDetail: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    quizHeadDetail: state.quiz.quizHeadDetail,
    quizDetail: state.quiz.quizDetail,
    quizDetailAnswer: state.quiz.quizDetailAnswer,
    errors: state.errors
});
export default connect(mapStateToProps, { setCurrentPlayQuestion, playQuiz, createAnswers })(PlayQuiz);