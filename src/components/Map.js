import React, { useEffect, useRef,useState } from "react";
import { markerList } from "../dummydata/markers";
import LocationDetail from "./locationDetail.js";
import simbol_marker from '../assets/simbol_marker.png';
import simbol_num from '../assets/simbol_num.png';
import recommend_pin from '../assets/recommend_pin.png';
import {  useLocation } from "react-router-dom";
const { kakao } = window;

export default function Map() {
  const [data, setData] = useState({});
  const ref = useRef();
  const { pathname } = useLocation();
  let map = null;
  // const pathnameCheck = () => {

  // };
  // let marker = null;
  useEffect(() => {
    if (ref.current) {
      mapScript();
    console.log(pathname)
      const onMessageHandler = (e) => {
        const event = e.data;
        console.log(event)
        // window.ReactNativeWebView.postMessage(JSON.stringify({ event: e }))
        alert('앱에서--- 주는 메세지타입:'+ event.type+'selectedDay='+ event.data.selectedDay)
        event.type === 'onInit' && alert(event.type )
      }
		/** ios */
		window.addEventListener('message', onMessageHandler);
    return () => {
      window.removeEventListener('message', onMessageHandler)
    }
    }
  }, []);

  const mapScript = () => {
    const container = ref.current;
    const options = {
      center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
      level: 3,
    };
    map = new kakao.maps.Map(container, options);
    drawMarker();
    if(pathname === '/schedule') {
      drawCustomOverlay();
      drawLine();
    }
  };
  const imageSrc = pathname === '/schedule' ?  simbol_num : recommend_pin,
       // "https://firebasestorage.googleapis.com/v0/b/rn-photo-4136c.appspot.com/o/simbol_marker.png?alt=media",
    imageSize = new kakao.maps.Size(36, 36), // 마커이미지의 크기입니다
    imageOption = {}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );
  const drawMarker = () => {
    let marker;
    markerList.forEach((el) => {
      // 마커를 생성합니다
      marker = new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.lat, el.lng),
        //마커에 hover시 나타날 title
        title: el.title,
        image: markerImage,
      });
      kakao.maps.event.addListener(marker, 'click', handler(el));
      function handler(marker) {
        return ()=>{
        setData(marker);
          window.ReactNativeWebView.postMessage(
            JSON.stringify(el)
          )
        }
      }
    });
  };
  const drawCustomOverlay = () => {
    markerList.forEach((el, index) => {
      const content =
        '<span style="position: absolute;width: 15px;height: 14px;left: calc(50% - 15px/2 + 0.5px);top: -25px;font-style: normal;font-weight: 600;font-size: 12px;line-height: 14px;text-align: center;color: #FFFFFF;">' +
        `${index < 9 ? "0" + (index + 1) : index + 1}` +
        "</span>";
      new kakao.maps.CustomOverlay({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
        content: content,
        // image: markerImage,
      });
    });
  };
  const line = new kakao.maps.Polyline();
  const drawLine = () => {
    for (let idx = 1; idx < markerList.length; idx++) {
      console.log(markerList[idx].lat, markerList[idx].lng);
      const linePath = [
        new kakao.maps.LatLng(markerList[idx - 1].lat, markerList[idx - 1].lng),
        new kakao.maps.LatLng(markerList[idx].lat, markerList[idx].lng),
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
  if(data.title){
    return (
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "100%",
          position: 'absolute',
        }}
      >
      <LocationDetail data={data}/>
    </div>
    ); 
  }else
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
