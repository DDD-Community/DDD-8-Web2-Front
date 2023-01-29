import React, { useEffect } from "react";
import Map from "../components/Map.js";

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
    <div id="map" style={{
      position: 'static'
    }}>
      <Map />
    </div>
  );
}

export default KakaoMap;
