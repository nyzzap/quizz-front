import axios from 'axios';
class QuizDataService {
    getAllHead(){
      return axios.get('/api/quiz/global-list')
    };
    getMyAllHead(){
      return axios.get('/api/quiz/my-quiz-list')
    };
    
    getQuestionsByQuizId(quizId){
      return  axios.get(`/api/quiz/questions?id=${quizId}`)
    };
    createQuiz(quiz){
        return  axios.post('/api/quiz/create-quiz', quiz)
    };
    deleteQuiz(quiz){
      return  axios.post('/api/quiz/delete-quiz', quiz)
    };
    updateQuiz(quiz){
      return  axios.post('/api/quiz/update-quiz', quiz)
    };
    
}
export default new QuizDataService();
