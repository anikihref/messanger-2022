export default class ChatDto {
    constructor(chat) {
        this.id = chat._id; 
        this.title = chat.title;
        this.members = chat.members;
        this.createdAt = chat.createdAt;
        if (chat.lastMessage) {
            this.lastMessage = chat.lastMessage.content;
        } else {
            this.lastMessage = 'no messages yet'
        }
        }
};
