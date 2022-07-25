const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')
const Address = require('./models/Address')

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
// Pegar dados individualmente no banco
app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({raw: true, where: {id: id} })

    res.render('userview', {user})
})
//

// Deletar dados Banco
app.post('/users/delete/:id', async(req, res) => {
    const id = req.params.id
    await User.destroy({where: { id: id}})

    res.redirect('/')
})
//
// Aparecer dados do banco
app.get('/users/edit/:id', async(req, res) => {
    const id = req.params.id

    const user = await User.findOne({ raw: true, where: { id: id} })

    res.render('useredit', { user })
})
//

// Atualizar dados 
app.post('/users/update', async (req, res) => {

    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    const userData = {

        id,
        name,
        occupation,

        newsletter,
    }
    await User.update(userData, { where: {id: id } })

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

conn.
sync()
/* sync({ force: true }) */ 
.then(() => {
    app.listen(3000)
})
.catch((err) => console.log(err))

//