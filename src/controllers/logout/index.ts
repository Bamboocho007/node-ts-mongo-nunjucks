import { Router } from "express";

const logoutRouter = Router();

logoutRouter.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/');
});

export { logoutRouter };