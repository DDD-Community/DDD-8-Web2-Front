import React, { useEffect, useRef } from "react";
import {styles} from '../mainStyle.js';
import api from '../api.js';
// import "../main.css";
// import simbol_num from '../../assets/simbol_num.png';

export default function location({data}) {
  const ref = useRef();
    useEffect(() => {
        // api.getInfo('3fa85f64-5717-4562-b3fc-2c963f66afa6');
        // api.getInfo(placeId);
        console.log(data)

    }, []);
    return (
    <div
        ref={ref}
        style={styles.locationInfo}>
            <p style={styles.locationInfoTitle}>
            <strong>{data.title ? data.title : '기본값'}</strong>
            <span style={styles.locationCatagory}>{data.title}</span>
            </p>
            <p style={styles.locationAdress}>{data.adress}</p>            
            <p style={styles.locationTel}>{data.telnum}</p>            
        </div>
    );
    
        
}
