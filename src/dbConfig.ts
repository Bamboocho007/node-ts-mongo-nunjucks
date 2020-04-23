import { connect } from "mongoose";

class DBConfig {

    public mongoose: typeof import("mongoose");
    
    constructor() {
        this.init();
    }

    init() {
        const db = connect("mongodb://localhost:27017/nodeDb", { useNewUrlParser: true, useUnifiedTopology: true });
        db.then( data => {
            this.mongoose = data;
            console.log("Connected to DB!!!")
        })
        .catch( err => {
            console.log("db connection err => ", err );
        });
    }
}

export { DBConfig };
