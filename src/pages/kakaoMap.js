import React, { useEffect } from "react";
import Map from "../components/Map/Map.js";

function KakaoMap() {

  return (
    <div id="map" style={{
      position: 'static'
    }}>
      <Map />
      <button style={{
        zIndex:1,
        position:'absolute',
        backgroundColor:'#6147ff',
        borderRadius: '50px',
        border: 'none',
        padding:' 12px 20px',
        width: '142px',
        height: '46px',
        left: '116px',
        top: '16px',
        fontWeight: '600',
        fontSize: '16px',
        color: '#ffffff'
      }}>검색결과 더보기</button>
    </div>
  );
}

export default KakaoMap;
