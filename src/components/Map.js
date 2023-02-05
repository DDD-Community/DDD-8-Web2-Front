import React, { useEffect, useRef, useState } from "react";
// import { markerList } from "../dummydata/markers";
import api from "../api/api.js";
// import simbol_marker from '../assets/simbol_marker.png';
import simbol_num from "../assets/simbol_num.png";
import recommend_pin from "../assets/recommend_pin.png";
import { json, useLocation } from "react-router-dom";
const { kakao } = window;

export default function Map({
  parentFunction,
  searchDataCount,
  getAccessToken,
  onReceiveMessage,
}) {
  // const [data, setData] = useState({});
  const ref = useRef();
  const { pathname } = useLocation();
  let map = null;
  let mapCenter = { latitude: 36.3504396, longitude: 127.3849508 };
  let markerList = [];
  let hasNext = false;
  let searhKeyword = "";
  const imageSrc = pathname === "/schedule" ? simbol_num : recommend_pin;
  const imageSize = new kakao.maps.Size(30, 30);
  let selectedMarker = null;

  useEffect(() => {
    if (ref.current) {
      mapCenter = mapCenter; // postmsg
      mapScript();
      const onMessageHandler = (e) => {
        // 앱으로 부터 온 메세지
        if (
          e.data &&
          typeof e.data.type === "string" &&
          typeof e.data.data === "object"
        ) {
          if (e.data.type === "OnResPlacesRegions") {
            markerList = e.data.data.places;
          } else if (e.data.type === "OnResDaySchedulePlaces") {
            markerList = e.data.data.daySchedulePlaces;
          } else if (e.data.type === "OnResPlacesSearch") {
            // searchDataCount(e.data.data.totalCount);
            searhKeyword !== e.data.data.keyword && mapScript();
            searhKeyword = e.data.data.keyword;
            markerList = e.data.data.thirdPartyModel;
            // hasNext = e.data.data.pageableCount > 1;
          } else if (e.data.type === "SetLocation") {
            mapCenter = e.data.data;
            mapScript();
          }
        }
        markerList.length && drawMarker();
        if (pathname === "/schedule") {
          drawCustomOverlay();
          drawLine();
        }
      };
      window.addEventListener("message", onMessageHandler);
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({ type: "onLoad", data: null })
      );
      return () => {
        window.removeEventListener("message", onMessageHandler);
      };
    }
  }, []);

  const mapScript = () => {
    const container = ref.current;
    const options = {
      center: new kakao.maps.LatLng(mapCenter.latitude, mapCenter.longitude),
      level: 7,
    };
    map = new kakao.maps.Map(container, options);
    // drawMarker();
  };
  const drawMarker = () => {
    let marker;
    let bounds = new kakao.maps.LatLngBounds();
    markerList.forEach((el) => {
      // 마커를 생성합니다
      marker = new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(
          el.location?.latitude || el.latitude,
          el.location?.longitude || el.longitude
        ),
        //마커에 hover시 나타날 title
        title: el.name,
        image: createMarkerImage(imageSize),
      });
      bounds.extend(
        new kakao.maps.LatLng(
          el.location?.latitude || el.latitude,
          el.location?.longitude || el.longitude
        )
      );
      pathname !== "/schedule" &&
        kakao.maps.event.addListener(marker, "click", handler(marker, el));
      function handler(marker, el) {
        return () => {
          window.ReactNativeWebView?.postMessage(
            JSON.stringify({ type: "markerClick", data: el })
          );
          if (!selectedMarker || selectedMarker !== marker) {
            !!selectedMarker &&
              selectedMarker.setImage(
                createMarkerImage(new kakao.maps.Size(30, 30))
              );
            // 현재 클릭된 마커 사이즈 변경합니다
            marker.setImage(createMarkerImage(new kakao.maps.Size(36, 36)));
          }
          // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다\
          selectedMarker = marker;
          parentFunction(el, hasNext);
          // setData(marker);
          // window.ReactNativeWebView.postMessage(
          //   JSON.stringify(el)
          // )
        };
      }
    });
    map.setBounds(bounds);
  };
  const createMarkerImage = (markerSize) => {
    let markerImage = new kakao.maps.MarkerImage(
      imageSrc, // 스프라이트 마커 이미지 URL
      markerSize // 마커의 크기
    );
    return markerImage;
  };
  const drawCustomOverlay = () => {
    console.log("drawCustomOverlay");
    markerList.forEach((el, index) => {
      const content =
        '<span style="position: relative;width: 13px;height: 14px;left: calc(50% - 13px/2 + 0.5px);top: -17px;font-style: normal;font-weight: 700;font-size: 11px;line-height: 14px;text-align: center;color: #FFFFFF;">' +
        `${index < 9 ? "0" + (index + 1) : index + 1}` +
        "</span>";
      new kakao.maps.CustomOverlay({
        map: map,
        position: new kakao.maps.LatLng(
          el.location.latitude,
          el.location.longitude
        ),
        title: el.name,
        content: content,
        // image: markerImage,
      });
    });
  };
  const line = new kakao.maps.Polyline();
  const drawLine = () => {
    for (let idx = 1; idx < markerList?.length; idx++) {
      console.log(
        markerList[idx].location.latitude,
        markerList[idx].location.longitude
      );
      const linePath = [
        new kakao.maps.LatLng(
          markerList[idx - 1].location.latitude,
          markerList[idx - 1].location.longitude
        ),
        new kakao.maps.LatLng(
          markerList[idx].location.latitude,
          markerList[idx].location.longitude
        ),
      ];
      line.setPath(linePath);
      new kakao.maps.Polyline({
        map: map, // 선을 표시할 지도입니다
        path: linePath, // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
        // path: [clickPosition], // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
        strokeWeight: 2, // 선의 두께입니다
        strokeColor: "#6147FF", // 선의 색깔입니다
        strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
        strokeStyle: "dash", // 선의 스타일입니다
      });
    }
  };
  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
    ></div>
  );
}
