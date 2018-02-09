import axios from 'axios';

let cachedToken = false;

export default function getAxios(jwtToken=false) {
  if (jwtToken || cachedToken) {
    if(jwtToken) {
      cachedToken = jwtToken
    }
    return axios.create({
      baseURL: process.env.REACT_APP_DAPI_URL,
      headers: { Authorization: cachedToken }
    });
  }

  return axios.create({
    baseURL: process.env.REACT_APP_DAPI_URL
  });
}
