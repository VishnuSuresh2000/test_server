import { ExistWithName, NoRecordFound } from "../../CustomExceptions/Custom_Exception";
import { changeStateSyncSalles } from "../../CustomStream/CheckDataChaged";
import category from "../../Schemas/category";
import product from "../../Schemas/product";
import { ICategory } from "../../Schemas/Schema Interface/ICategory";
import IProduct from "../../Schemas/Schema Interface/IProduct";

export async function getAllProduct() {
    try {

        var response = await product.find().populate('category')
        if (response.length != 0) {

            return response
        }
        throw new NoRecordFound()
    } catch (error) {
        console.log("Error from getAllProduct", error)
        throw error
    }
}

export async function getProductByCategory(id: string) {
    try {
        var response = await product.find({ category: id })
            .populate({
                path:'category',
                select:["name","_id"]
            })
            .select(['category', '_id', 'name', 'amount'])
        if (response.length != 0) {
            return response
        }
        throw new NoRecordFound()
    } catch (error) {
        console.log("Error from getAllProduct", error)
        throw error
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
    inKg: boolean
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
        console.log("Error from isProductExist", error)
        throw error
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
        throw new ExistWithName()

    } catch (error) {
        console.log("Error from addProduct", error)
        throw error
    }

}


export async function updateProduct(id: string, data: IProduct) {
    try {

        let check = await isProductExist(true, id)
        if (check) {
            let res = await category.findOne(data.category) as ICategory
            await product.findByIdAndUpdate(id,
                {
                    name: data.name,
                    description: data.description,
                    category: res._id,
                    _id: id,
                    inKg: data.inKg,
                    amount: data.amount
                }
            );
            return "Record Updated"
        }
        throw new NoRecordFound()

    } catch (error) {
        console.log("Error from updateProduct", error)
        throw error
    }
}

export async function readSingleProduct(id: string) {
    try {
        var response = await product.findOne({ _id: id })
        if (response != null) {
            let temp = await category.findById(response?.category);
            let out = {
                _id: response?._id,
                name: response?.name,
                category: temp?._id,
                description: response?.description,
                inKg: response.inKg,
                amount: response.amount
            }
            return out
        }
        throw new NoRecordFound()
    } catch (error) {
        console.log("Error from readSingleProduct", error)
        throw error
    }

}

export async function deleteProduct(id: string) {
    try {
        let check = await isProductExist(true, id)

        if (check) {
            await product.findByIdAndRemove(id)
            return "Rrecord Deleted"
        }
        throw new NoRecordFound()


    } catch (error) {
        console.log("Error from deleteProduct", error)
        throw error
    }
}

export async function addImag(id: string, value: boolean) {
    try {
        if (await isProductExist(true, id)) {
            await product.findByIdAndUpdate(id, {
                hasImg: value
            })
            changeStateSyncSalles.push("true")
            return "ImageAdded"
        }
        throw new NoRecordFound()
    } catch (error) {
        console.log("Error from addImag", error)
        throw error
    }
}