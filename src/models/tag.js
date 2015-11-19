import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

let tagSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String },
  created_at: Date,
  updated_at: Date
});

tagSchema.pre('save', function(next) {

  var tag = this;
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  tag.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!tag.created_at){
    tag.created_at = currentDate;
  }

  next();
});

let Tag = mongoose.model('Tag', tagSchema);

export default Tag;