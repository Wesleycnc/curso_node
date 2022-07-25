const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')

const app = express()

// Pegar o body em JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())
//

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/users/create', (req,res) => {
    res.render('adduser')
})

//Inserir dados ao banco 
app.post('/users/create', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }
    console.log(req.body)

    await User.create({name, occupation, newsletter})

    res.redirect('/')
})
//

// Pegar dados no banco de dados
app.get('/', async (req, res) => {

    const users = await User.findAll({raw: true})
    console.log(users)

    res.render('home', { users: users})
})
//

// conexão com o banco

conn.sync().then(() => {
    app.listen(3000)
})
.catch((err) => console.log(err))

//