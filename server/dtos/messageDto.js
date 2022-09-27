import UserDto from './userDto.js'

export default class MessageDto {
    constructor(message) {
        this.id = message._id;
        this.content = message.content;
        this.type = message.type;
        this.creator = new UserDto(message.creator);
        this.createdAt = message.createdAt;
        this.updatedAt = message.updatedAt;
        this.chat = message.chat;
    }
};
