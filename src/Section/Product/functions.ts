import product from "../../Schemas/product";
import category from "../../Schemas/category";
import { Schema } from "mongoose";

export async function getAllProduct() {
    try {
        
        var response = await product.find().populate('category')
        if (response.length != 0) {
            
            return response
        }
        throw new Error("No records Found")
    } catch (error) {
        console.log(error)
        throw `${error} Error on fun:getAllproduct`
    }
}
interface InputProduct {
    _id: string
    name: string,
    description: string,
    category: {
        name: string,
        _id: string
    },
    inKg:boolean
}

interface IProduct {
    _id?: string
    name?: string,
    description?: string,
    category?: Schema.Types.ObjectId,
    inKg:boolean
}

export async function isProductExist(idOrName: boolean, data: string) {
    try {
        let temp = idOrName ? { _id: data } : { name: data.toLowerCase() }
        let res = await product.findOne(temp)
        if (res != null) {
            return true
        }
        return false
    } catch (error) {
        throw `${error} isProductExist`
    }

}

export async function addProduct(data: InputProduct) {
    try {
        var check = await isProductExist(false, data.name)
        if (!check) {
            let res = await category.findOne(data.category)
            data.category = res?.id
            let temp = new product(data)
            await temp.save()
            return "Record added"
        }
        throw new Error("Record already exist with same name")

    } catch (error) {
        console.log(error)
        throw `${error} Error on addProduct`
    }

}


export async function updateProduct(id: string, data: InputProduct) {
    try {

        let check = await isProductExist(true, id)
        if (check) {
            let res = await category.findOne(data.category)
            let temp: IProduct = {
                name: data.name,
                description: data.description,
                category: res?._id,
                _id: id,
                inKg:data.inKg
            }
            await product.findByIdAndUpdate(id, temp);
            return "Record Updated"
        }
        throw new Error("Record Not exist with same _id")

    } catch (error) {
        console.log("error in update Product", error)
        throw `${error} Error on fun:updateProduct`
    }
}

export async function readSingleProduct(id: string) {
    try {
        var response = await product.findOne({ _id: id })
        if (response != null) {
            let temp = await category.findById(response?.category);
            let out: IProduct = {
                _id: response?._id,
                name: response?.name,
                category: temp?._id,
                description: response?.description,
                inKg:response.inKg
            }
            return out
        }
        throw new Error("No record Found")
    } catch (error) {
        console.log(error)
        throw `${error} Error on fun:readSingleProduct`
    }

}

export async function deleteProduct(id: string) {
    try {
        let check = await isProductExist(true, id)

        if (check) {
            await product.findByIdAndRemove(id)
            return "Rrecord Deleted"
        }
        throw new Error("Record Not exist with same _id")


    } catch (error) {
        console.log(error)
        throw `${error} Error on fun:deleteProduct `
    }
}