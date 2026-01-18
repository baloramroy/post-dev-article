// -------- src/controllers/category.controller.js --------
import Category from '../models/category.model.js';


export const createCategory = async (req, res) => {
const { name } = req.body;
const category = await Category.create({ name });
res.status(201).json(category);
};


export const getCategories = async (req, res) => {
const categories = await Category.find().sort({ name: 1 });
res.json(categories);
};