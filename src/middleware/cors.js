module.exports = (req, res, next) => {
  /* res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  //options 在实际发送请求之前的一个confirm的操作
  res.setHeader('Access-Control-Allow-Headers', 'content-type'); */
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT, DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  next();
}