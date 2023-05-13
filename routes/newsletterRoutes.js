const express = require('express');
const router = express.Router();
const  needle = require('needle');
const nodemailer = require('nodemailer');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();


const AIRTABLE_TABLE_NAME = "NewsletterSubscribers"
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;


//SMTP VARS
const SMTP_USERNAME = process.env.SMTP_USERNAME;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_HOST = process.env.SMTP_HOST;


router.post('/', async (EmailMatch, res) => {


    // assign email variable to email from request body
    const Email = EmailMatch.body.email;
    
    const checkUserExists = new Promise((resolve, reject) => {
      var Airtable = require('airtable');
      var base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
        AIRTABLE_BASE_ID
      );
      base(AIRTABLE_TABLE_NAME).select({
        filterByFormula: `{Email} = "${Email}"`
      }).firstPage(function (err, records) {
        if (err) {
          reject(err);
        }
        resolve(records);
      });
    });

    const records = await checkUserExists;
    var Airtable = require('airtable');
      var base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
        AIRTABLE_BASE_ID
      );
    if (records.length === 0) {
      // use try and catch to handle errors


      try {
        // add email to db
        base(AIRTABLE_TABLE_NAME).create(
          [
            {
              fields: {
                Email: Email,
              },
            },
          ],
          function (err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function (record) {
              console.log(record.getId());
              console.log(Email)
            });
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      res.status(409).send('Email already exists');
 
     
      }


    // if the email does not exist, send a welcome email
    if (records.length === 0) {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: SMTP_USERNAME,
          pass: SMTP_PASSWORD,
          port: SMTP_PORT,
          host: SMTP_HOST,
          secure: true,
        },
      });
      var readHTMLFile = function (path, callback) {
        // read the html file
        fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
          if (err) {
            callback(err);
          } else {
            callback(null, html);
          }
        }); 
      };

      readHTMLFile('public/subscribers/welcome.html', function (err, html) {
        if (err) {
          console.log('error reading file', err);
          return;
        }
        var template = handlebars.compile(html);
        var replacements = {
          username: 'John Doe',
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
          from: 'Enigmance <noreply@enigmance.com>',
          to: Email,
          subject: 'Welcome to Our NewsLetter Subscription',
          html: htmlToSend,
        };
        transporter.sendMail(mailOptions, function (error, response) {
          // send res status if email is not sent
          if (response == 550){
            res.sendStatus(550).end();
          }


          if (error, res) {
            console.log(error);
          }
          console.log(response);
          res.sendStatus(200).end();
        });

        

      });
    }
    // catch if the email already exists in airtable
    else {
      console.log('Email already exists');
    }

    router.post(function(){
      router.set("view options", {layout: false});
      router.register('.html', {
        compile: function(str, options){
          return function(locals){
            return str;
          };
        }
      });
     });
 
 
 
  });



module.exports = router;