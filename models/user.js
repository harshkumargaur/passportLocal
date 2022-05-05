const crypto = require('crypto');

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type:String,
    },
    resetToken: String,
});

userSchema.method('createResetToken',function(){
    const token = crypto.randomBytes(32).toString('hex');
 

  const hash = crypto.createHash('sha256');
  const enc = hash.update(token).digest('hex');
  this.resetToken = enc;

  return token;
})


userSchema.plugin(passportLocalMongoose,{
    usernameLowerCase: true,
    usernameField:'email',
    usernameQueryFields:['email']
});

module.exports = mongoose.model('User',userSchema);