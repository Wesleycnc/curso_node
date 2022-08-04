const conn = require('../db/conn')

const { ObjectId } = require('mongodb')

class Product {

    constructor(name, image, price, description) {

        this.name = name
        this.image = image
        this.price = price
        this.description = description

    }

    // Criando a "Tabela" banco de dados MongoDB insertOne é para inserir um dado
    save() {
        const product = conn.db().collection('products').insertOne({
            name: this.name,
            image: this.image,
            price: this.price,
            description: this.description
        })
        return product

    }

    // Pegar todos os dados do banco MongoDB
    static getProducts() {
        const products = conn.db().collection('products').find().toArray()

        return products
    }

    // Pegar dados cadastrados de um só usuário

    static async getProductById(id) {
        const product = await conn.db().collection('products').findOne({ _id: ObjectId(id)})

        return product
    }

    static async removeProductById(id) {
        await conn.db().collection('products').deleteOne({ _id: ObjectId(id)})

        return
    }
}

module.exports = Product