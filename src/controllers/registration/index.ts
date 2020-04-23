import User, { IUser } from "../../models/user";
import { hash } from "bcrypt";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../inversify/types";
import { Router } from "express";
import { ILogger } from "../../services/loggerService";
import { CommonController } from "..";

@injectable()
class RegistrationController implements CommonController {
    CurrentRouter(): Router {
        const registrationRouter = Router();

        registrationRouter.get("/signUp", (req, res) => {
            res.render("signUp");
        });

        registrationRouter.post( "/signUp", async (req, res) => {
            let hashedPassword = await hash( req.body.password, 10);
            User.create({ 
                email: req.body.email, 
                firstName: req.body.firstName, 
                lastName: req.body.lastName, 
                password: hashedPassword }, 
                (err, user: IUser) => {
                    if( err) {
                        res.status(401);
                    }
                    res.statusCode = 200;
                    res.redirect("/login");
            });
        });

        return registrationRouter;
    }
}

export { RegistrationController };