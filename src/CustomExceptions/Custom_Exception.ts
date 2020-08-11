export class NoUserFound extends Error{
    constructor(){
        super("No User Found")
        this.name="NoUserFoundError"
    }
}

export class NoRecordFound extends Error{
    constructor(){
        super("No Records Found")
        this.name="NoRecordFound"
    }
}
export class AlredyExist extends Error{
    constructor(){
        super("Already Exist")
        this.name="AlredyExistError"
    }
}

export class ExistWithName extends Error{
    constructor(){
        super("Record already exist with same name")
        this.name="NameAlredyUsedError"
    }
}

export class ExistWithId extends Error{
    constructor(){
        super("Record already exist with same _id")
        this.name="IdAlredyUsedError"
    }
}
export class AlreadyExistPhoneNumber extends Error{
    constructor(){
        super("Already Exist With Same Number Plz Change Number")
        this.name="AlreadyExistPhoneNumberError"
    }
}
export class NoUserLogin extends Error{
    constructor(){
        super("No User Found Login")
        this.name="UserNotLoginError"
    }
}

export class UnAuthorizedUser extends Error{
    constructor(){
        super("You are not authorized to make this request")
        this.name="UnAuthorizedUserError"
    }
}

export class AdminOnlyAcess extends Error{
    constructor(){
        super("Admin Only Access")
        this.name="NotAdminError"
    }
}
export class NotRegisted extends Error{
    constructor(){
        super("User Must Register")
        this.name="UserNotRegistedError"
    }
}

export class BeruServerError extends Error{
    constructor(){
        super("Server Error Connect Technical Assist")
        this.name="ServerError"
    }
}