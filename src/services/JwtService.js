const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const genneralAccessToken = (payload) => {
  const access_token = jwt.sign({ payload }, process.env.ACCESS_TOKEN, {
    expiresIn: "24h",
  });

  return access_token;
};

const genneralRefreshToken = (payload) => {
  console.log(payload);
  const access_token = jwt.sign({ payload }, process.env.REFRESH_TOKEN, {
    expiresIn: "365d",
  });

  return access_token;
};

module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
};
