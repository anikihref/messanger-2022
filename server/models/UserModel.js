import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    avatar: {type: String, default: 'empty_avatar.png'},
    friends: {type: mongoose.Types.ObjectId},
    activated: { type: Boolean, required: true },
    password: { type: String, required: true },
    bio: { type: String },
    name: { type: String },
    status: {type: String, required: true},
    phoneNumber: {type: String}
})

export default mongoose.model('User', UserSchema);
