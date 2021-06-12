module.exports = (error, req, res, next) => {
  //res.json(error);
  //console.log(error.name);
  if (error.name=== 'ValidationError') {
    if (process.env.NODE_ENV === 'production') {
      const { details } = error;
      const errorMsg = details.map( i => ({
        message: i.message
      }));
      return res.status(400).json(errorMsg);

    } else {
      return res.status(400).json(error);
    }

  }
  //catch other errors

  //log via winston

  //抓取任何其他剩下的error - worst case（尽量不要返回5开头的信息）
  return res.status(500).send('Something unexpected happened, please try again later.');
   
}