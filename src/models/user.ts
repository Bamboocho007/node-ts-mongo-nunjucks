import  { Schema, model, Document } from "mongoose";
import { compare } from "bcrypt";

export interface IUser extends Document {
    email: string,
    firstName: string,
    lastName: string,
    password: string
    validPassword: (password: string) => Promise<boolean>
}

const UserSchema: Schema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true }
});

UserSchema.methods.validPassword = async (password: string, hash: string): Promise<boolean> => {
    return await compare(password, hash, (err, matched) => {
        return matched;
    });
};

export default model<IUser>("User", UserSchema);