import axios from 'axios';

// mapbox directions
// https://docs.mapbox.com/api/navigation/
export default axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});
