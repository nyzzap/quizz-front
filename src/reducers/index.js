import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import quizReducer from './quizReducer';
import answersReducer from './answersReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    quiz: quizReducer,
    quiz: quizReducer,
    answers: answersReducer
});