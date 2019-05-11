import axios from 'axios';
import { MAPBOX_BASE_URL } from 'constants/api';

// mapbox directions
// https://docs.mapbox.com/api/navigation/
export default axios.create({
  baseURL: MAPBOX_BASE_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});
