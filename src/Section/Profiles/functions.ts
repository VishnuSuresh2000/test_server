import { Model } from "mongoose";
import ICommonProfile from "../../Schemas/Schema Interface/ICommonProfile";

export async function addIfProfileNotExist(data: ICommonProfile,firebase_id:string, model: Model<ICommonProfile>) {
    try {
        data.firebase_id=firebase_id??"In test"
        // console.log(firebase_id,"from function","\n",data)
        let res = await model.findOne({ firstName:data.firstName,lastName:data.lastName })
        let res2 = await model.findOne({ phoneNumber: data.phoneNumber })
        if (res == null && res2 == null) {
            let temp = new model(data)
            await temp.save()
            return "Added Profile"
        } else if (res2 != null) {
            console.log(res2)
            throw new Error(`Already Exist With Same Number Plz Change Number`)
        }
        throw new Error(`Already Exist`)
    } catch (error) {
        console.log("error on isProfileExist", error)
        throw `${error}`
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
        throw new Error(`Exist The pHone Number with another user`)
    } catch (error) {
        console.log("error on isProfileExist", error)
        throw `${error}`

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
        throw new Error("Not Exist Profile")
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function isExistWithFirebaseId(id: string, model: Model<ICommonProfile>) {
    try {
        let temp =await model.findOne({firebase_id:id})
        if(temp==null){
            return false
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}