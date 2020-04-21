import { Router } from "express";
import { hash } from "bcrypt";
import User, { IUser } from "../../models/user";
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

export { registrationRouter };