const Tought = require('../models/Tought')
const User = require('../models/User')

const { Op } = require('sequelize')


module.exports = class ToughtsController {
    static async showToughts(req, res) {

        let search = ''

        // Verificar se chegou algo pela busca
        if (req.query.search){
            search = req.query.search
        }

        // Ordenar dados 
        let order = 'DESC'
        
        if(req.query.order === 'old'){
            order = 'ASC'
        } else {
            order = 'DESC'
        }
        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: { [Op.like]: `%${search}%`},
            },
            order: [['createdAt', order]]
        })

        // Fazer que todos os usuários aparecam no mesmo array com result.get plain true.
        const toughts = toughtsData.map((result) => result.get({ plain: true }))

        let toughtsQty = toughts.length

        if(toughtsQty === 0) {
            toughtsQty = false
        }


        res.render('toughts/home', { toughts, search, toughtsQty })
    }

    static async dashboard(req, res) {

        const userId = req.session.userid



        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Tought,
            plain: true,
        })

        // checar se usuário existe
        if(!user) {
            res.redirect('/login')
        }

        // extrair as tarefas do banco
        // map você consegue modificar os itens de um array, acessando o result para acessar cada um dos pensamentos
        const toughts = user.Toughts.map((result) => result.dataValues)

        // Método para enviar ao sistema que o usuário não tem nenhum post ainda. 
        let emptyToughts = false

        if(toughts.length === 0) {
         emptyToughts = true
        }
        //
        res.render('toughts/dashboard', { toughts, emptyToughts })
    }

    static createTought(req, res ) {
        res.render('toughts/create')
    }

    static async createToughtSave (req, res) {

        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

    try {
        
        await Tought.create(tought)

        req.flash('mesage', 'Pensamento criado com sucesso!')

        req.session.save(() => {
            res.redirect('/toughts/dashboard')
        })

    } catch (error) {
        console.log('Aconteceu um erro: ' + error)
    }
    }
    static async removeTought(req, res) {
        // Pegar o id do pensamento pela requisição do body
        const id = req.body.id
        // pegar o id do usuário pela sessão
        const userId = req.session.userid

        // Uso o destroy para remover o id do pensamento que passou pelo body junto com o id do usuário que está logado
       try {
        await Tought.destroy({where: {id: id, UserId: userId}})
        
        req.flash('mesage', 'Pensamento removido com sucesso!')

        req.session.save(() => {
            res.redirect('/toughts/dashboard')
        })

       } catch (error) {
        console.log('Aconteceu um erro: ' + error)
       }
    }

    static async updateTought(req, res) {
        // pegar o id pelo params, por que está vindo pela URL
        const id = req.params.id

        // Pegar o pensamento do banco
        const tought = await Tought.findOne({where: {id: id}, raw: true })

        res.render('toughts/edit', { tought })
    }

    static async updateToughtSave(req, res) {
        const id = req.body.id

        const tought = {
            title: req.body.title
        }
        try {
            await Tought.update(tought, {where: {id: id}})

            req.flash('mesage', 'Pensamento atualizado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })

        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }
    }
}