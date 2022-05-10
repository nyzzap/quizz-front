import { GET_GLOBAL_QUIZ_LIST, GET_QUESTIONS_QUIZ, SET_CURRENT_PLAY_QUIZ
,SET_CURRENT_PLAY_QUIZ_QUESTION, SET_CURRENT_PLAY_QUIZ_ANSWER, ADD_QUIZ_SUCCESS, ADD_QUIZ } from '../actions/types';

const initialState = {
    globalQuizHeadList: {},
    quizHeadDetail: {},
    quizDetail: {},
    quizDetailQuestion: {},
    quizDetailAnswer: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GLOBAL_QUIZ_LIST:
            return {
                ...state,
                globalQuizHeadList: action.payload.quiz
            }
        case GET_QUESTIONS_QUIZ:
            return {
                ...state,
                quizDetail: action.payload.questions
            }
        case SET_CURRENT_PLAY_QUIZ:
            return {
                ...state,
                quizHeadDetail: action.payload,
                quizDetailAnswer: {}
            }
        case SET_CURRENT_PLAY_QUIZ_QUESTION:
            return {
                ...state,
                quizDetailQuestion: action.payload
            }
        case SET_CURRENT_PLAY_QUIZ_ANSWER:
            return {
                ...state,
                quizDetailAnswer: action.payload
            }
        default:
            return state;
    }
}