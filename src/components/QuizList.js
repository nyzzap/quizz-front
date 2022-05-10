import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, Row,Card,Col } from 'react-bootstrap';
import { getAllQuizHead, playQuiz } from '../actions/quiz';

 class QuizList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:  [],
            errors: {}
        }
    }
    handleGetList(e, quizHeadParam) {
        e.preventDefault();
        this.props.playQuiz(quizHeadParam, this.props.history);
    }
    componentDidMount() {
        this.props.getAllQuizHead();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.quizList && this.props.quizList !== prevProps.quizList) {
            this.setState({
                list: this.props.quizList
            });
        }
        if (this.props.errors && this.props.errors !== prevProps.errors) {
            this.setState({
                errors: this.props.errors
            });
        }
      }
     
    render() {
        return (
            <div>                
               <Row className="mar">
                    {
                    this.state.list.map(function(quizItemList, idx){
                        return (
                            <Card style={{ width: '14rem' }} key={quizItemList._id}>
                            <Card.Header as="h4">  {quizItemList.title} id {quizItemList._id} </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                {quizItemList.description}
                                <br/><b>Author: {quizItemList.userName}</b>
                                </Card.Text>
                                <Button variant="primary" 
                                onClick={(e) => this.handleGetList(e, quizItemList)}>Play!</Button>
                            </Card.Body>
                            </Card>
                            )}.bind(this))
                    }
                </Row>
            </div>
        );
    }
}

QuizList.propTypes = {
    getAllQuizHead: PropTypes.func.isRequired,
    playQuiz: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    quizList: state.quiz.globalQuizHeadList,
    errors: state.errors
});
export  default connect(mapStateToProps, { getAllQuizHead, playQuiz })(QuizList);