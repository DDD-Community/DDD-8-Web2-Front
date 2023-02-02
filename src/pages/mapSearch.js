import React, { useState } from "react";
import LocationDetail from "../components/locationDetail";
import Map from "../components/Map.js";

function MapSearch() {
  const [data, setData] = useState({});
  const parentFunction = (location) => {
    setData(location)
  } 

  const handleMessage = ({type, data}) => {
    if (type === "OnResPlacesSearch") {
      alert(JSON.stringify(data));
    }
  }

    return(
      <div id="map" style={{
        position: 'static'
      }}>
        <button style={{
          zIndex:2,
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
        <Map parentFunction = {parentFunction} onReceiveMessage={handleMessage}/>
        <LocationDetail data={data}/>
      </div>
    );
  }
export default MapSearch;
