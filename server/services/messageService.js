import MessageModel from "../models/MessageModel.js"
import MessageDto from '../dtos/messageDto.js'
import mongoose from 'mongoose'

class MessageService {
    async create(message) {
        const doc = await (await MessageModel.create(message)).populate('creator');
        return new MessageDto(doc);
    }

    async delete(messageId) {
        await MessageModel.findByIdAndDelete(messageId)
    }

    async edit(message, messageId) {
        const doc = (await MessageModel.findById(messageId)).populate('creator');

        doc.content = message;
        await doc.save();
        return new MessageDto(doc);
    }

    async getMessage(messageId) {
        const doc = await MessageModel.findById(messageId).populate('creator');

        return new MessageDto(doc);
    }

    async getAllChatMessages(chatId, limit = 50) {
        const docs = await MessageModel.find({chat: mongoose.Types.ObjectId(chatId)})
            .sort({createdAt: -1})
            .limit(limit)
            .populate('creator');

        return docs.map(doc => new MessageDto(doc));
    }

    async deleteAllChatMessages(chatId) {
        await MessageModel.deleteMany({ chat: mongoose.Types.ObjectId(chatId) })
    }
}

export default new MessageService()