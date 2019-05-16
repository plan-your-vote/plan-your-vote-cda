import axios from 'axios';
import { CMS_MAP_BASE_URL } from 'constants/baseURL';

export default axios.create({
  baseURL: CMS_MAP_BASE_URL
});
