const getTodaysDate = () => {
  let objectDate = new Date();
  let today =
    objectDate.getFullYear() +
    "-" +
    objectDate.getMonth() +
    1 +
    "-" +
    objectDate.getDate();

  return today;
};

export default getTodaysDate;
