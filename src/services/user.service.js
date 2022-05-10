import axios from 'axios';
class UserDataService {
    register(user){
      return axios.post('/api/users/register', user)
    };
    login(user){
      return  axios.post('/api/users/login', user)
    };
}
export default new UserDataService();
