import Recipe from '../models/recipe';
import mongoose from 'mongoose';

class RecipeCollection {

  insert(data){
    console.log(data);
    let recipe = new Recipe(data);

    return new Promise((fulfill, reject) => {
      recipe.save((err, data) => {
        if(err){
          reject(err);
        }

        fulfill(data);
      });

    });
  }

  find(data = {}) {
    return new Promise((fulfill, reject) => {

      Recipe.find(data, (err, results) => {
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
        fulfill(false);
      }

      Recipe.findById(id, (err, result) => {
        if(err){
          reject(err);
        }

        fulfill(result);
      });

    });
  }

  update(id, data) {
    return new Promise((fulfill, reject) => {

      this.findById(id).then((recipe) => {

        Object.keys(data).forEach((key) => {
          recipe[key] = data[key];
        });

        recipe.save((err, data) => {
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

      Recipe.findById(id, (err, recipe) => {
        if(err){
          reject(err);
        }

        if(recipe){
          recipe.remove((err, data) => {
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

export default new RecipeCollection();