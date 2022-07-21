//Setup de instalaçao do Handlebars 
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {

    const items = ['item a', 'item b', 'item c']



    res.render('dashboard', {items})
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender Node.js',
        category: 'JavaScript',
        body: 'Este arquivo vai te ajudar a aprender Node.js....',
        comments: 4,
    }
    res.render('blogpost', { post })
})

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: 'Aprender React',
            category: 'React',
            body: 'Este arquivo vai te ajudar a aprender React....',
            comments: 5
        },
        {
            title: 'Aprender Java',
            category: 'Java',
            body: 'Este arquivo vai te ajudar a aprender Java....',
            comments: 6
        },
        {
            title: 'Aprender html',
            category: 'html',
            body: 'Este arquivo vai te ajudar a aprender html....',
            comments: 4
        }
    ]
    res.render('blog', { posts })
})


app.get('/', (req, res) => {

    const user = {
        name: 'Wesley',
        surname: 'Caldas',
        age: 30,
    }

    const palavra = 'teste'

    const auth = false
    const approved = true

    res.render('home', {user: user, palavra, auth, approved })
})

app.listen(3000, () => {
    console.log('App funcionando')
})
