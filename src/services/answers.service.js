import axios from 'axios';
class AnswersDataService {
    getAllPlayer(){
      return axios.get('/api/answers/list-player')
    };
    getAllByAuthor(authorId){
      return  axios.get(`/api/answers/list-author?authorId=${authorId}`)
    };
    getAllByQuiz(quizId){
      return  axios.get(`/api/answers/list-quiz?quizId=${quizId}`)
    };
    createAnswers(answerModel){
        return axios.post('/api/answers/create-answer', answerModel)
    };
}
export default new AnswersDataService();
