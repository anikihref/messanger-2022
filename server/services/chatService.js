import mongoose from "mongoose";
import ChatDto from "../dtos/chatDto.js";
import UserDto from "../dtos/userDto.js";
import ChatModel from "../models/ChatModel.js";
import messageService from './messageService.js'


class ChatService {
    async create(chat) {
            const {members, lastMessage, title, createdAt} = chat;

            const doc = await ChatModel.create({
                members, lastMessage, title, createdAt
            })
    
            return new ChatDto(doc); 
    }

    async getAllChats(userId, limit = 20) {
        const docs = await ChatModel.find({members: {$in: mongoose.Types.ObjectId(userId)}})
            .limit(limit)
            .populate('lastMessage')
            .populate('members')


        return docs.map(chat => ({
            ...(new ChatDto(chat)),
            members: chat.members.map(user => new UserDto(user)) 
        }));
    }

    async delete(chatId) {
        await ChatModel.findByIdAndDelete(chatId)
    }
    
    async getChat(chatId) {
        const doc = await ChatModel.findById(chatId)
            .populate('lastMessage')
            .populate('members');
        
        return {
            ...(new ChatDto(doc)),
            members: doc.members.map(user => new UserDto(user))
        }
    }

    async changeTitle(title, chatId) {
        const doc = await ChatModel.findById(chatId).populate('lastMessage');
        doc.title = title;
        await doc.save()
        
        return new ChatDto(doc);
    }

    async addMember(chatId, userId) {
        const doc = await ChatModel.findById(chatId)

        if (doc.members.includes(userId)) {
            throw new Error('User is already a chat member')
        }
        
        doc.members.push(userId)
        await doc.save();
        return new ChatDto(doc);
    }
    
    async removeMember(chatId, userId) {
        const doc = await ChatModel.findById(chatId).populate('lastMessage')
        const newMemberList = doc.members.filter(member => member.toString() !== userId);

        doc.members = newMemberList
        await doc.save();

        return new ChatDto(doc);
    }

    async setLastMessage(chatId, messageId) {
        const doc = await ChatModel.findById(chatId);

        doc.lastMessage = messageId;

        await doc.save()
    }

    async getLastChats(userId, limit = 3) {
        let userChats = await ChatModel.find({members: {$in: mongoose.Types.ObjectId(userId)}})
            .populate('lastMessage')
            .populate('members')

        userChats = userChats.sort((chat1, chat2) => {
            console.log(chat1)
            if (chat1.lastMessage.updatedAt.getTime() > chat2.lastMessage.updatedAt.getTime()) {
                return -1
            } else if (chat1.lastMessage.updatedAt.getTime() > chat2.lastMessage.updatedAt.getTime()) {
                return 1
            } else {
                return 0
            }
        }) 
        

        return userChats.map(chat => ({
            ...(new ChatDto(chat)),
            members: chat.members.map(user => new UserDto(user)) 
        }));
    }
}

export default new ChatService();
