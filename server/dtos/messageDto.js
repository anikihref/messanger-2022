export default class MessageDto {
    constructor(message) {
        this.id = message._id;
        this.content = message.content;
        this.type = message.type;
        this.creator = message.friends;
        this.createdAt = message.createdAt;
        this.updatedAt = message.updatedAt;
        this.chat = message.chat;
    }
};
