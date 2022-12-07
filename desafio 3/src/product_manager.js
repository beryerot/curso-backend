const fs = require('fs')

class ProductManager {

    constructor(path) {
        this.path = path
    }


    read = () => {
        if(fs.existsSync(this.path)){
            return fs.promises.readFile(this.path, 'utf-8').then(r => JSON.parse(r))
        }
        return []
    }


    getNextID = list => {
        const count = list.length
        return (count > 0) ? list[count-1].id + 1 : 1
    }

    write = list => {
        return fs.promises.writeFile(this.path, JSON.stringify(list))
    }

    getProducts = async () => {
        const data = await this.read()

        return data
    }

    addProduct = async (obj) => {
        const list = await this.read()
        const nextID = this.getNextID(list)
        obj.id = nextID
        list.push(obj)

        await this.write(list)

        return obj
    }

    updateProduct = async (id, obj) => {
        obj.id = id
        const list = await this.read()

        const idx = list.findIndex(e => e.id == id)
        if (idx < 0) return

        list[idx] = obj

        await this.write(list)
    }

    deleteProduct = async (id) => {
        
        const list = await this.read()

        const idx = list.findIndex(e => e.id == id)
        
        if (idx < 0) return
        list.splice(list[idx], 1)
        
        await this.write(list)
    }

}

module.exports = ProductManager