const express = require("express");
const router = express.Router();
const Subscriber = require("../models/newsletter");
const dotenv = require('dotenv');
dotenv.config();

// add email to mongodb database, if it doesn't already exist in the database, else send an error message
router.post("/", async (req, res, next) => {
  const newSubscriber = new Subscriber({
    email: req.body.email,
    date: new Date().toLocaleString("en-US", { timeZone: "Africa/Lagos" }),
  });

  // check if email exists in database

  const Email = req.body.email;
  const EmailExists = await Subscriber.findOne({ email: Email });
  if (EmailExists) {
    res.status(400).send("Email already exists");
  } else {
    newSubscriber
      .save()
      // every time a user is added to the database, emit a socket event to the client
      .then((subscriber) => {
        const io = require("socket.io-client");
        const socket = io("http://localhost:5001");
        socket.emit("subscribers", Email + "is a new " + subscriber);
        console.log(subscriber.length);
      })

      .then((subscriber) => res.json(subscriber))

      
      .catch((err) => console.log(err));
  }

  // send notification badge to client

  
});

module.exports = router;
