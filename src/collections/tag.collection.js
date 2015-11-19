import Tag from '../models/tag';
import mongoose from 'mongoose';

class TagCollection {

  insert(data) {
    let tag = new Tag(data);

    return new Promise((fulfill, reject) => {
      tag.save((err, data) => {
        if (err) {
          reject(err);
        }

        fulfill(data);
      });

    });
  }

  find(data = {}) {
    return new Promise((fulfill, reject) => {

      Tag.find(data, (err, results) => {
        if(err){
          reject(err);
        }

        fulfill(results);
      });

    });
  }
}

export default new TagCollection();