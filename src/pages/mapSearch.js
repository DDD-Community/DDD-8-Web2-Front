import React, { useState } from "react";
import LocationDetail from "../components/locationDetail";
import Map from "../components/Map.js";

function MapSearch() {
  const [data, setData] = useState({});
  const [dataCount, setDataCount] = useState(true);
  // const [hasNext, setNext] = useState(true);
  const parentFunction = (location, hasMore) => {
    setData(location);
    // setNext(hasMore);
  };

  const searchDataCount = (datacount) => {
    setDataCount(datacount > 0);
    alert(datacount);
  };
  const showMore = () => {
    // hasNext &&
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "showMoreSearchData", data: null })
    );
  };
  // if (dataCount)
  return (
    <div
      id="map"
      style={{
        position: "static",
      }}
    >
      <button
        onClick={showMore}
        style={{
          zIndex: 2,
          position: "absolute",
          backgroundColor: "#6147ff",
          borderRadius: "50px",
          border: "none",
          padding: " 12px 20px",
          width: "142px",
          height: "46px",
          left: "116px",
          top: "16px",
          fontWeight: "600",
          fontSize: "16px",
          color: "#ffffff",
        }}
      >
        검색결과 더보기 {dataCount}
      </button>
      <Map parentFunction={parentFunction} searchDataCount={searchDataCount} />
      <LocationDetail data={data} />
    </div>
  );
  // else
  //   return (
  //     <div>
  //       <p>검색결과 없음</p>
  //     </div>
  //   );
}
export default MapSearch;
