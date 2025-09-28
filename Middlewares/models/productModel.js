const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");

class ProductModel {
    filePath = path.join(__dirname, "data", "data.json");

    readFile() {
        const data = fs.readFileSync(this.filePath, "utf-8");
        return data && data.trim() ? JSON.parse(data) : [];
    }

    addProduct(product) {
        const products = this.readFile();
        products.push(product);
        fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
    }

    getAll() {
        return this.readFile();
    }

    getProduct(id) {
        const products = this.readFile();
        return products.find(p => p.id === Number(id));
    }
    addComment(id,comment) {
        const products = this.readFile()
        const updateProduct = products.map(pr => {
            if(pr.id === Number(id)) {
                return {...pr,comment}
            }
            return pr
        })
        fs.writeFileSync(this.filePath,JSON.stringify(updateProduct,null,2))
    }
}

module.exports = ProductModel;



