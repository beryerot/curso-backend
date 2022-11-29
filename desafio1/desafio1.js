class ProductManager {
    
    #products
    constructor(){
        this.#products = []  
    }

    getProducts = () => {return this.#products}

    getNextID = () => {
        const count = this.#products.length
        const nextID = (count > 0) ? this.#products[count - 1].id + 1 : 1
        return nextID
    }



    addProduct = (title, description, price, thumbnail, code, stock) => {
        const id = this.getNextID()
        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        const errorCode = (element) => element.code == product.code;
        (this.#products.some(errorCode)) ? console.log("Error: el código ya existe.") : this.#products.push(product);
    }

    getProductById = (nextID) => {
        const productById = this.#products.find(element => element.id == nextID)
        productById ? console.log("El título del producto buscado es: " + productById.title) : console.log("El producto que buscás no se encuentra en el catálogo.")
    }
}

const productManager = new ProductManager()

// Instrucciones para testing

productManager.addProduct("producto prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25)
productManager.addProduct("producto prueba 2", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25)
productManager.addProduct("producto prueba 3", "Este es un producto de prueba", 200, "Sin imagen", "abc125", 25)
productManager.getProductById(1)
productManager.getProductById(4)

console.log(productManager.getProducts())