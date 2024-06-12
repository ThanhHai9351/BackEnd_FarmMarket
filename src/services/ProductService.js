const Product = require("../models/Product");
const NSX = require("../models/NSX");
const Category = require("../models/Category");

const createProductService = (data) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      price,
      description,
      categoryid,
      image,
      quantity,
      nearType,
      createdAt,
      nsxid,
    } = data;
    try {
      const checkNsx = await NSX.findOne({ _id: nsxid });
      if (!checkNsx) {
        resolve({
          status: "ERROR",
          message: "NSX not found",
        });
      }
      const checkCate = await Category.findOne({ _id: categoryid });
      if (!checkCate) {
        resolve({
          status: "ERROR",
          message: "Category not found",
        });
      }
      const createProduct = await Product.create({
        name,
        price,
        description,
        categoryid,
        image,
        quantity,
        nearType,
        createdAt,
        nsxid,
      });

      if (createProduct) {
        resolve({
          status: "OK",
          message: "Success create product",
          data: createProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProductsService = (limit, page, sort, filter, categoryid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = {};
      if (filter) {
        query.name = { $regex: filter, $options: "i" };
      }
      if (categoryid) {
        query.categoryid = categoryid;
      }

      const totalProduct = await Product.countDocuments(query);
      const allProduct = await Product.find(query)
        .limit(limit)
        .skip(limit * page)
        .sort({
          price: sort,
        });

      resolve({
        status: "OK",
        message: "GET ALL PRODUCT COMPLETE!",
        data: allProduct,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailProductService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({ _id: id });
      resolve({
        status: "OK",
        message: "GET PRODUCT COMPLETE!",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateProductService = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });

      const updateProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "Success",
        data: updateProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProductService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: id });
      await Product.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "DELETE PRODUCT SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProductService,
  getAllProductsService,
  getDetailProductService,
  updateProductService,
  deleteProductService,
};
