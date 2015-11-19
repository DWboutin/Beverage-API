import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

let packageSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String },
  created_at: Date,
  updated_at: Date
});

packageSchema.pre('save', function(next) {

  var Package = this;
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  Package.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!Package.created_at){
    Package.created_at = currentDate;
  }

  next();
});

let Package = mongoose.model('Package', packageSchema);

export default Package;