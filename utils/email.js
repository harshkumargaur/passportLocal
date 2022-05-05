require('dotenv').config();

const sendGrid = require('@sendgrid/mail');
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const mailFunction = async function(receiver,resetKey){

const msg = {
    to : receiver,
    from: 'bingewatcher5178@gmail.com',
    subject: 'this is a reset password email',
    text:' This email is intended for testing purposes',
    html: `<p> ${resetKey} </p>`
}

const sendMail = async function(){

    try {
        
        const status= await sendGrid.send(msg);
        console.log('mail sent');
    } catch (error) {
        console.log(error);
    }
    
}

sendMail();

}

module.exports = mailFunction;