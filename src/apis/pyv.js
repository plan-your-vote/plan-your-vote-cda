import axios from 'axios';
import { CMS_BASE_URL } from 'constants/baseURL';

export default axios.create({
  baseURL: CMS_BASE_URL
});
