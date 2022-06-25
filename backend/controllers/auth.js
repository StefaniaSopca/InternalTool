const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Room = require('../models/room');
const Events = require('../models/events');

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
      res.status(201).json({ message: 'User registered in database!' });

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
      const error = new Error('User not found.');
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
      { expiresIn: '200s' }
    );
    res.status(200).json({token:token, username: storedUser.name, email: storedUser.email });
    
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
  if (!errors.isEmpty()) 
  { 
    return res.status(400).json({ errors: errors.array() });
  }
  try
  {
    const roomDetails = 
    {     
        email: email,
        roomNo: roomNo
    };
    console.log(email);
    const result = await Room.save(roomDetails);

    res.status(201).json({ message: 'Room registered!' });  
  }
  catch (err) 
  {
    if (!err.statusCode) 
    {
      err.statusCode = 500;
      console.log(err.message);
    }
    next(err);
  }
}


  // exports.joinRoom = async (req, res, next) => {
  //   const email = req.body.email;
  //   const roomNo = req.body.roomNo;

  //   console.log(email,roomNo);
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() });}

  //   try
  //   {
  //     const roomDetails = 
  //     {
  //         email: email,
  //         roomNo: roomNo
  //     };

  //     // daca exista deja user -roomNo ib DB -> nu mai insereaza iar
  //     const resultRoom = await Room.find(roomDetails.roomNo);
  //     const resultUser = await User.find(roomDetails.email)
  //     console.log(resultRoom[0])

  //     if(resultRoom[0].length != 0 && resultUser[0].length == 0)
  //     {
  //       const resInsert = await Room.save(roomDetails);
  //       res.status(201).json({ message: 'Join Room user nou in echipa!' });
  //     }
  //     else if(resultRoom[0].length != 0 && resultUser[0].length != 0)
  //     {
  //       res.status(201).json({ message: 'Join Room user existent in echipa!' });
  //     }
  //     else{
  //       const error = new Error('Join Invalid');
  //       error.statusCode = 401;
  //       console.error(error);
  //       throw error;
  //     }
    
  //   } catch (err) 
  //   {
  //     if (!err.statusCode) 
  //     {
  //       err.statusCode = 500;
  //       console.log(err.message);
  //     }
  //     next(err);
  //   }
  // }

  exports.joinRoom = async (req, res, next) => {
    const email = req.body.email;
    

    console.log(email);
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() });}

    try
    {

      // daca exista deja user -roomNo ib DB -> nu mai insereaza iar
      const resultRoom = await Room.findAllRooms(email);
     
      const listRooms = resultRoom[0];
    const arr= new Array(listRooms.length)

    for (let i=0; i<listRooms.length; i ++)
    {
      arr[i] = listRooms[i].roomNo;
    }
    if(arr.length == 0)
      res.status(201).json({arr: 0})
    else 
      res.status(201).json({ arr:  arr});
    
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

  try{
    const users = await Room.select(username, roomNo);

    const listOfUsers = users[0];
    const arr= new Array(listOfUsers.length)

    for (let i=0; i<listOfUsers.length; i ++)
    {
      arr[i] = listOfUsers[i].email;
    }
    if(arr.length == 0)
      res.status(201).json({arr: 0})
    else 
      res.status(201).json({ arr:  arr});
  }
  catch(err)
  {
    if (!err.statusCode) 
    {
      err.statusCode = 500;
      console.log(err.message);
    }
  next(err);
  }
}

exports.getAllEvents = async (req, res, next) => {

  try{
    const events = await Events.selectAllButton();

    const listOfEvents = events[0];
    const arr= new Array(listOfEvents.length)

    console.log(listOfEvents[0])
    if(arr.length == 0)
      res.status(201).json({listOfEvents: 0})
    else 
    {  console.log("it s fine")
    
      res.status(201).json(  listOfEvents)}
  }
  catch(err)
  {
    if (!err.statusCode) 
    {
      err.statusCode = 500;
      console.log(err.message);
    }
  next(err);
  }
  }

exports.events = async (req, res, next) => {
  const email = req.body.email
  console.log("add ",email);
  const errors = validationResult(req);
  if (!errors.isEmpty()) 
  { 
    return res.status(400).json({ errors: errors.array() });
  }
  try
  {
    const event = 
    {     
        title:  req.body.title,
        start:  req.body.start,
        end:  req.body.end,
        allDay:  req.body.allDay
    };

    const result = await Events.save(email, event);
    console.log("result",result[0].insertId)
    res.status(201).json(result[0].insertId );  
  }
  catch (err) 
  {
    if (!err.statusCode) 
    {
      err.statusCode = 500;
      console.log(err.message);
    }
    next(err);
  }
 
}


exports.optionGPSData = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  next();
  }



exports.getEvents = async (req, res, next) => {
  
  const email = req.query.email;
  console.log("extra params: ",email);
  try{
    const events = await Events.select(email);

    const listOfEvents = events[0];
    const arr= new Array(listOfEvents.length)

    console.log(listOfEvents[0])
    if(arr.length == 0)
      res.status(201).json({listOfEvents: 0})
    else 
    {  console.log("it s fine")
    
      res.status(201).json(  listOfEvents)}
  }
  catch(err)
  {
    if (!err.statusCode) 
    {
      err.statusCode = 500;
      console.log(err.message);
    }
  next(err);
  }
  }


exports.updateEvent = async (req, res, next) => {
  const newstart = req.body.event.start;
  const newend = req.body.event.end;
  const oldstart = req.body.oldEvent.start;
  const oldend = req.body.oldEvent.end;
  console.log(newstart, newend);
  console.log(oldstart, oldend);
  try{
    const id = await Events.selectId(req.body.oldEvent)
    console.log("id event: " + id[0][0].id);

    const updated = await Events.updateEvent(id[0][0].id, newstart, newend);
    res.status(201).json({ message: 'Event updated!' });  
  }
  catch (err) 
  {
    if (!err.statusCode) 
    {
      err.statusCode = 500;
      console.log(err.message);
    }
    next(err);
  }

}

exports.noEvents = async (req, res, next) => {
  const email = req.query.email;
  console.log("email : ", email);
  try{
    const id = await Events.selectAll(email)
    console.log("all: " + id[0]);

   
    res.status(201).json( id[0]);  
  }
  catch (err) 
  {
    if (!err.statusCode) 
    {
      err.statusCode = 500;
      console.log(err.message);
    }
    next(err);
  }

}

exports.deleteEvent = async (req, res, next) => {
  console.log("delete event ")
  const idEvent = req.query.id
  console.log("delete event ", idEvent)
 // console.log("email: ",title);
  try{
    const id = await Events.deleteEvent(idEvent)
   
    res.status(201).json({ message: "delete ok"});  
  }
  catch (err) 
  {
    if (!err.statusCode) 
    {
      err.statusCode = 500;
      console.log(err.message);
    }
    next(err);
  }
  
}

  