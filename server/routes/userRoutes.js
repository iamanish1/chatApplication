import { Router } from "express";
import { registerUser } from "../controller/registerController.js";

const Route = Router ()

Route.post('/registerUser', registerUser)

export {Route}