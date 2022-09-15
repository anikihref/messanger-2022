import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: [35, 'Title is too long'] },
  lastMessage: { type: mongoose.SchemaTypes.ObjectId, ref: 'Message' },
  createdAt: { type: Date, default: new Date() },
  members: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'User',
    default: [],
    required: true,
    validate: [
      {
        validator: value => value.length <= 15,
        message: 'Max members number reached'
      },
      {
        validator: value => value.length <= 2,
        message: 'Min members number reached'
      }
    ]
  },
});

export default mongoose.model('Chat', ChatSchema);
