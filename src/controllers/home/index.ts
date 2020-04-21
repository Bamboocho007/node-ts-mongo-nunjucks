import { Router } from "express";
import User, { IUser } from "../../models/user";

const homeRouter = Router();

homeRouter.get("/",  (req, res) => {
    const data = [
        {
            email: "test@dhts.ge",
            firstName: "test user 2",
            lastName: "test last name 2"
        }
    ];

    let user: IUser =  req.user ? req.user as IUser : null;

    res.render("index", { user: user });
});

export { homeRouter };