const fs = require('fs')

class ProductManager {

    constructor(path){

        this.path = path
        this.format = 'utf-8'

    }

    getNextID = () => {
        if (fs.existsSync(this.path)) {
        let array = fs.readFileSync(this.path, this.format)
        let parse = JSON.parse(array)
        let counter = Object.keys(parse).length + 1
        return counter
        } else {let counter = 1
                return counter}
    }

    addProduct = async (title, description, price, thumbanil, code, stock) => {
         
        if(fs.existsSync(this.path)){console.log('JSON encontrado')
        }else {fs.promises.writeFile(this.path, '[]')}

        return this.getProducts()
            .then(products => {
                    products.push({id: this.getNextID(), title, description, price, thumbanil, code, stock})
                    return products })
            .then(productsNew => fs.promises.writeFile(this.path, JSON.stringify(productsNew)))

    }

    getProducts = async () => {


        return fs.promises.readFile(this.path, this.format)
            .then(content => JSON.parse(content))
            .catch(e => {
                console.log('Error', e);
                return []
            })
        
        
    }

    getProductById = (searchID) => {
        if (fs.existsSync(this.path)) {
            let array = fs.readFileSync(this.path, this.format)
            let parse = JSON.parse(array)
            let productById = parse.find(element => element.id == searchID)
        productById ? console.log(productById) : console.log("El producto que buscás no se encuentra en el catálogo.")
    } else {console.log("El archivo JSON Todavía no existe")}
}

    deleteProduct = (deleteID) => {
        if (fs.existsSync(this.path)) {
            let array = fs.readFileSync(this.path, this.format)
            let parse = JSON.parse(array)
            let productExists = parse.find(element => element.id == deleteID)
            let productsFiltered = parse.filter(element => element.id !== deleteID)
            productExists ? fs.promises.writeFile(this.path, JSON.stringify(productsFiltered)) : console.log("El producto que intetas eliminar no existe")
            } else {console.log("El archivo JSON Todavía no existe")}
}

    updateProduct = (updatedID, title, description, price, thumbanil, code, stock) => {
        if (fs.existsSync(this.path)) {
            let array = fs.readFileSync(this.path, this.format)
            let parse = JSON.parse(array)
            let productExists = parse.find(element => element.id == updatedID)
            let productsFiltered = parse.filter(element => element.id !== updatedID)
            productsFiltered.push({id: updatedID, title, description, price, thumbanil, code, stock})
            productExists ? fs.promises.writeFile(this.path, JSON.stringify(productsFiltered)) : console.log("El producto que intentas actualizar no existe")
            } else {console.log("El archivo JSON Todavía no existe")}

}
}
async function run () {
    const manager = new ProductManager('products.json')
//    await manager.addProduct('Producto A', 'Descripción producto A', 23, 'JS backend', 'abc123', 25)
//    await manager.addProduct('Producto B', 'Descripción producto A', 23, 'JS backend', 'abc123', 25)
//    await manager.addProduct('Producto C', 'Descripción producto A', 23, 'JS backend', 'abc123', 25)
//    await manager.addProduct('Producto D', 'Descripción producto A', 23, 'JS backend', 'abc123', 25)
//    manager.deleteProduct(2, 'Producto actualizado', 'Descripción producto A', 23, 'JS backend', 'abc123', 25) 
//    manager.updateProduct(3, 'Producto actualizado', 'Descripción producto A', 23, 'JS backend', 'abc123', 25)
//    manager.getProductById(3)
//    console.log( await manager.getProducts() )
}

run()