// Não deixar usuários que não estão logados a acessar paginas de usuários logados 
module.exports.checkAuth = function(req, res, next){
    const userId = req.session.userid

    if(!userId) {
        res.redirect('/login')
    }

    next()
}