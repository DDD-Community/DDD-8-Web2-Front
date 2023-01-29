import React,{Component} from "react";
// import { Map,Search } from "./components";
import KakaoMap from "./pages/kakaoMap.js";
import MapSearch from "./pages/mapSearch.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<KakaoMap />}/>
      {/* <Route path="schedule" exact element={<KakaoMap />}/> */}
      <Route path="search" exact element={<MapSearch />}/>
      {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
      {/* <Route path="*" element={<NotFound />}></Route> */}
    </Routes>
  );
};

export default App;
