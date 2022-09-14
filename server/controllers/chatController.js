import chatService from '../services/chatService.js';

class ChatController {
  async create(req, res) {
    try {
      const createdPost = await chatService.create(req.body);
      res.json(createdPost);
    } catch (error) {
      res
        .json({
          message: error.message,
          chat: req.body,
        })
        .status(400);
    }
  }

  async getAllChats(req, res) {
    try {
      const chats = await chatService.getAllChats(req.params.userId, req.query.limit)

      res.json(chats);
    } catch (error) {
      res
        .json({
          message: error.message,
        })
        .status(400);
    }
  }

  async delete(req, res) {
    try {
      await chatService.delete(req.params.id);
      res.send('deleted');
    } catch (error) {
      res
        .json({
          message: error.message,
        })
        .status(400);
    }
  }

  async getChat(req, res) {
    try {
      const chat = await chatService.getChat(req.params.id);
      res.json(chat);
    } catch (error) {
      res
        .json({
          message: error.message,
        })
        .status(400);
    }
  }

  

  async changeTitle(req, res) {
    try {
      const {title} = req.body.data;
      const {chatId} = req.params;

      const chat = await chatService.changeTitle(title, chatId);

      res.json(chat)
    } catch (error) {
        res.json({
            message: error.message,
            error
        }).status(400)
    }
  }

  async addMember(req, res) {
    try {
      const { chatId, userId } = req.body.data;

      const chat = await chatService.addMember(chatId, userId);

      res
        .json({
          newMember: userId,
          chat,
          message: `User ${userId} has been added successfully`,
        })
        .status(200);
    } catch (error) {
      res
        .json({
          message: error.message,
        })
        .status(400);
    }
  }

  async removeMember(req, res) {
    try {
      const { chatId, userId } = req.body.data;

      const chat = await chatService.removeMember(chatId, userId);

      res
        .json({
          removedMember: userId,
          chat,
          message: `User ${userId} has been removed successfully`,
        })
        .status(200);
    } catch (error) {
      res
        .json({
          message: error.message,
        })
        .status(400);
    }
  }
}

export default new ChatController();
