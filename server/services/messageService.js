import MessageModel from "../models/MessageModel.js"
import MessageDto from '../dtos/messageDto.js'
import mongoose from 'mongoose'

class MessageService {
    async create(message) {
        const doc = await MessageModel.create(message);
        return new MessageDto(doc);
    }

    async delete(messageId) {
        await MessageModel.findByIdAndDelete(messageId)
    }

    async edit(message, messageId) {
        const doc = await MessageModel.findById(messageId);
        // todo: validation. if doc.content === text message cannot be image and if doc.content === 'image' throw error;
        doc.content = message;
        await doc.save();
        return new MessageDto(doc);
    }

    async getMessage(messageId) {
        const doc = await MessageModel.findById(messageId);

        return new MessageDto(doc);
    }

    async getAllChatMessages(chatId, limit = 50) {
        const docs = await MessageModel.find({chat: mongoose.Types.ObjectId(chatId)}).limit(limit);

        return docs.map(doc => new MessageDto(doc));
    }

    async deleteAllChatMessages(chatId) {
        await MessageModel.deleteMany({ chat: mongoose.Types.ObjectId(chatId) })
    }
}

export default new MessageService()