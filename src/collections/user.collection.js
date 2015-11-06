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

      User.find(data, '-password', (err, results) => {
        if(err){
          reject(err);
        }

        fulfill(results);
      });

    });
  }

  login({username, password, encrypted = false}) {
    return new Promise((fulfill, reject) => {

      User.findOne({username: username}, (err, user) => {
        if(err){
          reject(err);
        }
        if(user){
          if(encrypted === false){
            user.comparePassword(password, (err, isMatch) => {
              if(err){
                reject(err);
              }
              if(isMatch){
                fulfill(user);
              }else{
                fulfill(false);
              }
            });
          }else{
            User.findOne({username: username, password: password}, (err, user) => {
              if(err){
                reject(err);
              }
              fulfill(user);
            });
          }
        }else{
          fulfill(false);
        }
      });

    });
  }

  findById(id) {
    return new Promise((fulfill, reject) => {
      if(id === 'undefined'){
        fulfill(false);
      }

      User.findById(id, '-password', (err, result) => {
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
          fulfill(false);
        }
      });

    });
  }

}

export default new UserCollection();