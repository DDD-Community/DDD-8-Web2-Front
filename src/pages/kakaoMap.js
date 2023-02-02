import React, { useEffect,useState } from "react";
import Map from "../components/Map.js";
import LocationDetail from "../components/locationDetail.js";

// const markerList = {};
const accesstToken = null;
function KakaoMap() {
  const [data, setData] = useState({});
  const parentFunction = (location) => {
    setData(location)
  } 
  // const getAccessToken = (accesstoken) => {
  //   accessToken = accesstoken;
  // } 
  useEffect(() => {
    console.log(accesstToken)
  }, []);

  // const handleMessage = ({type, data}) => {
  //   if (type === "OnResPlacesRegions"){
  //     alert(JSON.stringify(data))
  //   }
  //   // if (type === "OnResPlacesRegions"){
  //   //   const OnResPlacesRegions = JSON.stringify(e.data.data);
  //   //   setMarkerData(OnResPlacesRegions.placeInRegionResponses)
  //   //   // markerList = OnResPlacesRegions.placeInRegionResponses;
  //   // }
  // } 

  return (
    <div id="map" style={{
      // position: 'static'
    }}>
      <Map parentFunction = {parentFunction}/>
      {/* <Map parentFunction = {parentFunction} onReceiveMessage={handleMessage}/> */}
      <LocationDetail data={data}/>

    </div>
  );
}

export default KakaoMap;
