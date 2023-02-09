import React, { useEffect, useRef } from "react";
import { styles } from "../mainStyle.js";
import bookOn from "../assets/bookmark_on.png";
import bookOff from "../assets/bookmark_off.png";
import api from "../api/api.js";
// import "../main.css";

export default function location({ data }) {
  const ref = useRef();
  useEffect(() => {
    // api.getInfo('3fa85f64-5717-4562-b3fc-2c963f66afa6');
    // api.getInfo(placeId);
    // 앱에 메세지 보내는 방법
  }, []);
  const goLocaionDetail = (e) => {
    if (e.target.tagName === "IMG") {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({ type: "setBookmark", data: { placeId: data?.id } })
      );
      console.log(data?.id);
    } else {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({ type: "goLocaionDetail", data: data })
      );
      console.log("goLocaionDetail");
    }
  };

  if (data.name)
    return (
      <div onClick={goLocaionDetail} ref={ref}>
        <p style={styles.locationInfoTitle}>
          <strong>{data.name}</strong>
          <span style={styles.locationCatagory}>{data.category || ""}</span>
        </p>
        <p style={styles.locationAdress}>
          {data.address.region || ""} {data.address.detailed || ""}{" "}
        </p>
        <p style={styles.locationTel}>{data.telephone || ""}</p>
        {data.bookmark && (
          <a type="button" style={styles.bookmarkTag} id="bookmark">
            <img
              src={data.bookmark.activated ? bookOn : bookOff}
              style={{ width: "48px", height: "48px" }}
            />
          </a>
        )}
      </div>
    );
}
