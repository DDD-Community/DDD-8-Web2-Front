import axios from 'axios';
import qs from 'qs';
const baseURL = 'https://ratrip.store/v1';

axios.interceptors.request.use((config) => {
    config.headers['Authorization'] = 'Bearer ' + 'da4befbef8113651e77dbd493809c2e8'

    return config;
});

const api = {
	getPlaceregions: async(params) => { // async, await을 사용하는 경우
        try {
            // GET 요청은 params에 실어 보냄
          const response = await axios.get(`${baseURL}v1/places/regions`,qs.stringify (params));
          console.log(response);
        } catch (e) {
          // 실패 시 처리
          console.error(e);
        }
      }
};

export default api;