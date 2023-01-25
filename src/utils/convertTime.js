const convertTime = (time) => {
  let oldFormatTimeArray = time.split(":");

  let HH = parseInt(oldFormatTimeArray[0]);
  let min = oldFormatTimeArray[1];

  let AMPM = HH >= 12 ? "PM" : "AM";
  let hours;
  if (HH == 0) {
    hours = HH + 12;
  } else if (HH > 12) {
    hours = HH - 12;
  } else {
    hours = HH;
  }
  let newFormatTime = hours + ":" + min + " " + AMPM;
  return newFormatTime;
};

export default convertTime;
