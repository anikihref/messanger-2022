import mongoose, { Mongoose } from "mongoose";
import ChatModel from "../models/ChatModel.js";
import MessageModel from "../models/messageModel.js";


class ChatService {
    async create(chat) {
            const {members, lastMessage, title, createdAt} = chat;

            const createdChat = await ChatModel.create({
                members, lastMessage, title, createdAt
            });
    
            return createdChat; 
    }

    async getAllChats(userId, limit = 20) {
        await ChatModel.find({members: {$in: mongoose.Types.ObjectId(userId)}}).limit(limit)
    }

    async delete(chatId) {
        await ChatModel.findByIdAndDelete(chatId)
    }
    
    async getChat(chatId) {
        return await ChatModel.findById(chatId).populate('lastMessage');
    }

    async getMessages(chatId, limit = 50) {
        return await MessageModel.find({chat: mongoose.Types.ObjectId(chatId)}).limit(limit);
    }

    async changeTitle(title, chatId) {
        const doc = await ChatModel.findById(chatId);
        doc.title = title;
        await doc.save()
        
        return doc;
    }

    async addMember(chatId, userId) {
        const doc = await ChatModel.findById(chatId)
        doc.members.push(userId)

        if (doc.members.length > 15) {
            throw new Error('Could not add member. The maximum number of members is 15.');
        }

        await doc.save();
        return doc;
    }
    
    async removeMember(chatId, userId) {
        const doc = await ChatModel.findById(chatId)
        const newMemberList = doc.members.filter(member => member.toString() !== userId);

        if (newMemberList.length < 2) {
            throw new Error('Could not delete member. The minimum number of members is 2.');
        }

        doc.members = newMemberList
        await doc.save();

        return doc;
    }

    async clearHistory(chatId) {
        await MessageModel.deleteMany({ chat: mongoose.Types.ObjectId(chatId) })
    }
}

export default new ChatService();
