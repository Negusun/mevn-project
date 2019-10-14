import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    rol: { type: String, maxlength: 30, required: true },
    name: { type: String, maxlength: 100, unique: true, required: true },
    document_type: { type: String, maxlength: 20 },
    document_number: { type: String, maxlength: 20 },
    address: { type: String, maxlength: 150 },
    phone: { type: String, maxlength: 20 },
    email: { type: String, maxlength: 50, unique: true, required: true },
    password: { type: String, maxlength: 60, required: true },
    status: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('user', UserSchema);
export default User;