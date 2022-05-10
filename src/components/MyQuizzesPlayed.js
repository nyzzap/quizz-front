import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, Row,Card,Col } from 'react-bootstrap';
import { getAllAnswersPlayer , setCurrentQuizPlayed} from '../actions/answers';

 class MyQuizzesPlayed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:  [],
            errors: {}
        }
    }
    handleGetList(e, quizHeadParam) {
        e.preventDefault();
        this.props.setCurrentQuizPlayed(quizHeadParam, this.props.history);
    }
    componentDidMount() {
        this.props.getAllAnswersPlayer();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.quizPlayedList && this.props.quizPlayedList !== prevProps.quizPlayedList) {
            this.setState({
                list: this.props.quizPlayedList
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
               <Row>
                    {
                    this.state.list.map(function(quizItemList, idx){
                        return (
                            <Card style={{ width: '20rem' }} key={quizItemList._id}>
                            <Card.Header as="h4">  {quizItemList.quizTitle}  </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                <br/><b>Date: {quizItemList.date}</b>
                                <br/><b>Quiz Author: {quizItemList.authorName}</b>
                                </Card.Text>
                                <Button variant="primary" 
                                onClick={(e) => this.handleGetList(e, quizItemList)}>Details!</Button>
                            </Card.Body>
                            </Card>
                            )}.bind(this))
                    }
                </Row>
            </div>
        );
    }
}

MyQuizzesPlayed.propTypes = {
    getAllAnswersPlayer: PropTypes.func.isRequired,
    setCurrentQuizPlayed: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    quizPlayedList: state.answers.listAnswers,
    errors: state.errors
});
export  default connect(mapStateToProps, { getAllAnswersPlayer, setCurrentQuizPlayed })(MyQuizzesPlayed);