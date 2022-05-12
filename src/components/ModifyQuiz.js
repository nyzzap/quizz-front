import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { Button, Row, Card, Col, Form } from 'react-bootstrap';
import { updateQuiz, playModifyQuiz } from '../actions/quiz';

const initialState = {
    listQuestions: [],
    title: '',
    description: '',
    options: [],
    textOption: '',
    isCorrectOption: false,
    textQ: '',
    optionAnswer: '',
    typeQ: false,
    errors: {}
};
class ModifyQuiz extends Component {
    constructor() {
        super();
        this.state = { ...initialState };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSendQuizCreate = this.handleSendQuizCreate.bind(this);
        this.addOption = this.addOption.bind(this);
        this.addQuestion = this.addQuestion.bind(this);

        this.removeOption = this.removeOption.bind(this);
        this.setOptionAnswer = this.setOptionAnswer.bind(this);
        this.setCurrentQuestion = this.setCurrentQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        
    }
    deleteQuestion(e, idx){
        e.preventDefault();
        var arrayTempQuestions = this.state.listQuestions;

        if(idx > -1){
            arrayTempQuestions.splice(idx, 1);
            this.setState({
                listQuestions: arrayTempQuestions
            });
        }
    }
    setCurrentQuestion(e, question){
        e.preventDefault();
        var arrayOptions = [];
        //SET QUESTION
        this.setState({
            textQ: question.text,
            typeQ: question.type
        });
        if(question.type){
            arrayOptions = question.options;
            if (arrayOptions && arrayOptions.length > 1) {
                var index = arrayOptions.findIndex((element) => element.isCorrect);
                if (index !== -1){
                    this.setState({
                        optionAnswer: arrayOptions[index].text 
                    });
                }
               
            }
            //SET OPTIONS
            this.setState({
                options: question.options
            });
        }else{
             //SET OPTIONS
             this.setState({
                options: []
            });
        }
        //DELETE CURRENT QUESTION
        var arrayTempQuestions = this.state.listQuestions;

        var indexQuestion = arrayTempQuestions.findIndex((element) => element.text == question.text);
        if(indexQuestion != -1){
            arrayTempQuestions.splice(indexQuestion, 1);
            this.setState({
                listQuestions: arrayTempQuestions
            });
        }
    }
    setOptionAnswer(answerIn) {
        this.setState({
            optionAnswer: answerIn
        });
    }
    handleSendQuizCreate(e) {
        e.preventDefault();
        if (this.state.title && this.state.title != '') {
            if (this.state.description && this.state.description != '') {
                const mapQuestions = this.state.listQuestions.map(function (qItem, idx) {
                    return {
                        text: qItem.text,
                        type: qItem.type,
                        options: qItem.type ? qItem.options : null
                    }
                });
                const quizModel = {
                    _id: this.props.quizHeadDetail._id,
                    title: this.state.title,
                    description: this.state.description,
                    questions: mapQuestions
                }
                this.props.updateQuiz(quizModel, this.props.history);
                this.setState(initialState);
            }else{
                this.setState({
                    errors: {
                        description: 'Description required'
                    }
                });
            }
        } else {
            this.setState({
                errors: {
                    title: 'Title required'
                }
            });
        }
    }

    addQuestion(e) {
        e.preventDefault();

        var resultQuestionFilter = this.state.listQuestions.filter((v) => v.text === this.state.textQ);
        if (resultQuestionFilter && resultQuestionFilter.length > 0) {
            // set alert Quesition duplicated  
        } else {
            if (this.state.textQ && this.state.textQ != '') {
                if ((!this.state.typeQ) || (this.state.optionAnswer && this.state.optionAnswer != '')) {
                    // MultiChoice  
                    var arrayOptions = [];
                    if (this.state.typeQ) {
                        //Verify lenght options 
                        arrayOptions = this.state.options.map((element,i)=> {return{ isCorrect: false, text: element.text}} );
                        if (arrayOptions.length > 1 && arrayOptions.length <= 10) {
                            //SET The correctAnswer to optionArray
                            var index = arrayOptions.findIndex((element) => element.text == this.state.optionAnswer);
                            if (index !== -1){
                                arrayOptions[index].isCorrect = true;

                            }
                                

                        } else {
                            this.setState({
                                errors: {
                                    question: 'Options length require min 2, max 10'
                                }
                            });
                        }
                    }
                    this.setState(prevState => ({
                        listQuestions: [...prevState.listQuestions, {
                            type: this.state.typeQ,
                            text: this.state.textQ,
                            options: this.state.typeQ ? arrayOptions : null
                        }]
                    }))

                    this.setState({
                        typeQ: false,
                        textQ: '',
                        options: [],
                        textOption: '',
                        isCorrectOption: false,
                        optionAnswer: '',
                    });
                    this.setState({
                        errors: {
                            question: ''
                        }
                    });
                } else {
                    this.setState({
                        errors: {
                            question: 'question require an option marked ok'
                        }
                    });
                }
            } else {
                this.setState({
                    errors: {
                        question: 'Question required'
                    }
                });
            }

        }
    }

