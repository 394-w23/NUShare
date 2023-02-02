const getTodaysDate = () => {
  const objectDate = new Date();
  const day =
    objectDate.getDate() < 10
      ? "0" + objectDate.getDate()
      : objectDate.getDate();
  const month =
    objectDate.getMonth() + 1 < 10
      ? "0" + objectDate.getMonth() + 1
      : objectDate.getMonth() + 1;
  const year = objectDate.getFullYear();

  const today = year + "-" + month + "-" + day;

  return today;
};

export default getTodaysDate;
