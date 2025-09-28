import mongoose, { mongo } from "mongoose";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lists: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'List'
        }
    ]
});

const User = mongoose.model('User', userSchema);
export default User;

