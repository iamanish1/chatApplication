import { Router } from "express";
import { registerUser } from "../controller/registerController.js";
import { checkEmail } from "../controller/checkEmailController.js";
import { checkPassword } from "../controller/checkPasswordController.js";

const Route = Router ()

Route.post('/registerUser', registerUser)
Route.post('/checkMail',checkEmail)
Route.post('/checkPassword',checkPassword)

export {Route}