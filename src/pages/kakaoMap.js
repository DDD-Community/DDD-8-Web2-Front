import React, { useEffect } from "react";
import Map from "../components/Map/Map.js";

function KakaoMap() {
  // useEffect(() => {
  //   const handler = (e) => {
  //     console.log(e)
  //    alert(JSON.stringify(e.data))
  //   }
  //   window.addEventListener('message', handler);
  //   return () => {
  //     window.removeEventListener('message', handler)
  //   }
  // }, []);
  return (
    <div className="kakaomap">
      <Map />
    </div>
  );
}

export default KakaoMap;
