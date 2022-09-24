import mongoose from "mongoose";
import ChatDto from "../dtos/chatDto.js";
import ChatModel from "../models/ChatModel.js";


class ChatService {
    async create(chat) {
            const {members, lastMessage, title, createdAt} = chat;

            const doc = await ChatModel.create({
                members, lastMessage, title, createdAt
            }).populate('lastMessage').select('content');
    
            return new ChatDto(doc); 
    }

    async getAllChats(userId, limit = 20) {
        const docs = await ChatModel.find({members: {$in: mongoose.Types.ObjectId(userId)}})
            .limit(limit)
            .populate('lastMessage')
            .select('content')

        return docs.map(chat => new ChatDto(chat));
    }

    async delete(chatId) {
        await ChatModel.findByIdAndDelete(chatId)
    }
    
    async getChat(chatId) {
        const doc = await ChatModel.findById(chatId).populate('lastMessage').select('content');

        return new ChatDto(doc)
    }

    async changeTitle(title, chatId) {
        const doc = await ChatModel.findById(chatId).populate('lastMessage').select('content');
        doc.title = title;
        await doc.save()
        
        return new ChatDto(doc);
    }

    async addMember(chatId, userId) {
        const doc = await ChatModel.findById(chatId).populate('lastMessage').select('content')
        doc.members.push(userId)

        if (doc.members.includes(mongoose.Types.ObjectId(userId))) {
            throw new Error('User is already a chat member')
        }

        await doc.save();
        return new ChatDto(doc);
    }
    
    async removeMember(chatId, userId) {
        const doc = await ChatModel.findById(chatId).populate('lastMessage').select('content')
        const newMemberList = doc.members.filter(member => member.toString() !== userId);

        doc.members = newMemberList
        await doc.save();

        return new ChatDto(doc);
    }
}

export default new ChatService();
