const express = require('express')
const ProductManager = require('./product_manager')

const app = express()
const manager = new ProductManager('products.json')

app.get('/products', async (req, res) => {
    const products = await manager.getProducts()
    const limit = req.query.limit
    if(!limit) res.json({products})
    else res.json(products.splice(0, limit))
})

app.get('/add', async (req, res) => {

    const body = req.query
    const obj = await manager.addProduct(body)

    res.json(obj)

})

app.get('/products/:pid', async (req, res) => {
    const pid = req.params.pid
    const list = await manager.getProducts()
    const products = list.find(p => p.id == pid)
    
    if(!products) res.send({error: "Product not found"})
    else res.json({products})

})

/* app.get('/products', async (req, res) => {
    const list = await manager.getProducts()
    const limit = req.query.limit

    res.send(`La edad es ${limit} years`)
})  
 */

app.listen(8080)