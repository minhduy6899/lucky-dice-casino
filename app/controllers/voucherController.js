const voucherModel = require("../models/voucherModel");
const mongoose = require("mongoose");

const createVoucher = (request, response) => {
  //B1: Get data
  let bodyRequest = request.body;

  //B2: Validate data
  if (!bodyRequest.code) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Code is required"
    })
  }

  if (!bodyRequest.discount) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "discount is required"
    })
  }

  //B3: Work with data
  let newVocherInput = {
    _id: mongoose.Types.ObjectId(),
    code: bodyRequest.code,
    discount: bodyRequest.discount,
    note: bodyRequest.note
  }

  voucherModel.create(newVocherInput, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(201).json({
        status: "Create voucher Success",
        data: data
      })
    }
  })
}

const getAllVouchers = (request, response) => {
  voucherModel.find((error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Get all voucher success",
        data: data
      })
    }
  })
}

const getVoucherById = (request, response) => {
  //B1: Get data
  let voucherId = request.params.voucherId;

  //B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(voucherId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Prize ID is not valid"
    })
  }

  //B3: Work with data
  voucherModel.findById(voucherId, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Get Voucher success",
        data: data
      })
    }
  })
}

const updateVoucherById = (request, response) => {
  //B1: Get data
  let voucherId = request.params.voucherId;
  let bodyRequest = request.body;

  //B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(voucherId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "Voucher ID is not valid"
    })
  }

  //B3: Work with data
  let voucherNewUpdate = {
    code: bodyRequest.code,
    discount: bodyRequest.discount,
    note: bodyRequest.note
  }

  voucherModel.findByIdAndUpdate(voucherId, voucherNewUpdate, (error, data) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        status: "Success: Update voucher success",
        data: data
      })
    }
  })
}

const deleteVoucherById = (request, response) => {
  //B1: Get data
  let voucherId = request.params.voucherId;

  //B2: Validate data
  if (!mongoose.Types.ObjectId.isValid(voucherId)) {
    return response.status(400).json({
      status: "Error 400: Bad Request",
      message: "voucher ID is not valid"
    })
  }

  //B3: Work with data
  voucherModel.findByIdAndDelete(voucherId, (error) => {
    if (error) {
      return response.status(500).json({
        status: "Error 500: Internal server error",
        message: error.message
      })
    } else {
      return response.status(200).json({
        message: "Success: Delete voucher success"
      })
    }
  })
}

module.exports = {
  createVoucher: createVoucher,
  getAllVouchers: getAllVouchers,
  getVoucherById: getVoucherById,
  updateVoucherById: updateVoucherById,
  deleteVoucherById: deleteVoucherById
}