const NSX = require("../models/NSX");
const Product = require("../models/Product");

const createNSXService = (data) => {
  return new Promise(async (resolve, reject) => {
    const { name, address, secretKey, logo, userid } = data;
    try {
      const checkUser = await NSX.findOne({ userid });
      if (checkUser !== null) {
        resolve({
          status: "ERROR",
          message: "The Production is have been created",
        });
      }
      const createNSX = await NSX.create({
        name,
        address,
        secretKey,
        logo,
        userid,
      });
      if (createNSX) {
        resolve({
          status: "OK",
          message: "Success create nsx",
          data: createNSX,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateNSXService = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkNSX = await NSX.findOne({ _id: id });
      if (!checkNSX) {
        resolve({
          status: "ERROR",
          message: "The NSX is not defined",
        });
      }
      const updateNSX = await NSX.findByIdAndUpdate(id, data, { new: true });

      resolve({
        status: "OK",
        message: "Success",
        data: updateNSX,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteNSXService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ nsxid: id });
      await NSX.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "DELETE NSX SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllNSXService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allNSX = await NSX.find();
      resolve({
        status: "OK",
        message: "GET ALL NSX COMPLETE!",
        data: allNSX,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailNSX = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const nsx = await NSX.findOne({ _id: id });
      resolve({
        status: "OK",
        message: "GET NSX COMPLETE!",
        data: nsx,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNSXService,
  updateNSXService,
  deleteNSXService,
  getAllNSXService,
  getDetailNSX,
};
