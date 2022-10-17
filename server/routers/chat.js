import { Router } from "express";
import chatController from "../controllers/chatController.js";

export const chatRouter = new Router();

chatRouter.post('/', chatController.create);
chatRouter.get('/:id', chatController.getChat);
chatRouter.get('/all/:userId', chatController.getAllChats)
chatRouter.get('/last/:userId', chatController.getLastChats)
chatRouter.delete('/:id', chatController.delete);
chatRouter.patch('/title/:chatId', chatController.changeTitle);
chatRouter.patch('/member/remove', chatController.removeMember);
chatRouter.patch('/member/add', chatController.addMember);
