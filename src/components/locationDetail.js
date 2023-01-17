import React, { useEffect, useRef } from "react";
// import "../main.scss";
// import simbol_num from '../../assets/simbol_num.png';

export default function location({data}) {
const ref = useRef();
  useEffect(() => {
    console.log('dd')
    console.log(data)

  }, []);
  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 2,
        width: '343px',
        height: '100px',
        left: '16px',
        top: '530px',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '20px',
      }}>
        <div><h2 style={{
            fontSize: '18px',
            margin: '16px'
        }}>{data.title ? data.title : '기본값'}</h2>
        <p>카테고리</p>            

        </div>
        
        <p>서울 ㅅ강남구</p>            
        <p>전화번호</p>            
    </div>
  );
}
