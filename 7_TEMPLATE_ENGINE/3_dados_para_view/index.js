//Setup de instalaçao do Handlebars 
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {

    const user = {
        name: 'Wesley',
        surname: 'Caldas',
        age: 30
    }

    const palavra = 'teste'
    res.render('home', {user: user, palavra })
})

app.listen(3000, () => {
    console.log('App funcionando')
})
