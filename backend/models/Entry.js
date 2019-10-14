import mongoose, { Schema } from 'mongoose';

const EntrySchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'user', required: true },
    person: { type: Schema.ObjectId, ref: 'person', required: true },
    voucher_type: { type: String, maxlength: 20, required: true },
    voucher_serie: { type: String, maxlength: 10 },
    voucher_number: { type: String, maxlength: 10, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    detail: [{
        _id: { type: String, required: true },
        article: { type: String, required: true },
        number: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    status: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }

});

const Entry = mongoose.model('entry', EntrySchema);
export default Entry;