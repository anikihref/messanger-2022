import UserModel from "../models/UserModel.js"
import UserDto from '../dtos/userDto.js'

class UserController {
    async create(user) {
        const doc = await UserModel.create(user);

        return new UserDto(doc);
    }

    async delete(userId) {
        await UserModel.findByIdAndDelete(userId)
    }

    async addFriend(userId, friendId) {
        const doc = await UserModel.findById(userId);

        if (!doc.friends) {
            doc.friends = []
        }

        if (doc.friends.includes(friendId)) {
            throw new Error('This user is already your friend')
        }

        doc.friends.push(friendId)
        await doc.save();
        return new UserDto(doc);
    }

    async removeFriend(userId, exFriendId) {
        const doc = await UserModel.findById(userId);

        if (!doc.friends.includes(exFriendId)) {
            throw new Error('You can\'t delete this user from your friendlist. This user is not your friend.')
        }

        const newFriendList = doc.friends.filter(friend => friend.toString() !== exFriendId);

        doc.friends = newFriendList;
        await doc.save();

        return new UserDto(doc);
    }

    async edit(userId, key, value) {
        const doc = await UserModel.findById(userId);

        doc[key] = value;
        await doc.save();
        return new UserDto(doc);
    }

    async getUser(key, value) {
        const doc = await UserModel.findOne({ [key]: value })
        return new UserDto(doc);
    }

    async getUserById(userId) {
        const doc = await UserModel.findById(userId)
        return new UserDto(doc);
    }
}

export default new UserController()