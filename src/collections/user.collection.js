import User from '../models/user';
import mongoose from 'mongoose';

class UserCollection {

  insert(data){
    let user = new User(data);

    return new Promise((fulfill, reject) => {

      user.save((err, data) => {
        if(err){
          reject(err);
        }

        fulfill(data);
      });

    });
  }

  find(data = {}) {
    return new Promise((fulfill, reject) => {

      User.find(data, (err, results) => {
        if(err){
          reject(err);
        }

        fulfill(results);
      });

    });
  }

  findById(id) {
    return new Promise((fulfill, reject) => {
      if(id === 'undefined'){
        reject('You must provide an ID');
      }

      User.findById(id, (err, result) => {
        if(err){
          reject(err);
        }

        fulfill(result);
      });

    });
  }

  update(id, data) {
    return new Promise((fulfill, reject) => {

      this.findById(id).then((user) => {

        Object.keys(data).forEach((key) => {
          user[key] = data[key];
        });

        user.save((err, data) => {
          if(err){
            reject(err);
          }

          fulfill(data);
        });

      }, (err) => {
        reject(err);
      });

    });
  }

  delete(id) {
    return new Promise((fulfill, reject) => {

      User.findById(id, (err, user) => {
        if(err){
          reject(err);
        }

        if(user){
          user.remove((err, data) => {
            if(err){
              reject(err);
            }

            fulfill(data);
          });
        }else{
          fulfill('No user for this id');
        }
      });

    });
  }

}

export default new UserCollection();