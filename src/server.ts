import { Express, Router } from "express";
import { Environment, configure as nunjucksConfig } from "nunjucks";

class Server {
    _App: Express;
    NjkEnv: Environment;

    constructor(app: Express) {
        this._App = app;

        this.NjkEnv = nunjucksConfig('views', {
            autoescape: true,
            express: this._App
        });
    }

    ApplySetting(options: [string, string][]) {
        options.forEach( o => {
            this._App.set(o[0], o[1]);
        });
    }

    ApplyMiddlewares(middlewares: any[]) {
        middlewares.forEach( m => {
            this._App.use(m);
        });
    }

    ApplyRoutes(middlewares: Router[]) {
        middlewares.forEach( m => {
            this._App.use(m);
        });
    }

    AddHtmlFilters(filters: {name: string, func: (...arg: any) => string}[]) {
        filters.forEach( filter => {
            this.NjkEnv.addFilter(filter.name, filter.func);
        });
    }

    Listen() {
        this._App.listen("3000", (err) => {
            if( err ) console.log("err =>", err);
            console.log("Server started on port 3000");
        });
    }

}

export { Server };