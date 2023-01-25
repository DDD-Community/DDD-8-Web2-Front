// GET
import axios from 'axios';
axios.defaults.baseURL = "https://www.ratrip.store/"
// axios.create({
//     baseURL: "https://www.ratrip.store/",
//     params: {
//     //   api_key: "----",
//       language: "en-US",
//     },
//   });
const api = {

getInfo: async(placeId) => { // async, await을 사용하는 경우
    try {
        // GET 요청은 params에 실어 보냄
      const response = await axios.get(`/v1/places/${placeId}`);
      
      // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.
      
    //   await axios.get('/user?ID=12345'); // 위의 요청과 동일
      
    //   var userId = 12345;
    //   await axios.get(`/user?ID=${userId}`); // Backtick(`)을 이용해 이렇게 요청할 수도 있다.
      
      console.log(response);
    } catch (e) {
      // 실패 시 처리
      console.error(e);
    }
  }
  // POST
//   async function postUser() {
//     try {
//     // POST 요청은 body에 실어 보냄
//       await axios.post('/user', {
//           firstName: 'Fred',
//           lastName: 'Flintstone'
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   }
}

export default api;
