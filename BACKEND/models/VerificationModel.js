const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Verification = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    expires:60
    ,
    default:Date.now()
  },
});

Verification.pre("save", function (next) {
  if (this.isModified("token")) {
    bcrypt.hash(this.token, 8, (err, hash) => {
      if (err) return next(err);

      this.token = hash;
      next();
    });
  }
});

Verification.methods.compareToken = async function (token) {
 
    const result = await bcrypt.compare(token, this.token);
    return result;

};


module.exports = mongoose.model("verification", Verification);
