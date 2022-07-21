const express = require('express')

const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req,res) => {
    const produto = [
        nome = 'TV',
        pol = 34,
        category = 'ultra hd' 
    ]
    res.render('home', {nome, pol, category})
})

app.get('/informacao', (req,res) => {
    const informacoes = [
        nome = 'teste',
        category = 'teste',
        test = 'teste',

    ]
    res.render('informacao', {nome, category, test })
})

app.listen(3000, () => {
    console.log('App funcionando')
})