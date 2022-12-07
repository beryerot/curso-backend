const ProductManager = require('./product_manager')

const manager = new ProductManager('products.json')


test = async () => {
await manager.addProduct({
    name: 'tito',
    price: 24
})
console.log(await manager.getProducts());

}
test()