import config from '../config';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import UserCollection from './collections/user.collection';

mongoose.connect( config.bd.path );

let db = mongoose.connection;
let api = express();

db.on('error', console.error.bind(console, 'connection error:'));

api.use(bodyParser.urlencoded({extended: true}));
api.use(bodyParser.json());
api.use(session({secret: config.sessionSecret}));

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
    res.status(200).json({status: 1, data: data});
  }, (err) => {
    res.status(500).json({status: 0, error: err});
  });

});

/**
 * # GET /users - Get all users
 */
api.get('/users', (req, res) => {

  UserCollection.find({}).then((data) => {
    res.status(200).json({status: 1, data: data});
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
    res.status(200).json({status: 1, data: data});
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

  UserCollection.find(req.body).then((data) => {
    req.session.email = data[0].email;
    req.session.userId = data[0]._id;

    res.status(200).json({status: 1, data: data});
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
    res.status(200).json({status: 1, data: data});
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
    res.status(200).json({status: 1, data: data});
  }, (err) => {
    res.status(500).json({status: 0, error: err});
  });

});

export default api;