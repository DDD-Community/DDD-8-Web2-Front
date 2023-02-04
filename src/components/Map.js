import React, { useEffect, useRef,useState } from "react";
// import { markerList } from "../dummydata/markers";
import api from '../api/api.js';
// import simbol_marker from '../assets/simbol_marker.png';
import simbol_num from '../assets/simbol_num.png';
import recommend_pin from '../assets/recommend_pin.png';
import {  json, useLocation } from "react-router-dom";
const { kakao } = window;

export default function Map({parentFunction,getAccessToken, onReceiveMessage}) {
  // const [data, setData] = useState({});
  const ref = useRef();
  const { pathname } = useLocation();
  let map = null;
  let markerList = null;
  const imageSrc = pathname === '/schedule' ?  simbol_num : recommend_pin;
  const imageSize = pathname === '/schedule' ?  new kakao.maps.Size(36,36) : new kakao.maps.Size(30,30);
  let selectedMarker = null;
  
  useEffect(() => {
    if (ref.current) {
      mapScript();
      const onMessageHandler = (e) => {
        // 앱으로 부터 온 메세지

        if (e.data &&  e.data.type === "OnResPlacesRegions"&&typeof e.data.type ==='string' && typeof e.data.data ==="object") {
          // onReceiveMessage(e.data);
          // alert(JSON.stringify(e.data.data.placeInRegionResponses) +  typeof(e.data.data.placeInRegionResponses))
          markerList = e.data.data.placeInRegionResponses;
          drawMarker();
        }
        
        // if (e.data &&typeof e.data.type ==='string') {
        //   onReceiveMessage(e.data);
        // }
      }
        window.addEventListener("message", onMessageHandler);
        window.ReactNativeWebView?.postMessage(JSON.stringify({type:"onLoad",data:null}));
    return () => {
      window.removeEventListener('message', onMessageHandler)
    }
    }
  }, []);

  const mapScript = () => {
    const container = ref.current;
    const options = {
      center: new kakao.maps.LatLng(37.4822, 127.03684),
      level: 5,
    };
    map = new kakao.maps.Map(container, options);
    // drawMarker();
    if(pathname === '/schedule') {
      drawCustomOverlay();
      drawLine();
    }
  };
  const drawMarker = () => {
    let marker;
    markerList.forEach((el) => {
      // 마커를 생성합니다
      marker = new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.location.latitude, el.location.longitude),
        //마커에 hover시 나타날 title
        title: el.name,
        image: createMarkerImage(imageSize),
      });
      pathname !== '/schedule' && kakao.maps.event.addListener(marker, 'click', handler(marker,el));
      function handler(marker,el) {
        return ()=>{
          window.ReactNativeWebView?.postMessage(JSON.stringify({type:"markerClick",data:el}));
          if (!selectedMarker || selectedMarker !== marker) {
            !!selectedMarker && selectedMarker.setImage(createMarkerImage(new kakao.maps.Size(30,30)));
            // 현재 클릭된 마커 사이즈 변경합니다
            marker.setImage(createMarkerImage(new kakao.maps.Size(36,36)));
          }
          // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다\
          selectedMarker = marker;
          parentFunction(el)
          // setData(marker);
          // window.ReactNativeWebView.postMessage(
          //   JSON.stringify(el)
          // )
        }
      }
    });
  };
const createMarkerImage = (markerSize)=> {
  let markerImage = new kakao.maps.MarkerImage(
    imageSrc, // 스프라이트 마커 이미지 URL
    markerSize, // 마커의 크기
  );
  return markerImage;
  }
  const drawCustomOverlay = () => {
    markerList || [].forEach((el, index) => {
      const content =
        '<span style="position: absolute;width: 15px;height: 14px;left: calc(50% - 15px/2 + 0.5px);top: -25px;font-style: normal;font-weight: 600;font-size: 12px;line-height: 14px;text-align: center;color: #FFFFFF;">' +
        `${index < 9 ? "0" + (index + 1) : index + 1}` +
        "</span>";
      new kakao.maps.CustomOverlay({
        map: map,
        // position: new kakao.maps.LatLng(el.location.latitude, el.location.longitude),
        title: el.name,
        content: content,
        // image: markerImage,
      });
    });
  };
  const line = new kakao.maps.Polyline();
  const drawLine = () => {
    for (let idx = 1; idx < markerList?.length; idx++) {
      console.log(markerList[idx].location.latitude, markerList[idx].location.longitude);
      const linePath = [
        new kakao.maps.LatLng(markerList[idx - 1].location.latitude, markerList[idx - 1].location.longitude),
        new kakao.maps.LatLng(markerList[idx].location.latitude, markerList[idx].location.longitude),
      ];
      line.setPath(linePath);
      new kakao.maps.Polyline({
        map: map, // 선을 표시할 지도입니다
        path: linePath, // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
        // path: [clickPosition], // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
        strokeWeight: 3, // 선의 두께입니다
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
          position: 'absolute',
        }}
      >
      </div>
    );
}
