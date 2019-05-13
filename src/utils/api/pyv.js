import axios from 'axios';
import { CMS_BASE_URL } from 'constants/api';

export default axios.create({
  baseURL: CMS_BASE_URL
});
