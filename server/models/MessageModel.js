import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        if (this.type === 'text' && value.length > 60) {
          return false;
        }
      },
      message: 'Max message number reached',
    },
  },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date, default: () => new Date() },
  chat: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Chat' },
  creator: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
  type: {
    type: String,
    default: 'text',
    enum: {
      values: ['text', 'image'],
      message: '{VALUE} is not supported',
    },
  },
});

messageSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('Message', messageSchema);
