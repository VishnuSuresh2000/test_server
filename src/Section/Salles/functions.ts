import { changeStateSyncSalles } from "../../CustomStream/CheckDataChaged";
import farmer from "../../Schemas/farmer";
import product from "../../Schemas/product";
import ISalles from "../../Schemas/Schema Interface/ISalles";
import seller from "../../Schemas/seller";
import { isProductExist } from "../Product/functions";

function listernChngesAndSync(){
    changeStateSyncSalles.push("true")
}

export async function getAllSalles() {
    try {
        let temp = await product.find().populate({
            path: "salles.farmer_id",
            select: "firstName lastName"
        }).populate({
            path: "salles.seller_id",
            select: "firstName lastName"
        })
        temp = temp.filter((value) => {
            // value.salles.filter((value)=>{
            //     return (value.isVerified??false)&&(value.toShow??false)
            // })
            return value.salles.length != 0
        })
        if (temp.length == 0) {
            throw new Error("No Products In Salles");
        }
        return temp
    } catch (error) {
        console.log("error fro getSalles", error)
        throw error
    }
}


export async function getAllSallesProductByCategory(categoryId:string) {
    try {
        let temp = await product.find({
            category:categoryId,
        }).populate({
            path: "salles.farmer_id",
            select: "firstName lastName"
        }).populate({
            path: "salles.seller_id",
            select: "firstName lastName"
        })

        temp = temp.filter((value,index,ary) => {
            ary[index].salles=value.salles.filter((value)=>{
                return (value.isVerified??false)&&(value.toShow??false)
            })
            return value.salles.length != 0 
        })
        if (temp.length == 0) {
            throw new Error("No Products In Salles");
        }
       
        return temp
    } catch (error) {
        console.log("error fro getSalles", error)
        throw error
    }
}



export async function addToSalles(productId: string, data: ISalles) {
    data.dateOfCreation = new Date()
    data.dateOfUpdate = new Date()
    try {
        if (await isProductExist(true, productId)) {
            let sellerUser = await seller.findOne({ _id: data.seller_id })
            let farmerUser = await farmer.findOne({ _id: data.farmer_id })
            let isExistProduct = await product.findOne({ _id: productId })
            var temp = isExistProduct?.salles.filter((value) => {

                return (value.farmer_id == data.farmer_id) && (value.seller_id == data.seller_id)
            })

            if (sellerUser == null || !(sellerUser.isVerified ?? false)) {
   
                throw new Error("Seller Not Found Or Not Verified")
            } else if (farmerUser == null || !(farmerUser.isVerified ?? false)) {
                throw new Error("Farmer Not Found  Or Not Verified")
            } else if (temp?.length != 0) {
                throw new Error("Seller already has the Salles")
            } else {
                await product.findByIdAndUpdate(productId, {
                    $push: {
                        salles: data
                    }
                })
                listernChngesAndSync()
                return "Added the salles"
            }
        } else {
            throw new Error("No Product Found")
        }
    } catch (error) {
        console.log("error fro addSalles", error)
        throw error
    }

}

export async function isSallesExist(id: string) {
    try {
        let tempProduct = await product.findOne({ 'salles._id': id })
        let temp = tempProduct?.salles.filter((value) => {
            return value._id == id
        })

        if (temp?.length != 0) {
            return true
        } else {
            throw new Error("No Salles in The Product")
        }
    } catch (error) {
        console.log("error fro isSallesExist", error)
        throw error
    }
}

export async function toShowSalles(id:string,value: boolean) {
    try {
        if (await isSallesExist(id)) {
            await product.findOneAndUpdate({"salles._id":id},{
                '$set':{
                    "salles.$.toShow":value
                }
            })
            listernChngesAndSync()
            return `Updated toShow to ${value}`
        }
    } catch (error) {
        console.log("error fro isSallesExist", error)
        throw error
    }
}

export async function toVerifieSalles(id:string,value: boolean) {
    try {
        if (await isSallesExist(id)) {
            await product.findOneAndUpdate({"salles._id":id},{
                '$set':{
                    "salles.$.isVerified":value
                }
            })
            listernChngesAndSync()
            return `Verify toShow to ${value}`
        }
    } catch (error) {
        console.log("error fro isSallesExist", error)
        throw error
    }
}