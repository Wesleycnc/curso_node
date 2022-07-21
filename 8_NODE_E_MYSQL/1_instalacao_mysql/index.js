const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

// Conexão do banco de dados
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'wesley',
    password: 'wesley4565**',
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