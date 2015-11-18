import config from '../config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import allowCrossOrigin from './middlewares/allowCrossOrigin';

import UserCollection from './collections/user.collection';
import RecipeCollection from './collections/recipe.collection';

mongoose.connect( config.bd.path );

let db = mongoose.connection;
let api = express();

db.on('error', console.error.bind(console, 'connection error:'));

api.use(bodyParser.urlencoded({extended: true}));
api.use(bodyParser.json());
api.use(allowCrossOrigin);

/**
 * # POST /user - User creation
 * Header: {
 *   Content-Type: application/json
 * }
 * Required: {
 *   username: String,
 *   password: String,
 *   email: String
 * }
 */
api.post('/user', (req, res) => {

  UserCollection.insert(req.body).then((data) => {
    if(data){
      res.status(200).json({status: 1, data: data});
    }else{
      res.status(200).json({status: 0, message: "Can't create any user"});
    }
  }, (err) => {
    res.status(500).json({status: 0, error: err});
  });

});

/**
 * # GET /users - Get all users
 */
api.get('/users', (req, res) => {

  UserCollection.find({}).then((data) => {
    if(data){
      res.status(200).json({status: 1, data: data});
    }else{
      res.status(200).json({status: 0, message: "Can't get any user"});
    }
  }, (err) => {
    res.status(500).json({status: 0, error: err});
  });

});

/**
 * # GET /user/:userId - Get user by his id
 * Required: {
 *   userId: MongoDB _id
 * }
 */
api.get('/user/:userId', (req, res) => {

  UserCollection.findById(req.params.userId).then((data) => {
    if(data){
      res.status(200).json({status: 1, data: data});
    }else{
      res.status(200).json({status: 0, message: "No user is found"});
    }
  }, (err) => {
    res.status(500).json({status: 0, error: err});
  });

});

/**
 * # POST /user/login - Delete user with his id
 * Header: {
 *   Content-Type: application/json
 * }
 * Required: {
 *   userId: MongoDB _id
 * }
 */
api.post('/user/login', (req, res) => {

  UserCollection.login(req.body).then((user) => {
    if(user){
      user = user.toObject();
      let password = user.password;
      delete user.password;
      res.status(200).json({status: 1, data: user, key: password});
    }else{
      res.status(200).json({status: 0, message: "Username or Password doesn't matches"});
    }
  }, (err) => {
    res.status(500).json({status: 0, error: err});
  });

});

/**
 * # POST /user/:userId - Update user by id with data from json
 * Header: {
 *   Content-Type: application/json
 * }
 * Required: {
 *   userId: MongoDB _id
 * }
 */
api.post('/user/:userId', (req, res) => {

  UserCollection.update(req.params.userId, req.body).then((data) => {
    if(data){
      res.status(200).json({status: 1, data: data});
    }else{
      res.status(200).json({status: 0, message: "No user is found"});
    }
  }, (err) => {
    res.status(500).json({status: 0, error: err});
  });

});

/**
 * # POST /user/delete/:userId - Delete user with his id
 * Header: {
 *   Content-Type: application/json
 * }
 * Required: {
 *   userId: MongoDB _id
 * }
 */
api.post('/user/delete/:userId', (req, res) => {

  UserCollection.delete(req.params.userId).then((data) => {
    if(data){
      res.status(200).json({status: 1, data: data});
    }else{
      res.status(200).json({status: 0, message: "No user is found"});
    }
  }, (err) => {
    res.status(500).json({status: 0, error: err});
  });

});

/**
 * # POST /recipe - Recipe creation
 * Header: {
 *   Content-Type: application/json
 * }
 * Required: {
 *   title: String,
 *   author: String,
 *   tags: String
 *   code: String
 * }
 */
api.post('/recipe', (req, res) => {

  RecipeCollection.insert(req.body).then((data) => {
    if(data){
      res.status(200).json({status: 1, data: data});
    }else{
      res.status(200).json({status: 0, message: "Can't create any recipe"});
    }
  })
  .catch((err) => {
    res.status(500).json({status: 0, error: err});
  });

});

/**
 * # GET /recipes - Get all recipes
 */
api.get('/recipes', (req, res) => {

  RecipeCollection.find({}).then((data) => {
    if(data){
      res.status(200).json({status: 1, data: data});
    }else{
      res.status(200).json({status: 0, message: "Can't get any recipes"});
    }
  }, (err) => {
    res.status(500).json({status: 0, error: err});
  });

});

/**
 * # GET /recipe/:recipeId - Get recipe by his id
 * Required: {
 *   recipeId: MongoDB _id
 * }
 */
api.get('/recipe/:recipeId', (req, res) => {

  RecipeCollection.findById(req.params.recipeId).then((data) => {
    if(data){
      res.status(200).json({status: 1, data: data});
    }else{
      res.status(200).json({status: 0, message: "No recipe is found"});
    }
  }, (err) => {
    res.status(500).json({status: 0, error: err});
  });

});

/**
 * # POST /recipe/:recipeId - Update recipe by id with data from json
 * Header: {
 *   Content-Type: application/json
 * }
 * Required: {
 *   recipeId: MongoDB _id
 * }
 */
api.post('/recipe/:recipeId', (req, res) => {

  UserCollection.update(req.params.recipeId, req.body).then((data) => {
    if(data){
      res.status(200).json({status: 1, data: data});
    }else{
      res.status(200).json({status: 0, message: "No recipe is found"});
    }
  }, (err) => {
    res.status(500).json({status: 0, error: err});
  });

});

/**
 * # POST /recipe/delete/:recipeId - Delete recipe with his id
 * Header: {
 *   Content-Type: application/json
 * }
 * Required: {
 *   recipeId: MongoDB _id
 * }
 */
api.post('/recipe/delete/:recipeId', (req, res) => {

  UserCollection.delete(req.params.recipeId).then((data) => {
    if(data){
      res.status(200).json({status: 1, data: data});
    }else{
      res.status(200).json({status: 0, message: "No recipe is found"});
    }
  }, (err) => {
    res.status(500).json({status: 0, error: err});
  });

});

export default api;