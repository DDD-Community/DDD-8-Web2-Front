import React, { useEffect, useState } from "react";
import Map from "../components/Map.js";
import LocationDetail from "../components/locationDetail.js";
import { styles } from "../mainStyle.js";

// const markerList = {};
const accesstToken = null;
function KakaoMap() {
  const [data, setData] = useState(null);
  const parentFunction = (location) => {
    setData(location);
  };
  // const getAccessToken = (accesstoken) => {
  //   accessToken = accesstoken;
  // }
  useEffect(() => {
    console.log(accesstToken);
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
    <div
      id="map"
      style={
        {
          // position: 'static'
        }
      }
    >
      <Map parentFunction={parentFunction} />
      {/* <Map parentFunction = {parentFunction} onReceiveMessage={handleMessage}/> */}
      {data && (
        <div style={{ ...styles.locationInfo, ...{ top: "70%" } }}>
          <LocationDetail data={data} />
        </div>
      )}
      {/* <LocationDetail data={data} /> */}
    </div>
  );
}

export default KakaoMap;
