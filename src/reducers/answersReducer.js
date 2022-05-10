import {
    ADD_PLAY_ANSWER, ADD_PLAY_ANSWER_SUCCESS,
    GET_ANSWERS_PLAYER, GET_ANSWERS_PLAYER_SUCCESS,SET_CURRENT_QUIZ_PLAYED
} from '../actions/types';

const initialState = {
    listAnswers: {},
    lastIdAnswerCreated: '',
    currentQuizPlayed: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_PLAY_ANSWER_SUCCESS:
            return {
                ...state,
                lastIdAnswerCreated: action.payload
            }
        case GET_ANSWERS_PLAYER_SUCCESS:
            return {
                ...state,
                listAnswers: action.payload.answers
            }
        case SET_CURRENT_QUIZ_PLAYED:
            return {
                ...state,
                currentQuizPlayed: action.payload
            }
            
        default:
            return state;
    }
}