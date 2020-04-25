import  { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
    name: string,
    section: string,
    color: string,
    weight: number,
    cost: number
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    section: { type: String, required: true },
    color: { type: String, required: true },
    weight: { type: Number, required: true },
    cost: { type: Number, required: true }
});

export default model<IProduct>("Product", productSchema);