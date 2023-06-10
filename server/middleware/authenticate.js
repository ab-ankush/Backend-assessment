const verify = (req, res, next) => {
  req.user = "ab-ankush";
  return next();
};

export default verify;
