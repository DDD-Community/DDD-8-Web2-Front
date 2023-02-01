import React, { useEffect,useState } from "react";
import Map from "../components/Map.js";
import LocationDetail from "../components/locationDetail.js";

const accesstToken = null;
function KakaoMap() {
  useEffect(() => {
    console.log(accesstToken)
  }, []);
  return (
    <div id="map" style={{
      // position: 'static'
    }}>
      <Map/>
    </div>
  );
}

export default KakaoMap;
