const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      // abc cini@gmail.com
      validate: [isEmail, "Please Provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      miniLength: [8, "minimum password length is 8"],
      // regEx(regular expression - and it is use to check if a string fit a particular pattern)
      validate: {
        validator: function (v) {
          const test =
            /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@.#$!%?&])[A-Za-z\d@.#$!%?&]+$/.test(
              v
            );
          return !test;
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    },
    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);

// mongoose pre save hook - we want to protect password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
