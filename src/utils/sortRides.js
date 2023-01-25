const sortRides = (rides) => {
  if (rides !== null) {
    const rideArray = Object.entries(rides);

    rideArray.sort(function (a, b) {
      if (user) {
        if (
          a[1].passengers.includes(user.uid) &&
          !b[1].passengers.includes(user.uid)
        ) {
          return -1;
        }
        if (
          !a[1].passengers.includes(user.uid) &&
          b[1].passengers.includes(user.uid)
        ) {
          return 1;
        }
      }
      a[1].date + " " + a[1].time < b[1].date + " " + b[1].time ? -1 : 1;
    });
    return rideArray;
  }
};

export default sortRides;
