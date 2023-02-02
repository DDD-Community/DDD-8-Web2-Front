import React, { useEffect,useState } from "react";
import Map from "../components/Map.js";
import LocationDetail from "../components/locationDetail.js";

function KakaoMap() {
  const handleMessage = ({data, type}) => {
    if (type === "OnResDaySchedulePlaces") {
      alert(JSON.stringify(data));
    }
  }

  return (
    <div id="map" style={{
      // position: 'static'
    }}>
      <Map onReceiveMessage={handleMessage}/>
    </div>
  );
}

export default KakaoMap;
