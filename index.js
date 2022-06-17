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
