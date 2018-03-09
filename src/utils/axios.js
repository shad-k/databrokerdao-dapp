import axios from 'axios';

//Note: I removed cachedToken from boilerplate, not clear what it was used for

export default function getAxios(jwtToken=false, anonymous=false) {
  if (localStorage.getItem('jwtToken') || jwtToken) {
    return axios.create({
      baseURL: process.env.REACT_APP_DAPI_URL,
      headers: { Authorization: localStorage.getItem('jwtToken')?localStorage.getItem('jwtToken'):jwtToken }
    });
  }
  else if(anonymous){
    const anonymousJWTToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJldGhlcmV1bSI6IjA0OWI3MWExMDgzMDExZmIwZmU4ZGIwYzE2NDcyNGQzZGFkOWZiYjliNGE0NDBiZGM5NDkyNzg0YTQ5NzZlODgyMTJkYWUyMDFlMjIwODc5ZjcwZmQ5YTgyOWQwMWQxOTk2MjUyZmFhMWE5Y2NmY2UwYmYxNTMyMzAyMzlmZmRiNWUwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDJkYjFhOTI1NmMxZDM5M2RkOTNhYWU3MzIzYWU2NWFhY2Y3MDZmNThjNWQwZTAxZTg5YzM5OTYwMDZhYTFhMzlhNjQ3NDk5NjliMTViNmQwMzNiOThhOTZkOWM0NjhlNmRiM2M0OTBmMGE4ODJmN2MzZWFmNTgyYTNjZjU1OTY5IiwiaWF0IjoxNTE5MTE2NTA1fQ.flVIw-ChcFNLRj1_-Bz4He3jBL126xGgIVUOoBSAhnc";
    return axios.create({
      baseURL: process.env.REACT_APP_DAPI_URL,
      headers: { Authorization: anonymousJWTToken }
    });
  }

  return axios.create({
    baseURL: process.env.REACT_APP_DAPI_URL
  });
}
