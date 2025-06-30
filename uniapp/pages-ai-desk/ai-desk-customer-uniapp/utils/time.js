// user system clock may be inaccurate, so we need to adjust the timestamp
// based on the baseTime received from login server

let _offset = 0;

export const getTimestamp = function() {
  return new Date().getTime() + _offset;
};

export const getDate = function() {
  const now = new Date();
  now.setTime(getTimestamp());
  return now;
};
