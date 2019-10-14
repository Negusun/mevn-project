import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema({
    name: { type: String, maxlength: 100, unique: true, required: true },
    description: { type: String, maxlength: 250 },
    status: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
});

const Category = mongoose.model('category', CategorySchema);
export default Category;