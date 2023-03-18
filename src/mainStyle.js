const locationInfo = {
  position: "absolute",
  zIndex: 2,
  width: "calc(100% - 40px)",
  height: "100px",
  margin: "20px",
  bottom: "76px",
  background: "rgba(255, 255, 255, 0.9)",
  borderRadius: "20px",
  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(20px)",
};
const locationInfoTitle = {
  // height: '25px',
  fontSize: "18px",
  padding: "16px 16px 4px",
  margin: "0px",
  color: "#1B2027",
};
const locationCatagory = {
  // height: '17px',
  paddingLeft: "4px",
  // fontWeight: 400,
  fontSize: "12px",
  color: "#4C5561",
};
const locationAdress = {
  // height: '17px',
  margin: "0px",
  padding: "0px 16px 2px",
  fontSize: "14px",
  color: "#6C7682",
};
const locationTel = {
  // height: '17px',
  margin: "0px",
  paddingLeft: "16px",
  fontSize: "14px",
  color: "#6147FF",
};
const bookmarkTag = {
  // margin: '26px 16px 26px 279px'
  display: "block",
  position: "absolute",
  top: "26px",
  right: "16px",
};
// 변수에 담아서 공유!
export const styles = {
  locationInfo: locationInfo,
  locationInfoTitle: locationInfoTitle,
  locationCatagory: locationCatagory,
  locationAdress: locationAdress,
  locationTel: locationTel,
  bookmarkTag: bookmarkTag,
};
