export class NoProductForSalles extends Error {
    constructor() {
        super("No Products In Salles")
        this.name = "NoProductForSallesError"
        Object.setPrototypeOf(this, NoProductForSalles.prototype)
    }
}
export class NoProductFound extends Error {
    constructor() {
        super("No Product Found")
        this.name = "NoProductFoundError"
        Object.setPrototypeOf(this, NoProductFound.prototype)
    }
}

export class ProfileNotFoundOrUnverified extends Error {
    constructor(profile: string) {
        super(`${profile} Not Found Or Not Verified`)
        this.name = `${profile}NotFoundOrUnverifiedError`
        Object.setPrototypeOf(this, ProfileNotFoundOrUnverified.prototype)
    }
}
export class AlredyHasSales extends Error {
    constructor() {
        super("Seller already has the Sale on the product with same farmer")
        this.name = "AlredyHasSallesError"
        Object.setPrototypeOf(this, AlredyHasSales.prototype)
    }
}