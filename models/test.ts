import { Schema, model } from 'mongoose';

const testSchema = new Schema({
    title: {
        type: String,
        minlength: 10,
        required: true
    },
    desc: {
        type: String,
    }
}, { timestamps: true });

const Test = model('Test', testSchema);

export default Test;