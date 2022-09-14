import messageService from "../services/messageService.js";

class MessageController {
    async create(req, res) {
        try {
            const message = req.body.data;
            const createdMessage = await messageService.create(message);

            res.json(createdMessage)
        } catch (error) {
            res.json({
              message: error.message
            })
        }
    }

    async delete(req, res) {
        try {
          await messageService.delete(req.params.id)
          res.send('message has been deleted successfully')
        } catch (error) {
          res.json({
            message: error.message
          })
        }
    }

    async edit(req, res) {
      try {
          const editedMessage = await messageService.edit(req.body.data.message, req.params.id)

          res.json(editedMessage);
      } catch (error) {
        res.json({
          message: error.message
        })
      }
    }

    async getMessage(req, res) {
      try {
          const message = await messageService.getMessage(req.params.id)

          res.json(message);
      } catch (error) {
        res.json({
          message: error.message
        })
      }
    }

    async deleteAllChatMessages(req, res) {
        try {
          await messageService.deleteAllChatMessages(req.params.chatId)
          res.send('Chat history has been cleared successfully')
        } catch (error) {
          res.json({
            message: error.message
          })
        }
      }

    async getAllChatMessages(req, res) {
        try {
          const messages = await messageService.getAllChatMessages(
            req.params.chatId,
            req.query.limit
          );
    
          res.json(messages);
        } catch (error) {
          res
            .json({
              message: error.message,
            })
            .status(400);
        }
      }
}

export default new MessageController()