import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [6, 'Username is too short'],
    maxLength: [24, 'Username is too long'],
  },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, default: 'empty_avatar.png' },
  friends: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'User',
    default: [],
    validate: {
      validator: (value) => value.length <= 15,
      message: 'Max friends number reached',
    },
  },
  activated: { type: Boolean, required: true },
  password: { type: String, required: true },
  bio: { type: String, default: '', maxLength: [150, 'Bio is too long'] },
  name: { type: String, default: '', maxLength: [50, 'Name is too long'] },
  status: {
    type: String,
    required: true,
    enum: {
      values: ['online', 'offline'],
      message: '{VALUE} is not supported',
    },
  },
  phoneNumber: { type: String, default: '' },
});

export default mongoose.model('User', UserSchema);
