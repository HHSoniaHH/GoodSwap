const { isValidObjectId } = require("mongoose")
const Verification = require("../models/VerificationModel")
const User = require("../models/UserModel")

exports.IsResetTokenValid=async(req,res,next)=>{
const {token,id}=req.query
if(!token || !id) return res.status(500).json({success:false,message:'invalid'})



if(!isValidObjectId(id)) return res.status(500).json({success:false,message:'invalid user'})

const user = await User.findById(id)
if(!user) return res.status(404).json({success:false,message:' user not found'})



const reset = await Verification.findOne({owner:user._id})
if(!reset) return res.status(404).json({success:false,message:' reset token not found'})


const isValid = await reset.compareToken(token)
if(!isValid) return res.status(404).json({success:false,message:' reset token invalid'})
req.user=user
next()
}