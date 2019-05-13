import axios from 'axios';
import { CMS_MAP_BASE_URL } from 'constants/api';

export default axios.create({
  baseURL: CMS_MAP_BASE_URL
});
