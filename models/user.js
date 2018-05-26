let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

let userSchema = new mongoose.Schema(
    {
        name: String,
        email: {type: String, required: true, unique: true },
        password: String,
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = (tryPassword, cb) => {
    bcrypt.compare(tryPassword, this.password, cb);
};

module.exports = mongoose.model('User', userSchema);