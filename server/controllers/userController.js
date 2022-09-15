import userService from "../services/userService.js"

class UserController {
    async create(req, res) {
        try {
            const user = req.body.data
            const createdUser = await userService.create(user);

            res.json(createdUser)
        } catch (error) {
            res.json({
                message: error.message
            })
        }
    }

    async delete(req, res) {
        try {
            await userService.delete(req.params.id);

            res.send('user has been deleted successfully')
        } catch (error) {
            res.json({
                message: error.message
            })
        }
    }

    async addFriend(req, res) {
        try {
            const {userId, friendId} = req.body.data;

            const user = await userService.addFriend(userId, friendId);

            res.json(user)
        } catch (error) {
            res.json({
                message: error.message
            })
        }
    }

    async removeFriend(req, res) {
        try {
            const {userId, exFriendId} = req.body.data;

            const user = await userService.removeFriend(userId, exFriendId);

            res.json(user)
        } catch (error) {
            res.json({
                message: error.message
            })
        }
    }
    async edit(req, res) {
        try {
            const {key, value} = req.body.data;

            const user = await userService.edit(req.params.id, key, value)

            res.json(user)
        } catch (error) {
            res.json({
                message: error.message
            })
        }
    }

    async getUser(req, res) {
        try {
            const user = await userService.getUser(req.params.id)

            res.json(user)
        } catch (error) {
            res.json({
                message: error.message
            })
        } 
    }
}

export default new UserController()