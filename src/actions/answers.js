import { GET_ERRORS,ADD_PLAY_ANSWER_SUCCESS, ADD_PLAY_ANSWER, SET_CURRENT_QUIZ_PLAYED,
    GET_ANSWERS_PLAYER, GET_ANSWERS_PLAYER_SUCCESS} from './types';
import AnswersDataService from "../services/answers.service";

export const getAllAnswersPlayer = () => dispatch => {
    AnswersDataService.getAllPlayer()
        .then(res =>
            dispatch({
                type: GET_ANSWERS_PLAYER_SUCCESS,
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
export const createAnswers = (answers, history) => dispatch => {
    AnswersDataService.createAnswers(answers)
        .then(res => {
            dispatch({
                type: ADD_PLAY_ANSWER_SUCCESS,
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
export const setCurrentQuizPlayed  = (decoded, history) => dispatch => {
    dispatch({
        type: SET_CURRENT_QUIZ_PLAYED,
        payload: decoded
    });
    history.push('/quizplayed');

}