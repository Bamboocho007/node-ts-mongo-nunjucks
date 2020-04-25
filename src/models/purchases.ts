import  { Schema, model, Document } from "mongoose";
import { IProduct } from "./product";
import { IUser } from "./user";

export interface IPurchase extends Document {
    product: IProduct,
    user: IUser,
    createdAt: string,
    count: number
}

const purchaseSchema = new Schema<IPurchase>({
    product: { ref: "Product", type: Schema.Types.ObjectId },
    user: { ref: "User", type: Schema.Types.ObjectId },
    createdAt: { type: String, required: true },
    count: { type: Number, required: true }
});

export default model<IPurchase>("Purchase", purchaseSchema);