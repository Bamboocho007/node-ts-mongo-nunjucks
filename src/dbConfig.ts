import mongoose from "mongoose";

const db = mongoose.connect("mongodb://localhost:27017/nodeDb", { useNewUrlParser: true, useUnifiedTopology: true });
db.then( data => {
    console.log("Connected to DB!!!")
})
.catch( err => {
    console.log("db connection err => ", err );
});