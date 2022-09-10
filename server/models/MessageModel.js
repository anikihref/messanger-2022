import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    content: {type: String, required: true},
    createdAt: {type: Date, default: new Date()},
    updatedAt: {type: Date, default: new Date()},
    chat: {type: mongoose.Types.ObjectId, required: true, ref: 'Chat'},
    creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    type: {type: String, required: true}
})

messageSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
})

export default mongoose.model('Message', messageSchema)