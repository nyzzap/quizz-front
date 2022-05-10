import { GET_ERRORS, GET_GLOBAL_QUIZ_LIST, GET_QUESTIONS_QUIZ,
     SET_CURRENT_PLAY_QUIZ, SET_CURRENT_PLAY_QUIZ_QUESTION,
     ADD_QUIZ_SUCCESS, ADD_QUIZ, SET_CURRENT_PLAY_QUIZ_ANSWER } from './types';
import QuizDataService from "../services/quiz.service";

export const getAllQuizHead = () => dispatch => {
    QuizDataService.getAllHead()
        .then(res =>
            dispatch({
                type: GET_GLOBAL_QUIZ_LIST,
                payload: res.data,
            })
        )
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}
export const createQuiz = (quiz, history) => dispatch => {
    QuizDataService.createQuiz(quiz)
        .then(res => {
            dispatch({
                type: ADD_QUIZ_SUCCESS,
                payload: res.data,
            });
            history.push('/quizlist');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}
export const playQuiz = (quiz, history) => dispatch => {
    dispatch({
        type: SET_CURRENT_PLAY_QUIZ,
        payload: quiz,
    });
    QuizDataService.getQuestionsByQuizId(quiz._id)
        .then(res => {
            dispatch({
                type: GET_QUESTIONS_QUIZ,
                payload: res.data,
            });
            dispatch({
                type: SET_CURRENT_PLAY_QUIZ_QUESTION,
                payload: res.data.questions[0]
            });
            history.push('/playquiz');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}
export const setCurrentPlayQuestion  = (decoded) => dispatch => {
    dispatch({
        type: SET_CURRENT_PLAY_QUIZ_QUESTION,
        payload: decoded
    });
}
export const setCurrentPlayQuestionAnswer = (decoded) => dispatch => {
    dispatch({
        type: SET_CURRENT_PLAY_QUIZ_ANSWER,
        payload: decoded
    });
}
