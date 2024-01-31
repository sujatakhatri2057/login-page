const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const registerSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'please enter a valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        validate: {
            validator: function (val) {
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+[\]{};':"\\|,.<>/?~`]).{8,}$/.test(val);
            },
            message: 'Password must contain 1 each character of number, uppercase lowercase and symbol'
        }

    },
    cpassword: {
        type: String,
        required: true,
        validate: {
            validator: function (data) {
                return this.password === data
            },
            message: 'Password not match'
        }
    },
    role: {
        type: String,
        default: "role_user"
    }
})

registerSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    this.cpassword = undefined;
    next();
});

registerSchema.methods.checkcorrectPass = async function (password, userpass) {
    return await bcrypt.compare(password, userpass);
}

const registerdb = mongoose.model('DBregister', registerSchema);

module.exports = registerdb;