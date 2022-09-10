export default class ChatDto {
    constructor(chat) {
        this.id = chat._id;
        this.title = chat.title;
        this.members = chat.members;
        this.createdAt = chat.createdAt;
        this.lastMessage = chat.lastMessage;
    }
};
