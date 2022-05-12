import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, Row,Card,Col } from 'react-bootstrap';
import { getMyAllQuizHead, playQuiz, deleteQuiz, playModifyQuiz } from '../actions/quiz';

 class MyQuizList extends Component {
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
    handleModifyQuiz(e, quizHeadParam) {
        e.preventDefault();
        this.props.playModifyQuiz(quizHeadParam, this.props.history);
    }
    handleDeleteQuiz(e, quizHeadParam) {
        e.preventDefault();
        this.props.deleteQuiz({
            quizId: quizHeadParam._id
        }, this.props.history);
    }
    componentDidMount() {
        this.props.getMyAllQuizHead();
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
               <Row>
                    {
                    this.state.list.map(function(quizItemList, idx){
                        return (
                            <Card style={{ width: '20rem' }} key={quizItemList._id}>
                            <Card.Header as="h4">  {quizItemList.title} </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                {quizItemList.description}
                                <br/><b>Author: {quizItemList.userName}</b>
                                </Card.Text>
                                <Row>
                                    <Col>
                                        <Button variant="primary" onClick={(e) => this.handleGetList(e, quizItemList)}>Play!</Button></Col>
                                    <Col>
                                        <Button variant="warning" onClick={(e) => this.handleModifyQuiz(e, quizItemList)}>Modify</Button>    
                                    </Col>
                                    <Col>
                                        <Button variant="danger" onClick={(e) => this.handleDeleteQuiz(e, quizItemList)}>Delete</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                            </Card>
                            )}.bind(this))
                    }
                </Row>
            </div>
        );
    }
}

MyQuizList.propTypes = {
    getMyAllQuizHead: PropTypes.func.isRequired,
    playQuiz: PropTypes.func.isRequired,
    playModifyQuiz: PropTypes.func.isRequired,
    deleteQuiz: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    quizList: state.quiz.globalQuizHeadList,
    errors: state.errors
});
export  default connect(mapStateToProps, { getMyAllQuizHead, playQuiz, deleteQuiz, playModifyQuiz })(MyQuizList);