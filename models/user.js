const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({

   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: [true, "Please enter your email"]
   },
   password: {
      type: String,
      required: [true, "Please enter a new password"],
      minlength: [6, "Password should be 6 character"],
      select: false
   },
   avatar: {
      public_id: String,
      url: String,
   },
   role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

userSchema.pre("save", async function (next) {
   if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10)
   }
   next();
});

userSchema.methods.generateToken = function () {
   return jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
}

userSchema.methods.matchPassword = async function (password) {
   return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model("User", userSchema);