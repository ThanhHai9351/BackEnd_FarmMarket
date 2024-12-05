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

const getAllCategoryService = (limit, page, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = {};
      if (filter) {
        query.name = { $regex: filter, $options: "i" };
      }
      const totalCategory = await Category.countDocuments(query);
      const allCategory = await Category.find(query)
        .limit(limit)
        .skip(limit * page);
      resolve({
        status: "OK",
        message: "Get all categories complete!",
        data: allCategory,
        total: totalCategory,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalCategory / limit),
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

const deleteCategoryService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Category.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "DELETE CATEGORY SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateCategoryService = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updateCategory = await Category.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Success",
        data: updateCategory,
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
  deleteCategoryService,
  updateCategoryService,
};
