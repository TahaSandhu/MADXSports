import ProductModel from "../model/product/model";
import { ProductDocument } from "../model/product/schema";


const getAllProducts = async (): Promise<ProductDocument[]> => {
  return ProductModel.find().exec();
};

const getProductById = async (
  id: string
): Promise<ProductDocument | null> => {
  return ProductModel.findById(id).exec();
};

const createProduct = async (
  data: Omit<ProductDocument, "_id" | "createdAt" | "updatedAt">
): Promise<ProductDocument> => {
  const product = new ProductModel(data);
  return product.save();
};

const updateProduct = async (
  id: string,
  data: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  return ProductModel.findByIdAndUpdate(id, data, {
    new: true,
  }).exec();
};

const deleteProduct = async (
  id: string
): Promise<ProductDocument | null> => {
  return ProductModel.findByIdAndDelete(id).exec();
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};