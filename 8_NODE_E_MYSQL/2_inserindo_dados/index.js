const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

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

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertbook', (req, res) => {

    const title = req.body.title
    const pageqty =  req.body.pageqty

    const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

    conn.query(query, function (err) {

       if(err) { 
        console.log(err)
       }

       res.redirect('/')

    })
})

// Conexão do banco de dados
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'wesley08',
    database: 'nodemysql',
})
// fim execução

// Execução do banco
conn.connect(function(err) {
    if(err) {
        console.log(err)
    }

    console.log('Conectou ao MySQL!')

    app.listen(3000)
})
// Fim da execução