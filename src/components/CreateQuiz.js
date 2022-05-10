import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Row, Card, Col, Form } from 'react-bootstrap';
import { createQuiz } from '../actions/quiz';

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
class CreateQuiz extends Component {
    constructor() {
        super();
        this.state = { ...initialState };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSendQuizCreate = this.handleSendQuizCreate.bind(this);
        this.addOption = this.addOption.bind(this);
        this.addQuestion = this.addQuestion.bind(this);

        this.removeOption = this.removeOption.bind(this);
        this.setOptionAnswer = this.setOptionAnswer.bind(this);

    }
    setOptionAnswer(answerIn) {
        this.setState({
            optionAnswer: answerIn
        });
    }
    handleSendQuizCreate(e) {
        e.preventDefault();

        if(this.state.title && this.state.title != '' ){
            const mapQuestions = this.state.listQuestions.map(function (qItem, idx) {
                return {
                    text: qItem.text,
                    type: qItem.type,
                    options: qItem.type ? qItem.options : null
                }
            });
            const quizModel = {
                title: this.state.title,
                description: this.state.description,
                questions: mapQuestions
            }
            this.props.createQuiz(quizModel, this.props.history);
            this.setState(initialState);
        }else{
            // validation errors
        }
    }
    
    addQuestion(e) {
        e.preventDefault();

        var resultQuestionFilter =  this.state.listQuestions.filter((v) => v.text === this.state.textQ);
        if(resultQuestionFilter && resultQuestionFilter.length > 0){
          // set alert Quesition duplicated  
        }else{
            if(this.state.textQ && this.state.textQ!= ''){
                if( (!this.state.typeQ) || (this.state.optionAnswer && this.state.optionAnswer != '')){
                    // MultiChoice
                    var arrayOptions = [];
                    if(this.state.typeQ){
                        //SET The correctAnswer to optionArray
                        arrayOptions = this.state.options;
                        var index = arrayOptions.findIndex( (element) => element.text == this.state.optionAnswer );
                        if (index !== -1) {
                            arrayOptions[index].isCorrect = true;
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
                }else{
                    //SET ALERT No Options correct[s]
                }
            }else{
  //SET EMPTY Qestion
            }
           
        }
    }
    
    removeOption(e, textIn) {
        e.preventDefault();
        var array = [...this.state.options]; 
        var index = array.findIndex( (element) => element.text == textIn);
        if (index !== -1) {
          array.splice(index, 1);
          this.setState({options: array});
        }
      }
    addOption(e) {
        e.preventDefault();

        var resultOptionFilter =  this.state.options.filter((v) => v.text === this.state.textOption);
        if(resultOptionFilter && resultOptionFilter.length > 0){
          // set alert Option duplicated  
        }else{
            this.setState(prevState => ({
                options: [...prevState.options, {
                    text: this.state.textOption,
                    isCorrect: false
                }]
            }))
            this.setState({
                textOption: '',
                isCorrectOption: false
            })
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

    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    render() {
        const { listQuestions, title, description, textQ, typeQ, textOption, options } = this.state;
        const AddQuestionForm = (
            <Card style={{ width: '35rem', marginTop: '15px' }}>
                <Card.Header as="h5">ADD Question</Card.Header>
                <Card.Body>
                    <Row>
                        <input
                            type="text"
                            placeholder="Question"
                            className="form-control form-control-lg"
                            name="textQ"
                            value={textQ}
                            onChange={this.handleInputChange}
                        />
                    </Row>
                    <br/>
                    <Row>
                        <Form.Check
                            type="checkbox"
                            label="Is Multiple Choice"
                            checked={typeQ === true}
                            name="typeQ"
                            onChange={this.handleInputChange}
                        />

                    </Row>
                    <br/>
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
                                                <Row style={{ marginBottom: '5px',verticalAlign : 'center' } } key={idx} >
                                                <Col xs={8} >
                                                <h5 >
                                                        <input
                                                            type="radio"
                                                            value={optionItem.text}
                                                            name='OptionsRadio'
                                                            onClick={() => this.setOptionAnswer(optionItem.text)}
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
                <Row style={{ marginBottom: '20px',  marginTop: '15px'  }}>
                    <Col></Col>
                    <Col xs={6}>
                        <Row>  <Card style={{ width: '35rem' }}>
                            <Card.Header as="h5">Create Quiz</Card.Header>
                            <Card.Body>
                                <input
                                    type="text"
                                    placeholder="Quiz Title"
                                    className="form-control form-control-lg"
                                    name="title"
                                    value={title}
                                    onChange={this.handleInputChange}
                                />
                                <br/>
                                <textarea
                                    type="textArea"
                                    placeholder="Quiz description"
                                    className="form-control form-control-lg"
                                    name="description"
                                    value={description}
                                    onChange={this.handleInputChange}
                                />

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
                <br/>
                <Row style={{ marginBottom: '20px' }} >
                    {
                        listQuestions?.map(function (questionItem, idx) {
                            return (
                                <Card style={{ width: '35rem' }} key={idx}>
                                    <Card.Body>
                                        <Card.Text>
                                        
                                            <h5>Question {idx+1}: {questionItem.text}</h5>
                                            { questionItem.type ?
                                            <> <br/>Options: 
                                                {
                                                    questionItem.options.map((optionItem) => {
                                                        return(
                                                            <>
                                                            {optionItem.isCorrect ? 
                                                                <b>{optionItem.text}  || (Correct)</b>
                                                                : <p>{optionItem.text} || (InCorrect)</p>
                                                            }
                                                            </>
                                                        );
                                                    })
                                                }
                                            </>:<></>
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

CreateQuiz.propTypes = {
    createQuiz: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors
});
export default connect(mapStateToProps, { createQuiz })(CreateQuiz);