import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    title: {type: String, required: true},
    lastMessage: {type: mongoose.SchemaTypes.ObjectId, ref: 'Message' },
    createdAt: {type: Date, default: new Date()},
    members: {type: [mongoose.SchemaTypes.ObjectId], ref: 'User'}
})

export default mongoose.model('Chat', ChatSchema);
