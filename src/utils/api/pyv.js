import axios from 'axios';

export default axios.create({
  baseURL: 'https://pyv.azurewebsites.net/api'
});
