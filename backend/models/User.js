const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    unique:  [true, 'That username is taken.']
      
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'That email address is taken.']
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image:{
        type:String
    }
},
   
  { timestamps: true }
);

userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})


userSchema.methods.comparePassword  = async function(candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}
module.exports = mongoose.model("User", userSchema);
