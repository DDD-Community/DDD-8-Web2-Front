import React, { useEffect,useState } from "react";
import Map from "../components/Map.js";
import LocationDetail from "../components/locationDetail.js";

const accesstToken = null;
function KakaoMap() {
  const [data, setData] = useState({});
  const parentFunction = (location) => {
    setData(location)
  } 
  const getAccessToken = (accesstoken) => {
    accessToken = accesstoken;
  } 
  useEffect(() => {
    console.log(accesstToken)
  }, []);
  return (
    <div id="map" style={{
      // position: 'static'
    }}>
      <Map parentFunction = {parentFunction} getAccessToken={getAccessToken}/>
      <LocationDetail data={data}/>

    </div>
  );
}

export default KakaoMap;
