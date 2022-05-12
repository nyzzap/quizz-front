import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { Card } from 'react-bootstrap';
import { setCurrentPlayQuestionAnswer } from '../actions/quiz';

class PlayQuestion extends Component {
    constructor() {
        super();
        this.state = {
            answer: '',
            question: {},
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setOptionAnswer = this.setOptionAnswer.bind(this);

    }
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    setOptionAnswer(answerIn) {
        this.setState({
            answer: answerIn
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.answer && this.state.answer !== "") {
            const answer = {
                answer: this.state.answer,
                question: this.props.question,
            }
            this.props.setCurrentPlayQuestionAnswer(answer);
        }
    }
    componentDidMount() {
        //   this.setState({
        //     list: nextProps.quiz.globalQuizHeadList
        // });
    }

    componentWillReceiveProps(nextProps) {
        console.log("receiv");

        this.setState({
            answer: ''
        });

    }
    render() {
        const { errors } = this.state;
        const { question, options } = this.props;
        const MultiChoiceQuestionForm = (
            <form onSubmit={this.handleSubmit}>
                <div style={{ marginBottom: '15px', textAlign: 'center' }} className="form-group">
                    {
                        options?.map(function (optionItem, idx) {
                            return (
                                <>
                                    <label key={idx}>
                                        <input
                                            type="radio"
                                            value={optionItem.text}
                                            name='AnswersOptions'
                                            onClick={() => this.setOptionAnswer(optionItem.text)}
                                        />
                                        &nbsp;
                                        {optionItem.text}
                                    </label> <br />
                                </>

                            )
                        }.bind(this))
                    }
                </div>
                <div style={{ marginBottom: '15px', textAlign: 'center' }} className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Send
                    </button>
                </div>
            </form>
        );
        const SimpleQuestionForm = (
            <form onSubmit={this.handleSubmit}>
                <div style={{ marginBottom: '15px', textAlign: 'center' }} className="form-group">
                    <input
                        type="text"
                        placeholder="Answer"
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.answer
                        })}
                        name="answer"
                        value={this.state.answer}
                        onChange={this.handleInputChange}
                    />
                    {errors.answer && (<div className="invalid-feedback">{errors.answer}</div>)}
                </div>
                <div style={{ marginBottom: '15px', textAlign: 'center' }} className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Send
                    </button>
                </div>
            </form>
        );
        return (
            <div>
                <Card style={{ width: '35rem' }}>
                    <Card.Header as="h4" style={{ marginBottom: '40px', textAlign: 'center' }}>  {question?.text} </Card.Header>
                    <Card.Body>
                        {question?.type ? MultiChoiceQuestionForm : SimpleQuestionForm}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

PlayQuestion.propTypes = {
    setCurrentPlayQuestionAnswer: PropTypes.func.isRequired,
    question: PropTypes.object,
    options: PropTypes.array,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    question: state.quiz.quizDetailQuestion,
    options: state.quiz.quizDetailQuestion?.options,
    errors: state.errors
});
export default connect(mapStateToProps, { setCurrentPlayQuestionAnswer })(PlayQuestion);