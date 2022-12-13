import React, { useEffect, useRef } from "react";
import { markerList } from "../../dummydata/markers";

const { kakao } = window;

export default function Map() {
  const ref = useRef();
  let map = null;

  useEffect(() => {
    if (ref.current) {
      mapScript();
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
    drawCustomOverlay();
    drawLine();
  };
  const imageSrc =
      "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f72438ab-ed3c-4917-b3dd-2760a05b4671/markerimg.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221212T144903Z&X-Amz-Expires=86400&X-Amz-Signature=66faad2fba66d28ce36c1b0bf55b062183238e77d878603993f16cac2b17e9bf&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22markerimg.png%22&x-id=GetObject", // 마커이미지의 주소입니다
    imageSize = new kakao.maps.Size(36, 36), // 마커이미지의 크기입니다
    imageOption = {}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );
  const drawMarker = () => {
    console.log(markerList);
    markerList.forEach((el) => {
      // 마커를 생성합니다
      new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.lat, el.lng),
        //마커에 hover시 나타날 title
        title: el.title,
        image: markerImage,
      });
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
  return (
    <div
      ref={ref}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
