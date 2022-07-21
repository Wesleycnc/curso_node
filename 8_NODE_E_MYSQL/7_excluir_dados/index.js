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

// Inserir dados no Banco
app.post('/books/insertbook', (req, res) => {

    const title = req.body.title
    const pageqty =  req.body.pageqty

    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

    conn.query(sql, function (err) {

       if(err) { 
        console.log(err)
        return
       }

       
       res.redirect('/books')

    })
})
// 

// Função para pegar dados enviados ao banco de dados
app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books'

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const books = data

        console.log(books)

        res.render('books', { books })
    })
})
// 

// Pegar dados individuais
app.get('/books/:id', (req, res) => {

    const id = req.params.id
    
    const sql = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        const book = data[0]

        res.render('book', { book })
    })
})
//
// Editar dados do banco
    app.get('/books/edit/:id', (req, res) => {

        const id = req.params.id

        const sql = `SELECT * FROM books WHERE id = ${id}`

        conn.query(sql, function(err, data) {
            if (err) {
                console.log(err)
                return
            }
            const book = data[0]

            res.render('editbook', { book })
        })
    })

//
// Atualizar dados no baco
app.post('/books/updatebook', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})
// 
// Remover dados no Banco
app.post('/books/remove/:id', (req,res) => {
    const id = req.params.id

    const sql = `DELETE FROM books WHERE id = ${id}`

    conn.query(sql, function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})
//
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