const logMiddleware = async function (req, res, next) {
  const dateNow = new Date();

  console.log(
    `\n[${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}.${dateNow.getMilliseconds()}] Incomming request ${req.method} ${req.hostname} ${req.path}`,
  );
  next();
};

export default logMiddleware;