    removeOption(e, textIn) {
        e.preventDefault();
        var array = [...this.state.options];
        var index = array.findIndex((element) => element.text == textIn);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ options: array });
            if (this.state.optionAnswer == textIn)
                this.setState({ optionAnswer: '' });
        }
    }
    addOption(e) {
        e.preventDefault();

        var resultOptionFilter = this.state.options.filter((v) => v.text === this.state.textOption);
        if (resultOptionFilter && resultOptionFilter.length > 0) {
            // set alert Option duplicated  
        } else {
            if (this.state.options && this.state.options.length > 9) {
                // set alert Options max 10
            } else {
                this.setState(prevState => ({
                    options: [...prevState.options, {
                        text: this.state.textOption,
                        isCorrect: false
                    }]
                }));
                this.setState({
                    textOption: '',
                    isCorrectOption: false
                });
            }
        }
    }
    handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [target.name]: value
        })
    }
    componentDidMount() {
        this.setState({
            title: this.props.quizHeadDetail.title,
            description: this.props.quizHeadDetail.description,
            listQuestions: this.props.quizDetail
        });
    }
    componentWillReceiveProps(nextProps) {
     

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    render() {
        const { listQuestions, title, description, textQ, typeQ, textOption, options, errors, optionAnswer } = this.state;
        const AddQuestionForm = (
            <Card style={{ width: '35rem', marginTop: '15px' }}>
                <Card.Header as="h5">ADD Question</Card.Header>
                <Card.Body>
                    <Row>
                        <div>
                            <input
                                type="text"
                                placeholder="Question"
                                name="textQ"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.question
                                })}
                                value={textQ}
                                onChange={this.handleInputChange}
                            />
                            {errors.question && (<div className="invalid-feedback">{errors.question}</div>)}

                        </div>
                    </Row>
                    <br />
                    <Row>
                        <Form.Check
                            type="checkbox"
                            label="Is Multiple Choice"
                            checked={typeQ === true}
                            name="typeQ"
                            onChange={this.handleInputChange}
                        />

                    </Row>
                    <br />
                    {typeQ ?
                        <>
                            <Row style={{ marginBottom: '20px' }}>
                                <Col xs={9}>
                                    <input
                                        type="text"
                                        placeholder="Option"
                                        className="form-control form-control-lg"
                                        name="textOption"
                                        value={textOption}
                                        onChange={this.handleInputChange}
                                    />
                                </Col>
                                <Col>
                                    <Button variant="warning"
                                        onClick={(e) => this.addOption(e)}>Add Option</Button>
                                </Col>

                            </Row>
                            {options.length > 0 ? <>
                                <Row>
                                    <Col style={{ marginBottom: '15px', textAlign: 'center' }} >
                                        <h4>Options: select The correct Answer</h4>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '20px' }} >
                                    <Col></Col>
                                    <Col xs={8}>
                                        {
                                            options?.map(function (optionItem, idx) {
                                                return (
                                                    <Row style={{ marginBottom: '5px', verticalAlign: 'center' }} key={idx} >
                                                        <Col xs={8} >
                                                            <h5 >
                                                                <input
                                                                    type="radio"
                                                                   // value={optionItem.text}
                                                                    checked={optionItem.text == optionAnswer}
                                                                    name='OptionsRadio'
                                                                    onClick={() => this.setOptionAnswer(optionItem.text)}
                                                                    onChange={() => this.handleInputChange}
                                                                />
                                                                &nbsp;
                                                                {optionItem.text}
                                                            </h5>
                                                        </Col>
                                                        <Col>
                                                            <Button variant="danger" onClick={(e) => this.removeOption(e, optionItem.text)}>DELETE</Button>
                                                        </Col>

                                                    </Row>
                                                )
                                            }.bind(this))
                                        }
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </> : <></>
                            }

                        </>
                        : <></>
                    }
                    <Row>

                        <Col>
                            <Button variant="success"
                                onClick={(e) => this.addQuestion(e)}>ADD Question</Button>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>

                </Card.Body>
                <Card.Footer>

                </Card.Footer>
            </Card>
        );
        return (
            <div>
                <Row style={{ marginBottom: '20px', marginTop: '15px' }}>
                    <Col></Col>
                    <Col xs={6}>
                        <Row>  <Card style={{ width: '35rem' }}>
                            <Card.Header as="h5">Create Quiz</Card.Header>
                            <Card.Body>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Quiz Title"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.title
                                        })}
                                        name="title"
                                        value={title}
                                        onChange={this.handleInputChange}
                                    />
                                    {errors.title && (<div className="invalid-feedback">{errors.title}</div>)}
                                </div>
                                <br />
                               <div>
                               <textarea
                                    type="textArea"
                                    placeholder="Quiz description"
                                    className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.description
                                    })}
                                    name="description"
                                    value={description}
                                    onChange={this.handleInputChange}
                                />
                                {errors.description && (<div className="invalid-feedback">{errors.description}</div>)}
                               
                               </div>
                            </Card.Body>
                        </Card></Row>

                        <Row>
                            {AddQuestionForm}
                        </Row>
                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Col>
                                <Button variant="success"
                                    onClick={(e) => this.handleSendQuizCreate(e)}>SAVE QUIZ</Button>
                            </Col>
                            <Col>
                                <Link to="quizlist"><Button variant="danger">Exit</Button></Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ marginTop: '10px', textAlign: 'center' }} >
                                <h4>Questions</h4>
                            </Col>
                        </Row>
                        <br />
                        <Row style={{ marginBottom: '20px' }} >
                            {
                                listQuestions?.map(function (questionItem, idx) {
                                    return (
                                        <Card style={{ width: '60rem' }} key={idx}>
                                            <Card.Body>
                                                <Card.Text>
                                                    <Row  style={{ textAlign: 'center' }}>
                                                    <h5>Question {idx + 1}</h5>
                                                    </Row>
                                                    <Row style={{ verticalAlign: 'center'}}>
                                                    <Col xs={8}><h5>{questionItem.text}</h5></Col>
                                                    <Col xs={4}>
                                                            <Button variant="warning" onClick={(e) => this.setCurrentQuestion(e, questionItem)}>UPDATE</Button>
                                                            <Button variant="danger" onClick={(e) => this.deleteQuestion(e, idx)}>DELETE</Button>

                                                            
                                                    </Col>
                                                   
                                                    </Row>
                                                    {questionItem.type ?
                                                        <> <br />Options:
                                                            {
                                                                questionItem.options.map((optionItem) => {
                                                                    return (
                                                                        <>
                                                                            {optionItem.isCorrect ?
                                                                                <b>{optionItem.text}  || (Correct)</b>
                                                                                : <p>{optionItem.text} || (InCorrect)</p>
                                                                            }
                                                                        </>
                                                                    );
                                                                })
                                                            }
                                                        </> : <></>
                                                    }
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    )
                                }.bind(this))
                            }
                        </Row>
                    </Col>
                    <Col></Col>
                </Row>


            </div>
        );
    }
}

ModifyQuiz.propTypes = {
    updateQuiz: PropTypes.func.isRequired,
    playModifyQuiz: PropTypes.func.isRequired,
    quizDetail: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    quizHeadDetail: state.quiz.quizHeadDetail, 
    quizDetail: state.quiz.quizDetail,
    errors: state.errors
});
export default connect(mapStateToProps, { updateQuiz, playModifyQuiz })(ModifyQuiz);