import { Router } from "express";
import userController from '../controllers/userController.js'

export const userRouter = new Router();

userRouter.post('/', userController.create);
userRouter.get('/:id', userController.getUserById);
userRouter.get('/', userController.getUser);
userRouter.delete('/:id', userController.delete);
userRouter.patch('/friend/add', userController.addFriend);
userRouter.patch('/friend/remove', userController.removeFriend);
userRouter.patch('/edit/:id', userController.edit);
