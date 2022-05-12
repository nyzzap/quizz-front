import { GET_ERRORS, GET_GLOBAL_QUIZ_LIST, GET_QUESTIONS_QUIZ,
     SET_CURRENT_PLAY_QUIZ, SET_CURRENT_PLAY_QUIZ_QUESTION,
     ADD_QUIZ_SUCCESS, ADD_QUIZ, SET_CURRENT_PLAY_QUIZ_ANSWER,
      GET_MY_QUIZ_LIST, DELETE_QUIZ, DELETE_QUIZ_SUCCESS, UPDATE_QUIZ_SUCCESS, UPDATE_QUIZ} from './types';
import QuizDataService from "../services/quiz.service";

export const getMyAllQuizHead = () => dispatch => {
    QuizDataService.getMyAllHead()
        .then(res =>
            dispatch({
                type: GET_MY_QUIZ_LIST,
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
            history.push('/myquizlist');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}
export const updateQuiz = (quiz, history) => dispatch => {
    QuizDataService.updateQuiz(quiz)
        .then(res => {
            dispatch({
                type: UPDATE_QUIZ_SUCCESS,
                payload: res.data,
            });
            QuizDataService.getMyAllHead()
            .then(res =>
                dispatch({
                    type: GET_MY_QUIZ_LIST,
                    payload: res.data,
                })
               
            ).catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
            history.push('/myquizlist');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}
export const deleteQuiz = (quiz, history) => dispatch => {
    QuizDataService.deleteQuiz(quiz)
        .then(res => {
            dispatch({
                type: DELETE_QUIZ_SUCCESS,
                payload: res.data,
            });
            QuizDataService.getMyAllHead()
            .then(res =>
                dispatch({
                    type: GET_MY_QUIZ_LIST,
                    payload: res.data,
                })
            )
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
           
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
export const playModifyQuiz = (quiz, history) => dispatch => {
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
            history.push('/modifyquiz');
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
