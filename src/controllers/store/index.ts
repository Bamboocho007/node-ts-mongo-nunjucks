import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../inversify/types";
import { Router } from "express";
import { ILogger } from "../../services/loggerService";
import { CommonController } from "..";
import Product from "../../models/product";
import Purchase from "../../models/purchases";

@injectable()
class StoreController implements CommonController {

    constructor() {}

    CurrentRouter(): Router {
        const storeRouter = Router();
        const addRouter = Router();
        const buyRouter = Router();

        addRouter.get("/add", async (req, res) => {
            res.render("store/addProduct", {products: await Product.find(), purchases: await Purchase.find({}).populate(["user","product"])});
        });
        addRouter.post("/add", (req, res) => {
            const {name, section, color, weight, cost} = req.body;
            Product.create({name, section, color, weight: parseFloat(weight), cost: parseFloat(cost)}, (err, doc) => {
                if( err ) console.log("err", err);
                res.render("store/addProduct");
            });
        });

        buyRouter.get("/buy/:productId", (req, res) => {
            res.render("store/buyProduct", {productId: req.params.productId}); 
        });
        buyRouter.post("/buy/:productId?", (req, res) => {
            Purchase.create({
                product: req.body.productId, 
                user: req.user, 
                createdAt: new Date().toISOString(), 
                count: req.body.count
            }, (err, doc) => {
                if( err ) console.log("err", err);
                res.redirect("/store/add");
            });
        });

        storeRouter.use("/store", addRouter);
        storeRouter.use("/store", buyRouter);

        return storeRouter;
    }
}

export { StoreController };