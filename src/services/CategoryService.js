const Category = require("../models/Category");

const createCategoryService = (data) => {
  return new Promise(async (resolve, reject) => {
    const { name } = data;
    try {
      const checkCate = await Category.findOne({ name: name });
      if (checkCate !== null) {
        resolve({
          status: "ERROR",
          message: "The Category is have been created",
        });
      }
      const createCategory = await Category.create({
        name,
      });
      if (createCategory) {
        resolve({
          status: "OK",
          message: "Success create category",
          data: createCategory,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllCategoryService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allCate = await Category.find();
      resolve({
        status: "OK",
        message: "GET ALL CATEGORY COMPLETE!",
        data: allCate,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await Category.findOne({ _id: id });
      resolve({
        status: "OK",
        message: "GET CATEGORY COMPLETE!",
        data: category,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createCategoryService,
  getAllCategoryService,
  getDetailCategory,
};
