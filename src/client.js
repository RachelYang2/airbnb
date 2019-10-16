var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'http://13.229.209.84:8000',
});

module.exports = axiosInstance;