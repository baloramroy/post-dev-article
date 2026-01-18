// -------- src/controllers/user.controller.js --------
import User from '../models/user.model.js';


export const getMe = async (req, res) => {
const user = await User.findById(req.user.id).select('-password');
res.json(user);
};


export const updateProfile = async (req, res) => {
const { bio } = req.body;
const user = await User.findByIdAndUpdate(
req.user.id,
{ bio },
{ new: true }
).select('-password');


res.json(user);
};