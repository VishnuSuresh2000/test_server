export class NoUserFound extends Error {
    constructor() {
        super("No User Found")
        this.name = "NoUserFoundError"
        Object.setPrototypeOf(this, NoUserFound.prototype)
    }
}

export class NoRecordFound extends Error {
    constructor() {
        super("No Records Found")
        this.name = "NoRecordFound"
        Object.setPrototypeOf(this, NoRecordFound.prototype)
    }
}
export class AlredyExistError extends Error {
    constructor() {
        super("Already Exist")
        this.name = "AlredyExistError"
        Object.setPrototypeOf(this, AlredyExistError.prototype)
    }
}

export class ExistWithName extends Error {
    constructor() {
        super("Record already exist with same name")
        this.name = "NameAlredyUsedError"
        Object.setPrototypeOf(this, ExistWithName.prototype)
    }
}

export class ExistWithId extends Error {
    constructor() {
        super("Record already exist with same _id")
        this.name = "IdAlredyUsedError"
        Object.setPrototypeOf(this, ExistWithId.prototype)
    }
}
export class AlreadyExistPhoneNumber extends Error {
    constructor() {
        super("Already Exist With Same Number Plz Change Number")
        this.name = "AlreadyExistPhoneNumberError"
        Object.setPrototypeOf(this, AlreadyExistPhoneNumber.prototype)
    }
}
export class NoUserLogin extends Error {
    constructor() {
        super("No User Found Login")
        this.name = "UserNotLoginError"
        Object.setPrototypeOf(this, NoUserLogin.prototype)
    }
}

export class UnAuthorizedUser extends Error {
    constructor() {
        super("You are not authorized to make this request")
        this.name = "UnAuthorizedUserError"
        Object.setPrototypeOf(this, UnAuthorizedUser.prototype)
    }
}

export class AdminOnlyAcess extends Error {
    constructor() {
        super("Admin Only Access")
        this.name = "NotAdminError"
        Object.setPrototypeOf(this, AdminOnlyAcess.prototype)
    }
}
export class NotRegisted extends Error {
    constructor() {
        super("User Must Register")
        this.name = "UserNotRegistedError"
        Object.setPrototypeOf(this, NotRegisted.prototype)
    }
}

export class BeruServerError extends Error {
    constructor() {
        super("Server Error Connect Technical Assist")
        this.name = "ServerError"
        Object.setPrototypeOf(this, BeruServerError.prototype)
    }
}