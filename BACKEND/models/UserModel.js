const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  tokens: [{ type: Object }],
  UserType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Desactive",
    required: true,
  },

  Avis: [
    {
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      auteur: String,
      avatar: String,
      text: String,
      rating: Number,
    },
  ],
  required: false,
  smiles: {type:Number,required:true,default:10},
  organisationId: { type: mongoose.Schema.Types.ObjectId, ref: "Organisation" },

  demandes: [
    {
      UserDemandeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      UserDemandeName: String,
      NomOrganisation: String,
      EmailOrganisation: String,
      TelOrgansiation: Number,
      status: {
        type: String,
        enum: ["Attente", "Accepter"],
        default: "Attente",
        required: true,
      },
    },
  ],
  required: false,
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is mission, can not compare!");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error while comparing password!", error.message);
  }
};

userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error("Adresse email invalide");
  try {
    const user = await this.findOne({ email });
    if (user) return false;

    return true;
  } catch (error) {
    console.log("error inside isThisEmailInUse method", error.message);
    return false;
  }
};

module.exports = mongoose.model("users", userSchema);
