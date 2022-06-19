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


const nodemailer = require("nodemailer"),
    transport = nodemailer.createTransport('direct', {
        debug: true, //this!!!
    });

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
    transport.sendMail({
        from: 'marko@test.com',
        to: 'romanizat@gmail.com, marko.josifovic.4494@metropolitan.ac.rs',
        subject: 'test sendmail',
        html: 'content',
    }, function (err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
});