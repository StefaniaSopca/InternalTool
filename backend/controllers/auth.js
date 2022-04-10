const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Room = require('../models/room');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() });}

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try
    {
      const hashedPassword = await bcrypt.hash(password, 12);

      const userDetails = 
      {
          name: name,
          email: email,
          password: hashedPassword,
      };

      const result = await User.save(userDetails);

      res.status(201).json({ message: 'User registered!' });
    
   
    } catch (err) 
    {
      if (!err.statusCode) 
      {
        err.statusCode = 500;
      }
      next(err);
    }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.find(email);

    if (user[0].length !== 1) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];

    const isEqual = await bcrypt.compare(password, storedUser.password);

    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.id,
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    res.status(200).json({token:token, username: storedUser.name });
    
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createRoom = async (req, res, next) => {
  const email = req.body.email;
  const roomNo = req.body.roomNo;

  console.log(email,roomNo);
  const errors = validationResult(req);
  if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() });}

  try
  {

    const roomDetails = 
    {
        
        email: email,
        roomNo: roomNo
    };

    const result = await Room.save(roomDetails);

    res.status(201).json({ message: 'Room registered!' });
  
  
  } catch (err) 
  {
    if (!err.statusCode) 
    {
      err.statusCode = 500;
      console.log(err.message);
    }
    next(err);
  }
}

  exports.joinRoom = async (req, res, next) => {
    const email = req.body.email;
    const roomNo = req.body.roomNo;

    console.log(email,roomNo);
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() });}

    try
    {

      const roomDetails = 
      {
          
          email: email,
          roomNo: roomNo
      };

      const result = await Room.save(roomDetails);

      res.status(201).json({ message: 'Join Room registered!' });
    
    
    } catch (err) 
    {
      if (!err.statusCode) 
      {
        err.statusCode = 500;
        console.log(err.message);
      }
      next(err);
    }
  }

exports.addUsers = async (req, res, next) => {
  const username = req.body.username;
  const roomNo = req.body.roomNo;
  console.log("U",username);
  try{
    console.log("here")
    const users = await Room.select(username, roomNo);
    console.log("here1")
    // if (users[0].length !== 1) {
    //   console.log("here2")
    //   const error = new Error('select 0 found.');
    //   error.statusCode = 401;
    //   throw error;
    // }

    const listOfUsers = users[0];
    console.log(listOfUsers);
    const arr= new Array(listOfUsers.length)
    for (let i=0; i<listOfUsers.length; i ++)
    {
      arr[i] = listOfUsers[i].email;
    }

    console.log(arr);
    res.status(201).json({ arr:  arr});
  }
  catch(err){
    if (!err.statusCode) 
  {
    err.statusCode = 500;
    console.log(err.message);
  }
  next(err);
  }
}
  