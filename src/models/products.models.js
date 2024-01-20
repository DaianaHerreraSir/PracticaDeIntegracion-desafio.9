import mongoose from "mongoose";

const { Schema } = mongoose;

const productsCollection = "products";

const productsSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: String,
  stock: Number,
  status: Boolean,
  category: String,
});


const productModel = mongoose.model(productsCollection, productsSchema);

export default productModel;


