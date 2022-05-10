import axios from 'axios';
class QuizDataService {
    getAllHead(){
      return axios.get('/api/quiz/global-list')
    };
    getQuestionsByQuizId(quizId){
      return  axios.get(`/api/quiz/questions?id=${quizId}`)
    };
    createQuiz(quiz){
        return  axios.post('/api/quiz/create-quiz', quiz)
    };
}
export default new QuizDataService();
