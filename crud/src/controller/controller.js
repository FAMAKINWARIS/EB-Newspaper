const express = require("express");
const products = require("../models/products");

exports.addProducts = async (req, res) => {
    const { productName, category, quantity, price } = req.body;
    try {
      const productExists = await products.findOne({ productName });
  
      if (productExists) {
        await products.findOneAndUpdate(
          { productName },
          {
            $inc: { quantity },
          },
          {
            new: true,
          }
        );
        return res.status(200).json({
          message: `${productName} updated by ${quantity}`,
        });
      }
  
      const newProduct = await products.create({
        productName,
        category,
        quantity,
        price,
      });
  
      return res.status(200).json({
        message: `${productName} added successfully`,
        newProduct,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  };

  exports.getAllProducts = async (req, res)=> {
    try {
        const allProducts = await products.find();
        return res.status(200).json({
            allProducts
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Something went wrong",
          error: error.message,
        });
      }
  }

  exports.getProductsById = async (req, res) => {
    const { id } = req.params;
    try {
        const getById = await products.findbyId(id);
        return res.status(200).json({
            getById
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Something went wrong",
          error: error.message,
        });
      }
  }