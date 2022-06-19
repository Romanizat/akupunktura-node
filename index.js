// imports
const express = require('express')
const app = express()
const port = 10000

// Static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index')
})

// Listen on port
app.listen(port, () => console.info(`Listening on port ${port}`))


const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMailNodeMailer() {
// Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

const sendmail = require('sendmail')({
    logger: {
        debug: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error
    },
    silent: true,
    devPort: 1025, // Default: False
    devHost: 'localhost', // Default: localhost
    smtpPort: 2525, // Default: 25
    smtpHost: 'localhost' // Default: -1 - extra smtp host after resolveMX

})


app.post('/sendMail', (req, res) => {
    // const {name, email, message} = req.body;
    console.log(req.body);
    // const content = `
    //     <h1>You have a new contact request</h1>
    //       <ul>
    //         <li>Name: ${name}</li>
    //         <li>Email: ${email}</li>
    //         <li>Message: ${message}</li>
    //         </ul>`;
    sendmail({
        from: 'romanizat@gmail.com',
        to: 'romanizat@gmail.com, marko.josifovic.4494@metropolitan.ac.rs',
        subject: 'test sendmail',
        html: 'content',
    }, function (err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
});