import mongoose, { Schema } from 'mongoose';

const PersonSchema = new Schema({
    person_type: { type: String, maxlength: 30, required: true },
    name: { type: String, maxlength: 100, required: true },
    document_type: { type: String, maxlength: 20 },
    document_number: { type: String, maxlength: 20 },
    address: { type: String, maxlength: 150 },
    phone: { type: String, maxlength: 20 },
    email: { type: String, maxlength: 50, unique: true },
    status: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
});

const Person = mongoose.model('person', PersonSchema);
export default Person;