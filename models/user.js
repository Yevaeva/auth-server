import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
});
userSchema.pre("save", (next) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hush(user.password, salt, null, (err, hash) => {
      if (err) next(err);
      user.password = hash;
      next();
    });
  });
});

export default mongoose.model("user", userSchema);
