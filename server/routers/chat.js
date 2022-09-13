import { Router } from "express";
import chatController from "../controllers/chatController.js";

export const chatRouter = new Router();

chatRouter.post('/', chatController.create);
chatRouter.get('/:id', chatController.getChat);
chatRouter.get('/all/:userId', chatController.getAllChats)
chatRouter.delete('/:id', chatController.delete);
chatRouter.get('/messages/:id', chatController.getMessages);
chatRouter.patch('/title/:chatId', chatController.changeTitle);
chatRouter.patch('/member/remove/:userId/:chatId', chatController.removeMember);
chatRouter.patch('/member/add/:userId/:chatId', chatController.addMember);
chatRouter.patch('/clear/:chatId', chatController.clearHistory);
