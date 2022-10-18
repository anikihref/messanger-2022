import MessageDto from './messageDto.js'

export default class ChatDto {
    constructor(chat) {
        this.id = chat._id; 
        this.title = chat.title;
        this.members = chat.members;
        this.createdAt = chat.createdAt;
        if (chat.lastMessage) {
            this.lastMessage = new MessageDto(chat.lastMessage);
        } else {
            this.lastMessage = 'no messages yet'
        }
        }
};
