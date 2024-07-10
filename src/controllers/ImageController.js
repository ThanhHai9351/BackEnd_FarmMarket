const imageService = require("../services/ImageService");

const uploadImage = (req, res) => {
  imageService.uploadImage(req, res);
};

const getImage = (req, res) => {
  imageService.getImage(req, res);
};

module.exports = {
  uploadImage,
  getImage,
};
