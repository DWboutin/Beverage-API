import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value);
      },
      message: '{VALUE} is not a valid email address!'
    }
  },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

userSchema.pre('save', function(next) {

  let user = this;
  // get the current date
  let currentDate = new Date();

  // change the updated_at field to current date
  user.updated_at = currentDate;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')){
    return next();
  }

  // if created_at doesn't exist, add to that field
  if (!user.created_at){
    user.created_at = currentDate;
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });

});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

let User = mongoose.model('User', userSchema);

export default User;