import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 5,
      required: true,
    },
    email: {
      type: String,
      minlength: 8,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

async function init() {
  await User.createCollection();
}

init();

export default User;
