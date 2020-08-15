export class NoProductForSalles extends Error{
    constructor(){
        super("No Products In Salles")
        this.name="NoProductForSallesError"
    }
}
export class NoProductFound extends Error{
    constructor(){
        super("No Product Found")
        this.name="NoProductFoundError"
    }
}

export class ProfileNotFoundOrUnverified extends Error{
    constructor(profile:string){
        super(`${profile} Not Found Or Not Verified`)
        this.name=`${profile}NotFoundOrUnverifiedError`
    }
}
export class AlredyHasSales extends Error{
    constructor(){
        super("Seller already has the Sale on the product with same farmer")
        this.name="AlredyHasSallesError"
    }
}