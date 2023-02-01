import axios from 'axios';
import qs from 'qs';
const baseURL = 'http://ratrip.kro.kr/';

axios.interceptors.request.use((config) => {
    config.headers['Authorization'] = 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJVU0VSX0lEIjoiMTFlZDliYzYtYTdkZS01OTI5LTg5YzMtMGIzODRmZjg4NDMxIiwiZXhwIjoxNjc1MzI0MDY0fQ.pUEza9ylQxqIezU7UasrecSeZSXb7vCbvvvuXsVp2lp9-m7S4TGfQcp_SdXXfUdV6rQ2fC9ZucYPDgJERwr1gw'

    return config;
});

const api = {
	getPlaceregions: async(params) => { // async, await을 사용하는 경우
        try {
            // GET 요청은 params에 실어 보냄
          const response = await axios.get(`${baseURL}v1/places/regions`,qs.stringify(params));
          console.log(response);
        } catch (e) {
          // 실패 시 처리
          console.error(e);
        }
      }
};

export default api;