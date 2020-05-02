//import * as functions from 'firebase-functions';

require('dotenv').config();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();
const nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service:'gmail' ,
  auth: {
    user:process.env.EMAIL, 
    pass:process.env.PASSWORD
  }
 });


exports.sendEmail=functions.firestore
.document('Tests/{code}') 
.onCreate((snap:any)=>{

    const email=snap.data().email;
    const code=snap.data().code;
    const date = Date();
    const mailOptions = {
        from:'testcreatorplatform@gmail.com',
        to:email,
        subject: 'Unique Code for your quiz',
        html : `
        <div>From:Test Creator Platform</div>
        <div>Date: ${date}</div>
        <p> Here is your unique code for accesing your quiz!</p>
        <h2>${code}</h2>
        <a href="http://localhost:4200/">Find more info on our website!</a>
        <p>,Test Creator Platform team</p>
      `
    };


  transporter.sendMail(mailOptions, function (err: any, info: any) {
      if(err)
        console.log('eroare',err);
      else
        console.log("Yassss");
   });
  });



  exports.sendResultEmail=functions.firestore
  .document('Scores/{score}') 
  .onCreate((snap:any)=>{
  
      const email=snap.data().email;
      const score=snap.data().score;
      const nameOfTest=snap.data().nameOfTest;
      const name=snap.data().name;
      const date = Date();
      const mailOptions = {
          from:'testcreatorplatform@gmail.com',
          to:email,
          subject: ' New score at your test',
          html : `
          <div>From:Test Creator Platform</div>
          <div>Date: ${date}</div>
          <p>${name} got ${score} points at your ${nameOfTest} test.</p>
          <p>Thank you for using our platform!</p>
          <a href="http://localhost:4200/">Find more info on our website!</a>
          <p>,Test Creator Platform team</p>
        `
      };
  
  
    transporter.sendMail(mailOptions, function (err: any, info: any) {
        if(err)
          console.log('eroare',err);
        else
          console.log("Yassss");
     });
    });




