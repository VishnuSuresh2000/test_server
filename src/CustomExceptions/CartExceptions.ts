export class ProductIsNotInSalles extends Error {
    constructor() {
        super("Product is Not listed For salles")
        this.name = "ProductIsNotInSallesError"
        Object.setPrototypeOf(this,ProductIsNotInSalles.prototype)
    }
}

export class AllProductsAreSeled extends Error {
    constructor() {
        super("All Product are selled")
        this.name = "AllProductsAreSeledError"
        Object.setPrototypeOf(this,AllProductsAreSeled.prototype)
    }
}
export class LessAmountOfProduct extends Error {
    constructor() {
        super("The product need is higher than the list")
        this.name = "LessAmountOfProductError"
        Object.setPrototypeOf(this,LessAmountOfProduct.prototype)
    }
}

export class CountMustDefine extends Error {
    constructor() {
        super("Count of the Product Must Define may Not Be Zero")
        this.name = "CountMustDefineError"
        Object.setPrototypeOf(this,CountMustDefine.prototype)
    }
}

export class ProductsAreSelled extends Error {
    constructor() {
        super("Sorry all Products are seled")
        this.name = "ProductsAreSelledError"
        Object.setPrototypeOf(this,ProductsAreSelled.prototype)
    }
}