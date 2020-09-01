import { Model } from "mongoose";
import { AlreadyExistPhoneNumber, AlredyExistError, NoRecordFound, NoUserAddressFound, NoUserFound } from "../../CustomExceptions/Custom_Exception";
import IAddress from "../../Schemas/Schema Interface/IAddress";
import ICommonProfile from "../../Schemas/Schema Interface/ICommonProfile";

export async function addIfProfileNotExist(data: ICommonProfile, firebase_id: string, model: Model<ICommonProfile>) {
    try {
        data.firebase_id = firebase_id ?? "In test"
        // console.log(firebase_id,"from function","\n",data)
        let res = await model.findOne({ firstName: data.firstName, lastName: data.lastName })
        let res2 = await model.findOne({ phoneNumber: data.phoneNumber })
        if (res == null && res2 == null) {
            let temp = new model(data)
            await temp.save()
            return "Added Profile"
        } else if (res2 != null) {
            console.log(res2)
            throw new AlreadyExistPhoneNumber()
        }
        throw new AlredyExistError()
    } catch (error) {
        console.log("error on isProfileExist", error)
        throw error
    }
}


export async function updateIfProfileNotExist(id: string, data: ICommonProfile, model: Model<ICommonProfile>) {
    try {
        var res = await model.findOne({ _id: id })
        var res2 = await model.findOne({ phoneNumber: data.phoneNumber }) as ICommonProfile
        if (res?.equals(res2) || res2 == null) {
            await model.findByIdAndUpdate(id, data)
            return "Updated Profile"
        }
        throw new AlreadyExistPhoneNumber()
    } catch (error) {
        console.log("error on isProfileExist", error)
        throw error

    }
}

export async function isPhoneNumberAlreadyExist(phNo: number, model: Model<ICommonProfile>) {
    try {
        let temp = await model.findOne({ phoneNumber: phNo })
        if (temp == null) {
            return false
        }
        return true
    } catch (error) {
        console.log(error)
        throw error
    }

}

export async function varifyAccount(id: string, show: boolean, model: Model<ICommonProfile>) {
    try {
        let temp = await model.findOne({ _id: id })
        if (temp != null) {
            await model.findByIdAndUpdate(id, { isVerified: show })
            return "Varification Updated"
        }
        throw new NoUserFound()
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function isExistWithFirebaseId(id: string, model: Model<ICommonProfile>) {
    try {
        let temp = await model.findOne({ firebase_id: id })
        if (temp == null) {
            return false
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}


export async function isExistWithId(id: string, model: Model<ICommonProfile>) {
    try {
        let temp = await model.findOne({ _id: id })
        if (temp == null) {
            return false
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}
export async function addIfProfileNotExistFirebase(data: ICommonProfile, firebase_id: string, model: Model<ICommonProfile>) {
    try {
        data.firebase_id = firebase_id
        console.log(firebase_id, "from function", "\n", data)
        let res = await model.findOne({ firebase_id: firebase_id })
        let res2 = await model.findOne({ phoneNumber: data.phoneNumber })
        // let res3 = await model.findOne({
        //     phoneNumber: data.phoneNumber, email: data.email, firstName: data.firstName,
        //     lastName: data.lastName
        // })
        if (res == null && res2 == null) {
            let temp = new model(data)
            await temp.save()
            return "Added Profile"
        }
        // else if (res3 != null) {
        //     console.log(res3)
        //     // await model.findOneAndUpdate({ _id: res3._id }, {
        //     //     firebase_id: data.firebase_id
        //     // })
        //     console.log("Alredy exist with different Email id")
        //     return "Profile Data Upadted"
        // }
        else if (res2 != null) {
            console.log(res2)
            throw new AlreadyExistPhoneNumber()
        }
        throw new AlredyExistError()
    } catch (error) {
        console.log("error on isProfileExist", error)
        throw error
    }
}

export async function checkHasAddress(id: string, model: Model<ICommonProfile>) {
    try {
        if (await isExistWithId(id, model)) {
            let temp = await model.findOne({ _id: id }) as ICommonProfile
            return {
                'user': true,
                'address': temp.address != null
            }
        } else {
            throw new NoUserFound()
        }
    } catch (error) {
        console.log("error on checkHasAddress", error)
        throw error
    }
}

export async function addAddress(id: string, data: IAddress, model: Model<ICommonProfile>) {
    try {
        if (!(await checkHasAddress(id, model)).address) {
            await model.findOneAndUpdate({ _id: id }, {
                address: data
            })
            return "Address Added"
        } else {
            throw new NoUserFound()
        }
    } catch (error) {
        console.log("error on addAddress", error)
        throw error
    }
}

export async function checkIsverified(id: string, model: Model<ICommonProfile>) {
    try {
        if (await isExistWithId(id, model)) {
            let value = await model.findOne({ _id: id }) as ICommonProfile
            return value?.isVerified ?? false
        } else {
            throw new NoUserFound()
        }
    } catch (error) {
        console.log("error on checkIsverified", error)
        throw error
    }
}

export async function Verifie(id: string, value: boolean, model: Model<ICommonProfile>) {
    try {
        if (await isExistWithId(id, model)) {
            await model.findOneAndUpdate({ _id: id }, { isVerified: value })
            return `${value ? 'Verified' : 'UnVerified'}`
        } else {
            throw new NoUserFound()
        }
    } catch (error) {
        console.log("error on Verifie", error)
        throw error
    }
}

export async function getAllData(model: Model<ICommonProfile>) {
    try {
        let value = await model.find()
        if (value.length == 0) {
            throw new NoRecordFound()
        }
        return value;
    } catch (error) {
        console.log("error on  getAllData", error)
        throw error
    }
}


export async function getAllDataMinimal(model: Model<ICommonProfile>) {
    try {
        let value = await model.find().select("firstName lastName")
        if (value.length == 0) {
            throw new NoRecordFound()
        }
        return value;
    } catch (error) {
        console.log("error on  getAllData", error)
        throw error
    }
}

export async function getUserData(id: string, model: Model<ICommonProfile>) {
    try {
        if (await isExistWithId(id, model)) {
            let value = await model.findOne({ _id: id }) as ICommonProfile
            return value
        } else {
            throw new NoUserFound()
        }
    } catch (error) {
        console.log("error on getUserData", error)
        throw error
    }
}


